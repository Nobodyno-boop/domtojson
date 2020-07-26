# DomToJson

For node

> npm i @poulpi/domtojson

## [For browser (Click on me :rice_ball: )](https://unpkg.com/@poulpi/domtojson@latest/dist/bundle.js)

- [ToJson](#to-json)
- [ToDom](#to-dom)

# Feature

- Support cjs/es module
- Browser bundle with [unpkg](https://unpkg.com/@poulpi/domtojson@latest/dist/bundle.js)
- Typescript support with type definition

### To json

html :

```html
<div id="app">
  <p>
    Lorem ipsum <em class="class">dolor</em> sit amet,
    <b>quo lorem cetero epicurei id</b>, discere percipit qui ei.
  </p>
  <p>
    Lorem ipsum dolor sit amet, quo lorem cetero epicurei id, discere percipit
    qui ei.
  </p>
  <div style="color:red;">
    <p>Lorem ipsum dolor sit amet</p>
    <br />
    <img
      id="image"
      src="https://picsum.photos/id/919/200/200"
      alt="randomimg"
    />
  </div>
</div>
```

Javascript :

```javascript
let json = new DTM.Parser().toJson(document.getElementById("app"));
console.log(json);
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

The seconde value is optinal for toDom() [see types](types/parser.d.ts).

Javascript :

```javascript
let el = document.createElement("div-app");
let dom = new DTM.Parser().toDom(json, el);
console.log(dom);
```

```html
<div-app>
  <p>
    Lorem ipsum <em class="class">dolor</em> sit amet,
    <b>quo lorem cetero epicurei id</b>, discere percipit qui ei.
  </p>
  <p>
    Lorem ipsum dolor sit amet, quo lorem cetero epicurei id, discere percipit
    qui ei.
  </p>
  <div style="color:red;">
    <p>Lorem ipsum dolor sit amet</p>
    <br />
    <img
      id="image"
      src="https://picsum.photos/id/919/200/200"
      alt="randomimg"
    />
  </div>
</div-app>
```

## API

# exclude

he exclude only style for the node div and add everyone else.

```javascript
let dtm = new DTM.Parser().newInstance();
dtm.api((api) => {
  api.set({ node: "div", exclude: ["style"] });
  return api;
});
console.log(dom);
```

# include

he include only style for the node div.

```javascript
let dtm = new DTM.Parser().newInstance();
dtm.api((api) => {
  api.set({ node: "div", include: ["style"] });
  return api;
});
console.log(dom);
```

MIT LICENSE.

(Article medium.)
