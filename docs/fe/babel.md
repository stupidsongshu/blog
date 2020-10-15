# babel
babel-preset babel-plugin babel-parser babel-traverse babel-generator babel-polyfill

babel-loader

配置文件：.babelrc/babel-config.js/babel-config.json

@babel/parser 解析
- 将源代码转换成更加抽象的表示方法（例如抽象语法树）
- 依赖 acorn/acorn-jsx，用于将源码（如 ES2015 代码）编译成 AST

@babel/traverse 转换
- 遍历 AST 节点，方便使用方对 AST 节点进行逻辑重组

@babel/generator 生成
- 用于将 AST 转换为最终代码，根据不同的参数 option 实现代码功能（比如 sourceMap 的实现）

## AST
[astexplorer](https://astexplorer.net)

参考资料：
- [babel插件入门-AST（抽象语法树）](https://juejin.im/post/5ab9f2f3f265da239b4174f0)
- [剖析 Babel--Babel 总览](http://www.alloyteam.com/2017/04/analysis-of-babel-babel-overview/)