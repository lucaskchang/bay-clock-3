import type { Config } from "tailwindcss";

export default {
  content: ["./assets/styles/**/*.json"],
  safelist: [
    {
      pattern: /bg-.*/,
      variants: ["dark", "hover", "dark:hover"],
    },
    {
      pattern: /text-.*/,
      variants: ["dark"],
    },
  ],
} satisfies Config;
