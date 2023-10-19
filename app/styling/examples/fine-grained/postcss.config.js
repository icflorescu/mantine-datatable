module.exports = {
  plugins: {
    // 👇 the postcss-import plugin must come first;
    //    make sure to install it with `npm i -D postcss-import` or `yarn add -D postcss-import`
    'postcss-import': {},
    'postcss-preset-mantine': {},
    'postcss-simple-vars': {
      // your Mantine variables here...
    },
  },
};
