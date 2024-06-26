import withNuxt from './.nuxt/eslint.config.mjs';

export default withNuxt(
    {
        rules: {
            semi: "error",
            "prefer-const": "error",
        },
        ignores: [
            "node_modules",
            ".nuxt",
            ".output"
        ]
    }
);
