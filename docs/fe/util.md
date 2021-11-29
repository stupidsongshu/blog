# 工具

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
