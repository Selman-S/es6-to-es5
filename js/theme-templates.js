// Theme Templates for Main and Reddit Designs

const ThemeTemplates = {
  // Main Theme (Selman-dev) Header
  mainHeader: `
    <nav class="container mx-auto flex justify-between items-center p-4">
      <a href="/" class="text-xl font-semibold hover:text-blue-200 transition-colors">ES6→ES5</a>
      <div class="flex items-center space-x-6">
        <a href="/" class="hover:text-blue-200 transition-colors inline-flex items-center gap-1">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg>
          Home
        </a>
        <a href="/blog/" class="hover:text-blue-200 transition-colors inline-flex items-center gap-1">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path></svg>
          Blog
        </a>
        <a href="https://github.com/Selman-S" target="_blank" rel="noopener" class="hover:text-blue-200 transition-colors inline-flex items-center gap-1">
          <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path fill-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clip-rule="evenodd"></path></svg>
          GitHub
        </a>
        <div class="theme-selector">
          <select id="themeDropdown" class="theme-select">
            <option value="main">Main Design</option>
            <option value="reddit">Reddit Design</option>
          </select>
        </div>
      </div>
    </nav>
  `,

  // Reddit Theme Header
  redditHeader: `
    <div class="header-glow"></div>
    <div class="container mx-auto">
      <nav class="header-nav">
        <a href="/" class="header-logo modern-logo">
          <div class="logo-icon-wrapper">
            <i data-lucide="code-2" class="logo-icon"></i>
          </div>
          <div class="logo-text-wrapper">
            <span class="logo-brackets gradient-accent">{</span>
            <span class="logo-text gradient-text-header">ES6→ES5</span>
            <span class="logo-brackets gradient-accent">}</span>
          </div>
        </a>
        <div class="header-links">
          <a href="/" class="header-link modern-link active">
            <i data-lucide="home" class="link-icon"></i>
            <span>Home</span>
          </a>
          <a href="/blog/" class="header-link modern-link">
            <i data-lucide="book-open" class="link-icon"></i>
            <span>Blog</span>
          </a>
          <a href="https://github.com/Selman-S" target="_blank" rel="noopener" class="header-link modern-link">
            <i data-lucide="github" class="link-icon"></i>
            <span>GitHub</span>
          </a>
          <div class="theme-selector">
            <select id="themeDropdown" class="theme-select">
              <option value="main">Main Design</option>
              <option value="reddit">Reddit Design</option>
            </select>
          </div>
        </div>
      </nav>
    </div>
  `,

  // Main Theme Hero/Title Section
  mainHero: `
    <!-- Page Title Section -->
    <div class="text-center py-8 mb-6">
      <h1 class="text-4xl font-bold mb-3" style="color: var(--text-primary);">ES6 to ES5 Converter</h1>
      <p class="text-xl text-gray-600">Free Online JavaScript Transpiler & Minifier</p>
    </div>
    <!-- SEO Content Section -->
    <article class="mb-8 text-center">
      <h2 class="text-2xl font-semibold mb-4" style="color: var(--text-primary);">Convert Modern JavaScript to Compatible Code</h2>
      <p class="max-w-4xl mx-auto mb-6" style="color: var(--text-secondary);">
        Transform your ES6/ES2015+ JavaScript code to ES5 for maximum browser compatibility. 
        Our free online tool supports transpilation, minification, and deep minification with 
        advanced whitespace removal. Perfect for legacy browser support and code optimization.
      </p>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 max-w-3xl mx-auto">
        <div class="feature-card feature-card-green">
          <h3 class="font-semibold inline-flex items-center gap-2">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg>
            Transpile
          </h3>
          <p class="text-sm">Convert ES6+ to ES5</p>
        </div>
        <div class="feature-card feature-card-blue">
          <h3 class="font-semibold inline-flex items-center gap-2">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4"></path></svg>
            Minify
          </h3>
          <p class="text-sm">Reduce file size</p>
        </div>
        <div class="feature-card feature-card-purple">
          <h3 class="font-semibold inline-flex items-center gap-2">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
            Deep Clean
          </h3>
          <p class="text-sm">Ultimate compression</p>
        </div>
      </div>
    </article>
  `,

  // Reddit Theme Hero Section (includes both background and hero)
  redditHero: `
    <div class="animated-background">
      <div class="gradient-orb orb-1"></div>
      <div class="gradient-orb orb-2"></div>
      <div class="gradient-orb orb-3"></div>
    </div>
    <section class="modern-hero">
      <div class="hero-badge">
        <i data-lucide="sparkles" style="width: 14px; height: 14px;"></i>
        <span>Free & Privacy-First JavaScript Tool</span>
      </div>
      <h1 class="hero-title">
        <span class="gradient-text">ES6 to ES5</span>
        <span class="hero-subtitle-inline">Converter</span>
      </h1>
      <p class="hero-description">
        Transform modern JavaScript to ES5 instantly with our powerful transpiler.<br>
        <span class="hero-features">
          <i data-lucide="zap" class="inline-icon-sm"></i> Lightning Fast
          <span class="separator">•</span>
          <i data-lucide="shield" class="inline-icon-sm"></i> Browser Compatible
          <span class="separator">•</span>
          <i data-lucide="code-2" class="inline-icon-sm"></i> Production Ready
        </span>
      </p>
      <div class="hero-stats">
        <div class="stat-item">
          <div class="stat-number">100%</div>
          <div class="stat-label">Free Forever</div>
        </div>
        <div class="stat-divider"></div>
        <div class="stat-item">
          <div class="stat-number">0ms</div>
          <div class="stat-label">Setup Time</div>
        </div>
        <div class="stat-divider"></div>
        <div class="stat-item">
          <div class="stat-number">∞</div>
          <div class="stat-label">Conversions</div>
        </div>
      </div>
    </section>
  `
};

// Export for use in theme-switcher.js
if (typeof module !== 'undefined' && module.exports) {
  module.exports = ThemeTemplates;
}

