# babel
- [GitHub Repo](https://github.com/babel/babel)
- [Website](https://babel.dev/)

配置文件：.babelrc/babel-config.js/babel-config.json/babel.config.json/babel.config.js

@babel/parser 解析
- [babylon](https://github.com/babel/babylon)
- 将源代码转换成更加抽象的表示方法（例如抽象语法树）
- 依赖 [acorn](https://github.com/acornjs/acorn)/[acorn-jsx](https://github.com/acornjs/acorn-jsx)，用于将源码（如 ES2015 代码）编译成 AST

@babel/traverse 转换
- 使用访问者模式进行深度优先遍历 AST 节点，方便使用方对 AST 节点进行逻辑重组

@babel/generator 生成
- 用于将 AST 转换为最终代码，根据不同的参数 option 实现代码功能（比如 sourceMap 的实现）

## AST
[astexplorer](https://astexplorer.net)

参考资料：
- [babel-handbook](https://github.com/jamiebuilds/babel-handbook)
- [Babel 插件通关秘籍](https://juejin.cn/book/6946117847848321055)
- [如何开发一个 Babel 插件](https://time.geekbang.org/dailylesson/detail/100056821)
- [babel插件入门-AST（抽象语法树）](https://juejin.im/post/5ab9f2f3f265da239b4174f0)
- [剖析 Babel--Babel 总览](http://www.alloyteam.com/2017/04/analysis-of-babel-babel-overview/)

```js
export default [
  {
    path: '/login',
    component: '../login'
  },
  {
    path: '/',
    component: '../layouts/BasicLayout',
    routes: [
      {
        path: '/foo',
        component: '../pages/Foo',
      },
      {
        path: '/bar',
        component: '../pages/Bar',
      },
    ]
  }
]

module.exports = function({ types: t }) {
  return {
    // 转换阶段使用访问者模式进行深度优先遍历
    visitor: {
      ObjectProperty(path) {
        // 1. 过滤键名不为 component 或键值不为字符串的属性
        if (path.node.key.name !== 'component' || !t.isStringLiteral(path.node.value)) {
          return
        }
        // 2. 取出根节点
        const programNodePath = path.findParent(nodePath => nodePath.isProgram())
        // 3. 生成组件名
        const componentVariableName = programNodePath.scope.generateUidIdentifier()
        // 4. 构建 import 节点
        const importNode = t.importDeclaration(
          [t.importDefaultSpecifier(componentVariableName)],
          path.node.value,
        )
        // 5. 插入 import 节点
        programNodePath.node.body.unshift(importNode)
        // 6. 替换属性值
        path.node.value = componentVariableName
      }
    }
  }
}
```

```js
const anotherObj = {
  component: 'wrong import'
}

export default [
  {
    path: '/login',
    component: '../login'
  },
  {
    path: '/',
    component: '../layouts/BasicLayout',
    routes: [
      {
        path: '/foo',
        component: '../pages/Foo',
      },
      {
        path: '/bar',
        component: '../pages/Bar',
      },
      {
        path: '/bar2',
        component: '../pages/Bar',
      },
    ]
  }
]

module.exports = function({ types: t }) {
  const autoImportVisitor = { // 定义嵌套 visitor
    ObjectProperty(path) {
      // 1. 过滤键名不为 component 或键值不为字符串的属性
      if (path.node.key.name !== 'component' || !t.isStringLiteral(path.node.value)) {
        return
      }
      // 2. 取出根节点
      const programNodePath = path.findParent(nodePath => nodePath.isProgram())
      const componentFilePath = path.node.value
      if (this.components[componentFilePath.value]) {
        path.node.value = this.components[componentFilePath.value] // 复用已导入的组件
      } else {
        // 3. 生成组件名
        const componentVariableName = programNodePath.scope.generateUidIdentifier()
        path.node.value = componentVariableName
        this.components[componentFilePath.value] = componentVariableName // 添加新导入的组件
        // 4. 构建 import 节点
        const importNode = t.importDeclaration(
          [t.importDefaultSpecifier(componentVariableName)],
          path.node.value,
        )
        // 5. 插入 import 节点
        programNodePath.node.body.unshift(importNode)
      }
    }
  }
  return {
    visitor: {
      ExportDefaultDeclaration(path) {
        const components = {} // 维护组件导入状态，对象的 key 为组件的文件路径，value 为组件的变量名
        path.traverse(autoImportVisitor, { components }) // 递归遍历子树
      }
    }
  }
}
```
