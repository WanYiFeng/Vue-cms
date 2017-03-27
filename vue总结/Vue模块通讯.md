# Vue模块通讯

## 父子组件通讯

父组件通过子组件的prop进行传递数据，而且数据传递是`单向`的。也就是说：父组件可以把数据传递给子组件，但是
反之则不同。如下图所示：   

![05vue](C:\Users\admin\Desktop\vue总结\05vue.png)


>父组件
```html
<div class="publicHeader">
    <comment :stockcount="goodsInfo.stock_quantity"></comment>
</div>
```
>子组件
``` javascript
props: ["stockcount"]
```
