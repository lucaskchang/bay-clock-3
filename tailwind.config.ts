import type { Config } from 'tailwindcss';

export default <Partial<Config>>{
  content: ['./assets/styles/**/*.json'],
  theme: {
    extend: {
      colors: {
        clock: {
          '50': '#f2f8fd',
          '100': '#e4eefa',
          '200': '#c4def3',
          '300': '#90c2e9',
          '400': '#59a5dd',
          '500': '#2e87c9',
          '600': '#1f6baa',
          '700': '#1a558a',
          '800': '#194873',
          '900': '#1a3e60',
          '950': '#112840',
        },
      },
    },
  },
};
