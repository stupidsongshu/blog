# 组件化

## Web Components
- [webcomponents](https://www.webcomponents.org/)
- [MDN](https://developer.mozilla.org/zh-CN/docs/Web/Web_Components)

### lib
- [Vue2](https://github.com/vuejs/vue)
- [Vue3](https://github.com/vuejs/vue-next)
- [React](https://github.com/facebook/react)
- [Angular](https://github.com/angular/angular)
- [x-tag](https://github.com/x-tag/core)
- [Polymer](https://github.com/Polymer/polymer)

### webpack
[自动引入](https://webpack.js.org/guides/dependency-management/#requirecontext)

```js
function importAll(requireContext) {
  requireContext.keys().forEach(path => {
    let component = requireContext(path)
    component = component.default || component
    Vue.component(component.name, component)
  })
}

const requireContextFilter = require.context('./filter', false, /\.vue$/)
const requireContextComponents = require.context('./components', false, /\.vue$/)
importAll(requireContextFilter)
importAll(requireContextComponents)
```
