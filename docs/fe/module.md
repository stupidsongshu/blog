# 模块化

## AMD/CMD/UMD/ES Module

### Webpack
#### HTML
- plugin
  - html-webpack-plugin
  - html-minifier

#### CSS
- loader
  - sass-loader
  - less-loader
  - stylus-loader
  - postcss-loader
  - css-loader
  - style-loader
- plugin
  - mini-css-extract-plugin
  - optimize-css-assets-webpack-plugin
  - cssnano

#### js
- loader
  - babel-loader

#### other
- webpack-merge
- copy-webpack-plugin
- glob
- yargs
- scripty
- cross-env

### Gulp
- [gulp官网](https://gulpjs.com)
- babel转译代码
  - [gulp-babel](https://www.npmjs.com/package/gulp-babel)
  - [@babel/plugin-transform-modules-commonjs](https://www.npmjs.com/package/@babel/plugin-transform-modules-commonjs)
- development开发环境
  - [gulp-watch](https://www.npmjs.com/package/gulp-watch)
- production生产环境优化代码
  - [gulp-rollup](https://www.npmjs.com/package/gulp-rollup)
  - [@rollup/plugin-replace](https://www.npmjs.com/package/@rollup/plugin-replace)
