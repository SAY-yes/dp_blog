> Set 和 Map 主要的应用场景在于 数据重组 和 数据储存
## 一、Set集合
1、实例属性
* constructor： 构造函数
* size：元素数量

2、 操作方法
* add(value)：新增，相当于 array里的push
* delete(value)：存在即删除集合中value
* has(value)：判断集合中是否存在 value
* clear()：清空集合
* Array.from 方法可以将 Set 结构转为数组
```
const items = new Set([1, 2, 3, 2])
const array = Array.from(items)
console.log(array)	// [1, 2, 3]
// 或
const arr = [...items]
console.log(arr)	// [1, 2, 3]
```
> 可利用Set集合的自动去重功能为数组去重

3、遍历方法（遍历顺序为插入顺序）
* keys()：返回一个包含集合中所有键的迭代器
* values()：返回一个包含集合中所有值得迭代器
* entries()：返回一个包含Set对象中所有元素得键值对迭代器
* forEach(callbackFn, thisArg)：用于对集合成员执行callbackFn操作，如果提供了 thisArg 参数，回调中的this会是这个参数，没有返回值
```
let set = new Set(['a', 'b', 'c'])
console.log(set.keys())	// SetIterator {"a", "b", "c"}
console.log(set.values())	// SetIterator {"a", "b", "c"}
console.log(set.entries())	// SetIterator {"a" => "a", "b" => "b", "c" => "c"}

for (let item of set.keys()) {
  console.log(item);
}	// 'a'	'b'	 'c'
for (let item of set.values()) {
  console.log(item);
}	// 'a'	'b'	 'c'
for (let item of set.entries()) {
  console.log(item);
}	// ['a', 'a']	['b', 'b']	['c', 'c']

set.forEach((value, key) => {
    console.log(key + ' : ' + value)
})	// 'a' : 'a' 	'b' : 'b' 	'c' : 'c'
console.log([...set])	// ['a', 'b', 'c']
```
4、注意：
Set 可默认遍历，默认迭代器生成函数是 values() 方法
所以， Set可以使用 map、filter 方法
```
let set = new Set([1, 2, 3])
set = new Set([...set].map(item => item * 2))
console.log([...set])	// [2, 4, 6]

set = new Set([...set].filter(item => (item >= 4)))
console.log([...set])	//[4, 6]
```
因此，Set 很容易实现交集（Intersect）、并集（Union）、差集（Difference）
```
let set1 = new Set([1, 2, 3])
let set2 = new Set([4, 3, 2])

let intersect = new Set([...set1].filter(value => set2.has(value)))
let union = new Set([...set1, ...set2])
let difference = new Set([...set1].filter(value => !set2.has(value)))

console.log(intersect)	// Set {2, 3}
console.log(union)		// Set {1, 2, 3, 4}
console.log(difference)	// Set {1}
```
## 二、Weak Set集合
WeakSet 对象允许你将弱引用对象储存在一个集合中
1、WeakSet 与 Set 的区别：

* WeakSet 只能储存对象引用，不能存放值，而 Set 对象都可以
* WeakSet 对象中储存的对象值都是被弱引用的，即垃圾回收机制不考虑 WeakSet 对该对象的应用，如果没有其他的变量或属性引用这个对象值，则这个对象将会被垃圾回收掉（不考虑该对象还存在于 WeakSet 中），所以，WeakSet 对象里有多少个成员元素，取决于垃圾回收机制有没有运行，运行前后成员个数可能不一致，遍历结束之后，有的成员可能取不到了（被垃圾回收了），WeakSet 对象是无法被遍历的（ES6 规定 WeakSet 不可遍历），也没有办法拿到它包含的所有元素
* 用WeakSet构造函数创建的集合，支持3个方法：add(),has()和delete()
* 不支持forEach(),keys(),values()方法
* 不支持size属性
```
let set = new Set(),key={};  // 强引用的Set集合
set.add(key)
console.log(set.size)   // 1
key = null    // 清除了对原始对象的引用，但Set集合却保留了这个引用
console.log(set.size)   // 1
key = [...set][0]    // 取出该引用
console.log(key)    // {}

let set = new WeakSet(),key={};  // 弱引用的Set集合
set.add(key)
console.log(set.has(key))   // true
set.delete(key)   //或者key = null  Weak Set集合中的引用也自动移除
console.log(set.has(key))   // false
```
## 三、Map集合
1、属性：
* constructor：构造函数
* size：返回集合中所包含的元素个数

2、操作方法：
* set(key, value)：向字典中添加新元素
* get(key)：通过键查找特定的数值并返回
* has(key)：判断字典中是否存在键key
* delete(key)：通过键 key 从字典中移除对应的数据
* clear()：将这个字典中的所有元素删除

3、遍历方法
* keys()：将字典中包含的所有键名以迭代器形式返回
* values()：将字典中包含的所有数值以迭代器形式返回
* entries()：返回所有成员的迭代器
* forEach()：遍历字典的所有成员
```
const map = new Map([
            ['name', 'An'],
            ['des', 'JS']
        ]);
console.log(map.keys()) // MapIterator {"name", "des"}
console.log(map.values()) // MapIterator {"An", "JS"}
console.log(map.entries())	// MapIterator {"name" => "An", "des" => "JS"}
map.forEach((key, value) => {
    console.log(key + ' : ' + value)
})  // name : An	des : JS
```
4、注意
Map 结构的默认遍历器接口（Symbol.iterator属性），就是entries方法。
Map 结构转为数组结构，比较快速的方法是使用扩展运算符（...）
```
const reporter = {
  report: function(key, value) {
    console.log("Key: %s, Value: %s", key, value);
  }
};

let map = new Map([
    ['name', 'An'],
    ['des', 'JS']
])
map.forEach(function(value, key, map) {
  this.report(key, value);
}, reporter);
// Key: name, Value: An
// Key: des, Value: JS
```
5、与其他数据结构的相互转换
* Map 转 Array
```
const map = new Map([[1, 1], [2, 2], [3, 3]])
console.log([...map])	// [[1, 1], [2, 2], [3, 3]]
```
* Array 转 Map
```
const map = new Map([[1, 1], [2, 2], [3, 3]])
console.log(map)	// Map {1 => 1, 2 => 2, 3 => 3}
```
* Map 转 Object
```
function mapToObj(map) {
    let obj = Object.create(null)
    for (let [key, value] of map) {
        obj[key] = value
    }
    return obj
}
const map = new Map().set('name', 'An').set('des', 'JS')
mapToObj(map)  // {name: "An", des: "JS"}
```
* Object 转 Map
```
function objToMap(obj) {
    let map = new Map()
    for (let key of Object.keys(obj)) {
        map.set(key, obj[key])
    }
    return map
}
objToMap({'name': 'An', 'des': 'JS'}) // Map {"name" => "An", "des" => "JS"}
```
* Map 转 JSON
```
function mapToJson(map) {
    return JSON.stringify([...map])
}
let map = new Map().set('name', 'An').set('des', 'JS')
mapToJson(map)	// "[["name","An"],["des","JS"]]"
```
* JSON 转 Map
```
function jsonToStrMap(jsonStr) {
  return objToMap(JSON.parse(jsonStr));
}
jsonToStrMap('{"name": "An", "des": "JS"}') // Map {"name" => "An", "des" => "JS"}
```

## 四、Weak Map集合
WeakMap 对象是一组键值对的集合，其中的键是弱引用对象，而值可以是任意。
> 注意，WeakMap 弱引用的只是键名，而不是键值。键值依然是正常引用。

特点：
* Weak Map集合的键名必须是一个非null类型的对象
* Weak Map集合支持has(),set(),get()和delete()方法
* Weak Map集合不支持size属性
* 和Weak Set集合一样，不支持键名枚举，从而不支持forEach()与clear()方法
> WeakMap 中，每个键对自己所引用对象的引用都是弱引用，在没有其他引用和该键引用同一对象，这个对象将会被垃圾回收（相应的key则变成无效的），所以，WeakMap 的 key 是不可枚举的。

## 五、总结
1、Set
* 成员唯一、无序且不重复
* [value, value]，键值与键名是一致的（或者说只有键值，没有键名）
* 可以遍历，方法有：add、delete、has
2、WeakSet
* 成员都是对象
* 成员都是弱引用，可以被垃圾回收机制回收，可以用来保存DOM节点，不容易造成内存泄漏
* 不能遍历，方法有add、delete、has
3、Map
* 本质上是键值对的集合，类似集合
* 可以遍历，方法很多可以跟各种数据格式转换
4、WeakMap
* 只接受对象作为键名（null除外），不接受其他类型的值作为键名
* 键名是弱引用，键值可以是任意的，键名所指向的对象可以被垃圾回收，此时键名是无效的
* 不能遍历，方法有get、set、has、delete