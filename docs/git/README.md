- Worksapce: 工作区
- Index/Stage: 暂存区
- Repository: 本地仓库
- Remote: 远程仓库

HEAD: 始终指向当前所处分支的最新的提交点，实质上是一个指针，指向最新放入仓库的版本。

### 新建代码库
- git init: 在当前目录新建一个git代码库
- git init [project-name]: 新建一个目录，将其初始化为git代码库

### 工作区向暂存区添加
- git add [file1] [file2]: 添加工作区的指定文件到暂存区
- git add *.html: 添加工作区的指定类型文件（使用通配符方式批量提交）到暂存区
- git add [dir]: 添加工作区的指定目录到暂存区
- git add .: 添加工作区当前目录下的所有存在更改文件到暂存区（包括提交新文件(new)和被修改(modified)文件，不包括被删除(deleted)文件）
- git add -u: 添加已经被add的文件且存在更改的文件（Git根路径以下所有文件）到暂存区（提交被修改(modified)和被删除(deleted)文件，不包括新文件(new)）
- git add --all(简写git add -A): 添加所有变化（Git根路径以下所有文件）到暂存区（包括提交新文件(new)、被修改(modified)文件以及被删除(deleted)文件）

### 暂存区向本地仓库提交代码
- git commit -m [message]: 提交暂存区到仓库区
- git commit [file1] [file2] -m [message]: 提交暂存区的指定文件到仓库区
- git commit -a: 提交工作区自上次commit之后的变化，直接到仓库区
- git commit -v: 提交时显示所有的diff信息
- git commit --amend: 修改上一次commit
- git commit --amend -m [message]: 使用一次新的commit，替代上一次提交，如果代码没有任何变化，则用来改写上一次commit的提交信息
- git commit --amend [file1] [file2]: 修改上一次commit，并包括指定文件的新变化

### 查看工作区、暂存区、本地仓库之间的代码差异
- git diff: 工作区和暂存区的代码差异
- git diff HEAD: 工作区和当前分支最新commit的代码差异
- git diff --cached [file]: 暂存区和上一个commit的代码差异

### 分支
- git branch: 所有本地分支
- git branch -r: 所有远程分支
- git branch -a: 所有本地分支和远程分支
- git branch [branch-name]: 新建一个分支，但依然停留在当前分支
- git branch -d [branch]: 删除本地分支
- git branch -dr [remote-branch]: 删除远程分支
- git checkout [branch-name]: 切换到指定分支，并更新工作区
- git checkout -b [branch-name]: 新建一个分支，并切换到这个新建的分支
- git branch --track [remote-branch] [branch]: 新建一个分支，并与指定远程分支建立追踪关系
- git branch --set-upstream-to [remote-branch] [branch]: 将现有的指定分支与远程分支建立追踪关系
- git checkout -: 切换到上一分支
- git merge [branch]: 合并指定分支到当前分支
- git cherry-pick [commit]: 选择一个commit，合并进当前分支

### 远程仓库
- git remote update: 更新远程仓库
- git remote -v: 显示所有远程仓库
- git remote show [remote]: 显示指定远程仓库信息
- git remote add [shortname] [url]: 增加一个新的远程仓库，并命名
- git pull [remote] [branch]: 拉取远程仓库的变化，并与本地分支合并
- git push [remote] [branch]: 推送本地分支到远程仓库
- git push [remote] --force: 强行推送当前分支到远程仓库
- git push [remote] --all: 推送所有分支到远程仓库

### 撤销
- git checkout [commit] [file]: 恢复暂存区的指定文件到工作区

### 储藏
- git stash: 储藏
- git stash list: 查看现有的储藏
- git stash apply [stash@{0}}: 应用储藏(但是被暂存的文件没有重新被暂存)
- git stash apply --index: 应用储藏(在运行 git stash apply 命令时带上一个 --index 的选项来告诉命令重新应用被暂存的变更)
- git stash show -p [stash@{0}] | git apply -R: 取消储藏
- git stash drop: 删除指定储藏内容
- git stash pop: 恢复并删除指定储藏内容
- git stash branch [branch]: 从储藏中创建分支，检出你储藏工作时的所处的提交，重新应用你的工作，如果成功，将会丢弃储藏。

### 查看commit历史
- git log: 查看提交历史
- git log -p: 查看每个commit的具体改动
- git log --stat: 查看每次更新的修改文件的统计信息
- git log --shortstat: 只显示--stat中最后的行数添加修改删除统计
- git log --name-only: 只在已修改的提交信息后显示文件清单
- git log --name-status: 显示新增、修改和删除的文件清单
- git log --abbrev-commit: 仅显示SHA-1的前几个字符，而非所有的40个字符
- git log --relative-date: 使用较短的相对时间显示
- git log --graph: 显示ASCII图形表示的分支合并历史
- git log --pretty [--oneline]: 使用其他格式显示历史提交信息[一行]
- git show: 查看最新commit的改动
- git show [commit]: 查看指定commit的改动

:::warning
# git reset --hard 血泪史

当我们 `git reset --hard` 操作进行了版本回退，现在又需要之前的修改信息，也就是说我们需要版本回退之前的文件信息，此时分为三种情况：
- 之前的修改没有进行 `git add`，**目前无能为力不能恢复**
- 之前的修改进行了 `git add` 但没有 `git commit`，这种情况还可以抢救。
  - 第一步：`git fsck --lost-found`
  - 第二步：`git show [blob] > 文件`
- 之前的修改进行了 `commit` 提交，这种最简单，执行 `git reflog` 拿到哈希值后再 `git reset` 即可

参考链接：
- [https://juejin.im/post/5af0438f5188251b8015967e](https://juejin.im/post/5af0438f5188251b8015967e)
- [https://juejin.im/post/5ce4ddb351882532e9631951](https://juejin.im/post/5ce4ddb351882532e9631951)
- [http://gitready.com/advanced/2009/01/17/restoring-lost-commits.html](http://gitready.com/advanced/2009/01/17/restoring-lost-commits.html)
- [http://www.programblings.com/2008/06/07/the-illustrated-guide-to-recovering-lost-commits-with-git/](http://www.programblings.com/2008/06/07/the-illustrated-guide-to-recovering-lost-commits-with-git/)
:::