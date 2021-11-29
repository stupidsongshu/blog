## 兼容性

### iOS 12.0 Beta 1 WKWebview cross origin requests fail
- [axios](https://github.com/axios/axios/issues/1598)
- [Open Radar](http://www.openradar.me/40807782)
- [stackoverflow](https://stackoverflow.com/questions/50707146/ios-v12-https-requests-errors)

### input
#### type=file
- accept(image/* audio/* video/*): 没有 accept 时，手机自动打开本地相册
- capture(camera): 有 accept 时，无法禁用相机，可以禁用本地相册，直接打开相机
- multile: Android 设备不能同时选择多张图片

### 微信
#### iOS微信fixed定位键盘收起页面未下移
```js
// 1
$('input,textarea').on('blur', function() {
  window.scroll(0,0);
});

;(/iphone|ipod|ipad/i.test(navigator.appVersion)) && document.addEventListener('blur', function(e) {
  // 这里加了个类型判断，因为a等元素也会触发blur事件
  // ['input', 'textarea'].indexOf(e.target.localName) !== -1 && document.body && (document.body.scrollTop = document.body.scrollTop); // 2
  // ['input', 'textarea'].includes(e.target.localName) && document.body.scrollIntoView(false); // 3
  ['input', 'textarea'].indexOf(e.target.localName) !== -1 && document.body.scrollIntoView(false); // 4
}, true)
```
#### 微信公众号签名问题 - 单页应用 history 下的 invalid signature
Android 需要使用当前 URL 进行注册（即当场调用 location.href.split('#')[0]）；
iOS 需要使用进入页面的初始 URL 进行注册（即在任何 pushstate 前调用 location.href.split('#')[0]）

- [JS-SDK使用权限签名算法](https://developers.weixin.qq.com/doc/offiaccount/OA_Web_Apps/JS-SDK.html#62)
- [关于html5-History模式在微信浏览器内的问题](https://github.com/vuejs/vue-router/issues/481)
- [微信 jssdk 签名错误 invalid signature](https://www.fengerzh.com/jssdk-invalid-signature)
- [https://zhuanlan.zhihu.com/p/32227843](https://zhuanlan.zhihu.com/p/32227843)
- [https://segmentfault.com/a/1190000012339148](https://segmentfault.com/a/1190000012339148)

#### 微信公众号网页跳转小程序
[微信公众号 开放标签说明文档](https://developers.weixin.qq.com/doc/offiaccount/OA_Web_Apps/Wechat_Open_Tag.html)

[VUE中使用Wx-Open-Launch-Weapp采坑记](https://www.dengwz.com/archives/137)

## Flex 单行省略不生效
[参考](https://www.cnblogs.com/tgxh/p/6916930.html)
```html
<div class="book-wrap">
  <div class="book-icon"></div>
  <div class="book-content">
    <div class="book-title">这个标题好长好长长长长长长长长长长长长长长长长长长长长长长长长长长长长啊</div>
    <div class="book-intro">2021-09-29 10:08:31 再上两天班就可以一起给祖国母亲庆祝生日了，但是不知道去干什么，待会看看图书馆假期是否开放吧</div>
    <div class="book-other">
      <span class="book-category">校园</span>
      <span class="book-tag">武侠</span>
      <span class="book-over-type">连载中</span>
    </div>
  </div>
</div>
<style>
  .book-wrap {
    display: flex;
    background-color: #abcdef;
  }
  .book-icon {
    flex-shrink: 0;
    width: 80px;
    height: 120px;
    margin-right: 10px;
    border-radius: 10px;
    background-color: #2077ce;
  }
  .book-content {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 5px 0;
    /* flex布局的问题，猜测省略符需要对父元素限定宽度，
    设置 width: 0 或者 overflow: hidden 可行 */
    /* width: 0; */
    overflow: hidden;
  }
  .book-title {
    font-size: 16px;
    color: #333;

    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .book-intro {
    margin-top: 10px;
    font-size: 14px;
    color: #666;

    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    overflow: hidden;
  }
  .book-other {
    display: flex;
    font-size: 12px;
    color: #888;
  }
  .book-tag, .book-over-type {
    margin-left: 5px;
  }
</style>
```
