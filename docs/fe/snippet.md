## 移动端兼容性

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

## 工具类
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
  createXHR: function () {
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
function sleep (time) {
  return new Promise(resolve => setTimeout(resolve, time))
}
```

### 平台设备
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

## 正则校验
- 手机号
```js
/^1[3-9]\d{9}$/.test(mobile)
mobile.match(/^1[3-9]\d{9}$/)
```

- 身份证号
```js
function checkCHNCardId (sNo) {
  sNo = sNo.toString()
  if (!/^[0-9]{17}[X0-9]$/.test(sNo)) {
    return false
  }

  var a, b, c
  a = parseInt(sNo.substr(0, 1)) * 7 + parseInt(sNo.substr(1, 1)) * 9 + parseInt(sNo.substr(2, 1)) * 10
  a = a + parseInt(sNo.substr(3, 1)) * 5 + parseInt(sNo.substr(4, 1)) * 8 + parseInt(sNo.substr(5, 1)) * 4
  a = a + parseInt(sNo.substr(6, 1)) * 2 + parseInt(sNo.substr(7, 1)) * 1 + parseInt(sNo.substr(8, 1)) * 6
  a = a + parseInt(sNo.substr(9, 1)) * 3 + parseInt(sNo.substr(10, 1)) * 7 + parseInt(sNo.substr(11, 1)) * 9
  a = a + parseInt(sNo.substr(12, 1)) * 10 + parseInt(sNo.substr(13, 1)) * 5 + parseInt(sNo.substr(14, 1)) * 8
  a = a + parseInt(sNo.substr(15, 1)) * 4 + parseInt(sNo.substr(16, 1)) * 2
  b = a % 11

  if (b === 2) {
    c = sNo.substr(17, 1).toUpperCase()
  } else {
    c = parseInt(sNo.substr(17, 1))
  }

  switch (b) {
    case 0:
      if (c !== 1) {
        return false
      }
      break
    case 1:
      if (c !== 0) {
        return false
      }
      break
    case 2:
      if (c !== 'X') {
        return false
      }
      break
    case 3:
      if (c !== 9) {
        return false
      }
      break
    case 4:
      if (c !== 8) {
        return false
      }
      break
    case 5:
      if (c !== 7) {
        return false
      }
      break
    case 6:
      if (c !== 6) {
        return false
      }
      break
    case 7:
      if (c !== 5) {
        return false
      }
      break
    case 8:
      if (c !== 4) {
        return false
      }
      break
    case 9:
      if (c !== 3) {
        return false
      }
      break
    case 10:
      if (c !== 2) {
        return false
      }
  }
  return true
}


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
