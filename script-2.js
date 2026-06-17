/* ==========================================================================
   Abdusee.Tech — App Script
   ========================================================================== */

(() => {
  'use strict';

  /* ------------------------------------------------------------------
     Content Data
     ------------------------------------------------------------------ */
  const PILLAR_LABELS = {
    programming: 'Programming & Web/Mobile Dev',
    ai: 'AI & Automation',
    money: 'Online Income',
    video: 'Video Production',
    design: 'Visual Arts & UI/UX',
    trading: 'Digital Trading',
    growth: 'Content Creation & YouTube Growth'
  };

  const featured = [
    { tag: 'AI & Automation', icon: '🤖', title: 'Building Your First AI Agent with No Code', desc: 'A step-by-step walkthrough for wiring up an autonomous agent using free tools — no Python required.', meta: '8 min read · Updated this week' },
    { tag: 'Online Income', icon: '💼', title: 'The $0 Freelance Starter Kit', desc: 'Everything you need to land your first client this month — proposal templates included.', meta: '12 min read · Guide' },
    { tag: 'Content Growth', icon: '📊', title: 'Why Your Thumbnails Are Killing Your CTR', desc: 'A breakdown of 50 high-performing thumbnails and the design patterns behind them.', meta: '6 min read · Case Study' },
    { tag: 'Web Development', icon: '⚛️', title: 'Ship a Portfolio Site in a Weekend', desc: 'From zero to deployed — a practical build using modern frontend tooling.', meta: '15 min read · Tutorial' },
    { tag: 'Visual Design', icon: '🎨', title: 'Glassmorphism: When It Works (and When It Doesn\'t)', desc: 'A practical look at the trend, with do/don\'t examples for real interfaces.', meta: '7 min read · Article' },
    { tag: 'Digital Trading', icon: '📈', title: 'Risk Management for Beginners: The 1% Rule', desc: 'The single habit that separates traders who survive from those who don\'t.', meta: '9 min read · Guide' }
  ];

  const moneyContent = [
    { cat: 'freelancing', tag: 'Freelancing', icon: '🧑‍💻', title: 'Pricing Your First Freelance Project', desc: 'A simple framework for quoting work without underselling yourself.', meta: '10 min · Guide' },
    { cat: 'freelancing', tag: 'Freelancing', icon: '📝', title: 'Proposal Templates That Actually Get Replies', desc: 'Five proposal structures tested across 100+ pitches, with results.', meta: '8 min · Templates' },
    { cat: 'digital-business', tag: 'Digital Business', icon: '🏗️', title: 'Turning a Skill Into a Digital Product', desc: 'From idea to first sale — packaging knowledge into something sellable.', meta: '14 min · Guide' },
    { cat: 'digital-business', tag: 'Digital Business', icon: '🧾', title: 'Choosing a Business Structure for Solo Creators', desc: 'A plain-language comparison of common setups for online businesses.', meta: '11 min · Article' },
    { cat: 'remote-work', tag: 'Remote Work', icon: '🌍', title: 'Finding Legit Remote Roles Without Getting Scammed', desc: 'Red flags, vetted job boards, and how to evaluate an offer.', meta: '9 min · Guide' },
    { cat: 'remote-work', tag: 'Remote Work', icon: '🗂️', title: 'Building a Remote-Ready Resume', desc: 'What hiring managers actually look for when the role is fully remote.', meta: '7 min · Template' },
    { cat: 'affiliate', tag: 'Affiliate Marketing', icon: '🔗', title: 'Affiliate Marketing Without an Audience', desc: 'Strategies for earning your first commissions before you go viral.', meta: '13 min · Guide' },
    { cat: 'affiliate', tag: 'Affiliate Marketing', icon: '📐', title: 'Disclosure Done Right: Trust &amp; Compliance', desc: 'How to stay transparent with your audience — and why it converts better.', meta: '6 min · Article' },
    { cat: 'ecommerce', tag: 'E-commerce', icon: '🛒', title: 'Validating a Product Idea Before You Build a Store', desc: 'Cheap, fast ways to test demand before spending on inventory.', meta: '10 min · Guide' },
    { cat: 'ecommerce', tag: 'E-commerce', icon: '📦', title: 'Fulfillment 101: Dropshipping vs Print-on-Demand vs Self-Fulfilled', desc: 'A practical comparison for choosing your first fulfillment model.', meta: '12 min · Comparison' },
    { cat: 'remote-work', tag: 'Remote Work', icon: '⏱️', title: 'Managing Time Zones as a Remote Team Member', desc: 'Tools and habits for working across time zones without burning out.', meta: '5 min · Article' },
    { cat: 'ecommerce', tag: 'E-commerce', icon: '💳', title: 'Setting Up Payments for Your First Online Store', desc: 'A walkthrough of payment processors and what to watch for in fees.', meta: '8 min · Guide' }
  ];

  const aiTools = [
    { icon: '🧩', name: 'PromptForge', desc: 'A prompt management workspace for organizing, versioning, and testing prompts.', rating: '★★★★☆ 4.4' },
    { icon: '🗣️', name: 'VoxScribe', desc: 'Real-time transcription and speaker-labeled meeting notes.', rating: '★★★★★ 4.8' },
    { icon: '🎞️', name: 'FrameFlow AI', desc: 'AI-assisted video editing — auto cuts, captions, and b-roll suggestions.', rating: '★★★★☆ 4.3' },
    { icon: '🧠', name: 'AgentDesk', desc: 'A visual builder for multi-step AI agents and automations.', rating: '★★★★☆ 4.5' }
  ];

  const aiContent = [
    { cat: 'tutorial', tag: 'Tutorial', icon: '🛠️', title: 'Prompt Engineering: From Basics to Chains', desc: 'A progressive guide from single prompts to multi-step prompt chains.', meta: '16 min · Tutorial' },
    { cat: 'tutorial', tag: 'Tutorial', icon: '⚙️', title: 'Automating Your Inbox with AI Rules', desc: 'Set up smart filters and AI-drafted replies in under an hour.', meta: '9 min · Tutorial' },
    { cat: 'news', tag: 'AI News', icon: '📰', title: 'What This Month\'s Model Updates Actually Change for Builders', desc: 'A practical look at new capabilities and what to try first.', meta: '7 min · News' },
    { cat: 'news', tag: 'AI News', icon: '🏛️', title: 'AI Policy Roundup: What Creators Should Know', desc: 'Recent regulatory developments relevant to digital creators.', meta: '6 min · News' },
    { cat: 'resource', tag: 'Resource', icon: '📚', title: 'The AI Glossary for Non-Engineers', desc: 'Plain-language definitions for the terms you keep seeing.', meta: '5 min · Reference' },
    { cat: 'resource', tag: 'Resource', icon: '🧮', title: 'Free vs Paid AI Tools: A Decision Framework', desc: 'When it\'s worth upgrading — and when the free tier is plenty.', meta: '8 min · Reference' },
    { cat: 'tutorial', tag: 'Tutorial', icon: '🔄', title: 'Building a Content Pipeline with AI + Sheets', desc: 'Connect a spreadsheet to an AI workflow for hands-off content drafts.', meta: '12 min · Tutorial' },
    { cat: 'news', tag: 'AI News', icon: '🚀', title: 'Three Startups Using AI in Unexpected Ways', desc: 'Lesser-known applications worth watching this quarter.', meta: '6 min · News' },
    { cat: 'resource', tag: 'Resource', icon: '🗃️', title: 'A Curated List of Open-Source AI Models', desc: 'Models worth knowing, organized by use case.', meta: '10 min · Reference' }
  ];

  const newsContent = [
    { cat: 'technology', date: { day: '12', mon: 'Jun' }, title: 'Browser Makers Push New Standard for On-Device AI', desc: 'A new proposal aims to standardize how web apps access local AI models.' },
    { cat: 'ai', date: { day: '11', mon: 'Jun' }, title: 'Open-Source Model Closes the Gap on Reasoning Benchmarks', desc: 'Independent tests show smaller models matching larger ones on key tasks.' },
    { cat: 'startups', date: { day: '10', mon: 'Jun' }, title: 'Seed-Stage Funding Shifts Toward Vertical AI Tools', desc: 'Investors increasingly favor narrow, workflow-specific AI products.' },
    { cat: 'innovation', date: { day: '09', mon: 'Jun' }, title: 'Edge Computing Adoption Accelerates for Creator Apps', desc: 'More apps move processing on-device for speed and privacy.' },
    { cat: 'technology', date: { day: '08', mon: 'Jun' }, title: 'New Web Framework Release Focuses on Build Speed', desc: 'Early benchmarks show significant gains for large projects.' },
    { cat: 'ai', date: { day: '07', mon: 'Jun' }, title: 'AI Coding Assistants Add Multi-File Refactoring', desc: 'Updates let assistants reason across entire codebases, not just files.' },
    { cat: 'startups', date: { day: '06', mon: 'Jun' }, title: 'Creator Economy Platform Raises Series B', desc: 'Funding aimed at expanding monetization tools for independent creators.' },
    { cat: 'innovation', date: { day: '05', mon: 'Jun' }, title: 'Digital Identity Standards Get a Refresh', desc: 'New proposals aim to simplify cross-platform verification.' }
  ];

  const appsContent = [
    { cat: 'productivity', icon: '✅', title: 'TaskFlow', desc: 'Minimal task manager with keyboard-first navigation and daily planning view.', rating: '★★★★★ 4.7' },
    { cat: 'ai-apps', icon: '🧠', title: 'Notely AI', desc: 'Note-taking app with built-in summarization and smart search.', rating: '★★★★☆ 4.4' },
    { cat: 'mobile', icon: '📱', title: 'Pulse Habit Tracker', desc: 'Simple habit tracking with streaks and gentle reminders.', rating: '★★★★☆ 4.5' },
    { cat: 'web', icon: '🌐', title: 'Canva', desc: 'Browser-based design tool for thumbnails, social posts, and presentations.', rating: '★★★★★ 4.8' },
    { cat: 'productivity', icon: '📅', title: 'Cron Calendar', desc: 'Fast, keyboard-driven calendar app built for power users.', rating: '★★★★☆ 4.3' },
    { cat: 'ai-apps', icon: '🎙️', title: 'Otter.ai', desc: 'Meeting transcription with speaker detection and summaries.', rating: '★★★★☆ 4.5' },
    { cat: 'mobile', icon: '🧘', title: 'Calm Focus Timer', desc: 'Pomodoro-style focus timer with ambient soundscapes.', rating: '★★★★☆ 4.2' },
    { cat: 'web', icon: '🗂️', title: 'Notion', desc: 'All-in-one workspace for notes, docs, and project tracking.', rating: '★★★★★ 4.7' }
  ];

  // Featured Videos — replace videoId with real YouTube video IDs from
  // https://www.youtube.com/@abdusalemahmed77. Embeds are lazy-loaded.
  const FEATURED_VIDEOS = [
    { videoId: 'dQw4w9WgXcQ', title: 'Setting Up Your First AI Automation', desc: 'A quick walkthrough of the no-code automation stack used on ATN.' },
    { videoId: 'dQw4w9WgXcQ', title: 'Freelancing in 2026: What Actually Works', desc: 'Honest breakdown of platforms, pricing, and pitching strategy.' },
    { videoId: 'dQw4w9WgXcQ', title: 'Building a Portfolio Site Live', desc: 'Full build from blank file to deployed site in one sitting.' }
  ];

  // Articles loaded dynamically from articles.json
  let articlesData = [];
  let articleSearchQuery = '';

  const cmdkIndex = [
    { icon: '🏠', label: 'Home', route: 'home' },
    { icon: '💰', label: 'Online Money', route: 'money' },
    { icon: '🤖', label: 'AI & Automation', route: 'ai' },
    { icon: '📰', label: 'News', route: 'news' },
    { icon: '📱', label: 'Apps', route: 'apps' },
    { icon: '👤', label: 'About Me', route: 'about' },
    { icon: '✉️', label: 'Contact', route: 'contact' },
    { icon: '🎬', label: 'Featured Videos', route: 'home', meta: 'Videos', anchor: '#videosSection' },
    ...featured.map(f => ({ icon: f.icon, label: f.title, route: 'home', meta: f.tag })),
    ...moneyContent.map(f => ({ icon: f.icon, label: f.title, route: 'money', meta: f.tag })),
    ...aiContent.map(f => ({ icon: f.icon, label: f.title, route: 'ai', meta: f.tag })),
    ...FEATURED_VIDEOS.map(v => ({ icon: '🎬', label: v.title, route: 'home', meta: 'Video', anchor: '#videosSection' }))
  ];

  // Articles are appended to cmdkIndex once articles.json loads (see loadArticles)

  /* ------------------------------------------------------------------
     Render helpers
     ------------------------------------------------------------------ */
  function renderContentCard(item){
    return `
      <article class="content-card">
        <div class="cc-thumb">${item.icon}</div>
        <div class="cc-body">
          <span class="cc-tag">${item.tag}</span>
          <h3>${item.title}</h3>
          <p>${item.desc}</p>
          <div class="cc-meta"><span>${item.meta}</span><span>Read →</span></div>
        </div>
      </article>`;
  }

  function renderToolCard(item, isApp){
    return `
      <article class="tool-card">
        <div class="tool-icon">${item.icon}</div>
        <h3>${item.name || item.title}</h3>
        <p>${item.desc}</p>
        <span class="tool-rating">${item.rating}</span>
      </article>`;
  }

  function renderNewsItem(item){
    return `
      <article class="news-item">
        <div class="news-date"><span>${item.date.day}</span><span>${item.date.mon}</span></div>
        <div class="news-content">
          <h3>${item.title}</h3>
          <p>${item.desc}</p>
        </div>
      </article>`;
  }

  function renderVideoEmbed(item){
    return `
      <article class="video-embed-card">
        <div class="video-embed-wrap">
          <iframe
            src="https://www.youtube.com/embed/${item.videoId}"
            title="${item.title}"
            loading="lazy"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen></iframe>
        </div>
        <div class="video-embed-info">
          <h4>${item.title}</h4>
          <p>${item.desc}</p>
        </div>
      </article>`;
  }

  function escapeHtml(str){
    return String(str).replace(/[&<>"']/g, c => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;' }[c]));
  }

  function highlightMatch(text, query){
    const safe = escapeHtml(text);
    if (!query) return safe;
    const escapedQuery = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const re = new RegExp('(' + escapedQuery + ')', 'ig');
    return safe.replace(re, '<mark class="search-highlight">$1</mark>');
  }

  function renderArticleCard(article, query){
    const q = query || '';
    return `
      <article class="content-card article-card" data-article-id="${article.id}" tabindex="0" role="button" aria-label="Read article: ${article.title}">
        <div class="cc-thumb">
          <img src="${article.image}" alt="${article.title}" loading="lazy" width="400" height="140" style="width:100%;height:100%;object-fit:cover;">
        </div>
        <div class="cc-body">
          <span class="cc-tag">${escapeHtml(article.category)}</span>
          <h3>${highlightMatch(article.title, q)}</h3>
          <p>${highlightMatch(article.description, q)}</p>
          <div class="cc-meta"><span>${formatDate(article.date)} · ${escapeHtml(article.author)}</span><span>Read →</span></div>
        </div>
      </article>`;
  }

  function formatDate(iso){
    try{
      return new Date(iso + 'T00:00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    }catch(e){ return iso; }
  }

  function mount(){
    document.getElementById('featuredGrid').innerHTML = featured.map(renderContentCard).join('');
    document.getElementById('aiToolsGrid').innerHTML = aiTools.map(t => renderToolCard(t)).join('');
    document.getElementById('appsGrid').innerHTML = appsContent.map(t => renderToolCard(t)).join('');

    renderFiltered('moneyGrid', moneyContent, 'all');
    renderFiltered('aiGrid', aiContent, 'all');
    renderFiltered('newsGrid', newsContent, 'all', true);
    renderFiltered('appsGrid', appsContent, 'all', false, true);

    const videoGrid = document.getElementById('videoGrid');
    if (videoGrid) videoGrid.innerHTML = FEATURED_VIDEOS.map(renderVideoEmbed).join('');
  }

  function renderFiltered(targetId, data, filter, isNews, isTool){
    const el = document.getElementById(targetId);
    if (!el) return;
    const items = filter === 'all' ? data : data.filter(d => d.cat === filter);
    if (isNews){
      el.innerHTML = items.map(renderNewsItem).join('');
    } else if (isTool){
      el.innerHTML = items.map(t => renderToolCard(t)).join('');
    } else {
      el.innerHTML = items.map(renderContentCard).join('');
    }
  }

  /* ------------------------------------------------------------------
     Filter chips
     ------------------------------------------------------------------ */
  function bindFilters(){
    document.querySelectorAll('.filter-bar').forEach(bar => {
      const targetId = bar.dataset.target;
      let data;
      let isNews = false, isTool = false;
      if (targetId === 'moneyGrid') data = moneyContent;
      if (targetId === 'aiGrid') data = aiContent;
      if (targetId === 'newsGrid'){ data = newsContent; isNews = true; }
      if (targetId === 'appsGrid'){ data = appsContent; isTool = true; }

      bar.addEventListener('click', e => {
        const chip = e.target.closest('.filter-chip');
        if (!chip) return;
        bar.querySelectorAll('.filter-chip').forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        renderFiltered(targetId, data, chip.dataset.filter, isNews, isTool);
      });
    });
  }

  /* ------------------------------------------------------------------
     Routing
     ------------------------------------------------------------------ */
  const routes = ['home', 'money', 'ai', 'news', 'apps', 'about', 'contact'];
  // pillar deep-links map to nearest matching view
  const pillarMap = {
    programming: 'home', ai: 'ai', money: 'money', video: 'home',
    design: 'home', trading: 'home', growth: 'home'
  };

  function navigate(route){
    if (!routes.includes(route)) route = pillarMap[route] || 'home';
    document.querySelectorAll('.view').forEach(v => {
      v.hidden = v.dataset.view !== route;
    });
    document.querySelectorAll('.nav-links a, .footer-col a').forEach(a => {
      a.classList.toggle('active', a.dataset.route === route);
    });
    window.scrollTo({ top: 0, behavior: 'instant' in window ? 'instant' : 'auto' });

    // update title for SEO/UX
    const titles = {
      home: 'Abdusee.Tech — AI, Online Income & Digital Skills',
      money: 'Online Money — Abdusee.Tech',
      ai: 'AI & Automation — Abdusee.Tech',
      news: 'News — Abdusee.Tech',
      apps: 'Apps — Abdusee.Tech',
      about: 'About Abdusalam Ahmed Kasim — Abdusee.Tech',
      contact: 'Contact — Abdusee.Tech'
    };
    document.title = titles[route] || titles.home;
  }

  function bindRouting(){
    document.body.addEventListener('click', e => {
      const link = e.target.closest('[data-route]');
      if (!link) return;
      const route = link.dataset.route;
      if (routes.includes(route) || pillarMap[route]){
        e.preventDefault();
        const target = routes.includes(route) ? route : pillarMap[route];
        location.hash = '#' + target;
        navigate(target);
        // close mobile menu
        document.getElementById('navLinks').classList.remove('open');
        document.getElementById('menuToggle').classList.remove('open');
      }
    });

    window.addEventListener('hashchange', () => {
      const route = location.hash.replace('#', '') || 'home';
      navigate(route);
    });

    const initial = location.hash.replace('#', '') || 'home';
    navigate(initial);
  }

  /* ------------------------------------------------------------------
     Theme toggle
     ------------------------------------------------------------------ */
  function initTheme(){
    const stored = localStorage.getItem('abdusee-theme');
    const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
    const theme = stored || (prefersLight ? 'light' : 'dark');
    document.body.setAttribute('data-theme', theme);

    document.getElementById('themeToggle').addEventListener('click', () => {
      const current = document.body.getAttribute('data-theme');
      const next = current === 'dark' ? 'light' : 'dark';
      document.body.setAttribute('data-theme', next);
      localStorage.setItem('abdusee-theme', next);
    });
  }

  /* ------------------------------------------------------------------
     Mobile menu
     ------------------------------------------------------------------ */
  function initMenu(){
    const toggle = document.getElementById('menuToggle');
    const links = document.getElementById('navLinks');
    toggle.addEventListener('click', () => {
      toggle.classList.toggle('open');
      links.classList.toggle('open');
    });
  }

  /* ------------------------------------------------------------------
     Command palette
     ------------------------------------------------------------------ */
  function initCmdk(){
    const overlay = document.getElementById('cmdkOverlay');
    const input = document.getElementById('cmdkInput');
    const results = document.getElementById('cmdkResults');
    const trigger = document.getElementById('cmdkTrigger');

    function open(){
      overlay.classList.add('open');
      input.value = '';
      renderResults('');
      setTimeout(() => input.focus(), 50);
    }
    function close(){ overlay.classList.remove('open'); }

    function renderResults(query){
      const q = query.trim().toLowerCase();
      const matches = q
        ? cmdkIndex.filter(i => i.label.toLowerCase().includes(q)).slice(0, 8)
        : cmdkIndex.slice(0, 7);

      if (!matches.length){
        results.innerHTML = `<div class="cmdk-empty">No results for "${query}"</div>`;
        return;
      }
      results.innerHTML = matches.map(m => `
        <div class="cmdk-item" data-route="${m.route}" ${m.anchor ? `data-anchor="${m.anchor}"` : ''} ${m.articleId ? `data-article-id="${m.articleId}"` : ''}>
          <span class="ci-icon">${m.icon}</span>
          <span>${m.label}</span>
          ${m.meta ? `<span class="ci-meta">${m.meta}</span>` : ''}
        </div>
      `).join('');
    }

    trigger.addEventListener('click', open);
    overlay.addEventListener('click', e => { if (e.target === overlay) close(); });
    input.addEventListener('input', e => renderResults(e.target.value));

    results.addEventListener('click', e => {
      const item = e.target.closest('.cmdk-item');
      if (!item) return;
      const route = item.dataset.route;
      const anchor = item.dataset.anchor;
      const articleId = item.dataset.articleId;

      location.hash = '#' + route;
      navigate(route);
      close();

      if (articleId){
        setTimeout(() => openArticleModal(articleId), 300);
      } else if (anchor){
        setTimeout(() => {
          const target = document.querySelector(anchor);
          if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 300);
      }
    });

    document.addEventListener('keydown', e => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k'){
        e.preventDefault();
        overlay.classList.contains('open') ? close() : open();
      }
      if (e.key === 'Escape' && overlay.classList.contains('open')) close();
    });
  }

  /* ------------------------------------------------------------------
     Hero terminal typing animation
     ------------------------------------------------------------------ */
  function initTerminal(){
    const el = document.getElementById('terminalCode');
    const snippets = [
      `$ npx create-abdusee-app my-site\n\n> Installing dependencies...\n> Setting up AI agent boilerplate...\n> Done in 4.2s ✓\n\n$ npm run dev\n\n  ➜  Local:   http://localhost:3000\n  ➜  Ready in 312ms`,

      `import { agent } from "abdusee-ai";\n\nconst writer = agent({\n  role: "content strategist",\n  pillars: [\n    "AI & Automation",\n    "Online Income",\n    "YouTube Growth"\n  ]\n});\n\nawait writer.run("Draft this week's brief");\n// ✓ Brief ready in 8.4s`,

      `def calculate_roi(spend, revenue):\n    if spend == 0:\n        return float("inf")\n    return (revenue - spend) / spend\n\n# Affiliate campaign check\nroi = calculate_roi(120, 480)\nprint(f"ROI: {roi:.0%}")\n# ROI: 300%`
    ];

    let snippetIndex = 0;
    let charIndex = 0;
    let deleting = false;
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReduced){
      el.textContent = snippets[0];
      return;
    }

    function tick(){
      const current = snippets[snippetIndex];
      if (!deleting){
        charIndex++;
        el.textContent = current.slice(0, charIndex);
        if (charIndex >= current.length){
          deleting = false;
          setTimeout(() => { deleting = true; tick(); }, 2400);
          return;
        }
        setTimeout(tick, 18);
      } else {
        charIndex -= 6;
        if (charIndex < 0) charIndex = 0;
        el.textContent = current.slice(0, charIndex);
        if (charIndex === 0){
          deleting = false;
          snippetIndex = (snippetIndex + 1) % snippets.length;
          setTimeout(tick, 400);
          return;
        }
        setTimeout(tick, 8);
      }
    }
    tick();
  }

  /* ------------------------------------------------------------------
     Stat counters
     ------------------------------------------------------------------ */
  function initCounters(){
    const stats = document.querySelectorAll('.stat-num');
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const animate = (el) => {
      const target = parseInt(el.dataset.count, 10);
      if (prefersReduced){ el.textContent = target; return; }
      let current = 0;
      const step = Math.max(1, Math.ceil(target / 40));
      const interval = setInterval(() => {
        current += step;
        if (current >= target){ current = target; clearInterval(interval); }
        el.textContent = current;
      }, 30);
    };

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting){
          animate(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.4 });

    stats.forEach(s => observer.observe(s));
  }

  /* ------------------------------------------------------------------
     Forms (Newsletter + Contact)
     - Includes hooks for Firebase / Supabase / GA4 integration.
     ------------------------------------------------------------------ */
  function isValidEmail(value){
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
  }

  function subscribeEmail(email){
    // ---- Integration point ----
    // Firebase (modular SDK):
    //   import { getFirestore, collection, addDoc } from "firebase/firestore";
    //   await addDoc(collection(db, "subscribers"), { email, createdAt: Date.now() });
    //
    // Supabase:
    //   await supabase.from('subscribers').insert({ email });
    //
    // GA4 event:
    if (typeof gtag === 'function'){
      gtag('event', 'newsletter_signup', { method: 'website_form' });
    }
    console.info('[ATN] Subscriber captured (stub):', email);
    return Promise.resolve({ ok: true });
  }

  function submitContactMessage(data){
    // ---- Integration point ----
    // Firebase:
    //   await addDoc(collection(db, "contact_messages"), { ...data, createdAt: Date.now() });
    // Supabase:
    //   await supabase.from('contact_messages').insert(data);
    if (typeof gtag === 'function'){
      gtag('event', 'contact_form_submit', { method: 'website_form' });
    }
    console.info('[ATN] Contact message captured (stub):', data);
    return Promise.resolve({ ok: true });
  }

  function bumpSubscriberCount(){
    const el = document.getElementById('subCount');
    if (!el) return;
    const current = parseInt(el.textContent.replace(/,/g, ''), 10) || 0;
    el.textContent = (current + 1).toLocaleString('en-US');
  }

  function initForms(){
    // Main hero/section newsletter
    const newsletter = document.getElementById('newsletterForm');
    const newsletterSuccess = document.getElementById('newsletterSuccess');
    if (newsletter){
      newsletter.addEventListener('submit', e => {
        e.preventDefault();
        const input = document.getElementById('newsletterEmail') || newsletter.querySelector('input');
        const email = input.value.trim();
        if (!isValidEmail(email)){
          input.setCustomValidity('Please enter a valid email address');
          input.reportValidity();
          return;
        }
        input.setCustomValidity('');
        subscribeEmail(email).then(() => {
          bumpSubscriberCount();
          input.value = '';
          if (newsletterSuccess) newsletterSuccess.classList.add('show');
          setTimeout(() => newsletterSuccess && newsletterSuccess.classList.remove('show'), 5000);
        });
      });
    }

    // Footer newsletter shortcut
    const footerNewsletter = document.getElementById('footerNewsletterForm');
    if (footerNewsletter){
      footerNewsletter.addEventListener('submit', e => {
        e.preventDefault();
        const input = document.getElementById('footerNewsletterEmail');
        const email = input.value.trim();
        if (!isValidEmail(email)){
          input.setCustomValidity('Please enter a valid email address');
          input.reportValidity();
          return;
        }
        input.setCustomValidity('');
        subscribeEmail(email).then(() => {
          bumpSubscriberCount();
          input.value = '';
          input.placeholder = "You're in! ✓";
          setTimeout(() => { input.placeholder = 'you@example.com'; }, 4000);
        });
      });
    }

    // Contact form
    const contact = document.getElementById('contactForm');
    if (contact){
      contact.addEventListener('submit', e => {
        e.preventDefault();
        const note = document.getElementById('formNote');
        const data = {
          name: contact.name.value.trim(),
          email: contact.email.value.trim(),
          subject: contact.subject.value.trim(),
          message: contact.message.value.trim()
        };
        if (!isValidEmail(data.email)){
          contact.email.setCustomValidity('Please enter a valid email address');
          contact.email.reportValidity();
          return;
        }
        contact.email.setCustomValidity('');
        submitContactMessage(data).then(() => {
          note.textContent = `Thanks — your message has been queued to ahmedabdusalem397@gmail.com. I'll reply within 48 hours.`;
          contact.reset();
        });
      });
    }
  }

  /* ------------------------------------------------------------------
     Articles (loaded from articles.json) + search + detail modal
     ------------------------------------------------------------------ */
  function renderArticles(){
    const grid = document.getElementById('articlesGrid');
    const empty = document.getElementById('articleEmpty');
    if (!grid) return;

    const q = articleSearchQuery.trim().toLowerCase();
    const items = q
      ? articlesData.filter(a =>
          a.title.toLowerCase().includes(q) ||
          a.description.toLowerCase().includes(q) ||
          (a.category && a.category.toLowerCase().includes(q))
        )
      : articlesData;

    if (!items.length){
      grid.innerHTML = '';
      if (empty) empty.hidden = false;
      return;
    }
    if (empty) empty.hidden = true;
    grid.innerHTML = items.map(a => renderArticleCard(a, q)).join('');
    requestAnimationFrame(initReveal);
  }

  function openArticleModal(id){
    const article = articlesData.find(a => a.id === id);
    if (!article) return;
    const modal = document.getElementById('articleModal');
    const body = document.getElementById('articleModalBody');
    if (!modal || !body) return;

    const paragraphs = (article.content || '').split('\n').filter(Boolean)
      .map(p => `<p>${escapeHtml(p)}</p>`).join('');

    body.innerHTML = `
      <span class="cc-tag">${escapeHtml(article.category)}</span>
      <h2 id="articleModalTitle">${escapeHtml(article.title)}</h2>
      <div class="article-modal-meta">${formatDate(article.date)} · ${escapeHtml(article.author)}</div>
      <img src="${article.image}" alt="${escapeHtml(article.title)}" loading="lazy" style="width:100%;border-radius:var(--radius-md);margin-bottom:1.25rem;">
      ${paragraphs}
    `;

    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';

    if (typeof gtag === 'function'){
      gtag('event', 'article_view', { article_id: article.id, article_title: article.title });
    }
  }

  function closeArticleModal(){
    const modal = document.getElementById('articleModal');
    if (!modal) return;
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  function initArticleModal(){
    const overlay = document.getElementById('articleModalOverlay');
    const closeBtn = document.getElementById('articleModalClose');
    if (overlay) overlay.addEventListener('click', closeArticleModal);
    if (closeBtn) closeBtn.addEventListener('click', closeArticleModal);
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape') closeArticleModal();
    });

    document.body.addEventListener('click', e => {
      const card = e.target.closest('.article-card');
      if (!card) return;
      openArticleModal(card.dataset.articleId);
    });

    document.body.addEventListener('keydown', e => {
      if (e.key !== 'Enter' && e.key !== ' ') return;
      const card = e.target.closest('.article-card');
      if (!card) return;
      e.preventDefault();
      openArticleModal(card.dataset.articleId);
    });
  }

  function initArticleSearch(){
    const input = document.getElementById('articleSearch');
    if (!input) return;
    input.addEventListener('input', e => {
      articleSearchQuery = e.target.value;
      renderArticles();
    });
  }

  async function loadArticles(){
    try{
      const res = await fetch('articles.json');
      if (!res.ok) throw new Error('Failed to load articles.json');
      articlesData = await res.json();
    }catch(err){
      console.warn('[ATN] Could not load articles.json:', err);
      articlesData = [];
    }
    renderArticles();

    // Add articles to the command palette index
    articlesData.forEach(a => {
      cmdkIndex.push({ icon: '📝', label: a.title, route: 'home', meta: a.category, articleId: a.id, anchor: '#articlesSection' });
    });
  }

  /* ------------------------------------------------------------------
     Loading screen
     ------------------------------------------------------------------ */
  function initLoader(){
    const loader = document.getElementById('loader');
    const fill = document.getElementById('loaderBarFill');
    const percent = document.getElementById('loaderPercent');
    if (!loader) return;

    let progress = 0;
    const tick = () => {
      progress += Math.random() * 18 + 7;
      if (progress > 100) progress = 100;
      if (fill) fill.style.width = progress + '%';
      if (percent) percent.textContent = Math.round(progress) + '%';
      if (progress < 100) setTimeout(tick, 120);
    };
    tick();

    const hide = () => {
      if (fill) fill.style.width = '100%';
      if (percent) percent.textContent = '100%';
      setTimeout(() => loader.classList.add('loaded'), 250);
    };

    if (document.readyState === 'complete'){
      setTimeout(hide, 600);
    } else {
      window.addEventListener('load', () => setTimeout(hide, 400));
    }
    // Failsafe: never block the page for more than 2.5s
    setTimeout(hide, 2500);
  }

  /* ------------------------------------------------------------------
     Scroll progress indicator
     ------------------------------------------------------------------ */
  function initScrollProgress(){
    const bar = document.getElementById('scrollProgress');
    const label = document.getElementById('scrollProgressLabel');
    if (!bar) return;

    let ticking = false;
    function update(){
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const pct = max > 0 ? Math.min(100, Math.max(0, (scrollTop / max) * 100)) : 0;
      bar.style.width = pct + '%';
      bar.setAttribute('aria-valuenow', Math.round(pct));
      if (label){
        label.textContent = `Reading Progress: ${Math.round(pct)}%`;
        label.classList.toggle('visible', scrollTop > 80);
      }
      ticking = false;
    }
    update();
    window.addEventListener('scroll', () => {
      if (!ticking){
        requestAnimationFrame(update);
        ticking = true;
      }
    });
    window.addEventListener('resize', update);
  }

  /* ------------------------------------------------------------------
     Featured video play button (swaps thumbnail for YouTube embed)
     ------------------------------------------------------------------ */
  function initVideoPlay(){
    const btn = document.getElementById('videoPlayBtn');
    if (!btn) return;
    btn.addEventListener('click', () => {
      const wrap = btn.closest('.video-thumb');
      if (!wrap) return;
      const videoId = btn.dataset.videoId || (FEATURED_VIDEOS[0] && FEATURED_VIDEOS[0].videoId) || '';
      wrap.innerHTML = `
        <div class="video-embed-wrap" style="position:absolute;inset:0;aspect-ratio:auto;">
          <iframe
            src="https://www.youtube.com/embed/${videoId}?autoplay=1"
            title="ATN featured video"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen></iframe>
        </div>`;
      if (typeof gtag === 'function'){
        gtag('event', 'video_play', { video_id: videoId });
      }
    });
  }

  /* ------------------------------------------------------------------
     PWA: install prompt
     ------------------------------------------------------------------ */
  function initInstallPrompt(){
    const btn = document.getElementById('installAppBtn');
    if (!btn) return;
    let deferredPrompt = null;

    window.addEventListener('beforeinstallprompt', e => {
      e.preventDefault();
      deferredPrompt = e;
      btn.hidden = false;
    });

    btn.addEventListener('click', async () => {
      if (!deferredPrompt) return;
      btn.hidden = true;
      deferredPrompt.prompt();
      const choice = await deferredPrompt.userChoice;
      if (typeof gtag === 'function'){
        gtag('event', 'pwa_install_prompt', { outcome: choice.outcome });
      }
      deferredPrompt = null;
    });

    window.addEventListener('appinstalled', () => {
      btn.hidden = true;
      if (typeof gtag === 'function') gtag('event', 'pwa_installed');
    });
  }

  function registerServiceWorker(){
    if (!('serviceWorker' in navigator)) return;
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('sw.js').catch(err => {
        console.warn('[ATN] Service worker registration failed:', err);
      });
    });
  }

  /* ------------------------------------------------------------------
     AI Chat Assistant (🤖 Ask Abdusee AI)
     - UI is fully functional with canned responses.
     - Ready for OpenAI API integration: replace getAssistantReply()
       with a fetch() call to your backend / API endpoint.
     ------------------------------------------------------------------ */
  function getAssistantReply(message){
    const m = message.toLowerCase();
    if (m.includes('ai tool')) return "Check out the AI page — it has featured AI applications plus tutorials, news, and resources, filterable by type.";
    if (m.includes('freelance') || m.includes('money') || m.includes('income')) return "The Online Money page covers freelancing, digital business, remote work, affiliate marketing, and e-commerce — all with practical guides.";
    if (m.includes('contact') || m.includes('email')) return `You can reach Abdusalam directly at ahmedabdusalem397@gmail.com, or use the contact form on the Contact page — replies usually come within 48 hours.`;
    if (m.includes('video') || m.includes('youtube')) return "New videos are posted to the ATN YouTube channel — there's a featured video section on the homepage too.";
    if (m.includes('article') || m.includes('blog')) return "You can browse and search all articles in the Latest Articles section on the homepage — try the search box to filter by topic.";
    return "Thanks for the message! I'm a simple assistant for now, but I can point you toward AI tools, online income guides, articles, or contact info — just ask.";
  }

  function initAIChat(){
    const toggle = document.getElementById('aiChatToggle');
    const closeBtn = document.getElementById('aiChatClose');
    const windowEl = document.getElementById('aiChatWindow');
    const form = document.getElementById('aiChatForm');
    const input = document.getElementById('aiChatInput');
    const messages = document.getElementById('aiChatMessages');
    if (!toggle || !windowEl) return;

    function open(){
      windowEl.hidden = false;
      toggle.setAttribute('aria-expanded', 'true');
      setTimeout(() => input && input.focus(), 50);
    }
    function close(){
      windowEl.hidden = true;
      toggle.setAttribute('aria-expanded', 'false');
    }

    toggle.addEventListener('click', () => {
      windowEl.hidden ? open() : close();
    });
    if (closeBtn) closeBtn.addEventListener('click', close);

    if (form){
      form.addEventListener('submit', e => {
        e.preventDefault();
        const text = input.value.trim();
        if (!text) return;

        const userMsg = document.createElement('div');
        userMsg.className = 'ai-msg ai-msg-user';
        userMsg.textContent = text;
        messages.appendChild(userMsg);
        input.value = '';

        // Ready for OpenAI API integration:
        // fetch('/api/assistant', { method: 'POST', body: JSON.stringify({ message: text }) })
        //   .then(r => r.json()).then(data => renderBotReply(data.reply));
        setTimeout(() => {
          const botMsg = document.createElement('div');
          botMsg.className = 'ai-msg ai-msg-bot';
          botMsg.textContent = getAssistantReply(text);
          messages.appendChild(botMsg);
          messages.scrollTop = messages.scrollHeight;
        }, 500);

        messages.scrollTop = messages.scrollHeight;
        if (typeof gtag === 'function'){
          gtag('event', 'ai_chat_message');
        }
      });
    }
  }


  function initReveal(){
    const targets = document.querySelectorAll('.pillar-card, .content-card, .tool-card, .news-item, .vision-card, .skill-pill');
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting){
          entry.target.style.animation = 'fadeIn .6s var(--ease) both';
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    targets.forEach(t => observer.observe(t));
  }

  /* ------------------------------------------------------------------
     Init
     ------------------------------------------------------------------ */
  document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('year').textContent = new Date().getFullYear();
    initLoader();
    mount();
    bindFilters();
    bindRouting();
    initTheme();
    initMenu();
    initCmdk();
    initTerminal();
    initCounters();
    initForms();
    initScrollProgress();
    initVideoPlay();
    initArticleModal();
    initArticleSearch();
    initInstallPrompt();
    initAIChat();
    registerServiceWorker();
    loadArticles();
    // re-run reveal after dynamic content mounts
    requestAnimationFrame(initReveal);
  });
})();
