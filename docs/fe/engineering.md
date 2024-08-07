# 工程化

## 免密登录
- 1. [生成秘钥对](https://help.github.com/en/github/authenticating-to-github/connecting-to-github-with-ssh)
  ```sh
  # -t 指定生成算法
  # -b 生成长度（默认为2048）
  # -C 在生成的key中添加标识
  # -f 指定生成的文件名（默认为id_rsa）
  # 注意：引号不能用单引号，必须是双引号
  ssh-keygen -t rsa -b 4096 -C "your_email@example.com" -f 指定文件名
  ```
  - 然后直接按连续两次回车
- 2. 上传配置公钥
  ```sh
  # 上传公钥到服务器对应账号的~路径下的.ssh/中
  ssh-copy-id -i 公钥文件名 用户名@服务器ip或域名
  ```
  - 配置公钥文件访问权限为**600**
- 3. 配置本地私钥
  - 把第一步生成的私钥移动到~下的.ssh/目录中
  - 配置私钥文件访问权限为**600**
- 4. 免密登录功能的本地配置文件
  - 修改~路径下的.ssh目录中的config文件
  - 配置config文件的访问权限为**644**

```js
/**
 * @description 免密登录config模板
*/
// 多主机配置
Host gateway-produce
HostName IP或绑定的域名
Port 22
Host node-produce
HostName IP或绑定的域名
Port 22
Host java-produce
HostName IP或绑定的域名
Port 22

Host *-produce
User root
IdentityFile ~/.ssh/produce_key_rsa
Protocol 2
Compression yes
ServerAliveInterval 60
ServerAliveCountMax 20
LogLevel INFO
```
```js
// 单主机配置
Host aliasName
User root
HostName IP或绑定的域名
IdentityFile ~/.ssh/test_rsa
Protocol 2
Compression yes
ServerAliveInterval 60
ServerAliveCountMax 20
LogLevel INFO
```

```
HOST github.com
IdentityFile ~/.ssh/personal_github_rsa

HOST gitee.com
IdentityFile ~/.ssh/personal_gitee_rsa

HOST git.company.net
IdentityFile ~/.ssh/company_gitlab_rsa

host alpha
user squirrel
hostname git.company.net
port 22
PreferredAuthentications publickey
identityfile ~/.ssh/company_server_rsa
```

## CI/CD
- CI/CD (Continuous Integration/Continuous Delivery)

### jenkins
[http://111.229.81.101:8080/](http://111.229.81.101:8080/) (root root | jenkins hao123456)

- [wiki](https://wiki.jenkins.io/display/JENKINS/Installing+Jenkins+on+Red+Hat+distributions)
- [系统要求 Java 8](https://jenkins.io/zh/doc/book/installing/#%E7%B3%BB%E7%BB%9F%E8%A6%81%E6%B1%82)
- [oracle官方下载地址](https://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html)
- openjdk
  ```sh
  yum -y install java-1.8.0-openjdk
  ```
- java版本的升级或降级
  - 检查已安装的包(rpm -qa | grep java)
  ```sh
  rpm -qa | grep java
  > javapackages-tools-3.4.1-11.el7.noarch
  > tzdata-java-2019c-1.el7.noarch
  > python-javapackages-3.4.1-11.el7.noarch
  > java-1.8.0-openjdk-1.8.0.232.b09-0.el7_7.x86_64
  > java-1.8.0-openjdk-headless-1.8.0.232.b09-0.el7_7.x86_64
  ```
  - 删除包(rpm -e --nodeps 包名)
  ```sh
  rpm -e --nodeps java-1.8.0-openjdk-1.8.0.232.b09-0.el7_7.x86_64
  rpm -e --nodeps java-1.8.0-openjdk-headless-1.8.0.232.b09-0.el7_7.x86_64
  ```
  - 重新安装

- 登录默认用户名：admin；初始密码：cat /var/lib/jenkins/secrets/initialAdminPassword

#### git配置
:::danger
### 错误提示
无法连接仓库：Command "git ls-remote -h git@github.com:stupidsongshu/book-system.git HEAD" returned status code 128:
stdout:
stderr: Host key verification failed.
fatal: Could not read from remote repository.

Please make sure you have the correct access rights
and the repository exists.
:::
- 公钥配置
  - 一、**需要使用jenkins用户身份生成密钥**，如果不是的话有以下两种解决方法
    - 1. 直接改变用户身份
    ```sh
    cd ~/.ssh
    chown jenkins jenkins_rsa.pub
    chown jenkins jenkins_rsa
    ```
    - 2. 切换到jenkins用户后重新生成
    ```sh
    su jenkins
    ssh-keygen -t rsa -C "邮箱标识" -f ~/.ssh/jenkins_rsa
    # jenkins需要在指定的服务器上安装私钥和公钥,而且公钥的名称务必用 authorized_keys 文件名
    cat jenkins_rsa.pub >> authorized_keys
    ```
  - 二、将公钥添加到 github -> Settings -> SSH
- 私钥配置
  - jenkins需要安装 Publish over SSH 插件
  - 将私钥添加到jenkins的配置中（Manage Jenkins -> Configure System -> Publish over SSH）

#### [su jenkins 无法切换到jenkins用户](https://blog.csdn.net/u013066244/article/details/52694772)

### SonarQube
- [官网](https://www.sonarqube.org/)
- [docs](https://docs.sonarqube.org/latest/)
- [参考链接](https://blog.csdn.net/weixin_42018258/article/details/102806089)
- [参考链接](https://notebook.yasithab.com/centos/centos-7-install-sonarqube)

### docker
```sh
docker
docker version
docker info

docker images      # 查看本地镜像列表
docker search      # 从Docker Hub查找镜像
docker pull        # 从镜像仓库中拉取或者更新指定镜像
docker build       # 使用 Dockerfile 创建镜像
docker run         # 创建一个新的容器并运行一个命令
docker rmi 镜像名   # 删除一个镜像

docker ps          # 查看启动的容器，加参数 -a 查看所有的容器
docker start 容器名 # 启动容器
docker stop  容器名 # 停止容器
docker rm    容器名 # 删除容器

docker network ls  # 网络列表

docker inspect 容器名/镜像名/网络名称 # 获取容器/镜像/网络的元数据

docker logs 容器名/容器id # 查看容器日志
docker logs -f 容器名/容器id # 查看容器日志

cat /etc/docker/daemon.json # 查看镜像源

# 修改为国内镜像源 https://juejin.im/post/5cd2cf01f265da0374189441
# https://qujwc3yg.mirror.aliyuncs.com # 阿里云 https://cr.console.aliyun.com/cn-hangzhou/instances/mirrors
# http://f1361db2.m.daocloud.io        # DaoCloud
# https://docker.mirrors.ustc.edu.cn   # 中科大
# https://hub-mirror.c.163.com         # 网易
# https://registry.docker-cn.com       # docker 官方中国区
sudo mkdir -p /etc/docker
sudo tee /etc/docker/daemon.json <<-'EOF'
{
  "registry-mirrors": [
    "https://qujwc3yg.mirror.aliyuncs.com",
    "http://f1361db2.m.daocloud.io",
    "https://docker.mirrors.ustc.edu.cn",
    "https://hub-mirror.c.163.com",
    "https://registry.docker-cn.com"
  ]
}
EOF
sudo systemctl daemon-reload
sudo systemctl restart docker

docker run -d -p 9000:3000 docker_demo # 启动镜像：-d 后台执⾏；-p 9000:3000 指定宿主机的9000端⼝映射到docker容器内的3000端⼝；docker_demo 为镜像名称
```

#### docker 练习
```sh
# Open a command-line terminal and test that your installation works by running the simple Docker image, hello-world:
docker run hello-world

# Start a Dockerized web server. Like the hello-world image above, if the image is not found locally, Docker pulls it from Docker Hub.
docker run --detach --publish=80:80 --name=webserver nginx

# 项目：getting-started
git clone https://github.com/docker/getting-started.git
docker build -t docker101tutorial .
docker run -dp 80:80 docker/getting-started

# 项目：doodle
# 1. This repository contains everything you need to create your first container.
git clone https://github.com/docker/doodle.git
# 2. Now let's build and tag a Docker image.
# A Docker image is a private filesystem, just for your container. It provides all the files and code your container will need. Running the docker build command creates a Docker image using the Dockerfile. This built image is in your machine's local Docker image registry.
cd doodle/cheers2019 && docker build -t summerycicada/cheers2019 .
# 3. Now let's run your first container.
# Running a container launches your software with private resources, securely isolated from the rest of your machine.
docker run -it --rm summerycicada/cheers2019
# 4. Share your image on Docker Hub 
# Once you're ready to share your container with the world, push the image that describes it to Docker Hub.
docker login && docker push summerycicada/cheers2019
```

### drone
[http://111.229.81.101/](http://111.229.81.101/)

:::warning
[drone](https://drone.io)官网文档资料不全，许多命令及api需要看[源码](https://github.com/drone/drone)
:::

#### 基于docker及github安装drone
[aliyun Docker CE 镜像源站](https://yq.aliyun.com/articles/110806)
```sh
# 安装必要的系统工具
yum install -y yum-utils device-mapper-persistent-data lvm2

# 添加软件源
yum-config-manager --add-repo http://mirrors.aliyun.com/docker-ce/linux/centos/docker-ce.repo

# 更新yum缓存
yum makecache fast

# 安装docker
yum install -y docker-ce

# 配置国内镜像源
# https://github.com/Azure/container-service-for-azure-china/blob/master/aks/README.md#22-container-registry-proxy
# curl -sSL http://oyh1cogl9.bkt.clouddn.com/setmirror.sh | sh -s <镜像加速地址>
curl -sSL http://oyh1cogl9.bkt.clouddn.com/setmirror.sh | sh -s http://dockerhub.azk8s.cn # Azure

# 启动Docker
sudo systemctl start docker

# 安装docker compose
# curl -L "https://github.com/docker/compose/releases/download/1.24.0/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose

# 给docker compose可执行权限
# chmod +x /usr/local/bin/docker-compose

# github 配置认证信息: Settings - Developer settings - OAuth Apps

# 安装 drone server
docker run \
  --volume=/var/lib/drone:/data \
  --env=DRONE_AGENTS_ENABLED=true \
  --env=DRONE_GITHUB_SERVER=https://github.com \
  --env=DRONE_GITHUB_CLIENT_ID=355e068718b368c85388 \
  --env=DRONE_GITHUB_CLIENT_SECRET=7244892c28295ae9e9b7cb83913aa2ac8d2d5af7 \
  --env=DRONE_RPC_SECRET=9a3e564e1d6d8649d4111f14332c0292 \
  --env=DRONE_SERVER_HOST=111.229.81.101 \
  --env=DRONE_SERVER_PROTO=http \
  --env=DRONE_YAML_ENDPOINT=http://111.229.81.101:3001/ \
  --env=DRONE_YAML_SECRET=123456 \
  --publish=80:80 \
  --publish=443:443 \
  --restart=always \
  --detach=true \
  --name=drone \
  drone/drone:1

# 安装 drone agent
docker run -d \
  -v /var/run/docker.sock:/var/run/docker.sock \
  -e DRONE_RPC_PROTO=http \
  -e DRONE_RPC_HOST=111.229.81.101 \
  -e DRONE_RPC_SECRET=9a3e564e1d6d8649d4111f14332c0292 \
  -e DRONE_RUNNER_CAPACITY=2 \
  -e DRONE_RUNNER_NAME=node \
  -p 3000:3000 \
  --restart always \
  --name runner \
  drone/drone-runner-docker:1
```

#### [安装drone CLI](https://docs.drone.io/cli/install)
```sh
# 安装 drone cli
curl -L https://github.com/drone/drone-cli/releases/latest/download/drone_linux_amd64.tar.gz | tar zx
sudo install -t /usr/local/bin drone

# 查看版本
drone --version

# authorization token 在 Drone account settings.
export DRONE_SERVER=http://drone.mycompany.com
export DRONE_TOKEN=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# 查看信息
drone info

# 查看仓库
drone repo ls

# drone build promote -h
# drone build promote [command options] <repo/name> <build> <environment>
drone build promote stupidsongshu/CICD-drone 6 staging

# 查看秘钥
# drone secret ls -h
drone secret ls --repository stupidsongshu/CICD-drone

# 生成秘钥
# drone secret add --repository <MY_REPO> --name deploy_key --value @/home/<USERNAME>/.ssh/id_rsa
drone secret add --repository stupidsongshu/CICD-drone --name deploy_key --data @/root/.ssh/id_rsa

# 删除秘钥
drone secret rm --repository stupidsongshu/CICD-drone --name deploy_key
```

#### .drone.yml pipeline 范例
```yml
---
kind: pipeline
type: docker
name: web

steps:
  - name: install
    image: node:alpine
    commands:
      - npm i --registry=https://registry.npm.taobao.org

  - name: test
    image: node:alpine
    commands:
      - npm run test

  - name: build
    image: node:alpine
    commands:
      - npm run build
      - ls -al
    # script:
      # - echo $USER
      # - cd ~/.ssh
      # - ls -al
      # - rm -rf /root/docs
      # - mkdir /root/docs
      # - cp -r .vuepress/dist/* /root/docs

  # 同一台机器
  # - name: deploy
  #   image: appleboy/drone-scp
  #   settings:
  #     host:
  #       - 111.229.81.101
  #     username: root
  #     password: !1qaz@2WSX
  #     password:
  #       from_secret: ssh_key
  #     port: 22
  #     source:
  #       - .vuepress/dist/*
  #     target: /root/docs
  #     rm: true
      # secrets: [ deploy_key ]
      # key_path: /root/.ssh/ssh_key
      # secrets:
      #   - source: deploy_key
      #     target: ssh_key

  - name: rsync production
    image: drillster/drone-rsync
    environment:
      RSYNC_KEY:
        from_secret: rsync_key
    settings:
      user: root
      hosts:
        - 111.229.81.101
      source: .vuepress/dist/*
      target: /root/docs
      secrets: [ rsync_key ]
    when:
      target:
        - production
      event:
        - promote

  - name: rsync staging
    image: drillster/drone-rsync
    environment:
      RSYNC_KEY:
        from_secret: rsync_key
    settings:
      user: root
      hosts:
        - 111.229.81.101
      source: .vuepress/dist/*
      target: /root/docs
      secrets: [ rsync_key ]
    when:
      target:
        - staging
      event:
        - promote

  - name: notify
    image: curlimages/curl
    commands:
      - |
        curl 'https://qyapi.weixin.qq.com/cgi-bin/webhook/send?key=dbb3fa53-29f8-4394-bfa1-ecce009e8cbb' -H 'Content-Type: application/json' -d '{"msgtype": "text", "text": {"content": "ok"}}'
    when:
      status:
        - failure
        - success
```

#### 使用jsonnet解决yaml中多环境配置复用问题
- [jsonnet](https://jsonnet.org/)
- ```sh
  drone jsonnet --stream --stdout
  ```

### Travis CI
- [Travis CI](https://travis-ci.com/)
- [Travis CI](https://travis-ci.org/)
- [docs](https://docs.travis-ci.com/user/tutorial/)

- 在 github Marketplace 安装 travis
- 新增 .travis.yml 配置文件
```yml
# .travis.yml
language: node_js

sudo: false

cache:
  apt: true
  directories:
    - node_modules

node_js: stable

install:
  - npm install -D
  - cd ./test/smoke/template
  - npm install -D
  - cd ../../../

scripts:
  - npm run test
  - npm run build
```

## IOC
- [awilix](https://github.com/jeffijoe/awilix)
- [inversify](https://github.com/inversify/InversifyJS)


## 测试
### e2e
- [nightwatch](https://github.com/nightwatchjs/nightwatch)
- [rize](https://github.com/g-plane/rize)


## [基于Docker、Git、Node.js的CI/CD、DevOps](https://mp.weixin.qq.com/s/00xwOLL9HTN210bkdy-KNw)
[gogs](https://gogs.io/)
### 一、基于Docker gogs搭建一个git服务
```sh
# 拉取gogs镜像创建git服务
docker pull gogs/gogs
# 创建gogs存储目录
sudo mkdir /var/gogs
# 所有者为当前用户
sudo chown -R ${USER} /var/gogs
# 创建docker网络便于容器进行通信
docker network create cicd_net
# 启动gogs容器
docker run -d --name=gogs --network cicd_net -p 8888:3000 -p 9999:22 -v /var/gogs:/data gogs/gogs
```

访问 `http://localhost:8888/`，首次访问需进行配置安装，注册登录，添加SSH密钥

### 二、编写web服务
创建一个git仓库（仓库名为 **cicd-web**），clone到本地后，编写一个node.js web服务：
```js
// index.js
const http = require('http')

const PORT = 3000

http.createServer((req, res) => {
  res.end('Hello World!')
}).listen(PORT, () => {
  console.log(`Web Server is running on port ${PORT}`)
})
```

创建Dockerfile文件，生成web服务docker镜像：
```Dockerfile
FROM node:14.4.0-alpine3.11

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --only=production

COPY . .

CMD ["node","index.js"]
```

手动构建镜像并运行容器，访问node.js web服务 `http://localhost:3000/`，可以看到页面输出 `Hello World!`
```sh
docker build -t cicd-web-image .
docker run -d -p 3000:3000 --name=cicd-web-container cicd-web-image
```

### 三、编写deploy服务
```sh
touch deploy.sh
chmod +x deploy.sh
```
```sh
#! /bin/sh

projectName='cicd-web'
userName='cicada'
dockerImageName='cicd-web-image'
dockerContainerName='cicd-web-container'

if [ ! -d "www/${projectName}" ];then
  echo '======git clone======'
  cd www
  git clone http://gogs:3000/${userName}/${projectName}
  cd ${projectName}
else
  echo '======git pull======'
  cd www/${projectName}
  git pull
fi

# 删掉旧的容器和镜像
docker stop ${dockerContainerName}
docker rm -f ${dockerContainerName}
docker rmi -f ${dockerImageName}

# 如果deploy部署服务与生产环境不在同一台docker宿主机，deploy应该publish镜像到远程镜像仓库，然后ssh远程登录执行shell，生产环境执行拉取镜像、构建镜像、运行容器等等
# docker publish
# ssh root@ip
# docker pull image

# 重新构建镜像并运行容器
docker build -t ${dockerImageName} .
docker run -d -p 3000:3000 --name=${dockerContainerName} ${dockerImageName}
```
修改node.js
```js
const http = require('http')
const cp = require('child_process')

const PORT = 4000

http.createServer((req, res) => {
  const proc = cp.exec('./deploy.sh', () => {})
  proc.stdout.pipe(process.stdout)
  proc.stderr.pipe(process.stdout)

  res.end('Deploy Server')
}).listen(PORT, () => {
  console.log(`Deploy Server is running on port ${PORT}`)
})
```
由于deploy.sh需要git，所以需要添加git镜像，Dockerfile增加`RUN apk add git`：
```Dockerfile
FROM node:14.4.0-alpine3.11

RUN apk add git

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --only=production

COPY . .

CMD ["node","index.js"]
```

```sh
# 构建部署镜像
docker build -t cicd-deploy-container .
# 部署容器需要使用宿主机docker命令构建docker镜像
docker run -d --network cicd_net -p 4000:4000 -v /usr/local/bin/docker:/usr/bin/docker -v /var/run/docker.sock:/var/run/docker.sock --user root --name=cicd-deploy-container cicd-deploy-container
```

### 四、git hook让deploy自动构建镜像生成web容器
仓库设置 -> 管理 Web 钩子 ->Discord -> 推送地址填写：`http://cicd-deploy-container:4000` -> 添加 Web 钩子
