const fs = require('fs')
const path = require('path')
const compilerSfc = require('@vue/compiler-sfc')

const inputFile = path.resolve(__dirname, 'test.vue')
const fileContent = fs.readFileSync(inputFile, { encoding: 'utf8' })
const { descriptor, errors } = compilerSfc.parse(fileContent)
if (descriptor.scriptSetup) {
  console.log('script----\n')
  // Compile script block:
  const compiled = compilerSfc.compileScript(descriptor, { id: 'test.vue' })
  // console.log(compiled)
  for (const item of compiled.scriptSetupAst) {
    console.log(item)
    for (const inner of item.declarations) {
      console.log(inner)
    }
  }
}

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
