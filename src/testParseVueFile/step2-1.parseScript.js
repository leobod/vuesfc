
const compiler = require('vue-template-compiler');
const acorn = require('acorn');
const fs = require('fs');

// 读取.vue文件内容
const fileContent = fs.readFileSync('D:/project/Thyssenkrupp/ThyssenkruppWeb/src/views/Login/index.vue', 'utf-8');

// 解析.vue文件
const parsedComponent = compiler.parseComponent(fileContent);

// 获取脚本部分
const script = parsedComponent.script;
// console.log(script.content)


// 使用 Acorn 解析脚本内容生成AST
const ast = acorn.parse(script.content, {
  sourceType: 'module'
})

// console.log(ast.body[3])
console.log(ast.body[3].declaration.properties)
