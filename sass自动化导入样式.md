#### 自动化导入样式文件 (用于颜色、变量、mixin等)，可以使用style-resources-loader。
`npm i -D style-resources-loader`
#### 在vue.config.js文件里配置
```
const path = require('path')
function addStyleResource(rule) {    
  rule.use('style-resource')        
      .loader('style-resources-loader')        
      .options({        
        patterns: [           
          path.resolve(__dirname, './src/styles/imports.scss'),       
          ],    
       })
module.exports = {    
  chainWebpack: config => {        
    const types = ['vue-modules', 'vue', 'normal-modules', 'normal']       
    types.forEach(type => addStyleResource(config.module.rule('scss').oneOf(type)))    
   },
}
```
