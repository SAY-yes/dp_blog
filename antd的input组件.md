## 一、antd的Input组件（包括Input.TextArea、Input.Search、Input.Password ）在鼠标经过及获取焦点时会有蓝色的边框显示，最初尝试通过设置outline:none的方法去掉这个边框，但是发现这个方法不起作用。

解决方法如下：

	.ant-input-affix-wrapper .ant-input:focus,.ant-input-affix-wrapper .ant-input:hover  {
		border: 1px solid #d9d9d9;
		box-shadow: none;
	}

## 二、修改Input组件placeholder的字体颜色

	@mixin placeholder_color($color) {
		input::-webkit-input-placeholder {
			color: $color;
		}
		input::-moz-placeholder {
			/* Mozilla Firefox 19+ */
			color: $color;
		}
		input:-moz-placeholder {
			/* Mozilla Firefox 4 to 18 */
			color: $color;
		}
		input:-ms-input-placeholder {
			/* Internet Explorer 10-11 */
			color: $color;
		}
	}
