/* Affine Studio site */
(function(){
  // Where the preview form sends answers. Change it here and in the footer link of index.html.
  var MAIL = 'studio@affine.studio';

  var form = document.getElementById('preview-form');
  var planSel = document.getElementById('f-plan');
  var err = document.getElementById('form-error');

  // plan buttons carry the choice into the form
  document.querySelectorAll('[data-plan]').forEach(function(b){
    b.addEventListener('click', function(){
      planSel.value = b.getAttribute('data-plan');
      document.getElementById('start').scrollIntoView({behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth'});
      setTimeout(function(){ document.getElementById('f-name').focus({preventScroll:true}); }, 500);
    });
  });

  form.addEventListener('submit', function(e){
    e.preventDefault();
    var v = function(id){ return (document.getElementById(id).value || '').trim(); };
    var missing = [];
    if(!v('f-name')) missing.push('your name');
    if(!v('f-biz')) missing.push('your business name');
    if(!v('f-contact')) missing.push('a phone or email');
    if(missing.length){
      err.textContent = 'Add ' + missing.join(', ').replace(/, ([^,]*)$/, ' and $1') + ' so we can reach you.';
      err.hidden = false;
      return;
    }
    err.hidden = true;
    var plan = v('f-plan') || 'Not sure yet';
    var body = [
      'Name: ' + v('f-name'),
      'Business: ' + v('f-biz'),
      'What we do: ' + (v('f-what') || '-'),
      'Area: ' + (v('f-town') || '-'),
      'Current website: ' + (v('f-site') || 'None'),
      'Best contact: ' + v('f-contact'),
      'Plan: ' + plan
    ].join('\n');
    var subject = 'Free preview: ' + v('f-biz');
    window.location.href = 'mailto:' + MAIL + '?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
  });
})();
