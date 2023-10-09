
const compiler = require('vue-template-compiler');
const fs = require('fs');

// 读取.vue文件内容
const fileContent = fs.readFileSync('D:/project/Thyssenkrupp/ThyssenkruppWeb/src/views/Login/index.vue', 'utf-8');

// 解析.vue文件
const parsedComponent = compiler.parseComponent(fileContent);

// 获取模板部分
const template = parsedComponent.template;

// 提取模板中的组件信息
const components = [];
const componentRegex = /<([a-zA-Z]+)[^>]*>/g;
let match;
while ((match = componentRegex.exec(template))) {
  components.push(match[1]);
}

console.log(components); // 输出: ['MyComponent', 'AnotherComponent']
