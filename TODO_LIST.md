# Alloy TODO List

**Generated:** 2026-05-11 | **Source:** All .md files + code TODOs + code review findings

---

## Status Legend

- ⬜ NOT STARTED
- 🟡 IN PROGRESS
- ✅ DONE
- 🔴 BUG

---

## 1. Critical Bugs

| #   | Status | Item                                                                                                                  | Source      | Effort |
| --- | ------ | --------------------------------------------------------------------------------------------------------------------- | ----------- | ------ |
| 1   | 🔴     | Fix `symbol-flow.ts:99` — `context!` should be `symbolTaker!` in `emitSymbol` cleanup callback                        | Code Review | 15min  |
| 2   | 🔴     | Fix `symbol-slot.tsx:52` — `firstSymbol` getter creates new `shallowRef()` + `effect()` on every access (memory leak) | Code Review | 30min  |
| 3   | 🔴     | Fix `binder.ts:249` — `if (!refkey)` checks imported function (always truthy), likely meant `!symbol.refkeys`         | Code Review | 15min  |
| 4   | 🔴     | Fix `output-scope.ts:157` — `ReactiveFlags.SKIP = this` should be `true` (like OutputSymbol)                          | Code Review | 15min  |

---

## 2. Lint / Code Quality

| #   | Status | Item                                                                                                       | Source      | Effort |
| --- | ------ | ---------------------------------------------------------------------------------------------------------- | ----------- | ------ |
| 5   | ⬜     | Fix floating promise in `create/src/index.tsx:429` — add `void` or `await`                                 | Lint        | 15min  |
| 6   | ⬜     | Replace `throw "Unsupported"` with `new Error("Unsupported")` in `go/create-module.ts`                     | Code Review | 15min  |
| 7   | ⬜     | Replace `throw "Unsupported"` with `new Error("Unsupported")` in `csharp/create-library.ts`                | Code Review | 15min  |
| 8   | ⬜     | Remove 10 no-op `try { } catch(e) { throw e; }` patterns in `core/host/alloy-host.ts`                      | Code Review | 15min  |
| 9   | ⬜     | Fix copy-paste error message in `ReferenceOrContent.tsx` — says "declarations" but should say "references" | Code Review | 5min   |
| 10  | ⬜     | Remove unused `SourceFile` import in `Output.tsx` (eslint-disable)                                         | Code Review | 5min   |
| 11  | ⬜     | Remove dead `eslint-disable` for unused imports in `utils.tsx`                                             | Code Review | 5min   |

---

## 3. Code TODOs (from source)

| #   | Status | Item                                                                                                   | Source File                                            | Effort |
| --- | ------ | ------------------------------------------------------------------------------------------------------ | ------------------------------------------------------ | ------ |
| 12  | ⬜     | Remove unnecessary effect in `render.ts:547` — "only needed for context, not needed for anything else" | `core/src/render.ts`                                   | 1hr    |
| 13  | ⬜     | Validate that a symbol can't belong to spaces in different scopes                                      | `csharp/src/symbols/csharp.ts:83`                      | 2hr    |
| 14  | ⬜     | Validate that a symbol can't belong to spaces in different scopes                                      | `go/src/symbols/go.ts:39`                              | 2hr    |
| 15  | ⬜     | Support Gradle projects (currently only Maven)                                                         | `java/src/symbols/java-project-scope.ts:63`            | 4hr    |
| 16  | ⬜     | Handle multi-level config such as Maven shade plugin                                                   | `java/src/symbols/java-project-scope.ts:50`            | 2hr    |
| 17  | ⬜     | Emit proper symbol in MemberExpression when known (TS)                                                 | `typescript/src/components/MemberExpression.tsx:88`    | 2hr    |
| 18  | ⬜     | Emit proper symbol in MemberExpression when known (Python)                                             | `python/src/components/MemberExpression.tsx:86`        | 2hr    |
| 19  | ⬜     | Don't allow importing non-exported symbols                                                             | `typescript/src/components/ImportStatement.tsx:44`     | 1hr    |
| 20  | ⬜     | Refactor `PackageDirectory.tsx` — "can probably just use context"                                      | `typescript/src/components/PackageDirectory.tsx:68`    | 30min  |
| 21  | ⬜     | Refactor `SourceDirectory.tsx` — "can probably just use context"                                       | `core/src/components/SourceDirectory.tsx:15`           | 30min  |
| 22  | ⬜     | Allow manual imports and `.` imports in Go                                                             | `go/src/components/ImportStatement.tsx:20`             | 1hr    |
| 23  | ⬜     | Mark unexported struct fields as "promoted" in Go                                                      | `go/src/components/struct/declaration.tsx:202`         | 2hr    |
| 24  | ⬜     | Implement wildcard import support for Java                                                             | `java/src/components/SourceFile.tsx:54`                | 1hr    |
| 25  | ⬜     | Set `aliasTarget` when alias is true in Go type declarations                                           | `go/src/components/type/declaration.tsx:69`            | 1hr    |
| 26  | ⬜     | Implement `this.` prefix for member assignments in C#                                                  | `csharp/src/components/class/declaration.test.tsx:344` | 1hr    |

---

## 4. Dead Code / Incomplete

| #   | Status | Item                                                                                      | Source      | Effort |
| --- | ------ | ----------------------------------------------------------------------------------------- | ----------- | ------ |
| 27  | ⬜     | Remove or implement unused `toSpaceKey`/`fromSpaceKey` params in `symbol-flow.ts:121-129` | Code Review | 15min  |
| 28  | ⬜     | Implement C# `Declaration.tsx` — currently throws at runtime (stub)                       | Code Review | 2hr    |
| 29  | ⬜     | Memoize `namekey` like `refkey` — currently creates new object per call                   | Code Review | 30min  |

---

## 5. Architecture Improvements

| #   | Status | Item                                                                           | Source       | Effort |
| --- | ------ | ------------------------------------------------------------------------------ | ------------ | ------ |
| 30  | ⬜     | Extract `mapGet` helper from go/csharp to shared utility                       | Architecture | 30min  |
| 31  | ⬜     | Extract `useLexicalScope` factory pattern to shared utility                    | Architecture | 30min  |
| 32  | ⬜     | Extract `getCallSignatureProps` shared pattern from ts/python                  | Architecture | 30min  |
| 33  | ⬜     | Unify `stc.ts`/`sti.ts` into shared factory (~60 lines duplication)            | Architecture | 1hr    |
| 34  | ⬜     | Decompose `mapJoin` (~350 lines) into focused sub-functions                    | Architecture | 2hr    |
| 35  | ⬜     | Decompose `appendChild` in `render.ts` (~200 lines) into handler registry      | Architecture | 2hr    |
| 36  | ⬜     | Decompose `code` function (~260 lines) into tokenizer sub-modules              | Architecture | 2hr    |
| 37  | ⬜     | Split `tracer.ts` (441 lines) into tracer + formatter                          | Architecture | 1hr    |
| 38  | ⬜     | Abstract Vue reactivity behind adapter (decouple from track/trigger internals) | Architecture | 3hr    |
| 39  | ⬜     | Implement context-per-render (eliminate global state for parallel rendering)   | Architecture | 3hr    |
| 40  | ⬜     | Add browser counterpart for `inspect.ts`                                       | Architecture | 30min  |
| 41  | ⬜     | Abstract `process.env` behind host interface (tracer, debug, write-output)     | Architecture | 1hr    |
| 42  | ⬜     | Add logger abstraction to `write-output.ts`                                    | Architecture | 30min  |
| 43  | ⬜     | Add `removeSubset` to `ReactiveUnionSet`                                       | Architecture | 1hr    |
| 44  | ⬜     | Clean up `contextsByKey` Map on context disposal                               | Architecture | 30min  |
| 45  | ⬜     | Add `IntrinsicHandlerRegistry` for extensible intrinsic types                  | Architecture | 2hr    |

---

## 6. Type Safety

| #   | Status | Item                                                                            | Source      | Effort |
| --- | ------ | ------------------------------------------------------------------------------- | ----------- | ------ |
| 46  | ⬜     | Eliminate `as any` in `stc.ts`/`sti.ts`                                         | Code Review | 2hr    |
| 47  | ⬜     | Eliminate `as any` in `component.ts` (`taggedComponent`)                        | Code Review | 1hr    |
| 48  | ⬜     | Eliminate `as any` in `content-slot.tsx`                                        | Code Review | 30min  |
| 49  | ⬜     | Eliminate `as any` in `props-combinators.ts`                                    | Code Review | 1hr    |
| 50  | ⬜     | Eliminate `as any` in `tap.ts`                                                  | Code Review | 30min  |
| 51  | ⬜     | Add literal discriminants to `Declaration`/`Scope` discriminated unions         | Code Review | 30min  |
| 52  | ⬜     | Make `List` separator props a union type instead of mutually exclusive booleans | Code Review | 30min  |
| 53  | ⬜     | Fix `MemberContext` interface/const name collision in `context/member-scope.ts` | Code Review | 15min  |
| 54  | ⬜     | Add type guard for `scope` getter cast in `output-symbol.ts`                    | Code Review | 15min  |
| 55  | ⬜     | Fix `nameConflictResolver` type in `Output.tsx` (currently `any[]`)             | Code Review | 15min  |

---

## 7. Test Coverage

| #   | Status | Item                                                          | Source      | Effort |
| --- | ------ | ------------------------------------------------------------- | ----------- | ------ |
| 56  | ⬜     | Add async rendering tests (`toRenderToAsync`)                 | BDD Testing | 2hr    |
| 57  | ⬜     | Add error/edge-case tests for refkey resolution               | BDD Testing | 2hr    |
| 58  | ⬜     | Add cross-package integration tests                           | BDD Testing | 2hr    |
| 59  | ⬜     | Add tests for `ReactiveUnionSet`                              | BDD Testing | 1hr    |
| 60  | ⬜     | Add tests for `createResource`/`createFileResource`           | BDD Testing | 1hr    |
| 61  | ⬜     | Add tests for circular reference detection                    | BDD Testing | 1hr    |
| 62  | ⬜     | Add user-journey BDD tests (create → define → render → write) | BDD Testing | 3hr    |

---

## 8. Project-Level

| #   | Status | Item                                                                           | Source    | Effort  |
| --- | ------ | ------------------------------------------------------------------------------ | --------- | ------- |
| 63  | 🟡     | Improve documentation ("The docs are not great but are being worked on")       | readme.md | Ongoing |
| 64  | ⬜     | Publish to NPM ("Alloy will be published to NPM in the coming weeks")          | readme.md | 1hr     |
| 65  | ⬜     | Add more language support ("More are coming soon")                             | readme.md | Large   |
| 66  | ⬜     | Complete Go support (currently "initial implementation")                       | Chronus   | Ongoing |
| 67  | ⬜     | Complete Python support (ongoing — dataclass, enum, docstrings recently added) | Chronus   | Ongoing |
| 68  | ⬜     | Add more Go standard library modules (time module recently added)              | Chronus   | Ongoing |

---

## Files Read for This TODO List

| File                                                      | Status  |
| --------------------------------------------------------- | ------- |
| `readme.md`                                               | ✅ Read |
| `packages/docs/src/content/docs/guides/basic-concepts.md` | ✅ Read |
| `.chronus/changes/*.md` (13 files)                        | ✅ Read |
| `test/performance/README.md`                              | ✅ Read |
| Source code TODO/FIXME grep results                       | ✅ Read |
| Code review findings (full codebase analysis)             | ✅ Read |
| `FEATURES.md` (generated)                                 | ✅ Read |

---

## Summary Statistics

| Category                  | Count  |
| ------------------------- | ------ |
| Critical Bugs             | 4      |
| Lint / Code Quality       | 7      |
| Code TODOs                | 15     |
| Dead Code / Incomplete    | 3      |
| Architecture Improvements | 16     |
| Type Safety               | 10     |
| Test Coverage             | 7      |
| Project-Level             | 6      |
| **Total**                 | **68** |
