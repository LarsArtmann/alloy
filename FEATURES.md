# Alloy Features

**Generated:** 2026-05-11 | **Based on:** Full codebase analysis of 17 packages, 172 test files, ~26,000 lines of source

---

## Core Framework (`@alloy-js/core`)

### JSX Component Model

| Feature                       | Status              | Description                                                                                        |
| ----------------------------- | ------------------- | -------------------------------------------------------------------------------------------------- |
| JSX Rendering Pipeline        | ✅ FULLY_FUNCTIONAL | Component tree → RenderedTextTree → Prettier Doc → String. Three-phase pipeline.                   |
| String Template API           | ✅ FULLY_FUNCTIONAL | `code` and `text` tagged template literals with whitespace/intelligence handling                   |
| STC (Static Typed Components) | ✅ FULLY_FUNCTIONAL | Callable component API with `.code()`, `.text()`, `.children()` chainable methods                  |
| STI (Static Typed Intrinsics) | ✅ FULLY_FUNCTIONAL | Typed intrinsic element wrappers (`hbr`, `indent`, `group`, etc.)                                  |
| Context System                | ✅ FULLY_FUNCTIONAL | Hierarchical dependency injection (`createContext`, `useContext`, `Provider`) — like React Context |
| Custom Matchers               | ✅ FULLY_FUNCTIONAL | `toRenderTo` / `toRenderToAsync` Vitest matchers for test assertions                               |

### Reactive System

| Feature                | Status              | Description                                                                             |
| ---------------------- | ------------------- | --------------------------------------------------------------------------------------- |
| Reactive Effects       | ✅ FULLY_FUNCTIONAL | Vue-based reactivity with `effect`, `memo`, `computed`, `watch`                         |
| Scheduler              | ✅ FULLY_FUNCTIONAL | Immediate and deferred job queues with async support (`trackPromise`, `flushJobsAsync`) |
| Context Hierarchy      | ✅ FULLY_FUNCTIONAL | Nested reactive scopes with cleanup lifecycle (`onCleanup`, `root`)                     |
| Global Singleton Guard | ✅ FULLY_FUNCTIONAL | `globalThis.__ALLOY__` prevents duplicate Alloy versions                                |

### Symbol System

| Feature                    | Status              | Description                                                                   |
| -------------------------- | ------------------- | ----------------------------------------------------------------------------- |
| Reference Keys (Refkeys)   | ✅ FULLY_FUNCTIONAL | Deterministic composite keys for cross-reference resolution                   |
| Member Refkeys             | ✅ FULLY_FUNCTIONAL | Nested member access chains (`memberRefkey`)                                  |
| Name Keys                  | ✅ FULLY_FUNCTIONAL | Named refkeys with name policy integration (`namekey`)                        |
| Binder / Symbol Resolution | ✅ FULLY_FUNCTIONAL | Scope chain walking, common ancestor detection, import path computation       |
| Output Scopes              | ✅ FULLY_FUNCTIONAL | Hierarchical scope tree with parent/children, owner symbols                   |
| Output Symbols             | ✅ FULLY_FUNCTIONAL | Abstract symbol with reactive name, metadata, alias chains, member spaces     |
| Symbol Tables              | ✅ FULLY_FUNCTIONAL | Reactive set with refkey/name indexes and name conflict resolution            |
| Symbol Flow                | ✅ FULLY_FUNCTIONAL | `takeSymbols` / `emitSymbol` for propagating symbols across component tree    |
| Symbol Slots               | ✅ FULLY_FUNCTIONAL | Component-based slots for collecting emitted symbols                          |
| Reactive Union Set         | ✅ FULLY_FUNCTIONAL | Reference-counted reactive set with subsets, derived sets, and indexes        |
| External Library Symbols   | ✅ FULLY_FUNCTIONAL | `SymbolCreator` / `LibrarySymbolReference` for referencing external libraries |
| Name Conflict Resolution   | ✅ FULLY_FUNCTIONAL | Default `_2`, `_3` suffix strategy; configurable per-output resolver          |
| Name Policies              | ✅ FULLY_FUNCTIONAL | `createNamePolicy` with per-element-type naming (camelCase, PascalCase, etc.) |

### Output Components

| Feature         | Status              | Description                                                       |
| --------------- | ------------------- | ----------------------------------------------------------------- |
| Output          | ✅ FULLY_FUNCTIONAL | Root output container with binder, name policy, format options    |
| SourceFile      | ✅ FULLY_FUNCTIONAL | Output file with path, filetype, header, reference renderer       |
| SourceDirectory | ✅ FULLY_FUNCTIONAL | Hierarchical directory tree with content tracking                 |
| CopyFile        | ✅ FULLY_FUNCTIONAL | Copy a file from source to output                                 |
| TemplateFile    | ✅ FULLY_FUNCTIONAL | Template with `{{ variable }}` substitution from child components |
| UpdateFile      | ✅ FULLY_FUNCTIONAL | Update an existing file                                           |
| AppendFile      | ✅ FULLY_FUNCTIONAL | Append to an existing file                                        |

### Code Structure Components

| Feature            | Status              | Description                                                      |
| ------------------ | ------------------- | ---------------------------------------------------------------- |
| Declaration        | ✅ FULLY_FUNCTIONAL | Declare a named symbol in the current scope                      |
| Scope              | ✅ FULLY_FUNCTIONAL | Create a lexical scope for symbols                               |
| Block              | ✅ FULLY_FUNCTIONAL | Indented code block with opener/closer (`{...}`)                 |
| Indent             | ✅ FULLY_FUNCTIONAL | Indentation block with configurable line break types             |
| List               | ✅ FULLY_FUNCTIONAL | Join children with configurable separators                       |
| For                | ✅ FULLY_FUNCTIONAL | Reactive iteration over arrays, Maps, Sets, Iterators            |
| Show               | ✅ FULLY_FUNCTIONAL | Conditional rendering with fallback                              |
| Switch / Match     | ✅ FULLY_FUNCTIONAL | Switch-case conditional rendering                                |
| Wrap               | ✅ FULLY_FUNCTIONAL | Conditionally wrap children with a component                     |
| Name               | ✅ FULLY_FUNCTIONAL | Render current declaration's name                                |
| Prose              | ✅ FULLY_FUNCTIONAL | Prose text with word-wrapping                                    |
| ReferenceOrContent | ✅ FULLY_FUNCTIONAL | Conditionally output a reference or inline content               |
| ContentSlot        | ✅ FULLY_FUNCTIONAL | Detect empty/non-empty content with `WhenEmpty`/`WhenHasContent` |
| StatementList      | ✅ FULLY_FUNCTIONAL | Newline-separated statement list                                 |
| MemberDeclaration  | ✅ FULLY_FUNCTIONAL | Declare a member symbol within a scope                           |
| MemberScope        | ✅ FULLY_FUNCTIONAL | Scope for member declarations                                    |
| MemberName         | ✅ FULLY_FUNCTIONAL | Render a member declaration's name                               |

### Infrastructure

| Feature          | Status              | Description                                                              |
| ---------------- | ------------------- | ------------------------------------------------------------------------ |
| Host Abstraction | ✅ FULLY_FUNCTIONAL | `AlloyHost` interface for FS operations (Node + Browser implementations) |
| File Resources   | ✅ FULLY_FUNCTIONAL | Async file loading with reactive state (`createFileResource`)            |
| Write Output     | ✅ FULLY_FUNCTIONAL | Write rendered output to filesystem                                      |
| Tracer / Debug   | ✅ FULLY_FUNCTIONAL | Trace phases (scope, symbol, resolve, effect, render) with ANSI colors   |
| Tap System       | ✅ FULLY_FUNCTIONAL | Side-effect components for extracting context values (`createTap`)       |

---

## Language Packages

### TypeScript (`@alloy-js/typescript`)

| Feature                 | Status              | Description                                                    |
| ----------------------- | ------------------- | -------------------------------------------------------------- |
| SourceFile              | ✅ FULLY_FUNCTIONAL | TS source file with imports, scope, package context            |
| PackageDirectory        | ✅ FULLY_FUNCTIONAL | NPM package directory with `package.json` and `tsconfig.json`  |
| BarrelFile              | ✅ FULLY_FUNCTIONAL | Auto-generated `index.ts` re-exporting directory contents      |
| ClassDeclaration        | ✅ FULLY_FUNCTIONAL | Class with members, extends, implements, generics              |
| InterfaceDeclaration    | ✅ FULLY_FUNCTIONAL | Interface with extends, type params, methods                   |
| EnumDeclaration         | ✅ FULLY_FUNCTIONAL | Enum with members                                              |
| TypeDeclaration         | ✅ FULLY_FUNCTIONAL | Type alias declaration                                         |
| FunctionDeclaration     | ✅ FULLY_FUNCTIONAL | Top-level function with params, type params, return type       |
| VarDeclaration          | ✅ FULLY_FUNCTIONAL | Variable declaration with type annotation                      |
| Import / Export         | ✅ FULLY_FUNCTIONAL | Import and re-export statement generation                      |
| JSDoc                   | ✅ FULLY_FUNCTIONAL | JSDoc comments with `@param`, `@example`, `@returns`           |
| Value Expressions       | ✅ FULLY_FUNCTIONAL | JS values as TS literals (strings, numbers, arrays, objects)   |
| Member Expressions      | ✅ FULLY_FUNCTIONAL | Property access with dot notation, computed, optional chaining |
| Control Flow            | ✅ FULLY_FUNCTIONAL | `if` / `switch` statements                                     |
| Function Expressions    | ✅ FULLY_FUNCTIONAL | Arrow functions, named function expressions                    |
| New Expression          | ✅ FULLY_FUNCTIONAL | `new` constructor calls                                        |
| Call Expression         | ✅ FULLY_FUNCTIONAL | Function call expressions                                      |
| Package.json / TsConfig | ✅ FULLY_FUNCTIONAL | Generate `package.json` and `tsconfig.json`                    |

### Go (`@alloy-js/go`)

| Feature               | Status              | Description                                                          |
| --------------------- | ------------------- | -------------------------------------------------------------------- |
| SourceFile            | ✅ FULLY_FUNCTIONAL | Go source file with package clause, imports                          |
| ModuleDirectory       | ✅ FULLY_FUNCTIONAL | Go module root with module scope                                     |
| StructDeclaration     | ✅ FULLY_FUNCTIONAL | Struct type with members                                             |
| InterfaceDeclaration  | ✅ FULLY_FUNCTIONAL | Interface type with method sets                                      |
| FunctionDeclaration   | ✅ FULLY_FUNCTIONAL | Function with parameters, return types, type params                  |
| TypeDeclaration       | ✅ FULLY_FUNCTIONAL | Type aliases and named types                                         |
| VariableDeclaration   | ✅ FULLY_FUNCTIONAL | `var` / `const` declarations                                         |
| Pointer               | ✅ FULLY_FUNCTIONAL | Pointer type `*T`                                                    |
| Import Management     | ✅ FULLY_FUNCTIONAL | Auto import grouping (builtin, third-party, local)                   |
| Generic Type Params   | ✅ FULLY_FUNCTIONAL | Go generics with type parameter constraints                          |
| Module Descriptor API | ✅ FULLY_FUNCTIONAL | `createModule` descriptor-driven library creation                    |
| Builtins              | ✅ FULLY_FUNCTIONAL | Pre-defined symbols for Go standard library packages (io, fmt, etc.) |
| Comments              | ✅ FULLY_FUNCTIONAL | Block and line comments                                              |

### Java (`@alloy-js/java`)

| Feature                   | Status              | Description                                                 |
| ------------------------- | ------------------- | ----------------------------------------------------------- |
| Class                     | ✅ FULLY_FUNCTIONAL | Class with extends, implements, generics                    |
| Interface                 | ✅ FULLY_FUNCTIONAL | Interface with extends and generics                         |
| Enum                      | ✅ FULLY_FUNCTIONAL | Enum with members and implements                            |
| Method                    | ✅ FULLY_FUNCTIONAL | Method with modifiers, parameters, return type, throws      |
| Constructor               | ✅ FULLY_FUNCTIONAL | Constructor with modifiers and parameters                   |
| Variable                  | ✅ FULLY_FUNCTIONAL | Variable declaration with type                              |
| Annotation                | ✅ FULLY_FUNCTIONAL | Java annotation usage                                       |
| Modifiers                 | ✅ FULLY_FUNCTIONAL | Access and non-access modifiers                             |
| Maven Project             | ✅ FULLY_FUNCTIONAL | Maven `pom.xml` generation                                  |
| Package/Project Directory | ✅ FULLY_FUNCTIONAL | Java directory structure with package scope                 |
| Generic Type Params       | ✅ FULLY_FUNCTIONAL | Type parameters with constraints (extends, super, wildcard) |
| Library Descriptor API    | ✅ FULLY_FUNCTIONAL | `createLibrary` descriptor-driven library creation          |
| Builtins                  | ✅ FULLY_FUNCTIONAL | Pre-defined symbols for Java standard library (util, etc.)  |

### Python (`@alloy-js/python`)

| Feature                 | Status              | Description                                                  |
| ----------------------- | ------------------- | ------------------------------------------------------------ |
| ClassDeclaration        | ✅ FULLY_FUNCTIONAL | Class with bases                                             |
| DataclassDeclaration    | ✅ FULLY_FUNCTIONAL | `@dataclass` decorated class with field validation           |
| EnumDeclaration         | ✅ FULLY_FUNCTIONAL | Enum / IntEnum / StrEnum declarations                        |
| FunctionDeclaration     | ✅ FULLY_FUNCTIONAL | Top-level `def` function                                     |
| MethodDeclaration       | ✅ FULLY_FUNCTIONAL | Instance method (auto-injects `self`)                        |
| ClassMethodDeclaration  | ✅ FULLY_FUNCTIONAL | `@classmethod` (auto-injects `cls`)                          |
| StaticMethodDeclaration | ✅ FULLY_FUNCTIONAL | `@staticmethod`                                              |
| PropertyDeclaration     | ✅ FULLY_FUNCTIONAL | `@property` with getter/setter/deleter                       |
| ConstructorDeclaration  | ✅ FULLY_FUNCTIONAL | `__new__` constructor                                        |
| DunderMethodDeclaration | ✅ FULLY_FUNCTIONAL | Dunder methods (`__repr__`, `__str__`, etc.)                 |
| VariableDeclaration     | ✅ FULLY_FUNCTIONAL | Variable with optional type annotation                       |
| Import Management       | ✅ FULLY_FUNCTIONAL | `import` / `from ... import` statements                      |
| Docstrings              | ✅ FULLY_FUNCTIONAL | Google-style docstrings with `@param`, `@returns`, `@raises` |
| Type Reference          | ✅ FULLY_FUNCTIONAL | Type annotations including generics                          |
| Union Types             | ✅ FULLY_FUNCTIONAL | `X \| Y` union type expressions                              |
| Member Expression       | ✅ FULLY_FUNCTIONAL | Attribute access, subscription, calls                        |
| Module Descriptor API   | ✅ FULLY_FUNCTIONAL | `createModule` for Python packages                           |
| Builtins                | ✅ FULLY_FUNCTIONAL | Pre-defined symbols for Python standard library              |

### C# (`@alloy-js/csharp`)

| Feature                | Status              | Description                                                 |
| ---------------------- | ------------------- | ----------------------------------------------------------- |
| ClassDeclaration       | ✅ FULLY_FUNCTIONAL | Class with modifiers, type params, base types               |
| StructDeclaration      | ✅ FULLY_FUNCTIONAL | Struct with modifiers                                       |
| RecordDeclaration      | ✅ FULLY_FUNCTIONAL | Record with parameters                                      |
| InterfaceDeclaration   | ✅ FULLY_FUNCTIONAL | Interface with partial support                              |
| EnumDeclaration        | ✅ FULLY_FUNCTIONAL | Enum with access modifiers                                  |
| Namespace              | ✅ FULLY_FUNCTIONAL | Nested namespace support                                    |
| Method                 | ✅ FULLY_FUNCTIONAL | Method with access, async, type params                      |
| Constructor            | ✅ FULLY_FUNCTIONAL | Constructor with access modifiers                           |
| Property               | ✅ FULLY_FUNCTIONAL | Property with accessors and modifiers                       |
| Field                  | ✅ FULLY_FUNCTIONAL | Field with access and type modifiers                        |
| Parameters             | ✅ FULLY_FUNCTIONAL | Params with `ref`, `out`, `params` modifiers                |
| Attributes             | ✅ FULLY_FUNCTIONAL | C# attributes (`[Obsolete]`, etc.)                          |
| XML Doc Comments       | ✅ FULLY_FUNCTIONAL | `///` XML documentation                                     |
| Access Expressions     | ✅ FULLY_FUNCTIONAL | Member access, indexer, invocation chains                   |
| If Statement           | ✅ FULLY_FUNCTIONAL | `if` / `else if` / `else`                                   |
| Region                 | ✅ FULLY_FUNCTIONAL | `#region` / `#endregion` collapsible blocks                 |
| CsprojFile             | ✅ FULLY_FUNCTIONAL | `.csproj` project file generation (via `@alloy-js/msbuild`) |
| Library Descriptor API | ✅ FULLY_FUNCTIONAL | `createLibrary` descriptor-driven library creation          |
| Doc from Markdown      | ✅ FULLY_FUNCTIONAL | Convert Markdown to XML doc comments                        |

---

## Other Packages

### JSON (`@alloy-js/json`)

| Feature         | Status              | Description                              |
| --------------- | ------------------- | ---------------------------------------- |
| JsonValue       | ✅ FULLY_FUNCTIONAL | Render JS values as JSON                 |
| JsonObject      | ✅ FULLY_FUNCTIONAL | JSON object with properties              |
| JsonArray       | ✅ FULLY_FUNCTIONAL | JSON array                               |
| JSON References | ✅ FULLY_FUNCTIONAL | JSON Pointer-based cross-file references |
| SourceFile      | ✅ FULLY_FUNCTIONAL | JSON source file output                  |

### Markdown (`@alloy-js/markdown`)

| Feature     | Status              | Description                 |
| ----------- | ------------------- | --------------------------- |
| Heading     | ✅ FULLY_FUNCTIONAL | Markdown headings           |
| Code        | ✅ FULLY_FUNCTIONAL | Fenced code blocks          |
| List        | ✅ FULLY_FUNCTIONAL | Ordered and unordered lists |
| Link        | ✅ FULLY_FUNCTIONAL | Markdown links              |
| Section     | ✅ FULLY_FUNCTIONAL | Content sections            |
| Frontmatter | ✅ FULLY_FUNCTIONAL | YAML frontmatter blocks     |
| SourceFile  | ✅ FULLY_FUNCTIONAL | Markdown file output        |

### MSBuild (`@alloy-js/msbuild`)

| Feature          | Status              | Description                               |
| ---------------- | ------------------- | ----------------------------------------- |
| MSBuild Elements | ✅ FULLY_FUNCTIONAL | Full MSBuild XML element support          |
| Schema-driven    | ✅ FULLY_FUNCTIONAL | Component generation from MSBuild schemas |

### Tooling

| Feature                                   | Status                  | Description                                                           |
| ----------------------------------------- | ----------------------- | --------------------------------------------------------------------- |
| CLI (`@alloy-js/cli`)                     | ✅ FULLY_FUNCTIONAL     | `alloy build` / `alloy watch` commands                                |
| Babel Plugin (`@alloy-js/babel-plugin`)   | ✅ FULLY_FUNCTIONAL     | Whitespace-preserving JSX transformation                              |
| Babel Plugin JSX DOM                      | ✅ FULLY_FUNCTIONAL     | JSX to DOM plugin for fine-grained change detection                   |
| Babel Preset (`@alloy-js/babel-preset`)   | ✅ FULLY_FUNCTIONAL     | Combined babel preset                                                 |
| Rollup Plugin (`@alloy-js/rollup-plugin`) | ✅ FULLY_FUNCTIONAL     | Rollup/Vite integration                                               |
| Create (`@alloy-js/create`)               | ✅ FULLY_FUNCTIONAL     | `npm init @alloy-js` project scaffolding                              |
| Documentation (`docs`)                    | 🟡 PARTIALLY_FUNCTIONAL | Astro/Starlight docs site — marked as "not great but being worked on" |

### CI/CD

| Feature             | Status              | Description                                |
| ------------------- | ------------------- | ------------------------------------------ |
| GitHub Actions      | ✅ FULLY_FUNCTIONAL | CI with concurrency cancellation           |
| Continuous Releases | ✅ FULLY_FUNCTIONAL | pkg-pr-new for continuous package releases |
| Chronus             | ✅ FULLY_FUNCTIONAL | Change management system                   |
| API Extractor       | ✅ FULLY_FUNCTIONAL | API documentation generation per package   |

---

## Known Issues

| Issue                                                                         | Severity         | Location                                              |
| ----------------------------------------------------------------------------- | ---------------- | ----------------------------------------------------- |
| `symbol-flow.ts:99` uses `context!` instead of `symbolTaker!`                 | 🔴 Bug           | `core/src/symbols/symbol-flow.ts`                     |
| `symbol-slot.tsx:52` creates new `shallowRef()` on every `firstSymbol` access | 🔴 Bug           | `core/src/symbols/symbol-slot.tsx`                    |
| `output-scope.ts:157` sets `ReactiveFlags.SKIP = this` instead of `true`      | 🟡 Potential Bug | `core/src/symbols/output-scope.ts`                    |
| `binder.ts:249` `if (!refkey)` checks imported function (always truthy)       | 🟡 Potential Bug | `core/src/binder.ts`                                  |
| C# `Declaration.tsx` throws at runtime                                        | 🟡 Stub          | `csharp/src/components/Declaration.tsx`               |
| Global mutable state prevents parallel rendering                              | 🟠 Limitation    | `core/src/reactivity.ts`, `scheduler.ts`, `refkey.ts` |
