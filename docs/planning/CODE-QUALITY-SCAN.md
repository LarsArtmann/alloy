# Code Quality Scan

**Date:** 2026-05-11 | **Commit:** c8f172c

---

## Summary

| Check       | Result                                             |
| ----------- | -------------------------------------------------- |
| Build       | ✅ PASS (22/23 packages, `docs` excluded)          |
| Tests       | ✅ PASS (172 files, 1,269 tests, 0 failures)       |
| Lint        | ⚠️ FAIL (1 warning — floating promise in `create`) |
| Format      | ✅ PASS (after fix)                                |
| Duplication | ⚠️ 178 clones detected by jscpd                    |

---

## Build Issues

None — all packages build successfully.

## Lint Issues

| #   | Severity | File                                | Rule                                      | Description                                                                        |
| --- | -------- | ----------------------------------- | ----------------------------------------- | ---------------------------------------------------------------------------------- |
| 1   | Warning  | `packages/create/src/index.tsx:429` | `@typescript-eslint/no-floating-promises` | Promise must be awaited, end with `.catch()`, or be explicitly ignored with `void` |

## Code Duplication (178 clones)

### High-Impact Duplications

| #   | Files                                                          | Lines    | Tokens    | Description                                                                               |
| --- | -------------------------------------------------------------- | -------- | --------- | ----------------------------------------------------------------------------------------- |
| 1   | `ts/ArrowFunction.tsx` ↔ `ts/FunctionExpression.tsx`          | 11       | 148       | Identical child extraction + parameter/body/type param logic                              |
| 2   | `ts/create-package.ts` ↔ `python/create-module.ts`            | 8        | 91        | Identical SymbolCreator pattern with refkeys/binder                                       |
| 3   | `core/host/alloy-host.browser.ts` ↔ `core/host/alloy-host.ts` | 11       | 107       | Identical interface shape (read/write structure)                                          |
| 4   | `go/create-module.ts` ↔ `csharp/create-library.ts`            | ~50      | ~400      | Nearly identical `createSymbolFromDescriptor` with `mapGet` helper                        |
| 5   | `java/src/utils.ts` ↔ `typescript/src/utils.ts`               | ~15      | ~80       | Identical `useLexicalScope` pattern                                                       |
| 6   | `python/src/utils.ts` ↔ `typescript/src/utils.ts`             | ~25      | ~150      | Nearly identical `getCallSignatureProps` with slightly different props                    |
| 7   | `core/src/stc.ts` ↔ `core/src/sti.ts`                         | ~60      | ~400      | Nearly identical structure — `stc` and `sti` differ only in intrinsic vs component target |
| 8   | Language `useLexicalScope` hooks                               | 4 copies | ~60 total | Same pattern across TS, Java, Python, Go                                                  |

### Per-Package Duplication Analysis

| Package      | Clone Count | Severity                                                            |
| ------------ | ----------- | ------------------------------------------------------------------- |
| `core`       | ~30         | Medium — mostly in test files and host abstractions                 |
| `typescript` | ~25         | Medium — ArrowFunction/FunctionExpression, shared function patterns |
| `go`         | ~20         | Low — mostly descriptor pattern                                     |
| `java`       | ~15         | Low                                                                 |
| `python`     | ~25         | Medium — class/method/function declaration patterns                 |
| `csharp`     | ~35         | Medium — access expression, constructor patterns                    |
| `json`       | ~5          | Low                                                                 |
| `markdown`   | ~3          | Low                                                                 |

---

## Architectural Quality Issues

| #   | Severity      | Category       | File                                      | Issue                                                                                                                |
| --- | ------------- | -------------- | ----------------------------------------- | -------------------------------------------------------------------------------------------------------------------- |
| 1   | 🔴 Bug        | Correctness    | `core/src/symbols/symbol-flow.ts:99`      | `context!` should be `symbolTaker!` in `emitSymbol` cleanup                                                          |
| 2   | 🔴 Bug        | Memory         | `core/src/symbols/symbol-slot.tsx:52`     | `firstSymbol` getter creates new `shallowRef()` + `effect()` on every access                                         |
| 3   | 🟡 Bug        | Correctness    | `core/src/binder.ts:249`                  | `if (!refkey)` checks imported function (always truthy), likely meant `!symbol.refkeys`                              |
| 4   | 🟡 Bug        | Correctness    | `core/src/symbols/output-scope.ts:157`    | `ReactiveFlags.SKIP = this` should be `true` (like OutputSymbol)                                                     |
| 5   | 🟡 Smell      | Completeness   | `core/src/symbols/symbol-flow.ts:121-129` | `instantiateTakenMembersTo` has unused `toSpaceKey`/`fromSpaceKey` params                                            |
| 6   | 🟡 Smell      | Complexity     | `core/src/utils.tsx`                      | `mapJoin` is ~350 lines with nested closures                                                                         |
| 7   | 🟡 Smell      | Complexity     | `core/src/render.ts`                      | `appendChild` handles 6 cases in a single function (~200 lines)                                                      |
| 8   | 🟡 Smell      | Complexity     | `core/src/code.ts`                        | `code` function is ~260 lines with complex state machine                                                             |
| 9   | 🟡 Smell      | Coupling       | `core/src/tracer.ts`                      | Hard Node.js dependency (`process.env`)                                                                              |
| 10  | 🟡 Smell      | Coupling       | `core/src/inspect.ts`                     | Hard Node.js dependency (`util`) — no browser counterpart                                                            |
| 11  | 🟡 Smell      | Coupling       | `core/src/debug.ts`                       | Hard Node.js dependency; pollutes `globalThis.debug`                                                                 |
| 12  | 🟡 Smell      | Coupling       | `core/src/write-output.ts`                | Hard `process.cwd()` dependency; console logging not configurable                                                    |
| 13  | 🟡 Smell      | Types          | Multiple                                  | Pervasive `as any` casts in `stc.ts`, `sti.ts`, `component.ts`, `content-slot.tsx`, `props-combinators.ts`, `tap.ts` |
| 14  | 🟡 Smell      | No-op          | `core/src/host/alloy-host.ts`             | ~10 `try { } catch(e) { throw e; }` patterns are no-ops                                                              |
| 15  | 🟡 Smell      | Memory         | `core/src/refkey.ts`                      | `knownRefkeys` and `objectIds` Maps never cleaned up                                                                 |
| 16  | 🟡 Smell      | Memory         | `core/src/reactive-union-set.ts`          | `createDerivedSet` effects pushed to `_indexes` but never cleaned up                                                 |
| 17  | 🟡 Smell      | Memory         | `core/src/scheduler.ts`                   | Global queues never reset between renders                                                                            |
| 18  | 🟠 Limitation | Architecture   | `core/src/reactivity.ts`                  | `globalContext` prevents parallel rendering in same process                                                          |
| 19  | 🟠 Limitation | Architecture   | `core/src/jsx-runtime.ts`                 | Self-referencing import from `@alloy-js/core` creates circular dependency risk                                       |
| 20  | 🟡 Smell      | Error Handling | `go/src/create-module.ts:312`             | `throw "Unsupported"` — raw string instead of `Error` object                                                         |

---

## Sorted Priority List (Top 30 by Impact)

| Priority | Task                                                         | Effort | Impact                   |
| -------- | ------------------------------------------------------------ | ------ | ------------------------ |
| 1        | Fix `symbol-flow.ts:99` bug (`context!` → `symbolTaker!`)    | 15min  | Critical correctness fix |
| 2        | Fix `symbol-slot.tsx:52` memory leak (new ref per access)    | 30min  | Memory leak fix          |
| 3        | Fix `binder.ts:249` dead guard (`!refkey` always false)      | 15min  | Correctness fix          |
| 4        | Fix `output-scope.ts:157` `ReactiveFlags.SKIP = this`        | 15min  | Potential reactivity bug |
| 5        | Fix floating promise in `create/src/index.tsx:429`           | 15min  | Lint compliance          |
| 6        | Remove no-op try/catch in `alloy-host.ts` (10 instances)     | 15min  | Code clarity             |
| 7        | Extract `mapGet` helper from go/csharp into shared util      | 30min  | Dedup                    |
| 8        | Unify `stc.ts` / `sti.ts` into shared factory                | 1hr    | Dedup (~400 tokens)      |
| 9        | Extract `useLexicalScope` into shared pattern                | 30min  | Dedup (4 copies)         |
| 10       | Extract shared `getCallSignatureProps`                       | 30min  | Dedup (2 copies)         |
| 11       | Replace `throw "Unsupported"` with `new Error()`             | 15min  | Error handling           |
| 12       | Reduce `mapJoin` complexity (extract sub-functions)          | 2hr    | Maintainability          |
| 13       | Reduce `appendChild` complexity in `render.ts`               | 2hr    | Maintainability          |
| 14       | Reduce `code` function complexity                            | 2hr    | Maintainability          |
| 15       | Add `as any` elimination plan for core types                 | 3hr    | Type safety              |
| 16       | Add browser counterpart for `inspect.ts`                     | 30min  | Browser compat           |
| 17       | Abstract `process.env` behind host interface                 | 1hr    | Testability              |
| 18       | Add logger abstraction to `write-output.ts`                  | 30min  | Testability              |
| 19       | Implement `removeSubset` on `ReactiveUnionSet`               | 1hr    | Completeness             |
| 20       | Add cleanup for `refkey.ts` caches between renders           | 1hr    | Memory                   |
| 21       | Add cleanup for `scheduler.ts` global queues                 | 30min  | Memory                   |
| 22       | Remove dead import in `Output.tsx` (SourceFile)              | 5min   | Cleanup                  |
| 23       | Fix `ReferenceOrContent.tsx` error message (copy-paste)      | 5min   | Clarity                  |
| 24       | Fix `SourceDirectory.tsx` todo comment (context refactoring) | 15min  | Cleanup                  |
| 25       | Add async rendering tests                                    | 2hr    | Coverage                 |
| 26       | Add error/edge-case tests for refkey resolution              | 2hr    | Coverage                 |
| 27       | Add `removeSubset` counterpart for `ReactiveUnionSet`        | 1hr    | Completeness             |
| 28       | Investigate global singleton approach for parallel renders   | 3hr    | Architecture             |
| 29       | Add `toSpaceKey`/`fromSpaceKey` usage or remove params       | 15min  | Dead code                |
| 30       | Fix `namekey` non-memoized creation                          | 30min  | Performance              |
