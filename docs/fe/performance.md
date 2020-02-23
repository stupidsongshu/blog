# 性能优化

## w3c
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

## 渲染优化
gpu.js

TTFP
FP
FCP
FMP
TTI

PerformanceObserver
PerformanceTiming

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
