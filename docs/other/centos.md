# CentOS

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
- 动态库：Windows系统下是.dll文件，Linux系统下是.so文件
- 静态库：Windows和Linux系统下都是.lib文件
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

## CentOS 7 安装 MySQL
- [How to Install MySQL on CentOS 7](https://www.linode.com/docs/databases/mysql/how-to-install-mysql-on-centos-7/)
- [How To Install MySQL on CentOS 7](https://www.digitalocean.com/community/tutorials/how-to-install-mysql-on-centos-7)

## Nginx
- [Website](https://nginx.org/)
### 文档
- [nginx documentation](https://nginx.org/en/docs/)
- [Command-line parameters](https://nginx.org/en/docs/switches.html)
### 源码安装
- [doc](https://nginx.org/en/docs/configure.html)
- [doc](https://docs.nginx.com/nginx/admin-guide/installing-nginx/installing-nginx-open-source/#compiling-and-installing-from-source)

### 参考
- [Nginx详细安装及配置](https://juejin.cn/post/6991818847179243557)

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
- [mbsurf.xyz linux](https://mbsurf.notion.site/Linux-83fc02864b784cca94537d775e4ddbeb)
- [clash_for_windows_pkg](https://github.com/Fndroid/clash_for_windows_pkg)
- [/data/www/clash-dashboard](https://github.com/Dreamacro/clash-dashboard)
- /home/root/.config/clash/config.yaml
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
  external-controller: '0.0.0.0:9090'

  # RESTful API 的口令
  secret: '123456'

  # 您可以将静态网页资源（如 clash-dashboard）放置在一个目录中，clash 将会服务于 `RESTful API/ui`
  # 参数应填写配置目录的相对路径或绝对路径。
  external-ui: /data/www/clash-dashboard
  ```
- /etc/systemd/system/clash.service
  ```
  [Unit]
  Description=Clash Daemon

  [Service]
  ExecStart=/usr/local/bin/clash -d /home/root/.config/clash/

  [Install]
  WantedBy=multi-user.target
  ```
- /root/.bashrc
  ```sh
  alias proxyon="export http_proxy=http://127.0.0.1:7893;export https_proxy=http://127.0.0.1:7893;"
  alias proxyoff="export http_proxy='';export https_proxy='';"
  ```
