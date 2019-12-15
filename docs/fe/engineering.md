# 前端工程化

## 免密登录
- 1. 生成秘钥对
  ```sh
  # -t 指定生成算法
  # -b 生成长度（默认为2048）
  # -C 在生成的key中添加标识
  # -f 指定生成的文件名（默认为id_rsa）
  # 注意：引号不能用单引号，必须是双引号
  ssh-keygen -t rsa -b 4096 -C "指定标识" -f "指定文件名"
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