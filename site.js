(function(){
'use strict';
var d = document, w = window;
var reduced = w.matchMedia('(prefers-reduced-motion: reduce)').matches;
var finePointer = w.matchMedia('(pointer: fine)').matches;

d.getElementById('year').textContent = new Date().getFullYear();

/* fallback per foto esterne */
Array.prototype.forEach.call(d.querySelectorAll('img[src^="http"]'), function(im){
  im.addEventListener('error', function(){ im.style.display = 'none'; });
});

/* header + barra mobile */
var header = d.getElementById('header');
var mobileBar = d.getElementById('mobileBar');
function onScroll(){
  var y = w.scrollY || w.pageYOffset;
  if(header) header.classList.toggle('scrolled', y > 40);
  if(mobileBar) mobileBar.classList.toggle('show', y > w.innerHeight * 0.7);
}
w.addEventListener('scroll', onScroll, {passive:true});
onScroll();

/* menu sovrapposto */
var menu = d.getElementById('menu');
var menuBtn = d.getElementById('menuBtn');
if(menu && menuBtn){
  var menuPreview = d.getElementById('menuPreview');
  var menuPreviewImg = menuPreview ? menuPreview.querySelector('img') : null;
  function setMenu(open){
    menu.classList.toggle('open', open);
    menu.setAttribute('aria-hidden', open ? 'false' : 'true');
    menuBtn.classList.toggle('active', open);
    d.body.classList.toggle('menu-open', open);
    menuBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
  }
  menuBtn.addEventListener('click', function(){ setMenu(!menu.classList.contains('open')); });
  Array.prototype.forEach.call(menu.querySelectorAll('nav a'), function(a){
    a.addEventListener('click', function(){ setMenu(false); });
    if(finePointer && !reduced && menuPreviewImg){
      a.addEventListener('mouseenter', function(){ menuPreviewImg.src = a.getAttribute('data-img') || ''; menuPreview.classList.add('on'); });
      a.addEventListener('mouseleave', function(){ menuPreview.classList.remove('on'); });
    }
  });
  if(finePointer && !reduced && menuPreview){
    menu.addEventListener('mousemove', function(e){
      menuPreview.style.left = (e.clientX + 46) + 'px';
      menuPreview.style.top = (e.clientY - 170) + 'px';
    });
  }
}

/* reveal */
var rvEls = d.querySelectorAll('.rv');
if(reduced || !('IntersectionObserver' in w)){
  Array.prototype.forEach.call(rvEls, function(el){ el.classList.add('in'); });
}else{
  var io = new IntersectionObserver(function(es){ es.forEach(function(en){ if(en.isIntersecting){ en.target.classList.add('in'); io.unobserve(en.target); } }); }, {threshold: 0.12, rootMargin: '0px 0px -6% 0px'});
  Array.prototype.forEach.call(rvEls, function(el){ io.observe(el); });
}

/* contatori */
function animateCounter(el){
  var raw = el.getAttribute('data-count');
  var target = parseFloat(raw.replace(',', '.'));
  var decimals = el.hasAttribute('data-decimals') ? parseInt(el.getAttribute('data-decimals'), 10) : (raw.indexOf(',') > -1 ? 1 : 0);
  var suffix = el.getAttribute('data-suffix') || '';
  var dur = 1300, start = null;
  function ease(t){ return 1 - Math.pow(1 - t, 3); }
  function frame(ts){
    if(!start) start = ts;
    var p = Math.min((ts - start) / dur, 1);
    el.textContent = (target * ease(p)).toFixed(decimals).replace('.', ',') + suffix;
    if(p < 1){ requestAnimationFrame(frame); } else { el.textContent = raw + suffix; }
  }
  requestAnimationFrame(frame);
}
var cntEls = d.querySelectorAll('.cnt');
if(reduced || !('IntersectionObserver' in w)){
  Array.prototype.forEach.call(cntEls, function(el){ el.textContent = el.getAttribute('data-count') + (el.getAttribute('data-suffix') || ''); });
}else{
  var cio = new IntersectionObserver(function(es){ es.forEach(function(en){ if(en.isIntersecting){ animateCounter(en.target); cio.unobserve(en.target); } }); }, {threshold: 0.6});
  Array.prototype.forEach.call(cntEls, function(el){ cio.observe(el); });
}

/* lightbox */
var gItems = Array.prototype.slice.call(d.querySelectorAll('.g-item'));
var lb = d.getElementById('lightbox');
if(lb && gItems.length){
  var lbImg = d.getElementById('lbImg'), lbCap = d.getElementById('lbCap'), lbCount = d.getElementById('lbCount'), lbIdx = 0;
  function openLb(i){
    lbIdx = (i + gItems.length) % gItems.length;
    var img = gItems[lbIdx].querySelector('img');
    lbImg.src = img.src; lbImg.alt = img.alt;
    lbCap.textContent = gItems[lbIdx].getAttribute('data-cap');
    lbCount.textContent = (lbIdx + 1) + ' / ' + gItems.length;
    lb.classList.add('open'); d.body.classList.add('lb-open');
  }
  function closeLb(){ lb.classList.remove('open'); d.body.classList.remove('lb-open'); }
  gItems.forEach(function(it, i){ it.addEventListener('click', function(){ openLb(i); }); });
  d.getElementById('lbClose').addEventListener('click', closeLb);
  d.getElementById('lbPrev').addEventListener('click', function(){ openLb(lbIdx - 1); });
  d.getElementById('lbNext').addEventListener('click', function(){ openLb(lbIdx + 1); });
  lb.addEventListener('click', function(e){ if(e.target === lb) closeLb(); });
  d.addEventListener('keydown', function(e){
    if(e.key === 'Escape') closeLb();
    if(lb.classList.contains('open')){
      if(e.key === 'ArrowRight') openLb(lbIdx + 1);
      if(e.key === 'ArrowLeft') openLb(lbIdx - 1);
    }
  });
}

/* faq */
Array.prototype.forEach.call(d.querySelectorAll('.faq-item'), function(item){
  var q = item.querySelector('.faq-q');
  var a = item.querySelector('.faq-a');
  if(!q || !a) return;
  q.addEventListener('click', function(){
    var open = item.classList.toggle('open');
    q.setAttribute('aria-expanded', open ? 'true' : 'false');
    a.style.maxHeight = open ? (a.scrollHeight + 'px') : '0px';
  });
});

/* consenso cookie */
var cookieBar = d.getElementById('cookieBar');
if(cookieBar){
  var CK = 'dc-consent-v1';
  function setConsent(v){
    try{ localStorage.setItem(CK, v); }catch(err){}
    cookieBar.classList.remove('show');
  }
  setTimeout(function(){ try{ if(!localStorage.getItem(CK)) cookieBar.classList.add('show'); }catch(err){ cookieBar.classList.add('show'); } }, 1200);
  var ckAll = d.getElementById('ckAll'), ckTech = d.getElementById('ckTech');
  if(ckAll) ckAll.addEventListener('click', function(){ setConsent('all'); });
  if(ckTech) ckTech.addEventListener('click', function(){ setConsent('tech'); });
  var ckSave = d.getElementById('ckSave');
  if(ckSave) ckSave.addEventListener('click', function(){
    var st = d.getElementById('ckStat'), mk = d.getElementById('ckMkt');
    setConsent(st && mk && st.checked && mk.checked ? 'all' : (st && st.checked) || (mk && mk.checked) ? 'custom' : 'tech');
  });
}

/* slider recensioni */
var tTrack = d.getElementById('tTrack');
if(tTrack){
  var tSlides = tTrack.children.length, tIdx = 0;
  var tDots = d.getElementById('tDots');
  function tGo(i){
    tIdx = (i + tSlides) % tSlides;
    tTrack.style.transform = 'translateX(-' + (tIdx * 100) + '%)';
    Array.prototype.forEach.call(tDots.children, function(dot, j){ dot.classList.toggle('on', j === tIdx); });
  }
  for(var ti = 0; ti < tSlides; ti++){
    (function(i){
      var b = d.createElement('button');
      b.setAttribute('aria-label', 'Vai alla recensione ' + (i + 1));
      b.addEventListener('click', function(){ tGo(i); });
      tDots.appendChild(b);
    })(ti);
  }
  tGo(0);
  d.getElementById('tPrev').addEventListener('click', function(){ tGo(tIdx - 1); });
  d.getElementById('tNext').addEventListener('click', function(){ tGo(tIdx + 1); });
  if(!reduced){
    var tTimer = setInterval(function(){ tGo(tIdx + 1); }, 8000);
    var ospitiSec = d.getElementById('ospiti');
    if(ospitiSec){
      ospitiSec.addEventListener('mouseenter', function(){ clearInterval(tTimer); });
      ospitiSec.addEventListener('mouseleave', function(){ clearInterval(tTimer); tTimer = setInterval(function(){ tGo(tIdx + 1); }, 8000); });
    }
  }
}

/* rail */
var rail = d.getElementById('rail');
if(rail){
  var railPrev = d.getElementById('railPrev'), railNext = d.getElementById('railNext');
  if(railPrev) railPrev.addEventListener('click', function(){ rail.scrollBy({left: -360, behavior: reduced ? 'auto' : 'smooth'}); });
  if(railNext) railNext.addEventListener('click', function(){ rail.scrollBy({left: 360, behavior: reduced ? 'auto' : 'smooth'}); });
}

/* modulo richiesta offerta */
var form = d.getElementById('bookingForm');
if(form){
  var formWrap = d.getElementById('formWrap');
  var fName = d.getElementById('fNome'), fEmail = d.getElementById('fEmail'), fTel = d.getElementById('fTel');
  var fGuests = d.getElementById('fGuests');
  var fMsg = d.getElementById('fMsg'), fPriv = d.getElementById('fPrivacy'), fHoney = d.getElementById('fHoney');
  var submitBtn = d.getElementById('submitBtn'), submitLabel = d.getElementById('submitLabel');
  var apartmentSuggestion = d.getElementById('apartmentSuggestion');
  var suggestedApartment = '';

  /* --- Calendario: selezione facoltativa dei giorni, marcati con una X --- */
  var calGrid = d.getElementById('calGrid');
  var calMonthLabel = d.getElementById('calMonthLabel');
  var calPrev = d.getElementById('calPrev'), calNext = d.getElementById('calNext');
  var calSelectedBox = d.getElementById('calSelectedBox'), calSelectedText = d.getElementById('calSelectedText');
  var calClear = d.getElementById('calClear');
  var fDateSelezionate = d.getElementById('fDateSelezionate');
  var todayD = new Date(); todayD.setHours(0,0,0,0);
  var viewYear = todayD.getFullYear(), viewMonth = todayD.getMonth();
  var selectedDates = [];
  var MESI = ['Gennaio','Febbraio','Marzo','Aprile','Maggio','Giugno','Luglio','Agosto','Settembre','Ottobre','Novembre','Dicembre'];

  function fmtDateObj(dt){ return dt.getDate().toString().padStart(2,'0') + '/' + (dt.getMonth()+1).toString().padStart(2,'0') + '/' + dt.getFullYear(); }
  function isSameDay(a,b){ return a.getFullYear()===b.getFullYear() && a.getMonth()===b.getMonth() && a.getDate()===b.getDate(); }

  function renderCalendar(){
    if(!calGrid) return;
    Array.prototype.slice.call(calGrid.querySelectorAll('.cal-day')).forEach(function(n){ n.remove(); });
    calMonthLabel.textContent = MESI[viewMonth] + ' ' + viewYear;
    var firstOfMonth = new Date(viewYear, viewMonth, 1);
    var startWeekday = (firstOfMonth.getDay() + 6) % 7;
    var daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
    for(var i = 0; i < startWeekday; i++){ calGrid.appendChild(d.createElement('span')); }
    for(var day = 1; day <= daysInMonth; day++){
      var thisDate = new Date(viewYear, viewMonth, day);
      var btn = d.createElement('button');
      btn.type = 'button'; btn.className = 'cal-day'; btn.textContent = day;
      btn.setAttribute('aria-label', fmtDateObj(thisDate));
      if(thisDate < todayD){
        btn.classList.add('disabled'); btn.setAttribute('aria-disabled','true');
      } else {
        var isSel = selectedDates.some(function(sd){ return isSameDay(sd, thisDate); });
        btn.classList.toggle('selected', isSel);
        btn.setAttribute('aria-pressed', isSel ? 'true' : 'false');
        btn.addEventListener('click', function(ev){
          var lbl = ev.currentTarget.textContent;
          toggleDate(new Date(viewYear, viewMonth, parseInt(lbl, 10)));
        });
      }
      calGrid.appendChild(btn);
    }
  }
  function toggleDate(dt){
    var idx = selectedDates.findIndex(function(sd){ return isSameDay(sd, dt); });
    if(idx > -1) selectedDates.splice(idx, 1); else { selectedDates.push(dt); selectedDates.sort(function(a,b){ return a-b; }); }
    updateSelectedRange(); renderCalendar();
  }
  function updateSelectedRange(){
    if(!calSelectedBox) return;
    if(selectedDates.length === 0){ calSelectedBox.hidden = true; fDateSelezionate.value = ''; return; }
    calSelectedBox.hidden = false;
    var formatted = selectedDates.map(fmtDateObj);
    calSelectedText.textContent = formatted.join(', ');
    fDateSelezionate.value = formatted.join(', ');
  }
  if(calPrev) calPrev.addEventListener('click', function(){ viewMonth--; if(viewMonth<0){viewMonth=11; viewYear--;} renderCalendar(); });
  if(calNext) calNext.addEventListener('click', function(){ viewMonth++; if(viewMonth>11){viewMonth=0; viewYear++;} renderCalendar(); });
  if(calClear) calClear.addEventListener('click', function(){ selectedDates = []; updateSelectedRange(); renderCalendar(); });
  renderCalendar();

  /* --- Auto-selezione appartamento in base al numero di ospiti ---
     Amalfi: appartamento fino a 4 persone. Positano: appartamento fino a 2 persone. */
  function updateApartmentSuggestion(){
    var val = parseInt(fGuests.value, 10);
    if(!val){ apartmentSuggestion.textContent = ''; suggestedApartment = ''; return; }
    if(val <= 2){
      suggestedApartment = 'positano';
      apartmentSuggestion.textContent = 'In base al numero di ospiti, ti proponiamo l\u2019Appartamento Positano (fino a 2 persone).';
    } else {
      suggestedApartment = 'amalfi';
      apartmentSuggestion.textContent = 'In base al numero di ospiti, ti proponiamo l\u2019Appartamento Amalfi (fino a 4 persone).';
    }
  }
  fGuests.addEventListener('change', updateApartmentSuggestion);

  function setErr(id, msg){
    var el = d.getElementById(id);
    if(!el) return;
    el.classList.toggle('err', !!msg);
    var m = el.querySelector('.f-err-msg');
    if(m) m.textContent = msg || '';
  }

  form.addEventListener('submit', function(e){
    e.preventDefault();
    if(fHoney.value){ formWrap.classList.add('sent'); return; }
    var ok = true;
    if(fName.value.trim().length < 3){ setErr('wNome', 'Inserisci nome e cognome.'); ok = false; } else setErr('wNome', '');
    if(!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(fEmail.value.trim())){ setErr('wEmail', 'Inserisci un indirizzo email valido.'); ok = false; } else setErr('wEmail', '');
    if(!fTel.value.trim()){ setErr('wTel', 'Inserisci un numero di cellulare.'); ok = false; } else setErr('wTel', '');
    var privErr = d.getElementById('privErr');
    if(!fPriv.checked){ privErr.textContent = 'È necessario accettare l\u2019informativa privacy.'; ok = false; } else privErr.textContent = '';
    if(!ok) return;
    submitBtn.disabled = true;
    submitLabel.textContent = 'Invio in corso…';
    setTimeout(function(){
      d.getElementById('sName').textContent = fName.value.trim().split(' ')[0];

      var mobilita = Array.prototype.slice.call(form.querySelectorAll('input[name="mobilita"]:checked')).map(function(el){ return el.value; });
      var arrivoAuto = form.querySelector('input[name="arrivo_auto"]').checked;
      var parcheggio = form.querySelector('input[name="necessita_parcheggio"]').checked;
      var culla = form.querySelector('input[name="culla"]').checked;

      var sSumEl = d.getElementById('sSum');
      sSumEl.textContent = '';
      var sB = d.createElement('b'); sB.textContent = fName.value.trim(); sSumEl.appendChild(sB);
      sSumEl.appendChild(d.createElement('br'));
      if(fDateSelezionate.value){ sSumEl.appendChild(d.createTextNode('Periodo: ' + fDateSelezionate.value)); sSumEl.appendChild(d.createElement('br')); }
      sSumEl.appendChild(d.createTextNode(fGuests.value + (fGuests.value === '1' ? ' ospite' : ' ospiti') + (suggestedApartment ? (' · Appartamento ' + (suggestedApartment === 'amalfi' ? 'Amalfi' : 'Positano')) : '')));

      var waParts = ['Ciao Domus Costa! Sono ' + fName.value.trim() + '.'];
      if(fGuests.value) waParts.push(fGuests.value + ' ospiti' + (suggestedApartment ? (', Appartamento ' + (suggestedApartment === 'amalfi' ? 'Amalfi' : 'Positano')) : '') + '.');
      if(fDateSelezionate.value) waParts.push('Periodo di interesse: ' + fDateSelezionate.value + '.');
      if(arrivoAuto) waParts.push('Arrivo in auto.');
      if(parcheggio) waParts.push('Necessità di parcheggio.');
      if(mobilita.length) waParts.push('Mobilità: ' + mobilita.join(', ') + '.');
      if(culla) waParts.push('Richiesta culla.');
      waParts.push('Email: ' + fEmail.value.trim() + ' - Tel: ' + fTel.value.trim());
      if(fMsg.value) waParts.push('Note: ' + fMsg.value);
      d.getElementById('sWhats').href = 'https://wa.me/393291765764?text=' + encodeURIComponent(waParts.join(' '));

      formWrap.classList.add('sent');
      submitBtn.disabled = false;
      submitLabel.textContent = 'Invia richiesta d\u2019offerta';
      formWrap.scrollIntoView({behavior: reduced ? 'auto' : 'smooth', block: 'center'});
    }, reduced ? 100 : 1200);
  });
  d.getElementById('againBtn').addEventListener('click', function(){
    formWrap.classList.remove('sent'); form.reset();
    selectedDates = []; updateSelectedRange(); renderCalendar();
    apartmentSuggestion.textContent = ''; suggestedApartment = '';
  });
}
/* cinematic depth: mouse and scroll, disabled for reduced motion */
if(!reduced && finePointer){
 var cinematic=d.querySelectorAll('.hero-bg img,.ph-bg img,.image-two-bg img');
 w.addEventListener('mousemove',function(e){var x=(e.clientX/w.innerWidth-.5)*8,y=(e.clientY/w.innerHeight-.5)*5;Array.prototype.forEach.call(cinematic,function(im){im.style.translate=x+'px '+y+'px'})},{passive:true});
}
})();
