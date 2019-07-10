## 一、对象解构
基本写法：

	let node = {
		type:'Identifier',
		name:'foo'
	}
	let {type,name} = node
解构赋值，修改变量：

	let node = {
		type:'Identifier',
		name:'foo'
	},
	type = 'Literal' ,
	name = 5;
	({type,name} = node)
>1.要用小括号包裹解构赋值语句，因为JS引擎将一对开放的花括号视为一个代码块。
>2.解构赋值表达式(等号右侧的)如果为null或undefined会导致程序报错。

默认值：

	let node = {
		type:'Identifier',
		name:'foo'
	}
	let {type,name,value=true} = node
为非同名局部变量赋值：

	let node = {
		type:'Identifier',
		name:'foo'
	}
	let {type:localType,name:localName} = node
>type: localType的含义是读取名为type的属性并将其存储在变量localType中，所以实际声明的变量是localType，不是type

嵌套对象解构：

	let node = {
		chart:{
			start:{
				line:1,
				column:1
			},
			end:{
				line:3,
				column:3
			}
		}
	}
	let { chart: { end:{line,column} } } = node
	console.log(chart)     // chart is not defined
	console.log(end)       // end is not defined
	console.log(line,column)   //3 3

	let { chart: { end } } = node
	console.log(chart)     // chart is not defined
	console.log(end)       // {line: 3, column: 3}

	let { chart: { end:localEnd } } = node
	console.log(chart)     // chart is not defined
	console.log(end)       // end is not defined
	console.log(localEnd)   // {line: 3, column: 3}
## 二、数组解构
基本写法：

	let colors = ['red','blue','green']
	let [,,now] = colors
	console.log(now)
解构赋值：

	let colors = ['red','blue','green'],
		first = 'black',
		second = 'purple';
	[first,second] = colors
	console.log(first,second)

	// 交换变量的值
	let a=1,b=2;
	[a,b] = [b,a]
>解构赋值表达式(等号右侧的)如果为null或undefined会导致程序报错。

默认值：

	let colors = ['red'];
	let [first,second='green'] = colors
	console.log(first,second)    // 'red' 'green'
嵌套数组解构：

	let colors = ['red',['blue','black'],'green']
	let [first,[,second]] = colors
	console.log(first, second)    // 'red' 'black'
不定参数：

	let colors = ['red','blue','green']
	// 在ES5中复制数组
	let cloneColors = colors.concat()
	// 在ES6中复制数组
	let [...cloneColors] = colors
## 三、混合解构

	let node = {
		chart:{
			start:{
				line:1,
				column:1
			},
			end:{
				line:3,
				column:3
			}
		},
		range:[0,3]
	}
	let {chart:{start},range:[index]} = node

## 四、必须传值的解构参数与解构参数的默认值

	let defaults = {
		secure : false, 
		path : '/', 
		domain : 'example.com', 
		expires : new Date()
	}
	function setCookie(name,value,{
		secure=defaults.secure,
		path = defaults.path,
		domain = defaults.domain,
		expires = defaults.expires
		}= defaults){
		console.log(secure, path, domain, expires)
	}
	setCookie('type','js',{
		secure:true,
		path:'/home/'
	})
这样，无论第三个参数传不传，结构参数都不为undefined，也不会报错。