# 正则表达式

## 正则校验
- 中文汉字
```js
/[\u4E00-\u9FA5]/g
```
[Poorman-通用规范汉字表-unicode码位](https://gist.github.com/JLHwung/06fca92ddd73a0acb2a738237fc431df)

Add Unicode Codepoint mapping alongside the ideograph in Table of General Standard Chinese Characters ([通用规范汉字表](https://zh.wikisource.org/wiki/通用规范汉字表))

Run the snippet in the console when opening [通用规范汉字表](https://zh.wikisource.org/wiki/通用规范汉字表).

```js
$(".mw-parser-output dl dd").each(function(){$(this).append(`<small style="margin-left:1rem"><code>U+${$(this).text().replace(/[\d\s]+/i, "").codePointAt(0).toString(16).toUpperCase()}</code></small>`)})
```

- 手机号
```js
/^1[3-9]\d{9}$/.test(mobile)
mobile.match(/^1[3-9]\d{9}$/)
```

- 以数字开头或结尾，多个数字用英文逗号间隔
```js
/^(\d,?)*\d$/
```

- 身份证号
```js
/^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/
```
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
      if (c !== 1) return false
    case 1:
      if (c !== 0) return false
    case 2:
      if (c !== 'X') return false
    case 3:
      if (c !== 9) return false
    case 4:
      if (c !== 8) return false
    case 5:
      if (c !== 7) return false
    case 6:
      if (c !== 6) return false
    case 7:
      if (c !== 5) return false
    case 8:
      if (c !== 4) return false
    case 9:
      if (c !== 3) return false
    case 10:
      if (c !== 2) return false
  }
  return true
}
```
