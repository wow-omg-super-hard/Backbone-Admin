var path = require('path');

// 根目录
var ROOT = exports.__ROOT__ = path.join(__dirname, '..');

// 开发目录
exports.__SRC__ = path.join(ROOT, 'src');

// 打包目录
exports.__DIST__ = path.join(ROOT, 'dist');

// 静态资源目录
exports.__STATICS__ = path.join(ROOT, 'statics');
