// Landing page enhancement only: the SchoolFlow embed owns all fields, validation and lead delivery.
// Preserve preselection CTAs while never hardcoding campus codes or sending CRM requests here.
(() => {
  'use strict';
  const formHost = document.getElementById('schoolflow-admissions');
  const target = document.getElementById('enquiry');
  if (!formHost || !target) return;
  let pending = null;
  let observer = null;
  function trySelect() {
    if (!pending) return;
    const form = formHost.querySelector('.sf2 form');
    if (!form) return;
    if (pending.grade) {
      const grade = form.querySelector('select[name="grade"]');
      const desired = pending.grade.replace(/^Class\s+/i, '').trim().toLowerCase();
      const match = grade && Array.from(grade.options).find(o => o.value && o.value.trim().toLowerCase() === desired);
      if (match) { grade.value = match.value; grade.dispatchEvent(new Event('change', { bubbles: true })); }
      pending.grade = null;
    }
    if (pending.campus) {
      const campus = form.querySelector('select[name="school_code"]');
      const desired = pending.campus.trim().toLowerCase();
      const options = campus && !campus.disabled ? Array.from(campus.options) : [];
      const match = options.find(o => o.value && (o.textContent || '').trim().toLowerCase().includes(desired));
      if (match) { campus.value = match.value; campus.dispatchEvent(new Event('change', { bubbles: true })); pending.campus = null; }
    }
    if (!pending.grade && !pending.campus) {
      pending = null;
      if (observer) { observer.disconnect(); observer = null; }
    }
  }
  document.addEventListener('click', event => {
    const button = event.target.closest('[data-grade], [data-campus], [data-visit]');
    if (!button) return;
    event.preventDefault();
    pending = {grade: button.dataset.grade || null, campus: button.dataset.campus || null};
    target.scrollIntoView({behavior:'smooth',block:'start'});
    if (observer) observer.disconnect();
    observer = new MutationObserver(trySelect);
    observer.observe(formHost, {childList:true,subtree:true});
    trySelect();
  });
})();
