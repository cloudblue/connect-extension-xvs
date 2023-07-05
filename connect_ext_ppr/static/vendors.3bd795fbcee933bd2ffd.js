"use strict";
(self["webpackChunkconnect_extension_xvs"] = self["webpackChunkconnect_extension_xvs"] || []).push([[216],{

/***/ 164:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ZP: () => (/* binding */ c),
/* harmony export */   Zb: () => (/* binding */ r)
/* harmony export */ });
/* unused harmony exports Pad, Tab, Tabs */
var e={705:e=>{e.exports=function e(t,n,o){function r(i,l){if(!n[i]){if(!t[i]){if(s)return s(i,!0);throw new Error("Cannot find module '"+i+"'")}l=n[i]={exports:{}},t[i][0].call(l.exports,(function(e){return r(t[i][1][e]||e)}),l,l.exports,e,t,n,o)}return n[i].exports}for(var s=void 0,i=0;i<o.length;i++)r(o[i]);return r}({1:[function(e,t,n){(function(o,r,s,i,l,c,a,u,f){var p=e("crypto");function d(e,t){var n;return void 0===(n="passthrough"!==(t=m(e,t)).algorithm?p.createHash(t.algorithm):new b).write&&(n.write=n.update,n.end=n.update),v(t,n).dispatch(e),n.update||n.end(""),n.digest?n.digest("buffer"===t.encoding?void 0:t.encoding):(e=n.read(),"buffer"!==t.encoding?e.toString(t.encoding):e)}(n=t.exports=d).sha1=function(e){return d(e)},n.keys=function(e){return d(e,{excludeValues:!0,algorithm:"sha1",encoding:"hex"})},n.MD5=function(e){return d(e,{algorithm:"md5",encoding:"hex"})},n.keysMD5=function(e){return d(e,{algorithm:"md5",encoding:"hex",excludeValues:!0})};var h=p.getHashes?p.getHashes().slice():["sha1","md5"],g=(h.push("passthrough"),["buffer","hex","binary","base64"]);function m(e,t){var n={};if(n.algorithm=(t=t||{}).algorithm||"sha1",n.encoding=t.encoding||"hex",n.excludeValues=!!t.excludeValues,n.algorithm=n.algorithm.toLowerCase(),n.encoding=n.encoding.toLowerCase(),n.ignoreUnknown=!0===t.ignoreUnknown,n.respectType=!1!==t.respectType,n.respectFunctionNames=!1!==t.respectFunctionNames,n.respectFunctionProperties=!1!==t.respectFunctionProperties,n.unorderedArrays=!0===t.unorderedArrays,n.unorderedSets=!1!==t.unorderedSets,n.unorderedObjects=!1!==t.unorderedObjects,n.replacer=t.replacer||void 0,n.excludeKeys=t.excludeKeys||void 0,void 0===e)throw new Error("Object argument required.");for(var o=0;o<h.length;++o)h[o].toLowerCase()===n.algorithm.toLowerCase()&&(n.algorithm=h[o]);if(-1===h.indexOf(n.algorithm))throw new Error('Algorithm "'+n.algorithm+'"  not supported. supported values: '+h.join(", "));if(-1===g.indexOf(n.encoding)&&"passthrough"!==n.algorithm)throw new Error('Encoding "'+n.encoding+'"  not supported. supported values: '+g.join(", "));return n}function y(e){if("function"==typeof e)return null!=/^function\s+\w*\s*\(\s*\)\s*{\s+\[native code\]\s+}$/i.exec(Function.prototype.toString.call(e))}function v(e,t,n){function o(e){return t.update?t.update(e,"utf8"):t.write(e,"utf8")}return n=n||[],{dispatch:function(t){return this["_"+(null===(t=e.replacer?e.replacer(t):t)?"null":typeof t)](t)},_object:function(t){var r,i=Object.prototype.toString.call(t),l=/\[object (.*)\]/i.exec(i);if(l=(l=l?l[1]:"unknown:["+i+"]").toLowerCase(),0<=(i=n.indexOf(t)))return this.dispatch("[CIRCULAR:"+i+"]");if(n.push(t),void 0!==s&&s.isBuffer&&s.isBuffer(t))return o("buffer:"),o(t);if("object"===l||"function"===l||"asyncfunction"===l)return i=Object.keys(t),e.unorderedObjects&&(i=i.sort()),!1===e.respectType||y(t)||i.splice(0,0,"prototype","__proto__","constructor"),e.excludeKeys&&(i=i.filter((function(t){return!e.excludeKeys(t)}))),o("object:"+i.length+":"),r=this,i.forEach((function(n){r.dispatch(n),o(":"),e.excludeValues||r.dispatch(t[n]),o(",")}));if(!this["_"+l]){if(e.ignoreUnknown)return o("["+l+"]");throw new Error('Unknown object type "'+l+'"')}this["_"+l](t)},_array:function(t,r){r=void 0!==r?r:!1!==e.unorderedArrays;var s=this;if(o("array:"+t.length+":"),!r||t.length<=1)return t.forEach((function(e){return s.dispatch(e)}));var i=[];return r=t.map((function(t){var o=new b,r=n.slice();return v(e,o,r).dispatch(t),i=i.concat(r.slice(n.length)),o.read().toString()})),n=n.concat(i),r.sort(),this._array(r,!1)},_date:function(e){return o("date:"+e.toJSON())},_symbol:function(e){return o("symbol:"+e.toString())},_error:function(e){return o("error:"+e.toString())},_boolean:function(e){return o("bool:"+e.toString())},_string:function(e){o("string:"+e.length+":"),o(e.toString())},_function:function(t){o("fn:"),y(t)?this.dispatch("[native]"):this.dispatch(t.toString()),!1!==e.respectFunctionNames&&this.dispatch("function-name:"+String(t.name)),e.respectFunctionProperties&&this._object(t)},_number:function(e){return o("number:"+e.toString())},_xml:function(e){return o("xml:"+e.toString())},_null:function(){return o("Null")},_undefined:function(){return o("Undefined")},_regexp:function(e){return o("regex:"+e.toString())},_uint8array:function(e){return o("uint8array:"),this.dispatch(Array.prototype.slice.call(e))},_uint8clampedarray:function(e){return o("uint8clampedarray:"),this.dispatch(Array.prototype.slice.call(e))},_int8array:function(e){return o("int8array:"),this.dispatch(Array.prototype.slice.call(e))},_uint16array:function(e){return o("uint16array:"),this.dispatch(Array.prototype.slice.call(e))},_int16array:function(e){return o("int16array:"),this.dispatch(Array.prototype.slice.call(e))},_uint32array:function(e){return o("uint32array:"),this.dispatch(Array.prototype.slice.call(e))},_int32array:function(e){return o("int32array:"),this.dispatch(Array.prototype.slice.call(e))},_float32array:function(e){return o("float32array:"),this.dispatch(Array.prototype.slice.call(e))},_float64array:function(e){return o("float64array:"),this.dispatch(Array.prototype.slice.call(e))},_arraybuffer:function(e){return o("arraybuffer:"),this.dispatch(new Uint8Array(e))},_url:function(e){return o("url:"+e.toString())},_map:function(t){return o("map:"),t=Array.from(t),this._array(t,!1!==e.unorderedSets)},_set:function(t){return o("set:"),t=Array.from(t),this._array(t,!1!==e.unorderedSets)},_file:function(e){return o("file:"),this.dispatch([e.name,e.size,e.type,e.lastModfied])},_blob:function(){if(e.ignoreUnknown)return o("[blob]");throw Error('Hashing Blob objects is currently not supported\n(see https://github.com/puleos/object-hash/issues/26)\nUse "options.replacer" or "options.ignoreUnknown"\n')},_domwindow:function(){return o("domwindow")},_bigint:function(e){return o("bigint:"+e.toString())},_process:function(){return o("process")},_timer:function(){return o("timer")},_pipe:function(){return o("pipe")},_tcp:function(){return o("tcp")},_udp:function(){return o("udp")},_tty:function(){return o("tty")},_statwatcher:function(){return o("statwatcher")},_securecontext:function(){return o("securecontext")},_connection:function(){return o("connection")},_zlib:function(){return o("zlib")},_context:function(){return o("context")},_nodescript:function(){return o("nodescript")},_httpparser:function(){return o("httpparser")},_dataview:function(){return o("dataview")},_signal:function(){return o("signal")},_fsevent:function(){return o("fsevent")},_tlswrap:function(){return o("tlswrap")}}}function b(){return{buf:"",write:function(e){this.buf+=e},end:function(e){this.buf+=e},read:function(){return this.buf}}}n.writeToStream=function(e,t,n){return void 0===n&&(n=t,t={}),v(t=m(e,t),n).dispatch(e)}}).call(this,e("lYpoI2"),"undefined"!=typeof self?self:"undefined"!=typeof window?window:{},e("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/fake_9a5aa49d.js","/")},{buffer:3,crypto:5,lYpoI2:11}],2:[function(e,t,n){(function(e,t,o,r,s,i,l,c,a){!function(e){var t="undefined"!=typeof Uint8Array?Uint8Array:Array,n="+".charCodeAt(0),o="/".charCodeAt(0),r="0".charCodeAt(0),s="a".charCodeAt(0),i="A".charCodeAt(0),l="-".charCodeAt(0),c="_".charCodeAt(0);function a(e){return(e=e.charCodeAt(0))===n||e===l?62:e===o||e===c?63:e<r?-1:e<r+10?e-r+26+26:e<i+26?e-i:e<s+26?e-s+26:void 0}e.toByteArray=function(e){var n,o;if(0<e.length%4)throw new Error("Invalid string. Length must be a multiple of 4");var r=e.length,s=(r="="===e.charAt(r-2)?2:"="===e.charAt(r-1)?1:0,new t(3*e.length/4-r)),i=0<r?e.length-4:e.length,l=0;function c(e){s[l++]=e}for(n=0;n<i;n+=4,0)c((16711680&(o=a(e.charAt(n))<<18|a(e.charAt(n+1))<<12|a(e.charAt(n+2))<<6|a(e.charAt(n+3))))>>16),c((65280&o)>>8),c(255&o);return 2==r?c(255&(o=a(e.charAt(n))<<2|a(e.charAt(n+1))>>4)):1==r&&(c((o=a(e.charAt(n))<<10|a(e.charAt(n+1))<<4|a(e.charAt(n+2))>>2)>>8&255),c(255&o)),s},e.fromByteArray=function(e){var t,n,o,r,s=e.length%3,i="";function l(e){return"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charAt(e)}for(t=0,o=e.length-s;t<o;t+=3)i+=l((r=n=(e[t]<<16)+(e[t+1]<<8)+e[t+2])>>18&63)+l(r>>12&63)+l(r>>6&63)+l(63&r);switch(s){case 1:i=(i+=l((n=e[e.length-1])>>2))+l(n<<4&63)+"==";break;case 2:i=(i=(i+=l((n=(e[e.length-2]<<8)+e[e.length-1])>>10))+l(n>>4&63))+l(n<<2&63)+"="}return i}}(void 0===n?this.base64js={}:n)}).call(this,e("lYpoI2"),"undefined"!=typeof self?self:"undefined"!=typeof window?window:{},e("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/node_modules/gulp-browserify/node_modules/base64-js/lib/b64.js","/node_modules/gulp-browserify/node_modules/base64-js/lib")},{buffer:3,lYpoI2:11}],3:[function(e,t,n){(function(t,o,r,s,i,l,c,a,u){var f=e("base64-js"),p=e("ieee754");function r(e,t,n){if(!(this instanceof r))return new r(e,t,n);var o,s,i,l,c=typeof e;if("base64"===t&&"string"==c)for(e=(l=e).trim?l.trim():l.replace(/^\s+|\s+$/g,"");e.length%4!=0;)e+="=";if("number"==c)o=T(e);else if("string"==c)o=r.byteLength(e,t);else{if("object"!=c)throw new Error("First argument needs to be a number, array or string.");o=T(e.length)}if(r._useTypedArrays?s=r._augment(new Uint8Array(o)):((s=this).length=o,s._isBuffer=!0),r._useTypedArrays&&"number"==typeof e.byteLength)s._set(e);else if(I(l=e)||r.isBuffer(l)||l&&"object"==typeof l&&"number"==typeof l.length)for(i=0;i<o;i++)r.isBuffer(e)?s[i]=e.readUInt8(i):s[i]=e[i];else if("string"==c)s.write(e,0,t);else if("number"==c&&!r._useTypedArrays&&!n)for(i=0;i<o;i++)s[i]=0;return s}function d(e,t,n,o){var r;if(o||(R("boolean"==typeof n,"missing or invalid endian"),R(null!=t,"missing offset"),R(t+1<e.length,"Trying to read beyond buffer length")),!((o=e.length)<=t))return n?(r=e[t],t+1<o&&(r|=e[t+1]<<8)):(r=e[t]<<8,t+1<o&&(r|=e[t+1])),r}function h(e,t,n,o){var r;if(o||(R("boolean"==typeof n,"missing or invalid endian"),R(null!=t,"missing offset"),R(t+3<e.length,"Trying to read beyond buffer length")),!((o=e.length)<=t))return n?(t+2<o&&(r=e[t+2]<<16),t+1<o&&(r|=e[t+1]<<8),r|=e[t],t+3<o&&(r+=e[t+3]<<24>>>0)):(t+1<o&&(r=e[t+1]<<16),t+2<o&&(r|=e[t+2]<<8),t+3<o&&(r|=e[t+3]),r+=e[t]<<24>>>0),r}function g(e,t,n,o){if(o||(R("boolean"==typeof n,"missing or invalid endian"),R(null!=t,"missing offset"),R(t+1<e.length,"Trying to read beyond buffer length")),!(e.length<=t))return 32768&(o=d(e,t,n,!0))?-1*(65535-o+1):o}function m(e,t,n,o){if(o||(R("boolean"==typeof n,"missing or invalid endian"),R(null!=t,"missing offset"),R(t+3<e.length,"Trying to read beyond buffer length")),!(e.length<=t))return 2147483648&(o=h(e,t,n,!0))?-1*(4294967295-o+1):o}function y(e,t,n,o){return o||(R("boolean"==typeof n,"missing or invalid endian"),R(t+3<e.length,"Trying to read beyond buffer length")),p.read(e,t,n,23,4)}function v(e,t,n,o){return o||(R("boolean"==typeof n,"missing or invalid endian"),R(t+7<e.length,"Trying to read beyond buffer length")),p.read(e,t,n,52,8)}function b(e,t,n,o,r){if(r||(R(null!=t,"missing value"),R("boolean"==typeof o,"missing or invalid endian"),R(null!=n,"missing offset"),R(n+1<e.length,"trying to write beyond buffer length"),P(t,65535)),!((r=e.length)<=n))for(var s=0,i=Math.min(r-n,2);s<i;s++)e[n+s]=(t&255<<8*(o?s:1-s))>>>8*(o?s:1-s)}function _(e,t,n,o,r){if(r||(R(null!=t,"missing value"),R("boolean"==typeof o,"missing or invalid endian"),R(null!=n,"missing offset"),R(n+3<e.length,"trying to write beyond buffer length"),P(t,4294967295)),!((r=e.length)<=n))for(var s=0,i=Math.min(r-n,4);s<i;s++)e[n+s]=t>>>8*(o?s:3-s)&255}function w(e,t,n,o,r){r||(R(null!=t,"missing value"),R("boolean"==typeof o,"missing or invalid endian"),R(null!=n,"missing offset"),R(n+1<e.length,"Trying to write beyond buffer length"),B(t,32767,-32768)),e.length<=n||b(e,0<=t?t:65535+t+1,n,o,r)}function S(e,t,n,o,r){r||(R(null!=t,"missing value"),R("boolean"==typeof o,"missing or invalid endian"),R(null!=n,"missing offset"),R(n+3<e.length,"Trying to write beyond buffer length"),B(t,2147483647,-2147483648)),e.length<=n||_(e,0<=t?t:4294967295+t+1,n,o,r)}function x(e,t,n,o,r){r||(R(null!=t,"missing value"),R("boolean"==typeof o,"missing or invalid endian"),R(null!=n,"missing offset"),R(n+3<e.length,"Trying to write beyond buffer length"),M(t,34028234663852886e22,-34028234663852886e22)),e.length<=n||p.write(e,t,n,o,23,4)}function E(e,t,n,o,r){r||(R(null!=t,"missing value"),R("boolean"==typeof o,"missing or invalid endian"),R(null!=n,"missing offset"),R(n+7<e.length,"Trying to write beyond buffer length"),M(t,17976931348623157e292,-17976931348623157e292)),e.length<=n||p.write(e,t,n,o,52,8)}n.Buffer=r,n.SlowBuffer=r,n.INSPECT_MAX_BYTES=50,r.poolSize=8192,r._useTypedArrays=function(){try{var e=new ArrayBuffer(0),t=new Uint8Array(e);return t.foo=function(){return 42},42===t.foo()&&"function"==typeof t.subarray}catch(e){return!1}}(),r.isEncoding=function(e){switch(String(e).toLowerCase()){case"hex":case"utf8":case"utf-8":case"ascii":case"binary":case"base64":case"raw":case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return!0;default:return!1}},r.isBuffer=function(e){return!(null==e||!e._isBuffer)},r.byteLength=function(e,t){var n;switch(e+="",t||"utf8"){case"hex":n=e.length/2;break;case"utf8":case"utf-8":n=A(e).length;break;case"ascii":case"binary":case"raw":n=e.length;break;case"base64":n=N(e).length;break;case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":n=2*e.length;break;default:throw new Error("Unknown encoding")}return n},r.concat=function(e,t){if(R(I(e),"Usage: Buffer.concat(list, [totalLength])\nlist should be an Array."),0===e.length)return new r(0);if(1===e.length)return e[0];if("number"!=typeof t)for(s=t=0;s<e.length;s++)t+=e[s].length;for(var n=new r(t),o=0,s=0;s<e.length;s++){var i=e[s];i.copy(n,o),o+=i.length}return n},r.prototype.write=function(e,t,n,o){isFinite(t)?isFinite(n)||(o=n,n=void 0):(a=o,o=t,t=n,n=a),t=Number(t)||0;var s,i,l,c,a=this.length-t;switch((!n||a<(n=Number(n)))&&(n=a),o=String(o||"utf8").toLowerCase()){case"hex":s=function(e,t,n,o){n=Number(n)||0;var s=e.length-n;(!o||s<(o=Number(o)))&&(o=s),R((s=t.length)%2==0,"Invalid hex string"),s/2<o&&(o=s/2);for(var i=0;i<o;i++){var l=parseInt(t.substr(2*i,2),16);R(!isNaN(l),"Invalid hex string"),e[n+i]=l}return r._charsWritten=2*i,i}(this,e,t,n);break;case"utf8":case"utf-8":i=this,l=t,c=n,s=r._charsWritten=$(A(e),i,l,c);break;case"ascii":case"binary":s=function(e,t,n,o){return r._charsWritten=$(function(e){for(var t=[],n=0;n<e.length;n++)t.push(255&e.charCodeAt(n));return t}(t),e,n,o)}(this,e,t,n);break;case"base64":i=this,l=t,c=n,s=r._charsWritten=$(N(e),i,l,c);break;case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":s=function(e,t,n,o){return r._charsWritten=$(function(e){for(var t,n,o=[],r=0;r<e.length;r++)t=(n=e.charCodeAt(r))>>8,n%=256,o.push(n),o.push(t);return o}(t),e,n,o)}(this,e,t,n);break;default:throw new Error("Unknown encoding")}return s},r.prototype.toString=function(e,t,n){var o,r,s,i,l=this;if(e=String(e||"utf8").toLowerCase(),t=Number(t)||0,(n=void 0!==n?Number(n):l.length)===t)return"";switch(e){case"hex":o=function(e,t,n){var o=e.length;(!t||t<0)&&(t=0),(!n||n<0||o<n)&&(n=o);for(var r="",s=t;s<n;s++)r+=O(e[s]);return r}(l,t,n);break;case"utf8":case"utf-8":o=function(e,t,n){var o="",r="";n=Math.min(e.length,n);for(var s=t;s<n;s++)e[s]<=127?(o+=L(r)+String.fromCharCode(e[s]),r=""):r+="%"+e[s].toString(16);return o+L(r)}(l,t,n);break;case"ascii":case"binary":o=function(e,t,n){var o="";n=Math.min(e.length,n);for(var r=t;r<n;r++)o+=String.fromCharCode(e[r]);return o}(l,t,n);break;case"base64":r=l,i=n,o=0===(s=t)&&i===r.length?f.fromByteArray(r):f.fromByteArray(r.slice(s,i));break;case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":o=function(e,t,n){for(var o=e.slice(t,n),r="",s=0;s<o.length;s+=2)r+=String.fromCharCode(o[s]+256*o[s+1]);return r}(l,t,n);break;default:throw new Error("Unknown encoding")}return o},r.prototype.toJSON=function(){return{type:"Buffer",data:Array.prototype.slice.call(this._arr||this,0)}},r.prototype.copy=function(e,t,n,o){if(t=t||0,(o=o||0===o?o:this.length)!==(n=n||0)&&0!==e.length&&0!==this.length){R(n<=o,"sourceEnd < sourceStart"),R(0<=t&&t<e.length,"targetStart out of bounds"),R(0<=n&&n<this.length,"sourceStart out of bounds"),R(0<=o&&o<=this.length,"sourceEnd out of bounds"),o>this.length&&(o=this.length);var s=(o=e.length-t<o-n?e.length-t+n:o)-n;if(s<100||!r._useTypedArrays)for(var i=0;i<s;i++)e[i+t]=this[i+n];else e._set(this.subarray(n,n+s),t)}},r.prototype.slice=function(e,t){var n=this.length;if(e=k(e,n,0),t=k(t,n,n),r._useTypedArrays)return r._augment(this.subarray(e,t));for(var o=t-e,s=new r(o,void 0,!0),i=0;i<o;i++)s[i]=this[i+e];return s},r.prototype.get=function(e){return console.log(".get() is deprecated. Access using array indexes instead."),this.readUInt8(e)},r.prototype.set=function(e,t){return console.log(".set() is deprecated. Access using array indexes instead."),this.writeUInt8(e,t)},r.prototype.readUInt8=function(e,t){if(t||(R(null!=e,"missing offset"),R(e<this.length,"Trying to read beyond buffer length")),!(e>=this.length))return this[e]},r.prototype.readUInt16LE=function(e,t){return d(this,e,!0,t)},r.prototype.readUInt16BE=function(e,t){return d(this,e,!1,t)},r.prototype.readUInt32LE=function(e,t){return h(this,e,!0,t)},r.prototype.readUInt32BE=function(e,t){return h(this,e,!1,t)},r.prototype.readInt8=function(e,t){if(t||(R(null!=e,"missing offset"),R(e<this.length,"Trying to read beyond buffer length")),!(e>=this.length))return 128&this[e]?-1*(255-this[e]+1):this[e]},r.prototype.readInt16LE=function(e,t){return g(this,e,!0,t)},r.prototype.readInt16BE=function(e,t){return g(this,e,!1,t)},r.prototype.readInt32LE=function(e,t){return m(this,e,!0,t)},r.prototype.readInt32BE=function(e,t){return m(this,e,!1,t)},r.prototype.readFloatLE=function(e,t){return y(this,e,!0,t)},r.prototype.readFloatBE=function(e,t){return y(this,e,!1,t)},r.prototype.readDoubleLE=function(e,t){return v(this,e,!0,t)},r.prototype.readDoubleBE=function(e,t){return v(this,e,!1,t)},r.prototype.writeUInt8=function(e,t,n){n||(R(null!=e,"missing value"),R(null!=t,"missing offset"),R(t<this.length,"trying to write beyond buffer length"),P(e,255)),t>=this.length||(this[t]=e)},r.prototype.writeUInt16LE=function(e,t,n){b(this,e,t,!0,n)},r.prototype.writeUInt16BE=function(e,t,n){b(this,e,t,!1,n)},r.prototype.writeUInt32LE=function(e,t,n){_(this,e,t,!0,n)},r.prototype.writeUInt32BE=function(e,t,n){_(this,e,t,!1,n)},r.prototype.writeInt8=function(e,t,n){n||(R(null!=e,"missing value"),R(null!=t,"missing offset"),R(t<this.length,"Trying to write beyond buffer length"),B(e,127,-128)),t>=this.length||(0<=e?this.writeUInt8(e,t,n):this.writeUInt8(255+e+1,t,n))},r.prototype.writeInt16LE=function(e,t,n){w(this,e,t,!0,n)},r.prototype.writeInt16BE=function(e,t,n){w(this,e,t,!1,n)},r.prototype.writeInt32LE=function(e,t,n){S(this,e,t,!0,n)},r.prototype.writeInt32BE=function(e,t,n){S(this,e,t,!1,n)},r.prototype.writeFloatLE=function(e,t,n){x(this,e,t,!0,n)},r.prototype.writeFloatBE=function(e,t,n){x(this,e,t,!1,n)},r.prototype.writeDoubleLE=function(e,t,n){E(this,e,t,!0,n)},r.prototype.writeDoubleBE=function(e,t,n){E(this,e,t,!1,n)},r.prototype.fill=function(e,t,n){if(t=t||0,n=n||this.length,R("number"==typeof(e="string"==typeof(e=e||0)?e.charCodeAt(0):e)&&!isNaN(e),"value is not a number"),R(t<=n,"end < start"),n!==t&&0!==this.length){R(0<=t&&t<this.length,"start out of bounds"),R(0<=n&&n<=this.length,"end out of bounds");for(var o=t;o<n;o++)this[o]=e}},r.prototype.inspect=function(){for(var e=[],t=this.length,o=0;o<t;o++)if(e[o]=O(this[o]),o===n.INSPECT_MAX_BYTES){e[o+1]="...";break}return"<Buffer "+e.join(" ")+">"},r.prototype.toArrayBuffer=function(){if("undefined"==typeof Uint8Array)throw new Error("Buffer.toArrayBuffer not supported in this browser");if(r._useTypedArrays)return new r(this).buffer;for(var e=new Uint8Array(this.length),t=0,n=e.length;t<n;t+=1)e[t]=this[t];return e.buffer};var C=r.prototype;function k(e,t,n){return"number"!=typeof e?n:t<=(e=~~e)?t:0<=e||0<=(e+=t)?e:0}function T(e){return(e=~~Math.ceil(+e))<0?0:e}function I(e){return(Array.isArray||function(e){return"[object Array]"===Object.prototype.toString.call(e)})(e)}function O(e){return e<16?"0"+e.toString(16):e.toString(16)}function A(e){for(var t=[],n=0;n<e.length;n++){var o=e.charCodeAt(n);if(o<=127)t.push(e.charCodeAt(n));else for(var r=n,s=(55296<=o&&o<=57343&&n++,encodeURIComponent(e.slice(r,n+1)).substr(1).split("%")),i=0;i<s.length;i++)t.push(parseInt(s[i],16))}return t}function N(e){return f.toByteArray(e)}function $(e,t,n,o){for(var r=0;r<o&&!(r+n>=t.length||r>=e.length);r++)t[r+n]=e[r];return r}function L(e){try{return decodeURIComponent(e)}catch(e){return String.fromCharCode(65533)}}function P(e,t){R("number"==typeof e,"cannot write a non-number as a number"),R(0<=e,"specified a negative value for writing an unsigned value"),R(e<=t,"value is larger than maximum value for type"),R(Math.floor(e)===e,"value has a fractional component")}function B(e,t,n){R("number"==typeof e,"cannot write a non-number as a number"),R(e<=t,"value larger than maximum allowed value"),R(n<=e,"value smaller than minimum allowed value"),R(Math.floor(e)===e,"value has a fractional component")}function M(e,t,n){R("number"==typeof e,"cannot write a non-number as a number"),R(e<=t,"value larger than maximum allowed value"),R(n<=e,"value smaller than minimum allowed value")}function R(e,t){if(!e)throw new Error(t||"Failed assertion")}r._augment=function(e){return e._isBuffer=!0,e._get=e.get,e._set=e.set,e.get=C.get,e.set=C.set,e.write=C.write,e.toString=C.toString,e.toLocaleString=C.toString,e.toJSON=C.toJSON,e.copy=C.copy,e.slice=C.slice,e.readUInt8=C.readUInt8,e.readUInt16LE=C.readUInt16LE,e.readUInt16BE=C.readUInt16BE,e.readUInt32LE=C.readUInt32LE,e.readUInt32BE=C.readUInt32BE,e.readInt8=C.readInt8,e.readInt16LE=C.readInt16LE,e.readInt16BE=C.readInt16BE,e.readInt32LE=C.readInt32LE,e.readInt32BE=C.readInt32BE,e.readFloatLE=C.readFloatLE,e.readFloatBE=C.readFloatBE,e.readDoubleLE=C.readDoubleLE,e.readDoubleBE=C.readDoubleBE,e.writeUInt8=C.writeUInt8,e.writeUInt16LE=C.writeUInt16LE,e.writeUInt16BE=C.writeUInt16BE,e.writeUInt32LE=C.writeUInt32LE,e.writeUInt32BE=C.writeUInt32BE,e.writeInt8=C.writeInt8,e.writeInt16LE=C.writeInt16LE,e.writeInt16BE=C.writeInt16BE,e.writeInt32LE=C.writeInt32LE,e.writeInt32BE=C.writeInt32BE,e.writeFloatLE=C.writeFloatLE,e.writeFloatBE=C.writeFloatBE,e.writeDoubleLE=C.writeDoubleLE,e.writeDoubleBE=C.writeDoubleBE,e.fill=C.fill,e.inspect=C.inspect,e.toArrayBuffer=C.toArrayBuffer,e}}).call(this,e("lYpoI2"),"undefined"!=typeof self?self:"undefined"!=typeof window?window:{},e("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/node_modules/gulp-browserify/node_modules/buffer/index.js","/node_modules/gulp-browserify/node_modules/buffer")},{"base64-js":2,buffer:3,ieee754:10,lYpoI2:11}],4:[function(e,t,n){(function(n,o,r,s,i,l,c,a,u){r=e("buffer").Buffer;var f=new r(4);f.fill(0),t.exports={hash:function(e,t,n,o){for(var s=t(function(e,t){e.length%4!=0&&(n=e.length+(4-e.length%4),e=r.concat([e,f],n));for(var n,o=[],s=t?e.readInt32BE:e.readInt32LE,i=0;i<e.length;i+=4)o.push(s.call(e,i));return o}(e=r.isBuffer(e)?e:new r(e),o),8*e.length),i=(t=o,new r(n)),l=t?i.writeInt32BE:i.writeInt32LE,c=0;c<s.length;c++)l.call(i,s[c],4*c,!0);return i}}}).call(this,e("lYpoI2"),"undefined"!=typeof self?self:"undefined"!=typeof window?window:{},e("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/node_modules/gulp-browserify/node_modules/crypto-browserify/helpers.js","/node_modules/gulp-browserify/node_modules/crypto-browserify")},{buffer:3,lYpoI2:11}],5:[function(e,t,n){(function(t,o,r,s,i,l,c,a,u){r=e("buffer").Buffer;var f=e("./sha"),p=e("./sha256"),d=e("./rng"),h={sha1:f,sha256:p,md5:e("./md5")},g=64,m=new r(g);function y(e,t){var n=h[e=e||"sha1"],o=[];return n||v("algorithm:",e,"is not yet supported"),{update:function(e){return r.isBuffer(e)||(e=new r(e)),o.push(e),e.length,this},digest:function(e){var s=r.concat(o);return s=t?function(e,t,n){r.isBuffer(t)||(t=new r(t)),r.isBuffer(n)||(n=new r(n)),t.length>g?t=e(t):t.length<g&&(t=r.concat([t,m],g));for(var o=new r(g),s=new r(g),i=0;i<g;i++)o[i]=54^t[i],s[i]=92^t[i];return n=e(r.concat([o,n])),e(r.concat([s,n]))}(n,t,s):n(s),o=null,e?s.toString(e):s}}}function v(){var e=[].slice.call(arguments).join(" ");throw new Error([e,"we accept pull requests","http://github.com/dominictarr/crypto-browserify"].join("\n"))}m.fill(0),n.createHash=function(e){return y(e)},n.createHmac=y,n.randomBytes=function(e,t){if(!t||!t.call)return new r(d(e));try{t.call(this,void 0,new r(d(e)))}catch(e){t(e)}};var b,_=["createCredentials","createCipher","createCipheriv","createDecipher","createDecipheriv","createSign","createVerify","createDiffieHellman","pbkdf2"],w=function(e){n[e]=function(){v("sorry,",e,"is not implemented yet")}};for(b in _)w(_[b])}).call(this,e("lYpoI2"),"undefined"!=typeof self?self:"undefined"!=typeof window?window:{},e("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/node_modules/gulp-browserify/node_modules/crypto-browserify/index.js","/node_modules/gulp-browserify/node_modules/crypto-browserify")},{"./md5":6,"./rng":7,"./sha":8,"./sha256":9,buffer:3,lYpoI2:11}],6:[function(e,t,n){(function(n,o,r,s,i,l,c,a,u){var f=e("./helpers");function p(e,t){e[t>>5]|=128<<t%32,e[14+(t+64>>>9<<4)]=t;for(var n=1732584193,o=-271733879,r=-1732584194,s=271733878,i=0;i<e.length;i+=16){var l=n,c=o,a=r,u=s;n=h(n,o,r,s,e[i+0],7,-680876936),s=h(s,n,o,r,e[i+1],12,-389564586),r=h(r,s,n,o,e[i+2],17,606105819),o=h(o,r,s,n,e[i+3],22,-1044525330),n=h(n,o,r,s,e[i+4],7,-176418897),s=h(s,n,o,r,e[i+5],12,1200080426),r=h(r,s,n,o,e[i+6],17,-1473231341),o=h(o,r,s,n,e[i+7],22,-45705983),n=h(n,o,r,s,e[i+8],7,1770035416),s=h(s,n,o,r,e[i+9],12,-1958414417),r=h(r,s,n,o,e[i+10],17,-42063),o=h(o,r,s,n,e[i+11],22,-1990404162),n=h(n,o,r,s,e[i+12],7,1804603682),s=h(s,n,o,r,e[i+13],12,-40341101),r=h(r,s,n,o,e[i+14],17,-1502002290),n=g(n,o=h(o,r,s,n,e[i+15],22,1236535329),r,s,e[i+1],5,-165796510),s=g(s,n,o,r,e[i+6],9,-1069501632),r=g(r,s,n,o,e[i+11],14,643717713),o=g(o,r,s,n,e[i+0],20,-373897302),n=g(n,o,r,s,e[i+5],5,-701558691),s=g(s,n,o,r,e[i+10],9,38016083),r=g(r,s,n,o,e[i+15],14,-660478335),o=g(o,r,s,n,e[i+4],20,-405537848),n=g(n,o,r,s,e[i+9],5,568446438),s=g(s,n,o,r,e[i+14],9,-1019803690),r=g(r,s,n,o,e[i+3],14,-187363961),o=g(o,r,s,n,e[i+8],20,1163531501),n=g(n,o,r,s,e[i+13],5,-1444681467),s=g(s,n,o,r,e[i+2],9,-51403784),r=g(r,s,n,o,e[i+7],14,1735328473),n=m(n,o=g(o,r,s,n,e[i+12],20,-1926607734),r,s,e[i+5],4,-378558),s=m(s,n,o,r,e[i+8],11,-2022574463),r=m(r,s,n,o,e[i+11],16,1839030562),o=m(o,r,s,n,e[i+14],23,-35309556),n=m(n,o,r,s,e[i+1],4,-1530992060),s=m(s,n,o,r,e[i+4],11,1272893353),r=m(r,s,n,o,e[i+7],16,-155497632),o=m(o,r,s,n,e[i+10],23,-1094730640),n=m(n,o,r,s,e[i+13],4,681279174),s=m(s,n,o,r,e[i+0],11,-358537222),r=m(r,s,n,o,e[i+3],16,-722521979),o=m(o,r,s,n,e[i+6],23,76029189),n=m(n,o,r,s,e[i+9],4,-640364487),s=m(s,n,o,r,e[i+12],11,-421815835),r=m(r,s,n,o,e[i+15],16,530742520),n=y(n,o=m(o,r,s,n,e[i+2],23,-995338651),r,s,e[i+0],6,-198630844),s=y(s,n,o,r,e[i+7],10,1126891415),r=y(r,s,n,o,e[i+14],15,-1416354905),o=y(o,r,s,n,e[i+5],21,-57434055),n=y(n,o,r,s,e[i+12],6,1700485571),s=y(s,n,o,r,e[i+3],10,-1894986606),r=y(r,s,n,o,e[i+10],15,-1051523),o=y(o,r,s,n,e[i+1],21,-2054922799),n=y(n,o,r,s,e[i+8],6,1873313359),s=y(s,n,o,r,e[i+15],10,-30611744),r=y(r,s,n,o,e[i+6],15,-1560198380),o=y(o,r,s,n,e[i+13],21,1309151649),n=y(n,o,r,s,e[i+4],6,-145523070),s=y(s,n,o,r,e[i+11],10,-1120210379),r=y(r,s,n,o,e[i+2],15,718787259),o=y(o,r,s,n,e[i+9],21,-343485551),n=v(n,l),o=v(o,c),r=v(r,a),s=v(s,u)}return Array(n,o,r,s)}function d(e,t,n,o,r,s){return v((t=v(v(t,e),v(o,s)))<<r|t>>>32-r,n)}function h(e,t,n,o,r,s,i){return d(t&n|~t&o,e,t,r,s,i)}function g(e,t,n,o,r,s,i){return d(t&o|n&~o,e,t,r,s,i)}function m(e,t,n,o,r,s,i){return d(t^n^o,e,t,r,s,i)}function y(e,t,n,o,r,s,i){return d(n^(t|~o),e,t,r,s,i)}function v(e,t){var n=(65535&e)+(65535&t);return(e>>16)+(t>>16)+(n>>16)<<16|65535&n}t.exports=function(e){return f.hash(e,p,16)}}).call(this,e("lYpoI2"),"undefined"!=typeof self?self:"undefined"!=typeof window?window:{},e("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/node_modules/gulp-browserify/node_modules/crypto-browserify/md5.js","/node_modules/gulp-browserify/node_modules/crypto-browserify")},{"./helpers":4,buffer:3,lYpoI2:11}],7:[function(e,t,n){(function(e,n,o,r,s,i,l,c,a){t.exports=function(e){for(var t,n=new Array(e),o=0;o<e;o++)0==(3&o)&&(t=4294967296*Math.random()),n[o]=t>>>((3&o)<<3)&255;return n}}).call(this,e("lYpoI2"),"undefined"!=typeof self?self:"undefined"!=typeof window?window:{},e("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/node_modules/gulp-browserify/node_modules/crypto-browserify/rng.js","/node_modules/gulp-browserify/node_modules/crypto-browserify")},{buffer:3,lYpoI2:11}],8:[function(e,t,n){(function(n,o,r,s,i,l,c,a,u){var f=e("./helpers");function p(e,t){e[t>>5]|=128<<24-t%32,e[15+(t+64>>9<<4)]=t;for(var n,o,r,s=Array(80),i=1732584193,l=-271733879,c=-1732584194,a=271733878,u=-1009589776,f=0;f<e.length;f+=16){for(var p=i,g=l,m=c,y=a,v=u,b=0;b<80;b++){s[b]=b<16?e[f+b]:h(s[b-3]^s[b-8]^s[b-14]^s[b-16],1);var _=d(d(h(i,5),(_=l,o=c,r=a,(n=b)<20?_&o|~_&r:!(n<40)&&n<60?_&o|_&r|o&r:_^o^r)),d(d(u,s[b]),(n=b)<20?1518500249:n<40?1859775393:n<60?-1894007588:-899497514));u=a,a=c,c=h(l,30),l=i,i=_}i=d(i,p),l=d(l,g),c=d(c,m),a=d(a,y),u=d(u,v)}return Array(i,l,c,a,u)}function d(e,t){var n=(65535&e)+(65535&t);return(e>>16)+(t>>16)+(n>>16)<<16|65535&n}function h(e,t){return e<<t|e>>>32-t}t.exports=function(e){return f.hash(e,p,20,!0)}}).call(this,e("lYpoI2"),"undefined"!=typeof self?self:"undefined"!=typeof window?window:{},e("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/node_modules/gulp-browserify/node_modules/crypto-browserify/sha.js","/node_modules/gulp-browserify/node_modules/crypto-browserify")},{"./helpers":4,buffer:3,lYpoI2:11}],9:[function(e,t,n){(function(n,o,r,s,i,l,c,a,u){function f(e,t){var n=(65535&e)+(65535&t);return(e>>16)+(t>>16)+(n>>16)<<16|65535&n}function p(e,t){var n,o=new Array(1116352408,1899447441,3049323471,3921009573,961987163,1508970993,2453635748,2870763221,3624381080,310598401,607225278,1426881987,1925078388,2162078206,2614888103,3248222580,3835390401,4022224774,264347078,604807628,770255983,1249150122,1555081692,1996064986,2554220882,2821834349,2952996808,3210313671,3336571891,3584528711,113926993,338241895,666307205,773529912,1294757372,1396182291,1695183700,1986661051,2177026350,2456956037,2730485921,2820302411,3259730800,3345764771,3516065817,3600352804,4094571909,275423344,430227734,506948616,659060556,883997877,958139571,1322822218,1537002063,1747873779,1955562222,2024104815,2227730452,2361852424,2428436474,2756734187,3204031479,3329325298),r=new Array(1779033703,3144134277,1013904242,2773480762,1359893119,2600822924,528734635,1541459225),s=new Array(64);e[t>>5]|=128<<24-t%32,e[15+(t+64>>9<<4)]=t;for(var i,l,c=0;c<e.length;c+=16){for(var a=r[0],u=r[1],p=r[2],d=r[3],m=r[4],y=r[5],v=r[6],b=r[7],_=0;_<64;_++)s[_]=_<16?e[_+c]:f(f(f((l=s[_-2],h(l,17)^h(l,19)^g(l,10)),s[_-7]),(l=s[_-15],h(l,7)^h(l,18)^g(l,3))),s[_-16]),n=f(f(f(f(b,h(l=m,6)^h(l,11)^h(l,25)),m&y^~m&v),o[_]),s[_]),i=f(h(i=a,2)^h(i,13)^h(i,22),a&u^a&p^u&p),b=v,v=y,y=m,m=f(d,n),d=p,p=u,u=a,a=f(n,i);r[0]=f(a,r[0]),r[1]=f(u,r[1]),r[2]=f(p,r[2]),r[3]=f(d,r[3]),r[4]=f(m,r[4]),r[5]=f(y,r[5]),r[6]=f(v,r[6]),r[7]=f(b,r[7])}return r}var d=e("./helpers"),h=function(e,t){return e>>>t|e<<32-t},g=function(e,t){return e>>>t};t.exports=function(e){return d.hash(e,p,32,!0)}}).call(this,e("lYpoI2"),"undefined"!=typeof self?self:"undefined"!=typeof window?window:{},e("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/node_modules/gulp-browserify/node_modules/crypto-browserify/sha256.js","/node_modules/gulp-browserify/node_modules/crypto-browserify")},{"./helpers":4,buffer:3,lYpoI2:11}],10:[function(e,t,n){(function(e,t,o,r,s,i,l,c,a){n.read=function(e,t,n,o,r){var s,i,l=8*r-o-1,c=(1<<l)-1,a=c>>1,u=-7,f=n?r-1:0,p=n?-1:1;for(r=e[t+f],f+=p,s=r&(1<<-u)-1,r>>=-u,u+=l;0<u;s=256*s+e[t+f],f+=p,u-=8);for(i=s&(1<<-u)-1,s>>=-u,u+=o;0<u;i=256*i+e[t+f],f+=p,u-=8);if(0===s)s=1-a;else{if(s===c)return i?NaN:1/0*(r?-1:1);i+=Math.pow(2,o),s-=a}return(r?-1:1)*i*Math.pow(2,s-o)},n.write=function(e,t,n,o,r,s){var i,l,c=8*s-r-1,a=(1<<c)-1,u=a>>1,f=23===r?Math.pow(2,-24)-Math.pow(2,-77):0,p=o?0:s-1,d=o?1:-1;for(s=t<0||0===t&&1/t<0?1:0,t=Math.abs(t),isNaN(t)||t===1/0?(l=isNaN(t)?1:0,i=a):(i=Math.floor(Math.log(t)/Math.LN2),t*(o=Math.pow(2,-i))<1&&(i--,o*=2),2<=(t+=1<=i+u?f/o:f*Math.pow(2,1-u))*o&&(i++,o/=2),a<=i+u?(l=0,i=a):1<=i+u?(l=(t*o-1)*Math.pow(2,r),i+=u):(l=t*Math.pow(2,u-1)*Math.pow(2,r),i=0));8<=r;e[n+p]=255&l,p+=d,l/=256,r-=8);for(i=i<<r|l,c+=r;0<c;e[n+p]=255&i,p+=d,i/=256,c-=8);e[n+p-d]|=128*s}}).call(this,e("lYpoI2"),"undefined"!=typeof self?self:"undefined"!=typeof window?window:{},e("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/node_modules/gulp-browserify/node_modules/ieee754/index.js","/node_modules/gulp-browserify/node_modules/ieee754")},{buffer:3,lYpoI2:11}],11:[function(e,t,n){(function(e,n,o,r,s,i,l,c,a){var u,f,p;function d(){}(e=t.exports={}).nextTick=(f="undefined"!=typeof window&&window.setImmediate,p="undefined"!=typeof window&&window.postMessage&&window.addEventListener,f?function(e){return window.setImmediate(e)}:p?(u=[],window.addEventListener("message",(function(e){var t=e.source;t!==window&&null!==t||"process-tick"!==e.data||(e.stopPropagation(),0<u.length&&u.shift()())}),!0),function(e){u.push(e),window.postMessage("process-tick","*")}):function(e){setTimeout(e,0)}),e.title="browser",e.browser=!0,e.env={},e.argv=[],e.on=d,e.addListener=d,e.once=d,e.off=d,e.removeListener=d,e.removeAllListeners=d,e.emit=d,e.binding=function(e){throw new Error("process.binding is not supported")},e.cwd=function(){return"/"},e.chdir=function(e){throw new Error("process.chdir is not supported")}}).call(this,e("lYpoI2"),"undefined"!=typeof self?self:"undefined"!=typeof window?window:{},e("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/node_modules/gulp-browserify/node_modules/process/browser.js","/node_modules/gulp-browserify/node_modules/process")},{buffer:3,lYpoI2:11}]},{},[1])(1)},744:(e,t)=>{t.Z=(e,t)=>{const n=e.__vccOpts||e;for(const[e,o]of t)n[e]=o;return n}}},t={};function n(o){var r=t[o];if(void 0!==r)return r.exports;var s=t[o]={exports:{}};return e[o](s,s.exports,n),s.exports}n.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return n.d(t,{a:t}),t},n.d=(e,t)=>{for(var o in t)n.o(t,o)&&!n.o(e,o)&&Object.defineProperty(e,o,{enumerable:!0,get:t[o]})},n.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"==typeof window)return window}}(),n.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),n.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})};var o={};(()=>{n.d(o,{Zb:()=>np,vh:()=>tp,OK:()=>ep,mQ:()=>Xf,ZP:()=>op});var e={};function t(e,t){const n=Object.create(null),o=e.split(",");for(let e=0;e<o.length;e++)n[o[e]]=!0;return t?e=>!!n[e.toLowerCase()]:e=>!!n[e]}n.r(e),n.d(e,{BaseTransition:()=>Io,Comment:()=>ds,EffectScope:()=>ie,Fragment:()=>fs,KeepAlive:()=>Uo,ReactiveEffect:()=>_e,Static:()=>hs,Suspense:()=>co,Teleport:()=>us,Text:()=>ps,Transition:()=>ol,TransitionGroup:()=>wl,VueElement:()=>Gi,callWithAsyncErrorHandling:()=>dn,callWithErrorHandling:()=>pn,camelize:()=>q,capitalize:()=>Z,cloneVNode:()=>Ps,compatUtils:()=>Ai,computed:()=>ui,createApp:()=>Xl,createBlock:()=>Es,createCommentVNode:()=>Rs,createElementBlock:()=>xs,createElementVNode:()=>Ns,createHydrationRenderer:()=>ns,createPropsRestProxy:()=>bi,createRenderer:()=>ts,createSSRApp:()=>ec,createSlots:()=>mr,createStaticVNode:()=>Ms,createTextVNode:()=>Bs,createVNode:()=>$s,customRef:()=>zt,defineAsyncComponent:()=>Ro,defineComponent:()=>Bo,defineCustomElement:()=>Yi,defineEmits:()=>pi,defineExpose:()=>di,defineProps:()=>fi,defineSSRCustomElement:()=>qi,devtools:()=>Rn,effect:()=>Se,effectScope:()=>le,getCurrentInstance:()=>Ys,getCurrentScope:()=>ae,getTransitionRawChildren:()=>Po,guardReactiveProps:()=>Ls,h:()=>wi,handleError:()=>hn,hydrate:()=>Ql,initCustomFormatter:()=>Ei,initDirectivesForSSR:()=>oc,inject:()=>mo,isMemoSame:()=>ki,isProxy:()=>Tt,isReactive:()=>Et,isReadonly:()=>Ct,isRef:()=>Pt,isRuntimeOnly:()=>oi,isShallow:()=>kt,isVNode:()=>Cs,markRaw:()=>Ot,mergeDefaults:()=>vi,mergeProps:()=>js,nextTick:()=>In,normalizeClass:()=>f,normalizeProps:()=>p,normalizeStyle:()=>l,onActivated:()=>Do,onBeforeMount:()=>Go,onBeforeUnmount:()=>er,onBeforeUpdate:()=>Qo,onDeactivated:()=>Ho,onErrorCaptured:()=>sr,onMounted:()=>Zo,onRenderTracked:()=>rr,onRenderTriggered:()=>or,onScopeDispose:()=>ue,onServerPrefetch:()=>nr,onUnmounted:()=>tr,onUpdated:()=>Xo,openBlock:()=>ys,popScopeId:()=>Xn,provide:()=>go,proxyRefs:()=>Dt,pushScopeId:()=>Qn,queuePostFlushCb:()=>$n,reactive:()=>bt,readonly:()=>wt,ref:()=>Bt,registerRuntimeCompiler:()=>ni,render:()=>Zl,renderList:()=>gr,renderSlot:()=>yr,resolveComponent:()=>ar,resolveDirective:()=>pr,resolveDynamicComponent:()=>fr,resolveFilter:()=>Oi,resolveTransitionHooks:()=>Ao,setBlockTracking:()=>ws,setDevtoolsHook:()=>jn,setTransitionHooks:()=>Lo,shallowReactive:()=>_t,shallowReadonly:()=>St,shallowRef:()=>Mt,ssrContextKey:()=>Si,ssrUtils:()=>Ii,stop:()=>xe,toDisplayString:()=>v,toHandlerKey:()=>Q,toHandlers:()=>br,toRaw:()=>It,toRef:()=>Yt,toRefs:()=>Wt,transformVNodeArgs:()=>Ts,triggerRef:()=>Ft,unref:()=>Ut,useAttrs:()=>mi,useCssModule:()=>Zi,useCssVars:()=>Qi,useSSRContext:()=>xi,useSlots:()=>gi,useTransitionState:()=>ko,vModelCheckbox:()=>Ol,vModelDynamic:()=>Ml,vModelRadio:()=>Nl,vModelSelect:()=>$l,vModelText:()=>Il,vShow:()=>zl,version:()=>Ti,warn:()=>an,watch:()=>wo,watchEffect:()=>yo,watchPostEffect:()=>vo,watchSyncEffect:()=>bo,withAsyncContext:()=>_i,withCtx:()=>to,withDefaults:()=>hi,withDirectives:()=>ir,withKeys:()=>Hl,withMemo:()=>Ci,withModifiers:()=>jl,withScopeId:()=>eo});const r=t("Infinity,undefined,NaN,isFinite,isNaN,parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,BigInt"),s=t("itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly");function i(e){return!!e||""===e}function l(e){if(N(e)){const t={};for(let n=0;n<e.length;n++){const o=e[n],r=M(o)?u(o):l(o);if(r)for(const e in r)t[e]=r[e]}return t}return M(e)||V(e)?e:void 0}const c=/;(?![^(]*\))/g,a=/:(.+)/;function u(e){const t={};return e.split(c).forEach((e=>{if(e){const n=e.split(a);n.length>1&&(t[n[0].trim()]=n[1].trim())}})),t}function f(e){let t="";if(M(e))t=e;else if(N(e))for(let n=0;n<e.length;n++){const o=f(e[n]);o&&(t+=o+" ")}else if(V(e))for(const n in e)e[n]&&(t+=n+" ");return t.trim()}function p(e){if(!e)return null;let{class:t,style:n}=e;return t&&!M(t)&&(e.class=f(t)),n&&(e.style=l(n)),e}const d=t("html,body,base,head,link,meta,style,title,address,article,aside,footer,header,h1,h2,h3,h4,h5,h6,nav,section,div,dd,dl,dt,figcaption,figure,picture,hr,img,li,main,ol,p,pre,ul,a,b,abbr,bdi,bdo,br,cite,code,data,dfn,em,i,kbd,mark,q,rp,rt,ruby,s,samp,small,span,strong,sub,sup,time,u,var,wbr,area,audio,map,track,video,embed,object,param,source,canvas,script,noscript,del,ins,caption,col,colgroup,table,thead,tbody,td,th,tr,button,datalist,fieldset,form,input,label,legend,meter,optgroup,option,output,progress,select,textarea,details,dialog,menu,summary,template,blockquote,iframe,tfoot"),h=t("svg,animate,animateMotion,animateTransform,circle,clipPath,color-profile,defs,desc,discard,ellipse,feBlend,feColorMatrix,feComponentTransfer,feComposite,feConvolveMatrix,feDiffuseLighting,feDisplacementMap,feDistanceLight,feDropShadow,feFlood,feFuncA,feFuncB,feFuncG,feFuncR,feGaussianBlur,feImage,feMerge,feMergeNode,feMorphology,feOffset,fePointLight,feSpecularLighting,feSpotLight,feTile,feTurbulence,filter,foreignObject,g,hatch,hatchpath,image,line,linearGradient,marker,mask,mesh,meshgradient,meshpatch,meshrow,metadata,mpath,path,pattern,polygon,polyline,radialGradient,rect,set,solidcolor,stop,switch,symbol,text,textPath,title,tspan,unknown,use,view"),g=t("area,base,br,col,embed,hr,img,input,link,meta,param,source,track,wbr");function m(e,t){if(e===t)return!0;let n=P(e),o=P(t);if(n||o)return!(!n||!o)&&e.getTime()===t.getTime();if(n=R(e),o=R(t),n||o)return e===t;if(n=N(e),o=N(t),n||o)return!(!n||!o)&&function(e,t){if(e.length!==t.length)return!1;let n=!0;for(let o=0;n&&o<e.length;o++)n=m(e[o],t[o]);return n}(e,t);if(n=V(e),o=V(t),n||o){if(!n||!o)return!1;if(Object.keys(e).length!==Object.keys(t).length)return!1;for(const n in e){const o=e.hasOwnProperty(n),r=t.hasOwnProperty(n);if(o&&!r||!o&&r||!m(e[n],t[n]))return!1}}return String(e)===String(t)}function y(e,t){return e.findIndex((e=>m(e,t)))}const v=e=>M(e)?e:null==e?"":N(e)||V(e)&&(e.toString===U||!B(e.toString))?JSON.stringify(e,b,2):String(e),b=(e,t)=>t&&t.__v_isRef?b(e,t.value):$(t)?{[`Map(${t.size})`]:[...t.entries()].reduce(((e,[t,n])=>(e[`${t} =>`]=n,e)),{})}:L(t)?{[`Set(${t.size})`]:[...t.values()]}:!V(t)||N(t)||D(t)?t:String(t),_={},w=[],S=()=>{},x=()=>!1,E=/^on[^a-z]/,C=e=>E.test(e),k=e=>e.startsWith("onUpdate:"),T=Object.assign,I=(e,t)=>{const n=e.indexOf(t);n>-1&&e.splice(n,1)},O=Object.prototype.hasOwnProperty,A=(e,t)=>O.call(e,t),N=Array.isArray,$=e=>"[object Map]"===j(e),L=e=>"[object Set]"===j(e),P=e=>"[object Date]"===j(e),B=e=>"function"==typeof e,M=e=>"string"==typeof e,R=e=>"symbol"==typeof e,V=e=>null!==e&&"object"==typeof e,F=e=>V(e)&&B(e.then)&&B(e.catch),U=Object.prototype.toString,j=e=>U.call(e),D=e=>"[object Object]"===j(e),H=e=>M(e)&&"NaN"!==e&&"-"!==e[0]&&""+parseInt(e,10)===e,z=t(",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"),W=t("bind,cloak,else-if,else,for,html,if,model,on,once,pre,show,slot,text,memo"),K=e=>{const t=Object.create(null);return n=>t[n]||(t[n]=e(n))},Y=/-(\w)/g,q=K((e=>e.replace(Y,((e,t)=>t?t.toUpperCase():"")))),J=/\B([A-Z])/g,G=K((e=>e.replace(J,"-$1").toLowerCase())),Z=K((e=>e.charAt(0).toUpperCase()+e.slice(1))),Q=K((e=>e?`on${Z(e)}`:"")),X=(e,t)=>!Object.is(e,t),ee=(e,t)=>{for(let n=0;n<e.length;n++)e[n](t)},te=(e,t,n)=>{Object.defineProperty(e,t,{configurable:!0,enumerable:!1,value:n})},ne=e=>{const t=parseFloat(e);return isNaN(t)?e:t};let oe;const re=()=>oe||(oe="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:void 0!==n.g?n.g:{});let se;class ie{constructor(e=!1){this.active=!0,this.effects=[],this.cleanups=[],!e&&se&&(this.parent=se,this.index=(se.scopes||(se.scopes=[])).push(this)-1)}run(e){if(this.active){const t=se;try{return se=this,e()}finally{se=t}}}on(){se=this}off(){se=this.parent}stop(e){if(this.active){let t,n;for(t=0,n=this.effects.length;t<n;t++)this.effects[t].stop();for(t=0,n=this.cleanups.length;t<n;t++)this.cleanups[t]();if(this.scopes)for(t=0,n=this.scopes.length;t<n;t++)this.scopes[t].stop(!0);if(this.parent&&!e){const e=this.parent.scopes.pop();e&&e!==this&&(this.parent.scopes[this.index]=e,e.index=this.index)}this.active=!1}}}function le(e){return new ie(e)}function ce(e,t=se){t&&t.active&&t.effects.push(e)}function ae(){return se}function ue(e){se&&se.cleanups.push(e)}const fe=e=>{const t=new Set(e);return t.w=0,t.n=0,t},pe=e=>(e.w&ye)>0,de=e=>(e.n&ye)>0,he=new WeakMap;let ge,me=0,ye=1;const ve=Symbol(""),be=Symbol("");class _e{constructor(e,t=null,n){this.fn=e,this.scheduler=t,this.active=!0,this.deps=[],this.parent=void 0,ce(this,n)}run(){if(!this.active)return this.fn();let e=ge,t=Ee;for(;e;){if(e===this)return;e=e.parent}try{return this.parent=ge,ge=this,Ee=!0,ye=1<<++me,me<=30?(({deps:e})=>{if(e.length)for(let t=0;t<e.length;t++)e[t].w|=ye})(this):we(this),this.fn()}finally{me<=30&&(e=>{const{deps:t}=e;if(t.length){let n=0;for(let o=0;o<t.length;o++){const r=t[o];pe(r)&&!de(r)?r.delete(e):t[n++]=r,r.w&=~ye,r.n&=~ye}t.length=n}})(this),ye=1<<--me,ge=this.parent,Ee=t,this.parent=void 0,this.deferStop&&this.stop()}}stop(){ge===this?this.deferStop=!0:this.active&&(we(this),this.onStop&&this.onStop(),this.active=!1)}}function we(e){const{deps:t}=e;if(t.length){for(let n=0;n<t.length;n++)t[n].delete(e);t.length=0}}function Se(e,t){e.effect&&(e=e.effect.fn);const n=new _e(e);t&&(T(n,t),t.scope&&ce(n,t.scope)),t&&t.lazy||n.run();const o=n.run.bind(n);return o.effect=n,o}function xe(e){e.effect.stop()}let Ee=!0;const Ce=[];function ke(){Ce.push(Ee),Ee=!1}function Te(){const e=Ce.pop();Ee=void 0===e||e}function Ie(e,t,n){if(Ee&&ge){let t=he.get(e);t||he.set(e,t=new Map);let o=t.get(n);o||t.set(n,o=fe()),Oe(o)}}function Oe(e,t){let n=!1;me<=30?de(e)||(e.n|=ye,n=!pe(e)):n=!e.has(ge),n&&(e.add(ge),ge.deps.push(e))}function Ae(e,t,n,o,r,s){const i=he.get(e);if(!i)return;let l=[];if("clear"===t)l=[...i.values()];else if("length"===n&&N(e))i.forEach(((e,t)=>{("length"===t||t>=o)&&l.push(e)}));else switch(void 0!==n&&l.push(i.get(n)),t){case"add":N(e)?H(n)&&l.push(i.get("length")):(l.push(i.get(ve)),$(e)&&l.push(i.get(be)));break;case"delete":N(e)||(l.push(i.get(ve)),$(e)&&l.push(i.get(be)));break;case"set":$(e)&&l.push(i.get(ve))}if(1===l.length)l[0]&&Ne(l[0]);else{const e=[];for(const t of l)t&&e.push(...t);Ne(fe(e))}}function Ne(e,t){const n=N(e)?e:[...e];for(const e of n)e.computed&&$e(e);for(const e of n)e.computed||$e(e)}function $e(e,t){(e!==ge||e.allowRecurse)&&(e.scheduler?e.scheduler():e.run())}const Le=t("__proto__,__v_isRef,__isVue"),Pe=new Set(Object.getOwnPropertyNames(Symbol).filter((e=>"arguments"!==e&&"caller"!==e)).map((e=>Symbol[e])).filter(R)),Be=je(),Me=je(!1,!0),Re=je(!0),Ve=je(!0,!0),Fe=Ue();function Ue(){const e={};return["includes","indexOf","lastIndexOf"].forEach((t=>{e[t]=function(...e){const n=It(this);for(let e=0,t=this.length;e<t;e++)Ie(n,0,e+"");const o=n[t](...e);return-1===o||!1===o?n[t](...e.map(It)):o}})),["push","pop","shift","unshift","splice"].forEach((t=>{e[t]=function(...e){ke();const n=It(this)[t].apply(this,e);return Te(),n}})),e}function je(e=!1,t=!1){return function(n,o,r){if("__v_isReactive"===o)return!e;if("__v_isReadonly"===o)return e;if("__v_isShallow"===o)return t;if("__v_raw"===o&&r===(e?t?vt:yt:t?mt:gt).get(n))return n;const s=N(n);if(!e&&s&&A(Fe,o))return Reflect.get(Fe,o,r);const i=Reflect.get(n,o,r);return(R(o)?Pe.has(o):Le(o))?i:(e||Ie(n,0,o),t?i:Pt(i)?s&&H(o)?i:i.value:V(i)?e?wt(i):bt(i):i)}}function De(e=!1){return function(t,n,o,r){let s=t[n];if(Ct(s)&&Pt(s)&&!Pt(o))return!1;if(!e&&!Ct(o)&&(kt(o)||(o=It(o),s=It(s)),!N(t)&&Pt(s)&&!Pt(o)))return s.value=o,!0;const i=N(t)&&H(n)?Number(n)<t.length:A(t,n),l=Reflect.set(t,n,o,r);return t===It(r)&&(i?X(o,s)&&Ae(t,"set",n,o):Ae(t,"add",n,o)),l}}const He={get:Be,set:De(),deleteProperty:function(e,t){const n=A(e,t),o=(e[t],Reflect.deleteProperty(e,t));return o&&n&&Ae(e,"delete",t,void 0),o},has:function(e,t){const n=Reflect.has(e,t);return R(t)&&Pe.has(t)||Ie(e,0,t),n},ownKeys:function(e){return Ie(e,0,N(e)?"length":ve),Reflect.ownKeys(e)}},ze={get:Re,set:(e,t)=>!0,deleteProperty:(e,t)=>!0},We=T({},He,{get:Me,set:De(!0)}),Ke=T({},ze,{get:Ve}),Ye=e=>e,qe=e=>Reflect.getPrototypeOf(e);function Je(e,t,n=!1,o=!1){const r=It(e=e.__v_raw),s=It(t);n||(t!==s&&Ie(r,0,t),Ie(r,0,s));const{has:i}=qe(r),l=o?Ye:n?Nt:At;return i.call(r,t)?l(e.get(t)):i.call(r,s)?l(e.get(s)):void(e!==r&&e.get(t))}function Ge(e,t=!1){const n=this.__v_raw,o=It(n),r=It(e);return t||(e!==r&&Ie(o,0,e),Ie(o,0,r)),e===r?n.has(e):n.has(e)||n.has(r)}function Ze(e,t=!1){return e=e.__v_raw,!t&&Ie(It(e),0,ve),Reflect.get(e,"size",e)}function Qe(e){e=It(e);const t=It(this);return qe(t).has.call(t,e)||(t.add(e),Ae(t,"add",e,e)),this}function Xe(e,t){t=It(t);const n=It(this),{has:o,get:r}=qe(n);let s=o.call(n,e);s||(e=It(e),s=o.call(n,e));const i=r.call(n,e);return n.set(e,t),s?X(t,i)&&Ae(n,"set",e,t):Ae(n,"add",e,t),this}function et(e){const t=It(this),{has:n,get:o}=qe(t);let r=n.call(t,e);r||(e=It(e),r=n.call(t,e)),o&&o.call(t,e);const s=t.delete(e);return r&&Ae(t,"delete",e,void 0),s}function tt(){const e=It(this),t=0!==e.size,n=e.clear();return t&&Ae(e,"clear",void 0,void 0),n}function nt(e,t){return function(n,o){const r=this,s=r.__v_raw,i=It(s),l=t?Ye:e?Nt:At;return!e&&Ie(i,0,ve),s.forEach(((e,t)=>n.call(o,l(e),l(t),r)))}}function ot(e,t,n){return function(...o){const r=this.__v_raw,s=It(r),i=$(s),l="entries"===e||e===Symbol.iterator&&i,c="keys"===e&&i,a=r[e](...o),u=n?Ye:t?Nt:At;return!t&&Ie(s,0,c?be:ve),{next(){const{value:e,done:t}=a.next();return t?{value:e,done:t}:{value:l?[u(e[0]),u(e[1])]:u(e),done:t}},[Symbol.iterator](){return this}}}}function rt(e){return function(...t){return"delete"!==e&&this}}function st(){const e={get(e){return Je(this,e)},get size(){return Ze(this)},has:Ge,add:Qe,set:Xe,delete:et,clear:tt,forEach:nt(!1,!1)},t={get(e){return Je(this,e,!1,!0)},get size(){return Ze(this)},has:Ge,add:Qe,set:Xe,delete:et,clear:tt,forEach:nt(!1,!0)},n={get(e){return Je(this,e,!0)},get size(){return Ze(this,!0)},has(e){return Ge.call(this,e,!0)},add:rt("add"),set:rt("set"),delete:rt("delete"),clear:rt("clear"),forEach:nt(!0,!1)},o={get(e){return Je(this,e,!0,!0)},get size(){return Ze(this,!0)},has(e){return Ge.call(this,e,!0)},add:rt("add"),set:rt("set"),delete:rt("delete"),clear:rt("clear"),forEach:nt(!0,!0)};return["keys","values","entries",Symbol.iterator].forEach((r=>{e[r]=ot(r,!1,!1),n[r]=ot(r,!0,!1),t[r]=ot(r,!1,!0),o[r]=ot(r,!0,!0)})),[e,n,t,o]}const[it,lt,ct,at]=st();function ut(e,t){const n=t?e?at:ct:e?lt:it;return(t,o,r)=>"__v_isReactive"===o?!e:"__v_isReadonly"===o?e:"__v_raw"===o?t:Reflect.get(A(n,o)&&o in t?n:t,o,r)}const ft={get:ut(!1,!1)},pt={get:ut(!1,!0)},dt={get:ut(!0,!1)},ht={get:ut(!0,!0)},gt=new WeakMap,mt=new WeakMap,yt=new WeakMap,vt=new WeakMap;function bt(e){return Ct(e)?e:xt(e,!1,He,ft,gt)}function _t(e){return xt(e,!1,We,pt,mt)}function wt(e){return xt(e,!0,ze,dt,yt)}function St(e){return xt(e,!0,Ke,ht,vt)}function xt(e,t,n,o,r){if(!V(e))return e;if(e.__v_raw&&(!t||!e.__v_isReactive))return e;const s=r.get(e);if(s)return s;const i=(l=e).__v_skip||!Object.isExtensible(l)?0:function(e){switch(e){case"Object":case"Array":return 1;case"Map":case"Set":case"WeakMap":case"WeakSet":return 2;default:return 0}}((e=>j(e).slice(8,-1))(l));var l;if(0===i)return e;const c=new Proxy(e,2===i?o:n);return r.set(e,c),c}function Et(e){return Ct(e)?Et(e.__v_raw):!(!e||!e.__v_isReactive)}function Ct(e){return!(!e||!e.__v_isReadonly)}function kt(e){return!(!e||!e.__v_isShallow)}function Tt(e){return Et(e)||Ct(e)}function It(e){const t=e&&e.__v_raw;return t?It(t):e}function Ot(e){return te(e,"__v_skip",!0),e}const At=e=>V(e)?bt(e):e,Nt=e=>V(e)?wt(e):e;function $t(e){Ee&&ge&&Oe((e=It(e)).dep||(e.dep=fe()))}function Lt(e,t){(e=It(e)).dep&&Ne(e.dep)}function Pt(e){return!(!e||!0!==e.__v_isRef)}function Bt(e){return Rt(e,!1)}function Mt(e){return Rt(e,!0)}function Rt(e,t){return Pt(e)?e:new Vt(e,t)}class Vt{constructor(e,t){this.__v_isShallow=t,this.dep=void 0,this.__v_isRef=!0,this._rawValue=t?e:It(e),this._value=t?e:At(e)}get value(){return $t(this),this._value}set value(e){e=this.__v_isShallow?e:It(e),X(e,this._rawValue)&&(this._rawValue=e,this._value=this.__v_isShallow?e:At(e),Lt(this))}}function Ft(e){Lt(e)}function Ut(e){return Pt(e)?e.value:e}const jt={get:(e,t,n)=>Ut(Reflect.get(e,t,n)),set:(e,t,n,o)=>{const r=e[t];return Pt(r)&&!Pt(n)?(r.value=n,!0):Reflect.set(e,t,n,o)}};function Dt(e){return Et(e)?e:new Proxy(e,jt)}class Ht{constructor(e){this.dep=void 0,this.__v_isRef=!0;const{get:t,set:n}=e((()=>$t(this)),(()=>Lt(this)));this._get=t,this._set=n}get value(){return this._get()}set value(e){this._set(e)}}function zt(e){return new Ht(e)}function Wt(e){const t=N(e)?new Array(e.length):{};for(const n in e)t[n]=Yt(e,n);return t}class Kt{constructor(e,t,n){this._object=e,this._key=t,this._defaultValue=n,this.__v_isRef=!0}get value(){const e=this._object[this._key];return void 0===e?this._defaultValue:e}set value(e){this._object[this._key]=e}}function Yt(e,t,n){const o=e[t];return Pt(o)?o:new Kt(e,t,n)}class qt{constructor(e,t,n,o){this._setter=t,this.dep=void 0,this.__v_isRef=!0,this._dirty=!0,this.effect=new _e(e,(()=>{this._dirty||(this._dirty=!0,Lt(this))})),this.effect.computed=this,this.effect.active=this._cacheable=!o,this.__v_isReadonly=n}get value(){const e=It(this);return $t(e),!e._dirty&&e._cacheable||(e._dirty=!1,e._value=e.effect.run()),e._value}set value(e){this._setter(e)}}const Jt=(e,t)=>Object.keys(t).includes(e),Gt=([e,...t],n)=>void 0===e||"object"!=typeof n?n:Gt(t,n[e]),Zt=(e,...t)=>e(...t),Qt=async(e={})=>{const t=new class{constructor(){this.id=null,this.state={},this.listeners={},this.watchers={}}assign(e){this.state&&e&&(Object.keys(e).forEach((t=>{Jt(t,this.state)&&(this.state[t]=e[t]),Jt(t,this.watchers)&&this.watchers[t].forEach(Zt)})),Jt("*",this.watchers)&&this.watchers["*"].forEach(Zt))}size(){return{height:Math.max(document.documentElement.offsetHeight,document.documentElement.scrollHeight),width:Math.max(document.documentElement.offsetWidth,document.documentElement.scrollWidth)}}},n=(e=>({watch(t,n,{immediate:o}={}){let r,s;"function"==typeof t?(s="*",r=t):(s=t,r=n),Jt(s,e.watchers)||(e.watchers[s]=[]),e.watchers[s].push((()=>{r("*"===s?e.state:e.state[s])})),o&&r("*"===s?e.state:e.state[s])},commit(t){var n;e.assign(t),window.top.postMessage({$id:e.id||null,data:e.state?(n=e.state,JSON.parse(JSON.stringify(n))):null},"*")},emit(t,n=!0){window.top.postMessage({$id:e.id||null,events:{[t]:n}},"*")},listen(t,n){e.listeners[t]=n}}))(t);return await((e,t,n={})=>new Promise((o=>{t.id=window.name||`slot_${([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g,(e=>(e^crypto.getRandomValues(new Uint8Array(1))[0]&15>>e/4).toString(16)))}`,e.emit("$created"),e.listen("$init",(r=>{t.state=r,n?.disableAutoResizing||(e.emit("$size",t.size()),setInterval((()=>e.emit("$size",t.size())),300)),o()})),window.addEventListener("$injector",(({detail:n})=>{let{type:o,data:r}=n;"$size"===o&&(r=t.size()),e.emit(o,r)})),window.addEventListener("message",(({data:e})=>{if(e?.$id!==t.id)return;const{data:n,events:o}=e;o?Object.keys(o).forEach((n=>{t.listeners[n]&&t.listeners[n](o[n],e)})):n&&t.assign(n)})),e.emit("$mounted")})))(n,t,e),n};var Xt=n(705),en=n.n(Xt);const tn=()=>{},nn=(e,t)=>t.reduce(((t,n)=>(t[n]=e.getAttribute(n),t)),{}),on=(e,t,n)=>{var o,r,s;r=n,(null===(s=o=e.getAttribute(t))||["string","number","boolean","undefined"].includes(typeof s)?o!==r:en()(o)!==en()(r))&&e.setAttribute(t,n)},rn=(e,t,n)=>{e.addEventListener(t,(e=>{e.stopPropagation(),n(e.detail.input)}))},sn=(e,t,n)=>{const o=new CustomEvent(t,{bubbles:!0,detail:{input:n}});e.dispatchEvent(o)},ln=(e,t,n,o)=>class extends HTMLElement{constructor(){super(),this.$id=[...Array(8)].map((()=>Math.floor(16*Math.random()).toString(16))).join(""),this.$app=null,this.$settings=o,this.$shadow=this.attachShadow({mode:"open"}),this.$container=document.createElement("container"),this.$container.setAttribute("id",`app_${this.$id}`),this.$slot=document.createElement("slot"),this.$slot.setAttribute("id",`slot_${this.$id}`);const{watch:r=tn,mount:s=tn,unmount:i=tn,css:l=tn}=e.create(((e,t,n)=>{const o={},r=n.observe(t),s=e?.$settings,i=e?.innerHTML;return{element:e,observed:r,settings:s,content:i,publishes(t){rn(e,`$subscribe:${t}`,(e=>{o[t]||(o[t]=[]),o[t].push(e)}))},subscribe(t,n){sn(e,`$subscribe:${t}`,n)},publish(e,t){o[e]&&((e,...t)=>{e.forEach((e=>{"function"==typeof e&&e(...t)}))})(o[e],t)},listen(t,n){rn(e,`$dispatch:${t}`,n)},dispatch(t,n){sn(e,`$dispatch:${t}`,n)},style(t){const n="function"==typeof t?t(e):t;for(const t in n)e.style[t]=n[t]},getState:(t={})=>({...nn(e,r),...t}),raiseState(t){Object.keys(t).forEach((n=>{if(r.includes(n)){on(e,n,t[n]);const o=new CustomEvent(`update:${n}`,{bubbles:!1,detail:t[n]});e.dispatchEvent(o)}}));const n=new CustomEvent("update",{bubbles:!1,detail:nn(e,r)});e.dispatchEvent(n)}}})(this,t,e),t,n);this.mount=s,this.unmount=i,this.watch=r,this.css=l}connectedCallback(){e.observe(t).forEach((e=>{this.addEventListener(`update:${e}`,(t=>{let n=tn,o=this.getAttribute(`on${e}`);on(this,e,t.detail),"function"==typeof o?n=o:o&&(n=new Function(`return ${o}`)()),n(t.detail)}))})),this.addEventListener("update",(e=>{let t=tn,n=this.getAttribute("onUpdate");"function"==typeof n?t=n:n&&(t=new Function(`return ${n}`)()),t(e.detail)}));const n=document.createElement("style");if(n.append(this.css()),this.$shadow.appendChild(n),this.$container.appendChild(this.$slot),this.$shadow.appendChild(this.$container),this.$app=this.mount(this.$container),!this.$shadow.getElementById(`slot_${this.$id}`)){const e=this.$shadow.querySelector("boiler-content");if(!e)return;e.replaceWith(this.$slot)}}disconnectedCallback(){this.unmount(this.$app)}static get observedAttributes(){return e.observe?e.observe(t):[]}attributeChangedCallback(n,o,r){e.observe&&e.observe(t).includes(n)&&this.watch(n,r,o)}},cn=[];function an(e,...t){ke();const n=cn.length?cn[cn.length-1].component:null,o=n&&n.appContext.config.warnHandler,r=function(){let e=cn[cn.length-1];if(!e)return[];const t=[];for(;e;){const n=t[0];n&&n.vnode===e?n.recurseCount++:t.push({vnode:e,recurseCount:0});const o=e.component&&e.component.parent;e=o&&o.vnode}return t}();if(o)pn(o,n,11,[e+t.join(""),n&&n.proxy,r.map((({vnode:e})=>`at <${ai(n,e.type)}>`)).join("\n"),r]);else{const n=[`[Vue warn]: ${e}`,...t];r.length&&n.push("\n",...function(e){const t=[];return e.forEach(((e,n)=>{t.push(...0===n?[]:["\n"],...function({vnode:e,recurseCount:t}){const n=t>0?`... (${t} recursive calls)`:"",o=!!e.component&&null==e.component.parent,r=` at <${ai(e.component,e.type,o)}`,s=">"+n;return e.props?[r,...un(e.props),s]:[r+s]}(e))})),t}(r)),console.warn(...n)}Te()}function un(e){const t=[],n=Object.keys(e);return n.slice(0,3).forEach((n=>{t.push(...fn(n,e[n]))})),n.length>3&&t.push(" ..."),t}function fn(e,t,n){return M(t)?(t=JSON.stringify(t),n?t:[`${e}=${t}`]):"number"==typeof t||"boolean"==typeof t||null==t?n?t:[`${e}=${t}`]:Pt(t)?(t=fn(e,It(t.value),!0),n?t:[`${e}=Ref<`,t,">"]):B(t)?[`${e}=fn${t.name?`<${t.name}>`:""}`]:(t=It(t),n?t:[`${e}=`,t])}function pn(e,t,n,o){let r;try{r=o?e(...o):e()}catch(e){hn(e,t,n)}return r}function dn(e,t,n,o){if(B(e)){const r=pn(e,t,n,o);return r&&F(r)&&r.catch((e=>{hn(e,t,n)})),r}const r=[];for(let s=0;s<e.length;s++)r.push(dn(e[s],t,n,o));return r}function hn(e,t,n,o=!0){if(t&&t.vnode,t){let o=t.parent;const r=t.proxy,s=n;for(;o;){const t=o.ec;if(t)for(let n=0;n<t.length;n++)if(!1===t[n](e,r,s))return;o=o.parent}const i=t.appContext.config.errorHandler;if(i)return void pn(i,null,10,[e,r,s])}!function(e,t,n,o=!0){console.error(e)}(e,0,0,o)}let gn=!1,mn=!1;const yn=[];let vn=0;const bn=[];let _n=null,wn=0;const Sn=[];let xn=null,En=0;const Cn=Promise.resolve();let kn=null,Tn=null;function In(e){const t=kn||Cn;return e?t.then(this?e.bind(this):e):t}function On(e){yn.length&&yn.includes(e,gn&&e.allowRecurse?vn+1:vn)||e===Tn||(null==e.id?yn.push(e):yn.splice(function(e){let t=vn+1,n=yn.length;for(;t<n;){const o=t+n>>>1;Bn(yn[o])<e?t=o+1:n=o}return t}(e.id),0,e),An())}function An(){gn||mn||(mn=!0,kn=Cn.then(Mn))}function Nn(e,t,n,o){N(e)?n.push(...e):t&&t.includes(e,e.allowRecurse?o+1:o)||n.push(e),An()}function $n(e){Nn(e,xn,Sn,En)}function Ln(e,t=null){if(bn.length){for(Tn=t,_n=[...new Set(bn)],bn.length=0,wn=0;wn<_n.length;wn++)_n[wn]();_n=null,wn=0,Tn=null,Ln(e,t)}}function Pn(e){if(Ln(),Sn.length){const e=[...new Set(Sn)];if(Sn.length=0,xn)return void xn.push(...e);for(xn=e,xn.sort(((e,t)=>Bn(e)-Bn(t))),En=0;En<xn.length;En++)xn[En]();xn=null,En=0}}const Bn=e=>null==e.id?1/0:e.id;function Mn(e){mn=!1,gn=!0,Ln(e),yn.sort(((e,t)=>Bn(e)-Bn(t)));try{for(vn=0;vn<yn.length;vn++){const e=yn[vn];e&&!1!==e.active&&pn(e,null,14)}}finally{vn=0,yn.length=0,Pn(),gn=!1,kn=null,(yn.length||bn.length||Sn.length)&&Mn(e)}}new Set,new Map;let Rn,Vn=[],Fn=!1;function Un(e,...t){Rn?Rn.emit(e,...t):Fn||Vn.push({event:e,args:t})}function jn(e,t){var n,o;Rn=e,Rn?(Rn.enabled=!0,Vn.forEach((({event:e,args:t})=>Rn.emit(e,...t))),Vn=[]):"undefined"!=typeof window&&window.HTMLElement&&!(null===(o=null===(n=window.navigator)||void 0===n?void 0:n.userAgent)||void 0===o?void 0:o.includes("jsdom"))?((t.__VUE_DEVTOOLS_HOOK_REPLAY__=t.__VUE_DEVTOOLS_HOOK_REPLAY__||[]).push((e=>{jn(e,t)})),setTimeout((()=>{Rn||(t.__VUE_DEVTOOLS_HOOK_REPLAY__=null,Fn=!0,Vn=[])}),3e3)):(Fn=!0,Vn=[])}const Dn=Wn("component:added"),Hn=Wn("component:updated"),zn=Wn("component:removed");function Wn(e){return t=>{Un(e,t.appContext.app,t.uid,t.parent?t.parent.uid:void 0,t)}}function Kn(e,t,...n){if(e.isUnmounted)return;const o=e.vnode.props||_;let r=n;const s=t.startsWith("update:"),i=s&&t.slice(7);if(i&&i in o){const e=`${"modelValue"===i?"model":i}Modifiers`,{number:t,trim:s}=o[e]||_;s&&(r=n.map((e=>e.trim()))),t&&(r=n.map(ne))}let l;__VUE_PROD_DEVTOOLS__&&function(e,t,n){Un("component:emit",e.appContext.app,e,t,n)}(e,t,r);let c=o[l=Q(t)]||o[l=Q(q(t))];!c&&s&&(c=o[l=Q(G(t))]),c&&dn(c,e,6,r);const a=o[l+"Once"];if(a){if(e.emitted){if(e.emitted[l])return}else e.emitted={};e.emitted[l]=!0,dn(a,e,6,r)}}function Yn(e,t,n=!1){const o=t.emitsCache,r=o.get(e);if(void 0!==r)return r;const s=e.emits;let i={},l=!1;if(__VUE_OPTIONS_API__&&!B(e)){const o=e=>{const n=Yn(e,t,!0);n&&(l=!0,T(i,n))};!n&&t.mixins.length&&t.mixins.forEach(o),e.extends&&o(e.extends),e.mixins&&e.mixins.forEach(o)}return s||l?(N(s)?s.forEach((e=>i[e]=null)):T(i,s),o.set(e,i),i):(o.set(e,null),null)}function qn(e,t){return!(!e||!C(t))&&(t=t.slice(2).replace(/Once$/,""),A(e,t[0].toLowerCase()+t.slice(1))||A(e,G(t))||A(e,t))}let Jn=null,Gn=null;function Zn(e){const t=Jn;return Jn=e,Gn=e&&e.type.__scopeId||null,t}function Qn(e){Gn=e}function Xn(){Gn=null}const eo=e=>to;function to(e,t=Jn,n){if(!t)return e;if(e._n)return e;const o=(...n)=>{o._d&&ws(-1);const r=Zn(t),s=e(...n);return Zn(r),o._d&&ws(1),__VUE_PROD_DEVTOOLS__&&Hn(t),s};return o._n=!0,o._c=!0,o._d=!0,o}function no(e){const{type:t,vnode:n,proxy:o,withProxy:r,props:s,propsOptions:[i],slots:l,attrs:c,emit:a,render:u,renderCache:f,data:p,setupState:d,ctx:h,inheritAttrs:g}=e;let m,y;const v=Zn(e);try{if(4&n.shapeFlag){const e=r||o;m=Vs(u.call(e,e,f,s,d,p,h)),y=c}else{const e=t;m=Vs(e.length>1?e(s,{attrs:c,slots:l,emit:a}):e(s,null)),y=t.props?c:oo(c)}}catch(t){gs.length=0,hn(t,e,1),m=$s(ds)}let b=m;if(y&&!1!==g){const e=Object.keys(y),{shapeFlag:t}=b;e.length&&7&t&&(i&&e.some(k)&&(y=ro(y,i)),b=Ps(b,y))}return n.dirs&&(b=Ps(b),b.dirs=b.dirs?b.dirs.concat(n.dirs):n.dirs),n.transition&&(b.transition=n.transition),m=b,Zn(v),m}const oo=e=>{let t;for(const n in e)("class"===n||"style"===n||C(n))&&((t||(t={}))[n]=e[n]);return t},ro=(e,t)=>{const n={};for(const o in e)k(o)&&o.slice(9)in t||(n[o]=e[o]);return n};function so(e,t,n){const o=Object.keys(t);if(o.length!==Object.keys(e).length)return!0;for(let r=0;r<o.length;r++){const s=o[r];if(t[s]!==e[s]&&!qn(n,s))return!0}return!1}function io({vnode:e,parent:t},n){for(;t&&t.subTree===e;)(e=t.vnode).el=n,t=t.parent}const lo=e=>e.__isSuspense,co={name:"Suspense",__isSuspense:!0,process(e,t,n,o,r,s,i,l,c,a){null==e?function(e,t,n,o,r,s,i,l,c){const{p:a,o:{createElement:u}}=c,f=u("div"),p=e.suspense=uo(e,r,o,t,f,n,s,i,l,c);a(null,p.pendingBranch=e.ssContent,f,null,o,p,s,i),p.deps>0?(ao(e,"onPending"),ao(e,"onFallback"),a(null,e.ssFallback,t,n,o,null,s,i),ho(p,e.ssFallback)):p.resolve()}(t,n,o,r,s,i,l,c,a):function(e,t,n,o,r,s,i,l,{p:c,um:a,o:{createElement:u}}){const f=t.suspense=e.suspense;f.vnode=t,t.el=e.el;const p=t.ssContent,d=t.ssFallback,{activeBranch:h,pendingBranch:g,isInFallback:m,isHydrating:y}=f;if(g)f.pendingBranch=p,ks(p,g)?(c(g,p,f.hiddenContainer,null,r,f,s,i,l),f.deps<=0?f.resolve():m&&(c(h,d,n,o,r,null,s,i,l),ho(f,d))):(f.pendingId++,y?(f.isHydrating=!1,f.activeBranch=g):a(g,r,f),f.deps=0,f.effects.length=0,f.hiddenContainer=u("div"),m?(c(null,p,f.hiddenContainer,null,r,f,s,i,l),f.deps<=0?f.resolve():(c(h,d,n,o,r,null,s,i,l),ho(f,d))):h&&ks(p,h)?(c(h,p,n,o,r,f,s,i,l),f.resolve(!0)):(c(null,p,f.hiddenContainer,null,r,f,s,i,l),f.deps<=0&&f.resolve()));else if(h&&ks(p,h))c(h,p,n,o,r,f,s,i,l),ho(f,p);else if(ao(t,"onPending"),f.pendingBranch=p,f.pendingId++,c(null,p,f.hiddenContainer,null,r,f,s,i,l),f.deps<=0)f.resolve();else{const{timeout:e,pendingId:t}=f;e>0?setTimeout((()=>{f.pendingId===t&&f.fallback(d)}),e):0===e&&f.fallback(d)}}(e,t,n,o,r,i,l,c,a)},hydrate:function(e,t,n,o,r,s,i,l,c){const a=t.suspense=uo(t,o,n,e.parentNode,document.createElement("div"),null,r,s,i,l,!0),u=c(e,a.pendingBranch=t.ssContent,n,a,s,i);return 0===a.deps&&a.resolve(),u},create:uo,normalize:function(e){const{shapeFlag:t,children:n}=e,o=32&t;e.ssContent=fo(o?n.default:n),e.ssFallback=o?fo(n.fallback):$s(ds)}};function ao(e,t){const n=e.props&&e.props[t];B(n)&&n()}function uo(e,t,n,o,r,s,i,l,c,a,u=!1){const{p:f,m:p,um:d,n:h,o:{parentNode:g,remove:m}}=a,y=ne(e.props&&e.props.timeout),v={vnode:e,parent:t,parentComponent:n,isSVG:i,container:o,hiddenContainer:r,anchor:s,deps:0,pendingId:0,timeout:"number"==typeof y?y:-1,activeBranch:null,pendingBranch:null,isInFallback:!0,isHydrating:u,isUnmounted:!1,effects:[],resolve(e=!1){const{vnode:t,activeBranch:n,pendingBranch:o,pendingId:r,effects:s,parentComponent:i,container:l}=v;if(v.isHydrating)v.isHydrating=!1;else if(!e){const e=n&&o.transition&&"out-in"===o.transition.mode;e&&(n.transition.afterLeave=()=>{r===v.pendingId&&p(o,l,t,0)});let{anchor:t}=v;n&&(t=h(n),d(n,i,v,!0)),e||p(o,l,t,0)}ho(v,o),v.pendingBranch=null,v.isInFallback=!1;let c=v.parent,a=!1;for(;c;){if(c.pendingBranch){c.effects.push(...s),a=!0;break}c=c.parent}a||$n(s),v.effects=[],ao(t,"onResolve")},fallback(e){if(!v.pendingBranch)return;const{vnode:t,activeBranch:n,parentComponent:o,container:r,isSVG:s}=v;ao(t,"onFallback");const i=h(n),a=()=>{v.isInFallback&&(f(null,e,r,i,o,null,s,l,c),ho(v,e))},u=e.transition&&"out-in"===e.transition.mode;u&&(n.transition.afterLeave=a),v.isInFallback=!0,d(n,o,null,!0),u||a()},move(e,t,n){v.activeBranch&&p(v.activeBranch,e,t,n),v.container=e},next:()=>v.activeBranch&&h(v.activeBranch),registerDep(e,t){const n=!!v.pendingBranch;n&&v.deps++;const o=e.vnode.el;e.asyncDep.catch((t=>{hn(t,e,0)})).then((r=>{if(e.isUnmounted||v.isUnmounted||v.pendingId!==e.suspenseId)return;e.asyncResolved=!0;const{vnode:s}=e;ti(e,r,!1),o&&(s.el=o);const l=!o&&e.subTree.el;t(e,s,g(o||e.subTree.el),o?null:h(e.subTree),v,i,c),l&&m(l),io(e,s.el),n&&0==--v.deps&&v.resolve()}))},unmount(e,t){v.isUnmounted=!0,v.activeBranch&&d(v.activeBranch,n,e,t),v.pendingBranch&&d(v.pendingBranch,n,e,t)}};return v}function fo(e){let t;if(B(e)){const n=_s&&e._c;n&&(e._d=!1,ys()),e=e(),n&&(e._d=!0,t=ms,vs())}if(N(e)){const t=function(e){let t;for(let n=0;n<e.length;n++){const o=e[n];if(!Cs(o))return;if(o.type!==ds||"v-if"===o.children){if(t)return;t=o}}return t}(e);e=t}return e=Vs(e),t&&!e.dynamicChildren&&(e.dynamicChildren=t.filter((t=>t!==e))),e}function po(e,t){t&&t.pendingBranch?N(e)?t.effects.push(...e):t.effects.push(e):$n(e)}function ho(e,t){e.activeBranch=t;const{vnode:n,parentComponent:o}=e,r=n.el=t.el;o&&o.subTree===n&&(o.vnode.el=r,io(o,r))}function go(e,t){if(Ks){let n=Ks.provides;const o=Ks.parent&&Ks.parent.provides;o===n&&(n=Ks.provides=Object.create(o)),n[e]=t}}function mo(e,t,n=!1){const o=Ks||Jn;if(o){const r=null==o.parent?o.vnode.appContext&&o.vnode.appContext.provides:o.parent.provides;if(r&&e in r)return r[e];if(arguments.length>1)return n&&B(t)?t.call(o.proxy):t}}function yo(e,t){return So(e,null,t)}function vo(e,t){return So(e,null,{flush:"post"})}function bo(e,t){return So(e,null,{flush:"sync"})}const _o={};function wo(e,t,n){return So(e,t,n)}function So(e,t,{immediate:n,deep:o,flush:r,onTrack:s,onTrigger:i}=_){const l=Ks;let c,a,u=!1,f=!1;if(Pt(e)?(c=()=>e.value,u=kt(e)):Et(e)?(c=()=>e,o=!0):N(e)?(f=!0,u=e.some((e=>Et(e)||kt(e))),c=()=>e.map((e=>Pt(e)?e.value:Et(e)?Co(e):B(e)?pn(e,l,2):void 0))):c=B(e)?t?()=>pn(e,l,2):()=>{if(!l||!l.isUnmounted)return a&&a(),dn(e,l,3,[p])}:S,t&&o){const e=c;c=()=>Co(e())}let p=e=>{a=m.onStop=()=>{pn(e,l,4)}};if(Xs)return p=S,t?n&&dn(t,l,3,[c(),f?[]:void 0,p]):c(),S;let d=f?[]:_o;const h=()=>{if(m.active)if(t){const e=m.run();(o||u||(f?e.some(((e,t)=>X(e,d[t]))):X(e,d)))&&(a&&a(),dn(t,l,3,[e,d===_o?void 0:d,p]),d=e)}else m.run()};let g;h.allowRecurse=!!t,g="sync"===r?h:"post"===r?()=>es(h,l&&l.suspense):()=>function(e){Nn(e,_n,bn,wn)}(h);const m=new _e(c,g);return t?n?h():d=m.run():"post"===r?es(m.run.bind(m),l&&l.suspense):m.run(),()=>{m.stop(),l&&l.scope&&I(l.scope.effects,m)}}function xo(e,t,n){const o=this.proxy,r=M(e)?e.includes(".")?Eo(o,e):()=>o[e]:e.bind(o,o);let s;B(t)?s=t:(s=t.handler,n=t);const i=Ks;qs(this);const l=So(r,s.bind(o),n);return i?qs(i):Js(),l}function Eo(e,t){const n=t.split(".");return()=>{let t=e;for(let e=0;e<n.length&&t;e++)t=t[n[e]];return t}}function Co(e,t){if(!V(e)||e.__v_skip)return e;if((t=t||new Set).has(e))return e;if(t.add(e),Pt(e))Co(e.value,t);else if(N(e))for(let n=0;n<e.length;n++)Co(e[n],t);else if(L(e)||$(e))e.forEach((e=>{Co(e,t)}));else if(D(e))for(const n in e)Co(e[n],t);return e}function ko(){const e={isMounted:!1,isLeaving:!1,isUnmounting:!1,leavingVNodes:new Map};return Zo((()=>{e.isMounted=!0})),er((()=>{e.isUnmounting=!0})),e}const To=[Function,Array],Io={name:"BaseTransition",props:{mode:String,appear:Boolean,persisted:Boolean,onBeforeEnter:To,onEnter:To,onAfterEnter:To,onEnterCancelled:To,onBeforeLeave:To,onLeave:To,onAfterLeave:To,onLeaveCancelled:To,onBeforeAppear:To,onAppear:To,onAfterAppear:To,onAppearCancelled:To},setup(e,{slots:t}){const n=Ys(),o=ko();let r;return()=>{const s=t.default&&Po(t.default(),!0);if(!s||!s.length)return;let i=s[0];if(s.length>1){let e=!1;for(const t of s)if(t.type!==ds){i=t,e=!0;break}}const l=It(e),{mode:c}=l;if(o.isLeaving)return No(i);const a=$o(i);if(!a)return No(i);const u=Ao(a,l,o,n);Lo(a,u);const f=n.subTree,p=f&&$o(f);let d=!1;const{getTransitionKey:h}=a.type;if(h){const e=h();void 0===r?r=e:e!==r&&(r=e,d=!0)}if(p&&p.type!==ds&&(!ks(a,p)||d)){const e=Ao(p,l,o,n);if(Lo(p,e),"out-in"===c)return o.isLeaving=!0,e.afterLeave=()=>{o.isLeaving=!1,n.update()},No(i);"in-out"===c&&a.type!==ds&&(e.delayLeave=(e,t,n)=>{Oo(o,p)[String(p.key)]=p,e._leaveCb=()=>{t(),e._leaveCb=void 0,delete u.delayedLeave},u.delayedLeave=n})}return i}}};function Oo(e,t){const{leavingVNodes:n}=e;let o=n.get(t.type);return o||(o=Object.create(null),n.set(t.type,o)),o}function Ao(e,t,n,o){const{appear:r,mode:s,persisted:i=!1,onBeforeEnter:l,onEnter:c,onAfterEnter:a,onEnterCancelled:u,onBeforeLeave:f,onLeave:p,onAfterLeave:d,onLeaveCancelled:h,onBeforeAppear:g,onAppear:m,onAfterAppear:y,onAppearCancelled:v}=t,b=String(e.key),_=Oo(n,e),w=(e,t)=>{e&&dn(e,o,9,t)},S=(e,t)=>{const n=t[1];w(e,t),N(e)?e.every((e=>e.length<=1))&&n():e.length<=1&&n()},x={mode:s,persisted:i,beforeEnter(t){let o=l;if(!n.isMounted){if(!r)return;o=g||l}t._leaveCb&&t._leaveCb(!0);const s=_[b];s&&ks(e,s)&&s.el._leaveCb&&s.el._leaveCb(),w(o,[t])},enter(e){let t=c,o=a,s=u;if(!n.isMounted){if(!r)return;t=m||c,o=y||a,s=v||u}let i=!1;const l=e._enterCb=t=>{i||(i=!0,w(t?s:o,[e]),x.delayedLeave&&x.delayedLeave(),e._enterCb=void 0)};t?S(t,[e,l]):l()},leave(t,o){const r=String(e.key);if(t._enterCb&&t._enterCb(!0),n.isUnmounting)return o();w(f,[t]);let s=!1;const i=t._leaveCb=n=>{s||(s=!0,o(),w(n?h:d,[t]),t._leaveCb=void 0,_[r]===e&&delete _[r])};_[r]=e,p?S(p,[t,i]):i()},clone:e=>Ao(e,t,n,o)};return x}function No(e){if(Fo(e))return(e=Ps(e)).children=null,e}function $o(e){return Fo(e)?e.children?e.children[0]:void 0:e}function Lo(e,t){6&e.shapeFlag&&e.component?Lo(e.component.subTree,t):128&e.shapeFlag?(e.ssContent.transition=t.clone(e.ssContent),e.ssFallback.transition=t.clone(e.ssFallback)):e.transition=t}function Po(e,t=!1,n){let o=[],r=0;for(let s=0;s<e.length;s++){let i=e[s];const l=null==n?i.key:String(n)+String(null!=i.key?i.key:s);i.type===fs?(128&i.patchFlag&&r++,o=o.concat(Po(i.children,t,l))):(t||i.type!==ds)&&o.push(null!=l?Ps(i,{key:l}):i)}if(r>1)for(let e=0;e<o.length;e++)o[e].patchFlag=-2;return o}function Bo(e){return B(e)?{setup:e,name:e.name}:e}const Mo=e=>!!e.type.__asyncLoader;function Ro(e){B(e)&&(e={loader:e});const{loader:t,loadingComponent:n,errorComponent:o,delay:r=200,timeout:s,suspensible:i=!0,onError:l}=e;let c,a=null,u=0;const f=()=>{let e;return a||(e=a=t().catch((e=>{if(e=e instanceof Error?e:new Error(String(e)),l)return new Promise(((t,n)=>{l(e,(()=>t((u++,a=null,f()))),(()=>n(e)),u+1)}));throw e})).then((t=>e!==a&&a?a:(t&&(t.__esModule||"Module"===t[Symbol.toStringTag])&&(t=t.default),c=t,t))))};return Bo({name:"AsyncComponentWrapper",__asyncLoader:f,get __asyncResolved(){return c},setup(){const e=Ks;if(c)return()=>Vo(c,e);const t=t=>{a=null,hn(t,e,13,!o)};if(i&&e.suspense||Xs)return f().then((t=>()=>Vo(t,e))).catch((e=>(t(e),()=>o?$s(o,{error:e}):null)));const l=Bt(!1),u=Bt(),p=Bt(!!r);return r&&setTimeout((()=>{p.value=!1}),r),null!=s&&setTimeout((()=>{if(!l.value&&!u.value){const e=new Error(`Async component timed out after ${s}ms.`);t(e),u.value=e}}),s),f().then((()=>{l.value=!0,e.parent&&Fo(e.parent.vnode)&&On(e.parent.update)})).catch((e=>{t(e),u.value=e})),()=>l.value&&c?Vo(c,e):u.value&&o?$s(o,{error:u.value}):n&&!p.value?$s(n):void 0}})}function Vo(e,{vnode:{ref:t,props:n,children:o,shapeFlag:r},parent:s}){const i=$s(e,n,o);return i.ref=t,i}const Fo=e=>e.type.__isKeepAlive,Uo={name:"KeepAlive",__isKeepAlive:!0,props:{include:[String,RegExp,Array],exclude:[String,RegExp,Array],max:[String,Number]},setup(e,{slots:t}){const n=Ys(),o=n.ctx;if(!o.renderer)return()=>{const e=t.default&&t.default();return e&&1===e.length?e[0]:e};const r=new Map,s=new Set;let i=null;__VUE_PROD_DEVTOOLS__&&(n.__v_cache=r);const l=n.suspense,{renderer:{p:c,m:a,um:u,o:{createElement:f}}}=o,p=f("div");function d(e){Ko(e),u(e,n,l,!0)}function h(e){r.forEach(((t,n)=>{const o=ci(t.type);!o||e&&e(o)||g(n)}))}function g(e){const t=r.get(e);i&&t.type===i.type?i&&Ko(i):d(t),r.delete(e),s.delete(e)}o.activate=(e,t,n,o,r)=>{const s=e.component;a(e,t,n,0,l),c(s.vnode,e,t,n,s,l,o,e.slotScopeIds,r),es((()=>{s.isDeactivated=!1,s.a&&ee(s.a);const t=e.props&&e.props.onVnodeMounted;t&&Ds(t,s.parent,e)}),l),__VUE_PROD_DEVTOOLS__&&Dn(s)},o.deactivate=e=>{const t=e.component;a(e,p,null,1,l),es((()=>{t.da&&ee(t.da);const n=e.props&&e.props.onVnodeUnmounted;n&&Ds(n,t.parent,e),t.isDeactivated=!0}),l),__VUE_PROD_DEVTOOLS__&&Dn(t)},wo((()=>[e.include,e.exclude]),(([e,t])=>{e&&h((t=>jo(e,t))),t&&h((e=>!jo(t,e)))}),{flush:"post",deep:!0});let m=null;const y=()=>{null!=m&&r.set(m,Yo(n.subTree))};return Zo(y),Xo(y),er((()=>{r.forEach((e=>{const{subTree:t,suspense:o}=n,r=Yo(t);if(e.type!==r.type)d(e);else{Ko(r);const e=r.component.da;e&&es(e,o)}}))})),()=>{if(m=null,!t.default)return null;const n=t.default(),o=n[0];if(n.length>1)return i=null,n;if(!Cs(o)||!(4&o.shapeFlag||128&o.shapeFlag))return i=null,o;let l=Yo(o);const c=l.type,a=ci(Mo(l)?l.type.__asyncResolved||{}:c),{include:u,exclude:f,max:p}=e;if(u&&(!a||!jo(u,a))||f&&a&&jo(f,a))return i=l,o;const d=null==l.key?c:l.key,h=r.get(d);return l.el&&(l=Ps(l),128&o.shapeFlag&&(o.ssContent=l)),m=d,h?(l.el=h.el,l.component=h.component,l.transition&&Lo(l,l.transition),l.shapeFlag|=512,s.delete(d),s.add(d)):(s.add(d),p&&s.size>parseInt(p,10)&&g(s.values().next().value)),l.shapeFlag|=256,i=l,lo(o.type)?o:l}}};function jo(e,t){return N(e)?e.some((e=>jo(e,t))):M(e)?e.split(",").includes(t):!!e.test&&e.test(t)}function Do(e,t){zo(e,"a",t)}function Ho(e,t){zo(e,"da",t)}function zo(e,t,n=Ks){const o=e.__wdc||(e.__wdc=()=>{let t=n;for(;t;){if(t.isDeactivated)return;t=t.parent}return e()});if(qo(t,o,n),n){let e=n.parent;for(;e&&e.parent;)Fo(e.parent.vnode)&&Wo(o,t,n,e),e=e.parent}}function Wo(e,t,n,o){const r=qo(t,e,o,!0);tr((()=>{I(o[t],r)}),n)}function Ko(e){let t=e.shapeFlag;256&t&&(t-=256),512&t&&(t-=512),e.shapeFlag=t}function Yo(e){return 128&e.shapeFlag?e.ssContent:e}function qo(e,t,n=Ks,o=!1){if(n){const r=n[e]||(n[e]=[]),s=t.__weh||(t.__weh=(...o)=>{if(n.isUnmounted)return;ke(),qs(n);const r=dn(t,n,e,o);return Js(),Te(),r});return o?r.unshift(s):r.push(s),s}}const Jo=e=>(t,n=Ks)=>(!Xs||"sp"===e)&&qo(e,t,n),Go=Jo("bm"),Zo=Jo("m"),Qo=Jo("bu"),Xo=Jo("u"),er=Jo("bum"),tr=Jo("um"),nr=Jo("sp"),or=Jo("rtg"),rr=Jo("rtc");function sr(e,t=Ks){qo("ec",e,t)}function ir(e,t){const n=Jn;if(null===n)return e;const o=ii(n)||n.proxy,r=e.dirs||(e.dirs=[]);for(let e=0;e<t.length;e++){let[n,s,i,l=_]=t[e];B(n)&&(n={mounted:n,updated:n}),n.deep&&Co(s),r.push({dir:n,instance:o,value:s,oldValue:void 0,arg:i,modifiers:l})}return e}function lr(e,t,n,o){const r=e.dirs,s=t&&t.dirs;for(let i=0;i<r.length;i++){const l=r[i];s&&(l.oldValue=s[i].value);let c=l.dir[o];c&&(ke(),dn(c,n,8,[e.el,l,e,t]),Te())}}const cr="components";function ar(e,t){return dr(cr,e,!0,t)||e}const ur=Symbol();function fr(e){return M(e)?dr(cr,e,!1)||e:e||ur}function pr(e){return dr("directives",e)}function dr(e,t,n=!0,o=!1){const r=Jn||Ks;if(r){const n=r.type;if(e===cr){const e=ci(n,!1);if(e&&(e===t||e===q(t)||e===Z(q(t))))return n}const s=hr(r[e]||n[e],t)||hr(r.appContext[e],t);return!s&&o?n:s}}function hr(e,t){return e&&(e[t]||e[q(t)]||e[Z(q(t))])}function gr(e,t,n,o){let r;const s=n&&n[o];if(N(e)||M(e)){r=new Array(e.length);for(let n=0,o=e.length;n<o;n++)r[n]=t(e[n],n,void 0,s&&s[n])}else if("number"==typeof e){r=new Array(e);for(let n=0;n<e;n++)r[n]=t(n+1,n,void 0,s&&s[n])}else if(V(e))if(e[Symbol.iterator])r=Array.from(e,((e,n)=>t(e,n,void 0,s&&s[n])));else{const n=Object.keys(e);r=new Array(n.length);for(let o=0,i=n.length;o<i;o++){const i=n[o];r[o]=t(e[i],i,o,s&&s[o])}}else r=[];return n&&(n[o]=r),r}function mr(e,t){for(let n=0;n<t.length;n++){const o=t[n];if(N(o))for(let t=0;t<o.length;t++)e[o[t].name]=o[t].fn;else o&&(e[o.name]=o.fn)}return e}function yr(e,t,n={},o,r){if(Jn.isCE||Jn.parent&&Mo(Jn.parent)&&Jn.parent.isCE)return $s("slot","default"===t?null:{name:t},o&&o());let s=e[t];s&&s._c&&(s._d=!1),ys();const i=s&&vr(s(n)),l=Es(fs,{key:n.key||`_${t}`},i||(o?o():[]),i&&1===e._?64:-2);return!r&&l.scopeId&&(l.slotScopeIds=[l.scopeId+"-s"]),s&&s._c&&(s._d=!0),l}function vr(e){return e.some((e=>!Cs(e)||e.type!==ds&&!(e.type===fs&&!vr(e.children))))?e:null}function br(e){const t={};for(const n in e)t[Q(n)]=e[n];return t}const _r=e=>e?Gs(e)?ii(e)||e.proxy:_r(e.parent):null,wr=T(Object.create(null),{$:e=>e,$el:e=>e.vnode.el,$data:e=>e.data,$props:e=>e.props,$attrs:e=>e.attrs,$slots:e=>e.slots,$refs:e=>e.refs,$parent:e=>_r(e.parent),$root:e=>_r(e.root),$emit:e=>e.emit,$options:e=>__VUE_OPTIONS_API__?Tr(e):e.type,$forceUpdate:e=>e.f||(e.f=()=>On(e.update)),$nextTick:e=>e.n||(e.n=In.bind(e.proxy)),$watch:e=>__VUE_OPTIONS_API__?xo.bind(e):S}),Sr={get({_:e},t){const{ctx:n,setupState:o,data:r,props:s,accessCache:i,type:l,appContext:c}=e;let a;if("$"!==t[0]){const l=i[t];if(void 0!==l)switch(l){case 1:return o[t];case 2:return r[t];case 4:return n[t];case 3:return s[t]}else{if(o!==_&&A(o,t))return i[t]=1,o[t];if(r!==_&&A(r,t))return i[t]=2,r[t];if((a=e.propsOptions[0])&&A(a,t))return i[t]=3,s[t];if(n!==_&&A(n,t))return i[t]=4,n[t];__VUE_OPTIONS_API__&&!Er||(i[t]=0)}}const u=wr[t];let f,p;return u?("$attrs"===t&&Ie(e,0,t),u(e)):(f=l.__cssModules)&&(f=f[t])?f:n!==_&&A(n,t)?(i[t]=4,n[t]):(p=c.config.globalProperties,A(p,t)?p[t]:void 0)},set({_:e},t,n){const{data:o,setupState:r,ctx:s}=e;return r!==_&&A(r,t)?(r[t]=n,!0):o!==_&&A(o,t)?(o[t]=n,!0):!(A(e.props,t)||"$"===t[0]&&t.slice(1)in e||(s[t]=n,0))},has({_:{data:e,setupState:t,accessCache:n,ctx:o,appContext:r,propsOptions:s}},i){let l;return!!n[i]||e!==_&&A(e,i)||t!==_&&A(t,i)||(l=s[0])&&A(l,i)||A(o,i)||A(wr,i)||A(r.config.globalProperties,i)},defineProperty(e,t,n){return null!=n.get?e._.accessCache[t]=0:A(n,"value")&&this.set(e,t,n.value,null),Reflect.defineProperty(e,t,n)}},xr=T({},Sr,{get(e,t){if(t!==Symbol.unscopables)return Sr.get(e,t,e)},has:(e,t)=>"_"!==t[0]&&!r(t)});let Er=!0;function Cr(e,t,n){dn(N(e)?e.map((e=>e.bind(t.proxy))):e.bind(t.proxy),t,n)}function kr(e,t,n,o){const r=o.includes(".")?Eo(n,o):()=>n[o];if(M(e)){const n=t[e];B(n)&&wo(r,n)}else if(B(e))wo(r,e.bind(n));else if(V(e))if(N(e))e.forEach((e=>kr(e,t,n,o)));else{const o=B(e.handler)?e.handler.bind(n):t[e.handler];B(o)&&wo(r,o,e)}}function Tr(e){const t=e.type,{mixins:n,extends:o}=t,{mixins:r,optionsCache:s,config:{optionMergeStrategies:i}}=e.appContext,l=s.get(t);let c;return l?c=l:r.length||n||o?(c={},r.length&&r.forEach((e=>Ir(c,e,i,!0))),Ir(c,t,i)):c=t,s.set(t,c),c}function Ir(e,t,n,o=!1){const{mixins:r,extends:s}=t;s&&Ir(e,s,n,!0),r&&r.forEach((t=>Ir(e,t,n,!0)));for(const r in t)if(o&&"expose"===r);else{const o=Or[r]||n&&n[r];e[r]=o?o(e[r],t[r]):t[r]}return e}const Or={data:Ar,props:Lr,emits:Lr,methods:Lr,computed:Lr,beforeCreate:$r,created:$r,beforeMount:$r,mounted:$r,beforeUpdate:$r,updated:$r,beforeDestroy:$r,beforeUnmount:$r,destroyed:$r,unmounted:$r,activated:$r,deactivated:$r,errorCaptured:$r,serverPrefetch:$r,components:Lr,directives:Lr,watch:function(e,t){if(!e)return t;if(!t)return e;const n=T(Object.create(null),e);for(const o in t)n[o]=$r(e[o],t[o]);return n},provide:Ar,inject:function(e,t){return Lr(Nr(e),Nr(t))}};function Ar(e,t){return t?e?function(){return T(B(e)?e.call(this,this):e,B(t)?t.call(this,this):t)}:t:e}function Nr(e){if(N(e)){const t={};for(let n=0;n<e.length;n++)t[e[n]]=e[n];return t}return e}function $r(e,t){return e?[...new Set([].concat(e,t))]:t}function Lr(e,t){return e?T(T(Object.create(null),e),t):t}function Pr(e,t,n,o){const[r,s]=e.propsOptions;let i,l=!1;if(t)for(let c in t){if(z(c))continue;const a=t[c];let u;r&&A(r,u=q(c))?s&&s.includes(u)?(i||(i={}))[u]=a:n[u]=a:qn(e.emitsOptions,c)||c in o&&a===o[c]||(o[c]=a,l=!0)}if(s){const t=It(n),o=i||_;for(let i=0;i<s.length;i++){const l=s[i];n[l]=Br(r,t,l,o[l],e,!A(o,l))}}return l}function Br(e,t,n,o,r,s){const i=e[n];if(null!=i){const e=A(i,"default");if(e&&void 0===o){const e=i.default;if(i.type!==Function&&B(e)){const{propsDefaults:s}=r;n in s?o=s[n]:(qs(r),o=s[n]=e.call(null,t),Js())}else o=e}i[0]&&(s&&!e?o=!1:!i[1]||""!==o&&o!==G(n)||(o=!0))}return o}function Mr(e,t,n=!1){const o=t.propsCache,r=o.get(e);if(r)return r;const s=e.props,i={},l=[];let c=!1;if(__VUE_OPTIONS_API__&&!B(e)){const o=e=>{c=!0;const[n,o]=Mr(e,t,!0);T(i,n),o&&l.push(...o)};!n&&t.mixins.length&&t.mixins.forEach(o),e.extends&&o(e.extends),e.mixins&&e.mixins.forEach(o)}if(!s&&!c)return o.set(e,w),w;if(N(s))for(let e=0;e<s.length;e++){const t=q(s[e]);Rr(t)&&(i[t]=_)}else if(s)for(const e in s){const t=q(e);if(Rr(t)){const n=s[e],o=i[t]=N(n)||B(n)?{type:n}:n;if(o){const e=Ur(Boolean,o.type),n=Ur(String,o.type);o[0]=e>-1,o[1]=n<0||e<n,(e>-1||A(o,"default"))&&l.push(t)}}}const a=[i,l];return o.set(e,a),a}function Rr(e){return"$"!==e[0]}function Vr(e){const t=e&&e.toString().match(/^\s*function (\w+)/);return t?t[1]:null===e?"null":""}function Fr(e,t){return Vr(e)===Vr(t)}function Ur(e,t){return N(t)?t.findIndex((t=>Fr(t,e))):B(t)&&Fr(t,e)?0:-1}const jr=e=>"_"===e[0]||"$stable"===e,Dr=e=>N(e)?e.map(Vs):[Vs(e)],Hr=(e,t,n)=>{if(t._n)return t;const o=to(((...e)=>Dr(t(...e))),n);return o._c=!1,o},zr=(e,t,n)=>{const o=e._ctx;for(const n in e){if(jr(n))continue;const r=e[n];if(B(r))t[n]=Hr(0,r,o);else if(null!=r){const e=Dr(r);t[n]=()=>e}}},Wr=(e,t)=>{const n=Dr(t);e.slots.default=()=>n};function Kr(){return{app:null,config:{isNativeTag:x,performance:!1,globalProperties:{},optionMergeStrategies:{},errorHandler:void 0,warnHandler:void 0,compilerOptions:{}},mixins:[],components:{},directives:{},provides:Object.create(null),optionsCache:new WeakMap,propsCache:new WeakMap,emitsCache:new WeakMap}}let Yr=0;function qr(e,t){return function(n,o=null){B(n)||(n=Object.assign({},n)),null==o||V(o)||(o=null);const r=Kr(),s=new Set;let i=!1;const l=r.app={_uid:Yr++,_component:n,_props:o,_container:null,_context:r,_instance:null,version:Ti,get config(){return r.config},set config(e){},use:(e,...t)=>(s.has(e)||(e&&B(e.install)?(s.add(e),e.install(l,...t)):B(e)&&(s.add(e),e(l,...t))),l),mixin:e=>(__VUE_OPTIONS_API__&&(r.mixins.includes(e)||r.mixins.push(e)),l),component:(e,t)=>t?(r.components[e]=t,l):r.components[e],directive:(e,t)=>t?(r.directives[e]=t,l):r.directives[e],mount(s,c,a){if(!i){const u=$s(n,o);return u.appContext=r,c&&t?t(u,s):e(u,s,a),i=!0,l._container=s,s.__vue_app__=l,__VUE_PROD_DEVTOOLS__&&(l._instance=u.component,function(e,t){Un("app:init",e,t,{Fragment:fs,Text:ps,Comment:ds,Static:hs})}(l,Ti)),ii(u.component)||u.component.proxy}},unmount(){i&&(e(null,l._container),__VUE_PROD_DEVTOOLS__&&(l._instance=null,function(e){Un("app:unmount",e)}(l)),delete l._container.__vue_app__)},provide:(e,t)=>(r.provides[e]=t,l)};return l}}function Jr(e,t,n,o,r=!1){if(N(e))return void e.forEach(((e,s)=>Jr(e,t&&(N(t)?t[s]:t),n,o,r)));if(Mo(o)&&!r)return;const s=4&o.shapeFlag?ii(o.component)||o.component.proxy:o.el,i=r?null:s,{i:l,r:c}=e,a=t&&t.r,u=l.refs===_?l.refs={}:l.refs,f=l.setupState;if(null!=a&&a!==c&&(M(a)?(u[a]=null,A(f,a)&&(f[a]=null)):Pt(a)&&(a.value=null)),B(c))pn(c,l,12,[i,u]);else{const t=M(c),o=Pt(c);if(t||o){const l=()=>{if(e.f){const n=t?u[c]:c.value;r?N(n)&&I(n,s):N(n)?n.includes(s)||n.push(s):t?(u[c]=[s],A(f,c)&&(f[c]=u[c])):(c.value=[s],e.k&&(u[e.k]=c.value))}else t?(u[c]=i,A(f,c)&&(f[c]=i)):o&&(c.value=i,e.k&&(u[e.k]=i))};i?(l.id=-1,es(l,n)):l()}}}let Gr=!1;const Zr=e=>/svg/.test(e.namespaceURI)&&"foreignObject"!==e.tagName,Qr=e=>8===e.nodeType;function Xr(e){const{mt:t,p:n,o:{patchProp:o,createText:r,nextSibling:s,parentNode:i,remove:l,insert:c,createComment:a}}=e,u=(n,o,l,a,m,y=!1)=>{const v=Qr(n)&&"["===n.data,b=()=>h(n,o,l,a,m,v),{type:_,ref:w,shapeFlag:S,patchFlag:x}=o,E=n.nodeType;o.el=n,-2===x&&(y=!1,o.dynamicChildren=null);let C=null;switch(_){case ps:3!==E?""===o.children?(c(o.el=r(""),i(n),n),C=n):C=b():(n.data!==o.children&&(Gr=!0,n.data=o.children),C=s(n));break;case ds:C=8!==E||v?b():s(n);break;case hs:if(1===E||3===E){C=n;const e=!o.children.length;for(let t=0;t<o.staticCount;t++)e&&(o.children+=1===C.nodeType?C.outerHTML:C.data),t===o.staticCount-1&&(o.anchor=C),C=s(C);return C}C=b();break;case fs:C=v?d(n,o,l,a,m,y):b();break;default:if(1&S)C=1!==E||o.type.toLowerCase()!==n.tagName.toLowerCase()?b():f(n,o,l,a,m,y);else if(6&S){o.slotScopeIds=m;const e=i(n);if(t(o,e,null,l,a,Zr(e),y),C=v?g(n):s(n),C&&Qr(C)&&"teleport end"===C.data&&(C=s(C)),Mo(o)){let t;v?(t=$s(fs),t.anchor=C?C.previousSibling:e.lastChild):t=3===n.nodeType?Bs(""):$s("div"),t.el=n,o.component.subTree=t}}else 64&S?C=8!==E?b():o.type.hydrate(n,o,l,a,m,y,e,p):128&S&&(C=o.type.hydrate(n,o,l,a,Zr(i(n)),m,y,e,u))}return null!=w&&Jr(w,null,a,o),C},f=(e,t,n,r,s,i)=>{i=i||!!t.dynamicChildren;const{type:c,props:a,patchFlag:u,shapeFlag:f,dirs:d}=t,h="input"===c&&d||"option"===c;if(h||-1!==u){if(d&&lr(t,null,n,"created"),a)if(h||!i||48&u)for(const t in a)(h&&t.endsWith("value")||C(t)&&!z(t))&&o(e,t,null,a[t],!1,void 0,n);else a.onClick&&o(e,"onClick",null,a.onClick,!1,void 0,n);let c;if((c=a&&a.onVnodeBeforeMount)&&Ds(c,n,t),d&&lr(t,null,n,"beforeMount"),((c=a&&a.onVnodeMounted)||d)&&po((()=>{c&&Ds(c,n,t),d&&lr(t,null,n,"mounted")}),r),16&f&&(!a||!a.innerHTML&&!a.textContent)){let o=p(e.firstChild,t,e,n,r,s,i);for(;o;){Gr=!0;const e=o;o=o.nextSibling,l(e)}}else 8&f&&e.textContent!==t.children&&(Gr=!0,e.textContent=t.children)}return e.nextSibling},p=(e,t,o,r,s,i,l)=>{l=l||!!t.dynamicChildren;const c=t.children,a=c.length;for(let t=0;t<a;t++){const a=l?c[t]:c[t]=Vs(c[t]);if(e)e=u(e,a,r,s,i,l);else{if(a.type===ps&&!a.children)continue;Gr=!0,n(null,a,o,null,r,s,Zr(o),i)}}return e},d=(e,t,n,o,r,l)=>{const{slotScopeIds:u}=t;u&&(r=r?r.concat(u):u);const f=i(e),d=p(s(e),t,f,n,o,r,l);return d&&Qr(d)&&"]"===d.data?s(t.anchor=d):(Gr=!0,c(t.anchor=a("]"),f,d),d)},h=(e,t,o,r,c,a)=>{if(Gr=!0,t.el=null,a){const t=g(e);for(;;){const n=s(e);if(!n||n===t)break;l(n)}}const u=s(e),f=i(e);return l(e),n(null,t,f,u,o,r,Zr(f),c),u},g=e=>{let t=0;for(;e;)if((e=s(e))&&Qr(e)&&("["===e.data&&t++,"]"===e.data)){if(0===t)return s(e);t--}return e};return[(e,t)=>{if(!t.hasChildNodes())return n(null,e,t),Pn(),void(t._vnode=e);Gr=!1,u(t.firstChild,e,null,null,null),Pn(),t._vnode=e,Gr&&console.error("Hydration completed but contains mismatches.")},u]}const es=po;function ts(e){return os(e)}function ns(e){return os(e,Xr)}function os(e,t){"boolean"!=typeof __VUE_OPTIONS_API__&&(re().__VUE_OPTIONS_API__=!0),"boolean"!=typeof __VUE_PROD_DEVTOOLS__&&(re().__VUE_PROD_DEVTOOLS__=!1);const n=re();n.__VUE__=!0,__VUE_PROD_DEVTOOLS__&&jn(n.__VUE_DEVTOOLS_GLOBAL_HOOK__,n);const{insert:o,remove:r,patchProp:s,createElement:i,createText:l,createComment:c,setText:a,setElementText:u,parentNode:f,nextSibling:p,setScopeId:d=S,cloneNode:h,insertStaticContent:g}=e,m=(e,t,n,o=null,r=null,s=null,i=!1,l=null,c=!!t.dynamicChildren)=>{if(e===t)return;e&&!ks(e,t)&&(o=J(e),D(e,r,s,!0),e=null),-2===t.patchFlag&&(c=!1,t.dynamicChildren=null);const{type:a,ref:u,shapeFlag:f}=t;switch(a){case ps:y(e,t,n,o);break;case ds:v(e,t,n,o);break;case hs:null==e&&b(t,n,o,i);break;case fs:$(e,t,n,o,r,s,i,l,c);break;default:1&f?x(e,t,n,o,r,s,i,l,c):6&f?L(e,t,n,o,r,s,i,l,c):(64&f||128&f)&&a.process(e,t,n,o,r,s,i,l,c,Q)}null!=u&&r&&Jr(u,e&&e.ref,s,t||e,!t)},y=(e,t,n,r)=>{if(null==e)o(t.el=l(t.children),n,r);else{const n=t.el=e.el;t.children!==e.children&&a(n,t.children)}},v=(e,t,n,r)=>{null==e?o(t.el=c(t.children||""),n,r):t.el=e.el},b=(e,t,n,o)=>{[e.el,e.anchor]=g(e.children,t,n,o,e.el,e.anchor)},x=(e,t,n,o,r,s,i,l,c)=>{i=i||"svg"===t.type,null==e?E(t,n,o,r,s,i,l,c):I(e,t,r,s,i,l,c)},E=(e,t,n,r,l,c,a,f)=>{let p,d;const{type:g,props:m,shapeFlag:y,transition:v,patchFlag:b,dirs:_}=e;if(e.el&&void 0!==h&&-1===b)p=e.el=h(e.el);else{if(p=e.el=i(e.type,c,m&&m.is,m),8&y?u(p,e.children):16&y&&k(e.children,p,null,r,l,c&&"foreignObject"!==g,a,f),_&&lr(e,null,r,"created"),m){for(const t in m)"value"===t||z(t)||s(p,t,null,m[t],c,e.children,r,l,Y);"value"in m&&s(p,"value",null,m.value),(d=m.onVnodeBeforeMount)&&Ds(d,r,e)}C(p,e,e.scopeId,a,r)}__VUE_PROD_DEVTOOLS__&&(Object.defineProperty(p,"__vnode",{value:e,enumerable:!1}),Object.defineProperty(p,"__vueParentComponent",{value:r,enumerable:!1})),_&&lr(e,null,r,"beforeMount");const w=(!l||l&&!l.pendingBranch)&&v&&!v.persisted;w&&v.beforeEnter(p),o(p,t,n),((d=m&&m.onVnodeMounted)||w||_)&&es((()=>{d&&Ds(d,r,e),w&&v.enter(p),_&&lr(e,null,r,"mounted")}),l)},C=(e,t,n,o,r)=>{if(n&&d(e,n),o)for(let t=0;t<o.length;t++)d(e,o[t]);if(r&&t===r.subTree){const t=r.vnode;C(e,t,t.scopeId,t.slotScopeIds,r.parent)}},k=(e,t,n,o,r,s,i,l,c=0)=>{for(let a=c;a<e.length;a++){const c=e[a]=l?Fs(e[a]):Vs(e[a]);m(null,c,t,n,o,r,s,i,l)}},I=(e,t,n,o,r,i,l)=>{const c=t.el=e.el;let{patchFlag:a,dynamicChildren:f,dirs:p}=t;a|=16&e.patchFlag;const d=e.props||_,h=t.props||_;let g;n&&rs(n,!1),(g=h.onVnodeBeforeUpdate)&&Ds(g,n,t,e),p&&lr(t,e,n,"beforeUpdate"),n&&rs(n,!0);const m=r&&"foreignObject"!==t.type;if(f?O(e.dynamicChildren,f,c,n,o,m,i):l||V(e,t,c,null,n,o,m,i,!1),a>0){if(16&a)N(c,t,d,h,n,o,r);else if(2&a&&d.class!==h.class&&s(c,"class",null,h.class,r),4&a&&s(c,"style",d.style,h.style,r),8&a){const i=t.dynamicProps;for(let t=0;t<i.length;t++){const l=i[t],a=d[l],u=h[l];u===a&&"value"!==l||s(c,l,a,u,r,e.children,n,o,Y)}}1&a&&e.children!==t.children&&u(c,t.children)}else l||null!=f||N(c,t,d,h,n,o,r);((g=h.onVnodeUpdated)||p)&&es((()=>{g&&Ds(g,n,t,e),p&&lr(t,e,n,"updated")}),o)},O=(e,t,n,o,r,s,i)=>{for(let l=0;l<t.length;l++){const c=e[l],a=t[l],u=c.el&&(c.type===fs||!ks(c,a)||70&c.shapeFlag)?f(c.el):n;m(c,a,u,null,o,r,s,i,!0)}},N=(e,t,n,o,r,i,l)=>{if(n!==o){for(const c in o){if(z(c))continue;const a=o[c],u=n[c];a!==u&&"value"!==c&&s(e,c,u,a,l,t.children,r,i,Y)}if(n!==_)for(const c in n)z(c)||c in o||s(e,c,n[c],null,l,t.children,r,i,Y);"value"in o&&s(e,"value",n.value,o.value)}},$=(e,t,n,r,s,i,c,a,u)=>{const f=t.el=e?e.el:l(""),p=t.anchor=e?e.anchor:l("");let{patchFlag:d,dynamicChildren:h,slotScopeIds:g}=t;g&&(a=a?a.concat(g):g),null==e?(o(f,n,r),o(p,n,r),k(t.children,n,p,s,i,c,a,u)):d>0&&64&d&&h&&e.dynamicChildren?(O(e.dynamicChildren,h,n,s,i,c,a),(null!=t.key||s&&t===s.subTree)&&ss(e,t,!0)):V(e,t,n,p,s,i,c,a,u)},L=(e,t,n,o,r,s,i,l,c)=>{t.slotScopeIds=l,null==e?512&t.shapeFlag?r.ctx.activate(t,n,o,i,c):P(t,n,o,r,s,i,c):B(e,t,c)},P=(e,t,n,o,r,s,i)=>{const l=e.component=Ws(e,o,r);if(Fo(e)&&(l.ctx.renderer=Q),ei(l),l.asyncDep){if(r&&r.registerDep(l,M),!e.el){const e=l.subTree=$s(ds);v(null,e,t,n)}}else M(l,e,t,n,r,s,i)},B=(e,t,n)=>{const o=t.component=e.component;if(function(e,t,n){const{props:o,children:r,component:s}=e,{props:i,children:l,patchFlag:c}=t,a=s.emitsOptions;if(t.dirs||t.transition)return!0;if(!(n&&c>=0))return!(!r&&!l||l&&l.$stable)||o!==i&&(o?!i||so(o,i,a):!!i);if(1024&c)return!0;if(16&c)return o?so(o,i,a):!!i;if(8&c){const e=t.dynamicProps;for(let t=0;t<e.length;t++){const n=e[t];if(i[n]!==o[n]&&!qn(a,n))return!0}}return!1}(e,t,n)){if(o.asyncDep&&!o.asyncResolved)return void R(o,t,n);o.next=t,function(e){const t=yn.indexOf(e);t>vn&&yn.splice(t,1)}(o.update),o.update()}else t.el=e.el,o.vnode=t},M=(e,t,n,o,r,s,i)=>{const l=e.effect=new _e((()=>{if(e.isMounted){let t,{next:n,bu:o,u:l,parent:c,vnode:a}=e,u=n;rs(e,!1),n?(n.el=a.el,R(e,n,i)):n=a,o&&ee(o),(t=n.props&&n.props.onVnodeBeforeUpdate)&&Ds(t,c,n,a),rs(e,!0);const p=no(e),d=e.subTree;e.subTree=p,m(d,p,f(d.el),J(d),e,r,s),n.el=p.el,null===u&&io(e,p.el),l&&es(l,r),(t=n.props&&n.props.onVnodeUpdated)&&es((()=>Ds(t,c,n,a)),r),__VUE_PROD_DEVTOOLS__&&Hn(e)}else{let i;const{el:l,props:c}=t,{bm:a,m:u,parent:f}=e,p=Mo(t);if(rs(e,!1),a&&ee(a),!p&&(i=c&&c.onVnodeBeforeMount)&&Ds(i,f,t),rs(e,!0),l&&te){const n=()=>{e.subTree=no(e),te(l,e.subTree,e,r,null)};p?t.type.__asyncLoader().then((()=>!e.isUnmounted&&n())):n()}else{const i=e.subTree=no(e);m(null,i,n,o,e,r,s),t.el=i.el}if(u&&es(u,r),!p&&(i=c&&c.onVnodeMounted)){const e=t;es((()=>Ds(i,f,e)),r)}(256&t.shapeFlag||f&&Mo(f.vnode)&&256&f.vnode.shapeFlag)&&e.a&&es(e.a,r),e.isMounted=!0,__VUE_PROD_DEVTOOLS__&&Dn(e),t=n=o=null}}),(()=>On(c)),e.scope),c=e.update=()=>l.run();c.id=e.uid,rs(e,!0),c()},R=(e,t,n)=>{t.component=e;const o=e.vnode.props;e.vnode=t,e.next=null,function(e,t,n,o){const{props:r,attrs:s,vnode:{patchFlag:i}}=e,l=It(r),[c]=e.propsOptions;let a=!1;if(!(o||i>0)||16&i){let o;Pr(e,t,r,s)&&(a=!0);for(const s in l)t&&(A(t,s)||(o=G(s))!==s&&A(t,o))||(c?!n||void 0===n[s]&&void 0===n[o]||(r[s]=Br(c,l,s,void 0,e,!0)):delete r[s]);if(s!==l)for(const e in s)t&&A(t,e)||(delete s[e],a=!0)}else if(8&i){const n=e.vnode.dynamicProps;for(let o=0;o<n.length;o++){let i=n[o];if(qn(e.emitsOptions,i))continue;const u=t[i];if(c)if(A(s,i))u!==s[i]&&(s[i]=u,a=!0);else{const t=q(i);r[t]=Br(c,l,t,u,e,!1)}else u!==s[i]&&(s[i]=u,a=!0)}}a&&Ae(e,"set","$attrs")}(e,t.props,o,n),((e,t,n)=>{const{vnode:o,slots:r}=e;let s=!0,i=_;if(32&o.shapeFlag){const e=t._;e?n&&1===e?s=!1:(T(r,t),n||1!==e||delete r._):(s=!t.$stable,zr(t,r)),i=t}else t&&(Wr(e,t),i={default:1});if(s)for(const e in r)jr(e)||e in i||delete r[e]})(e,t.children,n),ke(),Ln(void 0,e.update),Te()},V=(e,t,n,o,r,s,i,l,c=!1)=>{const a=e&&e.children,f=e?e.shapeFlag:0,p=t.children,{patchFlag:d,shapeFlag:h}=t;if(d>0){if(128&d)return void U(a,p,n,o,r,s,i,l,c);if(256&d)return void F(a,p,n,o,r,s,i,l,c)}8&h?(16&f&&Y(a,r,s),p!==a&&u(n,p)):16&f?16&h?U(a,p,n,o,r,s,i,l,c):Y(a,r,s,!0):(8&f&&u(n,""),16&h&&k(p,n,o,r,s,i,l,c))},F=(e,t,n,o,r,s,i,l,c)=>{t=t||w;const a=(e=e||w).length,u=t.length,f=Math.min(a,u);let p;for(p=0;p<f;p++){const o=t[p]=c?Fs(t[p]):Vs(t[p]);m(e[p],o,n,null,r,s,i,l,c)}a>u?Y(e,r,s,!0,!1,f):k(t,n,o,r,s,i,l,c,f)},U=(e,t,n,o,r,s,i,l,c)=>{let a=0;const u=t.length;let f=e.length-1,p=u-1;for(;a<=f&&a<=p;){const o=e[a],u=t[a]=c?Fs(t[a]):Vs(t[a]);if(!ks(o,u))break;m(o,u,n,null,r,s,i,l,c),a++}for(;a<=f&&a<=p;){const o=e[f],a=t[p]=c?Fs(t[p]):Vs(t[p]);if(!ks(o,a))break;m(o,a,n,null,r,s,i,l,c),f--,p--}if(a>f){if(a<=p){const e=p+1,f=e<u?t[e].el:o;for(;a<=p;)m(null,t[a]=c?Fs(t[a]):Vs(t[a]),n,f,r,s,i,l,c),a++}}else if(a>p)for(;a<=f;)D(e[a],r,s,!0),a++;else{const d=a,h=a,g=new Map;for(a=h;a<=p;a++){const e=t[a]=c?Fs(t[a]):Vs(t[a]);null!=e.key&&g.set(e.key,a)}let y,v=0;const b=p-h+1;let _=!1,S=0;const x=new Array(b);for(a=0;a<b;a++)x[a]=0;for(a=d;a<=f;a++){const o=e[a];if(v>=b){D(o,r,s,!0);continue}let u;if(null!=o.key)u=g.get(o.key);else for(y=h;y<=p;y++)if(0===x[y-h]&&ks(o,t[y])){u=y;break}void 0===u?D(o,r,s,!0):(x[u-h]=a+1,u>=S?S=u:_=!0,m(o,t[u],n,null,r,s,i,l,c),v++)}const E=_?function(e){const t=e.slice(),n=[0];let o,r,s,i,l;const c=e.length;for(o=0;o<c;o++){const c=e[o];if(0!==c){if(r=n[n.length-1],e[r]<c){t[o]=r,n.push(o);continue}for(s=0,i=n.length-1;s<i;)l=s+i>>1,e[n[l]]<c?s=l+1:i=l;c<e[n[s]]&&(s>0&&(t[o]=n[s-1]),n[s]=o)}}for(s=n.length,i=n[s-1];s-- >0;)n[s]=i,i=t[i];return n}(x):w;for(y=E.length-1,a=b-1;a>=0;a--){const e=h+a,f=t[e],p=e+1<u?t[e+1].el:o;0===x[a]?m(null,f,n,p,r,s,i,l,c):_&&(y<0||a!==E[y]?j(f,n,p,2):y--)}}},j=(e,t,n,r,s=null)=>{const{el:i,type:l,transition:c,children:a,shapeFlag:u}=e;if(6&u)j(e.component.subTree,t,n,r);else if(128&u)e.suspense.move(t,n,r);else if(64&u)l.move(e,t,n,Q);else if(l!==fs)if(l!==hs)if(2!==r&&1&u&&c)if(0===r)c.beforeEnter(i),o(i,t,n),es((()=>c.enter(i)),s);else{const{leave:e,delayLeave:r,afterLeave:s}=c,l=()=>o(i,t,n),a=()=>{e(i,(()=>{l(),s&&s()}))};r?r(i,l,a):a()}else o(i,t,n);else(({el:e,anchor:t},n,r)=>{let s;for(;e&&e!==t;)s=p(e),o(e,n,r),e=s;o(t,n,r)})(e,t,n);else{o(i,t,n);for(let e=0;e<a.length;e++)j(a[e],t,n,r);o(e.anchor,t,n)}},D=(e,t,n,o=!1,r=!1)=>{const{type:s,props:i,ref:l,children:c,dynamicChildren:a,shapeFlag:u,patchFlag:f,dirs:p}=e;if(null!=l&&Jr(l,null,n,e,!0),256&u)return void t.ctx.deactivate(e);const d=1&u&&p,h=!Mo(e);let g;if(h&&(g=i&&i.onVnodeBeforeUnmount)&&Ds(g,t,e),6&u)K(e.component,n,o);else{if(128&u)return void e.suspense.unmount(n,o);d&&lr(e,null,t,"beforeUnmount"),64&u?e.type.remove(e,t,n,r,Q,o):a&&(s!==fs||f>0&&64&f)?Y(a,t,n,!1,!0):(s===fs&&384&f||!r&&16&u)&&Y(c,t,n),o&&H(e)}(h&&(g=i&&i.onVnodeUnmounted)||d)&&es((()=>{g&&Ds(g,t,e),d&&lr(e,null,t,"unmounted")}),n)},H=e=>{const{type:t,el:n,anchor:o,transition:s}=e;if(t===fs)return void W(n,o);if(t===hs)return void(({el:e,anchor:t})=>{let n;for(;e&&e!==t;)n=p(e),r(e),e=n;r(t)})(e);const i=()=>{r(n),s&&!s.persisted&&s.afterLeave&&s.afterLeave()};if(1&e.shapeFlag&&s&&!s.persisted){const{leave:t,delayLeave:o}=s,r=()=>t(n,i);o?o(e.el,i,r):r()}else i()},W=(e,t)=>{let n;for(;e!==t;)n=p(e),r(e),e=n;r(t)},K=(e,t,n)=>{const{bum:o,scope:r,update:s,subTree:i,um:l}=e;o&&ee(o),r.stop(),s&&(s.active=!1,D(i,e,t,n)),l&&es(l,t),es((()=>{e.isUnmounted=!0}),t),t&&t.pendingBranch&&!t.isUnmounted&&e.asyncDep&&!e.asyncResolved&&e.suspenseId===t.pendingId&&(t.deps--,0===t.deps&&t.resolve()),__VUE_PROD_DEVTOOLS__&&zn(e)},Y=(e,t,n,o=!1,r=!1,s=0)=>{for(let i=s;i<e.length;i++)D(e[i],t,n,o,r)},J=e=>6&e.shapeFlag?J(e.component.subTree):128&e.shapeFlag?e.suspense.next():p(e.anchor||e.el),Z=(e,t,n)=>{null==e?t._vnode&&D(t._vnode,null,null,!0):m(t._vnode||null,e,t,null,null,null,n),Pn(),t._vnode=e},Q={p:m,um:D,m:j,r:H,mt:P,mc:k,pc:V,pbc:O,n:J,o:e};let X,te;return t&&([X,te]=t(Q)),{render:Z,hydrate:X,createApp:qr(Z,X)}}function rs({effect:e,update:t},n){e.allowRecurse=t.allowRecurse=n}function ss(e,t,n=!1){const o=e.children,r=t.children;if(N(o)&&N(r))for(let e=0;e<o.length;e++){const t=o[e];let s=r[e];1&s.shapeFlag&&!s.dynamicChildren&&((s.patchFlag<=0||32===s.patchFlag)&&(s=r[e]=Fs(r[e]),s.el=t.el),n||ss(t,s))}}const is=e=>e&&(e.disabled||""===e.disabled),ls=e=>"undefined"!=typeof SVGElement&&e instanceof SVGElement,cs=(e,t)=>{const n=e&&e.to;if(M(n)){if(t){return t(n)}return null}return n};function as(e,t,n,{o:{insert:o},m:r},s=2){0===s&&o(e.targetAnchor,t,n);const{el:i,anchor:l,shapeFlag:c,children:a,props:u}=e,f=2===s;if(f&&o(i,t,n),(!f||is(u))&&16&c)for(let e=0;e<a.length;e++)r(a[e],t,n,2);f&&o(l,t,n)}const us={__isTeleport:!0,process(e,t,n,o,r,s,i,l,c,a){const{mc:u,pc:f,pbc:p,o:{insert:d,querySelector:h,createText:g,createComment:m}}=a,y=is(t.props);let{shapeFlag:v,children:b,dynamicChildren:_}=t;if(null==e){const e=t.el=g(""),a=t.anchor=g("");d(e,n,o),d(a,n,o);const f=t.target=cs(t.props,h),p=t.targetAnchor=g("");f&&(d(p,f),i=i||ls(f));const m=(e,t)=>{16&v&&u(b,e,t,r,s,i,l,c)};y?m(n,a):f&&m(f,p)}else{t.el=e.el;const o=t.anchor=e.anchor,u=t.target=e.target,d=t.targetAnchor=e.targetAnchor,g=is(e.props),m=g?n:u,v=g?o:d;if(i=i||ls(u),_?(p(e.dynamicChildren,_,m,r,s,i,l),ss(e,t,!0)):c||f(e,t,m,v,r,s,i,l,!1),y)g||as(t,n,o,a,1);else if((t.props&&t.props.to)!==(e.props&&e.props.to)){const e=t.target=cs(t.props,h);e&&as(t,e,null,a,0)}else g&&as(t,u,d,a,1)}},remove(e,t,n,o,{um:r,o:{remove:s}},i){const{shapeFlag:l,children:c,anchor:a,targetAnchor:u,target:f,props:p}=e;if(f&&s(u),(i||!is(p))&&(s(a),16&l))for(let e=0;e<c.length;e++){const o=c[e];r(o,t,n,!0,!!o.dynamicChildren)}},move:as,hydrate:function(e,t,n,o,r,s,{o:{nextSibling:i,parentNode:l,querySelector:c}},a){const u=t.target=cs(t.props,c);if(u){const c=u._lpa||u.firstChild;if(16&t.shapeFlag)if(is(t.props))t.anchor=a(i(e),t,l(e),n,o,r,s),t.targetAnchor=c;else{t.anchor=i(e);let l=c;for(;l;)if(l=i(l),l&&8===l.nodeType&&"teleport anchor"===l.data){t.targetAnchor=l,u._lpa=t.targetAnchor&&i(t.targetAnchor);break}a(c,t,u,n,o,r,s)}}return t.anchor&&i(t.anchor)}},fs=Symbol(void 0),ps=Symbol(void 0),ds=Symbol(void 0),hs=Symbol(void 0),gs=[];let ms=null;function ys(e=!1){gs.push(ms=e?null:[])}function vs(){gs.pop(),ms=gs[gs.length-1]||null}let bs,_s=1;function ws(e){_s+=e}function Ss(e){return e.dynamicChildren=_s>0?ms||w:null,vs(),_s>0&&ms&&ms.push(e),e}function xs(e,t,n,o,r,s){return Ss(Ns(e,t,n,o,r,s,!0))}function Es(e,t,n,o,r){return Ss($s(e,t,n,o,r,!0))}function Cs(e){return!!e&&!0===e.__v_isVNode}function ks(e,t){return e.type===t.type&&e.key===t.key}function Ts(e){bs=e}const Is="__vInternal",Os=({key:e})=>null!=e?e:null,As=({ref:e,ref_key:t,ref_for:n})=>null!=e?M(e)||Pt(e)||B(e)?{i:Jn,r:e,k:t,f:!!n}:e:null;function Ns(e,t=null,n=null,o=0,r=null,s=(e===fs?0:1),i=!1,l=!1){const c={__v_isVNode:!0,__v_skip:!0,type:e,props:t,key:t&&Os(t),ref:t&&As(t),scopeId:Gn,slotScopeIds:null,children:n,component:null,suspense:null,ssContent:null,ssFallback:null,dirs:null,transition:null,el:null,anchor:null,target:null,targetAnchor:null,staticCount:0,shapeFlag:s,patchFlag:o,dynamicProps:r,dynamicChildren:null,appContext:null};return l?(Us(c,n),128&s&&e.normalize(c)):n&&(c.shapeFlag|=M(n)?8:16),_s>0&&!i&&ms&&(c.patchFlag>0||6&s)&&32!==c.patchFlag&&ms.push(c),c}const $s=function(e,t=null,n=null,o=0,r=null,s=!1){if(e&&e!==ur||(e=ds),Cs(e)){const o=Ps(e,t,!0);return n&&Us(o,n),_s>0&&!s&&ms&&(6&o.shapeFlag?ms[ms.indexOf(e)]=o:ms.push(o)),o.patchFlag|=-2,o}if(i=e,B(i)&&"__vccOpts"in i&&(e=e.__vccOpts),t){t=Ls(t);let{class:e,style:n}=t;e&&!M(e)&&(t.class=f(e)),V(n)&&(Tt(n)&&!N(n)&&(n=T({},n)),t.style=l(n))}var i;return Ns(e,t,n,o,r,M(e)?1:lo(e)?128:(e=>e.__isTeleport)(e)?64:V(e)?4:B(e)?2:0,s,!0)};function Ls(e){return e?Tt(e)||Is in e?T({},e):e:null}function Ps(e,t,n=!1){const{props:o,ref:r,patchFlag:s,children:i}=e,l=t?js(o||{},t):o;return{__v_isVNode:!0,__v_skip:!0,type:e.type,props:l,key:l&&Os(l),ref:t&&t.ref?n&&r?N(r)?r.concat(As(t)):[r,As(t)]:As(t):r,scopeId:e.scopeId,slotScopeIds:e.slotScopeIds,children:i,target:e.target,targetAnchor:e.targetAnchor,staticCount:e.staticCount,shapeFlag:e.shapeFlag,patchFlag:t&&e.type!==fs?-1===s?16:16|s:s,dynamicProps:e.dynamicProps,dynamicChildren:e.dynamicChildren,appContext:e.appContext,dirs:e.dirs,transition:e.transition,component:e.component,suspense:e.suspense,ssContent:e.ssContent&&Ps(e.ssContent),ssFallback:e.ssFallback&&Ps(e.ssFallback),el:e.el,anchor:e.anchor}}function Bs(e=" ",t=0){return $s(ps,null,e,t)}function Ms(e,t){const n=$s(hs,null,e);return n.staticCount=t,n}function Rs(e="",t=!1){return t?(ys(),Es(ds,null,e)):$s(ds,null,e)}function Vs(e){return null==e||"boolean"==typeof e?$s(ds):N(e)?$s(fs,null,e.slice()):"object"==typeof e?Fs(e):$s(ps,null,String(e))}function Fs(e){return null===e.el||e.memo?e:Ps(e)}function Us(e,t){let n=0;const{shapeFlag:o}=e;if(null==t)t=null;else if(N(t))n=16;else if("object"==typeof t){if(65&o){const n=t.default;return void(n&&(n._c&&(n._d=!1),Us(e,n()),n._c&&(n._d=!0)))}{n=32;const o=t._;o||Is in t?3===o&&Jn&&(1===Jn.slots._?t._=1:(t._=2,e.patchFlag|=1024)):t._ctx=Jn}}else B(t)?(t={default:t,_ctx:Jn},n=32):(t=String(t),64&o?(n=16,t=[Bs(t)]):n=8);e.children=t,e.shapeFlag|=n}function js(...e){const t={};for(let n=0;n<e.length;n++){const o=e[n];for(const e in o)if("class"===e)t.class!==o.class&&(t.class=f([t.class,o.class]));else if("style"===e)t.style=l([t.style,o.style]);else if(C(e)){const n=t[e],r=o[e];!r||n===r||N(n)&&n.includes(r)||(t[e]=n?[].concat(n,r):r)}else""!==e&&(t[e]=o[e])}return t}function Ds(e,t,n,o=null){dn(e,t,7,[n,o])}const Hs=Kr();let zs=0;function Ws(e,t,n){const o=e.type,r=(t?t.appContext:e.appContext)||Hs,s={uid:zs++,vnode:e,type:o,parent:t,appContext:r,root:null,next:null,subTree:null,effect:null,update:null,scope:new ie(!0),render:null,proxy:null,exposed:null,exposeProxy:null,withProxy:null,provides:t?t.provides:Object.create(r.provides),accessCache:null,renderCache:[],components:null,directives:null,propsOptions:Mr(o,r),emitsOptions:Yn(o,r),emit:null,emitted:null,propsDefaults:_,inheritAttrs:o.inheritAttrs,ctx:_,data:_,props:_,attrs:_,slots:_,refs:_,setupState:_,setupContext:null,suspense:n,suspenseId:n?n.pendingId:0,asyncDep:null,asyncResolved:!1,isMounted:!1,isUnmounted:!1,isDeactivated:!1,bc:null,c:null,bm:null,m:null,bu:null,u:null,um:null,bum:null,da:null,a:null,rtg:null,rtc:null,ec:null,sp:null};return s.ctx={_:s},s.root=t?t.root:s,s.emit=Kn.bind(null,s),e.ce&&e.ce(s),s}let Ks=null;const Ys=()=>Ks||Jn,qs=e=>{Ks=e,e.scope.on()},Js=()=>{Ks&&Ks.scope.off(),Ks=null};function Gs(e){return 4&e.vnode.shapeFlag}let Zs,Qs,Xs=!1;function ei(e,t=!1){Xs=t;const{props:n,children:o}=e.vnode,r=Gs(e);!function(e,t,n,o=!1){const r={},s={};te(s,Is,1),e.propsDefaults=Object.create(null),Pr(e,t,r,s);for(const t in e.propsOptions[0])t in r||(r[t]=void 0);n?e.props=o?r:_t(r):e.type.props?e.props=r:e.props=s,e.attrs=s}(e,n,r,t),((e,t)=>{if(32&e.vnode.shapeFlag){const n=t._;n?(e.slots=It(t),te(t,"_",n)):zr(t,e.slots={})}else e.slots={},t&&Wr(e,t);te(e.slots,Is,1)})(e,o);const s=r?function(e,t){const n=e.type;e.accessCache=Object.create(null),e.proxy=Ot(new Proxy(e.ctx,Sr));const{setup:o}=n;if(o){const n=e.setupContext=o.length>1?si(e):null;qs(e),ke();const r=pn(o,e,0,[e.props,n]);if(Te(),Js(),F(r)){if(r.then(Js,Js),t)return r.then((n=>{ti(e,n,t)})).catch((t=>{hn(t,e,0)}));e.asyncDep=r}else ti(e,r,t)}else ri(e,t)}(e,t):void 0;return Xs=!1,s}function ti(e,t,n){B(t)?e.type.__ssrInlineRender?e.ssrRender=t:e.render=t:V(t)&&(__VUE_PROD_DEVTOOLS__&&(e.devtoolsRawSetupState=t),e.setupState=Dt(t)),ri(e,n)}function ni(e){Zs=e,Qs=e=>{e.render._rc&&(e.withProxy=new Proxy(e.ctx,xr))}}const oi=()=>!Zs;function ri(e,t,n){const o=e.type;if(!e.render){if(!t&&Zs&&!o.render){const t=o.template;if(t){const{isCustomElement:n,compilerOptions:r}=e.appContext.config,{delimiters:s,compilerOptions:i}=o,l=T(T({isCustomElement:n,delimiters:s},r),i);o.render=Zs(t,l)}}e.render=o.render||S,Qs&&Qs(e)}__VUE_OPTIONS_API__&&(qs(e),ke(),function(e){const t=Tr(e),n=e.proxy,o=e.ctx;Er=!1,t.beforeCreate&&Cr(t.beforeCreate,e,"bc");const{data:r,computed:s,methods:i,watch:l,provide:c,inject:a,created:u,beforeMount:f,mounted:p,beforeUpdate:d,updated:h,activated:g,deactivated:m,beforeDestroy:y,beforeUnmount:v,destroyed:b,unmounted:_,render:w,renderTracked:x,renderTriggered:E,errorCaptured:C,serverPrefetch:k,expose:T,inheritAttrs:I,components:O,directives:A,filters:$}=t;if(a&&function(e,t,n=S,o=!1){N(e)&&(e=Nr(e));for(const n in e){const r=e[n];let s;s=V(r)?"default"in r?mo(r.from||n,r.default,!0):mo(r.from||n):mo(r),Pt(s)&&o?Object.defineProperty(t,n,{enumerable:!0,configurable:!0,get:()=>s.value,set:e=>s.value=e}):t[n]=s}}(a,o,null,e.appContext.config.unwrapInjectedRef),i)for(const e in i){const t=i[e];B(t)&&(o[e]=t.bind(n))}if(r){const t=r.call(n,n);V(t)&&(e.data=bt(t))}if(Er=!0,s)for(const e in s){const t=s[e],r=B(t)?t.bind(n,n):B(t.get)?t.get.bind(n,n):S,i=!B(t)&&B(t.set)?t.set.bind(n):S,l=ui({get:r,set:i});Object.defineProperty(o,e,{enumerable:!0,configurable:!0,get:()=>l.value,set:e=>l.value=e})}if(l)for(const e in l)kr(l[e],o,n,e);if(c){const e=B(c)?c.call(n):c;Reflect.ownKeys(e).forEach((t=>{go(t,e[t])}))}function L(e,t){N(t)?t.forEach((t=>e(t.bind(n)))):t&&e(t.bind(n))}if(u&&Cr(u,e,"c"),L(Go,f),L(Zo,p),L(Qo,d),L(Xo,h),L(Do,g),L(Ho,m),L(sr,C),L(rr,x),L(or,E),L(er,v),L(tr,_),L(nr,k),N(T))if(T.length){const t=e.exposed||(e.exposed={});T.forEach((e=>{Object.defineProperty(t,e,{get:()=>n[e],set:t=>n[e]=t})}))}else e.exposed||(e.exposed={});w&&e.render===S&&(e.render=w),null!=I&&(e.inheritAttrs=I),O&&(e.components=O),A&&(e.directives=A)}(e),Te(),Js())}function si(e){let t;return{get attrs(){return t||(t=function(e){return new Proxy(e.attrs,{get:(t,n)=>(Ie(e,0,"$attrs"),t[n])})}(e))},slots:e.slots,emit:e.emit,expose:t=>{e.exposed=t||{}}}}function ii(e){if(e.exposed)return e.exposeProxy||(e.exposeProxy=new Proxy(Dt(Ot(e.exposed)),{get:(t,n)=>n in t?t[n]:n in wr?wr[n](e):void 0}))}const li=/(?:^|[-_])(\w)/g;function ci(e,t=!0){return B(e)?e.displayName||e.name:e.name||t&&e.__name}function ai(e,t,n=!1){let o=ci(t);if(!o&&t.__file){const e=t.__file.match(/([^/\\]+)\.\w+$/);e&&(o=e[1])}if(!o&&e&&e.parent){const n=e=>{for(const n in e)if(e[n]===t)return n};o=n(e.components||e.parent.type.components)||n(e.appContext.components)}return o?o.replace(li,(e=>e.toUpperCase())).replace(/[-_]/g,""):n?"App":"Anonymous"}const ui=(e,t)=>function(e,t,n=!1){let o,r;const s=B(e);return s?(o=e,r=S):(o=e.get,r=e.set),new qt(o,r,s||!r,n)}(e,0,Xs);function fi(){return null}function pi(){return null}function di(e){}function hi(e,t){return null}function gi(){return yi().slots}function mi(){return yi().attrs}function yi(){const e=Ys();return e.setupContext||(e.setupContext=si(e))}function vi(e,t){const n=N(e)?e.reduce(((e,t)=>(e[t]={},e)),{}):e;for(const e in t){const o=n[e];o?N(o)||B(o)?n[e]={type:o,default:t[e]}:o.default=t[e]:null===o&&(n[e]={default:t[e]})}return n}function bi(e,t){const n={};for(const o in e)t.includes(o)||Object.defineProperty(n,o,{enumerable:!0,get:()=>e[o]});return n}function _i(e){const t=Ys();let n=e();return Js(),F(n)&&(n=n.catch((e=>{throw qs(t),e}))),[n,()=>qs(t)]}function wi(e,t,n){const o=arguments.length;return 2===o?V(t)&&!N(t)?Cs(t)?$s(e,null,[t]):$s(e,t):$s(e,null,t):(o>3?n=Array.prototype.slice.call(arguments,2):3===o&&Cs(n)&&(n=[n]),$s(e,t,n))}const Si=Symbol(""),xi=()=>{{const e=mo(Si);return e||an("Server rendering context not provided. Make sure to only call useSSRContext() conditionally in the server build."),e}};function Ei(){}function Ci(e,t,n,o){const r=n[o];if(r&&ki(r,e))return r;const s=t();return s.memo=e.slice(),n[o]=s}function ki(e,t){const n=e.memo;if(n.length!=t.length)return!1;for(let e=0;e<n.length;e++)if(X(n[e],t[e]))return!1;return _s>0&&ms&&ms.push(e),!0}const Ti="3.2.37",Ii={createComponentInstance:Ws,setupComponent:ei,renderComponentRoot:no,setCurrentRenderingInstance:Zn,isVNode:Cs,normalizeVNode:Vs},Oi=null,Ai=null,Ni="undefined"!=typeof document?document:null,$i=Ni&&Ni.createElement("template"),Li={insert:(e,t,n)=>{t.insertBefore(e,n||null)},remove:e=>{const t=e.parentNode;t&&t.removeChild(e)},createElement:(e,t,n,o)=>{const r=t?Ni.createElementNS("http://www.w3.org/2000/svg",e):Ni.createElement(e,n?{is:n}:void 0);return"select"===e&&o&&null!=o.multiple&&r.setAttribute("multiple",o.multiple),r},createText:e=>Ni.createTextNode(e),createComment:e=>Ni.createComment(e),setText:(e,t)=>{e.nodeValue=t},setElementText:(e,t)=>{e.textContent=t},parentNode:e=>e.parentNode,nextSibling:e=>e.nextSibling,querySelector:e=>Ni.querySelector(e),setScopeId(e,t){e.setAttribute(t,"")},cloneNode(e){const t=e.cloneNode(!0);return"_value"in e&&(t._value=e._value),t},insertStaticContent(e,t,n,o,r,s){const i=n?n.previousSibling:t.lastChild;if(r&&(r===s||r.nextSibling))for(;t.insertBefore(r.cloneNode(!0),n),r!==s&&(r=r.nextSibling););else{$i.innerHTML=o?`<svg>${e}</svg>`:e;const r=$i.content;if(o){const e=r.firstChild;for(;e.firstChild;)r.appendChild(e.firstChild);r.removeChild(e)}t.insertBefore(r,n)}return[i?i.nextSibling:t.firstChild,n?n.previousSibling:t.lastChild]}},Pi=/\s*!important$/;function Bi(e,t,n){if(N(n))n.forEach((n=>Bi(e,t,n)));else if(null==n&&(n=""),t.startsWith("--"))e.setProperty(t,n);else{const o=function(e,t){const n=Ri[t];if(n)return n;let o=q(t);if("filter"!==o&&o in e)return Ri[t]=o;o=Z(o);for(let n=0;n<Mi.length;n++){const r=Mi[n]+o;if(r in e)return Ri[t]=r}return t}(e,t);Pi.test(n)?e.setProperty(G(o),n.replace(Pi,""),"important"):e[o]=n}}const Mi=["Webkit","Moz","ms"],Ri={},Vi="http://www.w3.org/1999/xlink",[Fi,Ui]=(()=>{let e=Date.now,t=!1;if("undefined"!=typeof window){Date.now()>document.createEvent("Event").timeStamp&&(e=performance.now.bind(performance));const n=navigator.userAgent.match(/firefox\/(\d+)/i);t=!!(n&&Number(n[1])<=53)}return[e,t]})();let ji=0;const Di=Promise.resolve(),Hi=()=>{ji=0};function zi(e,t,n,o){e.addEventListener(t,n,o)}const Wi=/(?:Once|Passive|Capture)$/,Ki=/^on[a-z]/;function Yi(e,t){const n=Bo(e);class o extends Gi{constructor(e){super(n,e,t)}}return o.def=n,o}const qi=e=>Yi(e,Ql),Ji="undefined"!=typeof HTMLElement?HTMLElement:class{};class Gi extends Ji{constructor(e,t={},n){super(),this._def=e,this._props=t,this._instance=null,this._connected=!1,this._resolved=!1,this._numberProps=null,this.shadowRoot&&n?n(this._createVNode(),this.shadowRoot):this.attachShadow({mode:"open"})}connectedCallback(){this._connected=!0,this._instance||this._resolveDef()}disconnectedCallback(){this._connected=!1,In((()=>{this._connected||(Zl(null,this.shadowRoot),this._instance=null)}))}_resolveDef(){if(this._resolved)return;this._resolved=!0;for(let e=0;e<this.attributes.length;e++)this._setAttr(this.attributes[e].name);new MutationObserver((e=>{for(const t of e)this._setAttr(t.attributeName)})).observe(this,{attributes:!0});const e=e=>{const{props:t,styles:n}=e,o=!N(t),r=t?o?Object.keys(t):t:[];let s;if(o)for(const e in this._props){const n=t[e];(n===Number||n&&n.type===Number)&&(this._props[e]=ne(this._props[e]),(s||(s=Object.create(null)))[e]=!0)}this._numberProps=s;for(const e of Object.keys(this))"_"!==e[0]&&this._setProp(e,this[e],!0,!1);for(const e of r.map(q))Object.defineProperty(this,e,{get(){return this._getProp(e)},set(t){this._setProp(e,t)}});this._applyStyles(n),this._update()},t=this._def.__asyncLoader;t?t().then(e):e(this._def)}_setAttr(e){let t=this.getAttribute(e);this._numberProps&&this._numberProps[e]&&(t=ne(t)),this._setProp(q(e),t,!1)}_getProp(e){return this._props[e]}_setProp(e,t,n=!0,o=!0){t!==this._props[e]&&(this._props[e]=t,o&&this._instance&&this._update(),n&&(!0===t?this.setAttribute(G(e),""):"string"==typeof t||"number"==typeof t?this.setAttribute(G(e),t+""):t||this.removeAttribute(G(e))))}_update(){Zl(this._createVNode(),this.shadowRoot)}_createVNode(){const e=$s(this._def,T({},this._props));return this._instance||(e.ce=e=>{this._instance=e,e.isCE=!0,e.emit=(e,...t)=>{this.dispatchEvent(new CustomEvent(e,{detail:t}))};let t=this;for(;t=t&&(t.parentNode||t.host);)if(t instanceof Gi){e.parent=t._instance;break}}),e}_applyStyles(e){e&&e.forEach((e=>{const t=document.createElement("style");t.textContent=e,this.shadowRoot.appendChild(t)}))}}function Zi(e="$style"){{const t=Ys();if(!t)return _;const n=t.type.__cssModules;if(!n)return _;return n[e]||_}}function Qi(e){const t=Ys();if(!t)return;const n=()=>Xi(t.subTree,e(t.proxy));vo(n),Zo((()=>{const e=new MutationObserver(n);e.observe(t.subTree.el.parentNode,{childList:!0}),tr((()=>e.disconnect()))}))}function Xi(e,t){if(128&e.shapeFlag){const n=e.suspense;e=n.activeBranch,n.pendingBranch&&!n.isHydrating&&n.effects.push((()=>{Xi(n.activeBranch,t)}))}for(;e.component;)e=e.component.subTree;if(1&e.shapeFlag&&e.el)el(e.el,t);else if(e.type===fs)e.children.forEach((e=>Xi(e,t)));else if(e.type===hs){let{el:n,anchor:o}=e;for(;n&&(el(n,t),n!==o);)n=n.nextSibling}}function el(e,t){if(1===e.nodeType){const n=e.style;for(const e in t)n.setProperty(`--${e}`,t[e])}}const tl="transition",nl="animation",ol=(e,{slots:t})=>wi(Io,cl(e),t);ol.displayName="Transition";const rl={name:String,type:String,css:{type:Boolean,default:!0},duration:[String,Number,Object],enterFromClass:String,enterActiveClass:String,enterToClass:String,appearFromClass:String,appearActiveClass:String,appearToClass:String,leaveFromClass:String,leaveActiveClass:String,leaveToClass:String},sl=ol.props=T({},Io.props,rl),il=(e,t=[])=>{N(e)?e.forEach((e=>e(...t))):e&&e(...t)},ll=e=>!!e&&(N(e)?e.some((e=>e.length>1)):e.length>1);function cl(e){const t={};for(const n in e)n in rl||(t[n]=e[n]);if(!1===e.css)return t;const{name:n="v",type:o,duration:r,enterFromClass:s=`${n}-enter-from`,enterActiveClass:i=`${n}-enter-active`,enterToClass:l=`${n}-enter-to`,appearFromClass:c=s,appearActiveClass:a=i,appearToClass:u=l,leaveFromClass:f=`${n}-leave-from`,leaveActiveClass:p=`${n}-leave-active`,leaveToClass:d=`${n}-leave-to`}=e,h=function(e){if(null==e)return null;if(V(e))return[al(e.enter),al(e.leave)];{const t=al(e);return[t,t]}}(r),g=h&&h[0],m=h&&h[1],{onBeforeEnter:y,onEnter:v,onEnterCancelled:b,onLeave:_,onLeaveCancelled:w,onBeforeAppear:S=y,onAppear:x=v,onAppearCancelled:E=b}=t,C=(e,t,n)=>{fl(e,t?u:l),fl(e,t?a:i),n&&n()},k=(e,t)=>{e._isLeaving=!1,fl(e,f),fl(e,d),fl(e,p),t&&t()},I=e=>(t,n)=>{const r=e?x:v,i=()=>C(t,e,n);il(r,[t,i]),pl((()=>{fl(t,e?c:s),ul(t,e?u:l),ll(r)||hl(t,o,g,i)}))};return T(t,{onBeforeEnter(e){il(y,[e]),ul(e,s),ul(e,i)},onBeforeAppear(e){il(S,[e]),ul(e,c),ul(e,a)},onEnter:I(!1),onAppear:I(!0),onLeave(e,t){e._isLeaving=!0;const n=()=>k(e,t);ul(e,f),vl(),ul(e,p),pl((()=>{e._isLeaving&&(fl(e,f),ul(e,d),ll(_)||hl(e,o,m,n))})),il(_,[e,n])},onEnterCancelled(e){C(e,!1),il(b,[e])},onAppearCancelled(e){C(e,!0),il(E,[e])},onLeaveCancelled(e){k(e),il(w,[e])}})}function al(e){return ne(e)}function ul(e,t){t.split(/\s+/).forEach((t=>t&&e.classList.add(t))),(e._vtc||(e._vtc=new Set)).add(t)}function fl(e,t){t.split(/\s+/).forEach((t=>t&&e.classList.remove(t)));const{_vtc:n}=e;n&&(n.delete(t),n.size||(e._vtc=void 0))}function pl(e){requestAnimationFrame((()=>{requestAnimationFrame(e)}))}let dl=0;function hl(e,t,n,o){const r=e._endId=++dl,s=()=>{r===e._endId&&o()};if(n)return setTimeout(s,n);const{type:i,timeout:l,propCount:c}=gl(e,t);if(!i)return o();const a=i+"end";let u=0;const f=()=>{e.removeEventListener(a,p),s()},p=t=>{t.target===e&&++u>=c&&f()};setTimeout((()=>{u<c&&f()}),l+1),e.addEventListener(a,p)}function gl(e,t){const n=window.getComputedStyle(e),o=e=>(n[e]||"").split(", "),r=o("transitionDelay"),s=o("transitionDuration"),i=ml(r,s),l=o("animationDelay"),c=o("animationDuration"),a=ml(l,c);let u=null,f=0,p=0;return t===tl?i>0&&(u=tl,f=i,p=s.length):t===nl?a>0&&(u=nl,f=a,p=c.length):(f=Math.max(i,a),u=f>0?i>a?tl:nl:null,p=u?u===tl?s.length:c.length:0),{type:u,timeout:f,propCount:p,hasTransform:u===tl&&/\b(transform|all)(,|$)/.test(n.transitionProperty)}}function ml(e,t){for(;e.length<t.length;)e=e.concat(e);return Math.max(...t.map(((t,n)=>yl(t)+yl(e[n]))))}function yl(e){return 1e3*Number(e.slice(0,-1).replace(",","."))}function vl(){return document.body.offsetHeight}const bl=new WeakMap,_l=new WeakMap,wl={name:"TransitionGroup",props:T({},sl,{tag:String,moveClass:String}),setup(e,{slots:t}){const n=Ys(),o=ko();let r,s;return Xo((()=>{if(!r.length)return;const t=e.moveClass||`${e.name||"v"}-move`;if(!function(e,t,n){const o=e.cloneNode();e._vtc&&e._vtc.forEach((e=>{e.split(/\s+/).forEach((e=>e&&o.classList.remove(e)))})),n.split(/\s+/).forEach((e=>e&&o.classList.add(e))),o.style.display="none";const r=1===t.nodeType?t:t.parentNode;r.appendChild(o);const{hasTransform:s}=gl(o);return r.removeChild(o),s}(r[0].el,n.vnode.el,t))return;r.forEach(Sl),r.forEach(xl);const o=r.filter(El);vl(),o.forEach((e=>{const n=e.el,o=n.style;ul(n,t),o.transform=o.webkitTransform=o.transitionDuration="";const r=n._moveCb=e=>{e&&e.target!==n||e&&!/transform$/.test(e.propertyName)||(n.removeEventListener("transitionend",r),n._moveCb=null,fl(n,t))};n.addEventListener("transitionend",r)}))})),()=>{const i=It(e),l=cl(i);let c=i.tag||fs;r=s,s=t.default?Po(t.default()):[];for(let e=0;e<s.length;e++){const t=s[e];null!=t.key&&Lo(t,Ao(t,l,o,n))}if(r)for(let e=0;e<r.length;e++){const t=r[e];Lo(t,Ao(t,l,o,n)),bl.set(t,t.el.getBoundingClientRect())}return $s(c,null,s)}}};function Sl(e){const t=e.el;t._moveCb&&t._moveCb(),t._enterCb&&t._enterCb()}function xl(e){_l.set(e,e.el.getBoundingClientRect())}function El(e){const t=bl.get(e),n=_l.get(e),o=t.left-n.left,r=t.top-n.top;if(o||r){const t=e.el.style;return t.transform=t.webkitTransform=`translate(${o}px,${r}px)`,t.transitionDuration="0s",e}}const Cl=e=>{const t=e.props["onUpdate:modelValue"]||!1;return N(t)?e=>ee(t,e):t};function kl(e){e.target.composing=!0}function Tl(e){const t=e.target;t.composing&&(t.composing=!1,t.dispatchEvent(new Event("input")))}const Il={created(e,{modifiers:{lazy:t,trim:n,number:o}},r){e._assign=Cl(r);const s=o||r.props&&"number"===r.props.type;zi(e,t?"change":"input",(t=>{if(t.target.composing)return;let o=e.value;n&&(o=o.trim()),s&&(o=ne(o)),e._assign(o)})),n&&zi(e,"change",(()=>{e.value=e.value.trim()})),t||(zi(e,"compositionstart",kl),zi(e,"compositionend",Tl),zi(e,"change",Tl))},mounted(e,{value:t}){e.value=null==t?"":t},beforeUpdate(e,{value:t,modifiers:{lazy:n,trim:o,number:r}},s){if(e._assign=Cl(s),e.composing)return;if(document.activeElement===e&&"range"!==e.type){if(n)return;if(o&&e.value.trim()===t)return;if((r||"number"===e.type)&&ne(e.value)===t)return}const i=null==t?"":t;e.value!==i&&(e.value=i)}},Ol={deep:!0,created(e,t,n){e._assign=Cl(n),zi(e,"change",(()=>{const t=e._modelValue,n=Pl(e),o=e.checked,r=e._assign;if(N(t)){const e=y(t,n),s=-1!==e;if(o&&!s)r(t.concat(n));else if(!o&&s){const n=[...t];n.splice(e,1),r(n)}}else if(L(t)){const e=new Set(t);o?e.add(n):e.delete(n),r(e)}else r(Bl(e,o))}))},mounted:Al,beforeUpdate(e,t,n){e._assign=Cl(n),Al(e,t,n)}};function Al(e,{value:t,oldValue:n},o){e._modelValue=t,N(t)?e.checked=y(t,o.props.value)>-1:L(t)?e.checked=t.has(o.props.value):t!==n&&(e.checked=m(t,Bl(e,!0)))}const Nl={created(e,{value:t},n){e.checked=m(t,n.props.value),e._assign=Cl(n),zi(e,"change",(()=>{e._assign(Pl(e))}))},beforeUpdate(e,{value:t,oldValue:n},o){e._assign=Cl(o),t!==n&&(e.checked=m(t,o.props.value))}},$l={deep:!0,created(e,{value:t,modifiers:{number:n}},o){const r=L(t);zi(e,"change",(()=>{const t=Array.prototype.filter.call(e.options,(e=>e.selected)).map((e=>n?ne(Pl(e)):Pl(e)));e._assign(e.multiple?r?new Set(t):t:t[0])})),e._assign=Cl(o)},mounted(e,{value:t}){Ll(e,t)},beforeUpdate(e,t,n){e._assign=Cl(n)},updated(e,{value:t}){Ll(e,t)}};function Ll(e,t){const n=e.multiple;if(!n||N(t)||L(t)){for(let o=0,r=e.options.length;o<r;o++){const r=e.options[o],s=Pl(r);if(n)N(t)?r.selected=y(t,s)>-1:r.selected=t.has(s);else if(m(Pl(r),t))return void(e.selectedIndex!==o&&(e.selectedIndex=o))}n||-1===e.selectedIndex||(e.selectedIndex=-1)}}function Pl(e){return"_value"in e?e._value:e.value}function Bl(e,t){const n=t?"_trueValue":"_falseValue";return n in e?e[n]:t}const Ml={created(e,t,n){Vl(e,t,n,null,"created")},mounted(e,t,n){Vl(e,t,n,null,"mounted")},beforeUpdate(e,t,n,o){Vl(e,t,n,o,"beforeUpdate")},updated(e,t,n,o){Vl(e,t,n,o,"updated")}};function Rl(e,t){switch(e){case"SELECT":return $l;case"TEXTAREA":return Il;default:switch(t){case"checkbox":return Ol;case"radio":return Nl;default:return Il}}}function Vl(e,t,n,o,r){const s=Rl(e.tagName,n.props&&n.props.type)[r];s&&s(e,t,n,o)}const Fl=["ctrl","shift","alt","meta"],Ul={stop:e=>e.stopPropagation(),prevent:e=>e.preventDefault(),self:e=>e.target!==e.currentTarget,ctrl:e=>!e.ctrlKey,shift:e=>!e.shiftKey,alt:e=>!e.altKey,meta:e=>!e.metaKey,left:e=>"button"in e&&0!==e.button,middle:e=>"button"in e&&1!==e.button,right:e=>"button"in e&&2!==e.button,exact:(e,t)=>Fl.some((n=>e[`${n}Key`]&&!t.includes(n)))},jl=(e,t)=>(n,...o)=>{for(let e=0;e<t.length;e++){const o=Ul[t[e]];if(o&&o(n,t))return}return e(n,...o)},Dl={esc:"escape",space:" ",up:"arrow-up",left:"arrow-left",right:"arrow-right",down:"arrow-down",delete:"backspace"},Hl=(e,t)=>n=>{if(!("key"in n))return;const o=G(n.key);return t.some((e=>e===o||Dl[e]===o))?e(n):void 0},zl={beforeMount(e,{value:t},{transition:n}){e._vod="none"===e.style.display?"":e.style.display,n&&t?n.beforeEnter(e):Wl(e,t)},mounted(e,{value:t},{transition:n}){n&&t&&n.enter(e)},updated(e,{value:t,oldValue:n},{transition:o}){!t!=!n&&(o?t?(o.beforeEnter(e),Wl(e,!0),o.enter(e)):o.leave(e,(()=>{Wl(e,!1)})):Wl(e,t))},beforeUnmount(e,{value:t}){Wl(e,t)}};function Wl(e,t){e.style.display=t?e._vod:"none"}const Kl=T({patchProp:(e,t,n,o,r=!1,l,c,a,u)=>{"class"===t?function(e,t,n){const o=e._vtc;o&&(t=(t?[t,...o]:[...o]).join(" ")),null==t?e.removeAttribute("class"):n?e.setAttribute("class",t):e.className=t}(e,o,r):"style"===t?function(e,t,n){const o=e.style,r=M(n);if(n&&!r){for(const e in n)Bi(o,e,n[e]);if(t&&!M(t))for(const e in t)null==n[e]&&Bi(o,e,"")}else{const s=o.display;r?t!==n&&(o.cssText=n):t&&e.removeAttribute("style"),"_vod"in e&&(o.display=s)}}(e,n,o):C(t)?k(t)||function(e,t,n,o,r=null){const s=e._vei||(e._vei={}),i=s[t];if(o&&i)i.value=o;else{const[n,l]=function(e){let t;if(Wi.test(e)){let n;for(t={};n=e.match(Wi);)e=e.slice(0,e.length-n[0].length),t[n[0].toLowerCase()]=!0}return[G(e.slice(2)),t]}(t);if(o){const i=s[t]=function(e,t){const n=e=>{const o=e.timeStamp||Fi();(Ui||o>=n.attached-1)&&dn(function(e,t){if(N(t)){const n=e.stopImmediatePropagation;return e.stopImmediatePropagation=()=>{n.call(e),e._stopped=!0},t.map((e=>t=>!t._stopped&&e&&e(t)))}return t}(e,n.value),t,5,[e])};return n.value=e,n.attached=ji||(Di.then(Hi),ji=Fi()),n}(o,r);zi(e,n,i,l)}else i&&(function(e,t,n,o){e.removeEventListener(t,n,o)}(e,n,i,l),s[t]=void 0)}}(e,t,0,o,c):("."===t[0]?(t=t.slice(1),1):"^"===t[0]?(t=t.slice(1),0):function(e,t,n,o){return o?"innerHTML"===t||"textContent"===t||!!(t in e&&Ki.test(t)&&B(n)):"spellcheck"!==t&&"draggable"!==t&&"translate"!==t&&("form"!==t&&(("list"!==t||"INPUT"!==e.tagName)&&(("type"!==t||"TEXTAREA"!==e.tagName)&&((!Ki.test(t)||!M(n))&&t in e))))}(e,t,o,r))?function(e,t,n,o,r,s,l){if("innerHTML"===t||"textContent"===t)return o&&l(o,r,s),void(e[t]=null==n?"":n);if("value"===t&&"PROGRESS"!==e.tagName&&!e.tagName.includes("-")){e._value=n;const o=null==n?"":n;return e.value===o&&"OPTION"!==e.tagName||(e.value=o),void(null==n&&e.removeAttribute(t))}let c=!1;if(""===n||null==n){const o=typeof e[t];"boolean"===o?n=i(n):null==n&&"string"===o?(n="",c=!0):"number"===o&&(n=0,c=!0)}try{e[t]=n}catch(e){}c&&e.removeAttribute(t)}(e,t,o,l,c,a,u):("true-value"===t?e._trueValue=o:"false-value"===t&&(e._falseValue=o),function(e,t,n,o,r){if(o&&t.startsWith("xlink:"))null==n?e.removeAttributeNS(Vi,t.slice(6,t.length)):e.setAttributeNS(Vi,t,n);else{const o=s(t);null==n||o&&!i(n)?e.removeAttribute(t):e.setAttribute(t,o?"":n)}}(e,t,o,r))}},Li);let Yl,ql=!1;function Jl(){return Yl||(Yl=ts(Kl))}function Gl(){return Yl=ql?Yl:ns(Kl),ql=!0,Yl}const Zl=(...e)=>{Jl().render(...e)},Ql=(...e)=>{Gl().hydrate(...e)},Xl=(...e)=>{const t=Jl().createApp(...e),{mount:n}=t;return t.mount=e=>{const o=tc(e);if(!o)return;const r=t._component;B(r)||r.render||r.template||(r.template=o.innerHTML),o.innerHTML="";const s=n(o,!1,o instanceof SVGElement);return o instanceof Element&&(o.removeAttribute("v-cloak"),o.setAttribute("data-v-app","")),s},t},ec=(...e)=>{const t=Gl().createApp(...e),{mount:n}=t;return t.mount=e=>{const t=tc(e);if(t)return n(t,!0,t instanceof SVGElement)},t};function tc(e){return M(e)?document.querySelector(e):e}let nc=!1;const oc=()=>{nc||(nc=!0,Il.getSSRProps=({value:e})=>({value:e}),Nl.getSSRProps=({value:e},t)=>{if(t.props&&m(t.props.value,e))return{checked:!0}},Ol.getSSRProps=({value:e},t)=>{if(N(e)){if(t.props&&y(e,t.props.value)>-1)return{checked:!0}}else if(L(e)){if(t.props&&e.has(t.props.value))return{checked:!0}}else if(e)return{checked:!0}},Ml.getSSRProps=(e,t)=>{if("string"!=typeof t.type)return;const n=Rl(t.type.toUpperCase(),t.props&&t.props.type);return n.getSSRProps?n.getSSRProps(e,t):void 0},zl.getSSRProps=({value:e})=>{if(!e)return{style:{display:"none"}}})};function rc(e){throw e}function sc(e){}function ic(e,t,n,o){const r=new SyntaxError(String(e));return r.code=e,r.loc=t,r}const lc=Symbol(""),cc=Symbol(""),ac=Symbol(""),uc=Symbol(""),fc=Symbol(""),pc=Symbol(""),dc=Symbol(""),hc=Symbol(""),gc=Symbol(""),mc=Symbol(""),yc=Symbol(""),vc=Symbol(""),bc=Symbol(""),_c=Symbol(""),wc=Symbol(""),Sc=Symbol(""),xc=Symbol(""),Ec=Symbol(""),Cc=Symbol(""),kc=Symbol(""),Tc=Symbol(""),Ic=Symbol(""),Oc=Symbol(""),Ac=Symbol(""),Nc=Symbol(""),$c=Symbol(""),Lc=Symbol(""),Pc=Symbol(""),Bc=Symbol(""),Mc=Symbol(""),Rc=Symbol(""),Vc=Symbol(""),Fc=Symbol(""),Uc=Symbol(""),jc=Symbol(""),Dc=Symbol(""),Hc=Symbol(""),zc=Symbol(""),Wc=Symbol(""),Kc={[lc]:"Fragment",[cc]:"Teleport",[ac]:"Suspense",[uc]:"KeepAlive",[fc]:"BaseTransition",[pc]:"openBlock",[dc]:"createBlock",[hc]:"createElementBlock",[gc]:"createVNode",[mc]:"createElementVNode",[yc]:"createCommentVNode",[vc]:"createTextVNode",[bc]:"createStaticVNode",[_c]:"resolveComponent",[wc]:"resolveDynamicComponent",[Sc]:"resolveDirective",[xc]:"resolveFilter",[Ec]:"withDirectives",[Cc]:"renderList",[kc]:"renderSlot",[Tc]:"createSlots",[Ic]:"toDisplayString",[Oc]:"mergeProps",[Ac]:"normalizeClass",[Nc]:"normalizeStyle",[$c]:"normalizeProps",[Lc]:"guardReactiveProps",[Pc]:"toHandlers",[Bc]:"camelize",[Mc]:"capitalize",[Rc]:"toHandlerKey",[Vc]:"setBlockTracking",[Fc]:"pushScopeId",[Uc]:"popScopeId",[jc]:"withCtx",[Dc]:"unref",[Hc]:"isRef",[zc]:"withMemo",[Wc]:"isMemoSame"},Yc={source:"",start:{line:1,column:1,offset:0},end:{line:1,column:1,offset:0}};function qc(e,t,n,o,r,s,i,l=!1,c=!1,a=!1,u=Yc){return e&&(l?(e.helper(pc),e.helper(xa(e.inSSR,a))):e.helper(Sa(e.inSSR,a)),i&&e.helper(Ec)),{type:13,tag:t,props:n,children:o,patchFlag:r,dynamicProps:s,directives:i,isBlock:l,disableTracking:c,isComponent:a,loc:u}}function Jc(e,t=Yc){return{type:17,loc:t,elements:e}}function Gc(e,t=Yc){return{type:15,loc:t,properties:e}}function Zc(e,t){return{type:16,loc:Yc,key:M(e)?Qc(e,!0):e,value:t}}function Qc(e,t=!1,n=Yc,o=0){return{type:4,loc:n,content:e,isStatic:t,constType:t?3:o}}function Xc(e,t=Yc){return{type:8,loc:t,children:e}}function ea(e,t=[],n=Yc){return{type:14,loc:n,callee:e,arguments:t}}function ta(e,t,n=!1,o=!1,r=Yc){return{type:18,params:e,returns:t,newline:n,isSlot:o,loc:r}}function na(e,t,n,o=!0){return{type:19,test:e,consequent:t,alternate:n,newline:o,loc:Yc}}const oa=e=>4===e.type&&e.isStatic,ra=(e,t)=>e===t||e===G(t);function sa(e){return ra(e,"Teleport")?cc:ra(e,"Suspense")?ac:ra(e,"KeepAlive")?uc:ra(e,"BaseTransition")?fc:void 0}const ia=/^\d|[^\$\w]/,la=e=>!ia.test(e),ca=/[A-Za-z_$\xA0-\uFFFF]/,aa=/[\.\?\w$\xA0-\uFFFF]/,ua=/\s+[.[]\s*|\s*[.[]\s+/g,fa=e=>{e=e.trim().replace(ua,(e=>e.trim()));let t=0,n=[],o=0,r=0,s=null;for(let i=0;i<e.length;i++){const l=e.charAt(i);switch(t){case 0:if("["===l)n.push(t),t=1,o++;else if("("===l)n.push(t),t=2,r++;else if(!(0===i?ca:aa).test(l))return!1;break;case 1:"'"===l||'"'===l||"`"===l?(n.push(t),t=3,s=l):"["===l?o++:"]"===l&&(--o||(t=n.pop()));break;case 2:if("'"===l||'"'===l||"`"===l)n.push(t),t=3,s=l;else if("("===l)r++;else if(")"===l){if(i===e.length-1)return!1;--r||(t=n.pop())}break;case 3:l===s&&(t=n.pop(),s=null)}}return!o&&!r};function pa(e,t,n){const o={source:e.source.slice(t,t+n),start:da(e.start,e.source,t),end:e.end};return null!=n&&(o.end=da(e.start,e.source,t+n)),o}function da(e,t,n=t.length){return ha(T({},e),t,n)}function ha(e,t,n=t.length){let o=0,r=-1;for(let e=0;e<n;e++)10===t.charCodeAt(e)&&(o++,r=e);return e.offset+=n,e.line+=o,e.column=-1===r?e.column+n:n-r,e}function ga(e,t,n=!1){for(let o=0;o<e.props.length;o++){const r=e.props[o];if(7===r.type&&(n||r.exp)&&(M(t)?r.name===t:t.test(r.name)))return r}}function ma(e,t,n=!1,o=!1){for(let r=0;r<e.props.length;r++){const s=e.props[r];if(6===s.type){if(n)continue;if(s.name===t&&(s.value||o))return s}else if("bind"===s.name&&(s.exp||o)&&ya(s.arg,t))return s}}function ya(e,t){return!(!e||!oa(e)||e.content!==t)}function va(e){return 5===e.type||2===e.type}function ba(e){return 7===e.type&&"slot"===e.name}function _a(e){return 1===e.type&&3===e.tagType}function wa(e){return 1===e.type&&2===e.tagType}function Sa(e,t){return e||t?gc:mc}function xa(e,t){return e||t?dc:hc}const Ea=new Set([$c,Lc]);function Ca(e,t=[]){if(e&&!M(e)&&14===e.type){const n=e.callee;if(!M(n)&&Ea.has(n))return Ca(e.arguments[0],t.concat(e))}return[e,t]}function ka(e,t,n){let o,r,s=13===e.type?e.props:e.arguments[2],i=[];if(s&&!M(s)&&14===s.type){const e=Ca(s);s=e[0],i=e[1],r=i[i.length-1]}if(null==s||M(s))o=Gc([t]);else if(14===s.type){const e=s.arguments[0];M(e)||15!==e.type?s.callee===Pc?o=ea(n.helper(Oc),[Gc([t]),s]):s.arguments.unshift(Gc([t])):e.properties.unshift(t),!o&&(o=s)}else if(15===s.type){let e=!1;if(4===t.key.type){const n=t.key.content;e=s.properties.some((e=>4===e.key.type&&e.key.content===n))}e||s.properties.unshift(t),o=s}else o=ea(n.helper(Oc),[Gc([t]),s]),r&&r.callee===Lc&&(r=i[i.length-2]);13===e.type?r?r.arguments[0]=o:e.props=o:r?r.arguments[0]=o:e.arguments[2]=o}function Ta(e,t){return`_${t}_${e.replace(/[^\w]/g,((t,n)=>"-"===t?"_":e.charCodeAt(n).toString()))}`}function Ia(e,{helper:t,removeHelper:n,inSSR:o}){e.isBlock||(e.isBlock=!0,n(Sa(o,e.isComponent)),t(pc),t(xa(o,e.isComponent)))}function Oa(e,t){const n=t.options?t.options.compatConfig:t.compatConfig,o=n&&n[e];return"MODE"===e?o||3:o}function Aa(e,t){const n=Oa("MODE",t),o=Oa(e,t);return 3===n?!0===o:!1!==o}function Na(e,t,n,...o){return Aa(e,t)}const $a=/&(gt|lt|amp|apos|quot);/g,La={gt:">",lt:"<",amp:"&",apos:"'",quot:'"'},Pa={delimiters:["{{","}}"],getNamespace:()=>0,getTextMode:()=>0,isVoidTag:x,isPreTag:x,isCustomElement:x,decodeEntities:e=>e.replace($a,((e,t)=>La[t])),onError:rc,onWarn:sc,comments:!1};function Ba(e,t,n){const o=Ga(n),r=o?o.ns:0,s=[];for(;!nu(e,t,n);){const i=e.source;let l;if(0===t||1===t)if(!e.inVPre&&Za(i,e.options.delimiters[0]))l=Wa(e,t);else if(0===t&&"<"===i[0])if(1===i.length)tu(e,5,1);else if("!"===i[1])Za(i,"\x3c!--")?l=Va(e):Za(i,"<!DOCTYPE")?l=Fa(e):Za(i,"<![CDATA[")?0!==r?l=Ra(e,n):(tu(e,1),l=Fa(e)):(tu(e,11),l=Fa(e));else if("/"===i[1])if(2===i.length)tu(e,5,2);else{if(">"===i[2]){tu(e,14,2),Qa(e,3);continue}if(/[a-z]/i.test(i[2])){tu(e,23),Da(e,1,o);continue}tu(e,12,2),l=Fa(e)}else/[a-z]/i.test(i[1])?(l=Ua(e,n),Aa("COMPILER_NATIVE_TEMPLATE",e)&&l&&"template"===l.tag&&!l.props.some((e=>7===e.type&&ja(e.name)))&&(l=l.children)):"?"===i[1]?(tu(e,21,1),l=Fa(e)):tu(e,12,1);if(l||(l=Ka(e,t)),N(l))for(let e=0;e<l.length;e++)Ma(s,l[e]);else Ma(s,l)}let i=!1;if(2!==t&&1!==t){const t="preserve"!==e.options.whitespace;for(let n=0;n<s.length;n++){const o=s[n];if(e.inPre||2!==o.type)3!==o.type||e.options.comments||(i=!0,s[n]=null);else if(/[^\t\r\n\f ]/.test(o.content))t&&(o.content=o.content.replace(/[\t\r\n\f ]+/g," "));else{const e=s[n-1],r=s[n+1];!e||!r||t&&(3===e.type||3===r.type||1===e.type&&1===r.type&&/[\r\n]/.test(o.content))?(i=!0,s[n]=null):o.content=" "}}if(e.inPre&&o&&e.options.isPreTag(o.tag)){const e=s[0];e&&2===e.type&&(e.content=e.content.replace(/^\r?\n/,""))}}return i?s.filter(Boolean):s}function Ma(e,t){if(2===t.type){const n=Ga(e);if(n&&2===n.type&&n.loc.end.offset===t.loc.start.offset)return n.content+=t.content,n.loc.end=t.loc.end,void(n.loc.source+=t.loc.source)}e.push(t)}function Ra(e,t){Qa(e,9);const n=Ba(e,3,t);return 0===e.source.length?tu(e,6):Qa(e,3),n}function Va(e){const t=qa(e);let n;const o=/--(\!)?>/.exec(e.source);if(o){o.index<=3&&tu(e,0),o[1]&&tu(e,10),n=e.source.slice(4,o.index);const t=e.source.slice(0,o.index);let r=1,s=0;for(;-1!==(s=t.indexOf("\x3c!--",r));)Qa(e,s-r+1),s+4<t.length&&tu(e,16),r=s+1;Qa(e,o.index+o[0].length-r+1)}else n=e.source.slice(4),Qa(e,e.source.length),tu(e,7);return{type:3,content:n,loc:Ja(e,t)}}function Fa(e){const t=qa(e),n="?"===e.source[1]?1:2;let o;const r=e.source.indexOf(">");return-1===r?(o=e.source.slice(n),Qa(e,e.source.length)):(o=e.source.slice(n,r),Qa(e,r+1)),{type:3,content:o,loc:Ja(e,t)}}function Ua(e,t){const n=e.inPre,o=e.inVPre,r=Ga(t),s=Da(e,0,r),i=e.inPre&&!n,l=e.inVPre&&!o;if(s.isSelfClosing||e.options.isVoidTag(s.tag))return i&&(e.inPre=!1),l&&(e.inVPre=!1),s;t.push(s);const c=e.options.getTextMode(s,r),a=Ba(e,c,t);t.pop();{const t=s.props.find((e=>6===e.type&&"inline-template"===e.name));if(t&&Na("COMPILER_INLINE_TEMPLATE",e,t.loc)){const n=Ja(e,s.loc.end);t.value={type:2,content:n.source,loc:n}}}if(s.children=a,ou(e.source,s.tag))Da(e,1,r);else if(tu(e,24,0,s.loc.start),0===e.source.length&&"script"===s.tag.toLowerCase()){const t=a[0];t&&Za(t.loc.source,"\x3c!--")&&tu(e,8)}return s.loc=Ja(e,s.loc.start),i&&(e.inPre=!1),l&&(e.inVPre=!1),s}const ja=t("if,else,else-if,for,slot");function Da(e,t,n){const o=qa(e),r=/^<\/?([a-z][^\t\r\n\f />]*)/i.exec(e.source),s=r[1],i=e.options.getNamespace(s,n);Qa(e,r[0].length),Xa(e);const l=qa(e),c=e.source;e.options.isPreTag(s)&&(e.inPre=!0);let a=Ha(e,t);0===t&&!e.inVPre&&a.some((e=>7===e.type&&"pre"===e.name))&&(e.inVPre=!0,T(e,l),e.source=c,a=Ha(e,t).filter((e=>"v-pre"!==e.name)));let u=!1;if(0===e.source.length?tu(e,9):(u=Za(e.source,"/>"),1===t&&u&&tu(e,4),Qa(e,u?2:1)),1===t)return;let f=0;return e.inVPre||("slot"===s?f=2:"template"===s?a.some((e=>7===e.type&&ja(e.name)))&&(f=3):function(e,t,n){const o=n.options;if(o.isCustomElement(e))return!1;if("component"===e||/^[A-Z]/.test(e)||sa(e)||o.isBuiltInComponent&&o.isBuiltInComponent(e)||o.isNativeTag&&!o.isNativeTag(e))return!0;for(let e=0;e<t.length;e++){const o=t[e];if(6===o.type){if("is"===o.name&&o.value){if(o.value.content.startsWith("vue:"))return!0;if(Na("COMPILER_IS_ON_ELEMENT",n,o.loc))return!0}}else{if("is"===o.name)return!0;if("bind"===o.name&&ya(o.arg,"is")&&Na("COMPILER_IS_ON_ELEMENT",n,o.loc))return!0}}}(s,a,e)&&(f=1)),{type:1,ns:i,tag:s,tagType:f,props:a,isSelfClosing:u,children:[],loc:Ja(e,o),codegenNode:void 0}}function Ha(e,t){const n=[],o=new Set;for(;e.source.length>0&&!Za(e.source,">")&&!Za(e.source,"/>");){if(Za(e.source,"/")){tu(e,22),Qa(e,1),Xa(e);continue}1===t&&tu(e,3);const r=za(e,o);6===r.type&&r.value&&"class"===r.name&&(r.value.content=r.value.content.replace(/\s+/g," ").trim()),0===t&&n.push(r),/^[^\t\r\n\f />]/.test(e.source)&&tu(e,15),Xa(e)}return n}function za(e,t){const n=qa(e),o=/^[^\t\r\n\f />][^\t\r\n\f />=]*/.exec(e.source)[0];t.has(o)&&tu(e,2),t.add(o),"="===o[0]&&tu(e,19);{const t=/["'<]/g;let n;for(;n=t.exec(o);)tu(e,17,n.index)}let r;Qa(e,o.length),/^[\t\r\n\f ]*=/.test(e.source)&&(Xa(e),Qa(e,1),Xa(e),r=function(e){const t=qa(e);let n;const o=e.source[0],r='"'===o||"'"===o;if(r){Qa(e,1);const t=e.source.indexOf(o);-1===t?n=Ya(e,e.source.length,4):(n=Ya(e,t,4),Qa(e,1))}else{const t=/^[^\t\r\n\f >]+/.exec(e.source);if(!t)return;const o=/["'<=`]/g;let r;for(;r=o.exec(t[0]);)tu(e,18,r.index);n=Ya(e,t[0].length,4)}return{content:n,isQuoted:r,loc:Ja(e,t)}}(e),r||tu(e,13));const s=Ja(e,n);if(!e.inVPre&&/^(v-[A-Za-z0-9-]|:|\.|@|#)/.test(o)){const t=/(?:^v-([a-z0-9-]+))?(?:(?::|^\.|^@|^#)(\[[^\]]+\]|[^\.]+))?(.+)?$/i.exec(o);let i,l=Za(o,"."),c=t[1]||(l||Za(o,":")?"bind":Za(o,"@")?"on":"slot");if(t[2]){const r="slot"===c,s=o.lastIndexOf(t[2]),l=Ja(e,eu(e,n,s),eu(e,n,s+t[2].length+(r&&t[3]||"").length));let a=t[2],u=!0;a.startsWith("[")?(u=!1,a.endsWith("]")?a=a.slice(1,a.length-1):(tu(e,27),a=a.slice(1))):r&&(a+=t[3]||""),i={type:4,content:a,isStatic:u,constType:u?3:0,loc:l}}if(r&&r.isQuoted){const e=r.loc;e.start.offset++,e.start.column++,e.end=da(e.start,r.content),e.source=e.source.slice(1,-1)}const a=t[3]?t[3].slice(1).split("."):[];return l&&a.push("prop"),"bind"===c&&i&&a.includes("sync")&&Na("COMPILER_V_BIND_SYNC",e,0,i.loc.source)&&(c="model",a.splice(a.indexOf("sync"),1)),{type:7,name:c,exp:r&&{type:4,content:r.content,isStatic:!1,constType:0,loc:r.loc},arg:i,modifiers:a,loc:s}}return!e.inVPre&&Za(o,"v-")&&tu(e,26),{type:6,name:o,value:r&&{type:2,content:r.content,loc:r.loc},loc:s}}function Wa(e,t){const[n,o]=e.options.delimiters,r=e.source.indexOf(o,n.length);if(-1===r)return void tu(e,25);const s=qa(e);Qa(e,n.length);const i=qa(e),l=qa(e),c=r-n.length,a=e.source.slice(0,c),u=Ya(e,c,t),f=u.trim(),p=u.indexOf(f);return p>0&&ha(i,a,p),ha(l,a,c-(u.length-f.length-p)),Qa(e,o.length),{type:5,content:{type:4,isStatic:!1,constType:0,content:f,loc:Ja(e,i,l)},loc:Ja(e,s)}}function Ka(e,t){const n=3===t?["]]>"]:["<",e.options.delimiters[0]];let o=e.source.length;for(let t=0;t<n.length;t++){const r=e.source.indexOf(n[t],1);-1!==r&&o>r&&(o=r)}const r=qa(e);return{type:2,content:Ya(e,o,t),loc:Ja(e,r)}}function Ya(e,t,n){const o=e.source.slice(0,t);return Qa(e,t),2!==n&&3!==n&&o.includes("&")?e.options.decodeEntities(o,4===n):o}function qa(e){const{column:t,line:n,offset:o}=e;return{column:t,line:n,offset:o}}function Ja(e,t,n){return{start:t,end:n=n||qa(e),source:e.originalSource.slice(t.offset,n.offset)}}function Ga(e){return e[e.length-1]}function Za(e,t){return e.startsWith(t)}function Qa(e,t){const{source:n}=e;ha(e,n,t),e.source=n.slice(t)}function Xa(e){const t=/^[\t\r\n\f ]+/.exec(e.source);t&&Qa(e,t[0].length)}function eu(e,t,n){return da(t,e.originalSource.slice(t.offset,n),n)}function tu(e,t,n,o=qa(e)){n&&(o.offset+=n,o.column+=n),e.options.onError(ic(t,{start:o,end:o,source:""}))}function nu(e,t,n){const o=e.source;switch(t){case 0:if(Za(o,"</"))for(let e=n.length-1;e>=0;--e)if(ou(o,n[e].tag))return!0;break;case 1:case 2:{const e=Ga(n);if(e&&ou(o,e.tag))return!0;break}case 3:if(Za(o,"]]>"))return!0}return!o}function ou(e,t){return Za(e,"</")&&e.slice(2,2+t.length).toLowerCase()===t.toLowerCase()&&/[\t\r\n\f />]/.test(e[2+t.length]||">")}function ru(e,t){iu(e,t,su(e,e.children[0]))}function su(e,t){const{children:n}=e;return 1===n.length&&1===t.type&&!wa(t)}function iu(e,t,n=!1){const{children:o}=e,r=o.length;let s=0;for(let e=0;e<o.length;e++){const r=o[e];if(1===r.type&&0===r.tagType){const e=n?0:lu(r,t);if(e>0){if(e>=2){r.codegenNode.patchFlag="-1",r.codegenNode=t.hoist(r.codegenNode),s++;continue}}else{const e=r.codegenNode;if(13===e.type){const n=pu(e);if((!n||512===n||1===n)&&uu(r,t)>=2){const n=fu(r);n&&(e.props=t.hoist(n))}e.dynamicProps&&(e.dynamicProps=t.hoist(e.dynamicProps))}}}else 12===r.type&&lu(r.content,t)>=2&&(r.codegenNode=t.hoist(r.codegenNode),s++);if(1===r.type){const e=1===r.tagType;e&&t.scopes.vSlot++,iu(r,t),e&&t.scopes.vSlot--}else if(11===r.type)iu(r,t,1===r.children.length);else if(9===r.type)for(let e=0;e<r.branches.length;e++)iu(r.branches[e],t,1===r.branches[e].children.length)}s&&t.transformHoist&&t.transformHoist(o,t,e),s&&s===r&&1===e.type&&0===e.tagType&&e.codegenNode&&13===e.codegenNode.type&&N(e.codegenNode.children)&&(e.codegenNode.children=t.hoist(Jc(e.codegenNode.children)))}function lu(e,t){const{constantCache:n}=t;switch(e.type){case 1:if(0!==e.tagType)return 0;const o=n.get(e);if(void 0!==o)return o;const r=e.codegenNode;if(13!==r.type)return 0;if(r.isBlock&&"svg"!==e.tag&&"foreignObject"!==e.tag)return 0;if(pu(r))return n.set(e,0),0;{let o=3;const s=uu(e,t);if(0===s)return n.set(e,0),0;s<o&&(o=s);for(let r=0;r<e.children.length;r++){const s=lu(e.children[r],t);if(0===s)return n.set(e,0),0;s<o&&(o=s)}if(o>1)for(let r=0;r<e.props.length;r++){const s=e.props[r];if(7===s.type&&"bind"===s.name&&s.exp){const r=lu(s.exp,t);if(0===r)return n.set(e,0),0;r<o&&(o=r)}}if(r.isBlock){for(let t=0;t<e.props.length;t++)if(7===e.props[t].type)return n.set(e,0),0;t.removeHelper(pc),t.removeHelper(xa(t.inSSR,r.isComponent)),r.isBlock=!1,t.helper(Sa(t.inSSR,r.isComponent))}return n.set(e,o),o}case 2:case 3:return 3;case 9:case 11:case 10:default:return 0;case 5:case 12:return lu(e.content,t);case 4:return e.constType;case 8:let s=3;for(let n=0;n<e.children.length;n++){const o=e.children[n];if(M(o)||R(o))continue;const r=lu(o,t);if(0===r)return 0;r<s&&(s=r)}return s}}const cu=new Set([Ac,Nc,$c,Lc]);function au(e,t){if(14===e.type&&!M(e.callee)&&cu.has(e.callee)){const n=e.arguments[0];if(4===n.type)return lu(n,t);if(14===n.type)return au(n,t)}return 0}function uu(e,t){let n=3;const o=fu(e);if(o&&15===o.type){const{properties:e}=o;for(let o=0;o<e.length;o++){const{key:r,value:s}=e[o],i=lu(r,t);if(0===i)return i;let l;if(i<n&&(n=i),l=4===s.type?lu(s,t):14===s.type?au(s,t):0,0===l)return l;l<n&&(n=l)}}return n}function fu(e){const t=e.codegenNode;if(13===t.type)return t.props}function pu(e){const t=e.patchFlag;return t?parseInt(t,10):void 0}function du(e,t){const n=function(e,{filename:t="",prefixIdentifiers:n=!1,hoistStatic:o=!1,cacheHandlers:r=!1,nodeTransforms:s=[],directiveTransforms:i={},transformHoist:l=null,isBuiltInComponent:c=S,isCustomElement:a=S,expressionPlugins:u=[],scopeId:f=null,slotted:p=!0,ssr:d=!1,inSSR:h=!1,ssrCssVars:g="",bindingMetadata:m=_,inline:y=!1,isTS:v=!1,onError:b=rc,onWarn:w=sc,compatConfig:x}){const E=t.replace(/\?.*$/,"").match(/([^/\\]+)\.\w+$/),C={selfName:E&&Z(q(E[1])),prefixIdentifiers:n,hoistStatic:o,cacheHandlers:r,nodeTransforms:s,directiveTransforms:i,transformHoist:l,isBuiltInComponent:c,isCustomElement:a,expressionPlugins:u,scopeId:f,slotted:p,ssr:d,inSSR:h,ssrCssVars:g,bindingMetadata:m,inline:y,isTS:v,onError:b,onWarn:w,compatConfig:x,root:e,helpers:new Map,components:new Set,directives:new Set,hoists:[],imports:[],constantCache:new Map,temps:0,cached:0,identifiers:Object.create(null),scopes:{vFor:0,vSlot:0,vPre:0,vOnce:0},parent:null,currentNode:e,childIndex:0,inVOnce:!1,helper(e){const t=C.helpers.get(e)||0;return C.helpers.set(e,t+1),e},removeHelper(e){const t=C.helpers.get(e);if(t){const n=t-1;n?C.helpers.set(e,n):C.helpers.delete(e)}},helperString:e=>`_${Kc[C.helper(e)]}`,replaceNode(e){C.parent.children[C.childIndex]=C.currentNode=e},removeNode(e){const t=C.parent.children,n=e?t.indexOf(e):C.currentNode?C.childIndex:-1;e&&e!==C.currentNode?C.childIndex>n&&(C.childIndex--,C.onNodeRemoved()):(C.currentNode=null,C.onNodeRemoved()),C.parent.children.splice(n,1)},onNodeRemoved:()=>{},addIdentifiers(e){},removeIdentifiers(e){},hoist(e){M(e)&&(e=Qc(e)),C.hoists.push(e);const t=Qc(`_hoisted_${C.hoists.length}`,!1,e.loc,2);return t.hoisted=e,t},cache:(e,t=!1)=>function(e,t,n=!1){return{type:20,index:e,value:t,isVNode:n,loc:Yc}}(C.cached++,e,t)};return C.filters=new Set,C}(e,t);hu(e,n),t.hoistStatic&&ru(e,n),t.ssr||function(e,t){const{helper:n}=t,{children:o}=e;if(1===o.length){const n=o[0];if(su(e,n)&&n.codegenNode){const o=n.codegenNode;13===o.type&&Ia(o,t),e.codegenNode=o}else e.codegenNode=n}else if(o.length>1){let o=64;e.codegenNode=qc(t,n(lc),void 0,e.children,o+"",void 0,void 0,!0,void 0,!1)}}(e,n),e.helpers=[...n.helpers.keys()],e.components=[...n.components],e.directives=[...n.directives],e.imports=n.imports,e.hoists=n.hoists,e.temps=n.temps,e.cached=n.cached,e.filters=[...n.filters]}function hu(e,t){t.currentNode=e;const{nodeTransforms:n}=t,o=[];for(let r=0;r<n.length;r++){const s=n[r](e,t);if(s&&(N(s)?o.push(...s):o.push(s)),!t.currentNode)return;e=t.currentNode}switch(e.type){case 3:t.ssr||t.helper(yc);break;case 5:t.ssr||t.helper(Ic);break;case 9:for(let n=0;n<e.branches.length;n++)hu(e.branches[n],t);break;case 10:case 11:case 1:case 0:!function(e,t){let n=0;const o=()=>{n--};for(;n<e.children.length;n++){const r=e.children[n];M(r)||(t.parent=e,t.childIndex=n,t.onNodeRemoved=o,hu(r,t))}}(e,t)}t.currentNode=e;let r=o.length;for(;r--;)o[r]()}function gu(e,t){const n=M(e)?t=>t===e:t=>e.test(t);return(e,o)=>{if(1===e.type){const{props:r}=e;if(3===e.tagType&&r.some(ba))return;const s=[];for(let i=0;i<r.length;i++){const l=r[i];if(7===l.type&&n(l.name)){r.splice(i,1),i--;const n=t(e,l,o);n&&s.push(n)}}return s}}}const mu="/*#__PURE__*/",yu=e=>`${Kc[e]}: _${Kc[e]}`;function vu(e,t,{helper:n,push:o,newline:r,isTS:s}){const i=n("filter"===t?xc:"component"===t?_c:Sc);for(let n=0;n<e.length;n++){let l=e[n];const c=l.endsWith("__self");c&&(l=l.slice(0,-6)),o(`const ${Ta(l,t)} = ${i}(${JSON.stringify(l)}${c?", true":""})${s?"!":""}`),n<e.length-1&&r()}}function bu(e,t){const n=e.length>3||!1;t.push("["),n&&t.indent(),_u(e,t,n),n&&t.deindent(),t.push("]")}function _u(e,t,n=!1,o=!0){const{push:r,newline:s}=t;for(let i=0;i<e.length;i++){const l=e[i];M(l)?r(l):N(l)?bu(l,t):wu(l,t),i<e.length-1&&(n?(o&&r(","),s()):o&&r(", "))}}function wu(e,t){if(M(e))t.push(e);else if(R(e))t.push(t.helper(e));else switch(e.type){case 1:case 9:case 11:case 12:wu(e.codegenNode,t);break;case 2:!function(e,t){t.push(JSON.stringify(e.content),e)}(e,t);break;case 4:Su(e,t);break;case 5:!function(e,t){const{push:n,helper:o,pure:r}=t;r&&n(mu),n(`${o(Ic)}(`),wu(e.content,t),n(")")}(e,t);break;case 8:xu(e,t);break;case 3:!function(e,t){const{push:n,helper:o,pure:r}=t;r&&n(mu),n(`${o(yc)}(${JSON.stringify(e.content)})`,e)}(e,t);break;case 13:!function(e,t){const{push:n,helper:o,pure:r}=t,{tag:s,props:i,children:l,patchFlag:c,dynamicProps:a,directives:u,isBlock:f,disableTracking:p,isComponent:d}=e;u&&n(o(Ec)+"("),f&&n(`(${o(pc)}(${p?"true":""}), `),r&&n(mu);n(o(f?xa(t.inSSR,d):Sa(t.inSSR,d))+"(",e),_u(function(e){let t=e.length;for(;t--&&null==e[t];);return e.slice(0,t+1).map((e=>e||"null"))}([s,i,l,c,a]),t),n(")"),f&&n(")"),u&&(n(", "),wu(u,t),n(")"))}(e,t);break;case 14:!function(e,t){const{push:n,helper:o,pure:r}=t,s=M(e.callee)?e.callee:o(e.callee);r&&n(mu),n(s+"(",e),_u(e.arguments,t),n(")")}(e,t);break;case 15:!function(e,t){const{push:n,indent:o,deindent:r,newline:s}=t,{properties:i}=e;if(!i.length)return void n("{}",e);const l=i.length>1||!1;n(l?"{":"{ "),l&&o();for(let e=0;e<i.length;e++){const{key:o,value:r}=i[e];Eu(o,t),n(": "),wu(r,t),e<i.length-1&&(n(","),s())}l&&r(),n(l?"}":" }")}(e,t);break;case 17:!function(e,t){bu(e.elements,t)}(e,t);break;case 18:!function(e,t){const{push:n,indent:o,deindent:r}=t,{params:s,returns:i,body:l,newline:c,isSlot:a}=e;a&&n(`_${Kc[jc]}(`),n("(",e),N(s)?_u(s,t):s&&wu(s,t),n(") => "),(c||l)&&(n("{"),o()),i?(c&&n("return "),N(i)?bu(i,t):wu(i,t)):l&&wu(l,t),(c||l)&&(r(),n("}")),a&&(e.isNonScopedSlot&&n(", undefined, true"),n(")"))}(e,t);break;case 19:!function(e,t){const{test:n,consequent:o,alternate:r,newline:s}=e,{push:i,indent:l,deindent:c,newline:a}=t;if(4===n.type){const e=!la(n.content);e&&i("("),Su(n,t),e&&i(")")}else i("("),wu(n,t),i(")");s&&l(),t.indentLevel++,s||i(" "),i("? "),wu(o,t),t.indentLevel--,s&&a(),s||i(" "),i(": ");const u=19===r.type;u||t.indentLevel++,wu(r,t),u||t.indentLevel--,s&&c(!0)}(e,t);break;case 20:!function(e,t){const{push:n,helper:o,indent:r,deindent:s,newline:i}=t;n(`_cache[${e.index}] || (`),e.isVNode&&(r(),n(`${o(Vc)}(-1),`),i()),n(`_cache[${e.index}] = `),wu(e.value,t),e.isVNode&&(n(","),i(),n(`${o(Vc)}(1),`),i(),n(`_cache[${e.index}]`),s()),n(")")}(e,t);break;case 21:_u(e.body,t,!0,!1)}}function Su(e,t){const{content:n,isStatic:o}=e;t.push(o?JSON.stringify(n):n,e)}function xu(e,t){for(let n=0;n<e.children.length;n++){const o=e.children[n];M(o)?t.push(o):wu(o,t)}}function Eu(e,t){const{push:n}=t;8===e.type?(n("["),xu(e,t),n("]")):e.isStatic?n(la(e.content)?e.content:JSON.stringify(e.content),e):n(`[${e.content}]`,e)}new RegExp("\\b"+"do,if,for,let,new,try,var,case,else,with,await,break,catch,class,const,super,throw,while,yield,delete,export,import,return,switch,default,extends,finally,continue,debugger,function,arguments,typeof,void".split(",").join("\\b|\\b")+"\\b");const Cu=gu(/^(if|else|else-if)$/,((e,t,n)=>function(e,t,n,o){if(!("else"===t.name||t.exp&&t.exp.content.trim())){const o=t.exp?t.exp.loc:e.loc;n.onError(ic(28,t.loc)),t.exp=Qc("true",!1,o)}if("if"===t.name){const r=ku(e,t),s={type:9,loc:e.loc,branches:[r]};if(n.replaceNode(s),o)return o(s,r,!0)}else{const r=n.parent.children;let s=r.indexOf(e);for(;s-- >=-1;){const i=r[s];if(!i||2!==i.type||i.content.trim().length){if(i&&9===i.type){"else-if"===t.name&&void 0===i.branches[i.branches.length-1].condition&&n.onError(ic(30,e.loc)),n.removeNode();const r=ku(e,t);i.branches.push(r);const s=o&&o(i,r,!1);hu(r,n),s&&s(),n.currentNode=null}else n.onError(ic(30,e.loc));break}n.removeNode(i)}}}(e,t,n,((e,t,o)=>{const r=n.parent.children;let s=r.indexOf(e),i=0;for(;s-- >=0;){const e=r[s];e&&9===e.type&&(i+=e.branches.length)}return()=>{if(o)e.codegenNode=Tu(t,i,n);else{const o=function(e){for(;;)if(19===e.type){if(19!==e.alternate.type)return e;e=e.alternate}else 20===e.type&&(e=e.value)}(e.codegenNode);o.alternate=Tu(t,i+e.branches.length-1,n)}}}))));function ku(e,t){const n=3===e.tagType;return{type:10,loc:e.loc,condition:"else"===t.name?void 0:t.exp,children:n&&!ga(e,"for")?e.children:[e],userKey:ma(e,"key"),isTemplateIf:n}}function Tu(e,t,n){return e.condition?na(e.condition,Iu(e,t,n),ea(n.helper(yc),['""',"true"])):Iu(e,t,n)}function Iu(e,t,n){const{helper:o}=n,r=Zc("key",Qc(`${t}`,!1,Yc,2)),{children:s}=e,i=s[0];if(1!==s.length||1!==i.type){if(1===s.length&&11===i.type){const e=i.codegenNode;return ka(e,r,n),e}{let t=64;return qc(n,o(lc),Gc([r]),s,t+"",void 0,void 0,!0,!1,!1,e.loc)}}{const e=i.codegenNode,t=14===(l=e).type&&l.callee===zc?l.arguments[1].returns:l;return 13===t.type&&Ia(t,n),ka(t,r,n),e}var l}const Ou=gu("for",((e,t,n)=>{const{helper:o,removeHelper:r}=n;return function(e,t,n,o){if(!t.exp)return void n.onError(ic(31,t.loc));const r=Lu(t.exp);if(!r)return void n.onError(ic(32,t.loc));const{addIdentifiers:s,removeIdentifiers:i,scopes:l}=n,{source:c,value:a,key:u,index:f}=r,p={type:11,loc:t.loc,source:c,valueAlias:a,keyAlias:u,objectIndexAlias:f,parseResult:r,children:_a(e)?e.children:[e]};n.replaceNode(p),l.vFor++;const d=o&&o(p);return()=>{l.vFor--,d&&d()}}(e,t,n,(t=>{const s=ea(o(Cc),[t.source]),i=_a(e),l=ga(e,"memo"),c=ma(e,"key"),a=c&&(6===c.type?Qc(c.value.content,!0):c.exp),u=c?Zc("key",a):null,f=4===t.source.type&&t.source.constType>0,p=f?64:c?128:256;return t.codegenNode=qc(n,o(lc),void 0,s,p+"",void 0,void 0,!0,!f,!1,e.loc),()=>{let c;const{children:p}=t,d=1!==p.length||1!==p[0].type,h=wa(e)?e:i&&1===e.children.length&&wa(e.children[0])?e.children[0]:null;if(h?(c=h.codegenNode,i&&u&&ka(c,u,n)):d?c=qc(n,o(lc),u?Gc([u]):void 0,e.children,"64",void 0,void 0,!0,void 0,!1):(c=p[0].codegenNode,i&&u&&ka(c,u,n),c.isBlock!==!f&&(c.isBlock?(r(pc),r(xa(n.inSSR,c.isComponent))):r(Sa(n.inSSR,c.isComponent))),c.isBlock=!f,c.isBlock?(o(pc),o(xa(n.inSSR,c.isComponent))):o(Sa(n.inSSR,c.isComponent))),l){const e=ta(Bu(t.parseResult,[Qc("_cached")]));e.body={type:21,body:[Xc(["const _memo = (",l.exp,")"]),Xc(["if (_cached",...a?[" && _cached.key === ",a]:[],` && ${n.helperString(Wc)}(_cached, _memo)) return _cached`]),Xc(["const _item = ",c]),Qc("_item.memo = _memo"),Qc("return _item")],loc:Yc},s.arguments.push(e,Qc("_cache"),Qc(String(n.cached++)))}else s.arguments.push(ta(Bu(t.parseResult),c,!0))}}))})),Au=/([\s\S]*?)\s+(?:in|of)\s+([\s\S]*)/,Nu=/,([^,\}\]]*)(?:,([^,\}\]]*))?$/,$u=/^\(|\)$/g;function Lu(e,t){const n=e.loc,o=e.content,r=o.match(Au);if(!r)return;const[,s,i]=r,l={source:Pu(n,i.trim(),o.indexOf(i,s.length)),value:void 0,key:void 0,index:void 0};let c=s.trim().replace($u,"").trim();const a=s.indexOf(c),u=c.match(Nu);if(u){c=c.replace(Nu,"").trim();const e=u[1].trim();let t;if(e&&(t=o.indexOf(e,a+c.length),l.key=Pu(n,e,t)),u[2]){const r=u[2].trim();r&&(l.index=Pu(n,r,o.indexOf(r,l.key?t+e.length:a+c.length)))}}return c&&(l.value=Pu(n,c,a)),l}function Pu(e,t,n){return Qc(t,!1,pa(e,n,t.length))}function Bu({value:e,key:t,index:n},o=[]){return function(e){let t=e.length;for(;t--&&!e[t];);return e.slice(0,t+1).map(((e,t)=>e||Qc("_".repeat(t+1),!1)))}([e,t,n,...o])}const Mu=Qc("undefined",!1),Ru=(e,t)=>{if(1===e.type&&(1===e.tagType||3===e.tagType)){const n=ga(e,"slot");if(n)return n.exp,t.scopes.vSlot++,()=>{t.scopes.vSlot--}}},Vu=(e,t,n)=>ta(e,t,!1,!0,t.length?t[0].loc:n);function Fu(e,t,n=Vu){t.helper(jc);const{children:o,loc:r}=e,s=[],i=[];let l=t.scopes.vSlot>0||t.scopes.vFor>0;const c=ga(e,"slot",!0);if(c){const{arg:e,exp:t}=c;e&&!oa(e)&&(l=!0),s.push(Zc(e||Qc("default",!0),n(t,o,r)))}let a=!1,u=!1;const f=[],p=new Set;for(let e=0;e<o.length;e++){const r=o[e];let d;if(!_a(r)||!(d=ga(r,"slot",!0))){3!==r.type&&f.push(r);continue}if(c){t.onError(ic(37,d.loc));break}a=!0;const{children:h,loc:g}=r,{arg:m=Qc("default",!0),exp:y,loc:v}=d;let b;oa(m)?b=m?m.content:"default":l=!0;const _=n(y,h,g);let w,S,x;if(w=ga(r,"if"))l=!0,i.push(na(w.exp,Uu(m,_),Mu));else if(S=ga(r,/^else(-if)?$/,!0)){let n,r=e;for(;r--&&(n=o[r],3===n.type););if(n&&_a(n)&&ga(n,"if")){o.splice(e,1),e--;let t=i[i.length-1];for(;19===t.alternate.type;)t=t.alternate;t.alternate=S.exp?na(S.exp,Uu(m,_),Mu):Uu(m,_)}else t.onError(ic(30,S.loc))}else if(x=ga(r,"for")){l=!0;const e=x.parseResult||Lu(x.exp);e?i.push(ea(t.helper(Cc),[e.source,ta(Bu(e),Uu(m,_),!0)])):t.onError(ic(32,x.loc))}else{if(b){if(p.has(b)){t.onError(ic(38,v));continue}p.add(b),"default"===b&&(u=!0)}s.push(Zc(m,_))}}if(!c){const e=(e,o)=>{const s=n(e,o,r);return t.compatConfig&&(s.isNonScopedSlot=!0),Zc("default",s)};a?f.length&&f.some((e=>Du(e)))&&(u?t.onError(ic(39,f[0].loc)):s.push(e(void 0,f))):s.push(e(void 0,o))}const d=l?2:ju(e.children)?3:1;let h=Gc(s.concat(Zc("_",Qc(d+"",!1))),r);return i.length&&(h=ea(t.helper(Tc),[h,Jc(i)])),{slots:h,hasDynamicSlots:l}}function Uu(e,t){return Gc([Zc("name",e),Zc("fn",t)])}function ju(e){for(let t=0;t<e.length;t++){const n=e[t];switch(n.type){case 1:if(2===n.tagType||ju(n.children))return!0;break;case 9:if(ju(n.branches))return!0;break;case 10:case 11:if(ju(n.children))return!0}}return!1}function Du(e){return 2!==e.type&&12!==e.type||(2===e.type?!!e.content.trim():Du(e.content))}const Hu=new WeakMap,zu=(e,t)=>function(){if(1!==(e=t.currentNode).type||0!==e.tagType&&1!==e.tagType)return;const{tag:n,props:o}=e,r=1===e.tagType;let s=r?function(e,t,n=!1){let{tag:o}=e;const r=qu(o),s=ma(e,"is");if(s)if(r||Aa("COMPILER_IS_ON_ELEMENT",t)){const e=6===s.type?s.value&&Qc(s.value.content,!0):s.exp;if(e)return ea(t.helper(wc),[e])}else 6===s.type&&s.value.content.startsWith("vue:")&&(o=s.value.content.slice(4));const i=!r&&ga(e,"is");if(i&&i.exp)return ea(t.helper(wc),[i.exp]);const l=sa(o)||t.isBuiltInComponent(o);return l?(n||t.helper(l),l):(t.helper(_c),t.components.add(o),Ta(o,"component"))}(e,t):`"${n}"`;const i=V(s)&&s.callee===wc;let l,c,a,u,f,p,d=0,h=i||s===cc||s===ac||!r&&("svg"===n||"foreignObject"===n);if(o.length>0){const n=Wu(e,t,void 0,r,i);l=n.props,d=n.patchFlag,f=n.dynamicPropNames;const o=n.directives;p=o&&o.length?Jc(o.map((e=>function(e,t){const n=[],o=Hu.get(e);o?n.push(t.helperString(o)):(t.helper(Sc),t.directives.add(e.name),n.push(Ta(e.name,"directive")));const{loc:r}=e;if(e.exp&&n.push(e.exp),e.arg&&(e.exp||n.push("void 0"),n.push(e.arg)),Object.keys(e.modifiers).length){e.arg||(e.exp||n.push("void 0"),n.push("void 0"));const t=Qc("true",!1,r);n.push(Gc(e.modifiers.map((e=>Zc(e,t))),r))}return Jc(n,e.loc)}(e,t)))):void 0,n.shouldUseBlock&&(h=!0)}if(e.children.length>0)if(s===uc&&(h=!0,d|=1024),r&&s!==cc&&s!==uc){const{slots:n,hasDynamicSlots:o}=Fu(e,t);c=n,o&&(d|=1024)}else if(1===e.children.length&&s!==cc){const n=e.children[0],o=n.type,r=5===o||8===o;r&&0===lu(n,t)&&(d|=1),c=r||2===o?n:e.children}else c=e.children;0!==d&&(a=String(d),f&&f.length&&(u=function(e){let t="[";for(let n=0,o=e.length;n<o;n++)t+=JSON.stringify(e[n]),n<o-1&&(t+=", ");return t+"]"}(f))),e.codegenNode=qc(t,s,l,c,a,u,p,!!h,!1,r,e.loc)};function Wu(e,t,n=e.props,o,r,s=!1){const{tag:i,loc:l,children:c}=e;let a=[];const u=[],f=[],p=c.length>0;let d=!1,h=0,g=!1,m=!1,y=!1,v=!1,b=!1,_=!1;const w=[],S=({key:e,value:n})=>{if(oa(e)){const s=e.content,i=C(s);if(!i||o&&!r||"onclick"===s.toLowerCase()||"onUpdate:modelValue"===s||z(s)||(v=!0),i&&z(s)&&(_=!0),20===n.type||(4===n.type||8===n.type)&&lu(n,t)>0)return;"ref"===s?g=!0:"class"===s?m=!0:"style"===s?y=!0:"key"===s||w.includes(s)||w.push(s),!o||"class"!==s&&"style"!==s||w.includes(s)||w.push(s)}else b=!0};for(let r=0;r<n.length;r++){const c=n[r];if(6===c.type){const{loc:e,name:n,value:o}=c;let r=!0;if("ref"===n&&(g=!0,t.scopes.vFor>0&&a.push(Zc(Qc("ref_for",!0),Qc("true")))),"is"===n&&(qu(i)||o&&o.content.startsWith("vue:")||Aa("COMPILER_IS_ON_ELEMENT",t)))continue;a.push(Zc(Qc(n,!0,pa(e,0,n.length)),Qc(o?o.content:"",r,o?o.loc:e)))}else{const{name:n,arg:r,exp:h,loc:g}=c,m="bind"===n,y="on"===n;if("slot"===n){o||t.onError(ic(40,g));continue}if("once"===n||"memo"===n)continue;if("is"===n||m&&ya(r,"is")&&(qu(i)||Aa("COMPILER_IS_ON_ELEMENT",t)))continue;if(y&&s)continue;if((m&&ya(r,"key")||y&&p&&ya(r,"vue:before-update"))&&(d=!0),m&&ya(r,"ref")&&t.scopes.vFor>0&&a.push(Zc(Qc("ref_for",!0),Qc("true"))),!r&&(m||y)){if(b=!0,h)if(a.length&&(u.push(Gc(Ku(a),l)),a=[]),m){if(Aa("COMPILER_V_BIND_OBJECT_ORDER",t)){u.unshift(h);continue}u.push(h)}else u.push({type:14,loc:g,callee:t.helper(Pc),arguments:[h]});else t.onError(ic(m?34:35,g));continue}const v=t.directiveTransforms[n];if(v){const{props:n,needRuntime:o}=v(c,e,t);!s&&n.forEach(S),a.push(...n),o&&(f.push(c),R(o)&&Hu.set(c,o))}else W(n)||(f.push(c),p&&(d=!0))}}let x;if(u.length?(a.length&&u.push(Gc(Ku(a),l)),x=u.length>1?ea(t.helper(Oc),u,l):u[0]):a.length&&(x=Gc(Ku(a),l)),b?h|=16:(m&&!o&&(h|=2),y&&!o&&(h|=4),w.length&&(h|=8),v&&(h|=32)),d||0!==h&&32!==h||!(g||_||f.length>0)||(h|=512),!t.inSSR&&x)switch(x.type){case 15:let e=-1,n=-1,o=!1;for(let t=0;t<x.properties.length;t++){const r=x.properties[t].key;oa(r)?"class"===r.content?e=t:"style"===r.content&&(n=t):r.isHandlerKey||(o=!0)}const r=x.properties[e],s=x.properties[n];o?x=ea(t.helper($c),[x]):(r&&!oa(r.value)&&(r.value=ea(t.helper(Ac),[r.value])),s&&(y||4===s.value.type&&"["===s.value.content.trim()[0]||17===s.value.type)&&(s.value=ea(t.helper(Nc),[s.value])));break;case 14:break;default:x=ea(t.helper($c),[ea(t.helper(Lc),[x])])}return{props:x,directives:f,patchFlag:h,dynamicPropNames:w,shouldUseBlock:d}}function Ku(e){const t=new Map,n=[];for(let o=0;o<e.length;o++){const r=e[o];if(8===r.key.type||!r.key.isStatic){n.push(r);continue}const s=r.key.content,i=t.get(s);i?("style"===s||"class"===s||C(s))&&Yu(i,r):(t.set(s,r),n.push(r))}return n}function Yu(e,t){17===e.value.type?e.value.elements.push(t.value):e.value=Jc([e.value,t.value],e.loc)}function qu(e){return"component"===e||"Component"===e}const Ju=/-(\w)/g,Gu=(e=>{const t=Object.create(null);return e=>t[e]||(t[e]=(e=>e.replace(Ju,((e,t)=>t?t.toUpperCase():"")))(e))})(),Zu=(e,t)=>{if(wa(e)){const{children:n,loc:o}=e,{slotName:r,slotProps:s}=function(e,t){let n,o='"default"';const r=[];for(let t=0;t<e.props.length;t++){const n=e.props[t];6===n.type?n.value&&("name"===n.name?o=JSON.stringify(n.value.content):(n.name=Gu(n.name),r.push(n))):"bind"===n.name&&ya(n.arg,"name")?n.exp&&(o=n.exp):("bind"===n.name&&n.arg&&oa(n.arg)&&(n.arg.content=Gu(n.arg.content)),r.push(n))}if(r.length>0){const{props:o,directives:s}=Wu(e,t,r,!1,!1);n=o,s.length&&t.onError(ic(36,s[0].loc))}return{slotName:o,slotProps:n}}(e,t),i=[t.prefixIdentifiers?"_ctx.$slots":"$slots",r,"{}","undefined","true"];let l=2;s&&(i[2]=s,l=3),n.length&&(i[3]=ta([],n,!1,!1,o),l=4),t.scopeId&&!t.slotted&&(l=5),i.splice(l),e.codegenNode=ea(t.helper(kc),i,o)}},Qu=/^\s*([\w$_]+|(async\s*)?\([^)]*?\))\s*=>|^\s*(async\s+)?function(?:\s+[\w$]+)?\s*\(/,Xu=(e,t,n,o)=>{const{loc:r,modifiers:s,arg:i}=e;let l;if(e.exp||s.length||n.onError(ic(35,r)),4===i.type)if(i.isStatic){let e=i.content;e.startsWith("vue:")&&(e=`vnode-${e.slice(4)}`),l=Qc(Q(q(e)),!0,i.loc)}else l=Xc([`${n.helperString(Rc)}(`,i,")"]);else l=i,l.children.unshift(`${n.helperString(Rc)}(`),l.children.push(")");let c=e.exp;c&&!c.content.trim()&&(c=void 0);let a=n.cacheHandlers&&!c&&!n.inVOnce;if(c){const e=fa(c.content),t=!(e||Qu.test(c.content)),n=c.content.includes(";");(t||a&&e)&&(c=Xc([`${t?"$event":"(...args)"} => ${n?"{":"("}`,c,n?"}":")"]))}let u={props:[Zc(l,c||Qc("() => {}",!1,r))]};return o&&(u=o(u)),a&&(u.props[0].value=n.cache(u.props[0].value)),u.props.forEach((e=>e.key.isHandlerKey=!0)),u},ef=(e,t,n)=>{const{exp:o,modifiers:r,loc:s}=e,i=e.arg;return 4!==i.type?(i.children.unshift("("),i.children.push(') || ""')):i.isStatic||(i.content=`${i.content} || ""`),r.includes("camel")&&(4===i.type?i.isStatic?i.content=q(i.content):i.content=`${n.helperString(Bc)}(${i.content})`:(i.children.unshift(`${n.helperString(Bc)}(`),i.children.push(")"))),n.inSSR||(r.includes("prop")&&tf(i,"."),r.includes("attr")&&tf(i,"^")),!o||4===o.type&&!o.content.trim()?(n.onError(ic(34,s)),{props:[Zc(i,Qc("",!0,s))]}):{props:[Zc(i,o)]}},tf=(e,t)=>{4===e.type?e.isStatic?e.content=t+e.content:e.content=`\`${t}\${${e.content}}\``:(e.children.unshift(`'${t}' + (`),e.children.push(")"))},nf=(e,t)=>{if(0===e.type||1===e.type||11===e.type||10===e.type)return()=>{const n=e.children;let o,r=!1;for(let e=0;e<n.length;e++){const t=n[e];if(va(t)){r=!0;for(let r=e+1;r<n.length;r++){const s=n[r];if(!va(s)){o=void 0;break}o||(o=n[e]=Xc([t],t.loc)),o.children.push(" + ",s),n.splice(r,1),r--}}}if(r&&(1!==n.length||0!==e.type&&(1!==e.type||0!==e.tagType||e.props.find((e=>7===e.type&&!t.directiveTransforms[e.name]))||"template"===e.tag)))for(let e=0;e<n.length;e++){const o=n[e];if(va(o)||8===o.type){const r=[];2===o.type&&" "===o.content||r.push(o),t.ssr||0!==lu(o,t)||r.push("1"),n[e]={type:12,content:o,loc:o.loc,codegenNode:ea(t.helper(vc),r)}}}}},of=new WeakSet,rf=(e,t)=>{if(1===e.type&&ga(e,"once",!0)){if(of.has(e)||t.inVOnce)return;return of.add(e),t.inVOnce=!0,t.helper(Vc),()=>{t.inVOnce=!1;const e=t.currentNode;e.codegenNode&&(e.codegenNode=t.cache(e.codegenNode,!0))}}},sf=(e,t,n)=>{const{exp:o,arg:r}=e;if(!o)return n.onError(ic(41,e.loc)),lf();const s=o.loc.source,i=4===o.type?o.content:s;if(n.bindingMetadata[s],!i.trim()||!fa(i))return n.onError(ic(42,o.loc)),lf();const l=r||Qc("modelValue",!0),c=r?oa(r)?`onUpdate:${r.content}`:Xc(['"onUpdate:" + ',r]):"onUpdate:modelValue";let a;a=Xc([(n.isTS?"($event: any)":"$event")+" => ((",o,") = $event)"]);const u=[Zc(l,e.exp),Zc(c,a)];if(e.modifiers.length&&1===t.tagType){const t=e.modifiers.map((e=>(la(e)?e:JSON.stringify(e))+": true")).join(", "),n=r?oa(r)?`${r.content}Modifiers`:Xc([r,' + "Modifiers"']):"modelModifiers";u.push(Zc(n,Qc(`{ ${t} }`,!1,e.loc,2)))}return lf(u)};function lf(e=[]){return{props:e}}const cf=/[\w).+\-_$\]]/,af=(e,t)=>{Aa("COMPILER_FILTER",t)&&(5===e.type&&uf(e.content,t),1===e.type&&e.props.forEach((e=>{7===e.type&&"for"!==e.name&&e.exp&&uf(e.exp,t)})))};function uf(e,t){if(4===e.type)ff(e,t);else for(let n=0;n<e.children.length;n++){const o=e.children[n];"object"==typeof o&&(4===o.type?ff(o,t):8===o.type?uf(e,t):5===o.type&&uf(o.content,t))}}function ff(e,t){const n=e.content;let o,r,s,i,l=!1,c=!1,a=!1,u=!1,f=0,p=0,d=0,h=0,g=[];for(s=0;s<n.length;s++)if(r=o,o=n.charCodeAt(s),l)39===o&&92!==r&&(l=!1);else if(c)34===o&&92!==r&&(c=!1);else if(a)96===o&&92!==r&&(a=!1);else if(u)47===o&&92!==r&&(u=!1);else if(124!==o||124===n.charCodeAt(s+1)||124===n.charCodeAt(s-1)||f||p||d){switch(o){case 34:c=!0;break;case 39:l=!0;break;case 96:a=!0;break;case 40:d++;break;case 41:d--;break;case 91:p++;break;case 93:p--;break;case 123:f++;break;case 125:f--}if(47===o){let e,t=s-1;for(;t>=0&&(e=n.charAt(t)," "===e);t--);e&&cf.test(e)||(u=!0)}}else void 0===i?(h=s+1,i=n.slice(0,s).trim()):m();function m(){g.push(n.slice(h,s).trim()),h=s+1}if(void 0===i?i=n.slice(0,s).trim():0!==h&&m(),g.length){for(s=0;s<g.length;s++)i=pf(i,g[s],t);e.content=i}}function pf(e,t,n){n.helper(xc);const o=t.indexOf("(");if(o<0)return n.filters.add(t),`${Ta(t,"filter")}(${e})`;{const r=t.slice(0,o),s=t.slice(o+1);return n.filters.add(r),`${Ta(r,"filter")}(${e}${")"!==s?","+s:s}`}}const df=new WeakSet,hf=(e,t)=>{if(1===e.type){const n=ga(e,"memo");if(!n||df.has(e))return;return df.add(e),()=>{const o=e.codegenNode||t.currentNode.codegenNode;o&&13===o.type&&(1!==e.tagType&&Ia(o,t),e.codegenNode=ea(t.helper(zc),[n.exp,ta(void 0,o),"_cache",String(t.cached++)]))}}};function gf(e,t={}){const n=t.onError||rc,o="module"===t.mode;!0===t.prefixIdentifiers?n(ic(46)):o&&n(ic(47)),t.cacheHandlers&&n(ic(48)),t.scopeId&&!o&&n(ic(49));const r=M(e)?function(e,t={}){const n=function(e,t){const n=T({},Pa);let o;for(o in t)n[o]=void 0===t[o]?Pa[o]:t[o];return{options:n,column:1,line:1,offset:0,originalSource:e,source:e,inPre:!1,inVPre:!1,onWarn:n.onWarn}}(e,t),o=qa(n);return function(e,t=Yc){return{type:0,children:e,helpers:[],components:[],directives:[],hoists:[],imports:[],cached:0,temps:0,codegenNode:void 0,loc:t}}(Ba(n,0,[]),Ja(n,o))}(e,t):e,[s,i]=[[rf,Cu,hf,Ou,af,Zu,zu,Ru,nf],{on:Xu,bind:ef,model:sf}];return du(r,T({},t,{prefixIdentifiers:!1,nodeTransforms:[...s,...t.nodeTransforms||[]],directiveTransforms:T({},i,t.directiveTransforms||{})})),function(e,t={}){const n=function(e,{mode:t="function",prefixIdentifiers:n="module"===t,sourceMap:o=!1,filename:r="template.vue.html",scopeId:s=null,optimizeImports:i=!1,runtimeGlobalName:l="Vue",runtimeModuleName:c="vue",ssrRuntimeModuleName:a="vue/server-renderer",ssr:u=!1,isTS:f=!1,inSSR:p=!1}){const d={mode:t,prefixIdentifiers:n,sourceMap:o,filename:r,scopeId:s,optimizeImports:i,runtimeGlobalName:l,runtimeModuleName:c,ssrRuntimeModuleName:a,ssr:u,isTS:f,inSSR:p,source:e.loc.source,code:"",column:1,line:1,offset:0,indentLevel:0,pure:!1,map:void 0,helper:e=>`_${Kc[e]}`,push(e,t){d.code+=e},indent(){h(++d.indentLevel)},deindent(e=!1){e?--d.indentLevel:h(--d.indentLevel)},newline(){h(d.indentLevel)}};function h(e){d.push("\n"+"  ".repeat(e))}return d}(e,t);t.onContextCreated&&t.onContextCreated(n);const{mode:o,push:r,prefixIdentifiers:s,indent:i,deindent:l,newline:c,scopeId:a,ssr:u}=n,f=e.helpers.length>0,p=!s&&"module"!==o;if(function(e,t){const{ssr:n,prefixIdentifiers:o,push:r,newline:s,runtimeModuleName:i,runtimeGlobalName:l,ssrRuntimeModuleName:c}=t,a=l;e.helpers.length>0&&(r(`const _Vue = ${a}\n`),e.hoists.length)&&r(`const { ${[gc,mc,yc,vc,bc].filter((t=>e.helpers.includes(t))).map(yu).join(", ")} } = _Vue\n`),function(e,t){if(!e.length)return;t.pure=!0;const{push:n,newline:o,helper:r,scopeId:s,mode:i}=t;o();for(let r=0;r<e.length;r++){const s=e[r];s&&(n(`const _hoisted_${r+1} = `),wu(s,t),o())}t.pure=!1}(e.hoists,t),s(),r("return ")}(e,n),r(`function ${u?"ssrRender":"render"}(${(u?["_ctx","_push","_parent","_attrs"]:["_ctx","_cache"]).join(", ")}) {`),i(),p&&(r("with (_ctx) {"),i(),f&&(r(`const { ${e.helpers.map(yu).join(", ")} } = _Vue`),r("\n"),c())),e.components.length&&(vu(e.components,"component",n),(e.directives.length||e.temps>0)&&c()),e.directives.length&&(vu(e.directives,"directive",n),e.temps>0&&c()),e.filters&&e.filters.length&&(c(),vu(e.filters,"filter",n),c()),e.temps>0){r("let ");for(let t=0;t<e.temps;t++)r(`${t>0?", ":""}_temp${t}`)}return(e.components.length||e.directives.length||e.temps)&&(r("\n"),c()),u||r("return "),e.codegenNode?wu(e.codegenNode,n):r("null"),p&&(l(),r("}")),l(),r("}"),{ast:e,code:n.code,preamble:"",map:n.map?n.map.toJSON():void 0}}(r,T({},t,{prefixIdentifiers:!1}))}const mf=Symbol(""),yf=Symbol(""),vf=Symbol(""),bf=Symbol(""),_f=Symbol(""),wf=Symbol(""),Sf=Symbol(""),xf=Symbol(""),Ef=Symbol(""),Cf=Symbol("");var kf;let Tf;kf={[mf]:"vModelRadio",[yf]:"vModelCheckbox",[vf]:"vModelText",[bf]:"vModelSelect",[_f]:"vModelDynamic",[wf]:"withModifiers",[Sf]:"withKeys",[xf]:"vShow",[Ef]:"Transition",[Cf]:"TransitionGroup"},Object.getOwnPropertySymbols(kf).forEach((e=>{Kc[e]=kf[e]}));const If=t("style,iframe,script,noscript",!0),Of={isVoidTag:g,isNativeTag:e=>d(e)||h(e),isPreTag:e=>"pre"===e,decodeEntities:function(e,t=!1){return Tf||(Tf=document.createElement("div")),t?(Tf.innerHTML=`<div foo="${e.replace(/"/g,"&quot;")}">`,Tf.children[0].getAttribute("foo")):(Tf.innerHTML=e,Tf.textContent)},isBuiltInComponent:e=>ra(e,"Transition")?Ef:ra(e,"TransitionGroup")?Cf:void 0,getNamespace(e,t){let n=t?t.ns:0;if(t&&2===n)if("annotation-xml"===t.tag){if("svg"===e)return 1;t.props.some((e=>6===e.type&&"encoding"===e.name&&null!=e.value&&("text/html"===e.value.content||"application/xhtml+xml"===e.value.content)))&&(n=0)}else/^m(?:[ions]|text)$/.test(t.tag)&&"mglyph"!==e&&"malignmark"!==e&&(n=0);else t&&1===n&&("foreignObject"!==t.tag&&"desc"!==t.tag&&"title"!==t.tag||(n=0));if(0===n){if("svg"===e)return 1;if("math"===e)return 2}return n},getTextMode({tag:e,ns:t}){if(0===t){if("textarea"===e||"title"===e)return 1;if(If(e))return 2}return 0}},Af=(e,t)=>{const n=u(e);return Qc(JSON.stringify(n),!1,t,3)};function Nf(e,t){return ic(e,t)}const $f=t("passive,once,capture"),Lf=t("stop,prevent,self,ctrl,shift,alt,meta,exact,middle"),Pf=t("left,right"),Bf=t("onkeyup,onkeydown,onkeypress",!0),Mf=(e,t)=>oa(e)&&"onclick"===e.content.toLowerCase()?Qc(t,!0):4!==e.type?Xc(["(",e,`) === "onClick" ? "${t}" : (`,e,")"]):e,Rf=(e,t)=>{1!==e.type||0!==e.tagType||"script"!==e.tag&&"style"!==e.tag||(t.onError(Nf(60,e.loc)),t.removeNode())},Vf=[e=>{1===e.type&&e.props.forEach(((t,n)=>{6===t.type&&"style"===t.name&&t.value&&(e.props[n]={type:7,name:"bind",arg:Qc("style",!0,t.loc),exp:Af(t.value.content,t.loc),modifiers:[],loc:t.loc})}))}],Ff={cloak:()=>({props:[]}),html:(e,t,n)=>{const{exp:o,loc:r}=e;return o||n.onError(Nf(50,r)),t.children.length&&(n.onError(Nf(51,r)),t.children.length=0),{props:[Zc(Qc("innerHTML",!0,r),o||Qc("",!0))]}},text:(e,t,n)=>{const{exp:o,loc:r}=e;return o||n.onError(Nf(52,r)),t.children.length&&(n.onError(Nf(53,r)),t.children.length=0),{props:[Zc(Qc("textContent",!0),o?lu(o,n)>0?o:ea(n.helperString(Ic),[o],r):Qc("",!0))]}},model:(e,t,n)=>{const o=sf(e,t,n);if(!o.props.length||1===t.tagType)return o;e.arg&&n.onError(Nf(55,e.arg.loc));const{tag:r}=t,s=n.isCustomElement(r);if("input"===r||"textarea"===r||"select"===r||s){let i=vf,l=!1;if("input"===r||s){const o=ma(t,"type");if(o){if(7===o.type)i=_f;else if(o.value)switch(o.value.content){case"radio":i=mf;break;case"checkbox":i=yf;break;case"file":l=!0,n.onError(Nf(56,e.loc))}}else(function(e){return e.props.some((e=>!(7!==e.type||"bind"!==e.name||e.arg&&4===e.arg.type&&e.arg.isStatic)))})(t)&&(i=_f)}else"select"===r&&(i=bf);l||(o.needRuntime=n.helper(i))}else n.onError(Nf(54,e.loc));return o.props=o.props.filter((e=>!(4===e.key.type&&"modelValue"===e.key.content))),o},on:(e,t,n)=>Xu(e,0,n,(t=>{const{modifiers:o}=e;if(!o.length)return t;let{key:r,value:s}=t.props[0];const{keyModifiers:i,nonKeyModifiers:l,eventOptionModifiers:c}=((e,t,n,o)=>{const r=[],s=[],i=[];for(let o=0;o<t.length;o++){const l=t[o];"native"===l&&Na("COMPILER_V_ON_NATIVE",n)||$f(l)?i.push(l):Pf(l)?oa(e)?Bf(e.content)?r.push(l):s.push(l):(r.push(l),s.push(l)):Lf(l)?s.push(l):r.push(l)}return{keyModifiers:r,nonKeyModifiers:s,eventOptionModifiers:i}})(r,o,n,e.loc);if(l.includes("right")&&(r=Mf(r,"onContextmenu")),l.includes("middle")&&(r=Mf(r,"onMouseup")),l.length&&(s=ea(n.helper(wf),[s,JSON.stringify(l)])),!i.length||oa(r)&&!Bf(r.content)||(s=ea(n.helper(Sf),[s,JSON.stringify(i)])),c.length){const e=c.map(Z).join("");r=oa(r)?Qc(`${r.content}${e}`,!0):Xc(["(",r,`) + "${e}"`])}return{props:[Zc(r,s)]}})),show:(e,t,n)=>{const{exp:o,loc:r}=e;return o||n.onError(Nf(58,r)),{props:[],needRuntime:n.helper(xf)}}},Uf=Object.create(null);ni((function(t,n){if(!M(t)){if(!t.nodeType)return S;t=t.innerHTML}const o=t,r=Uf[o];if(r)return r;if("#"===t[0]){const e=document.querySelector(t);t=e?e.innerHTML:""}const{code:s}=function(e,t={}){return gf(e,T({},Of,t,{nodeTransforms:[Rf,...Vf,...t.nodeTransforms||[]],directiveTransforms:T({},Ff,t.directiveTransforms||{}),transformHoist:null}))}(t,T({hoistStatic:!0,onError:void 0,onWarn:S},n)),i=new Function("Vue",s)(e);return i._rc=!0,Uf[o]=i}));const jf={create:(e,t,n)=>{const o=[...e?.settings?.customs||[],"boiler-content"],r=bt(e.getState()),s=Xl({template:'<widget v-bind="state"><boiler-content></boiler-content></widget>',computed:{state:()=>r}});return n(s),s.config.unwrapInjectedRef=!0,s.config.compilerOptions.isCustomElement=e=>o.includes(e),s.component("widget",t),s.provide("$boiler",e),s.provide("$injector",((e,t)=>{return"$injector",n={type:e,data:t},window.dispatchEvent(new CustomEvent("$injector",{detail:n}));var n})),{watch:(e,t)=>r[e]=t,mount:e=>s.mount(e),unmount:()=>s.unmount(),css:()=>{let e="";return Array.isArray(t?.styles)&&(e+=t.styles.join("")),Array.isArray(t?.extends?.styles)&&(e+=t.extends.styles.join("")),e}}},observe:e=>Object.keys(e.props||{})},Df={class:"tabs-container"},Hf={inject:["$boiler"],created(){this.$boiler.publishes("open-pad"),this.$boiler.listen("click-tab",(({tab:e})=>this.$boiler.publish("open-pad",{pad:e})))}};var zf=n(744);const Wf={inject:["$boiler"],props:{tab:String,default:Boolean},computed:{active:e=>e.requested?e.requested===e.tab:"string"==typeof e.default},data:()=>({requested:null}),created(){this.$boiler.subscribe("open-pad",(({pad:e})=>this.requested=e)),this.default&&this.open(),this.$boiler.style((e=>({display:"inline-flex",flexDirection:"row",position:"relative",alignItems:"center",marginLeft:e.matches("*:first-child")?0:"1.6em",lineHeight:"3.2em",whiteSpace:"nowrap",color:"#212121",cursor:"pointer",fontWeight:"500"})))},methods:{open(){this.$boiler.dispatch("click-tab",{tab:this.tab})}}},Kf={class:"pad"},Yf={inject:["$boiler","$injector"],props:{pad:String,default:Boolean},computed:{opened:e=>e.requested?e.requested===e.pad:e.default},data:()=>({requested:null}),created(){this.$boiler.subscribe("open-pad",(({pad:e})=>this.requested=e))},watch:{async opened(e){e&&(await this.$nextTick(),this.$injector("$size"))}}},qf={class:"c-card__header"},Jf={key:0,class:"c-card__title"},Gf={key:1,class:"c-card__subtitle"},Zf={class:"c-card__content"},Qf={props:{title:String,subtitle:String}},Xf=(0,zf.Z)(Hf,[["render",function(e,t,n,o,r,s){return ys(),xs("div",Df,[yr(e.$slots,"default",{},void 0,!0)])}],["styles",[".tabs-container[data-v-5e9a2e78]{width:100%;margin-top:32px}"]],["__scopeId","data-v-5e9a2e78"]]),ep=(0,zf.Z)(Wf,[["render",function(e,t,n,o,r,s){return ys(),xs("div",{class:f(["tab",{active:s.active}]),onClick:t[0]||(t[0]=e=>s.open())},[yr(e.$slots,"default",{},void 0,!0)],2)}],["styles",[".tab[data-v-bb9a221a]{font-weight:500;font-family:Roboto,\"Helvetica Neue\",sans-serif;letter-spacing:.5px}.tab[data-v-bb9a221a]:hover{color:#4797f2}.tab.active[data-v-bb9a221a]{color:#4797f2}.tab.active[data-v-bb9a221a]:after{height:3px}.tab[data-v-bb9a221a]:after{content:'';position:absolute;bottom:0;left:0;right:0;height:0;background-color:#4797f2;transition:all .3s linear}"]],["__scopeId","data-v-bb9a221a"]]),tp=(0,zf.Z)(Yf,[["render",function(e,t,n,o,r,s){return ir((ys(),xs("div",Kf,[yr(e.$slots,"default",{},void 0,!0)],512)),[[zl,s.opened]])}],["styles",[".pad[data-v-f37d67be]{border-top:1px solid #e0e0e0;padding-top:32px}"]],["__scopeId","data-v-f37d67be"]]),np={extends:(0,zf.Z)(Qf,[["render",function(e,t,n,o,r,s){return ys(),xs("div",{class:f(["c-card",e.classes])},[Ns("div",qf,[n.title?(ys(),xs("p",Jf,v(n.title),1)):Rs("v-if",!0),n.subtitle?(ys(),xs("p",Gf,v(n.subtitle),1)):Rs("v-if",!0)]),Ns("div",Zf,[yr(e.$slots,"default")])],2)}],["styles",[".c-card{border:1px solid #e0e0e0;border-radius:8px;overflow:hidden;padding:18px 24px 24px 24px;display:block;text-decoration:inherit;color:inherit}.c-card__header{margin-bottom:26px}.c-card__title{line-height:25px;font-size:20px;margin:0}.c-card__subtitle{font-size:14px;line-height:20px;color:#707070;margin:0}"]]])},op=(e={},t={})=>{const n=(()=>{let e,t={},n=()=>{};return{plugin:t=>e=t,store:e=>n=e,setup:e=>Object.assign(t,e),mount(o,r){if(!e)throw new Error("To mount a component we need a plugin");const s=r;s.extends&&(s.props={...s.props,...s.extends.props}),customElements.define(o,ln(e,s,n,t))}}})();n.plugin(jf),n.store((e=>t=>t.provide("$bus",e))((()=>{const e={},t={};return{add(t){if(!t.name)throw new Error('Module should have a mandatory "name" property');e[t.name]=(({state:e={},actions:t={}})=>({state:bt(e),actions:t}))(t)},watch:(t,n="*")=>"*"===n?e[t].state:e[t].state[n],commit(n,o,r){e[n].state[o]=r,(Gt([n,o],t)||[]).forEach((e=>e(r)))},dispatch:(t,n,o)=>e[t].actions[n].call(e[t],o,e),listen(e,n,o){Jt(e,t)||(t[e]={}),Jt(n,t[e])||(t[e][n]=[]),t[e][n].push(o)}}})())),n.setup({customs:Object.keys(e)});for(const t in e)n.mount(t,e[t]);return Qt(t)}})();var r=o.Zb,s=o.vh,i=o.OK,l=o.mQ,c=o.ZP;

/***/ }),

/***/ 900:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Z: () => (/* binding */ normalizeComponent)
/* harmony export */ });
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent(
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier /* server only */,
  shadowMode /* vue-cli only */
) {
  // Vue.extend constructor export interop
  var options =
    typeof scriptExports === 'function' ? scriptExports.options : scriptExports

  // render functions
  if (render) {
    options.render = render
    options.staticRenderFns = staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = 'data-v-' + scopeId
  }

  var hook
  if (moduleIdentifier) {
    // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = shadowMode
      ? function () {
          injectStyles.call(
            this,
            (options.functional ? this.parent : this).$root.$options.shadowRoot
          )
        }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functional component in vue file
      var originalRender = options.render
      options.render = function renderWithStyleInjection(h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing ? [].concat(existing, hook) : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}


/***/ }),

/***/ 144:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ZP: () => (/* binding */ Vue)
/* harmony export */ });
/* unused harmony exports EffectScope, computed, customRef, defineAsyncComponent, defineComponent, del, effectScope, getCurrentInstance, getCurrentScope, h, inject, isProxy, isReactive, isReadonly, isRef, isShallow, markRaw, mergeDefaults, nextTick, onActivated, onBeforeMount, onBeforeUnmount, onBeforeUpdate, onDeactivated, onErrorCaptured, onMounted, onRenderTracked, onRenderTriggered, onScopeDispose, onServerPrefetch, onUnmounted, onUpdated, provide, proxyRefs, reactive, readonly, ref, set, shallowReactive, shallowReadonly, shallowRef, toRaw, toRef, toRefs, triggerRef, unref, useAttrs, useCssModule, useCssVars, useListeners, useSlots, version, watch, watchEffect, watchPostEffect, watchSyncEffect */
/*!
 * Vue.js v2.7.14
 * (c) 2014-2022 Evan You
 * Released under the MIT License.
 */
var emptyObject = Object.freeze({});
var isArray = Array.isArray;
// These helpers produce better VM code in JS engines due to their
// explicitness and function inlining.
function isUndef(v) {
    return v === undefined || v === null;
}
function isDef(v) {
    return v !== undefined && v !== null;
}
function isTrue(v) {
    return v === true;
}
function isFalse(v) {
    return v === false;
}
/**
 * Check if value is primitive.
 */
function isPrimitive(value) {
    return (typeof value === 'string' ||
        typeof value === 'number' ||
        // $flow-disable-line
        typeof value === 'symbol' ||
        typeof value === 'boolean');
}
function isFunction(value) {
    return typeof value === 'function';
}
/**
 * Quick object check - this is primarily used to tell
 * objects from primitive values when we know the value
 * is a JSON-compliant type.
 */
function isObject(obj) {
    return obj !== null && typeof obj === 'object';
}
/**
 * Get the raw type string of a value, e.g., [object Object].
 */
var _toString = Object.prototype.toString;
function toRawType(value) {
    return _toString.call(value).slice(8, -1);
}
/**
 * Strict object type check. Only returns true
 * for plain JavaScript objects.
 */
function isPlainObject(obj) {
    return _toString.call(obj) === '[object Object]';
}
function isRegExp(v) {
    return _toString.call(v) === '[object RegExp]';
}
/**
 * Check if val is a valid array index.
 */
function isValidArrayIndex(val) {
    var n = parseFloat(String(val));
    return n >= 0 && Math.floor(n) === n && isFinite(val);
}
function isPromise(val) {
    return (isDef(val) &&
        typeof val.then === 'function' &&
        typeof val.catch === 'function');
}
/**
 * Convert a value to a string that is actually rendered.
 */
function toString(val) {
    return val == null
        ? ''
        : Array.isArray(val) || (isPlainObject(val) && val.toString === _toString)
            ? JSON.stringify(val, null, 2)
            : String(val);
}
/**
 * Convert an input value to a number for persistence.
 * If the conversion fails, return original string.
 */
function toNumber(val) {
    var n = parseFloat(val);
    return isNaN(n) ? val : n;
}
/**
 * Make a map and return a function for checking if a key
 * is in that map.
 */
function makeMap(str, expectsLowerCase) {
    var map = Object.create(null);
    var list = str.split(',');
    for (var i = 0; i < list.length; i++) {
        map[list[i]] = true;
    }
    return expectsLowerCase ? function (val) { return map[val.toLowerCase()]; } : function (val) { return map[val]; };
}
/**
 * Check if a tag is a built-in tag.
 */
var isBuiltInTag = makeMap('slot,component', true);
/**
 * Check if an attribute is a reserved attribute.
 */
var isReservedAttribute = makeMap('key,ref,slot,slot-scope,is');
/**
 * Remove an item from an array.
 */
function remove$2(arr, item) {
    var len = arr.length;
    if (len) {
        // fast path for the only / last item
        if (item === arr[len - 1]) {
            arr.length = len - 1;
            return;
        }
        var index = arr.indexOf(item);
        if (index > -1) {
            return arr.splice(index, 1);
        }
    }
}
/**
 * Check whether an object has the property.
 */
var hasOwnProperty = Object.prototype.hasOwnProperty;
function hasOwn(obj, key) {
    return hasOwnProperty.call(obj, key);
}
/**
 * Create a cached version of a pure function.
 */
function cached(fn) {
    var cache = Object.create(null);
    return function cachedFn(str) {
        var hit = cache[str];
        return hit || (cache[str] = fn(str));
    };
}
/**
 * Camelize a hyphen-delimited string.
 */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
    return str.replace(camelizeRE, function (_, c) { return (c ? c.toUpperCase() : ''); });
});
/**
 * Capitalize a string.
 */
var capitalize = cached(function (str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
});
/**
 * Hyphenate a camelCase string.
 */
var hyphenateRE = /\B([A-Z])/g;
var hyphenate = cached(function (str) {
    return str.replace(hyphenateRE, '-$1').toLowerCase();
});
/**
 * Simple bind polyfill for environments that do not support it,
 * e.g., PhantomJS 1.x. Technically, we don't need this anymore
 * since native bind is now performant enough in most browsers.
 * But removing it would mean breaking code that was able to run in
 * PhantomJS 1.x, so this must be kept for backward compatibility.
 */
/* istanbul ignore next */
function polyfillBind(fn, ctx) {
    function boundFn(a) {
        var l = arguments.length;
        return l
            ? l > 1
                ? fn.apply(ctx, arguments)
                : fn.call(ctx, a)
            : fn.call(ctx);
    }
    boundFn._length = fn.length;
    return boundFn;
}
function nativeBind(fn, ctx) {
    return fn.bind(ctx);
}
// @ts-expect-error bind cannot be `undefined`
var bind = Function.prototype.bind ? nativeBind : polyfillBind;
/**
 * Convert an Array-like object to a real Array.
 */
function toArray(list, start) {
    start = start || 0;
    var i = list.length - start;
    var ret = new Array(i);
    while (i--) {
        ret[i] = list[i + start];
    }
    return ret;
}
/**
 * Mix properties into target object.
 */
function extend(to, _from) {
    for (var key in _from) {
        to[key] = _from[key];
    }
    return to;
}
/**
 * Merge an Array of Objects into a single Object.
 */
function toObject(arr) {
    var res = {};
    for (var i = 0; i < arr.length; i++) {
        if (arr[i]) {
            extend(res, arr[i]);
        }
    }
    return res;
}
/* eslint-disable no-unused-vars */
/**
 * Perform no operation.
 * Stubbing args to make Flow happy without leaving useless transpiled code
 * with ...rest (https://flow.org/blog/2017/05/07/Strict-Function-Call-Arity/).
 */
function noop(a, b, c) { }
/**
 * Always return false.
 */
var no = function (a, b, c) { return false; };
/* eslint-enable no-unused-vars */
/**
 * Return the same value.
 */
var identity = function (_) { return _; };
/**
 * Check if two values are loosely equal - that is,
 * if they are plain objects, do they have the same shape?
 */
function looseEqual(a, b) {
    if (a === b)
        return true;
    var isObjectA = isObject(a);
    var isObjectB = isObject(b);
    if (isObjectA && isObjectB) {
        try {
            var isArrayA = Array.isArray(a);
            var isArrayB = Array.isArray(b);
            if (isArrayA && isArrayB) {
                return (a.length === b.length &&
                    a.every(function (e, i) {
                        return looseEqual(e, b[i]);
                    }));
            }
            else if (a instanceof Date && b instanceof Date) {
                return a.getTime() === b.getTime();
            }
            else if (!isArrayA && !isArrayB) {
                var keysA = Object.keys(a);
                var keysB = Object.keys(b);
                return (keysA.length === keysB.length &&
                    keysA.every(function (key) {
                        return looseEqual(a[key], b[key]);
                    }));
            }
            else {
                /* istanbul ignore next */
                return false;
            }
        }
        catch (e) {
            /* istanbul ignore next */
            return false;
        }
    }
    else if (!isObjectA && !isObjectB) {
        return String(a) === String(b);
    }
    else {
        return false;
    }
}
/**
 * Return the first index at which a loosely equal value can be
 * found in the array (if value is a plain object, the array must
 * contain an object of the same shape), or -1 if it is not present.
 */
function looseIndexOf(arr, val) {
    for (var i = 0; i < arr.length; i++) {
        if (looseEqual(arr[i], val))
            return i;
    }
    return -1;
}
/**
 * Ensure a function is called only once.
 */
function once(fn) {
    var called = false;
    return function () {
        if (!called) {
            called = true;
            fn.apply(this, arguments);
        }
    };
}
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is#polyfill
function hasChanged(x, y) {
    if (x === y) {
        return x === 0 && 1 / x !== 1 / y;
    }
    else {
        return x === x || y === y;
    }
}

var SSR_ATTR = 'data-server-rendered';
var ASSET_TYPES = ['component', 'directive', 'filter'];
var LIFECYCLE_HOOKS = [
    'beforeCreate',
    'created',
    'beforeMount',
    'mounted',
    'beforeUpdate',
    'updated',
    'beforeDestroy',
    'destroyed',
    'activated',
    'deactivated',
    'errorCaptured',
    'serverPrefetch',
    'renderTracked',
    'renderTriggered'
];

var config = {
    /**
     * Option merge strategies (used in core/util/options)
     */
    // $flow-disable-line
    optionMergeStrategies: Object.create(null),
    /**
     * Whether to suppress warnings.
     */
    silent: false,
    /**
     * Show production mode tip message on boot?
     */
    productionTip: "production" !== 'production',
    /**
     * Whether to enable devtools
     */
    devtools: "production" !== 'production',
    /**
     * Whether to record perf
     */
    performance: false,
    /**
     * Error handler for watcher errors
     */
    errorHandler: null,
    /**
     * Warn handler for watcher warns
     */
    warnHandler: null,
    /**
     * Ignore certain custom elements
     */
    ignoredElements: [],
    /**
     * Custom user key aliases for v-on
     */
    // $flow-disable-line
    keyCodes: Object.create(null),
    /**
     * Check if a tag is reserved so that it cannot be registered as a
     * component. This is platform-dependent and may be overwritten.
     */
    isReservedTag: no,
    /**
     * Check if an attribute is reserved so that it cannot be used as a component
     * prop. This is platform-dependent and may be overwritten.
     */
    isReservedAttr: no,
    /**
     * Check if a tag is an unknown element.
     * Platform-dependent.
     */
    isUnknownElement: no,
    /**
     * Get the namespace of an element
     */
    getTagNamespace: noop,
    /**
     * Parse the real tag name for the specific platform.
     */
    parsePlatformTagName: identity,
    /**
     * Check if an attribute must be bound using property, e.g. value
     * Platform-dependent.
     */
    mustUseProp: no,
    /**
     * Perform updates asynchronously. Intended to be used by Vue Test Utils
     * This will significantly reduce performance if set to false.
     */
    async: true,
    /**
     * Exposed for legacy reasons
     */
    _lifecycleHooks: LIFECYCLE_HOOKS
};

/**
 * unicode letters used for parsing html tags, component names and property paths.
 * using https://www.w3.org/TR/html53/semantics-scripting.html#potentialcustomelementname
 * skipping \u10000-\uEFFFF due to it freezing up PhantomJS
 */
var unicodeRegExp = /a-zA-Z\u00B7\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u037D\u037F-\u1FFF\u200C-\u200D\u203F-\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD/;
/**
 * Check if a string starts with $ or _
 */
function isReserved(str) {
    var c = (str + '').charCodeAt(0);
    return c === 0x24 || c === 0x5f;
}
/**
 * Define a property.
 */
function def(obj, key, val, enumerable) {
    Object.defineProperty(obj, key, {
        value: val,
        enumerable: !!enumerable,
        writable: true,
        configurable: true
    });
}
/**
 * Parse simple path.
 */
var bailRE = new RegExp("[^".concat(unicodeRegExp.source, ".$_\\d]"));
function parsePath(path) {
    if (bailRE.test(path)) {
        return;
    }
    var segments = path.split('.');
    return function (obj) {
        for (var i = 0; i < segments.length; i++) {
            if (!obj)
                return;
            obj = obj[segments[i]];
        }
        return obj;
    };
}

// can we use __proto__?
var hasProto = '__proto__' in {};
// Browser environment sniffing
var inBrowser = typeof window !== 'undefined';
var UA = inBrowser && window.navigator.userAgent.toLowerCase();
var isIE = UA && /msie|trident/.test(UA);
var isIE9 = UA && UA.indexOf('msie 9.0') > 0;
var isEdge = UA && UA.indexOf('edge/') > 0;
UA && UA.indexOf('android') > 0;
var isIOS = UA && /iphone|ipad|ipod|ios/.test(UA);
UA && /chrome\/\d+/.test(UA) && !isEdge;
UA && /phantomjs/.test(UA);
var isFF = UA && UA.match(/firefox\/(\d+)/);
// Firefox has a "watch" function on Object.prototype...
// @ts-expect-error firebox support
var nativeWatch = {}.watch;
var supportsPassive = false;
if (inBrowser) {
    try {
        var opts = {};
        Object.defineProperty(opts, 'passive', {
            get: function () {
                /* istanbul ignore next */
                supportsPassive = true;
            }
        }); // https://github.com/facebook/flow/issues/285
        window.addEventListener('test-passive', null, opts);
    }
    catch (e) { }
}
// this needs to be lazy-evaled because vue may be required before
// vue-server-renderer can set VUE_ENV
var _isServer;
var isServerRendering = function () {
    if (_isServer === undefined) {
        /* istanbul ignore if */
        if (!inBrowser && typeof __webpack_require__.g !== 'undefined') {
            // detect presence of vue-server-renderer and avoid
            // Webpack shimming the process
            _isServer =
                __webpack_require__.g['process'] && __webpack_require__.g['process'].env.VUE_ENV === 'server';
        }
        else {
            _isServer = false;
        }
    }
    return _isServer;
};
// detect devtools
var devtools = inBrowser && window.__VUE_DEVTOOLS_GLOBAL_HOOK__;
/* istanbul ignore next */
function isNative(Ctor) {
    return typeof Ctor === 'function' && /native code/.test(Ctor.toString());
}
var hasSymbol = typeof Symbol !== 'undefined' &&
    isNative(Symbol) &&
    typeof Reflect !== 'undefined' &&
    isNative(Reflect.ownKeys);
var _Set; // $flow-disable-line
/* istanbul ignore if */ if (typeof Set !== 'undefined' && isNative(Set)) {
    // use native Set when available.
    _Set = Set;
}
else {
    // a non-standard Set polyfill that only works with primitive keys.
    _Set = /** @class */ (function () {
        function Set() {
            this.set = Object.create(null);
        }
        Set.prototype.has = function (key) {
            return this.set[key] === true;
        };
        Set.prototype.add = function (key) {
            this.set[key] = true;
        };
        Set.prototype.clear = function () {
            this.set = Object.create(null);
        };
        return Set;
    }());
}

var currentInstance = null;
/**
 * This is exposed for compatibility with v3 (e.g. some functions in VueUse
 * relies on it). Do not use this internally, just use `currentInstance`.
 *
 * @internal this function needs manual type declaration because it relies
 * on previously manually authored types from Vue 2
 */
function getCurrentInstance() {
    return currentInstance && { proxy: currentInstance };
}
/**
 * @internal
 */
function setCurrentInstance(vm) {
    if (vm === void 0) { vm = null; }
    if (!vm)
        currentInstance && currentInstance._scope.off();
    currentInstance = vm;
    vm && vm._scope.on();
}

/**
 * @internal
 */
var VNode = /** @class */ (function () {
    function VNode(tag, data, children, text, elm, context, componentOptions, asyncFactory) {
        this.tag = tag;
        this.data = data;
        this.children = children;
        this.text = text;
        this.elm = elm;
        this.ns = undefined;
        this.context = context;
        this.fnContext = undefined;
        this.fnOptions = undefined;
        this.fnScopeId = undefined;
        this.key = data && data.key;
        this.componentOptions = componentOptions;
        this.componentInstance = undefined;
        this.parent = undefined;
        this.raw = false;
        this.isStatic = false;
        this.isRootInsert = true;
        this.isComment = false;
        this.isCloned = false;
        this.isOnce = false;
        this.asyncFactory = asyncFactory;
        this.asyncMeta = undefined;
        this.isAsyncPlaceholder = false;
    }
    Object.defineProperty(VNode.prototype, "child", {
        // DEPRECATED: alias for componentInstance for backwards compat.
        /* istanbul ignore next */
        get: function () {
            return this.componentInstance;
        },
        enumerable: false,
        configurable: true
    });
    return VNode;
}());
var createEmptyVNode = function (text) {
    if (text === void 0) { text = ''; }
    var node = new VNode();
    node.text = text;
    node.isComment = true;
    return node;
};
function createTextVNode(val) {
    return new VNode(undefined, undefined, undefined, String(val));
}
// optimized shallow clone
// used for static nodes and slot nodes because they may be reused across
// multiple renders, cloning them avoids errors when DOM manipulations rely
// on their elm reference.
function cloneVNode(vnode) {
    var cloned = new VNode(vnode.tag, vnode.data, 
    // #7975
    // clone children array to avoid mutating original in case of cloning
    // a child.
    vnode.children && vnode.children.slice(), vnode.text, vnode.elm, vnode.context, vnode.componentOptions, vnode.asyncFactory);
    cloned.ns = vnode.ns;
    cloned.isStatic = vnode.isStatic;
    cloned.key = vnode.key;
    cloned.isComment = vnode.isComment;
    cloned.fnContext = vnode.fnContext;
    cloned.fnOptions = vnode.fnOptions;
    cloned.fnScopeId = vnode.fnScopeId;
    cloned.asyncMeta = vnode.asyncMeta;
    cloned.isCloned = true;
    return cloned;
}

/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

var uid$2 = 0;
var pendingCleanupDeps = [];
var cleanupDeps = function () {
    for (var i = 0; i < pendingCleanupDeps.length; i++) {
        var dep = pendingCleanupDeps[i];
        dep.subs = dep.subs.filter(function (s) { return s; });
        dep._pending = false;
    }
    pendingCleanupDeps.length = 0;
};
/**
 * A dep is an observable that can have multiple
 * directives subscribing to it.
 * @internal
 */
var Dep = /** @class */ (function () {
    function Dep() {
        // pending subs cleanup
        this._pending = false;
        this.id = uid$2++;
        this.subs = [];
    }
    Dep.prototype.addSub = function (sub) {
        this.subs.push(sub);
    };
    Dep.prototype.removeSub = function (sub) {
        // #12696 deps with massive amount of subscribers are extremely slow to
        // clean up in Chromium
        // to workaround this, we unset the sub for now, and clear them on
        // next scheduler flush.
        this.subs[this.subs.indexOf(sub)] = null;
        if (!this._pending) {
            this._pending = true;
            pendingCleanupDeps.push(this);
        }
    };
    Dep.prototype.depend = function (info) {
        if (Dep.target) {
            Dep.target.addDep(this);
            if (false) {}
        }
    };
    Dep.prototype.notify = function (info) {
        // stabilize the subscriber list first
        var subs = this.subs.filter(function (s) { return s; });
        if (false) {}
        for (var i = 0, l = subs.length; i < l; i++) {
            var sub = subs[i];
            if (false) {}
            sub.update();
        }
    };
    return Dep;
}());
// The current target watcher being evaluated.
// This is globally unique because only one watcher
// can be evaluated at a time.
Dep.target = null;
var targetStack = [];
function pushTarget(target) {
    targetStack.push(target);
    Dep.target = target;
}
function popTarget() {
    targetStack.pop();
    Dep.target = targetStack[targetStack.length - 1];
}

/*
 * not type checking this file because flow doesn't play well with
 * dynamically accessing methods on Array prototype
 */
var arrayProto = Array.prototype;
var arrayMethods = Object.create(arrayProto);
var methodsToPatch = [
    'push',
    'pop',
    'shift',
    'unshift',
    'splice',
    'sort',
    'reverse'
];
/**
 * Intercept mutating methods and emit events
 */
methodsToPatch.forEach(function (method) {
    // cache original method
    var original = arrayProto[method];
    def(arrayMethods, method, function mutator() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var result = original.apply(this, args);
        var ob = this.__ob__;
        var inserted;
        switch (method) {
            case 'push':
            case 'unshift':
                inserted = args;
                break;
            case 'splice':
                inserted = args.slice(2);
                break;
        }
        if (inserted)
            ob.observeArray(inserted);
        // notify change
        if (false) {}
        else {
            ob.dep.notify();
        }
        return result;
    });
});

var arrayKeys = Object.getOwnPropertyNames(arrayMethods);
var NO_INIITIAL_VALUE = {};
/**
 * In some cases we may want to disable observation inside a component's
 * update computation.
 */
var shouldObserve = true;
function toggleObserving(value) {
    shouldObserve = value;
}
// ssr mock dep
var mockDep = {
    notify: noop,
    depend: noop,
    addSub: noop,
    removeSub: noop
};
/**
 * Observer class that is attached to each observed
 * object. Once attached, the observer converts the target
 * object's property keys into getter/setters that
 * collect dependencies and dispatch updates.
 */
var Observer = /** @class */ (function () {
    function Observer(value, shallow, mock) {
        if (shallow === void 0) { shallow = false; }
        if (mock === void 0) { mock = false; }
        this.value = value;
        this.shallow = shallow;
        this.mock = mock;
        // this.value = value
        this.dep = mock ? mockDep : new Dep();
        this.vmCount = 0;
        def(value, '__ob__', this);
        if (isArray(value)) {
            if (!mock) {
                if (hasProto) {
                    value.__proto__ = arrayMethods;
                    /* eslint-enable no-proto */
                }
                else {
                    for (var i = 0, l = arrayKeys.length; i < l; i++) {
                        var key = arrayKeys[i];
                        def(value, key, arrayMethods[key]);
                    }
                }
            }
            if (!shallow) {
                this.observeArray(value);
            }
        }
        else {
            /**
             * Walk through all properties and convert them into
             * getter/setters. This method should only be called when
             * value type is Object.
             */
            var keys = Object.keys(value);
            for (var i = 0; i < keys.length; i++) {
                var key = keys[i];
                defineReactive(value, key, NO_INIITIAL_VALUE, undefined, shallow, mock);
            }
        }
    }
    /**
     * Observe a list of Array items.
     */
    Observer.prototype.observeArray = function (value) {
        for (var i = 0, l = value.length; i < l; i++) {
            observe(value[i], false, this.mock);
        }
    };
    return Observer;
}());
// helpers
/**
 * Attempt to create an observer instance for a value,
 * returns the new observer if successfully observed,
 * or the existing observer if the value already has one.
 */
function observe(value, shallow, ssrMockReactivity) {
    if (value && hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
        return value.__ob__;
    }
    if (shouldObserve &&
        (ssrMockReactivity || !isServerRendering()) &&
        (isArray(value) || isPlainObject(value)) &&
        Object.isExtensible(value) &&
        !value.__v_skip /* ReactiveFlags.SKIP */ &&
        !isRef(value) &&
        !(value instanceof VNode)) {
        return new Observer(value, shallow, ssrMockReactivity);
    }
}
/**
 * Define a reactive property on an Object.
 */
function defineReactive(obj, key, val, customSetter, shallow, mock) {
    var dep = new Dep();
    var property = Object.getOwnPropertyDescriptor(obj, key);
    if (property && property.configurable === false) {
        return;
    }
    // cater for pre-defined getter/setters
    var getter = property && property.get;
    var setter = property && property.set;
    if ((!getter || setter) &&
        (val === NO_INIITIAL_VALUE || arguments.length === 2)) {
        val = obj[key];
    }
    var childOb = !shallow && observe(val, false, mock);
    Object.defineProperty(obj, key, {
        enumerable: true,
        configurable: true,
        get: function reactiveGetter() {
            var value = getter ? getter.call(obj) : val;
            if (Dep.target) {
                if (false) {}
                else {
                    dep.depend();
                }
                if (childOb) {
                    childOb.dep.depend();
                    if (isArray(value)) {
                        dependArray(value);
                    }
                }
            }
            return isRef(value) && !shallow ? value.value : value;
        },
        set: function reactiveSetter(newVal) {
            var value = getter ? getter.call(obj) : val;
            if (!hasChanged(value, newVal)) {
                return;
            }
            if (false) {}
            if (setter) {
                setter.call(obj, newVal);
            }
            else if (getter) {
                // #7981: for accessor properties without setter
                return;
            }
            else if (!shallow && isRef(value) && !isRef(newVal)) {
                value.value = newVal;
                return;
            }
            else {
                val = newVal;
            }
            childOb = !shallow && observe(newVal, false, mock);
            if (false) {}
            else {
                dep.notify();
            }
        }
    });
    return dep;
}
function set(target, key, val) {
    if (false) {}
    if (isReadonly(target)) {
         false && 0;
        return;
    }
    var ob = target.__ob__;
    if (isArray(target) && isValidArrayIndex(key)) {
        target.length = Math.max(target.length, key);
        target.splice(key, 1, val);
        // when mocking for SSR, array methods are not hijacked
        if (ob && !ob.shallow && ob.mock) {
            observe(val, false, true);
        }
        return val;
    }
    if (key in target && !(key in Object.prototype)) {
        target[key] = val;
        return val;
    }
    if (target._isVue || (ob && ob.vmCount)) {
         false &&
            0;
        return val;
    }
    if (!ob) {
        target[key] = val;
        return val;
    }
    defineReactive(ob.value, key, val, undefined, ob.shallow, ob.mock);
    if (false) {}
    else {
        ob.dep.notify();
    }
    return val;
}
function del(target, key) {
    if (false) {}
    if (isArray(target) && isValidArrayIndex(key)) {
        target.splice(key, 1);
        return;
    }
    var ob = target.__ob__;
    if (target._isVue || (ob && ob.vmCount)) {
         false &&
            0;
        return;
    }
    if (isReadonly(target)) {
         false &&
            0;
        return;
    }
    if (!hasOwn(target, key)) {
        return;
    }
    delete target[key];
    if (!ob) {
        return;
    }
    if (false) {}
    else {
        ob.dep.notify();
    }
}
/**
 * Collect dependencies on array elements when the array is touched, since
 * we cannot intercept array element access like property getters.
 */
function dependArray(value) {
    for (var e = void 0, i = 0, l = value.length; i < l; i++) {
        e = value[i];
        if (e && e.__ob__) {
            e.__ob__.dep.depend();
        }
        if (isArray(e)) {
            dependArray(e);
        }
    }
}

function reactive(target) {
    makeReactive(target, false);
    return target;
}
/**
 * Return a shallowly-reactive copy of the original object, where only the root
 * level properties are reactive. It also does not auto-unwrap refs (even at the
 * root level).
 */
function shallowReactive(target) {
    makeReactive(target, true);
    def(target, "__v_isShallow" /* ReactiveFlags.IS_SHALLOW */, true);
    return target;
}
function makeReactive(target, shallow) {
    // if trying to observe a readonly proxy, return the readonly version.
    if (!isReadonly(target)) {
        if (false) { var existingOb; }
        var ob = observe(target, shallow, isServerRendering() /* ssr mock reactivity */);
        if (false) {}
    }
}
function isReactive(value) {
    if (isReadonly(value)) {
        return isReactive(value["__v_raw" /* ReactiveFlags.RAW */]);
    }
    return !!(value && value.__ob__);
}
function isShallow(value) {
    return !!(value && value.__v_isShallow);
}
function isReadonly(value) {
    return !!(value && value.__v_isReadonly);
}
function isProxy(value) {
    return isReactive(value) || isReadonly(value);
}
function toRaw(observed) {
    var raw = observed && observed["__v_raw" /* ReactiveFlags.RAW */];
    return raw ? toRaw(raw) : observed;
}
function markRaw(value) {
    // non-extensible objects won't be observed anyway
    if (Object.isExtensible(value)) {
        def(value, "__v_skip" /* ReactiveFlags.SKIP */, true);
    }
    return value;
}
/**
 * @internal
 */
function isCollectionType(value) {
    var type = toRawType(value);
    return (type === 'Map' || type === 'WeakMap' || type === 'Set' || type === 'WeakSet');
}

/**
 * @internal
 */
var RefFlag = "__v_isRef";
function isRef(r) {
    return !!(r && r.__v_isRef === true);
}
function ref$1(value) {
    return createRef(value, false);
}
function shallowRef(value) {
    return createRef(value, true);
}
function createRef(rawValue, shallow) {
    if (isRef(rawValue)) {
        return rawValue;
    }
    var ref = {};
    def(ref, RefFlag, true);
    def(ref, "__v_isShallow" /* ReactiveFlags.IS_SHALLOW */, shallow);
    def(ref, 'dep', defineReactive(ref, 'value', rawValue, null, shallow, isServerRendering()));
    return ref;
}
function triggerRef(ref) {
    if (false) {}
    if (false) {}
    else {
        ref.dep && ref.dep.notify();
    }
}
function unref(ref) {
    return isRef(ref) ? ref.value : ref;
}
function proxyRefs(objectWithRefs) {
    if (isReactive(objectWithRefs)) {
        return objectWithRefs;
    }
    var proxy = {};
    var keys = Object.keys(objectWithRefs);
    for (var i = 0; i < keys.length; i++) {
        proxyWithRefUnwrap(proxy, objectWithRefs, keys[i]);
    }
    return proxy;
}
function proxyWithRefUnwrap(target, source, key) {
    Object.defineProperty(target, key, {
        enumerable: true,
        configurable: true,
        get: function () {
            var val = source[key];
            if (isRef(val)) {
                return val.value;
            }
            else {
                var ob = val && val.__ob__;
                if (ob)
                    ob.dep.depend();
                return val;
            }
        },
        set: function (value) {
            var oldValue = source[key];
            if (isRef(oldValue) && !isRef(value)) {
                oldValue.value = value;
            }
            else {
                source[key] = value;
            }
        }
    });
}
function customRef(factory) {
    var dep = new Dep();
    var _a = factory(function () {
        if (false) {}
        else {
            dep.depend();
        }
    }, function () {
        if (false) {}
        else {
            dep.notify();
        }
    }), get = _a.get, set = _a.set;
    var ref = {
        get value() {
            return get();
        },
        set value(newVal) {
            set(newVal);
        }
    };
    def(ref, RefFlag, true);
    return ref;
}
function toRefs(object) {
    if (false) {}
    var ret = isArray(object) ? new Array(object.length) : {};
    for (var key in object) {
        ret[key] = toRef(object, key);
    }
    return ret;
}
function toRef(object, key, defaultValue) {
    var val = object[key];
    if (isRef(val)) {
        return val;
    }
    var ref = {
        get value() {
            var val = object[key];
            return val === undefined ? defaultValue : val;
        },
        set value(newVal) {
            object[key] = newVal;
        }
    };
    def(ref, RefFlag, true);
    return ref;
}

var rawToReadonlyFlag = "__v_rawToReadonly";
var rawToShallowReadonlyFlag = "__v_rawToShallowReadonly";
function readonly(target) {
    return createReadonly(target, false);
}
function createReadonly(target, shallow) {
    if (!isPlainObject(target)) {
        if (false) {}
        return target;
    }
    if (false) {}
    // already a readonly object
    if (isReadonly(target)) {
        return target;
    }
    // already has a readonly proxy
    var existingFlag = shallow ? rawToShallowReadonlyFlag : rawToReadonlyFlag;
    var existingProxy = target[existingFlag];
    if (existingProxy) {
        return existingProxy;
    }
    var proxy = Object.create(Object.getPrototypeOf(target));
    def(target, existingFlag, proxy);
    def(proxy, "__v_isReadonly" /* ReactiveFlags.IS_READONLY */, true);
    def(proxy, "__v_raw" /* ReactiveFlags.RAW */, target);
    if (isRef(target)) {
        def(proxy, RefFlag, true);
    }
    if (shallow || isShallow(target)) {
        def(proxy, "__v_isShallow" /* ReactiveFlags.IS_SHALLOW */, true);
    }
    var keys = Object.keys(target);
    for (var i = 0; i < keys.length; i++) {
        defineReadonlyProperty(proxy, target, keys[i], shallow);
    }
    return proxy;
}
function defineReadonlyProperty(proxy, target, key, shallow) {
    Object.defineProperty(proxy, key, {
        enumerable: true,
        configurable: true,
        get: function () {
            var val = target[key];
            return shallow || !isPlainObject(val) ? val : readonly(val);
        },
        set: function () {
             false &&
                0;
        }
    });
}
/**
 * Returns a reactive-copy of the original object, where only the root level
 * properties are readonly, and does NOT unwrap refs nor recursively convert
 * returned properties.
 * This is used for creating the props proxy object for stateful components.
 */
function shallowReadonly(target) {
    return createReadonly(target, true);
}

function computed(getterOrOptions, debugOptions) {
    var getter;
    var setter;
    var onlyGetter = isFunction(getterOrOptions);
    if (onlyGetter) {
        getter = getterOrOptions;
        setter =  false
            ? 0
            : noop;
    }
    else {
        getter = getterOrOptions.get;
        setter = getterOrOptions.set;
    }
    var watcher = isServerRendering()
        ? null
        : new Watcher(currentInstance, getter, noop, { lazy: true });
    if (false) {}
    var ref = {
        // some libs rely on the presence effect for checking computed refs
        // from normal refs, but the implementation doesn't matter
        effect: watcher,
        get value() {
            if (watcher) {
                if (watcher.dirty) {
                    watcher.evaluate();
                }
                if (Dep.target) {
                    if (false) {}
                    watcher.depend();
                }
                return watcher.value;
            }
            else {
                return getter();
            }
        },
        set value(newVal) {
            setter(newVal);
        }
    };
    def(ref, RefFlag, true);
    def(ref, "__v_isReadonly" /* ReactiveFlags.IS_READONLY */, onlyGetter);
    return ref;
}

var WATCHER = "watcher";
var WATCHER_CB = "".concat(WATCHER, " callback");
var WATCHER_GETTER = "".concat(WATCHER, " getter");
var WATCHER_CLEANUP = "".concat(WATCHER, " cleanup");
// Simple effect.
function watchEffect(effect, options) {
    return doWatch(effect, null, options);
}
function watchPostEffect(effect, options) {
    return doWatch(effect, null, ( false
        ? 0 : { flush: 'post' }));
}
function watchSyncEffect(effect, options) {
    return doWatch(effect, null, ( false
        ? 0 : { flush: 'sync' }));
}
// initial value for watchers to trigger on undefined initial values
var INITIAL_WATCHER_VALUE = {};
// implementation
function watch(source, cb, options) {
    if (false) {}
    return doWatch(source, cb, options);
}
function doWatch(source, cb, _a) {
    var _b = _a === void 0 ? emptyObject : _a, immediate = _b.immediate, deep = _b.deep, _c = _b.flush, flush = _c === void 0 ? 'pre' : _c, onTrack = _b.onTrack, onTrigger = _b.onTrigger;
    if (false) {}
    var warnInvalidSource = function (s) {
        warn("Invalid watch source: ".concat(s, ". A watch source can only be a getter/effect ") +
            "function, a ref, a reactive object, or an array of these types.");
    };
    var instance = currentInstance;
    var call = function (fn, type, args) {
        if (args === void 0) { args = null; }
        return invokeWithErrorHandling(fn, null, args, instance, type);
    };
    var getter;
    var forceTrigger = false;
    var isMultiSource = false;
    if (isRef(source)) {
        getter = function () { return source.value; };
        forceTrigger = isShallow(source);
    }
    else if (isReactive(source)) {
        getter = function () {
            source.__ob__.dep.depend();
            return source;
        };
        deep = true;
    }
    else if (isArray(source)) {
        isMultiSource = true;
        forceTrigger = source.some(function (s) { return isReactive(s) || isShallow(s); });
        getter = function () {
            return source.map(function (s) {
                if (isRef(s)) {
                    return s.value;
                }
                else if (isReactive(s)) {
                    return traverse(s);
                }
                else if (isFunction(s)) {
                    return call(s, WATCHER_GETTER);
                }
                else {
                     false && 0;
                }
            });
        };
    }
    else if (isFunction(source)) {
        if (cb) {
            // getter with cb
            getter = function () { return call(source, WATCHER_GETTER); };
        }
        else {
            // no cb -> simple effect
            getter = function () {
                if (instance && instance._isDestroyed) {
                    return;
                }
                if (cleanup) {
                    cleanup();
                }
                return call(source, WATCHER, [onCleanup]);
            };
        }
    }
    else {
        getter = noop;
         false && 0;
    }
    if (cb && deep) {
        var baseGetter_1 = getter;
        getter = function () { return traverse(baseGetter_1()); };
    }
    var cleanup;
    var onCleanup = function (fn) {
        cleanup = watcher.onStop = function () {
            call(fn, WATCHER_CLEANUP);
        };
    };
    // in SSR there is no need to setup an actual effect, and it should be noop
    // unless it's eager
    if (isServerRendering()) {
        // we will also not call the invalidate callback (+ runner is not set up)
        onCleanup = noop;
        if (!cb) {
            getter();
        }
        else if (immediate) {
            call(cb, WATCHER_CB, [
                getter(),
                isMultiSource ? [] : undefined,
                onCleanup
            ]);
        }
        return noop;
    }
    var watcher = new Watcher(currentInstance, getter, noop, {
        lazy: true
    });
    watcher.noRecurse = !cb;
    var oldValue = isMultiSource ? [] : INITIAL_WATCHER_VALUE;
    // overwrite default run
    watcher.run = function () {
        if (!watcher.active) {
            return;
        }
        if (cb) {
            // watch(source, cb)
            var newValue = watcher.get();
            if (deep ||
                forceTrigger ||
                (isMultiSource
                    ? newValue.some(function (v, i) {
                        return hasChanged(v, oldValue[i]);
                    })
                    : hasChanged(newValue, oldValue))) {
                // cleanup before running cb again
                if (cleanup) {
                    cleanup();
                }
                call(cb, WATCHER_CB, [
                    newValue,
                    // pass undefined as the old value when it's changed for the first time
                    oldValue === INITIAL_WATCHER_VALUE ? undefined : oldValue,
                    onCleanup
                ]);
                oldValue = newValue;
            }
        }
        else {
            // watchEffect
            watcher.get();
        }
    };
    if (flush === 'sync') {
        watcher.update = watcher.run;
    }
    else if (flush === 'post') {
        watcher.post = true;
        watcher.update = function () { return queueWatcher(watcher); };
    }
    else {
        // pre
        watcher.update = function () {
            if (instance && instance === currentInstance && !instance._isMounted) {
                // pre-watcher triggered before
                var buffer = instance._preWatchers || (instance._preWatchers = []);
                if (buffer.indexOf(watcher) < 0)
                    buffer.push(watcher);
            }
            else {
                queueWatcher(watcher);
            }
        };
    }
    if (false) {}
    // initial run
    if (cb) {
        if (immediate) {
            watcher.run();
        }
        else {
            oldValue = watcher.get();
        }
    }
    else if (flush === 'post' && instance) {
        instance.$once('hook:mounted', function () { return watcher.get(); });
    }
    else {
        watcher.get();
    }
    return function () {
        watcher.teardown();
    };
}

var activeEffectScope;
var EffectScope = /** @class */ (function () {
    function EffectScope(detached) {
        if (detached === void 0) { detached = false; }
        this.detached = detached;
        /**
         * @internal
         */
        this.active = true;
        /**
         * @internal
         */
        this.effects = [];
        /**
         * @internal
         */
        this.cleanups = [];
        this.parent = activeEffectScope;
        if (!detached && activeEffectScope) {
            this.index =
                (activeEffectScope.scopes || (activeEffectScope.scopes = [])).push(this) - 1;
        }
    }
    EffectScope.prototype.run = function (fn) {
        if (this.active) {
            var currentEffectScope = activeEffectScope;
            try {
                activeEffectScope = this;
                return fn();
            }
            finally {
                activeEffectScope = currentEffectScope;
            }
        }
        else if (false) {}
    };
    /**
     * This should only be called on non-detached scopes
     * @internal
     */
    EffectScope.prototype.on = function () {
        activeEffectScope = this;
    };
    /**
     * This should only be called on non-detached scopes
     * @internal
     */
    EffectScope.prototype.off = function () {
        activeEffectScope = this.parent;
    };
    EffectScope.prototype.stop = function (fromParent) {
        if (this.active) {
            var i = void 0, l = void 0;
            for (i = 0, l = this.effects.length; i < l; i++) {
                this.effects[i].teardown();
            }
            for (i = 0, l = this.cleanups.length; i < l; i++) {
                this.cleanups[i]();
            }
            if (this.scopes) {
                for (i = 0, l = this.scopes.length; i < l; i++) {
                    this.scopes[i].stop(true);
                }
            }
            // nested scope, dereference from parent to avoid memory leaks
            if (!this.detached && this.parent && !fromParent) {
                // optimized O(1) removal
                var last = this.parent.scopes.pop();
                if (last && last !== this) {
                    this.parent.scopes[this.index] = last;
                    last.index = this.index;
                }
            }
            this.parent = undefined;
            this.active = false;
        }
    };
    return EffectScope;
}());
function effectScope(detached) {
    return new EffectScope(detached);
}
/**
 * @internal
 */
function recordEffectScope(effect, scope) {
    if (scope === void 0) { scope = activeEffectScope; }
    if (scope && scope.active) {
        scope.effects.push(effect);
    }
}
function getCurrentScope() {
    return activeEffectScope;
}
function onScopeDispose(fn) {
    if (activeEffectScope) {
        activeEffectScope.cleanups.push(fn);
    }
    else if (false) {}
}

function provide(key, value) {
    if (!currentInstance) {
        if (false) {}
    }
    else {
        // TS doesn't allow symbol as index type
        resolveProvided(currentInstance)[key] = value;
    }
}
function resolveProvided(vm) {
    // by default an instance inherits its parent's provides object
    // but when it needs to provide values of its own, it creates its
    // own provides object using parent provides object as prototype.
    // this way in `inject` we can simply look up injections from direct
    // parent and let the prototype chain do the work.
    var existing = vm._provided;
    var parentProvides = vm.$parent && vm.$parent._provided;
    if (parentProvides === existing) {
        return (vm._provided = Object.create(parentProvides));
    }
    else {
        return existing;
    }
}
function inject(key, defaultValue, treatDefaultAsFactory) {
    if (treatDefaultAsFactory === void 0) { treatDefaultAsFactory = false; }
    // fallback to `currentRenderingInstance` so that this can be called in
    // a functional component
    var instance = currentInstance;
    if (instance) {
        // #2400
        // to support `app.use` plugins,
        // fallback to appContext's `provides` if the instance is at root
        var provides = instance.$parent && instance.$parent._provided;
        if (provides && key in provides) {
            // TS doesn't allow symbol as index type
            return provides[key];
        }
        else if (arguments.length > 1) {
            return treatDefaultAsFactory && isFunction(defaultValue)
                ? defaultValue.call(instance)
                : defaultValue;
        }
        else if (false) {}
    }
    else if (false) {}
}

var normalizeEvent = cached(function (name) {
    var passive = name.charAt(0) === '&';
    name = passive ? name.slice(1) : name;
    var once = name.charAt(0) === '~'; // Prefixed last, checked first
    name = once ? name.slice(1) : name;
    var capture = name.charAt(0) === '!';
    name = capture ? name.slice(1) : name;
    return {
        name: name,
        once: once,
        capture: capture,
        passive: passive
    };
});
function createFnInvoker(fns, vm) {
    function invoker() {
        var fns = invoker.fns;
        if (isArray(fns)) {
            var cloned = fns.slice();
            for (var i = 0; i < cloned.length; i++) {
                invokeWithErrorHandling(cloned[i], null, arguments, vm, "v-on handler");
            }
        }
        else {
            // return handler return value for single handlers
            return invokeWithErrorHandling(fns, null, arguments, vm, "v-on handler");
        }
    }
    invoker.fns = fns;
    return invoker;
}
function updateListeners(on, oldOn, add, remove, createOnceHandler, vm) {
    var name, cur, old, event;
    for (name in on) {
        cur = on[name];
        old = oldOn[name];
        event = normalizeEvent(name);
        if (isUndef(cur)) {
             false &&
                0;
        }
        else if (isUndef(old)) {
            if (isUndef(cur.fns)) {
                cur = on[name] = createFnInvoker(cur, vm);
            }
            if (isTrue(event.once)) {
                cur = on[name] = createOnceHandler(event.name, cur, event.capture);
            }
            add(event.name, cur, event.capture, event.passive, event.params);
        }
        else if (cur !== old) {
            old.fns = cur;
            on[name] = old;
        }
    }
    for (name in oldOn) {
        if (isUndef(on[name])) {
            event = normalizeEvent(name);
            remove(event.name, oldOn[name], event.capture);
        }
    }
}

function mergeVNodeHook(def, hookKey, hook) {
    if (def instanceof VNode) {
        def = def.data.hook || (def.data.hook = {});
    }
    var invoker;
    var oldHook = def[hookKey];
    function wrappedHook() {
        hook.apply(this, arguments);
        // important: remove merged hook to ensure it's called only once
        // and prevent memory leak
        remove$2(invoker.fns, wrappedHook);
    }
    if (isUndef(oldHook)) {
        // no existing hook
        invoker = createFnInvoker([wrappedHook]);
    }
    else {
        /* istanbul ignore if */
        if (isDef(oldHook.fns) && isTrue(oldHook.merged)) {
            // already a merged invoker
            invoker = oldHook;
            invoker.fns.push(wrappedHook);
        }
        else {
            // existing plain hook
            invoker = createFnInvoker([oldHook, wrappedHook]);
        }
    }
    invoker.merged = true;
    def[hookKey] = invoker;
}

function extractPropsFromVNodeData(data, Ctor, tag) {
    // we are only extracting raw values here.
    // validation and default values are handled in the child
    // component itself.
    var propOptions = Ctor.options.props;
    if (isUndef(propOptions)) {
        return;
    }
    var res = {};
    var attrs = data.attrs, props = data.props;
    if (isDef(attrs) || isDef(props)) {
        for (var key in propOptions) {
            var altKey = hyphenate(key);
            if (false) { var keyInLowerCase; }
            checkProp(res, props, key, altKey, true) ||
                checkProp(res, attrs, key, altKey, false);
        }
    }
    return res;
}
function checkProp(res, hash, key, altKey, preserve) {
    if (isDef(hash)) {
        if (hasOwn(hash, key)) {
            res[key] = hash[key];
            if (!preserve) {
                delete hash[key];
            }
            return true;
        }
        else if (hasOwn(hash, altKey)) {
            res[key] = hash[altKey];
            if (!preserve) {
                delete hash[altKey];
            }
            return true;
        }
    }
    return false;
}

// The template compiler attempts to minimize the need for normalization by
// statically analyzing the template at compile time.
//
// For plain HTML markup, normalization can be completely skipped because the
// generated render function is guaranteed to return Array<VNode>. There are
// two cases where extra normalization is needed:
// 1. When the children contains components - because a functional component
// may return an Array instead of a single root. In this case, just a simple
// normalization is needed - if any child is an Array, we flatten the whole
// thing with Array.prototype.concat. It is guaranteed to be only 1-level deep
// because functional components already normalize their own children.
function simpleNormalizeChildren(children) {
    for (var i = 0; i < children.length; i++) {
        if (isArray(children[i])) {
            return Array.prototype.concat.apply([], children);
        }
    }
    return children;
}
// 2. When the children contains constructs that always generated nested Arrays,
// e.g. <template>, <slot>, v-for, or when the children is provided by user
// with hand-written render functions / JSX. In such cases a full normalization
// is needed to cater to all possible types of children values.
function normalizeChildren(children) {
    return isPrimitive(children)
        ? [createTextVNode(children)]
        : isArray(children)
            ? normalizeArrayChildren(children)
            : undefined;
}
function isTextNode(node) {
    return isDef(node) && isDef(node.text) && isFalse(node.isComment);
}
function normalizeArrayChildren(children, nestedIndex) {
    var res = [];
    var i, c, lastIndex, last;
    for (i = 0; i < children.length; i++) {
        c = children[i];
        if (isUndef(c) || typeof c === 'boolean')
            continue;
        lastIndex = res.length - 1;
        last = res[lastIndex];
        //  nested
        if (isArray(c)) {
            if (c.length > 0) {
                c = normalizeArrayChildren(c, "".concat(nestedIndex || '', "_").concat(i));
                // merge adjacent text nodes
                if (isTextNode(c[0]) && isTextNode(last)) {
                    res[lastIndex] = createTextVNode(last.text + c[0].text);
                    c.shift();
                }
                res.push.apply(res, c);
            }
        }
        else if (isPrimitive(c)) {
            if (isTextNode(last)) {
                // merge adjacent text nodes
                // this is necessary for SSR hydration because text nodes are
                // essentially merged when rendered to HTML strings
                res[lastIndex] = createTextVNode(last.text + c);
            }
            else if (c !== '') {
                // convert primitive to vnode
                res.push(createTextVNode(c));
            }
        }
        else {
            if (isTextNode(c) && isTextNode(last)) {
                // merge adjacent text nodes
                res[lastIndex] = createTextVNode(last.text + c.text);
            }
            else {
                // default key for nested array children (likely generated by v-for)
                if (isTrue(children._isVList) &&
                    isDef(c.tag) &&
                    isUndef(c.key) &&
                    isDef(nestedIndex)) {
                    c.key = "__vlist".concat(nestedIndex, "_").concat(i, "__");
                }
                res.push(c);
            }
        }
    }
    return res;
}

/**
 * Runtime helper for rendering v-for lists.
 */
function renderList(val, render) {
    var ret = null, i, l, keys, key;
    if (isArray(val) || typeof val === 'string') {
        ret = new Array(val.length);
        for (i = 0, l = val.length; i < l; i++) {
            ret[i] = render(val[i], i);
        }
    }
    else if (typeof val === 'number') {
        ret = new Array(val);
        for (i = 0; i < val; i++) {
            ret[i] = render(i + 1, i);
        }
    }
    else if (isObject(val)) {
        if (hasSymbol && val[Symbol.iterator]) {
            ret = [];
            var iterator = val[Symbol.iterator]();
            var result = iterator.next();
            while (!result.done) {
                ret.push(render(result.value, ret.length));
                result = iterator.next();
            }
        }
        else {
            keys = Object.keys(val);
            ret = new Array(keys.length);
            for (i = 0, l = keys.length; i < l; i++) {
                key = keys[i];
                ret[i] = render(val[key], key, i);
            }
        }
    }
    if (!isDef(ret)) {
        ret = [];
    }
    ret._isVList = true;
    return ret;
}

/**
 * Runtime helper for rendering <slot>
 */
function renderSlot(name, fallbackRender, props, bindObject) {
    var scopedSlotFn = this.$scopedSlots[name];
    var nodes;
    if (scopedSlotFn) {
        // scoped slot
        props = props || {};
        if (bindObject) {
            if (false) {}
            props = extend(extend({}, bindObject), props);
        }
        nodes =
            scopedSlotFn(props) ||
                (isFunction(fallbackRender) ? fallbackRender() : fallbackRender);
    }
    else {
        nodes =
            this.$slots[name] ||
                (isFunction(fallbackRender) ? fallbackRender() : fallbackRender);
    }
    var target = props && props.slot;
    if (target) {
        return this.$createElement('template', { slot: target }, nodes);
    }
    else {
        return nodes;
    }
}

/**
 * Runtime helper for resolving filters
 */
function resolveFilter(id) {
    return resolveAsset(this.$options, 'filters', id, true) || identity;
}

function isKeyNotMatch(expect, actual) {
    if (isArray(expect)) {
        return expect.indexOf(actual) === -1;
    }
    else {
        return expect !== actual;
    }
}
/**
 * Runtime helper for checking keyCodes from config.
 * exposed as Vue.prototype._k
 * passing in eventKeyName as last argument separately for backwards compat
 */
function checkKeyCodes(eventKeyCode, key, builtInKeyCode, eventKeyName, builtInKeyName) {
    var mappedKeyCode = config.keyCodes[key] || builtInKeyCode;
    if (builtInKeyName && eventKeyName && !config.keyCodes[key]) {
        return isKeyNotMatch(builtInKeyName, eventKeyName);
    }
    else if (mappedKeyCode) {
        return isKeyNotMatch(mappedKeyCode, eventKeyCode);
    }
    else if (eventKeyName) {
        return hyphenate(eventKeyName) !== key;
    }
    return eventKeyCode === undefined;
}

/**
 * Runtime helper for merging v-bind="object" into a VNode's data.
 */
function bindObjectProps(data, tag, value, asProp, isSync) {
    if (value) {
        if (!isObject(value)) {
             false &&
                0;
        }
        else {
            if (isArray(value)) {
                value = toObject(value);
            }
            var hash = void 0;
            var _loop_1 = function (key) {
                if (key === 'class' || key === 'style' || isReservedAttribute(key)) {
                    hash = data;
                }
                else {
                    var type = data.attrs && data.attrs.type;
                    hash =
                        asProp || config.mustUseProp(tag, type, key)
                            ? data.domProps || (data.domProps = {})
                            : data.attrs || (data.attrs = {});
                }
                var camelizedKey = camelize(key);
                var hyphenatedKey = hyphenate(key);
                if (!(camelizedKey in hash) && !(hyphenatedKey in hash)) {
                    hash[key] = value[key];
                    if (isSync) {
                        var on = data.on || (data.on = {});
                        on["update:".concat(key)] = function ($event) {
                            value[key] = $event;
                        };
                    }
                }
            };
            for (var key in value) {
                _loop_1(key);
            }
        }
    }
    return data;
}

/**
 * Runtime helper for rendering static trees.
 */
function renderStatic(index, isInFor) {
    var cached = this._staticTrees || (this._staticTrees = []);
    var tree = cached[index];
    // if has already-rendered static tree and not inside v-for,
    // we can reuse the same tree.
    if (tree && !isInFor) {
        return tree;
    }
    // otherwise, render a fresh tree.
    tree = cached[index] = this.$options.staticRenderFns[index].call(this._renderProxy, this._c, this // for render fns generated for functional component templates
    );
    markStatic(tree, "__static__".concat(index), false);
    return tree;
}
/**
 * Runtime helper for v-once.
 * Effectively it means marking the node as static with a unique key.
 */
function markOnce(tree, index, key) {
    markStatic(tree, "__once__".concat(index).concat(key ? "_".concat(key) : ""), true);
    return tree;
}
function markStatic(tree, key, isOnce) {
    if (isArray(tree)) {
        for (var i = 0; i < tree.length; i++) {
            if (tree[i] && typeof tree[i] !== 'string') {
                markStaticNode(tree[i], "".concat(key, "_").concat(i), isOnce);
            }
        }
    }
    else {
        markStaticNode(tree, key, isOnce);
    }
}
function markStaticNode(node, key, isOnce) {
    node.isStatic = true;
    node.key = key;
    node.isOnce = isOnce;
}

function bindObjectListeners(data, value) {
    if (value) {
        if (!isPlainObject(value)) {
             false && 0;
        }
        else {
            var on = (data.on = data.on ? extend({}, data.on) : {});
            for (var key in value) {
                var existing = on[key];
                var ours = value[key];
                on[key] = existing ? [].concat(existing, ours) : ours;
            }
        }
    }
    return data;
}

function resolveScopedSlots(fns, res, 
// the following are added in 2.6
hasDynamicKeys, contentHashKey) {
    res = res || { $stable: !hasDynamicKeys };
    for (var i = 0; i < fns.length; i++) {
        var slot = fns[i];
        if (isArray(slot)) {
            resolveScopedSlots(slot, res, hasDynamicKeys);
        }
        else if (slot) {
            // marker for reverse proxying v-slot without scope on this.$slots
            // @ts-expect-error
            if (slot.proxy) {
                // @ts-expect-error
                slot.fn.proxy = true;
            }
            res[slot.key] = slot.fn;
        }
    }
    if (contentHashKey) {
        res.$key = contentHashKey;
    }
    return res;
}

// helper to process dynamic keys for dynamic arguments in v-bind and v-on.
function bindDynamicKeys(baseObj, values) {
    for (var i = 0; i < values.length; i += 2) {
        var key = values[i];
        if (typeof key === 'string' && key) {
            baseObj[values[i]] = values[i + 1];
        }
        else if (false) {}
    }
    return baseObj;
}
// helper to dynamically append modifier runtime markers to event names.
// ensure only append when value is already string, otherwise it will be cast
// to string and cause the type check to miss.
function prependModifier(value, symbol) {
    return typeof value === 'string' ? symbol + value : value;
}

function installRenderHelpers(target) {
    target._o = markOnce;
    target._n = toNumber;
    target._s = toString;
    target._l = renderList;
    target._t = renderSlot;
    target._q = looseEqual;
    target._i = looseIndexOf;
    target._m = renderStatic;
    target._f = resolveFilter;
    target._k = checkKeyCodes;
    target._b = bindObjectProps;
    target._v = createTextVNode;
    target._e = createEmptyVNode;
    target._u = resolveScopedSlots;
    target._g = bindObjectListeners;
    target._d = bindDynamicKeys;
    target._p = prependModifier;
}

/**
 * Runtime helper for resolving raw children VNodes into a slot object.
 */
function resolveSlots(children, context) {
    if (!children || !children.length) {
        return {};
    }
    var slots = {};
    for (var i = 0, l = children.length; i < l; i++) {
        var child = children[i];
        var data = child.data;
        // remove slot attribute if the node is resolved as a Vue slot node
        if (data && data.attrs && data.attrs.slot) {
            delete data.attrs.slot;
        }
        // named slots should only be respected if the vnode was rendered in the
        // same context.
        if ((child.context === context || child.fnContext === context) &&
            data &&
            data.slot != null) {
            var name_1 = data.slot;
            var slot = slots[name_1] || (slots[name_1] = []);
            if (child.tag === 'template') {
                slot.push.apply(slot, child.children || []);
            }
            else {
                slot.push(child);
            }
        }
        else {
            (slots.default || (slots.default = [])).push(child);
        }
    }
    // ignore slots that contains only whitespace
    for (var name_2 in slots) {
        if (slots[name_2].every(isWhitespace)) {
            delete slots[name_2];
        }
    }
    return slots;
}
function isWhitespace(node) {
    return (node.isComment && !node.asyncFactory) || node.text === ' ';
}

function isAsyncPlaceholder(node) {
    // @ts-expect-error not really boolean type
    return node.isComment && node.asyncFactory;
}

function normalizeScopedSlots(ownerVm, scopedSlots, normalSlots, prevScopedSlots) {
    var res;
    var hasNormalSlots = Object.keys(normalSlots).length > 0;
    var isStable = scopedSlots ? !!scopedSlots.$stable : !hasNormalSlots;
    var key = scopedSlots && scopedSlots.$key;
    if (!scopedSlots) {
        res = {};
    }
    else if (scopedSlots._normalized) {
        // fast path 1: child component re-render only, parent did not change
        return scopedSlots._normalized;
    }
    else if (isStable &&
        prevScopedSlots &&
        prevScopedSlots !== emptyObject &&
        key === prevScopedSlots.$key &&
        !hasNormalSlots &&
        !prevScopedSlots.$hasNormal) {
        // fast path 2: stable scoped slots w/ no normal slots to proxy,
        // only need to normalize once
        return prevScopedSlots;
    }
    else {
        res = {};
        for (var key_1 in scopedSlots) {
            if (scopedSlots[key_1] && key_1[0] !== '$') {
                res[key_1] = normalizeScopedSlot(ownerVm, normalSlots, key_1, scopedSlots[key_1]);
            }
        }
    }
    // expose normal slots on scopedSlots
    for (var key_2 in normalSlots) {
        if (!(key_2 in res)) {
            res[key_2] = proxyNormalSlot(normalSlots, key_2);
        }
    }
    // avoriaz seems to mock a non-extensible $scopedSlots object
    // and when that is passed down this would cause an error
    if (scopedSlots && Object.isExtensible(scopedSlots)) {
        scopedSlots._normalized = res;
    }
    def(res, '$stable', isStable);
    def(res, '$key', key);
    def(res, '$hasNormal', hasNormalSlots);
    return res;
}
function normalizeScopedSlot(vm, normalSlots, key, fn) {
    var normalized = function () {
        var cur = currentInstance;
        setCurrentInstance(vm);
        var res = arguments.length ? fn.apply(null, arguments) : fn({});
        res =
            res && typeof res === 'object' && !isArray(res)
                ? [res] // single vnode
                : normalizeChildren(res);
        var vnode = res && res[0];
        setCurrentInstance(cur);
        return res &&
            (!vnode ||
                (res.length === 1 && vnode.isComment && !isAsyncPlaceholder(vnode))) // #9658, #10391
            ? undefined
            : res;
    };
    // this is a slot using the new v-slot syntax without scope. although it is
    // compiled as a scoped slot, render fn users would expect it to be present
    // on this.$slots because the usage is semantically a normal slot.
    if (fn.proxy) {
        Object.defineProperty(normalSlots, key, {
            get: normalized,
            enumerable: true,
            configurable: true
        });
    }
    return normalized;
}
function proxyNormalSlot(slots, key) {
    return function () { return slots[key]; };
}

function initSetup(vm) {
    var options = vm.$options;
    var setup = options.setup;
    if (setup) {
        var ctx = (vm._setupContext = createSetupContext(vm));
        setCurrentInstance(vm);
        pushTarget();
        var setupResult = invokeWithErrorHandling(setup, null, [vm._props || shallowReactive({}), ctx], vm, "setup");
        popTarget();
        setCurrentInstance();
        if (isFunction(setupResult)) {
            // render function
            // @ts-ignore
            options.render = setupResult;
        }
        else if (isObject(setupResult)) {
            // bindings
            if (false) {}
            vm._setupState = setupResult;
            // __sfc indicates compiled bindings from <script setup>
            if (!setupResult.__sfc) {
                for (var key in setupResult) {
                    if (!isReserved(key)) {
                        proxyWithRefUnwrap(vm, setupResult, key);
                    }
                    else if (false) {}
                }
            }
            else {
                // exposed for compiled render fn
                var proxy = (vm._setupProxy = {});
                for (var key in setupResult) {
                    if (key !== '__sfc') {
                        proxyWithRefUnwrap(proxy, setupResult, key);
                    }
                }
            }
        }
        else if (false) {}
    }
}
function createSetupContext(vm) {
    var exposeCalled = false;
    return {
        get attrs() {
            if (!vm._attrsProxy) {
                var proxy = (vm._attrsProxy = {});
                def(proxy, '_v_attr_proxy', true);
                syncSetupProxy(proxy, vm.$attrs, emptyObject, vm, '$attrs');
            }
            return vm._attrsProxy;
        },
        get listeners() {
            if (!vm._listenersProxy) {
                var proxy = (vm._listenersProxy = {});
                syncSetupProxy(proxy, vm.$listeners, emptyObject, vm, '$listeners');
            }
            return vm._listenersProxy;
        },
        get slots() {
            return initSlotsProxy(vm);
        },
        emit: bind(vm.$emit, vm),
        expose: function (exposed) {
            if (false) {}
            if (exposed) {
                Object.keys(exposed).forEach(function (key) {
                    return proxyWithRefUnwrap(vm, exposed, key);
                });
            }
        }
    };
}
function syncSetupProxy(to, from, prev, instance, type) {
    var changed = false;
    for (var key in from) {
        if (!(key in to)) {
            changed = true;
            defineProxyAttr(to, key, instance, type);
        }
        else if (from[key] !== prev[key]) {
            changed = true;
        }
    }
    for (var key in to) {
        if (!(key in from)) {
            changed = true;
            delete to[key];
        }
    }
    return changed;
}
function defineProxyAttr(proxy, key, instance, type) {
    Object.defineProperty(proxy, key, {
        enumerable: true,
        configurable: true,
        get: function () {
            return instance[type][key];
        }
    });
}
function initSlotsProxy(vm) {
    if (!vm._slotsProxy) {
        syncSetupSlots((vm._slotsProxy = {}), vm.$scopedSlots);
    }
    return vm._slotsProxy;
}
function syncSetupSlots(to, from) {
    for (var key in from) {
        to[key] = from[key];
    }
    for (var key in to) {
        if (!(key in from)) {
            delete to[key];
        }
    }
}
/**
 * @internal use manual type def because public setup context type relies on
 * legacy VNode types
 */
function useSlots() {
    return getContext().slots;
}
/**
 * @internal use manual type def because public setup context type relies on
 * legacy VNode types
 */
function useAttrs() {
    return getContext().attrs;
}
/**
 * Vue 2 only
 * @internal use manual type def because public setup context type relies on
 * legacy VNode types
 */
function useListeners() {
    return getContext().listeners;
}
function getContext() {
    if (false) {}
    var vm = currentInstance;
    return vm._setupContext || (vm._setupContext = createSetupContext(vm));
}
/**
 * Runtime helper for merging default declarations. Imported by compiled code
 * only.
 * @internal
 */
function mergeDefaults(raw, defaults) {
    var props = isArray(raw)
        ? raw.reduce(function (normalized, p) { return ((normalized[p] = {}), normalized); }, {})
        : raw;
    for (var key in defaults) {
        var opt = props[key];
        if (opt) {
            if (isArray(opt) || isFunction(opt)) {
                props[key] = { type: opt, default: defaults[key] };
            }
            else {
                opt.default = defaults[key];
            }
        }
        else if (opt === null) {
            props[key] = { default: defaults[key] };
        }
        else if (false) {}
    }
    return props;
}

function initRender(vm) {
    vm._vnode = null; // the root of the child tree
    vm._staticTrees = null; // v-once cached trees
    var options = vm.$options;
    var parentVnode = (vm.$vnode = options._parentVnode); // the placeholder node in parent tree
    var renderContext = parentVnode && parentVnode.context;
    vm.$slots = resolveSlots(options._renderChildren, renderContext);
    vm.$scopedSlots = parentVnode
        ? normalizeScopedSlots(vm.$parent, parentVnode.data.scopedSlots, vm.$slots)
        : emptyObject;
    // bind the createElement fn to this instance
    // so that we get proper render context inside it.
    // args order: tag, data, children, normalizationType, alwaysNormalize
    // internal version is used by render functions compiled from templates
    // @ts-expect-error
    vm._c = function (a, b, c, d) { return createElement$1(vm, a, b, c, d, false); };
    // normalization is always applied for the public version, used in
    // user-written render functions.
    // @ts-expect-error
    vm.$createElement = function (a, b, c, d) { return createElement$1(vm, a, b, c, d, true); };
    // $attrs & $listeners are exposed for easier HOC creation.
    // they need to be reactive so that HOCs using them are always updated
    var parentData = parentVnode && parentVnode.data;
    /* istanbul ignore else */
    if (false) {}
    else {
        defineReactive(vm, '$attrs', (parentData && parentData.attrs) || emptyObject, null, true);
        defineReactive(vm, '$listeners', options._parentListeners || emptyObject, null, true);
    }
}
var currentRenderingInstance = null;
function renderMixin(Vue) {
    // install runtime convenience helpers
    installRenderHelpers(Vue.prototype);
    Vue.prototype.$nextTick = function (fn) {
        return nextTick(fn, this);
    };
    Vue.prototype._render = function () {
        var vm = this;
        var _a = vm.$options, render = _a.render, _parentVnode = _a._parentVnode;
        if (_parentVnode && vm._isMounted) {
            vm.$scopedSlots = normalizeScopedSlots(vm.$parent, _parentVnode.data.scopedSlots, vm.$slots, vm.$scopedSlots);
            if (vm._slotsProxy) {
                syncSetupSlots(vm._slotsProxy, vm.$scopedSlots);
            }
        }
        // set parent vnode. this allows render functions to have access
        // to the data on the placeholder node.
        vm.$vnode = _parentVnode;
        // render self
        var vnode;
        try {
            // There's no need to maintain a stack because all render fns are called
            // separately from one another. Nested component's render fns are called
            // when parent component is patched.
            setCurrentInstance(vm);
            currentRenderingInstance = vm;
            vnode = render.call(vm._renderProxy, vm.$createElement);
        }
        catch (e) {
            handleError(e, vm, "render");
            // return error render result,
            // or previous vnode to prevent render error causing blank component
            /* istanbul ignore else */
            if (false) {}
            else {
                vnode = vm._vnode;
            }
        }
        finally {
            currentRenderingInstance = null;
            setCurrentInstance();
        }
        // if the returned array contains only a single node, allow it
        if (isArray(vnode) && vnode.length === 1) {
            vnode = vnode[0];
        }
        // return empty vnode in case the render function errored out
        if (!(vnode instanceof VNode)) {
            if (false) {}
            vnode = createEmptyVNode();
        }
        // set parent
        vnode.parent = _parentVnode;
        return vnode;
    };
}

function ensureCtor(comp, base) {
    if (comp.__esModule || (hasSymbol && comp[Symbol.toStringTag] === 'Module')) {
        comp = comp.default;
    }
    return isObject(comp) ? base.extend(comp) : comp;
}
function createAsyncPlaceholder(factory, data, context, children, tag) {
    var node = createEmptyVNode();
    node.asyncFactory = factory;
    node.asyncMeta = { data: data, context: context, children: children, tag: tag };
    return node;
}
function resolveAsyncComponent(factory, baseCtor) {
    if (isTrue(factory.error) && isDef(factory.errorComp)) {
        return factory.errorComp;
    }
    if (isDef(factory.resolved)) {
        return factory.resolved;
    }
    var owner = currentRenderingInstance;
    if (owner && isDef(factory.owners) && factory.owners.indexOf(owner) === -1) {
        // already pending
        factory.owners.push(owner);
    }
    if (isTrue(factory.loading) && isDef(factory.loadingComp)) {
        return factory.loadingComp;
    }
    if (owner && !isDef(factory.owners)) {
        var owners_1 = (factory.owners = [owner]);
        var sync_1 = true;
        var timerLoading_1 = null;
        var timerTimeout_1 = null;
        owner.$on('hook:destroyed', function () { return remove$2(owners_1, owner); });
        var forceRender_1 = function (renderCompleted) {
            for (var i = 0, l = owners_1.length; i < l; i++) {
                owners_1[i].$forceUpdate();
            }
            if (renderCompleted) {
                owners_1.length = 0;
                if (timerLoading_1 !== null) {
                    clearTimeout(timerLoading_1);
                    timerLoading_1 = null;
                }
                if (timerTimeout_1 !== null) {
                    clearTimeout(timerTimeout_1);
                    timerTimeout_1 = null;
                }
            }
        };
        var resolve = once(function (res) {
            // cache resolved
            factory.resolved = ensureCtor(res, baseCtor);
            // invoke callbacks only if this is not a synchronous resolve
            // (async resolves are shimmed as synchronous during SSR)
            if (!sync_1) {
                forceRender_1(true);
            }
            else {
                owners_1.length = 0;
            }
        });
        var reject_1 = once(function (reason) {
             false &&
                0;
            if (isDef(factory.errorComp)) {
                factory.error = true;
                forceRender_1(true);
            }
        });
        var res_1 = factory(resolve, reject_1);
        if (isObject(res_1)) {
            if (isPromise(res_1)) {
                // () => Promise
                if (isUndef(factory.resolved)) {
                    res_1.then(resolve, reject_1);
                }
            }
            else if (isPromise(res_1.component)) {
                res_1.component.then(resolve, reject_1);
                if (isDef(res_1.error)) {
                    factory.errorComp = ensureCtor(res_1.error, baseCtor);
                }
                if (isDef(res_1.loading)) {
                    factory.loadingComp = ensureCtor(res_1.loading, baseCtor);
                    if (res_1.delay === 0) {
                        factory.loading = true;
                    }
                    else {
                        // @ts-expect-error NodeJS timeout type
                        timerLoading_1 = setTimeout(function () {
                            timerLoading_1 = null;
                            if (isUndef(factory.resolved) && isUndef(factory.error)) {
                                factory.loading = true;
                                forceRender_1(false);
                            }
                        }, res_1.delay || 200);
                    }
                }
                if (isDef(res_1.timeout)) {
                    // @ts-expect-error NodeJS timeout type
                    timerTimeout_1 = setTimeout(function () {
                        timerTimeout_1 = null;
                        if (isUndef(factory.resolved)) {
                            reject_1( false ? 0 : null);
                        }
                    }, res_1.timeout);
                }
            }
        }
        sync_1 = false;
        // return in case resolved synchronously
        return factory.loading ? factory.loadingComp : factory.resolved;
    }
}

function getFirstComponentChild(children) {
    if (isArray(children)) {
        for (var i = 0; i < children.length; i++) {
            var c = children[i];
            if (isDef(c) && (isDef(c.componentOptions) || isAsyncPlaceholder(c))) {
                return c;
            }
        }
    }
}

var SIMPLE_NORMALIZE = 1;
var ALWAYS_NORMALIZE = 2;
// wrapper function for providing a more flexible interface
// without getting yelled at by flow
function createElement$1(context, tag, data, children, normalizationType, alwaysNormalize) {
    if (isArray(data) || isPrimitive(data)) {
        normalizationType = children;
        children = data;
        data = undefined;
    }
    if (isTrue(alwaysNormalize)) {
        normalizationType = ALWAYS_NORMALIZE;
    }
    return _createElement(context, tag, data, children, normalizationType);
}
function _createElement(context, tag, data, children, normalizationType) {
    if (isDef(data) && isDef(data.__ob__)) {
         false &&
            0;
        return createEmptyVNode();
    }
    // object syntax in v-bind
    if (isDef(data) && isDef(data.is)) {
        tag = data.is;
    }
    if (!tag) {
        // in case of component :is set to falsy value
        return createEmptyVNode();
    }
    // warn against non-primitive key
    if (false) {}
    // support single function children as default scoped slot
    if (isArray(children) && isFunction(children[0])) {
        data = data || {};
        data.scopedSlots = { default: children[0] };
        children.length = 0;
    }
    if (normalizationType === ALWAYS_NORMALIZE) {
        children = normalizeChildren(children);
    }
    else if (normalizationType === SIMPLE_NORMALIZE) {
        children = simpleNormalizeChildren(children);
    }
    var vnode, ns;
    if (typeof tag === 'string') {
        var Ctor = void 0;
        ns = (context.$vnode && context.$vnode.ns) || config.getTagNamespace(tag);
        if (config.isReservedTag(tag)) {
            // platform built-in elements
            if (false) {}
            vnode = new VNode(config.parsePlatformTagName(tag), data, children, undefined, undefined, context);
        }
        else if ((!data || !data.pre) &&
            isDef((Ctor = resolveAsset(context.$options, 'components', tag)))) {
            // component
            vnode = createComponent(Ctor, data, context, children, tag);
        }
        else {
            // unknown or unlisted namespaced elements
            // check at runtime because it may get assigned a namespace when its
            // parent normalizes children
            vnode = new VNode(tag, data, children, undefined, undefined, context);
        }
    }
    else {
        // direct component options / constructor
        vnode = createComponent(tag, data, context, children);
    }
    if (isArray(vnode)) {
        return vnode;
    }
    else if (isDef(vnode)) {
        if (isDef(ns))
            applyNS(vnode, ns);
        if (isDef(data))
            registerDeepBindings(data);
        return vnode;
    }
    else {
        return createEmptyVNode();
    }
}
function applyNS(vnode, ns, force) {
    vnode.ns = ns;
    if (vnode.tag === 'foreignObject') {
        // use default namespace inside foreignObject
        ns = undefined;
        force = true;
    }
    if (isDef(vnode.children)) {
        for (var i = 0, l = vnode.children.length; i < l; i++) {
            var child = vnode.children[i];
            if (isDef(child.tag) &&
                (isUndef(child.ns) || (isTrue(force) && child.tag !== 'svg'))) {
                applyNS(child, ns, force);
            }
        }
    }
}
// ref #5318
// necessary to ensure parent re-render when deep bindings like :style and
// :class are used on slot nodes
function registerDeepBindings(data) {
    if (isObject(data.style)) {
        traverse(data.style);
    }
    if (isObject(data.class)) {
        traverse(data.class);
    }
}

/**
 * @internal this function needs manual public type declaration because it relies
 * on previously manually authored types from Vue 2
 */
function h(type, props, children) {
    if (!currentInstance) {
         false &&
            0;
    }
    return createElement$1(currentInstance, type, props, children, 2, true);
}

function handleError(err, vm, info) {
    // Deactivate deps tracking while processing error handler to avoid possible infinite rendering.
    // See: https://github.com/vuejs/vuex/issues/1505
    pushTarget();
    try {
        if (vm) {
            var cur = vm;
            while ((cur = cur.$parent)) {
                var hooks = cur.$options.errorCaptured;
                if (hooks) {
                    for (var i = 0; i < hooks.length; i++) {
                        try {
                            var capture = hooks[i].call(cur, err, vm, info) === false;
                            if (capture)
                                return;
                        }
                        catch (e) {
                            globalHandleError(e, cur, 'errorCaptured hook');
                        }
                    }
                }
            }
        }
        globalHandleError(err, vm, info);
    }
    finally {
        popTarget();
    }
}
function invokeWithErrorHandling(handler, context, args, vm, info) {
    var res;
    try {
        res = args ? handler.apply(context, args) : handler.call(context);
        if (res && !res._isVue && isPromise(res) && !res._handled) {
            res.catch(function (e) { return handleError(e, vm, info + " (Promise/async)"); });
            res._handled = true;
        }
    }
    catch (e) {
        handleError(e, vm, info);
    }
    return res;
}
function globalHandleError(err, vm, info) {
    if (config.errorHandler) {
        try {
            return config.errorHandler.call(null, err, vm, info);
        }
        catch (e) {
            // if the user intentionally throws the original error in the handler,
            // do not log it twice
            if (e !== err) {
                logError(e, null, 'config.errorHandler');
            }
        }
    }
    logError(err, vm, info);
}
function logError(err, vm, info) {
    if (false) {}
    /* istanbul ignore else */
    if (inBrowser && typeof console !== 'undefined') {
        console.error(err);
    }
    else {
        throw err;
    }
}

/* globals MutationObserver */
var isUsingMicroTask = false;
var callbacks = [];
var pending = false;
function flushCallbacks() {
    pending = false;
    var copies = callbacks.slice(0);
    callbacks.length = 0;
    for (var i = 0; i < copies.length; i++) {
        copies[i]();
    }
}
// Here we have async deferring wrappers using microtasks.
// In 2.5 we used (macro) tasks (in combination with microtasks).
// However, it has subtle problems when state is changed right before repaint
// (e.g. #6813, out-in transitions).
// Also, using (macro) tasks in event handler would cause some weird behaviors
// that cannot be circumvented (e.g. #7109, #7153, #7546, #7834, #8109).
// So we now use microtasks everywhere, again.
// A major drawback of this tradeoff is that there are some scenarios
// where microtasks have too high a priority and fire in between supposedly
// sequential events (e.g. #4521, #6690, which have workarounds)
// or even between bubbling of the same event (#6566).
var timerFunc;
// The nextTick behavior leverages the microtask queue, which can be accessed
// via either native Promise.then or MutationObserver.
// MutationObserver has wider support, however it is seriously bugged in
// UIWebView in iOS >= 9.3.3 when triggered in touch event handlers. It
// completely stops working after triggering a few times... so, if native
// Promise is available, we will use it:
/* istanbul ignore next, $flow-disable-line */
if (typeof Promise !== 'undefined' && isNative(Promise)) {
    var p_1 = Promise.resolve();
    timerFunc = function () {
        p_1.then(flushCallbacks);
        // In problematic UIWebViews, Promise.then doesn't completely break, but
        // it can get stuck in a weird state where callbacks are pushed into the
        // microtask queue but the queue isn't being flushed, until the browser
        // needs to do some other work, e.g. handle a timer. Therefore we can
        // "force" the microtask queue to be flushed by adding an empty timer.
        if (isIOS)
            setTimeout(noop);
    };
    isUsingMicroTask = true;
}
else if (!isIE &&
    typeof MutationObserver !== 'undefined' &&
    (isNative(MutationObserver) ||
        // PhantomJS and iOS 7.x
        MutationObserver.toString() === '[object MutationObserverConstructor]')) {
    // Use MutationObserver where native Promise is not available,
    // e.g. PhantomJS, iOS7, Android 4.4
    // (#6466 MutationObserver is unreliable in IE11)
    var counter_1 = 1;
    var observer = new MutationObserver(flushCallbacks);
    var textNode_1 = document.createTextNode(String(counter_1));
    observer.observe(textNode_1, {
        characterData: true
    });
    timerFunc = function () {
        counter_1 = (counter_1 + 1) % 2;
        textNode_1.data = String(counter_1);
    };
    isUsingMicroTask = true;
}
else if (typeof setImmediate !== 'undefined' && isNative(setImmediate)) {
    // Fallback to setImmediate.
    // Technically it leverages the (macro) task queue,
    // but it is still a better choice than setTimeout.
    timerFunc = function () {
        setImmediate(flushCallbacks);
    };
}
else {
    // Fallback to setTimeout.
    timerFunc = function () {
        setTimeout(flushCallbacks, 0);
    };
}
/**
 * @internal
 */
function nextTick(cb, ctx) {
    var _resolve;
    callbacks.push(function () {
        if (cb) {
            try {
                cb.call(ctx);
            }
            catch (e) {
                handleError(e, ctx, 'nextTick');
            }
        }
        else if (_resolve) {
            _resolve(ctx);
        }
    });
    if (!pending) {
        pending = true;
        timerFunc();
    }
    // $flow-disable-line
    if (!cb && typeof Promise !== 'undefined') {
        return new Promise(function (resolve) {
            _resolve = resolve;
        });
    }
}

function useCssModule(name) {
    if (name === void 0) { name = '$style'; }
    /* istanbul ignore else */
    {
        if (!currentInstance) {
             false && 0;
            return emptyObject;
        }
        var mod = currentInstance[name];
        if (!mod) {
             false &&
                0;
            return emptyObject;
        }
        return mod;
    }
}

/**
 * Runtime helper for SFC's CSS variable injection feature.
 * @private
 */
function useCssVars(getter) {
    if (!inBrowser && !false)
        return;
    var instance = currentInstance;
    if (!instance) {
         false &&
            0;
        return;
    }
    watchPostEffect(function () {
        var el = instance.$el;
        var vars = getter(instance, instance._setupProxy);
        if (el && el.nodeType === 1) {
            var style = el.style;
            for (var key in vars) {
                style.setProperty("--".concat(key), vars[key]);
            }
        }
    });
}

/**
 * v3-compatible async component API.
 * @internal the type is manually declared in <root>/types/v3-define-async-component.d.ts
 * because it relies on existing manual types
 */
function defineAsyncComponent(source) {
    if (isFunction(source)) {
        source = { loader: source };
    }
    var loader = source.loader, loadingComponent = source.loadingComponent, errorComponent = source.errorComponent, _a = source.delay, delay = _a === void 0 ? 200 : _a, timeout = source.timeout, // undefined = never times out
    _b = source.suspensible, // undefined = never times out
    suspensible = _b === void 0 ? false : _b, // in Vue 3 default is true
    userOnError = source.onError;
    if (false) {}
    var pendingRequest = null;
    var retries = 0;
    var retry = function () {
        retries++;
        pendingRequest = null;
        return load();
    };
    var load = function () {
        var thisRequest;
        return (pendingRequest ||
            (thisRequest = pendingRequest =
                loader()
                    .catch(function (err) {
                    err = err instanceof Error ? err : new Error(String(err));
                    if (userOnError) {
                        return new Promise(function (resolve, reject) {
                            var userRetry = function () { return resolve(retry()); };
                            var userFail = function () { return reject(err); };
                            userOnError(err, userRetry, userFail, retries + 1);
                        });
                    }
                    else {
                        throw err;
                    }
                })
                    .then(function (comp) {
                    if (thisRequest !== pendingRequest && pendingRequest) {
                        return pendingRequest;
                    }
                    if (false) {}
                    // interop module default
                    if (comp &&
                        (comp.__esModule || comp[Symbol.toStringTag] === 'Module')) {
                        comp = comp.default;
                    }
                    if (false) {}
                    return comp;
                })));
    };
    return function () {
        var component = load();
        return {
            component: component,
            delay: delay,
            timeout: timeout,
            error: errorComponent,
            loading: loadingComponent
        };
    };
}

function createLifeCycle(hookName) {
    return function (fn, target) {
        if (target === void 0) { target = currentInstance; }
        if (!target) {
             false &&
                0;
            return;
        }
        return injectHook(target, hookName, fn);
    };
}
function formatName(name) {
    if (name === 'beforeDestroy') {
        name = 'beforeUnmount';
    }
    else if (name === 'destroyed') {
        name = 'unmounted';
    }
    return "on".concat(name[0].toUpperCase() + name.slice(1));
}
function injectHook(instance, hookName, fn) {
    var options = instance.$options;
    options[hookName] = mergeLifecycleHook(options[hookName], fn);
}
var onBeforeMount = createLifeCycle('beforeMount');
var onMounted = createLifeCycle('mounted');
var onBeforeUpdate = createLifeCycle('beforeUpdate');
var onUpdated = createLifeCycle('updated');
var onBeforeUnmount = createLifeCycle('beforeDestroy');
var onUnmounted = createLifeCycle('destroyed');
var onActivated = createLifeCycle('activated');
var onDeactivated = createLifeCycle('deactivated');
var onServerPrefetch = createLifeCycle('serverPrefetch');
var onRenderTracked = createLifeCycle('renderTracked');
var onRenderTriggered = createLifeCycle('renderTriggered');
var injectErrorCapturedHook = createLifeCycle('errorCaptured');
function onErrorCaptured(hook, target) {
    if (target === void 0) { target = currentInstance; }
    injectErrorCapturedHook(hook, target);
}

/**
 * Note: also update dist/vue.runtime.mjs when adding new exports to this file.
 */
var version = '2.7.14';
/**
 * @internal type is manually declared in <root>/types/v3-define-component.d.ts
 */
function defineComponent(options) {
    return options;
}

var seenObjects = new _Set();
/**
 * Recursively traverse an object to evoke all converted
 * getters, so that every nested property inside the object
 * is collected as a "deep" dependency.
 */
function traverse(val) {
    _traverse(val, seenObjects);
    seenObjects.clear();
    return val;
}
function _traverse(val, seen) {
    var i, keys;
    var isA = isArray(val);
    if ((!isA && !isObject(val)) ||
        val.__v_skip /* ReactiveFlags.SKIP */ ||
        Object.isFrozen(val) ||
        val instanceof VNode) {
        return;
    }
    if (val.__ob__) {
        var depId = val.__ob__.dep.id;
        if (seen.has(depId)) {
            return;
        }
        seen.add(depId);
    }
    if (isA) {
        i = val.length;
        while (i--)
            _traverse(val[i], seen);
    }
    else if (isRef(val)) {
        _traverse(val.value, seen);
    }
    else {
        keys = Object.keys(val);
        i = keys.length;
        while (i--)
            _traverse(val[keys[i]], seen);
    }
}

var uid$1 = 0;
/**
 * A watcher parses an expression, collects dependencies,
 * and fires callback when the expression value changes.
 * This is used for both the $watch() api and directives.
 * @internal
 */
var Watcher = /** @class */ (function () {
    function Watcher(vm, expOrFn, cb, options, isRenderWatcher) {
        recordEffectScope(this, 
        // if the active effect scope is manually created (not a component scope),
        // prioritize it
        activeEffectScope && !activeEffectScope._vm
            ? activeEffectScope
            : vm
                ? vm._scope
                : undefined);
        if ((this.vm = vm) && isRenderWatcher) {
            vm._watcher = this;
        }
        // options
        if (options) {
            this.deep = !!options.deep;
            this.user = !!options.user;
            this.lazy = !!options.lazy;
            this.sync = !!options.sync;
            this.before = options.before;
            if (false) {}
        }
        else {
            this.deep = this.user = this.lazy = this.sync = false;
        }
        this.cb = cb;
        this.id = ++uid$1; // uid for batching
        this.active = true;
        this.post = false;
        this.dirty = this.lazy; // for lazy watchers
        this.deps = [];
        this.newDeps = [];
        this.depIds = new _Set();
        this.newDepIds = new _Set();
        this.expression =  false ? 0 : '';
        // parse expression for getter
        if (isFunction(expOrFn)) {
            this.getter = expOrFn;
        }
        else {
            this.getter = parsePath(expOrFn);
            if (!this.getter) {
                this.getter = noop;
                 false &&
                    0;
            }
        }
        this.value = this.lazy ? undefined : this.get();
    }
    /**
     * Evaluate the getter, and re-collect dependencies.
     */
    Watcher.prototype.get = function () {
        pushTarget(this);
        var value;
        var vm = this.vm;
        try {
            value = this.getter.call(vm, vm);
        }
        catch (e) {
            if (this.user) {
                handleError(e, vm, "getter for watcher \"".concat(this.expression, "\""));
            }
            else {
                throw e;
            }
        }
        finally {
            // "touch" every property so they are all tracked as
            // dependencies for deep watching
            if (this.deep) {
                traverse(value);
            }
            popTarget();
            this.cleanupDeps();
        }
        return value;
    };
    /**
     * Add a dependency to this directive.
     */
    Watcher.prototype.addDep = function (dep) {
        var id = dep.id;
        if (!this.newDepIds.has(id)) {
            this.newDepIds.add(id);
            this.newDeps.push(dep);
            if (!this.depIds.has(id)) {
                dep.addSub(this);
            }
        }
    };
    /**
     * Clean up for dependency collection.
     */
    Watcher.prototype.cleanupDeps = function () {
        var i = this.deps.length;
        while (i--) {
            var dep = this.deps[i];
            if (!this.newDepIds.has(dep.id)) {
                dep.removeSub(this);
            }
        }
        var tmp = this.depIds;
        this.depIds = this.newDepIds;
        this.newDepIds = tmp;
        this.newDepIds.clear();
        tmp = this.deps;
        this.deps = this.newDeps;
        this.newDeps = tmp;
        this.newDeps.length = 0;
    };
    /**
     * Subscriber interface.
     * Will be called when a dependency changes.
     */
    Watcher.prototype.update = function () {
        /* istanbul ignore else */
        if (this.lazy) {
            this.dirty = true;
        }
        else if (this.sync) {
            this.run();
        }
        else {
            queueWatcher(this);
        }
    };
    /**
     * Scheduler job interface.
     * Will be called by the scheduler.
     */
    Watcher.prototype.run = function () {
        if (this.active) {
            var value = this.get();
            if (value !== this.value ||
                // Deep watchers and watchers on Object/Arrays should fire even
                // when the value is the same, because the value may
                // have mutated.
                isObject(value) ||
                this.deep) {
                // set new value
                var oldValue = this.value;
                this.value = value;
                if (this.user) {
                    var info = "callback for watcher \"".concat(this.expression, "\"");
                    invokeWithErrorHandling(this.cb, this.vm, [value, oldValue], this.vm, info);
                }
                else {
                    this.cb.call(this.vm, value, oldValue);
                }
            }
        }
    };
    /**
     * Evaluate the value of the watcher.
     * This only gets called for lazy watchers.
     */
    Watcher.prototype.evaluate = function () {
        this.value = this.get();
        this.dirty = false;
    };
    /**
     * Depend on all deps collected by this watcher.
     */
    Watcher.prototype.depend = function () {
        var i = this.deps.length;
        while (i--) {
            this.deps[i].depend();
        }
    };
    /**
     * Remove self from all dependencies' subscriber list.
     */
    Watcher.prototype.teardown = function () {
        if (this.vm && !this.vm._isBeingDestroyed) {
            remove$2(this.vm._scope.effects, this);
        }
        if (this.active) {
            var i = this.deps.length;
            while (i--) {
                this.deps[i].removeSub(this);
            }
            this.active = false;
            if (this.onStop) {
                this.onStop();
            }
        }
    };
    return Watcher;
}());

var mark;
var measure;
if (false) { var perf_1; }

function initEvents(vm) {
    vm._events = Object.create(null);
    vm._hasHookEvent = false;
    // init parent attached events
    var listeners = vm.$options._parentListeners;
    if (listeners) {
        updateComponentListeners(vm, listeners);
    }
}
var target$1;
function add$1(event, fn) {
    target$1.$on(event, fn);
}
function remove$1(event, fn) {
    target$1.$off(event, fn);
}
function createOnceHandler$1(event, fn) {
    var _target = target$1;
    return function onceHandler() {
        var res = fn.apply(null, arguments);
        if (res !== null) {
            _target.$off(event, onceHandler);
        }
    };
}
function updateComponentListeners(vm, listeners, oldListeners) {
    target$1 = vm;
    updateListeners(listeners, oldListeners || {}, add$1, remove$1, createOnceHandler$1, vm);
    target$1 = undefined;
}
function eventsMixin(Vue) {
    var hookRE = /^hook:/;
    Vue.prototype.$on = function (event, fn) {
        var vm = this;
        if (isArray(event)) {
            for (var i = 0, l = event.length; i < l; i++) {
                vm.$on(event[i], fn);
            }
        }
        else {
            (vm._events[event] || (vm._events[event] = [])).push(fn);
            // optimize hook:event cost by using a boolean flag marked at registration
            // instead of a hash lookup
            if (hookRE.test(event)) {
                vm._hasHookEvent = true;
            }
        }
        return vm;
    };
    Vue.prototype.$once = function (event, fn) {
        var vm = this;
        function on() {
            vm.$off(event, on);
            fn.apply(vm, arguments);
        }
        on.fn = fn;
        vm.$on(event, on);
        return vm;
    };
    Vue.prototype.$off = function (event, fn) {
        var vm = this;
        // all
        if (!arguments.length) {
            vm._events = Object.create(null);
            return vm;
        }
        // array of events
        if (isArray(event)) {
            for (var i_1 = 0, l = event.length; i_1 < l; i_1++) {
                vm.$off(event[i_1], fn);
            }
            return vm;
        }
        // specific event
        var cbs = vm._events[event];
        if (!cbs) {
            return vm;
        }
        if (!fn) {
            vm._events[event] = null;
            return vm;
        }
        // specific handler
        var cb;
        var i = cbs.length;
        while (i--) {
            cb = cbs[i];
            if (cb === fn || cb.fn === fn) {
                cbs.splice(i, 1);
                break;
            }
        }
        return vm;
    };
    Vue.prototype.$emit = function (event) {
        var vm = this;
        if (false) { var lowerCaseEvent; }
        var cbs = vm._events[event];
        if (cbs) {
            cbs = cbs.length > 1 ? toArray(cbs) : cbs;
            var args = toArray(arguments, 1);
            var info = "event handler for \"".concat(event, "\"");
            for (var i = 0, l = cbs.length; i < l; i++) {
                invokeWithErrorHandling(cbs[i], vm, args, vm, info);
            }
        }
        return vm;
    };
}

var activeInstance = null;
var isUpdatingChildComponent = false;
function setActiveInstance(vm) {
    var prevActiveInstance = activeInstance;
    activeInstance = vm;
    return function () {
        activeInstance = prevActiveInstance;
    };
}
function initLifecycle(vm) {
    var options = vm.$options;
    // locate first non-abstract parent
    var parent = options.parent;
    if (parent && !options.abstract) {
        while (parent.$options.abstract && parent.$parent) {
            parent = parent.$parent;
        }
        parent.$children.push(vm);
    }
    vm.$parent = parent;
    vm.$root = parent ? parent.$root : vm;
    vm.$children = [];
    vm.$refs = {};
    vm._provided = parent ? parent._provided : Object.create(null);
    vm._watcher = null;
    vm._inactive = null;
    vm._directInactive = false;
    vm._isMounted = false;
    vm._isDestroyed = false;
    vm._isBeingDestroyed = false;
}
function lifecycleMixin(Vue) {
    Vue.prototype._update = function (vnode, hydrating) {
        var vm = this;
        var prevEl = vm.$el;
        var prevVnode = vm._vnode;
        var restoreActiveInstance = setActiveInstance(vm);
        vm._vnode = vnode;
        // Vue.prototype.__patch__ is injected in entry points
        // based on the rendering backend used.
        if (!prevVnode) {
            // initial render
            vm.$el = vm.__patch__(vm.$el, vnode, hydrating, false /* removeOnly */);
        }
        else {
            // updates
            vm.$el = vm.__patch__(prevVnode, vnode);
        }
        restoreActiveInstance();
        // update __vue__ reference
        if (prevEl) {
            prevEl.__vue__ = null;
        }
        if (vm.$el) {
            vm.$el.__vue__ = vm;
        }
        // if parent is an HOC, update its $el as well
        var wrapper = vm;
        while (wrapper &&
            wrapper.$vnode &&
            wrapper.$parent &&
            wrapper.$vnode === wrapper.$parent._vnode) {
            wrapper.$parent.$el = wrapper.$el;
            wrapper = wrapper.$parent;
        }
        // updated hook is called by the scheduler to ensure that children are
        // updated in a parent's updated hook.
    };
    Vue.prototype.$forceUpdate = function () {
        var vm = this;
        if (vm._watcher) {
            vm._watcher.update();
        }
    };
    Vue.prototype.$destroy = function () {
        var vm = this;
        if (vm._isBeingDestroyed) {
            return;
        }
        callHook$1(vm, 'beforeDestroy');
        vm._isBeingDestroyed = true;
        // remove self from parent
        var parent = vm.$parent;
        if (parent && !parent._isBeingDestroyed && !vm.$options.abstract) {
            remove$2(parent.$children, vm);
        }
        // teardown scope. this includes both the render watcher and other
        // watchers created
        vm._scope.stop();
        // remove reference from data ob
        // frozen object may not have observer.
        if (vm._data.__ob__) {
            vm._data.__ob__.vmCount--;
        }
        // call the last hook...
        vm._isDestroyed = true;
        // invoke destroy hooks on current rendered tree
        vm.__patch__(vm._vnode, null);
        // fire destroyed hook
        callHook$1(vm, 'destroyed');
        // turn off all instance listeners.
        vm.$off();
        // remove __vue__ reference
        if (vm.$el) {
            vm.$el.__vue__ = null;
        }
        // release circular reference (#6759)
        if (vm.$vnode) {
            vm.$vnode.parent = null;
        }
    };
}
function mountComponent(vm, el, hydrating) {
    vm.$el = el;
    if (!vm.$options.render) {
        // @ts-expect-error invalid type
        vm.$options.render = createEmptyVNode;
        if (false) {}
    }
    callHook$1(vm, 'beforeMount');
    var updateComponent;
    /* istanbul ignore if */
    if (false) {}
    else {
        updateComponent = function () {
            vm._update(vm._render(), hydrating);
        };
    }
    var watcherOptions = {
        before: function () {
            if (vm._isMounted && !vm._isDestroyed) {
                callHook$1(vm, 'beforeUpdate');
            }
        }
    };
    if (false) {}
    // we set this to vm._watcher inside the watcher's constructor
    // since the watcher's initial patch may call $forceUpdate (e.g. inside child
    // component's mounted hook), which relies on vm._watcher being already defined
    new Watcher(vm, updateComponent, noop, watcherOptions, true /* isRenderWatcher */);
    hydrating = false;
    // flush buffer for flush: "pre" watchers queued in setup()
    var preWatchers = vm._preWatchers;
    if (preWatchers) {
        for (var i = 0; i < preWatchers.length; i++) {
            preWatchers[i].run();
        }
    }
    // manually mounted instance, call mounted on self
    // mounted is called for render-created child components in its inserted hook
    if (vm.$vnode == null) {
        vm._isMounted = true;
        callHook$1(vm, 'mounted');
    }
    return vm;
}
function updateChildComponent(vm, propsData, listeners, parentVnode, renderChildren) {
    if (false) {}
    // determine whether component has slot children
    // we need to do this before overwriting $options._renderChildren.
    // check if there are dynamic scopedSlots (hand-written or compiled but with
    // dynamic slot names). Static scoped slots compiled from template has the
    // "$stable" marker.
    var newScopedSlots = parentVnode.data.scopedSlots;
    var oldScopedSlots = vm.$scopedSlots;
    var hasDynamicScopedSlot = !!((newScopedSlots && !newScopedSlots.$stable) ||
        (oldScopedSlots !== emptyObject && !oldScopedSlots.$stable) ||
        (newScopedSlots && vm.$scopedSlots.$key !== newScopedSlots.$key) ||
        (!newScopedSlots && vm.$scopedSlots.$key));
    // Any static slot children from the parent may have changed during parent's
    // update. Dynamic scoped slots may also have changed. In such cases, a forced
    // update is necessary to ensure correctness.
    var needsForceUpdate = !!(renderChildren || // has new static slots
        vm.$options._renderChildren || // has old static slots
        hasDynamicScopedSlot);
    var prevVNode = vm.$vnode;
    vm.$options._parentVnode = parentVnode;
    vm.$vnode = parentVnode; // update vm's placeholder node without re-render
    if (vm._vnode) {
        // update child tree's parent
        vm._vnode.parent = parentVnode;
    }
    vm.$options._renderChildren = renderChildren;
    // update $attrs and $listeners hash
    // these are also reactive so they may trigger child update if the child
    // used them during render
    var attrs = parentVnode.data.attrs || emptyObject;
    if (vm._attrsProxy) {
        // force update if attrs are accessed and has changed since it may be
        // passed to a child component.
        if (syncSetupProxy(vm._attrsProxy, attrs, (prevVNode.data && prevVNode.data.attrs) || emptyObject, vm, '$attrs')) {
            needsForceUpdate = true;
        }
    }
    vm.$attrs = attrs;
    // update listeners
    listeners = listeners || emptyObject;
    var prevListeners = vm.$options._parentListeners;
    if (vm._listenersProxy) {
        syncSetupProxy(vm._listenersProxy, listeners, prevListeners || emptyObject, vm, '$listeners');
    }
    vm.$listeners = vm.$options._parentListeners = listeners;
    updateComponentListeners(vm, listeners, prevListeners);
    // update props
    if (propsData && vm.$options.props) {
        toggleObserving(false);
        var props = vm._props;
        var propKeys = vm.$options._propKeys || [];
        for (var i = 0; i < propKeys.length; i++) {
            var key = propKeys[i];
            var propOptions = vm.$options.props; // wtf flow?
            props[key] = validateProp(key, propOptions, propsData, vm);
        }
        toggleObserving(true);
        // keep a copy of raw propsData
        vm.$options.propsData = propsData;
    }
    // resolve slots + force update if has children
    if (needsForceUpdate) {
        vm.$slots = resolveSlots(renderChildren, parentVnode.context);
        vm.$forceUpdate();
    }
    if (false) {}
}
function isInInactiveTree(vm) {
    while (vm && (vm = vm.$parent)) {
        if (vm._inactive)
            return true;
    }
    return false;
}
function activateChildComponent(vm, direct) {
    if (direct) {
        vm._directInactive = false;
        if (isInInactiveTree(vm)) {
            return;
        }
    }
    else if (vm._directInactive) {
        return;
    }
    if (vm._inactive || vm._inactive === null) {
        vm._inactive = false;
        for (var i = 0; i < vm.$children.length; i++) {
            activateChildComponent(vm.$children[i]);
        }
        callHook$1(vm, 'activated');
    }
}
function deactivateChildComponent(vm, direct) {
    if (direct) {
        vm._directInactive = true;
        if (isInInactiveTree(vm)) {
            return;
        }
    }
    if (!vm._inactive) {
        vm._inactive = true;
        for (var i = 0; i < vm.$children.length; i++) {
            deactivateChildComponent(vm.$children[i]);
        }
        callHook$1(vm, 'deactivated');
    }
}
function callHook$1(vm, hook, args, setContext) {
    if (setContext === void 0) { setContext = true; }
    // #7573 disable dep collection when invoking lifecycle hooks
    pushTarget();
    var prev = currentInstance;
    setContext && setCurrentInstance(vm);
    var handlers = vm.$options[hook];
    var info = "".concat(hook, " hook");
    if (handlers) {
        for (var i = 0, j = handlers.length; i < j; i++) {
            invokeWithErrorHandling(handlers[i], vm, args || null, vm, info);
        }
    }
    if (vm._hasHookEvent) {
        vm.$emit('hook:' + hook);
    }
    setContext && setCurrentInstance(prev);
    popTarget();
}

var MAX_UPDATE_COUNT = 100;
var queue = [];
var activatedChildren = [];
var has = {};
var circular = {};
var waiting = false;
var flushing = false;
var index = 0;
/**
 * Reset the scheduler's state.
 */
function resetSchedulerState() {
    index = queue.length = activatedChildren.length = 0;
    has = {};
    if (false) {}
    waiting = flushing = false;
}
// Async edge case #6566 requires saving the timestamp when event listeners are
// attached. However, calling performance.now() has a perf overhead especially
// if the page has thousands of event listeners. Instead, we take a timestamp
// every time the scheduler flushes and use that for all event listeners
// attached during that flush.
var currentFlushTimestamp = 0;
// Async edge case fix requires storing an event listener's attach timestamp.
var getNow = Date.now;
// Determine what event timestamp the browser is using. Annoyingly, the
// timestamp can either be hi-res (relative to page load) or low-res
// (relative to UNIX epoch), so in order to compare time we have to use the
// same timestamp type when saving the flush timestamp.
// All IE versions use low-res event timestamps, and have problematic clock
// implementations (#9632)
if (inBrowser && !isIE) {
    var performance_1 = window.performance;
    if (performance_1 &&
        typeof performance_1.now === 'function' &&
        getNow() > document.createEvent('Event').timeStamp) {
        // if the event timestamp, although evaluated AFTER the Date.now(), is
        // smaller than it, it means the event is using a hi-res timestamp,
        // and we need to use the hi-res version for event listener timestamps as
        // well.
        getNow = function () { return performance_1.now(); };
    }
}
var sortCompareFn = function (a, b) {
    if (a.post) {
        if (!b.post)
            return 1;
    }
    else if (b.post) {
        return -1;
    }
    return a.id - b.id;
};
/**
 * Flush both queues and run the watchers.
 */
function flushSchedulerQueue() {
    currentFlushTimestamp = getNow();
    flushing = true;
    var watcher, id;
    // Sort queue before flush.
    // This ensures that:
    // 1. Components are updated from parent to child. (because parent is always
    //    created before the child)
    // 2. A component's user watchers are run before its render watcher (because
    //    user watchers are created before the render watcher)
    // 3. If a component is destroyed during a parent component's watcher run,
    //    its watchers can be skipped.
    queue.sort(sortCompareFn);
    // do not cache length because more watchers might be pushed
    // as we run existing watchers
    for (index = 0; index < queue.length; index++) {
        watcher = queue[index];
        if (watcher.before) {
            watcher.before();
        }
        id = watcher.id;
        has[id] = null;
        watcher.run();
        // in dev build, check and stop circular updates.
        if (false) {}
    }
    // keep copies of post queues before resetting state
    var activatedQueue = activatedChildren.slice();
    var updatedQueue = queue.slice();
    resetSchedulerState();
    // call component updated and activated hooks
    callActivatedHooks(activatedQueue);
    callUpdatedHooks(updatedQueue);
    cleanupDeps();
    // devtool hook
    /* istanbul ignore if */
    if (devtools && config.devtools) {
        devtools.emit('flush');
    }
}
function callUpdatedHooks(queue) {
    var i = queue.length;
    while (i--) {
        var watcher = queue[i];
        var vm = watcher.vm;
        if (vm && vm._watcher === watcher && vm._isMounted && !vm._isDestroyed) {
            callHook$1(vm, 'updated');
        }
    }
}
/**
 * Queue a kept-alive component that was activated during patch.
 * The queue will be processed after the entire tree has been patched.
 */
function queueActivatedComponent(vm) {
    // setting _inactive to false here so that a render function can
    // rely on checking whether it's in an inactive tree (e.g. router-view)
    vm._inactive = false;
    activatedChildren.push(vm);
}
function callActivatedHooks(queue) {
    for (var i = 0; i < queue.length; i++) {
        queue[i]._inactive = true;
        activateChildComponent(queue[i], true /* true */);
    }
}
/**
 * Push a watcher into the watcher queue.
 * Jobs with duplicate IDs will be skipped unless it's
 * pushed when the queue is being flushed.
 */
function queueWatcher(watcher) {
    var id = watcher.id;
    if (has[id] != null) {
        return;
    }
    if (watcher === Dep.target && watcher.noRecurse) {
        return;
    }
    has[id] = true;
    if (!flushing) {
        queue.push(watcher);
    }
    else {
        // if already flushing, splice the watcher based on its id
        // if already past its id, it will be run next immediately.
        var i = queue.length - 1;
        while (i > index && queue[i].id > watcher.id) {
            i--;
        }
        queue.splice(i + 1, 0, watcher);
    }
    // queue the flush
    if (!waiting) {
        waiting = true;
        if (false) {}
        nextTick(flushSchedulerQueue);
    }
}

function initProvide(vm) {
    var provideOption = vm.$options.provide;
    if (provideOption) {
        var provided = isFunction(provideOption)
            ? provideOption.call(vm)
            : provideOption;
        if (!isObject(provided)) {
            return;
        }
        var source = resolveProvided(vm);
        // IE9 doesn't support Object.getOwnPropertyDescriptors so we have to
        // iterate the keys ourselves.
        var keys = hasSymbol ? Reflect.ownKeys(provided) : Object.keys(provided);
        for (var i = 0; i < keys.length; i++) {
            var key = keys[i];
            Object.defineProperty(source, key, Object.getOwnPropertyDescriptor(provided, key));
        }
    }
}
function initInjections(vm) {
    var result = resolveInject(vm.$options.inject, vm);
    if (result) {
        toggleObserving(false);
        Object.keys(result).forEach(function (key) {
            /* istanbul ignore else */
            if (false) {}
            else {
                defineReactive(vm, key, result[key]);
            }
        });
        toggleObserving(true);
    }
}
function resolveInject(inject, vm) {
    if (inject) {
        // inject is :any because flow is not smart enough to figure out cached
        var result = Object.create(null);
        var keys = hasSymbol ? Reflect.ownKeys(inject) : Object.keys(inject);
        for (var i = 0; i < keys.length; i++) {
            var key = keys[i];
            // #6574 in case the inject object is observed...
            if (key === '__ob__')
                continue;
            var provideKey = inject[key].from;
            if (provideKey in vm._provided) {
                result[key] = vm._provided[provideKey];
            }
            else if ('default' in inject[key]) {
                var provideDefault = inject[key].default;
                result[key] = isFunction(provideDefault)
                    ? provideDefault.call(vm)
                    : provideDefault;
            }
            else if (false) {}
        }
        return result;
    }
}

function FunctionalRenderContext(data, props, children, parent, Ctor) {
    var _this = this;
    var options = Ctor.options;
    // ensure the createElement function in functional components
    // gets a unique context - this is necessary for correct named slot check
    var contextVm;
    if (hasOwn(parent, '_uid')) {
        contextVm = Object.create(parent);
        contextVm._original = parent;
    }
    else {
        // the context vm passed in is a functional context as well.
        // in this case we want to make sure we are able to get a hold to the
        // real context instance.
        contextVm = parent;
        // @ts-ignore
        parent = parent._original;
    }
    var isCompiled = isTrue(options._compiled);
    var needNormalization = !isCompiled;
    this.data = data;
    this.props = props;
    this.children = children;
    this.parent = parent;
    this.listeners = data.on || emptyObject;
    this.injections = resolveInject(options.inject, parent);
    this.slots = function () {
        if (!_this.$slots) {
            normalizeScopedSlots(parent, data.scopedSlots, (_this.$slots = resolveSlots(children, parent)));
        }
        return _this.$slots;
    };
    Object.defineProperty(this, 'scopedSlots', {
        enumerable: true,
        get: function () {
            return normalizeScopedSlots(parent, data.scopedSlots, this.slots());
        }
    });
    // support for compiled functional template
    if (isCompiled) {
        // exposing $options for renderStatic()
        this.$options = options;
        // pre-resolve slots for renderSlot()
        this.$slots = this.slots();
        this.$scopedSlots = normalizeScopedSlots(parent, data.scopedSlots, this.$slots);
    }
    if (options._scopeId) {
        this._c = function (a, b, c, d) {
            var vnode = createElement$1(contextVm, a, b, c, d, needNormalization);
            if (vnode && !isArray(vnode)) {
                vnode.fnScopeId = options._scopeId;
                vnode.fnContext = parent;
            }
            return vnode;
        };
    }
    else {
        this._c = function (a, b, c, d) {
            return createElement$1(contextVm, a, b, c, d, needNormalization);
        };
    }
}
installRenderHelpers(FunctionalRenderContext.prototype);
function createFunctionalComponent(Ctor, propsData, data, contextVm, children) {
    var options = Ctor.options;
    var props = {};
    var propOptions = options.props;
    if (isDef(propOptions)) {
        for (var key in propOptions) {
            props[key] = validateProp(key, propOptions, propsData || emptyObject);
        }
    }
    else {
        if (isDef(data.attrs))
            mergeProps(props, data.attrs);
        if (isDef(data.props))
            mergeProps(props, data.props);
    }
    var renderContext = new FunctionalRenderContext(data, props, children, contextVm, Ctor);
    var vnode = options.render.call(null, renderContext._c, renderContext);
    if (vnode instanceof VNode) {
        return cloneAndMarkFunctionalResult(vnode, data, renderContext.parent, options, renderContext);
    }
    else if (isArray(vnode)) {
        var vnodes = normalizeChildren(vnode) || [];
        var res = new Array(vnodes.length);
        for (var i = 0; i < vnodes.length; i++) {
            res[i] = cloneAndMarkFunctionalResult(vnodes[i], data, renderContext.parent, options, renderContext);
        }
        return res;
    }
}
function cloneAndMarkFunctionalResult(vnode, data, contextVm, options, renderContext) {
    // #7817 clone node before setting fnContext, otherwise if the node is reused
    // (e.g. it was from a cached normal slot) the fnContext causes named slots
    // that should not be matched to match.
    var clone = cloneVNode(vnode);
    clone.fnContext = contextVm;
    clone.fnOptions = options;
    if (false) {}
    if (data.slot) {
        (clone.data || (clone.data = {})).slot = data.slot;
    }
    return clone;
}
function mergeProps(to, from) {
    for (var key in from) {
        to[camelize(key)] = from[key];
    }
}

function getComponentName(options) {
    return options.name || options.__name || options._componentTag;
}
// inline hooks to be invoked on component VNodes during patch
var componentVNodeHooks = {
    init: function (vnode, hydrating) {
        if (vnode.componentInstance &&
            !vnode.componentInstance._isDestroyed &&
            vnode.data.keepAlive) {
            // kept-alive components, treat as a patch
            var mountedNode = vnode; // work around flow
            componentVNodeHooks.prepatch(mountedNode, mountedNode);
        }
        else {
            var child = (vnode.componentInstance = createComponentInstanceForVnode(vnode, activeInstance));
            child.$mount(hydrating ? vnode.elm : undefined, hydrating);
        }
    },
    prepatch: function (oldVnode, vnode) {
        var options = vnode.componentOptions;
        var child = (vnode.componentInstance = oldVnode.componentInstance);
        updateChildComponent(child, options.propsData, // updated props
        options.listeners, // updated listeners
        vnode, // new parent vnode
        options.children // new children
        );
    },
    insert: function (vnode) {
        var context = vnode.context, componentInstance = vnode.componentInstance;
        if (!componentInstance._isMounted) {
            componentInstance._isMounted = true;
            callHook$1(componentInstance, 'mounted');
        }
        if (vnode.data.keepAlive) {
            if (context._isMounted) {
                // vue-router#1212
                // During updates, a kept-alive component's child components may
                // change, so directly walking the tree here may call activated hooks
                // on incorrect children. Instead we push them into a queue which will
                // be processed after the whole patch process ended.
                queueActivatedComponent(componentInstance);
            }
            else {
                activateChildComponent(componentInstance, true /* direct */);
            }
        }
    },
    destroy: function (vnode) {
        var componentInstance = vnode.componentInstance;
        if (!componentInstance._isDestroyed) {
            if (!vnode.data.keepAlive) {
                componentInstance.$destroy();
            }
            else {
                deactivateChildComponent(componentInstance, true /* direct */);
            }
        }
    }
};
var hooksToMerge = Object.keys(componentVNodeHooks);
function createComponent(Ctor, data, context, children, tag) {
    if (isUndef(Ctor)) {
        return;
    }
    var baseCtor = context.$options._base;
    // plain options object: turn it into a constructor
    if (isObject(Ctor)) {
        Ctor = baseCtor.extend(Ctor);
    }
    // if at this stage it's not a constructor or an async component factory,
    // reject.
    if (typeof Ctor !== 'function') {
        if (false) {}
        return;
    }
    // async component
    var asyncFactory;
    // @ts-expect-error
    if (isUndef(Ctor.cid)) {
        asyncFactory = Ctor;
        Ctor = resolveAsyncComponent(asyncFactory, baseCtor);
        if (Ctor === undefined) {
            // return a placeholder node for async component, which is rendered
            // as a comment node but preserves all the raw information for the node.
            // the information will be used for async server-rendering and hydration.
            return createAsyncPlaceholder(asyncFactory, data, context, children, tag);
        }
    }
    data = data || {};
    // resolve constructor options in case global mixins are applied after
    // component constructor creation
    resolveConstructorOptions(Ctor);
    // transform component v-model data into props & events
    if (isDef(data.model)) {
        // @ts-expect-error
        transformModel(Ctor.options, data);
    }
    // extract props
    // @ts-expect-error
    var propsData = extractPropsFromVNodeData(data, Ctor, tag);
    // functional component
    // @ts-expect-error
    if (isTrue(Ctor.options.functional)) {
        return createFunctionalComponent(Ctor, propsData, data, context, children);
    }
    // extract listeners, since these needs to be treated as
    // child component listeners instead of DOM listeners
    var listeners = data.on;
    // replace with listeners with .native modifier
    // so it gets processed during parent component patch.
    data.on = data.nativeOn;
    // @ts-expect-error
    if (isTrue(Ctor.options.abstract)) {
        // abstract components do not keep anything
        // other than props & listeners & slot
        // work around flow
        var slot = data.slot;
        data = {};
        if (slot) {
            data.slot = slot;
        }
    }
    // install component management hooks onto the placeholder node
    installComponentHooks(data);
    // return a placeholder vnode
    // @ts-expect-error
    var name = getComponentName(Ctor.options) || tag;
    var vnode = new VNode(
    // @ts-expect-error
    "vue-component-".concat(Ctor.cid).concat(name ? "-".concat(name) : ''), data, undefined, undefined, undefined, context, 
    // @ts-expect-error
    { Ctor: Ctor, propsData: propsData, listeners: listeners, tag: tag, children: children }, asyncFactory);
    return vnode;
}
function createComponentInstanceForVnode(
// we know it's MountedComponentVNode but flow doesn't
vnode, 
// activeInstance in lifecycle state
parent) {
    var options = {
        _isComponent: true,
        _parentVnode: vnode,
        parent: parent
    };
    // check inline-template render functions
    var inlineTemplate = vnode.data.inlineTemplate;
    if (isDef(inlineTemplate)) {
        options.render = inlineTemplate.render;
        options.staticRenderFns = inlineTemplate.staticRenderFns;
    }
    return new vnode.componentOptions.Ctor(options);
}
function installComponentHooks(data) {
    var hooks = data.hook || (data.hook = {});
    for (var i = 0; i < hooksToMerge.length; i++) {
        var key = hooksToMerge[i];
        var existing = hooks[key];
        var toMerge = componentVNodeHooks[key];
        // @ts-expect-error
        if (existing !== toMerge && !(existing && existing._merged)) {
            hooks[key] = existing ? mergeHook(toMerge, existing) : toMerge;
        }
    }
}
function mergeHook(f1, f2) {
    var merged = function (a, b) {
        // flow complains about extra args which is why we use any
        f1(a, b);
        f2(a, b);
    };
    merged._merged = true;
    return merged;
}
// transform component v-model info (value and callback) into
// prop and event handler respectively.
function transformModel(options, data) {
    var prop = (options.model && options.model.prop) || 'value';
    var event = (options.model && options.model.event) || 'input';
    (data.attrs || (data.attrs = {}))[prop] = data.model.value;
    var on = data.on || (data.on = {});
    var existing = on[event];
    var callback = data.model.callback;
    if (isDef(existing)) {
        if (isArray(existing)
            ? existing.indexOf(callback) === -1
            : existing !== callback) {
            on[event] = [callback].concat(existing);
        }
    }
    else {
        on[event] = callback;
    }
}

var warn = noop;
var tip = (/* unused pure expression or super */ null && (noop));
var generateComponentTrace; // work around flow check
var formatComponentName;
if (false) { var repeat_1, classify_1, classifyRE_1, hasConsole_1; }

/**
 * Option overwriting strategies are functions that handle
 * how to merge a parent option value and a child option
 * value into the final value.
 */
var strats = config.optionMergeStrategies;
/**
 * Options with restrictions
 */
if (false) {}
/**
 * Helper that recursively merges two data objects together.
 */
function mergeData(to, from, recursive) {
    if (recursive === void 0) { recursive = true; }
    if (!from)
        return to;
    var key, toVal, fromVal;
    var keys = hasSymbol
        ? Reflect.ownKeys(from)
        : Object.keys(from);
    for (var i = 0; i < keys.length; i++) {
        key = keys[i];
        // in case the object is already observed...
        if (key === '__ob__')
            continue;
        toVal = to[key];
        fromVal = from[key];
        if (!recursive || !hasOwn(to, key)) {
            set(to, key, fromVal);
        }
        else if (toVal !== fromVal &&
            isPlainObject(toVal) &&
            isPlainObject(fromVal)) {
            mergeData(toVal, fromVal);
        }
    }
    return to;
}
/**
 * Data
 */
function mergeDataOrFn(parentVal, childVal, vm) {
    if (!vm) {
        // in a Vue.extend merge, both should be functions
        if (!childVal) {
            return parentVal;
        }
        if (!parentVal) {
            return childVal;
        }
        // when parentVal & childVal are both present,
        // we need to return a function that returns the
        // merged result of both functions... no need to
        // check if parentVal is a function here because
        // it has to be a function to pass previous merges.
        return function mergedDataFn() {
            return mergeData(isFunction(childVal) ? childVal.call(this, this) : childVal, isFunction(parentVal) ? parentVal.call(this, this) : parentVal);
        };
    }
    else {
        return function mergedInstanceDataFn() {
            // instance merge
            var instanceData = isFunction(childVal)
                ? childVal.call(vm, vm)
                : childVal;
            var defaultData = isFunction(parentVal)
                ? parentVal.call(vm, vm)
                : parentVal;
            if (instanceData) {
                return mergeData(instanceData, defaultData);
            }
            else {
                return defaultData;
            }
        };
    }
}
strats.data = function (parentVal, childVal, vm) {
    if (!vm) {
        if (childVal && typeof childVal !== 'function') {
             false &&
                0;
            return parentVal;
        }
        return mergeDataOrFn(parentVal, childVal);
    }
    return mergeDataOrFn(parentVal, childVal, vm);
};
/**
 * Hooks and props are merged as arrays.
 */
function mergeLifecycleHook(parentVal, childVal) {
    var res = childVal
        ? parentVal
            ? parentVal.concat(childVal)
            : isArray(childVal)
                ? childVal
                : [childVal]
        : parentVal;
    return res ? dedupeHooks(res) : res;
}
function dedupeHooks(hooks) {
    var res = [];
    for (var i = 0; i < hooks.length; i++) {
        if (res.indexOf(hooks[i]) === -1) {
            res.push(hooks[i]);
        }
    }
    return res;
}
LIFECYCLE_HOOKS.forEach(function (hook) {
    strats[hook] = mergeLifecycleHook;
});
/**
 * Assets
 *
 * When a vm is present (instance creation), we need to do
 * a three-way merge between constructor options, instance
 * options and parent options.
 */
function mergeAssets(parentVal, childVal, vm, key) {
    var res = Object.create(parentVal || null);
    if (childVal) {
         false && 0;
        return extend(res, childVal);
    }
    else {
        return res;
    }
}
ASSET_TYPES.forEach(function (type) {
    strats[type + 's'] = mergeAssets;
});
/**
 * Watchers.
 *
 * Watchers hashes should not overwrite one
 * another, so we merge them as arrays.
 */
strats.watch = function (parentVal, childVal, vm, key) {
    // work around Firefox's Object.prototype.watch...
    //@ts-expect-error work around
    if (parentVal === nativeWatch)
        parentVal = undefined;
    //@ts-expect-error work around
    if (childVal === nativeWatch)
        childVal = undefined;
    /* istanbul ignore if */
    if (!childVal)
        return Object.create(parentVal || null);
    if (false) {}
    if (!parentVal)
        return childVal;
    var ret = {};
    extend(ret, parentVal);
    for (var key_1 in childVal) {
        var parent_1 = ret[key_1];
        var child = childVal[key_1];
        if (parent_1 && !isArray(parent_1)) {
            parent_1 = [parent_1];
        }
        ret[key_1] = parent_1 ? parent_1.concat(child) : isArray(child) ? child : [child];
    }
    return ret;
};
/**
 * Other object hashes.
 */
strats.props =
    strats.methods =
        strats.inject =
            strats.computed =
                function (parentVal, childVal, vm, key) {
                    if (childVal && "production" !== 'production') {}
                    if (!parentVal)
                        return childVal;
                    var ret = Object.create(null);
                    extend(ret, parentVal);
                    if (childVal)
                        extend(ret, childVal);
                    return ret;
                };
strats.provide = function (parentVal, childVal) {
    if (!parentVal)
        return childVal;
    return function () {
        var ret = Object.create(null);
        mergeData(ret, isFunction(parentVal) ? parentVal.call(this) : parentVal);
        if (childVal) {
            mergeData(ret, isFunction(childVal) ? childVal.call(this) : childVal, false // non-recursive
            );
        }
        return ret;
    };
};
/**
 * Default strategy.
 */
var defaultStrat = function (parentVal, childVal) {
    return childVal === undefined ? parentVal : childVal;
};
/**
 * Validate component names
 */
function checkComponents(options) {
    for (var key in options.components) {
        validateComponentName(key);
    }
}
function validateComponentName(name) {
    if (!new RegExp("^[a-zA-Z][\\-\\.0-9_".concat(unicodeRegExp.source, "]*$")).test(name)) {
        warn('Invalid component name: "' +
            name +
            '". Component names ' +
            'should conform to valid custom element name in html5 specification.');
    }
    if (isBuiltInTag(name) || config.isReservedTag(name)) {
        warn('Do not use built-in or reserved HTML elements as component ' +
            'id: ' +
            name);
    }
}
/**
 * Ensure all props option syntax are normalized into the
 * Object-based format.
 */
function normalizeProps(options, vm) {
    var props = options.props;
    if (!props)
        return;
    var res = {};
    var i, val, name;
    if (isArray(props)) {
        i = props.length;
        while (i--) {
            val = props[i];
            if (typeof val === 'string') {
                name = camelize(val);
                res[name] = { type: null };
            }
            else if (false) {}
        }
    }
    else if (isPlainObject(props)) {
        for (var key in props) {
            val = props[key];
            name = camelize(key);
            res[name] = isPlainObject(val) ? val : { type: val };
        }
    }
    else if (false) {}
    options.props = res;
}
/**
 * Normalize all injections into Object-based format
 */
function normalizeInject(options, vm) {
    var inject = options.inject;
    if (!inject)
        return;
    var normalized = (options.inject = {});
    if (isArray(inject)) {
        for (var i = 0; i < inject.length; i++) {
            normalized[inject[i]] = { from: inject[i] };
        }
    }
    else if (isPlainObject(inject)) {
        for (var key in inject) {
            var val = inject[key];
            normalized[key] = isPlainObject(val)
                ? extend({ from: key }, val)
                : { from: val };
        }
    }
    else if (false) {}
}
/**
 * Normalize raw function directives into object format.
 */
function normalizeDirectives$1(options) {
    var dirs = options.directives;
    if (dirs) {
        for (var key in dirs) {
            var def = dirs[key];
            if (isFunction(def)) {
                dirs[key] = { bind: def, update: def };
            }
        }
    }
}
function assertObjectType(name, value, vm) {
    if (!isPlainObject(value)) {
        warn("Invalid value for option \"".concat(name, "\": expected an Object, ") +
            "but got ".concat(toRawType(value), "."), vm);
    }
}
/**
 * Merge two option objects into a new one.
 * Core utility used in both instantiation and inheritance.
 */
function mergeOptions(parent, child, vm) {
    if (false) {}
    if (isFunction(child)) {
        // @ts-expect-error
        child = child.options;
    }
    normalizeProps(child, vm);
    normalizeInject(child, vm);
    normalizeDirectives$1(child);
    // Apply extends and mixins on the child options,
    // but only if it is a raw options object that isn't
    // the result of another mergeOptions call.
    // Only merged options has the _base property.
    if (!child._base) {
        if (child.extends) {
            parent = mergeOptions(parent, child.extends, vm);
        }
        if (child.mixins) {
            for (var i = 0, l = child.mixins.length; i < l; i++) {
                parent = mergeOptions(parent, child.mixins[i], vm);
            }
        }
    }
    var options = {};
    var key;
    for (key in parent) {
        mergeField(key);
    }
    for (key in child) {
        if (!hasOwn(parent, key)) {
            mergeField(key);
        }
    }
    function mergeField(key) {
        var strat = strats[key] || defaultStrat;
        options[key] = strat(parent[key], child[key], vm, key);
    }
    return options;
}
/**
 * Resolve an asset.
 * This function is used because child instances need access
 * to assets defined in its ancestor chain.
 */
function resolveAsset(options, type, id, warnMissing) {
    /* istanbul ignore if */
    if (typeof id !== 'string') {
        return;
    }
    var assets = options[type];
    // check local registration variations first
    if (hasOwn(assets, id))
        return assets[id];
    var camelizedId = camelize(id);
    if (hasOwn(assets, camelizedId))
        return assets[camelizedId];
    var PascalCaseId = capitalize(camelizedId);
    if (hasOwn(assets, PascalCaseId))
        return assets[PascalCaseId];
    // fallback to prototype chain
    var res = assets[id] || assets[camelizedId] || assets[PascalCaseId];
    if (false) {}
    return res;
}

function validateProp(key, propOptions, propsData, vm) {
    var prop = propOptions[key];
    var absent = !hasOwn(propsData, key);
    var value = propsData[key];
    // boolean casting
    var booleanIndex = getTypeIndex(Boolean, prop.type);
    if (booleanIndex > -1) {
        if (absent && !hasOwn(prop, 'default')) {
            value = false;
        }
        else if (value === '' || value === hyphenate(key)) {
            // only cast empty string / same name to boolean if
            // boolean has higher priority
            var stringIndex = getTypeIndex(String, prop.type);
            if (stringIndex < 0 || booleanIndex < stringIndex) {
                value = true;
            }
        }
    }
    // check default value
    if (value === undefined) {
        value = getPropDefaultValue(vm, prop, key);
        // since the default value is a fresh copy,
        // make sure to observe it.
        var prevShouldObserve = shouldObserve;
        toggleObserving(true);
        observe(value);
        toggleObserving(prevShouldObserve);
    }
    if (false) {}
    return value;
}
/**
 * Get the default value of a prop.
 */
function getPropDefaultValue(vm, prop, key) {
    // no default, return undefined
    if (!hasOwn(prop, 'default')) {
        return undefined;
    }
    var def = prop.default;
    // warn against non-factory defaults for Object & Array
    if (false) {}
    // the raw prop value was also undefined from previous render,
    // return previous default value to avoid unnecessary watcher trigger
    if (vm &&
        vm.$options.propsData &&
        vm.$options.propsData[key] === undefined &&
        vm._props[key] !== undefined) {
        return vm._props[key];
    }
    // call factory function for non-Function types
    // a value is Function if its prototype is function even across different execution context
    return isFunction(def) && getType(prop.type) !== 'Function'
        ? def.call(vm)
        : def;
}
/**
 * Assert whether a prop is valid.
 */
function assertProp(prop, name, value, vm, absent) {
    if (prop.required && absent) {
        warn('Missing required prop: "' + name + '"', vm);
        return;
    }
    if (value == null && !prop.required) {
        return;
    }
    var type = prop.type;
    var valid = !type || type === true;
    var expectedTypes = [];
    if (type) {
        if (!isArray(type)) {
            type = [type];
        }
        for (var i = 0; i < type.length && !valid; i++) {
            var assertedType = assertType(value, type[i], vm);
            expectedTypes.push(assertedType.expectedType || '');
            valid = assertedType.valid;
        }
    }
    var haveExpectedTypes = expectedTypes.some(function (t) { return t; });
    if (!valid && haveExpectedTypes) {
        warn(getInvalidTypeMessage(name, value, expectedTypes), vm);
        return;
    }
    var validator = prop.validator;
    if (validator) {
        if (!validator(value)) {
            warn('Invalid prop: custom validator check failed for prop "' + name + '".', vm);
        }
    }
}
var simpleCheckRE = /^(String|Number|Boolean|Function|Symbol|BigInt)$/;
function assertType(value, type, vm) {
    var valid;
    var expectedType = getType(type);
    if (simpleCheckRE.test(expectedType)) {
        var t = typeof value;
        valid = t === expectedType.toLowerCase();
        // for primitive wrapper objects
        if (!valid && t === 'object') {
            valid = value instanceof type;
        }
    }
    else if (expectedType === 'Object') {
        valid = isPlainObject(value);
    }
    else if (expectedType === 'Array') {
        valid = isArray(value);
    }
    else {
        try {
            valid = value instanceof type;
        }
        catch (e) {
            warn('Invalid prop type: "' + String(type) + '" is not a constructor', vm);
            valid = false;
        }
    }
    return {
        valid: valid,
        expectedType: expectedType
    };
}
var functionTypeCheckRE = /^\s*function (\w+)/;
/**
 * Use function string name to check built-in types,
 * because a simple equality check will fail when running
 * across different vms / iframes.
 */
function getType(fn) {
    var match = fn && fn.toString().match(functionTypeCheckRE);
    return match ? match[1] : '';
}
function isSameType(a, b) {
    return getType(a) === getType(b);
}
function getTypeIndex(type, expectedTypes) {
    if (!isArray(expectedTypes)) {
        return isSameType(expectedTypes, type) ? 0 : -1;
    }
    for (var i = 0, len = expectedTypes.length; i < len; i++) {
        if (isSameType(expectedTypes[i], type)) {
            return i;
        }
    }
    return -1;
}
function getInvalidTypeMessage(name, value, expectedTypes) {
    var message = "Invalid prop: type check failed for prop \"".concat(name, "\".") +
        " Expected ".concat(expectedTypes.map(capitalize).join(', '));
    var expectedType = expectedTypes[0];
    var receivedType = toRawType(value);
    // check if we need to specify expected value
    if (expectedTypes.length === 1 &&
        isExplicable(expectedType) &&
        isExplicable(typeof value) &&
        !isBoolean(expectedType, receivedType)) {
        message += " with value ".concat(styleValue(value, expectedType));
    }
    message += ", got ".concat(receivedType, " ");
    // check if we need to specify received value
    if (isExplicable(receivedType)) {
        message += "with value ".concat(styleValue(value, receivedType), ".");
    }
    return message;
}
function styleValue(value, type) {
    if (type === 'String') {
        return "\"".concat(value, "\"");
    }
    else if (type === 'Number') {
        return "".concat(Number(value));
    }
    else {
        return "".concat(value);
    }
}
var EXPLICABLE_TYPES = (/* unused pure expression or super */ null && (['string', 'number', 'boolean']));
function isExplicable(value) {
    return EXPLICABLE_TYPES.some(function (elem) { return value.toLowerCase() === elem; });
}
function isBoolean() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    return args.some(function (elem) { return elem.toLowerCase() === 'boolean'; });
}

/* not type checking this file because flow doesn't play well with Proxy */
var initProxy;
if (false) { var getHandler_1, hasHandler_1, isBuiltInModifier_1, hasProxy_1, warnReservedPrefix_1, warnNonPresent_1, allowedGlobals_1; }

var sharedPropertyDefinition = {
    enumerable: true,
    configurable: true,
    get: noop,
    set: noop
};
function proxy(target, sourceKey, key) {
    sharedPropertyDefinition.get = function proxyGetter() {
        return this[sourceKey][key];
    };
    sharedPropertyDefinition.set = function proxySetter(val) {
        this[sourceKey][key] = val;
    };
    Object.defineProperty(target, key, sharedPropertyDefinition);
}
function initState(vm) {
    var opts = vm.$options;
    if (opts.props)
        initProps$1(vm, opts.props);
    // Composition API
    initSetup(vm);
    if (opts.methods)
        initMethods(vm, opts.methods);
    if (opts.data) {
        initData(vm);
    }
    else {
        var ob = observe((vm._data = {}));
        ob && ob.vmCount++;
    }
    if (opts.computed)
        initComputed$1(vm, opts.computed);
    if (opts.watch && opts.watch !== nativeWatch) {
        initWatch(vm, opts.watch);
    }
}
function initProps$1(vm, propsOptions) {
    var propsData = vm.$options.propsData || {};
    var props = (vm._props = shallowReactive({}));
    // cache prop keys so that future props updates can iterate using Array
    // instead of dynamic object key enumeration.
    var keys = (vm.$options._propKeys = []);
    var isRoot = !vm.$parent;
    // root instance props should be converted
    if (!isRoot) {
        toggleObserving(false);
    }
    var _loop_1 = function (key) {
        keys.push(key);
        var value = validateProp(key, propsOptions, propsData, vm);
        /* istanbul ignore else */
        if (false) { var hyphenatedKey; }
        else {
            defineReactive(props, key, value);
        }
        // static props are already proxied on the component's prototype
        // during Vue.extend(). We only need to proxy props defined at
        // instantiation here.
        if (!(key in vm)) {
            proxy(vm, "_props", key);
        }
    };
    for (var key in propsOptions) {
        _loop_1(key);
    }
    toggleObserving(true);
}
function initData(vm) {
    var data = vm.$options.data;
    data = vm._data = isFunction(data) ? getData(data, vm) : data || {};
    if (!isPlainObject(data)) {
        data = {};
         false &&
            0;
    }
    // proxy data on instance
    var keys = Object.keys(data);
    var props = vm.$options.props;
    var methods = vm.$options.methods;
    var i = keys.length;
    while (i--) {
        var key = keys[i];
        if (false) {}
        if (props && hasOwn(props, key)) {
             false &&
                0;
        }
        else if (!isReserved(key)) {
            proxy(vm, "_data", key);
        }
    }
    // observe data
    var ob = observe(data);
    ob && ob.vmCount++;
}
function getData(data, vm) {
    // #7573 disable dep collection when invoking data getters
    pushTarget();
    try {
        return data.call(vm, vm);
    }
    catch (e) {
        handleError(e, vm, "data()");
        return {};
    }
    finally {
        popTarget();
    }
}
var computedWatcherOptions = { lazy: true };
function initComputed$1(vm, computed) {
    // $flow-disable-line
    var watchers = (vm._computedWatchers = Object.create(null));
    // computed properties are just getters during SSR
    var isSSR = isServerRendering();
    for (var key in computed) {
        var userDef = computed[key];
        var getter = isFunction(userDef) ? userDef : userDef.get;
        if (false) {}
        if (!isSSR) {
            // create internal watcher for the computed property.
            watchers[key] = new Watcher(vm, getter || noop, noop, computedWatcherOptions);
        }
        // component-defined computed properties are already defined on the
        // component prototype. We only need to define computed properties defined
        // at instantiation here.
        if (!(key in vm)) {
            defineComputed(vm, key, userDef);
        }
        else if (false) {}
    }
}
function defineComputed(target, key, userDef) {
    var shouldCache = !isServerRendering();
    if (isFunction(userDef)) {
        sharedPropertyDefinition.get = shouldCache
            ? createComputedGetter(key)
            : createGetterInvoker(userDef);
        sharedPropertyDefinition.set = noop;
    }
    else {
        sharedPropertyDefinition.get = userDef.get
            ? shouldCache && userDef.cache !== false
                ? createComputedGetter(key)
                : createGetterInvoker(userDef.get)
            : noop;
        sharedPropertyDefinition.set = userDef.set || noop;
    }
    if (false) {}
    Object.defineProperty(target, key, sharedPropertyDefinition);
}
function createComputedGetter(key) {
    return function computedGetter() {
        var watcher = this._computedWatchers && this._computedWatchers[key];
        if (watcher) {
            if (watcher.dirty) {
                watcher.evaluate();
            }
            if (Dep.target) {
                if (false) {}
                watcher.depend();
            }
            return watcher.value;
        }
    };
}
function createGetterInvoker(fn) {
    return function computedGetter() {
        return fn.call(this, this);
    };
}
function initMethods(vm, methods) {
    var props = vm.$options.props;
    for (var key in methods) {
        if (false) {}
        vm[key] = typeof methods[key] !== 'function' ? noop : bind(methods[key], vm);
    }
}
function initWatch(vm, watch) {
    for (var key in watch) {
        var handler = watch[key];
        if (isArray(handler)) {
            for (var i = 0; i < handler.length; i++) {
                createWatcher(vm, key, handler[i]);
            }
        }
        else {
            createWatcher(vm, key, handler);
        }
    }
}
function createWatcher(vm, expOrFn, handler, options) {
    if (isPlainObject(handler)) {
        options = handler;
        handler = handler.handler;
    }
    if (typeof handler === 'string') {
        handler = vm[handler];
    }
    return vm.$watch(expOrFn, handler, options);
}
function stateMixin(Vue) {
    // flow somehow has problems with directly declared definition object
    // when using Object.defineProperty, so we have to procedurally build up
    // the object here.
    var dataDef = {};
    dataDef.get = function () {
        return this._data;
    };
    var propsDef = {};
    propsDef.get = function () {
        return this._props;
    };
    if (false) {}
    Object.defineProperty(Vue.prototype, '$data', dataDef);
    Object.defineProperty(Vue.prototype, '$props', propsDef);
    Vue.prototype.$set = set;
    Vue.prototype.$delete = del;
    Vue.prototype.$watch = function (expOrFn, cb, options) {
        var vm = this;
        if (isPlainObject(cb)) {
            return createWatcher(vm, expOrFn, cb, options);
        }
        options = options || {};
        options.user = true;
        var watcher = new Watcher(vm, expOrFn, cb, options);
        if (options.immediate) {
            var info = "callback for immediate watcher \"".concat(watcher.expression, "\"");
            pushTarget();
            invokeWithErrorHandling(cb, vm, [watcher.value], vm, info);
            popTarget();
        }
        return function unwatchFn() {
            watcher.teardown();
        };
    };
}

var uid = 0;
function initMixin$1(Vue) {
    Vue.prototype._init = function (options) {
        var vm = this;
        // a uid
        vm._uid = uid++;
        var startTag, endTag;
        /* istanbul ignore if */
        if (false) {}
        // a flag to mark this as a Vue instance without having to do instanceof
        // check
        vm._isVue = true;
        // avoid instances from being observed
        vm.__v_skip = true;
        // effect scope
        vm._scope = new EffectScope(true /* detached */);
        vm._scope._vm = true;
        // merge options
        if (options && options._isComponent) {
            // optimize internal component instantiation
            // since dynamic options merging is pretty slow, and none of the
            // internal component options needs special treatment.
            initInternalComponent(vm, options);
        }
        else {
            vm.$options = mergeOptions(resolveConstructorOptions(vm.constructor), options || {}, vm);
        }
        /* istanbul ignore else */
        if (false) {}
        else {
            vm._renderProxy = vm;
        }
        // expose real self
        vm._self = vm;
        initLifecycle(vm);
        initEvents(vm);
        initRender(vm);
        callHook$1(vm, 'beforeCreate', undefined, false /* setContext */);
        initInjections(vm); // resolve injections before data/props
        initState(vm);
        initProvide(vm); // resolve provide after data/props
        callHook$1(vm, 'created');
        /* istanbul ignore if */
        if (false) {}
        if (vm.$options.el) {
            vm.$mount(vm.$options.el);
        }
    };
}
function initInternalComponent(vm, options) {
    var opts = (vm.$options = Object.create(vm.constructor.options));
    // doing this because it's faster than dynamic enumeration.
    var parentVnode = options._parentVnode;
    opts.parent = options.parent;
    opts._parentVnode = parentVnode;
    var vnodeComponentOptions = parentVnode.componentOptions;
    opts.propsData = vnodeComponentOptions.propsData;
    opts._parentListeners = vnodeComponentOptions.listeners;
    opts._renderChildren = vnodeComponentOptions.children;
    opts._componentTag = vnodeComponentOptions.tag;
    if (options.render) {
        opts.render = options.render;
        opts.staticRenderFns = options.staticRenderFns;
    }
}
function resolveConstructorOptions(Ctor) {
    var options = Ctor.options;
    if (Ctor.super) {
        var superOptions = resolveConstructorOptions(Ctor.super);
        var cachedSuperOptions = Ctor.superOptions;
        if (superOptions !== cachedSuperOptions) {
            // super option changed,
            // need to resolve new options.
            Ctor.superOptions = superOptions;
            // check if there are any late-modified/attached options (#4976)
            var modifiedOptions = resolveModifiedOptions(Ctor);
            // update base extend options
            if (modifiedOptions) {
                extend(Ctor.extendOptions, modifiedOptions);
            }
            options = Ctor.options = mergeOptions(superOptions, Ctor.extendOptions);
            if (options.name) {
                options.components[options.name] = Ctor;
            }
        }
    }
    return options;
}
function resolveModifiedOptions(Ctor) {
    var modified;
    var latest = Ctor.options;
    var sealed = Ctor.sealedOptions;
    for (var key in latest) {
        if (latest[key] !== sealed[key]) {
            if (!modified)
                modified = {};
            modified[key] = latest[key];
        }
    }
    return modified;
}

function Vue(options) {
    if (false) {}
    this._init(options);
}
//@ts-expect-error Vue has function type
initMixin$1(Vue);
//@ts-expect-error Vue has function type
stateMixin(Vue);
//@ts-expect-error Vue has function type
eventsMixin(Vue);
//@ts-expect-error Vue has function type
lifecycleMixin(Vue);
//@ts-expect-error Vue has function type
renderMixin(Vue);

function initUse(Vue) {
    Vue.use = function (plugin) {
        var installedPlugins = this._installedPlugins || (this._installedPlugins = []);
        if (installedPlugins.indexOf(plugin) > -1) {
            return this;
        }
        // additional parameters
        var args = toArray(arguments, 1);
        args.unshift(this);
        if (isFunction(plugin.install)) {
            plugin.install.apply(plugin, args);
        }
        else if (isFunction(plugin)) {
            plugin.apply(null, args);
        }
        installedPlugins.push(plugin);
        return this;
    };
}

function initMixin(Vue) {
    Vue.mixin = function (mixin) {
        this.options = mergeOptions(this.options, mixin);
        return this;
    };
}

function initExtend(Vue) {
    /**
     * Each instance constructor, including Vue, has a unique
     * cid. This enables us to create wrapped "child
     * constructors" for prototypal inheritance and cache them.
     */
    Vue.cid = 0;
    var cid = 1;
    /**
     * Class inheritance
     */
    Vue.extend = function (extendOptions) {
        extendOptions = extendOptions || {};
        var Super = this;
        var SuperId = Super.cid;
        var cachedCtors = extendOptions._Ctor || (extendOptions._Ctor = {});
        if (cachedCtors[SuperId]) {
            return cachedCtors[SuperId];
        }
        var name = getComponentName(extendOptions) || getComponentName(Super.options);
        if (false) {}
        var Sub = function VueComponent(options) {
            this._init(options);
        };
        Sub.prototype = Object.create(Super.prototype);
        Sub.prototype.constructor = Sub;
        Sub.cid = cid++;
        Sub.options = mergeOptions(Super.options, extendOptions);
        Sub['super'] = Super;
        // For props and computed properties, we define the proxy getters on
        // the Vue instances at extension time, on the extended prototype. This
        // avoids Object.defineProperty calls for each instance created.
        if (Sub.options.props) {
            initProps(Sub);
        }
        if (Sub.options.computed) {
            initComputed(Sub);
        }
        // allow further extension/mixin/plugin usage
        Sub.extend = Super.extend;
        Sub.mixin = Super.mixin;
        Sub.use = Super.use;
        // create asset registers, so extended classes
        // can have their private assets too.
        ASSET_TYPES.forEach(function (type) {
            Sub[type] = Super[type];
        });
        // enable recursive self-lookup
        if (name) {
            Sub.options.components[name] = Sub;
        }
        // keep a reference to the super options at extension time.
        // later at instantiation we can check if Super's options have
        // been updated.
        Sub.superOptions = Super.options;
        Sub.extendOptions = extendOptions;
        Sub.sealedOptions = extend({}, Sub.options);
        // cache constructor
        cachedCtors[SuperId] = Sub;
        return Sub;
    };
}
function initProps(Comp) {
    var props = Comp.options.props;
    for (var key in props) {
        proxy(Comp.prototype, "_props", key);
    }
}
function initComputed(Comp) {
    var computed = Comp.options.computed;
    for (var key in computed) {
        defineComputed(Comp.prototype, key, computed[key]);
    }
}

function initAssetRegisters(Vue) {
    /**
     * Create asset registration methods.
     */
    ASSET_TYPES.forEach(function (type) {
        // @ts-expect-error function is not exact same type
        Vue[type] = function (id, definition) {
            if (!definition) {
                return this.options[type + 's'][id];
            }
            else {
                /* istanbul ignore if */
                if (false) {}
                if (type === 'component' && isPlainObject(definition)) {
                    // @ts-expect-error
                    definition.name = definition.name || id;
                    definition = this.options._base.extend(definition);
                }
                if (type === 'directive' && isFunction(definition)) {
                    definition = { bind: definition, update: definition };
                }
                this.options[type + 's'][id] = definition;
                return definition;
            }
        };
    });
}

function _getComponentName(opts) {
    return opts && (getComponentName(opts.Ctor.options) || opts.tag);
}
function matches(pattern, name) {
    if (isArray(pattern)) {
        return pattern.indexOf(name) > -1;
    }
    else if (typeof pattern === 'string') {
        return pattern.split(',').indexOf(name) > -1;
    }
    else if (isRegExp(pattern)) {
        return pattern.test(name);
    }
    /* istanbul ignore next */
    return false;
}
function pruneCache(keepAliveInstance, filter) {
    var cache = keepAliveInstance.cache, keys = keepAliveInstance.keys, _vnode = keepAliveInstance._vnode;
    for (var key in cache) {
        var entry = cache[key];
        if (entry) {
            var name_1 = entry.name;
            if (name_1 && !filter(name_1)) {
                pruneCacheEntry(cache, key, keys, _vnode);
            }
        }
    }
}
function pruneCacheEntry(cache, key, keys, current) {
    var entry = cache[key];
    if (entry && (!current || entry.tag !== current.tag)) {
        // @ts-expect-error can be undefined
        entry.componentInstance.$destroy();
    }
    cache[key] = null;
    remove$2(keys, key);
}
var patternTypes = [String, RegExp, Array];
// TODO defineComponent
var KeepAlive = {
    name: 'keep-alive',
    abstract: true,
    props: {
        include: patternTypes,
        exclude: patternTypes,
        max: [String, Number]
    },
    methods: {
        cacheVNode: function () {
            var _a = this, cache = _a.cache, keys = _a.keys, vnodeToCache = _a.vnodeToCache, keyToCache = _a.keyToCache;
            if (vnodeToCache) {
                var tag = vnodeToCache.tag, componentInstance = vnodeToCache.componentInstance, componentOptions = vnodeToCache.componentOptions;
                cache[keyToCache] = {
                    name: _getComponentName(componentOptions),
                    tag: tag,
                    componentInstance: componentInstance
                };
                keys.push(keyToCache);
                // prune oldest entry
                if (this.max && keys.length > parseInt(this.max)) {
                    pruneCacheEntry(cache, keys[0], keys, this._vnode);
                }
                this.vnodeToCache = null;
            }
        }
    },
    created: function () {
        this.cache = Object.create(null);
        this.keys = [];
    },
    destroyed: function () {
        for (var key in this.cache) {
            pruneCacheEntry(this.cache, key, this.keys);
        }
    },
    mounted: function () {
        var _this = this;
        this.cacheVNode();
        this.$watch('include', function (val) {
            pruneCache(_this, function (name) { return matches(val, name); });
        });
        this.$watch('exclude', function (val) {
            pruneCache(_this, function (name) { return !matches(val, name); });
        });
    },
    updated: function () {
        this.cacheVNode();
    },
    render: function () {
        var slot = this.$slots.default;
        var vnode = getFirstComponentChild(slot);
        var componentOptions = vnode && vnode.componentOptions;
        if (componentOptions) {
            // check pattern
            var name_2 = _getComponentName(componentOptions);
            var _a = this, include = _a.include, exclude = _a.exclude;
            if (
            // not included
            (include && (!name_2 || !matches(include, name_2))) ||
                // excluded
                (exclude && name_2 && matches(exclude, name_2))) {
                return vnode;
            }
            var _b = this, cache = _b.cache, keys = _b.keys;
            var key = vnode.key == null
                ? // same constructor may get registered as different local components
                    // so cid alone is not enough (#3269)
                    componentOptions.Ctor.cid +
                        (componentOptions.tag ? "::".concat(componentOptions.tag) : '')
                : vnode.key;
            if (cache[key]) {
                vnode.componentInstance = cache[key].componentInstance;
                // make current key freshest
                remove$2(keys, key);
                keys.push(key);
            }
            else {
                // delay setting the cache until update
                this.vnodeToCache = vnode;
                this.keyToCache = key;
            }
            // @ts-expect-error can vnode.data can be undefined
            vnode.data.keepAlive = true;
        }
        return vnode || (slot && slot[0]);
    }
};

var builtInComponents = {
    KeepAlive: KeepAlive
};

function initGlobalAPI(Vue) {
    // config
    var configDef = {};
    configDef.get = function () { return config; };
    if (false) {}
    Object.defineProperty(Vue, 'config', configDef);
    // exposed util methods.
    // NOTE: these are not considered part of the public API - avoid relying on
    // them unless you are aware of the risk.
    Vue.util = {
        warn: warn,
        extend: extend,
        mergeOptions: mergeOptions,
        defineReactive: defineReactive
    };
    Vue.set = set;
    Vue.delete = del;
    Vue.nextTick = nextTick;
    // 2.6 explicit observable API
    Vue.observable = function (obj) {
        observe(obj);
        return obj;
    };
    Vue.options = Object.create(null);
    ASSET_TYPES.forEach(function (type) {
        Vue.options[type + 's'] = Object.create(null);
    });
    // this is used to identify the "base" constructor to extend all plain-object
    // components with in Weex's multi-instance scenarios.
    Vue.options._base = Vue;
    extend(Vue.options.components, builtInComponents);
    initUse(Vue);
    initMixin(Vue);
    initExtend(Vue);
    initAssetRegisters(Vue);
}

initGlobalAPI(Vue);
Object.defineProperty(Vue.prototype, '$isServer', {
    get: isServerRendering
});
Object.defineProperty(Vue.prototype, '$ssrContext', {
    get: function () {
        /* istanbul ignore next */
        return this.$vnode && this.$vnode.ssrContext;
    }
});
// expose FunctionalRenderContext for ssr runtime helper installation
Object.defineProperty(Vue, 'FunctionalRenderContext', {
    value: FunctionalRenderContext
});
Vue.version = version;

// these are reserved for web because they are directly compiled away
// during template compilation
var isReservedAttr = makeMap('style,class');
// attributes that should be using props for binding
var acceptValue = makeMap('input,textarea,option,select,progress');
var mustUseProp = function (tag, type, attr) {
    return ((attr === 'value' && acceptValue(tag) && type !== 'button') ||
        (attr === 'selected' && tag === 'option') ||
        (attr === 'checked' && tag === 'input') ||
        (attr === 'muted' && tag === 'video'));
};
var isEnumeratedAttr = makeMap('contenteditable,draggable,spellcheck');
var isValidContentEditableValue = makeMap('events,caret,typing,plaintext-only');
var convertEnumeratedValue = function (key, value) {
    return isFalsyAttrValue(value) || value === 'false'
        ? 'false'
        : // allow arbitrary string value for contenteditable
            key === 'contenteditable' && isValidContentEditableValue(value)
                ? value
                : 'true';
};
var isBooleanAttr = makeMap('allowfullscreen,async,autofocus,autoplay,checked,compact,controls,declare,' +
    'default,defaultchecked,defaultmuted,defaultselected,defer,disabled,' +
    'enabled,formnovalidate,hidden,indeterminate,inert,ismap,itemscope,loop,multiple,' +
    'muted,nohref,noresize,noshade,novalidate,nowrap,open,pauseonexit,readonly,' +
    'required,reversed,scoped,seamless,selected,sortable,' +
    'truespeed,typemustmatch,visible');
var xlinkNS = 'http://www.w3.org/1999/xlink';
var isXlink = function (name) {
    return name.charAt(5) === ':' && name.slice(0, 5) === 'xlink';
};
var getXlinkProp = function (name) {
    return isXlink(name) ? name.slice(6, name.length) : '';
};
var isFalsyAttrValue = function (val) {
    return val == null || val === false;
};

function genClassForVnode(vnode) {
    var data = vnode.data;
    var parentNode = vnode;
    var childNode = vnode;
    while (isDef(childNode.componentInstance)) {
        childNode = childNode.componentInstance._vnode;
        if (childNode && childNode.data) {
            data = mergeClassData(childNode.data, data);
        }
    }
    // @ts-expect-error parentNode.parent not VNodeWithData
    while (isDef((parentNode = parentNode.parent))) {
        if (parentNode && parentNode.data) {
            data = mergeClassData(data, parentNode.data);
        }
    }
    return renderClass(data.staticClass, data.class);
}
function mergeClassData(child, parent) {
    return {
        staticClass: concat(child.staticClass, parent.staticClass),
        class: isDef(child.class) ? [child.class, parent.class] : parent.class
    };
}
function renderClass(staticClass, dynamicClass) {
    if (isDef(staticClass) || isDef(dynamicClass)) {
        return concat(staticClass, stringifyClass(dynamicClass));
    }
    /* istanbul ignore next */
    return '';
}
function concat(a, b) {
    return a ? (b ? a + ' ' + b : a) : b || '';
}
function stringifyClass(value) {
    if (Array.isArray(value)) {
        return stringifyArray(value);
    }
    if (isObject(value)) {
        return stringifyObject(value);
    }
    if (typeof value === 'string') {
        return value;
    }
    /* istanbul ignore next */
    return '';
}
function stringifyArray(value) {
    var res = '';
    var stringified;
    for (var i = 0, l = value.length; i < l; i++) {
        if (isDef((stringified = stringifyClass(value[i]))) && stringified !== '') {
            if (res)
                res += ' ';
            res += stringified;
        }
    }
    return res;
}
function stringifyObject(value) {
    var res = '';
    for (var key in value) {
        if (value[key]) {
            if (res)
                res += ' ';
            res += key;
        }
    }
    return res;
}

var namespaceMap = {
    svg: 'http://www.w3.org/2000/svg',
    math: 'http://www.w3.org/1998/Math/MathML'
};
var isHTMLTag = makeMap('html,body,base,head,link,meta,style,title,' +
    'address,article,aside,footer,header,h1,h2,h3,h4,h5,h6,hgroup,nav,section,' +
    'div,dd,dl,dt,figcaption,figure,picture,hr,img,li,main,ol,p,pre,ul,' +
    'a,b,abbr,bdi,bdo,br,cite,code,data,dfn,em,i,kbd,mark,q,rp,rt,rtc,ruby,' +
    's,samp,small,span,strong,sub,sup,time,u,var,wbr,area,audio,map,track,video,' +
    'embed,object,param,source,canvas,script,noscript,del,ins,' +
    'caption,col,colgroup,table,thead,tbody,td,th,tr,' +
    'button,datalist,fieldset,form,input,label,legend,meter,optgroup,option,' +
    'output,progress,select,textarea,' +
    'details,dialog,menu,menuitem,summary,' +
    'content,element,shadow,template,blockquote,iframe,tfoot');
// this map is intentionally selective, only covering SVG elements that may
// contain child elements.
var isSVG = makeMap('svg,animate,circle,clippath,cursor,defs,desc,ellipse,filter,font-face,' +
    'foreignobject,g,glyph,image,line,marker,mask,missing-glyph,path,pattern,' +
    'polygon,polyline,rect,switch,symbol,text,textpath,tspan,use,view', true);
var isReservedTag = function (tag) {
    return isHTMLTag(tag) || isSVG(tag);
};
function getTagNamespace(tag) {
    if (isSVG(tag)) {
        return 'svg';
    }
    // basic support for MathML
    // note it doesn't support other MathML elements being component roots
    if (tag === 'math') {
        return 'math';
    }
}
var unknownElementCache = Object.create(null);
function isUnknownElement(tag) {
    /* istanbul ignore if */
    if (!inBrowser) {
        return true;
    }
    if (isReservedTag(tag)) {
        return false;
    }
    tag = tag.toLowerCase();
    /* istanbul ignore if */
    if (unknownElementCache[tag] != null) {
        return unknownElementCache[tag];
    }
    var el = document.createElement(tag);
    if (tag.indexOf('-') > -1) {
        // http://stackoverflow.com/a/28210364/1070244
        return (unknownElementCache[tag] =
            el.constructor === window.HTMLUnknownElement ||
                el.constructor === window.HTMLElement);
    }
    else {
        return (unknownElementCache[tag] = /HTMLUnknownElement/.test(el.toString()));
    }
}
var isTextInputType = makeMap('text,number,password,search,email,tel,url');

/**
 * Query an element selector if it's not an element already.
 */
function query(el) {
    if (typeof el === 'string') {
        var selected = document.querySelector(el);
        if (!selected) {
             false && 0;
            return document.createElement('div');
        }
        return selected;
    }
    else {
        return el;
    }
}

function createElement(tagName, vnode) {
    var elm = document.createElement(tagName);
    if (tagName !== 'select') {
        return elm;
    }
    // false or null will remove the attribute but undefined will not
    if (vnode.data &&
        vnode.data.attrs &&
        vnode.data.attrs.multiple !== undefined) {
        elm.setAttribute('multiple', 'multiple');
    }
    return elm;
}
function createElementNS(namespace, tagName) {
    return document.createElementNS(namespaceMap[namespace], tagName);
}
function createTextNode(text) {
    return document.createTextNode(text);
}
function createComment(text) {
    return document.createComment(text);
}
function insertBefore(parentNode, newNode, referenceNode) {
    parentNode.insertBefore(newNode, referenceNode);
}
function removeChild(node, child) {
    node.removeChild(child);
}
function appendChild(node, child) {
    node.appendChild(child);
}
function parentNode(node) {
    return node.parentNode;
}
function nextSibling(node) {
    return node.nextSibling;
}
function tagName(node) {
    return node.tagName;
}
function setTextContent(node, text) {
    node.textContent = text;
}
function setStyleScope(node, scopeId) {
    node.setAttribute(scopeId, '');
}

var nodeOps = /*#__PURE__*/Object.freeze({
  __proto__: null,
  createElement: createElement,
  createElementNS: createElementNS,
  createTextNode: createTextNode,
  createComment: createComment,
  insertBefore: insertBefore,
  removeChild: removeChild,
  appendChild: appendChild,
  parentNode: parentNode,
  nextSibling: nextSibling,
  tagName: tagName,
  setTextContent: setTextContent,
  setStyleScope: setStyleScope
});

var ref = {
    create: function (_, vnode) {
        registerRef(vnode);
    },
    update: function (oldVnode, vnode) {
        if (oldVnode.data.ref !== vnode.data.ref) {
            registerRef(oldVnode, true);
            registerRef(vnode);
        }
    },
    destroy: function (vnode) {
        registerRef(vnode, true);
    }
};
function registerRef(vnode, isRemoval) {
    var ref = vnode.data.ref;
    if (!isDef(ref))
        return;
    var vm = vnode.context;
    var refValue = vnode.componentInstance || vnode.elm;
    var value = isRemoval ? null : refValue;
    var $refsValue = isRemoval ? undefined : refValue;
    if (isFunction(ref)) {
        invokeWithErrorHandling(ref, vm, [value], vm, "template ref function");
        return;
    }
    var isFor = vnode.data.refInFor;
    var _isString = typeof ref === 'string' || typeof ref === 'number';
    var _isRef = isRef(ref);
    var refs = vm.$refs;
    if (_isString || _isRef) {
        if (isFor) {
            var existing = _isString ? refs[ref] : ref.value;
            if (isRemoval) {
                isArray(existing) && remove$2(existing, refValue);
            }
            else {
                if (!isArray(existing)) {
                    if (_isString) {
                        refs[ref] = [refValue];
                        setSetupRef(vm, ref, refs[ref]);
                    }
                    else {
                        ref.value = [refValue];
                    }
                }
                else if (!existing.includes(refValue)) {
                    existing.push(refValue);
                }
            }
        }
        else if (_isString) {
            if (isRemoval && refs[ref] !== refValue) {
                return;
            }
            refs[ref] = $refsValue;
            setSetupRef(vm, ref, value);
        }
        else if (_isRef) {
            if (isRemoval && ref.value !== refValue) {
                return;
            }
            ref.value = value;
        }
        else if (false) {}
    }
}
function setSetupRef(_a, key, val) {
    var _setupState = _a._setupState;
    if (_setupState && hasOwn(_setupState, key)) {
        if (isRef(_setupState[key])) {
            _setupState[key].value = val;
        }
        else {
            _setupState[key] = val;
        }
    }
}

/**
 * Virtual DOM patching algorithm based on Snabbdom by
 * Simon Friis Vindum (@paldepind)
 * Licensed under the MIT License
 * https://github.com/paldepind/snabbdom/blob/master/LICENSE
 *
 * modified by Evan You (@yyx990803)
 *
 * Not type-checking this because this file is perf-critical and the cost
 * of making flow understand it is not worth it.
 */
var emptyNode = new VNode('', {}, []);
var hooks = ['create', 'activate', 'update', 'remove', 'destroy'];
function sameVnode(a, b) {
    return (a.key === b.key &&
        a.asyncFactory === b.asyncFactory &&
        ((a.tag === b.tag &&
            a.isComment === b.isComment &&
            isDef(a.data) === isDef(b.data) &&
            sameInputType(a, b)) ||
            (isTrue(a.isAsyncPlaceholder) && isUndef(b.asyncFactory.error))));
}
function sameInputType(a, b) {
    if (a.tag !== 'input')
        return true;
    var i;
    var typeA = isDef((i = a.data)) && isDef((i = i.attrs)) && i.type;
    var typeB = isDef((i = b.data)) && isDef((i = i.attrs)) && i.type;
    return typeA === typeB || (isTextInputType(typeA) && isTextInputType(typeB));
}
function createKeyToOldIdx(children, beginIdx, endIdx) {
    var i, key;
    var map = {};
    for (i = beginIdx; i <= endIdx; ++i) {
        key = children[i].key;
        if (isDef(key))
            map[key] = i;
    }
    return map;
}
function createPatchFunction(backend) {
    var i, j;
    var cbs = {};
    var modules = backend.modules, nodeOps = backend.nodeOps;
    for (i = 0; i < hooks.length; ++i) {
        cbs[hooks[i]] = [];
        for (j = 0; j < modules.length; ++j) {
            if (isDef(modules[j][hooks[i]])) {
                cbs[hooks[i]].push(modules[j][hooks[i]]);
            }
        }
    }
    function emptyNodeAt(elm) {
        return new VNode(nodeOps.tagName(elm).toLowerCase(), {}, [], undefined, elm);
    }
    function createRmCb(childElm, listeners) {
        function remove() {
            if (--remove.listeners === 0) {
                removeNode(childElm);
            }
        }
        remove.listeners = listeners;
        return remove;
    }
    function removeNode(el) {
        var parent = nodeOps.parentNode(el);
        // element may have already been removed due to v-html / v-text
        if (isDef(parent)) {
            nodeOps.removeChild(parent, el);
        }
    }
    function isUnknownElement(vnode, inVPre) {
        return (!inVPre &&
            !vnode.ns &&
            !(config.ignoredElements.length &&
                config.ignoredElements.some(function (ignore) {
                    return isRegExp(ignore)
                        ? ignore.test(vnode.tag)
                        : ignore === vnode.tag;
                })) &&
            config.isUnknownElement(vnode.tag));
    }
    var creatingElmInVPre = 0;
    function createElm(vnode, insertedVnodeQueue, parentElm, refElm, nested, ownerArray, index) {
        if (isDef(vnode.elm) && isDef(ownerArray)) {
            // This vnode was used in a previous render!
            // now it's used as a new node, overwriting its elm would cause
            // potential patch errors down the road when it's used as an insertion
            // reference node. Instead, we clone the node on-demand before creating
            // associated DOM element for it.
            vnode = ownerArray[index] = cloneVNode(vnode);
        }
        vnode.isRootInsert = !nested; // for transition enter check
        if (createComponent(vnode, insertedVnodeQueue, parentElm, refElm)) {
            return;
        }
        var data = vnode.data;
        var children = vnode.children;
        var tag = vnode.tag;
        if (isDef(tag)) {
            if (false) {}
            vnode.elm = vnode.ns
                ? nodeOps.createElementNS(vnode.ns, tag)
                : nodeOps.createElement(tag, vnode);
            setScope(vnode);
            createChildren(vnode, children, insertedVnodeQueue);
            if (isDef(data)) {
                invokeCreateHooks(vnode, insertedVnodeQueue);
            }
            insert(parentElm, vnode.elm, refElm);
            if (false) {}
        }
        else if (isTrue(vnode.isComment)) {
            vnode.elm = nodeOps.createComment(vnode.text);
            insert(parentElm, vnode.elm, refElm);
        }
        else {
            vnode.elm = nodeOps.createTextNode(vnode.text);
            insert(parentElm, vnode.elm, refElm);
        }
    }
    function createComponent(vnode, insertedVnodeQueue, parentElm, refElm) {
        var i = vnode.data;
        if (isDef(i)) {
            var isReactivated = isDef(vnode.componentInstance) && i.keepAlive;
            if (isDef((i = i.hook)) && isDef((i = i.init))) {
                i(vnode, false /* hydrating */);
            }
            // after calling the init hook, if the vnode is a child component
            // it should've created a child instance and mounted it. the child
            // component also has set the placeholder vnode's elm.
            // in that case we can just return the element and be done.
            if (isDef(vnode.componentInstance)) {
                initComponent(vnode, insertedVnodeQueue);
                insert(parentElm, vnode.elm, refElm);
                if (isTrue(isReactivated)) {
                    reactivateComponent(vnode, insertedVnodeQueue, parentElm, refElm);
                }
                return true;
            }
        }
    }
    function initComponent(vnode, insertedVnodeQueue) {
        if (isDef(vnode.data.pendingInsert)) {
            insertedVnodeQueue.push.apply(insertedVnodeQueue, vnode.data.pendingInsert);
            vnode.data.pendingInsert = null;
        }
        vnode.elm = vnode.componentInstance.$el;
        if (isPatchable(vnode)) {
            invokeCreateHooks(vnode, insertedVnodeQueue);
            setScope(vnode);
        }
        else {
            // empty component root.
            // skip all element-related modules except for ref (#3455)
            registerRef(vnode);
            // make sure to invoke the insert hook
            insertedVnodeQueue.push(vnode);
        }
    }
    function reactivateComponent(vnode, insertedVnodeQueue, parentElm, refElm) {
        var i;
        // hack for #4339: a reactivated component with inner transition
        // does not trigger because the inner node's created hooks are not called
        // again. It's not ideal to involve module-specific logic in here but
        // there doesn't seem to be a better way to do it.
        var innerNode = vnode;
        while (innerNode.componentInstance) {
            innerNode = innerNode.componentInstance._vnode;
            if (isDef((i = innerNode.data)) && isDef((i = i.transition))) {
                for (i = 0; i < cbs.activate.length; ++i) {
                    cbs.activate[i](emptyNode, innerNode);
                }
                insertedVnodeQueue.push(innerNode);
                break;
            }
        }
        // unlike a newly created component,
        // a reactivated keep-alive component doesn't insert itself
        insert(parentElm, vnode.elm, refElm);
    }
    function insert(parent, elm, ref) {
        if (isDef(parent)) {
            if (isDef(ref)) {
                if (nodeOps.parentNode(ref) === parent) {
                    nodeOps.insertBefore(parent, elm, ref);
                }
            }
            else {
                nodeOps.appendChild(parent, elm);
            }
        }
    }
    function createChildren(vnode, children, insertedVnodeQueue) {
        if (isArray(children)) {
            if (false) {}
            for (var i_1 = 0; i_1 < children.length; ++i_1) {
                createElm(children[i_1], insertedVnodeQueue, vnode.elm, null, true, children, i_1);
            }
        }
        else if (isPrimitive(vnode.text)) {
            nodeOps.appendChild(vnode.elm, nodeOps.createTextNode(String(vnode.text)));
        }
    }
    function isPatchable(vnode) {
        while (vnode.componentInstance) {
            vnode = vnode.componentInstance._vnode;
        }
        return isDef(vnode.tag);
    }
    function invokeCreateHooks(vnode, insertedVnodeQueue) {
        for (var i_2 = 0; i_2 < cbs.create.length; ++i_2) {
            cbs.create[i_2](emptyNode, vnode);
        }
        i = vnode.data.hook; // Reuse variable
        if (isDef(i)) {
            if (isDef(i.create))
                i.create(emptyNode, vnode);
            if (isDef(i.insert))
                insertedVnodeQueue.push(vnode);
        }
    }
    // set scope id attribute for scoped CSS.
    // this is implemented as a special case to avoid the overhead
    // of going through the normal attribute patching process.
    function setScope(vnode) {
        var i;
        if (isDef((i = vnode.fnScopeId))) {
            nodeOps.setStyleScope(vnode.elm, i);
        }
        else {
            var ancestor = vnode;
            while (ancestor) {
                if (isDef((i = ancestor.context)) && isDef((i = i.$options._scopeId))) {
                    nodeOps.setStyleScope(vnode.elm, i);
                }
                ancestor = ancestor.parent;
            }
        }
        // for slot content they should also get the scopeId from the host instance.
        if (isDef((i = activeInstance)) &&
            i !== vnode.context &&
            i !== vnode.fnContext &&
            isDef((i = i.$options._scopeId))) {
            nodeOps.setStyleScope(vnode.elm, i);
        }
    }
    function addVnodes(parentElm, refElm, vnodes, startIdx, endIdx, insertedVnodeQueue) {
        for (; startIdx <= endIdx; ++startIdx) {
            createElm(vnodes[startIdx], insertedVnodeQueue, parentElm, refElm, false, vnodes, startIdx);
        }
    }
    function invokeDestroyHook(vnode) {
        var i, j;
        var data = vnode.data;
        if (isDef(data)) {
            if (isDef((i = data.hook)) && isDef((i = i.destroy)))
                i(vnode);
            for (i = 0; i < cbs.destroy.length; ++i)
                cbs.destroy[i](vnode);
        }
        if (isDef((i = vnode.children))) {
            for (j = 0; j < vnode.children.length; ++j) {
                invokeDestroyHook(vnode.children[j]);
            }
        }
    }
    function removeVnodes(vnodes, startIdx, endIdx) {
        for (; startIdx <= endIdx; ++startIdx) {
            var ch = vnodes[startIdx];
            if (isDef(ch)) {
                if (isDef(ch.tag)) {
                    removeAndInvokeRemoveHook(ch);
                    invokeDestroyHook(ch);
                }
                else {
                    // Text node
                    removeNode(ch.elm);
                }
            }
        }
    }
    function removeAndInvokeRemoveHook(vnode, rm) {
        if (isDef(rm) || isDef(vnode.data)) {
            var i_3;
            var listeners = cbs.remove.length + 1;
            if (isDef(rm)) {
                // we have a recursively passed down rm callback
                // increase the listeners count
                rm.listeners += listeners;
            }
            else {
                // directly removing
                rm = createRmCb(vnode.elm, listeners);
            }
            // recursively invoke hooks on child component root node
            if (isDef((i_3 = vnode.componentInstance)) &&
                isDef((i_3 = i_3._vnode)) &&
                isDef(i_3.data)) {
                removeAndInvokeRemoveHook(i_3, rm);
            }
            for (i_3 = 0; i_3 < cbs.remove.length; ++i_3) {
                cbs.remove[i_3](vnode, rm);
            }
            if (isDef((i_3 = vnode.data.hook)) && isDef((i_3 = i_3.remove))) {
                i_3(vnode, rm);
            }
            else {
                rm();
            }
        }
        else {
            removeNode(vnode.elm);
        }
    }
    function updateChildren(parentElm, oldCh, newCh, insertedVnodeQueue, removeOnly) {
        var oldStartIdx = 0;
        var newStartIdx = 0;
        var oldEndIdx = oldCh.length - 1;
        var oldStartVnode = oldCh[0];
        var oldEndVnode = oldCh[oldEndIdx];
        var newEndIdx = newCh.length - 1;
        var newStartVnode = newCh[0];
        var newEndVnode = newCh[newEndIdx];
        var oldKeyToIdx, idxInOld, vnodeToMove, refElm;
        // removeOnly is a special flag used only by <transition-group>
        // to ensure removed elements stay in correct relative positions
        // during leaving transitions
        var canMove = !removeOnly;
        if (false) {}
        while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
            if (isUndef(oldStartVnode)) {
                oldStartVnode = oldCh[++oldStartIdx]; // Vnode has been moved left
            }
            else if (isUndef(oldEndVnode)) {
                oldEndVnode = oldCh[--oldEndIdx];
            }
            else if (sameVnode(oldStartVnode, newStartVnode)) {
                patchVnode(oldStartVnode, newStartVnode, insertedVnodeQueue, newCh, newStartIdx);
                oldStartVnode = oldCh[++oldStartIdx];
                newStartVnode = newCh[++newStartIdx];
            }
            else if (sameVnode(oldEndVnode, newEndVnode)) {
                patchVnode(oldEndVnode, newEndVnode, insertedVnodeQueue, newCh, newEndIdx);
                oldEndVnode = oldCh[--oldEndIdx];
                newEndVnode = newCh[--newEndIdx];
            }
            else if (sameVnode(oldStartVnode, newEndVnode)) {
                // Vnode moved right
                patchVnode(oldStartVnode, newEndVnode, insertedVnodeQueue, newCh, newEndIdx);
                canMove &&
                    nodeOps.insertBefore(parentElm, oldStartVnode.elm, nodeOps.nextSibling(oldEndVnode.elm));
                oldStartVnode = oldCh[++oldStartIdx];
                newEndVnode = newCh[--newEndIdx];
            }
            else if (sameVnode(oldEndVnode, newStartVnode)) {
                // Vnode moved left
                patchVnode(oldEndVnode, newStartVnode, insertedVnodeQueue, newCh, newStartIdx);
                canMove &&
                    nodeOps.insertBefore(parentElm, oldEndVnode.elm, oldStartVnode.elm);
                oldEndVnode = oldCh[--oldEndIdx];
                newStartVnode = newCh[++newStartIdx];
            }
            else {
                if (isUndef(oldKeyToIdx))
                    oldKeyToIdx = createKeyToOldIdx(oldCh, oldStartIdx, oldEndIdx);
                idxInOld = isDef(newStartVnode.key)
                    ? oldKeyToIdx[newStartVnode.key]
                    : findIdxInOld(newStartVnode, oldCh, oldStartIdx, oldEndIdx);
                if (isUndef(idxInOld)) {
                    // New element
                    createElm(newStartVnode, insertedVnodeQueue, parentElm, oldStartVnode.elm, false, newCh, newStartIdx);
                }
                else {
                    vnodeToMove = oldCh[idxInOld];
                    if (sameVnode(vnodeToMove, newStartVnode)) {
                        patchVnode(vnodeToMove, newStartVnode, insertedVnodeQueue, newCh, newStartIdx);
                        oldCh[idxInOld] = undefined;
                        canMove &&
                            nodeOps.insertBefore(parentElm, vnodeToMove.elm, oldStartVnode.elm);
                    }
                    else {
                        // same key but different element. treat as new element
                        createElm(newStartVnode, insertedVnodeQueue, parentElm, oldStartVnode.elm, false, newCh, newStartIdx);
                    }
                }
                newStartVnode = newCh[++newStartIdx];
            }
        }
        if (oldStartIdx > oldEndIdx) {
            refElm = isUndef(newCh[newEndIdx + 1]) ? null : newCh[newEndIdx + 1].elm;
            addVnodes(parentElm, refElm, newCh, newStartIdx, newEndIdx, insertedVnodeQueue);
        }
        else if (newStartIdx > newEndIdx) {
            removeVnodes(oldCh, oldStartIdx, oldEndIdx);
        }
    }
    function checkDuplicateKeys(children) {
        var seenKeys = {};
        for (var i_4 = 0; i_4 < children.length; i_4++) {
            var vnode = children[i_4];
            var key = vnode.key;
            if (isDef(key)) {
                if (seenKeys[key]) {
                    warn("Duplicate keys detected: '".concat(key, "'. This may cause an update error."), vnode.context);
                }
                else {
                    seenKeys[key] = true;
                }
            }
        }
    }
    function findIdxInOld(node, oldCh, start, end) {
        for (var i_5 = start; i_5 < end; i_5++) {
            var c = oldCh[i_5];
            if (isDef(c) && sameVnode(node, c))
                return i_5;
        }
    }
    function patchVnode(oldVnode, vnode, insertedVnodeQueue, ownerArray, index, removeOnly) {
        if (oldVnode === vnode) {
            return;
        }
        if (isDef(vnode.elm) && isDef(ownerArray)) {
            // clone reused vnode
            vnode = ownerArray[index] = cloneVNode(vnode);
        }
        var elm = (vnode.elm = oldVnode.elm);
        if (isTrue(oldVnode.isAsyncPlaceholder)) {
            if (isDef(vnode.asyncFactory.resolved)) {
                hydrate(oldVnode.elm, vnode, insertedVnodeQueue);
            }
            else {
                vnode.isAsyncPlaceholder = true;
            }
            return;
        }
        // reuse element for static trees.
        // note we only do this if the vnode is cloned -
        // if the new node is not cloned it means the render functions have been
        // reset by the hot-reload-api and we need to do a proper re-render.
        if (isTrue(vnode.isStatic) &&
            isTrue(oldVnode.isStatic) &&
            vnode.key === oldVnode.key &&
            (isTrue(vnode.isCloned) || isTrue(vnode.isOnce))) {
            vnode.componentInstance = oldVnode.componentInstance;
            return;
        }
        var i;
        var data = vnode.data;
        if (isDef(data) && isDef((i = data.hook)) && isDef((i = i.prepatch))) {
            i(oldVnode, vnode);
        }
        var oldCh = oldVnode.children;
        var ch = vnode.children;
        if (isDef(data) && isPatchable(vnode)) {
            for (i = 0; i < cbs.update.length; ++i)
                cbs.update[i](oldVnode, vnode);
            if (isDef((i = data.hook)) && isDef((i = i.update)))
                i(oldVnode, vnode);
        }
        if (isUndef(vnode.text)) {
            if (isDef(oldCh) && isDef(ch)) {
                if (oldCh !== ch)
                    updateChildren(elm, oldCh, ch, insertedVnodeQueue, removeOnly);
            }
            else if (isDef(ch)) {
                if (false) {}
                if (isDef(oldVnode.text))
                    nodeOps.setTextContent(elm, '');
                addVnodes(elm, null, ch, 0, ch.length - 1, insertedVnodeQueue);
            }
            else if (isDef(oldCh)) {
                removeVnodes(oldCh, 0, oldCh.length - 1);
            }
            else if (isDef(oldVnode.text)) {
                nodeOps.setTextContent(elm, '');
            }
        }
        else if (oldVnode.text !== vnode.text) {
            nodeOps.setTextContent(elm, vnode.text);
        }
        if (isDef(data)) {
            if (isDef((i = data.hook)) && isDef((i = i.postpatch)))
                i(oldVnode, vnode);
        }
    }
    function invokeInsertHook(vnode, queue, initial) {
        // delay insert hooks for component root nodes, invoke them after the
        // element is really inserted
        if (isTrue(initial) && isDef(vnode.parent)) {
            vnode.parent.data.pendingInsert = queue;
        }
        else {
            for (var i_6 = 0; i_6 < queue.length; ++i_6) {
                queue[i_6].data.hook.insert(queue[i_6]);
            }
        }
    }
    var hydrationBailed = false;
    // list of modules that can skip create hook during hydration because they
    // are already rendered on the client or has no need for initialization
    // Note: style is excluded because it relies on initial clone for future
    // deep updates (#7063).
    var isRenderedModule = makeMap('attrs,class,staticClass,staticStyle,key');
    // Note: this is a browser-only function so we can assume elms are DOM nodes.
    function hydrate(elm, vnode, insertedVnodeQueue, inVPre) {
        var i;
        var tag = vnode.tag, data = vnode.data, children = vnode.children;
        inVPre = inVPre || (data && data.pre);
        vnode.elm = elm;
        if (isTrue(vnode.isComment) && isDef(vnode.asyncFactory)) {
            vnode.isAsyncPlaceholder = true;
            return true;
        }
        // assert node match
        if (false) {}
        if (isDef(data)) {
            if (isDef((i = data.hook)) && isDef((i = i.init)))
                i(vnode, true /* hydrating */);
            if (isDef((i = vnode.componentInstance))) {
                // child component. it should have hydrated its own tree.
                initComponent(vnode, insertedVnodeQueue);
                return true;
            }
        }
        if (isDef(tag)) {
            if (isDef(children)) {
                // empty element, allow client to pick up and populate children
                if (!elm.hasChildNodes()) {
                    createChildren(vnode, children, insertedVnodeQueue);
                }
                else {
                    // v-html and domProps: innerHTML
                    if (isDef((i = data)) &&
                        isDef((i = i.domProps)) &&
                        isDef((i = i.innerHTML))) {
                        if (i !== elm.innerHTML) {
                            /* istanbul ignore if */
                            if (false) {}
                            return false;
                        }
                    }
                    else {
                        // iterate and compare children lists
                        var childrenMatch = true;
                        var childNode = elm.firstChild;
                        for (var i_7 = 0; i_7 < children.length; i_7++) {
                            if (!childNode ||
                                !hydrate(childNode, children[i_7], insertedVnodeQueue, inVPre)) {
                                childrenMatch = false;
                                break;
                            }
                            childNode = childNode.nextSibling;
                        }
                        // if childNode is not null, it means the actual childNodes list is
                        // longer than the virtual children list.
                        if (!childrenMatch || childNode) {
                            /* istanbul ignore if */
                            if (false) {}
                            return false;
                        }
                    }
                }
            }
            if (isDef(data)) {
                var fullInvoke = false;
                for (var key in data) {
                    if (!isRenderedModule(key)) {
                        fullInvoke = true;
                        invokeCreateHooks(vnode, insertedVnodeQueue);
                        break;
                    }
                }
                if (!fullInvoke && data['class']) {
                    // ensure collecting deps for deep class bindings for future updates
                    traverse(data['class']);
                }
            }
        }
        else if (elm.data !== vnode.text) {
            elm.data = vnode.text;
        }
        return true;
    }
    function assertNodeMatch(node, vnode, inVPre) {
        if (isDef(vnode.tag)) {
            return (vnode.tag.indexOf('vue-component') === 0 ||
                (!isUnknownElement(vnode, inVPre) &&
                    vnode.tag.toLowerCase() ===
                        (node.tagName && node.tagName.toLowerCase())));
        }
        else {
            return node.nodeType === (vnode.isComment ? 8 : 3);
        }
    }
    return function patch(oldVnode, vnode, hydrating, removeOnly) {
        if (isUndef(vnode)) {
            if (isDef(oldVnode))
                invokeDestroyHook(oldVnode);
            return;
        }
        var isInitialPatch = false;
        var insertedVnodeQueue = [];
        if (isUndef(oldVnode)) {
            // empty mount (likely as component), create new root element
            isInitialPatch = true;
            createElm(vnode, insertedVnodeQueue);
        }
        else {
            var isRealElement = isDef(oldVnode.nodeType);
            if (!isRealElement && sameVnode(oldVnode, vnode)) {
                // patch existing root node
                patchVnode(oldVnode, vnode, insertedVnodeQueue, null, null, removeOnly);
            }
            else {
                if (isRealElement) {
                    // mounting to a real element
                    // check if this is server-rendered content and if we can perform
                    // a successful hydration.
                    if (oldVnode.nodeType === 1 && oldVnode.hasAttribute(SSR_ATTR)) {
                        oldVnode.removeAttribute(SSR_ATTR);
                        hydrating = true;
                    }
                    if (isTrue(hydrating)) {
                        if (hydrate(oldVnode, vnode, insertedVnodeQueue)) {
                            invokeInsertHook(vnode, insertedVnodeQueue, true);
                            return oldVnode;
                        }
                        else if (false) {}
                    }
                    // either not server-rendered, or hydration failed.
                    // create an empty node and replace it
                    oldVnode = emptyNodeAt(oldVnode);
                }
                // replacing existing element
                var oldElm = oldVnode.elm;
                var parentElm = nodeOps.parentNode(oldElm);
                // create new node
                createElm(vnode, insertedVnodeQueue, 
                // extremely rare edge case: do not insert if old element is in a
                // leaving transition. Only happens when combining transition +
                // keep-alive + HOCs. (#4590)
                oldElm._leaveCb ? null : parentElm, nodeOps.nextSibling(oldElm));
                // update parent placeholder node element, recursively
                if (isDef(vnode.parent)) {
                    var ancestor = vnode.parent;
                    var patchable = isPatchable(vnode);
                    while (ancestor) {
                        for (var i_8 = 0; i_8 < cbs.destroy.length; ++i_8) {
                            cbs.destroy[i_8](ancestor);
                        }
                        ancestor.elm = vnode.elm;
                        if (patchable) {
                            for (var i_9 = 0; i_9 < cbs.create.length; ++i_9) {
                                cbs.create[i_9](emptyNode, ancestor);
                            }
                            // #6513
                            // invoke insert hooks that may have been merged by create hooks.
                            // e.g. for directives that uses the "inserted" hook.
                            var insert_1 = ancestor.data.hook.insert;
                            if (insert_1.merged) {
                                // start at index 1 to avoid re-invoking component mounted hook
                                for (var i_10 = 1; i_10 < insert_1.fns.length; i_10++) {
                                    insert_1.fns[i_10]();
                                }
                            }
                        }
                        else {
                            registerRef(ancestor);
                        }
                        ancestor = ancestor.parent;
                    }
                }
                // destroy old node
                if (isDef(parentElm)) {
                    removeVnodes([oldVnode], 0, 0);
                }
                else if (isDef(oldVnode.tag)) {
                    invokeDestroyHook(oldVnode);
                }
            }
        }
        invokeInsertHook(vnode, insertedVnodeQueue, isInitialPatch);
        return vnode.elm;
    };
}

var directives = {
    create: updateDirectives,
    update: updateDirectives,
    destroy: function unbindDirectives(vnode) {
        // @ts-expect-error emptyNode is not VNodeWithData
        updateDirectives(vnode, emptyNode);
    }
};
function updateDirectives(oldVnode, vnode) {
    if (oldVnode.data.directives || vnode.data.directives) {
        _update(oldVnode, vnode);
    }
}
function _update(oldVnode, vnode) {
    var isCreate = oldVnode === emptyNode;
    var isDestroy = vnode === emptyNode;
    var oldDirs = normalizeDirectives(oldVnode.data.directives, oldVnode.context);
    var newDirs = normalizeDirectives(vnode.data.directives, vnode.context);
    var dirsWithInsert = [];
    var dirsWithPostpatch = [];
    var key, oldDir, dir;
    for (key in newDirs) {
        oldDir = oldDirs[key];
        dir = newDirs[key];
        if (!oldDir) {
            // new directive, bind
            callHook(dir, 'bind', vnode, oldVnode);
            if (dir.def && dir.def.inserted) {
                dirsWithInsert.push(dir);
            }
        }
        else {
            // existing directive, update
            dir.oldValue = oldDir.value;
            dir.oldArg = oldDir.arg;
            callHook(dir, 'update', vnode, oldVnode);
            if (dir.def && dir.def.componentUpdated) {
                dirsWithPostpatch.push(dir);
            }
        }
    }
    if (dirsWithInsert.length) {
        var callInsert = function () {
            for (var i = 0; i < dirsWithInsert.length; i++) {
                callHook(dirsWithInsert[i], 'inserted', vnode, oldVnode);
            }
        };
        if (isCreate) {
            mergeVNodeHook(vnode, 'insert', callInsert);
        }
        else {
            callInsert();
        }
    }
    if (dirsWithPostpatch.length) {
        mergeVNodeHook(vnode, 'postpatch', function () {
            for (var i = 0; i < dirsWithPostpatch.length; i++) {
                callHook(dirsWithPostpatch[i], 'componentUpdated', vnode, oldVnode);
            }
        });
    }
    if (!isCreate) {
        for (key in oldDirs) {
            if (!newDirs[key]) {
                // no longer present, unbind
                callHook(oldDirs[key], 'unbind', oldVnode, oldVnode, isDestroy);
            }
        }
    }
}
var emptyModifiers = Object.create(null);
function normalizeDirectives(dirs, vm) {
    var res = Object.create(null);
    if (!dirs) {
        // $flow-disable-line
        return res;
    }
    var i, dir;
    for (i = 0; i < dirs.length; i++) {
        dir = dirs[i];
        if (!dir.modifiers) {
            // $flow-disable-line
            dir.modifiers = emptyModifiers;
        }
        res[getRawDirName(dir)] = dir;
        if (vm._setupState && vm._setupState.__sfc) {
            var setupDef = dir.def || resolveAsset(vm, '_setupState', 'v-' + dir.name);
            if (typeof setupDef === 'function') {
                dir.def = {
                    bind: setupDef,
                    update: setupDef,
                };
            }
            else {
                dir.def = setupDef;
            }
        }
        dir.def = dir.def || resolveAsset(vm.$options, 'directives', dir.name, true);
    }
    // $flow-disable-line
    return res;
}
function getRawDirName(dir) {
    return (dir.rawName || "".concat(dir.name, ".").concat(Object.keys(dir.modifiers || {}).join('.')));
}
function callHook(dir, hook, vnode, oldVnode, isDestroy) {
    var fn = dir.def && dir.def[hook];
    if (fn) {
        try {
            fn(vnode.elm, dir, vnode, oldVnode, isDestroy);
        }
        catch (e) {
            handleError(e, vnode.context, "directive ".concat(dir.name, " ").concat(hook, " hook"));
        }
    }
}

var baseModules = [ref, directives];

function updateAttrs(oldVnode, vnode) {
    var opts = vnode.componentOptions;
    if (isDef(opts) && opts.Ctor.options.inheritAttrs === false) {
        return;
    }
    if (isUndef(oldVnode.data.attrs) && isUndef(vnode.data.attrs)) {
        return;
    }
    var key, cur, old;
    var elm = vnode.elm;
    var oldAttrs = oldVnode.data.attrs || {};
    var attrs = vnode.data.attrs || {};
    // clone observed objects, as the user probably wants to mutate it
    if (isDef(attrs.__ob__) || isTrue(attrs._v_attr_proxy)) {
        attrs = vnode.data.attrs = extend({}, attrs);
    }
    for (key in attrs) {
        cur = attrs[key];
        old = oldAttrs[key];
        if (old !== cur) {
            setAttr(elm, key, cur, vnode.data.pre);
        }
    }
    // #4391: in IE9, setting type can reset value for input[type=radio]
    // #6666: IE/Edge forces progress value down to 1 before setting a max
    /* istanbul ignore if */
    if ((isIE || isEdge) && attrs.value !== oldAttrs.value) {
        setAttr(elm, 'value', attrs.value);
    }
    for (key in oldAttrs) {
        if (isUndef(attrs[key])) {
            if (isXlink(key)) {
                elm.removeAttributeNS(xlinkNS, getXlinkProp(key));
            }
            else if (!isEnumeratedAttr(key)) {
                elm.removeAttribute(key);
            }
        }
    }
}
function setAttr(el, key, value, isInPre) {
    if (isInPre || el.tagName.indexOf('-') > -1) {
        baseSetAttr(el, key, value);
    }
    else if (isBooleanAttr(key)) {
        // set attribute for blank value
        // e.g. <option disabled>Select one</option>
        if (isFalsyAttrValue(value)) {
            el.removeAttribute(key);
        }
        else {
            // technically allowfullscreen is a boolean attribute for <iframe>,
            // but Flash expects a value of "true" when used on <embed> tag
            value = key === 'allowfullscreen' && el.tagName === 'EMBED' ? 'true' : key;
            el.setAttribute(key, value);
        }
    }
    else if (isEnumeratedAttr(key)) {
        el.setAttribute(key, convertEnumeratedValue(key, value));
    }
    else if (isXlink(key)) {
        if (isFalsyAttrValue(value)) {
            el.removeAttributeNS(xlinkNS, getXlinkProp(key));
        }
        else {
            el.setAttributeNS(xlinkNS, key, value);
        }
    }
    else {
        baseSetAttr(el, key, value);
    }
}
function baseSetAttr(el, key, value) {
    if (isFalsyAttrValue(value)) {
        el.removeAttribute(key);
    }
    else {
        // #7138: IE10 & 11 fires input event when setting placeholder on
        // <textarea>... block the first input event and remove the blocker
        // immediately.
        /* istanbul ignore if */
        if (isIE &&
            !isIE9 &&
            el.tagName === 'TEXTAREA' &&
            key === 'placeholder' &&
            value !== '' &&
            !el.__ieph) {
            var blocker_1 = function (e) {
                e.stopImmediatePropagation();
                el.removeEventListener('input', blocker_1);
            };
            el.addEventListener('input', blocker_1);
            // $flow-disable-line
            el.__ieph = true; /* IE placeholder patched */
        }
        el.setAttribute(key, value);
    }
}
var attrs = {
    create: updateAttrs,
    update: updateAttrs
};

function updateClass(oldVnode, vnode) {
    var el = vnode.elm;
    var data = vnode.data;
    var oldData = oldVnode.data;
    if (isUndef(data.staticClass) &&
        isUndef(data.class) &&
        (isUndef(oldData) ||
            (isUndef(oldData.staticClass) && isUndef(oldData.class)))) {
        return;
    }
    var cls = genClassForVnode(vnode);
    // handle transition classes
    var transitionClass = el._transitionClasses;
    if (isDef(transitionClass)) {
        cls = concat(cls, stringifyClass(transitionClass));
    }
    // set the class
    if (cls !== el._prevClass) {
        el.setAttribute('class', cls);
        el._prevClass = cls;
    }
}
var klass = {
    create: updateClass,
    update: updateClass
};

// in some cases, the event used has to be determined at runtime
// so we used some reserved tokens during compile.
var RANGE_TOKEN = '__r';
var CHECKBOX_RADIO_TOKEN = '__c';

// normalize v-model event tokens that can only be determined at runtime.
// it's important to place the event as the first in the array because
// the whole point is ensuring the v-model callback gets called before
// user-attached handlers.
function normalizeEvents(on) {
    /* istanbul ignore if */
    if (isDef(on[RANGE_TOKEN])) {
        // IE input[type=range] only supports `change` event
        var event_1 = isIE ? 'change' : 'input';
        on[event_1] = [].concat(on[RANGE_TOKEN], on[event_1] || []);
        delete on[RANGE_TOKEN];
    }
    // This was originally intended to fix #4521 but no longer necessary
    // after 2.5. Keeping it for backwards compat with generated code from < 2.4
    /* istanbul ignore if */
    if (isDef(on[CHECKBOX_RADIO_TOKEN])) {
        on.change = [].concat(on[CHECKBOX_RADIO_TOKEN], on.change || []);
        delete on[CHECKBOX_RADIO_TOKEN];
    }
}
var target;
function createOnceHandler(event, handler, capture) {
    var _target = target; // save current target element in closure
    return function onceHandler() {
        var res = handler.apply(null, arguments);
        if (res !== null) {
            remove(event, onceHandler, capture, _target);
        }
    };
}
// #9446: Firefox <= 53 (in particular, ESR 52) has incorrect Event.timeStamp
// implementation and does not fire microtasks in between event propagation, so
// safe to exclude.
var useMicrotaskFix = isUsingMicroTask && !(isFF && Number(isFF[1]) <= 53);
function add(name, handler, capture, passive) {
    // async edge case #6566: inner click event triggers patch, event handler
    // attached to outer element during patch, and triggered again. This
    // happens because browsers fire microtask ticks between event propagation.
    // the solution is simple: we save the timestamp when a handler is attached,
    // and the handler would only fire if the event passed to it was fired
    // AFTER it was attached.
    if (useMicrotaskFix) {
        var attachedTimestamp_1 = currentFlushTimestamp;
        var original_1 = handler;
        //@ts-expect-error
        handler = original_1._wrapper = function (e) {
            if (
            // no bubbling, should always fire.
            // this is just a safety net in case event.timeStamp is unreliable in
            // certain weird environments...
            e.target === e.currentTarget ||
                // event is fired after handler attachment
                e.timeStamp >= attachedTimestamp_1 ||
                // bail for environments that have buggy event.timeStamp implementations
                // #9462 iOS 9 bug: event.timeStamp is 0 after history.pushState
                // #9681 QtWebEngine event.timeStamp is negative value
                e.timeStamp <= 0 ||
                // #9448 bail if event is fired in another document in a multi-page
                // electron/nw.js app, since event.timeStamp will be using a different
                // starting reference
                e.target.ownerDocument !== document) {
                return original_1.apply(this, arguments);
            }
        };
    }
    target.addEventListener(name, handler, supportsPassive ? { capture: capture, passive: passive } : capture);
}
function remove(name, handler, capture, _target) {
    (_target || target).removeEventListener(name, 
    //@ts-expect-error
    handler._wrapper || handler, capture);
}
function updateDOMListeners(oldVnode, vnode) {
    if (isUndef(oldVnode.data.on) && isUndef(vnode.data.on)) {
        return;
    }
    var on = vnode.data.on || {};
    var oldOn = oldVnode.data.on || {};
    // vnode is empty when removing all listeners,
    // and use old vnode dom element
    target = vnode.elm || oldVnode.elm;
    normalizeEvents(on);
    updateListeners(on, oldOn, add, remove, createOnceHandler, vnode.context);
    target = undefined;
}
var events = {
    create: updateDOMListeners,
    update: updateDOMListeners,
    // @ts-expect-error emptyNode has actually data
    destroy: function (vnode) { return updateDOMListeners(vnode, emptyNode); }
};

var svgContainer;
function updateDOMProps(oldVnode, vnode) {
    if (isUndef(oldVnode.data.domProps) && isUndef(vnode.data.domProps)) {
        return;
    }
    var key, cur;
    var elm = vnode.elm;
    var oldProps = oldVnode.data.domProps || {};
    var props = vnode.data.domProps || {};
    // clone observed objects, as the user probably wants to mutate it
    if (isDef(props.__ob__) || isTrue(props._v_attr_proxy)) {
        props = vnode.data.domProps = extend({}, props);
    }
    for (key in oldProps) {
        if (!(key in props)) {
            elm[key] = '';
        }
    }
    for (key in props) {
        cur = props[key];
        // ignore children if the node has textContent or innerHTML,
        // as these will throw away existing DOM nodes and cause removal errors
        // on subsequent patches (#3360)
        if (key === 'textContent' || key === 'innerHTML') {
            if (vnode.children)
                vnode.children.length = 0;
            if (cur === oldProps[key])
                continue;
            // #6601 work around Chrome version <= 55 bug where single textNode
            // replaced by innerHTML/textContent retains its parentNode property
            if (elm.childNodes.length === 1) {
                elm.removeChild(elm.childNodes[0]);
            }
        }
        if (key === 'value' && elm.tagName !== 'PROGRESS') {
            // store value as _value as well since
            // non-string values will be stringified
            elm._value = cur;
            // avoid resetting cursor position when value is the same
            var strCur = isUndef(cur) ? '' : String(cur);
            if (shouldUpdateValue(elm, strCur)) {
                elm.value = strCur;
            }
        }
        else if (key === 'innerHTML' &&
            isSVG(elm.tagName) &&
            isUndef(elm.innerHTML)) {
            // IE doesn't support innerHTML for SVG elements
            svgContainer = svgContainer || document.createElement('div');
            svgContainer.innerHTML = "<svg>".concat(cur, "</svg>");
            var svg = svgContainer.firstChild;
            while (elm.firstChild) {
                elm.removeChild(elm.firstChild);
            }
            while (svg.firstChild) {
                elm.appendChild(svg.firstChild);
            }
        }
        else if (
        // skip the update if old and new VDOM state is the same.
        // `value` is handled separately because the DOM value may be temporarily
        // out of sync with VDOM state due to focus, composition and modifiers.
        // This  #4521 by skipping the unnecessary `checked` update.
        cur !== oldProps[key]) {
            // some property updates can throw
            // e.g. `value` on <progress> w/ non-finite value
            try {
                elm[key] = cur;
            }
            catch (e) { }
        }
    }
}
function shouldUpdateValue(elm, checkVal) {
    return (
    //@ts-expect-error
    !elm.composing &&
        (elm.tagName === 'OPTION' ||
            isNotInFocusAndDirty(elm, checkVal) ||
            isDirtyWithModifiers(elm, checkVal)));
}
function isNotInFocusAndDirty(elm, checkVal) {
    // return true when textbox (.number and .trim) loses focus and its value is
    // not equal to the updated value
    var notInFocus = true;
    // #6157
    // work around IE bug when accessing document.activeElement in an iframe
    try {
        notInFocus = document.activeElement !== elm;
    }
    catch (e) { }
    return notInFocus && elm.value !== checkVal;
}
function isDirtyWithModifiers(elm, newVal) {
    var value = elm.value;
    var modifiers = elm._vModifiers; // injected by v-model runtime
    if (isDef(modifiers)) {
        if (modifiers.number) {
            return toNumber(value) !== toNumber(newVal);
        }
        if (modifiers.trim) {
            return value.trim() !== newVal.trim();
        }
    }
    return value !== newVal;
}
var domProps = {
    create: updateDOMProps,
    update: updateDOMProps
};

var parseStyleText = cached(function (cssText) {
    var res = {};
    var listDelimiter = /;(?![^(]*\))/g;
    var propertyDelimiter = /:(.+)/;
    cssText.split(listDelimiter).forEach(function (item) {
        if (item) {
            var tmp = item.split(propertyDelimiter);
            tmp.length > 1 && (res[tmp[0].trim()] = tmp[1].trim());
        }
    });
    return res;
});
// merge static and dynamic style data on the same vnode
function normalizeStyleData(data) {
    var style = normalizeStyleBinding(data.style);
    // static style is pre-processed into an object during compilation
    // and is always a fresh object, so it's safe to merge into it
    return data.staticStyle ? extend(data.staticStyle, style) : style;
}
// normalize possible array / string values into Object
function normalizeStyleBinding(bindingStyle) {
    if (Array.isArray(bindingStyle)) {
        return toObject(bindingStyle);
    }
    if (typeof bindingStyle === 'string') {
        return parseStyleText(bindingStyle);
    }
    return bindingStyle;
}
/**
 * parent component style should be after child's
 * so that parent component's style could override it
 */
function getStyle(vnode, checkChild) {
    var res = {};
    var styleData;
    if (checkChild) {
        var childNode = vnode;
        while (childNode.componentInstance) {
            childNode = childNode.componentInstance._vnode;
            if (childNode &&
                childNode.data &&
                (styleData = normalizeStyleData(childNode.data))) {
                extend(res, styleData);
            }
        }
    }
    if ((styleData = normalizeStyleData(vnode.data))) {
        extend(res, styleData);
    }
    var parentNode = vnode;
    // @ts-expect-error parentNode.parent not VNodeWithData
    while ((parentNode = parentNode.parent)) {
        if (parentNode.data && (styleData = normalizeStyleData(parentNode.data))) {
            extend(res, styleData);
        }
    }
    return res;
}

var cssVarRE = /^--/;
var importantRE = /\s*!important$/;
var setProp = function (el, name, val) {
    /* istanbul ignore if */
    if (cssVarRE.test(name)) {
        el.style.setProperty(name, val);
    }
    else if (importantRE.test(val)) {
        el.style.setProperty(hyphenate(name), val.replace(importantRE, ''), 'important');
    }
    else {
        var normalizedName = normalize(name);
        if (Array.isArray(val)) {
            // Support values array created by autoprefixer, e.g.
            // {display: ["-webkit-box", "-ms-flexbox", "flex"]}
            // Set them one by one, and the browser will only set those it can recognize
            for (var i = 0, len = val.length; i < len; i++) {
                el.style[normalizedName] = val[i];
            }
        }
        else {
            el.style[normalizedName] = val;
        }
    }
};
var vendorNames = ['Webkit', 'Moz', 'ms'];
var emptyStyle;
var normalize = cached(function (prop) {
    emptyStyle = emptyStyle || document.createElement('div').style;
    prop = camelize(prop);
    if (prop !== 'filter' && prop in emptyStyle) {
        return prop;
    }
    var capName = prop.charAt(0).toUpperCase() + prop.slice(1);
    for (var i = 0; i < vendorNames.length; i++) {
        var name_1 = vendorNames[i] + capName;
        if (name_1 in emptyStyle) {
            return name_1;
        }
    }
});
function updateStyle(oldVnode, vnode) {
    var data = vnode.data;
    var oldData = oldVnode.data;
    if (isUndef(data.staticStyle) &&
        isUndef(data.style) &&
        isUndef(oldData.staticStyle) &&
        isUndef(oldData.style)) {
        return;
    }
    var cur, name;
    var el = vnode.elm;
    var oldStaticStyle = oldData.staticStyle;
    var oldStyleBinding = oldData.normalizedStyle || oldData.style || {};
    // if static style exists, stylebinding already merged into it when doing normalizeStyleData
    var oldStyle = oldStaticStyle || oldStyleBinding;
    var style = normalizeStyleBinding(vnode.data.style) || {};
    // store normalized style under a different key for next diff
    // make sure to clone it if it's reactive, since the user likely wants
    // to mutate it.
    vnode.data.normalizedStyle = isDef(style.__ob__) ? extend({}, style) : style;
    var newStyle = getStyle(vnode, true);
    for (name in oldStyle) {
        if (isUndef(newStyle[name])) {
            setProp(el, name, '');
        }
    }
    for (name in newStyle) {
        cur = newStyle[name];
        if (cur !== oldStyle[name]) {
            // ie9 setting to null has no effect, must use empty string
            setProp(el, name, cur == null ? '' : cur);
        }
    }
}
var style = {
    create: updateStyle,
    update: updateStyle
};

var whitespaceRE = /\s+/;
/**
 * Add class with compatibility for SVG since classList is not supported on
 * SVG elements in IE
 */
function addClass(el, cls) {
    /* istanbul ignore if */
    if (!cls || !(cls = cls.trim())) {
        return;
    }
    /* istanbul ignore else */
    if (el.classList) {
        if (cls.indexOf(' ') > -1) {
            cls.split(whitespaceRE).forEach(function (c) { return el.classList.add(c); });
        }
        else {
            el.classList.add(cls);
        }
    }
    else {
        var cur = " ".concat(el.getAttribute('class') || '', " ");
        if (cur.indexOf(' ' + cls + ' ') < 0) {
            el.setAttribute('class', (cur + cls).trim());
        }
    }
}
/**
 * Remove class with compatibility for SVG since classList is not supported on
 * SVG elements in IE
 */
function removeClass(el, cls) {
    /* istanbul ignore if */
    if (!cls || !(cls = cls.trim())) {
        return;
    }
    /* istanbul ignore else */
    if (el.classList) {
        if (cls.indexOf(' ') > -1) {
            cls.split(whitespaceRE).forEach(function (c) { return el.classList.remove(c); });
        }
        else {
            el.classList.remove(cls);
        }
        if (!el.classList.length) {
            el.removeAttribute('class');
        }
    }
    else {
        var cur = " ".concat(el.getAttribute('class') || '', " ");
        var tar = ' ' + cls + ' ';
        while (cur.indexOf(tar) >= 0) {
            cur = cur.replace(tar, ' ');
        }
        cur = cur.trim();
        if (cur) {
            el.setAttribute('class', cur);
        }
        else {
            el.removeAttribute('class');
        }
    }
}

function resolveTransition(def) {
    if (!def) {
        return;
    }
    /* istanbul ignore else */
    if (typeof def === 'object') {
        var res = {};
        if (def.css !== false) {
            extend(res, autoCssTransition(def.name || 'v'));
        }
        extend(res, def);
        return res;
    }
    else if (typeof def === 'string') {
        return autoCssTransition(def);
    }
}
var autoCssTransition = cached(function (name) {
    return {
        enterClass: "".concat(name, "-enter"),
        enterToClass: "".concat(name, "-enter-to"),
        enterActiveClass: "".concat(name, "-enter-active"),
        leaveClass: "".concat(name, "-leave"),
        leaveToClass: "".concat(name, "-leave-to"),
        leaveActiveClass: "".concat(name, "-leave-active")
    };
});
var hasTransition = inBrowser && !isIE9;
var TRANSITION = 'transition';
var ANIMATION = 'animation';
// Transition property/event sniffing
var transitionProp = 'transition';
var transitionEndEvent = 'transitionend';
var animationProp = 'animation';
var animationEndEvent = 'animationend';
if (hasTransition) {
    /* istanbul ignore if */
    if (window.ontransitionend === undefined &&
        window.onwebkittransitionend !== undefined) {
        transitionProp = 'WebkitTransition';
        transitionEndEvent = 'webkitTransitionEnd';
    }
    if (window.onanimationend === undefined &&
        window.onwebkitanimationend !== undefined) {
        animationProp = 'WebkitAnimation';
        animationEndEvent = 'webkitAnimationEnd';
    }
}
// binding to window is necessary to make hot reload work in IE in strict mode
var raf = inBrowser
    ? window.requestAnimationFrame
        ? window.requestAnimationFrame.bind(window)
        : setTimeout
    : /* istanbul ignore next */ function (/* istanbul ignore next */ fn) { return fn(); };
function nextFrame(fn) {
    raf(function () {
        // @ts-expect-error
        raf(fn);
    });
}
function addTransitionClass(el, cls) {
    var transitionClasses = el._transitionClasses || (el._transitionClasses = []);
    if (transitionClasses.indexOf(cls) < 0) {
        transitionClasses.push(cls);
        addClass(el, cls);
    }
}
function removeTransitionClass(el, cls) {
    if (el._transitionClasses) {
        remove$2(el._transitionClasses, cls);
    }
    removeClass(el, cls);
}
function whenTransitionEnds(el, expectedType, cb) {
    var _a = getTransitionInfo(el, expectedType), type = _a.type, timeout = _a.timeout, propCount = _a.propCount;
    if (!type)
        return cb();
    var event = type === TRANSITION ? transitionEndEvent : animationEndEvent;
    var ended = 0;
    var end = function () {
        el.removeEventListener(event, onEnd);
        cb();
    };
    var onEnd = function (e) {
        if (e.target === el) {
            if (++ended >= propCount) {
                end();
            }
        }
    };
    setTimeout(function () {
        if (ended < propCount) {
            end();
        }
    }, timeout + 1);
    el.addEventListener(event, onEnd);
}
var transformRE = /\b(transform|all)(,|$)/;
function getTransitionInfo(el, expectedType) {
    var styles = window.getComputedStyle(el);
    // JSDOM may return undefined for transition properties
    var transitionDelays = (styles[transitionProp + 'Delay'] || '').split(', ');
    var transitionDurations = (styles[transitionProp + 'Duration'] || '').split(', ');
    var transitionTimeout = getTimeout(transitionDelays, transitionDurations);
    var animationDelays = (styles[animationProp + 'Delay'] || '').split(', ');
    var animationDurations = (styles[animationProp + 'Duration'] || '').split(', ');
    var animationTimeout = getTimeout(animationDelays, animationDurations);
    var type;
    var timeout = 0;
    var propCount = 0;
    /* istanbul ignore if */
    if (expectedType === TRANSITION) {
        if (transitionTimeout > 0) {
            type = TRANSITION;
            timeout = transitionTimeout;
            propCount = transitionDurations.length;
        }
    }
    else if (expectedType === ANIMATION) {
        if (animationTimeout > 0) {
            type = ANIMATION;
            timeout = animationTimeout;
            propCount = animationDurations.length;
        }
    }
    else {
        timeout = Math.max(transitionTimeout, animationTimeout);
        type =
            timeout > 0
                ? transitionTimeout > animationTimeout
                    ? TRANSITION
                    : ANIMATION
                : null;
        propCount = type
            ? type === TRANSITION
                ? transitionDurations.length
                : animationDurations.length
            : 0;
    }
    var hasTransform = type === TRANSITION && transformRE.test(styles[transitionProp + 'Property']);
    return {
        type: type,
        timeout: timeout,
        propCount: propCount,
        hasTransform: hasTransform
    };
}
function getTimeout(delays, durations) {
    /* istanbul ignore next */
    while (delays.length < durations.length) {
        delays = delays.concat(delays);
    }
    return Math.max.apply(null, durations.map(function (d, i) {
        return toMs(d) + toMs(delays[i]);
    }));
}
// Old versions of Chromium (below 61.0.3163.100) formats floating pointer numbers
// in a locale-dependent way, using a comma instead of a dot.
// If comma is not replaced with a dot, the input will be rounded down (i.e. acting
// as a floor function) causing unexpected behaviors
function toMs(s) {
    return Number(s.slice(0, -1).replace(',', '.')) * 1000;
}

function enter(vnode, toggleDisplay) {
    var el = vnode.elm;
    // call leave callback now
    if (isDef(el._leaveCb)) {
        el._leaveCb.cancelled = true;
        el._leaveCb();
    }
    var data = resolveTransition(vnode.data.transition);
    if (isUndef(data)) {
        return;
    }
    /* istanbul ignore if */
    if (isDef(el._enterCb) || el.nodeType !== 1) {
        return;
    }
    var css = data.css, type = data.type, enterClass = data.enterClass, enterToClass = data.enterToClass, enterActiveClass = data.enterActiveClass, appearClass = data.appearClass, appearToClass = data.appearToClass, appearActiveClass = data.appearActiveClass, beforeEnter = data.beforeEnter, enter = data.enter, afterEnter = data.afterEnter, enterCancelled = data.enterCancelled, beforeAppear = data.beforeAppear, appear = data.appear, afterAppear = data.afterAppear, appearCancelled = data.appearCancelled, duration = data.duration;
    // activeInstance will always be the <transition> component managing this
    // transition. One edge case to check is when the <transition> is placed
    // as the root node of a child component. In that case we need to check
    // <transition>'s parent for appear check.
    var context = activeInstance;
    var transitionNode = activeInstance.$vnode;
    while (transitionNode && transitionNode.parent) {
        context = transitionNode.context;
        transitionNode = transitionNode.parent;
    }
    var isAppear = !context._isMounted || !vnode.isRootInsert;
    if (isAppear && !appear && appear !== '') {
        return;
    }
    var startClass = isAppear && appearClass ? appearClass : enterClass;
    var activeClass = isAppear && appearActiveClass ? appearActiveClass : enterActiveClass;
    var toClass = isAppear && appearToClass ? appearToClass : enterToClass;
    var beforeEnterHook = isAppear ? beforeAppear || beforeEnter : beforeEnter;
    var enterHook = isAppear ? (isFunction(appear) ? appear : enter) : enter;
    var afterEnterHook = isAppear ? afterAppear || afterEnter : afterEnter;
    var enterCancelledHook = isAppear
        ? appearCancelled || enterCancelled
        : enterCancelled;
    var explicitEnterDuration = toNumber(isObject(duration) ? duration.enter : duration);
    if (false) {}
    var expectsCSS = css !== false && !isIE9;
    var userWantsControl = getHookArgumentsLength(enterHook);
    var cb = (el._enterCb = once(function () {
        if (expectsCSS) {
            removeTransitionClass(el, toClass);
            removeTransitionClass(el, activeClass);
        }
        // @ts-expect-error
        if (cb.cancelled) {
            if (expectsCSS) {
                removeTransitionClass(el, startClass);
            }
            enterCancelledHook && enterCancelledHook(el);
        }
        else {
            afterEnterHook && afterEnterHook(el);
        }
        el._enterCb = null;
    }));
    if (!vnode.data.show) {
        // remove pending leave element on enter by injecting an insert hook
        mergeVNodeHook(vnode, 'insert', function () {
            var parent = el.parentNode;
            var pendingNode = parent && parent._pending && parent._pending[vnode.key];
            if (pendingNode &&
                pendingNode.tag === vnode.tag &&
                pendingNode.elm._leaveCb) {
                pendingNode.elm._leaveCb();
            }
            enterHook && enterHook(el, cb);
        });
    }
    // start enter transition
    beforeEnterHook && beforeEnterHook(el);
    if (expectsCSS) {
        addTransitionClass(el, startClass);
        addTransitionClass(el, activeClass);
        nextFrame(function () {
            removeTransitionClass(el, startClass);
            // @ts-expect-error
            if (!cb.cancelled) {
                addTransitionClass(el, toClass);
                if (!userWantsControl) {
                    if (isValidDuration(explicitEnterDuration)) {
                        setTimeout(cb, explicitEnterDuration);
                    }
                    else {
                        whenTransitionEnds(el, type, cb);
                    }
                }
            }
        });
    }
    if (vnode.data.show) {
        toggleDisplay && toggleDisplay();
        enterHook && enterHook(el, cb);
    }
    if (!expectsCSS && !userWantsControl) {
        cb();
    }
}
function leave(vnode, rm) {
    var el = vnode.elm;
    // call enter callback now
    if (isDef(el._enterCb)) {
        el._enterCb.cancelled = true;
        el._enterCb();
    }
    var data = resolveTransition(vnode.data.transition);
    if (isUndef(data) || el.nodeType !== 1) {
        return rm();
    }
    /* istanbul ignore if */
    if (isDef(el._leaveCb)) {
        return;
    }
    var css = data.css, type = data.type, leaveClass = data.leaveClass, leaveToClass = data.leaveToClass, leaveActiveClass = data.leaveActiveClass, beforeLeave = data.beforeLeave, leave = data.leave, afterLeave = data.afterLeave, leaveCancelled = data.leaveCancelled, delayLeave = data.delayLeave, duration = data.duration;
    var expectsCSS = css !== false && !isIE9;
    var userWantsControl = getHookArgumentsLength(leave);
    var explicitLeaveDuration = toNumber(isObject(duration) ? duration.leave : duration);
    if (false) {}
    var cb = (el._leaveCb = once(function () {
        if (el.parentNode && el.parentNode._pending) {
            el.parentNode._pending[vnode.key] = null;
        }
        if (expectsCSS) {
            removeTransitionClass(el, leaveToClass);
            removeTransitionClass(el, leaveActiveClass);
        }
        // @ts-expect-error
        if (cb.cancelled) {
            if (expectsCSS) {
                removeTransitionClass(el, leaveClass);
            }
            leaveCancelled && leaveCancelled(el);
        }
        else {
            rm();
            afterLeave && afterLeave(el);
        }
        el._leaveCb = null;
    }));
    if (delayLeave) {
        delayLeave(performLeave);
    }
    else {
        performLeave();
    }
    function performLeave() {
        // the delayed leave may have already been cancelled
        // @ts-expect-error
        if (cb.cancelled) {
            return;
        }
        // record leaving element
        if (!vnode.data.show && el.parentNode) {
            (el.parentNode._pending || (el.parentNode._pending = {}))[vnode.key] =
                vnode;
        }
        beforeLeave && beforeLeave(el);
        if (expectsCSS) {
            addTransitionClass(el, leaveClass);
            addTransitionClass(el, leaveActiveClass);
            nextFrame(function () {
                removeTransitionClass(el, leaveClass);
                // @ts-expect-error
                if (!cb.cancelled) {
                    addTransitionClass(el, leaveToClass);
                    if (!userWantsControl) {
                        if (isValidDuration(explicitLeaveDuration)) {
                            setTimeout(cb, explicitLeaveDuration);
                        }
                        else {
                            whenTransitionEnds(el, type, cb);
                        }
                    }
                }
            });
        }
        leave && leave(el, cb);
        if (!expectsCSS && !userWantsControl) {
            cb();
        }
    }
}
// only used in dev mode
function checkDuration(val, name, vnode) {
    if (typeof val !== 'number') {
        warn("<transition> explicit ".concat(name, " duration is not a valid number - ") +
            "got ".concat(JSON.stringify(val), "."), vnode.context);
    }
    else if (isNaN(val)) {
        warn("<transition> explicit ".concat(name, " duration is NaN - ") +
            'the duration expression might be incorrect.', vnode.context);
    }
}
function isValidDuration(val) {
    return typeof val === 'number' && !isNaN(val);
}
/**
 * Normalize a transition hook's argument length. The hook may be:
 * - a merged hook (invoker) with the original in .fns
 * - a wrapped component method (check ._length)
 * - a plain function (.length)
 */
function getHookArgumentsLength(fn) {
    if (isUndef(fn)) {
        return false;
    }
    // @ts-expect-error
    var invokerFns = fn.fns;
    if (isDef(invokerFns)) {
        // invoker
        return getHookArgumentsLength(Array.isArray(invokerFns) ? invokerFns[0] : invokerFns);
    }
    else {
        // @ts-expect-error
        return (fn._length || fn.length) > 1;
    }
}
function _enter(_, vnode) {
    if (vnode.data.show !== true) {
        enter(vnode);
    }
}
var transition = inBrowser
    ? {
        create: _enter,
        activate: _enter,
        remove: function (vnode, rm) {
            /* istanbul ignore else */
            if (vnode.data.show !== true) {
                // @ts-expect-error
                leave(vnode, rm);
            }
            else {
                rm();
            }
        }
    }
    : {};

var platformModules = [attrs, klass, events, domProps, style, transition];

// the directive module should be applied last, after all
// built-in modules have been applied.
var modules = platformModules.concat(baseModules);
var patch = createPatchFunction({ nodeOps: nodeOps, modules: modules });

/**
 * Not type checking this file because flow doesn't like attaching
 * properties to Elements.
 */
/* istanbul ignore if */
if (isIE9) {
    // http://www.matts411.com/post/internet-explorer-9-oninput/
    document.addEventListener('selectionchange', function () {
        var el = document.activeElement;
        // @ts-expect-error
        if (el && el.vmodel) {
            trigger(el, 'input');
        }
    });
}
var directive = {
    inserted: function (el, binding, vnode, oldVnode) {
        if (vnode.tag === 'select') {
            // #6903
            if (oldVnode.elm && !oldVnode.elm._vOptions) {
                mergeVNodeHook(vnode, 'postpatch', function () {
                    directive.componentUpdated(el, binding, vnode);
                });
            }
            else {
                setSelected(el, binding, vnode.context);
            }
            el._vOptions = [].map.call(el.options, getValue);
        }
        else if (vnode.tag === 'textarea' || isTextInputType(el.type)) {
            el._vModifiers = binding.modifiers;
            if (!binding.modifiers.lazy) {
                el.addEventListener('compositionstart', onCompositionStart);
                el.addEventListener('compositionend', onCompositionEnd);
                // Safari < 10.2 & UIWebView doesn't fire compositionend when
                // switching focus before confirming composition choice
                // this also fixes the issue where some browsers e.g. iOS Chrome
                // fires "change" instead of "input" on autocomplete.
                el.addEventListener('change', onCompositionEnd);
                /* istanbul ignore if */
                if (isIE9) {
                    el.vmodel = true;
                }
            }
        }
    },
    componentUpdated: function (el, binding, vnode) {
        if (vnode.tag === 'select') {
            setSelected(el, binding, vnode.context);
            // in case the options rendered by v-for have changed,
            // it's possible that the value is out-of-sync with the rendered options.
            // detect such cases and filter out values that no longer has a matching
            // option in the DOM.
            var prevOptions_1 = el._vOptions;
            var curOptions_1 = (el._vOptions = [].map.call(el.options, getValue));
            if (curOptions_1.some(function (o, i) { return !looseEqual(o, prevOptions_1[i]); })) {
                // trigger change event if
                // no matching option found for at least one value
                var needReset = el.multiple
                    ? binding.value.some(function (v) { return hasNoMatchingOption(v, curOptions_1); })
                    : binding.value !== binding.oldValue &&
                        hasNoMatchingOption(binding.value, curOptions_1);
                if (needReset) {
                    trigger(el, 'change');
                }
            }
        }
    }
};
function setSelected(el, binding, vm) {
    actuallySetSelected(el, binding, vm);
    /* istanbul ignore if */
    if (isIE || isEdge) {
        setTimeout(function () {
            actuallySetSelected(el, binding, vm);
        }, 0);
    }
}
function actuallySetSelected(el, binding, vm) {
    var value = binding.value;
    var isMultiple = el.multiple;
    if (isMultiple && !Array.isArray(value)) {
         false &&
            0;
        return;
    }
    var selected, option;
    for (var i = 0, l = el.options.length; i < l; i++) {
        option = el.options[i];
        if (isMultiple) {
            selected = looseIndexOf(value, getValue(option)) > -1;
            if (option.selected !== selected) {
                option.selected = selected;
            }
        }
        else {
            if (looseEqual(getValue(option), value)) {
                if (el.selectedIndex !== i) {
                    el.selectedIndex = i;
                }
                return;
            }
        }
    }
    if (!isMultiple) {
        el.selectedIndex = -1;
    }
}
function hasNoMatchingOption(value, options) {
    return options.every(function (o) { return !looseEqual(o, value); });
}
function getValue(option) {
    return '_value' in option ? option._value : option.value;
}
function onCompositionStart(e) {
    e.target.composing = true;
}
function onCompositionEnd(e) {
    // prevent triggering an input event for no reason
    if (!e.target.composing)
        return;
    e.target.composing = false;
    trigger(e.target, 'input');
}
function trigger(el, type) {
    var e = document.createEvent('HTMLEvents');
    e.initEvent(type, true, true);
    el.dispatchEvent(e);
}

// recursively search for possible transition defined inside the component root
function locateNode(vnode) {
    // @ts-expect-error
    return vnode.componentInstance && (!vnode.data || !vnode.data.transition)
        ? locateNode(vnode.componentInstance._vnode)
        : vnode;
}
var show = {
    bind: function (el, _a, vnode) {
        var value = _a.value;
        vnode = locateNode(vnode);
        var transition = vnode.data && vnode.data.transition;
        var originalDisplay = (el.__vOriginalDisplay =
            el.style.display === 'none' ? '' : el.style.display);
        if (value && transition) {
            vnode.data.show = true;
            enter(vnode, function () {
                el.style.display = originalDisplay;
            });
        }
        else {
            el.style.display = value ? originalDisplay : 'none';
        }
    },
    update: function (el, _a, vnode) {
        var value = _a.value, oldValue = _a.oldValue;
        /* istanbul ignore if */
        if (!value === !oldValue)
            return;
        vnode = locateNode(vnode);
        var transition = vnode.data && vnode.data.transition;
        if (transition) {
            vnode.data.show = true;
            if (value) {
                enter(vnode, function () {
                    el.style.display = el.__vOriginalDisplay;
                });
            }
            else {
                leave(vnode, function () {
                    el.style.display = 'none';
                });
            }
        }
        else {
            el.style.display = value ? el.__vOriginalDisplay : 'none';
        }
    },
    unbind: function (el, binding, vnode, oldVnode, isDestroy) {
        if (!isDestroy) {
            el.style.display = el.__vOriginalDisplay;
        }
    }
};

var platformDirectives = {
    model: directive,
    show: show
};

// Provides transition support for a single element/component.
var transitionProps = {
    name: String,
    appear: Boolean,
    css: Boolean,
    mode: String,
    type: String,
    enterClass: String,
    leaveClass: String,
    enterToClass: String,
    leaveToClass: String,
    enterActiveClass: String,
    leaveActiveClass: String,
    appearClass: String,
    appearActiveClass: String,
    appearToClass: String,
    duration: [Number, String, Object]
};
// in case the child is also an abstract component, e.g. <keep-alive>
// we want to recursively retrieve the real component to be rendered
function getRealChild(vnode) {
    var compOptions = vnode && vnode.componentOptions;
    if (compOptions && compOptions.Ctor.options.abstract) {
        return getRealChild(getFirstComponentChild(compOptions.children));
    }
    else {
        return vnode;
    }
}
function extractTransitionData(comp) {
    var data = {};
    var options = comp.$options;
    // props
    for (var key in options.propsData) {
        data[key] = comp[key];
    }
    // events.
    // extract listeners and pass them directly to the transition methods
    var listeners = options._parentListeners;
    for (var key in listeners) {
        data[camelize(key)] = listeners[key];
    }
    return data;
}
function placeholder(h, rawChild) {
    // @ts-expect-error
    if (/\d-keep-alive$/.test(rawChild.tag)) {
        return h('keep-alive', {
            props: rawChild.componentOptions.propsData
        });
    }
}
function hasParentTransition(vnode) {
    while ((vnode = vnode.parent)) {
        if (vnode.data.transition) {
            return true;
        }
    }
}
function isSameChild(child, oldChild) {
    return oldChild.key === child.key && oldChild.tag === child.tag;
}
var isNotTextNode = function (c) { return c.tag || isAsyncPlaceholder(c); };
var isVShowDirective = function (d) { return d.name === 'show'; };
var Transition = {
    name: 'transition',
    props: transitionProps,
    abstract: true,
    render: function (h) {
        var _this = this;
        var children = this.$slots.default;
        if (!children) {
            return;
        }
        // filter out text nodes (possible whitespaces)
        children = children.filter(isNotTextNode);
        /* istanbul ignore if */
        if (!children.length) {
            return;
        }
        // warn multiple elements
        if (false) {}
        var mode = this.mode;
        // warn invalid mode
        if (false) {}
        var rawChild = children[0];
        // if this is a component root node and the component's
        // parent container node also has transition, skip.
        if (hasParentTransition(this.$vnode)) {
            return rawChild;
        }
        // apply transition data to child
        // use getRealChild() to ignore abstract components e.g. keep-alive
        var child = getRealChild(rawChild);
        /* istanbul ignore if */
        if (!child) {
            return rawChild;
        }
        if (this._leaving) {
            return placeholder(h, rawChild);
        }
        // ensure a key that is unique to the vnode type and to this transition
        // component instance. This key will be used to remove pending leaving nodes
        // during entering.
        var id = "__transition-".concat(this._uid, "-");
        child.key =
            child.key == null
                ? child.isComment
                    ? id + 'comment'
                    : id + child.tag
                : isPrimitive(child.key)
                    ? String(child.key).indexOf(id) === 0
                        ? child.key
                        : id + child.key
                    : child.key;
        var data = ((child.data || (child.data = {})).transition =
            extractTransitionData(this));
        var oldRawChild = this._vnode;
        var oldChild = getRealChild(oldRawChild);
        // mark v-show
        // so that the transition module can hand over the control to the directive
        if (child.data.directives && child.data.directives.some(isVShowDirective)) {
            child.data.show = true;
        }
        if (oldChild &&
            oldChild.data &&
            !isSameChild(child, oldChild) &&
            !isAsyncPlaceholder(oldChild) &&
            // #6687 component root is a comment node
            !(oldChild.componentInstance &&
                oldChild.componentInstance._vnode.isComment)) {
            // replace old child transition data with fresh one
            // important for dynamic transitions!
            var oldData = (oldChild.data.transition = extend({}, data));
            // handle transition mode
            if (mode === 'out-in') {
                // return placeholder node and queue update when leave finishes
                this._leaving = true;
                mergeVNodeHook(oldData, 'afterLeave', function () {
                    _this._leaving = false;
                    _this.$forceUpdate();
                });
                return placeholder(h, rawChild);
            }
            else if (mode === 'in-out') {
                if (isAsyncPlaceholder(child)) {
                    return oldRawChild;
                }
                var delayedLeave_1;
                var performLeave = function () {
                    delayedLeave_1();
                };
                mergeVNodeHook(data, 'afterEnter', performLeave);
                mergeVNodeHook(data, 'enterCancelled', performLeave);
                mergeVNodeHook(oldData, 'delayLeave', function (leave) {
                    delayedLeave_1 = leave;
                });
            }
        }
        return rawChild;
    }
};

// Provides transition support for list items.
var props = extend({
    tag: String,
    moveClass: String
}, transitionProps);
delete props.mode;
var TransitionGroup = {
    props: props,
    beforeMount: function () {
        var _this = this;
        var update = this._update;
        this._update = function (vnode, hydrating) {
            var restoreActiveInstance = setActiveInstance(_this);
            // force removing pass
            _this.__patch__(_this._vnode, _this.kept, false, // hydrating
            true // removeOnly (!important, avoids unnecessary moves)
            );
            _this._vnode = _this.kept;
            restoreActiveInstance();
            update.call(_this, vnode, hydrating);
        };
    },
    render: function (h) {
        var tag = this.tag || this.$vnode.data.tag || 'span';
        var map = Object.create(null);
        var prevChildren = (this.prevChildren = this.children);
        var rawChildren = this.$slots.default || [];
        var children = (this.children = []);
        var transitionData = extractTransitionData(this);
        for (var i = 0; i < rawChildren.length; i++) {
            var c = rawChildren[i];
            if (c.tag) {
                if (c.key != null && String(c.key).indexOf('__vlist') !== 0) {
                    children.push(c);
                    map[c.key] = c;
                    (c.data || (c.data = {})).transition = transitionData;
                }
                else if (false) { var name_1, opts; }
            }
        }
        if (prevChildren) {
            var kept = [];
            var removed = [];
            for (var i = 0; i < prevChildren.length; i++) {
                var c = prevChildren[i];
                c.data.transition = transitionData;
                // @ts-expect-error .getBoundingClientRect is not typed in Node
                c.data.pos = c.elm.getBoundingClientRect();
                if (map[c.key]) {
                    kept.push(c);
                }
                else {
                    removed.push(c);
                }
            }
            this.kept = h(tag, null, kept);
            this.removed = removed;
        }
        return h(tag, null, children);
    },
    updated: function () {
        var children = this.prevChildren;
        var moveClass = this.moveClass || (this.name || 'v') + '-move';
        if (!children.length || !this.hasMove(children[0].elm, moveClass)) {
            return;
        }
        // we divide the work into three loops to avoid mixing DOM reads and writes
        // in each iteration - which helps prevent layout thrashing.
        children.forEach(callPendingCbs);
        children.forEach(recordPosition);
        children.forEach(applyTranslation);
        // force reflow to put everything in position
        // assign to this to avoid being removed in tree-shaking
        // $flow-disable-line
        this._reflow = document.body.offsetHeight;
        children.forEach(function (c) {
            if (c.data.moved) {
                var el_1 = c.elm;
                var s = el_1.style;
                addTransitionClass(el_1, moveClass);
                s.transform = s.WebkitTransform = s.transitionDuration = '';
                el_1.addEventListener(transitionEndEvent, (el_1._moveCb = function cb(e) {
                    if (e && e.target !== el_1) {
                        return;
                    }
                    if (!e || /transform$/.test(e.propertyName)) {
                        el_1.removeEventListener(transitionEndEvent, cb);
                        el_1._moveCb = null;
                        removeTransitionClass(el_1, moveClass);
                    }
                }));
            }
        });
    },
    methods: {
        hasMove: function (el, moveClass) {
            /* istanbul ignore if */
            if (!hasTransition) {
                return false;
            }
            /* istanbul ignore if */
            if (this._hasMove) {
                return this._hasMove;
            }
            // Detect whether an element with the move class applied has
            // CSS transitions. Since the element may be inside an entering
            // transition at this very moment, we make a clone of it and remove
            // all other transition classes applied to ensure only the move class
            // is applied.
            var clone = el.cloneNode();
            if (el._transitionClasses) {
                el._transitionClasses.forEach(function (cls) {
                    removeClass(clone, cls);
                });
            }
            addClass(clone, moveClass);
            clone.style.display = 'none';
            this.$el.appendChild(clone);
            var info = getTransitionInfo(clone);
            this.$el.removeChild(clone);
            return (this._hasMove = info.hasTransform);
        }
    }
};
function callPendingCbs(c) {
    /* istanbul ignore if */
    if (c.elm._moveCb) {
        c.elm._moveCb();
    }
    /* istanbul ignore if */
    if (c.elm._enterCb) {
        c.elm._enterCb();
    }
}
function recordPosition(c) {
    c.data.newPos = c.elm.getBoundingClientRect();
}
function applyTranslation(c) {
    var oldPos = c.data.pos;
    var newPos = c.data.newPos;
    var dx = oldPos.left - newPos.left;
    var dy = oldPos.top - newPos.top;
    if (dx || dy) {
        c.data.moved = true;
        var s = c.elm.style;
        s.transform = s.WebkitTransform = "translate(".concat(dx, "px,").concat(dy, "px)");
        s.transitionDuration = '0s';
    }
}

var platformComponents = {
    Transition: Transition,
    TransitionGroup: TransitionGroup
};

// install platform specific utils
Vue.config.mustUseProp = mustUseProp;
Vue.config.isReservedTag = isReservedTag;
Vue.config.isReservedAttr = isReservedAttr;
Vue.config.getTagNamespace = getTagNamespace;
Vue.config.isUnknownElement = isUnknownElement;
// install platform runtime directives & components
extend(Vue.options.directives, platformDirectives);
extend(Vue.options.components, platformComponents);
// install platform patch function
Vue.prototype.__patch__ = inBrowser ? patch : noop;
// public mount method
Vue.prototype.$mount = function (el, hydrating) {
    el = el && inBrowser ? query(el) : undefined;
    return mountComponent(this, el, hydrating);
};
// devtools global hook
/* istanbul ignore next */
if (inBrowser) {
    setTimeout(function () {
        if (config.devtools) {
            if (devtools) {
                devtools.emit('init', Vue);
            }
            else if (false) {}
        }
        if (false) {}
    }, 0);
}




/***/ })

}]);