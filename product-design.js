(function(){
 const current=location.pathname.split('/').pop()||'index.html';
 document.querySelectorAll('.navlinks a').forEach(a=>{if(a.getAttribute('href')===current)a.setAttribute('aria-current','page')});
 if(!document.body.classList.contains('home-page')&&!document.querySelector('.ux-jump')){
  const headings=[...document.querySelectorAll('main section:not(.case-hero) h2')].filter(h=>!h.closest('.cta'));
  if(headings.length>2){
   const nav=document.createElement('nav');nav.className='product-case-nav';nav.setAttribute('aria-label','Case study sections');const inner=document.createElement('div');inner.className='container';
   headings.slice(0,8).forEach((h,i)=>{h.id=h.id||'case-section-'+i;const a=document.createElement('a');a.href='#'+h.id;a.textContent=h.textContent.trim();inner.append(a)});nav.append(inner);const hero=document.querySelector('.case-hero');if(hero)hero.after(nav);
  }
 }
 const button=document.createElement('button');button.className='product-back-top';button.type='button';button.setAttribute('aria-label','Back to top');button.textContent='↑';button.hidden=true;document.body.append(button);
 let queued=false;addEventListener('scroll',()=>{if(queued)return;queued=true;requestAnimationFrame(()=>{button.hidden=scrollY<700;queued=false})},{passive:true});button.addEventListener('click',()=>{window.scrollTo({top:0,behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});const brand=document.querySelector('.brand');if(brand)brand.focus({preventScroll:true})});
})();
