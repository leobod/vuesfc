const {
    glob,
    globSync,
    globStream,
    globStreamSync,
    Glob,
} = require('glob')

const jsFiles = globSync('**/api/*.js', { ignore: 'node_modules/**', cwd: 'D:/project/BMRS2.0/CacheProject/BMRS2.0Web' })

let apiController = []
for (const item of jsFiles) {
    const pList = item.split('\\')
    if (pList && pList.length >= 3) {
        const apiName = pList[2].replace('.js', '')
        apiController.push(apiName)
    }
}

console.log(apiController)
