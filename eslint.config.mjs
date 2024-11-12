import globals from "globals";
import pluginJs from "@eslint/js";
import googleConfig from 'eslint-config-google';


/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    files: ["**/*.js", "*.js"],
    languageOptions: {
       sourceType: "module",
      "globals": {...globals.browser, ...globals.node}
    },
    ...googleConfig,
    rules: {
      "valid-jsdoc": "off"
    }
  },
  pluginJs.configs.recommended,
];