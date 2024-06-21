# Docker

> [Docker](https://www.docker.com/)<br>
> [Docker Hub](https://hub.docker.com/)<br>
> [Docker Hub nginx](https://hub.docker.com/_/nginx)<br>
> [Docker Hub node](https://hub.docker.com/_/node)

## command
- `docker --help`
- `docker info`
- `docker images`: 查看镜像列表
  ```sh
  docker images

  docker images --help
  ```
- `docker ps`: 查看容器列表
  ```sh
  # 查看正在运行的容器
  docker ps
  # 查看停止的容器
  docker ps -f status=exited
  # 查看全部的容器
  docker ps -a
  # 查看最后一次运行的容器
  docker ps -l

  docker ps --help
  ```
- `docker run`: 用来跑镜像，执行后会返回一个容器的 hash
  ```sh
  # 查看帮助文档
  docker run --help

  # -v 是指定挂载的数据卷
  # :ro 代表 readonly，也就是容器内这个目录只读，:rw 表示容器内可以读写这个目录
  docker run --name some-nginx -v /some/content:/usr/share/nginx/html:ro -d nginx
  ```

  数据卷 volume 是把宿主机某个目录挂到容器内。

  因为容器是镜像跑起来的，下次再用这个镜像跑的还是同样的容器，那你在容器内保存的数据就会消失。

  所以我们都是把某个宿主机目录，挂载到容器内的某个保存数据的目录，这样数据是保存在宿主机的，下次再用镜像跑一个新容器，只要把这个目录挂载上去就行。

  ```sh
  docker run --name nginx-test1 -p 80:80 -v /tmp/aaa:/usr/share/nginx/html -e KEY1=VALUE1 -d nginx:latest

  # --name 是指定容器名
  # -p 是端口映射
  # -v 是指定数据卷挂载目录
  # -e 是指定环境变量
  # -d 是后台运行
  ```
- `docker rmi 镜像ID或名称`: 删除镜像
- `docker start 容器ID或名称`: 启动已经停止的容器
- `docker restart 容器ID或名称`: 重启容器
- `docker stop 容器ID或名称`: 停止容器
- `docker rm 容器ID或名称`: 删除容器
- `docker inspect 容器ID或名称`: 查看容器的详情
  ```sh
  # 8c300a54bcca 为容器ID，可通过 docker ps -a 获取
  docker inspect 8c300a54bcca
  ```
- `docker logs`: 查看容器日志
  ```sh
  docker logs 8c300a54bcca
  ```
- `docker exec`: 在容器的 terminal 里执行命令
  ```sh
  # -i 是 terminal 交互的方式运行
  # -t 是 tty 终端类型
  # 然后指定容器 id 和 shell 类型，就可以交互的方式在容器内执行命令
  docker exec -it 8c300a54bcca /bin/bash

  # 在容器内执行命令时，输入 exit 退出
  exit
  ```
  ```sh
  # 查看容器内部的目录结构
  # 1. 容器状态是 UP
  docker exec -it 容器ID或名称 /bin/bash
  ls -l

  # 2. 容器状态是 Exited：将容器内的目录拷贝到本地
  docker cp containerID:container_path host_path
  ```
- `docker volume`: 管理数据卷
- `docker cp`: 在容器和本地文件系统之间拷贝文件或目录
  ```sh
  docker cp --help

  # 查看容器
  docker ps
  # 把nginx容器静态资源目录拷贝到本地
  docker cp nginx-container:/usr/share/nginx/html ~/Desktop/nginx-html
  # 把本地目录拷贝到nginx容器
  docker cp ~/Desktop/nginx-html nginx-container:/usr/share/nginx/html-xxx

  docker cp nginx-container:/etc/nginx/nginx.conf ~/Desktop/nginx-conf
  docker cp nginx-container:/etc/nginx/conf.d ~/Desktop/nginx-conf
  docker cp ~/Desktop/nginx-conf/test.conf nginx-container:/etc/nginx/conf.d
  ```

## Dockerfile
```Dockerfile
# FROM: 基于一个基础镜像来修改
FROM node:latest

# WORKDIR: 指定当前工作目录
WORKDIR /app

# COPY: 把容器外的内容复制到容器内（把 Dockerfile 同级目录下的内容复制到容器内，这里的 . 也就是 /app 目录）
COPY . .

# RUN: 在容器内执行命令
RUN npm config set registry https://registry.npmmirror.com/

RUN npm install -g http-server

# EXPOSE: 指定要暴露的端口，声明当前容器要访问的网络端口
EXPOSE 8080

# 把 /app 目录设置为挂载点
# 作用：保证容器内某个目录下的数据一定会被持久化，在没挂载数据卷的时候数据也不会丢失。
VOLUME /app

# CMD: 容器启动的时候执行的命令
CMD ["http-server", "-p", "8080"]
```

```sh
ls -al /Users/squirrel/Desktop/test/docker-demo
drwxr-xr-x   5 squirrel  staff   160  9 24 21:56 .
drwxr-xr-x  41 squirrel  staff  1312  9 24 20:38 ..
-rw-r--r--   1 squirrel  staff    14  9 24 21:56 .dockerignore
-rw-r--r--   1 squirrel  staff   194  9 24 18:30 Dockerfile
-rw-r--r--   1 squirrel  staff   219  9 24 18:58 index.html

# 通过 `docker build` 可以根据 dockerfile 来构建镜像
# aaa 是镜像名，bbb 是镜像的标签
docker build -t aaa:bbb .

# 构建完之后再 run 一下这个新镜像
docker run --name aaa_bbb_container -p 8888:8080 -v /Users/squirrel/Desktop/test/docker-demo:/app -d aaa:bbb

# 打开浏览器，输入 http://localhost:8888 即可看到 index.html 内容
```

```sh
# 在 dockerfile 里指定 VOLUME 之后，如果在 docker run 的时候没有带 -v，那么会放在一个临时的目录里（比如 /var/lib/docker/volumes/3a8ffe15356f2321b2472232a6ae3495cf85449ec9528b717f6d31fce9b7ca9a/_data），这样就算删了容器，数据也可以在这里找回。
# mysql 的 dockerfile 里是必须声明 volume 的，这样就算没通过 -v 指定数据卷，将来也可以找回数据。
docker run --name aaa_bbb_container2 -p 8889:8080 -d aaa:bbb
```
### .dockerignore
```
# 忽略所有 md 结尾的文件
*.md
# 不忽略 README.md
!README.md
# 忽略 node_modules 下的所有文件
node_modules/
# 忽略 a.txt、b.txt、c.txt 这三个文件
[a-c].txt
.git/
# .DS_Store 是 mac 用于指定目录的图标、背景、字体大小的配置文件
.DS_Store
.vscode/
.dockerignore
# eslint、prettier 的配置文件在构建镜像时用不到
.eslintignore
.eslintrc
.prettierrc
.prettierignore
```

### multi-stage build
nestjs Dockerfile:
```Dockerfile
FROM node:20.7.0

WORKDIR /app

COPY . .

RUN npm config set registry https://registry.npmmirror.com/

RUN npm install

RUN npm run build

EXPOSE 3000

CMD [ "node", "./dist/main.js" ]
```
:::tip
基于 node 20.7.0 的镜像。

指定当前目录为容器内的 /app。

把文件复制到容器里，设置淘宝的 npm registry，执行 npm install 和 npm run build。

指定暴露的端口为 3000，容器跑起来以后执行 node ./dist/main.js 命令。
:::
优化：
  - 之前用的基础的 linux 镜像比较大，可以换成 alpine 的，这是一个 linux 发行版，它裁剪了很多不必要的 linux 功能，使得镜像体积大幅减小。
  - 实际上运行的时候只需要 dist 目录下的文件和运行时依赖，源码和构建的依赖是不需要的，但是也保存在了镜像里。这时需要用到 dockerfile 的多阶段构建的语法，第一次构建出 dist 目录，第二次再构建出跑 dist/main.js 的镜像。

```Dockerfile
# build stage
FROM node:20.7.0-alpine3.18 as build-stage

WORKDIR /app

COPY package.json .
COPY *.lock .

RUN npm config set registry https://registry.npmmirror.com/

RUN npm install

COPY . .

RUN npm run build

# production stage
FROM node:20.7.0-alpine3.18 as production-stage

COPY --from=build-stage /app/dist /app
COPY --from=build-stage /app/package.json /app/package.json

WORKDIR /app

RUN npm install --production

EXPOSE 3000

CMD ["node", "/app/main.js"]
```

:::tip
通过 FROM 继承镜像的时候，给当前镜像指定一个名字，比如 build-stage。

然后第一个镜像执行 build。

之后再通过 FROM 继承 node 镜像创建一个新镜像，在 FROM 后面添加一个 as 来指定当前构建阶段的名字。

通过 COPY --from=build-stage 从那个镜像内复制 /app/dist 的文件到当前镜像的 /app 下。

还要把 package.json 也复制过来，然后切到 /app 目录执行 npm install --production 只安装 dependencies 依赖

这个生产阶段的镜像就指定容器跑起来执行 node /app/main.js 就好了。
:::

:::warning
在多阶段构建中可以有多个 FROM 指令，每个 FROM 指令都会开始一个新的构建阶段（每个阶段是独立的），并且可以给它一个名字，可以在后续的指令中引用这个阶段。

Docker 多阶段构建的最终镜像就是最后一个阶段生成的镜像。在每个阶段都可以运行命令、安装软件、复制文件等等，但只有在最后一个阶段的操作和产生的文件才会包含在最终的 Docker 镜像中。这种设计可以帮助构建更小、更精简的镜像，因为你可以在前面的阶段安装和使用构建工具，然后在最后一个阶段（前面阶段的镜像会被舍弃）只包含运行应用所需要的最小集合的文件和依赖。
:::

:::warning
### 问题一：为什么不是直接全部复制进去？而是先复制 package.json 安装依赖之后再复制其他文件？
docker 是分层存储的，dockerfile 里的每一行指令是一层，会做缓存。

每次 docker build 的时候，只会从变化的层开始重新构建，没变的层会直接复用。也就说如果 package.json 没变，那么就不会执行 npm install，直接复用之前的。

如果一开始就把所有文件复制进去，那么不管 package.json 变没变，任何一个文件变了都会重新 npm install，这样没法充分利用缓存，性能不好。

### 问题二：为什么不直接删除不需要的文件？
```Dockerfile
FROM node:20
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build
RUN rm -rf ./src
CMD ["node", "dist/main"]
```

在 Docker 构建过程中，虽然可以使用 rm 命令来删除不需要的文件，但这并不意味着这些文件不再占用空间。Docker 镜像是由多层文件系统组成的，每一条 Dockerfile 指令都会创建一个新的层。当你在一个层中添加了文件，然后在下一个层中删除这些文件，这些文件仍然会在原来的层中存在，因此它们仍然会占用空间。
:::

### ARG
```js
// test.js
console.log(process.env.aaa);
console.log(process.env.bbb);

// export aaa=1 bbb=2
// node ./test.js
```
```Dockerfile
# arg.Dockerfile
FROM node:18-alpine3.14

# 使用 ARG 声明构建参数，使用 ${xxx} 来取
ARG aaa
ARG bbb

WORKDIR /app

COPY ./test.js .

# 用 ENV 声明环境变量（ARG 是构建时的参数，ENV 时运行时的变量）
# dockerfile 内换行使用 \
ENV aaa=${aaa} \
    bbb=${bbb}

CMD ["node", "/app/test.js"]
```
```sh
# 构建的时候通过 --build-arg xxx=yyy 传入 ARG 参数的值
docker build --build-arg aaa=3 --build-arg bbb=4 -t arg-test:first -f arg.Dockerfile .
# 跑起来后可以看到容器内拿到的环境变量就是 ENV 设置的
docker run --name arg-test_container arg-test:first
```

### CMD vs ENTRYPOINT
CMD 和 ENTRYPOINT 都可以用来指定容器跑起来之后运行的命令
> 区别：用 CMD 时启动命令是可以重写的，而用 ENTRYPOINT 不会
```Dockerfile
# cmd.Dockerfile
FROM node:18.18.0-alpine3.18

CMD ["echo", "Hello", "World"]

# docker build -t cmd-test -f cmd.Dockerfile .
# docker run --name cmd-test_container1 cmd-test # 输出: Hello World
# docker run --name cmd-test_container2 cmd-test echo "cicada" # 输出: cicada
# docker run --name cmd-test_container3 cmd-test node -v # （可以换成任何命令）输出: 18.18.0
```
```Dockerfile
# entrypoint.Dockerfile
FROM node:18.18.0-alpine3.18

ENTRYPOINT ["echo", "Hello", "World"]

# docker build -t entrypoint-test -f entrypoint.Dockerfile .
# docker run --name entrypoint-test_container1 entrypoint-test # 输出: Hello World
# docker run --name entrypoint-test_container2 entrypoint-test echo "cicada" # 输出: Hello World echo cicada
```

> ENTRYPOINT 和 CMD 结合使用：当没传参数的时候，执行的是 ENTRYPOINT + CMD 组合的命令，而传入参数的时候，只有 CMD 部分会被覆盖，这就起到了默认值的作用。
```Dockerfile
# entrypoint-cmd.Dockerfile
FROM node:18.18.0-alpine3.18

ENTRYPOINT ["echo", "Hello"]

CMD ["World"]

# docker build -t entrypoint-cmd-test -f entrypoint-cmd.Dockerfile .
# docker run --name entrypoint-cmd-test_container1 entrypoint-cmd-test # 输出: Hello World
# docker run --name entrypoint-cmd-test_container2 entrypoint-cmd-test docker # 输出: Hello docker
```

### COPY vs ADD
COPY 和 ADD 都可以把宿主机的文件复制到容器内
> 区别：对于 tar.gz 压缩文件的处理，ADD 是把 tar.gz 解压后的文件复制到容器内
```sh
mkdir test
touch test/1
touch test/2
tar -zcvf test.tar.gz ./test
```
```Dockerfile
# copy-add.Dockerfile
FROM node:18.18.0-alpine3.18

ADD ./test.tar.gz /a/

COPY ./test.tar.gz /b/

# docker build -t copy-add-test -f copy-add.Dockerfile .
# docker run -d --name copy-add-test_container copy-add-test
```

### network
涉及到多个 docker 容器（如 mysql redis）的通信，可以通过指定宿主机 ip 和端口的方式，因为 mysql、redis 的容器都映射到了宿主机的端口，所以 nest 的容器就可以通过宿主机来实现和其他容器的通信。

通过桥接网络的方式进行容器通信更为方便（宿主机 IP 可能会变）。

第1步：创建桥接网络
```sh
# 通过 docker network 创建桥接网络
docker network create common-network
```

第2步：启动代码的依赖容器（如 mysql redis）
```sh
# 跑容器的时候要指定 --network，不需要指定和宿主机的端口映射
docker run -d --network common-network --name mysql-network-container -v /Users/squirrel/docker/mysql:/var/lib/mysql -e MYSQL_ROOT_PASSWORD=cicada mysql

docker run -d --network common-network --name redis-network-container -v /Users/squirrel/docker/redis:/data redis
```

第3步：修改代码，将 host 改为容器名
```js
TypeOrmModule.forRoot({
  type: 'mysql',
  // host: 'localhost',
  // host: '192.168.2.7', // 通过 docker 容器跑起来时需要改成宿主机 IP
  host: 'mysql-network-container', // docker 桥接网络
  port: 3306,
  username: 'hello',
  password: 'world',
  database: 'test',
  entities: [User],
  synchronize: true,
  logging: true,
  poolSize: 10,
  connectorPackage: 'mysql2',
  extra: {
    authPlugin: 'sha256_password',
  },
})

{
  provide: 'REDIS_CLIENT',
  async useFactory() {
    const client = createClient({
      socket: {
        // host: 'localhost',
        // host: '192.168.2.7', // 通过 docker 容器跑起来时需要改成宿主机 IP
        host: 'redis-network-container', // docker 桥接网络
        port: 6379,
      },
    });
    await client.connect();
    return client;
  },
}
```

第4步：依据 Dockerfile 重新构建业务代码镜像并运行
```sh
# 构建镜像
docker build -t nestjs-demo-image .
# 跑容器时要指定和宿主机的端口映射，因为宿主机要访问这个端口
docker run -d --network common-network -p 3000:3000 --name nestjs-demo-container nestjs-demo-image
```

以上步骤比较麻烦需要按顺序启动各个容器，在 docker-compose.yml 中使用桥接网络的写法为：
```yaml
version: '3.8'
services:
  nest-app:
    build:
      context: ./
      dockerfile: ./Dockerfile
    depends_on:
      - mysql-network-container
      - redis-network-container
    ports:
      - '3000:3000'
    networks:
      - common-network
  mysql-network-container:
    image: mysql
    volumes:
      - /Users/squirrel/docker/mysql:/var/lib/mysql
    networks:
      - common-network
  redis-network-container:
    image: redis
    volumes:
      - /Users/squirrel/docker/redis:/data
    networks:
      - common-network
networks:
  common-network:
    driver: bridge
```

不指定 networks 也可以，因为 docker-compose 会创建一个默认的桥接网络
```yaml
version: '3.8'
services:
  nest-app:
    build:
      context: ./
      dockerfile: ./Dockerfile
    depends_on:
      - mysql-network-container
      - redis-network-container
    ports:
      - '3000:3000'
  mysql-network-container:
    image: mysql
    volumes:
      - /Users/squirrel/docker/mysql:/var/lib/mysql
  redis-network-container:
    image: redis
    volumes:
      - /Users/squirrel/docker/redis:/data
```

## pm2
```Dockerfile
# build-stage
FROM node:20.8.0-alpine3.18 as build-stage

WORKDIR /app

COPY package.json .

RUN npm config set registry https://registry.npmmirror.com/

RUN npm install

COPY . .

RUN npm run build

# production-stage
FROM node:20.8.0-alpine3.18 as production-stage

COPY --from=build-stage /app/dist /app
COPY --from=build-stage /app/package.json /app/package.json

WORKDIR /app

RUN npm install --production

RUN npm install --global pm2

EXPOSE 3000

# [前端搞部署-docker遇见pm2](https://juejin.cn/post/6976834360511037453)
# [pm2-runtime](https://stackoverflow.com/questions/53962776/whats-the-difference-between-pm2-and-pm2-runtime)
CMD ["pm2-runtime", "/app/main.js"]
```

## MySQL
```sh
docker run -d --name mysql-container -p 3306:3306 -v /Users/squirrel/docker/mysql:/var/lib/mysql -e MYSQL_ROOT_PASSWORD=cicada mysql

# 数据文件默认安装目录: /var/lib/mysql
# 配置文件默认位置: /etc/my.cnf 或 /etc/mysql/my.cnf

# 在 mysql 容器内执行命令
docker exec -it mysql-container /bin/bash

# fix: docker mysql 不能输入中文以及中文显示问题 https://www.jianshu.com/p/c352dee7de4e
# 查看当前容器支持的编码格式
locale -a
# 指定编码
docker exec -it mysql-container env LANG=C.utf8 /bin/bash
```

## Redis
```sh
docker run -d --name redis-container -p 6379:6379 -v /Users/squirrel/docker/redis:/data redis
```
```sh
# string
set key1 hello
set key2 world

keys "*"
get key1
get key2

# 自增1（当 key 不存在时先初始化为0再自增1，当 key 存在但无法转为数字时将报错）
incr num1
# 自减1（当 key 不存在时先初始化为0再自减1，当 key 存在但无法转为数字时将报错）
decr num2

# 自增5（当 key 不存在时先初始化为0再自增5，当 key 存在但无法转为数字时将报错）
incrby num3 5
# 自减5（当 key 不存在时先初始化为0再自减5，当 key 存在但无法转为数字时将报错）
decrby num4 5

# 在第一个 key 后面追加字符串（拼接字符串），返回值为结果字符串的长度
append key1 world
append num1 23

# list
lpush list1 1
lpush list1 2 3
rpush list1 4
rpush list1 5

lrange list1 0 -1 # 3 2 1 4 5

lpop list1 # 3
rpop list1 # 5

lrange list1 0 -1


# set: 无序并且元素不重复
sadd set1 1
sadd set1 1
sadd set1 2
sadd set1 2
sadd set1 3

smembers set1 # 1 2 3
scard set1 # 3

srem set1 1
srem set1 2 3

sismember set1 1


# sorted set: 排序、去重
zadd zset1 5 cicada
zadd zset1 4 squirrel
zadd zset1 3 hello
zadd zset1 6 world

zrange zset1 0 -1
zrange zset1 0 2 # 取排名前三

zincrby zset1 4 world

zrem zset1 hello

# hash: 类似 map
hset hash1 key1 val1
hset hash1 key2 val2
hset hash1 key3 val3

hget hash1 key1
hget hash1 key2
```

## Nginx
托管静态资源、反向代理动态资源
```sh
# 默认配置文件
/etc/nginx/nginx.conf

# 静态资源默认路径
/usr/share/nginx/html

nginx -h

# show version and exit
nginx -v

# show version and configure options then exit
nginx -V

# test configuration and exit
nginx -t

# 重新加载配置文件
nginx -s reload
```

location 匹配语法：
- `location /aaa` 是前缀匹配 /aaa 的路由
- `location = /bbb/` 是精确匹配 /bbb/ 的路由
- `location ~ /ccc.*.html` 是正则匹配。可以再加个 * 表示不区分大小写 `location ~* /ccc.*.html`
- `location ^~ /ddd` 是前缀匹配，但是优先级更高

这 4 种语法的优先级为：精确匹配`=` > 高优先级前缀匹配`^~` > 正则匹配`～ ~*` > 普通前缀匹配

```sh
upstream nest-server {
    # 一共有 4 种负载均衡策略：
    # 轮询：默认方式。
    # weight：在轮询基础上增加权重，也就是轮询到的几率不同。
    # ip_hash：按照 ip 的 hash 分配，保证每个访客的请求固定访问一个服务器，解决 session 问题。
    # fair：按照响应时间来分配，这个需要安装 nginx-upstream-fair 插件。

    # 负载均衡策略默认为轮询
    # server 192.168.15.62:3001;
    # server 192.168.15.62:3002;

    # 带权重的轮询
    # server 192.168.15.62:3001;
    # server 192.168.15.62:3002 weight=2;

    # 按照 ip 的 hash 分配
    ip_hash;
    server 192.168.15.62:3001;
    server 192.168.15.62:3002;
}

server {
    listen       80;
    listen  [::]:80;
    server_name  localhost;

    #access_log  /var/log/nginx/host.access.log  main;

    # location / {
    #    root   /usr/share/nginx/html;
    #    index  index.html index.htm;
    # }

    # 有等号时代表精确匹配，即只有完全相同的 url 才会匹配这个路由
    location = /111/ {
        default_type text/plain;
        return 200 "111 success";
    }

    # 无等号时代表前缀匹配，后面可以是任意路径
    location /222 {
        # alias /usr/share/nginx/html;
        default_type text/plain;
        # $uri 为当前路径
        return 200 $uri;
    }

    # 前面加上 ~ 后支持正则，区分大小写
    location ~ ^/333/bbb.*\.html$ {
        # alias /usr/share/nginx/html/b.html;
        default_type text/plain;
        return 200 $uri;
    }

    # 前面加上 ~* 后支持正则，不区分大小写
    location ~* ^/444/AAA.*\.html$ {
        default_type text/plain;
        return 200 $uri;
    }

    # 前面加上 ^~ 后可提高前缀匹配优先级
    location ^~ /444 {
        default_type text/plain;
        return 200 '444';
    }

    # root 和 alias 的区别为拼接路径时是否包含匹配条件
    location /520 {
        # 访问 /520/index.html 实际查找路径为 /usr/share/nginx/html/520/index.html
        root /usr/share/nginx/html;
    }
    location /521 {
        # 访问 /521/index.html 实际查找路径为 /usr/share/nginx/html/index.html
        alias /usr/share/nginx/html;
    }

    # 反向代理动态资源
    location ^~ /api {
        proxy_set_header name squirrel; # 修改请求、响应
        # proxy_pass http://192.168.15.62:3000;
        proxy_pass http://nest-server; # 负载均衡
    }

    #error_page  404              /404.html;

    # redirect server error pages to the static page /50x.html
    #
    error_page   500 502 503 504  /50x.html;
    location = /50x.html {
        root   /usr/share/nginx/html;
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
```

本地开发时将本地某个端口（如：80）代理到本地其他端口（如：3000）
```sh
# 第1步：修改本地 host
# sudo vim /etc/hosts
127.0.0.1       backend-api.alpha.squirrel.com

# 第2步：添加 nginx 配置
upstream squirrel-backend-api {
    # server 127.0.0.1:3000; # 不能使用 127.0.0.1 或 localhost，需要使用宿主机的IP
    # server 192.168.2.35:3000; # 宿主机IP可能会变，变化之后需要修改比较麻烦
    server host.docker.internal:3000; # 推荐写法 [参考](https://github.com/zhangyu921/blog/issues/8)
}

server {
    listen       80;
    server_name  backend-api.alpha.squirrel.com;

    location / {
        proxy_pass         http://squirrel-backend-api;
        proxy_set_header   Cookie $http_token;
        proxy_set_header   Host             $host;
        proxy_set_header   X-Real-IP        $remote_addr;
        proxy_set_header   X-Forwarded-For  $proxy_add_x_forwarded_for;
    }

    access_log  /tmp/access_squirrel-backend-api.log  main;
}
```
