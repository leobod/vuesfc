/**
 * 方法一: 使用vue-template-compiler解析后，手动处理script.content，用正则匹配methods段，匹配容易失败
 * 方法二: 使用vue-template-compiler解析后，使用acorn来解析，无法有效的处理注释段
 * 当前方法：使用vue-template-compiler解析后，使用babel来解析。目前符合后续的要求
 */

const compiler = require('vue-template-compiler');
const parser = require('@babel/parser');
const fs = require('fs');

const filePath = 'D:/project/src/Test/index.vue';
const fileContent = fs.readFileSync(filePath, 'utf-8');

const com = compiler.parseComponent(fileContent);

const htmlContent = com.template.content;
const scriptContent = com.script.content;
const styleContent = com.styles.content;

// console.log(scriptContent)

// 使用 Acorn 解析脚本内容生成AST
const ast = parser.parse(scriptContent, {
    sourceType: 'module',
    // plugins: ['jsx', 'typescript'],
    attachComment: true,
});

console.dir(ast)

// 获取所有注释
const comments = ast.comments;

// 打印注释
comments.forEach(comment => {
    console.log(`Comment: ${comment.value}`);
    console.log(`Location: ${comment.loc.start.line}:${comment.loc.start.column} - ${comment.loc.end.line}:${comment.loc.end.column}`);
});
