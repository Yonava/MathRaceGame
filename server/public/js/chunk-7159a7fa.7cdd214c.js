(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-7159a7fa"],{1936:function(e,t,n){"use strict";n("8481")},3257:function(e,t,n){"use strict";n.r(t);var s=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[void 0===e.sessionInfo?n("div",{staticClass:"center"},[n("p",{staticStyle:{"font-size":"20pt","font-weight":"bold","margin-top":"5vh"}},[e._v("Loading Session...")]),n("b-icon-arrow-clockwise",{staticStyle:{width:"10%",height:"10%"},attrs:{animation:"spin"}})],1):null===e.sessionInfo?n("div",{staticClass:"center"},[n("p",{staticStyle:{"font-size":"20pt","font-weight":"bold","margin-top":"5vh"}},[e._v("Session Not Found 🙁")]),n("p",[n("b",[e._v("[Unable To Retrieve Session "+e._s(e.$route.params.roomid)+"]")])])]):n("div",{staticClass:"center",staticStyle:{padding:"5%"}},[n("center",[n("p",[e._v("Joining Room "),n("b",{staticStyle:{color:"#008b8b"}},[e._v(e._s(e.sessionInfo.roomid))]),e._v(" Created "),n("b",{staticStyle:{color:"#008b8b"}},[e._v(e._s(e.sessionInfo.date))]),e._v(" By "),n("b",{staticStyle:{color:"#008b8b"}},[e._v(e._s(e.sessionInfo.host))])])]),n("b-input-group",{staticClass:"mt-3",attrs:{prepend:"Username"}},[n("b-form-input",{model:{value:e.username,callback:function(t){e.username=t},expression:"username"}}),n("b-input-group-append",[n("b-button",{attrs:{variant:e.errorMessage?"danger":"success"}})],1)],1),n("center",[n("p",{staticClass:"error-msg-transition",style:e.errorMessage?"color:red;transform:translateY(0%)":"color:rgba(0,0,0,0);transform:translateY(50%)"},[e._v(" "+e._s(e.errorMessage?e.errorMessage:"Resolved")+" ")])]),n("div",{staticClass:"large-buffer"}),n("b-button",{attrs:{variant:"success",disabled:!!e.errorMessage},on:{click:function(t){return e.joinRoom(!0)}}},[e._v("Jump To Room")])],1),n("div",{staticClass:"center"},[n("b-button",{staticClass:"back-btn",attrs:{variant:"outline-danger"},on:{click:function(t){return e.$router.push("/")}}},[e._v("Back to Main Menu")])],1)])},r=[],o=n("1da1"),a=(n("96cf"),n("d3b7"),n("498a"),n("5a6f")),i=n("f176"),c={data:function(){return{username:"",errorMessage:"Enter A Username To Continue",sessionInfo:void 0}},created:function(){var e=this;fetch("https://math-race-game.herokuapp.com/api/sessions/".concat(this.$route.params.roomid)).then((function(e){return e.json()})).then((function(t){var n;e.sessionInfo=t,void 0!==(null===(n=localStorage)||void 0===n?void 0:n.username)&&(e.username=localStorage.username,e.joinRoom())}))},methods:{joinRoom:function(){var e=arguments,t=this;return Object(o["a"])(regeneratorRuntime.mark((function n(){var s,r;return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:if(s=e.length>0&&void 0!==e[0]&&e[0],!s){n.next=7;break}return n.next=4,a["a"].findUser(t.username);case 4:if(r=n.sent,!r){n.next=7;break}return n.abrupt("return",t.errorMessage="This Username Has Been Taken By Another Account");case 7:t.$router.push({name:"Room",params:{sessionObject:{questions:t.sessionInfo.questions,date:t.sessionInfo.date,roomid:t.sessionInfo.roomid,host:t.sessionInfo.host,difficulty:t.sessionInfo.difficulty,clientName:t.username}}});case 8:case"end":return n.stop()}}),n)})))()}},watch:{username:function(){this.username=this.username.trim(),this.errorMessage=Object(i["a"])(this.username)}}},u=c,d=(n("1936"),n("2877")),f=Object(d["a"])(u,s,r,!1,null,"0c032c6a",null);t["default"]=f.exports},"498a":function(e,t,n){"use strict";var s=n("23e7"),r=n("58a8").trim,o=n("c8d2");s({target:"String",proto:!0,forced:o("trim")},{trim:function(){return r(this)}})},8481:function(e,t,n){},c8d2:function(e,t,n){var s=n("5e77").PROPER,r=n("d039"),o=n("5899"),a="​᠎";e.exports=function(e){return r((function(){return!!o[e]()||a[e]()!==a||s&&o[e].name!==e}))}},f176:function(e,t,n){"use strict";n.d(t,"a",(function(){return o}));n("caad"),n("2532");var s=["fuck","shit","bitch","cunt","cock","pussy","anal","anus","69","420","nigger","nigga","faggot","dyke","sex","dick","epstein","asshole","ass","kike","homo","jigaboo","coon","tranny","kkk","nazi","hitler","cocaine","chink","gook","retard","rape","rapist","porn","incest","queer","blowjob","redskin","spic","beaner","midget","osama","raghead","jizz","cum","masturbate","std","condom","dildo","vibrator","wap","boob","breast","tits","titty","titties","bdsm","fetish","swastika","whore","stripper","slut","prostitute","prozzy","kink","orgasm","gasm","hentai"],r=s;function o(e){var t="",n=8,s=4;if(!e)return"";if(e.length<s)return"Username Is Too Short: Min ".concat(s);if(e.length>n)return"Username Is Too Long: Max ".concat(n);if(e.includes(" "))return"Username May Not Include Spaces";for(var o in r)if(e.toLowerCase().includes(r[o]))return"Username Violates Our Community Guidelines: '".concat(r[o],"'");var a=["innit","dream","dream smp","notfound","georgenotfound","badboyhalo"];for(var i in a)if(e.toLowerCase().includes(a[i]))return"Get Out You Filthy Dream Stan!";return"undefined"===e?"Nice Try!":t}}}]);
//# sourceMappingURL=chunk-7159a7fa.7cdd214c.js.map