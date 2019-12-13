## 前端工程化

### 免密登录
- 1. 生成秘钥对
  - ssh-keygen -t rsa -C "指定标识" -f "指定文件名"
  - 直接按连续两次回车
- 2. 上传配置公钥
  - 上传公钥到服务器对应账号的~路径下的.ssh/中(ssh-copy-id -i "公钥文件名" 用户名@服务器ip或域名)
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