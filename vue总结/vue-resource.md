# vue-resource

## POST请求

```javascript
		getData(){
                  const url = "http://127.0.0.1:3000/postLogin";
                  this.$http.post(url,{username: 'lisi',password:'lisi3'},{emulateJSON:true}).then(res=>{
                        console.log(res.body);
                  },err=>{
                        console.log('请求失败');
                  })
              }
```

## GET请求

```javascript
              getData(){
                  const url = "http://127.0.0.1:3000/login?username=zhangsan&password=1233";
                  this.$http.get(url).then(res=>{
                        console.log(res.body);
                  },err=>{
                        console.log('请求失败');
                  })
              }
```

## JSONP请求

```javascript
			getData(){
                  const url = "http://127.0.0.1:3000/jsonpLogin?username=zhangsan&password=123";
                  this.$http.jsonp(url).then(res=>{
                        console.log(res.body);
                  },err=>{
                        console.log('请求失败');
                  })
              }
```

> 注意JSONP请求需要服务端支持

**NODEJS支持代码设定**

```javascript
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

```

```javascript
route.all('/api/jsonp',(req,res)=>{

	var callbackFn =  req.query.callback;

	var obj = {message:'jsonp 请求 ok'};
	var jsonStr = JSON.stringify(obj);


	res.end(`${callbackFn}('${jsonStr}')`);

});

module.exports = route
```

> 注意需要 基于 express 在实现

