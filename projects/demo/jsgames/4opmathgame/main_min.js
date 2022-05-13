"use strict";const __bi=Math.imul,__bf=e=>~~e,__td=new TextDecoder;function divisibleNums(t){let n=new Array;var r=__bf(Math.sqrt(t));n.push(1);for(let e=2;e<r;++e)t%e==0&&(n.push(e),n.push(t/e));return n.push(t),n}document.addEventListener("DOMContentLoaded",()=>{console.clear();const a=byId("inputElem"),e=byId("chck-btn"),t=byId("reload"),n=byId("modal"),r=byQS(".theAnswer"),o=byQS(".close"),d=byQS(".op"),s=byQS(".blue"),i=byQS(".red");var c=[__td.decode($answeroption01),__td.decode($answeroption02)],l=["+","-","*","/"];function b(){var e=l[generateRandom(0,4)];let t,n;switch(d.textContent=e){case"+":case"-":s.textContent=String(generateRandom(1,100)),i.textContent=String(generateRandom(1,100));break;case"*":s.textContent=String(generateRandom(0,10)),i.textContent=String(generateRandom(1,100));break;case"/":t=generateRandom(1,100),s.textContent=String(t);var r=divisibleNums(t);n=r[generateRandom(0,r.length)],i.textContent=String(n);break;default:throw new Error("Operator not found..!")}}b();var u=()=>{n.style.display="block",y()?(n.style.background="rgb(46, 204, 113)",r.textContent=c[0]):(n.style.background="#e74c3c",r.textContent=c[1])};e.addEventListener("click",u),a.addEventListener("keydown",e=>{13==e.keyCode&&u()}),document.addEventListener("keydown",e=>{27==e.keyCode&&m()}),o.addEventListener("click",()=>{n.style.display="none"}),t.addEventListener("click",()=>{m()});const y=()=>{var e=+a.value,t=0|+s.innerText,n=0|+i.innerText;let r=0;switch(d.innerText){case"+":r=add(t,n);break;case"-":r=sub(t,n);break;case"*":r=mul(t,n);break;case"/":r=div(t,n);break;default:throw new Error("Invalid op "+d)}return e==r},m=()=>{n.style.display="none",b(),a.value=""}});const byId=e=>document.getElementById(e),byQS=e=>document.querySelector(e),generateRandom=(e,t)=>0|~~(+Math.random()*t+e),add=(e,t)=>e+t,sub=(e,t)=>e-t,mul=(e,t)=>__bi(e,t),div=(e,t)=>e/t,$answeroption01=new Uint8Array([67,111,114,114,101,99,116,44,32,103,111,111,100,32,119,111,114,107,0]),$answeroption02=new Uint8Array([73,110,99,111,114,114,101,99,116,44,32,116,114,121,32,97,103,97,105,110,0]);