# CentOS
```sh
# 查看CentOS的版本号
lsb_release -a
cat /etc/centos-release
cat /etc/redhat-release

# 查看操作系统内核版本
uname --help
uname -a
uname -r
cat /proc/version

# 查看操作系统位数
getconf LONG_BIT
file /bin/ls

# 查看CPU信息
lscpu
cat /proc/cpuinfo
cat /proc/cpuinfo | grep "model name"
cat /proc/cpuinfo | grep "model name" | uniq

# 查看内存信息
free -h
cat /proc/meminfo
cat /proc/meminfo | grep MemTotal
cat /proc/meminfo | grep MemTotal | awk '{print $2}' | awk '{printf("%.2f\n", $1/1024/1024)}'
cat /proc/meminfo | grep MemTotal | awk '{printf("%.2f\n", $2/1024/1024)}'
# dmidecode 命令用于从硬件系统中提取DMI（硬件管理接口）表的内容，可以用来查看物理内存的大小。
dmidecode -t memory
```

## FHS
[FHS (Filesystem Hierarchy Standard) 文件系统层次结构标准](https://zh.wikipedia.org/wiki/%E6%96%87%E4%BB%B6%E7%B3%BB%E7%BB%9F%E5%B1%82%E6%AC%A1%E7%BB%93%E6%9E%84%E6%A0%87%E5%87%86)
| Name | Description |
| :--: | ----------- |
| /bin | 存放二进制可执行文件 |
| /boot| 存放用于系统引导时使用的各种文件及内核 |
| /dev | 存放设备文件 |
| /etc | 存放系统管理和配置文件(cron.d定时任务；firewalld防火墙；hosts；my.cnf mysql配置文件；ngnix；rc.d开机自动启动脚本；rpm；ssh；sysconfig内容较多，包含网卡配置文件；vimrc) |
| /root | 超级⽤户(系统管理员)的主目录 |
| /home | 存放所有用户⽂件的根目录，是普通⽤户主目录的基点，⽐如⽤户user的主目录就是/home/user，可以用~user表示 |
| /lib | 存放跟文件系统中的程序运行所需要的共享库及内核模块。共享库又叫动态链接共享库，作用类似windows里的dll文件，存放了根文件系统程序运行所需的共享文件。 |
| /mnt | 系统管理员安装临时文件系统的安装点，系统提供这个⽬录是让⽤户临时挂载其他的⽂件系统。 |
| /opt | 额外安装的可选应⽤程序包所放置的位置。 |
| /proc | 虚拟⽂件系统目录，是系统内存的映射（不保存在硬盘，储存在内存中）。可直接访问这个目录来获取系统信息（如cpuinfo/meminfo）。 |
| /tmp | 用于存放各种临时⽂件，是公⽤的临时⽂件存储点。 |
| /usr | ⽤于存放系统应⽤程序，⽐较重要的⽬录/usr/local本地系统管理员软件安装目录 (安装系统级的应用)。这是最庞大的⽬录，要用到的应用程序和文件⼏乎都在这个目录。 |
| /var | ⽤于存放运行时需要改变数据的⽂件，也是某些⼤文件的溢出区，⽐方说/var/log各种服务的日志⽂件(系统启动⽇志等。)等。 |

::: danger
**修改配置文件**时一定要**先备份再修改**
:::
::: tip
- 静态库：Windows和Linux系统下都是.lib文件
- 动态库：Windows系统下是.dll文件，Linux系统下是.so文件
:::

## Mac VMware Fusion
- [联网问题](https://garryshield.github.io/2016/11/01/mac-vmware-network/)
- 重启网络命令
  - systemctl restart network
  - service restart network
:::tip
centos8重启网络命令报错：Failed to restart network.service: Unit network.service not found.

改用NetworkManager重启：[systemctl restart NetworkManager](https://www.golinuxcloud.com/unit-network-service-not-found-rhel-8-linux/)
:::

## systemd
systemd是目前Linux系统上主要的系统守护进程管理工具。Systemctl是一个systemd工具，主要负责控制systemd系统和服务管理器。

配置文件在 `/etc/systemd/system`

```sh
# 查看服务列表
systemctl list-unit-files
systemctl list-unit-files --type=service | grep firewalld

# 重新加载系统管理守护进程的配置文件。当systemd配置文件修改后，可使用此命令让系统重新加载配置文件
systemctl daemon-reload

# 加载某个服务的配置文件
systemctl reload xxx.service

# 启动服务
systemctl start xxx.service

# 停止服务
systemctl stop xxx.service

# 重启服务
systemctl restart xxx.service

# 开机启动
systemctl enable xxx.service

# 关闭开机启动
systemctl disable xxx.service

# 查看服务状态
systemctl status xxx.service

# 查看服务状态
systemctl is-active xxx.service

# 查看服务状态
systemctl is-enabled xxx.service
```

## CentOS 7 安装 Git
[How to install Latest Git ( Git 2.x ) on CentOS 7](https://webmagicinformatica.com/how-to-install-latest-git-git-2-x-on-centos-7/)

[How to Install Git on CentOS 7 With Yum or Latest Repository](https://phoenixnap.com/kb/how-to-install-git-on-centos-7)
```sh
# 1. Remove old git
sudo yum -y remove git
sudo yum -y remove git-*

# 2. Add End Point CentOS 7 repo
sudo yum -y install https://packages.endpointdev.com/rhel/7/os/x86_64/endpoint-repo.x86_64.rpm

# 3. Once repository is added, install Git 2.x on CentOS 7:
sudo yum install git

# 4. Check git version after installing git2u-all package
git --version
```

## CentOS 7 安装 MySQL
- [How to Install MySQL on CentOS 7](https://www.linode.com/docs/databases/mysql/how-to-install-mysql-on-centos-7/)
- [How To Install MySQL on CentOS 7](https://www.digitalocean.com/community/tutorials/how-to-install-mysql-on-centos-7)

```sh
sudo -i

# [Source Installation Prerequisites](https://dev.mysql.com/doc/refman/8.0/en/source-installation-prerequisites.html)
yum -y update
yum -y install wget gcc gcc-c++ ncurses ncurses-devel libaio-devel openssl openssl-devel
yum -y install cmake3

# [centos7.9 GCC4.8升级到9.3](https://blog.csdn.net/linuxxx110/article/details/150053136)
yum -y install centos-release-scl
# centos-release-scl 安装完成后，将配置文件修改为阿里云的源
# /etc/yum.repos.d/CentOS-SCLo-scl.repo 修改为​​​​​​​ baseurl=https://mirrors.aliyun.com/centos/$releasever/sclo/$basearch/sclo/
# /etc/yum.repos.d/CentOS-SCLo-scl-rh.repo​​​​​​​ 修改为​​​​​​​ baseurl=https://mirrors.aliyun.com/centos/$releasever/sclo/$basearch/rh/
# 刷新缓存: yum repolist && yum clean all && yum makecache
yum -y install devtoolset-11-gcc devtoolset-11-gcc-c++ devtoolset-11-binutils
scl enable devtoolset-11 bash # 临时切换到gcc11环境
gcc -v

groupadd mysql

# -r: 创建一个系统用户
# -g mysql: 指定用户的主组为 mysql
# -s /sbin/nologin: 设置该用户的登录 shell 为 /sbin/nologin，拒绝mysql用户登陆
useradd -r -g mysql -s /sbin/nologin mysql

cd /root
# https://dev.mysql.com/downloads/mysql/
# Select Version: 8.0.43
# Select Operating System: Source Code
# Select OS Version: All Operating Systems (Generic) (Architecture Independent)
wget https://dev.mysql.com/get/Downloads/MySQL-8.0/mysql-boost-8.0.43.tar.gz
tar xzvf mysql-boost-8.0.43.tar.gz
cd /root/mysql-8.0.43

# [mysql8.0官方编译参数](https://dev.mysql.com/doc/refman/8.0/en/source-configuration-options.html)
cmake3 . \
-DCMAKE_INSTALL_PREFIX=/usr/local/mysql \
-DMYSQL_DATADIR=/data/db/mysql \
-DSYSCONFDIR=/etc \
-DMYSQL_TCP_PORT=3306 \
-DWITH_BOOST=./boost \
-DDEFAULT_CHARSET=utf8mb4 \
-DDEFAULT_COLLATION=utf8mb4_general_ci \
-DENABLED_LOCAL_INFILE=ON \
-DFORCE_INSOURCE_BUILD=1 \
-DWITH_INNODB_MEMCACHED=ON \
-DWITH_INNOBASE_STORAGE_ENGINE=1 \
-DWITH_FEDERATED_STORAGE_ENGINE=1 \
-DWITH_BLACKHOLE_STORAGE_ENGINE=1 \
-DWITH_ARCHIVE_STORAGE_ENGINE=1 \
-DWITHOUT_EXAMPLE_STORAGE_ENGINE=1 \
-DWITH_PERFSCHEMA_STORAGE_ENGINE=1;

nproc # 获取 CPU 核心数

# make -j$(nproc) # 使用所有可用的 CPU 核心进行编译，加快速度 8:52 %17, 14:30 87%

# 由于编译时间较长，可使用 screen/tmux 或 nohup 来防止 ssh 会话断开连接
# 方法1: 使用 screen (推荐)
screen -S mysql_build # 创建一个名为 mysql_build 的 screen 会话，并进入该会话
make -j$(nproc) # 按下组合键 Ctrl + A，然后松开，再按 D，主动分离（Detach）当前会话
screen -ls # 列出所有 screen 会话
screen -r mysql_build # 重新附着（Attach）到之前的会话

# 方法2 使用 nohup:
# nohup：保证命令不挂起
# > make.log：创建一个新的 make.log 文件，如果该文件已存在，则先清空其所有内容，然后从头开始写入输出。
# >> make.log：如果 make.log 文件不存在，则创建它；如果已存在，则将新的输出追加（Append）到该文件的末尾，保留之前的所有内容。
# 2>&1：将标准错误（文件描述符 2，stderr）重定向到标准输出（文件描述符 1，stdout）所在的地方。因为 stdout 已经被重定向到 make.log，所以 stderr 也会被写入同一个文件。
# &：将命令放入后台执行
nohup make -j$(nproc) >> make.log 2>&1 &
tail -f /root/mysql-8.0.43/make.log

make install

/usr/local/mysql/bin/mysql --version

echo "PATH=/usr/local/mysql/bin:$PATH" >> /etc/profile
source /etc/profile

mysql --version

mkdir -p /data/db/mysql
chmod 755 /data/db/mysql
chown mysql:mysql /data/db/mysql

```

```sh
# ~/.ssh/config 中设置 ServerAliveInterval，定期发送保活包来维持连接
Host * # 对所有主机生效，也可以替换成你的服务器IP
  ServerAliveInterval 60 # 每隔60秒向服务器发送一个保活包
  ServerAliveCountMax 5  # 如果连续5次没有收到响应，则断开连接
```

### 本地MySQLWorkbench通过SSH隧道连接远程服务器MySQL
如果服务器只开放了 22 和 80 端口，没有开放 3306 端口，在 macOS 上使用 SSH 密钥通过隧道连接 CentOS 7.9 的 MySQL 服务

#### 方法一：使用 MySQL Workbench 内置 SSH 隧道功能（推荐）
配置 MySQL Workbench 连接
- 打开 MySQL Workbench，点击 "+" 图标创建新连接
- 在 "Setup New Connection" 对话框中，填写以下信息：

Connection Method 选项卡：
- Connection Name: 输入一个有意义的名称（如 "Production DB via SSH"）
- Connection Method: 选择 `Standard TCP/IP over SSH`

Parameters 选项卡：
- SSH Hostname: 8.159.138.235:22
- SSH Username: ecs-user
- SSH Key File: 点击右侧文件夹图标，选择您的私钥文件 ~/.ssh/ecs-user.pem
- MySQL Hostname: 127.0.0.1 或 localhost（因为 MySQL 在服务器本地）
- MySQL Server Port: 3306（MySQL 默认端口）
- Username: 您的 MySQL 用户名
- Password: 您的 MySQL 密码
- Default Schema: （可选）选择默认数据库

MySQL Workbench 会自动建立 SSH 隧道并连接到 MySQL 数据库

#### 方法二：手动创建 SSH 隧道
1. 在终端中创建 SSH 隧道
```sh
# -i ~/.ssh/ecs-user.pem：指定 SSH 私钥文件
# -N：不执行远程命令，只建立隧道
# -L 33306:localhost:3306：将本地 33306 端口转发到服务器上的 3306 端口
# ecs-user@8.159.138.235：您的服务器 SSH 用户名和 IP 地址
ssh -i ~/.ssh/ecs-user.pem -N -L 33306:localhost:3306 ecs-user@8.159.138.235
```

2. 配置 MySQL Workbench 连接本地端口

Connection Method 选项卡：
- Connection Name: 任意名称（如 "Local Tunnel"）
- Connection Method: 选择 "Standard (TCP/IP)"

Parameters 选项卡：
- Hostname: 127.0.0.1
- Port: 33306（与 SSH 命令中指定的本地端口一致）
- Username: 您的 MySQL 用户名
- Password: 您的 MySQL 密码

#### 方法三：使用 SSH 配置文件简化连接
1. 编辑 SSH 配置文件
```sh
# 编辑 SSH 配置文件: vim ~/.ssh/config
Host myserver
    HostName 8.159.138.235
    User ecs-user
    IdentityFile ~/.ssh/ecs-user.pem
    LocalForward 33306 localhost:3306
```

2. 使用简化的 SSH 命令建立隧道
```sh
ssh -N myserver
```

3. 配置 MySQL Workbench：与方法二相同，配置 MySQL Workbench 连接到本地 33306 端口。


## Nginx
- [Website](https://nginx.org/)
### 文档
- [nginx documentation](https://nginx.org/en/docs/)
- [Command-line parameters](https://nginx.org/en/docs/switches.html)
### 源码安装
- [doc](https://nginx.org/en/docs/configure.html)
- [doc](https://docs.nginx.com/nginx/admin-guide/installing-nginx/installing-nginx-open-source/#compiling-and-installing-from-source)

### 参考
- [Centos7.9安装Nginx](https://blog.csdn.net/weixin_41680651/article/details/140124650)
- [Nginx详细安装及配置](https://juejin.cn/post/6991818847179243557)
- [一份简单够用的 Nginx Location 配置讲解](https://juejin.cn/post/7048952689601806366)
- [nginx 这一篇就够了](https://juejin.cn/post/6844903944267759624)

### repo
- /usr/local/nginx/config/nginx.conf
```nginx
#user  nobody;
user  root;
worker_processes  1; #工作进程：数目。根据硬件调整，通常等于cpu数量或者2倍cpu数量。

#error_log  logs/error.log;
#error_log  logs/error.log  notice;
#error_log  logs/error.log  info;

#pid        logs/nginx.pid;


events {
    # 配置每个worker进程连接数上限，nginx支持的总连接数就等于worker_processes * worker_connections
    # 需要注意的是，worker_connections最大为 65536
    worker_connections  1024;
}


http {
    include       mime.types;
    default_type  application/octet-stream;

    #log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
    #                  '$status $body_bytes_sent "$http_referer" '
    #                  '"$http_user_agent" "$http_x_forwarded_for"';

    #access_log  logs/access.log  main;

    sendfile        on;
    tcp_nopush     on;

    #keepalive_timeout  0;
    keepalive_timeout  30;

    #gzip  on; #开启gzip压缩服务

    #autoindex on; #打开目录浏览

    #配置虚拟主机
    server {
        listen       80; #配置监听端口号
        server_name  localhost; #配置访问域名，域名可以有多个，用空格隔开

        #charset koi8-r;

        #access_log  logs/host.access.log  main;

        location / {
            root   html;
            index  index.html index.htm;
        }

        #error_page  404              /404.html;

        # redirect server error pages to the static page /50x.html
        #
        error_page   500 502 503 504  /50x.html;
        location = /50x.html {
            root   html;
        }

        location /blog {
            root /data/www/;
            index index.html;
        }

        #location 的参数表示匹配的 URI
	      location /study {
            # location 中的 root 参数表示：
            # 1. 若参数前不加 / 则表示 nginx的安装路径，例如：默认指定为html，即表示为nginx安装主目录下的html目录
            # 2. 若参数前加 / 则表示 Linux 中的根路径(/)路径
            root  /data/www;
            index index.html index.htm;
            # fix: vuepress2
            try_files $uri $uri/ $uri.html /index.html?$query_string;
            #proxy_set_header Host $http_host; # host: 端口
            #proxy_set_header X-Real_IP $remote_addr; # 客户端的 IP 地址
            #proxy_set_header REMOTE-HOST $remote_addr;
            #proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for; # HTTP 的请求端真实的 IP
        }

        location /react-blog-admin {
            root html;
            index index.html;
            # fix: react-router 刷新 404
            try_files $uri $uri/ /react-blog-admin/index.html;
        }

        #location /react-blog-admin/api {
        #	rewrite ^/react-blog-admin/(api/.*) http://$host:5000/$1 permanent;
        #}

        location /react-blog-admin/api/ {
            # 将原请求的 http 链接 header 头中的 Host 信息放到转发请求中
            proxy_set_header Host $http_host;
            proxy_set_header X-Real-Ip $remote_addr;
            proxy_set_header REMOTE-HOST $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header Content-Length $http_content_length;
            proxy_set_header Content-Type $http_content_type;
            #proxy_pass http://101.132.125.209:5000/api/;
            proxy_pass http://localhost:5000/api/; # nodejs_koa_blog
        }

        location /nginxconfig {
            root /data/www;
            index index.html;
        }

        # proxy the PHP scripts to Apache listening on 127.0.0.1:80
        #
        #location ~ \.php$ {
        #    proxy_pass   http://127.0.0.1;
        #}

        # pass the PHP scripts to FastCGI server listening on 127.0.0.1:9000
        #
        #location ~ \.php$ {
        #    root           html;
        #    fastcgi_pass   127.0.0.1:9000;
        #    fastcgi_index  index.php;
        #    fastcgi_param  SCRIPT_FILENAME  /scripts$fastcgi_script_name;
        #    include        fastcgi_params;
        #}

        # deny access to .htaccess files, if Apache's document root
        # concurs with nginx's one
        #
        #location ~ /\.ht {
        #    deny  all;
        #}
    }

    #server {
    #    listen 8080;
    #    server_name www.myweb.com;
    #    location / {
    #        proxy_pass https://www.baidu.com;
    #    }
    #}

    # another virtual host using mix of IP-, name-, and port-based configuration
    #
    #server {
    #    listen       8000;
    #    listen       somename:8080;
    #    server_name  somename  alias  another.alias;

    #    location / {
    #        root   html;
    #        index  index.html index.htm;
    #    }
    #}


    # HTTPS server
    #
    #server {
    #    listen       443 ssl;
    #    server_name  localhost;

    #    ssl_certificate      cert.pem; #证书位置
    #    ssl_certificate_key  cert.key; #私钥位置

    #    ssl_session_cache    shared:SSL:1m;
    #    ssl_session_timeout  5m;

    #    ssl_ciphers  HIGH:!aNULL:!MD5; #密码加密方式
    #    ssl_prefer_server_ciphers  on;

    #    location / {
    #        root   html;
    #        index  index.html index.htm;
    #    }
    #}

}
```
#### nodejs-koa-blog
- [/data/www/repo/nodejs-koa-blog](https://github.com/lfb/nodejs-koa-blog)
- [/data/www/repo/react-blog-admin](https://github.com/lfb/react-blog-admin)
  - .env
  ```
  REACT_APP_API_URL=http://101.132.125.209/react-blog-admin/api
  ```
  - package.json
  ```json
  {
    "name": "react-blog-admin",
    "version": "0.1.0",
    "private": true,
    "homepage": "/react-blog-admin",
    ...
  }
  ```
  - src/layouts/AuthenticatedApp/index.jsx
  ```jsx
  <Layout>
    <Router basename='/react-blog-admin'>
      <Sidebar collapsed={collapsed} />
  ```
  - deploy.sh
  ```sh
  npm run build
  rm -rf /usr/local/nginx/html/react-blog-admin
  mkdir /usr/local/nginx/html/react-blog-admin
  cp -r ./build/* /usr/local/nginx/html/react-blog-admin/
  ```
- [/data/www/repo/nuxtjs-blog-web](https://github.com/lfb/nuxtjs-blog-web.git)
  - .env.production
  ```
  # just a flag
  NUXT_APP_ENV = 'production'

  # base api
  # BASE_URL = 'https://api.boblog.com/api/v1'
  BASE_URL = 'http://101.132.125.209/react-blog-admin/api/v1'
  BOBLOG_TOKEN = 'BOBLOG_TOKEN'
  ```
  - nuxt.config.js
  ```
  {
    ...
    // Build Configuration: https://go.nuxtjs.dev/config-build
    build: {
      transpile: [/^element-ui/],
    },
    router: {
      mode: 'history',
      base: '/nuxtjs-blog-web',
    }
  }
  ```

## Clash
### download
- [mbsurf.xyz linux](https://mbsurf.notion.site/Linux-83fc02864b784cca94537d775e4ddbeb)
- ~~[clash_for_windows_pkg](https://github.com/Fndroid/clash_for_windows_pkg)~~
  - [mihomo](https://github.com/MetaCubeX/mihomo/releases/download/v1.18.6/mihomo-linux-amd64-v1.18.6.gz) [在centos安装clashMeta](https://www.meaqua.fun/2022/06/25/clash-install/)
- ~~[/data/www/clash-dashboard](https://github.com/Dreamacro/clash-dashboard)~~
  - [Yet Another Clash Dashboard](https://github.com/haishanh/yacd/archive/gh-pages.zip)
- /root/.config/clash/config.yaml
  ```yaml
  # HTTP 代理端口
  port: 7890

  # SOCKS5 代理端口
  socks-port: 7891

  # Linux 和 macOS 的 redir 代理端口
  redir-port: 7892

  # HTTP+SOCKS5 代理端口
  mixed-port: 7893

  # 允许局域网的连接
  allow-lan: true

  # 规则模式：Rule（规则） / Global（全局代理）/ Direct（全局直连）
  mode: Rule

  # 设置日志输出级别 (默认级别：silent，即不输出任何内容，以避免因日志内容过大而导致程序内存溢出>
  ）。
  # 5 个级别：silent / info / warning / error / debug。级别越高日志输出量越大，越倾向于调试，若需要请自行开启。
  log-level: error
  # Clash 的 RESTful API
  # external-controller: '0.0.0.0:9090'
  external-controller: '127.0.0.1:9090'

  # RESTful API 的口令，请求头 Authorization: 'Bearer 123456'
  secret: '123456'

  # 您可以将静态网页资源（如 clash-dashboard）放置在一个目录中，clash 将会服务于 `RESTful API/ui`
  # 参数应填写配置目录的相对路径或绝对路径。
  # external-ui: /data/www/clash-dashboard
  external-ui: /data/yacd-dashboard
  ```
### 后台启动
Linux 系统使用 systemd 作为启动服务器管理机制，首先把 Clash 可执行文件拷贝到 /usr/local/bin 目录，相关配置拷贝到 /etc/clash 目录。
```sh
sudo mkdir /etc/clash
sudo cp clash /usr/local/bin
sudo cp config.yaml /etc/clash/
sudo cp Country.mmdb /etc/clash/
```

创建 systemd 服务配置文件 `sudo vim /etc/systemd/system/clash.service`：
  ```
  [Unit]
  Description=Clash daemon, A rule-based proxy in Go.
  After=network.target

  [Service]
  Type=simple
  Restart=always
  ExecStart=/usr/local/bin/clash -d /etc/clash/
  # ExecStart=/usr/local/bin/clash -d /root/.config/clash/
  Restart=on-failure

  [Install]
  WantedBy=multi-user.target
  ```

  ```sh
  # 重载 systemctl daemon
  systemctl daemon-reload

  # 开机自启动
  systemctl enable clash

  # 启动
  systemctl start clash

  # 重启 clash 服务
  systemctl restart clash
  ```

- /root/.bashrc
  ```sh
  # 利用 Export 命令使用代理
  export https_proxy=http://127.0.0.1:7890 http_proxy=http://127.0.0.1:7890 all_proxy=socks5://127.0.0.1:7890

  # 取消系统代理
  unset http_proxy https_proxy all_proxy

  # 对于某些ip或域名可以设置不走代理，如
  export no_proxy=127.0.0.1,.devops.com,localhost,local,.local,172.28.0.0/16

  # 查看代理
  env | grep -i proxy
  
  alias proxyon="export http_proxy=http://127.0.0.1:7893;export https_proxy=http://127.0.0.1:7893;"
  alias proxyoff="export http_proxy='';export https_proxy='';"
  ```
- 外部控制：外部控制端口为 9090，因此也可以访问 `http://clash.razord.top/`，输入 IP 地址（需本机可以访问的 IP）以及端口号 9090，来进入 Clash Dashboard 进行节点的选择。
  [Clash RESTful API](https://clash.gitbook.io/doc)
- 查看运行日志:
  ```sh
  journalctl -u mihomo -o cat -e
  # 或者
  journalctl -u mihomo -o cat -f
  # 或者
  journalctl -xe
  ```

参考链接：
- [在 Linux 中使用 Clash](https://blog.iswiftai.com/posts/clash-linux/)
- [Linux 下使用 Clash 科学上网](https://little-star.love/posts/f2114751/)

## docker
### 安装
- [Install Docker Engine on CentOS](https://docs.docker.com/engine/install/centos/)
### 代理
- [Configure Docker to use a proxy server](https://docs.docker.com/network/proxy/)
  - [Configure the daemon to use a proxy](https://docs.docker.com/config/daemon/proxy/)
### 国内镜像
- [CentOS7-Docker 配置国内镜像源](https://www.cnblogs.com/reasonzzy/p/11127359.html)
  - [阿里云镜像加速器](https://cr.console.aliyun.com/cn-shanghai/instances/mirrors)

## firewalld
firewall 的配置文件是以 xml 的格式存储在 `/usr/lib/firewalld/` 和 `/etc/firewalld/` 目录中。

firewalld 的字符界面管理工具是 `firewall-cmd`

```sh
# 查看状态
firewall-cmd --state
systemctl status firewalld

# 启动
systemctl start firewalld

# 重启
systemctl restart firewalld

# 停止
systemctl stop firewalld

# 查看是否开机启动
systemctl is-enabled firewalld

# 开启开机自启动
systemctl enable firewalld

# 关闭开机自启动
systemctl disable firewalld
```
### 配置防火墙
- 方法一：直接修改配置文件 /etc/firewalld/zones/public.xml
- 方法二：使用 firewall 命令
```sh
# 查看防火墙所有信息
firewall-cmd --list-all

# 查看所有打开的端口
firewall-cmd --zone=public --list-ports

# 查看 3306 端口是否对外开放
firewall-cmd --zone=public --query-port=3306/tcp

# 例如：对外开放/停止3306端口，供外部的计算机访问。
# 该命令方式添加的端口，可在 /etc/firewalld/zones 中的对应配置文件中得到体现
firewall-cmd --permanent --zone=public --add-port=3306/tcp
firewall-cmd --permanent --zone=public --remove-port=3306/tcp

# 修改配置后需要重启防火墙
firewall-cmd --reload

# 重启防火墙
systemctl restart firewalld
```

## java
[java/technologies](https://www.oracle.com/java/technologies/)

[JDK Development Kit 17.0.12 downloads](https://www.oracle.com/cn/java/technologies/downloads/#java17)
  - [x64 Compressed Archive](https://download.oracle.com/java/17/latest/jdk-17_linux-x64_bin.tar.gz)

```sh
# centos7.9 安装 java17

# 下载jdk
# 330730263@qq.com !1qaz@2WSX
wget https://download.oracle.com/java/17/latest/jdk-17_linux-x64_bin.tar.gz

# 解压到安装目录
tar -zxvf jdk-17_linux-x64_bin.tar.gz -C /usr/local/java

# 配置环境变量
vim /etc/profile
export JAVA_HOME=/usr/local/java/jdk-17.0.16
export JRE_HOME=${JAVA_HOME}/jre
export CLASSPATH=.:${JAVA_HOME}/lib:${JRE_HOME}/lib
export PATH=${JAVA_HOME}/bin:$PATH
source /etc/profile

# 查看java版本
java -version
```

## redis
```sh
sudo -i
cd /root/
wget https://github.com/redis/redis/archive/refs/tags/8.2.1.tar.gz
tar xzvf redis-8.2.1.tar.gz
cd redis-8.2.1
# 进行主编译
make
# 使用 PREFIX 参数指定安装目录
make PREFIX=/usr/local/redis install

# 创建 Redis 用户和组（可选但推荐）：为 Redis 服务创建一个专用的系统用户，降低安全风险。
# sudo groupadd redis
# sudo useradd -r -g redis -s /bin/false redis

# 创建配置文件、数据目录和日志目录
# sudo mkdir -p /etc/redis /var/lib/redis /var/log/redis

# 调整目录权限：将数据目录和日志目录的所有权交给 Redis 用户
# sudo chown -R redis:redis /var/lib/redis /var/log/redis
# sudo chmod 755 /var/lib/redis /var/log/redis

# 从 Redis 源码目录复制配置文件模板
cp /root/redis-7.2.0/redis.conf /etc/redis/
# 修改配置文件
vim /etc/redis/redis.conf
bind 127.0.0.1
port 6379
daemonize yes
protected-mode no
logfile /var/log/redis.log
pidfile /var/run/redis.pid
loglevel notice
save 900 1
save 300 10
stop-writes-on-bgsave-error yes
appendonly yes
appendfsync always
auto-aof-rewrite-percentage 100
auto-aof-rewrite-min-size 64M
maxmemory 2G
maxmemory-policy volatile-lru
maxclients 10000
maxmemory-samples 5
slaveof 192.168.1.1 6379
slave-serve-stale-data yes
slave-read-only yes
slave-priority 100
slave-announce-port 6379
slave-lazy-flush yes
slave-repl-timeout 60
slave-recovery-timeout 60
slave-announce-ip 192.168.1.1
slave-ignore-maxmemory yes
slave-lazy-free-list-length 20

# 调整内核参数（可选但推荐）：防止 Redis 在低内存环境下启动失败，设置 vm.overcommit_memory=1
echo "vm.overcommit_memory=1" | sudo tee -a /etc/sysctl.conf
sudo sysctl -p

# 启动
/usr/local/redis/bin/redis-server /etc/redis/redis.conf

# 系统服务集成与管理，配置 systemd 服务单元：创建服务文件 sudo vim /etc/systemd/system/redis.service
[Unit]
Description=Redis In-Memory Data Store
After=network.target

[Service]
# User 和 Group 设置为之前创建的 redis
User=redis
Group=redis
# ExecStart 命令中使用了 --daemonize no，这是因为使用 systemd 管理服务时，不应让 Redis 自身进入守护进程模式，而是由 systemd 来监控前台进程。
# --supervised systemd 选项可以让 Redis 以更好的方式与 systemd 集成。
ExecStart=/usr/local/redis/bin/redis-server /etc/redis/redis.conf --daemonize no --supervised systemd
ExecStop=/usr/local/redis/bin/redis-cli shutdown
Restart=always
RestartSec=3
Type=notify

[Install]
WantedBy=multi-user.target
```

## ffmpeg
[FFmpeg](https://ffmpeg.org/)

[How to install FFMPEG on Linux](https://json2video.com/how-to/ffmpeg-course/install-ffmpeg-linux.html)

[Compile FFmpeg on CentOS](https://trac.ffmpeg.org/wiki/CompilationGuide/Centos)

[CentOS 7.6中使用ffmpeg将视频由mp4格式转为m3u8格式](https://blog.csdn.net/just4you/article/details/109251722)

```sh
# 以下操作均在 /usr/local/src 目录进行
# 1. 下载&安装nasm：用于编译x264
wget https://www.nasm.us/pub/nasm/releasebuilds/2.16.03/nasm-2.16.03.tar.gz
# 解压
tar xzvf nasm-2.16.03.tar.gz
cd nasm-2.16.03
# 配置
./configure
# 编译&&安装
make && make install

# 2. 下载&安装x264：用于视频编码
git clone https://code.videolan.org/videolan/x264.git
cd x264
# 配置
./configure --prefix=/usr/x264/ --includedir=/usr/local/include --libdir=/usr/local/lib --enable-shared
# 编译&&安装
make && make install

# 3. 下载&安装ffmpeg
# wget http://www.ffmpeg.org/releases/ffmpeg-4.3.1.tar.xz
wget https://ffmpeg.org/releases/ffmpeg-7.1.tar.xz
# 解压
tar xvJf ffmpeg-7.1.tar.xz
cd ffmpeg-7.1
#配置
./configure --prefix=/usr/local/ffmpeg --enable-gpl --enable-shared  --enable-libx264
# 编译&&安装
make && make install
```
