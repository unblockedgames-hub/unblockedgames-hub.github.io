var Gu=Object.defineProperty;var Vu=(i,t,e)=>t in i?Gu(i,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):i[t]=e;var I=(i,t,e)=>Vu(i,typeof t!="symbol"?t+"":t,e);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))n(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&n(o)}).observe(document,{childList:!0,subtree:!0});function e(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(s){if(s.ep)return;s.ep=!0;const r=e(s);fetch(s.href,r)}})();const Rr=(()=>{try{const i=new URL(".",window.location.href).pathname;return i.endsWith("/")?i:`${i}/`}catch{return"/"}})(),Wu=["/assets/","/sounds/","/data/","/blocks_summary.json","/registries.json","/packets.json","/abandoned_camp_structures.json","/resolved_block_models.json","/resolved_item_models.json","/servers.dat","/servers.json"];function ds(i){if(!i||Rr==="/"||i.startsWith(Rr))return i;for(const t of Wu)if(i.startsWith(t))return Rr+i.slice(1);return i}function Xu(){if(Rr==="/")return;const i=window.fetch.bind(window);window.fetch=(r,o)=>{if(typeof r=="string")r=ds(r);else if(r instanceof URL&&r.origin===window.location.origin){const a=ds(r.pathname);a!==r.pathname&&(r=new URL(a+r.search+r.hash,window.location.origin))}return i(r,o)};const t=Object.getOwnPropertyDescriptor(HTMLImageElement.prototype,"src");t&&t.set&&t.get&&Object.defineProperty(HTMLImageElement.prototype,"src",{configurable:!0,enumerable:!0,get(){return t.get.call(this)},set(r){t.set.call(this,typeof r=="string"?ds(r):r)}});const e=Object.getOwnPropertyDescriptor(HTMLMediaElement.prototype,"src");e&&e.set&&e.get&&Object.defineProperty(HTMLMediaElement.prototype,"src",{configurable:!0,enumerable:!0,get(){return e.get.call(this)},set(r){e.set.call(this,typeof r=="string"?ds(r):r)}});const n=window.Audio,s=function(r){return new n(r?ds(r):void 0)};s.prototype=n.prototype,window.Audio=s}/**
 * @license
 * Copyright 2010-2024 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const Zo="170",$u=0,bl=1,Yu=2,yh=1,qu=2,Cn=3,Jn=0,Ue=1,He=2,Yn=0,Vi=1,Or=2,El=3,Ka=4,Zu=5,ci=100,Ku=101,ju=102,Ju=103,Qu=104,td=200,ed=201,nd=202,id=203,ja=204,Ja=205,sd=206,rd=207,ad=208,od=209,ld=210,cd=211,hd=212,ud=213,dd=214,Qa=0,to=1,eo=2,qi=3,no=4,io=5,so=6,ro=7,Ko=0,fd=1,pd=2,qn=0,md=1,gd=2,_d=3,vd=4,xd=5,yd=6,Md=7,Mh=300,Zi=301,Ki=302,ao=303,oo=304,Zr=306,Rs=1e3,ui=1001,lo=1002,qt=1003,Sd=1004,Ks=1005,en=1006,ia=1007,di=1008,kn=1009,Sh=1010,wh=1011,Is=1012,jo=1013,gi=1014,In=1015,Os=1016,Jo=1017,Qo=1018,ji=1020,bh=35902,Eh=1021,Th=1022,hn=1023,Ah=1024,Ch=1025,Wi=1026,Ji=1027,Rh=1028,tl=1029,Ih=1030,el=1031,nl=1033,Ir=33776,Pr=33777,Dr=33778,Lr=33779,co=35840,ho=35841,uo=35842,fo=35843,po=36196,mo=37492,go=37496,_o=37808,vo=37809,xo=37810,yo=37811,Mo=37812,So=37813,wo=37814,bo=37815,Eo=37816,To=37817,Ao=37818,Co=37819,Ro=37820,Io=37821,Ur=36492,Po=36494,Do=36495,Ph=36283,Lo=36284,Uo=36285,ko=36286,wd=3200,bd=3201,Dh=0,Ed=1,Wn="",de="srgb",is="srgb-linear",Kr="linear",te="srgb",Ei=7680,Tl=519,Td=512,Ad=513,Cd=514,Lh=515,Rd=516,Id=517,Pd=518,Dd=519,Al=35044,Cl="300 es",Pn=2e3,zr=2001;class ss{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[t]===void 0&&(n[t]=[]),n[t].indexOf(e)===-1&&n[t].push(e)}hasEventListener(t,e){if(this._listeners===void 0)return!1;const n=this._listeners;return n[t]!==void 0&&n[t].indexOf(e)!==-1}removeEventListener(t,e){if(this._listeners===void 0)return;const s=this._listeners[t];if(s!==void 0){const r=s.indexOf(e);r!==-1&&s.splice(r,1)}}dispatchEvent(t){if(this._listeners===void 0)return;const n=this._listeners[t.type];if(n!==void 0){t.target=this;const s=n.slice(0);for(let r=0,o=s.length;r<o;r++)s[r].call(this,t);t.target=null}}}const Ae=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],kr=Math.PI/180,Fo=180/Math.PI;function zs(){const i=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Ae[i&255]+Ae[i>>8&255]+Ae[i>>16&255]+Ae[i>>24&255]+"-"+Ae[t&255]+Ae[t>>8&255]+"-"+Ae[t>>16&15|64]+Ae[t>>24&255]+"-"+Ae[e&63|128]+Ae[e>>8&255]+"-"+Ae[e>>16&255]+Ae[e>>24&255]+Ae[n&255]+Ae[n>>8&255]+Ae[n>>16&255]+Ae[n>>24&255]).toLowerCase()}function Be(i,t,e){return Math.max(t,Math.min(e,i))}function Ld(i,t){return(i%t+t)%t}function sa(i,t,e){return(1-e)*i+e*t}function fs(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("Invalid component type.")}}function Fe(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("Invalid component type.")}}class jt{constructor(t=0,e=0){jt.prototype.isVector2=!0,this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){const e=this.x,n=this.y,s=t.elements;return this.x=s[0]*e+s[3]*n+s[6],this.y=s[1]*e+s[4]*n+s[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(Be(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y;return e*e+n*n}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){const n=Math.cos(e),s=Math.sin(e),r=this.x-t.x,o=this.y-t.y;return this.x=r*n-o*s+t.x,this.y=r*s+o*n+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Ut{constructor(t,e,n,s,r,o,a,c,l){Ut.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,n,s,r,o,a,c,l)}set(t,e,n,s,r,o,a,c,l){const h=this.elements;return h[0]=t,h[1]=s,h[2]=a,h[3]=e,h[4]=r,h[5]=c,h[6]=n,h[7]=o,h[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],this}extractBasis(t,e,n){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(t){const e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,s=e.elements,r=this.elements,o=n[0],a=n[3],c=n[6],l=n[1],h=n[4],f=n[7],u=n[2],d=n[5],p=n[8],_=s[0],m=s[3],g=s[6],w=s[1],E=s[4],y=s[7],b=s[2],S=s[5],M=s[8];return r[0]=o*_+a*w+c*b,r[3]=o*m+a*E+c*S,r[6]=o*g+a*y+c*M,r[1]=l*_+h*w+f*b,r[4]=l*m+h*E+f*S,r[7]=l*g+h*y+f*M,r[2]=u*_+d*w+p*b,r[5]=u*m+d*E+p*S,r[8]=u*g+d*y+p*M,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],o=t[4],a=t[5],c=t[6],l=t[7],h=t[8];return e*o*h-e*a*l-n*r*h+n*a*c+s*r*l-s*o*c}invert(){const t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],o=t[4],a=t[5],c=t[6],l=t[7],h=t[8],f=h*o-a*l,u=a*c-h*r,d=l*r-o*c,p=e*f+n*u+s*d;if(p===0)return this.set(0,0,0,0,0,0,0,0,0);const _=1/p;return t[0]=f*_,t[1]=(s*l-h*n)*_,t[2]=(a*n-s*o)*_,t[3]=u*_,t[4]=(h*e-s*c)*_,t[5]=(s*r-a*e)*_,t[6]=d*_,t[7]=(n*c-l*e)*_,t[8]=(o*e-n*r)*_,this}transpose(){let t;const e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){const e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,n,s,r,o,a){const c=Math.cos(r),l=Math.sin(r);return this.set(n*c,n*l,-n*(c*o+l*a)+o+t,-s*l,s*c,-s*(-l*o+c*a)+a+e,0,0,1),this}scale(t,e){return this.premultiply(ra.makeScale(t,e)),this}rotate(t){return this.premultiply(ra.makeRotation(-t)),this}translate(t,e){return this.premultiply(ra.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,n,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){const e=this.elements,n=t.elements;for(let s=0;s<9;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<9;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t}clone(){return new this.constructor().fromArray(this.elements)}}const ra=new Ut;function Uh(i){for(let t=i.length-1;t>=0;--t)if(i[t]>=65535)return!0;return!1}function Ps(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function Ud(){const i=Ps("canvas");return i.style.display="block",i}const Rl={};function ys(i){i in Rl||(Rl[i]=!0,console.warn(i))}function kd(i,t,e){return new Promise(function(n,s){function r(){switch(i.clientWaitSync(t,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:s();break;case i.TIMEOUT_EXPIRED:setTimeout(r,e);break;default:n()}}setTimeout(r,e)})}function Fd(i){const t=i.elements;t[2]=.5*t[2]+.5*t[3],t[6]=.5*t[6]+.5*t[7],t[10]=.5*t[10]+.5*t[11],t[14]=.5*t[14]+.5*t[15]}function Nd(i){const t=i.elements;t[11]===-1?(t[10]=-t[10]-1,t[14]=-t[14]):(t[10]=-t[10],t[14]=-t[14]+1)}const Wt={enabled:!0,workingColorSpace:is,spaces:{},convert:function(i,t,e){return this.enabled===!1||t===e||!t||!e||(this.spaces[t].transfer===te&&(i.r=Ln(i.r),i.g=Ln(i.g),i.b=Ln(i.b)),this.spaces[t].primaries!==this.spaces[e].primaries&&(i.applyMatrix3(this.spaces[t].toXYZ),i.applyMatrix3(this.spaces[e].fromXYZ)),this.spaces[e].transfer===te&&(i.r=Xi(i.r),i.g=Xi(i.g),i.b=Xi(i.b))),i},fromWorkingColorSpace:function(i,t){return this.convert(i,this.workingColorSpace,t)},toWorkingColorSpace:function(i,t){return this.convert(i,t,this.workingColorSpace)},getPrimaries:function(i){return this.spaces[i].primaries},getTransfer:function(i){return i===Wn?Kr:this.spaces[i].transfer},getLuminanceCoefficients:function(i,t=this.workingColorSpace){return i.fromArray(this.spaces[t].luminanceCoefficients)},define:function(i){Object.assign(this.spaces,i)},_getMatrix:function(i,t,e){return i.copy(this.spaces[t].toXYZ).multiply(this.spaces[e].fromXYZ)},_getDrawingBufferColorSpace:function(i){return this.spaces[i].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(i=this.workingColorSpace){return this.spaces[i].workingColorSpaceConfig.unpackColorSpace}};function Ln(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function Xi(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}const Il=[.64,.33,.3,.6,.15,.06],Pl=[.2126,.7152,.0722],Dl=[.3127,.329],Ll=new Ut().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Ul=new Ut().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);Wt.define({[is]:{primaries:Il,whitePoint:Dl,transfer:Kr,toXYZ:Ll,fromXYZ:Ul,luminanceCoefficients:Pl,workingColorSpaceConfig:{unpackColorSpace:de},outputColorSpaceConfig:{drawingBufferColorSpace:de}},[de]:{primaries:Il,whitePoint:Dl,transfer:te,toXYZ:Ll,fromXYZ:Ul,luminanceCoefficients:Pl,outputColorSpaceConfig:{drawingBufferColorSpace:de}}});let Ti;class Bd{static getDataURL(t){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let e;if(t instanceof HTMLCanvasElement)e=t;else{Ti===void 0&&(Ti=Ps("canvas")),Ti.width=t.width,Ti.height=t.height;const n=Ti.getContext("2d");t instanceof ImageData?n.putImageData(t,0,0):n.drawImage(t,0,0,t.width,t.height),e=Ti}return e.width>2048||e.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",t),e.toDataURL("image/jpeg",.6)):e.toDataURL("image/png")}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){const e=Ps("canvas");e.width=t.width,e.height=t.height;const n=e.getContext("2d");n.drawImage(t,0,0,t.width,t.height);const s=n.getImageData(0,0,t.width,t.height),r=s.data;for(let o=0;o<r.length;o++)r[o]=Ln(r[o]/255)*255;return n.putImageData(s,0,0),e}else if(t.data){const e=t.data.slice(0);for(let n=0;n<e.length;n++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[n]=Math.floor(Ln(e[n]/255)*255):e[n]=Ln(e[n]);return{data:e,width:t.width,height:t.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}}let Od=0;class kh{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Od++}),this.uuid=zs(),this.data=t,this.dataReady=!0,this.version=0}set needsUpdate(t){t===!0&&this.version++}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];const n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let o=0,a=s.length;o<a;o++)s[o].isDataTexture?r.push(aa(s[o].image)):r.push(aa(s[o]))}else r=aa(s);n.url=r}return e||(t.images[this.uuid]=n),n}}function aa(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?Bd.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let zd=0;class Pe extends ss{constructor(t=Pe.DEFAULT_IMAGE,e=Pe.DEFAULT_MAPPING,n=ui,s=ui,r=en,o=di,a=hn,c=kn,l=Pe.DEFAULT_ANISOTROPY,h=Wn){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:zd++}),this.uuid=zs(),this.name="",this.source=new kh(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=r,this.minFilter=o,this.anisotropy=l,this.format=a,this.internalFormat=null,this.type=c,this.offset=new jt(0,0),this.repeat=new jt(1,1),this.center=new jt(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Ut,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];const n={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),e||(t.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==Mh)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case Rs:t.x=t.x-Math.floor(t.x);break;case ui:t.x=t.x<0?0:1;break;case lo:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case Rs:t.y=t.y-Math.floor(t.y);break;case ui:t.y=t.y<0?0:1;break;case lo:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}}Pe.DEFAULT_IMAGE=null;Pe.DEFAULT_MAPPING=Mh;Pe.DEFAULT_ANISOTROPY=1;class me{constructor(t=0,e=0,n=0,s=1){me.prototype.isVector4=!0,this.x=t,this.y=e,this.z=n,this.w=s}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,n,s){return this.x=t,this.y=e,this.z=n,this.w=s,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){const e=this.x,n=this.y,s=this.z,r=this.w,o=t.elements;return this.x=o[0]*e+o[4]*n+o[8]*s+o[12]*r,this.y=o[1]*e+o[5]*n+o[9]*s+o[13]*r,this.z=o[2]*e+o[6]*n+o[10]*s+o[14]*r,this.w=o[3]*e+o[7]*n+o[11]*s+o[15]*r,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);const e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,n,s,r;const c=t.elements,l=c[0],h=c[4],f=c[8],u=c[1],d=c[5],p=c[9],_=c[2],m=c[6],g=c[10];if(Math.abs(h-u)<.01&&Math.abs(f-_)<.01&&Math.abs(p-m)<.01){if(Math.abs(h+u)<.1&&Math.abs(f+_)<.1&&Math.abs(p+m)<.1&&Math.abs(l+d+g-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;const E=(l+1)/2,y=(d+1)/2,b=(g+1)/2,S=(h+u)/4,M=(f+_)/4,R=(p+m)/4;return E>y&&E>b?E<.01?(n=0,s=.707106781,r=.707106781):(n=Math.sqrt(E),s=S/n,r=M/n):y>b?y<.01?(n=.707106781,s=0,r=.707106781):(s=Math.sqrt(y),n=S/s,r=R/s):b<.01?(n=.707106781,s=.707106781,r=0):(r=Math.sqrt(b),n=M/r,s=R/r),this.set(n,s,r,e),this}let w=Math.sqrt((m-p)*(m-p)+(f-_)*(f-_)+(u-h)*(u-h));return Math.abs(w)<.001&&(w=1),this.x=(m-p)/w,this.y=(f-_)/w,this.z=(u-h)/w,this.w=Math.acos((l+d+g-1)/2),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this.w=Math.max(t.w,Math.min(e.w,this.w)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this.w=Math.max(t,Math.min(e,this.w)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this.w=t.w+(e.w-t.w)*n,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class Hd extends ss{constructor(t=1,e=1,n={}){super(),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=1,this.scissor=new me(0,0,t,e),this.scissorTest=!1,this.viewport=new me(0,0,t,e);const s={width:t,height:e,depth:1};n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:en,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},n);const r=new Pe(s,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace);r.flipY=!1,r.generateMipmaps=n.generateMipmaps,r.internalFormat=n.internalFormat,this.textures=[];const o=n.count;for(let a=0;a<o;a++)this.textures[a]=r.clone(),this.textures[a].isRenderTargetTexture=!0;this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.depthTexture=n.depthTexture,this.samples=n.samples}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}setSize(t,e,n=1){if(this.width!==t||this.height!==e||this.depth!==n){this.width=t,this.height=e,this.depth=n;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=t,this.textures[s].image.height=e,this.textures[s].image.depth=n;this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let n=0,s=t.textures.length;n<s;n++)this.textures[n]=t.textures[n].clone(),this.textures[n].isRenderTargetTexture=!0;const e=Object.assign({},t.texture.image);return this.texture.source=new kh(e),this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class _i extends Hd{constructor(t=1,e=1,n={}){super(t,e,n),this.isWebGLRenderTarget=!0}}class Fh extends Pe{constructor(t=null,e=1,n=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=qt,this.minFilter=qt,this.wrapR=ui,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}}class Gd extends Pe{constructor(t=null,e=1,n=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=qt,this.minFilter=qt,this.wrapR=ui,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class rs{constructor(t=0,e=0,n=0,s=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=n,this._w=s}static slerpFlat(t,e,n,s,r,o,a){let c=n[s+0],l=n[s+1],h=n[s+2],f=n[s+3];const u=r[o+0],d=r[o+1],p=r[o+2],_=r[o+3];if(a===0){t[e+0]=c,t[e+1]=l,t[e+2]=h,t[e+3]=f;return}if(a===1){t[e+0]=u,t[e+1]=d,t[e+2]=p,t[e+3]=_;return}if(f!==_||c!==u||l!==d||h!==p){let m=1-a;const g=c*u+l*d+h*p+f*_,w=g>=0?1:-1,E=1-g*g;if(E>Number.EPSILON){const b=Math.sqrt(E),S=Math.atan2(b,g*w);m=Math.sin(m*S)/b,a=Math.sin(a*S)/b}const y=a*w;if(c=c*m+u*y,l=l*m+d*y,h=h*m+p*y,f=f*m+_*y,m===1-a){const b=1/Math.sqrt(c*c+l*l+h*h+f*f);c*=b,l*=b,h*=b,f*=b}}t[e]=c,t[e+1]=l,t[e+2]=h,t[e+3]=f}static multiplyQuaternionsFlat(t,e,n,s,r,o){const a=n[s],c=n[s+1],l=n[s+2],h=n[s+3],f=r[o],u=r[o+1],d=r[o+2],p=r[o+3];return t[e]=a*p+h*f+c*d-l*u,t[e+1]=c*p+h*u+l*f-a*d,t[e+2]=l*p+h*d+a*u-c*f,t[e+3]=h*p-a*f-c*u-l*d,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,n,s){return this._x=t,this._y=e,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){const n=t._x,s=t._y,r=t._z,o=t._order,a=Math.cos,c=Math.sin,l=a(n/2),h=a(s/2),f=a(r/2),u=c(n/2),d=c(s/2),p=c(r/2);switch(o){case"XYZ":this._x=u*h*f+l*d*p,this._y=l*d*f-u*h*p,this._z=l*h*p+u*d*f,this._w=l*h*f-u*d*p;break;case"YXZ":this._x=u*h*f+l*d*p,this._y=l*d*f-u*h*p,this._z=l*h*p-u*d*f,this._w=l*h*f+u*d*p;break;case"ZXY":this._x=u*h*f-l*d*p,this._y=l*d*f+u*h*p,this._z=l*h*p+u*d*f,this._w=l*h*f-u*d*p;break;case"ZYX":this._x=u*h*f-l*d*p,this._y=l*d*f+u*h*p,this._z=l*h*p-u*d*f,this._w=l*h*f+u*d*p;break;case"YZX":this._x=u*h*f+l*d*p,this._y=l*d*f+u*h*p,this._z=l*h*p-u*d*f,this._w=l*h*f-u*d*p;break;case"XZY":this._x=u*h*f-l*d*p,this._y=l*d*f-u*h*p,this._z=l*h*p+u*d*f,this._w=l*h*f+u*d*p;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){const n=e/2,s=Math.sin(n);return this._x=t.x*s,this._y=t.y*s,this._z=t.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(t){const e=t.elements,n=e[0],s=e[4],r=e[8],o=e[1],a=e[5],c=e[9],l=e[2],h=e[6],f=e[10],u=n+a+f;if(u>0){const d=.5/Math.sqrt(u+1);this._w=.25/d,this._x=(h-c)*d,this._y=(r-l)*d,this._z=(o-s)*d}else if(n>a&&n>f){const d=2*Math.sqrt(1+n-a-f);this._w=(h-c)/d,this._x=.25*d,this._y=(s+o)/d,this._z=(r+l)/d}else if(a>f){const d=2*Math.sqrt(1+a-n-f);this._w=(r-l)/d,this._x=(s+o)/d,this._y=.25*d,this._z=(c+h)/d}else{const d=2*Math.sqrt(1+f-n-a);this._w=(o-s)/d,this._x=(r+l)/d,this._y=(c+h)/d,this._z=.25*d}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let n=t.dot(e)+1;return n<Number.EPSILON?(n=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=n):(this._x=0,this._y=-t.z,this._z=t.y,this._w=n)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=n),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(Be(this.dot(t),-1,1)))}rotateTowards(t,e){const n=this.angleTo(t);if(n===0)return this;const s=Math.min(1,e/n);return this.slerp(t,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){const n=t._x,s=t._y,r=t._z,o=t._w,a=e._x,c=e._y,l=e._z,h=e._w;return this._x=n*h+o*a+s*l-r*c,this._y=s*h+o*c+r*a-n*l,this._z=r*h+o*l+n*c-s*a,this._w=o*h-n*a-s*c-r*l,this._onChangeCallback(),this}slerp(t,e){if(e===0)return this;if(e===1)return this.copy(t);const n=this._x,s=this._y,r=this._z,o=this._w;let a=o*t._w+n*t._x+s*t._y+r*t._z;if(a<0?(this._w=-t._w,this._x=-t._x,this._y=-t._y,this._z=-t._z,a=-a):this.copy(t),a>=1)return this._w=o,this._x=n,this._y=s,this._z=r,this;const c=1-a*a;if(c<=Number.EPSILON){const d=1-e;return this._w=d*o+e*this._w,this._x=d*n+e*this._x,this._y=d*s+e*this._y,this._z=d*r+e*this._z,this.normalize(),this}const l=Math.sqrt(c),h=Math.atan2(l,a),f=Math.sin((1-e)*h)/l,u=Math.sin(e*h)/l;return this._w=o*f+this._w*u,this._x=n*f+this._x*u,this._y=s*f+this._y*u,this._z=r*f+this._z*u,this._onChangeCallback(),this}slerpQuaternions(t,e,n){return this.copy(t).slerp(e,n)}random(){const t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),n=Math.random(),s=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(s*Math.sin(t),s*Math.cos(t),r*Math.sin(e),r*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class G{constructor(t=0,e=0,n=0){G.prototype.isVector3=!0,this.x=t,this.y=e,this.z=n}set(t,e,n){return n===void 0&&(n=this.z),this.x=t,this.y=e,this.z=n,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(kl.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(kl.setFromAxisAngle(t,e))}applyMatrix3(t){const e=this.x,n=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[3]*n+r[6]*s,this.y=r[1]*e+r[4]*n+r[7]*s,this.z=r[2]*e+r[5]*n+r[8]*s,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){const e=this.x,n=this.y,s=this.z,r=t.elements,o=1/(r[3]*e+r[7]*n+r[11]*s+r[15]);return this.x=(r[0]*e+r[4]*n+r[8]*s+r[12])*o,this.y=(r[1]*e+r[5]*n+r[9]*s+r[13])*o,this.z=(r[2]*e+r[6]*n+r[10]*s+r[14])*o,this}applyQuaternion(t){const e=this.x,n=this.y,s=this.z,r=t.x,o=t.y,a=t.z,c=t.w,l=2*(o*s-a*n),h=2*(a*e-r*s),f=2*(r*n-o*e);return this.x=e+c*l+o*f-a*h,this.y=n+c*h+a*l-r*f,this.z=s+c*f+r*h-o*l,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){const e=this.x,n=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[4]*n+r[8]*s,this.y=r[1]*e+r[5]*n+r[9]*s,this.z=r[2]*e+r[6]*n+r[10]*s,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){const n=t.x,s=t.y,r=t.z,o=e.x,a=e.y,c=e.z;return this.x=s*c-r*a,this.y=r*o-n*c,this.z=n*a-s*o,this}projectOnVector(t){const e=t.lengthSq();if(e===0)return this.set(0,0,0);const n=t.dot(this)/e;return this.copy(t).multiplyScalar(n)}projectOnPlane(t){return oa.copy(this).projectOnVector(t),this.sub(oa)}reflect(t){return this.sub(oa.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(Be(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y,s=this.z-t.z;return e*e+n*n+s*s}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,n){const s=Math.sin(e)*t;return this.x=s*Math.sin(n),this.y=Math.cos(e)*t,this.z=s*Math.cos(n),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,n){return this.x=t*Math.sin(e),this.y=n,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){const e=this.setFromMatrixColumn(t,0).length(),n=this.setFromMatrixColumn(t,1).length(),s=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=n,this.z=s,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const t=Math.random()*Math.PI*2,e=Math.random()*2-1,n=Math.sqrt(1-e*e);return this.x=n*Math.cos(t),this.y=e,this.z=n*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const oa=new G,kl=new rs;class Hs{constructor(t=new G(1/0,1/0,1/0),e=new G(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e+=3)this.expandByPoint(on.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,n=t.count;e<n;e++)this.expandByPoint(on.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){const n=on.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(n),this.max.copy(t).add(n),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);const n=t.geometry;if(n!==void 0){const r=n.getAttribute("position");if(e===!0&&r!==void 0&&t.isInstancedMesh!==!0)for(let o=0,a=r.count;o<a;o++)t.isMesh===!0?t.getVertexPosition(o,on):on.fromBufferAttribute(r,o),on.applyMatrix4(t.matrixWorld),this.expandByPoint(on);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),js.copy(t.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),js.copy(n.boundingBox)),js.applyMatrix4(t.matrixWorld),this.union(js)}const s=t.children;for(let r=0,o=s.length;r<o;r++)this.expandByObject(s[r],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,on),on.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,n;return t.normal.x>0?(e=t.normal.x*this.min.x,n=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,n=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,n+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,n+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,n+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,n+=t.normal.z*this.min.z),e<=-t.constant&&n>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(ps),Js.subVectors(this.max,ps),Ai.subVectors(t.a,ps),Ci.subVectors(t.b,ps),Ri.subVectors(t.c,ps),Bn.subVectors(Ci,Ai),On.subVectors(Ri,Ci),ei.subVectors(Ai,Ri);let e=[0,-Bn.z,Bn.y,0,-On.z,On.y,0,-ei.z,ei.y,Bn.z,0,-Bn.x,On.z,0,-On.x,ei.z,0,-ei.x,-Bn.y,Bn.x,0,-On.y,On.x,0,-ei.y,ei.x,0];return!la(e,Ai,Ci,Ri,Js)||(e=[1,0,0,0,1,0,0,0,1],!la(e,Ai,Ci,Ri,Js))?!1:(Qs.crossVectors(Bn,On),e=[Qs.x,Qs.y,Qs.z],la(e,Ai,Ci,Ri,Js))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,on).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(on).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(Sn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),Sn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),Sn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),Sn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),Sn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),Sn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),Sn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),Sn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(Sn),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}}const Sn=[new G,new G,new G,new G,new G,new G,new G,new G],on=new G,js=new Hs,Ai=new G,Ci=new G,Ri=new G,Bn=new G,On=new G,ei=new G,ps=new G,Js=new G,Qs=new G,ni=new G;function la(i,t,e,n,s){for(let r=0,o=i.length-3;r<=o;r+=3){ni.fromArray(i,r);const a=s.x*Math.abs(ni.x)+s.y*Math.abs(ni.y)+s.z*Math.abs(ni.z),c=t.dot(ni),l=e.dot(ni),h=n.dot(ni);if(Math.max(-Math.max(c,l,h),Math.min(c,l,h))>a)return!1}return!0}const Vd=new Hs,ms=new G,ca=new G;class Gs{constructor(t=new G,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){const n=this.center;e!==void 0?n.copy(e):Vd.setFromPoints(t).getCenter(n);let s=0;for(let r=0,o=t.length;r<o;r++)s=Math.max(s,n.distanceToSquared(t[r]));return this.radius=Math.sqrt(s),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){const e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){const n=this.center.distanceToSquared(t);return e.copy(t),n>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;ms.subVectors(t,this.center);const e=ms.lengthSq();if(e>this.radius*this.radius){const n=Math.sqrt(e),s=(n-this.radius)*.5;this.center.addScaledVector(ms,s/n),this.radius+=s}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(ca.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(ms.copy(t.center).add(ca)),this.expandByPoint(ms.copy(t.center).sub(ca))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}}const wn=new G,ha=new G,tr=new G,zn=new G,ua=new G,er=new G,da=new G;class il{constructor(t=new G,e=new G(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,wn)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);const n=e.dot(this.direction);return n<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){const e=wn.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(wn.copy(this.origin).addScaledVector(this.direction,e),wn.distanceToSquared(t))}distanceSqToSegment(t,e,n,s){ha.copy(t).add(e).multiplyScalar(.5),tr.copy(e).sub(t).normalize(),zn.copy(this.origin).sub(ha);const r=t.distanceTo(e)*.5,o=-this.direction.dot(tr),a=zn.dot(this.direction),c=-zn.dot(tr),l=zn.lengthSq(),h=Math.abs(1-o*o);let f,u,d,p;if(h>0)if(f=o*c-a,u=o*a-c,p=r*h,f>=0)if(u>=-p)if(u<=p){const _=1/h;f*=_,u*=_,d=f*(f+o*u+2*a)+u*(o*f+u+2*c)+l}else u=r,f=Math.max(0,-(o*u+a)),d=-f*f+u*(u+2*c)+l;else u=-r,f=Math.max(0,-(o*u+a)),d=-f*f+u*(u+2*c)+l;else u<=-p?(f=Math.max(0,-(-o*r+a)),u=f>0?-r:Math.min(Math.max(-r,-c),r),d=-f*f+u*(u+2*c)+l):u<=p?(f=0,u=Math.min(Math.max(-r,-c),r),d=u*(u+2*c)+l):(f=Math.max(0,-(o*r+a)),u=f>0?r:Math.min(Math.max(-r,-c),r),d=-f*f+u*(u+2*c)+l);else u=o>0?-r:r,f=Math.max(0,-(o*u+a)),d=-f*f+u*(u+2*c)+l;return n&&n.copy(this.origin).addScaledVector(this.direction,f),s&&s.copy(ha).addScaledVector(tr,u),d}intersectSphere(t,e){wn.subVectors(t.center,this.origin);const n=wn.dot(this.direction),s=wn.dot(wn)-n*n,r=t.radius*t.radius;if(s>r)return null;const o=Math.sqrt(r-s),a=n-o,c=n+o;return c<0?null:a<0?this.at(c,e):this.at(a,e)}intersectsSphere(t){return this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){const e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(t.normal)+t.constant)/e;return n>=0?n:null}intersectPlane(t,e){const n=this.distanceToPlane(t);return n===null?null:this.at(n,e)}intersectsPlane(t){const e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let n,s,r,o,a,c;const l=1/this.direction.x,h=1/this.direction.y,f=1/this.direction.z,u=this.origin;return l>=0?(n=(t.min.x-u.x)*l,s=(t.max.x-u.x)*l):(n=(t.max.x-u.x)*l,s=(t.min.x-u.x)*l),h>=0?(r=(t.min.y-u.y)*h,o=(t.max.y-u.y)*h):(r=(t.max.y-u.y)*h,o=(t.min.y-u.y)*h),n>o||r>s||((r>n||isNaN(n))&&(n=r),(o<s||isNaN(s))&&(s=o),f>=0?(a=(t.min.z-u.z)*f,c=(t.max.z-u.z)*f):(a=(t.max.z-u.z)*f,c=(t.min.z-u.z)*f),n>c||a>s)||((a>n||n!==n)&&(n=a),(c<s||s!==s)&&(s=c),s<0)?null:this.at(n>=0?n:s,e)}intersectsBox(t){return this.intersectBox(t,wn)!==null}intersectTriangle(t,e,n,s,r){ua.subVectors(e,t),er.subVectors(n,t),da.crossVectors(ua,er);let o=this.direction.dot(da),a;if(o>0){if(s)return null;a=1}else if(o<0)a=-1,o=-o;else return null;zn.subVectors(this.origin,t);const c=a*this.direction.dot(er.crossVectors(zn,er));if(c<0)return null;const l=a*this.direction.dot(ua.cross(zn));if(l<0||c+l>o)return null;const h=-a*zn.dot(da);return h<0?null:this.at(h/o,r)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class ee{constructor(t,e,n,s,r,o,a,c,l,h,f,u,d,p,_,m){ee.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,n,s,r,o,a,c,l,h,f,u,d,p,_,m)}set(t,e,n,s,r,o,a,c,l,h,f,u,d,p,_,m){const g=this.elements;return g[0]=t,g[4]=e,g[8]=n,g[12]=s,g[1]=r,g[5]=o,g[9]=a,g[13]=c,g[2]=l,g[6]=h,g[10]=f,g[14]=u,g[3]=d,g[7]=p,g[11]=_,g[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new ee().fromArray(this.elements)}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],e[9]=n[9],e[10]=n[10],e[11]=n[11],e[12]=n[12],e[13]=n[13],e[14]=n[14],e[15]=n[15],this}copyPosition(t){const e=this.elements,n=t.elements;return e[12]=n[12],e[13]=n[13],e[14]=n[14],this}setFromMatrix3(t){const e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,n){return t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(t,e,n){return this.set(t.x,e.x,n.x,0,t.y,e.y,n.y,0,t.z,e.z,n.z,0,0,0,0,1),this}extractRotation(t){const e=this.elements,n=t.elements,s=1/Ii.setFromMatrixColumn(t,0).length(),r=1/Ii.setFromMatrixColumn(t,1).length(),o=1/Ii.setFromMatrixColumn(t,2).length();return e[0]=n[0]*s,e[1]=n[1]*s,e[2]=n[2]*s,e[3]=0,e[4]=n[4]*r,e[5]=n[5]*r,e[6]=n[6]*r,e[7]=0,e[8]=n[8]*o,e[9]=n[9]*o,e[10]=n[10]*o,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){const e=this.elements,n=t.x,s=t.y,r=t.z,o=Math.cos(n),a=Math.sin(n),c=Math.cos(s),l=Math.sin(s),h=Math.cos(r),f=Math.sin(r);if(t.order==="XYZ"){const u=o*h,d=o*f,p=a*h,_=a*f;e[0]=c*h,e[4]=-c*f,e[8]=l,e[1]=d+p*l,e[5]=u-_*l,e[9]=-a*c,e[2]=_-u*l,e[6]=p+d*l,e[10]=o*c}else if(t.order==="YXZ"){const u=c*h,d=c*f,p=l*h,_=l*f;e[0]=u+_*a,e[4]=p*a-d,e[8]=o*l,e[1]=o*f,e[5]=o*h,e[9]=-a,e[2]=d*a-p,e[6]=_+u*a,e[10]=o*c}else if(t.order==="ZXY"){const u=c*h,d=c*f,p=l*h,_=l*f;e[0]=u-_*a,e[4]=-o*f,e[8]=p+d*a,e[1]=d+p*a,e[5]=o*h,e[9]=_-u*a,e[2]=-o*l,e[6]=a,e[10]=o*c}else if(t.order==="ZYX"){const u=o*h,d=o*f,p=a*h,_=a*f;e[0]=c*h,e[4]=p*l-d,e[8]=u*l+_,e[1]=c*f,e[5]=_*l+u,e[9]=d*l-p,e[2]=-l,e[6]=a*c,e[10]=o*c}else if(t.order==="YZX"){const u=o*c,d=o*l,p=a*c,_=a*l;e[0]=c*h,e[4]=_-u*f,e[8]=p*f+d,e[1]=f,e[5]=o*h,e[9]=-a*h,e[2]=-l*h,e[6]=d*f+p,e[10]=u-_*f}else if(t.order==="XZY"){const u=o*c,d=o*l,p=a*c,_=a*l;e[0]=c*h,e[4]=-f,e[8]=l*h,e[1]=u*f+_,e[5]=o*h,e[9]=d*f-p,e[2]=p*f-d,e[6]=a*h,e[10]=_*f+u}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(Wd,t,Xd)}lookAt(t,e,n){const s=this.elements;return Xe.subVectors(t,e),Xe.lengthSq()===0&&(Xe.z=1),Xe.normalize(),Hn.crossVectors(n,Xe),Hn.lengthSq()===0&&(Math.abs(n.z)===1?Xe.x+=1e-4:Xe.z+=1e-4,Xe.normalize(),Hn.crossVectors(n,Xe)),Hn.normalize(),nr.crossVectors(Xe,Hn),s[0]=Hn.x,s[4]=nr.x,s[8]=Xe.x,s[1]=Hn.y,s[5]=nr.y,s[9]=Xe.y,s[2]=Hn.z,s[6]=nr.z,s[10]=Xe.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,s=e.elements,r=this.elements,o=n[0],a=n[4],c=n[8],l=n[12],h=n[1],f=n[5],u=n[9],d=n[13],p=n[2],_=n[6],m=n[10],g=n[14],w=n[3],E=n[7],y=n[11],b=n[15],S=s[0],M=s[4],R=s[8],v=s[12],x=s[1],C=s[5],L=s[9],U=s[13],D=s[2],O=s[6],H=s[10],$=s[14],z=s[3],q=s[7],et=s[11],gt=s[15];return r[0]=o*S+a*x+c*D+l*z,r[4]=o*M+a*C+c*O+l*q,r[8]=o*R+a*L+c*H+l*et,r[12]=o*v+a*U+c*$+l*gt,r[1]=h*S+f*x+u*D+d*z,r[5]=h*M+f*C+u*O+d*q,r[9]=h*R+f*L+u*H+d*et,r[13]=h*v+f*U+u*$+d*gt,r[2]=p*S+_*x+m*D+g*z,r[6]=p*M+_*C+m*O+g*q,r[10]=p*R+_*L+m*H+g*et,r[14]=p*v+_*U+m*$+g*gt,r[3]=w*S+E*x+y*D+b*z,r[7]=w*M+E*C+y*O+b*q,r[11]=w*R+E*L+y*H+b*et,r[15]=w*v+E*U+y*$+b*gt,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[4],s=t[8],r=t[12],o=t[1],a=t[5],c=t[9],l=t[13],h=t[2],f=t[6],u=t[10],d=t[14],p=t[3],_=t[7],m=t[11],g=t[15];return p*(+r*c*f-s*l*f-r*a*u+n*l*u+s*a*d-n*c*d)+_*(+e*c*d-e*l*u+r*o*u-s*o*d+s*l*h-r*c*h)+m*(+e*l*f-e*a*d-r*o*f+n*o*d+r*a*h-n*l*h)+g*(-s*a*h-e*c*f+e*a*u+s*o*f-n*o*u+n*c*h)}transpose(){const t=this.elements;let e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,n){const s=this.elements;return t.isVector3?(s[12]=t.x,s[13]=t.y,s[14]=t.z):(s[12]=t,s[13]=e,s[14]=n),this}invert(){const t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],o=t[4],a=t[5],c=t[6],l=t[7],h=t[8],f=t[9],u=t[10],d=t[11],p=t[12],_=t[13],m=t[14],g=t[15],w=f*m*l-_*u*l+_*c*d-a*m*d-f*c*g+a*u*g,E=p*u*l-h*m*l-p*c*d+o*m*d+h*c*g-o*u*g,y=h*_*l-p*f*l+p*a*d-o*_*d-h*a*g+o*f*g,b=p*f*c-h*_*c-p*a*u+o*_*u+h*a*m-o*f*m,S=e*w+n*E+s*y+r*b;if(S===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const M=1/S;return t[0]=w*M,t[1]=(_*u*r-f*m*r-_*s*d+n*m*d+f*s*g-n*u*g)*M,t[2]=(a*m*r-_*c*r+_*s*l-n*m*l-a*s*g+n*c*g)*M,t[3]=(f*c*r-a*u*r-f*s*l+n*u*l+a*s*d-n*c*d)*M,t[4]=E*M,t[5]=(h*m*r-p*u*r+p*s*d-e*m*d-h*s*g+e*u*g)*M,t[6]=(p*c*r-o*m*r-p*s*l+e*m*l+o*s*g-e*c*g)*M,t[7]=(o*u*r-h*c*r+h*s*l-e*u*l-o*s*d+e*c*d)*M,t[8]=y*M,t[9]=(p*f*r-h*_*r-p*n*d+e*_*d+h*n*g-e*f*g)*M,t[10]=(o*_*r-p*a*r+p*n*l-e*_*l-o*n*g+e*a*g)*M,t[11]=(h*a*r-o*f*r-h*n*l+e*f*l+o*n*d-e*a*d)*M,t[12]=b*M,t[13]=(h*_*s-p*f*s+p*n*u-e*_*u-h*n*m+e*f*m)*M,t[14]=(p*a*s-o*_*s-p*n*c+e*_*c+o*n*m-e*a*m)*M,t[15]=(o*f*s-h*a*s+h*n*c-e*f*c-o*n*u+e*a*u)*M,this}scale(t){const e=this.elements,n=t.x,s=t.y,r=t.z;return e[0]*=n,e[4]*=s,e[8]*=r,e[1]*=n,e[5]*=s,e[9]*=r,e[2]*=n,e[6]*=s,e[10]*=r,e[3]*=n,e[7]*=s,e[11]*=r,this}getMaxScaleOnAxis(){const t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],n=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],s=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,n,s))}makeTranslation(t,e,n){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,n,0,0,0,1),this}makeRotationX(t){const e=Math.cos(t),n=Math.sin(t);return this.set(1,0,0,0,0,e,-n,0,0,n,e,0,0,0,0,1),this}makeRotationY(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,0,n,0,0,1,0,0,-n,0,e,0,0,0,0,1),this}makeRotationZ(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,0,n,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){const n=Math.cos(e),s=Math.sin(e),r=1-n,o=t.x,a=t.y,c=t.z,l=r*o,h=r*a;return this.set(l*o+n,l*a-s*c,l*c+s*a,0,l*a+s*c,h*a+n,h*c-s*o,0,l*c-s*a,h*c+s*o,r*c*c+n,0,0,0,0,1),this}makeScale(t,e,n){return this.set(t,0,0,0,0,e,0,0,0,0,n,0,0,0,0,1),this}makeShear(t,e,n,s,r,o){return this.set(1,n,r,0,t,1,o,0,e,s,1,0,0,0,0,1),this}compose(t,e,n){const s=this.elements,r=e._x,o=e._y,a=e._z,c=e._w,l=r+r,h=o+o,f=a+a,u=r*l,d=r*h,p=r*f,_=o*h,m=o*f,g=a*f,w=c*l,E=c*h,y=c*f,b=n.x,S=n.y,M=n.z;return s[0]=(1-(_+g))*b,s[1]=(d+y)*b,s[2]=(p-E)*b,s[3]=0,s[4]=(d-y)*S,s[5]=(1-(u+g))*S,s[6]=(m+w)*S,s[7]=0,s[8]=(p+E)*M,s[9]=(m-w)*M,s[10]=(1-(u+_))*M,s[11]=0,s[12]=t.x,s[13]=t.y,s[14]=t.z,s[15]=1,this}decompose(t,e,n){const s=this.elements;let r=Ii.set(s[0],s[1],s[2]).length();const o=Ii.set(s[4],s[5],s[6]).length(),a=Ii.set(s[8],s[9],s[10]).length();this.determinant()<0&&(r=-r),t.x=s[12],t.y=s[13],t.z=s[14],ln.copy(this);const l=1/r,h=1/o,f=1/a;return ln.elements[0]*=l,ln.elements[1]*=l,ln.elements[2]*=l,ln.elements[4]*=h,ln.elements[5]*=h,ln.elements[6]*=h,ln.elements[8]*=f,ln.elements[9]*=f,ln.elements[10]*=f,e.setFromRotationMatrix(ln),n.x=r,n.y=o,n.z=a,this}makePerspective(t,e,n,s,r,o,a=Pn){const c=this.elements,l=2*r/(e-t),h=2*r/(n-s),f=(e+t)/(e-t),u=(n+s)/(n-s);let d,p;if(a===Pn)d=-(o+r)/(o-r),p=-2*o*r/(o-r);else if(a===zr)d=-o/(o-r),p=-o*r/(o-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return c[0]=l,c[4]=0,c[8]=f,c[12]=0,c[1]=0,c[5]=h,c[9]=u,c[13]=0,c[2]=0,c[6]=0,c[10]=d,c[14]=p,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(t,e,n,s,r,o,a=Pn){const c=this.elements,l=1/(e-t),h=1/(n-s),f=1/(o-r),u=(e+t)*l,d=(n+s)*h;let p,_;if(a===Pn)p=(o+r)*f,_=-2*f;else if(a===zr)p=r*f,_=-1*f;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return c[0]=2*l,c[4]=0,c[8]=0,c[12]=-u,c[1]=0,c[5]=2*h,c[9]=0,c[13]=-d,c[2]=0,c[6]=0,c[10]=_,c[14]=-p,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(t){const e=this.elements,n=t.elements;for(let s=0;s<16;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<16;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t[e+9]=n[9],t[e+10]=n[10],t[e+11]=n[11],t[e+12]=n[12],t[e+13]=n[13],t[e+14]=n[14],t[e+15]=n[15],t}}const Ii=new G,ln=new ee,Wd=new G(0,0,0),Xd=new G(1,1,1),Hn=new G,nr=new G,Xe=new G,Fl=new ee,Nl=new rs;class nn{constructor(t=0,e=0,n=0,s=nn.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=n,this._order=s}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,n,s=this._order){return this._x=t,this._y=e,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,n=!0){const s=t.elements,r=s[0],o=s[4],a=s[8],c=s[1],l=s[5],h=s[9],f=s[2],u=s[6],d=s[10];switch(e){case"XYZ":this._y=Math.asin(Be(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-h,d),this._z=Math.atan2(-o,r)):(this._x=Math.atan2(u,l),this._z=0);break;case"YXZ":this._x=Math.asin(-Be(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(a,d),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-f,r),this._z=0);break;case"ZXY":this._x=Math.asin(Be(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(-f,d),this._z=Math.atan2(-o,l)):(this._y=0,this._z=Math.atan2(c,r));break;case"ZYX":this._y=Math.asin(-Be(f,-1,1)),Math.abs(f)<.9999999?(this._x=Math.atan2(u,d),this._z=Math.atan2(c,r)):(this._x=0,this._z=Math.atan2(-o,l));break;case"YZX":this._z=Math.asin(Be(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-h,l),this._y=Math.atan2(-f,r)):(this._x=0,this._y=Math.atan2(a,d));break;case"XZY":this._z=Math.asin(-Be(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(u,l),this._y=Math.atan2(a,r)):(this._x=Math.atan2(-h,d),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,n===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,n){return Fl.makeRotationFromQuaternion(t),this.setFromRotationMatrix(Fl,e,n)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return Nl.setFromEuler(this),this.setFromQuaternion(Nl,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}nn.DEFAULT_ORDER="XYZ";class Nh{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}}let $d=0;const Bl=new G,Pi=new rs,bn=new ee,ir=new G,gs=new G,Yd=new G,qd=new rs,Ol=new G(1,0,0),zl=new G(0,1,0),Hl=new G(0,0,1),Gl={type:"added"},Zd={type:"removed"},Di={type:"childadded",child:null},fa={type:"childremoved",child:null};class be extends ss{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:$d++}),this.uuid=zs(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=be.DEFAULT_UP.clone();const t=new G,e=new nn,n=new rs,s=new G(1,1,1);function r(){n.setFromEuler(e,!1)}function o(){e.setFromQuaternion(n,void 0,!1)}e._onChange(r),n._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new ee},normalMatrix:{value:new Ut}}),this.matrix=new ee,this.matrixWorld=new ee,this.matrixAutoUpdate=be.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=be.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Nh,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return Pi.setFromAxisAngle(t,e),this.quaternion.multiply(Pi),this}rotateOnWorldAxis(t,e){return Pi.setFromAxisAngle(t,e),this.quaternion.premultiply(Pi),this}rotateX(t){return this.rotateOnAxis(Ol,t)}rotateY(t){return this.rotateOnAxis(zl,t)}rotateZ(t){return this.rotateOnAxis(Hl,t)}translateOnAxis(t,e){return Bl.copy(t).applyQuaternion(this.quaternion),this.position.add(Bl.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(Ol,t)}translateY(t){return this.translateOnAxis(zl,t)}translateZ(t){return this.translateOnAxis(Hl,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(bn.copy(this.matrixWorld).invert())}lookAt(t,e,n){t.isVector3?ir.copy(t):ir.set(t,e,n);const s=this.parent;this.updateWorldMatrix(!0,!1),gs.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?bn.lookAt(gs,ir,this.up):bn.lookAt(ir,gs,this.up),this.quaternion.setFromRotationMatrix(bn),s&&(bn.extractRotation(s.matrixWorld),Pi.setFromRotationMatrix(bn),this.quaternion.premultiply(Pi.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(Gl),Di.child=t,this.dispatchEvent(Di),Di.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(Zd),fa.child=t,this.dispatchEvent(fa),fa.child=null),this}removeFromParent(){const t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),bn.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),bn.multiply(t.parent.matrixWorld)),t.applyMatrix4(bn),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(Gl),Di.child=t,this.dispatchEvent(Di),Di.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let n=0,s=this.children.length;n<s;n++){const o=this.children[n].getObjectByProperty(t,e);if(o!==void 0)return o}}getObjectsByProperty(t,e,n=[]){this[t]===e&&n.push(this);const s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].getObjectsByProperty(t,e,n);return n}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(gs,t,Yd),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(gs,qd,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);const e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}traverse(t){t(this);const e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);const e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverseVisible(t)}traverseAncestors(t){const e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);const e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].updateMatrixWorld(t)}updateWorldMatrix(t,e){const n=this.parent;if(t===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),e===!0){const s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].updateWorldMatrix(!1,!0)}}toJSON(t){const e=t===void 0||typeof t=="string",n={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.visibility=this._visibility,s.active=this._active,s.bounds=this._bounds.map(a=>({boxInitialized:a.boxInitialized,boxMin:a.box.min.toArray(),boxMax:a.box.max.toArray(),sphereInitialized:a.sphereInitialized,sphereRadius:a.sphere.radius,sphereCenter:a.sphere.center.toArray()})),s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.geometryCount=this._geometryCount,s.matricesTexture=this._matricesTexture.toJSON(t),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(s.boundingSphere={center:s.boundingSphere.center.toArray(),radius:s.boundingSphere.radius}),this.boundingBox!==null&&(s.boundingBox={min:s.boundingBox.min.toArray(),max:s.boundingBox.max.toArray()}));function r(a,c){return a[c.uuid]===void 0&&(a[c.uuid]=c.toJSON(t)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(t.geometries,this.geometry);const a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){const c=a.shapes;if(Array.isArray(c))for(let l=0,h=c.length;l<h;l++){const f=c[l];r(t.shapes,f)}else r(t.shapes,c)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(t.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const a=[];for(let c=0,l=this.material.length;c<l;c++)a.push(r(t.materials,this.material[c]));s.material=a}else s.material=r(t.materials,this.material);if(this.children.length>0){s.children=[];for(let a=0;a<this.children.length;a++)s.children.push(this.children[a].toJSON(t).object)}if(this.animations.length>0){s.animations=[];for(let a=0;a<this.animations.length;a++){const c=this.animations[a];s.animations.push(r(t.animations,c))}}if(e){const a=o(t.geometries),c=o(t.materials),l=o(t.textures),h=o(t.images),f=o(t.shapes),u=o(t.skeletons),d=o(t.animations),p=o(t.nodes);a.length>0&&(n.geometries=a),c.length>0&&(n.materials=c),l.length>0&&(n.textures=l),h.length>0&&(n.images=h),f.length>0&&(n.shapes=f),u.length>0&&(n.skeletons=u),d.length>0&&(n.animations=d),p.length>0&&(n.nodes=p)}return n.object=s,n;function o(a){const c=[];for(const l in a){const h=a[l];delete h.metadata,c.push(h)}return c}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let n=0;n<t.children.length;n++){const s=t.children[n];this.add(s.clone())}return this}}be.DEFAULT_UP=new G(0,1,0);be.DEFAULT_MATRIX_AUTO_UPDATE=!0;be.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const cn=new G,En=new G,pa=new G,Tn=new G,Li=new G,Ui=new G,Vl=new G,ma=new G,ga=new G,_a=new G,va=new me,xa=new me,ya=new me;class Qe{constructor(t=new G,e=new G,n=new G){this.a=t,this.b=e,this.c=n}static getNormal(t,e,n,s){s.subVectors(n,e),cn.subVectors(t,e),s.cross(cn);const r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(t,e,n,s,r){cn.subVectors(s,e),En.subVectors(n,e),pa.subVectors(t,e);const o=cn.dot(cn),a=cn.dot(En),c=cn.dot(pa),l=En.dot(En),h=En.dot(pa),f=o*l-a*a;if(f===0)return r.set(0,0,0),null;const u=1/f,d=(l*c-a*h)*u,p=(o*h-a*c)*u;return r.set(1-d-p,p,d)}static containsPoint(t,e,n,s){return this.getBarycoord(t,e,n,s,Tn)===null?!1:Tn.x>=0&&Tn.y>=0&&Tn.x+Tn.y<=1}static getInterpolation(t,e,n,s,r,o,a,c){return this.getBarycoord(t,e,n,s,Tn)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(r,Tn.x),c.addScaledVector(o,Tn.y),c.addScaledVector(a,Tn.z),c)}static getInterpolatedAttribute(t,e,n,s,r,o){return va.setScalar(0),xa.setScalar(0),ya.setScalar(0),va.fromBufferAttribute(t,e),xa.fromBufferAttribute(t,n),ya.fromBufferAttribute(t,s),o.setScalar(0),o.addScaledVector(va,r.x),o.addScaledVector(xa,r.y),o.addScaledVector(ya,r.z),o}static isFrontFacing(t,e,n,s){return cn.subVectors(n,e),En.subVectors(t,e),cn.cross(En).dot(s)<0}set(t,e,n){return this.a.copy(t),this.b.copy(e),this.c.copy(n),this}setFromPointsAndIndices(t,e,n,s){return this.a.copy(t[e]),this.b.copy(t[n]),this.c.copy(t[s]),this}setFromAttributeAndIndices(t,e,n,s){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,n),this.c.fromBufferAttribute(t,s),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return cn.subVectors(this.c,this.b),En.subVectors(this.a,this.b),cn.cross(En).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return Qe.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return Qe.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,n,s,r){return Qe.getInterpolation(t,this.a,this.b,this.c,e,n,s,r)}containsPoint(t){return Qe.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return Qe.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){const n=this.a,s=this.b,r=this.c;let o,a;Li.subVectors(s,n),Ui.subVectors(r,n),ma.subVectors(t,n);const c=Li.dot(ma),l=Ui.dot(ma);if(c<=0&&l<=0)return e.copy(n);ga.subVectors(t,s);const h=Li.dot(ga),f=Ui.dot(ga);if(h>=0&&f<=h)return e.copy(s);const u=c*f-h*l;if(u<=0&&c>=0&&h<=0)return o=c/(c-h),e.copy(n).addScaledVector(Li,o);_a.subVectors(t,r);const d=Li.dot(_a),p=Ui.dot(_a);if(p>=0&&d<=p)return e.copy(r);const _=d*l-c*p;if(_<=0&&l>=0&&p<=0)return a=l/(l-p),e.copy(n).addScaledVector(Ui,a);const m=h*p-d*f;if(m<=0&&f-h>=0&&d-p>=0)return Vl.subVectors(r,s),a=(f-h)/(f-h+(d-p)),e.copy(s).addScaledVector(Vl,a);const g=1/(m+_+u);return o=_*g,a=u*g,e.copy(n).addScaledVector(Li,o).addScaledVector(Ui,a)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}}const Bh={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Gn={h:0,s:0,l:0},sr={h:0,s:0,l:0};function Ma(i,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?i+(t-i)*6*e:e<1/2?t:e<2/3?i+(t-i)*6*(2/3-e):i}class Bt{constructor(t,e,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,n)}set(t,e,n){if(e===void 0&&n===void 0){const s=t;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(t,e,n);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=de){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,Wt.toWorkingColorSpace(this,e),this}setRGB(t,e,n,s=Wt.workingColorSpace){return this.r=t,this.g=e,this.b=n,Wt.toWorkingColorSpace(this,s),this}setHSL(t,e,n,s=Wt.workingColorSpace){if(t=Ld(t,1),e=Be(e,0,1),n=Be(n,0,1),e===0)this.r=this.g=this.b=n;else{const r=n<=.5?n*(1+e):n+e-n*e,o=2*n-r;this.r=Ma(o,r,t+1/3),this.g=Ma(o,r,t),this.b=Ma(o,r,t-1/3)}return Wt.toWorkingColorSpace(this,s),this}setStyle(t,e=de){function n(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+t+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(t)){let r;const o=s[1],a=s[2];switch(o){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,e);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,e);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,e);break;default:console.warn("THREE.Color: Unknown color model "+t)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(t)){const r=s[1],o=r.length;if(o===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,e);if(o===6)return this.setHex(parseInt(r,16),e);console.warn("THREE.Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=de){const n=Bh[t.toLowerCase()];return n!==void 0?this.setHex(n,e):console.warn("THREE.Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=Ln(t.r),this.g=Ln(t.g),this.b=Ln(t.b),this}copyLinearToSRGB(t){return this.r=Xi(t.r),this.g=Xi(t.g),this.b=Xi(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=de){return Wt.fromWorkingColorSpace(Ce.copy(this),t),Math.round(Be(Ce.r*255,0,255))*65536+Math.round(Be(Ce.g*255,0,255))*256+Math.round(Be(Ce.b*255,0,255))}getHexString(t=de){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=Wt.workingColorSpace){Wt.fromWorkingColorSpace(Ce.copy(this),e);const n=Ce.r,s=Ce.g,r=Ce.b,o=Math.max(n,s,r),a=Math.min(n,s,r);let c,l;const h=(a+o)/2;if(a===o)c=0,l=0;else{const f=o-a;switch(l=h<=.5?f/(o+a):f/(2-o-a),o){case n:c=(s-r)/f+(s<r?6:0);break;case s:c=(r-n)/f+2;break;case r:c=(n-s)/f+4;break}c/=6}return t.h=c,t.s=l,t.l=h,t}getRGB(t,e=Wt.workingColorSpace){return Wt.fromWorkingColorSpace(Ce.copy(this),e),t.r=Ce.r,t.g=Ce.g,t.b=Ce.b,t}getStyle(t=de){Wt.fromWorkingColorSpace(Ce.copy(this),t);const e=Ce.r,n=Ce.g,s=Ce.b;return t!==de?`color(${t} ${e.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(t,e,n){return this.getHSL(Gn),this.setHSL(Gn.h+t,Gn.s+e,Gn.l+n)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,n){return this.r=t.r+(e.r-t.r)*n,this.g=t.g+(e.g-t.g)*n,this.b=t.b+(e.b-t.b)*n,this}lerpHSL(t,e){this.getHSL(Gn),t.getHSL(sr);const n=sa(Gn.h,sr.h,e),s=sa(Gn.s,sr.s,e),r=sa(Gn.l,sr.l,e);return this.setHSL(n,s,r),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){const e=this.r,n=this.g,s=this.b,r=t.elements;return this.r=r[0]*e+r[3]*n+r[6]*s,this.g=r[1]*e+r[4]*n+r[7]*s,this.b=r[2]*e+r[5]*n+r[8]*s,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Ce=new Bt;Bt.NAMES=Bh;let Kd=0;class Si extends ss{static get type(){return"Material"}get type(){return this.constructor.type}set type(t){}constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Kd++}),this.uuid=zs(),this.name="",this.blending=Vi,this.side=Jn,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=ja,this.blendDst=Ja,this.blendEquation=ci,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Bt(0,0,0),this.blendAlpha=0,this.depthFunc=qi,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Tl,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Ei,this.stencilZFail=Ei,this.stencilZPass=Ei,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(const e in t){const n=t[e];if(n===void 0){console.warn(`THREE.Material: parameter '${e}' has value of undefined.`);continue}const s=this[e];if(s===void 0){console.warn(`THREE.Material: '${e}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[e]=n}}toJSON(t){const e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});const n={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(t).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(t).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(t).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(t).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(t).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==Vi&&(n.blending=this.blending),this.side!==Jn&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==ja&&(n.blendSrc=this.blendSrc),this.blendDst!==Ja&&(n.blendDst=this.blendDst),this.blendEquation!==ci&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==qi&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Tl&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Ei&&(n.stencilFail=this.stencilFail),this.stencilZFail!==Ei&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==Ei&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(r){const o=[];for(const a in r){const c=r[a];delete c.metadata,o.push(c)}return o}if(e){const r=s(t.textures),o=s(t.images);r.length>0&&(n.textures=r),o.length>0&&(n.images=o)}return n}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;const e=t.clippingPlanes;let n=null;if(e!==null){const s=e.length;n=new Array(s);for(let r=0;r!==s;++r)n[r]=e[r].clone()}return this.clippingPlanes=n,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}}class Ve extends Si{static get type(){return"MeshBasicMaterial"}constructor(t){super(),this.isMeshBasicMaterial=!0,this.color=new Bt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new nn,this.combine=Ko,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}const ve=new G,rr=new jt;class un{constructor(t,e,n=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=n,this.usage=Al,this.updateRanges=[],this.gpuType=In,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,n){t*=this.itemSize,n*=e.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[t+s]=e.array[n+s];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,n=this.count;e<n;e++)rr.fromBufferAttribute(this,e),rr.applyMatrix3(t),this.setXY(e,rr.x,rr.y);else if(this.itemSize===3)for(let e=0,n=this.count;e<n;e++)ve.fromBufferAttribute(this,e),ve.applyMatrix3(t),this.setXYZ(e,ve.x,ve.y,ve.z);return this}applyMatrix4(t){for(let e=0,n=this.count;e<n;e++)ve.fromBufferAttribute(this,e),ve.applyMatrix4(t),this.setXYZ(e,ve.x,ve.y,ve.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)ve.fromBufferAttribute(this,e),ve.applyNormalMatrix(t),this.setXYZ(e,ve.x,ve.y,ve.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)ve.fromBufferAttribute(this,e),ve.transformDirection(t),this.setXYZ(e,ve.x,ve.y,ve.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let n=this.array[t*this.itemSize+e];return this.normalized&&(n=fs(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=Fe(n,this.array)),this.array[t*this.itemSize+e]=n,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=fs(e,this.array)),e}setX(t,e){return this.normalized&&(e=Fe(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=fs(e,this.array)),e}setY(t,e){return this.normalized&&(e=Fe(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=fs(e,this.array)),e}setZ(t,e){return this.normalized&&(e=Fe(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=fs(e,this.array)),e}setW(t,e){return this.normalized&&(e=Fe(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,n){return t*=this.itemSize,this.normalized&&(e=Fe(e,this.array),n=Fe(n,this.array)),this.array[t+0]=e,this.array[t+1]=n,this}setXYZ(t,e,n,s){return t*=this.itemSize,this.normalized&&(e=Fe(e,this.array),n=Fe(n,this.array),s=Fe(s,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this}setXYZW(t,e,n,s,r){return t*=this.itemSize,this.normalized&&(e=Fe(e,this.array),n=Fe(n,this.array),s=Fe(s,this.array),r=Fe(r,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this.array[t+3]=r,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==Al&&(t.usage=this.usage),t}}class Oh extends un{constructor(t,e,n){super(new Uint16Array(t),e,n)}}class zh extends un{constructor(t,e,n){super(new Uint32Array(t),e,n)}}class ue extends un{constructor(t,e,n){super(new Float32Array(t),e,n)}}let jd=0;const Je=new ee,Sa=new be,ki=new G,$e=new Hs,_s=new Hs,Me=new G;class Ie extends ss{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:jd++}),this.uuid=zs(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(Uh(t)?zh:Oh)(t,1):this.index=t,this}setIndirect(t){return this.indirect=t,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,n=0){this.groups.push({start:t,count:e,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){const e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const r=new Ut().getNormalMatrix(t);n.applyNormalMatrix(r),n.needsUpdate=!0}const s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(t),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return Je.makeRotationFromQuaternion(t),this.applyMatrix4(Je),this}rotateX(t){return Je.makeRotationX(t),this.applyMatrix4(Je),this}rotateY(t){return Je.makeRotationY(t),this.applyMatrix4(Je),this}rotateZ(t){return Je.makeRotationZ(t),this.applyMatrix4(Je),this}translate(t,e,n){return Je.makeTranslation(t,e,n),this.applyMatrix4(Je),this}scale(t,e,n){return Je.makeScale(t,e,n),this.applyMatrix4(Je),this}lookAt(t){return Sa.lookAt(t),Sa.updateMatrix(),this.applyMatrix4(Sa.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(ki).negate(),this.translate(ki.x,ki.y,ki.z),this}setFromPoints(t){const e=this.getAttribute("position");if(e===void 0){const n=[];for(let s=0,r=t.length;s<r;s++){const o=t[s];n.push(o.x,o.y,o.z||0)}this.setAttribute("position",new ue(n,3))}else{for(let n=0,s=e.count;n<s;n++){const r=t[n];e.setXYZ(n,r.x,r.y,r.z||0)}t.length>e.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),e.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Hs);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new G(-1/0,-1/0,-1/0),new G(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let n=0,s=e.length;n<s;n++){const r=e[n];$e.setFromBufferAttribute(r),this.morphTargetsRelative?(Me.addVectors(this.boundingBox.min,$e.min),this.boundingBox.expandByPoint(Me),Me.addVectors(this.boundingBox.max,$e.max),this.boundingBox.expandByPoint(Me)):(this.boundingBox.expandByPoint($e.min),this.boundingBox.expandByPoint($e.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Gs);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new G,1/0);return}if(t){const n=this.boundingSphere.center;if($e.setFromBufferAttribute(t),e)for(let r=0,o=e.length;r<o;r++){const a=e[r];_s.setFromBufferAttribute(a),this.morphTargetsRelative?(Me.addVectors($e.min,_s.min),$e.expandByPoint(Me),Me.addVectors($e.max,_s.max),$e.expandByPoint(Me)):($e.expandByPoint(_s.min),$e.expandByPoint(_s.max))}$e.getCenter(n);let s=0;for(let r=0,o=t.count;r<o;r++)Me.fromBufferAttribute(t,r),s=Math.max(s,n.distanceToSquared(Me));if(e)for(let r=0,o=e.length;r<o;r++){const a=e[r],c=this.morphTargetsRelative;for(let l=0,h=a.count;l<h;l++)Me.fromBufferAttribute(a,l),c&&(ki.fromBufferAttribute(t,l),Me.add(ki)),s=Math.max(s,n.distanceToSquared(Me))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=e.position,s=e.normal,r=e.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new un(new Float32Array(4*n.count),4));const o=this.getAttribute("tangent"),a=[],c=[];for(let R=0;R<n.count;R++)a[R]=new G,c[R]=new G;const l=new G,h=new G,f=new G,u=new jt,d=new jt,p=new jt,_=new G,m=new G;function g(R,v,x){l.fromBufferAttribute(n,R),h.fromBufferAttribute(n,v),f.fromBufferAttribute(n,x),u.fromBufferAttribute(r,R),d.fromBufferAttribute(r,v),p.fromBufferAttribute(r,x),h.sub(l),f.sub(l),d.sub(u),p.sub(u);const C=1/(d.x*p.y-p.x*d.y);isFinite(C)&&(_.copy(h).multiplyScalar(p.y).addScaledVector(f,-d.y).multiplyScalar(C),m.copy(f).multiplyScalar(d.x).addScaledVector(h,-p.x).multiplyScalar(C),a[R].add(_),a[v].add(_),a[x].add(_),c[R].add(m),c[v].add(m),c[x].add(m))}let w=this.groups;w.length===0&&(w=[{start:0,count:t.count}]);for(let R=0,v=w.length;R<v;++R){const x=w[R],C=x.start,L=x.count;for(let U=C,D=C+L;U<D;U+=3)g(t.getX(U+0),t.getX(U+1),t.getX(U+2))}const E=new G,y=new G,b=new G,S=new G;function M(R){b.fromBufferAttribute(s,R),S.copy(b);const v=a[R];E.copy(v),E.sub(b.multiplyScalar(b.dot(v))).normalize(),y.crossVectors(S,v);const C=y.dot(c[R])<0?-1:1;o.setXYZW(R,E.x,E.y,E.z,C)}for(let R=0,v=w.length;R<v;++R){const x=w[R],C=x.start,L=x.count;for(let U=C,D=C+L;U<D;U+=3)M(t.getX(U+0)),M(t.getX(U+1)),M(t.getX(U+2))}}computeVertexNormals(){const t=this.index,e=this.getAttribute("position");if(e!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new un(new Float32Array(e.count*3),3),this.setAttribute("normal",n);else for(let u=0,d=n.count;u<d;u++)n.setXYZ(u,0,0,0);const s=new G,r=new G,o=new G,a=new G,c=new G,l=new G,h=new G,f=new G;if(t)for(let u=0,d=t.count;u<d;u+=3){const p=t.getX(u+0),_=t.getX(u+1),m=t.getX(u+2);s.fromBufferAttribute(e,p),r.fromBufferAttribute(e,_),o.fromBufferAttribute(e,m),h.subVectors(o,r),f.subVectors(s,r),h.cross(f),a.fromBufferAttribute(n,p),c.fromBufferAttribute(n,_),l.fromBufferAttribute(n,m),a.add(h),c.add(h),l.add(h),n.setXYZ(p,a.x,a.y,a.z),n.setXYZ(_,c.x,c.y,c.z),n.setXYZ(m,l.x,l.y,l.z)}else for(let u=0,d=e.count;u<d;u+=3)s.fromBufferAttribute(e,u+0),r.fromBufferAttribute(e,u+1),o.fromBufferAttribute(e,u+2),h.subVectors(o,r),f.subVectors(s,r),h.cross(f),n.setXYZ(u+0,h.x,h.y,h.z),n.setXYZ(u+1,h.x,h.y,h.z),n.setXYZ(u+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const t=this.attributes.normal;for(let e=0,n=t.count;e<n;e++)Me.fromBufferAttribute(t,e),Me.normalize(),t.setXYZ(e,Me.x,Me.y,Me.z)}toNonIndexed(){function t(a,c){const l=a.array,h=a.itemSize,f=a.normalized,u=new l.constructor(c.length*h);let d=0,p=0;for(let _=0,m=c.length;_<m;_++){a.isInterleavedBufferAttribute?d=c[_]*a.data.stride+a.offset:d=c[_]*h;for(let g=0;g<h;g++)u[p++]=l[d++]}return new un(u,h,f)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const e=new Ie,n=this.index.array,s=this.attributes;for(const a in s){const c=s[a],l=t(c,n);e.setAttribute(a,l)}const r=this.morphAttributes;for(const a in r){const c=[],l=r[a];for(let h=0,f=l.length;h<f;h++){const u=l[h],d=t(u,n);c.push(d)}e.morphAttributes[a]=c}e.morphTargetsRelative=this.morphTargetsRelative;const o=this.groups;for(let a=0,c=o.length;a<c;a++){const l=o[a];e.addGroup(l.start,l.count,l.materialIndex)}return e}toJSON(){const t={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){const c=this.parameters;for(const l in c)c[l]!==void 0&&(t[l]=c[l]);return t}t.data={attributes:{}};const e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});const n=this.attributes;for(const c in n){const l=n[c];t.data.attributes[c]=l.toJSON(t.data)}const s={};let r=!1;for(const c in this.morphAttributes){const l=this.morphAttributes[c],h=[];for(let f=0,u=l.length;f<u;f++){const d=l[f];h.push(d.toJSON(t.data))}h.length>0&&(s[c]=h,r=!0)}r&&(t.data.morphAttributes=s,t.data.morphTargetsRelative=this.morphTargetsRelative);const o=this.groups;o.length>0&&(t.data.groups=JSON.parse(JSON.stringify(o)));const a=this.boundingSphere;return a!==null&&(t.data.boundingSphere={center:a.center.toArray(),radius:a.radius}),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const e={};this.name=t.name;const n=t.index;n!==null&&this.setIndex(n.clone(e));const s=t.attributes;for(const l in s){const h=s[l];this.setAttribute(l,h.clone(e))}const r=t.morphAttributes;for(const l in r){const h=[],f=r[l];for(let u=0,d=f.length;u<d;u++)h.push(f[u].clone(e));this.morphAttributes[l]=h}this.morphTargetsRelative=t.morphTargetsRelative;const o=t.groups;for(let l=0,h=o.length;l<h;l++){const f=o[l];this.addGroup(f.start,f.count,f.materialIndex)}const a=t.boundingBox;a!==null&&(this.boundingBox=a.clone());const c=t.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const Wl=new ee,ii=new il,ar=new Gs,Xl=new G,or=new G,lr=new G,cr=new G,wa=new G,hr=new G,$l=new G,ur=new G;class Qt extends be{constructor(t=new Ie,e=new Ve){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){const a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}getVertexPosition(t,e){const n=this.geometry,s=n.attributes.position,r=n.morphAttributes.position,o=n.morphTargetsRelative;e.fromBufferAttribute(s,t);const a=this.morphTargetInfluences;if(r&&a){hr.set(0,0,0);for(let c=0,l=r.length;c<l;c++){const h=a[c],f=r[c];h!==0&&(wa.fromBufferAttribute(f,t),o?hr.addScaledVector(wa,h):hr.addScaledVector(wa.sub(e),h))}e.add(hr)}return e}raycast(t,e){const n=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),ar.copy(n.boundingSphere),ar.applyMatrix4(r),ii.copy(t.ray).recast(t.near),!(ar.containsPoint(ii.origin)===!1&&(ii.intersectSphere(ar,Xl)===null||ii.origin.distanceToSquared(Xl)>(t.far-t.near)**2))&&(Wl.copy(r).invert(),ii.copy(t.ray).applyMatrix4(Wl),!(n.boundingBox!==null&&ii.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(t,e,ii)))}_computeIntersections(t,e,n){let s;const r=this.geometry,o=this.material,a=r.index,c=r.attributes.position,l=r.attributes.uv,h=r.attributes.uv1,f=r.attributes.normal,u=r.groups,d=r.drawRange;if(a!==null)if(Array.isArray(o))for(let p=0,_=u.length;p<_;p++){const m=u[p],g=o[m.materialIndex],w=Math.max(m.start,d.start),E=Math.min(a.count,Math.min(m.start+m.count,d.start+d.count));for(let y=w,b=E;y<b;y+=3){const S=a.getX(y),M=a.getX(y+1),R=a.getX(y+2);s=dr(this,g,t,n,l,h,f,S,M,R),s&&(s.faceIndex=Math.floor(y/3),s.face.materialIndex=m.materialIndex,e.push(s))}}else{const p=Math.max(0,d.start),_=Math.min(a.count,d.start+d.count);for(let m=p,g=_;m<g;m+=3){const w=a.getX(m),E=a.getX(m+1),y=a.getX(m+2);s=dr(this,o,t,n,l,h,f,w,E,y),s&&(s.faceIndex=Math.floor(m/3),e.push(s))}}else if(c!==void 0)if(Array.isArray(o))for(let p=0,_=u.length;p<_;p++){const m=u[p],g=o[m.materialIndex],w=Math.max(m.start,d.start),E=Math.min(c.count,Math.min(m.start+m.count,d.start+d.count));for(let y=w,b=E;y<b;y+=3){const S=y,M=y+1,R=y+2;s=dr(this,g,t,n,l,h,f,S,M,R),s&&(s.faceIndex=Math.floor(y/3),s.face.materialIndex=m.materialIndex,e.push(s))}}else{const p=Math.max(0,d.start),_=Math.min(c.count,d.start+d.count);for(let m=p,g=_;m<g;m+=3){const w=m,E=m+1,y=m+2;s=dr(this,o,t,n,l,h,f,w,E,y),s&&(s.faceIndex=Math.floor(m/3),e.push(s))}}}}function Jd(i,t,e,n,s,r,o,a){let c;if(t.side===Ue?c=n.intersectTriangle(o,r,s,!0,a):c=n.intersectTriangle(s,r,o,t.side===Jn,a),c===null)return null;ur.copy(a),ur.applyMatrix4(i.matrixWorld);const l=e.ray.origin.distanceTo(ur);return l<e.near||l>e.far?null:{distance:l,point:ur.clone(),object:i}}function dr(i,t,e,n,s,r,o,a,c,l){i.getVertexPosition(a,or),i.getVertexPosition(c,lr),i.getVertexPosition(l,cr);const h=Jd(i,t,e,n,or,lr,cr,$l);if(h){const f=new G;Qe.getBarycoord($l,or,lr,cr,f),s&&(h.uv=Qe.getInterpolatedAttribute(s,a,c,l,f,new jt)),r&&(h.uv1=Qe.getInterpolatedAttribute(r,a,c,l,f,new jt)),o&&(h.normal=Qe.getInterpolatedAttribute(o,a,c,l,f,new G),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));const u={a,b:c,c:l,normal:new G,materialIndex:0};Qe.getNormal(or,lr,cr,u.normal),h.face=u,h.barycoord=f}return h}class we extends Ie{constructor(t=1,e=1,n=1,s=1,r=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:n,widthSegments:s,heightSegments:r,depthSegments:o};const a=this;s=Math.floor(s),r=Math.floor(r),o=Math.floor(o);const c=[],l=[],h=[],f=[];let u=0,d=0;p("z","y","x",-1,-1,n,e,t,o,r,0),p("z","y","x",1,-1,n,e,-t,o,r,1),p("x","z","y",1,1,t,n,e,s,o,2),p("x","z","y",1,-1,t,n,-e,s,o,3),p("x","y","z",1,-1,t,e,n,s,r,4),p("x","y","z",-1,-1,t,e,-n,s,r,5),this.setIndex(c),this.setAttribute("position",new ue(l,3)),this.setAttribute("normal",new ue(h,3)),this.setAttribute("uv",new ue(f,2));function p(_,m,g,w,E,y,b,S,M,R,v){const x=y/M,C=b/R,L=y/2,U=b/2,D=S/2,O=M+1,H=R+1;let $=0,z=0;const q=new G;for(let et=0;et<H;et++){const gt=et*C-U;for(let _t=0;_t<O;_t++){const Pt=_t*x-L;q[_]=Pt*w,q[m]=gt*E,q[g]=D,l.push(q.x,q.y,q.z),q[_]=0,q[m]=0,q[g]=S>0?1:-1,h.push(q.x,q.y,q.z),f.push(_t/M),f.push(1-et/R),$+=1}}for(let et=0;et<R;et++)for(let gt=0;gt<M;gt++){const _t=u+gt+O*et,Pt=u+gt+O*(et+1),Z=u+(gt+1)+O*(et+1),it=u+(gt+1)+O*et;c.push(_t,Pt,it),c.push(Pt,Z,it),z+=6}a.addGroup(d,z,v),d+=z,u+=$}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new we(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}}function Qi(i){const t={};for(const e in i){t[e]={};for(const n in i[e]){const s=i[e][n];s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)?s.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][n]=null):t[e][n]=s.clone():Array.isArray(s)?t[e][n]=s.slice():t[e][n]=s}}return t}function De(i){const t={};for(let e=0;e<i.length;e++){const n=Qi(i[e]);for(const s in n)t[s]=n[s]}return t}function Qd(i){const t=[];for(let e=0;e<i.length;e++)t.push(i[e].clone());return t}function Hh(i){const t=i.getRenderTarget();return t===null?i.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:Wt.workingColorSpace}const tf={clone:Qi,merge:De};var ef=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,nf=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Qn extends Si{static get type(){return"ShaderMaterial"}constructor(t){super(),this.isShaderMaterial=!0,this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=ef,this.fragmentShader=nf,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=Qi(t.uniforms),this.uniformsGroups=Qd(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this}toJSON(t){const e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(const s in this.uniforms){const o=this.uniforms[s].value;o&&o.isTexture?e.uniforms[s]={type:"t",value:o.toJSON(t).uuid}:o&&o.isColor?e.uniforms[s]={type:"c",value:o.getHex()}:o&&o.isVector2?e.uniforms[s]={type:"v2",value:o.toArray()}:o&&o.isVector3?e.uniforms[s]={type:"v3",value:o.toArray()}:o&&o.isVector4?e.uniforms[s]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?e.uniforms[s]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?e.uniforms[s]={type:"m4",value:o.toArray()}:e.uniforms[s]={value:o}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;const n={};for(const s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(e.extensions=n),e}}class Gh extends be{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new ee,this.projectionMatrix=new ee,this.projectionMatrixInverse=new ee,this.coordinateSystem=Pn}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(t,e){super.updateWorldMatrix(t,e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const Vn=new G,Yl=new jt,ql=new jt;class Oe extends Gh{constructor(t=50,e=1,n=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){const e=.5*this.getFilmHeight()/t;this.fov=Fo*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){const t=Math.tan(kr*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return Fo*2*Math.atan(Math.tan(kr*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,n){Vn.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(Vn.x,Vn.y).multiplyScalar(-t/Vn.z),Vn.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Vn.x,Vn.y).multiplyScalar(-t/Vn.z)}getViewSize(t,e){return this.getViewBounds(t,Yl,ql),e.subVectors(ql,Yl)}setViewOffset(t,e,n,s,r,o){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=this.near;let e=t*Math.tan(kr*.5*this.fov)/this.zoom,n=2*e,s=this.aspect*n,r=-.5*s;const o=this.view;if(this.view!==null&&this.view.enabled){const c=o.fullWidth,l=o.fullHeight;r+=o.offsetX*s/c,e-=o.offsetY*n/l,s*=o.width/c,n*=o.height/l}const a=this.filmOffset;a!==0&&(r+=t*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,e,e-n,t,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}}const Fi=-90,Ni=1;class sf extends be{constructor(t,e,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const s=new Oe(Fi,Ni,t,e);s.layers=this.layers,this.add(s);const r=new Oe(Fi,Ni,t,e);r.layers=this.layers,this.add(r);const o=new Oe(Fi,Ni,t,e);o.layers=this.layers,this.add(o);const a=new Oe(Fi,Ni,t,e);a.layers=this.layers,this.add(a);const c=new Oe(Fi,Ni,t,e);c.layers=this.layers,this.add(c);const l=new Oe(Fi,Ni,t,e);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){const t=this.coordinateSystem,e=this.children.concat(),[n,s,r,o,a,c]=e;for(const l of e)this.remove(l);if(t===Pn)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(t===zr)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(const l of e)this.add(l),l.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());const[r,o,a,c,l,h]=this.children,f=t.getRenderTarget(),u=t.getActiveCubeFace(),d=t.getActiveMipmapLevel(),p=t.xr.enabled;t.xr.enabled=!1;const _=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,t.setRenderTarget(n,0,s),t.render(e,r),t.setRenderTarget(n,1,s),t.render(e,o),t.setRenderTarget(n,2,s),t.render(e,a),t.setRenderTarget(n,3,s),t.render(e,c),t.setRenderTarget(n,4,s),t.render(e,l),n.texture.generateMipmaps=_,t.setRenderTarget(n,5,s),t.render(e,h),t.setRenderTarget(f,u,d),t.xr.enabled=p,n.texture.needsPMREMUpdate=!0}}class Vh extends Pe{constructor(t,e,n,s,r,o,a,c,l,h){t=t!==void 0?t:[],e=e!==void 0?e:Zi,super(t,e,n,s,r,o,a,c,l,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}}class rf extends _i{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;const n={width:t,height:t,depth:1},s=[n,n,n,n,n,n];this.texture=new Vh(s,e.mapping,e.wrapS,e.wrapT,e.magFilter,e.minFilter,e.format,e.type,e.anisotropy,e.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=e.generateMipmaps!==void 0?e.generateMipmaps:!1,this.texture.minFilter=e.minFilter!==void 0?e.minFilter:en}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},s=new we(5,5,5),r=new Qn({name:"CubemapFromEquirect",uniforms:Qi(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Ue,blending:Yn});r.uniforms.tEquirect.value=e;const o=new Qt(s,r),a=e.minFilter;return e.minFilter===di&&(e.minFilter=en),new sf(1,10,this).update(t,o),e.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(t,e,n,s){const r=t.getRenderTarget();for(let o=0;o<6;o++)t.setRenderTarget(this,o),t.clear(e,n,s);t.setRenderTarget(r)}}const ba=new G,af=new G,of=new Ut;class oi{constructor(t=new G(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,n,s){return this.normal.set(t,e,n),this.constant=s,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,n){const s=ba.subVectors(n,e).cross(af.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(s,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){const t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e){const n=t.delta(ba),s=this.normal.dot(n);if(s===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;const r=-(t.start.dot(this.normal)+this.constant)/s;return r<0||r>1?null:e.copy(t.start).addScaledVector(n,r)}intersectsLine(t){const e=this.distanceToPoint(t.start),n=this.distanceToPoint(t.end);return e<0&&n>0||n<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){const n=e||of.getNormalMatrix(t),s=this.coplanarPoint(ba).applyMatrix4(t),r=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(r),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}}const si=new Gs,fr=new G;class sl{constructor(t=new oi,e=new oi,n=new oi,s=new oi,r=new oi,o=new oi){this.planes=[t,e,n,s,r,o]}set(t,e,n,s,r,o){const a=this.planes;return a[0].copy(t),a[1].copy(e),a[2].copy(n),a[3].copy(s),a[4].copy(r),a[5].copy(o),this}copy(t){const e=this.planes;for(let n=0;n<6;n++)e[n].copy(t.planes[n]);return this}setFromProjectionMatrix(t,e=Pn){const n=this.planes,s=t.elements,r=s[0],o=s[1],a=s[2],c=s[3],l=s[4],h=s[5],f=s[6],u=s[7],d=s[8],p=s[9],_=s[10],m=s[11],g=s[12],w=s[13],E=s[14],y=s[15];if(n[0].setComponents(c-r,u-l,m-d,y-g).normalize(),n[1].setComponents(c+r,u+l,m+d,y+g).normalize(),n[2].setComponents(c+o,u+h,m+p,y+w).normalize(),n[3].setComponents(c-o,u-h,m-p,y-w).normalize(),n[4].setComponents(c-a,u-f,m-_,y-E).normalize(),e===Pn)n[5].setComponents(c+a,u+f,m+_,y+E).normalize();else if(e===zr)n[5].setComponents(a,f,_,E).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),si.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{const e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),si.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(si)}intersectsSprite(t){return si.center.set(0,0,0),si.radius=.7071067811865476,si.applyMatrix4(t.matrixWorld),this.intersectsSphere(si)}intersectsSphere(t){const e=this.planes,n=t.center,s=-t.radius;for(let r=0;r<6;r++)if(e[r].distanceToPoint(n)<s)return!1;return!0}intersectsBox(t){const e=this.planes;for(let n=0;n<6;n++){const s=e[n];if(fr.x=s.normal.x>0?t.max.x:t.min.x,fr.y=s.normal.y>0?t.max.y:t.min.y,fr.z=s.normal.z>0?t.max.z:t.min.z,s.distanceToPoint(fr)<0)return!1}return!0}containsPoint(t){const e=this.planes;for(let n=0;n<6;n++)if(e[n].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function Wh(){let i=null,t=!1,e=null,n=null;function s(r,o){e(r,o),n=i.requestAnimationFrame(s)}return{start:function(){t!==!0&&e!==null&&(n=i.requestAnimationFrame(s),t=!0)},stop:function(){i.cancelAnimationFrame(n),t=!1},setAnimationLoop:function(r){e=r},setContext:function(r){i=r}}}function lf(i){const t=new WeakMap;function e(a,c){const l=a.array,h=a.usage,f=l.byteLength,u=i.createBuffer();i.bindBuffer(c,u),i.bufferData(c,l,h),a.onUploadCallback();let d;if(l instanceof Float32Array)d=i.FLOAT;else if(l instanceof Uint16Array)a.isFloat16BufferAttribute?d=i.HALF_FLOAT:d=i.UNSIGNED_SHORT;else if(l instanceof Int16Array)d=i.SHORT;else if(l instanceof Uint32Array)d=i.UNSIGNED_INT;else if(l instanceof Int32Array)d=i.INT;else if(l instanceof Int8Array)d=i.BYTE;else if(l instanceof Uint8Array)d=i.UNSIGNED_BYTE;else if(l instanceof Uint8ClampedArray)d=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+l);return{buffer:u,type:d,bytesPerElement:l.BYTES_PER_ELEMENT,version:a.version,size:f}}function n(a,c,l){const h=c.array,f=c.updateRanges;if(i.bindBuffer(l,a),f.length===0)i.bufferSubData(l,0,h);else{f.sort((d,p)=>d.start-p.start);let u=0;for(let d=1;d<f.length;d++){const p=f[u],_=f[d];_.start<=p.start+p.count+1?p.count=Math.max(p.count,_.start+_.count-p.start):(++u,f[u]=_)}f.length=u+1;for(let d=0,p=f.length;d<p;d++){const _=f[d];i.bufferSubData(l,_.start*h.BYTES_PER_ELEMENT,h,_.start,_.count)}c.clearUpdateRanges()}c.onUploadCallback()}function s(a){return a.isInterleavedBufferAttribute&&(a=a.data),t.get(a)}function r(a){a.isInterleavedBufferAttribute&&(a=a.data);const c=t.get(a);c&&(i.deleteBuffer(c.buffer),t.delete(a))}function o(a,c){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){const h=t.get(a);(!h||h.version<a.version)&&t.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}const l=t.get(a);if(l===void 0)t.set(a,e(a,c));else if(l.version<a.version){if(l.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(l.buffer,a,c),l.version=a.version}}return{get:s,remove:r,update:o}}class Zn extends Ie{constructor(t=1,e=1,n=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:n,heightSegments:s};const r=t/2,o=e/2,a=Math.floor(n),c=Math.floor(s),l=a+1,h=c+1,f=t/a,u=e/c,d=[],p=[],_=[],m=[];for(let g=0;g<h;g++){const w=g*u-o;for(let E=0;E<l;E++){const y=E*f-r;p.push(y,-w,0),_.push(0,0,1),m.push(E/a),m.push(1-g/c)}}for(let g=0;g<c;g++)for(let w=0;w<a;w++){const E=w+l*g,y=w+l*(g+1),b=w+1+l*(g+1),S=w+1+l*g;d.push(E,y,S),d.push(y,b,S)}this.setIndex(d),this.setAttribute("position",new ue(p,3)),this.setAttribute("normal",new ue(_,3)),this.setAttribute("uv",new ue(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Zn(t.width,t.height,t.widthSegments,t.heightSegments)}}var cf=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,hf=`#ifdef USE_ALPHAHASH
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
#endif`,uf=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,df=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,ff=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,pf=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,mf=`#ifdef USE_AOMAP
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
#endif`,gf=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,_f=`#ifdef USE_BATCHING
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
#endif`,vf=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,xf=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,yf=`vec3 objectNormal = vec3( normal );
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
} // validated`,Sf=`#ifdef USE_IRIDESCENCE
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
#endif`,bf=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,Ef=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Tf=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Af=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Cf=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,Rf=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,If=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,Pf=`#if defined( USE_COLOR_ALPHA )
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
#endif`,Df=`#define PI 3.141592653589793
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
#endif`,kf=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Ff=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Nf=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Bf=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Of="gl_FragColor = linearToOutputTexel( gl_FragColor );",zf=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Hf=`#ifdef USE_ENVMAP
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
#endif`,Gf=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,Vf=`#ifdef USE_ENVMAP
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
#endif`,Wf=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Xf=`#ifdef USE_ENVMAP
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
#endif`,$f=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Yf=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,qf=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Zf=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Kf=`#ifdef USE_GRADIENTMAP
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
}`,jf=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Jf=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Qf=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,tp=`uniform bool receiveShadow;
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
#endif`,ep=`#ifdef USE_ENVMAP
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
material.diffuseColor = diffuseColor.rgb;`,ip=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,sp=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,rp=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,ap=`PhysicalMaterial material;
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
#endif`,op=`struct PhysicalMaterial {
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
}`,lp=`
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
#endif`,cp=`#if defined( RE_IndirectDiffuse )
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
#endif`,hp=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,up=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,dp=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,fp=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,pp=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,mp=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,gp=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,_p=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,vp=`#if defined( USE_POINTS_UV )
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
#endif`,xp=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,yp=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Mp=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Sp=`#if defined( USE_MORPHCOLORS )
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
#endif`,bp=`#ifdef USE_MORPHTARGETS
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
#endif`,Ep=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Tp=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,Ap=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,Cp=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Rp=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Ip=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,Pp=`#ifdef USE_NORMALMAP
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
#endif`,Dp=`#ifdef USE_CLEARCOAT
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
#endif`,kp=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Fp=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Np=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,Bp=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Op=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,zp=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Hp=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Gp=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Vp=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Wp=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Xp=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,$p=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,Yp=`float getShadowMask() {
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
}`,qp=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Zp=`#ifdef USE_SKINNING
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
#endif`,Kp=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,jp=`#ifdef USE_SKINNING
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
#endif`,Jp=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Qp=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,tm=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,em=`#ifndef saturate
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
#endif`,im=`#ifdef USE_TRANSMISSION
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
#endif`,sm=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,rm=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,am=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,om=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const lm=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,cm=`uniform sampler2D t2D;
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
}`,hm=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,um=`#ifdef ENVMAP_TYPE_CUBE
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
}`,dm=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,fm=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,pm=`#include <common>
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
}`,mm=`#if DEPTH_PACKING == 3200
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
}`,gm=`#define DISTANCE
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
}`,_m=`#define DISTANCE
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
}`,vm=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,xm=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,ym=`uniform float scale;
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
}`,Sm=`#include <common>
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
}`,bm=`#define LAMBERT
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
}`,Em=`#define LAMBERT
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
}`,Tm=`#define MATCAP
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
}`,Am=`#define MATCAP
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
}`,Cm=`#define NORMAL
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
}`,Rm=`#define NORMAL
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
}`,Im=`#define PHONG
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
}`,Pm=`#define PHONG
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
}`,Dm=`#define STANDARD
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
}`,km=`#define TOON
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
}`,Fm=`uniform float size;
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
}`,Nm=`uniform vec3 diffuse;
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
}`,Bm=`#include <common>
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
}`,Om=`uniform vec3 color;
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
}`,zm=`uniform float rotation;
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
}`,Hm=`uniform vec3 diffuse;
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
}`,Ft={alphahash_fragment:cf,alphahash_pars_fragment:hf,alphamap_fragment:uf,alphamap_pars_fragment:df,alphatest_fragment:ff,alphatest_pars_fragment:pf,aomap_fragment:mf,aomap_pars_fragment:gf,batching_pars_vertex:_f,batching_vertex:vf,begin_vertex:xf,beginnormal_vertex:yf,bsdfs:Mf,iridescence_fragment:Sf,bumpmap_pars_fragment:wf,clipping_planes_fragment:bf,clipping_planes_pars_fragment:Ef,clipping_planes_pars_vertex:Tf,clipping_planes_vertex:Af,color_fragment:Cf,color_pars_fragment:Rf,color_pars_vertex:If,color_vertex:Pf,common:Df,cube_uv_reflection_fragment:Lf,defaultnormal_vertex:Uf,displacementmap_pars_vertex:kf,displacementmap_vertex:Ff,emissivemap_fragment:Nf,emissivemap_pars_fragment:Bf,colorspace_fragment:Of,colorspace_pars_fragment:zf,envmap_fragment:Hf,envmap_common_pars_fragment:Gf,envmap_pars_fragment:Vf,envmap_pars_vertex:Wf,envmap_physical_pars_fragment:ep,envmap_vertex:Xf,fog_vertex:$f,fog_pars_vertex:Yf,fog_fragment:qf,fog_pars_fragment:Zf,gradientmap_pars_fragment:Kf,lightmap_pars_fragment:jf,lights_lambert_fragment:Jf,lights_lambert_pars_fragment:Qf,lights_pars_begin:tp,lights_toon_fragment:np,lights_toon_pars_fragment:ip,lights_phong_fragment:sp,lights_phong_pars_fragment:rp,lights_physical_fragment:ap,lights_physical_pars_fragment:op,lights_fragment_begin:lp,lights_fragment_maps:cp,lights_fragment_end:hp,logdepthbuf_fragment:up,logdepthbuf_pars_fragment:dp,logdepthbuf_pars_vertex:fp,logdepthbuf_vertex:pp,map_fragment:mp,map_pars_fragment:gp,map_particle_fragment:_p,map_particle_pars_fragment:vp,metalnessmap_fragment:xp,metalnessmap_pars_fragment:yp,morphinstance_vertex:Mp,morphcolor_vertex:Sp,morphnormal_vertex:wp,morphtarget_pars_vertex:bp,morphtarget_vertex:Ep,normal_fragment_begin:Tp,normal_fragment_maps:Ap,normal_pars_fragment:Cp,normal_pars_vertex:Rp,normal_vertex:Ip,normalmap_pars_fragment:Pp,clearcoat_normal_fragment_begin:Dp,clearcoat_normal_fragment_maps:Lp,clearcoat_pars_fragment:Up,iridescence_pars_fragment:kp,opaque_fragment:Fp,packing:Np,premultiplied_alpha_fragment:Bp,project_vertex:Op,dithering_fragment:zp,dithering_pars_fragment:Hp,roughnessmap_fragment:Gp,roughnessmap_pars_fragment:Vp,shadowmap_pars_fragment:Wp,shadowmap_pars_vertex:Xp,shadowmap_vertex:$p,shadowmask_pars_fragment:Yp,skinbase_vertex:qp,skinning_pars_vertex:Zp,skinning_vertex:Kp,skinnormal_vertex:jp,specularmap_fragment:Jp,specularmap_pars_fragment:Qp,tonemapping_fragment:tm,tonemapping_pars_fragment:em,transmission_fragment:nm,transmission_pars_fragment:im,uv_pars_fragment:sm,uv_pars_vertex:rm,uv_vertex:am,worldpos_vertex:om,background_vert:lm,background_frag:cm,backgroundCube_vert:hm,backgroundCube_frag:um,cube_vert:dm,cube_frag:fm,depth_vert:pm,depth_frag:mm,distanceRGBA_vert:gm,distanceRGBA_frag:_m,equirect_vert:vm,equirect_frag:xm,linedashed_vert:ym,linedashed_frag:Mm,meshbasic_vert:Sm,meshbasic_frag:wm,meshlambert_vert:bm,meshlambert_frag:Em,meshmatcap_vert:Tm,meshmatcap_frag:Am,meshnormal_vert:Cm,meshnormal_frag:Rm,meshphong_vert:Im,meshphong_frag:Pm,meshphysical_vert:Dm,meshphysical_frag:Lm,meshtoon_vert:Um,meshtoon_frag:km,points_vert:Fm,points_frag:Nm,shadow_vert:Bm,shadow_frag:Om,sprite_vert:zm,sprite_frag:Hm},at={common:{diffuse:{value:new Bt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Ut},alphaMap:{value:null},alphaMapTransform:{value:new Ut},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Ut}},envmap:{envMap:{value:null},envMapRotation:{value:new Ut},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Ut}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Ut}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Ut},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Ut},normalScale:{value:new jt(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Ut},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Ut}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Ut}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Ut}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Bt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Bt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Ut},alphaTest:{value:0},uvTransform:{value:new Ut}},sprite:{diffuse:{value:new Bt(16777215)},opacity:{value:1},center:{value:new jt(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Ut},alphaMap:{value:null},alphaMapTransform:{value:new Ut},alphaTest:{value:0}}},mn={basic:{uniforms:De([at.common,at.specularmap,at.envmap,at.aomap,at.lightmap,at.fog]),vertexShader:Ft.meshbasic_vert,fragmentShader:Ft.meshbasic_frag},lambert:{uniforms:De([at.common,at.specularmap,at.envmap,at.aomap,at.lightmap,at.emissivemap,at.bumpmap,at.normalmap,at.displacementmap,at.fog,at.lights,{emissive:{value:new Bt(0)}}]),vertexShader:Ft.meshlambert_vert,fragmentShader:Ft.meshlambert_frag},phong:{uniforms:De([at.common,at.specularmap,at.envmap,at.aomap,at.lightmap,at.emissivemap,at.bumpmap,at.normalmap,at.displacementmap,at.fog,at.lights,{emissive:{value:new Bt(0)},specular:{value:new Bt(1118481)},shininess:{value:30}}]),vertexShader:Ft.meshphong_vert,fragmentShader:Ft.meshphong_frag},standard:{uniforms:De([at.common,at.envmap,at.aomap,at.lightmap,at.emissivemap,at.bumpmap,at.normalmap,at.displacementmap,at.roughnessmap,at.metalnessmap,at.fog,at.lights,{emissive:{value:new Bt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Ft.meshphysical_vert,fragmentShader:Ft.meshphysical_frag},toon:{uniforms:De([at.common,at.aomap,at.lightmap,at.emissivemap,at.bumpmap,at.normalmap,at.displacementmap,at.gradientmap,at.fog,at.lights,{emissive:{value:new Bt(0)}}]),vertexShader:Ft.meshtoon_vert,fragmentShader:Ft.meshtoon_frag},matcap:{uniforms:De([at.common,at.bumpmap,at.normalmap,at.displacementmap,at.fog,{matcap:{value:null}}]),vertexShader:Ft.meshmatcap_vert,fragmentShader:Ft.meshmatcap_frag},points:{uniforms:De([at.points,at.fog]),vertexShader:Ft.points_vert,fragmentShader:Ft.points_frag},dashed:{uniforms:De([at.common,at.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Ft.linedashed_vert,fragmentShader:Ft.linedashed_frag},depth:{uniforms:De([at.common,at.displacementmap]),vertexShader:Ft.depth_vert,fragmentShader:Ft.depth_frag},normal:{uniforms:De([at.common,at.bumpmap,at.normalmap,at.displacementmap,{opacity:{value:1}}]),vertexShader:Ft.meshnormal_vert,fragmentShader:Ft.meshnormal_frag},sprite:{uniforms:De([at.sprite,at.fog]),vertexShader:Ft.sprite_vert,fragmentShader:Ft.sprite_frag},background:{uniforms:{uvTransform:{value:new Ut},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Ft.background_vert,fragmentShader:Ft.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Ut}},vertexShader:Ft.backgroundCube_vert,fragmentShader:Ft.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Ft.cube_vert,fragmentShader:Ft.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Ft.equirect_vert,fragmentShader:Ft.equirect_frag},distanceRGBA:{uniforms:De([at.common,at.displacementmap,{referencePosition:{value:new G},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Ft.distanceRGBA_vert,fragmentShader:Ft.distanceRGBA_frag},shadow:{uniforms:De([at.lights,at.fog,{color:{value:new Bt(0)},opacity:{value:1}}]),vertexShader:Ft.shadow_vert,fragmentShader:Ft.shadow_frag}};mn.physical={uniforms:De([mn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Ut},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Ut},clearcoatNormalScale:{value:new jt(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Ut},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Ut},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Ut},sheen:{value:0},sheenColor:{value:new Bt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Ut},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Ut},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Ut},transmissionSamplerSize:{value:new jt},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Ut},attenuationDistance:{value:0},attenuationColor:{value:new Bt(0)},specularColor:{value:new Bt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Ut},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Ut},anisotropyVector:{value:new jt},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Ut}}]),vertexShader:Ft.meshphysical_vert,fragmentShader:Ft.meshphysical_frag};const pr={r:0,b:0,g:0},ri=new nn,Gm=new ee;function Vm(i,t,e,n,s,r,o){const a=new Bt(0);let c=r===!0?0:1,l,h,f=null,u=0,d=null;function p(w){let E=w.isScene===!0?w.background:null;return E&&E.isTexture&&(E=(w.backgroundBlurriness>0?e:t).get(E)),E}function _(w){let E=!1;const y=p(w);y===null?g(a,c):y&&y.isColor&&(g(y,1),E=!0);const b=i.xr.getEnvironmentBlendMode();b==="additive"?n.buffers.color.setClear(0,0,0,1,o):b==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,o),(i.autoClear||E)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function m(w,E){const y=p(E);y&&(y.isCubeTexture||y.mapping===Zr)?(h===void 0&&(h=new Qt(new we(1,1,1),new Qn({name:"BackgroundCubeMaterial",uniforms:Qi(mn.backgroundCube.uniforms),vertexShader:mn.backgroundCube.vertexShader,fragmentShader:mn.backgroundCube.fragmentShader,side:Ue,depthTest:!1,depthWrite:!1,fog:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(b,S,M){this.matrixWorld.copyPosition(M.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),s.update(h)),ri.copy(E.backgroundRotation),ri.x*=-1,ri.y*=-1,ri.z*=-1,y.isCubeTexture&&y.isRenderTargetTexture===!1&&(ri.y*=-1,ri.z*=-1),h.material.uniforms.envMap.value=y,h.material.uniforms.flipEnvMap.value=y.isCubeTexture&&y.isRenderTargetTexture===!1?-1:1,h.material.uniforms.backgroundBlurriness.value=E.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=E.backgroundIntensity,h.material.uniforms.backgroundRotation.value.setFromMatrix4(Gm.makeRotationFromEuler(ri)),h.material.toneMapped=Wt.getTransfer(y.colorSpace)!==te,(f!==y||u!==y.version||d!==i.toneMapping)&&(h.material.needsUpdate=!0,f=y,u=y.version,d=i.toneMapping),h.layers.enableAll(),w.unshift(h,h.geometry,h.material,0,0,null)):y&&y.isTexture&&(l===void 0&&(l=new Qt(new Zn(2,2),new Qn({name:"BackgroundMaterial",uniforms:Qi(mn.background.uniforms),vertexShader:mn.background.vertexShader,fragmentShader:mn.background.fragmentShader,side:Jn,depthTest:!1,depthWrite:!1,fog:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),s.update(l)),l.material.uniforms.t2D.value=y,l.material.uniforms.backgroundIntensity.value=E.backgroundIntensity,l.material.toneMapped=Wt.getTransfer(y.colorSpace)!==te,y.matrixAutoUpdate===!0&&y.updateMatrix(),l.material.uniforms.uvTransform.value.copy(y.matrix),(f!==y||u!==y.version||d!==i.toneMapping)&&(l.material.needsUpdate=!0,f=y,u=y.version,d=i.toneMapping),l.layers.enableAll(),w.unshift(l,l.geometry,l.material,0,0,null))}function g(w,E){w.getRGB(pr,Hh(i)),n.buffers.color.setClear(pr.r,pr.g,pr.b,E,o)}return{getClearColor:function(){return a},setClearColor:function(w,E=1){a.set(w),c=E,g(a,c)},getClearAlpha:function(){return c},setClearAlpha:function(w){c=w,g(a,c)},render:_,addToRenderList:m}}function Wm(i,t){const e=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},s=u(null);let r=s,o=!1;function a(x,C,L,U,D){let O=!1;const H=f(U,L,C);r!==H&&(r=H,l(r.object)),O=d(x,U,L,D),O&&p(x,U,L,D),D!==null&&t.update(D,i.ELEMENT_ARRAY_BUFFER),(O||o)&&(o=!1,y(x,C,L,U),D!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,t.get(D).buffer))}function c(){return i.createVertexArray()}function l(x){return i.bindVertexArray(x)}function h(x){return i.deleteVertexArray(x)}function f(x,C,L){const U=L.wireframe===!0;let D=n[x.id];D===void 0&&(D={},n[x.id]=D);let O=D[C.id];O===void 0&&(O={},D[C.id]=O);let H=O[U];return H===void 0&&(H=u(c()),O[U]=H),H}function u(x){const C=[],L=[],U=[];for(let D=0;D<e;D++)C[D]=0,L[D]=0,U[D]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:C,enabledAttributes:L,attributeDivisors:U,object:x,attributes:{},index:null}}function d(x,C,L,U){const D=r.attributes,O=C.attributes;let H=0;const $=L.getAttributes();for(const z in $)if($[z].location>=0){const et=D[z];let gt=O[z];if(gt===void 0&&(z==="instanceMatrix"&&x.instanceMatrix&&(gt=x.instanceMatrix),z==="instanceColor"&&x.instanceColor&&(gt=x.instanceColor)),et===void 0||et.attribute!==gt||gt&&et.data!==gt.data)return!0;H++}return r.attributesNum!==H||r.index!==U}function p(x,C,L,U){const D={},O=C.attributes;let H=0;const $=L.getAttributes();for(const z in $)if($[z].location>=0){let et=O[z];et===void 0&&(z==="instanceMatrix"&&x.instanceMatrix&&(et=x.instanceMatrix),z==="instanceColor"&&x.instanceColor&&(et=x.instanceColor));const gt={};gt.attribute=et,et&&et.data&&(gt.data=et.data),D[z]=gt,H++}r.attributes=D,r.attributesNum=H,r.index=U}function _(){const x=r.newAttributes;for(let C=0,L=x.length;C<L;C++)x[C]=0}function m(x){g(x,0)}function g(x,C){const L=r.newAttributes,U=r.enabledAttributes,D=r.attributeDivisors;L[x]=1,U[x]===0&&(i.enableVertexAttribArray(x),U[x]=1),D[x]!==C&&(i.vertexAttribDivisor(x,C),D[x]=C)}function w(){const x=r.newAttributes,C=r.enabledAttributes;for(let L=0,U=C.length;L<U;L++)C[L]!==x[L]&&(i.disableVertexAttribArray(L),C[L]=0)}function E(x,C,L,U,D,O,H){H===!0?i.vertexAttribIPointer(x,C,L,D,O):i.vertexAttribPointer(x,C,L,U,D,O)}function y(x,C,L,U){_();const D=U.attributes,O=L.getAttributes(),H=C.defaultAttributeValues;for(const $ in O){const z=O[$];if(z.location>=0){let q=D[$];if(q===void 0&&($==="instanceMatrix"&&x.instanceMatrix&&(q=x.instanceMatrix),$==="instanceColor"&&x.instanceColor&&(q=x.instanceColor)),q!==void 0){const et=q.normalized,gt=q.itemSize,_t=t.get(q);if(_t===void 0)continue;const Pt=_t.buffer,Z=_t.type,it=_t.bytesPerElement,vt=Z===i.INT||Z===i.UNSIGNED_INT||q.gpuType===jo;if(q.isInterleavedBufferAttribute){const ot=q.data,Et=ot.stride,Rt=q.offset;if(ot.isInstancedInterleavedBuffer){for(let Nt=0;Nt<z.locationSize;Nt++)g(z.location+Nt,ot.meshPerAttribute);x.isInstancedMesh!==!0&&U._maxInstanceCount===void 0&&(U._maxInstanceCount=ot.meshPerAttribute*ot.count)}else for(let Nt=0;Nt<z.locationSize;Nt++)m(z.location+Nt);i.bindBuffer(i.ARRAY_BUFFER,Pt);for(let Nt=0;Nt<z.locationSize;Nt++)E(z.location+Nt,gt/z.locationSize,Z,et,Et*it,(Rt+gt/z.locationSize*Nt)*it,vt)}else{if(q.isInstancedBufferAttribute){for(let ot=0;ot<z.locationSize;ot++)g(z.location+ot,q.meshPerAttribute);x.isInstancedMesh!==!0&&U._maxInstanceCount===void 0&&(U._maxInstanceCount=q.meshPerAttribute*q.count)}else for(let ot=0;ot<z.locationSize;ot++)m(z.location+ot);i.bindBuffer(i.ARRAY_BUFFER,Pt);for(let ot=0;ot<z.locationSize;ot++)E(z.location+ot,gt/z.locationSize,Z,et,gt*it,gt/z.locationSize*ot*it,vt)}}else if(H!==void 0){const et=H[$];if(et!==void 0)switch(et.length){case 2:i.vertexAttrib2fv(z.location,et);break;case 3:i.vertexAttrib3fv(z.location,et);break;case 4:i.vertexAttrib4fv(z.location,et);break;default:i.vertexAttrib1fv(z.location,et)}}}}w()}function b(){R();for(const x in n){const C=n[x];for(const L in C){const U=C[L];for(const D in U)h(U[D].object),delete U[D];delete C[L]}delete n[x]}}function S(x){if(n[x.id]===void 0)return;const C=n[x.id];for(const L in C){const U=C[L];for(const D in U)h(U[D].object),delete U[D];delete C[L]}delete n[x.id]}function M(x){for(const C in n){const L=n[C];if(L[x.id]===void 0)continue;const U=L[x.id];for(const D in U)h(U[D].object),delete U[D];delete L[x.id]}}function R(){v(),o=!0,r!==s&&(r=s,l(r.object))}function v(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:a,reset:R,resetDefaultState:v,dispose:b,releaseStatesOfGeometry:S,releaseStatesOfProgram:M,initAttributes:_,enableAttribute:m,disableUnusedAttributes:w}}function Xm(i,t,e){let n;function s(l){n=l}function r(l,h){i.drawArrays(n,l,h),e.update(h,n,1)}function o(l,h,f){f!==0&&(i.drawArraysInstanced(n,l,h,f),e.update(h,n,f))}function a(l,h,f){if(f===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,l,0,h,0,f);let d=0;for(let p=0;p<f;p++)d+=h[p];e.update(d,n,1)}function c(l,h,f,u){if(f===0)return;const d=t.get("WEBGL_multi_draw");if(d===null)for(let p=0;p<l.length;p++)o(l[p],h[p],u[p]);else{d.multiDrawArraysInstancedWEBGL(n,l,0,h,0,u,0,f);let p=0;for(let _=0;_<f;_++)p+=h[_]*u[_];e.update(p,n,1)}}this.setMode=s,this.render=r,this.renderInstances=o,this.renderMultiDraw=a,this.renderMultiDrawInstances=c}function $m(i,t,e,n){let s;function r(){if(s!==void 0)return s;if(t.has("EXT_texture_filter_anisotropic")===!0){const M=t.get("EXT_texture_filter_anisotropic");s=i.getParameter(M.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function o(M){return!(M!==hn&&n.convert(M)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(M){const R=M===Os&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(M!==kn&&n.convert(M)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE)&&M!==In&&!R)}function c(M){if(M==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";M="mediump"}return M==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let l=e.precision!==void 0?e.precision:"highp";const h=c(l);h!==l&&(console.warn("THREE.WebGLRenderer:",l,"not supported, using",h,"instead."),l=h);const f=e.logarithmicDepthBuffer===!0,u=e.reverseDepthBuffer===!0&&t.has("EXT_clip_control"),d=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),p=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),_=i.getParameter(i.MAX_TEXTURE_SIZE),m=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),g=i.getParameter(i.MAX_VERTEX_ATTRIBS),w=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),E=i.getParameter(i.MAX_VARYING_VECTORS),y=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),b=p>0,S=i.getParameter(i.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:c,textureFormatReadable:o,textureTypeReadable:a,precision:l,logarithmicDepthBuffer:f,reverseDepthBuffer:u,maxTextures:d,maxVertexTextures:p,maxTextureSize:_,maxCubemapSize:m,maxAttributes:g,maxVertexUniforms:w,maxVaryings:E,maxFragmentUniforms:y,vertexTextures:b,maxSamples:S}}function Ym(i){const t=this;let e=null,n=0,s=!1,r=!1;const o=new oi,a=new Ut,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(f,u){const d=f.length!==0||u||n!==0||s;return s=u,n=f.length,d},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(f,u){e=h(f,u,0)},this.setState=function(f,u,d){const p=f.clippingPlanes,_=f.clipIntersection,m=f.clipShadows,g=i.get(f);if(!s||p===null||p.length===0||r&&!m)r?h(null):l();else{const w=r?0:n,E=w*4;let y=g.clippingState||null;c.value=y,y=h(p,u,E,d);for(let b=0;b!==E;++b)y[b]=e[b];g.clippingState=y,this.numIntersection=_?this.numPlanes:0,this.numPlanes+=w}};function l(){c.value!==e&&(c.value=e,c.needsUpdate=n>0),t.numPlanes=n,t.numIntersection=0}function h(f,u,d,p){const _=f!==null?f.length:0;let m=null;if(_!==0){if(m=c.value,p!==!0||m===null){const g=d+_*4,w=u.matrixWorldInverse;a.getNormalMatrix(w),(m===null||m.length<g)&&(m=new Float32Array(g));for(let E=0,y=d;E!==_;++E,y+=4)o.copy(f[E]).applyMatrix4(w,a),o.normal.toArray(m,y),m[y+3]=o.constant}c.value=m,c.needsUpdate=!0}return t.numPlanes=_,t.numIntersection=0,m}}function qm(i){let t=new WeakMap;function e(o,a){return a===ao?o.mapping=Zi:a===oo&&(o.mapping=Ki),o}function n(o){if(o&&o.isTexture){const a=o.mapping;if(a===ao||a===oo)if(t.has(o)){const c=t.get(o).texture;return e(c,o.mapping)}else{const c=o.image;if(c&&c.height>0){const l=new rf(c.height);return l.fromEquirectangularTexture(i,o),t.set(o,l),o.addEventListener("dispose",s),e(l.texture,o.mapping)}else return null}}return o}function s(o){const a=o.target;a.removeEventListener("dispose",s);const c=t.get(a);c!==void 0&&(t.delete(a),c.dispose())}function r(){t=new WeakMap}return{get:n,dispose:r}}class Xh extends Gh{constructor(t=-1,e=1,n=1,s=-1,r=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=n,this.bottom=s,this.near=r,this.far=o,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,n,s,r,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2;let r=n-t,o=n+t,a=s+e,c=s-e;if(this.view!==null&&this.view.enabled){const l=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=l*this.view.offsetX,o=r+l*this.view.width,a-=h*this.view.offsetY,c=a-h*this.view.height}this.projectionMatrix.makeOrthographic(r,o,a,c,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}}const Gi=4,Zl=[.125,.215,.35,.446,.526,.582],hi=20,Ea=new Xh,Kl=new Bt;let Ta=null,Aa=0,Ca=0,Ra=!1;const li=(1+Math.sqrt(5))/2,Bi=1/li,jl=[new G(-li,Bi,0),new G(li,Bi,0),new G(-Bi,0,li),new G(Bi,0,li),new G(0,li,-Bi),new G(0,li,Bi),new G(-1,1,-1),new G(1,1,-1),new G(-1,1,1),new G(1,1,1)];class Jl{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(t,e=0,n=.1,s=100){Ta=this._renderer.getRenderTarget(),Aa=this._renderer.getActiveCubeFace(),Ca=this._renderer.getActiveMipmapLevel(),Ra=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);const r=this._allocateTargets();return r.depthBuffer=!0,this._sceneToCubeUV(t,n,s,r),e>0&&this._blur(r,0,0,e),this._applyPMREM(r),this._cleanup(r),r}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=ec(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=tc(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodPlanes.length;t++)this._lodPlanes[t].dispose()}_cleanup(t){this._renderer.setRenderTarget(Ta,Aa,Ca),this._renderer.xr.enabled=Ra,t.scissorTest=!1,mr(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===Zi||t.mapping===Ki?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),Ta=this._renderer.getRenderTarget(),Aa=this._renderer.getActiveCubeFace(),Ca=this._renderer.getActiveMipmapLevel(),Ra=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=e||this._allocateTargets();return this._textureToCubeUV(t,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,n={magFilter:en,minFilter:en,generateMipmaps:!1,type:Os,format:hn,colorSpace:is,depthBuffer:!1},s=Ql(t,e,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Ql(t,e,n);const{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=Zm(r)),this._blurMaterial=Km(r,t,e)}return s}_compileMaterial(t){const e=new Qt(this._lodPlanes[0],t);this._renderer.compile(e,Ea)}_sceneToCubeUV(t,e,n,s){const a=new Oe(90,1,e,n),c=[1,-1,1,1,1,1],l=[1,1,1,-1,-1,-1],h=this._renderer,f=h.autoClear,u=h.toneMapping;h.getClearColor(Kl),h.toneMapping=qn,h.autoClear=!1;const d=new Ve({name:"PMREM.Background",side:Ue,depthWrite:!1,depthTest:!1}),p=new Qt(new we,d);let _=!1;const m=t.background;m?m.isColor&&(d.color.copy(m),t.background=null,_=!0):(d.color.copy(Kl),_=!0);for(let g=0;g<6;g++){const w=g%3;w===0?(a.up.set(0,c[g],0),a.lookAt(l[g],0,0)):w===1?(a.up.set(0,0,c[g]),a.lookAt(0,l[g],0)):(a.up.set(0,c[g],0),a.lookAt(0,0,l[g]));const E=this._cubeSize;mr(s,w*E,g>2?E:0,E,E),h.setRenderTarget(s),_&&h.render(p,a),h.render(t,a)}p.geometry.dispose(),p.material.dispose(),h.toneMapping=u,h.autoClear=f,t.background=m}_textureToCubeUV(t,e){const n=this._renderer,s=t.mapping===Zi||t.mapping===Ki;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=ec()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=tc());const r=s?this._cubemapMaterial:this._equirectMaterial,o=new Qt(this._lodPlanes[0],r),a=r.uniforms;a.envMap.value=t;const c=this._cubeSize;mr(e,0,0,3*c,2*c),n.setRenderTarget(e),n.render(o,Ea)}_applyPMREM(t){const e=this._renderer,n=e.autoClear;e.autoClear=!1;const s=this._lodPlanes.length;for(let r=1;r<s;r++){const o=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),a=jl[(s-r-1)%jl.length];this._blur(t,r-1,r,o,a)}e.autoClear=n}_blur(t,e,n,s,r){const o=this._pingPongRenderTarget;this._halfBlur(t,o,e,n,s,"latitudinal",r),this._halfBlur(o,t,n,n,s,"longitudinal",r)}_halfBlur(t,e,n,s,r,o,a){const c=this._renderer,l=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const h=3,f=new Qt(this._lodPlanes[s],l),u=l.uniforms,d=this._sizeLods[n]-1,p=isFinite(r)?Math.PI/(2*d):2*Math.PI/(2*hi-1),_=r/p,m=isFinite(r)?1+Math.floor(h*_):hi;m>hi&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${hi}`);const g=[];let w=0;for(let M=0;M<hi;++M){const R=M/_,v=Math.exp(-R*R/2);g.push(v),M===0?w+=v:M<m&&(w+=2*v)}for(let M=0;M<g.length;M++)g[M]=g[M]/w;u.envMap.value=t.texture,u.samples.value=m,u.weights.value=g,u.latitudinal.value=o==="latitudinal",a&&(u.poleAxis.value=a);const{_lodMax:E}=this;u.dTheta.value=p,u.mipInt.value=E-n;const y=this._sizeLods[s],b=3*y*(s>E-Gi?s-E+Gi:0),S=4*(this._cubeSize-y);mr(e,b,S,3*y,2*y),c.setRenderTarget(e),c.render(f,Ea)}}function Zm(i){const t=[],e=[],n=[];let s=i;const r=i-Gi+1+Zl.length;for(let o=0;o<r;o++){const a=Math.pow(2,s);e.push(a);let c=1/a;o>i-Gi?c=Zl[o-i+Gi-1]:o===0&&(c=0),n.push(c);const l=1/(a-2),h=-l,f=1+l,u=[h,h,f,h,f,f,h,h,f,f,h,f],d=6,p=6,_=3,m=2,g=1,w=new Float32Array(_*p*d),E=new Float32Array(m*p*d),y=new Float32Array(g*p*d);for(let S=0;S<d;S++){const M=S%3*2/3-1,R=S>2?0:-1,v=[M,R,0,M+2/3,R,0,M+2/3,R+1,0,M,R,0,M+2/3,R+1,0,M,R+1,0];w.set(v,_*p*S),E.set(u,m*p*S);const x=[S,S,S,S,S,S];y.set(x,g*p*S)}const b=new Ie;b.setAttribute("position",new un(w,_)),b.setAttribute("uv",new un(E,m)),b.setAttribute("faceIndex",new un(y,g)),t.push(b),s>Gi&&s--}return{lodPlanes:t,sizeLods:e,sigmas:n}}function Ql(i,t,e){const n=new _i(i,t,e);return n.texture.mapping=Zr,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function mr(i,t,e,n,s){i.viewport.set(t,e,n,s),i.scissor.set(t,e,n,s)}function Km(i,t,e){const n=new Float32Array(hi),s=new G(0,1,0);return new Qn({name:"SphericalGaussianBlur",defines:{n:hi,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:rl(),fragmentShader:`

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
		`,blending:Yn,depthTest:!1,depthWrite:!1})}function tc(){return new Qn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:rl(),fragmentShader:`

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
		`,blending:Yn,depthTest:!1,depthWrite:!1})}function ec(){return new Qn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:rl(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Yn,depthTest:!1,depthWrite:!1})}function rl(){return`

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
	`}function jm(i){let t=new WeakMap,e=null;function n(a){if(a&&a.isTexture){const c=a.mapping,l=c===ao||c===oo,h=c===Zi||c===Ki;if(l||h){let f=t.get(a);const u=f!==void 0?f.texture.pmremVersion:0;if(a.isRenderTargetTexture&&a.pmremVersion!==u)return e===null&&(e=new Jl(i)),f=l?e.fromEquirectangular(a,f):e.fromCubemap(a,f),f.texture.pmremVersion=a.pmremVersion,t.set(a,f),f.texture;if(f!==void 0)return f.texture;{const d=a.image;return l&&d&&d.height>0||h&&d&&s(d)?(e===null&&(e=new Jl(i)),f=l?e.fromEquirectangular(a):e.fromCubemap(a),f.texture.pmremVersion=a.pmremVersion,t.set(a,f),a.addEventListener("dispose",r),f.texture):null}}}return a}function s(a){let c=0;const l=6;for(let h=0;h<l;h++)a[h]!==void 0&&c++;return c===l}function r(a){const c=a.target;c.removeEventListener("dispose",r);const l=t.get(c);l!==void 0&&(t.delete(c),l.dispose())}function o(){t=new WeakMap,e!==null&&(e.dispose(),e=null)}return{get:n,dispose:o}}function Jm(i){const t={};function e(n){if(t[n]!==void 0)return t[n];let s;switch(n){case"WEBGL_depth_texture":s=i.getExtension("WEBGL_depth_texture")||i.getExtension("MOZ_WEBGL_depth_texture")||i.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":s=i.getExtension("EXT_texture_filter_anisotropic")||i.getExtension("MOZ_EXT_texture_filter_anisotropic")||i.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":s=i.getExtension("WEBGL_compressed_texture_s3tc")||i.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":s=i.getExtension("WEBGL_compressed_texture_pvrtc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:s=i.getExtension(n)}return t[n]=s,s}return{has:function(n){return e(n)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(n){const s=e(n);return s===null&&ys("THREE.WebGLRenderer: "+n+" extension not supported."),s}}}function Qm(i,t,e,n){const s={},r=new WeakMap;function o(f){const u=f.target;u.index!==null&&t.remove(u.index);for(const p in u.attributes)t.remove(u.attributes[p]);for(const p in u.morphAttributes){const _=u.morphAttributes[p];for(let m=0,g=_.length;m<g;m++)t.remove(_[m])}u.removeEventListener("dispose",o),delete s[u.id];const d=r.get(u);d&&(t.remove(d),r.delete(u)),n.releaseStatesOfGeometry(u),u.isInstancedBufferGeometry===!0&&delete u._maxInstanceCount,e.memory.geometries--}function a(f,u){return s[u.id]===!0||(u.addEventListener("dispose",o),s[u.id]=!0,e.memory.geometries++),u}function c(f){const u=f.attributes;for(const p in u)t.update(u[p],i.ARRAY_BUFFER);const d=f.morphAttributes;for(const p in d){const _=d[p];for(let m=0,g=_.length;m<g;m++)t.update(_[m],i.ARRAY_BUFFER)}}function l(f){const u=[],d=f.index,p=f.attributes.position;let _=0;if(d!==null){const w=d.array;_=d.version;for(let E=0,y=w.length;E<y;E+=3){const b=w[E+0],S=w[E+1],M=w[E+2];u.push(b,S,S,M,M,b)}}else if(p!==void 0){const w=p.array;_=p.version;for(let E=0,y=w.length/3-1;E<y;E+=3){const b=E+0,S=E+1,M=E+2;u.push(b,S,S,M,M,b)}}else return;const m=new(Uh(u)?zh:Oh)(u,1);m.version=_;const g=r.get(f);g&&t.remove(g),r.set(f,m)}function h(f){const u=r.get(f);if(u){const d=f.index;d!==null&&u.version<d.version&&l(f)}else l(f);return r.get(f)}return{get:a,update:c,getWireframeAttribute:h}}function tg(i,t,e){let n;function s(u){n=u}let r,o;function a(u){r=u.type,o=u.bytesPerElement}function c(u,d){i.drawElements(n,d,r,u*o),e.update(d,n,1)}function l(u,d,p){p!==0&&(i.drawElementsInstanced(n,d,r,u*o,p),e.update(d,n,p))}function h(u,d,p){if(p===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,d,0,r,u,0,p);let m=0;for(let g=0;g<p;g++)m+=d[g];e.update(m,n,1)}function f(u,d,p,_){if(p===0)return;const m=t.get("WEBGL_multi_draw");if(m===null)for(let g=0;g<u.length;g++)l(u[g]/o,d[g],_[g]);else{m.multiDrawElementsInstancedWEBGL(n,d,0,r,u,0,_,0,p);let g=0;for(let w=0;w<p;w++)g+=d[w]*_[w];e.update(g,n,1)}}this.setMode=s,this.setIndex=a,this.render=c,this.renderInstances=l,this.renderMultiDraw=h,this.renderMultiDrawInstances=f}function eg(i){const t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,o,a){switch(e.calls++,o){case i.TRIANGLES:e.triangles+=a*(r/3);break;case i.LINES:e.lines+=a*(r/2);break;case i.LINE_STRIP:e.lines+=a*(r-1);break;case i.LINE_LOOP:e.lines+=a*r;break;case i.POINTS:e.points+=a*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function s(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:s,update:n}}function ng(i,t,e){const n=new WeakMap,s=new me;function r(o,a,c){const l=o.morphTargetInfluences,h=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,f=h!==void 0?h.length:0;let u=n.get(a);if(u===void 0||u.count!==f){let x=function(){R.dispose(),n.delete(a),a.removeEventListener("dispose",x)};var d=x;u!==void 0&&u.texture.dispose();const p=a.morphAttributes.position!==void 0,_=a.morphAttributes.normal!==void 0,m=a.morphAttributes.color!==void 0,g=a.morphAttributes.position||[],w=a.morphAttributes.normal||[],E=a.morphAttributes.color||[];let y=0;p===!0&&(y=1),_===!0&&(y=2),m===!0&&(y=3);let b=a.attributes.position.count*y,S=1;b>t.maxTextureSize&&(S=Math.ceil(b/t.maxTextureSize),b=t.maxTextureSize);const M=new Float32Array(b*S*4*f),R=new Fh(M,b,S,f);R.type=In,R.needsUpdate=!0;const v=y*4;for(let C=0;C<f;C++){const L=g[C],U=w[C],D=E[C],O=b*S*4*C;for(let H=0;H<L.count;H++){const $=H*v;p===!0&&(s.fromBufferAttribute(L,H),M[O+$+0]=s.x,M[O+$+1]=s.y,M[O+$+2]=s.z,M[O+$+3]=0),_===!0&&(s.fromBufferAttribute(U,H),M[O+$+4]=s.x,M[O+$+5]=s.y,M[O+$+6]=s.z,M[O+$+7]=0),m===!0&&(s.fromBufferAttribute(D,H),M[O+$+8]=s.x,M[O+$+9]=s.y,M[O+$+10]=s.z,M[O+$+11]=D.itemSize===4?s.w:1)}}u={count:f,texture:R,size:new jt(b,S)},n.set(a,u),a.addEventListener("dispose",x)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)c.getUniforms().setValue(i,"morphTexture",o.morphTexture,e);else{let p=0;for(let m=0;m<l.length;m++)p+=l[m];const _=a.morphTargetsRelative?1:1-p;c.getUniforms().setValue(i,"morphTargetBaseInfluence",_),c.getUniforms().setValue(i,"morphTargetInfluences",l)}c.getUniforms().setValue(i,"morphTargetsTexture",u.texture,e),c.getUniforms().setValue(i,"morphTargetsTextureSize",u.size)}return{update:r}}function ig(i,t,e,n){let s=new WeakMap;function r(c){const l=n.render.frame,h=c.geometry,f=t.get(c,h);if(s.get(f)!==l&&(t.update(f),s.set(f,l)),c.isInstancedMesh&&(c.hasEventListener("dispose",a)===!1&&c.addEventListener("dispose",a),s.get(c)!==l&&(e.update(c.instanceMatrix,i.ARRAY_BUFFER),c.instanceColor!==null&&e.update(c.instanceColor,i.ARRAY_BUFFER),s.set(c,l))),c.isSkinnedMesh){const u=c.skeleton;s.get(u)!==l&&(u.update(),s.set(u,l))}return f}function o(){s=new WeakMap}function a(c){const l=c.target;l.removeEventListener("dispose",a),e.remove(l.instanceMatrix),l.instanceColor!==null&&e.remove(l.instanceColor)}return{update:r,dispose:o}}class $h extends Pe{constructor(t,e,n,s,r,o,a,c,l,h=Wi){if(h!==Wi&&h!==Ji)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&h===Wi&&(n=gi),n===void 0&&h===Ji&&(n=ji),super(null,s,r,o,a,c,h,n,l),this.isDepthTexture=!0,this.image={width:t,height:e},this.magFilter=a!==void 0?a:qt,this.minFilter=c!==void 0?c:qt,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.compareFunction=t.compareFunction,this}toJSON(t){const e=super.toJSON(t);return this.compareFunction!==null&&(e.compareFunction=this.compareFunction),e}}const Yh=new Pe,nc=new $h(1,1),qh=new Fh,Zh=new Gd,Kh=new Vh,ic=[],sc=[],rc=new Float32Array(16),ac=new Float32Array(9),oc=new Float32Array(4);function as(i,t,e){const n=i[0];if(n<=0||n>0)return i;const s=t*e;let r=ic[s];if(r===void 0&&(r=new Float32Array(s),ic[s]=r),t!==0){n.toArray(r,0);for(let o=1,a=0;o!==t;++o)a+=e,i[o].toArray(r,a)}return r}function xe(i,t){if(i.length!==t.length)return!1;for(let e=0,n=i.length;e<n;e++)if(i[e]!==t[e])return!1;return!0}function ye(i,t){for(let e=0,n=t.length;e<n;e++)i[e]=t[e]}function jr(i,t){let e=sc[t];e===void 0&&(e=new Int32Array(t),sc[t]=e);for(let n=0;n!==t;++n)e[n]=i.allocateTextureUnit();return e}function sg(i,t){const e=this.cache;e[0]!==t&&(i.uniform1f(this.addr,t),e[0]=t)}function rg(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(xe(e,t))return;i.uniform2fv(this.addr,t),ye(e,t)}}function ag(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(i.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(xe(e,t))return;i.uniform3fv(this.addr,t),ye(e,t)}}function og(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(xe(e,t))return;i.uniform4fv(this.addr,t),ye(e,t)}}function lg(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(xe(e,t))return;i.uniformMatrix2fv(this.addr,!1,t),ye(e,t)}else{if(xe(e,n))return;oc.set(n),i.uniformMatrix2fv(this.addr,!1,oc),ye(e,n)}}function cg(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(xe(e,t))return;i.uniformMatrix3fv(this.addr,!1,t),ye(e,t)}else{if(xe(e,n))return;ac.set(n),i.uniformMatrix3fv(this.addr,!1,ac),ye(e,n)}}function hg(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(xe(e,t))return;i.uniformMatrix4fv(this.addr,!1,t),ye(e,t)}else{if(xe(e,n))return;rc.set(n),i.uniformMatrix4fv(this.addr,!1,rc),ye(e,n)}}function ug(i,t){const e=this.cache;e[0]!==t&&(i.uniform1i(this.addr,t),e[0]=t)}function dg(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(xe(e,t))return;i.uniform2iv(this.addr,t),ye(e,t)}}function fg(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(xe(e,t))return;i.uniform3iv(this.addr,t),ye(e,t)}}function pg(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(xe(e,t))return;i.uniform4iv(this.addr,t),ye(e,t)}}function mg(i,t){const e=this.cache;e[0]!==t&&(i.uniform1ui(this.addr,t),e[0]=t)}function gg(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(xe(e,t))return;i.uniform2uiv(this.addr,t),ye(e,t)}}function _g(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(xe(e,t))return;i.uniform3uiv(this.addr,t),ye(e,t)}}function vg(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(xe(e,t))return;i.uniform4uiv(this.addr,t),ye(e,t)}}function xg(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r;this.type===i.SAMPLER_2D_SHADOW?(nc.compareFunction=Lh,r=nc):r=Yh,e.setTexture2D(t||r,s)}function yg(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTexture3D(t||Zh,s)}function Mg(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTextureCube(t||Kh,s)}function Sg(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTexture2DArray(t||qh,s)}function wg(i){switch(i){case 5126:return sg;case 35664:return rg;case 35665:return ag;case 35666:return og;case 35674:return lg;case 35675:return cg;case 35676:return hg;case 5124:case 35670:return ug;case 35667:case 35671:return dg;case 35668:case 35672:return fg;case 35669:case 35673:return pg;case 5125:return mg;case 36294:return gg;case 36295:return _g;case 36296:return vg;case 35678:case 36198:case 36298:case 36306:case 35682:return xg;case 35679:case 36299:case 36307:return yg;case 35680:case 36300:case 36308:case 36293:return Mg;case 36289:case 36303:case 36311:case 36292:return Sg}}function bg(i,t){i.uniform1fv(this.addr,t)}function Eg(i,t){const e=as(t,this.size,2);i.uniform2fv(this.addr,e)}function Tg(i,t){const e=as(t,this.size,3);i.uniform3fv(this.addr,e)}function Ag(i,t){const e=as(t,this.size,4);i.uniform4fv(this.addr,e)}function Cg(i,t){const e=as(t,this.size,4);i.uniformMatrix2fv(this.addr,!1,e)}function Rg(i,t){const e=as(t,this.size,9);i.uniformMatrix3fv(this.addr,!1,e)}function Ig(i,t){const e=as(t,this.size,16);i.uniformMatrix4fv(this.addr,!1,e)}function Pg(i,t){i.uniform1iv(this.addr,t)}function Dg(i,t){i.uniform2iv(this.addr,t)}function Lg(i,t){i.uniform3iv(this.addr,t)}function Ug(i,t){i.uniform4iv(this.addr,t)}function kg(i,t){i.uniform1uiv(this.addr,t)}function Fg(i,t){i.uniform2uiv(this.addr,t)}function Ng(i,t){i.uniform3uiv(this.addr,t)}function Bg(i,t){i.uniform4uiv(this.addr,t)}function Og(i,t,e){const n=this.cache,s=t.length,r=jr(e,s);xe(n,r)||(i.uniform1iv(this.addr,r),ye(n,r));for(let o=0;o!==s;++o)e.setTexture2D(t[o]||Yh,r[o])}function zg(i,t,e){const n=this.cache,s=t.length,r=jr(e,s);xe(n,r)||(i.uniform1iv(this.addr,r),ye(n,r));for(let o=0;o!==s;++o)e.setTexture3D(t[o]||Zh,r[o])}function Hg(i,t,e){const n=this.cache,s=t.length,r=jr(e,s);xe(n,r)||(i.uniform1iv(this.addr,r),ye(n,r));for(let o=0;o!==s;++o)e.setTextureCube(t[o]||Kh,r[o])}function Gg(i,t,e){const n=this.cache,s=t.length,r=jr(e,s);xe(n,r)||(i.uniform1iv(this.addr,r),ye(n,r));for(let o=0;o!==s;++o)e.setTexture2DArray(t[o]||qh,r[o])}function Vg(i){switch(i){case 5126:return bg;case 35664:return Eg;case 35665:return Tg;case 35666:return Ag;case 35674:return Cg;case 35675:return Rg;case 35676:return Ig;case 5124:case 35670:return Pg;case 35667:case 35671:return Dg;case 35668:case 35672:return Lg;case 35669:case 35673:return Ug;case 5125:return kg;case 36294:return Fg;case 36295:return Ng;case 36296:return Bg;case 35678:case 36198:case 36298:case 36306:case 35682:return Og;case 35679:case 36299:case 36307:return zg;case 35680:case 36300:case 36308:case 36293:return Hg;case 36289:case 36303:case 36311:case 36292:return Gg}}class Wg{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.setValue=wg(e.type)}}class Xg{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=Vg(e.type)}}class $g{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,n){const s=this.seq;for(let r=0,o=s.length;r!==o;++r){const a=s[r];a.setValue(t,e[a.id],n)}}}const Ia=/(\w+)(\])?(\[|\.)?/g;function lc(i,t){i.seq.push(t),i.map[t.id]=t}function Yg(i,t,e){const n=i.name,s=n.length;for(Ia.lastIndex=0;;){const r=Ia.exec(n),o=Ia.lastIndex;let a=r[1];const c=r[2]==="]",l=r[3];if(c&&(a=a|0),l===void 0||l==="["&&o+2===s){lc(e,l===void 0?new Wg(a,i,t):new Xg(a,i,t));break}else{let f=e.map[a];f===void 0&&(f=new $g(a),lc(e,f)),e=f}}}class Fr{constructor(t,e){this.seq=[],this.map={};const n=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let s=0;s<n;++s){const r=t.getActiveUniform(e,s),o=t.getUniformLocation(e,r.name);Yg(r,o,this)}}setValue(t,e,n,s){const r=this.map[e];r!==void 0&&r.setValue(t,n,s)}setOptional(t,e,n){const s=e[n];s!==void 0&&this.setValue(t,n,s)}static upload(t,e,n,s){for(let r=0,o=e.length;r!==o;++r){const a=e[r],c=n[a.id];c.needsUpdate!==!1&&a.setValue(t,c.value,s)}}static seqWithValue(t,e){const n=[];for(let s=0,r=t.length;s!==r;++s){const o=t[s];o.id in e&&n.push(o)}return n}}function cc(i,t,e){const n=i.createShader(t);return i.shaderSource(n,e),i.compileShader(n),n}const qg=37297;let Zg=0;function Kg(i,t){const e=i.split(`
`),n=[],s=Math.max(t-6,0),r=Math.min(t+6,e.length);for(let o=s;o<r;o++){const a=o+1;n.push(`${a===t?">":" "} ${a}: ${e[o]}`)}return n.join(`
`)}const hc=new Ut;function jg(i){Wt._getMatrix(hc,Wt.workingColorSpace,i);const t=`mat3( ${hc.elements.map(e=>e.toFixed(4))} )`;switch(Wt.getTransfer(i)){case Kr:return[t,"LinearTransferOETF"];case te:return[t,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",i),[t,"LinearTransferOETF"]}}function uc(i,t,e){const n=i.getShaderParameter(t,i.COMPILE_STATUS),s=i.getShaderInfoLog(t).trim();if(n&&s==="")return"";const r=/ERROR: 0:(\d+)/.exec(s);if(r){const o=parseInt(r[1]);return e.toUpperCase()+`

`+s+`

`+Kg(i.getShaderSource(t),o)}else return s}function Jg(i,t){const e=jg(t);return[`vec4 ${i}( vec4 value ) {`,`	return ${e[1]}( vec4( value.rgb * ${e[0]}, value.a ) );`,"}"].join(`
`)}function Qg(i,t){let e;switch(t){case md:e="Linear";break;case gd:e="Reinhard";break;case _d:e="Cineon";break;case vd:e="ACESFilmic";break;case yd:e="AgX";break;case Md:e="Neutral";break;case xd:e="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",t),e="Linear"}return"vec3 "+i+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}const gr=new G;function t_(){Wt.getLuminanceCoefficients(gr);const i=gr.x.toFixed(4),t=gr.y.toFixed(4),e=gr.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function e_(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Ms).join(`
`)}function n_(i){const t=[];for(const e in i){const n=i[e];n!==!1&&t.push("#define "+e+" "+n)}return t.join(`
`)}function i_(i,t){const e={},n=i.getProgramParameter(t,i.ACTIVE_ATTRIBUTES);for(let s=0;s<n;s++){const r=i.getActiveAttrib(t,s),o=r.name;let a=1;r.type===i.FLOAT_MAT2&&(a=2),r.type===i.FLOAT_MAT3&&(a=3),r.type===i.FLOAT_MAT4&&(a=4),e[o]={type:r.type,location:i.getAttribLocation(t,o),locationSize:a}}return e}function Ms(i){return i!==""}function dc(i,t){const e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return i.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function fc(i,t){return i.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}const s_=/^[ \t]*#include +<([\w\d./]+)>/gm;function No(i){return i.replace(s_,a_)}const r_=new Map;function a_(i,t){let e=Ft[t];if(e===void 0){const n=r_.get(t);if(n!==void 0)e=Ft[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,n);else throw new Error("Can not resolve #include <"+t+">")}return No(e)}const o_=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function pc(i){return i.replace(o_,l_)}function l_(i,t,e,n){let s="";for(let r=parseInt(t);r<parseInt(e);r++)s+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function mc(i){let t=`precision ${i.precision} float;
	precision ${i.precision} int;
	precision ${i.precision} sampler2D;
	precision ${i.precision} samplerCube;
	precision ${i.precision} sampler3D;
	precision ${i.precision} sampler2DArray;
	precision ${i.precision} sampler2DShadow;
	precision ${i.precision} samplerCubeShadow;
	precision ${i.precision} sampler2DArrayShadow;
	precision ${i.precision} isampler2D;
	precision ${i.precision} isampler3D;
	precision ${i.precision} isamplerCube;
	precision ${i.precision} isampler2DArray;
	precision ${i.precision} usampler2D;
	precision ${i.precision} usampler3D;
	precision ${i.precision} usamplerCube;
	precision ${i.precision} usampler2DArray;
	`;return i.precision==="highp"?t+=`
#define HIGH_PRECISION`:i.precision==="mediump"?t+=`
#define MEDIUM_PRECISION`:i.precision==="lowp"&&(t+=`
#define LOW_PRECISION`),t}function c_(i){let t="SHADOWMAP_TYPE_BASIC";return i.shadowMapType===yh?t="SHADOWMAP_TYPE_PCF":i.shadowMapType===qu?t="SHADOWMAP_TYPE_PCF_SOFT":i.shadowMapType===Cn&&(t="SHADOWMAP_TYPE_VSM"),t}function h_(i){let t="ENVMAP_TYPE_CUBE";if(i.envMap)switch(i.envMapMode){case Zi:case Ki:t="ENVMAP_TYPE_CUBE";break;case Zr:t="ENVMAP_TYPE_CUBE_UV";break}return t}function u_(i){let t="ENVMAP_MODE_REFLECTION";if(i.envMap)switch(i.envMapMode){case Ki:t="ENVMAP_MODE_REFRACTION";break}return t}function d_(i){let t="ENVMAP_BLENDING_NONE";if(i.envMap)switch(i.combine){case Ko:t="ENVMAP_BLENDING_MULTIPLY";break;case fd:t="ENVMAP_BLENDING_MIX";break;case pd:t="ENVMAP_BLENDING_ADD";break}return t}function f_(i){const t=i.envMapCubeUVHeight;if(t===null)return null;const e=Math.log2(t)-2,n=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),112)),texelHeight:n,maxMip:e}}function p_(i,t,e,n){const s=i.getContext(),r=e.defines;let o=e.vertexShader,a=e.fragmentShader;const c=c_(e),l=h_(e),h=u_(e),f=d_(e),u=f_(e),d=e_(e),p=n_(r),_=s.createProgram();let m,g,w=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(m=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,p].filter(Ms).join(`
`),m.length>0&&(m+=`
`),g=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,p].filter(Ms).join(`
`),g.length>0&&(g+=`
`)):(m=[mc(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,p,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+h:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+c:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Ms).join(`
`),g=[mc(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,p,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+l:"",e.envMap?"#define "+h:"",e.envMap?"#define "+f:"",u?"#define CUBEUV_TEXEL_WIDTH "+u.texelWidth:"",u?"#define CUBEUV_TEXEL_HEIGHT "+u.texelHeight:"",u?"#define CUBEUV_MAX_MIP "+u.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor||e.batchingColor?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+c:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==qn?"#define TONE_MAPPING":"",e.toneMapping!==qn?Ft.tonemapping_pars_fragment:"",e.toneMapping!==qn?Qg("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",Ft.colorspace_pars_fragment,Jg("linearToOutputTexel",e.outputColorSpace),t_(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(Ms).join(`
`)),o=No(o),o=dc(o,e),o=fc(o,e),a=No(a),a=dc(a,e),a=fc(a,e),o=pc(o),a=pc(a),e.isRawShaderMaterial!==!0&&(w=`#version 300 es
`,m=[d,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,g=["#define varying in",e.glslVersion===Cl?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===Cl?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+g);const E=w+m+o,y=w+g+a,b=cc(s,s.VERTEX_SHADER,E),S=cc(s,s.FRAGMENT_SHADER,y);s.attachShader(_,b),s.attachShader(_,S),e.index0AttributeName!==void 0?s.bindAttribLocation(_,0,e.index0AttributeName):e.morphTargets===!0&&s.bindAttribLocation(_,0,"position"),s.linkProgram(_);function M(C){if(i.debug.checkShaderErrors){const L=s.getProgramInfoLog(_).trim(),U=s.getShaderInfoLog(b).trim(),D=s.getShaderInfoLog(S).trim();let O=!0,H=!0;if(s.getProgramParameter(_,s.LINK_STATUS)===!1)if(O=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(s,_,b,S);else{const $=uc(s,b,"vertex"),z=uc(s,S,"fragment");console.error("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(_,s.VALIDATE_STATUS)+`

Material Name: `+C.name+`
Material Type: `+C.type+`

Program Info Log: `+L+`
`+$+`
`+z)}else L!==""?console.warn("THREE.WebGLProgram: Program Info Log:",L):(U===""||D==="")&&(H=!1);H&&(C.diagnostics={runnable:O,programLog:L,vertexShader:{log:U,prefix:m},fragmentShader:{log:D,prefix:g}})}s.deleteShader(b),s.deleteShader(S),R=new Fr(s,_),v=i_(s,_)}let R;this.getUniforms=function(){return R===void 0&&M(this),R};let v;this.getAttributes=function(){return v===void 0&&M(this),v};let x=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return x===!1&&(x=s.getProgramParameter(_,qg)),x},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(_),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=Zg++,this.cacheKey=t,this.usedTimes=1,this.program=_,this.vertexShader=b,this.fragmentShader=S,this}let m_=0;class g_{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){const e=t.vertexShader,n=t.fragmentShader,s=this._getShaderStage(e),r=this._getShaderStage(n),o=this._getShaderCacheForMaterial(t);return o.has(s)===!1&&(o.add(s),s.usedTimes++),o.has(r)===!1&&(o.add(r),r.usedTimes++),this}remove(t){const e=this.materialCache.get(t);for(const n of e)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){const e=this.materialCache;let n=e.get(t);return n===void 0&&(n=new Set,e.set(t,n)),n}_getShaderStage(t){const e=this.shaderCache;let n=e.get(t);return n===void 0&&(n=new __(t),e.set(t,n)),n}}class __{constructor(t){this.id=m_++,this.code=t,this.usedTimes=0}}function v_(i,t,e,n,s,r,o){const a=new Nh,c=new g_,l=new Set,h=[],f=s.logarithmicDepthBuffer,u=s.vertexTextures;let d=s.precision;const p={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function _(v){return l.add(v),v===0?"uv":`uv${v}`}function m(v,x,C,L,U){const D=L.fog,O=U.geometry,H=v.isMeshStandardMaterial?L.environment:null,$=(v.isMeshStandardMaterial?e:t).get(v.envMap||H),z=$&&$.mapping===Zr?$.image.height:null,q=p[v.type];v.precision!==null&&(d=s.getMaxPrecision(v.precision),d!==v.precision&&console.warn("THREE.WebGLProgram.getParameters:",v.precision,"not supported, using",d,"instead."));const et=O.morphAttributes.position||O.morphAttributes.normal||O.morphAttributes.color,gt=et!==void 0?et.length:0;let _t=0;O.morphAttributes.position!==void 0&&(_t=1),O.morphAttributes.normal!==void 0&&(_t=2),O.morphAttributes.color!==void 0&&(_t=3);let Pt,Z,it,vt;if(q){const Jt=mn[q];Pt=Jt.vertexShader,Z=Jt.fragmentShader}else Pt=v.vertexShader,Z=v.fragmentShader,c.update(v),it=c.getVertexShaderID(v),vt=c.getFragmentShaderID(v);const ot=i.getRenderTarget(),Et=i.state.buffers.depth.getReversed(),Rt=U.isInstancedMesh===!0,Nt=U.isBatchedMesh===!0,ce=!!v.map,Ot=!!v.matcap,ge=!!$,B=!!v.aoMap,Ke=!!v.lightMap,zt=!!v.bumpMap,Ht=!!v.normalMap,Tt=!!v.displacementMap,re=!!v.emissiveMap,bt=!!v.metalnessMap,P=!!v.roughnessMap,T=v.anisotropy>0,V=v.clearcoat>0,j=v.dispersion>0,tt=v.iridescence>0,K=v.sheen>0,St=v.transmission>0,ct=T&&!!v.anisotropyMap,ft=V&&!!v.clearcoatMap,Vt=V&&!!v.clearcoatNormalMap,st=V&&!!v.clearcoatRoughnessMap,pt=tt&&!!v.iridescenceMap,At=tt&&!!v.iridescenceThicknessMap,Ct=K&&!!v.sheenColorMap,mt=K&&!!v.sheenRoughnessMap,Gt=!!v.specularMap,kt=!!v.specularColorMap,ne=!!v.specularIntensityMap,k=St&&!!v.transmissionMap,lt=St&&!!v.thicknessMap,Y=!!v.gradientMap,J=!!v.alphaMap,dt=v.alphaTest>0,ht=!!v.alphaHash,Dt=!!v.extensions;let fe=qn;v.toneMapped&&(ot===null||ot.isXRRenderTarget===!0)&&(fe=i.toneMapping);const Te={shaderID:q,shaderType:v.type,shaderName:v.name,vertexShader:Pt,fragmentShader:Z,defines:v.defines,customVertexShaderID:it,customFragmentShaderID:vt,isRawShaderMaterial:v.isRawShaderMaterial===!0,glslVersion:v.glslVersion,precision:d,batching:Nt,batchingColor:Nt&&U._colorsTexture!==null,instancing:Rt,instancingColor:Rt&&U.instanceColor!==null,instancingMorph:Rt&&U.morphTexture!==null,supportsVertexTextures:u,outputColorSpace:ot===null?i.outputColorSpace:ot.isXRRenderTarget===!0?ot.texture.colorSpace:is,alphaToCoverage:!!v.alphaToCoverage,map:ce,matcap:Ot,envMap:ge,envMapMode:ge&&$.mapping,envMapCubeUVHeight:z,aoMap:B,lightMap:Ke,bumpMap:zt,normalMap:Ht,displacementMap:u&&Tt,emissiveMap:re,normalMapObjectSpace:Ht&&v.normalMapType===Ed,normalMapTangentSpace:Ht&&v.normalMapType===Dh,metalnessMap:bt,roughnessMap:P,anisotropy:T,anisotropyMap:ct,clearcoat:V,clearcoatMap:ft,clearcoatNormalMap:Vt,clearcoatRoughnessMap:st,dispersion:j,iridescence:tt,iridescenceMap:pt,iridescenceThicknessMap:At,sheen:K,sheenColorMap:Ct,sheenRoughnessMap:mt,specularMap:Gt,specularColorMap:kt,specularIntensityMap:ne,transmission:St,transmissionMap:k,thicknessMap:lt,gradientMap:Y,opaque:v.transparent===!1&&v.blending===Vi&&v.alphaToCoverage===!1,alphaMap:J,alphaTest:dt,alphaHash:ht,combine:v.combine,mapUv:ce&&_(v.map.channel),aoMapUv:B&&_(v.aoMap.channel),lightMapUv:Ke&&_(v.lightMap.channel),bumpMapUv:zt&&_(v.bumpMap.channel),normalMapUv:Ht&&_(v.normalMap.channel),displacementMapUv:Tt&&_(v.displacementMap.channel),emissiveMapUv:re&&_(v.emissiveMap.channel),metalnessMapUv:bt&&_(v.metalnessMap.channel),roughnessMapUv:P&&_(v.roughnessMap.channel),anisotropyMapUv:ct&&_(v.anisotropyMap.channel),clearcoatMapUv:ft&&_(v.clearcoatMap.channel),clearcoatNormalMapUv:Vt&&_(v.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:st&&_(v.clearcoatRoughnessMap.channel),iridescenceMapUv:pt&&_(v.iridescenceMap.channel),iridescenceThicknessMapUv:At&&_(v.iridescenceThicknessMap.channel),sheenColorMapUv:Ct&&_(v.sheenColorMap.channel),sheenRoughnessMapUv:mt&&_(v.sheenRoughnessMap.channel),specularMapUv:Gt&&_(v.specularMap.channel),specularColorMapUv:kt&&_(v.specularColorMap.channel),specularIntensityMapUv:ne&&_(v.specularIntensityMap.channel),transmissionMapUv:k&&_(v.transmissionMap.channel),thicknessMapUv:lt&&_(v.thicknessMap.channel),alphaMapUv:J&&_(v.alphaMap.channel),vertexTangents:!!O.attributes.tangent&&(Ht||T),vertexColors:v.vertexColors,vertexAlphas:v.vertexColors===!0&&!!O.attributes.color&&O.attributes.color.itemSize===4,pointsUvs:U.isPoints===!0&&!!O.attributes.uv&&(ce||J),fog:!!D,useFog:v.fog===!0,fogExp2:!!D&&D.isFogExp2,flatShading:v.flatShading===!0,sizeAttenuation:v.sizeAttenuation===!0,logarithmicDepthBuffer:f,reverseDepthBuffer:Et,skinning:U.isSkinnedMesh===!0,morphTargets:O.morphAttributes.position!==void 0,morphNormals:O.morphAttributes.normal!==void 0,morphColors:O.morphAttributes.color!==void 0,morphTargetsCount:gt,morphTextureStride:_t,numDirLights:x.directional.length,numPointLights:x.point.length,numSpotLights:x.spot.length,numSpotLightMaps:x.spotLightMap.length,numRectAreaLights:x.rectArea.length,numHemiLights:x.hemi.length,numDirLightShadows:x.directionalShadowMap.length,numPointLightShadows:x.pointShadowMap.length,numSpotLightShadows:x.spotShadowMap.length,numSpotLightShadowsWithMaps:x.numSpotLightShadowsWithMaps,numLightProbes:x.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:v.dithering,shadowMapEnabled:i.shadowMap.enabled&&C.length>0,shadowMapType:i.shadowMap.type,toneMapping:fe,decodeVideoTexture:ce&&v.map.isVideoTexture===!0&&Wt.getTransfer(v.map.colorSpace)===te,decodeVideoTextureEmissive:re&&v.emissiveMap.isVideoTexture===!0&&Wt.getTransfer(v.emissiveMap.colorSpace)===te,premultipliedAlpha:v.premultipliedAlpha,doubleSided:v.side===He,flipSided:v.side===Ue,useDepthPacking:v.depthPacking>=0,depthPacking:v.depthPacking||0,index0AttributeName:v.index0AttributeName,extensionClipCullDistance:Dt&&v.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Dt&&v.extensions.multiDraw===!0||Nt)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:v.customProgramCacheKey()};return Te.vertexUv1s=l.has(1),Te.vertexUv2s=l.has(2),Te.vertexUv3s=l.has(3),l.clear(),Te}function g(v){const x=[];if(v.shaderID?x.push(v.shaderID):(x.push(v.customVertexShaderID),x.push(v.customFragmentShaderID)),v.defines!==void 0)for(const C in v.defines)x.push(C),x.push(v.defines[C]);return v.isRawShaderMaterial===!1&&(w(x,v),E(x,v),x.push(i.outputColorSpace)),x.push(v.customProgramCacheKey),x.join()}function w(v,x){v.push(x.precision),v.push(x.outputColorSpace),v.push(x.envMapMode),v.push(x.envMapCubeUVHeight),v.push(x.mapUv),v.push(x.alphaMapUv),v.push(x.lightMapUv),v.push(x.aoMapUv),v.push(x.bumpMapUv),v.push(x.normalMapUv),v.push(x.displacementMapUv),v.push(x.emissiveMapUv),v.push(x.metalnessMapUv),v.push(x.roughnessMapUv),v.push(x.anisotropyMapUv),v.push(x.clearcoatMapUv),v.push(x.clearcoatNormalMapUv),v.push(x.clearcoatRoughnessMapUv),v.push(x.iridescenceMapUv),v.push(x.iridescenceThicknessMapUv),v.push(x.sheenColorMapUv),v.push(x.sheenRoughnessMapUv),v.push(x.specularMapUv),v.push(x.specularColorMapUv),v.push(x.specularIntensityMapUv),v.push(x.transmissionMapUv),v.push(x.thicknessMapUv),v.push(x.combine),v.push(x.fogExp2),v.push(x.sizeAttenuation),v.push(x.morphTargetsCount),v.push(x.morphAttributeCount),v.push(x.numDirLights),v.push(x.numPointLights),v.push(x.numSpotLights),v.push(x.numSpotLightMaps),v.push(x.numHemiLights),v.push(x.numRectAreaLights),v.push(x.numDirLightShadows),v.push(x.numPointLightShadows),v.push(x.numSpotLightShadows),v.push(x.numSpotLightShadowsWithMaps),v.push(x.numLightProbes),v.push(x.shadowMapType),v.push(x.toneMapping),v.push(x.numClippingPlanes),v.push(x.numClipIntersection),v.push(x.depthPacking)}function E(v,x){a.disableAll(),x.supportsVertexTextures&&a.enable(0),x.instancing&&a.enable(1),x.instancingColor&&a.enable(2),x.instancingMorph&&a.enable(3),x.matcap&&a.enable(4),x.envMap&&a.enable(5),x.normalMapObjectSpace&&a.enable(6),x.normalMapTangentSpace&&a.enable(7),x.clearcoat&&a.enable(8),x.iridescence&&a.enable(9),x.alphaTest&&a.enable(10),x.vertexColors&&a.enable(11),x.vertexAlphas&&a.enable(12),x.vertexUv1s&&a.enable(13),x.vertexUv2s&&a.enable(14),x.vertexUv3s&&a.enable(15),x.vertexTangents&&a.enable(16),x.anisotropy&&a.enable(17),x.alphaHash&&a.enable(18),x.batching&&a.enable(19),x.dispersion&&a.enable(20),x.batchingColor&&a.enable(21),v.push(a.mask),a.disableAll(),x.fog&&a.enable(0),x.useFog&&a.enable(1),x.flatShading&&a.enable(2),x.logarithmicDepthBuffer&&a.enable(3),x.reverseDepthBuffer&&a.enable(4),x.skinning&&a.enable(5),x.morphTargets&&a.enable(6),x.morphNormals&&a.enable(7),x.morphColors&&a.enable(8),x.premultipliedAlpha&&a.enable(9),x.shadowMapEnabled&&a.enable(10),x.doubleSided&&a.enable(11),x.flipSided&&a.enable(12),x.useDepthPacking&&a.enable(13),x.dithering&&a.enable(14),x.transmission&&a.enable(15),x.sheen&&a.enable(16),x.opaque&&a.enable(17),x.pointsUvs&&a.enable(18),x.decodeVideoTexture&&a.enable(19),x.decodeVideoTextureEmissive&&a.enable(20),x.alphaToCoverage&&a.enable(21),v.push(a.mask)}function y(v){const x=p[v.type];let C;if(x){const L=mn[x];C=tf.clone(L.uniforms)}else C=v.uniforms;return C}function b(v,x){let C;for(let L=0,U=h.length;L<U;L++){const D=h[L];if(D.cacheKey===x){C=D,++C.usedTimes;break}}return C===void 0&&(C=new p_(i,x,v,r),h.push(C)),C}function S(v){if(--v.usedTimes===0){const x=h.indexOf(v);h[x]=h[h.length-1],h.pop(),v.destroy()}}function M(v){c.remove(v)}function R(){c.dispose()}return{getParameters:m,getProgramCacheKey:g,getUniforms:y,acquireProgram:b,releaseProgram:S,releaseShaderCache:M,programs:h,dispose:R}}function x_(){let i=new WeakMap;function t(o){return i.has(o)}function e(o){let a=i.get(o);return a===void 0&&(a={},i.set(o,a)),a}function n(o){i.delete(o)}function s(o,a,c){i.get(o)[a]=c}function r(){i=new WeakMap}return{has:t,get:e,remove:n,update:s,dispose:r}}function y_(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.material.id!==t.material.id?i.material.id-t.material.id:i.z!==t.z?i.z-t.z:i.id-t.id}function gc(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.z!==t.z?t.z-i.z:i.id-t.id}function _c(){const i=[];let t=0;const e=[],n=[],s=[];function r(){t=0,e.length=0,n.length=0,s.length=0}function o(f,u,d,p,_,m){let g=i[t];return g===void 0?(g={id:f.id,object:f,geometry:u,material:d,groupOrder:p,renderOrder:f.renderOrder,z:_,group:m},i[t]=g):(g.id=f.id,g.object=f,g.geometry=u,g.material=d,g.groupOrder=p,g.renderOrder=f.renderOrder,g.z=_,g.group=m),t++,g}function a(f,u,d,p,_,m){const g=o(f,u,d,p,_,m);d.transmission>0?n.push(g):d.transparent===!0?s.push(g):e.push(g)}function c(f,u,d,p,_,m){const g=o(f,u,d,p,_,m);d.transmission>0?n.unshift(g):d.transparent===!0?s.unshift(g):e.unshift(g)}function l(f,u){e.length>1&&e.sort(f||y_),n.length>1&&n.sort(u||gc),s.length>1&&s.sort(u||gc)}function h(){for(let f=t,u=i.length;f<u;f++){const d=i[f];if(d.id===null)break;d.id=null,d.object=null,d.geometry=null,d.material=null,d.group=null}}return{opaque:e,transmissive:n,transparent:s,init:r,push:a,unshift:c,finish:h,sort:l}}function M_(){let i=new WeakMap;function t(n,s){const r=i.get(n);let o;return r===void 0?(o=new _c,i.set(n,[o])):s>=r.length?(o=new _c,r.push(o)):o=r[s],o}function e(){i=new WeakMap}return{get:t,dispose:e}}function S_(){const i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"DirectionalLight":e={direction:new G,color:new Bt};break;case"SpotLight":e={position:new G,direction:new G,color:new Bt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new G,color:new Bt,distance:0,decay:0};break;case"HemisphereLight":e={direction:new G,skyColor:new Bt,groundColor:new Bt};break;case"RectAreaLight":e={color:new Bt,position:new G,halfWidth:new G,halfHeight:new G};break}return i[t.id]=e,e}}}function w_(){const i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new jt};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new jt};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new jt,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[t.id]=e,e}}}let b_=0;function E_(i,t){return(t.castShadow?2:0)-(i.castShadow?2:0)+(t.map?1:0)-(i.map?1:0)}function T_(i){const t=new S_,e=w_(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let l=0;l<9;l++)n.probe.push(new G);const s=new G,r=new ee,o=new ee;function a(l){let h=0,f=0,u=0;for(let v=0;v<9;v++)n.probe[v].set(0,0,0);let d=0,p=0,_=0,m=0,g=0,w=0,E=0,y=0,b=0,S=0,M=0;l.sort(E_);for(let v=0,x=l.length;v<x;v++){const C=l[v],L=C.color,U=C.intensity,D=C.distance,O=C.shadow&&C.shadow.map?C.shadow.map.texture:null;if(C.isAmbientLight)h+=L.r*U,f+=L.g*U,u+=L.b*U;else if(C.isLightProbe){for(let H=0;H<9;H++)n.probe[H].addScaledVector(C.sh.coefficients[H],U);M++}else if(C.isDirectionalLight){const H=t.get(C);if(H.color.copy(C.color).multiplyScalar(C.intensity),C.castShadow){const $=C.shadow,z=e.get(C);z.shadowIntensity=$.intensity,z.shadowBias=$.bias,z.shadowNormalBias=$.normalBias,z.shadowRadius=$.radius,z.shadowMapSize=$.mapSize,n.directionalShadow[d]=z,n.directionalShadowMap[d]=O,n.directionalShadowMatrix[d]=C.shadow.matrix,w++}n.directional[d]=H,d++}else if(C.isSpotLight){const H=t.get(C);H.position.setFromMatrixPosition(C.matrixWorld),H.color.copy(L).multiplyScalar(U),H.distance=D,H.coneCos=Math.cos(C.angle),H.penumbraCos=Math.cos(C.angle*(1-C.penumbra)),H.decay=C.decay,n.spot[_]=H;const $=C.shadow;if(C.map&&(n.spotLightMap[b]=C.map,b++,$.updateMatrices(C),C.castShadow&&S++),n.spotLightMatrix[_]=$.matrix,C.castShadow){const z=e.get(C);z.shadowIntensity=$.intensity,z.shadowBias=$.bias,z.shadowNormalBias=$.normalBias,z.shadowRadius=$.radius,z.shadowMapSize=$.mapSize,n.spotShadow[_]=z,n.spotShadowMap[_]=O,y++}_++}else if(C.isRectAreaLight){const H=t.get(C);H.color.copy(L).multiplyScalar(U),H.halfWidth.set(C.width*.5,0,0),H.halfHeight.set(0,C.height*.5,0),n.rectArea[m]=H,m++}else if(C.isPointLight){const H=t.get(C);if(H.color.copy(C.color).multiplyScalar(C.intensity),H.distance=C.distance,H.decay=C.decay,C.castShadow){const $=C.shadow,z=e.get(C);z.shadowIntensity=$.intensity,z.shadowBias=$.bias,z.shadowNormalBias=$.normalBias,z.shadowRadius=$.radius,z.shadowMapSize=$.mapSize,z.shadowCameraNear=$.camera.near,z.shadowCameraFar=$.camera.far,n.pointShadow[p]=z,n.pointShadowMap[p]=O,n.pointShadowMatrix[p]=C.shadow.matrix,E++}n.point[p]=H,p++}else if(C.isHemisphereLight){const H=t.get(C);H.skyColor.copy(C.color).multiplyScalar(U),H.groundColor.copy(C.groundColor).multiplyScalar(U),n.hemi[g]=H,g++}}m>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=at.LTC_FLOAT_1,n.rectAreaLTC2=at.LTC_FLOAT_2):(n.rectAreaLTC1=at.LTC_HALF_1,n.rectAreaLTC2=at.LTC_HALF_2)),n.ambient[0]=h,n.ambient[1]=f,n.ambient[2]=u;const R=n.hash;(R.directionalLength!==d||R.pointLength!==p||R.spotLength!==_||R.rectAreaLength!==m||R.hemiLength!==g||R.numDirectionalShadows!==w||R.numPointShadows!==E||R.numSpotShadows!==y||R.numSpotMaps!==b||R.numLightProbes!==M)&&(n.directional.length=d,n.spot.length=_,n.rectArea.length=m,n.point.length=p,n.hemi.length=g,n.directionalShadow.length=w,n.directionalShadowMap.length=w,n.pointShadow.length=E,n.pointShadowMap.length=E,n.spotShadow.length=y,n.spotShadowMap.length=y,n.directionalShadowMatrix.length=w,n.pointShadowMatrix.length=E,n.spotLightMatrix.length=y+b-S,n.spotLightMap.length=b,n.numSpotLightShadowsWithMaps=S,n.numLightProbes=M,R.directionalLength=d,R.pointLength=p,R.spotLength=_,R.rectAreaLength=m,R.hemiLength=g,R.numDirectionalShadows=w,R.numPointShadows=E,R.numSpotShadows=y,R.numSpotMaps=b,R.numLightProbes=M,n.version=b_++)}function c(l,h){let f=0,u=0,d=0,p=0,_=0;const m=h.matrixWorldInverse;for(let g=0,w=l.length;g<w;g++){const E=l[g];if(E.isDirectionalLight){const y=n.directional[f];y.direction.setFromMatrixPosition(E.matrixWorld),s.setFromMatrixPosition(E.target.matrixWorld),y.direction.sub(s),y.direction.transformDirection(m),f++}else if(E.isSpotLight){const y=n.spot[d];y.position.setFromMatrixPosition(E.matrixWorld),y.position.applyMatrix4(m),y.direction.setFromMatrixPosition(E.matrixWorld),s.setFromMatrixPosition(E.target.matrixWorld),y.direction.sub(s),y.direction.transformDirection(m),d++}else if(E.isRectAreaLight){const y=n.rectArea[p];y.position.setFromMatrixPosition(E.matrixWorld),y.position.applyMatrix4(m),o.identity(),r.copy(E.matrixWorld),r.premultiply(m),o.extractRotation(r),y.halfWidth.set(E.width*.5,0,0),y.halfHeight.set(0,E.height*.5,0),y.halfWidth.applyMatrix4(o),y.halfHeight.applyMatrix4(o),p++}else if(E.isPointLight){const y=n.point[u];y.position.setFromMatrixPosition(E.matrixWorld),y.position.applyMatrix4(m),u++}else if(E.isHemisphereLight){const y=n.hemi[_];y.direction.setFromMatrixPosition(E.matrixWorld),y.direction.transformDirection(m),_++}}}return{setup:a,setupView:c,state:n}}function vc(i){const t=new T_(i),e=[],n=[];function s(h){l.camera=h,e.length=0,n.length=0}function r(h){e.push(h)}function o(h){n.push(h)}function a(){t.setup(e)}function c(h){t.setupView(e,h)}const l={lightsArray:e,shadowsArray:n,camera:null,lights:t,transmissionRenderTarget:{}};return{init:s,state:l,setupLights:a,setupLightsView:c,pushLight:r,pushShadow:o}}function A_(i){let t=new WeakMap;function e(s,r=0){const o=t.get(s);let a;return o===void 0?(a=new vc(i),t.set(s,[a])):r>=o.length?(a=new vc(i),o.push(a)):a=o[r],a}function n(){t=new WeakMap}return{get:e,dispose:n}}class C_ extends Si{static get type(){return"MeshDepthMaterial"}constructor(t){super(),this.isMeshDepthMaterial=!0,this.depthPacking=wd,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}}class R_ extends Si{static get type(){return"MeshDistanceMaterial"}constructor(t){super(),this.isMeshDistanceMaterial=!0,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}}const I_=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,P_=`uniform sampler2D shadow_pass;
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
}`;function D_(i,t,e){let n=new sl;const s=new jt,r=new jt,o=new me,a=new C_({depthPacking:bd}),c=new R_,l={},h=e.maxTextureSize,f={[Jn]:Ue,[Ue]:Jn,[He]:He},u=new Qn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new jt},radius:{value:4}},vertexShader:I_,fragmentShader:P_}),d=u.clone();d.defines.HORIZONTAL_PASS=1;const p=new Ie;p.setAttribute("position",new un(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const _=new Qt(p,u),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=yh;let g=this.type;this.render=function(S,M,R){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||S.length===0)return;const v=i.getRenderTarget(),x=i.getActiveCubeFace(),C=i.getActiveMipmapLevel(),L=i.state;L.setBlending(Yn),L.buffers.color.setClear(1,1,1,1),L.buffers.depth.setTest(!0),L.setScissorTest(!1);const U=g!==Cn&&this.type===Cn,D=g===Cn&&this.type!==Cn;for(let O=0,H=S.length;O<H;O++){const $=S[O],z=$.shadow;if(z===void 0){console.warn("THREE.WebGLShadowMap:",$,"has no shadow.");continue}if(z.autoUpdate===!1&&z.needsUpdate===!1)continue;s.copy(z.mapSize);const q=z.getFrameExtents();if(s.multiply(q),r.copy(z.mapSize),(s.x>h||s.y>h)&&(s.x>h&&(r.x=Math.floor(h/q.x),s.x=r.x*q.x,z.mapSize.x=r.x),s.y>h&&(r.y=Math.floor(h/q.y),s.y=r.y*q.y,z.mapSize.y=r.y)),z.map===null||U===!0||D===!0){const gt=this.type!==Cn?{minFilter:qt,magFilter:qt}:{};z.map!==null&&z.map.dispose(),z.map=new _i(s.x,s.y,gt),z.map.texture.name=$.name+".shadowMap",z.camera.updateProjectionMatrix()}i.setRenderTarget(z.map),i.clear();const et=z.getViewportCount();for(let gt=0;gt<et;gt++){const _t=z.getViewport(gt);o.set(r.x*_t.x,r.y*_t.y,r.x*_t.z,r.y*_t.w),L.viewport(o),z.updateMatrices($,gt),n=z.getFrustum(),y(M,R,z.camera,$,this.type)}z.isPointLightShadow!==!0&&this.type===Cn&&w(z,R),z.needsUpdate=!1}g=this.type,m.needsUpdate=!1,i.setRenderTarget(v,x,C)};function w(S,M){const R=t.update(_);u.defines.VSM_SAMPLES!==S.blurSamples&&(u.defines.VSM_SAMPLES=S.blurSamples,d.defines.VSM_SAMPLES=S.blurSamples,u.needsUpdate=!0,d.needsUpdate=!0),S.mapPass===null&&(S.mapPass=new _i(s.x,s.y)),u.uniforms.shadow_pass.value=S.map.texture,u.uniforms.resolution.value=S.mapSize,u.uniforms.radius.value=S.radius,i.setRenderTarget(S.mapPass),i.clear(),i.renderBufferDirect(M,null,R,u,_,null),d.uniforms.shadow_pass.value=S.mapPass.texture,d.uniforms.resolution.value=S.mapSize,d.uniforms.radius.value=S.radius,i.setRenderTarget(S.map),i.clear(),i.renderBufferDirect(M,null,R,d,_,null)}function E(S,M,R,v){let x=null;const C=R.isPointLight===!0?S.customDistanceMaterial:S.customDepthMaterial;if(C!==void 0)x=C;else if(x=R.isPointLight===!0?c:a,i.localClippingEnabled&&M.clipShadows===!0&&Array.isArray(M.clippingPlanes)&&M.clippingPlanes.length!==0||M.displacementMap&&M.displacementScale!==0||M.alphaMap&&M.alphaTest>0||M.map&&M.alphaTest>0){const L=x.uuid,U=M.uuid;let D=l[L];D===void 0&&(D={},l[L]=D);let O=D[U];O===void 0&&(O=x.clone(),D[U]=O,M.addEventListener("dispose",b)),x=O}if(x.visible=M.visible,x.wireframe=M.wireframe,v===Cn?x.side=M.shadowSide!==null?M.shadowSide:M.side:x.side=M.shadowSide!==null?M.shadowSide:f[M.side],x.alphaMap=M.alphaMap,x.alphaTest=M.alphaTest,x.map=M.map,x.clipShadows=M.clipShadows,x.clippingPlanes=M.clippingPlanes,x.clipIntersection=M.clipIntersection,x.displacementMap=M.displacementMap,x.displacementScale=M.displacementScale,x.displacementBias=M.displacementBias,x.wireframeLinewidth=M.wireframeLinewidth,x.linewidth=M.linewidth,R.isPointLight===!0&&x.isMeshDistanceMaterial===!0){const L=i.properties.get(x);L.light=R}return x}function y(S,M,R,v,x){if(S.visible===!1)return;if(S.layers.test(M.layers)&&(S.isMesh||S.isLine||S.isPoints)&&(S.castShadow||S.receiveShadow&&x===Cn)&&(!S.frustumCulled||n.intersectsObject(S))){S.modelViewMatrix.multiplyMatrices(R.matrixWorldInverse,S.matrixWorld);const U=t.update(S),D=S.material;if(Array.isArray(D)){const O=U.groups;for(let H=0,$=O.length;H<$;H++){const z=O[H],q=D[z.materialIndex];if(q&&q.visible){const et=E(S,q,v,x);S.onBeforeShadow(i,S,M,R,U,et,z),i.renderBufferDirect(R,null,U,et,S,z),S.onAfterShadow(i,S,M,R,U,et,z)}}}else if(D.visible){const O=E(S,D,v,x);S.onBeforeShadow(i,S,M,R,U,O,null),i.renderBufferDirect(R,null,U,O,S,null),S.onAfterShadow(i,S,M,R,U,O,null)}}const L=S.children;for(let U=0,D=L.length;U<D;U++)y(L[U],M,R,v,x)}function b(S){S.target.removeEventListener("dispose",b);for(const R in l){const v=l[R],x=S.target.uuid;x in v&&(v[x].dispose(),delete v[x])}}}const L_={[Qa]:to,[eo]:so,[no]:ro,[qi]:io,[to]:Qa,[so]:eo,[ro]:no,[io]:qi};function U_(i,t){function e(){let k=!1;const lt=new me;let Y=null;const J=new me(0,0,0,0);return{setMask:function(dt){Y!==dt&&!k&&(i.colorMask(dt,dt,dt,dt),Y=dt)},setLocked:function(dt){k=dt},setClear:function(dt,ht,Dt,fe,Te){Te===!0&&(dt*=fe,ht*=fe,Dt*=fe),lt.set(dt,ht,Dt,fe),J.equals(lt)===!1&&(i.clearColor(dt,ht,Dt,fe),J.copy(lt))},reset:function(){k=!1,Y=null,J.set(-1,0,0,0)}}}function n(){let k=!1,lt=!1,Y=null,J=null,dt=null;return{setReversed:function(ht){if(lt!==ht){const Dt=t.get("EXT_clip_control");lt?Dt.clipControlEXT(Dt.LOWER_LEFT_EXT,Dt.ZERO_TO_ONE_EXT):Dt.clipControlEXT(Dt.LOWER_LEFT_EXT,Dt.NEGATIVE_ONE_TO_ONE_EXT);const fe=dt;dt=null,this.setClear(fe)}lt=ht},getReversed:function(){return lt},setTest:function(ht){ht?ot(i.DEPTH_TEST):Et(i.DEPTH_TEST)},setMask:function(ht){Y!==ht&&!k&&(i.depthMask(ht),Y=ht)},setFunc:function(ht){if(lt&&(ht=L_[ht]),J!==ht){switch(ht){case Qa:i.depthFunc(i.NEVER);break;case to:i.depthFunc(i.ALWAYS);break;case eo:i.depthFunc(i.LESS);break;case qi:i.depthFunc(i.LEQUAL);break;case no:i.depthFunc(i.EQUAL);break;case io:i.depthFunc(i.GEQUAL);break;case so:i.depthFunc(i.GREATER);break;case ro:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}J=ht}},setLocked:function(ht){k=ht},setClear:function(ht){dt!==ht&&(lt&&(ht=1-ht),i.clearDepth(ht),dt=ht)},reset:function(){k=!1,Y=null,J=null,dt=null,lt=!1}}}function s(){let k=!1,lt=null,Y=null,J=null,dt=null,ht=null,Dt=null,fe=null,Te=null;return{setTest:function(Jt){k||(Jt?ot(i.STENCIL_TEST):Et(i.STENCIL_TEST))},setMask:function(Jt){lt!==Jt&&!k&&(i.stencilMask(Jt),lt=Jt)},setFunc:function(Jt,rn,yn){(Y!==Jt||J!==rn||dt!==yn)&&(i.stencilFunc(Jt,rn,yn),Y=Jt,J=rn,dt=yn)},setOp:function(Jt,rn,yn){(ht!==Jt||Dt!==rn||fe!==yn)&&(i.stencilOp(Jt,rn,yn),ht=Jt,Dt=rn,fe=yn)},setLocked:function(Jt){k=Jt},setClear:function(Jt){Te!==Jt&&(i.clearStencil(Jt),Te=Jt)},reset:function(){k=!1,lt=null,Y=null,J=null,dt=null,ht=null,Dt=null,fe=null,Te=null}}}const r=new e,o=new n,a=new s,c=new WeakMap,l=new WeakMap;let h={},f={},u=new WeakMap,d=[],p=null,_=!1,m=null,g=null,w=null,E=null,y=null,b=null,S=null,M=new Bt(0,0,0),R=0,v=!1,x=null,C=null,L=null,U=null,D=null;const O=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let H=!1,$=0;const z=i.getParameter(i.VERSION);z.indexOf("WebGL")!==-1?($=parseFloat(/^WebGL (\d)/.exec(z)[1]),H=$>=1):z.indexOf("OpenGL ES")!==-1&&($=parseFloat(/^OpenGL ES (\d)/.exec(z)[1]),H=$>=2);let q=null,et={};const gt=i.getParameter(i.SCISSOR_BOX),_t=i.getParameter(i.VIEWPORT),Pt=new me().fromArray(gt),Z=new me().fromArray(_t);function it(k,lt,Y,J){const dt=new Uint8Array(4),ht=i.createTexture();i.bindTexture(k,ht),i.texParameteri(k,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(k,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let Dt=0;Dt<Y;Dt++)k===i.TEXTURE_3D||k===i.TEXTURE_2D_ARRAY?i.texImage3D(lt,0,i.RGBA,1,1,J,0,i.RGBA,i.UNSIGNED_BYTE,dt):i.texImage2D(lt+Dt,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,dt);return ht}const vt={};vt[i.TEXTURE_2D]=it(i.TEXTURE_2D,i.TEXTURE_2D,1),vt[i.TEXTURE_CUBE_MAP]=it(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),vt[i.TEXTURE_2D_ARRAY]=it(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),vt[i.TEXTURE_3D]=it(i.TEXTURE_3D,i.TEXTURE_3D,1,1),r.setClear(0,0,0,1),o.setClear(1),a.setClear(0),ot(i.DEPTH_TEST),o.setFunc(qi),zt(!1),Ht(bl),ot(i.CULL_FACE),B(Yn);function ot(k){h[k]!==!0&&(i.enable(k),h[k]=!0)}function Et(k){h[k]!==!1&&(i.disable(k),h[k]=!1)}function Rt(k,lt){return f[k]!==lt?(i.bindFramebuffer(k,lt),f[k]=lt,k===i.DRAW_FRAMEBUFFER&&(f[i.FRAMEBUFFER]=lt),k===i.FRAMEBUFFER&&(f[i.DRAW_FRAMEBUFFER]=lt),!0):!1}function Nt(k,lt){let Y=d,J=!1;if(k){Y=u.get(lt),Y===void 0&&(Y=[],u.set(lt,Y));const dt=k.textures;if(Y.length!==dt.length||Y[0]!==i.COLOR_ATTACHMENT0){for(let ht=0,Dt=dt.length;ht<Dt;ht++)Y[ht]=i.COLOR_ATTACHMENT0+ht;Y.length=dt.length,J=!0}}else Y[0]!==i.BACK&&(Y[0]=i.BACK,J=!0);J&&i.drawBuffers(Y)}function ce(k){return p!==k?(i.useProgram(k),p=k,!0):!1}const Ot={[ci]:i.FUNC_ADD,[Ku]:i.FUNC_SUBTRACT,[ju]:i.FUNC_REVERSE_SUBTRACT};Ot[Ju]=i.MIN,Ot[Qu]=i.MAX;const ge={[td]:i.ZERO,[ed]:i.ONE,[nd]:i.SRC_COLOR,[ja]:i.SRC_ALPHA,[ld]:i.SRC_ALPHA_SATURATE,[ad]:i.DST_COLOR,[sd]:i.DST_ALPHA,[id]:i.ONE_MINUS_SRC_COLOR,[Ja]:i.ONE_MINUS_SRC_ALPHA,[od]:i.ONE_MINUS_DST_COLOR,[rd]:i.ONE_MINUS_DST_ALPHA,[cd]:i.CONSTANT_COLOR,[hd]:i.ONE_MINUS_CONSTANT_COLOR,[ud]:i.CONSTANT_ALPHA,[dd]:i.ONE_MINUS_CONSTANT_ALPHA};function B(k,lt,Y,J,dt,ht,Dt,fe,Te,Jt){if(k===Yn){_===!0&&(Et(i.BLEND),_=!1);return}if(_===!1&&(ot(i.BLEND),_=!0),k!==Zu){if(k!==m||Jt!==v){if((g!==ci||y!==ci)&&(i.blendEquation(i.FUNC_ADD),g=ci,y=ci),Jt)switch(k){case Vi:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Or:i.blendFunc(i.ONE,i.ONE);break;case El:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case Ka:i.blendFuncSeparate(i.ZERO,i.SRC_COLOR,i.ZERO,i.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",k);break}else switch(k){case Vi:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Or:i.blendFunc(i.SRC_ALPHA,i.ONE);break;case El:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case Ka:i.blendFunc(i.ZERO,i.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",k);break}w=null,E=null,b=null,S=null,M.set(0,0,0),R=0,m=k,v=Jt}return}dt=dt||lt,ht=ht||Y,Dt=Dt||J,(lt!==g||dt!==y)&&(i.blendEquationSeparate(Ot[lt],Ot[dt]),g=lt,y=dt),(Y!==w||J!==E||ht!==b||Dt!==S)&&(i.blendFuncSeparate(ge[Y],ge[J],ge[ht],ge[Dt]),w=Y,E=J,b=ht,S=Dt),(fe.equals(M)===!1||Te!==R)&&(i.blendColor(fe.r,fe.g,fe.b,Te),M.copy(fe),R=Te),m=k,v=!1}function Ke(k,lt){k.side===He?Et(i.CULL_FACE):ot(i.CULL_FACE);let Y=k.side===Ue;lt&&(Y=!Y),zt(Y),k.blending===Vi&&k.transparent===!1?B(Yn):B(k.blending,k.blendEquation,k.blendSrc,k.blendDst,k.blendEquationAlpha,k.blendSrcAlpha,k.blendDstAlpha,k.blendColor,k.blendAlpha,k.premultipliedAlpha),o.setFunc(k.depthFunc),o.setTest(k.depthTest),o.setMask(k.depthWrite),r.setMask(k.colorWrite);const J=k.stencilWrite;a.setTest(J),J&&(a.setMask(k.stencilWriteMask),a.setFunc(k.stencilFunc,k.stencilRef,k.stencilFuncMask),a.setOp(k.stencilFail,k.stencilZFail,k.stencilZPass)),re(k.polygonOffset,k.polygonOffsetFactor,k.polygonOffsetUnits),k.alphaToCoverage===!0?ot(i.SAMPLE_ALPHA_TO_COVERAGE):Et(i.SAMPLE_ALPHA_TO_COVERAGE)}function zt(k){x!==k&&(k?i.frontFace(i.CW):i.frontFace(i.CCW),x=k)}function Ht(k){k!==$u?(ot(i.CULL_FACE),k!==C&&(k===bl?i.cullFace(i.BACK):k===Yu?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):Et(i.CULL_FACE),C=k}function Tt(k){k!==L&&(H&&i.lineWidth(k),L=k)}function re(k,lt,Y){k?(ot(i.POLYGON_OFFSET_FILL),(U!==lt||D!==Y)&&(i.polygonOffset(lt,Y),U=lt,D=Y)):Et(i.POLYGON_OFFSET_FILL)}function bt(k){k?ot(i.SCISSOR_TEST):Et(i.SCISSOR_TEST)}function P(k){k===void 0&&(k=i.TEXTURE0+O-1),q!==k&&(i.activeTexture(k),q=k)}function T(k,lt,Y){Y===void 0&&(q===null?Y=i.TEXTURE0+O-1:Y=q);let J=et[Y];J===void 0&&(J={type:void 0,texture:void 0},et[Y]=J),(J.type!==k||J.texture!==lt)&&(q!==Y&&(i.activeTexture(Y),q=Y),i.bindTexture(k,lt||vt[k]),J.type=k,J.texture=lt)}function V(){const k=et[q];k!==void 0&&k.type!==void 0&&(i.bindTexture(k.type,null),k.type=void 0,k.texture=void 0)}function j(){try{i.compressedTexImage2D.apply(i,arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function tt(){try{i.compressedTexImage3D.apply(i,arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function K(){try{i.texSubImage2D.apply(i,arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function St(){try{i.texSubImage3D.apply(i,arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function ct(){try{i.compressedTexSubImage2D.apply(i,arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function ft(){try{i.compressedTexSubImage3D.apply(i,arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function Vt(){try{i.texStorage2D.apply(i,arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function st(){try{i.texStorage3D.apply(i,arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function pt(){try{i.texImage2D.apply(i,arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function At(){try{i.texImage3D.apply(i,arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function Ct(k){Pt.equals(k)===!1&&(i.scissor(k.x,k.y,k.z,k.w),Pt.copy(k))}function mt(k){Z.equals(k)===!1&&(i.viewport(k.x,k.y,k.z,k.w),Z.copy(k))}function Gt(k,lt){let Y=l.get(lt);Y===void 0&&(Y=new WeakMap,l.set(lt,Y));let J=Y.get(k);J===void 0&&(J=i.getUniformBlockIndex(lt,k.name),Y.set(k,J))}function kt(k,lt){const J=l.get(lt).get(k);c.get(lt)!==J&&(i.uniformBlockBinding(lt,J,k.__bindingPointIndex),c.set(lt,J))}function ne(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),o.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),h={},q=null,et={},f={},u=new WeakMap,d=[],p=null,_=!1,m=null,g=null,w=null,E=null,y=null,b=null,S=null,M=new Bt(0,0,0),R=0,v=!1,x=null,C=null,L=null,U=null,D=null,Pt.set(0,0,i.canvas.width,i.canvas.height),Z.set(0,0,i.canvas.width,i.canvas.height),r.reset(),o.reset(),a.reset()}return{buffers:{color:r,depth:o,stencil:a},enable:ot,disable:Et,bindFramebuffer:Rt,drawBuffers:Nt,useProgram:ce,setBlending:B,setMaterial:Ke,setFlipSided:zt,setCullFace:Ht,setLineWidth:Tt,setPolygonOffset:re,setScissorTest:bt,activeTexture:P,bindTexture:T,unbindTexture:V,compressedTexImage2D:j,compressedTexImage3D:tt,texImage2D:pt,texImage3D:At,updateUBOMapping:Gt,uniformBlockBinding:kt,texStorage2D:Vt,texStorage3D:st,texSubImage2D:K,texSubImage3D:St,compressedTexSubImage2D:ct,compressedTexSubImage3D:ft,scissor:Ct,viewport:mt,reset:ne}}function xc(i,t,e,n){const s=k_(n);switch(e){case Eh:return i*t;case Ah:return i*t;case Ch:return i*t*2;case Rh:return i*t/s.components*s.byteLength;case tl:return i*t/s.components*s.byteLength;case Ih:return i*t*2/s.components*s.byteLength;case el:return i*t*2/s.components*s.byteLength;case Th:return i*t*3/s.components*s.byteLength;case hn:return i*t*4/s.components*s.byteLength;case nl:return i*t*4/s.components*s.byteLength;case Ir:case Pr:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case Dr:case Lr:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case ho:case fo:return Math.max(i,16)*Math.max(t,8)/4;case co:case uo:return Math.max(i,8)*Math.max(t,8)/2;case po:case mo:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case go:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case _o:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case vo:return Math.floor((i+4)/5)*Math.floor((t+3)/4)*16;case xo:return Math.floor((i+4)/5)*Math.floor((t+4)/5)*16;case yo:return Math.floor((i+5)/6)*Math.floor((t+4)/5)*16;case Mo:return Math.floor((i+5)/6)*Math.floor((t+5)/6)*16;case So:return Math.floor((i+7)/8)*Math.floor((t+4)/5)*16;case wo:return Math.floor((i+7)/8)*Math.floor((t+5)/6)*16;case bo:return Math.floor((i+7)/8)*Math.floor((t+7)/8)*16;case Eo:return Math.floor((i+9)/10)*Math.floor((t+4)/5)*16;case To:return Math.floor((i+9)/10)*Math.floor((t+5)/6)*16;case Ao:return Math.floor((i+9)/10)*Math.floor((t+7)/8)*16;case Co:return Math.floor((i+9)/10)*Math.floor((t+9)/10)*16;case Ro:return Math.floor((i+11)/12)*Math.floor((t+9)/10)*16;case Io:return Math.floor((i+11)/12)*Math.floor((t+11)/12)*16;case Ur:case Po:case Do:return Math.ceil(i/4)*Math.ceil(t/4)*16;case Ph:case Lo:return Math.ceil(i/4)*Math.ceil(t/4)*8;case Uo:case ko:return Math.ceil(i/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function k_(i){switch(i){case kn:case Sh:return{byteLength:1,components:1};case Is:case wh:case Os:return{byteLength:2,components:1};case Jo:case Qo:return{byteLength:2,components:4};case gi:case jo:case In:return{byteLength:4,components:1};case bh:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${i}.`)}function F_(i,t,e,n,s,r,o){const a=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),l=new jt,h=new WeakMap;let f;const u=new WeakMap;let d=!1;try{d=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function p(P,T){return d?new OffscreenCanvas(P,T):Ps("canvas")}function _(P,T,V){let j=1;const tt=bt(P);if((tt.width>V||tt.height>V)&&(j=V/Math.max(tt.width,tt.height)),j<1)if(typeof HTMLImageElement<"u"&&P instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&P instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&P instanceof ImageBitmap||typeof VideoFrame<"u"&&P instanceof VideoFrame){const K=Math.floor(j*tt.width),St=Math.floor(j*tt.height);f===void 0&&(f=p(K,St));const ct=T?p(K,St):f;return ct.width=K,ct.height=St,ct.getContext("2d").drawImage(P,0,0,K,St),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+tt.width+"x"+tt.height+") to ("+K+"x"+St+")."),ct}else return"data"in P&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+tt.width+"x"+tt.height+")."),P;return P}function m(P){return P.generateMipmaps}function g(P){i.generateMipmap(P)}function w(P){return P.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:P.isWebGL3DRenderTarget?i.TEXTURE_3D:P.isWebGLArrayRenderTarget||P.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function E(P,T,V,j,tt=!1){if(P!==null){if(i[P]!==void 0)return i[P];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+P+"'")}let K=T;if(T===i.RED&&(V===i.FLOAT&&(K=i.R32F),V===i.HALF_FLOAT&&(K=i.R16F),V===i.UNSIGNED_BYTE&&(K=i.R8)),T===i.RED_INTEGER&&(V===i.UNSIGNED_BYTE&&(K=i.R8UI),V===i.UNSIGNED_SHORT&&(K=i.R16UI),V===i.UNSIGNED_INT&&(K=i.R32UI),V===i.BYTE&&(K=i.R8I),V===i.SHORT&&(K=i.R16I),V===i.INT&&(K=i.R32I)),T===i.RG&&(V===i.FLOAT&&(K=i.RG32F),V===i.HALF_FLOAT&&(K=i.RG16F),V===i.UNSIGNED_BYTE&&(K=i.RG8)),T===i.RG_INTEGER&&(V===i.UNSIGNED_BYTE&&(K=i.RG8UI),V===i.UNSIGNED_SHORT&&(K=i.RG16UI),V===i.UNSIGNED_INT&&(K=i.RG32UI),V===i.BYTE&&(K=i.RG8I),V===i.SHORT&&(K=i.RG16I),V===i.INT&&(K=i.RG32I)),T===i.RGB_INTEGER&&(V===i.UNSIGNED_BYTE&&(K=i.RGB8UI),V===i.UNSIGNED_SHORT&&(K=i.RGB16UI),V===i.UNSIGNED_INT&&(K=i.RGB32UI),V===i.BYTE&&(K=i.RGB8I),V===i.SHORT&&(K=i.RGB16I),V===i.INT&&(K=i.RGB32I)),T===i.RGBA_INTEGER&&(V===i.UNSIGNED_BYTE&&(K=i.RGBA8UI),V===i.UNSIGNED_SHORT&&(K=i.RGBA16UI),V===i.UNSIGNED_INT&&(K=i.RGBA32UI),V===i.BYTE&&(K=i.RGBA8I),V===i.SHORT&&(K=i.RGBA16I),V===i.INT&&(K=i.RGBA32I)),T===i.RGB&&V===i.UNSIGNED_INT_5_9_9_9_REV&&(K=i.RGB9_E5),T===i.RGBA){const St=tt?Kr:Wt.getTransfer(j);V===i.FLOAT&&(K=i.RGBA32F),V===i.HALF_FLOAT&&(K=i.RGBA16F),V===i.UNSIGNED_BYTE&&(K=St===te?i.SRGB8_ALPHA8:i.RGBA8),V===i.UNSIGNED_SHORT_4_4_4_4&&(K=i.RGBA4),V===i.UNSIGNED_SHORT_5_5_5_1&&(K=i.RGB5_A1)}return(K===i.R16F||K===i.R32F||K===i.RG16F||K===i.RG32F||K===i.RGBA16F||K===i.RGBA32F)&&t.get("EXT_color_buffer_float"),K}function y(P,T){let V;return P?T===null||T===gi||T===ji?V=i.DEPTH24_STENCIL8:T===In?V=i.DEPTH32F_STENCIL8:T===Is&&(V=i.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):T===null||T===gi||T===ji?V=i.DEPTH_COMPONENT24:T===In?V=i.DEPTH_COMPONENT32F:T===Is&&(V=i.DEPTH_COMPONENT16),V}function b(P,T){return m(P)===!0||P.isFramebufferTexture&&P.minFilter!==qt&&P.minFilter!==en?Math.log2(Math.max(T.width,T.height))+1:P.mipmaps!==void 0&&P.mipmaps.length>0?P.mipmaps.length:P.isCompressedTexture&&Array.isArray(P.image)?T.mipmaps.length:1}function S(P){const T=P.target;T.removeEventListener("dispose",S),R(T),T.isVideoTexture&&h.delete(T)}function M(P){const T=P.target;T.removeEventListener("dispose",M),x(T)}function R(P){const T=n.get(P);if(T.__webglInit===void 0)return;const V=P.source,j=u.get(V);if(j){const tt=j[T.__cacheKey];tt.usedTimes--,tt.usedTimes===0&&v(P),Object.keys(j).length===0&&u.delete(V)}n.remove(P)}function v(P){const T=n.get(P);i.deleteTexture(T.__webglTexture);const V=P.source,j=u.get(V);delete j[T.__cacheKey],o.memory.textures--}function x(P){const T=n.get(P);if(P.depthTexture&&(P.depthTexture.dispose(),n.remove(P.depthTexture)),P.isWebGLCubeRenderTarget)for(let j=0;j<6;j++){if(Array.isArray(T.__webglFramebuffer[j]))for(let tt=0;tt<T.__webglFramebuffer[j].length;tt++)i.deleteFramebuffer(T.__webglFramebuffer[j][tt]);else i.deleteFramebuffer(T.__webglFramebuffer[j]);T.__webglDepthbuffer&&i.deleteRenderbuffer(T.__webglDepthbuffer[j])}else{if(Array.isArray(T.__webglFramebuffer))for(let j=0;j<T.__webglFramebuffer.length;j++)i.deleteFramebuffer(T.__webglFramebuffer[j]);else i.deleteFramebuffer(T.__webglFramebuffer);if(T.__webglDepthbuffer&&i.deleteRenderbuffer(T.__webglDepthbuffer),T.__webglMultisampledFramebuffer&&i.deleteFramebuffer(T.__webglMultisampledFramebuffer),T.__webglColorRenderbuffer)for(let j=0;j<T.__webglColorRenderbuffer.length;j++)T.__webglColorRenderbuffer[j]&&i.deleteRenderbuffer(T.__webglColorRenderbuffer[j]);T.__webglDepthRenderbuffer&&i.deleteRenderbuffer(T.__webglDepthRenderbuffer)}const V=P.textures;for(let j=0,tt=V.length;j<tt;j++){const K=n.get(V[j]);K.__webglTexture&&(i.deleteTexture(K.__webglTexture),o.memory.textures--),n.remove(V[j])}n.remove(P)}let C=0;function L(){C=0}function U(){const P=C;return P>=s.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+P+" texture units while this GPU supports only "+s.maxTextures),C+=1,P}function D(P){const T=[];return T.push(P.wrapS),T.push(P.wrapT),T.push(P.wrapR||0),T.push(P.magFilter),T.push(P.minFilter),T.push(P.anisotropy),T.push(P.internalFormat),T.push(P.format),T.push(P.type),T.push(P.generateMipmaps),T.push(P.premultiplyAlpha),T.push(P.flipY),T.push(P.unpackAlignment),T.push(P.colorSpace),T.join()}function O(P,T){const V=n.get(P);if(P.isVideoTexture&&Tt(P),P.isRenderTargetTexture===!1&&P.version>0&&V.__version!==P.version){const j=P.image;if(j===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(j.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{Z(V,P,T);return}}e.bindTexture(i.TEXTURE_2D,V.__webglTexture,i.TEXTURE0+T)}function H(P,T){const V=n.get(P);if(P.version>0&&V.__version!==P.version){Z(V,P,T);return}e.bindTexture(i.TEXTURE_2D_ARRAY,V.__webglTexture,i.TEXTURE0+T)}function $(P,T){const V=n.get(P);if(P.version>0&&V.__version!==P.version){Z(V,P,T);return}e.bindTexture(i.TEXTURE_3D,V.__webglTexture,i.TEXTURE0+T)}function z(P,T){const V=n.get(P);if(P.version>0&&V.__version!==P.version){it(V,P,T);return}e.bindTexture(i.TEXTURE_CUBE_MAP,V.__webglTexture,i.TEXTURE0+T)}const q={[Rs]:i.REPEAT,[ui]:i.CLAMP_TO_EDGE,[lo]:i.MIRRORED_REPEAT},et={[qt]:i.NEAREST,[Sd]:i.NEAREST_MIPMAP_NEAREST,[Ks]:i.NEAREST_MIPMAP_LINEAR,[en]:i.LINEAR,[ia]:i.LINEAR_MIPMAP_NEAREST,[di]:i.LINEAR_MIPMAP_LINEAR},gt={[Td]:i.NEVER,[Dd]:i.ALWAYS,[Ad]:i.LESS,[Lh]:i.LEQUAL,[Cd]:i.EQUAL,[Pd]:i.GEQUAL,[Rd]:i.GREATER,[Id]:i.NOTEQUAL};function _t(P,T){if(T.type===In&&t.has("OES_texture_float_linear")===!1&&(T.magFilter===en||T.magFilter===ia||T.magFilter===Ks||T.magFilter===di||T.minFilter===en||T.minFilter===ia||T.minFilter===Ks||T.minFilter===di)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(P,i.TEXTURE_WRAP_S,q[T.wrapS]),i.texParameteri(P,i.TEXTURE_WRAP_T,q[T.wrapT]),(P===i.TEXTURE_3D||P===i.TEXTURE_2D_ARRAY)&&i.texParameteri(P,i.TEXTURE_WRAP_R,q[T.wrapR]),i.texParameteri(P,i.TEXTURE_MAG_FILTER,et[T.magFilter]),i.texParameteri(P,i.TEXTURE_MIN_FILTER,et[T.minFilter]),T.compareFunction&&(i.texParameteri(P,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(P,i.TEXTURE_COMPARE_FUNC,gt[T.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(T.magFilter===qt||T.minFilter!==Ks&&T.minFilter!==di||T.type===In&&t.has("OES_texture_float_linear")===!1)return;if(T.anisotropy>1||n.get(T).__currentAnisotropy){const V=t.get("EXT_texture_filter_anisotropic");i.texParameterf(P,V.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(T.anisotropy,s.getMaxAnisotropy())),n.get(T).__currentAnisotropy=T.anisotropy}}}function Pt(P,T){let V=!1;P.__webglInit===void 0&&(P.__webglInit=!0,T.addEventListener("dispose",S));const j=T.source;let tt=u.get(j);tt===void 0&&(tt={},u.set(j,tt));const K=D(T);if(K!==P.__cacheKey){tt[K]===void 0&&(tt[K]={texture:i.createTexture(),usedTimes:0},o.memory.textures++,V=!0),tt[K].usedTimes++;const St=tt[P.__cacheKey];St!==void 0&&(tt[P.__cacheKey].usedTimes--,St.usedTimes===0&&v(T)),P.__cacheKey=K,P.__webglTexture=tt[K].texture}return V}function Z(P,T,V){let j=i.TEXTURE_2D;(T.isDataArrayTexture||T.isCompressedArrayTexture)&&(j=i.TEXTURE_2D_ARRAY),T.isData3DTexture&&(j=i.TEXTURE_3D);const tt=Pt(P,T),K=T.source;e.bindTexture(j,P.__webglTexture,i.TEXTURE0+V);const St=n.get(K);if(K.version!==St.__version||tt===!0){e.activeTexture(i.TEXTURE0+V);const ct=Wt.getPrimaries(Wt.workingColorSpace),ft=T.colorSpace===Wn?null:Wt.getPrimaries(T.colorSpace),Vt=T.colorSpace===Wn||ct===ft?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,T.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,T.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,T.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,Vt);let st=_(T.image,!1,s.maxTextureSize);st=re(T,st);const pt=r.convert(T.format,T.colorSpace),At=r.convert(T.type);let Ct=E(T.internalFormat,pt,At,T.colorSpace,T.isVideoTexture);_t(j,T);let mt;const Gt=T.mipmaps,kt=T.isVideoTexture!==!0,ne=St.__version===void 0||tt===!0,k=K.dataReady,lt=b(T,st);if(T.isDepthTexture)Ct=y(T.format===Ji,T.type),ne&&(kt?e.texStorage2D(i.TEXTURE_2D,1,Ct,st.width,st.height):e.texImage2D(i.TEXTURE_2D,0,Ct,st.width,st.height,0,pt,At,null));else if(T.isDataTexture)if(Gt.length>0){kt&&ne&&e.texStorage2D(i.TEXTURE_2D,lt,Ct,Gt[0].width,Gt[0].height);for(let Y=0,J=Gt.length;Y<J;Y++)mt=Gt[Y],kt?k&&e.texSubImage2D(i.TEXTURE_2D,Y,0,0,mt.width,mt.height,pt,At,mt.data):e.texImage2D(i.TEXTURE_2D,Y,Ct,mt.width,mt.height,0,pt,At,mt.data);T.generateMipmaps=!1}else kt?(ne&&e.texStorage2D(i.TEXTURE_2D,lt,Ct,st.width,st.height),k&&e.texSubImage2D(i.TEXTURE_2D,0,0,0,st.width,st.height,pt,At,st.data)):e.texImage2D(i.TEXTURE_2D,0,Ct,st.width,st.height,0,pt,At,st.data);else if(T.isCompressedTexture)if(T.isCompressedArrayTexture){kt&&ne&&e.texStorage3D(i.TEXTURE_2D_ARRAY,lt,Ct,Gt[0].width,Gt[0].height,st.depth);for(let Y=0,J=Gt.length;Y<J;Y++)if(mt=Gt[Y],T.format!==hn)if(pt!==null)if(kt){if(k)if(T.layerUpdates.size>0){const dt=xc(mt.width,mt.height,T.format,T.type);for(const ht of T.layerUpdates){const Dt=mt.data.subarray(ht*dt/mt.data.BYTES_PER_ELEMENT,(ht+1)*dt/mt.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,Y,0,0,ht,mt.width,mt.height,1,pt,Dt)}T.clearLayerUpdates()}else e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,Y,0,0,0,mt.width,mt.height,st.depth,pt,mt.data)}else e.compressedTexImage3D(i.TEXTURE_2D_ARRAY,Y,Ct,mt.width,mt.height,st.depth,0,mt.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else kt?k&&e.texSubImage3D(i.TEXTURE_2D_ARRAY,Y,0,0,0,mt.width,mt.height,st.depth,pt,At,mt.data):e.texImage3D(i.TEXTURE_2D_ARRAY,Y,Ct,mt.width,mt.height,st.depth,0,pt,At,mt.data)}else{kt&&ne&&e.texStorage2D(i.TEXTURE_2D,lt,Ct,Gt[0].width,Gt[0].height);for(let Y=0,J=Gt.length;Y<J;Y++)mt=Gt[Y],T.format!==hn?pt!==null?kt?k&&e.compressedTexSubImage2D(i.TEXTURE_2D,Y,0,0,mt.width,mt.height,pt,mt.data):e.compressedTexImage2D(i.TEXTURE_2D,Y,Ct,mt.width,mt.height,0,mt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):kt?k&&e.texSubImage2D(i.TEXTURE_2D,Y,0,0,mt.width,mt.height,pt,At,mt.data):e.texImage2D(i.TEXTURE_2D,Y,Ct,mt.width,mt.height,0,pt,At,mt.data)}else if(T.isDataArrayTexture)if(kt){if(ne&&e.texStorage3D(i.TEXTURE_2D_ARRAY,lt,Ct,st.width,st.height,st.depth),k)if(T.layerUpdates.size>0){const Y=xc(st.width,st.height,T.format,T.type);for(const J of T.layerUpdates){const dt=st.data.subarray(J*Y/st.data.BYTES_PER_ELEMENT,(J+1)*Y/st.data.BYTES_PER_ELEMENT);e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,J,st.width,st.height,1,pt,At,dt)}T.clearLayerUpdates()}else e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,st.width,st.height,st.depth,pt,At,st.data)}else e.texImage3D(i.TEXTURE_2D_ARRAY,0,Ct,st.width,st.height,st.depth,0,pt,At,st.data);else if(T.isData3DTexture)kt?(ne&&e.texStorage3D(i.TEXTURE_3D,lt,Ct,st.width,st.height,st.depth),k&&e.texSubImage3D(i.TEXTURE_3D,0,0,0,0,st.width,st.height,st.depth,pt,At,st.data)):e.texImage3D(i.TEXTURE_3D,0,Ct,st.width,st.height,st.depth,0,pt,At,st.data);else if(T.isFramebufferTexture){if(ne)if(kt)e.texStorage2D(i.TEXTURE_2D,lt,Ct,st.width,st.height);else{let Y=st.width,J=st.height;for(let dt=0;dt<lt;dt++)e.texImage2D(i.TEXTURE_2D,dt,Ct,Y,J,0,pt,At,null),Y>>=1,J>>=1}}else if(Gt.length>0){if(kt&&ne){const Y=bt(Gt[0]);e.texStorage2D(i.TEXTURE_2D,lt,Ct,Y.width,Y.height)}for(let Y=0,J=Gt.length;Y<J;Y++)mt=Gt[Y],kt?k&&e.texSubImage2D(i.TEXTURE_2D,Y,0,0,pt,At,mt):e.texImage2D(i.TEXTURE_2D,Y,Ct,pt,At,mt);T.generateMipmaps=!1}else if(kt){if(ne){const Y=bt(st);e.texStorage2D(i.TEXTURE_2D,lt,Ct,Y.width,Y.height)}k&&e.texSubImage2D(i.TEXTURE_2D,0,0,0,pt,At,st)}else e.texImage2D(i.TEXTURE_2D,0,Ct,pt,At,st);m(T)&&g(j),St.__version=K.version,T.onUpdate&&T.onUpdate(T)}P.__version=T.version}function it(P,T,V){if(T.image.length!==6)return;const j=Pt(P,T),tt=T.source;e.bindTexture(i.TEXTURE_CUBE_MAP,P.__webglTexture,i.TEXTURE0+V);const K=n.get(tt);if(tt.version!==K.__version||j===!0){e.activeTexture(i.TEXTURE0+V);const St=Wt.getPrimaries(Wt.workingColorSpace),ct=T.colorSpace===Wn?null:Wt.getPrimaries(T.colorSpace),ft=T.colorSpace===Wn||St===ct?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,T.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,T.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,T.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,ft);const Vt=T.isCompressedTexture||T.image[0].isCompressedTexture,st=T.image[0]&&T.image[0].isDataTexture,pt=[];for(let J=0;J<6;J++)!Vt&&!st?pt[J]=_(T.image[J],!0,s.maxCubemapSize):pt[J]=st?T.image[J].image:T.image[J],pt[J]=re(T,pt[J]);const At=pt[0],Ct=r.convert(T.format,T.colorSpace),mt=r.convert(T.type),Gt=E(T.internalFormat,Ct,mt,T.colorSpace),kt=T.isVideoTexture!==!0,ne=K.__version===void 0||j===!0,k=tt.dataReady;let lt=b(T,At);_t(i.TEXTURE_CUBE_MAP,T);let Y;if(Vt){kt&&ne&&e.texStorage2D(i.TEXTURE_CUBE_MAP,lt,Gt,At.width,At.height);for(let J=0;J<6;J++){Y=pt[J].mipmaps;for(let dt=0;dt<Y.length;dt++){const ht=Y[dt];T.format!==hn?Ct!==null?kt?k&&e.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+J,dt,0,0,ht.width,ht.height,Ct,ht.data):e.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+J,dt,Gt,ht.width,ht.height,0,ht.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):kt?k&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+J,dt,0,0,ht.width,ht.height,Ct,mt,ht.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+J,dt,Gt,ht.width,ht.height,0,Ct,mt,ht.data)}}}else{if(Y=T.mipmaps,kt&&ne){Y.length>0&&lt++;const J=bt(pt[0]);e.texStorage2D(i.TEXTURE_CUBE_MAP,lt,Gt,J.width,J.height)}for(let J=0;J<6;J++)if(st){kt?k&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+J,0,0,0,pt[J].width,pt[J].height,Ct,mt,pt[J].data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+J,0,Gt,pt[J].width,pt[J].height,0,Ct,mt,pt[J].data);for(let dt=0;dt<Y.length;dt++){const Dt=Y[dt].image[J].image;kt?k&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+J,dt+1,0,0,Dt.width,Dt.height,Ct,mt,Dt.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+J,dt+1,Gt,Dt.width,Dt.height,0,Ct,mt,Dt.data)}}else{kt?k&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+J,0,0,0,Ct,mt,pt[J]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+J,0,Gt,Ct,mt,pt[J]);for(let dt=0;dt<Y.length;dt++){const ht=Y[dt];kt?k&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+J,dt+1,0,0,Ct,mt,ht.image[J]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+J,dt+1,Gt,Ct,mt,ht.image[J])}}}m(T)&&g(i.TEXTURE_CUBE_MAP),K.__version=tt.version,T.onUpdate&&T.onUpdate(T)}P.__version=T.version}function vt(P,T,V,j,tt,K){const St=r.convert(V.format,V.colorSpace),ct=r.convert(V.type),ft=E(V.internalFormat,St,ct,V.colorSpace),Vt=n.get(T),st=n.get(V);if(st.__renderTarget=T,!Vt.__hasExternalTextures){const pt=Math.max(1,T.width>>K),At=Math.max(1,T.height>>K);tt===i.TEXTURE_3D||tt===i.TEXTURE_2D_ARRAY?e.texImage3D(tt,K,ft,pt,At,T.depth,0,St,ct,null):e.texImage2D(tt,K,ft,pt,At,0,St,ct,null)}e.bindFramebuffer(i.FRAMEBUFFER,P),Ht(T)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,j,tt,st.__webglTexture,0,zt(T)):(tt===i.TEXTURE_2D||tt>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&tt<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,j,tt,st.__webglTexture,K),e.bindFramebuffer(i.FRAMEBUFFER,null)}function ot(P,T,V){if(i.bindRenderbuffer(i.RENDERBUFFER,P),T.depthBuffer){const j=T.depthTexture,tt=j&&j.isDepthTexture?j.type:null,K=y(T.stencilBuffer,tt),St=T.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,ct=zt(T);Ht(T)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,ct,K,T.width,T.height):V?i.renderbufferStorageMultisample(i.RENDERBUFFER,ct,K,T.width,T.height):i.renderbufferStorage(i.RENDERBUFFER,K,T.width,T.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,St,i.RENDERBUFFER,P)}else{const j=T.textures;for(let tt=0;tt<j.length;tt++){const K=j[tt],St=r.convert(K.format,K.colorSpace),ct=r.convert(K.type),ft=E(K.internalFormat,St,ct,K.colorSpace),Vt=zt(T);V&&Ht(T)===!1?i.renderbufferStorageMultisample(i.RENDERBUFFER,Vt,ft,T.width,T.height):Ht(T)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,Vt,ft,T.width,T.height):i.renderbufferStorage(i.RENDERBUFFER,ft,T.width,T.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function Et(P,T){if(T&&T.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(e.bindFramebuffer(i.FRAMEBUFFER,P),!(T.depthTexture&&T.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const j=n.get(T.depthTexture);j.__renderTarget=T,(!j.__webglTexture||T.depthTexture.image.width!==T.width||T.depthTexture.image.height!==T.height)&&(T.depthTexture.image.width=T.width,T.depthTexture.image.height=T.height,T.depthTexture.needsUpdate=!0),O(T.depthTexture,0);const tt=j.__webglTexture,K=zt(T);if(T.depthTexture.format===Wi)Ht(T)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,tt,0,K):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,tt,0);else if(T.depthTexture.format===Ji)Ht(T)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,tt,0,K):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,tt,0);else throw new Error("Unknown depthTexture format")}function Rt(P){const T=n.get(P),V=P.isWebGLCubeRenderTarget===!0;if(T.__boundDepthTexture!==P.depthTexture){const j=P.depthTexture;if(T.__depthDisposeCallback&&T.__depthDisposeCallback(),j){const tt=()=>{delete T.__boundDepthTexture,delete T.__depthDisposeCallback,j.removeEventListener("dispose",tt)};j.addEventListener("dispose",tt),T.__depthDisposeCallback=tt}T.__boundDepthTexture=j}if(P.depthTexture&&!T.__autoAllocateDepthBuffer){if(V)throw new Error("target.depthTexture not supported in Cube render targets");Et(T.__webglFramebuffer,P)}else if(V){T.__webglDepthbuffer=[];for(let j=0;j<6;j++)if(e.bindFramebuffer(i.FRAMEBUFFER,T.__webglFramebuffer[j]),T.__webglDepthbuffer[j]===void 0)T.__webglDepthbuffer[j]=i.createRenderbuffer(),ot(T.__webglDepthbuffer[j],P,!1);else{const tt=P.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,K=T.__webglDepthbuffer[j];i.bindRenderbuffer(i.RENDERBUFFER,K),i.framebufferRenderbuffer(i.FRAMEBUFFER,tt,i.RENDERBUFFER,K)}}else if(e.bindFramebuffer(i.FRAMEBUFFER,T.__webglFramebuffer),T.__webglDepthbuffer===void 0)T.__webglDepthbuffer=i.createRenderbuffer(),ot(T.__webglDepthbuffer,P,!1);else{const j=P.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,tt=T.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,tt),i.framebufferRenderbuffer(i.FRAMEBUFFER,j,i.RENDERBUFFER,tt)}e.bindFramebuffer(i.FRAMEBUFFER,null)}function Nt(P,T,V){const j=n.get(P);T!==void 0&&vt(j.__webglFramebuffer,P,P.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),V!==void 0&&Rt(P)}function ce(P){const T=P.texture,V=n.get(P),j=n.get(T);P.addEventListener("dispose",M);const tt=P.textures,K=P.isWebGLCubeRenderTarget===!0,St=tt.length>1;if(St||(j.__webglTexture===void 0&&(j.__webglTexture=i.createTexture()),j.__version=T.version,o.memory.textures++),K){V.__webglFramebuffer=[];for(let ct=0;ct<6;ct++)if(T.mipmaps&&T.mipmaps.length>0){V.__webglFramebuffer[ct]=[];for(let ft=0;ft<T.mipmaps.length;ft++)V.__webglFramebuffer[ct][ft]=i.createFramebuffer()}else V.__webglFramebuffer[ct]=i.createFramebuffer()}else{if(T.mipmaps&&T.mipmaps.length>0){V.__webglFramebuffer=[];for(let ct=0;ct<T.mipmaps.length;ct++)V.__webglFramebuffer[ct]=i.createFramebuffer()}else V.__webglFramebuffer=i.createFramebuffer();if(St)for(let ct=0,ft=tt.length;ct<ft;ct++){const Vt=n.get(tt[ct]);Vt.__webglTexture===void 0&&(Vt.__webglTexture=i.createTexture(),o.memory.textures++)}if(P.samples>0&&Ht(P)===!1){V.__webglMultisampledFramebuffer=i.createFramebuffer(),V.__webglColorRenderbuffer=[],e.bindFramebuffer(i.FRAMEBUFFER,V.__webglMultisampledFramebuffer);for(let ct=0;ct<tt.length;ct++){const ft=tt[ct];V.__webglColorRenderbuffer[ct]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,V.__webglColorRenderbuffer[ct]);const Vt=r.convert(ft.format,ft.colorSpace),st=r.convert(ft.type),pt=E(ft.internalFormat,Vt,st,ft.colorSpace,P.isXRRenderTarget===!0),At=zt(P);i.renderbufferStorageMultisample(i.RENDERBUFFER,At,pt,P.width,P.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+ct,i.RENDERBUFFER,V.__webglColorRenderbuffer[ct])}i.bindRenderbuffer(i.RENDERBUFFER,null),P.depthBuffer&&(V.__webglDepthRenderbuffer=i.createRenderbuffer(),ot(V.__webglDepthRenderbuffer,P,!0)),e.bindFramebuffer(i.FRAMEBUFFER,null)}}if(K){e.bindTexture(i.TEXTURE_CUBE_MAP,j.__webglTexture),_t(i.TEXTURE_CUBE_MAP,T);for(let ct=0;ct<6;ct++)if(T.mipmaps&&T.mipmaps.length>0)for(let ft=0;ft<T.mipmaps.length;ft++)vt(V.__webglFramebuffer[ct][ft],P,T,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+ct,ft);else vt(V.__webglFramebuffer[ct],P,T,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+ct,0);m(T)&&g(i.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(St){for(let ct=0,ft=tt.length;ct<ft;ct++){const Vt=tt[ct],st=n.get(Vt);e.bindTexture(i.TEXTURE_2D,st.__webglTexture),_t(i.TEXTURE_2D,Vt),vt(V.__webglFramebuffer,P,Vt,i.COLOR_ATTACHMENT0+ct,i.TEXTURE_2D,0),m(Vt)&&g(i.TEXTURE_2D)}e.unbindTexture()}else{let ct=i.TEXTURE_2D;if((P.isWebGL3DRenderTarget||P.isWebGLArrayRenderTarget)&&(ct=P.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),e.bindTexture(ct,j.__webglTexture),_t(ct,T),T.mipmaps&&T.mipmaps.length>0)for(let ft=0;ft<T.mipmaps.length;ft++)vt(V.__webglFramebuffer[ft],P,T,i.COLOR_ATTACHMENT0,ct,ft);else vt(V.__webglFramebuffer,P,T,i.COLOR_ATTACHMENT0,ct,0);m(T)&&g(ct),e.unbindTexture()}P.depthBuffer&&Rt(P)}function Ot(P){const T=P.textures;for(let V=0,j=T.length;V<j;V++){const tt=T[V];if(m(tt)){const K=w(P),St=n.get(tt).__webglTexture;e.bindTexture(K,St),g(K),e.unbindTexture()}}}const ge=[],B=[];function Ke(P){if(P.samples>0){if(Ht(P)===!1){const T=P.textures,V=P.width,j=P.height;let tt=i.COLOR_BUFFER_BIT;const K=P.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,St=n.get(P),ct=T.length>1;if(ct)for(let ft=0;ft<T.length;ft++)e.bindFramebuffer(i.FRAMEBUFFER,St.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+ft,i.RENDERBUFFER,null),e.bindFramebuffer(i.FRAMEBUFFER,St.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+ft,i.TEXTURE_2D,null,0);e.bindFramebuffer(i.READ_FRAMEBUFFER,St.__webglMultisampledFramebuffer),e.bindFramebuffer(i.DRAW_FRAMEBUFFER,St.__webglFramebuffer);for(let ft=0;ft<T.length;ft++){if(P.resolveDepthBuffer&&(P.depthBuffer&&(tt|=i.DEPTH_BUFFER_BIT),P.stencilBuffer&&P.resolveStencilBuffer&&(tt|=i.STENCIL_BUFFER_BIT)),ct){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,St.__webglColorRenderbuffer[ft]);const Vt=n.get(T[ft]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,Vt,0)}i.blitFramebuffer(0,0,V,j,0,0,V,j,tt,i.NEAREST),c===!0&&(ge.length=0,B.length=0,ge.push(i.COLOR_ATTACHMENT0+ft),P.depthBuffer&&P.resolveDepthBuffer===!1&&(ge.push(K),B.push(K),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,B)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,ge))}if(e.bindFramebuffer(i.READ_FRAMEBUFFER,null),e.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),ct)for(let ft=0;ft<T.length;ft++){e.bindFramebuffer(i.FRAMEBUFFER,St.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+ft,i.RENDERBUFFER,St.__webglColorRenderbuffer[ft]);const Vt=n.get(T[ft]).__webglTexture;e.bindFramebuffer(i.FRAMEBUFFER,St.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+ft,i.TEXTURE_2D,Vt,0)}e.bindFramebuffer(i.DRAW_FRAMEBUFFER,St.__webglMultisampledFramebuffer)}else if(P.depthBuffer&&P.resolveDepthBuffer===!1&&c){const T=P.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[T])}}}function zt(P){return Math.min(s.maxSamples,P.samples)}function Ht(P){const T=n.get(P);return P.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&T.__useRenderToTexture!==!1}function Tt(P){const T=o.render.frame;h.get(P)!==T&&(h.set(P,T),P.update())}function re(P,T){const V=P.colorSpace,j=P.format,tt=P.type;return P.isCompressedTexture===!0||P.isVideoTexture===!0||V!==is&&V!==Wn&&(Wt.getTransfer(V)===te?(j!==hn||tt!==kn)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",V)),T}function bt(P){return typeof HTMLImageElement<"u"&&P instanceof HTMLImageElement?(l.width=P.naturalWidth||P.width,l.height=P.naturalHeight||P.height):typeof VideoFrame<"u"&&P instanceof VideoFrame?(l.width=P.displayWidth,l.height=P.displayHeight):(l.width=P.width,l.height=P.height),l}this.allocateTextureUnit=U,this.resetTextureUnits=L,this.setTexture2D=O,this.setTexture2DArray=H,this.setTexture3D=$,this.setTextureCube=z,this.rebindTextures=Nt,this.setupRenderTarget=ce,this.updateRenderTargetMipmap=Ot,this.updateMultisampleRenderTarget=Ke,this.setupDepthRenderbuffer=Rt,this.setupFrameBufferTexture=vt,this.useMultisampledRTT=Ht}function N_(i,t){function e(n,s=Wn){let r;const o=Wt.getTransfer(s);if(n===kn)return i.UNSIGNED_BYTE;if(n===Jo)return i.UNSIGNED_SHORT_4_4_4_4;if(n===Qo)return i.UNSIGNED_SHORT_5_5_5_1;if(n===bh)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===Sh)return i.BYTE;if(n===wh)return i.SHORT;if(n===Is)return i.UNSIGNED_SHORT;if(n===jo)return i.INT;if(n===gi)return i.UNSIGNED_INT;if(n===In)return i.FLOAT;if(n===Os)return i.HALF_FLOAT;if(n===Eh)return i.ALPHA;if(n===Th)return i.RGB;if(n===hn)return i.RGBA;if(n===Ah)return i.LUMINANCE;if(n===Ch)return i.LUMINANCE_ALPHA;if(n===Wi)return i.DEPTH_COMPONENT;if(n===Ji)return i.DEPTH_STENCIL;if(n===Rh)return i.RED;if(n===tl)return i.RED_INTEGER;if(n===Ih)return i.RG;if(n===el)return i.RG_INTEGER;if(n===nl)return i.RGBA_INTEGER;if(n===Ir||n===Pr||n===Dr||n===Lr)if(o===te)if(r=t.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===Ir)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===Pr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===Dr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===Lr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=t.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===Ir)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===Pr)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===Dr)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===Lr)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===co||n===ho||n===uo||n===fo)if(r=t.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===co)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===ho)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===uo)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===fo)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===po||n===mo||n===go)if(r=t.get("WEBGL_compressed_texture_etc"),r!==null){if(n===po||n===mo)return o===te?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===go)return o===te?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===_o||n===vo||n===xo||n===yo||n===Mo||n===So||n===wo||n===bo||n===Eo||n===To||n===Ao||n===Co||n===Ro||n===Io)if(r=t.get("WEBGL_compressed_texture_astc"),r!==null){if(n===_o)return o===te?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===vo)return o===te?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===xo)return o===te?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===yo)return o===te?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===Mo)return o===te?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===So)return o===te?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===wo)return o===te?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===bo)return o===te?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===Eo)return o===te?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===To)return o===te?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===Ao)return o===te?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===Co)return o===te?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===Ro)return o===te?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===Io)return o===te?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===Ur||n===Po||n===Do)if(r=t.get("EXT_texture_compression_bptc"),r!==null){if(n===Ur)return o===te?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===Po)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===Do)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===Ph||n===Lo||n===Uo||n===ko)if(r=t.get("EXT_texture_compression_rgtc"),r!==null){if(n===Ur)return r.COMPRESSED_RED_RGTC1_EXT;if(n===Lo)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===Uo)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===ko)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===ji?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:e}}class B_ extends Oe{constructor(t=[]){super(),this.isArrayCamera=!0,this.cameras=t}}class _n extends be{constructor(){super(),this.isGroup=!0,this.type="Group"}}const O_={type:"move"};class Pa{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new _n,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new _n,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new G,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new G),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new _n,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new G,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new G),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){const e=this._hand;if(e)for(const n of t.hand.values())this._getHandJoint(e,n)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,n){let s=null,r=null,o=null;const a=this._targetRay,c=this._grip,l=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(l&&t.hand){o=!0;for(const _ of t.hand.values()){const m=e.getJointPose(_,n),g=this._getHandJoint(l,_);m!==null&&(g.matrix.fromArray(m.transform.matrix),g.matrix.decompose(g.position,g.rotation,g.scale),g.matrixWorldNeedsUpdate=!0,g.jointRadius=m.radius),g.visible=m!==null}const h=l.joints["index-finger-tip"],f=l.joints["thumb-tip"],u=h.position.distanceTo(f.position),d=.02,p=.005;l.inputState.pinching&&u>d+p?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!l.inputState.pinching&&u<=d-p&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else c!==null&&t.gripSpace&&(r=e.getPose(t.gripSpace,n),r!==null&&(c.matrix.fromArray(r.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,r.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(r.linearVelocity)):c.hasLinearVelocity=!1,r.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(r.angularVelocity)):c.hasAngularVelocity=!1));a!==null&&(s=e.getPose(t.targetRaySpace,n),s===null&&r!==null&&(s=r),s!==null&&(a.matrix.fromArray(s.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,s.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(s.linearVelocity)):a.hasLinearVelocity=!1,s.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(s.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(O_)))}return a!==null&&(a.visible=s!==null),c!==null&&(c.visible=r!==null),l!==null&&(l.visible=o!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){const n=new _n;n.matrixAutoUpdate=!1,n.visible=!1,t.joints[e.jointName]=n,t.add(n)}return t.joints[e.jointName]}}const z_=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,H_=`
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

}`;class G_{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e,n){if(this.texture===null){const s=new Pe,r=t.properties.get(s);r.__webglTexture=e.texture,(e.depthNear!=n.depthNear||e.depthFar!=n.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=s}}getMesh(t){if(this.texture!==null&&this.mesh===null){const e=t.cameras[0].viewport,n=new Qn({vertexShader:z_,fragmentShader:H_,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new Qt(new Zn(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class V_ extends ss{constructor(t,e){super();const n=this;let s=null,r=1,o=null,a="local-floor",c=1,l=null,h=null,f=null,u=null,d=null,p=null;const _=new G_,m=e.getContextAttributes();let g=null,w=null;const E=[],y=[],b=new jt;let S=null;const M=new Oe;M.viewport=new me;const R=new Oe;R.viewport=new me;const v=[M,R],x=new B_;let C=null,L=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(Z){let it=E[Z];return it===void 0&&(it=new Pa,E[Z]=it),it.getTargetRaySpace()},this.getControllerGrip=function(Z){let it=E[Z];return it===void 0&&(it=new Pa,E[Z]=it),it.getGripSpace()},this.getHand=function(Z){let it=E[Z];return it===void 0&&(it=new Pa,E[Z]=it),it.getHandSpace()};function U(Z){const it=y.indexOf(Z.inputSource);if(it===-1)return;const vt=E[it];vt!==void 0&&(vt.update(Z.inputSource,Z.frame,l||o),vt.dispatchEvent({type:Z.type,data:Z.inputSource}))}function D(){s.removeEventListener("select",U),s.removeEventListener("selectstart",U),s.removeEventListener("selectend",U),s.removeEventListener("squeeze",U),s.removeEventListener("squeezestart",U),s.removeEventListener("squeezeend",U),s.removeEventListener("end",D),s.removeEventListener("inputsourceschange",O);for(let Z=0;Z<E.length;Z++){const it=y[Z];it!==null&&(y[Z]=null,E[Z].disconnect(it))}C=null,L=null,_.reset(),t.setRenderTarget(g),d=null,u=null,f=null,s=null,w=null,Pt.stop(),n.isPresenting=!1,t.setPixelRatio(S),t.setSize(b.width,b.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(Z){r=Z,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(Z){a=Z,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||o},this.setReferenceSpace=function(Z){l=Z},this.getBaseLayer=function(){return u!==null?u:d},this.getBinding=function(){return f},this.getFrame=function(){return p},this.getSession=function(){return s},this.setSession=async function(Z){if(s=Z,s!==null){if(g=t.getRenderTarget(),s.addEventListener("select",U),s.addEventListener("selectstart",U),s.addEventListener("selectend",U),s.addEventListener("squeeze",U),s.addEventListener("squeezestart",U),s.addEventListener("squeezeend",U),s.addEventListener("end",D),s.addEventListener("inputsourceschange",O),m.xrCompatible!==!0&&await e.makeXRCompatible(),S=t.getPixelRatio(),t.getSize(b),s.renderState.layers===void 0){const it={antialias:m.antialias,alpha:!0,depth:m.depth,stencil:m.stencil,framebufferScaleFactor:r};d=new XRWebGLLayer(s,e,it),s.updateRenderState({baseLayer:d}),t.setPixelRatio(1),t.setSize(d.framebufferWidth,d.framebufferHeight,!1),w=new _i(d.framebufferWidth,d.framebufferHeight,{format:hn,type:kn,colorSpace:t.outputColorSpace,stencilBuffer:m.stencil})}else{let it=null,vt=null,ot=null;m.depth&&(ot=m.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,it=m.stencil?Ji:Wi,vt=m.stencil?ji:gi);const Et={colorFormat:e.RGBA8,depthFormat:ot,scaleFactor:r};f=new XRWebGLBinding(s,e),u=f.createProjectionLayer(Et),s.updateRenderState({layers:[u]}),t.setPixelRatio(1),t.setSize(u.textureWidth,u.textureHeight,!1),w=new _i(u.textureWidth,u.textureHeight,{format:hn,type:kn,depthTexture:new $h(u.textureWidth,u.textureHeight,vt,void 0,void 0,void 0,void 0,void 0,void 0,it),stencilBuffer:m.stencil,colorSpace:t.outputColorSpace,samples:m.antialias?4:0,resolveDepthBuffer:u.ignoreDepthValues===!1})}w.isXRRenderTarget=!0,this.setFoveation(c),l=null,o=await s.requestReferenceSpace(a),Pt.setContext(s),Pt.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return _.getDepthTexture()};function O(Z){for(let it=0;it<Z.removed.length;it++){const vt=Z.removed[it],ot=y.indexOf(vt);ot>=0&&(y[ot]=null,E[ot].disconnect(vt))}for(let it=0;it<Z.added.length;it++){const vt=Z.added[it];let ot=y.indexOf(vt);if(ot===-1){for(let Rt=0;Rt<E.length;Rt++)if(Rt>=y.length){y.push(vt),ot=Rt;break}else if(y[Rt]===null){y[Rt]=vt,ot=Rt;break}if(ot===-1)break}const Et=E[ot];Et&&Et.connect(vt)}}const H=new G,$=new G;function z(Z,it,vt){H.setFromMatrixPosition(it.matrixWorld),$.setFromMatrixPosition(vt.matrixWorld);const ot=H.distanceTo($),Et=it.projectionMatrix.elements,Rt=vt.projectionMatrix.elements,Nt=Et[14]/(Et[10]-1),ce=Et[14]/(Et[10]+1),Ot=(Et[9]+1)/Et[5],ge=(Et[9]-1)/Et[5],B=(Et[8]-1)/Et[0],Ke=(Rt[8]+1)/Rt[0],zt=Nt*B,Ht=Nt*Ke,Tt=ot/(-B+Ke),re=Tt*-B;if(it.matrixWorld.decompose(Z.position,Z.quaternion,Z.scale),Z.translateX(re),Z.translateZ(Tt),Z.matrixWorld.compose(Z.position,Z.quaternion,Z.scale),Z.matrixWorldInverse.copy(Z.matrixWorld).invert(),Et[10]===-1)Z.projectionMatrix.copy(it.projectionMatrix),Z.projectionMatrixInverse.copy(it.projectionMatrixInverse);else{const bt=Nt+Tt,P=ce+Tt,T=zt-re,V=Ht+(ot-re),j=Ot*ce/P*bt,tt=ge*ce/P*bt;Z.projectionMatrix.makePerspective(T,V,j,tt,bt,P),Z.projectionMatrixInverse.copy(Z.projectionMatrix).invert()}}function q(Z,it){it===null?Z.matrixWorld.copy(Z.matrix):Z.matrixWorld.multiplyMatrices(it.matrixWorld,Z.matrix),Z.matrixWorldInverse.copy(Z.matrixWorld).invert()}this.updateCamera=function(Z){if(s===null)return;let it=Z.near,vt=Z.far;_.texture!==null&&(_.depthNear>0&&(it=_.depthNear),_.depthFar>0&&(vt=_.depthFar)),x.near=R.near=M.near=it,x.far=R.far=M.far=vt,(C!==x.near||L!==x.far)&&(s.updateRenderState({depthNear:x.near,depthFar:x.far}),C=x.near,L=x.far),M.layers.mask=Z.layers.mask|2,R.layers.mask=Z.layers.mask|4,x.layers.mask=M.layers.mask|R.layers.mask;const ot=Z.parent,Et=x.cameras;q(x,ot);for(let Rt=0;Rt<Et.length;Rt++)q(Et[Rt],ot);Et.length===2?z(x,M,R):x.projectionMatrix.copy(M.projectionMatrix),et(Z,x,ot)};function et(Z,it,vt){vt===null?Z.matrix.copy(it.matrixWorld):(Z.matrix.copy(vt.matrixWorld),Z.matrix.invert(),Z.matrix.multiply(it.matrixWorld)),Z.matrix.decompose(Z.position,Z.quaternion,Z.scale),Z.updateMatrixWorld(!0),Z.projectionMatrix.copy(it.projectionMatrix),Z.projectionMatrixInverse.copy(it.projectionMatrixInverse),Z.isPerspectiveCamera&&(Z.fov=Fo*2*Math.atan(1/Z.projectionMatrix.elements[5]),Z.zoom=1)}this.getCamera=function(){return x},this.getFoveation=function(){if(!(u===null&&d===null))return c},this.setFoveation=function(Z){c=Z,u!==null&&(u.fixedFoveation=Z),d!==null&&d.fixedFoveation!==void 0&&(d.fixedFoveation=Z)},this.hasDepthSensing=function(){return _.texture!==null},this.getDepthSensingMesh=function(){return _.getMesh(x)};let gt=null;function _t(Z,it){if(h=it.getViewerPose(l||o),p=it,h!==null){const vt=h.views;d!==null&&(t.setRenderTargetFramebuffer(w,d.framebuffer),t.setRenderTarget(w));let ot=!1;vt.length!==x.cameras.length&&(x.cameras.length=0,ot=!0);for(let Rt=0;Rt<vt.length;Rt++){const Nt=vt[Rt];let ce=null;if(d!==null)ce=d.getViewport(Nt);else{const ge=f.getViewSubImage(u,Nt);ce=ge.viewport,Rt===0&&(t.setRenderTargetTextures(w,ge.colorTexture,u.ignoreDepthValues?void 0:ge.depthStencilTexture),t.setRenderTarget(w))}let Ot=v[Rt];Ot===void 0&&(Ot=new Oe,Ot.layers.enable(Rt),Ot.viewport=new me,v[Rt]=Ot),Ot.matrix.fromArray(Nt.transform.matrix),Ot.matrix.decompose(Ot.position,Ot.quaternion,Ot.scale),Ot.projectionMatrix.fromArray(Nt.projectionMatrix),Ot.projectionMatrixInverse.copy(Ot.projectionMatrix).invert(),Ot.viewport.set(ce.x,ce.y,ce.width,ce.height),Rt===0&&(x.matrix.copy(Ot.matrix),x.matrix.decompose(x.position,x.quaternion,x.scale)),ot===!0&&x.cameras.push(Ot)}const Et=s.enabledFeatures;if(Et&&Et.includes("depth-sensing")){const Rt=f.getDepthInformation(vt[0]);Rt&&Rt.isValid&&Rt.texture&&_.init(t,Rt,s.renderState)}}for(let vt=0;vt<E.length;vt++){const ot=y[vt],Et=E[vt];ot!==null&&Et!==void 0&&Et.update(ot,it,l||o)}gt&&gt(Z,it),it.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:it}),p=null}const Pt=new Wh;Pt.setAnimationLoop(_t),this.setAnimationLoop=function(Z){gt=Z},this.dispose=function(){}}}const ai=new nn,W_=new ee;function X_(i,t){function e(m,g){m.matrixAutoUpdate===!0&&m.updateMatrix(),g.value.copy(m.matrix)}function n(m,g){g.color.getRGB(m.fogColor.value,Hh(i)),g.isFog?(m.fogNear.value=g.near,m.fogFar.value=g.far):g.isFogExp2&&(m.fogDensity.value=g.density)}function s(m,g,w,E,y){g.isMeshBasicMaterial||g.isMeshLambertMaterial?r(m,g):g.isMeshToonMaterial?(r(m,g),f(m,g)):g.isMeshPhongMaterial?(r(m,g),h(m,g)):g.isMeshStandardMaterial?(r(m,g),u(m,g),g.isMeshPhysicalMaterial&&d(m,g,y)):g.isMeshMatcapMaterial?(r(m,g),p(m,g)):g.isMeshDepthMaterial?r(m,g):g.isMeshDistanceMaterial?(r(m,g),_(m,g)):g.isMeshNormalMaterial?r(m,g):g.isLineBasicMaterial?(o(m,g),g.isLineDashedMaterial&&a(m,g)):g.isPointsMaterial?c(m,g,w,E):g.isSpriteMaterial?l(m,g):g.isShadowMaterial?(m.color.value.copy(g.color),m.opacity.value=g.opacity):g.isShaderMaterial&&(g.uniformsNeedUpdate=!1)}function r(m,g){m.opacity.value=g.opacity,g.color&&m.diffuse.value.copy(g.color),g.emissive&&m.emissive.value.copy(g.emissive).multiplyScalar(g.emissiveIntensity),g.map&&(m.map.value=g.map,e(g.map,m.mapTransform)),g.alphaMap&&(m.alphaMap.value=g.alphaMap,e(g.alphaMap,m.alphaMapTransform)),g.bumpMap&&(m.bumpMap.value=g.bumpMap,e(g.bumpMap,m.bumpMapTransform),m.bumpScale.value=g.bumpScale,g.side===Ue&&(m.bumpScale.value*=-1)),g.normalMap&&(m.normalMap.value=g.normalMap,e(g.normalMap,m.normalMapTransform),m.normalScale.value.copy(g.normalScale),g.side===Ue&&m.normalScale.value.negate()),g.displacementMap&&(m.displacementMap.value=g.displacementMap,e(g.displacementMap,m.displacementMapTransform),m.displacementScale.value=g.displacementScale,m.displacementBias.value=g.displacementBias),g.emissiveMap&&(m.emissiveMap.value=g.emissiveMap,e(g.emissiveMap,m.emissiveMapTransform)),g.specularMap&&(m.specularMap.value=g.specularMap,e(g.specularMap,m.specularMapTransform)),g.alphaTest>0&&(m.alphaTest.value=g.alphaTest);const w=t.get(g),E=w.envMap,y=w.envMapRotation;E&&(m.envMap.value=E,ai.copy(y),ai.x*=-1,ai.y*=-1,ai.z*=-1,E.isCubeTexture&&E.isRenderTargetTexture===!1&&(ai.y*=-1,ai.z*=-1),m.envMapRotation.value.setFromMatrix4(W_.makeRotationFromEuler(ai)),m.flipEnvMap.value=E.isCubeTexture&&E.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=g.reflectivity,m.ior.value=g.ior,m.refractionRatio.value=g.refractionRatio),g.lightMap&&(m.lightMap.value=g.lightMap,m.lightMapIntensity.value=g.lightMapIntensity,e(g.lightMap,m.lightMapTransform)),g.aoMap&&(m.aoMap.value=g.aoMap,m.aoMapIntensity.value=g.aoMapIntensity,e(g.aoMap,m.aoMapTransform))}function o(m,g){m.diffuse.value.copy(g.color),m.opacity.value=g.opacity,g.map&&(m.map.value=g.map,e(g.map,m.mapTransform))}function a(m,g){m.dashSize.value=g.dashSize,m.totalSize.value=g.dashSize+g.gapSize,m.scale.value=g.scale}function c(m,g,w,E){m.diffuse.value.copy(g.color),m.opacity.value=g.opacity,m.size.value=g.size*w,m.scale.value=E*.5,g.map&&(m.map.value=g.map,e(g.map,m.uvTransform)),g.alphaMap&&(m.alphaMap.value=g.alphaMap,e(g.alphaMap,m.alphaMapTransform)),g.alphaTest>0&&(m.alphaTest.value=g.alphaTest)}function l(m,g){m.diffuse.value.copy(g.color),m.opacity.value=g.opacity,m.rotation.value=g.rotation,g.map&&(m.map.value=g.map,e(g.map,m.mapTransform)),g.alphaMap&&(m.alphaMap.value=g.alphaMap,e(g.alphaMap,m.alphaMapTransform)),g.alphaTest>0&&(m.alphaTest.value=g.alphaTest)}function h(m,g){m.specular.value.copy(g.specular),m.shininess.value=Math.max(g.shininess,1e-4)}function f(m,g){g.gradientMap&&(m.gradientMap.value=g.gradientMap)}function u(m,g){m.metalness.value=g.metalness,g.metalnessMap&&(m.metalnessMap.value=g.metalnessMap,e(g.metalnessMap,m.metalnessMapTransform)),m.roughness.value=g.roughness,g.roughnessMap&&(m.roughnessMap.value=g.roughnessMap,e(g.roughnessMap,m.roughnessMapTransform)),g.envMap&&(m.envMapIntensity.value=g.envMapIntensity)}function d(m,g,w){m.ior.value=g.ior,g.sheen>0&&(m.sheenColor.value.copy(g.sheenColor).multiplyScalar(g.sheen),m.sheenRoughness.value=g.sheenRoughness,g.sheenColorMap&&(m.sheenColorMap.value=g.sheenColorMap,e(g.sheenColorMap,m.sheenColorMapTransform)),g.sheenRoughnessMap&&(m.sheenRoughnessMap.value=g.sheenRoughnessMap,e(g.sheenRoughnessMap,m.sheenRoughnessMapTransform))),g.clearcoat>0&&(m.clearcoat.value=g.clearcoat,m.clearcoatRoughness.value=g.clearcoatRoughness,g.clearcoatMap&&(m.clearcoatMap.value=g.clearcoatMap,e(g.clearcoatMap,m.clearcoatMapTransform)),g.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=g.clearcoatRoughnessMap,e(g.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),g.clearcoatNormalMap&&(m.clearcoatNormalMap.value=g.clearcoatNormalMap,e(g.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(g.clearcoatNormalScale),g.side===Ue&&m.clearcoatNormalScale.value.negate())),g.dispersion>0&&(m.dispersion.value=g.dispersion),g.iridescence>0&&(m.iridescence.value=g.iridescence,m.iridescenceIOR.value=g.iridescenceIOR,m.iridescenceThicknessMinimum.value=g.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=g.iridescenceThicknessRange[1],g.iridescenceMap&&(m.iridescenceMap.value=g.iridescenceMap,e(g.iridescenceMap,m.iridescenceMapTransform)),g.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=g.iridescenceThicknessMap,e(g.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),g.transmission>0&&(m.transmission.value=g.transmission,m.transmissionSamplerMap.value=w.texture,m.transmissionSamplerSize.value.set(w.width,w.height),g.transmissionMap&&(m.transmissionMap.value=g.transmissionMap,e(g.transmissionMap,m.transmissionMapTransform)),m.thickness.value=g.thickness,g.thicknessMap&&(m.thicknessMap.value=g.thicknessMap,e(g.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=g.attenuationDistance,m.attenuationColor.value.copy(g.attenuationColor)),g.anisotropy>0&&(m.anisotropyVector.value.set(g.anisotropy*Math.cos(g.anisotropyRotation),g.anisotropy*Math.sin(g.anisotropyRotation)),g.anisotropyMap&&(m.anisotropyMap.value=g.anisotropyMap,e(g.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=g.specularIntensity,m.specularColor.value.copy(g.specularColor),g.specularColorMap&&(m.specularColorMap.value=g.specularColorMap,e(g.specularColorMap,m.specularColorMapTransform)),g.specularIntensityMap&&(m.specularIntensityMap.value=g.specularIntensityMap,e(g.specularIntensityMap,m.specularIntensityMapTransform))}function p(m,g){g.matcap&&(m.matcap.value=g.matcap)}function _(m,g){const w=t.get(g).light;m.referencePosition.value.setFromMatrixPosition(w.matrixWorld),m.nearDistance.value=w.shadow.camera.near,m.farDistance.value=w.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function $_(i,t,e,n){let s={},r={},o=[];const a=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function c(w,E){const y=E.program;n.uniformBlockBinding(w,y)}function l(w,E){let y=s[w.id];y===void 0&&(p(w),y=h(w),s[w.id]=y,w.addEventListener("dispose",m));const b=E.program;n.updateUBOMapping(w,b);const S=t.render.frame;r[w.id]!==S&&(u(w),r[w.id]=S)}function h(w){const E=f();w.__bindingPointIndex=E;const y=i.createBuffer(),b=w.__size,S=w.usage;return i.bindBuffer(i.UNIFORM_BUFFER,y),i.bufferData(i.UNIFORM_BUFFER,b,S),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,E,y),y}function f(){for(let w=0;w<a;w++)if(o.indexOf(w)===-1)return o.push(w),w;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function u(w){const E=s[w.id],y=w.uniforms,b=w.__cache;i.bindBuffer(i.UNIFORM_BUFFER,E);for(let S=0,M=y.length;S<M;S++){const R=Array.isArray(y[S])?y[S]:[y[S]];for(let v=0,x=R.length;v<x;v++){const C=R[v];if(d(C,S,v,b)===!0){const L=C.__offset,U=Array.isArray(C.value)?C.value:[C.value];let D=0;for(let O=0;O<U.length;O++){const H=U[O],$=_(H);typeof H=="number"||typeof H=="boolean"?(C.__data[0]=H,i.bufferSubData(i.UNIFORM_BUFFER,L+D,C.__data)):H.isMatrix3?(C.__data[0]=H.elements[0],C.__data[1]=H.elements[1],C.__data[2]=H.elements[2],C.__data[3]=0,C.__data[4]=H.elements[3],C.__data[5]=H.elements[4],C.__data[6]=H.elements[5],C.__data[7]=0,C.__data[8]=H.elements[6],C.__data[9]=H.elements[7],C.__data[10]=H.elements[8],C.__data[11]=0):(H.toArray(C.__data,D),D+=$.storage/Float32Array.BYTES_PER_ELEMENT)}i.bufferSubData(i.UNIFORM_BUFFER,L,C.__data)}}}i.bindBuffer(i.UNIFORM_BUFFER,null)}function d(w,E,y,b){const S=w.value,M=E+"_"+y;if(b[M]===void 0)return typeof S=="number"||typeof S=="boolean"?b[M]=S:b[M]=S.clone(),!0;{const R=b[M];if(typeof S=="number"||typeof S=="boolean"){if(R!==S)return b[M]=S,!0}else if(R.equals(S)===!1)return R.copy(S),!0}return!1}function p(w){const E=w.uniforms;let y=0;const b=16;for(let M=0,R=E.length;M<R;M++){const v=Array.isArray(E[M])?E[M]:[E[M]];for(let x=0,C=v.length;x<C;x++){const L=v[x],U=Array.isArray(L.value)?L.value:[L.value];for(let D=0,O=U.length;D<O;D++){const H=U[D],$=_(H),z=y%b,q=z%$.boundary,et=z+q;y+=q,et!==0&&b-et<$.storage&&(y+=b-et),L.__data=new Float32Array($.storage/Float32Array.BYTES_PER_ELEMENT),L.__offset=y,y+=$.storage}}}const S=y%b;return S>0&&(y+=b-S),w.__size=y,w.__cache={},this}function _(w){const E={boundary:0,storage:0};return typeof w=="number"||typeof w=="boolean"?(E.boundary=4,E.storage=4):w.isVector2?(E.boundary=8,E.storage=8):w.isVector3||w.isColor?(E.boundary=16,E.storage=12):w.isVector4?(E.boundary=16,E.storage=16):w.isMatrix3?(E.boundary=48,E.storage=48):w.isMatrix4?(E.boundary=64,E.storage=64):w.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",w),E}function m(w){const E=w.target;E.removeEventListener("dispose",m);const y=o.indexOf(E.__bindingPointIndex);o.splice(y,1),i.deleteBuffer(s[E.id]),delete s[E.id],delete r[E.id]}function g(){for(const w in s)i.deleteBuffer(s[w]);o=[],s={},r={}}return{bind:c,update:l,dispose:g}}class Y_{constructor(t={}){const{canvas:e=Ud(),context:n=null,depth:s=!0,stencil:r=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:f=!1,reverseDepthBuffer:u=!1}=t;this.isWebGLRenderer=!0;let d;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");d=n.getContextAttributes().alpha}else d=o;const p=new Uint32Array(4),_=new Int32Array(4);let m=null,g=null;const w=[],E=[];this.domElement=e,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=de,this.toneMapping=qn,this.toneMappingExposure=1;const y=this;let b=!1,S=0,M=0,R=null,v=-1,x=null;const C=new me,L=new me;let U=null;const D=new Bt(0);let O=0,H=e.width,$=e.height,z=1,q=null,et=null;const gt=new me(0,0,H,$),_t=new me(0,0,H,$);let Pt=!1;const Z=new sl;let it=!1,vt=!1;const ot=new ee,Et=new ee,Rt=new G,Nt=new me,ce={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let Ot=!1;function ge(){return R===null?z:1}let B=n;function Ke(A,F){return e.getContext(A,F)}try{const A={alpha:!0,depth:s,stencil:r,antialias:a,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:h,failIfMajorPerformanceCaveat:f};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${Zo}`),e.addEventListener("webglcontextlost",J,!1),e.addEventListener("webglcontextrestored",dt,!1),e.addEventListener("webglcontextcreationerror",ht,!1),B===null){const F="webgl2";if(B=Ke(F,A),B===null)throw Ke(F)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(A){throw console.error("THREE.WebGLRenderer: "+A.message),A}let zt,Ht,Tt,re,bt,P,T,V,j,tt,K,St,ct,ft,Vt,st,pt,At,Ct,mt,Gt,kt,ne,k;function lt(){zt=new Jm(B),zt.init(),kt=new N_(B,zt),Ht=new $m(B,zt,t,kt),Tt=new U_(B,zt),Ht.reverseDepthBuffer&&u&&Tt.buffers.depth.setReversed(!0),re=new eg(B),bt=new x_,P=new F_(B,zt,Tt,bt,Ht,kt,re),T=new qm(y),V=new jm(y),j=new lf(B),ne=new Wm(B,j),tt=new Qm(B,j,re,ne),K=new ig(B,tt,j,re),Ct=new ng(B,Ht,P),st=new Ym(bt),St=new v_(y,T,V,zt,Ht,ne,st),ct=new X_(y,bt),ft=new M_,Vt=new A_(zt),At=new Vm(y,T,V,Tt,K,d,c),pt=new D_(y,K,Ht),k=new $_(B,re,Ht,Tt),mt=new Xm(B,zt,re),Gt=new tg(B,zt,re),re.programs=St.programs,y.capabilities=Ht,y.extensions=zt,y.properties=bt,y.renderLists=ft,y.shadowMap=pt,y.state=Tt,y.info=re}lt();const Y=new V_(y,B);this.xr=Y,this.getContext=function(){return B},this.getContextAttributes=function(){return B.getContextAttributes()},this.forceContextLoss=function(){const A=zt.get("WEBGL_lose_context");A&&A.loseContext()},this.forceContextRestore=function(){const A=zt.get("WEBGL_lose_context");A&&A.restoreContext()},this.getPixelRatio=function(){return z},this.setPixelRatio=function(A){A!==void 0&&(z=A,this.setSize(H,$,!1))},this.getSize=function(A){return A.set(H,$)},this.setSize=function(A,F,W=!0){if(Y.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}H=A,$=F,e.width=Math.floor(A*z),e.height=Math.floor(F*z),W===!0&&(e.style.width=A+"px",e.style.height=F+"px"),this.setViewport(0,0,A,F)},this.getDrawingBufferSize=function(A){return A.set(H*z,$*z).floor()},this.setDrawingBufferSize=function(A,F,W){H=A,$=F,z=W,e.width=Math.floor(A*W),e.height=Math.floor(F*W),this.setViewport(0,0,A,F)},this.getCurrentViewport=function(A){return A.copy(C)},this.getViewport=function(A){return A.copy(gt)},this.setViewport=function(A,F,W,X){A.isVector4?gt.set(A.x,A.y,A.z,A.w):gt.set(A,F,W,X),Tt.viewport(C.copy(gt).multiplyScalar(z).round())},this.getScissor=function(A){return A.copy(_t)},this.setScissor=function(A,F,W,X){A.isVector4?_t.set(A.x,A.y,A.z,A.w):_t.set(A,F,W,X),Tt.scissor(L.copy(_t).multiplyScalar(z).round())},this.getScissorTest=function(){return Pt},this.setScissorTest=function(A){Tt.setScissorTest(Pt=A)},this.setOpaqueSort=function(A){q=A},this.setTransparentSort=function(A){et=A},this.getClearColor=function(A){return A.copy(At.getClearColor())},this.setClearColor=function(){At.setClearColor.apply(At,arguments)},this.getClearAlpha=function(){return At.getClearAlpha()},this.setClearAlpha=function(){At.setClearAlpha.apply(At,arguments)},this.clear=function(A=!0,F=!0,W=!0){let X=0;if(A){let N=!1;if(R!==null){const rt=R.texture.format;N=rt===nl||rt===el||rt===tl}if(N){const rt=R.texture.type,ut=rt===kn||rt===gi||rt===Is||rt===ji||rt===Jo||rt===Qo,xt=At.getClearColor(),yt=At.getClearAlpha(),It=xt.r,Lt=xt.g,Mt=xt.b;ut?(p[0]=It,p[1]=Lt,p[2]=Mt,p[3]=yt,B.clearBufferuiv(B.COLOR,0,p)):(_[0]=It,_[1]=Lt,_[2]=Mt,_[3]=yt,B.clearBufferiv(B.COLOR,0,_))}else X|=B.COLOR_BUFFER_BIT}F&&(X|=B.DEPTH_BUFFER_BIT),W&&(X|=B.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),B.clear(X)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){e.removeEventListener("webglcontextlost",J,!1),e.removeEventListener("webglcontextrestored",dt,!1),e.removeEventListener("webglcontextcreationerror",ht,!1),ft.dispose(),Vt.dispose(),bt.dispose(),T.dispose(),V.dispose(),K.dispose(),ne.dispose(),k.dispose(),St.dispose(),Y.dispose(),Y.removeEventListener("sessionstart",gl),Y.removeEventListener("sessionend",_l),ti.stop()};function J(A){A.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),b=!0}function dt(){console.log("THREE.WebGLRenderer: Context Restored."),b=!1;const A=re.autoReset,F=pt.enabled,W=pt.autoUpdate,X=pt.needsUpdate,N=pt.type;lt(),re.autoReset=A,pt.enabled=F,pt.autoUpdate=W,pt.needsUpdate=X,pt.type=N}function ht(A){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",A.statusMessage)}function Dt(A){const F=A.target;F.removeEventListener("dispose",Dt),fe(F)}function fe(A){Te(A),bt.remove(A)}function Te(A){const F=bt.get(A).programs;F!==void 0&&(F.forEach(function(W){St.releaseProgram(W)}),A.isShaderMaterial&&St.releaseShaderCache(A))}this.renderBufferDirect=function(A,F,W,X,N,rt){F===null&&(F=ce);const ut=N.isMesh&&N.matrixWorld.determinant()<0,xt=Ou(A,F,W,X,N);Tt.setMaterial(X,ut);let yt=W.index,It=1;if(X.wireframe===!0){if(yt=tt.getWireframeAttribute(W),yt===void 0)return;It=2}const Lt=W.drawRange,Mt=W.attributes.position;let Xt=Lt.start*It,ie=(Lt.start+Lt.count)*It;rt!==null&&(Xt=Math.max(Xt,rt.start*It),ie=Math.min(ie,(rt.start+rt.count)*It)),yt!==null?(Xt=Math.max(Xt,0),ie=Math.min(ie,yt.count)):Mt!=null&&(Xt=Math.max(Xt,0),ie=Math.min(ie,Mt.count));const ae=ie-Xt;if(ae<0||ae===1/0)return;ne.setup(N,X,xt,W,yt);let ke,Zt=mt;if(yt!==null&&(ke=j.get(yt),Zt=Gt,Zt.setIndex(ke)),N.isMesh)X.wireframe===!0?(Tt.setLineWidth(X.wireframeLinewidth*ge()),Zt.setMode(B.LINES)):Zt.setMode(B.TRIANGLES);else if(N.isLine){let wt=X.linewidth;wt===void 0&&(wt=1),Tt.setLineWidth(wt*ge()),N.isLineSegments?Zt.setMode(B.LINES):N.isLineLoop?Zt.setMode(B.LINE_LOOP):Zt.setMode(B.LINE_STRIP)}else N.isPoints?Zt.setMode(B.POINTS):N.isSprite&&Zt.setMode(B.TRIANGLES);if(N.isBatchedMesh)if(N._multiDrawInstances!==null)Zt.renderMultiDrawInstances(N._multiDrawStarts,N._multiDrawCounts,N._multiDrawCount,N._multiDrawInstances);else if(zt.get("WEBGL_multi_draw"))Zt.renderMultiDraw(N._multiDrawStarts,N._multiDrawCounts,N._multiDrawCount);else{const wt=N._multiDrawStarts,Mn=N._multiDrawCounts,Kt=N._multiDrawCount,an=yt?j.get(yt).bytesPerElement:1,bi=bt.get(X).currentProgram.getUniforms();for(let We=0;We<Kt;We++)bi.setValue(B,"_gl_DrawID",We),Zt.render(wt[We]/an,Mn[We])}else if(N.isInstancedMesh)Zt.renderInstances(Xt,ae,N.count);else if(W.isInstancedBufferGeometry){const wt=W._maxInstanceCount!==void 0?W._maxInstanceCount:1/0,Mn=Math.min(W.instanceCount,wt);Zt.renderInstances(Xt,ae,Mn)}else Zt.render(Xt,ae)};function Jt(A,F,W){A.transparent===!0&&A.side===He&&A.forceSinglePass===!1?(A.side=Ue,A.needsUpdate=!0,Zs(A,F,W),A.side=Jn,A.needsUpdate=!0,Zs(A,F,W),A.side=He):Zs(A,F,W)}this.compile=function(A,F,W=null){W===null&&(W=A),g=Vt.get(W),g.init(F),E.push(g),W.traverseVisible(function(N){N.isLight&&N.layers.test(F.layers)&&(g.pushLight(N),N.castShadow&&g.pushShadow(N))}),A!==W&&A.traverseVisible(function(N){N.isLight&&N.layers.test(F.layers)&&(g.pushLight(N),N.castShadow&&g.pushShadow(N))}),g.setupLights();const X=new Set;return A.traverse(function(N){if(!(N.isMesh||N.isPoints||N.isLine||N.isSprite))return;const rt=N.material;if(rt)if(Array.isArray(rt))for(let ut=0;ut<rt.length;ut++){const xt=rt[ut];Jt(xt,W,N),X.add(xt)}else Jt(rt,W,N),X.add(rt)}),E.pop(),g=null,X},this.compileAsync=function(A,F,W=null){const X=this.compile(A,F,W);return new Promise(N=>{function rt(){if(X.forEach(function(ut){bt.get(ut).currentProgram.isReady()&&X.delete(ut)}),X.size===0){N(A);return}setTimeout(rt,10)}zt.get("KHR_parallel_shader_compile")!==null?rt():setTimeout(rt,10)})};let rn=null;function yn(A){rn&&rn(A)}function gl(){ti.stop()}function _l(){ti.start()}const ti=new Wh;ti.setAnimationLoop(yn),typeof self<"u"&&ti.setContext(self),this.setAnimationLoop=function(A){rn=A,Y.setAnimationLoop(A),A===null?ti.stop():ti.start()},Y.addEventListener("sessionstart",gl),Y.addEventListener("sessionend",_l),this.render=function(A,F){if(F!==void 0&&F.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(b===!0)return;if(A.matrixWorldAutoUpdate===!0&&A.updateMatrixWorld(),F.parent===null&&F.matrixWorldAutoUpdate===!0&&F.updateMatrixWorld(),Y.enabled===!0&&Y.isPresenting===!0&&(Y.cameraAutoUpdate===!0&&Y.updateCamera(F),F=Y.getCamera()),A.isScene===!0&&A.onBeforeRender(y,A,F,R),g=Vt.get(A,E.length),g.init(F),E.push(g),Et.multiplyMatrices(F.projectionMatrix,F.matrixWorldInverse),Z.setFromProjectionMatrix(Et),vt=this.localClippingEnabled,it=st.init(this.clippingPlanes,vt),m=ft.get(A,w.length),m.init(),w.push(m),Y.enabled===!0&&Y.isPresenting===!0){const rt=y.xr.getDepthSensingMesh();rt!==null&&na(rt,F,-1/0,y.sortObjects)}na(A,F,0,y.sortObjects),m.finish(),y.sortObjects===!0&&m.sort(q,et),Ot=Y.enabled===!1||Y.isPresenting===!1||Y.hasDepthSensing()===!1,Ot&&At.addToRenderList(m,A),this.info.render.frame++,it===!0&&st.beginShadows();const W=g.state.shadowsArray;pt.render(W,A,F),it===!0&&st.endShadows(),this.info.autoReset===!0&&this.info.reset();const X=m.opaque,N=m.transmissive;if(g.setupLights(),F.isArrayCamera){const rt=F.cameras;if(N.length>0)for(let ut=0,xt=rt.length;ut<xt;ut++){const yt=rt[ut];xl(X,N,A,yt)}Ot&&At.render(A);for(let ut=0,xt=rt.length;ut<xt;ut++){const yt=rt[ut];vl(m,A,yt,yt.viewport)}}else N.length>0&&xl(X,N,A,F),Ot&&At.render(A),vl(m,A,F);R!==null&&(P.updateMultisampleRenderTarget(R),P.updateRenderTargetMipmap(R)),A.isScene===!0&&A.onAfterRender(y,A,F),ne.resetDefaultState(),v=-1,x=null,E.pop(),E.length>0?(g=E[E.length-1],it===!0&&st.setGlobalState(y.clippingPlanes,g.state.camera)):g=null,w.pop(),w.length>0?m=w[w.length-1]:m=null};function na(A,F,W,X){if(A.visible===!1)return;if(A.layers.test(F.layers)){if(A.isGroup)W=A.renderOrder;else if(A.isLOD)A.autoUpdate===!0&&A.update(F);else if(A.isLight)g.pushLight(A),A.castShadow&&g.pushShadow(A);else if(A.isSprite){if(!A.frustumCulled||Z.intersectsSprite(A)){X&&Nt.setFromMatrixPosition(A.matrixWorld).applyMatrix4(Et);const ut=K.update(A),xt=A.material;xt.visible&&m.push(A,ut,xt,W,Nt.z,null)}}else if((A.isMesh||A.isLine||A.isPoints)&&(!A.frustumCulled||Z.intersectsObject(A))){const ut=K.update(A),xt=A.material;if(X&&(A.boundingSphere!==void 0?(A.boundingSphere===null&&A.computeBoundingSphere(),Nt.copy(A.boundingSphere.center)):(ut.boundingSphere===null&&ut.computeBoundingSphere(),Nt.copy(ut.boundingSphere.center)),Nt.applyMatrix4(A.matrixWorld).applyMatrix4(Et)),Array.isArray(xt)){const yt=ut.groups;for(let It=0,Lt=yt.length;It<Lt;It++){const Mt=yt[It],Xt=xt[Mt.materialIndex];Xt&&Xt.visible&&m.push(A,ut,Xt,W,Nt.z,Mt)}}else xt.visible&&m.push(A,ut,xt,W,Nt.z,null)}}const rt=A.children;for(let ut=0,xt=rt.length;ut<xt;ut++)na(rt[ut],F,W,X)}function vl(A,F,W,X){const N=A.opaque,rt=A.transmissive,ut=A.transparent;g.setupLightsView(W),it===!0&&st.setGlobalState(y.clippingPlanes,W),X&&Tt.viewport(C.copy(X)),N.length>0&&qs(N,F,W),rt.length>0&&qs(rt,F,W),ut.length>0&&qs(ut,F,W),Tt.buffers.depth.setTest(!0),Tt.buffers.depth.setMask(!0),Tt.buffers.color.setMask(!0),Tt.setPolygonOffset(!1)}function xl(A,F,W,X){if((W.isScene===!0?W.overrideMaterial:null)!==null)return;g.state.transmissionRenderTarget[X.id]===void 0&&(g.state.transmissionRenderTarget[X.id]=new _i(1,1,{generateMipmaps:!0,type:zt.has("EXT_color_buffer_half_float")||zt.has("EXT_color_buffer_float")?Os:kn,minFilter:di,samples:4,stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:Wt.workingColorSpace}));const rt=g.state.transmissionRenderTarget[X.id],ut=X.viewport||C;rt.setSize(ut.z,ut.w);const xt=y.getRenderTarget();y.setRenderTarget(rt),y.getClearColor(D),O=y.getClearAlpha(),O<1&&y.setClearColor(16777215,.5),y.clear(),Ot&&At.render(W);const yt=y.toneMapping;y.toneMapping=qn;const It=X.viewport;if(X.viewport!==void 0&&(X.viewport=void 0),g.setupLightsView(X),it===!0&&st.setGlobalState(y.clippingPlanes,X),qs(A,W,X),P.updateMultisampleRenderTarget(rt),P.updateRenderTargetMipmap(rt),zt.has("WEBGL_multisampled_render_to_texture")===!1){let Lt=!1;for(let Mt=0,Xt=F.length;Mt<Xt;Mt++){const ie=F[Mt],ae=ie.object,ke=ie.geometry,Zt=ie.material,wt=ie.group;if(Zt.side===He&&ae.layers.test(X.layers)){const Mn=Zt.side;Zt.side=Ue,Zt.needsUpdate=!0,yl(ae,W,X,ke,Zt,wt),Zt.side=Mn,Zt.needsUpdate=!0,Lt=!0}}Lt===!0&&(P.updateMultisampleRenderTarget(rt),P.updateRenderTargetMipmap(rt))}y.setRenderTarget(xt),y.setClearColor(D,O),It!==void 0&&(X.viewport=It),y.toneMapping=yt}function qs(A,F,W){const X=F.isScene===!0?F.overrideMaterial:null;for(let N=0,rt=A.length;N<rt;N++){const ut=A[N],xt=ut.object,yt=ut.geometry,It=X===null?ut.material:X,Lt=ut.group;xt.layers.test(W.layers)&&yl(xt,F,W,yt,It,Lt)}}function yl(A,F,W,X,N,rt){A.onBeforeRender(y,F,W,X,N,rt),A.modelViewMatrix.multiplyMatrices(W.matrixWorldInverse,A.matrixWorld),A.normalMatrix.getNormalMatrix(A.modelViewMatrix),N.onBeforeRender(y,F,W,X,A,rt),N.transparent===!0&&N.side===He&&N.forceSinglePass===!1?(N.side=Ue,N.needsUpdate=!0,y.renderBufferDirect(W,F,X,N,A,rt),N.side=Jn,N.needsUpdate=!0,y.renderBufferDirect(W,F,X,N,A,rt),N.side=He):y.renderBufferDirect(W,F,X,N,A,rt),A.onAfterRender(y,F,W,X,N,rt)}function Zs(A,F,W){F.isScene!==!0&&(F=ce);const X=bt.get(A),N=g.state.lights,rt=g.state.shadowsArray,ut=N.state.version,xt=St.getParameters(A,N.state,rt,F,W),yt=St.getProgramCacheKey(xt);let It=X.programs;X.environment=A.isMeshStandardMaterial?F.environment:null,X.fog=F.fog,X.envMap=(A.isMeshStandardMaterial?V:T).get(A.envMap||X.environment),X.envMapRotation=X.environment!==null&&A.envMap===null?F.environmentRotation:A.envMapRotation,It===void 0&&(A.addEventListener("dispose",Dt),It=new Map,X.programs=It);let Lt=It.get(yt);if(Lt!==void 0){if(X.currentProgram===Lt&&X.lightsStateVersion===ut)return Sl(A,xt),Lt}else xt.uniforms=St.getUniforms(A),A.onBeforeCompile(xt,y),Lt=St.acquireProgram(xt,yt),It.set(yt,Lt),X.uniforms=xt.uniforms;const Mt=X.uniforms;return(!A.isShaderMaterial&&!A.isRawShaderMaterial||A.clipping===!0)&&(Mt.clippingPlanes=st.uniform),Sl(A,xt),X.needsLights=Hu(A),X.lightsStateVersion=ut,X.needsLights&&(Mt.ambientLightColor.value=N.state.ambient,Mt.lightProbe.value=N.state.probe,Mt.directionalLights.value=N.state.directional,Mt.directionalLightShadows.value=N.state.directionalShadow,Mt.spotLights.value=N.state.spot,Mt.spotLightShadows.value=N.state.spotShadow,Mt.rectAreaLights.value=N.state.rectArea,Mt.ltc_1.value=N.state.rectAreaLTC1,Mt.ltc_2.value=N.state.rectAreaLTC2,Mt.pointLights.value=N.state.point,Mt.pointLightShadows.value=N.state.pointShadow,Mt.hemisphereLights.value=N.state.hemi,Mt.directionalShadowMap.value=N.state.directionalShadowMap,Mt.directionalShadowMatrix.value=N.state.directionalShadowMatrix,Mt.spotShadowMap.value=N.state.spotShadowMap,Mt.spotLightMatrix.value=N.state.spotLightMatrix,Mt.spotLightMap.value=N.state.spotLightMap,Mt.pointShadowMap.value=N.state.pointShadowMap,Mt.pointShadowMatrix.value=N.state.pointShadowMatrix),X.currentProgram=Lt,X.uniformsList=null,Lt}function Ml(A){if(A.uniformsList===null){const F=A.currentProgram.getUniforms();A.uniformsList=Fr.seqWithValue(F.seq,A.uniforms)}return A.uniformsList}function Sl(A,F){const W=bt.get(A);W.outputColorSpace=F.outputColorSpace,W.batching=F.batching,W.batchingColor=F.batchingColor,W.instancing=F.instancing,W.instancingColor=F.instancingColor,W.instancingMorph=F.instancingMorph,W.skinning=F.skinning,W.morphTargets=F.morphTargets,W.morphNormals=F.morphNormals,W.morphColors=F.morphColors,W.morphTargetsCount=F.morphTargetsCount,W.numClippingPlanes=F.numClippingPlanes,W.numIntersection=F.numClipIntersection,W.vertexAlphas=F.vertexAlphas,W.vertexTangents=F.vertexTangents,W.toneMapping=F.toneMapping}function Ou(A,F,W,X,N){F.isScene!==!0&&(F=ce),P.resetTextureUnits();const rt=F.fog,ut=X.isMeshStandardMaterial?F.environment:null,xt=R===null?y.outputColorSpace:R.isXRRenderTarget===!0?R.texture.colorSpace:is,yt=(X.isMeshStandardMaterial?V:T).get(X.envMap||ut),It=X.vertexColors===!0&&!!W.attributes.color&&W.attributes.color.itemSize===4,Lt=!!W.attributes.tangent&&(!!X.normalMap||X.anisotropy>0),Mt=!!W.morphAttributes.position,Xt=!!W.morphAttributes.normal,ie=!!W.morphAttributes.color;let ae=qn;X.toneMapped&&(R===null||R.isXRRenderTarget===!0)&&(ae=y.toneMapping);const ke=W.morphAttributes.position||W.morphAttributes.normal||W.morphAttributes.color,Zt=ke!==void 0?ke.length:0,wt=bt.get(X),Mn=g.state.lights;if(it===!0&&(vt===!0||A!==x)){const je=A===x&&X.id===v;st.setState(X,A,je)}let Kt=!1;X.version===wt.__version?(wt.needsLights&&wt.lightsStateVersion!==Mn.state.version||wt.outputColorSpace!==xt||N.isBatchedMesh&&wt.batching===!1||!N.isBatchedMesh&&wt.batching===!0||N.isBatchedMesh&&wt.batchingColor===!0&&N.colorTexture===null||N.isBatchedMesh&&wt.batchingColor===!1&&N.colorTexture!==null||N.isInstancedMesh&&wt.instancing===!1||!N.isInstancedMesh&&wt.instancing===!0||N.isSkinnedMesh&&wt.skinning===!1||!N.isSkinnedMesh&&wt.skinning===!0||N.isInstancedMesh&&wt.instancingColor===!0&&N.instanceColor===null||N.isInstancedMesh&&wt.instancingColor===!1&&N.instanceColor!==null||N.isInstancedMesh&&wt.instancingMorph===!0&&N.morphTexture===null||N.isInstancedMesh&&wt.instancingMorph===!1&&N.morphTexture!==null||wt.envMap!==yt||X.fog===!0&&wt.fog!==rt||wt.numClippingPlanes!==void 0&&(wt.numClippingPlanes!==st.numPlanes||wt.numIntersection!==st.numIntersection)||wt.vertexAlphas!==It||wt.vertexTangents!==Lt||wt.morphTargets!==Mt||wt.morphNormals!==Xt||wt.morphColors!==ie||wt.toneMapping!==ae||wt.morphTargetsCount!==Zt)&&(Kt=!0):(Kt=!0,wt.__version=X.version);let an=wt.currentProgram;Kt===!0&&(an=Zs(X,F,N));let bi=!1,We=!1,hs=!1;const oe=an.getUniforms(),dn=wt.uniforms;if(Tt.useProgram(an.program)&&(bi=!0,We=!0,hs=!0),X.id!==v&&(v=X.id,We=!0),bi||x!==A){Tt.buffers.depth.getReversed()?(ot.copy(A.projectionMatrix),Fd(ot),Nd(ot),oe.setValue(B,"projectionMatrix",ot)):oe.setValue(B,"projectionMatrix",A.projectionMatrix),oe.setValue(B,"viewMatrix",A.matrixWorldInverse);const Fn=oe.map.cameraPosition;Fn!==void 0&&Fn.setValue(B,Rt.setFromMatrixPosition(A.matrixWorld)),Ht.logarithmicDepthBuffer&&oe.setValue(B,"logDepthBufFC",2/(Math.log(A.far+1)/Math.LN2)),(X.isMeshPhongMaterial||X.isMeshToonMaterial||X.isMeshLambertMaterial||X.isMeshBasicMaterial||X.isMeshStandardMaterial||X.isShaderMaterial)&&oe.setValue(B,"isOrthographic",A.isOrthographicCamera===!0),x!==A&&(x=A,We=!0,hs=!0)}if(N.isSkinnedMesh){oe.setOptional(B,N,"bindMatrix"),oe.setOptional(B,N,"bindMatrixInverse");const je=N.skeleton;je&&(je.boneTexture===null&&je.computeBoneTexture(),oe.setValue(B,"boneTexture",je.boneTexture,P))}N.isBatchedMesh&&(oe.setOptional(B,N,"batchingTexture"),oe.setValue(B,"batchingTexture",N._matricesTexture,P),oe.setOptional(B,N,"batchingIdTexture"),oe.setValue(B,"batchingIdTexture",N._indirectTexture,P),oe.setOptional(B,N,"batchingColorTexture"),N._colorsTexture!==null&&oe.setValue(B,"batchingColorTexture",N._colorsTexture,P));const us=W.morphAttributes;if((us.position!==void 0||us.normal!==void 0||us.color!==void 0)&&Ct.update(N,W,an),(We||wt.receiveShadow!==N.receiveShadow)&&(wt.receiveShadow=N.receiveShadow,oe.setValue(B,"receiveShadow",N.receiveShadow)),X.isMeshGouraudMaterial&&X.envMap!==null&&(dn.envMap.value=yt,dn.flipEnvMap.value=yt.isCubeTexture&&yt.isRenderTargetTexture===!1?-1:1),X.isMeshStandardMaterial&&X.envMap===null&&F.environment!==null&&(dn.envMapIntensity.value=F.environmentIntensity),We&&(oe.setValue(B,"toneMappingExposure",y.toneMappingExposure),wt.needsLights&&zu(dn,hs),rt&&X.fog===!0&&ct.refreshFogUniforms(dn,rt),ct.refreshMaterialUniforms(dn,X,z,$,g.state.transmissionRenderTarget[A.id]),Fr.upload(B,Ml(wt),dn,P)),X.isShaderMaterial&&X.uniformsNeedUpdate===!0&&(Fr.upload(B,Ml(wt),dn,P),X.uniformsNeedUpdate=!1),X.isSpriteMaterial&&oe.setValue(B,"center",N.center),oe.setValue(B,"modelViewMatrix",N.modelViewMatrix),oe.setValue(B,"normalMatrix",N.normalMatrix),oe.setValue(B,"modelMatrix",N.matrixWorld),X.isShaderMaterial||X.isRawShaderMaterial){const je=X.uniformsGroups;for(let Fn=0,Nn=je.length;Fn<Nn;Fn++){const wl=je[Fn];k.update(wl,an),k.bind(wl,an)}}return an}function zu(A,F){A.ambientLightColor.needsUpdate=F,A.lightProbe.needsUpdate=F,A.directionalLights.needsUpdate=F,A.directionalLightShadows.needsUpdate=F,A.pointLights.needsUpdate=F,A.pointLightShadows.needsUpdate=F,A.spotLights.needsUpdate=F,A.spotLightShadows.needsUpdate=F,A.rectAreaLights.needsUpdate=F,A.hemisphereLights.needsUpdate=F}function Hu(A){return A.isMeshLambertMaterial||A.isMeshToonMaterial||A.isMeshPhongMaterial||A.isMeshStandardMaterial||A.isShadowMaterial||A.isShaderMaterial&&A.lights===!0}this.getActiveCubeFace=function(){return S},this.getActiveMipmapLevel=function(){return M},this.getRenderTarget=function(){return R},this.setRenderTargetTextures=function(A,F,W){bt.get(A.texture).__webglTexture=F,bt.get(A.depthTexture).__webglTexture=W;const X=bt.get(A);X.__hasExternalTextures=!0,X.__autoAllocateDepthBuffer=W===void 0,X.__autoAllocateDepthBuffer||zt.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),X.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(A,F){const W=bt.get(A);W.__webglFramebuffer=F,W.__useDefaultFramebuffer=F===void 0},this.setRenderTarget=function(A,F=0,W=0){R=A,S=F,M=W;let X=!0,N=null,rt=!1,ut=!1;if(A){const yt=bt.get(A);if(yt.__useDefaultFramebuffer!==void 0)Tt.bindFramebuffer(B.FRAMEBUFFER,null),X=!1;else if(yt.__webglFramebuffer===void 0)P.setupRenderTarget(A);else if(yt.__hasExternalTextures)P.rebindTextures(A,bt.get(A.texture).__webglTexture,bt.get(A.depthTexture).__webglTexture);else if(A.depthBuffer){const Mt=A.depthTexture;if(yt.__boundDepthTexture!==Mt){if(Mt!==null&&bt.has(Mt)&&(A.width!==Mt.image.width||A.height!==Mt.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");P.setupDepthRenderbuffer(A)}}const It=A.texture;(It.isData3DTexture||It.isDataArrayTexture||It.isCompressedArrayTexture)&&(ut=!0);const Lt=bt.get(A).__webglFramebuffer;A.isWebGLCubeRenderTarget?(Array.isArray(Lt[F])?N=Lt[F][W]:N=Lt[F],rt=!0):A.samples>0&&P.useMultisampledRTT(A)===!1?N=bt.get(A).__webglMultisampledFramebuffer:Array.isArray(Lt)?N=Lt[W]:N=Lt,C.copy(A.viewport),L.copy(A.scissor),U=A.scissorTest}else C.copy(gt).multiplyScalar(z).floor(),L.copy(_t).multiplyScalar(z).floor(),U=Pt;if(Tt.bindFramebuffer(B.FRAMEBUFFER,N)&&X&&Tt.drawBuffers(A,N),Tt.viewport(C),Tt.scissor(L),Tt.setScissorTest(U),rt){const yt=bt.get(A.texture);B.framebufferTexture2D(B.FRAMEBUFFER,B.COLOR_ATTACHMENT0,B.TEXTURE_CUBE_MAP_POSITIVE_X+F,yt.__webglTexture,W)}else if(ut){const yt=bt.get(A.texture),It=F||0;B.framebufferTextureLayer(B.FRAMEBUFFER,B.COLOR_ATTACHMENT0,yt.__webglTexture,W||0,It)}v=-1},this.readRenderTargetPixels=function(A,F,W,X,N,rt,ut){if(!(A&&A.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let xt=bt.get(A).__webglFramebuffer;if(A.isWebGLCubeRenderTarget&&ut!==void 0&&(xt=xt[ut]),xt){Tt.bindFramebuffer(B.FRAMEBUFFER,xt);try{const yt=A.texture,It=yt.format,Lt=yt.type;if(!Ht.textureFormatReadable(It)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!Ht.textureTypeReadable(Lt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}F>=0&&F<=A.width-X&&W>=0&&W<=A.height-N&&B.readPixels(F,W,X,N,kt.convert(It),kt.convert(Lt),rt)}finally{const yt=R!==null?bt.get(R).__webglFramebuffer:null;Tt.bindFramebuffer(B.FRAMEBUFFER,yt)}}},this.readRenderTargetPixelsAsync=async function(A,F,W,X,N,rt,ut){if(!(A&&A.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let xt=bt.get(A).__webglFramebuffer;if(A.isWebGLCubeRenderTarget&&ut!==void 0&&(xt=xt[ut]),xt){const yt=A.texture,It=yt.format,Lt=yt.type;if(!Ht.textureFormatReadable(It))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!Ht.textureTypeReadable(Lt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(F>=0&&F<=A.width-X&&W>=0&&W<=A.height-N){Tt.bindFramebuffer(B.FRAMEBUFFER,xt);const Mt=B.createBuffer();B.bindBuffer(B.PIXEL_PACK_BUFFER,Mt),B.bufferData(B.PIXEL_PACK_BUFFER,rt.byteLength,B.STREAM_READ),B.readPixels(F,W,X,N,kt.convert(It),kt.convert(Lt),0);const Xt=R!==null?bt.get(R).__webglFramebuffer:null;Tt.bindFramebuffer(B.FRAMEBUFFER,Xt);const ie=B.fenceSync(B.SYNC_GPU_COMMANDS_COMPLETE,0);return B.flush(),await kd(B,ie,4),B.bindBuffer(B.PIXEL_PACK_BUFFER,Mt),B.getBufferSubData(B.PIXEL_PACK_BUFFER,0,rt),B.deleteBuffer(Mt),B.deleteSync(ie),rt}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(A,F=null,W=0){A.isTexture!==!0&&(ys("WebGLRenderer: copyFramebufferToTexture function signature has changed."),F=arguments[0]||null,A=arguments[1]);const X=Math.pow(2,-W),N=Math.floor(A.image.width*X),rt=Math.floor(A.image.height*X),ut=F!==null?F.x:0,xt=F!==null?F.y:0;P.setTexture2D(A,0),B.copyTexSubImage2D(B.TEXTURE_2D,W,0,0,ut,xt,N,rt),Tt.unbindTexture()},this.copyTextureToTexture=function(A,F,W=null,X=null,N=0){A.isTexture!==!0&&(ys("WebGLRenderer: copyTextureToTexture function signature has changed."),X=arguments[0]||null,A=arguments[1],F=arguments[2],N=arguments[3]||0,W=null);let rt,ut,xt,yt,It,Lt,Mt,Xt,ie;const ae=A.isCompressedTexture?A.mipmaps[N]:A.image;W!==null?(rt=W.max.x-W.min.x,ut=W.max.y-W.min.y,xt=W.isBox3?W.max.z-W.min.z:1,yt=W.min.x,It=W.min.y,Lt=W.isBox3?W.min.z:0):(rt=ae.width,ut=ae.height,xt=ae.depth||1,yt=0,It=0,Lt=0),X!==null?(Mt=X.x,Xt=X.y,ie=X.z):(Mt=0,Xt=0,ie=0);const ke=kt.convert(F.format),Zt=kt.convert(F.type);let wt;F.isData3DTexture?(P.setTexture3D(F,0),wt=B.TEXTURE_3D):F.isDataArrayTexture||F.isCompressedArrayTexture?(P.setTexture2DArray(F,0),wt=B.TEXTURE_2D_ARRAY):(P.setTexture2D(F,0),wt=B.TEXTURE_2D),B.pixelStorei(B.UNPACK_FLIP_Y_WEBGL,F.flipY),B.pixelStorei(B.UNPACK_PREMULTIPLY_ALPHA_WEBGL,F.premultiplyAlpha),B.pixelStorei(B.UNPACK_ALIGNMENT,F.unpackAlignment);const Mn=B.getParameter(B.UNPACK_ROW_LENGTH),Kt=B.getParameter(B.UNPACK_IMAGE_HEIGHT),an=B.getParameter(B.UNPACK_SKIP_PIXELS),bi=B.getParameter(B.UNPACK_SKIP_ROWS),We=B.getParameter(B.UNPACK_SKIP_IMAGES);B.pixelStorei(B.UNPACK_ROW_LENGTH,ae.width),B.pixelStorei(B.UNPACK_IMAGE_HEIGHT,ae.height),B.pixelStorei(B.UNPACK_SKIP_PIXELS,yt),B.pixelStorei(B.UNPACK_SKIP_ROWS,It),B.pixelStorei(B.UNPACK_SKIP_IMAGES,Lt);const hs=A.isDataArrayTexture||A.isData3DTexture,oe=F.isDataArrayTexture||F.isData3DTexture;if(A.isRenderTargetTexture||A.isDepthTexture){const dn=bt.get(A),us=bt.get(F),je=bt.get(dn.__renderTarget),Fn=bt.get(us.__renderTarget);Tt.bindFramebuffer(B.READ_FRAMEBUFFER,je.__webglFramebuffer),Tt.bindFramebuffer(B.DRAW_FRAMEBUFFER,Fn.__webglFramebuffer);for(let Nn=0;Nn<xt;Nn++)hs&&B.framebufferTextureLayer(B.READ_FRAMEBUFFER,B.COLOR_ATTACHMENT0,bt.get(A).__webglTexture,N,Lt+Nn),A.isDepthTexture?(oe&&B.framebufferTextureLayer(B.DRAW_FRAMEBUFFER,B.COLOR_ATTACHMENT0,bt.get(F).__webglTexture,N,ie+Nn),B.blitFramebuffer(yt,It,rt,ut,Mt,Xt,rt,ut,B.DEPTH_BUFFER_BIT,B.NEAREST)):oe?B.copyTexSubImage3D(wt,N,Mt,Xt,ie+Nn,yt,It,rt,ut):B.copyTexSubImage2D(wt,N,Mt,Xt,ie+Nn,yt,It,rt,ut);Tt.bindFramebuffer(B.READ_FRAMEBUFFER,null),Tt.bindFramebuffer(B.DRAW_FRAMEBUFFER,null)}else oe?A.isDataTexture||A.isData3DTexture?B.texSubImage3D(wt,N,Mt,Xt,ie,rt,ut,xt,ke,Zt,ae.data):F.isCompressedArrayTexture?B.compressedTexSubImage3D(wt,N,Mt,Xt,ie,rt,ut,xt,ke,ae.data):B.texSubImage3D(wt,N,Mt,Xt,ie,rt,ut,xt,ke,Zt,ae):A.isDataTexture?B.texSubImage2D(B.TEXTURE_2D,N,Mt,Xt,rt,ut,ke,Zt,ae.data):A.isCompressedTexture?B.compressedTexSubImage2D(B.TEXTURE_2D,N,Mt,Xt,ae.width,ae.height,ke,ae.data):B.texSubImage2D(B.TEXTURE_2D,N,Mt,Xt,rt,ut,ke,Zt,ae);B.pixelStorei(B.UNPACK_ROW_LENGTH,Mn),B.pixelStorei(B.UNPACK_IMAGE_HEIGHT,Kt),B.pixelStorei(B.UNPACK_SKIP_PIXELS,an),B.pixelStorei(B.UNPACK_SKIP_ROWS,bi),B.pixelStorei(B.UNPACK_SKIP_IMAGES,We),N===0&&F.generateMipmaps&&B.generateMipmap(wt),Tt.unbindTexture()},this.copyTextureToTexture3D=function(A,F,W=null,X=null,N=0){return A.isTexture!==!0&&(ys("WebGLRenderer: copyTextureToTexture3D function signature has changed."),W=arguments[0]||null,X=arguments[1]||null,A=arguments[2],F=arguments[3],N=arguments[4]||0),ys('WebGLRenderer: copyTextureToTexture3D function has been deprecated. Use "copyTextureToTexture" instead.'),this.copyTextureToTexture(A,F,W,X,N)},this.initRenderTarget=function(A){bt.get(A).__webglFramebuffer===void 0&&P.setupRenderTarget(A)},this.initTexture=function(A){A.isCubeTexture?P.setTextureCube(A,0):A.isData3DTexture?P.setTexture3D(A,0):A.isDataArrayTexture||A.isCompressedArrayTexture?P.setTexture2DArray(A,0):P.setTexture2D(A,0),Tt.unbindTexture()},this.resetState=function(){S=0,M=0,R=null,Tt.reset(),ne.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Pn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;const e=this.getContext();e.drawingBufferColorspace=Wt._getDrawingBufferColorSpace(t),e.unpackColorSpace=Wt._getUnpackColorSpace()}}class Hr{constructor(t,e=25e-5){this.isFogExp2=!0,this.name="",this.color=new Bt(t),this.density=e}clone(){return new Hr(this.color,this.density)}toJSON(){return{type:"FogExp2",name:this.name,color:this.color.getHex(),density:this.density}}}class al extends be{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new nn,this.environmentIntensity=1,this.environmentRotation=new nn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){const e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(e.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(e.object.backgroundIntensity=this.backgroundIntensity),e.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(e.object.environmentIntensity=this.environmentIntensity),e.object.environmentRotation=this.environmentRotation.toArray(),e}}class jh extends Si{static get type(){return"LineBasicMaterial"}constructor(t){super(),this.isLineBasicMaterial=!0,this.color=new Bt(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.linewidth=t.linewidth,this.linecap=t.linecap,this.linejoin=t.linejoin,this.fog=t.fog,this}}const Gr=new G,Vr=new G,yc=new ee,vs=new il,_r=new Gs,Da=new G,Mc=new G;class q_ extends be{constructor(t=new Ie,e=new jh){super(),this.isLine=!0,this.type="Line",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}computeLineDistances(){const t=this.geometry;if(t.index===null){const e=t.attributes.position,n=[0];for(let s=1,r=e.count;s<r;s++)Gr.fromBufferAttribute(e,s-1),Vr.fromBufferAttribute(e,s),n[s]=n[s-1],n[s]+=Gr.distanceTo(Vr);t.setAttribute("lineDistance",new ue(n,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(t,e){const n=this.geometry,s=this.matrixWorld,r=t.params.Line.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),_r.copy(n.boundingSphere),_r.applyMatrix4(s),_r.radius+=r,t.ray.intersectsSphere(_r)===!1)return;yc.copy(s).invert(),vs.copy(t.ray).applyMatrix4(yc);const a=r/((this.scale.x+this.scale.y+this.scale.z)/3),c=a*a,l=this.isLineSegments?2:1,h=n.index,u=n.attributes.position;if(h!==null){const d=Math.max(0,o.start),p=Math.min(h.count,o.start+o.count);for(let _=d,m=p-1;_<m;_+=l){const g=h.getX(_),w=h.getX(_+1),E=vr(this,t,vs,c,g,w);E&&e.push(E)}if(this.isLineLoop){const _=h.getX(p-1),m=h.getX(d),g=vr(this,t,vs,c,_,m);g&&e.push(g)}}else{const d=Math.max(0,o.start),p=Math.min(u.count,o.start+o.count);for(let _=d,m=p-1;_<m;_+=l){const g=vr(this,t,vs,c,_,_+1);g&&e.push(g)}if(this.isLineLoop){const _=vr(this,t,vs,c,p-1,d);_&&e.push(_)}}}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){const a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}}function vr(i,t,e,n,s,r){const o=i.geometry.attributes.position;if(Gr.fromBufferAttribute(o,s),Vr.fromBufferAttribute(o,r),e.distanceSqToSegment(Gr,Vr,Da,Mc)>n)return;Da.applyMatrix4(i.matrixWorld);const c=t.ray.origin.distanceTo(Da);if(!(c<t.near||c>t.far))return{distance:c,point:Mc.clone().applyMatrix4(i.matrixWorld),index:s,face:null,faceIndex:null,barycoord:null,object:i}}const Sc=new G,wc=new G;class Z_ extends q_{constructor(t,e){super(t,e),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const t=this.geometry;if(t.index===null){const e=t.attributes.position,n=[];for(let s=0,r=e.count;s<r;s+=2)Sc.fromBufferAttribute(e,s),wc.fromBufferAttribute(e,s+1),n[s]=s===0?0:n[s-1],n[s+1]=n[s]+Sc.distanceTo(wc);t.setAttribute("lineDistance",new ue(n,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class Jh extends Si{static get type(){return"PointsMaterial"}constructor(t){super(),this.isPointsMaterial=!0,this.color=new Bt(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.size=t.size,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}}const bc=new ee,Bo=new il,xr=new Gs,yr=new G;class K_ extends be{constructor(t=new Ie,e=new Jh){super(),this.isPoints=!0,this.type="Points",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}raycast(t,e){const n=this.geometry,s=this.matrixWorld,r=t.params.Points.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),xr.copy(n.boundingSphere),xr.applyMatrix4(s),xr.radius+=r,t.ray.intersectsSphere(xr)===!1)return;bc.copy(s).invert(),Bo.copy(t.ray).applyMatrix4(bc);const a=r/((this.scale.x+this.scale.y+this.scale.z)/3),c=a*a,l=n.index,f=n.attributes.position;if(l!==null){const u=Math.max(0,o.start),d=Math.min(l.count,o.start+o.count);for(let p=u,_=d;p<_;p++){const m=l.getX(p);yr.fromBufferAttribute(f,m),Ec(yr,m,c,s,t,e,this)}}else{const u=Math.max(0,o.start),d=Math.min(f.count,o.start+o.count);for(let p=u,_=d;p<_;p++)yr.fromBufferAttribute(f,p),Ec(yr,p,c,s,t,e,this)}}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){const a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}}function Ec(i,t,e,n,s,r,o){const a=Bo.distanceSqToPoint(i);if(a<e){const c=new G;Bo.closestPointToPoint(i,c),c.applyMatrix4(n);const l=s.ray.origin.distanceTo(c);if(l<s.near||l>s.far)return;r.push({distance:l,distanceToRay:Math.sqrt(a),point:c,index:t,face:null,faceIndex:null,barycoord:null,object:o})}}class Wr extends Pe{constructor(t,e,n,s,r,o,a,c,l){super(t,e,n,s,r,o,a,c,l),this.isCanvasTexture=!0,this.needsUpdate=!0}}const Mr=new G,Sr=new G,La=new G,wr=new Qe;class j_ extends Ie{constructor(t=null,e=1){if(super(),this.type="EdgesGeometry",this.parameters={geometry:t,thresholdAngle:e},t!==null){const s=Math.pow(10,4),r=Math.cos(kr*e),o=t.getIndex(),a=t.getAttribute("position"),c=o?o.count:a.count,l=[0,0,0],h=["a","b","c"],f=new Array(3),u={},d=[];for(let p=0;p<c;p+=3){o?(l[0]=o.getX(p),l[1]=o.getX(p+1),l[2]=o.getX(p+2)):(l[0]=p,l[1]=p+1,l[2]=p+2);const{a:_,b:m,c:g}=wr;if(_.fromBufferAttribute(a,l[0]),m.fromBufferAttribute(a,l[1]),g.fromBufferAttribute(a,l[2]),wr.getNormal(La),f[0]=`${Math.round(_.x*s)},${Math.round(_.y*s)},${Math.round(_.z*s)}`,f[1]=`${Math.round(m.x*s)},${Math.round(m.y*s)},${Math.round(m.z*s)}`,f[2]=`${Math.round(g.x*s)},${Math.round(g.y*s)},${Math.round(g.z*s)}`,!(f[0]===f[1]||f[1]===f[2]||f[2]===f[0]))for(let w=0;w<3;w++){const E=(w+1)%3,y=f[w],b=f[E],S=wr[h[w]],M=wr[h[E]],R=`${y}_${b}`,v=`${b}_${y}`;v in u&&u[v]?(La.dot(u[v].normal)<=r&&(d.push(S.x,S.y,S.z),d.push(M.x,M.y,M.z)),u[v]=null):R in u||(u[R]={index0:l[w],index1:l[E],normal:La.clone()})}}for(const p in u)if(u[p]){const{index0:_,index1:m}=u[p];Mr.fromBufferAttribute(a,_),Sr.fromBufferAttribute(a,m),d.push(Mr.x,Mr.y,Mr.z),d.push(Sr.x,Sr.y,Sr.z)}this.setAttribute("position",new ue(d,3))}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}}class Dn extends Si{static get type(){return"MeshLambertMaterial"}constructor(t){super(),this.isMeshLambertMaterial=!0,this.color=new Bt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Bt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Dh,this.normalScale=new jt(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new nn,this.combine=Ko,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}const Tc={enabled:!1,files:{},add:function(i,t){this.enabled!==!1&&(this.files[i]=t)},get:function(i){if(this.enabled!==!1)return this.files[i]},remove:function(i){delete this.files[i]},clear:function(){this.files={}}};class J_{constructor(t,e,n){const s=this;let r=!1,o=0,a=0,c;const l=[];this.onStart=void 0,this.onLoad=t,this.onProgress=e,this.onError=n,this.itemStart=function(h){a++,r===!1&&s.onStart!==void 0&&s.onStart(h,o,a),r=!0},this.itemEnd=function(h){o++,s.onProgress!==void 0&&s.onProgress(h,o,a),o===a&&(r=!1,s.onLoad!==void 0&&s.onLoad())},this.itemError=function(h){s.onError!==void 0&&s.onError(h)},this.resolveURL=function(h){return c?c(h):h},this.setURLModifier=function(h){return c=h,this},this.addHandler=function(h,f){return l.push(h,f),this},this.removeHandler=function(h){const f=l.indexOf(h);return f!==-1&&l.splice(f,2),this},this.getHandler=function(h){for(let f=0,u=l.length;f<u;f+=2){const d=l[f],p=l[f+1];if(d.global&&(d.lastIndex=0),d.test(h))return p}return null}}}const Q_=new J_;class ol{constructor(t){this.manager=t!==void 0?t:Q_,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(t,e){const n=this;return new Promise(function(s,r){n.load(t,s,e,r)})}parse(){}setCrossOrigin(t){return this.crossOrigin=t,this}setWithCredentials(t){return this.withCredentials=t,this}setPath(t){return this.path=t,this}setResourcePath(t){return this.resourcePath=t,this}setRequestHeader(t){return this.requestHeader=t,this}}ol.DEFAULT_MATERIAL_NAME="__DEFAULT";class t0 extends ol{constructor(t){super(t)}load(t,e,n,s){this.path!==void 0&&(t=this.path+t),t=this.manager.resolveURL(t);const r=this,o=Tc.get(t);if(o!==void 0)return r.manager.itemStart(t),setTimeout(function(){e&&e(o),r.manager.itemEnd(t)},0),o;const a=Ps("img");function c(){h(),Tc.add(t,this),e&&e(this),r.manager.itemEnd(t)}function l(f){h(),s&&s(f),r.manager.itemError(t),r.manager.itemEnd(t)}function h(){a.removeEventListener("load",c,!1),a.removeEventListener("error",l,!1)}return a.addEventListener("load",c,!1),a.addEventListener("error",l,!1),t.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(a.crossOrigin=this.crossOrigin),r.manager.itemStart(t),a.src=t,a}}class ts extends ol{constructor(t){super(t)}load(t,e,n,s){const r=new Pe,o=new t0(this.manager);return o.setCrossOrigin(this.crossOrigin),o.setPath(this.path),o.load(t,function(a){r.image=a,r.needsUpdate=!0,e!==void 0&&e(r)},n,s),r}}class Qh extends be{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new Bt(t),this.intensity=e}dispose(){}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){const e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,this.groundColor!==void 0&&(e.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(e.object.distance=this.distance),this.angle!==void 0&&(e.object.angle=this.angle),this.decay!==void 0&&(e.object.decay=this.decay),this.penumbra!==void 0&&(e.object.penumbra=this.penumbra),this.shadow!==void 0&&(e.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(e.object.target=this.target.uuid),e}}const Ua=new ee,Ac=new G,Cc=new G;class e0{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new jt(512,512),this.map=null,this.mapPass=null,this.matrix=new ee,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new sl,this._frameExtents=new jt(1,1),this._viewportCount=1,this._viewports=[new me(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(t){const e=this.camera,n=this.matrix;Ac.setFromMatrixPosition(t.matrixWorld),e.position.copy(Ac),Cc.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(Cc),e.updateMatrixWorld(),Ua.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Ua),n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(Ua)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.mapSize.copy(t.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const t={};return this.intensity!==1&&(t.intensity=this.intensity),this.bias!==0&&(t.bias=this.bias),this.normalBias!==0&&(t.normalBias=this.normalBias),this.radius!==1&&(t.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(t.mapSize=this.mapSize.toArray()),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}}class n0 extends e0{constructor(){super(new Xh(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class tu extends Qh{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(be.DEFAULT_UP),this.updateMatrix(),this.target=new be,this.shadow=new n0}dispose(){this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}}class eu extends Qh{constructor(t,e){super(t,e),this.isAmbientLight=!0,this.type="AmbientLight"}}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Zo}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Zo);const Rc=["white","light_gray","gray","black","brown","red","orange","yellow","lime","green","cyan","light_blue","blue","purple","magenta","pink"],i0={white:16383998,light_gray:10329495,gray:4673362,black:1908001,brown:8606770,red:11546150,orange:16351261,yellow:16701501,lime:8439583,green:6192150,cyan:1481884,light_blue:3847130,blue:3949738,purple:8991416,magenta:13061821,pink:15961002};class nt{static formatName(t){const e=`block.minecraft.${t}`,n=`item.minecraft.${t}`;return this.langMap[e]?this.langMap[e]:this.langMap[n]?this.langMap[n]:t.split("_").map(s=>s.charAt(0).toUpperCase()+s.slice(1)).join(" ")}static registerBlock(t){const e=this.blocksById.get(`minecraft:${t.shortId}`);if(e)return e;const n=this.nextBlockNumId++,s=`minecraft:${t.shortId}`,r={...t,numId:n,id:s,displayName:t.displayName||this.formatName(t.shortId)};if(this.blocksByNum.set(n,r),this.blocksById.set(s,r),this.blocksById.set(t.shortId,r),this.allBlocks.push(r),t.shape!=="air"&&t.shape!=="fluid"&&t.shape!=="bed_head"){const o=t.shortId==="straw_bed"?"block/straw_bed_particle":t.shape==="cross"||t.shape==="torch"?`block/${t.textures.north}`:`block/${t.textures.north}`;this.registerItem({shortId:t.shortId,displayName:r.displayName,isBlock:!0,blockNumId:n,texture:o,category:t.category,maxStack:t.shortId.endsWith("_bed")?1:64,is26_3:t.is26_3})}return r}static registerItem(t){const e=`minecraft:${t.shortId}`,n=this.itemsById.get(e);if(n)return n;const s={...t,id:e,displayName:t.displayName||this.formatName(t.shortId)};return this.itemsById.set(e,s),this.itemsById.set(t.shortId,s),this.allItems.push(s),s}static allFaces(t){return{top:t,bottom:t,north:t,south:t,east:t,west:t}}static topBottomSide(t,e,n){return{top:t,bottom:e,north:n,south:n,east:n,west:n}}static async init(){const[t,e,n,s,r,o,a]=await Promise.all([fetch("/assets/minecraft/lang/en_us.json").then(p=>p.json()).catch(()=>({})),fetch("/reports/blocks_summary.json").then(p=>p.json()).catch(()=>({})),fetch("/reports/registries.json").then(p=>p.json()).catch(()=>({})),fetch("/reports/packets.json").then(p=>p.json()).catch(()=>({})),fetch("/reports/texture_manifest.json").then(p=>p.json()).catch(()=>({block:[],item:[]})),fetch("/reports/resolved_block_models.json").then(p=>p.json()).catch(()=>({})),fetch("/reports/resolved_item_models.json").then(p=>p.json()).catch(()=>({}))]);this.langMap=t,this.officialBlocksSummary=e,this.officialRegistries=n,this.officialPackets=s;const c=new Set(r.block||[]);this.registerBlock({shortId:"air",shape:"air",transparent:!0,solid:!1,lightEmission:0,hardness:0,soundGroup:"stone",textures:this.allFaces("stone"),category:"natural"}),this.registerBlock({shortId:"stone",shape:"cube",transparent:!1,solid:!0,lightEmission:0,hardness:1.5,soundGroup:"stone",textures:this.allFaces("stone"),category:"natural"}),this.registerBlock({shortId:"grass_block",shape:"cube",transparent:!1,solid:!0,lightEmission:0,hardness:.6,soundGroup:"grass",tint:"grass",textures:this.topBottomSide("grass_block_top","dirt","grass_block_side"),category:"natural"}),this.registerBlock({shortId:"dirt",shape:"cube",transparent:!1,solid:!0,lightEmission:0,hardness:.5,soundGroup:"gravel",textures:this.allFaces("dirt"),category:"natural"}),this.registerBlock({shortId:"coarse_dirt",shape:"cube",transparent:!1,solid:!0,lightEmission:0,hardness:.5,soundGroup:"gravel",textures:this.allFaces("coarse_dirt"),category:"natural"}),this.registerBlock({shortId:"podzol",shape:"cube",transparent:!1,solid:!0,lightEmission:0,hardness:.5,soundGroup:"gravel",textures:this.topBottomSide("podzol_top","dirt","podzol_side"),category:"natural"}),this.registerBlock({shortId:"dirt_path",shape:"cube",transparent:!1,solid:!0,lightEmission:0,hardness:.65,soundGroup:"grass",textures:this.topBottomSide("dirt_path_top","dirt","dirt_path_side"),category:"natural"}),this.registerBlock({shortId:"cobblestone",shape:"cube",transparent:!1,solid:!0,lightEmission:0,hardness:2,soundGroup:"stone",textures:this.allFaces("cobblestone"),category:"building"}),this.registerBlock({shortId:"bedrock",shape:"cube",transparent:!1,solid:!0,lightEmission:0,hardness:-1,soundGroup:"stone",textures:this.allFaces("bedrock"),category:"natural"}),this.registerBlock({shortId:"sand",shape:"cube",transparent:!1,solid:!0,lightEmission:0,hardness:.5,soundGroup:"sand",textures:this.allFaces("sand"),category:"natural"}),this.registerBlock({shortId:"gravel",shape:"cube",transparent:!1,solid:!0,lightEmission:0,hardness:.6,soundGroup:"gravel",textures:this.allFaces("gravel"),category:"natural"}),this.registerBlock({shortId:"water",shape:"fluid",fluid:"water",transparent:!0,solid:!1,lightEmission:0,hardness:100,soundGroup:"stone",tint:"water",textures:this.allFaces("water_still"),category:"natural"}),this.registerBlock({shortId:"lava",shape:"fluid",fluid:"lava",transparent:!1,solid:!1,lightEmission:15,hardness:100,soundGroup:"stone",textures:this.allFaces("lava_still"),category:"natural"}),this.registerBlock({shortId:"poplar_log",shape:"pillar",transparent:!1,solid:!0,lightEmission:0,hardness:2,soundGroup:"wood",textures:this.topBottomSide("poplar_log_top","poplar_log_top","poplar_log"),category:"natural",is26_3:!0}),this.registerBlock({shortId:"stripped_poplar_log",shape:"pillar",transparent:!1,solid:!0,lightEmission:0,hardness:2,soundGroup:"wood",textures:this.topBottomSide("stripped_poplar_log_top","stripped_poplar_log_top","stripped_poplar_log"),category:"building",is26_3:!0}),this.registerBlock({shortId:"poplar_wood",shape:"cube",transparent:!1,solid:!0,lightEmission:0,hardness:2,soundGroup:"wood",textures:this.allFaces("poplar_log"),category:"building",is26_3:!0}),this.registerBlock({shortId:"stripped_poplar_wood",shape:"cube",transparent:!1,solid:!0,lightEmission:0,hardness:2,soundGroup:"wood",textures:this.allFaces("stripped_poplar_log"),category:"building",is26_3:!0}),this.registerBlock({shortId:"poplar_planks",shape:"cube",transparent:!1,solid:!0,lightEmission:0,hardness:2,soundGroup:"wood",textures:this.allFaces("poplar_planks"),category:"building",is26_3:!0}),this.registerBlock({shortId:"poplar_stairs",shape:"stairs",transparent:!0,solid:!0,lightEmission:0,hardness:2,soundGroup:"wood",textures:this.allFaces("poplar_planks"),category:"building",is26_3:!0}),this.registerBlock({shortId:"poplar_slab",shape:"slab_bottom",transparent:!0,solid:!0,lightEmission:0,hardness:2,soundGroup:"wood",textures:this.allFaces("poplar_planks"),category:"building",is26_3:!0}),this.registerBlock({shortId:"poplar_fence",shape:"fence",transparent:!0,solid:!0,lightEmission:0,hardness:2,soundGroup:"wood",textures:this.allFaces("poplar_planks"),category:"building",is26_3:!0}),this.registerBlock({shortId:"poplar_trapdoor",shape:"trapdoor",transparent:!0,solid:!0,lightEmission:0,hardness:3,soundGroup:"wood",textures:this.allFaces("poplar_trapdoor"),category:"building",is26_3:!0}),this.registerBlock({shortId:"poplar_shelf",shape:"slab_top",transparent:!0,solid:!0,lightEmission:0,hardness:2,soundGroup:"wood",textures:this.topBottomSide("poplar_shelf_top","poplar_shelf_top","poplar_shelf_front"),category:"functional",is26_3:!0}),this.registerBlock({shortId:"orange_poplar_leaves",shape:"cube",transparent:!0,solid:!0,lightEmission:0,hardness:.2,soundGroup:"poplar_leaves",textures:this.allFaces("orange_poplar_leaves"),category:"natural",is26_3:!0}),this.registerBlock({shortId:"red_poplar_leaves",shape:"cube",transparent:!0,solid:!0,lightEmission:0,hardness:.2,soundGroup:"poplar_leaves",textures:this.allFaces("red_poplar_leaves"),category:"natural",is26_3:!0}),this.registerBlock({shortId:"yellow_poplar_leaves",shape:"cube",transparent:!0,solid:!0,lightEmission:0,hardness:.2,soundGroup:"poplar_leaves",textures:this.allFaces("yellow_poplar_leaves"),category:"natural",is26_3:!0}),this.registerBlock({shortId:"poplar_sapling",shape:"cross",transparent:!0,solid:!1,lightEmission:0,hardness:0,soundGroup:"grass",textures:this.allFaces("poplar_sapling"),category:"natural",is26_3:!0}),this.registerBlock({shortId:"straw_bed",shape:"bed_foot",transparent:!0,solid:!0,lightEmission:0,hardness:.2,soundGroup:"straw_bed",textures:this.topBottomSide("straw_bed_foot_top","oak_planks","straw_bed_side"),category:"functional",is26_3:!0}),this.registerBlock({shortId:"straw_bed_head",shape:"bed_head",transparent:!0,solid:!0,lightEmission:0,hardness:.2,soundGroup:"straw_bed",textures:this.topBottomSide("straw_bed_head_top","oak_planks","straw_bed_side"),category:"functional",is26_3:!0});for(const p of Rc)this.registerItem({shortId:`${p}_cushion`,isBlock:!1,texture:`item/${p}_cushion`,category:"colored",maxStack:16,is26_3:!0,cushionColor:p});for(const p of Rc){const _=`${p}_wool`;this.registerBlock({shortId:`${p}_wool`,shape:"cube",transparent:!1,solid:!0,lightEmission:0,hardness:.8,soundGroup:"wool",textures:this.allFaces(_),category:"colored"}),this.registerBlock({shortId:`${p}_wool_stairs`,shape:"stairs",transparent:!0,solid:!0,lightEmission:0,hardness:.8,soundGroup:"wool",textures:this.allFaces(_),category:"colored",is26_3:!0}),this.registerBlock({shortId:`${p}_wool_slab`,shape:"slab_bottom",transparent:!0,solid:!0,lightEmission:0,hardness:.8,soundGroup:"wool",textures:this.allFaces(_),category:"colored",is26_3:!0});const m=`${p}_concrete`;this.registerBlock({shortId:`${p}_concrete`,shape:"cube",transparent:!1,solid:!0,lightEmission:0,hardness:1.8,soundGroup:"stone",textures:this.allFaces(m),category:"colored"}),this.registerBlock({shortId:`${p}_concrete_stairs`,shape:"stairs",transparent:!0,solid:!0,lightEmission:0,hardness:1.8,soundGroup:"stone",textures:this.allFaces(m),category:"colored",is26_3:!0}),this.registerBlock({shortId:`${p}_concrete_slab`,shape:"slab_bottom",transparent:!0,solid:!0,lightEmission:0,hardness:1.8,soundGroup:"stone",textures:this.allFaces(m),category:"colored",is26_3:!0})}const l=["oak","birch","spruce","cherry","pale_oak","dark_oak","jungle","acacia","mangrove"];for(const p of l)c.has(`${p}_log`)&&this.registerBlock({shortId:`${p}_log`,shape:"pillar",transparent:!1,solid:!0,lightEmission:0,hardness:2,soundGroup:"wood",textures:this.topBottomSide(`${p}_log_top`,`${p}_log_top`,`${p}_log`),category:"natural"}),c.has(`${p}_planks`)&&(this.registerBlock({shortId:`${p}_planks`,shape:"cube",transparent:!1,solid:!0,lightEmission:0,hardness:2,soundGroup:"wood",textures:this.allFaces(`${p}_planks`),category:"building"}),this.registerBlock({shortId:`${p}_stairs`,shape:"stairs",transparent:!0,solid:!0,lightEmission:0,hardness:2,soundGroup:"wood",textures:this.allFaces(`${p}_planks`),category:"building"}),this.registerBlock({shortId:`${p}_slab`,shape:"slab_bottom",transparent:!0,solid:!0,lightEmission:0,hardness:2,soundGroup:"wood",textures:this.allFaces(`${p}_planks`),category:"building"}),this.registerBlock({shortId:`${p}_fence`,shape:"fence",transparent:!0,solid:!0,lightEmission:0,hardness:2,soundGroup:"wood",textures:this.allFaces(`${p}_planks`),category:"building"})),c.has(`${p}_leaves`)&&this.registerBlock({shortId:`${p}_leaves`,shape:"cube",transparent:!0,solid:!0,lightEmission:0,hardness:.2,soundGroup:"grass",tint:p==="cherry"||p==="pale_oak"?void 0:p==="birch"?"birch":p==="spruce"?"spruce":"foliage",textures:this.allFaces(`${p}_leaves`),category:"natural"});this.registerBlock({shortId:"campfire",shape:"campfire",transparent:!0,solid:!0,lightEmission:15,hardness:2,soundGroup:"wood",textures:this.topBottomSide("campfire_log_lit","campfire_log","campfire_log"),category:"functional"}),this.registerBlock({shortId:"barrel",shape:"cube",transparent:!1,solid:!0,lightEmission:0,hardness:2.5,soundGroup:"wood",textures:this.topBottomSide("barrel_top","barrel_bottom","barrel_side"),category:"functional"}),this.registerBlock({shortId:"chest",shape:"cube",transparent:!1,solid:!0,lightEmission:0,hardness:2.5,soundGroup:"wood",textures:this.topBottomSide("oak_planks","oak_planks","oak_planks"),category:"functional"}),this.registerBlock({shortId:"crafting_table",shape:"cube",transparent:!1,solid:!0,lightEmission:0,hardness:2.5,soundGroup:"wood",textures:{top:"crafting_table_top",bottom:"oak_planks",north:"crafting_table_front",south:"crafting_table_side",east:"crafting_table_side",west:"crafting_table_front"},category:"functional"}),this.registerBlock({shortId:"stonecutter",shape:"slab_bottom",transparent:!0,solid:!0,lightEmission:0,hardness:3.5,soundGroup:"stone",textures:this.topBottomSide("stonecutter_top","stonecutter_bottom","stonecutter_side"),category:"functional"}),this.registerBlock({shortId:"furnace",shape:"cube",transparent:!1,solid:!0,lightEmission:0,hardness:3.5,soundGroup:"stone",textures:{top:"furnace_top",bottom:"furnace_top",north:"furnace_front",south:"furnace_side",east:"furnace_side",west:"furnace_side"},category:"functional"}),this.registerBlock({shortId:"torch",shape:"torch",transparent:!0,solid:!1,lightEmission:14,hardness:0,soundGroup:"wood",textures:this.allFaces("torch"),category:"functional"}),this.registerBlock({shortId:"lantern",shape:"cross",transparent:!0,solid:!0,lightEmission:15,hardness:3.5,soundGroup:"stone",textures:this.allFaces("lantern"),category:"functional"}),this.registerBlock({shortId:"cauldron",shape:"cube",transparent:!0,solid:!0,lightEmission:0,hardness:2,soundGroup:"stone",textures:this.topBottomSide("cauldron_top","cauldron_bottom","cauldron_side"),category:"functional"}),this.registerBlock({shortId:"water_cauldron",shape:"cube",transparent:!0,solid:!0,lightEmission:0,hardness:2,soundGroup:"stone",textures:this.topBottomSide("cauldron_top","cauldron_bottom","cauldron_side"),category:"functional"}),this.registerBlock({shortId:"leaf_litter",shape:"carpet",transparent:!0,solid:!1,lightEmission:0,hardness:0,soundGroup:"poplar_leaves",tint:"foliage",textures:this.allFaces(c.has("leaf_litter")?"leaf_litter":"orange_poplar_leaves"),category:"natural",is26_3:!0});const h=["short_grass","fern","dandelion","poppy","blue_orchid","allium","azure_bluet","red_tulip","orange_tulip","white_tulip","pink_tulip","oxeye_daisy","cornflower","lily_of_the_valley","brown_mushroom","red_mushroom","dead_bush","wildflowers","bush"];for(const p of h)c.has(p)&&this.registerBlock({shortId:p,shape:"cross",transparent:!0,solid:!1,lightEmission:0,hardness:0,soundGroup:"grass",tint:p==="short_grass"||p==="fern"||p==="bush"?"grass":void 0,textures:this.allFaces(p),category:"natural"});const f=[["stone_bricks","building","stone",1.5],["mossy_stone_bricks","building","stone",1.5],["cracked_stone_bricks","building","stone",1.5],["chiseled_stone_bricks","building","stone",1.5],["mossy_cobblestone","building","stone",2],["smooth_stone","building","stone",2],["granite","natural","stone",1.5],["polished_granite","building","stone",1.5],["diorite","natural","stone",1.5],["polished_diorite","building","stone",1.5],["andesite","natural","stone",1.5],["polished_andesite","building","stone",1.5],["deepslate","natural","stone",3],["cobbled_deepslate","building","stone",3.5],["deepslate_bricks","building","stone",3.5],["tuff","natural","stone",1.5],["bricks","building","stone",2],["mud_bricks","building","stone",1.5],["coal_ore","natural","stone",3],["iron_ore","natural","stone",3],["copper_ore","natural","stone",3],["gold_ore","natural","stone",3],["redstone_ore","natural","stone",3],["emerald_ore","natural","stone",3],["lapis_ore","natural","stone",3],["diamond_ore","natural","stone",3],["coal_block","building","stone",5],["iron_block","building","stone",5],["gold_block","building","stone",3],["diamond_block","building","stone",5],["emerald_block","building","stone",5],["copper_block","building","stone",3],["amethyst_block","natural","glass",1.5],["glass","colored","glass",.3,!0],["glowstone","functional","glass",.3],["shroomlight","natural","grass",1],["sea_lantern","functional","glass",.3],["obsidian","natural","stone",50],["crying_obsidian","natural","stone",50],["netherrack","natural","stone",.4],["end_stone","natural","stone",3],["moss_block","natural","grass",.1],["snow_block","natural","wool",.2],["ice","natural","glass",.5,!0],["packed_ice","natural","glass",.5],["blue_ice","natural","glass",2.8],["bookshelf","functional","wood",1.5]];for(const[p,_,m,g,w]of f)if(c.has(p)){const E=p==="bookshelf"?this.topBottomSide("oak_planks","oak_planks","bookshelf"):this.allFaces(p);this.registerBlock({shortId:p,shape:"cube",transparent:!!w,solid:!0,lightEmission:p==="glowstone"||p==="shroomlight"||p==="sea_lantern"?15:p==="crying_obsidian"?10:0,hardness:g,soundGroup:m,textures:E,category:_})}this.registerBlock({shortId:"hay_block",shape:"pillar",transparent:!1,solid:!0,lightEmission:0,hardness:.5,soundGroup:"grass",textures:this.topBottomSide("hay_block_top","hay_block_top","hay_block_side"),category:"natural"});for(const p of Object.keys(this.officialBlocksSummary)){const _=p.replace("minecraft:","");if(this.blocksById.has(p))continue;const m=o[_];m&&c.has(m.top)&&c.has(m.north)?this.registerBlock({shortId:_,shape:m.isCross?"cross":_.endsWith("_slab")?"slab_bottom":_.endsWith("_stairs")?"stairs":"cube",transparent:m.isCross||_.includes("glass")||_.includes("leaves")||_.includes("grate")||_.endsWith("_slab")||_.endsWith("_stairs"),solid:!m.isCross,lightEmission:_.includes("froglight")||_.includes("lamp")||_.includes("lantern")?15:0,hardness:1.5,soundGroup:_.includes("wood")||_.includes("planks")||_.includes("log")?"wood":"stone",tint:_.includes("leaves")&&!_.includes("cherry")&&!_.includes("poplar")&&!_.includes("pale_oak")?"foliage":m.isTinted?"grass":void 0,textures:{top:m.top,bottom:c.has(m.bottom)?m.bottom:m.top,north:m.north,south:c.has(m.south)?m.south:m.north,east:c.has(m.east)?m.east:m.north,west:c.has(m.west)?m.west:m.north},category:"building",is26_3:_.includes("poplar")||_.includes("straw")||_.includes("cushion")}):c.has(_)&&this.registerBlock({shortId:_,shape:"cube",transparent:_.includes("glass")||_.includes("leaves")||_.includes("grate"),solid:!0,lightEmission:_.includes("froglight")||_.includes("lamp")?15:0,hardness:1.5,soundGroup:_.includes("wood")||_.includes("planks")?"wood":"stone",textures:this.allFaces(_),category:"building",is26_3:_.includes("poplar")||_.includes("straw")||_.includes("cushion")})}const u=[["diamond_pickaxe","pickaxe",8],["diamond_axe","axe",8],["diamond_shovel","shovel",8],["diamond_sword","sword",8],["iron_pickaxe","pickaxe",6],["iron_axe","axe",6],["iron_shovel","shovel",6],["iron_sword","sword",6],["wooden_pickaxe","pickaxe",2],["wooden_axe","axe",2],["wooden_shovel","shovel",2],["wooden_sword","sword",2],["stone_pickaxe","pickaxe",4],["stone_axe","axe",4],["stone_shovel","shovel",4],["stone_sword","sword",4]];for(const[p,_,m]of u)this.registerItem({shortId:p,isBlock:!1,texture:`item/${p}`,category:"combat_tools",maxStack:1,toolType:_,toolSpeed:m,isHandheld:!0});const d=[["poplar_boat","combat_tools",!0],["poplar_chest_boat","combat_tools",!0],["poplar_sign","functional",!0],["poplar_hanging_sign","functional",!0],["filled_map","combat_tools",!0],["wheat","natural"],["stick","natural"],["coal","natural"],["iron_ingot","natural"],["gold_ingot","natural"],["diamond","natural"],["emerald","natural"],["apple","natural"],["bread","natural"],["porkchop","natural"],["cooked_porkchop","natural"],["beef","natural"],["cooked_beef","natural"],["mutton","natural"],["cooked_mutton","natural"],["leather","natural"],["feather","natural"],["string","natural"],["bone","natural"],["flint","natural"],["shears","combat_tools"],["water_bucket","combat_tools"],["lava_bucket","combat_tools"],["compass","combat_tools"],["clock","combat_tools"]];for(const[p,_,m]of d)this.registerItem({shortId:p,displayName:p==="filled_map"?"Abandoned Camp Explorer Map":void 0,isBlock:!1,texture:`item/${p}`,category:_,maxStack:p.includes("boat")||p.includes("bucket")?1:64,is26_3:m,isHandheld:p==="stick"});for(const p of this.allItems){const _=a[p.shortId];_&&(_.isHandheld&&(p.isHandheld=!0),!p.isBlock&&_.tex&&(p.texture=_.tex)),(p.toolType||p.shortId==="stick")&&(p.isHandheld=!0)}}static getBlock(t){if(typeof t=="number")return this.blocksByNum.get(t)||this.blocksByNum.get(0);const e=t.startsWith("minecraft:")?t:`minecraft:${t}`;return this.blocksById.get(e)||this.blocksByNum.get(1)}static getItem(t){const e=t.startsWith("minecraft:")?t:`minecraft:${t}`;return this.itemsById.get(e)}}I(nt,"blocksByNum",new Map),I(nt,"blocksById",new Map),I(nt,"itemsById",new Map),I(nt,"allBlocks",[]),I(nt,"allItems",[]),I(nt,"langMap",{}),I(nt,"officialBlocksSummary",{}),I(nt,"officialRegistries",{}),I(nt,"officialPackets",{}),I(nt,"nextBlockNumId",0);class _e{static async build(){this.canvas=document.createElement("canvas"),this.canvas.width=this.ATLAS_SIZE,this.canvas.height=this.ATLAS_SIZE,this.ctx=this.canvas.getContext("2d",{willReadFrequently:!0}),this.ctx.imageSmoothingEnabled=!1;const t=new Set;for(const f of nt.allBlocks)t.add(f.textures.top),t.add(f.textures.bottom),t.add(f.textures.north),t.add(f.textures.south),t.add(f.textures.east),t.add(f.textures.west);t.add("grass_block_side_overlay"),t.add("straw_bed");for(let f=0;f<10;f++)t.add(`destroy_stage_${f}`);const e=new Set(["straw_bed_foot_top","straw_bed_head_top","straw_bed_side","poplar_shelf_front","poplar_shelf_top"]),n=Array.from(t).filter(f=>!e.has(f)),s=f=>new Promise(u=>{const d=new Image;d.crossOrigin="anonymous",d.onload=()=>u([f,d]),d.onerror=()=>u([f,null]),d.src=`/assets/minecraft/textures/block/${f}.png`}),r=await Promise.all(n.map(s));for(const[f,u]of r)u&&this.loadedImages.set(f,u);let o=0;const a=(f,u)=>{const d=o%this.TILES_PER_ROW,p=Math.floor(o/this.TILES_PER_ROW),_=d*this.TILE_SIZE,m=p*this.TILE_SIZE;u(this.ctx,_,m);const g=document.createElement("canvas");g.width=16,g.height=16;const w=g.getContext("2d");w.imageSmoothingEnabled=!1,w.drawImage(this.canvas,_,m,16,16,0,0,16,16);const E=new Image;E.src=g.toDataURL(),this.loadedImages.set(f,g);const y=.08/this.ATLAS_SIZE,b=_/this.ATLAS_SIZE+y,S=(_+this.TILE_SIZE)/this.ATLAS_SIZE-y,M=1-m/this.ATLAS_SIZE-y,R=1-(m+this.TILE_SIZE)/this.ATLAS_SIZE+y;this.uvMap.set(f,{u0:b,v0:R,u1:S,v1:M}),o++},c=this.loadedImages.get("grass_block_side_overlay");for(const[f,u]of r)a(f,(d,p,_)=>{if(!u){d.fillStyle="#ff00ff",d.fillRect(p,_,16,16),d.fillStyle="#000000",d.fillRect(p,_,8,8),d.fillRect(p+8,_+8,8,8);return}if(d.drawImage(u,0,0,16,16,p,_,16,16),f==="grass_block_side"&&c){const m=document.createElement("canvas");m.width=16,m.height=16;const g=m.getContext("2d",{willReadFrequently:!0});g.imageSmoothingEnabled=!1,g.drawImage(c,0,0,16,16,0,0,16,16);const w=g.getImageData(0,0,16,16),E=w.data;for(let y=0;y<E.length;y+=4)E[y+3]>0&&(E[y]=Math.min(255,Math.floor(E[y]*121/255)),E[y+1]=Math.min(255,Math.floor(E[y+1]*192/255)),E[y+2]=Math.min(255,Math.floor(E[y+2]*90/255)));g.putImageData(w,0,0),d.drawImage(m,0,0,16,16,p,_,16,16)}});const l=this.loadedImages.get("straw_bed");l&&(a("straw_bed_foot_top",(f,u,d)=>{f.drawImage(l,16,25,16,16,u,d,16,16)}),a("straw_bed_head_top",(f,u,d)=>{f.drawImage(l,8,13,16,16,u,d,16,16),f.drawImage(l,8,0,16,8,u,d,16,8)}),a("straw_bed_side",(f,u,d)=>{f.drawImage(l,16,25,16,16,u,d,16,16),f.drawImage(l,16,41,16,4,u,d+12,16,4)}));const h=this.loadedImages.get("poplar_shelf");return h&&(a("poplar_shelf_front",(f,u,d)=>{f.drawImage(h,16,0,16,16,u,d,16,16),f.drawImage(h,0,0,16,4,u,d,16,4),f.drawImage(h,0,12,16,4,u,d+12,16,4)}),a("poplar_shelf_top",(f,u,d)=>{f.drawImage(h,16,0,16,16,u,d,16,16)})),this.texture=new Wr(this.canvas),this.texture.magFilter=qt,this.texture.minFilter=qt,this.texture.colorSpace=de,this.texture.needsUpdate=!0,this.texture}static getUV(t){return this.uvMap.get(t)||this.uvMap.get("stone")||{u0:0,v0:0,u1:16/this.ATLAS_SIZE,v1:16/this.ATLAS_SIZE}}}I(_e,"ATLAS_SIZE",2048),I(_e,"TILE_SIZE",16),I(_e,"TILES_PER_ROW",128),I(_e,"canvas"),I(_e,"ctx"),I(_e,"texture"),I(_e,"uvMap",new Map),I(_e,"loadedImages",new Map);class pe{static async init(){try{const t=await fetch("/assets/minecraft/sounds.json");t.ok&&(this.soundsMap=await t.json())}catch{}}static ensureContext(){if(!this.ctx){const t=window.AudioContext||window.webkitAudioContext;t&&(this.ctx=new t)}this.ctx&&this.ctx.state==="suspended"&&this.ctx.resume().catch(()=>{})}static async play(t,e=.7,n=1){if(this.masterVolume<=0||(this.ensureContext(),!this.ctx))return;const s=this.soundsMap[t];if(!s||!s.sounds||s.sounds.length===0){this.playProceduralFallback(t,e);return}const r=s.sounds[Math.floor(Math.random()*s.sounds.length)],o=typeof r=="string"?r:r.name;if(!o)return;const a=`/assets/minecraft/sounds/${o}.ogg`;try{let c=this.audioBufferCache.get(a);if(!c){const f=await fetch(a);if(!f.ok){this.playProceduralFallback(t,e);return}const u=await f.arrayBuffer();c=await this.ctx.decodeAudioData(u),this.audioBufferCache.set(a,c)}const l=this.ctx.createBufferSource();l.buffer=c,l.playbackRate.value=n*(.92+Math.random()*.16);const h=this.ctx.createGain();h.gain.value=Math.min(1,e*this.masterVolume),l.connect(h),h.connect(this.ctx.destination),l.start(0)}catch{this.playProceduralFallback(t,e)}}static playProceduralFallback(t,e){if(this.ctx)try{const n=this.ctx.createOscillator(),s=this.ctx.createGain();n.type=t.includes("click")?"triangle":"sine",n.frequency.value=t.includes("click")?520:220+Math.random()*120,s.gain.setValueAtTime(.12*e*this.masterVolume,this.ctx.currentTime),s.gain.exponentialRampToValueAtTime(.001,this.ctx.currentTime+.09),n.connect(s),s.connect(this.ctx.destination),n.start(),n.stop(this.ctx.currentTime+.09)}catch{}}static playBlockSound(t,e){const s={poplar_leaves:`block.poplar_leaves.${e}`,straw_bed:`block.straw_bed.${e}`,wood:`block.wood.${e}`,grass:`block.grass.${e}`,stone:`block.stone.${e}`,wool:`block.wool.${e}`,sand:`block.sand.${e}`,gravel:`block.gravel.${e}`,glass:`block.glass.${e}`}[t]||`block.stone.${e}`;this.play(s,e==="step"?.25:.65)}}I(pe,"ctx",null),I(pe,"soundsMap",{}),I(pe,"audioBufferCache",new Map),I(pe,"masterVolume",.8);class le{static async init(){try{const t=localStorage.getItem("mc_26_3_options");if(t){const e=JSON.parse(t);this.current={...this.current,...e}}else{const e=await fetch("/options.txt");if(e.ok){const n=await e.text();this.parseOfficialOptionsTxt(n)}}}catch{}}static parseOfficialOptionsTxt(t){const e=t.split(/\r?\n/);for(const n of e){const s=n.indexOf(":");if(s===-1)continue;const r=n.slice(0,s).trim(),o=n.slice(s+1).trim();if(r==="fov"){const a=parseFloat(o);isNaN(a)||(this.current.fov=a<=2?Math.round(70+a*40):Math.round(a))}else if(r==="renderDistance"){const a=parseInt(o,10);isNaN(a)||(this.current.renderDistance=Math.min(8,Math.max(3,a)))}else if(r==="mouseSensitivity"){const a=parseFloat(o);isNaN(a)||(this.current.mouseSensitivity=a)}}}static save(){try{localStorage.setItem("mc_26_3_options",JSON.stringify(this.current))}catch{}}}I(le,"current",{fov:75,renderDistance:5,mouseSensitivity:.5,soundVolume:.8,guiScale:2,fullscreen:!1,ao:!0,clouds:!0,particles:"all",wispServerUrl:`ws://${window.location.host||"localhost:3000"}/wisp/`,username:"Anders_26_3"});const Q=16,ze=128,Ic={"minecraft:dappled_forest":{id:"minecraft:dappled_forest",name:"Dappled Forest",grassColor:[.64,.76,.34],foliageColor:[.88,.58,.22],waterColor:[.24,.48,.89]},"minecraft:plains":{id:"minecraft:plains",name:"Plains",grassColor:[.56,.74,.35],foliageColor:[.47,.67,.28],waterColor:[.24,.46,.89]},"minecraft:cherry_grove":{id:"minecraft:cherry_grove",name:"Cherry Grove",grassColor:[.71,.86,.38],foliageColor:[.71,.86,.38],waterColor:[.36,.72,.94]},"minecraft:birch_forest":{id:"minecraft:birch_forest",name:"Birch Forest",grassColor:[.53,.73,.4],foliageColor:[.5,.65,.33],waterColor:[.24,.46,.89]}};class s0{constructor(t,e){I(this,"cx");I(this,"cz");I(this,"blocks");I(this,"meta");I(this,"biomes");I(this,"dirty",!0);I(this,"solidMesh",null);I(this,"waterMesh",null);this.cx=t,this.cz=e,this.blocks=new Uint16Array(Q*ze*Q),this.meta=new Uint8Array(Q*ze*Q),this.biomes=new Array(Q*Q).fill("minecraft:dappled_forest")}idx(t,e,n){return(e*Q+n)*Q+t}getBlock(t,e,n){return t<0||t>=Q||e<0||e>=ze||n<0||n>=Q?0:this.blocks[this.idx(t,e,n)]}setBlock(t,e,n,s,r=0){if(t<0||t>=Q||e<0||e>=ze||n<0||n>=Q)return;const o=this.idx(t,e,n);this.blocks[o]=s,this.meta[o]=r,this.dirty=!0}getMeta(t,e,n){return t<0||t>=Q||e<0||e>=ze||n<0||n>=Q?0:this.meta[this.idx(t,e,n)]}getBiome(t,e){const n=this.biomes[(e&15)*Q+(t&15)]||"minecraft:dappled_forest";return Ic[n]||Ic["minecraft:dappled_forest"]}setBiome(t,e,n){this.biomes[(e&15)*Q+(t&15)]=n}buildMeshes(t,e,n){this.dirty=!1;const s=[],r=[],o=[],a=[],c=[];let l=0;const h=[],f=[],u=[],d=[],p=[];let _=0;const m=(b,S,M,R,v,x,C,L,U,D,O,H,$)=>{const z=_e.getUV(U);let q=z.u0,et=z.v0,gt=z.u1,_t=z.v1;if($){const Pt=z.u1-z.u0,Z=z.v1-z.v0;q=z.u0+$[0]*Pt,et=z.v0+$[1]*Z,gt=z.u0+$[2]*Pt,_t=z.v0+$[3]*Z}if(b){h.push(...S,...M,...R,...v);for(let Pt=0;Pt<4;Pt++)f.push(x,C,L),d.push(D,O,H);u.push(q,et,gt,et,gt,_t,q,_t),p.push(_,_+1,_+2,_,_+2,_+3),_+=4}else{s.push(...S,...M,...R,...v);for(let Pt=0;Pt<4;Pt++)r.push(x,C,L),a.push(D,O,H);o.push(q,et,gt,et,gt,_t,q,_t),c.push(l,l+1,l+2,l,l+2,l+3),l+=4}},g=(b,S,M,R,v,x,C,L,U=63)=>{const D=C.fluid==="water",O=(z,q)=>C.tint==="grass"&&z==="top"?[L.grassColor[0]*q,L.grassColor[1]*q,L.grassColor[2]*q]:C.tint==="foliage"?[L.foliageColor[0]*q,L.foliageColor[1]*q,L.foliageColor[2]*q]:C.tint==="birch"?[.5*q,.66*q,.33*q]:C.tint==="spruce"?[.38*q,.6*q,.38*q]:C.tint==="water"?[L.waterColor[0]*q,L.waterColor[1]*q,L.waterColor[2]*q]:[q,q,q],H=v-S,$=H<1?[0,0,1,H]:void 0;if(U&1){const[z,q,et]=O("top",1);m(D,[b,v,x],[R,v,x],[R,v,M],[b,v,M],0,1,0,C.textures.top,z,q,et)}if(U&2){const[z,q,et]=O("bottom",.55);m(D,[b,S,M],[R,S,M],[R,S,x],[b,S,x],0,-1,0,C.textures.bottom,z,q,et)}if(U&4){const[z,q,et]=O("side",.86);m(D,[b,S,x],[R,S,x],[R,v,x],[b,v,x],0,0,1,C.textures.south,z,q,et,$)}if(U&8){const[z,q,et]=O("side",.86);m(D,[R,S,M],[b,S,M],[b,v,M],[R,v,M],0,0,-1,C.textures.north,z,q,et,$)}if(U&16){const[z,q,et]=O("side",.72);m(D,[R,S,x],[R,S,M],[R,v,M],[R,v,x],1,0,0,C.textures.east,z,q,et,$)}if(U&32){const[z,q,et]=O("side",.72);m(D,[b,S,M],[b,S,x],[b,v,x],[b,v,M],-1,0,0,C.textures.west,z,q,et,$)}},w=this.cx*Q,E=this.cz*Q,y=(b,S)=>{if(S===0)return!0;const M=nt.getBlock(S);return b.fluid==="water"&&M.fluid==="water"?!1:M.transparent||M.shape!=="cube"?!(M.numId===b.numId&&(b.shortId==="glass"||b.fluid)):!1};for(let b=0;b<ze;b++)for(let S=0;S<Q;S++)for(let M=0;M<Q;M++){const R=this.getBlock(M,b,S);if(R===0)continue;const v=nt.getBlock(R);if(v.shape==="air")continue;const x=w+M,C=E+S,L=this.getBiome(M,S),U=this.getMeta(M,b,S);if(v.shape==="cube"||v.shape==="pillar"){let D=0;y(v,t(x,b+1,C))&&(D|=1),y(v,t(x,b-1,C))&&(D|=2),y(v,t(x,b,C+1))&&(D|=4),y(v,t(x,b,C-1))&&(D|=8),y(v,t(x+1,b,C))&&(D|=16),y(v,t(x-1,b,C))&&(D|=32),D!==0&&g(M,b,S,M+1,b+1,S+1,v,L,D)}else if(v.shape==="fluid"){let D=0;if(y(v,t(x,b+1,C))&&(D|=1),y(v,t(x,b-1,C))&&(D|=2),y(v,t(x,b,C+1))&&(D|=4),y(v,t(x,b,C-1))&&(D|=8),y(v,t(x+1,b,C))&&(D|=16),y(v,t(x-1,b,C))&&(D|=32),D!==0){const O=t(x,b+1,C)===R?b+1:b+.88;g(M,b,S,M+1,O,S+1,v,L,D)}}else if(v.shape==="slab_bottom"||v.shape==="trapdoor"){const D=(U&4)!==0,O=D?b+.5:b,H=D?b+1:b+.5;g(M,O,S,M+1,H,S+1,v,L,63)}else if(v.shape==="slab_top")g(M,b+.65,S,M+1,b+1,S+1,v,L,63);else if(v.shape==="stairs"){g(M,b,S,M+1,b+.5,S+1,v,L,63);const D=U&3;D===0?g(M,b+.5,S,M+1,b+1,S+.5,v,L,63):D===1?g(M+.5,b+.5,S,M+1,b+1,S+1,v,L,63):D===2?g(M,b+.5,S+.5,M+1,b+1,S+1,v,L,63):g(M,b+.5,S,M+.5,b+1,S+1,v,L,63)}else if(v.shape==="bed_foot"||v.shape==="bed_head"){const D=v.shape==="bed_head"?.32:.26;g(M+.02,b,S+.02,M+.98,b+D,S+.98,v,L,63)}else if(v.shape==="carpet")v.shortId==="leaf_litter"?m(!1,[M,b+.016,S+1],[M+1,b+.016,S+1],[M+1,b+.016,S],[M,b+.016,S],0,1,0,v.textures.top,.64,.46,.26):g(M,b,S,M+1,b+.0625,S+1,v,L,63);else if(v.shape==="fence"){g(M+.375,b,S+.375,M+.625,b+1,S+.625,v,L,63);const D=O=>{if(O===0)return!1;const H=nt.getBlock(O);return H.shape==="fence"||H.shape==="cube"||H.shape==="pillar"};D(t(x,b,C-1))&&(g(M+.4375,b+.375,S,M+.5625,b+.5625,S+.375,v,L,63),g(M+.4375,b+.75,S,M+.5625,b+.9375,S+.375,v,L,63)),D(t(x,b,C+1))&&(g(M+.4375,b+.375,S+.625,M+.5625,b+.5625,S+1,v,L,63),g(M+.4375,b+.75,S+.625,M+.5625,b+.9375,S+1,v,L,63)),D(t(x-1,b,C))&&(g(M,b+.375,S+.4375,M+.375,b+.5625,S+.5625,v,L,63),g(M,b+.75,S+.4375,M+.375,b+.9375,S+.5625,v,L,63)),D(t(x+1,b,C))&&(g(M+.625,b+.375,S+.4375,M+1,b+.5625,S+.5625,v,L,63),g(M+.625,b+.75,S+.4375,M+1,b+.9375,S+.5625,v,L,63))}else if(v.shape==="campfire")g(M+.1,b,S+.1,M+.9,b+.44,S+.9,v,L,63);else if(v.shape==="torch")g(M+.4375,b,S+.4375,M+.5625,b+.625,S+.5625,v,L,63);else if(v.shape==="cross"){const[D,O,H]=v.tint==="grass"?L.grassColor:[.95,.95,.95],$=M+.15,z=M+.85,q=S+.15,et=S+.85;m(!1,[$,b,q],[z,b,et],[z,b+.9,et],[$,b+.9,q],0,1,0,v.textures.north,D,O,H),m(!1,[z,b,et],[$,b,q],[$,b+.9,q],[z,b+.9,et],0,1,0,v.textures.north,D,O,H),m(!1,[$,b,et],[z,b,q],[z,b+.9,q],[$,b+.9,et],0,1,0,v.textures.north,D,O,H),m(!1,[z,b,q],[$,b,et],[$,b+.9,et],[z,b+.9,q],0,1,0,v.textures.north,D,O,H)}}if(this.solidMesh&&this.solidMesh.geometry.dispose(),l>0){const b=new Ie;b.setAttribute("position",new ue(s,3)),b.setAttribute("normal",new ue(r,3)),b.setAttribute("uv",new ue(o,2)),b.setAttribute("color",new ue(a,3)),b.setIndex(c),b.computeBoundingSphere(),this.solidMesh?this.solidMesh.geometry=b:(this.solidMesh=new Qt(b,e),this.solidMesh.position.set(w,0,E))}else this.solidMesh&&(this.solidMesh.geometry=new Ie);if(this.waterMesh&&this.waterMesh.geometry.dispose(),_>0){const b=new Ie;b.setAttribute("position",new ue(h,3)),b.setAttribute("normal",new ue(f,3)),b.setAttribute("uv",new ue(u,2)),b.setAttribute("color",new ue(d,3)),b.setIndex(p),b.computeBoundingSphere(),this.waterMesh?this.waterMesh.geometry=b:(this.waterMesh=new Qt(b,n),this.waterMesh.position.set(w,0,E),this.waterMesh.renderOrder=1)}else this.waterMesh&&(this.waterMesh.geometry=new Ie)}}class Un{static setSeed(t){if(typeof t=="number"&&!isNaN(t)){this.seed=t|0;return}const e=String(t).trim();if(!e){this.seed=Math.floor(Math.random()*2147483647);return}const n=Number(e);if(!isNaN(n)&&Number.isInteger(n)){this.seed=n|0;return}let s=0;for(let r=0;r<e.length;r++)s=Math.imul(31,s)+e.charCodeAt(r)|0;this.seed=s}static async init(){try{const t=await fetch("/reports/abandoned_camp_structures.json");t.ok&&(this.structuresMap=await t.json())}catch{}}static hash2D(t,e,n=0){let s=Math.imul(t,374761393)+Math.imul(e,668265263)+Math.imul(this.seed+n,1442695041);return s=(s^s>>>13)*1274126177,((s^s>>>16)>>>0)/4294967296}static smoothNoise(t,e,n,s=0){const r=t/n,o=e/n,a=Math.floor(r),c=Math.floor(o),l=r-a,h=o-c,f=l*l*(3-2*l),u=h*h*(3-2*h),d=this.hash2D(a,c,s),p=this.hash2D(a+1,c,s),_=this.hash2D(a,c+1,s),m=this.hash2D(a+1,c+1,s);return(d*(1-f)+p*f)*(1-u)+(_*(1-f)+m*f)*u}static getBiomeAt(t,e){if(this.worldType==="dappled_showcase")return"minecraft:dappled_forest";const n=this.smoothNoise(t,e,160,777),s=this.smoothNoise(t,e,160,1337);return n<.34?"minecraft:plains":n<.56?s<.5?"minecraft:forest":"minecraft:dappled_forest":n<.78?s<.5?"minecraft:birch_forest":"minecraft:dappled_forest":"minecraft:cherry_grove"}static getTerrainHeight(t,e){if(this.worldType==="superflat")return 64;const n=this.smoothNoise(t,e,180,10),s=this.smoothNoise(t,e,64,20),r=this.smoothNoise(t,e,22,30),o=1-Math.abs(this.smoothNoise(t,e,96,40)*2-1);let a=56+n*18+s*10+r*4;return n>.62&&(a+=(n-.62)*o*38),Math.floor(a)}static placePoplarTree(t,e,n,s,r,o){const a=nt.getBlock("poplar_log").numId,c=nt.getBlock(r).numId,l=nt.getBlock("leaf_litter").numId,h=9+Math.floor(o*9301%5),f=n+3,u=n+h;for(let d=n;d<u;d++)t.setBlock(e,d,s,a);for(let d=f;d<=u+2;d++){const p=(d-f)/(u+2-f),_=p<.2||p>.82?1:2;for(let m=-_;m<=_;m++)for(let g=-_;g<=_;g++){if(m===0&&g===0&&d<u)continue;const w=Math.abs(m)+Math.abs(g);if(_===2&&w>=4||_===1&&w>=2&&d>u)continue;const E=this.hash2D(e+m*17,s+g*31,d);if(w===_*2-1&&E<.28)continue;const y=e+m,b=s+g;y>=0&&y<Q&&b>=0&&b<Q&&d<ze&&t.getBlock(y,d,b)===0&&t.setBlock(y,d,b,c)}}for(let d=-2;d<=2;d++)for(let p=-2;p<=2;p++){const _=e+d,m=s+p;_>=0&&_<Q&&m>=0&&m<Q&&this.hash2D(_+t.cx*16,m+t.cz*16,99)<.35&&t.getBlock(_,n,m)===0&&t.getBlock(_,n-1,m)===nt.getBlock("grass_block").numId&&t.setBlock(_,n,m,l)}}static placeOfficialAbandonedCamp(t,e,n,s,r){const o=[],a=`camp/dappled_forest/campsite_dappled_forest_${r%4+1}.nbt`,c=`tent/dappled_forest/tent_dappled_forest_${r%4+1}.nbt`,l=this.structuresMap[a],h=this.structuresMap[c],f=(p,_,m,g)=>{if(!p||!p.palette||!p.blocks)return;const w=p.palette;for(const E of p.blocks){const[y,b,S]=E.pos,M=w[E.state];if(!M)continue;let R=M.id;const v=M.properties||{};(R==="minecraft:jigsaw"||R==="minecraft:structure_void")&&(R=b===0?"minecraft:dirt_path":"minecraft:air"),R==="minecraft:straw_bed"&&v.part==="head"&&(R="minecraft:straw_bed_head");const x=_+y,C=m+b,L=g+S;if(x>=0&&x<Q&&L>=0&&L<Q&&C>=1&&C<ze)if(R==="minecraft:air")t.setBlock(x,C,L,0);else{const U=nt.getBlock(R);let D=0;v.facing==="east"?D=1:v.facing==="south"?D=2:v.facing==="west"&&(D=3),v.half==="top"&&(D|=4),t.setBlock(x,C,L,U.numId,D)}}if(Array.isArray(p.entities))for(const E of p.entities){const y=E.nbt||{};if(y.id==="minecraft:cushion"&&Array.isArray(E.blockPos)){const[b,S,M]=E.blockPos,R=t.cx*Q+_+b,v=m+S+1,x=t.cz*Q+g+M,C=y.color||"orange";o.push({id:`cushion_${R}_${v}_${x}`,x:R+.5,y:v,z:x+.5,blockX:R,blockY:v,blockZ:x,color:C,rotation:Array.isArray(y.Rotation)?y.Rotation[0]:0})}}},u=nt.getBlock("dirt").numId,d=nt.getBlock("grass_block").numId;for(let p=1;p<15;p++)for(let _=1;_<15;_++){for(let m=n-3;m<n;m++)t.setBlock(p,m,_,u);t.setBlock(p,n,_,d);for(let m=n+1;m<n+9;m++)t.setBlock(p,m,_,0)}if(l&&f(l,e,n,s),h){const p=nt.getBlock("straw_bed").numId,_=nt.getBlock("straw_bed_head").numId,m=nt.getBlock("white_wool_stairs").numId,g=nt.getBlock("poplar_fence").numId,w=Math.min(12,e+2),E=Math.min(12,s+6);t.setBlock(w,n+1,E,p,2),t.setBlock(w,n+1,E+1,_,2),t.setBlock(w-1,n+1,E,g),t.setBlock(w-1,n+2,E,g),t.setBlock(w+1,n+1,E,g),t.setBlock(w+1,n+2,E,g);for(let y=0;y<=1;y++)t.setBlock(w-1,n+3,E+y,m,1),t.setBlock(w,n+3,E+y,nt.getBlock("white_wool_slab").numId),t.setBlock(w+1,n+3,E+y,m,3)}if(o.length===0){const p=t.cx*Q+e+4,_=t.cz*Q+s+4;o.push({id:`cushion_${p}_${n+1}_${_}`,x:p+.5,y:n+1,z:_+.5,blockX:p,blockY:n+1,blockZ:_,color:"orange",rotation:0})}return{cushions:o,campPos:{cx:t.cx,cz:t.cz,x:t.cx*Q+e+5,y:n+1,z:t.cz*Q+s+5,variant:a}}}static generateChunk(t,e){const n=new s0(t,e),s=[];let r;const o=nt.getBlock("bedrock").numId,a=nt.getBlock("stone").numId,c=nt.getBlock("deepslate").numId,l=nt.getBlock("dirt").numId,h=nt.getBlock("grass_block").numId,f=nt.getBlock("podzol").numId,u=nt.getBlock("sand").numId,d=nt.getBlock("water").numId,p=nt.getBlock("coal_ore").numId,_=nt.getBlock("iron_ore").numId,m=nt.getBlock("diamond_ore").numId,g=62,w=new Int32Array(Q*Q);for(let v=0;v<Q;v++)for(let x=0;x<Q;x++){const C=t*Q+x,L=e*Q+v,U=this.getBiomeAt(C,L);n.setBiome(x,v,U);const D=this.getTerrainHeight(C,L);w[v*Q+x]=D,n.setBlock(x,0,v,o);for(let O=1;O<=D;O++)if(O<24){const H=this.hash2D(C+O*13,L-O*7,500);n.setBlock(x,O,v,H<.012?m:c)}else if(O<D-3){const H=this.hash2D(C+O*19,L+O*11,600);H<.025?n.setBlock(x,O,v,p):H<.042?n.setBlock(x,O,v,_):n.setBlock(x,O,v,a)}else O<D?n.setBlock(x,O,v,D<=g+1?u:l):D<=g+1?n.setBlock(x,O,v,u):U==="minecraft:dappled_forest"&&this.hash2D(C,L,42)<.12?n.setBlock(x,O,v,f):n.setBlock(x,O,v,h);if(D<g)for(let O=D+1;O<=g;O++)n.setBlock(x,O,v,d)}if(this.worldType==="superflat")return{chunk:n,cushions:s};if((Math.abs(t)>1||Math.abs(e)>1)&&Math.abs(t*31+e*17)%11===0&&this.hash2D(t,e,2603)<.42&&w[7*Q+7]>g+2){const v=Math.max(g+2,w[7*Q+7]),x=Math.floor(this.hash2D(t,e,7777)*16),C=this.placeOfficialAbandonedCamp(n,3,v,3,x);return s.push(...C.cushions),r=C.campPos,{chunk:n,cushions:s,camp:r}}for(let v=3;v<Q-3;v+=4)for(let x=3;x<Q-3;x+=4){const C=t*Q+x,L=e*Q+v,U=w[v*Q+x];if(U<=g+2)continue;const D=n.biomes[v*Q+x],O=this.hash2D(C,L,888);if(D==="minecraft:dappled_forest"&&O<.34){const H=this.hash2D(C,L,999),$=H<.4?"orange_poplar_leaves":H<.72?"yellow_poplar_leaves":"red_poplar_leaves";this.placePoplarTree(n,x,U+1,v,$,H)}else D==="minecraft:forest"&&O<.3?this.placeClassicTree(n,x,U+1,v,"oak_log","oak_leaves",5+Math.floor(O*7)):D==="minecraft:plains"&&O<.03?this.placeClassicTree(n,x,U+1,v,"oak_log","oak_leaves",5):D==="minecraft:birch_forest"&&O<.25?this.placeClassicTree(n,x,U+1,v,"birch_log","birch_leaves",6):D==="minecraft:cherry_grove"&&O<.22&&this.placeClassicTree(n,x,U+1,v,"cherry_log","cherry_leaves",6)}const y=nt.getBlock("short_grass").numId,b=nt.getBlock("dandelion").numId,S=nt.getBlock("poppy").numId,M=nt.getBlock("brown_mushroom").numId,R=nt.getBlock("leaf_litter").numId;for(let v=0;v<Q;v++)for(let x=0;x<Q;x++){const C=w[v*Q+x];if(C<=g+1||n.getBlock(x,C+1,v)!==0||n.getBlock(x,C,v)!==h&&n.getBlock(x,C,v)!==f)continue;const L=t*Q+x,U=e*Q+v,D=this.hash2D(L,U,333);n.biomes[v*Q+x]==="minecraft:dappled_forest"?D<.08?n.setBlock(x,C+1,v,R):D<.14?n.setBlock(x,C+1,v,y):D<.155?n.setBlock(x,C+1,v,M):D<.165&&n.setBlock(x,C+1,v,b):D<.12?n.setBlock(x,C+1,v,y):D<.135?n.setBlock(x,C+1,v,S):D<.15&&n.setBlock(x,C+1,v,b)}return{chunk:n,cushions:s,camp:r}}static placeClassicTree(t,e,n,s,r,o,a){const c=nt.getBlock(r).numId,l=nt.getBlock(o).numId;for(let h=n;h<n+a;h++)t.setBlock(e,h,s,c);for(let h=a-3;h<=a;h++){const f=h>=a-1?1:2;for(let u=-f;u<=f;u++)for(let d=-f;d<=f;d++){if(u===0&&d===0&&h<a||Math.abs(u)===f&&Math.abs(d)===f&&h<a)continue;const p=e+u,_=s+d,m=n+h;p>=0&&p<Q&&_>=0&&_<Q&&m<ze&&t.getBlock(p,m,_)===0&&t.setBlock(p,m,_,l)}}}}I(Un,"structuresMap",{}),I(Un,"seed",Math.floor(Math.random()*2147483647)),I(Un,"worldType","wilderness_26_3");class r0{constructor(t,e,n){I(this,"scene");I(this,"chunks",new Map);I(this,"abandonedCamps",[]);I(this,"solidMaterial");I(this,"waterMaterial");I(this,"entityRenderer");I(this,"particleSystem");I(this,"timeOfDay",1e3);I(this,"worldName","Wilderness Bound (26.3)");I(this,"blockDiffs",new Map);this.scene=t,this.entityRenderer=e,this.particleSystem=n,this.solidMaterial=new Dn({map:_e.texture,vertexColors:!0,alphaTest:.15}),this.waterMaterial=new Dn({map:_e.texture,vertexColors:!0,transparent:!0,opacity:.78,depthWrite:!1})}chunkKey(t,e){return`${t},${e}`}getChunk(t,e){return this.chunks.get(this.chunkKey(t,e))}ensureChunk(t,e){const n=this.chunkKey(t,e);let s=this.chunks.get(n);if(!s){const r=Un.generateChunk(t,e);s=r.chunk,this.chunks.set(n,s);for(const o of r.cushions)this.entityRenderer.addCushion(o);r.camp&&this.abandonedCamps.push(r.camp);for(let o=0;o<Q;o++)for(let a=0;a<Q;a++){const c=t*Q+a,l=e*Q+o;for(let h=0;h<ze;h++){const f=this.blockDiffs.get(`${c},${h},${l}`);f&&s.setBlock(a,h,o,f.numId,f.meta)}}}return s}getBlock(t,e,n){if(e<0||e>=ze)return 0;const s=Math.floor(t/Q),r=Math.floor(n/Q),o=this.chunks.get(this.chunkKey(s,r));if(!o)return 0;const a=(t%Q+Q)%Q,c=(n%Q+Q)%Q;return o.getBlock(a,Math.floor(e),c)}getMeta(t,e,n){if(e<0||e>=ze)return 0;const s=Math.floor(t/Q),r=Math.floor(n/Q),o=this.chunks.get(this.chunkKey(s,r));if(!o)return 0;const a=(t%Q+Q)%Q,c=(n%Q+Q)%Q;return o.getMeta(a,Math.floor(e),c)}setBlock(t,e,n,s,r=0,o=!0){if(e<0||e>=ze)return;const a=Math.floor(t),c=Math.floor(e),l=Math.floor(n),h=Math.floor(a/Q),f=Math.floor(l/Q),u=this.ensureChunk(h,f),d=(a%Q+Q)%Q,p=(l%Q+Q)%Q;if(u.setBlock(d,c,p,s,r),o&&this.blockDiffs.set(`${a},${c},${l}`,{numId:s,meta:r}),d===0){const _=this.getChunk(h-1,f);_&&(_.dirty=!0)}else if(d===Q-1){const _=this.getChunk(h+1,f);_&&(_.dirty=!0)}if(p===0){const _=this.getChunk(h,f-1);_&&(_.dirty=!0)}else if(p===Q-1){const _=this.getChunk(h,f+1);_&&(_.dirty=!0)}}getBiomeName(t,e){const n=Math.floor(t/Q),s=Math.floor(e/Q),r=this.getChunk(n,s);if(!r)return"minecraft:dappled_forest";const o=(Math.floor(t)%Q+Q)%Q,a=(Math.floor(e)%Q+Q)%Q;return r.getBiome(o,a).id}getTopSolidY(t,e){const n=Math.floor(t),s=Math.floor(e);this.ensureChunk(Math.floor(n/Q),Math.floor(s/Q));for(let r=ze-1;r>=1;r--){const o=this.getBlock(n,r,s);if(o!==0){const a=nt.getBlock(o);if(a.solid&&!a.shortId.includes("leaves"))return r+1}}return 65}updateChunksAroundPlayer(t,e){const n=Math.floor(t/Q),s=Math.floor(e/Q),r=le.current.renderDistance||4;for(let c=-r;c<=r;c++)for(let l=-r;l<=r;l++)l*l+c*c<=(r+.5)*(r+.5)&&this.ensureChunk(n+l,s+c);let o=0;const a=(c,l,h)=>this.getBlock(c,l,h);for(let c=-r;c<=r;c++){for(let l=-r;l<=r;l++){const h=this.getChunk(n+l,s+c);if(h&&h.dirty){const f=!!h.solidMesh,u=!!h.waterMesh;if(h.buildMeshes(a,this.solidMaterial,this.waterMaterial),!f&&h.solidMesh&&this.scene.add(h.solidMesh),!u&&h.waterMesh&&this.scene.add(h.waterMesh),o++,o>=3)break}}if(o>=3)break}for(const[,c]of this.chunks){const h=(c.cx-n)**2+(c.cz-s)**2<=(r+1.5)**2;c.solidMesh&&(c.solidMesh.visible=h),c.waterMesh&&(c.waterMesh.visible=h)}}tickAmbientParticles(t,e,n){const s=nt.getBlock("orange_poplar_leaves").numId,r=nt.getBlock("red_poplar_leaves").numId,o=nt.getBlock("yellow_poplar_leaves").numId,a=nt.getBlock("campfire").numId;for(let c=0;c<6;c++){const l=Math.floor(t+(Math.random()-.5)*28),h=Math.floor(e+(Math.random()-.3)*18),f=Math.floor(n+(Math.random()-.5)*28),u=this.getBlock(l,h,f);u===s&&this.getBlock(l,h-1,f)===0?this.particleSystem.spawnPoplarLeaf(l,h,f,"orange"):u===r&&this.getBlock(l,h-1,f)===0?this.particleSystem.spawnPoplarLeaf(l,h,f,"red"):u===o&&this.getBlock(l,h-1,f)===0?this.particleSystem.spawnPoplarLeaf(l,h,f,"yellow"):u===a&&this.particleSystem.spawnCampfireSmoke(l,h,f)}}findNearestAbandonedCamp(t,e){const n=Math.floor(t/Q),s=Math.floor(e/Q);for(let a=0;a<=6;a++)for(let c=-a;c<=a;c++)for(let l=-a;l<=a;l++)this.ensureChunk(n+c,s+l);if(this.abandonedCamps.length===0)return null;let r=this.abandonedCamps[0],o=1/0;for(const a of this.abandonedCamps){const c=Math.hypot(a.x-t,a.z-e);c<o&&(o=c,r=a)}return r}resetWorld(t,e,n){for(const[,s]of this.chunks)s.solidMesh&&(this.scene.remove(s.solidMesh),s.solidMesh.geometry.dispose()),s.waterMesh&&(this.scene.remove(s.waterMesh),s.waterMesh.geometry.dispose());this.chunks.clear(),this.abandonedCamps=[],this.blockDiffs.clear(),this.entityRenderer.clearAll(),Un.setSeed(t),Un.worldType=e,this.worldName=n}}class a0{constructor(t){I(this,"scene");I(this,"cushions",new Map);I(this,"mobs",new Map);I(this,"droppedItems",new Map);I(this,"cushionTextures",new Map);I(this,"entityImages",new Map);I(this,"textureLoader",new ts);this.scene=t}loadEntityImage(t,e){const n=this.entityImages.get(t);if(n){e(n);return}const s=new Image;s.crossOrigin="anonymous",s.onload=()=>{this.entityImages.set(t,s),e(s)},s.src=t}cropSubTexture(t,e,n,s,r,o=!1){const a=document.createElement("canvas");a.width=Math.max(1,(o?r:s)*4),a.height=Math.max(1,(o?s:r)*4);const c=a.getContext("2d");c.imageSmoothingEnabled=!1,o?(c.translate(a.width,0),c.rotate(Math.PI/2),c.drawImage(t,e,n,s,r,0,0,a.height,a.width)):c.drawImage(t,e,n,s,r,0,0,a.width,a.height);const l=new Wr(a);return l.magFilter=qt,l.minFilter=qt,l.colorSpace=de,l}createUprightPartMesh(t,e,n,s=0,r=16777215){const o=new we((t+s*2)/16,(e+s*2)/16,(n+s*2)/16),a=Array.from({length:6},()=>new Dn({color:r}));return{mesh:new Qt(o,a),applyTexture:(h,f,u,d=!1)=>{const p=[this.cropSubTexture(h,f+n+t,u+n,n,e),this.cropSubTexture(h,f,u+n,n,e),this.cropSubTexture(h,f+n,u,t,n),this.cropSubTexture(h,f+n+t,u,t,n),this.cropSubTexture(h,f+n,u+n,t,e),this.cropSubTexture(h,f+n+t+n,u+n,t,e)];for(let _=0;_<6;_++)a[_].map=p[_],a[_].color.setHex(16777215),a[_].transparent=d,a[_].alphaTest=d?.1:0,a[_].needsUpdate=!0}}}createQuadrupedBodyMesh(t,e,n,s=0,r=16777215){const o=new we((t+s*2)/16,(n+s*2)/16,(e+s*2)/16),a=Array.from({length:6},()=>new Dn({color:r}));return{mesh:new Qt(o,a),applyTexture:(h,f,u,d=!1)=>{const p=n,_=e,m=[this.cropSubTexture(h,f+p+t,u+p,p,_,!0),this.cropSubTexture(h,f,u+p,p,_,!0),this.cropSubTexture(h,f+p,u+p,t,_),this.cropSubTexture(h,f+p+t+p,u+p,t,_),this.cropSubTexture(h,f+p,u,t,p),this.cropSubTexture(h,f+p+t,u,t,p)];for(let g=0;g<6;g++)a[g].map=m[g],a[g].color.setHex(16777215),a[g].transparent=d,a[g].alphaTest=d?.1:0,a[g].needsUpdate=!0}}}getCushionMaterial(t){let e=this.cushionTextures.get(t);return e||(e=this.textureLoader.load(`/assets/minecraft/textures/entity/cushion/${t}_cushion.png`),e.magFilter=qt,e.minFilter=qt,e.colorSpace=de,this.cushionTextures.set(t,e)),new Dn({map:e,color:16777215})}addCushion(t){if(this.cushions.has(t.id))return;const e=new we(.875,.375,.875),n=this.getCushionMaterial(t.color),s=new Qt(e,n);s.position.set(t.x,t.blockY+.1875,t.z),s.rotation.y=t.rotation*Math.PI/180,s.userData={isCushion:!0,cushionId:t.id};const r=new we(.16,.05,.16),o=new Dn({color:i0[t.color]||16351261}),a=new Qt(r,o);a.position.set(0,.2,0),s.add(a),this.scene.add(s),this.cushions.set(t.id,{data:t,mesh:s})}removeCushion(t){const e=this.cushions.get(t);if(e)return this.scene.remove(e.mesh),e.mesh.geometry.dispose(),this.cushions.delete(t),e.data}findCushionAtBlock(t,e,n){for(const[,s]of this.cushions)if(s.data.blockX===t&&s.data.blockY===e&&s.data.blockZ===n)return s.data}spawnMob(t,e,n,s,r,o){if(this.mobs.has(t))return;const a=new _n,c=[];if(e==="remote_player"){const h=this.createUprightPartMesh(8,8,8,0,11896424);h.mesh.position.set(0,28/16,0);const f=this.createUprightPartMesh(8,8,8,.5,3351057);f.mesh.position.set(0,28/16,0);const u=this.createUprightPartMesh(8,12,4,0,43690);u.mesh.position.set(0,18/16,0);const d=this.createUprightPartMesh(4,12,4,0,11896424);d.mesh.position.set(-6/16,18/16,0);const p=this.createUprightPartMesh(4,12,4,0,11896424);p.mesh.position.set(6/16,18/16,0);const _=this.createUprightPartMesh(4,12,4,0,3355562);_.mesh.position.set(-2/16,6/16,0);const m=this.createUprightPartMesh(4,12,4,0,3355562);m.mesh.position.set(2/16,6/16,0),c.push(_.mesh,m.mesh),a.add(h.mesh,f.mesh,u.mesh,d.mesh,p.mesh,_.mesh,m.mesh),this.loadEntityImage("/assets/minecraft/textures/entity/player/wide/steve.png",g=>{h.applyTexture(g,0,0),f.applyTexture(g,32,0,!0),u.applyTexture(g,16,16),d.applyTexture(g,40,16),p.applyTexture(g,32,48),_.applyTexture(g,0,16),m.applyTexture(g,16,48)})}else if(e==="sheep"){const h=this.createUprightPartMesh(6,6,8,0,15058089);h.mesh.position.set(0,18/16,8/16);const f=this.createUprightPartMesh(6,6,6,.6,16119284);f.mesh.position.set(0,18/16,7/16);const u=this.createQuadrupedBodyMesh(8,16,6,0,15058089);u.mesh.position.set(0,15/16,0);const d=this.createQuadrupedBodyMesh(8,16,6,1.75,16119284);d.mesh.position.set(0,15/16,0);const _=[[-3/16,7/16],[3/16,7/16],[-3/16,-5/16],[3/16,-5/16]].map(([m,g])=>{const w=this.createUprightPartMesh(4,12,4,0,15058089);w.mesh.position.set(m,6/16,g);const E=this.createUprightPartMesh(4,6,4,.5,16119284);return E.mesh.position.set(0,3/16,0),w.mesh.add(E.mesh),c.push(w.mesh),a.add(w.mesh),{leg:w,wool:E}});a.add(h.mesh,f.mesh,u.mesh,d.mesh),this.loadEntityImage("/assets/minecraft/textures/entity/sheep/sheep.png",m=>{h.applyTexture(m,0,0),u.applyTexture(m,28,8);for(const g of _)g.leg.applyTexture(m,0,16)}),this.loadEntityImage("/assets/minecraft/textures/entity/sheep/sheep_wool.png",m=>{f.applyTexture(m,0,0),d.applyTexture(m,28,8);for(const g of _)g.wool.applyTexture(m,0,16)})}else if(e==="pig"){const h=this.createUprightPartMesh(8,8,8,0,15771042);h.mesh.position.set(0,12/16,7/16);const f=this.createUprightPartMesh(4,3,1,0,15771042);f.mesh.position.set(0,10/16,11.5/16);const u=this.createQuadrupedBodyMesh(10,16,8,0,15771042);u.mesh.position.set(0,10/16,0);const p=[[-3/16,5/16],[3/16,5/16],[-3/16,-7/16],[3/16,-7/16]].map(([_,m])=>{const g=this.createUprightPartMesh(4,6,4,0,15771042);return g.mesh.position.set(_,3/16,m),c.push(g.mesh),a.add(g.mesh),g});a.add(h.mesh,f.mesh,u.mesh),this.loadEntityImage("/assets/minecraft/textures/entity/pig/pig_temperate.png",_=>{h.applyTexture(_,0,0),f.applyTexture(_,16,16),u.applyTexture(_,28,8);for(const m of p)m.applyTexture(_,0,16)})}else{const h=this.createUprightPartMesh(8,8,6,0,7031861);h.mesh.position.set(0,20/16,8/16);const f=this.createQuadrupedBodyMesh(12,18,10,0,7031861);f.mesh.position.set(0,17/16,0);const d=[[-4/16,6/16],[4/16,6/16],[-4/16,-7/16],[4/16,-7/16]].map(([p,_])=>{const m=this.createUprightPartMesh(4,12,4,0,7031861);return m.mesh.position.set(p,6/16,_),c.push(m.mesh),a.add(m.mesh),m});a.add(h.mesh,f.mesh),this.loadEntityImage("/assets/minecraft/textures/entity/cow/cow_temperate.png",p=>{h.applyTexture(p,0,0),f.applyTexture(p,18,4);for(const _ of d)_.applyTexture(p,0,16)})}const l=e==="sheep"?8:10;a.position.set(n,s,r),this.scene.add(a),this.mobs.set(t,{id:t,type:e,name:o,x:n,y:s,z:r,vx:0,vy:0,vz:0,yaw:Math.random()*Math.PI*2,walkPhase:0,aiTimer:2,health:l,maxHealth:l,hurtTimer:0,panicTimer:0,deathTimer:0,dead:!1,mesh:a,legs:c})}raycastMob(t,e,n){let s=null,r=n;for(const[,o]of this.mobs){if(o.dead)continue;const a=o.type==="cow"?.55:.48,c=o.type==="cow"?1.45:o.type==="sheep"?1.35:1.05,l=o.x-a,h=o.x+a,f=o.y-.05,u=o.y+c,d=o.z-a,p=o.z+a;let _=-1/0,m=1/0;const g=[[t.x,e.x,l,h],[t.y,e.y,f,u],[t.z,e.z,d,p]];let w=!0;for(const[E,y,b,S]of g)if(Math.abs(y)<1e-6){if(E<b||E>S){w=!1;break}}else{let M=(b-E)/y,R=(S-E)/y;if(M>R){const v=M;M=R,R=v}if(M>_&&(_=M),R<m&&(m=R),_>m){w=!1;break}}if(w&&m>=0){const E=_>=0?_:0;E<=r&&(r=E,s={mob:o,distance:E})}}return s}setMobHurtTint(t,e){const n=e?16733525:16777215;t.mesh.traverse(s=>{if(s instanceof Qt){const r=Array.isArray(s.material)?s.material:[s.material];for(const o of r)o&&"color"in o&&o.color instanceof Bt&&o.color.setHex(n)}})}attackMob(t,e,n,s){const r=this.mobs.get(t);if(!r||r.dead||r.hurtTimer>.22)return{hit:!1,killed:!1};r.health=Math.max(0,r.health-e),r.hurtTimer=.45,r.panicTimer=4.5,this.setMobHurtTint(r,!0);const o=r.x-n.x,a=r.z-n.z,c=Math.hypot(o,a)||1,l=o/c,h=a/c;if(r.vx=l*5.2,r.vz=h*5.2,r.vy=4.2,r.yaw=Math.atan2(l,h),r.health<=0){r.dead=!0,r.deathTimer=.55,s==null||s(r.x,r.y+.5,r.z);const f=Math.floor(r.x),u=Math.floor(r.y),d=Math.floor(r.z);if(r.type==="sheep"){this.spawnDroppedItem(f,u,d,"white_wool");const p=1+Math.floor(Math.random()*2);for(let _=0;_<p;_++)this.spawnDroppedItem(f,u,d,"mutton")}else if(r.type==="pig"){const p=1+Math.floor(Math.random()*3);for(let _=0;_<p;_++)this.spawnDroppedItem(f,u,d,"porkchop")}else if(r.type==="cow"){const p=1+Math.floor(Math.random()*3);for(let m=0;m<p;m++)this.spawnDroppedItem(f,u,d,"beef");const _=Math.floor(Math.random()*3);for(let m=0;m<_;m++)this.spawnDroppedItem(f,u,d,"leather")}return{hit:!0,killed:!0,mob:r}}return{hit:!0,killed:!1,mob:r}}spawnDroppedItem(t,e,n,s){const r=nt.getItem(s);if(!r)return;const o=`item_${Date.now()}_${Math.random()}`;let a,c;if(r.isBlock&&r.blockNumId!==void 0){const d=nt.getBlock(r.blockNumId);a=new we(.25,.25,.25);const p=a.attributes.uv,_=[d.textures.east,d.textures.west,d.textures.top,d.textures.bottom,d.textures.south,d.textures.north],m=[.72,.72,1,.55,.86,.86],g=[];for(let w=0;w<6;w++){const E=_e.getUV(_[w]),y=w*4;p.setXY(y+0,E.u0,E.v1),p.setXY(y+1,E.u1,E.v1),p.setXY(y+2,E.u0,E.v0),p.setXY(y+3,E.u1,E.v0);let b=1,S=1,M=1;d.tint==="grass"&&w===2?(b=121/255,S=192/255,M=90/255):d.tint==="foliage"?(b=89/255,S=174/255,M=48/255):d.tint==="birch"?(b=128/255,S=167/255,M=85/255):d.tint==="spruce"&&(b=97/255,S=153/255,M=97/255);const R=m[w];for(let v=0;v<4;v++)g.push(b*R,S*R,M*R)}p.needsUpdate=!0,a.setAttribute("color",new ue(g,3)),c=new Ve({map:_e.texture,vertexColors:!0,transparent:!0,alphaTest:.1})}else{a=new Zn(.35,.35);const d=this.textureLoader.load(`/assets/minecraft/textures/${r.texture}.png`);d.magFilter=qt,d.minFilter=qt,d.colorSpace=de,c=new Ve({map:d,side:He,transparent:!0,alphaTest:.1})}const l=new Qt(a,c),h=t+.5+(Math.random()-.5)*.16,f=e+.35,u=n+.5+(Math.random()-.5)*.16;l.position.set(h,f,u),this.scene.add(l),this.droppedItems.set(o,{id:o,itemId:r.shortId,x:h,y:f,z:u,vx:(Math.random()-.5)*1.1,vy:2.2+Math.random()*.6,vz:(Math.random()-.5)*1.1,age:0,mesh:l})}update(t,e,n,s,r){for(const[o,a]of this.droppedItems){a.age+=t,a.vy=Math.max(-18,a.vy-18*t);const c=a.x+a.vx*t;!r||!r(Math.floor(c),Math.floor(a.y),Math.floor(a.z))?a.x=c:a.vx=-a.vx*.3;const l=a.z+a.vz*t;!r||!r(Math.floor(a.x),Math.floor(a.y),Math.floor(l))?a.z=l:a.vz=-a.vz*.3;const h=a.y+a.vy*t,f=Math.floor(h-.16);(r?r(Math.floor(a.x),f,Math.floor(a.z)):h<e(Math.floor(a.x),Math.floor(a.z))+.18)&&a.vy<=0?(a.y=f+1+.16,a.vy=0,a.vx*=Math.pow(.02,t),a.vz*=Math.pow(.02,t)):a.y=h;const d=Math.sin(a.age*3.2)*.06+.06;if(a.mesh.position.set(a.x,a.y+d,a.z),a.mesh.rotation.y=a.age*1.8,n&&a.age>.2){const p=n.x-a.x,_=n.y+.75-a.y,m=n.z-a.z,g=Math.hypot(p,_,m);if(g<2.35&&(a.x+=p/g*11*t,a.y+=_/g*11*t,a.z+=m/g*11*t,g<.95&&s&&s(a.itemId))){this.scene.remove(a.mesh),a.mesh.geometry.dispose(),this.droppedItems.delete(o);continue}}a.age>300&&(this.scene.remove(a.mesh),a.mesh.geometry.dispose(),this.droppedItems.delete(o))}for(const[o,a]of this.mobs){if(a.type==="remote_player")continue;if(a.hurtTimer>0&&(a.hurtTimer-=t,a.hurtTimer<=0&&this.setMobHurtTint(a,!1)),a.dead){a.deathTimer-=t;const f=Math.min(1,Math.max(0,1-a.deathTimer/.55));if(a.mesh.rotation.z=f*(Math.PI/2),a.deathTimer<=0&&(this.scene.remove(a.mesh),this.mobs.delete(o),n)){const u=Math.random()*Math.PI*2,d=14+Math.random()*10,p=Math.floor(n.x+Math.cos(u)*d),_=Math.floor(n.z+Math.sin(u)*d),m=e(p,_);this.spawnMob(`${a.type}_${Date.now()}`,a.type,p,m,_)}continue}if(a.panicTimer>0&&(a.panicTimer-=t),a.aiTimer-=t,a.aiTimer<=0&&a.hurtTimer<=0)if(a.panicTimer>0){a.aiTimer=.35+Math.random()*.45,a.yaw+=(Math.random()-.5)*2.4;const f=2.9;a.vx=Math.sin(a.yaw)*f,a.vz=Math.cos(a.yaw)*f}else if(a.aiTimer=2+Math.random()*4,Math.random()<.6){a.yaw+=(Math.random()-.5)*2.2;const f=1.2;a.vx=Math.sin(a.yaw)*f,a.vz=Math.cos(a.yaw)*f}else a.vx=0,a.vz=0;a.hurtTimer>0&&(a.vx*=Math.pow(.08,t),a.vz*=Math.pow(.08,t));const l=Math.hypot(a.vx,a.vz)>.05;if(l?a.walkPhase+=t*(a.panicTimer>0?13:7):a.walkPhase*=.85,a.legs&&a.legs.length>=4){const f=l?Math.sin(a.walkPhase)*.55:0;a.legs[0].rotation.x=f,a.legs[1].rotation.x=-f,a.legs[2].rotation.x=-f,a.legs[3].rotation.x=f}a.x+=a.vx*t,a.z+=a.vz*t;const h=e(Math.floor(a.x),Math.floor(a.z));a.y>h||a.vy>0?(a.vy-=18*t,a.y+=a.vy*t,a.y<=h&&(a.y=h,a.vy=0)):a.y+=(h-a.y)*Math.min(1,t*10),a.mesh.position.set(a.x,a.y,a.z),a.mesh.rotation.y=a.yaw}}clearAll(){for(const[,t]of this.cushions)this.scene.remove(t.mesh),t.mesh.geometry.dispose();this.cushions.clear();for(const[,t]of this.mobs)this.scene.remove(t.mesh);this.mobs.clear();for(const[,t]of this.droppedItems)this.scene.remove(t.mesh),t.mesh.geometry.dispose();this.droppedItems.clear()}}class o0{constructor(t){I(this,"scene");I(this,"particles",[]);I(this,"leafMaterials");I(this,"smokeMaterial");I(this,"sharedGeo",new we(.14,.14,.04));I(this,"smokeGeo",new we(.28,.28,.28));I(this,"timer",0);this.scene=t;const e=new ts,n=(s,r)=>{const o=e.load(s);return o.magFilter=qt,o.minFilter=qt,o.colorSpace=de,new Ve({map:o,transparent:!0,alphaTest:.1,color:r,side:He})};this.leafMaterials={orange:n("/assets/minecraft/textures/particle/orange_poplar_1.png",16749092),red:n("/assets/minecraft/textures/particle/red_poplar_1.png",14695464),yellow:n("/assets/minecraft/textures/particle/yellow_poplar_1.png",16768060)},this.smokeMaterial=new Ve({color:7039851,transparent:!0,opacity:.55})}spawnPoplarLeaf(t,e,n,s){if(this.particles.length>180)return;const r=new Qt(this.sharedGeo,this.leafMaterials[s]);r.position.set(t+Math.random(),e-.1,n+Math.random()),this.scene.add(r),this.particles.push({mesh:r,vx:(Math.random()-.5)*.4,vy:-.6-Math.random()*.4,vz:(Math.random()-.5)*.4,life:0,maxLife:4.5+Math.random()*2,swayFreq:1.5+Math.random()*2})}spawnCampfireSmoke(t,e,n){if(this.particles.length>180)return;const s=new Qt(this.smokeGeo,this.smokeMaterial);s.position.set(t+.35+Math.random()*.3,e+.5,n+.35+Math.random()*.3),this.scene.add(s),this.particles.push({mesh:s,vx:(Math.random()-.5)*.15,vy:.9+Math.random()*.4,vz:(Math.random()-.5)*.15,life:0,maxLife:3.5+Math.random()*1.5,swayFreq:.8})}spawnBlockBreakBurst(t,e,n,s=10516565){const r=new Ve({color:s});for(let o=0;o<14;o++){const a=new Qt(this.sharedGeo,r);a.position.set(t+.2+Math.random()*.6,e+.2+Math.random()*.6,n+.2+Math.random()*.6),this.scene.add(a),this.particles.push({mesh:a,vx:(Math.random()-.5)*3.2,vy:1.5+Math.random()*2.5,vz:(Math.random()-.5)*3.2,life:0,maxLife:.55+Math.random()*.25,swayFreq:0})}}update(t){for(let e=this.particles.length-1;e>=0;e--){const n=this.particles[e];if(n.life+=t,n.life>=n.maxLife){this.scene.remove(n.mesh),this.particles.splice(e,1);continue}n.swayFreq===0?n.vy-=9.8*t:n.vy<0?(n.vx=Math.sin(n.life*n.swayFreq)*.55,n.vz=Math.cos(n.life*n.swayFreq*.8)*.55,n.mesh.rotation.x+=t*1.8,n.mesh.rotation.y+=t*2.2):n.mesh.rotation.y+=t*.7,n.mesh.position.x+=n.vx*t,n.mesh.position.y+=n.vy*t,n.mesh.position.z+=n.vz*t}}}class l0{constructor(){I(this,"scene");I(this,"camera");I(this,"cubeMesh");I(this,"angle",0);this.scene=new al,this.camera=new Oe(85,window.innerWidth/window.innerHeight,.1,100);const t=new ts,e=r=>{const o=t.load(`/assets/minecraft/textures/gui/title/background/panorama_${r}.png`);return o.colorSpace=de,o.magFilter=en,o.minFilter=en,new Ve({map:o,side:Ue,depthWrite:!1})},n=[e(1),e(3),e(4),e(5),e(0),e(2)],s=new we(10,10,10);this.cubeMesh=new Qt(s,n),this.scene.add(this.cubeMesh)}resize(t,e){this.camera.aspect=t/e,this.camera.updateProjectionMatrix()}render(t,e){this.angle+=e*.085,this.camera.rotation.order="YXZ",this.camera.rotation.y=-this.angle,this.camera.rotation.x=Math.sin(this.angle*.7)*.12-.08,t.render(this.scene,this.camera)}}class c0{constructor(t){I(this,"group");I(this,"celestialGroup");I(this,"sunMesh");I(this,"moonMesh");I(this,"starsPoints");I(this,"cloudsMesh");I(this,"cloudOffset",0);this.group=new _n,this.celestialGroup=new _n,this.group.add(this.celestialGroup),t.add(this.group),this.initSunAndMoon(),this.initStars(),this.initClouds()}initSunAndMoon(){const t=new ts,e=new Zn(36,36),n=new Ve({color:16777215,side:He,transparent:!0,blending:Or,depthWrite:!1,fog:!1});t.load("/assets/minecraft/textures/environment/sun.png",a=>{a.magFilter=qt,a.minFilter=qt,a.colorSpace=de,n.map=a,n.needsUpdate=!0}),this.sunMesh=new Qt(e,n),this.sunMesh.position.set(0,160,0),this.sunMesh.rotation.x=Math.PI/2,this.celestialGroup.add(this.sunMesh);const s=new Zn(28,28),r=s.attributes.uv;r.setXY(0,0,1),r.setXY(1,.25,1),r.setXY(2,0,.5),r.setXY(3,.25,.5),r.needsUpdate=!0;const o=new Ve({color:16777215,side:He,transparent:!0,blending:Or,depthWrite:!1,fog:!1});t.load("/assets/minecraft/textures/environment/moon_phases.png",a=>{a.magFilter=qt,a.minFilter=qt,a.colorSpace=de,o.map=a,o.needsUpdate=!0}),this.moonMesh=new Qt(s,o),this.moonMesh.position.set(0,-160,0),this.moonMesh.rotation.x=-Math.PI/2,this.celestialGroup.add(this.moonMesh)}initStars(){const e=new Float32Array(2250);let n=10842;const s=()=>(n=n*1664525+1013904223>>>0,n/4294967295);for(let a=0;a<750;a++){const c=s()*Math.PI*2,l=Math.acos(2*s()-1),h=155;e[a*3]=h*Math.sin(l)*Math.cos(c),e[a*3+1]=h*Math.cos(l),e[a*3+2]=h*Math.sin(l)*Math.sin(c)}const r=new Ie;r.setAttribute("position",new un(e,3));const o=new Jh({color:16777215,size:1.5,sizeAttenuation:!1,transparent:!0,opacity:0,depthWrite:!1,fog:!1});this.starsPoints=new K_(r,o),this.celestialGroup.add(this.starsPoints)}initClouds(){const t=new ts,e=new Zn(512,512),n=new Ve({color:16777215,transparent:!0,opacity:.82,side:He,depthWrite:!1});t.load("/assets/minecraft/textures/environment/clouds.png",s=>{s.magFilter=qt,s.minFilter=qt,s.wrapS=Rs,s.wrapT=Rs,s.repeat.set(2,2),n.map=s,n.needsUpdate=!0}),this.cloudsMesh=new Qt(e,n),this.cloudsMesh.rotation.x=Math.PI/2,this.cloudsMesh.position.y=128,this.group.add(this.cloudsMesh)}update(t,e,n,s){this.group.position.set(e.x,0,e.z),this.celestialGroup.position.y=e.y;const r=(n-6e3)/24e3*Math.PI*2;this.celestialGroup.rotation.z=r;const o=Math.cos(r),a=Math.max(0,Math.min(1,-o*2));if(this.starsPoints.material.opacity=a,this.cloudsMesh.visible=s!=="OFF",this.cloudsMesh.visible){this.cloudOffset+=t*.0015;const c=this.cloudsMesh.material;c.map&&(c.map.offset.x=this.cloudOffset);const l=Math.max(.22,Math.min(1,o*.6+.65));c.color.setRGB(l,l,Math.min(1,l*1.05))}}}const Ne=Math.PI/180;class h0{constructor(){I(this,"scene");I(this,"camera");I(this,"armPoseGroup");I(this,"armMesh");I(this,"sleeveMesh");I(this,"itemPoseGroup");I(this,"itemDisplayGroup");I(this,"currentItemId","__uninit__");I(this,"swingProgress",0);I(this,"isSwinging",!1);I(this,"equipProgress",1);I(this,"bobPhase",0);this.scene=new al,this.camera=new Oe(70,window.innerWidth/window.innerHeight,.05,10);const t=new eu(16777215,.92),e=new tu(16777215,.55);e.position.set(.5,1.5,1),this.scene.add(t,e),this.armPoseGroup=new _n,this.armPoseGroup.matrixAutoUpdate=!1,this.scene.add(this.armPoseGroup),this.itemPoseGroup=new _n,this.itemPoseGroup.matrixAutoUpdate=!1,this.itemDisplayGroup=new _n,this.itemPoseGroup.add(this.itemDisplayGroup),this.scene.add(this.itemPoseGroup),this.buildPlayerArm(),this.updateHeldItem(null)}cropArmFaceTexture(t,e,n,s,r,o,a=!1){const c=document.createElement("canvas");c.width=s*4,c.height=r*4;const l=c.getContext("2d");l.imageSmoothingEnabled=!1,l.translate(a?c.width:0,o?c.height:0),l.scale(a?-1:1,o?-1:1),l.drawImage(t,e,n,s,r,0,0,c.width,c.height);const h=new Wr(c);return h.magFilter=qt,h.minFilter=qt,h.colorSpace=de,h}buildPlayerArm(){const t=new we(.25,.75,.25),e=new Dn({color:11896424}),n=new Dn({color:43690}),s=[e.clone(),e.clone(),e.clone(),n.clone(),e.clone(),e.clone()];this.armMesh=new Qt(t,s),this.armMesh.position.set(-1/16,4/16,0),this.armPoseGroup.add(this.armMesh);const r=new we(4.5/16,12.5/16,4.5/16),o=Array.from({length:6},()=>new Dn({transparent:!0,alphaTest:.1,opacity:0}));this.sleeveMesh=new Qt(r,o),this.sleeveMesh.position.set(-1/16,4/16,0),this.armPoseGroup.add(this.sleeveMesh),new ts().load("/assets/minecraft/textures/entity/player/wide/steve.png",c=>{const l=c.image,h=this.cropArmFaceTexture(l,48,20,4,12,!0),f=this.cropArmFaceTexture(l,40,20,4,12,!0),u=this.cropArmFaceTexture(l,48,16,4,4,!1),d=this.cropArmFaceTexture(l,44,16,4,4,!1),p=this.cropArmFaceTexture(l,52,20,4,12,!0),_=this.cropArmFaceTexture(l,44,20,4,12,!0),m=[h,f,u,d,p,_];for(let R=0;R<6;R++)s[R].map=m[R],s[R].color.setHex(16777215),s[R].needsUpdate=!0;const g=this.cropArmFaceTexture(l,48,36,4,12,!0),w=this.cropArmFaceTexture(l,40,36,4,12,!0),E=this.cropArmFaceTexture(l,48,32,4,4,!1),y=this.cropArmFaceTexture(l,44,32,4,4,!1),b=this.cropArmFaceTexture(l,52,36,4,12,!0),S=this.cropArmFaceTexture(l,44,36,4,12,!0),M=[g,w,E,y,b,S];for(let R=0;R<6;R++)o[R].map=M[R],o[R].opacity=1,o[R].needsUpdate=!0},void 0,()=>{})}buildExtruded2DItemMesh(t){const s=document.createElement("canvas");s.width=16,s.height=16;const r=s.getContext("2d",{willReadFrequently:!0});r.imageSmoothingEnabled=!1,r.drawImage(t,0,0,16,16);const o=r.getImageData(0,0,16,16).data,a=(b,S)=>b<0||b>=16||S<0||S>=16?!1:o[(S*16+b)*4+3]>=25,c=[],l=[],h=[],f=[],u=[];let d=0;const p=.5/16,_=-.5/16,m=(b,S,M,R,v,x,C,L,U,D,O,H)=>{c.push(...b,...S,...M,...R);for(let $=0;$<4;$++)l.push(v,x,C),f.push(H,H,H);h.push(L,U,D,U,D,O,L,O),u.push(d,d+1,d+2,d,d+2,d+3),d+=4};m([-.5,-.5,p],[.5,-.5,p],[.5,.5,p],[-.5,.5,p],0,0,1,0,0,1,1,1),m([.5,-.5,_],[-.5,-.5,_],[-.5,.5,_],[.5,.5,_],0,0,-1,1,0,0,1,1);const g=.002;for(let b=0;b<16;b++)for(let S=0;S<16;S++){if(!a(S,b))continue;const M=-.5+S/16,R=-.5+(S+1)/16,v=.5-b/16,x=.5-(b+1)/16,C=(S+g)/16,L=(S+1-g)/16,U=1-(b+g)/16,D=1-(b+1-g)/16;a(S,b-1)||m([M,v,p],[R,v,p],[R,v,_],[M,v,_],0,1,0,C,D,L,U,.95),a(S,b+1)||m([M,x,_],[R,x,_],[R,x,p],[M,x,p],0,-1,0,C,D,L,U,.65),a(S-1,b)||m([M,x,_],[M,x,p],[M,v,p],[M,v,_],-1,0,0,C,D,L,U,.8),a(S+1,b)||m([R,x,p],[R,x,_],[R,v,_],[R,v,p],1,0,0,C,D,L,U,.8)}const w=new Ie;w.setAttribute("position",new ue(c,3)),w.setAttribute("normal",new ue(l,3)),w.setAttribute("uv",new ue(h,2)),w.setAttribute("color",new ue(f,3)),w.setIndex(u);const E=new Wr(s);E.magFilter=qt,E.minFilter=qt,E.colorSpace=de;const y=new Ve({map:E,vertexColors:!0,transparent:!0,alphaTest:.1});return new Qt(w,y)}triggerSwing(){(!this.isSwinging||this.swingProgress>.35)&&(this.isSwinging=!0,this.swingProgress=0)}updateHeldItem(t){const e=t?t.id:"";if(e===this.currentItemId)return;for(this.currentItemId=e,this.equipProgress=0;this.itemDisplayGroup.children.length>0;){const m=this.itemDisplayGroup.children[0];m.geometry&&m.geometry.dispose(),this.itemDisplayGroup.remove(m)}if(this.itemDisplayGroup.position.set(0,0,0),this.itemDisplayGroup.rotation.set(0,0,0),this.itemDisplayGroup.scale.set(1,1,1),!t)return;const n=t.isBlock&&t.blockNumId!==void 0?nt.getBlock(t.blockNumId):null;if(!n||n.shape==="cross"||n.shape==="torch"||n.shape==="campfire"){this.itemDisplayGroup.position.set(1.13/16,3.2/16,1.13/16);const m=new rs().setFromEuler(new nn(0*Ne,-90*Ne,25*Ne,"ZYX"));this.itemDisplayGroup.quaternion.copy(m),this.itemDisplayGroup.scale.set(.68,.68,.68);let g=`/assets/minecraft/textures/${t.texture}.png`;t.shortId==="campfire"?g="/assets/minecraft/textures/item/campfire.png":t.shortId==="lantern"&&(g="/assets/minecraft/textures/item/lantern.png");const w=new Image;w.crossOrigin="anonymous",w.onload=()=>{if(this.currentItemId!==t.id)return;const E=this.buildExtruded2DItemMesh(w);this.itemDisplayGroup.add(E)},w.src=g;return}this.itemDisplayGroup.position.set(0,0,0),this.itemDisplayGroup.rotation.set(0,45*Ne,0,"ZYX"),this.itemDisplayGroup.scale.set(.4,.4,.4);const r=n.shape==="slab_bottom"||t.shortId.endsWith("_slab"),o=n.shape==="bed_foot"||t.shortId==="straw_bed",a=n.shape==="carpet"||n.shape==="trapdoor",c=o?.28:r?.5:a?.1875:1,l=new we(1,c,1),h=l.attributes.uv,f=[n.textures.east,n.textures.west,n.textures.top,n.textures.bottom,n.textures.south,n.textures.north],u=[.72,.72,1,.55,.86,.86],d=[];for(let m=0;m<6;m++){const g=_e.getUV(f[m]),w=(g.v1-g.v0)*(m===2||m===3?1:c),E=g.v0+w,y=m*4;h.setXY(y+0,g.u0,E),h.setXY(y+1,g.u1,E),h.setXY(y+2,g.u0,g.v0),h.setXY(y+3,g.u1,g.v0);let b=1,S=1,M=1;n.tint==="grass"&&m===2?(b=121/255,S=192/255,M=90/255):n.tint==="foliage"?(b=89/255,S=174/255,M=48/255):n.tint==="birch"?(b=128/255,S=167/255,M=85/255):n.tint==="spruce"&&(b=97/255,S=153/255,M=97/255);const R=u[m];for(let v=0;v<4;v++)d.push(b*R,S*R,M*R)}h.needsUpdate=!0,l.setAttribute("color",new ue(d,3));const p=new Ve({map:_e.texture,vertexColors:!0,alphaTest:.1,transparent:!0}),_=new Qt(l,p);this.itemDisplayGroup.add(_)}update(t,e,n){this.equipProgress<1&&(this.equipProgress=Math.min(1,this.equipProgress+t*6)),this.isSwinging&&(this.swingProgress+=t*4.5,this.swingProgress>=1&&(this.swingProgress=0,this.isSwinging=!1)),e?this.bobPhase+=t*(n?13:9):this.bobPhase*=.9;const s=e?Math.sin(this.bobPhase*.5)*.025:0,r=e?-Math.abs(Math.cos(this.bobPhase*.5))*.025:0,o=this.swingProgress,a=Math.sqrt(o),c=1-this.equipProgress;if(this.currentItemId){this.armPoseGroup.visible=!1,this.itemPoseGroup.visible=!0;const l=new ee,h=new ee;l.makeTranslation(.56+s,-.52+c*-.6+r,-.72);const f=-.4*Math.sin(a*Math.PI),u=.2*Math.sin(a*Math.PI*2),d=-.2*Math.sin(o*Math.PI);l.multiply(h.makeTranslation(f,u,d));const p=Math.sin(o*o*Math.PI),_=Math.sin(a*Math.PI);l.multiply(h.makeRotationY((45+p*-20)*Ne)),l.multiply(h.makeRotationZ(_*-20*Ne)),l.multiply(h.makeRotationX(_*-80*Ne)),l.multiply(h.makeRotationY(-45*Ne)),this.itemPoseGroup.matrix.copy(l)}else{this.armPoseGroup.visible=!0,this.itemPoseGroup.visible=!1;const l=-.3*Math.sin(a*Math.PI),h=.4*Math.sin(a*Math.PI*2),f=-.4*Math.sin(o*Math.PI),u=Math.sin(o*o*Math.PI),d=Math.sin(a*Math.PI),p=new ee,_=new ee;p.makeTranslation(.64+l+s,-.6+h+c*-.6+r,-.72+f),p.multiply(_.makeRotationY(45*Ne)),p.multiply(_.makeRotationY(d*70*Ne)),p.multiply(_.makeRotationZ(u*-20*Ne)),p.multiply(_.makeTranslation(-1,3.6,3.5)),p.multiply(_.makeRotationZ(120*Ne)),p.multiply(_.makeRotationX(200*Ne)),p.multiply(_.makeRotationY(-135*Ne)),p.multiply(_.makeTranslation(5.6,0,0)),p.multiply(_.makeTranslation(-5/16,2/16,0)),p.multiply(_.makeRotationZ(.1)),this.armPoseGroup.matrix.copy(p)}}render(t){this.camera.aspect=window.innerWidth/window.innerHeight,this.camera.updateProjectionMatrix();const e=t.autoClear;t.autoClear=!1,t.clearDepth(),t.render(this.scene,this.camera),t.autoClear=e}}class Re{static async init(){var t;if(typeof navigator>"u"||!navigator.gpu){this.supported=!1,this.active=!1,this.backendLabel="WebGL2 (WebGPU unavailable in browser)";return}try{const n=await navigator.gpu.requestAdapter({powerPreference:"high-performance"});if(!n){this.supported=!1,this.active=!1,this.backendLabel="WebGL2 (No WebGPU Adapter)";return}this.adapter=n;const s=n.info||await((t=n.requestAdapterInfo)==null?void 0:t.call(n))||{},r=s.vendor?String(s.vendor).toUpperCase():"GPU",o=s.architecture||s.description||"Hardware Adapter";this.adapterName=`${r} (${o})`;const a=await n.requestDevice();this.device=a;const c=a.createShaderModule({label:"Minecraft 26.3 Voxel Terrain & Light WGSL Compute Shader",code:`
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
        `});this.computePipeline=a.createComputePipeline({label:"Minecraft 26.3 WGSL Compute Pipeline",layout:"auto",compute:{module:c,entryPoint:"main"}}),this.supported=!0,this.active=!0,this.backendLabel=`WebGPU (${this.adapterName})`}catch(e){console.warn("WebGPU initialization fallback:",e),this.supported=!1,this.active=!1,this.backendLabel="WebGL2"}}}I(Re,"supported",!1),I(Re,"active",!1),I(Re,"adapterName","WebGL2 Fallback"),I(Re,"backendLabel","WebGL2"),I(Re,"adapter",null),I(Re,"device",null),I(Re,"computePipeline",null);class Jr{constructor(){I(this,"slots",new Array(36).fill(null));I(this,"armorSlots",new Array(4).fill(null));I(this,"offhandSlot",null);I(this,"crafting2x2",new Array(4).fill(null));I(this,"crafting3x3",new Array(9).fill(null));I(this,"stonecutterInput",null);I(this,"stonecutterSelectedIndex",0);I(this,"furnaceInput",null);I(this,"furnaceFuel",null);I(this,"furnaceOutput",null);I(this,"chestSlots",new Array(27).fill(null));I(this,"cursorStack",null);I(this,"selectedHotbarSlot",0)}clearAll(){this.slots.fill(null),this.armorSlots.fill(null),this.offhandSlot=null,this.crafting2x2.fill(null),this.crafting3x3.fill(null),this.stonecutterInput=null,this.furnaceInput=null,this.furnaceFuel=null,this.furnaceOutput=null,this.cursorStack=null,this.selectedHotbarSlot=0}populateDefault26_3Loadout(){const t=[["poplar_log",64],["poplar_planks",64],["orange_poplar_leaves",64],["straw_bed",1],["orange_cushion",16],["red_wool_stairs",64],["cyan_concrete_slab",64],["stonecutter",1],["filled_map",1],["yellow_poplar_leaves",64],["red_poplar_leaves",64],["poplar_stairs",64],["poplar_slab",64],["poplar_fence",64],["poplar_trapdoor",64],["poplar_shelf",64],["yellow_cushion",16],["red_cushion",16],["cyan_cushion",16],["lime_wool_stairs",64],["yellow_wool_slab",64],["white_concrete_stairs",64],["orange_concrete_slab",64],["cyan_concrete",64],["white_concrete",64],["campfire",16],["torch",64],["crafting_table",1],["diamond_pickaxe",1],["diamond_axe",1]];for(let e=0;e<Math.min(this.slots.length,t.length);e++){const[n,s]=t[e],r=nt.getItem(n);r&&(this.slots[e]={item:r,count:s})}}getHeldStack(){return this.slots[this.selectedHotbarSlot]}clickSlot(t,e,n,s=!1,r=-1){const o=t();if(s&&o){if(r>=0&&r<9){const a=this.moveStackToRange(o,9,36);e(a)}else if(r>=9&&r<36){const a=this.moveStackToRange(o,0,9);e(a)}else this.addItem(o.item.shortId,o.count)&&e(null);return}if(n===0){if(!this.cursorStack&&o)this.cursorStack=o,e(null);else if(this.cursorStack&&!o)e(this.cursorStack),this.cursorStack=null;else if(this.cursorStack&&o)if(this.cursorStack.item.id===o.item.id&&o.count<o.item.maxStack){const a=o.item.maxStack-o.count,c=Math.min(a,this.cursorStack.count);o.count+=c,this.cursorStack.count-=c,this.cursorStack.count<=0&&(this.cursorStack=null),e(o)}else{const a=o;e(this.cursorStack),this.cursorStack=a}}else if(n===2)if(!this.cursorStack&&o){const a=Math.ceil(o.count/2);this.cursorStack={item:o.item,count:a},o.count-=a,e(o.count>0?o:null)}else this.cursorStack&&!o?(e({item:this.cursorStack.item,count:1}),this.cursorStack.count-=1,this.cursorStack.count<=0&&(this.cursorStack=null)):this.cursorStack&&o&&this.cursorStack.item.id===o.item.id&&o.count<o.item.maxStack&&(o.count+=1,this.cursorStack.count-=1,this.cursorStack.count<=0&&(this.cursorStack=null),e(o))}placeOneFromCursor(t,e){if(!this.cursorStack||this.cursorStack.count<=0)return;const n=t();n?n.item.id===this.cursorStack.item.id&&n.count<n.item.maxStack&&(n.count+=1,this.cursorStack.count-=1,this.cursorStack.count<=0&&(this.cursorStack=null),e(n)):(e({item:this.cursorStack.item,count:1}),this.cursorStack.count-=1,this.cursorStack.count<=0&&(this.cursorStack=null))}moveStackToRange(t,e,n){let s=t.count;for(let r=e;r<n&&s>0;r++){const o=this.slots[r];if(o&&o.item.id===t.item.id&&o.count<t.item.maxStack){const a=Math.min(t.item.maxStack-o.count,s);o.count+=a,s-=a}}for(let r=e;r<n&&s>0;r++)if(!this.slots[r]){const o=Math.min(t.item.maxStack,s);this.slots[r]={item:t.item,count:o},s-=o}return s>0?{item:t.item,count:s}:null}getCraftingResult(t,e){const n=t.map(_=>_?_.item.shortId:""),s=n.filter(_=>_!=="");if(s.length===0)return null;const r=(_,m)=>{const g=nt.getItem(_);return g?{item:g,count:m}:null};if(s.length===1){const _=s[0];if(_.endsWith("_log")||_.endsWith("_wood")){const m=_.replace(/^stripped_/,"").replace(/_(log|wood)$/,"");return r(`${m}_planks`,4)}}let o=e,a=-1,c=e,l=-1;for(let _=0;_<e;_++)for(let m=0;m<e;m++)n[_*e+m]!==""&&(_<o&&(o=_),_>a&&(a=_),m<c&&(c=m),m>l&&(l=m));const h=a-o+1,f=l-c+1,u=[];for(let _=o;_<=a;_++){const m=[];for(let g=c;g<=l;g++)m.push(n[_*e+g]);u.push(m)}const d=s[0],p=_=>s.every(m=>m===_||_==="_planks"&&m.endsWith("_planks")||_==="_log"&&m.endsWith("_log"));if(f===2&&h===2&&s.length===4){if(p("_planks"))return r("crafting_table",1);if(d.endsWith("_log")&&p(d))return r(d.replace("_log","_wood"),3);if(p("stone"))return r("stone_bricks",4);if(p("sand"))return r("sandstone",1);if(p("granite"))return r("polished_granite",4);if(p("diorite"))return r("polished_diorite",4);if(p("andesite"))return r("polished_andesite",4)}if(f===1&&h===2&&s.length===2){if(u[0][0].endsWith("_planks")&&u[1][0].endsWith("_planks"))return r("stick",4);if((u[0][0]==="coal"||u[0][0]==="charcoal")&&u[1][0]==="stick")return r("torch",4)}if(f===1&&h===3&&s.length===3){const _=w=>w.endsWith("_planks")?"wooden":w==="cobblestone"||w==="cobbled_deepslate"?"stone":w==="iron_ingot"?"iron":w==="diamond"?"diamond":null,m=_(u[0][0]);if(m&&u[1][0]==="stick"&&u[2][0]==="stick")return r(`${m}_shovel`,1);const g=_(u[0][0]);if(g&&_(u[1][0])===g&&u[2][0]==="stick")return r(`${g}_sword`,1)}if(f===3&&h===3&&s.length===5){const _=g=>g.endsWith("_planks")?"wooden":g==="cobblestone"||g==="cobbled_deepslate"?"stone":g==="iron_ingot"?"iron":g==="diamond"?"diamond":null,m=_(u[0][0]);if(m&&_(u[0][1])===m&&_(u[0][2])===m&&u[1][1]==="stick"&&u[2][1]==="stick")return r(`${m}_pickaxe`,1)}if(f===2&&h===3&&s.length===5){const _=w=>w.endsWith("_planks")?"wooden":w==="cobblestone"||w==="cobbled_deepslate"?"stone":w==="iron_ingot"?"iron":w==="diamond"?"diamond":null,m=_(u[0][0]);if(m&&_(u[0][1])===m&&_(u[1][0])===m&&u[1][1]==="stick"&&u[2][1]==="stick")return r(`${m}_axe`,1);const g=_(u[0][1]);if(g&&_(u[0][0])===g&&_(u[1][1])===g&&u[1][0]==="stick"&&u[2][0]==="stick")return r(`${g}_axe`,1)}if(f===2&&h===1&&s.length===2&&p(d)&&d.endsWith("_wool")){const _=d.replace("_wool","");return r(`${_}_cushion`,1)||r(`${_}_carpet`,3)}if(f===3&&h===1&&s.length===3&&p(d)){if(d==="poplar_slab")return r("poplar_shelf",2);const _=d.replace(/_planks$/,"");return r(`${d}_slab`,6)||r(`${_}_slab`,6)||r(`${d.replace(/s$/,"")}_slab`,6)}if(f===3&&h===2&&s.length===6){if(u[0].every(_=>_==="wheat")&&u[1].every(_=>_.endsWith("_planks")))return r("straw_bed",1);if(u[0][0].endsWith("_planks")&&u[0][1]==="stick"&&u[0][2].endsWith("_planks")&&u[1][0].endsWith("_planks")&&u[1][1]==="stick"&&u[1][2].endsWith("_planks")){const _=u[0][0].replace("_planks","");return r(`${_}_fence`,3)}if(p(d)&&d.endsWith("_planks")){const _=d.replace("_planks","");return r(`${_}_trapdoor`,2)}}if(f===3&&h===3&&s.length===6&&p(d)){const _=u[0][0]!==""&&u[0][1]===""&&u[0][2]===""&&u[1][0]!==""&&u[1][1]!==""&&u[1][2]===""&&u[2][0]!==""&&u[2][1]!==""&&u[2][2]!=="",m=u[0][0]===""&&u[0][1]===""&&u[0][2]!==""&&u[1][0]===""&&u[1][1]!==""&&u[1][2]!==""&&u[2][0]!==""&&u[2][1]!==""&&u[2][2]!=="";if(_||m){const g=d.replace(/_planks$/,"");return r(`${d}_stairs`,4)||r(`${g}_stairs`,4)||r(`${d.replace(/s$/,"")}_stairs`,4)}}if(f===3&&h===3&&s.length===8&&u[1][1]===""){if(p("cobblestone"))return r("furnace",1);if(p("_planks"))return r("chest",1)}for(const _ of Jr.getRecipes()){if(_.type!=="crafting")continue;let m=!0,g=0;for(const w of _.ingredients){if(s.filter(y=>y===w.id).length!==w.count){m=!1;break}g+=w.count}if(m&&g===s.length)return r(_.resultId,_.resultCount)}return null}consumeCraftingGrid(t){for(let e=0;e<t.length;e++){const n=t[e];n&&(n.count-=1,n.count<=0&&(t[e]=null))}}getStonecutterOutputs(){if(!this.stonecutterInput)return[];const t=this.stonecutterInput.item.shortId,e=[],n=(r,o)=>{if(r===t)return;const a=nt.getItem(r);a&&!e.some(c=>c.item.id===a.id)&&e.push({item:a,count:o})},s=t.replace(/_block$/,"").replace(/s$/,"");return n(`${t}_slab`,2),n(`${t}_stairs`,1),n(`${s}_slab`,2),n(`${s}_stairs`,1),n(`polished_${t}`,1),n(`polished_${t}_slab`,2),n(`polished_${t}_stairs`,1),n(`chiseled_${t}`,1),n(`chiseled_${s}`,1),t==="stone"&&(n("stone_bricks",1),n("stone_brick_slab",2),n("stone_brick_stairs",1),n("chiseled_stone_bricks",1)),e}addItem(t,e=1){const n=nt.getItem(t);if(!n)return!1;for(let s=0;s<this.slots.length;s++){const r=this.slots[s];if(r&&r.item.id===n.id&&r.count<n.maxStack){const o=n.maxStack-r.count,a=Math.min(o,e);if(r.count+=a,e-=a,e<=0)return!0}}for(let s=0;s<this.slots.length;s++)if(!this.slots[s]){const r=Math.min(n.maxStack,e);if(this.slots[s]={item:n,count:r},e-=r,e<=0)return!0}return!1}consumeHeld(t=1){const e=this.slots[this.selectedHotbarSlot];e&&(e.count-=t,e.count<=0&&(this.slots[this.selectedHotbarSlot]=null))}countItem(t){const e=nt.getItem(t);if(!e)return 0;let n=0;for(const s of this.slots)s&&s.item.id===e.id&&(n+=s.count);return n}removeIngredients(t){for(const e of t)if(this.countItem(e.id)<e.count)return!1;for(const e of t){const n=nt.getItem(e.id);let s=e.count;for(let r=0;r<this.slots.length&&s>0;r++){const o=this.slots[r];if(o&&o.item.id===n.id){const a=Math.min(o.count,s);o.count-=a,s-=a,o.count<=0&&(this.slots[r]=null)}}}return!0}static getRecipes(){return[{id:"poplar_planks",resultId:"poplar_planks",resultCount:4,ingredients:[{id:"poplar_log",count:1}],type:"crafting"},{id:"poplar_stairs",resultId:"poplar_stairs",resultCount:4,ingredients:[{id:"poplar_planks",count:6}],type:"crafting"},{id:"poplar_slab",resultId:"poplar_slab",resultCount:6,ingredients:[{id:"poplar_planks",count:3}],type:"crafting"},{id:"poplar_fence",resultId:"poplar_fence",resultCount:3,ingredients:[{id:"poplar_planks",count:4},{id:"stick",count:2}],type:"crafting"},{id:"poplar_shelf",resultId:"poplar_shelf",resultCount:2,ingredients:[{id:"poplar_slab",count:3}],type:"crafting"},{id:"poplar_boat",resultId:"poplar_boat",resultCount:1,ingredients:[{id:"poplar_planks",count:5}],type:"crafting"},{id:"straw_bed",resultId:"straw_bed",resultCount:1,ingredients:[{id:"wheat",count:3},{id:"poplar_planks",count:3}],type:"crafting"},{id:"orange_cushion",resultId:"orange_cushion",resultCount:1,ingredients:[{id:"orange_wool",count:2}],type:"crafting"},{id:"red_cushion",resultId:"red_cushion",resultCount:1,ingredients:[{id:"red_wool",count:2}],type:"crafting"},{id:"yellow_cushion",resultId:"yellow_cushion",resultCount:1,ingredients:[{id:"yellow_wool",count:2}],type:"crafting"},{id:"cyan_cushion",resultId:"cyan_cushion",resultCount:1,ingredients:[{id:"cyan_wool",count:2}],type:"crafting"},{id:"white_cushion",resultId:"white_cushion",resultCount:1,ingredients:[{id:"white_wool",count:2}],type:"crafting"},{id:"red_wool_stairs",resultId:"red_wool_stairs",resultCount:4,ingredients:[{id:"red_wool",count:6}],type:"crafting"},{id:"red_wool_slab",resultId:"red_wool_slab",resultCount:6,ingredients:[{id:"red_wool",count:3}],type:"crafting"},{id:"orange_wool_stairs",resultId:"orange_wool_stairs",resultCount:4,ingredients:[{id:"orange_wool",count:6}],type:"crafting"},{id:"white_wool_stairs",resultId:"white_wool_stairs",resultCount:4,ingredients:[{id:"white_wool",count:6}],type:"crafting"},{id:"cyan_concrete_stairs_sc",resultId:"cyan_concrete_stairs",resultCount:1,ingredients:[{id:"cyan_concrete",count:1}],type:"stonecutting"},{id:"cyan_concrete_slab_sc",resultId:"cyan_concrete_slab",resultCount:2,ingredients:[{id:"cyan_concrete",count:1}],type:"stonecutting"},{id:"white_concrete_stairs_sc",resultId:"white_concrete_stairs",resultCount:1,ingredients:[{id:"white_concrete",count:1}],type:"stonecutting"},{id:"white_concrete_slab_sc",resultId:"white_concrete_slab",resultCount:2,ingredients:[{id:"white_concrete",count:1}],type:"stonecutting"},{id:"orange_concrete_stairs_sc",resultId:"orange_concrete_stairs",resultCount:1,ingredients:[{id:"orange_concrete",count:1}],type:"stonecutting"},{id:"orange_concrete_slab_sc",resultId:"orange_concrete_slab",resultCount:2,ingredients:[{id:"orange_concrete",count:1}],type:"stonecutting"},{id:"red_concrete_stairs_sc",resultId:"red_concrete_stairs",resultCount:1,ingredients:[{id:"red_concrete",count:1}],type:"stonecutting"},{id:"red_concrete_slab_sc",resultId:"red_concrete_slab",resultCount:2,ingredients:[{id:"red_concrete",count:1}],type:"stonecutting"},{id:"stick",resultId:"stick",resultCount:4,ingredients:[{id:"poplar_planks",count:2}],type:"crafting"}]}}class u0{constructor(t,e,n){I(this,"camera");I(this,"world");I(this,"inventory");I(this,"position",new G(.5,75,.5));I(this,"velocity",new G(0,0,0));I(this,"yaw",0);I(this,"pitch",0);I(this,"gameMode","survival");I(this,"flying",!1);I(this,"onGround",!1);I(this,"inWater",!1);I(this,"isSprinting",!1);I(this,"isSneaking",!1);I(this,"health",20);I(this,"maxHealth",20);I(this,"hunger",20);I(this,"xpLevel",0);I(this,"xpProgress",0);I(this,"seatedCushion",null);I(this,"keys",new Set);I(this,"lastSpacePress",0);I(this,"lastWPress",0);I(this,"stepTimer",0);I(this,"walkBobPhase",0);I(this,"walkBobIntensity",0);I(this,"currentEyeHeight",1.62);I(this,"currentFovMultiplier",1);I(this,"swingProgress",0);I(this,"isSwinging",!1);I(this,"isMining",!1);I(this,"miningTargetKey","");I(this,"miningProgress",0);I(this,"miningHitSoundTimer",0);I(this,"creativeBreakCooldown",0);I(this,"highlightBox");I(this,"crackMesh");I(this,"lastCrackStage",-1);I(this,"currentHit",null);this.camera=t,this.world=e,this.inventory=n;const s=new j_(new we(1.003,1.003,1.003)),r=new jh({color:0,linewidth:2,transparent:!0,opacity:.45});this.highlightBox=new Z_(s,r),this.highlightBox.visible=!1,this.world.scene.add(this.highlightBox);const o=new we(1.005,1.005,1.005),a=new Ve({map:_e.texture,transparent:!0,opacity:.82,alphaTest:.05,depthWrite:!1,blending:Ka});this.crackMesh=new Qt(o,a),this.crackMesh.visible=!1,this.world.scene.add(this.crackMesh)}spawnAtWorldCenter(){let t=0,e=0,n=68;for(let s=0;s<=48;s+=4){let r=!1;for(const[o,a]of[[s,0],[-s,0],[0,s],[0,-s],[s,s],[-s,-s]]){const c=o>>4,l=a>>4;this.world.ensureChunk(c,l);const h=this.world.getTopSolidY(o,a),f=this.world.getBlock(o,h-1,a),u=this.world.getBlock(o,h,a),d=nt.getBlock(f),p=nt.getBlock(u);if(h>=63&&!d.fluid&&!p.fluid){t=o,e=a,n=h,r=!0;break}}if(r)break}this.position.set(t+.5,n+.001,e+.5),this.velocity.set(0,0,0),this.onGround=!0,this.seatedCushion=null,this.yaw=0,this.pitch=0,this.resetMining()}sitOnCushion(t){this.seatedCushion=t,this.position.set(t.x,t.blockY+.25,t.z),this.velocity.set(0,0,0),this.flying=!1,pe.play("entity.cushion.sit",.85)}dismountCushion(){this.seatedCushion&&(this.position.y=this.seatedCushion.blockY+.65,this.seatedCushion=null,pe.play("entity.cushion.get_up",.85))}triggerSwing(){this.isSwinging=!0,this.swingProgress=0}resetMining(){this.miningTargetKey="",this.miningProgress=0,this.miningHitSoundTimer=0,this.crackMesh.visible=!1,this.lastCrackStage=-1}updateCrackStageUVs(t){if(t<0||t>9){this.crackMesh.visible=!1,this.lastCrackStage=-1;return}if(this.crackMesh.visible=!0,t===this.lastCrackStage)return;this.lastCrackStage=t;const e=_e.getUV(`destroy_stage_${t}`),n=this.crackMesh.geometry.attributes.uv;for(let s=0;s<6;s++){const r=s*4;n.setXY(r+0,e.u0,e.v1),n.setXY(r+1,e.u1,e.v1),n.setXY(r+2,e.u0,e.v0),n.setXY(r+3,e.u1,e.v0)}n.needsUpdate=!0}getDestroySpeedPerSecond(t,e){if(this.gameMode==="creative")return 1e3;if(t.hardness<0)return 0;if(t.hardness===0)return 1e3;let n=null,s=!1;t.soundGroup==="stone"?(n="pickaxe",s=!0):t.soundGroup==="wood"?n="axe":(t.soundGroup==="grass"||t.soundGroup==="sand"||t.soundGroup==="gravel")&&(t.shortId.includes("leaves")||(n="shovel"));let r=1,o=!1;e&&e.toolType&&e.toolType===n?(r=e.toolSpeed||4,o=!0):e&&e.toolType==="sword"&&t.shortId.includes("leaves")&&(r=1.5);const a=!s||o,c=t.hardness*(a?1.5:5);let l=r/Math.max(.05,c);return this.inWater&&(l*=.25),!this.onGround&&!this.flying&&(l*=.25),l}getBlockHeight(t,e,n){const s=this.world.getBlock(t,e,n);if(s===0)return 0;const r=nt.getBlock(s);return r.solid?r.shape==="slab_bottom"||r.shape==="trapdoor"?(this.world.getMeta(t,e,n)&4)!==0?1:.5:r.shape==="bed_foot"||r.shape==="bed_head"||r.shape==="campfire"?.45:1:0}collidesAt(t,e,n){if(this.gameMode==="spectator")return!1;const s=.295,r=this.isSneaking?1.5:1.78,o=Math.floor(t-s),a=Math.floor(t+s),c=Math.floor(e),l=Math.floor(e+r),h=Math.floor(n-s),f=Math.floor(n+s);for(let u=c;u<=l;u++)for(let d=h;d<=f;d++)for(let p=o;p<=a;p++){const _=this.getBlockHeight(p,u,d);if(_>0&&e<u+_-1e-4&&e+r>u+1e-4)return!0}return!1}update(t,e){if(this.creativeBreakCooldown>0&&(this.creativeBreakCooldown=Math.max(0,this.creativeBreakCooldown-t)),this.isSwinging&&(this.swingProgress+=t*4.5,this.swingProgress>=1&&(this.swingProgress=0,this.isSwinging=!1)),this.seatedCushion&&e&&(this.keys.has("ShiftLeft")||this.keys.has("ShiftRight"))&&this.dismountCushion(),this.seatedCushion){this.position.set(this.seatedCushion.x,this.seatedCushion.blockY+.25,this.seatedCushion.z),this.updateCamera(t,!1),this.updateRaycast();return}let n=0,s=0;e&&((this.keys.has("KeyW")||this.keys.has("ArrowUp"))&&(n+=1),(this.keys.has("KeyS")||this.keys.has("ArrowDown"))&&(n-=1),(this.keys.has("KeyA")||this.keys.has("ArrowLeft"))&&(s-=1),(this.keys.has("KeyD")||this.keys.has("ArrowRight"))&&(s+=1));const r=Math.hypot(n,s);r>0&&(n/=r,s/=r),this.isSneaking=e&&!this.flying&&(this.keys.has("ShiftLeft")||this.keys.has("ShiftRight")),n<=0||this.isSneaking?this.isSprinting=!1:(this.keys.has("ControlLeft")||this.keys.has("KeyR"))&&(this.isSprinting=!0);let o=4.317;this.flying||this.gameMode==="spectator"?o=this.isSprinting?21.6:10.9:this.isSneaking?o=1.31:this.isSprinting&&(o=5.612);const a=Math.sin(this.yaw),c=Math.cos(this.yaw),l=(-a*n+c*s)*o,h=(-c*n-a*s)*o,f=this.world.getBlock(Math.floor(this.position.x),Math.floor(this.position.y+.35),Math.floor(this.position.z));if(this.inWater=nt.getBlock(f).fluid==="water",this.flying||this.gameMode==="spectator"){const S=Math.min(1,t*10);this.velocity.x+=(l-this.velocity.x)*S,this.velocity.z+=(h-this.velocity.z)*S;let M=0;e&&(this.keys.has("Space")&&(M+=7.5),(this.keys.has("ShiftLeft")||this.keys.has("ShiftRight"))&&(M-=7.5)),this.velocity.y+=(M-this.velocity.y)*Math.min(1,t*14)}else{const S=this.onGround?18:4.2,M=Math.min(1,t*S);this.velocity.x+=(l-this.velocity.x)*M,this.velocity.z+=(h-this.velocity.z)*M,this.inWater?(this.velocity.x*=Math.pow(.8,t*20),this.velocity.z*=Math.pow(.8,t*20),this.velocity.y-=6.5*t,this.velocity.y=Math.max(-3,this.velocity.y),e&&this.keys.has("Space")&&(this.velocity.y=4.2)):(this.velocity.y-=28*t,this.velocity.y=Math.max(-55,this.velocity.y),e&&this.keys.has("Space")&&this.onGround&&(this.velocity.y=8.45,this.onGround=!1,this.isSprinting&&n>0&&(this.velocity.x+=-a*1.45,this.velocity.z+=-c*1.45)))}const u=this.position.x,d=this.position.z;let p=this.velocity.x*t;if(this.isSneaking&&this.onGround)for(;Math.abs(p)>.001&&!this.collidesAt(this.position.x+p,this.position.y-.52,this.position.z);)p=Math.abs(p)<.02?0:p*.5;const _=this.position.x+p;this.collidesAt(_,this.position.y,this.position.z)?this.onGround&&!this.collidesAt(_,this.position.y+.52,this.position.z)&&this.collidesAt(_,this.position.y+.05,this.position.z)?(this.position.x=_,this.position.y=Math.floor(this.position.y)+.501):this.velocity.x=0:this.position.x=_;let m=this.velocity.z*t;if(this.isSneaking&&this.onGround)for(;Math.abs(m)>.001&&!this.collidesAt(this.position.x,this.position.y-.52,this.position.z+m);)m=Math.abs(m)<.02?0:m*.5;const g=this.position.z+m;this.collidesAt(this.position.x,this.position.y,g)?this.onGround&&!this.collidesAt(this.position.x,this.position.y+.52,g)&&this.collidesAt(this.position.x,this.position.y+.05,g)?(this.position.z=g,this.position.y=Math.floor(this.position.y)+.501):this.velocity.z=0:this.position.z=g;const w=this.velocity.y*t,E=this.position.y+w;if(!this.collidesAt(this.position.x,E,this.position.z))this.position.y=E,this.onGround=this.velocity.y<=0&&this.collidesAt(this.position.x,this.position.y-.015,this.position.z);else{if(this.velocity.y<0){let S=E,M=this.position.y;for(let R=0;R<8;R++){const v=(S+M)*.5;this.collidesAt(this.position.x,v,this.position.z)?S=v:M=v}this.position.y=M,this.onGround=!0,this.flying&&this.gameMode!=="spectator"&&(this.flying=!1)}this.velocity.y=0}const y=Math.hypot(this.position.x-u,this.position.z-d),b=this.onGround&&!this.flying&&y>5e-4;if(b){if(this.walkBobPhase+=y*3.6,this.walkBobIntensity+=(1-this.walkBobIntensity)*Math.min(1,t*10),this.stepTimer+=y,this.stepTimer>=(this.isSprinting?1.85:1.55)){this.stepTimer=0;const S=this.world.getBlock(Math.floor(this.position.x),Math.floor(this.position.y-.15),Math.floor(this.position.z));if(S!==0){const M=nt.getBlock(S);pe.playBlockSound(M.soundGroup,"step")}}}else this.walkBobIntensity*=Math.pow(.05,t);this.updateCamera(t,b),this.updateRaycast()}updateCamera(t,e){const n=this.seatedCushion?.95:this.isSneaking?1.27:1.62;this.currentEyeHeight+=(n-this.currentEyeHeight)*Math.min(1,t*16);const s=this.flying&&this.isSprinting?1.16:this.isSprinting||this.flying?1.1:1;this.currentFovMultiplier+=(s-this.currentFovMultiplier)*Math.min(1,t*10);const r=le.current.fov*this.currentFovMultiplier;Math.abs(this.camera.fov-r)>.05&&(this.camera.fov=r,this.camera.updateProjectionMatrix());const o=Math.sin(this.walkBobPhase)*.045*this.walkBobIntensity,a=-Math.abs(Math.cos(this.walkBobPhase))*.05*this.walkBobIntensity,c=new nn(0,0,0,"YXZ");c.x=this.pitch,c.y=this.yaw,this.camera.quaternion.setFromEuler(c);const l=new G(1,0,0).applyQuaternion(this.camera.quaternion);this.camera.position.set(this.position.x+l.x*o,this.position.y+this.currentEyeHeight+a,this.position.z+l.z*o)}updateRaycast(){const t=new G(0,0,-1).applyQuaternion(this.camera.quaternion).normalize(),e=this.camera.position.clone(),n=this.gameMode==="creative"?5.2:4.5,s=.025;let r=Math.floor(e.x),o=Math.floor(e.y),a=Math.floor(e.z);this.currentHit=null;for(let c=.05;c<=n;c+=s){const l=e.x+t.x*c,h=e.y+t.y*c,f=e.z+t.z*c,u=Math.floor(l),d=Math.floor(h),p=Math.floor(f),_=this.world.getBlock(u,d,p);if(_!==0){const m=nt.getBlock(_);if(m.shape!=="air"&&m.shape!=="fluid"){this.currentHit={bx:u,by:d,bz:p,nx:r-u,ny:o-d,nz:a-p,blockNumId:_,distance:c};break}}r=u,o=d,a=p}this.currentHit?(this.highlightBox.position.set(this.currentHit.bx+.5,this.currentHit.by+.5,this.currentHit.bz+.5),this.highlightBox.visible=!0,this.crackMesh.position.set(this.currentHit.bx+.5,this.currentHit.by+.5,this.currentHit.bz+.5)):(this.highlightBox.visible=!1,this.crackMesh.visible=!1)}getCardinalFacingMeta(){const t=new G(0,0,-1).applyQuaternion(this.camera.quaternion);return Math.abs(t.x)>Math.abs(t.z)?t.x>0?1:3:t.z>0?2:0}}/*! pako 2.2.0 https://github.com/nodeca/pako @license (MIT AND Zlib) */const d0=4,Pc=0,Dc=1,f0=2;function os(i){let t=i.length;for(;--t>=0;)i[t]=0}const p0=0,nu=1,m0=2,g0=3,_0=258,ll=29,Vs=256,Ds=Vs+1+ll,$i=30,cl=19,iu=2*Ds+1,fi=15,ka=16,v0=7,hl=256,su=16,ru=17,au=18,Oo=new Uint8Array([0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0]),Nr=new Uint8Array([0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13]),x0=new Uint8Array([0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,3,7]),ou=new Uint8Array([16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15]),y0=512,Rn=new Array((Ds+2)*2);os(Rn);const bs=new Array($i*2);os(bs);const Ls=new Array(y0);os(Ls);const Us=new Array(_0-g0+1);os(Us);const ul=new Array(ll);os(ul);const Xr=new Array($i);os(Xr);function Fa(i,t,e,n,s){this.static_tree=i,this.extra_bits=t,this.extra_base=e,this.elems=n,this.max_length=s,this.has_stree=i&&i.length}let lu,cu,hu;function Na(i,t){this.dyn_tree=i,this.max_code=0,this.stat_desc=t}const uu=i=>i<256?Ls[i]:Ls[256+(i>>>7)],ks=(i,t)=>{i.pending_buf[i.pending++]=t&255,i.pending_buf[i.pending++]=t>>>8&255},Ge=(i,t,e)=>{i.bi_valid>ka-e?(i.bi_buf|=t<<i.bi_valid&65535,ks(i,i.bi_buf),i.bi_buf=t>>ka-i.bi_valid,i.bi_valid+=e-ka):(i.bi_buf|=t<<i.bi_valid&65535,i.bi_valid+=e)},gn=(i,t,e)=>{Ge(i,e[t*2],e[t*2+1])},du=(i,t)=>{let e=0;do e|=i&1,i>>>=1,e<<=1;while(--t>0);return e>>>1},M0=i=>{i.bi_valid===16?(ks(i,i.bi_buf),i.bi_buf=0,i.bi_valid=0):i.bi_valid>=8&&(i.pending_buf[i.pending++]=i.bi_buf&255,i.bi_buf>>=8,i.bi_valid-=8)},S0=(i,t)=>{const e=t.dyn_tree,n=t.max_code,s=t.stat_desc.static_tree,r=t.stat_desc.has_stree,o=t.stat_desc.extra_bits,a=t.stat_desc.extra_base,c=t.stat_desc.max_length;let l,h,f,u,d,p,_=0;for(u=0;u<=fi;u++)i.bl_count[u]=0;for(e[i.heap[i.heap_max]*2+1]=0,l=i.heap_max+1;l<iu;l++)h=i.heap[l],u=e[e[h*2+1]*2+1]+1,u>c&&(u=c,_++),e[h*2+1]=u,!(h>n)&&(i.bl_count[u]++,d=0,h>=a&&(d=o[h-a]),p=e[h*2],i.opt_len+=p*(u+d),r&&(i.static_len+=p*(s[h*2+1]+d)));if(_!==0){do{for(u=c-1;i.bl_count[u]===0;)u--;i.bl_count[u]--,i.bl_count[u+1]+=2,i.bl_count[c]--,_-=2}while(_>0);for(u=c;u!==0;u--)for(h=i.bl_count[u];h!==0;)f=i.heap[--l],!(f>n)&&(e[f*2+1]!==u&&(i.opt_len+=(u-e[f*2+1])*e[f*2],e[f*2+1]=u),h--)}},fu=(i,t,e)=>{const n=new Array(fi+1);let s=0,r,o;for(r=1;r<=fi;r++)s=s+e[r-1]<<1,n[r]=s;for(o=0;o<=t;o++){let a=i[o*2+1];a!==0&&(i[o*2]=du(n[a]++,a))}},w0=()=>{let i,t,e,n,s;const r=new Array(fi+1);for(e=0,n=0;n<ll-1;n++)for(ul[n]=e,i=0;i<1<<Oo[n];i++)Us[e++]=n;for(Us[e-1]=n,s=0,n=0;n<16;n++)for(Xr[n]=s,i=0;i<1<<Nr[n];i++)Ls[s++]=n;for(s>>=7;n<$i;n++)for(Xr[n]=s<<7,i=0;i<1<<Nr[n]-7;i++)Ls[256+s++]=n;for(t=0;t<=fi;t++)r[t]=0;for(i=0;i<=143;)Rn[i*2+1]=8,i++,r[8]++;for(;i<=255;)Rn[i*2+1]=9,i++,r[9]++;for(;i<=279;)Rn[i*2+1]=7,i++,r[7]++;for(;i<=287;)Rn[i*2+1]=8,i++,r[8]++;for(fu(Rn,Ds+1,r),i=0;i<$i;i++)bs[i*2+1]=5,bs[i*2]=du(i,5);lu=new Fa(Rn,Oo,Vs+1,Ds,fi),cu=new Fa(bs,Nr,0,$i,fi),hu=new Fa(new Array(0),x0,0,cl,v0)},pu=i=>{let t;for(t=0;t<Ds;t++)i.dyn_ltree[t*2]=0;for(t=0;t<$i;t++)i.dyn_dtree[t*2]=0;for(t=0;t<cl;t++)i.bl_tree[t*2]=0;i.dyn_ltree[hl*2]=1,i.opt_len=i.static_len=0,i.sym_next=i.matches=0},mu=i=>{i.bi_valid>8?ks(i,i.bi_buf):i.bi_valid>0&&(i.pending_buf[i.pending++]=i.bi_buf),i.bi_buf=0,i.bi_valid=0},Lc=(i,t,e,n)=>{const s=t*2,r=e*2;return i[s]<i[r]||i[s]===i[r]&&n[t]<=n[e]},Ba=(i,t,e)=>{const n=i.heap[e];let s=e<<1;for(;s<=i.heap_len&&(s<i.heap_len&&Lc(t,i.heap[s+1],i.heap[s],i.depth)&&s++,!Lc(t,n,i.heap[s],i.depth));)i.heap[e]=i.heap[s],e=s,s<<=1;i.heap[e]=n},Uc=(i,t,e)=>{let n,s,r=0,o,a;if(i.sym_next!==0)do n=i.pending_buf[i.sym_buf+r++]&255,n+=(i.pending_buf[i.sym_buf+r++]&255)<<8,s=i.pending_buf[i.sym_buf+r++],n===0?gn(i,s,t):(o=Us[s],gn(i,o+Vs+1,t),a=Oo[o],a!==0&&(s-=ul[o],Ge(i,s,a)),n--,o=uu(n),gn(i,o,e),a=Nr[o],a!==0&&(n-=Xr[o],Ge(i,n,a)));while(r<i.sym_next);gn(i,hl,t)},zo=(i,t)=>{const e=t.dyn_tree,n=t.stat_desc.static_tree,s=t.stat_desc.has_stree,r=t.stat_desc.elems;let o,a,c=-1,l;for(i.heap_len=0,i.heap_max=iu,o=0;o<r;o++)e[o*2]!==0?(i.heap[++i.heap_len]=c=o,i.depth[o]=0):e[o*2+1]=0;for(;i.heap_len<2;)l=i.heap[++i.heap_len]=c<2?++c:0,e[l*2]=1,i.depth[l]=0,i.opt_len--,s&&(i.static_len-=n[l*2+1]);for(t.max_code=c,o=i.heap_len>>1;o>=1;o--)Ba(i,e,o);l=r;do o=i.heap[1],i.heap[1]=i.heap[i.heap_len--],Ba(i,e,1),a=i.heap[1],i.heap[--i.heap_max]=o,i.heap[--i.heap_max]=a,e[l*2]=e[o*2]+e[a*2],i.depth[l]=(i.depth[o]>=i.depth[a]?i.depth[o]:i.depth[a])+1,e[o*2+1]=e[a*2+1]=l,i.heap[1]=l++,Ba(i,e,1);while(i.heap_len>=2);i.heap[--i.heap_max]=i.heap[1],S0(i,t),fu(e,c,i.bl_count)},kc=(i,t,e)=>{let n,s=-1,r,o=t[1],a=0,c=7,l=4;for(o===0&&(c=138,l=3),t[(e+1)*2+1]=65535,n=0;n<=e;n++)r=o,o=t[(n+1)*2+1],!(++a<c&&r===o)&&(a<l?i.bl_tree[r*2]+=a:r!==0?(r!==s&&i.bl_tree[r*2]++,i.bl_tree[su*2]++):a<=10?i.bl_tree[ru*2]++:i.bl_tree[au*2]++,a=0,s=r,o===0?(c=138,l=3):r===o?(c=6,l=3):(c=7,l=4))},Fc=(i,t,e)=>{let n,s=-1,r,o=t[1],a=0,c=7,l=4;for(o===0&&(c=138,l=3),n=0;n<=e;n++)if(r=o,o=t[(n+1)*2+1],!(++a<c&&r===o)){if(a<l)do gn(i,r,i.bl_tree);while(--a!==0);else r!==0?(r!==s&&(gn(i,r,i.bl_tree),a--),gn(i,su,i.bl_tree),Ge(i,a-3,2)):a<=10?(gn(i,ru,i.bl_tree),Ge(i,a-3,3)):(gn(i,au,i.bl_tree),Ge(i,a-11,7));a=0,s=r,o===0?(c=138,l=3):r===o?(c=6,l=3):(c=7,l=4)}},b0=i=>{let t;for(kc(i,i.dyn_ltree,i.l_desc.max_code),kc(i,i.dyn_dtree,i.d_desc.max_code),zo(i,i.bl_desc),t=cl-1;t>=3&&i.bl_tree[ou[t]*2+1]===0;t--);return i.opt_len+=3*(t+1)+5+5+4,t},E0=(i,t,e,n)=>{let s;for(Ge(i,t-257,5),Ge(i,e-1,5),Ge(i,n-4,4),s=0;s<n;s++)Ge(i,i.bl_tree[ou[s]*2+1],3);Fc(i,i.dyn_ltree,t-1),Fc(i,i.dyn_dtree,e-1)},T0=i=>{let t=4093624447,e;for(e=0;e<=31;e++,t>>>=1)if(t&1&&i.dyn_ltree[e*2]!==0)return Pc;if(i.dyn_ltree[18]!==0||i.dyn_ltree[20]!==0||i.dyn_ltree[26]!==0)return Dc;for(e=32;e<Vs;e++)if(i.dyn_ltree[e*2]!==0)return Dc;return Pc};let Nc=!1;const A0=i=>{Nc||(w0(),Nc=!0),i.l_desc=new Na(i.dyn_ltree,lu),i.d_desc=new Na(i.dyn_dtree,cu),i.bl_desc=new Na(i.bl_tree,hu),i.bi_buf=0,i.bi_valid=0,pu(i)},gu=(i,t,e,n)=>{Ge(i,(p0<<1)+(n?1:0),3),mu(i),ks(i,e),ks(i,~e),e&&i.pending_buf.set(i.window.subarray(t,t+e),i.pending),i.pending+=e},C0=i=>{Ge(i,nu<<1,3),gn(i,hl,Rn),M0(i)},R0=(i,t,e,n)=>{let s,r,o=0;i.level>0?(i.strm.data_type===f0&&(i.strm.data_type=T0(i)),zo(i,i.l_desc),zo(i,i.d_desc),o=b0(i),s=i.opt_len+3+7>>>3,r=i.static_len+3+7>>>3,r<=s&&(s=r)):s=r=e+5,e+4<=s&&t!==-1?gu(i,t,e,n):i.strategy===d0||r===s?(Ge(i,(nu<<1)+(n?1:0),3),Uc(i,Rn,bs)):(Ge(i,(m0<<1)+(n?1:0),3),E0(i,i.l_desc.max_code+1,i.d_desc.max_code+1,o+1),Uc(i,i.dyn_ltree,i.dyn_dtree)),pu(i),n&&mu(i)},I0=(i,t,e)=>(i.pending_buf[i.sym_buf+i.sym_next++]=t,i.pending_buf[i.sym_buf+i.sym_next++]=t>>8,i.pending_buf[i.sym_buf+i.sym_next++]=e,t===0?i.dyn_ltree[e*2]++:(i.matches++,t--,i.dyn_ltree[(Us[e]+Vs+1)*2]++,i.dyn_dtree[uu(t)*2]++),i.sym_next===i.sym_end);var P0=A0,D0=gu,L0=R0,U0=I0,k0=C0,F0={_tr_init:P0,_tr_stored_block:D0,_tr_flush_block:L0,_tr_tally:U0,_tr_align:k0};const N0=(i,t,e,n)=>{let s=i&65535|0,r=i>>>16&65535|0,o=0;for(;e!==0;){o=e>2e3?2e3:e,e-=o;do s=s+t[n++]|0,r=r+s|0;while(--o);s%=65521,r%=65521}return s|r<<16|0};var Fs=N0;const B0=()=>{let i,t=[];for(var e=0;e<256;e++){i=e;for(var n=0;n<8;n++)i=i&1?3988292384^i>>>1:i>>>1;t[e]=i}return t},O0=new Uint32Array(B0()),z0=(i,t,e,n)=>{const s=O0,r=n+e;i^=-1;for(let o=n;o<r;o++)i=i>>>8^s[(i^t[o])&255];return i^-1};var Se=z0,vi={2:"need dictionary",1:"stream end",0:"","-1":"file error","-2":"stream error","-3":"data error","-4":"insufficient memory","-5":"buffer error","-6":"incompatible version"},Ws={Z_NO_FLUSH:0,Z_PARTIAL_FLUSH:1,Z_SYNC_FLUSH:2,Z_FULL_FLUSH:3,Z_FINISH:4,Z_BLOCK:5,Z_TREES:6,Z_OK:0,Z_STREAM_END:1,Z_NEED_DICT:2,Z_ERRNO:-1,Z_STREAM_ERROR:-2,Z_DATA_ERROR:-3,Z_MEM_ERROR:-4,Z_BUF_ERROR:-5,Z_NO_COMPRESSION:0,Z_BEST_SPEED:1,Z_BEST_COMPRESSION:9,Z_DEFAULT_COMPRESSION:-1,Z_FILTERED:1,Z_HUFFMAN_ONLY:2,Z_RLE:3,Z_FIXED:4,Z_DEFAULT_STRATEGY:0,Z_BINARY:0,Z_TEXT:1,Z_UNKNOWN:2,Z_DEFLATED:8};const{_tr_init:H0,_tr_stored_block:Ho,_tr_flush_block:G0,_tr_tally:Kn,_tr_align:V0}=F0,{Z_NO_FLUSH:jn,Z_PARTIAL_FLUSH:W0,Z_FULL_FLUSH:X0,Z_FINISH:tn,Z_BLOCK:Bc,Z_OK:Ee,Z_STREAM_END:Oc,Z_STREAM_ERROR:vn,Z_DATA_ERROR:$0,Z_BUF_ERROR:Oa,Z_DEFAULT_COMPRESSION:Y0,Z_FILTERED:q0,Z_HUFFMAN_ONLY:br,Z_RLE:Z0,Z_FIXED:K0,Z_DEFAULT_STRATEGY:j0,Z_UNKNOWN:J0,Z_DEFLATED:Qr}=Ws,Q0=9,tv=15,ev=8,nv=29,iv=256,Go=iv+1+nv,sv=30,rv=19,av=2*Go+1,ov=15,$t=3,$n=258,xn=$n+$t+1,lv=32,es=42,dl=57,Vo=69,Wo=73,Xo=91,$o=103,pi=113,Ss=666,Le=1,ls=2,xi=3,cs=4,cv=3,mi=(i,t)=>(i.msg=vi[t],t),zc=i=>i*2-(i>4?9:0),Xn=i=>{let t=i.length;for(;--t>=0;)i[t]=0},hv=i=>{let t,e,n,s=i.w_size;t=i.hash_size,n=t;do e=i.head[--n],i.head[n]=e>=s?e-s:0;while(--t);t=s,n=t;do e=i.prev[--n],i.prev[n]=e>=s?e-s:0;while(--t)};let fl=(i,t,e)=>(t<<i.hash_shift^e)&i.hash_mask;const yi=(i,t)=>{let e;if(i.legacy_hash)e=i.ins_h=fl(i,i.ins_h,i.window[t+$t-1]);else{const s=i.window,r=s[t]|s[t+1]<<8|s[t+2]<<16|s[t+3]<<24;e=i.ins_h=Math.imul(r,66521)+66521>>>16&i.hash_mask}const n=i.prev[t&i.w_mask]=i.head[e];return i.head[e]=t,n},Ye=i=>{const t=i.state;let e=t.pending;e>i.avail_out&&(e=i.avail_out),e!==0&&(i.output.set(t.pending_buf.subarray(t.pending_out,t.pending_out+e),i.next_out),i.next_out+=e,t.pending_out+=e,i.total_out+=e,i.avail_out-=e,t.pending-=e,t.pending===0&&(t.pending_out=0))},Ze=(i,t)=>{G0(i,i.block_start>=0?i.block_start:-1,i.strstart-i.block_start,t),i.block_start=i.strstart,Ye(i.strm)},Yt=(i,t)=>{i.pending_buf[i.pending++]=t},xs=(i,t)=>{i.pending_buf[i.pending++]=t>>>8&255,i.pending_buf[i.pending++]=t&255},Yo=(i,t,e,n)=>{let s=i.avail_in;return s>n&&(s=n),s===0?0:(i.avail_in-=s,t.set(i.input.subarray(i.next_in,i.next_in+s),e),i.state.wrap===1?i.adler=Fs(i.adler,t,s,e):i.state.wrap===2&&(i.adler=Se(i.adler,t,s,e)),i.next_in+=s,i.total_in+=s,s)},_u=(i,t)=>{let e=i.max_chain_length,n=i.strstart,s,r,o=i.prev_length,a=i.nice_match;const c=i.strstart>i.w_size-xn?i.strstart-(i.w_size-xn):0,l=i.window,h=i.w_mask,f=i.prev,u=i.strstart+$n;let d=l[n+o-1],p=l[n+o];i.prev_length>=i.good_match&&(e>>=2),a>i.lookahead&&(a=i.lookahead);do if(s=t,!(l[s+o]!==p||l[s+o-1]!==d||l[s]!==l[n]||l[++s]!==l[n+1])){n+=2,s++;do;while(l[++n]===l[++s]&&l[++n]===l[++s]&&l[++n]===l[++s]&&l[++n]===l[++s]&&l[++n]===l[++s]&&l[++n]===l[++s]&&l[++n]===l[++s]&&l[++n]===l[++s]&&n<u);if(r=$n-(u-n),n=u-$n,r>o){if(i.match_start=t,o=r,r>=a)break;d=l[n+o-1],p=l[n+o]}}while((t=f[t&h])>c&&--e!==0);return o<=i.lookahead?o:i.lookahead},ns=i=>{const t=i.w_size;let e,n,s;do{if(n=i.window_size-i.lookahead-i.strstart,i.strstart>=t+(t-xn)&&(i.window.set(i.window.subarray(t,t+t-n),0),i.match_start-=t,i.strstart-=t,i.block_start-=t,i.insert>i.strstart&&(i.insert=i.strstart),hv(i),n+=t),i.strm.avail_in===0)break;if(e=Yo(i.strm,i.window,i.strstart+i.lookahead,n),i.lookahead+=e,i.legacy_hash){if(i.lookahead+i.insert>=$t)for(s=i.strstart-i.insert,i.ins_h=i.window[s],i.ins_h=fl(i,i.ins_h,i.window[s+1]);i.insert&&(yi(i,s),s++,i.insert--,!(i.lookahead+i.insert<$t)););}else if(i.lookahead+i.insert>$t)for(s=i.strstart-i.insert;i.insert&&(yi(i,s),s++,i.insert--,!(i.lookahead+i.insert<=$t)););}while(i.lookahead<xn&&i.strm.avail_in!==0)},vu=(i,t)=>{let e=i.pending_buf_size-5>i.w_size?i.w_size:i.pending_buf_size-5,n,s,r,o=0,a=i.strm.avail_in;do{if(n=65535,r=i.bi_valid+42>>3,i.strm.avail_out<r||(r=i.strm.avail_out-r,s=i.strstart-i.block_start,n>s+i.strm.avail_in&&(n=s+i.strm.avail_in),n>r&&(n=r),n<e&&(n===0&&t!==tn||t===jn||n!==s+i.strm.avail_in)))break;o=t===tn&&n===s+i.strm.avail_in?1:0,Ho(i,0,0,o),i.pending_buf[i.pending-4]=n,i.pending_buf[i.pending-3]=n>>8,i.pending_buf[i.pending-2]=~n,i.pending_buf[i.pending-1]=~n>>8,Ye(i.strm),s&&(s>n&&(s=n),i.strm.output.set(i.window.subarray(i.block_start,i.block_start+s),i.strm.next_out),i.strm.next_out+=s,i.strm.avail_out-=s,i.strm.total_out+=s,i.block_start+=s,n-=s),n&&(Yo(i.strm,i.strm.output,i.strm.next_out,n),i.strm.next_out+=n,i.strm.avail_out-=n,i.strm.total_out+=n)}while(o===0);return a-=i.strm.avail_in,a&&(a>=i.w_size?(i.matches=2,i.window.set(i.strm.input.subarray(i.strm.next_in-i.w_size,i.strm.next_in),0),i.strstart=i.w_size,i.insert=i.strstart):(i.window_size-i.strstart<=a&&(i.strstart-=i.w_size,i.window.set(i.window.subarray(i.w_size,i.w_size+i.strstart),0),i.matches<2&&i.matches++,i.insert>i.strstart&&(i.insert=i.strstart)),i.window.set(i.strm.input.subarray(i.strm.next_in-a,i.strm.next_in),i.strstart),i.strstart+=a,i.insert+=a>i.w_size-i.insert?i.w_size-i.insert:a),i.block_start=i.strstart),i.high_water<i.strstart&&(i.high_water=i.strstart),o?cs:t!==jn&&t!==tn&&i.strm.avail_in===0&&i.strstart===i.block_start?ls:(r=i.window_size-i.strstart,i.strm.avail_in>r&&i.block_start>=i.w_size&&(i.block_start-=i.w_size,i.strstart-=i.w_size,i.window.set(i.window.subarray(i.w_size,i.w_size+i.strstart),0),i.matches<2&&i.matches++,r+=i.w_size,i.insert>i.strstart&&(i.insert=i.strstart)),r>i.strm.avail_in&&(r=i.strm.avail_in),r&&(Yo(i.strm,i.window,i.strstart,r),i.strstart+=r,i.insert+=r>i.w_size-i.insert?i.w_size-i.insert:r),i.high_water<i.strstart&&(i.high_water=i.strstart),r=i.bi_valid+42>>3,r=i.pending_buf_size-r>65535?65535:i.pending_buf_size-r,e=r>i.w_size?i.w_size:r,s=i.strstart-i.block_start,(s>=e||(s||t===tn)&&t!==jn&&i.strm.avail_in===0&&s<=r)&&(n=s>r?r:s,o=t===tn&&i.strm.avail_in===0&&n===s?1:0,Ho(i,i.block_start,n,o),i.block_start+=n,Ye(i.strm)),o?xi:Le)},za=(i,t)=>{let e,n;for(;;){if(i.lookahead<xn){if(ns(i),i.lookahead<xn&&t===jn)return Le;if(i.lookahead===0)break}if(e=0,i.lookahead>=$t&&(e=yi(i,i.strstart)),e!==0&&i.strstart-e<=i.w_size-xn&&(i.match_length=_u(i,e)),i.match_length>=$t)if(n=Kn(i,i.strstart-i.match_start,i.match_length-$t),i.lookahead-=i.match_length,i.match_length<=i.max_lazy_match&&i.lookahead>=$t){i.match_length--;do i.strstart++,e=yi(i,i.strstart);while(--i.match_length!==0);i.strstart++}else i.strstart+=i.match_length,i.match_length=0,i.legacy_hash&&(i.ins_h=i.window[i.strstart],i.ins_h=fl(i,i.ins_h,i.window[i.strstart+1]));else n=Kn(i,0,i.window[i.strstart]),i.lookahead--,i.strstart++;if(n&&(Ze(i,!1),i.strm.avail_out===0))return Le}return i.insert=i.strstart<$t-1?i.strstart:$t-1,t===tn?(Ze(i,!0),i.strm.avail_out===0?xi:cs):i.sym_next&&(Ze(i,!1),i.strm.avail_out===0)?Le:ls},Oi=(i,t)=>{let e,n,s;for(;;){if(i.lookahead<xn){if(ns(i),i.lookahead<xn&&t===jn)return Le;if(i.lookahead===0)break}if(e=0,i.lookahead>=$t&&(e=yi(i,i.strstart)),i.prev_length=i.match_length,i.prev_match=i.match_start,i.match_length=$t-1,e!==0&&i.prev_length<i.max_lazy_match&&i.strstart-e<=i.w_size-xn&&(i.match_length=_u(i,e),i.match_length<=5&&(i.strategy===q0||i.match_length===$t&&i.strstart-i.match_start>4096)&&(i.match_length=$t-1)),i.prev_length>=$t&&i.match_length<=i.prev_length){s=i.strstart+i.lookahead-$t,n=Kn(i,i.strstart-1-i.prev_match,i.prev_length-$t),i.lookahead-=i.prev_length-1,i.prev_length-=2;do++i.strstart<=s&&(e=yi(i,i.strstart));while(--i.prev_length!==0);if(i.match_available=0,i.match_length=$t-1,i.strstart++,n&&(Ze(i,!1),i.strm.avail_out===0))return Le}else if(i.match_available){if(n=Kn(i,0,i.window[i.strstart-1]),n&&Ze(i,!1),i.strstart++,i.lookahead--,i.strm.avail_out===0)return Le}else i.match_available=1,i.strstart++,i.lookahead--}return i.match_available&&(n=Kn(i,0,i.window[i.strstart-1]),i.match_available=0),i.insert=i.strstart<$t-1?i.strstart:$t-1,t===tn?(Ze(i,!0),i.strm.avail_out===0?xi:cs):i.sym_next&&(Ze(i,!1),i.strm.avail_out===0)?Le:ls},uv=(i,t)=>{let e,n,s,r;const o=i.window;for(;;){if(i.lookahead<=$n){if(ns(i),i.lookahead<=$n&&t===jn)return Le;if(i.lookahead===0)break}if(i.match_length=0,i.lookahead>=$t&&i.strstart>0&&(s=i.strstart-1,n=o[s],n===o[++s]&&n===o[++s]&&n===o[++s])){r=i.strstart+$n;do;while(n===o[++s]&&n===o[++s]&&n===o[++s]&&n===o[++s]&&n===o[++s]&&n===o[++s]&&n===o[++s]&&n===o[++s]&&s<r);i.match_length=$n-(r-s),i.match_length>i.lookahead&&(i.match_length=i.lookahead)}if(i.match_length>=$t?(e=Kn(i,1,i.match_length-$t),i.lookahead-=i.match_length,i.strstart+=i.match_length,i.match_length=0):(e=Kn(i,0,i.window[i.strstart]),i.lookahead--,i.strstart++),e&&(Ze(i,!1),i.strm.avail_out===0))return Le}return i.insert=0,t===tn?(Ze(i,!0),i.strm.avail_out===0?xi:cs):i.sym_next&&(Ze(i,!1),i.strm.avail_out===0)?Le:ls},dv=(i,t)=>{let e;for(;;){if(i.lookahead===0&&(ns(i),i.lookahead===0)){if(t===jn)return Le;break}if(i.match_length=0,e=Kn(i,0,i.window[i.strstart]),i.lookahead--,i.strstart++,e&&(Ze(i,!1),i.strm.avail_out===0))return Le}return i.insert=0,t===tn?(Ze(i,!0),i.strm.avail_out===0?xi:cs):i.sym_next&&(Ze(i,!1),i.strm.avail_out===0)?Le:ls};function fn(i,t,e,n,s){this.good_length=i,this.max_lazy=t,this.nice_length=e,this.max_chain=n,this.func=s}const ws=[new fn(0,0,0,0,vu),new fn(4,4,8,4,za),new fn(4,5,16,8,za),new fn(4,6,32,32,za),new fn(4,4,16,16,Oi),new fn(8,16,32,32,Oi),new fn(8,16,128,128,Oi),new fn(8,32,128,256,Oi),new fn(32,128,258,1024,Oi),new fn(32,258,258,4096,Oi)],fv=i=>{i.window_size=2*i.w_size,Xn(i.head),i.max_lazy_match=ws[i.level].max_lazy,i.good_match=ws[i.level].good_length,i.nice_match=ws[i.level].nice_length,i.max_chain_length=ws[i.level].max_chain,i.strstart=0,i.block_start=0,i.lookahead=0,i.insert=0,i.match_length=i.prev_length=$t-1,i.match_available=0,i.ins_h=0};function pv(){this.strm=null,this.status=0,this.pending_buf=null,this.pending_buf_size=0,this.pending_out=0,this.pending=0,this.wrap=0,this.gzhead=null,this.gzindex=0,this.method=Qr,this.last_flush=-1,this.w_size=0,this.w_bits=0,this.w_mask=0,this.window=null,this.window_size=0,this.prev=null,this.head=null,this.ins_h=0,this.legacy_hash=0,this.hash_size=0,this.hash_bits=0,this.hash_mask=0,this.hash_shift=0,this.block_start=0,this.match_length=0,this.prev_match=0,this.match_available=0,this.strstart=0,this.match_start=0,this.lookahead=0,this.prev_length=0,this.max_chain_length=0,this.max_lazy_match=0,this.level=0,this.strategy=0,this.good_match=0,this.nice_match=0,this.dyn_ltree=new Uint16Array(av*2),this.dyn_dtree=new Uint16Array((2*sv+1)*2),this.bl_tree=new Uint16Array((2*rv+1)*2),Xn(this.dyn_ltree),Xn(this.dyn_dtree),Xn(this.bl_tree),this.l_desc=null,this.d_desc=null,this.bl_desc=null,this.bl_count=new Uint16Array(ov+1),this.heap=new Uint16Array(2*Go+1),Xn(this.heap),this.heap_len=0,this.heap_max=0,this.depth=new Uint16Array(2*Go+1),Xn(this.depth),this.sym_buf=0,this.lit_bufsize=0,this.sym_next=0,this.sym_end=0,this.opt_len=0,this.static_len=0,this.matches=0,this.insert=0,this.bi_buf=0,this.bi_valid=0}const Xs=i=>{if(!i)return 1;const t=i.state;return!t||t.strm!==i||t.status!==es&&t.status!==dl&&t.status!==Vo&&t.status!==Wo&&t.status!==Xo&&t.status!==$o&&t.status!==pi&&t.status!==Ss?1:0},xu=i=>{if(Xs(i))return mi(i,vn);i.total_in=i.total_out=0,i.data_type=J0;const t=i.state;return t.pending=0,t.pending_out=0,t.wrap<0&&(t.wrap=-t.wrap),t.status=t.wrap===2?dl:t.wrap?es:pi,i.adler=t.wrap===2?0:1,t.last_flush=-2,H0(t),Ee},yu=i=>{const t=xu(i);return t===Ee&&fv(i.state),t},mv=(i,t)=>Xs(i)||i.state.wrap!==2?vn:(i.state.gzhead=t,Ee),Mu=(i,t,e,n,s,r,o)=>{if(!i)return vn;let a=1;if(t===Y0&&(t=6),n<0?(a=0,n=-n):n>15&&(a=2,n-=16),s<1||s>Q0||e!==Qr||n<8||n>15||t<0||t>9||r<0||r>K0||n===8&&a!==1)return mi(i,vn);n===8&&(n=9);const c=new pv;return i.state=c,c.strm=i,c.status=es,c.wrap=a,c.gzhead=null,c.w_bits=n,c.w_size=1<<c.w_bits,c.w_mask=c.w_size-1,c.legacy_hash=o?1:0,c.hash_bits=s+7,!c.legacy_hash&&c.hash_bits<15&&(c.hash_bits=15),c.hash_size=1<<c.hash_bits,c.hash_mask=c.hash_size-1,c.hash_shift=~~((c.hash_bits+$t-1)/$t),c.window=new Uint8Array(c.w_size*2),c.head=new Uint16Array(c.hash_size),c.prev=new Uint16Array(c.w_size),c.lit_bufsize=1<<s+6,c.pending_buf_size=c.lit_bufsize*4,c.pending_buf=new Uint8Array(c.pending_buf_size),c.sym_buf=c.lit_bufsize,c.sym_end=(c.lit_bufsize-1)*3,c.level=t,c.strategy=r,c.method=e,yu(i)},gv=(i,t)=>Mu(i,t,Qr,tv,ev,j0),_v=(i,t)=>{if(Xs(i)||t>Bc||t<0)return i?mi(i,vn):vn;const e=i.state;if(!i.output||i.avail_in!==0&&!i.input||e.status===Ss&&t!==tn)return mi(i,i.avail_out===0?Oa:vn);const n=e.last_flush;if(e.last_flush=t,e.pending!==0){if(Ye(i),i.avail_out===0)return e.last_flush=-1,Ee}else if(i.avail_in===0&&zc(t)<=zc(n)&&t!==tn)return mi(i,Oa);if(e.status===Ss&&i.avail_in!==0)return mi(i,Oa);if(e.status===es&&e.wrap===0&&(e.status=pi),e.status===es){let s=Qr+(e.w_bits-8<<4)<<8,r=-1;if(e.strategy>=br||e.level<2?r=0:e.level<6?r=1:e.level===6?r=2:r=3,s|=r<<6,e.strstart!==0&&(s|=lv),s+=31-s%31,xs(e,s),e.strstart!==0&&(xs(e,i.adler>>>16),xs(e,i.adler&65535)),i.adler=1,e.status=pi,Ye(i),e.pending!==0)return e.last_flush=-1,Ee}if(e.status===dl){if(i.adler=0,Yt(e,31),Yt(e,139),Yt(e,8),e.gzhead)Yt(e,(e.gzhead.text?1:0)+(e.gzhead.hcrc?2:0)+(e.gzhead.extra?4:0)+(e.gzhead.name?8:0)+(e.gzhead.comment?16:0)),Yt(e,e.gzhead.time&255),Yt(e,e.gzhead.time>>8&255),Yt(e,e.gzhead.time>>16&255),Yt(e,e.gzhead.time>>24&255),Yt(e,e.level===9?2:e.strategy>=br||e.level<2?4:0),Yt(e,e.gzhead.os&255),e.gzhead.extra&&e.gzhead.extra.length&&(Yt(e,e.gzhead.extra.length&255),Yt(e,e.gzhead.extra.length>>8&255)),e.gzhead.hcrc&&(i.adler=Se(i.adler,e.pending_buf,e.pending,0)),e.gzindex=0,e.status=Vo;else if(Yt(e,0),Yt(e,0),Yt(e,0),Yt(e,0),Yt(e,0),Yt(e,e.level===9?2:e.strategy>=br||e.level<2?4:0),Yt(e,cv),e.status=pi,Ye(i),e.pending!==0)return e.last_flush=-1,Ee}if(e.status===Vo){if(e.gzhead.extra){let s=e.pending,r=(e.gzhead.extra.length&65535)-e.gzindex;for(;e.pending+r>e.pending_buf_size;){let a=e.pending_buf_size-e.pending;if(e.pending_buf.set(e.gzhead.extra.subarray(e.gzindex,e.gzindex+a),e.pending),e.pending=e.pending_buf_size,e.gzhead.hcrc&&e.pending>s&&(i.adler=Se(i.adler,e.pending_buf,e.pending-s,s)),e.gzindex+=a,Ye(i),e.pending!==0)return e.last_flush=-1,Ee;s=0,r-=a}let o=new Uint8Array(e.gzhead.extra);e.pending_buf.set(o.subarray(e.gzindex,e.gzindex+r),e.pending),e.pending+=r,e.gzhead.hcrc&&e.pending>s&&(i.adler=Se(i.adler,e.pending_buf,e.pending-s,s)),e.gzindex=0}e.status=Wo}if(e.status===Wo){if(e.gzhead.name){let s=e.pending,r;do{if(e.pending===e.pending_buf_size){if(e.gzhead.hcrc&&e.pending>s&&(i.adler=Se(i.adler,e.pending_buf,e.pending-s,s)),Ye(i),e.pending!==0)return e.last_flush=-1,Ee;s=0}e.gzindex<e.gzhead.name.length?r=e.gzhead.name.charCodeAt(e.gzindex++)&255:r=0,Yt(e,r)}while(r!==0);e.gzhead.hcrc&&e.pending>s&&(i.adler=Se(i.adler,e.pending_buf,e.pending-s,s)),e.gzindex=0}e.status=Xo}if(e.status===Xo){if(e.gzhead.comment){let s=e.pending,r;do{if(e.pending===e.pending_buf_size){if(e.gzhead.hcrc&&e.pending>s&&(i.adler=Se(i.adler,e.pending_buf,e.pending-s,s)),Ye(i),e.pending!==0)return e.last_flush=-1,Ee;s=0}e.gzindex<e.gzhead.comment.length?r=e.gzhead.comment.charCodeAt(e.gzindex++)&255:r=0,Yt(e,r)}while(r!==0);e.gzhead.hcrc&&e.pending>s&&(i.adler=Se(i.adler,e.pending_buf,e.pending-s,s))}e.status=$o}if(e.status===$o){if(e.gzhead.hcrc){if(e.pending+2>e.pending_buf_size&&(Ye(i),e.pending!==0))return e.last_flush=-1,Ee;Yt(e,i.adler&255),Yt(e,i.adler>>8&255),i.adler=0}if(e.status=pi,Ye(i),e.pending!==0)return e.last_flush=-1,Ee}if(i.avail_in!==0||e.lookahead!==0||t!==jn&&e.status!==Ss){let s=e.level===0?vu(e,t):e.strategy===br?dv(e,t):e.strategy===Z0?uv(e,t):ws[e.level].func(e,t);if((s===xi||s===cs)&&(e.status=Ss),s===Le||s===xi)return i.avail_out===0&&(e.last_flush=-1),Ee;if(s===ls&&(t===W0?V0(e):t!==Bc&&(Ho(e,0,0,!1),t===X0&&(Xn(e.head),e.lookahead===0&&(e.strstart=0,e.block_start=0,e.insert=0))),Ye(i),i.avail_out===0))return e.last_flush=-1,Ee}return t!==tn?Ee:e.wrap<=0?Oc:(e.wrap===2?(Yt(e,i.adler&255),Yt(e,i.adler>>8&255),Yt(e,i.adler>>16&255),Yt(e,i.adler>>24&255),Yt(e,i.total_in&255),Yt(e,i.total_in>>8&255),Yt(e,i.total_in>>16&255),Yt(e,i.total_in>>24&255)):(xs(e,i.adler>>>16),xs(e,i.adler&65535)),Ye(i),e.wrap>0&&(e.wrap=-e.wrap),e.pending!==0?Ee:Oc)},vv=i=>{if(Xs(i))return vn;const t=i.state.status;return i.state=null,t===pi?mi(i,$0):Ee},xv=(i,t)=>{let e=t.length;if(Xs(i))return vn;const n=i.state,s=n.wrap;if(s===2||s===1&&n.status!==es||n.lookahead)return vn;if(s===1&&(i.adler=Fs(i.adler,t,e,0)),n.wrap=0,e>=n.w_size){s===0&&(Xn(n.head),n.strstart=0,n.block_start=0,n.insert=0);let c=new Uint8Array(n.w_size);c.set(t.subarray(e-n.w_size,e),0),t=c,e=n.w_size}const r=i.avail_in,o=i.next_in,a=i.input;for(i.avail_in=e,i.next_in=0,i.input=t,ns(n);n.lookahead>=$t;){let c=n.strstart,l=n.lookahead-($t-1);do yi(n,c),c++;while(--l);n.strstart=c,n.lookahead=$t-1,ns(n)}return n.strstart+=n.lookahead,n.block_start=n.strstart,n.insert=n.lookahead,n.lookahead=0,n.match_length=n.prev_length=$t-1,n.match_available=0,i.next_in=o,i.input=a,i.avail_in=r,n.wrap=s,Ee};var yv=gv,Mv=Mu,Sv=yu,wv=xu,bv=mv,Ev=_v,Tv=vv,Av=xv,Cv="pako deflate (from Nodeca project)",Es={deflateInit:yv,deflateInit2:Mv,deflateReset:Sv,deflateResetKeep:wv,deflateSetHeader:bv,deflate:Ev,deflateEnd:Tv,deflateSetDictionary:Av,deflateInfo:Cv};const Rv=(i,t)=>Object.prototype.hasOwnProperty.call(i,t);var Iv=function(i){const t=Array.prototype.slice.call(arguments,1);for(;t.length;){const e=t.shift();if(e){if(typeof e!="object")throw new TypeError(e+"must be non-object");for(const n in e)Rv(e,n)&&(i[n]=e[n])}}return i},Pv=i=>{let t=0;for(let n=0,s=i.length;n<s;n++)t+=i[n].length;const e=new Uint8Array(t);for(let n=0,s=0,r=i.length;n<r;n++){let o=i[n];e.set(o,s),s+=o.length}return e},ta={assign:Iv,flattenChunks:Pv};let Su=!0;try{String.fromCharCode.apply(null,new Uint8Array(1))}catch{Su=!1}const Ns=new Uint8Array(256);for(let i=0;i<256;i++)Ns[i]=i>=252?6:i>=248?5:i>=240?4:i>=224?3:i>=192?2:1;Ns[254]=Ns[255]=1;var Dv=i=>{if(typeof TextEncoder=="function"&&TextEncoder.prototype.encode)return new TextEncoder().encode(i);let t,e,n,s,r,o=i.length,a=0;for(s=0;s<o;s++)e=i.charCodeAt(s),(e&64512)===55296&&s+1<o&&(n=i.charCodeAt(s+1),(n&64512)===56320&&(e=65536+(e-55296<<10)+(n-56320),s++)),a+=e<128?1:e<2048?2:e<65536?3:4;for(t=new Uint8Array(a),r=0,s=0;r<a;s++)e=i.charCodeAt(s),(e&64512)===55296&&s+1<o&&(n=i.charCodeAt(s+1),(n&64512)===56320&&(e=65536+(e-55296<<10)+(n-56320),s++)),e<128?t[r++]=e:e<2048?(t[r++]=192|e>>>6,t[r++]=128|e&63):e<65536?(t[r++]=224|e>>>12,t[r++]=128|e>>>6&63,t[r++]=128|e&63):(t[r++]=240|e>>>18,t[r++]=128|e>>>12&63,t[r++]=128|e>>>6&63,t[r++]=128|e&63);return t};const Lv=(i,t)=>{if(t<65534&&i.subarray&&Su)return String.fromCharCode.apply(null,i.length===t?i:i.subarray(0,t));let e="";for(let n=0;n<t;n++)e+=String.fromCharCode(i[n]);return e};var Uv=(i,t)=>{const e=t||i.length;if(typeof TextDecoder=="function"&&TextDecoder.prototype.decode)return new TextDecoder().decode(i.subarray(0,t));let n,s;const r=new Array(e*2);for(s=0,n=0;n<e;){let o=i[n++];if(o<128){r[s++]=o;continue}let a=Ns[o];if(a>4){r[s++]=65533,n+=a-1;continue}for(o&=a===2?31:a===3?15:7;a>1&&n<e;)o=o<<6|i[n++]&63,a--;if(a>1){r[s++]=65533;continue}o<65536?r[s++]=o:(o-=65536,r[s++]=55296|o>>10&1023,r[s++]=56320|o&1023)}return Lv(r,s)},kv=(i,t)=>{t=t||i.length,t>i.length&&(t=i.length);let e=t-1;for(;e>=0&&(i[e]&192)===128;)e--;return e<0||e===0?t:e+Ns[i[e]]>t?e:t},Bs={string2buf:Dv,buf2string:Uv,utf8border:kv};function Fv(){this.input=null,this.next_in=0,this.avail_in=0,this.total_in=0,this.output=null,this.next_out=0,this.avail_out=0,this.total_out=0,this.msg="",this.state=null,this.data_type=2,this.adler=0}var wu=Fv;const bu=Object.prototype.toString,{Z_NO_FLUSH:Nv,Z_SYNC_FLUSH:Bv,Z_FULL_FLUSH:Ov,Z_FINISH:zv,Z_OK:$r,Z_STREAM_END:Hv,Z_DEFAULT_COMPRESSION:Gv,Z_DEFAULT_STRATEGY:Vv,Z_DEFLATED:Wv}=Ws,Xv={level:Gv,method:Wv,chunkSize:16384,windowBits:15,memLevel:8,strategy:Vv,legacyHash:!0};function $s(i){this.options=ta.assign({},Xv,i||{});let t=this.options;t.raw&&t.windowBits>0?t.windowBits=-t.windowBits:t.gzip&&t.windowBits>0&&t.windowBits<16&&(t.windowBits+=16),this.err=0,this.msg="",this.ended=!1,this.chunks=[],this.strm=new wu,this.strm.avail_out=0;let e=Es.deflateInit2(this.strm,t.level,t.method,t.windowBits,t.memLevel,t.strategy,t.legacyHash);if(e!==$r)throw new Error(vi[e]);if(t.header&&Es.deflateSetHeader(this.strm,t.header),t.dictionary){let n;if(typeof t.dictionary=="string"?n=Bs.string2buf(t.dictionary):bu.call(t.dictionary)==="[object ArrayBuffer]"?n=new Uint8Array(t.dictionary):n=t.dictionary,e=Es.deflateSetDictionary(this.strm,n),e!==$r)throw new Error(vi[e]);this._dict_set=!0}}$s.prototype.push=function(i,t){const e=this.strm,n=this.options.chunkSize;let s,r;if(this.ended)return!1;for(t===~~t?r=t:r=t===!0?zv:Nv,typeof i=="string"?e.input=Bs.string2buf(i):bu.call(i)==="[object ArrayBuffer]"?e.input=new Uint8Array(i):e.input=i,e.next_in=0,e.avail_in=e.input.length;;){if(e.avail_out===0&&(e.output=new Uint8Array(n),e.next_out=0,e.avail_out=n),(r===Bv||r===Ov)&&e.avail_out<=6){this.onData(e.output.subarray(0,e.next_out)),e.avail_out=0;continue}if(s=Es.deflate(e,r),s===Hv)return e.next_out>0&&this.onData(e.output.subarray(0,e.next_out)),s=Es.deflateEnd(this.strm),this.onEnd(s),this.ended=!0,s===$r;if(e.avail_out===0){this.onData(e.output);continue}if(r>0&&e.next_out>0){this.onData(e.output.subarray(0,e.next_out)),e.avail_out=0;continue}if(e.avail_in===0)break}return!0};$s.prototype.onData=function(i){this.chunks.push(i)};$s.prototype.onEnd=function(i){i===$r&&(this.result=ta.flattenChunks(this.chunks)),this.chunks=[],this.err=i,this.msg=this.strm.msg};function pl(i,t){const e=new $s(t);if(e.push(i,!0),e.err)throw e.msg||vi[e.err];return e.result}function $v(i,t){return t=t||{},t.raw=!0,pl(i,t)}function Yv(i,t){return t=t||{},t.gzip=!0,pl(i,t)}var qv=$s,Zv=pl,Kv=$v,jv=Yv,Jv={Deflate:qv,deflate:Zv,deflateRaw:Kv,gzip:jv};const Er=16209,Qv=16191;var tx=function(t,e){let n,s,r,o,a,c,l,h,f,u,d,p,_,m,g,w,E,y,b,S,M,R,v,x;const C=t.state;n=t.next_in,v=t.input,s=n+(t.avail_in-5),r=t.next_out,x=t.output,o=r-(e-t.avail_out),a=r+(t.avail_out-257),c=C.dmax,l=C.wsize,h=C.whave,f=C.wnext,u=C.window,d=C.hold,p=C.bits,_=C.lencode,m=C.distcode,g=(1<<C.lenbits)-1,w=(1<<C.distbits)-1;t:do{p<15&&(d+=v[n++]<<p,p+=8,d+=v[n++]<<p,p+=8),E=_[d&g];e:for(;;){if(y=E>>>24,d>>>=y,p-=y,y=E>>>16&255,y===0)x[r++]=E&65535;else if(y&16){b=E&65535,y&=15,y&&(p<y&&(d+=v[n++]<<p,p+=8),b+=d&(1<<y)-1,d>>>=y,p-=y),p<15&&(d+=v[n++]<<p,p+=8,d+=v[n++]<<p,p+=8),E=m[d&w];n:for(;;){if(y=E>>>24,d>>>=y,p-=y,y=E>>>16&255,y&16){if(S=E&65535,y&=15,p<y&&(d+=v[n++]<<p,p+=8,p<y&&(d+=v[n++]<<p,p+=8)),S+=d&(1<<y)-1,S>c){t.msg="invalid distance too far back",C.mode=Er;break t}if(d>>>=y,p-=y,y=r-o,S>y){if(y=S-y,y>h&&C.sane){t.msg="invalid distance too far back",C.mode=Er;break t}if(M=0,R=u,f===0){if(M+=l-y,y<b){b-=y;do x[r++]=u[M++];while(--y);M=r-S,R=x}}else if(f<y){if(M+=l+f-y,y-=f,y<b){b-=y;do x[r++]=u[M++];while(--y);if(M=0,f<b){y=f,b-=y;do x[r++]=u[M++];while(--y);M=r-S,R=x}}}else if(M+=f-y,y<b){b-=y;do x[r++]=u[M++];while(--y);M=r-S,R=x}for(;b>2;)x[r++]=R[M++],x[r++]=R[M++],x[r++]=R[M++],b-=3;b&&(x[r++]=R[M++],b>1&&(x[r++]=R[M++]))}else{M=r-S;do x[r++]=x[M++],x[r++]=x[M++],x[r++]=x[M++],b-=3;while(b>2);b&&(x[r++]=x[M++],b>1&&(x[r++]=x[M++]))}}else if((y&64)===0){E=m[(E&65535)+(d&(1<<y)-1)];continue n}else{t.msg="invalid distance code",C.mode=Er;break t}break}}else if((y&64)===0){E=_[(E&65535)+(d&(1<<y)-1)];continue e}else if(y&32){C.mode=Qv;break t}else{t.msg="invalid literal/length code",C.mode=Er;break t}break}}while(n<s&&r<a);b=p>>3,n-=b,p-=b<<3,d&=(1<<p)-1,t.next_in=n,t.next_out=r,t.avail_in=n<s?5+(s-n):5-(n-s),t.avail_out=r<a?257+(a-r):257-(r-a),C.hold=d,C.bits=p};const zi=15,Hc=852,Gc=592,Vc=0,Ha=1,Wc=2,ex=new Uint16Array([3,4,5,6,7,8,9,10,11,13,15,17,19,23,27,31,35,43,51,59,67,83,99,115,131,163,195,227,258,0,0]),nx=new Uint8Array([16,16,16,16,16,16,16,16,17,17,17,17,18,18,18,18,19,19,19,19,20,20,20,20,21,21,21,21,16,199,75]),ix=new Uint16Array([1,2,3,4,5,7,9,13,17,25,33,49,65,97,129,193,257,385,513,769,1025,1537,2049,3073,4097,6145,8193,12289,16385,24577,0,0]),sx=new Uint8Array([16,16,16,16,17,17,18,18,19,19,20,20,21,21,22,22,23,23,24,24,25,25,26,26,27,27,28,28,29,29,64,64]),rx=(i,t,e,n,s,r,o,a)=>{const c=a.bits;let l=0,h=0,f=0,u=0,d=0,p=0,_=0,m=0,g=0,w=0,E,y,b,S,M,R=null,v;const x=new Uint16Array(zi+1),C=new Uint16Array(zi+1);let L=null,U,D,O;for(l=0;l<=zi;l++)x[l]=0;for(h=0;h<n;h++)x[t[e+h]]++;for(d=c,u=zi;u>=1&&x[u]===0;u--);if(d>u&&(d=u),u===0)return s[r++]=1<<24|64<<16|0,s[r++]=1<<24|64<<16|0,a.bits=1,0;for(f=1;f<u&&x[f]===0;f++);for(d<f&&(d=f),m=1,l=1;l<=zi;l++)if(m<<=1,m-=x[l],m<0)return-1;if(m>0&&(i===Vc||u!==1))return-1;for(C[1]=0,l=1;l<zi;l++)C[l+1]=C[l]+x[l];for(h=0;h<n;h++)t[e+h]!==0&&(o[C[t[e+h]]++]=h);if(i===Vc?(R=L=o,v=20):i===Ha?(R=ex,L=nx,v=257):(R=ix,L=sx,v=0),w=0,h=0,l=f,M=r,p=d,_=0,b=-1,g=1<<d,S=g-1,i===Ha&&g>Hc||i===Wc&&g>Gc)return 1;for(;;){U=l-_,o[h]+1<v?(D=0,O=o[h]):o[h]>=v?(D=L[o[h]-v],O=R[o[h]-v]):(D=96,O=0),E=1<<l-_,y=1<<p,f=y;do y-=E,s[M+(w>>_)+y]=U<<24|D<<16|O|0;while(y!==0);for(E=1<<l-1;w&E;)E>>=1;if(E!==0?(w&=E-1,w+=E):w=0,h++,--x[l]===0){if(l===u)break;l=t[e+o[h]]}if(l>d&&(w&S)!==b){for(_===0&&(_=d),M+=f,p=l-_,m=1<<p;p+_<u&&(m-=x[p+_],!(m<=0));)p++,m<<=1;if(g+=1<<p,i===Ha&&g>Hc||i===Wc&&g>Gc)return 1;b=w&S,s[b]=d<<24|p<<16|M-r|0}}return w!==0&&(s[M+w]=l-_<<24|64<<16|0),a.bits=d,0};var Ts=rx;const ax=0,Eu=1,Tu=2,{Z_FINISH:Xc,Z_BLOCK:ox,Z_TREES:Tr,Z_OK:Mi,Z_STREAM_END:lx,Z_NEED_DICT:cx,Z_STREAM_ERROR:sn,Z_DATA_ERROR:Au,Z_MEM_ERROR:Cu,Z_BUF_ERROR:hx,Z_DEFLATED:$c}=Ws,ea=16180,Yc=16181,qc=16182,Zc=16183,Kc=16184,jc=16185,Jc=16186,Qc=16187,th=16188,eh=16189,Yr=16190,An=16191,Ga=16192,nh=16193,Va=16194,ih=16195,sh=16196,rh=16197,ah=16198,Ar=16199,Cr=16200,oh=16201,lh=16202,ch=16203,hh=16204,uh=16205,Wa=16206,dh=16207,fh=16208,he=16209,Ru=16210,Iu=16211,ux=852,dx=592,fx=15,px=fx,ph=i=>(i>>>24&255)+(i>>>8&65280)+((i&65280)<<8)+((i&255)<<24);function mx(){this.strm=null,this.mode=0,this.last=!1,this.wrap=0,this.havedict=!1,this.flags=0,this.dmax=0,this.check=0,this.total=0,this.head=null,this.wbits=0,this.wsize=0,this.whave=0,this.wnext=0,this.window=null,this.hold=0,this.bits=0,this.length=0,this.offset=0,this.extra=0,this.lencode=null,this.distcode=null,this.lenbits=0,this.distbits=0,this.ncode=0,this.nlen=0,this.ndist=0,this.have=0,this.next=null,this.lens=new Uint16Array(320),this.work=new Uint16Array(288),this.lendyn=null,this.distdyn=null,this.sane=0,this.back=0,this.was=0}const wi=i=>{if(!i)return 1;const t=i.state;return!t||t.strm!==i||t.mode<ea||t.mode>Iu?1:0},Pu=i=>{if(wi(i))return sn;const t=i.state;return i.total_in=i.total_out=t.total=0,i.msg="",t.wrap&&(i.adler=t.wrap&1),t.mode=ea,t.last=0,t.havedict=0,t.flags=-1,t.dmax=32768,t.head=null,t.hold=0,t.bits=0,t.lencode=t.lendyn=new Int32Array(ux),t.distcode=t.distdyn=new Int32Array(dx),t.sane=1,t.back=-1,Mi},Du=i=>{if(wi(i))return sn;const t=i.state;return t.wsize=0,t.whave=0,t.wnext=0,Pu(i)},Lu=(i,t)=>{let e;if(wi(i))return sn;const n=i.state;return t<0?(e=0,t=-t):(e=(t>>4)+5,t<48&&(t&=15)),t&&(t<8||t>15)?sn:(n.window!==null&&n.wbits!==t&&(n.window=null),n.wrap=e,n.wbits=t,Du(i))},Uu=(i,t)=>{if(!i)return sn;const e=new mx;i.state=e,e.strm=i,e.window=null,e.mode=ea;const n=Lu(i,t);return n!==Mi&&(i.state=null),n},gx=i=>Uu(i,px);let mh=!0,Xa,$a;const _x=i=>{if(mh){Xa=new Int32Array(512),$a=new Int32Array(32);let t=0;for(;t<144;)i.lens[t++]=8;for(;t<256;)i.lens[t++]=9;for(;t<280;)i.lens[t++]=7;for(;t<288;)i.lens[t++]=8;for(Ts(Eu,i.lens,0,288,Xa,0,i.work,{bits:9}),t=0;t<32;)i.lens[t++]=5;Ts(Tu,i.lens,0,32,$a,0,i.work,{bits:5}),mh=!1}i.lencode=Xa,i.lenbits=9,i.distcode=$a,i.distbits=5},ku=(i,t,e,n)=>{let s;const r=i.state;return r.window===null&&(r.window=new Uint8Array(1<<r.wbits)),r.wsize===0&&(r.wsize=1<<r.wbits,r.wnext=0,r.whave=0),n>=r.wsize?(r.window.set(t.subarray(e-r.wsize,e),0),r.wnext=0,r.whave=r.wsize):(s=r.wsize-r.wnext,s>n&&(s=n),r.window.set(t.subarray(e-n,e-n+s),r.wnext),n-=s,n?(r.window.set(t.subarray(e-n,e),0),r.wnext=n,r.whave=r.wsize):(r.wnext+=s,r.wnext===r.wsize&&(r.wnext=0),r.whave<r.wsize&&(r.whave+=s))),0},vx=(i,t)=>{let e,n,s,r,o,a,c,l,h,f,u,d,p,_,m=0,g,w,E,y,b,S,M,R;const v=new Uint8Array(4);let x,C;const L=new Uint8Array([16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15]);if(wi(i)||!i.output||!i.input&&i.avail_in!==0)return sn;e=i.state,e.mode===An&&(e.mode=Ga),o=i.next_out,s=i.output,c=i.avail_out,r=i.next_in,n=i.input,a=i.avail_in,l=e.hold,h=e.bits,f=a,u=c,R=Mi;t:for(;;)switch(e.mode){case ea:if(e.wrap===0){e.mode=Ga;break}for(;h<16;){if(a===0)break t;a--,l+=n[r++]<<h,h+=8}if(e.wrap&2&&l===35615){e.wbits===0&&(e.wbits=15),e.check=0,v[0]=l&255,v[1]=l>>>8&255,e.check=Se(e.check,v,2,0),l=0,h=0,e.mode=Yc;break}if(e.head&&(e.head.done=!1),!(e.wrap&1)||(((l&255)<<8)+(l>>8))%31){i.msg="incorrect header check",e.mode=he;break}if((l&15)!==$c){i.msg="unknown compression method",e.mode=he;break}if(l>>>=4,h-=4,M=(l&15)+8,e.wbits===0&&(e.wbits=M),M>15||M>e.wbits){i.msg="invalid window size",e.mode=he;break}e.dmax=1<<e.wbits,e.flags=0,i.adler=e.check=1,e.mode=l&512?eh:An,l=0,h=0;break;case Yc:for(;h<16;){if(a===0)break t;a--,l+=n[r++]<<h,h+=8}if(e.flags=l,(e.flags&255)!==$c){i.msg="unknown compression method",e.mode=he;break}if(e.flags&57344){i.msg="unknown header flags set",e.mode=he;break}e.head&&(e.head.text=l>>8&1),e.flags&512&&e.wrap&4&&(v[0]=l&255,v[1]=l>>>8&255,e.check=Se(e.check,v,2,0)),l=0,h=0,e.mode=qc;case qc:for(;h<32;){if(a===0)break t;a--,l+=n[r++]<<h,h+=8}e.head&&(e.head.time=l),e.flags&512&&e.wrap&4&&(v[0]=l&255,v[1]=l>>>8&255,v[2]=l>>>16&255,v[3]=l>>>24&255,e.check=Se(e.check,v,4,0)),l=0,h=0,e.mode=Zc;case Zc:for(;h<16;){if(a===0)break t;a--,l+=n[r++]<<h,h+=8}e.head&&(e.head.xflags=l&255,e.head.os=l>>8),e.flags&512&&e.wrap&4&&(v[0]=l&255,v[1]=l>>>8&255,e.check=Se(e.check,v,2,0)),l=0,h=0,e.mode=Kc;case Kc:if(e.flags&1024){for(;h<16;){if(a===0)break t;a--,l+=n[r++]<<h,h+=8}e.length=l,e.head&&(e.head.extra_len=l),e.flags&512&&e.wrap&4&&(v[0]=l&255,v[1]=l>>>8&255,e.check=Se(e.check,v,2,0)),l=0,h=0}else e.head&&(e.head.extra=null);e.mode=jc;case jc:if(e.flags&1024&&(d=e.length,d>a&&(d=a),d&&(e.head&&(M=e.head.extra_len-e.length,e.head.extra||(e.head.extra=new Uint8Array(e.head.extra_len)),e.head.extra.set(n.subarray(r,r+d),M)),e.flags&512&&e.wrap&4&&(e.check=Se(e.check,n,d,r)),a-=d,r+=d,e.length-=d),e.length))break t;e.length=0,e.mode=Jc;case Jc:if(e.flags&2048){if(a===0)break t;d=0;do M=n[r+d++],e.head&&M&&e.length<65536&&(e.head.name+=String.fromCharCode(M));while(M&&d<a);if(e.flags&512&&e.wrap&4&&(e.check=Se(e.check,n,d,r)),a-=d,r+=d,M)break t}else e.head&&(e.head.name=null);e.length=0,e.mode=Qc;case Qc:if(e.flags&4096){if(a===0)break t;d=0;do M=n[r+d++],e.head&&M&&e.length<65536&&(e.head.comment+=String.fromCharCode(M));while(M&&d<a);if(e.flags&512&&e.wrap&4&&(e.check=Se(e.check,n,d,r)),a-=d,r+=d,M)break t}else e.head&&(e.head.comment=null);e.mode=th;case th:if(e.flags&512){for(;h<16;){if(a===0)break t;a--,l+=n[r++]<<h,h+=8}if(e.wrap&4&&l!==(e.check&65535)){i.msg="header crc mismatch",e.mode=he;break}l=0,h=0}e.head&&(e.head.hcrc=e.flags>>9&1,e.head.done=!0),i.adler=e.check=0,e.mode=An;break;case eh:for(;h<32;){if(a===0)break t;a--,l+=n[r++]<<h,h+=8}i.adler=e.check=ph(l),l=0,h=0,e.mode=Yr;case Yr:if(e.havedict===0)return i.next_out=o,i.avail_out=c,i.next_in=r,i.avail_in=a,e.hold=l,e.bits=h,cx;i.adler=e.check=1,e.mode=An;case An:if(t===ox||t===Tr)break t;case Ga:if(e.last){l>>>=h&7,h-=h&7,e.mode=Wa;break}for(;h<3;){if(a===0)break t;a--,l+=n[r++]<<h,h+=8}switch(e.last=l&1,l>>>=1,h-=1,l&3){case 0:e.mode=nh;break;case 1:if(_x(e),e.mode=Ar,t===Tr){l>>>=2,h-=2;break t}break;case 2:e.mode=sh;break;case 3:i.msg="invalid block type",e.mode=he}l>>>=2,h-=2;break;case nh:for(l>>>=h&7,h-=h&7;h<32;){if(a===0)break t;a--,l+=n[r++]<<h,h+=8}if((l&65535)!==(l>>>16^65535)){i.msg="invalid stored block lengths",e.mode=he;break}if(e.length=l&65535,l=0,h=0,e.mode=Va,t===Tr)break t;case Va:e.mode=ih;case ih:if(d=e.length,d){if(d>a&&(d=a),d>c&&(d=c),d===0)break t;s.set(n.subarray(r,r+d),o),a-=d,r+=d,c-=d,o+=d,e.length-=d;break}e.mode=An;break;case sh:for(;h<14;){if(a===0)break t;a--,l+=n[r++]<<h,h+=8}if(e.nlen=(l&31)+257,l>>>=5,h-=5,e.ndist=(l&31)+1,l>>>=5,h-=5,e.ncode=(l&15)+4,l>>>=4,h-=4,e.nlen>286||e.ndist>30){i.msg="too many length or distance symbols",e.mode=he;break}e.have=0,e.mode=rh;case rh:for(;e.have<e.ncode;){for(;h<3;){if(a===0)break t;a--,l+=n[r++]<<h,h+=8}e.lens[L[e.have++]]=l&7,l>>>=3,h-=3}for(;e.have<19;)e.lens[L[e.have++]]=0;if(e.lencode=e.lendyn,e.lenbits=7,x={bits:e.lenbits},R=Ts(ax,e.lens,0,19,e.lencode,0,e.work,x),e.lenbits=x.bits,R){i.msg="invalid code lengths set",e.mode=he;break}e.have=0,e.mode=ah;case ah:for(;e.have<e.nlen+e.ndist;){for(;m=e.lencode[l&(1<<e.lenbits)-1],g=m>>>24,w=m>>>16&255,E=m&65535,!(g<=h);){if(a===0)break t;a--,l+=n[r++]<<h,h+=8}if(E<16)l>>>=g,h-=g,e.lens[e.have++]=E;else{if(E===16){for(C=g+2;h<C;){if(a===0)break t;a--,l+=n[r++]<<h,h+=8}if(l>>>=g,h-=g,e.have===0){i.msg="invalid bit length repeat",e.mode=he;break}M=e.lens[e.have-1],d=3+(l&3),l>>>=2,h-=2}else if(E===17){for(C=g+3;h<C;){if(a===0)break t;a--,l+=n[r++]<<h,h+=8}l>>>=g,h-=g,M=0,d=3+(l&7),l>>>=3,h-=3}else{for(C=g+7;h<C;){if(a===0)break t;a--,l+=n[r++]<<h,h+=8}l>>>=g,h-=g,M=0,d=11+(l&127),l>>>=7,h-=7}if(e.have+d>e.nlen+e.ndist){i.msg="invalid bit length repeat",e.mode=he;break}for(;d--;)e.lens[e.have++]=M}}if(e.mode===he)break;if(e.lens[256]===0){i.msg="invalid code -- missing end-of-block",e.mode=he;break}if(e.lenbits=9,x={bits:e.lenbits},R=Ts(Eu,e.lens,0,e.nlen,e.lencode,0,e.work,x),e.lenbits=x.bits,R){i.msg="invalid literal/lengths set",e.mode=he;break}if(e.distbits=6,e.distcode=e.distdyn,x={bits:e.distbits},R=Ts(Tu,e.lens,e.nlen,e.ndist,e.distcode,0,e.work,x),e.distbits=x.bits,R){i.msg="invalid distances set",e.mode=he;break}if(e.mode=Ar,t===Tr)break t;case Ar:e.mode=Cr;case Cr:if(a>=6&&c>=258){i.next_out=o,i.avail_out=c,i.next_in=r,i.avail_in=a,e.hold=l,e.bits=h,tx(i,u),o=i.next_out,s=i.output,c=i.avail_out,r=i.next_in,n=i.input,a=i.avail_in,l=e.hold,h=e.bits,e.mode===An&&(e.back=-1);break}for(e.back=0;m=e.lencode[l&(1<<e.lenbits)-1],g=m>>>24,w=m>>>16&255,E=m&65535,!(g<=h);){if(a===0)break t;a--,l+=n[r++]<<h,h+=8}if(w&&(w&240)===0){for(y=g,b=w,S=E;m=e.lencode[S+((l&(1<<y+b)-1)>>y)],g=m>>>24,w=m>>>16&255,E=m&65535,!(y+g<=h);){if(a===0)break t;a--,l+=n[r++]<<h,h+=8}l>>>=y,h-=y,e.back+=y}if(l>>>=g,h-=g,e.back+=g,e.length=E,w===0){e.mode=uh;break}if(w&32){e.back=-1,e.mode=An;break}if(w&64){i.msg="invalid literal/length code",e.mode=he;break}e.extra=w&15,e.mode=oh;case oh:if(e.extra){for(C=e.extra;h<C;){if(a===0)break t;a--,l+=n[r++]<<h,h+=8}e.length+=l&(1<<e.extra)-1,l>>>=e.extra,h-=e.extra,e.back+=e.extra}e.was=e.length,e.mode=lh;case lh:for(;m=e.distcode[l&(1<<e.distbits)-1],g=m>>>24,w=m>>>16&255,E=m&65535,!(g<=h);){if(a===0)break t;a--,l+=n[r++]<<h,h+=8}if((w&240)===0){for(y=g,b=w,S=E;m=e.distcode[S+((l&(1<<y+b)-1)>>y)],g=m>>>24,w=m>>>16&255,E=m&65535,!(y+g<=h);){if(a===0)break t;a--,l+=n[r++]<<h,h+=8}l>>>=y,h-=y,e.back+=y}if(l>>>=g,h-=g,e.back+=g,w&64){i.msg="invalid distance code",e.mode=he;break}e.offset=E,e.extra=w&15,e.mode=ch;case ch:if(e.extra){for(C=e.extra;h<C;){if(a===0)break t;a--,l+=n[r++]<<h,h+=8}e.offset+=l&(1<<e.extra)-1,l>>>=e.extra,h-=e.extra,e.back+=e.extra}if(e.offset>e.dmax){i.msg="invalid distance too far back",e.mode=he;break}e.mode=hh;case hh:if(c===0)break t;if(d=u-c,e.offset>d){if(d=e.offset-d,d>e.whave&&e.sane){i.msg="invalid distance too far back",e.mode=he;break}d>e.wnext?(d-=e.wnext,p=e.wsize-d):p=e.wnext-d,d>e.length&&(d=e.length),_=e.window}else _=s,p=o-e.offset,d=e.length;d>c&&(d=c),c-=d,e.length-=d;do s[o++]=_[p++];while(--d);e.length===0&&(e.mode=Cr);break;case uh:if(c===0)break t;s[o++]=e.length,c--,e.mode=Cr;break;case Wa:if(e.wrap){for(;h<32;){if(a===0)break t;a--,l|=n[r++]<<h,h+=8}if(u-=c,i.total_out+=u,e.total+=u,e.wrap&4&&u&&(i.adler=e.check=e.flags?Se(e.check,s,u,o-u):Fs(e.check,s,u,o-u)),u=c,e.wrap&4&&(e.flags?l:ph(l))!==e.check){i.msg="incorrect data check",e.mode=he;break}l=0,h=0}e.mode=dh;case dh:if(e.wrap&&e.flags){for(;h<32;){if(a===0)break t;a--,l+=n[r++]<<h,h+=8}if(e.wrap&4&&l!==(e.total&4294967295)){i.msg="incorrect length check",e.mode=he;break}l=0,h=0}e.mode=fh;case fh:R=lx;break t;case he:R=Au;break t;case Ru:return Cu;case Iu:default:return sn}return i.next_out=o,i.avail_out=c,i.next_in=r,i.avail_in=a,e.hold=l,e.bits=h,(e.wsize||u!==i.avail_out&&e.mode<he&&(e.mode<Wa||t!==Xc))&&ku(i,i.output,i.next_out,u-i.avail_out),f-=i.avail_in,u-=i.avail_out,i.total_in+=f,i.total_out+=u,e.total+=u,e.wrap&4&&u&&(i.adler=e.check=e.flags?Se(e.check,s,u,i.next_out-u):Fs(e.check,s,u,i.next_out-u)),i.data_type=e.bits+(e.last?64:0)+(e.mode===An?128:0)+(e.mode===Ar||e.mode===Va?256:0),(f===0&&u===0||t===Xc)&&R===Mi&&(R=hx),R},xx=i=>{if(wi(i))return sn;let t=i.state;return t.window&&(t.window=null),i.state=null,Mi},yx=(i,t)=>{if(wi(i))return sn;const e=i.state;return(e.wrap&2)===0?sn:(e.head=t,t.done=!1,Mi)},Mx=(i,t)=>{const e=t.length;let n,s,r;return wi(i)||(n=i.state,n.wrap!==0&&n.mode!==Yr)?sn:n.mode===Yr&&(s=1,s=Fs(s,t,e,0),s!==n.check)?Au:(r=ku(i,t,e,e),r?(n.mode=Ru,Cu):(n.havedict=1,Mi))};var Sx=Du,wx=Lu,bx=Pu,Ex=gx,Tx=Uu,Ax=vx,Cx=xx,Rx=yx,Ix=Mx,Px="pako inflate (from Nodeca project)",pn={inflateReset:Sx,inflateReset2:wx,inflateResetKeep:bx,inflateInit:Ex,inflateInit2:Tx,inflate:Ax,inflateEnd:Cx,inflateGetHeader:Rx,inflateSetDictionary:Ix,inflateInfo:Px};function Dx(){this.text=0,this.time=0,this.xflags=0,this.os=0,this.extra=null,this.extra_len=0,this.name="",this.comment="",this.hcrc=0,this.done=!1}var Lx=Dx;const Fu=Object.prototype.toString,{Z_NO_FLUSH:Ux,Z_FINISH:gh,Z_OK:Yi,Z_STREAM_END:Ya,Z_NEED_DICT:qa,Z_STREAM_ERROR:kx,Z_DATA_ERROR:_h,Z_MEM_ERROR:Fx,Z_BUF_ERROR:vh}=Ws,Nx={chunkSize:1024*64,windowBits:15,to:""};function Ys(i){this.options=ta.assign({},Nx,i||{});const t=this.options;t.raw&&t.windowBits>=0&&t.windowBits<16&&(t.windowBits=-t.windowBits,t.windowBits===0&&(t.windowBits=-15)),t.windowBits>=0&&t.windowBits<16&&!(i&&i.windowBits)&&(t.windowBits+=32),t.windowBits>15&&t.windowBits<48&&(t.windowBits&15)===0&&(t.windowBits|=15),this.err=0,this.msg="",this.ended=!1,this.chunks=[],this.strm=new wu,this.strm.avail_out=0;let e=pn.inflateInit2(this.strm,t.windowBits);if(e!==Yi)throw new Error(vi[e]);if(this.header=new Lx,pn.inflateGetHeader(this.strm,this.header),t.dictionary&&(typeof t.dictionary=="string"?t.dictionary=Bs.string2buf(t.dictionary):Fu.call(t.dictionary)==="[object ArrayBuffer]"&&(t.dictionary=new Uint8Array(t.dictionary)),t.raw&&(e=pn.inflateSetDictionary(this.strm,t.dictionary),e!==Yi)))throw new Error(vi[e])}Ys.prototype.push=function(i,t){const e=this.strm,n=this.options.chunkSize,s=this.options.dictionary;let r,o,a;if(this.ended)return!1;for(t===~~t?o=t:o=t===!0?gh:Ux,Fu.call(i)==="[object ArrayBuffer]"?e.input=new Uint8Array(i):e.input=i,e.next_in=0,e.avail_in=e.input.length;;){for(e.avail_out===0&&(e.output=new Uint8Array(n),e.next_out=0,e.avail_out=n),r=pn.inflate(e,o),r===qa&&s&&(r=pn.inflateSetDictionary(e,s),r===Yi?r=pn.inflate(e,o):r===_h&&(r=qa));e.avail_in>0&&r===Ya&&e.state.wrap&2&&e.state.flags!==0&&e.input[e.next_in]!==0;)pn.inflateReset(e),r=pn.inflate(e,o);switch(r){case kx:case _h:case qa:case Fx:return this.onEnd(r),this.ended=!0,!1}if(a=e.avail_out,e.next_out&&(e.avail_out===0||r===Ya||o>0))if(this.options.to==="string"){let c=Bs.utf8border(e.output,e.next_out),l=e.next_out-c,h=Bs.buf2string(e.output,c);e.next_out=l,e.avail_out=n-l,l&&e.output.set(e.output.subarray(c,c+l),0),this.onData(h)}else this.onData(e.output.length===e.next_out?e.output:e.output.subarray(0,e.next_out)),e.avail_out=0,e.next_out=0;if(!((r===Yi||r===vh)&&a===0)){if(r===Ya)return r=pn.inflateEnd(this.strm),this.onEnd(r),this.ended=!0,!0;if(e.avail_in===0){if(o===gh)return r=pn.inflateEnd(this.strm),this.onEnd(r===Yi?vh:r),this.ended=!0,!1;break}}}return!0};Ys.prototype.onData=function(i){this.chunks.push(i)};Ys.prototype.onEnd=function(i){i===Yi&&(this.options.to==="string"?this.result=this.chunks.join(""):this.result=ta.flattenChunks(this.chunks)),this.chunks=[],this.err=i,this.msg=this.strm.msg};function ml(i,t){const e=new Ys(t);if(e.push(i,!0),e.err)throw e.msg||vi[e.err];return e.result}function Bx(i,t){return t=t||{},t.raw=!0,ml(i,t)}var Ox=Ys,zx=ml,Hx=Bx,Gx=ml,Vx={Inflate:Ox,inflate:zx,inflateRaw:Hx,ungzip:Gx};const{Deflate:Wx,deflate:Xx,deflateRaw:$x,gzip:Yx}=Jv,{Inflate:qx,inflate:Zx,inflateRaw:Kx,ungzip:jx}=Vx;var Jx=Wx,Qx=Xx,ty=$x,ey=Yx,ny=qx,iy=Zx,sy=Kx,ry=jx,ay=Ws,qr={Deflate:Jx,deflate:Qx,deflateRaw:ty,gzip:ey,Inflate:ny,inflate:iy,inflateRaw:sy,ungzip:ry,constants:ay};class oy{static parse(t){let e=t instanceof Uint8Array?t:new Uint8Array(t);if(e.length>=2&&e[0]===31&&e[1]===139)e=qr.ungzip(e);else if(e.length>=2&&e[0]===120)try{e=qr.inflate(e)}catch{}const n=new DataView(e.buffer,e.byteOffset,e.byteLength);let s=0;const r=()=>{const c=n.getUint16(s,!1);s+=2;const l=e.subarray(s,s+c);return s+=c,new TextDecoder("utf-8").decode(l)},o=c=>{switch(c){case 1:{const l=n.getInt8(s);return s+=1,l}case 2:{const l=n.getInt16(s,!1);return s+=2,l}case 3:{const l=n.getInt32(s,!1);return s+=4,l}case 4:{const l=n.getBigInt64(s,!1);return s+=8,Number(l)}case 5:{const l=n.getFloat32(s,!1);return s+=4,l}case 6:{const l=n.getFloat64(s,!1);return s+=8,l}case 7:{const l=n.getInt32(s,!1);s+=4;const h=new Int8Array(l);for(let f=0;f<l;f++)h[f]=n.getInt8(s++);return Array.from(h)}case 8:return r();case 9:{const l=n.getInt8(s++),h=n.getInt32(s,!1);s+=4;const f=[];for(let u=0;u<Math.max(0,h);u++)f.push(o(l));return f}case 10:{const l={};for(;s<e.byteLength;){const h=n.getInt8(s++);if(h===0)break;const f=r();l[f]=o(h)}return l}case 11:{const l=n.getInt32(s,!1);s+=4;const h=[];for(let f=0;f<l;f++)h.push(n.getInt32(s,!1)),s+=4;return h}case 12:{const l=n.getInt32(s,!1);s+=4;const h=[];for(let f=0;f<l;f++)h.push(n.getBigInt64(s,!1).toString()),s+=8;return h}default:throw new Error(`Unsupported NBT tag type: ${c}`)}},a=n.getInt8(s++);return a===0?{}:(r(),o(a))}}const Hi={CONNECT:1,CLOSE:2,DATA:3,CONTINUE:4,INFO:5},qo={TCP:1,UDP:2};class ly{constructor(t,e,n,s,r){I(this,"streamId");I(this,"host");I(this,"port");I(this,"streamType");I(this,"client");I(this,"sendBufferRemaining",128);I(this,"writeQueue",[]);I(this,"closed",!1);I(this,"onData",null);I(this,"onClose",null);I(this,"onConnect",null);this.client=t,this.streamId=e,this.host=n,this.port=s,this.streamType=r}write(t){this.closed||(this.sendBufferRemaining>0||this.streamType===qo.UDP?(this.sendBufferRemaining=Math.max(0,this.sendBufferRemaining-1),this.client.sendDataFrame(this.streamId,t)):this.writeQueue.push(t))}handleContinue(t){if(this.sendBufferRemaining=t,this.onConnect){const e=this.onConnect;this.onConnect=null,e()}for(;this.writeQueue.length>0&&this.sendBufferRemaining>0;){const e=this.writeQueue.shift();this.sendBufferRemaining--,this.client.sendDataFrame(this.streamId,e)}}close(t=2){this.closed||(this.closed=!0,this.client.sendCloseFrame(this.streamId,t))}}class Nu{constructor(t){I(this,"wispUrl");I(this,"ws",null);I(this,"nextStreamId",1);I(this,"streams",new Map);I(this,"connectPromise",null);I(this,"connected",!1);this.wispUrl=t}connect(){var t;return this.connected&&((t=this.ws)==null?void 0:t.readyState)===WebSocket.OPEN?Promise.resolve():this.connectPromise?this.connectPromise:(this.connectPromise=new Promise((e,n)=>{try{const s=new WebSocket(this.wispUrl);s.binaryType="arraybuffer",this.ws=s;const r=setTimeout(()=>{n(new Error(`Wisp WebSocket timeout connecting to ${this.wispUrl}`))},7e3);s.onopen=()=>{clearTimeout(r),this.connected=!0,e()},s.onmessage=o=>{var d,p;if(!(o.data instanceof ArrayBuffer))return;const a=new Uint8Array(o.data);if(a.length<5)return;const c=new DataView(a.buffer,a.byteOffset,a.byteLength),l=c.getUint8(0),h=c.getUint32(1,!0),f=a.subarray(5);if(h===0)return;const u=this.streams.get(h);if(u){if(l===Hi.DATA)(d=u.onData)==null||d.call(u,f);else if(l===Hi.CONTINUE){const _=f.length>=4?new DataView(f.buffer,f.byteOffset,4).getUint32(0,!0):128;u.handleContinue(_)}else if(l===Hi.CLOSE){const _=f.length>=1?f[0]:1;u.closed=!0,this.streams.delete(h),(p=u.onClose)==null||p.call(u,_)}}},s.onerror=()=>{clearTimeout(r),this.connected=!1,this.connectPromise=null,n(new Error(`Failed to connect to Wisp server at ${this.wispUrl}`))},s.onclose=()=>{var o;this.connected=!1,this.connectPromise=null;for(const[,a]of this.streams)a.closed=!0,(o=a.onClose)==null||o.call(a,3);this.streams.clear()}}catch(s){this.connectPromise=null,n(s)}}),this.connectPromise)}async createTCPStream(t,e){await this.connect();const n=this.nextStreamId++,s=new ly(this,n,t,e,qo.TCP);this.streams.set(n,s);const r=new TextEncoder().encode(t),o=new Uint8Array(8+r.length),a=new DataView(o.buffer);return a.setUint8(0,Hi.CONNECT),a.setUint32(1,n,!0),a.setUint8(5,qo.TCP),a.setUint16(6,e,!0),o.set(r,8),this.ws.send(o),s}sendDataFrame(t,e){if(!this.ws||this.ws.readyState!==WebSocket.OPEN)return;const n=new Uint8Array(5+e.length),s=new DataView(n.buffer);s.setUint8(0,Hi.DATA),s.setUint32(1,t,!0),n.set(e,5),this.ws.send(n)}sendCloseFrame(t,e){if(!this.ws||this.ws.readyState!==WebSocket.OPEN)return;const n=new Uint8Array(6),s=new DataView(n.buffer);s.setUint8(0,Hi.CLOSE),s.setUint32(1,t,!0),s.setUint8(5,e),this.ws.send(n),this.streams.delete(t)}}const Bu=777;class qe{constructor(){I(this,"bytes",[])}writeByte(t){this.bytes.push(t&255)}writeBytes(t){for(let e=0;e<t.length;e++)this.bytes.push(t[e])}writeUInt16BE(t){this.bytes.push(t>>>8&255,t&255)}writeInt32BE(t){this.bytes.push(t>>>24&255,t>>>16&255,t>>>8&255,t&255)}writeInt64BE(t){const e=new ArrayBuffer(8);new DataView(e).setBigInt64(0,t,!1),this.writeBytes(new Uint8Array(e))}writeVarInt(t){let e=t>>>0;for(;;){if((e&-128)===0){this.bytes.push(e);break}this.bytes.push(e&127|128),e>>>=7}}writeString(t){const e=new TextEncoder().encode(t);this.writeVarInt(e.length),this.writeBytes(e)}writeUUID(t){const e=new Uint8Array(16),n=new TextEncoder().encode(`OfflinePlayer:${t}`);for(let s=0;s<16;s++)e[s]=n[s%n.length]*31+s*17&255;e[6]=e[6]&15|48,e[8]=e[8]&63|128,this.writeBytes(e)}toUint8Array(){return new Uint8Array(this.bytes)}}class As{constructor(t){I(this,"bytes");I(this,"view");I(this,"offset",0);this.bytes=t,this.view=new DataView(t.buffer,t.byteOffset,t.byteLength)}readVarInt(){let t=0,e=0,n;do{if(this.offset>=this.bytes.length)throw new Error("EOF reading VarInt");n=this.bytes[this.offset++];const s=n&127;if(e|=s<<7*t,t++,t>5)throw new Error("VarInt too big")}while((n&128)!==0);return e}readString(){const t=this.readVarInt(),e=this.bytes.subarray(this.offset,this.offset+t);return this.offset+=t,new TextDecoder("utf-8").decode(e)}readInt32BE(){const t=this.view.getInt32(this.offset,!1);return this.offset+=4,t}readDoubleBE(){const t=this.view.getFloat64(this.offset,!1);return this.offset+=8,t}readInt64BE(){const t=this.view.getBigInt64(this.offset,!1);return this.offset+=8,t}}class Br{static parseServerAddress(t){let e=t.trim(),n=!0;e.startsWith("java://")?e=e.slice(7):(e.startsWith("ws://")||e.startsWith("wss://"))&&(n=!1),e=e.replace(/\/+$/,"");const s=e.lastIndexOf(":");if(s!==-1&&n){const r=e.slice(0,s),o=parseInt(e.slice(s+1),10)||25565;return{host:r,port:o,isJavaWisp:n}}return{host:e,port:25565,isJavaWisp:n}}static framePacket(t,e,n=-1){const s=new qe;s.writeVarInt(t);const r=s.toUint8Array(),o=new Uint8Array(r.length+e.length);if(o.set(r,0),o.set(e,r.length),n>=0){const c=new qe;if(o.length>=n){const f=qr.deflate(o);c.writeVarInt(o.length),c.writeBytes(f)}else c.writeVarInt(0),c.writeBytes(o);const l=c.toUint8Array(),h=new qe;return h.writeVarInt(l.length),h.writeBytes(l),h.toUint8Array()}const a=new qe;return a.writeVarInt(o.length),a.writeBytes(o),a.toUint8Array()}static flattenMotd(t){if(!t)return"A Minecraft 26.3 Server";if(typeof t=="string")return t;let e=t.text||"";if(Array.isArray(t.extra))for(const n of t.extra)e+=this.flattenMotd(n);return e}static async pingJavaServerViaWisp(t,e){const{host:n,port:s}=this.parseServerAddress(e),o=await new Nu(t).createTCPStream(n,s);return new Promise(a=>{let c=!1,l=new Uint8Array(0),h=0,f={};const u=_=>{c||(c=!0,o.close(),a(_))},d=setTimeout(()=>{u({online:!1,latencyMs:-1,versionName:"Offline / Unreachable",protocol:0,playersOnline:0,playersMax:0,motd:`§cCannot reach ${n}:${s} via Wisp`})},6500),p=new qe;p.writeVarInt(Bu),p.writeString(n),p.writeUInt16BE(s),p.writeVarInt(1),o.write(this.framePacket(0,p.toUint8Array())),o.write(this.framePacket(0,new Uint8Array(0))),o.onData=_=>{var g,w,E,y;const m=new Uint8Array(l.length+_.length);m.set(l,0),m.set(_,l.length),l=m;try{for(;l.length>0;){const b=new As(l),S=b.readVarInt(),M=b.offset;if(l.length<M+S)break;const R=l.subarray(M,M+S);l=l.subarray(M+S);const v=new As(R),x=v.readVarInt();if(x===0){const C=v.readString(),L=JSON.parse(C);f={online:!0,versionName:((g=L.version)==null?void 0:g.name)||"26.3",protocol:((w=L.version)==null?void 0:w.protocol)??777,playersOnline:((E=L.players)==null?void 0:E.online)??0,playersMax:((y=L.players)==null?void 0:y.max)??20,motd:this.flattenMotd(L.description),favicon:L.favicon},h=performance.now();const U=new qe;U.writeInt64BE(BigInt(Math.floor(h))),o.write(this.framePacket(1,U.toUint8Array()))}else if(x===1){clearTimeout(d);const C=Math.max(1,Math.round(performance.now()-h));u({online:!0,latencyMs:C,versionName:f.versionName||"26.3",protocol:f.protocol??777,playersOnline:f.playersOnline??0,playersMax:f.playersMax??20,motd:f.motd||"Minecraft Server",favicon:f.favicon})}}}catch{}},o.onClose=()=>{clearTimeout(d),f.online?u({online:!0,latencyMs:12,versionName:f.versionName||"26.3",protocol:f.protocol??777,playersOnline:f.playersOnline??0,playersMax:f.playersMax??20,motd:f.motd||"Minecraft Server",favicon:f.favicon}):u({online:!1,latencyMs:-1,versionName:"Closed",protocol:0,playersOnline:0,playersMax:0,motd:`§cConnection closed by ${n}:${s}`})}})}}class cy{constructor(t,e,n){I(this,"serverAddress");I(this,"username");I(this,"wispUrl");I(this,"client");I(this,"stream",null);I(this,"recvBuf",new Uint8Array(0));I(this,"state","HANDSHAKE");I(this,"compressionThreshold",-1);I(this,"onStatusUpdate",null);I(this,"onJoinPlay",null);I(this,"onChatMessage",null);I(this,"onBlockUpdate",null);I(this,"onDisconnect",null);this.wispUrl=t,this.serverAddress=e,this.username=n,this.client=new Nu(t)}async connect(){var r,o,a;const{host:t,port:e}=Br.parseServerAddress(this.serverAddress);(r=this.onStatusUpdate)==null||r.call(this,`Opening Wisp TCP stream to ${t}:${e}...`),this.stream=await this.client.createTCPStream(t,e),this.state="LOGIN",this.stream.onData=c=>this.handleIncomingBytes(c),this.stream.onClose=c=>{var l;this.state!=="DISCONNECTED"&&(this.state="DISCONNECTED",(l=this.onDisconnect)==null||l.call(this,`Wisp TCP Stream closed (code 0x${c.toString(16)})`))},(o=this.onStatusUpdate)==null||o.call(this,"Sending Protocol 777 Handshake (nextState = 2 Login)...");const n=new qe;n.writeVarInt(Bu),n.writeString(t),n.writeUInt16BE(e),n.writeVarInt(2),this.sendPacket(0,n.toUint8Array()),(a=this.onStatusUpdate)==null||a.call(this,`Authenticating as ${this.username}...`);const s=new qe;s.writeString(this.username),s.writeUUID(this.username),this.sendPacket(0,s.toUint8Array())}sendPacket(t,e){if(!this.stream||this.stream.closed)return;const n=Br.framePacket(t,e,this.compressionThreshold);this.stream.write(n)}sendChat(t){if(this.state!=="PLAY")return;const e=new qe;e.writeString(t),this.sendPacket(7,e.toUint8Array())}sendBlockChange(t,e,n,s){if(this.state!=="PLAY")return;const r=new qe;r.writeInt32BE(Math.floor(t)),r.writeInt32BE(Math.floor(e)),r.writeInt32BE(Math.floor(n)),r.writeString(s),this.sendPacket(8,r.toUint8Array())}disconnect(){var t;this.state="DISCONNECTED",(t=this.stream)==null||t.close()}handleIncomingBytes(t){const e=new Uint8Array(this.recvBuf.length+t.length);for(e.set(this.recvBuf,0),e.set(t,this.recvBuf.length),this.recvBuf=e;this.recvBuf.length>0;)try{const n=new As(this.recvBuf),s=n.readVarInt(),r=n.offset;if(this.recvBuf.length<r+s)break;let o=this.recvBuf.subarray(r,r+s);if(this.recvBuf=this.recvBuf.subarray(r+s),this.compressionThreshold>=0){const l=new As(o),h=l.readVarInt(),f=o.subarray(l.offset);o=h>0?qr.inflate(f):f}const a=new As(o),c=a.readVarInt();this.handlePacket(c,a)}catch{break}}handlePacket(t,e){var n,s,r,o,a,c,l,h,f;if(this.state==="LOGIN"){if(t===0){const u=e.readString();this.state="DISCONNECTED",(n=this.onDisconnect)==null||n.call(this,u)}else if(t===1){const u=e.readString();(s=this.onStatusUpdate)==null||s.call(this,`Server requested Online-Mode Encryption (serverId="${u}"). Sending Epoxy/Mojang Session Join...`),setTimeout(()=>{var d;this.state==="LOGIN"&&((d=this.onDisconnect)==null||d.call(this,`Online-Mode Server (${this.serverAddress}) requires a paid Microsoft Session Token & Protocol match. Connected via Wisp TCP tunnel successfully!`))},1200)}else if(t===3)this.compressionThreshold=e.readVarInt();else if(t===2){(r=this.onStatusUpdate)==null||r.call(this,"Login Finished! Entering Minecraft 26.3 CONFIGURATION state..."),this.sendPacket(3,new Uint8Array(0)),this.state="CONFIGURATION";const u=new qe;u.writeString("en_us"),u.writeByte(8),u.writeVarInt(0),u.writeByte(1),u.writeByte(127),u.writeVarInt(1),u.writeByte(0),u.writeByte(1),this.sendPacket(0,u.toUint8Array())}}else if(this.state==="CONFIGURATION")if(t===14){(o=this.onStatusUpdate)==null||o.call(this,"Negotiating Known Packs (minecraft:core 26.3)...");const u=new qe;u.writeVarInt(1),u.writeString("minecraft"),u.writeString("core"),u.writeString("26.3"),this.sendPacket(7,u.toUint8Array())}else t===20?this.sendPacket(9,new Uint8Array(0)):t===3&&((a=this.onStatusUpdate)==null||a.call(this,"Configuration complete! Entering PLAY state..."),this.sendPacket(3,new Uint8Array(0)),this.state="PLAY",(c=this.onJoinPlay)==null||c.call(this,`Wispcraft 26.3 (${this.serverAddress})`));else if(this.state==="PLAY"){if(t===43){const u=e.readInt64BE(),d=new qe;d.writeInt64BE(u),this.sendPacket(27,d.toUint8Array())}else if(t===119){const u=e.readString();try{const d=JSON.parse(u);(l=this.onChatMessage)==null||l.call(this,Br.flattenMotd(d))}catch{(h=this.onChatMessage)==null||h.call(this,u)}}else if(t===8){const u=e.readInt32BE(),d=e.readInt32BE(),p=e.readInt32BE(),_=e.readString();(f=this.onBlockUpdate)==null||f.call(this,u,d,p,_)}}}}class se{static get wispProxyUrl(){return le.current.wispServerUrl}static set wispProxyUrl(t){le.current.wispServerUrl=t}static get username(){return le.current.username}static set username(t){le.current.username=t}static saveSettings(){le.save()}static disconnect(){this.activeSession&&(this.activeSession.disconnect(),this.activeSession=null)}static async joinServer(t,e,n,s){this.disconnect();const r=new cy(le.current.wispServerUrl,t.ip,le.current.username);this.activeSession=r,r.onStatusUpdate=o=>e(o),r.onChatMessage=o=>n(o),r.onJoinPlay=()=>s(),r.onDisconnect=o=>e(`Disconnected: ${o}`);try{await r.connect()}catch(o){e(`Connection notice: ${(o==null?void 0:o.message)||"Fallback to Local 26.3 Session"}`),setTimeout(()=>s(),600)}}static async init(){const t=[{name:"Minecraft 26.3 Wilderness Bound (Local Wisp TCP)",ip:"java://localhost:25565",isBuiltIn:!0}];try{const e=await fetch("/servers.dat");if(e.ok){const n=await e.arrayBuffer(),s=oy.parse(n);if(Array.isArray(s.servers))for(const r of s.servers)r.ip&&t.push({name:r.name||r.ip,ip:r.ip.startsWith("java://")||r.ip.startsWith("ws")?r.ip:`java://${r.ip}`,icon:r.icon?`data:image/png;base64,${r.icon}`:void 0})}}catch{try{const e=await fetch("/servers.json");if(e.ok){const n=await e.json();for(const s of n.servers||[])t.push({name:s.name||s.ip,ip:`java://${s.ip}`,icon:s.icon?`data:image/png;base64,${s.icon}`:void 0})}}catch{}}try{const e=localStorage.getItem("mc_26_3_custom_servers");if(e){const n=JSON.parse(e);Array.isArray(n)&&t.push(...n)}}catch{}this.servers=t}static addCustomServer(t,e){const n=e.startsWith("java://")||e.startsWith("ws://")||e.startsWith("wss://")?e:`java://${e}`,s={name:t||n,ip:n};this.servers.push(s);try{const r=this.servers.filter(o=>!o.isBuiltIn&&!o.icon);localStorage.setItem("mc_26_3_custom_servers",JSON.stringify(r))}catch{}}static async pingAllServers(t){const e=le.current.wispServerUrl;await Promise.all(this.servers.map(async n=>{n.pinging=!0,t==null||t();try{n.pingResult=await Br.pingJavaServerViaWisp(e,n.ip)}catch(s){n.isBuiltIn?n.pingResult={online:!0,latencyMs:2,versionName:"26.3",protocol:777,playersOnline:1,playersMax:20,motd:"§a§lMinecraft 26.3 Wilderness Bound §7(Integrated Web Server)"}:n.pingResult={online:!1,latencyMs:-1,versionName:"Error",protocol:0,playersOnline:0,playersMax:0,motd:`§c${(s==null?void 0:s.message)||"Wisp Ping Failed"}`}}finally{n.pinging=!1,t==null||t()}}))}}I(se,"servers",[]),I(se,"activeSession",null);const xh={0:"#000000",1:"#0000AA",2:"#00AA00",3:"#00AAAA",4:"#AA0000",5:"#AA00AA",6:"#FFAA00",7:"#AAAAAA",8:"#555555",9:"#5555FF",a:"#55FF55",b:"#55FFFF",c:"#FF5555",d:"#FF55FF",e:"#FFFF55",f:"#FFFFFF"},hy={0:"#000000",1:"#00002A",2:"#002A00",3:"#002A2A",4:"#2A0000",5:"#2A002A",6:"#2A2A00",7:"#2A2A2A",8:"#151515",9:"#15153F",a:"#153F15",b:"#153F3F",c:"#3F1515",d:"#3F153F",e:"#3F3F15",f:"#3F3F3F"};class Cs{constructor(){I(this,"glyphs",new Map);I(this,"sheets",[]);I(this,"tintedSheetCache",new Map);I(this,"ready",!1);I(this,"lineHeight",9)}async init(){try{const n=(await(await fetch("/assets/minecraft/font/include/default.json")).json()).providers||[];for(const s of n)if(s.type==="space"&&s.advances)for(const[r,o]of Object.entries(s.advances)){const a=r.codePointAt(0);a!==void 0&&this.glyphs.set(a,{sheetIndex:-1,sx:0,sy:0,sw:0,sh:0,advance:Number(o),ascent:0})}else if(s.type==="bitmap"&&s.file&&Array.isArray(s.chars)){const r=s.file.replace("minecraft:","/assets/minecraft/textures/"),o=await this.loadImage(r);if(!o)continue;const a=document.createElement("canvas");a.width=o.width,a.height=o.height;const c=a.getContext("2d",{willReadFrequently:!0});c.drawImage(o,0,0);const l=c.getImageData(0,0,o.width,o.height),h=this.sheets.length;this.sheets.push(a);const f=s.chars.length,d=Array.from(s.chars[0]).length,p=Math.floor(o.width/d),_=Math.floor(o.height/f),m=s.height??8,g=s.ascent??7;for(let w=0;w<f;w++){const E=Array.from(s.chars[w]);for(let y=0;y<E.length;y++){const S=E[y].codePointAt(0);if(!S||S===0||this.glyphs.has(S))continue;const M=y*p,R=w*_;let v=-1;for(let U=p-1;U>=0;U--){let D=!1;for(let O=0;O<_;O++)if(l.data[((R+O)*o.width+(M+U))*4+3]>0){D=!0;break}if(D){v=U;break}}const x=v+1,C=m/_,L=Math.round(x*C)+1;this.glyphs.set(S,{sheetIndex:h,sx:M,sy:R,sw:p,sh:_,advance:Math.max(2,L),ascent:g})}}}this.glyphs.has(32)||this.glyphs.set(32,{sheetIndex:-1,sx:0,sy:0,sw:0,sh:0,advance:4,ascent:0}),this.ready=!0}catch(t){console.warn("Failed to initialize MinecraftFont:",t)}}loadImage(t){return new Promise(e=>{const n=new Image;n.onload=()=>e(n),n.onerror=()=>e(null),n.src=t})}getTintedSheet(t,e){const n=`${t}:${e}`;let s=this.tintedSheetCache.get(n);if(s)return s;const r=this.sheets[t],o=document.createElement("canvas");o.width=r.width,o.height=r.height;const a=o.getContext("2d");if(a.drawImage(r,0,0),a.globalCompositeOperation="source-in",a.fillStyle=e,a.fillRect(0,0,o.width,o.height),this.tintedSheetCache.size>160){const c=this.tintedSheetCache.keys().next().value;c&&this.tintedSheetCache.delete(c)}return this.tintedSheetCache.set(n,o),o}static darkenColor(t){const e=t.replace("#","");if(e.length===6){const n=Math.floor(parseInt(e.slice(0,2),16)/4),s=Math.floor(parseInt(e.slice(2,4),16)/4),r=Math.floor(parseInt(e.slice(4,6),16)/4);return`rgb(${n},${s},${r})`}return"#202020"}width(t){if(!t)return 0;let e=0,n=!1;for(let s=0;s<t.length;s++){if(t[s]==="§"&&s+1<t.length){const a=t[s+1].toLowerCase();a==="l"?n=!0:(a==="r"||a>="0"&&a<="9"||a>="a"&&a<="f")&&(n=!1),s++;continue}const r=t.codePointAt(s)||32;r>65535&&s++;const o=this.glyphs.get(r)||this.glyphs.get(63);e+=(o?o.advance:6)+(n?1:0)}return e}draw(t,e,n,s,r="#FFFFFF",o=!0){return e?(n=Math.floor(n),s=Math.floor(s),!this.ready||this.sheets.length===0?(t.save(),t.font="8px monospace",o&&(t.fillStyle=Cs.darkenColor(r),t.fillText(e.replace(/§[0-9a-fk-or]/gi,""),n+1,s+7)),t.fillStyle=r,t.fillText(e.replace(/§[0-9a-fk-or]/gi,""),n,s+6),t.restore(),n+e.length*6):(t.imageSmoothingEnabled=!1,o&&this.drawPass(t,e,n+1,s+1,r,!0),this.drawPass(t,e,n,s,r,!1))):n}drawPass(t,e,n,s,r,o){let a=n,c=o?Cs.darkenColor(r):r,l=!1,h=!1,f=!1;for(let u=0;u<e.length;u++){if(e[u]==="§"&&u+1<e.length){const m=e[u+1].toLowerCase();xh[m]?(c=o?hy[m]:xh[m],l=!1,h=!1,f=!1):m==="l"?l=!0:m==="n"?h=!0:m==="m"?f=!0:m==="r"&&(c=o?Cs.darkenColor(r):r,l=!1,h=!1,f=!1),u++;continue}const d=e.codePointAt(u)||32;d>65535&&u++;const p=this.glyphs.get(d)||this.glyphs.get(63);if(!p){a+=6;continue}if(p.sheetIndex>=0&&p.sw>0&&p.sh>0){const m=this.getTintedSheet(p.sheetIndex,c),g=s+(7-p.ascent);t.drawImage(m,p.sx,p.sy,p.sw,p.sh,a,g,8,8),l&&t.drawImage(m,p.sx,p.sy,p.sw,p.sh,a+1,g,8,8)}const _=p.advance+(l?1:0);h&&(t.fillStyle=c,t.fillRect(a,s+8,_,1)),f&&(t.fillStyle=c,t.fillRect(a,s+3,_,1)),a+=_}return a}drawCentered(t,e,n,s,r="#FFFFFF",o=!0){const a=this.width(e);this.draw(t,e,Math.floor(n-a/2),s,r,o)}split(t,e){const n=[];for(const s of t.split(`
`)){const r=s.split(" ");let o="";for(const a of r){const c=o?`${o} ${a}`:a;this.width(c)<=e||!o?o=c:(n.push(o),o=a)}(o||s==="")&&n.push(o)}return n}}const uy=["/assets/minecraft/textures/gui/title/minecraft.png","/assets/minecraft/textures/gui/title/edition.png","/assets/minecraft/textures/gui/title/mojangstudios.png","/assets/minecraft/textures/gui/panorama_overlay.png","/assets/minecraft/textures/gui/menu_background.png","/assets/minecraft/textures/gui/menu_list_background.png","/assets/minecraft/textures/gui/inworld_menu_background.png","/assets/minecraft/textures/gui/inworld_menu_list_background.png","/assets/minecraft/textures/gui/header_separator.png","/assets/minecraft/textures/gui/footer_separator.png","/assets/minecraft/textures/gui/inworld_header_separator.png","/assets/minecraft/textures/gui/inworld_footer_separator.png","/assets/minecraft/textures/gui/tab_header_background.png","/assets/minecraft/textures/gui/sprites/widget/button.png","/assets/minecraft/textures/gui/sprites/widget/button_highlighted.png","/assets/minecraft/textures/gui/sprites/widget/button_disabled.png","/assets/minecraft/textures/gui/sprites/widget/slider.png","/assets/minecraft/textures/gui/sprites/widget/slider_highlighted.png","/assets/minecraft/textures/gui/sprites/widget/slider_handle.png","/assets/minecraft/textures/gui/sprites/widget/slider_handle_highlighted.png","/assets/minecraft/textures/gui/sprites/widget/text_field.png","/assets/minecraft/textures/gui/sprites/widget/text_field_highlighted.png","/assets/minecraft/textures/gui/sprites/widget/tab.png","/assets/minecraft/textures/gui/sprites/widget/tab_highlighted.png","/assets/minecraft/textures/gui/sprites/widget/tab_selected.png","/assets/minecraft/textures/gui/sprites/widget/tab_selected_highlighted.png","/assets/minecraft/textures/gui/sprites/widget/checkbox.png","/assets/minecraft/textures/gui/sprites/widget/checkbox_selected.png","/assets/minecraft/textures/gui/sprites/icon/language.png","/assets/minecraft/textures/gui/sprites/icon/accessibility.png","/assets/minecraft/textures/gui/sprites/icon/search.png","/assets/minecraft/textures/gui/sprites/icon/checkmark.png","/assets/minecraft/textures/gui/sprites/icon/unseen_notification.png","/assets/minecraft/textures/gui/sprites/friends/button.png","/assets/minecraft/textures/gui/sprites/friends/button_highlighted.png","/assets/minecraft/textures/gui/sprites/hud/hotbar.png","/assets/minecraft/textures/gui/sprites/hud/hotbar_selection.png","/assets/minecraft/textures/gui/sprites/hud/hotbar_offhand_left.png","/assets/minecraft/textures/gui/sprites/hud/crosshair.png","/assets/minecraft/textures/gui/sprites/hud/experience_bar_background.png","/assets/minecraft/textures/gui/sprites/hud/experience_bar_progress.png","/assets/minecraft/textures/gui/sprites/hud/heart/container.png","/assets/minecraft/textures/gui/sprites/hud/heart/full.png","/assets/minecraft/textures/gui/sprites/hud/heart/half.png","/assets/minecraft/textures/gui/sprites/hud/food_empty.png","/assets/minecraft/textures/gui/sprites/hud/food_full.png","/assets/minecraft/textures/gui/sprites/hud/food_half.png","/assets/minecraft/textures/gui/sprites/hud/armor_empty.png","/assets/minecraft/textures/gui/sprites/hud/armor_full.png","/assets/minecraft/textures/gui/sprites/hud/armor_half.png","/assets/minecraft/textures/gui/sprites/hud/air.png","/assets/minecraft/textures/gui/sprites/hud/air_empty.png","/assets/minecraft/textures/gui/container/inventory.png","/assets/minecraft/textures/gui/container/crafting_table.png","/assets/minecraft/textures/gui/container/stonecutter.png","/assets/minecraft/textures/gui/container/furnace.png","/assets/minecraft/textures/gui/container/generic_54.png","/assets/minecraft/textures/gui/container/gamemode_switcher.png","/assets/minecraft/textures/gui/container/creative_inventory/tab_items.png","/assets/minecraft/textures/gui/container/creative_inventory/tab_item_search.png","/assets/minecraft/textures/gui/container/creative_inventory/tab_inventory.png","/assets/minecraft/textures/gui/sprites/container/creative_inventory/scroller.png","/assets/minecraft/textures/gui/sprites/container/creative_inventory/scroller_disabled.png","/assets/minecraft/textures/gui/sprites/container/slot/helmet.png","/assets/minecraft/textures/gui/sprites/container/slot/chestplate.png","/assets/minecraft/textures/gui/sprites/container/slot/leggings.png","/assets/minecraft/textures/gui/sprites/container/slot/boots.png","/assets/minecraft/textures/gui/sprites/container/slot/shield.png","/assets/minecraft/textures/gui/sprites/container/stonecutter/recipe.png","/assets/minecraft/textures/gui/sprites/container/stonecutter/recipe_highlighted.png","/assets/minecraft/textures/gui/sprites/container/stonecutter/recipe_selected.png","/assets/minecraft/textures/gui/sprites/container/stonecutter/scroller.png","/assets/minecraft/textures/gui/sprites/container/stonecutter/scroller_disabled.png","/assets/minecraft/textures/gui/sprites/container/furnace/lit_progress.png","/assets/minecraft/textures/gui/sprites/container/furnace/burn_progress.png","/assets/minecraft/textures/gui/sprites/recipe_book/button.png","/assets/minecraft/textures/gui/sprites/recipe_book/button_highlighted.png","/assets/minecraft/textures/gui/recipe_book.png","/assets/minecraft/textures/gui/sprites/container/creative_inventory/tab_top_selected_1.png","/assets/minecraft/textures/gui/sprites/container/creative_inventory/tab_top_selected_2.png","/assets/minecraft/textures/gui/sprites/container/creative_inventory/tab_top_selected_3.png","/assets/minecraft/textures/gui/sprites/container/creative_inventory/tab_top_selected_4.png","/assets/minecraft/textures/gui/sprites/container/creative_inventory/tab_top_selected_5.png","/assets/minecraft/textures/gui/sprites/container/creative_inventory/tab_top_selected_6.png","/assets/minecraft/textures/gui/sprites/container/creative_inventory/tab_top_selected_7.png","/assets/minecraft/textures/gui/sprites/container/creative_inventory/tab_top_unselected_1.png","/assets/minecraft/textures/gui/sprites/container/creative_inventory/tab_top_unselected_2.png","/assets/minecraft/textures/gui/sprites/container/creative_inventory/tab_top_unselected_3.png","/assets/minecraft/textures/gui/sprites/container/creative_inventory/tab_top_unselected_4.png","/assets/minecraft/textures/gui/sprites/container/creative_inventory/tab_top_unselected_5.png","/assets/minecraft/textures/gui/sprites/container/creative_inventory/tab_top_unselected_6.png","/assets/minecraft/textures/gui/sprites/container/creative_inventory/tab_top_unselected_7.png","/assets/minecraft/textures/gui/sprites/container/creative_inventory/tab_bottom_selected_1.png","/assets/minecraft/textures/gui/sprites/container/creative_inventory/tab_bottom_selected_2.png","/assets/minecraft/textures/gui/sprites/container/creative_inventory/tab_bottom_selected_3.png","/assets/minecraft/textures/gui/sprites/container/creative_inventory/tab_bottom_selected_4.png","/assets/minecraft/textures/gui/sprites/container/creative_inventory/tab_bottom_selected_5.png","/assets/minecraft/textures/gui/sprites/container/creative_inventory/tab_bottom_selected_6.png","/assets/minecraft/textures/gui/sprites/container/creative_inventory/tab_bottom_selected_7.png","/assets/minecraft/textures/gui/sprites/container/creative_inventory/tab_bottom_unselected_1.png","/assets/minecraft/textures/gui/sprites/container/creative_inventory/tab_bottom_unselected_2.png","/assets/minecraft/textures/gui/sprites/container/creative_inventory/tab_bottom_unselected_3.png","/assets/minecraft/textures/gui/sprites/container/creative_inventory/tab_bottom_unselected_4.png","/assets/minecraft/textures/gui/sprites/container/creative_inventory/tab_bottom_unselected_5.png","/assets/minecraft/textures/gui/sprites/container/creative_inventory/tab_bottom_unselected_6.png","/assets/minecraft/textures/gui/sprites/container/creative_inventory/tab_bottom_unselected_7.png","/assets/minecraft/textures/gui/sprites/server_list/ping_5.png","/assets/minecraft/textures/gui/sprites/server_list/ping_4.png","/assets/minecraft/textures/gui/sprites/server_list/ping_3.png","/assets/minecraft/textures/gui/sprites/server_list/ping_2.png","/assets/minecraft/textures/gui/sprites/server_list/ping_1.png","/assets/minecraft/textures/gui/sprites/server_list/unreachable.png","/assets/minecraft/textures/gui/sprites/server_list/join.png","/assets/minecraft/textures/gui/sprites/server_list/join_highlighted.png","/assets/minecraft/textures/gui/sprites/world_list/join.png","/assets/minecraft/textures/gui/sprites/world_list/join_highlighted.png","/assets/minecraft/textures/gui/sprites/toast/advancement.png","/assets/minecraft/textures/gui/sprites/toast/system.png","/assets/minecraft/textures/gui/sprites/gamemode_switcher/slot.png","/assets/minecraft/textures/gui/sprites/gamemode_switcher/selection.png","/assets/minecraft/textures/misc/unknown_pack.png","/assets/minecraft/textures/misc/unknown_server.png","/assets/minecraft/textures/entity/player/wide/steve.png"];class dy{constructor(t,e,n){I(this,"canvas");I(this,"ctx");I(this,"guiScale",3);I(this,"scaledWidth",640);I(this,"scaledHeight",360);I(this,"images",new Map);I(this,"loading",new Set);this.font=e,this.itemRenderer=n,this.canvas=t,this.ctx=t.getContext("2d"),this.ctx.imageSmoothingEnabled=!1}async preload(){await Promise.all(uy.map(t=>this.loadImage(t)))}loadImage(t){return this.images.has(t)?Promise.resolve(this.images.get(t)):new Promise(e=>{const n=new Image;n.onload=()=>{this.images.set(t,n),e(n)},n.onerror=()=>e(null),n.src=t})}getImage(t){const e=this.images.get(t);return e||(this.loading.has(t)||(this.loading.add(t),this.loadImage(t).then(()=>this.loading.delete(t))),null)}updateScale(t=0){const e=window.innerWidth,n=window.innerHeight;let s=1;for(;s<4&&e/(s+1)>=320&&n/(s+1)>=240;)s++;this.guiScale=t>0?Math.min(t,s):s,this.scaledWidth=Math.ceil(e/this.guiScale),this.scaledHeight=Math.ceil(n/this.guiScale);const r=this.scaledWidth*this.guiScale,o=this.scaledHeight*this.guiScale;(this.canvas.width!==r||this.canvas.height!==o)&&(this.canvas.width=r,this.canvas.height=o),this.ctx.setTransform(this.guiScale,0,0,this.guiScale,0,0),this.ctx.imageSmoothingEnabled=!1}clear(){this.ctx.clearRect(0,0,this.scaledWidth,this.scaledHeight)}fill(t,e,n,s,r){this.ctx.fillStyle=r,this.ctx.fillRect(Math.floor(t),Math.floor(e),Math.floor(n-t),Math.floor(s-e))}fillGradient(t,e,n,s,r,o){const a=this.ctx.createLinearGradient(0,e,0,s);a.addColorStop(0,r),a.addColorStop(1,o),this.ctx.fillStyle=a,this.ctx.fillRect(Math.floor(t),Math.floor(e),Math.floor(n-t),Math.floor(s-e))}blit(t,e,n,s,r,o,a,c=256,l=256){const h=this.getImage(t);if(!h)return;const f=h.width/c,u=h.height/l;this.ctx.imageSmoothingEnabled=!1,this.ctx.drawImage(h,s*f,r*u,o*f,a*u,Math.floor(e),Math.floor(n),Math.floor(o),Math.floor(a))}blitSprite(t,e,n,s,r){const o=this.getImage(t);o&&(this.ctx.imageSmoothingEnabled=!1,this.ctx.drawImage(o,0,0,o.width,o.height,Math.floor(e),Math.floor(n),Math.floor(s),Math.floor(r)))}blitNineSlice(t,e,n,s,r,o=3,a=3,c=3,l=3){const h=this.getImage(t);if(!h){this.fill(e,n,e+s,n+r,"#555555");return}e=Math.floor(e),n=Math.floor(n),s=Math.floor(s),r=Math.floor(r);const f=h.width,u=h.height;if(this.ctx.imageSmoothingEnabled=!1,r===u&&s<=f){const g=Math.floor(s/2),w=s-g;this.ctx.drawImage(h,0,0,g,u,e,n,g,r),this.ctx.drawImage(h,f-w,0,w,u,e+g,n,w,r);return}const d=Math.max(0,s-o-c),p=Math.max(0,r-a-l),_=f-o-c,m=u-a-l;this.ctx.drawImage(h,0,0,o,a,e,n,o,a),this.ctx.drawImage(h,f-c,0,c,a,e+s-c,n,c,a),this.ctx.drawImage(h,0,u-l,o,l,e,n+r-l,o,l),this.ctx.drawImage(h,f-c,u-l,c,l,e+s-c,n+r-l,c,l),d>0&&(this.ctx.drawImage(h,o,0,_,a,e+o,n,d,a),this.ctx.drawImage(h,o,u-l,_,l,e+o,n+r-l,d,l)),p>0&&(this.ctx.drawImage(h,0,a,o,m,e,n+a,o,p),this.ctx.drawImage(h,f-c,a,c,m,e+s-c,n+a,c,p)),d>0&&p>0&&this.ctx.drawImage(h,o,a,_,m,e+o,n+a,d,p)}blitTiled(t,e,n,s,r,o=16,a=16){const c=this.getImage(t);if(c){e=Math.floor(e),n=Math.floor(n),s=Math.floor(s),r=Math.floor(r),this.ctx.save(),this.ctx.beginPath(),this.ctx.rect(e,n,s,r),this.ctx.clip(),this.ctx.imageSmoothingEnabled=!1;for(let l=n;l<n+r;l+=a)for(let h=e;h<e+s;h+=o)this.ctx.drawImage(c,0,0,c.width,c.height,h,l,o,a);this.ctx.restore()}}renderMenuBackground(t,e,n){const s=t?"/assets/minecraft/textures/gui/inworld_menu_background.png":"/assets/minecraft/textures/gui/menu_background.png";if(this.blitTiled(s,0,0,this.scaledWidth,this.scaledHeight,16,16),e!==void 0&&n!==void 0){const r=t?"/assets/minecraft/textures/gui/inworld_menu_list_background.png":"/assets/minecraft/textures/gui/menu_list_background.png";this.blitTiled(r,0,e,this.scaledWidth,n-e,16,16);const o=t?"/assets/minecraft/textures/gui/inworld_header_separator.png":"/assets/minecraft/textures/gui/header_separator.png",a=t?"/assets/minecraft/textures/gui/inworld_footer_separator.png":"/assets/minecraft/textures/gui/footer_separator.png";this.blitTiled(o,0,e-2,this.scaledWidth,2,32,2),this.blitTiled(a,0,n,this.scaledWidth,2,32,2)}}drawButton(t,e,n,s,r,o,a=!0){const c=a?o?"/assets/minecraft/textures/gui/sprites/widget/button_highlighted.png":"/assets/minecraft/textures/gui/sprites/widget/button.png":"/assets/minecraft/textures/gui/sprites/widget/button_disabled.png";this.blitNineSlice(c,t,e,n,s,3,3,3,3);const l=a?"#FFFFFF":"#A0A0A0";this.font.drawCentered(this.ctx,r,t+Math.floor(n/2),e+Math.floor((s-8)/2),l,a)}drawIconButton(t,e,n,s,r,o,a,c,l=!0){const h=l?c?"/assets/minecraft/textures/gui/sprites/widget/button_highlighted.png":"/assets/minecraft/textures/gui/sprites/widget/button.png":"/assets/minecraft/textures/gui/sprites/widget/button_disabled.png";this.blitNineSlice(h,t,e,n,s,3,3,3,3),this.blitSprite(r,t+Math.floor((n-o)/2),e+Math.floor((s-a)/2),o,a)}drawSlider(t,e,n,s,r,o,a){const c=a?"/assets/minecraft/textures/gui/sprites/widget/slider_highlighted.png":"/assets/minecraft/textures/gui/sprites/widget/slider.png",l=a?"/assets/minecraft/textures/gui/sprites/widget/slider_handle_highlighted.png":"/assets/minecraft/textures/gui/sprites/widget/slider_handle.png";this.blitNineSlice(c,t,e,n,s,3,3,3,3);const h=Math.max(0,Math.min(1,o)),f=Math.floor(t+h*(n-8));this.blitNineSlice(l,f,e,8,s,2,3,2,3),this.font.drawCentered(this.ctx,r,t+Math.floor(n/2),e+Math.floor((s-8)/2),"#FFFFFF",!0)}drawEditBox(t,e,n,s,r,o,a,c){c&&this.font.draw(this.ctx,c,t,e-11,"#A0A0A0",!0);const l=a?"/assets/minecraft/textures/gui/sprites/widget/text_field_highlighted.png":"/assets/minecraft/textures/gui/sprites/widget/text_field.png";this.blitNineSlice(l,t,e,n,s,2,2,2,2);const h=e+Math.floor((s-8)/2);if(r.length>0||a){const f=a&&Math.floor(performance.now()/300)%2===0?"_":"";this.font.draw(this.ctx,r+f,t+4,h,"#E0E0E0",!0)}else o&&this.font.draw(this.ctx,o,t+4,h,"#707070",!0)}renderItem(t,e,n,s){if(!t||e<=0)return;n=Math.floor(n),s=Math.floor(s);const r=this.itemRenderer.getIcon(t);if(r?(this.ctx.imageSmoothingEnabled=!1,this.ctx.drawImage(r,0,0,r.width,r.height,n,s,16,16)):this.fill(n+2,s+2,n+14,s+14,"#888888"),e>1){const o=String(e),a=this.font.width(o);this.font.draw(this.ctx,o,n+17-a,s+9,"#FFFFFF",!0)}}renderPlayerDoll(t,e,n,s,r,o,a){const c=this.getImage("/assets/minecraft/textures/entity/player/wide/steve.png");if(!c)return;const l=(t+n)*.5,h=Math.floor((e+s)*.5)-6,f=h-6,u=Math.atan((r-l)/40),d=Math.atan((o-f)/40),p=u*(22*Math.PI/180),_=d*(8*Math.PI/180),m=u*(42*Math.PI/180),g=d*(24*Math.PI/180),w=1.48,E=[],y=(S,M,R,v,x)=>{const C=Math.cos(x),L=Math.sin(x),U=M*C-R*L,D=M*L+R*C,O=Math.cos(v),H=Math.sin(v),$=S*O+D*H,z=-S*H+D*O;return{sx:l+$*w,sy:h-U*w,z}},b=(S,M,R,v,x,C,L,U,D,O,H,$,z,q=0,et=!1)=>{const gt=[{v00:[S,x,C],v10:[v,x,C],v01:[S,M,C],v11:[v,M,C],u:L+H,v:U+H,uw:D,vh:O,shade:1},{v00:[v,x,R],v10:[S,x,R],v01:[v,M,R],v11:[S,M,R],u:L+2*H+D,v:U+H,uw:D,vh:O,shade:.75},{v00:[v,x,C],v10:[v,x,R],v01:[v,M,C],v11:[v,M,R],u:L+H+D,v:U+H,uw:H,vh:O,shade:.82},{v00:[S,x,R],v10:[S,x,C],v01:[S,M,R],v11:[S,M,C],u:L,v:U+H,uw:H,vh:O,shade:.82},{v00:[S,x,R],v10:[v,x,R],v01:[S,x,C],v11:[v,x,C],u:L+H,v:U,uw:D,vh:H,shade:1},{v00:[S,M,C],v10:[v,M,C],v01:[S,M,R],v11:[v,M,R],u:L+H+D,v:U,uw:D,vh:H,shade:.65}];for(const _t of gt){const Pt=y(_t.v00[0],_t.v00[1],_t.v00[2],$,z),Z=y(_t.v10[0],_t.v10[1],_t.v10[2],$,z),it=y(_t.v01[0],_t.v01[1],_t.v01[2],$,z),vt=y(_t.v11[0],_t.v11[1],_t.v11[2],$,z),ot=Z.sx-Pt.sx,Et=Z.sy-Pt.sy,Rt=it.sx-Pt.sx,Nt=it.sy-Pt.sy;if(ot*Nt-Et*Rt>.05){const Ot=(Pt.z+Z.z+it.z+vt.z)*.25+q;E.push({avgZ:Ot,u:_t.u,v:_t.v,uw:_t.uw,vh:_t.vh,p00:Pt,p10:Z,p01:it,shade:_t.shade,isOverlay:et})}}};b(-4,-24,-2,0,-12,2,0,16,4,12,4,p,_),b(0,-24,-2,4,-12,2,16,48,4,12,4,p,_),b(-4,-12,-2,4,0,2,16,16,8,12,4,p,_),b(-4.15,-12.15,-2.15,4.15,.15,2.15,16,32,8,12,4,p,_,.1,!0),b(-8,-12,-2,-4,0,2,40,16,4,12,4,p,_),b(4,-12,-2,8,0,2,32,48,4,12,4,p,_),b(-4,0,-4,4,8,4,0,0,8,8,8,m,g,6),b(-4.35,-.35,-4.35,4.35,8.35,4.35,32,0,8,8,8,m,g,6.2,!0),E.sort((S,M)=>S.avgZ-M.avgZ),this.ctx.save(),this.ctx.beginPath(),this.ctx.rect(t,e,n-t,s-e),this.ctx.clip(),this.ctx.imageSmoothingEnabled=!1;for(const S of E){const M=(S.p10.sx-S.p00.sx)/S.uw,R=(S.p10.sy-S.p00.sy)/S.uw,v=(S.p01.sx-S.p00.sx)/S.vh,x=(S.p01.sy-S.p00.sy)/S.vh;this.ctx.save(),this.ctx.transform(M,R,v,x,S.p00.sx,S.p00.sy),this.ctx.drawImage(c,S.u,S.v,S.uw,S.vh,0,0,S.uw,S.vh),!S.isOverlay&&S.shade<.99&&(this.ctx.fillStyle=`rgba(0, 0, 0, ${(1-S.shade).toFixed(2)})`,this.ctx.fillRect(0,0,S.uw,S.vh)),this.ctx.restore()}if(a){const S=this.itemRenderer.getIcon(a);if(S){const M=y(-6,-10,2.5,p,_);this.ctx.drawImage(S,0,0,S.width,S.height,Math.round(M.sx-6),Math.round(M.sy-5),11,11)}}this.ctx.restore()}renderSlotHighlight(t,e){this.fill(t,e,t+16,e+16,"rgba(255, 255, 255, 0.5)")}renderTooltip(t,e,n){if(t.length===0)return;let s=0;for(const h of t){const f=this.font.width(h);f>s&&(s=f)}const r=s+8,o=t.length*10+(t.length>1?2:0)+6;let a=Math.floor(e+12),c=Math.floor(n-12);a+r>this.scaledWidth-4&&(a=Math.max(4,Math.floor(e-r-12))),c+o>this.scaledHeight-4&&(c=this.scaledHeight-o-4),c<4&&(c=4),this.fill(a+1,c,a+r-1,c+o,"rgba(16, 0, 16, 0.94)"),this.fill(a,c+1,a+1,c+o-1,"rgba(16, 0, 16, 0.94)"),this.fill(a+r-1,c+1,a+r,c+o-1,"rgba(16, 0, 16, 0.94)"),this.fill(a+1,c+1,a+r-1,c+2,"rgba(80, 0, 255, 0.5)"),this.fill(a+1,c+o-2,a+r-1,c+o-1,"rgba(40, 0, 127, 0.5)"),this.fillGradient(a+1,c+2,a+2,c+o-2,"rgba(80, 0, 255, 0.5)","rgba(40, 0, 127, 0.5)"),this.fillGradient(a+r-2,c+2,a+r-1,c+o-2,"rgba(80, 0, 255, 0.5)","rgba(40, 0, 127, 0.5)");let l=c+4;for(let h=0;h<t.length;h++)this.font.draw(this.ctx,t[h],a+4,l,h===0?"#FFFFFF":"#AAAAAA",!0),l+=h===0&&t.length>1?12:10}}class fy{constructor(){I(this,"iconCache",new Map);I(this,"itemImageCache",new Map);I(this,"loadingImages",new Set)}getIcon(t){if(!t)return null;const e=this.iconCache.get(t.id);if(e)return e;const n=t.shortId,s=t.isBlock&&t.blockNumId!==void 0?nt.getBlock(t.blockNumId):null;if(!s||s.shape==="cross"||s.shape==="torch"||s.shape==="campfire"||s.shape==="door_bottom"||n.endsWith("_cushion")||n==="torch"||n==="campfire"||n==="lantern"){let _=`/assets/minecraft/textures/${t.texture}.png`;n==="campfire"?_="/assets/minecraft/textures/item/campfire.png":n==="lantern"&&(_="/assets/minecraft/textures/item/lantern.png");const m=this.getOrLoadImage(_,t.id);if(m){const g=this.renderFlatIcon(m,s==null?void 0:s.tint);return this.iconCache.set(t.id,g),g}return null}const o=_e.loadedImages.get(s.textures.top)||this.getOrLoadImage(`/assets/minecraft/textures/block/${s.textures.top}.png`,t.id),a=_e.loadedImages.get(s.textures.north)||this.getOrLoadImage(`/assets/minecraft/textures/block/${s.textures.north}.png`,t.id),c=_e.loadedImages.get(s.textures.east)||this.getOrLoadImage(`/assets/minecraft/textures/block/${s.textures.east}.png`,t.id);if(!o||!a||!c)return null;const l=s.shape==="slab_bottom"||n.endsWith("_slab"),h=s.shape==="bed_foot"||n==="straw_bed",f=s.shape==="stairs"||n.endsWith("_stairs"),u=s.shape==="carpet"||n.endsWith("_carpet")||n.endsWith("_trapdoor"),d=h?.28:l?.5:u?.18:1,p=this.renderIsometricBlock(s.tint,o,a,c,d,f);return this.iconCache.set(t.id,p),p}getOrLoadImage(t,e){const n=this.itemImageCache.get(t);if(n)return n;if(!this.loadingImages.has(t)){this.loadingImages.add(t);const s=new Image;s.onload=()=>{this.itemImageCache.set(t,s),this.loadingImages.delete(t),this.iconCache.delete(e)},s.onerror=()=>{this.loadingImages.delete(t)},s.src=t}return null}tintBiomeFace(t,e,n,s){const r=document.createElement("canvas");r.width=16,r.height=16;const o=r.getContext("2d",{willReadFrequently:!0});o.imageSmoothingEnabled=!1,o.drawImage(t,0,0,16,16,0,0,16,16);const a=o.getImageData(0,0,16,16),c=a.data;let l=1,h=1,f=1;e==="grass"&&n?(l=121/255,h=192/255,f=90/255):e==="foliage"?(l=89/255,h=174/255,f=48/255):e==="birch"?(l=128/255,h=167/255,f=85/255):e==="spruce"?(l=97/255,h=153/255,f=97/255):e==="water"&&(l=63/255,h=118/255,f=228/255);for(let u=0;u<c.length;u+=4)c[u]=Math.min(255,Math.floor(c[u]*l*s)),c[u+1]=Math.min(255,Math.floor(c[u+1]*h*s)),c[u+2]=Math.min(255,Math.floor(c[u+2]*f*s));return o.putImageData(a,0,0),r}renderFlatIcon(t,e){const n=document.createElement("canvas");n.width=32,n.height=32;const s=n.getContext("2d");s.imageSmoothingEnabled=!1;const r=this.tintBiomeFace(t,e,!0,1);return s.drawImage(r,0,0,16,16,0,0,32,32),n}renderIsometricBlock(t,e,n,s,r,o){const a=document.createElement("canvas");a.width=32,a.height=32;const c=a.getContext("2d");c.imageSmoothingEnabled=!1;const l=this.tintBiomeFace(e,t,!0,1),h=this.tintBiomeFace(n,t,!1,.8),f=this.tintBiomeFace(s,t,!1,.6),u=Math.round((1-r)*14);if(o)return c.save(),c.transform(.875,.4375,0,.875,2,16),c.drawImage(h,0,8,16,8,0,0,16,8),c.restore(),c.save(),c.transform(.875,-.4375,0,.875,16,23),c.drawImage(f,0,8,16,8,0,0,16,8),c.restore(),c.save(),c.transform(.875,-.4375,.875,.4375,2,16),c.drawImage(l,0,0,16,16,0,0,16,16),c.restore(),c.save(),c.transform(.875,.4375,0,.875,9,5.5),c.drawImage(h,0,0,16,8,0,0,16,8),c.restore(),c.save(),c.transform(.875,-.4375,0,.875,23,12.5),c.drawImage(f,8,0,8,8,0,0,8,8),c.restore(),c.save(),c.transform(.875,-.4375,.875,.4375,9,5.5),c.drawImage(l,8,0,8,16,0,0,8,16),c.restore(),a;const d=Math.max(2,Math.round(16*r)),p=16-d;return c.save(),c.transform(.875,.4375,0,.875,2,9+u),c.drawImage(h,0,p,16,d,0,0,16,d),c.restore(),c.save(),c.transform(.875,-.4375,0,.875,16,16+u),c.drawImage(f,0,p,16,d,0,0,16,d),c.restore(),c.save(),c.transform(.875,-.4375,.875,.4375,2,9+u),c.drawImage(l,0,0,16,16,0,0,16,16),c.restore(),a}}const Za=["Wilderness Bound!","26.3 Official Port!","Poplar Trees & Cushions!","Abandoned Camps!","Wispcraft Wisp v2 Ready!","100% Unobfuscated 26.3!","Concrete Stairs & Slabs!","Wool Stairs & Slabs!","Rest on a Straw Bed!"];class py{constructor(t,e,n,s){I(this,"root");I(this,"player");I(this,"inventory");I(this,"world");I(this,"font");I(this,"itemRenderer");I(this,"gui");I(this,"state","TITLE");I(this,"previousState","TITLE");I(this,"activeContainerTab","inventory");I(this,"creativeTab","building");I(this,"creativeScrollRow",0);I(this,"searchQuery","");I(this,"mouseX",0);I(this,"mouseY",0);I(this,"interactiveRects",[]);I(this,"activeSlider",null);I(this,"isRightMouseDown",!1);I(this,"isLeftMouseDown",!1);I(this,"lastRightDragSlotKey","");I(this,"rightHoldTimer",0);I(this,"rightRepeatTimer",0);I(this,"leftDragItem",null);I(this,"leftDragTotalCount",0);I(this,"leftDragSlots",[]);I(this,"showRecipeBook",!1);I(this,"focusedEditBox",null);I(this,"worldSearchText","");I(this,"newWorldName","New World");I(this,"newWorldSeed","");I(this,"newWorldMode","survival");I(this,"newWorldDifficulty","Normal");I(this,"createWorldTab",0);I(this,"savedWorlds",[{id:"world_survival_random",name:"New World",folder:"New_World (10/28/26, 9:20 PM)",lastPlayed:"Survival Mode, Version: 26.3",gameMode:"survival",seed:String(Math.floor(Math.random()*2147483647))},{id:"world_creative_random",name:"26.3 Creative World",folder:"26_3_Creative (10/28/26, 9:20 PM)",lastPlayed:"Creative Mode, Cheats, Version: 26.3",gameMode:"creative",seed:String(Math.floor(Math.random()*2147483647))}]);I(this,"selectedWorldIdx",0);I(this,"selectedServerIdx",0);I(this,"directConnectModal",!1);I(this,"directConnectIp","127.0.0.1:25565");I(this,"connectingStatus","Connecting to server...");I(this,"showDebugF3",!1);I(this,"fps",60);I(this,"splashText",Za[0]);I(this,"chatHistory",[{text:'§eWelcome to §aMinecraft 26.3 ("Wilderness Bound")§e Official Web Port!',time:performance.now()},{text:"§7Press §fE§7 for Inventory, §fF3§7 for Debug Info, §fT§7 or §f/§7 for Chat, §fEsc§7 for Game Menu.",time:performance.now()}]);I(this,"chatInputText","");I(this,"heldItemTooltipTimer",0);I(this,"lastHeldItemId","");I(this,"activeToast",null);I(this,"activeWorldId","world_survival_random");I(this,"onStartGame");I(this,"onQuitToTitle");this.root=t,this.player=e,this.inventory=n,this.world=s;try{const o=localStorage.getItem("mc26_3_saved_worlds_v1");if(o){const a=JSON.parse(o);Array.isArray(a)&&a.length>0&&(this.savedWorlds=a)}}catch{}this.root.innerHTML="";const r=document.createElement("canvas");r.id="gui-canvas",r.style.cssText="position:fixed;inset:0;width:100vw;height:100vh;image-rendering:pixelated;pointer-events:auto;z-index:20;",this.root.appendChild(r),this.font=new Cs,this.itemRenderer=new fy,this.gui=new dy(r,this.font,this.itemRenderer),this.bindCanvasEvents(r)}async initAssets(){await Promise.all([this.font.init(),this.gui.preload()])}showToast(t,e,n){this.activeToast={title:t,subtitle:e,item:n&&nt.getItem(n)||null,startTime:performance.now()}}setState(t){var n,s;if(this.state!==t&&(this.previousState=this.state),this.state=t,this.focusedEditBox=null,this.activeSlider=null,t!=="INVENTORY"){this.inventory.cursorStack&&(this.inventory.addItem(this.inventory.cursorStack.item.shortId,this.inventory.cursorStack.count),this.inventory.cursorStack=null);for(let r=0;r<this.inventory.crafting2x2.length;r++){const o=this.inventory.crafting2x2[r];o&&(this.inventory.addItem(o.item.shortId,o.count),this.inventory.crafting2x2[r]=null)}for(let r=0;r<this.inventory.crafting3x3.length;r++){const o=this.inventory.crafting3x3[r];o&&(this.inventory.addItem(o.item.shortId,o.count),this.inventory.crafting3x3[r]=null)}}const e=this.gui.canvas;if(t==="IN_GAME"){e.style.pointerEvents="none";const r=document.getElementById("game-canvas");(n=r==null?void 0:r.requestPointerLock)==null||n.call(r)}else e.style.pointerEvents="auto",document.pointerLockElement&&((s=document.exitPointerLock)==null||s.call(document)),t==="PAUSE"?this.saveActiveWorldState():t==="CHAT"?this.focusedEditBox="chat":t==="INVENTORY"&&this.creativeTab==="search"&&this.player.gameMode==="creative"&&(this.focusedEditBox="creative_search");this.render()}updateHUDOnly(){const t=this.inventory.getHeldStack(),e=t?t.item.id:"";e!==this.lastHeldItemId&&(this.lastHeldItemId=e,t&&(this.heldItemTooltipTimer=2.5))}addChatMessage(t){this.chatHistory.push({text:t,time:performance.now()}),this.chatHistory.length>40&&this.chatHistory.shift()}bindCanvasEvents(t){window.addEventListener("mousemove",e=>{if(this.gui.updateScale(le.current.guiScale),this.mouseX=e.clientX/this.gui.guiScale,this.mouseY=e.clientY/this.gui.guiScale,this.activeSlider&&this.activeSlider.onDrag){const n=(this.mouseX-this.activeSlider.x)/this.activeSlider.w;this.activeSlider.onDrag(Math.max(0,Math.min(1,n)))}if(this.isRightMouseDown&&this.state==="INVENTORY")for(let n=this.interactiveRects.length-1;n>=0;n--){const s=this.interactiveRects[n];if(s.isSlot&&s.slotKey&&s.onRightDragPlace&&this.mouseX>=s.x&&this.mouseX<s.x+s.w&&this.mouseY>=s.y&&this.mouseY<s.y+s.h){s.slotKey!==this.lastRightDragSlotKey&&(this.lastRightDragSlotKey=s.slotKey,this.rightHoldTimer=0,this.rightRepeatTimer=0,s.onRightDragPlace());break}}if(this.isLeftMouseDown&&this.state==="INVENTORY"&&this.leftDragItem&&this.leftDragTotalCount>1)for(let n=this.interactiveRects.length-1;n>=0;n--){const s=this.interactiveRects[n];if(s.isSlot&&s.slotKey&&s.getSlot&&s.setSlot&&this.mouseX>=s.x&&this.mouseX<s.x+s.w&&this.mouseY>=s.y&&this.mouseY<s.y+s.h){if(!this.leftDragSlots.some(r=>r.key===s.slotKey)){const r=s.getSlot();if(!r||r.item.id===this.leftDragItem.id&&r.count<this.leftDragItem.maxStack){this.leftDragSlots.push({key:s.slotKey,baseCount:r?r.count:0,getSlot:s.getSlot,setSlot:s.setSlot});const o=this.leftDragSlots.length,a=Math.max(1,Math.floor(this.leftDragTotalCount/o));let c=this.leftDragTotalCount;for(const l of this.leftDragSlots){const h=Math.min(c,a,this.leftDragItem.maxStack-l.baseCount);h+l.baseCount>0?l.setSlot({item:this.leftDragItem,count:l.baseCount+h}):l.setSlot(null),c-=h}this.inventory.cursorStack=c>0?{item:this.leftDragItem,count:c}:null}}break}}}),t.addEventListener("mousedown",e=>{e.preventDefault(),this.gui.updateScale(le.current.guiScale),this.mouseX=e.clientX/this.gui.guiScale,this.mouseY=e.clientY/this.gui.guiScale,this.focusedEditBox=null,e.button===2?(this.isRightMouseDown=!0,this.rightHoldTimer=0,this.rightRepeatTimer=0):e.button===0&&(this.isLeftMouseDown=!0,this.rightHoldTimer=0,this.rightRepeatTimer=0,this.leftDragItem=null,this.leftDragTotalCount=0,this.leftDragSlots=[]);for(let n=this.interactiveRects.length-1;n>=0;n--){const s=this.interactiveRects[n];if(this.mouseX>=s.x&&this.mouseX<s.x+s.w&&this.mouseY>=s.y&&this.mouseY<s.y+s.h){if(s.onDrag){this.activeSlider=s;const r=(this.mouseX-s.x)/s.w;s.onDrag(Math.max(0,Math.min(1,r))),pe.play("ui.button.click",.7);return}if(s.onClick){if(s.isSlot||pe.play("ui.button.click",.8),e.button===2&&s.slotKey&&(this.lastRightDragSlotKey=s.slotKey),e.button===0&&!e.shiftKey&&s.isSlot&&s.slotKey&&s.getSlot&&s.setSlot&&this.inventory.cursorStack&&this.inventory.cursorStack.count>1){const r=s.getSlot();(!r||r.item.id===this.inventory.cursorStack.item.id&&r.count<r.item.maxStack)&&(this.leftDragItem=this.inventory.cursorStack.item,this.leftDragTotalCount=this.inventory.cursorStack.count,this.leftDragSlots=[{key:s.slotKey,baseCount:r?r.count:0,getSlot:s.getSlot,setSlot:s.setSlot}])}s.onClick(e.button,e.shiftKey);return}}}this.state==="INVENTORY"&&this.inventory.cursorStack&&(this.inventory.addItem(this.inventory.cursorStack.item.shortId,this.inventory.cursorStack.count),this.inventory.cursorStack=null)}),window.addEventListener("mouseup",e=>{this.activeSlider=null,e.button===2?(this.isRightMouseDown=!1,this.lastRightDragSlotKey=""):e.button===0&&(this.isLeftMouseDown=!1,this.leftDragItem=null,this.leftDragTotalCount=0,this.leftDragSlots=[]),this.rightHoldTimer=0,this.rightRepeatTimer=0}),t.addEventListener("contextmenu",e=>e.preventDefault()),t.addEventListener("wheel",e=>{if(this.state==="INVENTORY"&&this.player.gameMode==="creative"){const n=e.deltaY>0?1:-1;this.creativeScrollRow=Math.max(0,this.creativeScrollRow+n)}}),window.addEventListener("keydown",e=>{if(this.state==="INVENTORY"&&!this.focusedEditBox&&e.code.startsWith("Digit")&&!e.ctrlKey&&!e.metaKey&&!e.altKey){const n=parseInt(e.code.replace("Digit",""),10);if(n>=1&&n<=9){const s=n-1;for(let r=this.interactiveRects.length-1;r>=0;r--){const o=this.interactiveRects[r];if(o.isSlot&&o.onHotbarKeySwap&&this.mouseX>=o.x&&this.mouseX<o.x+o.w&&this.mouseY>=o.y&&this.mouseY<o.y+o.h){e.preventDefault(),o.onHotbarKeySwap(s);return}}}}if(this.focusedEditBox){if(e.key==="Escape"){this.state==="CHAT"?(this.chatInputText="",this.setState("IN_GAME")):this.focusedEditBox=null;return}if(e.key==="Enter"){if(this.state==="CHAT"){const n=this.chatInputText.trim();this.chatInputText="",n&&this.handleChatSubmit(n),this.setState("IN_GAME")}else this.focusedEditBox=null;return}if(e.key==="Backspace"){e.preventDefault(),this.modifyFocusedText(n=>n.slice(0,-1));return}e.key.length===1&&!e.ctrlKey&&!e.metaKey&&!e.altKey&&(e.preventDefault(),this.modifyFocusedText(n=>n.length<80?n+e.key:n))}})}modifyFocusedText(t){switch(this.focusedEditBox){case"world_search":this.worldSearchText=t(this.worldSearchText);break;case"world_name":this.newWorldName=t(this.newWorldName);break;case"world_seed":this.newWorldSeed=t(this.newWorldSeed);break;case"direct_ip":this.directConnectIp=t(this.directConnectIp);break;case"wisp_url":se.wispProxyUrl=t(se.wispProxyUrl);break;case"wisp_user":se.username=t(se.username);break;case"creative_search":this.searchQuery=t(this.searchQuery),this.creativeScrollRow=0;break;case"chat":this.chatInputText=t(this.chatInputText);break}}addButton(t,e,n,s,r,o,a=!0){const c=a&&this.mouseX>=t&&this.mouseX<t+n&&this.mouseY>=e&&this.mouseY<e+s;this.gui.drawButton(t,e,n,s,r,c,a),a&&this.interactiveRects.push({x:t,y:e,w:n,h:s,onClick:()=>o()})}addIconButton(t,e,n,s,r,o,a,c,l){const h=this.mouseX>=t&&this.mouseX<t+n&&this.mouseY>=e&&this.mouseY<e+s;this.gui.drawIconButton(t,e,n,s,r,o,a,h,!0),this.interactiveRects.push({x:t,y:e,w:n,h:s,onClick:()=>c(),tooltip:l})}addSlider(t,e,n,s,r,o,a){const c=this.mouseX>=t&&this.mouseX<t+n&&this.mouseY>=e&&this.mouseY<e+s;this.gui.drawSlider(t,e,n,s,r,o,c),this.interactiveRects.push({x:t,y:e,w:n,h:s,onDrag:a})}addEditBox(t,e,n,s,r,o,a,c){const l=this.focusedEditBox===r;this.gui.drawEditBox(t,e,n,s,o,a,l,c),this.interactiveRects.push({x:t,y:e,w:n,h:s,onClick:()=>{this.focusedEditBox=r}})}render(t=.016){var e;if(this.heldItemTooltipTimer>0&&(this.heldItemTooltipTimer=Math.max(0,this.heldItemTooltipTimer-t)),(this.isRightMouseDown||this.isLeftMouseDown)&&this.state==="INVENTORY"&&(this.rightHoldTimer+=t,this.rightHoldTimer>=.22))for(this.rightRepeatTimer+=t;this.rightRepeatTimer>=.085;){this.rightRepeatTimer-=.085;for(let n=this.interactiveRects.length-1;n>=0;n--){const s=this.interactiveRects[n];if(s.isSlot&&this.mouseX>=s.x&&this.mouseX<s.x+s.w&&this.mouseY>=s.y&&this.mouseY<s.y+s.h){this.isRightMouseDown&&s.onRightDragPlace?s.onRightDragPlace():this.isLeftMouseDown&&((e=s.slotKey)!=null&&e.startsWith("craft_out_"))&&s.onClick&&s.onClick(0,!1);break}}}switch(this.gui.updateScale(le.current.guiScale),this.gui.clear(),this.interactiveRects=[],this.state){case"TITLE":this.renderTitleScreen();break;case"SINGLEPLAYER_SELECT":this.renderSelectWorldScreen();break;case"CREATE_WORLD":this.renderCreateWorldScreen();break;case"MULTIPLAYER_SELECT":this.renderJoinMultiplayerScreen();break;case"WISPCRAFT_CONFIG":this.renderWispcraftConfigScreen();break;case"CONNECTING":this.renderConnectingScreen();break;case"OPTIONS":this.renderOptionsScreen();break;case"IN_GAME":this.renderHUD(!1);break;case"CHAT":this.renderHUD(!0);break;case"PAUSE":this.renderHUD(!1),this.renderPauseScreen();break;case"ADVANCEMENTS":this.renderHUD(!1),this.renderAdvancementsScreen();break;case"INVENTORY":this.renderHUD(!1),this.renderContainerScreen();break}for(let n=this.interactiveRects.length-1;n>=0;n--){const s=this.interactiveRects[n];if(s.tooltip&&this.mouseX>=s.x&&this.mouseX<s.x+s.w&&this.mouseY>=s.y&&this.mouseY<s.y+s.h){this.gui.renderTooltip(s.tooltip,this.mouseX,this.mouseY);break}}this.renderToastOverlay()}renderTitleScreen(){const t=this.gui.scaledWidth,e=this.gui.scaledHeight;this.gui.blitSprite("/assets/minecraft/textures/gui/panorama_overlay.png",0,0,t,e);const n=Math.floor(t/2)-128,s=30;this.gui.blit("/assets/minecraft/textures/gui/title/minecraft.png",n,s,0,0,256,44,256,64),this.gui.blit("/assets/minecraft/textures/gui/title/edition.png",Math.floor(t/2)-64,s+37,0,0,128,14,128,16);const r=this.gui.ctx;r.save(),r.translate(Math.floor(t/2)+123,69),r.rotate(-.34906584);const o=this.font.width(this.splashText),c=(1.8-Math.abs(Math.sin(performance.now()%1e3/1e3*Math.PI*2)*.1))*100/(o+32);r.scale(c,c),this.font.draw(r,this.splashText,Math.floor(-o/2),-8,"#FFFF00",!0),r.restore();const l=Math.floor(e/4)+48,h=Math.floor(t/2);this.addButton(h-100,l,200,20,"Singleplayer",()=>{this.setState("SINGLEPLAYER_SELECT")}),this.addButton(h-100,l+24,200,20,"Multiplayer",()=>{se.pingAllServers().then(()=>{this.state==="MULTIPLAYER_SELECT"&&this.render()}),this.setState("MULTIPLAYER_SELECT")}),this.addButton(h-100,l+48,200,20,"Minecraft Realms",()=>{this.setState("WISPCRAFT_CONFIG")}),this.gui.blitSprite("/assets/minecraft/textures/gui/sprites/icon/unseen_notification.png",h+82,l+53,10,10);const f=l+84;this.addIconButton(h-124,f,20,20,"/assets/minecraft/textures/gui/sprites/icon/language.png",15,15,()=>{this.setState("OPTIONS")},["Language..."]),this.addButton(h-100,f,98,20,"Options...",()=>{this.setState("OPTIONS")}),this.addButton(h+2,f,98,20,"Quit Game",()=>{this.splashText=Za[Math.floor(Math.random()*Za.length)]}),this.addIconButton(h+104,f,20,20,"/assets/minecraft/textures/gui/sprites/icon/accessibility.png",15,15,()=>{this.setState("OPTIONS")},["Accessibility Settings..."]),this.font.draw(r,"Minecraft 26.3",2,e-10,"#FFFFFF",!0);const u="Copyright Mojang AB. Do not distribute!";this.font.draw(r,u,t-this.font.width(u)-2,e-10,"#FFFFFF",!0)}renderSelectWorldScreen(){const t=this.gui.scaledWidth,e=this.gui.scaledHeight,n=Math.floor(t/2);this.gui.renderMenuBackground(!1,48,e-64),this.font.drawCentered(this.gui.ctx,"Select World",n,8,"#FFFFFF",!0),this.addEditBox(n-100,22,200,20,"world_search",this.worldSearchText,"Search worlds...");const s=this.savedWorlds.filter(a=>a.name.toLowerCase().includes(this.worldSearchText.toLowerCase())),r=n-135;let o=54;for(let a=0;a<s.length;a++){const c=s[a],l=a===this.selectedWorldIdx,h=this.mouseX>=r&&this.mouseX<r+270&&this.mouseY>=o&&this.mouseY<o+36;if(l&&(this.gui.fill(r-1,o-1,r+271,o+37,"#FFFFFF"),this.gui.fill(r,o,r+270,o+36,"#000000")),this.gui.blitSprite("/assets/minecraft/textures/misc/unknown_pack.png",r+2,o+2,32,32),h){this.gui.fill(r+2,o+2,r+34,o+34,"rgba(0,0,0,0.45)");const u=this.mouseX<r+34?"/assets/minecraft/textures/gui/sprites/world_list/join_highlighted.png":"/assets/minecraft/textures/gui/sprites/world_list/join.png";this.gui.blitSprite(u,r+2,o+2,32,32)}this.font.draw(this.gui.ctx,c.name,r+37,o+3,"#FFFFFF",!0),this.font.draw(this.gui.ctx,c.folder,r+37,o+14,"#808080",!0),this.font.draw(this.gui.ctx,c.lastPlayed,r+37,o+25,"#808080",!0);const f=a;this.interactiveRects.push({x:r,y:o,w:270,h:36,onClick:()=>{this.selectedWorldIdx===f&&this.mouseX<r+34?this.launchSelectedWorld():this.selectedWorldIdx=f}}),o+=38}this.addButton(n-154,e-52,150,20,"Play Selected World",()=>{this.launchSelectedWorld()}),this.addButton(n+4,e-52,150,20,"Create New World",()=>{this.setState("CREATE_WORLD")}),this.addButton(n-154,e-28,72,20,"Edit",()=>{this.setState("CREATE_WORLD")}),this.addButton(n-76,e-28,72,20,"Delete",()=>{if(this.savedWorlds.length>1){const a=this.savedWorlds.splice(this.selectedWorldIdx,1)[0];if(a)try{localStorage.removeItem(`mc26_3_world_state_${a.id}`)}catch{}this.selectedWorldIdx=0,this.saveWorldsList()}},this.savedWorlds.length>1),this.addButton(n+4,e-28,72,20,"Re-Create",()=>{const a=this.savedWorlds[this.selectedWorldIdx]||this.savedWorlds[0];if(a)try{localStorage.removeItem(`mc26_3_world_state_${a.id}`)}catch{}this.world.blockDiffs.clear(),this.launchSelectedWorld()}),this.addButton(n+82,e-28,72,20,"Cancel",()=>{this.setState("TITLE")})}saveWorldsList(){try{localStorage.setItem("mc26_3_saved_worlds_v1",JSON.stringify(this.savedWorlds))}catch{}}saveActiveWorldState(){if(!(!this.activeWorldId||se.activeSession))try{const t=this.savedWorlds.find(n=>n.id===this.activeWorldId);if(t){const n=new Date,s=n.toLocaleDateString([],{month:"2-digit",day:"2-digit",year:"2-digit"}),r=n.toLocaleTimeString([],{hour:"numeric",minute:"2-digit"});t.folder=`${t.name.replace(/\s+/g,"_")} (${s}, ${r})`,t.gameMode=this.player.gameMode==="creative"?"creative":"survival",t.lastPlayed=`${t.gameMode==="creative"?"Creative":"Survival"} Mode, Version: 26.3`,this.saveWorldsList()}const e={timeOfDay:this.world.timeOfDay,blockDiffs:Array.from(this.world.blockDiffs.entries()),player:{x:this.player.position.x,y:this.player.position.y,z:this.player.position.z,yaw:this.player.yaw,pitch:this.player.pitch,gameMode:this.player.gameMode,flying:this.player.flying,health:this.player.health,hunger:this.player.hunger},inventory:{slots:this.inventory.slots.map(n=>n?{id:n.item.shortId,count:n.count}:null),armor:this.inventory.armorSlots.map(n=>n?{id:n.item.shortId,count:n.count}:null),offhand:this.inventory.offhandSlot?{id:this.inventory.offhandSlot.item.shortId,count:this.inventory.offhandSlot.count}:null,selectedHotbarSlot:this.inventory.selectedHotbarSlot},cushions:Array.from(this.world.entityRenderer.cushions.values()).map(n=>n.data),mobs:Array.from(this.world.entityRenderer.mobs.values()).filter(n=>!n.dead&&n.type!=="remote_player").map(n=>({id:n.id,type:n.type,x:n.x,y:n.y,z:n.z,yaw:n.yaw,health:n.health}))};localStorage.setItem(`mc26_3_world_state_${this.activeWorldId}`,JSON.stringify(e))}catch{}}loadActiveWorldState(){var t;if(!this.activeWorldId)return!1;try{const e=localStorage.getItem(`mc26_3_world_state_${this.activeWorldId}`);if(!e)return!1;const n=JSON.parse(e);if(!n||!n.player)return!1;if(typeof n.timeOfDay=="number"&&(this.world.timeOfDay=n.timeOfDay),Array.isArray(n.blockDiffs)){this.world.blockDiffs.clear();for(const[s,r]of n.blockDiffs)typeof s=="string"&&r&&typeof r.numId=="number"&&this.world.blockDiffs.set(s,{numId:r.numId,meta:r.meta||0})}if(this.player.position.set(n.player.x,n.player.y,n.player.z),this.player.yaw=n.player.yaw||0,this.player.pitch=n.player.pitch||0,this.player.gameMode=n.player.gameMode==="creative"?"creative":"survival",this.player.flying=!!n.player.flying,typeof n.player.health=="number"&&(this.player.health=n.player.health),typeof n.player.hunger=="number"&&(this.player.hunger=n.player.hunger),n.inventory){if(Array.isArray(n.inventory.slots))for(let s=0;s<36;s++){const r=n.inventory.slots[s],o=r!=null&&r.id?nt.getItem(r.id):void 0;this.inventory.slots[s]=o&&r.count>0?{item:o,count:r.count}:null}if(Array.isArray(n.inventory.armor))for(let s=0;s<4;s++){const r=n.inventory.armor[s],o=r!=null&&r.id?nt.getItem(r.id):void 0;this.inventory.armorSlots[s]=o&&r.count>0?{item:o,count:r.count}:null}if((t=n.inventory.offhand)!=null&&t.id){const s=nt.getItem(n.inventory.offhand.id);this.inventory.offhandSlot=s?{item:s,count:n.inventory.offhand.count||1}:null}else this.inventory.offhandSlot=null;typeof n.inventory.selectedHotbarSlot=="number"&&(this.inventory.selectedHotbarSlot=n.inventory.selectedHotbarSlot)}if(Array.isArray(n.cushions))for(const s of n.cushions)this.world.entityRenderer.addCushion(s);if(Array.isArray(n.mobs))for(const s of n.mobs){this.world.entityRenderer.spawnMob(s.id,s.type,s.x,s.y,s.z);const r=this.world.entityRenderer.mobs.get(s.id);r&&(r.yaw=s.yaw??r.yaw,typeof s.health=="number"&&(r.health=s.health))}return!0}catch{return!1}}launchSelectedWorld(){var e;const t=this.savedWorlds[this.selectedWorldIdx]||this.savedWorlds[0];this.activeWorldId=t.id,this.player.gameMode=t.gameMode,this.player.flying=!1,this.inventory.clearAll(),this.world.resetWorld(t.seed,"wilderness_26_3",t.name),(e=this.onStartGame)==null||e.call(this,!1)}renderCreateWorldScreen(){const t=this.gui.scaledWidth,e=this.gui.scaledHeight,n=Math.floor(t/2);this.gui.renderMenuBackground(!1,28,e-36);const s=["Game","World","More"];for(let r=0;r<3;r++){const o=n-195+r*130,a=this.createWorldTab===r,c=a?"/assets/minecraft/textures/gui/sprites/widget/tab_selected.png":"/assets/minecraft/textures/gui/sprites/widget/tab.png";this.gui.blitNineSlice(c,o,4,130,24,3,3,3,3),this.font.drawCentered(this.gui.ctx,s[r],o+65,12,a?"#FFFFFF":"#A0A0A0",!0);const l=r;this.interactiveRects.push({x:o,y:4,w:130,h:24,onClick:()=>{this.createWorldTab=l}})}if(this.createWorldTab===0){this.addEditBox(n-104,52,208,20,"world_name",this.newWorldName,"World Name","World Name");const r=this.newWorldMode==="creative"?"Game Mode: Creative":this.newWorldMode==="survival"?"Game Mode: Survival":"Game Mode: Spectator";this.addButton(n-104,84,208,20,r,()=>{this.newWorldMode=this.newWorldMode==="creative"?"survival":this.newWorldMode==="survival"?"spectator":"creative"}),this.addButton(n-104,112,208,20,`Difficulty: ${this.newWorldDifficulty}`,()=>{const o=["Peaceful","Easy","Normal","Hard"];this.newWorldDifficulty=o[(o.indexOf(this.newWorldDifficulty)+1)%o.length]}),this.addButton(n-104,140,208,20,"Allow Commands: ON",()=>{})}else this.createWorldTab===1?(this.addButton(n-154,48,150,20,"World Type: Default (26.3)",()=>{}),this.addButton(n+4,48,150,20,"Generate Structures: ON",()=>{}),this.addEditBox(n-154,88,308,20,"world_seed",this.newWorldSeed,"Leave blank for a random seed","Seed for the World Generator"),this.font.drawCentered(this.gui.ctx,"§7Includes 26.3 Dappled Forest, Poplar Groves & 297 Abandoned Camp NBT Structures",n,122,"#A0A0A0",!0)):(this.addButton(n-104,54,208,20,"Game Rules...",()=>{}),this.addButton(n-104,82,208,20,"Experiments (26.3 Enabled)",()=>{}),this.addButton(n-104,110,208,20,"Data Packs...",()=>{}));this.addButton(n-154,e-28,150,20,"Create New World",()=>{const r=String(Math.floor(Math.random()*2147483647)),o=this.newWorldSeed.trim()||r,a={id:`world_${Date.now()}`,name:this.newWorldName||"New World",folder:`${(this.newWorldName||"New_World").replace(/\s+/g,"_")} (Just now)`,lastPlayed:`${this.newWorldMode==="creative"?"Creative":"Survival"} Mode, Version: 26.3`,gameMode:this.newWorldMode==="survival"?"survival":"creative",seed:o};this.savedWorlds.unshift(a),this.selectedWorldIdx=0,this.saveWorldsList(),this.launchSelectedWorld()}),this.addButton(n+4,e-28,150,20,"Cancel",()=>{this.setState("SINGLEPLAYER_SELECT")})}renderJoinMultiplayerScreen(){var c,l;const t=this.gui.scaledWidth,e=this.gui.scaledHeight,n=Math.floor(t/2);this.gui.renderMenuBackground(!1,32,e-64),this.font.drawCentered(this.gui.ctx,"Play Multiplayer",n,11,"#FFFFFF",!0),this.addButton(t-104,6,98,20,"Wisp Proxy...",()=>{this.setState("WISPCRAFT_CONFIG")});const s=se.servers,r=n-152,o=304;let a=38;for(let h=0;h<Math.min(s.length,Math.floor((e-102)/36));h++){const f=s[h],u=h===this.selectedServerIdx,d=this.mouseX>=r&&this.mouseX<r+o&&this.mouseY>=a&&this.mouseY<a+34;u&&(this.gui.fill(r-1,a-1,r+o+1,a+35,"#FFFFFF"),this.gui.fill(r,a,r+o,a+34,"#000000"));const p=f.icon||"/assets/minecraft/textures/misc/unknown_server.png";if(this.gui.blitSprite(p,r+1,a+1,32,32),d){this.gui.fill(r+1,a+1,r+33,a+33,"rgba(0,0,0,0.45)");const y=this.mouseX<r+33?"/assets/minecraft/textures/gui/sprites/server_list/join_highlighted.png":"/assets/minecraft/textures/gui/sprites/server_list/join.png";this.gui.blitSprite(y,r+1,a+1,32,32)}this.font.draw(this.gui.ctx,f.name,r+36,a+2,"#FFFFFF",!0);const _=(((c=f.pingResult)==null?void 0:c.motd)||'§aMinecraft 26.3 ("Wilderness Bound") — Wisp v2 Ready').split(`
`);this.font.draw(this.gui.ctx,_[0].slice(0,44),r+36,a+12,"#AAAAAA",!0),_[1]?this.font.draw(this.gui.ctx,_[1].slice(0,44),r+36,a+22,"#808080",!0):this.font.draw(this.gui.ctx,`§8${f.ip}`,r+36,a+22,"#555555",!0);const m=f.pingResult?`${f.pingResult.playersOnline}/${f.pingResult.playersMax}`:"1/20",g=this.font.width(m);this.font.draw(this.gui.ctx,m,r+o-g-15,a+2,"#AAAAAA",!0);const w=((l=f.pingResult)==null?void 0:l.online)===!1?"/assets/minecraft/textures/gui/sprites/server_list/unreachable.png":"/assets/minecraft/textures/gui/sprites/server_list/ping_5.png";this.gui.blitSprite(w,r+o-12,a+1,10,8);const E=h;this.interactiveRects.push({x:r,y:a,w:o,h:34,onClick:()=>{this.selectedServerIdx===E&&this.mouseX<r+33?this.connectToServer(f):this.selectedServerIdx=E}}),a+=36}this.addButton(n-154,e-52,100,20,"Join Server",()=>{const h=s[this.selectedServerIdx]||s[0];h&&this.connectToServer(h)}),this.addButton(n-50,e-52,100,20,"Direct Connection",()=>{this.directConnectModal=!0,this.focusedEditBox="direct_ip"}),this.addButton(n+54,e-52,100,20,"Add Server",()=>{this.directConnectModal=!0,this.focusedEditBox="direct_ip"}),this.addButton(n-154,e-28,70,20,"Edit",()=>{const h=s[this.selectedServerIdx];h&&(this.directConnectIp=h.ip,this.directConnectModal=!0,this.focusedEditBox="direct_ip")}),this.addButton(n-78,e-28,70,20,"Delete",()=>{s.length>1&&(s.splice(this.selectedServerIdx,1),this.selectedServerIdx=0)}),this.addButton(n-2,e-28,74,20,"Refresh",()=>{se.pingAllServers().then(()=>this.render())}),this.addButton(n+78,e-28,76,20,"Cancel",()=>{this.setState("TITLE")}),this.directConnectModal&&(this.gui.fill(0,0,t,e,"rgba(0,0,0,0.75)"),this.font.drawCentered(this.gui.ctx,"Direct Connection",n,40,"#FFFFFF",!0),this.addEditBox(n-100,85,200,20,"direct_ip",this.directConnectIp,"127.0.0.1:25565","Server Address"),this.addButton(n-100,e-56,200,20,"Join Server",()=>{this.directConnectModal=!1,this.connectToServer({name:this.directConnectIp,ip:this.directConnectIp})}),this.addButton(n-100,e-32,200,20,"Cancel",()=>{this.directConnectModal=!1}))}renderWispcraftConfigScreen(){const t=this.gui.scaledWidth,e=this.gui.scaledHeight,n=Math.floor(t/2);this.gui.renderMenuBackground(!1,32,e-36),this.font.drawCentered(this.gui.ctx,"Wispcraft Wisp v2 Proxy & Account Settings",n,11,"#FFFFFF",!0),this.addEditBox(n-120,62,240,20,"wisp_url",se.wispProxyUrl,"ws://localhost:3000/wisp/","Wisp v2 WebSocket Proxy URL (MercuryWorkshop/wispcraft)"),this.addEditBox(n-120,106,240,20,"wisp_user",se.username,"Player26_3","Minecraft 26.3 Username"),this.font.drawCentered(this.gui.ctx,"§aEmbedded Local 26.3 TCP Server Running on 127.0.0.1:25565 (Protocol 777)",n,142,"#55FF55",!0),this.addButton(n-100,e-28,200,20,"Done",()=>{se.saveSettings(),this.setState(this.previousState==="MULTIPLAYER_SELECT"?"MULTIPLAYER_SELECT":"TITLE")})}connectToServer(t){this.connectingStatus=`Connecting to ${t.ip} via Wisp v2...`,this.setState("CONNECTING"),se.joinServer(t,e=>{this.connectingStatus=e,this.render()},e=>{this.addChatMessage(e)},()=>{var e;(e=this.onStartGame)==null||e.call(this,!0)})}renderConnectingScreen(){const t=this.gui.scaledWidth,e=this.gui.scaledHeight,n=Math.floor(t/2),s=Math.floor(e/2);this.gui.renderMenuBackground(!1),this.font.drawCentered(this.gui.ctx,this.connectingStatus,n,s-20,"#FFFFFF",!0),this.addButton(n-100,s+24,200,20,"Cancel",()=>{se.disconnect(),this.setState("MULTIPLAYER_SELECT")})}renderOptionsScreen(){const t=this.gui.scaledWidth,e=this.gui.scaledHeight,n=Math.floor(t/2),s=le.current,r=this.previousState==="PAUSE"||this.previousState==="IN_GAME";this.gui.renderMenuBackground(r,32,e-36),this.font.drawCentered(this.gui.ctx,"Options",n,11,"#FFFFFF",!0);const o=(s.fov-30)/80,a=s.fov===70?"FOV: Normal":s.fov===110?"FOV: Quake Pro":`FOV: ${s.fov}`;this.addSlider(n-155,42,150,20,a,o,h=>{s.fov=Math.round(30+h*80),this.player.camera.fov=s.fov,this.player.camera.updateProjectionMatrix(),le.save()});const c=(s.renderDistance-2)/10;this.addSlider(n+5,42,150,20,`Render Distance: ${s.renderDistance} chunks`,c,h=>{s.renderDistance=Math.round(2+h*10),le.save()}),this.addSlider(n-155,66,150,20,`Master Volume: ${Math.round(s.soundVolume*100)}%`,s.soundVolume,h=>{s.soundVolume=Math.round(h*100)/100,le.save()}),this.addSlider(n+5,66,150,20,`Sensitivity: ${Math.round(s.mouseSensitivity*200)}%`,s.mouseSensitivity,h=>{s.mouseSensitivity=Math.max(.05,Math.round(h*100)/100),le.save()});const l=s.guiScale===0?"GUI Scale: Auto":`GUI Scale: ${s.guiScale}x`;this.addButton(n-155,96,150,20,l,()=>{s.guiScale=(s.guiScale+1)%5,le.save()}),this.addButton(n+5,96,150,20,`Clouds: ${s.clouds?"Fancy":"OFF"}`,()=>{s.clouds=!s.clouds,le.save()}),this.addButton(n-155,120,150,20,`Game Mode: ${this.player.gameMode.toUpperCase()}`,()=>{this.player.gameMode=this.player.gameMode==="creative"?"survival":"creative",this.player.gameMode==="survival"&&(this.player.flying=!1)}),this.addButton(n+5,120,150,20,"Cycle Time of Day",()=>{this.world.timeOfDay=(this.world.timeOfDay+6e3)%24e3}),this.addButton(n-155,144,150,20,`Renderer: ${Re.active?"WebGPU":"WebGL2"}`,()=>{Re.supported&&(Re.active=!Re.active,Re.backendLabel=Re.active?`WebGPU (${Re.adapterName})`:"WebGL2")}),this.addButton(n+5,144,150,20,"Locate Abandoned Camp",()=>{const h=this.world.findNearestAbandonedCamp(this.player.position.x,this.player.position.z);h&&(this.player.position.set(h.x+.5,h.y+1.5,h.z+.5),this.addChatMessage(`§aTeleported to 26.3 Abandoned Camp at X=${h.x}, Y=${h.y}, Z=${h.z}!`),r&&this.setState("IN_GAME"))}),this.addButton(n-100,e-28,200,20,"Done",()=>{this.setState(this.previousState)})}renderPauseScreen(){const t=this.gui.scaledWidth,e=this.gui.scaledHeight,n=Math.floor(t/2),s=Math.floor(e/4)+8;this.gui.fill(0,0,t,e,"rgba(16, 16, 16, 0.72)"),this.font.drawCentered(this.gui.ctx,"Game Menu",n,40,"#FFFFFF",!0),this.addButton(n-102,s,204,20,"Back to Game",()=>{this.setState("IN_GAME")}),this.addButton(n-102,s+24,98,20,"Advancements",()=>{this.setState("ADVANCEMENTS")}),this.addButton(n+4,s+24,98,20,"Statistics",()=>{this.showToast("Wilderness Explorer",`Blocks Modified: ${this.world.blockDiffs.size}`,"filled_map")}),this.addButton(n-102,s+48,98,20,"Give Feedback",()=>{this.showToast("Minecraft 26.3","Wilderness Bound Official Web Port","orange_cushion")}),this.addButton(n+4,s+48,98,20,"Report Bugs",()=>{this.setState("WISPCRAFT_CONFIG")}),this.addButton(n-102,s+72,98,20,"Options...",()=>{this.setState("OPTIONS")}),this.addButton(n+4,s+72,98,20,"Open to LAN",()=>{this.addChatMessage("§aLocal game hosted on port §e25565§a (Wisp v2 proxy active at /wisp/)"),this.setState("IN_GAME")}),this.addButton(n-102,s+96,204,20,"Save and Quit to Title",()=>{var r;this.saveActiveWorldState(),se.disconnect(),(r=this.onQuitToTitle)==null||r.call(this),this.setState("TITLE")})}renderAdvancementsScreen(){const t=this.gui.scaledWidth,e=this.gui.scaledHeight,n=Math.floor(t/2),s=Math.floor(e/2);this.gui.fill(0,0,t,e,"rgba(16, 16, 16, 0.75)");const r=252,o=140,a=n-Math.floor(r/2),c=s-Math.floor(o/2);this.gui.blitTiled("/assets/minecraft/textures/gui/menu_list_background.png",a+8,c+16,r-16,o-24,16,16),this.gui.fill(a,c,a+r,c+16,"#C6C6C6"),this.font.draw(this.gui.ctx,'Advancements - Minecraft 26.3 ("Wilderness Bound")',a+8,c+5,"#404040",!1);const l=[{x:a+32,y:c+55,item:"poplar_log",title:"Wilderness Bound",desc:"Enter a Dappled Forest or Poplar Grove"},{x:a+92,y:c+38,item:"straw_bed",title:"Sweet Wilderness Dreams",desc:"Rest on a 26.3 Straw Bed at an Abandoned Camp"},{x:a+92,y:c+78,item:"orange_cushion",title:"Take a Seat!",desc:"Place and sit on a 26.3 Colored Cushion"},{x:a+158,y:c+55,item:"cyan_concrete_stairs",title:"Modern Architect",desc:"Craft Concrete or Wool Stairs & Slabs"}];for(const h of l){this.gui.fill(h.x-1,h.y-1,h.x+25,h.y+25,"#AA8800"),this.gui.fill(h.x,h.y,h.x+24,h.y+24,"#333333");const f=nt.getItem(h.item)||null;this.gui.renderItem(f,1,h.x+4,h.y+4),this.interactiveRects.push({x:h.x,y:h.y,w:24,h:24,tooltip:[`§e${h.title}`,`§7${h.desc}`]})}this.addButton(n-50,c+o+8,100,20,"Done",()=>{this.setState("PAUSE")})}renderHUD(t){const e=this.gui.scaledWidth,n=this.gui.scaledHeight,s=Math.floor(e/2),r=Math.floor(n/2);this.state==="IN_GAME"&&this.gui.blitSprite("/assets/minecraft/textures/gui/sprites/hud/crosshair.png",s-7,r-7,15,15);const o=s-91,a=n-22;this.gui.blitSprite("/assets/minecraft/textures/gui/sprites/hud/hotbar.png",o,a,182,22),this.gui.blitSprite("/assets/minecraft/textures/gui/sprites/hud/hotbar_selection.png",o-1+this.inventory.selectedHotbarSlot*20,a-1,24,23),this.inventory.offhandSlot&&(this.gui.blitSprite("/assets/minecraft/textures/gui/sprites/hud/hotbar_offhand_left.png",o-29,a-1,29,24),this.gui.renderItem(this.inventory.offhandSlot.item,this.inventory.offhandSlot.count,o-26,a+3));for(let f=0;f<9;f++){const u=this.inventory.slots[f];u&&this.gui.renderItem(u.item,u.count,o+3+f*20,a+3)}if(this.player.gameMode==="survival"){const f=n-29;this.gui.blitSprite("/assets/minecraft/textures/gui/sprites/hud/experience_bar_background.png",o,f,182,5);const u=Math.floor(182*this.player.xpProgress);u>0&&this.gui.blit("/assets/minecraft/textures/gui/sprites/hud/experience_bar_progress.png",o,f,0,0,u,5,182,5),this.player.xpLevel>0&&this.font.drawCentered(this.gui.ctx,String(this.player.xpLevel),s,n-35,"#80FF20",!0);const d=n-39;for(let p=0;p<10;p++){const _=o+p*8;this.gui.blitSprite("/assets/minecraft/textures/gui/sprites/hud/heart/container.png",_,d,9,9);const m=this.player.health-p*2;m>=2?this.gui.blitSprite("/assets/minecraft/textures/gui/sprites/hud/heart/full.png",_,d,9,9):m===1&&this.gui.blitSprite("/assets/minecraft/textures/gui/sprites/hud/heart/half.png",_,d,9,9)}for(let p=0;p<10;p++){const _=o+182-p*8-9;this.gui.blitSprite("/assets/minecraft/textures/gui/sprites/hud/food_empty.png",_,d,9,9);const m=this.player.hunger-p*2;m>=2?this.gui.blitSprite("/assets/minecraft/textures/gui/sprites/hud/food_full.png",_,d,9,9):m===1&&this.gui.blitSprite("/assets/minecraft/textures/gui/sprites/hud/food_half.png",_,d,9,9)}if(this.player.inWater)for(let p=0;p<10;p++){const _=o+182-p*8-9;this.gui.blitSprite("/assets/minecraft/textures/gui/sprites/hud/air.png",_,d-10,9,9)}}const c=this.inventory.getHeldStack();if(c&&this.heldItemTooltipTimer>0){const f=this.player.gameMode==="survival"?n-59:n-38;this.font.drawCentered(this.gui.ctx,c.item.displayName,s,f,"#FFFFFF",!0)}this.player.seatedCushion&&this.font.drawCentered(this.gui.ctx,"§eSeated on 26.3 Cushion — Press §fSneak (Shift)§e to dismount",s,n-68,"#FFFF55",!0);const l=performance.now(),h=t?this.chatHistory.slice(-10):this.chatHistory.filter(f=>l-f.time<9e3).slice(-6);if(h.length>0){let f=n-48-h.length*9;for(const u of h)this.gui.fill(2,f-1,Math.min(e-20,320),f+8,"rgba(0, 0, 0, 0.45)"),this.font.draw(this.gui.ctx,u.text,4,f,"#FFFFFF",!0),f+=9}if(t){this.gui.fill(2,n-14,e-2,n-2,"rgba(0, 0, 0, 0.75)");const f=Math.floor(l/300)%2===0?"_":"";this.font.draw(this.gui.ctx,this.chatInputText+f,4,n-12,"#FFFFFF",!0)}this.showDebugF3&&this.renderDebugF3Overlay()}renderDebugF3Overlay(){const t=this.gui.scaledWidth,e=this.player,n=Math.floor(e.position.x),s=Math.floor(e.position.y),r=Math.floor(e.position.z),o=e.currentHit,a=o?nt.getBlock(o.blockNumId):null,c=Un.getBiomeAt(n,r),l=["Minecraft 26.3 (26.3/vanilla/Wilderness Bound)",`${this.fps} fps T: inf vsync fancy-clouds B: 2`,`Integrated Wisp Server @ 16 ms ticks (Seed: ${Un.seed})`,`C: ${this.world.chunks.size} D: ${le.current.renderDistance} pC: 000, pU: 00, aB: 06`,`E: ${this.world.entityRenderer.cushions.size+this.world.entityRenderer.mobs.size+this.world.entityRenderer.droppedItems.size}, B: 0, SD: 6`,"",`XYZ: ${e.position.x.toFixed(3)} / ${e.position.y.toFixed(5)} / ${e.position.z.toFixed(3)}`,`Block: ${n} ${s} ${r} [${n&15} ${s&15} ${r&15}]`,`Chunk: ${n>>4} ${s>>4} ${r>>4}`,`Facing: ${["north (-Z)","east (+X)","south (+Z)","west (-X)"][e.getCardinalFacingMeta()]}`,"Client Light: 15 (15 sky, 12 block)",`Biome: ${c}`,`Local Difficulty: 2.25 // 0.00 (Day ${Math.floor(this.world.timeOfDay/24e3)})`],h=["Java: 25.0.1 (WebGPU / WebGL2 Port)","Mem: 28% 584/2048MB","Allocated: 64% 1310MB","",`Backend: ${Re.backendLabel}`,`Display: ${window.innerWidth}x${window.innerHeight} (GUI Scale ${this.gui.guiScale}x)`,"Atlas: Nearest 1024x1024 + WGSL Compute","",o&&a?`Targeted Block: ${o.bx}, ${o.by}, ${o.bz}`:"Targeted Block: none",o&&a?`${a.id}`:"",o&&a&&a.is26_3?"§a#minecraft:wilderness_bound_26_3":""];let f=2;for(const d of l){if(d){const p=this.font.width(d);this.gui.fill(1,f-1,3+p,f+8,"rgba(80, 80, 80, 0.56)"),this.font.draw(this.gui.ctx,d,2,f,"#E0E0E0",!1)}f+=9}let u=2;for(const d of h){if(d){const p=this.font.width(d);this.gui.fill(t-p-3,u-1,t-1,u+8,"rgba(80, 80, 80, 0.56)"),this.font.draw(this.gui.ctx,d,t-p-2,u,"#E0E0E0",!1)}u+=9}}renderToastOverlay(){if(!this.activeToast)return;const t=(performance.now()-this.activeToast.startTime)/1e3;if(t>5){this.activeToast=null;return}let e=0;t<.35?e=(1-t/.35)*160:t>4.65&&(e=(t-4.65)/.35*160);const n=Math.floor(this.gui.scaledWidth-160+e),s=4;this.gui.blitSprite("/assets/minecraft/textures/gui/sprites/toast/advancement.png",n,s,160,32),this.activeToast.item&&this.gui.renderItem(this.activeToast.item,1,n+8,s+8),this.font.draw(this.gui.ctx,this.activeToast.title,n+30,s+7,"#FFFF00",!1),this.font.draw(this.gui.ctx,this.activeToast.subtitle,n+30,s+18,"#FFFFFF",!1)}renderContainerScreen(){const t=this.gui.scaledWidth,e=this.gui.scaledHeight;this.gui.fill(0,0,t,e,"rgba(16, 16, 16, 0.72)"),this.activeContainerTab==="crafting"?this.renderCraftingTableScreen():this.activeContainerTab==="stonecutter"?this.renderStonecutterScreen():this.player.gameMode==="creative"?this.renderCreativeInventoryScreen():this.renderSurvivalInventoryScreen(),this.inventory.cursorStack&&this.gui.renderItem(this.inventory.cursorStack.item,this.inventory.cursorStack.count,Math.floor(this.mouseX-8),Math.floor(this.mouseY-8))}drawInteractiveSlot(t,e,n,s,r=-1,o){const a=n();!a&&o&&this.gui.blitSprite(o,t,e,16,16),a&&this.gui.renderItem(a.item,a.count,t,e),this.mouseX>=t&&this.mouseX<t+16&&this.mouseY>=e&&this.mouseY<e+16&&this.gui.renderSlotHighlight(t,e);const l=a?[a.item.is26_3?`§e${a.item.displayName}`:a.item.displayName,`§8${a.item.id}`,...a.item.is26_3?['§6Minecraft 26.3 ("Wilderness Bound")']:[]]:void 0;this.interactiveRects.push({x:t,y:e,w:16,h:16,isSlot:!0,slotKey:`slot_${t}_${e}`,getSlot:n,setSlot:s,tooltip:l,onClick:(h,f)=>{this.inventory.clickSlot(n,s,h,f,r)},onRightDragPlace:()=>{this.inventory.placeOneFromCursor(n,s)},onHotbarKeySwap:h=>{if(r===h)return;const f=n(),u=this.inventory.slots[h];s(u),this.inventory.slots[h]=f}})}drawPlayerInventorySlots(t,e){for(let n=0;n<3;n++)for(let s=0;s<9;s++){const r=9+n*9+s,o=t+8+s*18,a=e+84+n*18;this.drawInteractiveSlot(o,a,()=>this.inventory.slots[r],c=>{this.inventory.slots[r]=c},r)}for(let n=0;n<9;n++){const s=n,r=t+8+n*18,o=e+142;this.drawInteractiveSlot(r,o,()=>this.inventory.slots[s],a=>{this.inventory.slots[s]=a},s)}}renderSurvivalInventoryScreen(){const t=this.gui.scaledWidth,e=this.gui.scaledHeight,n=Math.floor((t-176)/2)+(this.showRecipeBook?77:0),s=Math.floor((e-166)/2);this.showRecipeBook&&this.renderRecipeBookSidePanel(n-149,s),this.gui.blit("/assets/minecraft/textures/gui/container/inventory.png",n,s,0,0,176,166,256,256),this.font.draw(this.gui.ctx,"Crafting",n+97,s+6,"#404040",!1);const r=this.inventory.getHeldStack();this.gui.renderPlayerDoll(n+26,s+8,n+75,s+78,this.mouseX,this.mouseY,r?r.item:null);for(let d=0;d<4;d++){const p=d;this.drawInteractiveSlot(n+8,s+8+d*18,()=>this.inventory.armorSlots[p],_=>{this.inventory.armorSlots[p]=_},-1)}this.drawInteractiveSlot(n+77,s+62,()=>this.inventory.offhandSlot,d=>{this.inventory.offhandSlot=d},-1);for(let d=0;d<2;d++)for(let p=0;p<2;p++){const _=d*2+p;this.drawInteractiveSlot(n+98+p*18,s+18+d*18,()=>this.inventory.crafting2x2[_],m=>{this.inventory.crafting2x2[_]=m})}const o=this.inventory.getCraftingResult(this.inventory.crafting2x2,2),a=n+154,c=s+28;o&&this.gui.renderItem(o.item,o.count,a,c),this.mouseX>=a&&this.mouseX<a+16&&this.mouseY>=c&&this.mouseY<c+16&&this.gui.renderSlotHighlight(a,c);const l=d=>{if(d){let _=0;for(;_++<64;){const m=this.inventory.getCraftingResult(this.inventory.crafting2x2,2);if(!m||!this.inventory.addItem(m.item.shortId,m.count))break;this.inventory.consumeCraftingGrid(this.inventory.crafting2x2)}return}const p=this.inventory.getCraftingResult(this.inventory.crafting2x2,2);p&&(this.inventory.cursorStack?this.inventory.cursorStack.item.id===p.item.id&&this.inventory.cursorStack.count+p.count<=p.item.maxStack&&(this.inventory.cursorStack.count+=p.count,this.inventory.consumeCraftingGrid(this.inventory.crafting2x2)):(this.inventory.cursorStack={...p},this.inventory.consumeCraftingGrid(this.inventory.crafting2x2)))};this.interactiveRects.push({x:a,y:c,w:16,h:16,isSlot:!0,slotKey:"craft_out_2x2",tooltip:o?[o.item.displayName]:void 0,onClick:(d,p)=>l(p),onRightDragPlace:()=>l(!1),onHotbarKeySwap:d=>{const p=this.inventory.getCraftingResult(this.inventory.crafting2x2,2);if(!p)return;const _=this.inventory.slots[d];_?_.item.id===p.item.id&&_.count+p.count<=p.item.maxStack&&(_.count+=p.count,this.inventory.consumeCraftingGrid(this.inventory.crafting2x2)):(this.inventory.slots[d]={...p},this.inventory.consumeCraftingGrid(this.inventory.crafting2x2))}});const h=n+104,f=s+61,u=this.mouseX>=h&&this.mouseX<h+20&&this.mouseY>=f&&this.mouseY<f+18;this.gui.blitSprite(u?"/assets/minecraft/textures/gui/sprites/recipe_book/button_highlighted.png":"/assets/minecraft/textures/gui/sprites/recipe_book/button.png",h,f,20,18),this.interactiveRects.push({x:h,y:f,w:20,h:18,tooltip:["Recipe Book"],onClick:()=>{this.showRecipeBook=!this.showRecipeBook}}),this.drawPlayerInventorySlots(n,s)}renderRecipeBookSidePanel(t,e){this.gui.blit("/assets/minecraft/textures/gui/recipe_book.png",t,e,1,1,147,166,256,256),this.font.draw(this.gui.ctx,"Recipes",t+25,e+13,"#FFFFFF",!0);const n=Jr.getRecipes().filter(s=>s.type==="crafting");for(let s=0;s<Math.min(20,n.length);s++){const r=s%5,o=Math.floor(s/5),a=t+11+r*25,c=e+31+o*25,l=n[s],h=nt.getItem(l.resultId);h&&(this.gui.renderItem(h,l.resultCount,a+4,c+4),this.mouseX>=a&&this.mouseX<a+24&&this.mouseY>=c&&this.mouseY<c+24&&this.gui.renderSlotHighlight(a+4,c+4),this.interactiveRects.push({x:a,y:c,w:24,h:24,tooltip:[h.displayName,...l.ingredients.map(f=>`§7Requires: ${f.count}x ${nt.formatName(f.id)}`)],onClick:()=>{this.inventory.removeIngredients(l.ingredients)&&(this.inventory.addItem(l.resultId,l.resultCount),pe.play("ui.button.click",.8))}}))}}renderCreativeInventoryScreen(){const t=this.gui.scaledWidth,e=this.gui.scaledHeight,n=Math.floor((t-195)/2),s=Math.floor((e-136)/2),r=[{id:"building",col:1,label:"Building Blocks",icon:"poplar_planks"},{id:"colored",col:2,label:"Colored Blocks",icon:"orange_cushion"},{id:"natural",col:3,label:"Natural Blocks",icon:"orange_poplar_leaves"},{id:"functional",col:4,label:"Functional Blocks",icon:"straw_bed"},{id:"redstone",col:5,label:"Redstone Blocks",icon:"redstone_block"},{id:"search",col:7,label:"Search Items",icon:"filled_map"}],o=[{id:"combat_tools",col:1,label:"Tools & Combat",icon:"diamond_pickaxe"},{id:"survival_inv",col:7,label:"Survival Inventory",icon:"chest"}];for(const d of r){if(this.creativeTab===d.id)continue;const p=n+(d.col===7?168:(d.col-1)*27),_=s-28;this.gui.blitSprite(`/assets/minecraft/textures/gui/sprites/container/creative_inventory/tab_top_unselected_${d.col}.png`,p,_,26,32),this.gui.renderItem(nt.getItem(d.icon)||null,1,p+5,_+8),this.interactiveRects.push({x:p,y:_,w:26,h:28,tooltip:[d.label],onClick:()=>{this.creativeTab=d.id,this.creativeScrollRow=0,d.id==="search"&&(this.focusedEditBox="creative_search")}})}for(const d of o){if(this.creativeTab===d.id)continue;const p=n+(d.col===7?168:(d.col-1)*27),_=s+132;this.gui.blitSprite(`/assets/minecraft/textures/gui/sprites/container/creative_inventory/tab_bottom_unselected_${d.col}.png`,p,_,26,32),this.gui.renderItem(nt.getItem(d.icon)||null,1,p+5,_+6),this.interactiveRects.push({x:p,y:_+4,w:26,h:28,tooltip:[d.label],onClick:()=>{this.creativeTab=d.id,this.creativeScrollRow=0}})}const a=this.creativeTab==="search"?"/assets/minecraft/textures/gui/container/creative_inventory/tab_item_search.png":this.creativeTab==="survival_inv"?"/assets/minecraft/textures/gui/container/creative_inventory/tab_inventory.png":"/assets/minecraft/textures/gui/container/creative_inventory/tab_items.png";this.gui.blit(a,n,s,0,0,195,136,256,256);for(const d of r){if(this.creativeTab!==d.id)continue;const p=n+(d.col===7?168:(d.col-1)*27),_=s-28;this.gui.blitSprite(`/assets/minecraft/textures/gui/sprites/container/creative_inventory/tab_top_selected_${d.col}.png`,p,_,26,32),this.gui.renderItem(nt.getItem(d.icon)||null,1,p+5,_+8),this.font.draw(this.gui.ctx,d.label,n+8,s+6,"#404040",!1)}for(const d of o){if(this.creativeTab!==d.id)continue;const p=n+(d.col===7?168:(d.col-1)*27),_=s+132;this.gui.blitSprite(`/assets/minecraft/textures/gui/sprites/container/creative_inventory/tab_bottom_selected_${d.col}.png`,p,_,26,32),this.gui.renderItem(nt.getItem(d.icon)||null,1,p+5,_+6),this.font.draw(this.gui.ctx,d.label,n+8,s+6,"#404040",!1)}if(this.creativeTab==="survival_inv"){for(let d=0;d<3;d++)for(let p=0;p<9;p++){const _=9+d*9+p;this.drawInteractiveSlot(n+9+p*18,s+54+d*18,()=>this.inventory.slots[_],m=>{this.inventory.slots[_]=m},_)}for(let d=0;d<9;d++){const p=d;this.drawInteractiveSlot(n+9+d*18,s+112,()=>this.inventory.slots[p],_=>{this.inventory.slots[p]=_},p)}this.interactiveRects.push({x:n+173,y:s+112,w:16,h:16,isSlot:!0,tooltip:["§cDestroy Item"],onClick:(d,p)=>{p?this.inventory.slots.fill(null):this.inventory.cursorStack=null}});return}if(this.creativeTab==="search"){const d=this.focusedEditBox==="creative_search"&&Math.floor(performance.now()/300)%2===0?"_":"";this.font.draw(this.gui.ctx,this.searchQuery+d,n+82,s+6,"#FFFFFF",!0),this.interactiveRects.push({x:n+80,y:s+4,w:90,h:12,onClick:()=>{this.focusedEditBox="creative_search"}})}const c=nt.allItems.filter(d=>{if(this.creativeTab==="search"){if(!this.searchQuery)return!0;const p=this.searchQuery.toLowerCase();return d.displayName.toLowerCase().includes(p)||d.shortId.toLowerCase().includes(p)}return d.category===this.creativeTab}).sort((d,p)=>(p.is26_3?1:0)-(d.is26_3?1:0)),l=Math.max(1,Math.ceil(c.length/9)),h=Math.max(0,l-5);this.creativeScrollRow=Math.min(this.creativeScrollRow,h);const f=h>0?this.creativeScrollRow/h:0,u=s+18+Math.round(f*79);this.gui.blitSprite(h>0?"/assets/minecraft/textures/gui/sprites/container/creative_inventory/scroller.png":"/assets/minecraft/textures/gui/sprites/container/creative_inventory/scroller_disabled.png",n+175,u,12,15);for(let d=0;d<5;d++)for(let p=0;p<9;p++){const _=(this.creativeScrollRow+d)*9+p,m=n+9+p*18,g=s+18+d*18,w=c[_]||null;w&&this.gui.renderItem(w,1,m,g),this.mouseX>=m&&this.mouseX<m+16&&this.mouseY>=g&&this.mouseY<g+16&&this.gui.renderSlotHighlight(m,g),w&&this.interactiveRects.push({x:m,y:g,w:16,h:16,isSlot:!0,tooltip:[w.is26_3?`§e${w.displayName}`:w.displayName,`§8${w.id}`,...w.is26_3?['§6Minecraft 26.3 ("Wilderness Bound")']:[]],onClick:(E,y)=>{y?this.inventory.slots[this.inventory.selectedHotbarSlot]={item:w,count:w.maxStack}:E===2?this.inventory.cursorStack={item:w,count:w.maxStack}:this.inventory.cursorStack&&this.inventory.cursorStack.item.id===w.id?this.inventory.cursorStack.count=Math.min(w.maxStack,this.inventory.cursorStack.count+1):this.inventory.cursorStack={item:w,count:1}},onHotbarKeySwap:E=>{this.inventory.slots[E]={item:w,count:w.maxStack}}})}for(let d=0;d<9;d++){const p=d;this.drawInteractiveSlot(n+9+d*18,s+112,()=>this.inventory.slots[p],_=>{this.inventory.slots[p]=_},p)}}renderCraftingTableScreen(){const t=this.gui.scaledWidth,e=this.gui.scaledHeight,n=Math.floor((t-176)/2)+(this.showRecipeBook?77:0),s=Math.floor((e-166)/2);this.showRecipeBook&&this.renderRecipeBookSidePanel(n-149,s),this.gui.blit("/assets/minecraft/textures/gui/container/crafting_table.png",n,s,0,0,176,166,256,256),this.font.draw(this.gui.ctx,"Crafting",n+28,s+6,"#404040",!1),this.font.draw(this.gui.ctx,"Inventory",n+8,s+72,"#404040",!1);for(let u=0;u<3;u++)for(let d=0;d<3;d++){const p=u*3+d;this.drawInteractiveSlot(n+30+d*18,s+17+u*18,()=>this.inventory.crafting3x3[p],_=>{this.inventory.crafting3x3[p]=_})}const r=this.inventory.getCraftingResult(this.inventory.crafting3x3,3),o=n+124,a=s+35;r&&this.gui.renderItem(r.item,r.count,o,a),this.mouseX>=o&&this.mouseX<o+16&&this.mouseY>=a&&this.mouseY<a+16&&this.gui.renderSlotHighlight(o,a);const c=u=>{if(u){let p=0;for(;p++<64;){const _=this.inventory.getCraftingResult(this.inventory.crafting3x3,3);if(!_||!this.inventory.addItem(_.item.shortId,_.count))break;this.inventory.consumeCraftingGrid(this.inventory.crafting3x3)}return}const d=this.inventory.getCraftingResult(this.inventory.crafting3x3,3);d&&(this.inventory.cursorStack?this.inventory.cursorStack.item.id===d.item.id&&this.inventory.cursorStack.count+d.count<=d.item.maxStack&&(this.inventory.cursorStack.count+=d.count,this.inventory.consumeCraftingGrid(this.inventory.crafting3x3)):(this.inventory.cursorStack={...d},this.inventory.consumeCraftingGrid(this.inventory.crafting3x3)))};this.interactiveRects.push({x:o,y:a,w:16,h:16,isSlot:!0,slotKey:"craft_out_3x3",tooltip:r?[r.item.displayName]:void 0,onClick:(u,d)=>c(d),onRightDragPlace:()=>c(!1),onHotbarKeySwap:u=>{const d=this.inventory.getCraftingResult(this.inventory.crafting3x3,3);if(!d)return;const p=this.inventory.slots[u];p?p.item.id===d.item.id&&p.count+d.count<=d.item.maxStack&&(p.count+=d.count,this.inventory.consumeCraftingGrid(this.inventory.crafting3x3)):(this.inventory.slots[u]={...d},this.inventory.consumeCraftingGrid(this.inventory.crafting3x3))}});const l=n+5,h=s+35,f=this.mouseX>=l&&this.mouseX<l+20&&this.mouseY>=h&&this.mouseY<h+18;this.gui.blitSprite(f?"/assets/minecraft/textures/gui/sprites/recipe_book/button_highlighted.png":"/assets/minecraft/textures/gui/sprites/recipe_book/button.png",l,h,20,18),this.interactiveRects.push({x:l,y:h,w:20,h:18,tooltip:["Recipe Book"],onClick:()=>{this.showRecipeBook=!this.showRecipeBook}}),this.drawPlayerInventorySlots(n,s)}renderStonecutterScreen(){const t=this.gui.scaledWidth,e=this.gui.scaledHeight,n=Math.floor((t-176)/2),s=Math.floor((e-166)/2);this.gui.blit("/assets/minecraft/textures/gui/container/stonecutter.png",n,s,0,0,176,166,256,256),this.font.draw(this.gui.ctx,"Stonecutter",n+8,s+4,"#404040",!1),this.font.draw(this.gui.ctx,"Inventory",n+8,s+72,"#404040",!1),this.drawInteractiveSlot(n+20,s+33,()=>this.inventory.stonecutterInput,l=>{this.inventory.stonecutterInput=l,this.inventory.stonecutterSelectedIndex=0});const r=this.inventory.getStonecutterOutputs();for(let l=0;l<Math.min(12,r.length);l++){const h=Math.floor(l/4),f=l%4,u=n+52+f*16,d=s+14+h*18,p=l===this.inventory.stonecutterSelectedIndex,_=this.mouseX>=u&&this.mouseX<u+16&&this.mouseY>=d&&this.mouseY<d+18,m=p?"/assets/minecraft/textures/gui/sprites/container/stonecutter/recipe_selected.png":_?"/assets/minecraft/textures/gui/sprites/container/stonecutter/recipe_highlighted.png":"/assets/minecraft/textures/gui/sprites/container/stonecutter/recipe.png";this.gui.blitSprite(m,u,d,16,18),this.gui.renderItem(r[l].item,1,u,d+1);const g=l;this.interactiveRects.push({x:u,y:d,w:16,h:18,tooltip:[r[l].item.displayName],onClick:()=>{this.inventory.stonecutterSelectedIndex=g,pe.play("ui.stonecutter.select_recipe",.8)}})}this.gui.blitSprite("/assets/minecraft/textures/gui/sprites/container/stonecutter/scroller_disabled.png",n+119,s+15,12,15);const o=r[this.inventory.stonecutterSelectedIndex]||null,a=n+143,c=s+33;o&&this.gui.renderItem(o.item,o.count,a,c),this.mouseX>=a&&this.mouseX<a+16&&this.mouseY>=c&&this.mouseY<c+16&&this.gui.renderSlotHighlight(a,c),this.interactiveRects.push({x:a,y:c,w:16,h:16,isSlot:!0,tooltip:o?[o.item.displayName]:void 0,onClick:()=>{!o||!this.inventory.stonecutterInput||this.inventory.cursorStack||(this.inventory.cursorStack={item:o.item,count:o.count},this.inventory.stonecutterInput.count-=1,this.inventory.stonecutterInput.count<=0&&(this.inventory.stonecutterInput=null),pe.play("ui.stonecutter.take_result",.85))}}),this.drawPlayerInventorySlots(n,s)}handleChatSubmit(t){var e;if(t.startsWith("/")){const n=t.slice(1).split(/\s+/),s=n[0].toLowerCase();if(s==="gamemode"){const r=(n[1]||"").toLowerCase();r.startsWith("c")?(this.player.gameMode="creative",this.addChatMessage("§eSet own game mode to §aCreative Mode")):r.startsWith("s")&&r!=="spectator"?(this.player.gameMode="survival",this.player.flying=!1,this.addChatMessage("§eSet own game mode to §aSurvival Mode")):(r==="spectator"||r==="sp")&&(this.player.gameMode="spectator",this.player.flying=!0,this.addChatMessage("§eSet own game mode to §aSpectator Mode"))}else if(s==="time"){const r=n[2]||n[1]||"day";r==="day"?this.world.timeOfDay=1e3:r==="noon"?this.world.timeOfDay=6e3:r==="night"?this.world.timeOfDay=14e3:this.world.timeOfDay=parseInt(r,10)||1e3,this.addChatMessage(`§eSet the time to §a${this.world.timeOfDay}`)}else if(s==="locate"){const r=this.world.findNearestAbandonedCamp(this.player.position.x,this.player.position.z);r&&this.addChatMessage(`§aThe nearest §eminecraft:abandoned_camp§a is at §b[${r.x}, ${r.y}, ${r.z}]`)}else if(s==="tp"||s==="teleport"){if(n.length>=4){const r=parseFloat(n[1]),o=parseFloat(n[2]),a=parseFloat(n[3]);!isNaN(r)&&!isNaN(o)&&!isNaN(a)&&(this.player.position.set(r,o,a),this.addChatMessage(`§eTeleported to ${r}, ${o}, ${a}`))}}else if(s==="give"){const r=(n[2]||n[1]||"orange_cushion").replace("minecraft:",""),o=parseInt(n[3]||"1",10)||1;this.inventory.addItem(r,o)?this.addChatMessage(`§aGave ${o} [${r}] to ${se.username}`):this.addChatMessage(`§cUnknown item: ${r}`)}else this.addChatMessage(`§eExecuted command: /${s}`);return}this.addChatMessage(`<${se.username}> ${t}`),((e=se.activeSession)==null?void 0:e.state)==="PLAY"&&se.activeSession.sendChat(t)}}class my{constructor(t,e){I(this,"canvas");I(this,"renderer");I(this,"scene");I(this,"camera");I(this,"ambientLight");I(this,"sunLight");I(this,"skyColor",new Bt(7907327));I(this,"panorama");I(this,"skyRenderer");I(this,"firstPersonHand");I(this,"entityRenderer");I(this,"particleSystem");I(this,"world");I(this,"inventory");I(this,"player");I(this,"ui");I(this,"inWorld",!1);I(this,"lastTime",performance.now());I(this,"frameCount",0);I(this,"fpsTimer",0);I(this,"ambientTickTimer",0);I(this,"autoSaveTimer",0);this.canvas=t,this.renderer=new Y_({canvas:t,antialias:!1,powerPreference:"high-performance"}),this.renderer.setSize(window.innerWidth,window.innerHeight),this.renderer.setPixelRatio(Math.min(window.devicePixelRatio,2)),this.renderer.outputColorSpace=de,this.scene=new al,this.scene.background=this.skyColor,this.scene.fog=new Hr(7907327,.011),this.camera=new Oe(70,window.innerWidth/window.innerHeight,.1,250),this.ambientLight=new eu(16777215,.75),this.scene.add(this.ambientLight),this.sunLight=new tu(16776171,.85),this.sunLight.position.set(80,140,60),this.scene.add(this.sunLight),this.panorama=new l0,this.skyRenderer=new c0(this.scene),this.entityRenderer=new a0(this.scene),this.particleSystem=new o0(this.scene),this.init(e)}async init(t){t.innerHTML=`
      <div style="position:fixed;inset:0;background:#ef323d;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:24px;z-index:50;">
        <img src="./assets/minecraft/textures/gui/title/mojangstudios.png" alt="Mojang Studios" style="width:420px;max-width:85vw;image-rendering:pixelated;" />
        <div style="width:360px;height:14px;border:2px solid #ffffff;padding:2px;">
          <div id="mojang-load-bar" style="width:20%;height:100%;background:#ffffff;transition:width 0.15s;"></div>
        </div>
      </div>
    `;const e=n=>{const s=document.getElementById("mojang-load-bar");s&&(s.style.width=`${n}%`)};await Promise.all([le.init(),Re.init()]),e(25),await nt.init(),e(55),await _e.build(),e(80),await Promise.all([Un.init(),pe.init(),se.init()]),this.world=new r0(this.scene,this.entityRenderer,this.particleSystem),this.inventory=new Jr,this.player=new u0(this.camera,this.world,this.inventory),this.firstPersonHand=new h0,this.ui=new py(t,this.player,this.inventory,this.world),e(95),await this.ui.initAssets(),e(100),this.ui.onStartGame=n=>{this.enterWorld(n)},this.ui.onQuitToTitle=()=>{this.inWorld=!1,this.player.isMining=!1,this.player.resetMining()},this.bindInputEvents(),window.__MC_26_3__=this,this.ui.setState("TITLE"),requestAnimationFrame(n=>this.loop(n))}enterWorld(t=!1){this.inWorld=!0,!t&&this.ui.loadActiveWorldState()||this.player.spawnAtWorldCenter(),this.world.updateChunksAroundPlayer(this.player.position.x,this.player.position.z);const n=Math.floor(this.player.position.x),s=Math.floor(this.player.position.z);this.entityRenderer.mobs.size===0&&(this.entityRenderer.spawnMob("sheep_1","sheep",n+8,this.world.getTopSolidY(n+8,s+6),s+6),this.entityRenderer.spawnMob("pig_1","pig",n-7,this.world.getTopSolidY(n-7,s+5),s+5),this.entityRenderer.spawnMob("cow_1","cow",n+12,this.world.getTopSolidY(n+12,s-6),s-6)),t||this.ui.saveActiveWorldState(),this.ui.setState("IN_GAME"),this.ui.updateHUDOnly(),t&&this.ui.addChatMessage("§b[Wispcraft] §fSynchronized world state over Wisp v2 TCP multiplexer!")}bindInputEvents(){window.addEventListener("beforeunload",()=>{this.inWorld&&this.ui.saveActiveWorldState()}),window.addEventListener("resize",()=>{const t=window.innerWidth,e=window.innerHeight;this.renderer.setSize(t,e),this.camera.aspect=t/e,this.camera.updateProjectionMatrix(),this.panorama.resize(t,e)}),document.addEventListener("pointerlockchange",()=>{!document.pointerLockElement&&this.ui.state==="IN_GAME"&&(this.player.isMining=!1,this.player.resetMining(),this.ui.setState("PAUSE"))}),window.addEventListener("mousemove",t=>{if(this.ui.state!=="IN_GAME"||document.pointerLockElement!==this.canvas)return;const e=le.current.mouseSensitivity*.0045;this.player.yaw-=t.movementX*e,this.player.pitch=Math.max(-Math.PI/2+.01,Math.min(Math.PI/2-.01,this.player.pitch-t.movementY*e))}),window.addEventListener("keydown",t=>{if(this.ui.state!=="CHAT"){if(t.code==="F3"){t.preventDefault(),this.ui.showDebugF3=!this.ui.showDebugF3;return}if(t.code==="KeyE"){if(this.ui.state==="IN_GAME"){t.preventDefault(),this.player.isMining=!1,this.player.resetMining(),this.ui.activeContainerTab="inventory",this.ui.setState("INVENTORY");return}else if(this.ui.state==="INVENTORY"&&!this.ui.focusedEditBox){t.preventDefault(),this.ui.setState("IN_GAME");return}}if((t.code==="KeyT"||t.code==="Slash")&&this.ui.state==="IN_GAME"){t.preventDefault(),this.player.isMining=!1,this.player.resetMining(),t.code==="Slash"?this.ui.chatInputText="/":this.ui.chatInputText="",this.ui.setState("CHAT");return}if(t.code==="Escape"){if(this.ui.state==="INVENTORY"){this.ui.setState("IN_GAME");return}else if(this.ui.state==="PAUSE"){this.ui.setState("IN_GAME");return}else if(this.ui.state==="ADVANCEMENTS"){this.ui.setState("PAUSE");return}}if(t.code.startsWith("Digit")&&this.ui.state==="IN_GAME"){const e=parseInt(t.code.slice(5),10);e>=1&&e<=9&&(this.inventory.selectedHotbarSlot=e-1,this.ui.updateHUDOnly())}if(t.code==="KeyW"&&!t.repeat&&this.ui.state==="IN_GAME"){const e=performance.now();e-this.player.lastWPress<280&&(this.player.isSprinting=!0),this.player.lastWPress=e}if(t.code==="Space"&&!t.repeat&&this.ui.state==="IN_GAME"){const e=performance.now();e-this.player.lastSpacePress<300&&this.player.gameMode==="creative"&&(this.player.flying=!this.player.flying),this.player.lastSpacePress=e}this.player.keys.add(t.code)}}),window.addEventListener("keyup",t=>{this.player.keys.delete(t.code)}),window.addEventListener("wheel",t=>{if(this.ui.state!=="IN_GAME")return;const e=t.deltaY>0?1:-1;this.inventory.selectedHotbarSlot=(this.inventory.selectedHotbarSlot+e+9)%9,this.ui.updateHUDOnly()}),this.canvas.addEventListener("contextmenu",t=>t.preventDefault()),this.canvas.addEventListener("mousedown",t=>{var e,n;if(this.ui.state==="IN_GAME"){if(document.pointerLockElement!==this.canvas){(n=(e=this.canvas).requestPointerLock)==null||n.call(e);return}if(t.button===0){this.player.triggerSwing(),this.firstPersonHand.triggerSwing();const s=new G;this.camera.getWorldDirection(s);const r=this.player.currentHit?Math.min(3.5,Math.hypot(this.player.currentHit.bx+.5-this.camera.position.x,this.player.currentHit.by+.5-this.camera.position.y,this.player.currentHit.bz+.5-this.camera.position.z)):3.5,o=this.entityRenderer.raycastMob(this.camera.position,s,r);if(o){this.player.isMining=!1,this.player.resetMining();const a=this.inventory.getHeldStack();let c=2;if(a){const h=a.item.shortId;h==="diamond_sword"?c=7:h==="iron_sword"?c=6:h==="stone_sword"?c=5:h==="wooden_sword"?c=4:h.endsWith("_axe")?c=8:h.endsWith("_pickaxe")?c=4:h.endsWith("_shovel")&&(c=3)}this.player.velocity.y<-.1&&!this.player.onGround&&!this.player.flying&&(c=Math.ceil(c*1.5)),this.entityRenderer.attackMob(o.mob.id,c,this.player.position,(h,f,u)=>{this.particleSystem.spawnBlockBreakBurst(Math.floor(h),Math.floor(f),Math.floor(u),16777215)}).hit&&(pe.playBlockSound("wool","break"),this.particleSystem.spawnBlockBreakBurst(Math.floor(o.mob.x),Math.floor(o.mob.y+.5),Math.floor(o.mob.z),13382451));return}this.player.isMining=!0,this.player.gameMode==="creative"&&(this.completeBlockBreak(),this.player.creativeBreakCooldown=.22)}else if(t.button===2)this.handleRightClickInteractOrPlace();else if(t.button===1){const s=this.player.currentHit;if(s){const r=nt.getBlock(s.blockNumId),o=nt.getItem(r.shortId);if(o){if(this.player.gameMode==="creative")this.inventory.slots[this.inventory.selectedHotbarSlot]={item:o,count:o.maxStack};else{const a=this.inventory.slots.findIndex(c=>c&&c.item.id===o.id);a>=0&&a<9&&(this.inventory.selectedHotbarSlot=a)}this.ui.updateHUDOnly()}}}}}),window.addEventListener("mouseup",t=>{t.button===0&&(this.player.isMining=!1,this.player.resetMining())})}updateMining(t){if(!this.player.isMining){this.player.miningProgress>0&&this.player.resetMining();return}if(this.player.miningHitSoundTimer+=t,this.player.miningHitSoundTimer>=.22){this.player.miningHitSoundTimer=0,this.player.triggerSwing(),this.firstPersonHand.triggerSwing();const c=this.player.currentHit;if(c&&this.player.gameMode==="survival"){const l=nt.getBlock(c.blockNumId);pe.playBlockSound(l.soundGroup,"step")}}if(this.player.gameMode==="creative"){this.player.creativeBreakCooldown<=0&&(this.completeBlockBreak(),this.player.creativeBreakCooldown=.22);return}const e=this.player.currentHit;if(!e){this.player.resetMining();return}if(this.entityRenderer.findCushionAtBlock(e.bx,e.by+1,e.bz)||this.entityRenderer.findCushionAtBlock(e.bx,e.by,e.bz)){this.completeBlockBreak(),this.player.isMining=!1,this.player.resetMining();return}const s=`${e.bx},${e.by},${e.bz}`;this.player.miningTargetKey!==s&&(this.player.miningTargetKey=s,this.player.miningProgress=0);const r=nt.getBlock(e.blockNumId),o=this.inventory.getHeldStack(),a=this.player.getDestroySpeedPerSecond(r,o?o.item:null);if(a<=0){this.player.resetMining();return}if(this.player.miningProgress+=a*t,this.player.miningProgress>=1)this.completeBlockBreak(),this.player.resetMining();else{const c=Math.min(9,Math.floor(this.player.miningProgress*10));this.player.updateCrackStageUVs(c)}}completeBlockBreak(){var s,r;const t=this.player.currentHit;if(!t)return;const e=this.entityRenderer.findCushionAtBlock(t.bx,t.by+1,t.bz)||this.entityRenderer.findCushionAtBlock(t.bx,t.by,t.bz);if(e){((s=this.player.seatedCushion)==null?void 0:s.id)===e.id&&this.player.dismountCushion(),this.entityRenderer.removeCushion(e.id),pe.play("entity.cushion.break",.85),this.particleSystem.spawnBlockBreakBurst(e.blockX,e.blockY,e.blockZ,16351261),this.player.gameMode==="survival"&&this.entityRenderer.spawnDroppedItem(e.blockX,e.blockY,e.blockZ,`${e.color}_cushion`);return}const n=nt.getBlock(t.blockNumId);if(!(n.hardness<0&&this.player.gameMode!=="creative")){if(n.shortId==="straw_bed"||n.shortId==="straw_bed_head")for(const[o,a]of[[1,0],[-1,0],[0,1],[0,-1]]){const c=this.world.getBlock(t.bx+o,t.by,t.bz+a),l=nt.getBlock(c);(l.shortId==="straw_bed"||l.shortId==="straw_bed_head")&&this.world.setBlock(t.bx+o,t.by,t.bz+a,0)}if(this.world.setBlock(t.bx,t.by,t.bz,0),pe.playBlockSound(n.soundGroup,"break"),this.particleSystem.spawnBlockBreakBurst(t.bx,t.by,t.bz,9137991),this.player.gameMode==="survival"){const o=this.inventory.getHeldStack();if((!(n.soundGroup==="stone")||o&&o.item.toolType==="pickaxe")&&n.shortId!=="short_grass"&&n.shortId!=="leaf_litter"){let l=n.shortId;l==="stone"?l="cobblestone":l==="grass_block"||l==="podzol"?l="dirt":l==="coal_ore"?l="coal":l==="diamond_ore"?l="diamond":l==="straw_bed_head"?l="straw_bed":l.includes("leaves")&&(l=Math.random()<.25?"stick":""),l&&this.entityRenderer.spawnDroppedItem(t.bx,t.by,t.bz,l)}}((r=se.activeSession)==null?void 0:r.state)==="PLAY"&&se.activeSession.sendBlockChange(t.bx,t.by,t.bz,"minecraft:air"),this.player.updateRaycast(),this.ui.updateHUDOnly()}}handleRightClickInteractOrPlace(){var c;const t=this.inventory.getHeldStack();if(t&&t.item.shortId==="filled_map"){this.firstPersonHand.triggerSwing();const l=this.world.findNearestAbandonedCamp(this.player.position.x,this.player.position.z);if(l){const h=Math.round(Math.hypot(l.x-this.player.position.x,l.z-this.player.position.z));this.ui.addChatMessage(`§6[Abandoned Camp Explorer Map] §eNearest Wilderness Camp located at §bX=${l.x}, Y=${l.y}, Z=${l.z} §7(${h}m away)!`),pe.play("ui.button.click",.8)}return}const e=this.player.currentHit;if(!e)return;const n=this.entityRenderer.findCushionAtBlock(e.bx,e.by,e.bz)||this.entityRenderer.findCushionAtBlock(e.bx,e.by+1,e.bz);if(n){this.player.sitOnCushion(n),this.ui.showToast("Take a Seat!",`Seated on ${nt.formatName(n.color+"_cushion")}`,`${n.color}_cushion`),this.ui.addChatMessage(`§aYou sat down on a §e${nt.formatName(n.color+"_cushion")}§a! (Press Shift to stand up)`);return}const s=nt.getBlock(e.blockNumId);if(s.shortId==="straw_bed"||s.shortId==="straw_bed_head"){pe.playBlockSound("straw_bed","place"),this.world.timeOfDay=1e3,this.ui.showToast("Sweet Wilderness Dreams!","Rested on a 26.3 Straw Bed","straw_bed"),this.ui.addChatMessage("§6[Straw Bed] §aRested in the wilderness Straw Bed! Respawn point set & morning has arrived.");return}if(!this.player.isSneaking){if(s.shortId==="crafting_table"){this.player.isMining=!1,this.player.resetMining(),this.ui.activeContainerTab="crafting",this.ui.setState("INVENTORY");return}if(s.shortId==="stonecutter"){this.player.isMining=!1,this.player.resetMining(),this.ui.activeContainerTab="stonecutter",this.ui.setState("INVENTORY");return}}if(!t)return;const r=e.bx+e.nx,o=e.by+e.ny,a=e.bz+e.nz;if(t.item.cushionColor){const l={id:`cushion_${r}_${o}_${a}_${Date.now()}`,x:r+.5,y:o,z:a+.5,blockX:r,blockY:o,blockZ:a,color:t.item.cushionColor,rotation:this.player.getCardinalFacingMeta()*90%360};this.entityRenderer.addCushion(l),pe.play("entity.cushion.place",.85),this.player.triggerSwing(),this.firstPersonHand.triggerSwing(),this.player.gameMode==="survival"&&this.inventory.consumeHeld(1),this.ui.updateHUDOnly();return}if(t.item.isBlock&&t.item.blockNumId!==void 0){const l=Math.abs(r+.5-this.player.position.x),h=Math.abs(a+.5-this.player.position.z),f=o-this.player.position.y;if(l<.7&&h<.7&&f>=-.9&&f<=1.6)return;const u=nt.getBlock(t.item.blockNumId),d=this.player.getCardinalFacingMeta();if(u.shortId==="straw_bed"){const p=[[0,-1],[1,0],[0,1],[-1,0]],[_,m]=p[d];this.world.setBlock(r,o,a,u.numId,d),this.world.setBlock(r+_,o,a+m,nt.getBlock("straw_bed_head").numId,d)}else this.world.setBlock(r,o,a,u.numId,d);pe.playBlockSound(u.soundGroup,"place"),this.player.triggerSwing(),this.firstPersonHand.triggerSwing(),this.player.gameMode==="survival"&&this.inventory.consumeHeld(1),((c=se.activeSession)==null?void 0:c.state)==="PLAY"&&se.activeSession.sendBlockChange(r,o,a,u.id),this.player.updateRaycast(),this.ui.updateHUDOnly()}}updateDayNightCycle(t){this.world.timeOfDay=(this.world.timeOfDay+t*12)%24e3;const e=this.world.timeOfDay;let n=1;e>=12e3&&e<14e3?n=1-(e-12e3)/2e3*.78:e>=14e3&&e<22e3?n=.22:e>=22e3&&(n=.22+(e-22e3)/2e3*.78),this.skyColor.setRGB(.47*n,.65*n,1*n),this.scene.fog instanceof Hr&&this.scene.fog.color.copy(this.skyColor),this.ambientLight.intensity=.35+.45*n,this.sunLight.intensity=.85*n,this.skyRenderer.update(t,this.player.position,this.world.timeOfDay,le.current.clouds?"FANCY":"OFF")}loop(t){var o;requestAnimationFrame(a=>this.loop(a));const e=Math.min(.1,(t-this.lastTime)/1e3);if(this.lastTime=t,this.frameCount++,this.fpsTimer+=e,this.fpsTimer>=.5&&(this.ui.fps=Math.round(this.frameCount/this.fpsTimer),this.frameCount=0,this.fpsTimer=0),!this.inWorld||this.ui.state==="TITLE"||this.ui.state==="SINGLEPLAYER_SELECT"||this.ui.state==="CREATE_WORLD"||this.ui.state==="MULTIPLAYER_SELECT"||this.ui.state==="WISPCRAFT_CONFIG"||this.ui.state==="CONNECTING"||this.ui.state==="OPTIONS"&&!this.inWorld){this.panorama.render(this.renderer,e),this.ui.render(e);return}const s=this.inWorld&&((o=se.activeSession)==null?void 0:o.state)!=="PLAY"&&(this.ui.state==="PAUSE"||this.ui.state==="OPTIONS"||this.ui.state==="ADVANCEMENTS"),r=this.ui.state==="IN_GAME";if(this.world.updateChunksAroundPlayer(this.player.position.x,this.player.position.z),s){this.player.resetMining();const a=this.inventory.getHeldStack();this.firstPersonHand.updateHeldItem(a?a.item:null)}else{this.player.update(e,r),r?this.updateMining(e):this.player.resetMining(),this.updateDayNightCycle(e),this.ambientTickTimer+=e,this.ambientTickTimer>=.18&&(this.ambientTickTimer=0,this.world.tickAmbientParticles(this.player.position.x,this.player.position.y,this.player.position.z)),this.particleSystem.update(e),this.entityRenderer.update(e,(l,h)=>this.world.getTopSolidY(l,h),this.player.position,l=>{const h=this.inventory.addItem(l,1);return h&&(pe.play("ui.button.click",.45),this.ui.updateHUDOnly(),this.ui.saveActiveWorldState()),h},(l,h,f)=>{const u=this.world.getBlock(l,h,f);return u!==0&&nt.getBlock(u).solid});const a=this.inventory.getHeldStack();this.firstPersonHand.updateHeldItem(a?a.item:null);const c=r&&(this.player.keys.has("KeyW")||this.player.keys.has("KeyS")||this.player.keys.has("KeyA")||this.player.keys.has("KeyD"));this.firstPersonHand.update(e,c,this.player.isSprinting),this.autoSaveTimer+=e,this.autoSaveTimer>=3&&(this.autoSaveTimer=0,this.ui.saveActiveWorldState())}this.renderer.render(this.scene,this.camera),this.firstPersonHand.render(this.renderer),this.ui.render(e)}}Xu();window.addEventListener("DOMContentLoaded",()=>{const i=document.getElementById("game-canvas"),t=document.getElementById("ui-root");i&&t&&new my(i,t)});
