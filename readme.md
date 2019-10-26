# DomToJson 

Simple parse.
Todo: need type.

Sample use :
=== 

### To json

html :
```html
<div id="app">
        <p>Lorem ipsum <em class="class">dolor</em> sit amet, <b>quo lorem cetero epicurei id</b>, discere percipit qui ei. </p>
        <p>Lorem ipsum dolor sit amet, quo lorem cetero epicurei id, discere percipit qui ei. </p>
        <div style="color:red;"><p>Lorem ipsum dolor sit amet</p><br>
        <img id="image" src="https://picsum.photos/id/919/200/200" alt="randomimg"></div> 
</div>
```

Javascript :
```javascript 
    let json = DTM.toJson(document.getElementById("app"))
    console.log(json)
```

the console: 
```
{"0":{"node":"p","text":"Lorem ipsum ","childs":[{"node":"em","attr":[{"name":"class","value":"class"}],"text":"dolor"},{"node":"#text","text":" sit amet, "},{"node":"b","text":"quo lorem cetero epicurei id"},{"node":"#text","text":", discere percipit qui ei. "}]},"1":{"node":"p","text":"Lorem ipsum dolor sit amet, quo lorem cetero epicurei id, discere percipit qui ei. "},"2":{"node":"div","attr":[{"name":"style","value":"color:red;"}],"childs":[{"node":"p","text":"Lorem ipsum dolor sit amet"},{"node":"br"},{"node":"#text","text":"\n        "},{"node":"img","attr":[{"name":"id","value":"image"},{"name":"src","value":"https://picsum.photos/id/919/200/200"},{"name":"alt","value":"randomimg"}]}]}}

```

### to Dom 

the console: 
```
{"0":{"node":"p","text":"Lorem ipsum ","childs":[{"node":"em","attr":[{"name":"class","value":"class"}],"text":"dolor"},{"node":"#text","text":" sit amet, "},{"node":"b","text":"quo lorem cetero epicurei id"},{"node":"#text","text":", discere percipit qui ei. "}]},"1":{"node":"p","text":"Lorem ipsum dolor sit amet, quo lorem cetero epicurei id, discere percipit qui ei. "},"2":{"node":"div","attr":[{"name":"style","value":"color:red;"}],"childs":[{"node":"p","text":"Lorem ipsum dolor sit amet"},{"node":"br"},{"node":"#text","text":"\n        "},{"node":"img","attr":[{"name":"id","value":"image"},{"name":"src","value":"https://picsum.photos/id/919/200/200"},{"name":"alt","value":"randomimg"}]}]}}
```

Javascript :
```javascript 
    let dom = DTM.toDom(json, "div-app")
    console.log(dom)
```

```html
<div-app>
        <p>Lorem ipsum <em class="class">dolor</em> sit amet, <b>quo lorem cetero epicurei id</b>, discere percipit qui ei. </p>
        <p>Lorem ipsum dolor sit amet, quo lorem cetero epicurei id, discere percipit qui ei. </p>
        <div style="color:red;"><p>Lorem ipsum dolor sit amet</p><br>
        <img id="image" src="https://picsum.photos/id/919/200/200" alt="randomimg"></div> 
</div-app>
```


## API

# exclude 
he exclude only style for the node div and add everyone else.
```javascript 
    let dtm = DTM.newInstance();
    dtm.api(api => {
        api.set({node: "div", exclude: ["style"]})
     return api;
    })
    console.log(dom)
```


# include 
he include only style for the node div.
```javascript 
    let dtm = DTM.newInstance();
    dtm.api(api => {
        api.set({node: "div", include: ["style"]})
     return api;
    })
    console.log(dom)
```


MIT LICENSE.