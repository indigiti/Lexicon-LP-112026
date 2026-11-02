(() => {
 'use strict';
 const nav=document.querySelector('.main-nav'),toggle=document.querySelector('.nav-toggle');
 if(!nav||!toggle)return;
 const close=()=>{nav.classList.remove('open');toggle.setAttribute('aria-expanded','false');toggle.setAttribute('aria-label','Open navigation menu');};
 toggle.addEventListener('click',()=>{const open=nav.classList.toggle('open');toggle.setAttribute('aria-expanded',String(open));toggle.setAttribute('aria-label',open?'Close navigation menu':'Open navigation menu');});
 nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',close));
})();

// Progressive upgrade to the approved AI-photo set. Keep original images as fallback
// until all six local WebP assets have been uploaded and verified.
(() => {
  'use strict';
  const tiles = Array.from(document.querySelectorAll('img[data-ai-photo]'));
  if (tiles.length !== 6) return;
  Promise.all(tiles.map(img => new Promise((resolve, reject) => {
    const test = new Image();
    test.onload = () => resolve({ img, src: img.dataset.aiPhoto });
    test.onerror = reject;
    test.src = img.dataset.aiPhoto;
  }))).then(verified => {
    // Avoid mixed AI illustration sets during partial uploads.
    verified.forEach(({ img, src }) => { img.src = src; });
  }).catch(() => {
    // An incomplete upload leaves the original working image rail visible.
  });
})();
