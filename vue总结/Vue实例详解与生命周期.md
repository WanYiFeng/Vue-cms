# Vue实例详解与生命周期

Vue的实例是Vue框架的入口，其实也就是前端的ViewModel，它包含了页面中的业务逻辑处理、数据模型等，当然它也有自己的一系列的生命周期的事件钩子，辅助我们进行对整个Vue实例生成、编译、挂着、销毁等过程进行js控制。

### Vue实例的computed

- 介绍

Vue的计算属性（computed)的属性会自动混入Vue的实例中。所有 getter 和 setter 的 this 上下文自动地绑定为 Vue 实例。这就很强大了，再计算属性中定义的函数里面可以直接使用指向了vue实例的this，异常方便的啊。

- 类型

`{ 键：函数}`
`{ [key: string]: Function | { get: Function, set: Function } }`
当然，可以省略setter,如果省略了setter，那么值就可以是普通函数，但是必须有返回值。

- 官方的实例
```html
var vm = new Vue({
  data: { a: 1 },
  computed: {
    // 仅读取，值只须为函数
    aDouble: function () {
      return this.a * 2
    },
    // 读取和设置
    aPlus: {
      get: function () {
        return this.a + 1
      },
      set: function (v) {
        this.a = v - 1
      }
    }
  }
})
vm.aPlus   // -> 2
vm.aPlus = 3
vm.a       // -> 2
vm.aDouble // -> 4
```

### methods

- 类型: { [key: string]: Function }

- 详细:

methods 将被混入到 Vue 实例中。可以直接通过 VM 实例访问这些方法，或者在指令表达式中使用。方法中的 this 自动绑定为 Vue 实例。

注意，不应该使用箭头函数来定义 method 函数 (例如 plus: () => this.a++)。理由是箭头函数绑定了父级作用域的上下文，所以 this 将不会按照期望指向 Vue 实例，this.a 将是 undefined。

- 示例:

```js
var vm = new Vue({
  data: { a: 1 },
  methods: {
    plus: function () {
      this.a++
    }
  }
})
vm.plus()
vm.a // 2
```

### watch
- 类型

` { [key: string]: string | Function | Object }`

- 详细:

一个对象，键是需要观察的表达式，值是对应回调函数。值也可以是方法名，或者包含选项的对象。Vue 实例将会在实例化时调用 $watch()，遍历 watch 对象的每一个属性。

- 示例:

```js
var vm = new Vue({
  data: {
    a: 1,
    b: 2,
    c: 3
  },
  watch: {
    // 监控a变量变化的时候，自动执行此函数
    a: function (val, oldVal) {
      console.log('new: %s, old: %s', val, oldVal)
    },
    // 深度 watcher
    c: {
      handler: function (val, oldVal) { /* ... */ },
      deep: true
    }
  }
})
vm.a = 2 // -> new: 2, old: 1
//注意，不应该使用箭头函数来定义 watcher 函数 (例如 searchQuery: newValue => this.updateAutocomplete(newValue))。理由是箭头函数绑定了父级作用域的上下文，所以 this 将不会按照期望指向 Vue 实例，this.updateAutocomplete 将是 undefined。
```
### 设置el的详解
- 类型

` string | HTMLElement`

限制： 只在由 new 创建的实例中遵守。

- 详细：

提供一个在页面上已存在的 DOM 元素作为 Vue 实例的挂载目标,也就是说Vue绑定数据到哪里去找。可以是`CSS 选择器`，也可以是一个 `HTMLElement实例`。

在实例挂载之后， 元素可以用 vm.$el 访问。

如果这个选项在实例化时有作用，实例将立即进入编译过程，否则，需要显式调用 vm.$mount() 手动开启编译。

```js
// 几乎所有例子都用到这个
var app = new Vue({         
  el: '#app',
  ...
});          
```
## Vue实例的生命周期

Vue实例有一个完整的生命周期，也就是从开始创建、初始化数据、编译模板、挂载Dom、渲染→更新→渲染、卸载等一系列过程，我们称这是Vue的生命周期。通俗说就是Vue实例从创建到销毁的过程，就是生命周期。

在Vue的整个生命周期中，它提供了一系列的事件，可以让我们注册js方法，可以让我们达到控制整个过程的目的地，

首先看看下面官网的一张生命周期的图，

![lifecycle-标注版本](C:\Users\admin\Desktop\vue总结\lifecycle-标注版本.png)



Vue提供的可以注册的钩子都在上图片的红色框标注。
他们是：

- `beforeCreate`

在实例初始化之后，数据观测(data observer) 和 event/watcher 事件配置之前被调用。

- `created`

实例已经创建完成之后被调用。在这一步，实例已完成以下的配置：数据观测(data observer)，属性和方法的运算， watch/event 事件回调。然而，挂载阶段还没开始，$el 属性目前不可见。

- `beforeMount`

在挂载开始之前被调用：相关的 render 函数首次被调用。

- `mounted`

el 被新创建的 vm.     $el 替换，并挂载到实例上去之后调用该钩子。如果 root 实例挂载了一个文档内元素，当 mounted 被调用时 vm.   $el 也在文档内。

- `beforeUpdate`

数据更新时调用，发生在虚拟 DOM 重新渲染和打补丁之前。
你可以在这个钩子中进一步地更改状态，这不会触发附加的重渲染过程。

- `updated`

由于数据更改导致的虚拟 DOM 重新渲染和打补丁，在这之后会调用该钩子。

当这个钩子被调用时，组件 DOM 已经更新，所以你现在可以执行依赖于 DOM 的操作。然而在大多数情况下，你应该避免在此期间更改状态，因为这可能会导致更新无限循环。

该钩子在服务器端渲染期间不被调用。

- `beforeDestroy`

实例销毁之前调用。在这一步，实例仍然完全可用。

- ` destroyed`

Vue 实例销毁后调用。调用后，Vue 实例指示的所有东西都会解绑定，所有的事件监听器会被移除，所有的子实例也会被销毁。
该钩子在服务器端渲染期间不被调用。