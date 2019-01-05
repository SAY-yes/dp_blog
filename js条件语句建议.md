## 1、多重判断时使用 Array.includes
	// 一般写法
	function test(fruit) {
	  if (fruit == 'apple' || fruit == 'strawberry') {
	    console.log('red');
	  }
	}

	// 简洁写法
	function test(fruit) {
	  const redFruits = ['apple', 'strawberry', 'cherry', 'cranberries'];

	  if (redFruits.includes(fruit)) {
	    console.log('red');
	  }
	}
## 2、更少的嵌套，尽早 Return
	// 一般写法
	function test(fruit, quantity) {
	  const redFruits = ['apple', 'strawberry', 'cherry', 'cranberries'];
	  // 条件 1: fruit 必须有值
	  if (fruit) {
	    // 条件 2: 必须是red的
	    if (redFruits.includes(fruit)) {
	      console.log('red');
	      // 条件 3: quantity大于10
	      if (quantity > 10) {
	        console.log('big quantity');
	      }
	    }
	  } else {
		throw new Error('No fruit!');
	  }
	}

	// 简洁写法
	function test(fruit, quantity) {
	  const redFruits = ['apple', 'strawberry', 'cherry', 'cranberries'];
	  // 条件 1: 尽早抛出错误
	  if (!fruit) throw new Error('No fruit!');
	    // 条件 2: 必须是红色的
	    if (redFruits.includes(fruit)) {
	      console.log('red');
	    // 条件 3: 必须是大质量的
	    if (quantity > 10) {
	      console.log('big quantity');
	    }
	  }
	}
## 3、使用默认参数和解构
	// 一般写法
	function test(fruit, quantity) {
	  // 检查 null / undefined的情况
	  if (!fruit) return;
	  // 指定默认值：如果 quantity 参数没有传入，设置默认值为 1
	  const q = quantity || 1; 
	  console.log(`We have ${q} ${fruit}!`);
	}

	// 简洁写法 ：默认参数
	function test(fruit, quantity = 1) {
	  // 如果 quantity 参数没有传入，设置默认值为 1
	  if (!fruit) return;
	  console.log(`We have ${quantity} ${fruit}!`);
	}

	// 如果fruit是一个object
	// 一般写法
	function test(fruit) { 
	  // 当值存在时打印 fruit 的值
	  if (fruit && fruit.name)  {
	    console.log (fruit.name);
	  } else {
	    console.log('unknown');
	  }
	}

	// 解构 - 仅仅获取 name 属性
	// 为其赋默认值为空对象
	function test({name} = {}) {
	  console.log (name || 'unknown');
	}
## 4、倾向于对象遍历而不是Switch语句
	// 一般写法
	function test(color) {
	  // 使用条件语句来寻找对应颜色的水果
	  switch (color) {
	    case 'red':
	      return ['apple', 'strawberry'];
	    case 'yellow':
	      return ['banana', 'pineapple'];
	    case 'purple':
	      return ['grape', 'plum'];
	    default:
	      return [];
	  }
	}

	// 简洁写法：对象遍历
	const fruitColor = {
	  red: ['apple', 'strawberry'],
	  yellow: ['banana', 'pineapple'],
	  purple: ['grape', 'plum']
	};

	function test(color) {
	  return fruitColor[color] || [];
	}

	// 简洁写法：Map
	const fruitColor = new Map()
	  .set('red', ['apple', 'strawberry'])
	  .set('yellow', ['banana', 'pineapple'])
	  .set('purple', ['grape', 'plum']);
	function test(color) {
	  return fruitColor.get(color) || [];
	}

	// 简介语法：重构语法
	const fruits = [
	  { name: 'apple', color: 'red' }, 
	  { name: 'strawberry', color: 'red' }, 
	  { name: 'banana', color: 'yellow' }, 
	  { name: 'pineapple', color: 'yellow' }, 
	  { name: 'grape', color: 'purple' }, 
	  { name: 'plum', color: 'purple' }
	];
	function test(color) {
	  return fruits.filter(f => f.color == color);
	}
	test('red')   
	结果：[{ name: 'apple', color: 'red' }, 
	  { name: 'strawberry', color: 'red' }]
## 5、对 所有/部分 判断使用Array.every & Array.some
	// 一般写法
	const fruits = [
	  { name: 'apple', color: 'red' },
	  { name: 'banana', color: 'yellow' },
	  { name: 'grape', color: 'purple' }
    ];
	function test() {
	  let isAllRed = true;
	  // 条件：所有水果都是红色
	  for (let f of fruits) {
	    if (!isAllRed) break;
	    isAllRed = (f.color == 'red');
	  }
	  console.log(isAllRed); // false
	}

	// 简洁写法：
	const fruits = [
	  { name: 'apple', color: 'red' },
	  { name: 'banana', color: 'yellow' },
	  { name: 'grape', color: 'purple' }
    ];
	function test() {
	  const isAllRed = fruits.every(f => f.color == 'red');
	  console.log(isAllRed); // false
	}



