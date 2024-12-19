const { createGlobPatternsForDependencies } = require('@nx/angular/tailwind');
const { join } = require('path');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    join(__dirname, 'src/**/!(*.stories|*.spec).{ts,html}'),
    ...createGlobPatternsForDependencies(__dirname),
  ],
  theme: {
    extend: {
      keyframes: {
        slideRight: {
          '0%': { transform: 'translateX(-50vw)' },
          '100%': { transform: 'translateX(150vw)' },
        },
      },
      animation: {
        loading: 'slideRight 1s linear infinite',
      },
      transitionProperty: {
        height: 'height',
        width: 'width',
      },
    },
  },
  plugins: [],
};
