## 一、新增方法
1. Object.is()   如果这两个参数类型相同且有相同的值，则返回true，否则返回false

	console.log(+0 == -0)     // true
	console.log(+0 === -0)    // true
	console.log(Object.is(+0,-0))     // false

	console.log(NaN == NaN)   // false
	console.log(NaN === NaN)   // false
	console.log(Object.is(NaN,NaN))   // true

	console.log(5 == '5')   // true
	console.log(5 === '5')   // false
	console.log(Object.is(5,'5'))   // false

2. Object.assign()  浅拷贝
 Object.assign()方法不能将提供者的访问器属性复制到接收对象中，会将其转换为接受对象中的一个数据属性。

	let receiver = {},
		supplier = {
			get name(){
				return 'file.js'
			},
			get:function(){
				return 's'
			}
		};
	Object.assign(receiver,supplier)
	console.log(receiver)         // {name: "file.js",get:f()}
	let descriptor = Object.getOwnPropertyDescriptor(receiver,'name')
	console.log(descriptor.get)     // undefined
	console.log(descriptor.value)    // 'file.js'

## 二、自有属性枚举顺序
基本规则：
* 所有数字键按升序排序。
* 所有字符串键按照它们被加入对象的顺序排序。
* 所有symbol键按照它们被加入对象的顺序排序。

## 三、增强对象原型
无论通过构造函数还是Object.create()创建对象，其原型是在对象被创建时指定的。
1.改变对象的原型
ES5添加了Object.getPrototypeOf()方法来返回任意指定对象的原型；
ES6添加了Object.setPrototypeOf()方法来改变任意指定对象的原型。

		let person = {
			name:'Jack',
			getGreet(){
				return 'Hello'
			}
		}
		let friend = Object.create(person)
		console.log(friend)
		console.log(friend.getGreet())
		console.log(Object.getPrototypeOf(friend)=== person)
		let dog = {
			getGreet(){
				return 'woof'
			}
		}
		Object.setPrototypeOf(friend,dog)
		console.log(friend.getGreet())
		console.log(Object.getPrototypeOf(friend) === dog)
2.super引用   可以调用对象原型上的方法

	let person = {
		name:'Jack',
		getGreet(){
			return 'Hello'
		}
	}
	let friends = {
		getGreet() {
			return Object.getPrototypeOf(this).getGreet.call(this)+'World'
		}
	}
	Object.setPrototypeOf(friends, person)

	let relative = Object.create(friends)

	console.log(person.getGreet())    // 'Hello'
	console.log(friends.getGreet())   // 'Hello World'
	console.log(relative.getGreet())  // Maximum call stack size exceeded
调用relative.getGreet()时，this指向relative，friends的getGreet()进入递归调用直到触发栈溢出报错。只需要将Object.getPrototypeOf(this).getGreet.call(this)改为super.getGreet()，即可解决。
Super引用不是动态变化的，super.getGreet()总是指向person.getGreet()