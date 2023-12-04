/**
 * 方案1： 使用解析一步步处理，过于繁琐，无法定位自己需要的最终结果
 * 方案2： 使用require,直接一步到位拿到最后的config并按需使用自己需要的结果，简单明了
 *          对于vue3 vite.config.js 也有适用性
 */

const config = require('./vue.config')

console.log(config)

console.dir(config.configureWebpack)