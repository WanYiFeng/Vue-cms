# Vue路由详解

> 单页面应用，浏览器和超连接的跳转方式已经不能适用，
> 所以各大框架纷纷给出了单页面应用的解决路由跳转的方案。 
> Vue官方也给出了路由的方案： `vue-router`;
> 建议还是用官方的最好，使用量也是最大


vue-router开发的步骤：

- 第一步： 引入vue和vue-router包。

> 可以使用cdn的方式或者npm的方式。如果配合npm和webpack的话可以直接作为一个模块导入即可。

```javascript
import VueRouter from 'vue-router'
Vue.use(VueRouter)
```

- 第二步： 定义路由跳转的组件

```js
// 1. 定义（路由）组件。
import home from "./Components/home/home.vue"
import newsList from "./Components/news/newsList.vue"
```

- 第三步： 定义路由规则对象

```js
// 每个路由path应该映射一个组件。 其中"component" 可以是
// 通过 Vue.extend() 创建的组件构造器，
// 或者，只是一个组件配置对象。
const routes = [
  { path: "/", redirect: "home" },//这条为重定向
  { name: "home", path: "/home", component: home },
  { name: "newsList", path: "/newsList", component: newsList },
]

// 创建路由对象
const router = new VueRouter({
  routes // （缩写）相当于 routes: routes，es6的新语法
})
```

- 第四步： 创建Vue对象，并加重上面创建的路由对象

```js
// 记得要通过 router 配置参数注入路由，
// 从而让整个应用都有路由功能
const app = new Vue({
  router
}).$mount('#app')
//如果使用webpack 	render: c => c(App), //使用webpack,渲染App.vue这个根组件
```


- 第五步： 在模板中编写路由跳转链接

```html
<div id="app">
  <h1>Hello App!</h1>
  <p>
    <!-- 使用 router-link 组件来导航. -->
    <!-- 通过传入 `to` 属性指定链接. -->
    <!-- <router-link> 默认会被渲染成一个 `<a>` 标签 -->
    <router-link to="/foo">Go to Foo</router-link>
    <router-link to="/newsList">Go to Bar</router-link>
  </p>
  <!-- 路由出口 -->
  <!-- 路由匹配到的组件将渲染在这里 -->
  <router-view></router-view>
</div>
```



## 路由参数获取

定义路由路径的时候，可以指定参数。参数需要通过路径进行标识：`/user/:id`就是定义了一个规则，/user开头，然后后面的就是id参数的值。
比如： 

```
路由规则：  /user/:id
/user/9   =>  id = 9
/user/8   =>  id = 8
/user/1   =>  id = 1
然后在跳转后的vue中可以通过this.$route.params.参数名获取对应的参数。
路由规则：  /register
router.push({ path: 'register', query: { plan: 'private' }})
然后在跳转后的vue中可以通过this.$route.query.参数名获取对应的参数。
```

## js控制路由跳转

上面我们演示的都是通过router-link进行跳转。 其实我们还可以通过js编程的方式进行路由的跳转。

```js
// 当前路由的view跳转到 /home
router.push('home')

// 对象,  跳转到/home
router.push({ path: 'home' })

// 命名的路由   
router.push({ name: 'user', params: { userId: 123 }})

// 带查询参数，变成 /register?plan=private
router.push({ path: 'register', query: { plan: 'private' }})
```

## 嵌套路由

嵌套路由跟普通路由基本没有什么区别。但是可以让vue开发变的非常灵活。
官网这块写的也非常好，我就直接拷贝了（原谅我吧。）
实际生活中的应用界面，通常由多层嵌套的组件组合而成。同样地，URL 中各段动态路径也按某种结构对应嵌套的各层组件，例如：

```html
<div id="app">
  <router-view></router-view>
</div>
const User = {
  template: '<div>User {{ $route.params.id }}</div>'
}

const router = new VueRouter({
  routes: [
    { path: '/user/:id', component: User }
  ]
})
这里的 <router-view> 是最顶层的出口，渲染最高级路由匹配到的组件。同样地，一个被渲染组件同样可以包含自己的嵌套 <router-view>。例如，在 User 组件的模板添加一个 <router-view>：

const User = {
  template: `
    <div class="user">
      <h2>User {{ $route.params.id }}</h2>
      <router-view></router-view>
    </div>
  `
}
要在嵌套的出口中渲染组件，需要在 VueRouter 的参数中使用 children 配置：

const router = new VueRouter({
  routes: [
    { path: '/user/:id', component: User,
      children: [
        {
          // 当 /user/:id/profile 匹配成功，
          // UserProfile 会被渲染在 User 的 <router-view> 中
          path: 'profile',
          component: UserProfile
        },
        {
          // 当 /user/:id/posts 匹配成功
          // UserPosts 会被渲染在 User 的 <router-view> 中
          path: 'posts',
          component: UserPosts
        }
      ]
    }
  ]
})
```

要注意，以 / 开头的嵌套路径会被当作根路径。 这让你充分的使用嵌套组件而无须设置嵌套的路径。
你会发现，children 配置就是像 routes 配置一样的路由配置数组，所以呢，你可以嵌套多层路由。

此时，基于上面的配置，当你访问 /user/foo 时，User 的出口是不会渲染任何东西，这是因为没有匹配到合适的子路由。如果你想要渲染点什么，可以提供一个 空的 子路由：或者重定向

```js
const router = new VueRouter({
  routes: [
    {
      path: '/user/:id', component: User,
      children: [
        // 当 /user/:id 匹配成功，
        // UserHome 会被渲染在 User 的 <router-view> 中
        { path: '', component: UserHome },
      ]
    }
  ]
})
```
**综合代码**

``` html
	<body>
      <div id="app">
            <router-link to='/login'>登录</router-link>
            <router-link to='/register/rose'>注册</router-link>

            <!-- 显示的内容 -->
            <router-view></router-view>
      </div>
	</body>
```

```javascript

      //定义好登录组件
      var loginComponent = Vue.extend({
          template : '<h2> 登录 </h2>'
      })

      //定义好注册组件 注册
      var registerComponent = Vue.extend({
          template : '<h2> 注册   --- {{username}} </h2>',
          data:function(){
              return {
                  username : ''
              }
          },
          created(){
              console.log(this.$route.params.username); // 通过 this.$route.params.username 获取参数
              this.username = this.$route.params.username;
          }
      })

      //创建好路由,并注册相关组件
      var vueRouter = new VueRouter({
          routes : [
              {name:'login',path:'/login',component:loginComponent},
              {name:'register',path:'/register/:username',component:registerComponent}//通过路由传递参数
          ]
      });

      //创建Vue对象
      var vue = new Vue({
          el:'#app',
          router:vueRouter
      });
```

![09.路由的跳转](C:\Users\admin\Desktop\vue总结\09.路由的跳转.jpg)