# BDD Testing Assessment

**Date:** 2026-05-11

## Current State

Alloy uses **Vitest** as its testing framework across all 172 test files (1,269 tests passing).

### Testing Patterns

- **Custom matcher `toRenderTo`** — renders JSX trees to strings and asserts on output
- **No mocking** — tests render real component trees
- **Inline expectations** — expected output written as dedented template literals
- **Import side-effect registration** — `import "@alloy-js/core/testing"` auto-registers matchers

### Test Infrastructure

| File                                     | Purpose                                               |
| ---------------------------------------- | ----------------------------------------------------- |
| `packages/core/testing/index.ts`         | Barrel for testing utilities                          |
| `packages/core/testing/render.ts`        | `renderToString()`, `dedent()`, `d()` tagged template |
| `packages/core/testing/extend-expect.ts` | `toRenderTo` / `toRenderToAsync` matchers             |

## BDD Recommendations for TypeScript

Since this is a TypeScript project (not Go), BDD-style tests would use Vitest's built-in `describe`/`it`/`expect` pattern rather than Ginkgo. The project already follows BDD naming conventions in many tests.

### Missing BDD Coverage Areas

1. **User Journey Tests** — No end-to-end tests for the full "create a project → define components → render → write output" workflow
2. **Cross-package Integration** — No tests verifying that `@alloy-js/typescript` + `@alloy-js/core` work together for complex scenarios (e.g., multi-file imports with re-exports)
3. **Error Scenarios** — No tests for:
   - Invalid JSX trees
   - Missing refkeys / unresolved references
   - Circular reference detection
   - Name conflict resolution edge cases
4. **Async Rendering** — `toRenderToAsync` exists but no test file exercises it
5. **Edge Cases** — No tests for:
   - Empty output
   - Deeply nested scopes (>10 levels)
   - Large-scale symbol tables (performance)
   - Template file variable substitution with special characters

### Proposed BDD Test Suites

#### 1. Core Rendering Behavior (`test/bdd/rendering.behavior.test.tsx`)

```typescript
describe("Rendering Pipeline", () => {
  describe("when rendering a simple component tree", () => {
    it("should produce source text from string children");
    it("should handle nested components");
    it("should preserve whitespace according to filetype");
  });
  describe("when rendering with reactivity", () => {
    it("should re-render when reactive state changes");
    it("should batch updates efficiently");
  });
});
```

#### 2. Symbol Resolution Behavior (`test/bdd/symbol-resolution.behavior.test.tsx`)

```typescript
describe("Symbol Resolution", () => {
  describe("when declaring symbols", () => {
    it("should register symbols in the current scope");
    it("should handle name conflicts with configurable resolver");
    it("should apply naming policies");
  });
  describe("when referencing symbols across files", () => {
    it("should generate correct import paths");
    it("should resolve member access chains");
    it("should handle forward references");
  });
});
```

#### 3. Language Emitter Behavior (`test/bdd/language-emitter.behavior.test.tsx`)

```typescript
describe("TypeScript Emitter", () => {
  describe("when generating a class", () => {
    it("should produce valid TypeScript with correct imports");
    it("should handle generics, inheritance, and implements");
  });
});
```

## Priority

**Medium** — Current test coverage is strong (1,269 tests). BDD tests would add value for user-journey scenarios and cross-package integration, but are not blocking.

## Status

PARTIALLY_FUNCTIONAL — Good unit/rendering tests exist; missing BDD-style user journey and cross-package integration tests.
