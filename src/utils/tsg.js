export function fileNames(path,extension) {
  debugger
  const req = require.context(path, false, new RegExp("\."+extension+"$","g"))
  debugger
  const requireAll = requireContext => requireContext.keys()
  const re = new RegExp("\.\/(.*)\."+extension)
  const svgIcons = requireAll(req).map(i => {
    return i.match(re)[1]
  })
  return svgIcons
}
