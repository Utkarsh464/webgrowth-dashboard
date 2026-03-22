/* ═══════════════════════════════════════════════════════════
   WEBGROWTH — MAIN JS
   Cursor · Scroll · Industry Switcher · Live Counter
═══════════════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

  /* ── CUSTOM CURSOR ──────────────────────────────────────── */
  const cursor = document.querySelector('.cursor');
  const ring   = document.querySelector('.cursor-ring');
  let mx = 0, my = 0, rx = 0, ry = 0;

  document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });

  function animCursor() {
    rx += (mx - rx) * 0.18;
    ry += (my - ry) * 0.18;
    if (cursor) cursor.style.transform = `translate(${mx}px, ${my}px) translate(-50%, -50%)`;
    if (ring)   ring.style.transform   = `translate(${rx}px, ${ry}px) translate(-50%, -50%)`;
    requestAnimationFrame(animCursor);
  }
  animCursor();

  document.querySelectorAll('a, button, .ind-btn, .industry-card, .feature-card').forEach(el => {
    el.addEventListener('mouseenter', () => { cursor?.classList.add('hover'); ring?.classList.add('hover'); });
    el.addEventListener('mouseleave', () => { cursor?.classList.remove('hover'); ring?.classList.remove('hover'); });
  });

  /* ── NAV SCROLL ─────────────────────────────────────────── */
  const nav = document.querySelector('nav');
  window.addEventListener('scroll', () => {
    nav?.classList.toggle('scrolled', window.scrollY > 60);
  }, { passive: true });

  /* ── HERO TEXT ANIMATION ────────────────────────────────── */
  const words = document.querySelectorAll('.hero-headline .word');
  words.forEach((w, i) => {
    w.style.animation = `heroWord 0.9s ${0.1 + i * 0.08}s cubic-bezier(0.16,1,0.3,1) forwards`;
  });

  const style = document.createElement('style');
  style.textContent = `
    @keyframes heroWord {
      to { transform: translateY(0); }
    }
  `;
  document.head.appendChild(style);

  /* ── SCROLL REVEAL ──────────────────────────────────────── */
  const revealObs = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
  }, { threshold: 0.08 });

  document.querySelectorAll('.reveal').forEach(el => revealObs.observe(el));

  /* ── LIVE CLOCK ─────────────────────────────────────────── */
  function updateClock() {
    const el = document.getElementById('demo-clock');
    if (!el) return;
    const n = new Date();
    const h = String(n.getHours()).padStart(2,'0');
    const m = String(n.getMinutes()).padStart(2,'0');
    const s = String(n.getSeconds()).padStart(2,'0');
    el.textContent = `${h}:${m}:${s}`;
  }
  setInterval(updateClock, 1000);
  updateClock();

  /* ── INDUSTRY SWITCHER ──────────────────────────────────── */
  const industries = {
    finance: {
      name:    'FinanceOS',
      type:    'FINANCE',
      icon:    '💳',
      color:   '#00d4ff',
      avatar:  '#00d4ff',
      user:    'Rajesh S.',
      url:     'financeos.app/dashboard',
      navItems: ['📊 Dashboard', '💳 Loans', '💰 Payments', '📄 Reports', '⚙️ Settings'],
      title:   'Loan Portfolio',
      sub:     '6 active loans · ₹20.5L disbursed',
      kpis: [
        { icon:'💰', label:'DISBURSED',    val:'₹20.5L', delta:'↑ 12.4%' },
        { icon:'📈', label:'RECOVERED',    val:'₹4.18L', delta:'↑ 8.2%'  },
        { icon:'🪙', label:'INTEREST',     val:'₹2.37L', delta:'LIVE'     },
        { icon:'⚠️',  label:'OUTSTANDING',  val:'₹18.7L', delta:'5 active' },
      ],
      bars: [30,50,42,68,55,78,62,88,70,92,80,100],
      barColor: '#00d4ff',
      donut: { a: '#00d4ff', b: '#ff4d6d', aLabel:'Recovered', bLabel:'Pending', aVal:'₹4.18L', bVal:'₹18.7L', pct:'18%' },
      chartTitle: 'Monthly Recovery',
      donutTitle: 'Portfolio Split',
    },
    restaurant: {
      name:    'TableIQ',
      type:    'RESTAURANT',
      icon:    '🍽️',
      color:   '#ff7c4a',
      avatar:  '#ff7c4a',
      user:    'Priya M.',
      url:     'tableiq.app/dashboard',
      navItems: ['📊 Overview', '🍽️ Orders', '🧑‍🍳 Kitchen', '📦 Inventory', '⚙️ Settings'],
      title:   'Restaurant Dashboard',
      sub:     'Saturday · 127 covers today',
      kpis: [
        { icon:'🛎️', label:'ORDERS TODAY',  val:'127',    delta:'↑ 23 vs avg' },
        { icon:'💵', label:'REVENUE',        val:'₹84.2K', delta:'↑ 18.3%'   },
        { icon:'⭐', label:'AVG RATING',     val:'4.8',    delta:'LIVE'        },
        { icon:'🍕', label:'BESTSELLER',     val:'Biryani', delta:'34 orders' },
      ],
      bars: [20,35,28,60,75,88,95,70,82,90,65,100],
      barColor: '#ff7c4a',
      donut: { a: '#ff7c4a', b: '#ffbb33', aLabel:'Dine-in', bLabel:'Delivery', aVal:'68%', bVal:'32%', pct:'68%' },
      chartTitle: 'Hourly Orders',
      donutTitle: 'Order Channels',
    },
    clinic: {
      name:    'MedDesk',
      type:    'HEALTHCARE',
      icon:    '🏥',
      color:   '#00e676',
      avatar:  '#00e676',
      user:    'Dr. Sharma',
      url:     'meddesk.app/dashboard',
      navItems: ['📊 Overview', '🗓️ Appointments', '👥 Patients', '💊 Prescriptions', '⚙️ Settings'],
      title:   'Clinic Overview',
      sub:     'Monday · 24 appointments scheduled',
      kpis: [
        { icon:'🗓️', label:'APPOINTMENTS',  val:'24',     delta:'8 remaining' },
        { icon:'👥', label:'PATIENTS',       val:'1,842',  delta:'↑ 12 new'   },
        { icon:'💊', label:'PRESCRIPTIONS',  val:'18',     delta:'Today'      },
        { icon:'💵', label:'REVENUE',        val:'₹42.5K', delta:'↑ 9.1%'    },
      ],
      bars: [45,60,75,55,80,90,70,85,60,95,80,100],
      barColor: '#00e676',
      donut: { a: '#00e676', b: '#00bcd4', aLabel:'Consultation', bLabel:'Follow-up', aVal:'72%', bVal:'28%', pct:'72%' },
      chartTitle: 'Weekly Patients',
      donutTitle: 'Appointment Types',
    },
    realestate: {
      name:    'PropOS',
      type:    'REAL ESTATE',
      icon:    '🏢',
      color:   '#c9a84c',
      avatar:  '#c9a84c',
      user:    'Vikram A.',
      url:     'propos.app/dashboard',
      navItems: ['📊 Portfolio', '🏢 Properties', '📋 Leases', '🔧 Maintenance', '⚙️ Settings'],
      title:   'Property Portfolio',
      sub:     '12 properties · ₹4.2Cr under management',
      kpis: [
        { icon:'🏢', label:'PROPERTIES',   val:'12',      delta:'3 listed'   },
        { icon:'💵', label:'RENT / MONTH', val:'₹3.8L',   delta:'↑ 6.2%'    },
        { icon:'📋', label:'OCCUPANCY',    val:'91.6%',   delta:'LIVE'        },
        { icon:'🔧', label:'OPEN TICKETS', val:'4',        delta:'2 urgent'  },
      ],
      bars: [60,70,65,80,75,90,85,95,80,88,92,100],
      barColor: '#c9a84c',
      donut: { a: '#c9a84c', b: '#888', aLabel:'Occupied', bLabel:'Vacant', aVal:'11/12', bVal:'1/12', pct:'91%' },
      chartTitle: 'Monthly Rental Income',
      donutTitle: 'Occupancy Rate',
    },
    retail: {
      name:    'StoreOS',
      type:    'RETAIL',
      icon:    '🛍️',
      color:   '#ce93d8',
      avatar:  '#ce93d8',
      user:    'Meera K.',
      url:     'storeos.app/dashboard',
      navItems: ['📊 Dashboard', '🛍️ Sales', '📦 Inventory', '👥 Customers', '⚙️ Settings'],
      title:   'Store Performance',
      sub:     'Today · ₹1.24L in sales',
      kpis: [
        { icon:'🛒', label:'ORDERS',        val:'284',    delta:'↑ 34 vs avg' },
        { icon:'💵', label:'REVENUE',        val:'₹1.24L', delta:'↑ 22.1%'  },
        { icon:'📦', label:'LOW STOCK',      val:'7',      delta:'Reorder'   },
        { icon:'👥', label:'NEW CUSTOMERS',  val:'38',     delta:'Today'     },
      ],
      bars: [40,55,48,72,60,85,70,90,75,95,82,100],
      barColor: '#ce93d8',
      donut: { a: '#ce93d8', b: '#ff7c4a', aLabel:'Walk-in', bLabel:'Online', aVal:'58%', bVal:'42%', pct:'58%' },
      chartTitle: 'Sales by Hour',
      donutTitle: 'Sales Channels',
    },
  };

  let currentIndustry = 'finance';
  let switchTimeout = null;
  let autoRotate = null;

  function switchIndustry(key) {
    if (key === currentIndustry) return;
    currentIndustry = key;
    const d = industries[key];

    // Update buttons
    document.querySelectorAll('.ind-btn').forEach(b => {
      b.classList.toggle('active', b.dataset.industry === key);
    });

    // Sidebar
    const brandIcon = document.querySelector('.dsb-brand-icon');
    const brandName = document.querySelector('.dsb-brand-name');
    const brandType = document.querySelector('.dsb-brand-type');
    if (brandIcon) { brandIcon.textContent = d.icon; brandIcon.style.background = d.color + '22'; }
    if (brandName) brandName.textContent = d.name;
    if (brandType) brandType.textContent = d.type;

    // Nav items
    const navItems = document.querySelectorAll('.dsb-item');
    d.navItems.forEach((label, i) => {
      if (navItems[i]) navItems[i].innerHTML = label;
    });

    // Active nav item color
    const activeItem = document.querySelector('.dsb-item.active');
    if (activeItem) activeItem.style.background = d.color;

    // Avatar
    const avatar = document.querySelector('.dsb-avatar');
    if (avatar) {
      avatar.style.background = d.color;
      avatar.textContent = d.user[0];
    }

    const uname = document.querySelector('.dsb-uname');
    if (uname) uname.textContent = d.user;

    // URL bar
    const urlBar = document.querySelector('.demo-url-bar');
    if (urlBar) urlBar.textContent = d.url;

    // Page title
    const pageTitle = document.querySelector('.demo-page-title');
    const pageSub   = document.querySelector('.demo-page-sub');
    if (pageTitle) pageTitle.textContent = d.title;
    if (pageSub)   pageSub.textContent   = d.sub;

    // KPIs
    document.querySelectorAll('.demo-kpi').forEach((kpi, i) => {
      const data = d.kpis[i];
      if (!data) return;
      const ico   = kpi.querySelector('.demo-kpi-icon');
      const label = kpi.querySelector('.demo-kpi-label');
      const val   = kpi.querySelector('.demo-kpi-val');
      const delta = kpi.querySelector('.demo-kpi-delta');
      if (ico)   ico.textContent   = data.icon;
      if (label) label.textContent = data.label;
      if (val) {
        val.textContent = data.val;
        val.style.color = i === 2 ? d.color : '';
      }
      if (delta) {
        delta.textContent = data.delta;
        delta.style.color = data.delta === 'LIVE' ? '#00e676' : 'rgba(0,212,255,0.8)';
      }
      kpi.querySelector('::after');
      kpi.style.setProperty('--accent', d.color);
      const accent = kpi.querySelector('.kpi-accent-bar');
      if (accent) accent.style.background = d.color;
    });

    // Update KPI bottom bars color
    document.querySelectorAll('.demo-kpi').forEach(kpi => {
      kpi.style.borderColor = `rgba(255,255,255,0.06)`;
    });
    document.querySelectorAll('.demo-kpi')[2]?.style.setProperty('border-color', d.color + '33');

    // Bars
    document.querySelectorAll('.demo-bar').forEach((bar, i) => {
      bar.style.height     = (d.bars[i] || 30) + '%';
      bar.style.background = `linear-gradient(180deg, ${d.color}, ${d.color}88)`;
    });

    // Chart title
    const chartTitle = document.querySelector('.demo-chart-title');
    if (chartTitle) chartTitle.textContent = d.chartTitle;

    // Donut
    const donutTitle = document.querySelector('.demo-donut-title');
    if (donutTitle) donutTitle.textContent = d.donutTitle;

    const circles = document.querySelectorAll('.demo-donut-circle');
    if (circles[0]) circles[0].setAttribute('stroke', d.donut.a);
    if (circles[1]) circles[1].setAttribute('stroke', d.donut.b);

    const pctText = document.querySelector('.demo-donut-pct');
    if (pctText) pctText.textContent = d.donut.pct;

    document.querySelectorAll('.demo-legend-dot').forEach((dot, i) => {
      dot.style.background = i === 0 ? d.donut.a : d.donut.b;
    });

    document.querySelectorAll('.demo-legend-label').forEach((lbl, i) => {
      lbl.textContent = i === 0 ? d.donut.aLabel : d.donut.bLabel;
    });

    document.querySelectorAll('.demo-legend-val').forEach((val, i) => {
      val.textContent = i === 0 ? d.donut.aVal : d.donut.bVal;
      val.style.color = i === 0 ? d.donut.a : d.donut.b;
    });
  }

  // Bind industry buttons
  document.querySelectorAll('.ind-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      clearInterval(autoRotate);
      switchIndustry(btn.dataset.industry);
      // restart auto-rotate after 8s
      autoRotate = setInterval(rotateNext, 4000);
    });
  });

  // Auto-rotate through industries
  const industryKeys = Object.keys(industries);
  let autoIndex = 0;

  function rotateNext() {
    autoIndex = (autoIndex + 1) % industryKeys.length;
    switchIndustry(industryKeys[autoIndex]);
  }

  autoRotate = setInterval(rotateNext, 4000);

  // Init first industry
  switchIndustry('finance');

  /* ── LIVE COUNTER (Interest) ────────────────────────────── */
  let interest = 237456.33;
  const rps = (205000 * 0.145) / (365 * 24 * 3600);

  function updateCounter() {
    interest += rps;
    const el = document.getElementById('live-interest');
    if (!el) return;
    const [intPart, decPart] = interest.toFixed(2).split('.');
    el.textContent = '₹' + Number(intPart).toLocaleString('en-IN') + '.' + decPart;
  }

  setInterval(updateCounter, 1000);

  /* ── COUNTER ANIMATE ON SCROLL ──────────────────────────── */
  function animateValue(el, start, end, duration, prefix = '', suffix = '') {
    const startTime = performance.now();
    function update(now) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const val = Math.round(start + (end - start) * eased);
      el.textContent = prefix + val.toLocaleString('en-IN') + suffix;
      if (progress < 1) requestAnimationFrame(update);
    }
    requestAnimationFrame(update);
  }

  const statObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      const el = e.target;
      const end = parseInt(el.dataset.count);
      const prefix = el.dataset.prefix || '';
      const suffix = el.dataset.suffix || '';
      animateValue(el, 0, end, 1800, prefix, suffix);
      statObs.unobserve(el);
    });
  }, { threshold: 0.5 });

  document.querySelectorAll('[data-count]').forEach(el => statObs.observe(el));

  /* ── SMOOTH ANCHOR LINKS ────────────────────────────────── */
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      e.preventDefault();
      const target = document.querySelector(a.getAttribute('href'));
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  /* ── PRICING TOGGLE ─────────────────────────────────────── */
  const toggle = document.getElementById('billing-toggle');
  if (toggle) {
    toggle.addEventListener('change', () => {
      document.querySelectorAll('.price-monthly').forEach(el => el.classList.toggle('hidden', toggle.checked));
      document.querySelectorAll('.price-annual').forEach(el => el.classList.toggle('hidden', !toggle.checked));
    });
  }

});
