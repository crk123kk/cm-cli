#!/usr/bin/env node

// 可以给指令带上颜色
const chalk = require('chalk');
console.log(`${chalk.cyan('crk cli 启动成功！~~')}`);

// 拿到用户输入的参数 并设置版本号
const { program } = require('commander');
const fs = require('fs')
const { rimraf } = require('rimraf');

const path = require('path')

const cwd = process.cwd();

const ora = require('ora')

const json = fs.readFileSync(path.resolve(__dirname, '../package.json'), 'utf-8')
const pkg = JSON.parse(json)

// 配置版本号
program.version(pkg.version, '-v, --version')


const inquirer = require('inquirer').default

const { checkPath, downloadTemp } = require('./utils.js')
// 配置命令
program.command('create <projectName>')
    // 别名
    .alias('c')
    // 描述
    .description('创建一个项目')
    // 回调函数，拿到用户输入的参数之后执行的函数
    .action((proName) => {
        inquirer.prompt([{
            type: 'input',// 输入框  其它输入：confirm 确认框 list 选择框 checkbox 多选框
            name: 'name',// 返回值的 key
            message: `${chalk.yellow('请输入项目名称')}`,// 描述
            default: proName,// 默认值
        },
        {
            type: 'confirm',
            name: 'isTs', // 返回值的key
            message: `${chalk.yellow('是否使用TypeScript')}`,
            default: false
        },
        ]).then(res => {
            if (!res.name) {
                console.log(`${chalk.red('项目名称不能为空')}`)
                return
            }
            if (checkPath(res.name)) {

                inquirer.prompt([{
                    type: 'list',// 输入框  其它输入：confirm 确认框 list 选择框 checkbox 多选框
                    name: 'isDelete',// 返回值的 key
                    message: `${chalk.yellow('项目已存在,是否删除当前项目')}`,// 描述
                    // default: 'yes',// 默认值
                    choices: ['yes', 'no']
                }]).then(ans => {
                    if (ans.isDelete === 'yes') {
                        const spinner = ora(`${chalk.red('正在删除...')}`)

                        spinner.start()

                        rimraf(path.join(cwd, res.name))

                        spinner.succeed(`${chalk.red('项目已删除...')}`)

                        setTimeout(() => {
                            if (res.isTs) {
                                downloadTemp('TS', res.name)
                            } else {
                                downloadTemp('JS', res.name)
                            }
                        }, 1000)
                    }
                })
                return
            }
            if (res.isTs) {
                downloadTemp('TS', res.name)
            } else {
                downloadTemp('JS', res.name)
            }
        })
    })


program.parse(process.argv)