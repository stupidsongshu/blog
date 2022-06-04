# React

## 高阶组件
高阶组件是一个函数，入参是一个 react 组件，出参是一个新的 react 组件

## Hooks
- 只能在函数式函数中调用
- 只能在函数最顶层中调用
- 不能在条件语句中调用
- 不能在循环中调用
- 不能在嵌套函数中调用

原因：所有 Hooks 函数必须按顺序执行
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
