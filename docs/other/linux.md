# Linux

## 远程登录
### Windows系统
- putty
- xshell
- cmder(Download Full，下载完全版)
- terminal

### Linux和MacOS系统
- ssh

`ssh`的前身是**telnet**，telnet通过电话线连上远程服务器，致命缺点是明文传输，ssh是加密版的telnet.

```sh
# ssh 远程服务器用户名@远程服务器IP
ssh root@192.168.199.222

# 普通用户
[squirrel@localhost ~]$ pwd
/home/squirrel

# 超级用户
[root@localhost ~]# pwd
/root

# 切换为 root 用户
su - root
# 或者
sudo -i
```
::: tip
- squirrel/root: 当前登录用户
- localhost: 主机名
- ~: 当前工作目录，默认为当前登录用户的家目录。普通用户的家目录是`/home/用户名`；root的家目录是`/root`
- 提示符：$表示普通用户；#表示超级用户
:::
::: danger
超级用户在**删除**等危险操作时需谨慎
:::


## 查看帮助文档
### man
- manual的缩写，分为9章
```sh
man ls
# 1代表第1章，省略时默认为1
man 1 ls
# 使用 man 命令获得 man 的帮助，man 7 man 提示错误时需要安装软件包 yum install -y man-pages
man 7 man
```
### help
shell(命令解释器)自带的命令为内部命令，其他的为外部命令，

内部命令和 shell 在同一进程内，外部命令会产生子进程，

可以使用 `type` 区分内部外部命令，

更科学一点的做法是用 `which` 获取命令完整路径，用 `type` 再加上命令的完整路径就可以明确匹配了
```sh
# 内部命令
help cd

# 外部命令
ls --help
```
### info
`info` 比 `help` 更详细，作为 `help` 的补充
```sh
info ls
```

```sh
# 查看当前系统语言
echo $LANG
# 查看当前用户
echo $USER
# 查看环境变量
echo $PATH
```

## 文件处理
**一切皆文件**

### 文件类型和权限
Windows系统默认文件可读可写不可执行(0o666)

```sh
drwxr-xr-x. 133 root root 8192 Oct  1 09:54 etc

1️⃣d|2️⃣rwx|3️⃣r-x|4️⃣r-x
```
| drwxr-xr-x   | . | 133 | root | root | 8192 | Oct  1 09:54 | etc |
| :----------: | - | --- | ---- | ---- | ---- | ------------ | --- |
| 文件类型和权限 | ACL权限 | 硬链接引用计数 | 所有者 | 所有组 | 文件大小 | 最后修改时间 | 文件名 |

1️⃣ 文件类型
- \- 普通文件
- d 目录文件(directory)
- l 符号链接文件(link)
- b 块设备文件(block)
- c 字符设备文件(char)
- p 命名管道文件(pipe)
- s socket文件

2️⃣ owner 文件所有者权限
权限项|字符表示|数字表示
-|:-:|:-:
可读(read)|r|4
可写(write)|w|2
可执行(execute)|x|1

3️⃣ group 文件所在组对该文件的权限

4️⃣ others 其他用户对该文件的权限
```sh
# 修改权限
who am i~chmod 777 用户名
```

标识位flag|说明
-|-
r|读
w|写
s|同步
x|排它方式
+|增加相反操作

### pwd
显示当前目录的绝对路径

### ls
查询目录下的文件，默认当前目录下的文件列表
```sh
ls [选项] [文件或目录...]
```
选项：
- -a 显示所有文件，包括隐藏文件
- -l 长格式显示文件
- -h 人性化的方式显示文件大小
- -t 按时间顺序显示
- -S 按文件大小逆序显示
- -r 逆序显示
- -R 递归显示
- -d 查看目录本身的属性而非子文件 ls /etc/
- -i 显示inode，也就是i节点，每个节点都有ID号

### cd
Change the shell working directory. 更改当前的操作目录
```sh
# 相对路径参照当前所在目录；绝对路径参照根目录
cd [目录]
```
- . 当前目录
- .. 上级目录
- \- 上次目录
- / 根目录
- ~ 家目录（或者直接 `cd` 不跟目录名）

### mkdir
make directory 建立目录
```sh
mkdir [选项] [目录名]
```
选项：
- -p 递归建立多级目录

### rmdir
remove empty directory 删除空目录
```sh
rmdir [目录名]
```

### rm
删除文件或目录
```sh
rm [选项] [文件或目录]
# 递归强制删除所有目录
rm -rf 文件或目录
```
选项：
- -r 删除目录，不加的话默认是删除文件
- -f 强制删除，不进行提示

### mv
move 移动或改名
```sh
# 如果目标目录存在，将进行移动操作；如果目标目录不存在，将进行改名操作
# 改名其实是本目录内移动
# 如果不跨越文件系统，改名和移动只是改变了所在目录的文件名部分，所以底层是一样的，
# 但是跨文件系统移动，就要移动数据的datablock了
mv [源文件或目录] [目标文件或目录]
```

### cp
复制，注意默认复制后的文件权限、所属者、修改时间可能会变
```sh
cp [OPTION]... [-T] SOURCE DEST
```
选项：
- -r 复制目录，不加的话默认是复制文件
- -d 若源文件是链接文件，则复制链接属性
- -p 连带文件属性复制，保留文件原属性
- -a 比 -p 更全，可以递归复制
- -v 显示操作结果

### 文本查看
#### cat
文本内容显示到终端

#### head
查看文件开头

#### tail
查看文件结尾
- 常用参数 -f，文件内容更新后，显示信息同步更新

#### wc
统计文件内容信息

### ip
ip是一个命令集，如`ip address`

### route
route路由管理

### ps
```sh
ps aux | grep node
ps -ef | grep node
```

[LINUX中如何查看某个端口是否被占用](https://www.cnblogs.com/hindy/p/7249234.html)

### netstat
```sh
# 查看端口为80的进程id
netstat -anp | grep 80

# 查看当前所有已经使用的端口情况(不用加端口号)
# -t (tcp) 仅显示tcp相关选项
# -u (udp) 仅显示udp相关选项
# -n 拒绝显示别名，能显示数字的全部转化为数字
# -l 仅列出在Listen(监听)的服务状态
# -p 显示建立相关链接的程序名
netstat -tunlp
```

### lsof
```sh
lsof -i :80
lsof -i tcp:80
```

### systemctl
服务管理
```sh
# 查看服务状态
systemctl status 服务名（如ngnix）
# 启动服务
systemctl start 服务名
# 停止服务
systemctl stop 服务名
# 重启服务
systemctl restart 服务名
```

### pkill
```sh
# 停止服务
pkill 服务名
```

### kill
```sh
# 杀掉进程Id为pid的进程
kill pid
# 强行杀掉进程Id为pid的进程
kill -9 pid
```

### 安装
- debian:  `apt`或`apt-get`
- unbuntu: `apt`或`apt-get`
- fedora:  `yum`或`dnf`
- centos:  `yum`

### 下载
- curl
- wget
  ```sh
  # 下载失败后需重新下载
  wget 地址
  # 断点续传
  wget -c 地址
  ```

### 进程管理相关命令
- top
- ps
- kill/pkill
- w

### 压缩与解压缩
#### zip
- 压缩：zip 压缩文件名 源文件/源目录
- 解压缩：unzip 压缩文件名
  - zip 1.txt
  - zip -r book
  - unzip book.zip
#### [tar](https://www.runoob.com/linux/linux-comm-tar.html)
- 压缩: tar -cvf 压缩文件名 源文件/源目录
- 解压缩: tar -xvf 压缩文件名
  - -c压缩
  - -x解压缩
  - -v显示过程
  - -f指定压缩后文件名
#### gzip
| 命令 | 示例 | 含义 |
| ---- | --- | --- |
| gzip 源文件 | gzip 1.txt | 压缩为.gz格式的压缩文件，不保留源文件 |
| gzip -c 源文件 | gzip -c 1.txt > 1.txt.gz | 压缩为.gz格式的压缩文件，保留源文件 |
| gzip -r 目录 | gzip -r book | 压缩目录下的所有子文件，但是不压缩目录 |
| gzip -d 压缩文件名 | gzip -d 1.txt.gz | 解压缩文件，不保留压缩包 |
| gunzip 压缩文件名 | gunzip 1.txt.gz | 解压缩文件，不保留压缩包 |
#### bz2
| 命令 | 示例 | 含义 |
| ---- | --- | --- |
| bzip2 源文件 | bzip2 1.txt | 压缩为.bz2格式的压缩文件，不保留源文件 |
| bzip2 -k 源文件 | bzip2 -k 1.txt | 压缩为.bz2格式的压缩文件，保留源文件 |
| bzip2 -d 压缩文件名 | bzip2 -d 1.txt.bz2 | 解压压缩包，不保留压缩包 |
| bunzip2 压缩文件名 | bunzip2 1.txt.bz2 | 解压压缩包，不保留压缩包 |
:::warning
bzip2不能压缩目录
:::

### 关机和重启
#### shutdown
- -c取消前一个关机命令
- -h关机
- -r重启
#### init
- init 0
  - 0关机
  - 1单用户
  - 2不完全多用户，不包含NFS服务
  - 3完全多用户
  - 4未分配
  - 5图形界面
  - 6重启
#### logout
- logout: 退出登录

### 查看所有用户列表
```sh
cat /etc/passwd
cat /etc/passwd|grep -v nologin|grep -v halt|grep -v shutdown|awk -F":" '{ print $1"|"$3"|"$4 }'|more
```

### 查看登录用户信息
#### w
查看登录用户信息
- USER 登录的用户名
- TTY 登录的终端（tty1本地终端 pts/0远程终端）
- FROM 登录IP
- LOGIN@ 登录时间
- IDLE 用户闲置时间
- JCPU 该终端所有进程占用的时间
- PCPU 当前进程所占用的时间
- WHAT 正在执行的命令
#### who
查看登录用户信息
- USER 登录的用户名
- TTY 登录的终端（tty1本地终端 pts/0远程终端）
- LOGIN 登录时间（登录IP）
#### whoami
- USER 登录的用户名
#### id
id 用户名：显示指定用户信息，包括用户编号，用户名 主要组的编号及名称，附属组列表
#### last
查看当前登录用户和过去登录的用户信息，默认读取`/var/log/wtmp`文件
- 用户名
- 登录终端
- 登录IP
- 登录时间
- 退出时间（在线时间）
#### lastb
查看登录失败的用户名单，默认读取`/var/log/btmp`文件
#### lastlog
查看所有用户的最后一次登录时间
- 用户名
- 登录终端
- 登录IP
- 最后一次登录时间

## shell
### echo
输出命令
- -e支持反斜线控制的字符转换

| 控制字符 | 作用 |
| ------- | --- |
| \a | 输出警告音 |
| \b | 退格键，即向左删除键 |
| \n | 换行符 |
| \r | 回车键 |
| \t | 制表符，即tab键 |
| \v | 垂直制表符 |
| \0nnn | 按照八进制ASCII码表输出字符，其中0为数字零，nnn是三位八进制数 |
| \xhh | 按照十六进制ASCII码表输出字符，其中hh为两位十六进制数 |

### 编写可执行shell
touch hello.sh
```sh
#!/bin/bash
echo -e "\e[1;34m hello world \e[0m"
chmod 755 hello.sh
./hello.sh
#或通过Bash调用执行脚本
bash ./hello.sh
```
### alias
- alias查看命令别名
- 设置别名：alias 别名=具体命令
- 删除别名：unalias 别名
- 永久生效：
  - 写入环境变量配置文件：`vi ~/.bashrc`
  - `source ~/.bashrc`

### 命令生效顺序
- 绝对路径或相对路径
- 别名
- bash内部命令
- 按照$PATH环境变量定义的目录查找顺序找到的第一个命令

### 常用命令快捷键
```sh
ctrl c #结束正在运行的程序
ctrl d #结束输入或退出shell
ctrl s #暂停屏幕输出（看起来像死机）
ctrl q #恢复屏幕输出
ctrl l #清屏，等同于clear
ctrl a #移动光标到行首
ctrl e #移动光标到行尾
ctrl u #从光标所在的位置删除到行首
ctrl r #在历史命令中搜索
ctrl z #把命令放入后台
```

### history
历史命令保存在用户的家目录中的.bash_history文件中，默认保存1000条
- history [选项] [历史命令保存文件]
- 选项
  - -c清空历史命令
  - -w把缓存中的历史命令写入历史命令保存文件~/.bash_history
- !
  - !!：执行上一条命令
  - !n：执行第n条命令
  - !字符串：执行最近一条以该字符串开头的命令

### 特殊符号
| 符号 | 作用 |
| ---- | --- |
| ~ | 用户家目录 |
| # | 注释 |
| * | 匹配0个或多个字符，即匹配任意内容 |
| ? | 匹配一个任意字符 |
| [] | 匹配中括号中任意一个字符 |
| [-] | 匹配中括号中任意一个字符，-代表范围 |
| [^] | 匹配不是中括号中的一个字符 |
| \ | 转义符号 |
| ; | 分号，没有任何逻辑关系的连接符。当多个命令⽤分号连接时，各命令之间的执行成功与否彼此没有任何影响，都会⼀条⼀条执⾏下去。 |
| \|\| | 逻辑或，当⽤此连接符连接多个命令时，前⾯的命令执⾏成功，则后⾯的命令不会执行。前⾯的命令执⾏失败，后⾯面的命令才会执⾏。 |
| && | 逻辑与，当⽤此连接符连接多个命令时，前⾯的命令执行成功，才会执行后⾯的命令，前面的命令执⾏失败，后⾯的命令不会执行。 |
| \| | 管道符号，当⽤此连接符连接多个命令时，前⾯命令执行的正确输出，会交给后⾯的命令继续处理。 若前面的命令执⾏失败则会报错，若后⾯的命令⽆法处理前⾯命令的输出也会报错。 |
| '' | 单引号，在单引号中所有的特殊符号都没有特殊含义 |
| "" | 双引号，在双引号中特殊符号没有特殊含义，但是$`\例外，拥有调用变量值，引用命令和转义的含义。 |
| `` | 反引号，引用系统命令 |
| $() | 同反引号 |
| > | 重定向符号，取代 |
| >> | 重定向符号，追加 |
| 2> | 错误重定向 |
| 2>> | 错误追加重定向 |

### sed
- 文本替换
  - `sed -i '' -e 's/源文本/新文本/g' 文件名`

### awk
