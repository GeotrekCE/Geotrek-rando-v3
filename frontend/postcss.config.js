const purgecss = [
  '@fullhuman/postcss-purgecss',
  {
    content: ['**/*.tsx', '**/*.ts'],
    defaultExtractor: content => content.match(/[\w-/:]+(?<!:)/g) || [],
  },
];
module.exports = {
  plugins: [
    'postcss-import',
    'tailwindcss',
    'autoprefixer',
    ...(process.env.NODE_ENV === 'production' ? [purgecss] : []),
  ],
};
