import mantine from "eslint-config-mantine";
import tseslint from "@typescript-eslint/eslint-plugin";
import parser from "@typescript-eslint/parser";

export default [
  {
    ignores: ["**/*.{mjs,cjs,js,d.ts,d.mts}", "./.storybook/main.ts"],
  },
  {
    ...mantine,
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      parser,
      parserOptions: {
        sourceType: "module",
        ecmaVersion: "latest",
      },
    },
    rules: {
      ...mantine.rules,
      curly: ["error", "multi-line"],
    },
  },
];
