(function(e){function t(t){for(var r,a,o=t[0],c=t[1],s=t[2],l=0,f=[];l<o.length;l++)a=o[l],Object.prototype.hasOwnProperty.call(u,a)&&u[a]&&f.push(u[a][0]),u[a]=0;for(r in c)Object.prototype.hasOwnProperty.call(c,r)&&(e[r]=c[r]);d&&d(t);while(f.length)f.shift()();return i.push.apply(i,s||[]),n()}function n(){for(var e,t=0;t<i.length;t++){for(var n=i[t],r=!0,a=1;a<n.length;a++){var o=n[a];0!==u[o]&&(r=!1)}r&&(i.splice(t--,1),e=c(c.s=n[0]))}return e}var r={},a={app:0},u={app:0},i=[];function o(e){return c.p+"js/"+({notFound:"notFound",products:"products"}[e]||e)+"."+{notFound:"07893e10",products:"96be31f7"}[e]+".js"}function c(t){if(r[t])return r[t].exports;var n=r[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,c),n.l=!0,n.exports}c.e=function(e){var t=[],n={notFound:1,products:1};a[e]?t.push(a[e]):0!==a[e]&&n[e]&&t.push(a[e]=new Promise((function(t,n){for(var r="css/"+({notFound:"notFound",products:"products"}[e]||e)+"."+{notFound:"382dd517",products:"025e3410"}[e]+".css",u=c.p+r,i=document.getElementsByTagName("link"),o=0;o<i.length;o++){var s=i[o],l=s.getAttribute("data-href")||s.getAttribute("href");if("stylesheet"===s.rel&&(l===r||l===u))return t()}var f=document.getElementsByTagName("style");for(o=0;o<f.length;o++){s=f[o],l=s.getAttribute("data-href");if(l===r||l===u)return t()}var d=document.createElement("link");d.rel="stylesheet",d.type="text/css",d.onload=t,d.onerror=function(t){var r=t&&t.target&&t.target.src||u,i=new Error("Loading CSS chunk "+e+" failed.\n("+r+")");i.code="CSS_CHUNK_LOAD_FAILED",i.request=r,delete a[e],d.parentNode.removeChild(d),n(i)},d.href=u;var p=document.getElementsByTagName("head")[0];p.appendChild(d)})).then((function(){a[e]=0})));var r=u[e];if(0!==r)if(r)t.push(r[2]);else{var i=new Promise((function(t,n){r=u[e]=[t,n]}));t.push(r[2]=i);var s,l=document.createElement("script");l.charset="utf-8",l.timeout=120,c.nc&&l.setAttribute("nonce",c.nc),l.src=o(e);var f=new Error;s=function(t){l.onerror=l.onload=null,clearTimeout(d);var n=u[e];if(0!==n){if(n){var r=t&&("load"===t.type?"missing":t.type),a=t&&t.target&&t.target.src;f.message="Loading chunk "+e+" failed.\n("+r+": "+a+")",f.name="ChunkLoadError",f.type=r,f.request=a,n[1](f)}u[e]=void 0}};var d=setTimeout((function(){s({type:"timeout",target:l})}),12e4);l.onerror=l.onload=s,document.head.appendChild(l)}return Promise.all(t)},c.m=e,c.c=r,c.d=function(e,t,n){c.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},c.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},c.t=function(e,t){if(1&t&&(e=c(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(c.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)c.d(n,r,function(t){return e[t]}.bind(null,r));return n},c.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return c.d(t,"a",t),t},c.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},c.p="/",c.oe=function(e){throw console.error(e),e};var s=window["webpackJsonp"]=window["webpackJsonp"]||[],l=s.push.bind(s);s.push=t,s=s.slice();for(var f=0;f<s.length;f++)t(s[f]);var d=l;i.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("56d7")},"034f":function(e,t,n){"use strict";n("85ec")},"15e5":function(e,t,n){"use strict";n("5be3")},"56d7":function(e,t,n){"use strict";n.r(t);n("e260"),n("e6cf"),n("cca6"),n("a79d");var r=n("2b0e"),a=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"app"}},[n("TheNavigation"),n("router-view")],1)},u=[],i=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"nav"}},e._l(e.categories,(function(t){return n("router-link",{key:t,attrs:{to:{name:"Products",params:{category:t}}}},[e._v(" "+e._s(e._f("capitalize")(t))+" ")])})),1)},o=[],c={data:function(){return{categories:["jackets","shirts","accessories"]}}},s=c,l=(n("15e5"),n("2877")),f=Object(l["a"])(s,i,o,!1,null,"50f089a4",null),d=f.exports,p={name:"Home",components:{TheNavigation:d}},m=p,h=(n("034f"),Object(l["a"])(m,a,u,!1,null,null,null)),v=h.exports,g=(n("d3b7"),n("8c4f")),b=n("2f62"),y=(n("99af"),n("96cf"),n("1da1")),w=(n("caad"),n("2532"),n("bc3a")),F=n.n(w),k=F.a.create({baseURL:"https://bad-api-assignment.reaktor.com/"});k.interceptors.response.use((function(e){var t=e.config;if(t.url.includes("availability")){var n=e.data.response;if(n.length<=0||"[]"===n)return k(t)}return e}),function(){var e=Object(y["a"])(regeneratorRuntime.mark((function e(t){var n,r;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(n=t.response,r=n.config,400!==n.status&&404!==n.status){e.next=11;break}if(!r.url.includes("products")){e.next=7;break}R.push({name:"NotFound"}),e.next=9;break;case 7:if(!r.url.includes("availability")){e.next=9;break}return e.abrupt("return",n);case 9:e.next=18;break;case 11:if(503!==n.status&&504!==n.status){e.next=17;break}return e.next=14,k(r);case 14:return e.abrupt("return",e.sent);case 17:return e.abrupt("return",n);case 18:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}());var O=function(e,t){var n=e.state,r=e.commit,a=e.dispatch,u=t.module,i=t.type,o=n[u][i];if(o.isFetching)return o.fetchCall;r("setIsFetching",{module:u,type:i,isFetching:!0});var c=a("callback",{module:u,type:i});return r("setCall",{module:u,type:i,call:c}),c},j=function(){var e=Object(y["a"])(regeneratorRuntime.mark((function e(t,n){var r,a,u,i;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return r=t.commit,a=n.module,u=n.type,e.next=4,k.get("".concat(a,"/").concat(u));case 4:return i=e.sent,200===i.status&&r("setData",{module:a,type:u,data:i.data.response||i.data}),r("setIsFetching",{module:a,type:u,isFetching:!1}),r("setCall",{module:a,type:u,call:!1}),e.abrupt("return",Promise.resolve(u));case 9:case"end":return e.stop()}}),e)})));return function(t,n){return e.apply(this,arguments)}}(),x={fetchData:O,callback:j},S=function(e,t){e.availability[t]={items:null,isFetching:!1,fetchCall:null}},A=function(e,t){e[t.module][t.type].items=t.data},C=function(e,t){e[t.module][t.type].isFetching=t.isFetching},_=function(e,t){e[t.module][t.type].fetchCall=t.call},N={initAvailabilityManufacturer:S,setData:A,setIsFetching:C,setCall:_},P=(n("a623"),n("4de4"),n("0481"),n("d81d"),n("fb6a"),n("4069"),n("4fad"),n("07ac"),n("25f0"),n("6062"),n("3ca3"),n("2ca0"),n("ddb0"),n("2909")),T=(n("a9e3"),n("ac1f"),{">":function(e,t){return e>t},"<":function(e,t){return e<t},">=":function(e,t){return e>=t},"<=":function(e,t){return e<=t},"==":function(e,t){return e==t},"===":function(e,t){return e===t},"!=":function(e,t){return e!=t},"!==":function(e,t){return e!==t}}),E=function(e,t,n){return T[n](e,t)},L=function(e,t){var n,r=/([!=]==|[<>!=]=|[<>]){0,1}\s*(\d+)\s*(&{1,2}|\|{1,2}){0,1}/gm;while(null!==(n=r.exec(t))){n.index===r.lastIndex&&r.lastIndex++;var a=n[1]||"===",u=Number(n[2]),i=n[3],o=E(e,u,a);if("&&"===i||"&"===i){if(!o)return o}else{if("||"!==i&&"|"!==i)return o;if(o)return o}}return!0},D={namespaced:!0,state:{jackets:{items:null,isFetching:!1,fetchCall:null},shirts:{items:null,isFetching:!1,fetchCall:null},accessories:{items:null,isFetching:!1,fetchCall:null}},getters:{getFilteredProducts:function(e,t,n,r){return function(t,n){return Object.values(n).every((function(e){return void 0===e||""===e}))?e[t].items:e[t].items.filter((function(e){var t=Object.entries(e).every((function(e){var t=n[e[0]],r=e[1];return!t||("price"===e[0]?L(r,t):r.toString().includes(t))})),a=!n.availability||r["availability/getAvailability"](e.manufacturer,e.id).includes(n.availability);return t&&a}))}},getUniqueSet:function(e){return function(t,n){var r=Object(P["a"])(new Set(e[t].items.map((function(e){return e[n]})).flat()));return r.sort((function(e,t){return e<t?-1:e>t?1:0})),r}},getFilteredUniqueSet:function(e,t){return function(e,n,r,a){var u=t.getUniqueSet(e,n);return""===r?u.slice(0,a):u.filter((function(e){return e.toString().startsWith(r)})).slice(0,a)}}}},U=(n("7db0"),n("466d"),{namespaced:!0,state:{},getters:{getAvailability:function(e){return function(t,n){return e[t].items?e[t].items.find((function(e){return e.id.toLowerCase()===n})).DATAPAYLOAD.match(/INSTOCKVALUE>(\w*?)<\/INSTOCKVALUE/)[1]:"DATA NOT FOUND"}},getAvailabilitySet:function(e,t,n){return function(e){return Object(P["a"])(new Set(n.products[e].items.map((function(e){return t.getAvailability(e.manufacturer,e.id)}))))}}}});r["a"].use(b["a"]);var I=new b["a"].Store({state:{},getters:{},mutations:N,actions:x,modules:{products:D,availability:U}});r["a"].use(g["a"]);var q=[{path:"/products/:category",name:"Products",props:!0,component:function(){return n.e("products").then(n.bind(null,"e6dc"))},beforeEnter:function(e,t,n){var r=!!I.state.products[e.params.category];r?n():n({name:"NotFound"})}},{path:"",redirect:"/products/jackets"},{path:"/products",redirect:"/products/jackets"},{path:"/404",alias:"*",name:"NotFound",component:function(){return n.e("notFound").then(n.bind(null,"9703"))}}],M=new g["a"]({mode:"history",base:"/",routes:q}),R=M;r["a"].filter("capitalize",(function(e){return e?(e=e.toString(),e.charAt(0).toUpperCase()+e.slice(1)):""})),r["a"].config.productionTip=!1,new r["a"]({router:R,store:I,render:function(e){return e(v)}}).$mount("#app")},"5be3":function(e,t,n){},"85ec":function(e,t,n){}});
//# sourceMappingURL=app.c308dcff.js.map