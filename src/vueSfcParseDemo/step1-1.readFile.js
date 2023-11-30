
const compiler = require('vue-template-compiler');
const fs = require('fs');

// 读取.vue文件内容
const fileContent = fs.readFileSync('D:/project/Thyssenkrupp/ThyssenkruppWeb/src/views/Login/index.vue', 'utf-8');

// 解析.vue文件
const parsedComponent = compiler.parseComponent(fileContent);


// 获取模板部分
const template = parsedComponent.template;

// 获取脚本部分
const script = parsedComponent.script;

// 获取样式部分
const styles = parsedComponent.styles;
