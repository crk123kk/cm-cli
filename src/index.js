#!/usr/bin/env node
// 当在控制台执行 cm-cli 的时候，控制系统会用node执行下方的命令（切换 node环境）
console.log('crk cli 启动成功！');

// 拿到用户输入的参数 并设置版本号
import { program } from 'commander';
import fs from 'fs'
import path from 'path';

const json = fs.readFileSync(path.resolve('./package.json'), 'utf-8')
const pkg = JSON.parse(json)

// 配置版本号
program.version(pkg.version, '-v, --version')

program.parse(process.argv)