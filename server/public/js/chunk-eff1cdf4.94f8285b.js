(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-eff1cdf4"],{"05ab":function(e,s,o){"use strict";o("c0f1")},3257:function(e,s,o){"use strict";o.r(s);var n=function(){var e=this,s=e.$createElement,o=e._self._c||s;return o("div",[o("br"),o("br"),o("br"),o("br"),o("center",[void 0===e.sessionInfo?o("div",[o("h1",[e._v("Loading Session...")])]):null===e.sessionInfo?o("div",[o("h1",[e._v(" Session Not Found! ")]),o("br"),o("p",[o("b",[e._v("[Unable To Retrieve Session "+e._s(e.$route.params.roomid)+"]")])])]):o("div",[o("p",[e._v("Join Room "),o("b",[e._v(e._s(e.sessionInfo.roomid))]),e._v(", Created on "),o("b",[e._v(e._s(e.sessionInfo.date))])]),o("h1",[e._v("Enter A Username:")]),o("input",{directives:[{name:"model",rawName:"v-model",value:e.username,expression:"username"}],attrs:{type:"text",placeholder:"Enter Username"},domProps:{value:e.username},on:{input:function(s){s.target.composing||(e.username=s.target.value)}}}),o("button",{on:{click:function(s){return e.joinRoom()}}},[e._v("Join Room")]),o("h1",{staticClass:"error"},[e._v(e._s(e.errorMessage))]),o("h4",{staticStyle:{"margin-top":"5vh"}},[e._v("Session Details:")]),o("p",[e._v(" "+e._s(e.sessionInfo)+" ")])]),o("button",{on:{click:function(s){return e.$router.push("/")}}},[e._v("Back")])])],1)},t=[],i=(o("d3b7"),o("498a"),o("f176")),r={data:function(){return{username:"",errorMessage:"",sessionInfo:void 0}},created:function(){var e=this;fetch("https://math-race-game.herokuapp.com/api/sessions/".concat(this.$route.params.roomid)).then((function(e){return e.json()})).then((function(s){var o;e.sessionInfo=s,void 0!==(null===(o=localStorage)||void 0===o?void 0:o.username)&&(e.username=localStorage.username,e.joinRoom())}))},methods:{joinRoom:function(){var e;this.errorMessage=Object(i["a"])(this.username.trim()),void 0!==(null===(e=this.sessionInfo)||void 0===e?void 0:e.host)&&this.username.trim().toLowerCase()===this.sessionInfo.host.toLowerCase()&&(this.errorMessage="Oop, We Notice That Your Username Is The Same As The Host of This Session. Please Enter A New Username."),this.errorMessage||this.$router.push({name:"Room",params:{sessionObject:{questions:this.sessionInfo.questions,date:this.sessionInfo.date,roomid:this.sessionInfo.roomid,host:this.sessionInfo.host,difficulty:this.sessionInfo.difficulty,clientName:this.username}}})}}},a=r,u=(o("05ab"),o("2877")),c=Object(u["a"])(a,n,t,!1,null,"c09907ec",null);s["default"]=c.exports},c0f1:function(e,s,o){}}]);
//# sourceMappingURL=chunk-eff1cdf4.94f8285b.js.map