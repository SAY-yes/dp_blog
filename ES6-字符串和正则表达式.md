##一、字符串方法
|方法|描述|例如|
|:-:|:-:|:-:|
|charAt()|返回指定索引位置的字符|'abc'.charAt(1)|
|charCodeAt()|返回指定索引位置字符的 Unicode 值|'abc'.charCodeAt(1)|
|fromCharCode()|将 Unicode 转换为字符串|String.fromCharCode(65)|
|toString()|返回字符串对象值||
|trim()|移除字符串首尾空白|" abc".trim()='abc'|
|valueOf()|返回某个字符串对象的原始值||
|concat()|连接两个或多个字符串，返回连接后的字符串|'ab'.concat('c')='abc'|
|indexOf()|返回字符串中检索指定字符第一次出现的位置|'hello my dog'.search('my')=6|
|search()|返回检索正则表达式第一次出现的位置|'hello my dog'.search(/my/i)=6|
|lastIndexOf()|返回字符串中检索指定字符最后一次出现的位置||
|localeCompare()|用本地特定的顺序来比较两个字符串||
|match()|找到一个或多个正则表达式的匹配|'hello my dog'.match(/my/g)=['my','my']|
|replace()|替换与正则表达式匹配的子串||
|split()|把字符串分割为子字符串数组|'abc abc'.split(' ')=['abc','abc']|
|slice()|提取字符串的片断，并在新的字符串中返回被提取的部分|'hello'.substring(1,4)='ell'|
|substr()|从起始索引号提取字符串中指定数目的字符|'hello'.substring(1,4)='ello'|
|substring()|提取字符串中两个指定的索引号之间(不包含结束为止)的字符|同slice()|
|toLowerCase()|把字符串转换为小写||
|toUpperCase()|把字符串转换为大写||
>1、slice,substr和substring的区别
* 它们都接收两个参数，slice和substring接收的是起始位置和结束位置(不包括结束位置)，而substr接收的则是起始位置和所要返回的字符串长度。substring是以两个参数中较小一个作为起始位置，较大的参数作为结束位置。
* 当接收的参数是负数时，slice会将它字符串的长度与对应的负数相加，结果作为参数；substr则仅仅是将第一个参数与字符串长度相加后的结果作为第一个参数；substring则干脆将负参数都直接转换为0。
	>注意：IE对substr接收负值的处理有错，它会返回原始字符串。

>2、对于BMP字符集中的字符，codePointAt()方法与charCodeAt()方法的返回值想同，否则不同。
检测一个字符占用的编码单元数量，可用下面的方法：

	function is32Bit(c){
		return c.codePointAt(0)>0xffff
	}
	console.log(is32Bit('a'))

>3、对于BMP字符集中的字符，String.fromCodePoint()方法与String.fromCharCode()方法的返回值想同，否则不同。

>4、normalize()方法
含义：按照指定的一种 Unicode 标准化形式将当前字符串标准化。
注意：在排序或比较字符串之前一定要把他们标准化为同一种形式。
参数：
* "NFC": 以标准等价方式分解，然后以标准等价方式重组(默认)； ->视觉和语义上的等价，比如Ǒ（\u01D1）和O（\u004F）和ˇ（\u030C）
* "NFD": 以标准等价方式分解；
* "NFKC": 以兼容等价方式分解；    ->语义上等价，但视觉上不等价，比如“囍”和“喜喜”
* "NFKD": 以兼容等价方式分解，然后以标准等价方式重组。
>5.字符串中子串识别
* indexof()  返回值-1/index
* includes()   返回值true/false
* startWith()
* endWith()
includes(),startWith(),endWith()可接受两个参数，一个是要搜索的文本，一个是开始位置的索引值。如果指定了第二个参数，则includes()和startWith()会从索引值的位置开始匹配，endWith()则从索引值减去与搜索文本长度的位置开始匹配。
>5.repeat()方法
接受一个number类型的参数，表示该字符串重复的次数。
例如创建缩进级别：

		let indent = " ".repeat(4),indentLevel = 0
		let newIndent = indent.repeat(++indentLevel)
##二、正则表达式
常用的正则修饰符有i,g,m,s
i:不区分大小写
g:全局匹配
m:多行匹配
s:默认的圆点 . 是 匹配除换行符 \n 之外的任何单字符，加上s之后, . 中包含换行符
1.正则表达式u修饰符(Unicode)
当正则表达式添加了u修饰符时，它就从编码单元模式转换为字符模式。
u修饰符是语法层面的变更，在不兼容ES6的js引擎中使用会导致语法错误，可通过以下函数检测当前引擎是否支持u修饰符：

	function hasRegExpU(){
		try{
			var pattern = new RegExp(".","U")
			return true
		}catch(err){
			return false
		}
	}

2.正则表达式y修饰符
它会影响正则表达式搜索过程中的sticky属性。当在匹配时，会通知搜索从正则表达式的lastIndex属性开始进行。如果匹配不到，lastIndex会重置为0，停止匹配。
只有调用exec()和test()方法时才会涉及lastIndex属性
g修饰符和y修饰符一样，有粘滞行为。
检测引擎对它的支持程度，与检测u修饰符类似。
例如：

	let text = "hello1 hello2 hello3",
	pattern = /hello\d\s?/,
	result = pattern.exec(text),
	globalPattern = /hello\d\s?/g,
	globalResult = globalPattern.exec(text),
	stickPattern = /hello\d\s?/y,
	stickResult = stickPattern.exec(text);
	console.log(result[0])                 // "hello1 "
	console.log(pattern.lastIndex)         // 0
	console.log(globalResult[0])           // "hello1 "
	console.log(globalPattern.lastIndex)   //7
	console.log(stickResult[0])            // "hello1 "
	console.log(stickPattern.lastIndex)    //7
	 
	result = pattern.exec(text)
	globalResult = globalPattern.exec(text)
	stickResult = stickPattern.exec(text)
	console.log(result[0])                 // "hello1 "
	console.log(pattern.lastIndex)         // 0
	console.log(globalResult[0])           // "hello2 "
	console.log(globalPattern.lastIndex)   //14
	console.log(stickResult[0])            // "hello2 "
	console.log(stickPattern.lastIndex)    //14

3.flag属性
在ES5中，通过source属性获取正则表达式的文本，如果要获取表达式的修饰符，需要将正则toString()格式化然后截取修饰符。
在ES6中，可通过flag属性获取正则表达式的 修饰符