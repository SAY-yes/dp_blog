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
