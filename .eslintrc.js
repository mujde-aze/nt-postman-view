module.exports = {
  "env": {
    "browser": true,
    "es2021": true,
  },
  "extends": [
    "plugin:react/recommended",
    "google",
  ],
  "parserOptions": {
    "ecmaFeatures": {
      "jsx": true,
    },
    "ecmaVersion": 13,
    "sourceType": "module",
  },
  "plugins": [
    "react",
    "react-hooks",
  ],
  "ignorePatterns": [
    "src/models/Helvetica-unicode-normal.js",
    "src/*.css",
  ],
  "rules": {
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn",
    "quotes": ["error", "double"],
    "max-len": "off",
    "semi": ["error", "always"],
    "require-jsdoc": "off",
    "react/react-in-jsx-scope": "off",
  },
  "settings": {
    "react": {
      "pragma": "React",
      "version": "detect",
    },
  },
};
