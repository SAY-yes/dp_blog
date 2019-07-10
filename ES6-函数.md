 ## 一、默认参数值
 1.使用
 function makeRequest(url,timeout=200,callback){}
 使用默认值的情况：
 makeRequest('/foo',undefined,function(res){})
 makeRequest('/foo')
 不使用默认值的情况：
 makeRequest('/foo',500,function(res){})
 makeRequest('/foo',null,function(res){}) 
 对于默认参数值，null是一个合法值，能替换默认值。

 2.对arguments对象的影响
 在ES5非严格模式下，命名参数的变化会同步更新到arguments对象中

	function clickBtn(first,second){
		console.log(arguments)     //['a','b']
		first='c'
		second='d'
		console.log(arguments)     //['c','d']
	}
	clickBtn('a','b')
 在ES5严格模式下，命名参数的变化不会同步更新到arguments对象中

	function clickBtn(first,second){
		'use strict'
		console.log(arguments)     //['a','b']
		first='c'
		second='d'
		console.log(arguments)     //['a','b']
	}
	clickBtn('a','b')
在ES6中，无论是否显示地定义了严格模式，arguments对象的行为与ES5严格模式下保持一致。

	function clickBtn(first,second='b'){
		console.log(arguments)     //['a']
		first='c'
		second='d'
		console.log(arguments)     //['a']
	}
	clickBtn('a')

## 二、不定参数(...args)
不定参数的使用限制：
* 每个函数最多只能声明一个不定参数，而且一定要放在所有参数的末尾。
* 不定参数不能用于对象字面量setter中，因为其参数有且只能有一个。
>例如：
	let obj = {
		set name(value){  
			// dosomething
		}
	}

## 三、name属性
function dosomething(){}
var doAnotherthing = function(){}
condole.log(dosomething.name)       // dosomething
condole.log(doAnotherthing.name)    // doAnotherthing

特殊情况：

	var dosomething = function doSomethingElse(){}
	console.log(dosomething.name)          // doSomethingElse

	var person = {
		get firstname(){
			return 'Json'
		},
		sayname:function(){
			console.log(this.name)
		}
	}
	console.log(person.firstname.name)     // undefined
	console.log(person.sayname.name)       // sayname

	var doSomething = function(){}
	console.log(doSomething.bind().name)   // bound doSomething
	console.log((new Function).name)       // anonymous

## 四、函数的多重用途
javascript函数有两个不同的内部方法：[[Call]]和[[Construct]]。当通过new关键字调用函数时，执行的是[[Construct]]函数，负责创建一个实例对象，再执行函数体，将this绑定到实例上。如果直接调用函数，则执行[[Call]]函数，直接执行函数体。具有[[Construct]]方法的函数统称为构造函数。

## 五、判断函数是否通过new调用
1.在ES5中，最流行的方法是通过instanceof，例如：

	function Person(name){
		if(this instanceof Person){
			this.name = name
		}else{
			throw new Error("err")
		}
	}
	var person = new Person('Nicholas')
这种方法不完全靠谱，因为有一种不依赖new关键字的方法也可以将this绑定到实例上

	var person = new Person('Jack')
	console.log(person)                          // Person {name: "Jack"}
	var notPerson = Person.call(person,'May')
	console.log(person)                          // Person {name: "May"}

2.在ES6中，引入元属性new.target
当调用函数的[[Construct]]方法时，new.target被赋值为new操作符的目标，通常是新建对象实例，也就是函数体内this的构造函数；如果调用[[Call]]方法，new.target的值为undefined。

	function Person(name){
		if(typeof new.target !== 'undefined'){     // new.target == Person
			console.log(new.target)
			this.name = name
		}else{
			throw new Error("err")
		}
	}
	var person = new Person('Jack')
	console.log(person)                          // Person {name: "Jack"}
	var notPerson = Person.call(person,'May')    // Uncaught Error: err
	console.log(person)  

## 六、块级函数

	'use strict';
	if(true){
		function doSomething(){}
		let doAnotherthing = function(){}
	}
在ES5中，代码会抛出语法错误；在ES6中，会将doSomething()函数视作一个块级声明。
在严格模式下，function定义的函数会被提升至块的顶部，而let定义的函数不会被提升。
在非严格模式下，块级函数会被提升至外围函数或全局作用域的顶部。

## 七、箭头函数
特点：
* 没有this、super、arguments和new.target绑定。
* 不能通过new关键字调用(没有[[Construct]]方法)。
* 没有原型(不存在prototype属性)。
* 不可以改变this的绑定。
* 不支持arguments对象。
* 不支持重复的命名参数。
## 八、尾调用优化
在ES5中，尾调用的实现就是创建一个新的栈帧，将其推入调用栈来表示函数调用。
在ES6中，缩减了严格模式下尾调用栈的大小（非严格模式下不受影响）。如果满足以下条件，尾调用不再创建新的栈帧，而是清除并重用当前的栈帧。
* 尾调用不访问当前栈帧的变量（函数不是一个闭包）。
* 在函数内部，尾调用是最后一条语句。
* 尾调用的结果作为函数值返回。
>1. 如果在尾调用返回后执行其他操作，无法优化(return 1+doSomething())
>2. 函数调用的结果存储在一个变量里，返回变量，无法优化。
