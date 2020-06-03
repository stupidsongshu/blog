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
