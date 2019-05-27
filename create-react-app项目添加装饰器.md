## 1、npm run eject
执行命令，在根目录会出现项目的配置文件

## 2、安装插件
npm install babel-preset-stage-2 --save-dev
npm install babel-preset-react-native-stage-0 --save-dev
在根目录下创建.babelrc

	{
		"presets":["react-native-stage-0/decorator-support"]
	}
>Cannot find module 'react-native-stage-0/decorator-support
{
  "presets": ["module:metro-react-native-babel-preset"],
   "plugins": [
    ["@babel/plugin-proposal-decorators", { "legacy": true }]   
  ]
}

## 3、说明
装饰器是一个函数，用来修改类的行为。

	<!-- decorator.js -->
	function decora(WrappedComponent){
		render(){
			return (
				<div>
					高阶组件
					<WrappedComponent />
				</div>
			)
		}
	}

	<!-- otherComponent -->
	import decora from './decorator.js'
	<!-- 不使用装饰器 -->
	class Other extends Component {
		render(){
			return (
				<div>这是other组件</div>
			)
		}
	}
	export default decora(Other)
	<!-- 使用装饰器 -->
	@decora
	class Other extends Component {
		render(){
			return (
				<div>这是other组件</div>
			)
		}
	}
	export default Other
	