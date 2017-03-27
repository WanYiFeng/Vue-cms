# Vue指令介绍

**v-text**
```html
<span v-text="msg"></span>
<!-- 和下面的一样 -->
<span>{{msg}}</span>
```
**v-html**
```html
<div v-html="html"></div>
```
>指令的值可以为标签

**v-show**
```html
<h1 v-show="内容转换为Bool值">Hello!</h1>
```
>true显示false隐藏

**v-if && v-else $$ v-else-if** 

有时候我们要根据数据的情况，决定标签是否进行显示或者有其他动作。最常见的就是，表格渲染的时候，如果表格没有数据，就显示无数据。如果有数据就显示表格数据。
Vue帮我们提供了一个`v-if`的指令，帮助我们完成判断的模板处理。

```html
<div v-if="Math.random() > 0.5">
  1
</div>
<div v-else-if>
  2
</div>
<div v-else>
  3
</div>
```

> 类似于 `v-else`,，`v-else-if` 必须紧跟在 `v-if` 或者 `v-else-if` 元素之后。

**v-for**

模板引擎都会提供循环的支持。Vue也不例外，Vue是提供了一个`v-for`指令。基本的用法类似于foreach的用法。还是看例子最直接，上代码：

```html
<div id="app">
  <table>
    <thead>
      <tr>
        <th>姓名</th>
        <th>年龄</th>
        <th>地址</th>
      </tr>
    </thead>
    <tbody> 
      <!-- 每次for循环，都会创建一个tr标签。item是遍历的元素。 -->
      <tr v-for="item in UserList" >
        <td>{{ item.name }}</td>
        <td>{{ item.age }}</td>
        <td>{{ item.address }}</td>
      </tr>
    </tbody>
  </table>
</div>
<script>
  var app = new Vue({         
    el: '#app',               
    data: {                   
     UserList: [
      {'name': 'malun', 'age': 18, 'address': '北京黑地下室'},
      {'name': 'flydragon', 'age': 22, 'address': '厦门的很多热的地方'},
      {'name': 'temp', 'age': 25, 'address': '东北松花江上'}
     ]
    }
  });
</script>


<div v-for="(item, index) in items"></div>
<div v-for="(val, key) in object"></div>
<div v-for="(val, key, index) in object"></div>

<div v-for="item in items" :key="item.id">
  {{ item.text }}
</div>
```
如果我们希望每次循环生成两个tr标签呢？如果还有生成其他的标签呢？Vue给我们提供了template标签，供我们用于v-for循环中进行处理。

```html
<ul>
  <!-- 通过template标签，可以一次循环，输出两个li标签 -->
  <template v-for="item in items">
    <li>{{ item.msg }}</li>
    <li class="divider"></li>
  </template>
</ul>
```



> 一般作为列表渲染 注意:key是保证数据的唯一性 不写不会报错但是会出现警告

**v-on**

内联的方式绑定的事件，只能处理简单的事件的处理逻辑。复杂的情况还是封装到js中最方便，也不容易出错。
Vue对象中可以添加methods属性，开发者可以把事件处理函数的逻辑放到methods中。

```
<body>
  <div id="app">
    <p>{{ number }}</p>
    <input type="button" name="btnGetNumber" value="增加[绑定事件处理器]" v-on:click="getNumber">
    <input type="button" name="btnGetNumber" value="增加[内联方法调用]" v-on:click="getNumber()">
  </div>
  <script>
    var app = new Vue({         
      el: '#app',               
      data: {                   
        number: 1
      },
      methods: {
        // 事件响应方法的逻辑代码
        getNumber: function (e) {
          this.number += 1;   // 不管是内联方法调用，还是绑定事件处理器两种方式执行事件响应方法的时候 this都是指向 app
        }
      }
    });
  </script>
```

在事件处理程序中调用 event.preventDefault() 或 event.stopPropagation() 是非常常见的需求。尽管我们可以在 methods 中轻松实现这点，但更好的方式是：methods 只有纯粹的数据逻辑，而不是去处理 DOM 事件细节。
为了解决这个问题， Vue.js 为 v-on 提供了 事件修饰符。通过由点(.)表示的指令后缀来调用修饰符。

```html
<!-- 方法处理器 -->
<button v-on:click="doThis"></button>
<!-- 内联语句 -->
<button v-on:click="doThat('hello', $event)"></button>
<!-- 缩写 -->
<button @click="doThis"></button>
<!-- 停止冒泡 -->
<button @click.stop="doThis"></button>
<!-- 阻止默认行为 -->
<button @click.prevent="doThis"></button>
<!-- 阻止默认行为，没有表达式 -->
<form @submit.prevent></form>
<!--  串联修饰符 -->
<button @click.stop.prevent="doThis"></button>
<!-- 键修饰符，键别名 -->
<input @keyup.enter="onEnter"> 
<!-- 键修饰符，键代码 -->
<input @keyup.13="onEnter"> 像ctrl不能直接写键名字 需要keycode
```

- `.stop` - 调用 `event.stopPropagation()`。
- `.prevent` - 调用 `event.preventDefault()`。
- `.capture` - 添加事件侦听器时使用 capture 模式。
- `.self` - 只当事件是从侦听器绑定的元素本身触发时才触发回调。
- `.{keyCode | keyAlias}` - 只当事件是从侦听器绑定的元素本身触发时才触发回调。
- `.native` - 监听组件根元素的原生事件。

**v-bind**

```html
<!-- 绑定一个属性 -->
<img v-bind:src="imageSrc">
<!-- 缩写 -->
<img :src="imageSrc"> 
<div :class=" 'color': isRed "></div> <-- color是写死的 isred为变量-->
<div :style="{ fontSize: size + 'px' }"></div>
```

> 作用绑定数据的

![06.img中有关v-bind的说明](C:\Users\admin\Desktop\vue总结\06.img中有关v-bind的说明.png)

**v-model**

**限制：**

- input

- select

- textarea

> 作用于表单标签 在表单控件或者组件上创建双向绑定

![07.v-model实现数据的双向绑定](C:\Users\admin\Desktop\vue总结\07.v-model实现数据的双向绑定.png)

**自定义指令**

```javascript
		Vue.directive('red',(color = 'red'){ //er6 语法 如果color没值就把"red"赋过去
            this.el.style.background = color;
        });

        window.onload=()=>{
            var vm=new Vue({
                el:'#app',
                data:{
                    msg:'welcome'
                }
            });
        };
```

```html
 	<div id="app">
        <span v-red>
            asdfasd
        </span>
    </div>
```
