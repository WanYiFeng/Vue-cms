'use strict'

const express = require('express');

let app = express();

//1.0 初始化orm
const orm = require('orm');
//dtcmsdb4
app.use(orm.express('mysql://root:ww123456@127.0.0.1:3386/dtcmsdb4',{
	define:function(db,models,next){
  
		next();
	}
}));

//2.0 将所有api的请求响应content-type设置为application/json
app.all('/api/*',(req,res,next)=>{
	//设置允许跨域响应报文头
		//设置跨域
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "X-Requested-With");
	res.header("Access-Control-Allow-Methods","*");

	  res.setHeader('Content-Type','application/json;charset=utf-8');
	next();
});

//2.0 设置路由规则

const apiRoute = require('./routes/apiRoute.js');
app.use('/',apiRoute);
/**
app.listen(8899,'127.0.0.1',()=>{

	console.log('api服务已启动, :8899');
});

**/

app.listen(8888,'127.0.0.1',()=>{

    console.log('api服务已启动, :8888');
});
