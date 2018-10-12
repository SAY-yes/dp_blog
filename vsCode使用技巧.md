# 一、Emmet
## 1、简述
&nbsp;&nbsp;&nbsp;&nbsp;VsCode内置了Emmet语法,在后缀为.html/.css中输入缩写后按Tab键即会自动生成相应代码
>注意:&nbsp;&nbsp;在VsCode新版本中按Tab不再默认启用Emmet展开缩写!需要在首选项配置中将emmet.triggerExpansionOnTab设置为true值!

语法基本规则如下: 

    E 代表HTML标签。   
    E#id 代表id属性。   
    E.class 代表class属性。   
    E[attr=foo] 代表某一个特定属性。   
    E{foo} 代表标签包含的内容是foo。   
    E>N 代表N是E的子元素。   
    E+N 代表N是E的同级元素。   
    E^N 代表N是E的上级元素。   
## 2、基础用法
* 元素/标签   
使用元素的名称，如div或p来生成HTML标签。 只要知道元素的缩写,Emmet会自动转换成对应标签。  
例如：div => `<div></div>`   
* 文本操作符   
如果想在生成元素的同时添加文本内容可以使用{}   
例如：div{这是一段文本}  => `<div>这是一段文本</div>`
* 属性操作符   
1> id和class   
div#page => `<div id="page"></div>`   
div.test1.test2.test3 => `<div class="test1.test2.test3"></div>`   
2> 自定义属性   
a[data-title="customer"] => `<a data-title="customer"></a>`
* 嵌套操作符   
1> 子级：> 

        div#pageId > ul > li => 
        <div id="pageId"> 
            <ul> 
                <li></li> 
            </ul> 
        </div>

    2> 同级：+  

        div#pageId + div.child => 
        <div id="pageId"></div> 
        <div class="child"></div>  

    3> 父级：^  

        div>p.parent>span.child ^ ul.brother>li => 
        <div> 
            <p class="parent">
                <span class="child"></span>
            </p> 
            <ul class="brother"> 
                <li></li> 
            </ul> 
        </div>
* 分组操作符   
&nbsp;&nbsp;&nbsp;分组使用( )来实现缩写的分离。比如这个例子，如果不加括号那么a将作为span的子级元素生成，加上括号a将与()内的元素同级。

        div>(ul>li+span)>a
        =>
        <div>
            <ul>
                <li></li>
                <span></span>
            </ul>
            <a href=""></a>
        </div>
* 乘法   
使用N即可自动生成重复项。   
例如： ul>li*3     
* 自动计数   
对于生成重复项时增加一个序号,只需要加上$符号即可。   

        ul>li.item${item number:$}*3    
        => 
        <ul>
            <li class="item1">item number:1</li>
            <li class="item2">item number:2</li>
            <li class="item3">item number:3</li>
        </ul>   

    如果生成两位数则使用两个连续的$$,更多位数以此类推...   
    使用@修饰符，可以更改编号方向（升序或降序）和基数（例如起始值）。   
    注意这个操作符在$之后添加。   
    @-表示降序,@+表示升序,默认使用升序.   
    @N可以改变起始值.需要注意的是如果配合升降序使用的话N是放到+-符后.   
     
        ul>li.item$@-*3
        =>
        <ul>
            <li class="item3"></li>
            <li class="item2"></li>
            <li class="item1"></li>
        </ul>
        ---------------------------
        ul>li.item$@-10*3
        =>
        <ul>
            <li class="item12"></li>
            <li class="item11"></li>
            <li class="item10"></li>
        </ul>
    缩写代码不要有空格，否则是不会进行转换的。
## 3、高级用法   
* 模拟文本/随机文本   
在开发时经常要填充一些文本内容占位，Emmet内置了Lorem Ipsum功能来实现。loremN或者lipsumN，N表示生成的单词数，是正整数，可省略。

        lorem
        => Lorem ipsum dolor sit amet, consectetur adipisicing elit. Suscipit quia commodi vero sint omnis fugiat excepturi reiciendis necessitatibus totam asperiores, delectus saepe nulla consequuntur nostrum! Saepe suscipit recusandae repellendus assumenda.

        (p>lorem4)*3
        =>
        <p>Lorem ipsum dolor sit.</p>
        <p>Labore aperiam, consequuntur architecto.</p>
        <p>Quidem nisi, cum odio!</p>
# 二、snippet   
snippet，即代码段，可以帮助快速地输入重复的代码。
## 1、进入设置文件   
*   通过快捷键「Ctrl + Shift + P」打开命令窗口（All Command Window），输入「snippet」，点选「首选项：配置用户代码段片段」   
* 点击界面最左侧竖栏（也即活动栏）最下方的齿轮按钮，在弹出来的菜单中点选「用户代码片段」
## 2、组成
* prefix：前缀，定义了 snippets 从 IntelliSense 中呼出的关键字;
* body： 主体，即模板的主体内容，其中每个字符串表示一行;
* description：说明，会在 IntelliSense 候选栏中出现。未定义的情况下直接显示对象名。
## 3、body基本用法
* Tabstops：制表符   
使用 $1，$2 等指定光标位置。这些数字指定了光标跳转的顺序。特别地，$0表示最终光标位置。相同序号的「Tabstops」被链接在一起，将会同步更新。
* Placeholders：占位符   
「Placeholder」是带有默认值的「Tabstops」，如${1：foo}。「placeholder」文本将被插入「Tabstops」位置，并在跳转时被全选，以方便修改。
    >例如：   
${1:name_t} {\n\t$2\n}   
作为「Placeholder」的name_t一方面可以提供默认的结构名称，另一方面可以作为输入的提示。
* Choice：可选项   
「Choice」是提供可选值的「Placeholder」。其语法为一系列用逗号隔开，并最终被两个竖线圈起来的枚举值，比如 ${1|one,two,three|}。当光标跳转到该位置的时候，用户将会被提供多个值（one 或 two 或 three）以供选择。
* Variables：变量   
使用$name或${name:default}可以插入变量的值。当变量未赋值时（如），将插入其缺省值或空字符串。可以使用的「Variable」如下：   
    TM_SELECTED_TEXT：当前选定的文本或空字符串；    
    >注：选定后通过在命令窗口点选「插入代码片段」插入。 

    TM_CURRENT_LINE：当前行的内容；   
    TM_CURRENT_WORD：光标所处单词或空字符串    
    >注：所谓光标一般为文本输入处那条闪来闪去的竖线，该项可定制。单词使用 VSCode 选词（Word Wrap）器选择。你最好只用它选择英文单词，因为这个选择器明显没有针对宽字符优化过，它甚至无法识别宽字符的标点符号。      

    TM_LINE_INDEX：行号（从零开始）；   
    TM_LINE_NUMBER：行号（从一开始）；   
    TM_FILENAME：当前文档的文件名；   
    TM_FILENAME_BASE：当前文档的文件名（不含后缀名）；   
    TM_DIRECTORY：当前文档所在目录；    
    TM_FILEPATH：当前文档的完整文件路径；    
    CLIPBOARD：当前剪贴板中内容。 

    >此外，还有一些用于插入当前时间的变量，这里单独列出：

    CURRENT_YEAR: 当前年份；   
    CURRENT_YEAR_SHORT: 当前年份的后两位；   
    CURRENT_MONTH: 格式化为两位数字的当前月份，如 02；   
    CURRENT_MONTH_NAME: 当前月份的全称，如 July；   
    CURRENT_MONTH_NAME_SHORT: 当前月份的简称，如 Jul；   
    CURRENT_DATE: 当天月份第几天；   
    CURRENT_DAY_NAME: 当天周几，如 Monday；   
    CURRENT_DAY_NAME_SHORT: 当天周几的简称，如 Mon；    
    CURRENT_HOUR: 当前小时（24 小时制）；     
    CURRENT_MINUTE: 当前分钟；     
    CURRENT_SECOND: 当前秒数。      
    >注：这些都是变量名，不是宏，在实际使用的时要加上 $ 符。    
