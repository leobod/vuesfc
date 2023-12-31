const tsCompiler = require('typescript');              // TS编译器

// 待分析代码片段字符串
const tsCode = `import { app } from 'framework';                    

const dataLen = 3;
let name = 'iceman';

if(app){
    console.log(name);
}

function add (a, b) {
  const app = 'app'
  return a + b + app
}

function getInfos (info: string) {
    const result = app.get(info);
    return result;
}`;

// 获取AST
const ast = tsCompiler.createSourceFile('xxx', tsCode, tsCompiler.ScriptTarget.Latest, true);
console.log(ast);

const apiMap = {};                               // 记录API分析结果

function walk (node) {                                                  // AST遍历函数
  tsCompiler.forEachChild(node, walk);                                            // 遍历AST节点
  const line = ast.getLineAndCharacterOfPosition(node.getStart()).line + 1;       // 获取节点所在行
  if(tsCompiler.isIdentifier(node) && node.escapedText ==='app') {                // 判断isIdentifier节点名称是否为app
    if(Object.keys(apiMap).includes(node.escapedText)){
      apiMap[node.escapedText].callNum++;
      apiMap[node.escapedText].callLines.push(line);
    }else{
      apiMap[node.escapedText] = {}
      apiMap[node.escapedText].callNum =1;
      apiMap[node.escapedText].callLines = [];
      apiMap[node.escapedText].callLines.push(line);
    }
  }
}

walk(ast);

console.log(apiMap);
