# React
- [github](https://github.com/facebook/react/)
- [官方文档](https://reactjs.org/)
- [中文文档](https://zh-hans.reactjs.org/)

## cli
- [create-react-app](https://github.com/facebook/create-react-app)
- [rekit](https://github.com/supnate/rekit/)
- [codesandbox](https://codesandbox.io/)
- [dva]()

## Flux
Flux 架构：单向数据流
- [github/facebook](https://github.com/facebook/flux)
### Redux
- [https://redux.js.org/](https://redux.js.org/)
- [https://cn.redux.js.org/](https://cn.redux.js.org/)

![redux](/react/redux.png)

#### immutable
Redux 文档
- [Immutable Update Patterns](https://redux.js.org/usage/structuring-reducers/immutable-update-patterns)
- [Immutable 不可变更新模式](https://cn.redux.js.org/usage/structuring-reducers/immutable-update-patterns)

操作方法：
- 原生写法：`{...}` / `Object.assign()`
- [immer](https://github.com/immerjs/immer)
- [immutability-helper](https://github.com/kolodny/immutability-helper)
- [更多](https://github.com/markerikson/redux-ecosystem-links/blob/master/immutable-data.md#immutable-update-utilities)

## component
- [React 哲学](https://zh-hans.reactjs.org/docs/thinking-in-react.html)
- [组件 & Props](https://zh-hans.reactjs.org/docs/components-and-props.html)

## JSX
[JSX 简介](https://zh-hans.reactjs.org/docs/introducing-jsx.html)
- JSX: 能够在 JavaScript 代码中直接写 HTML 标记，是动态创建组件 React.createElement 的语法糖
- React 约定小写的 tag 是原生 DOM 节点（如 div），大些字母开头的为自定义组件
- JSX 标记可以直接使用属性语法（这种情况不需要遵循大写字母开头的约定），如 <menu.Item />

## lifecycle
[生命周期图谱](https://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/)

![生命周期](/react/lifecycle.png)

## Virtual DOM
- [协调](https://zh-hans.reactjs.org/docs/reconciliation.html)
- [Virtual DOM 及内核](https://zh-hans.reactjs.org/docs/faq-internals.html)
- [supnate/react-dom-diff](https://supnate.github.io/react-dom-diff/index.html)

虚拟 DOM 的两个假设
- 组件的 DOM 结构是相对稳定的
- 类型相同的兄弟节点可以被唯一标识（key 属性）
## Render Props
[Render Props](https://zh-hans.reactjs.org/docs/render-props.html)

### function as a child
函数子组件是工厂方法设计模式的应用

函数子组件相当于向外暴露了 render 逻辑，所以更灵活。

[使用 Props 而非 render](https://zh-hans.reactjs.org/docs/render-props.html#using-props-other-than-render)

## mixin
- [Mixins](https://zh-hans.reactjs.org/docs/react-without-es6.html#mixins)
- [极客时间 每日一课，为什么 React 不推荐使用 Mixin?](https://time.geekbang.org/dailylesson/detail/100028476)

```js
// mixin 实现原理
function mixin(target, mixins = []) {
  if (mixins.length) {
    for (let index = 0; index < mixins.length; index++) {
      const mps = mixins[index].prototype
      for (let pn in mps) {
        if (mps.hasOwnProperty(pn)) {
          // 向 target 的 prototype 挂载属性/方法
          target.prototype[pn] = mps[pn]
        }
      }
    }
  }
}

function Father() {}
Father.prototype.internalMethod = function() {}

function Mixin1() {}
Mixin1.prototype.renderHeader = function() {}
Mixin1.prototype.renderFooter = function() {}

function Mixin2() {}
Mixin2.prototype.setTitle = function() {}

mixin(Father, [Mixin1, Mixin2])

const father = new Father()
for (let method in father) {
  console.log(method) // internalMethod renderHeader renderFooter setTitle
}
```

```jsx
/**
 * 向组件加入定时器的功能：
 * 当组件挂载时启动计时器，在页面中显示组价挂载所持续的时间，
 * 当组件卸载时停止计时器
 */
var SetIntervalMixin = {
  // 生命周期函数在混入后会被 React 自动调用
  componentDidMount: function() {
    this.intervals = []
  }
  // 一般方法在混入后通过 this 访问
  setInterval: function() {
    this.intervals.push(setInterval.apply(null, arguments))
  }
  componentWillUnmount: function() {
    this.intervals.forEach(clearInterval)
  }
}

var createReactClass = require('create-react-class')

var TickTok = createReactClass({
  mixins: [SetIntervalMixin], // Use the mixin
  getInitialState: function() {
    return { seconds: 0 }
  }
  componentDidMount: function() {
    this.setInterval(this.tick, 1000) // Call a method on the mixin
  }
  tick: function() {
    this.setState({ seconds: this.state.seconds + 1 })
  }
  render: function() {
    return (
      <p>
        React has been running for {this.state.seconds} seconds/ 
      </p>
    )
  }
})
```

为什么 React 不推荐使用 Mixin？
1. 被混入的 Mixin 与 React 组件之间的依赖关系是非显式的、混乱的。React 组件可以调用 Mixin 中的方法，反之在 Mixin 中也可以使用 React 组件中定义的状态和方法。两者之间的联系仅仅是 React 组件中声明的 `mixins` 数组。
2. JavaScript 是一种动态语言，这也就意味着在语言层面是无法追踪和管理这些依赖的。

## HOC
- [高阶组件](https://zh-hans.reactjs.org/docs/higher-order-components.html)
- [Render Props](https://zh-hans.reactjs.org/docs/render-props.html)

高阶组件是装饰器设计模式的应用

高阶组件是从函数式编程中的高阶函数演变而来，高阶组件与高阶函数类似，它本身也是一个函数，接收一个组件作为参数，并返回一个新的组件。

```jsx
// const EnhancedComponent = higherOrderComponent(WrappedComponent)

// hoc-clock.js
function higherOrderComponent(WrappedComponent) {
  return class extends React.Component{
    state = { time: new Date() }
    componentDidMount() {
      this.timerID = setInterval(() => this.tick(), 1000)
    }

    componentWillUnmount() {
      clearInterval(this.timerID)
    }

    tick() {
      this.setState({ time: new Date() })
    }

    render() {
      return <WrappedComponent {...this.props} time={this.state.time} />
    }
  }
}

// clock1.js
class Clock1 extends React.Component {
  render() {
    return (
      <div>
        <p>Time1:</p>
        <p>{this.props.time.toLocaleString()}</p>
      </div>
    )
  }
}
const EnhancedClock1 = higherOrderComponent(Clock1)
export default EnhancedClock1

// clock2.js
class Clock2 extends React.Component {
  render() {
    return (
      <div>
        <p>Time2:</p>
        <p>{this.props.time.toLocaleTimeString()}</p>
      </div>
    )
  }
}
const EnhancedClock2 = higherOrderComponent(Clock2)
export default EnhancedClock2
```

```jsx
const List = () => {
  const [data, setData] = useState([])
  return (
    <>
      <div style={{overflow: 'hidden'}}>
        <button className="btn" onClick={
          setTimeout(() => {
            setData([
              {
                text: '北京',
                code: '010'
              },
              {
                text: '上海',
                code: '021'
              },
              {
                text: '广州',
                code: '020'
              },
              {
                text: '深圳',
                code: '0755'
              },
            ])
          }, 3000)
        }>查询</button>
        <ul>
          {data.map(({text, code}, index) => <li className="li" key={code}>{index}、{text}</li>)}
        </ul>
      </div>
    </>
  )
}

// 给组件添加显示 loading 状态功能
const withLoading = WrappedComponent => {
  const ComponentWithLoading = props => {
    const [isLoadingVisible, setLoadingVisible] = useState(false)
    return (
      <>
        {isLoadingVisible ? <div className="loading">Loading...</div> : null}
        /* 将 setLoadingVisble 传递给被 HOC 包装的组件 */
        {<WrappedComponent {...props} setLoadingVisible={setLoadingVisible} />}
      </>
    )
  }
  return ComponentWithLoading
}

const List2 = ({ setLoadingVisible }) => { // 从 props 中获得 setLoadingVisible 方法
  const [data, setData] = useState([])
  return (
    <>
      <div style={{overflow: 'hidden'}}>
        <button className="btn" onClick={
          setLoadingVisible = true // 调用 setLoadingVisible 显示 loading
          setTimeout(() => {
            setLoadingVisible = false // 调用 setLoadingVisible 隐藏 loading
            setData([
              {
                text: '北京',
                code: '010'
              },
              {
                text: '上海',
                code: '021'
              },
              {
                text: '广州',
                code: '020'
              },
              {
                text: '深圳',
                code: '0755'
              },
            ])
          }, 3000)
        }>查询</button>
        <ul>
          {data.map(({text, code}, index) => <li className="li" key={code}>{index}、{text}</li>)}
        </ul>
      </div>
    </>
  )
}

const ListWithLoading = withLoading(List2) // HOC 所创建的新的组件

function App() {
  return (
    <div className="App">
      <List />
      <ListWithLoading />
    </div>
  )
}
```

![mixin_HOC](/react/mixin_HOC.png)

Mixin 与 HOC 的区别：
1. HOC 这种模式是将组件进行更高一层的封装，而不是像 Mixin 那样将通用功能混入到组件中，组件并不会收到任何入侵。
2. 在 HOC 中，组件与功能是解耦的，HOC 可以被应用到任何组件，组件也可以被任何 HOC 包裹，随意拆分和组合，灵活性非常高
3. 从写法上可以发现，Mixin 中更多地体现了面向对象的概念，HOC 是声明式的，体现的是函数式编程的思想，这非常符合现代 JavaScript 的编程理念，也是 React 推荐的编程范式。

HOC 存在的问题：
1. 最著名的就是 JSX 的嵌套地狱。当为一个组件应用多个 HOC 的时候，最后会生成一颗嵌套层次很多的树，并且其中大部分的节点是无意义的，这会给我们的调试和 debug 带来不必要的麻烦
2. 不要轻易更改 HOC 嵌套的顺序。因为 HOC 的本质是组合，组合就一定会涉及到执行的先后顺序，如果破坏了顺序可能就会出问题。
3. HOC 带来了 props 传递的问题。多个 HOC 嵌套的时候，需要将顶层注入的 props 一层一层传递到最内部的组件，在传递的过程中 props 可能会在每一层的 HOC 被加工，而这样的加工是孤立的，当前的 HOC 不知道别的 HOC 对 props 做了什么，其他的 HOC 也不知道当前的 HOC 对 props 做了什么，这就带来了修改冲突。

![why_hooks](/react/why_hooks.png)

## Hooks (16.8+)
Hooks 的出现是为了解决组件间复用逻辑的问题，这点与 Mixin 和 HOC 的目标是一致的，但 Hooks 并不会像 Mixin 那样入侵你的组件，也不会像 HOC 那样打乱组件的结构。它能够以一种很自然的方式将逻辑从组件中提取出来。在大多数情况下，Hooks 都是可以取代 Mixin 和 HOC 的。

注意点：
- 只能在函数式函数中调用
- 只能在函数最顶层中调用
- 不能在条件语句中调用
- 不能在循环中调用
- 不能在嵌套函数中调用

原因：**所有 Hooks 函数必须按顺序执行**
- Hooks 是 React 函数内部的函数
  - 找到正在执行中的 React 函数
- 所有 Hooks 函数必须按顺序执行
  - 找到正在执行中的 Hooks 的顺序

```js
// 自定义 Hook demo(双击)
function useDoubleClick() {
  const [lastClickTime, setClickTime] = useState(0)

  return callback => e => {
    const currentTime = e.timeStamp
    const gap = currentTime - lastClickTime
    if (gap > 0 && gap < 300) {
      callback && callback(e)
    }
    setClickTime(currentTime)
  }
}

function EditableText({ title }) {
  const [editing, setEditing] = useState(false)
  const textOnDoubleClick = useDoubleClick()
  const buttonOnDoubleClick = useDoubleClick()

  return (
    <view>
      {
        editing
          ? <TextInput editing={editing} />
          : <Text
            onClick={textOnDoubleClick(() => setEditing(true))}>
            {title}
          </Text>
      }
      <Button onClick={buttonOnDoubleClick(() => setEditing(true))}></Button>
    </view>
  )
}
```

```js
// Hooks 的实现
const CurrentOwner: {
  current: null | Component<any, any>,
  index: number
} = {
  // 正在执行的 Taro 函数，在组件加载和重新渲染前设置它的值
  current: null,
  // Taro 函数中 hooks 的顺序，每执行一个 Hook 自增
  index: 0
}

// React.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner

function getHook(): Hook {
  if (CurrentOwner.current === null) {
    throw new Error(`invalid hooks call: hooks can only be called in a taro component.`)
  }
  const index = CurrentOwner.index++ // hook 在该 Taro 函数中的 ID
  const hooks: Hook[] = CurrentOwner.current.hooks // 所有的 hooks
  if (index >= hooks.length) {
    hooks.push({} as Hook)
  }
  return hooks[index] // 返回正在执行的 hook 状态
}

function useState<S>(initalState: S | (() => S)): [S, Dispatch<SetStateAction<S>>] {
  if (isFunction(initalState)) { // 如果 initalState 是函数就直接执行
    initalState = initalState()
  }
  const hook = getHook() as HookState<S> // 找到该函数中对应的 hook
  if (isUndefined(hook.state)) { // 如果 hook 还没有状态
    hook.component = Current.current! // 正在执行的 Taro 函数，缓存起来
    hook.state = [ // hook.state 就是我们要返回的元组
      initalState,
      (action) => {
        hook.state[0] = isFunction(action) ? action(hook.state[0]) : action
        enqueueRender(hook.component) // 加入更新队列
      }
    ]
  }
  return hook.state // 已经创建 hook 就直接返回
}
```

## React Router
- [官网](https://reactrouter.com/)
- [path-to-regexp](https://github.com/pillarjs/path-to-regexp)

## Next.js
- [官网](https://nextjs.org/)
