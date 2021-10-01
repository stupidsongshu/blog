## 工具函数

- [quickappcn/quickapp-dsl-vue](https://github.com/quickappcn/quickapp-dsl-vue/blob/4cfc8f065d/src/shared/util.js)

### Pub/Sub
- [快应用-框架-组件](https://doc.quickapp.cn/tutorial/framework/parent-child-component-communication.html#%E5%85%84%E5%BC%9F%E8%B7%A8%E7%BA%A7%E7%BB%84%E4%BB%B6%E9%80%9A%E4%BF%A1)


### 组件通信：
一、父子组件
- 1. 父组件向子组件通信
  - 1.1 `props`
  - 1.2 `$broadcast`: 父组件通过`$broadcast()`触发自定义事件，子组件通过`$on()`监控自定义事件的触发
- 2. 子组件向父组件通信
  - 2.0 父组件传递的数据本身就是对象，子组件直接修改对象中的属性，父组件的值也会发生改变，不推荐这种，破坏了数据从上而下单向流动，也不好维护
  - 2.1 `$emit`: 子组件通过`$emit()`触发在节点上绑定的自定义事件来执行父组件的方法
  - 2.2 `$dispatch`: 子组件通过`$dispatch()`触发自定义事件，父组件通过`$on()`监控自定义事件的触发

父子组件双向的事件传递：
向下传递：父组件触发，子组件响应；调用`parentVm.$broadcast()`完成向下传递
向上传递：子组件触发，父组件响应；调用`childVm.$dispatch()`完成向上传递
当传递结束后，可以调用`evt.stop()`来结束传递,否则会一直传递下去

:::warning
数据单向性：
父子间的数据传输是单向性的，父组件 prop 数据更新，子组件的数据会刷新为最新值;子组件的 prop 值发生改变，并不会改变父组件中值。但是 prop 类型是数组或者对象，子组件变化会影响到父组件的值，这意味着你不应该在一个子组件内部改变 prop 的值，这是危险性操作。
:::

二、兄弟/跨级组件
1. 全局对象【如网页中的`window`，快应用中的`global`、app.ux中的`this.$app`】
2. 缓存【如网页中的`sessionStorage`/`localStorage`，快应用中的`@system.storage`，小程序中的`wx.setStorage`】
3. event bus
4. 通过 Publish/Subscribe 模型，提供发布订阅的能力
5. 消息通道 BroadcastChannel

:::tip
参考：
1. https://doc.quickapp.cn/tutorial/framework/parent-child-component-communication.html

2. https://doc.quickapp.cn/framework/script.html#%E6%B6%88%E6%81%AF%E9%80%9A%E9%81%93broadcastchannel-1000
:::

### 上传下载
- [上传下载](./upload-download.md)
- [参考：]()


### 项目总结-重难点【不定期更新】
后台系统使用jsx封装table-ai组件

sql 公众号管理：投放书籍取公众号取其下最新的一条记录【启用状态下按最后投放日期倒序排序，在同一段期间内一个公众号在一个投放媒体下只会投放一本书】

【2021-03-15】sql事务：quick/book/read 付费章节扣除书币时并发导致 8803用户余额不足；加桌奖励并发导致发放多次

【2021-04-06--2021-05-07】快应用优化，首页Tab每次重进页面使用if判断重新渲染需要重新请求接口导致白屏时间很长，体验和网页一样很差，使用 tabs/tab-bar/tab-content 组件进行重构，有多个选项卡的页面同样类似处理【注意：首页中的书城页面比较特殊，属于tabs中嵌套tabs组件，嵌套的子级中的tab-bar不会生效，需要使用自定义div模拟实现】，将数据缓存到内存实现APP般丝滑体验，页面数据更新策略详情见以下部分。

【2021-05-07】快应用页面数据更新策略-接口懒加载-首页tab页面性能优化：
需求：用户行为【比如登录、阅读、充值等】导致有页面需要更新数据时，通过 BroadcastChannel 消息通道通知到对应页面，等到用户切到这个页面后再开始请求接口更新数据。
方案：1. 页面（比如阅读历史页面 /history）可以在生命周期 onShow 时直接刷新数据；2. 自定义组件（比如首页 /home 中的四个 Tab）由于没有 onShow，改为采用在父组件 onShow 时通过 $broadcast 发送事件通知子组件，在子组件使用 $on 进行监听

【2021-05-07】书城骨架按后台配置生成：公众号网页使用jsx render函数，快应用在模板template中使用if判断加载对应骨架组件

【2021-05-07】快应用、微信公众号网页主题皮肤 // TODO

### lodash
- []()

### 平台检测
- [https://github.com/bestiejs/platform.js](https://github.com/bestiejs/platform.js)
- [https://github.com/mumuy/browser](https://github.com/mumuy/browser)