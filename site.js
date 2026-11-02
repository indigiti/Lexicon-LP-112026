(() => {
 'use strict';
 const nav=document.querySelector('.main-nav'),toggle=document.querySelector('.nav-toggle');
 if(!nav||!toggle)return;
 const close=()=>{nav.classList.remove('open');toggle.setAttribute('aria-expanded','false');toggle.setAttribute('aria-label','Open navigation menu');};
 toggle.addEventListener('click',()=>{const open=nav.classList.toggle('open');toggle.setAttribute('aria-expanded',String(open));toggle.setAttribute('aria-label',open?'Close navigation menu':'Open navigation menu');});
 nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',close));
})();
