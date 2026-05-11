# Architecture Review — Alloy Framework

**Date:** 2026-05-11

---

## 1. Scalability Assessment

### Current Architecture

```
┌─────────────────────────────────────────────┐
│                  User Code                   │
│  JSX / STC / String Templates               │
└──────────────────┬──────────────────────────┘
                   │
┌──────────────────▼──────────────────────────┐
│            @alloy-js/core                    │
│  ┌─────────────┐  ┌──────────────┐          │
│  │  Reactive    │  │   Symbol     │          │
│  │  System      │  │   System     │          │
│  │  (Vue)       │  │  (Binder,    │          │
│  │              │  │   Scopes,    │          │
│  │              │  │   Refkeys)   │          │
│  └──────┬───────┘  └──────┬───────┘          │
│         │                 │                  │
│  ┌──────▼─────────────────▼───────┐          │
│  │       Rendering Pipeline       │          │
│  │  Component → TextTree → Doc    │          │
│  └────────────────────────────────┘          │
│  ┌────────────────────────────────┐          │
│  │     Host Abstraction           │          │
│  │  (Node.js / Browser)           │          │
│  └────────────────────────────────┘          │
└──────────────────┬──────────────────────────┘
                   │
┌──────────────────▼──────────────────────────┐
│         Language Packages                    │
│  ┌──────┐ ┌───┐ ┌────┐ ┌──────┐ ┌──────┐   │
│  │  TS  │ │Go │ │Java│ │Python│ │ C#   │   │
│  └──────┘ └───┘ └────┘ └──────┘ └──────┘   │
│  ┌──────┐ ┌────────┐ ┌────────┐             │
│  │ JSON │ │Markdown│ │MSBuild │             │
│  └──────┘ └────────┘ └────────┘             │
└──────────────────┬──────────────────────────┘
                   │
┌──────────────────▼──────────────────────────┐
│          Tooling Packages                    │
│  CLI │ Babel │ Rollup │ Create               │
└─────────────────────────────────────────────┘
```

### Scalability Strengths

1. **Language package isolation** — Adding a new language (e.g., Rust, Kotlin) requires only a new package following the established pattern (components, symbols, scopes, builtins, name-policy). No core changes needed.

2. **Component model** — New output constructs are added as components, not by modifying the rendering engine. The pipeline is fixed; the vocabulary is extensible.

3. **Descriptor-driven library creation** — Adding standard library bindings for a new language is declarative, not imperative.

4. **Prettier integration** — Formatting is delegated to a proven engine. No custom formatter maintenance.

### Scalability Limitations

1. **Global mutable state** — `globalContext` in `reactivity.ts`, queues in `scheduler.ts`, and caches in `refkey.ts` are module-level singletons. This prevents:
   - Parallel rendering in the same process (e.g., web worker pool)
   - Concurrent test execution within a single process
   - Multiple Alloy instances with different configurations

2. **No streaming output** — The entire rendered text tree is materialized in memory before printing. For very large outputs (thousands of files), this could be a memory concern.

3. **No incremental rendering** — Any change re-renders the entire tree. For large projects, incremental (dirty-file-only) rendering would be valuable.

4. **Monolithic symbol table** — All symbols for an output live in a single binder. For very large codebases, partitioning symbols by module would reduce resolution cost.

---

## 2. Modularity Assessment

### Module Boundary Quality

| Boundary                    | Quality     | Notes                                                                                                                                                                       |
| --------------------------- | ----------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Core ↔ Language packages   | ✅ Strong   | Language packages import from core; core never imports from languages. Clean one-way dependency.                                                                            |
| Language ↔ Language        | ✅ Strong   | No cross-language dependencies. Each language is self-contained.                                                                                                            |
| Core ↔ Vue Reactivity      | 🟡 Moderate | Core uses Vue internals (`track`, `trigger`, `ReactiveFlags`) directly rather than through an abstraction. Vue version upgrades could break Alloy.                          |
| Core ↔ Prettier            | ✅ Strong   | Prettier is used at the printing boundary only. Clean seam.                                                                                                                 |
| Components ↔ Symbol System | ✅ Strong   | Components use context hooks to access symbols; no direct coupling.                                                                                                         |
| Host ↔ Platform            | 🟡 Moderate | `alloy-host.ts` (Node) and `alloy-host.browser.ts` are clean adapters, but several core modules bypass the host (`inspect.ts`, `debug.ts`, `tracer.ts`, `write-output.ts`). |

### Coupling Metrics

- **Afferent coupling (Ca)** — Core has high Ca (all packages depend on it). This is expected and healthy for a framework core.
- **Efferent coupling (Ce)** — Core's Ce to Vue is high (15+ direct imports of Vue internals). This is the main coupling risk.
- **Language package Ce** — All language packages import from core only. Very clean.

---

## 3. Service Orientation Assessment

### Current State: Library-Oriented

Alloy is structured as a **library** with a plugin architecture, not a service architecture. This is appropriate for a code generation framework:

- **Synchronous API** — `render()` returns results immediately
- **In-process** — Everything runs in the same Node.js process
- **No I/O in the hot path** — Rendering is pure computation (except template file loading)

### Service Orientation Opportunities

1. **Language Server Protocol** — Alloy could expose a language server that provides:
   - Symbol completion for JSX templates
   - Go-to-definition for refkeys
   - Real-time preview of generated code

2. **Worker-based parallel rendering** — Each output could be rendered in a separate worker, using structured cloning or message passing for symbol resolution across workers.

3. **Plugin API** — A formal plugin system for:
   - Custom formatters (beyond Prettier)
   - Custom symbol resolution strategies
   - Custom output writers (beyond filesystem)

### Assessment

Service orientation is **not a priority** for Alloy's current stage (pre-beta). The library-oriented design is correct. The above opportunities are future considerations.

---

## 4. Composability Assessment

### Current Composability Strengths

1. **JSX composition** — Components compose naturally through JSX tree structure. This is Alloy's core value proposition.

2. **Context-based dependency injection** — The context system (Provider/useContext) enables clean composition of concerns (scope, binder, format options, name policy) without prop drilling.

3. **Symbol flow** — `takeSymbols`/`emitSymbol` enables cross-component symbol propagation without direct coupling.

4. **Mixed language output** — A single `<Output>` can contain SourceFiles in multiple languages, sharing a common binder for cross-language references.

### Composability Gaps

1. **No component middleware/hooks** — Components cannot intercept rendering lifecycle events. A `onRender` hook would enable cross-cutting concerns (e.g., tracking all declarations).

2. **No output post-processing** — After rendering, there's no hook for post-processing (e.g., linting generated code, running formatters, adding license headers).

3. **Fixed intrinsic vocabulary** — Adding new intrinsic elements (e.g., for a new formatting feature) requires modifying `runtime/intrinsic.ts`. An `IntrinsicHandlerRegistry` would make this composable.

4. **No conditional formatting** — Format options are set per-Output or per-SourceFile. There's no way to apply formatting rules conditionally based on content (e.g., "use single quotes in this region").

---

## 5. Recommendations (Priority Order)

### Immediate (Pre-Beta)

1. **Fix 4 correctness bugs** in symbol system — blocking for production use
2. **Extract shared cross-package patterns** — `mapGet`, `useLexicalScope`, `getCallSignatureProps`
3. **Abstract Vue reactivity** — Create an internal reactivity adapter to decouple from Vue internals

### Short-Term (Beta)

4. **Add `IntrinsicHandlerRegistry`** — Make intrinsic elements extensible
5. **Add rendering lifecycle hooks** — `onRender`, `onSymbolCreated`, `onScopeCreated`
6. **Implement context-per-render** — Enable parallel rendering by making global state per-render
7. **Add output post-processing pipeline** — Plugin hook for post-render transforms

### Medium-Term (1.0)

8. **Add incremental rendering** — Dirty-file-only re-rendering for large projects
9. **Add streaming output** — Process files as they're rendered rather than materializing full tree
10. **Consider language server** — Enable IDE integration for Alloy templates

---

## Architecture Score

| Dimension           | Score    | Rationale                                                                    |
| ------------------- | -------- | ---------------------------------------------------------------------------- |
| Scalability         | 7/10     | Language packages scale well; global state limits parallel rendering         |
| Modularity          | 8/10     | Clean boundaries between core and languages; Vue coupling is the main risk   |
| Service Orientation | 3/10     | Not applicable to current design (library, not service) — and that's correct |
| Composability       | 8/10     | JSX composition is excellent; gaps in lifecycle hooks and post-processing    |
| Type Safety         | 6/10     | Good TypeScript usage but pervasive `as any` casts weaken the type system    |
| Testability         | 7/10     | Strong test infrastructure; complex functions in core are hard to unit-test  |
| Overall             | **7/10** | Strong foundation with clear improvement path                                |
