## 一、知道子元素的宽高   

    <div class="wp">
        <div class="box size">123123</div>
    </div>   
    /* 公共代码 */
    .wp{
        width: 300px;
        height: 300px;
        background-color: antiquewhite;
    }
    .box{
        background-color: aquamarine;
    }
    .box.size{
        width:100px;
        height:100px;
    }
1、absolute + 负margin

    /* 定位代码 */
    .wp{
        position:relative;
    }
    .box{
        position:absolute;
        top:50%;
        left:50%;
        margin-left:-50px;
        margin-top:-50px;
    }  
2、absolute + margin auto   

    /* 定位代码 */
    .wp{
        position:relative;
    }
    .box{
        position:absolute;
        top:0;
        left:0;
        right:0;
        bottom:0;
        margin:auto;
    }    
3、absolute + calc   
calc()是css3提供的动态计算函数。

    /* 定位代码*/
    .wp{
        position:relative;
    }
    .box{   
        position:absolute;
        top:calc(50%-50px);
        left:calc(50%-50px);
    }
## 二、不知道子元素的宽高

    <div class="wp">
        <div class="box">123123</div>
    </div>
    /* 公共代码*/
    .wp{
        width: 300px;
        height: 300px;
        background-color: antiquewhite;
    }
    .box{
        background-color: aquamarine;
    }
1、absolute + transform

    <div class="wp">
        <div class="box">123123</div>
    </div>
    /* 定位代码*/
    .wp{
        position:relative;
    }
    .box{
        position:absolute;
        top:50%;
        left:50%;
        transform:translate(-50%,-50%);
    }
2、lineheight

    /* 定位代码 */
    .wp{
        line-height:300px;
        text-align:center;
    }
    .box{
        display:inline-block;
        line-height:initial;
    }

3、writing-mode

    <div class="wp">
        <div class="wp-inner">
            <div class="box">123123</div>
        </div>
    </div>
    /* writing-mode属性: 改变文字的显示方向 */
    .wp{
        width: 300px;
        height: 300px;
        background-color: antiquewhite;
        writing-mode:vertical-lr;
        text-align: center
        
    }
    .wp-inner{
        /* background-color: brown; */
        display: inline-block;
        writing-mode: horizontal-tb;
        width: 100%;
    }
    .box{
        background-color: aquamarine;
        display: inline-block;

    }
4、table 
 
    <table>
        <tbody>
            <tr>
                <td class="wp">
                    <div class="box">123123</div>
                </td>
            </tr>
        </tbody>
    </table>
    /* tabel单元格中的内容天然就是垂直居中的，只要添加一个水平居中属性就好了 */
    .wp{
        text-align:center;
    }
    .box{
        display:inline-block;
    }
5、css-table

    .wp{
        display:table-cell;
        text-align:center;
        vertical-align:middle;
    }
    .box{
        display:inline-block;
    }
6、flex布局

    .wp{
        display:flex;
        justify-content:center;
        align-items:center;
    }
>注：目前在移动端已经完全可以使用flex了，PC端需要看自己业务的兼容性情况
7、grid

    .wp{
        display:grid;
    }
    .box{
        align-self:center;
        justify-self:center;
    }
>注：代码量也很少，但兼容性不如flex，不推荐使用
## 三、利用vertical-align实现水平垂直居中
>vertical-align 属性设置元素的垂直对齐方式。该属性定义行内元素的基线相对于该元素所在行的基线的垂直对齐。允许指定负长度值和百分比值。这会使元素降低而不是升高。在表单元格中，这个属性会设置单元格框中的单元格内容的对齐方式。

用法一：用在表格中，例如css-table
用法二：新建一个标尺

    <div class="wp">
        <div class="box">123123</div>
        <div class="help"></div>
    </div>
    .wp{
        width: 300px;
        height: 300px;
        background-color: antiquewhite;

        text-align: center;
    }

    .box{
        width: 100px;
        height: 100px;
        background-color: aquamarine;

        display: inline-block;
        vertical-align: middle;
    }

    .help{
        width: 0;
        height: 100%;
        display: inline-block;
        vertical-align: middle;
    }

## 总结：
* PC端有兼容性要求，宽高固定，推荐absolute + 负margin
* PC端有兼容要求，宽高不固定，推荐css-table
* PC端无兼容性要求，推荐flex
* 移动端推荐使用flex