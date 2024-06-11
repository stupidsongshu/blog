# Nginx

Nginx 发行版本
- https://nginx.org/ (开源版)
- https://nginx.com/ (商业版)
- https://tengine.taobao.org/ (开源版)
- http://openresty.org/ (开源版)
- https://openresty.com/ (商业版)

[参考-陶辉博客](https://www.taohui.pub/categories/nginx/)

## 源码编译安装
```sh
# centos 准备 nginx 编译安装环境
yum install -y gcc-c++ pcre pcre-devel zlib zlib-devel make

# 查看 configure 支持的参数
./configure --help | more

# 编译配置：会引用auto目录下的bash脚本
# 会在源代码目录中生成objs目录，其中 objs/ngx_modules.c 文件中包含接下来执行编译时有哪些模块会被编译进 nginx
./configure --prefix=/usr/local/nginx --with-http_ssl_module

# 编译和链接
make

# 安装（覆盖式安装）：将链接出的文件拷贝至正确的位置（比如会覆盖掉/usr/local/nginx/）
make install

# 测试
/usr/local/nginx/sbin/nginx -V

# 创建软链
ln -s /usr/local/nginx/sbin/nginx /usr/bin/nginx

# 启动
/usr/local/nginx/sbin/nginx

# 停止
# /usr/local/nginx/sbin/nginx -s stop

# 测试
curl localhost:80

# 修改配置文件后重载配置
/usr/local/nginx/sbin/nginx -s reload

# 测试配置文件是否正确
/usr/local/nginx/sbin/nginx -t
```

## Nginx 配置语法
Nginx 的配置文件语法遵循了 [INI](https://en.wikipedia.org/wiki/INI_file) 格式，即以 `[section]` 开始，以 `;` 或 `#` 开始的注释。

- 配置文件由指令与指令块构成
- 每条指令以 `;` 结束，指令块以 `{` 开始，以 `}` 结束
- 指令块以 `{}` 大括号将多条指令组织在一起
- include 语句允许组合多个配置文件以提升维护性
- 使用 `#` 添加注释
- 使用 `$` 定义变量，变量名必须以字母或下划线开头，变量名不能包含特殊字符
- 部分指令的参数支持正则表达式

配置参数-时间单位：
- `ms`: milliseconds
- `s`: seconds
- `m`: minutes
- `h`: hours
- `d`: days
- `w`: weeks
- `M`: months,30 days
- `y`: years,365 days

配置参数-空间单位：
- 不加单位时默认为 bytes
- `k/K`: kilobytes (1024 bytes)
- `m/M`: megabytes (1024 k)
- `g/G`: gigabytes (1024 m)
- `t/T`: terabytes (1024 g)
- `p/P`: petabytes (1024 t)
- `e/E`: exabytes (1024 p)
- `z/Z`: zettabytes (1024 e)
- `y/Y`: yottabytes (1024 z)

```sh
# vim 配置 nginx 语法高亮（默认情况下只有nginx.conf才能语法高亮，通过include引入的其他文件不行）
# Nginx *.conf文件Vim语法高亮问题：https://blog.csdn.net/weixin_45462681/article/details/117407402
cp -r /usr/local/nginx/contrib/vim/* ~/.vim/
```

## Nginx 命令行
```sh
# 帮助: -h / -?
nginx -h

# 打印版本信息: -v
nginx -v

# 打印编译信息: -V
nginx -V

# 使用指定的配置文件: -c
nginx -c /etc/nginx/myCustomNginx.conf

# 测试配置文件是否有语法错误: -t / -T
nginx -t

# 发送信号: -s
nginx -s stop # 立刻停止服务
nginx -s quit # 优雅地停止服务（等待当前请求处理完毕再停止）
nginx -s reload # 重新加载配置文件
nginx -s reopen # 重新开始记录日志文件

# 指定配置指令: -g
/usr/local/nginx/sbin/nginx -g "pid /var/nginx/test.pid"

# 指定运行目录: -p
/usr/local/nginx/sbin/nginx -p /usr/local/nginx/
```

```sh
#!/bin/bash

# Rotate the Nginx logs to prevent a single logfle from consuming too much disk space.

# 使用 crontab 定时分割日志示例：
# 0 0 1 * * root /usr/local/nginx/logs/rotate.sh

LOGS_PATH=/usr/local/nginx/logs/history
CUR_LOGS_PATH=/usr/local/nginx/logs
YESTERDAY=$(date -d "yesterday" +"%Y%m%d")
mv ${CUR_LOGS_PATH}/squirrel_access.log ${LOGS_PATH}/squirrel_access_${YESTERDAY}.log
mv ${CUR_LOGS_PATH}/squirrel_error.log ${LOGS_PATH}/squirrel_error_${YESTERDAY}.log
# 向 Nginx 主进程发送 USR1 信号重新打开日志文件（等同于 nginx -s reopen）
kill -USR1 ${cat /usr/local/nginx/logs/nginx.pid}
```

```sh
#!/bin/bash
# 重新打开日志 不会丢日志方式：（注意 mv 后再 reopen）

# 设置日志文件存放目录
logs_path="/data/log/nginx/access/"
DAYS=30
# 设置pid文件
pid_path="/usr/local/nginx/logs/nginx.pid"
# 重命名日志文件
mv ${logs_path}default.log ${logs_path}default-access_$(date -d "yesterday" +"%Y%m%d").log
# 向nginx主进程发信号重新打开日志
kill -USR1 `cat ${pid_path}`
find ${logs_path} -name "default-access_*.log" -type f -mtime +$DAYS -exec rm {} \;
```

## SSL/TLS
- SSL: Secure Socket Layer
- TLS: Transport Layer Secure

发展：
- 1995年，SSL3.0
- 1999年，TLS1.0
- 2006年，TLS1.1
- 2008年，TLS1.2
- 2018年，TLS1.3

证书类型：
- 域名验证(domain validated, DV)证书
- 组织验证(organization validated, OV)证书
- 扩展验证(extended validated, EV)证书

使用 [Let's Encrypt](https://letsencrypt.org/) 免费证书实现 https 站点
```sh
yum install python2-certbot-nginx
# yum install certbot

certbot -h
certbot -h nginx

certbot --nginx --nginx-server-root=/usr/local/openresty/nginx/conf/ -d example.com
```

## 进程管理-信号
[参考博客](https://www.cnblogs.com/youth-blog/articles/16832451.html)

nginx 命令行
- `reload`: `HUP`
- `reopen`: `USR1`
- `stop`: `TERM`
- `quit`: `QUIT`

master 进程
- 监控 worker 进程
    - `CHILD`: master 是 worker 进程的父进程，在子进程退出时，Linux kernal 会向这个父进程发送信号 `SIGCHLD`
- 管理 worker 进程
- 接收信号
    - `TERM`, `INT`
    - `QUIT`
    - `HUP`
    - `USR1`
    - `USR2` (只能通过 `kill -SIGUSR2 老master进程pid` 使用，用于热升级)
    - `WINCH` (只能通过 `kill -SIGWINCH 老master进程pid` 使用，用于关闭所有的 worker 进程)

worker 进程
- 接收信号
    - `TERM`, `INT`
    - `QUIT`
    - `USR1`
    - `WINCH`

### reload 流程
1. 向 master 进程发送 `HUP` 信号 (reload 命令)
2. master 进程校验配置语法是否正确
3. master 进程打开新的监听端口
4. master 进程用新配置启动新的 worker 子进程
5. master 进程向老的 worker 子进程发送 `QUIT` 信号，让老 worker 子进程优雅的停止
6. 老的 worker 子进程关闭监听句柄，处理完当前连接后结束进程

:::warning
nginx 优雅关闭主要针对 http 请求，而不是 tcp 或 websocket。因为 nginx 不会解析 tcp 的帧，也不会解析 websocket 的 frame，无法识别关闭的时机。
:::

### 热升级流程
[参考-如何在高并发环境中灰度升级Nginx？](https://www.nginx.org.cn/article/detail/70)
1. 将旧 Nginx 文件换成新 Nginx 文件（注意备份）
2. 向 master 进程发送 `USR2` 信号
    - 2.1 master 进程修改 pid 文件名，加后缀 .oldbin
    - 2.2 master 进程用新 Nginx 配置文件启动新 master 进程
3. 向老 master 进程发送 `WINCH` 信号，告诉它请优雅的关闭你的所有的 worker 进程
4. 确认升级正常后，向老 master 进程发送 `QUIT` 信号，关闭老 master 进程
5. 回滚：向老 master 发送 `HUP` 信号，向新 master 发送 `QUIT` 信号

待理解概念：
- TCP四元组
- [Epoll详解及源码分析](https://blog.csdn.net/chen19870707/article/details/42525887)
- 用户态、内核态
