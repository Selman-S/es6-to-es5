// Theme Switcher for Main and Reddit Designs

class ThemeSwitcher {
  constructor() {
    this.currentTheme = 'main';
    this.lucideLoaded = false;
  }

  // Initialize theme on page load
  initTheme() {
    // Load saved theme from localStorage
    const savedTheme = localStorage.getItem('selectedTheme') || 'main';
    this.currentTheme = savedTheme;

    // Apply the saved theme
    if (savedTheme === 'reddit') {
      this.switchTheme('reddit', false);
    } else {
      this.switchTheme('main', false);
    }

    // Add event listener to dropdown
    this.attachDropdownListener();
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

    // Update CSS file
    const cssLink = document.querySelector('link[href*="main.css"]');
    if (themeName === 'reddit') {
      cssLink.href = './css/reddit-theme.css';
    } else {
      cssLink.href = './css/main.css';
    }

    // Update header
    const header = document.querySelector('header');
    if (themeName === 'reddit') {
      header.className = 'professional-header modern-header';
      header.innerHTML = ThemeTemplates.redditHeader;
      
      // Load Lucide icons if not already loaded
      await this.loadLucideIcons();
      
      // Initialize Lucide icons
      setTimeout(() => this.initLucideIcons(), 100);
    } else {
      header.className = 'sticky top-0 z-50 bg-[#293CA6] bg-gradient-to-r from-[#293CA6] to-[#3854A6] text-white shadow-lg';
      header.innerHTML = ThemeTemplates.mainHeader;
    }

    // Update hero/title section
    const mainContent = document.querySelector('main.Page');
    
    // Remove existing animated background if present
    const existingBg = document.querySelector('.animated-background');
    if (existingBg) {
      existingBg.remove();
    }

    // Find and replace hero section
    const heroSection = mainContent.querySelector('.text-center.py-8.mb-6, .modern-hero');
    const seoSection = mainContent.querySelector('article.mb-8.text-center');
    
    if (themeName === 'reddit') {
      // Insert animated background before main
      mainContent.insertAdjacentHTML('beforebegin', ThemeTemplates.redditHero);
      
      // Remove main theme sections
      if (heroSection) heroSection.remove();
      if (seoSection) seoSection.remove();
      
      // Move animated background outside main
      const animatedBg = mainContent.querySelector('.animated-background');
      if (animatedBg) {
        mainContent.parentNode.insertBefore(animatedBg, mainContent);
      }
      
      // Initialize Lucide icons
      setTimeout(() => this.initLucideIcons(), 100);
    } else {
      // Remove reddit theme sections
      const modernHero = mainContent.querySelector('.modern-hero');
      if (modernHero) {
        modernHero.remove();
      }
      
      // Insert main theme hero at the beginning of main
      mainContent.insertAdjacentHTML('afterbegin', ThemeTemplates.mainHero);
    }

    // Reattach dropdown listener after DOM update
    setTimeout(() => this.attachDropdownListener(), 150);

    // Update dropdown selection
    const dropdown = document.getElementById('themeDropdown');
    if (dropdown) {
      dropdown.value = themeName;
    }

    // Save to localStorage
    if (saveToStorage) {
      localStorage.setItem('selectedTheme', themeName);
    }

    // Track theme change
    if (typeof trackEvent === 'function') {
      trackEvent('theme_change', 'User Interaction', themeName);
    }
  }

  // Attach event listener to dropdown
  attachDropdownListener() {
    const dropdown = document.getElementById('themeDropdown');
    if (dropdown) {
      // Remove existing listener to avoid duplicates
      dropdown.replaceWith(dropdown.cloneNode(true));
      const newDropdown = document.getElementById('themeDropdown');
      
      newDropdown.addEventListener('change', (e) => {
        this.switchTheme(e.target.value);
      });
    }
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

