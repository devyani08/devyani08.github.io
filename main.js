(function () {
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var soundOn = true;
  var audioUnlocked = false;
  var idx = 0;
  var isFlipping = false;
  var flipLockAt = 0;
  var flipWatchdog = 0;
  var PAGES = [
    { id: 'cover', label: 'Cover', roman: 'I' },
    { id: 'about', label: 'About', roman: 'II' },
    { id: 'experience', label: 'Experience', roman: 'III' },
    { id: 'projects', label: 'Projects', roman: 'IV' },
    { id: 'skills', label: 'Skills', roman: 'V' },
    { id: 'github', label: 'GitHub', roman: 'VI' },
    { id: 'education', label: 'Education', roman: 'VII' },
    { id: 'connect', label: 'Connect', roman: 'VIII' },
    { id: 'colophon', label: 'Colophon', roman: 'IX' }
  ];

  var CONTENT = {
    cover:
      '<header class="flex min-h-[40vh] flex-col justify-center md:min-h-[50vh]">' +
      '<h1 class="mt-6 font-display text-4xl font-medium italic leading-[0.95] tracking-tight text-inklight dark:text-vellum sm:mt-8 sm:text-5xl md:text-7xl lg:text-8xl">Devyani<br/><span class="font-display font-medium italic bg-gradient-to-r from-cyan-600 via-stone-700 to-rose-500 bg-clip-text text-transparent dark:from-cyan-300 dark:via-vellum dark:to-magenta-400">Arya</span></h1>' +
      '<p class="mt-6 max-w-xl text-base font-light leading-relaxed text-stone-600 dark:text-vellum/75 sm:mt-8 sm:text-lg md:text-xl">Software Engineer - Product </p>' +
      '<div class="mt-8 flex flex-wrap gap-3 sm:mt-12">' +
      '<button type="button" data-go="7" class="cover-cta-primary rounded-full border border-stone-800/15 bg-stone-900 px-5 py-3 font-mono text-xs uppercase tracking-[0.2em] text-cream shadow-editorial transition hover:bg-stone-800 sm:px-8 sm:py-3.5 dark:border-cyan-500/40 dark:bg-cyan-500/10 dark:text-cyan-100 dark:hover:bg-cyan-500/25">Let\u2019s connect</button>' +
      '<a href="devyani_arya_res_el.pdf" download class="cover-cta-secondary rounded-full border border-stone-300/80 px-5 py-3 font-mono text-xs uppercase tracking-[0.2em] text-stone-700 transition hover:border-cyan-600/40 hover:bg-white/80 sm:px-8 sm:py-3.5 dark:border-white/15 dark:text-vellum/80 dark:hover:border-cyan-400/45 dark:hover:bg-white/5">R\u00e9sum\u00e9 PDF</a>' +
      '</div>' +
      // '<p class="mt-10 max-w-md font-mono text-[0.55rem] leading-relaxed text-stone-400 dark:text-vellum/35 sm:mt-16">Pages loop seamlessly. Sound can be muted \u2014 top right.</p>' +
      '</header>',

    about:
      '<section class="flex min-h-0 flex-col">' +
      '<p class="font-mono text-[0.6rem] uppercase tracking-[0.35em] text-cyan-700 dark:text-cyan-400/75">About</p>' +
      '<h2 class="mt-4 font-display text-3xl font-medium italic text-inklight dark:text-vellum sm:text-4xl md:text-5xl">About me</h2>' +
      '<div class="mt-6 space-y-5 text-[0.95rem] leading-[1.85] text-stone-700 dark:text-vellum/80 sm:mt-10 sm:space-y-6 sm:text-base sm:leading-[1.95] md:max-w-3xl md:text-lg">' +
      '<p>I\u2019m someone who enjoys <strong class="text-inklight dark:text-vellum">building things</strong> \u2014 whether it\u2019s a backend system, a data pipeline, or something requiring machine learning. I like creating things that genuinely function and make sense. I enjoy figuring out how several components work together to create something straightforward, effective, and dependable.</p>' +
      '<p>The majority of my work is situated in the nexus between <strong class="text-inklight dark:text-vellum">data and software</strong>. Instead of merely choosing the first workable option, I spend a lot of time trying, refining systems, and coming up with new approaches to address problems.</p>' +
      '<p>Writing clear, well-considered code and creating systems that are both functional and <strong class="text-inklight dark:text-vellum">well-designed under the hood</strong> are important to me. I approach whatever I do with the mindset that I\u2019m constantly learning and improving.</p>' +
      '</div></section>',

    experience:
      '<section class="flex min-h-0 flex-1 flex-col overflow-hidden">' +
      '<p class="font-mono text-[0.6rem] uppercase tracking-[0.35em] text-rose-600 dark:text-magenta-400/75">Experience</p>' +
      '<h2 class="mt-4 shrink-0 font-display text-3xl font-medium italic text-inklight dark:text-vellum sm:text-4xl md:text-5xl">Career</h2>' +
      // '<p class="mt-3 shrink-0 max-w-xl text-sm text-stone-500 dark:text-vellum/50">Scroll inside this folio \u2014 additional roles stack below.</p>' +
      '<div class="experience-scroll mt-8 min-h-0 flex-1 space-y-6 overflow-y-auto">' +
      '<article class="experience-card rounded-2xl border border-cyan-500/20 bg-gradient-to-br from-stone-50/90 to-cream/70 p-6 shadow-sm dark:border-white/10 dark:from-plum/40 dark:to-void/80 md:p-8">' +
      '<div class="flex flex-wrap items-start justify-between gap-4">' +
      '<div><h3 class="font-display text-2xl italic text-inklight dark:text-vellum">Data Curation &amp; Fine-tuning Engineer</h3><p class="mt-1 font-mono text-sm text-stone-600 dark:text-vellum/60">OutcomesAI \u00b7 Bengaluru</p></div>' +
      '<span class="rounded-full border border-cyan-500/25 bg-cyan-500/8 px-3 py-1 font-mono text-[0.6rem] text-cyan-700 dark:border-cyan-400/25 dark:bg-cyan-400/10 dark:text-cyan-300/90">2025 \u2014 Present</span></div>' +
      '<div class="mt-6 h-px w-full overflow-hidden bg-stone-200/80 dark:bg-white/8"><div class="pipeline-shimmer h-full w-full"></div></div>' +
      '<ul class="mt-7 space-y-3 text-[0.95rem] leading-relaxed text-stone-700 dark:text-vellum/82">' +
      '<li class="flex gap-3"><span class="mt-[2px] text-cyan-600 dark:text-cyan-400/75">\u25c6</span><span>Built OCR pipelines with <strong>LLaMA &amp; Gemini</strong> for high-accuracy medical recommendation extraction.</span></li>' +
      '<li class="flex gap-3"><span class="mt-[2px] text-cyan-600 dark:text-cyan-400/75">\u25c6</span><span>Shipped <strong>RAG</strong> retrieval on Milvus + SBERT with RAPTOR-style context assembly.</span></li>' +
      '<li class="flex gap-3"><span class="mt-[2px] text-cyan-600 dark:text-cyan-400/75">\u25c6</span><span>Integrated with <strong>AthenaHealth &amp; Epic</strong> via <strong>FHIR R2 / HL7</strong> clinical standards.</span></li>' +
      '<li class="flex gap-3"><span class="mt-[2px] text-cyan-600 dark:text-cyan-400/75">\u25c6</span><span>Fine-tuned <strong>Phi-4</strong> and optimized service latency using <strong>gRPC</strong>.</span></li>' +
      '</ul>' +
      '<p class="mt-6 font-mono text-[0.55rem] text-stone-500 dark:text-vellum/40">Python \u00b7 PyTorch \u00b7 Hugging Face \u00b7 Go \u00b7 Redis \u00b7 Grafana \u00b7 Docker</p>' +
      '</article>' +
      '<article class="experience-card rounded-2xl border border-cyan-500/20 bg-gradient-to-br from-stone-50/90 to-cream/70 p-6 shadow-sm dark:border-white/10 dark:from-plum/40 dark:to-void/80 md:p-8">' +
      '<div class="flex flex-wrap items-start justify-between gap-4">' +
      '<div><h3 class="font-display text-2xl italic text-inklight dark:text-vellum">Machine Learning Intern</h3><p class="mt-1 font-mono text-sm text-stone-600 dark:text-vellum/60">Alcyone Technologies \u00b7 Indore</p></div>' +
      '<span class="rounded-full border border-cyan-500/25 bg-cyan-500/8 px-3 py-1 font-mono text-[0.6rem] text-cyan-700 dark:border-cyan-400/25 dark:bg-cyan-400/10 dark:text-cyan-300/90">2023</span></div>' +
      '<div class="mt-6 h-px w-full overflow-hidden bg-stone-200/80 dark:bg-white/8"><div class="pipeline-shimmer h-full w-full"></div></div>' +
      '<ul class="mt-7 space-y-3 text-[0.95rem] leading-relaxed text-stone-700 dark:text-vellum/82">' +
      '<li class="flex gap-3"><span class="mt-[2px] text-cyan-600 dark:text-cyan-400/75">\u25c6</span><span>Developed multi-source ML data pipelines with <strong>Pandas</strong> and <strong>Scikit-learn</strong>.</span></li>' +
      '<li class="flex gap-3"><span class="mt-[2px] text-cyan-600 dark:text-cyan-400/75">\u25c6</span><span>Built <strong>XGBoost</strong> classification workflows and evaluation dashboards.</span></li>' +
      '<li class="flex gap-3"><span class="mt-[2px] text-cyan-600 dark:text-cyan-400/75">\u25c6</span><span>Documented reproducible experiments, metrics, and deployment-ready reports.</span></li>' +
      '</ul>' +
      '<p class="mt-6 font-mono text-[0.55rem] text-stone-500 dark:text-vellum/40">Python \u00b7 Scikit-learn \u00b7 XGBoost \u00b7 NumPy \u00b7 Pandas</p>' +
      '</article>' +
      '</div></section>',

    projects:
      '<section class="projects-section">' +
      '<p class="font-mono text-[0.6rem] uppercase tracking-[0.35em] text-cyan-700 dark:text-cyan-400/75">Projects</p>' +
      '<h2 class="mt-4 font-display text-3xl font-medium italic text-inklight dark:text-vellum sm:text-4xl md:text-5xl">Artifacts</h2>' +
      '<div class="projects-grid mt-6 sm:mt-10">' +
      '<a href="https://github.com/devyani08/milvus-raptor-indexing-RAG" target="_blank" rel="noopener noreferrer" class="project-card group">' +
      '<div class="project-card-inner">' +
      '<p class="project-card-kicker">Flagship \u00b7 RAG</p>' +
      '<h3 class="project-card-title">Context-RAG</h3>' +
      '<p class="project-card-description">Medical corpora Q&amp;A.</p>' +
      '<p class="project-card-stack">Milvus \u00b7 SBERT \u00b7 BM25 \u00b7 RAPTOR \u00b7 Mixtral \u00b7 Streamlit</p>' +
      '</div></a>' +
      '<a href="https://github.com/devyani08/Web-kit" target="_blank" rel="noopener noreferrer" class="project-card group">' +
      '<div class="project-card-inner">' +
      '<p class="project-card-kicker">Tooling</p>' +
      '<h3 class="project-card-title">WEBKIT</h3>' +
      '<p class="project-card-description">React scaffolding automation.</p>' +
      '<p class="project-card-stack">Python \u00b7 Tkinter \u00b7 HTML \u00b7 CSS \u00b7 JS \u00b7 React</p>' +
      '</div></a>' +
      '<a href="https://github.com/devyani08/note-taking-app" target="_blank" rel="noopener noreferrer" class="project-card group">' +
      '<div class="project-card-inner">' +
      '<p class="project-card-kicker">Product</p>' +
      '<h3 class="project-card-title">Fenix Potion</h3>' +
      '<p class="project-card-description">Hierarchical notes taking app with PDF export.</p>' +
      '<p class="project-card-stack">Python \u00b7 Streamlit \u00b7 Markdown \u00b7 Notes</p>' +
      '</div></a>' +
      '</div></section>',

    skills:
      '<section class="relative flex min-h-0 flex-1 flex-col overflow-hidden">' +
      '<div class="pointer-events-none relative z-10 max-w-xl">' +
      '<p class="font-mono text-[0.6rem] uppercase tracking-[0.35em] text-rose-600 dark:text-magenta-400/75">Skills</p>' +
      '<h2 class="mt-4 font-display text-3xl font-medium italic text-inklight dark:text-vellum sm:text-4xl md:text-5xl">Skills globe</h2>' +
      '</div>' +
      '<div class="absolute inset-0">' +
      '<canvas id="skillsCanvas" class="h-full w-full cursor-grab active:cursor-grabbing"></canvas>' +
      '</div></section>',

    github:
      '<section class="flex min-h-0 flex-1 flex-col">' +
      '<p class="font-mono text-[0.6rem] uppercase tracking-[0.35em] text-cyan-700 dark:text-cyan-400/75">GitHub</p>' +
      '<h2 class="mt-4 font-display text-3xl font-medium italic text-inklight dark:text-vellum sm:text-4xl md:text-5xl">Contributions</h2>' +
      '<p class="mt-3 max-w-2xl text-sm text-stone-600 dark:text-vellum/55">Live contribution tiles from <a class="underline decoration-cyan-500/35" href="https://github.com/devyani089" target="_blank" rel="noopener noreferrer">devyani089</a>.</p>' +
      '<div class="mt-5 rounded-2xl border border-stone-200/70 bg-white/75 p-3 sm:mt-8 sm:p-4 dark:border-white/10 dark:bg-void/45 md:p-6">' +
      '<div class="mb-4 flex flex-wrap items-center justify-between gap-3">' +
      '<p id="github-total" class="font-mono text-xs text-stone-500 dark:text-vellum/55">Loading contribution totals...</p>' +
      '<a href="https://github.com/devyani089" target="_blank" rel="noopener noreferrer" class="font-mono text-xs uppercase tracking-[0.2em] text-cyan-700 dark:text-cyan-300">View profile</a>' +
      '</div>' +
      '<div id="github-years" class="mb-3 flex flex-wrap gap-2"></div>' +
      '<div id="github-graph" class="overflow-hidden rounded-xl border border-stone-200/60 p-3 dark:border-white/10" style="background:var(--gh-surface)"><p class="py-6 text-center font-mono text-xs text-stone-500 dark:text-vellum/45">Loading tiles...</p></div>' +
      '<div class="mt-4 flex items-center justify-end gap-2 font-mono text-[0.58rem] uppercase tracking-[0.16em] text-stone-500 dark:text-vellum/45">' +
      '<span>Less</span>' +
      '<span class="h-3 w-3 rounded-[2px]" style="background:var(--gh-tile-0);border:1px solid var(--gh-tile-stroke)"></span>' +
      '<span class="h-3 w-3 rounded-[2px]" style="background:var(--gh-tile-1);border:1px solid var(--gh-tile-stroke)"></span>' +
      '<span class="h-3 w-3 rounded-[2px]" style="background:var(--gh-tile-2);border:1px solid var(--gh-tile-stroke)"></span>' +
      '<span class="h-3 w-3 rounded-[2px]" style="background:var(--gh-tile-3);border:1px solid var(--gh-tile-stroke)"></span>' +
      '<span class="h-3 w-3 rounded-[2px]" style="background:var(--gh-tile-4);border:1px solid var(--gh-tile-stroke)"></span>' +
      '<span>More</span>' +
      '</div>' +
      '</div></section>',

    education:
      '<section>' +
      '<p class="font-mono text-[0.6rem] uppercase tracking-[0.35em] text-cyan-700 dark:text-cyan-400/75">Education</p>' +
      '<h2 class="mt-4 font-display text-3xl font-medium italic text-inklight dark:text-vellum sm:text-4xl md:text-5xl">Foundation</h2>' +
      '<div class="mt-6 grid gap-4 sm:mt-10 sm:gap-6 md:grid-cols-2">' +
      '<div class="rounded-2xl border border-stone-200/80 bg-white/90 p-5 shadow-sm sm:p-8 dark:border-white/10 dark:bg-ink/70">' +
      '<p class="font-mono text-[0.55rem] text-rose-600 dark:text-magenta-400/80">In progress</p>' +
      '<h3 class="mt-2 font-display text-xl italic sm:text-2xl">M.Sc. Mathematics</h3>' +
      '<p class="mt-2 text-sm text-stone-600 dark:text-vellum/65 sm:text-base">Rabindranath Tagore University \u00b7 Bhopal</p>' +
      '<p class="mt-3 font-mono text-[0.6rem] text-stone-500 dark:text-vellum/40 sm:mt-4">2024 \u2014 2026</p></div>' +
      '<div class="rounded-2xl border border-stone-200/80 bg-white/90 p-5 shadow-sm sm:p-8 dark:border-white/10 dark:bg-ink/70">' +
      '<p class="font-mono text-[0.55rem] text-cyan-700 dark:text-cyan-400/80">B.Tech \u00b7 CSE</p>' +
      '<h3 class="mt-2 font-display text-xl italic sm:text-2xl">Computer Science &amp; Engineering</h3>' +
      '<p class="mt-2 text-sm text-stone-600 dark:text-vellum/65 sm:text-base">Truba Institute of Engineering and IT \u00b7 Bhopal</p>' +
      '<p class="mt-3 font-mono text-[0.6rem] text-stone-500 dark:text-vellum/40 sm:mt-4">2020 \u2014 2024 \u00b7 CGPA 8.35 / 10</p></div></div>' +
      '</section>',

    connect:
      '<section class="flex min-h-0 flex-1 flex-col">' +
      '<p class="font-mono text-[0.6rem] uppercase tracking-[0.35em] text-rose-600 dark:text-magenta-400/75">Contact for work</p>' +
      '<h2 class="mt-4 font-display text-3xl font-medium italic text-inklight dark:text-vellum sm:text-4xl md:text-5xl">Let\u2019s connect</h2>' +
      '<p class="mt-4 max-w-2xl text-sm text-stone-600 dark:text-vellum/75 sm:mt-6 sm:text-base">I partner on healthcare AI, RAG architecture, LLM programs, and products that require both rigor and taste. If that resonates, send a note.</p>' +
      '<form id="workForm" class="mt-6 max-w-lg space-y-4 sm:mt-10 sm:space-y-5">' +
      '<input type="hidden" name="access_key" value="2e6951be-fc65-443a-b2b1-e1c6478b0bdd" />' +
      '<input type="hidden" name="subject" value="Portfolio Inquiry" />' +
      '<input type="hidden" name="from_name" value="Portfolio Contact Form" />' +
      '<div class="hidden"><input type="checkbox" name="botcheck" /></div>' +
      '<div><label class="font-mono text-[0.55rem] uppercase tracking-wider text-stone-500 dark:text-vellum/50" for="wfName">Name</label><input id="wfName" name="name" type="text" required class="mt-2 w-full rounded-xl border border-stone-200/90 bg-white px-4 py-3 text-inklight placeholder:text-stone-400 focus:border-cyan-500/50 focus:outline-none focus:ring-1 focus:ring-cyan-500/30 dark:border-white/15 dark:bg-void/60 dark:text-vellum dark:placeholder:text-vellum/35" placeholder="Your name" /></div>' +
      '<div><label class="font-mono text-[0.55rem] uppercase tracking-wider text-stone-500 dark:text-vellum/50" for="wfEmail">Email</label><input id="wfEmail" name="email" type="email" required class="mt-2 w-full rounded-xl border border-stone-200/90 bg-white px-4 py-3 text-inklight focus:border-cyan-500/50 focus:outline-none focus:ring-1 focus:ring-cyan-500/30 dark:border-white/15 dark:bg-void/60 dark:text-vellum" placeholder="you@domain.com" /></div>' +
      '<div><label class="font-mono text-[0.55rem] uppercase tracking-wider text-stone-500 dark:text-vellum/50" for="wfMsg">Message</label><textarea id="wfMsg" name="message" rows="4" required class="mt-2 w-full resize-none rounded-xl border border-stone-200/90 bg-white px-4 py-3 text-inklight focus:border-cyan-500/50 focus:outline-none focus:ring-1 focus:ring-cyan-500/30 dark:border-white/15 dark:bg-void/60 dark:text-vellum" placeholder="Role, timeline, what you are building\u2026"></textarea></div>' +
      '<button type="submit" id="wfSubmit" class="magnetic w-full rounded-full border border-stone-900 bg-stone-900 py-3.5 font-mono text-xs uppercase tracking-[0.2em] text-cream transition hover:bg-stone-800 dark:border-cyan-500/40 dark:bg-cyan-500/20 dark:text-cyan-100 dark:hover:bg-cyan-500/30">Send inquiry</button>' +
      '<p id="wfStatus" class="mt-3 px-4 py-2 font-mono text-xs flex items-center gap-2" style="display:none;opacity:0;transition:opacity 0.4s ease"></p>' +
      '</form>' +
      '<div class="mt-6 flex flex-wrap items-center gap-3 border-t border-stone-200/80 pt-6 sm:mt-10 sm:pt-8 dark:border-white/10">' +
      '<a href="mailto:devyaniarya77@gmail.com" class="flex h-10 w-10 items-center justify-center rounded-full border border-stone-200/80 bg-white/90 text-stone-700 transition hover:border-cyan-500/35 hover:text-cyan-700 dark:border-white/15 dark:bg-ink/70 dark:text-vellum/70 dark:hover:border-cyan-400/35 dark:hover:text-cyan-300" aria-label="Email"><svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/></svg></a>' +
      '<a href="https://github.com/devyani089" target="_blank" rel="noopener noreferrer" class="flex h-10 w-10 items-center justify-center rounded-full border border-stone-200/80 bg-white/90 text-stone-700 transition hover:border-cyan-500/35 hover:text-cyan-700 dark:border-white/15 dark:bg-ink/70 dark:text-vellum/70 dark:hover:border-cyan-400/35 dark:hover:text-cyan-300" aria-label="GitHub"><svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor"><path d="M12 .5A11.5 11.5 0 0 0 .5 12.2c0 5.2 3.3 9.6 8 11.2.6.1.8-.2.8-.6v-2.1c-3.3.8-4-1.4-4-1.4-.5-1.4-1.3-1.8-1.3-1.8-1-.7.1-.7.1-.7 1.1.1 1.8 1.2 1.8 1.2 1 1.8 2.7 1.3 3.4 1 .1-.8.4-1.3.8-1.6-2.7-.3-5.5-1.4-5.5-6 0-1.3.5-2.4 1.2-3.2-.1-.3-.5-1.5.1-3.2 0 0 1-.3 3.3 1.2 1-.3 2-.4 3-.4s2 .1 3 .4c2.3-1.5 3.3-1.2 3.3-1.2.7 1.7.3 2.9.1 3.2.8.8 1.2 1.9 1.2 3.2 0 4.6-2.8 5.7-5.5 6 .4.4.8 1.1.8 2.2v3.2c0 .3.2.7.8.6a11.5 11.5 0 0 0 8-11.2A11.5 11.5 0 0 0 12 .5z"/></svg></a>' +
      '<a href="https://linkedin.com/in/devyani-arya-4a8500210/" target="_blank" rel="noopener noreferrer" class="flex h-10 w-10 items-center justify-center rounded-full border border-stone-200/80 bg-white/90 text-stone-700 transition hover:border-cyan-500/35 hover:text-cyan-700 dark:border-white/15 dark:bg-ink/70 dark:text-vellum/70 dark:hover:border-cyan-400/35 dark:hover:text-cyan-300" aria-label="LinkedIn"><svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor"><path d="M20.45 20.45H16.9v-5.57c0-1.33 0-3.04-1.85-3.04s-2.14 1.45-2.14 2.94v5.67H9.36V9h3.4v1.56h.05c.47-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43A2.06 2.06 0 1 1 5.34 3.3a2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45z"/></svg></a>' +
      '<a href="https://x.com/TheCorruptFile" target="_blank" rel="noopener noreferrer" class="flex h-10 w-10 items-center justify-center rounded-full border border-stone-200/80 bg-white/90 text-stone-700 transition hover:border-cyan-500/35 hover:text-cyan-700 dark:border-white/15 dark:bg-ink/70 dark:text-vellum/70 dark:hover:border-cyan-400/35 dark:hover:text-cyan-300" aria-label="X / Twitter"><svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg></a>' +
      '</div></section>',

    colophon:
      '<section class="flex min-h-[40vh] flex-col justify-end">' +
      '<p class="font-mono text-[0.6rem] uppercase tracking-[0.35em] text-stone-500 dark:text-vellum/45">Colophon</p>' +
      '<p class="mt-6 font-display text-3xl italic text-inklight dark:text-vellum/90"> </p>' +
      '<p class="mt-4 font-mono text-[0.65rem] uppercase tracking-[0.45em] text-cyan-700 dark:text-cyan-500/50">Printed in the Neural Cloud</p>' +
      '<p class="mt-6 text-sm text-stone-600 dark:text-vellum/55">Bengaluru \u00b7 India</p>' +
      '<p class="mt-8 font-mono text-[0.55rem] text-stone-400 dark:text-vellum/30">\u00a9 2026 Devyani Arya</p>' +
      '</section>'
  };

  var LOBEHUB_CDN = 'https://cdn.jsdelivr.net/npm/@lobehub/icons-static-png@latest/dark';
  var NODE_ICON_1 = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 80 80' fill='none' stroke='%23C2A06B' stroke-width='3'%3E%3Ccircle cx='24' cy='24' r='12'/%3E%3Ccircle cx='56' cy='56' r='12'/%3E%3Cline x1='33' y1='33' x2='47' y2='47'/%3E%3C/svg%3E";
  var NODE_ICON_2 = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 80 80' fill='none' stroke='%235F727E' stroke-width='3'%3E%3Ccircle cx='20' cy='40' r='12'/%3E%3Ccircle cx='60' cy='40' r='16'/%3E%3Cline x1='32' y1='40' x2='44' y2='40'/%3E%3C/svg%3E";
  var GLOBE_SKILLS = [
    { name: 'Python', slug: 'python', color: '#3776AB' },
    { name: 'Go', slug: 'go', color: '#00ADD8' },
    { name: 'PyTorch', slug: 'pytorch', color: '#EE4C2C' },
    { name: 'Hugging Face', slug: 'huggingface', color: '#FFD21E', iconUrl: LOBEHUB_CDN + '/huggingface-color.png' },
    { name: 'Gemini', slug: 'googlegemini', color: '#4285F4' },
    { name: 'Milvus', slug: 'milvus', color: '#00B8A9' },
    { name: 'LangChain', slug: 'langchain', color: '#1C3C3C' },
    { name: 'PostgreSQL', slug: 'postgresql', color: '#4169E1' },
    { name: 'Redis', slug: 'redis', color: '#DC382D' },
    { name: 'MongoDB', slug: 'mongodb', color: '#47A248' },
    { name: 'Elasticsearch', slug: 'elasticsearch', color: '#005571' },
    { name: 'Docker', slug: 'docker', color: '#2496ED' },
    { name: 'AWS', slug: 'aws', color: '#FF9900', iconUrl: LOBEHUB_CDN + '/aws.png' },
    { name: 'Kafka', slug: 'apachekafka', color: '#FFFFFF' },
    { name: 'gRPC', slug: 'grpc', color: '#4285F4' },
    { name: 'Git', slug: 'git', color: '#F05032' },
    { name: 'RAG / RAPTOR', slug: '', color: '#C2A06B', iconUrl: NODE_ICON_1 },
    { name: 'FHIR / HL7', slug: '', color: '#C2A06B', iconUrl: NODE_ICON_2 }
  ];

  var stack = document.getElementById('stack');
  var tpl = document.getElementById('tPage');
  var ribbon = document.getElementById('ribbon');
  var pgLabel = document.getElementById('pgLabel');
  var skillsThree = { scene: null, renderer: null, camera: null, planets: [], globe: null, anim: 0, ro: null, active: false };
  var githubLoaded = false;
  var flipAudioPool = [];

  function releaseFlipLock() {
    isFlipping = false;
    flipLockAt = 0;
    if (flipWatchdog) {
      clearTimeout(flipWatchdog);
      flipWatchdog = 0;
    }
  }

  function build() {
    PAGES.forEach(function (p, i) {
      var frag = tpl.content.cloneNode(true);
      var sheet = frag.querySelector('.page-sheet');
      sheet.dataset.i = String(i);
      sheet.style.zIndex = String(20 + i);
      frag.querySelector('.page-inner').innerHTML = CONTENT[p.id];
      stack.appendChild(frag);
    });
    PAGES.forEach(function (p, i) {
      var b = document.createElement('button');
      b.type = 'button';
      b.className = 'flex w-full items-baseline justify-between gap-2 rounded-md px-2 py-2.5 text-left text-stone-600 transition hover:bg-stone-200/60 hover:text-cyan-800 dark:text-vellum/70 dark:hover:bg-white/5 dark:hover:text-cyan-200';
      b.innerHTML = '<span>' + p.label + '</span><span class="tabular-nums text-cyan-700 dark:text-cyan-400/80">' + p.roman + '</span>';
      b.addEventListener('click', function () { go(i); closeToc(); });
      document.getElementById('tocNav').appendChild(b);
    });
    var wf = document.getElementById('workForm');
    if (wf) {
      wf.addEventListener('submit', function (e) {
        e.preventDefault();
        var btn = document.getElementById('wfSubmit');
        var status = document.getElementById('wfStatus');
        if (!btn || !status) return;

        btn.disabled = true;
        btn.textContent = 'Sending...';
        status.style.display = 'none';
        status.style.opacity = '0';

        function showStatus(html, borderClass) {
          status.innerHTML = html;
          status.className = 'mt-3 px-4 py-2 font-mono text-xs flex items-center gap-2 ' + borderClass;
          status.style.display = 'flex';
          requestAnimationFrame(function () {
            requestAnimationFrame(function () { status.style.opacity = '1'; });
          });
          setTimeout(function () {
            status.style.opacity = '0';
            setTimeout(function () { status.style.display = 'none'; }, 400);
          }, 3000);
        }

        var formData = new FormData(wf);

        fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          body: formData
        })
          .then(function (r) { return r.json(); })
          .then(function (data) {
            if (data.success) {
              showStatus(
                '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"/></svg>' +
                '<span>Message sent, thank you!</span>',
                'text-cyan-700 dark:text-cyan-300'
              );
              wf.reset();
            } else {
              throw new Error(data.message || 'Submission failed');
            }
          })
          .catch(function () {
            showStatus(
              '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 8v4M12 16h.01"/></svg>' +
              '<span>Something went wrong. Please try again or email directly.</span>',
              'text-rose-700 dark:text-rose-300'
            );
          })
          .finally(function () {
            btn.disabled = false;
            btn.textContent = 'Send inquiry';
          });
      });
    }
  }

  function sheets() { return stack.querySelectorAll('.page-sheet'); }

  function layout() {
    sheets().forEach(function (el, i) {
      el.style.position = 'absolute';
      el.style.inset = '0';
      var on = i === idx;
      el.style.transform = on ? 'rotateY(0deg) translateZ(0)' : i < idx ? 'rotateY(-92deg) translateZ(-20px)' : 'rotateY(92deg) translateZ(-20px)';
      el.style.opacity = on ? '1' : '0';
      el.style.pointerEvents = on ? 'auto' : 'none';
      el.setAttribute('aria-hidden', on ? 'false' : 'true');
    });
  }

  function wrap(n) {
    var L = PAGES.length;
    if (n < 0) return L - 1;
    if (n >= L) return 0;
    return n;
  }

  function ensureFlipAudio() {
    if (flipAudioPool.length) return;
    for (var i = 0; i < 3; i++) {
      var a = new Audio('./page-flip.mp3');
      a.preload = 'auto';
      a.volume = 0.5;
      flipAudioPool.push(a);
    }
  }

  function playFlipSound() {
    if (reduced || !soundOn) return;
    try {
      ensureFlipAudio();
      var a = flipAudioPool.find(function (el) { return el.paused || el.ended; }) || flipAudioPool[0];
      a.currentTime = 0;
      a.play();
    } catch (e) {}
  }

  function buildPath(from, to) {
    var L = PAGES.length;
    var fwd = (to - from + L) % L;
    var back = (from - to + L) % L;
    var steps = [];
    var cur = from;
    if (fwd <= back) {
      while (cur !== to) {
        var next = (cur + 1) % L;
        steps.push({ from: cur, to: next });
        cur = next;
      }
    } else {
      while (cur !== to) {
        var prev = (cur - 1 + L) % L;
        steps.push({ from: cur, to: prev });
        cur = prev;
      }
    }
    return steps;
  }

  function flipDir(from, to) {
    var L = PAGES.length;
    return to === (from + 1) % L ? 1 : -1;
  }

  function runFlipSteps(steps, i, speed) {
    var S = sheets();
    var pace = speed || { out: 0.58, inn: 0.72, finalOut: 0.58, finalInn: 0.72 };
    if (i >= steps.length) {
      syncRest();
      if (S[idx]) S[idx].style.pointerEvents = 'auto';
      updateUi();
      setDynamicPageActive();
      releaseFlipLock();
      return;
    }
    var step = steps[i];
    var from = step.from;
    var to = step.to;
    var isLast = i === steps.length - 1;
    if (idx !== from) {
      idx = from;
      layout();
    }
    var outEl = S[from];
    var inEl = S[to];
    if (!outEl || !inEl) {
      idx = to;
      layout();
      runFlipSteps(steps, i + 1, pace);
      return;
    }
    var dir = flipDir(from, to);
    try {
      playFlipSound();
      inEl.style.pointerEvents = 'none';
      if (!window.gsap) {
        idx = to;
        layout();
        runFlipSteps(steps, i + 1, pace);
        return;
      }
      gsap.timeline({
        onComplete: function () {
          idx = to;
          syncRest();
          if (isLast) {
            inEl.style.pointerEvents = 'auto';
            updateUi();
            setDynamicPageActive();
            releaseFlipLock();
          } else {
            runFlipSteps(steps, i + 1, pace);
          }
        }
      })
        .to(outEl, { duration: isLast ? pace.finalOut : pace.out, rotateY: dir * -88, opacity: 0.08, ease: 'power2.in', filter: 'brightness(0.65)' })
        .set(outEl, { rotateY: dir * -92, opacity: 0 })
        .add(function () { outEl.style.pointerEvents = 'none'; })
        .fromTo(inEl, { rotateY: dir * 88, opacity: 0, filter: 'brightness(1.08)' }, { duration: isLast ? pace.finalInn : pace.inn, rotateY: 0, opacity: 1, filter: 'brightness(1)', ease: 'power3.out' });
    } catch (err) {
      idx = to;
      layout();
      updateUi();
      setDynamicPageActive();
      releaseFlipLock();
    }
  }

  function go(n) {
    if (isFlipping && Date.now() - flipLockAt < 2200) return;
    if (isFlipping && Date.now() - flipLockAt >= 2200) releaseFlipLock();
    var target = wrap(n);
    if (target === idx) return;
    var steps = buildPath(idx, target);
    if (!steps.length) return;
    isFlipping = true;
    flipLockAt = Date.now();
    if (reduced || !window.gsap) {
      idx = target;
      playFlipSound();
      layout();
      updateUi();
      setDynamicPageActive();
      releaseFlipLock();
      return;
    }
    var jump = steps.length;
    var pace;
    if (jump >= 3) {
      pace = {
        out: 0.12,
        inn: 0.16,
        finalOut: 0.2,
        finalInn: 0.28
      };
    } else if (jump === 2) {
      pace = {
        out: 0.28,
        inn: 0.34,
        finalOut: 0.34,
        finalInn: 0.42
      };
    } else {
      pace = {
        out: 0.58,
        inn: 0.72,
        finalOut: 0.58,
        finalInn: 0.72
      };
    }
    var expectedMs = Math.ceil((((jump - 1) * (pace.out + pace.inn)) + (pace.finalOut + pace.finalInn)) * 1000) + 900;
    flipWatchdog = setTimeout(function () {
      releaseFlipLock();
    }, Math.max(2200, expectedMs));
    sheets().forEach(function (el) { el.style.pointerEvents = 'none'; });
    runFlipSteps(steps, 0, pace);
  }

  function syncRest() {
    if (!window.gsap) return;
    sheets().forEach(function (el, i) {
      if (i === idx) return;
      gsap.set(el, { rotateY: i < idx ? -92 : 92, opacity: 0 });
      el.style.pointerEvents = 'none';
    });
  }

  function updateUi() {
    ribbon.style.height = ((idx + 1) / PAGES.length) * 100 + '%';
    pgLabel.textContent = PAGES[idx].label;
    document.title = PAGES[idx].label + ' —  ';
  }

  function initNetCanvas() {
    var c = document.getElementById('netCanvas');
    if (!c || reduced) return;
    var ctx = c.getContext('2d');
    var w, h, nodes = [], time = 0;
    var COUNT = Math.min(70, Math.floor(innerWidth / 18));
    var CONN = 180;
    function size() {
      w = c.width = innerWidth;
      h = c.height = innerHeight;
      if (nodes.length) return;
      for (var i = 0; i < COUNT; i++) {
        nodes.push({
          x: Math.random() * w, y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.28,
          vy: (Math.random() - 0.5) * 0.28,
          r: 1.2 + Math.random() * 1.5,
          phase: Math.random() * Math.PI * 2
        });
      }
    }
    size();
    addEventListener('resize', function () { w = c.width = innerWidth; h = c.height = innerHeight; });
    function loop() {
      time += 0.012;
      ctx.clearRect(0, 0, w, h);
      var light = document.documentElement.getAttribute('data-theme') === 'light';
      nodes.forEach(function (n) {
        n.x += n.vx; n.y += n.vy;
        if (n.x < -20) n.x = w + 20;
        if (n.x > w + 20) n.x = -20;
        if (n.y < -20) n.y = h + 20;
        if (n.y > h + 20) n.y = -20;
      });
      for (var i = 0; i < nodes.length; i++) {
        for (var j = i + 1; j < nodes.length; j++) {
          var dx = nodes[i].x - nodes[j].x, dy = nodes[i].y - nodes[j].y;
          var d = Math.sqrt(dx * dx + dy * dy);
          if (d < CONN) {
            var a = (1 - d / CONN) * (light ? 0.18 : 0.14);
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = light
              ? 'rgba(78,95,105,' + a + ')'
              : 'rgba(194,160,107,' + a + ')';
            ctx.lineWidth = 0.7;
            ctx.stroke();
          }
        }
      }
      for (var k = 0; k < nodes.length; k++) {
        var nd = nodes[k];
        var pulse = 0.5 + 0.5 * Math.sin(time * 1.8 + nd.phase);
        var radius = nd.r * (0.6 + 0.4 * pulse);
        if (light) {
          ctx.fillStyle = 'rgba(78,95,105,' + (0.35 * pulse) + ')';
          ctx.shadowColor = 'rgba(78,95,105,0.2)';
          ctx.shadowBlur = 4;
        } else {
          ctx.fillStyle = 'rgba(194,160,107,' + (0.5 * pulse) + ')';
          ctx.shadowColor = 'rgba(194,160,107,0.4)';
          ctx.shadowBlur = 8;
        }
        ctx.beginPath();
        ctx.arc(nd.x, nd.y, radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      }
      requestAnimationFrame(loop);
    }
    loop();
  }

  function initFloatCanvas() {
    var c = document.getElementById('floatCanvas');
    if (!c || reduced) return;
    var ctx = c.getContext('2d');
    var w, h, orbs = [], time = 0;
    var ORB_COUNT = Math.min(30, Math.floor(innerWidth / 50));
    function size() {
      w = c.width = innerWidth;
      h = c.height = innerHeight;
      if (orbs.length) return;
      for (var i = 0; i < ORB_COUNT; i++) {
        orbs.push({
          x: Math.random() * w, y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.15,
          vy: -0.08 - Math.random() * 0.18,
          r: 2 + Math.random() * 4,
          phase: Math.random() * Math.PI * 2,
          drift: 0.3 + Math.random() * 0.7
        });
      }
    }
    size();
    addEventListener('resize', function () { w = c.width = innerWidth; h = c.height = innerHeight; });
    function loop() {
      time += 0.008;
      ctx.clearRect(0, 0, w, h);
      var light = document.documentElement.getAttribute('data-theme') === 'light';
      for (var i = 0; i < orbs.length; i++) {
        var o = orbs[i];
        o.x += o.vx + Math.sin(time * 0.7 + o.phase) * o.drift * 0.15;
        o.y += o.vy;
        if (o.y < -30) { o.y = h + 30; o.x = Math.random() * w; }
        if (o.x < -30) o.x = w + 30;
        if (o.x > w + 30) o.x = -30;
        var pulse = 0.4 + 0.6 * Math.sin(time * 1.2 + o.phase);
        var r = o.r * (0.7 + 0.3 * pulse);
        var grad = ctx.createRadialGradient(o.x, o.y, 0, o.x, o.y, r * 3);
        if (light) {
          grad.addColorStop(0, 'rgba(78,95,105,' + (0.2 * pulse) + ')');
          grad.addColorStop(0.5, 'rgba(95,114,126,' + (0.08 * pulse) + ')');
          grad.addColorStop(1, 'rgba(95,114,126,0)');
        } else {
          grad.addColorStop(0, 'rgba(194,160,107,' + (0.35 * pulse) + ')');
          grad.addColorStop(0.5, 'rgba(111,131,142,' + (0.14 * pulse) + ')');
          grad.addColorStop(1, 'rgba(194,160,107,0)');
        }
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(o.x, o.y, r * 3.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = light
          ? 'rgba(78,95,105,' + (0.4 * pulse) + ')'
          : 'rgba(241,234,226,' + (0.55 * pulse) + ')';
        ctx.beginPath();
        ctx.arc(o.x, o.y, r * 0.4, 0, Math.PI * 2);
        ctx.fill();
      }
      requestAnimationFrame(loop);
    }
    loop();
  }

  function ambientLines() {
    if (reduced) return;
    var host = document.getElementById('ambient');
    var lines = [
      'retrieve(q) \u2192 embed \u00b7 corpus', 'P(y|x) \u221d exp(\u2212L)',
      'FHIR :: Patient', 'loss = \u2212\u03a3 y log \u0177',
      'embed \u2192 index \u2192 retrieve', '\u2207\u03b8 L(\u03b8)',
      'attention(Q,K,V)', 'f(x) = Wx + b'
    ];
    for (var i = 0; i < 8; i++) {
      var p = document.createElement('div');
      p.className = 'ambient-line';
      p.textContent = lines[i % lines.length];
      p.style.left = Math.random() * 80 + '%';
      p.style.top = Math.random() * 85 + '%';
      p.style.animationDelay = (i * 3.5) + 's';
      p.style.animationDuration = (22 + Math.random() * 14) + 's';
      host.appendChild(p);
    }
  }

  function magneticInit() {
    if (reduced) return;
    document.querySelectorAll('.magnetic').forEach(function (btn) {
      if (btn.dataset.magBound) return;
      btn.dataset.magBound = '1';
      btn.addEventListener('mousemove', function (e) {
        var r = btn.getBoundingClientRect();
        btn.style.transform = 'translate(' + ((e.clientX - r.left - r.width / 2) * 0.1) + 'px,' + ((e.clientY - r.top - r.height / 2) * 0.1) + 'px)';
      });
      btn.addEventListener('mouseleave', function () { btn.style.transform = ''; });
    });
  }

  function initSkillsThree() {
    var canvas = document.getElementById('skillsCanvas');
    if (!canvas || !window.THREE || reduced) return;
    if (skillsThree.cleanup) skillsThree.cleanup();
    var container = canvas.parentElement;
    if (!container) return;
    var tip = document.getElementById('skillTooltip');
    if (tip) {
      tip.classList.remove('vis');
      tip.hidden = true;
    }
    var mode = document.documentElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
    var theme = mode === 'light'
      ? {
        sphere1: '#3D342C',
        sphere2: '#434E57',
        sphere3: '#54493F',
        glow1: [0.94, 0.89, 0.82],
        glow2: [0.83, 0.87, 0.90],
        ring1: '#2E2A24',
        ring2: '#38434B',
        ring3: '#4A4138',
        ringOpacity: [0.22, 0.18, 0.14],
        particles: ['#4A4138', '#49535D', '#5A5148', '#6D5F54', '#231B17'],
        label: '#231B17',
        spriteBlend: THREE.NormalBlending,
        particleBlend: THREE.NormalBlending
      }
      : {
        sphere1: '#C2A06B',
        sphere2: '#6F838E',
        sphere3: '#C2A06B',
        glow1: [0.12, 0.08, 0.25],
        glow2: [0.04, 0.15, 0.22],
        ring1: '#C2A06B',
        ring2: '#6F838E',
        ring3: '#C2A06B',
        ringOpacity: [0.18, 0.12, 0.1],
        particles: ['#C2A06B', '#6F838E', '#B6AAA0', '#3A3138', '#FBF5EE'],
        label: '#F1EAE2',
        spriteBlend: THREE.AdditiveBlending,
        particleBlend: THREE.AdditiveBlending
      };

    var W = container.clientWidth;
    var H = container.clientHeight || 550;
    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(45, W / H, 1, 1000);
    camera.position.z = 300;

    var renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true });
    renderer.setSize(W, H, false);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    var group = new THREE.Group();
    scene.add(group);

    var sphereGeo = new THREE.IcosahedronGeometry(90, 2);
    var sphereMat = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uColor1: { value: new THREE.Color(theme.sphere1) },
        uColor2: { value: new THREE.Color(theme.sphere2) },
        uColor3: { value: new THREE.Color(theme.sphere3) }
      },
      vertexShader: 'varying vec3 vPosition; void main() { vPosition = position; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }',
      fragmentShader: 'uniform float uTime; uniform vec3 uColor1; uniform vec3 uColor2; uniform vec3 uColor3; varying vec3 vPosition; void main() { float t = sin(uTime * 0.5 + vPosition.y * 0.02) * 0.5 + 0.5; vec3 color = mix(uColor1, uColor2, t); color = mix(color, uColor3, sin(uTime * 0.3 + vPosition.x * 0.015) * 0.5 + 0.5); gl_FragColor = vec4(color, 0.15); }',
      wireframe: true,
      transparent: true,
      depthWrite: false
    });
    group.add(new THREE.Mesh(sphereGeo, sphereMat));

    var glowGeo = new THREE.SphereGeometry(60, 32, 32);
    var glowMat = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uGlow1: { value: new THREE.Vector3(theme.glow1[0], theme.glow1[1], theme.glow1[2]) },
        uGlow2: { value: new THREE.Vector3(theme.glow2[0], theme.glow2[1], theme.glow2[2]) }
      },
      vertexShader: 'varying vec3 vNormal; void main() { vNormal = normalize(normalMatrix * normal); gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }',
      fragmentShader: 'uniform float uTime; uniform vec3 uGlow1; uniform vec3 uGlow2; varying vec3 vNormal; void main() { float intensity = pow(0.85 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 4.0); vec3 color = mix(uGlow1, uGlow2, sin(uTime * 0.4) * 0.5 + 0.5); gl_FragColor = vec4(color, intensity * 0.12); }',
      transparent: true,
      depthWrite: false,
      side: THREE.BackSide
    });
    group.add(new THREE.Mesh(glowGeo, glowMat));

    function addRing(radius, rotX, rotY, color, opacity) {
      var ringGeo = new THREE.TorusGeometry(radius, 0.3, 8, 120);
      var ringMat = new THREE.MeshBasicMaterial({ color: new THREE.Color(color), transparent: true, opacity: opacity });
      var ring = new THREE.Mesh(ringGeo, ringMat);
      ring.rotation.x = rotX;
      ring.rotation.y = rotY;
      group.add(ring);
      return ring;
    }
    var ring1 = addRing(105, Math.PI / 2, 0, theme.ring1, theme.ringOpacity[0]);
    var ring2 = addRing(108, Math.PI / 3, Math.PI / 6, theme.ring2, theme.ringOpacity[1]);
    var ring3 = addRing(102, -Math.PI / 4, Math.PI / 3, theme.ring3, theme.ringOpacity[2]);

    var particleCount = 200;
    var particleGeo = new THREE.BufferGeometry();
    var particlePositions = new Float32Array(particleCount * 3);
    var particleColors = new Float32Array(particleCount * 3);
    var palette = theme.particles.map(function (hex) { return new THREE.Color(hex); });
    for (var i = 0; i < particleCount; i++) {
      var phi = Math.random() * Math.PI * 2;
      var theta = Math.random() * Math.PI;
      var r = 80 + Math.random() * 80;
      particlePositions[i * 3] = r * Math.sin(theta) * Math.cos(phi);
      particlePositions[i * 3 + 1] = r * Math.sin(theta) * Math.sin(phi);
      particlePositions[i * 3 + 2] = r * Math.cos(theta);
      var c = palette[Math.floor(Math.random() * palette.length)];
      particleColors[i * 3] = c.r;
      particleColors[i * 3 + 1] = c.g;
      particleColors[i * 3 + 2] = c.b;
    }
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    particleGeo.setAttribute('color', new THREE.BufferAttribute(particleColors, 3));
    var particleMat = new THREE.PointsMaterial({
      size: 1.5,
      transparent: true,
      opacity: 0.6,
      vertexColors: true,
      depthWrite: false,
      blending: theme.particleBlend
    });
    var particles = new THREE.Points(particleGeo, particleMat);
    group.add(particles);

    var N = GLOBE_SKILLS.length;
    var RADIUS = 100;
    var goldenAngle = Math.PI * (3 - Math.sqrt(5));
    var positions = GLOBE_SKILLS.map(function (_, iPos) {
      var y = 1 - (iPos / (N - 1)) * 2;
      var rr = Math.sqrt(1 - y * y);
      var theta = goldenAngle * iPos;
      return new THREE.Vector3(
        Math.cos(theta) * rr * RADIUS,
        y * RADIUS,
        Math.sin(theta) * rr * RADIUS
      );
    });

    function createSprite(skill, pos) {
      var size = 160;
      var c = document.createElement('canvas');
      c.width = size;
      c.height = size + 32;
      var ctx = c.getContext('2d');
      var texture = new THREE.CanvasTexture(c);
      var mat = new THREE.SpriteMaterial({
        map: texture,
        transparent: true,
        depthWrite: false,
        blending: theme.spriteBlend
      });
      var sprite = new THREE.Sprite(mat);
      sprite.position.copy(pos);
      sprite.scale.set(32, 38.4, 1);
      group.add(sprite);

      function renderLabel() {
        var f = 18;
        ctx.font = '600 ' + f + 'px ui-monospace, "SF Mono", Menlo, Consolas, monospace';
        while (ctx.measureText(skill.name).width > size && f > 12) {
          f--;
          ctx.font = '600 ' + f + 'px ui-monospace, "SF Mono", Menlo, Consolas, monospace';
        }
        ctx.fillStyle = theme.label;
        ctx.textAlign = 'center';
        ctx.fillText(skill.name, size / 2, size + 16);
      }

      var img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = function () {
        ctx.drawImage(img, (size - 80) / 2, 8, 80, 80);
        renderLabel();
        texture.needsUpdate = true;
      };
      img.onerror = function () {
        ctx.fillStyle = skill.color;
        ctx.font = 'bold 48px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(skill.name.charAt(0), size / 2, size / 2 + 16);
        renderLabel();
        texture.needsUpdate = true;
      };
      img.src = skill.iconUrl || 'https://cdn.simpleicons.org/' + skill.slug + '/' + skill.color.replace('#', '');
    }

    GLOBE_SKILLS.forEach(function (skill, idxSkill) { createSprite(skill, positions[idxSkill]); });

    var isDragging = false;
    var prevMouse = { x: 0, y: 0 };
    var rotVelocity = { x: 0.003, y: 0.005 };
    var onPointerDown = function (e) {
      isDragging = true;
      prevMouse = { x: e.clientX, y: e.clientY };
      canvas.style.cursor = 'grabbing';
    };
    canvas.addEventListener('pointerdown', onPointerDown);
    var onPointerMove = function (e) {
      if (!isDragging) return;
      var dx = e.clientX - prevMouse.x;
      var dy = e.clientY - prevMouse.y;
      rotVelocity.y = dx * 0.002;
      rotVelocity.x = dy * 0.002;
      prevMouse = { x: e.clientX, y: e.clientY };
    };
    var onPointerUp = function () {
      isDragging = false;
      canvas.style.cursor = 'grab';
    };
    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);
    canvas.style.cursor = 'grab';

    var clock = new THREE.Clock();
    function tick() {
      if (!skillsThree.active) return;
      skillsThree.anim = requestAnimationFrame(tick);
      var elapsed = clock.getElapsedTime();
      sphereMat.uniforms.uTime.value = elapsed;
      glowMat.uniforms.uTime.value = elapsed;
      if (mode === 'light') {
        ring1.material.color.setHSL((elapsed * 0.03 + 0.09) % 1, 0.42, 0.32);
        ring2.material.color.setHSL((elapsed * 0.03 + 0.22) % 1, 0.44, 0.34);
        ring3.material.color.setHSL((elapsed * 0.03 + 0.35) % 1, 0.44, 0.36);
        particleMat.opacity = 0.3 + Math.sin(elapsed * 1.5) * 0.1;
      } else {
        ring1.material.color.setHSL((elapsed * 0.05) % 1, 0.7, 0.6);
        ring2.material.color.setHSL((elapsed * 0.05 + 0.33) % 1, 0.7, 0.6);
        ring3.material.color.setHSL((elapsed * 0.05 + 0.66) % 1, 0.7, 0.6);
        particleMat.opacity = 0.4 + Math.sin(elapsed * 1.5) * 0.2;
      }
      if (!isDragging) {
        rotVelocity.x += (0.001 - rotVelocity.x) * 0.02;
        rotVelocity.y += (0.003 - rotVelocity.y) * 0.02;
      }
      group.rotation.x += rotVelocity.x;
      group.rotation.y += rotVelocity.y;
      group.children.forEach(function (child) {
        if (child.isSprite) {
          var worldPos = new THREE.Vector3();
          child.getWorldPosition(worldPos);
          var dist = worldPos.distanceTo(camera.position);
          var scale = THREE.MathUtils.mapLinear(dist, 200, 400, 1.1, 0.6);
          child.material.opacity = THREE.MathUtils.mapLinear(dist, 200, 400, 1, 0.3);
          child.scale.set(28 * scale, 32 * scale, 1);
        }
      });
      renderer.render(scene, camera);
    }

    function resize() {
      var w = container.clientWidth;
      var h = container.clientHeight || 550;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h, false);
    }

    skillsThree.scene = scene;
    skillsThree.camera = camera;
    skillsThree.renderer = renderer;
    skillsThree.globe = group;
    skillsThree.ro = new ResizeObserver(resize);
    skillsThree.ro.observe(container);
    skillsThree.cleanup = function () {
      skillsThree.active = false;
      if (skillsThree.anim) cancelAnimationFrame(skillsThree.anim);
      if (skillsThree.ro) skillsThree.ro.disconnect();
      canvas.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
      if (renderer) renderer.dispose();
    };
    resize();

    function start() {
      if (skillsThree.anim) cancelAnimationFrame(skillsThree.anim);
      skillsThree.active = true;
      tick();
    }
    function stop() {
      skillsThree.active = false;
      if (skillsThree.anim) cancelAnimationFrame(skillsThree.anim);
    }
    skillsThree.start = start;
    skillsThree.stop = stop;
  }

  function initGithubContributions() {
    if (githubLoaded) return;
    var container = document.getElementById('github-graph');
    var totalEl = document.getElementById('github-total');
    if (!container || !totalEl) return;
    githubLoaded = true;
    fetch('https://github-contributions-api.jogruber.de/v4/devyani089')
      .then(function (r) { return r.json(); })
      .then(function (data) {
        var points = Array.isArray(data.contributions) ? data.contributions : [];
        if (!points.length) throw new Error('no-data');
        var yearsEl = document.getElementById('github-years');
        var byYear = {};
        points.forEach(function (p) {
          var y = String(p.date).slice(0, 4);
          if (!byYear[y]) byYear[y] = [];
          byYear[y].push(p);
        });
        var years = Object.keys(byYear).sort(function (a, b) { return Number(b) - Number(a); });
        if (!years.length) throw new Error('no-year-data');
        var nowYear = String(new Date().getFullYear());
        var activeYear = byYear[nowYear] ? nowYear : years[0];

        function paintYearButtons() {
          if (!yearsEl) return;
          Array.prototype.forEach.call(yearsEl.querySelectorAll('button[data-year]'), function (btn) {
            var on = btn.getAttribute('data-year') === activeYear;
            btn.style.cssText = on
              ? 'border-color:var(--gh-tile-4);background:var(--gh-tile-4);color:var(--theme-bg);'
              : 'border-color:var(--border-subtle);background:transparent;color:var(--text-muted);';
          });
        }

        function renderYear(yearKey) {
          var tileData = (byYear[yearKey] || []).slice().sort(function (a, b) {
            return new Date(a.date) - new Date(b.date);
          });
          if (!tileData.length) return;
          var total = tileData.reduce(function (sum, p) { return sum + (Number(p.count) || 0); }, 0);
          totalEl.innerHTML = '<strong>' + total.toLocaleString() + '</strong> contributions in ' + yearKey;

          var first = new Date(yearKey + '-01-01T00:00:00Z');
          var padding = first.getUTCDay();
          var totalCols = Math.ceil((padding + tileData.length) / 7);
          var maxW = Math.max(container.clientWidth - 8, 220);
          var gap = maxW < 420 ? 1.5 : 3;
          var cell = (maxW - (totalCols - 1) * gap) / totalCols;
          if (cell < 2) {
            gap = 1;
            cell = (maxW - (totalCols - 1) * gap) / totalCols;
          }
          cell = Number(Math.max(1, cell).toFixed(2));

          var monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
          var monthStarts = [];
          var cur = -1;
          tileData.forEach(function (p, i) {
            var m = parseInt(p.date.slice(5, 7), 10) - 1;
            if (m !== cur) {
              cur = m;
              monthStarts.push({ name: monthNames[m], col: Math.floor((i + padding) / 7) });
            }
          });

          var labels = document.createElement('div');
          labels.style.cssText = 'display:grid;grid-template-columns:repeat(' + totalCols + ',' + cell + 'px);gap:' + gap + 'px;margin-bottom:6px;font-family:"IBM Plex Mono",monospace;font-size:0.62rem;color:var(--text-muted);';
          for (var c = 0; c < totalCols; c++) {
            var lab = document.createElement('div');
            var entry = monthStarts.find(function (m) { return m.col === c; });
            if (entry) lab.textContent = entry.name;
            labels.appendChild(lab);
          }

          var grid = document.createElement('div');
          grid.style.cssText = 'display:grid;grid-template-rows:repeat(7,' + cell + 'px);grid-template-columns:repeat(' + totalCols + ',' + cell + 'px);grid-auto-flow:column;gap:' + gap + 'px;';
          for (var pi = 0; pi < padding; pi++) grid.appendChild(document.createElement('div'));
          tileData.forEach(function (p) {
            var count = Number(p.count || 0);
            var level = 0;
            if (count > 0 && count <= 2) level = 1;
            else if (count > 2 && count <= 5) level = 2;
            else if (count > 5 && count <= 9) level = 3;
            else if (count > 9) level = 4;
            var tile = document.createElement('div');
            tile.style.cssText = 'box-sizing:border-box;border-radius:2px;background:var(--gh-tile-' + level + ');box-shadow:inset 0 0 0 1px var(--gh-tile-stroke);';
            tile.title = count + ' contributions on ' + p.date;
            grid.appendChild(tile);
          });

          container.innerHTML = '';
          var wrap = document.createElement('div');
          wrap.style.cssText = 'width:100%;';
          wrap.appendChild(labels);
          wrap.appendChild(grid);
          container.appendChild(wrap);
        }

        if (yearsEl) {
          yearsEl.innerHTML = '';
          years.forEach(function (y) {
            var btn = document.createElement('button');
            btn.type = 'button';
            btn.setAttribute('data-year', y);
            btn.className = 'rounded-full border px-3 py-1 font-mono text-[0.62rem] uppercase tracking-[0.14em] transition';
            btn.textContent = y;
            btn.addEventListener('click', function () {
              activeYear = y;
              renderYear(activeYear);
              paintYearButtons();
            });
            yearsEl.appendChild(btn);
          });
        }

        renderYear(activeYear);
        paintYearButtons();
        window.addEventListener('resize', function () { renderYear(activeYear); });
      })
      .catch(function () {
        totalEl.textContent = 'Contribution data unavailable right now.';
        container.innerHTML = '<p class="py-6 text-center font-mono text-xs text-stone-500 dark:text-vellum/45">Could not load contribution tiles.</p>';
      });
  }

  function setDynamicPageActive() {
    var si = PAGES.map(function (p) { return p.id; }).indexOf('skills');
    var gi = PAGES.map(function (p) { return p.id; }).indexOf('github');
    if (skillsThree.start) {
      if (idx === si) skillsThree.start();
      else skillsThree.stop();
    }
    if (idx === gi) initGithubContributions();
  }

  var tocEl = document.getElementById('toc');
  var tocBtn = document.getElementById('tocToggle');
  function closeToc() {
    if (matchMedia('(max-width:767px)').matches) {
      tocEl.classList.add('-translate-x-full');
      tocBtn.setAttribute('aria-expanded', 'false');
    }
  }
  tocBtn.addEventListener('click', function () {
    var open = tocEl.classList.toggle('-translate-x-full');
    tocBtn.setAttribute('aria-expanded', open ? 'false' : 'true');
  });

  function applyTheme(light) {
    var root = document.documentElement;
    if (light) {
      root.setAttribute('data-theme', 'light');
      root.classList.remove('dark');
      document.getElementById('iconSun').classList.add('hidden');
      document.getElementById('iconMoon').classList.remove('hidden');
    } else {
      root.removeAttribute('data-theme');
      root.classList.add('dark');
      document.getElementById('iconSun').classList.remove('hidden');
      document.getElementById('iconMoon').classList.add('hidden');
    }
    try { localStorage.setItem('codexTheme', light ? 'light' : 'dark'); } catch (e) {}
    var si = PAGES.map(function (p) { return p.id; }).indexOf('skills');
    if (idx === si && document.getElementById('skillsCanvas')) {
      initSkillsThree();
      if (skillsThree.start) skillsThree.start();
    }
  }
  document.getElementById('themeToggle').addEventListener('click', function () {
    applyTheme(!document.documentElement.getAttribute('data-theme'));
  });
  try {
    if (localStorage.getItem('codexTheme') === 'light') applyTheme(true);
    else applyTheme(false);
  } catch (e) {
    applyTheme(false);
  }

  document.getElementById('soundBtn').addEventListener('click', function () {
    soundOn = !soundOn;
    this.setAttribute('aria-pressed', soundOn ? 'true' : 'false');
    this.setAttribute('aria-label', soundOn ? 'Page turn sound on' : 'Page turn sound off');
    this.textContent = soundOn ? '\u266a' : '\u00f8';
  });

  document.getElementById('prev').addEventListener('click', function () { go(idx - 1); });
  document.getElementById('next').addEventListener('click', function () { go(idx + 1); });
  addEventListener('keydown', function (e) {
    if (e.key === 'ArrowRight' || e.key === 'PageDown') { e.preventDefault(); go(idx + 1); }
    if (e.key === 'ArrowLeft' || e.key === 'PageUp') { e.preventDefault(); go(idx - 1); }
  });
  (function initSwipe() {
    var sx = 0, sy = 0;
    stack.addEventListener('touchstart', function (e) {
      var t = e.touches[0];
      sx = t.clientX; sy = t.clientY;
    }, { passive: true });
    stack.addEventListener('touchend', function (e) {
      var t = e.changedTouches[0];
      var dx = t.clientX - sx, dy = t.clientY - sy;
      if (Math.abs(dx) < 50 || Math.abs(dy) > Math.abs(dx) * 0.6) return;
      if (dx < 0) go(idx + 1);
      else go(idx - 1);
    }, { passive: true });
  })();
  document.addEventListener('click', function (e) {
    var t = e.target;
    if (t && t.getAttribute && t.getAttribute('data-go')) go(parseInt(t.getAttribute('data-go'), 10));
    if (!audioUnlocked) {
      audioUnlocked = true;
      try {
        ensureFlipAudio();
        flipAudioPool.forEach(function (a) { a.load(); });
      } catch (err) {}
    }
  });

  var codexPanel = document.getElementById('codexPanel');
  var codexFab = document.getElementById('codexFab');
  var codexInput = document.getElementById('codexQ');
  var codexAnswer = document.getElementById('codexA');

  function openCodex() {
    codexPanel.classList.remove('hidden');
    codexPanel.classList.add('flex');
    codexFab.setAttribute('aria-expanded', 'true');
    setTimeout(function () { codexInput.focus(); }, 80);
  }
  function closeCodex() {
    codexPanel.classList.add('hidden');
    codexPanel.classList.remove('flex');
    codexFab.setAttribute('aria-expanded', 'false');
  }

  document.getElementById('codexClose').addEventListener('click', closeCodex);
  codexFab.addEventListener('click', function () {
    if (codexPanel.classList.contains('hidden')) openCodex();
    else closeCodex();
  });

  var FAQ = [
    { k: ['work', 'outcomes', 'job', 'company'], a: 'She engineers data curation and model fine-tuning at OutcomesAI in Bengaluru \u2014 RAG, OCR, and clinical integrations.' },
    { k: ['rag', 'context', 'retrieval'], a: 'Context-RAG: hybrid retrieval over medical textbooks with Milvus, SBERT, BM25, and RAPTOR-class indexing.' },
    { k: ['webkit'], a: 'WEBKIT automates React project scaffolding \u2014 faster setup with Python and Tkinter.' },
    { k: ['phi', 'llm', 'fine', 'model', 'ai'], a: 'She fine-tunes Phi-4 and works across LLaMA-class stacks and Gemini in production paths.' },
    { k: ['fhir', 'hl7', 'epic', 'health', 'clinical', 'medical'], a: 'FHIR R2 and HL7 for AthenaHealth and Epic \u2014 production interoperability.' },
    { k: ['email', 'contact', 'reach', 'hire', 'connect'], a: 'devyaniarya77@gmail.com \u2014 open to selective connections.' },
    { k: ['skill', 'stack', 'tech', 'language', 'tool'], a: 'Python, Go, PyTorch, Hugging Face, Milvus, LangChain, Docker, Redis, PostgreSQL, gRPC, AWS, and more.' },
    { k: ['education', 'degree', 'university', 'college'], a: 'B.Tech in CSE from Truba Institute (CGPA 8.35) and M.Sc. Mathematics in progress at Rabindranath Tagore University.' },
    { k: ['project', 'fenix', 'potion', 'note'], a: 'Fenix Potion: a hierarchical note-taking app with PDF export, built with Python and Streamlit.' },
    { k: ['who', 'about', 'intro', 'tell'], a: 'Devyani Arya \u2014 Software Engineer & AI Product innovator specializing in healthcare AI, RAG, and LLM fine-tuning at OutcomesAI, Bengaluru.' },
    { k: ['experience', 'intern', 'alcyone'], a: 'ML Intern at Alcyone Technologies (2023) \u2014 built data pipelines with Pandas, Scikit-learn, and XGBoost.' },
    { k: ['github', 'contribution', 'repo'], a: 'Active on GitHub at github.com/devyani089 \u2014 contributions across AI/ML and tooling projects.' },
    { k: ['resume', 'cv', 'pdf'], a: 'Download the resume PDF from the cover page or via the "R\u00e9sum\u00e9 PDF" button.' }
  ];

  function answerCodex() {
    var q = (codexInput.value || '').toLowerCase().trim();
    if (!q) {
      codexAnswer.textContent = 'Type a question first \u2014 try "What does she do?" or "RAG experience".';
      return;
    }
    var ans = '';
    outer: for (var i = 0; i < FAQ.length; i++) {
      for (var j = 0; j < FAQ[i].k.length; j++) {
        if (q.indexOf(FAQ[i].k[j]) !== -1) { ans = FAQ[i].a; break outer; }
      }
    }
    if (!ans) ans = 'No match found. Try: RAG, skills, education, FHIR, projects, contact, or "who is she?"';
    codexAnswer.textContent = ans;
  }

  document.getElementById('codexAsk').addEventListener('click', answerCodex);
  codexInput.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') { e.preventDefault(); answerCodex(); }
  });

  function finishLoader(done) {
    var loader = document.getElementById('pageLoader');
    var pctEl = document.getElementById('loaderPct');
    if (!loader || !pctEl) {
      done();
      return;
    }
    if (reduced) {
      pctEl.textContent = '100%';
      loader.classList.add('done');
      loader.setAttribute('aria-busy', 'false');
      done();
      return;
    }
    var p = 0;
    function tick() {
      p += Math.random() * 22 + 7;
      if (p > 100) p = 100;
      pctEl.textContent = String(Math.floor(p)).padStart(2, '0') + '%';
      if (p < 100) {
        setTimeout(tick, 32 + Math.random() * 48);
      } else {
        setTimeout(function () {
          loader.classList.add('done');
          loader.setAttribute('aria-busy', 'false');
          setTimeout(done, 720);
        }, 120);
      }
    }
    tick();
  }

  build();
  layout();
  updateUi();
  ambientLines();
  requestAnimationFrame(magneticInit);

  finishLoader(function () {
    if (window.gsap && !reduced) {
      gsap.set(sheets(), { transformPerspective: 1600 });
      gsap.fromTo(sheets()[0], { rotateY: 85, opacity: 0 }, { duration: 1, rotateY: 0, opacity: 1, ease: 'power3.out' });
      syncRest();
    }
    initNetCanvas();
    initFloatCanvas();
    initSkillsThree();
    setDynamicPageActive();
  });

  document.addEventListener('visibilitychange', function () {
    if (document.hidden && skillsThree.stop) skillsThree.stop();
    else setDynamicPageActive();
  });
})();
