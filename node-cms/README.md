#vue_cms
dtcmsdb4.sql ：是 mysql数据库的脚本

#步骤
##服务器端配置
```
npm install
node app.js 启动express服务器 ，启动之前请先安装mysql数据服务和利用dtcmsdb4.sql 建立一个dtcmsdb4的数据库
在MYSQL运行dtcmsdb4.sql
双击src目录下的 start.bat 开启项目后台服务
该项目后台基于node开发 运行项目需node环境
```
## 前端项目配置

```
npm install
cd 客户端根目录 
npm run dev
开启项目
```

该项目客户端为运用Vue组件化开发 应页面不多采用Bus通讯 为采用Vuex 适合入门参考

