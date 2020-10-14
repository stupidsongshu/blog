# 环境
- [阿里云镜像](https://developer.aliyun.com/mirror)

## jdk
```sh
rpm -qa | grep jdk
sudo yum remove xxx
sudo chmod 777 jdk-7u80-linux-x64.rpm
# 安装，默认安装路径为 /usr/java
sudo rpm -ivh jdk-7u80-linux-x64.rpm

# 配置jdk环境变量，在 /etc/profile 最下方添加下面两行(JAVA_HOME为jdk的安装路径)
# export JAVA_HOME=/usr/java/jdk1.7.0_80
# export CLASSPATH=.:$JAVA_HOME/jre/lib/rt.jar:$JAVA_HOME/lib/dt.jar:$JAVA_HOME/lib/tools.jar
# 然后在 export PATH 中添加 $JAVA_HOME/bin
sudo vim /etc/profile
source /etc/profile
java -version
```
