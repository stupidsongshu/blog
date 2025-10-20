# Linux

## 参考
- [一份前端够用的 Linux 命令](https://mp.weixin.qq.com/s/fuDUfmdEZeZ3HRNOyNaI8A)

## 远程登录
### Windows系统
- putty
- xshell
- cmder(Download Full，下载完全版)
- terminal

### Linux和MacOS系统
- ssh

`ssh`的前身是**telnet**，telnet通过电话线连上远程服务器，致命缺点是明文传输，ssh是加密版的telnet.

ssh [-p port] user@remote
- user 是远程机器上的用户名，如果不指定的话默认为当前用户
- remote 是远程机器的地址，可以是 IP 、域名、别名
- port 是 SSH Server 监听的端口，如果不指定默认值为 22
- 使用 `exit` 退出当前用户的登录

```sh
# ssh 远程服务器用户名@远程服务器IP
ssh root@192.168.199.222

# 普通用户
[squirrel@localhost ~]$ pwd
/home/squirrel

# 超级用户
# root 账号通常用于系统的维护和管理，对操作系统的所有资源具有所有访问权限
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

```sh
# 查看当前用户
echo $USER

# 查看当前系统语言
echo $LANG

# 查看环境变量
echo $PATH
```

### 免密登录
本地使用私钥加解密数据，远程服务器使用公钥加解密数据

非对称加密算法：
- 使用**公钥**加密的数据，需要使用**私钥**解密
- 使用**私钥**加密的数据，需要使用**公钥**解密

```sh
# 第1步：生成 SSH 公私钥
# -t rsa：代表密钥类型为rsa密钥对
# -C: 描述
ssh-keygen -t rsa -C "test@gmail.com"
#  -b 2048：代表密钥长度为2048位，默认值为 2048
#  -f: 代表生成密钥对的文件名以及保存位置
ssh-keygen -t rsa -b 2048 -f ~/.ssh/test_rsa

# 第2步：把本地主机的公钥复制到远程主机的 `~/.ssh/authorized_keys` 文件中
# -i: 指定公钥文件
ssh-copy-id [-i [identity_file]] [user@]hostname
# 如果 `ssh-copy-id` 命令不可用，可以手动完成这个过程：
# 复制本地主机公钥 `cat ~/.ssh/test_rsa.pub`
# 粘贴到远程主机中 `vim ~/.ssh/authorized_keys`

# 第3步：在本地主机文件 ~/.ssh/config 中设置 ssh 别名格式：
Host 别名
  HostName 实际主机名或IP地址
  User 登录用户名
  Port 端口号           # 可选，仅当非默认端口22时使用
  IdentityFile 私钥路径 # 可选，指定用于认证的私钥文件

# 具体示例：
HOST github.com
  IdentityFile ~/.ssh/personal_github_rsa

HOST gitee.com
  IdentityFile ~/.ssh/personal_gitee_rsa

HOST git.company.net
  IdentityFile ~/.ssh/company_gitlab_rsa

HOST alpha
  USER squirrel
  HostName git.company.net
  PORT 22
  PreferredAuthentications publickey
  IdentityFile ~/.ssh/company_server_rsa
```

- [阿里云 实例登录凭证管理（登录名/密码/密钥对）](https://help.aliyun.com/zh/ecs/user-guide/instance-logon-credential-management)

## 命令的选项风格
- UNIX风格，必须带一个 "-"
- BSD风格，不带 "-"
- GNU风格，带两个"-"

## 关机和重启
### shutdown

shutdown [选项] [时间]

- 不指定选项和参数，默认表示***1分钟***后***关闭电脑***

|选项|含义|
|-|-|
|-h|关机|
|-r|重启|
|-c|取消前一个关机命令|

```sh
# 30分钟后关机
shutdown +30
shutdown -h 30

# 立即关机
shutdown now
shutdown -h now

# 立即重启
shutdown -r now

# 取消之前指定的关机计划
shutdown -c
```
### init
```sh
init 0 # 关机
init 1 # 单用户
init 2 # 不完全多用户，不包含NFS服务
init 3 # 完全多用户
init 4 # 未分配
init 5 # 图形界面
init 6 # 重启
```
### logout
退出登录

## 查看帮助文档
### man
- manual 的缩写，分为9章
```sh
man ls
# 1代表第1章，省略时默认为1
man 1 ls
# 使用 man 命令获得 man 的帮助，man 7 man 提示错误时需要安装软件包 yum install -y man-pages
man 7 man
```

使用 `man` 时的操作键：
|操作键|功能|
|-|-|
|Enter键|显示下一行|
|空格键|显示下一屏|
|b|显示下一屏|
|f|显示上一屏|
|q|退出|
|/word|搜索 word 字符串|
### help
shell（命令解释器）自带的命令为内部命令，其他的为外部命令，

内部命令和 shell 在同一进程内，外部命令会产生子进程，

可以使用 `type` 区分内部外部命令，更严谨的做法是用 `which` 获取命令的完整路径，然后用 `type` 加上命令的完整路径就可以明确区分
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

## 查看用户
### 查看所有用户列表
```sh
cat /etc/passwd
cat /etc/passwd|grep -v nologin|grep -v halt|grep -v shutdown|awk -F":" '{ print $1"|"$3"|"$4 }'|more
```
### w
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

## 用户管理
查看用户信息
|命令|说明|
|-|-|
|id [用户名]|查看用户 UID 和 GID 信息|
|who|查看当前所有登录的用户列表|
|whoami|查看当前登录用户的账户名|

/etc/passwd 文件存放的是用户的信息，由6个分号组成的7个信息，分别是：
1. 用户名
2. 密码（x 表示加密的密码）
3. UID （用户标识）
4. GID （组标识）
5. 用户全名或本地账号
6. 家目录
7. 登录使用的 Shell，即登录之后使用的终端命令，ubuntu 默认是 dash

```sh
# 新建用户，可以在 /etc/passwd 和 /etc/shadow 中查看刚刚新建的用户
# 新建一个用户，没有指定用户组，会创建一个与用户名同名的用户组并加入进去
useradd 用户名
# -m: 自动建立用户家目录
# -g: 指定用户所在的组，否则会建立一个和用户名同名的组
useradd -m -g 组名 用户名

# 修改用户密码
passwd 用户名

# 删除用户
userdel 用户名 # 该用户的家目录不会被删除
userdel -r 用户名 # 该用户的家目录也会被删除

# usermod 可以用来设置用户的主组/附加组和登录Shell
# 主组：通常在新建用户时指定，在 etc/passwd 的第4列 GID 对应的组
# 附加组：在 /etc/group 中最后一列表示该组的用户列表，用于指定用户的附加权限
# 提示：设置了用户的附加组之后，需要重新登录才能生效！

# 修改用户家目录
usermod -d 家目录路径 用户名

# 修改用户的主组
usermod -g 用户组名 用户名

# 修改用户的附加组
usermod -G 附加组名 用户名
usermod -G sudo test # 将 test 用户添加到 sudo 附加组中。注意：使用 useradd 添加的用户默认没有权限使用 sudo 以 root 身份执行命令。
# 修改用户登录 Shell
usermod -s /bin/bash 用户名

# 修改用户属性
chage 用户名
```

### 切换用户
命令|作用|说明
-|-|-
su - 用户名|切换用户|- 可以同时切换到用户家目录，否则保持位置不变；不带用户名时可以切换到 root
exit|退出当前登录账户||

```sh
# 临时切换用户，- 代表切换用户同时切换运行环境
su - 用户名

# 以 root 用户身份执行命令
sudo
# 设置需要使用 sudo 的用户（组）
visudo # /etc/sudoers
```

sudo
- `su`是 substitute user 的缩写，表示使用另一个用户的身份
- `sudo`命令用来以其他身份来执行命令，预设的身份为`root`
- 用户使用`sudo`时必须先输入密码，之后有5分钟的有效期限，超过期限后必须重新输入密码
- 若未经授权的用户企图使用`sudo`，则会发出警告邮件给管理员

## 用户组管理
/etc/group

```sh
# 新建用户组
groupadd 组名

# 删除用户组
groupdel 组名

# 确认组信息
cat /etc/group

# 修改文件/目录的所属组
chgrp 组名 文件名或目录名
# 递归修改文件/目录的所属组
chgrp -R 组名 文件名或目录名
```

## 配置文件
### /etc/passwd
用户信息，所有用户都可读写
```sh
# 用户:是否使用密码(真正的密码保存在 /etc/shadow 中):用户id(uid):组id(gid，对应 /etc/group 的第3个字段):备注:家目录:默认shell
root:x:0:0:root:/root:/bin/bash
bin:x:1:1:bin:/bin:/sbin/nologin # nologin 表示该用户不能登录
test:x:1001:1002::/home/test:/bin/bash
```

### /etc/group
用户组信息
```sh
# 组名:是否使用密码:组id(gid):组中的用户
root:x:0:
mail:x:12:postfix
postfix:x:89:

id root
> uid=0(root) gid=0(root) groups=0(root)

id mail
> uid=8(mail) gid=12(mail) groups=12(mail)

id postfix
> uid=89(postfix) gid=89(postfix) groups=89(postfix),12(mail)
```

### /etc/shadow
用户密码，**只有 root 用户拥有读权限，其他用户没有任何权限**
```sh
# 用户名:加密密码:最后一次修改时间:最小修改时间间隔:密码有效期:密码需要变更前的警告天数:密码过期后的宽限天数:账号失效时间:保留字段
root:$1$EncWLCZu$wHoru/UcfhsGrJRRUPdK7.:18246:0:99999:7:::
test:$1$Uym0JVqL$QeCVRpbpyKow2S3gMpqVF.:18553:0:99999:7:::

date -d '1970-01-01 18246 days'
> 2019年 12月 16日 星期一 00:00:00 CST
```

`which` 命令查看执行命令所在的位置

bin 和 sbin
- 在 Linux 中绝大多数可执行文件都是保存在 /bin、/sbin、/usr/bin、/usr/sbin
- /bin (binary) 是二进制执行文件目录，主要用于具体应用
- /sbin (system binary) 是系统管理员专用的二进制代码存放目录，主要用于系统管理
- /usr/bin (user commands for applications) 后期安装的一些软件
- /usr/sbin (super user commands for applications) 超级用户的一些管理程序

## 文件处理
**一切皆文件**
### 文件类型和权限
Windows系统默认文件可读可写不可执行(0o666)

| drwxr-xr-x   | . | 133 | root | root | 8192 | Oct  1 09:54 | etc |
| :----------: | - | --- | ---- | ---- | ---- | ------------ | --- |
| 文件类型和权限 | ACL权限 | 硬链接引用计数 | 所属用户（属主、拥有者） | 所属组（属组） | 文件大小 | 最后修改时间 | 文件名 |

```sh
# 创建新文件有默认权限，根据 umask 值计算，属主和属组根据当前进程的用户来设定
drwxr-xr-x. 133 root root 8192 Oct  1 09:54 etc
1️⃣d|2️⃣rwx|3️⃣r-x|4️⃣r-x
```

1️⃣ 文件类型
- -: 普通文件
- d: 目录文件(directory)
- l: 符号链接文件(link)
- b: 块设备文件(block)
- c: 字符设备文件(char)
- p: 命名管道文件(pipe)
- s: socket套接字文件

2️⃣ owner 文件所有者（属主）对该文件的权限

3️⃣ group 文件所在组（属组）对该文件的权限

4️⃣ others 其他用户对该文件的权限

#### 文件权限的表示方法
权限项        |字符表示|数字表示（八进制）
-------------|:-----:|:-:
读(read)     | r     | 4
写(write)    | w     | 2
执行(execute) | x     | 1

|拥有者/组/其他用户|数字|权限
|-|-|-
|421|7|rwx
|420|6|rw-
|401|5|r-x
|400|4|r--
|021|3|-wx
|020|2|-w-
|001|1|--x
|000|0|---

#### 目录权限的表示方法：
- x: 进入目录
- rx: 显示目录内的文件名
- wx: 修改目录内的文件名

#### 修改权限
|命令|作用|说明
|-|-|-
|chown|修改拥有者|
|chgrp|修改组|
|chmod|修改权限|(change mode) 可以修改**用户/组**对**文件/目录**的权限

```sh
# 单独修改属主
chown 用户名 文件名或目录名
# 同时修改属主和属组
chown 用户名:组名 文件名或目录名

# 单独更改属组
chgrp 组名 文件名或目录名
# 递归修改文件或目录的组
chgrp -R 组名 文件名或目录名

# u: user 属主
# g: group 属组
# o: other 其他用户
# a: all 所有用户，相当于 ugo

# +: 增加权限
# -: 减少权限
# =: 设置权限
chmod +/-rwx 文件名或目录名 # 会同时修改拥有者和组的权限
chmod u+x test.py # 单独修改拥有者的权限

# 使用3个数字分别设置拥有者、组、其他用户的权限
chmod 755 file # 等同于 chmod u=rwx,go=rx file

# -R: 递归修改文件或目录的权限
chmod -R 755 文件名或目录名

# 777: u=rwx,g=rwx,o=rwx
# 755: u=rwx,g=rx,o=rx
# 644: u=rw,g=r,o=r
```

### 特殊权限
#### SUID
用于二进制可执行文件，执行命令时取得文件属主权限，如 /usr/bin/passwd
```sh
ls -l /usr/bin/passwd
> -rwsr-xr-x. 1 root root 27832 6月  10 2014 /usr/bin/passwd

# 4加上权限
chmod 4755 /test/testfile
```
#### SGID
用于目录，在该目录下创建新的文件和目录，权限自动更改为该目录的数组
#### SBIT
用于目录，在该目录下新建的文件和目录，只有 root 和自己可以删除，如 /tmp
```sh
ls -ld /tmp
> drwxrwxrwt. 10 root root 12288 10月 19 22:39 /tmp

# 1加上权限
chmod 1777 /test
```

<!-- ```sh
# 修改权限
who am i~chmod 777 用户名
``` -->

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

`ls [选项] [文件或目录...]`

|选项|含义|
|-|-|
|-a|显示所有文件，包括隐藏文件|
|-l|长格式显示文件|
|-h|人性化的方式显示文件大小|
|-t|按修改时间顺序显示|
|-S|按文件大小逆序显示|
|-r|逆序显示|
|-R|递归显示子目录|
|-d|查看目录本身的属性而非子文件|
|-i|显示inode，也就是i节点，每个节点都有ID号|

|通配符|含义|
|-|-|
|*|代表任意个数个字符|
|?|代表任意一个字符，个数只能为1|
|[]|表示可以匹配字符组中的任意一个|
|[abc]|匹配a、b、c中的任意一个字符|
|[a-f]|匹配从a到f范围内的任意一个字符|

### cd
Change the shell working directory. 更改当前的操作目录

cd [目录]

路径：
- 绝对路径: 路径最前面是 / 或者 ~, 参照根目录或家目录
- 相对路径: 路径最前面不是 / 或者 ~, 参照当前目录所在的位置

|命令|含义|
|-|-|
|cd|家目录|
|cd ~|家目录|
|cd /|根目录|
|cd .|当前目录|
|cd ..|上级目录|
|cd -|上次目录|

### touch
创建文件或修改文件时间
- 如果文件不存在，可以创建一个空白文件
- 如果文件已存在，可以修改文件的末次修改时间

### mkdir
make directory 创建目录

mkdir [选项] [目录名]

注意：***新建目录的名称***不能与当前目录中的***已有目录或文件***同名

|选项|含义|
|-|-|
|-p|递归建立多级目录|

### rmdir
remove empty directory 删除空目录

rmdir [目录名]

### rm
删除文件或目录

rm [选项] [文件或目录]

```sh
# 递归强制删除指定目录下的所有内容
rm -rf 文件或目录
```

|选项|含义|
|-|-|
|-r|递归地删除目录下的内容，删除目录时必须添加|
|-f|强制删除，忽略不存在的文件，无需提示|

### tree
以树状图列出文件目录结构

tree [目录名]

|选项|含义|
|-|-|
|-d|只显示目录|

### cp
复制文件或目录。注意默认复制后的文件权限、所属者、修改时间可能会变

cp [OPTION]... [-T] SOURCE TARGET

|选项|含义|
|-|-|
|-i|覆盖文件前提示|
|-f|已经存在的目标文件直接覆盖，不会提示|
|-r|递归复制目录下的所有子目录和文件，不加默认是复制文件|
|-d|若源文件是链接文件，则复制链接属性|
|-p|连带文件属性复制，保留文件原属性|
|-a|比 -p 更全，可以递归复制|
|-v|显示执行过程|

### mv
move 移动或重命名

mv [源文件或目录] [目标文件或目录]

|选项|含义|
|-|-|
|-i|覆盖文件前提示|

- 如果目标目录存在，将进行移动操作；如果目标目录不存在，将进行改名操作
- 改名其实是本目录内移动：
  - 如果不跨越文件系统，改名和移动只是改变了所在目录的文件名部分，所以底层是一样的，
  - 但是跨文件系统移动，就要移动数据的datablock了

## 文本查看
### cat
concatenate 查看文件内容、创建文件、文件合并、追加文件内容等功能

|选项|含义|
|-|-|
|-b|对非空输出行编号|
|-n|对输出的所有行编号|

`nl` 命令与 `cat -b` 的效果等价

### more
分屏显示文件内容

使用 `more` 时的操作键：
|操作键|功能|
|-|-|
|Enter键|显示下一行|
|空格键|显示下一屏|
|b|显示下一屏|
|f|显示上一屏|
|q|退出|
|/word|搜索 word 字符串|

### less

### grep
对文本文件进行模式查找

|选项|含义|
|-|-|
|-n|显示匹配行及行号|
|-v|显示不包含匹配文本的所有行（相当于求反）|
|-i|忽略大小写|

常用的两种模式查找：
|参数|含义|
|-|-|
|^hello|行首，搜索以 hello 开头的行|
|world$|行尾，搜索以 world 结束的行|

### head
查看文件开头（默认10行）
```sh
# 查看 index.html 文件的前10行内容
head ./index.html

# 查看 index.html 文件的前5行内容
head -5 ./index.html
```

### tail
查看文件结尾（默认10行）
- -f: 文件内容更新后，显示信息同步更新
```sh
# 查看 index.html 文件的后10行内容
tail ./index.html

# 查看 index.html 文件的后5行内容
tail -5 ./index.html
```

### wc
统计文件内容信息
```sh
# 统计 index.html 文件内容的行数
wc -l ./index.html
```

## 文本编辑 Vim
[vim](https://www.vim.org/)
[vim doc](http://vimdoc.sourceforge.net/)

```sh
vimtutor

# 配置文件
~/.vimrc # Mac
/etc/vimrc # Linux
```

### 多模式
#### 正常模式 Normal-mode
光标移动：
- h: 左
- j: 下
- k: 上
- l: 右

复制：
- y 或 yy: 复制光标位置所在的行
- 3yy: 复制3行
- y$: 复制光标位置到行尾

粘贴：
- p

剪切：
- dd: 剪切一整行
- 3dd: 剪切3行
- d$: 剪切光标位置到行尾
- dw: 剪切一个单词

删除：
- x: 删除光标位置的字符

替换：
- r + 字符: 替换光标位置的字符

撤销：
- u: 相当于 windows 的 ctrl + z

重做：
- ctrl + r: 相当于 windows 的 ctrl + y

移动：
- 0: 光标移到行开头
- ^(shift+6): 光标移到行开头(第一个非空字符开始)
- $(shift+4): 光标移到行末尾
- 10G: 移动光标位置到第10行
- g 或 [[: 移到到第一行开头
- G 或 ]]: 移动到最后一行开头

#### 插入模式 Insert-mode
从正常模式进入插入模式（光标位置不同）：
- i: 进入插入模式
- I: 进入插入模式，并且光标移动到 当前行的开头
- a: 进入插入模式，并且光标移动到 当前光标的下一位
- A: 进入插入模式，并且光标移动到 当前行的末尾
- o: 进入插入模式，并且光标移动到 当前光标的下一行（产生空行）
- O: 进入插入模式，并且光标移动到 当前光标的上一行（产生空行）

#### 命令模式（末行模式） Command-mode
| vim Command | Description/Purpose |
| - | - |
| :w + 文件路径/文件名 | 在指定文件路径下保存指定文件名 |
| :w | 保存 |
| :q | 退出 |
| :wq | 保存后退出 |
| :q! | 不保存退出 |
| :! + 命令| 临时执行 linux 命令 |
| /xxx | 从光标位置开始向后搜索xxx字符串<br>n 向后继续查找, shift + n 向前继续查找 |
| ?xxx | 从光标位置开始向前搜索xxx字符串 |
| : s/旧字符串/新字符串 | 将匹配到的“旧字符串”替换成“新字符串”（只替换光标位置所在的行） |
| :%s/旧字符串/新字符串 | 将匹配到的“旧字符串”替换成“新字符串”（“旧字符串”会被全部替换） |
| : s/旧字符串/新字符串/g | 将匹配到的“旧字符串”全部替换成“新字符串”（只替换光标位置所在的行） |
| :%s/旧字符串/新字符串/g | 将匹配到的“旧字符串”全部替换成“新字符串”（“旧字符串”会被全部替换） |
| :ls | 列出所有的文件 |
| :10 | 跳到指定行 |
| :set nu 或 :set number | 显示行号 |
| :set nonu 或 :set nonumber | 取消显示行号 |
| :set hlsearch | 高亮搜索 |
| :set nohlsearch | 取消高亮搜索 |
| :syntax on  | Enabling vi/vim syntax colors |
| :syntax off | Disabling vi/vim syntax colors |
| :colorscheme foo | Specifying a colorscheme called foo.<br/>Use ‘/usr/share/vim/vim*/colors/’ to find installed color scheme |

- 如果查找的是“/”替换成“//”怎么写？
  - 如果需要查找并替换"/"，可以将原有的替换分隔符号更换为其他符号（如 @），`: s/old/new/g` 替换为`: s@/@//@g` 
- 如何复制其他文件的内容后粘贴到当前文件？
  - `vim file1 file2` 同时打开两个文件，第一个文件使用 `y` 命令复制，使 `:next` 打开下一个文件，使用 `p` 命令粘贴，返回上一个文件使用 `:prev`

#### 可视模式 Visual-mode
`v` 进入字符可视模式，`V` 进入行可视模式，`ctrl+v` 进入块可视模式

- 块可视模式插入：
  - `ctrl+v` 进入可视模式
  - 用光标选中多行
  - 按 `I`，然后输入内容，
  - 再按两次 ESC
- 块可视模式删除同理：
  - `ctrl+v` 进入可视模式
  - 光标选中多行
  - 按 `d` 进行删除


# 网络管理
## 网络状态查看
### net-tools
- ifconfig
- route
- netstat

```sh
ifconfig <接口> <IP地址> [netmask 子网掩码]
ifup <接口>
ifdown <接口>

# 查看所有网卡
ifconfig
# 查看指定网卡 eht0
ifconfig eth0
# 设置 网卡 eth0 的 ip
ifconfig eth0 172.17.0.2
```
### iproute2
- ip
- ss

## 网络接口命名修改
网卡命名规则受 biosdevname 和 net.ifnames 两个参数影响
|      | biosdevname | net.ifnames | 网卡名 |
| -    | -           | -           | -     |
| 默认  |      0      |       1     | ens33 |
| 组合1 |      1      |       0     | em1   |
| 组合2 |      0      |       0     | eth0 |
- 1. 编辑 /etc/default/grub 文件，增加 biosdevname=0 net.ifnames=0
- 2. 更新 grub: grub2-mkconfig -o /boot/grub2/grub.cfg
- 3. 重启: reboot

## 查看网卡物理连接情况
```sh
mii-tool eth0
ethtool eth0
```

## ip
ip 是一个命令集，如 `ip address`

## route
route 路由管理，查看网关
```sh
# 查看网关，使用 -n 参数不解析主机名
route -n

# 删除网关
route del default gw <网关ip>

# 添加网关
route add default gw <网关ip>
route add -host <指定ip> gw <网关ip>
route add -net <指定网段> netmask <子网掩码> gw <网关ip>
```

### ps
```sh
ps aux | grep node
ps -ef | grep node
```
### netstat
[LINUX中如何查看某个端口是否被占用](https://www.cnblogs.com/hindy/p/7249234.html)
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

# 查看应用在线人数
netstat -ant | grep -E ':80|:443' | wc -l
```

### lsof
```sh
lsof -i :80
lsof -i tcp:80
# 只想获取端口占用的进程ID，可以使用awk工具来提取
lsof -i :8080 | awk 'NR>1 {print $2}'
```

## 网络故障排除
### ping
```sh
ping www.baidu.com
```
### traceroute
```sh
# -w 等待时间（秒）
traceroute -w 1 www.baidu.com
```
### mtr
### nslookup
```sh
# 域名解析 ip 地址
nslookup www.baidu.com
```
### telnet
```sh
yum install -y telnet
# 检查本机到 www.baidu.com 的80端口是否畅通
telnet www.baidu.com 80
```
### tcpdump
- -i: 监听 interface
- -n: 不要把地址转换成名字（指的是主机地址，端口号等）
- -w: 把原始报文存进文件

```sh
# 抓包，本机到主机10.0.0.1
tcpdump -i any -n host 10.0.0.1
# 本机到端口80
tcpdump -i any -n port 80
# 本机到10.0.0.1的80端口
tcpdump -i any -n host 10.0.0.1 and port 80
# -w 写入到文件
tcpdump -i any -n host 10.0.0.1 and port 80 -w /tmp/tcpdumpfile
```
### netstat
### ss


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

## 软件安装
### 软件包管理
- CentOS、RedHat 使用 yum 包管理器，软件安装包格式为 rpm
- Debian、Ubuntu 使用 apt 包管理器，软件安装包格式为 deb

`apt` (Advanced Packaging Tool) 是 Linux 下的一款安装包管理工具

- debian:  `apt`或`apt-get`
- unbuntu: `apt`或`apt-get`
- fedora:  `yum`或`dnf`
- centos:  `yum`

```sh
# 安装软件
sudo apt install 软件包

# 卸载软件
sudo apt remove 软件包

# 更新已安装的包
sudo apt upgrade
```

### 下载
- curl
- wget
  ```sh
  # 下载失败后需重新下载
  wget 地址
  # 断点续传
  wget -c 地址
  ```

### 时间和日期
|命令|作用|
|-|-|
|date|查看系统时间|
|cal|(calendar) 查看日历，-y 选项可以查看一年的日历|

### 磁盘信息
|命令|作用|
|-|-|
|df -h|disk free 显示磁盘剩余空间|
|du -h [目录名]|disk usage 显示目录下的文件大小|

选项说明
|参数|含义|
|-|-|
|-h|以人性化的方式显示文件大小|

### 进程管理
|命令|作用|
|-|-|
|ps aux|process status 查看进程的详细状况|
|top|动态显示运行中的进程并且排序|
|kill [-9] pid|终止指定 pid 的进程，-9 表示强行终止|

> `ps` 默认只会显示当前用户通过终端启动的应用程序；<br/>
> 使用 `kill` 命令时，最好值终止由当前用户开启的进程，而不要终止 root 身份开启的进程，否则可能导致系统崩溃

`ps` 选项说明
|选项|含义|
|-|-|
|a|显示终端上的所有进程，包括其他用户的进程|
|u|显示进程的详细状态|
|x|显示没有控制终端的进程|

- top
  - top -c: 显示所有进程的详细信息
  - top -p pid: 查看指定进程ID
- ps
  - ps -e | more
  - ps -ef
  - ps -eLf
- pstree
- nice
  - nice 范围从-20到19，值越小优先级越高，抢占资源就越多
  - nice -n 10 ./test.sh
- renice 重新调整优先级
  - renice -n 15 ./test.sh
- &: 脚本在后台运行
  - ./test.sh &
- jobs 进程的作业控制
  - fg: 进入前台运行
  - bg: 进入后台运行
  - ctrl + z: 进程暂停进入挂起
- kill（进程间通信-信号）
  - kill -l 查看可发送的信号
  - SIGINT 通知前台进程俎终止进程 ctrl+c
  - SIGKILL 立即结束程序，不能被阻塞和处理 kill -9 pid
- pkill

### 链接
|命令|作用|
|-|-|
|ln -s 链接源文件 目标文件|建立文件的软链接，类似 windows 的快捷方式|

> 注意：
> 1. 没有 -s 选项时建立的是硬链接文件，两个文件占用相同大小的硬盘空间  
> 2. 源文件要使用**绝对路径**，不能使用相对路径，这样可以在移动链接文件后仍然能够正常使用


### 打包与压缩
扩展名：
- .tar
- .tar.gz（双扩展名可缩写为 .tgz）
- .tar.bz2（或.tar.bzip2，双扩展名可缩写为 .tbz2）

#### [tar](https://www.runoob.com/linux/linux-comm-tar.html)
打包（备份）文件，tar 只负责打包不会压缩

|选项|含义|
|-|-|
|-c (或 --create)|打包，建立新的备份文件|
|-C|用于解压缩到指定目录，注意目录必须存在|
|-x (或 --extract 或 --get)|解包，还原备份文件|
|-v (或 --verbose)|显示执行过程|
|-f (或 --file)|指定操作类型为文件|
|-z|通过 gzip 指令处理备份文件|
|-j|通过 bzip2 指令处理备份文件|

:::warning
-f 跟着文件，所以需要放在最后
:::
```sh
# 仅打包，不压缩: tar -cvf 目标备份文件名 源文件/源目录
tar -cvf log.tar 20201017.log

# 仅解包，不解压缩: tar -xvf 备份文件名
tar -xvf log.tar # 仅解包
tar -xvf log.tar -C /root # 仅解包，并指定目录

# 打包并压缩（tar 命令集成了 gzip(-z) 和 bzip2(-j) 压缩）
tar -czvf log.tar.gz 20201017.log # 打包后，用 gzip 压缩
tar -cjvf log.tar.bz2 20201017.log # 打包后，用 bzip2 压缩

# 解压缩后再解包
tar -xzvf log.tar.gz # 用 gzip 解压缩后，再用 tar 解包
tar -xjvf log.tar.bz2 # 用 bzip2 解压缩后，再用 tar 解包

# 显示压缩文件的内容
tar -tvf log.tar.gz
```

#### zip
- 压缩：zip 压缩文件名 源文件/源目录
- 解压缩：unzip 压缩文件名
  - zip 1.txt
  - zip -r book
  - unzip book.zip

#### gzip
| 命令 | 示例 | 含义 |
| ---- | --- | --- |
| gzip 源文件 | gzip 1.txt | 压缩为.gz格式的压缩文件，不保留源文件 |
| gzip -c 源文件 | gzip -c 1.txt > 1.txt.gz | 压缩为.gz格式的压缩文件，保留源文件 |
| gzip -r 目录 | gzip -r book | 压缩目录下的所有子文件，但是不压缩目录 |
| gzip -d 压缩文件名 | gzip -d 1.txt.gz | 解压缩文件，不保留压缩包 |
| gunzip 压缩文件名 | gunzip 1.txt.gz | 解压缩文件，不保留压缩包 |

#### bzip2
| 命令 | 示例 | 含义 |
| ---- | --- | --- |
| bzip2 源文件 | bzip2 1.txt | 压缩为.bz2格式的压缩文件，不保留源文件 |
| bzip2 -k 源文件 | bzip2 -k 1.txt | 压缩为.bz2格式的压缩文件，保留源文件 |
| bzip2 -d 压缩文件名 | bzip2 -d 1.txt.bz2 | 解压压缩包，不保留压缩包 |
| bunzip2 压缩文件名 | bunzip2 1.txt.bz2 | 解压压缩包，不保留压缩包 |

:::warning
bzip2不能压缩目录
:::

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
