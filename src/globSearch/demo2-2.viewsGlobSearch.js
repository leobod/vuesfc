const fs = require('fs')
const { glob, globSync } = require('glob')


const jsFiles = globSync('**/views/**/*.vue', { ignore: 'node_modules/**', cwd: 'D:/project/BMRS2.0/CacheProject/BMRS2.0Web' })

let result = []
for (const item of jsFiles) {
    const pList = item.split('\\')
    console.log(pList)
    result.push(pList)
    // if (pList && pList.length >= 3) {
    //     const itemName = pList[2].replace('.js', '')
    //     result.push(itemName)
    // }
}

const jsonString = JSON.stringify(result, null, 2);

fs.writeFile("./globViewsResult.json", jsonString, "utf8", (err) => {
    if (err) {
        console.error(err);
        return;
    }
    console.log("JSON对象成功写入文件中。");
});
