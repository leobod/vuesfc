const acorn = require('acorn');

// 假设你已经有一个经过Acorn解析后的AST
const ast = acorn.parse('/* 注释 */ function greet(name) { console.log("Hello, " + name + "!"); }',
  {
    locations: true,
    sourceType: 'module',
    ecmaVersion: 2022
  }
);

// console.log(ast)
console.log(ast.body[0])
// console.log(ast.body[0].body.body)
// console.log(ast.body[0].body.body[0].expression)

// 定义一个辅助函数，用于将AST节点转回原始函数字符串
function convertNodeToOriginalFunction(node) {
  if (node) {
    if (node.type === 'Program') {
      return convertNodeToOriginalFunction(node.body[0]);
    }
    if (node.type === 'FunctionDeclaration') {
      const functionName = node.id.name;
      const params = node.params.map(param => param.name).join(', ');
      const body = convertNodeToOriginalFunction(node.body);
      return `function ${functionName}(${params}) ${body}`;
    }

    if (node.type === 'BlockStatement') {
      const statements = node.body.map(convertNodeToOriginalFunction).join(' ');
      return `{ ${statements} }`;
    }

    if (node.type === 'ExpressionStatement') {
      return convertNodeToOriginalFunction(node.expression);
    }

    if (node.type === 'CallExpression') {
      const callee = convertNodeToOriginalFunction(node.callee);
      const args = node.arguments.map(convertNodeToOriginalFunction).join(', ');
      return `${callee}(${args})`;
    }
    if (node.type === 'MemberExpression') {
      return `${node.object.name}.${node.property.name}`
    }

    if (node.type === 'Identifier') {
      return node.name;
    }

    if (node.type === 'Literal') {
      return JSON.stringify(node.value);
    }

    if (node.type === 'BinaryExpression') {
      console.log(node)
      const left = convertNodeToOriginalFunction(node.left);
      const right = convertNodeToOriginalFunction(node.right);
      return `${left} ${node.operator} ${right}`
    }

  }
  // 处理其他类型的节点...

  return '';
}

// 遍历AST并将节点转回原始函数字符串
function convertAstToOriginalFunction(ast) {
  return convertNodeToOriginalFunction(ast);
}

// 将AST转回原始函数字符串
const originalFunction = convertAstToOriginalFunction(ast);

console.log(originalFunction); // function greet(name) { console.log("Hello, " + name + "!"); }
