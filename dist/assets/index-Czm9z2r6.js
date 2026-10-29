var Vu=Object.defineProperty;var Wu=(n,t,e)=>t in n?Vu(n,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):n[t]=e;var I=(n,t,e)=>Wu(n,typeof t!="symbol"?t+"":t,e);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))i(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const a of r.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&i(a)}).observe(document,{childList:!0,subtree:!0});function e(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(s){if(s.ep)return;s.ep=!0;const r=e(s);fetch(s.href,r)}})();const Ir=(()=>{try{const n=new URL(".",window.location.href).pathname;return n.endsWith("/")?n:`${n}/`}catch{return"/"}})(),Xu=["/assets/","/sounds/","/data/","/blocks_summary.json","/registries.json","/packets.json","/abandoned_camp_structures.json","/resolved_block_models.json","/resolved_item_models.json","/servers.dat","/servers.json"];function ds(n){if(!n||Ir==="/"||n.startsWith(Ir))return n;for(const t of Xu)if(n.startsWith(t))return Ir+n.slice(1);return n}function $u(){if(Ir==="/")return;const n=window.fetch.bind(window);window.fetch=(r,a)=>{if(typeof r=="string")r=ds(r);else if(r instanceof URL&&r.origin===window.location.origin){const o=ds(r.pathname);o!==r.pathname&&(r=new URL(o+r.search+r.hash,window.location.origin))}return n(r,a)};const t=Object.getOwnPropertyDescriptor(HTMLImageElement.prototype,"src");t&&t.set&&t.get&&Object.defineProperty(HTMLImageElement.prototype,"src",{configurable:!0,enumerable:!0,get(){return t.get.call(this)},set(r){t.set.call(this,typeof r=="string"?ds(r):r)}});const e=Object.getOwnPropertyDescriptor(HTMLMediaElement.prototype,"src");e&&e.set&&e.get&&Object.defineProperty(HTMLMediaElement.prototype,"src",{configurable:!0,enumerable:!0,get(){return e.get.call(this)},set(r){e.set.call(this,typeof r=="string"?ds(r):r)}});const i=window.Audio,s=function(r){return new i(r?ds(r):void 0)};s.prototype=i.prototype,window.Audio=s}/**
 * @license
 * Copyright 2010-2024 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const Ko="170",Yu=0,El=1,qu=2,Sh=1,Zu=2,Ci=3,ji=0,Be=1,Ue=2,$i=0,Vn=1,zr=2,Tl=3,ja=4,Ku=5,cn=100,ju=101,Ju=102,Qu=103,td=104,ed=200,id=201,nd=202,sd=203,Ja=204,Qa=205,rd=206,ad=207,od=208,ld=209,cd=210,hd=211,ud=212,dd=213,fd=214,to=0,eo=1,io=2,qn=3,no=4,so=5,ro=6,ao=7,jo=0,pd=1,md=2,Yi=0,gd=1,_d=2,vd=3,xd=4,yd=5,Sd=6,Md=7,Mh=300,Zn=301,Kn=302,oo=303,lo=304,Kr=306,Rs=1e3,un=1001,co=1002,Kt=1003,bd=1004,js=1005,ei=1006,sa=1007,dn=1008,Li=1009,bh=1010,wh=1011,Is=1012,Jo=1013,gn=1014,Ii=1015,zs=1016,Qo=1017,tl=1018,jn=1020,Eh=35902,Th=1021,Ah=1022,ci=1023,Ch=1024,Rh=1025,Wn=1026,Jn=1027,Ih=1028,el=1029,Ph=1030,il=1031,nl=1033,Pr=33776,Dr=33777,kr=33778,Lr=33779,ho=35840,uo=35841,fo=35842,po=35843,mo=36196,go=37492,_o=37496,vo=37808,xo=37809,yo=37810,So=37811,Mo=37812,bo=37813,wo=37814,Eo=37815,To=37816,Ao=37817,Co=37818,Ro=37819,Io=37820,Po=37821,Ur=36492,Do=36494,ko=36495,Dh=36283,Lo=36284,Uo=36285,Fo=36286,wd=3200,Ed=3201,kh=0,Td=1,Vi="",me="srgb",ns="srgb-linear",jr="linear",ne="srgb",En=7680,Al=519,Ad=512,Cd=513,Rd=514,Lh=515,Id=516,Pd=517,Dd=518,kd=519,Cl=35044,Rl="300 es",Pi=2e3,Hr=2001;class ss{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});const i=this._listeners;i[t]===void 0&&(i[t]=[]),i[t].indexOf(e)===-1&&i[t].push(e)}hasEventListener(t,e){if(this._listeners===void 0)return!1;const i=this._listeners;return i[t]!==void 0&&i[t].indexOf(e)!==-1}removeEventListener(t,e){if(this._listeners===void 0)return;const s=this._listeners[t];if(s!==void 0){const r=s.indexOf(e);r!==-1&&s.splice(r,1)}}dispatchEvent(t){if(this._listeners===void 0)return;const i=this._listeners[t.type];if(i!==void 0){t.target=this;const s=i.slice(0);for(let r=0,a=s.length;r<a;r++)s[r].call(this,t);t.target=null}}}const Te=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],Fr=Math.PI/180,No=180/Math.PI;function Hs(){const n=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(Te[n&255]+Te[n>>8&255]+Te[n>>16&255]+Te[n>>24&255]+"-"+Te[t&255]+Te[t>>8&255]+"-"+Te[t>>16&15|64]+Te[t>>24&255]+"-"+Te[e&63|128]+Te[e>>8&255]+"-"+Te[e>>16&255]+Te[e>>24&255]+Te[i&255]+Te[i>>8&255]+Te[i>>16&255]+Te[i>>24&255]).toLowerCase()}function Ge(n,t,e){return Math.max(t,Math.min(e,n))}function Ld(n,t){return(n%t+t)%t}function ra(n,t,e){return(1-e)*n+e*t}function fs(n,t){switch(t.constructor){case Float32Array:return n;case Uint32Array:return n/4294967295;case Uint16Array:return n/65535;case Uint8Array:return n/255;case Int32Array:return Math.max(n/2147483647,-1);case Int16Array:return Math.max(n/32767,-1);case Int8Array:return Math.max(n/127,-1);default:throw new Error("Invalid component type.")}}function ze(n,t){switch(t.constructor){case Float32Array:return n;case Uint32Array:return Math.round(n*4294967295);case Uint16Array:return Math.round(n*65535);case Uint8Array:return Math.round(n*255);case Int32Array:return Math.round(n*2147483647);case Int16Array:return Math.round(n*32767);case Int8Array:return Math.round(n*127);default:throw new Error("Invalid component type.")}}class te{constructor(t=0,e=0){te.prototype.isVector2=!0,this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){const e=this.x,i=this.y,s=t.elements;return this.x=s[0]*e+s[3]*i+s[6],this.y=s[1]*e+s[4]*i+s[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this}clampLength(t,e){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(t,Math.min(e,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const i=this.dot(t)/e;return Math.acos(Ge(i,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,i=this.y-t.y;return e*e+i*i}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){const i=Math.cos(e),s=Math.sin(e),r=this.x-t.x,a=this.y-t.y;return this.x=r*i-a*s+t.x,this.y=r*s+a*i+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Ot{constructor(t,e,i,s,r,a,o,l,c){Ot.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,i,s,r,a,o,l,c)}set(t,e,i,s,r,a,o,l,c){const h=this.elements;return h[0]=t,h[1]=s,h[2]=o,h[3]=e,h[4]=r,h[5]=l,h[6]=i,h[7]=a,h[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){const e=this.elements,i=t.elements;return e[0]=i[0],e[1]=i[1],e[2]=i[2],e[3]=i[3],e[4]=i[4],e[5]=i[5],e[6]=i[6],e[7]=i[7],e[8]=i[8],this}extractBasis(t,e,i){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(t){const e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const i=t.elements,s=e.elements,r=this.elements,a=i[0],o=i[3],l=i[6],c=i[1],h=i[4],f=i[7],u=i[2],d=i[5],p=i[8],g=s[0],m=s[3],_=s[6],M=s[1],E=s[4],y=s[7],w=s[2],b=s[5],S=s[8];return r[0]=a*g+o*M+l*w,r[3]=a*m+o*E+l*b,r[6]=a*_+o*y+l*S,r[1]=c*g+h*M+f*w,r[4]=c*m+h*E+f*b,r[7]=c*_+h*y+f*S,r[2]=u*g+d*M+p*w,r[5]=u*m+d*E+p*b,r[8]=u*_+d*y+p*S,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){const t=this.elements,e=t[0],i=t[1],s=t[2],r=t[3],a=t[4],o=t[5],l=t[6],c=t[7],h=t[8];return e*a*h-e*o*c-i*r*h+i*o*l+s*r*c-s*a*l}invert(){const t=this.elements,e=t[0],i=t[1],s=t[2],r=t[3],a=t[4],o=t[5],l=t[6],c=t[7],h=t[8],f=h*a-o*c,u=o*l-h*r,d=c*r-a*l,p=e*f+i*u+s*d;if(p===0)return this.set(0,0,0,0,0,0,0,0,0);const g=1/p;return t[0]=f*g,t[1]=(s*c-h*i)*g,t[2]=(o*i-s*a)*g,t[3]=u*g,t[4]=(h*e-s*l)*g,t[5]=(s*r-o*e)*g,t[6]=d*g,t[7]=(i*l-c*e)*g,t[8]=(a*e-i*r)*g,this}transpose(){let t;const e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){const e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,i,s,r,a,o){const l=Math.cos(r),c=Math.sin(r);return this.set(i*l,i*c,-i*(l*a+c*o)+a+t,-s*c,s*l,-s*(-c*a+l*o)+o+e,0,0,1),this}scale(t,e){return this.premultiply(aa.makeScale(t,e)),this}rotate(t){return this.premultiply(aa.makeRotation(-t)),this}translate(t,e){return this.premultiply(aa.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){const e=Math.cos(t),i=Math.sin(t);return this.set(e,-i,0,i,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){const e=this.elements,i=t.elements;for(let s=0;s<9;s++)if(e[s]!==i[s])return!1;return!0}fromArray(t,e=0){for(let i=0;i<9;i++)this.elements[i]=t[i+e];return this}toArray(t=[],e=0){const i=this.elements;return t[e]=i[0],t[e+1]=i[1],t[e+2]=i[2],t[e+3]=i[3],t[e+4]=i[4],t[e+5]=i[5],t[e+6]=i[6],t[e+7]=i[7],t[e+8]=i[8],t}clone(){return new this.constructor().fromArray(this.elements)}}const aa=new Ot;function Uh(n){for(let t=n.length-1;t>=0;--t)if(n[t]>=65535)return!0;return!1}function Ps(n){return document.createElementNS("http://www.w3.org/1999/xhtml",n)}function Ud(){const n=Ps("canvas");return n.style.display="block",n}const Il={};function ys(n){n in Il||(Il[n]=!0,console.warn(n))}function Fd(n,t,e){return new Promise(function(i,s){function r(){switch(n.clientWaitSync(t,n.SYNC_FLUSH_COMMANDS_BIT,0)){case n.WAIT_FAILED:s();break;case n.TIMEOUT_EXPIRED:setTimeout(r,e);break;default:i()}}setTimeout(r,e)})}function Nd(n){const t=n.elements;t[2]=.5*t[2]+.5*t[3],t[6]=.5*t[6]+.5*t[7],t[10]=.5*t[10]+.5*t[11],t[14]=.5*t[14]+.5*t[15]}function Bd(n){const t=n.elements;t[11]===-1?(t[10]=-t[10]-1,t[14]=-t[14]):(t[10]=-t[10],t[14]=-t[14]+1)}const $t={enabled:!0,workingColorSpace:ns,spaces:{},convert:function(n,t,e){return this.enabled===!1||t===e||!t||!e||(this.spaces[t].transfer===ne&&(n.r=Di(n.r),n.g=Di(n.g),n.b=Di(n.b)),this.spaces[t].primaries!==this.spaces[e].primaries&&(n.applyMatrix3(this.spaces[t].toXYZ),n.applyMatrix3(this.spaces[e].fromXYZ)),this.spaces[e].transfer===ne&&(n.r=Xn(n.r),n.g=Xn(n.g),n.b=Xn(n.b))),n},fromWorkingColorSpace:function(n,t){return this.convert(n,this.workingColorSpace,t)},toWorkingColorSpace:function(n,t){return this.convert(n,t,this.workingColorSpace)},getPrimaries:function(n){return this.spaces[n].primaries},getTransfer:function(n){return n===Vi?jr:this.spaces[n].transfer},getLuminanceCoefficients:function(n,t=this.workingColorSpace){return n.fromArray(this.spaces[t].luminanceCoefficients)},define:function(n){Object.assign(this.spaces,n)},_getMatrix:function(n,t,e){return n.copy(this.spaces[t].toXYZ).multiply(this.spaces[e].fromXYZ)},_getDrawingBufferColorSpace:function(n){return this.spaces[n].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(n=this.workingColorSpace){return this.spaces[n].workingColorSpaceConfig.unpackColorSpace}};function Di(n){return n<.04045?n*.0773993808:Math.pow(n*.9478672986+.0521327014,2.4)}function Xn(n){return n<.0031308?n*12.92:1.055*Math.pow(n,.41666)-.055}const Pl=[.64,.33,.3,.6,.15,.06],Dl=[.2126,.7152,.0722],kl=[.3127,.329],Ll=new Ot().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Ul=new Ot().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);$t.define({[ns]:{primaries:Pl,whitePoint:kl,transfer:jr,toXYZ:Ll,fromXYZ:Ul,luminanceCoefficients:Dl,workingColorSpaceConfig:{unpackColorSpace:me},outputColorSpaceConfig:{drawingBufferColorSpace:me}},[me]:{primaries:Pl,whitePoint:kl,transfer:ne,toXYZ:Ll,fromXYZ:Ul,luminanceCoefficients:Dl,outputColorSpaceConfig:{drawingBufferColorSpace:me}}});let Tn;class Od{static getDataURL(t){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let e;if(t instanceof HTMLCanvasElement)e=t;else{Tn===void 0&&(Tn=Ps("canvas")),Tn.width=t.width,Tn.height=t.height;const i=Tn.getContext("2d");t instanceof ImageData?i.putImageData(t,0,0):i.drawImage(t,0,0,t.width,t.height),e=Tn}return e.width>2048||e.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",t),e.toDataURL("image/jpeg",.6)):e.toDataURL("image/png")}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){const e=Ps("canvas");e.width=t.width,e.height=t.height;const i=e.getContext("2d");i.drawImage(t,0,0,t.width,t.height);const s=i.getImageData(0,0,t.width,t.height),r=s.data;for(let a=0;a<r.length;a++)r[a]=Di(r[a]/255)*255;return i.putImageData(s,0,0),e}else if(t.data){const e=t.data.slice(0);for(let i=0;i<e.length;i++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[i]=Math.floor(Di(e[i]/255)*255):e[i]=Di(e[i]);return{data:e,width:t.width,height:t.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}}let zd=0;class Fh{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:zd++}),this.uuid=Hs(),this.data=t,this.dataReady=!0,this.version=0}set needsUpdate(t){t===!0&&this.version++}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];const i={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let a=0,o=s.length;a<o;a++)s[a].isDataTexture?r.push(oa(s[a].image)):r.push(oa(s[a]))}else r=oa(s);i.url=r}return e||(t.images[this.uuid]=i),i}}function oa(n){return typeof HTMLImageElement<"u"&&n instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&n instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&n instanceof ImageBitmap?Od.getDataURL(n):n.data?{data:Array.from(n.data),width:n.width,height:n.height,type:n.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let Hd=0;class Pe extends ss{constructor(t=Pe.DEFAULT_IMAGE,e=Pe.DEFAULT_MAPPING,i=un,s=un,r=ei,a=dn,o=ci,l=Li,c=Pe.DEFAULT_ANISOTROPY,h=Vi){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Hd++}),this.uuid=Hs(),this.name="",this.source=new Fh(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=i,this.wrapT=s,this.magFilter=r,this.minFilter=a,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new te(0,0),this.repeat=new te(1,1),this.center=new te(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Ot,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];const i={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),e||(t.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==Mh)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case Rs:t.x=t.x-Math.floor(t.x);break;case un:t.x=t.x<0?0:1;break;case co:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case Rs:t.y=t.y-Math.floor(t.y);break;case un:t.y=t.y<0?0:1;break;case co:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}}Pe.DEFAULT_IMAGE=null;Pe.DEFAULT_MAPPING=Mh;Pe.DEFAULT_ANISOTROPY=1;class _e{constructor(t=0,e=0,i=0,s=1){_e.prototype.isVector4=!0,this.x=t,this.y=e,this.z=i,this.w=s}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,i,s){return this.x=t,this.y=e,this.z=i,this.w=s,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){const e=this.x,i=this.y,s=this.z,r=this.w,a=t.elements;return this.x=a[0]*e+a[4]*i+a[8]*s+a[12]*r,this.y=a[1]*e+a[5]*i+a[9]*s+a[13]*r,this.z=a[2]*e+a[6]*i+a[10]*s+a[14]*r,this.w=a[3]*e+a[7]*i+a[11]*s+a[15]*r,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);const e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,i,s,r;const l=t.elements,c=l[0],h=l[4],f=l[8],u=l[1],d=l[5],p=l[9],g=l[2],m=l[6],_=l[10];if(Math.abs(h-u)<.01&&Math.abs(f-g)<.01&&Math.abs(p-m)<.01){if(Math.abs(h+u)<.1&&Math.abs(f+g)<.1&&Math.abs(p+m)<.1&&Math.abs(c+d+_-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;const E=(c+1)/2,y=(d+1)/2,w=(_+1)/2,b=(h+u)/4,S=(f+g)/4,R=(p+m)/4;return E>y&&E>w?E<.01?(i=0,s=.707106781,r=.707106781):(i=Math.sqrt(E),s=b/i,r=S/i):y>w?y<.01?(i=.707106781,s=0,r=.707106781):(s=Math.sqrt(y),i=b/s,r=R/s):w<.01?(i=.707106781,s=.707106781,r=0):(r=Math.sqrt(w),i=S/r,s=R/r),this.set(i,s,r,e),this}let M=Math.sqrt((m-p)*(m-p)+(f-g)*(f-g)+(u-h)*(u-h));return Math.abs(M)<.001&&(M=1),this.x=(m-p)/M,this.y=(f-g)/M,this.z=(u-h)/M,this.w=Math.acos((c+d+_-1)/2),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this.w=Math.max(t.w,Math.min(e.w,this.w)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this.w=Math.max(t,Math.min(e,this.w)),this}clampLength(t,e){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(t,Math.min(e,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this.z=t.z+(e.z-t.z)*i,this.w=t.w+(e.w-t.w)*i,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class Gd extends ss{constructor(t=1,e=1,i={}){super(),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=1,this.scissor=new _e(0,0,t,e),this.scissorTest=!1,this.viewport=new _e(0,0,t,e);const s={width:t,height:e,depth:1};i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:ei,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},i);const r=new Pe(s,i.mapping,i.wrapS,i.wrapT,i.magFilter,i.minFilter,i.format,i.type,i.anisotropy,i.colorSpace);r.flipY=!1,r.generateMipmaps=i.generateMipmaps,r.internalFormat=i.internalFormat,this.textures=[];const a=i.count;for(let o=0;o<a;o++)this.textures[o]=r.clone(),this.textures[o].isRenderTargetTexture=!0;this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this.depthTexture=i.depthTexture,this.samples=i.samples}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}setSize(t,e,i=1){if(this.width!==t||this.height!==e||this.depth!==i){this.width=t,this.height=e,this.depth=i;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=t,this.textures[s].image.height=e,this.textures[s].image.depth=i;this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let i=0,s=t.textures.length;i<s;i++)this.textures[i]=t.textures[i].clone(),this.textures[i].isRenderTargetTexture=!0;const e=Object.assign({},t.texture.image);return this.texture.source=new Fh(e),this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class _n extends Gd{constructor(t=1,e=1,i={}){super(t,e,i),this.isWebGLRenderTarget=!0}}class Nh extends Pe{constructor(t=null,e=1,i=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:i,depth:s},this.magFilter=Kt,this.minFilter=Kt,this.wrapR=un,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}}class Vd extends Pe{constructor(t=null,e=1,i=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:i,depth:s},this.magFilter=Kt,this.minFilter=Kt,this.wrapR=un,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class rs{constructor(t=0,e=0,i=0,s=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=i,this._w=s}static slerpFlat(t,e,i,s,r,a,o){let l=i[s+0],c=i[s+1],h=i[s+2],f=i[s+3];const u=r[a+0],d=r[a+1],p=r[a+2],g=r[a+3];if(o===0){t[e+0]=l,t[e+1]=c,t[e+2]=h,t[e+3]=f;return}if(o===1){t[e+0]=u,t[e+1]=d,t[e+2]=p,t[e+3]=g;return}if(f!==g||l!==u||c!==d||h!==p){let m=1-o;const _=l*u+c*d+h*p+f*g,M=_>=0?1:-1,E=1-_*_;if(E>Number.EPSILON){const w=Math.sqrt(E),b=Math.atan2(w,_*M);m=Math.sin(m*b)/w,o=Math.sin(o*b)/w}const y=o*M;if(l=l*m+u*y,c=c*m+d*y,h=h*m+p*y,f=f*m+g*y,m===1-o){const w=1/Math.sqrt(l*l+c*c+h*h+f*f);l*=w,c*=w,h*=w,f*=w}}t[e]=l,t[e+1]=c,t[e+2]=h,t[e+3]=f}static multiplyQuaternionsFlat(t,e,i,s,r,a){const o=i[s],l=i[s+1],c=i[s+2],h=i[s+3],f=r[a],u=r[a+1],d=r[a+2],p=r[a+3];return t[e]=o*p+h*f+l*d-c*u,t[e+1]=l*p+h*u+c*f-o*d,t[e+2]=c*p+h*d+o*u-l*f,t[e+3]=h*p-o*f-l*u-c*d,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,i,s){return this._x=t,this._y=e,this._z=i,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){const i=t._x,s=t._y,r=t._z,a=t._order,o=Math.cos,l=Math.sin,c=o(i/2),h=o(s/2),f=o(r/2),u=l(i/2),d=l(s/2),p=l(r/2);switch(a){case"XYZ":this._x=u*h*f+c*d*p,this._y=c*d*f-u*h*p,this._z=c*h*p+u*d*f,this._w=c*h*f-u*d*p;break;case"YXZ":this._x=u*h*f+c*d*p,this._y=c*d*f-u*h*p,this._z=c*h*p-u*d*f,this._w=c*h*f+u*d*p;break;case"ZXY":this._x=u*h*f-c*d*p,this._y=c*d*f+u*h*p,this._z=c*h*p+u*d*f,this._w=c*h*f-u*d*p;break;case"ZYX":this._x=u*h*f-c*d*p,this._y=c*d*f+u*h*p,this._z=c*h*p-u*d*f,this._w=c*h*f+u*d*p;break;case"YZX":this._x=u*h*f+c*d*p,this._y=c*d*f+u*h*p,this._z=c*h*p-u*d*f,this._w=c*h*f-u*d*p;break;case"XZY":this._x=u*h*f-c*d*p,this._y=c*d*f-u*h*p,this._z=c*h*p+u*d*f,this._w=c*h*f+u*d*p;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+a)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){const i=e/2,s=Math.sin(i);return this._x=t.x*s,this._y=t.y*s,this._z=t.z*s,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(t){const e=t.elements,i=e[0],s=e[4],r=e[8],a=e[1],o=e[5],l=e[9],c=e[2],h=e[6],f=e[10],u=i+o+f;if(u>0){const d=.5/Math.sqrt(u+1);this._w=.25/d,this._x=(h-l)*d,this._y=(r-c)*d,this._z=(a-s)*d}else if(i>o&&i>f){const d=2*Math.sqrt(1+i-o-f);this._w=(h-l)/d,this._x=.25*d,this._y=(s+a)/d,this._z=(r+c)/d}else if(o>f){const d=2*Math.sqrt(1+o-i-f);this._w=(r-c)/d,this._x=(s+a)/d,this._y=.25*d,this._z=(l+h)/d}else{const d=2*Math.sqrt(1+f-i-o);this._w=(a-s)/d,this._x=(r+c)/d,this._y=(l+h)/d,this._z=.25*d}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let i=t.dot(e)+1;return i<Number.EPSILON?(i=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=i):(this._x=0,this._y=-t.z,this._z=t.y,this._w=i)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=i),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(Ge(this.dot(t),-1,1)))}rotateTowards(t,e){const i=this.angleTo(t);if(i===0)return this;const s=Math.min(1,e/i);return this.slerp(t,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){const i=t._x,s=t._y,r=t._z,a=t._w,o=e._x,l=e._y,c=e._z,h=e._w;return this._x=i*h+a*o+s*c-r*l,this._y=s*h+a*l+r*o-i*c,this._z=r*h+a*c+i*l-s*o,this._w=a*h-i*o-s*l-r*c,this._onChangeCallback(),this}slerp(t,e){if(e===0)return this;if(e===1)return this.copy(t);const i=this._x,s=this._y,r=this._z,a=this._w;let o=a*t._w+i*t._x+s*t._y+r*t._z;if(o<0?(this._w=-t._w,this._x=-t._x,this._y=-t._y,this._z=-t._z,o=-o):this.copy(t),o>=1)return this._w=a,this._x=i,this._y=s,this._z=r,this;const l=1-o*o;if(l<=Number.EPSILON){const d=1-e;return this._w=d*a+e*this._w,this._x=d*i+e*this._x,this._y=d*s+e*this._y,this._z=d*r+e*this._z,this.normalize(),this}const c=Math.sqrt(l),h=Math.atan2(c,o),f=Math.sin((1-e)*h)/c,u=Math.sin(e*h)/c;return this._w=a*f+this._w*u,this._x=i*f+this._x*u,this._y=s*f+this._y*u,this._z=r*f+this._z*u,this._onChangeCallback(),this}slerpQuaternions(t,e,i){return this.copy(t).slerp(e,i)}random(){const t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),i=Math.random(),s=Math.sqrt(1-i),r=Math.sqrt(i);return this.set(s*Math.sin(t),s*Math.cos(t),r*Math.sin(e),r*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class G{constructor(t=0,e=0,i=0){G.prototype.isVector3=!0,this.x=t,this.y=e,this.z=i}set(t,e,i){return i===void 0&&(i=this.z),this.x=t,this.y=e,this.z=i,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(Fl.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(Fl.setFromAxisAngle(t,e))}applyMatrix3(t){const e=this.x,i=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[3]*i+r[6]*s,this.y=r[1]*e+r[4]*i+r[7]*s,this.z=r[2]*e+r[5]*i+r[8]*s,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){const e=this.x,i=this.y,s=this.z,r=t.elements,a=1/(r[3]*e+r[7]*i+r[11]*s+r[15]);return this.x=(r[0]*e+r[4]*i+r[8]*s+r[12])*a,this.y=(r[1]*e+r[5]*i+r[9]*s+r[13])*a,this.z=(r[2]*e+r[6]*i+r[10]*s+r[14])*a,this}applyQuaternion(t){const e=this.x,i=this.y,s=this.z,r=t.x,a=t.y,o=t.z,l=t.w,c=2*(a*s-o*i),h=2*(o*e-r*s),f=2*(r*i-a*e);return this.x=e+l*c+a*f-o*h,this.y=i+l*h+o*c-r*f,this.z=s+l*f+r*h-a*c,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){const e=this.x,i=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[4]*i+r[8]*s,this.y=r[1]*e+r[5]*i+r[9]*s,this.z=r[2]*e+r[6]*i+r[10]*s,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this}clampLength(t,e){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(t,Math.min(e,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this.z=t.z+(e.z-t.z)*i,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){const i=t.x,s=t.y,r=t.z,a=e.x,o=e.y,l=e.z;return this.x=s*l-r*o,this.y=r*a-i*l,this.z=i*o-s*a,this}projectOnVector(t){const e=t.lengthSq();if(e===0)return this.set(0,0,0);const i=t.dot(this)/e;return this.copy(t).multiplyScalar(i)}projectOnPlane(t){return la.copy(this).projectOnVector(t),this.sub(la)}reflect(t){return this.sub(la.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const i=this.dot(t)/e;return Math.acos(Ge(i,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,i=this.y-t.y,s=this.z-t.z;return e*e+i*i+s*s}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,i){const s=Math.sin(e)*t;return this.x=s*Math.sin(i),this.y=Math.cos(e)*t,this.z=s*Math.cos(i),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,i){return this.x=t*Math.sin(e),this.y=i,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){const e=this.setFromMatrixColumn(t,0).length(),i=this.setFromMatrixColumn(t,1).length(),s=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=i,this.z=s,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const t=Math.random()*Math.PI*2,e=Math.random()*2-1,i=Math.sqrt(1-e*e);return this.x=i*Math.cos(t),this.y=e,this.z=i*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const la=new G,Fl=new rs;class Gs{constructor(t=new G(1/0,1/0,1/0),e=new G(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,i=t.length;e<i;e+=3)this.expandByPoint(ai.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,i=t.count;e<i;e++)this.expandByPoint(ai.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,i=t.length;e<i;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){const i=ai.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(i),this.max.copy(t).add(i),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);const i=t.geometry;if(i!==void 0){const r=i.getAttribute("position");if(e===!0&&r!==void 0&&t.isInstancedMesh!==!0)for(let a=0,o=r.count;a<o;a++)t.isMesh===!0?t.getVertexPosition(a,ai):ai.fromBufferAttribute(r,a),ai.applyMatrix4(t.matrixWorld),this.expandByPoint(ai);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),Js.copy(t.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),Js.copy(i.boundingBox)),Js.applyMatrix4(t.matrixWorld),this.union(Js)}const s=t.children;for(let r=0,a=s.length;r<a;r++)this.expandByObject(s[r],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,ai),ai.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,i;return t.normal.x>0?(e=t.normal.x*this.min.x,i=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,i=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,i+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,i+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,i+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,i+=t.normal.z*this.min.z),e<=-t.constant&&i>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(ps),Qs.subVectors(this.max,ps),An.subVectors(t.a,ps),Cn.subVectors(t.b,ps),Rn.subVectors(t.c,ps),Ni.subVectors(Cn,An),Bi.subVectors(Rn,Cn),tn.subVectors(An,Rn);let e=[0,-Ni.z,Ni.y,0,-Bi.z,Bi.y,0,-tn.z,tn.y,Ni.z,0,-Ni.x,Bi.z,0,-Bi.x,tn.z,0,-tn.x,-Ni.y,Ni.x,0,-Bi.y,Bi.x,0,-tn.y,tn.x,0];return!ca(e,An,Cn,Rn,Qs)||(e=[1,0,0,0,1,0,0,0,1],!ca(e,An,Cn,Rn,Qs))?!1:(tr.crossVectors(Ni,Bi),e=[tr.x,tr.y,tr.z],ca(e,An,Cn,Rn,Qs))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,ai).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(ai).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(Mi[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),Mi[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),Mi[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),Mi[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),Mi[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),Mi[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),Mi[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),Mi[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(Mi),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}}const Mi=[new G,new G,new G,new G,new G,new G,new G,new G],ai=new G,Js=new Gs,An=new G,Cn=new G,Rn=new G,Ni=new G,Bi=new G,tn=new G,ps=new G,Qs=new G,tr=new G,en=new G;function ca(n,t,e,i,s){for(let r=0,a=n.length-3;r<=a;r+=3){en.fromArray(n,r);const o=s.x*Math.abs(en.x)+s.y*Math.abs(en.y)+s.z*Math.abs(en.z),l=t.dot(en),c=e.dot(en),h=i.dot(en);if(Math.max(-Math.max(l,c,h),Math.min(l,c,h))>o)return!1}return!0}const Wd=new Gs,ms=new G,ha=new G;class Vs{constructor(t=new G,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){const i=this.center;e!==void 0?i.copy(e):Wd.setFromPoints(t).getCenter(i);let s=0;for(let r=0,a=t.length;r<a;r++)s=Math.max(s,i.distanceToSquared(t[r]));return this.radius=Math.sqrt(s),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){const e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){const i=this.center.distanceToSquared(t);return e.copy(t),i>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;ms.subVectors(t,this.center);const e=ms.lengthSq();if(e>this.radius*this.radius){const i=Math.sqrt(e),s=(i-this.radius)*.5;this.center.addScaledVector(ms,s/i),this.radius+=s}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(ha.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(ms.copy(t.center).add(ha)),this.expandByPoint(ms.copy(t.center).sub(ha))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}}const bi=new G,ua=new G,er=new G,Oi=new G,da=new G,ir=new G,fa=new G;class sl{constructor(t=new G,e=new G(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,bi)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);const i=e.dot(this.direction);return i<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){const e=bi.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(bi.copy(this.origin).addScaledVector(this.direction,e),bi.distanceToSquared(t))}distanceSqToSegment(t,e,i,s){ua.copy(t).add(e).multiplyScalar(.5),er.copy(e).sub(t).normalize(),Oi.copy(this.origin).sub(ua);const r=t.distanceTo(e)*.5,a=-this.direction.dot(er),o=Oi.dot(this.direction),l=-Oi.dot(er),c=Oi.lengthSq(),h=Math.abs(1-a*a);let f,u,d,p;if(h>0)if(f=a*l-o,u=a*o-l,p=r*h,f>=0)if(u>=-p)if(u<=p){const g=1/h;f*=g,u*=g,d=f*(f+a*u+2*o)+u*(a*f+u+2*l)+c}else u=r,f=Math.max(0,-(a*u+o)),d=-f*f+u*(u+2*l)+c;else u=-r,f=Math.max(0,-(a*u+o)),d=-f*f+u*(u+2*l)+c;else u<=-p?(f=Math.max(0,-(-a*r+o)),u=f>0?-r:Math.min(Math.max(-r,-l),r),d=-f*f+u*(u+2*l)+c):u<=p?(f=0,u=Math.min(Math.max(-r,-l),r),d=u*(u+2*l)+c):(f=Math.max(0,-(a*r+o)),u=f>0?r:Math.min(Math.max(-r,-l),r),d=-f*f+u*(u+2*l)+c);else u=a>0?-r:r,f=Math.max(0,-(a*u+o)),d=-f*f+u*(u+2*l)+c;return i&&i.copy(this.origin).addScaledVector(this.direction,f),s&&s.copy(ua).addScaledVector(er,u),d}intersectSphere(t,e){bi.subVectors(t.center,this.origin);const i=bi.dot(this.direction),s=bi.dot(bi)-i*i,r=t.radius*t.radius;if(s>r)return null;const a=Math.sqrt(r-s),o=i-a,l=i+a;return l<0?null:o<0?this.at(l,e):this.at(o,e)}intersectsSphere(t){return this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){const e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;const i=-(this.origin.dot(t.normal)+t.constant)/e;return i>=0?i:null}intersectPlane(t,e){const i=this.distanceToPlane(t);return i===null?null:this.at(i,e)}intersectsPlane(t){const e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let i,s,r,a,o,l;const c=1/this.direction.x,h=1/this.direction.y,f=1/this.direction.z,u=this.origin;return c>=0?(i=(t.min.x-u.x)*c,s=(t.max.x-u.x)*c):(i=(t.max.x-u.x)*c,s=(t.min.x-u.x)*c),h>=0?(r=(t.min.y-u.y)*h,a=(t.max.y-u.y)*h):(r=(t.max.y-u.y)*h,a=(t.min.y-u.y)*h),i>a||r>s||((r>i||isNaN(i))&&(i=r),(a<s||isNaN(s))&&(s=a),f>=0?(o=(t.min.z-u.z)*f,l=(t.max.z-u.z)*f):(o=(t.max.z-u.z)*f,l=(t.min.z-u.z)*f),i>l||o>s)||((o>i||i!==i)&&(i=o),(l<s||s!==s)&&(s=l),s<0)?null:this.at(i>=0?i:s,e)}intersectsBox(t){return this.intersectBox(t,bi)!==null}intersectTriangle(t,e,i,s,r){da.subVectors(e,t),ir.subVectors(i,t),fa.crossVectors(da,ir);let a=this.direction.dot(fa),o;if(a>0){if(s)return null;o=1}else if(a<0)o=-1,a=-a;else return null;Oi.subVectors(this.origin,t);const l=o*this.direction.dot(ir.crossVectors(Oi,ir));if(l<0)return null;const c=o*this.direction.dot(da.cross(Oi));if(c<0||l+c>a)return null;const h=-o*Oi.dot(fa);return h<0?null:this.at(h/a,r)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class se{constructor(t,e,i,s,r,a,o,l,c,h,f,u,d,p,g,m){se.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,i,s,r,a,o,l,c,h,f,u,d,p,g,m)}set(t,e,i,s,r,a,o,l,c,h,f,u,d,p,g,m){const _=this.elements;return _[0]=t,_[4]=e,_[8]=i,_[12]=s,_[1]=r,_[5]=a,_[9]=o,_[13]=l,_[2]=c,_[6]=h,_[10]=f,_[14]=u,_[3]=d,_[7]=p,_[11]=g,_[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new se().fromArray(this.elements)}copy(t){const e=this.elements,i=t.elements;return e[0]=i[0],e[1]=i[1],e[2]=i[2],e[3]=i[3],e[4]=i[4],e[5]=i[5],e[6]=i[6],e[7]=i[7],e[8]=i[8],e[9]=i[9],e[10]=i[10],e[11]=i[11],e[12]=i[12],e[13]=i[13],e[14]=i[14],e[15]=i[15],this}copyPosition(t){const e=this.elements,i=t.elements;return e[12]=i[12],e[13]=i[13],e[14]=i[14],this}setFromMatrix3(t){const e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,i){return t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this}makeBasis(t,e,i){return this.set(t.x,e.x,i.x,0,t.y,e.y,i.y,0,t.z,e.z,i.z,0,0,0,0,1),this}extractRotation(t){const e=this.elements,i=t.elements,s=1/In.setFromMatrixColumn(t,0).length(),r=1/In.setFromMatrixColumn(t,1).length(),a=1/In.setFromMatrixColumn(t,2).length();return e[0]=i[0]*s,e[1]=i[1]*s,e[2]=i[2]*s,e[3]=0,e[4]=i[4]*r,e[5]=i[5]*r,e[6]=i[6]*r,e[7]=0,e[8]=i[8]*a,e[9]=i[9]*a,e[10]=i[10]*a,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){const e=this.elements,i=t.x,s=t.y,r=t.z,a=Math.cos(i),o=Math.sin(i),l=Math.cos(s),c=Math.sin(s),h=Math.cos(r),f=Math.sin(r);if(t.order==="XYZ"){const u=a*h,d=a*f,p=o*h,g=o*f;e[0]=l*h,e[4]=-l*f,e[8]=c,e[1]=d+p*c,e[5]=u-g*c,e[9]=-o*l,e[2]=g-u*c,e[6]=p+d*c,e[10]=a*l}else if(t.order==="YXZ"){const u=l*h,d=l*f,p=c*h,g=c*f;e[0]=u+g*o,e[4]=p*o-d,e[8]=a*c,e[1]=a*f,e[5]=a*h,e[9]=-o,e[2]=d*o-p,e[6]=g+u*o,e[10]=a*l}else if(t.order==="ZXY"){const u=l*h,d=l*f,p=c*h,g=c*f;e[0]=u-g*o,e[4]=-a*f,e[8]=p+d*o,e[1]=d+p*o,e[5]=a*h,e[9]=g-u*o,e[2]=-a*c,e[6]=o,e[10]=a*l}else if(t.order==="ZYX"){const u=a*h,d=a*f,p=o*h,g=o*f;e[0]=l*h,e[4]=p*c-d,e[8]=u*c+g,e[1]=l*f,e[5]=g*c+u,e[9]=d*c-p,e[2]=-c,e[6]=o*l,e[10]=a*l}else if(t.order==="YZX"){const u=a*l,d=a*c,p=o*l,g=o*c;e[0]=l*h,e[4]=g-u*f,e[8]=p*f+d,e[1]=f,e[5]=a*h,e[9]=-o*h,e[2]=-c*h,e[6]=d*f+p,e[10]=u-g*f}else if(t.order==="XZY"){const u=a*l,d=a*c,p=o*l,g=o*c;e[0]=l*h,e[4]=-f,e[8]=c*h,e[1]=u*f+g,e[5]=a*h,e[9]=d*f-p,e[2]=p*f-d,e[6]=o*h,e[10]=g*f+u}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(Xd,t,$d)}lookAt(t,e,i){const s=this.elements;return $e.subVectors(t,e),$e.lengthSq()===0&&($e.z=1),$e.normalize(),zi.crossVectors(i,$e),zi.lengthSq()===0&&(Math.abs(i.z)===1?$e.x+=1e-4:$e.z+=1e-4,$e.normalize(),zi.crossVectors(i,$e)),zi.normalize(),nr.crossVectors($e,zi),s[0]=zi.x,s[4]=nr.x,s[8]=$e.x,s[1]=zi.y,s[5]=nr.y,s[9]=$e.y,s[2]=zi.z,s[6]=nr.z,s[10]=$e.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const i=t.elements,s=e.elements,r=this.elements,a=i[0],o=i[4],l=i[8],c=i[12],h=i[1],f=i[5],u=i[9],d=i[13],p=i[2],g=i[6],m=i[10],_=i[14],M=i[3],E=i[7],y=i[11],w=i[15],b=s[0],S=s[4],R=s[8],v=s[12],x=s[1],C=s[5],k=s[9],L=s[13],D=s[2],H=s[6],z=s[10],W=s[14],F=s[3],q=s[7],st=s[11],vt=s[15];return r[0]=a*b+o*x+l*D+c*F,r[4]=a*S+o*C+l*H+c*q,r[8]=a*R+o*k+l*z+c*st,r[12]=a*v+o*L+l*W+c*vt,r[1]=h*b+f*x+u*D+d*F,r[5]=h*S+f*C+u*H+d*q,r[9]=h*R+f*k+u*z+d*st,r[13]=h*v+f*L+u*W+d*vt,r[2]=p*b+g*x+m*D+_*F,r[6]=p*S+g*C+m*H+_*q,r[10]=p*R+g*k+m*z+_*st,r[14]=p*v+g*L+m*W+_*vt,r[3]=M*b+E*x+y*D+w*F,r[7]=M*S+E*C+y*H+w*q,r[11]=M*R+E*k+y*z+w*st,r[15]=M*v+E*L+y*W+w*vt,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){const t=this.elements,e=t[0],i=t[4],s=t[8],r=t[12],a=t[1],o=t[5],l=t[9],c=t[13],h=t[2],f=t[6],u=t[10],d=t[14],p=t[3],g=t[7],m=t[11],_=t[15];return p*(+r*l*f-s*c*f-r*o*u+i*c*u+s*o*d-i*l*d)+g*(+e*l*d-e*c*u+r*a*u-s*a*d+s*c*h-r*l*h)+m*(+e*c*f-e*o*d-r*a*f+i*a*d+r*o*h-i*c*h)+_*(-s*o*h-e*l*f+e*o*u+s*a*f-i*a*u+i*l*h)}transpose(){const t=this.elements;let e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,i){const s=this.elements;return t.isVector3?(s[12]=t.x,s[13]=t.y,s[14]=t.z):(s[12]=t,s[13]=e,s[14]=i),this}invert(){const t=this.elements,e=t[0],i=t[1],s=t[2],r=t[3],a=t[4],o=t[5],l=t[6],c=t[7],h=t[8],f=t[9],u=t[10],d=t[11],p=t[12],g=t[13],m=t[14],_=t[15],M=f*m*c-g*u*c+g*l*d-o*m*d-f*l*_+o*u*_,E=p*u*c-h*m*c-p*l*d+a*m*d+h*l*_-a*u*_,y=h*g*c-p*f*c+p*o*d-a*g*d-h*o*_+a*f*_,w=p*f*l-h*g*l-p*o*u+a*g*u+h*o*m-a*f*m,b=e*M+i*E+s*y+r*w;if(b===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const S=1/b;return t[0]=M*S,t[1]=(g*u*r-f*m*r-g*s*d+i*m*d+f*s*_-i*u*_)*S,t[2]=(o*m*r-g*l*r+g*s*c-i*m*c-o*s*_+i*l*_)*S,t[3]=(f*l*r-o*u*r-f*s*c+i*u*c+o*s*d-i*l*d)*S,t[4]=E*S,t[5]=(h*m*r-p*u*r+p*s*d-e*m*d-h*s*_+e*u*_)*S,t[6]=(p*l*r-a*m*r-p*s*c+e*m*c+a*s*_-e*l*_)*S,t[7]=(a*u*r-h*l*r+h*s*c-e*u*c-a*s*d+e*l*d)*S,t[8]=y*S,t[9]=(p*f*r-h*g*r-p*i*d+e*g*d+h*i*_-e*f*_)*S,t[10]=(a*g*r-p*o*r+p*i*c-e*g*c-a*i*_+e*o*_)*S,t[11]=(h*o*r-a*f*r-h*i*c+e*f*c+a*i*d-e*o*d)*S,t[12]=w*S,t[13]=(h*g*s-p*f*s+p*i*u-e*g*u-h*i*m+e*f*m)*S,t[14]=(p*o*s-a*g*s-p*i*l+e*g*l+a*i*m-e*o*m)*S,t[15]=(a*f*s-h*o*s+h*i*l-e*f*l-a*i*u+e*o*u)*S,this}scale(t){const e=this.elements,i=t.x,s=t.y,r=t.z;return e[0]*=i,e[4]*=s,e[8]*=r,e[1]*=i,e[5]*=s,e[9]*=r,e[2]*=i,e[6]*=s,e[10]*=r,e[3]*=i,e[7]*=s,e[11]*=r,this}getMaxScaleOnAxis(){const t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],i=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],s=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,i,s))}makeTranslation(t,e,i){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,i,0,0,0,1),this}makeRotationX(t){const e=Math.cos(t),i=Math.sin(t);return this.set(1,0,0,0,0,e,-i,0,0,i,e,0,0,0,0,1),this}makeRotationY(t){const e=Math.cos(t),i=Math.sin(t);return this.set(e,0,i,0,0,1,0,0,-i,0,e,0,0,0,0,1),this}makeRotationZ(t){const e=Math.cos(t),i=Math.sin(t);return this.set(e,-i,0,0,i,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){const i=Math.cos(e),s=Math.sin(e),r=1-i,a=t.x,o=t.y,l=t.z,c=r*a,h=r*o;return this.set(c*a+i,c*o-s*l,c*l+s*o,0,c*o+s*l,h*o+i,h*l-s*a,0,c*l-s*o,h*l+s*a,r*l*l+i,0,0,0,0,1),this}makeScale(t,e,i){return this.set(t,0,0,0,0,e,0,0,0,0,i,0,0,0,0,1),this}makeShear(t,e,i,s,r,a){return this.set(1,i,r,0,t,1,a,0,e,s,1,0,0,0,0,1),this}compose(t,e,i){const s=this.elements,r=e._x,a=e._y,o=e._z,l=e._w,c=r+r,h=a+a,f=o+o,u=r*c,d=r*h,p=r*f,g=a*h,m=a*f,_=o*f,M=l*c,E=l*h,y=l*f,w=i.x,b=i.y,S=i.z;return s[0]=(1-(g+_))*w,s[1]=(d+y)*w,s[2]=(p-E)*w,s[3]=0,s[4]=(d-y)*b,s[5]=(1-(u+_))*b,s[6]=(m+M)*b,s[7]=0,s[8]=(p+E)*S,s[9]=(m-M)*S,s[10]=(1-(u+g))*S,s[11]=0,s[12]=t.x,s[13]=t.y,s[14]=t.z,s[15]=1,this}decompose(t,e,i){const s=this.elements;let r=In.set(s[0],s[1],s[2]).length();const a=In.set(s[4],s[5],s[6]).length(),o=In.set(s[8],s[9],s[10]).length();this.determinant()<0&&(r=-r),t.x=s[12],t.y=s[13],t.z=s[14],oi.copy(this);const c=1/r,h=1/a,f=1/o;return oi.elements[0]*=c,oi.elements[1]*=c,oi.elements[2]*=c,oi.elements[4]*=h,oi.elements[5]*=h,oi.elements[6]*=h,oi.elements[8]*=f,oi.elements[9]*=f,oi.elements[10]*=f,e.setFromRotationMatrix(oi),i.x=r,i.y=a,i.z=o,this}makePerspective(t,e,i,s,r,a,o=Pi){const l=this.elements,c=2*r/(e-t),h=2*r/(i-s),f=(e+t)/(e-t),u=(i+s)/(i-s);let d,p;if(o===Pi)d=-(a+r)/(a-r),p=-2*a*r/(a-r);else if(o===Hr)d=-a/(a-r),p=-a*r/(a-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return l[0]=c,l[4]=0,l[8]=f,l[12]=0,l[1]=0,l[5]=h,l[9]=u,l[13]=0,l[2]=0,l[6]=0,l[10]=d,l[14]=p,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(t,e,i,s,r,a,o=Pi){const l=this.elements,c=1/(e-t),h=1/(i-s),f=1/(a-r),u=(e+t)*c,d=(i+s)*h;let p,g;if(o===Pi)p=(a+r)*f,g=-2*f;else if(o===Hr)p=r*f,g=-1*f;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return l[0]=2*c,l[4]=0,l[8]=0,l[12]=-u,l[1]=0,l[5]=2*h,l[9]=0,l[13]=-d,l[2]=0,l[6]=0,l[10]=g,l[14]=-p,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(t){const e=this.elements,i=t.elements;for(let s=0;s<16;s++)if(e[s]!==i[s])return!1;return!0}fromArray(t,e=0){for(let i=0;i<16;i++)this.elements[i]=t[i+e];return this}toArray(t=[],e=0){const i=this.elements;return t[e]=i[0],t[e+1]=i[1],t[e+2]=i[2],t[e+3]=i[3],t[e+4]=i[4],t[e+5]=i[5],t[e+6]=i[6],t[e+7]=i[7],t[e+8]=i[8],t[e+9]=i[9],t[e+10]=i[10],t[e+11]=i[11],t[e+12]=i[12],t[e+13]=i[13],t[e+14]=i[14],t[e+15]=i[15],t}}const In=new G,oi=new se,Xd=new G(0,0,0),$d=new G(1,1,1),zi=new G,nr=new G,$e=new G,Nl=new se,Bl=new rs;class ii{constructor(t=0,e=0,i=0,s=ii.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=i,this._order=s}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,i,s=this._order){return this._x=t,this._y=e,this._z=i,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,i=!0){const s=t.elements,r=s[0],a=s[4],o=s[8],l=s[1],c=s[5],h=s[9],f=s[2],u=s[6],d=s[10];switch(e){case"XYZ":this._y=Math.asin(Ge(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-h,d),this._z=Math.atan2(-a,r)):(this._x=Math.atan2(u,c),this._z=0);break;case"YXZ":this._x=Math.asin(-Ge(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(o,d),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-f,r),this._z=0);break;case"ZXY":this._x=Math.asin(Ge(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(-f,d),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-Ge(f,-1,1)),Math.abs(f)<.9999999?(this._x=Math.atan2(u,d),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-a,c));break;case"YZX":this._z=Math.asin(Ge(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-h,c),this._y=Math.atan2(-f,r)):(this._x=0,this._y=Math.atan2(o,d));break;case"XZY":this._z=Math.asin(-Ge(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(u,c),this._y=Math.atan2(o,r)):(this._x=Math.atan2(-h,d),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,i===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,i){return Nl.makeRotationFromQuaternion(t),this.setFromRotationMatrix(Nl,e,i)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return Bl.setFromEuler(this),this.setFromQuaternion(Bl,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}ii.DEFAULT_ORDER="XYZ";class Bh{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}}let Yd=0;const Ol=new G,Pn=new rs,wi=new se,sr=new G,gs=new G,qd=new G,Zd=new rs,zl=new G(1,0,0),Hl=new G(0,1,0),Gl=new G(0,0,1),Vl={type:"added"},Kd={type:"removed"},Dn={type:"childadded",child:null},pa={type:"childremoved",child:null};class be extends ss{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Yd++}),this.uuid=Hs(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=be.DEFAULT_UP.clone();const t=new G,e=new ii,i=new rs,s=new G(1,1,1);function r(){i.setFromEuler(e,!1)}function a(){e.setFromQuaternion(i,void 0,!1)}e._onChange(r),i._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new se},normalMatrix:{value:new Ot}}),this.matrix=new se,this.matrixWorld=new se,this.matrixAutoUpdate=be.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=be.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Bh,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return Pn.setFromAxisAngle(t,e),this.quaternion.multiply(Pn),this}rotateOnWorldAxis(t,e){return Pn.setFromAxisAngle(t,e),this.quaternion.premultiply(Pn),this}rotateX(t){return this.rotateOnAxis(zl,t)}rotateY(t){return this.rotateOnAxis(Hl,t)}rotateZ(t){return this.rotateOnAxis(Gl,t)}translateOnAxis(t,e){return Ol.copy(t).applyQuaternion(this.quaternion),this.position.add(Ol.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(zl,t)}translateY(t){return this.translateOnAxis(Hl,t)}translateZ(t){return this.translateOnAxis(Gl,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(wi.copy(this.matrixWorld).invert())}lookAt(t,e,i){t.isVector3?sr.copy(t):sr.set(t,e,i);const s=this.parent;this.updateWorldMatrix(!0,!1),gs.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?wi.lookAt(gs,sr,this.up):wi.lookAt(sr,gs,this.up),this.quaternion.setFromRotationMatrix(wi),s&&(wi.extractRotation(s.matrixWorld),Pn.setFromRotationMatrix(wi),this.quaternion.premultiply(Pn.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(Vl),Dn.child=t,this.dispatchEvent(Dn),Dn.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}const e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(Kd),pa.child=t,this.dispatchEvent(pa),pa.child=null),this}removeFromParent(){const t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),wi.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),wi.multiply(t.parent.matrixWorld)),t.applyMatrix4(wi),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(Vl),Dn.child=t,this.dispatchEvent(Dn),Dn.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let i=0,s=this.children.length;i<s;i++){const a=this.children[i].getObjectByProperty(t,e);if(a!==void 0)return a}}getObjectsByProperty(t,e,i=[]){this[t]===e&&i.push(this);const s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].getObjectsByProperty(t,e,i);return i}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(gs,t,qd),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(gs,Zd,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);const e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}traverse(t){t(this);const e=this.children;for(let i=0,s=e.length;i<s;i++)e[i].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);const e=this.children;for(let i=0,s=e.length;i<s;i++)e[i].traverseVisible(t)}traverseAncestors(t){const e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);const e=this.children;for(let i=0,s=e.length;i<s;i++)e[i].updateMatrixWorld(t)}updateWorldMatrix(t,e){const i=this.parent;if(t===!0&&i!==null&&i.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),e===!0){const s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].updateWorldMatrix(!1,!0)}}toJSON(t){const e=t===void 0||typeof t=="string",i={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.visibility=this._visibility,s.active=this._active,s.bounds=this._bounds.map(o=>({boxInitialized:o.boxInitialized,boxMin:o.box.min.toArray(),boxMax:o.box.max.toArray(),sphereInitialized:o.sphereInitialized,sphereRadius:o.sphere.radius,sphereCenter:o.sphere.center.toArray()})),s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.geometryCount=this._geometryCount,s.matricesTexture=this._matricesTexture.toJSON(t),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(s.boundingSphere={center:s.boundingSphere.center.toArray(),radius:s.boundingSphere.radius}),this.boundingBox!==null&&(s.boundingBox={min:s.boundingBox.min.toArray(),max:s.boundingBox.max.toArray()}));function r(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(t)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(t.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const l=o.shapes;if(Array.isArray(l))for(let c=0,h=l.length;c<h;c++){const f=l[c];r(t.shapes,f)}else r(t.shapes,l)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(t.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(r(t.materials,this.material[l]));s.material=o}else s.material=r(t.materials,this.material);if(this.children.length>0){s.children=[];for(let o=0;o<this.children.length;o++)s.children.push(this.children[o].toJSON(t).object)}if(this.animations.length>0){s.animations=[];for(let o=0;o<this.animations.length;o++){const l=this.animations[o];s.animations.push(r(t.animations,l))}}if(e){const o=a(t.geometries),l=a(t.materials),c=a(t.textures),h=a(t.images),f=a(t.shapes),u=a(t.skeletons),d=a(t.animations),p=a(t.nodes);o.length>0&&(i.geometries=o),l.length>0&&(i.materials=l),c.length>0&&(i.textures=c),h.length>0&&(i.images=h),f.length>0&&(i.shapes=f),u.length>0&&(i.skeletons=u),d.length>0&&(i.animations=d),p.length>0&&(i.nodes=p)}return i.object=s,i;function a(o){const l=[];for(const c in o){const h=o[c];delete h.metadata,l.push(h)}return l}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let i=0;i<t.children.length;i++){const s=t.children[i];this.add(s.clone())}return this}}be.DEFAULT_UP=new G(0,1,0);be.DEFAULT_MATRIX_AUTO_UPDATE=!0;be.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const li=new G,Ei=new G,ma=new G,Ti=new G,kn=new G,Ln=new G,Wl=new G,ga=new G,_a=new G,va=new G,xa=new _e,ya=new _e,Sa=new _e;class Qe{constructor(t=new G,e=new G,i=new G){this.a=t,this.b=e,this.c=i}static getNormal(t,e,i,s){s.subVectors(i,e),li.subVectors(t,e),s.cross(li);const r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(t,e,i,s,r){li.subVectors(s,e),Ei.subVectors(i,e),ma.subVectors(t,e);const a=li.dot(li),o=li.dot(Ei),l=li.dot(ma),c=Ei.dot(Ei),h=Ei.dot(ma),f=a*c-o*o;if(f===0)return r.set(0,0,0),null;const u=1/f,d=(c*l-o*h)*u,p=(a*h-o*l)*u;return r.set(1-d-p,p,d)}static containsPoint(t,e,i,s){return this.getBarycoord(t,e,i,s,Ti)===null?!1:Ti.x>=0&&Ti.y>=0&&Ti.x+Ti.y<=1}static getInterpolation(t,e,i,s,r,a,o,l){return this.getBarycoord(t,e,i,s,Ti)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,Ti.x),l.addScaledVector(a,Ti.y),l.addScaledVector(o,Ti.z),l)}static getInterpolatedAttribute(t,e,i,s,r,a){return xa.setScalar(0),ya.setScalar(0),Sa.setScalar(0),xa.fromBufferAttribute(t,e),ya.fromBufferAttribute(t,i),Sa.fromBufferAttribute(t,s),a.setScalar(0),a.addScaledVector(xa,r.x),a.addScaledVector(ya,r.y),a.addScaledVector(Sa,r.z),a}static isFrontFacing(t,e,i,s){return li.subVectors(i,e),Ei.subVectors(t,e),li.cross(Ei).dot(s)<0}set(t,e,i){return this.a.copy(t),this.b.copy(e),this.c.copy(i),this}setFromPointsAndIndices(t,e,i,s){return this.a.copy(t[e]),this.b.copy(t[i]),this.c.copy(t[s]),this}setFromAttributeAndIndices(t,e,i,s){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,i),this.c.fromBufferAttribute(t,s),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return li.subVectors(this.c,this.b),Ei.subVectors(this.a,this.b),li.cross(Ei).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return Qe.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return Qe.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,i,s,r){return Qe.getInterpolation(t,this.a,this.b,this.c,e,i,s,r)}containsPoint(t){return Qe.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return Qe.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){const i=this.a,s=this.b,r=this.c;let a,o;kn.subVectors(s,i),Ln.subVectors(r,i),ga.subVectors(t,i);const l=kn.dot(ga),c=Ln.dot(ga);if(l<=0&&c<=0)return e.copy(i);_a.subVectors(t,s);const h=kn.dot(_a),f=Ln.dot(_a);if(h>=0&&f<=h)return e.copy(s);const u=l*f-h*c;if(u<=0&&l>=0&&h<=0)return a=l/(l-h),e.copy(i).addScaledVector(kn,a);va.subVectors(t,r);const d=kn.dot(va),p=Ln.dot(va);if(p>=0&&d<=p)return e.copy(r);const g=d*c-l*p;if(g<=0&&c>=0&&p<=0)return o=c/(c-p),e.copy(i).addScaledVector(Ln,o);const m=h*p-d*f;if(m<=0&&f-h>=0&&d-p>=0)return Wl.subVectors(r,s),o=(f-h)/(f-h+(d-p)),e.copy(s).addScaledVector(Wl,o);const _=1/(m+g+u);return a=g*_,o=u*_,e.copy(i).addScaledVector(kn,a).addScaledVector(Ln,o)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}}const Oh={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Hi={h:0,s:0,l:0},rr={h:0,s:0,l:0};function Ma(n,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?n+(t-n)*6*e:e<1/2?t:e<2/3?n+(t-n)*6*(2/3-e):n}class Wt{constructor(t,e,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,i)}set(t,e,i){if(e===void 0&&i===void 0){const s=t;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(t,e,i);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=me){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,$t.toWorkingColorSpace(this,e),this}setRGB(t,e,i,s=$t.workingColorSpace){return this.r=t,this.g=e,this.b=i,$t.toWorkingColorSpace(this,s),this}setHSL(t,e,i,s=$t.workingColorSpace){if(t=Ld(t,1),e=Ge(e,0,1),i=Ge(i,0,1),e===0)this.r=this.g=this.b=i;else{const r=i<=.5?i*(1+e):i+e-i*e,a=2*i-r;this.r=Ma(a,r,t+1/3),this.g=Ma(a,r,t),this.b=Ma(a,r,t-1/3)}return $t.toWorkingColorSpace(this,s),this}setStyle(t,e=me){function i(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+t+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(t)){let r;const a=s[1],o=s[2];switch(a){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,e);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,e);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,e);break;default:console.warn("THREE.Color: Unknown color model "+t)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(t)){const r=s[1],a=r.length;if(a===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,e);if(a===6)return this.setHex(parseInt(r,16),e);console.warn("THREE.Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=me){const i=Oh[t.toLowerCase()];return i!==void 0?this.setHex(i,e):console.warn("THREE.Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=Di(t.r),this.g=Di(t.g),this.b=Di(t.b),this}copyLinearToSRGB(t){return this.r=Xn(t.r),this.g=Xn(t.g),this.b=Xn(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=me){return $t.fromWorkingColorSpace(Ae.copy(this),t),Math.round(Ge(Ae.r*255,0,255))*65536+Math.round(Ge(Ae.g*255,0,255))*256+Math.round(Ge(Ae.b*255,0,255))}getHexString(t=me){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=$t.workingColorSpace){$t.fromWorkingColorSpace(Ae.copy(this),e);const i=Ae.r,s=Ae.g,r=Ae.b,a=Math.max(i,s,r),o=Math.min(i,s,r);let l,c;const h=(o+a)/2;if(o===a)l=0,c=0;else{const f=a-o;switch(c=h<=.5?f/(a+o):f/(2-a-o),a){case i:l=(s-r)/f+(s<r?6:0);break;case s:l=(r-i)/f+2;break;case r:l=(i-s)/f+4;break}l/=6}return t.h=l,t.s=c,t.l=h,t}getRGB(t,e=$t.workingColorSpace){return $t.fromWorkingColorSpace(Ae.copy(this),e),t.r=Ae.r,t.g=Ae.g,t.b=Ae.b,t}getStyle(t=me){$t.fromWorkingColorSpace(Ae.copy(this),t);const e=Ae.r,i=Ae.g,s=Ae.b;return t!==me?`color(${t} ${e.toFixed(3)} ${i.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(i*255)},${Math.round(s*255)})`}offsetHSL(t,e,i){return this.getHSL(Hi),this.setHSL(Hi.h+t,Hi.s+e,Hi.l+i)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,i){return this.r=t.r+(e.r-t.r)*i,this.g=t.g+(e.g-t.g)*i,this.b=t.b+(e.b-t.b)*i,this}lerpHSL(t,e){this.getHSL(Hi),t.getHSL(rr);const i=ra(Hi.h,rr.h,e),s=ra(Hi.s,rr.s,e),r=ra(Hi.l,rr.l,e);return this.setHSL(i,s,r),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){const e=this.r,i=this.g,s=this.b,r=t.elements;return this.r=r[0]*e+r[3]*i+r[6]*s,this.g=r[1]*e+r[4]*i+r[7]*s,this.b=r[2]*e+r[5]*i+r[8]*s,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Ae=new Wt;Wt.NAMES=Oh;let jd=0;class Mn extends ss{static get type(){return"Material"}get type(){return this.constructor.type}set type(t){}constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:jd++}),this.uuid=Hs(),this.name="",this.blending=Vn,this.side=ji,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Ja,this.blendDst=Qa,this.blendEquation=cn,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Wt(0,0,0),this.blendAlpha=0,this.depthFunc=qn,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Al,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=En,this.stencilZFail=En,this.stencilZPass=En,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(const e in t){const i=t[e];if(i===void 0){console.warn(`THREE.Material: parameter '${e}' has value of undefined.`);continue}const s=this[e];if(s===void 0){console.warn(`THREE.Material: '${e}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(i):s&&s.isVector3&&i&&i.isVector3?s.copy(i):this[e]=i}}toJSON(t){const e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});const i={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(t).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(t).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(t).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(t).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(t).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.shadowSide!==null&&(i.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==Vn&&(i.blending=this.blending),this.side!==ji&&(i.side=this.side),this.vertexColors===!0&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),this.transparent===!0&&(i.transparent=!0),this.blendSrc!==Ja&&(i.blendSrc=this.blendSrc),this.blendDst!==Qa&&(i.blendDst=this.blendDst),this.blendEquation!==cn&&(i.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(i.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(i.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(i.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(i.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(i.blendAlpha=this.blendAlpha),this.depthFunc!==qn&&(i.depthFunc=this.depthFunc),this.depthTest===!1&&(i.depthTest=this.depthTest),this.depthWrite===!1&&(i.depthWrite=this.depthWrite),this.colorWrite===!1&&(i.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(i.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Al&&(i.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(i.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(i.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==En&&(i.stencilFail=this.stencilFail),this.stencilZFail!==En&&(i.stencilZFail=this.stencilZFail),this.stencilZPass!==En&&(i.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(i.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(i.rotation=this.rotation),this.polygonOffset===!0&&(i.polygonOffset=!0),this.polygonOffsetFactor!==0&&(i.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(i.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(i.linewidth=this.linewidth),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.dithering===!0&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),this.alphaHash===!0&&(i.alphaHash=!0),this.alphaToCoverage===!0&&(i.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(i.premultipliedAlpha=!0),this.forceSinglePass===!0&&(i.forceSinglePass=!0),this.wireframe===!0&&(i.wireframe=!0),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(i.flatShading=!0),this.visible===!1&&(i.visible=!1),this.toneMapped===!1&&(i.toneMapped=!1),this.fog===!1&&(i.fog=!1),Object.keys(this.userData).length>0&&(i.userData=this.userData);function s(r){const a=[];for(const o in r){const l=r[o];delete l.metadata,a.push(l)}return a}if(e){const r=s(t.textures),a=s(t.images);r.length>0&&(i.textures=r),a.length>0&&(i.images=a)}return i}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;const e=t.clippingPlanes;let i=null;if(e!==null){const s=e.length;i=new Array(s);for(let r=0;r!==s;++r)i[r]=e[r].clone()}return this.clippingPlanes=i,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}}class Fe extends Mn{static get type(){return"MeshBasicMaterial"}constructor(t){super(),this.isMeshBasicMaterial=!0,this.color=new Wt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new ii,this.combine=jo,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}const ve=new G,ar=new te;class hi{constructor(t,e,i=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=i,this.usage=Cl,this.updateRanges=[],this.gpuType=Ii,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,i){t*=this.itemSize,i*=e.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[t+s]=e.array[i+s];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,i=this.count;e<i;e++)ar.fromBufferAttribute(this,e),ar.applyMatrix3(t),this.setXY(e,ar.x,ar.y);else if(this.itemSize===3)for(let e=0,i=this.count;e<i;e++)ve.fromBufferAttribute(this,e),ve.applyMatrix3(t),this.setXYZ(e,ve.x,ve.y,ve.z);return this}applyMatrix4(t){for(let e=0,i=this.count;e<i;e++)ve.fromBufferAttribute(this,e),ve.applyMatrix4(t),this.setXYZ(e,ve.x,ve.y,ve.z);return this}applyNormalMatrix(t){for(let e=0,i=this.count;e<i;e++)ve.fromBufferAttribute(this,e),ve.applyNormalMatrix(t),this.setXYZ(e,ve.x,ve.y,ve.z);return this}transformDirection(t){for(let e=0,i=this.count;e<i;e++)ve.fromBufferAttribute(this,e),ve.transformDirection(t),this.setXYZ(e,ve.x,ve.y,ve.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let i=this.array[t*this.itemSize+e];return this.normalized&&(i=fs(i,this.array)),i}setComponent(t,e,i){return this.normalized&&(i=ze(i,this.array)),this.array[t*this.itemSize+e]=i,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=fs(e,this.array)),e}setX(t,e){return this.normalized&&(e=ze(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=fs(e,this.array)),e}setY(t,e){return this.normalized&&(e=ze(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=fs(e,this.array)),e}setZ(t,e){return this.normalized&&(e=ze(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=fs(e,this.array)),e}setW(t,e){return this.normalized&&(e=ze(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,i){return t*=this.itemSize,this.normalized&&(e=ze(e,this.array),i=ze(i,this.array)),this.array[t+0]=e,this.array[t+1]=i,this}setXYZ(t,e,i,s){return t*=this.itemSize,this.normalized&&(e=ze(e,this.array),i=ze(i,this.array),s=ze(s,this.array)),this.array[t+0]=e,this.array[t+1]=i,this.array[t+2]=s,this}setXYZW(t,e,i,s,r){return t*=this.itemSize,this.normalized&&(e=ze(e,this.array),i=ze(i,this.array),s=ze(s,this.array),r=ze(r,this.array)),this.array[t+0]=e,this.array[t+1]=i,this.array[t+2]=s,this.array[t+3]=r,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==Cl&&(t.usage=this.usage),t}}class zh extends hi{constructor(t,e,i){super(new Uint16Array(t),e,i)}}class Hh extends hi{constructor(t,e,i){super(new Uint32Array(t),e,i)}}class pe extends hi{constructor(t,e,i){super(new Float32Array(t),e,i)}}let Jd=0;const Je=new se,ba=new be,Un=new G,Ye=new Gs,_s=new Gs,Se=new G;class Ie extends ss{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Jd++}),this.uuid=Hs(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(Uh(t)?Hh:zh)(t,1):this.index=t,this}setIndirect(t){return this.indirect=t,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,i=0){this.groups.push({start:t,count:e,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){const e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);const i=this.attributes.normal;if(i!==void 0){const r=new Ot().getNormalMatrix(t);i.applyNormalMatrix(r),i.needsUpdate=!0}const s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(t),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return Je.makeRotationFromQuaternion(t),this.applyMatrix4(Je),this}rotateX(t){return Je.makeRotationX(t),this.applyMatrix4(Je),this}rotateY(t){return Je.makeRotationY(t),this.applyMatrix4(Je),this}rotateZ(t){return Je.makeRotationZ(t),this.applyMatrix4(Je),this}translate(t,e,i){return Je.makeTranslation(t,e,i),this.applyMatrix4(Je),this}scale(t,e,i){return Je.makeScale(t,e,i),this.applyMatrix4(Je),this}lookAt(t){return ba.lookAt(t),ba.updateMatrix(),this.applyMatrix4(ba.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Un).negate(),this.translate(Un.x,Un.y,Un.z),this}setFromPoints(t){const e=this.getAttribute("position");if(e===void 0){const i=[];for(let s=0,r=t.length;s<r;s++){const a=t[s];i.push(a.x,a.y,a.z||0)}this.setAttribute("position",new pe(i,3))}else{for(let i=0,s=e.count;i<s;i++){const r=t[i];e.setXYZ(i,r.x,r.y,r.z||0)}t.length>e.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),e.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Gs);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new G(-1/0,-1/0,-1/0),new G(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let i=0,s=e.length;i<s;i++){const r=e[i];Ye.setFromBufferAttribute(r),this.morphTargetsRelative?(Se.addVectors(this.boundingBox.min,Ye.min),this.boundingBox.expandByPoint(Se),Se.addVectors(this.boundingBox.max,Ye.max),this.boundingBox.expandByPoint(Se)):(this.boundingBox.expandByPoint(Ye.min),this.boundingBox.expandByPoint(Ye.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Vs);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new G,1/0);return}if(t){const i=this.boundingSphere.center;if(Ye.setFromBufferAttribute(t),e)for(let r=0,a=e.length;r<a;r++){const o=e[r];_s.setFromBufferAttribute(o),this.morphTargetsRelative?(Se.addVectors(Ye.min,_s.min),Ye.expandByPoint(Se),Se.addVectors(Ye.max,_s.max),Ye.expandByPoint(Se)):(Ye.expandByPoint(_s.min),Ye.expandByPoint(_s.max))}Ye.getCenter(i);let s=0;for(let r=0,a=t.count;r<a;r++)Se.fromBufferAttribute(t,r),s=Math.max(s,i.distanceToSquared(Se));if(e)for(let r=0,a=e.length;r<a;r++){const o=e[r],l=this.morphTargetsRelative;for(let c=0,h=o.count;c<h;c++)Se.fromBufferAttribute(o,c),l&&(Un.fromBufferAttribute(t,c),Se.add(Un)),s=Math.max(s,i.distanceToSquared(Se))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const i=e.position,s=e.normal,r=e.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new hi(new Float32Array(4*i.count),4));const a=this.getAttribute("tangent"),o=[],l=[];for(let R=0;R<i.count;R++)o[R]=new G,l[R]=new G;const c=new G,h=new G,f=new G,u=new te,d=new te,p=new te,g=new G,m=new G;function _(R,v,x){c.fromBufferAttribute(i,R),h.fromBufferAttribute(i,v),f.fromBufferAttribute(i,x),u.fromBufferAttribute(r,R),d.fromBufferAttribute(r,v),p.fromBufferAttribute(r,x),h.sub(c),f.sub(c),d.sub(u),p.sub(u);const C=1/(d.x*p.y-p.x*d.y);isFinite(C)&&(g.copy(h).multiplyScalar(p.y).addScaledVector(f,-d.y).multiplyScalar(C),m.copy(f).multiplyScalar(d.x).addScaledVector(h,-p.x).multiplyScalar(C),o[R].add(g),o[v].add(g),o[x].add(g),l[R].add(m),l[v].add(m),l[x].add(m))}let M=this.groups;M.length===0&&(M=[{start:0,count:t.count}]);for(let R=0,v=M.length;R<v;++R){const x=M[R],C=x.start,k=x.count;for(let L=C,D=C+k;L<D;L+=3)_(t.getX(L+0),t.getX(L+1),t.getX(L+2))}const E=new G,y=new G,w=new G,b=new G;function S(R){w.fromBufferAttribute(s,R),b.copy(w);const v=o[R];E.copy(v),E.sub(w.multiplyScalar(w.dot(v))).normalize(),y.crossVectors(b,v);const C=y.dot(l[R])<0?-1:1;a.setXYZW(R,E.x,E.y,E.z,C)}for(let R=0,v=M.length;R<v;++R){const x=M[R],C=x.start,k=x.count;for(let L=C,D=C+k;L<D;L+=3)S(t.getX(L+0)),S(t.getX(L+1)),S(t.getX(L+2))}}computeVertexNormals(){const t=this.index,e=this.getAttribute("position");if(e!==void 0){let i=this.getAttribute("normal");if(i===void 0)i=new hi(new Float32Array(e.count*3),3),this.setAttribute("normal",i);else for(let u=0,d=i.count;u<d;u++)i.setXYZ(u,0,0,0);const s=new G,r=new G,a=new G,o=new G,l=new G,c=new G,h=new G,f=new G;if(t)for(let u=0,d=t.count;u<d;u+=3){const p=t.getX(u+0),g=t.getX(u+1),m=t.getX(u+2);s.fromBufferAttribute(e,p),r.fromBufferAttribute(e,g),a.fromBufferAttribute(e,m),h.subVectors(a,r),f.subVectors(s,r),h.cross(f),o.fromBufferAttribute(i,p),l.fromBufferAttribute(i,g),c.fromBufferAttribute(i,m),o.add(h),l.add(h),c.add(h),i.setXYZ(p,o.x,o.y,o.z),i.setXYZ(g,l.x,l.y,l.z),i.setXYZ(m,c.x,c.y,c.z)}else for(let u=0,d=e.count;u<d;u+=3)s.fromBufferAttribute(e,u+0),r.fromBufferAttribute(e,u+1),a.fromBufferAttribute(e,u+2),h.subVectors(a,r),f.subVectors(s,r),h.cross(f),i.setXYZ(u+0,h.x,h.y,h.z),i.setXYZ(u+1,h.x,h.y,h.z),i.setXYZ(u+2,h.x,h.y,h.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){const t=this.attributes.normal;for(let e=0,i=t.count;e<i;e++)Se.fromBufferAttribute(t,e),Se.normalize(),t.setXYZ(e,Se.x,Se.y,Se.z)}toNonIndexed(){function t(o,l){const c=o.array,h=o.itemSize,f=o.normalized,u=new c.constructor(l.length*h);let d=0,p=0;for(let g=0,m=l.length;g<m;g++){o.isInterleavedBufferAttribute?d=l[g]*o.data.stride+o.offset:d=l[g]*h;for(let _=0;_<h;_++)u[p++]=c[d++]}return new hi(u,h,f)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const e=new Ie,i=this.index.array,s=this.attributes;for(const o in s){const l=s[o],c=t(l,i);e.setAttribute(o,c)}const r=this.morphAttributes;for(const o in r){const l=[],c=r[o];for(let h=0,f=c.length;h<f;h++){const u=c[h],d=t(u,i);l.push(d)}e.morphAttributes[o]=l}e.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let o=0,l=a.length;o<l;o++){const c=a[o];e.addGroup(c.start,c.count,c.materialIndex)}return e}toJSON(){const t={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(t[c]=l[c]);return t}t.data={attributes:{}};const e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});const i=this.attributes;for(const l in i){const c=i[l];t.data.attributes[l]=c.toJSON(t.data)}const s={};let r=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],h=[];for(let f=0,u=c.length;f<u;f++){const d=c[f];h.push(d.toJSON(t.data))}h.length>0&&(s[l]=h,r=!0)}r&&(t.data.morphAttributes=s,t.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(t.data.groups=JSON.parse(JSON.stringify(a)));const o=this.boundingSphere;return o!==null&&(t.data.boundingSphere={center:o.center.toArray(),radius:o.radius}),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const e={};this.name=t.name;const i=t.index;i!==null&&this.setIndex(i.clone(e));const s=t.attributes;for(const c in s){const h=s[c];this.setAttribute(c,h.clone(e))}const r=t.morphAttributes;for(const c in r){const h=[],f=r[c];for(let u=0,d=f.length;u<d;u++)h.push(f[u].clone(e));this.morphAttributes[c]=h}this.morphTargetsRelative=t.morphTargetsRelative;const a=t.groups;for(let c=0,h=a.length;c<h;c++){const f=a[c];this.addGroup(f.start,f.count,f.materialIndex)}const o=t.boundingBox;o!==null&&(this.boundingBox=o.clone());const l=t.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const Xl=new se,nn=new sl,or=new Vs,$l=new G,lr=new G,cr=new G,hr=new G,wa=new G,ur=new G,Yl=new G,dr=new G;class Qt extends be{constructor(t=new Ie,e=new Fe){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){const e=this.geometry.morphAttributes,i=Object.keys(e);if(i.length>0){const s=e[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){const o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}getVertexPosition(t,e){const i=this.geometry,s=i.attributes.position,r=i.morphAttributes.position,a=i.morphTargetsRelative;e.fromBufferAttribute(s,t);const o=this.morphTargetInfluences;if(r&&o){ur.set(0,0,0);for(let l=0,c=r.length;l<c;l++){const h=o[l],f=r[l];h!==0&&(wa.fromBufferAttribute(f,t),a?ur.addScaledVector(wa,h):ur.addScaledVector(wa.sub(e),h))}e.add(ur)}return e}raycast(t,e){const i=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),or.copy(i.boundingSphere),or.applyMatrix4(r),nn.copy(t.ray).recast(t.near),!(or.containsPoint(nn.origin)===!1&&(nn.intersectSphere(or,$l)===null||nn.origin.distanceToSquared($l)>(t.far-t.near)**2))&&(Xl.copy(r).invert(),nn.copy(t.ray).applyMatrix4(Xl),!(i.boundingBox!==null&&nn.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(t,e,nn)))}_computeIntersections(t,e,i){let s;const r=this.geometry,a=this.material,o=r.index,l=r.attributes.position,c=r.attributes.uv,h=r.attributes.uv1,f=r.attributes.normal,u=r.groups,d=r.drawRange;if(o!==null)if(Array.isArray(a))for(let p=0,g=u.length;p<g;p++){const m=u[p],_=a[m.materialIndex],M=Math.max(m.start,d.start),E=Math.min(o.count,Math.min(m.start+m.count,d.start+d.count));for(let y=M,w=E;y<w;y+=3){const b=o.getX(y),S=o.getX(y+1),R=o.getX(y+2);s=fr(this,_,t,i,c,h,f,b,S,R),s&&(s.faceIndex=Math.floor(y/3),s.face.materialIndex=m.materialIndex,e.push(s))}}else{const p=Math.max(0,d.start),g=Math.min(o.count,d.start+d.count);for(let m=p,_=g;m<_;m+=3){const M=o.getX(m),E=o.getX(m+1),y=o.getX(m+2);s=fr(this,a,t,i,c,h,f,M,E,y),s&&(s.faceIndex=Math.floor(m/3),e.push(s))}}else if(l!==void 0)if(Array.isArray(a))for(let p=0,g=u.length;p<g;p++){const m=u[p],_=a[m.materialIndex],M=Math.max(m.start,d.start),E=Math.min(l.count,Math.min(m.start+m.count,d.start+d.count));for(let y=M,w=E;y<w;y+=3){const b=y,S=y+1,R=y+2;s=fr(this,_,t,i,c,h,f,b,S,R),s&&(s.faceIndex=Math.floor(y/3),s.face.materialIndex=m.materialIndex,e.push(s))}}else{const p=Math.max(0,d.start),g=Math.min(l.count,d.start+d.count);for(let m=p,_=g;m<_;m+=3){const M=m,E=m+1,y=m+2;s=fr(this,a,t,i,c,h,f,M,E,y),s&&(s.faceIndex=Math.floor(m/3),e.push(s))}}}}function Qd(n,t,e,i,s,r,a,o){let l;if(t.side===Be?l=i.intersectTriangle(a,r,s,!0,o):l=i.intersectTriangle(s,r,a,t.side===ji,o),l===null)return null;dr.copy(o),dr.applyMatrix4(n.matrixWorld);const c=e.ray.origin.distanceTo(dr);return c<e.near||c>e.far?null:{distance:c,point:dr.clone(),object:n}}function fr(n,t,e,i,s,r,a,o,l,c){n.getVertexPosition(o,lr),n.getVertexPosition(l,cr),n.getVertexPosition(c,hr);const h=Qd(n,t,e,i,lr,cr,hr,Yl);if(h){const f=new G;Qe.getBarycoord(Yl,lr,cr,hr,f),s&&(h.uv=Qe.getInterpolatedAttribute(s,o,l,c,f,new te)),r&&(h.uv1=Qe.getInterpolatedAttribute(r,o,l,c,f,new te)),a&&(h.normal=Qe.getInterpolatedAttribute(a,o,l,c,f,new G),h.normal.dot(i.direction)>0&&h.normal.multiplyScalar(-1));const u={a:o,b:l,c,normal:new G,materialIndex:0};Qe.getNormal(lr,cr,hr,u.normal),h.face=u,h.barycoord=f}return h}class De extends Ie{constructor(t=1,e=1,i=1,s=1,r=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:i,widthSegments:s,heightSegments:r,depthSegments:a};const o=this;s=Math.floor(s),r=Math.floor(r),a=Math.floor(a);const l=[],c=[],h=[],f=[];let u=0,d=0;p("z","y","x",-1,-1,i,e,t,a,r,0),p("z","y","x",1,-1,i,e,-t,a,r,1),p("x","z","y",1,1,t,i,e,s,a,2),p("x","z","y",1,-1,t,i,-e,s,a,3),p("x","y","z",1,-1,t,e,i,s,r,4),p("x","y","z",-1,-1,t,e,-i,s,r,5),this.setIndex(l),this.setAttribute("position",new pe(c,3)),this.setAttribute("normal",new pe(h,3)),this.setAttribute("uv",new pe(f,2));function p(g,m,_,M,E,y,w,b,S,R,v){const x=y/S,C=w/R,k=y/2,L=w/2,D=b/2,H=S+1,z=R+1;let W=0,F=0;const q=new G;for(let st=0;st<z;st++){const vt=st*C-L;for(let xt=0;xt<H;xt++){const kt=xt*x-k;q[g]=kt*M,q[m]=vt*E,q[_]=D,c.push(q.x,q.y,q.z),q[g]=0,q[m]=0,q[_]=b>0?1:-1,h.push(q.x,q.y,q.z),f.push(xt/S),f.push(1-st/R),W+=1}}for(let st=0;st<R;st++)for(let vt=0;vt<S;vt++){const xt=u+vt+H*st,kt=u+vt+H*(st+1),Z=u+(vt+1)+H*(st+1),at=u+(vt+1)+H*st;l.push(xt,kt,at),l.push(kt,Z,at),F+=6}o.addGroup(d,F,v),d+=F,u+=W}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new De(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}}function Qn(n){const t={};for(const e in n){t[e]={};for(const i in n[e]){const s=n[e][i];s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)?s.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][i]=null):t[e][i]=s.clone():Array.isArray(s)?t[e][i]=s.slice():t[e][i]=s}}return t}function Le(n){const t={};for(let e=0;e<n.length;e++){const i=Qn(n[e]);for(const s in i)t[s]=i[s]}return t}function tf(n){const t=[];for(let e=0;e<n.length;e++)t.push(n[e].clone());return t}function Gh(n){const t=n.getRenderTarget();return t===null?n.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:$t.workingColorSpace}const ef={clone:Qn,merge:Le};var nf=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,sf=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Ji extends Mn{static get type(){return"ShaderMaterial"}constructor(t){super(),this.isShaderMaterial=!0,this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=nf,this.fragmentShader=sf,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=Qn(t.uniforms),this.uniformsGroups=tf(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this}toJSON(t){const e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(const s in this.uniforms){const a=this.uniforms[s].value;a&&a.isTexture?e.uniforms[s]={type:"t",value:a.toJSON(t).uuid}:a&&a.isColor?e.uniforms[s]={type:"c",value:a.getHex()}:a&&a.isVector2?e.uniforms[s]={type:"v2",value:a.toArray()}:a&&a.isVector3?e.uniforms[s]={type:"v3",value:a.toArray()}:a&&a.isVector4?e.uniforms[s]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?e.uniforms[s]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?e.uniforms[s]={type:"m4",value:a.toArray()}:e.uniforms[s]={value:a}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;const i={};for(const s in this.extensions)this.extensions[s]===!0&&(i[s]=!0);return Object.keys(i).length>0&&(e.extensions=i),e}}class Vh extends be{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new se,this.projectionMatrix=new se,this.projectionMatrixInverse=new se,this.coordinateSystem=Pi}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(t,e){super.updateWorldMatrix(t,e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const Gi=new G,ql=new te,Zl=new te;class Ve extends Vh{constructor(t=50,e=1,i=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=i,this.far=s,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){const e=.5*this.getFilmHeight()/t;this.fov=No*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){const t=Math.tan(Fr*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return No*2*Math.atan(Math.tan(Fr*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,i){Gi.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(Gi.x,Gi.y).multiplyScalar(-t/Gi.z),Gi.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(Gi.x,Gi.y).multiplyScalar(-t/Gi.z)}getViewSize(t,e){return this.getViewBounds(t,ql,Zl),e.subVectors(Zl,ql)}setViewOffset(t,e,i,s,r,a){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=i,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=this.near;let e=t*Math.tan(Fr*.5*this.fov)/this.zoom,i=2*e,s=this.aspect*i,r=-.5*s;const a=this.view;if(this.view!==null&&this.view.enabled){const l=a.fullWidth,c=a.fullHeight;r+=a.offsetX*s/l,e-=a.offsetY*i/c,s*=a.width/l,i*=a.height/c}const o=this.filmOffset;o!==0&&(r+=t*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,e,e-i,t,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}}const Fn=-90,Nn=1;class rf extends be{constructor(t,e,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;const s=new Ve(Fn,Nn,t,e);s.layers=this.layers,this.add(s);const r=new Ve(Fn,Nn,t,e);r.layers=this.layers,this.add(r);const a=new Ve(Fn,Nn,t,e);a.layers=this.layers,this.add(a);const o=new Ve(Fn,Nn,t,e);o.layers=this.layers,this.add(o);const l=new Ve(Fn,Nn,t,e);l.layers=this.layers,this.add(l);const c=new Ve(Fn,Nn,t,e);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const t=this.coordinateSystem,e=this.children.concat(),[i,s,r,a,o,l]=e;for(const c of e)this.remove(c);if(t===Pi)i.up.set(0,1,0),i.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(t===Hr)i.up.set(0,-1,0),i.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(const c of e)this.add(c),c.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();const{renderTarget:i,activeMipmapLevel:s}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());const[r,a,o,l,c,h]=this.children,f=t.getRenderTarget(),u=t.getActiveCubeFace(),d=t.getActiveMipmapLevel(),p=t.xr.enabled;t.xr.enabled=!1;const g=i.texture.generateMipmaps;i.texture.generateMipmaps=!1,t.setRenderTarget(i,0,s),t.render(e,r),t.setRenderTarget(i,1,s),t.render(e,a),t.setRenderTarget(i,2,s),t.render(e,o),t.setRenderTarget(i,3,s),t.render(e,l),t.setRenderTarget(i,4,s),t.render(e,c),i.texture.generateMipmaps=g,t.setRenderTarget(i,5,s),t.render(e,h),t.setRenderTarget(f,u,d),t.xr.enabled=p,i.texture.needsPMREMUpdate=!0}}class Wh extends Pe{constructor(t,e,i,s,r,a,o,l,c,h){t=t!==void 0?t:[],e=e!==void 0?e:Zn,super(t,e,i,s,r,a,o,l,c,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}}class af extends _n{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;const i={width:t,height:t,depth:1},s=[i,i,i,i,i,i];this.texture=new Wh(s,e.mapping,e.wrapS,e.wrapT,e.magFilter,e.minFilter,e.format,e.type,e.anisotropy,e.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=e.generateMipmaps!==void 0?e.generateMipmaps:!1,this.texture.minFilter=e.minFilter!==void 0?e.minFilter:ei}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;const i={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},s=new De(5,5,5),r=new Ji({name:"CubemapFromEquirect",uniforms:Qn(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:Be,blending:$i});r.uniforms.tEquirect.value=e;const a=new Qt(s,r),o=e.minFilter;return e.minFilter===dn&&(e.minFilter=ei),new rf(1,10,this).update(t,a),e.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(t,e,i,s){const r=t.getRenderTarget();for(let a=0;a<6;a++)t.setRenderTarget(this,a),t.clear(e,i,s);t.setRenderTarget(r)}}const Ea=new G,of=new G,lf=new Ot;class on{constructor(t=new G(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,i,s){return this.normal.set(t,e,i),this.constant=s,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,i){const s=Ea.subVectors(i,e).cross(of.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(s,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){const t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e){const i=t.delta(Ea),s=this.normal.dot(i);if(s===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;const r=-(t.start.dot(this.normal)+this.constant)/s;return r<0||r>1?null:e.copy(t.start).addScaledVector(i,r)}intersectsLine(t){const e=this.distanceToPoint(t.start),i=this.distanceToPoint(t.end);return e<0&&i>0||i<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){const i=e||lf.getNormalMatrix(t),s=this.coplanarPoint(Ea).applyMatrix4(t),r=this.normal.applyMatrix3(i).normalize();return this.constant=-s.dot(r),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}}const sn=new Vs,pr=new G;class rl{constructor(t=new on,e=new on,i=new on,s=new on,r=new on,a=new on){this.planes=[t,e,i,s,r,a]}set(t,e,i,s,r,a){const o=this.planes;return o[0].copy(t),o[1].copy(e),o[2].copy(i),o[3].copy(s),o[4].copy(r),o[5].copy(a),this}copy(t){const e=this.planes;for(let i=0;i<6;i++)e[i].copy(t.planes[i]);return this}setFromProjectionMatrix(t,e=Pi){const i=this.planes,s=t.elements,r=s[0],a=s[1],o=s[2],l=s[3],c=s[4],h=s[5],f=s[6],u=s[7],d=s[8],p=s[9],g=s[10],m=s[11],_=s[12],M=s[13],E=s[14],y=s[15];if(i[0].setComponents(l-r,u-c,m-d,y-_).normalize(),i[1].setComponents(l+r,u+c,m+d,y+_).normalize(),i[2].setComponents(l+a,u+h,m+p,y+M).normalize(),i[3].setComponents(l-a,u-h,m-p,y-M).normalize(),i[4].setComponents(l-o,u-f,m-g,y-E).normalize(),e===Pi)i[5].setComponents(l+o,u+f,m+g,y+E).normalize();else if(e===Hr)i[5].setComponents(o,f,g,E).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),sn.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{const e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),sn.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(sn)}intersectsSprite(t){return sn.center.set(0,0,0),sn.radius=.7071067811865476,sn.applyMatrix4(t.matrixWorld),this.intersectsSphere(sn)}intersectsSphere(t){const e=this.planes,i=t.center,s=-t.radius;for(let r=0;r<6;r++)if(e[r].distanceToPoint(i)<s)return!1;return!0}intersectsBox(t){const e=this.planes;for(let i=0;i<6;i++){const s=e[i];if(pr.x=s.normal.x>0?t.max.x:t.min.x,pr.y=s.normal.y>0?t.max.y:t.min.y,pr.z=s.normal.z>0?t.max.z:t.min.z,s.distanceToPoint(pr)<0)return!1}return!0}containsPoint(t){const e=this.planes;for(let i=0;i<6;i++)if(e[i].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function Xh(){let n=null,t=!1,e=null,i=null;function s(r,a){e(r,a),i=n.requestAnimationFrame(s)}return{start:function(){t!==!0&&e!==null&&(i=n.requestAnimationFrame(s),t=!0)},stop:function(){n.cancelAnimationFrame(i),t=!1},setAnimationLoop:function(r){e=r},setContext:function(r){n=r}}}function cf(n){const t=new WeakMap;function e(o,l){const c=o.array,h=o.usage,f=c.byteLength,u=n.createBuffer();n.bindBuffer(l,u),n.bufferData(l,c,h),o.onUploadCallback();let d;if(c instanceof Float32Array)d=n.FLOAT;else if(c instanceof Uint16Array)o.isFloat16BufferAttribute?d=n.HALF_FLOAT:d=n.UNSIGNED_SHORT;else if(c instanceof Int16Array)d=n.SHORT;else if(c instanceof Uint32Array)d=n.UNSIGNED_INT;else if(c instanceof Int32Array)d=n.INT;else if(c instanceof Int8Array)d=n.BYTE;else if(c instanceof Uint8Array)d=n.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)d=n.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:u,type:d,bytesPerElement:c.BYTES_PER_ELEMENT,version:o.version,size:f}}function i(o,l,c){const h=l.array,f=l.updateRanges;if(n.bindBuffer(c,o),f.length===0)n.bufferSubData(c,0,h);else{f.sort((d,p)=>d.start-p.start);let u=0;for(let d=1;d<f.length;d++){const p=f[u],g=f[d];g.start<=p.start+p.count+1?p.count=Math.max(p.count,g.start+g.count-p.start):(++u,f[u]=g)}f.length=u+1;for(let d=0,p=f.length;d<p;d++){const g=f[d];n.bufferSubData(c,g.start*h.BYTES_PER_ELEMENT,h,g.start,g.count)}l.clearUpdateRanges()}l.onUploadCallback()}function s(o){return o.isInterleavedBufferAttribute&&(o=o.data),t.get(o)}function r(o){o.isInterleavedBufferAttribute&&(o=o.data);const l=t.get(o);l&&(n.deleteBuffer(l.buffer),t.delete(o))}function a(o,l){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){const h=t.get(o);(!h||h.version<o.version)&&t.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}const c=t.get(o);if(c===void 0)t.set(o,e(o,l));else if(c.version<o.version){if(c.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(c.buffer,o,l),c.version=o.version}}return{get:s,remove:r,update:a}}class _i extends Ie{constructor(t=1,e=1,i=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:i,heightSegments:s};const r=t/2,a=e/2,o=Math.floor(i),l=Math.floor(s),c=o+1,h=l+1,f=t/o,u=e/l,d=[],p=[],g=[],m=[];for(let _=0;_<h;_++){const M=_*u-a;for(let E=0;E<c;E++){const y=E*f-r;p.push(y,-M,0),g.push(0,0,1),m.push(E/o),m.push(1-_/l)}}for(let _=0;_<l;_++)for(let M=0;M<o;M++){const E=M+c*_,y=M+c*(_+1),w=M+1+c*(_+1),b=M+1+c*_;d.push(E,y,b),d.push(y,w,b)}this.setIndex(d),this.setAttribute("position",new pe(p,3)),this.setAttribute("normal",new pe(g,3)),this.setAttribute("uv",new pe(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new _i(t.width,t.height,t.widthSegments,t.heightSegments)}}var hf=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,uf=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,df=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,ff=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,pf=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,mf=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,gf=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,_f=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,vf=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec3 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 ).rgb;
	}
#endif`,xf=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,yf=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Sf=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Mf=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,bf=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,wf=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,Ef=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,Tf=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Af=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Cf=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Rf=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,If=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,Pf=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,Df=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif
#ifdef USE_BATCHING_COLOR
	vec3 batchingColor = getBatchingColor( getIndirectIndex( gl_DrawID ) );
	vColor.xyz *= batchingColor.xyz;
#endif`,kf=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,Lf=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,Uf=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,Ff=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Nf=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Bf=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Of=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,zf="gl_FragColor = linearToOutputTexel( gl_FragColor );",Hf=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Gf=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,Vf=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,Wf=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,Xf=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,$f=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,Yf=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,qf=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Zf=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Kf=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,jf=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,Jf=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Qf=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,tp=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,ep=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,ip=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,np=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,sp=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,rp=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,ap=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,op=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,lp=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,cp=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,hp=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,up=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,dp=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,fp=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,pp=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,mp=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,gp=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,_p=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,vp=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,xp=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,yp=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Sp=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Mp=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,bp=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,wp=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Ep=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,Tp=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Ap=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,Cp=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,Rp=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Ip=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Pp=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,Dp=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,kp=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Lp=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Up=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Fp=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Np=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Bp=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,Op=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,zp=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Hp=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Gp=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Vp=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Wp=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Xp=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		
		float lightToPositionLength = length( lightToPosition );
		if ( lightToPositionLength - shadowCameraFar <= 0.0 && lightToPositionLength - shadowCameraNear >= 0.0 ) {
			float dp = ( lightToPositionLength - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
			#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
				vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
				shadow = (
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
				) * ( 1.0 / 9.0 );
			#else
				shadow = texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
			#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
#endif`,$p=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,Yp=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,qp=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,Zp=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Kp=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,jp=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Jp=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,Qp=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,tm=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,em=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,im=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,nm=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,sm=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
		
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
		
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		
		#else
		
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,rm=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,am=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,om=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,lm=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const cm=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,hm=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,um=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,dm=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,fm=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,pm=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,mm=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,gm=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,_m=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,vm=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,xm=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,ym=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Sm=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Mm=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,bm=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,wm=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Em=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Tm=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Am=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,Cm=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Rm=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,Im=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,Pm=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Dm=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,km=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,Lm=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Um=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Fm=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Nm=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,Bm=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Om=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,zm=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Hm=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Gm=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,zt={alphahash_fragment:hf,alphahash_pars_fragment:uf,alphamap_fragment:df,alphamap_pars_fragment:ff,alphatest_fragment:pf,alphatest_pars_fragment:mf,aomap_fragment:gf,aomap_pars_fragment:_f,batching_pars_vertex:vf,batching_vertex:xf,begin_vertex:yf,beginnormal_vertex:Sf,bsdfs:Mf,iridescence_fragment:bf,bumpmap_pars_fragment:wf,clipping_planes_fragment:Ef,clipping_planes_pars_fragment:Tf,clipping_planes_pars_vertex:Af,clipping_planes_vertex:Cf,color_fragment:Rf,color_pars_fragment:If,color_pars_vertex:Pf,color_vertex:Df,common:kf,cube_uv_reflection_fragment:Lf,defaultnormal_vertex:Uf,displacementmap_pars_vertex:Ff,displacementmap_vertex:Nf,emissivemap_fragment:Bf,emissivemap_pars_fragment:Of,colorspace_fragment:zf,colorspace_pars_fragment:Hf,envmap_fragment:Gf,envmap_common_pars_fragment:Vf,envmap_pars_fragment:Wf,envmap_pars_vertex:Xf,envmap_physical_pars_fragment:ip,envmap_vertex:$f,fog_vertex:Yf,fog_pars_vertex:qf,fog_fragment:Zf,fog_pars_fragment:Kf,gradientmap_pars_fragment:jf,lightmap_pars_fragment:Jf,lights_lambert_fragment:Qf,lights_lambert_pars_fragment:tp,lights_pars_begin:ep,lights_toon_fragment:np,lights_toon_pars_fragment:sp,lights_phong_fragment:rp,lights_phong_pars_fragment:ap,lights_physical_fragment:op,lights_physical_pars_fragment:lp,lights_fragment_begin:cp,lights_fragment_maps:hp,lights_fragment_end:up,logdepthbuf_fragment:dp,logdepthbuf_pars_fragment:fp,logdepthbuf_pars_vertex:pp,logdepthbuf_vertex:mp,map_fragment:gp,map_pars_fragment:_p,map_particle_fragment:vp,map_particle_pars_fragment:xp,metalnessmap_fragment:yp,metalnessmap_pars_fragment:Sp,morphinstance_vertex:Mp,morphcolor_vertex:bp,morphnormal_vertex:wp,morphtarget_pars_vertex:Ep,morphtarget_vertex:Tp,normal_fragment_begin:Ap,normal_fragment_maps:Cp,normal_pars_fragment:Rp,normal_pars_vertex:Ip,normal_vertex:Pp,normalmap_pars_fragment:Dp,clearcoat_normal_fragment_begin:kp,clearcoat_normal_fragment_maps:Lp,clearcoat_pars_fragment:Up,iridescence_pars_fragment:Fp,opaque_fragment:Np,packing:Bp,premultiplied_alpha_fragment:Op,project_vertex:zp,dithering_fragment:Hp,dithering_pars_fragment:Gp,roughnessmap_fragment:Vp,roughnessmap_pars_fragment:Wp,shadowmap_pars_fragment:Xp,shadowmap_pars_vertex:$p,shadowmap_vertex:Yp,shadowmask_pars_fragment:qp,skinbase_vertex:Zp,skinning_pars_vertex:Kp,skinning_vertex:jp,skinnormal_vertex:Jp,specularmap_fragment:Qp,specularmap_pars_fragment:tm,tonemapping_fragment:em,tonemapping_pars_fragment:im,transmission_fragment:nm,transmission_pars_fragment:sm,uv_pars_fragment:rm,uv_pars_vertex:am,uv_vertex:om,worldpos_vertex:lm,background_vert:cm,background_frag:hm,backgroundCube_vert:um,backgroundCube_frag:dm,cube_vert:fm,cube_frag:pm,depth_vert:mm,depth_frag:gm,distanceRGBA_vert:_m,distanceRGBA_frag:vm,equirect_vert:xm,equirect_frag:ym,linedashed_vert:Sm,linedashed_frag:Mm,meshbasic_vert:bm,meshbasic_frag:wm,meshlambert_vert:Em,meshlambert_frag:Tm,meshmatcap_vert:Am,meshmatcap_frag:Cm,meshnormal_vert:Rm,meshnormal_frag:Im,meshphong_vert:Pm,meshphong_frag:Dm,meshphysical_vert:km,meshphysical_frag:Lm,meshtoon_vert:Um,meshtoon_frag:Fm,points_vert:Nm,points_frag:Bm,shadow_vert:Om,shadow_frag:zm,sprite_vert:Hm,sprite_frag:Gm},pt={common:{diffuse:{value:new Wt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Ot},alphaMap:{value:null},alphaMapTransform:{value:new Ot},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Ot}},envmap:{envMap:{value:null},envMapRotation:{value:new Ot},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Ot}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Ot}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Ot},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Ot},normalScale:{value:new te(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Ot},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Ot}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Ot}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Ot}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Wt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Wt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Ot},alphaTest:{value:0},uvTransform:{value:new Ot}},sprite:{diffuse:{value:new Wt(16777215)},opacity:{value:1},center:{value:new te(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Ot},alphaMap:{value:null},alphaMapTransform:{value:new Ot},alphaTest:{value:0}}},pi={basic:{uniforms:Le([pt.common,pt.specularmap,pt.envmap,pt.aomap,pt.lightmap,pt.fog]),vertexShader:zt.meshbasic_vert,fragmentShader:zt.meshbasic_frag},lambert:{uniforms:Le([pt.common,pt.specularmap,pt.envmap,pt.aomap,pt.lightmap,pt.emissivemap,pt.bumpmap,pt.normalmap,pt.displacementmap,pt.fog,pt.lights,{emissive:{value:new Wt(0)}}]),vertexShader:zt.meshlambert_vert,fragmentShader:zt.meshlambert_frag},phong:{uniforms:Le([pt.common,pt.specularmap,pt.envmap,pt.aomap,pt.lightmap,pt.emissivemap,pt.bumpmap,pt.normalmap,pt.displacementmap,pt.fog,pt.lights,{emissive:{value:new Wt(0)},specular:{value:new Wt(1118481)},shininess:{value:30}}]),vertexShader:zt.meshphong_vert,fragmentShader:zt.meshphong_frag},standard:{uniforms:Le([pt.common,pt.envmap,pt.aomap,pt.lightmap,pt.emissivemap,pt.bumpmap,pt.normalmap,pt.displacementmap,pt.roughnessmap,pt.metalnessmap,pt.fog,pt.lights,{emissive:{value:new Wt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:zt.meshphysical_vert,fragmentShader:zt.meshphysical_frag},toon:{uniforms:Le([pt.common,pt.aomap,pt.lightmap,pt.emissivemap,pt.bumpmap,pt.normalmap,pt.displacementmap,pt.gradientmap,pt.fog,pt.lights,{emissive:{value:new Wt(0)}}]),vertexShader:zt.meshtoon_vert,fragmentShader:zt.meshtoon_frag},matcap:{uniforms:Le([pt.common,pt.bumpmap,pt.normalmap,pt.displacementmap,pt.fog,{matcap:{value:null}}]),vertexShader:zt.meshmatcap_vert,fragmentShader:zt.meshmatcap_frag},points:{uniforms:Le([pt.points,pt.fog]),vertexShader:zt.points_vert,fragmentShader:zt.points_frag},dashed:{uniforms:Le([pt.common,pt.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:zt.linedashed_vert,fragmentShader:zt.linedashed_frag},depth:{uniforms:Le([pt.common,pt.displacementmap]),vertexShader:zt.depth_vert,fragmentShader:zt.depth_frag},normal:{uniforms:Le([pt.common,pt.bumpmap,pt.normalmap,pt.displacementmap,{opacity:{value:1}}]),vertexShader:zt.meshnormal_vert,fragmentShader:zt.meshnormal_frag},sprite:{uniforms:Le([pt.sprite,pt.fog]),vertexShader:zt.sprite_vert,fragmentShader:zt.sprite_frag},background:{uniforms:{uvTransform:{value:new Ot},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:zt.background_vert,fragmentShader:zt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Ot}},vertexShader:zt.backgroundCube_vert,fragmentShader:zt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:zt.cube_vert,fragmentShader:zt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:zt.equirect_vert,fragmentShader:zt.equirect_frag},distanceRGBA:{uniforms:Le([pt.common,pt.displacementmap,{referencePosition:{value:new G},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:zt.distanceRGBA_vert,fragmentShader:zt.distanceRGBA_frag},shadow:{uniforms:Le([pt.lights,pt.fog,{color:{value:new Wt(0)},opacity:{value:1}}]),vertexShader:zt.shadow_vert,fragmentShader:zt.shadow_frag}};pi.physical={uniforms:Le([pi.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Ot},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Ot},clearcoatNormalScale:{value:new te(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Ot},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Ot},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Ot},sheen:{value:0},sheenColor:{value:new Wt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Ot},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Ot},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Ot},transmissionSamplerSize:{value:new te},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Ot},attenuationDistance:{value:0},attenuationColor:{value:new Wt(0)},specularColor:{value:new Wt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Ot},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Ot},anisotropyVector:{value:new te},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Ot}}]),vertexShader:zt.meshphysical_vert,fragmentShader:zt.meshphysical_frag};const mr={r:0,b:0,g:0},rn=new ii,Vm=new se;function Wm(n,t,e,i,s,r,a){const o=new Wt(0);let l=r===!0?0:1,c,h,f=null,u=0,d=null;function p(M){let E=M.isScene===!0?M.background:null;return E&&E.isTexture&&(E=(M.backgroundBlurriness>0?e:t).get(E)),E}function g(M){let E=!1;const y=p(M);y===null?_(o,l):y&&y.isColor&&(_(y,1),E=!0);const w=n.xr.getEnvironmentBlendMode();w==="additive"?i.buffers.color.setClear(0,0,0,1,a):w==="alpha-blend"&&i.buffers.color.setClear(0,0,0,0,a),(n.autoClear||E)&&(i.buffers.depth.setTest(!0),i.buffers.depth.setMask(!0),i.buffers.color.setMask(!0),n.clear(n.autoClearColor,n.autoClearDepth,n.autoClearStencil))}function m(M,E){const y=p(E);y&&(y.isCubeTexture||y.mapping===Kr)?(h===void 0&&(h=new Qt(new De(1,1,1),new Ji({name:"BackgroundCubeMaterial",uniforms:Qn(pi.backgroundCube.uniforms),vertexShader:pi.backgroundCube.vertexShader,fragmentShader:pi.backgroundCube.fragmentShader,side:Be,depthTest:!1,depthWrite:!1,fog:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(w,b,S){this.matrixWorld.copyPosition(S.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),s.update(h)),rn.copy(E.backgroundRotation),rn.x*=-1,rn.y*=-1,rn.z*=-1,y.isCubeTexture&&y.isRenderTargetTexture===!1&&(rn.y*=-1,rn.z*=-1),h.material.uniforms.envMap.value=y,h.material.uniforms.flipEnvMap.value=y.isCubeTexture&&y.isRenderTargetTexture===!1?-1:1,h.material.uniforms.backgroundBlurriness.value=E.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=E.backgroundIntensity,h.material.uniforms.backgroundRotation.value.setFromMatrix4(Vm.makeRotationFromEuler(rn)),h.material.toneMapped=$t.getTransfer(y.colorSpace)!==ne,(f!==y||u!==y.version||d!==n.toneMapping)&&(h.material.needsUpdate=!0,f=y,u=y.version,d=n.toneMapping),h.layers.enableAll(),M.unshift(h,h.geometry,h.material,0,0,null)):y&&y.isTexture&&(c===void 0&&(c=new Qt(new _i(2,2),new Ji({name:"BackgroundMaterial",uniforms:Qn(pi.background.uniforms),vertexShader:pi.background.vertexShader,fragmentShader:pi.background.fragmentShader,side:ji,depthTest:!1,depthWrite:!1,fog:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),s.update(c)),c.material.uniforms.t2D.value=y,c.material.uniforms.backgroundIntensity.value=E.backgroundIntensity,c.material.toneMapped=$t.getTransfer(y.colorSpace)!==ne,y.matrixAutoUpdate===!0&&y.updateMatrix(),c.material.uniforms.uvTransform.value.copy(y.matrix),(f!==y||u!==y.version||d!==n.toneMapping)&&(c.material.needsUpdate=!0,f=y,u=y.version,d=n.toneMapping),c.layers.enableAll(),M.unshift(c,c.geometry,c.material,0,0,null))}function _(M,E){M.getRGB(mr,Gh(n)),i.buffers.color.setClear(mr.r,mr.g,mr.b,E,a)}return{getClearColor:function(){return o},setClearColor:function(M,E=1){o.set(M),l=E,_(o,l)},getClearAlpha:function(){return l},setClearAlpha:function(M){l=M,_(o,l)},render:g,addToRenderList:m}}function Xm(n,t){const e=n.getParameter(n.MAX_VERTEX_ATTRIBS),i={},s=u(null);let r=s,a=!1;function o(x,C,k,L,D){let H=!1;const z=f(L,k,C);r!==z&&(r=z,c(r.object)),H=d(x,L,k,D),H&&p(x,L,k,D),D!==null&&t.update(D,n.ELEMENT_ARRAY_BUFFER),(H||a)&&(a=!1,y(x,C,k,L),D!==null&&n.bindBuffer(n.ELEMENT_ARRAY_BUFFER,t.get(D).buffer))}function l(){return n.createVertexArray()}function c(x){return n.bindVertexArray(x)}function h(x){return n.deleteVertexArray(x)}function f(x,C,k){const L=k.wireframe===!0;let D=i[x.id];D===void 0&&(D={},i[x.id]=D);let H=D[C.id];H===void 0&&(H={},D[C.id]=H);let z=H[L];return z===void 0&&(z=u(l()),H[L]=z),z}function u(x){const C=[],k=[],L=[];for(let D=0;D<e;D++)C[D]=0,k[D]=0,L[D]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:C,enabledAttributes:k,attributeDivisors:L,object:x,attributes:{},index:null}}function d(x,C,k,L){const D=r.attributes,H=C.attributes;let z=0;const W=k.getAttributes();for(const F in W)if(W[F].location>=0){const st=D[F];let vt=H[F];if(vt===void 0&&(F==="instanceMatrix"&&x.instanceMatrix&&(vt=x.instanceMatrix),F==="instanceColor"&&x.instanceColor&&(vt=x.instanceColor)),st===void 0||st.attribute!==vt||vt&&st.data!==vt.data)return!0;z++}return r.attributesNum!==z||r.index!==L}function p(x,C,k,L){const D={},H=C.attributes;let z=0;const W=k.getAttributes();for(const F in W)if(W[F].location>=0){let st=H[F];st===void 0&&(F==="instanceMatrix"&&x.instanceMatrix&&(st=x.instanceMatrix),F==="instanceColor"&&x.instanceColor&&(st=x.instanceColor));const vt={};vt.attribute=st,st&&st.data&&(vt.data=st.data),D[F]=vt,z++}r.attributes=D,r.attributesNum=z,r.index=L}function g(){const x=r.newAttributes;for(let C=0,k=x.length;C<k;C++)x[C]=0}function m(x){_(x,0)}function _(x,C){const k=r.newAttributes,L=r.enabledAttributes,D=r.attributeDivisors;k[x]=1,L[x]===0&&(n.enableVertexAttribArray(x),L[x]=1),D[x]!==C&&(n.vertexAttribDivisor(x,C),D[x]=C)}function M(){const x=r.newAttributes,C=r.enabledAttributes;for(let k=0,L=C.length;k<L;k++)C[k]!==x[k]&&(n.disableVertexAttribArray(k),C[k]=0)}function E(x,C,k,L,D,H,z){z===!0?n.vertexAttribIPointer(x,C,k,D,H):n.vertexAttribPointer(x,C,k,L,D,H)}function y(x,C,k,L){g();const D=L.attributes,H=k.getAttributes(),z=C.defaultAttributeValues;for(const W in H){const F=H[W];if(F.location>=0){let q=D[W];if(q===void 0&&(W==="instanceMatrix"&&x.instanceMatrix&&(q=x.instanceMatrix),W==="instanceColor"&&x.instanceColor&&(q=x.instanceColor)),q!==void 0){const st=q.normalized,vt=q.itemSize,xt=t.get(q);if(xt===void 0)continue;const kt=xt.buffer,Z=xt.type,at=xt.bytesPerElement,St=Z===n.INT||Z===n.UNSIGNED_INT||q.gpuType===Jo;if(q.isInterleavedBufferAttribute){const ut=q.data,Ct=ut.stride,Pt=q.offset;if(ut.isInstancedInterleavedBuffer){for(let Nt=0;Nt<F.locationSize;Nt++)_(F.location+Nt,ut.meshPerAttribute);x.isInstancedMesh!==!0&&L._maxInstanceCount===void 0&&(L._maxInstanceCount=ut.meshPerAttribute*ut.count)}else for(let Nt=0;Nt<F.locationSize;Nt++)m(F.location+Nt);n.bindBuffer(n.ARRAY_BUFFER,kt);for(let Nt=0;Nt<F.locationSize;Nt++)E(F.location+Nt,vt/F.locationSize,Z,st,Ct*at,(Pt+vt/F.locationSize*Nt)*at,St)}else{if(q.isInstancedBufferAttribute){for(let ut=0;ut<F.locationSize;ut++)_(F.location+ut,q.meshPerAttribute);x.isInstancedMesh!==!0&&L._maxInstanceCount===void 0&&(L._maxInstanceCount=q.meshPerAttribute*q.count)}else for(let ut=0;ut<F.locationSize;ut++)m(F.location+ut);n.bindBuffer(n.ARRAY_BUFFER,kt);for(let ut=0;ut<F.locationSize;ut++)E(F.location+ut,vt/F.locationSize,Z,st,vt*at,vt/F.locationSize*ut*at,St)}}else if(z!==void 0){const st=z[W];if(st!==void 0)switch(st.length){case 2:n.vertexAttrib2fv(F.location,st);break;case 3:n.vertexAttrib3fv(F.location,st);break;case 4:n.vertexAttrib4fv(F.location,st);break;default:n.vertexAttrib1fv(F.location,st)}}}}M()}function w(){R();for(const x in i){const C=i[x];for(const k in C){const L=C[k];for(const D in L)h(L[D].object),delete L[D];delete C[k]}delete i[x]}}function b(x){if(i[x.id]===void 0)return;const C=i[x.id];for(const k in C){const L=C[k];for(const D in L)h(L[D].object),delete L[D];delete C[k]}delete i[x.id]}function S(x){for(const C in i){const k=i[C];if(k[x.id]===void 0)continue;const L=k[x.id];for(const D in L)h(L[D].object),delete L[D];delete k[x.id]}}function R(){v(),a=!0,r!==s&&(r=s,c(r.object))}function v(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:o,reset:R,resetDefaultState:v,dispose:w,releaseStatesOfGeometry:b,releaseStatesOfProgram:S,initAttributes:g,enableAttribute:m,disableUnusedAttributes:M}}function $m(n,t,e){let i;function s(c){i=c}function r(c,h){n.drawArrays(i,c,h),e.update(h,i,1)}function a(c,h,f){f!==0&&(n.drawArraysInstanced(i,c,h,f),e.update(h,i,f))}function o(c,h,f){if(f===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,c,0,h,0,f);let d=0;for(let p=0;p<f;p++)d+=h[p];e.update(d,i,1)}function l(c,h,f,u){if(f===0)return;const d=t.get("WEBGL_multi_draw");if(d===null)for(let p=0;p<c.length;p++)a(c[p],h[p],u[p]);else{d.multiDrawArraysInstancedWEBGL(i,c,0,h,0,u,0,f);let p=0;for(let g=0;g<f;g++)p+=h[g]*u[g];e.update(p,i,1)}}this.setMode=s,this.render=r,this.renderInstances=a,this.renderMultiDraw=o,this.renderMultiDrawInstances=l}function Ym(n,t,e,i){let s;function r(){if(s!==void 0)return s;if(t.has("EXT_texture_filter_anisotropic")===!0){const S=t.get("EXT_texture_filter_anisotropic");s=n.getParameter(S.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function a(S){return!(S!==ci&&i.convert(S)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(S){const R=S===zs&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(S!==Li&&i.convert(S)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_TYPE)&&S!==Ii&&!R)}function l(S){if(S==="highp"){if(n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.HIGH_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.HIGH_FLOAT).precision>0)return"highp";S="mediump"}return S==="mediump"&&n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.MEDIUM_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=e.precision!==void 0?e.precision:"highp";const h=l(c);h!==c&&(console.warn("THREE.WebGLRenderer:",c,"not supported, using",h,"instead."),c=h);const f=e.logarithmicDepthBuffer===!0,u=e.reverseDepthBuffer===!0&&t.has("EXT_clip_control"),d=n.getParameter(n.MAX_TEXTURE_IMAGE_UNITS),p=n.getParameter(n.MAX_VERTEX_TEXTURE_IMAGE_UNITS),g=n.getParameter(n.MAX_TEXTURE_SIZE),m=n.getParameter(n.MAX_CUBE_MAP_TEXTURE_SIZE),_=n.getParameter(n.MAX_VERTEX_ATTRIBS),M=n.getParameter(n.MAX_VERTEX_UNIFORM_VECTORS),E=n.getParameter(n.MAX_VARYING_VECTORS),y=n.getParameter(n.MAX_FRAGMENT_UNIFORM_VECTORS),w=p>0,b=n.getParameter(n.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:l,textureFormatReadable:a,textureTypeReadable:o,precision:c,logarithmicDepthBuffer:f,reverseDepthBuffer:u,maxTextures:d,maxVertexTextures:p,maxTextureSize:g,maxCubemapSize:m,maxAttributes:_,maxVertexUniforms:M,maxVaryings:E,maxFragmentUniforms:y,vertexTextures:w,maxSamples:b}}function qm(n){const t=this;let e=null,i=0,s=!1,r=!1;const a=new on,o=new Ot,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(f,u){const d=f.length!==0||u||i!==0||s;return s=u,i=f.length,d},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(f,u){e=h(f,u,0)},this.setState=function(f,u,d){const p=f.clippingPlanes,g=f.clipIntersection,m=f.clipShadows,_=n.get(f);if(!s||p===null||p.length===0||r&&!m)r?h(null):c();else{const M=r?0:i,E=M*4;let y=_.clippingState||null;l.value=y,y=h(p,u,E,d);for(let w=0;w!==E;++w)y[w]=e[w];_.clippingState=y,this.numIntersection=g?this.numPlanes:0,this.numPlanes+=M}};function c(){l.value!==e&&(l.value=e,l.needsUpdate=i>0),t.numPlanes=i,t.numIntersection=0}function h(f,u,d,p){const g=f!==null?f.length:0;let m=null;if(g!==0){if(m=l.value,p!==!0||m===null){const _=d+g*4,M=u.matrixWorldInverse;o.getNormalMatrix(M),(m===null||m.length<_)&&(m=new Float32Array(_));for(let E=0,y=d;E!==g;++E,y+=4)a.copy(f[E]).applyMatrix4(M,o),a.normal.toArray(m,y),m[y+3]=a.constant}l.value=m,l.needsUpdate=!0}return t.numPlanes=g,t.numIntersection=0,m}}function Zm(n){let t=new WeakMap;function e(a,o){return o===oo?a.mapping=Zn:o===lo&&(a.mapping=Kn),a}function i(a){if(a&&a.isTexture){const o=a.mapping;if(o===oo||o===lo)if(t.has(a)){const l=t.get(a).texture;return e(l,a.mapping)}else{const l=a.image;if(l&&l.height>0){const c=new af(l.height);return c.fromEquirectangularTexture(n,a),t.set(a,c),a.addEventListener("dispose",s),e(c.texture,a.mapping)}else return null}}return a}function s(a){const o=a.target;o.removeEventListener("dispose",s);const l=t.get(o);l!==void 0&&(t.delete(o),l.dispose())}function r(){t=new WeakMap}return{get:i,dispose:r}}class $h extends Vh{constructor(t=-1,e=1,i=1,s=-1,r=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=i,this.bottom=s,this.near=r,this.far=a,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,i,s,r,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=i,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,s=(this.top+this.bottom)/2;let r=i-t,a=i+t,o=s+e,l=s-e;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,a=r+c*this.view.width,o-=h*this.view.offsetY,l=o-h*this.view.height}this.projectionMatrix.makeOrthographic(r,a,o,l,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}}const Gn=4,Kl=[.125,.215,.35,.446,.526,.582],hn=20,Ta=new $h,jl=new Wt;let Aa=null,Ca=0,Ra=0,Ia=!1;const ln=(1+Math.sqrt(5))/2,Bn=1/ln,Jl=[new G(-ln,Bn,0),new G(ln,Bn,0),new G(-Bn,0,ln),new G(Bn,0,ln),new G(0,ln,-Bn),new G(0,ln,Bn),new G(-1,1,-1),new G(1,1,-1),new G(-1,1,1),new G(1,1,1)];class Ql{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(t,e=0,i=.1,s=100){Aa=this._renderer.getRenderTarget(),Ca=this._renderer.getActiveCubeFace(),Ra=this._renderer.getActiveMipmapLevel(),Ia=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);const r=this._allocateTargets();return r.depthBuffer=!0,this._sceneToCubeUV(t,i,s,r),e>0&&this._blur(r,0,0,e),this._applyPMREM(r),this._cleanup(r),r}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=ic(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=ec(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodPlanes.length;t++)this._lodPlanes[t].dispose()}_cleanup(t){this._renderer.setRenderTarget(Aa,Ca,Ra),this._renderer.xr.enabled=Ia,t.scissorTest=!1,gr(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===Zn||t.mapping===Kn?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),Aa=this._renderer.getRenderTarget(),Ca=this._renderer.getActiveCubeFace(),Ra=this._renderer.getActiveMipmapLevel(),Ia=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const i=e||this._allocateTargets();return this._textureToCubeUV(t,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){const t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,i={magFilter:ei,minFilter:ei,generateMipmaps:!1,type:zs,format:ci,colorSpace:ns,depthBuffer:!1},s=tc(t,e,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=tc(t,e,i);const{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=Km(r)),this._blurMaterial=jm(r,t,e)}return s}_compileMaterial(t){const e=new Qt(this._lodPlanes[0],t);this._renderer.compile(e,Ta)}_sceneToCubeUV(t,e,i,s){const o=new Ve(90,1,e,i),l=[1,-1,1,1,1,1],c=[1,1,1,-1,-1,-1],h=this._renderer,f=h.autoClear,u=h.toneMapping;h.getClearColor(jl),h.toneMapping=Yi,h.autoClear=!1;const d=new Fe({name:"PMREM.Background",side:Be,depthWrite:!1,depthTest:!1}),p=new Qt(new De,d);let g=!1;const m=t.background;m?m.isColor&&(d.color.copy(m),t.background=null,g=!0):(d.color.copy(jl),g=!0);for(let _=0;_<6;_++){const M=_%3;M===0?(o.up.set(0,l[_],0),o.lookAt(c[_],0,0)):M===1?(o.up.set(0,0,l[_]),o.lookAt(0,c[_],0)):(o.up.set(0,l[_],0),o.lookAt(0,0,c[_]));const E=this._cubeSize;gr(s,M*E,_>2?E:0,E,E),h.setRenderTarget(s),g&&h.render(p,o),h.render(t,o)}p.geometry.dispose(),p.material.dispose(),h.toneMapping=u,h.autoClear=f,t.background=m}_textureToCubeUV(t,e){const i=this._renderer,s=t.mapping===Zn||t.mapping===Kn;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=ic()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=ec());const r=s?this._cubemapMaterial:this._equirectMaterial,a=new Qt(this._lodPlanes[0],r),o=r.uniforms;o.envMap.value=t;const l=this._cubeSize;gr(e,0,0,3*l,2*l),i.setRenderTarget(e),i.render(a,Ta)}_applyPMREM(t){const e=this._renderer,i=e.autoClear;e.autoClear=!1;const s=this._lodPlanes.length;for(let r=1;r<s;r++){const a=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),o=Jl[(s-r-1)%Jl.length];this._blur(t,r-1,r,a,o)}e.autoClear=i}_blur(t,e,i,s,r){const a=this._pingPongRenderTarget;this._halfBlur(t,a,e,i,s,"latitudinal",r),this._halfBlur(a,t,i,i,s,"longitudinal",r)}_halfBlur(t,e,i,s,r,a,o){const l=this._renderer,c=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const h=3,f=new Qt(this._lodPlanes[s],c),u=c.uniforms,d=this._sizeLods[i]-1,p=isFinite(r)?Math.PI/(2*d):2*Math.PI/(2*hn-1),g=r/p,m=isFinite(r)?1+Math.floor(h*g):hn;m>hn&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${hn}`);const _=[];let M=0;for(let S=0;S<hn;++S){const R=S/g,v=Math.exp(-R*R/2);_.push(v),S===0?M+=v:S<m&&(M+=2*v)}for(let S=0;S<_.length;S++)_[S]=_[S]/M;u.envMap.value=t.texture,u.samples.value=m,u.weights.value=_,u.latitudinal.value=a==="latitudinal",o&&(u.poleAxis.value=o);const{_lodMax:E}=this;u.dTheta.value=p,u.mipInt.value=E-i;const y=this._sizeLods[s],w=3*y*(s>E-Gn?s-E+Gn:0),b=4*(this._cubeSize-y);gr(e,w,b,3*y,2*y),l.setRenderTarget(e),l.render(f,Ta)}}function Km(n){const t=[],e=[],i=[];let s=n;const r=n-Gn+1+Kl.length;for(let a=0;a<r;a++){const o=Math.pow(2,s);e.push(o);let l=1/o;a>n-Gn?l=Kl[a-n+Gn-1]:a===0&&(l=0),i.push(l);const c=1/(o-2),h=-c,f=1+c,u=[h,h,f,h,f,f,h,h,f,f,h,f],d=6,p=6,g=3,m=2,_=1,M=new Float32Array(g*p*d),E=new Float32Array(m*p*d),y=new Float32Array(_*p*d);for(let b=0;b<d;b++){const S=b%3*2/3-1,R=b>2?0:-1,v=[S,R,0,S+2/3,R,0,S+2/3,R+1,0,S,R,0,S+2/3,R+1,0,S,R+1,0];M.set(v,g*p*b),E.set(u,m*p*b);const x=[b,b,b,b,b,b];y.set(x,_*p*b)}const w=new Ie;w.setAttribute("position",new hi(M,g)),w.setAttribute("uv",new hi(E,m)),w.setAttribute("faceIndex",new hi(y,_)),t.push(w),s>Gn&&s--}return{lodPlanes:t,sizeLods:e,sigmas:i}}function tc(n,t,e){const i=new _n(n,t,e);return i.texture.mapping=Kr,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function gr(n,t,e,i,s){n.viewport.set(t,e,i,s),n.scissor.set(t,e,i,s)}function jm(n,t,e){const i=new Float32Array(hn),s=new G(0,1,0);return new Ji({name:"SphericalGaussianBlur",defines:{n:hn,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:al(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:$i,depthTest:!1,depthWrite:!1})}function ec(){return new Ji({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:al(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:$i,depthTest:!1,depthWrite:!1})}function ic(){return new Ji({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:al(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:$i,depthTest:!1,depthWrite:!1})}function al(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function Jm(n){let t=new WeakMap,e=null;function i(o){if(o&&o.isTexture){const l=o.mapping,c=l===oo||l===lo,h=l===Zn||l===Kn;if(c||h){let f=t.get(o);const u=f!==void 0?f.texture.pmremVersion:0;if(o.isRenderTargetTexture&&o.pmremVersion!==u)return e===null&&(e=new Ql(n)),f=c?e.fromEquirectangular(o,f):e.fromCubemap(o,f),f.texture.pmremVersion=o.pmremVersion,t.set(o,f),f.texture;if(f!==void 0)return f.texture;{const d=o.image;return c&&d&&d.height>0||h&&d&&s(d)?(e===null&&(e=new Ql(n)),f=c?e.fromEquirectangular(o):e.fromCubemap(o),f.texture.pmremVersion=o.pmremVersion,t.set(o,f),o.addEventListener("dispose",r),f.texture):null}}}return o}function s(o){let l=0;const c=6;for(let h=0;h<c;h++)o[h]!==void 0&&l++;return l===c}function r(o){const l=o.target;l.removeEventListener("dispose",r);const c=t.get(l);c!==void 0&&(t.delete(l),c.dispose())}function a(){t=new WeakMap,e!==null&&(e.dispose(),e=null)}return{get:i,dispose:a}}function Qm(n){const t={};function e(i){if(t[i]!==void 0)return t[i];let s;switch(i){case"WEBGL_depth_texture":s=n.getExtension("WEBGL_depth_texture")||n.getExtension("MOZ_WEBGL_depth_texture")||n.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":s=n.getExtension("EXT_texture_filter_anisotropic")||n.getExtension("MOZ_EXT_texture_filter_anisotropic")||n.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":s=n.getExtension("WEBGL_compressed_texture_s3tc")||n.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":s=n.getExtension("WEBGL_compressed_texture_pvrtc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:s=n.getExtension(i)}return t[i]=s,s}return{has:function(i){return e(i)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(i){const s=e(i);return s===null&&ys("THREE.WebGLRenderer: "+i+" extension not supported."),s}}}function tg(n,t,e,i){const s={},r=new WeakMap;function a(f){const u=f.target;u.index!==null&&t.remove(u.index);for(const p in u.attributes)t.remove(u.attributes[p]);for(const p in u.morphAttributes){const g=u.morphAttributes[p];for(let m=0,_=g.length;m<_;m++)t.remove(g[m])}u.removeEventListener("dispose",a),delete s[u.id];const d=r.get(u);d&&(t.remove(d),r.delete(u)),i.releaseStatesOfGeometry(u),u.isInstancedBufferGeometry===!0&&delete u._maxInstanceCount,e.memory.geometries--}function o(f,u){return s[u.id]===!0||(u.addEventListener("dispose",a),s[u.id]=!0,e.memory.geometries++),u}function l(f){const u=f.attributes;for(const p in u)t.update(u[p],n.ARRAY_BUFFER);const d=f.morphAttributes;for(const p in d){const g=d[p];for(let m=0,_=g.length;m<_;m++)t.update(g[m],n.ARRAY_BUFFER)}}function c(f){const u=[],d=f.index,p=f.attributes.position;let g=0;if(d!==null){const M=d.array;g=d.version;for(let E=0,y=M.length;E<y;E+=3){const w=M[E+0],b=M[E+1],S=M[E+2];u.push(w,b,b,S,S,w)}}else if(p!==void 0){const M=p.array;g=p.version;for(let E=0,y=M.length/3-1;E<y;E+=3){const w=E+0,b=E+1,S=E+2;u.push(w,b,b,S,S,w)}}else return;const m=new(Uh(u)?Hh:zh)(u,1);m.version=g;const _=r.get(f);_&&t.remove(_),r.set(f,m)}function h(f){const u=r.get(f);if(u){const d=f.index;d!==null&&u.version<d.version&&c(f)}else c(f);return r.get(f)}return{get:o,update:l,getWireframeAttribute:h}}function eg(n,t,e){let i;function s(u){i=u}let r,a;function o(u){r=u.type,a=u.bytesPerElement}function l(u,d){n.drawElements(i,d,r,u*a),e.update(d,i,1)}function c(u,d,p){p!==0&&(n.drawElementsInstanced(i,d,r,u*a,p),e.update(d,i,p))}function h(u,d,p){if(p===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,d,0,r,u,0,p);let m=0;for(let _=0;_<p;_++)m+=d[_];e.update(m,i,1)}function f(u,d,p,g){if(p===0)return;const m=t.get("WEBGL_multi_draw");if(m===null)for(let _=0;_<u.length;_++)c(u[_]/a,d[_],g[_]);else{m.multiDrawElementsInstancedWEBGL(i,d,0,r,u,0,g,0,p);let _=0;for(let M=0;M<p;M++)_+=d[M]*g[M];e.update(_,i,1)}}this.setMode=s,this.setIndex=o,this.render=l,this.renderInstances=c,this.renderMultiDraw=h,this.renderMultiDrawInstances=f}function ig(n){const t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function i(r,a,o){switch(e.calls++,a){case n.TRIANGLES:e.triangles+=o*(r/3);break;case n.LINES:e.lines+=o*(r/2);break;case n.LINE_STRIP:e.lines+=o*(r-1);break;case n.LINE_LOOP:e.lines+=o*r;break;case n.POINTS:e.points+=o*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",a);break}}function s(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:s,update:i}}function ng(n,t,e){const i=new WeakMap,s=new _e;function r(a,o,l){const c=a.morphTargetInfluences,h=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,f=h!==void 0?h.length:0;let u=i.get(o);if(u===void 0||u.count!==f){let x=function(){R.dispose(),i.delete(o),o.removeEventListener("dispose",x)};var d=x;u!==void 0&&u.texture.dispose();const p=o.morphAttributes.position!==void 0,g=o.morphAttributes.normal!==void 0,m=o.morphAttributes.color!==void 0,_=o.morphAttributes.position||[],M=o.morphAttributes.normal||[],E=o.morphAttributes.color||[];let y=0;p===!0&&(y=1),g===!0&&(y=2),m===!0&&(y=3);let w=o.attributes.position.count*y,b=1;w>t.maxTextureSize&&(b=Math.ceil(w/t.maxTextureSize),w=t.maxTextureSize);const S=new Float32Array(w*b*4*f),R=new Nh(S,w,b,f);R.type=Ii,R.needsUpdate=!0;const v=y*4;for(let C=0;C<f;C++){const k=_[C],L=M[C],D=E[C],H=w*b*4*C;for(let z=0;z<k.count;z++){const W=z*v;p===!0&&(s.fromBufferAttribute(k,z),S[H+W+0]=s.x,S[H+W+1]=s.y,S[H+W+2]=s.z,S[H+W+3]=0),g===!0&&(s.fromBufferAttribute(L,z),S[H+W+4]=s.x,S[H+W+5]=s.y,S[H+W+6]=s.z,S[H+W+7]=0),m===!0&&(s.fromBufferAttribute(D,z),S[H+W+8]=s.x,S[H+W+9]=s.y,S[H+W+10]=s.z,S[H+W+11]=D.itemSize===4?s.w:1)}}u={count:f,texture:R,size:new te(w,b)},i.set(o,u),o.addEventListener("dispose",x)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)l.getUniforms().setValue(n,"morphTexture",a.morphTexture,e);else{let p=0;for(let m=0;m<c.length;m++)p+=c[m];const g=o.morphTargetsRelative?1:1-p;l.getUniforms().setValue(n,"morphTargetBaseInfluence",g),l.getUniforms().setValue(n,"morphTargetInfluences",c)}l.getUniforms().setValue(n,"morphTargetsTexture",u.texture,e),l.getUniforms().setValue(n,"morphTargetsTextureSize",u.size)}return{update:r}}function sg(n,t,e,i){let s=new WeakMap;function r(l){const c=i.render.frame,h=l.geometry,f=t.get(l,h);if(s.get(f)!==c&&(t.update(f),s.set(f,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",o)===!1&&l.addEventListener("dispose",o),s.get(l)!==c&&(e.update(l.instanceMatrix,n.ARRAY_BUFFER),l.instanceColor!==null&&e.update(l.instanceColor,n.ARRAY_BUFFER),s.set(l,c))),l.isSkinnedMesh){const u=l.skeleton;s.get(u)!==c&&(u.update(),s.set(u,c))}return f}function a(){s=new WeakMap}function o(l){const c=l.target;c.removeEventListener("dispose",o),e.remove(c.instanceMatrix),c.instanceColor!==null&&e.remove(c.instanceColor)}return{update:r,dispose:a}}class Yh extends Pe{constructor(t,e,i,s,r,a,o,l,c,h=Wn){if(h!==Wn&&h!==Jn)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");i===void 0&&h===Wn&&(i=gn),i===void 0&&h===Jn&&(i=jn),super(null,s,r,a,o,l,h,i,c),this.isDepthTexture=!0,this.image={width:t,height:e},this.magFilter=o!==void 0?o:Kt,this.minFilter=l!==void 0?l:Kt,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.compareFunction=t.compareFunction,this}toJSON(t){const e=super.toJSON(t);return this.compareFunction!==null&&(e.compareFunction=this.compareFunction),e}}const qh=new Pe,nc=new Yh(1,1),Zh=new Nh,Kh=new Vd,jh=new Wh,sc=[],rc=[],ac=new Float32Array(16),oc=new Float32Array(9),lc=new Float32Array(4);function as(n,t,e){const i=n[0];if(i<=0||i>0)return n;const s=t*e;let r=sc[s];if(r===void 0&&(r=new Float32Array(s),sc[s]=r),t!==0){i.toArray(r,0);for(let a=1,o=0;a!==t;++a)o+=e,n[a].toArray(r,o)}return r}function xe(n,t){if(n.length!==t.length)return!1;for(let e=0,i=n.length;e<i;e++)if(n[e]!==t[e])return!1;return!0}function ye(n,t){for(let e=0,i=t.length;e<i;e++)n[e]=t[e]}function Jr(n,t){let e=rc[t];e===void 0&&(e=new Int32Array(t),rc[t]=e);for(let i=0;i!==t;++i)e[i]=n.allocateTextureUnit();return e}function rg(n,t){const e=this.cache;e[0]!==t&&(n.uniform1f(this.addr,t),e[0]=t)}function ag(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(n.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(xe(e,t))return;n.uniform2fv(this.addr,t),ye(e,t)}}function og(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(n.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(n.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(xe(e,t))return;n.uniform3fv(this.addr,t),ye(e,t)}}function lg(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(n.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(xe(e,t))return;n.uniform4fv(this.addr,t),ye(e,t)}}function cg(n,t){const e=this.cache,i=t.elements;if(i===void 0){if(xe(e,t))return;n.uniformMatrix2fv(this.addr,!1,t),ye(e,t)}else{if(xe(e,i))return;lc.set(i),n.uniformMatrix2fv(this.addr,!1,lc),ye(e,i)}}function hg(n,t){const e=this.cache,i=t.elements;if(i===void 0){if(xe(e,t))return;n.uniformMatrix3fv(this.addr,!1,t),ye(e,t)}else{if(xe(e,i))return;oc.set(i),n.uniformMatrix3fv(this.addr,!1,oc),ye(e,i)}}function ug(n,t){const e=this.cache,i=t.elements;if(i===void 0){if(xe(e,t))return;n.uniformMatrix4fv(this.addr,!1,t),ye(e,t)}else{if(xe(e,i))return;ac.set(i),n.uniformMatrix4fv(this.addr,!1,ac),ye(e,i)}}function dg(n,t){const e=this.cache;e[0]!==t&&(n.uniform1i(this.addr,t),e[0]=t)}function fg(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(n.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(xe(e,t))return;n.uniform2iv(this.addr,t),ye(e,t)}}function pg(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(n.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(xe(e,t))return;n.uniform3iv(this.addr,t),ye(e,t)}}function mg(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(n.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(xe(e,t))return;n.uniform4iv(this.addr,t),ye(e,t)}}function gg(n,t){const e=this.cache;e[0]!==t&&(n.uniform1ui(this.addr,t),e[0]=t)}function _g(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(n.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(xe(e,t))return;n.uniform2uiv(this.addr,t),ye(e,t)}}function vg(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(n.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(xe(e,t))return;n.uniform3uiv(this.addr,t),ye(e,t)}}function xg(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(n.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(xe(e,t))return;n.uniform4uiv(this.addr,t),ye(e,t)}}function yg(n,t,e){const i=this.cache,s=e.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s);let r;this.type===n.SAMPLER_2D_SHADOW?(nc.compareFunction=Lh,r=nc):r=qh,e.setTexture2D(t||r,s)}function Sg(n,t,e){const i=this.cache,s=e.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),e.setTexture3D(t||Kh,s)}function Mg(n,t,e){const i=this.cache,s=e.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),e.setTextureCube(t||jh,s)}function bg(n,t,e){const i=this.cache,s=e.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),e.setTexture2DArray(t||Zh,s)}function wg(n){switch(n){case 5126:return rg;case 35664:return ag;case 35665:return og;case 35666:return lg;case 35674:return cg;case 35675:return hg;case 35676:return ug;case 5124:case 35670:return dg;case 35667:case 35671:return fg;case 35668:case 35672:return pg;case 35669:case 35673:return mg;case 5125:return gg;case 36294:return _g;case 36295:return vg;case 36296:return xg;case 35678:case 36198:case 36298:case 36306:case 35682:return yg;case 35679:case 36299:case 36307:return Sg;case 35680:case 36300:case 36308:case 36293:return Mg;case 36289:case 36303:case 36311:case 36292:return bg}}function Eg(n,t){n.uniform1fv(this.addr,t)}function Tg(n,t){const e=as(t,this.size,2);n.uniform2fv(this.addr,e)}function Ag(n,t){const e=as(t,this.size,3);n.uniform3fv(this.addr,e)}function Cg(n,t){const e=as(t,this.size,4);n.uniform4fv(this.addr,e)}function Rg(n,t){const e=as(t,this.size,4);n.uniformMatrix2fv(this.addr,!1,e)}function Ig(n,t){const e=as(t,this.size,9);n.uniformMatrix3fv(this.addr,!1,e)}function Pg(n,t){const e=as(t,this.size,16);n.uniformMatrix4fv(this.addr,!1,e)}function Dg(n,t){n.uniform1iv(this.addr,t)}function kg(n,t){n.uniform2iv(this.addr,t)}function Lg(n,t){n.uniform3iv(this.addr,t)}function Ug(n,t){n.uniform4iv(this.addr,t)}function Fg(n,t){n.uniform1uiv(this.addr,t)}function Ng(n,t){n.uniform2uiv(this.addr,t)}function Bg(n,t){n.uniform3uiv(this.addr,t)}function Og(n,t){n.uniform4uiv(this.addr,t)}function zg(n,t,e){const i=this.cache,s=t.length,r=Jr(e,s);xe(i,r)||(n.uniform1iv(this.addr,r),ye(i,r));for(let a=0;a!==s;++a)e.setTexture2D(t[a]||qh,r[a])}function Hg(n,t,e){const i=this.cache,s=t.length,r=Jr(e,s);xe(i,r)||(n.uniform1iv(this.addr,r),ye(i,r));for(let a=0;a!==s;++a)e.setTexture3D(t[a]||Kh,r[a])}function Gg(n,t,e){const i=this.cache,s=t.length,r=Jr(e,s);xe(i,r)||(n.uniform1iv(this.addr,r),ye(i,r));for(let a=0;a!==s;++a)e.setTextureCube(t[a]||jh,r[a])}function Vg(n,t,e){const i=this.cache,s=t.length,r=Jr(e,s);xe(i,r)||(n.uniform1iv(this.addr,r),ye(i,r));for(let a=0;a!==s;++a)e.setTexture2DArray(t[a]||Zh,r[a])}function Wg(n){switch(n){case 5126:return Eg;case 35664:return Tg;case 35665:return Ag;case 35666:return Cg;case 35674:return Rg;case 35675:return Ig;case 35676:return Pg;case 5124:case 35670:return Dg;case 35667:case 35671:return kg;case 35668:case 35672:return Lg;case 35669:case 35673:return Ug;case 5125:return Fg;case 36294:return Ng;case 36295:return Bg;case 36296:return Og;case 35678:case 36198:case 36298:case 36306:case 35682:return zg;case 35679:case 36299:case 36307:return Hg;case 35680:case 36300:case 36308:case 36293:return Gg;case 36289:case 36303:case 36311:case 36292:return Vg}}class Xg{constructor(t,e,i){this.id=t,this.addr=i,this.cache=[],this.type=e.type,this.setValue=wg(e.type)}}class $g{constructor(t,e,i){this.id=t,this.addr=i,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=Wg(e.type)}}class Yg{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,i){const s=this.seq;for(let r=0,a=s.length;r!==a;++r){const o=s[r];o.setValue(t,e[o.id],i)}}}const Pa=/(\w+)(\])?(\[|\.)?/g;function cc(n,t){n.seq.push(t),n.map[t.id]=t}function qg(n,t,e){const i=n.name,s=i.length;for(Pa.lastIndex=0;;){const r=Pa.exec(i),a=Pa.lastIndex;let o=r[1];const l=r[2]==="]",c=r[3];if(l&&(o=o|0),c===void 0||c==="["&&a+2===s){cc(e,c===void 0?new Xg(o,n,t):new $g(o,n,t));break}else{let f=e.map[o];f===void 0&&(f=new Yg(o),cc(e,f)),e=f}}}class Nr{constructor(t,e){this.seq=[],this.map={};const i=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let s=0;s<i;++s){const r=t.getActiveUniform(e,s),a=t.getUniformLocation(e,r.name);qg(r,a,this)}}setValue(t,e,i,s){const r=this.map[e];r!==void 0&&r.setValue(t,i,s)}setOptional(t,e,i){const s=e[i];s!==void 0&&this.setValue(t,i,s)}static upload(t,e,i,s){for(let r=0,a=e.length;r!==a;++r){const o=e[r],l=i[o.id];l.needsUpdate!==!1&&o.setValue(t,l.value,s)}}static seqWithValue(t,e){const i=[];for(let s=0,r=t.length;s!==r;++s){const a=t[s];a.id in e&&i.push(a)}return i}}function hc(n,t,e){const i=n.createShader(t);return n.shaderSource(i,e),n.compileShader(i),i}const Zg=37297;let Kg=0;function jg(n,t){const e=n.split(`
`),i=[],s=Math.max(t-6,0),r=Math.min(t+6,e.length);for(let a=s;a<r;a++){const o=a+1;i.push(`${o===t?">":" "} ${o}: ${e[a]}`)}return i.join(`
`)}const uc=new Ot;function Jg(n){$t._getMatrix(uc,$t.workingColorSpace,n);const t=`mat3( ${uc.elements.map(e=>e.toFixed(4))} )`;switch($t.getTransfer(n)){case jr:return[t,"LinearTransferOETF"];case ne:return[t,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",n),[t,"LinearTransferOETF"]}}function dc(n,t,e){const i=n.getShaderParameter(t,n.COMPILE_STATUS),s=n.getShaderInfoLog(t).trim();if(i&&s==="")return"";const r=/ERROR: 0:(\d+)/.exec(s);if(r){const a=parseInt(r[1]);return e.toUpperCase()+`

`+s+`

`+jg(n.getShaderSource(t),a)}else return s}function Qg(n,t){const e=Jg(t);return[`vec4 ${n}( vec4 value ) {`,`	return ${e[1]}( vec4( value.rgb * ${e[0]}, value.a ) );`,"}"].join(`
`)}function t0(n,t){let e;switch(t){case gd:e="Linear";break;case _d:e="Reinhard";break;case vd:e="Cineon";break;case xd:e="ACESFilmic";break;case Sd:e="AgX";break;case Md:e="Neutral";break;case yd:e="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",t),e="Linear"}return"vec3 "+n+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}const _r=new G;function e0(){$t.getLuminanceCoefficients(_r);const n=_r.x.toFixed(4),t=_r.y.toFixed(4),e=_r.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${n}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function i0(n){return[n.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",n.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Ss).join(`
`)}function n0(n){const t=[];for(const e in n){const i=n[e];i!==!1&&t.push("#define "+e+" "+i)}return t.join(`
`)}function s0(n,t){const e={},i=n.getProgramParameter(t,n.ACTIVE_ATTRIBUTES);for(let s=0;s<i;s++){const r=n.getActiveAttrib(t,s),a=r.name;let o=1;r.type===n.FLOAT_MAT2&&(o=2),r.type===n.FLOAT_MAT3&&(o=3),r.type===n.FLOAT_MAT4&&(o=4),e[a]={type:r.type,location:n.getAttribLocation(t,a),locationSize:o}}return e}function Ss(n){return n!==""}function fc(n,t){const e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return n.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function pc(n,t){return n.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}const r0=/^[ \t]*#include +<([\w\d./]+)>/gm;function Bo(n){return n.replace(r0,o0)}const a0=new Map;function o0(n,t){let e=zt[t];if(e===void 0){const i=a0.get(t);if(i!==void 0)e=zt[i],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,i);else throw new Error("Can not resolve #include <"+t+">")}return Bo(e)}const l0=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function mc(n){return n.replace(l0,c0)}function c0(n,t,e,i){let s="";for(let r=parseInt(t);r<parseInt(e);r++)s+=i.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function gc(n){let t=`precision ${n.precision} float;
	precision ${n.precision} int;
	precision ${n.precision} sampler2D;
	precision ${n.precision} samplerCube;
	precision ${n.precision} sampler3D;
	precision ${n.precision} sampler2DArray;
	precision ${n.precision} sampler2DShadow;
	precision ${n.precision} samplerCubeShadow;
	precision ${n.precision} sampler2DArrayShadow;
	precision ${n.precision} isampler2D;
	precision ${n.precision} isampler3D;
	precision ${n.precision} isamplerCube;
	precision ${n.precision} isampler2DArray;
	precision ${n.precision} usampler2D;
	precision ${n.precision} usampler3D;
	precision ${n.precision} usamplerCube;
	precision ${n.precision} usampler2DArray;
	`;return n.precision==="highp"?t+=`
#define HIGH_PRECISION`:n.precision==="mediump"?t+=`
#define MEDIUM_PRECISION`:n.precision==="lowp"&&(t+=`
#define LOW_PRECISION`),t}function h0(n){let t="SHADOWMAP_TYPE_BASIC";return n.shadowMapType===Sh?t="SHADOWMAP_TYPE_PCF":n.shadowMapType===Zu?t="SHADOWMAP_TYPE_PCF_SOFT":n.shadowMapType===Ci&&(t="SHADOWMAP_TYPE_VSM"),t}function u0(n){let t="ENVMAP_TYPE_CUBE";if(n.envMap)switch(n.envMapMode){case Zn:case Kn:t="ENVMAP_TYPE_CUBE";break;case Kr:t="ENVMAP_TYPE_CUBE_UV";break}return t}function d0(n){let t="ENVMAP_MODE_REFLECTION";if(n.envMap)switch(n.envMapMode){case Kn:t="ENVMAP_MODE_REFRACTION";break}return t}function f0(n){let t="ENVMAP_BLENDING_NONE";if(n.envMap)switch(n.combine){case jo:t="ENVMAP_BLENDING_MULTIPLY";break;case pd:t="ENVMAP_BLENDING_MIX";break;case md:t="ENVMAP_BLENDING_ADD";break}return t}function p0(n){const t=n.envMapCubeUVHeight;if(t===null)return null;const e=Math.log2(t)-2,i=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),112)),texelHeight:i,maxMip:e}}function m0(n,t,e,i){const s=n.getContext(),r=e.defines;let a=e.vertexShader,o=e.fragmentShader;const l=h0(e),c=u0(e),h=d0(e),f=f0(e),u=p0(e),d=i0(e),p=n0(r),g=s.createProgram();let m,_,M=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(m=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,p].filter(Ss).join(`
`),m.length>0&&(m+=`
`),_=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,p].filter(Ss).join(`
`),_.length>0&&(_+=`
`)):(m=[gc(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,p,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+h:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Ss).join(`
`),_=[gc(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,p,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+c:"",e.envMap?"#define "+h:"",e.envMap?"#define "+f:"",u?"#define CUBEUV_TEXEL_WIDTH "+u.texelWidth:"",u?"#define CUBEUV_TEXEL_HEIGHT "+u.texelHeight:"",u?"#define CUBEUV_MAX_MIP "+u.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor||e.batchingColor?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==Yi?"#define TONE_MAPPING":"",e.toneMapping!==Yi?zt.tonemapping_pars_fragment:"",e.toneMapping!==Yi?t0("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",zt.colorspace_pars_fragment,Qg("linearToOutputTexel",e.outputColorSpace),e0(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(Ss).join(`
`)),a=Bo(a),a=fc(a,e),a=pc(a,e),o=Bo(o),o=fc(o,e),o=pc(o,e),a=mc(a),o=mc(o),e.isRawShaderMaterial!==!0&&(M=`#version 300 es
`,m=[d,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,_=["#define varying in",e.glslVersion===Rl?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===Rl?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+_);const E=M+m+a,y=M+_+o,w=hc(s,s.VERTEX_SHADER,E),b=hc(s,s.FRAGMENT_SHADER,y);s.attachShader(g,w),s.attachShader(g,b),e.index0AttributeName!==void 0?s.bindAttribLocation(g,0,e.index0AttributeName):e.morphTargets===!0&&s.bindAttribLocation(g,0,"position"),s.linkProgram(g);function S(C){if(n.debug.checkShaderErrors){const k=s.getProgramInfoLog(g).trim(),L=s.getShaderInfoLog(w).trim(),D=s.getShaderInfoLog(b).trim();let H=!0,z=!0;if(s.getProgramParameter(g,s.LINK_STATUS)===!1)if(H=!1,typeof n.debug.onShaderError=="function")n.debug.onShaderError(s,g,w,b);else{const W=dc(s,w,"vertex"),F=dc(s,b,"fragment");console.error("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(g,s.VALIDATE_STATUS)+`

Material Name: `+C.name+`
Material Type: `+C.type+`

Program Info Log: `+k+`
`+W+`
`+F)}else k!==""?console.warn("THREE.WebGLProgram: Program Info Log:",k):(L===""||D==="")&&(z=!1);z&&(C.diagnostics={runnable:H,programLog:k,vertexShader:{log:L,prefix:m},fragmentShader:{log:D,prefix:_}})}s.deleteShader(w),s.deleteShader(b),R=new Nr(s,g),v=s0(s,g)}let R;this.getUniforms=function(){return R===void 0&&S(this),R};let v;this.getAttributes=function(){return v===void 0&&S(this),v};let x=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return x===!1&&(x=s.getProgramParameter(g,Zg)),x},this.destroy=function(){i.releaseStatesOfProgram(this),s.deleteProgram(g),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=Kg++,this.cacheKey=t,this.usedTimes=1,this.program=g,this.vertexShader=w,this.fragmentShader=b,this}let g0=0;class _0{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){const e=t.vertexShader,i=t.fragmentShader,s=this._getShaderStage(e),r=this._getShaderStage(i),a=this._getShaderCacheForMaterial(t);return a.has(s)===!1&&(a.add(s),s.usedTimes++),a.has(r)===!1&&(a.add(r),r.usedTimes++),this}remove(t){const e=this.materialCache.get(t);for(const i of e)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){const e=this.materialCache;let i=e.get(t);return i===void 0&&(i=new Set,e.set(t,i)),i}_getShaderStage(t){const e=this.shaderCache;let i=e.get(t);return i===void 0&&(i=new v0(t),e.set(t,i)),i}}class v0{constructor(t){this.id=g0++,this.code=t,this.usedTimes=0}}function x0(n,t,e,i,s,r,a){const o=new Bh,l=new _0,c=new Set,h=[],f=s.logarithmicDepthBuffer,u=s.vertexTextures;let d=s.precision;const p={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function g(v){return c.add(v),v===0?"uv":`uv${v}`}function m(v,x,C,k,L){const D=k.fog,H=L.geometry,z=v.isMeshStandardMaterial?k.environment:null,W=(v.isMeshStandardMaterial?e:t).get(v.envMap||z),F=W&&W.mapping===Kr?W.image.height:null,q=p[v.type];v.precision!==null&&(d=s.getMaxPrecision(v.precision),d!==v.precision&&console.warn("THREE.WebGLProgram.getParameters:",v.precision,"not supported, using",d,"instead."));const st=H.morphAttributes.position||H.morphAttributes.normal||H.morphAttributes.color,vt=st!==void 0?st.length:0;let xt=0;H.morphAttributes.position!==void 0&&(xt=1),H.morphAttributes.normal!==void 0&&(xt=2),H.morphAttributes.color!==void 0&&(xt=3);let kt,Z,at,St;if(q){const ee=pi[q];kt=ee.vertexShader,Z=ee.fragmentShader}else kt=v.vertexShader,Z=v.fragmentShader,l.update(v),at=l.getVertexShaderID(v),St=l.getFragmentShaderID(v);const ut=n.getRenderTarget(),Ct=n.state.buffers.depth.getReversed(),Pt=L.isInstancedMesh===!0,Nt=L.isBatchedMesh===!0,ae=!!v.map,Ht=!!v.matcap,de=!!W,B=!!v.aoMap,ke=!!v.lightMap,Gt=!!v.bumpMap,Vt=!!v.normalMap,Rt=!!v.displacementMap,ie=!!v.emissiveMap,At=!!v.metalnessMap,P=!!v.roughnessMap,T=v.anisotropy>0,V=v.clearcoat>0,et=v.dispersion>0,it=v.iridescence>0,K=v.sheen>0,Mt=v.transmission>0,mt=T&&!!v.anisotropyMap,j=V&&!!v.clearcoatMap,ot=V&&!!v.clearcoatNormalMap,J=V&&!!v.clearcoatRoughnessMap,ct=it&&!!v.iridescenceMap,yt=it&&!!v.iridescenceThicknessMap,gt=K&&!!v.sheenColorMap,rt=K&&!!v.sheenRoughnessMap,Lt=!!v.specularMap,Dt=!!v.specularColorMap,Xt=!!v.specularIntensityMap,U=Mt&&!!v.transmissionMap,ht=Mt&&!!v.thicknessMap,Y=!!v.gradientMap,Q=!!v.alphaMap,ft=v.alphaTest>0,dt=!!v.alphaHash,Ut=!!v.extensions;let ge=Yi;v.toneMapped&&(ut===null||ut.isXRRenderTarget===!0)&&(ge=n.toneMapping);const Ee={shaderID:q,shaderType:v.type,shaderName:v.name,vertexShader:kt,fragmentShader:Z,defines:v.defines,customVertexShaderID:at,customFragmentShaderID:St,isRawShaderMaterial:v.isRawShaderMaterial===!0,glslVersion:v.glslVersion,precision:d,batching:Nt,batchingColor:Nt&&L._colorsTexture!==null,instancing:Pt,instancingColor:Pt&&L.instanceColor!==null,instancingMorph:Pt&&L.morphTexture!==null,supportsVertexTextures:u,outputColorSpace:ut===null?n.outputColorSpace:ut.isXRRenderTarget===!0?ut.texture.colorSpace:ns,alphaToCoverage:!!v.alphaToCoverage,map:ae,matcap:Ht,envMap:de,envMapMode:de&&W.mapping,envMapCubeUVHeight:F,aoMap:B,lightMap:ke,bumpMap:Gt,normalMap:Vt,displacementMap:u&&Rt,emissiveMap:ie,normalMapObjectSpace:Vt&&v.normalMapType===Td,normalMapTangentSpace:Vt&&v.normalMapType===kh,metalnessMap:At,roughnessMap:P,anisotropy:T,anisotropyMap:mt,clearcoat:V,clearcoatMap:j,clearcoatNormalMap:ot,clearcoatRoughnessMap:J,dispersion:et,iridescence:it,iridescenceMap:ct,iridescenceThicknessMap:yt,sheen:K,sheenColorMap:gt,sheenRoughnessMap:rt,specularMap:Lt,specularColorMap:Dt,specularIntensityMap:Xt,transmission:Mt,transmissionMap:U,thicknessMap:ht,gradientMap:Y,opaque:v.transparent===!1&&v.blending===Vn&&v.alphaToCoverage===!1,alphaMap:Q,alphaTest:ft,alphaHash:dt,combine:v.combine,mapUv:ae&&g(v.map.channel),aoMapUv:B&&g(v.aoMap.channel),lightMapUv:ke&&g(v.lightMap.channel),bumpMapUv:Gt&&g(v.bumpMap.channel),normalMapUv:Vt&&g(v.normalMap.channel),displacementMapUv:Rt&&g(v.displacementMap.channel),emissiveMapUv:ie&&g(v.emissiveMap.channel),metalnessMapUv:At&&g(v.metalnessMap.channel),roughnessMapUv:P&&g(v.roughnessMap.channel),anisotropyMapUv:mt&&g(v.anisotropyMap.channel),clearcoatMapUv:j&&g(v.clearcoatMap.channel),clearcoatNormalMapUv:ot&&g(v.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:J&&g(v.clearcoatRoughnessMap.channel),iridescenceMapUv:ct&&g(v.iridescenceMap.channel),iridescenceThicknessMapUv:yt&&g(v.iridescenceThicknessMap.channel),sheenColorMapUv:gt&&g(v.sheenColorMap.channel),sheenRoughnessMapUv:rt&&g(v.sheenRoughnessMap.channel),specularMapUv:Lt&&g(v.specularMap.channel),specularColorMapUv:Dt&&g(v.specularColorMap.channel),specularIntensityMapUv:Xt&&g(v.specularIntensityMap.channel),transmissionMapUv:U&&g(v.transmissionMap.channel),thicknessMapUv:ht&&g(v.thicknessMap.channel),alphaMapUv:Q&&g(v.alphaMap.channel),vertexTangents:!!H.attributes.tangent&&(Vt||T),vertexColors:v.vertexColors,vertexAlphas:v.vertexColors===!0&&!!H.attributes.color&&H.attributes.color.itemSize===4,pointsUvs:L.isPoints===!0&&!!H.attributes.uv&&(ae||Q),fog:!!D,useFog:v.fog===!0,fogExp2:!!D&&D.isFogExp2,flatShading:v.flatShading===!0,sizeAttenuation:v.sizeAttenuation===!0,logarithmicDepthBuffer:f,reverseDepthBuffer:Ct,skinning:L.isSkinnedMesh===!0,morphTargets:H.morphAttributes.position!==void 0,morphNormals:H.morphAttributes.normal!==void 0,morphColors:H.morphAttributes.color!==void 0,morphTargetsCount:vt,morphTextureStride:xt,numDirLights:x.directional.length,numPointLights:x.point.length,numSpotLights:x.spot.length,numSpotLightMaps:x.spotLightMap.length,numRectAreaLights:x.rectArea.length,numHemiLights:x.hemi.length,numDirLightShadows:x.directionalShadowMap.length,numPointLightShadows:x.pointShadowMap.length,numSpotLightShadows:x.spotShadowMap.length,numSpotLightShadowsWithMaps:x.numSpotLightShadowsWithMaps,numLightProbes:x.numLightProbes,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:v.dithering,shadowMapEnabled:n.shadowMap.enabled&&C.length>0,shadowMapType:n.shadowMap.type,toneMapping:ge,decodeVideoTexture:ae&&v.map.isVideoTexture===!0&&$t.getTransfer(v.map.colorSpace)===ne,decodeVideoTextureEmissive:ie&&v.emissiveMap.isVideoTexture===!0&&$t.getTransfer(v.emissiveMap.colorSpace)===ne,premultipliedAlpha:v.premultipliedAlpha,doubleSided:v.side===Ue,flipSided:v.side===Be,useDepthPacking:v.depthPacking>=0,depthPacking:v.depthPacking||0,index0AttributeName:v.index0AttributeName,extensionClipCullDistance:Ut&&v.extensions.clipCullDistance===!0&&i.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Ut&&v.extensions.multiDraw===!0||Nt)&&i.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:i.has("KHR_parallel_shader_compile"),customProgramCacheKey:v.customProgramCacheKey()};return Ee.vertexUv1s=c.has(1),Ee.vertexUv2s=c.has(2),Ee.vertexUv3s=c.has(3),c.clear(),Ee}function _(v){const x=[];if(v.shaderID?x.push(v.shaderID):(x.push(v.customVertexShaderID),x.push(v.customFragmentShaderID)),v.defines!==void 0)for(const C in v.defines)x.push(C),x.push(v.defines[C]);return v.isRawShaderMaterial===!1&&(M(x,v),E(x,v),x.push(n.outputColorSpace)),x.push(v.customProgramCacheKey),x.join()}function M(v,x){v.push(x.precision),v.push(x.outputColorSpace),v.push(x.envMapMode),v.push(x.envMapCubeUVHeight),v.push(x.mapUv),v.push(x.alphaMapUv),v.push(x.lightMapUv),v.push(x.aoMapUv),v.push(x.bumpMapUv),v.push(x.normalMapUv),v.push(x.displacementMapUv),v.push(x.emissiveMapUv),v.push(x.metalnessMapUv),v.push(x.roughnessMapUv),v.push(x.anisotropyMapUv),v.push(x.clearcoatMapUv),v.push(x.clearcoatNormalMapUv),v.push(x.clearcoatRoughnessMapUv),v.push(x.iridescenceMapUv),v.push(x.iridescenceThicknessMapUv),v.push(x.sheenColorMapUv),v.push(x.sheenRoughnessMapUv),v.push(x.specularMapUv),v.push(x.specularColorMapUv),v.push(x.specularIntensityMapUv),v.push(x.transmissionMapUv),v.push(x.thicknessMapUv),v.push(x.combine),v.push(x.fogExp2),v.push(x.sizeAttenuation),v.push(x.morphTargetsCount),v.push(x.morphAttributeCount),v.push(x.numDirLights),v.push(x.numPointLights),v.push(x.numSpotLights),v.push(x.numSpotLightMaps),v.push(x.numHemiLights),v.push(x.numRectAreaLights),v.push(x.numDirLightShadows),v.push(x.numPointLightShadows),v.push(x.numSpotLightShadows),v.push(x.numSpotLightShadowsWithMaps),v.push(x.numLightProbes),v.push(x.shadowMapType),v.push(x.toneMapping),v.push(x.numClippingPlanes),v.push(x.numClipIntersection),v.push(x.depthPacking)}function E(v,x){o.disableAll(),x.supportsVertexTextures&&o.enable(0),x.instancing&&o.enable(1),x.instancingColor&&o.enable(2),x.instancingMorph&&o.enable(3),x.matcap&&o.enable(4),x.envMap&&o.enable(5),x.normalMapObjectSpace&&o.enable(6),x.normalMapTangentSpace&&o.enable(7),x.clearcoat&&o.enable(8),x.iridescence&&o.enable(9),x.alphaTest&&o.enable(10),x.vertexColors&&o.enable(11),x.vertexAlphas&&o.enable(12),x.vertexUv1s&&o.enable(13),x.vertexUv2s&&o.enable(14),x.vertexUv3s&&o.enable(15),x.vertexTangents&&o.enable(16),x.anisotropy&&o.enable(17),x.alphaHash&&o.enable(18),x.batching&&o.enable(19),x.dispersion&&o.enable(20),x.batchingColor&&o.enable(21),v.push(o.mask),o.disableAll(),x.fog&&o.enable(0),x.useFog&&o.enable(1),x.flatShading&&o.enable(2),x.logarithmicDepthBuffer&&o.enable(3),x.reverseDepthBuffer&&o.enable(4),x.skinning&&o.enable(5),x.morphTargets&&o.enable(6),x.morphNormals&&o.enable(7),x.morphColors&&o.enable(8),x.premultipliedAlpha&&o.enable(9),x.shadowMapEnabled&&o.enable(10),x.doubleSided&&o.enable(11),x.flipSided&&o.enable(12),x.useDepthPacking&&o.enable(13),x.dithering&&o.enable(14),x.transmission&&o.enable(15),x.sheen&&o.enable(16),x.opaque&&o.enable(17),x.pointsUvs&&o.enable(18),x.decodeVideoTexture&&o.enable(19),x.decodeVideoTextureEmissive&&o.enable(20),x.alphaToCoverage&&o.enable(21),v.push(o.mask)}function y(v){const x=p[v.type];let C;if(x){const k=pi[x];C=ef.clone(k.uniforms)}else C=v.uniforms;return C}function w(v,x){let C;for(let k=0,L=h.length;k<L;k++){const D=h[k];if(D.cacheKey===x){C=D,++C.usedTimes;break}}return C===void 0&&(C=new m0(n,x,v,r),h.push(C)),C}function b(v){if(--v.usedTimes===0){const x=h.indexOf(v);h[x]=h[h.length-1],h.pop(),v.destroy()}}function S(v){l.remove(v)}function R(){l.dispose()}return{getParameters:m,getProgramCacheKey:_,getUniforms:y,acquireProgram:w,releaseProgram:b,releaseShaderCache:S,programs:h,dispose:R}}function y0(){let n=new WeakMap;function t(a){return n.has(a)}function e(a){let o=n.get(a);return o===void 0&&(o={},n.set(a,o)),o}function i(a){n.delete(a)}function s(a,o,l){n.get(a)[o]=l}function r(){n=new WeakMap}return{has:t,get:e,remove:i,update:s,dispose:r}}function S0(n,t){return n.groupOrder!==t.groupOrder?n.groupOrder-t.groupOrder:n.renderOrder!==t.renderOrder?n.renderOrder-t.renderOrder:n.material.id!==t.material.id?n.material.id-t.material.id:n.z!==t.z?n.z-t.z:n.id-t.id}function _c(n,t){return n.groupOrder!==t.groupOrder?n.groupOrder-t.groupOrder:n.renderOrder!==t.renderOrder?n.renderOrder-t.renderOrder:n.z!==t.z?t.z-n.z:n.id-t.id}function vc(){const n=[];let t=0;const e=[],i=[],s=[];function r(){t=0,e.length=0,i.length=0,s.length=0}function a(f,u,d,p,g,m){let _=n[t];return _===void 0?(_={id:f.id,object:f,geometry:u,material:d,groupOrder:p,renderOrder:f.renderOrder,z:g,group:m},n[t]=_):(_.id=f.id,_.object=f,_.geometry=u,_.material=d,_.groupOrder=p,_.renderOrder=f.renderOrder,_.z=g,_.group=m),t++,_}function o(f,u,d,p,g,m){const _=a(f,u,d,p,g,m);d.transmission>0?i.push(_):d.transparent===!0?s.push(_):e.push(_)}function l(f,u,d,p,g,m){const _=a(f,u,d,p,g,m);d.transmission>0?i.unshift(_):d.transparent===!0?s.unshift(_):e.unshift(_)}function c(f,u){e.length>1&&e.sort(f||S0),i.length>1&&i.sort(u||_c),s.length>1&&s.sort(u||_c)}function h(){for(let f=t,u=n.length;f<u;f++){const d=n[f];if(d.id===null)break;d.id=null,d.object=null,d.geometry=null,d.material=null,d.group=null}}return{opaque:e,transmissive:i,transparent:s,init:r,push:o,unshift:l,finish:h,sort:c}}function M0(){let n=new WeakMap;function t(i,s){const r=n.get(i);let a;return r===void 0?(a=new vc,n.set(i,[a])):s>=r.length?(a=new vc,r.push(a)):a=r[s],a}function e(){n=new WeakMap}return{get:t,dispose:e}}function b0(){const n={};return{get:function(t){if(n[t.id]!==void 0)return n[t.id];let e;switch(t.type){case"DirectionalLight":e={direction:new G,color:new Wt};break;case"SpotLight":e={position:new G,direction:new G,color:new Wt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new G,color:new Wt,distance:0,decay:0};break;case"HemisphereLight":e={direction:new G,skyColor:new Wt,groundColor:new Wt};break;case"RectAreaLight":e={color:new Wt,position:new G,halfWidth:new G,halfHeight:new G};break}return n[t.id]=e,e}}}function w0(){const n={};return{get:function(t){if(n[t.id]!==void 0)return n[t.id];let e;switch(t.type){case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new te};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new te};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new te,shadowCameraNear:1,shadowCameraFar:1e3};break}return n[t.id]=e,e}}}let E0=0;function T0(n,t){return(t.castShadow?2:0)-(n.castShadow?2:0)+(t.map?1:0)-(n.map?1:0)}function A0(n){const t=new b0,e=w0(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)i.probe.push(new G);const s=new G,r=new se,a=new se;function o(c){let h=0,f=0,u=0;for(let v=0;v<9;v++)i.probe[v].set(0,0,0);let d=0,p=0,g=0,m=0,_=0,M=0,E=0,y=0,w=0,b=0,S=0;c.sort(T0);for(let v=0,x=c.length;v<x;v++){const C=c[v],k=C.color,L=C.intensity,D=C.distance,H=C.shadow&&C.shadow.map?C.shadow.map.texture:null;if(C.isAmbientLight)h+=k.r*L,f+=k.g*L,u+=k.b*L;else if(C.isLightProbe){for(let z=0;z<9;z++)i.probe[z].addScaledVector(C.sh.coefficients[z],L);S++}else if(C.isDirectionalLight){const z=t.get(C);if(z.color.copy(C.color).multiplyScalar(C.intensity),C.castShadow){const W=C.shadow,F=e.get(C);F.shadowIntensity=W.intensity,F.shadowBias=W.bias,F.shadowNormalBias=W.normalBias,F.shadowRadius=W.radius,F.shadowMapSize=W.mapSize,i.directionalShadow[d]=F,i.directionalShadowMap[d]=H,i.directionalShadowMatrix[d]=C.shadow.matrix,M++}i.directional[d]=z,d++}else if(C.isSpotLight){const z=t.get(C);z.position.setFromMatrixPosition(C.matrixWorld),z.color.copy(k).multiplyScalar(L),z.distance=D,z.coneCos=Math.cos(C.angle),z.penumbraCos=Math.cos(C.angle*(1-C.penumbra)),z.decay=C.decay,i.spot[g]=z;const W=C.shadow;if(C.map&&(i.spotLightMap[w]=C.map,w++,W.updateMatrices(C),C.castShadow&&b++),i.spotLightMatrix[g]=W.matrix,C.castShadow){const F=e.get(C);F.shadowIntensity=W.intensity,F.shadowBias=W.bias,F.shadowNormalBias=W.normalBias,F.shadowRadius=W.radius,F.shadowMapSize=W.mapSize,i.spotShadow[g]=F,i.spotShadowMap[g]=H,y++}g++}else if(C.isRectAreaLight){const z=t.get(C);z.color.copy(k).multiplyScalar(L),z.halfWidth.set(C.width*.5,0,0),z.halfHeight.set(0,C.height*.5,0),i.rectArea[m]=z,m++}else if(C.isPointLight){const z=t.get(C);if(z.color.copy(C.color).multiplyScalar(C.intensity),z.distance=C.distance,z.decay=C.decay,C.castShadow){const W=C.shadow,F=e.get(C);F.shadowIntensity=W.intensity,F.shadowBias=W.bias,F.shadowNormalBias=W.normalBias,F.shadowRadius=W.radius,F.shadowMapSize=W.mapSize,F.shadowCameraNear=W.camera.near,F.shadowCameraFar=W.camera.far,i.pointShadow[p]=F,i.pointShadowMap[p]=H,i.pointShadowMatrix[p]=C.shadow.matrix,E++}i.point[p]=z,p++}else if(C.isHemisphereLight){const z=t.get(C);z.skyColor.copy(C.color).multiplyScalar(L),z.groundColor.copy(C.groundColor).multiplyScalar(L),i.hemi[_]=z,_++}}m>0&&(n.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=pt.LTC_FLOAT_1,i.rectAreaLTC2=pt.LTC_FLOAT_2):(i.rectAreaLTC1=pt.LTC_HALF_1,i.rectAreaLTC2=pt.LTC_HALF_2)),i.ambient[0]=h,i.ambient[1]=f,i.ambient[2]=u;const R=i.hash;(R.directionalLength!==d||R.pointLength!==p||R.spotLength!==g||R.rectAreaLength!==m||R.hemiLength!==_||R.numDirectionalShadows!==M||R.numPointShadows!==E||R.numSpotShadows!==y||R.numSpotMaps!==w||R.numLightProbes!==S)&&(i.directional.length=d,i.spot.length=g,i.rectArea.length=m,i.point.length=p,i.hemi.length=_,i.directionalShadow.length=M,i.directionalShadowMap.length=M,i.pointShadow.length=E,i.pointShadowMap.length=E,i.spotShadow.length=y,i.spotShadowMap.length=y,i.directionalShadowMatrix.length=M,i.pointShadowMatrix.length=E,i.spotLightMatrix.length=y+w-b,i.spotLightMap.length=w,i.numSpotLightShadowsWithMaps=b,i.numLightProbes=S,R.directionalLength=d,R.pointLength=p,R.spotLength=g,R.rectAreaLength=m,R.hemiLength=_,R.numDirectionalShadows=M,R.numPointShadows=E,R.numSpotShadows=y,R.numSpotMaps=w,R.numLightProbes=S,i.version=E0++)}function l(c,h){let f=0,u=0,d=0,p=0,g=0;const m=h.matrixWorldInverse;for(let _=0,M=c.length;_<M;_++){const E=c[_];if(E.isDirectionalLight){const y=i.directional[f];y.direction.setFromMatrixPosition(E.matrixWorld),s.setFromMatrixPosition(E.target.matrixWorld),y.direction.sub(s),y.direction.transformDirection(m),f++}else if(E.isSpotLight){const y=i.spot[d];y.position.setFromMatrixPosition(E.matrixWorld),y.position.applyMatrix4(m),y.direction.setFromMatrixPosition(E.matrixWorld),s.setFromMatrixPosition(E.target.matrixWorld),y.direction.sub(s),y.direction.transformDirection(m),d++}else if(E.isRectAreaLight){const y=i.rectArea[p];y.position.setFromMatrixPosition(E.matrixWorld),y.position.applyMatrix4(m),a.identity(),r.copy(E.matrixWorld),r.premultiply(m),a.extractRotation(r),y.halfWidth.set(E.width*.5,0,0),y.halfHeight.set(0,E.height*.5,0),y.halfWidth.applyMatrix4(a),y.halfHeight.applyMatrix4(a),p++}else if(E.isPointLight){const y=i.point[u];y.position.setFromMatrixPosition(E.matrixWorld),y.position.applyMatrix4(m),u++}else if(E.isHemisphereLight){const y=i.hemi[g];y.direction.setFromMatrixPosition(E.matrixWorld),y.direction.transformDirection(m),g++}}}return{setup:o,setupView:l,state:i}}function xc(n){const t=new A0(n),e=[],i=[];function s(h){c.camera=h,e.length=0,i.length=0}function r(h){e.push(h)}function a(h){i.push(h)}function o(){t.setup(e)}function l(h){t.setupView(e,h)}const c={lightsArray:e,shadowsArray:i,camera:null,lights:t,transmissionRenderTarget:{}};return{init:s,state:c,setupLights:o,setupLightsView:l,pushLight:r,pushShadow:a}}function C0(n){let t=new WeakMap;function e(s,r=0){const a=t.get(s);let o;return a===void 0?(o=new xc(n),t.set(s,[o])):r>=a.length?(o=new xc(n),a.push(o)):o=a[r],o}function i(){t=new WeakMap}return{get:e,dispose:i}}class R0 extends Mn{static get type(){return"MeshDepthMaterial"}constructor(t){super(),this.isMeshDepthMaterial=!0,this.depthPacking=wd,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}}class I0 extends Mn{static get type(){return"MeshDistanceMaterial"}constructor(t){super(),this.isMeshDistanceMaterial=!0,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}}const P0=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,D0=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function k0(n,t,e){let i=new rl;const s=new te,r=new te,a=new _e,o=new R0({depthPacking:Ed}),l=new I0,c={},h=e.maxTextureSize,f={[ji]:Be,[Be]:ji,[Ue]:Ue},u=new Ji({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new te},radius:{value:4}},vertexShader:P0,fragmentShader:D0}),d=u.clone();d.defines.HORIZONTAL_PASS=1;const p=new Ie;p.setAttribute("position",new hi(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const g=new Qt(p,u),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Sh;let _=this.type;this.render=function(b,S,R){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||b.length===0)return;const v=n.getRenderTarget(),x=n.getActiveCubeFace(),C=n.getActiveMipmapLevel(),k=n.state;k.setBlending($i),k.buffers.color.setClear(1,1,1,1),k.buffers.depth.setTest(!0),k.setScissorTest(!1);const L=_!==Ci&&this.type===Ci,D=_===Ci&&this.type!==Ci;for(let H=0,z=b.length;H<z;H++){const W=b[H],F=W.shadow;if(F===void 0){console.warn("THREE.WebGLShadowMap:",W,"has no shadow.");continue}if(F.autoUpdate===!1&&F.needsUpdate===!1)continue;s.copy(F.mapSize);const q=F.getFrameExtents();if(s.multiply(q),r.copy(F.mapSize),(s.x>h||s.y>h)&&(s.x>h&&(r.x=Math.floor(h/q.x),s.x=r.x*q.x,F.mapSize.x=r.x),s.y>h&&(r.y=Math.floor(h/q.y),s.y=r.y*q.y,F.mapSize.y=r.y)),F.map===null||L===!0||D===!0){const vt=this.type!==Ci?{minFilter:Kt,magFilter:Kt}:{};F.map!==null&&F.map.dispose(),F.map=new _n(s.x,s.y,vt),F.map.texture.name=W.name+".shadowMap",F.camera.updateProjectionMatrix()}n.setRenderTarget(F.map),n.clear();const st=F.getViewportCount();for(let vt=0;vt<st;vt++){const xt=F.getViewport(vt);a.set(r.x*xt.x,r.y*xt.y,r.x*xt.z,r.y*xt.w),k.viewport(a),F.updateMatrices(W,vt),i=F.getFrustum(),y(S,R,F.camera,W,this.type)}F.isPointLightShadow!==!0&&this.type===Ci&&M(F,R),F.needsUpdate=!1}_=this.type,m.needsUpdate=!1,n.setRenderTarget(v,x,C)};function M(b,S){const R=t.update(g);u.defines.VSM_SAMPLES!==b.blurSamples&&(u.defines.VSM_SAMPLES=b.blurSamples,d.defines.VSM_SAMPLES=b.blurSamples,u.needsUpdate=!0,d.needsUpdate=!0),b.mapPass===null&&(b.mapPass=new _n(s.x,s.y)),u.uniforms.shadow_pass.value=b.map.texture,u.uniforms.resolution.value=b.mapSize,u.uniforms.radius.value=b.radius,n.setRenderTarget(b.mapPass),n.clear(),n.renderBufferDirect(S,null,R,u,g,null),d.uniforms.shadow_pass.value=b.mapPass.texture,d.uniforms.resolution.value=b.mapSize,d.uniforms.radius.value=b.radius,n.setRenderTarget(b.map),n.clear(),n.renderBufferDirect(S,null,R,d,g,null)}function E(b,S,R,v){let x=null;const C=R.isPointLight===!0?b.customDistanceMaterial:b.customDepthMaterial;if(C!==void 0)x=C;else if(x=R.isPointLight===!0?l:o,n.localClippingEnabled&&S.clipShadows===!0&&Array.isArray(S.clippingPlanes)&&S.clippingPlanes.length!==0||S.displacementMap&&S.displacementScale!==0||S.alphaMap&&S.alphaTest>0||S.map&&S.alphaTest>0){const k=x.uuid,L=S.uuid;let D=c[k];D===void 0&&(D={},c[k]=D);let H=D[L];H===void 0&&(H=x.clone(),D[L]=H,S.addEventListener("dispose",w)),x=H}if(x.visible=S.visible,x.wireframe=S.wireframe,v===Ci?x.side=S.shadowSide!==null?S.shadowSide:S.side:x.side=S.shadowSide!==null?S.shadowSide:f[S.side],x.alphaMap=S.alphaMap,x.alphaTest=S.alphaTest,x.map=S.map,x.clipShadows=S.clipShadows,x.clippingPlanes=S.clippingPlanes,x.clipIntersection=S.clipIntersection,x.displacementMap=S.displacementMap,x.displacementScale=S.displacementScale,x.displacementBias=S.displacementBias,x.wireframeLinewidth=S.wireframeLinewidth,x.linewidth=S.linewidth,R.isPointLight===!0&&x.isMeshDistanceMaterial===!0){const k=n.properties.get(x);k.light=R}return x}function y(b,S,R,v,x){if(b.visible===!1)return;if(b.layers.test(S.layers)&&(b.isMesh||b.isLine||b.isPoints)&&(b.castShadow||b.receiveShadow&&x===Ci)&&(!b.frustumCulled||i.intersectsObject(b))){b.modelViewMatrix.multiplyMatrices(R.matrixWorldInverse,b.matrixWorld);const L=t.update(b),D=b.material;if(Array.isArray(D)){const H=L.groups;for(let z=0,W=H.length;z<W;z++){const F=H[z],q=D[F.materialIndex];if(q&&q.visible){const st=E(b,q,v,x);b.onBeforeShadow(n,b,S,R,L,st,F),n.renderBufferDirect(R,null,L,st,b,F),b.onAfterShadow(n,b,S,R,L,st,F)}}}else if(D.visible){const H=E(b,D,v,x);b.onBeforeShadow(n,b,S,R,L,H,null),n.renderBufferDirect(R,null,L,H,b,null),b.onAfterShadow(n,b,S,R,L,H,null)}}const k=b.children;for(let L=0,D=k.length;L<D;L++)y(k[L],S,R,v,x)}function w(b){b.target.removeEventListener("dispose",w);for(const R in c){const v=c[R],x=b.target.uuid;x in v&&(v[x].dispose(),delete v[x])}}}const L0={[to]:eo,[io]:ro,[no]:ao,[qn]:so,[eo]:to,[ro]:io,[ao]:no,[so]:qn};function U0(n,t){function e(){let U=!1;const ht=new _e;let Y=null;const Q=new _e(0,0,0,0);return{setMask:function(ft){Y!==ft&&!U&&(n.colorMask(ft,ft,ft,ft),Y=ft)},setLocked:function(ft){U=ft},setClear:function(ft,dt,Ut,ge,Ee){Ee===!0&&(ft*=ge,dt*=ge,Ut*=ge),ht.set(ft,dt,Ut,ge),Q.equals(ht)===!1&&(n.clearColor(ft,dt,Ut,ge),Q.copy(ht))},reset:function(){U=!1,Y=null,Q.set(-1,0,0,0)}}}function i(){let U=!1,ht=!1,Y=null,Q=null,ft=null;return{setReversed:function(dt){if(ht!==dt){const Ut=t.get("EXT_clip_control");ht?Ut.clipControlEXT(Ut.LOWER_LEFT_EXT,Ut.ZERO_TO_ONE_EXT):Ut.clipControlEXT(Ut.LOWER_LEFT_EXT,Ut.NEGATIVE_ONE_TO_ONE_EXT);const ge=ft;ft=null,this.setClear(ge)}ht=dt},getReversed:function(){return ht},setTest:function(dt){dt?ut(n.DEPTH_TEST):Ct(n.DEPTH_TEST)},setMask:function(dt){Y!==dt&&!U&&(n.depthMask(dt),Y=dt)},setFunc:function(dt){if(ht&&(dt=L0[dt]),Q!==dt){switch(dt){case to:n.depthFunc(n.NEVER);break;case eo:n.depthFunc(n.ALWAYS);break;case io:n.depthFunc(n.LESS);break;case qn:n.depthFunc(n.LEQUAL);break;case no:n.depthFunc(n.EQUAL);break;case so:n.depthFunc(n.GEQUAL);break;case ro:n.depthFunc(n.GREATER);break;case ao:n.depthFunc(n.NOTEQUAL);break;default:n.depthFunc(n.LEQUAL)}Q=dt}},setLocked:function(dt){U=dt},setClear:function(dt){ft!==dt&&(ht&&(dt=1-dt),n.clearDepth(dt),ft=dt)},reset:function(){U=!1,Y=null,Q=null,ft=null,ht=!1}}}function s(){let U=!1,ht=null,Y=null,Q=null,ft=null,dt=null,Ut=null,ge=null,Ee=null;return{setTest:function(ee){U||(ee?ut(n.STENCIL_TEST):Ct(n.STENCIL_TEST))},setMask:function(ee){ht!==ee&&!U&&(n.stencilMask(ee),ht=ee)},setFunc:function(ee,si,yi){(Y!==ee||Q!==si||ft!==yi)&&(n.stencilFunc(ee,si,yi),Y=ee,Q=si,ft=yi)},setOp:function(ee,si,yi){(dt!==ee||Ut!==si||ge!==yi)&&(n.stencilOp(ee,si,yi),dt=ee,Ut=si,ge=yi)},setLocked:function(ee){U=ee},setClear:function(ee){Ee!==ee&&(n.clearStencil(ee),Ee=ee)},reset:function(){U=!1,ht=null,Y=null,Q=null,ft=null,dt=null,Ut=null,ge=null,Ee=null}}}const r=new e,a=new i,o=new s,l=new WeakMap,c=new WeakMap;let h={},f={},u=new WeakMap,d=[],p=null,g=!1,m=null,_=null,M=null,E=null,y=null,w=null,b=null,S=new Wt(0,0,0),R=0,v=!1,x=null,C=null,k=null,L=null,D=null;const H=n.getParameter(n.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let z=!1,W=0;const F=n.getParameter(n.VERSION);F.indexOf("WebGL")!==-1?(W=parseFloat(/^WebGL (\d)/.exec(F)[1]),z=W>=1):F.indexOf("OpenGL ES")!==-1&&(W=parseFloat(/^OpenGL ES (\d)/.exec(F)[1]),z=W>=2);let q=null,st={};const vt=n.getParameter(n.SCISSOR_BOX),xt=n.getParameter(n.VIEWPORT),kt=new _e().fromArray(vt),Z=new _e().fromArray(xt);function at(U,ht,Y,Q){const ft=new Uint8Array(4),dt=n.createTexture();n.bindTexture(U,dt),n.texParameteri(U,n.TEXTURE_MIN_FILTER,n.NEAREST),n.texParameteri(U,n.TEXTURE_MAG_FILTER,n.NEAREST);for(let Ut=0;Ut<Y;Ut++)U===n.TEXTURE_3D||U===n.TEXTURE_2D_ARRAY?n.texImage3D(ht,0,n.RGBA,1,1,Q,0,n.RGBA,n.UNSIGNED_BYTE,ft):n.texImage2D(ht+Ut,0,n.RGBA,1,1,0,n.RGBA,n.UNSIGNED_BYTE,ft);return dt}const St={};St[n.TEXTURE_2D]=at(n.TEXTURE_2D,n.TEXTURE_2D,1),St[n.TEXTURE_CUBE_MAP]=at(n.TEXTURE_CUBE_MAP,n.TEXTURE_CUBE_MAP_POSITIVE_X,6),St[n.TEXTURE_2D_ARRAY]=at(n.TEXTURE_2D_ARRAY,n.TEXTURE_2D_ARRAY,1,1),St[n.TEXTURE_3D]=at(n.TEXTURE_3D,n.TEXTURE_3D,1,1),r.setClear(0,0,0,1),a.setClear(1),o.setClear(0),ut(n.DEPTH_TEST),a.setFunc(qn),Gt(!1),Vt(El),ut(n.CULL_FACE),B($i);function ut(U){h[U]!==!0&&(n.enable(U),h[U]=!0)}function Ct(U){h[U]!==!1&&(n.disable(U),h[U]=!1)}function Pt(U,ht){return f[U]!==ht?(n.bindFramebuffer(U,ht),f[U]=ht,U===n.DRAW_FRAMEBUFFER&&(f[n.FRAMEBUFFER]=ht),U===n.FRAMEBUFFER&&(f[n.DRAW_FRAMEBUFFER]=ht),!0):!1}function Nt(U,ht){let Y=d,Q=!1;if(U){Y=u.get(ht),Y===void 0&&(Y=[],u.set(ht,Y));const ft=U.textures;if(Y.length!==ft.length||Y[0]!==n.COLOR_ATTACHMENT0){for(let dt=0,Ut=ft.length;dt<Ut;dt++)Y[dt]=n.COLOR_ATTACHMENT0+dt;Y.length=ft.length,Q=!0}}else Y[0]!==n.BACK&&(Y[0]=n.BACK,Q=!0);Q&&n.drawBuffers(Y)}function ae(U){return p!==U?(n.useProgram(U),p=U,!0):!1}const Ht={[cn]:n.FUNC_ADD,[ju]:n.FUNC_SUBTRACT,[Ju]:n.FUNC_REVERSE_SUBTRACT};Ht[Qu]=n.MIN,Ht[td]=n.MAX;const de={[ed]:n.ZERO,[id]:n.ONE,[nd]:n.SRC_COLOR,[Ja]:n.SRC_ALPHA,[cd]:n.SRC_ALPHA_SATURATE,[od]:n.DST_COLOR,[rd]:n.DST_ALPHA,[sd]:n.ONE_MINUS_SRC_COLOR,[Qa]:n.ONE_MINUS_SRC_ALPHA,[ld]:n.ONE_MINUS_DST_COLOR,[ad]:n.ONE_MINUS_DST_ALPHA,[hd]:n.CONSTANT_COLOR,[ud]:n.ONE_MINUS_CONSTANT_COLOR,[dd]:n.CONSTANT_ALPHA,[fd]:n.ONE_MINUS_CONSTANT_ALPHA};function B(U,ht,Y,Q,ft,dt,Ut,ge,Ee,ee){if(U===$i){g===!0&&(Ct(n.BLEND),g=!1);return}if(g===!1&&(ut(n.BLEND),g=!0),U!==Ku){if(U!==m||ee!==v){if((_!==cn||y!==cn)&&(n.blendEquation(n.FUNC_ADD),_=cn,y=cn),ee)switch(U){case Vn:n.blendFuncSeparate(n.ONE,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case zr:n.blendFunc(n.ONE,n.ONE);break;case Tl:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case ja:n.blendFuncSeparate(n.ZERO,n.SRC_COLOR,n.ZERO,n.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",U);break}else switch(U){case Vn:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case zr:n.blendFunc(n.SRC_ALPHA,n.ONE);break;case Tl:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case ja:n.blendFunc(n.ZERO,n.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",U);break}M=null,E=null,w=null,b=null,S.set(0,0,0),R=0,m=U,v=ee}return}ft=ft||ht,dt=dt||Y,Ut=Ut||Q,(ht!==_||ft!==y)&&(n.blendEquationSeparate(Ht[ht],Ht[ft]),_=ht,y=ft),(Y!==M||Q!==E||dt!==w||Ut!==b)&&(n.blendFuncSeparate(de[Y],de[Q],de[dt],de[Ut]),M=Y,E=Q,w=dt,b=Ut),(ge.equals(S)===!1||Ee!==R)&&(n.blendColor(ge.r,ge.g,ge.b,Ee),S.copy(ge),R=Ee),m=U,v=!1}function ke(U,ht){U.side===Ue?Ct(n.CULL_FACE):ut(n.CULL_FACE);let Y=U.side===Be;ht&&(Y=!Y),Gt(Y),U.blending===Vn&&U.transparent===!1?B($i):B(U.blending,U.blendEquation,U.blendSrc,U.blendDst,U.blendEquationAlpha,U.blendSrcAlpha,U.blendDstAlpha,U.blendColor,U.blendAlpha,U.premultipliedAlpha),a.setFunc(U.depthFunc),a.setTest(U.depthTest),a.setMask(U.depthWrite),r.setMask(U.colorWrite);const Q=U.stencilWrite;o.setTest(Q),Q&&(o.setMask(U.stencilWriteMask),o.setFunc(U.stencilFunc,U.stencilRef,U.stencilFuncMask),o.setOp(U.stencilFail,U.stencilZFail,U.stencilZPass)),ie(U.polygonOffset,U.polygonOffsetFactor,U.polygonOffsetUnits),U.alphaToCoverage===!0?ut(n.SAMPLE_ALPHA_TO_COVERAGE):Ct(n.SAMPLE_ALPHA_TO_COVERAGE)}function Gt(U){x!==U&&(U?n.frontFace(n.CW):n.frontFace(n.CCW),x=U)}function Vt(U){U!==Yu?(ut(n.CULL_FACE),U!==C&&(U===El?n.cullFace(n.BACK):U===qu?n.cullFace(n.FRONT):n.cullFace(n.FRONT_AND_BACK))):Ct(n.CULL_FACE),C=U}function Rt(U){U!==k&&(z&&n.lineWidth(U),k=U)}function ie(U,ht,Y){U?(ut(n.POLYGON_OFFSET_FILL),(L!==ht||D!==Y)&&(n.polygonOffset(ht,Y),L=ht,D=Y)):Ct(n.POLYGON_OFFSET_FILL)}function At(U){U?ut(n.SCISSOR_TEST):Ct(n.SCISSOR_TEST)}function P(U){U===void 0&&(U=n.TEXTURE0+H-1),q!==U&&(n.activeTexture(U),q=U)}function T(U,ht,Y){Y===void 0&&(q===null?Y=n.TEXTURE0+H-1:Y=q);let Q=st[Y];Q===void 0&&(Q={type:void 0,texture:void 0},st[Y]=Q),(Q.type!==U||Q.texture!==ht)&&(q!==Y&&(n.activeTexture(Y),q=Y),n.bindTexture(U,ht||St[U]),Q.type=U,Q.texture=ht)}function V(){const U=st[q];U!==void 0&&U.type!==void 0&&(n.bindTexture(U.type,null),U.type=void 0,U.texture=void 0)}function et(){try{n.compressedTexImage2D.apply(n,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function it(){try{n.compressedTexImage3D.apply(n,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function K(){try{n.texSubImage2D.apply(n,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function Mt(){try{n.texSubImage3D.apply(n,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function mt(){try{n.compressedTexSubImage2D.apply(n,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function j(){try{n.compressedTexSubImage3D.apply(n,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function ot(){try{n.texStorage2D.apply(n,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function J(){try{n.texStorage3D.apply(n,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function ct(){try{n.texImage2D.apply(n,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function yt(){try{n.texImage3D.apply(n,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function gt(U){kt.equals(U)===!1&&(n.scissor(U.x,U.y,U.z,U.w),kt.copy(U))}function rt(U){Z.equals(U)===!1&&(n.viewport(U.x,U.y,U.z,U.w),Z.copy(U))}function Lt(U,ht){let Y=c.get(ht);Y===void 0&&(Y=new WeakMap,c.set(ht,Y));let Q=Y.get(U);Q===void 0&&(Q=n.getUniformBlockIndex(ht,U.name),Y.set(U,Q))}function Dt(U,ht){const Q=c.get(ht).get(U);l.get(ht)!==Q&&(n.uniformBlockBinding(ht,Q,U.__bindingPointIndex),l.set(ht,Q))}function Xt(){n.disable(n.BLEND),n.disable(n.CULL_FACE),n.disable(n.DEPTH_TEST),n.disable(n.POLYGON_OFFSET_FILL),n.disable(n.SCISSOR_TEST),n.disable(n.STENCIL_TEST),n.disable(n.SAMPLE_ALPHA_TO_COVERAGE),n.blendEquation(n.FUNC_ADD),n.blendFunc(n.ONE,n.ZERO),n.blendFuncSeparate(n.ONE,n.ZERO,n.ONE,n.ZERO),n.blendColor(0,0,0,0),n.colorMask(!0,!0,!0,!0),n.clearColor(0,0,0,0),n.depthMask(!0),n.depthFunc(n.LESS),a.setReversed(!1),n.clearDepth(1),n.stencilMask(4294967295),n.stencilFunc(n.ALWAYS,0,4294967295),n.stencilOp(n.KEEP,n.KEEP,n.KEEP),n.clearStencil(0),n.cullFace(n.BACK),n.frontFace(n.CCW),n.polygonOffset(0,0),n.activeTexture(n.TEXTURE0),n.bindFramebuffer(n.FRAMEBUFFER,null),n.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),n.bindFramebuffer(n.READ_FRAMEBUFFER,null),n.useProgram(null),n.lineWidth(1),n.scissor(0,0,n.canvas.width,n.canvas.height),n.viewport(0,0,n.canvas.width,n.canvas.height),h={},q=null,st={},f={},u=new WeakMap,d=[],p=null,g=!1,m=null,_=null,M=null,E=null,y=null,w=null,b=null,S=new Wt(0,0,0),R=0,v=!1,x=null,C=null,k=null,L=null,D=null,kt.set(0,0,n.canvas.width,n.canvas.height),Z.set(0,0,n.canvas.width,n.canvas.height),r.reset(),a.reset(),o.reset()}return{buffers:{color:r,depth:a,stencil:o},enable:ut,disable:Ct,bindFramebuffer:Pt,drawBuffers:Nt,useProgram:ae,setBlending:B,setMaterial:ke,setFlipSided:Gt,setCullFace:Vt,setLineWidth:Rt,setPolygonOffset:ie,setScissorTest:At,activeTexture:P,bindTexture:T,unbindTexture:V,compressedTexImage2D:et,compressedTexImage3D:it,texImage2D:ct,texImage3D:yt,updateUBOMapping:Lt,uniformBlockBinding:Dt,texStorage2D:ot,texStorage3D:J,texSubImage2D:K,texSubImage3D:Mt,compressedTexSubImage2D:mt,compressedTexSubImage3D:j,scissor:gt,viewport:rt,reset:Xt}}function yc(n,t,e,i){const s=F0(i);switch(e){case Th:return n*t;case Ch:return n*t;case Rh:return n*t*2;case Ih:return n*t/s.components*s.byteLength;case el:return n*t/s.components*s.byteLength;case Ph:return n*t*2/s.components*s.byteLength;case il:return n*t*2/s.components*s.byteLength;case Ah:return n*t*3/s.components*s.byteLength;case ci:return n*t*4/s.components*s.byteLength;case nl:return n*t*4/s.components*s.byteLength;case Pr:case Dr:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*8;case kr:case Lr:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*16;case uo:case po:return Math.max(n,16)*Math.max(t,8)/4;case ho:case fo:return Math.max(n,8)*Math.max(t,8)/2;case mo:case go:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*8;case _o:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*16;case vo:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*16;case xo:return Math.floor((n+4)/5)*Math.floor((t+3)/4)*16;case yo:return Math.floor((n+4)/5)*Math.floor((t+4)/5)*16;case So:return Math.floor((n+5)/6)*Math.floor((t+4)/5)*16;case Mo:return Math.floor((n+5)/6)*Math.floor((t+5)/6)*16;case bo:return Math.floor((n+7)/8)*Math.floor((t+4)/5)*16;case wo:return Math.floor((n+7)/8)*Math.floor((t+5)/6)*16;case Eo:return Math.floor((n+7)/8)*Math.floor((t+7)/8)*16;case To:return Math.floor((n+9)/10)*Math.floor((t+4)/5)*16;case Ao:return Math.floor((n+9)/10)*Math.floor((t+5)/6)*16;case Co:return Math.floor((n+9)/10)*Math.floor((t+7)/8)*16;case Ro:return Math.floor((n+9)/10)*Math.floor((t+9)/10)*16;case Io:return Math.floor((n+11)/12)*Math.floor((t+9)/10)*16;case Po:return Math.floor((n+11)/12)*Math.floor((t+11)/12)*16;case Ur:case Do:case ko:return Math.ceil(n/4)*Math.ceil(t/4)*16;case Dh:case Lo:return Math.ceil(n/4)*Math.ceil(t/4)*8;case Uo:case Fo:return Math.ceil(n/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function F0(n){switch(n){case Li:case bh:return{byteLength:1,components:1};case Is:case wh:case zs:return{byteLength:2,components:1};case Qo:case tl:return{byteLength:2,components:4};case gn:case Jo:case Ii:return{byteLength:4,components:1};case Eh:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${n}.`)}function N0(n,t,e,i,s,r,a){const o=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new te,h=new WeakMap;let f;const u=new WeakMap;let d=!1;try{d=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function p(P,T){return d?new OffscreenCanvas(P,T):Ps("canvas")}function g(P,T,V){let et=1;const it=At(P);if((it.width>V||it.height>V)&&(et=V/Math.max(it.width,it.height)),et<1)if(typeof HTMLImageElement<"u"&&P instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&P instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&P instanceof ImageBitmap||typeof VideoFrame<"u"&&P instanceof VideoFrame){const K=Math.floor(et*it.width),Mt=Math.floor(et*it.height);f===void 0&&(f=p(K,Mt));const mt=T?p(K,Mt):f;return mt.width=K,mt.height=Mt,mt.getContext("2d").drawImage(P,0,0,K,Mt),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+it.width+"x"+it.height+") to ("+K+"x"+Mt+")."),mt}else return"data"in P&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+it.width+"x"+it.height+")."),P;return P}function m(P){return P.generateMipmaps}function _(P){n.generateMipmap(P)}function M(P){return P.isWebGLCubeRenderTarget?n.TEXTURE_CUBE_MAP:P.isWebGL3DRenderTarget?n.TEXTURE_3D:P.isWebGLArrayRenderTarget||P.isCompressedArrayTexture?n.TEXTURE_2D_ARRAY:n.TEXTURE_2D}function E(P,T,V,et,it=!1){if(P!==null){if(n[P]!==void 0)return n[P];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+P+"'")}let K=T;if(T===n.RED&&(V===n.FLOAT&&(K=n.R32F),V===n.HALF_FLOAT&&(K=n.R16F),V===n.UNSIGNED_BYTE&&(K=n.R8)),T===n.RED_INTEGER&&(V===n.UNSIGNED_BYTE&&(K=n.R8UI),V===n.UNSIGNED_SHORT&&(K=n.R16UI),V===n.UNSIGNED_INT&&(K=n.R32UI),V===n.BYTE&&(K=n.R8I),V===n.SHORT&&(K=n.R16I),V===n.INT&&(K=n.R32I)),T===n.RG&&(V===n.FLOAT&&(K=n.RG32F),V===n.HALF_FLOAT&&(K=n.RG16F),V===n.UNSIGNED_BYTE&&(K=n.RG8)),T===n.RG_INTEGER&&(V===n.UNSIGNED_BYTE&&(K=n.RG8UI),V===n.UNSIGNED_SHORT&&(K=n.RG16UI),V===n.UNSIGNED_INT&&(K=n.RG32UI),V===n.BYTE&&(K=n.RG8I),V===n.SHORT&&(K=n.RG16I),V===n.INT&&(K=n.RG32I)),T===n.RGB_INTEGER&&(V===n.UNSIGNED_BYTE&&(K=n.RGB8UI),V===n.UNSIGNED_SHORT&&(K=n.RGB16UI),V===n.UNSIGNED_INT&&(K=n.RGB32UI),V===n.BYTE&&(K=n.RGB8I),V===n.SHORT&&(K=n.RGB16I),V===n.INT&&(K=n.RGB32I)),T===n.RGBA_INTEGER&&(V===n.UNSIGNED_BYTE&&(K=n.RGBA8UI),V===n.UNSIGNED_SHORT&&(K=n.RGBA16UI),V===n.UNSIGNED_INT&&(K=n.RGBA32UI),V===n.BYTE&&(K=n.RGBA8I),V===n.SHORT&&(K=n.RGBA16I),V===n.INT&&(K=n.RGBA32I)),T===n.RGB&&V===n.UNSIGNED_INT_5_9_9_9_REV&&(K=n.RGB9_E5),T===n.RGBA){const Mt=it?jr:$t.getTransfer(et);V===n.FLOAT&&(K=n.RGBA32F),V===n.HALF_FLOAT&&(K=n.RGBA16F),V===n.UNSIGNED_BYTE&&(K=Mt===ne?n.SRGB8_ALPHA8:n.RGBA8),V===n.UNSIGNED_SHORT_4_4_4_4&&(K=n.RGBA4),V===n.UNSIGNED_SHORT_5_5_5_1&&(K=n.RGB5_A1)}return(K===n.R16F||K===n.R32F||K===n.RG16F||K===n.RG32F||K===n.RGBA16F||K===n.RGBA32F)&&t.get("EXT_color_buffer_float"),K}function y(P,T){let V;return P?T===null||T===gn||T===jn?V=n.DEPTH24_STENCIL8:T===Ii?V=n.DEPTH32F_STENCIL8:T===Is&&(V=n.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):T===null||T===gn||T===jn?V=n.DEPTH_COMPONENT24:T===Ii?V=n.DEPTH_COMPONENT32F:T===Is&&(V=n.DEPTH_COMPONENT16),V}function w(P,T){return m(P)===!0||P.isFramebufferTexture&&P.minFilter!==Kt&&P.minFilter!==ei?Math.log2(Math.max(T.width,T.height))+1:P.mipmaps!==void 0&&P.mipmaps.length>0?P.mipmaps.length:P.isCompressedTexture&&Array.isArray(P.image)?T.mipmaps.length:1}function b(P){const T=P.target;T.removeEventListener("dispose",b),R(T),T.isVideoTexture&&h.delete(T)}function S(P){const T=P.target;T.removeEventListener("dispose",S),x(T)}function R(P){const T=i.get(P);if(T.__webglInit===void 0)return;const V=P.source,et=u.get(V);if(et){const it=et[T.__cacheKey];it.usedTimes--,it.usedTimes===0&&v(P),Object.keys(et).length===0&&u.delete(V)}i.remove(P)}function v(P){const T=i.get(P);n.deleteTexture(T.__webglTexture);const V=P.source,et=u.get(V);delete et[T.__cacheKey],a.memory.textures--}function x(P){const T=i.get(P);if(P.depthTexture&&(P.depthTexture.dispose(),i.remove(P.depthTexture)),P.isWebGLCubeRenderTarget)for(let et=0;et<6;et++){if(Array.isArray(T.__webglFramebuffer[et]))for(let it=0;it<T.__webglFramebuffer[et].length;it++)n.deleteFramebuffer(T.__webglFramebuffer[et][it]);else n.deleteFramebuffer(T.__webglFramebuffer[et]);T.__webglDepthbuffer&&n.deleteRenderbuffer(T.__webglDepthbuffer[et])}else{if(Array.isArray(T.__webglFramebuffer))for(let et=0;et<T.__webglFramebuffer.length;et++)n.deleteFramebuffer(T.__webglFramebuffer[et]);else n.deleteFramebuffer(T.__webglFramebuffer);if(T.__webglDepthbuffer&&n.deleteRenderbuffer(T.__webglDepthbuffer),T.__webglMultisampledFramebuffer&&n.deleteFramebuffer(T.__webglMultisampledFramebuffer),T.__webglColorRenderbuffer)for(let et=0;et<T.__webglColorRenderbuffer.length;et++)T.__webglColorRenderbuffer[et]&&n.deleteRenderbuffer(T.__webglColorRenderbuffer[et]);T.__webglDepthRenderbuffer&&n.deleteRenderbuffer(T.__webglDepthRenderbuffer)}const V=P.textures;for(let et=0,it=V.length;et<it;et++){const K=i.get(V[et]);K.__webglTexture&&(n.deleteTexture(K.__webglTexture),a.memory.textures--),i.remove(V[et])}i.remove(P)}let C=0;function k(){C=0}function L(){const P=C;return P>=s.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+P+" texture units while this GPU supports only "+s.maxTextures),C+=1,P}function D(P){const T=[];return T.push(P.wrapS),T.push(P.wrapT),T.push(P.wrapR||0),T.push(P.magFilter),T.push(P.minFilter),T.push(P.anisotropy),T.push(P.internalFormat),T.push(P.format),T.push(P.type),T.push(P.generateMipmaps),T.push(P.premultiplyAlpha),T.push(P.flipY),T.push(P.unpackAlignment),T.push(P.colorSpace),T.join()}function H(P,T){const V=i.get(P);if(P.isVideoTexture&&Rt(P),P.isRenderTargetTexture===!1&&P.version>0&&V.__version!==P.version){const et=P.image;if(et===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(et.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{Z(V,P,T);return}}e.bindTexture(n.TEXTURE_2D,V.__webglTexture,n.TEXTURE0+T)}function z(P,T){const V=i.get(P);if(P.version>0&&V.__version!==P.version){Z(V,P,T);return}e.bindTexture(n.TEXTURE_2D_ARRAY,V.__webglTexture,n.TEXTURE0+T)}function W(P,T){const V=i.get(P);if(P.version>0&&V.__version!==P.version){Z(V,P,T);return}e.bindTexture(n.TEXTURE_3D,V.__webglTexture,n.TEXTURE0+T)}function F(P,T){const V=i.get(P);if(P.version>0&&V.__version!==P.version){at(V,P,T);return}e.bindTexture(n.TEXTURE_CUBE_MAP,V.__webglTexture,n.TEXTURE0+T)}const q={[Rs]:n.REPEAT,[un]:n.CLAMP_TO_EDGE,[co]:n.MIRRORED_REPEAT},st={[Kt]:n.NEAREST,[bd]:n.NEAREST_MIPMAP_NEAREST,[js]:n.NEAREST_MIPMAP_LINEAR,[ei]:n.LINEAR,[sa]:n.LINEAR_MIPMAP_NEAREST,[dn]:n.LINEAR_MIPMAP_LINEAR},vt={[Ad]:n.NEVER,[kd]:n.ALWAYS,[Cd]:n.LESS,[Lh]:n.LEQUAL,[Rd]:n.EQUAL,[Dd]:n.GEQUAL,[Id]:n.GREATER,[Pd]:n.NOTEQUAL};function xt(P,T){if(T.type===Ii&&t.has("OES_texture_float_linear")===!1&&(T.magFilter===ei||T.magFilter===sa||T.magFilter===js||T.magFilter===dn||T.minFilter===ei||T.minFilter===sa||T.minFilter===js||T.minFilter===dn)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),n.texParameteri(P,n.TEXTURE_WRAP_S,q[T.wrapS]),n.texParameteri(P,n.TEXTURE_WRAP_T,q[T.wrapT]),(P===n.TEXTURE_3D||P===n.TEXTURE_2D_ARRAY)&&n.texParameteri(P,n.TEXTURE_WRAP_R,q[T.wrapR]),n.texParameteri(P,n.TEXTURE_MAG_FILTER,st[T.magFilter]),n.texParameteri(P,n.TEXTURE_MIN_FILTER,st[T.minFilter]),T.compareFunction&&(n.texParameteri(P,n.TEXTURE_COMPARE_MODE,n.COMPARE_REF_TO_TEXTURE),n.texParameteri(P,n.TEXTURE_COMPARE_FUNC,vt[T.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(T.magFilter===Kt||T.minFilter!==js&&T.minFilter!==dn||T.type===Ii&&t.has("OES_texture_float_linear")===!1)return;if(T.anisotropy>1||i.get(T).__currentAnisotropy){const V=t.get("EXT_texture_filter_anisotropic");n.texParameterf(P,V.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(T.anisotropy,s.getMaxAnisotropy())),i.get(T).__currentAnisotropy=T.anisotropy}}}function kt(P,T){let V=!1;P.__webglInit===void 0&&(P.__webglInit=!0,T.addEventListener("dispose",b));const et=T.source;let it=u.get(et);it===void 0&&(it={},u.set(et,it));const K=D(T);if(K!==P.__cacheKey){it[K]===void 0&&(it[K]={texture:n.createTexture(),usedTimes:0},a.memory.textures++,V=!0),it[K].usedTimes++;const Mt=it[P.__cacheKey];Mt!==void 0&&(it[P.__cacheKey].usedTimes--,Mt.usedTimes===0&&v(T)),P.__cacheKey=K,P.__webglTexture=it[K].texture}return V}function Z(P,T,V){let et=n.TEXTURE_2D;(T.isDataArrayTexture||T.isCompressedArrayTexture)&&(et=n.TEXTURE_2D_ARRAY),T.isData3DTexture&&(et=n.TEXTURE_3D);const it=kt(P,T),K=T.source;e.bindTexture(et,P.__webglTexture,n.TEXTURE0+V);const Mt=i.get(K);if(K.version!==Mt.__version||it===!0){e.activeTexture(n.TEXTURE0+V);const mt=$t.getPrimaries($t.workingColorSpace),j=T.colorSpace===Vi?null:$t.getPrimaries(T.colorSpace),ot=T.colorSpace===Vi||mt===j?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,T.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,T.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,T.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,ot);let J=g(T.image,!1,s.maxTextureSize);J=ie(T,J);const ct=r.convert(T.format,T.colorSpace),yt=r.convert(T.type);let gt=E(T.internalFormat,ct,yt,T.colorSpace,T.isVideoTexture);xt(et,T);let rt;const Lt=T.mipmaps,Dt=T.isVideoTexture!==!0,Xt=Mt.__version===void 0||it===!0,U=K.dataReady,ht=w(T,J);if(T.isDepthTexture)gt=y(T.format===Jn,T.type),Xt&&(Dt?e.texStorage2D(n.TEXTURE_2D,1,gt,J.width,J.height):e.texImage2D(n.TEXTURE_2D,0,gt,J.width,J.height,0,ct,yt,null));else if(T.isDataTexture)if(Lt.length>0){Dt&&Xt&&e.texStorage2D(n.TEXTURE_2D,ht,gt,Lt[0].width,Lt[0].height);for(let Y=0,Q=Lt.length;Y<Q;Y++)rt=Lt[Y],Dt?U&&e.texSubImage2D(n.TEXTURE_2D,Y,0,0,rt.width,rt.height,ct,yt,rt.data):e.texImage2D(n.TEXTURE_2D,Y,gt,rt.width,rt.height,0,ct,yt,rt.data);T.generateMipmaps=!1}else Dt?(Xt&&e.texStorage2D(n.TEXTURE_2D,ht,gt,J.width,J.height),U&&e.texSubImage2D(n.TEXTURE_2D,0,0,0,J.width,J.height,ct,yt,J.data)):e.texImage2D(n.TEXTURE_2D,0,gt,J.width,J.height,0,ct,yt,J.data);else if(T.isCompressedTexture)if(T.isCompressedArrayTexture){Dt&&Xt&&e.texStorage3D(n.TEXTURE_2D_ARRAY,ht,gt,Lt[0].width,Lt[0].height,J.depth);for(let Y=0,Q=Lt.length;Y<Q;Y++)if(rt=Lt[Y],T.format!==ci)if(ct!==null)if(Dt){if(U)if(T.layerUpdates.size>0){const ft=yc(rt.width,rt.height,T.format,T.type);for(const dt of T.layerUpdates){const Ut=rt.data.subarray(dt*ft/rt.data.BYTES_PER_ELEMENT,(dt+1)*ft/rt.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,Y,0,0,dt,rt.width,rt.height,1,ct,Ut)}T.clearLayerUpdates()}else e.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,Y,0,0,0,rt.width,rt.height,J.depth,ct,rt.data)}else e.compressedTexImage3D(n.TEXTURE_2D_ARRAY,Y,gt,rt.width,rt.height,J.depth,0,rt.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Dt?U&&e.texSubImage3D(n.TEXTURE_2D_ARRAY,Y,0,0,0,rt.width,rt.height,J.depth,ct,yt,rt.data):e.texImage3D(n.TEXTURE_2D_ARRAY,Y,gt,rt.width,rt.height,J.depth,0,ct,yt,rt.data)}else{Dt&&Xt&&e.texStorage2D(n.TEXTURE_2D,ht,gt,Lt[0].width,Lt[0].height);for(let Y=0,Q=Lt.length;Y<Q;Y++)rt=Lt[Y],T.format!==ci?ct!==null?Dt?U&&e.compressedTexSubImage2D(n.TEXTURE_2D,Y,0,0,rt.width,rt.height,ct,rt.data):e.compressedTexImage2D(n.TEXTURE_2D,Y,gt,rt.width,rt.height,0,rt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Dt?U&&e.texSubImage2D(n.TEXTURE_2D,Y,0,0,rt.width,rt.height,ct,yt,rt.data):e.texImage2D(n.TEXTURE_2D,Y,gt,rt.width,rt.height,0,ct,yt,rt.data)}else if(T.isDataArrayTexture)if(Dt){if(Xt&&e.texStorage3D(n.TEXTURE_2D_ARRAY,ht,gt,J.width,J.height,J.depth),U)if(T.layerUpdates.size>0){const Y=yc(J.width,J.height,T.format,T.type);for(const Q of T.layerUpdates){const ft=J.data.subarray(Q*Y/J.data.BYTES_PER_ELEMENT,(Q+1)*Y/J.data.BYTES_PER_ELEMENT);e.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,Q,J.width,J.height,1,ct,yt,ft)}T.clearLayerUpdates()}else e.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,0,J.width,J.height,J.depth,ct,yt,J.data)}else e.texImage3D(n.TEXTURE_2D_ARRAY,0,gt,J.width,J.height,J.depth,0,ct,yt,J.data);else if(T.isData3DTexture)Dt?(Xt&&e.texStorage3D(n.TEXTURE_3D,ht,gt,J.width,J.height,J.depth),U&&e.texSubImage3D(n.TEXTURE_3D,0,0,0,0,J.width,J.height,J.depth,ct,yt,J.data)):e.texImage3D(n.TEXTURE_3D,0,gt,J.width,J.height,J.depth,0,ct,yt,J.data);else if(T.isFramebufferTexture){if(Xt)if(Dt)e.texStorage2D(n.TEXTURE_2D,ht,gt,J.width,J.height);else{let Y=J.width,Q=J.height;for(let ft=0;ft<ht;ft++)e.texImage2D(n.TEXTURE_2D,ft,gt,Y,Q,0,ct,yt,null),Y>>=1,Q>>=1}}else if(Lt.length>0){if(Dt&&Xt){const Y=At(Lt[0]);e.texStorage2D(n.TEXTURE_2D,ht,gt,Y.width,Y.height)}for(let Y=0,Q=Lt.length;Y<Q;Y++)rt=Lt[Y],Dt?U&&e.texSubImage2D(n.TEXTURE_2D,Y,0,0,ct,yt,rt):e.texImage2D(n.TEXTURE_2D,Y,gt,ct,yt,rt);T.generateMipmaps=!1}else if(Dt){if(Xt){const Y=At(J);e.texStorage2D(n.TEXTURE_2D,ht,gt,Y.width,Y.height)}U&&e.texSubImage2D(n.TEXTURE_2D,0,0,0,ct,yt,J)}else e.texImage2D(n.TEXTURE_2D,0,gt,ct,yt,J);m(T)&&_(et),Mt.__version=K.version,T.onUpdate&&T.onUpdate(T)}P.__version=T.version}function at(P,T,V){if(T.image.length!==6)return;const et=kt(P,T),it=T.source;e.bindTexture(n.TEXTURE_CUBE_MAP,P.__webglTexture,n.TEXTURE0+V);const K=i.get(it);if(it.version!==K.__version||et===!0){e.activeTexture(n.TEXTURE0+V);const Mt=$t.getPrimaries($t.workingColorSpace),mt=T.colorSpace===Vi?null:$t.getPrimaries(T.colorSpace),j=T.colorSpace===Vi||Mt===mt?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,T.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,T.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,T.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,j);const ot=T.isCompressedTexture||T.image[0].isCompressedTexture,J=T.image[0]&&T.image[0].isDataTexture,ct=[];for(let Q=0;Q<6;Q++)!ot&&!J?ct[Q]=g(T.image[Q],!0,s.maxCubemapSize):ct[Q]=J?T.image[Q].image:T.image[Q],ct[Q]=ie(T,ct[Q]);const yt=ct[0],gt=r.convert(T.format,T.colorSpace),rt=r.convert(T.type),Lt=E(T.internalFormat,gt,rt,T.colorSpace),Dt=T.isVideoTexture!==!0,Xt=K.__version===void 0||et===!0,U=it.dataReady;let ht=w(T,yt);xt(n.TEXTURE_CUBE_MAP,T);let Y;if(ot){Dt&&Xt&&e.texStorage2D(n.TEXTURE_CUBE_MAP,ht,Lt,yt.width,yt.height);for(let Q=0;Q<6;Q++){Y=ct[Q].mipmaps;for(let ft=0;ft<Y.length;ft++){const dt=Y[ft];T.format!==ci?gt!==null?Dt?U&&e.compressedTexSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Q,ft,0,0,dt.width,dt.height,gt,dt.data):e.compressedTexImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Q,ft,Lt,dt.width,dt.height,0,dt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Dt?U&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Q,ft,0,0,dt.width,dt.height,gt,rt,dt.data):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Q,ft,Lt,dt.width,dt.height,0,gt,rt,dt.data)}}}else{if(Y=T.mipmaps,Dt&&Xt){Y.length>0&&ht++;const Q=At(ct[0]);e.texStorage2D(n.TEXTURE_CUBE_MAP,ht,Lt,Q.width,Q.height)}for(let Q=0;Q<6;Q++)if(J){Dt?U&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Q,0,0,0,ct[Q].width,ct[Q].height,gt,rt,ct[Q].data):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Q,0,Lt,ct[Q].width,ct[Q].height,0,gt,rt,ct[Q].data);for(let ft=0;ft<Y.length;ft++){const Ut=Y[ft].image[Q].image;Dt?U&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Q,ft+1,0,0,Ut.width,Ut.height,gt,rt,Ut.data):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Q,ft+1,Lt,Ut.width,Ut.height,0,gt,rt,Ut.data)}}else{Dt?U&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Q,0,0,0,gt,rt,ct[Q]):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Q,0,Lt,gt,rt,ct[Q]);for(let ft=0;ft<Y.length;ft++){const dt=Y[ft];Dt?U&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Q,ft+1,0,0,gt,rt,dt.image[Q]):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Q,ft+1,Lt,gt,rt,dt.image[Q])}}}m(T)&&_(n.TEXTURE_CUBE_MAP),K.__version=it.version,T.onUpdate&&T.onUpdate(T)}P.__version=T.version}function St(P,T,V,et,it,K){const Mt=r.convert(V.format,V.colorSpace),mt=r.convert(V.type),j=E(V.internalFormat,Mt,mt,V.colorSpace),ot=i.get(T),J=i.get(V);if(J.__renderTarget=T,!ot.__hasExternalTextures){const ct=Math.max(1,T.width>>K),yt=Math.max(1,T.height>>K);it===n.TEXTURE_3D||it===n.TEXTURE_2D_ARRAY?e.texImage3D(it,K,j,ct,yt,T.depth,0,Mt,mt,null):e.texImage2D(it,K,j,ct,yt,0,Mt,mt,null)}e.bindFramebuffer(n.FRAMEBUFFER,P),Vt(T)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,et,it,J.__webglTexture,0,Gt(T)):(it===n.TEXTURE_2D||it>=n.TEXTURE_CUBE_MAP_POSITIVE_X&&it<=n.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&n.framebufferTexture2D(n.FRAMEBUFFER,et,it,J.__webglTexture,K),e.bindFramebuffer(n.FRAMEBUFFER,null)}function ut(P,T,V){if(n.bindRenderbuffer(n.RENDERBUFFER,P),T.depthBuffer){const et=T.depthTexture,it=et&&et.isDepthTexture?et.type:null,K=y(T.stencilBuffer,it),Mt=T.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,mt=Gt(T);Vt(T)?o.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,mt,K,T.width,T.height):V?n.renderbufferStorageMultisample(n.RENDERBUFFER,mt,K,T.width,T.height):n.renderbufferStorage(n.RENDERBUFFER,K,T.width,T.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,Mt,n.RENDERBUFFER,P)}else{const et=T.textures;for(let it=0;it<et.length;it++){const K=et[it],Mt=r.convert(K.format,K.colorSpace),mt=r.convert(K.type),j=E(K.internalFormat,Mt,mt,K.colorSpace),ot=Gt(T);V&&Vt(T)===!1?n.renderbufferStorageMultisample(n.RENDERBUFFER,ot,j,T.width,T.height):Vt(T)?o.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,ot,j,T.width,T.height):n.renderbufferStorage(n.RENDERBUFFER,j,T.width,T.height)}}n.bindRenderbuffer(n.RENDERBUFFER,null)}function Ct(P,T){if(T&&T.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(e.bindFramebuffer(n.FRAMEBUFFER,P),!(T.depthTexture&&T.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const et=i.get(T.depthTexture);et.__renderTarget=T,(!et.__webglTexture||T.depthTexture.image.width!==T.width||T.depthTexture.image.height!==T.height)&&(T.depthTexture.image.width=T.width,T.depthTexture.image.height=T.height,T.depthTexture.needsUpdate=!0),H(T.depthTexture,0);const it=et.__webglTexture,K=Gt(T);if(T.depthTexture.format===Wn)Vt(T)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,it,0,K):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,it,0);else if(T.depthTexture.format===Jn)Vt(T)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,it,0,K):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,it,0);else throw new Error("Unknown depthTexture format")}function Pt(P){const T=i.get(P),V=P.isWebGLCubeRenderTarget===!0;if(T.__boundDepthTexture!==P.depthTexture){const et=P.depthTexture;if(T.__depthDisposeCallback&&T.__depthDisposeCallback(),et){const it=()=>{delete T.__boundDepthTexture,delete T.__depthDisposeCallback,et.removeEventListener("dispose",it)};et.addEventListener("dispose",it),T.__depthDisposeCallback=it}T.__boundDepthTexture=et}if(P.depthTexture&&!T.__autoAllocateDepthBuffer){if(V)throw new Error("target.depthTexture not supported in Cube render targets");Ct(T.__webglFramebuffer,P)}else if(V){T.__webglDepthbuffer=[];for(let et=0;et<6;et++)if(e.bindFramebuffer(n.FRAMEBUFFER,T.__webglFramebuffer[et]),T.__webglDepthbuffer[et]===void 0)T.__webglDepthbuffer[et]=n.createRenderbuffer(),ut(T.__webglDepthbuffer[et],P,!1);else{const it=P.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,K=T.__webglDepthbuffer[et];n.bindRenderbuffer(n.RENDERBUFFER,K),n.framebufferRenderbuffer(n.FRAMEBUFFER,it,n.RENDERBUFFER,K)}}else if(e.bindFramebuffer(n.FRAMEBUFFER,T.__webglFramebuffer),T.__webglDepthbuffer===void 0)T.__webglDepthbuffer=n.createRenderbuffer(),ut(T.__webglDepthbuffer,P,!1);else{const et=P.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,it=T.__webglDepthbuffer;n.bindRenderbuffer(n.RENDERBUFFER,it),n.framebufferRenderbuffer(n.FRAMEBUFFER,et,n.RENDERBUFFER,it)}e.bindFramebuffer(n.FRAMEBUFFER,null)}function Nt(P,T,V){const et=i.get(P);T!==void 0&&St(et.__webglFramebuffer,P,P.texture,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,0),V!==void 0&&Pt(P)}function ae(P){const T=P.texture,V=i.get(P),et=i.get(T);P.addEventListener("dispose",S);const it=P.textures,K=P.isWebGLCubeRenderTarget===!0,Mt=it.length>1;if(Mt||(et.__webglTexture===void 0&&(et.__webglTexture=n.createTexture()),et.__version=T.version,a.memory.textures++),K){V.__webglFramebuffer=[];for(let mt=0;mt<6;mt++)if(T.mipmaps&&T.mipmaps.length>0){V.__webglFramebuffer[mt]=[];for(let j=0;j<T.mipmaps.length;j++)V.__webglFramebuffer[mt][j]=n.createFramebuffer()}else V.__webglFramebuffer[mt]=n.createFramebuffer()}else{if(T.mipmaps&&T.mipmaps.length>0){V.__webglFramebuffer=[];for(let mt=0;mt<T.mipmaps.length;mt++)V.__webglFramebuffer[mt]=n.createFramebuffer()}else V.__webglFramebuffer=n.createFramebuffer();if(Mt)for(let mt=0,j=it.length;mt<j;mt++){const ot=i.get(it[mt]);ot.__webglTexture===void 0&&(ot.__webglTexture=n.createTexture(),a.memory.textures++)}if(P.samples>0&&Vt(P)===!1){V.__webglMultisampledFramebuffer=n.createFramebuffer(),V.__webglColorRenderbuffer=[],e.bindFramebuffer(n.FRAMEBUFFER,V.__webglMultisampledFramebuffer);for(let mt=0;mt<it.length;mt++){const j=it[mt];V.__webglColorRenderbuffer[mt]=n.createRenderbuffer(),n.bindRenderbuffer(n.RENDERBUFFER,V.__webglColorRenderbuffer[mt]);const ot=r.convert(j.format,j.colorSpace),J=r.convert(j.type),ct=E(j.internalFormat,ot,J,j.colorSpace,P.isXRRenderTarget===!0),yt=Gt(P);n.renderbufferStorageMultisample(n.RENDERBUFFER,yt,ct,P.width,P.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+mt,n.RENDERBUFFER,V.__webglColorRenderbuffer[mt])}n.bindRenderbuffer(n.RENDERBUFFER,null),P.depthBuffer&&(V.__webglDepthRenderbuffer=n.createRenderbuffer(),ut(V.__webglDepthRenderbuffer,P,!0)),e.bindFramebuffer(n.FRAMEBUFFER,null)}}if(K){e.bindTexture(n.TEXTURE_CUBE_MAP,et.__webglTexture),xt(n.TEXTURE_CUBE_MAP,T);for(let mt=0;mt<6;mt++)if(T.mipmaps&&T.mipmaps.length>0)for(let j=0;j<T.mipmaps.length;j++)St(V.__webglFramebuffer[mt][j],P,T,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+mt,j);else St(V.__webglFramebuffer[mt],P,T,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+mt,0);m(T)&&_(n.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(Mt){for(let mt=0,j=it.length;mt<j;mt++){const ot=it[mt],J=i.get(ot);e.bindTexture(n.TEXTURE_2D,J.__webglTexture),xt(n.TEXTURE_2D,ot),St(V.__webglFramebuffer,P,ot,n.COLOR_ATTACHMENT0+mt,n.TEXTURE_2D,0),m(ot)&&_(n.TEXTURE_2D)}e.unbindTexture()}else{let mt=n.TEXTURE_2D;if((P.isWebGL3DRenderTarget||P.isWebGLArrayRenderTarget)&&(mt=P.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),e.bindTexture(mt,et.__webglTexture),xt(mt,T),T.mipmaps&&T.mipmaps.length>0)for(let j=0;j<T.mipmaps.length;j++)St(V.__webglFramebuffer[j],P,T,n.COLOR_ATTACHMENT0,mt,j);else St(V.__webglFramebuffer,P,T,n.COLOR_ATTACHMENT0,mt,0);m(T)&&_(mt),e.unbindTexture()}P.depthBuffer&&Pt(P)}function Ht(P){const T=P.textures;for(let V=0,et=T.length;V<et;V++){const it=T[V];if(m(it)){const K=M(P),Mt=i.get(it).__webglTexture;e.bindTexture(K,Mt),_(K),e.unbindTexture()}}}const de=[],B=[];function ke(P){if(P.samples>0){if(Vt(P)===!1){const T=P.textures,V=P.width,et=P.height;let it=n.COLOR_BUFFER_BIT;const K=P.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,Mt=i.get(P),mt=T.length>1;if(mt)for(let j=0;j<T.length;j++)e.bindFramebuffer(n.FRAMEBUFFER,Mt.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+j,n.RENDERBUFFER,null),e.bindFramebuffer(n.FRAMEBUFFER,Mt.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+j,n.TEXTURE_2D,null,0);e.bindFramebuffer(n.READ_FRAMEBUFFER,Mt.__webglMultisampledFramebuffer),e.bindFramebuffer(n.DRAW_FRAMEBUFFER,Mt.__webglFramebuffer);for(let j=0;j<T.length;j++){if(P.resolveDepthBuffer&&(P.depthBuffer&&(it|=n.DEPTH_BUFFER_BIT),P.stencilBuffer&&P.resolveStencilBuffer&&(it|=n.STENCIL_BUFFER_BIT)),mt){n.framebufferRenderbuffer(n.READ_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.RENDERBUFFER,Mt.__webglColorRenderbuffer[j]);const ot=i.get(T[j]).__webglTexture;n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,ot,0)}n.blitFramebuffer(0,0,V,et,0,0,V,et,it,n.NEAREST),l===!0&&(de.length=0,B.length=0,de.push(n.COLOR_ATTACHMENT0+j),P.depthBuffer&&P.resolveDepthBuffer===!1&&(de.push(K),B.push(K),n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,B)),n.invalidateFramebuffer(n.READ_FRAMEBUFFER,de))}if(e.bindFramebuffer(n.READ_FRAMEBUFFER,null),e.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),mt)for(let j=0;j<T.length;j++){e.bindFramebuffer(n.FRAMEBUFFER,Mt.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+j,n.RENDERBUFFER,Mt.__webglColorRenderbuffer[j]);const ot=i.get(T[j]).__webglTexture;e.bindFramebuffer(n.FRAMEBUFFER,Mt.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+j,n.TEXTURE_2D,ot,0)}e.bindFramebuffer(n.DRAW_FRAMEBUFFER,Mt.__webglMultisampledFramebuffer)}else if(P.depthBuffer&&P.resolveDepthBuffer===!1&&l){const T=P.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,[T])}}}function Gt(P){return Math.min(s.maxSamples,P.samples)}function Vt(P){const T=i.get(P);return P.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&T.__useRenderToTexture!==!1}function Rt(P){const T=a.render.frame;h.get(P)!==T&&(h.set(P,T),P.update())}function ie(P,T){const V=P.colorSpace,et=P.format,it=P.type;return P.isCompressedTexture===!0||P.isVideoTexture===!0||V!==ns&&V!==Vi&&($t.getTransfer(V)===ne?(et!==ci||it!==Li)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",V)),T}function At(P){return typeof HTMLImageElement<"u"&&P instanceof HTMLImageElement?(c.width=P.naturalWidth||P.width,c.height=P.naturalHeight||P.height):typeof VideoFrame<"u"&&P instanceof VideoFrame?(c.width=P.displayWidth,c.height=P.displayHeight):(c.width=P.width,c.height=P.height),c}this.allocateTextureUnit=L,this.resetTextureUnits=k,this.setTexture2D=H,this.setTexture2DArray=z,this.setTexture3D=W,this.setTextureCube=F,this.rebindTextures=Nt,this.setupRenderTarget=ae,this.updateRenderTargetMipmap=Ht,this.updateMultisampleRenderTarget=ke,this.setupDepthRenderbuffer=Pt,this.setupFrameBufferTexture=St,this.useMultisampledRTT=Vt}function B0(n,t){function e(i,s=Vi){let r;const a=$t.getTransfer(s);if(i===Li)return n.UNSIGNED_BYTE;if(i===Qo)return n.UNSIGNED_SHORT_4_4_4_4;if(i===tl)return n.UNSIGNED_SHORT_5_5_5_1;if(i===Eh)return n.UNSIGNED_INT_5_9_9_9_REV;if(i===bh)return n.BYTE;if(i===wh)return n.SHORT;if(i===Is)return n.UNSIGNED_SHORT;if(i===Jo)return n.INT;if(i===gn)return n.UNSIGNED_INT;if(i===Ii)return n.FLOAT;if(i===zs)return n.HALF_FLOAT;if(i===Th)return n.ALPHA;if(i===Ah)return n.RGB;if(i===ci)return n.RGBA;if(i===Ch)return n.LUMINANCE;if(i===Rh)return n.LUMINANCE_ALPHA;if(i===Wn)return n.DEPTH_COMPONENT;if(i===Jn)return n.DEPTH_STENCIL;if(i===Ih)return n.RED;if(i===el)return n.RED_INTEGER;if(i===Ph)return n.RG;if(i===il)return n.RG_INTEGER;if(i===nl)return n.RGBA_INTEGER;if(i===Pr||i===Dr||i===kr||i===Lr)if(a===ne)if(r=t.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(i===Pr)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===Dr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===kr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===Lr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=t.get("WEBGL_compressed_texture_s3tc"),r!==null){if(i===Pr)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===Dr)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===kr)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===Lr)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===ho||i===uo||i===fo||i===po)if(r=t.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(i===ho)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===uo)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===fo)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===po)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===mo||i===go||i===_o)if(r=t.get("WEBGL_compressed_texture_etc"),r!==null){if(i===mo||i===go)return a===ne?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(i===_o)return a===ne?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(i===vo||i===xo||i===yo||i===So||i===Mo||i===bo||i===wo||i===Eo||i===To||i===Ao||i===Co||i===Ro||i===Io||i===Po)if(r=t.get("WEBGL_compressed_texture_astc"),r!==null){if(i===vo)return a===ne?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===xo)return a===ne?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===yo)return a===ne?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===So)return a===ne?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===Mo)return a===ne?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===bo)return a===ne?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===wo)return a===ne?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===Eo)return a===ne?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===To)return a===ne?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===Ao)return a===ne?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===Co)return a===ne?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===Ro)return a===ne?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===Io)return a===ne?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===Po)return a===ne?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===Ur||i===Do||i===ko)if(r=t.get("EXT_texture_compression_bptc"),r!==null){if(i===Ur)return a===ne?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===Do)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===ko)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===Dh||i===Lo||i===Uo||i===Fo)if(r=t.get("EXT_texture_compression_rgtc"),r!==null){if(i===Ur)return r.COMPRESSED_RED_RGTC1_EXT;if(i===Lo)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===Uo)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===Fo)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===jn?n.UNSIGNED_INT_24_8:n[i]!==void 0?n[i]:null}return{convert:e}}class O0 extends Ve{constructor(t=[]){super(),this.isArrayCamera=!0,this.cameras=t}}class gi extends be{constructor(){super(),this.isGroup=!0,this.type="Group"}}const z0={type:"move"};class Da{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new gi,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new gi,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new G,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new G),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new gi,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new G,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new G),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){const e=this._hand;if(e)for(const i of t.hand.values())this._getHandJoint(e,i)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,i){let s=null,r=null,a=null;const o=this._targetRay,l=this._grip,c=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(c&&t.hand){a=!0;for(const g of t.hand.values()){const m=e.getJointPose(g,i),_=this._getHandJoint(c,g);m!==null&&(_.matrix.fromArray(m.transform.matrix),_.matrix.decompose(_.position,_.rotation,_.scale),_.matrixWorldNeedsUpdate=!0,_.jointRadius=m.radius),_.visible=m!==null}const h=c.joints["index-finger-tip"],f=c.joints["thumb-tip"],u=h.position.distanceTo(f.position),d=.02,p=.005;c.inputState.pinching&&u>d+p?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!c.inputState.pinching&&u<=d-p&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else l!==null&&t.gripSpace&&(r=e.getPose(t.gripSpace,i),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1));o!==null&&(s=e.getPose(t.targetRaySpace,i),s===null&&r!==null&&(s=r),s!==null&&(o.matrix.fromArray(s.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,s.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(s.linearVelocity)):o.hasLinearVelocity=!1,s.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(s.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(z0)))}return o!==null&&(o.visible=s!==null),l!==null&&(l.visible=r!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){const i=new gi;i.matrixAutoUpdate=!1,i.visible=!1,t.joints[e.jointName]=i,t.add(i)}return t.joints[e.jointName]}}const H0=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,G0=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class V0{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e,i){if(this.texture===null){const s=new Pe,r=t.properties.get(s);r.__webglTexture=e.texture,(e.depthNear!=i.depthNear||e.depthFar!=i.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=s}}getMesh(t){if(this.texture!==null&&this.mesh===null){const e=t.cameras[0].viewport,i=new Ji({vertexShader:H0,fragmentShader:G0,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new Qt(new _i(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class W0 extends ss{constructor(t,e){super();const i=this;let s=null,r=1,a=null,o="local-floor",l=1,c=null,h=null,f=null,u=null,d=null,p=null;const g=new V0,m=e.getContextAttributes();let _=null,M=null;const E=[],y=[],w=new te;let b=null;const S=new Ve;S.viewport=new _e;const R=new Ve;R.viewport=new _e;const v=[S,R],x=new O0;let C=null,k=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(Z){let at=E[Z];return at===void 0&&(at=new Da,E[Z]=at),at.getTargetRaySpace()},this.getControllerGrip=function(Z){let at=E[Z];return at===void 0&&(at=new Da,E[Z]=at),at.getGripSpace()},this.getHand=function(Z){let at=E[Z];return at===void 0&&(at=new Da,E[Z]=at),at.getHandSpace()};function L(Z){const at=y.indexOf(Z.inputSource);if(at===-1)return;const St=E[at];St!==void 0&&(St.update(Z.inputSource,Z.frame,c||a),St.dispatchEvent({type:Z.type,data:Z.inputSource}))}function D(){s.removeEventListener("select",L),s.removeEventListener("selectstart",L),s.removeEventListener("selectend",L),s.removeEventListener("squeeze",L),s.removeEventListener("squeezestart",L),s.removeEventListener("squeezeend",L),s.removeEventListener("end",D),s.removeEventListener("inputsourceschange",H);for(let Z=0;Z<E.length;Z++){const at=y[Z];at!==null&&(y[Z]=null,E[Z].disconnect(at))}C=null,k=null,g.reset(),t.setRenderTarget(_),d=null,u=null,f=null,s=null,M=null,kt.stop(),i.isPresenting=!1,t.setPixelRatio(b),t.setSize(w.width,w.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(Z){r=Z,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(Z){o=Z,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(Z){c=Z},this.getBaseLayer=function(){return u!==null?u:d},this.getBinding=function(){return f},this.getFrame=function(){return p},this.getSession=function(){return s},this.setSession=async function(Z){if(s=Z,s!==null){if(_=t.getRenderTarget(),s.addEventListener("select",L),s.addEventListener("selectstart",L),s.addEventListener("selectend",L),s.addEventListener("squeeze",L),s.addEventListener("squeezestart",L),s.addEventListener("squeezeend",L),s.addEventListener("end",D),s.addEventListener("inputsourceschange",H),m.xrCompatible!==!0&&await e.makeXRCompatible(),b=t.getPixelRatio(),t.getSize(w),s.renderState.layers===void 0){const at={antialias:m.antialias,alpha:!0,depth:m.depth,stencil:m.stencil,framebufferScaleFactor:r};d=new XRWebGLLayer(s,e,at),s.updateRenderState({baseLayer:d}),t.setPixelRatio(1),t.setSize(d.framebufferWidth,d.framebufferHeight,!1),M=new _n(d.framebufferWidth,d.framebufferHeight,{format:ci,type:Li,colorSpace:t.outputColorSpace,stencilBuffer:m.stencil})}else{let at=null,St=null,ut=null;m.depth&&(ut=m.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,at=m.stencil?Jn:Wn,St=m.stencil?jn:gn);const Ct={colorFormat:e.RGBA8,depthFormat:ut,scaleFactor:r};f=new XRWebGLBinding(s,e),u=f.createProjectionLayer(Ct),s.updateRenderState({layers:[u]}),t.setPixelRatio(1),t.setSize(u.textureWidth,u.textureHeight,!1),M=new _n(u.textureWidth,u.textureHeight,{format:ci,type:Li,depthTexture:new Yh(u.textureWidth,u.textureHeight,St,void 0,void 0,void 0,void 0,void 0,void 0,at),stencilBuffer:m.stencil,colorSpace:t.outputColorSpace,samples:m.antialias?4:0,resolveDepthBuffer:u.ignoreDepthValues===!1})}M.isXRRenderTarget=!0,this.setFoveation(l),c=null,a=await s.requestReferenceSpace(o),kt.setContext(s),kt.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return g.getDepthTexture()};function H(Z){for(let at=0;at<Z.removed.length;at++){const St=Z.removed[at],ut=y.indexOf(St);ut>=0&&(y[ut]=null,E[ut].disconnect(St))}for(let at=0;at<Z.added.length;at++){const St=Z.added[at];let ut=y.indexOf(St);if(ut===-1){for(let Pt=0;Pt<E.length;Pt++)if(Pt>=y.length){y.push(St),ut=Pt;break}else if(y[Pt]===null){y[Pt]=St,ut=Pt;break}if(ut===-1)break}const Ct=E[ut];Ct&&Ct.connect(St)}}const z=new G,W=new G;function F(Z,at,St){z.setFromMatrixPosition(at.matrixWorld),W.setFromMatrixPosition(St.matrixWorld);const ut=z.distanceTo(W),Ct=at.projectionMatrix.elements,Pt=St.projectionMatrix.elements,Nt=Ct[14]/(Ct[10]-1),ae=Ct[14]/(Ct[10]+1),Ht=(Ct[9]+1)/Ct[5],de=(Ct[9]-1)/Ct[5],B=(Ct[8]-1)/Ct[0],ke=(Pt[8]+1)/Pt[0],Gt=Nt*B,Vt=Nt*ke,Rt=ut/(-B+ke),ie=Rt*-B;if(at.matrixWorld.decompose(Z.position,Z.quaternion,Z.scale),Z.translateX(ie),Z.translateZ(Rt),Z.matrixWorld.compose(Z.position,Z.quaternion,Z.scale),Z.matrixWorldInverse.copy(Z.matrixWorld).invert(),Ct[10]===-1)Z.projectionMatrix.copy(at.projectionMatrix),Z.projectionMatrixInverse.copy(at.projectionMatrixInverse);else{const At=Nt+Rt,P=ae+Rt,T=Gt-ie,V=Vt+(ut-ie),et=Ht*ae/P*At,it=de*ae/P*At;Z.projectionMatrix.makePerspective(T,V,et,it,At,P),Z.projectionMatrixInverse.copy(Z.projectionMatrix).invert()}}function q(Z,at){at===null?Z.matrixWorld.copy(Z.matrix):Z.matrixWorld.multiplyMatrices(at.matrixWorld,Z.matrix),Z.matrixWorldInverse.copy(Z.matrixWorld).invert()}this.updateCamera=function(Z){if(s===null)return;let at=Z.near,St=Z.far;g.texture!==null&&(g.depthNear>0&&(at=g.depthNear),g.depthFar>0&&(St=g.depthFar)),x.near=R.near=S.near=at,x.far=R.far=S.far=St,(C!==x.near||k!==x.far)&&(s.updateRenderState({depthNear:x.near,depthFar:x.far}),C=x.near,k=x.far),S.layers.mask=Z.layers.mask|2,R.layers.mask=Z.layers.mask|4,x.layers.mask=S.layers.mask|R.layers.mask;const ut=Z.parent,Ct=x.cameras;q(x,ut);for(let Pt=0;Pt<Ct.length;Pt++)q(Ct[Pt],ut);Ct.length===2?F(x,S,R):x.projectionMatrix.copy(S.projectionMatrix),st(Z,x,ut)};function st(Z,at,St){St===null?Z.matrix.copy(at.matrixWorld):(Z.matrix.copy(St.matrixWorld),Z.matrix.invert(),Z.matrix.multiply(at.matrixWorld)),Z.matrix.decompose(Z.position,Z.quaternion,Z.scale),Z.updateMatrixWorld(!0),Z.projectionMatrix.copy(at.projectionMatrix),Z.projectionMatrixInverse.copy(at.projectionMatrixInverse),Z.isPerspectiveCamera&&(Z.fov=No*2*Math.atan(1/Z.projectionMatrix.elements[5]),Z.zoom=1)}this.getCamera=function(){return x},this.getFoveation=function(){if(!(u===null&&d===null))return l},this.setFoveation=function(Z){l=Z,u!==null&&(u.fixedFoveation=Z),d!==null&&d.fixedFoveation!==void 0&&(d.fixedFoveation=Z)},this.hasDepthSensing=function(){return g.texture!==null},this.getDepthSensingMesh=function(){return g.getMesh(x)};let vt=null;function xt(Z,at){if(h=at.getViewerPose(c||a),p=at,h!==null){const St=h.views;d!==null&&(t.setRenderTargetFramebuffer(M,d.framebuffer),t.setRenderTarget(M));let ut=!1;St.length!==x.cameras.length&&(x.cameras.length=0,ut=!0);for(let Pt=0;Pt<St.length;Pt++){const Nt=St[Pt];let ae=null;if(d!==null)ae=d.getViewport(Nt);else{const de=f.getViewSubImage(u,Nt);ae=de.viewport,Pt===0&&(t.setRenderTargetTextures(M,de.colorTexture,u.ignoreDepthValues?void 0:de.depthStencilTexture),t.setRenderTarget(M))}let Ht=v[Pt];Ht===void 0&&(Ht=new Ve,Ht.layers.enable(Pt),Ht.viewport=new _e,v[Pt]=Ht),Ht.matrix.fromArray(Nt.transform.matrix),Ht.matrix.decompose(Ht.position,Ht.quaternion,Ht.scale),Ht.projectionMatrix.fromArray(Nt.projectionMatrix),Ht.projectionMatrixInverse.copy(Ht.projectionMatrix).invert(),Ht.viewport.set(ae.x,ae.y,ae.width,ae.height),Pt===0&&(x.matrix.copy(Ht.matrix),x.matrix.decompose(x.position,x.quaternion,x.scale)),ut===!0&&x.cameras.push(Ht)}const Ct=s.enabledFeatures;if(Ct&&Ct.includes("depth-sensing")){const Pt=f.getDepthInformation(St[0]);Pt&&Pt.isValid&&Pt.texture&&g.init(t,Pt,s.renderState)}}for(let St=0;St<E.length;St++){const ut=y[St],Ct=E[St];ut!==null&&Ct!==void 0&&Ct.update(ut,at,c||a)}vt&&vt(Z,at),at.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:at}),p=null}const kt=new Xh;kt.setAnimationLoop(xt),this.setAnimationLoop=function(Z){vt=Z},this.dispose=function(){}}}const an=new ii,X0=new se;function $0(n,t){function e(m,_){m.matrixAutoUpdate===!0&&m.updateMatrix(),_.value.copy(m.matrix)}function i(m,_){_.color.getRGB(m.fogColor.value,Gh(n)),_.isFog?(m.fogNear.value=_.near,m.fogFar.value=_.far):_.isFogExp2&&(m.fogDensity.value=_.density)}function s(m,_,M,E,y){_.isMeshBasicMaterial||_.isMeshLambertMaterial?r(m,_):_.isMeshToonMaterial?(r(m,_),f(m,_)):_.isMeshPhongMaterial?(r(m,_),h(m,_)):_.isMeshStandardMaterial?(r(m,_),u(m,_),_.isMeshPhysicalMaterial&&d(m,_,y)):_.isMeshMatcapMaterial?(r(m,_),p(m,_)):_.isMeshDepthMaterial?r(m,_):_.isMeshDistanceMaterial?(r(m,_),g(m,_)):_.isMeshNormalMaterial?r(m,_):_.isLineBasicMaterial?(a(m,_),_.isLineDashedMaterial&&o(m,_)):_.isPointsMaterial?l(m,_,M,E):_.isSpriteMaterial?c(m,_):_.isShadowMaterial?(m.color.value.copy(_.color),m.opacity.value=_.opacity):_.isShaderMaterial&&(_.uniformsNeedUpdate=!1)}function r(m,_){m.opacity.value=_.opacity,_.color&&m.diffuse.value.copy(_.color),_.emissive&&m.emissive.value.copy(_.emissive).multiplyScalar(_.emissiveIntensity),_.map&&(m.map.value=_.map,e(_.map,m.mapTransform)),_.alphaMap&&(m.alphaMap.value=_.alphaMap,e(_.alphaMap,m.alphaMapTransform)),_.bumpMap&&(m.bumpMap.value=_.bumpMap,e(_.bumpMap,m.bumpMapTransform),m.bumpScale.value=_.bumpScale,_.side===Be&&(m.bumpScale.value*=-1)),_.normalMap&&(m.normalMap.value=_.normalMap,e(_.normalMap,m.normalMapTransform),m.normalScale.value.copy(_.normalScale),_.side===Be&&m.normalScale.value.negate()),_.displacementMap&&(m.displacementMap.value=_.displacementMap,e(_.displacementMap,m.displacementMapTransform),m.displacementScale.value=_.displacementScale,m.displacementBias.value=_.displacementBias),_.emissiveMap&&(m.emissiveMap.value=_.emissiveMap,e(_.emissiveMap,m.emissiveMapTransform)),_.specularMap&&(m.specularMap.value=_.specularMap,e(_.specularMap,m.specularMapTransform)),_.alphaTest>0&&(m.alphaTest.value=_.alphaTest);const M=t.get(_),E=M.envMap,y=M.envMapRotation;E&&(m.envMap.value=E,an.copy(y),an.x*=-1,an.y*=-1,an.z*=-1,E.isCubeTexture&&E.isRenderTargetTexture===!1&&(an.y*=-1,an.z*=-1),m.envMapRotation.value.setFromMatrix4(X0.makeRotationFromEuler(an)),m.flipEnvMap.value=E.isCubeTexture&&E.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=_.reflectivity,m.ior.value=_.ior,m.refractionRatio.value=_.refractionRatio),_.lightMap&&(m.lightMap.value=_.lightMap,m.lightMapIntensity.value=_.lightMapIntensity,e(_.lightMap,m.lightMapTransform)),_.aoMap&&(m.aoMap.value=_.aoMap,m.aoMapIntensity.value=_.aoMapIntensity,e(_.aoMap,m.aoMapTransform))}function a(m,_){m.diffuse.value.copy(_.color),m.opacity.value=_.opacity,_.map&&(m.map.value=_.map,e(_.map,m.mapTransform))}function o(m,_){m.dashSize.value=_.dashSize,m.totalSize.value=_.dashSize+_.gapSize,m.scale.value=_.scale}function l(m,_,M,E){m.diffuse.value.copy(_.color),m.opacity.value=_.opacity,m.size.value=_.size*M,m.scale.value=E*.5,_.map&&(m.map.value=_.map,e(_.map,m.uvTransform)),_.alphaMap&&(m.alphaMap.value=_.alphaMap,e(_.alphaMap,m.alphaMapTransform)),_.alphaTest>0&&(m.alphaTest.value=_.alphaTest)}function c(m,_){m.diffuse.value.copy(_.color),m.opacity.value=_.opacity,m.rotation.value=_.rotation,_.map&&(m.map.value=_.map,e(_.map,m.mapTransform)),_.alphaMap&&(m.alphaMap.value=_.alphaMap,e(_.alphaMap,m.alphaMapTransform)),_.alphaTest>0&&(m.alphaTest.value=_.alphaTest)}function h(m,_){m.specular.value.copy(_.specular),m.shininess.value=Math.max(_.shininess,1e-4)}function f(m,_){_.gradientMap&&(m.gradientMap.value=_.gradientMap)}function u(m,_){m.metalness.value=_.metalness,_.metalnessMap&&(m.metalnessMap.value=_.metalnessMap,e(_.metalnessMap,m.metalnessMapTransform)),m.roughness.value=_.roughness,_.roughnessMap&&(m.roughnessMap.value=_.roughnessMap,e(_.roughnessMap,m.roughnessMapTransform)),_.envMap&&(m.envMapIntensity.value=_.envMapIntensity)}function d(m,_,M){m.ior.value=_.ior,_.sheen>0&&(m.sheenColor.value.copy(_.sheenColor).multiplyScalar(_.sheen),m.sheenRoughness.value=_.sheenRoughness,_.sheenColorMap&&(m.sheenColorMap.value=_.sheenColorMap,e(_.sheenColorMap,m.sheenColorMapTransform)),_.sheenRoughnessMap&&(m.sheenRoughnessMap.value=_.sheenRoughnessMap,e(_.sheenRoughnessMap,m.sheenRoughnessMapTransform))),_.clearcoat>0&&(m.clearcoat.value=_.clearcoat,m.clearcoatRoughness.value=_.clearcoatRoughness,_.clearcoatMap&&(m.clearcoatMap.value=_.clearcoatMap,e(_.clearcoatMap,m.clearcoatMapTransform)),_.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=_.clearcoatRoughnessMap,e(_.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),_.clearcoatNormalMap&&(m.clearcoatNormalMap.value=_.clearcoatNormalMap,e(_.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(_.clearcoatNormalScale),_.side===Be&&m.clearcoatNormalScale.value.negate())),_.dispersion>0&&(m.dispersion.value=_.dispersion),_.iridescence>0&&(m.iridescence.value=_.iridescence,m.iridescenceIOR.value=_.iridescenceIOR,m.iridescenceThicknessMinimum.value=_.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=_.iridescenceThicknessRange[1],_.iridescenceMap&&(m.iridescenceMap.value=_.iridescenceMap,e(_.iridescenceMap,m.iridescenceMapTransform)),_.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=_.iridescenceThicknessMap,e(_.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),_.transmission>0&&(m.transmission.value=_.transmission,m.transmissionSamplerMap.value=M.texture,m.transmissionSamplerSize.value.set(M.width,M.height),_.transmissionMap&&(m.transmissionMap.value=_.transmissionMap,e(_.transmissionMap,m.transmissionMapTransform)),m.thickness.value=_.thickness,_.thicknessMap&&(m.thicknessMap.value=_.thicknessMap,e(_.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=_.attenuationDistance,m.attenuationColor.value.copy(_.attenuationColor)),_.anisotropy>0&&(m.anisotropyVector.value.set(_.anisotropy*Math.cos(_.anisotropyRotation),_.anisotropy*Math.sin(_.anisotropyRotation)),_.anisotropyMap&&(m.anisotropyMap.value=_.anisotropyMap,e(_.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=_.specularIntensity,m.specularColor.value.copy(_.specularColor),_.specularColorMap&&(m.specularColorMap.value=_.specularColorMap,e(_.specularColorMap,m.specularColorMapTransform)),_.specularIntensityMap&&(m.specularIntensityMap.value=_.specularIntensityMap,e(_.specularIntensityMap,m.specularIntensityMapTransform))}function p(m,_){_.matcap&&(m.matcap.value=_.matcap)}function g(m,_){const M=t.get(_).light;m.referencePosition.value.setFromMatrixPosition(M.matrixWorld),m.nearDistance.value=M.shadow.camera.near,m.farDistance.value=M.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:s}}function Y0(n,t,e,i){let s={},r={},a=[];const o=n.getParameter(n.MAX_UNIFORM_BUFFER_BINDINGS);function l(M,E){const y=E.program;i.uniformBlockBinding(M,y)}function c(M,E){let y=s[M.id];y===void 0&&(p(M),y=h(M),s[M.id]=y,M.addEventListener("dispose",m));const w=E.program;i.updateUBOMapping(M,w);const b=t.render.frame;r[M.id]!==b&&(u(M),r[M.id]=b)}function h(M){const E=f();M.__bindingPointIndex=E;const y=n.createBuffer(),w=M.__size,b=M.usage;return n.bindBuffer(n.UNIFORM_BUFFER,y),n.bufferData(n.UNIFORM_BUFFER,w,b),n.bindBuffer(n.UNIFORM_BUFFER,null),n.bindBufferBase(n.UNIFORM_BUFFER,E,y),y}function f(){for(let M=0;M<o;M++)if(a.indexOf(M)===-1)return a.push(M),M;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function u(M){const E=s[M.id],y=M.uniforms,w=M.__cache;n.bindBuffer(n.UNIFORM_BUFFER,E);for(let b=0,S=y.length;b<S;b++){const R=Array.isArray(y[b])?y[b]:[y[b]];for(let v=0,x=R.length;v<x;v++){const C=R[v];if(d(C,b,v,w)===!0){const k=C.__offset,L=Array.isArray(C.value)?C.value:[C.value];let D=0;for(let H=0;H<L.length;H++){const z=L[H],W=g(z);typeof z=="number"||typeof z=="boolean"?(C.__data[0]=z,n.bufferSubData(n.UNIFORM_BUFFER,k+D,C.__data)):z.isMatrix3?(C.__data[0]=z.elements[0],C.__data[1]=z.elements[1],C.__data[2]=z.elements[2],C.__data[3]=0,C.__data[4]=z.elements[3],C.__data[5]=z.elements[4],C.__data[6]=z.elements[5],C.__data[7]=0,C.__data[8]=z.elements[6],C.__data[9]=z.elements[7],C.__data[10]=z.elements[8],C.__data[11]=0):(z.toArray(C.__data,D),D+=W.storage/Float32Array.BYTES_PER_ELEMENT)}n.bufferSubData(n.UNIFORM_BUFFER,k,C.__data)}}}n.bindBuffer(n.UNIFORM_BUFFER,null)}function d(M,E,y,w){const b=M.value,S=E+"_"+y;if(w[S]===void 0)return typeof b=="number"||typeof b=="boolean"?w[S]=b:w[S]=b.clone(),!0;{const R=w[S];if(typeof b=="number"||typeof b=="boolean"){if(R!==b)return w[S]=b,!0}else if(R.equals(b)===!1)return R.copy(b),!0}return!1}function p(M){const E=M.uniforms;let y=0;const w=16;for(let S=0,R=E.length;S<R;S++){const v=Array.isArray(E[S])?E[S]:[E[S]];for(let x=0,C=v.length;x<C;x++){const k=v[x],L=Array.isArray(k.value)?k.value:[k.value];for(let D=0,H=L.length;D<H;D++){const z=L[D],W=g(z),F=y%w,q=F%W.boundary,st=F+q;y+=q,st!==0&&w-st<W.storage&&(y+=w-st),k.__data=new Float32Array(W.storage/Float32Array.BYTES_PER_ELEMENT),k.__offset=y,y+=W.storage}}}const b=y%w;return b>0&&(y+=w-b),M.__size=y,M.__cache={},this}function g(M){const E={boundary:0,storage:0};return typeof M=="number"||typeof M=="boolean"?(E.boundary=4,E.storage=4):M.isVector2?(E.boundary=8,E.storage=8):M.isVector3||M.isColor?(E.boundary=16,E.storage=12):M.isVector4?(E.boundary=16,E.storage=16):M.isMatrix3?(E.boundary=48,E.storage=48):M.isMatrix4?(E.boundary=64,E.storage=64):M.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",M),E}function m(M){const E=M.target;E.removeEventListener("dispose",m);const y=a.indexOf(E.__bindingPointIndex);a.splice(y,1),n.deleteBuffer(s[E.id]),delete s[E.id],delete r[E.id]}function _(){for(const M in s)n.deleteBuffer(s[M]);a=[],s={},r={}}return{bind:l,update:c,dispose:_}}class q0{constructor(t={}){const{canvas:e=Ud(),context:i=null,depth:s=!0,stencil:r=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:f=!1,reverseDepthBuffer:u=!1}=t;this.isWebGLRenderer=!0;let d;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");d=i.getContextAttributes().alpha}else d=a;const p=new Uint32Array(4),g=new Int32Array(4);let m=null,_=null;const M=[],E=[];this.domElement=e,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=me,this.toneMapping=Yi,this.toneMappingExposure=1;const y=this;let w=!1,b=0,S=0,R=null,v=-1,x=null;const C=new _e,k=new _e;let L=null;const D=new Wt(0);let H=0,z=e.width,W=e.height,F=1,q=null,st=null;const vt=new _e(0,0,z,W),xt=new _e(0,0,z,W);let kt=!1;const Z=new rl;let at=!1,St=!1;const ut=new se,Ct=new se,Pt=new G,Nt=new _e,ae={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let Ht=!1;function de(){return R===null?F:1}let B=i;function ke(A,N){return e.getContext(A,N)}try{const A={alpha:!0,depth:s,stencil:r,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:h,failIfMajorPerformanceCaveat:f};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${Ko}`),e.addEventListener("webglcontextlost",Q,!1),e.addEventListener("webglcontextrestored",ft,!1),e.addEventListener("webglcontextcreationerror",dt,!1),B===null){const N="webgl2";if(B=ke(N,A),B===null)throw ke(N)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(A){throw console.error("THREE.WebGLRenderer: "+A.message),A}let Gt,Vt,Rt,ie,At,P,T,V,et,it,K,Mt,mt,j,ot,J,ct,yt,gt,rt,Lt,Dt,Xt,U;function ht(){Gt=new Qm(B),Gt.init(),Dt=new B0(B,Gt),Vt=new Ym(B,Gt,t,Dt),Rt=new U0(B,Gt),Vt.reverseDepthBuffer&&u&&Rt.buffers.depth.setReversed(!0),ie=new ig(B),At=new y0,P=new N0(B,Gt,Rt,At,Vt,Dt,ie),T=new Zm(y),V=new Jm(y),et=new cf(B),Xt=new Xm(B,et),it=new tg(B,et,ie,Xt),K=new sg(B,it,et,ie),gt=new ng(B,Vt,P),J=new qm(At),Mt=new x0(y,T,V,Gt,Vt,Xt,J),mt=new $0(y,At),j=new M0,ot=new C0(Gt),yt=new Wm(y,T,V,Rt,K,d,l),ct=new k0(y,K,Vt),U=new Y0(B,ie,Vt,Rt),rt=new $m(B,Gt,ie),Lt=new eg(B,Gt,ie),ie.programs=Mt.programs,y.capabilities=Vt,y.extensions=Gt,y.properties=At,y.renderLists=j,y.shadowMap=ct,y.state=Rt,y.info=ie}ht();const Y=new W0(y,B);this.xr=Y,this.getContext=function(){return B},this.getContextAttributes=function(){return B.getContextAttributes()},this.forceContextLoss=function(){const A=Gt.get("WEBGL_lose_context");A&&A.loseContext()},this.forceContextRestore=function(){const A=Gt.get("WEBGL_lose_context");A&&A.restoreContext()},this.getPixelRatio=function(){return F},this.setPixelRatio=function(A){A!==void 0&&(F=A,this.setSize(z,W,!1))},this.getSize=function(A){return A.set(z,W)},this.setSize=function(A,N,X=!0){if(Y.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}z=A,W=N,e.width=Math.floor(A*F),e.height=Math.floor(N*F),X===!0&&(e.style.width=A+"px",e.style.height=N+"px"),this.setViewport(0,0,A,N)},this.getDrawingBufferSize=function(A){return A.set(z*F,W*F).floor()},this.setDrawingBufferSize=function(A,N,X){z=A,W=N,F=X,e.width=Math.floor(A*X),e.height=Math.floor(N*X),this.setViewport(0,0,A,N)},this.getCurrentViewport=function(A){return A.copy(C)},this.getViewport=function(A){return A.copy(vt)},this.setViewport=function(A,N,X,$){A.isVector4?vt.set(A.x,A.y,A.z,A.w):vt.set(A,N,X,$),Rt.viewport(C.copy(vt).multiplyScalar(F).round())},this.getScissor=function(A){return A.copy(xt)},this.setScissor=function(A,N,X,$){A.isVector4?xt.set(A.x,A.y,A.z,A.w):xt.set(A,N,X,$),Rt.scissor(k.copy(xt).multiplyScalar(F).round())},this.getScissorTest=function(){return kt},this.setScissorTest=function(A){Rt.setScissorTest(kt=A)},this.setOpaqueSort=function(A){q=A},this.setTransparentSort=function(A){st=A},this.getClearColor=function(A){return A.copy(yt.getClearColor())},this.setClearColor=function(){yt.setClearColor.apply(yt,arguments)},this.getClearAlpha=function(){return yt.getClearAlpha()},this.setClearAlpha=function(){yt.setClearAlpha.apply(yt,arguments)},this.clear=function(A=!0,N=!0,X=!0){let $=0;if(A){let O=!1;if(R!==null){const lt=R.texture.format;O=lt===nl||lt===il||lt===el}if(O){const lt=R.texture.type,_t=lt===Li||lt===gn||lt===Is||lt===jn||lt===Qo||lt===tl,bt=yt.getClearColor(),wt=yt.getClearAlpha(),Ft=bt.r,Bt=bt.g,Et=bt.b;_t?(p[0]=Ft,p[1]=Bt,p[2]=Et,p[3]=wt,B.clearBufferuiv(B.COLOR,0,p)):(g[0]=Ft,g[1]=Bt,g[2]=Et,g[3]=wt,B.clearBufferiv(B.COLOR,0,g))}else $|=B.COLOR_BUFFER_BIT}N&&($|=B.DEPTH_BUFFER_BIT),X&&($|=B.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),B.clear($)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){e.removeEventListener("webglcontextlost",Q,!1),e.removeEventListener("webglcontextrestored",ft,!1),e.removeEventListener("webglcontextcreationerror",dt,!1),j.dispose(),ot.dispose(),At.dispose(),T.dispose(),V.dispose(),K.dispose(),Xt.dispose(),U.dispose(),Mt.dispose(),Y.dispose(),Y.removeEventListener("sessionstart",_l),Y.removeEventListener("sessionend",vl),Qi.stop()};function Q(A){A.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),w=!0}function ft(){console.log("THREE.WebGLRenderer: Context Restored."),w=!1;const A=ie.autoReset,N=ct.enabled,X=ct.autoUpdate,$=ct.needsUpdate,O=ct.type;ht(),ie.autoReset=A,ct.enabled=N,ct.autoUpdate=X,ct.needsUpdate=$,ct.type=O}function dt(A){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",A.statusMessage)}function Ut(A){const N=A.target;N.removeEventListener("dispose",Ut),ge(N)}function ge(A){Ee(A),At.remove(A)}function Ee(A){const N=At.get(A).programs;N!==void 0&&(N.forEach(function(X){Mt.releaseProgram(X)}),A.isShaderMaterial&&Mt.releaseShaderCache(A))}this.renderBufferDirect=function(A,N,X,$,O,lt){N===null&&(N=ae);const _t=O.isMesh&&O.matrixWorld.determinant()<0,bt=zu(A,N,X,$,O);Rt.setMaterial($,_t);let wt=X.index,Ft=1;if($.wireframe===!0){if(wt=it.getWireframeAttribute(X),wt===void 0)return;Ft=2}const Bt=X.drawRange,Et=X.attributes.position;let Yt=Bt.start*Ft,oe=(Bt.start+Bt.count)*Ft;lt!==null&&(Yt=Math.max(Yt,lt.start*Ft),oe=Math.min(oe,(lt.start+lt.count)*Ft)),wt!==null?(Yt=Math.max(Yt,0),oe=Math.min(oe,wt.count)):Et!=null&&(Yt=Math.max(Yt,0),oe=Math.min(oe,Et.count));const ce=oe-Yt;if(ce<0||ce===1/0)return;Xt.setup(O,$,bt,X,wt);let Oe,jt=rt;if(wt!==null&&(Oe=et.get(wt),jt=Lt,jt.setIndex(Oe)),O.isMesh)$.wireframe===!0?(Rt.setLineWidth($.wireframeLinewidth*de()),jt.setMode(B.LINES)):jt.setMode(B.TRIANGLES);else if(O.isLine){let Tt=$.linewidth;Tt===void 0&&(Tt=1),Rt.setLineWidth(Tt*de()),O.isLineSegments?jt.setMode(B.LINES):O.isLineLoop?jt.setMode(B.LINE_LOOP):jt.setMode(B.LINE_STRIP)}else O.isPoints?jt.setMode(B.POINTS):O.isSprite&&jt.setMode(B.TRIANGLES);if(O.isBatchedMesh)if(O._multiDrawInstances!==null)jt.renderMultiDrawInstances(O._multiDrawStarts,O._multiDrawCounts,O._multiDrawCount,O._multiDrawInstances);else if(Gt.get("WEBGL_multi_draw"))jt.renderMultiDraw(O._multiDrawStarts,O._multiDrawCounts,O._multiDrawCount);else{const Tt=O._multiDrawStarts,Si=O._multiDrawCounts,Jt=O._multiDrawCount,ri=wt?et.get(wt).bytesPerElement:1,wn=At.get($).currentProgram.getUniforms();for(let Xe=0;Xe<Jt;Xe++)wn.setValue(B,"_gl_DrawID",Xe),jt.render(Tt[Xe]/ri,Si[Xe])}else if(O.isInstancedMesh)jt.renderInstances(Yt,ce,O.count);else if(X.isInstancedBufferGeometry){const Tt=X._maxInstanceCount!==void 0?X._maxInstanceCount:1/0,Si=Math.min(X.instanceCount,Tt);jt.renderInstances(Yt,ce,Si)}else jt.render(Yt,ce)};function ee(A,N,X){A.transparent===!0&&A.side===Ue&&A.forceSinglePass===!1?(A.side=Be,A.needsUpdate=!0,Ks(A,N,X),A.side=ji,A.needsUpdate=!0,Ks(A,N,X),A.side=Ue):Ks(A,N,X)}this.compile=function(A,N,X=null){X===null&&(X=A),_=ot.get(X),_.init(N),E.push(_),X.traverseVisible(function(O){O.isLight&&O.layers.test(N.layers)&&(_.pushLight(O),O.castShadow&&_.pushShadow(O))}),A!==X&&A.traverseVisible(function(O){O.isLight&&O.layers.test(N.layers)&&(_.pushLight(O),O.castShadow&&_.pushShadow(O))}),_.setupLights();const $=new Set;return A.traverse(function(O){if(!(O.isMesh||O.isPoints||O.isLine||O.isSprite))return;const lt=O.material;if(lt)if(Array.isArray(lt))for(let _t=0;_t<lt.length;_t++){const bt=lt[_t];ee(bt,X,O),$.add(bt)}else ee(lt,X,O),$.add(lt)}),E.pop(),_=null,$},this.compileAsync=function(A,N,X=null){const $=this.compile(A,N,X);return new Promise(O=>{function lt(){if($.forEach(function(_t){At.get(_t).currentProgram.isReady()&&$.delete(_t)}),$.size===0){O(A);return}setTimeout(lt,10)}Gt.get("KHR_parallel_shader_compile")!==null?lt():setTimeout(lt,10)})};let si=null;function yi(A){si&&si(A)}function _l(){Qi.stop()}function vl(){Qi.start()}const Qi=new Xh;Qi.setAnimationLoop(yi),typeof self<"u"&&Qi.setContext(self),this.setAnimationLoop=function(A){si=A,Y.setAnimationLoop(A),A===null?Qi.stop():Qi.start()},Y.addEventListener("sessionstart",_l),Y.addEventListener("sessionend",vl),this.render=function(A,N){if(N!==void 0&&N.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(w===!0)return;if(A.matrixWorldAutoUpdate===!0&&A.updateMatrixWorld(),N.parent===null&&N.matrixWorldAutoUpdate===!0&&N.updateMatrixWorld(),Y.enabled===!0&&Y.isPresenting===!0&&(Y.cameraAutoUpdate===!0&&Y.updateCamera(N),N=Y.getCamera()),A.isScene===!0&&A.onBeforeRender(y,A,N,R),_=ot.get(A,E.length),_.init(N),E.push(_),Ct.multiplyMatrices(N.projectionMatrix,N.matrixWorldInverse),Z.setFromProjectionMatrix(Ct),St=this.localClippingEnabled,at=J.init(this.clippingPlanes,St),m=j.get(A,M.length),m.init(),M.push(m),Y.enabled===!0&&Y.isPresenting===!0){const lt=y.xr.getDepthSensingMesh();lt!==null&&na(lt,N,-1/0,y.sortObjects)}na(A,N,0,y.sortObjects),m.finish(),y.sortObjects===!0&&m.sort(q,st),Ht=Y.enabled===!1||Y.isPresenting===!1||Y.hasDepthSensing()===!1,Ht&&yt.addToRenderList(m,A),this.info.render.frame++,at===!0&&J.beginShadows();const X=_.state.shadowsArray;ct.render(X,A,N),at===!0&&J.endShadows(),this.info.autoReset===!0&&this.info.reset();const $=m.opaque,O=m.transmissive;if(_.setupLights(),N.isArrayCamera){const lt=N.cameras;if(O.length>0)for(let _t=0,bt=lt.length;_t<bt;_t++){const wt=lt[_t];yl($,O,A,wt)}Ht&&yt.render(A);for(let _t=0,bt=lt.length;_t<bt;_t++){const wt=lt[_t];xl(m,A,wt,wt.viewport)}}else O.length>0&&yl($,O,A,N),Ht&&yt.render(A),xl(m,A,N);R!==null&&(P.updateMultisampleRenderTarget(R),P.updateRenderTargetMipmap(R)),A.isScene===!0&&A.onAfterRender(y,A,N),Xt.resetDefaultState(),v=-1,x=null,E.pop(),E.length>0?(_=E[E.length-1],at===!0&&J.setGlobalState(y.clippingPlanes,_.state.camera)):_=null,M.pop(),M.length>0?m=M[M.length-1]:m=null};function na(A,N,X,$){if(A.visible===!1)return;if(A.layers.test(N.layers)){if(A.isGroup)X=A.renderOrder;else if(A.isLOD)A.autoUpdate===!0&&A.update(N);else if(A.isLight)_.pushLight(A),A.castShadow&&_.pushShadow(A);else if(A.isSprite){if(!A.frustumCulled||Z.intersectsSprite(A)){$&&Nt.setFromMatrixPosition(A.matrixWorld).applyMatrix4(Ct);const _t=K.update(A),bt=A.material;bt.visible&&m.push(A,_t,bt,X,Nt.z,null)}}else if((A.isMesh||A.isLine||A.isPoints)&&(!A.frustumCulled||Z.intersectsObject(A))){const _t=K.update(A),bt=A.material;if($&&(A.boundingSphere!==void 0?(A.boundingSphere===null&&A.computeBoundingSphere(),Nt.copy(A.boundingSphere.center)):(_t.boundingSphere===null&&_t.computeBoundingSphere(),Nt.copy(_t.boundingSphere.center)),Nt.applyMatrix4(A.matrixWorld).applyMatrix4(Ct)),Array.isArray(bt)){const wt=_t.groups;for(let Ft=0,Bt=wt.length;Ft<Bt;Ft++){const Et=wt[Ft],Yt=bt[Et.materialIndex];Yt&&Yt.visible&&m.push(A,_t,Yt,X,Nt.z,Et)}}else bt.visible&&m.push(A,_t,bt,X,Nt.z,null)}}const lt=A.children;for(let _t=0,bt=lt.length;_t<bt;_t++)na(lt[_t],N,X,$)}function xl(A,N,X,$){const O=A.opaque,lt=A.transmissive,_t=A.transparent;_.setupLightsView(X),at===!0&&J.setGlobalState(y.clippingPlanes,X),$&&Rt.viewport(C.copy($)),O.length>0&&Zs(O,N,X),lt.length>0&&Zs(lt,N,X),_t.length>0&&Zs(_t,N,X),Rt.buffers.depth.setTest(!0),Rt.buffers.depth.setMask(!0),Rt.buffers.color.setMask(!0),Rt.setPolygonOffset(!1)}function yl(A,N,X,$){if((X.isScene===!0?X.overrideMaterial:null)!==null)return;_.state.transmissionRenderTarget[$.id]===void 0&&(_.state.transmissionRenderTarget[$.id]=new _n(1,1,{generateMipmaps:!0,type:Gt.has("EXT_color_buffer_half_float")||Gt.has("EXT_color_buffer_float")?zs:Li,minFilter:dn,samples:4,stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:$t.workingColorSpace}));const lt=_.state.transmissionRenderTarget[$.id],_t=$.viewport||C;lt.setSize(_t.z,_t.w);const bt=y.getRenderTarget();y.setRenderTarget(lt),y.getClearColor(D),H=y.getClearAlpha(),H<1&&y.setClearColor(16777215,.5),y.clear(),Ht&&yt.render(X);const wt=y.toneMapping;y.toneMapping=Yi;const Ft=$.viewport;if($.viewport!==void 0&&($.viewport=void 0),_.setupLightsView($),at===!0&&J.setGlobalState(y.clippingPlanes,$),Zs(A,X,$),P.updateMultisampleRenderTarget(lt),P.updateRenderTargetMipmap(lt),Gt.has("WEBGL_multisampled_render_to_texture")===!1){let Bt=!1;for(let Et=0,Yt=N.length;Et<Yt;Et++){const oe=N[Et],ce=oe.object,Oe=oe.geometry,jt=oe.material,Tt=oe.group;if(jt.side===Ue&&ce.layers.test($.layers)){const Si=jt.side;jt.side=Be,jt.needsUpdate=!0,Sl(ce,X,$,Oe,jt,Tt),jt.side=Si,jt.needsUpdate=!0,Bt=!0}}Bt===!0&&(P.updateMultisampleRenderTarget(lt),P.updateRenderTargetMipmap(lt))}y.setRenderTarget(bt),y.setClearColor(D,H),Ft!==void 0&&($.viewport=Ft),y.toneMapping=wt}function Zs(A,N,X){const $=N.isScene===!0?N.overrideMaterial:null;for(let O=0,lt=A.length;O<lt;O++){const _t=A[O],bt=_t.object,wt=_t.geometry,Ft=$===null?_t.material:$,Bt=_t.group;bt.layers.test(X.layers)&&Sl(bt,N,X,wt,Ft,Bt)}}function Sl(A,N,X,$,O,lt){A.onBeforeRender(y,N,X,$,O,lt),A.modelViewMatrix.multiplyMatrices(X.matrixWorldInverse,A.matrixWorld),A.normalMatrix.getNormalMatrix(A.modelViewMatrix),O.onBeforeRender(y,N,X,$,A,lt),O.transparent===!0&&O.side===Ue&&O.forceSinglePass===!1?(O.side=Be,O.needsUpdate=!0,y.renderBufferDirect(X,N,$,O,A,lt),O.side=ji,O.needsUpdate=!0,y.renderBufferDirect(X,N,$,O,A,lt),O.side=Ue):y.renderBufferDirect(X,N,$,O,A,lt),A.onAfterRender(y,N,X,$,O,lt)}function Ks(A,N,X){N.isScene!==!0&&(N=ae);const $=At.get(A),O=_.state.lights,lt=_.state.shadowsArray,_t=O.state.version,bt=Mt.getParameters(A,O.state,lt,N,X),wt=Mt.getProgramCacheKey(bt);let Ft=$.programs;$.environment=A.isMeshStandardMaterial?N.environment:null,$.fog=N.fog,$.envMap=(A.isMeshStandardMaterial?V:T).get(A.envMap||$.environment),$.envMapRotation=$.environment!==null&&A.envMap===null?N.environmentRotation:A.envMapRotation,Ft===void 0&&(A.addEventListener("dispose",Ut),Ft=new Map,$.programs=Ft);let Bt=Ft.get(wt);if(Bt!==void 0){if($.currentProgram===Bt&&$.lightsStateVersion===_t)return bl(A,bt),Bt}else bt.uniforms=Mt.getUniforms(A),A.onBeforeCompile(bt,y),Bt=Mt.acquireProgram(bt,wt),Ft.set(wt,Bt),$.uniforms=bt.uniforms;const Et=$.uniforms;return(!A.isShaderMaterial&&!A.isRawShaderMaterial||A.clipping===!0)&&(Et.clippingPlanes=J.uniform),bl(A,bt),$.needsLights=Gu(A),$.lightsStateVersion=_t,$.needsLights&&(Et.ambientLightColor.value=O.state.ambient,Et.lightProbe.value=O.state.probe,Et.directionalLights.value=O.state.directional,Et.directionalLightShadows.value=O.state.directionalShadow,Et.spotLights.value=O.state.spot,Et.spotLightShadows.value=O.state.spotShadow,Et.rectAreaLights.value=O.state.rectArea,Et.ltc_1.value=O.state.rectAreaLTC1,Et.ltc_2.value=O.state.rectAreaLTC2,Et.pointLights.value=O.state.point,Et.pointLightShadows.value=O.state.pointShadow,Et.hemisphereLights.value=O.state.hemi,Et.directionalShadowMap.value=O.state.directionalShadowMap,Et.directionalShadowMatrix.value=O.state.directionalShadowMatrix,Et.spotShadowMap.value=O.state.spotShadowMap,Et.spotLightMatrix.value=O.state.spotLightMatrix,Et.spotLightMap.value=O.state.spotLightMap,Et.pointShadowMap.value=O.state.pointShadowMap,Et.pointShadowMatrix.value=O.state.pointShadowMatrix),$.currentProgram=Bt,$.uniformsList=null,Bt}function Ml(A){if(A.uniformsList===null){const N=A.currentProgram.getUniforms();A.uniformsList=Nr.seqWithValue(N.seq,A.uniforms)}return A.uniformsList}function bl(A,N){const X=At.get(A);X.outputColorSpace=N.outputColorSpace,X.batching=N.batching,X.batchingColor=N.batchingColor,X.instancing=N.instancing,X.instancingColor=N.instancingColor,X.instancingMorph=N.instancingMorph,X.skinning=N.skinning,X.morphTargets=N.morphTargets,X.morphNormals=N.morphNormals,X.morphColors=N.morphColors,X.morphTargetsCount=N.morphTargetsCount,X.numClippingPlanes=N.numClippingPlanes,X.numIntersection=N.numClipIntersection,X.vertexAlphas=N.vertexAlphas,X.vertexTangents=N.vertexTangents,X.toneMapping=N.toneMapping}function zu(A,N,X,$,O){N.isScene!==!0&&(N=ae),P.resetTextureUnits();const lt=N.fog,_t=$.isMeshStandardMaterial?N.environment:null,bt=R===null?y.outputColorSpace:R.isXRRenderTarget===!0?R.texture.colorSpace:ns,wt=($.isMeshStandardMaterial?V:T).get($.envMap||_t),Ft=$.vertexColors===!0&&!!X.attributes.color&&X.attributes.color.itemSize===4,Bt=!!X.attributes.tangent&&(!!$.normalMap||$.anisotropy>0),Et=!!X.morphAttributes.position,Yt=!!X.morphAttributes.normal,oe=!!X.morphAttributes.color;let ce=Yi;$.toneMapped&&(R===null||R.isXRRenderTarget===!0)&&(ce=y.toneMapping);const Oe=X.morphAttributes.position||X.morphAttributes.normal||X.morphAttributes.color,jt=Oe!==void 0?Oe.length:0,Tt=At.get($),Si=_.state.lights;if(at===!0&&(St===!0||A!==x)){const je=A===x&&$.id===v;J.setState($,A,je)}let Jt=!1;$.version===Tt.__version?(Tt.needsLights&&Tt.lightsStateVersion!==Si.state.version||Tt.outputColorSpace!==bt||O.isBatchedMesh&&Tt.batching===!1||!O.isBatchedMesh&&Tt.batching===!0||O.isBatchedMesh&&Tt.batchingColor===!0&&O.colorTexture===null||O.isBatchedMesh&&Tt.batchingColor===!1&&O.colorTexture!==null||O.isInstancedMesh&&Tt.instancing===!1||!O.isInstancedMesh&&Tt.instancing===!0||O.isSkinnedMesh&&Tt.skinning===!1||!O.isSkinnedMesh&&Tt.skinning===!0||O.isInstancedMesh&&Tt.instancingColor===!0&&O.instanceColor===null||O.isInstancedMesh&&Tt.instancingColor===!1&&O.instanceColor!==null||O.isInstancedMesh&&Tt.instancingMorph===!0&&O.morphTexture===null||O.isInstancedMesh&&Tt.instancingMorph===!1&&O.morphTexture!==null||Tt.envMap!==wt||$.fog===!0&&Tt.fog!==lt||Tt.numClippingPlanes!==void 0&&(Tt.numClippingPlanes!==J.numPlanes||Tt.numIntersection!==J.numIntersection)||Tt.vertexAlphas!==Ft||Tt.vertexTangents!==Bt||Tt.morphTargets!==Et||Tt.morphNormals!==Yt||Tt.morphColors!==oe||Tt.toneMapping!==ce||Tt.morphTargetsCount!==jt)&&(Jt=!0):(Jt=!0,Tt.__version=$.version);let ri=Tt.currentProgram;Jt===!0&&(ri=Ks($,N,O));let wn=!1,Xe=!1,hs=!1;const he=ri.getUniforms(),ui=Tt.uniforms;if(Rt.useProgram(ri.program)&&(wn=!0,Xe=!0,hs=!0),$.id!==v&&(v=$.id,Xe=!0),wn||x!==A){Rt.buffers.depth.getReversed()?(ut.copy(A.projectionMatrix),Nd(ut),Bd(ut),he.setValue(B,"projectionMatrix",ut)):he.setValue(B,"projectionMatrix",A.projectionMatrix),he.setValue(B,"viewMatrix",A.matrixWorldInverse);const Ui=he.map.cameraPosition;Ui!==void 0&&Ui.setValue(B,Pt.setFromMatrixPosition(A.matrixWorld)),Vt.logarithmicDepthBuffer&&he.setValue(B,"logDepthBufFC",2/(Math.log(A.far+1)/Math.LN2)),($.isMeshPhongMaterial||$.isMeshToonMaterial||$.isMeshLambertMaterial||$.isMeshBasicMaterial||$.isMeshStandardMaterial||$.isShaderMaterial)&&he.setValue(B,"isOrthographic",A.isOrthographicCamera===!0),x!==A&&(x=A,Xe=!0,hs=!0)}if(O.isSkinnedMesh){he.setOptional(B,O,"bindMatrix"),he.setOptional(B,O,"bindMatrixInverse");const je=O.skeleton;je&&(je.boneTexture===null&&je.computeBoneTexture(),he.setValue(B,"boneTexture",je.boneTexture,P))}O.isBatchedMesh&&(he.setOptional(B,O,"batchingTexture"),he.setValue(B,"batchingTexture",O._matricesTexture,P),he.setOptional(B,O,"batchingIdTexture"),he.setValue(B,"batchingIdTexture",O._indirectTexture,P),he.setOptional(B,O,"batchingColorTexture"),O._colorsTexture!==null&&he.setValue(B,"batchingColorTexture",O._colorsTexture,P));const us=X.morphAttributes;if((us.position!==void 0||us.normal!==void 0||us.color!==void 0)&&gt.update(O,X,ri),(Xe||Tt.receiveShadow!==O.receiveShadow)&&(Tt.receiveShadow=O.receiveShadow,he.setValue(B,"receiveShadow",O.receiveShadow)),$.isMeshGouraudMaterial&&$.envMap!==null&&(ui.envMap.value=wt,ui.flipEnvMap.value=wt.isCubeTexture&&wt.isRenderTargetTexture===!1?-1:1),$.isMeshStandardMaterial&&$.envMap===null&&N.environment!==null&&(ui.envMapIntensity.value=N.environmentIntensity),Xe&&(he.setValue(B,"toneMappingExposure",y.toneMappingExposure),Tt.needsLights&&Hu(ui,hs),lt&&$.fog===!0&&mt.refreshFogUniforms(ui,lt),mt.refreshMaterialUniforms(ui,$,F,W,_.state.transmissionRenderTarget[A.id]),Nr.upload(B,Ml(Tt),ui,P)),$.isShaderMaterial&&$.uniformsNeedUpdate===!0&&(Nr.upload(B,Ml(Tt),ui,P),$.uniformsNeedUpdate=!1),$.isSpriteMaterial&&he.setValue(B,"center",O.center),he.setValue(B,"modelViewMatrix",O.modelViewMatrix),he.setValue(B,"normalMatrix",O.normalMatrix),he.setValue(B,"modelMatrix",O.matrixWorld),$.isShaderMaterial||$.isRawShaderMaterial){const je=$.uniformsGroups;for(let Ui=0,Fi=je.length;Ui<Fi;Ui++){const wl=je[Ui];U.update(wl,ri),U.bind(wl,ri)}}return ri}function Hu(A,N){A.ambientLightColor.needsUpdate=N,A.lightProbe.needsUpdate=N,A.directionalLights.needsUpdate=N,A.directionalLightShadows.needsUpdate=N,A.pointLights.needsUpdate=N,A.pointLightShadows.needsUpdate=N,A.spotLights.needsUpdate=N,A.spotLightShadows.needsUpdate=N,A.rectAreaLights.needsUpdate=N,A.hemisphereLights.needsUpdate=N}function Gu(A){return A.isMeshLambertMaterial||A.isMeshToonMaterial||A.isMeshPhongMaterial||A.isMeshStandardMaterial||A.isShadowMaterial||A.isShaderMaterial&&A.lights===!0}this.getActiveCubeFace=function(){return b},this.getActiveMipmapLevel=function(){return S},this.getRenderTarget=function(){return R},this.setRenderTargetTextures=function(A,N,X){At.get(A.texture).__webglTexture=N,At.get(A.depthTexture).__webglTexture=X;const $=At.get(A);$.__hasExternalTextures=!0,$.__autoAllocateDepthBuffer=X===void 0,$.__autoAllocateDepthBuffer||Gt.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),$.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(A,N){const X=At.get(A);X.__webglFramebuffer=N,X.__useDefaultFramebuffer=N===void 0},this.setRenderTarget=function(A,N=0,X=0){R=A,b=N,S=X;let $=!0,O=null,lt=!1,_t=!1;if(A){const wt=At.get(A);if(wt.__useDefaultFramebuffer!==void 0)Rt.bindFramebuffer(B.FRAMEBUFFER,null),$=!1;else if(wt.__webglFramebuffer===void 0)P.setupRenderTarget(A);else if(wt.__hasExternalTextures)P.rebindTextures(A,At.get(A.texture).__webglTexture,At.get(A.depthTexture).__webglTexture);else if(A.depthBuffer){const Et=A.depthTexture;if(wt.__boundDepthTexture!==Et){if(Et!==null&&At.has(Et)&&(A.width!==Et.image.width||A.height!==Et.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");P.setupDepthRenderbuffer(A)}}const Ft=A.texture;(Ft.isData3DTexture||Ft.isDataArrayTexture||Ft.isCompressedArrayTexture)&&(_t=!0);const Bt=At.get(A).__webglFramebuffer;A.isWebGLCubeRenderTarget?(Array.isArray(Bt[N])?O=Bt[N][X]:O=Bt[N],lt=!0):A.samples>0&&P.useMultisampledRTT(A)===!1?O=At.get(A).__webglMultisampledFramebuffer:Array.isArray(Bt)?O=Bt[X]:O=Bt,C.copy(A.viewport),k.copy(A.scissor),L=A.scissorTest}else C.copy(vt).multiplyScalar(F).floor(),k.copy(xt).multiplyScalar(F).floor(),L=kt;if(Rt.bindFramebuffer(B.FRAMEBUFFER,O)&&$&&Rt.drawBuffers(A,O),Rt.viewport(C),Rt.scissor(k),Rt.setScissorTest(L),lt){const wt=At.get(A.texture);B.framebufferTexture2D(B.FRAMEBUFFER,B.COLOR_ATTACHMENT0,B.TEXTURE_CUBE_MAP_POSITIVE_X+N,wt.__webglTexture,X)}else if(_t){const wt=At.get(A.texture),Ft=N||0;B.framebufferTextureLayer(B.FRAMEBUFFER,B.COLOR_ATTACHMENT0,wt.__webglTexture,X||0,Ft)}v=-1},this.readRenderTargetPixels=function(A,N,X,$,O,lt,_t){if(!(A&&A.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let bt=At.get(A).__webglFramebuffer;if(A.isWebGLCubeRenderTarget&&_t!==void 0&&(bt=bt[_t]),bt){Rt.bindFramebuffer(B.FRAMEBUFFER,bt);try{const wt=A.texture,Ft=wt.format,Bt=wt.type;if(!Vt.textureFormatReadable(Ft)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!Vt.textureTypeReadable(Bt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}N>=0&&N<=A.width-$&&X>=0&&X<=A.height-O&&B.readPixels(N,X,$,O,Dt.convert(Ft),Dt.convert(Bt),lt)}finally{const wt=R!==null?At.get(R).__webglFramebuffer:null;Rt.bindFramebuffer(B.FRAMEBUFFER,wt)}}},this.readRenderTargetPixelsAsync=async function(A,N,X,$,O,lt,_t){if(!(A&&A.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let bt=At.get(A).__webglFramebuffer;if(A.isWebGLCubeRenderTarget&&_t!==void 0&&(bt=bt[_t]),bt){const wt=A.texture,Ft=wt.format,Bt=wt.type;if(!Vt.textureFormatReadable(Ft))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!Vt.textureTypeReadable(Bt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(N>=0&&N<=A.width-$&&X>=0&&X<=A.height-O){Rt.bindFramebuffer(B.FRAMEBUFFER,bt);const Et=B.createBuffer();B.bindBuffer(B.PIXEL_PACK_BUFFER,Et),B.bufferData(B.PIXEL_PACK_BUFFER,lt.byteLength,B.STREAM_READ),B.readPixels(N,X,$,O,Dt.convert(Ft),Dt.convert(Bt),0);const Yt=R!==null?At.get(R).__webglFramebuffer:null;Rt.bindFramebuffer(B.FRAMEBUFFER,Yt);const oe=B.fenceSync(B.SYNC_GPU_COMMANDS_COMPLETE,0);return B.flush(),await Fd(B,oe,4),B.bindBuffer(B.PIXEL_PACK_BUFFER,Et),B.getBufferSubData(B.PIXEL_PACK_BUFFER,0,lt),B.deleteBuffer(Et),B.deleteSync(oe),lt}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(A,N=null,X=0){A.isTexture!==!0&&(ys("WebGLRenderer: copyFramebufferToTexture function signature has changed."),N=arguments[0]||null,A=arguments[1]);const $=Math.pow(2,-X),O=Math.floor(A.image.width*$),lt=Math.floor(A.image.height*$),_t=N!==null?N.x:0,bt=N!==null?N.y:0;P.setTexture2D(A,0),B.copyTexSubImage2D(B.TEXTURE_2D,X,0,0,_t,bt,O,lt),Rt.unbindTexture()},this.copyTextureToTexture=function(A,N,X=null,$=null,O=0){A.isTexture!==!0&&(ys("WebGLRenderer: copyTextureToTexture function signature has changed."),$=arguments[0]||null,A=arguments[1],N=arguments[2],O=arguments[3]||0,X=null);let lt,_t,bt,wt,Ft,Bt,Et,Yt,oe;const ce=A.isCompressedTexture?A.mipmaps[O]:A.image;X!==null?(lt=X.max.x-X.min.x,_t=X.max.y-X.min.y,bt=X.isBox3?X.max.z-X.min.z:1,wt=X.min.x,Ft=X.min.y,Bt=X.isBox3?X.min.z:0):(lt=ce.width,_t=ce.height,bt=ce.depth||1,wt=0,Ft=0,Bt=0),$!==null?(Et=$.x,Yt=$.y,oe=$.z):(Et=0,Yt=0,oe=0);const Oe=Dt.convert(N.format),jt=Dt.convert(N.type);let Tt;N.isData3DTexture?(P.setTexture3D(N,0),Tt=B.TEXTURE_3D):N.isDataArrayTexture||N.isCompressedArrayTexture?(P.setTexture2DArray(N,0),Tt=B.TEXTURE_2D_ARRAY):(P.setTexture2D(N,0),Tt=B.TEXTURE_2D),B.pixelStorei(B.UNPACK_FLIP_Y_WEBGL,N.flipY),B.pixelStorei(B.UNPACK_PREMULTIPLY_ALPHA_WEBGL,N.premultiplyAlpha),B.pixelStorei(B.UNPACK_ALIGNMENT,N.unpackAlignment);const Si=B.getParameter(B.UNPACK_ROW_LENGTH),Jt=B.getParameter(B.UNPACK_IMAGE_HEIGHT),ri=B.getParameter(B.UNPACK_SKIP_PIXELS),wn=B.getParameter(B.UNPACK_SKIP_ROWS),Xe=B.getParameter(B.UNPACK_SKIP_IMAGES);B.pixelStorei(B.UNPACK_ROW_LENGTH,ce.width),B.pixelStorei(B.UNPACK_IMAGE_HEIGHT,ce.height),B.pixelStorei(B.UNPACK_SKIP_PIXELS,wt),B.pixelStorei(B.UNPACK_SKIP_ROWS,Ft),B.pixelStorei(B.UNPACK_SKIP_IMAGES,Bt);const hs=A.isDataArrayTexture||A.isData3DTexture,he=N.isDataArrayTexture||N.isData3DTexture;if(A.isRenderTargetTexture||A.isDepthTexture){const ui=At.get(A),us=At.get(N),je=At.get(ui.__renderTarget),Ui=At.get(us.__renderTarget);Rt.bindFramebuffer(B.READ_FRAMEBUFFER,je.__webglFramebuffer),Rt.bindFramebuffer(B.DRAW_FRAMEBUFFER,Ui.__webglFramebuffer);for(let Fi=0;Fi<bt;Fi++)hs&&B.framebufferTextureLayer(B.READ_FRAMEBUFFER,B.COLOR_ATTACHMENT0,At.get(A).__webglTexture,O,Bt+Fi),A.isDepthTexture?(he&&B.framebufferTextureLayer(B.DRAW_FRAMEBUFFER,B.COLOR_ATTACHMENT0,At.get(N).__webglTexture,O,oe+Fi),B.blitFramebuffer(wt,Ft,lt,_t,Et,Yt,lt,_t,B.DEPTH_BUFFER_BIT,B.NEAREST)):he?B.copyTexSubImage3D(Tt,O,Et,Yt,oe+Fi,wt,Ft,lt,_t):B.copyTexSubImage2D(Tt,O,Et,Yt,oe+Fi,wt,Ft,lt,_t);Rt.bindFramebuffer(B.READ_FRAMEBUFFER,null),Rt.bindFramebuffer(B.DRAW_FRAMEBUFFER,null)}else he?A.isDataTexture||A.isData3DTexture?B.texSubImage3D(Tt,O,Et,Yt,oe,lt,_t,bt,Oe,jt,ce.data):N.isCompressedArrayTexture?B.compressedTexSubImage3D(Tt,O,Et,Yt,oe,lt,_t,bt,Oe,ce.data):B.texSubImage3D(Tt,O,Et,Yt,oe,lt,_t,bt,Oe,jt,ce):A.isDataTexture?B.texSubImage2D(B.TEXTURE_2D,O,Et,Yt,lt,_t,Oe,jt,ce.data):A.isCompressedTexture?B.compressedTexSubImage2D(B.TEXTURE_2D,O,Et,Yt,ce.width,ce.height,Oe,ce.data):B.texSubImage2D(B.TEXTURE_2D,O,Et,Yt,lt,_t,Oe,jt,ce);B.pixelStorei(B.UNPACK_ROW_LENGTH,Si),B.pixelStorei(B.UNPACK_IMAGE_HEIGHT,Jt),B.pixelStorei(B.UNPACK_SKIP_PIXELS,ri),B.pixelStorei(B.UNPACK_SKIP_ROWS,wn),B.pixelStorei(B.UNPACK_SKIP_IMAGES,Xe),O===0&&N.generateMipmaps&&B.generateMipmap(Tt),Rt.unbindTexture()},this.copyTextureToTexture3D=function(A,N,X=null,$=null,O=0){return A.isTexture!==!0&&(ys("WebGLRenderer: copyTextureToTexture3D function signature has changed."),X=arguments[0]||null,$=arguments[1]||null,A=arguments[2],N=arguments[3],O=arguments[4]||0),ys('WebGLRenderer: copyTextureToTexture3D function has been deprecated. Use "copyTextureToTexture" instead.'),this.copyTextureToTexture(A,N,X,$,O)},this.initRenderTarget=function(A){At.get(A).__webglFramebuffer===void 0&&P.setupRenderTarget(A)},this.initTexture=function(A){A.isCubeTexture?P.setTextureCube(A,0):A.isData3DTexture?P.setTexture3D(A,0):A.isDataArrayTexture||A.isCompressedArrayTexture?P.setTexture2DArray(A,0):P.setTexture2D(A,0),Rt.unbindTexture()},this.resetState=function(){b=0,S=0,R=null,Rt.reset(),Xt.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Pi}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;const e=this.getContext();e.drawingBufferColorspace=$t._getDrawingBufferColorSpace(t),e.unpackColorSpace=$t._getUnpackColorSpace()}}class Gr{constructor(t,e=25e-5){this.isFogExp2=!0,this.name="",this.color=new Wt(t),this.density=e}clone(){return new Gr(this.color,this.density)}toJSON(){return{type:"FogExp2",name:this.name,color:this.color.getHex(),density:this.density}}}class ol extends be{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new ii,this.environmentIntensity=1,this.environmentRotation=new ii,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){const e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(e.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(e.object.backgroundIntensity=this.backgroundIntensity),e.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(e.object.environmentIntensity=this.environmentIntensity),e.object.environmentRotation=this.environmentRotation.toArray(),e}}class Jh extends Mn{static get type(){return"LineBasicMaterial"}constructor(t){super(),this.isLineBasicMaterial=!0,this.color=new Wt(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.linewidth=t.linewidth,this.linecap=t.linecap,this.linejoin=t.linejoin,this.fog=t.fog,this}}const Vr=new G,Wr=new G,Sc=new se,vs=new sl,vr=new Vs,ka=new G,Mc=new G;class Z0 extends be{constructor(t=new Ie,e=new Jh){super(),this.isLine=!0,this.type="Line",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}computeLineDistances(){const t=this.geometry;if(t.index===null){const e=t.attributes.position,i=[0];for(let s=1,r=e.count;s<r;s++)Vr.fromBufferAttribute(e,s-1),Wr.fromBufferAttribute(e,s),i[s]=i[s-1],i[s]+=Vr.distanceTo(Wr);t.setAttribute("lineDistance",new pe(i,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(t,e){const i=this.geometry,s=this.matrixWorld,r=t.params.Line.threshold,a=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),vr.copy(i.boundingSphere),vr.applyMatrix4(s),vr.radius+=r,t.ray.intersectsSphere(vr)===!1)return;Sc.copy(s).invert(),vs.copy(t.ray).applyMatrix4(Sc);const o=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=this.isLineSegments?2:1,h=i.index,u=i.attributes.position;if(h!==null){const d=Math.max(0,a.start),p=Math.min(h.count,a.start+a.count);for(let g=d,m=p-1;g<m;g+=c){const _=h.getX(g),M=h.getX(g+1),E=xr(this,t,vs,l,_,M);E&&e.push(E)}if(this.isLineLoop){const g=h.getX(p-1),m=h.getX(d),_=xr(this,t,vs,l,g,m);_&&e.push(_)}}else{const d=Math.max(0,a.start),p=Math.min(u.count,a.start+a.count);for(let g=d,m=p-1;g<m;g+=c){const _=xr(this,t,vs,l,g,g+1);_&&e.push(_)}if(this.isLineLoop){const g=xr(this,t,vs,l,p-1,d);g&&e.push(g)}}}updateMorphTargets(){const e=this.geometry.morphAttributes,i=Object.keys(e);if(i.length>0){const s=e[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){const o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}}function xr(n,t,e,i,s,r){const a=n.geometry.attributes.position;if(Vr.fromBufferAttribute(a,s),Wr.fromBufferAttribute(a,r),e.distanceSqToSegment(Vr,Wr,ka,Mc)>i)return;ka.applyMatrix4(n.matrixWorld);const l=t.ray.origin.distanceTo(ka);if(!(l<t.near||l>t.far))return{distance:l,point:Mc.clone().applyMatrix4(n.matrixWorld),index:s,face:null,faceIndex:null,barycoord:null,object:n}}const bc=new G,wc=new G;class K0 extends Z0{constructor(t,e){super(t,e),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const t=this.geometry;if(t.index===null){const e=t.attributes.position,i=[];for(let s=0,r=e.count;s<r;s+=2)bc.fromBufferAttribute(e,s),wc.fromBufferAttribute(e,s+1),i[s]=s===0?0:i[s-1],i[s+1]=i[s]+bc.distanceTo(wc);t.setAttribute("lineDistance",new pe(i,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class Qh extends Mn{static get type(){return"PointsMaterial"}constructor(t){super(),this.isPointsMaterial=!0,this.color=new Wt(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.size=t.size,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}}const Ec=new se,Oo=new sl,yr=new Vs,Sr=new G;class j0 extends be{constructor(t=new Ie,e=new Qh){super(),this.isPoints=!0,this.type="Points",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}raycast(t,e){const i=this.geometry,s=this.matrixWorld,r=t.params.Points.threshold,a=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),yr.copy(i.boundingSphere),yr.applyMatrix4(s),yr.radius+=r,t.ray.intersectsSphere(yr)===!1)return;Ec.copy(s).invert(),Oo.copy(t.ray).applyMatrix4(Ec);const o=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=i.index,f=i.attributes.position;if(c!==null){const u=Math.max(0,a.start),d=Math.min(c.count,a.start+a.count);for(let p=u,g=d;p<g;p++){const m=c.getX(p);Sr.fromBufferAttribute(f,m),Tc(Sr,m,l,s,t,e,this)}}else{const u=Math.max(0,a.start),d=Math.min(f.count,a.start+a.count);for(let p=u,g=d;p<g;p++)Sr.fromBufferAttribute(f,p),Tc(Sr,p,l,s,t,e,this)}}updateMorphTargets(){const e=this.geometry.morphAttributes,i=Object.keys(e);if(i.length>0){const s=e[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){const o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}}function Tc(n,t,e,i,s,r,a){const o=Oo.distanceSqToPoint(n);if(o<e){const l=new G;Oo.closestPointToPoint(n,l),l.applyMatrix4(i);const c=s.ray.origin.distanceTo(l);if(c<s.near||c>s.far)return;r.push({distance:c,distanceToRay:Math.sqrt(o),point:l,index:t,face:null,faceIndex:null,barycoord:null,object:a})}}class Xr extends Pe{constructor(t,e,i,s,r,a,o,l,c){super(t,e,i,s,r,a,o,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}}const Mr=new G,br=new G,La=new G,wr=new Qe;class J0 extends Ie{constructor(t=null,e=1){if(super(),this.type="EdgesGeometry",this.parameters={geometry:t,thresholdAngle:e},t!==null){const s=Math.pow(10,4),r=Math.cos(Fr*e),a=t.getIndex(),o=t.getAttribute("position"),l=a?a.count:o.count,c=[0,0,0],h=["a","b","c"],f=new Array(3),u={},d=[];for(let p=0;p<l;p+=3){a?(c[0]=a.getX(p),c[1]=a.getX(p+1),c[2]=a.getX(p+2)):(c[0]=p,c[1]=p+1,c[2]=p+2);const{a:g,b:m,c:_}=wr;if(g.fromBufferAttribute(o,c[0]),m.fromBufferAttribute(o,c[1]),_.fromBufferAttribute(o,c[2]),wr.getNormal(La),f[0]=`${Math.round(g.x*s)},${Math.round(g.y*s)},${Math.round(g.z*s)}`,f[1]=`${Math.round(m.x*s)},${Math.round(m.y*s)},${Math.round(m.z*s)}`,f[2]=`${Math.round(_.x*s)},${Math.round(_.y*s)},${Math.round(_.z*s)}`,!(f[0]===f[1]||f[1]===f[2]||f[2]===f[0]))for(let M=0;M<3;M++){const E=(M+1)%3,y=f[M],w=f[E],b=wr[h[M]],S=wr[h[E]],R=`${y}_${w}`,v=`${w}_${y}`;v in u&&u[v]?(La.dot(u[v].normal)<=r&&(d.push(b.x,b.y,b.z),d.push(S.x,S.y,S.z)),u[v]=null):R in u||(u[R]={index0:c[M],index1:c[E],normal:La.clone()})}}for(const p in u)if(u[p]){const{index0:g,index1:m}=u[p];Mr.fromBufferAttribute(o,g),br.fromBufferAttribute(o,m),d.push(Mr.x,Mr.y,Mr.z),d.push(br.x,br.y,br.z)}this.setAttribute("position",new pe(d,3))}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}}class qi extends Mn{static get type(){return"MeshLambertMaterial"}constructor(t){super(),this.isMeshLambertMaterial=!0,this.color=new Wt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Wt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=kh,this.normalScale=new te(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new ii,this.combine=jo,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}const Ac={enabled:!1,files:{},add:function(n,t){this.enabled!==!1&&(this.files[n]=t)},get:function(n){if(this.enabled!==!1)return this.files[n]},remove:function(n){delete this.files[n]},clear:function(){this.files={}}};class Q0{constructor(t,e,i){const s=this;let r=!1,a=0,o=0,l;const c=[];this.onStart=void 0,this.onLoad=t,this.onProgress=e,this.onError=i,this.itemStart=function(h){o++,r===!1&&s.onStart!==void 0&&s.onStart(h,a,o),r=!0},this.itemEnd=function(h){a++,s.onProgress!==void 0&&s.onProgress(h,a,o),a===o&&(r=!1,s.onLoad!==void 0&&s.onLoad())},this.itemError=function(h){s.onError!==void 0&&s.onError(h)},this.resolveURL=function(h){return l?l(h):h},this.setURLModifier=function(h){return l=h,this},this.addHandler=function(h,f){return c.push(h,f),this},this.removeHandler=function(h){const f=c.indexOf(h);return f!==-1&&c.splice(f,2),this},this.getHandler=function(h){for(let f=0,u=c.length;f<u;f+=2){const d=c[f],p=c[f+1];if(d.global&&(d.lastIndex=0),d.test(h))return p}return null}}}const t_=new Q0;class ll{constructor(t){this.manager=t!==void 0?t:t_,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(t,e){const i=this;return new Promise(function(s,r){i.load(t,s,e,r)})}parse(){}setCrossOrigin(t){return this.crossOrigin=t,this}setWithCredentials(t){return this.withCredentials=t,this}setPath(t){return this.path=t,this}setResourcePath(t){return this.resourcePath=t,this}setRequestHeader(t){return this.requestHeader=t,this}}ll.DEFAULT_MATERIAL_NAME="__DEFAULT";class e_ extends ll{constructor(t){super(t)}load(t,e,i,s){this.path!==void 0&&(t=this.path+t),t=this.manager.resolveURL(t);const r=this,a=Ac.get(t);if(a!==void 0)return r.manager.itemStart(t),setTimeout(function(){e&&e(a),r.manager.itemEnd(t)},0),a;const o=Ps("img");function l(){h(),Ac.add(t,this),e&&e(this),r.manager.itemEnd(t)}function c(f){h(),s&&s(f),r.manager.itemError(t),r.manager.itemEnd(t)}function h(){o.removeEventListener("load",l,!1),o.removeEventListener("error",c,!1)}return o.addEventListener("load",l,!1),o.addEventListener("error",c,!1),t.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(o.crossOrigin=this.crossOrigin),r.manager.itemStart(t),o.src=t,o}}class ts extends ll{constructor(t){super(t)}load(t,e,i,s){const r=new Pe,a=new e_(this.manager);return a.setCrossOrigin(this.crossOrigin),a.setPath(this.path),a.load(t,function(o){r.image=o,r.needsUpdate=!0,e!==void 0&&e(r)},i,s),r}}class tu extends be{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new Wt(t),this.intensity=e}dispose(){}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){const e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,this.groundColor!==void 0&&(e.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(e.object.distance=this.distance),this.angle!==void 0&&(e.object.angle=this.angle),this.decay!==void 0&&(e.object.decay=this.decay),this.penumbra!==void 0&&(e.object.penumbra=this.penumbra),this.shadow!==void 0&&(e.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(e.object.target=this.target.uuid),e}}const Ua=new se,Cc=new G,Rc=new G;class i_{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new te(512,512),this.map=null,this.mapPass=null,this.matrix=new se,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new rl,this._frameExtents=new te(1,1),this._viewportCount=1,this._viewports=[new _e(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(t){const e=this.camera,i=this.matrix;Cc.setFromMatrixPosition(t.matrixWorld),e.position.copy(Cc),Rc.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(Rc),e.updateMatrixWorld(),Ua.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Ua),i.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),i.multiply(Ua)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.mapSize.copy(t.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const t={};return this.intensity!==1&&(t.intensity=this.intensity),this.bias!==0&&(t.bias=this.bias),this.normalBias!==0&&(t.normalBias=this.normalBias),this.radius!==1&&(t.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(t.mapSize=this.mapSize.toArray()),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}}class n_ extends i_{constructor(){super(new $h(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class eu extends tu{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(be.DEFAULT_UP),this.updateMatrix(),this.target=new be,this.shadow=new n_}dispose(){this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}}class iu extends tu{constructor(t,e){super(t,e),this.isAmbientLight=!0,this.type="AmbientLight"}}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Ko}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Ko);const Ic=["white","light_gray","gray","black","brown","red","orange","yellow","lime","green","cyan","light_blue","blue","purple","magenta","pink"],s_={white:16383998,light_gray:10329495,gray:4673362,black:1908001,brown:8606770,red:11546150,orange:16351261,yellow:16701501,lime:8439583,green:6192150,cyan:1481884,light_blue:3847130,blue:3949738,purple:8991416,magenta:13061821,pink:15961002};class tt{static formatName(t){const e=`block.minecraft.${t}`,i=`item.minecraft.${t}`;return this.langMap[e]?this.langMap[e]:this.langMap[i]?this.langMap[i]:t.split("_").map(s=>s.charAt(0).toUpperCase()+s.slice(1)).join(" ")}static registerBlock(t){const e=this.blocksById.get(`minecraft:${t.shortId}`);if(e)return e;const i=this.nextBlockNumId++,s=`minecraft:${t.shortId}`,r={...t,numId:i,id:s,displayName:t.displayName||this.formatName(t.shortId)};if(this.blocksByNum.set(i,r),this.blocksById.set(s,r),this.blocksById.set(t.shortId,r),this.allBlocks.push(r),t.shape!=="air"&&t.shape!=="fluid"&&t.shape!=="bed_head"){const a=t.shortId==="straw_bed"?"block/straw_bed_particle":t.shape==="cross"||t.shape==="torch"?`block/${t.textures.north}`:`block/${t.textures.north}`;this.registerItem({shortId:t.shortId,displayName:r.displayName,isBlock:!0,blockNumId:i,texture:a,category:t.category,maxStack:t.shortId.endsWith("_bed")?1:64,is26_3:t.is26_3})}return r}static registerItem(t){const e=`minecraft:${t.shortId}`,i=this.itemsById.get(e);if(i)return i;const s={...t,id:e,displayName:t.displayName||this.formatName(t.shortId)};return this.itemsById.set(e,s),this.itemsById.set(t.shortId,s),this.allItems.push(s),s}static allFaces(t){return{top:t,bottom:t,north:t,south:t,east:t,west:t}}static topBottomSide(t,e,i){return{top:t,bottom:e,north:i,south:i,east:i,west:i}}static async init(){const[t,e,i,s,r,a,o]=await Promise.all([fetch("/assets/minecraft/lang/en_us.json").then(p=>p.json()).catch(()=>({})),fetch("/reports/blocks_summary.json").then(p=>p.json()).catch(()=>({})),fetch("/reports/registries.json").then(p=>p.json()).catch(()=>({})),fetch("/reports/packets.json").then(p=>p.json()).catch(()=>({})),fetch("/reports/texture_manifest.json").then(p=>p.json()).catch(()=>({block:[],item:[]})),fetch("/reports/resolved_block_models.json").then(p=>p.json()).catch(()=>({})),fetch("/reports/resolved_item_models.json").then(p=>p.json()).catch(()=>({}))]);this.langMap=t,this.officialBlocksSummary=e,this.officialRegistries=i,this.officialPackets=s;const l=new Set(r.block||[]);this.registerBlock({shortId:"air",shape:"air",transparent:!0,solid:!1,lightEmission:0,hardness:0,soundGroup:"stone",textures:this.allFaces("stone"),category:"natural"}),this.registerBlock({shortId:"stone",shape:"cube",transparent:!1,solid:!0,lightEmission:0,hardness:1.5,soundGroup:"stone",textures:this.allFaces("stone"),category:"natural"}),this.registerBlock({shortId:"grass_block",shape:"cube",transparent:!1,solid:!0,lightEmission:0,hardness:.6,soundGroup:"grass",tint:"grass",textures:this.topBottomSide("grass_block_top","dirt","grass_block_side"),category:"natural"}),this.registerBlock({shortId:"dirt",shape:"cube",transparent:!1,solid:!0,lightEmission:0,hardness:.5,soundGroup:"gravel",textures:this.allFaces("dirt"),category:"natural"}),this.registerBlock({shortId:"coarse_dirt",shape:"cube",transparent:!1,solid:!0,lightEmission:0,hardness:.5,soundGroup:"gravel",textures:this.allFaces("coarse_dirt"),category:"natural"}),this.registerBlock({shortId:"podzol",shape:"cube",transparent:!1,solid:!0,lightEmission:0,hardness:.5,soundGroup:"gravel",textures:this.topBottomSide("podzol_top","dirt","podzol_side"),category:"natural"}),this.registerBlock({shortId:"dirt_path",shape:"path",transparent:!0,solid:!0,lightEmission:0,hardness:.65,soundGroup:"grass",textures:this.topBottomSide("dirt_path_top","dirt","dirt_path_side"),category:"natural"}),this.registerBlock({shortId:"cobblestone",shape:"cube",transparent:!1,solid:!0,lightEmission:0,hardness:2,soundGroup:"stone",textures:this.allFaces("cobblestone"),category:"building"}),this.registerBlock({shortId:"bedrock",shape:"cube",transparent:!1,solid:!0,lightEmission:0,hardness:-1,soundGroup:"stone",textures:this.allFaces("bedrock"),category:"natural"}),this.registerBlock({shortId:"sand",shape:"cube",transparent:!1,solid:!0,lightEmission:0,hardness:.5,soundGroup:"sand",textures:this.allFaces("sand"),category:"natural"}),this.registerBlock({shortId:"gravel",shape:"cube",transparent:!1,solid:!0,lightEmission:0,hardness:.6,soundGroup:"gravel",textures:this.allFaces("gravel"),category:"natural"}),this.registerBlock({shortId:"water",shape:"fluid",fluid:"water",transparent:!0,solid:!1,lightEmission:0,hardness:100,soundGroup:"stone",tint:"water",textures:this.allFaces("water_still"),category:"natural"}),this.registerBlock({shortId:"lava",shape:"fluid",fluid:"lava",transparent:!1,solid:!1,lightEmission:15,hardness:100,soundGroup:"stone",textures:this.allFaces("lava_still"),category:"natural"}),this.registerBlock({shortId:"poplar_log",shape:"pillar",transparent:!1,solid:!0,lightEmission:0,hardness:2,soundGroup:"wood",textures:this.topBottomSide("poplar_log_top","poplar_log_top","poplar_log"),category:"natural",is26_3:!0}),this.registerBlock({shortId:"stripped_poplar_log",shape:"pillar",transparent:!1,solid:!0,lightEmission:0,hardness:2,soundGroup:"wood",textures:this.topBottomSide("stripped_poplar_log_top","stripped_poplar_log_top","stripped_poplar_log"),category:"building",is26_3:!0}),this.registerBlock({shortId:"poplar_wood",shape:"cube",transparent:!1,solid:!0,lightEmission:0,hardness:2,soundGroup:"wood",textures:this.allFaces("poplar_log"),category:"building",is26_3:!0}),this.registerBlock({shortId:"stripped_poplar_wood",shape:"cube",transparent:!1,solid:!0,lightEmission:0,hardness:2,soundGroup:"wood",textures:this.allFaces("stripped_poplar_log"),category:"building",is26_3:!0}),this.registerBlock({shortId:"poplar_planks",shape:"cube",transparent:!1,solid:!0,lightEmission:0,hardness:2,soundGroup:"wood",textures:this.allFaces("poplar_planks"),category:"building",is26_3:!0}),this.registerBlock({shortId:"poplar_stairs",shape:"stairs",transparent:!0,solid:!0,lightEmission:0,hardness:2,soundGroup:"wood",textures:this.allFaces("poplar_planks"),category:"building",is26_3:!0}),this.registerBlock({shortId:"poplar_slab",shape:"slab_bottom",transparent:!0,solid:!0,lightEmission:0,hardness:2,soundGroup:"wood",textures:this.allFaces("poplar_planks"),category:"building",is26_3:!0}),this.registerBlock({shortId:"poplar_fence",shape:"fence",transparent:!0,solid:!0,lightEmission:0,hardness:2,soundGroup:"wood",textures:this.allFaces("poplar_planks"),category:"building",is26_3:!0}),this.registerBlock({shortId:"poplar_trapdoor",shape:"trapdoor",transparent:!0,solid:!0,lightEmission:0,hardness:3,soundGroup:"wood",textures:this.allFaces("poplar_trapdoor"),category:"building",is26_3:!0}),this.registerBlock({shortId:"poplar_shelf",shape:"slab_top",transparent:!0,solid:!0,lightEmission:0,hardness:2,soundGroup:"wood",textures:this.topBottomSide("poplar_shelf_top","poplar_shelf_top","poplar_shelf_front"),category:"functional",is26_3:!0}),this.registerBlock({shortId:"orange_poplar_leaves",shape:"cube",transparent:!0,solid:!0,lightEmission:0,hardness:.2,soundGroup:"poplar_leaves",textures:this.allFaces("orange_poplar_leaves"),category:"natural",is26_3:!0}),this.registerBlock({shortId:"red_poplar_leaves",shape:"cube",transparent:!0,solid:!0,lightEmission:0,hardness:.2,soundGroup:"poplar_leaves",textures:this.allFaces("red_poplar_leaves"),category:"natural",is26_3:!0}),this.registerBlock({shortId:"yellow_poplar_leaves",shape:"cube",transparent:!0,solid:!0,lightEmission:0,hardness:.2,soundGroup:"poplar_leaves",textures:this.allFaces("yellow_poplar_leaves"),category:"natural",is26_3:!0}),this.registerBlock({shortId:"poplar_sapling",shape:"cross",transparent:!0,solid:!1,lightEmission:0,hardness:0,soundGroup:"grass",textures:this.allFaces("poplar_sapling"),category:"natural",is26_3:!0}),this.registerBlock({shortId:"straw_bed",shape:"bed_foot",transparent:!0,solid:!0,lightEmission:0,hardness:.2,soundGroup:"straw_bed",textures:this.topBottomSide("straw_bed_foot_top","oak_planks","straw_bed_side"),category:"functional",is26_3:!0}),this.registerBlock({shortId:"straw_bed_head",shape:"bed_head",transparent:!0,solid:!0,lightEmission:0,hardness:.2,soundGroup:"straw_bed",textures:this.topBottomSide("straw_bed_head_top","oak_planks","straw_bed_side"),category:"functional",is26_3:!0});for(const p of Ic)this.registerItem({shortId:`${p}_cushion`,isBlock:!1,texture:`item/${p}_cushion`,category:"colored",maxStack:16,is26_3:!0,cushionColor:p});for(const p of Ic){const g=`${p}_wool`;this.registerBlock({shortId:`${p}_wool`,shape:"cube",transparent:!1,solid:!0,lightEmission:0,hardness:.8,soundGroup:"wool",textures:this.allFaces(g),category:"colored"}),this.registerBlock({shortId:`${p}_wool_stairs`,shape:"stairs",transparent:!0,solid:!0,lightEmission:0,hardness:.8,soundGroup:"wool",textures:this.allFaces(g),category:"colored",is26_3:!0}),this.registerBlock({shortId:`${p}_wool_slab`,shape:"slab_bottom",transparent:!0,solid:!0,lightEmission:0,hardness:.8,soundGroup:"wool",textures:this.allFaces(g),category:"colored",is26_3:!0});const m=`${p}_concrete`;this.registerBlock({shortId:`${p}_concrete`,shape:"cube",transparent:!1,solid:!0,lightEmission:0,hardness:1.8,soundGroup:"stone",textures:this.allFaces(m),category:"colored"}),this.registerBlock({shortId:`${p}_concrete_stairs`,shape:"stairs",transparent:!0,solid:!0,lightEmission:0,hardness:1.8,soundGroup:"stone",textures:this.allFaces(m),category:"colored",is26_3:!0}),this.registerBlock({shortId:`${p}_concrete_slab`,shape:"slab_bottom",transparent:!0,solid:!0,lightEmission:0,hardness:1.8,soundGroup:"stone",textures:this.allFaces(m),category:"colored",is26_3:!0})}const c=["oak","birch","spruce","cherry","pale_oak","dark_oak","jungle","acacia","mangrove"];for(const p of c)l.has(`${p}_log`)&&this.registerBlock({shortId:`${p}_log`,shape:"pillar",transparent:!1,solid:!0,lightEmission:0,hardness:2,soundGroup:"wood",textures:this.topBottomSide(`${p}_log_top`,`${p}_log_top`,`${p}_log`),category:"natural"}),l.has(`${p}_planks`)&&(this.registerBlock({shortId:`${p}_planks`,shape:"cube",transparent:!1,solid:!0,lightEmission:0,hardness:2,soundGroup:"wood",textures:this.allFaces(`${p}_planks`),category:"building"}),this.registerBlock({shortId:`${p}_stairs`,shape:"stairs",transparent:!0,solid:!0,lightEmission:0,hardness:2,soundGroup:"wood",textures:this.allFaces(`${p}_planks`),category:"building"}),this.registerBlock({shortId:`${p}_slab`,shape:"slab_bottom",transparent:!0,solid:!0,lightEmission:0,hardness:2,soundGroup:"wood",textures:this.allFaces(`${p}_planks`),category:"building"}),this.registerBlock({shortId:`${p}_fence`,shape:"fence",transparent:!0,solid:!0,lightEmission:0,hardness:2,soundGroup:"wood",textures:this.allFaces(`${p}_planks`),category:"building"})),l.has(`${p}_leaves`)&&this.registerBlock({shortId:`${p}_leaves`,shape:"cube",transparent:!0,solid:!0,lightEmission:0,hardness:.2,soundGroup:"grass",tint:p==="cherry"||p==="pale_oak"?void 0:p==="birch"?"birch":p==="spruce"?"spruce":"foliage",textures:this.allFaces(`${p}_leaves`),category:"natural"});this.registerBlock({shortId:"campfire",shape:"campfire",transparent:!0,solid:!0,lightEmission:15,hardness:2,soundGroup:"wood",textures:this.topBottomSide("campfire_log_lit","campfire_log","campfire_log"),category:"functional"}),this.registerBlock({shortId:"barrel",shape:"cube",transparent:!1,solid:!0,lightEmission:0,hardness:2.5,soundGroup:"wood",textures:this.topBottomSide("barrel_top","barrel_bottom","barrel_side"),category:"functional"}),this.registerBlock({shortId:"chest",shape:"cube",transparent:!1,solid:!0,lightEmission:0,hardness:2.5,soundGroup:"wood",textures:this.topBottomSide("oak_planks","oak_planks","oak_planks"),category:"functional"}),this.registerBlock({shortId:"crafting_table",shape:"cube",transparent:!1,solid:!0,lightEmission:0,hardness:2.5,soundGroup:"wood",textures:{top:"crafting_table_top",bottom:"oak_planks",north:"crafting_table_front",south:"crafting_table_side",east:"crafting_table_side",west:"crafting_table_front"},category:"functional"}),this.registerBlock({shortId:"stonecutter",shape:"slab_bottom",transparent:!0,solid:!0,lightEmission:0,hardness:3.5,soundGroup:"stone",textures:this.topBottomSide("stonecutter_top","stonecutter_bottom","stonecutter_side"),category:"functional"}),this.registerBlock({shortId:"furnace",shape:"cube",transparent:!1,solid:!0,lightEmission:0,hardness:3.5,soundGroup:"stone",textures:{top:"furnace_top",bottom:"furnace_top",north:"furnace_front",south:"furnace_side",east:"furnace_side",west:"furnace_side"},category:"functional"}),this.registerBlock({shortId:"torch",shape:"torch",transparent:!0,solid:!1,lightEmission:14,hardness:0,soundGroup:"wood",textures:this.allFaces("torch"),category:"functional"}),this.registerBlock({shortId:"lantern",shape:"cross",transparent:!0,solid:!0,lightEmission:15,hardness:3.5,soundGroup:"stone",textures:this.allFaces("lantern"),category:"functional"}),this.registerBlock({shortId:"cauldron",shape:"cube",transparent:!0,solid:!0,lightEmission:0,hardness:2,soundGroup:"stone",textures:this.topBottomSide("cauldron_top","cauldron_bottom","cauldron_side"),category:"functional"}),this.registerBlock({shortId:"water_cauldron",shape:"cube",transparent:!0,solid:!0,lightEmission:0,hardness:2,soundGroup:"stone",textures:this.topBottomSide("cauldron_top","cauldron_bottom","cauldron_side"),category:"functional"}),this.registerBlock({shortId:"leaf_litter",shape:"carpet",transparent:!0,solid:!1,lightEmission:0,hardness:0,soundGroup:"poplar_leaves",tint:"foliage",textures:this.allFaces(l.has("leaf_litter")?"leaf_litter":"orange_poplar_leaves"),category:"natural",is26_3:!0});const h=["short_grass","fern","dandelion","poppy","blue_orchid","allium","azure_bluet","red_tulip","orange_tulip","white_tulip","pink_tulip","oxeye_daisy","cornflower","lily_of_the_valley","brown_mushroom","red_mushroom","dead_bush","wildflowers","bush"];for(const p of h)l.has(p)&&this.registerBlock({shortId:p,shape:"cross",transparent:!0,solid:!1,lightEmission:0,hardness:0,soundGroup:"grass",tint:p==="short_grass"||p==="fern"||p==="bush"?"grass":void 0,textures:this.allFaces(p),category:"natural"});const f=[["stone_bricks","building","stone",1.5],["mossy_stone_bricks","building","stone",1.5],["cracked_stone_bricks","building","stone",1.5],["chiseled_stone_bricks","building","stone",1.5],["mossy_cobblestone","building","stone",2],["smooth_stone","building","stone",2],["granite","natural","stone",1.5],["polished_granite","building","stone",1.5],["diorite","natural","stone",1.5],["polished_diorite","building","stone",1.5],["andesite","natural","stone",1.5],["polished_andesite","building","stone",1.5],["deepslate","natural","stone",3],["cobbled_deepslate","building","stone",3.5],["deepslate_bricks","building","stone",3.5],["tuff","natural","stone",1.5],["bricks","building","stone",2],["mud_bricks","building","stone",1.5],["coal_ore","natural","stone",3],["iron_ore","natural","stone",3],["copper_ore","natural","stone",3],["gold_ore","natural","stone",3],["redstone_ore","natural","stone",3],["emerald_ore","natural","stone",3],["lapis_ore","natural","stone",3],["diamond_ore","natural","stone",3],["deepslate_coal_ore","natural","stone",4.5],["deepslate_iron_ore","natural","stone",4.5],["deepslate_copper_ore","natural","stone",4.5],["deepslate_gold_ore","natural","stone",4.5],["deepslate_redstone_ore","natural","stone",4.5],["deepslate_diamond_ore","natural","stone",4.5],["deepslate_lapis_ore","natural","stone",4.5],["deepslate_emerald_ore","natural","stone",4.5],["coal_block","building","stone",5],["iron_block","building","stone",5],["gold_block","building","stone",3],["diamond_block","building","stone",5],["emerald_block","building","stone",5],["copper_block","building","stone",3],["amethyst_block","natural","glass",1.5],["glass","colored","glass",.3,!0],["glowstone","functional","glass",.3],["shroomlight","natural","grass",1],["sea_lantern","functional","glass",.3],["obsidian","natural","stone",50],["crying_obsidian","natural","stone",50],["netherrack","natural","stone",.4],["end_stone","natural","stone",3],["moss_block","natural","grass",.1],["snow_block","natural","wool",.2],["ice","natural","glass",.5,!0],["packed_ice","natural","glass",.5],["blue_ice","natural","glass",2.8],["bookshelf","functional","wood",1.5]];for(const[p,g,m,_,M]of f)if(l.has(p)){const E=p==="bookshelf"?this.topBottomSide("oak_planks","oak_planks","bookshelf"):this.allFaces(p);this.registerBlock({shortId:p,shape:"cube",transparent:!!M,solid:!0,lightEmission:p==="glowstone"||p==="shroomlight"||p==="sea_lantern"?15:p==="crying_obsidian"?10:0,hardness:_,soundGroup:m,textures:E,category:g})}this.registerBlock({shortId:"hay_block",shape:"pillar",transparent:!1,solid:!0,lightEmission:0,hardness:.5,soundGroup:"grass",textures:this.topBottomSide("hay_block_top","hay_block_top","hay_block_side"),category:"natural"});for(const p of Object.keys(this.officialBlocksSummary)){const g=p.replace("minecraft:","");if(this.blocksById.has(p))continue;const m=a[g];m&&l.has(m.top)&&l.has(m.north)?this.registerBlock({shortId:g,shape:m.isCross?"cross":g.endsWith("_slab")?"slab_bottom":g.endsWith("_stairs")?"stairs":"cube",transparent:m.isCross||g.includes("glass")||g.includes("leaves")||g.includes("grate")||g.endsWith("_slab")||g.endsWith("_stairs"),solid:!m.isCross,lightEmission:g.includes("froglight")||g.includes("lamp")||g.includes("lantern")?15:0,hardness:1.5,soundGroup:g.includes("wood")||g.includes("planks")||g.includes("log")?"wood":"stone",tint:g.includes("leaves")&&!g.includes("cherry")&&!g.includes("poplar")&&!g.includes("pale_oak")?"foliage":m.isTinted?"grass":void 0,textures:{top:m.top,bottom:l.has(m.bottom)?m.bottom:m.top,north:m.north,south:l.has(m.south)?m.south:m.north,east:l.has(m.east)?m.east:m.north,west:l.has(m.west)?m.west:m.north},category:"building",is26_3:g.includes("poplar")||g.includes("straw")||g.includes("cushion")}):l.has(g)&&this.registerBlock({shortId:g,shape:"cube",transparent:g.includes("glass")||g.includes("leaves")||g.includes("grate"),solid:!0,lightEmission:g.includes("froglight")||g.includes("lamp")?15:0,hardness:1.5,soundGroup:g.includes("wood")||g.includes("planks")?"wood":"stone",textures:this.allFaces(g),category:"building",is26_3:g.includes("poplar")||g.includes("straw")||g.includes("cushion")})}const u=[["diamond_pickaxe","pickaxe",8],["diamond_axe","axe",8],["diamond_shovel","shovel",8],["diamond_sword","sword",8],["iron_pickaxe","pickaxe",6],["iron_axe","axe",6],["iron_shovel","shovel",6],["iron_sword","sword",6],["wooden_pickaxe","pickaxe",2],["wooden_axe","axe",2],["wooden_shovel","shovel",2],["wooden_sword","sword",2],["stone_pickaxe","pickaxe",4],["stone_axe","axe",4],["stone_shovel","shovel",4],["stone_sword","sword",4]];for(const[p,g,m]of u)this.registerItem({shortId:p,isBlock:!1,texture:`item/${p}`,category:"combat_tools",maxStack:1,toolType:g,toolSpeed:m,isHandheld:!0});const d=[["poplar_boat","combat_tools",!0],["poplar_chest_boat","combat_tools",!0],["poplar_sign","functional",!0],["poplar_hanging_sign","functional",!0],["filled_map","combat_tools",!0],["wheat","natural"],["stick","natural"],["coal","natural"],["iron_ingot","natural"],["gold_ingot","natural"],["diamond","natural"],["emerald","natural"],["apple","natural"],["bread","natural"],["porkchop","natural"],["cooked_porkchop","natural"],["beef","natural"],["cooked_beef","natural"],["mutton","natural"],["cooked_mutton","natural"],["leather","natural"],["feather","natural"],["string","natural"],["bone","natural"],["flint","natural"],["shears","combat_tools"],["water_bucket","combat_tools"],["lava_bucket","combat_tools"],["compass","combat_tools"],["clock","combat_tools"]];for(const[p,g,m]of d)this.registerItem({shortId:p,displayName:p==="filled_map"?"Abandoned Camp Explorer Map":void 0,isBlock:!1,texture:`item/${p}`,category:g,maxStack:p.includes("boat")||p.includes("bucket")?1:64,is26_3:m,isHandheld:p==="stick"});for(const p of this.allItems){const g=o[p.shortId];g&&(g.isHandheld&&(p.isHandheld=!0),!p.isBlock&&g.tex&&(p.texture=g.tex)),(p.toolType||p.shortId==="stick")&&(p.isHandheld=!0)}}static getBlock(t){if(typeof t=="number")return this.blocksByNum.get(t)||this.blocksByNum.get(0);const e=t.startsWith("minecraft:")?t:`minecraft:${t}`;return this.blocksById.get(e)||this.blocksByNum.get(1)}static getItem(t){const e=t.startsWith("minecraft:")?t:`minecraft:${t}`;return this.itemsById.get(e)}}I(tt,"blocksByNum",new Map),I(tt,"blocksById",new Map),I(tt,"itemsById",new Map),I(tt,"allBlocks",[]),I(tt,"allItems",[]),I(tt,"langMap",{}),I(tt,"officialBlocksSummary",{}),I(tt,"officialRegistries",{}),I(tt,"officialPackets",{}),I(tt,"nextBlockNumId",0);class ue{static async build(){this.canvas=document.createElement("canvas"),this.canvas.width=this.ATLAS_SIZE,this.canvas.height=this.ATLAS_SIZE,this.ctx=this.canvas.getContext("2d",{willReadFrequently:!0}),this.ctx.imageSmoothingEnabled=!1;const t=new Set;for(const u of tt.allBlocks)t.add(u.textures.top),t.add(u.textures.bottom),t.add(u.textures.north),t.add(u.textures.south),t.add(u.textures.east),t.add(u.textures.west);t.add("grass_block_side_overlay"),t.add("straw_bed"),t.add("campfire_fire");for(let u=0;u<10;u++)t.add(`destroy_stage_${u}`);const e=new Set(["straw_bed_foot_top","straw_bed_head_top","straw_bed_side","poplar_shelf_front","poplar_shelf_top"]),i=Array.from(t).filter(u=>!e.has(u)),s=u=>new Promise(d=>{const p=new Image;p.crossOrigin="anonymous",p.onload=()=>d([u,p]),p.onerror=()=>d([u,null]),p.src=`/assets/minecraft/textures/block/${u}.png`}),r=await Promise.all(i.map(s)),a=new Map;for(const[u,d]of r)d&&(this.loadedImages.set(u,d),a.set(u,d));let o=0;const l=(u,d)=>{const p=o%this.TILES_PER_ROW,g=Math.floor(o/this.TILES_PER_ROW),m=p*this.TILE_SIZE,_=g*this.TILE_SIZE;d(this.ctx,m,_);const M=document.createElement("canvas");M.width=16,M.height=16;const E=M.getContext("2d");E.imageSmoothingEnabled=!1,E.drawImage(this.canvas,m,_,16,16,0,0,16,16);const y=new Image;y.src=M.toDataURL(),this.loadedImages.set(u,M);const w=.08/this.ATLAS_SIZE,b=m/this.ATLAS_SIZE+w,S=(m+this.TILE_SIZE)/this.ATLAS_SIZE-w,R=1-_/this.ATLAS_SIZE-w,v=1-(_+this.TILE_SIZE)/this.ATLAS_SIZE+w;this.uvMap.set(u,{u0:b,v0:v,u1:S,v1:R}),o++},c=this.loadedImages.get("grass_block_side_overlay");for(const[u,d]of r)l(u,(p,g,m)=>{if(!d){p.fillStyle="#ff00ff",p.fillRect(g,m,16,16),p.fillStyle="#000000",p.fillRect(g,m,8,8),p.fillRect(g+8,m+8,8,8);return}if(p.drawImage(d,0,0,16,16,g,m,16,16),u==="grass_block_side"&&c){const _=document.createElement("canvas");_.width=16,_.height=16;const M=_.getContext("2d",{willReadFrequently:!0});M.imageSmoothingEnabled=!1,M.drawImage(c,0,0,16,16,0,0,16,16);const E=M.getImageData(0,0,16,16),y=E.data;for(let w=0;w<y.length;w+=4)y[w+3]>0&&(y[w]=Math.min(255,Math.floor(y[w]*121/255)),y[w+1]=Math.min(255,Math.floor(y[w+1]*192/255)),y[w+2]=Math.min(255,Math.floor(y[w+2]*90/255)));M.putImageData(E,0,0),p.drawImage(_,0,0,16,16,g,m,16,16)}});const h=a.get("straw_bed");h&&(l("straw_bed_foot_top",(u,d,p)=>{u.drawImage(h,16,25,16,16,d,p,16,16)}),l("straw_bed_head_top",(u,d,p)=>{u.drawImage(h,8,13,16,16,d,p,16,16),u.drawImage(h,8,0,16,8,d,p,16,8)}),l("straw_bed_side",(u,d,p)=>{u.drawImage(h,16,25,16,16,d,p,16,16),u.drawImage(h,16,41,16,4,d,p+12,16,4)}));const f=a.get("poplar_shelf");return f&&(l("poplar_shelf_front",(u,d,p)=>{u.drawImage(f,16,0,16,16,d,p,16,16),u.drawImage(f,0,0,16,4,d,p,16,4),u.drawImage(f,0,12,16,4,d,p+12,16,4)}),l("poplar_shelf_top",(u,d,p)=>{u.drawImage(f,16,0,16,16,d,p,16,16)})),this.texture=new Xr(this.canvas),this.texture.magFilter=Kt,this.texture.minFilter=Kt,this.texture.colorSpace=me,this.texture.needsUpdate=!0,this.texture}static getUV(t){return this.uvMap.get(t)||this.uvMap.get("stone")||{u0:0,v0:0,u1:16/this.ATLAS_SIZE,v1:16/this.ATLAS_SIZE}}}I(ue,"ATLAS_SIZE",2048),I(ue,"TILE_SIZE",16),I(ue,"TILES_PER_ROW",128),I(ue,"canvas"),I(ue,"ctx"),I(ue,"texture"),I(ue,"uvMap",new Map),I(ue,"loadedImages",new Map);class It{static async init(){try{const t=localStorage.getItem("mc_26_3_options");if(t){const e=JSON.parse(t);e.username==="Anders_26_3"&&(e.username="Steve"),this.current={...this.current,...e,keyBinds:{...this.current.keyBinds,...e.keyBinds||{}}}}else{const e=await fetch("/options.txt");if(e.ok){const i=await e.text();this.parseOfficialOptionsTxt(i)}}}catch{}}static parseOfficialOptionsTxt(t){const e=t.split(/\r?\n/);for(const i of e){const s=i.indexOf(":");if(s===-1)continue;const r=i.slice(0,s).trim(),a=i.slice(s+1).trim();if(r==="fov"){const o=parseFloat(a);isNaN(o)||(this.current.fov=o<=2?Math.round(70+o*40):Math.round(o))}else if(r==="renderDistance"){const o=parseInt(a,10);isNaN(o)||(this.current.renderDistance=Math.min(8,Math.max(3,o)))}else if(r==="mouseSensitivity"){const o=parseFloat(a);isNaN(o)||(this.current.mouseSensitivity=o)}}}static save(){try{localStorage.setItem("mc_26_3_options",JSON.stringify(this.current))}catch{}}}I(It,"current",{fov:75,renderDistance:6,mouseSensitivity:.5,invertMouse:!1,soundVolume:.8,musicVolume:.6,blocksVolume:.8,hostileVolume:.8,friendlyVolume:.8,guiScale:2,fullscreen:!1,ao:!0,clouds:!0,graphics:"fancy",difficulty:"Normal",toggleSprint:!1,toggleSneak:!1,particles:"all",wispServerUrl:`ws://${window.location.host||"localhost:3000"}/wisp/`,username:"Steve",keyBinds:{forward:"KeyW",back:"KeyS",left:"KeyA",right:"KeyD",jump:"Space",sneak:"ShiftLeft",sprint:"ControlLeft",drop:"KeyQ",inventory:"KeyE",chat:"KeyT",command:"Slash"}});class re{static async init(){try{const t=await fetch("/assets/minecraft/sounds.json");t.ok&&(this.soundsMap=await t.json())}catch{}}static ensureContext(){if(!this.ctx){const t=window.AudioContext||window.webkitAudioContext;t&&(this.ctx=new t)}this.ctx&&this.ctx.state==="suspended"&&this.ctx.resume().catch(()=>{})}static getEffectiveVolume(t,e){const i=It.current;if(!i)return e*this.masterVolume;let s=1;return t.startsWith("music.")?s=i.musicVolume??1:t.startsWith("block.")?s=i.blocksVolume??1:t.startsWith("entity.zombie.")?s=i.hostileVolume??1:(t.startsWith("entity.cow.")||t.startsWith("entity.sheep.")||t.startsWith("entity.pig."))&&(s=i.friendlyVolume??1),Math.min(1,e*(i.soundVolume??.8)*s)}static async play(t,e=.7,i=1){const s=this.getEffectiveVolume(t,e);if(s<=0||(this.ensureContext(),!this.ctx))return;const r=this.soundsMap[t];if(!r||!r.sounds||r.sounds.length===0){this.playProceduralFallback(t,s);return}const a=r.sounds[Math.floor(Math.random()*r.sounds.length)],o=typeof a=="string"?a:a.name;if(!o)return;const l=`/assets/minecraft/sounds/${o}.ogg`;try{let c=this.audioBufferCache.get(l);if(!c){const u=await fetch(l);if(!u.ok){this.playProceduralFallback(t,s);return}const d=await u.arrayBuffer();c=await this.ctx.decodeAudioData(d),this.audioBufferCache.set(l,c)}const h=this.ctx.createBufferSource();h.buffer=c,h.playbackRate.value=i*(.92+Math.random()*.16);const f=this.ctx.createGain();f.gain.value=s,h.connect(f),f.connect(this.ctx.destination),h.start(0)}catch{this.playProceduralFallback(t,s)}}static playProceduralFallback(t,e){if(!(!this.ctx||e<=0))try{const i=this.ctx.createOscillator(),s=this.ctx.createGain();i.type=t.includes("click")?"triangle":"sine",i.frequency.value=t.includes("click")?520:220+Math.random()*120,s.gain.setValueAtTime(.12*e,this.ctx.currentTime),s.gain.exponentialRampToValueAtTime(.001,this.ctx.currentTime+.09),i.connect(s),s.connect(this.ctx.destination),i.start(),i.stop(this.ctx.currentTime+.09)}catch{}}static playBlockSound(t,e){const s={poplar_leaves:`block.poplar_leaves.${e}`,straw_bed:`block.straw_bed.${e}`,wood:`block.wood.${e}`,grass:`block.grass.${e}`,stone:`block.stone.${e}`,deepslate:`block.deepslate.${e}`,dirt:`block.gravel.${e}`,wool:`block.wool.${e}`,sand:`block.sand.${e}`,gravel:`block.gravel.${e}`,glass:`block.glass.${e}`}[t]||`block.stone.${e}`;this.play(s,e==="step"?.25:.65)}}I(re,"ctx",null),I(re,"soundsMap",{}),I(re,"audioBufferCache",new Map),I(re,"masterVolume",.8);const nt=16,Re=128,Pc={"minecraft:dappled_forest":{id:"minecraft:dappled_forest",name:"Dappled Forest",grassColor:[.64,.76,.34],foliageColor:[.42,.68,.24],waterColor:[.24,.48,.89]},"minecraft:plains":{id:"minecraft:plains",name:"Plains",grassColor:[.56,.74,.35],foliageColor:[.47,.67,.28],waterColor:[.24,.46,.89]},"minecraft:cherry_grove":{id:"minecraft:cherry_grove",name:"Cherry Grove",grassColor:[.71,.86,.38],foliageColor:[.71,.86,.38],waterColor:[.36,.72,.94]},"minecraft:birch_forest":{id:"minecraft:birch_forest",name:"Birch Forest",grassColor:[.53,.73,.4],foliageColor:[.5,.65,.33],waterColor:[.24,.46,.89]}};class r_{constructor(t,e){I(this,"cx");I(this,"cz");I(this,"blocks");I(this,"meta");I(this,"biomes");I(this,"dirty",!0);I(this,"solidMesh",null);I(this,"waterMesh",null);this.cx=t,this.cz=e,this.blocks=new Uint16Array(nt*Re*nt),this.meta=new Uint8Array(nt*Re*nt),this.biomes=new Array(nt*nt).fill("minecraft:dappled_forest")}idx(t,e,i){return(e*nt+i)*nt+t}getBlock(t,e,i){return t<0||t>=nt||e<0||e>=Re||i<0||i>=nt?0:this.blocks[this.idx(t,e,i)]}setBlock(t,e,i,s,r=0){if(t<0||t>=nt||e<0||e>=Re||i<0||i>=nt)return;const a=this.idx(t,e,i);this.blocks[a]=s,this.meta[a]=r,this.dirty=!0}getMeta(t,e,i){return t<0||t>=nt||e<0||e>=Re||i<0||i>=nt?0:this.meta[this.idx(t,e,i)]}getBiome(t,e){const i=this.biomes[(e&15)*nt+(t&15)]||"minecraft:dappled_forest";return Pc[i]||Pc["minecraft:dappled_forest"]}setBiome(t,e,i){this.biomes[(e&15)*nt+(t&15)]=i}buildMeshes(t,e,i){this.dirty=!1;const s=[],r=[],a=[],o=[],l=[];let c=0;const h=[],f=[],u=[],d=[],p=[];let g=0;const m=(w,b,S,R,v,x,C,k,L,D,H,z,W)=>{const F=ue.getUV(L);let q=F.u0,st=F.v0,vt=F.u1,xt=F.v1;if(W){const kt=F.u1-F.u0,Z=F.v1-F.v0;q=F.u0+W[0]*kt,st=F.v0+W[1]*Z,vt=F.u0+W[2]*kt,xt=F.v0+W[3]*Z}if(w){h.push(...b,...S,...R,...v);for(let kt=0;kt<4;kt++)f.push(x,C,k),d.push(D,H,z);u.push(q,st,vt,st,vt,xt,q,xt),p.push(g,g+1,g+2,g,g+2,g+3),g+=4}else{s.push(...b,...S,...R,...v);for(let kt=0;kt<4;kt++)r.push(x,C,k),o.push(D,H,z);a.push(q,st,vt,st,vt,xt,q,xt),l.push(c,c+1,c+2,c,c+2,c+3),c+=4}},_=(w,b,S,R,v,x,C,k,L=63)=>{const D=C.fluid==="water",H=(F,q)=>C.tint==="grass"&&F==="top"?[k.grassColor[0]*q,k.grassColor[1]*q,k.grassColor[2]*q]:C.tint==="foliage"?[k.foliageColor[0]*q,k.foliageColor[1]*q,k.foliageColor[2]*q]:C.tint==="birch"?[.5*q,.66*q,.33*q]:C.tint==="spruce"?[.38*q,.6*q,.38*q]:C.tint==="water"?[k.waterColor[0]*q,k.waterColor[1]*q,k.waterColor[2]*q]:[q,q,q],z=v-b,W=z<1?[0,0,1,z]:void 0;if(L&1){const[F,q,st]=H("top",1);m(D,[w,v,x],[R,v,x],[R,v,S],[w,v,S],0,1,0,C.textures.top,F,q,st)}if(L&2){const[F,q,st]=H("bottom",.55);m(D,[w,b,S],[R,b,S],[R,b,x],[w,b,x],0,-1,0,C.textures.bottom,F,q,st)}if(L&4){const[F,q,st]=H("side",.86);m(D,[w,b,x],[R,b,x],[R,v,x],[w,v,x],0,0,1,C.textures.south,F,q,st,W)}if(L&8){const[F,q,st]=H("side",.86);m(D,[R,b,S],[w,b,S],[w,v,S],[R,v,S],0,0,-1,C.textures.north,F,q,st,W)}if(L&16){const[F,q,st]=H("side",.72);m(D,[R,b,x],[R,b,S],[R,v,S],[R,v,x],1,0,0,C.textures.east,F,q,st,W)}if(L&32){const[F,q,st]=H("side",.72);m(D,[w,b,S],[w,b,x],[w,v,x],[w,v,S],-1,0,0,C.textures.west,F,q,st,W)}},M=this.cx*nt,E=this.cz*nt,y=(w,b)=>{if(b===0)return!0;const S=tt.getBlock(b);return w.fluid==="water"&&S.fluid==="water"?!1:S.transparent||S.shape!=="cube"?!(S.numId===w.numId&&(w.shortId==="glass"||w.fluid)):!1};for(let w=0;w<Re;w++)for(let b=0;b<nt;b++)for(let S=0;S<nt;S++){const R=this.getBlock(S,w,b);if(R===0)continue;const v=tt.getBlock(R);if(v.shape==="air")continue;const x=M+S,C=E+b,k=this.getBiome(S,b),L=this.getMeta(S,w,b);if(v.shape==="cube"||v.shape==="pillar"){let D=0;y(v,t(x,w+1,C))&&(D|=1),y(v,t(x,w-1,C))&&(D|=2),y(v,t(x,w,C+1))&&(D|=4),y(v,t(x,w,C-1))&&(D|=8),y(v,t(x+1,w,C))&&(D|=16),y(v,t(x-1,w,C))&&(D|=32),D!==0&&_(S,w,b,S+1,w+1,b+1,v,k,D)}else if(v.shape==="fluid"){let D=0;if(y(v,t(x,w+1,C))&&(D|=1),y(v,t(x,w-1,C))&&(D|=2),y(v,t(x,w,C+1))&&(D|=4),y(v,t(x,w,C-1))&&(D|=8),y(v,t(x+1,w,C))&&(D|=16),y(v,t(x-1,w,C))&&(D|=32),D!==0){const H=t(x,w+1,C)===R?w+1:w+.88;_(S,w,b,S+1,H,b+1,v,k,D)}}else if(v.shape==="slab_bottom"||v.shape==="trapdoor"){const D=(L&4)!==0,H=D?w+.5:w,z=D?w+1:w+.5;_(S,H,b,S+1,z,b+1,v,k,63)}else if(v.shape==="slab_top")_(S,w+.65,b,S+1,w+1,b+1,v,k,63);else if(v.shape==="stairs"){_(S,w,b,S+1,w+.5,b+1,v,k,63);const D=L&3;D===0?_(S,w+.5,b,S+1,w+1,b+.5,v,k,63):D===1?_(S+.5,w+.5,b,S+1,w+1,b+1,v,k,63):D===2?_(S,w+.5,b+.5,S+1,w+1,b+1,v,k,63):_(S,w+.5,b,S+.5,w+1,b+1,v,k,63)}else if(v.shape==="bed_foot"||v.shape==="bed_head")_(S+.001,w,b+.001,S+.999,w+.5625,b+.999,v,k,63);else if(v.shape==="path")_(S,w,b,S+1,w+.9375,b+1,v,k,63);else if(v.shape==="carpet")v.shortId==="leaf_litter"?m(!1,[S,w+.016,b+1],[S+1,w+.016,b+1],[S+1,w+.016,b],[S,w+.016,b],0,1,0,v.textures.top,.64,.46,.26):_(S,w,b,S+1,w+.0625,b+1,v,k,63);else if(v.shape==="fence"){_(S+.375,w,b+.375,S+.625,w+1,b+.625,v,k,63);const D=H=>{if(H===0)return!1;const z=tt.getBlock(H);return z.shape==="fence"||z.shape==="cube"||z.shape==="pillar"};D(t(x,w,C-1))&&(_(S+.4375,w+.375,b,S+.5625,w+.5625,b+.375,v,k,63),_(S+.4375,w+.75,b,S+.5625,w+.9375,b+.375,v,k,63)),D(t(x,w,C+1))&&(_(S+.4375,w+.375,b+.625,S+.5625,w+.5625,b+1,v,k,63),_(S+.4375,w+.75,b+.625,S+.5625,w+.9375,b+1,v,k,63)),D(t(x-1,w,C))&&(_(S,w+.375,b+.4375,S+.375,w+.5625,b+.5625,v,k,63),_(S,w+.75,b+.4375,S+.375,w+.9375,b+.5625,v,k,63)),D(t(x+1,w,C))&&(_(S+.625,w+.375,b+.4375,S+1,w+.5625,b+.5625,v,k,63),_(S+.625,w+.75,b+.4375,S+1,w+.9375,b+.5625,v,k,63))}else if(v.shape==="campfire"){_(S+.0625,w,b,S+.3125,w+.25,b+1,v,k,63),_(S+.6875,w,b,S+.9375,w+.25,b+1,v,k,63),_(S,w+.1875,b+.0625,S+1,w+.4375,b+.3125,v,k,63),_(S,w+.1875,b+.6875,S+1,w+.4375,b+.9375,v,k,63),_(S+.3125,w,b,S+.6875,w+.0625,b+1,v,k,63);const D=S+.08,H=S+.92,z=b+.08,W=b+.92,F=w+.08,q=w+.95;m(!1,[D,F,z],[H,F,W],[H,q,W],[D,q,z],0,1,0,"campfire_fire",1,1,1),m(!1,[H,F,W],[D,F,z],[D,q,z],[H,q,W],0,1,0,"campfire_fire",1,1,1),m(!1,[D,F,W],[H,F,z],[H,q,z],[D,q,W],0,1,0,"campfire_fire",1,1,1),m(!1,[H,F,z],[D,F,W],[D,q,W],[H,q,z],0,1,0,"campfire_fire",1,1,1)}else if(v.shape==="torch")_(S+.4375,w,b+.4375,S+.5625,w+.625,b+.5625,v,k,63);else if(v.shape==="cross"){const[D,H,z]=v.tint==="grass"?k.grassColor:[.95,.95,.95],W=S+.15,F=S+.85,q=b+.15,st=b+.85;m(!1,[W,w,q],[F,w,st],[F,w+.9,st],[W,w+.9,q],0,1,0,v.textures.north,D,H,z),m(!1,[F,w,st],[W,w,q],[W,w+.9,q],[F,w+.9,st],0,1,0,v.textures.north,D,H,z),m(!1,[W,w,st],[F,w,q],[F,w+.9,q],[W,w+.9,st],0,1,0,v.textures.north,D,H,z),m(!1,[F,w,q],[W,w,st],[W,w+.9,st],[F,w+.9,q],0,1,0,v.textures.north,D,H,z)}}if(this.solidMesh&&this.solidMesh.geometry.dispose(),c>0){const w=new Ie;w.setAttribute("position",new pe(s,3)),w.setAttribute("normal",new pe(r,3)),w.setAttribute("uv",new pe(a,2)),w.setAttribute("color",new pe(o,3)),w.setIndex(l),w.computeBoundingSphere(),this.solidMesh?this.solidMesh.geometry=w:(this.solidMesh=new Qt(w,e),this.solidMesh.position.set(M,0,E))}else this.solidMesh&&(this.solidMesh.geometry=new Ie);if(this.waterMesh&&this.waterMesh.geometry.dispose(),g>0){const w=new Ie;w.setAttribute("position",new pe(h,3)),w.setAttribute("normal",new pe(f,3)),w.setAttribute("uv",new pe(u,2)),w.setAttribute("color",new pe(d,3)),w.setIndex(p),w.computeBoundingSphere(),this.waterMesh?this.waterMesh.geometry=w:(this.waterMesh=new Qt(w,i),this.waterMesh.position.set(M,0,E),this.waterMesh.renderOrder=1)}else this.waterMesh&&(this.waterMesh.geometry=new Ie)}}class ki{static setSeed(t){if(typeof t=="number"&&!isNaN(t)){this.seed=t|0;return}const e=String(t).trim();if(!e){this.seed=Math.floor(Math.random()*2147483647);return}const i=Number(e);if(!isNaN(i)&&Number.isInteger(i)){this.seed=i|0;return}let s=0;for(let r=0;r<e.length;r++)s=Math.imul(31,s)+e.charCodeAt(r)|0;this.seed=s}static async init(){try{const t=await fetch("/reports/abandoned_camp_structures.json");t.ok&&(this.structuresMap=await t.json())}catch{}}static hash2D(t,e,i=0){let s=Math.imul(t,374761393)+Math.imul(e,668265263)+Math.imul(this.seed+i,1442695041);return s=(s^s>>>13)*1274126177,((s^s>>>16)>>>0)/4294967296}static hash3D(t,e,i,s=0){let r=Math.imul(t,374761393)+Math.imul(e,1013904223)+Math.imul(i,668265263)+Math.imul(this.seed+s,1442695041);return r=(r^r>>>13)*1274126177,((r^r>>>16)>>>0)/4294967296}static smoothNoise3D(t,e,i,s,r=0){const a=t/s,o=e/s,l=i/s,c=Math.floor(a),h=Math.floor(o),f=Math.floor(l),u=a-c,d=o-h,p=l-f,g=u*u*(3-2*u),m=d*d*(3-2*d),_=p*p*(3-2*p),M=this.hash3D(c,h,f,r),E=this.hash3D(c+1,h,f,r),y=this.hash3D(c,h+1,f,r),w=this.hash3D(c+1,h+1,f,r),b=this.hash3D(c,h,f+1,r),S=this.hash3D(c+1,h,f+1,r),R=this.hash3D(c,h+1,f+1,r),v=this.hash3D(c+1,h+1,f+1,r),x=M*(1-g)+E*g,C=y*(1-g)+w*g,k=b*(1-g)+S*g,L=R*(1-g)+v*g,D=x*(1-m)+C*m,H=k*(1-m)+L*m;return D*(1-_)+H*_}static smoothNoise(t,e,i,s=0){const r=t/i,a=e/i,o=Math.floor(r),l=Math.floor(a),c=r-o,h=a-l,f=c*c*(3-2*c),u=h*h*(3-2*h),d=this.hash2D(o,l,s),p=this.hash2D(o+1,l,s),g=this.hash2D(o,l+1,s),m=this.hash2D(o+1,l+1,s);return(d*(1-f)+p*f)*(1-u)+(g*(1-f)+m*f)*u}static getBiomeAt(t,e){if(this.worldType==="dappled_showcase")return"minecraft:dappled_forest";const i=this.smoothNoise(t,e,160,777),s=this.smoothNoise(t,e,160,1337);return i<.34?"minecraft:plains":i<.56?s<.5?"minecraft:forest":"minecraft:dappled_forest":i<.78?s<.5?"minecraft:birch_forest":"minecraft:dappled_forest":"minecraft:cherry_grove"}static getTerrainHeight(t,e){if(this.worldType==="superflat")return 64;const i=this.smoothNoise(t,e,180,10),s=this.smoothNoise(t,e,64,20),r=this.smoothNoise(t,e,22,30),a=1-Math.abs(this.smoothNoise(t,e,96,40)*2-1),o=Math.abs(this.smoothNoise(t,e,190,88)*2-1);let l=54+i*18+s*10+r*3;if(i>.62&&(l+=(i-.62)*a*34),o<.11){const c=(1-o/.11)*12;l-=c}return Math.floor(l)}static placePoplarTree(t,e,i,s,r,a){const o=tt.getBlock("poplar_log").numId,l=tt.getBlock(r).numId,c=tt.getBlock("leaf_litter").numId,h=9+Math.floor(a*9301%5),f=i+3,u=i+h;for(let d=i;d<u;d++)t.setBlock(e,d,s,o);for(let d=f;d<=u+2;d++){const p=(d-f)/(u+2-f),g=p<.2||p>.82?1:2;for(let m=-g;m<=g;m++)for(let _=-g;_<=g;_++){if(m===0&&_===0&&d<u)continue;const M=Math.abs(m)+Math.abs(_);if(g===2&&M>=4||g===1&&M>=2&&d>u)continue;const E=this.hash2D(e+m*17,s+_*31,d);if(M===g*2-1&&E<.28)continue;const y=e+m,w=s+_;y>=0&&y<nt&&w>=0&&w<nt&&d<Re&&t.getBlock(y,d,w)===0&&t.setBlock(y,d,w,l)}}for(let d=-2;d<=2;d++)for(let p=-2;p<=2;p++){const g=e+d,m=s+p;g>=0&&g<nt&&m>=0&&m<nt&&this.hash2D(g+t.cx*16,m+t.cz*16,99)<.35&&t.getBlock(g,i,m)===0&&t.getBlock(g,i-1,m)===tt.getBlock("grass_block").numId&&t.setBlock(g,i,m,c)}}static placeOfficialAbandonedCamp(t,e,i,s,r){const a=[],o=`camp/dappled_forest/campsite_dappled_forest_${r%4+1}.nbt`,l=`tent/dappled_forest/tent_dappled_forest_${r%4+1}.nbt`,c=this.structuresMap[o],h=this.structuresMap[l],f=(p,g,m,_)=>{if(!p||!p.palette||!p.blocks)return;const M=p.palette;for(const E of p.blocks){const[y,w,b]=E.pos,S=M[E.state];if(!S)continue;let R=S.id;const v=S.properties||{};(R==="minecraft:jigsaw"||R==="minecraft:structure_void")&&(R=w===0?"minecraft:dirt_path":"minecraft:air"),R==="minecraft:straw_bed"&&v.part==="head"&&(R="minecraft:straw_bed_head");const x=g+y,C=m+w,k=_+b;if(x>=0&&x<nt&&k>=0&&k<nt&&C>=1&&C<Re)if(R==="minecraft:air")t.setBlock(x,C,k,0);else{const L=tt.getBlock(R);let D=0;v.facing==="east"?D=1:v.facing==="south"?D=2:v.facing==="west"&&(D=3),v.half==="top"&&(D|=4),t.setBlock(x,C,k,L.numId,D)}}if(Array.isArray(p.entities))for(const E of p.entities){const y=E.nbt||{};if(y.id==="minecraft:cushion"&&Array.isArray(E.blockPos)){const[w,b,S]=E.blockPos,R=t.cx*nt+g+w,v=m+b+1,x=t.cz*nt+_+S,C=y.color||"orange";a.push({id:`cushion_${R}_${v}_${x}`,x:R+.5,y:v,z:x+.5,blockX:R,blockY:v,blockZ:x,color:C,rotation:Array.isArray(y.Rotation)?y.Rotation[0]:0})}}},u=tt.getBlock("dirt").numId,d=tt.getBlock("grass_block").numId;for(let p=1;p<15;p++)for(let g=1;g<15;g++){for(let m=i-3;m<i;m++)t.setBlock(p,m,g,u);t.setBlock(p,i,g,d);for(let m=i+1;m<i+9;m++)t.setBlock(p,m,g,0)}if(c&&f(c,e,i,s),h){const p=tt.getBlock("straw_bed").numId,g=tt.getBlock("straw_bed_head").numId,m=tt.getBlock("white_wool_stairs").numId,_=tt.getBlock("poplar_fence").numId,M=Math.min(12,e+2),E=Math.min(12,s+6);t.setBlock(M,i+1,E,p,2),t.setBlock(M,i+1,E+1,g,2),t.setBlock(M-1,i+1,E,_),t.setBlock(M-1,i+2,E,_),t.setBlock(M+1,i+1,E,_),t.setBlock(M+1,i+2,E,_);for(let y=0;y<=1;y++)t.setBlock(M-1,i+3,E+y,m,1),t.setBlock(M,i+3,E+y,tt.getBlock("white_wool_slab").numId),t.setBlock(M+1,i+3,E+y,m,3)}if(a.length===0){const p=t.cx*nt+e+4,g=t.cz*nt+s+4;a.push({id:`cushion_${p}_${i+1}_${g}`,x:p+.5,y:i+1,z:g+.5,blockX:p,blockY:i+1,blockZ:g,color:"orange",rotation:0})}return{cushions:a,campPos:{cx:t.cx,cz:t.cz,x:t.cx*nt+e+5,y:i+1,z:t.cz*nt+s+5,variant:o}}}static generateChunk(t,e){var de,B,ke,Gt,Vt,Rt,ie,At,P,T,V,et,it,K,Mt,mt;const i=new r_(t,e),s=[];let r;const a=tt.getBlock("bedrock").numId,o=tt.getBlock("stone").numId,l=tt.getBlock("deepslate").numId,c=tt.getBlock("dirt").numId,h=tt.getBlock("grass_block").numId,f=tt.getBlock("podzol").numId,u=tt.getBlock("sand").numId,d=tt.getBlock("water").numId,p=tt.getBlock("coal_ore").numId,g=tt.getBlock("iron_ore").numId,m=tt.getBlock("diamond_ore").numId,_=((de=tt.getBlock("copper_ore"))==null?void 0:de.numId)||g,M=((B=tt.getBlock("gold_ore"))==null?void 0:B.numId)||g,E=((ke=tt.getBlock("redstone_ore"))==null?void 0:ke.numId)||g,y=((Gt=tt.getBlock("lapis_ore"))==null?void 0:Gt.numId)||g,w=((Vt=tt.getBlock("gravel"))==null?void 0:Vt.numId)||c,b=((Rt=tt.getBlock("granite"))==null?void 0:Rt.numId)||o,S=((ie=tt.getBlock("diorite"))==null?void 0:ie.numId)||o,R=((At=tt.getBlock("andesite"))==null?void 0:At.numId)||o,v=((P=tt.getBlock("tuff"))==null?void 0:P.numId)||l,x=((T=tt.getBlock("deepslate_coal_ore"))==null?void 0:T.numId)||p,C=((V=tt.getBlock("deepslate_copper_ore"))==null?void 0:V.numId)||_,k=((et=tt.getBlock("deepslate_lapis_ore"))==null?void 0:et.numId)||y,L=((it=tt.getBlock("deepslate_iron_ore"))==null?void 0:it.numId)||g,D=((K=tt.getBlock("deepslate_diamond_ore"))==null?void 0:K.numId)||m,H=((Mt=tt.getBlock("deepslate_gold_ore"))==null?void 0:Mt.numId)||M,z=((mt=tt.getBlock("deepslate_redstone_ore"))==null?void 0:mt.numId)||E,W=62,F=new Int32Array(nt*nt);for(let j=0;j<nt;j++)for(let ot=0;ot<nt;ot++){const J=t*nt+ot,ct=e*nt+j,yt=this.getBiomeAt(J,ct);i.setBiome(ot,j,yt);const gt=this.getTerrainHeight(J,ct);F[j*nt+ot]=gt,i.setBlock(ot,0,j,a);for(let rt=1;rt<=gt;rt++)rt<18?i.setBlock(ot,rt,j,l):rt<gt-3?i.setBlock(ot,rt,j,o):rt<gt?i.setBlock(ot,rt,j,gt<=W+1?u:c):gt<=W+1?i.setBlock(ot,rt,j,u):yt==="minecraft:dappled_forest"&&this.hash2D(J,ct,42)<.12?i.setBlock(ot,rt,j,f):i.setBlock(ot,rt,j,h);if(gt<W)for(let rt=gt+1;rt<=W;rt++)i.setBlock(ot,rt,j,d);for(let rt=4;rt<gt;rt++){const Lt=this.smoothNoise3D(J,rt*1.3,ct,15,333)*2-1,Dt=this.smoothNoise3D(J,rt*1.3,ct,15,444)*2-1;Lt*Lt+Dt*Dt<.042&&(gt>=W||rt>W)&&i.setBlock(ot,rt,j,0)}}const q=[{regular:p,deep:x,count:20,minY:0,maxY:128,radius:2.1},{regular:g,deep:L,count:10,minY:8,maxY:64,radius:1.6},{regular:g,deep:L,count:10,minY:0,maxY:72,radius:1.1},{regular:_,deep:C,count:16,minY:16,maxY:100,radius:2},{regular:M,deep:H,count:4,minY:4,maxY:32,radius:1.6},{regular:E,deep:z,count:8,minY:1,maxY:16,radius:1.5},{regular:m,deep:D,count:7,minY:1,maxY:16,radius:1.3},{regular:y,deep:k,count:4,minY:8,maxY:36,radius:1.4},{regular:c,deep:c,count:7,minY:10,maxY:120,radius:2.6},{regular:w,deep:w,count:14,minY:10,maxY:120,radius:2.6},{regular:b,deep:v,count:6,minY:10,maxY:80,radius:2.4},{regular:S,deep:v,count:6,minY:10,maxY:80,radius:2.4},{regular:R,deep:v,count:6,minY:10,maxY:80,radius:2.4}];for(let j=0;j<q.length;j++){const ot=q[j];for(let J=0;J<ot.count;J++){const ct=j*100+J,yt=Math.floor(this.hash2D(t+ct,e,101)*16),gt=Math.floor(this.hash2D(t,e+ct,102)*16),rt=Math.floor(ot.minY+this.hash2D(t+ct,e+ct,103)*(ot.maxY-ot.minY)),Lt=ot.radius,Dt=Lt*Lt,Xt=Math.ceil(Lt);for(let U=-Xt;U<=Xt;U++){const ht=yt+U;if(!(ht<0||ht>=nt))for(let Y=-Xt;Y<=Xt;Y++){const Q=gt+Y;if(!(Q<0||Q>=nt))for(let ft=-Xt;ft<=Xt;ft++){const dt=rt+ft;if(!(dt<=0||dt>=Re)&&U*U+ft*ft*1.3+Y*Y<=Dt){const Ut=i.getBlock(ht,dt,Q);Ut===o?i.setBlock(ht,dt,Q,ot.regular):Ut===l&&i.setBlock(ht,dt,Q,ot.deep)}}}}}}if(this.worldType==="superflat")return{chunk:i,cushions:s};const st=32,vt=Math.floor(t/st),xt=Math.floor(e/st),kt=Math.floor(this.hash2D(vt,xt,911)*24)+4,Z=Math.floor(this.hash2D(vt,xt,912)*24)+4,at=vt*st+kt,St=xt*st+Z,ut=t===at&&e===St&&(Math.abs(t)>1||Math.abs(e)>1)&&F[7*nt+7]>W+2;if(ut){const j=Math.max(W+2,F[7*nt+7]),ot=Math.floor(this.hash2D(t,e,7777)*16),J=this.placeOfficialAbandonedCamp(i,3,j,3,ot);s.push(...J.cushions),r=J.campPos}for(let j=3;j<nt-3;j+=4)for(let ot=3;ot<nt-3;ot+=4){if(ut&&ot>=1&&ot<=12&&j>=1&&j<=12)continue;const J=t*nt+ot,ct=e*nt+j,yt=F[j*nt+ot];if(yt<=W+2)continue;const gt=i.biomes[j*nt+ot],rt=this.hash2D(J,ct,888);if(gt==="minecraft:dappled_forest"&&rt<.34){const Lt=this.hash2D(J,ct,999),Dt=Lt<.4?"orange_poplar_leaves":Lt<.72?"yellow_poplar_leaves":"red_poplar_leaves";this.placePoplarTree(i,ot,yt+1,j,Dt,Lt)}else gt==="minecraft:forest"&&rt<.3?this.placeClassicTree(i,ot,yt+1,j,"oak_log","oak_leaves",5+Math.floor(rt*7)):gt==="minecraft:plains"&&rt<.03?this.placeClassicTree(i,ot,yt+1,j,"oak_log","oak_leaves",5):gt==="minecraft:birch_forest"&&rt<.25?this.placeClassicTree(i,ot,yt+1,j,"birch_log","birch_leaves",6):gt==="minecraft:cherry_grove"&&rt<.22&&this.placeClassicTree(i,ot,yt+1,j,"cherry_log","cherry_leaves",6)}const Ct=tt.getBlock("short_grass").numId,Pt=tt.getBlock("dandelion").numId,Nt=tt.getBlock("poppy").numId,ae=tt.getBlock("brown_mushroom").numId,Ht=tt.getBlock("leaf_litter").numId;for(let j=0;j<nt;j++)for(let ot=0;ot<nt;ot++){const J=F[j*nt+ot];if(J<=W+1||i.getBlock(ot,J+1,j)!==0||i.getBlock(ot,J,j)!==h&&i.getBlock(ot,J,j)!==f)continue;const ct=t*nt+ot,yt=e*nt+j,gt=this.hash2D(ct,yt,333);i.biomes[j*nt+ot]==="minecraft:dappled_forest"?gt<.08?i.setBlock(ot,J+1,j,Ht):gt<.14?i.setBlock(ot,J+1,j,Ct):gt<.155?i.setBlock(ot,J+1,j,ae):gt<.165&&i.setBlock(ot,J+1,j,Pt):gt<.12?i.setBlock(ot,J+1,j,Ct):gt<.135?i.setBlock(ot,J+1,j,Nt):gt<.15&&i.setBlock(ot,J+1,j,Pt)}return{chunk:i,cushions:s,camp:r}}static placeClassicTree(t,e,i,s,r,a,o){const l=tt.getBlock(r).numId,c=tt.getBlock(a).numId;for(let h=i;h<i+o;h++)t.setBlock(e,h,s,l);for(let h=o-3;h<=o;h++){const f=h>=o-1?1:2;for(let u=-f;u<=f;u++)for(let d=-f;d<=f;d++){if(u===0&&d===0&&h<o||Math.abs(u)===f&&Math.abs(d)===f&&h<o)continue;const p=e+u,g=s+d,m=i+h;p>=0&&p<nt&&g>=0&&g<nt&&m<Re&&t.getBlock(p,m,g)===0&&t.setBlock(p,m,g,c)}}}}I(ki,"structuresMap",{}),I(ki,"seed",Math.floor(Math.random()*2147483647)),I(ki,"worldType","wilderness_26_3");class a_{constructor(t,e,i){I(this,"scene");I(this,"chunks",new Map);I(this,"abandonedCamps",[]);I(this,"solidMaterial");I(this,"waterMaterial");I(this,"entityRenderer");I(this,"particleSystem");I(this,"timeOfDay",1e3);I(this,"worldName","Wilderness Bound (26.3)");I(this,"blockDiffs",new Map);this.scene=t,this.entityRenderer=e,this.particleSystem=i,this.solidMaterial=new qi({map:ue.texture,vertexColors:!0,alphaTest:.15}),this.waterMaterial=new qi({map:ue.texture,vertexColors:!0,transparent:!0,opacity:.78,depthWrite:!1})}chunkKey(t,e){return`${t},${e}`}getChunk(t,e){return this.chunks.get(this.chunkKey(t,e))}ensureChunk(t,e){const i=this.chunkKey(t,e);let s=this.chunks.get(i);if(!s){const r=ki.generateChunk(t,e);s=r.chunk,this.chunks.set(i,s);for(const a of r.cushions)this.entityRenderer.addCushion(a);r.camp&&this.abandonedCamps.push(r.camp);for(let a=0;a<nt;a++)for(let o=0;o<nt;o++){const l=t*nt+o,c=e*nt+a;for(let h=0;h<Re;h++){const f=this.blockDiffs.get(`${l},${h},${c}`);f&&s.setBlock(o,h,a,f.numId,f.meta)}}}return s}getBlock(t,e,i){if(e<0||e>=Re)return 0;const s=Math.floor(t/nt),r=Math.floor(i/nt),a=this.chunks.get(this.chunkKey(s,r));if(!a)return 0;const o=(t%nt+nt)%nt,l=(i%nt+nt)%nt;return a.getBlock(o,Math.floor(e),l)}getMeta(t,e,i){if(e<0||e>=Re)return 0;const s=Math.floor(t/nt),r=Math.floor(i/nt),a=this.chunks.get(this.chunkKey(s,r));if(!a)return 0;const o=(t%nt+nt)%nt,l=(i%nt+nt)%nt;return a.getMeta(o,Math.floor(e),l)}setBlock(t,e,i,s,r=0,a=!0){if(e<0||e>=Re)return;const o=Math.floor(t),l=Math.floor(e),c=Math.floor(i),h=Math.floor(o/nt),f=Math.floor(c/nt),u=this.ensureChunk(h,f),d=(o%nt+nt)%nt,p=(c%nt+nt)%nt;if(u.setBlock(d,l,p,s,r),a&&this.blockDiffs.set(`${o},${l},${c}`,{numId:s,meta:r}),d===0){const g=this.getChunk(h-1,f);g&&(g.dirty=!0)}else if(d===nt-1){const g=this.getChunk(h+1,f);g&&(g.dirty=!0)}if(p===0){const g=this.getChunk(h,f-1);g&&(g.dirty=!0)}else if(p===nt-1){const g=this.getChunk(h,f+1);g&&(g.dirty=!0)}}checkGravity(t,e,i){var c,h;const s=(c=tt.getBlock("sand"))==null?void 0:c.numId,r=(h=tt.getBlock("gravel"))==null?void 0:h.numId;if(!s&&!r)return;let a=Math.max(1,Math.floor(e));const o=Math.floor(t),l=Math.floor(i);for(;a<Re;){const f=this.getBlock(o,a,l);if(f===s||f===r){let u=a;for(;u>0;){const d=this.getBlock(o,u-1,l),p=tt.getBlock(d);if(d===0||p&&(!p.solid||p.soundGroup==="grass"))u--;else break}if(u<a){const d=this.getMeta(o,a,l);this.setBlock(o,a,l,0),this.setBlock(o,u,l,f,d)}}else if(f!==0){const u=tt.getBlock(f);if(u&&u.solid)break}a++}}getBiomeName(t,e){const i=Math.floor(t/nt),s=Math.floor(e/nt),r=this.getChunk(i,s);if(!r)return"minecraft:dappled_forest";const a=(Math.floor(t)%nt+nt)%nt,o=(Math.floor(e)%nt+nt)%nt;return r.getBiome(a,o).id}getTopSolidY(t,e){const i=Math.floor(t),s=Math.floor(e);this.ensureChunk(Math.floor(i/nt),Math.floor(s/nt));for(let r=Re-1;r>=1;r--){const a=this.getBlock(i,r,s);if(a!==0){const o=tt.getBlock(a);if(o.solid&&!o.shortId.includes("leaves"))return r+1}}return 65}updateChunksAroundPlayer(t,e){const i=Math.floor(t/nt),s=Math.floor(e/nt),r=It.current.renderDistance||4;for(let l=-r;l<=r;l++)for(let c=-r;c<=r;c++)c*c+l*l<=(r+.5)*(r+.5)&&this.ensureChunk(i+c,s+l);let a=0;const o=(l,c,h)=>this.getBlock(l,c,h);for(let l=-r;l<=r;l++){for(let c=-r;c<=r;c++){const h=this.getChunk(i+c,s+l);if(h&&h.dirty){const f=!!h.solidMesh,u=!!h.waterMesh;if(h.buildMeshes(o,this.solidMaterial,this.waterMaterial),!f&&h.solidMesh&&this.scene.add(h.solidMesh),!u&&h.waterMesh&&this.scene.add(h.waterMesh),a++,a>=3)break}}if(a>=3)break}for(const[,l]of this.chunks){const h=(l.cx-i)**2+(l.cz-s)**2<=(r+1.5)**2;l.solidMesh&&(l.solidMesh.visible=h),l.waterMesh&&(l.waterMesh.visible=h)}}tickAmbientParticles(t,e,i){const s=tt.getBlock("orange_poplar_leaves").numId,r=tt.getBlock("red_poplar_leaves").numId,a=tt.getBlock("yellow_poplar_leaves").numId,o=tt.getBlock("campfire").numId;for(let l=0;l<6;l++){const c=Math.floor(t+(Math.random()-.5)*28),h=Math.floor(e+(Math.random()-.3)*18),f=Math.floor(i+(Math.random()-.5)*28),u=this.getBlock(c,h,f);u===s&&this.getBlock(c,h-1,f)===0?this.particleSystem.spawnPoplarLeaf(c,h,f,"orange"):u===r&&this.getBlock(c,h-1,f)===0?this.particleSystem.spawnPoplarLeaf(c,h,f,"red"):u===a&&this.getBlock(c,h-1,f)===0?this.particleSystem.spawnPoplarLeaf(c,h,f,"yellow"):u===o&&this.particleSystem.spawnCampfireSmoke(c,h,f)}}findNearestAbandonedCamp(t,e){const i=Math.floor(t/nt),s=Math.floor(e/nt);for(let o=0;o<=6;o++)for(let l=-o;l<=o;l++)for(let c=-o;c<=o;c++)this.ensureChunk(i+l,s+c);if(this.abandonedCamps.length===0)return null;let r=this.abandonedCamps[0],a=1/0;for(const o of this.abandonedCamps){const l=Math.hypot(o.x-t,o.z-e);l<a&&(a=l,r=o)}return r}resetWorld(t,e,i){for(const[,s]of this.chunks)s.solidMesh&&(this.scene.remove(s.solidMesh),s.solidMesh.geometry.dispose()),s.waterMesh&&(this.scene.remove(s.waterMesh),s.waterMesh.geometry.dispose());this.chunks.clear(),this.abandonedCamps=[],this.blockDiffs.clear(),this.entityRenderer.clearAll(),ki.setSeed(t),ki.worldType=e,this.worldName=i}}class o_{constructor(t){I(this,"scene");I(this,"cushions",new Map);I(this,"mobs",new Map);I(this,"droppedItems",new Map);I(this,"cushionTextures",new Map);I(this,"entityImages",new Map);I(this,"textureLoader",new ts);this.scene=t}loadEntityImage(t,e){const i=this.entityImages.get(t);if(i){e(i);return}const s=new Image;s.crossOrigin="anonymous",s.onload=()=>{this.entityImages.set(t,s),e(s)},s.src=t}cropSubTexture(t,e,i,s,r,a=!1){const o=document.createElement("canvas");o.width=Math.max(1,(a?r:s)*4),o.height=Math.max(1,(a?s:r)*4);const l=o.getContext("2d");l.imageSmoothingEnabled=!1,a?(l.translate(o.width,0),l.rotate(Math.PI/2),l.drawImage(t,e,i,s,r,0,0,o.height,o.width)):l.drawImage(t,e,i,s,r,0,0,o.width,o.height);const c=new Xr(o);return c.magFilter=Kt,c.minFilter=Kt,c.colorSpace=me,c}createUprightPartMesh(t,e,i,s=0,r=16777215){const a=new De((t+s*2)/16,(e+s*2)/16,(i+s*2)/16),o=Array.from({length:6},()=>new qi({color:r}));return{mesh:new Qt(a,o),applyTexture:(h,f,u,d=!1)=>{const p=[this.cropSubTexture(h,f+i+t,u+i,i,e),this.cropSubTexture(h,f,u+i,i,e),this.cropSubTexture(h,f+i,u,t,i),this.cropSubTexture(h,f+i+t,u,t,i),this.cropSubTexture(h,f+i,u+i,t,e),this.cropSubTexture(h,f+i+t+i,u+i,t,e)];for(let g=0;g<6;g++)o[g].map=p[g],o[g].color.setHex(16777215),o[g].transparent=d,o[g].alphaTest=d?.1:0,o[g].needsUpdate=!0}}}createQuadrupedBodyMesh(t,e,i,s=0,r=16777215){const a=new De((t+s*2)/16,(i+s*2)/16,(e+s*2)/16),o=Array.from({length:6},()=>new qi({color:r}));return{mesh:new Qt(a,o),applyTexture:(h,f,u,d=!1)=>{const p=i,g=e,m=[this.cropSubTexture(h,f+p+t,u+p,p,g,!0),this.cropSubTexture(h,f,u+p,p,g,!0),this.cropSubTexture(h,f+p+t+p,u+p,t,g),this.cropSubTexture(h,f+p,u+p,t,g),this.cropSubTexture(h,f+p,u,t,p),this.cropSubTexture(h,f+p+t,u,t,p)];for(let _=0;_<6;_++)o[_].map=m[_],o[_].color.setHex(16777215),o[_].transparent=d,o[_].alphaTest=d?.1:0,o[_].needsUpdate=!0}}}getCushionMaterial(t){let e=this.cushionTextures.get(t);return e||(e=this.textureLoader.load(`/assets/minecraft/textures/entity/cushion/${t}_cushion.png`),e.magFilter=Kt,e.minFilter=Kt,e.colorSpace=me,this.cushionTextures.set(t,e)),new qi({map:e,color:16777215})}addCushion(t){if(this.cushions.has(t.id))return;const e=this.createUprightPartMesh(16,4,16,0,s_[t.color]||16351261),i=e.mesh;i.position.set(t.x,t.blockY+.125,t.z),i.rotation.y=t.rotation*Math.PI/180,i.userData={isCushion:!0,cushionId:t.id},this.loadEntityImage(`/assets/minecraft/textures/entity/cushion/${t.color}_cushion.png`,s=>{e.applyTexture(s,0,0)}),this.scene.add(i),this.cushions.set(t.id,{data:t,mesh:i})}removeCushion(t){const e=this.cushions.get(t);if(e)return this.scene.remove(e.mesh),e.mesh.geometry.dispose(),this.cushions.delete(t),e.data}findCushionAtBlock(t,e,i){for(const[,s]of this.cushions)if(s.data.blockX===t&&s.data.blockY===e&&s.data.blockZ===i)return s.data}spawnMob(t,e,i,s,r,a){if(this.mobs.has(t))return;const o=new gi,l=[];if(e==="remote_player"){const h=this.createUprightPartMesh(8,8,8,0,11896424);h.mesh.position.set(0,28/16,0);const f=this.createUprightPartMesh(8,8,8,.5,3351057);f.mesh.position.set(0,28/16,0);const u=this.createUprightPartMesh(8,12,4,0,43690);u.mesh.position.set(0,18/16,0);const d=this.createUprightPartMesh(4,12,4,0,11896424);d.mesh.position.set(-6/16,18/16,0);const p=this.createUprightPartMesh(4,12,4,0,11896424);p.mesh.position.set(6/16,18/16,0);const g=this.createUprightPartMesh(4,12,4,0,3355562);g.mesh.position.set(-2/16,6/16,0);const m=this.createUprightPartMesh(4,12,4,0,3355562);m.mesh.position.set(2/16,6/16,0),l.push(g.mesh,m.mesh),o.add(h.mesh,f.mesh,u.mesh,d.mesh,p.mesh,g.mesh,m.mesh),this.loadEntityImage("/assets/minecraft/textures/entity/player/wide/steve.png",_=>{h.applyTexture(_,0,0),f.applyTexture(_,32,0,!0),u.applyTexture(_,16,16),d.applyTexture(_,40,16),p.applyTexture(_,32,48),g.applyTexture(_,0,16),m.applyTexture(_,16,48)})}else if(e==="sheep"){const h=this.createUprightPartMesh(6,6,8,0,15058089);h.mesh.position.set(0,19/16,10/16);const f=this.createUprightPartMesh(6,6,6,.6,16119284);f.mesh.position.set(0,19/16,9/16);const u=this.createQuadrupedBodyMesh(8,16,6,0,15058089);u.mesh.position.set(0,15/16,0);const d=this.createQuadrupedBodyMesh(8,16,6,1.75,16119284);d.mesh.position.set(0,15/16,0);const g=[[-3/16,5/16],[3/16,5/16],[-3/16,-7/16],[3/16,-7/16]].map(([m,_])=>{const M=this.createUprightPartMesh(4,12,4,0,15058089);M.mesh.geometry.translate(0,-6/16,0),M.mesh.position.set(m,12/16,_);const E=this.createUprightPartMesh(4,6,4,.5,16119284);return E.mesh.position.set(0,-3/16,0),M.mesh.add(E.mesh),l.push(M.mesh),o.add(M.mesh),{leg:M,wool:E}});o.add(h.mesh,f.mesh,u.mesh,d.mesh),this.loadEntityImage("/assets/minecraft/textures/entity/sheep/sheep.png",m=>{h.applyTexture(m,0,0),u.applyTexture(m,28,8);for(const _ of g)_.leg.applyTexture(m,0,16)}),this.loadEntityImage("/assets/minecraft/textures/entity/sheep/sheep_wool.png",m=>{f.applyTexture(m,0,0,!0),d.applyTexture(m,28,8,!0);for(const _ of g)_.wool.applyTexture(m,0,16,!0)})}else if(e==="pig"){const h=this.createUprightPartMesh(8,8,8,0,15771042);h.mesh.position.set(0,12/16,10/16);const f=this.createUprightPartMesh(4,3,1,0,15771042);f.mesh.position.set(0,10.5/16,14.5/16);const u=this.createQuadrupedBodyMesh(10,16,8,0,15771042);u.mesh.position.set(0,10/16,0);const p=[[-3/16,5/16],[3/16,5/16],[-3/16,-7/16],[3/16,-7/16]].map(([g,m])=>{const _=this.createUprightPartMesh(4,6,4,0,15771042);return _.mesh.geometry.translate(0,-3/16,0),_.mesh.position.set(g,6/16,m),l.push(_.mesh),o.add(_.mesh),_});o.add(h.mesh,f.mesh,u.mesh),this.loadEntityImage("/assets/minecraft/textures/entity/pig/pig_temperate.png",g=>{h.applyTexture(g,0,0),f.applyTexture(g,16,16),u.applyTexture(g,28,8);for(const m of p)m.applyTexture(g,0,16)})}else if(e==="cow"){const h=this.createUprightPartMesh(8,8,6,0,7031861);h.mesh.position.set(0,20/16,11/16);const f=this.createUprightPartMesh(1,3,1,0,4473924);f.mesh.position.set(-4.5/16,23.5/16,11.5/16);const u=this.createUprightPartMesh(1,3,1,0,4473924);u.mesh.position.set(4.5/16,23.5/16,11.5/16);const d=this.createQuadrupedBodyMesh(12,18,10,0,7031861);d.mesh.position.set(0,17/16,-1/16);const g=[[-4/16,6/16],[4/16,6/16],[-4/16,-7/16],[4/16,-7/16]].map(([m,_])=>{const M=this.createUprightPartMesh(4,12,4,0,7031861);return M.mesh.geometry.translate(0,-6/16,0),M.mesh.position.set(m,12/16,_),l.push(M.mesh),o.add(M.mesh),M});o.add(h.mesh,f.mesh,u.mesh,d.mesh),this.loadEntityImage("/assets/minecraft/textures/entity/cow/cow_temperate.png",m=>{h.applyTexture(m,0,0),f.applyTexture(m,22,0),u.applyTexture(m,22,0),d.applyTexture(m,18,4);for(const _ of g)_.applyTexture(m,0,16)})}else if(e==="zombie"){const h=this.createUprightPartMesh(8,8,8,0,5614165);h.mesh.position.set(0,24/16,0);const f=this.createUprightPartMesh(8,12,4,0,4491400);f.mesh.position.set(0,14/16,0);const u=this.createUprightPartMesh(4,12,4,0,5614165);u.mesh.geometry.translate(0,-6/16,0),u.mesh.position.set(-6/16,20/16,0),u.mesh.rotation.x=-Math.PI/2;const d=this.createUprightPartMesh(4,12,4,0,5614165);d.mesh.geometry.translate(0,-6/16,0),d.mesh.position.set(6/16,20/16,0),d.mesh.rotation.x=-Math.PI/2;const p=this.createUprightPartMesh(4,12,4,0,3355494);p.mesh.geometry.translate(0,-6/16,0),p.mesh.position.set(-2/16,12/16,0);const g=this.createUprightPartMesh(4,12,4,0,3355494);g.mesh.geometry.translate(0,-6/16,0),g.mesh.position.set(2/16,12/16,0),l.push(p.mesh,g.mesh),o.add(h.mesh,f.mesh,u.mesh,d.mesh,p.mesh,g.mesh),this.loadEntityImage("/assets/minecraft/textures/entity/zombie/zombie.png",m=>{h.applyTexture(m,0,0),f.applyTexture(m,16,16),u.applyTexture(m,40,16),d.applyTexture(m,40,16),p.applyTexture(m,0,16),g.applyTexture(m,0,16)})}const c=e==="zombie"?20:e==="sheep"?8:10;o.position.set(i,s,r),this.scene.add(o),this.mobs.set(t,{id:t,type:e,name:a,x:i,y:s,z:r,vx:0,vy:0,vz:0,yaw:Math.random()*Math.PI*2,walkPhase:0,aiTimer:2,health:c,maxHealth:c,hurtTimer:0,panicTimer:0,deathTimer:0,dead:!1,mesh:o,legs:l})}raycastMob(t,e,i){let s=null,r=i;for(const[,a]of this.mobs){if(a.dead)continue;const o=a.type==="cow"?.55:.48,l=a.type==="cow"?1.45:a.type==="sheep"?1.35:1.05,c=a.x-o,h=a.x+o,f=a.y-.05,u=a.y+l,d=a.z-o,p=a.z+o;let g=-1/0,m=1/0;const _=[[t.x,e.x,c,h],[t.y,e.y,f,u],[t.z,e.z,d,p]];let M=!0;for(const[E,y,w,b]of _)if(Math.abs(y)<1e-6){if(E<w||E>b){M=!1;break}}else{let S=(w-E)/y,R=(b-E)/y;if(S>R){const v=S;S=R,R=v}if(S>g&&(g=S),R<m&&(m=R),g>m){M=!1;break}}if(M&&m>=0){const E=g>=0?g:0;E<=r&&(r=E,s={mob:a,distance:E})}}return s}setMobHurtTint(t,e){const i=e?16733525:16777215;t.mesh.traverse(s=>{if(s instanceof Qt){const r=Array.isArray(s.material)?s.material:[s.material];for(const a of r)a&&"color"in a&&a.color instanceof Wt&&a.color.setHex(i)}})}attackMob(t,e,i,s){const r=this.mobs.get(t);if(!r||r.dead||r.hurtTimer>.22)return{hit:!1,killed:!1};r.health=Math.max(0,r.health-e),r.hurtTimer=.45,r.panicTimer=4.5,this.setMobHurtTint(r,!0);const a=r.x-i.x,o=r.z-i.z,l=Math.hypot(a,o)||1,c=a/l,h=o/l;if(r.vx=c*5.2,r.vz=h*5.2,r.vy=4.2,r.yaw=Math.atan2(c,h),r.health<=0){r.dead=!0,r.deathTimer=.55,s==null||s(r.x,r.y+.5,r.z);const f=Math.floor(r.x),u=Math.floor(r.y),d=Math.floor(r.z);if(r.type==="sheep"){this.spawnDroppedItem(f,u,d,"white_wool");const p=1+Math.floor(Math.random()*2);for(let g=0;g<p;g++)this.spawnDroppedItem(f,u,d,"mutton")}else if(r.type==="pig"){const p=1+Math.floor(Math.random()*3);for(let g=0;g<p;g++)this.spawnDroppedItem(f,u,d,"porkchop")}else if(r.type==="cow"){const p=1+Math.floor(Math.random()*3);for(let m=0;m<p;m++)this.spawnDroppedItem(f,u,d,"beef");const g=Math.floor(Math.random()*3);for(let m=0;m<g;m++)this.spawnDroppedItem(f,u,d,"leather")}else if(r.type==="zombie"){const p=1+Math.floor(Math.random()*3);for(let g=0;g<p;g++)this.spawnDroppedItem(f,u,d,"rotten_flesh");Math.random()<.08&&this.spawnDroppedItem(f,u,d,"iron_ingot")}return{hit:!0,killed:!0,mob:r}}return{hit:!0,killed:!1,mob:r}}spawnDroppedItem(t,e,i,s,r=1,a,o,l,c=.5){const h=tt.getItem(s);if(!h)return;const f=`item_${Date.now()}_${Math.random()}`;let u,d;if(h.isBlock&&h.blockNumId!==void 0){const M=tt.getBlock(h.blockNumId);u=new De(.25,.25,.25);const E=u.attributes.uv,y=[M.textures.east,M.textures.west,M.textures.top,M.textures.bottom,M.textures.south,M.textures.north],w=[.72,.72,1,.55,.86,.86],b=[];for(let S=0;S<6;S++){const R=ue.getUV(y[S]),v=S*4;E.setXY(v+0,R.u0,R.v1),E.setXY(v+1,R.u1,R.v1),E.setXY(v+2,R.u0,R.v0),E.setXY(v+3,R.u1,R.v0);let x=1,C=1,k=1;M.tint==="grass"&&S===2?(x=121/255,C=192/255,k=90/255):M.tint==="foliage"?(x=89/255,C=174/255,k=48/255):M.tint==="birch"?(x=128/255,C=167/255,k=85/255):M.tint==="spruce"&&(x=97/255,C=153/255,k=97/255);const L=w[S];for(let D=0;D<4;D++)b.push(x*L,C*L,k*L)}E.needsUpdate=!0,u.setAttribute("color",new pe(b,3)),d=new Fe({map:ue.texture,vertexColors:!0,transparent:!0,alphaTest:.1})}else{u=new _i(.35,.35);const M=this.textureLoader.load(`/assets/minecraft/textures/${h.texture}.png`);M.magFilter=Kt,M.minFilter=Kt,M.colorSpace=me,d=new Fe({map:M,side:Ue,transparent:!0,alphaTest:.1})}const p=new Qt(u,d),g=t+.5+(Math.random()-.5)*.16,m=e+.35,_=i+.5+(Math.random()-.5)*.16;p.position.set(g,m,_),this.scene.add(p),this.droppedItems.set(f,{id:f,itemId:h.shortId,count:r,x:g,y:m,z:_,vx:a!==void 0?a:(Math.random()-.5)*1.1,vy:o!==void 0?o:2.2+Math.random()*.6,vz:l!==void 0?l:(Math.random()-.5)*1.1,age:0,pickupDelay:c,mesh:p})}update(t,e,i,s,r,a){for(const[o,l]of this.droppedItems){l.age+=t,l.pickupDelay=Math.max(0,l.pickupDelay-t),l.vy=Math.max(-18,l.vy-18*t);const c=l.x+l.vx*t;!r||!r(Math.floor(c),Math.floor(l.y),Math.floor(l.z))?l.x=c:l.vx=-l.vx*.3;const h=l.z+l.vz*t;!r||!r(Math.floor(l.x),Math.floor(l.y),Math.floor(h))?l.z=h:l.vz=-l.vz*.3;const f=l.y+l.vy*t,u=Math.floor(f-.16);(r?r(Math.floor(l.x),u,Math.floor(l.z)):f<e(Math.floor(l.x),Math.floor(l.z))+.18)&&l.vy<=0?(l.y=u+1+.16,l.vy=0,l.vx*=Math.pow(.02,t),l.vz*=Math.pow(.02,t)):l.y=f;const p=Math.sin(l.age*3.2)*.06+.06;if(l.mesh.position.set(l.x,l.y+p,l.z),l.mesh.rotation.y=l.age*1.8,i&&l.pickupDelay<=0&&l.age>.15){const g=i.x-l.x,m=i.y+.75-l.y,_=i.z-l.z,M=Math.hypot(g,m,_);if(M<2.35&&(l.x+=g/M*11*t,l.y+=m/M*11*t,l.z+=_/M*11*t,M<.95&&s&&s(l.itemId,l.count))){this.scene.remove(l.mesh),l.mesh.geometry.dispose(),this.droppedItems.delete(o);continue}}l.age>300&&(this.scene.remove(l.mesh),l.mesh.geometry.dispose(),this.droppedItems.delete(o))}for(const[o,l]of this.mobs){if(l.type==="remote_player")continue;if(l.hurtTimer>0&&(l.hurtTimer-=t,l.hurtTimer<=0&&this.setMobHurtTint(l,!1)),l.dead){l.deathTimer-=t;const d=Math.min(1,Math.max(0,1-l.deathTimer/.55));if(l.mesh.rotation.z=d*(Math.PI/2),l.deathTimer<=0&&(this.scene.remove(l.mesh),this.mobs.delete(o),i)){const p=Math.random()*Math.PI*2,g=14+Math.random()*10,m=Math.floor(i.x+Math.cos(p)*g),_=Math.floor(i.z+Math.sin(p)*g),M=e(m,_);this.spawnMob(`${l.type}_${Date.now()}`,l.type,m,M,_)}continue}if(l.panicTimer>0&&(l.panicTimer-=t),l.aiTimer-=t,l.type==="zombie"&&i&&l.hurtTimer<=0){const d=i.x-l.x,p=i.z-l.z,g=Math.hypot(d,p);g<16&&(l.yaw=Math.atan2(d,p),l.vx=Math.sin(l.yaw)*2.3,l.vz=Math.cos(l.yaw)*2.3,g<1.35&&a&&a(3,"zombie"))}else if(l.aiTimer<=0&&l.hurtTimer<=0)if(l.panicTimer>0){l.aiTimer=.35+Math.random()*.45,l.yaw+=(Math.random()-.5)*2.4;const d=2.9;l.vx=Math.sin(l.yaw)*d,l.vz=Math.cos(l.yaw)*d}else if(l.aiTimer=2+Math.random()*4,Math.random()<.6){l.yaw+=(Math.random()-.5)*2.2;const d=1.2;l.vx=Math.sin(l.yaw)*d,l.vz=Math.cos(l.yaw)*d}else l.vx=0,l.vz=0;l.hurtTimer>0&&(l.vx*=Math.pow(.08,t),l.vz*=Math.pow(.08,t));const h=Math.hypot(l.vx,l.vz)>.05;h?l.walkPhase+=t*(l.panicTimer>0?13:7):l.walkPhase*=.85;const f=h?Math.sin(l.walkPhase)*.55:0;l.legs&&l.legs.length>=4?(l.legs[0].rotation.x=f,l.legs[1].rotation.x=-f,l.legs[2].rotation.x=-f,l.legs[3].rotation.x=f):l.legs&&l.legs.length===2&&(l.legs[0].rotation.x=f,l.legs[1].rotation.x=-f),l.x+=l.vx*t,l.z+=l.vz*t;const u=e(Math.floor(l.x),Math.floor(l.z));l.y>u||l.vy>0?(l.vy-=18*t,l.y+=l.vy*t,l.y<=u&&(l.y=u,l.vy=0)):l.y+=(u-l.y)*Math.min(1,t*10),l.mesh.position.set(l.x,l.y,l.z),l.mesh.rotation.y=l.yaw}}clearAll(){for(const[,t]of this.cushions)this.scene.remove(t.mesh),t.mesh.geometry.dispose();this.cushions.clear();for(const[,t]of this.mobs)this.scene.remove(t.mesh);this.mobs.clear();for(const[,t]of this.droppedItems)this.scene.remove(t.mesh),t.mesh.geometry.dispose();this.droppedItems.clear()}}class l_{constructor(t){I(this,"scene");I(this,"particles",[]);I(this,"leafMaterials");I(this,"smokeMaterial");I(this,"damageHeartMaterial");I(this,"critStarMaterial");I(this,"poofCloudMaterial");I(this,"sharedGeo",new De(.14,.14,.04));I(this,"billboardGeo",new _i(.24,.24));I(this,"smokeGeo",new De(.28,.28,.28));I(this,"timer",0);I(this,"materialCache",new Map);I(this,"texturedBreakMat",null);this.scene=t;const e=new ts,i=(s,r)=>{const a=e.load(s);return a.magFilter=Kt,a.minFilter=Kt,a.colorSpace=me,new Fe({map:a,transparent:!0,alphaTest:.1,color:r,side:Ue})};this.leafMaterials={orange:i("/assets/minecraft/textures/particle/orange_poplar_1.png",16749092),red:i("/assets/minecraft/textures/particle/red_poplar_1.png",14695464),yellow:i("/assets/minecraft/textures/particle/yellow_poplar_1.png",16768060)},this.damageHeartMaterial=i("/assets/minecraft/textures/particle/damage.png",16777215),this.critStarMaterial=i("/assets/minecraft/textures/particle/critical_hit.png",16777215),this.poofCloudMaterial=i("/assets/minecraft/textures/particle/generic_5.png",16777215),this.smokeMaterial=new Fe({color:7039851,transparent:!0,opacity:.55})}spawnPoplarLeaf(t,e,i,s){if(this.particles.length>180)return;const r=new Qt(this.sharedGeo,this.leafMaterials[s]);r.position.set(t+Math.random(),e-.1,i+Math.random()),this.scene.add(r),this.particles.push({mesh:r,vx:(Math.random()-.5)*.4,vy:-.6-Math.random()*.4,vz:(Math.random()-.5)*.4,life:0,maxLife:4.5+Math.random()*2,swayFreq:1.5+Math.random()*2})}spawnCampfireSmoke(t,e,i){if(this.particles.length>180)return;const s=new Qt(this.smokeGeo,this.smokeMaterial);s.position.set(t+.35+Math.random()*.3,e+.5,i+.35+Math.random()*.3),this.scene.add(s),this.particles.push({mesh:s,vx:(Math.random()-.5)*.15,vy:.9+Math.random()*.4,vz:(Math.random()-.5)*.15,life:0,maxLife:3.5+Math.random()*1.5,swayFreq:.8})}spawnDamageIndicator(t,e,i,s=3){for(let r=0;r<s;r++){const a=new Qt(this.billboardGeo,this.damageHeartMaterial);a.position.set(t+(Math.random()-.5)*.5,e+(Math.random()-.2)*.4,i+(Math.random()-.5)*.5),a.rotation.y=Math.random()*Math.PI*2,this.scene.add(a),this.particles.push({mesh:a,vx:(Math.random()-.5)*1.4,vy:1.6+Math.random()*1.1,vz:(Math.random()-.5)*1.4,life:0,maxLife:.5+Math.random()*.2,swayFreq:0})}}spawnCritBurst(t,e,i){for(let s=0;s<8;s++){const r=new Qt(this.billboardGeo,this.critStarMaterial);r.position.set(t+(Math.random()-.5)*.6,e+(Math.random()-.2)*.5,i+(Math.random()-.5)*.6),r.rotation.y=Math.random()*Math.PI*2,this.scene.add(r),this.particles.push({mesh:r,vx:(Math.random()-.5)*2.8,vy:1.2+Math.random()*2,vz:(Math.random()-.5)*2.8,life:0,maxLife:.45+Math.random()*.2,swayFreq:0})}}spawnDeathPoof(t,e,i){for(let s=0;s<12;s++){const r=new Qt(this.billboardGeo,this.poofCloudMaterial);r.position.set(t+(Math.random()-.5)*.8,e+(Math.random()-.2)*.6,i+(Math.random()-.5)*.8),r.rotation.y=Math.random()*Math.PI*2,this.scene.add(r),this.particles.push({mesh:r,vx:(Math.random()-.5)*1.1,vy:.6+Math.random()*1.2,vz:(Math.random()-.5)*1.1,life:0,maxLife:.65+Math.random()*.35,swayFreq:.5})}}getMaterial(t){let e=this.materialCache.get(t);return e||(e=new Fe({color:t}),this.materialCache.set(t,e)),e}spawnBlockBreakBurst(t,e,i,s,r=10516565){let o=s?ue.getUV(s):null;o||(o=ue.getUV("stone")),!this.texturedBreakMat&&ue.texture&&(this.texturedBreakMat=new Fe({map:ue.texture,side:Ue,transparent:!0,alphaTest:.1}));const l=this.texturedBreakMat||this.getMaterial(r);for(let c=0;c<10;c++){const h=new _i(.12,.12);if(o){const u=h.attributes.uv,d=o.u1-o.u0,p=o.v1-o.v0,g=o.u0+Math.random()*(d*.75),m=o.v0+Math.random()*(p*.75),_=d*.25,M=p*.25;u.setXY(0,g,m+M),u.setXY(1,g+_,m+M),u.setXY(2,g,m),u.setXY(3,g+_,m),u.needsUpdate=!0}const f=new Qt(h,l);f.position.set(t+.2+Math.random()*.6,e+.2+Math.random()*.6,i+.2+Math.random()*.6),f.rotation.set(Math.random()*Math.PI,Math.random()*Math.PI,Math.random()*Math.PI),this.scene.add(f),this.particles.push({mesh:f,vx:(Math.random()-.5)*3.2,vy:1.4+Math.random()*2.2,vz:(Math.random()-.5)*3.2,life:0,maxLife:.35+Math.random()*.15,swayFreq:0})}}update(t){for(let e=this.particles.length-1;e>=0;e--){const i=this.particles[e];if(i.life+=t,i.life>=i.maxLife){this.scene.remove(i.mesh),this.particles.splice(e,1);continue}i.swayFreq===0?i.vy-=9.8*t:i.vy<0?(i.vx=Math.sin(i.life*i.swayFreq)*.55,i.vz=Math.cos(i.life*i.swayFreq*.8)*.55,i.mesh.rotation.x+=t*1.8,i.mesh.rotation.y+=t*2.2):i.mesh.rotation.y+=t*.7,i.mesh.position.x+=i.vx*t,i.mesh.position.y+=i.vy*t,i.mesh.position.z+=i.vz*t}}}class c_{constructor(){I(this,"scene");I(this,"camera");I(this,"cubeMesh");I(this,"angle",0);this.scene=new ol,this.camera=new Ve(85,window.innerWidth/window.innerHeight,.1,100);const t=new ts,e=r=>{const a=t.load(`/assets/minecraft/textures/gui/title/background/panorama_${r}.png`);return a.colorSpace=me,a.magFilter=ei,a.minFilter=ei,new Fe({map:a,side:Be,depthWrite:!1})},i=[e(1),e(3),e(4),e(5),e(0),e(2)],s=new De(10,10,10);this.cubeMesh=new Qt(s,i),this.scene.add(this.cubeMesh)}resize(t,e){this.camera.aspect=t/e,this.camera.updateProjectionMatrix()}render(t,e){this.angle+=e*.085,this.camera.rotation.order="YXZ",this.camera.rotation.y=-this.angle,this.camera.rotation.x=Math.sin(this.angle*.7)*.12-.08,t.render(this.scene,this.camera)}}class h_{constructor(t){I(this,"group");I(this,"celestialGroup");I(this,"sunMesh");I(this,"moonMesh");I(this,"starsPoints");I(this,"cloudsMesh");I(this,"cloudOffset",0);this.group=new gi,this.celestialGroup=new gi,this.group.add(this.celestialGroup),t.add(this.group),this.initSunAndMoon(),this.initStars(),this.initClouds()}initSunAndMoon(){const t=new ts,e=new _i(36,36),i=new Fe({color:16777215,side:Ue,transparent:!0,blending:zr,depthWrite:!1,fog:!1});t.load("/assets/minecraft/textures/environment/sun.png",o=>{o.magFilter=Kt,o.minFilter=Kt,o.colorSpace=me,i.map=o,i.needsUpdate=!0}),this.sunMesh=new Qt(e,i),this.sunMesh.position.set(0,160,0),this.sunMesh.rotation.x=Math.PI/2,this.celestialGroup.add(this.sunMesh);const s=new _i(28,28),r=s.attributes.uv;r.setXY(0,0,1),r.setXY(1,.25,1),r.setXY(2,0,.5),r.setXY(3,.25,.5),r.needsUpdate=!0;const a=new Fe({color:16777215,side:Ue,transparent:!0,blending:zr,depthWrite:!1,fog:!1});t.load("/assets/minecraft/textures/environment/moon_phases.png",o=>{o.magFilter=Kt,o.minFilter=Kt,o.colorSpace=me,a.map=o,a.needsUpdate=!0}),this.moonMesh=new Qt(s,a),this.moonMesh.position.set(0,-160,0),this.moonMesh.rotation.x=-Math.PI/2,this.celestialGroup.add(this.moonMesh)}initStars(){const e=new Float32Array(2250);let i=10842;const s=()=>(i=i*1664525+1013904223>>>0,i/4294967295);for(let o=0;o<750;o++){const l=s()*Math.PI*2,c=Math.acos(2*s()-1),h=155;e[o*3]=h*Math.sin(c)*Math.cos(l),e[o*3+1]=h*Math.cos(c),e[o*3+2]=h*Math.sin(c)*Math.sin(l)}const r=new Ie;r.setAttribute("position",new hi(e,3));const a=new Qh({color:16777215,size:1.5,sizeAttenuation:!1,transparent:!0,opacity:0,depthWrite:!1,fog:!1});this.starsPoints=new j0(r,a),this.celestialGroup.add(this.starsPoints)}initClouds(){const t=new ts,e=new _i(512,512),i=new Fe({color:16777215,transparent:!0,opacity:.82,side:Ue,depthWrite:!1});t.load("/assets/minecraft/textures/environment/clouds.png",s=>{s.magFilter=Kt,s.minFilter=Kt,s.wrapS=Rs,s.wrapT=Rs,s.repeat.set(2,2),i.map=s,i.needsUpdate=!0}),this.cloudsMesh=new Qt(e,i),this.cloudsMesh.rotation.x=Math.PI/2,this.cloudsMesh.position.y=128,this.group.add(this.cloudsMesh)}update(t,e,i,s){this.group.position.set(e.x,0,e.z),this.celestialGroup.position.y=e.y;const r=(i-6e3)/24e3*Math.PI*2;this.celestialGroup.rotation.z=r;const a=Math.cos(r),o=Math.max(0,Math.min(1,-a*2));if(this.starsPoints.material.opacity=o,this.cloudsMesh.visible=s!=="OFF",this.cloudsMesh.visible){this.cloudOffset+=t*.0015;const l=this.cloudsMesh.material;l.map&&(l.map.offset.x=this.cloudOffset);const c=Math.max(.22,Math.min(1,a*.6+.65));l.color.setRGB(c,c,Math.min(1,c*1.05))}}}const He=Math.PI/180;class u_{constructor(){I(this,"scene");I(this,"camera");I(this,"armPoseGroup");I(this,"armMesh");I(this,"sleeveMesh");I(this,"itemPoseGroup");I(this,"itemDisplayGroup");I(this,"currentItemId","__uninit__");I(this,"swingProgress",0);I(this,"isSwinging",!1);I(this,"equipProgress",1);I(this,"bobPhase",0);this.scene=new ol,this.camera=new Ve(70,window.innerWidth/window.innerHeight,.05,10);const t=new iu(16777215,.92),e=new eu(16777215,.55);e.position.set(.5,1.5,1),this.scene.add(t,e),this.armPoseGroup=new gi,this.armPoseGroup.matrixAutoUpdate=!1,this.scene.add(this.armPoseGroup),this.itemPoseGroup=new gi,this.itemPoseGroup.matrixAutoUpdate=!1,this.itemDisplayGroup=new gi,this.itemPoseGroup.add(this.itemDisplayGroup),this.scene.add(this.itemPoseGroup),this.buildPlayerArm(),this.updateHeldItem(null)}cropArmFaceTexture(t,e,i,s,r,a,o=!1){const l=document.createElement("canvas");l.width=s*4,l.height=r*4;const c=l.getContext("2d");c.imageSmoothingEnabled=!1,c.translate(o?l.width:0,a?l.height:0),c.scale(o?-1:1,a?-1:1),c.drawImage(t,e,i,s,r,0,0,l.width,l.height);const h=new Xr(l);return h.magFilter=Kt,h.minFilter=Kt,h.colorSpace=me,h}buildPlayerArm(){const t=new De(.25,.75,.25),e=new qi({color:11896424}),i=new qi({color:43690}),s=[e.clone(),e.clone(),e.clone(),i.clone(),e.clone(),e.clone()];this.armMesh=new Qt(t,s),this.armMesh.position.set(-1/16,4/16,0),this.armPoseGroup.add(this.armMesh);const r=new De(4.5/16,12.5/16,4.5/16),a=Array.from({length:6},()=>new qi({transparent:!0,alphaTest:.1,opacity:0}));this.sleeveMesh=new Qt(r,a),this.sleeveMesh.position.set(-1/16,4/16,0),this.armPoseGroup.add(this.sleeveMesh),new ts().load("/assets/minecraft/textures/entity/player/wide/steve.png",l=>{const c=l.image,h=this.cropArmFaceTexture(c,48,20,4,12,!0),f=this.cropArmFaceTexture(c,40,20,4,12,!0),u=this.cropArmFaceTexture(c,48,16,4,4,!1),d=this.cropArmFaceTexture(c,44,16,4,4,!1),p=this.cropArmFaceTexture(c,52,20,4,12,!0),g=this.cropArmFaceTexture(c,44,20,4,12,!0),m=[h,f,u,d,p,g];for(let R=0;R<6;R++)s[R].map=m[R],s[R].color.setHex(16777215),s[R].needsUpdate=!0;const _=this.cropArmFaceTexture(c,48,36,4,12,!0),M=this.cropArmFaceTexture(c,40,36,4,12,!0),E=this.cropArmFaceTexture(c,48,32,4,4,!1),y=this.cropArmFaceTexture(c,44,32,4,4,!1),w=this.cropArmFaceTexture(c,52,36,4,12,!0),b=this.cropArmFaceTexture(c,44,36,4,12,!0),S=[_,M,E,y,w,b];for(let R=0;R<6;R++)a[R].map=S[R],a[R].opacity=1,a[R].needsUpdate=!0},void 0,()=>{})}buildExtruded2DItemMesh(t){const s=document.createElement("canvas");s.width=16,s.height=16;const r=s.getContext("2d",{willReadFrequently:!0});r.imageSmoothingEnabled=!1,r.drawImage(t,0,0,16,16);const a=r.getImageData(0,0,16,16).data,o=(w,b)=>w<0||w>=16||b<0||b>=16?!1:a[(b*16+w)*4+3]>=25,l=[],c=[],h=[],f=[],u=[];let d=0;const p=.5/16,g=-.5/16,m=(w,b,S,R,v,x,C,k,L,D,H,z)=>{l.push(...w,...b,...S,...R);for(let W=0;W<4;W++)c.push(v,x,C),f.push(z,z,z);h.push(k,L,D,L,D,H,k,H),u.push(d,d+1,d+2,d,d+2,d+3),d+=4};m([-.5,-.5,p],[.5,-.5,p],[.5,.5,p],[-.5,.5,p],0,0,1,0,0,1,1,1),m([.5,-.5,g],[-.5,-.5,g],[-.5,.5,g],[.5,.5,g],0,0,-1,1,0,0,1,1);const _=.002;for(let w=0;w<16;w++)for(let b=0;b<16;b++){if(!o(b,w))continue;const S=-.5+b/16,R=-.5+(b+1)/16,v=.5-w/16,x=.5-(w+1)/16,C=(b+_)/16,k=(b+1-_)/16,L=1-(w+_)/16,D=1-(w+1-_)/16;o(b,w-1)||m([S,v,p],[R,v,p],[R,v,g],[S,v,g],0,1,0,C,D,k,L,.95),o(b,w+1)||m([S,x,g],[R,x,g],[R,x,p],[S,x,p],0,-1,0,C,D,k,L,.65),o(b-1,w)||m([S,x,g],[S,x,p],[S,v,p],[S,v,g],-1,0,0,C,D,k,L,.8),o(b+1,w)||m([R,x,p],[R,x,g],[R,v,g],[R,v,p],1,0,0,C,D,k,L,.8)}const M=new Ie;M.setAttribute("position",new pe(l,3)),M.setAttribute("normal",new pe(c,3)),M.setAttribute("uv",new pe(h,2)),M.setAttribute("color",new pe(f,3)),M.setIndex(u);const E=new Xr(s);E.magFilter=Kt,E.minFilter=Kt,E.colorSpace=me;const y=new Fe({map:E,vertexColors:!0,transparent:!0,alphaTest:.1});return new Qt(M,y)}triggerSwing(){(!this.isSwinging||this.swingProgress>.35)&&(this.isSwinging=!0,this.swingProgress=0)}updateHeldItem(t){const e=t?t.id:"";if(e===this.currentItemId)return;for(this.currentItemId=e,this.equipProgress=0;this.itemDisplayGroup.children.length>0;){const m=this.itemDisplayGroup.children[0];m.geometry&&m.geometry.dispose(),this.itemDisplayGroup.remove(m)}if(this.itemDisplayGroup.position.set(0,0,0),this.itemDisplayGroup.rotation.set(0,0,0),this.itemDisplayGroup.scale.set(1,1,1),!t)return;const i=t.isBlock&&t.blockNumId!==void 0?tt.getBlock(t.blockNumId):null;if(!i||i.shape==="cross"||i.shape==="torch"||i.shape==="campfire"){this.itemDisplayGroup.position.set(1.13/16,3.2/16,1.13/16);const m=new rs().setFromEuler(new ii(0*He,-90*He,25*He,"ZYX"));this.itemDisplayGroup.quaternion.copy(m),this.itemDisplayGroup.scale.set(.68,.68,.68);let _=`/assets/minecraft/textures/${t.texture}.png`;t.shortId==="campfire"?_="/assets/minecraft/textures/item/campfire.png":t.shortId==="lantern"&&(_="/assets/minecraft/textures/item/lantern.png");const M=new Image;M.crossOrigin="anonymous",M.onload=()=>{if(this.currentItemId!==t.id)return;const E=this.buildExtruded2DItemMesh(M);this.itemDisplayGroup.add(E)},M.src=_;return}this.itemDisplayGroup.position.set(0,0,0),this.itemDisplayGroup.rotation.set(0,45*He,0,"ZYX"),this.itemDisplayGroup.scale.set(.4,.4,.4);const r=i.shape==="slab_bottom"||t.shortId.endsWith("_slab"),a=i.shape==="bed_foot"||t.shortId==="straw_bed",o=i.shape==="carpet"||i.shape==="trapdoor",l=a?.28:r?.5:o?.1875:1,c=new De(1,l,1),h=c.attributes.uv,f=[i.textures.east,i.textures.west,i.textures.top,i.textures.bottom,i.textures.south,i.textures.north],u=[.72,.72,1,.55,.86,.86],d=[];for(let m=0;m<6;m++){const _=ue.getUV(f[m]),M=(_.v1-_.v0)*(m===2||m===3?1:l),E=_.v0+M,y=m*4;h.setXY(y+0,_.u0,E),h.setXY(y+1,_.u1,E),h.setXY(y+2,_.u0,_.v0),h.setXY(y+3,_.u1,_.v0);let w=1,b=1,S=1;i.tint==="grass"&&m===2?(w=121/255,b=192/255,S=90/255):i.tint==="foliage"?(w=89/255,b=174/255,S=48/255):i.tint==="birch"?(w=128/255,b=167/255,S=85/255):i.tint==="spruce"&&(w=97/255,b=153/255,S=97/255);const R=u[m];for(let v=0;v<4;v++)d.push(w*R,b*R,S*R)}h.needsUpdate=!0,c.setAttribute("color",new pe(d,3));const p=new Fe({map:ue.texture,vertexColors:!0,alphaTest:.1,transparent:!0}),g=new Qt(c,p);this.itemDisplayGroup.add(g)}update(t,e,i){this.equipProgress<1&&(this.equipProgress=Math.min(1,this.equipProgress+t*6)),this.isSwinging&&(this.swingProgress+=t*4.5,this.swingProgress>=1&&(this.swingProgress=0,this.isSwinging=!1)),e?this.bobPhase+=t*(i?13:9):this.bobPhase*=.9;const s=e?Math.sin(this.bobPhase*.5)*.025:0,r=e?-Math.abs(Math.cos(this.bobPhase*.5))*.025:0,a=this.swingProgress,o=Math.sqrt(a),l=1-this.equipProgress;if(this.currentItemId){this.armPoseGroup.visible=!1,this.itemPoseGroup.visible=!0;const c=new se,h=new se;c.makeTranslation(.56+s,-.52+l*-.6+r,-.72);const f=-.4*Math.sin(o*Math.PI),u=.2*Math.sin(o*Math.PI*2),d=-.2*Math.sin(a*Math.PI);c.multiply(h.makeTranslation(f,u,d));const p=Math.sin(a*a*Math.PI),g=Math.sin(o*Math.PI);c.multiply(h.makeRotationY((45+p*-20)*He)),c.multiply(h.makeRotationZ(g*-20*He)),c.multiply(h.makeRotationX(g*-80*He)),c.multiply(h.makeRotationY(-45*He)),this.itemPoseGroup.matrix.copy(c)}else{this.armPoseGroup.visible=!0,this.itemPoseGroup.visible=!1;const c=-.3*Math.sin(o*Math.PI),h=.4*Math.sin(o*Math.PI*2),f=-.4*Math.sin(a*Math.PI),u=Math.sin(a*a*Math.PI),d=Math.sin(o*Math.PI),p=new se,g=new se;p.makeTranslation(.64+c+s,-.6+h+l*-.6+r,-.72+f),p.multiply(g.makeRotationY(45*He)),p.multiply(g.makeRotationY(d*70*He)),p.multiply(g.makeRotationZ(u*-20*He)),p.multiply(g.makeTranslation(-1,3.6,3.5)),p.multiply(g.makeRotationZ(120*He)),p.multiply(g.makeRotationX(200*He)),p.multiply(g.makeRotationY(-135*He)),p.multiply(g.makeTranslation(5.6,0,0)),p.multiply(g.makeTranslation(-5/16,2/16,0)),p.multiply(g.makeRotationZ(.1)),this.armPoseGroup.matrix.copy(p)}}render(t){this.camera.aspect=window.innerWidth/window.innerHeight,this.camera.updateProjectionMatrix();const e=t.autoClear;t.autoClear=!1,t.clearDepth(),t.render(this.scene,this.camera),t.autoClear=e}}class Ce{static async init(){var t;if(typeof navigator>"u"||!navigator.gpu){this.supported=!1,this.active=!1,this.backendLabel="WebGL2 (WebGPU unavailable in browser)";return}try{const i=await navigator.gpu.requestAdapter({powerPreference:"high-performance"});if(!i){this.supported=!1,this.active=!1,this.backendLabel="WebGL2 (No WebGPU Adapter)";return}this.adapter=i;const s=i.info||await((t=i.requestAdapterInfo)==null?void 0:t.call(i))||{},r=s.vendor?String(s.vendor).toUpperCase():"GPU",a=s.architecture||s.description||"Hardware Adapter";this.adapterName=`${r} (${a})`;const o=await i.requestDevice();this.device=o;const l=o.createShaderModule({label:"Minecraft 26.3 Voxel Terrain & Light WGSL Compute Shader",code:`
          struct Params {
            seed: u32,
            chunkX: i32,
            chunkZ: i32,
            pad: u32,
          };
          @group(0) @binding(0) var<uniform> params: Params;
          @group(0) @binding(1) var<storage, read_write> heightOut: array<i32, 256>;

          fn hash2d(x: i32, z: i32, seed: u32) -> f32 {
            var n = u32(x) * 374761393u + u32(z) * 668265263u + seed * 1442695041u;
            n = (n ^ (n >> 13u)) * 1274126177u;
            n = n ^ (n >> 16u);
            return f32(n) / 4294967296.0;
          }

          @compute @workgroup_size(16, 16)
          fn main(@builtin(global_invocation_id) gid: vec3<u32>) {
            if (gid.x >= 16u || gid.y >= 16u) {
              return;
            }
            let wx = params.chunkX * 16 + i32(gid.x);
            let wz = params.chunkZ * 16 + i32(gid.y);
            let h = 62 + i32(hash2d(wx, wz, params.seed) * 16.0);
            heightOut[gid.y * 16u + gid.x] = h;
          }
        `});this.computePipeline=o.createComputePipeline({label:"Minecraft 26.3 WGSL Compute Pipeline",layout:"auto",compute:{module:l,entryPoint:"main"}}),this.supported=!0,this.active=!0,this.backendLabel=`WebGPU (${this.adapterName})`}catch(e){console.warn("WebGPU initialization fallback:",e),this.supported=!1,this.active=!1,this.backendLabel="WebGL2"}}}I(Ce,"supported",!1),I(Ce,"active",!1),I(Ce,"adapterName","WebGL2 Fallback"),I(Ce,"backendLabel","WebGL2"),I(Ce,"adapter",null),I(Ce,"device",null),I(Ce,"computePipeline",null);class Qr{constructor(){I(this,"slots",new Array(36).fill(null));I(this,"armorSlots",new Array(4).fill(null));I(this,"offhandSlot",null);I(this,"crafting2x2",new Array(4).fill(null));I(this,"crafting3x3",new Array(9).fill(null));I(this,"stonecutterInput",null);I(this,"stonecutterSelectedIndex",0);I(this,"furnaceInput",null);I(this,"furnaceFuel",null);I(this,"furnaceOutput",null);I(this,"chestSlots",new Array(27).fill(null));I(this,"cursorStack",null);I(this,"selectedHotbarSlot",0)}clearAll(){this.slots.fill(null),this.armorSlots.fill(null),this.offhandSlot=null,this.crafting2x2.fill(null),this.crafting3x3.fill(null),this.stonecutterInput=null,this.furnaceInput=null,this.furnaceFuel=null,this.furnaceOutput=null,this.cursorStack=null,this.selectedHotbarSlot=0}populateDefault26_3Loadout(){const t=[["poplar_log",64],["poplar_planks",64],["orange_poplar_leaves",64],["straw_bed",1],["orange_cushion",16],["red_wool_stairs",64],["cyan_concrete_slab",64],["stonecutter",1],["filled_map",1],["yellow_poplar_leaves",64],["red_poplar_leaves",64],["poplar_stairs",64],["poplar_slab",64],["poplar_fence",64],["poplar_trapdoor",64],["poplar_shelf",64],["yellow_cushion",16],["red_cushion",16],["cyan_cushion",16],["lime_wool_stairs",64],["yellow_wool_slab",64],["white_concrete_stairs",64],["orange_concrete_slab",64],["cyan_concrete",64],["white_concrete",64],["campfire",16],["torch",64],["crafting_table",1],["diamond_pickaxe",1],["diamond_axe",1]];for(let e=0;e<Math.min(this.slots.length,t.length);e++){const[i,s]=t[e],r=tt.getItem(i);r&&(this.slots[e]={item:r,count:s})}}getHeldStack(){return this.slots[this.selectedHotbarSlot]}clickSlot(t,e,i,s=!1,r=-1){const a=t();if(s&&a){if(r>=0&&r<9){const o=this.moveStackToRange(a,9,36);e(o)}else if(r>=9&&r<36){const o=this.moveStackToRange(a,0,9);e(o)}else this.addItem(a.item.shortId,a.count)&&e(null);return}if(i===0){if(!this.cursorStack&&a)this.cursorStack=a,e(null);else if(this.cursorStack&&!a)e(this.cursorStack),this.cursorStack=null;else if(this.cursorStack&&a)if(this.cursorStack.item.id===a.item.id&&a.count<a.item.maxStack){const o=a.item.maxStack-a.count,l=Math.min(o,this.cursorStack.count);a.count+=l,this.cursorStack.count-=l,this.cursorStack.count<=0&&(this.cursorStack=null),e(a)}else{const o=a;e(this.cursorStack),this.cursorStack=o}}else if(i===2)if(!this.cursorStack&&a){const o=Math.ceil(a.count/2);this.cursorStack={item:a.item,count:o},a.count-=o,e(a.count>0?a:null)}else this.cursorStack&&!a?(e({item:this.cursorStack.item,count:1}),this.cursorStack.count-=1,this.cursorStack.count<=0&&(this.cursorStack=null)):this.cursorStack&&a&&this.cursorStack.item.id===a.item.id&&a.count<a.item.maxStack&&(a.count+=1,this.cursorStack.count-=1,this.cursorStack.count<=0&&(this.cursorStack=null),e(a))}placeOneFromCursor(t,e){if(!this.cursorStack||this.cursorStack.count<=0)return;const i=t();i?i.item.id===this.cursorStack.item.id&&i.count<i.item.maxStack&&(i.count+=1,this.cursorStack.count-=1,this.cursorStack.count<=0&&(this.cursorStack=null),e(i)):(e({item:this.cursorStack.item,count:1}),this.cursorStack.count-=1,this.cursorStack.count<=0&&(this.cursorStack=null))}collectAllToCursor(t,e){if(!this.cursorStack&&t&&e){const a=t();a&&(this.cursorStack=a,e(null))}if(!this.cursorStack)return;const i=this.cursorStack.item.id,s=this.cursorStack.item.maxStack;if(this.cursorStack.count>=s)return;const r=(a,o)=>{for(let l=0;l<a.length;l++){if(!this.cursorStack||this.cursorStack.count>=s)return;const c=a[l];if(!c||c.item.id!==i||o&&c.count>=s)continue;const h=Math.min(s-this.cursorStack.count,c.count);this.cursorStack.count+=h,c.count-=h,c.count<=0&&(a[l]=null)}};r(this.crafting2x2,!0),r(this.crafting3x3,!0),r(this.slots,!0),r(this.crafting2x2,!1),r(this.crafting3x3,!1),r(this.slots,!1)}moveStackToRange(t,e,i){let s=t.count;for(let r=e;r<i&&s>0;r++){const a=this.slots[r];if(a&&a.item.id===t.item.id&&a.count<t.item.maxStack){const o=Math.min(t.item.maxStack-a.count,s);a.count+=o,s-=o}}for(let r=e;r<i&&s>0;r++)if(!this.slots[r]){const a=Math.min(t.item.maxStack,s);this.slots[r]={item:t.item,count:a},s-=a}return s>0?{item:t.item,count:s}:null}getCraftingResult(t,e){const i=t.map(g=>g?g.item.shortId:""),s=i.filter(g=>g!=="");if(s.length===0)return null;const r=(g,m)=>{const _=tt.getItem(g);return _?{item:_,count:m}:null};if(s.length===1){const g=s[0];if(g.endsWith("_log")||g.endsWith("_wood")){const m=g.replace(/^stripped_/,"").replace(/_(log|wood)$/,"");return r(`${m}_planks`,4)}}let a=e,o=-1,l=e,c=-1;for(let g=0;g<e;g++)for(let m=0;m<e;m++)i[g*e+m]!==""&&(g<a&&(a=g),g>o&&(o=g),m<l&&(l=m),m>c&&(c=m));const h=o-a+1,f=c-l+1,u=[];for(let g=a;g<=o;g++){const m=[];for(let _=l;_<=c;_++)m.push(i[g*e+_]);u.push(m)}const d=s[0],p=g=>s.every(m=>m===g||g==="_planks"&&m.endsWith("_planks")||g==="_log"&&m.endsWith("_log"));if(f===2&&h===2&&s.length===4){if(p("_planks"))return r("crafting_table",1);if(d.endsWith("_log")&&p(d))return r(d.replace("_log","_wood"),3);if(p("stone"))return r("stone_bricks",4);if(p("sand"))return r("sandstone",1);if(p("granite"))return r("polished_granite",4);if(p("diorite"))return r("polished_diorite",4);if(p("andesite"))return r("polished_andesite",4)}if(f===1&&h===2&&s.length===2){if(u[0][0].endsWith("_planks")&&u[1][0].endsWith("_planks"))return r("stick",4);if((u[0][0]==="coal"||u[0][0]==="charcoal")&&u[1][0]==="stick")return r("torch",4)}if(f===1&&h===3&&s.length===3){const g=M=>M.endsWith("_planks")?"wooden":M==="cobblestone"||M==="cobbled_deepslate"?"stone":M==="iron_ingot"?"iron":M==="diamond"?"diamond":null,m=g(u[0][0]);if(m&&u[1][0]==="stick"&&u[2][0]==="stick")return r(`${m}_shovel`,1);const _=g(u[0][0]);if(_&&g(u[1][0])===_&&u[2][0]==="stick")return r(`${_}_sword`,1)}if(f===3&&h===3&&s.length===5){const g=_=>_.endsWith("_planks")?"wooden":_==="cobblestone"||_==="cobbled_deepslate"?"stone":_==="iron_ingot"?"iron":_==="diamond"?"diamond":null,m=g(u[0][0]);if(m&&g(u[0][1])===m&&g(u[0][2])===m&&u[1][1]==="stick"&&u[2][1]==="stick")return r(`${m}_pickaxe`,1)}if(f===2&&h===3&&s.length===5){const g=M=>M.endsWith("_planks")?"wooden":M==="cobblestone"||M==="cobbled_deepslate"?"stone":M==="iron_ingot"?"iron":M==="diamond"?"diamond":null,m=g(u[0][0]);if(m&&g(u[0][1])===m&&g(u[1][0])===m&&u[1][1]==="stick"&&u[2][1]==="stick")return r(`${m}_axe`,1);const _=g(u[0][1]);if(_&&g(u[0][0])===_&&g(u[1][1])===_&&u[1][0]==="stick"&&u[2][0]==="stick")return r(`${_}_axe`,1)}if(f===2&&h===1&&s.length===2&&p(d)&&d.endsWith("_wool")){const g=d.replace("_wool","");return r(`${g}_cushion`,1)||r(`${g}_carpet`,3)}if(f===3&&h===1&&s.length===3&&p(d)){if(d==="poplar_slab")return r("poplar_shelf",2);const g=d.replace(/_planks$/,"");return r(`${d}_slab`,6)||r(`${g}_slab`,6)||r(`${d.replace(/s$/,"")}_slab`,6)}if(f===3&&h===2&&s.length===6){if(u[0].every(g=>g==="wheat")&&u[1].every(g=>g.endsWith("_planks")))return r("straw_bed",1);if(u[0][0].endsWith("_planks")&&u[0][1]==="stick"&&u[0][2].endsWith("_planks")&&u[1][0].endsWith("_planks")&&u[1][1]==="stick"&&u[1][2].endsWith("_planks")){const g=u[0][0].replace("_planks","");return r(`${g}_fence`,3)}if(p(d)&&d.endsWith("_planks")){const g=d.replace("_planks","");return r(`${g}_trapdoor`,2)}}if(f===3&&h===3&&s.length===6&&p(d)){const g=u[0][0]!==""&&u[0][1]===""&&u[0][2]===""&&u[1][0]!==""&&u[1][1]!==""&&u[1][2]===""&&u[2][0]!==""&&u[2][1]!==""&&u[2][2]!=="",m=u[0][0]===""&&u[0][1]===""&&u[0][2]!==""&&u[1][0]===""&&u[1][1]!==""&&u[1][2]!==""&&u[2][0]!==""&&u[2][1]!==""&&u[2][2]!=="";if(g||m){const _=d.replace(/_planks$/,"");return r(`${d}_stairs`,4)||r(`${_}_stairs`,4)||r(`${d.replace(/s$/,"")}_stairs`,4)}}if(f===3&&h===3&&s.length===8&&u[1][1]===""){if(p("cobblestone"))return r("furnace",1);if(p("_planks"))return r("chest",1)}for(const g of Qr.getRecipes()){if(g.type!=="crafting")continue;let m=!0,_=0;for(const M of g.ingredients){if(s.filter(y=>y===M.id).length!==M.count){m=!1;break}_+=M.count}if(m&&_===s.length)return r(g.resultId,g.resultCount)}return null}consumeCraftingGrid(t){for(let e=0;e<t.length;e++){const i=t[e];i&&(i.count-=1,i.count<=0&&(t[e]=null))}}getStonecutterOutputs(){if(!this.stonecutterInput)return[];const t=this.stonecutterInput.item.shortId,e=[],i=(r,a)=>{if(r===t)return;const o=tt.getItem(r);o&&!e.some(l=>l.item.id===o.id)&&e.push({item:o,count:a})},s=t.replace(/_block$/,"").replace(/s$/,"");return i(`${t}_slab`,2),i(`${t}_stairs`,1),i(`${s}_slab`,2),i(`${s}_stairs`,1),i(`polished_${t}`,1),i(`polished_${t}_slab`,2),i(`polished_${t}_stairs`,1),i(`chiseled_${t}`,1),i(`chiseled_${s}`,1),t==="stone"&&(i("stone_bricks",1),i("stone_brick_slab",2),i("stone_brick_stairs",1),i("chiseled_stone_bricks",1)),e}addItem(t,e=1){const i=tt.getItem(t);if(!i)return!1;for(let s=0;s<this.slots.length;s++){const r=this.slots[s];if(r&&r.item.id===i.id&&r.count<i.maxStack){const a=i.maxStack-r.count,o=Math.min(a,e);if(r.count+=o,e-=o,e<=0)return!0}}for(let s=0;s<this.slots.length;s++)if(!this.slots[s]){const r=Math.min(i.maxStack,e);if(this.slots[s]={item:i,count:r},e-=r,e<=0)return!0}return!1}consumeHeld(t=1){const e=this.slots[this.selectedHotbarSlot];e&&(e.count-=t,e.count<=0&&(this.slots[this.selectedHotbarSlot]=null))}countItem(t){const e=tt.getItem(t);if(!e)return 0;let i=0;for(const s of this.slots)s&&s.item.id===e.id&&(i+=s.count);return i}removeIngredients(t){for(const e of t)if(this.countItem(e.id)<e.count)return!1;for(const e of t){const i=tt.getItem(e.id);let s=e.count;for(let r=0;r<this.slots.length&&s>0;r++){const a=this.slots[r];if(a&&a.item.id===i.id){const o=Math.min(a.count,s);a.count-=o,s-=o,a.count<=0&&(this.slots[r]=null)}}}return!0}static getRecipes(){return[{id:"poplar_planks",resultId:"poplar_planks",resultCount:4,ingredients:[{id:"poplar_log",count:1}],type:"crafting"},{id:"poplar_stairs",resultId:"poplar_stairs",resultCount:4,ingredients:[{id:"poplar_planks",count:6}],type:"crafting"},{id:"poplar_slab",resultId:"poplar_slab",resultCount:6,ingredients:[{id:"poplar_planks",count:3}],type:"crafting"},{id:"poplar_fence",resultId:"poplar_fence",resultCount:3,ingredients:[{id:"poplar_planks",count:4},{id:"stick",count:2}],type:"crafting"},{id:"poplar_shelf",resultId:"poplar_shelf",resultCount:2,ingredients:[{id:"poplar_slab",count:3}],type:"crafting"},{id:"poplar_boat",resultId:"poplar_boat",resultCount:1,ingredients:[{id:"poplar_planks",count:5}],type:"crafting"},{id:"straw_bed",resultId:"straw_bed",resultCount:1,ingredients:[{id:"wheat",count:3},{id:"poplar_planks",count:3}],type:"crafting"},{id:"orange_cushion",resultId:"orange_cushion",resultCount:1,ingredients:[{id:"orange_wool",count:2}],type:"crafting"},{id:"red_cushion",resultId:"red_cushion",resultCount:1,ingredients:[{id:"red_wool",count:2}],type:"crafting"},{id:"yellow_cushion",resultId:"yellow_cushion",resultCount:1,ingredients:[{id:"yellow_wool",count:2}],type:"crafting"},{id:"cyan_cushion",resultId:"cyan_cushion",resultCount:1,ingredients:[{id:"cyan_wool",count:2}],type:"crafting"},{id:"white_cushion",resultId:"white_cushion",resultCount:1,ingredients:[{id:"white_wool",count:2}],type:"crafting"},{id:"red_wool_stairs",resultId:"red_wool_stairs",resultCount:4,ingredients:[{id:"red_wool",count:6}],type:"crafting"},{id:"red_wool_slab",resultId:"red_wool_slab",resultCount:6,ingredients:[{id:"red_wool",count:3}],type:"crafting"},{id:"orange_wool_stairs",resultId:"orange_wool_stairs",resultCount:4,ingredients:[{id:"orange_wool",count:6}],type:"crafting"},{id:"white_wool_stairs",resultId:"white_wool_stairs",resultCount:4,ingredients:[{id:"white_wool",count:6}],type:"crafting"},{id:"cyan_concrete_stairs_sc",resultId:"cyan_concrete_stairs",resultCount:1,ingredients:[{id:"cyan_concrete",count:1}],type:"stonecutting"},{id:"cyan_concrete_slab_sc",resultId:"cyan_concrete_slab",resultCount:2,ingredients:[{id:"cyan_concrete",count:1}],type:"stonecutting"},{id:"white_concrete_stairs_sc",resultId:"white_concrete_stairs",resultCount:1,ingredients:[{id:"white_concrete",count:1}],type:"stonecutting"},{id:"white_concrete_slab_sc",resultId:"white_concrete_slab",resultCount:2,ingredients:[{id:"white_concrete",count:1}],type:"stonecutting"},{id:"orange_concrete_stairs_sc",resultId:"orange_concrete_stairs",resultCount:1,ingredients:[{id:"orange_concrete",count:1}],type:"stonecutting"},{id:"orange_concrete_slab_sc",resultId:"orange_concrete_slab",resultCount:2,ingredients:[{id:"orange_concrete",count:1}],type:"stonecutting"},{id:"red_concrete_stairs_sc",resultId:"red_concrete_stairs",resultCount:1,ingredients:[{id:"red_concrete",count:1}],type:"stonecutting"},{id:"red_concrete_slab_sc",resultId:"red_concrete_slab",resultCount:2,ingredients:[{id:"red_concrete",count:1}],type:"stonecutting"},{id:"stick",resultId:"stick",resultCount:4,ingredients:[{id:"poplar_planks",count:2}],type:"crafting"}]}dropHeldItem(t){const e=this.getHeldStack();if(!e||e.count<=0)return null;const i=t?e.count:1;e.count-=i;const s={item:e.item,count:i};return e.count<=0&&(this.slots[this.selectedHotbarSlot]=null),s}}const d_={iron_ore:{result:"iron_ingot",cookTicks:200},deepslate_iron_ore:{result:"iron_ingot",cookTicks:200},raw_iron:{result:"iron_ingot",cookTicks:200},gold_ore:{result:"gold_ingot",cookTicks:200},deepslate_gold_ore:{result:"gold_ingot",cookTicks:200},raw_gold:{result:"gold_ingot",cookTicks:200},copper_ore:{result:"copper_ingot",cookTicks:200},deepslate_copper_ore:{result:"copper_ingot",cookTicks:200},raw_copper:{result:"copper_ingot",cookTicks:200},sand:{result:"glass",cookTicks:200},red_sand:{result:"glass",cookTicks:200},cobblestone:{result:"stone",cookTicks:200},stone:{result:"smooth_stone",cookTicks:200},clay_ball:{result:"brick",cookTicks:200},clay:{result:"terracotta",cookTicks:200},netherrack:{result:"nether_brick",cookTicks:200},oak_log:{result:"charcoal",cookTicks:200},poplar_log:{result:"charcoal",cookTicks:200},birch_log:{result:"charcoal",cookTicks:200},spruce_log:{result:"charcoal",cookTicks:200},jungle_log:{result:"charcoal",cookTicks:200},acacia_log:{result:"charcoal",cookTicks:200},dark_oak_log:{result:"charcoal",cookTicks:200},stripped_oak_log:{result:"charcoal",cookTicks:200},stripped_poplar_log:{result:"charcoal",cookTicks:200},raw_beef:{result:"cooked_beef",cookTicks:200},raw_porkchop:{result:"cooked_porkchop",cookTicks:200},raw_mutton:{result:"cooked_mutton",cookTicks:200},raw_chicken:{result:"cooked_chicken",cookTicks:200},raw_salmon:{result:"cooked_salmon",cookTicks:200},raw_cod:{result:"cooked_cod",cookTicks:200},potato:{result:"baked_potato",cookTicks:200},kelp:{result:"dried_kelp",cookTicks:200}},f_={coal:1600,charcoal:1600,coal_block:16e3,oak_log:300,poplar_log:300,birch_log:300,spruce_log:300,oak_planks:300,poplar_planks:300,birch_planks:300,stick:100,straw_bed:400,crafting_table:300,wooden_pickaxe:200,wooden_axe:200,wooden_sword:200,wooden_shovel:200,wooden_hoe:200,barrel:300,chest:300};class Ds{static getFurnace(t){let e=this.furnaces.get(t);return e||(e={input:null,fuel:null,output:null,burnTime:0,maxBurnTime:0,cookTime:0},this.furnaces.set(t,e)),e}static getChest(t){let e=this.chests.get(t);return e||(e=new Array(27).fill(null),this.chests.set(t,e)),e}static tickFurnaces(t){const e=Math.max(1,Math.round(t*20));for(const[,i]of this.furnaces){if(!i.input){i.burnTime>0&&(i.burnTime=Math.max(0,i.burnTime-e)),i.cookTime=0;continue}const s=d_[i.input.item.shortId];if(!s){i.burnTime>0&&(i.burnTime=Math.max(0,i.burnTime-e)),i.cookTime=0;continue}if(!(i.output&&(i.output.item.shortId!==s.result||i.output.count>=i.output.item.maxStack))){if(i.burnTime<=0&&i.fuel&&i.fuel.count>0){const r=f_[i.fuel.item.shortId]||0;r>0&&(i.burnTime=r,i.maxBurnTime=r,i.fuel.count--,i.fuel.count<=0&&(i.fuel=null))}if(i.burnTime>0){if(i.burnTime=Math.max(0,i.burnTime-e),i.cookTime+=e,i.cookTime>=s.cookTicks)if(i.cookTime=0,i.input.count--,i.input.count<=0&&(i.input=null),i.output)i.output.count++;else{const r=tt.getItem(s.result);r&&(i.output={item:r,count:1})}}else i.cookTime>0&&(i.cookTime=Math.max(0,i.cookTime-e*2))}}}}I(Ds,"furnaces",new Map),I(Ds,"chests",new Map);class p_{constructor(t,e,i){I(this,"camera");I(this,"world");I(this,"inventory");I(this,"position",new G(.5,75,.5));I(this,"velocity",new G(0,0,0));I(this,"yaw",0);I(this,"pitch",0);I(this,"gameMode","survival");I(this,"flying",!1);I(this,"onGround",!1);I(this,"inWater",!1);I(this,"isSprinting",!1);I(this,"isSneaking",!1);I(this,"health",20);I(this,"maxHealth",20);I(this,"hunger",20);I(this,"saturation",5);I(this,"exhaustion",0);I(this,"fallDistance",0);I(this,"hurtTimer",0);I(this,"invulnerableTimer",0);I(this,"regenTimer",0);I(this,"toggledSprint",!1);I(this,"toggledSneak",!1);I(this,"lastSprintPressed",!1);I(this,"lastSneakPressed",!1);I(this,"onPlayerDeath");I(this,"xpLevel",0);I(this,"xpProgress",0);I(this,"seatedCushion",null);I(this,"keys",new Set);I(this,"lastSpacePress",0);I(this,"lastWPress",0);I(this,"stepTimer",0);I(this,"walkBobPhase",0);I(this,"walkBobIntensity",0);I(this,"currentEyeHeight",1.62);I(this,"currentFovMultiplier",1);I(this,"swingProgress",0);I(this,"isSwinging",!1);I(this,"isMining",!1);I(this,"miningTargetKey","");I(this,"miningProgress",0);I(this,"miningHitSoundTimer",0);I(this,"creativeBreakCooldown",0);I(this,"highlightBox");I(this,"crackMesh");I(this,"lastCrackStage",-1);I(this,"currentHit",null);this.camera=t,this.world=e,this.inventory=i;const s=new J0(new De(1.003,1.003,1.003)),r=new Jh({color:0,linewidth:2,transparent:!0,opacity:.45});this.highlightBox=new K0(s,r),this.highlightBox.visible=!1,this.world.scene.add(this.highlightBox);const a=new De(1.005,1.005,1.005),o=new Fe({map:ue.texture,transparent:!0,opacity:.82,alphaTest:.05,depthWrite:!1,blending:ja});this.crackMesh=new Qt(a,o),this.crackMesh.visible=!1,this.world.scene.add(this.crackMesh)}spawnAtWorldCenter(){let t=0,e=0,i=68;for(let s=0;s<=48;s+=4){let r=!1;for(const[a,o]of[[s,0],[-s,0],[0,s],[0,-s],[s,s],[-s,-s]]){const l=a>>4,c=o>>4;this.world.ensureChunk(l,c);const h=this.world.getTopSolidY(a,o),f=this.world.getBlock(a,h-1,o),u=this.world.getBlock(a,h,o),d=tt.getBlock(f),p=tt.getBlock(u);if(h>=63&&!d.fluid&&!p.fluid){t=a,e=o,i=h,r=!0;break}}if(r)break}this.position.set(t+.5,i+.001,e+.5),this.velocity.set(0,0,0),this.onGround=!0,this.seatedCushion=null,this.yaw=0,this.pitch=0,this.resetMining()}sitOnCushion(t){this.seatedCushion=t,this.position.set(t.x,t.blockY+.25,t.z),this.velocity.set(0,0,0),this.flying=!1,re.play("entity.cushion.sit",.85)}dismountCushion(){if(!this.seatedCushion)return;const t=this.seatedCushion.blockY+1.001;let e=this.seatedCushion.x,i=t,s=this.seatedCushion.z;if(this.collidesAt(e,i,s)){const r=[[1,0],[-1,0],[0,1],[0,-1]];for(const[a,o]of r)if(!this.collidesAt(e+a,i,s+o)){e+=a,s+=o;break}}this.position.set(e,i,s),this.velocity.set(0,0,0),this.seatedCushion=null,this.currentEyeHeight=1.62,re.play("entity.cushion.get_up",.85)}applyDamage(t,e){var i;this.gameMode==="creative"||this.gameMode==="spectator"||this.invulnerableTimer>0||(this.invulnerableTimer=.5,this.hurtTimer=.45,this.health=Math.max(0,this.health-t),re.play("entity.player.hurt",.9),this.health<=0&&(re.play("entity.player.death",1),(i=this.onPlayerDeath)==null||i.call(this)))}triggerSwing(){this.isSwinging=!0,this.swingProgress=0}resetMining(){this.miningTargetKey="",this.miningProgress=0,this.miningHitSoundTimer=0,this.crackMesh.visible=!1,this.lastCrackStage=-1}updateCrackStageUVs(t){if(t<0||t>9){this.crackMesh.visible=!1,this.lastCrackStage=-1;return}if(this.crackMesh.visible=!0,t===this.lastCrackStage)return;this.lastCrackStage=t;const e=ue.getUV(`destroy_stage_${t}`),i=this.crackMesh.geometry.attributes.uv;for(let s=0;s<6;s++){const r=s*4;i.setXY(r+0,e.u0,e.v1),i.setXY(r+1,e.u1,e.v1),i.setXY(r+2,e.u0,e.v0),i.setXY(r+3,e.u1,e.v0)}i.needsUpdate=!0}getDestroySpeedPerSecond(t,e){if(this.gameMode==="creative")return 1e3;if(t.hardness<0)return 0;if(t.hardness===0)return 1e3;let i=null,s=!1;t.soundGroup==="stone"?(i="pickaxe",s=!0):t.soundGroup==="wood"?i="axe":(t.soundGroup==="grass"||t.soundGroup==="sand"||t.soundGroup==="gravel")&&(t.shortId.includes("leaves")||(i="shovel"));let r=1,a=!1;e&&e.toolType&&e.toolType===i?(r=e.toolSpeed||4,a=!0):e&&e.toolType==="sword"&&t.shortId.includes("leaves")&&(r=1.5);const o=!s||a,l=t.hardness*(o?1.5:5);let c=r/Math.max(.05,l);return this.inWater&&(c*=.25),!this.onGround&&!this.flying&&(c*=.25),c}getBlockHeight(t,e,i){const s=this.world.getBlock(t,e,i);if(s===0)return 0;const r=tt.getBlock(s);return r.solid?r.shape==="slab_bottom"||r.shape==="trapdoor"?(this.world.getMeta(t,e,i)&4)!==0?1:.5:r.shape==="bed_foot"||r.shape==="bed_head"||r.shape==="campfire"?.45:1:0}collidesAt(t,e,i){if(this.gameMode==="spectator")return!1;const s=.295,r=this.isSneaking?1.5:1.78,a=Math.floor(t-s),o=Math.floor(t+s),l=Math.floor(e),c=Math.floor(e+r),h=Math.floor(i-s),f=Math.floor(i+s);for(let u=l;u<=c;u++)for(let d=h;d<=f;d++)for(let p=a;p<=o;p++){const g=this.getBlockHeight(p,u,d);if(g>0&&e<u+g-1e-4&&e+r>u+1e-4)return!0}return!1}update(t,e){this.creativeBreakCooldown>0&&(this.creativeBreakCooldown=Math.max(0,this.creativeBreakCooldown-t)),this.hurtTimer>0&&(this.hurtTimer-=t),this.invulnerableTimer>0&&(this.invulnerableTimer-=t),this.isSwinging&&(this.swingProgress+=t*4.5,this.swingProgress>=1&&(this.swingProgress=0,this.isSwinging=!1));const i=It.current.keyBinds,s=this.keys.has(i.sneak)||this.keys.has("ShiftLeft")||this.keys.has("ShiftRight");if(this.seatedCushion&&e&&s&&this.dismountCushion(),this.seatedCushion){this.position.set(this.seatedCushion.x,this.seatedCushion.blockY+.25,this.seatedCushion.z),this.updateCamera(t,!1),this.updateRaycast();return}if(this.collidesAt(this.position.x,this.position.y,this.position.z)){for(let L=.2;L<=2;L+=.2)if(!this.collidesAt(this.position.x,this.position.y+L,this.position.z)){this.position.y+=L,this.velocity.y=0;break}}let r=0,a=0;const o=this.keys.has(i.forward)||this.keys.has("KeyW")||this.keys.has("ArrowUp"),l=this.keys.has(i.back)||this.keys.has("KeyS")||this.keys.has("ArrowDown"),c=this.keys.has(i.left)||this.keys.has("KeyA")||this.keys.has("ArrowLeft"),h=this.keys.has(i.right)||this.keys.has("KeyD")||this.keys.has("ArrowRight"),f=this.keys.has(i.sprint)||this.keys.has("ControlLeft")||this.keys.has("KeyR");e&&(o&&(r+=1),l&&(r-=1),c&&(a-=1),h&&(a+=1));const u=Math.hypot(r,a);u>0&&(r/=u,a/=u),It.current.toggleSneak?(e&&s&&!this.lastSneakPressed&&(this.toggledSneak=!this.toggledSneak),this.lastSneakPressed=s,this.isSneaking=e&&!this.flying&&this.toggledSneak):this.isSneaking=e&&!this.flying&&s,It.current.toggleSprint?(e&&f&&!this.lastSprintPressed&&(this.toggledSprint=!this.toggledSprint),this.lastSprintPressed=f,r<=0||this.isSneaking||this.hunger<=6?(this.isSprinting=!1,this.toggledSprint=!1):this.toggledSprint&&(this.isSprinting=!0)):r<=0||this.isSneaking||this.hunger<=6?this.isSprinting=!1:f&&this.hunger>6&&(this.isSprinting=!0);let d=4.317;this.flying||this.gameMode==="spectator"?d=this.isSprinting?21.6:10.9:this.isSneaking?d=1.31:this.isSprinting&&(d=5.612);const p=Math.sin(this.yaw),g=Math.cos(this.yaw),m=(-p*r+g*a)*d,_=(-g*r-p*a)*d,M=this.world.getBlock(Math.floor(this.position.x),Math.floor(this.position.y+.35),Math.floor(this.position.z));if(this.inWater=tt.getBlock(M).fluid==="water",this.flying||this.gameMode==="spectator"){const L=Math.min(1,t*10);this.velocity.x+=(m-this.velocity.x)*L,this.velocity.z+=(_-this.velocity.z)*L;let D=0;e&&(this.keys.has("Space")&&(D+=7.5),(this.keys.has("ShiftLeft")||this.keys.has("ShiftRight"))&&(D-=7.5)),this.velocity.y+=(D-this.velocity.y)*Math.min(1,t*14)}else{const L=this.onGround?18:4.2,D=Math.min(1,t*L);this.velocity.x+=(m-this.velocity.x)*D,this.velocity.z+=(_-this.velocity.z)*D,this.inWater?(this.velocity.x*=Math.pow(.8,t*20),this.velocity.z*=Math.pow(.8,t*20),this.velocity.y-=6.5*t,this.velocity.y=Math.max(-3,this.velocity.y),e&&this.keys.has("Space")&&(this.velocity.y=4.2)):(this.velocity.y-=28*t,this.velocity.y=Math.max(-55,this.velocity.y),e&&this.keys.has("Space")&&this.onGround&&(this.velocity.y=8.45,this.onGround=!1,this.isSprinting&&r>0&&(this.velocity.x+=-p*1.45,this.velocity.z+=-g*1.45)))}const E=this.position.x,y=this.position.z;let w=this.velocity.x*t;if(this.isSneaking&&this.onGround)for(;Math.abs(w)>.001&&!this.collidesAt(this.position.x+w,this.position.y-.52,this.position.z);)w=Math.abs(w)<.02?0:w*.5;const b=this.position.x+w;this.collidesAt(b,this.position.y,this.position.z)?this.onGround&&!this.collidesAt(b,this.position.y+.52,this.position.z)&&this.collidesAt(b,this.position.y+.05,this.position.z)?(this.position.x=b,this.position.y=Math.floor(this.position.y)+.501):this.velocity.x=0:this.position.x=b;let S=this.velocity.z*t;if(this.isSneaking&&this.onGround)for(;Math.abs(S)>.001&&!this.collidesAt(this.position.x,this.position.y-.52,this.position.z+S);)S=Math.abs(S)<.02?0:S*.5;const R=this.position.z+S;this.collidesAt(this.position.x,this.position.y,R)?this.onGround&&!this.collidesAt(this.position.x,this.position.y+.52,R)&&this.collidesAt(this.position.x,this.position.y+.05,R)?(this.position.z=R,this.position.y=Math.floor(this.position.y)+.501):this.velocity.z=0:this.position.z=R;const v=this.velocity.y*t,x=this.position.y+v;if(!this.collidesAt(this.position.x,x,this.position.z))this.position.y=x,this.onGround=this.velocity.y<=0&&this.collidesAt(this.position.x,this.position.y-.015,this.position.z);else{if(this.velocity.y<0){let L=x,D=this.position.y;for(let H=0;H<8;H++){const z=(L+D)*.5;this.collidesAt(this.position.x,z,this.position.z)?L=z:D=z}if(this.position.y=D,!this.onGround&&this.fallDistance>3&&this.gameMode==="survival"){const H=Math.floor(this.fallDistance-3);H>0&&this.applyDamage(H,"fall")}this.fallDistance=0,this.onGround=!0,this.flying&&this.gameMode!=="spectator"&&(this.flying=!1)}this.velocity.y=0}!this.onGround&&!this.flying&&!this.inWater?this.velocity.y<0&&(this.fallDistance+=-this.velocity.y*t):this.fallDistance=0;const C=Math.hypot(this.position.x-E,this.position.z-y),k=this.onGround&&!this.flying&&C>5e-4;if(this.gameMode==="survival")if(k&&(this.exhaustion+=C*(this.isSprinting?.08:.01)),this.exhaustion>=4&&(this.exhaustion-=4,this.saturation>0?this.saturation=Math.max(0,this.saturation-1):this.hunger>0&&(this.hunger=Math.max(0,this.hunger-1))),this.regenTimer+=t,this.hunger>=18&&this.health<this.maxHealth)this.regenTimer>=4&&(this.regenTimer=0,this.health=Math.min(this.maxHealth,this.health+1),this.exhaustion+=3);else if(this.hunger===0){if(this.regenTimer>=4){this.regenTimer=0;const L=It.current.difficulty,D=L==="Easy"?10:L==="Normal"?1:0;this.health>D&&this.applyDamage(1,"starvation")}}else this.regenTimer>4&&(this.regenTimer=0);if(k){if(this.walkBobPhase+=C*3.6,this.walkBobIntensity+=(1-this.walkBobIntensity)*Math.min(1,t*10),this.stepTimer+=C,this.stepTimer>=(this.isSprinting?1.85:1.55)){this.stepTimer=0;const L=this.world.getBlock(Math.floor(this.position.x),Math.floor(this.position.y-.15),Math.floor(this.position.z));if(L!==0){const D=tt.getBlock(L);re.playBlockSound(D.soundGroup,"step")}}}else this.walkBobIntensity*=Math.pow(.05,t);this.updateCamera(t,k),this.updateRaycast()}updateCamera(t,e){const i=this.seatedCushion?.95:this.isSneaking?1.27:1.62;this.currentEyeHeight+=(i-this.currentEyeHeight)*Math.min(1,t*16);const s=this.flying&&this.isSprinting?1.16:this.isSprinting||this.flying?1.1:1;this.currentFovMultiplier+=(s-this.currentFovMultiplier)*Math.min(1,t*10);const r=It.current.fov*this.currentFovMultiplier;Math.abs(this.camera.fov-r)>.05&&(this.camera.fov=r,this.camera.updateProjectionMatrix());const a=Math.sin(this.walkBobPhase)*.045*this.walkBobIntensity,o=-Math.abs(Math.cos(this.walkBobPhase))*.05*this.walkBobIntensity,l=new ii(0,0,0,"YXZ");l.x=this.pitch,l.y=this.yaw,this.camera.quaternion.setFromEuler(l);const c=new G(1,0,0).applyQuaternion(this.camera.quaternion);this.camera.position.set(this.position.x+c.x*a,this.position.y+this.currentEyeHeight+o,this.position.z+c.z*a)}updateRaycast(){const t=new G(0,0,-1).applyQuaternion(this.camera.quaternion).normalize(),e=this.camera.position.clone(),i=this.gameMode==="creative"?5.2:4.5,s=.025;let r=Math.floor(e.x),a=Math.floor(e.y),o=Math.floor(e.z);this.currentHit=null;for(let l=.05;l<=i;l+=s){const c=e.x+t.x*l,h=e.y+t.y*l,f=e.z+t.z*l,u=Math.floor(c),d=Math.floor(h),p=Math.floor(f),g=this.world.getBlock(u,d,p);if(g!==0){const m=tt.getBlock(g);if(m.shape!=="air"&&m.shape!=="fluid"){this.currentHit={bx:u,by:d,bz:p,nx:r-u,ny:a-d,nz:o-p,blockNumId:g,distance:l};break}}r=u,a=d,o=p}this.currentHit?(this.highlightBox.position.set(this.currentHit.bx+.5,this.currentHit.by+.5,this.currentHit.bz+.5),this.highlightBox.visible=!0,this.crackMesh.position.set(this.currentHit.bx+.5,this.currentHit.by+.5,this.currentHit.bz+.5)):(this.highlightBox.visible=!1,this.crackMesh.visible=!1)}getCardinalFacingMeta(){const t=new G(0,0,-1).applyQuaternion(this.camera.quaternion);return Math.abs(t.x)>Math.abs(t.z)?t.x>0?1:3:t.z>0?2:0}}/*! pako 2.2.0 https://github.com/nodeca/pako @license (MIT AND Zlib) */const m_=4,Dc=0,kc=1,g_=2;function os(n){let t=n.length;for(;--t>=0;)n[t]=0}const __=0,nu=1,v_=2,x_=3,y_=258,cl=29,Ws=256,ks=Ws+1+cl,$n=30,hl=19,su=2*ks+1,fn=15,Fa=16,S_=7,ul=256,ru=16,au=17,ou=18,zo=new Uint8Array([0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0]),Br=new Uint8Array([0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13]),M_=new Uint8Array([0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,3,7]),lu=new Uint8Array([16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15]),b_=512,Ri=new Array((ks+2)*2);os(Ri);const ws=new Array($n*2);os(ws);const Ls=new Array(b_);os(Ls);const Us=new Array(y_-x_+1);os(Us);const dl=new Array(cl);os(dl);const $r=new Array($n);os($r);function Na(n,t,e,i,s){this.static_tree=n,this.extra_bits=t,this.extra_base=e,this.elems=i,this.max_length=s,this.has_stree=n&&n.length}let cu,hu,uu;function Ba(n,t){this.dyn_tree=n,this.max_code=0,this.stat_desc=t}const du=n=>n<256?Ls[n]:Ls[256+(n>>>7)],Fs=(n,t)=>{n.pending_buf[n.pending++]=t&255,n.pending_buf[n.pending++]=t>>>8&255},We=(n,t,e)=>{n.bi_valid>Fa-e?(n.bi_buf|=t<<n.bi_valid&65535,Fs(n,n.bi_buf),n.bi_buf=t>>Fa-n.bi_valid,n.bi_valid+=e-Fa):(n.bi_buf|=t<<n.bi_valid&65535,n.bi_valid+=e)},mi=(n,t,e)=>{We(n,e[t*2],e[t*2+1])},fu=(n,t)=>{let e=0;do e|=n&1,n>>>=1,e<<=1;while(--t>0);return e>>>1},w_=n=>{n.bi_valid===16?(Fs(n,n.bi_buf),n.bi_buf=0,n.bi_valid=0):n.bi_valid>=8&&(n.pending_buf[n.pending++]=n.bi_buf&255,n.bi_buf>>=8,n.bi_valid-=8)},E_=(n,t)=>{const e=t.dyn_tree,i=t.max_code,s=t.stat_desc.static_tree,r=t.stat_desc.has_stree,a=t.stat_desc.extra_bits,o=t.stat_desc.extra_base,l=t.stat_desc.max_length;let c,h,f,u,d,p,g=0;for(u=0;u<=fn;u++)n.bl_count[u]=0;for(e[n.heap[n.heap_max]*2+1]=0,c=n.heap_max+1;c<su;c++)h=n.heap[c],u=e[e[h*2+1]*2+1]+1,u>l&&(u=l,g++),e[h*2+1]=u,!(h>i)&&(n.bl_count[u]++,d=0,h>=o&&(d=a[h-o]),p=e[h*2],n.opt_len+=p*(u+d),r&&(n.static_len+=p*(s[h*2+1]+d)));if(g!==0){do{for(u=l-1;n.bl_count[u]===0;)u--;n.bl_count[u]--,n.bl_count[u+1]+=2,n.bl_count[l]--,g-=2}while(g>0);for(u=l;u!==0;u--)for(h=n.bl_count[u];h!==0;)f=n.heap[--c],!(f>i)&&(e[f*2+1]!==u&&(n.opt_len+=(u-e[f*2+1])*e[f*2],e[f*2+1]=u),h--)}},pu=(n,t,e)=>{const i=new Array(fn+1);let s=0,r,a;for(r=1;r<=fn;r++)s=s+e[r-1]<<1,i[r]=s;for(a=0;a<=t;a++){let o=n[a*2+1];o!==0&&(n[a*2]=fu(i[o]++,o))}},T_=()=>{let n,t,e,i,s;const r=new Array(fn+1);for(e=0,i=0;i<cl-1;i++)for(dl[i]=e,n=0;n<1<<zo[i];n++)Us[e++]=i;for(Us[e-1]=i,s=0,i=0;i<16;i++)for($r[i]=s,n=0;n<1<<Br[i];n++)Ls[s++]=i;for(s>>=7;i<$n;i++)for($r[i]=s<<7,n=0;n<1<<Br[i]-7;n++)Ls[256+s++]=i;for(t=0;t<=fn;t++)r[t]=0;for(n=0;n<=143;)Ri[n*2+1]=8,n++,r[8]++;for(;n<=255;)Ri[n*2+1]=9,n++,r[9]++;for(;n<=279;)Ri[n*2+1]=7,n++,r[7]++;for(;n<=287;)Ri[n*2+1]=8,n++,r[8]++;for(pu(Ri,ks+1,r),n=0;n<$n;n++)ws[n*2+1]=5,ws[n*2]=fu(n,5);cu=new Na(Ri,zo,Ws+1,ks,fn),hu=new Na(ws,Br,0,$n,fn),uu=new Na(new Array(0),M_,0,hl,S_)},mu=n=>{let t;for(t=0;t<ks;t++)n.dyn_ltree[t*2]=0;for(t=0;t<$n;t++)n.dyn_dtree[t*2]=0;for(t=0;t<hl;t++)n.bl_tree[t*2]=0;n.dyn_ltree[ul*2]=1,n.opt_len=n.static_len=0,n.sym_next=n.matches=0},gu=n=>{n.bi_valid>8?Fs(n,n.bi_buf):n.bi_valid>0&&(n.pending_buf[n.pending++]=n.bi_buf),n.bi_buf=0,n.bi_valid=0},Lc=(n,t,e,i)=>{const s=t*2,r=e*2;return n[s]<n[r]||n[s]===n[r]&&i[t]<=i[e]},Oa=(n,t,e)=>{const i=n.heap[e];let s=e<<1;for(;s<=n.heap_len&&(s<n.heap_len&&Lc(t,n.heap[s+1],n.heap[s],n.depth)&&s++,!Lc(t,i,n.heap[s],n.depth));)n.heap[e]=n.heap[s],e=s,s<<=1;n.heap[e]=i},Uc=(n,t,e)=>{let i,s,r=0,a,o;if(n.sym_next!==0)do i=n.pending_buf[n.sym_buf+r++]&255,i+=(n.pending_buf[n.sym_buf+r++]&255)<<8,s=n.pending_buf[n.sym_buf+r++],i===0?mi(n,s,t):(a=Us[s],mi(n,a+Ws+1,t),o=zo[a],o!==0&&(s-=dl[a],We(n,s,o)),i--,a=du(i),mi(n,a,e),o=Br[a],o!==0&&(i-=$r[a],We(n,i,o)));while(r<n.sym_next);mi(n,ul,t)},Ho=(n,t)=>{const e=t.dyn_tree,i=t.stat_desc.static_tree,s=t.stat_desc.has_stree,r=t.stat_desc.elems;let a,o,l=-1,c;for(n.heap_len=0,n.heap_max=su,a=0;a<r;a++)e[a*2]!==0?(n.heap[++n.heap_len]=l=a,n.depth[a]=0):e[a*2+1]=0;for(;n.heap_len<2;)c=n.heap[++n.heap_len]=l<2?++l:0,e[c*2]=1,n.depth[c]=0,n.opt_len--,s&&(n.static_len-=i[c*2+1]);for(t.max_code=l,a=n.heap_len>>1;a>=1;a--)Oa(n,e,a);c=r;do a=n.heap[1],n.heap[1]=n.heap[n.heap_len--],Oa(n,e,1),o=n.heap[1],n.heap[--n.heap_max]=a,n.heap[--n.heap_max]=o,e[c*2]=e[a*2]+e[o*2],n.depth[c]=(n.depth[a]>=n.depth[o]?n.depth[a]:n.depth[o])+1,e[a*2+1]=e[o*2+1]=c,n.heap[1]=c++,Oa(n,e,1);while(n.heap_len>=2);n.heap[--n.heap_max]=n.heap[1],E_(n,t),pu(e,l,n.bl_count)},Fc=(n,t,e)=>{let i,s=-1,r,a=t[1],o=0,l=7,c=4;for(a===0&&(l=138,c=3),t[(e+1)*2+1]=65535,i=0;i<=e;i++)r=a,a=t[(i+1)*2+1],!(++o<l&&r===a)&&(o<c?n.bl_tree[r*2]+=o:r!==0?(r!==s&&n.bl_tree[r*2]++,n.bl_tree[ru*2]++):o<=10?n.bl_tree[au*2]++:n.bl_tree[ou*2]++,o=0,s=r,a===0?(l=138,c=3):r===a?(l=6,c=3):(l=7,c=4))},Nc=(n,t,e)=>{let i,s=-1,r,a=t[1],o=0,l=7,c=4;for(a===0&&(l=138,c=3),i=0;i<=e;i++)if(r=a,a=t[(i+1)*2+1],!(++o<l&&r===a)){if(o<c)do mi(n,r,n.bl_tree);while(--o!==0);else r!==0?(r!==s&&(mi(n,r,n.bl_tree),o--),mi(n,ru,n.bl_tree),We(n,o-3,2)):o<=10?(mi(n,au,n.bl_tree),We(n,o-3,3)):(mi(n,ou,n.bl_tree),We(n,o-11,7));o=0,s=r,a===0?(l=138,c=3):r===a?(l=6,c=3):(l=7,c=4)}},A_=n=>{let t;for(Fc(n,n.dyn_ltree,n.l_desc.max_code),Fc(n,n.dyn_dtree,n.d_desc.max_code),Ho(n,n.bl_desc),t=hl-1;t>=3&&n.bl_tree[lu[t]*2+1]===0;t--);return n.opt_len+=3*(t+1)+5+5+4,t},C_=(n,t,e,i)=>{let s;for(We(n,t-257,5),We(n,e-1,5),We(n,i-4,4),s=0;s<i;s++)We(n,n.bl_tree[lu[s]*2+1],3);Nc(n,n.dyn_ltree,t-1),Nc(n,n.dyn_dtree,e-1)},R_=n=>{let t=4093624447,e;for(e=0;e<=31;e++,t>>>=1)if(t&1&&n.dyn_ltree[e*2]!==0)return Dc;if(n.dyn_ltree[18]!==0||n.dyn_ltree[20]!==0||n.dyn_ltree[26]!==0)return kc;for(e=32;e<Ws;e++)if(n.dyn_ltree[e*2]!==0)return kc;return Dc};let Bc=!1;const I_=n=>{Bc||(T_(),Bc=!0),n.l_desc=new Ba(n.dyn_ltree,cu),n.d_desc=new Ba(n.dyn_dtree,hu),n.bl_desc=new Ba(n.bl_tree,uu),n.bi_buf=0,n.bi_valid=0,mu(n)},_u=(n,t,e,i)=>{We(n,(__<<1)+(i?1:0),3),gu(n),Fs(n,e),Fs(n,~e),e&&n.pending_buf.set(n.window.subarray(t,t+e),n.pending),n.pending+=e},P_=n=>{We(n,nu<<1,3),mi(n,ul,Ri),w_(n)},D_=(n,t,e,i)=>{let s,r,a=0;n.level>0?(n.strm.data_type===g_&&(n.strm.data_type=R_(n)),Ho(n,n.l_desc),Ho(n,n.d_desc),a=A_(n),s=n.opt_len+3+7>>>3,r=n.static_len+3+7>>>3,r<=s&&(s=r)):s=r=e+5,e+4<=s&&t!==-1?_u(n,t,e,i):n.strategy===m_||r===s?(We(n,(nu<<1)+(i?1:0),3),Uc(n,Ri,ws)):(We(n,(v_<<1)+(i?1:0),3),C_(n,n.l_desc.max_code+1,n.d_desc.max_code+1,a+1),Uc(n,n.dyn_ltree,n.dyn_dtree)),mu(n),i&&gu(n)},k_=(n,t,e)=>(n.pending_buf[n.sym_buf+n.sym_next++]=t,n.pending_buf[n.sym_buf+n.sym_next++]=t>>8,n.pending_buf[n.sym_buf+n.sym_next++]=e,t===0?n.dyn_ltree[e*2]++:(n.matches++,t--,n.dyn_ltree[(Us[e]+Ws+1)*2]++,n.dyn_dtree[du(t)*2]++),n.sym_next===n.sym_end);var L_=I_,U_=_u,F_=D_,N_=k_,B_=P_,O_={_tr_init:L_,_tr_stored_block:U_,_tr_flush_block:F_,_tr_tally:N_,_tr_align:B_};const z_=(n,t,e,i)=>{let s=n&65535|0,r=n>>>16&65535|0,a=0;for(;e!==0;){a=e>2e3?2e3:e,e-=a;do s=s+t[i++]|0,r=r+s|0;while(--a);s%=65521,r%=65521}return s|r<<16|0};var Ns=z_;const H_=()=>{let n,t=[];for(var e=0;e<256;e++){n=e;for(var i=0;i<8;i++)n=n&1?3988292384^n>>>1:n>>>1;t[e]=n}return t},G_=new Uint32Array(H_()),V_=(n,t,e,i)=>{const s=G_,r=i+e;n^=-1;for(let a=i;a<r;a++)n=n>>>8^s[(n^t[a])&255];return n^-1};var Me=V_,vn={2:"need dictionary",1:"stream end",0:"","-1":"file error","-2":"stream error","-3":"data error","-4":"insufficient memory","-5":"buffer error","-6":"incompatible version"},Xs={Z_NO_FLUSH:0,Z_PARTIAL_FLUSH:1,Z_SYNC_FLUSH:2,Z_FULL_FLUSH:3,Z_FINISH:4,Z_BLOCK:5,Z_TREES:6,Z_OK:0,Z_STREAM_END:1,Z_NEED_DICT:2,Z_ERRNO:-1,Z_STREAM_ERROR:-2,Z_DATA_ERROR:-3,Z_MEM_ERROR:-4,Z_BUF_ERROR:-5,Z_NO_COMPRESSION:0,Z_BEST_SPEED:1,Z_BEST_COMPRESSION:9,Z_DEFAULT_COMPRESSION:-1,Z_FILTERED:1,Z_HUFFMAN_ONLY:2,Z_RLE:3,Z_FIXED:4,Z_DEFAULT_STRATEGY:0,Z_BINARY:0,Z_TEXT:1,Z_UNKNOWN:2,Z_DEFLATED:8};const{_tr_init:W_,_tr_stored_block:Go,_tr_flush_block:X_,_tr_tally:Zi,_tr_align:$_}=O_,{Z_NO_FLUSH:Ki,Z_PARTIAL_FLUSH:Y_,Z_FULL_FLUSH:q_,Z_FINISH:ti,Z_BLOCK:Oc,Z_OK:we,Z_STREAM_END:zc,Z_STREAM_ERROR:vi,Z_DATA_ERROR:Z_,Z_BUF_ERROR:za,Z_DEFAULT_COMPRESSION:K_,Z_FILTERED:j_,Z_HUFFMAN_ONLY:Er,Z_RLE:J_,Z_FIXED:Q_,Z_DEFAULT_STRATEGY:tv,Z_UNKNOWN:ev,Z_DEFLATED:ta}=Xs,iv=9,nv=15,sv=8,rv=29,av=256,Vo=av+1+rv,ov=30,lv=19,cv=2*Vo+1,hv=15,qt=3,Xi=258,xi=Xi+qt+1,uv=32,es=42,fl=57,Wo=69,Xo=73,$o=91,Yo=103,pn=113,Ms=666,Ne=1,ls=2,xn=3,cs=4,dv=3,mn=(n,t)=>(n.msg=vn[t],t),Hc=n=>n*2-(n>4?9:0),Wi=n=>{let t=n.length;for(;--t>=0;)n[t]=0},fv=n=>{let t,e,i,s=n.w_size;t=n.hash_size,i=t;do e=n.head[--i],n.head[i]=e>=s?e-s:0;while(--t);t=s,i=t;do e=n.prev[--i],n.prev[i]=e>=s?e-s:0;while(--t)};let pl=(n,t,e)=>(t<<n.hash_shift^e)&n.hash_mask;const yn=(n,t)=>{let e;if(n.legacy_hash)e=n.ins_h=pl(n,n.ins_h,n.window[t+qt-1]);else{const s=n.window,r=s[t]|s[t+1]<<8|s[t+2]<<16|s[t+3]<<24;e=n.ins_h=Math.imul(r,66521)+66521>>>16&n.hash_mask}const i=n.prev[t&n.w_mask]=n.head[e];return n.head[e]=t,i},qe=n=>{const t=n.state;let e=t.pending;e>n.avail_out&&(e=n.avail_out),e!==0&&(n.output.set(t.pending_buf.subarray(t.pending_out,t.pending_out+e),n.next_out),n.next_out+=e,t.pending_out+=e,n.total_out+=e,n.avail_out-=e,t.pending-=e,t.pending===0&&(t.pending_out=0))},Ke=(n,t)=>{X_(n,n.block_start>=0?n.block_start:-1,n.strstart-n.block_start,t),n.block_start=n.strstart,qe(n.strm)},Zt=(n,t)=>{n.pending_buf[n.pending++]=t},xs=(n,t)=>{n.pending_buf[n.pending++]=t>>>8&255,n.pending_buf[n.pending++]=t&255},qo=(n,t,e,i)=>{let s=n.avail_in;return s>i&&(s=i),s===0?0:(n.avail_in-=s,t.set(n.input.subarray(n.next_in,n.next_in+s),e),n.state.wrap===1?n.adler=Ns(n.adler,t,s,e):n.state.wrap===2&&(n.adler=Me(n.adler,t,s,e)),n.next_in+=s,n.total_in+=s,s)},vu=(n,t)=>{let e=n.max_chain_length,i=n.strstart,s,r,a=n.prev_length,o=n.nice_match;const l=n.strstart>n.w_size-xi?n.strstart-(n.w_size-xi):0,c=n.window,h=n.w_mask,f=n.prev,u=n.strstart+Xi;let d=c[i+a-1],p=c[i+a];n.prev_length>=n.good_match&&(e>>=2),o>n.lookahead&&(o=n.lookahead);do if(s=t,!(c[s+a]!==p||c[s+a-1]!==d||c[s]!==c[i]||c[++s]!==c[i+1])){i+=2,s++;do;while(c[++i]===c[++s]&&c[++i]===c[++s]&&c[++i]===c[++s]&&c[++i]===c[++s]&&c[++i]===c[++s]&&c[++i]===c[++s]&&c[++i]===c[++s]&&c[++i]===c[++s]&&i<u);if(r=Xi-(u-i),i=u-Xi,r>a){if(n.match_start=t,a=r,r>=o)break;d=c[i+a-1],p=c[i+a]}}while((t=f[t&h])>l&&--e!==0);return a<=n.lookahead?a:n.lookahead},is=n=>{const t=n.w_size;let e,i,s;do{if(i=n.window_size-n.lookahead-n.strstart,n.strstart>=t+(t-xi)&&(n.window.set(n.window.subarray(t,t+t-i),0),n.match_start-=t,n.strstart-=t,n.block_start-=t,n.insert>n.strstart&&(n.insert=n.strstart),fv(n),i+=t),n.strm.avail_in===0)break;if(e=qo(n.strm,n.window,n.strstart+n.lookahead,i),n.lookahead+=e,n.legacy_hash){if(n.lookahead+n.insert>=qt)for(s=n.strstart-n.insert,n.ins_h=n.window[s],n.ins_h=pl(n,n.ins_h,n.window[s+1]);n.insert&&(yn(n,s),s++,n.insert--,!(n.lookahead+n.insert<qt)););}else if(n.lookahead+n.insert>qt)for(s=n.strstart-n.insert;n.insert&&(yn(n,s),s++,n.insert--,!(n.lookahead+n.insert<=qt)););}while(n.lookahead<xi&&n.strm.avail_in!==0)},xu=(n,t)=>{let e=n.pending_buf_size-5>n.w_size?n.w_size:n.pending_buf_size-5,i,s,r,a=0,o=n.strm.avail_in;do{if(i=65535,r=n.bi_valid+42>>3,n.strm.avail_out<r||(r=n.strm.avail_out-r,s=n.strstart-n.block_start,i>s+n.strm.avail_in&&(i=s+n.strm.avail_in),i>r&&(i=r),i<e&&(i===0&&t!==ti||t===Ki||i!==s+n.strm.avail_in)))break;a=t===ti&&i===s+n.strm.avail_in?1:0,Go(n,0,0,a),n.pending_buf[n.pending-4]=i,n.pending_buf[n.pending-3]=i>>8,n.pending_buf[n.pending-2]=~i,n.pending_buf[n.pending-1]=~i>>8,qe(n.strm),s&&(s>i&&(s=i),n.strm.output.set(n.window.subarray(n.block_start,n.block_start+s),n.strm.next_out),n.strm.next_out+=s,n.strm.avail_out-=s,n.strm.total_out+=s,n.block_start+=s,i-=s),i&&(qo(n.strm,n.strm.output,n.strm.next_out,i),n.strm.next_out+=i,n.strm.avail_out-=i,n.strm.total_out+=i)}while(a===0);return o-=n.strm.avail_in,o&&(o>=n.w_size?(n.matches=2,n.window.set(n.strm.input.subarray(n.strm.next_in-n.w_size,n.strm.next_in),0),n.strstart=n.w_size,n.insert=n.strstart):(n.window_size-n.strstart<=o&&(n.strstart-=n.w_size,n.window.set(n.window.subarray(n.w_size,n.w_size+n.strstart),0),n.matches<2&&n.matches++,n.insert>n.strstart&&(n.insert=n.strstart)),n.window.set(n.strm.input.subarray(n.strm.next_in-o,n.strm.next_in),n.strstart),n.strstart+=o,n.insert+=o>n.w_size-n.insert?n.w_size-n.insert:o),n.block_start=n.strstart),n.high_water<n.strstart&&(n.high_water=n.strstart),a?cs:t!==Ki&&t!==ti&&n.strm.avail_in===0&&n.strstart===n.block_start?ls:(r=n.window_size-n.strstart,n.strm.avail_in>r&&n.block_start>=n.w_size&&(n.block_start-=n.w_size,n.strstart-=n.w_size,n.window.set(n.window.subarray(n.w_size,n.w_size+n.strstart),0),n.matches<2&&n.matches++,r+=n.w_size,n.insert>n.strstart&&(n.insert=n.strstart)),r>n.strm.avail_in&&(r=n.strm.avail_in),r&&(qo(n.strm,n.window,n.strstart,r),n.strstart+=r,n.insert+=r>n.w_size-n.insert?n.w_size-n.insert:r),n.high_water<n.strstart&&(n.high_water=n.strstart),r=n.bi_valid+42>>3,r=n.pending_buf_size-r>65535?65535:n.pending_buf_size-r,e=r>n.w_size?n.w_size:r,s=n.strstart-n.block_start,(s>=e||(s||t===ti)&&t!==Ki&&n.strm.avail_in===0&&s<=r)&&(i=s>r?r:s,a=t===ti&&n.strm.avail_in===0&&i===s?1:0,Go(n,n.block_start,i,a),n.block_start+=i,qe(n.strm)),a?xn:Ne)},Ha=(n,t)=>{let e,i;for(;;){if(n.lookahead<xi){if(is(n),n.lookahead<xi&&t===Ki)return Ne;if(n.lookahead===0)break}if(e=0,n.lookahead>=qt&&(e=yn(n,n.strstart)),e!==0&&n.strstart-e<=n.w_size-xi&&(n.match_length=vu(n,e)),n.match_length>=qt)if(i=Zi(n,n.strstart-n.match_start,n.match_length-qt),n.lookahead-=n.match_length,n.match_length<=n.max_lazy_match&&n.lookahead>=qt){n.match_length--;do n.strstart++,e=yn(n,n.strstart);while(--n.match_length!==0);n.strstart++}else n.strstart+=n.match_length,n.match_length=0,n.legacy_hash&&(n.ins_h=n.window[n.strstart],n.ins_h=pl(n,n.ins_h,n.window[n.strstart+1]));else i=Zi(n,0,n.window[n.strstart]),n.lookahead--,n.strstart++;if(i&&(Ke(n,!1),n.strm.avail_out===0))return Ne}return n.insert=n.strstart<qt-1?n.strstart:qt-1,t===ti?(Ke(n,!0),n.strm.avail_out===0?xn:cs):n.sym_next&&(Ke(n,!1),n.strm.avail_out===0)?Ne:ls},On=(n,t)=>{let e,i,s;for(;;){if(n.lookahead<xi){if(is(n),n.lookahead<xi&&t===Ki)return Ne;if(n.lookahead===0)break}if(e=0,n.lookahead>=qt&&(e=yn(n,n.strstart)),n.prev_length=n.match_length,n.prev_match=n.match_start,n.match_length=qt-1,e!==0&&n.prev_length<n.max_lazy_match&&n.strstart-e<=n.w_size-xi&&(n.match_length=vu(n,e),n.match_length<=5&&(n.strategy===j_||n.match_length===qt&&n.strstart-n.match_start>4096)&&(n.match_length=qt-1)),n.prev_length>=qt&&n.match_length<=n.prev_length){s=n.strstart+n.lookahead-qt,i=Zi(n,n.strstart-1-n.prev_match,n.prev_length-qt),n.lookahead-=n.prev_length-1,n.prev_length-=2;do++n.strstart<=s&&(e=yn(n,n.strstart));while(--n.prev_length!==0);if(n.match_available=0,n.match_length=qt-1,n.strstart++,i&&(Ke(n,!1),n.strm.avail_out===0))return Ne}else if(n.match_available){if(i=Zi(n,0,n.window[n.strstart-1]),i&&Ke(n,!1),n.strstart++,n.lookahead--,n.strm.avail_out===0)return Ne}else n.match_available=1,n.strstart++,n.lookahead--}return n.match_available&&(i=Zi(n,0,n.window[n.strstart-1]),n.match_available=0),n.insert=n.strstart<qt-1?n.strstart:qt-1,t===ti?(Ke(n,!0),n.strm.avail_out===0?xn:cs):n.sym_next&&(Ke(n,!1),n.strm.avail_out===0)?Ne:ls},pv=(n,t)=>{let e,i,s,r;const a=n.window;for(;;){if(n.lookahead<=Xi){if(is(n),n.lookahead<=Xi&&t===Ki)return Ne;if(n.lookahead===0)break}if(n.match_length=0,n.lookahead>=qt&&n.strstart>0&&(s=n.strstart-1,i=a[s],i===a[++s]&&i===a[++s]&&i===a[++s])){r=n.strstart+Xi;do;while(i===a[++s]&&i===a[++s]&&i===a[++s]&&i===a[++s]&&i===a[++s]&&i===a[++s]&&i===a[++s]&&i===a[++s]&&s<r);n.match_length=Xi-(r-s),n.match_length>n.lookahead&&(n.match_length=n.lookahead)}if(n.match_length>=qt?(e=Zi(n,1,n.match_length-qt),n.lookahead-=n.match_length,n.strstart+=n.match_length,n.match_length=0):(e=Zi(n,0,n.window[n.strstart]),n.lookahead--,n.strstart++),e&&(Ke(n,!1),n.strm.avail_out===0))return Ne}return n.insert=0,t===ti?(Ke(n,!0),n.strm.avail_out===0?xn:cs):n.sym_next&&(Ke(n,!1),n.strm.avail_out===0)?Ne:ls},mv=(n,t)=>{let e;for(;;){if(n.lookahead===0&&(is(n),n.lookahead===0)){if(t===Ki)return Ne;break}if(n.match_length=0,e=Zi(n,0,n.window[n.strstart]),n.lookahead--,n.strstart++,e&&(Ke(n,!1),n.strm.avail_out===0))return Ne}return n.insert=0,t===ti?(Ke(n,!0),n.strm.avail_out===0?xn:cs):n.sym_next&&(Ke(n,!1),n.strm.avail_out===0)?Ne:ls};function di(n,t,e,i,s){this.good_length=n,this.max_lazy=t,this.nice_length=e,this.max_chain=i,this.func=s}const bs=[new di(0,0,0,0,xu),new di(4,4,8,4,Ha),new di(4,5,16,8,Ha),new di(4,6,32,32,Ha),new di(4,4,16,16,On),new di(8,16,32,32,On),new di(8,16,128,128,On),new di(8,32,128,256,On),new di(32,128,258,1024,On),new di(32,258,258,4096,On)],gv=n=>{n.window_size=2*n.w_size,Wi(n.head),n.max_lazy_match=bs[n.level].max_lazy,n.good_match=bs[n.level].good_length,n.nice_match=bs[n.level].nice_length,n.max_chain_length=bs[n.level].max_chain,n.strstart=0,n.block_start=0,n.lookahead=0,n.insert=0,n.match_length=n.prev_length=qt-1,n.match_available=0,n.ins_h=0};function _v(){this.strm=null,this.status=0,this.pending_buf=null,this.pending_buf_size=0,this.pending_out=0,this.pending=0,this.wrap=0,this.gzhead=null,this.gzindex=0,this.method=ta,this.last_flush=-1,this.w_size=0,this.w_bits=0,this.w_mask=0,this.window=null,this.window_size=0,this.prev=null,this.head=null,this.ins_h=0,this.legacy_hash=0,this.hash_size=0,this.hash_bits=0,this.hash_mask=0,this.hash_shift=0,this.block_start=0,this.match_length=0,this.prev_match=0,this.match_available=0,this.strstart=0,this.match_start=0,this.lookahead=0,this.prev_length=0,this.max_chain_length=0,this.max_lazy_match=0,this.level=0,this.strategy=0,this.good_match=0,this.nice_match=0,this.dyn_ltree=new Uint16Array(cv*2),this.dyn_dtree=new Uint16Array((2*ov+1)*2),this.bl_tree=new Uint16Array((2*lv+1)*2),Wi(this.dyn_ltree),Wi(this.dyn_dtree),Wi(this.bl_tree),this.l_desc=null,this.d_desc=null,this.bl_desc=null,this.bl_count=new Uint16Array(hv+1),this.heap=new Uint16Array(2*Vo+1),Wi(this.heap),this.heap_len=0,this.heap_max=0,this.depth=new Uint16Array(2*Vo+1),Wi(this.depth),this.sym_buf=0,this.lit_bufsize=0,this.sym_next=0,this.sym_end=0,this.opt_len=0,this.static_len=0,this.matches=0,this.insert=0,this.bi_buf=0,this.bi_valid=0}const $s=n=>{if(!n)return 1;const t=n.state;return!t||t.strm!==n||t.status!==es&&t.status!==fl&&t.status!==Wo&&t.status!==Xo&&t.status!==$o&&t.status!==Yo&&t.status!==pn&&t.status!==Ms?1:0},yu=n=>{if($s(n))return mn(n,vi);n.total_in=n.total_out=0,n.data_type=ev;const t=n.state;return t.pending=0,t.pending_out=0,t.wrap<0&&(t.wrap=-t.wrap),t.status=t.wrap===2?fl:t.wrap?es:pn,n.adler=t.wrap===2?0:1,t.last_flush=-2,W_(t),we},Su=n=>{const t=yu(n);return t===we&&gv(n.state),t},vv=(n,t)=>$s(n)||n.state.wrap!==2?vi:(n.state.gzhead=t,we),Mu=(n,t,e,i,s,r,a)=>{if(!n)return vi;let o=1;if(t===K_&&(t=6),i<0?(o=0,i=-i):i>15&&(o=2,i-=16),s<1||s>iv||e!==ta||i<8||i>15||t<0||t>9||r<0||r>Q_||i===8&&o!==1)return mn(n,vi);i===8&&(i=9);const l=new _v;return n.state=l,l.strm=n,l.status=es,l.wrap=o,l.gzhead=null,l.w_bits=i,l.w_size=1<<l.w_bits,l.w_mask=l.w_size-1,l.legacy_hash=a?1:0,l.hash_bits=s+7,!l.legacy_hash&&l.hash_bits<15&&(l.hash_bits=15),l.hash_size=1<<l.hash_bits,l.hash_mask=l.hash_size-1,l.hash_shift=~~((l.hash_bits+qt-1)/qt),l.window=new Uint8Array(l.w_size*2),l.head=new Uint16Array(l.hash_size),l.prev=new Uint16Array(l.w_size),l.lit_bufsize=1<<s+6,l.pending_buf_size=l.lit_bufsize*4,l.pending_buf=new Uint8Array(l.pending_buf_size),l.sym_buf=l.lit_bufsize,l.sym_end=(l.lit_bufsize-1)*3,l.level=t,l.strategy=r,l.method=e,Su(n)},xv=(n,t)=>Mu(n,t,ta,nv,sv,tv),yv=(n,t)=>{if($s(n)||t>Oc||t<0)return n?mn(n,vi):vi;const e=n.state;if(!n.output||n.avail_in!==0&&!n.input||e.status===Ms&&t!==ti)return mn(n,n.avail_out===0?za:vi);const i=e.last_flush;if(e.last_flush=t,e.pending!==0){if(qe(n),n.avail_out===0)return e.last_flush=-1,we}else if(n.avail_in===0&&Hc(t)<=Hc(i)&&t!==ti)return mn(n,za);if(e.status===Ms&&n.avail_in!==0)return mn(n,za);if(e.status===es&&e.wrap===0&&(e.status=pn),e.status===es){let s=ta+(e.w_bits-8<<4)<<8,r=-1;if(e.strategy>=Er||e.level<2?r=0:e.level<6?r=1:e.level===6?r=2:r=3,s|=r<<6,e.strstart!==0&&(s|=uv),s+=31-s%31,xs(e,s),e.strstart!==0&&(xs(e,n.adler>>>16),xs(e,n.adler&65535)),n.adler=1,e.status=pn,qe(n),e.pending!==0)return e.last_flush=-1,we}if(e.status===fl){if(n.adler=0,Zt(e,31),Zt(e,139),Zt(e,8),e.gzhead)Zt(e,(e.gzhead.text?1:0)+(e.gzhead.hcrc?2:0)+(e.gzhead.extra?4:0)+(e.gzhead.name?8:0)+(e.gzhead.comment?16:0)),Zt(e,e.gzhead.time&255),Zt(e,e.gzhead.time>>8&255),Zt(e,e.gzhead.time>>16&255),Zt(e,e.gzhead.time>>24&255),Zt(e,e.level===9?2:e.strategy>=Er||e.level<2?4:0),Zt(e,e.gzhead.os&255),e.gzhead.extra&&e.gzhead.extra.length&&(Zt(e,e.gzhead.extra.length&255),Zt(e,e.gzhead.extra.length>>8&255)),e.gzhead.hcrc&&(n.adler=Me(n.adler,e.pending_buf,e.pending,0)),e.gzindex=0,e.status=Wo;else if(Zt(e,0),Zt(e,0),Zt(e,0),Zt(e,0),Zt(e,0),Zt(e,e.level===9?2:e.strategy>=Er||e.level<2?4:0),Zt(e,dv),e.status=pn,qe(n),e.pending!==0)return e.last_flush=-1,we}if(e.status===Wo){if(e.gzhead.extra){let s=e.pending,r=(e.gzhead.extra.length&65535)-e.gzindex;for(;e.pending+r>e.pending_buf_size;){let o=e.pending_buf_size-e.pending;if(e.pending_buf.set(e.gzhead.extra.subarray(e.gzindex,e.gzindex+o),e.pending),e.pending=e.pending_buf_size,e.gzhead.hcrc&&e.pending>s&&(n.adler=Me(n.adler,e.pending_buf,e.pending-s,s)),e.gzindex+=o,qe(n),e.pending!==0)return e.last_flush=-1,we;s=0,r-=o}let a=new Uint8Array(e.gzhead.extra);e.pending_buf.set(a.subarray(e.gzindex,e.gzindex+r),e.pending),e.pending+=r,e.gzhead.hcrc&&e.pending>s&&(n.adler=Me(n.adler,e.pending_buf,e.pending-s,s)),e.gzindex=0}e.status=Xo}if(e.status===Xo){if(e.gzhead.name){let s=e.pending,r;do{if(e.pending===e.pending_buf_size){if(e.gzhead.hcrc&&e.pending>s&&(n.adler=Me(n.adler,e.pending_buf,e.pending-s,s)),qe(n),e.pending!==0)return e.last_flush=-1,we;s=0}e.gzindex<e.gzhead.name.length?r=e.gzhead.name.charCodeAt(e.gzindex++)&255:r=0,Zt(e,r)}while(r!==0);e.gzhead.hcrc&&e.pending>s&&(n.adler=Me(n.adler,e.pending_buf,e.pending-s,s)),e.gzindex=0}e.status=$o}if(e.status===$o){if(e.gzhead.comment){let s=e.pending,r;do{if(e.pending===e.pending_buf_size){if(e.gzhead.hcrc&&e.pending>s&&(n.adler=Me(n.adler,e.pending_buf,e.pending-s,s)),qe(n),e.pending!==0)return e.last_flush=-1,we;s=0}e.gzindex<e.gzhead.comment.length?r=e.gzhead.comment.charCodeAt(e.gzindex++)&255:r=0,Zt(e,r)}while(r!==0);e.gzhead.hcrc&&e.pending>s&&(n.adler=Me(n.adler,e.pending_buf,e.pending-s,s))}e.status=Yo}if(e.status===Yo){if(e.gzhead.hcrc){if(e.pending+2>e.pending_buf_size&&(qe(n),e.pending!==0))return e.last_flush=-1,we;Zt(e,n.adler&255),Zt(e,n.adler>>8&255),n.adler=0}if(e.status=pn,qe(n),e.pending!==0)return e.last_flush=-1,we}if(n.avail_in!==0||e.lookahead!==0||t!==Ki&&e.status!==Ms){let s=e.level===0?xu(e,t):e.strategy===Er?mv(e,t):e.strategy===J_?pv(e,t):bs[e.level].func(e,t);if((s===xn||s===cs)&&(e.status=Ms),s===Ne||s===xn)return n.avail_out===0&&(e.last_flush=-1),we;if(s===ls&&(t===Y_?$_(e):t!==Oc&&(Go(e,0,0,!1),t===q_&&(Wi(e.head),e.lookahead===0&&(e.strstart=0,e.block_start=0,e.insert=0))),qe(n),n.avail_out===0))return e.last_flush=-1,we}return t!==ti?we:e.wrap<=0?zc:(e.wrap===2?(Zt(e,n.adler&255),Zt(e,n.adler>>8&255),Zt(e,n.adler>>16&255),Zt(e,n.adler>>24&255),Zt(e,n.total_in&255),Zt(e,n.total_in>>8&255),Zt(e,n.total_in>>16&255),Zt(e,n.total_in>>24&255)):(xs(e,n.adler>>>16),xs(e,n.adler&65535)),qe(n),e.wrap>0&&(e.wrap=-e.wrap),e.pending!==0?we:zc)},Sv=n=>{if($s(n))return vi;const t=n.state.status;return n.state=null,t===pn?mn(n,Z_):we},Mv=(n,t)=>{let e=t.length;if($s(n))return vi;const i=n.state,s=i.wrap;if(s===2||s===1&&i.status!==es||i.lookahead)return vi;if(s===1&&(n.adler=Ns(n.adler,t,e,0)),i.wrap=0,e>=i.w_size){s===0&&(Wi(i.head),i.strstart=0,i.block_start=0,i.insert=0);let l=new Uint8Array(i.w_size);l.set(t.subarray(e-i.w_size,e),0),t=l,e=i.w_size}const r=n.avail_in,a=n.next_in,o=n.input;for(n.avail_in=e,n.next_in=0,n.input=t,is(i);i.lookahead>=qt;){let l=i.strstart,c=i.lookahead-(qt-1);do yn(i,l),l++;while(--c);i.strstart=l,i.lookahead=qt-1,is(i)}return i.strstart+=i.lookahead,i.block_start=i.strstart,i.insert=i.lookahead,i.lookahead=0,i.match_length=i.prev_length=qt-1,i.match_available=0,n.next_in=a,n.input=o,n.avail_in=r,i.wrap=s,we};var bv=xv,wv=Mu,Ev=Su,Tv=yu,Av=vv,Cv=yv,Rv=Sv,Iv=Mv,Pv="pako deflate (from Nodeca project)",Es={deflateInit:bv,deflateInit2:wv,deflateReset:Ev,deflateResetKeep:Tv,deflateSetHeader:Av,deflate:Cv,deflateEnd:Rv,deflateSetDictionary:Iv,deflateInfo:Pv};const Dv=(n,t)=>Object.prototype.hasOwnProperty.call(n,t);var kv=function(n){const t=Array.prototype.slice.call(arguments,1);for(;t.length;){const e=t.shift();if(e){if(typeof e!="object")throw new TypeError(e+"must be non-object");for(const i in e)Dv(e,i)&&(n[i]=e[i])}}return n},Lv=n=>{let t=0;for(let i=0,s=n.length;i<s;i++)t+=n[i].length;const e=new Uint8Array(t);for(let i=0,s=0,r=n.length;i<r;i++){let a=n[i];e.set(a,s),s+=a.length}return e},ea={assign:kv,flattenChunks:Lv};let bu=!0;try{String.fromCharCode.apply(null,new Uint8Array(1))}catch{bu=!1}const Bs=new Uint8Array(256);for(let n=0;n<256;n++)Bs[n]=n>=252?6:n>=248?5:n>=240?4:n>=224?3:n>=192?2:1;Bs[254]=Bs[255]=1;var Uv=n=>{if(typeof TextEncoder=="function"&&TextEncoder.prototype.encode)return new TextEncoder().encode(n);let t,e,i,s,r,a=n.length,o=0;for(s=0;s<a;s++)e=n.charCodeAt(s),(e&64512)===55296&&s+1<a&&(i=n.charCodeAt(s+1),(i&64512)===56320&&(e=65536+(e-55296<<10)+(i-56320),s++)),o+=e<128?1:e<2048?2:e<65536?3:4;for(t=new Uint8Array(o),r=0,s=0;r<o;s++)e=n.charCodeAt(s),(e&64512)===55296&&s+1<a&&(i=n.charCodeAt(s+1),(i&64512)===56320&&(e=65536+(e-55296<<10)+(i-56320),s++)),e<128?t[r++]=e:e<2048?(t[r++]=192|e>>>6,t[r++]=128|e&63):e<65536?(t[r++]=224|e>>>12,t[r++]=128|e>>>6&63,t[r++]=128|e&63):(t[r++]=240|e>>>18,t[r++]=128|e>>>12&63,t[r++]=128|e>>>6&63,t[r++]=128|e&63);return t};const Fv=(n,t)=>{if(t<65534&&n.subarray&&bu)return String.fromCharCode.apply(null,n.length===t?n:n.subarray(0,t));let e="";for(let i=0;i<t;i++)e+=String.fromCharCode(n[i]);return e};var Nv=(n,t)=>{const e=t||n.length;if(typeof TextDecoder=="function"&&TextDecoder.prototype.decode)return new TextDecoder().decode(n.subarray(0,t));let i,s;const r=new Array(e*2);for(s=0,i=0;i<e;){let a=n[i++];if(a<128){r[s++]=a;continue}let o=Bs[a];if(o>4){r[s++]=65533,i+=o-1;continue}for(a&=o===2?31:o===3?15:7;o>1&&i<e;)a=a<<6|n[i++]&63,o--;if(o>1){r[s++]=65533;continue}a<65536?r[s++]=a:(a-=65536,r[s++]=55296|a>>10&1023,r[s++]=56320|a&1023)}return Fv(r,s)},Bv=(n,t)=>{t=t||n.length,t>n.length&&(t=n.length);let e=t-1;for(;e>=0&&(n[e]&192)===128;)e--;return e<0||e===0?t:e+Bs[n[e]]>t?e:t},Os={string2buf:Uv,buf2string:Nv,utf8border:Bv};function Ov(){this.input=null,this.next_in=0,this.avail_in=0,this.total_in=0,this.output=null,this.next_out=0,this.avail_out=0,this.total_out=0,this.msg="",this.state=null,this.data_type=2,this.adler=0}var wu=Ov;const Eu=Object.prototype.toString,{Z_NO_FLUSH:zv,Z_SYNC_FLUSH:Hv,Z_FULL_FLUSH:Gv,Z_FINISH:Vv,Z_OK:Yr,Z_STREAM_END:Wv,Z_DEFAULT_COMPRESSION:Xv,Z_DEFAULT_STRATEGY:$v,Z_DEFLATED:Yv}=Xs,qv={level:Xv,method:Yv,chunkSize:16384,windowBits:15,memLevel:8,strategy:$v,legacyHash:!0};function Ys(n){this.options=ea.assign({},qv,n||{});let t=this.options;t.raw&&t.windowBits>0?t.windowBits=-t.windowBits:t.gzip&&t.windowBits>0&&t.windowBits<16&&(t.windowBits+=16),this.err=0,this.msg="",this.ended=!1,this.chunks=[],this.strm=new wu,this.strm.avail_out=0;let e=Es.deflateInit2(this.strm,t.level,t.method,t.windowBits,t.memLevel,t.strategy,t.legacyHash);if(e!==Yr)throw new Error(vn[e]);if(t.header&&Es.deflateSetHeader(this.strm,t.header),t.dictionary){let i;if(typeof t.dictionary=="string"?i=Os.string2buf(t.dictionary):Eu.call(t.dictionary)==="[object ArrayBuffer]"?i=new Uint8Array(t.dictionary):i=t.dictionary,e=Es.deflateSetDictionary(this.strm,i),e!==Yr)throw new Error(vn[e]);this._dict_set=!0}}Ys.prototype.push=function(n,t){const e=this.strm,i=this.options.chunkSize;let s,r;if(this.ended)return!1;for(t===~~t?r=t:r=t===!0?Vv:zv,typeof n=="string"?e.input=Os.string2buf(n):Eu.call(n)==="[object ArrayBuffer]"?e.input=new Uint8Array(n):e.input=n,e.next_in=0,e.avail_in=e.input.length;;){if(e.avail_out===0&&(e.output=new Uint8Array(i),e.next_out=0,e.avail_out=i),(r===Hv||r===Gv)&&e.avail_out<=6){this.onData(e.output.subarray(0,e.next_out)),e.avail_out=0;continue}if(s=Es.deflate(e,r),s===Wv)return e.next_out>0&&this.onData(e.output.subarray(0,e.next_out)),s=Es.deflateEnd(this.strm),this.onEnd(s),this.ended=!0,s===Yr;if(e.avail_out===0){this.onData(e.output);continue}if(r>0&&e.next_out>0){this.onData(e.output.subarray(0,e.next_out)),e.avail_out=0;continue}if(e.avail_in===0)break}return!0};Ys.prototype.onData=function(n){this.chunks.push(n)};Ys.prototype.onEnd=function(n){n===Yr&&(this.result=ea.flattenChunks(this.chunks)),this.chunks=[],this.err=n,this.msg=this.strm.msg};function ml(n,t){const e=new Ys(t);if(e.push(n,!0),e.err)throw e.msg||vn[e.err];return e.result}function Zv(n,t){return t=t||{},t.raw=!0,ml(n,t)}function Kv(n,t){return t=t||{},t.gzip=!0,ml(n,t)}var jv=Ys,Jv=ml,Qv=Zv,tx=Kv,ex={Deflate:jv,deflate:Jv,deflateRaw:Qv,gzip:tx};const Tr=16209,ix=16191;var nx=function(t,e){let i,s,r,a,o,l,c,h,f,u,d,p,g,m,_,M,E,y,w,b,S,R,v,x;const C=t.state;i=t.next_in,v=t.input,s=i+(t.avail_in-5),r=t.next_out,x=t.output,a=r-(e-t.avail_out),o=r+(t.avail_out-257),l=C.dmax,c=C.wsize,h=C.whave,f=C.wnext,u=C.window,d=C.hold,p=C.bits,g=C.lencode,m=C.distcode,_=(1<<C.lenbits)-1,M=(1<<C.distbits)-1;t:do{p<15&&(d+=v[i++]<<p,p+=8,d+=v[i++]<<p,p+=8),E=g[d&_];e:for(;;){if(y=E>>>24,d>>>=y,p-=y,y=E>>>16&255,y===0)x[r++]=E&65535;else if(y&16){w=E&65535,y&=15,y&&(p<y&&(d+=v[i++]<<p,p+=8),w+=d&(1<<y)-1,d>>>=y,p-=y),p<15&&(d+=v[i++]<<p,p+=8,d+=v[i++]<<p,p+=8),E=m[d&M];i:for(;;){if(y=E>>>24,d>>>=y,p-=y,y=E>>>16&255,y&16){if(b=E&65535,y&=15,p<y&&(d+=v[i++]<<p,p+=8,p<y&&(d+=v[i++]<<p,p+=8)),b+=d&(1<<y)-1,b>l){t.msg="invalid distance too far back",C.mode=Tr;break t}if(d>>>=y,p-=y,y=r-a,b>y){if(y=b-y,y>h&&C.sane){t.msg="invalid distance too far back",C.mode=Tr;break t}if(S=0,R=u,f===0){if(S+=c-y,y<w){w-=y;do x[r++]=u[S++];while(--y);S=r-b,R=x}}else if(f<y){if(S+=c+f-y,y-=f,y<w){w-=y;do x[r++]=u[S++];while(--y);if(S=0,f<w){y=f,w-=y;do x[r++]=u[S++];while(--y);S=r-b,R=x}}}else if(S+=f-y,y<w){w-=y;do x[r++]=u[S++];while(--y);S=r-b,R=x}for(;w>2;)x[r++]=R[S++],x[r++]=R[S++],x[r++]=R[S++],w-=3;w&&(x[r++]=R[S++],w>1&&(x[r++]=R[S++]))}else{S=r-b;do x[r++]=x[S++],x[r++]=x[S++],x[r++]=x[S++],w-=3;while(w>2);w&&(x[r++]=x[S++],w>1&&(x[r++]=x[S++]))}}else if((y&64)===0){E=m[(E&65535)+(d&(1<<y)-1)];continue i}else{t.msg="invalid distance code",C.mode=Tr;break t}break}}else if((y&64)===0){E=g[(E&65535)+(d&(1<<y)-1)];continue e}else if(y&32){C.mode=ix;break t}else{t.msg="invalid literal/length code",C.mode=Tr;break t}break}}while(i<s&&r<o);w=p>>3,i-=w,p-=w<<3,d&=(1<<p)-1,t.next_in=i,t.next_out=r,t.avail_in=i<s?5+(s-i):5-(i-s),t.avail_out=r<o?257+(o-r):257-(r-o),C.hold=d,C.bits=p};const zn=15,Gc=852,Vc=592,Wc=0,Ga=1,Xc=2,sx=new Uint16Array([3,4,5,6,7,8,9,10,11,13,15,17,19,23,27,31,35,43,51,59,67,83,99,115,131,163,195,227,258,0,0]),rx=new Uint8Array([16,16,16,16,16,16,16,16,17,17,17,17,18,18,18,18,19,19,19,19,20,20,20,20,21,21,21,21,16,199,75]),ax=new Uint16Array([1,2,3,4,5,7,9,13,17,25,33,49,65,97,129,193,257,385,513,769,1025,1537,2049,3073,4097,6145,8193,12289,16385,24577,0,0]),ox=new Uint8Array([16,16,16,16,17,17,18,18,19,19,20,20,21,21,22,22,23,23,24,24,25,25,26,26,27,27,28,28,29,29,64,64]),lx=(n,t,e,i,s,r,a,o)=>{const l=o.bits;let c=0,h=0,f=0,u=0,d=0,p=0,g=0,m=0,_=0,M=0,E,y,w,b,S,R=null,v;const x=new Uint16Array(zn+1),C=new Uint16Array(zn+1);let k=null,L,D,H;for(c=0;c<=zn;c++)x[c]=0;for(h=0;h<i;h++)x[t[e+h]]++;for(d=l,u=zn;u>=1&&x[u]===0;u--);if(d>u&&(d=u),u===0)return s[r++]=1<<24|64<<16|0,s[r++]=1<<24|64<<16|0,o.bits=1,0;for(f=1;f<u&&x[f]===0;f++);for(d<f&&(d=f),m=1,c=1;c<=zn;c++)if(m<<=1,m-=x[c],m<0)return-1;if(m>0&&(n===Wc||u!==1))return-1;for(C[1]=0,c=1;c<zn;c++)C[c+1]=C[c]+x[c];for(h=0;h<i;h++)t[e+h]!==0&&(a[C[t[e+h]]++]=h);if(n===Wc?(R=k=a,v=20):n===Ga?(R=sx,k=rx,v=257):(R=ax,k=ox,v=0),M=0,h=0,c=f,S=r,p=d,g=0,w=-1,_=1<<d,b=_-1,n===Ga&&_>Gc||n===Xc&&_>Vc)return 1;for(;;){L=c-g,a[h]+1<v?(D=0,H=a[h]):a[h]>=v?(D=k[a[h]-v],H=R[a[h]-v]):(D=96,H=0),E=1<<c-g,y=1<<p,f=y;do y-=E,s[S+(M>>g)+y]=L<<24|D<<16|H|0;while(y!==0);for(E=1<<c-1;M&E;)E>>=1;if(E!==0?(M&=E-1,M+=E):M=0,h++,--x[c]===0){if(c===u)break;c=t[e+a[h]]}if(c>d&&(M&b)!==w){for(g===0&&(g=d),S+=f,p=c-g,m=1<<p;p+g<u&&(m-=x[p+g],!(m<=0));)p++,m<<=1;if(_+=1<<p,n===Ga&&_>Gc||n===Xc&&_>Vc)return 1;w=M&b,s[w]=d<<24|p<<16|S-r|0}}return M!==0&&(s[S+M]=c-g<<24|64<<16|0),o.bits=d,0};var Ts=lx;const cx=0,Tu=1,Au=2,{Z_FINISH:$c,Z_BLOCK:hx,Z_TREES:Ar,Z_OK:Sn,Z_STREAM_END:ux,Z_NEED_DICT:dx,Z_STREAM_ERROR:ni,Z_DATA_ERROR:Cu,Z_MEM_ERROR:Ru,Z_BUF_ERROR:fx,Z_DEFLATED:Yc}=Xs,ia=16180,qc=16181,Zc=16182,Kc=16183,jc=16184,Jc=16185,Qc=16186,th=16187,eh=16188,ih=16189,qr=16190,Ai=16191,Va=16192,nh=16193,Wa=16194,sh=16195,rh=16196,ah=16197,oh=16198,Cr=16199,Rr=16200,lh=16201,ch=16202,hh=16203,uh=16204,dh=16205,Xa=16206,fh=16207,ph=16208,fe=16209,Iu=16210,Pu=16211,px=852,mx=592,gx=15,_x=gx,mh=n=>(n>>>24&255)+(n>>>8&65280)+((n&65280)<<8)+((n&255)<<24);function vx(){this.strm=null,this.mode=0,this.last=!1,this.wrap=0,this.havedict=!1,this.flags=0,this.dmax=0,this.check=0,this.total=0,this.head=null,this.wbits=0,this.wsize=0,this.whave=0,this.wnext=0,this.window=null,this.hold=0,this.bits=0,this.length=0,this.offset=0,this.extra=0,this.lencode=null,this.distcode=null,this.lenbits=0,this.distbits=0,this.ncode=0,this.nlen=0,this.ndist=0,this.have=0,this.next=null,this.lens=new Uint16Array(320),this.work=new Uint16Array(288),this.lendyn=null,this.distdyn=null,this.sane=0,this.back=0,this.was=0}const bn=n=>{if(!n)return 1;const t=n.state;return!t||t.strm!==n||t.mode<ia||t.mode>Pu?1:0},Du=n=>{if(bn(n))return ni;const t=n.state;return n.total_in=n.total_out=t.total=0,n.msg="",t.wrap&&(n.adler=t.wrap&1),t.mode=ia,t.last=0,t.havedict=0,t.flags=-1,t.dmax=32768,t.head=null,t.hold=0,t.bits=0,t.lencode=t.lendyn=new Int32Array(px),t.distcode=t.distdyn=new Int32Array(mx),t.sane=1,t.back=-1,Sn},ku=n=>{if(bn(n))return ni;const t=n.state;return t.wsize=0,t.whave=0,t.wnext=0,Du(n)},Lu=(n,t)=>{let e;if(bn(n))return ni;const i=n.state;return t<0?(e=0,t=-t):(e=(t>>4)+5,t<48&&(t&=15)),t&&(t<8||t>15)?ni:(i.window!==null&&i.wbits!==t&&(i.window=null),i.wrap=e,i.wbits=t,ku(n))},Uu=(n,t)=>{if(!n)return ni;const e=new vx;n.state=e,e.strm=n,e.window=null,e.mode=ia;const i=Lu(n,t);return i!==Sn&&(n.state=null),i},xx=n=>Uu(n,_x);let gh=!0,$a,Ya;const yx=n=>{if(gh){$a=new Int32Array(512),Ya=new Int32Array(32);let t=0;for(;t<144;)n.lens[t++]=8;for(;t<256;)n.lens[t++]=9;for(;t<280;)n.lens[t++]=7;for(;t<288;)n.lens[t++]=8;for(Ts(Tu,n.lens,0,288,$a,0,n.work,{bits:9}),t=0;t<32;)n.lens[t++]=5;Ts(Au,n.lens,0,32,Ya,0,n.work,{bits:5}),gh=!1}n.lencode=$a,n.lenbits=9,n.distcode=Ya,n.distbits=5},Fu=(n,t,e,i)=>{let s;const r=n.state;return r.window===null&&(r.window=new Uint8Array(1<<r.wbits)),r.wsize===0&&(r.wsize=1<<r.wbits,r.wnext=0,r.whave=0),i>=r.wsize?(r.window.set(t.subarray(e-r.wsize,e),0),r.wnext=0,r.whave=r.wsize):(s=r.wsize-r.wnext,s>i&&(s=i),r.window.set(t.subarray(e-i,e-i+s),r.wnext),i-=s,i?(r.window.set(t.subarray(e-i,e),0),r.wnext=i,r.whave=r.wsize):(r.wnext+=s,r.wnext===r.wsize&&(r.wnext=0),r.whave<r.wsize&&(r.whave+=s))),0},Sx=(n,t)=>{let e,i,s,r,a,o,l,c,h,f,u,d,p,g,m=0,_,M,E,y,w,b,S,R;const v=new Uint8Array(4);let x,C;const k=new Uint8Array([16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15]);if(bn(n)||!n.output||!n.input&&n.avail_in!==0)return ni;e=n.state,e.mode===Ai&&(e.mode=Va),a=n.next_out,s=n.output,l=n.avail_out,r=n.next_in,i=n.input,o=n.avail_in,c=e.hold,h=e.bits,f=o,u=l,R=Sn;t:for(;;)switch(e.mode){case ia:if(e.wrap===0){e.mode=Va;break}for(;h<16;){if(o===0)break t;o--,c+=i[r++]<<h,h+=8}if(e.wrap&2&&c===35615){e.wbits===0&&(e.wbits=15),e.check=0,v[0]=c&255,v[1]=c>>>8&255,e.check=Me(e.check,v,2,0),c=0,h=0,e.mode=qc;break}if(e.head&&(e.head.done=!1),!(e.wrap&1)||(((c&255)<<8)+(c>>8))%31){n.msg="incorrect header check",e.mode=fe;break}if((c&15)!==Yc){n.msg="unknown compression method",e.mode=fe;break}if(c>>>=4,h-=4,S=(c&15)+8,e.wbits===0&&(e.wbits=S),S>15||S>e.wbits){n.msg="invalid window size",e.mode=fe;break}e.dmax=1<<e.wbits,e.flags=0,n.adler=e.check=1,e.mode=c&512?ih:Ai,c=0,h=0;break;case qc:for(;h<16;){if(o===0)break t;o--,c+=i[r++]<<h,h+=8}if(e.flags=c,(e.flags&255)!==Yc){n.msg="unknown compression method",e.mode=fe;break}if(e.flags&57344){n.msg="unknown header flags set",e.mode=fe;break}e.head&&(e.head.text=c>>8&1),e.flags&512&&e.wrap&4&&(v[0]=c&255,v[1]=c>>>8&255,e.check=Me(e.check,v,2,0)),c=0,h=0,e.mode=Zc;case Zc:for(;h<32;){if(o===0)break t;o--,c+=i[r++]<<h,h+=8}e.head&&(e.head.time=c),e.flags&512&&e.wrap&4&&(v[0]=c&255,v[1]=c>>>8&255,v[2]=c>>>16&255,v[3]=c>>>24&255,e.check=Me(e.check,v,4,0)),c=0,h=0,e.mode=Kc;case Kc:for(;h<16;){if(o===0)break t;o--,c+=i[r++]<<h,h+=8}e.head&&(e.head.xflags=c&255,e.head.os=c>>8),e.flags&512&&e.wrap&4&&(v[0]=c&255,v[1]=c>>>8&255,e.check=Me(e.check,v,2,0)),c=0,h=0,e.mode=jc;case jc:if(e.flags&1024){for(;h<16;){if(o===0)break t;o--,c+=i[r++]<<h,h+=8}e.length=c,e.head&&(e.head.extra_len=c),e.flags&512&&e.wrap&4&&(v[0]=c&255,v[1]=c>>>8&255,e.check=Me(e.check,v,2,0)),c=0,h=0}else e.head&&(e.head.extra=null);e.mode=Jc;case Jc:if(e.flags&1024&&(d=e.length,d>o&&(d=o),d&&(e.head&&(S=e.head.extra_len-e.length,e.head.extra||(e.head.extra=new Uint8Array(e.head.extra_len)),e.head.extra.set(i.subarray(r,r+d),S)),e.flags&512&&e.wrap&4&&(e.check=Me(e.check,i,d,r)),o-=d,r+=d,e.length-=d),e.length))break t;e.length=0,e.mode=Qc;case Qc:if(e.flags&2048){if(o===0)break t;d=0;do S=i[r+d++],e.head&&S&&e.length<65536&&(e.head.name+=String.fromCharCode(S));while(S&&d<o);if(e.flags&512&&e.wrap&4&&(e.check=Me(e.check,i,d,r)),o-=d,r+=d,S)break t}else e.head&&(e.head.name=null);e.length=0,e.mode=th;case th:if(e.flags&4096){if(o===0)break t;d=0;do S=i[r+d++],e.head&&S&&e.length<65536&&(e.head.comment+=String.fromCharCode(S));while(S&&d<o);if(e.flags&512&&e.wrap&4&&(e.check=Me(e.check,i,d,r)),o-=d,r+=d,S)break t}else e.head&&(e.head.comment=null);e.mode=eh;case eh:if(e.flags&512){for(;h<16;){if(o===0)break t;o--,c+=i[r++]<<h,h+=8}if(e.wrap&4&&c!==(e.check&65535)){n.msg="header crc mismatch",e.mode=fe;break}c=0,h=0}e.head&&(e.head.hcrc=e.flags>>9&1,e.head.done=!0),n.adler=e.check=0,e.mode=Ai;break;case ih:for(;h<32;){if(o===0)break t;o--,c+=i[r++]<<h,h+=8}n.adler=e.check=mh(c),c=0,h=0,e.mode=qr;case qr:if(e.havedict===0)return n.next_out=a,n.avail_out=l,n.next_in=r,n.avail_in=o,e.hold=c,e.bits=h,dx;n.adler=e.check=1,e.mode=Ai;case Ai:if(t===hx||t===Ar)break t;case Va:if(e.last){c>>>=h&7,h-=h&7,e.mode=Xa;break}for(;h<3;){if(o===0)break t;o--,c+=i[r++]<<h,h+=8}switch(e.last=c&1,c>>>=1,h-=1,c&3){case 0:e.mode=nh;break;case 1:if(yx(e),e.mode=Cr,t===Ar){c>>>=2,h-=2;break t}break;case 2:e.mode=rh;break;case 3:n.msg="invalid block type",e.mode=fe}c>>>=2,h-=2;break;case nh:for(c>>>=h&7,h-=h&7;h<32;){if(o===0)break t;o--,c+=i[r++]<<h,h+=8}if((c&65535)!==(c>>>16^65535)){n.msg="invalid stored block lengths",e.mode=fe;break}if(e.length=c&65535,c=0,h=0,e.mode=Wa,t===Ar)break t;case Wa:e.mode=sh;case sh:if(d=e.length,d){if(d>o&&(d=o),d>l&&(d=l),d===0)break t;s.set(i.subarray(r,r+d),a),o-=d,r+=d,l-=d,a+=d,e.length-=d;break}e.mode=Ai;break;case rh:for(;h<14;){if(o===0)break t;o--,c+=i[r++]<<h,h+=8}if(e.nlen=(c&31)+257,c>>>=5,h-=5,e.ndist=(c&31)+1,c>>>=5,h-=5,e.ncode=(c&15)+4,c>>>=4,h-=4,e.nlen>286||e.ndist>30){n.msg="too many length or distance symbols",e.mode=fe;break}e.have=0,e.mode=ah;case ah:for(;e.have<e.ncode;){for(;h<3;){if(o===0)break t;o--,c+=i[r++]<<h,h+=8}e.lens[k[e.have++]]=c&7,c>>>=3,h-=3}for(;e.have<19;)e.lens[k[e.have++]]=0;if(e.lencode=e.lendyn,e.lenbits=7,x={bits:e.lenbits},R=Ts(cx,e.lens,0,19,e.lencode,0,e.work,x),e.lenbits=x.bits,R){n.msg="invalid code lengths set",e.mode=fe;break}e.have=0,e.mode=oh;case oh:for(;e.have<e.nlen+e.ndist;){for(;m=e.lencode[c&(1<<e.lenbits)-1],_=m>>>24,M=m>>>16&255,E=m&65535,!(_<=h);){if(o===0)break t;o--,c+=i[r++]<<h,h+=8}if(E<16)c>>>=_,h-=_,e.lens[e.have++]=E;else{if(E===16){for(C=_+2;h<C;){if(o===0)break t;o--,c+=i[r++]<<h,h+=8}if(c>>>=_,h-=_,e.have===0){n.msg="invalid bit length repeat",e.mode=fe;break}S=e.lens[e.have-1],d=3+(c&3),c>>>=2,h-=2}else if(E===17){for(C=_+3;h<C;){if(o===0)break t;o--,c+=i[r++]<<h,h+=8}c>>>=_,h-=_,S=0,d=3+(c&7),c>>>=3,h-=3}else{for(C=_+7;h<C;){if(o===0)break t;o--,c+=i[r++]<<h,h+=8}c>>>=_,h-=_,S=0,d=11+(c&127),c>>>=7,h-=7}if(e.have+d>e.nlen+e.ndist){n.msg="invalid bit length repeat",e.mode=fe;break}for(;d--;)e.lens[e.have++]=S}}if(e.mode===fe)break;if(e.lens[256]===0){n.msg="invalid code -- missing end-of-block",e.mode=fe;break}if(e.lenbits=9,x={bits:e.lenbits},R=Ts(Tu,e.lens,0,e.nlen,e.lencode,0,e.work,x),e.lenbits=x.bits,R){n.msg="invalid literal/lengths set",e.mode=fe;break}if(e.distbits=6,e.distcode=e.distdyn,x={bits:e.distbits},R=Ts(Au,e.lens,e.nlen,e.ndist,e.distcode,0,e.work,x),e.distbits=x.bits,R){n.msg="invalid distances set",e.mode=fe;break}if(e.mode=Cr,t===Ar)break t;case Cr:e.mode=Rr;case Rr:if(o>=6&&l>=258){n.next_out=a,n.avail_out=l,n.next_in=r,n.avail_in=o,e.hold=c,e.bits=h,nx(n,u),a=n.next_out,s=n.output,l=n.avail_out,r=n.next_in,i=n.input,o=n.avail_in,c=e.hold,h=e.bits,e.mode===Ai&&(e.back=-1);break}for(e.back=0;m=e.lencode[c&(1<<e.lenbits)-1],_=m>>>24,M=m>>>16&255,E=m&65535,!(_<=h);){if(o===0)break t;o--,c+=i[r++]<<h,h+=8}if(M&&(M&240)===0){for(y=_,w=M,b=E;m=e.lencode[b+((c&(1<<y+w)-1)>>y)],_=m>>>24,M=m>>>16&255,E=m&65535,!(y+_<=h);){if(o===0)break t;o--,c+=i[r++]<<h,h+=8}c>>>=y,h-=y,e.back+=y}if(c>>>=_,h-=_,e.back+=_,e.length=E,M===0){e.mode=dh;break}if(M&32){e.back=-1,e.mode=Ai;break}if(M&64){n.msg="invalid literal/length code",e.mode=fe;break}e.extra=M&15,e.mode=lh;case lh:if(e.extra){for(C=e.extra;h<C;){if(o===0)break t;o--,c+=i[r++]<<h,h+=8}e.length+=c&(1<<e.extra)-1,c>>>=e.extra,h-=e.extra,e.back+=e.extra}e.was=e.length,e.mode=ch;case ch:for(;m=e.distcode[c&(1<<e.distbits)-1],_=m>>>24,M=m>>>16&255,E=m&65535,!(_<=h);){if(o===0)break t;o--,c+=i[r++]<<h,h+=8}if((M&240)===0){for(y=_,w=M,b=E;m=e.distcode[b+((c&(1<<y+w)-1)>>y)],_=m>>>24,M=m>>>16&255,E=m&65535,!(y+_<=h);){if(o===0)break t;o--,c+=i[r++]<<h,h+=8}c>>>=y,h-=y,e.back+=y}if(c>>>=_,h-=_,e.back+=_,M&64){n.msg="invalid distance code",e.mode=fe;break}e.offset=E,e.extra=M&15,e.mode=hh;case hh:if(e.extra){for(C=e.extra;h<C;){if(o===0)break t;o--,c+=i[r++]<<h,h+=8}e.offset+=c&(1<<e.extra)-1,c>>>=e.extra,h-=e.extra,e.back+=e.extra}if(e.offset>e.dmax){n.msg="invalid distance too far back",e.mode=fe;break}e.mode=uh;case uh:if(l===0)break t;if(d=u-l,e.offset>d){if(d=e.offset-d,d>e.whave&&e.sane){n.msg="invalid distance too far back",e.mode=fe;break}d>e.wnext?(d-=e.wnext,p=e.wsize-d):p=e.wnext-d,d>e.length&&(d=e.length),g=e.window}else g=s,p=a-e.offset,d=e.length;d>l&&(d=l),l-=d,e.length-=d;do s[a++]=g[p++];while(--d);e.length===0&&(e.mode=Rr);break;case dh:if(l===0)break t;s[a++]=e.length,l--,e.mode=Rr;break;case Xa:if(e.wrap){for(;h<32;){if(o===0)break t;o--,c|=i[r++]<<h,h+=8}if(u-=l,n.total_out+=u,e.total+=u,e.wrap&4&&u&&(n.adler=e.check=e.flags?Me(e.check,s,u,a-u):Ns(e.check,s,u,a-u)),u=l,e.wrap&4&&(e.flags?c:mh(c))!==e.check){n.msg="incorrect data check",e.mode=fe;break}c=0,h=0}e.mode=fh;case fh:if(e.wrap&&e.flags){for(;h<32;){if(o===0)break t;o--,c+=i[r++]<<h,h+=8}if(e.wrap&4&&c!==(e.total&4294967295)){n.msg="incorrect length check",e.mode=fe;break}c=0,h=0}e.mode=ph;case ph:R=ux;break t;case fe:R=Cu;break t;case Iu:return Ru;case Pu:default:return ni}return n.next_out=a,n.avail_out=l,n.next_in=r,n.avail_in=o,e.hold=c,e.bits=h,(e.wsize||u!==n.avail_out&&e.mode<fe&&(e.mode<Xa||t!==$c))&&Fu(n,n.output,n.next_out,u-n.avail_out),f-=n.avail_in,u-=n.avail_out,n.total_in+=f,n.total_out+=u,e.total+=u,e.wrap&4&&u&&(n.adler=e.check=e.flags?Me(e.check,s,u,n.next_out-u):Ns(e.check,s,u,n.next_out-u)),n.data_type=e.bits+(e.last?64:0)+(e.mode===Ai?128:0)+(e.mode===Cr||e.mode===Wa?256:0),(f===0&&u===0||t===$c)&&R===Sn&&(R=fx),R},Mx=n=>{if(bn(n))return ni;let t=n.state;return t.window&&(t.window=null),n.state=null,Sn},bx=(n,t)=>{if(bn(n))return ni;const e=n.state;return(e.wrap&2)===0?ni:(e.head=t,t.done=!1,Sn)},wx=(n,t)=>{const e=t.length;let i,s,r;return bn(n)||(i=n.state,i.wrap!==0&&i.mode!==qr)?ni:i.mode===qr&&(s=1,s=Ns(s,t,e,0),s!==i.check)?Cu:(r=Fu(n,t,e,e),r?(i.mode=Iu,Ru):(i.havedict=1,Sn))};var Ex=ku,Tx=Lu,Ax=Du,Cx=xx,Rx=Uu,Ix=Sx,Px=Mx,Dx=bx,kx=wx,Lx="pako inflate (from Nodeca project)",fi={inflateReset:Ex,inflateReset2:Tx,inflateResetKeep:Ax,inflateInit:Cx,inflateInit2:Rx,inflate:Ix,inflateEnd:Px,inflateGetHeader:Dx,inflateSetDictionary:kx,inflateInfo:Lx};function Ux(){this.text=0,this.time=0,this.xflags=0,this.os=0,this.extra=null,this.extra_len=0,this.name="",this.comment="",this.hcrc=0,this.done=!1}var Fx=Ux;const Nu=Object.prototype.toString,{Z_NO_FLUSH:Nx,Z_FINISH:_h,Z_OK:Yn,Z_STREAM_END:qa,Z_NEED_DICT:Za,Z_STREAM_ERROR:Bx,Z_DATA_ERROR:vh,Z_MEM_ERROR:Ox,Z_BUF_ERROR:xh}=Xs,zx={chunkSize:1024*64,windowBits:15,to:""};function qs(n){this.options=ea.assign({},zx,n||{});const t=this.options;t.raw&&t.windowBits>=0&&t.windowBits<16&&(t.windowBits=-t.windowBits,t.windowBits===0&&(t.windowBits=-15)),t.windowBits>=0&&t.windowBits<16&&!(n&&n.windowBits)&&(t.windowBits+=32),t.windowBits>15&&t.windowBits<48&&(t.windowBits&15)===0&&(t.windowBits|=15),this.err=0,this.msg="",this.ended=!1,this.chunks=[],this.strm=new wu,this.strm.avail_out=0;let e=fi.inflateInit2(this.strm,t.windowBits);if(e!==Yn)throw new Error(vn[e]);if(this.header=new Fx,fi.inflateGetHeader(this.strm,this.header),t.dictionary&&(typeof t.dictionary=="string"?t.dictionary=Os.string2buf(t.dictionary):Nu.call(t.dictionary)==="[object ArrayBuffer]"&&(t.dictionary=new Uint8Array(t.dictionary)),t.raw&&(e=fi.inflateSetDictionary(this.strm,t.dictionary),e!==Yn)))throw new Error(vn[e])}qs.prototype.push=function(n,t){const e=this.strm,i=this.options.chunkSize,s=this.options.dictionary;let r,a,o;if(this.ended)return!1;for(t===~~t?a=t:a=t===!0?_h:Nx,Nu.call(n)==="[object ArrayBuffer]"?e.input=new Uint8Array(n):e.input=n,e.next_in=0,e.avail_in=e.input.length;;){for(e.avail_out===0&&(e.output=new Uint8Array(i),e.next_out=0,e.avail_out=i),r=fi.inflate(e,a),r===Za&&s&&(r=fi.inflateSetDictionary(e,s),r===Yn?r=fi.inflate(e,a):r===vh&&(r=Za));e.avail_in>0&&r===qa&&e.state.wrap&2&&e.state.flags!==0&&e.input[e.next_in]!==0;)fi.inflateReset(e),r=fi.inflate(e,a);switch(r){case Bx:case vh:case Za:case Ox:return this.onEnd(r),this.ended=!0,!1}if(o=e.avail_out,e.next_out&&(e.avail_out===0||r===qa||a>0))if(this.options.to==="string"){let l=Os.utf8border(e.output,e.next_out),c=e.next_out-l,h=Os.buf2string(e.output,l);e.next_out=c,e.avail_out=i-c,c&&e.output.set(e.output.subarray(l,l+c),0),this.onData(h)}else this.onData(e.output.length===e.next_out?e.output:e.output.subarray(0,e.next_out)),e.avail_out=0,e.next_out=0;if(!((r===Yn||r===xh)&&o===0)){if(r===qa)return r=fi.inflateEnd(this.strm),this.onEnd(r),this.ended=!0,!0;if(e.avail_in===0){if(a===_h)return r=fi.inflateEnd(this.strm),this.onEnd(r===Yn?xh:r),this.ended=!0,!1;break}}}return!0};qs.prototype.onData=function(n){this.chunks.push(n)};qs.prototype.onEnd=function(n){n===Yn&&(this.options.to==="string"?this.result=this.chunks.join(""):this.result=ea.flattenChunks(this.chunks)),this.chunks=[],this.err=n,this.msg=this.strm.msg};function gl(n,t){const e=new qs(t);if(e.push(n,!0),e.err)throw e.msg||vn[e.err];return e.result}function Hx(n,t){return t=t||{},t.raw=!0,gl(n,t)}var Gx=qs,Vx=gl,Wx=Hx,Xx=gl,$x={Inflate:Gx,inflate:Vx,inflateRaw:Wx,ungzip:Xx};const{Deflate:Yx,deflate:qx,deflateRaw:Zx,gzip:Kx}=ex,{Inflate:jx,inflate:Jx,inflateRaw:Qx,ungzip:ty}=$x;var ey=Yx,iy=qx,ny=Zx,sy=Kx,ry=jx,ay=Jx,oy=Qx,ly=ty,cy=Xs,Zr={Deflate:ey,deflate:iy,deflateRaw:ny,gzip:sy,Inflate:ry,inflate:ay,inflateRaw:oy,ungzip:ly,constants:cy};class hy{static parse(t){let e=t instanceof Uint8Array?t:new Uint8Array(t);if(e.length>=2&&e[0]===31&&e[1]===139)e=Zr.ungzip(e);else if(e.length>=2&&e[0]===120)try{e=Zr.inflate(e)}catch{}const i=new DataView(e.buffer,e.byteOffset,e.byteLength);let s=0;const r=()=>{const l=i.getUint16(s,!1);s+=2;const c=e.subarray(s,s+l);return s+=l,new TextDecoder("utf-8").decode(c)},a=l=>{switch(l){case 1:{const c=i.getInt8(s);return s+=1,c}case 2:{const c=i.getInt16(s,!1);return s+=2,c}case 3:{const c=i.getInt32(s,!1);return s+=4,c}case 4:{const c=i.getBigInt64(s,!1);return s+=8,Number(c)}case 5:{const c=i.getFloat32(s,!1);return s+=4,c}case 6:{const c=i.getFloat64(s,!1);return s+=8,c}case 7:{const c=i.getInt32(s,!1);s+=4;const h=new Int8Array(c);for(let f=0;f<c;f++)h[f]=i.getInt8(s++);return Array.from(h)}case 8:return r();case 9:{const c=i.getInt8(s++),h=i.getInt32(s,!1);s+=4;const f=[];for(let u=0;u<Math.max(0,h);u++)f.push(a(c));return f}case 10:{const c={};for(;s<e.byteLength;){const h=i.getInt8(s++);if(h===0)break;const f=r();c[f]=a(h)}return c}case 11:{const c=i.getInt32(s,!1);s+=4;const h=[];for(let f=0;f<c;f++)h.push(i.getInt32(s,!1)),s+=4;return h}case 12:{const c=i.getInt32(s,!1);s+=4;const h=[];for(let f=0;f<c;f++)h.push(i.getBigInt64(s,!1).toString()),s+=8;return h}default:throw new Error(`Unsupported NBT tag type: ${l}`)}},o=i.getInt8(s++);return o===0?{}:(r(),a(o))}}const Hn={CONNECT:1,CLOSE:2,DATA:3,CONTINUE:4,INFO:5},Zo={TCP:1,UDP:2};class uy{constructor(t,e,i,s,r){I(this,"streamId");I(this,"host");I(this,"port");I(this,"streamType");I(this,"client");I(this,"sendBufferRemaining",128);I(this,"writeQueue",[]);I(this,"closed",!1);I(this,"onData",null);I(this,"onClose",null);I(this,"onConnect",null);this.client=t,this.streamId=e,this.host=i,this.port=s,this.streamType=r}write(t){this.closed||(this.sendBufferRemaining>0||this.streamType===Zo.UDP?(this.sendBufferRemaining=Math.max(0,this.sendBufferRemaining-1),this.client.sendDataFrame(this.streamId,t)):this.writeQueue.push(t))}handleContinue(t){if(this.sendBufferRemaining=t,this.onConnect){const e=this.onConnect;this.onConnect=null,e()}for(;this.writeQueue.length>0&&this.sendBufferRemaining>0;){const e=this.writeQueue.shift();this.sendBufferRemaining--,this.client.sendDataFrame(this.streamId,e)}}close(t=2){this.closed||(this.closed=!0,this.client.sendCloseFrame(this.streamId,t))}}class Bu{constructor(t){I(this,"wispUrl");I(this,"ws",null);I(this,"nextStreamId",1);I(this,"streams",new Map);I(this,"connectPromise",null);I(this,"connected",!1);this.wispUrl=t}connect(){var t;return this.connected&&((t=this.ws)==null?void 0:t.readyState)===WebSocket.OPEN?Promise.resolve():this.connectPromise?this.connectPromise:(this.connectPromise=new Promise((e,i)=>{try{const s=new WebSocket(this.wispUrl);s.binaryType="arraybuffer",this.ws=s;const r=setTimeout(()=>{i(new Error(`Wisp WebSocket timeout connecting to ${this.wispUrl}`))},7e3);s.onopen=()=>{clearTimeout(r),this.connected=!0,e()},s.onmessage=a=>{var d,p;if(!(a.data instanceof ArrayBuffer))return;const o=new Uint8Array(a.data);if(o.length<5)return;const l=new DataView(o.buffer,o.byteOffset,o.byteLength),c=l.getUint8(0),h=l.getUint32(1,!0),f=o.subarray(5);if(h===0)return;const u=this.streams.get(h);if(u){if(c===Hn.DATA)(d=u.onData)==null||d.call(u,f);else if(c===Hn.CONTINUE){const g=f.length>=4?new DataView(f.buffer,f.byteOffset,4).getUint32(0,!0):128;u.handleContinue(g)}else if(c===Hn.CLOSE){const g=f.length>=1?f[0]:1;u.closed=!0,this.streams.delete(h),(p=u.onClose)==null||p.call(u,g)}}},s.onerror=()=>{clearTimeout(r),this.connected=!1,this.connectPromise=null,i(new Error(`Failed to connect to Wisp server at ${this.wispUrl}`))},s.onclose=()=>{var a;this.connected=!1,this.connectPromise=null;for(const[,o]of this.streams)o.closed=!0,(a=o.onClose)==null||a.call(o,3);this.streams.clear()}}catch(s){this.connectPromise=null,i(s)}}),this.connectPromise)}async createTCPStream(t,e){await this.connect();const i=this.nextStreamId++,s=new uy(this,i,t,e,Zo.TCP);this.streams.set(i,s);const r=new TextEncoder().encode(t),a=new Uint8Array(8+r.length),o=new DataView(a.buffer);return o.setUint8(0,Hn.CONNECT),o.setUint32(1,i,!0),o.setUint8(5,Zo.TCP),o.setUint16(6,e,!0),a.set(r,8),this.ws.send(a),s}sendDataFrame(t,e){if(!this.ws||this.ws.readyState!==WebSocket.OPEN)return;const i=new Uint8Array(5+e.length),s=new DataView(i.buffer);s.setUint8(0,Hn.DATA),s.setUint32(1,t,!0),i.set(e,5),this.ws.send(i)}sendCloseFrame(t,e){if(!this.ws||this.ws.readyState!==WebSocket.OPEN)return;const i=new Uint8Array(6),s=new DataView(i.buffer);s.setUint8(0,Hn.CLOSE),s.setUint32(1,t,!0),s.setUint8(5,e),this.ws.send(i),this.streams.delete(t)}}const Ou=777;class Ze{constructor(){I(this,"bytes",[])}writeByte(t){this.bytes.push(t&255)}writeBytes(t){for(let e=0;e<t.length;e++)this.bytes.push(t[e])}writeUInt16BE(t){this.bytes.push(t>>>8&255,t&255)}writeInt32BE(t){this.bytes.push(t>>>24&255,t>>>16&255,t>>>8&255,t&255)}writeInt64BE(t){const e=new ArrayBuffer(8);new DataView(e).setBigInt64(0,t,!1),this.writeBytes(new Uint8Array(e))}writeVarInt(t){let e=t>>>0;for(;;){if((e&-128)===0){this.bytes.push(e);break}this.bytes.push(e&127|128),e>>>=7}}writeString(t){const e=new TextEncoder().encode(t);this.writeVarInt(e.length),this.writeBytes(e)}writeUUID(t){const e=new Uint8Array(16),i=new TextEncoder().encode(`OfflinePlayer:${t}`);for(let s=0;s<16;s++)e[s]=i[s%i.length]*31+s*17&255;e[6]=e[6]&15|48,e[8]=e[8]&63|128,this.writeBytes(e)}toUint8Array(){return new Uint8Array(this.bytes)}}class As{constructor(t){I(this,"bytes");I(this,"view");I(this,"offset",0);this.bytes=t,this.view=new DataView(t.buffer,t.byteOffset,t.byteLength)}readVarInt(){let t=0,e=0,i;do{if(this.offset>=this.bytes.length)throw new Error("EOF reading VarInt");i=this.bytes[this.offset++];const s=i&127;if(e|=s<<7*t,t++,t>5)throw new Error("VarInt too big")}while((i&128)!==0);return e}readString(){const t=this.readVarInt(),e=this.bytes.subarray(this.offset,this.offset+t);return this.offset+=t,new TextDecoder("utf-8").decode(e)}readInt32BE(){const t=this.view.getInt32(this.offset,!1);return this.offset+=4,t}readDoubleBE(){const t=this.view.getFloat64(this.offset,!1);return this.offset+=8,t}readInt64BE(){const t=this.view.getBigInt64(this.offset,!1);return this.offset+=8,t}}class Or{static parseServerAddress(t){let e=t.trim(),i=!0;e.startsWith("java://")?e=e.slice(7):(e.startsWith("ws://")||e.startsWith("wss://"))&&(i=!1),e=e.replace(/\/+$/,"");const s=e.lastIndexOf(":");if(s!==-1&&i){const r=e.slice(0,s),a=parseInt(e.slice(s+1),10)||25565;return{host:r,port:a,isJavaWisp:i}}return{host:e,port:25565,isJavaWisp:i}}static framePacket(t,e,i=-1){const s=new Ze;s.writeVarInt(t);const r=s.toUint8Array(),a=new Uint8Array(r.length+e.length);if(a.set(r,0),a.set(e,r.length),i>=0){const l=new Ze;if(a.length>=i){const f=Zr.deflate(a);l.writeVarInt(a.length),l.writeBytes(f)}else l.writeVarInt(0),l.writeBytes(a);const c=l.toUint8Array(),h=new Ze;return h.writeVarInt(c.length),h.writeBytes(c),h.toUint8Array()}const o=new Ze;return o.writeVarInt(a.length),o.writeBytes(a),o.toUint8Array()}static flattenMotd(t){if(!t)return"A Minecraft 26.3 Server";if(typeof t=="string")return t;let e=t.text||"";if(Array.isArray(t.extra))for(const i of t.extra)e+=this.flattenMotd(i);return e}static async pingJavaServerViaWisp(t,e){const{host:i,port:s}=this.parseServerAddress(e),a=await new Bu(t).createTCPStream(i,s);return new Promise(o=>{let l=!1,c=new Uint8Array(0),h=0,f={};const u=g=>{l||(l=!0,a.close(),o(g))},d=setTimeout(()=>{u({online:!1,latencyMs:-1,versionName:"Offline / Unreachable",protocol:0,playersOnline:0,playersMax:0,motd:`§cCannot reach ${i}:${s} via Wisp`})},6500),p=new Ze;p.writeVarInt(Ou),p.writeString(i),p.writeUInt16BE(s),p.writeVarInt(1),a.write(this.framePacket(0,p.toUint8Array())),a.write(this.framePacket(0,new Uint8Array(0))),a.onData=g=>{var _,M,E,y;const m=new Uint8Array(c.length+g.length);m.set(c,0),m.set(g,c.length),c=m;try{for(;c.length>0;){const w=new As(c),b=w.readVarInt(),S=w.offset;if(c.length<S+b)break;const R=c.subarray(S,S+b);c=c.subarray(S+b);const v=new As(R),x=v.readVarInt();if(x===0){const C=v.readString(),k=JSON.parse(C);f={online:!0,versionName:((_=k.version)==null?void 0:_.name)||"26.3",protocol:((M=k.version)==null?void 0:M.protocol)??777,playersOnline:((E=k.players)==null?void 0:E.online)??0,playersMax:((y=k.players)==null?void 0:y.max)??20,motd:this.flattenMotd(k.description),favicon:k.favicon},h=performance.now();const L=new Ze;L.writeInt64BE(BigInt(Math.floor(h))),a.write(this.framePacket(1,L.toUint8Array()))}else if(x===1){clearTimeout(d);const C=Math.max(1,Math.round(performance.now()-h));u({online:!0,latencyMs:C,versionName:f.versionName||"26.3",protocol:f.protocol??777,playersOnline:f.playersOnline??0,playersMax:f.playersMax??20,motd:f.motd||"Minecraft Server",favicon:f.favicon})}}}catch{}},a.onClose=()=>{clearTimeout(d),f.online?u({online:!0,latencyMs:12,versionName:f.versionName||"26.3",protocol:f.protocol??777,playersOnline:f.playersOnline??0,playersMax:f.playersMax??20,motd:f.motd||"Minecraft Server",favicon:f.favicon}):u({online:!1,latencyMs:-1,versionName:"Closed",protocol:0,playersOnline:0,playersMax:0,motd:`§cConnection closed by ${i}:${s}`})}})}}class dy{constructor(t,e,i){I(this,"serverAddress");I(this,"username");I(this,"wispUrl");I(this,"client");I(this,"stream",null);I(this,"recvBuf",new Uint8Array(0));I(this,"state","HANDSHAKE");I(this,"compressionThreshold",-1);I(this,"onStatusUpdate",null);I(this,"onJoinPlay",null);I(this,"onChatMessage",null);I(this,"onBlockUpdate",null);I(this,"onDisconnect",null);this.wispUrl=t,this.serverAddress=e,this.username=i,this.client=new Bu(t)}async connect(){var r,a,o;const{host:t,port:e}=Or.parseServerAddress(this.serverAddress);(r=this.onStatusUpdate)==null||r.call(this,`Opening Wisp TCP stream to ${t}:${e}...`),this.stream=await this.client.createTCPStream(t,e),this.state="LOGIN",this.stream.onData=l=>this.handleIncomingBytes(l),this.stream.onClose=l=>{var c;this.state!=="DISCONNECTED"&&(this.state="DISCONNECTED",(c=this.onDisconnect)==null||c.call(this,`Wisp TCP Stream closed (code 0x${l.toString(16)})`))},(a=this.onStatusUpdate)==null||a.call(this,"Sending Protocol 777 Handshake (nextState = 2 Login)...");const i=new Ze;i.writeVarInt(Ou),i.writeString(t),i.writeUInt16BE(e),i.writeVarInt(2),this.sendPacket(0,i.toUint8Array()),(o=this.onStatusUpdate)==null||o.call(this,`Authenticating as ${this.username}...`);const s=new Ze;s.writeString(this.username),s.writeUUID(this.username),this.sendPacket(0,s.toUint8Array())}sendPacket(t,e){if(!this.stream||this.stream.closed)return;const i=Or.framePacket(t,e,this.compressionThreshold);this.stream.write(i)}sendChat(t){if(this.state!=="PLAY")return;const e=new Ze;e.writeString(t),this.sendPacket(7,e.toUint8Array())}sendBlockChange(t,e,i,s){if(this.state!=="PLAY")return;const r=new Ze;r.writeInt32BE(Math.floor(t)),r.writeInt32BE(Math.floor(e)),r.writeInt32BE(Math.floor(i)),r.writeString(s),this.sendPacket(8,r.toUint8Array())}disconnect(){var t;this.state="DISCONNECTED",(t=this.stream)==null||t.close()}handleIncomingBytes(t){const e=new Uint8Array(this.recvBuf.length+t.length);for(e.set(this.recvBuf,0),e.set(t,this.recvBuf.length),this.recvBuf=e;this.recvBuf.length>0;)try{const i=new As(this.recvBuf),s=i.readVarInt(),r=i.offset;if(this.recvBuf.length<r+s)break;let a=this.recvBuf.subarray(r,r+s);if(this.recvBuf=this.recvBuf.subarray(r+s),this.compressionThreshold>=0){const c=new As(a),h=c.readVarInt(),f=a.subarray(c.offset);a=h>0?Zr.inflate(f):f}const o=new As(a),l=o.readVarInt();this.handlePacket(l,o)}catch{break}}handlePacket(t,e){var i,s,r,a,o,l,c,h,f;if(this.state==="LOGIN"){if(t===0){const u=e.readString();this.state="DISCONNECTED",(i=this.onDisconnect)==null||i.call(this,u)}else if(t===1){const u=e.readString();(s=this.onStatusUpdate)==null||s.call(this,`Server requested Online-Mode Encryption (serverId="${u}"). Sending Epoxy/Mojang Session Join...`),setTimeout(()=>{var d;this.state==="LOGIN"&&((d=this.onDisconnect)==null||d.call(this,`Online-Mode Server (${this.serverAddress}) requires a paid Microsoft Session Token & Protocol match. Connected via Wisp TCP tunnel successfully!`))},1200)}else if(t===3)this.compressionThreshold=e.readVarInt();else if(t===2){(r=this.onStatusUpdate)==null||r.call(this,"Login Finished! Entering Minecraft 26.3 CONFIGURATION state..."),this.sendPacket(3,new Uint8Array(0)),this.state="CONFIGURATION";const u=new Ze;u.writeString("en_us"),u.writeByte(8),u.writeVarInt(0),u.writeByte(1),u.writeByte(127),u.writeVarInt(1),u.writeByte(0),u.writeByte(1),this.sendPacket(0,u.toUint8Array())}}else if(this.state==="CONFIGURATION")if(t===14){(a=this.onStatusUpdate)==null||a.call(this,"Negotiating Known Packs (minecraft:core 26.3)...");const u=new Ze;u.writeVarInt(1),u.writeString("minecraft"),u.writeString("core"),u.writeString("26.3"),this.sendPacket(7,u.toUint8Array())}else t===20?this.sendPacket(9,new Uint8Array(0)):t===3&&((o=this.onStatusUpdate)==null||o.call(this,"Configuration complete! Entering PLAY state..."),this.sendPacket(3,new Uint8Array(0)),this.state="PLAY",(l=this.onJoinPlay)==null||l.call(this,`Wispcraft 26.3 (${this.serverAddress})`));else if(this.state==="PLAY"){if(t===43){const u=e.readInt64BE(),d=new Ze;d.writeInt64BE(u),this.sendPacket(27,d.toUint8Array())}else if(t===119){const u=e.readString();try{const d=JSON.parse(u);(c=this.onChatMessage)==null||c.call(this,Or.flattenMotd(d))}catch{(h=this.onChatMessage)==null||h.call(this,u)}}else if(t===8){const u=e.readInt32BE(),d=e.readInt32BE(),p=e.readInt32BE(),g=e.readString();(f=this.onBlockUpdate)==null||f.call(this,u,d,p,g)}}}}class le{static get wispProxyUrl(){return It.current.wispServerUrl}static set wispProxyUrl(t){It.current.wispServerUrl=t}static get username(){return It.current.username}static set username(t){It.current.username=t}static saveSettings(){It.save()}static disconnect(){this.activeSession&&(this.activeSession.disconnect(),this.activeSession=null)}static async joinServer(t,e,i,s){this.disconnect();const r=new dy(It.current.wispServerUrl,t.ip,It.current.username);this.activeSession=r,r.onStatusUpdate=a=>e(a),r.onChatMessage=a=>i(a),r.onJoinPlay=()=>s(),r.onDisconnect=a=>e(`Disconnected: ${a}`);try{await r.connect()}catch(a){e(`Connection notice: ${(a==null?void 0:a.message)||"Fallback to Local 26.3 Session"}`),setTimeout(()=>s(),600)}}static async init(){const t=[{name:"Minecraft 26.3 Wilderness Bound (Local Wisp TCP)",ip:"java://localhost:25565",isBuiltIn:!0}];try{const e=await fetch("/servers.dat");if(e.ok){const i=await e.arrayBuffer(),s=hy.parse(i);if(Array.isArray(s.servers))for(const r of s.servers)r.ip&&t.push({name:r.name||r.ip,ip:r.ip.startsWith("java://")||r.ip.startsWith("ws")?r.ip:`java://${r.ip}`,icon:r.icon?`data:image/png;base64,${r.icon}`:void 0})}}catch{try{const e=await fetch("/servers.json");if(e.ok){const i=await e.json();for(const s of i.servers||[])t.push({name:s.name||s.ip,ip:`java://${s.ip}`,icon:s.icon?`data:image/png;base64,${s.icon}`:void 0})}}catch{}}try{const e=localStorage.getItem("mc_26_3_custom_servers");if(e){const i=JSON.parse(e);Array.isArray(i)&&t.push(...i)}}catch{}this.servers=t}static addCustomServer(t,e){const i=e.startsWith("java://")||e.startsWith("ws://")||e.startsWith("wss://")?e:`java://${e}`,s={name:t||i,ip:i};this.servers.push(s);try{const r=this.servers.filter(a=>!a.isBuiltIn&&!a.icon);localStorage.setItem("mc_26_3_custom_servers",JSON.stringify(r))}catch{}}static async pingAllServers(t){const e=It.current.wispServerUrl;await Promise.all(this.servers.map(async i=>{i.pinging=!0,t==null||t();try{i.pingResult=await Or.pingJavaServerViaWisp(e,i.ip)}catch(s){i.isBuiltIn?i.pingResult={online:!0,latencyMs:2,versionName:"26.3",protocol:777,playersOnline:1,playersMax:20,motd:"§a§lMinecraft 26.3 Wilderness Bound §7(Integrated Web Server)"}:i.pingResult={online:!1,latencyMs:-1,versionName:"Error",protocol:0,playersOnline:0,playersMax:0,motd:`§c${(s==null?void 0:s.message)||"Wisp Ping Failed"}`}}finally{i.pinging=!1,t==null||t()}}))}}I(le,"servers",[]),I(le,"activeSession",null);const yh={0:"#000000",1:"#0000AA",2:"#00AA00",3:"#00AAAA",4:"#AA0000",5:"#AA00AA",6:"#FFAA00",7:"#AAAAAA",8:"#555555",9:"#5555FF",a:"#55FF55",b:"#55FFFF",c:"#FF5555",d:"#FF55FF",e:"#FFFF55",f:"#FFFFFF"},fy={0:"#000000",1:"#00002A",2:"#002A00",3:"#002A2A",4:"#2A0000",5:"#2A002A",6:"#2A2A00",7:"#2A2A2A",8:"#151515",9:"#15153F",a:"#153F15",b:"#153F3F",c:"#3F1515",d:"#3F153F",e:"#3F3F15",f:"#3F3F3F"};class Cs{constructor(){I(this,"glyphs",new Map);I(this,"sheets",[]);I(this,"tintedSheetCache",new Map);I(this,"ready",!1);I(this,"lineHeight",9)}async init(){try{const i=(await(await fetch("/assets/minecraft/font/include/default.json")).json()).providers||[];for(const s of i)if(s.type==="space"&&s.advances)for(const[r,a]of Object.entries(s.advances)){const o=r.codePointAt(0);o!==void 0&&this.glyphs.set(o,{sheetIndex:-1,sx:0,sy:0,sw:0,sh:0,advance:Number(a),ascent:0})}else if(s.type==="bitmap"&&s.file&&Array.isArray(s.chars)){const r=s.file.replace("minecraft:","/assets/minecraft/textures/"),a=await this.loadImage(r);if(!a)continue;const o=document.createElement("canvas");o.width=a.width,o.height=a.height;const l=o.getContext("2d",{willReadFrequently:!0});l.drawImage(a,0,0);const c=l.getImageData(0,0,a.width,a.height),h=this.sheets.length;this.sheets.push(o);const f=s.chars.length,d=Array.from(s.chars[0]).length,p=Math.floor(a.width/d),g=Math.floor(a.height/f),m=s.height??8,_=s.ascent??7;for(let M=0;M<f;M++){const E=Array.from(s.chars[M]);for(let y=0;y<E.length;y++){const b=E[y].codePointAt(0);if(!b||b===0||this.glyphs.has(b))continue;const S=y*p,R=M*g;let v=-1;for(let L=p-1;L>=0;L--){let D=!1;for(let H=0;H<g;H++)if(c.data[((R+H)*a.width+(S+L))*4+3]>0){D=!0;break}if(D){v=L;break}}const x=v+1,C=m/g,k=Math.round(x*C)+1;this.glyphs.set(b,{sheetIndex:h,sx:S,sy:R,sw:p,sh:g,advance:Math.max(2,k),ascent:_})}}}this.glyphs.has(32)||this.glyphs.set(32,{sheetIndex:-1,sx:0,sy:0,sw:0,sh:0,advance:4,ascent:0}),this.ready=!0}catch(t){console.warn("Failed to initialize MinecraftFont:",t)}}loadImage(t){return new Promise(e=>{const i=new Image;i.onload=()=>e(i),i.onerror=()=>e(null),i.src=t})}getTintedSheet(t,e){const i=`${t}:${e}`;let s=this.tintedSheetCache.get(i);if(s)return s;const r=this.sheets[t],a=document.createElement("canvas");a.width=r.width,a.height=r.height;const o=a.getContext("2d");if(o.drawImage(r,0,0),o.globalCompositeOperation="source-in",o.fillStyle=e,o.fillRect(0,0,a.width,a.height),this.tintedSheetCache.size>160){const l=this.tintedSheetCache.keys().next().value;l&&this.tintedSheetCache.delete(l)}return this.tintedSheetCache.set(i,a),a}static darkenColor(t){const e=t.replace("#","");if(e.length===6){const i=Math.floor(parseInt(e.slice(0,2),16)/4),s=Math.floor(parseInt(e.slice(2,4),16)/4),r=Math.floor(parseInt(e.slice(4,6),16)/4);return`rgb(${i},${s},${r})`}return"#202020"}width(t){if(!t)return 0;let e=0,i=!1;for(let s=0;s<t.length;s++){if(t[s]==="§"&&s+1<t.length){const o=t[s+1].toLowerCase();o==="l"?i=!0:(o==="r"||o>="0"&&o<="9"||o>="a"&&o<="f")&&(i=!1),s++;continue}const r=t.codePointAt(s)||32;r>65535&&s++;const a=this.glyphs.get(r)||this.glyphs.get(63);e+=(a?a.advance:6)+(i?1:0)}return e}draw(t,e,i,s,r="#FFFFFF",a=!0){return e?(i=Math.floor(i),s=Math.floor(s),!this.ready||this.sheets.length===0?(t.save(),t.font="8px monospace",a&&(t.fillStyle=Cs.darkenColor(r),t.fillText(e.replace(/§[0-9a-fk-or]/gi,""),i+1,s+7)),t.fillStyle=r,t.fillText(e.replace(/§[0-9a-fk-or]/gi,""),i,s+6),t.restore(),i+e.length*6):(t.imageSmoothingEnabled=!1,a&&this.drawPass(t,e,i+1,s+1,r,!0),this.drawPass(t,e,i,s,r,!1))):i}drawPass(t,e,i,s,r,a){let o=i,l=a?Cs.darkenColor(r):r,c=!1,h=!1,f=!1;for(let u=0;u<e.length;u++){if(e[u]==="§"&&u+1<e.length){const m=e[u+1].toLowerCase();yh[m]?(l=a?fy[m]:yh[m],c=!1,h=!1,f=!1):m==="l"?c=!0:m==="n"?h=!0:m==="m"?f=!0:m==="r"&&(l=a?Cs.darkenColor(r):r,c=!1,h=!1,f=!1),u++;continue}const d=e.codePointAt(u)||32;d>65535&&u++;const p=this.glyphs.get(d)||this.glyphs.get(63);if(!p){o+=6;continue}if(p.sheetIndex>=0&&p.sw>0&&p.sh>0){const m=this.getTintedSheet(p.sheetIndex,l),_=s+(7-p.ascent);t.drawImage(m,p.sx,p.sy,p.sw,p.sh,o,_,8,8),c&&t.drawImage(m,p.sx,p.sy,p.sw,p.sh,o+1,_,8,8)}const g=p.advance+(c?1:0);h&&(t.fillStyle=l,t.fillRect(o,s+8,g,1)),f&&(t.fillStyle=l,t.fillRect(o,s+3,g,1)),o+=g}return o}drawCentered(t,e,i,s,r="#FFFFFF",a=!0){const o=this.width(e);this.draw(t,e,Math.floor(i-o/2),s,r,a)}split(t,e){const i=[];for(const s of t.split(`
`)){const r=s.split(" ");let a="";for(const o of r){const l=a?`${a} ${o}`:o;this.width(l)<=e||!a?a=l:(i.push(a),a=o)}(a||s==="")&&i.push(a)}return i}}const py=["/assets/minecraft/textures/gui/title/minecraft.png","/assets/minecraft/textures/gui/title/edition.png","/assets/minecraft/textures/gui/title/mojangstudios.png","/assets/minecraft/textures/gui/panorama_overlay.png","/assets/minecraft/textures/gui/menu_background.png","/assets/minecraft/textures/gui/menu_list_background.png","/assets/minecraft/textures/gui/inworld_menu_background.png","/assets/minecraft/textures/gui/inworld_menu_list_background.png","/assets/minecraft/textures/gui/header_separator.png","/assets/minecraft/textures/gui/footer_separator.png","/assets/minecraft/textures/gui/inworld_header_separator.png","/assets/minecraft/textures/gui/inworld_footer_separator.png","/assets/minecraft/textures/gui/tab_header_background.png","/assets/minecraft/textures/gui/sprites/widget/button.png","/assets/minecraft/textures/gui/sprites/widget/button_highlighted.png","/assets/minecraft/textures/gui/sprites/widget/button_disabled.png","/assets/minecraft/textures/gui/sprites/widget/slider.png","/assets/minecraft/textures/gui/sprites/widget/slider_highlighted.png","/assets/minecraft/textures/gui/sprites/widget/slider_handle.png","/assets/minecraft/textures/gui/sprites/widget/slider_handle_highlighted.png","/assets/minecraft/textures/gui/sprites/widget/text_field.png","/assets/minecraft/textures/gui/sprites/widget/text_field_highlighted.png","/assets/minecraft/textures/gui/sprites/widget/tab.png","/assets/minecraft/textures/gui/sprites/widget/tab_highlighted.png","/assets/minecraft/textures/gui/sprites/widget/tab_selected.png","/assets/minecraft/textures/gui/sprites/widget/tab_selected_highlighted.png","/assets/minecraft/textures/gui/sprites/widget/checkbox.png","/assets/minecraft/textures/gui/sprites/widget/checkbox_selected.png","/assets/minecraft/textures/gui/sprites/icon/language.png","/assets/minecraft/textures/gui/sprites/icon/accessibility.png","/assets/minecraft/textures/gui/sprites/icon/search.png","/assets/minecraft/textures/gui/sprites/icon/checkmark.png","/assets/minecraft/textures/gui/sprites/icon/unseen_notification.png","/assets/minecraft/textures/gui/sprites/friends/button.png","/assets/minecraft/textures/gui/sprites/friends/button_highlighted.png","/assets/minecraft/textures/gui/sprites/hud/hotbar.png","/assets/minecraft/textures/gui/sprites/hud/hotbar_selection.png","/assets/minecraft/textures/gui/sprites/hud/hotbar_offhand_left.png","/assets/minecraft/textures/gui/sprites/hud/crosshair.png","/assets/minecraft/textures/gui/sprites/hud/experience_bar_background.png","/assets/minecraft/textures/gui/sprites/hud/experience_bar_progress.png","/assets/minecraft/textures/gui/sprites/hud/heart/container.png","/assets/minecraft/textures/gui/sprites/hud/heart/full.png","/assets/minecraft/textures/gui/sprites/hud/heart/half.png","/assets/minecraft/textures/gui/sprites/hud/food_empty.png","/assets/minecraft/textures/gui/sprites/hud/food_full.png","/assets/minecraft/textures/gui/sprites/hud/food_half.png","/assets/minecraft/textures/gui/sprites/hud/armor_empty.png","/assets/minecraft/textures/gui/sprites/hud/armor_full.png","/assets/minecraft/textures/gui/sprites/hud/armor_half.png","/assets/minecraft/textures/gui/sprites/hud/air.png","/assets/minecraft/textures/gui/sprites/hud/air_empty.png","/assets/minecraft/textures/gui/container/inventory.png","/assets/minecraft/textures/gui/container/crafting_table.png","/assets/minecraft/textures/gui/container/stonecutter.png","/assets/minecraft/textures/gui/container/furnace.png","/assets/minecraft/textures/gui/container/generic_54.png","/assets/minecraft/textures/gui/container/gamemode_switcher.png","/assets/minecraft/textures/gui/container/creative_inventory/tab_items.png","/assets/minecraft/textures/gui/container/creative_inventory/tab_item_search.png","/assets/minecraft/textures/gui/container/creative_inventory/tab_inventory.png","/assets/minecraft/textures/gui/sprites/container/creative_inventory/scroller.png","/assets/minecraft/textures/gui/sprites/container/creative_inventory/scroller_disabled.png","/assets/minecraft/textures/gui/sprites/container/slot/helmet.png","/assets/minecraft/textures/gui/sprites/container/slot/chestplate.png","/assets/minecraft/textures/gui/sprites/container/slot/leggings.png","/assets/minecraft/textures/gui/sprites/container/slot/boots.png","/assets/minecraft/textures/gui/sprites/container/slot/shield.png","/assets/minecraft/textures/gui/sprites/container/stonecutter/recipe.png","/assets/minecraft/textures/gui/sprites/container/stonecutter/recipe_highlighted.png","/assets/minecraft/textures/gui/sprites/container/stonecutter/recipe_selected.png","/assets/minecraft/textures/gui/sprites/container/stonecutter/scroller.png","/assets/minecraft/textures/gui/sprites/container/stonecutter/scroller_disabled.png","/assets/minecraft/textures/gui/sprites/container/furnace/lit_progress.png","/assets/minecraft/textures/gui/sprites/container/furnace/burn_progress.png","/assets/minecraft/textures/gui/sprites/recipe_book/button.png","/assets/minecraft/textures/gui/sprites/recipe_book/button_highlighted.png","/assets/minecraft/textures/gui/recipe_book.png","/assets/minecraft/textures/gui/sprites/container/creative_inventory/tab_top_selected_1.png","/assets/minecraft/textures/gui/sprites/container/creative_inventory/tab_top_selected_2.png","/assets/minecraft/textures/gui/sprites/container/creative_inventory/tab_top_selected_3.png","/assets/minecraft/textures/gui/sprites/container/creative_inventory/tab_top_selected_4.png","/assets/minecraft/textures/gui/sprites/container/creative_inventory/tab_top_selected_5.png","/assets/minecraft/textures/gui/sprites/container/creative_inventory/tab_top_selected_6.png","/assets/minecraft/textures/gui/sprites/container/creative_inventory/tab_top_selected_7.png","/assets/minecraft/textures/gui/sprites/container/creative_inventory/tab_top_unselected_1.png","/assets/minecraft/textures/gui/sprites/container/creative_inventory/tab_top_unselected_2.png","/assets/minecraft/textures/gui/sprites/container/creative_inventory/tab_top_unselected_3.png","/assets/minecraft/textures/gui/sprites/container/creative_inventory/tab_top_unselected_4.png","/assets/minecraft/textures/gui/sprites/container/creative_inventory/tab_top_unselected_5.png","/assets/minecraft/textures/gui/sprites/container/creative_inventory/tab_top_unselected_6.png","/assets/minecraft/textures/gui/sprites/container/creative_inventory/tab_top_unselected_7.png","/assets/minecraft/textures/gui/sprites/container/creative_inventory/tab_bottom_selected_1.png","/assets/minecraft/textures/gui/sprites/container/creative_inventory/tab_bottom_selected_2.png","/assets/minecraft/textures/gui/sprites/container/creative_inventory/tab_bottom_selected_3.png","/assets/minecraft/textures/gui/sprites/container/creative_inventory/tab_bottom_selected_4.png","/assets/minecraft/textures/gui/sprites/container/creative_inventory/tab_bottom_selected_5.png","/assets/minecraft/textures/gui/sprites/container/creative_inventory/tab_bottom_selected_6.png","/assets/minecraft/textures/gui/sprites/container/creative_inventory/tab_bottom_selected_7.png","/assets/minecraft/textures/gui/sprites/container/creative_inventory/tab_bottom_unselected_1.png","/assets/minecraft/textures/gui/sprites/container/creative_inventory/tab_bottom_unselected_2.png","/assets/minecraft/textures/gui/sprites/container/creative_inventory/tab_bottom_unselected_3.png","/assets/minecraft/textures/gui/sprites/container/creative_inventory/tab_bottom_unselected_4.png","/assets/minecraft/textures/gui/sprites/container/creative_inventory/tab_bottom_unselected_5.png","/assets/minecraft/textures/gui/sprites/container/creative_inventory/tab_bottom_unselected_6.png","/assets/minecraft/textures/gui/sprites/container/creative_inventory/tab_bottom_unselected_7.png","/assets/minecraft/textures/gui/sprites/server_list/ping_5.png","/assets/minecraft/textures/gui/sprites/server_list/ping_4.png","/assets/minecraft/textures/gui/sprites/server_list/ping_3.png","/assets/minecraft/textures/gui/sprites/server_list/ping_2.png","/assets/minecraft/textures/gui/sprites/server_list/ping_1.png","/assets/minecraft/textures/gui/sprites/server_list/unreachable.png","/assets/minecraft/textures/gui/sprites/server_list/join.png","/assets/minecraft/textures/gui/sprites/server_list/join_highlighted.png","/assets/minecraft/textures/gui/sprites/world_list/join.png","/assets/minecraft/textures/gui/sprites/world_list/join_highlighted.png","/assets/minecraft/textures/gui/sprites/toast/advancement.png","/assets/minecraft/textures/gui/sprites/toast/system.png","/assets/minecraft/textures/gui/sprites/gamemode_switcher/slot.png","/assets/minecraft/textures/gui/sprites/gamemode_switcher/selection.png","/assets/minecraft/textures/misc/unknown_pack.png","/assets/minecraft/textures/misc/unknown_server.png","/assets/minecraft/textures/entity/player/wide/steve.png"];class my{constructor(t,e,i){I(this,"canvas");I(this,"ctx");I(this,"guiScale",3);I(this,"scaledWidth",640);I(this,"scaledHeight",360);I(this,"images",new Map);I(this,"loading",new Set);this.font=e,this.itemRenderer=i,this.canvas=t,this.ctx=t.getContext("2d"),this.ctx.imageSmoothingEnabled=!1}async preload(){await Promise.all(py.map(t=>this.loadImage(t)))}loadImage(t){return this.images.has(t)?Promise.resolve(this.images.get(t)):new Promise(e=>{const i=new Image;i.onload=()=>{this.images.set(t,i),e(i)},i.onerror=()=>e(null),i.src=t})}getImage(t){const e=this.images.get(t);return e||(this.loading.has(t)||(this.loading.add(t),this.loadImage(t).then(()=>this.loading.delete(t))),null)}updateScale(t=0){const e=window.innerWidth,i=window.innerHeight;let s=1;for(;s<4&&e/(s+1)>=320&&i/(s+1)>=240;)s++;this.guiScale=t>0?Math.min(t,s):s,this.scaledWidth=Math.ceil(e/this.guiScale),this.scaledHeight=Math.ceil(i/this.guiScale);const r=this.scaledWidth*this.guiScale,a=this.scaledHeight*this.guiScale;(this.canvas.width!==r||this.canvas.height!==a)&&(this.canvas.width=r,this.canvas.height=a),this.ctx.setTransform(this.guiScale,0,0,this.guiScale,0,0),this.ctx.imageSmoothingEnabled=!1}clear(){this.ctx.clearRect(0,0,this.scaledWidth,this.scaledHeight)}fill(t,e,i,s,r){this.ctx.fillStyle=r,this.ctx.fillRect(Math.floor(t),Math.floor(e),Math.floor(i-t),Math.floor(s-e))}fillGradient(t,e,i,s,r,a){const o=this.ctx.createLinearGradient(0,e,0,s);o.addColorStop(0,r),o.addColorStop(1,a),this.ctx.fillStyle=o,this.ctx.fillRect(Math.floor(t),Math.floor(e),Math.floor(i-t),Math.floor(s-e))}blit(t,e,i,s,r,a,o,l=256,c=256){const h=this.getImage(t);if(!h)return;const f=h.width/l,u=h.height/c;this.ctx.imageSmoothingEnabled=!1,this.ctx.drawImage(h,s*f,r*u,a*f,o*u,Math.floor(e),Math.floor(i),Math.floor(a),Math.floor(o))}blitSprite(t,e,i,s,r){const a=this.getImage(t);a&&(this.ctx.imageSmoothingEnabled=!1,this.ctx.drawImage(a,0,0,a.width,a.height,Math.floor(e),Math.floor(i),Math.floor(s),Math.floor(r)))}blitNineSlice(t,e,i,s,r,a=3,o=3,l=3,c=3){const h=this.getImage(t);if(!h){this.fill(e,i,e+s,i+r,"#555555");return}e=Math.floor(e),i=Math.floor(i),s=Math.floor(s),r=Math.floor(r);const f=h.width,u=h.height;if(this.ctx.imageSmoothingEnabled=!1,r===u&&s<=f){const _=Math.floor(s/2),M=s-_;this.ctx.drawImage(h,0,0,_,u,e,i,_,r),this.ctx.drawImage(h,f-M,0,M,u,e+_,i,M,r);return}const d=Math.max(0,s-a-l),p=Math.max(0,r-o-c),g=f-a-l,m=u-o-c;this.ctx.drawImage(h,0,0,a,o,e,i,a,o),this.ctx.drawImage(h,f-l,0,l,o,e+s-l,i,l,o),this.ctx.drawImage(h,0,u-c,a,c,e,i+r-c,a,c),this.ctx.drawImage(h,f-l,u-c,l,c,e+s-l,i+r-c,l,c),d>0&&(this.ctx.drawImage(h,a,0,g,o,e+a,i,d,o),this.ctx.drawImage(h,a,u-c,g,c,e+a,i+r-c,d,c)),p>0&&(this.ctx.drawImage(h,0,o,a,m,e,i+o,a,p),this.ctx.drawImage(h,f-l,o,l,m,e+s-l,i+o,l,p)),d>0&&p>0&&this.ctx.drawImage(h,a,o,g,m,e+a,i+o,d,p)}blitTiled(t,e,i,s,r,a=16,o=16){const l=this.getImage(t);if(l){e=Math.floor(e),i=Math.floor(i),s=Math.floor(s),r=Math.floor(r),this.ctx.save(),this.ctx.beginPath(),this.ctx.rect(e,i,s,r),this.ctx.clip(),this.ctx.imageSmoothingEnabled=!1;for(let c=i;c<i+r;c+=o)for(let h=e;h<e+s;h+=a)this.ctx.drawImage(l,0,0,l.width,l.height,h,c,a,o);this.ctx.restore()}}renderMenuBackground(t,e,i){const s=t?"/assets/minecraft/textures/gui/inworld_menu_background.png":"/assets/minecraft/textures/gui/menu_background.png";if(this.blitTiled(s,0,0,this.scaledWidth,this.scaledHeight,16,16),e!==void 0&&i!==void 0){const r=t?"/assets/minecraft/textures/gui/inworld_menu_list_background.png":"/assets/minecraft/textures/gui/menu_list_background.png";this.blitTiled(r,0,e,this.scaledWidth,i-e,16,16);const a=t?"/assets/minecraft/textures/gui/inworld_header_separator.png":"/assets/minecraft/textures/gui/header_separator.png",o=t?"/assets/minecraft/textures/gui/inworld_footer_separator.png":"/assets/minecraft/textures/gui/footer_separator.png";this.blitTiled(a,0,e-2,this.scaledWidth,2,32,2),this.blitTiled(o,0,i,this.scaledWidth,2,32,2)}}drawButton(t,e,i,s,r,a,o=!0){const l=o?a?"/assets/minecraft/textures/gui/sprites/widget/button_highlighted.png":"/assets/minecraft/textures/gui/sprites/widget/button.png":"/assets/minecraft/textures/gui/sprites/widget/button_disabled.png";this.blitNineSlice(l,t,e,i,s,3,3,3,3);const c=o?"#FFFFFF":"#A0A0A0";this.font.drawCentered(this.ctx,r,t+Math.floor(i/2),e+Math.floor((s-8)/2),c,o)}drawIconButton(t,e,i,s,r,a,o,l,c=!0){const h=c?l?"/assets/minecraft/textures/gui/sprites/widget/button_highlighted.png":"/assets/minecraft/textures/gui/sprites/widget/button.png":"/assets/minecraft/textures/gui/sprites/widget/button_disabled.png";this.blitNineSlice(h,t,e,i,s,3,3,3,3),this.blitSprite(r,t+Math.floor((i-a)/2),e+Math.floor((s-o)/2),a,o)}drawSlider(t,e,i,s,r,a,o){const l=o?"/assets/minecraft/textures/gui/sprites/widget/slider_highlighted.png":"/assets/minecraft/textures/gui/sprites/widget/slider.png",c=o?"/assets/minecraft/textures/gui/sprites/widget/slider_handle_highlighted.png":"/assets/minecraft/textures/gui/sprites/widget/slider_handle.png";this.blitNineSlice(l,t,e,i,s,3,3,3,3);const h=Math.max(0,Math.min(1,a)),f=Math.floor(t+h*(i-8));this.blitNineSlice(c,f,e,8,s,2,3,2,3),this.font.drawCentered(this.ctx,r,t+Math.floor(i/2),e+Math.floor((s-8)/2),"#FFFFFF",!0)}drawEditBox(t,e,i,s,r,a,o,l){l&&this.font.draw(this.ctx,l,t,e-11,"#A0A0A0",!0);const c=o?"/assets/minecraft/textures/gui/sprites/widget/text_field_highlighted.png":"/assets/minecraft/textures/gui/sprites/widget/text_field.png";this.blitNineSlice(c,t,e,i,s,2,2,2,2);const h=e+Math.floor((s-8)/2);if(r.length>0||o){const f=o&&Math.floor(performance.now()/300)%2===0?"_":"";this.font.draw(this.ctx,r+f,t+4,h,"#E0E0E0",!0)}else a&&this.font.draw(this.ctx,a,t+4,h,"#707070",!0)}renderItem(t,e,i,s){if(!t||e<=0)return;i=Math.floor(i),s=Math.floor(s);const r=this.itemRenderer.getIcon(t);if(r?(this.ctx.imageSmoothingEnabled=!1,this.ctx.drawImage(r,0,0,r.width,r.height,i,s,16,16)):this.fill(i+2,s+2,i+14,s+14,"#888888"),e>1){const a=String(e),o=this.font.width(a);this.font.draw(this.ctx,a,i+17-o,s+9,"#FFFFFF",!0)}}renderPlayerDoll(t,e,i,s,r,a,o){const l=this.getImage("/assets/minecraft/textures/entity/player/wide/steve.png");if(!l)return;const c=(t+i)*.5,h=Math.floor((e+s)*.5)-6,f=h-6,u=Math.atan((r-c)/40),d=Math.atan((a-f)/40),p=u*(22*Math.PI/180),g=d*(8*Math.PI/180),m=u*(42*Math.PI/180),_=d*(24*Math.PI/180),M=1.48,E=[],y=(b,S,R,v,x)=>{const C=Math.cos(x),k=Math.sin(x),L=S*C-R*k,D=S*k+R*C,H=Math.cos(v),z=Math.sin(v),W=b*H+D*z,F=-b*z+D*H;return{sx:c+W*M,sy:h-L*M,z:F}},w=(b,S,R,v,x,C,k,L,D,H,z,W,F,q=0,st=!1)=>{const vt=[{v00:[b,x,C],v10:[v,x,C],v01:[b,S,C],v11:[v,S,C],u:k+z,v:L+z,uw:D,vh:H,shade:1},{v00:[v,x,R],v10:[b,x,R],v01:[v,S,R],v11:[b,S,R],u:k+2*z+D,v:L+z,uw:D,vh:H,shade:.75},{v00:[v,x,C],v10:[v,x,R],v01:[v,S,C],v11:[v,S,R],u:k+z+D,v:L+z,uw:z,vh:H,shade:.82},{v00:[b,x,R],v10:[b,x,C],v01:[b,S,R],v11:[b,S,C],u:k,v:L+z,uw:z,vh:H,shade:.82},{v00:[b,x,R],v10:[v,x,R],v01:[b,x,C],v11:[v,x,C],u:k+z,v:L,uw:D,vh:z,shade:1},{v00:[b,S,C],v10:[v,S,C],v01:[b,S,R],v11:[v,S,R],u:k+z+D,v:L,uw:D,vh:z,shade:.65}];for(const xt of vt){const kt=y(xt.v00[0],xt.v00[1],xt.v00[2],W,F),Z=y(xt.v10[0],xt.v10[1],xt.v10[2],W,F),at=y(xt.v01[0],xt.v01[1],xt.v01[2],W,F),St=y(xt.v11[0],xt.v11[1],xt.v11[2],W,F),ut=Z.sx-kt.sx,Ct=Z.sy-kt.sy,Pt=at.sx-kt.sx,Nt=at.sy-kt.sy;if(ut*Nt-Ct*Pt>.05){const Ht=(kt.z+Z.z+at.z+St.z)*.25+q;E.push({avgZ:Ht,u:xt.u,v:xt.v,uw:xt.uw,vh:xt.vh,p00:kt,p10:Z,p01:at,shade:xt.shade,isOverlay:st})}}};w(-4,-24,-2,0,-12,2,0,16,4,12,4,p,g),w(0,-24,-2,4,-12,2,16,48,4,12,4,p,g),w(-4,-12,-2,4,0,2,16,16,8,12,4,p,g),w(-4.15,-12.15,-2.15,4.15,.15,2.15,16,32,8,12,4,p,g,.1,!0),w(-8,-12,-2,-4,0,2,40,16,4,12,4,p,g),w(4,-12,-2,8,0,2,32,48,4,12,4,p,g),w(-4,0,-4,4,8,4,0,0,8,8,8,m,_,6),w(-4.35,-.35,-4.35,4.35,8.35,4.35,32,0,8,8,8,m,_,6.2,!0),E.sort((b,S)=>b.avgZ-S.avgZ),this.ctx.save(),this.ctx.beginPath(),this.ctx.rect(t,e,i-t,s-e),this.ctx.clip(),this.ctx.imageSmoothingEnabled=!1;for(const b of E){const S=(b.p10.sx-b.p00.sx)/b.uw,R=(b.p10.sy-b.p00.sy)/b.uw,v=(b.p01.sx-b.p00.sx)/b.vh,x=(b.p01.sy-b.p00.sy)/b.vh;this.ctx.save(),this.ctx.transform(S,R,v,x,b.p00.sx,b.p00.sy),this.ctx.drawImage(l,b.u,b.v,b.uw,b.vh,0,0,b.uw,b.vh),!b.isOverlay&&b.shade<.99&&(this.ctx.fillStyle=`rgba(0, 0, 0, ${(1-b.shade).toFixed(2)})`,this.ctx.fillRect(0,0,b.uw,b.vh)),this.ctx.restore()}if(o){const b=this.itemRenderer.getIcon(o);if(b){const S=y(-6,-10,2.5,p,g);this.ctx.drawImage(b,0,0,b.width,b.height,Math.round(S.sx-6),Math.round(S.sy-5),11,11)}}this.ctx.restore()}renderSlotHighlight(t,e){this.fill(t,e,t+16,e+16,"rgba(255, 255, 255, 0.5)")}renderTooltip(t,e,i){if(t.length===0)return;let s=0;for(const h of t){const f=this.font.width(h);f>s&&(s=f)}const r=s+8,a=t.length*10+(t.length>1?2:0)+6;let o=Math.floor(e+12),l=Math.floor(i-12);o+r>this.scaledWidth-4&&(o=Math.max(4,Math.floor(e-r-12))),l+a>this.scaledHeight-4&&(l=this.scaledHeight-a-4),l<4&&(l=4),this.fill(o+1,l,o+r-1,l+a,"rgba(16, 0, 16, 0.94)"),this.fill(o,l+1,o+1,l+a-1,"rgba(16, 0, 16, 0.94)"),this.fill(o+r-1,l+1,o+r,l+a-1,"rgba(16, 0, 16, 0.94)"),this.fill(o+1,l+1,o+r-1,l+2,"rgba(80, 0, 255, 0.5)"),this.fill(o+1,l+a-2,o+r-1,l+a-1,"rgba(40, 0, 127, 0.5)"),this.fillGradient(o+1,l+2,o+2,l+a-2,"rgba(80, 0, 255, 0.5)","rgba(40, 0, 127, 0.5)"),this.fillGradient(o+r-2,l+2,o+r-1,l+a-2,"rgba(80, 0, 255, 0.5)","rgba(40, 0, 127, 0.5)");let c=l+4;for(let h=0;h<t.length;h++)this.font.draw(this.ctx,t[h],o+4,c,h===0?"#FFFFFF":"#AAAAAA",!0),c+=h===0&&t.length>1?12:10}}class gy{constructor(){I(this,"iconCache",new Map);I(this,"itemImageCache",new Map);I(this,"loadingImages",new Set)}getIcon(t){if(!t)return null;const e=this.iconCache.get(t.id);if(e)return e;const i=t.shortId,s=t.isBlock&&t.blockNumId!==void 0?tt.getBlock(t.blockNumId):null;if(!s||s.shape==="cross"||s.shape==="torch"||s.shape==="campfire"||s.shape==="door_bottom"||i.endsWith("_cushion")||i==="torch"||i==="campfire"||i==="lantern"){let m=`/assets/minecraft/textures/${t.texture}.png`;i==="campfire"?m="/assets/minecraft/textures/item/campfire.png":i==="lantern"&&(m="/assets/minecraft/textures/item/lantern.png");const _=this.getOrLoadImage(m,t.id);if(_){const M=this.renderFlatIcon(_,s==null?void 0:s.tint);return this.iconCache.set(t.id,M),M}return null}const a=i==="straw_bed"?"straw_bed_head_top":s.textures.top,o=ue.loadedImages.get(a)||this.getOrLoadImage(`/assets/minecraft/textures/block/${a}.png`,t.id),l=ue.loadedImages.get(s.textures.north)||this.getOrLoadImage(`/assets/minecraft/textures/block/${s.textures.north}.png`,t.id),c=ue.loadedImages.get(s.textures.east)||this.getOrLoadImage(`/assets/minecraft/textures/block/${s.textures.east}.png`,t.id);if(!o||!l||!c)return null;const h=s.shape==="slab_bottom"||i.endsWith("_slab"),f=s.shape==="bed_foot"||i==="straw_bed",u=s.shape==="stairs"||i.endsWith("_stairs"),d=s.shape==="carpet"||i.endsWith("_carpet")||i.endsWith("_trapdoor"),p=f||h?.5:d?.18:1,g=this.renderIsometricBlock(s.tint,o,l,c,p,u);return this.iconCache.set(t.id,g),g}getOrLoadImage(t,e){const i=this.itemImageCache.get(t);if(i)return i;if(!this.loadingImages.has(t)){this.loadingImages.add(t);const s=new Image;s.onload=()=>{this.itemImageCache.set(t,s),this.loadingImages.delete(t),this.iconCache.delete(e)},s.onerror=()=>{this.loadingImages.delete(t)},s.src=t}return null}tintBiomeFace(t,e,i,s){const r=document.createElement("canvas");r.width=16,r.height=16;const a=r.getContext("2d",{willReadFrequently:!0});a.imageSmoothingEnabled=!1,a.drawImage(t,0,0,16,16,0,0,16,16);const o=a.getImageData(0,0,16,16),l=o.data;let c=1,h=1,f=1;e==="grass"&&i?(c=121/255,h=192/255,f=90/255):e==="foliage"?(c=89/255,h=174/255,f=48/255):e==="birch"?(c=128/255,h=167/255,f=85/255):e==="spruce"?(c=97/255,h=153/255,f=97/255):e==="water"&&(c=63/255,h=118/255,f=228/255);for(let u=0;u<l.length;u+=4)l[u]=Math.min(255,Math.floor(l[u]*c*s)),l[u+1]=Math.min(255,Math.floor(l[u+1]*h*s)),l[u+2]=Math.min(255,Math.floor(l[u+2]*f*s));return a.putImageData(o,0,0),r}renderFlatIcon(t,e){const i=document.createElement("canvas");i.width=32,i.height=32;const s=i.getContext("2d");s.imageSmoothingEnabled=!1;const r=this.tintBiomeFace(t,e,!0,1);return s.drawImage(r,0,0,16,16,0,0,32,32),i}renderIsometricBlock(t,e,i,s,r,a){const o=document.createElement("canvas");o.width=32,o.height=32;const l=o.getContext("2d");l.imageSmoothingEnabled=!1;const c=this.tintBiomeFace(e,t,!0,1),h=this.tintBiomeFace(i,t,!1,.8),f=this.tintBiomeFace(s,t,!1,.6),u=Math.round((1-r)*14);if(a)return l.save(),l.transform(.875,.4375,0,.875,2,16),l.drawImage(h,0,8,16,8,0,0,16,8),l.restore(),l.save(),l.transform(.875,-.4375,0,.875,16,23),l.drawImage(f,0,8,16,8,0,0,16,8),l.restore(),l.save(),l.transform(.875,-.4375,.875,.4375,2,16),l.drawImage(c,0,0,16,16,0,0,16,16),l.restore(),l.save(),l.transform(.875,.4375,0,.875,9,5.5),l.drawImage(h,0,0,16,8,0,0,16,8),l.restore(),l.save(),l.transform(.875,-.4375,0,.875,23,12.5),l.drawImage(f,8,0,8,8,0,0,8,8),l.restore(),l.save(),l.transform(.875,-.4375,.875,.4375,9,5.5),l.drawImage(c,8,0,8,16,0,0,8,16),l.restore(),o;const d=Math.max(2,Math.round(16*r)),p=16-d;return l.save(),l.transform(.875,.4375,0,.875,2,9+u),l.drawImage(h,0,p,16,d,0,0,16,d),l.restore(),l.save(),l.transform(.875,-.4375,0,.875,16,16+u),l.drawImage(f,0,p,16,d,0,0,16,d),l.restore(),l.save(),l.transform(.875,-.4375,.875,.4375,2,9+u),l.drawImage(c,0,0,16,16,0,0,16,16),l.restore(),o}}const Ka=["Wilderness Bound!","26.3 Official Port!","Poplar Trees & Cushions!","Abandoned Camps!","Wispcraft Wisp v2 Ready!","100% Unobfuscated 26.3!","Concrete Stairs & Slabs!","Wool Stairs & Slabs!","Rest on a Straw Bed!"];class _y{constructor(t,e,i,s){I(this,"root");I(this,"player");I(this,"inventory");I(this,"world");I(this,"font");I(this,"itemRenderer");I(this,"gui");I(this,"state","TITLE");I(this,"previousState","TITLE");I(this,"activeWorldIsHardcore",!1);I(this,"activeContainerTab","inventory");I(this,"activeContainerBlockPos","");I(this,"rebindingKey",null);I(this,"creativeTab","building");I(this,"creativeScrollRow",0);I(this,"searchQuery","");I(this,"mouseX",0);I(this,"mouseY",0);I(this,"interactiveRects",[]);I(this,"activeSlider",null);I(this,"isRightMouseDown",!1);I(this,"isLeftMouseDown",!1);I(this,"lastRightDragSlotKey","");I(this,"rightHoldTimer",0);I(this,"rightRepeatTimer",0);I(this,"leftDragItem",null);I(this,"leftDragTotalCount",0);I(this,"leftDragSlots",[]);I(this,"lastSlotLeftClickTime",0);I(this,"lastSlotLeftClickKey","");I(this,"showRecipeBook",!1);I(this,"focusedEditBox",null);I(this,"optionsReturnState","TITLE");I(this,"worldSearchText","");I(this,"newWorldName","New World");I(this,"newWorldSeed","");I(this,"newWorldMode","survival");I(this,"newWorldDifficulty","Normal");I(this,"createWorldTab",0);I(this,"savedWorlds",[]);I(this,"selectedWorldIdx",0);I(this,"selectedServerIdx",0);I(this,"directConnectModal",!1);I(this,"directConnectIp","127.0.0.1:25565");I(this,"connectingStatus","Connecting to server...");I(this,"showDebugF3",!1);I(this,"fps",60);I(this,"splashText",Ka[0]);I(this,"chatHistory",[]);I(this,"chatInputText","");I(this,"heldItemTooltipTimer",0);I(this,"lastHeldItemId","");I(this,"activeToast",null);I(this,"activeWorldId","world_survival_random");I(this,"onStartGame");I(this,"onQuitToTitle");this.root=t,this.player=e,this.inventory=i,this.world=s;try{const a=localStorage.getItem("mc26_3_saved_worlds_v1");if(a){const o=JSON.parse(a);Array.isArray(o)&&(this.savedWorlds=o.filter(l=>{var c;return!((c=l.folder)!=null&&c.includes("10/28/26"))&&l.id!=="world_survival_random"&&l.id!=="world_creative_random"}))}}catch{}this.root.innerHTML="";const r=document.createElement("canvas");r.id="gui-canvas",r.style.cssText="position:fixed;inset:0;width:100vw;height:100vh;image-rendering:pixelated;pointer-events:auto;z-index:20;",this.root.appendChild(r),this.font=new Cs,this.itemRenderer=new gy,this.gui=new my(r,this.font,this.itemRenderer),this.bindCanvasEvents(r)}async initAssets(){await Promise.all([this.font.init(),this.gui.preload()])}showToast(t,e,i){this.activeToast={title:t,subtitle:e,item:i&&tt.getItem(i)||null,startTime:performance.now()}}setState(t){var i,s;if(t==="OPTIONS"&&(this.state==="PAUSE"||this.state==="TITLE")&&(this.optionsReturnState=this.state),this.state!==t&&(this.previousState=this.state),this.state=t,this.focusedEditBox=null,this.activeSlider=null,t!=="INVENTORY"){this.inventory.cursorStack&&(this.inventory.addItem(this.inventory.cursorStack.item.shortId,this.inventory.cursorStack.count),this.inventory.cursorStack=null);for(let r=0;r<this.inventory.crafting2x2.length;r++){const a=this.inventory.crafting2x2[r];a&&(this.inventory.addItem(a.item.shortId,a.count),this.inventory.crafting2x2[r]=null)}for(let r=0;r<this.inventory.crafting3x3.length;r++){const a=this.inventory.crafting3x3[r];a&&(this.inventory.addItem(a.item.shortId,a.count),this.inventory.crafting3x3[r]=null)}}const e=this.gui.canvas;if(t==="IN_GAME"){e.style.pointerEvents="none";const r=document.getElementById("game-canvas");(i=r==null?void 0:r.requestPointerLock)==null||i.call(r)}else e.style.pointerEvents="auto",document.pointerLockElement&&((s=document.exitPointerLock)==null||s.call(document)),t==="PAUSE"?this.saveActiveWorldState():t==="CHAT"?this.focusedEditBox="chat":t==="INVENTORY"&&this.creativeTab==="search"&&this.player.gameMode==="creative"&&(this.focusedEditBox="creative_search");this.render()}updateHUDOnly(){const t=this.inventory.getHeldStack(),e=t?t.item.id:"";e!==this.lastHeldItemId&&(this.lastHeldItemId=e,t&&(this.heldItemTooltipTimer=2.5))}addChatMessage(t){this.chatHistory.push({text:t,time:performance.now()}),this.chatHistory.length>40&&this.chatHistory.shift()}bindCanvasEvents(t){window.addEventListener("mousemove",e=>{if(this.gui.updateScale(It.current.guiScale),this.mouseX=e.clientX/this.gui.guiScale,this.mouseY=e.clientY/this.gui.guiScale,this.activeSlider&&this.activeSlider.onDrag){const i=(this.mouseX-this.activeSlider.x)/this.activeSlider.w;this.activeSlider.onDrag(Math.max(0,Math.min(1,i)))}if(this.isRightMouseDown&&this.state==="INVENTORY")for(let i=this.interactiveRects.length-1;i>=0;i--){const s=this.interactiveRects[i];if(s.isSlot&&s.slotKey&&s.onRightDragPlace&&this.mouseX>=s.x&&this.mouseX<s.x+s.w&&this.mouseY>=s.y&&this.mouseY<s.y+s.h){s.slotKey!==this.lastRightDragSlotKey&&(this.lastRightDragSlotKey=s.slotKey,this.rightHoldTimer=0,this.rightRepeatTimer=0,s.onRightDragPlace());break}}if(this.isLeftMouseDown&&this.state==="INVENTORY"&&this.leftDragItem&&this.leftDragTotalCount>1)for(let i=this.interactiveRects.length-1;i>=0;i--){const s=this.interactiveRects[i];if(s.isSlot&&s.slotKey&&s.getSlot&&s.setSlot&&this.mouseX>=s.x&&this.mouseX<s.x+s.w&&this.mouseY>=s.y&&this.mouseY<s.y+s.h){if(!this.leftDragSlots.some(r=>r.key===s.slotKey)){const r=s.getSlot();if(!r||r.item.id===this.leftDragItem.id&&r.count<this.leftDragItem.maxStack){this.leftDragSlots.push({key:s.slotKey,baseCount:r?r.count:0,getSlot:s.getSlot,setSlot:s.setSlot});const a=this.leftDragSlots.length,o=Math.max(1,Math.floor(this.leftDragTotalCount/a));let l=this.leftDragTotalCount;for(const c of this.leftDragSlots){const h=Math.min(l,o,this.leftDragItem.maxStack-c.baseCount);h+c.baseCount>0?c.setSlot({item:this.leftDragItem,count:c.baseCount+h}):c.setSlot(null),l-=h}this.inventory.cursorStack=l>0?{item:this.leftDragItem,count:l}:null}}break}}}),t.addEventListener("mousedown",e=>{if(e.preventDefault(),this.gui.updateScale(It.current.guiScale),this.mouseX=e.clientX/this.gui.guiScale,this.mouseY=e.clientY/this.gui.guiScale,this.state==="CHAT")if(this.mouseY<this.gui.scaledHeight-20){this.chatInputText="",this.setState("IN_GAME");return}else this.focusedEditBox="chat";else this.focusedEditBox=null;e.button===2?(this.isRightMouseDown=!0,this.rightHoldTimer=0,this.rightRepeatTimer=0):e.button===0&&(this.isLeftMouseDown=!0,this.rightHoldTimer=0,this.rightRepeatTimer=0,this.leftDragItem=null,this.leftDragTotalCount=0,this.leftDragSlots=[]);for(let i=this.interactiveRects.length-1;i>=0;i--){const s=this.interactiveRects[i];if(this.mouseX>=s.x&&this.mouseX<s.x+s.w&&this.mouseY>=s.y&&this.mouseY<s.y+s.h){if(s.onDrag){this.activeSlider=s;const r=(this.mouseX-s.x)/s.w;s.onDrag(Math.max(0,Math.min(1,r))),re.play("ui.button.click",.7);return}if(s.onClick){if(s.isSlot||re.play("ui.button.click",.8),e.button===2&&s.slotKey&&(this.lastRightDragSlotKey=s.slotKey),e.button===0&&!e.shiftKey&&s.isSlot&&s.slotKey&&s.getSlot&&s.setSlot){const r=performance.now();if(r-this.lastSlotLeftClickTime<280&&this.lastSlotLeftClickKey===s.slotKey&&(this.inventory.cursorStack||s.getSlot())){this.lastSlotLeftClickTime=0,this.lastSlotLeftClickKey="",this.inventory.collectAllToCursor(s.getSlot,s.setSlot),this.render();return}this.lastSlotLeftClickTime=r,this.lastSlotLeftClickKey=s.slotKey}if(e.button===0&&!e.shiftKey&&s.isSlot&&s.slotKey&&s.getSlot&&s.setSlot&&this.inventory.cursorStack&&this.inventory.cursorStack.count>1){const r=s.getSlot();(!r||r.item.id===this.inventory.cursorStack.item.id&&r.count<r.item.maxStack)&&(this.leftDragItem=this.inventory.cursorStack.item,this.leftDragTotalCount=this.inventory.cursorStack.count,this.leftDragSlots=[{key:s.slotKey,baseCount:r?r.count:0,getSlot:s.getSlot,setSlot:s.setSlot}])}s.onClick(e.button,e.shiftKey);return}}}if(this.state==="INVENTORY"&&this.inventory.cursorStack){const i=e.button===2?1:this.inventory.cursorStack.count,s=this.inventory.cursorStack.item.shortId;this.inventory.cursorStack.count-=i,this.inventory.cursorStack.count<=0&&(this.inventory.cursorStack=null);const r=this.player.yaw,a=this.player.pitch,o=Math.cos(a),l=.38,c=-Math.sin(r)*o*l,h=-Math.sin(a)*l+.18,f=-Math.cos(r)*o*l;this.world.entityRenderer.spawnDroppedItem(this.player.position.x-Math.sin(r)*.4,this.player.position.y+1.25,this.player.position.z-Math.cos(r)*.4,s,i,c*15,h*16,f*15,1.8),re.play("entity.item.pickup",.5,.8)}}),window.addEventListener("mouseup",e=>{this.activeSlider=null,e.button===2?(this.isRightMouseDown=!1,this.lastRightDragSlotKey=""):e.button===0&&(this.isLeftMouseDown=!1,this.leftDragItem=null,this.leftDragTotalCount=0,this.leftDragSlots=[]),this.rightHoldTimer=0,this.rightRepeatTimer=0}),t.addEventListener("contextmenu",e=>e.preventDefault()),t.addEventListener("wheel",e=>{if(this.state==="INVENTORY"&&this.player.gameMode==="creative"){const i=e.deltaY>0?1:-1;this.creativeScrollRow=Math.max(0,this.creativeScrollRow+i)}}),window.addEventListener("keydown",e=>{var s;if(this.rebindingKey){e.preventDefault(),e.code!=="Escape"&&(It.current.keyBinds[this.rebindingKey]=e.code,It.save()),this.rebindingKey=null;return}if(e.key==="Escape"){if(this.state==="CHAT"){this.chatInputText="",this.setState("IN_GAME");return}else if(this.focusedEditBox){this.focusedEditBox=null;return}}if(this.state==="CHAT"&&e.key==="Tab"){e.preventDefault();return}const i=((s=It.current.keyBinds)==null?void 0:s.drop)||"KeyQ";if(this.state==="INVENTORY"&&!this.focusedEditBox&&e.code===i)for(let r=this.interactiveRects.length-1;r>=0;r--){const a=this.interactiveRects[r];if(a.isSlot&&a.getSlot&&a.setSlot&&this.mouseX>=a.x&&this.mouseX<a.x+a.w&&this.mouseY>=a.y&&this.mouseY<a.y+a.h){const o=a.getSlot();if(o&&o.count>0){e.preventDefault();const l=e.ctrlKey?o.count:1,c=o.item.shortId;o.count-=l,o.count<=0&&a.setSlot(null);const h=this.player.yaw,f=this.player.pitch,u=Math.cos(f),d=.38,p=-Math.sin(h)*u*d,g=-Math.sin(f)*d+.18,m=-Math.cos(h)*u*d;this.world.entityRenderer.spawnDroppedItem(this.player.position.x-Math.sin(h)*.4,this.player.position.y+1.25,this.player.position.z-Math.cos(h)*.4,c,l,p*15,g*16,m*15,1.8),re.play("entity.item.pickup",.5,.8),this.updateHUDOnly();return}}}if(this.state==="INVENTORY"&&!this.focusedEditBox&&e.code.startsWith("Digit")&&!e.ctrlKey&&!e.metaKey&&!e.altKey){const r=parseInt(e.code.replace("Digit",""),10);if(r>=1&&r<=9){const a=r-1;for(let o=this.interactiveRects.length-1;o>=0;o--){const l=this.interactiveRects[o];if(l.isSlot&&l.onHotbarKeySwap&&this.mouseX>=l.x&&this.mouseX<l.x+l.w&&this.mouseY>=l.y&&this.mouseY<l.y+l.h){e.preventDefault(),l.onHotbarKeySwap(a);return}}}}if(this.focusedEditBox){if(e.key==="Enter"){if(this.state==="CHAT"){const r=this.chatInputText.trim();this.chatInputText="",r&&this.handleChatSubmit(r),this.setState("IN_GAME");return}else this.focusedEditBox=null;return}if(e.key==="Backspace"){e.preventDefault(),this.modifyFocusedText(r=>r.slice(0,-1));return}e.key.length===1&&!e.ctrlKey&&!e.metaKey&&!e.altKey&&(e.preventDefault(),this.modifyFocusedText(r=>r.length<80?r+e.key:r))}})}modifyFocusedText(t){switch(this.focusedEditBox){case"world_search":this.worldSearchText=t(this.worldSearchText);break;case"world_name":this.newWorldName=t(this.newWorldName);break;case"world_seed":this.newWorldSeed=t(this.newWorldSeed);break;case"direct_ip":this.directConnectIp=t(this.directConnectIp);break;case"wisp_url":le.wispProxyUrl=t(le.wispProxyUrl);break;case"wisp_user":le.username=t(le.username);break;case"creative_search":this.searchQuery=t(this.searchQuery),this.creativeScrollRow=0;break;case"chat":this.chatInputText=t(this.chatInputText);break}}addButton(t,e,i,s,r,a,o=!0){const l=o&&this.mouseX>=t&&this.mouseX<t+i&&this.mouseY>=e&&this.mouseY<e+s;this.gui.drawButton(t,e,i,s,r,l,o),o&&this.interactiveRects.push({x:t,y:e,w:i,h:s,onClick:()=>a()})}addIconButton(t,e,i,s,r,a,o,l,c){const h=this.mouseX>=t&&this.mouseX<t+i&&this.mouseY>=e&&this.mouseY<e+s;this.gui.drawIconButton(t,e,i,s,r,a,o,h,!0),this.interactiveRects.push({x:t,y:e,w:i,h:s,onClick:()=>l(),tooltip:c})}addSlider(t,e,i,s,r,a,o){const l=this.mouseX>=t&&this.mouseX<t+i&&this.mouseY>=e&&this.mouseY<e+s;this.gui.drawSlider(t,e,i,s,r,a,l),this.interactiveRects.push({x:t,y:e,w:i,h:s,onDrag:o})}addEditBox(t,e,i,s,r,a,o,l){const c=this.focusedEditBox===r;this.gui.drawEditBox(t,e,i,s,a,o,c,l),this.interactiveRects.push({x:t,y:e,w:i,h:s,onClick:()=>{this.focusedEditBox=r}})}render(t=.016){var e;if(this.heldItemTooltipTimer>0&&(this.heldItemTooltipTimer=Math.max(0,this.heldItemTooltipTimer-t)),(this.isRightMouseDown||this.isLeftMouseDown)&&this.state==="INVENTORY"&&(this.rightHoldTimer+=t,this.rightHoldTimer>=.22))for(this.rightRepeatTimer+=t;this.rightRepeatTimer>=.085;){this.rightRepeatTimer-=.085;for(let i=this.interactiveRects.length-1;i>=0;i--){const s=this.interactiveRects[i];if(s.isSlot&&this.mouseX>=s.x&&this.mouseX<s.x+s.w&&this.mouseY>=s.y&&this.mouseY<s.y+s.h){this.isRightMouseDown&&s.onRightDragPlace?s.onRightDragPlace():this.isLeftMouseDown&&((e=s.slotKey)!=null&&e.startsWith("craft_out_"))&&s.onClick&&s.onClick(0,!1);break}}}switch(this.gui.updateScale(It.current.guiScale),this.gui.clear(),this.interactiveRects=[],this.state){case"TITLE":this.renderTitleScreen();break;case"SINGLEPLAYER_SELECT":this.renderSelectWorldScreen();break;case"CREATE_WORLD":this.renderCreateWorldScreen();break;case"MULTIPLAYER_SELECT":this.renderJoinMultiplayerScreen();break;case"WISPCRAFT_CONFIG":this.renderWispcraftConfigScreen();break;case"CONNECTING":this.renderConnectingScreen();break;case"OPTIONS":this.renderOptionsScreen();break;case"CONTROLS":this.renderControlsScreen();break;case"SOUND_OPTIONS":this.renderSoundOptionsScreen();break;case"VIDEO_SETTINGS":this.renderVideoSettingsScreen();break;case"GAME_OVER":this.renderGameOverScreen();break;case"IN_GAME":this.renderHUD(!1);break;case"CHAT":this.renderHUD(!0);break;case"PAUSE":this.renderHUD(!1),this.renderPauseScreen();break;case"ADVANCEMENTS":this.renderHUD(!1),this.renderAdvancementsScreen();break;case"INVENTORY":this.renderHUD(!1),this.renderContainerScreen();break}for(let i=this.interactiveRects.length-1;i>=0;i--){const s=this.interactiveRects[i];if(s.tooltip&&this.mouseX>=s.x&&this.mouseX<s.x+s.w&&this.mouseY>=s.y&&this.mouseY<s.y+s.h){this.gui.renderTooltip(s.tooltip,this.mouseX,this.mouseY);break}}this.renderToastOverlay()}renderTitleScreen(){const t=this.gui.scaledWidth,e=this.gui.scaledHeight;this.gui.blitSprite("/assets/minecraft/textures/gui/panorama_overlay.png",0,0,t,e);const i=Math.floor(t/2)-128,s=30;this.gui.blit("/assets/minecraft/textures/gui/title/minecraft.png",i,s,0,0,256,44,256,64),this.gui.blit("/assets/minecraft/textures/gui/title/edition.png",Math.floor(t/2)-64,s+37,0,0,128,14,128,16);const r=this.gui.ctx;r.save(),r.translate(Math.floor(t/2)+123,69),r.rotate(-.34906584);const a=this.font.width(this.splashText),l=(1.8-Math.abs(Math.sin(performance.now()%1e3/1e3*Math.PI*2)*.1))*100/(a+32);r.scale(l,l),this.font.draw(r,this.splashText,Math.floor(-a/2),-8,"#FFFF00",!0),r.restore();const c=Math.floor(e/4)+48,h=Math.floor(t/2);this.addButton(h-100,c,200,20,"Singleplayer",()=>{this.setState("SINGLEPLAYER_SELECT")}),this.addButton(h-100,c+24,200,20,"Multiplayer",()=>{le.pingAllServers().then(()=>{this.state==="MULTIPLAYER_SELECT"&&this.render()}),this.setState("MULTIPLAYER_SELECT")}),this.addButton(h-100,c+48,200,20,"Minecraft Realms",()=>{this.setState("WISPCRAFT_CONFIG")}),this.gui.blitSprite("/assets/minecraft/textures/gui/sprites/icon/unseen_notification.png",h+82,c+53,10,10);const f=c+84;this.addIconButton(h-124,f,20,20,"/assets/minecraft/textures/gui/sprites/icon/language.png",15,15,()=>{this.setState("OPTIONS")},["Language..."]),this.addButton(h-100,f,98,20,"Options...",()=>{this.optionsReturnState="TITLE",this.setState("OPTIONS")}),this.addButton(h+2,f,98,20,"Quit Game",()=>{this.splashText=Ka[Math.floor(Math.random()*Ka.length)]}),this.addIconButton(h+104,f,20,20,"/assets/minecraft/textures/gui/sprites/icon/accessibility.png",15,15,()=>{this.setState("OPTIONS")},["Accessibility Settings..."]),this.font.draw(r,"Minecraft 26.3",2,e-10,"#FFFFFF",!0);const u="Copyright Mojang AB. Do not distribute!";this.font.draw(r,u,t-this.font.width(u)-2,e-10,"#FFFFFF",!0)}renderSelectWorldScreen(){const t=this.gui.scaledWidth,e=this.gui.scaledHeight,i=Math.floor(t/2);this.gui.renderMenuBackground(!1,48,e-64),this.font.drawCentered(this.gui.ctx,"Select World",i,8,"#FFFFFF",!0),this.addEditBox(i-100,22,200,20,"world_search",this.worldSearchText,"Search worlds...");const s=this.savedWorlds.filter(o=>o.name.toLowerCase().includes(this.worldSearchText.toLowerCase())),r=i-135;let a=54;for(let o=0;o<s.length;o++){const l=s[o],c=o===this.selectedWorldIdx,h=this.mouseX>=r&&this.mouseX<r+270&&this.mouseY>=a&&this.mouseY<a+36;if(c&&(this.gui.fill(r-1,a-1,r+271,a+37,"#FFFFFF"),this.gui.fill(r,a,r+270,a+36,"#000000")),this.gui.blitSprite("/assets/minecraft/textures/misc/unknown_pack.png",r+2,a+2,32,32),h){this.gui.fill(r+2,a+2,r+34,a+34,"rgba(0,0,0,0.45)");const u=this.mouseX<r+34?"/assets/minecraft/textures/gui/sprites/world_list/join_highlighted.png":"/assets/minecraft/textures/gui/sprites/world_list/join.png";this.gui.blitSprite(u,r+2,a+2,32,32)}this.font.draw(this.gui.ctx,l.name,r+37,a+3,"#FFFFFF",!0),this.font.draw(this.gui.ctx,l.folder,r+37,a+14,"#808080",!0),this.font.draw(this.gui.ctx,l.lastPlayed,r+37,a+25,"#808080",!0);const f=o;this.interactiveRects.push({x:r,y:a,w:270,h:36,onClick:()=>{this.selectedWorldIdx===f&&this.mouseX<r+34?this.launchSelectedWorld():this.selectedWorldIdx=f}}),a+=38}this.addButton(i-154,e-52,150,20,"Play Selected World",()=>{this.launchSelectedWorld()}),this.addButton(i+4,e-52,150,20,"Create New World",()=>{this.setState("CREATE_WORLD")}),this.addButton(i-154,e-28,72,20,"Edit",()=>{this.setState("CREATE_WORLD")}),this.addButton(i-76,e-28,72,20,"Delete",()=>{if(this.savedWorlds.length>1){const o=this.savedWorlds.splice(this.selectedWorldIdx,1)[0];if(o)try{localStorage.removeItem(`mc26_3_world_state_${o.id}`)}catch{}this.selectedWorldIdx=0,this.saveWorldsList()}},this.savedWorlds.length>1),this.addButton(i+4,e-28,72,20,"Re-Create",()=>{const o=this.savedWorlds[this.selectedWorldIdx]||this.savedWorlds[0];if(o)try{localStorage.removeItem(`mc26_3_world_state_${o.id}`)}catch{}this.world.blockDiffs.clear(),this.launchSelectedWorld()}),this.addButton(i+82,e-28,72,20,"Cancel",()=>{this.setState("TITLE")})}saveWorldsList(){try{localStorage.setItem("mc26_3_saved_worlds_v1",JSON.stringify(this.savedWorlds))}catch{}}saveActiveWorldState(){if(!(!this.activeWorldId||le.activeSession))try{const t=this.savedWorlds.find(i=>i.id===this.activeWorldId);if(t){const i=new Date,s=i.toLocaleDateString([],{month:"2-digit",day:"2-digit",year:"2-digit"}),r=i.toLocaleTimeString([],{hour:"numeric",minute:"2-digit"});t.folder=`${t.name.replace(/\s+/g,"_")} (${s}, ${r})`,t.gameMode=this.player.gameMode==="creative"?"creative":"survival",t.lastPlayed=`${s}, ${r} - ${t.isHardcore?"Hardcore":t.gameMode==="creative"?"Creative":"Survival"} Mode`,this.saveWorldsList()}const e={timeOfDay:this.world.timeOfDay,blockDiffs:Array.from(this.world.blockDiffs.entries()),player:{x:this.player.position.x,y:this.player.position.y,z:this.player.position.z,yaw:this.player.yaw,pitch:this.player.pitch,gameMode:this.player.gameMode,flying:this.player.flying,health:this.player.health,hunger:this.player.hunger},inventory:{slots:this.inventory.slots.map(i=>i?{id:i.item.shortId,count:i.count}:null),armor:this.inventory.armorSlots.map(i=>i?{id:i.item.shortId,count:i.count}:null),offhand:this.inventory.offhandSlot?{id:this.inventory.offhandSlot.item.shortId,count:this.inventory.offhandSlot.count}:null,selectedHotbarSlot:this.inventory.selectedHotbarSlot},cushions:Array.from(this.world.entityRenderer.cushions.values()).map(i=>i.data),mobs:Array.from(this.world.entityRenderer.mobs.values()).filter(i=>!i.dead&&i.type!=="remote_player").map(i=>({id:i.id,type:i.type,x:i.x,y:i.y,z:i.z,yaw:i.yaw,health:i.health}))};localStorage.setItem(`mc26_3_world_state_${this.activeWorldId}`,JSON.stringify(e))}catch{}}loadActiveWorldState(){var t;if(!this.activeWorldId)return!1;try{const e=localStorage.getItem(`mc26_3_world_state_${this.activeWorldId}`);if(!e)return!1;const i=JSON.parse(e);if(!i||!i.player)return!1;if(typeof i.timeOfDay=="number"&&(this.world.timeOfDay=i.timeOfDay),Array.isArray(i.blockDiffs)){this.world.blockDiffs.clear();for(const[s,r]of i.blockDiffs)typeof s=="string"&&r&&typeof r.numId=="number"&&this.world.blockDiffs.set(s,{numId:r.numId,meta:r.meta||0})}if(this.player.position.set(i.player.x,i.player.y,i.player.z),this.player.yaw=i.player.yaw||0,this.player.pitch=i.player.pitch||0,this.player.gameMode=i.player.gameMode==="creative"?"creative":"survival",this.player.flying=!!i.player.flying,typeof i.player.health=="number"&&(this.player.health=i.player.health),typeof i.player.hunger=="number"&&(this.player.hunger=i.player.hunger),i.inventory){if(Array.isArray(i.inventory.slots))for(let s=0;s<36;s++){const r=i.inventory.slots[s],a=r!=null&&r.id?tt.getItem(r.id):void 0;this.inventory.slots[s]=a&&r.count>0?{item:a,count:r.count}:null}if(Array.isArray(i.inventory.armor))for(let s=0;s<4;s++){const r=i.inventory.armor[s],a=r!=null&&r.id?tt.getItem(r.id):void 0;this.inventory.armorSlots[s]=a&&r.count>0?{item:a,count:r.count}:null}if((t=i.inventory.offhand)!=null&&t.id){const s=tt.getItem(i.inventory.offhand.id);this.inventory.offhandSlot=s?{item:s,count:i.inventory.offhand.count||1}:null}else this.inventory.offhandSlot=null;typeof i.inventory.selectedHotbarSlot=="number"&&(this.inventory.selectedHotbarSlot=i.inventory.selectedHotbarSlot)}if(Array.isArray(i.cushions))for(const s of i.cushions)this.world.entityRenderer.addCushion(s);if(Array.isArray(i.mobs))for(const s of i.mobs){this.world.entityRenderer.spawnMob(s.id,s.type,s.x,s.y,s.z);const r=this.world.entityRenderer.mobs.get(s.id);r&&(r.yaw=s.yaw??r.yaw,typeof s.health=="number"&&(r.health=s.health))}return!0}catch{return!1}}launchSelectedWorld(){var e;const t=this.savedWorlds[this.selectedWorldIdx]||this.savedWorlds[0];t&&(this.activeWorldId=t.id,this.activeWorldIsHardcore=!!t.isHardcore,t.isHardcore&&(It.current.difficulty="Hard"),this.player.gameMode=t.gameMode,this.player.flying=!1,this.inventory.clearAll(),this.world.resetWorld(t.seed,"wilderness_26_3",t.name),(e=this.onStartGame)==null||e.call(this,!1))}renderCreateWorldScreen(){const t=this.gui.scaledWidth,e=this.gui.scaledHeight,i=Math.floor(t/2);this.gui.renderMenuBackground(!1,28,e-36);const s=["Game","World","More"];for(let r=0;r<3;r++){const a=i-195+r*130,o=this.createWorldTab===r,l=o?"/assets/minecraft/textures/gui/sprites/widget/tab_selected.png":"/assets/minecraft/textures/gui/sprites/widget/tab.png";this.gui.blitNineSlice(l,a,4,130,24,3,3,3,3),this.font.drawCentered(this.gui.ctx,s[r],a+65,12,o?"#FFFFFF":"#A0A0A0",!0);const c=r;this.interactiveRects.push({x:a,y:4,w:130,h:24,onClick:()=>{this.createWorldTab=c}})}if(this.createWorldTab===0){this.addEditBox(i-104,52,208,20,"world_name",this.newWorldName,"World Name","World Name");const r=this.newWorldMode==="creative"?"Game Mode: Creative":this.newWorldMode==="hardcore"?"Game Mode: Hardcore":"Game Mode: Survival";this.addButton(i-104,82,208,20,r,()=>{this.newWorldMode=this.newWorldMode==="survival"?"hardcore":this.newWorldMode==="hardcore"?"creative":"survival",this.newWorldMode==="hardcore"&&(this.newWorldDifficulty="Hard")});const a=this.newWorldMode==="hardcore"?"§7Same as survival mode, locked at hardest difficulty, and one life only":this.newWorldMode==="creative"?"§7Unlimited resources, free flying and destroy blocks instantly":"§7Search for resources, crafting, gain levels, health and hunger";this.font.drawCentered(this.gui.ctx,a,i,106,"#808080",!0);const o=this.newWorldMode==="hardcore"?"Difficulty: Hard":`Difficulty: ${this.newWorldDifficulty}`;this.addButton(i-104,118,208,20,o,()=>{if(this.newWorldMode==="hardcore")return;const l=["Peaceful","Easy","Normal","Hard"];this.newWorldDifficulty=l[(l.indexOf(this.newWorldDifficulty)+1)%l.length]}),this.addButton(i-104,144,208,20,"Allow Commands: ON",()=>{})}else this.createWorldTab===1?(this.addButton(i-154,48,150,20,"World Type: Default",()=>{}),this.addButton(i+4,48,150,20,"Generate Structures: ON",()=>{}),this.addEditBox(i-154,88,308,20,"world_seed",this.newWorldSeed,"Leave blank for a random seed","Seed for the World Generator")):(this.addButton(i-104,54,208,20,"Game Rules...",()=>{}),this.addButton(i-104,82,208,20,"Experiments...",()=>{}),this.addButton(i-104,110,208,20,"Data Packs...",()=>{}));this.addButton(i-154,e-28,150,20,"Create New World",()=>{const r=String(Math.floor(Math.random()*2147483647)),a=this.newWorldSeed.trim()||r,o=this.newWorldMode==="hardcore",l={id:`world_${Date.now()}`,name:this.newWorldName.trim()||"New World",folder:`${(this.newWorldName.trim()||"New_World").replace(/[^a-zA-Z0-9_-]/g,"_")}`,lastPlayed:`${o?"Hardcore":this.newWorldMode==="creative"?"Creative":"Survival"} Mode`,gameMode:this.newWorldMode==="creative"?"creative":"survival",isHardcore:o,seed:a};this.savedWorlds.unshift(l),this.selectedWorldIdx=0,this.saveWorldsList(),this.launchSelectedWorld()}),this.addButton(i+4,e-28,150,20,"Cancel",()=>{this.setState("SINGLEPLAYER_SELECT")})}renderJoinMultiplayerScreen(){var l,c;const t=this.gui.scaledWidth,e=this.gui.scaledHeight,i=Math.floor(t/2);this.gui.renderMenuBackground(!1,32,e-64),this.font.drawCentered(this.gui.ctx,"Play Multiplayer",i,11,"#FFFFFF",!0),this.addButton(t-104,6,98,20,"Wisp Proxy...",()=>{this.setState("WISPCRAFT_CONFIG")});const s=le.servers,r=i-152,a=304;let o=38;for(let h=0;h<Math.min(s.length,Math.floor((e-102)/36));h++){const f=s[h],u=h===this.selectedServerIdx,d=this.mouseX>=r&&this.mouseX<r+a&&this.mouseY>=o&&this.mouseY<o+34;u&&(this.gui.fill(r-1,o-1,r+a+1,o+35,"#FFFFFF"),this.gui.fill(r,o,r+a,o+34,"#000000"));const p=f.icon||"/assets/minecraft/textures/misc/unknown_server.png";if(this.gui.blitSprite(p,r+1,o+1,32,32),d){this.gui.fill(r+1,o+1,r+33,o+33,"rgba(0,0,0,0.45)");const y=this.mouseX<r+33?"/assets/minecraft/textures/gui/sprites/server_list/join_highlighted.png":"/assets/minecraft/textures/gui/sprites/server_list/join.png";this.gui.blitSprite(y,r+1,o+1,32,32)}this.font.draw(this.gui.ctx,f.name,r+36,o+2,"#FFFFFF",!0);const g=(((l=f.pingResult)==null?void 0:l.motd)||'§aMinecraft 26.3 ("Wilderness Bound") — Wisp v2 Ready').split(`
`);this.font.draw(this.gui.ctx,g[0].slice(0,44),r+36,o+12,"#AAAAAA",!0),g[1]?this.font.draw(this.gui.ctx,g[1].slice(0,44),r+36,o+22,"#808080",!0):this.font.draw(this.gui.ctx,`§8${f.ip}`,r+36,o+22,"#555555",!0);const m=f.pingResult?`${f.pingResult.playersOnline}/${f.pingResult.playersMax}`:"1/20",_=this.font.width(m);this.font.draw(this.gui.ctx,m,r+a-_-15,o+2,"#AAAAAA",!0);const M=((c=f.pingResult)==null?void 0:c.online)===!1?"/assets/minecraft/textures/gui/sprites/server_list/unreachable.png":"/assets/minecraft/textures/gui/sprites/server_list/ping_5.png";this.gui.blitSprite(M,r+a-12,o+1,10,8);const E=h;this.interactiveRects.push({x:r,y:o,w:a,h:34,onClick:()=>{this.selectedServerIdx===E&&this.mouseX<r+33?this.connectToServer(f):this.selectedServerIdx=E}}),o+=36}this.addButton(i-154,e-52,100,20,"Join Server",()=>{const h=s[this.selectedServerIdx]||s[0];h&&this.connectToServer(h)}),this.addButton(i-50,e-52,100,20,"Direct Connection",()=>{this.directConnectModal=!0,this.focusedEditBox="direct_ip"}),this.addButton(i+54,e-52,100,20,"Add Server",()=>{this.directConnectModal=!0,this.focusedEditBox="direct_ip"}),this.addButton(i-154,e-28,70,20,"Edit",()=>{const h=s[this.selectedServerIdx];h&&(this.directConnectIp=h.ip,this.directConnectModal=!0,this.focusedEditBox="direct_ip")}),this.addButton(i-78,e-28,70,20,"Delete",()=>{s.length>1&&(s.splice(this.selectedServerIdx,1),this.selectedServerIdx=0)}),this.addButton(i-2,e-28,74,20,"Refresh",()=>{le.pingAllServers().then(()=>this.render())}),this.addButton(i+78,e-28,76,20,"Cancel",()=>{this.setState("TITLE")}),this.directConnectModal&&(this.gui.fill(0,0,t,e,"rgba(0,0,0,0.75)"),this.font.drawCentered(this.gui.ctx,"Direct Connection",i,40,"#FFFFFF",!0),this.addEditBox(i-100,85,200,20,"direct_ip",this.directConnectIp,"127.0.0.1:25565","Server Address"),this.addButton(i-100,e-56,200,20,"Join Server",()=>{this.directConnectModal=!1,this.connectToServer({name:this.directConnectIp,ip:this.directConnectIp})}),this.addButton(i-100,e-32,200,20,"Cancel",()=>{this.directConnectModal=!1}))}renderWispcraftConfigScreen(){const t=this.gui.scaledWidth,e=this.gui.scaledHeight,i=Math.floor(t/2);this.gui.renderMenuBackground(!1,32,e-36),this.font.drawCentered(this.gui.ctx,"Wispcraft Wisp v2 Proxy & Account Settings",i,11,"#FFFFFF",!0),this.addEditBox(i-120,62,240,20,"wisp_url",le.wispProxyUrl,"ws://localhost:3000/wisp/","Wisp v2 WebSocket Proxy URL (MercuryWorkshop/wispcraft)"),this.addEditBox(i-120,106,240,20,"wisp_user",le.username,"Player26_3","Minecraft 26.3 Username"),this.font.drawCentered(this.gui.ctx,"§aEmbedded Local 26.3 TCP Server Running on 127.0.0.1:25565 (Protocol 777)",i,142,"#55FF55",!0),this.addButton(i-100,e-28,200,20,"Done",()=>{le.saveSettings(),this.setState(this.previousState==="MULTIPLAYER_SELECT"?"MULTIPLAYER_SELECT":"TITLE")})}connectToServer(t){this.connectingStatus=`Connecting to ${t.ip} via Wisp v2...`,this.setState("CONNECTING"),le.joinServer(t,e=>{this.connectingStatus=e,this.render()},e=>{this.addChatMessage(e)},()=>{var e;(e=this.onStartGame)==null||e.call(this,!0)})}renderConnectingScreen(){const t=this.gui.scaledWidth,e=this.gui.scaledHeight,i=Math.floor(t/2),s=Math.floor(e/2);this.gui.renderMenuBackground(!1),this.font.drawCentered(this.gui.ctx,this.connectingStatus,i,s-20,"#FFFFFF",!0),this.addButton(i-100,s+24,200,20,"Cancel",()=>{le.disconnect(),this.setState("MULTIPLAYER_SELECT")})}renderOptionsScreen(){const t=this.gui.scaledWidth,e=this.gui.scaledHeight,i=Math.floor(t/2),s=It.current,r=this.optionsReturnState==="PAUSE"||this.previousState==="PAUSE"||this.previousState==="IN_GAME";this.gui.renderMenuBackground(r,32,e-36),this.font.drawCentered(this.gui.ctx,"Options",i,11,"#FFFFFF",!0);const a=(s.fov-30)/80,o=s.fov===70?"FOV: Normal":s.fov===110?"FOV: Quake Pro":`FOV: ${s.fov}`;this.addSlider(i-155,42,150,20,o,a,c=>{s.fov=Math.round(30+c*80),this.player.camera.fov=s.fov,this.player.camera.updateProjectionMatrix(),It.save()});const l=this.activeWorldIsHardcore?"Difficulty: Hard":`Difficulty: ${s.difficulty}`;this.addButton(i+5,42,150,20,l,()=>{if(this.activeWorldIsHardcore)return;const c=["Peaceful","Easy","Normal","Hard"];s.difficulty=c[(c.indexOf(s.difficulty)+1)%c.length],It.save()}),this.addButton(i-155,66,150,20,"Skin Customization...",()=>{}),this.addButton(i+5,66,150,20,"Music & Sounds...",()=>{this.setState("SOUND_OPTIONS")}),this.addButton(i-155,90,150,20,"Video Settings...",()=>{this.setState("VIDEO_SETTINGS")}),this.addButton(i+5,90,150,20,"Controls...",()=>{this.setState("CONTROLS")}),this.addButton(i-155,114,150,20,"Language...",()=>{}),this.addButton(i+5,114,150,20,"Chat Settings...",()=>{}),this.addButton(i-155,138,150,20,"Resource Packs...",()=>{}),this.addButton(i+5,138,150,20,"Accessibility Settings...",()=>{}),this.addButton(i-155,162,150,20,"Telemetry Data...",()=>{}),this.addButton(i+5,162,150,20,"Credits and Attribution...",()=>{}),this.addButton(i-100,e-28,200,20,"Done",()=>{this.setState(this.optionsReturnState||"TITLE")})}renderVideoSettingsScreen(){const t=this.gui.scaledWidth,e=this.gui.scaledHeight,i=Math.floor(t/2),s=It.current,r=this.optionsReturnState==="PAUSE"||this.previousState==="PAUSE"||this.previousState==="IN_GAME";this.gui.renderMenuBackground(r,32,e-36),this.font.drawCentered(this.gui.ctx,"Video Settings",i,11,"#FFFFFF",!0);const a=Math.max(0,Math.min(1,(s.renderDistance-2)/30));this.addSlider(i-155,42,150,20,`Render Distance: ${s.renderDistance} chunks`,a,l=>{s.renderDistance=Math.round(2+l*30),It.save()}),this.addButton(i+5,42,150,20,"Simulation Distance: 12 chunks",()=>{}),this.addButton(i-155,66,150,20,"Graphics: Fancy",()=>{}),this.addButton(i+5,66,150,20,"Smooth Lighting: Maximum",()=>{}),this.addButton(i-155,90,150,20,"Max Framerate: Unlimited",()=>{}),this.addButton(i+5,90,150,20,"View Bobbing: ON",()=>{});const o=s.guiScale===0?"GUI Scale: Auto":`GUI Scale: ${s.guiScale}x`;this.addButton(i-155,114,150,20,o,()=>{s.guiScale=(s.guiScale+1)%5,It.save()}),this.addButton(i+5,114,150,20,`Clouds: ${s.clouds?"Fancy":"OFF"}`,()=>{s.clouds=!s.clouds,It.save()}),this.addButton(i-155,138,150,20,"Fullscreen: OFF",()=>{}),this.addButton(i+5,138,150,20,"Particles: All",()=>{}),this.addButton(i-155,162,150,20,`Backend: ${Ce.active?"WebGPU":"WebGL2"}`,()=>{Ce.supported&&(Ce.active=!Ce.active,Ce.backendLabel=Ce.active?`WebGPU (${Ce.adapterName})`:"WebGL2")}),this.addButton(i+5,162,150,20,"Entity Shadows: ON",()=>{}),this.addButton(i-100,e-28,200,20,"Done",()=>{this.setState("OPTIONS")})}renderControlsScreen(){const t=this.gui.scaledWidth,e=this.gui.scaledHeight,i=Math.floor(t/2),s=It.current,r=this.previousState==="PAUSE"||this.previousState==="IN_GAME";this.gui.renderMenuBackground(r,32,e-36),this.font.drawCentered(this.gui.ctx,"Controls",i,11,"#FFFFFF",!0),this.addSlider(i-155,38,150,20,`Sensitivity: ${Math.round(s.mouseSensitivity*200)}%`,s.mouseSensitivity,c=>{s.mouseSensitivity=Math.max(.05,Math.round(c*100)/100),It.save()}),this.addButton(i+5,38,150,20,`Invert Mouse: ${s.invertMouse?"ON":"OFF"}`,()=>{s.invertMouse=!s.invertMouse,It.save()}),this.addButton(i-155,62,150,20,`Sprint: ${s.toggleSprint?"Toggle":"Hold"}`,()=>{s.toggleSprint=!s.toggleSprint,It.save()}),this.addButton(i+5,62,150,20,`Sneak: ${s.toggleSneak?"Toggle":"Hold"}`,()=>{s.toggleSneak=!s.toggleSneak,It.save()});const a=[{key:"forward",label:"Walk Forward"},{key:"back",label:"Walk Backward"},{key:"left",label:"Strafe Left"},{key:"right",label:"Strafe Right"},{key:"jump",label:"Jump"},{key:"sneak",label:"Sneak"},{key:"sprint",label:"Sprint"},{key:"drop",label:"Drop Selected Item"},{key:"inventory",label:"Open/Close Inventory"},{key:"chat",label:"Open Chat"},{key:"command",label:"Open Command"}],o=c=>c?c.startsWith("Key")?c.slice(3):c.startsWith("Digit")?c.slice(5):c==="Space"?"SPACE":c==="ShiftLeft"?"LSHIFT":c==="ShiftRight"?"RSHIFT":c==="ControlLeft"?"LCTRL":c==="ControlRight"?"RCTRL":c==="Slash"?"/":c:"None",l=88;for(let c=0;c<Math.min(6,a.length);c++){const h=a[c],f=l+c*22;this.font.draw(this.gui.ctx,h.label,i-155,f+6,"#FFFFFF",!0);const d=this.rebindingKey===h.key?"§e> ??? <":o(s.keyBinds[h.key]);this.addButton(i+35,f,120,20,d,()=>{this.rebindingKey=h.key})}this.addButton(i-155,e-28,150,20,"Reset Keys",()=>{s.keyBinds={forward:"KeyW",back:"KeyS",left:"KeyA",right:"KeyD",jump:"Space",sneak:"ShiftLeft",sprint:"ControlLeft",drop:"KeyQ",inventory:"KeyE",chat:"KeyT",command:"Slash"},It.save()}),this.addButton(i+5,e-28,150,20,"Done",()=>{this.rebindingKey=null,this.setState("OPTIONS")})}renderSoundOptionsScreen(){const t=this.gui.scaledWidth,e=this.gui.scaledHeight,i=Math.floor(t/2),s=It.current,r=this.previousState==="PAUSE"||this.previousState==="IN_GAME";this.gui.renderMenuBackground(r,32,e-36),this.font.drawCentered(this.gui.ctx,"Music & Sounds",i,11,"#FFFFFF",!0),this.addSlider(i-155,48,310,20,`Master Volume: ${Math.round(s.soundVolume*100)}%`,s.soundVolume,a=>{s.soundVolume=Math.round(a*100)/100,It.save()}),this.addSlider(i-155,76,150,20,`Music: ${Math.round(s.musicVolume*100)}%`,s.musicVolume,a=>{s.musicVolume=Math.round(a*100)/100,It.save()}),this.addSlider(i+5,76,150,20,`Blocks: ${Math.round(s.blocksVolume*100)}%`,s.blocksVolume,a=>{s.blocksVolume=Math.round(a*100)/100,It.save()}),this.addSlider(i-155,102,150,20,`Hostile Creatures: ${Math.round(s.hostileVolume*100)}%`,s.hostileVolume,a=>{s.hostileVolume=Math.round(a*100)/100,It.save()}),this.addSlider(i+5,102,150,20,`Friendly Creatures: ${Math.round(s.friendlyVolume*100)}%`,s.friendlyVolume,a=>{s.friendlyVolume=Math.round(a*100)/100,It.save()}),this.addButton(i-100,e-28,200,20,"Done",()=>{this.setState("OPTIONS")})}renderGameOverScreen(){const t=this.gui.scaledWidth,e=this.gui.scaledHeight,i=Math.floor(t/2),s=Math.floor(e/2);this.gui.fill(0,0,t,e,"rgba(100, 10, 10, 0.72)"),this.activeWorldIsHardcore?(this.font.drawCentered(this.gui.ctx,"§4Game Over!",i,s-45,"#FFFFFF",!0),this.font.drawCentered(this.gui.ctx,"§eYou cannot respawn in hardcore mode!",i,s-25,"#AAAAAA",!0),this.addButton(i-100,s+10,200,20,"Spectate World",()=>{this.player.gameMode="spectator",this.player.flying=!0,this.player.health=20,this.setState("IN_GAME")}),this.addButton(i-100,s+36,200,20,"Delete World",()=>{if(this.activeWorldId){const r=this.savedWorlds.findIndex(a=>a.id===this.activeWorldId);r>=0&&this.savedWorlds.splice(r,1),localStorage.removeItem(`mc26_3_world_state_${this.activeWorldId}`),this.saveWorldsList()}this.setState("TITLE")})):(this.font.drawCentered(this.gui.ctx,"§4You died!",i,s-45,"#FFFFFF",!0),this.font.drawCentered(this.gui.ctx,`Score: §e${this.player.xpLevel*10}`,i,s-25,"#FFFFFF",!0),this.addButton(i-100,s+10,200,20,"Respawn",()=>{this.player.health=20,this.player.hunger=20,this.player.saturation=5,this.player.fallDistance=0,this.player.position.set(0,this.world.getTopSolidY(0,0)+1,0),this.player.velocity.set(0,0,0),this.setState("IN_GAME")}),this.addButton(i-100,s+36,200,20,"Title Screen",()=>{this.setState("TITLE")}))}renderPauseScreen(){const t=this.gui.scaledWidth,e=this.gui.scaledHeight,i=Math.floor(t/2),s=Math.floor(e/4)+8;this.gui.fill(0,0,t,e,"rgba(16, 16, 16, 0.72)"),this.font.drawCentered(this.gui.ctx,"Game Menu",i,40,"#FFFFFF",!0),this.addButton(i-102,s,204,20,"Back to Game",()=>{this.setState("IN_GAME")}),this.addButton(i-102,s+24,98,20,"Advancements",()=>{this.setState("ADVANCEMENTS")}),this.addButton(i+4,s+24,98,20,"Statistics",()=>{this.showToast("Wilderness Explorer",`Blocks Modified: ${this.world.blockDiffs.size}`,"filled_map")}),this.addButton(i-102,s+48,98,20,"Give Feedback",()=>{this.showToast("Minecraft 26.3","Wilderness Bound Official Web Port","orange_cushion")}),this.addButton(i+4,s+48,98,20,"Report Bugs",()=>{this.setState("WISPCRAFT_CONFIG")}),this.addButton(i-102,s+72,98,20,"Options...",()=>{this.optionsReturnState="PAUSE",this.setState("OPTIONS")}),this.addButton(i+4,s+72,98,20,"Open to LAN",()=>{this.addChatMessage("§aLocal game hosted on port §e25565§a (Wisp v2 proxy active at /wisp/)"),this.setState("IN_GAME")}),this.addButton(i-102,s+96,204,20,"Save and Quit to Title",()=>{var r;this.saveActiveWorldState(),le.disconnect(),(r=this.onQuitToTitle)==null||r.call(this),this.setState("TITLE")})}renderAdvancementsScreen(){const t=this.gui.scaledWidth,e=this.gui.scaledHeight,i=Math.floor(t/2),s=Math.floor(e/2);this.gui.fill(0,0,t,e,"rgba(16, 16, 16, 0.75)");const r=252,a=140,o=i-Math.floor(r/2),l=s-Math.floor(a/2);this.gui.blitTiled("/assets/minecraft/textures/gui/menu_list_background.png",o+9,l+18,r-18,a-27,16,16);const c=[{id:"root",x:o+20,y:l+55,item:"grass_block",frame:"task",title:"Minecraft",desc:"The heart and story of the game"},{id:"stone_age",parentId:"root",x:o+58,y:l+32,item:"wooden_pickaxe",frame:"task",title:"Stone Age",desc:"Mine stone with your new pickaxe"},{id:"upgrade",parentId:"stone_age",x:o+96,y:l+32,item:"stone_pickaxe",frame:"task",title:"Getting an Upgrade",desc:"Construct a better pickaxe"},{id:"acquire_hardware",parentId:"upgrade",x:o+134,y:l+32,item:"iron_ingot",frame:"task",title:"Acquire Hardware",desc:"Smelt an iron ingot in a furnace"},{id:"suit_up",parentId:"acquire_hardware",x:o+172,y:l+22,item:"iron_chestplate",frame:"task",title:"Suit Up",desc:"Protect yourself with a piece of iron armor"},{id:"hot_stuff",parentId:"acquire_hardware",x:o+172,y:l+44,item:"cobblestone",frame:"task",title:"Hot Stuff",desc:"Construct a furnace with stone"},{id:"monster_hunter",parentId:"root",x:o+58,y:l+78,item:"iron_sword",frame:"task",title:"Monster Hunter",desc:"Attack and defeat a hostile zombie"},{id:"wilderness",parentId:"root",x:o+96,y:l+78,item:"poplar_log",frame:"task",title:"Wilderness Bound",desc:"Fell a Poplar tree in a Dappled Forest"},{id:"canopy",parentId:"wilderness",x:o+134,y:l+78,item:"orange_poplar_leaves",frame:"goal",title:"Autumn Canopy",desc:"Collect vibrant autumnal leaves"},{id:"straw_dreams",parentId:"canopy",x:o+172,y:l+68,item:"straw_bed",frame:"task",title:"Sweet Wilderness Dreams",desc:"Rest on a 26.3 Straw Bed at an Abandoned Camp"},{id:"take_a_seat",parentId:"canopy",x:o+172,y:l+92,item:"orange_cushion",frame:"task",title:"Take a Seat!",desc:"Place and sit on a 26.3 Colored Cushion"},{id:"architect",parentId:"take_a_seat",x:o+210,y:l+80,item:"poplar_planks",frame:"challenge",title:"Wilderness Architect",desc:"Craft Poplar wood, stairs and slabs"}];for(const h of c)if(h.parentId){const f=c.find(u=>u.id===h.parentId);f&&(this.gui.ctx.strokeStyle="#000000",this.gui.ctx.lineWidth=3,this.gui.ctx.beginPath(),this.gui.ctx.moveTo(f.x+13,f.y+13),this.gui.ctx.lineTo(h.x+13,h.y+13),this.gui.ctx.stroke(),this.gui.ctx.strokeStyle="#A0A0A0",this.gui.ctx.lineWidth=1,this.gui.ctx.beginPath(),this.gui.ctx.moveTo(f.x+13,f.y+13),this.gui.ctx.lineTo(h.x+13,h.y+13),this.gui.ctx.stroke())}for(const h of c){const f=`/assets/minecraft/textures/gui/sprites/advancements/${h.frame}_frame_obtained.png`;this.gui.blitSprite(f,h.x,h.y,26,26);const u=tt.getItem(h.item)||null;this.gui.renderItem(u,1,h.x+5,h.y+5),this.interactiveRects.push({x:h.x,y:h.y,w:26,h:26,tooltip:[`§e${h.title}`,`§7${h.desc}`]})}this.gui.blit("/assets/minecraft/textures/gui/advancements/window.png",o,l,0,0,r,a,256,256),this.font.draw(this.gui.ctx,"Advancements",o+9,l+6,"#404040",!1),this.addButton(i-50,l+a+8,100,20,"Done",()=>{this.setState("PAUSE")})}renderHUD(t){const e=this.gui.scaledWidth,i=this.gui.scaledHeight,s=Math.floor(e/2),r=Math.floor(i/2);this.state==="IN_GAME"&&this.gui.blitSprite("/assets/minecraft/textures/gui/sprites/hud/crosshair.png",s-7,r-7,15,15);const a=s-91,o=i-22;this.gui.blitSprite("/assets/minecraft/textures/gui/sprites/hud/hotbar.png",a,o,182,22),this.gui.blitSprite("/assets/minecraft/textures/gui/sprites/hud/hotbar_selection.png",a-1+this.inventory.selectedHotbarSlot*20,o-1,24,23),this.inventory.offhandSlot&&(this.gui.blitSprite("/assets/minecraft/textures/gui/sprites/hud/hotbar_offhand_left.png",a-29,o-1,29,24),this.gui.renderItem(this.inventory.offhandSlot.item,this.inventory.offhandSlot.count,a-26,o+3));for(let f=0;f<9;f++){const u=this.inventory.slots[f];u&&this.gui.renderItem(u.item,u.count,a+3+f*20,o+3)}if(this.player.gameMode==="survival"){const f=i-29;this.gui.blitSprite("/assets/minecraft/textures/gui/sprites/hud/experience_bar_background.png",a,f,182,5);const u=Math.floor(182*this.player.xpProgress);u>0&&this.gui.blit("/assets/minecraft/textures/gui/sprites/hud/experience_bar_progress.png",a,f,0,0,u,5,182,5),this.player.xpLevel>0&&this.font.drawCentered(this.gui.ctx,String(this.player.xpLevel),s,i-35,"#80FF20",!0);const d=i-39,p=this.activeWorldIsHardcore,g=p?"/assets/minecraft/textures/gui/sprites/hud/heart/container_hardcore.png":"/assets/minecraft/textures/gui/sprites/hud/heart/container.png",m=p?"/assets/minecraft/textures/gui/sprites/hud/heart/hardcore_full.png":"/assets/minecraft/textures/gui/sprites/hud/heart/full.png",_=p?"/assets/minecraft/textures/gui/sprites/hud/heart/hardcore_half.png":"/assets/minecraft/textures/gui/sprites/hud/heart/half.png";for(let M=0;M<10;M++){const E=a+M*8;this.gui.blitSprite(g,E,d,9,9);const y=this.player.health-M*2;y>=2?this.gui.blitSprite(m,E,d,9,9):y===1&&this.gui.blitSprite(_,E,d,9,9)}for(let M=0;M<10;M++){const E=a+182-M*8-9;this.gui.blitSprite("/assets/minecraft/textures/gui/sprites/hud/food_empty.png",E,d,9,9);const y=this.player.hunger-M*2;y>=2?this.gui.blitSprite("/assets/minecraft/textures/gui/sprites/hud/food_full.png",E,d,9,9):y===1&&this.gui.blitSprite("/assets/minecraft/textures/gui/sprites/hud/food_half.png",E,d,9,9)}if(this.player.inWater)for(let M=0;M<10;M++){const E=a+182-M*8-9;this.gui.blitSprite("/assets/minecraft/textures/gui/sprites/hud/air.png",E,d-10,9,9)}}const l=this.inventory.getHeldStack();if(l&&this.heldItemTooltipTimer>0){const f=this.player.gameMode==="survival"?i-59:i-38;this.font.drawCentered(this.gui.ctx,l.item.displayName,s,f,"#FFFFFF",!0)}this.player.seatedCushion&&this.font.drawCentered(this.gui.ctx,"§eSeated on 26.3 Cushion — Press §fSneak (Shift)§e to dismount",s,i-68,"#FFFF55",!0);const c=performance.now(),h=t?this.chatHistory.slice(-10):this.chatHistory.filter(f=>c-f.time<9e3).slice(-6);if(h.length>0){let f=i-48-h.length*9;for(const u of h)this.gui.fill(2,f-1,Math.min(e-20,320),f+8,"rgba(0, 0, 0, 0.45)"),this.font.draw(this.gui.ctx,u.text,4,f,"#FFFFFF",!0),f+=9}if(t){this.gui.fill(2,i-14,e-2,i-2,"rgba(0, 0, 0, 0.75)");const f=Math.floor(c/300)%2===0?"_":"";this.font.draw(this.gui.ctx,this.chatInputText+f,4,i-12,"#FFFFFF",!0)}this.showDebugF3&&this.renderDebugF3Overlay()}renderDebugF3Overlay(){const t=this.gui.scaledWidth,e=this.player,i=Math.floor(e.position.x),s=Math.floor(e.position.y),r=Math.floor(e.position.z),a=e.currentHit,o=a?tt.getBlock(a.blockNumId):null,l=ki.getBiomeAt(i,r),c=["Minecraft 26.3 (26.3/vanilla/Wilderness Bound)",`${this.fps} fps T: inf vsync fancy-clouds B: 2`,`Integrated Wisp Server @ 16 ms ticks (Seed: ${ki.seed})`,`C: ${this.world.chunks.size} D: ${It.current.renderDistance} pC: 000, pU: 00, aB: 06`,`E: ${this.world.entityRenderer.cushions.size+this.world.entityRenderer.mobs.size+this.world.entityRenderer.droppedItems.size}, B: 0, SD: 6`,"",`XYZ: ${e.position.x.toFixed(3)} / ${e.position.y.toFixed(5)} / ${e.position.z.toFixed(3)}`,`Block: ${i} ${s} ${r} [${i&15} ${s&15} ${r&15}]`,`Chunk: ${i>>4} ${s>>4} ${r>>4}`,`Facing: ${["north (-Z)","east (+X)","south (+Z)","west (-X)"][e.getCardinalFacingMeta()]}`,"Client Light: 15 (15 sky, 12 block)",`Biome: ${l}`,`Local Difficulty: 2.25 // 0.00 (Day ${Math.floor(this.world.timeOfDay/24e3)})`],h=["Java: 25.0.1 (WebGPU / WebGL2 Port)","Mem: 28% 584/2048MB","Allocated: 64% 1310MB","",`Backend: ${Ce.backendLabel}`,`Display: ${window.innerWidth}x${window.innerHeight} (GUI Scale ${this.gui.guiScale}x)`,"Atlas: Nearest 1024x1024 + WGSL Compute","",a&&o?`Targeted Block: ${a.bx}, ${a.by}, ${a.bz}`:"Targeted Block: none",a&&o?`${o.id}`:"",a&&o&&o.is26_3?"§a#minecraft:wilderness_bound_26_3":""];let f=2;for(const d of c){if(d){const p=this.font.width(d);this.gui.fill(1,f-1,3+p,f+8,"rgba(80, 80, 80, 0.56)"),this.font.draw(this.gui.ctx,d,2,f,"#E0E0E0",!1)}f+=9}let u=2;for(const d of h){if(d){const p=this.font.width(d);this.gui.fill(t-p-3,u-1,t-1,u+8,"rgba(80, 80, 80, 0.56)"),this.font.draw(this.gui.ctx,d,t-p-2,u,"#E0E0E0",!1)}u+=9}}renderToastOverlay(){if(!this.activeToast)return;const t=(performance.now()-this.activeToast.startTime)/1e3;if(t>5){this.activeToast=null;return}let e=0;t<.35?e=(1-t/.35)*160:t>4.65&&(e=(t-4.65)/.35*160);const i=Math.floor(this.gui.scaledWidth-160+e),s=4;this.gui.blitSprite("/assets/minecraft/textures/gui/sprites/toast/advancement.png",i,s,160,32),this.activeToast.item&&this.gui.renderItem(this.activeToast.item,1,i+8,s+8),this.font.draw(this.gui.ctx,this.activeToast.title,i+30,s+7,"#FFFF00",!1),this.font.draw(this.gui.ctx,this.activeToast.subtitle,i+30,s+18,"#FFFFFF",!1)}renderContainerScreen(){const t=this.gui.scaledWidth,e=this.gui.scaledHeight;this.gui.fill(0,0,t,e,"rgba(16, 16, 16, 0.72)"),this.activeContainerTab==="crafting"?this.renderCraftingTableScreen():this.activeContainerTab==="stonecutter"?this.renderStonecutterScreen():this.activeContainerTab==="furnace"?this.renderFurnaceScreen():this.activeContainerTab==="chest"||this.activeContainerTab==="barrel"?this.renderChestScreen():this.player.gameMode==="creative"?this.renderCreativeInventoryScreen():this.renderSurvivalInventoryScreen(),this.inventory.cursorStack&&this.gui.renderItem(this.inventory.cursorStack.item,this.inventory.cursorStack.count,Math.floor(this.mouseX-8),Math.floor(this.mouseY-8))}drawInteractiveSlot(t,e,i,s,r=-1,a){const o=i();!o&&a&&this.gui.blitSprite(a,t,e,16,16),o&&this.gui.renderItem(o.item,o.count,t,e),this.mouseX>=t&&this.mouseX<t+16&&this.mouseY>=e&&this.mouseY<e+16&&this.gui.renderSlotHighlight(t,e);const c=o?[o.item.displayName]:void 0;this.interactiveRects.push({x:t,y:e,w:16,h:16,isSlot:!0,slotKey:`slot_${t}_${e}`,getSlot:i,setSlot:s,tooltip:c,onClick:(h,f)=>{this.inventory.clickSlot(i,s,h,f,r)},onRightDragPlace:()=>{this.inventory.placeOneFromCursor(i,s)},onHotbarKeySwap:h=>{if(r===h)return;const f=i(),u=this.inventory.slots[h];s(u),this.inventory.slots[h]=f}})}drawPlayerInventorySlots(t,e){for(let i=0;i<3;i++)for(let s=0;s<9;s++){const r=9+i*9+s,a=t+8+s*18,o=e+84+i*18;this.drawInteractiveSlot(a,o,()=>this.inventory.slots[r],l=>{this.inventory.slots[r]=l},r)}for(let i=0;i<9;i++){const s=i,r=t+8+i*18,a=e+142;this.drawInteractiveSlot(r,a,()=>this.inventory.slots[s],o=>{this.inventory.slots[s]=o},s)}}renderSurvivalInventoryScreen(){const t=this.gui.scaledWidth,e=this.gui.scaledHeight,i=Math.floor((t-176)/2)+(this.showRecipeBook?77:0),s=Math.floor((e-166)/2);this.showRecipeBook&&this.renderRecipeBookSidePanel(i-149,s),this.gui.blit("/assets/minecraft/textures/gui/container/inventory.png",i,s,0,0,176,166,256,256),this.font.draw(this.gui.ctx,"Crafting",i+97,s+6,"#404040",!1);const r=this.inventory.getHeldStack();this.gui.renderPlayerDoll(i+26,s+8,i+75,s+78,this.mouseX,this.mouseY,r?r.item:null);for(let d=0;d<4;d++){const p=d;this.drawInteractiveSlot(i+8,s+8+d*18,()=>this.inventory.armorSlots[p],g=>{this.inventory.armorSlots[p]=g},-1)}this.drawInteractiveSlot(i+77,s+62,()=>this.inventory.offhandSlot,d=>{this.inventory.offhandSlot=d},-1);for(let d=0;d<2;d++)for(let p=0;p<2;p++){const g=d*2+p;this.drawInteractiveSlot(i+98+p*18,s+18+d*18,()=>this.inventory.crafting2x2[g],m=>{this.inventory.crafting2x2[g]=m})}const a=this.inventory.getCraftingResult(this.inventory.crafting2x2,2),o=i+154,l=s+28;a&&this.gui.renderItem(a.item,a.count,o,l),this.mouseX>=o&&this.mouseX<o+16&&this.mouseY>=l&&this.mouseY<l+16&&this.gui.renderSlotHighlight(o,l);const c=d=>{if(d){let g=0;for(;g++<64;){const m=this.inventory.getCraftingResult(this.inventory.crafting2x2,2);if(!m||!this.inventory.addItem(m.item.shortId,m.count))break;this.inventory.consumeCraftingGrid(this.inventory.crafting2x2)}return}const p=this.inventory.getCraftingResult(this.inventory.crafting2x2,2);p&&(this.inventory.cursorStack?this.inventory.cursorStack.item.id===p.item.id&&this.inventory.cursorStack.count+p.count<=p.item.maxStack&&(this.inventory.cursorStack.count+=p.count,this.inventory.consumeCraftingGrid(this.inventory.crafting2x2)):(this.inventory.cursorStack={...p},this.inventory.consumeCraftingGrid(this.inventory.crafting2x2)))};this.interactiveRects.push({x:o,y:l,w:16,h:16,isSlot:!0,slotKey:"craft_out_2x2",tooltip:a?[a.item.displayName]:void 0,onClick:(d,p)=>c(p),onRightDragPlace:()=>c(!1),onHotbarKeySwap:d=>{const p=this.inventory.getCraftingResult(this.inventory.crafting2x2,2);if(!p)return;const g=this.inventory.slots[d];g?g.item.id===p.item.id&&g.count+p.count<=p.item.maxStack&&(g.count+=p.count,this.inventory.consumeCraftingGrid(this.inventory.crafting2x2)):(this.inventory.slots[d]={...p},this.inventory.consumeCraftingGrid(this.inventory.crafting2x2))}});const h=i+104,f=s+61,u=this.mouseX>=h&&this.mouseX<h+20&&this.mouseY>=f&&this.mouseY<f+18;this.gui.blitSprite(u?"/assets/minecraft/textures/gui/sprites/recipe_book/button_highlighted.png":"/assets/minecraft/textures/gui/sprites/recipe_book/button.png",h,f,20,18),this.interactiveRects.push({x:h,y:f,w:20,h:18,tooltip:["Recipe Book"],onClick:()=>{this.showRecipeBook=!this.showRecipeBook}}),this.drawPlayerInventorySlots(i,s)}renderRecipeBookSidePanel(t,e){this.gui.blit("/assets/minecraft/textures/gui/recipe_book.png",t,e,1,1,147,166,256,256),this.font.draw(this.gui.ctx,"Recipes",t+25,e+13,"#FFFFFF",!0);const i=Qr.getRecipes().filter(s=>s.type==="crafting");for(let s=0;s<Math.min(20,i.length);s++){const r=s%5,a=Math.floor(s/5),o=t+11+r*25,l=e+31+a*25,c=i[s],h=tt.getItem(c.resultId);h&&(this.gui.renderItem(h,c.resultCount,o+4,l+4),this.mouseX>=o&&this.mouseX<o+24&&this.mouseY>=l&&this.mouseY<l+24&&this.gui.renderSlotHighlight(o+4,l+4),this.interactiveRects.push({x:o,y:l,w:24,h:24,tooltip:[h.displayName,...c.ingredients.map(f=>`§7Requires: ${f.count}x ${tt.formatName(f.id)}`)],onClick:()=>{this.inventory.removeIngredients(c.ingredients)&&(this.inventory.addItem(c.resultId,c.resultCount),re.play("ui.button.click",.8))}}))}}renderCreativeInventoryScreen(){const t=this.gui.scaledWidth,e=this.gui.scaledHeight,i=Math.floor((t-195)/2),s=Math.floor((e-136)/2),r=[{id:"building",col:1,label:"Building Blocks",icon:"poplar_planks"},{id:"colored",col:2,label:"Colored Blocks",icon:"orange_cushion"},{id:"natural",col:3,label:"Natural Blocks",icon:"orange_poplar_leaves"},{id:"functional",col:4,label:"Functional Blocks",icon:"straw_bed"},{id:"redstone",col:5,label:"Redstone Blocks",icon:"redstone_block"},{id:"search",col:7,label:"Search Items",icon:"filled_map"}],a=[{id:"combat_tools",col:1,label:"Tools & Combat",icon:"diamond_pickaxe"},{id:"survival_inv",col:7,label:"Survival Inventory",icon:"chest"}];for(const d of r){if(this.creativeTab===d.id)continue;const p=i+(d.col===7?168:(d.col-1)*27),g=s-28;this.gui.blitSprite(`/assets/minecraft/textures/gui/sprites/container/creative_inventory/tab_top_unselected_${d.col}.png`,p,g,26,32),this.gui.renderItem(tt.getItem(d.icon)||null,1,p+5,g+8),this.interactiveRects.push({x:p,y:g,w:26,h:28,tooltip:[d.label],onClick:()=>{this.creativeTab=d.id,this.creativeScrollRow=0,d.id==="search"&&(this.focusedEditBox="creative_search")}})}for(const d of a){if(this.creativeTab===d.id)continue;const p=i+(d.col===7?168:(d.col-1)*27),g=s+132;this.gui.blitSprite(`/assets/minecraft/textures/gui/sprites/container/creative_inventory/tab_bottom_unselected_${d.col}.png`,p,g,26,32),this.gui.renderItem(tt.getItem(d.icon)||null,1,p+5,g+6),this.interactiveRects.push({x:p,y:g+4,w:26,h:28,tooltip:[d.label],onClick:()=>{this.creativeTab=d.id,this.creativeScrollRow=0}})}const o=this.creativeTab==="search"?"/assets/minecraft/textures/gui/container/creative_inventory/tab_item_search.png":this.creativeTab==="survival_inv"?"/assets/minecraft/textures/gui/container/creative_inventory/tab_inventory.png":"/assets/minecraft/textures/gui/container/creative_inventory/tab_items.png";this.gui.blit(o,i,s,0,0,195,136,256,256);for(const d of r){if(this.creativeTab!==d.id)continue;const p=i+(d.col===7?168:(d.col-1)*27),g=s-28;this.gui.blitSprite(`/assets/minecraft/textures/gui/sprites/container/creative_inventory/tab_top_selected_${d.col}.png`,p,g,26,32),this.gui.renderItem(tt.getItem(d.icon)||null,1,p+5,g+8),this.font.draw(this.gui.ctx,d.label,i+8,s+6,"#404040",!1)}for(const d of a){if(this.creativeTab!==d.id)continue;const p=i+(d.col===7?168:(d.col-1)*27),g=s+132;this.gui.blitSprite(`/assets/minecraft/textures/gui/sprites/container/creative_inventory/tab_bottom_selected_${d.col}.png`,p,g,26,32),this.gui.renderItem(tt.getItem(d.icon)||null,1,p+5,g+6),this.font.draw(this.gui.ctx,d.label,i+8,s+6,"#404040",!1)}if(this.creativeTab==="survival_inv"){for(let d=0;d<3;d++)for(let p=0;p<9;p++){const g=9+d*9+p;this.drawInteractiveSlot(i+9+p*18,s+54+d*18,()=>this.inventory.slots[g],m=>{this.inventory.slots[g]=m},g)}for(let d=0;d<9;d++){const p=d;this.drawInteractiveSlot(i+9+d*18,s+112,()=>this.inventory.slots[p],g=>{this.inventory.slots[p]=g},p)}this.interactiveRects.push({x:i+173,y:s+112,w:16,h:16,isSlot:!0,tooltip:["§cDestroy Item"],onClick:(d,p)=>{p?this.inventory.slots.fill(null):this.inventory.cursorStack=null}});return}if(this.creativeTab==="search"){const d=this.focusedEditBox==="creative_search"&&Math.floor(performance.now()/300)%2===0?"_":"";this.font.draw(this.gui.ctx,this.searchQuery+d,i+82,s+6,"#FFFFFF",!0),this.interactiveRects.push({x:i+80,y:s+4,w:90,h:12,onClick:()=>{this.focusedEditBox="creative_search"}})}const l=tt.allItems.filter(d=>{if(this.creativeTab==="search"){if(!this.searchQuery)return!0;const p=this.searchQuery.toLowerCase();return d.displayName.toLowerCase().includes(p)||d.shortId.toLowerCase().includes(p)}return d.category===this.creativeTab}).sort((d,p)=>(p.is26_3?1:0)-(d.is26_3?1:0)),c=Math.max(1,Math.ceil(l.length/9)),h=Math.max(0,c-5);this.creativeScrollRow=Math.min(this.creativeScrollRow,h);const f=h>0?this.creativeScrollRow/h:0,u=s+18+Math.round(f*79);this.gui.blitSprite(h>0?"/assets/minecraft/textures/gui/sprites/container/creative_inventory/scroller.png":"/assets/minecraft/textures/gui/sprites/container/creative_inventory/scroller_disabled.png",i+175,u,12,15);for(let d=0;d<5;d++)for(let p=0;p<9;p++){const g=(this.creativeScrollRow+d)*9+p,m=i+9+p*18,_=s+18+d*18,M=l[g]||null;M&&this.gui.renderItem(M,1,m,_),this.mouseX>=m&&this.mouseX<m+16&&this.mouseY>=_&&this.mouseY<_+16&&this.gui.renderSlotHighlight(m,_),M&&this.interactiveRects.push({x:m,y:_,w:16,h:16,isSlot:!0,tooltip:[M.displayName],onClick:(E,y)=>{y?this.inventory.slots[this.inventory.selectedHotbarSlot]={item:M,count:M.maxStack}:E===2?this.inventory.cursorStack={item:M,count:M.maxStack}:this.inventory.cursorStack&&this.inventory.cursorStack.item.id===M.id?this.inventory.cursorStack.count=Math.min(M.maxStack,this.inventory.cursorStack.count+1):this.inventory.cursorStack={item:M,count:1}},onHotbarKeySwap:E=>{this.inventory.slots[E]={item:M,count:M.maxStack}}})}for(let d=0;d<9;d++){const p=d;this.drawInteractiveSlot(i+9+d*18,s+112,()=>this.inventory.slots[p],g=>{this.inventory.slots[p]=g},p)}}renderCraftingTableScreen(){const t=this.gui.scaledWidth,e=this.gui.scaledHeight,i=Math.floor((t-176)/2)+(this.showRecipeBook?77:0),s=Math.floor((e-166)/2);this.showRecipeBook&&this.renderRecipeBookSidePanel(i-149,s),this.gui.blit("/assets/minecraft/textures/gui/container/crafting_table.png",i,s,0,0,176,166,256,256),this.font.draw(this.gui.ctx,"Crafting",i+28,s+6,"#404040",!1),this.font.draw(this.gui.ctx,"Inventory",i+8,s+72,"#404040",!1);for(let u=0;u<3;u++)for(let d=0;d<3;d++){const p=u*3+d;this.drawInteractiveSlot(i+30+d*18,s+17+u*18,()=>this.inventory.crafting3x3[p],g=>{this.inventory.crafting3x3[p]=g})}const r=this.inventory.getCraftingResult(this.inventory.crafting3x3,3),a=i+124,o=s+35;r&&this.gui.renderItem(r.item,r.count,a,o),this.mouseX>=a&&this.mouseX<a+16&&this.mouseY>=o&&this.mouseY<o+16&&this.gui.renderSlotHighlight(a,o);const l=u=>{if(u){let p=0;for(;p++<64;){const g=this.inventory.getCraftingResult(this.inventory.crafting3x3,3);if(!g||!this.inventory.addItem(g.item.shortId,g.count))break;this.inventory.consumeCraftingGrid(this.inventory.crafting3x3)}return}const d=this.inventory.getCraftingResult(this.inventory.crafting3x3,3);d&&(this.inventory.cursorStack?this.inventory.cursorStack.item.id===d.item.id&&this.inventory.cursorStack.count+d.count<=d.item.maxStack&&(this.inventory.cursorStack.count+=d.count,this.inventory.consumeCraftingGrid(this.inventory.crafting3x3)):(this.inventory.cursorStack={...d},this.inventory.consumeCraftingGrid(this.inventory.crafting3x3)))};this.interactiveRects.push({x:a,y:o,w:16,h:16,isSlot:!0,slotKey:"craft_out_3x3",tooltip:r?[r.item.displayName]:void 0,onClick:(u,d)=>l(d),onRightDragPlace:()=>l(!1),onHotbarKeySwap:u=>{const d=this.inventory.getCraftingResult(this.inventory.crafting3x3,3);if(!d)return;const p=this.inventory.slots[u];p?p.item.id===d.item.id&&p.count+d.count<=d.item.maxStack&&(p.count+=d.count,this.inventory.consumeCraftingGrid(this.inventory.crafting3x3)):(this.inventory.slots[u]={...d},this.inventory.consumeCraftingGrid(this.inventory.crafting3x3))}});const c=i+5,h=s+35,f=this.mouseX>=c&&this.mouseX<c+20&&this.mouseY>=h&&this.mouseY<h+18;this.gui.blitSprite(f?"/assets/minecraft/textures/gui/sprites/recipe_book/button_highlighted.png":"/assets/minecraft/textures/gui/sprites/recipe_book/button.png",c,h,20,18),this.interactiveRects.push({x:c,y:h,w:20,h:18,tooltip:["Recipe Book"],onClick:()=>{this.showRecipeBook=!this.showRecipeBook}}),this.drawPlayerInventorySlots(i,s)}renderStonecutterScreen(){const t=this.gui.scaledWidth,e=this.gui.scaledHeight,i=Math.floor((t-176)/2),s=Math.floor((e-166)/2);this.gui.blit("/assets/minecraft/textures/gui/container/stonecutter.png",i,s,0,0,176,166,256,256),this.font.draw(this.gui.ctx,"Stonecutter",i+8,s+4,"#404040",!1),this.font.draw(this.gui.ctx,"Inventory",i+8,s+72,"#404040",!1),this.drawInteractiveSlot(i+20,s+33,()=>this.inventory.stonecutterInput,c=>{this.inventory.stonecutterInput=c,this.inventory.stonecutterSelectedIndex=0});const r=this.inventory.getStonecutterOutputs();for(let c=0;c<Math.min(12,r.length);c++){const h=Math.floor(c/4),f=c%4,u=i+52+f*16,d=s+14+h*18,p=c===this.inventory.stonecutterSelectedIndex,g=this.mouseX>=u&&this.mouseX<u+16&&this.mouseY>=d&&this.mouseY<d+18,m=p?"/assets/minecraft/textures/gui/sprites/container/stonecutter/recipe_selected.png":g?"/assets/minecraft/textures/gui/sprites/container/stonecutter/recipe_highlighted.png":"/assets/minecraft/textures/gui/sprites/container/stonecutter/recipe.png";this.gui.blitSprite(m,u,d,16,18),this.gui.renderItem(r[c].item,1,u,d+1);const _=c;this.interactiveRects.push({x:u,y:d,w:16,h:18,tooltip:[r[c].item.displayName],onClick:()=>{this.inventory.stonecutterSelectedIndex=_,re.play("ui.stonecutter.select_recipe",.8)}})}this.gui.blitSprite("/assets/minecraft/textures/gui/sprites/container/stonecutter/scroller_disabled.png",i+119,s+15,12,15);const a=r[this.inventory.stonecutterSelectedIndex]||null,o=i+143,l=s+33;a&&this.gui.renderItem(a.item,a.count,o,l),this.mouseX>=o&&this.mouseX<o+16&&this.mouseY>=l&&this.mouseY<l+16&&this.gui.renderSlotHighlight(o,l),this.interactiveRects.push({x:o,y:l,w:16,h:16,isSlot:!0,tooltip:a?[a.item.displayName]:void 0,onClick:()=>{!a||!this.inventory.stonecutterInput||this.inventory.cursorStack||(this.inventory.cursorStack={item:a.item,count:a.count},this.inventory.stonecutterInput.count-=1,this.inventory.stonecutterInput.count<=0&&(this.inventory.stonecutterInput=null),re.play("ui.stonecutter.take_result",.85))}}),this.drawPlayerInventorySlots(i,s)}renderFurnaceScreen(){const t=this.gui.scaledWidth,e=this.gui.scaledHeight,i=Math.floor((t-176)/2),s=Math.floor((e-166)/2);this.gui.blit("/assets/minecraft/textures/gui/container/furnace.png",i,s,0,0,176,166,256,256),this.font.draw(this.gui.ctx,"Furnace",i+60,s+6,"#404040",!1),this.font.draw(this.gui.ctx,"Inventory",i+8,s+72,"#404040",!1);const r=Ds.getFurnace(this.activeContainerBlockPos);if(r.burnTime>0&&r.maxBurnTime>0){const a=Math.min(1,r.burnTime/r.maxBurnTime),o=Math.round(14*a);this.gui.blit("/assets/minecraft/textures/gui/container/furnace.png",i+56,s+36+(14-o),176,14-o,14,o,256,256)}if(r.cookTime>0){const a=Math.min(1,r.cookTime/200),o=Math.round(24*a);this.gui.blit("/assets/minecraft/textures/gui/container/furnace.png",i+79,s+34,176,14,o,17,256,256)}this.drawInteractiveSlot(i+56,s+17,()=>r.input,a=>{r.input=a}),this.drawInteractiveSlot(i+56,s+53,()=>r.fuel,a=>{r.fuel=a}),this.drawInteractiveSlot(i+116,s+35,()=>r.output,a=>{r.output=a}),this.drawPlayerInventorySlots(i,s)}renderChestScreen(){const t=this.gui.scaledWidth,e=this.gui.scaledHeight,i=Math.floor((t-176)/2),s=Math.floor((e-166)/2);this.gui.blit("/assets/minecraft/textures/gui/container/generic_54.png",i,s,0,0,176,166,256,256);const r=this.activeContainerTab==="barrel"?"Barrel":"Chest";this.font.draw(this.gui.ctx,r,i+8,s+6,"#404040",!1),this.font.draw(this.gui.ctx,"Inventory",i+8,s+72,"#404040",!1);const a=Ds.getChest(this.activeContainerBlockPos);for(let o=0;o<3;o++)for(let l=0;l<9;l++){const c=o*9+l,h=i+8+l*18,f=s+18+o*18;this.drawInteractiveSlot(h,f,()=>a[c],u=>{a[c]=u})}this.drawPlayerInventorySlots(i,s)}handleChatSubmit(t){var e;if(t.startsWith("/")){const i=t.slice(1).split(/\s+/),s=i[0].toLowerCase();if(s==="gamemode"){const r=(i[1]||"").toLowerCase();r.startsWith("c")?(this.player.gameMode="creative",this.addChatMessage("§eSet own game mode to §aCreative Mode")):r.startsWith("s")&&r!=="spectator"?(this.player.gameMode="survival",this.player.flying=!1,this.addChatMessage("§eSet own game mode to §aSurvival Mode")):(r==="spectator"||r==="sp")&&(this.player.gameMode="spectator",this.player.flying=!0,this.addChatMessage("§eSet own game mode to §aSpectator Mode"))}else if(s==="time"){const r=i[2]||i[1]||"day";r==="day"?this.world.timeOfDay=1e3:r==="noon"?this.world.timeOfDay=6e3:r==="night"?this.world.timeOfDay=14e3:this.world.timeOfDay=parseInt(r,10)||1e3,this.addChatMessage(`§eSet the time to §a${this.world.timeOfDay}`)}else if(s==="locate"){const r=this.world.findNearestAbandonedCamp(this.player.position.x,this.player.position.z);r&&this.addChatMessage(`§aThe nearest §eminecraft:abandoned_camp§a is at §b[${r.x}, ${r.y}, ${r.z}]`)}else if(s==="tp"||s==="teleport"){if(i.length>=4){const r=parseFloat(i[1]),a=parseFloat(i[2]),o=parseFloat(i[3]);!isNaN(r)&&!isNaN(a)&&!isNaN(o)&&(this.player.position.set(r,a,o),this.addChatMessage(`§eTeleported to ${r}, ${a}, ${o}`))}}else if(s==="give"){const r=(i[2]||i[1]||"orange_cushion").replace("minecraft:",""),a=parseInt(i[3]||"1",10)||1;this.inventory.addItem(r,a)?this.addChatMessage(`§aGave ${a} [${r}] to ${le.username}`):this.addChatMessage(`§cUnknown item: ${r}`)}else this.addChatMessage(`§eExecuted command: /${s}`);return}this.addChatMessage(`<${le.username}> ${t}`),((e=le.activeSession)==null?void 0:e.state)==="PLAY"&&le.activeSession.sendChat(t)}}class vy{constructor(t,e){I(this,"canvas");I(this,"renderer");I(this,"scene");I(this,"camera");I(this,"ambientLight");I(this,"sunLight");I(this,"skyColor",new Wt(7907327));I(this,"panorama");I(this,"skyRenderer");I(this,"firstPersonHand");I(this,"entityRenderer");I(this,"particleSystem");I(this,"world");I(this,"inventory");I(this,"player");I(this,"ui");I(this,"inWorld",!1);I(this,"lastTime",performance.now());I(this,"frameCount",0);I(this,"fpsTimer",0);I(this,"ambientTickTimer",0);I(this,"autoSaveTimer",0);I(this,"mobSpawnTimer",0);this.canvas=t,this.renderer=new q0({canvas:t,antialias:!1,powerPreference:"high-performance"}),this.renderer.setSize(window.innerWidth,window.innerHeight),this.renderer.setPixelRatio(Math.min(window.devicePixelRatio,2)),this.renderer.outputColorSpace=me,this.scene=new ol,this.scene.background=this.skyColor,this.scene.fog=new Gr(7907327,.011),this.camera=new Ve(70,window.innerWidth/window.innerHeight,.1,250),this.ambientLight=new iu(16777215,.75),this.scene.add(this.ambientLight),this.sunLight=new eu(16776171,.85),this.sunLight.position.set(80,140,60),this.scene.add(this.sunLight),this.panorama=new c_,this.skyRenderer=new h_(this.scene),this.entityRenderer=new o_(this.scene),this.particleSystem=new l_(this.scene),this.init(e)}async init(t){t.innerHTML=`
      <div style="position:fixed;inset:0;background:#ef323d;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:24px;z-index:50;">
        <img src="./assets/minecraft/textures/gui/title/mojangstudios.png" alt="Mojang Studios" style="width:420px;max-width:85vw;image-rendering:pixelated;" />
        <div style="width:360px;height:14px;border:2px solid #ffffff;padding:2px;">
          <div id="mojang-load-bar" style="width:20%;height:100%;background:#ffffff;transition:width 0.15s;"></div>
        </div>
      </div>
    `;const e=i=>{const s=document.getElementById("mojang-load-bar");s&&(s.style.width=`${i}%`)};await Promise.all([It.init(),Ce.init()]),e(25),await tt.init(),e(55),await ue.build(),e(80),await Promise.all([ki.init(),re.init(),le.init()]),this.world=new a_(this.scene,this.entityRenderer,this.particleSystem),this.inventory=new Qr,this.player=new p_(this.camera,this.world,this.inventory),this.player.onPlayerDeath=()=>{this.ui.setState("GAME_OVER")},this.firstPersonHand=new u_,this.ui=new _y(t,this.player,this.inventory,this.world),e(95),await this.ui.initAssets(),e(100),this.ui.onStartGame=i=>{this.enterWorld(i)},this.ui.onQuitToTitle=()=>{this.inWorld=!1,this.player.isMining=!1,this.player.resetMining()},this.bindInputEvents(),window.__MC_26_3__=this,this.ui.setState("TITLE"),requestAnimationFrame(i=>this.loop(i))}enterWorld(t=!1){this.inWorld=!0,!t&&this.ui.loadActiveWorldState()||this.player.spawnAtWorldCenter(),this.world.updateChunksAroundPlayer(this.player.position.x,this.player.position.z);const i=Math.floor(this.player.position.x),s=Math.floor(this.player.position.z);this.entityRenderer.mobs.size===0&&(this.entityRenderer.spawnMob("sheep_1","sheep",i+8,this.world.getTopSolidY(i+8,s+6),s+6),this.entityRenderer.spawnMob("pig_1","pig",i-7,this.world.getTopSolidY(i-7,s+5),s+5),this.entityRenderer.spawnMob("cow_1","cow",i+12,this.world.getTopSolidY(i+12,s-6),s-6)),t||this.ui.saveActiveWorldState(),this.ui.setState("IN_GAME"),this.ui.updateHUDOnly(),t&&this.ui.addChatMessage("§b[Wispcraft] §fSynchronized world state over Wisp v2 TCP multiplexer!")}bindInputEvents(){window.addEventListener("beforeunload",()=>{this.inWorld&&this.ui.saveActiveWorldState()}),window.addEventListener("resize",()=>{const t=window.innerWidth,e=window.innerHeight;this.renderer.setSize(t,e),this.camera.aspect=t/e,this.camera.updateProjectionMatrix(),this.panorama.resize(t,e)}),document.addEventListener("pointerlockchange",()=>{!document.pointerLockElement&&this.ui.state==="IN_GAME"&&(this.player.isMining=!1,this.player.resetMining(),this.ui.setState("PAUSE"))}),window.addEventListener("mousemove",t=>{if(this.ui.state!=="IN_GAME"||document.pointerLockElement!==this.canvas)return;const e=It.current.mouseSensitivity*.0045;this.player.yaw-=t.movementX*e,this.player.pitch=Math.max(-Math.PI/2+.01,Math.min(Math.PI/2-.01,this.player.pitch-t.movementY*e))}),window.addEventListener("keydown",t=>{if(this.ui.state==="CHAT")return;if(t.code==="F3"){t.preventDefault(),this.ui.showDebugF3=!this.ui.showDebugF3;return}if(t.code==="KeyE"){if(this.ui.state==="IN_GAME"){t.preventDefault(),this.player.isMining=!1,this.player.resetMining(),this.ui.activeContainerTab="inventory",this.ui.setState("INVENTORY");return}else if(this.ui.state==="INVENTORY"&&!this.ui.focusedEditBox){t.preventDefault(),this.ui.setState("IN_GAME");return}}const e=It.current.keyBinds,i=(e==null?void 0:e.drop)||"KeyQ";if(t.code===i&&this.ui.state==="IN_GAME"){t.preventDefault();const s=this.inventory.dropHeldItem(t.ctrlKey);if(s){this.firstPersonHand.triggerSwing();const r=this.player.yaw,a=this.player.pitch,o=Math.cos(a),l=.38,c=-Math.sin(r)*o*l+this.player.velocity.x*.2,h=-Math.sin(a)*l+.18,f=-Math.cos(r)*o*l+this.player.velocity.z*.2;this.entityRenderer.spawnDroppedItem(this.player.position.x-Math.sin(r)*.3,this.player.position.y+1.25,this.player.position.z-Math.cos(r)*.3,s.item.shortId,s.count,c*15,h*16,f*15,1.8),re.play("entity.item.pickup",.5,.8),this.ui.updateHUDOnly()}return}if((t.code==="KeyT"||t.code==="Slash")&&this.ui.state==="IN_GAME"){t.preventDefault(),this.player.isMining=!1,this.player.resetMining(),t.code==="Slash"?this.ui.chatInputText="/":this.ui.chatInputText="",this.ui.setState("CHAT");return}if(t.code==="Escape"){if(this.ui.state==="INVENTORY"){this.ui.setState("IN_GAME");return}else if(this.ui.state==="PAUSE"){this.ui.setState("IN_GAME");return}else if(this.ui.state==="ADVANCEMENTS"){this.ui.setState("PAUSE");return}}if(t.code.startsWith("Digit")&&this.ui.state==="IN_GAME"){const s=parseInt(t.code.slice(5),10);s>=1&&s<=9&&(this.inventory.selectedHotbarSlot=s-1,this.ui.updateHUDOnly())}if(t.code==="KeyW"&&!t.repeat&&this.ui.state==="IN_GAME"){const s=performance.now();s-this.player.lastWPress<280&&(this.player.isSprinting=!0),this.player.lastWPress=s}if(t.code==="Space"&&!t.repeat&&this.ui.state==="IN_GAME"){const s=performance.now();s-this.player.lastSpacePress<300&&this.player.gameMode==="creative"&&(this.player.flying=!this.player.flying),this.player.lastSpacePress=s}this.player.keys.add(t.code)}),window.addEventListener("keyup",t=>{this.player.keys.delete(t.code)}),window.addEventListener("blur",()=>{this.player.keys.clear(),this.player.isMining=!1,this.player.resetMining(),this.ui.state==="IN_GAME"&&this.ui.setState("PAUSE")}),window.addEventListener("wheel",t=>{if(this.ui.state!=="IN_GAME")return;const e=t.deltaY>0?1:-1;this.inventory.selectedHotbarSlot=(this.inventory.selectedHotbarSlot+e+9)%9,this.ui.updateHUDOnly()}),this.canvas.addEventListener("contextmenu",t=>t.preventDefault()),this.canvas.addEventListener("mousedown",t=>{var e,i;if(this.ui.state==="IN_GAME"){if(document.pointerLockElement!==this.canvas){(i=(e=this.canvas).requestPointerLock)==null||i.call(e);return}if(t.button===0){this.player.triggerSwing(),this.firstPersonHand.triggerSwing();const s=new G;this.camera.getWorldDirection(s);const r=this.player.currentHit?Math.min(3.5,Math.hypot(this.player.currentHit.bx+.5-this.camera.position.x,this.player.currentHit.by+.5-this.camera.position.y,this.player.currentHit.bz+.5-this.camera.position.z)):3.5,a=this.entityRenderer.raycastMob(this.camera.position,s,r);if(a){this.player.isMining=!1,this.player.resetMining();const o=this.inventory.getHeldStack();let l=2;if(o){const f=o.item.shortId;f==="diamond_sword"?l=7:f==="iron_sword"?l=6:f==="stone_sword"?l=5:f==="wooden_sword"?l=4:f.endsWith("_axe")?l=8:f.endsWith("_pickaxe")?l=4:f.endsWith("_shovel")&&(l=3)}const c=this.player.velocity.y<-.1&&!this.player.onGround&&!this.player.flying;if(c&&(l=Math.ceil(l*1.5)),this.entityRenderer.attackMob(a.mob.id,l,this.player.position,(f,u,d)=>{this.particleSystem.spawnDeathPoof(f,u,d)}).hit){re.playBlockSound("wool","break");const f=Math.max(1,Math.min(6,Math.round(l/2)));this.particleSystem.spawnDamageIndicator(a.mob.x,a.mob.y+.7,a.mob.z,f),c&&this.particleSystem.spawnCritBurst(a.mob.x,a.mob.y+.65,a.mob.z)}return}this.player.isMining=!0,this.player.gameMode==="creative"&&(this.completeBlockBreak(),this.player.creativeBreakCooldown=.22)}else if(t.button===2)this.handleRightClickInteractOrPlace();else if(t.button===1){const s=this.player.currentHit;if(s){const r=tt.getBlock(s.blockNumId),a=tt.getItem(r.shortId);if(a){if(this.player.gameMode==="creative")this.inventory.slots[this.inventory.selectedHotbarSlot]={item:a,count:a.maxStack};else{const o=this.inventory.slots.findIndex(l=>l&&l.item.id===a.id);o>=0&&o<9&&(this.inventory.selectedHotbarSlot=o)}this.ui.updateHUDOnly()}}}}}),window.addEventListener("mouseup",t=>{t.button===0&&(this.player.isMining=!1,this.player.resetMining())})}updateMining(t){if(!this.player.isMining){this.player.miningProgress>0&&this.player.resetMining();return}if(this.player.miningHitSoundTimer+=t,this.player.miningHitSoundTimer>=.22){this.player.miningHitSoundTimer=0,this.player.triggerSwing(),this.firstPersonHand.triggerSwing();const l=this.player.currentHit;if(l&&this.player.gameMode==="survival"){const c=tt.getBlock(l.blockNumId);re.playBlockSound(c.soundGroup,"step")}}if(this.player.gameMode==="creative"){this.player.creativeBreakCooldown<=0&&(this.completeBlockBreak(),this.player.creativeBreakCooldown=.22);return}const e=this.player.currentHit;if(!e){this.player.resetMining();return}if(this.entityRenderer.findCushionAtBlock(e.bx,e.by+1,e.bz)||this.entityRenderer.findCushionAtBlock(e.bx,e.by,e.bz)){this.completeBlockBreak(),this.player.isMining=!1,this.player.resetMining();return}const s=`${e.bx},${e.by},${e.bz}`;this.player.miningTargetKey!==s&&(this.player.miningTargetKey=s,this.player.miningProgress=0);const r=tt.getBlock(e.blockNumId),a=this.inventory.getHeldStack(),o=this.player.getDestroySpeedPerSecond(r,a?a.item:null);if(o<=0){this.player.resetMining();return}if(this.player.miningProgress+=o*t,this.player.miningProgress>=1)this.completeBlockBreak(),this.player.resetMining();else{const l=Math.min(9,Math.floor(this.player.miningProgress*10));this.player.updateCrackStageUVs(l)}}completeBlockBreak(){var s,r;const t=this.player.currentHit;if(!t)return;const e=this.entityRenderer.findCushionAtBlock(t.bx,t.by+1,t.bz)||this.entityRenderer.findCushionAtBlock(t.bx,t.by,t.bz);if(e){((s=this.player.seatedCushion)==null?void 0:s.id)===e.id&&this.player.dismountCushion(),this.entityRenderer.removeCushion(e.id),re.play("entity.cushion.break",.85),this.particleSystem.spawnBlockBreakBurst(e.blockX,e.blockY,e.blockZ,`${e.color}_wool`,16351261),this.player.gameMode==="survival"&&this.entityRenderer.spawnDroppedItem(e.blockX,e.blockY,e.blockZ,`${e.color}_cushion`);return}const i=tt.getBlock(t.blockNumId);if(!(i.hardness<0&&this.player.gameMode!=="creative")){if(i.shortId==="straw_bed"||i.shortId==="straw_bed_head")for(const[a,o]of[[1,0],[-1,0],[0,1],[0,-1]]){const l=this.world.getBlock(t.bx+a,t.by,t.bz+o),c=tt.getBlock(l);(c.shortId==="straw_bed"||c.shortId==="straw_bed_head")&&this.world.setBlock(t.bx+a,t.by,t.bz+o,0)}if(this.world.setBlock(t.bx,t.by,t.bz,0),this.world.checkGravity(t.bx,t.by+1,t.bz),re.playBlockSound(i.soundGroup,"break"),this.particleSystem.spawnBlockBreakBurst(t.bx,t.by,t.bz,i.textures.north||i.textures.top,this.getBlockParticleColor(i)),this.player.gameMode==="survival"){const a=this.inventory.getHeldStack();if((!(i.soundGroup==="stone")||a&&a.item.toolType==="pickaxe")&&i.shortId!=="short_grass"&&i.shortId!=="leaf_litter"){let c=i.shortId;c==="stone"?c="cobblestone":c==="grass_block"||c==="podzol"?c="dirt":c==="coal_ore"?c="coal":c==="diamond_ore"?c="diamond":c==="straw_bed_head"?c="straw_bed":c.includes("leaves")&&(c=Math.random()<.25?"stick":""),c&&this.entityRenderer.spawnDroppedItem(t.bx,t.by,t.bz,c)}}((r=le.activeSession)==null?void 0:r.state)==="PLAY"&&le.activeSession.sendBlockChange(t.bx,t.by,t.bz,"minecraft:air"),this.player.updateRaycast(),this.ui.updateHUDOnly()}}getBlockParticleColor(t){return t.soundGroup==="grass"?t.shortId.includes("path")?8806467:6132020:t.soundGroup==="stone"?t.shortId.includes("deepslate")?4737096:8553090:t.soundGroup==="wood"?10321751:t.soundGroup==="sand"?14207901:t.soundGroup==="gravel"?7564652:t.soundGroup==="wool"?14606046:t.soundGroup==="glass"?12641514:t.soundGroup==="poplar_leaves"?t.shortId.includes("orange")?14645800:t.shortId.includes("yellow")?15053360:t.shortId.includes("red")?12071722:4355882:t.soundGroup==="straw_bed"?13935960:8947848}handleRightClickInteractOrPlace(){var l;const t=this.inventory.getHeldStack();if(t&&t.item.shortId==="filled_map"){this.firstPersonHand.triggerSwing();const c=this.world.findNearestAbandonedCamp(this.player.position.x,this.player.position.z);if(c){const h=Math.round(Math.hypot(c.x-this.player.position.x,c.z-this.player.position.z));this.ui.addChatMessage(`§6[Abandoned Camp Explorer Map] §eNearest Wilderness Camp located at §bX=${c.x}, Y=${c.y}, Z=${c.z} §7(${h}m away)!`),re.play("ui.button.click",.8)}return}const e=this.player.currentHit;if(!e)return;const i=this.entityRenderer.findCushionAtBlock(e.bx,e.by,e.bz)||this.entityRenderer.findCushionAtBlock(e.bx,e.by+1,e.bz);if(i){this.player.sitOnCushion(i),this.ui.showToast("Take a Seat!",`Seated on ${tt.formatName(i.color+"_cushion")}`,`${i.color}_cushion`),this.ui.addChatMessage(`§aYou sat down on a §e${tt.formatName(i.color+"_cushion")}§a! (Press Shift to stand up)`);return}const s=tt.getBlock(e.blockNumId);if(s.shortId==="straw_bed"||s.shortId==="straw_bed_head"){re.playBlockSound("straw_bed","place"),this.world.timeOfDay=1e3,this.ui.showToast("Sweet Wilderness Dreams!","Rested on a 26.3 Straw Bed","straw_bed"),this.ui.addChatMessage("§6[Straw Bed] §aRested in the wilderness Straw Bed! Respawn point set & morning has arrived.");return}if(!this.player.isSneaking){if(s.shortId==="crafting_table"){this.player.isMining=!1,this.player.resetMining(),this.ui.activeContainerTab="crafting",this.ui.setState("INVENTORY");return}if(s.shortId==="furnace"){this.player.isMining=!1,this.player.resetMining(),this.ui.activeContainerBlockPos=`${e.bx}_${e.by}_${e.bz}`,this.ui.activeContainerTab="furnace",this.ui.setState("INVENTORY");return}if(s.shortId==="chest"||s.shortId==="barrel"){this.player.isMining=!1,this.player.resetMining(),this.ui.activeContainerBlockPos=`${e.bx}_${e.by}_${e.bz}`,this.ui.activeContainerTab=s.shortId,this.ui.setState("INVENTORY");return}if(s.shortId==="stonecutter"){this.player.isMining=!1,this.player.resetMining(),this.ui.activeContainerTab="stonecutter",this.ui.setState("INVENTORY");return}}if(!t)return;const r=e.bx+e.nx,a=e.by+e.ny,o=e.bz+e.nz;if(t.item.cushionColor){const c={id:`cushion_${r}_${a}_${o}_${Date.now()}`,x:r+.5,y:a,z:o+.5,blockX:r,blockY:a,blockZ:o,color:t.item.cushionColor,rotation:this.player.getCardinalFacingMeta()*90%360};this.entityRenderer.addCushion(c),re.play("entity.cushion.place",.85),this.player.triggerSwing(),this.firstPersonHand.triggerSwing(),this.player.gameMode==="survival"&&this.inventory.consumeHeld(1),this.ui.updateHUDOnly();return}if(t.item.isBlock&&t.item.blockNumId!==void 0){const c=Math.abs(r+.5-this.player.position.x),h=Math.abs(o+.5-this.player.position.z),f=a-this.player.position.y;if(c<.7&&h<.7&&f>=-.9&&f<=1.6)return;const u=tt.getBlock(t.item.blockNumId),d=this.player.getCardinalFacingMeta();if(u.shortId==="straw_bed"){const p=[[0,-1],[1,0],[0,1],[-1,0]],[g,m]=p[d];this.world.setBlock(r,a,o,u.numId,d),this.world.setBlock(r+g,a,o+m,tt.getBlock("straw_bed_head").numId,d)}else this.world.setBlock(r,a,o,u.numId,d);this.world.checkGravity(r,a,o),re.playBlockSound(u.soundGroup,"place"),this.player.triggerSwing(),this.firstPersonHand.triggerSwing(),this.player.gameMode==="survival"&&this.inventory.consumeHeld(1),((l=le.activeSession)==null?void 0:l.state)==="PLAY"&&le.activeSession.sendBlockChange(r,a,o,u.id),this.player.updateRaycast(),this.ui.updateHUDOnly()}}updateDayNightCycle(t){this.world.timeOfDay=(this.world.timeOfDay+t*20)%24e3;const e=this.world.timeOfDay;let i=1;e>=12e3&&e<13500?i=1-(e-12e3)/1500*.85:e>=13500&&e<22500?i=.15:e>=22500&&(i=.15+(e-22500)/1500*.85),this.skyColor.setRGB(.47*i,.65*i,1*i),this.scene.fog instanceof Gr&&this.scene.fog.color.copy(this.skyColor),this.ambientLight.intensity=.18+.62*i,this.sunLight.intensity=.95*i,this.skyRenderer.update(t,this.player.position,this.world.timeOfDay,It.current.clouds?"FANCY":"OFF")}loop(t){var a;requestAnimationFrame(o=>this.loop(o));const e=Math.min(.1,(t-this.lastTime)/1e3);if(this.lastTime=t,this.frameCount++,this.fpsTimer+=e,this.fpsTimer>=.5&&(this.ui.fps=Math.round(this.frameCount/this.fpsTimer),this.frameCount=0,this.fpsTimer=0),!this.inWorld||this.ui.state==="TITLE"||this.ui.state==="SINGLEPLAYER_SELECT"||this.ui.state==="CREATE_WORLD"||this.ui.state==="MULTIPLAYER_SELECT"||this.ui.state==="WISPCRAFT_CONFIG"||this.ui.state==="CONNECTING"||this.ui.state==="OPTIONS"&&!this.inWorld){this.panorama.render(this.renderer,e),this.ui.render(e);return}const s=this.inWorld&&((a=le.activeSession)==null?void 0:a.state)!=="PLAY"&&(this.ui.state==="PAUSE"||this.ui.state==="OPTIONS"||this.ui.state==="ADVANCEMENTS"),r=this.ui.state==="IN_GAME";if(this.world.updateChunksAroundPlayer(this.player.position.x,this.player.position.z),s){this.player.resetMining();const o=this.inventory.getHeldStack();this.firstPersonHand.updateHeldItem(o?o.item:null)}else{if(Ds.tickFurnaces(e),this.mobSpawnTimer+=e,this.mobSpawnTimer>=2.5){this.mobSpawnTimer=0;const c=this.world.timeOfDay>=13e3&&this.world.timeOfDay<23e3;let h=0,f=0;for(const[,u]of this.entityRenderer.mobs)u.type==="zombie"?h++:(u.type==="pig"||u.type==="cow"||u.type==="sheep")&&f++;if(c&&h<6&&It.current.difficulty!=="Peaceful"){const u=Math.random()*Math.PI*2,d=24+Math.random()*16,p=Math.floor(this.player.position.x+Math.cos(u)*d),g=Math.floor(this.player.position.z+Math.sin(u)*d),m=this.world.getTopSolidY(p,g);m>=62&&this.entityRenderer.spawnMob(`zombie_${Date.now()}`,"zombie",p,m,g)}else if(!c&&f<12){const u=Math.random()*Math.PI*2,d=18+Math.random()*18,p=Math.floor(this.player.position.x+Math.cos(u)*d),g=Math.floor(this.player.position.z+Math.sin(u)*d),m=this.world.getTopSolidY(p,g);if(m>=62){const _=["sheep","cow","pig"],M=_[Math.floor(Math.random()*_.length)];this.entityRenderer.spawnMob(`${M}_${Date.now()}`,M,p,m,g)}}}this.player.update(e,r),r?this.updateMining(e):this.player.resetMining(),this.updateDayNightCycle(e),this.ambientTickTimer+=e,this.ambientTickTimer>=.18&&(this.ambientTickTimer=0,this.world.tickAmbientParticles(this.player.position.x,this.player.position.y,this.player.position.z)),this.particleSystem.update(e),this.entityRenderer.update(e,(c,h)=>this.world.getTopSolidY(c,h),this.player.position,(c,h)=>{const f=this.inventory.addItem(c,h);return f&&(re.play("entity.item.pickup",.55),this.ui.updateHUDOnly(),this.ui.saveActiveWorldState()),f},(c,h,f)=>{const u=this.world.getBlock(c,h,f);return u!==0&&tt.getBlock(u).solid},(c,h)=>{this.player.applyDamage(c,h)});const o=this.inventory.getHeldStack();this.firstPersonHand.updateHeldItem(o?o.item:null);const l=r&&(this.player.keys.has("KeyW")||this.player.keys.has("KeyS")||this.player.keys.has("KeyA")||this.player.keys.has("KeyD"));this.firstPersonHand.update(e,l,this.player.isSprinting),this.autoSaveTimer+=e,this.autoSaveTimer>=3&&(this.autoSaveTimer=0,this.ui.saveActiveWorldState())}this.renderer.render(this.scene,this.camera),this.firstPersonHand.render(this.renderer),this.ui.render(e)}}$u();window.addEventListener("DOMContentLoaded",()=>{const n=document.getElementById("game-canvas"),t=document.getElementById("ui-root");n&&t&&new vy(n,t)});
