# 面试

- [https://github.com/sudheerj/javascript-interview-questions](https://github.com/sudheerj/javascript-interview-questions)
- [https://github.com/sisterAn/JavaScript-Algorithms](https://github.com/sisterAn/JavaScript-Algorithms)
- [掘金面试](https://juejin.cn/tag/面试)

```js
/**
 * 写个简单的模板解析器
 *将字符串中的特殊字符串替换为对象的对应属性值
  */
// 方法一：正则(或栈) 循环
if (!String.prototype.render1) {
  String.prototype.render1 = function (obj) {
    return this.replace(/\${(.+?)}/g, function(m1, p1) {
      console.log('replace:', m1, p1)
      const keys = p1.trim().split('.')
      let res = obj
      while(keys.length) {
        res = res[keys.shift()]
      }
      return res
    })
  }
}

// 方法二：正则 reduce
if (!String.prototype.render2) {
  String.prototype.render2 = function (obj) {
    return this.replace(/\${(.+?)}/g, (m1, p1) => p1.trim().split('.').reduce((res, cur) => res = res[cur], obj))
  }
}

// 方法三：new Function 模板字符串
if (!String.prototype.render3) {
  String.prototype.render3 = function(obj) {
    // '`' + this + '`' 等同于 `\`${this}\``
    // const fnStr = 'return ' + '`' + this + '`'
    const fnStr = `return \`${this}\``
    console.log('fnStr:', fnStr)
    const keys = Object.keys(obj)
    console.log('keys:', keys)
    const values = Object.values(obj)
    console.log('values:', values)
    const fn = new Function(...keys, fnStr)
    console.log('fn:', fn)
    return fn(...values)
  }
}

// 方法四：eval 模板字符串
if (!String.prototype.render4) {
  String.prototype.render4 = function(obj) {
    eval(`var {${Object.keys(obj).join(',')}} = obj`)
    return eval('`' + this + '`')
  }
}

// 方法五：with eval 模板字符串
if (!String.prototype.render5) {
  String.prototype.render5 = function(obj) {
    with (obj) {
      return eval('`' + this + '`')
    }
  }
}

var greeting = 'My name is ${name}, age is ${ age}, I am a ${ job.jobName }';
var employee = {
  name: 'XiaoMing',
  age: 18,
  job: {
    jobName: 'designer',
    jobLevel: 'senior'
  }
}
var result1 = greeting.render1(employee)
var result2 = greeting.render2(employee)
var result3 = greeting.render3(employee)
var result4 = greeting.render4(employee)
var result5 = greeting.render5(employee)
console.log('result1:', result1)
console.log('result2:', result2)
console.log('result3:', result3)
console.log('result4:', result4)
console.log('result5:', result5)
```