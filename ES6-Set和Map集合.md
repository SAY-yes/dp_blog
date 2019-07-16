## 一、Set集合
1、表达：

	let set = new Set(),key1={},key2={};  // 创建Set集合
	// let set = new Set([1,2,3,3])   // 可以用数组来初始化Set集合(集合有自动去重的功能)
	set.add(5)    // 向集合中添加元素
	set.add('5')
	set.add(key1)
	set.add(key2)   // 对象不会被转为字符串，因而它们在集合中是两个独立的元素
	console.log(set.size)   // 获取集合的元素数量
	console.log(set.has(5))    // 检测Set集合中是否存在某个值
	set.delete('5')   // 移除Set集合中的某一个元素
	set.clear()   // 移除集合中的所有元素
2、Set集合的forEach()方法

	let set = ['a', 'b']
	set.forEach((value,key,origin)=>{
		console.log(value+' '+ key)    // a 0|b 1
		console.log(origin === set)   // true|true
	})
	let set = new Set(['a', 'b'])
	set.forEach((value,key,origin)=>{
		console.log(value+' '+ key)    // a a|b b     key和value始终相等
		console.log(origin === set)   // true|true
	})
>如果需要在回调中使用this引用，可将它作为第二个参数传入forEach()
3、将Set集合转换为数组

	let set = new Set([1,2,3,4,5])   // 将数组转换为Set集合
	let array = [...set]   //将Set集合转换为数组
	或者：
	let arr = Array.from(set)   //将Set集合转换为数组
>可利用Set集合的自动去重功能为数组去重
4、Weak Set集合

	let set = new Set(),key={};  // 强引用的Set集合
	set.add(key)
	console.log(set.size)   // 1
	key = null    // 清除了对原始对象的引用，但Set集合却保留了这个引用
	console.log(set.size)   // 1
	key = [...set][0]    // 取出该引用
	console.log(key)    // {}

	let set = new WeakSet(),key={};  // 弱引用的Set集合
	set.add(key)
	console.log(set.has(key))   // true
	set.delete(key)   //或者key = null  Weak Set集合中的引用也自动移除
	console.log(set.has(key))   // false
区别：
* WeakSet集合的成员必须是对象类型的值
* 用WeakSet构造函数创建的集合，支持3个方法：add(),has()和delete()。
* WeakSet构造函数不接受任何原始值。
* 不支持forEach(),keys(),values()方法
* 不支持size属性
## 二、Map集合
1、表达：

	let map = new Map()
	map.set('title','Javascript')   // 传入键名和对应值
	map.set('year',2016)
	console.log(map.get('title'))   // 'Javascript'  从集合中获取数据，如果键名不存在，返回undefined
	console.log(map.get('year'))   // 2016
在Map集合中，键名不允许强制转换成字符串，所以允许对象作为键名。

	let map = new Map(),key1={},key2={};
	// let map = new Map([['name','Jack'],['age',18]])
	map.set(key1, 'Javascript')
	map.set(key2, 2016)
	console.log(map)
	console.log(map.get(key1))   // 'Javascript'
	console.log(map.get(key2))   // 2016
2、方法：
Map集合支持has(),delete()和clear()方法，同样支持size属性。
Map集合的forEach()方法和Set集合类似
3、Weak Map集合

	let map = new WeakMap()
	let element = document.querySelector('#box')
	map.set(element,"Original")
	let value = map.get(element)
	console.log(value)   // "Original"
特点：
* Weak Map集合的键名必须是一个非null类型的对象
* Weak Map集合支持has(),set(),get()和delete()方法
* Weak Map集合不支持size属性
* 和Weak Set集合一样，不支持键名枚举，从而不支持forEach()与clear()方法