# Vue组件化开发

组件其实就是一个拥有样式、动画、js逻辑、HTML结构的综合块。前端组件化确实让大的前端团队更高效的开发前端项目。而作为前端比较流行的框架之一，Vue的组件和也做的非常彻底，而且有自己的特色。尤其是她单文件组件开发的方式更是非常方便，而且第三方工具支持也非常丰富，社区也非常活跃，第三方组件也呈井喷之势

## 全局扩展方法`Vue.extend`
Vue提供了一个全局的API，`Vue.extend`可以帮助我们对Vue实例进行扩展，扩展完了之后，就可以用此扩展对象创建新的Vue实例了。
类似于继承的方式。

```
语法：Vue.extend( options )

参数：{Object} options

用法：使用基础 Vue 构造器，创建一个“子类”。参数是一个包含组件选项的对象
```
下面是一个官网demo：
```html
<div id="mount-point"></div>
<script>
// 创建构造器
var Profile = Vue.extend({
  // 新的对象的模板，所有子实例都会拥有此模板
  template: '<p>{{firstName}} {{lastName}} aka {{alias}}</p>',
  data: function () {   // 创建的Vue实例时，data可以是Object 也可以是Function，但是在扩展
    return {            // 的时候，data必须是一个函数，而且要返回值奥。
      firstName: 'Walter',
      lastName: 'White',
      alias: 'Heisenberg'
    }
  }
})
</script>


// 创建 Profile 实例，并挂载到一个元素上。
new Profile().$mount('#mount-point')
// .$mount() 方法跟设置 el属性效果是一致的。

结果如下：

<p>Walter White aka Heisenberg</p>
```

当然除了官方提供的方法外你还可以使用Vue对象的prototype直接实现扩展

```javascript
import http from "../public/tools/http.js"
Vue.prototype.getDataGet = function(url, callback) {
    this.$http.get(http.host + url).then(res => {
        console.log(http.host + url)
        callback(res.body)
    }, err => {
        console.log(err)
    })
}
Vue.prototype.getDataPsst = function(url, data, callback) {
    this.$http.post(http.host + url, data, { emulateJSON: true }).then(res => {
        callback(res.body)
    }, err => {
        console.log(err)
    })
}
```

>使用这种方法简单粗暴建议使用官方提供的 Vue.extend()
## 创建组件和注册组件

当然上面的方式只是能让我们继承Vue实例做一些扩展的动作。看Vue中如何创建一个组件并注册使用。

Vue提供了一个全局注册组件的方法：Vue.component。

```
语法： Vue.component( id, [definition] )

参数：
  {string} id    组件的名字，可以当HTML标签用，注意组件的名字都是小写，而且最好有横线和字母组合。
  {Function | Object} [definition]   组件的设置
  
用法：
注册或获取全局组件。注册还会自动使用给定的id设置组件的名称

// 注册组件，传入一个扩展过的构造器
Vue.component('my-component', Vue.extend({ /* ... */ }))
// 注册组件，传入一个选项对象（自动调用 Vue.extend）
Vue.component('my-component', { /* ... */ })
// 获取注册的组件（始终返回构造器）
var MyComponent = Vue.component('my-component')
```

简单demo：

```html
<div id="example">
  <!--组件直接跟普通的标签一样的使用。-->
  <my-component></my-component>
</div>
```
```js
// 注册一个组件
Vue.component('my-component', {
  // 模板选项设置当前组件，最终输出的html模板。注意：有且只有一个根元素。
  template: '<div>A custom component!</div>'
})
// 创建根实例
new Vue({
  el: '#example'
})
```

那么我们注册一个组件自动帮我生成 label和radiobutton组合。
```html
<!DOCTYPE html> 
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Vue入门之extend全局方法</title>
  <script src="https://unpkg.com/vue/dist/vue.js"></script>
</head>
<body>
  <div id="app">
    <!--组件名直接可以当标签使用。-->
    <radio-tag rid="rBas" txt="篮球" val="1"></radio-tag>

    <!--组件的属性也可以使用Vue的绑定的语法，下面是动态绑定数据给子组件-->
    <radio-tag :rid="demoId" :txt="demoText" :val="demoVal"></radio-tag>
  </div>
  <script>
    // 定义组件模板，模板必须有且只有一个根元素。
    var temp = '<div><label v-bind:for="rid">{{ txt }}</label><input :id="rid" type="radio" v-bind:value="val"></div>';
    // 注册一个全局的组件
    Vue.component('radio-tag', {       // 组件的名字不能有大写字母，跟React的曲别啊。另外组件名最好是小写字母加横线组合。
      template: temp,   
      props: ['rid', 'txt', 'val'],   // 设置组件的属性有哪些，定义标签的属性一致。
      data: function () {             // 注意属性名都得是小写，不然会不认的。
        return {                      // 在组件的定义中data必须是函数，而且必须有返回值返回{}也是可以的。
        }
      } 
    });                                

    // 初始化一个Vue实例
    var app = new Vue({         
      el: '#app',               
      data: {                   
        demoId: 'ft',
        demoText: '足球',
        demoVal: 2
      }
    });
  </script>
</body>
</html>
```
注意点:

- 组件的名字都必须是小写【[其实是非必须，但是为了不麻烦就强制吧](https://cn.vuejs.org/v2/guide/components.html#组件命名约定)】！！！而且建议是小写字母和横线的组合比如： my-radiobtn
- 注册组件的时候，可以传入一个选项对象进行配置。其中`props`是设置当前组件的属性，属性也都必须小写。属性是连接父容器和子组件的桥梁。
- 注意：属性名和组件的名字都要小写啊，不然vue不会认的。
- 编写组件代码最好配合Vue的chrome插件：[vue-devtool](https://github.com/vuejs/vue-devtools)
- 组件可以返还自己的数据，但是必须是函数。data必须是Function

## 局部注册组件
全局注册组件就是使用全局API `Vue.componet(id, {....})`就行了，当然我们有时候需要注册一个局部模块的自己用的组件。那么就可以用下面的方式了。

```js
var Child = {
  template: '<div>A custom component!</div>'
}
new Vue({
  // ...
  components: {
    // <my-component> 将只在父模板可用
    'my-component': Child
  }
})
```
## 父子组件传值

```html
<template>
<div class="publicHeader">
    <comment :name="name"></comment>
</div>
</template>
<script>
import comment from '../comment/comment.vue'
export default {
  data(){
    return {
      	name:"万翼峰"
    }
  }
    components:{
        comment
    }
}
</script>

```

