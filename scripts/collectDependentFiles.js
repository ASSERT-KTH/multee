const args = process.argv.slice(2)
const project = args[0]
const fs = require('fs')

const jsonData = fs.readFileSync(`Playground/${project}/dependency-tree.json`)
const dataObj = JSON.parse(jsonData)

function convertDepTree(dataObj) {
    let wrappedTree = {}
    for (let key in dataObj) {
        wrappedTree['path'] = key
        wrappedTree['children'] = []
        const value = dataObj[key]
        wrappedTree['children'] = turnValueToChildren(value, key)
    }
    return wrappedTree
}

function turnValueToChildren(value, parent) {
    let children = []

    for (let key in value) {
        const child = {
            'path': key,
            'parent': parent,
            'children': turnValueToChildren(value[key], key)
        }
        children.push(child)

        // record parents for each json node. 
        // The reason for only recording json is that only json files can not be
        // recognized by unused-files list which is generated by stubbifier, since
        // stubbifier only records js files.
    }
    return children
}

const result = convertDepTree(dataObj)
fs.writeFileSync(`Bigdata/${project}_wrapped-dependency-tree.json`, JSON.stringify(result))