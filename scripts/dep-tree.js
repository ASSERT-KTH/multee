const args = process.argv.slice(2)
const folderPath = args[0]
const entryFile = args[1]

let fs = require('fs')
let dependencyTree = require('dependency-tree')

fs.writeFileSync(`./${folderPath}/dependency-tree-list.txt`, '')

let tree = dependencyTree({
    filename: `${folderPath}/${entryFile}`,
    directory: `./${folderPath}`
})

// var list = dependencyTree.toList({
//     filename: `${folderPath}/${entryFile}`,
//     directory: `./${folderPath}`
// })
// console.log(tree)
// let data = JSON.stringify(tree)
let out = "[" + Object.entries(tree).map(el => JSON.stringify(el)).join(",") + "]"
fs.writeFileSync(`./${folderPath}/dependency-tree.json`, out)

// list.forEach(function (file) {
//     file += '\n'
//     fs.appendFileSync(`./${folderPath}/dependency-tree-list.txt`, file)
// })
