
const compiler = require('vue-template-compiler');
const fs = require('fs');

// 读取.vue文件内容
const fileContent = fs.readFileSync('D:/project/Thyssenkrupp/ThyssenkruppWeb/src/views/Login/index.vue', 'utf-8');

// 解析.vue文件
const parsedComponent = compiler.parseComponent(fileContent);

// 获取模板部分
const template = parsedComponent.template;

// 获取模板部分
const result = compiler.compile(template.content, {});

// console.log(result.ast)
// console.log(result.ast.children)
console.log(result.ast.children[0].children)
