const path = require('path')

const baseDir = path.resolve(__dirname, '../')

module.exports = {
  baseDir,
  src: path.resolve(baseDir, 'src'),
  devPath: path.resolve(baseDir, 'build'),
  assetsPath: path.resolve(baseDir, 'assets'),
  prodPath: path.resolve(baseDir, 'docs')
}
