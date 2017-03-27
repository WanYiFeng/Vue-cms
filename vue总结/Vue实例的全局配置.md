# Vue实例的全局配置
Vue.config 是一个对象，包含 Vue 的全局配置。可以在启动应用之前修改下列属性：
- silent

  - 类型： boolean

  - 默认值： false

  - 用法：
  ```js
  Vue.config.silent = true
  //取消 Vue 所有的日志与警告。
  ```
- optionMergeStrategies

  - 类型： { [key: string]: Function }

  - 默认值： {}

  - 用法：
  ```js 
  Vue.config.optionMergeStrategies._my_option = function (parent, child, vm) {
    return child + 1
  }
  const Profile = Vue.extend({
    _my_option: 1
  })
  // Profile.options._my_option = 2
  //自定义合并策略的选项。
  //合并策略选项分别接受第一个参数作为父实例，第二个参数为子实例，Vue实例上下文被作为第三个参数传入。
  ```

- devtools

  - 类型： boolean

  - 默认值： true (生产版为 false)

  - 用法：
  ```js
  // 务必在加载 Vue 之后，立即同步设置以下内容
  Vue.config.devtools = true
  //配置是否允许 vue-devtools 检查代码。开发版本默认为 true，生产版本默认为 false。生产版本设为 true 可以启用检查。
  ```

- errorHandler

  - 类型： Function

  - 默认值： 默认抛出错误

  - 用法：
  ```js
  Vue.config.errorHandler = function (err, vm) {
    // handle error
  }
  //指定组件的渲染和观察期间未捕获错误的处理函数。这个处理函数被调用时，可获取错误信息和 Vue 实例。
  //Sentry, an error tracking service, provides official integration using this option.
  ```
```
- ignoredElements

  - 类型: Array<string>

  - 默认值: []

  - 用法:
  ```js
  Vue.config.ignoredElements = [
    'my-custom-web-component', 'another-web-component'
  ]
  须使 Vue 忽略在 Vue 之外的自定义元素 (e.g., 使用了 Web Components APIs)。否则，它会假设你忘记注册全局组件或者拼错了组件名称，从而抛出一个关于 Unknown custom element 的警告。
```

- keyCodes

  - 类型： { [key: string]: number | Array<number> }

  - 默认值： {}

  - 用法：
  ```js
  Vue.config.keyCodes = {
    v: 86,
    f1: 112,
    mediaPlayPause: 179,
    up: [38, 87]
  }
  //给 v-on 自定义键位别名。
  ```

## Vue的全局API

Vue的全局API提供大量的功能，我这里就给大家罗列几个常用的结果，其他的还是参考[官网](https://cn.vuejs.org/v2/api/#全局-API).

### Vue.nextTick

`语法： Vue.nextTick( [callback, context] )`

```
参数：    
{Function} [callback]
{Object} [context]
```

用法：
在下次 DOM 更新循环结束之后执行延迟回调。在修改数据之后立即使用这个方法，获取更新后的 DOM。

```js
// 修改数据
vm.msg = 'Hello'
// DOM 还没有更新
Vue.nextTick(function () {
  // DOM 更新了
})
```
### Vue.set

`语法： Vue.set( object, key, value )`

```
参数：
{Object} object
{string} key
{any} value
返回值： 设置的值.
```
用法：    
设置对象的属性。如果对象是响应式的，确保属性被创建后也是响应式的，同时触发视图更新。这个方法主要用于避开 Vue 不能检测属性被添加的限制。
注意对象不能是 Vue 实例，或者 Vue 实例的根数据对象。

### Vue.compile

- 语法：
  `Vue.compile( template )`

- 参数：

`{string} template`

- 用法：
```js
//在render函数中编译模板字符串。只在独立构建时有效

var res = Vue.compile('<div><span>{{ msg }}</span></div>')
new Vue({
  data: {
    msg: 'hello'
  },
  render: res.render,
  staticRenderFns: res.staticRenderFns
})
```

### 全局API总结
其实还有几个其他的全局API，比如扩展组件Vue.extend 的用法、Vue.use加载插件、Vue.filter加载过滤器、Vue.directive自定义指令等