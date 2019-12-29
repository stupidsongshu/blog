# 前端工程化

## 免密登录
- 1. 生成秘钥对
  ```sh
  # -t 指定生成算法
  # -b 生成长度（默认为2048）
  # -C 在生成的key中添加标识
  # -f 指定生成的文件名（默认为id_rsa）
  # 注意：引号不能用单引号，必须是双引号
  ssh-keygen -t rsa -b 4096 -C "指定标识" -f 指定文件名
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

## CI/CD
- CI/CD (Continuous Integration/Continuous Delivery)

### jenkins
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
  [root@VM_0_8_centos ~]# rpm -qa | grep java
  javapackages-tools-3.4.1-11.el7.noarch
  tzdata-java-2019c-1.el7.noarch
  python-javapackages-3.4.1-11.el7.noarch
  java-1.8.0-openjdk-1.8.0.232.b09-0.el7_7.x86_64
  java-1.8.0-openjdk-headless-1.8.0.232.b09-0.el7_7.x86_64
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
docker info
docker ps
docker ps -a
docker ps -l
docker start 容器名
docker stop 容器名
docker rm 容器名
```

### drone
:::warning
[drone](https://drone.io)官网文档资料不全，许多命令及api需要看[源码](https://github.com/drone/drone)
:::

#### 基于docker及github安装drone
```sh
# 安装必要的系统工具
yum install -y yum-utils device-mapper-persistent-data lvm2

# 添加软件源
yum-config-manager --add-repo http://mirrors.aliyun.com/docker-ce/linux/centos/docker-ce.repo

# 更新yum缓存
yum makecache fast

# 安装docker
yum -y install docker-ce

# 配置国内镜像源
# https://github.com/Azure/container-service-for-azure-china/blob/master/aks/README.md#22-container-registry-proxy
# curl -sSL http://oyh1cogl9.bkt.clouddn.com/setmirror.sh | sh -s <镜像加速地址>
curl -sSL http://oyh1cogl9.bkt.clouddn.com/setmirror.sh | sh -s http://dockerhub.azk8s.cn # Azure

# 启动Docker
systemctl start docker

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
