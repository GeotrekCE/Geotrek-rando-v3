module.exports = {
  plugins: [
    'tailwindcss',
    'postcss-flexbugs-fixes',
    [
      'postcss-preset-env',
      {
        autoprefixer: {
          flexbox: 'no-2009',
        },
        stage: 3,
        features: {
          'custom-properties': false,
        },
      },
    ],
    [
      '@fullhuman/postcss-purgecss',
      {
        content: ['./src/**/*.{js,jsx,ts,tsx}'],
        defaultExtractor: content => content.match(/[\w-/:]+(?<!:)/g) || [],
        safelist: {
          standard: [/^slick-/, /dropdown/, /^leaflet-/],
          deep: [],
          greedy: [/elevation/, /lightblue-theme/],
        },
      },
    ],
  ],
};
