(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["products"],{"0c09":function(t,e,a){"use strict";a("648d")},"129f":function(t,e){t.exports=Object.is||function(t,e){return t===e?0!==t||1/t===1/e:t!=t&&e!=e}},1483:function(t,e,a){"use strict";a("ab02")},"159b":function(t,e,a){var r=a("da84"),n=a("fdbc"),i=a("17c2"),c=a("9112");for(var o in n){var u=r[o],s=u&&u.prototype;if(s&&s.forEach!==i)try{c(s,"forEach",i)}catch(l){s.forEach=i}}},"17c2":function(t,e,a){"use strict";var r=a("b727").forEach,n=a("a640"),i=a("ae40"),c=n("forEach"),o=i("forEach");t.exports=c&&o?[].forEach:function(t){return r(this,t,arguments.length>1?arguments[1]:void 0)}},"305b":function(t,e,a){},4160:function(t,e,a){"use strict";var r=a("23e7"),n=a("17c2");r({target:"Array",proto:!0,forced:[].forEach!=n},{forEach:n})},"45fc":function(t,e,a){"use strict";var r=a("23e7"),n=a("b727").some,i=a("a640"),c=a("ae40"),o=i("some"),u=c("some");r({target:"Array",proto:!0,forced:!o||!u},{some:function(t){return n(this,t,arguments.length>1?arguments[1]:void 0)}})},"4feb":function(t,e,a){"use strict";a("b7f0")},"648d":function(t,e,a){},"841c":function(t,e,a){"use strict";var r=a("d784"),n=a("825a"),i=a("1d80"),c=a("129f"),o=a("14c3");r("search",1,(function(t,e,a){return[function(e){var a=i(this),r=void 0==e?void 0:e[t];return void 0!==r?r.call(e,a):new RegExp(e)[t](String(a))},function(t){var r=a(e,t,this);if(r.done)return r.value;var i=n(t),u=String(this),s=i.lastIndex;c(s,0)||(i.lastIndex=0);var l=o(i,u);return c(i.lastIndex,s)||(i.lastIndex=s),null===l?-1:l.index}]}))},"9a94":function(t,e,a){},"9c06":function(t,e,a){"use strict";a("9a94")},ab02:function(t,e,a){},b64b:function(t,e,a){var r=a("23e7"),n=a("7b0b"),i=a("df75"),c=a("d039"),o=c((function(){i(1)}));r({target:"Object",stat:!0,forced:o},{keys:function(t){return i(n(t))}})},b7f0:function(t,e,a){},dbb4:function(t,e,a){var r=a("23e7"),n=a("83ab"),i=a("56ef"),c=a("fc6a"),o=a("06cf"),u=a("8418");r({target:"Object",stat:!0,sham:!n},{getOwnPropertyDescriptors:function(t){var e,a,r=c(t),n=o.f,s=i(r),l={},f=0;while(s.length>f)a=n(r,e=s[f++]),void 0!==a&&u(l,e,a);return l}})},e439:function(t,e,a){var r=a("23e7"),n=a("d039"),i=a("fc6a"),c=a("06cf").f,o=a("83ab"),u=n((function(){c(1)})),s=!o||u;r({target:"Object",stat:!0,forced:s,sham:!o},{getOwnPropertyDescriptor:function(t,e){return c(i(t),e)}})},e6dc:function(t,e,a){"use strict";a.r(e);var r=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{attrs:{id:"products"}},[a("h1",[t._v(t._s(t._f("capitalize")(t.category)))]),a("keep-alive",[t.loadStatus[t.category]?a("ProductsList",{attrs:{category:t.category}}):t._e()],1)],1)},n=[],i=(a("96cf"),a("1da1"));a("a4d3"),a("4de4"),a("4160"),a("e439"),a("dbb4"),a("b64b"),a("159b");function c(t,e,a){return e in t?Object.defineProperty(t,e,{value:a,enumerable:!0,configurable:!0,writable:!0}):t[e]=a,t}function o(t,e){var a=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),a.push.apply(a,r)}return a}function u(t){for(var e=1;e<arguments.length;e++){var a=null!=arguments[e]?arguments[e]:{};e%2?o(Object(a),!0).forEach((function(e){c(t,e,a[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(a)):o(Object(a)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(a,e))}))}return t}var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{attrs:{id:"products-list"}},[a("ProductsPagination",{attrs:{category:t.category,pageProxy:t.currentPage,maxPages:t.maxPages},on:{updatePage:t.updatePage}}),a("button",{on:{click:t.clearSearch}},[t._v("Clear Search")]),a("table",[t._m(0),a("ProductsSearch",{ref:"search",attrs:{category:t.category,manufacturerLoadStatuses:t.manufacturerLoadStatuses},on:{updateSearch:t.updateSearch}}),t._l(t.productsSubArray,(function(e,r){return a("tr",{key:r},[a("td",[t._v(t._s(e.name))]),a("td",[t._v(t._s(e.id))]),a("td",[t._v(t._s(e.manufacturer))]),a("td",[t._v(t._s(e.price))]),a("td",[t._v(t._s(e.color.join(", ")))]),a("Availability",{attrs:{manufacturer:e.manufacturer,productID:e.id,isLoaded:t.manufacturerLoadStatuses[e.manufacturer]}})],1)}))],2),a("ProductsPagination",{attrs:{category:t.category,pageProxy:t.currentPage,maxPages:t.maxPages},on:{updatePage:t.updatePage}})],1)},l=[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("tr",[a("th",[t._v("Name")]),a("th",[t._v("ID")]),a("th",[t._v("Manufacturer")]),a("th",[t._v("Price")]),a("th",[t._v("Color")]),a("th",[t._v("Availability")])])}],f=(a("fb6a"),a("4fad"),a("ac1f"),a("841c"),function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("td",{class:t.availability.toLowerCase()},[t._v(t._s(t.availability))])}),d=[],h=a("2f62"),p={props:{manufacturer:{type:String,required:!0},productID:{type:String,required:!0},isLoaded:{type:Boolean,required:!0}},computed:u(u(u({},Object(h["e"])({availabilityState:"availability"})),Object(h["c"])("availability",["getAvailability"])),{},{availability:function(){var t=!!this.availabilityState[this.manufacturer].items;return this.isLoaded||t?this.getAvailability(this.manufacturer,this.productID):"loading..."}})},m=p,b=(a("9c06"),a("2877")),g=Object(b["a"])(m,f,d,!1,null,"60206cf0",null),v=g.exports,y=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("tr",{attrs:{id:"products-search"}},t._l(t.inputsArray,(function(e){return a("ProductsSearchInput",{key:e.column,attrs:{category:t.category,column:e.column,maxOptions:e.maxOptions,availabilityLoadStatus:e.availabilityLoadStatus},on:{searchInput:t.collateInputs}})})),1)},P=[],S=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("td",{staticClass:"products-search-input"},[a("input",{directives:[{name:"model",rawName:"v-model",value:t.search,expression:"search"}],attrs:{list:t.column,type:"text"},domProps:{value:t.search},on:{focus:t.select,blur:t.deselect,input:function(e){e.target.composing||(t.search=e.target.value)}}}),t.isSelected?a("datalist",{attrs:{id:t.column}},t._l(t.optionSet,(function(t){return a("option",{key:t,domProps:{value:t}})})),0):t._e()])},x=[],O=(a("45fc"),a("a9e3"),{data:function(){return{searchProxy:"",isSelected:!1}},props:{category:{type:String,required:!0},column:{type:String,required:!0},maxOptions:{type:Number},availabilityLoadStatus:{type:Object}},computed:u(u(u({},Object(h["c"])("products",["getFilteredUniqueSet"])),Object(h["c"])("availability",["getAvailabilitySet"])),{},{search:{get:function(){return this.searchProxy},set:function(t){this.searchProxy="name"===this.column||"availability"===this.column?t.toUpperCase():t}},optionSet:function(){return this.availabilityLoadStatus?this["".concat(this.category,"Availability")]:this.getFilteredUniqueSet(this.category,this.column,this.search,this.maxOptions)}}),watch:{search:function(){this.$emit("searchInput",this.column,this.search)},availabilityLoadStatus:{handler:function(){this["".concat(this.category,"Availability")]},deep:!0}},methods:{select:function(){this.isSelected=!0},deselect:function(){this.isSelected=!1}},beforeCreate:function(){var t=this,e=["jackets","shirts","accessories"];e.forEach((function(e){t.$options.computed["".concat(e,"Availability")]=function(){return Object.entries(this.availabilityLoadStatus).some((function(t){return t[1]}))?this.getAvailabilitySet(e):""}}))}}),_=O,j=(a("1483"),Object(b["a"])(_,S,x,!1,null,"3fe236a5",null)),w=j.exports,E={data:function(){return{inputsArray:[{column:"name",maxOptions:50},{column:"id",maxOptions:50},{column:"manufacturer"},{column:"price"},{column:"color"},{column:"availability",availabilityLoadStatus:this.manufacturerLoadStatuses}]}},props:{category:{type:String,required:!0},manufacturerLoadStatuses:{type:Object,required:!0}},components:{ProductsSearchInput:w},methods:{collateInputs:function(t,e){this.$emit("updateSearch",t,e)}}},L=E,A=Object(b["a"])(L,y,P,!1,null,null,null),k=A.exports,D=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"products-pagination"},[a("button",{attrs:{type:"button"},on:{click:t.decrementPage}},[t._v("Prev")]),a("label",{attrs:{for:"page"}},[t._v("Page")]),a("input",{directives:[{name:"model",rawName:"v-model.number",value:t.currentPage,expression:"currentPage",modifiers:{number:!0}}],attrs:{id:"page",name:"page",type:"number",step:"1",min:"1",max:t.maxPages},domProps:{value:t.currentPage},on:{input:function(e){e.target.composing||(t.currentPage=t._n(e.target.value))},blur:function(e){return t.$forceUpdate()}}}),a("label",{attrs:{for:"page"}},[t._v("of "+t._s(t.maxPages))]),a("button",{attrs:{type:"button"},on:{click:t.incrementPage}},[t._v("Next")])])},I=[],q={props:{pageProxy:{type:Number,required:!0},maxPages:{type:Number,required:!0}},computed:{currentPage:{get:function(){return this.pageProxy},set:function(t){t&&this.$emit("updatePage",t)}}},methods:{incrementPage:function(){this.currentPage++},decrementPage:function(){this.currentPage--}}},$=q,C=(a("0c09"),Object(b["a"])($,D,I,!1,null,"4c66f100",null)),F=C.exports,N={data:function(){return{manufacturerLoadStatuses:{},timer:{},pageProxy:1,search:{}}},props:{category:{type:String,required:!0}},components:{Availability:v,ProductsSearch:k,ProductsPagination:F},computed:u(u(u({},Object(h["c"])("products",["getUniqueSet","getFilteredProducts"])),Object(h["e"])(["availability"])),{},{productsSubArray:function(){this.updatePage(this.currentPage);var t=100*(this.currentPage-1),e=100*this.currentPage;return this[this.category].slice(t,e)},maxPages:function(){return Math.ceil(this[this.category].length/100)},currentPage:{get:function(){return this.pageProxy},set:function(t){this.pageProxy=Math.min(Math.max(t,1),this.maxPages)}}}),methods:u(u(u({},Object(h["b"])(["fetchData"])),Object(h["d"])(["initAvailabilityManufacturer"])),{},{loadFetchSequence:function(){var t=this,e=this.getUniqueSet(this.category,"manufacturer");e.forEach(function(){var e=Object(i["a"])(regeneratorRuntime.mark((function e(a){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(a in t.availability||t.initAvailabilityManufacturer(a),t.$set(t.manufacturerLoadStatuses,a,!1),t.availability[a].items){e.next=5;break}return e.next=5,t.fetchAvailability(a);case 5:t.manufacturerLoadStatuses[a]=!0,t.timer[a]=t.setFetchInterval(a);case 7:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}())},setFetchInterval:function(t){var e=this;return setInterval(Object(i["a"])(regeneratorRuntime.mark((function a(){return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:return e.manufacturerLoadStatuses[t]=!1,a.next=3,e.fetchAvailability(t);case 3:e.manufacturerLoadStatuses[t]=!0;case 4:case"end":return a.stop()}}),a)}))),3e5)},fetchAvailability:function(t){return this.fetchData({module:"availability",type:t})},updateSearch:function(t,e){t in this.search?this.search[t]=e:this.$set(this.search,t,e)},clearSearch:function(){this.$refs.search.$children.forEach((function(t){return t.search=""}))},updatePage:function(t){this.currentPage=t}}),beforeCreate:function(){var t=this,e=["jackets","shirts","accessories"];e.forEach((function(e){t.$options.computed[e]=function(){return this.getFilteredProducts(e,this.search)}}))},created:function(){this.loadFetchSequence()},beforeDestroy:function(){for(var t=0,e=Object.entries(this.timer);t<e.length;t++){var a=e[t];clearInterval(this.timer[a[0]])}}},R=N,M=(a("4feb"),Object(b["a"])(R,s,l,!1,null,"2832989a",null)),U=M.exports,J={data:function(){return{loadStatus:{jackets:!1,shirts:!1,accessories:!1}}},props:{category:{type:String,required:!0}},components:{ProductsList:U},computed:u({},Object(h["e"])(["products"])),watch:{category:function(){this.loadProductData()}},methods:u(u({},Object(h["b"])(["fetchData"])),{},{loadProductData:function(){var t=Object(i["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(t.t0=!!this.products[this.category].items,t.t0){t.next=5;break}return t.next=4,this.fetchData({module:"products",type:this.category});case 4:t.t0=!!t.sent;case 5:this.loadStatus[this.category]=t.t0;case 6:case"end":return t.stop()}}),t,this)})));function e(){return t.apply(this,arguments)}return e}()}),created:function(){this.loadProductData()}},z=J,B=(a("f67c"),Object(b["a"])(z,r,n,!1,null,"b2d5bbe8",null));e["default"]=B.exports},f67c:function(t,e,a){"use strict";a("305b")}}]);
//# sourceMappingURL=products.96be31f7.js.map