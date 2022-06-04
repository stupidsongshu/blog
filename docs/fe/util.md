# 工具

- [quickappcn/quickapp-dsl-vue](https://github.com/quickappcn/quickapp-dsl-vue/blob/4cfc8f065d/src/shared/util.js)
- [https://juejin.cn/post/7023906112843808804](https://juejin.cn/post/7023906112843808804)

### 项目总结-重难点【不定期更新】
后台系统使用jsx封装table-ai组件

sql 公众号管理：投放书籍取公众号取其下最新的一条记录【启用状态下按最后投放日期倒序排序，在同一段期间内一个公众号在一个投放媒体下只会投放一本书】

【2021-03-15】sql事务：quick/book/read 付费章节扣除书币时并发导致 8803用户余额不足；加桌奖励并发导致发放多次

快应用：充值、推送push

【2021-04-06--2021-05-07】快应用优化，首页Tab每次重进页面使用if判断重新渲染需要重新请求接口导致白屏时间很长，体验和网页一样很差，使用 tabs/tab-bar/tab-content 组件进行重构，有多个选项卡的页面同样类似处理【注意：首页中的书城页面比较特殊，属于tabs中嵌套tabs组件，嵌套的子级中的tab-bar不会生效，需要使用自定义div模拟实现】，将数据缓存到内存实现APP般丝滑体验，页面数据更新策略详情见以下部分。

【2021-05-07】快应用页面数据更新策略-接口懒加载-首页tab页面性能优化：
需求：用户行为【比如登录、阅读、充值等】导致有页面需要更新数据时，通过 BroadcastChannel 消息通道通知到对应页面，等到用户切到这个页面后再开始请求接口更新数据。
方案：1. 页面（比如阅读历史页面 /history）可以在生命周期 onShow 时直接刷新数据；2. 自定义组件（比如首页 /home 中的四个 Tab）由于没有 onShow，改为采用在父组件 onShow 时通过 $broadcast 发送事件通知子组件，在子组件使用 $on 进行监听

【2021-05-07】书城骨架按后台配置生成：公众号网页使用 render(安装插件使用 jsx 语法) 函数，快应用在模板template中使用 if 匹配加载对应骨架组件

公众号防封：vue-router 结合正则在 path 后面加上随机串
```js
let hexPathPattern = ''
if (routerMode === 0) {
  hexPathPattern = ''
} else if (routerMode === 1) {
  hexPathPattern = '(/[a-f0-9]+)?'
}

{
  path: '/read' + hexPathPattern,
  name: 'Read',
  // component: Read
  component: () => import(/* webpackChunkName: "read" */ '../views/read.vue')
},
```

【2021-05-07】快应用、微信公众号网页主题皮肤
- 快应用：
  - template 模板控制页面布局结构，通过配置文件 config.template 获取当前使用的模板
  - 将包名作为 theme主题（如包名为 com.hnyxa.fr 时，theme 为 fr），theme.less 文件定义包的颜色，通过 this.$app.getThemeClass() 生成当前包使用主题的 class 类名
- 公众号：mixin，接口返回当前公众号使用的模板 style，需要准备所有模板主题的变量，然后再根据 style 值返回当前模板的主题颜色

【2022-05-09】快应用页面网页化：
重难点在于快应用页面与网页的双向通信。
[Web组件发消息给H5页面时报错](https://developer.huawei.com/consumer/cn/doc/development/quickApp-Guides/quickapp-case-0000001082020374#section1795616555)
优点是不用发布版本，可以减小包体积；缺点是体验相比要差一点，仅适用偏展示或交互简单的页面，比如活动页面，列表页面。
[H5网页弹出软键盘后页面没有上移](https://developer.huawei.com/consumer/cn/doc/development/quickApp-Guides/quickapp-case-0000001082020374#section777715528107)

【2022-05-09】快应用消息通道 BroadcastChannel：[消息通道页面退出再进入异常或页面间无法通信](https://developer.huawei.com/consumer/cn/doc/development/quickApp-Guides/quickapp-case-0000001082020374#section1579091515517)

【2022-05-17】快应用 PageAOP: udid 为公共参数，在请求时从缓存中获取，当没有时进行生成，生成后需保证唯一（使用 md5 加密设备参数），应用启动后由于接口并发请求可能生成多个，造成服务端生成无用的用户记录，使用 AOP 思想解决（串行化，js 中无法使用锁进行解决）
```js
let apiStartSuccessed = false // api/start 接口是否请求成功
function PageAOP(o) {
  if (o) {
    const originFn = o.onInit
    o.onInit = async function (...t) {
      try {
        this.themeClass = this.$app.getThemeClass() // fix: 异步阻塞导致原始 onInit 执行后界面异常
        if (!apiStartSuccessed) {
          const [err, res] = await Api.apiStart()
          if (!err && res) {
            apiStartSuccessed = true
          }
        }
      } catch (e) {}

      if (originFn) return originFn.apply(this, t)
    }
  }
  return o
}

// 使用
export default PageAOP({
  public: {
    type: '',
    book_id: '',
    number: ''
  },
  private: {
    title: '',
    content: ''
  },
  async onInit(query) {
    console.log('页面生命周期：监听页面初始化。当页面完成初始化时调用，只触发一次', query)
    this.getBookRead()
  },
  onShow() {
    console.log('页面生命周期：监听页面显示。当进入页面时触发')
  },
  async getBookRead() {
    const [err, res] = await Api.bookRead({
      type: this.type,
      book_id: this.book_id,
      number: this.number
    })
    if (err) {
      switch (err.statusCode) {
        case 400:
          // token expired
          break
        case 401:
          // need login
          break
        case 409:
          // need charge
          break
      }
      return
    }
    if (!res) return
    const { data = {} } = res
    this.title = data.title
    this.content = data.content
  }
})
```

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

2. https://doc.quickapp.cn/framework/script.html#消息通道broadcastchannel-1000
:::

### 上传下载
- [上传下载](./upload-download.md)

### Lodash
- [https://lodash.com/](https://lodash.com/)

```js
/**
 * 根据key获取对象对应的Value
 * @param {object} target 目标对象
 * @param {string} key 需要获取的key，格式如'a.b'
 */
function getValue(target, key) {
  const keys = key.split('.')
  return keys.reduce(function(o, item) {
    return o[item]
  }, target)
}
```

### 平台检测
- [https://github.com/mumuy/browser](https://github.com/mumuy/browser)
- [https://github.com/bestiejs/platform.js](https://github.com/bestiejs/platform.js)
```js
const deviceType = () => {
  const u = navigator.userAgent
  return {
    trident: u.indexOf('Trident') > -1,
    presto: u.indexOf('Presto') > -1,
    webkit: u.indexOf('AppleWebkit') > -1,
    gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') === -1,
    mobile: !!u.match(/AppleWebKit.*Mobile.*/) || !!u.match(/AppleWebKit/),
    ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),
    android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1,
    iPhone: u.indexOf('iPhone') > -1 || u.indexOf('Mac') > -1,
    iPad: u.indexOf('iPad') > -1,
    webApp: u.indexOf('Safari') === -1,
    wechat: u.indexOf('MicroMessenger') > -1,
    // qq: u.indexOf('QQ/') > -1 && u.indexOf('MQQBrowser/') === -1, // qq内置浏览器
    qq: u.indexOf('QQ/') > -1 // qq内置浏览器
  }
}
```

```js
var Utils = {
  // 获取 url 参数
  getUrlParams: function(originUrl) {
    var url = originUrl || window.location.href
    var _pa = url.substring(url.indexOf('?') + 1)
    var _arrS = _pa.split('&')
    var _rs = {}
    for (var i = 0, _len = _arrS.length; i < _len; i++) {
      var pos = _arrS[i].indexOf('=')
      if (pos === -1) {
        continue
      }
      var name = _arrS[i].substring(0, pos)
      var value = window.decodeURIComponent(_arrS[i].substring(pos + 1))
      _rs[name] = value
    }
    return _rs
  },
  stringify: function(data) {
    if (!data || typeof data !== 'object') {
      throw new Error('parameter need an object');
    }
    var str = '';
    for (var key in data) {
      if (data.hasOwnProperty(key)) {
        var value = data[key];
        str += key + '=' + value + '&';
      }
    }
    return str.substring(0, str.length - 1);
  },
  merge: function(target) {
    for (var i = 1, j = arguments.length; i < j; i++) {
      var source = arguments[i] || {};
      for (var prop in source) {
        if (source.hasOwnProperty(prop)) {
          var value = source[prop];
          if (value !== undefined) {
            target[prop] = value;
          }
        }
      }
    }
    return target;
  },
  randomRange: function(start, end) {
    return Math.floor(Math.random() * (end - start) + start);
  },
  showToast: function(msg, duration) {
    // var instance = document.querySelector('.toast');
    // console.log(instance);
    // if (instance) {
    //   console.log(instance.parentNode);
    //   instance.parentNode.removeChild(instance);
    // }
    msg = msg || '';
    duration = duration || 3000;
    var div = document.createElement('div');
    var txt = document.createTextNode(msg);
    div.className = 'toast';
    div.appendChild(txt);
    document.body.appendChild(div);
    if (duration >= 0) {
      setTimeout(function() {
        document.body.removeChild(div);
      }, duration);
    }
  },
  $http: function(options, config) {
    options = options || {};
    config = config || {};
    // console.log(options);
    // console.log(config);
    var baseParams = {
      os: config.os || 3,
      channel: config.channel || '',
      udid: config.udid || '',
      vno: config.vno || '',
    };
    var method = (options.method || 'POST').toUpperCase();
    var params = $.extend(baseParams, options.data || {});
    if (method === 'GET') {
      // params = this.stringify(params);
    } else if (method === 'POST') {
      params = JSON.stringify(params);
    }
    return new Promise(function(resolve, reject) {
      $.ajax({
        url: options.url,
        type: method,
        contentType: 'application/json',
        data: params,
        xhrFields: { withCredentials: true },
        crossDomain: true,
        headers: {
          // token: document.cookie,
          token: config.cookie,
        },
        success: function(res) {
          if (res.statusCode !== 200 && res.statusCode !== 201) {
            Utils.showToast(res.statusMessage);
            // TODO login
            // if (res.statusCode === 401) {
            // }
            return;
          }
          if (res.statusCode === 201) {
            return reject(res);
          }
          resolve(res);
        },
        error: function(err) {
          Utils.showToast('获取数据失败，请稍后再试！');
          reject(err);
        }
      });
    });
  },
  createXHR: function() {
    if (typeof XMLHttpRequest !== 'undefined') {
      return new XMLHttpRequest();
    } else if (typeof ActiveXObject !== 'undefined') {
      if (typeof arguments.callee.activeXString !== 'string') {
        var versions = ['MSXML2.XMLHttp.6.0', 'MSXML2.XMLHttp.3.0', 'MSXML2.XMLHttp'],
            i,
            len;
        for (i = 0, len = versions.length; i < len; i++) {
          try {
            new ActiveXObject(versions[i]);
            arguments.callee.activeXString = versions[i];
            break;
          } catch (err) {
            console.error(err);
          }
        }
      }
      return new ActiveXObject(arguments.callee.activeXString);
    } else {
      throw new Error('No XHR object available');
    }
  },
  http: function(options) {
    var _this = this;
    return new Promise(function(resolve, reject) {
      var xhr = _this.createXHR();
      var type = options.type ? options.type.toUpperCase() : 'POST';
      var async = options.async !== undefined ? options.async : true;
      var handledUrlData = _this.handleUrlData(type, options.url, options.data);
      var url = handledUrlData.url;
      var data = handledUrlData.data;

      xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
          if ((xhr.status >= 200 && xhr.status < 300) || xhr.status === 304) {
            var response;
            try {
              response = JSON.parse(xhr.response);
            } catch (error) {
              console.log(url, error);
              response = xhr.response;
            }
            if (response.statusCode !== 200) {
              _this.showToast(response.statusMessage);
            }
            options.success && options.success(response);
            resolve(response);
          } else {
            console.log('request error:', xhr);
            _this.showToast('服务器开小差');
            options.error && options.error();
            reject();
          }
        }
      };

      xhr.open(type, url, async);
      // xhr.withCredentials = true;
      xhr.setRequestHeader('Content-type', 'application/json');
      if (options.headers) {
        for (var header in options.headers) {
          if (options.headers.hasOwnProperty(header)) {
            xhr.setRequestHeader(header, options.headers[header]);
          }
        }
      }
      xhr.send(data);
    })
  },
  handleUrlData: function(type, url, data) {
    if (type === 'GET') {
      if (!data || typeof data !== 'object') return { url: url, data: null, };
      var str = this.stringify(data);
      return {
        url: url.indexOf('?') === -1 ? url + '?' + str : url + '&' + str,
        data: null,
      };
    }
    if (type === 'POST') {
      if (!data || typeof data !== 'object') return { url: url, data: null };
      return {
        url: url,
        data: JSON.stringify(data),
      };
    }
  },
};
```

### 包裹 Promise
```js
const awaitWrap = promise => promise.then(data => [null, data]).catch(err => [err, null])
```

### sleep
```js
function sleep (milliseconds) {
  return new Promise(resolve => setTimeout(resolve, milliseconds))
}
```

### 节流
- [npm install throttle-debounce --save](https://github.com/niksy/throttle-debounce)
- [lodash throttle](https://github.com/lodash/lodash/blob/master/throttle.js)

```js
function throttle (func, wait, mustRun) {
  var timeout
  var startTime = new Date()

  return function () {
    var context = this
    var args = arguments
    var curTime = new Date()

    clearTimeout(timeout)
    // 如果达到了规定的触发时间间隔，触发 handler
    if (curTime - startTime >= mustRun) {
      func.apply(context, args)
      startTime = curTime
    // 没达到触发间隔，重新设定定时器
    } else {
      timeout = setTimeout(func, wait)
    }
  }
}
```

### 防抖
- [lodash debounce](https://github.com/lodash/lodash/blob/master/debounce.js)

```js
function debounce (func, wait = 50, immediate = true) {
  let timer, context, args
  // 延迟执行函数
  const later = () => setTimeout(() => {
    // 延迟函数执行完毕，清空缓存的定时器序号
    timer = null
    // 延迟执行的情况下，函数会在延迟函数中执行
    // 使用到之前缓存的参数和上下文
    if (!immediate) {
      func.apply(context, args)
      context = args = null
    }
  }, wait)

  // 这里返回的函数是每次实际调用的函数
  return function () {
    args = arguments
    // 如果没有创建延迟执行函数（later），就创建一个
    if (!timer) {
      timer = later()
      // 如果是立即执行，调用函数
      // 否则缓存参数和调用上下文
      if (immediate) {
        func.apply(this, args)
      } else {
        context = this
      }
    // 如果已有延迟执行函数（later），调用的时候清除原来的并重新设定一个
    // 这样做延迟函数会重新计时
    } else {
      clearTimeout(timer)
      timer = later()
    }
  }
}
```

### uuid
```js
function uuidv4 () {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = Math.random() * 16 | 0
    const v = c === 'x' ? r : (r & 0x3 | 0x8)
    return v.toString(16)
  })
}
```

### 滚动到指定位置
```js
const scrollTo = ({ left = 0, top = 0 } = {}) => {
  setTimeout(() => {
    try {
      window.scrollTo({
        left,
        top,
        behavior: 'smooth'
      })
    } catch (err) {
      if (err instanceof TypeError) {
        window.scrollTo(left, top)
      } else {
        throw err
      }
    }
  }, 100)
}
```

### 手机号
- 第一种写法（v-model可以用修饰符trim）
```html
<input
  type="text"
  placeholder="手机号"
  v-model.trim="phone"
  oninput="if(value.length>11){value=value.slice(0,11);return;}value=value.replace(/[^\d]/g,'');"
>
```
- 第二种写法（v-model不可以用修饰符trim，否则trim与自定义的会有冲突）
```html
<input
  type="text"
  placeholder="手机号"
  v-model="phone"
  @input="validateNumber"
>
```
```js
validateNumber () {
  if (this.phone.length > 11) {
    this.phone = this.phone.slice(0, 11)
    // this.phone = this.phone.substr(0, 11)
    // this.phone = this.phone.substring(0, 11)
    return
  }
  this.phone = this.phone.replace(/[^\d]/g, '')
}
```

```js
/**
  * hasClass
  * @param {Object} ele   HTML Object
  * @param {String} cls   className
  * @return {Boolean}
  */
function hasClass(ele, cls) {
  if (!ele || !cls) return false;
  if (ele.classList) {
    return ele.classList.contains(cls);
  } else {
    return ele.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));
  }
}

// addClass
function addClass(ele, cls) {
  if (ele.classList) {
    ele.classList.add(cls);
  } else {
    if (!hasClass(ele, cls)) ele.className += '' + cls;
  }
}

// removeClass
function removeClass(ele, cls) {
  if (ele.classList) {
    ele.classList.remove(cls);
  } else {
    ele.className = ele.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
  }
}
```

- 复制
```js
function copyToBoard(value) {
  const element = document.createElement('textarea')
  document.body.appendChild(element)
  element.value = value
  element.select()
  if (document.execCommand('copy')) {
      document.execCommand('copy')
      document.body.removeChild(element)
      return true
  }
  document.body.removeChild(element)
  return false
}
```

- 获取文件后缀名
```js
function getFileExt(filename) {
  if (typeof filename !== 'string') {
    throw new Error('filename must be a string type')
  }
  return filename.split('.').pop().toLowerCase()
}
```

- 对象转化为 FormData
```js
// 使用场景：上传文件时我们要新建一个FormData对象，然后有多少个参数就append多少次，使用该函数可以简化逻辑
function object2FormData(object) {
  const formData = new FormData()
  Object.keys(object).forEach(key => {
    const value = object[key]
    if (Array.isArray(value)) {
      value.forEach((subValue, i) =>
        formData.append(key + `[${i}]`, subValue)
      )
    } else {
      formData.append(key, object[key])
    }
  })
  return formData
}
```

- 去除对象中值为空('',null,undefined)的属性
```js
// 使用场景：请求接口时不传空值字段
const isFalsy = value => value === 0 ? false : !value
const isVolid = value => value === '' || value === null || value === undefined

function cleanParams(object) {
  if (!object) {
    return {}
  }
  const result = {...object}
  Object.keys(result).forEach(key => {
    const value = result[key]
    if (isVolid(value)) {
      delete reslut[key]
    }
  })
  return result
}
```

- cookie
```js
const cookie = {
  get: function getCookie(name) {
    let arr;
    const reg = new RegExp(`(^| )${name}=([^;]*)(;|$)`);
    if ((arr = document.cookie.match(reg))) return unescape(arr[2]);
    return null;
  },
  set(name, value, option = {}) {
    const Days = option.days != void 0 ? option.days : 30;
    const exp = new Date();
    exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
    const domain = option.domain ? `;domain=${option.domain}` : '';
    const path = option.path != void 0 ? `;path=${option.path}` : ';path=/';
    const cookie = `${name}=${escape(
      value
    )};expires=${exp.toGMTString()}${domain}${path}`;
    document.cookie = cookie;
  },
  setCookie(name, value, option = {}) {
    const domain = option.domain ? `;domain=${option.domain}` : '';
    const path = option.path != void 0 ? `;path=${option.path}` : ';path=/';
    const date = new Date();
    date.setTime(date.getTime() - 1 * 24 * 60 * 60 * 1000);
    document.cookie = `${name}=${escape(
      value
    )}; expire=${date.toGMTString()};${domain}${path}`;
  },
  setGuide(name, value, option = {}) {
    const Days = 1;
    const exp = new Date();
    exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
    const domain = option.domain ? `;domain=${option.domain}` : '';
    const path = option.path != void 0 ? `;path=${option.path}` : ';path=/';
    const cookie = `${name}=${escape(
      value
    )};expires=${exp.toGMTString()}${domain}${path}`;
    document.cookie = cookie;
  },
  remove(name) {
    this.setCookie(name, '');
  }
};

export default cookie;
```

- 日期
```js
const dateUtil = {
  format(date, format) {
    let dates = new Date(date.replace(/\-/g, '/'));
    if (dates == 'Invalid Date') {
      dates = new Date(date);
    }
    const map = {
      yyyy() {
        return dates.getFullYear();
      },
      MM() {
        const val = dates.getMonth() + 1;
        return val < 10 ? `0${val}` : val;
      },
      dd() {
        const val = dates.getDate();
        return val < 10 ? `0${val}` : val;
      },
      hh() {
        const val = dates.getHours();
        return val < 10 ? `0${val}` : val;
      },
      mm() {
        const val = dates.getMinutes();
        return val < 10 ? `0${val}` : val;
      },
      ss() {
        const val = dates.getSeconds();
        return val < 10 ? `0${val}` : val;
      }
    };
    for (const k in map) {
      format = format.replace(k, map[k]);
    }
    return format;
  },
  /*
    根据日期返回今天，昨天，前天，或者日期
  */
  dateToCN(date, format) {
    // 是否是今天
    function isToday(str) {
      let d = new Date(str.replace(/\-/g, '/'));
      if (d == 'Invalid Date') {
        d = new Date(str);
      }
      const todaysDate = new Date();
      if (d.setHours(0, 0, 0, 0) == todaysDate.setHours(0, 0, 0, 0)) {
        return true;
      }
      return false;
    }

    // 是否昨天
    function isYestday(date) {
      let d = new Date(date.replace(/\-/g, '/'));
      if (d == 'Invalid Date') {
        d = new Date(date);
      }
      const dates = new Date(); // 当前时间
      const today = new Date(
        dates.getFullYear(),
        dates.getMonth(),
        dates.getDate()
      ).getTime(); // 今天凌晨
      const yestday = new Date(today - 24 * 3600 * 1000).getTime();
      return d.getTime() < today && yestday <= d.getTime();
    }
    // 是否是前天
    function isBeforeYestday(date) {
      let d = new Date(date.replace(/\-/g, '/'));
      if (d == 'Invalid Date') {
        d = new Date(date);
      }
      const dates = new Date(); // 当前时间
      const today = new Date(
        dates.getFullYear(),
        dates.getMonth(),
        dates.getDate()
      ).getTime(); // 今天凌晨
      const yestday = new Date(today - 24 * 3600 * 1000).getTime();
      const beforeYestday = new Date(today - 48 * 3600 * 1000).getTime();
      return d.getTime() < yestday && beforeYestday <= d.getTime();
    }

    function getShowData(date) {
      if (isToday(date)) {
        // return '今天';
        return dateUtil.format(date, 'yyyy-MM-dd hh:mm:ss');
      } else if (isYestday(date)) {
        return '昨天';
      } else if (isBeforeYestday(date)) {
        return '前天';
      }
      return dateUtil.format(date, format);
    }

    return getShowData(date);
  },

  fetchTime(value) {
    const second = value; // 时间差的毫秒数
    let result = '';

    // 计算出相差天数
    const days = Math.floor(second / (24 * 3600 * 1000));

    // 计算出小时数

    const leave1 = second % (24 * 3600 * 1000); // 计算天数后剩余的毫秒数
    const hours = Math.floor(leave1 / (3600 * 1000));
    // 计算相差分钟数
    const leave2 = leave1 % (3600 * 1000); // 计算小时数后剩余的毫秒数
    const minutes = Math.floor(leave2 / (60 * 1000));

    // 计算相差秒数
    const leave3 = leave2 % (60 * 1000); // 计算分钟数后剩余的毫秒数
    const seconds = Math.round(leave3 / 1000);

    if (days && days >= 1) {
      result += `${days}天`;
    }
    if (hours && hours >= 1) {
      result += `${hours}小时`;
    }

    if (minutes && minutes >= 1) {
      result += `${minutes}分钟`;
    }

    if (seconds && seconds >= 1) {
      result += `${seconds}秒`;
    }
    return result || '1秒';
  },
  fetchdayTime(date) {
    const second = Date.parse(new Date()) - new Date(date).getTime();
    // 计算出相差天数
    const days = Math.floor(second / (24 * 3600 * 1000));
    // 计算出小时数

    const leave1 = second % (24 * 3600 * 1000); // 计算天数后剩余的毫秒数
    const hours = Math.floor(leave1 / (3600 * 1000));
    // 计算相差分钟数
    const leave2 = leave1 % (3600 * 1000); // 计算小时数后剩余的毫秒数
    const minutes = Math.floor(leave2 / (60 * 1000));

    // 计算相差秒数
    const leave3 = leave2 % (60 * 1000); // 计算分钟数后剩余的毫秒数
    const seconds = Math.round(leave3 / 1000);

    let result = '';
    if (days && days > 7) {
      result = moment(date)
        .locale('zh-cn')
        .format('YYYY-MM-DD');
    } else if (days && days >= 1 && days < 7) {
      result += `${days}天前`;
    } else if (hours && hours >= 1 && hours <= 23) {
      result += `${hours}小时前`;
    } else if (minutes && minutes >= 1 && minutes <= 59) {
      result += `${minutes}分钟前`;
    } else if (seconds && seconds >= 1 && seconds <= 59) {
      result += `${seconds}秒前`;
    } else {
      result = '1秒前';
    }
    return result;
  },

  paddingZero: function(val) {
    return val >= 10 ? val : '0' + val;
  },
  getTime: function(time) {
    if (!time) {
      return Date.now();
    }
    if (typeof time !== 'string' && typeof time !== 'number') {
      throw new Error('parameter time need to be string or number');
    }
    if (typeof time === 'string') {
      time = time.replace(/-/g, '/'); // 兼容 safari
    }
    return new Date(time).getTime();
  },
  getCountDownTime: function(time) {
    var nowTime = this.getTime();
    var targetTime = this.getTime(time);
    var diffTime = Math.ceil((targetTime - nowTime) / 1000);

    if (diffTime <= 0) {
      return '';
    }

    var date = 0;
    var hour = 0;
    var minute = 0;
    var second = 0;
    if (diffTime < 60) { // < 1m
      // console.warn('< 1m')
      second = this.paddingZero(diffTime);
    } else if (diffTime < 60 * 60) { // < 1h
      // console.warn('< 1h')
      var m = Math.floor(diffTime / 60);
      var s = diffTime % 60;
      minute = this.paddingZero(m);
      second = this.paddingZero(s);
    } else if (diffTime < 60 * 60 * 24) { // < 1d
      // console.warn('< 1d')
      var h = Math.floor(diffTime / 3600);
      var m = Math.floor((diffTime - h * 3600) / 60);
      var s = (diffTime - h * 3600 - m * 60) % 60;
      hour = this.paddingZero(h);
      minute = this.paddingZero(m);
      second = this.paddingZero(s);
    } else {
      // console.warn('>= 1d')
      var d = Math.floor(diffTime / 86400);
      var h = Math.floor((diffTime - d * 86400) / 3600);
      var m = Math.floor((diffTime - d * 86400 - h * 3600) / 60);
      var s = Math.floor((diffTime - d * 86400 - h * 3600 - m * 60) % 60);
      date = d;
      hour = this.paddingZero(h);
      minute = this.paddingZero(m);
      second = this.paddingZero(s);
    }

    var str = '';
    if (date) {
      str += date + '天';
    }
    str += hour + '小时' + minute + '分' + second + '秒';
    return str;
  },
}
```