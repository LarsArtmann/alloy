import { Code, render } from "@alloy-js/core";
import { describe, expect, it } from "vitest";
import { TestPackage } from "../../../test/utils.js";
import { FunctionDeclaration } from "./function.js";
import { TypeDeclaration } from "../type/declaration.js";
import { StructDeclaration } from "../struct/declaration.js";

describe("Auto-naming logic for public and private symbols", () => {
  describe("Functions", () => {
    it("preserves uppercase first letter for public functions", () => {
      expect(
        <TestPackage>
          <FunctionDeclaration name="PublicFunction" />
        </TestPackage>,
      ).toRenderTo(`
        package alloy

        func PublicFunction() {}
      `);
    });

    it("preserves lowercase first letter for private functions", () => {
      expect(
        <TestPackage>
          <FunctionDeclaration name="privateFunction" />
        </TestPackage>,
      ).toRenderTo(`
        package alloy

        func privateFunction() {}
      `);
    });

    it("handles reserved words in function names", () => {
      expect(
        <TestPackage>
          <FunctionDeclaration name="func" />
        </TestPackage>,
      ).toRenderTo(`
        package alloy

        func func_() {}
      `);
    });
  });

  describe("Parameters", () => {
    it("converts uppercase first letter to lowercase", () => {
      expect(
        <TestPackage>
          <FunctionDeclaration 
            name="testFunction"
            parameters={[
              { name: "Param", type: "int" },
              { name: "UPPERCASE_PARAM", type: "string" },
            ]}
          />
        </TestPackage>,
      ).toRenderTo(`
        package alloy

        func testFunction(param int, uPPERCASE_PARAM string) {}
      `);
    });

    it("preserves lowercase parameters", () => {
      expect(
        <TestPackage>
          <FunctionDeclaration 
            name="testFunction"
            parameters={[
              { name: "param", type: "int" },
              { name: "normalParam", type: "string" },
            ]}
          />
        </TestPackage>,
      ).toRenderTo(`
        package alloy

        func testFunction(param int, normalParam string) {}
      `);
    });

    it("handles reserved words in parameter names", () => {
      expect(
        <TestPackage>
          <FunctionDeclaration 
            name="testFunction"
            parameters={[
              { name: "return", type: "int" },
            ]}
          />
        </TestPackage>,
      ).toRenderTo(`
        package alloy

        func testFunction(return_ int) {}
      `);
    });
  });

  describe("Reserved Words Handling", () => {
    it("adds suffix to all reserved words", () => {
      const reservedWords = [
        "break", "case", "chan", "const", "continue", "default", "defer",
        "else", "fallthrough", "for", "func", "go", "goto", "if", "import",
        "interface", "map", "package", "range", "return", "select",
        "struct", "switch", "type", "var"
      ];

      reservedWords.forEach(word => {
        // Test that reserved words get the suffix
        const { createGoNamePolicy } = require("../../name-policy.js");
        const namePolicy = createGoNamePolicy();
        const result = namePolicy.for("function")(word);
        expect(result).toBe(word + "_");
      });
    });
  });
});