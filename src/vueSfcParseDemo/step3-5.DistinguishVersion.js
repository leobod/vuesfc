const fs = require('fs');
const p = require('path');

const pkgPath = p.join(process.cwd(), './package.json')
// console.log(pkgPath)

const pkgContent = fs.readFileSync(pkgPath, 'utf-8');
// console.log(pkgContent);

let pkgVal = {}
try {
    pkgVal = JSON.parse(pkgContent)
} catch (e) {
    pkgVal = {}
}
// console.log(pkgVal);

const allDeps = { ...pkgVal.dependencies, ...pkgVal.devDependencies }

for (const key in allDeps) {
    const val = allDeps[key]
    if (key === 'systeminformation') {
        // console.log(val)
        const version = val.replace('^', '').replace('~', '')
        const versionList = version.split('.')
        const majorVersion = versionList && versionList[0] || null
        const minorVersion = versionList && versionList[1] || null
        const patchVersion = versionList && versionList[2] || null
        // console.log(majorVersion, '\n', minorVersion, '\n', patchVersion)
        console.log([majorVersion, minorVersion, patchVersion])
    }
}
