(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-41b749d6"],{2049:function(t,e,n){},"24e3":function(t,e,n){"use strict";n("2049")},b4a5:function(t,e,n){"use strict";n.r(e);var o=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("h1",{staticStyle:{"font-weight":"bold"}},[t._v("Oh No!")]),n("br"),n("center",[n("p",[t._v("We have detected that another device has just logged on with your account 😳😳😳😳")])]),n("br"),n("b-button",{attrs:{disabled:t.goingBack,variant:"danger"},on:{click:function(e){return t.logout()}}},[t._v("Log Out 🥺")]),n("br"),t._m(0),n("b-button",{attrs:{disabled:t.goingBack,variant:"dark"},on:{click:function(e){return t.goBack()}}},[t._v("Kick Off The Other Device 😈")]),n("br"),n("center",[n("p",{directives:[{name:"show",rawName:"v-show",value:t.goingBack,expression:"goingBack"}],staticStyle:{color:"red","font-size":"12pt"}},[n("b",[t._v("Hang Tight As We Kick Off Your Doppelganger!")])])])],1)},a=[function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("p",[n("b",[t._v("- OR -")])])}],r=n("1da1"),c=(n("96cf"),n("5a6f")),i={data:function(){return{goingBack:!1}},mounted:function(){document.title="Conflict Detected - Math Race"},methods:{goBack:function(){var t=this;return Object(r["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return t.goingBack=!0,e.next=3,c["a"].updateLastLogin(localStorage.username,Date.now());case 3:setTimeout((function(){t.$parent.accountLoggedIn=!1,t.$router.push("/")}),2e3);case 4:case"end":return e.stop()}}),e)})))()},logout:function(){localStorage.clear(),this.$router.push("/sign-in")}}},u=i,s=(n("24e3"),n("2877")),g=Object(s["a"])(u,o,a,!1,null,"02f1703f",null);e["default"]=g.exports}}]);
//# sourceMappingURL=chunk-41b749d6.6abaa757.js.map