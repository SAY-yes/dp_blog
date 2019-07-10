1、创建Symbol
let firstName = Symbol()
>Symbol函数可接受一个可选参数，用来描述创建的Symbol。这段描述不可用于属性访问，只有当调用Symbol的toString()方法时才可以读取这个属性。
let firstName = Symbol('first-name')
console.log(firstName)  &nbsp;&nbsp;&nbsp;  // &nbsp;'Symbol(first-name)'

2、类型判断

	let symbol = Symbol('test symbol')
	console.log(typeof symbol)    // 'symbol'

3、使用方法
所有使用可计算属性名的地方，都可以使用Symbol。

	let firstName = Symbol('first-name')
	let Person = {
		[firstName]:'Jack'
	}
	Object.defineProperty(Person,firstName,{writable:false})
	let lastName = Symbol('last-name')
	Object.defineProperties(Person,{
		[lastName]:{
			value:'Zala',
			writable:false
		}
	})
	console.log(Person)     // {Symbol(first-name): "Jack",Symbol(last-name): "Zala"}
	console.log(Person[firstName])   // "Jack"
	console.log(Person[lastName])   // "Zala"

4、Symbol共享体系
全局Symbol注册表是一个类似全局作用域的共享环境。

	let uid = Symbol.for('uid')
>Symbol.for()先在全局Symbol注册表中搜索键为uid的Symbol是否存在，若存在，直接返回已有的Symbol，否则，创建一个新的Symbol，并在Symbol全局注册表中注册，随机返回新的Symbol。

	let uid = Symbol.for('uid')
	console.log(Symbol.keyFor(uid))   // 'uid'
	let uid2 = Symbol.for('uid')
	console.log(Symbol.keyFor(uid2))   // 'uid'
>Symbol.keyFor()在Symbol全局注册表中检索与Symbol有关的键。

5、Symbol属性检索
在ES5中，Object.keys()与Object.getOwnPropertyNames()方法可以检索对象中所有的属性名：前一个方法返回所有课枚举的属性名；后一个方法不考虑属性的可枚举性一律返回。
在ES6中，Object.getOwnPropertySymbols()方法返回一个包含所有Symbol自有属性的数组。

6、well-known Symbol暴露的内部操作
* Symbol.hasInstance &nbsp;&nbsp;&nbsp;用于检测对象的继承信息
该方法在Function.prototype中定义，所以所有函数都继承了instanceof属性的默认行为。

		function Person(){
			this.name = 'Jack'
			this.age = 18 
		}
		let friend = new Person()
		console.log(friend)     // Person {name: "Jack", age: 18}
		console.log(friend instanceof Person)   //true
		Object.defineProperty(Person,Symbol.hasInstance,{
			value:function(v){
				return false;
			}
		})
		console.log(friend)     // Person {name: "Jack", age: 18} 
		console.log(friend instanceof Person)   //false
	>只有通过Object.defineProperty()方法才能改写一个不可写属性。
* Symbol.isConcatSpreadable &nbsp;&nbsp;&nbsp;当传递一个集合作为Array.prototype.concat()方法的参数时，是否应该将集合内的元素规整到同一层级。返回布尔值。

		let collection = {
			0:'hello',
			1:'world',
			length:2,
			[Symbol.isConcatSpreadable]:true
		}
		let message = ['Hi'].concat(collection)
		console.log(message)   // ["Hi", "hello", "world"]
* Symbol.iterator&nbsp;&nbsp;&nbsp;  一个返回迭代器的方法
* Symbol.species &nbsp;&nbsp;&nbsp; 用于创建派生对象的构造函数
* Symbol.toPrimitive &nbsp;&nbsp;&nbsp;  一个返回对象原始值的方法

		function Temperature(degress){
			this.degress = degress
		}
		Temperature.prototype[Symbol.toPrimitive] = function(param) {
			console.log('111',param)   // 'default'  'number'  'string'
			switch (param) {
				case 'number':
					return this.degress
				case 'string':
					return this.degress+"\u00b0"
				case 'default':
					return this.degress+' degress'
			}
		}
		let freezing = new Temperature(10)
		console.log(freezing)    //Temperature {degress: 10}
		console.log(freezing+'!')    // '10 degress!'
		console.log(freezing/2)    // 5
		console.log(String(freezing))  // 10°
* Symbol.toStringTag &nbsp;&nbsp;&nbsp;  一个在调用Object.prototype.toString()方法时使用的字符串，用于创建对象描述
* Symbol.unscopables  &nbsp;&nbsp;&nbsp; 一个定义了一些不可被with语句引用的对象属性名称的对象集合
* Symbol.match &nbsp;&nbsp;&nbsp;    一个在调用String.prototype.match()方法时调用的方法，用于比较字符串
* Symbol.replace&nbsp;&nbsp;&nbsp;  一个在调用String.prototype.replace()方法时调用的方法，用于替换字符串的子串
* Symbol.search &nbsp;&nbsp;&nbsp;  一个在调用String.prototype.search()方法时调用的方法，用于在字符串中定位子串
* Symbol.split &nbsp;&nbsp;&nbsp;  一个在调用String.prototype.split()方法时调用的方法，用于分割字符串
Symbol.match,Symbol.replace,Symbol.search和Symbol.split这四个Symbol属性表示match(),replace(),search()和split()方法的第一个参数应该调用的正则表达式参数的方法，它们被定义在RegExp.prototype中，是字符串方法应该使用的默认实现。

		let hasLengthOf10 = {
			[Symbol.match]:function (value){
				return value.length===10?[value]:null
			},
			[Symbol.replace]: function (value,replacement) {
				return value.length === 10 ? replacement : value
			},
			[Symbol.search]: function (value) {
				return value.length === 10 ? 0 : -1
			},
			[Symbol.split]: function (value) {
				return value.length === 10 ? [, ] : [value]
			}
		}
		let message1 = 'Hello world',
				message2 = 'Hello Jack';

		let match1 = message1.match(hasLengthOf10),
				match2 = message2.match(hasLengthOf10);
		console.log(match1)
		console.log(match2)

		let replace1 = message1.replace(hasLengthOf10,'aaa'),
				replace2 = message2.replace(hasLengthOf10,'aaa');
		console.log(replace1)
		console.log(replace2)

		let search1 = message1.search(hasLengthOf10),
				search2 = message2.search(hasLengthOf10);
		console.log(search1)
		console.log(search2)

		let split1 = message1.split(hasLengthOf10),
				split2 = message2.split(hasLengthOf10);
		console.log(split1)
		console.log(split2)