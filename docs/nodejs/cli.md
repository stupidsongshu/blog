# CLI
[Node.js CLI 应用程序最佳实践](https://github.com/lirantal/nodejs-cli-apps-best-practices/)

## 本地开发
- npm init -y
- package.json 添加 bin 字段
- bin文件使用node解析：`#!/usr/bin/env node`
- npm link

## 命令行美化
- figlet
- @darkobits/lolcatjs

## 依赖库
- commander ([yargs](https://github.com/yargs/yargs) [minimist](https://github.com/substack/minimist))
- inquirer
- shelljs
- ora
- clear
- chalk
- semver
