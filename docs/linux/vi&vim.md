# vi/vim
[vim](https://www.vim.org/)

[vim doc](http://vimdoc.sourceforge.net/)

分为两种模式：
- 查看模式 (i)
- 编辑模式 (esc)

配置文件：~/.vimrc

| vim Command | Description/Purpose |
| - | - |
| :syntax on  | Enabling vi/vim syntax colors |
| :syntax off | Disabling vi/vim syntax colors |
| :colorscheme foo | Specifying a colorscheme called foo.<br/>Use ‘/usr/share/vim/vim*/colors/’ to find installed color scheme |
| :w | 保存 |
| :q | 退出 |
| :wq | 保存后退出 |
| :q! | 不保存退出 |
| :! | 强制保存 |
| :ls | 列出所有的文件 |
| :n | 下一个 |
| :N | 上一个 |
| :10 | 跳到指定行 |
| /xxx | 从光标位置开始向后搜索xxx字符串 |
| ?xxx | 从光标位置开始向前搜索xxx字符串 |

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
