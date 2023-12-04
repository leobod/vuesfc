
const compiler = require('vue-template-compiler');
const fs = require('fs');
const p = require('path');
const cheerio = require('cheerio');

// 读取.vue文件内容
const filePath = p.join(__dirname, "./BtnGroup.vue");
const fileContent = fs.readFileSync(filePath, "utf-8");

// 解析.vue文件
const parsedComponent = compiler.parseComponent(fileContent);


// 获取模板部分
const template = parsedComponent.template;
console.log(template)

const $ = cheerio.load(template.content);
// console.dir($)
console.dir($._root)

// 获取脚本部分
const script = parsedComponent.script;

// 获取样式部分
const styles = parsedComponent.styles;
