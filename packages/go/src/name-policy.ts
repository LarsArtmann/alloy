import { createNamePolicy, NamePolicy, useNamePolicy } from "@alloy-js/core";

export type GoElements =
  | "parameter"
  | "type-parameter"
  | "function"
  | "type"
  | "variable"
  | "struct-member"
  | "interface-member";

const GLOBAL_RESERVED_WORDS = new Set([
  "break",
  "case",
  "chan",
  "const",
  "continue",
  "default",
  "defer",
  "else",
  "fallthrough",
  "for",
  "func",
  "go",
  "goto",
  "if",
  "import",
  "interface",
  "map",
  "package",
  "range",
  "return",
  "select",
  "struct",
  "switch",
  "type",
  "var",
]);

/**
 * Ensures a valid Go identifier for the given element kind.
 * @param name - The name to validate.
 * @param element - The Go element kind.
 * @returns A Go-safe name.
 */
function ensureNonReservedName(name: string, element: GoElements): string {
  const suffix = "_";

  // Global reserved words always need handling
  if (GLOBAL_RESERVED_WORDS.has(name)) {
    return `${name}${suffix}`;
  }

  // Apply auto-naming logic for public/private symbols
  return applyPublicPrivateNaming(name, element);
}

/**
 * Applies auto-naming logic for public and private symbols in Go.
 *
 * In Go, visibility is determined by the first character of the name:
 * - Uppercase: Public (exported)
 * - Lowercase: Private (unexported)
 *
 * This function ensures the name follows the appropriate convention based on its first letter.
 * @param name - The original name.
 * @param element - The Go element type.
 * @returns The name with proper public/private naming applied.
 */
function applyPublicPrivateNaming(name: string, element: GoElements): string {
  // For certain element types, we might want to ensure proper naming
  switch (element) {
    case "function":
    case "type":
      // Check if name is empty
      if (!name) {
        return name;
      }
      // If first character is uppercase, ensure the rest follows PascalCase for public symbols
      if (name[0] === name[0].toUpperCase() && name[0] !== name[0].toLowerCase()) {
        // This is intended to be a public symbol
        return name;
      }
      // If first character is lowercase, ensure it remains lowercase for private symbols
      else if (name[0] === name[0].toLowerCase() && name[0] !== name[0].toUpperCase()) {
        // This is intended to be a private symbol
        return name;
      }
      // If the first character is neither (e.g., number or symbol), keep it as is
      else {
        return name;
      }
      
    case "struct-member":
    case "interface-member":
      // Struct and interface members follow the same public/private rules
      if (!name) {
        return name;
      }
      if (name[0] === name[0].toUpperCase() && name[0] !== name[0].toLowerCase()) {
        // Public member
        return name;
      }
      else if (name[0] === name[0].toLowerCase() && name[0] !== name[0].toUpperCase()) {
        // Private member  
        return name;
      }
      else {
        return name;
      }
      
    case "parameter":
    case "type-parameter":
    case "variable":
      // These are always private/local, so use lowercase first letter
      if (!name) {
        return name;
      }
      // Ensure first character is lowercase
      if (name[0] === name[0].toUpperCase() && name[0] !== name[0].toLowerCase()) {
        return name[0].toLowerCase() + name.slice(1);
      }
      return name;
      
    default:
      return name;
  }
}

export function createGoNamePolicy(): NamePolicy<GoElements> {
  return createNamePolicy((name, element) => {
    return ensureNonReservedName(name, element);
  });
}

export function useGoNamePolicy(): NamePolicy<GoElements> {
  return useNamePolicy();
}
