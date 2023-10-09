const fs = require('fs')
const path = require('path')
const compilerSfc = require('@vue/compiler-sfc')

const inputFile = path.resolve(__dirname, 'test.vue')
const fileContent = fs.readFileSync(inputFile, { encoding: 'utf8' })
const result = compilerSfc.parse(fileContent)

console.log(result)

// const { descriptor, errors } = compilerSfc.parse(fileContent)
// console.log(descriptor)

/* 查看模板信息 */
/* type 1(element 或 组件) 2(text) 3(comment) 4(event click 与 click方法记录)  6(atttibute) 7(数据绑定 on 或 bind { exp, arg }) */
// console.log(descriptor.template.ast) // template
// console.log(descriptor.template.ast.children[1]) // 注释
// console.log(descriptor.template.ast.children[3]) // div元素
// console.log(descriptor.template.ast.children[3].props[0].value)
// console.log(descriptor.template.ast.children[3].children[3])

// console.log(descriptor.template.ast.children[3].children[3].children[7]) // van-button
// console.log(descriptor.template.ast.children[3].children[3].children[7].props[1])
// console.log(descriptor.template.ast.children[3].children[3].children[7].props[5])

// if (descriptor.scriptSetup) {
//   console.log('script----\n')
//   // Compile script block:
//   const compiled = compilerSfc.compileScript(descriptor, { id: 'test.vue' })
//   // console.log(compiled)
//   for (const item of compiled.scriptSetupAst) {
//     console.log(item)
//     for (const inner of item.declarations) {
//       console.log(inner)
//     }
//   }
// }

// console.log('template----\n')
// if (descriptor.template) {
//   // Compile template block:
//   const compiled = compilerSfc.compileTemplate({
//     source: descriptor.template.content,
//     filename: inputFile,
//     compilerOptions: {
//       scopeId: 'my-component'
//     }
//   })
//   console.log(compiled)
// }
//
// console.log('styles----\n')
// if (descriptor.styles) {
//   // Compile style blocks:
//   descriptor.styles.forEach((style, index) => {
//     const compiled = compilerSfc.compileStyle({
//       source: style.content,
//       filename: inputFile,
//       id: `my-component-${index}`,
//       scoped: !!style.scoped,
//       modules: !!style.module
//     })
//     console.log(compiled)
//   })
// }
