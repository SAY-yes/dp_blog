用var声明的变量被提升至函数顶部（变量提升），所以引入块级作用域的概念，其存在于函数内部和{}区域。
##一、块级声明
let：定义变量，声明把变量的作用于限制在当前代码块。
const：定义常量，声明和初始化必须同时进行，不可更改。
>注意：const声明不允许修改绑定，但允许修改值。即用const声明对象后，可修改该对象的属性值。
临时死区（TDZ）：在声明前访问由let/const定义的变量，会触发运行时错误，只有执行变量/常量声明语句后，变量/常量才从TDZ中移出。

	function getValue(con){
		console.log(typeof value) //"undefined"
		console.log(value)  //ReferenceError:value is not defined
		if(con){
			console.log(typeof value)   //ReferenceError:value is not defined
			let value = 'red'
			return value
		}else{
			return null
		}
	}

##二、循环中的函数

	for (var i = 0; i < 10; i++) {
		(function() {
			console.log(i)  //输出0~9
		})()
	}

	var funcs = []
	for (var i = 0; i < 10; i++) {
		funcs.push(function() {
			console.log(i)  // 输出10次10
		})
	}
	funcs.forEach(function(fun){
		fun()
	})

循环里的每次迭代同时共享着变量i，循环内部创建的函数全部保留了对相同变量的引用。循环结束时变量i的值为10。为解决这个问题，可以将var改为let

	for (let i = 0; i < 10; i++) {
		funcs.push(function () {
			console.log(i)  // 输出0~9
		})
	}
每次循环的时候let声明都会创建一个新变量i，并将其初始化为i的当前值

或者在循环中使用立即调用函数表达式(IIFE)。

	funcs.push((function(value) {
		return function () {
			console.log(value)  // 输出10次10
		}
	})(i))
IIFE表达式为接受的每一个变量都创建了一个副本并存储为value。
##三、全局块作用域
let和const与var的另一个区别是它们在全局作用域中的行为。
var:创建一个新的全局变量作为全局对象(浏览器中的window)的属性，这意味着var很可能会覆盖一个已经存在的全局属性。
let/const:创建一个新的绑定，不会添加为全局对象的属性。