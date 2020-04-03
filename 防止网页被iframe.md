### 1、php防止方法
 
`header('X-Frame-Options:Deny');`

### 2、Nginx防止方法
把下面这行添加到nginx的站点配置文件中，加到'http', 'server' 或者 'location' 的配置中均可。
`add_header X-Frame-Options SAMEORIGIN`

### 3、js防止方法
将它放入网页源码的头部
```
<script language="javascript">
if(top != self){
    location.href = "about:blank";
}
```