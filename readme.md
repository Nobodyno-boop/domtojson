# DomToJson

For node

> npm i @poulpi/domtojson

## [For browser (Click on me :rice_ball: )](https://unpkg.com/@poulpi/domtojson@latest/dist/bundle.min.js)

- [ToJson](#to-json)
- [ToDom](#to-dom)
- [WithGzip](#with-gzip)

# Feature

- Support cjs/es module
- Bundle minify for web [unpkg](https://unpkg.com/@poulpi/domtojson@latest/dist/bundle.min.js)
- Typescript support with type definition
- Compression Option with gzip base64 (its really cool try it.)

---

initialise:

```javascript
let parser = new DTM(true); // with debug mod;

let parser = new DTM(false, true); // without debug mod but with gzip;

// module

import Parser from "@poulpi/domtojson";
const parser = new Parser();
```

---

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
let json = new DTM().toJson(document.getElementById("app"));
console.log(json);
```

the console:

```
[{"node":"#text","text":"\n      "},{"node":"p","text":"\n        Lorem ipsum ","childs":[{"node":"em","attr":[{"name":"class","value":"class"}],"text":"dolor"},{"node":"#text","text":" sit amet,\n        "},{"node":"b","text":"quo lorem cetero epicurei id"},{"node":"#text","text":", discere percipit qui ei.\n      "}]},{"node":"#text","text":"\n      "},{"node":"p","text":"\n        Lorem ipsum dolor sit amet, quo lorem cetero epicurei id, discere percipit\n        qui ei.\n      "},{"node":"#text","text":"\n      "},{"node":"div","attr":[{"name":"style","value":"color:red;"}],"text":"\n        ","childs":[{"node":"img","attr":[{"name":"id","value":"image"},{"name":"src","value":"https://picsum.photos/id/919/200/200"},{"name":"alt","value":"randomimg"}]},{"node":"#text","text":"\n      "}]},{"node":"#text","text":"\n    "}]

```

### to Dom

When you have gzip string you can use this function without enable gzip in constructor.

---

the console:

```
[{"node":"#text","text":"\n      "},{"node":"p","text":"\n        Lorem ipsum ","childs":[{"node":"em","attr":[{"name":"class","value":"class"}],"text":"dolor"},{"node":"#text","text":" sit amet,\n        "},{"node":"b","text":"quo lorem cetero epicurei id"},{"node":"#text","text":", discere percipit qui ei.\n      "}]},{"node":"#text","text":"\n      "},{"node":"p","text":"\n        Lorem ipsum dolor sit amet, quo lorem cetero epicurei id, discere percipit\n        qui ei.\n      "},{"node":"#text","text":"\n      "},{"node":"div","attr":[{"name":"style","value":"color:red;"}],"text":"\n        ","childs":[{"node":"img","attr":[{"name":"id","value":"image"},{"name":"src","value":"https://picsum.photos/id/919/200/200"},{"name":"alt","value":"randomimg"}]},{"node":"#text","text":"\n      "}]},{"node":"#text","text":"\n    "}]
```

The seconde value is optinal for toDom() [see types](types/parser.d.ts).

Javascript :

```javascript
let el = document.createElement("div-app");
let dom = new DTM.toDom(json, el);
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

### With Gzip

Gzip optimise the json, for 1mb of data json, you can get 0.1mb with gzip.

the html

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

js:

```javascript
let parser = new DTM(false, true);
...
```

the result

```javascript
Uint8Array(286) [31, 139, 8, 0, 0, 0, 0, 0, 0, 3, 157, 146, 91, 110, 195, 32, 16, 69, 183, 50, 162, 191, 86, 156, 246, 47, 116, 11, 221, 65, 154, 15, 10, 163, 120, 36, 48, 4, 198, 81, 171, 42, 123, 47, 118, 42, 131, 106, 55, 125, 88, 178, 44, 230, 117, 15, 115, 189, 127, 23, 189, 55, 40, 164, 184, 99, 124, 101, 209, 136, 233, 35, 197, 115, 15, 211, 35, 46, 205, 92, 18, 150, 105, 128, 39, 31, 209, 1, 133, 52, 56, 200, 121, 221, 145, 53, 73, 200, 253, 220, …] // binary buffer
```

## API

# include

Include html attribute with a selector or all attribute.

```javascript
let parser = new DTM();
parser.api((x) => {
  return x.in({
    node: "div", // only on div node.
    value: [
      { name: "class", attr: ["bg-g", "txt-a", "io-i"] }, // include only bg-g, txt-a, etc.
      { name: "l" }, // include all attribute in l
      { name: "id" },
    ],
  });
});
```

# exclude (remove for v0.2)

MIT LICENSE.
