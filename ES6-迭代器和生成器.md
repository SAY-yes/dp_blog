1、ES5实现迭代器：

	function createIterator(items){
		var i=0;
		return {
			next:function(){
				var done = (i >= items.length);
				var value = !done?items[i++]:undefined;
				return {
					done:done,
					value:value
				}
			}
		}
	}
	var iterator = createIterator([1,2,3,4])
	console.log(iterator.next())    // {done: false, value: 1}
	console.log(iterator.next())    // {done: false, value: 2}
	console.log(iterator.next())    // {done: false, value: 1}
	console.log(iterator.next())    // {done: false, value: 1}
	console.log(iterator.next())    // {done: true, value: undefined}
2、ES6实现生成器(返回迭代器的函数)

	function *createIterator(){
		yield 'aa';
		yield 2;
		yield 3;
	}
	let iterator = createIterator()
	console.log(iterator.next())   // {done: false, value: 'aa'}
	console.log(iterator.next())   // {done: false, value: 2}
	console.log(iterator.next())   // {done: false, value: 3}
	console.log(iterator.next())   // {done: true, value: undefined}
>a、yiled关键字只可在生成器内部使用，并且不能穿透函数边界。所以下述写法错误：

	function *createIterator(items){
		items.forEach(function(item){
			yiled item+1
		})
	}
>b、不能用箭头函数来创建生成器
3、生成器对象的方法
ES5写法：

	let o={
		createInterator:function *(items){
			for(let i=0;i<items.length;i++){
				yield items[i]
			}
		}
	}
	let iterator = o.createInterator([1,2,3])
ES6写法：

	let o={
		*createInterator(items){
			for(let i=0;i<items.length;i++){
				yield items[i]
			}
		}
	}
	let iterator = o.createInterator([1,2,3])
4、可迭代对象和for-of循环
在ES6中，所有的对象集合（数组、Set集合及Map集合）和字符串都是可迭代对象，具有Symbol.iterator属性，该属性通过指定的函数返回一个作用于附属对象的迭代器。

for-of循环每执行一次都会调用可迭代对象的next()方法，并将迭代器返回的结果对象的value属性存储在一个变量中，循环将持续执行这一过程直到返回对象的done属性值为true。
>如果将for-of语句用于不可迭代对象、null或undefined将会导致程序报错。
5、访问默认迭代器

	let value = [2,3,4,5]
	let iterator = value[Symbol.iterator]();
	console.log(iterator.next())   // {done: false, value: 2}
检测对象是否为可迭代对象：

	function isIterable(object){
		return typeof object[Symbol.iterator] === "function"
	}
6、创建可迭代对象
默认情况下，开发者定义的对象都是不可迭代对象，但如果给Symbol.iterator属性添加一个生成器，则可以将其变为可迭代对象。

	let collec = {
		items:[],
		*[Symbol.iterator](){
			for (let item of this.items) {
				yield item;
			}
		}
	}
	collec.items.push(2)
	collec.items.push(3)
	for (let x of collec) {
		console.log(x)   // 2 3
	}