module.exports = {
  plugins: {
    'postcss-import': {},
    'tailwindcss/nesting': 'postcss-nesting',
    tailwindcss: {},
    autoprefixer: {},
    'postcss-preset-env': {
      features: {
        'nesting-rules': false,
      },
      browsers: ['> 1%', 'last 2 versions', 'Firefox ESR', 'not dead'],
    },
    'postcss-flexbugs-fixes': {},
    ...(process.env.NODE_ENV === 'production'
      ? {
          cssnano: {
            preset: ['default', { discardComments: { removeAll: true } }],
          },
        }
      : {}),
  },
};
