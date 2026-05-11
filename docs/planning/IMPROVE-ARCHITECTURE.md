# Improve Codebase Architecture — Deepening Opportunities

**Date:** 2026-05-11 | **Informed by:** Full codebase analysis, domain language study

---

## Vocabulary

Using the [LANGUAGE.md](https://github.com/nicojs/clone-refs/blob/main/LANGUAGE.md) vocabulary consistently:

- **Module** — anything with an interface and implementation
- **Interface** — everything a caller must know to use a module
- **Seam** — where an interface lives; behavior can be altered without editing in place
- **Depth** — leverage at the interface: much behavior behind a small interface
- **Adapter** — concrete thing satisfying an interface at a seam

---

## Candidate 1: The Binder as a Deep Module

### Files

- `core/src/binder.ts` (744 lines)
- `core/src/context/binder.ts`
- `core/src/symbols/output-scope.ts`
- `core/src/symbols/output-symbol.ts`

### Problem

The binder's interface is wide — callers need to understand `createOutputBinder`, `resolve`, `symbolForRefkey`, `notifySymbolCreated`, `notifySymbolDeleted`, `notifyScopeCreated`, scope chain walking, and member resolution. But the binder does earn its depth: deleting it would scatter symbol resolution logic across every component that uses refkeys.

However, the binder is a single 744-line closure that's hard to test in isolation. The `createOutputBinder` factory puts everything in a single function scope.

### Solution

Extract the internal phases into focused sub-modules behind the same interface:

1. **Symbol Registry** — `knownDeclarations`, `waitingDeclarations`, `notifySymbolCreated`, `notifySymbolDeleted`
2. **Resolution Engine** — `resolve`, `buildResult`, `scopeAndMemberChain`
3. **Scope Manager** — `notifyScopeCreated`, scope tree maintenance

The interface (what callers see) stays identical. The implementation gets deeper — each sub-module is independently testable.

### Benefits

- **Locality** — Symbol registration bugs, resolution bugs, and scope management bugs are each isolated
- **Testability** — Each sub-module can be unit-tested without the full binder
- **Leverage** — Callers still interact with the same simple `resolve(refkey)` interface

---

## Candidate 2: The Rendering Pipeline as a Deep Module

### Files

- `core/src/render.ts` (824 lines)
- `core/src/scheduler.ts`
- `core/src/reactivity.ts`

### Problem

`appendChild` in `render.ts` handles 6 distinct cases (strings, cached elements, custom contexts, intrinsics, components, functions) in a single function. The intrinsic element handling is a ~100-line switch-like structure. The rendering pipeline is a wide module — understanding it requires understanding all 6 cases.

### Solution

Create an **IntrinsicHandlerRegistry** — a map from intrinsic element type to handler function. Each handler is a small, focused function. New intrinsic types are added by registering a handler rather than adding a case to the switch.

```
Interface: registerIntrinsicHandler(type, handler) + getIntrinsicHandler(type)
Seam: The handler lookup map
Adapter: Each handler is an adapter for a specific intrinsic type
```

### Benefits

- **Leverage** — Adding new intrinsic types doesn't require understanding the entire `appendChild` function
- **Locality** — Each handler's behavior is isolated and testable
- **Testability** — Handlers can be tested independently

---

## Candidate 3: The Descriptor-Driven Library Creator

### Files

- `go/src/create-module.ts` (347 lines)
- `csharp/src/create-library.ts` (306 lines)
- `typescript/src/create-package.ts` (318 lines)
- `python/src/create-module.ts` (~200 lines)
- `java/src/create-library.ts` (~200 lines)

### Problem

Five language packages implement nearly identical `createLibrary`/`createModule` functions with the same pattern: declarative descriptor → recursive symbol creation → refkey mapping. The `mapGet` helper is copy-pasted across packages. The adapter is nearly the same everywhere — only the symbol types and descriptor shapes differ.

### Solution

Extract a **shared descriptor-driven library creation module** in `@alloy-js/core`:

```
Interface: createLibraryFromDescriptor<TDescriptor, TSymbol>(options)
  - options.createSymbol(kind, descriptor) → TSymbol
  - options.createScope(descriptor) → OutputScope
  - options.descriptor → Record<string, TDescriptor>
Seam: The options factory callbacks
Adapter: Each language provides its own symbol/scope creation callbacks
```

### Benefits

- **Leverage** — 5 implementations become 1 shared module + 5 thin adapters
- **Locality** — Descriptor parsing, caching, and refkey mapping logic live in one place
- **Testability** — The shared module can be tested with mock adapters; each language adapter tested independently
- **Eliminates ~500 lines of duplication**

---

## Candidate 4: The Language Scope Hook Pattern

### Files

- `typescript/src/utils.ts` — `useLexicalScope`
- `java/src/utils.ts` — `useLexicalScope`
- `python/src/utils.ts` (implicit in component code)
- `go/src/scopes/` (via context)

### Problem

Every language package has its own `useLexicalScope` that does the same thing: call `useScope()` from core, narrow to a language-specific type, throw if wrong type. This is a shallow module — the interface is nearly as complex as the implementation.

### Solution

Create a **`createUseLexicalScope` factory** in core:

```typescript
function createUseLexicalScope<T extends OutputScope>(
  scopeClass: abstract new (...args: any) => T,
) {
  return function useLexicalScope(): T {
    const scope = useScope();
    if (!(scope instanceof scopeClass)) {
      throw new Error(
        `Expected ${scopeClass.name} but got ${scope?.constructor.name}`,
      );
    }
    return scope;
  };
}
```

### Benefits

- **Leverage** — 4 implementations become 1 factory + 4 one-liner calls
- **Consistency** — Error messages are uniform across languages
- **Zero cost** — No behavior change, just consolidation

---

## Candidate 5: The STC/STI Unification

### Files

- `core/src/stc.ts` (exports + chainable methods)
- `core/src/sti.ts` (nearly identical structure)

### Problem

`stc` and `sti` share 95% of their code — they differ only in whether they wrap a `Component` or an `Intrinsic`. Both have the same `.code()`, `.text()`, `.children()` chainable methods with the same `as any` casts.

### Solution

Create a **`createStcFactory(targetType)` factory** that generates either `stc` or `sti`:

```
Interface: stc(component) → StcComponentCreator / sti(intrinsic) → StiComponentCreator
Seam: The target type (Component vs Intrinsic)
Adapter: The factory itself adapts to both use cases
```

### Benefits

- **Leverage** — ~60 lines of duplication eliminated
- **Locality** — Chainable method logic lives in one place
- **Type safety improvements** — Fixing `as any` in one place fixes it for both

---

## Summary Table

| #   | Candidate                  | Problem                               | Files | Dup Lines | Benefit                    |
| --- | -------------------------- | ------------------------------------- | ----- | --------- | -------------------------- |
| 1   | Binder decomposition       | Single 744-line closure, hard to test | 4     | 0         | Testability, locality      |
| 2   | Intrinsic handler registry | 100-line switch in appendChild        | 3     | 0         | Extensibility, testability |
| 3   | Shared descriptor library  | 5x duplicate createLibrary            | 5     | ~500      | Dedup, leverage            |
| 4   | useLexicalScope factory    | 4x duplicate hook                     | 4     | ~60       | Consistency, dedup         |
| 5   | STC/STI unification        | 95% identical code                    | 2     | ~60       | Dedup, type safety         |

**Which of these would you like to explore?**
