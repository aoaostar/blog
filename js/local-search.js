KEEP.initLocalSearch=()=>{let e=KEEP.hexo_config.path;if(e){let t=!1,r,n=!0;0===e.length?e="search.xml":e.endsWith("json")&&(n=!1);const o=document.querySelector(".search-input"),l=document.getElementById("search-result"),v=(e,t,r)=>{var n=e.length;if(0===n)return[];let o=0;var l,s=[];for(r||(t=t.toLowerCase(),e=e.toLowerCase());-1<(l=t.indexOf(e,o));)s.push({position:l,word:e}),o=l+n;return s},x=(e,t,r,n)=>{var o;let{position:l,word:s}=r[r.length-1];var i=[];let a=0;for(;l+s.length<=t&&0!==r.length;){s===n&&a++,i.push({position:l,length:s.length});var c=l+s.length;for(r.pop();0!==r.length&&(o=r[r.length-1],l=o.position,s=o.word,c>l);)r.pop()}return{hits:i,start:e,end:t,searchTextCount:a}},m=(r,e)=>{let n="",o=e.start;return e.hits.forEach(e=>{n+=r.substring(o,e.position);var t=e.position+e.length;n+=`<b class="search-keyword">${r.substring(e.position,t)}</b>`,o=t}),n+=r.substring(o,e.end)},s=()=>{if(t){let p=o.value.trim().toLowerCase(),g=p.split(/[-\s]+/),f=(1<g.length&&g.push(p),[]);if(0<p.length&&r.forEach(({title:e,content:n,url:o})=>{let t=e.toLowerCase(),r=n.toLowerCase(),l=[],s=[],i=0;if(g.forEach(e=>{l=l.concat(v(e,t,!1)),s=s.concat(v(e,r,!1))}),0<l.length||0<s.length){var a=l.length+s.length,c=([l,s].forEach(e=>{e.sort((e,t)=>t.position!==e.position?t.position-e.position:e.word.length-t.word.length)}),[]);0!==l.length&&(d=x(0,e.length,l,p),i+=d.searchTextCountInSlice,c.push(d));let r=[];for(;0!==s.length;){var{position:h,word:u}=s[s.length-1];let e=h-20,t=h+80;e<0&&(e=0),(t=t<h+u.length?h+u.length:t)>n.length&&(t=n.length);h=x(e,t,s,p);i+=h.searchTextCountInSlice,r.push(h)}r.sort((e,t)=>e.searchTextCount!==t.searchTextCount?t.searchTextCount-e.searchTextCount:e.hits.length!==t.hits.length?t.hits.length-e.hits.length:e.start-t.start);var d=parseInt(KEEP.theme_config.local_search.top_n_per_article||1,10);0<=d&&(r=r.slice(0,d));let t="";t+=0!==c.length?`<li><a href="${o}" class="search-result-title">${m(e,c[0])}</a>`:`<li><a href="${o}" class="search-result-title">${e}</a>`,r.forEach(e=>{t+=`<a href="${o}"><p class="search-result">${m(n,e)}...</p></a>`}),t+="</li>",f.push({item:t,id:f.length,hitCount:a,searchTextCount:i})}}),1===g.length&&""===g[0])l.innerHTML='<div id="no-result"><i class="fas fa-search fa-5x"></i></div>';else if(0===f.length)l.innerHTML='<div id="no-result"><i class="fas fa-box-open fa-5x"></i></div>';else{f.sort((e,t)=>e.searchTextCount!==t.searchTextCount?t.searchTextCount-e.searchTextCount:e.hitCount!==t.hitCount?t.hitCount-e.hitCount:t.id-e.id);let t='<ul class="search-result-list">';f.forEach(e=>{t+=e.item}),t+="</ul>",l.innerHTML=t,window.pjax&&window.pjax.refresh(l)}}},i=()=>{fetch(KEEP.hexo_config.root+e).then(e=>e.text()).then(e=>{t=!0,r=(r=n?[...(new DOMParser).parseFromString(e,"text/xml").querySelectorAll("entry")].map(e=>({title:e.querySelector("title").textContent,content:e.querySelector("content").textContent,url:e.querySelector("url").textContent})):JSON.parse(e)).filter(e=>e.title).map(e=>(e.title=e.title.trim(),e.content=e.content?e.content.trim().replace(/<[^>]+>/g,""):"",e.url=decodeURIComponent(e.url).replace(/\/{2,}/g,"/"),e));e=document.querySelector("#no-result");e&&(e.innerHTML='<i class="fas fa-search fa-5x"></i>')})},a=(KEEP.theme_config.local_search.preload&&i(),o&&o.addEventListener("input",s),document.querySelectorAll(".search-popup-trigger").forEach(e=>{e.addEventListener("click",()=>{document.body.style.overflow="hidden",document.querySelector(".search-pop-overlay").classList.add("active"),setTimeout(()=>o.focus(),500),t||i()})}),()=>{document.body.style.overflow="",document.querySelector(".search-pop-overlay").classList.remove("active")});document.querySelector(".search-pop-overlay").addEventListener("click",e=>{e.target===document.querySelector(".search-pop-overlay")&&a()}),document.querySelector(".search-input-field-pre").addEventListener("click",()=>{o.value="",o.focus(),s()}),document.querySelector(".popup-btn-close").addEventListener("click",a),window.addEventListener("pjax:success",a),window.addEventListener("keyup",e=>{"Escape"===e.key&&a()})}else console.warn("`hexo-generator-searchdb` plugin is not installed!")};