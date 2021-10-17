# 性能优化

- 抛开场景谈性能都是耍流氓！
- 业务特性：读写频率、数据模型特点、用户特点 .etc
- 目标
  - 提升用户体验
  - 提升执行效率
  - 减轻服务器压力
- 限制
  - 安全性
  - 一致性
  - 可维护性
  - 成本

## [https://web.dev](https://web.dev)

## w3c
- [MDN-performance](https://developer.mozilla.org/zh-CN/docs/Web/Performance)
- [web-performance](https://github.com/w3c/web-performance)
- [navigation-timing](https://www.w3.org/TR/navigation-timing)

```ts
interface PerformanceTiming {
  readonly attribute unsigned long long navigationStart;
  readonly attribute unsigned long long unloadEventStart;
  readonly attribute unsigned long long unloadEventEnd;
  readonly attribute unsigned long long redirectStart;
  readonly attribute unsigned long long redirectEnd;
  readonly attribute unsigned long long fetchStart;
  readonly attribute unsigned long long domainLookupStart;
  readonly attribute unsigned long long domainLookupEnd;
  readonly attribute unsigned long long connectStart;
  readonly attribute unsigned long long connectEnd;
  readonly attribute unsigned long long secureConnectionStart;
  readonly attribute unsigned long long requestStart;
  readonly attribute unsigned long long responseStart;
  readonly attribute unsigned long long responseEnd;
  readonly attribute unsigned long long domLoading;
  readonly attribute unsigned long long domInteractive;
  readonly attribute unsigned long long domContentLoadedEventStart;
  readonly attribute unsigned long long domContentLoadedEventEnd;
  readonly attribute unsigned long long domComplete;
  readonly attribute unsigned long long loadEventStart;
  readonly attribute unsigned long long loadEventEnd;
};
```

![Processing Model](/timestamp-diagram.svg)

## 缓存
#### 强缓存、协商缓存
优先级：cache-control > expires > etag > last-modified

name|类型|状态码
-|-|-
cache-control|强缓存|200 from memory / from disk
expires|强缓存|200 from memory / from disk
etag/if-none-match|协商缓存|304
last-modified/if-modified-since|协商缓存|304

#### 本地缓存
- cookie
- sessionStorage
- localStorage
- IndexedDB
- WebSQL
#### worker
- webWorker
- serviceWorker
- workbox(workbox-webpack-plugin)

:::tip
前端代码缓存
- webpack提取公共代码进行强缓存，业务代码协商缓存或本地缓存([basket.js](https://github.com/addyosmani/basket.js)/[localFrage](https://github.com/localForage/localForage))
:::

serviceWorker缓存
- 1. 注册serviceWorker
- 2. 开启一个webWorker进程
- 3. 激活serviceWorker
- 4. 监听页面所有请求
- 5. 当页面发起请求时触发监听器，有缓存则从缓存取，没有则网络请求，请求完成后缓存到Cache Storage
- 6. 缓存策略同workbox给资源加上md5，可通过webpack打包生成md5 hash，通过hash判断资源是否需要更新

:::warning
serviceWorker拦截请求需在本地开发及https域名条件下
:::

## 渲染指标
gpu.js

[https://web.dev/metrics](https://web.dev/metrics)

| name | description |
| - | - |
| TTFP | |
| FP   | First Paint 首次绘制 |
| FCP  | First Contentful Paint 首次内容绘制 |
| FMP  | First Meaningful Paint 首次有效绘制 |
| LCP  | Largest Contentful Paint 最大内容绘制（替代FMP） |
| TTI  | Time to Interactive 可交互时间 |

PerformanceObserver 为我们提供的新功能是，能够在性能事件发生时订阅这些事件，并以异步方式响应事件。 此 API 取代旧的 [PerformanceTiming](https://www.w3.org/TR/navigation-timing/#sec-navigation-timing-interface) 界面，后者通常需要执行轮询才能查看数据可用的时间。

```js
// 使用 PerformanceObserver 获取 FP
const observerWithPromise = new Promise((resolve, reject) => {
  // return new PerformanceObserver((...rest) => {
  //   console.log('rest', rest)
  //   resolve(rest[0])
  // }).observe({
  //   entryTypes: ['paint'] // 注册 paint 性能事件
  // })
  return new PerformanceObserver(resolve).observe({
    entryTypes: ['paint'] // 注册 paint 性能事件
  })
}).then(entryList => { // 获得实体列表
  console.log('entries:', entryList.getEntries())
  return entryList.getEntries().find((entry) => {
    return entry.name === 'first-paint'
  })
}).then((entry) => {
  console.log('startTime:', entry.startTime)
})

// 使用 PerformanceObserver 获取 FCP
new Promise((resolve) => (
  new PerformanceObserver(resolve).observe({ entryTypes: ['paint'] })
))
.then((list) => (list.getEntries().find(entry => entry.name === 'first-contentful-paint')))
.then((entry) => console.log(entry.startTime))
```

[Lighthouse](https://developers.google.com/web/tools/lighthouse)
```sh
npm install -g lighthouse
# yarn global add lighthouse

lighthouse --help

lighthouse https://www.baidu.com --output-path=./lighthouse-results.json --output=json
```

[Web Page Test](https://www.webpagetest.org/)

- 参考资料
  - [w3c/paint-timing](https://github.com/w3c/paint-timing)
  - [performance - developers.google.com](https://developers.google.com/web/fundamentals/performance/user-centric-performance-metrics?hl=zh-cn)
  - [性能指标都是些什么鬼?](https://llp0574.github.io/2017/10/19/performance-metrics-whats-this-all-about/)
  - [前端黑科技：美团网页首帧优化实践](https://segmentfault.com/a/1190000017040216)
  - [FCP/FMP/FP 分别是怎样定义，如何统计](https://github.com/LuckyWinty/fe-weekly-questions/issues/56)

## 刷新SSR，切页SPA
### pjax
- [pushState + ajax = pjax](https://github.com/defunkt/jquery-pjax)
- pjax 基于 jquery，代理指定元素点击行为并阻止其默认事件，在元素点击后通过 ajax 发送请求并携带自定义请求头(如：X-PJAX: true 等)将响应的 html 片段在其接管的区域内通过 pushState 替换，从而在 SSR 页面中实现 SPA 减少请求局部刷新的效果

## bigpipe
- [阮一峰参考链接](http://www.ruanyifeng.com/blog/2016/08/http.html)
- 分块传输：Transfer-Encoding: chunked
- stream 流

## quicklink
- [Faster subsequent page-loads by prefetching in-viewport links during idle time](https://github.com/GoogleChromeLabs/quicklink)

## Google AMP
- AMP: Accelerated Mobile Pages
- 场景：Mobile、资讯页面（非SPA）
- 场景特点：
  - 机器性能
  - 浏览器性能
  - 网速受限
  - 非刚性需求
- 权衡
  - 减少请求
  - 减少体积
  - 牺牲一部分UE
  - 牺牲一部分开发效率

## css-triggers
- [Github](https://github.com/GoogleChromeLabs/css-triggers)
- [csstriggers](https://csstriggers.com/)

## 重排
### 导致原因
- 读取某些CSS属性
  - clientWidth/clientHeight/clientLeft/clientTop
  - offsetWidth/offsetHeight/offsetLeft/offsetTop
  - scrollWidth/scrollHeight/scrollLeft/scrollTop
  - getBoundingClientRect()/getClientRects()
  - innerText/outerText
  - scrollIntoView()/scrollIntoViewIfNeeded()
  - scrollByLines()/scrollByPages()
  - focus()
### 解决方案
- 使用transform代替top/left动画
- DOM读写分离，尽量不要把读操作和写操作放在一个语句里面
  - 面对解耦代码，使用requestAnimationFrame达到读写分离
  - 使用 [fastdom](https://github.com/wilsonpage/fastdom) 进行优化，在每一帧，先将读操作批量运行，再批量运行写操作
- 样式表越简单，重排和重绘越快
- 重排和重绘的DOM元素层级越高，成本就越高
- table元素的重排和重绘成本高于div
- 统一改变样式
- 缓存重排结果
- 离线DOM Fragment/clone
- 虚拟DOM
- 必要的时候display: none不可见元素不影响重排重绘，visibility会影响重排

## 重绘
### 解决方案
- 减少不必要的paint
  - gif图即使被其他layer盖住不可见，也可能导致paint，不需要时应将gif图的display属性设为none
  - 减少绘制区域，为引起大范围paint的元素生成独立的layer以减少paint的范围

## [BFC](https://developer.mozilla.org/zh-CN/docs/Web/Guide/CSS/Block_formatting_context)
BFC是页面上一个隔离的独立容器，容器里面的子元素不会影响到外面的元素，反之也是。
- BFC(Block Formatting Context)块格式化上下文
- IFC(Inline Formatting Context)内联格式化上下文。IFC的line box(线框)高度由其包含的行内元素中的最高的实际高度计算而来(不受到垂直方向的padding/margin影响)。
- FFC(Flex Formatting Context)自适应格式化上下文。display为flex/inline-flex的元素将会生成自适应容器。
- GFC(GridLayout Formatting Context)网格格式化上下文。当为一个元素设置display为grid的时候，此元素将会获得一个独立的渲染区域，我们可以通过在网格容器(grid container)上定义网格定义行(grid definition rows)和网格定义列(grid definition columns)属性各在网格项目(grid item)上定义网格行(grid rows)和网格列(grid columns)为每一个网格项目(grid item)定义位置和空间。
### 生成BFC元素
- html根元素
- display为inline-block/table-cell/table-caption
- float为left/right，不为none
- position为absolute/fixed
- overflow为auto/scroll/hidden

### 计算BFC的高度时，浮动元素也参与计算
### Margin collapsing
- 盒子垂直方向的距离由margin决定，属于同一个BFC的两个相邻盒子的margin会发生重叠合并


css阻塞js执行，js阻塞DOM解析
有js时css会阻塞页面；无js时css不会阻塞页面

### BEM
[getbem.com](http://getbem.com/)

### 参考
- [再战前端性能优化 超详细汇总](https://juejin.cn/post/7017009327705686029)