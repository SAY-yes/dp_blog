## 一、区别：
1、React-router提供了一些router的核心api,包括Router,Route,Switch等，但是它没有提供dom操作进行跳转的api。
2、React-router-dom提供了BrowserRouter,Route,Link等api，我们可以通过dom的时间控制路由。

## 二、React-router-dom的核心用法
1、HashRouter和BrowserRouter
* HashRouter通过hash值来控制路由   
	原理：使用window.location.hash和hashchange事件构建路由
	url:localhost:3000/#/

		import {HashRouter,Route} from "react-router-dom"
		<HashRouter>
			<Route path="/" component={home}/>
		</HashRouter>
* BrowserRouter
	原理是HTML5 history API的pushState、popState和replaceState

		import {BrowserRouter,Route} from "react-router-dom"
		<BrowserRouter basename="/calendar">
			<Route path="/" component={home} />
		</BrowserRouter>
> basename:如果你的文件放在服务器的二级目录下则可以使用它。    
	当你的主页前面是有一级目录calendar时，同样会显示主页的内容。例如：localhost:3000/calendar/

2、Route

	<Route exact path="/" component={Home} />
exact:控制匹配到"/"路径下不会继续向下匹配。

3、Link和NavLink
* Link
	主要api是to，to可以接受string或者一个object，来控制url。

		<Link to="/course" />
		或者：
		<Link to={{
			pathname:'/course',
			search:'?sort=name',
			hash:'#the-hash',
			state:{formDashboard:true}
		}}/>

* NavLink
	它可以为当前选中的路由设置类名、样式以及回调函数等。

		<ul>
			<li>
				<NavLink exact activeClassName="selected"  activeStyle={{color:'red'}} to="/">home</NavLink>
			</li>
			<li>
				<NavLink activeClassName="selected" to="/second/1234">second</NavLink>
			</li>
		</ul>
		<Route exact path="/" component={Home}/>
		<Route path="/second/:id" component={Second}/>

4、MemoryRouter
将“URL”的历史记录保存在内存中（不读取或写入地址栏）的<路由器>。在测试和非浏览器环境（如React Native）中很有用

	<MemoryRouter>
		<App/>
	</MemoryRouter>

5、Redirect
渲染<Redirect>将导航到新位置。新位置将覆盖历史堆栈中的当前位置，如服务器端重定向（HTTP 3xx）

	import { Route, Redirect } from 'react-router'

	<Route exact path="/" render={() => (
	loggedIn ? (
	<Redirect to="/dashboard"/>
	) : (
	<PublicHomePage/>
	)
	)}/>
