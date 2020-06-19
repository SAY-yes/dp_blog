### 点击节点阻止父元素事件执行(事件委托，冒泡)
> event.preventDefault()
> event.stopPropagation();

1、在react中，如果调用 stopPropagation 无效，可以调用

event.nativeEvent.stopImmediatePropagation();

2、在Vue中，相当于
```
<div @click="click1">
	<div @click.stop="click2">
		button
	</div>
</div>

methods:{
	click1:function(){
		console.log('click1=>', );
	},
	click2: function (e) {
		console.log('click2=>');
	}
}
```
