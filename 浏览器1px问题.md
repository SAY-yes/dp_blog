### 1. :before, :after与transform
```
.mx-1px {
  position: relative;
  height: 200px;
}
.mx-1px:before {
  position: absolute;
  top: 0;
  left: 0;
  content: "";
  width: 100%;
  height: 1px;
  background-color:#ccc;
  -webkit-transform: scaleY(.5);
  transform: scaleY(.5)
}
```
### 2.viewport + rem + js

通过设置对应viewport的scale，这种方式就可以像以前一样轻松愉快的写 1px 了。

当 drp = 1时：initial-scale=1;

当 drp = 2时：initial-scale=0.5;

当 drp = 3时：initial-scale=0.3333333333333333
```
<html>
<head>
<title>1px question</title>
<meta http-equiv="Content-Type" content="text/html;charset=UTF-8">
<meta name="viewport" id="WebViewport" content="initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no">
<style>
html {
  font-size: 1px;
}
* {
  padding: 0;
  margin: 0;
}
.top_b {
  border-bottom: 1px solid #E5E5E5;
}

.a,.b {
  box-sizing: border-box;
  margin-top: 1rem;
  padding: 1rem;
  font-size: 1.4rem;
}

.a {
  width: 100%;
}

.b {
  background: #f5f5f5;
  width: 100%;
}
</style>
<script>
  var viewport = document.querySelector("meta[name=viewport]");
  //下面是根据设备像素设置viewport
  if (window.devicePixelRatio == 1) {
    viewport.setAttribute('content', 'width=device-width,initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no');
  }
  if (window.devicePixelRatio == 2) {
    viewport.setAttribute('content', 'width=device-width,initial-scale=0.5, maximum-scale=0.5, minimum-scale=0.5, user-scalable=no');
  }
  if (window.devicePixelRatio == 3) {
    viewport.setAttribute('content', 'width=device-width,initial-scale=0.3333333333333333, maximum-scale=0.3333333333333333, minimum-scale=0.3333333333333333, user-scalable=no');
  }
  var docEl = document.documentElement;
  var fontsize = 32* (docEl.clientWidth / 750) + 'px';
  docEl.style.fontSize = fontsize;
</script>
</head>
<body>
  <div class="top_b a">下面的底边宽度是虚拟1像素的</div>
  <div class="b">上面的边框宽度是虚拟1像素的</div>
</body>
</html>
```
