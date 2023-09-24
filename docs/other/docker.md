# Docker

> [Docker](https://www.docker.com/)<br>
> [Docker Hub](https://hub.docker.com/)<br>
> [Docker Hub nginx](https://hub.docker.com/_/nginx)<br>
> [Docker Hub node](https://hub.docker.com/_/node)

## command
- `docker --help`
- `docker images`: 查看镜像列表
  ```sh
  docker images

  docker images --help
  ```
- `docker ps`: 查看容器列表
  ```sh
  # 查看容器列表，默认是运行中的
  docker ps

  # 查看全部的容器列表
  docker ps -a

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

  # -p 是端口映射
  # -v 是指定数据卷挂载目录
  # -e 是指定环境变量
  # -d 是后台运行
  ```
- `docker start`: 启动一个已经停止的容器
- `docker stop`: 停止一个容器
- `docker rm`: 删除一个容器
- `docker inspect`: 查看容器的详情
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
- `docker volume`: 管理数据卷

## Dockerfile
```sh
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
```
FROM node:20.7.0

WORKDIR /app

# COPY package.json . 和后面的 COPY . . 分两次 COPY 的目的：利用分层 docker layer 的缓存机制
COPY package.json .

RUN npm config set registry https://registry.npmmirror.com/

RUN npm install

COPY . .

RUN npm run build

EXPOSE 3000

CMD [ "node", "./dist/main.js" ]
```
:::tip
基于 node 20.7.0 的镜像。

指定当前目录为容器内的 /app。

把 package.json 复制到容器里，设置淘宝的 npm registry，执行 npm install。

之后把其余的文件复制过去，执行 npm run build。

指定暴露的端口为 3000，容器跑起来以后执行 node ./dist/main.js 命令。
:::

1. 优化：运行的时候只需要 dist 目录，需要用到 dockerfile 的多阶段构建的语法，第一次构建出 dist 目录，第二次再构建出跑 dist/main.js 的镜像。

```
# build stage
FROM node:20.7.0 as build-stage

WORKDIR /app

COPY package.json .

RUN npm config set registry https://registry.npmmirror.com/

RUN npm install

COPY . .

RUN npm run build

# production stage
FROM node:20.7.0 as production-stage

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

之后再通过 FROM 继承 node 镜像创建一个新镜像。

通过 COPY --from=build-stage 从那个镜像内复制 /app/dist 的文件到当前镜像的 /app 下。

还要把 package.json 也复制过来，然后切到 /app 目录执行 npm install --production 只安装 dependencies 依赖

这个生产阶段的镜像就指定容器跑起来执行 node /app/main.js 就好了。
:::

:::warning
在多阶段构建中可以有多个 FROM 指令，每个 FROM 指令都会开始一个新的构建阶段（每个阶段是独立的），并且可以给它一个名字，可以在后续的指令中引用这个阶段。

Docker 多阶段构建的最终镜像就是最后一个阶段生成的镜像。在每个阶段都可以运行命令、安装软件、复制文件等等，但只有在最后一个阶段的操作和产生的文件才会包含在最终的 Docker 镜像中。这种设计可以帮助构建更小、更精简的镜像，因为你可以在前面的阶段安装和使用构建工具，然后在最后一个阶段（前面阶段的镜像会被舍弃）只包含运行应用所需要的最小集合的文件和依赖。
:::

:::warning
```
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

2. 优化：之前用的基础的 linux 镜像比较大，可以换成 alpine 的，这是一个 linux 发行版，主打的就是一个体积小
```
# build stage
#
FROM node:20.7.0-alpine3.18 as build-stage

WORKDIR /app

COPY package.json .

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