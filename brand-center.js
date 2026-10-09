(function(){
 const section=document.querySelector('.ws-brand-center');if(!section)return;
 const viewport=section.querySelector('.ws-bc-viewport'),img=viewport.querySelector('img'),play=section.querySelector('.ws-bc-play'),pause=section.querySelector('.ws-bc-pause');
 const reduced=matchMedia('(prefers-reduced-motion: reduce)');let animation=null,started=false;
 function reset(){if(animation)animation.cancel();animation=null;pause.disabled=true;pause.textContent='Pause';}
 function run(){reset();if(reduced.matches||!img.complete||!img.naturalWidth||!img.animate)return;const distance=Math.max(0,img.getBoundingClientRect().height-viewport.clientHeight);if(!distance)return;
 animation=img.animate([{transform:'translateY(0)',offset:0},{transform:'translateY(0)',offset:.12},{transform:'translateY(-'+distance+'px)',offset:.85},{transform:'translateY(-'+distance+'px)',offset:1}],{duration:14000,easing:'ease-in-out',fill:'forwards'});pause.disabled=false;animation.onfinish=()=>{pause.disabled=true;pause.textContent='Pause'};
 }
 function setup(){play.disabled=reduced.matches||!img.animate;play.textContent=reduced.matches?'Motion disabled':'Replay preview ↻';if(reduced.matches)reset();}
 play.addEventListener('click',run);pause.addEventListener('click',()=>{if(!animation)return;const paused=animation.playState==='paused';if(paused)animation.play();else animation.pause();pause.textContent=paused?'Pause':'Resume'});
 viewport.addEventListener('click',()=>{if(animation&&animation.playState==='running'){animation.pause();pause.textContent='Resume'}});
 const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting&&!started){started=true;if(img.complete)run();else img.addEventListener('load',run,{once:true})}else if(!e.isIntersecting&&animation&&animation.playState==='running'){animation.pause();pause.textContent='Resume'}}),{threshold:.4});observer.observe(viewport);
 document.addEventListener('visibilitychange',()=>{if(document.hidden&&animation&&animation.playState==='running'){animation.pause();pause.textContent='Resume'}});
 window.addEventListener('resize',reset);reduced.addEventListener('change',setup);setup();
})();
