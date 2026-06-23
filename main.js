/**
 * 芯灵科技官网 — 主逻辑
 * 依赖：config.js 中的 SITE_CONFIG 全局变量
 */

/* ─────────────────────────────────────────────────
   语言管理
───────────────────────────────────────────────── */
let lang = localStorage.getItem('xl-lang') || 'zh';

function t(obj) {
  if (!obj) return '';
  if (typeof obj === 'string') return obj;
  return obj[lang] || obj['zh'] || '';
}

function toggleLang() {
  lang = lang === 'zh' ? 'en' : 'zh';
  localStorage.setItem('xl-lang', lang);
  renderAll();
}

/* ─────────────────────────────────────────────────
   导航栏滚动效果
───────────────────────────────────────────────── */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
});

/* ─────────────────────────────────────────────────
   移动端菜单
───────────────────────────────────────────────── */
const hamburger   = document.getElementById('hamburger');
const mobileMenu  = document.getElementById('mobile-menu');

hamburger.addEventListener('click', () => {
  mobileMenu.classList.toggle('open');
});

document.addEventListener('click', e => {
  if (mobileMenu.classList.contains('open') &&
      !mobileMenu.contains(e.target) &&
      !hamburger.contains(e.target)) {
    mobileMenu.classList.remove('open');
  }
});

/* ─────────────────────────────────────────────────
   Canvas 粒子网格
───────────────────────────────────────────────── */
(function initParticles() {
  const canvas = document.getElementById('hero-canvas');
  const ctx    = canvas.getContext('2d');
  const isMob  = window.innerWidth < 768;
  const COUNT  = isMob ? 55 : 110;
  const DIST   = isMob ? 100 : 140;
  let W, H, pts = [];

  function resize() {
    W = canvas.width  = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
  }

  function mkPt() {
    return {
      x:  Math.random() * W,
      y:  Math.random() * H,
      vx: (Math.random() - 0.5) * 0.45,
      vy: (Math.random() - 0.5) * 0.45,
      r:  Math.random() * 1.4 + 0.5
    };
  }

  function loop() {
    ctx.clearRect(0, 0, W, H);
    for (let i = 0; i < pts.length; i++) {
      const p = pts[i];
      p.x += p.vx; p.y += p.vy;
      if (p.x < 0) p.x = W; else if (p.x > W) p.x = 0;
      if (p.y < 0) p.y = H; else if (p.y > H) p.y = 0;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(0,212,255,0.65)';
      ctx.fill();

      for (let j = i + 1; j < pts.length; j++) {
        const q  = pts[j];
        const dx = p.x - q.x, dy = p.y - q.y;
        const d  = Math.sqrt(dx * dx + dy * dy);
        if (d < DIST) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(q.x, q.y);
          ctx.strokeStyle = `rgba(0,212,255,${0.18 * (1 - d / DIST)})`;
          ctx.lineWidth = 0.6;
          ctx.stroke();
        }
      }
    }
    requestAnimationFrame(loop);
  }

  window.addEventListener('resize', resize);
  resize();
  pts = Array.from({ length: COUNT }, mkPt);
  loop();
})();

/* ─────────────────────────────────────────────────
   滚动进场动效（IntersectionObserver）
───────────────────────────────────────────────── */
const fadeObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      fadeObs.unobserve(e.target);
    }
  });
}, { threshold: 0.12 });

function observeAll() {
  document.querySelectorAll('.fade-up').forEach(el => {
    // 重置以支持语言切换后重新渲染
    el.classList.remove('visible');
    fadeObs.observe(el);
  });
}

/* ─────────────────────────────────────────────────
   数字递增动效
───────────────────────────────────────────────── */
function animCounter(el, target, dur) {
  let start = null;
  function step(ts) {
    if (!start) start = ts;
    const p = Math.min((ts - start) / dur, 1);
    const e = 1 - Math.pow(1 - p, 3);
    el.textContent = Math.floor(e * target);
    if (p < 1) requestAnimationFrame(step);
    else el.textContent = target;
  }
  requestAnimationFrame(step);
}

const cntObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      const el  = e.target.querySelector('.cnt-num');
      const raw = el && el.dataset.target;
      if (raw && !isNaN(raw)) animCounter(el, parseInt(raw), 1800);
      cntObs.unobserve(e.target);
    }
  });
}, { threshold: 0.3 });

/* ─────────────────────────────────────────────────
   渲染函数
───────────────────────────────────────────────── */

/** 导航 */
function renderNav() {
  const C = SITE_CONFIG;
  document.getElementById('nav-brand').textContent = t(C.site.name);

  const contact = lang === 'zh' ? '联系我们' : 'Contact';
  document.getElementById('nav-contact').textContent  = contact;
  document.getElementById('mob-contact').textContent  = contact;
  document.getElementById('lang-btn').textContent     = lang === 'zh' ? 'EN' : '中';
  document.getElementById('mob-lang-btn').textContent = lang === 'zh' ? 'EN' : '中';

  document.getElementById('lang-btn').onclick     = toggleLang;
  document.getElementById('mob-lang-btn').onclick = toggleLang;

  const menuHTML = C.nav.map(n =>
    `<li><a href="${n.href}">${t(n)}</a></li>`
  ).join('');
  document.getElementById('nav-menu').innerHTML = menuHTML;

  document.getElementById('mob-links').innerHTML = C.nav.map(n =>
    `<a href="${n.href}" onclick="document.getElementById('mobile-menu').classList.remove('open')">${t(n)}</a>`
  ).join('');
}

/** Hero */
function renderHero() {
  const h = SITE_CONFIG.hero;
  const bg = document.getElementById('hero-bg');
  if (h.bgImage) {
    bg.style.backgroundImage = `url('${h.bgImage}')`;
  } else {
    bg.style.background = 'linear-gradient(135deg,#0A0A0F 0%,#0d1130 55%,#1a0530 100%)';
  }
  const slo = t(h.slogan);
  const mid = Math.ceil(slo.length / 2);
  document.getElementById('hero-s1').textContent = slo.slice(0, mid);
  document.getElementById('hero-s2').textContent = slo.slice(mid);
  document.getElementById('hero-sub').textContent = t(h.subTitle);

  const c1 = document.getElementById('hero-cta1');
  c1.textContent = t(h.ctaText);
  c1.href = h.ctaLink;

  const c2 = document.getElementById('hero-cta2');
  c2.textContent = t(h.ctaText2);
  c2.href = h.ctaLink2;
}

/** 产品 */
function renderProducts() {
  const C = SITE_CONFIG;
  document.getElementById('p-label').textContent = lang === 'zh' ? '核心产品' : 'CORE PRODUCTS';
  document.getElementById('p-title').innerHTML   = lang === 'zh'
    ? '核心芯片产品'
    : 'Core <span class="grad-text">Products</span>';
  document.getElementById('p-desc').textContent  = lang === 'zh'
    ? '覆盖从数据中心到端侧边缘的完整 AI 算力谱系，满足不同场景的性能与功耗需求。'
    : 'Complete AI compute spectrum from data center to edge, meeting diverse performance and power requirements.';

  document.getElementById('products-grid').innerHTML = C.products.map((p, i) => {
    const tags = t(p.tags).map(g => `<span class="tag">${g}</span>`).join('');
    const img  = p.image
      ? `<div class="prod-img"><img src="${p.image}" alt="${t(p.name)}" loading="lazy" onerror="this.parentElement.innerHTML='💎'"/></div>`
      : `<div class="prod-img">💎</div>`;
    return `
      <div class="prod-card fade-up" style="transition-delay:${i * 0.1}s">
        ${img}
        <div class="prod-body">
          <div class="prod-tags">${tags}</div>
          <h3 class="prod-name">${t(p.name)}</h3>
          <p class="prod-desc">${t(p.desc)}</p>
          <a class="prod-link" href="${p.link}">${lang === 'zh' ? '查看详情' : 'Learn More'} →</a>
        </div>
      </div>`;
  }).join('');
}

/** 技术指标 */
function renderStats() {
  const C = SITE_CONFIG;
  document.getElementById('st-label').textContent = lang === 'zh' ? '技术实力' : 'TECHNOLOGY & SCALE';
  document.getElementById('st-title').innerHTML   = lang === 'zh'
    ? '技术实力 · 以数字为证'
    : 'Our <span class="grad-text">Numbers</span> Speak';
  document.getElementById('st-desc').textContent  = lang === 'zh'
    ? '每一个数字背后，都是芯灵团队多年深耕半导体领域的技术积累与创新突破。'
    : 'Behind every number lies years of deep semiconductor expertise and relentless innovation.';

  document.getElementById('stats-grid').innerHTML = C.stats.map((s, i) => {
    const isNum = !isNaN(s.value);
    const numHTML = isNum
      ? `<span class="cnt-num" data-target="${s.value}">0</span>`
      : `<span>${s.value}</span>`;
    return `
      <div class="stat-card fade-up" style="transition-delay:${i * 0.07}s">
        <span class="stat-icon">${s.icon}</span>
        <div class="stat-number">${numHTML}<span class="stat-unit">${s.unit}</span></div>
        <p class="stat-label">${t(s.label)}</p>
      </div>`;
  }).join('');

  document.querySelectorAll('.stat-card').forEach(c => cntObs.observe(c));
}

/** 应用场景 */
function renderScenarios() {
  const C = SITE_CONFIG;
  document.getElementById('sc-label').textContent = lang === 'zh' ? '应用场景' : 'APPLICATIONS';
  document.getElementById('sc-title').innerHTML   = lang === 'zh'
    ? '应用场景'
    : '<span class="grad-text">Application</span> Scenarios';
  document.getElementById('sc-desc').textContent  = lang === 'zh'
    ? '芯灵芯片广泛应用于 AI、自动驾驶、数据中心、智能终端与工业互联网等前沿领域。'
    : 'XinLing chips power AI, autonomous driving, data centers, smart devices, and industrial IoT.';

  document.getElementById('sce-tabs').innerHTML = C.scenarios.map((s, i) => `
    <button class="sce-tab ${i === 0 ? 'active' : ''}"
            onclick="switchSce(${i})" data-idx="${i}">
      <span class="sce-tab-icon">${s.icon}</span>
      <span>${t(s.name)}</span>
    </button>`).join('');

  document.getElementById('sce-panel').innerHTML = C.scenarios.map((s, i) => {
    const imgHTML = s.image
      ? `<div class="sce-img"><img src="${s.image}" alt="${t(s.name)}" loading="lazy" onerror="this.parentElement.innerHTML='${s.icon}'"/></div>`
      : `<div class="sce-img" style="font-size:80px">${s.icon}</div>`;
    return `
      <div class="sce-content ${i === 0 ? 'active' : ''}" data-idx="${i}">
        ${imgHTML}
        <div>
          <h3 class="sce-name">${t(s.name)}</h3>
          <p class="sce-desc">${t(s.desc)}</p>
        </div>
      </div>`;
  }).join('');
}

window.switchSce = function(idx) {
  document.querySelectorAll('.sce-tab').forEach(el => el.classList.toggle('active', +el.dataset.idx === idx));
  document.querySelectorAll('.sce-content').forEach(el => el.classList.toggle('active', +el.dataset.idx === idx));
};

/** 新闻 */
function renderNews() {
  const C = SITE_CONFIG;
  document.getElementById('n-label').textContent = lang === 'zh' ? '新闻动态' : 'NEWS & EVENTS';
  document.getElementById('n-title').innerHTML   = lang === 'zh'
    ? '新闻动态'
    : 'Latest <span class="grad-text">News</span>';
  document.getElementById('n-desc').textContent  = lang === 'zh'
    ? '洞察行业前沿，追踪芯灵科技最新产品发布、技术突破与合作动态。'
    : "Stay updated on XinLing's latest product launches, breakthroughs, and partnerships.";

  document.getElementById('news-grid').innerHTML = C.news.map((n, i) => {
    const imgHTML = n.cover
      ? `<div class="news-cover"><img src="${n.cover}" alt="${t(n.title)}" loading="lazy" onerror="this.parentElement.innerHTML='📰'"/></div>`
      : `<div class="news-cover">📰</div>`;
    return `
      <a class="news-card fade-up" href="${n.link}" style="transition-delay:${i * 0.1}s">
        ${imgHTML}
        <div class="news-body">
          <div class="news-meta">
            <span class="news-tag">${t(n.tag)}</span>
            <span class="news-date">${n.date}</span>
          </div>
          <h3 class="news-title">${t(n.title)}</h3>
          <p class="news-summary">${t(n.summary)}</p>
          <span class="news-more">${lang === 'zh' ? '阅读全文' : 'Read More'} →</span>
        </div>
      </a>`;
  }).join('');
}

/** 合作伙伴（跑马灯，复制一份实现无缝循环） */
function renderPartners() {
  const C = SITE_CONFIG;
  document.getElementById('pt-title').textContent = lang === 'zh'
    ? '合作伙伴 · 受行业领袖信赖'
    : 'PARTNERS · TRUSTED BY INDUSTRY LEADERS';

  const itemsHTML = C.partners.map(p => {
    const inner = p.logo
      ? `<img src="${p.logo}" alt="${p.name}" onerror="this.style.display='none';this.nextElementSibling.style.display='block'"/>
         <span class="partner-txt" style="display:none">${p.name}</span>`
      : `<span class="partner-txt">${p.name}</span>`;
    const href = p.link && p.link !== '#' ? `href="${p.link}" target="_blank"` : '';
    return `<a class="partner-item" ${href}>${inner}</a>`;
  }).join('');

  // 复制两份形成无缝循环
  document.getElementById('marquee-track').innerHTML = itemsHTML + itemsHTML;
}

/** 页脚 */
function renderFooter() {
  const C = SITE_CONFIG;
  document.getElementById('f-brand').textContent = t(C.site.name);
  document.getElementById('f-intro').textContent = lang === 'zh'
    ? `${t(C.site.fullName)}，专注于全栈 AI 芯片研发，为全球客户提供从数据中心到边缘端的完整 AI 算力解决方案。`
    : `${t(C.site.fullName)} focuses on full-stack AI chip R&D, delivering complete AI compute solutions from data center to edge.`;

  document.getElementById('f-contact').innerHTML = `
    <div>📧 <a href="mailto:${C.site.email}">${C.site.email}</a></div>
    <div>📞 ${C.site.phone}</div>
    <div>📍 ${t(C.site.address)}</div>`;

  // 产品列
  document.getElementById('f-col1-title').textContent = lang === 'zh' ? '产品' : 'Products';
  document.getElementById('f-col1-links').innerHTML = C.products.map(p =>
    `<li><a href="${p.link}">${t(p.name)}</a></li>`
  ).join('');

  // 解决方案列
  document.getElementById('f-col2-title').textContent = lang === 'zh' ? '解决方案' : 'Solutions';
  const sols = lang === 'zh'
    ? ['AI 大模型加速', '自动驾驶方案', '数据中心方案', '工业 AIoT 方案']
    : ['AI LLM Acceleration', 'Autonomous Driving', 'Data Center', 'Industrial AIoT'];
  document.getElementById('f-col2-links').innerHTML = sols.map(s =>
    `<li><a href="#">${s}</a></li>`
  ).join('');

  // 公司列
  document.getElementById('f-col3-title').textContent = lang === 'zh' ? '公司' : 'Company';
  const comps = lang === 'zh'
    ? ['关于我们', '新闻动态', '加入我们', '联系我们']
    : ['About Us', 'News', 'Careers', 'Contact'];
  document.getElementById('f-col3-links').innerHTML = comps.map(c =>
    `<li><a href="#">${c}</a></li>`
  ).join('');

  // 版权
  document.getElementById('f-copy').textContent =
    `© ${C.site.copyright} ${t(C.site.fullName)}. ${lang === 'zh' ? '保留所有权利。' : 'All rights reserved.'}`;
  document.getElementById('f-icp').innerHTML =
    `<a href="https://beian.miit.gov.cn/" target="_blank">${C.site.icp}</a>`;
}

/* ─────────────────────────────────────────────────
   总渲染入口
───────────────────────────────────────────────── */
function renderAll() {
  renderNav();
  renderHero();
  renderProducts();
  renderStats();
  renderScenarios();
  renderNews();
  renderPartners();
  renderFooter();
  // 重新触发滚动动效
  setTimeout(observeAll, 50);
}

/* ─────────────────────────────────────────────────
   初始化
───────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  renderAll();
});
