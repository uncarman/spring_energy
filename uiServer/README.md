## 能耗项目UI端
提供表监测分析，统计数据，提供UI展示

### 配置java后端地址
修改 src/static/comm.js中 settings.domain 的值

### 配置ui服务
修改 conf/prod.json

### 服务运行
npm run prod

### 注意
内页中 var app = require('../js/app');
注意不要引用错误地址, 否则会去加载 libs/app.js, 引起绑定的route中对应的 controller 全找不到
报错: Argument 'dashboard' is not a function, got undefined


### 编译代码
执行命令
1. node build.js cp
将 src 目录文件 copy 到 dist 目录
2. node build.js hx
混淆 dist 目录中的文件, 具体配置参考 build.js 中的 hxInclude 和 hxExclude
3. node build.js bt
编译 js 文件成为二进制的 jsc 文件, 因为发布成 h5 文件, 当前不需要执行
