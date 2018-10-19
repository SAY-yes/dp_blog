原数据：

    [
        {
        "areaName":"b1",
        "areaType":"a",
        "id":2,
        "children":[
            {
            "areaName":"b2",
            "areaType":"b",
            "id":52,
            "children":[
                {
                "areaName":"b3",
                "areaType":"a",
                "id":502,
                }
            ]
            }
        ]
        }
    ]
改变后的数据：

    [
        {
        "value":2,
        "lable":"b1",
        "children":[
            {
            "value":52,
            "lable":"b2",
            "children":[
                {
                "value":502,
                "lable":"b3",
                }
            ]
            }
        ]
        }
    ]
### 方法一：深拷贝原理
    var objDeepCopy = function (source) {
        var sourceCopy = source instanceof Array ? [] : {};
        for (var item in source) {
        if(item === "areaName"){
            sourceCopy["lable"] = source[item]
        }
        if(item === "id"){
            sourceCopy["value"] = source[item]
        }
        if( typeof source[item] === 'object'){
            sourceCopy[item] = objDeepCopy(source[item])
        }
        }
        return sourceCopy;
    }

或者：

    var objDeepCopy = function (source) {
      var sourceCopy = [] 
      source&&source.map(ele=> {
        var objCopy = {}
        objCopy["lable"] = ele["areaName"]
        objCopy["value"] = ele["id"]
        if(ele["children"]){
          objCopy["children"] = objDeepCopy(ele["children"])
        }
        sourceCopy.push(objCopy)
      })
      return sourceCopy;
    }
### 方法二：删除、更改key值
    // 创建key值的映射
    var keyMap = {
        "id" : "value",
        "areaName" : "label"
    };

    function reg(source){
        source.forEach(ele=>{
            delete(ele["areaType"]);
            if(!ele.children){
                for(key in ele){
                    var newKey = keyMap[key]
                    ele[newKey] = ele[key]
                    delete ele[key]
                }
            }else{
                reg(ele.children)
            }
        })
    }
### 方法三：正则
    let str = JSON.stringify(source)
    let cat = JSON.parse(str.replace(/id/g,"value").replace(/areaName/g,"lable").replace(/"areaType":"a",/g,'').replace(/"areaType":"b",/g,''))
    
    console.log(cat)