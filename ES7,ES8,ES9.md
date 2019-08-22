## 1、ES7
* 数组方法 includes() == indexOf()>=0

		var ary1 = [NaN];
		console.log(ary1.indexOf(NaN))//-1
		console.log(ary1.includes(NaN))//true

		var ary1 = new Array(3);
		console.log(ary1.indexOf(undefined));//-1
		console.log(ary1.includes(undefined))//true
* 指数运算符 2**10 == Math.pow(2,10)
## 2、ES8
* async/await
* Object.values() ~ Object.keys()
* Object.entries()  返回对象自身可枚举属性的键值对的数组

		const obj = {a:1,b:2,c:3}
		console.log(Object.entries(obj)) //[["a",1],["b",2],["c",3]]
		for (const [x,y] of Object.entries(obj)) {
			console.log(`key:${x} value:${y}`)
		}
* String padding  将子字符串添加到原字符串的开头或结尾

		str.padStart(targetLength,[padString])
		targetLength:当前字符串需要填充到的目标长度。
		padString:填充字符串。
* 函数参数列表结尾允许逗号
* Object.getOwnPropertyDescriptors()   
返回指定对象所有自身属性的描述对象
返回的描述对象键值有：configurable, enumerable, writable, get, set and value。
## 3、ES9
* 异步迭代
* Rest/Spread 属性
这项特性在ES6中已经引入，但是ES6中的作用对象仅限于数组
* 正则表达式命名捕获组

		const RE_DATE = /([0-9]{4})-([0-9]{2})-([0-9]{2})/;
		const matchObj = RE_DATE.exec('1999-12-31');
		const year = matchObj[1]; // 1999
		const month = matchObj[2]; // 12
		const day = matchObj[3]; // 31

		const RE_DATE = /(?<year>[0-9]{4})-(?<month>[0-9]{2})-(?<day>[0-9]{2})/;
		const matchObj = RE_DATE.exec('1999-12-31');
		const year = matchObj.groups.year; // 1999
		const month = matchObj.groups.month; // 12
		const day = matchObj.groups.day; // 31

		// 使用解构语法更为简便
		const {groups: {day, month, year}} = RE_DATE.exec('1999-12-31');
		console.log(year); // 1999
		console.log(day); // 31
* 正则表达式 Unicode 转义

		js可以通过字符集的名称来匹配字符，如s代表空白
		 /^\s+$/u.test('\t \n\r')      //true

		 通过Unicode字符属性来匹配字符
		 // 空白
		 const reg = /^\p{White_Space}+$/u.test('\t \n\r')   //true
		 // 中文
		 const reg = /\p{Script=Han}/u.test('地平线')   //true
		 // 匹配字母
		 const reg = /^\p{Letter}+$/u.test('πüé')
		 // 希腊字母
		 const reg = /^\p{Script=Greek}+$/u.test('μετά')   //true
		 // 匹配单独的替代字符
		 const reg = /^\p{Surrogate}+$/u.test('\u{D83D}')    //true
* 正则表达式反向断言

		const noReLookahead = /\D(\d+)/,
      reLookahead = /\D(?=\d+)/,          // 取数字之前的
      match1 = noReLookahead.exec('$123.45'),
      match2 = reLookahead.exec('$123.45');
		console.log(match1[0]); // $123   
		console.log(match2[0]); // $

		const reLookahead = /(?<=\D)[\d\.]+/,    // 反向断言  取非数字之后的
      match = reLookahead.exec('$123.45');
		console.log(match[0]); // 123.45
* 正则表达式dotAll模式

		正则表达式中点.匹配除回车外的任何单字符，但是有两个限制
		首先，它不符合非BMP字符，如表情符号
		/^.$/.test('')   // false
		/^.$/u.test('')     // true
		其次，点不匹配行结束符
		/^.$/.test('\n')   // false
		只能通过[^]或者[\s\S]来修复
		/^[^]$/.test('\n')    // true
		/^[\s\S]$/.test('\n')    // true
		建议之后引入了新的修饰符/s（简称：singleline）能够匹配行结束符
		/^.$/s.test('\n')   // true
* Promise.prototype.finally()

		finally的回调总会被执行。
		promise
		.then(result => {···})
		.catch(error => {···})
		.finally(() => {···});
