# 事件循环
chrome 浏览器基于 [message pump](https://source.chromium.org/chromium/chromium/src/+/main:base/message_loop/message_pump_default.cc;l=29) 实现，Node.js 基于 libuv 实现
## 参考资料
- [从Chrome源码看事件循环](https://www.yinchengli.com/2018/11/04/chrome-event-loop/)
- [node事件循环](https://www.taopoppy.cn/node/one_eventLoop.html)
- [拉勾教育-面试率超高的JS事件循环，看这篇就够了](https://kaiwu.lagou.com/course/courseInfo.htm?courseId=1076#/detail/pc?id=8363)

## libuv
### event-loop
<!-- ![event-loop](/node/libuv1.jpg) -->
<img :src="$withBase('/node/libuv1.jpg')" alt="event-loop">

Node.js event-loop 六大阶段，每个阶段存在 FIFO 队列
- timers 阶段：setTimeout、setInterval 回调入此队列
- pending I/O 阶段：一些系统错误 I/O 回调，延迟到下一个循环的 I/O 回调入此队列
- idle、prepare 阶段：系统内部专用
- poll 阶段：获取新 I/O 事件，适当时候会阻塞在此（poll 队列为空且无预设 setImmediate），但有调用上限
- check 阶段：setImmediate 入此队列，检测并执行
- close 阶段：一些关闭回调入此队列，如 socket 的 close、destroy 等回调

[https://github.com/nodejs/node/blob/master/deps/uv/src/unix/core.c](https://github.com/nodejs/node/blob/master/deps/uv/src/unix/core.c#L365)

<!-- ![示意图](/node/libuv2.jpg) -->
<img :src="$withBase('/node/libuv2.jpg')" alt="event-loop">

[https://github.com/nodejs/node/blob/master/src/node_main_instance.cc](https://github.com/nodejs/node/blob/master/src/node_main_instance.cc#L127)

<!-- ![示意图](/node/libuv3.jpg) -->
<img :src="$withBase('/node/libuv3.jpg')" alt="event-loop">

浏览器 与 Node.js 的 event-loop 比较：
- Node.js 版本 **<= 10**：浏览器环境下，microtask 的任务队列是每个 macrotask 执行完之后执行；Node.js 中，microtask 会在事件循环的各个阶段之间执行，也就是一个阶段执行完毕，就会去执行 microtask 队列的任务
- Node.js 版本 **>= 11**：和浏览器保持一致

```js
setTimeout(() => {
  console.log('time1');
  new Promise((resolve) => {resolve()}).then(() => {
    console.log('promise1')
  })
}, 0);

setTimeout(() => {
  console.log('time2');
  Promise.resolve().then(() => {
    console.log('promise2')
  })
}, 0);

// Node.js <= 10: time1 time2 promise1 promise2
// Node.js >= 11 或浏览器环境： time1 promise1 time2 promise2
```

### process.nextTick 与 setImmediate
[https://nodejs.org/zh-cn/docs/guides/event-loop-timers-and-nexttick/#timers](https://nodejs.org/zh-cn/docs/guides/event-loop-timers-and-nexttick/#timers)

Node.js 中的 process.nextTick() 与 setImmediate() 比较：
- process.nextTick() 在各个阶段之间执行
- setImmediate 在检测特定阶段执行
- 递归的调用 process.nextTick() 会导致 I/O starving，官方推荐使用 setImmediate()

```js
const fs = require('fs');

const startTime = Date.now();
fs.readFile('./test.js', (err, data) => {
  console.log(`finish reading time: ${Date.now() - startTime}`);
})

let index = 0;

function handler () {
  if (index++ >= 1000) return
  // console.log(`nextTick ${index}`);
  // process.nextTick(handler);

  console.log(`setImmediate ${index}`);
  setImmediate(handler);
}
handler();
```
检测：
```js
const fs = require('fs');
const EventEmitter = require('events').EventEmitter;
let pos = 0;
const messenger = new EventEmitter();

messenger.on('message', function(msg) {
  console.log(++pos + " message:" + msg);
});

console.log(++pos + " first");

process.nextTick(function(){
  console.log(++pos + " nextTick");
});

messenger.emit('message', "hello!");
fs.stat(__filename, function(){
  console.log(++pos + " stat");
});

setTimeout(function(){
  console.log(++pos + " quick timer");
}, 0);
setTimeout(function(){
  console.log(++pos + " long timer");
}, 30);
setImmediate(function(){
  console.log(++pos + " immediate");
});

console.log(++pos + " last");
```

## 宏任务 微任务
- [Tasks, microtasks, queues and schedules](https://jakearchibald.com/2015/tasks-microtasks-queues-and-schedules/)
- [微任务、宏任务与Event-Loop](https://juejin.cn/post/6844903657264136200)

宏任务包括：
- script(整体代码)
- I/O (addEventListener add ajax fetch fs)
- `setTimeout`
- `setInterval`
- `setImmediate`(仅 Node)
- `requestAnimationFrame`(仅浏览器)

微任务包括：
- `Promise.then catch finally`
- `Object.observe`(仅浏览器，已废弃)
- `MutationObserver`(仅浏览器)
- `process.nextTick`(仅 Node)
