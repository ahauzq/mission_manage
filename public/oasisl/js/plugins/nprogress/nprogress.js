/* NProgress, (c) 2013, 2014 Rico Sta. Cruz - http://ricostacruz.com/nprogress
 * @license MIT */

(function(e,t){typeof define=="function"&&define.amd?define(t):typeof exports=="object"?module.exports=t():e.NProgress=t()})(this,function(){function n(e,t,n){return e<t?t:e>n?n:e}function r(e){return(-1+e)*100}function i(e,n,i){var s;return t.positionUsing==="translate3d"?s={transform:"translate3d("+r(e)+"%,0,0)"}:t.positionUsing==="translate"?s={transform:"translate("+r(e)+"%,0)"}:s={"margin-left":r(e)+"%"},s.transition="all "+n+"ms "+i,s}function u(e,t){var n=typeof e=="string"?e:l(e);return n.indexOf(" "+t+" ")>=0}function a(e,t){var n=l(e),r=n+t;if(u(n,t))return;e.className=r.substring(1)}function f(e,t){var n=l(e),r;if(!u(e,t))return;r=n.replace(" "+t+" "," "),e.className=r.substring(1,r.length-1)}function l(e){return(" "+(e&&e.className||"")+" ").replace(/\s+/gi," ")}function c(e){e&&e.parentNode&&e.parentNode.removeChild(e)}var e={};e.version="0.2.0";var t=e.settings={minimum:.08,easing:"linear",positionUsing:"",speed:350,trickle:!0,trickleSpeed:250,showSpinner:!0,barSelector:'[role="bar"]',spinnerSelector:'[role="spinner"]',parent:"body",template:'<div class="bar" role="bar"><div class="peg"></div></div><div class="spinner" role="spinner"><div class="spinner-icon"></div></div>'};e.configure=function(e){var n,r;for(n in e)r=e[n],r!==undefined&&e.hasOwnProperty(n)&&(t[n]=r);return this},e.status=null,e.set=function(r){var u=e.isStarted();r=n(r,t.minimum,1),e.status=r===1?null:r;var a=e.render(!u),f=a.querySelector(t.barSelector),l=t.speed,c=t.easing;return a.offsetWidth,s(function(n){t.positionUsing===""&&(t.positionUsing=e.getPositioningCSS()),o(f,i(r,l,c)),r===1?(o(a,{transition:"none",opacity:1}),a.offsetWidth,setTimeout(function(){o(a,{transition:"all "+l+"ms linear",opacity:0}),setTimeout(function(){e.remove(),n()},l)},l)):setTimeout(n,l)}),this},e.isStarted=function(){return typeof e.status=="number"},e.start=function(){e.status||e.set(0);var n=function(){setTimeout(function(){if(!e.status)return;e.trickle(),n()},t.trickleSpeed)};return t.trickle&&n(),this},e.done=function(t){return!t&&!e.status?this:e.inc(.3+.5*Math.random()).set(1)},e.inc=function(t){var r=e.status;if(!r)return e.start();if(r>1)return;return typeof t!="number"&&(r>=0&&r<.25?t=(Math.random()*3+3)/100:r>=.25&&r<.65?t=Math.random()*3/100:r>=.65&&r<.9?t=Math.random()*2/100:r>=.9&&r<.99?t=.005:t=0),r=n(r+t,0,.994),e.set(r)},e.trickle=function(){return e.inc()},function(){var t=0,n=0;e.promise=function(r){return!r||r.state()==="resolved"?this:(n===0&&e.start(),t++,n++,r.always(function(){n--,n===0?(t=0,e.done()):e.set((t-n)/t)}),this)}}(),e.render=function(n){if(e.isRendered())return document.getElementById("nprogress");a(document.documentElement,"nprogress-busy");var i=document.createElement("div");i.id="nprogress",i.innerHTML=t.template;var s=i.querySelector(t.barSelector),u=n?"-100":r(e.status||0),f=document.querySelector(t.parent),l;return o(s,{transition:"all 0 linear",transform:"translate3d("+u+"%,0,0)"}),t.showSpinner||(l=i.querySelector(t.spinnerSelector),l&&c(l)),f!=document.body&&a(f,"nprogress-custom-parent"),f.appendChild(i),i},e.remove=function(){f(document.documentElement,"nprogress-busy"),f(document.querySelector(t.parent),"nprogress-custom-parent");var e=document.getElementById("nprogress");e&&c(e)},e.isRendered=function(){return!!document.getElementById("nprogress")},e.getPositioningCSS=function(){var e=document.body.style,t="WebkitTransform"in e?"Webkit":"MozTransform"in e?"Moz":"msTransform"in e?"ms":"OTransform"in e?"O":"";return t+"Perspective"in e?"translate3d":t+"Transform"in e?"translate":"margin"};var s=function(){function t(){var n=e.shift();n&&n(t)}var e=[];return function(n){e.push(n),e.length==1&&t()}}(),o=function(){function n(e){return e.replace(/^-ms-/,"ms-").replace(/-([\da-z])/gi,function(e,t){return t.toUpperCase()})}function r(t){var n=document.body.style;if(t in n)return t;var r=e.length,i=t.charAt(0).toUpperCase()+t.slice(1),s;while(r--){s=e[r]+i;if(s in n)return s}return t}function i(e){return e=n(e),t[e]||(t[e]=r(e))}function s(e,t,n){t=i(t),e.style[t]=n}var e=["Webkit","O","Moz","ms"],t={};return function(e,t){var n=arguments,r,i;if(n.length==2)for(r in t)i=t[r],i!==undefined&&t.hasOwnProperty(r)&&s(e,r,i);else s(e,n[1],n[2])}}();return e});