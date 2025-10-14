// Theme Switcher for Main and Reddit Designs

class ThemeSwitcher {
  constructor() {
    this.currentTheme = 'main';
    this.lucideLoaded = false;
    this.globalListenerAttached = false;
    this.pageType = this.detectPageType();
  }

  // Detect page type (home, blog, blog-post)
  detectPageType() {
    const path = window.location.pathname;
    if (path.includes('/blog/') && !path.endsWith('/blog/') && !path.endsWith('/blog/index.html')) {
      return 'blog-post';
    } else if (path.includes('/blog')) {
      return 'blog';
    }
    return 'home';
  }

  // Initialize theme on page load
  async initTheme() {
    // Load saved theme from localStorage
    const savedTheme = localStorage.getItem('selectedTheme') || 'main';
    this.currentTheme = savedTheme;

    // Apply the saved theme
    if (savedTheme === 'reddit') {
      await this.switchTheme('reddit', false);
    }

    // Add event delegation listener to body (works even after DOM changes)
    this.attachGlobalListener();
    
    // Also update dropdown value
    setTimeout(() => this.updateDropdownValue(), 100);
  }

  // Load Lucide icons script dynamically
  loadLucideIcons() {
    return new Promise((resolve, reject) => {
      // Check if already loaded
      if (this.lucideLoaded || window.lucide) {
        this.lucideLoaded = true;
        resolve();
        return;
      }

      // Create script element
      const script = document.createElement('script');
      script.src = 'https://unpkg.com/lucide@latest';
      script.onload = () => {
        this.lucideLoaded = true;
        resolve();
      };
      script.onerror = reject;
      document.head.appendChild(script);
    });
  }

  // Initialize Lucide icons
  initLucideIcons() {
    if (window.lucide) {
      window.lucide.createIcons();
    }
  }

  // Switch between themes
  async switchTheme(themeName, saveToStorage = true) {
    this.currentTheme = themeName;

    // Update CSS file using ID
    const cssLink = document.getElementById('theme-stylesheet');
    if (cssLink) {
      if (themeName === 'reddit') {
        cssLink.href = './css/reddit-theme.css';
      } else {
        cssLink.href = './css/main.css';
      }
    }

    // Update header
    const header = document.querySelector('header');
    if (themeName === 'reddit') {
      // Load Lucide icons first
      await this.loadLucideIcons();
      
      header.className = 'professional-header modern-header';
      header.innerHTML = ThemeTemplates.redditHeader;
      
      // Initialize Lucide icons for header
      setTimeout(() => this.initLucideIcons(), 50);
    } else {
      header.className = 'sticky top-0 z-50 bg-[#293CA6] bg-gradient-to-r from-[#293CA6] to-[#3854A6] text-white shadow-lg';
      header.innerHTML = ThemeTemplates.mainHeader;
    }

    // Update hero/title section
    const mainContent = document.querySelector('main.Page');
    if (!mainContent) return;
    
    // Remove existing animated background if present
    const existingBg = document.querySelector('.animated-background');
    if (existingBg) {
      existingBg.remove();
    }

    // Find and replace hero section
    const heroSection = mainContent.querySelector('.text-center.py-8.mb-6, .text-center.py-8.mb-8');
    const modernHero = mainContent.querySelector('.modern-hero');
    const seoSection = mainContent.querySelector('article.mb-8.text-center');
    
    if (themeName === 'reddit') {
      // Remove main theme sections first
      if (heroSection) heroSection.remove();
      if (seoSection) seoSection.remove();
      if (modernHero) modernHero.remove();
      
      // Choose correct template based on page type
      let heroTemplate;
      if (this.pageType === 'blog' || this.pageType === 'blog-post') {
        heroTemplate = ThemeTemplates.blogRedditHero;
      } else {
        heroTemplate = ThemeTemplates.redditHero;
      }
      
      // Create temporary container to parse HTML
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = heroTemplate;
      
      // Insert animated background before main
      const animatedBg = tempDiv.querySelector('.animated-background');
      if (animatedBg) {
        mainContent.parentNode.insertBefore(animatedBg, mainContent);
      }
      
      // Insert hero section at the beginning of main
      const heroElement = tempDiv.querySelector('.modern-hero');
      if (heroElement) {
        mainContent.insertBefore(heroElement, mainContent.firstChild);
      }
      
      // Initialize Lucide icons for hero section
      setTimeout(() => this.initLucideIcons(), 150);
    } else {
      // Remove reddit theme sections first
      if (modernHero) modernHero.remove();
      if (heroSection) heroSection.remove();
      if (seoSection) seoSection.remove();
      
      // Choose correct template based on page type
      let heroTemplate;
      if (this.pageType === 'blog' || this.pageType === 'blog-post') {
        heroTemplate = ThemeTemplates.blogMainHero;
      } else {
        heroTemplate = ThemeTemplates.mainHero;
      }
      
      // Insert main theme hero at the beginning of main
      mainContent.insertAdjacentHTML('afterbegin', heroTemplate);
    }

    // Update body data-theme attribute
    document.body.setAttribute('data-theme', themeName);

    // Update dropdown value after DOM changes
    setTimeout(() => this.updateDropdownValue(), 100);

    // Save to localStorage
    if (saveToStorage) {
      localStorage.setItem('selectedTheme', themeName);
    }

    // Track theme change
    if (typeof trackEvent === 'function') {
      trackEvent('theme_change', 'User Interaction', themeName);
    }
  }

  // Attach global event listener using event delegation
  attachGlobalListener() {
    if (this.globalListenerAttached) return;
    
    document.body.addEventListener('change', (e) => {
      if (e.target && e.target.id === 'themeDropdown') {
        this.switchTheme(e.target.value);
      }
    });
    
    this.globalListenerAttached = true;
  }
  
  // Update dropdown value to match current theme
  updateDropdownValue() {
    const dropdown = document.getElementById('themeDropdown');
    if (dropdown && dropdown.value !== this.currentTheme) {
      dropdown.value = this.currentTheme;
    }
  }
  
  // Attach event listener to dropdown (legacy, kept for compatibility)
  attachDropdownListener() {
    this.updateDropdownValue();
  }
}

// Initialize theme switcher when DOM is ready
const themeSwitcher = new ThemeSwitcher();

// Initialize immediately if DOM is already loaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    themeSwitcher.initTheme();
  });
} else {
  themeSwitcher.initTheme();
}

