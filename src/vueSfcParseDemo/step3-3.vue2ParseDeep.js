/**
 * 方法一: 使用vue-template-compiler解析后，手动处理script.content，用正则匹配methods段，匹配容易失败
 * 方法二: 使用vue-template-compiler解析后，使用acorn来解析，无法有效的处理注释段
 * 当前方法：使用vue-template-compiler解析后，使用babel来解析。目前符合后续的要求
 */

const p = require("path");
const compiler = require("vue-template-compiler");
const parser = require("@babel/parser");
const fs = require("fs");

const filePath = p.join(__dirname, "./BtnGroup.vue");
const fileContent = fs.readFileSync(filePath, "utf-8");

const com = compiler.parseComponent(fileContent);

const htmlContent = (com.template && com.template.content) || null;
const scriptContent = (com.script && com.script.content) || null;
const scriptSetupContent = (com.scriptSetup && com.scriptSetup.content) || null;
const styleContent = (com.styles && com.styles.content) || null;

// console.log(scriptContent)

// 使用 Acorn 解析脚本内容生成AST
const ast = parser.parse(scriptContent, {
    sourceType: "module",
    // plugins: ['jsx', 'typescript'],
    attachComment: true,
});

console.dir(ast);

// 获取所有注释
const comments = ast.comments;

// 打印注释
comments.forEach((comment) => {
    console.log(`Comment: ${comment.value}`);
    console.log(
        `Location: ${comment.loc.start.line}:${comment.loc.start.column} - ${comment.loc.end.line}:${comment.loc.end.column}`
    );
});

// const jsonString = JSON.stringify(ast)
const jsonString = JSON.stringify(ast, null, 2);

fs.writeFile("./data.json", jsonString, "utf8", (err) => {
    if (err) {
        console.error(err);
        return;
    }
    console.log("JSON对象成功写入文件中。");
});
