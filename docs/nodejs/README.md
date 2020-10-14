# Node.js

### node.js上线部署
ssh 用户名@地址（免密登陆）

scp course-map.json root@IP地址:/路径

scp -r advance / root@101.200.185.250:/opt/node-publish/www/static

npm install --production 只管上线环境

Unix domain Socket 走IPC

### 服务器集群
- Nginx -> PM2 -> Varnish -> Java -> DB(read/wirte) -> BACK
- PM 2 -> CDN
- Nagios监测
- Keepalived heartbeat心跳检测: Varnish -> Java

### 经典代码：
- 职责链模式：router.get(/^\(\d+)_(\d+)/, cModel.A, cModel.B, cModel.C)

- var shaObj = new jsSHA(string, 'TEXT'); var hash = shaObj.getHash('SHA-1', 'HEX');

- var forPound = req.headers['x-forwarded-for-pound'];

- 回调：callback(new Error('Fail to parse http response to json, url:' + reqOptions.url), res.body);

- 中间件：require('./middleware')(app);

### 源码
- git clone git@github.com:nodejs/node.git
- cd ./node
- ./configure && make
- make install
- make test

### node.js启动: 
- src/node.h
- src/node.cc Start()
- lib/internal/bootstrap_node.js

### node.js测试文件
- test/parallel/test-*.js

### pr规范：
- branch name: fix/gh-{number: issue id}
- commit message: "module name: description"


- 开启debug模式 `node --debug app.js`
- [node-inspector](https://www.npmjs.com/package/node-inspector)

## [PM2](https://pm2.io/)
```sh
pm2 start server.js --name my-server
pm2 list # pm2 ls
pm2 restart my-server
pm2 stop my-server
pm2 monit
pm2 logs my-server
```

## libuv
### event-loop
![示意图](/node/libuv1.jpg)

Node.js event-loop 六大阶段，每个阶段存在 FIFO 队列
- timers 阶段：setTimeout、setInterval 回调入此队列
- pending I/O 阶段：一些系统错误 I/O 回调，延迟到下一个循环的 I/O 回调入此队列
- idle、prepare 阶段：系统内部专用
- poll 阶段：获取新 I/O 事件，适当时候会阻塞在此（poll 队列为空且无预设 setImmediate），但有调用上限
- check 阶段：setImmediate 入此队列，检测并执行
- close 阶段：一些关闭回调入此队列，如 socket 的 close、destroy 等回调

[https://github.com/nodejs/node/blob/master/deps/uv/src/unix/core.c](https://github.com/nodejs/node/blob/master/deps/uv/src/unix/core.c#L365)

![示意图](/node/libuv2.jpg)

[https://github.com/nodejs/node/blob/master/src/node_main_instance.cc](https://github.com/nodejs/node/blob/master/src/node_main_instance.cc#L127)

![示意图](/node/libuv3.jpg)

浏览器 与 Node.js(版本<12) event-loop 比较：
- 浏览器环境下，microtask 的任务队列是每个 macrotask 执行完之后执行
- Node.js 中，microtask 会在事件循环的各个阶段之间执行，也就是一个阶段执行完毕，就会去执行 microtask 队列的任务

```js
setTimeout(() => {
  console.log('time1');
  new Promise((resolve) => {resolve()}).then(() => {
    console.log('promise1')
  })
}, 0);

setTimeout(() => {
  console.log('time2');
  new Promise((resolve) => {resolve()}).then(() => {
    console.log('promise2')
  })
}, 0);

// Node.js <= 10: time1 time2 promise1 promise2
// Node.js > 12 或浏览器环境： time1 promise1 time2 promise2
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
