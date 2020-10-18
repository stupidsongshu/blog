# Shell

## iterm2
- `command + d` 垂直分屏
- `command + shift + d` 水平分屏
- `command + enter` 切换全屏
- `command + n` 新建窗口
- `command + t` 新建标签
- `command + w` 关闭标签
- `command + shift + 左右方向键` 或 ``command + 1/2/3` 切换标签
- `command + shift + i` 多标签同时执行同一个命令
- `command +` 查看历史命令
- `control + k` 删除到文本末尾
- `control + u` 清除当前行
- `control + a/e` 跳到行首/行尾
- `option + 左右方向键` 按单词前移/后移
  - [Mac下iTerm2光标按照单词快速移动设置](https://blog.csdn.net/skyyws/article/details/78480132)

### [Mac 命令行代理 privoxy + ClashX + iTerm2](https://baisheng.me/mac-privoxyclashxiterm2)
```sh
# 安装 Homebrew
/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"

# 安装 ClashX
[下载最新版](https://github.com/yichengchen/clashX/releases)

# 安装Privoxy
brew install Privoxy

# 配置 Proivoxy
# 修改 /usr/local/etc/privoxy/config 文件添加如下2行
forward-socks5   /            127.0.0.1:7981.  （注意：7981是ClashX socks默认的端口）
listen-address  0.0.0.0:7980

# 启用 Proivoxy
brew services start privoxy

export https_proxy=http://127.0.0.1:7890 http_proxy=http://127.0.0.1:7890 all_proxy=socks5://127.0.0.1:7891
# 或者在 ~/.bash_profile 或 ~/.zshrc 文件中加入
vim ~/.zshrc
alias goproxy='export http_proxy=http://127.0.0.1:7890 https_proxy=http://127.0.0.1:7890 all_proxy=sock5://127.0.0.1:7891'
alias disproxy='unset http_proxy https_proxy all_proxy'
source ~/.zshrc

curl http://cip.cc
curl -i https://www.google.com
```

## 通配符
shell 内建的符号，用于操作多个相似有规律的文件

常用通配符：
- * 匹配任意字符
- ? 匹配任意一个字符
- [xyz] 匹配xyz中的任意一个字符
- [a-z] 匹配范围a-z中的任意一个字符
- [!xyz] 或 [^xyz] 不匹配
### shell 脚本示例
```sh
# 编写可执行 shell
vim hello.sh

#!/bin/bash
echo -e "\e[1;34m hello world \e[0m"
chmod 755 hello.sh
./hello.sh
#或通过Bash调用执行脚本
bash ./hello.sh
```

```sh
#!/bin/bash
# error_log.sh: 统计当天错误日志数量（error 包括接口、cli脚本）
date=`date +'%Y%m'`
day=`date +'%d'`
log_dir=/data/php/ironman/runtime/log/$date
log_file_name=$day'_error'

echo $log_dir

error_count=0

for file in `ls $log_dir | grep $log_file_name`;
do
  # 以 error 为错误标识，统计行数
  count=`cat $file | grep 'error' | wc -l`
  echo $file': '$count
  ((error_count=$error_count+$count))
done

echo 'done. error_count: '$error_count
```

```sh
#!/bin/bash
# delete_message_user.sh: 删除7天前数据，只保留最近7天数据
date=`date -d -7day +%Y-%m-%d`
echo $date

id=`mysql -uroot -p'4rfv&UJM' -e "SELECT id FROM ironman.t_message_user WHERE create_time<='$date' order by id desc limit 1 \G;" |grep 'id:' |awk '{print $2}'`
echo $id

# 成功删除行数
success=0
# 总的删除行数
total_count=`mysql -uroot -p'4rfv&UJM' -e "SELECT count(*) as total_count FROM ironman.t_message_user WHERE id<='$id' \G;" | grep total_count | awk '{print $2}'`

if [ $id ];then
  for((;;))
  do
    row=`mysql -uroot -p'4rfv&UJM' -vv -e "DELETE FROM ironman.t_message_user WHERE id<='$id' limit 2 \G;" | grep 'Query OK,' | awk '{print $3}'`
    echo $row
    if [ $row -gt '0' ];then
      ((success=$success+$row))
    else
      break
    fi
  sleep 1
  done
fi

echo 'done. count: '$total_count'; success: '$success
```

```sh
#!/bin/bash
# ironman_move_logSpreadClick.sh: 表数据量太大，需要做表数据迁移并备份
date=`date -d -7day +'%Y-%m-%d'`
table='ironman.t_log_spread_click'
history_table='ironman.t_log_spread_click_history'

echo $date

# 0. 搬移数据: t_log_spread_click -> t_log_spread_click_history
/usr/local/php/bin/php /data/php/ironman/think move logSpreadClick $date
sleep 1

# 1. 搬移后删除源数据
id=`/usr/local/mysql/bin/mysql -uroot -p'4rfv&UJM' -e "SELECT id FROM $table WHERE create_time<'$date' order by id desc limit 1 \G;" | grep 'id:' | awk '{print $2}'`
echo 'max id:'$id

# 成功删除行数
success=0

if [ $id ];then
  for((;;))
  do
    row=`/usr/local/mysql/bin/mysql -uroot -p'4rfv&UJM' -vv -e "use ironman;SET SESSION binlog_format = 'STATEMENT';DELETE FROM $table WHERE id<='$id' limit 1000 \G;" | grep 'Query OK,' | grep 'warning' | awk '{print $3}'`
    echo $row
    if [ $row -gt '0' ];then
      ((success=$success+$row))
    else
      break
    fi
  sleep 1
  done
else
  echo 'done. 没有数据删除'
  exit
fi

echo 'delete done. success: '$success

# 2. history 表导出为 sql
date=`date -d -7day +'%Y%m%d'`
sql_path=/data/db/bak/$history_table.$date.sql
/usr/local/mysql/bin/mysqldump -uroot -p'4rfv&UJM' -t ironman t_log_spread_click_history > $sql_path

echo 'mysqldump:'$sql_path

# 3. 压缩 sql 文件
gzip $sql_path

echo 'gzip done'
# 4. 原表进行整表删除
/usr/local/mysql/bin/mysql -uroot -p'4rfv&UJM' -e "use ironman;truncate table t_log_spread_click_history"
echo 'truncate done.'

echo 'done'
```
