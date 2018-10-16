## 1、JSX语法
* 将HTML语言直接写入带JS语言之中，这就是JSX语法。   
* JSX的语法规则是如果遇到HTML的标签，就用HTML的规则解析，如果遇到代码块，就用JS的规则解析。
* JSX允许直接在模板中插入JS变量，如果变量是一个数组，则会展开这个数组的所有成员查看，例如：   

        var arr = [
            <h1>Hello world!</h1>,
            <h2>React is awesome</h2>,
        ];
        ReactDOM.render(
        <div>{arr}</div>,
        document.getElementById('example')
        );
## 2、组件
* 所有组件中必须有自己的render方法，用于输出组件；
* 组件类的第一个字母必须大写，否则会报错；
* 组件只能包含一个顶层标签，否则会报错；
* 组件的class和for属性应该写为className和htmlFor；
* 父组件通过this.props.propName获取子组件的属性值。
## 3、this.props.children
>这个是个特例，这个代表的意思不是去找this.props的children属性，而是去找这个组件的所有子节点。

this.props.children 的值有三种可能：   
* 如果当前组件没有子节点，它就是 undefined ;     
* 如果有一个子节点，数据类型是 object ；    
* 如果有多个子节点，数据类型就是 array 。   

React 提供React.Children.map方法来遍历子节点，而不用担心 this.props.children 的数据类型是 undefined 还是 object。例如：
`React.Children.map(this.props.children, function (child) {return <li>{child}</li>})`

    class Row extends React.Component {
        render() {
            return <p>row</p>
        }
    };
    class Grid extends React.Component {
        render() {
            return <div>{this.props.children}</div>
        }
    }
    class Ren extends React.Component {
        render() {
            return <Grid>
                    <Row />
                    <Row />
                    <Row />  
                </Grid>
        }
    };
## 4、PropTypes
这个属性是组件类的属性，而不是组件的属性，这个PropTypes可以用来验证从组件传来的属性是否合法。例如：

    import React from 'react';
    import ReactDom from 'react-dom';
    import Name from './name';

    var name = 123

    ReactDom.render(
        <Name name= {name} />,
        document.getElementById('app')
    );
如上代码显示，Name组件的name属性的类型为number类型，而不是字符串，那么在组件类中，对这个属性进行验证：

    class Name extends React.Component {
    render () {
    return (
        <div>
        hello~<div>{this.props.name}</div>
        </div>
        );
    }
    }
    Name.propTypes = { name: React.PropTypes.string.isRequired };

进行验证后，验证不通过的话，会在控制台上报错:

    Invalid prop `name` of type `number` supplied to `Name`, expected `string`.
## 5、defaultProps 设置组件的默认值
    class Name extends React.Component {
        render () {
            return (
                <div>
                    hello~<div>{this.props.name}</div>
                </div>
                );
            }
        }

    Name.defaultProps = { name: "youngi" };
## 6、获取真实的DOM
据 React 的设计，所有的 DOM 变动，都先在虚拟 DOM 上发生，然后再将实际发生变动的部分，反映在真实 DOM上，这种算法叫做 DOM diff ，它可以极大提高网页的性能表现。例如：

    class Name extends React.Component {
        handleClick(){
            let va = this.refs.myText.value;
            console.log(va);
        }
        render (){
            return (
                <div>
                    <input type="text" ref="myText" />
                    <input type="button" 
                      value="Focus the text input" 
                      onClick={this.handleClick} 
                    />
                </div>
            );
        }
    }
this.refs.[refName].value 能获取到输入框里的数据。   
运行代码，点击按钮获取输入框的值，仍然报错：Uncaught TypeError: Cannot read property 'refs'。需要将事件里的this绑定到当前组件，改为onClick={this.handleClick.bind(this)}
## 7、表单
文本输入框的值，不能用 this.props.value 读取，而要定义一个 onChange 事件的回调函数，通过 event.target.value 读取用户输入的值。textarea 元素、select元素、radio元素都属于这种情况。

    class Input extends React.Component {
        constructor(props) {
            super(props);
            this.state = {value : "hello"};
        }
        handleChange(event){
            this.setState({value: event.target.value});
            let a = this.state.value
            console.log(a);
        }
        render () {
            let value = this.state.value;
            return (
            <div>
                <input type="text" value={value} onChange={this.handleChange.bind(this)} />
            </div>
            )
        }
    }
> 注意：state更新可能是异步的，所以input改变时a并未改变。
## 8、state
记住三个要点：
* 不要直接修改 state(状态)
* state(状态) 更新可能是异步的   

        this.setState({
            counter: this.state.counter + this.props.increment,
        }); 
        更改为：
        this.setState((prevState, props) => ({
            counter: prevState.counter + props.increment
        }));
* state(状态)更新会被合并  
当你调用 setState()， React 将合并你提供的对象到当前的状态中。所以当State是一个多键值的结构时，可以单独更新其中的一个，此时会进行“差分”更新，不会影响其他的属性值。
>执行setState()后能拿到最新的state值吗？   
&nbsp;&nbsp;&nbsp;setState()函数有两个参数，一个是对象，就是设置的状态，还有一个是回调函数，是在设置状态成功之后执行的，所以我们可以通过回掉拿到最新的state值。代码如下：

    updateData = (newData) => {
        this.setState(
            { data: newData },
            () => {
                // 这里打印的是最新的state值
                console.log(this.state.data);
            }
        );
    }
## 9、Ajax
组件的数据来源，通常是通过 Ajax 请求从服务器获取，可以使用 componentDidMount 方法设置 Ajax 请求，等到请求成功，再用 this.setState 方法重新渲染 UI.

    var UserGist = React.createClass({
    getInitialState: function() {
        return {
        username: '',
        lastGistUrl: ''
        };
    },
    componentDidMount: function() {
        $.get(this.props.source, function(result) {
        var lastGist = result[0];
        if (this.isMounted()) {
            this.setState({
            username: lastGist.owner.login,
            lastGistUrl: lastGist.html_url
            });
        }
        }.bind(this));
    },
    render: function() {
        return (
        <div>
            {this.state.username}'s last gist is
            <a href={this.state.lastGistUrl}>here</a>.
        </div>
        );
    }
    });
    ReactDOM.render(
    <UserGist source="https://api.github.com/users/octocat/gists" />,
    document.body
    );
## 10、定义组件的方法
1> 函数式定义的无状态组件（图形化界面）
>形式：   
function HelloComponent(`props`, /* context */) {   
  return `<div>Hello {props.name}</div>`   
}   
ReactDOM.render(`<HelloComponent name="Sebastian" />`, mountNode) 

>特点：   
a、组件不会被实例化，整体渲染性能得到提升；   
b、组件不能访问this对象；   
c、组件无法访问生命周期的方法；   
d、无状态组件只能访问输入的props，同样的props会得到同样的渲染结果，不会有副作用。   
所以，只要有可能，尽量使用无状态组件。

例如：

        const person = {
            name: "michel",
            age: 31
        }

        const App = ({ person1 }) => <h1>{ person.name }</h1>

        ReactDOM.render(
            <App person1={person} />,
            document.body
        );
        
2> 通过es6的class定义

        class InputControlES6 extends React.Component {
            constructor(props) {
                super(props);
                this.state = {
                    text: props.initialValue || 'placeholder'
            };
            // ES6 类中函数必须手动绑定
            this.handleChange = this.handleChange.bind(this);
        }

        handleChange(event) {
            this.setState({
                text: event.target.value
            });
        }

        render() {
            return (
                <div>
                    Type something:
                    <input onChange={this.handleChange}
                        value={this.state.text} />
                </div>
            );
        }
    }
    InputControlES6.propTypes = {
        initialValue: React.PropTypes.string
    };
    InputControlES6.defaultProps = {
        initialValue: 'aaa'
    };

3> 通过es5原生方法*React.createClass*定义

    var InputControlES5 = React.createClass({
         propTypes: {//定义传入props中的属性各种类型
            initialValue: React.PropTypes.string
        },
        defaultProps: { //组件默认的props对象
            initialValue: 'aaa'
        },
        // 设置 initial state
        getInitialState: function() {//组件相关的状态对象
            return {
                text: this.props.initialValue || 'placeholder'
            };
        },
        handleChange: function(event) {
            this.setState({ //this represents react component instance
                text: event.target.value
            });
        },
        render: function() {
            return (
                <div>
                    Type something:
                    <input onChange={this.handleChange} value={this.state.text} />
                </div>
            );
        }
    });
    
