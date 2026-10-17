(()=>{
 const updateLanguages=()=>document.querySelectorAll('.language-switch a').forEach(link=>{link.hash=['#paths','#areas','#practice','#discover','#main','#top'].includes(location.hash)?location.hash:''});
 addEventListener('hashchange',updateLanguages);updateLanguages();
 const toggle=document.querySelector('.nav-toggle'),nav=document.getElementById('site-navigation');
 if(!toggle||!nav)return;
 const close=()=>{nav.removeAttribute('data-open');toggle.setAttribute('aria-expanded','false')};
 toggle.addEventListener('click',()=>{const open=toggle.getAttribute('aria-expanded')!=='true';toggle.setAttribute('aria-expanded',String(open));nav.toggleAttribute('data-open',open);if(open)nav.querySelector('a')?.focus()});
 nav.addEventListener('click',event=>{if(event.target.closest('a'))close()});
 document.addEventListener('keydown',event=>{if(event.key==='Escape'&&toggle.getAttribute('aria-expanded')==='true'){close();toggle.focus()}});
 document.addEventListener('click',event=>{if(!event.target.closest('.site-header'))close()});
 matchMedia('(max-width:1000px)').addEventListener('change',close);
})();
