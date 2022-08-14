(window.webpackJsonp=window.webpackJsonp||[]).push([[18],{216:function(t,a,s){"use strict";s.r(a);var n=s(0),e=Object(n.a)({},(function(){var t=this,a=t.$createElement,s=t._self._c||a;return s("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[s("h1",{attrs:{id:"性能优化"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#性能优化","aria-hidden":"true"}},[t._v("#")]),t._v(" 性能优化")]),t._v(" "),s("ul",[s("li",[t._v("抛开场景谈性能都是耍流氓！")]),t._v(" "),s("li",[t._v("业务特性：读写频率、数据模型特点、用户特点 .etc")]),t._v(" "),s("li",[t._v("目标\n"),s("ul",[s("li",[t._v("提升用户体验")]),t._v(" "),s("li",[t._v("提升执行效率")]),t._v(" "),s("li",[t._v("减轻服务器压力")])])]),t._v(" "),s("li",[t._v("限制\n"),s("ul",[s("li",[t._v("安全性")]),t._v(" "),s("li",[t._v("一致性")]),t._v(" "),s("li",[t._v("可维护性")]),t._v(" "),s("li",[t._v("成本")])])])]),t._v(" "),s("h2",{attrs:{id:"https-web-dev"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#https-web-dev","aria-hidden":"true"}},[t._v("#")]),t._v(" "),s("a",{attrs:{href:"https://web.dev",target:"_blank",rel:"noopener noreferrer"}},[t._v("https://web.dev"),s("OutboundLink")],1)]),t._v(" "),s("h2",{attrs:{id:"w3c"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#w3c","aria-hidden":"true"}},[t._v("#")]),t._v(" w3c")]),t._v(" "),s("ul",[s("li",[s("a",{attrs:{href:"https://developer.mozilla.org/zh-CN/docs/Web/Performance",target:"_blank",rel:"noopener noreferrer"}},[t._v("MDN-performance"),s("OutboundLink")],1)]),t._v(" "),s("li",[s("a",{attrs:{href:"https://github.com/w3c/web-performance",target:"_blank",rel:"noopener noreferrer"}},[t._v("web-performance"),s("OutboundLink")],1)]),t._v(" "),s("li",[s("a",{attrs:{href:"https://www.w3.org/TR/navigation-timing",target:"_blank",rel:"noopener noreferrer"}},[t._v("navigation-timing"),s("OutboundLink")],1)])]),t._v(" "),s("div",{staticClass:"language-ts line-numbers-mode"},[s("pre",{pre:!0,attrs:{class:"language-ts"}},[s("code",[s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("interface")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("PerformanceTiming")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("readonly")]),t._v(" attribute unsigned long long navigationStart"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("readonly")]),t._v(" attribute unsigned long long unloadEventStart"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("readonly")]),t._v(" attribute unsigned long long unloadEventEnd"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("readonly")]),t._v(" attribute unsigned long long redirectStart"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("readonly")]),t._v(" attribute unsigned long long redirectEnd"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("readonly")]),t._v(" attribute unsigned long long fetchStart"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("readonly")]),t._v(" attribute unsigned long long domainLookupStart"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("readonly")]),t._v(" attribute unsigned long long domainLookupEnd"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("readonly")]),t._v(" attribute unsigned long long connectStart"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("readonly")]),t._v(" attribute unsigned long long connectEnd"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("readonly")]),t._v(" attribute unsigned long long secureConnectionStart"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("readonly")]),t._v(" attribute unsigned long long requestStart"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("readonly")]),t._v(" attribute unsigned long long responseStart"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("readonly")]),t._v(" attribute unsigned long long responseEnd"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("readonly")]),t._v(" attribute unsigned long long domLoading"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("readonly")]),t._v(" attribute unsigned long long domInteractive"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("readonly")]),t._v(" attribute unsigned long long domContentLoadedEventStart"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("readonly")]),t._v(" attribute unsigned long long domContentLoadedEventEnd"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("readonly")]),t._v(" attribute unsigned long long domComplete"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("readonly")]),t._v(" attribute unsigned long long loadEventStart"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("readonly")]),t._v(" attribute unsigned long long loadEventEnd"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])]),t._v(" "),s("div",{staticClass:"line-numbers-wrapper"},[s("span",{staticClass:"line-number"},[t._v("1")]),s("br"),s("span",{staticClass:"line-number"},[t._v("2")]),s("br"),s("span",{staticClass:"line-number"},[t._v("3")]),s("br"),s("span",{staticClass:"line-number"},[t._v("4")]),s("br"),s("span",{staticClass:"line-number"},[t._v("5")]),s("br"),s("span",{staticClass:"line-number"},[t._v("6")]),s("br"),s("span",{staticClass:"line-number"},[t._v("7")]),s("br"),s("span",{staticClass:"line-number"},[t._v("8")]),s("br"),s("span",{staticClass:"line-number"},[t._v("9")]),s("br"),s("span",{staticClass:"line-number"},[t._v("10")]),s("br"),s("span",{staticClass:"line-number"},[t._v("11")]),s("br"),s("span",{staticClass:"line-number"},[t._v("12")]),s("br"),s("span",{staticClass:"line-number"},[t._v("13")]),s("br"),s("span",{staticClass:"line-number"},[t._v("14")]),s("br"),s("span",{staticClass:"line-number"},[t._v("15")]),s("br"),s("span",{staticClass:"line-number"},[t._v("16")]),s("br"),s("span",{staticClass:"line-number"},[t._v("17")]),s("br"),s("span",{staticClass:"line-number"},[t._v("18")]),s("br"),s("span",{staticClass:"line-number"},[t._v("19")]),s("br"),s("span",{staticClass:"line-number"},[t._v("20")]),s("br"),s("span",{staticClass:"line-number"},[t._v("21")]),s("br"),s("span",{staticClass:"line-number"},[t._v("22")]),s("br"),s("span",{staticClass:"line-number"},[t._v("23")]),s("br")])]),s("p",[s("img",{attrs:{src:"/timestamp-diagram.svg",alt:"Processing Model"}})]),t._v(" "),s("h2",{attrs:{id:"缓存"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#缓存","aria-hidden":"true"}},[t._v("#")]),t._v(" 缓存")]),t._v(" "),s("h4",{attrs:{id:"强缓存、协商缓存"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#强缓存、协商缓存","aria-hidden":"true"}},[t._v("#")]),t._v(" 强缓存、协商缓存")]),t._v(" "),s("p",[t._v("优先级：cache-control > expires > etag > last-modified")]),t._v(" "),s("table",[s("thead",[s("tr",[s("th",[t._v("name")]),t._v(" "),s("th",[t._v("类型")]),t._v(" "),s("th",[t._v("状态码")])])]),t._v(" "),s("tbody",[s("tr",[s("td",[t._v("cache-control")]),t._v(" "),s("td",[t._v("强缓存")]),t._v(" "),s("td",[t._v("200 from memory / from disk")])]),t._v(" "),s("tr",[s("td",[t._v("expires")]),t._v(" "),s("td",[t._v("强缓存")]),t._v(" "),s("td",[t._v("200 from memory / from disk")])]),t._v(" "),s("tr",[s("td",[t._v("etag/if-none-match")]),t._v(" "),s("td",[t._v("协商缓存")]),t._v(" "),s("td",[t._v("304")])]),t._v(" "),s("tr",[s("td",[t._v("last-modified/if-modified-since")]),t._v(" "),s("td",[t._v("协商缓存")]),t._v(" "),s("td",[t._v("304")])])])]),t._v(" "),s("h4",{attrs:{id:"本地缓存"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#本地缓存","aria-hidden":"true"}},[t._v("#")]),t._v(" 本地缓存")]),t._v(" "),s("ul",[s("li",[t._v("cookie")]),t._v(" "),s("li",[t._v("sessionStorage")]),t._v(" "),s("li",[t._v("localStorage")]),t._v(" "),s("li",[t._v("IndexedDB")]),t._v(" "),s("li",[t._v("WebSQL")])]),t._v(" "),s("h4",{attrs:{id:"worker"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#worker","aria-hidden":"true"}},[t._v("#")]),t._v(" worker")]),t._v(" "),s("ul",[s("li",[t._v("webWorker")]),t._v(" "),s("li",[t._v("serviceWorker")]),t._v(" "),s("li",[t._v("workbox(workbox-webpack-plugin)")])]),t._v(" "),s("div",{staticClass:"tip custom-block"},[s("p",[t._v("前端代码缓存")]),t._v(" "),s("ul",[s("li",[t._v("webpack提取公共代码进行强缓存，业务代码协商缓存或本地缓存("),s("a",{attrs:{href:"https://github.com/addyosmani/basket.js",target:"_blank",rel:"noopener noreferrer"}},[t._v("basket.js"),s("OutboundLink")],1),t._v("/"),s("a",{attrs:{href:"https://github.com/localForage/localForage",target:"_blank",rel:"noopener noreferrer"}},[t._v("localFrage"),s("OutboundLink")],1),t._v(")")])])]),t._v(" "),s("p",[t._v("serviceWorker缓存")]),t._v(" "),s("ul",[s("li",[s("ol",[s("li",[t._v("注册serviceWorker")])])]),t._v(" "),s("li",[s("ol",{attrs:{start:"2"}},[s("li",[t._v("开启一个webWorker进程")])])]),t._v(" "),s("li",[s("ol",{attrs:{start:"3"}},[s("li",[t._v("激活serviceWorker")])])]),t._v(" "),s("li",[s("ol",{attrs:{start:"4"}},[s("li",[t._v("监听页面所有请求")])])]),t._v(" "),s("li",[s("ol",{attrs:{start:"5"}},[s("li",[t._v("当页面发起请求时触发监听器，有缓存则从缓存取，没有则网络请求，请求完成后缓存到Cache Storage")])])]),t._v(" "),s("li",[s("ol",{attrs:{start:"6"}},[s("li",[t._v("缓存策略同workbox给资源加上md5，可通过webpack打包生成md5 hash，通过hash判断资源是否需要更新")])])])]),t._v(" "),s("div",{staticClass:"warning custom-block"},[s("p",[t._v("serviceWorker拦截请求需在本地开发及https域名条件下")])]),t._v(" "),s("h2",{attrs:{id:"渲染指标"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#渲染指标","aria-hidden":"true"}},[t._v("#")]),t._v(" 渲染指标")]),t._v(" "),s("p",[t._v("gpu.js")]),t._v(" "),s("p",[s("a",{attrs:{href:"https://web.dev/metrics",target:"_blank",rel:"noopener noreferrer"}},[t._v("https://web.dev/metrics"),s("OutboundLink")],1)]),t._v(" "),s("table",[s("thead",[s("tr",[s("th",[t._v("name")]),t._v(" "),s("th",[t._v("description")])])]),t._v(" "),s("tbody",[s("tr",[s("td",[t._v("TTFP")]),t._v(" "),s("td")]),t._v(" "),s("tr",[s("td",[t._v("FP")]),t._v(" "),s("td",[t._v("First Paint 首次绘制")])]),t._v(" "),s("tr",[s("td",[t._v("FCP")]),t._v(" "),s("td",[t._v("First Contentful Paint 首次内容绘制")])]),t._v(" "),s("tr",[s("td",[t._v("FMP")]),t._v(" "),s("td",[t._v("First Meaningful Paint 首次有效绘制")])]),t._v(" "),s("tr",[s("td",[t._v("LCP")]),t._v(" "),s("td",[t._v("Largest Contentful Paint 最大内容绘制（替代FMP）")])]),t._v(" "),s("tr",[s("td",[t._v("TTI")]),t._v(" "),s("td",[t._v("Time to Interactive 可交互时间")])])])]),t._v(" "),s("p",[t._v("PerformanceObserver 为我们提供的新功能是，能够在性能事件发生时订阅这些事件，并以异步方式响应事件。 此 API 取代旧的 "),s("a",{attrs:{href:"https://www.w3.org/TR/navigation-timing/#sec-navigation-timing-interface",target:"_blank",rel:"noopener noreferrer"}},[t._v("PerformanceTiming"),s("OutboundLink")],1),t._v(" 界面，后者通常需要执行轮询才能查看数据可用的时间。")]),t._v(" "),s("div",{staticClass:"language-js line-numbers-mode"},[s("pre",{pre:!0,attrs:{class:"language-js"}},[s("code",[s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 使用 PerformanceObserver 获取 FP")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" observerWithPromise "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("new")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("Promise")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token parameter"}},[t._v("resolve"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" reject")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=>")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// return new PerformanceObserver((...rest) => {")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//   console.log('rest', rest)")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//   resolve(rest[0])")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// }).observe({")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//   entryTypes: ['paint'] // 注册 paint 性能事件")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// })")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("return")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("new")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("PerformanceObserver")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("resolve"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("observe")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    entryTypes"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'paint'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 注册 paint 性能事件")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("then")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token parameter"}},[t._v("entryList")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=>")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 获得实体列表")]),t._v("\n  console"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("log")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'entries:'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" entryList"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("getEntries")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("return")]),t._v(" entryList"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("getEntries")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("find")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token parameter"}},[t._v("entry")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=>")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("return")]),t._v(" entry"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("name "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("===")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'first-paint'")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("then")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token parameter"}},[t._v("entry")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=>")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  console"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("log")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'startTime:'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" entry"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("startTime"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 使用 PerformanceObserver 获取 FCP")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("new")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("Promise")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token parameter"}},[t._v("resolve")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=>")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("new")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("PerformanceObserver")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("resolve"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("observe")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" entryTypes"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'paint'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("then")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token parameter"}},[t._v("list")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=>")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("list"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("getEntries")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("find")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token parameter"}},[t._v("entry")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=>")]),t._v(" entry"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("name "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("===")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'first-contentful-paint'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("then")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token parameter"}},[t._v("entry")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=>")]),t._v(" console"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("log")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("entry"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("startTime"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n")])]),t._v(" "),s("div",{staticClass:"line-numbers-wrapper"},[s("span",{staticClass:"line-number"},[t._v("1")]),s("br"),s("span",{staticClass:"line-number"},[t._v("2")]),s("br"),s("span",{staticClass:"line-number"},[t._v("3")]),s("br"),s("span",{staticClass:"line-number"},[t._v("4")]),s("br"),s("span",{staticClass:"line-number"},[t._v("5")]),s("br"),s("span",{staticClass:"line-number"},[t._v("6")]),s("br"),s("span",{staticClass:"line-number"},[t._v("7")]),s("br"),s("span",{staticClass:"line-number"},[t._v("8")]),s("br"),s("span",{staticClass:"line-number"},[t._v("9")]),s("br"),s("span",{staticClass:"line-number"},[t._v("10")]),s("br"),s("span",{staticClass:"line-number"},[t._v("11")]),s("br"),s("span",{staticClass:"line-number"},[t._v("12")]),s("br"),s("span",{staticClass:"line-number"},[t._v("13")]),s("br"),s("span",{staticClass:"line-number"},[t._v("14")]),s("br"),s("span",{staticClass:"line-number"},[t._v("15")]),s("br"),s("span",{staticClass:"line-number"},[t._v("16")]),s("br"),s("span",{staticClass:"line-number"},[t._v("17")]),s("br"),s("span",{staticClass:"line-number"},[t._v("18")]),s("br"),s("span",{staticClass:"line-number"},[t._v("19")]),s("br"),s("span",{staticClass:"line-number"},[t._v("20")]),s("br"),s("span",{staticClass:"line-number"},[t._v("21")]),s("br"),s("span",{staticClass:"line-number"},[t._v("22")]),s("br"),s("span",{staticClass:"line-number"},[t._v("23")]),s("br"),s("span",{staticClass:"line-number"},[t._v("24")]),s("br"),s("span",{staticClass:"line-number"},[t._v("25")]),s("br"),s("span",{staticClass:"line-number"},[t._v("26")]),s("br")])]),s("p",[s("a",{attrs:{href:"https://developers.google.com/web/tools/lighthouse",target:"_blank",rel:"noopener noreferrer"}},[t._v("Lighthouse"),s("OutboundLink")],1)]),t._v(" "),s("div",{staticClass:"language-sh line-numbers-mode"},[s("pre",{pre:!0,attrs:{class:"language-sh"}},[s("code",[s("span",{pre:!0,attrs:{class:"token function"}},[t._v("npm")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("install")]),t._v(" -g lighthouse\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# yarn global add lighthouse")]),t._v("\n\nlighthouse --help\n\nlighthouse https://www.baidu.com --output-path"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v("./lighthouse-results.json --output"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v("json\n")])]),t._v(" "),s("div",{staticClass:"line-numbers-wrapper"},[s("span",{staticClass:"line-number"},[t._v("1")]),s("br"),s("span",{staticClass:"line-number"},[t._v("2")]),s("br"),s("span",{staticClass:"line-number"},[t._v("3")]),s("br"),s("span",{staticClass:"line-number"},[t._v("4")]),s("br"),s("span",{staticClass:"line-number"},[t._v("5")]),s("br"),s("span",{staticClass:"line-number"},[t._v("6")]),s("br")])]),s("p",[s("a",{attrs:{href:"https://www.webpagetest.org/",target:"_blank",rel:"noopener noreferrer"}},[t._v("Web Page Test"),s("OutboundLink")],1)]),t._v(" "),s("ul",[s("li",[t._v("参考资料\n"),s("ul",[s("li",[s("a",{attrs:{href:"https://github.com/w3c/paint-timing",target:"_blank",rel:"noopener noreferrer"}},[t._v("w3c/paint-timing"),s("OutboundLink")],1)]),t._v(" "),s("li",[s("a",{attrs:{href:"https://developers.google.com/web/fundamentals/performance/user-centric-performance-metrics?hl=zh-cn",target:"_blank",rel:"noopener noreferrer"}},[t._v("performance - developers.google.com"),s("OutboundLink")],1)]),t._v(" "),s("li",[s("a",{attrs:{href:"https://llp0574.github.io/2017/10/19/performance-metrics-whats-this-all-about/",target:"_blank",rel:"noopener noreferrer"}},[t._v("性能指标都是些什么鬼?"),s("OutboundLink")],1)]),t._v(" "),s("li",[s("a",{attrs:{href:"https://segmentfault.com/a/1190000017040216",target:"_blank",rel:"noopener noreferrer"}},[t._v("前端黑科技：美团网页首帧优化实践"),s("OutboundLink")],1)]),t._v(" "),s("li",[s("a",{attrs:{href:"https://github.com/LuckyWinty/fe-weekly-questions/issues/56",target:"_blank",rel:"noopener noreferrer"}},[t._v("FCP/FMP/FP 分别是怎样定义，如何统计"),s("OutboundLink")],1)])])])]),t._v(" "),s("h2",{attrs:{id:"刷新ssr，切页spa"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#刷新ssr，切页spa","aria-hidden":"true"}},[t._v("#")]),t._v(" 刷新SSR，切页SPA")]),t._v(" "),s("h3",{attrs:{id:"pjax"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#pjax","aria-hidden":"true"}},[t._v("#")]),t._v(" pjax")]),t._v(" "),s("ul",[s("li",[s("a",{attrs:{href:"https://github.com/defunkt/jquery-pjax",target:"_blank",rel:"noopener noreferrer"}},[t._v("pushState + ajax = pjax"),s("OutboundLink")],1)]),t._v(" "),s("li",[t._v("pjax 基于 jquery，代理指定元素点击行为并阻止其默认事件，在元素点击后通过 ajax 发送请求并携带自定义请求头(如：X-PJAX: true 等)将响应的 html 片段在其接管的区域内通过 pushState 替换，从而在 SSR 页面中实现 SPA 减少请求局部刷新的效果")])]),t._v(" "),s("h2",{attrs:{id:"bigpipe"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#bigpipe","aria-hidden":"true"}},[t._v("#")]),t._v(" bigpipe")]),t._v(" "),s("ul",[s("li",[s("a",{attrs:{href:"http://www.ruanyifeng.com/blog/2016/08/http.html",target:"_blank",rel:"noopener noreferrer"}},[t._v("阮一峰参考链接"),s("OutboundLink")],1)]),t._v(" "),s("li",[t._v("分块传输：Transfer-Encoding: chunked")]),t._v(" "),s("li",[t._v("stream 流")])]),t._v(" "),s("h2",{attrs:{id:"quicklink"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#quicklink","aria-hidden":"true"}},[t._v("#")]),t._v(" quicklink")]),t._v(" "),s("ul",[s("li",[s("a",{attrs:{href:"https://github.com/GoogleChromeLabs/quicklink",target:"_blank",rel:"noopener noreferrer"}},[t._v("Faster subsequent page-loads by prefetching in-viewport links during idle time"),s("OutboundLink")],1)])]),t._v(" "),s("h2",{attrs:{id:"google-amp"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#google-amp","aria-hidden":"true"}},[t._v("#")]),t._v(" Google AMP")]),t._v(" "),s("ul",[s("li",[t._v("AMP: Accelerated Mobile Pages")]),t._v(" "),s("li",[t._v("场景：Mobile、资讯页面（非SPA）")]),t._v(" "),s("li",[t._v("场景特点：\n"),s("ul",[s("li",[t._v("机器性能")]),t._v(" "),s("li",[t._v("浏览器性能")]),t._v(" "),s("li",[t._v("网速受限")]),t._v(" "),s("li",[t._v("非刚性需求")])])]),t._v(" "),s("li",[t._v("权衡\n"),s("ul",[s("li",[t._v("减少请求")]),t._v(" "),s("li",[t._v("减少体积")]),t._v(" "),s("li",[t._v("牺牲一部分UE")]),t._v(" "),s("li",[t._v("牺牲一部分开发效率")])])])]),t._v(" "),s("h2",{attrs:{id:"css-triggers"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#css-triggers","aria-hidden":"true"}},[t._v("#")]),t._v(" css-triggers")]),t._v(" "),s("ul",[s("li",[s("a",{attrs:{href:"https://github.com/GoogleChromeLabs/css-triggers",target:"_blank",rel:"noopener noreferrer"}},[t._v("Github"),s("OutboundLink")],1)]),t._v(" "),s("li",[s("a",{attrs:{href:"https://csstriggers.com/",target:"_blank",rel:"noopener noreferrer"}},[t._v("csstriggers"),s("OutboundLink")],1)])]),t._v(" "),s("h2",{attrs:{id:"重排"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#重排","aria-hidden":"true"}},[t._v("#")]),t._v(" 重排")]),t._v(" "),s("h3",{attrs:{id:"导致原因"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#导致原因","aria-hidden":"true"}},[t._v("#")]),t._v(" 导致原因")]),t._v(" "),s("ul",[s("li",[t._v("读取某些CSS属性\n"),s("ul",[s("li",[t._v("clientWidth/clientHeight/clientLeft/clientTop")]),t._v(" "),s("li",[t._v("offsetWidth/offsetHeight/offsetLeft/offsetTop")]),t._v(" "),s("li",[t._v("scrollWidth/scrollHeight/scrollLeft/scrollTop")]),t._v(" "),s("li",[t._v("getBoundingClientRect()/getClientRects()")]),t._v(" "),s("li",[t._v("innerText/outerText")]),t._v(" "),s("li",[t._v("scrollIntoView()/scrollIntoViewIfNeeded()")]),t._v(" "),s("li",[t._v("scrollByLines()/scrollByPages()")]),t._v(" "),s("li",[t._v("focus()")])])])]),t._v(" "),s("h3",{attrs:{id:"解决方案"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#解决方案","aria-hidden":"true"}},[t._v("#")]),t._v(" 解决方案")]),t._v(" "),s("ul",[s("li",[t._v("使用transform代替top/left动画")]),t._v(" "),s("li",[t._v("DOM读写分离，尽量不要把读操作和写操作放在一个语句里面\n"),s("ul",[s("li",[t._v("面对解耦代码，使用requestAnimationFrame达到读写分离")]),t._v(" "),s("li",[t._v("使用 "),s("a",{attrs:{href:"https://github.com/wilsonpage/fastdom",target:"_blank",rel:"noopener noreferrer"}},[t._v("fastdom"),s("OutboundLink")],1),t._v(" 进行优化，在每一帧，先将读操作批量运行，再批量运行写操作")])])]),t._v(" "),s("li",[t._v("样式表越简单，重排和重绘越快")]),t._v(" "),s("li",[t._v("重排和重绘的DOM元素层级越高，成本就越高")]),t._v(" "),s("li",[t._v("table元素的重排和重绘成本高于div")]),t._v(" "),s("li",[t._v("统一改变样式")]),t._v(" "),s("li",[t._v("缓存重排结果")]),t._v(" "),s("li",[t._v("离线DOM Fragment/clone")]),t._v(" "),s("li",[t._v("虚拟DOM")]),t._v(" "),s("li",[t._v("必要的时候display: none不可见元素不影响重排重绘，visibility会影响重排")])]),t._v(" "),s("h2",{attrs:{id:"重绘"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#重绘","aria-hidden":"true"}},[t._v("#")]),t._v(" 重绘")]),t._v(" "),s("h3",{attrs:{id:"解决方案-2"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#解决方案-2","aria-hidden":"true"}},[t._v("#")]),t._v(" 解决方案")]),t._v(" "),s("ul",[s("li",[t._v("减少不必要的paint\n"),s("ul",[s("li",[t._v("gif图即使被其他layer盖住不可见，也可能导致paint，不需要时应将gif图的display属性设为none")]),t._v(" "),s("li",[t._v("减少绘制区域，为引起大范围paint的元素生成独立的layer以减少paint的范围")])])])]),t._v(" "),s("h2",{attrs:{id:"bfc"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#bfc","aria-hidden":"true"}},[t._v("#")]),t._v(" "),s("a",{attrs:{href:"https://developer.mozilla.org/zh-CN/docs/Web/Guide/CSS/Block_formatting_context",target:"_blank",rel:"noopener noreferrer"}},[t._v("BFC"),s("OutboundLink")],1)]),t._v(" "),s("p",[t._v("BFC是页面上一个隔离的独立容器，容器里面的子元素不会影响到外面的元素，反之也是。")]),t._v(" "),s("ul",[s("li",[t._v("BFC(Block Formatting Context)块格式化上下文")]),t._v(" "),s("li",[t._v("IFC(Inline Formatting Context)内联格式化上下文。IFC的line box(线框)高度由其包含的行内元素中的最高的实际高度计算而来(不受到垂直方向的padding/margin影响)。")]),t._v(" "),s("li",[t._v("FFC(Flex Formatting Context)自适应格式化上下文。display为flex/inline-flex的元素将会生成自适应容器。")]),t._v(" "),s("li",[t._v("GFC(GridLayout Formatting Context)网格格式化上下文。当为一个元素设置display为grid的时候，此元素将会获得一个独立的渲染区域，我们可以通过在网格容器(grid container)上定义网格定义行(grid definition rows)和网格定义列(grid definition columns)属性各在网格项目(grid item)上定义网格行(grid rows)和网格列(grid columns)为每一个网格项目(grid item)定义位置和空间。")])]),t._v(" "),s("h3",{attrs:{id:"生成bfc元素"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#生成bfc元素","aria-hidden":"true"}},[t._v("#")]),t._v(" 生成BFC元素")]),t._v(" "),s("ul",[s("li",[t._v("html根元素")]),t._v(" "),s("li",[t._v("display为inline-block/table-cell/table-caption")]),t._v(" "),s("li",[t._v("float为left/right，不为none")]),t._v(" "),s("li",[t._v("position为absolute/fixed")]),t._v(" "),s("li",[t._v("overflow为auto/scroll/hidden")])]),t._v(" "),s("h3",{attrs:{id:"计算bfc的高度时，浮动元素也参与计算"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#计算bfc的高度时，浮动元素也参与计算","aria-hidden":"true"}},[t._v("#")]),t._v(" 计算BFC的高度时，浮动元素也参与计算")]),t._v(" "),s("h3",{attrs:{id:"margin-collapsing"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#margin-collapsing","aria-hidden":"true"}},[t._v("#")]),t._v(" Margin collapsing")]),t._v(" "),s("ul",[s("li",[t._v("盒子垂直方向的距离由margin决定，属于同一个BFC的两个相邻盒子的margin会发生重叠合并")])]),t._v(" "),s("p",[t._v("css阻塞js执行，js阻塞DOM解析\n有js时css会阻塞页面；无js时css不会阻塞页面")]),t._v(" "),s("h3",{attrs:{id:"bem"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#bem","aria-hidden":"true"}},[t._v("#")]),t._v(" BEM")]),t._v(" "),s("p",[s("a",{attrs:{href:"http://getbem.com/",target:"_blank",rel:"noopener noreferrer"}},[t._v("getbem.com"),s("OutboundLink")],1)]),t._v(" "),s("h3",{attrs:{id:"参考"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#参考","aria-hidden":"true"}},[t._v("#")]),t._v(" 参考")]),t._v(" "),s("ul",[s("li",[s("a",{attrs:{href:"https://juejin.cn/post/7017009327705686029",target:"_blank",rel:"noopener noreferrer"}},[t._v("再战前端性能优化 超详细汇总"),s("OutboundLink")],1)])])])}),[],!1,null,null,null);a.default=e.exports}}]);