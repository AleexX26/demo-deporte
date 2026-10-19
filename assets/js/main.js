/* Club Natación Leganés · interacciones (sin dependencias) */
(function () {
  'use strict';

  var root = document.documentElement;
  root.classList.add('js');
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Cabecera: fondo sólido al hacer scroll ---------- */
  var header = document.getElementById('cabecera');
  var hero = document.getElementById('inicio');
  var ticking = false;
  function updateHeader() {
    ticking = false;
    if (!header) return;
    // Transparente solo arriba del todo: en cuanto se baja, fondo sólido (evita solaparse con el hero)
    header.classList.toggle('is-scrolled', !hero || window.scrollY > 40);
    document.body.classList.toggle('page-scrolled', window.scrollY > 300);
    // Progreso de lectura (corchera + gorro bajo la cabecera)
    var max = document.documentElement.scrollHeight - window.innerHeight;
    header.style.setProperty('--p', max > 0 ? Math.min(window.scrollY / max, 1).toFixed(4) : 0);
  }
  function requestHeader() {
    if (!ticking) { ticking = true; window.requestAnimationFrame(updateHeader); }
  }
  updateHeader();
  window.addEventListener('scroll', requestHeader, { passive: true });
  window.addEventListener('resize', requestHeader);

  /* ---------- Menú hamburguesa ---------- */
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.getElementById('menu-principal');
  var desktop = window.matchMedia('(min-width: 1000px)');

  function setMenu(open) {
    if (!toggle || !nav) return;
    toggle.setAttribute('aria-expanded', String(open));
    toggle.querySelector('.visually-hidden').textContent = open ? 'Cerrar menú' : 'Abrir menú';
    nav.classList.toggle('is-open', open);
    document.body.classList.toggle('menu-open', open);
    if (open) {
      var first = nav.querySelector('a');
      if (first) first.focus();
    }
  }
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      setMenu(toggle.getAttribute('aria-expanded') !== 'true');
    });
    nav.addEventListener('click', function (e) {
      if (e.target.closest('a') && !desktop.matches) setMenu(false);
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && nav.classList.contains('is-open')) {
        setMenu(false);
        toggle.focus();
      }
      // Mantener el foco dentro del menú abierto
      if (e.key === 'Tab' && nav.classList.contains('is-open')) {
        var items = [toggle].concat(Array.prototype.slice.call(nav.querySelectorAll('a')));
        var i = items.indexOf(document.activeElement);
        if (e.shiftKey && i <= 0) { e.preventDefault(); items[items.length - 1].focus(); }
        else if (!e.shiftKey && i === items.length - 1) { e.preventDefault(); items[0].focus(); }
      }
    });
    desktop.addEventListener('change', function () { setMenu(false); });
  }

  /* ---------- Enlace activo del menú ---------- */
  var navLinks = nav ? nav.querySelectorAll('ul a[href^="#"]') : [];
  if ('IntersectionObserver' in window && navLinks.length) {
    var byId = {};
    navLinks.forEach(function (a) { byId[a.getAttribute('href').slice(1)] = a; });
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        var link = byId[entry.target.id];
        if (!link) return;
        if (entry.isIntersecting) {
          navLinks.forEach(function (a) { a.removeAttribute('aria-current'); });
          link.setAttribute('aria-current', 'true');
        }
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    Object.keys(byId).forEach(function (id) {
      var el = document.getElementById(id);
      if (el) spy.observe(el);
    });
  }

  /* ---------- Animaciones al hacer scroll ---------- */
  var reveals = document.querySelectorAll('.reveal');
  if (reduceMotion || !('IntersectionObserver' in window)) {
    reveals.forEach(function (el) { el.classList.add('is-visible'); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        io.unobserve(entry.target);
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    reveals.forEach(function (el) {
      // Pequeño escalonado entre hermanos (tarjetas, cifras…)
      var siblings = el.parentElement ? el.parentElement.children : [];
      var index = Array.prototype.indexOf.call(siblings, el);
      if (index > 0) el.style.setProperty('--d', Math.min(index, 5) * 0.07 + 's');
      io.observe(el);
    });
  }

  /* ---------- Filtro de horarios y tarifas ---------- */
  var chips = document.querySelectorAll('.chip[data-filtro]');
  var rows = document.querySelectorAll('[data-filtrable] tbody tr');
  var status = document.getElementById('filtro-estado');
  chips.forEach(function (chip) {
    chip.addEventListener('click', function () {
      var filtro = chip.getAttribute('data-filtro');
      chips.forEach(function (c) { c.setAttribute('aria-pressed', String(c === chip)); });
      var shown = 0;
      rows.forEach(function (tr) {
        var visible = filtro === 'todas' || tr.getAttribute('data-tipo') === filtro;
        tr.hidden = !visible;
        if (visible) shown++;
      });
      if (status) status.textContent = 'Mostrando ' + shown + ' filas: ' + chip.textContent;
    });
  });

  /* ---------- "Inscribirme" desde una tarjeta preselecciona la actividad ---------- */
  var select = document.getElementById('f-actividad');
  document.querySelectorAll('[data-actividad]').forEach(function (link) {
    link.addEventListener('click', function () {
      if (select) select.value = link.getAttribute('data-actividad');
    });
  });

  /* ---------- Galería con visor ---------- */
  var dialog = document.getElementById('lightbox');
  var items = Array.prototype.slice.call(document.querySelectorAll('.gallery-item'));
  if (dialog && typeof dialog.showModal === 'function' && items.length) {
    var big = dialog.querySelector('img');
    var caption = dialog.querySelector('.lightbox-caption');
    var current = 0;
    var opener = null;
    function show(i) {
      current = (i + items.length) % items.length;
      var img = items[current].querySelector('img');
      big.src = img.currentSrc || img.src;
      big.alt = img.alt;
      caption.textContent = img.alt + ' (' + (current + 1) + ' de ' + items.length + ')';
    }
    items.forEach(function (btn, i) {
      btn.addEventListener('click', function () {
        opener = btn;
        show(i);
        dialog.showModal();
      });
    });
    dialog.querySelector('.lightbox-prev').addEventListener('click', function () { show(current - 1); });
    dialog.querySelector('.lightbox-next').addEventListener('click', function () { show(current + 1); });
    dialog.querySelector('.lightbox-close').addEventListener('click', function () { dialog.close(); });
    dialog.addEventListener('click', function (e) { if (e.target === dialog) dialog.close(); });
    dialog.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowLeft') show(current - 1);
      if (e.key === 'ArrowRight') show(current + 1);
    });
    dialog.addEventListener('close', function () { if (opener) opener.focus(); });
  } else {
    // Sin <dialog>: abrir la imagen en una pestaña
    items.forEach(function (btn) {
      btn.addEventListener('click', function () { window.open(btn.querySelector('img').src, '_blank', 'noopener'); });
    });
  }

  /* ---------- Formulario de inscripción (Formspree) ---------- */
  var form = document.getElementById('form-inscripcion');
  if (form) {
    var formStatus = form.querySelector('.form-status');
    var messages = {
      valueMissing: 'Este campo es obligatorio.',
      typeMismatch: 'Revisa el formato.',
      checkbox: 'Debes aceptar la política de privacidad para enviar la solicitud.'
    };

    function fieldError(input) {
      var wrap = input.closest('.field');
      var err = wrap.querySelector('.field-error');
      if (input.validity.valid) {
        input.removeAttribute('aria-invalid');
        if (err) err.remove();
        return true;
      }
      var text = input.type === 'checkbox' ? messages.checkbox
        : input.validity.valueMissing ? messages.valueMissing : messages.typeMismatch;
      if (!err) {
        err = document.createElement('p');
        err.className = 'field-error';
        err.id = input.id + '-error';
        wrap.appendChild(err);
      }
      err.textContent = text;
      input.setAttribute('aria-invalid', 'true');
      input.setAttribute('aria-describedby', err.id);
      return false;
    }

    form.querySelectorAll('[required]').forEach(function (input) {
      input.addEventListener('blur', function () { if (input.value || input.type === 'checkbox') fieldError(input); });
      input.addEventListener('change', function () { if (input.getAttribute('aria-invalid')) fieldError(input); });
    });

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var invalid = null;
      form.querySelectorAll('[required]').forEach(function (input) {
        if (!fieldError(input) && !invalid) invalid = input;
      });
      if (invalid) {
        invalid.focus();
        formStatus.className = 'form-status error';
        formStatus.textContent = 'Revisa los campos marcados.';
        return;
      }

      if (form.action.indexOf('COMPLETAR') !== -1) {
        formStatus.className = 'form-status error';
        formStatus.textContent = 'El formulario aún no está configurado. Mientras tanto, usa el formulario de Google o escríbenos a leganesnatacion@gmail.com.';
        return;
      }

      var button = form.querySelector('button[type="submit"]');
      button.disabled = true;
      formStatus.className = 'form-status';
      formStatus.textContent = 'Enviando…';

      fetch(form.action, { method: 'POST', body: new FormData(form), headers: { Accept: 'application/json' } })
        .then(function (res) {
          if (!res.ok) throw new Error(res.status);
          form.reset();
          formStatus.className = 'form-status ok';
          formStatus.textContent = '¡Solicitud enviada! Recibirás comunicación cuando se acepte la solicitud.';
        })
        .catch(function () {
          formStatus.className = 'form-status error';
          formStatus.textContent = 'No se ha podido enviar. Inténtalo de nuevo o escríbenos a leganesnatacion@gmail.com.';
        })
        .then(function () { button.disabled = false; });
    });
  }

  /* ---------- Mapa bajo demanda ---------- */
  var mapBtn = document.getElementById('cargar-mapa');
  if (mapBtn) {
    mapBtn.addEventListener('click', function () {
      var map = document.getElementById('mapa');
      var iframe = document.createElement('iframe');
      iframe.src = mapBtn.getAttribute('data-src');
      iframe.title = 'Mapa: Piscina Municipal El Carrascal, Avenida de Europa 6, Leganés';
      iframe.loading = 'lazy';
      iframe.referrerPolicy = 'no-referrer-when-downgrade';
      map.appendChild(iframe);
      map.classList.add('is-loaded');
      map.querySelector('.map-placeholder').hidden = true;
      iframe.focus();
    });
  }

  /* =========================================================
     EFECTOS DE AGUA (no se activan con "reducir movimiento")
     ========================================================= */
  if (!reduceMotion) {
    /* Burbujas: [data-bubbles="N"] crea N burbujas con tamaño y ritmo aleatorios */
    document.querySelectorAll('[data-bubbles]').forEach(function (box) {
      var n = parseInt(box.getAttribute('data-bubbles'), 10) || 12;
      if (window.innerWidth < 720) n = Math.ceil(n * 0.6);
      for (var i = 0; i < n; i++) {
        var b = document.createElement('span');
        b.className = 'bubble';
        b.style.setProperty('--x', (Math.random() * 100).toFixed(1) + '%');
        b.style.setProperty('--s', (6 + Math.random() * 22).toFixed(0) + 'px');
        b.style.setProperty('--dur', (9 + Math.random() * 10).toFixed(1) + 's');
        b.style.setProperty('--delay', (-Math.random() * 18).toFixed(1) + 's');
        b.style.setProperty('--drift', ((Math.random() - 0.5) * 80).toFixed(0) + 'px');
        box.appendChild(b);
      }
    });

    /* Ondas en el hero al mover el ratón o tocar la pantalla */
    var ripples = document.querySelector('.ripples');
    if (hero && ripples) {
      var last = 0;
      var spawn = function (e) {
        if (ripples.childElementCount > 14) return;
        var r = hero.getBoundingClientRect();
        var dot = document.createElement('span');
        dot.className = 'ripple';
        dot.style.left = (e.clientX - r.left) + 'px';
        dot.style.top = (e.clientY - r.top) + 'px';
        dot.addEventListener('animationend', function () { dot.remove(); });
        ripples.appendChild(dot);
      };
      hero.addEventListener('pointerdown', spawn);
      if (window.matchMedia('(pointer: fine)').matches) {
        hero.addEventListener('pointermove', function (e) {
          var now = performance.now();
          if (now - last > 140) { last = now; spawn(e); }
        });
      }
    }

    /* Onda al pulsar botones, filtros y fotos */
    document.addEventListener('pointerdown', function (e) {
      var el = e.target.closest('.btn, .chip, .gallery-item');
      if (!el) return;
      var r = el.getBoundingClientRect();
      var drop = document.createElement('span');
      drop.className = 'press-ripple';
      drop.style.left = (e.clientX - r.left) + 'px';
      drop.style.top = (e.clientY - r.top) + 'px';
      drop.addEventListener('animationend', function () { drop.remove(); });
      el.appendChild(drop);
    });

    /* Pausar las animaciones infinitas cuando no se ven */
    if ('IntersectionObserver' in window) {
      var zones = document.querySelectorAll('.hero, .marquee, .section-dark, .wave-top');
      var pauser = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) { entry.target.classList.toggle('is-paused', !entry.isIntersecting); });
      });
      zones.forEach(function (z) { pauser.observe(z); });
    }
  }

  /* ---------- Contadores de la banda de cifras ---------- */
  var counters = document.querySelectorAll('[data-count]');
  counters.forEach(function (el) {
    var desde = parseInt(el.getAttribute('data-desde'), 10);
    var target = desde ? new Date().getFullYear() - desde : parseInt(el.getAttribute('data-count'), 10);
    el.setAttribute('data-count', target);
    el.textContent = target;
  });
  if (!reduceMotion && 'IntersectionObserver' in window && counters.length) {
    var countUp = function (el) {
      var target = parseInt(el.getAttribute('data-count'), 10);
      var start = performance.now();
      var dur = 1400;
      (function frame(now) {
        var t = Math.min((now - start) / dur, 1);
        el.textContent = Math.round(target * (1 - Math.pow(1 - t, 3)));
        if (t < 1) window.requestAnimationFrame(frame);
      })(start);
    };
    var counterIO = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        countUp(entry.target);
        counterIO.unobserve(entry.target);
      });
    }, { threshold: 0.6 });
    counters.forEach(function (el) { el.textContent = '0'; counterIO.observe(el); });
  }

  /* ---------- Año del pie ---------- */
  var year = document.getElementById('anio');
  if (year) year.textContent = new Date().getFullYear();
})();
