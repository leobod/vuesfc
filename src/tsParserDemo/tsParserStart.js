// TS编译器
const tsCompiler = require('typescript');

// 判断节点类型的函数，返回值类型为 boolean
// tsCompiler.isFunctionDeclaration(node);            // 判定是否为函数声明节点
// tsCompiler.isArrowFunction(node);                  // 判定是否为箭头函数
// tsCompiler.isTypeReferenceNode(node);              // 判定是否为Type类型节点
// tsCompiler.isVariableDeclaration(node);            // 判定是否为变量声明节点
// tsCompiler.isIdentifier(node);                     // 判定是否为Identifier节点
//
// 可以通过 ast 对象上的 getLineAndCharacterOfPosition 方法获取当前遍历节点的代码行信息
// 获取当前node节点所在代码行
// ast.getLineAndCharacterOfPosition(node.getStart()).line + 1;

// 待分析代码片段字符串
const tsCode = `import { app } from 'framework';                                

const dataLen = 3;
let name = 'iceman';

if(app){
    console.log(name);
}

function getInfos (info: string) {
    const result = app.get(info);
    return result;
}`;

// 第一个参数为命名，可以随意填，
// 第二个参数是需要生成AST的源代码字符串
// 第三个参数表示TS编译器版本
// 第四个参数表示是否添加parent节点信息
const ast = tsCompiler.createSourceFile('test_ts_ast', tsCode, tsCompiler.ScriptTarget.Latest, true);
console.log(ast);


// // TS编译器
// const tsCompiler = require('typescript');
//
// // 创建Program
// // fileNames参数表示文件路径列表，是一个数组
// // options参数是编译选项，可以理解成tsconfig
// const program = tsCompiler.createProgram(fileNames, options);
//
// // 从 Program 中获取某个文件的 SourceFile
// // fileName表示某一个文件路径
// const ast = program.getSourceFile(fileName);
// console.log(ast);

