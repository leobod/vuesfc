// load using import
// import { glob, globSync, globStream, globStreamSync, Glob } from 'glob'

// or using commonjs, that's fine, too
const {
    glob,
    globSync,
    globStream,
    globStreamSync,
    Glob,
} = require('glob')

// the main glob() and globSync() resolve/return array of filenames

// all js files, but don't look in node_modules
// const jsFiles = await glob('**/*.js', { ignore: 'node_modules/**' })

// const jsFiles = globSync('**/*.js', { ignore: 'node_modules/**', cwd: 'F:/opensource/CodeSnap' })

const jsFiles = globSync('**/api/*.js', { ignore: 'node_modules/**', cwd: 'D:/project/BMRS2.0/CacheProject/BMRS2.0Web' })
// console.log(jsFiles)

let apiController = []
for (const item of jsFiles) {
    const pList = item.split('\\')
    if (pList && pList.length >= 3) {
        const apiName = pList[2].replace('.js', '')
        apiController.push(apiName)
    }
}
console.log(apiController)
