(function(e){function t(t){for(var r,a,s=t[0],c=t[1],u=t[2],_=0,l=[];_<s.length;_++)a=s[_],Object.prototype.hasOwnProperty.call(i,a)&&i[a]&&l.push(i[a][0]),i[a]=0;for(r in c)Object.prototype.hasOwnProperty.call(c,r)&&(e[r]=c[r]);d&&d(t);while(l.length)l.shift()();return o.push.apply(o,u||[]),n()}function n(){for(var e,t=0;t<o.length;t++){for(var n=o[t],r=!0,a=1;a<n.length;a++){var s=n[a];0!==i[s]&&(r=!1)}r&&(o.splice(t--,1),e=c(c.s=n[0]))}return e}var r={},a={app:0},i={app:0},o=[];function s(e){return c.p+"js/"+({}[e]||e)+"."+{"chunk-14cbb28b":"871b6791","chunk-15c2a44a":"01d22821","chunk-2d0ddbee":"2d0a4f47","chunk-2d217357":"606f1879"}[e]+".js"}function c(t){if(r[t])return r[t].exports;var n=r[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,c),n.l=!0,n.exports}c.e=function(e){var t=[],n={"chunk-14cbb28b":1,"chunk-15c2a44a":1};a[e]?t.push(a[e]):0!==a[e]&&n[e]&&t.push(a[e]=new Promise((function(t,n){for(var r="css/"+({}[e]||e)+"."+{"chunk-14cbb28b":"8fb80e58","chunk-15c2a44a":"7292dfd6","chunk-2d0ddbee":"31d6cfe0","chunk-2d217357":"31d6cfe0"}[e]+".css",i=c.p+r,o=document.getElementsByTagName("link"),s=0;s<o.length;s++){var u=o[s],_=u.getAttribute("data-href")||u.getAttribute("href");if("stylesheet"===u.rel&&(_===r||_===i))return t()}var l=document.getElementsByTagName("style");for(s=0;s<l.length;s++){u=l[s],_=u.getAttribute("data-href");if(_===r||_===i)return t()}var d=document.createElement("link");d.rel="stylesheet",d.type="text/css",d.onload=t,d.onerror=function(t){var r=t&&t.target&&t.target.src||i,o=new Error("Loading CSS chunk "+e+" failed.\n("+r+")");o.code="CSS_CHUNK_LOAD_FAILED",o.request=r,delete a[e],d.parentNode.removeChild(d),n(o)},d.href=i;var m=document.getElementsByTagName("head")[0];m.appendChild(d)})).then((function(){a[e]=0})));var r=i[e];if(0!==r)if(r)t.push(r[2]);else{var o=new Promise((function(t,n){r=i[e]=[t,n]}));t.push(r[2]=o);var u,_=document.createElement("script");_.charset="utf-8",_.timeout=120,c.nc&&_.setAttribute("nonce",c.nc),_.src=s(e);var l=new Error;u=function(t){_.onerror=_.onload=null,clearTimeout(d);var n=i[e];if(0!==n){if(n){var r=t&&("load"===t.type?"missing":t.type),a=t&&t.target&&t.target.src;l.message="Loading chunk "+e+" failed.\n("+r+": "+a+")",l.name="ChunkLoadError",l.type=r,l.request=a,n[1](l)}i[e]=void 0}};var d=setTimeout((function(){u({type:"timeout",target:_})}),12e4);_.onerror=_.onload=u,document.head.appendChild(_)}return Promise.all(t)},c.m=e,c.c=r,c.d=function(e,t,n){c.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},c.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},c.t=function(e,t){if(1&t&&(e=c(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(c.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)c.d(n,r,function(t){return e[t]}.bind(null,r));return n},c.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return c.d(t,"a",t),t},c.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},c.p="/",c.oe=function(e){throw console.error(e),e};var u=window["webpackJsonp"]=window["webpackJsonp"]||[],_=u.push.bind(u);u.push=t,u=u.slice();for(var l=0;l<u.length;l++)t(u[l]);var d=_;o.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("56d7")},"034f":function(e,t,n){"use strict";n("85ec")},"245e":function(e,t,n){"use strict";n("6487")},"56d7":function(e,t,n){"use strict";n.r(t);n("e260"),n("e6cf"),n("cca6"),n("a79d"),n("e792"),n("0cdd");var r=n("2b0e"),a=n("5f5b"),i=n("b1e0");n("ab8b"),n("2dd8");r["default"].use(a["a"]),r["default"].use(i["a"]);var o=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"app"}},[n("div",{attrs:{id:"nav"}}),n("router-view")],1)},s=[],c={data:function(){return{throughApp:!1}}},u=c,_=(n("034f"),n("2877")),l=Object(_["a"])(u,o,s,!1,null,null,null),d=l.exports,m=(n("d3b7"),n("3ca3"),n("ddb0"),n("8c4f")),p=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("transition",{attrs:{name:"slide"}},["JoinSession"===(e.viewController||e.viewSelected)?n("div",{staticClass:"view-container",staticStyle:{position:"fixed","z-index":"3"}},[n("JoinSession")],1):e._e()]),n("transition",{attrs:{name:"slide"}},["CreatingSession"===(e.viewController||e.viewSelected)?n("div",{staticClass:"view-container",staticStyle:{position:"fixed","z-index":"3"}},[n("CreateNewRoom",{attrs:{username:e.username}})],1):e._e()]),"Practice"===e.viewController?n("div",{staticClass:"view-container"},[n("Practice")],1):"Leaderboard"===e.viewController?n("div",{staticClass:"view-container"},[n("Leaderboard")],1):"Info"===e.viewController?n("div",{staticClass:"view-container"},[n("Info")],1):e._e(),e.viewController&&e.viewSelected?e._e():n("div",[n("div",{on:{click:function(t){return e.$router.push("/profile/"+e.username)}}},[n("b-icon-person",{staticClass:"profile-icon"})],1),n("div",{staticClass:"center"},[n("b-input-group",{staticClass:"mt-3",staticStyle:{padding:"2.5%"},attrs:{prepend:"Username"}},[n("b-form-input",{model:{value:e.username,callback:function(t){e.username=t},expression:"username"}}),n("b-input-group-append",[n("b-button",{attrs:{variant:e.searchColor}})],1)],1),n("p",{staticClass:"error-msg-transition",style:e.errorMsg?"color:red;transform:translateY(0%)":"color:rgba(0,0,0,0);transform:translateY(50%)"},[e._v(e._s(e.errorMsg?e.errorMsg:"placeholder"))]),n("p",{staticClass:"error-msg-transition",style:e.errorMsg||!e.username?"translateY(0%)":"color:rgba(0,0,0,0);transform:translateY(50%)"},[e._v("Enter A Valid Username To Unlock")]),n("b-button",{staticClass:"btn-lg main-menu-button",attrs:{variant:"secondary",pill:"",disabled:e.errorMsg||!e.username},on:{click:function(t){return e.switchView("JoinSession",!0)}}},[n("div",{staticStyle:{position:"relative"}},[n("span",[e._v("Join Session")]),n("b-icon-chevron-right",{staticStyle:{position:"absolute",left:"95%","margin-top":"0.5vh"}})],1)]),n("b-button",{staticClass:"btn-lg main-menu-button",attrs:{variant:"primary",pill:"",disabled:e.errorMsg||!e.username},on:{click:function(t){return e.switchView("CreatingSession",!0)}}},[n("div",{staticStyle:{position:"relative"}},[n("span",[e._v("Create Session")]),n("b-icon-chevron-right",{staticStyle:{position:"absolute",left:"95%","margin-top":"0.5vh"}})],1)]),n("button",{staticClass:"btn btn-outline-danger btn-lg main-menu-button",staticStyle:{position:"fixed",bottom:"10%"},on:{click:function(t){return e.deleteSession("all")}}},[e._v(" Delete All Sessions ")])],1)]),n("br"),n("br"),n("br"),n("br"),n("br"),n("footer",{staticClass:"bottom",staticStyle:{"z-index":"8"}},[n("div",{staticClass:"bottom-container"},[n("div",{staticClass:"nav-container",on:{click:function(t){return e.switchView("")}}},[n("img",{staticClass:"icon",attrs:{src:"https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/Home-icon.svg/1200px-Home-icon.svg.png",alt:"home"}})]),n("div",{staticClass:"nav-container",on:{click:function(t){return e.switchView("Practice")}}},[n("img",{staticClass:"icon",attrs:{src:"https://previews.123rf.com/images/sarahdesign/sarahdesign1706/sarahdesign170600477/80760345-target-practice-icon.jpg",alt:"singleplayer"}})]),n("div",{staticClass:"nav-container",on:{click:function(t){return e.switchView("Leaderboard")}}},[n("img",{staticClass:"icon",attrs:{src:"https://cdn-icons-png.flaticon.com/512/4489/4489655.png",alt:"singleplayer"}})]),n("div",{staticClass:"nav-container",on:{click:function(t){return e.switchView("Info")}}},[n("img",{staticClass:"icon",attrs:{src:"https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg",alt:"singleplayer"}})])])])],1)},f=[],h=n("1da1"),b=(n("498a"),n("96cf"),n("f176")),v=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("p",[e._v("Hello "+e._s(e.username)+"! Welcome to practice mode, where you can hone your skills!")]),n("button",{on:{click:function(t){e.start=!0}}},[e._v("Start Practice")]),e.start?n("div",[n("vue-mathjax",{attrs:{formula:e.itemized.equation}}),n("p",{staticClass:"task"},[n("strong",[e._v(e._s(e.itemized.task))])]),e._l(e.itemized.options,(function(t){return n("b-form-group",{key:t.id,scopedSlots:e._u([{key:"default",fn:function(r){var a=r.ariaDescribedby;return[n("b-form-radio",{attrs:{"aria-describedby":a,name:e.itemized.equation,value:t,disabled:e.answered},model:{value:e.selected,callback:function(t){e.selected=t},expression:"selected"}},[e._v(e._s(t))])]}}],null,!0)})})),e.answered?n("p",[e._v(" "+e._s(e.isCorrect?"Correct!":"Incorrect!")+" ")]):e._e()],2):e._e()])},g=[],E=n("b05b"),w={name:"app",data:function(){return{start:!1,selected:"",currentPage:1,answered:!1,isCorrect:!1,output:[],itemized:[]}},props:["username"],mounted:function(){this.output=Object(E["a"])(),this.itemized=this.output[0]},created:function(){},destroyed:function(){},methods:{},watch:{selected:function(){var e=this;this.selected===this.itemized.answer?this.isCorrect=!0:this.isCorrect=!1,""!=this.selected&&(this.answered=!0,this.currentPage++,setTimeout((function(){e.itemized=e.output[e.currentPage-1],e.selected="",e.answered=!1}),2e3))}}},k=w,y=Object(_["a"])(k,v,g,!1,null,"49c102ce",null),O=y.exports,M=function(){var e=this,t=e.$createElement;e._self._c;return e._m(0)},q=[function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("h1",[e._v("Leaderboard goes here")])])}],C={},D=C,P=Object(_["a"])(D,M,q,!1,null,"67a98790",null),j=P.exports,I=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"create-room-container"},[n("b-button",{staticStyle:{width:"35vw"},attrs:{pill:"",variant:"outline-danger"},on:{click:function(t){return e.$parent.switchView("",!1)}}},[n("div",[n("span",[e._v("Back")]),n("b-icon-chevron-left",{staticStyle:{position:"absolute",right:"90%","margin-top":"0.5vh"}})],1)]),n("div",[n("div",{staticClass:"mt-3"},[n("b-button-group",{attrs:{size:"lg"}},[n("b-button",{attrs:{variant:"success"},on:{click:function(t){e.difficulty="Easy"}}},[e._v("Easy")]),n("b-button",{staticStyle:{color:"white"},attrs:{variant:"warning"},on:{click:function(t){e.difficulty="Intermediate"}}},[e._v("Intermediate")]),n("b-button",{attrs:{variant:"danger"},on:{click:function(t){e.difficulty="Hard"}}},[e._v("Hard")])],1)],1),n("div",{staticClass:"small-buffer"}),n("span",{staticClass:"difficulty-display"},[e._v(e._s(e.difficulty?"Difficulty Selected: ":"Select Difficulty"))]),n("span",{staticClass:"difficulty-display",style:e.difficultyStyle},[e._v(e._s(e.difficulty))]),n("div",{staticClass:"large-buffer"}),n("center",[n("b-button",{attrs:{size:"lg",variant:"info"},on:{click:function(t){return e.createRoom()}}},[e._v("Create Room")]),n("h1",{staticClass:"error-message"},[e._v(e._s(e.errorMessage))])],1)],1),n("p",{staticStyle:{opacity:"0"}},[e._v(" Lorem ipsum dolor sit, amet consectetur adipisicing elit. Error, iste, fugit tempora aliquam nisi inventore vero officia voluptate consequatur earum nesciunt rerum blanditiis perferendis molestiae, reprehenderit fugiat delectus quod tempore soluta quo? Modi officiis architecto harum aut enim eaque doloremque ipsum tenetur quidem et corporis quos quas ex error dolor quisquam esse, officia maiores asperiores earum! Rem perferendis, dolore iste qui architecto cum facilis tempora vitae minima, numquam quisquam ullam dignissimos mollitia a culpa ipsum cupiditate maxime, unde quis reprehenderit molestias fugit ad magnam. Molestias quod accusantium consequuntur enim! Veritatis ducimus in vel cumque eligendi officiis aspernatur doloremque voluptatem molestias. ")])],1)},x=[],R=n("d4ec"),S=n("bee2"),A=n("bc3a"),T=n.n(A),B="api/sessions/",L=function(){function e(){Object(R["a"])(this,e)}return Object(S["a"])(e,null,[{key:"getAllSessions",value:function(){var e=Object(h["a"])(regeneratorRuntime.mark((function e(){var t;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,T.a.get(B);case 3:return t=e.sent,e.abrupt("return",t.data);case 7:e.prev=7,e.t0=e["catch"](0),console.warn(e.t0);case 10:case"end":return e.stop()}}),e,null,[[0,7]])})));function t(){return e.apply(this,arguments)}return t}()},{key:"findSessionByRoomID",value:function(){var e=Object(h["a"])(regeneratorRuntime.mark((function e(t){var n;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,T.a.get("".concat(B).concat(t));case 3:return n=e.sent,e.abrupt("return",n.data);case 7:e.prev=7,e.t0=e["catch"](0),console.warn("".concat(B).concat(t),e.t0);case 10:case"end":return e.stop()}}),e,null,[[0,7]])})));function t(t){return e.apply(this,arguments)}return t}()},{key:"createNewSession",value:function(e){return T.a.post(B,e)}},{key:"deleteSessionByRoomID",value:function(e){return T.a.delete("".concat(B).concat(e))}}]),e}(),U=L,W={data:function(){return{roomID:0,errorMessage:"",difficulty:null,difficultyStyle:""}},props:["joiningRoom","username"],methods:{canRoomBeCreated:function(){if(!this.difficulty)return"Select A Difficulty"},createRoom:function(){var e=this;return Object(h["a"])(regeneratorRuntime.mark((function t(){var n,r;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(e.errorMessage=e.canRoomBeCreated(),!e.errorMessage){t.next=3;break}return t.abrupt("return");case 3:while(e.roomID<1e3)e.roomID=Math.round(1e4*Math.random());return t.next=6,U.findSessionByRoomID(String(e.roomID));case 6:if(n=t.sent,null===n){t.next=9;break}return t.abrupt("return",e.errorMessage="Problem Encountered While Creating Room, Try One More Time.");case 9:return t.prev=9,console.log(e.username),t.next=13,U.createNewSession({questions:Object(E["a"])(),date:new Date,roomid:String(e.roomID),host:e.username,difficulty:e.difficulty});case 13:t.next=19;break;case 15:return t.prev=15,t.t0=t["catch"](9),e.errorMessage=t.t0,t.abrupt("return");case 19:return t.next=21,U.findSessionByRoomID(String(e.roomID));case 21:if(r=t.sent,null!==r){t.next=24;break}return t.abrupt("return",e.errorMessage="An Issue Was Encountered Whilst Connecting to Our Servers.");case 24:e.$router.push({name:"Room",params:{sessionObject:{questions:r.questions,date:r.date,roomid:r.roomid,host:r.host,difficulty:r.difficulty,clientName:e.username}}});case 25:case"end":return t.stop()}}),t,null,[[9,15]])})))()}},watch:{difficulty:function(){switch(this.difficulty){case"Easy":this.difficultyStyle="color: green";break;case"Intermediate":this.difficultyStyle="color: rgb(246,190,0)";break;case"Hard":this.difficultyStyle="color: red";break;default:this.difficulty="";break}}}},K=W,z=(n("f1e7"),Object(_["a"])(K,I,x,!1,null,"7bdfe811",null)),N=z.exports,$=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"join-room-container"},[n("b-button",{staticStyle:{width:"35vw"},attrs:{pill:"",variant:"outline-danger"},on:{click:function(t){return e.$parent.switchView("",!1)}}},[n("div",[n("span",[e._v("Back")]),n("b-icon-chevron-left",{staticStyle:{position:"absolute",right:"90%","margin-top":"0.5vh"}})],1)]),n("div",{staticClass:"large-buffer"}),n("p",{staticStyle:{"font-size":"15pt","font-weight":"bold"}},[e._v("Enter a 4 Digit Room ID")]),n("b-input-group",{staticClass:"mt-3",attrs:{prepend:"Room ID"}},[n("b-form-input",{attrs:{type:"number"},model:{value:e.roomidInput,callback:function(t){e.roomidInput=t},expression:"roomidInput"}}),n("b-input-group-append",[n("b-button",{attrs:{variant:4===e.roomidInput.length?"success":"danger"}})],1)],1),n("br"),n("b-button",{attrs:{disabled:!(4===e.roomidInput.length),variant:"success"},on:{click:function(t){return e.$router.push("/go/"+e.roomidInput)}}},[e._v("Go!")]),n("p",{staticStyle:{opacity:"0"}},[e._v(" Lorem ipsum dolor sit, amet consectetur adipisicing elit. Error, iste, fugit tempora aliquam nisi inventore vero officia voluptate consequatur earum nesciunt rerum blanditiis perferendis molestiae, reprehenderit fugiat delectus quod tempore soluta quo? Modi officiis architecto harum aut enim eaque doloremque ipsum tenetur quidem et corporis quos quas ex error dolor quisquam esse, officia maiores asperiores earum! Rem perferendis, dolore iste qui architecto cum facilis tempora vitae minima, numquam quisquam ullam dignissimos mollitia a culpa ipsum cupiditate maxime, unde quis reprehenderit molestias fugit ad magnam. Molestias quod accusantium consequuntur enim! Veritatis ducimus in vel cumque eligendi officiis aspernatur doloremque voluptatem molestias. ")])],1)},V=[],G={data:function(){return{roomidInput:""}}},F=G,H=(n("245e"),Object(_["a"])(F,$,V,!1,null,"ba6175b6",null)),J=H.exports,Y=function(){var e=this,t=e.$createElement;e._self._c;return e._m(0)},Q=[function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("h1",[e._v("This is the info page")]),n("br"),n("br"),n("br"),n("h2",[e._v("Application Developed by Yona Voss-Andreae, Josh Burdick, Isaac Libis, and Michael Cornelison")])])}],X={},Z=Object(_["a"])(X,Y,Q,!1,null,null,null),ee=Z.exports,te={data:function(){return{viewController:"",viewSelected:"",username:"",errorMsg:"",searchColor:"warning"}},components:{Practice:O,Leaderboard:j,CreateNewRoom:N,Info:ee,JoinSession:J},mounted:function(){var e;void 0!==(null===(e=localStorage)||void 0===e?void 0:e.username)&&(this.username=localStorage.username)},created:function(){},destroyed:function(){},methods:{switchView:function(e){var t=this,n=arguments.length>1&&void 0!==arguments[1]&&arguments[1];if(!n)return this.viewController=e,void(this.viewSelected=e);this.viewController=e,setTimeout((function(){t.viewSelected=e}),250)},deleteSession:function(e){var t=this;return Object(h["a"])(regeneratorRuntime.mark((function n(){var r,a;return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:if("all"!==e){n.next=6;break}return n.next=3,U.getAllSessions();case 3:for(a in r=n.sent,r)U.deleteSessionByRoomID(r[a].roomid);return n.abrupt("return");case 6:U.deleteSessionByRoomID(e),t.sessionDeletedMsg=!0,setTimeout((function(){t.sessionDeletedMsg=!1}),3e3);case 9:case"end":return n.stop()}}),n)})))()}},watch:{username:function(){this.errorMsg=Object(b["a"])(this.username.trim()),this.errorMsg||(localStorage.username=this.username),this.errorMsg||!this.username?(this.searchColor="danger",this.joiningRoom=!1):this.searchColor="success"}}},ne=te,re=(n("cccb"),Object(_["a"])(ne,p,f,!1,null,null,null)),ae=re.exports;r["default"].use(m["a"]);var ie=[{path:"/",name:"Home",component:ae},{path:"/play",name:"Play",component:function(){return n.e("chunk-2d0ddbee").then(n.bind(null,"8363"))}},{path:"/profile/:username",name:"Profile",component:function(){return n.e("chunk-2d217357").then(n.bind(null,"c66d"))}},{path:"/go/:roomid",name:"InviteRoute",component:function(){return n.e("chunk-15c2a44a").then(n.bind(null,"3257"))}},{path:"/session/:sessionObject",name:"Room",component:function(){return n.e("chunk-14cbb28b").then(n.bind(null,"3ab1"))}}],oe=new m["a"]({mode:"history",base:"/",routes:ie}),se=oe,ce=n("7b93");r["default"].use(ce["default"]),r["default"].config.productionTip=!1,new r["default"]({router:se,render:function(e){return e(d)}}).$mount("#app")},"5ced":function(e,t,n){},6487:function(e,t,n){},7493:function(e,t,n){"use strict";n.d(t,"a",(function(){return u}));var r=n("d4ec"),a=n("bee2"),i=n("262e"),o=n("2caf"),s=(n("99af"),n("7928")),c=n("b29a"),u=function(e){Object(i["a"])(n,e);var t=Object(o["a"])(n);function n(){return Object(r["a"])(this,n),t.call(this)}return Object(a["a"])(n,null,[{key:"levelOne",value:function(){var e=[{equation:"".concat(c["a"].BaseEq(this.randItem(this.operators)))},{equation:"".concat(c["a"].ExpoEq(2,12))},{equation:"".concat(c["a"].BaseEq(this.randItem(this.operators),.1,2.5,2))}];return this.randItem(e)}},{key:"levelTwo",value:function(){var e=this.randItem(this.squares),t=[{equation:"".concat(this.randNum(5,15)," + ").concat(c["a"].BaseEq("*",2,10))},{equation:"".concat(this.randNum(2,7)," - ").concat(c["a"].BaseEq("*",2,10))},{equation:"".concat(c["a"].ExpoEq(3,9,3,3))},{equation:"".concat(c["a"].SqrtEq(e,e)," + ").concat(c["a"].BaseEq("-",2,20))}];return this.randItem(t)}},{key:"levelThree",value:function(){var e=c["a"].ExpoExpr(c["a"].BaseEq("+",1,9),0,2),t=c["a"].ExpoExpr(c["a"].ExpoEq(1,3,1,2),1,2),n=[{equation:"".concat(e.equation),evaluation:"".concat(e.evaluation)},{equation:"".concat(t.equation),evaluation:"".concat(t.evaluation)}];return this.randItem(n)}}]),n}(s["a"])},7928:function(e,t,n){"use strict";n.d(t,"a",(function(){return o}));var r=n("d4ec"),a=n("bee2"),i=n("ade3"),o=(n("b680"),n("c35a"),n("a9e3"),n("caad"),n("2532"),n("ac1f"),n("5319"),function(){function e(){Object(r["a"])(this,e)}return Object(a["a"])(e,null,[{key:"randNum",value:function(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:0,r=Math.random()*(t-e)+e;return Number.parseFloat(r).toFixed(n)}},{key:"randTo",value:function(e){return Math.round(Math.random()*e)}},{key:"randItem",value:function(e){return e[Math.floor(Math.random()*e.length)]}},{key:"randVar",value:function(){return this.vars[Math.floor(Math.random()*this.vars.length)]}},{key:"toMathjax",value:function(e){if(e.includes("/")&&(e=e.replace("/","\\over ")),e.includes("Math.sqrt")&&(e=e.replace("Math.sqrt(","\\sqrt{"),e=e.replace(")","}")),e.includes("**"))do{e=e.replace("**","^")}while(e.includes("**"));for(var t=0;t<e.length;t++)"*"==e[t]&&"*"!=e[t+1]&&(e=e.replace(e[t],"\\cdot"));return e="$$"+e+"$$",e}}]),e}());Object(i["a"])(o,"vars",["a","b","c","n","x","y","z"]),Object(i["a"])(o,"operators",["+","-","*","/"]),Object(i["a"])(o,"squares",[0,1,4,9,16,25,36,49,64,81,100,121,144,169,196,225,256,289,324,361,400])},"85ec":function(e,t,n){},9534:function(e,t,n){"use strict";n.d(t,"a",(function(){return c}));var r=n("d4ec"),a=n("bee2"),i=n("262e"),o=n("2caf"),s=(n("a630"),n("3ca3"),n("d3b7"),n("6062"),n("ddb0"),n("99af"),n("7928")),c=function(e){Object(i["a"])(n,e);var t=Object(o["a"])(n);function n(){return Object(r["a"])(this,n),t.call(this)}return Object(a["a"])(n,null,[{key:"Problem",value:function(){for(var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:2,t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:10,n=[],r=[],a=0;a<100;a++)r.push(this.randNum(e,t)),n.push(this.randVar());n=Array.from(new Set(n));var i=[{equation:"".concat(r[0]," + ").concat(n[0]," - ").concat(r[2]," = ").concat(r[1]),evaluation:"".concat(r[1]," - ").concat(r[0]," + ").concat(r[2]),task:"Solve for ".concat(n[0])},{equation:"".concat(r[0]).concat(n[0]," = ").concat(r[1]),evaluation:"".concat(r[1]," / ").concat(r[0]),task:"Solve for ".concat(n[0])},{equation:"".concat(r[0]).concat(n[0]," + ").concat(r[2]," = ").concat(r[1]),evaluation:"(".concat(r[1]," - ").concat(r[2],") / ").concat(r[0]),task:"Solve for ".concat(n[0])}];return this.randItem(i)}}]),n}(s["a"])},b05b:function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.d(__webpack_exports__,"a",(function(){return GenerateQuestions}));var core_js_modules_es_error_cause_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("d9e2"),core_js_modules_es_error_cause_js__WEBPACK_IMPORTED_MODULE_0___default=__webpack_require__.n(core_js_modules_es_error_cause_js__WEBPACK_IMPORTED_MODULE_0__),core_js_modules_es_number_constructor_js__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("a9e3"),core_js_modules_es_number_constructor_js__WEBPACK_IMPORTED_MODULE_1___default=__webpack_require__.n(core_js_modules_es_number_constructor_js__WEBPACK_IMPORTED_MODULE_1__),core_js_modules_es_number_to_fixed_js__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("b680"),core_js_modules_es_number_to_fixed_js__WEBPACK_IMPORTED_MODULE_2___default=__webpack_require__.n(core_js_modules_es_number_to_fixed_js__WEBPACK_IMPORTED_MODULE_2__),core_js_modules_es_array_includes_js__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("caad"),core_js_modules_es_array_includes_js__WEBPACK_IMPORTED_MODULE_3___default=__webpack_require__.n(core_js_modules_es_array_includes_js__WEBPACK_IMPORTED_MODULE_3__),_classes_Equations__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("7928"),_classes_Levels__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__("7493"),_classes_subClasses_Algebra__WEBPACK_IMPORTED_MODULE_6__=__webpack_require__("9534"),_functionality_shuffleArray__WEBPACK_IMPORTED_MODULE_7__=__webpack_require__("ccd7");function GenerateQuestions(){for(var numQuestions=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[1,1,1,1],numOptions=arguments.length>1&&void 0!==arguments[1]?arguments[1]:4,questionObj,output=[],i=0;i<numQuestions.length;i++)for(var j=0;j<numQuestions[i];j++){var _question$evaluation,_question$task,options=[],question=void 0;switch(i){case 0:question=_classes_Levels__WEBPACK_IMPORTED_MODULE_5__["a"].levelOne();break;case 1:question=_classes_Levels__WEBPACK_IMPORTED_MODULE_5__["a"].levelTwo();break;case 2:question=_classes_Levels__WEBPACK_IMPORTED_MODULE_5__["a"].levelThree();break;case 3:question=_classes_subClasses_Algebra__WEBPACK_IMPORTED_MODULE_6__["a"].Problem();break;default:throw new Error("Invalid question level.")}question.evaluation=null!==(_question$evaluation=question.evaluation)&&void 0!==_question$evaluation?_question$evaluation:question.equation,question.task=null!==(_question$task=question.task)&&void 0!==_question$task?_question$task:"Evaluate",options.push(eval(question.evaluation)),parseFloat(options[0])%1!=0&&(options[0]=Number(parseFloat(options).toFixed(2)));for(var k=0;k<numOptions-1;k++){var newOption=void 0,mixIn=0;if(options[0]%1===0){do{newOption=Math.round((options[0]+mixIn)*_classes_Equations__WEBPACK_IMPORTED_MODULE_4__["a"].randNum(.5,1.5,2)),Math.random()<.5?mixIn++:mixIn--}while(options.includes(newOption));options.push(newOption)}else{do{newOption=((options[0]+mixIn)*_classes_Equations__WEBPACK_IMPORTED_MODULE_4__["a"].randNum(.5,1.5,2)).toFixed(2),Math.random()<.5?mixIn++:mixIn--}while(options.includes(newOption));options.push(Number(newOption))}}questionObj={equation:"".concat(_classes_Equations__WEBPACK_IMPORTED_MODULE_4__["a"].toMathjax(question.equation)),task:question.task,answer:options[0],options:options},Object(_functionality_shuffleArray__WEBPACK_IMPORTED_MODULE_7__["a"])(questionObj.options),output.push(questionObj)}return output}},b29a:function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.d(__webpack_exports__,"a",(function(){return Arithmetic}));var _Users_yona_Desktop_MathRacePuzzleGame_client_node_modules_babel_runtime_helpers_esm_classCallCheck_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("d4ec"),_Users_yona_Desktop_MathRacePuzzleGame_client_node_modules_babel_runtime_helpers_esm_createClass_js__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("bee2"),_Users_yona_Desktop_MathRacePuzzleGame_client_node_modules_babel_runtime_helpers_esm_inherits_js__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("262e"),_Users_yona_Desktop_MathRacePuzzleGame_client_node_modules_babel_runtime_helpers_esm_createSuper_js__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("2caf"),core_js_modules_es_array_includes_js__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("caad"),core_js_modules_es_array_includes_js__WEBPACK_IMPORTED_MODULE_4___default=__webpack_require__.n(core_js_modules_es_array_includes_js__WEBPACK_IMPORTED_MODULE_4__),core_js_modules_es_string_includes_js__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__("2532"),core_js_modules_es_string_includes_js__WEBPACK_IMPORTED_MODULE_5___default=__webpack_require__.n(core_js_modules_es_string_includes_js__WEBPACK_IMPORTED_MODULE_5__),core_js_modules_es_error_cause_js__WEBPACK_IMPORTED_MODULE_6__=__webpack_require__("d9e2"),core_js_modules_es_error_cause_js__WEBPACK_IMPORTED_MODULE_6___default=__webpack_require__.n(core_js_modules_es_error_cause_js__WEBPACK_IMPORTED_MODULE_6__),core_js_modules_es_array_concat_js__WEBPACK_IMPORTED_MODULE_7__=__webpack_require__("99af"),core_js_modules_es_array_concat_js__WEBPACK_IMPORTED_MODULE_7___default=__webpack_require__.n(core_js_modules_es_array_concat_js__WEBPACK_IMPORTED_MODULE_7__),_Equations__WEBPACK_IMPORTED_MODULE_8__=__webpack_require__("7928"),Arithmetic=function(_Equations){Object(_Users_yona_Desktop_MathRacePuzzleGame_client_node_modules_babel_runtime_helpers_esm_inherits_js__WEBPACK_IMPORTED_MODULE_2__["a"])(Arithmetic,_Equations);var _super=Object(_Users_yona_Desktop_MathRacePuzzleGame_client_node_modules_babel_runtime_helpers_esm_createSuper_js__WEBPACK_IMPORTED_MODULE_3__["a"])(Arithmetic);function Arithmetic(){return Object(_Users_yona_Desktop_MathRacePuzzleGame_client_node_modules_babel_runtime_helpers_esm_classCallCheck_js__WEBPACK_IMPORTED_MODULE_0__["a"])(this,Arithmetic),_super.call(this)}return Object(_Users_yona_Desktop_MathRacePuzzleGame_client_node_modules_babel_runtime_helpers_esm_createClass_js__WEBPACK_IMPORTED_MODULE_1__["a"])(Arithmetic,null,[{key:"BaseEq",value:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null,n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null,r=arguments.length>3&&void 0!==arguments[3]?arguments[3]:0;if(!this.operators.includes(e))throw new Error("Invalid Operator");if(null===t&&null===n)switch(e){case"+":t=1,n=20;break;case"-":t=1,n=20;break;case"*":t=2,n=12;break;case"/":t=2,n=10;break}else if(null===t||null===n)throw new Error("If Min or Max is passed in, both must be passed in");return"".concat(this.randNum(t,n,r)).concat(e).concat(this.randNum(t,n,r))}},{key:"ExpoEq",value:function(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:0,r=arguments.length>3&&void 0!==arguments[3]?arguments[3]:2,a=arguments.length>4&&void 0!==arguments[4]?arguments[4]:0;return"".concat(this.randNum(e,t,a),"**").concat(this.randNum(n,r))}},{key:"ExpoExpr",value:function ExpoExpr(expr){var minExp=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,maxExp=arguments.length>2&&void 0!==arguments[2]?arguments[2]:2,pow=this.randNum(minExp,maxExp);return{equation:"(".concat(expr,")**").concat(pow),evaluation:"".concat(Math.pow(eval(expr),pow))}}},{key:"SqrtEq",value:function(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:0,r=this.randNum(e,t,n);if(e<0||t<0)throw new Error("Invalid sqrt argument: cannot be a negative number.");return"Math.sqrt(".concat(r,")")}}]),Arithmetic}(_Equations__WEBPACK_IMPORTED_MODULE_8__["a"])},cccb:function(e,t,n){"use strict";n("5ced")},ccd7:function(e,t,n){"use strict";n.d(t,"a",(function(){return a}));var r=n("7928");function a(e){for(var t=e.length-1;t>1;t--){var n=r["a"].randNum(0,t);i(e,t,n)}}function i(e,t,n){var r=e[t];e[t]=e[n],e[n]=r}},d096:function(e,t,n){},f176:function(e,t,n){"use strict";n.d(t,"a",(function(){return i}));n("caad"),n("2532");var r=["fuck","shit","bitch","cunt","cock","pussy","anal","anus","69","420","nigger","nigga","faggot","dyke","sex","dick","epstein","asshole","ass","kike","homo","jigaboo","coon","tranny","kkk","nazi","hitler","cocaine","chink","gook","retard","rape","rapist","porn","incest","queer","blowjob","redskin","spic","beaner","midget","osama","raghead","jizz","cum","masturbate","std","condom","dildo","vibrator","wap","boob","breast","tits","titty","titties","bdsm","fetish","swastika","whore","stripper","slut","prostitute","prozzy","kink","orgasm","gasm","hentai"],a=r;function i(e){var t="",n=10,r=4;if(!e)return"Enter A Username";if(e.length<r)return"Username Is Too Short: Min ".concat(r);if(e.length>n)return"Username Is Too Long: Max ".concat(n);if(e.includes(" "))return"Username May Not Include Spaces";for(var i in a)if(e.toLowerCase().includes(a[i]))return"Username Violates Our Community Guidelines: '".concat(a[i],"'");var o=["innit","dream","dream smp","notfound","georgenotfound","badboyhalo"];for(var s in o)if(e.toLowerCase().includes(o[s]))return"Get Out You Filthy Dream Stan!";return t}},f1e7:function(e,t,n){"use strict";n("d096")}});
//# sourceMappingURL=app.65d90d7a.js.map