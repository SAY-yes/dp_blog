### 移动端打印日志
1、CDN资源
```
<script src="https://cdn.bootcss.com/vConsole/3.2.2/vconsole.min.js"></script>
<script type="text/javascript">
	const url = window.location.href
	if(url.indexOf('test=true')!==-1){
		var vConsole = new VConsole();
	}
	
</script>
```
> 调试的时候调用http://www.***?test=true，即可打开console调试

2、安装模块
```
npm install vconsole
var vConsole = new VConsole();
```