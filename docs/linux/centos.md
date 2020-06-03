# CentOS

### 目录
| Name | Description |
| :--: | ----------- |
| /bin | 存放二进制可执行文件 |
| /boot| 存放用于系统引导时使用的各种文件及内核 |
| /dev | 存放设备文件 |
| /etc | 存放系统管理和配置文件(cron.d定时任务；firewalld防火墙；hosts；my.cnf mysql配置文件；ngnix；rc.d开机自动启动脚本；rpm；ssh；sysconfig内容较多，包含网卡配置文件；vimrc) |
| /home | 存放所有用户⽂件的根目录，是⽤户主目录的基点，⽐如⽤户user的主目录就是/home/user，可以用~user表示 |
| /lib | 存放跟文件系统中的程序运行所需要的共享库及内核模块。共享库又叫动态链接共享库，作用类似windows里的dll文件，存放了根文件系统程序运行所需的共享文件。 |
| /mnt | 系统管理员安装临时文件系统的安装点，系统提供这个⽬录是让⽤户临时挂载其他的⽂件系统。 |
| /opt | 额外安装的可选应⽤程序包所放置的位置。 |
| /proc | 虚拟⽂件系统目录，是系统内存的映射（不保存在硬盘，储存在内存中）。可直接访问这个目录来获取系统信息（如cpuinfo/meminfo）。 |
| /root | 超级⽤户(系统管理员)的主目录 |
| /tmp | 用于存放各种临时⽂件，是公⽤的临时⽂件存储点。 |
| /usr | ⽤于存放系统应⽤程序，⽐较重要的⽬录/usr/local本地系统管理员软件安装目录 (安装系统级的应用)。这是最庞大的⽬目录，要用到的应用程序和文件⼏乎都在这个目录。 |
| /var | ⽤于存放运行时需要改变数据的⽂件，也是某些⼤文件的溢出区，⽐方说/var/log各种服务的日志⽂件(系统启动⽇志等。)等。 |

::: danger
**修改配置文件**时一定要**先备份再修改**
:::
::: tip
- 动态库：Windows系统下是.dll文件，Linux系统下是.so文件
- 静态库：Windows和Linux系统下都是.lib文件
:::

### Mac VMware Fusion
- [联网问题](https://garryshield.github.io/2016/11/01/mac-vmware-network/)
- 重启网络命令
  - systemctl restart network
  - service restart network
:::tip
centos8重启网络命令报错：Failed to restart network.service: Unit network.service not found.

改用NetworkManager重启：[systemctl restart NetworkManager](https://www.golinuxcloud.com/unit-network-service-not-found-rhel-8-linux/)
:::
