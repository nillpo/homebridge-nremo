module.exports = {
  env: {
    es6: true
  },
  plugins: ["node"],
  extends: ["eslint:recommended", "plugin:node/recommended"],
  rules: {
    "node/exports-style": ["error", "module.exports"],
    "no-prototype-buildins": "off",
    "no-else-return": "error",
    "comma-dangle": "error",
    "eol-last": "error",
    "max-depth": ["error", 4],
    "max-nested-callbacks": ["error", 4],
    "no-lonely-if": "error",
    "no-tabs": "error",
    "prefer-const": "error",
    "no-console": "off"
  }
};

