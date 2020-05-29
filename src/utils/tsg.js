const fileNames = (path,extension)=> {
  const req = require.context(path, false, new RegExp("\."+extension+"$","g"))
  const requireAll = requireContext => requireContext.keys()
  const re = new RegExp("\.\/(.*)\."+extension)
  const svgIcons = requireAll(req).map(i => {
    return i.match(re)[1]
  })
  return svgIcons
}

const findTreeNode = (data,id)=>{
  let treeNode = null
  if (!data) {
    return
  }
  for (let i = 0, len = data.length; i < len; i++) {
    if ( treeNode !== null ) {
      break
    }
    let item = data[i]
    if (item.id == id) {
      treeNode = item
      break
    } else if (item.children && item.children.length > 0) {
      treeNode = findTreeNode(item.children, id)
    }
  }
  if (treeNode) {
    _.pull(data,treeNode)
    return treeNode
  }
}
export {
  fileNames,
  findTreeNode
}

export default {
  fileNames,
  findTreeNode
}
