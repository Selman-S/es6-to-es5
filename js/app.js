

  var es6Editor = CodeMirror.fromTextArea(document.getElementById("text1"), { lineNumbers: true, mode: "javascript" })
  var es5Editor = CodeMirror.fromTextArea(document.getElementById("text2"), { lineNumbers: true, mode: "javascript" })
  var height = window.innerHeight * 0.60
  height = height > 200 ? height : 200
  es6Editor.setSize(undefined, height);
  es5Editor.setSize(undefined, height);

 
  // ES6 to ES5 conversion function
  convertBtn.onclick = function () {
    try {
      var code = es6Editor.doc.getValue()
      
      // Track ES6 to ES5 conversion
      if (typeof trackEvent === 'function') {
        trackEvent('es6_to_es5_conversion', 'Code Conversion', 'ES6 to ES5', code.length);
      }
      
      code = Babel.transform(code, { presets: ["env"] }).code

      es5Editor.doc.setValue(code)
      new Notify ({
        status: 'success',
        title: 'Code Converted',
        text: 'success',
        effect: 'slide',
        speed: 300,
        customClass: '',
        customIcon: '',
        showIcon: true,
        showCloseButton: true,
        autoclose: true,
        autotimeout: 2000,
        gap: 20,
        distance: 20,
        type: 1,
        position: 'left bottom'
      })

    } catch (error) {
      console.log(error);
       new Notify ({
        status: 'error',
        title: error.message,
        text: 'error',
        effect: 'slide',
        speed: 300,
        customClass: '',
        customIcon: '',
        showIcon: true,
        showCloseButton: true,
        autoclose: true,
        autotimeout: 5000,
        gap: 20,
        distance: 20,
        type: 1,
        position: 'left bottom'
      })
    }
  }

  // Minify function
  minifyBtn.onclick = async function () {
    try {
      var code = es6Editor.doc.getValue()
      
      // Check if code is empty
      if (!code.trim()) {
        new Notify ({
          status: 'warning',
          title: 'No Code to Minify',
          text: 'Please enter some code first',
          effect: 'slide',
          speed: 300,
          customClass: '',
          customIcon: '',
          showIcon: true,
          showCloseButton: true,
          autoclose: true,
          autotimeout: 3000,
          gap: 20,
          distance: 20,
          type: 1,
          position: 'left bottom'
        })
        return;
      }

      // Track minify action
      if (typeof trackEvent === 'function') {
        trackEvent('minify_conversion', 'Code Conversion', 'ES6 to ES5 + Minify', code.length);
      }

      // First convert ES6 to ES5 using Babel
      var es5Code = Babel.transform(code, { presets: ["env"] }).code

      // Then minify the ES5 code using Terser
      const minified = await Terser.minify(es5Code, {
        compress: {
          drop_console: false, // Keep console.log statements
          drop_debugger: false // Keep debugger statements
        },
        mangle: true, // Shorten variable names
        format: {
          comments: false // Remove comments
        }
      });

      if (minified.error) {
        throw minified.error;
      }

      es5Editor.doc.setValue(minified.code)
      
      new Notify ({
        status: 'success',
        title: 'Code Minified',
        text: 'Code successfully minified',
        effect: 'slide',
        speed: 300,
        customClass: '',
        customIcon: '',
        showIcon: true,
        showCloseButton: true,
        autoclose: true,
        autotimeout: 2000,
        gap: 20,
        distance: 20,
        type: 1,
        position: 'left bottom'
      })

    } catch (error) {
      console.log(error);
      new Notify ({
        status: 'error',
        title: 'Minify Error',
        text: error.message || 'Failed to minify code',
        effect: 'slide',
        speed: 300,
        customClass: '',
        customIcon: '',
        showIcon: true,
        showCloseButton: true,
        autoclose: true,
        autotimeout: 5000,
        gap: 20,
        distance: 20,
        type: 1,
        position: 'left bottom'
      })
    }
  }

  // Deep Minify function - removes whitespace from strings too
  deepMinifyBtn.onclick = async function () {
    try {
      var code = es6Editor.doc.getValue()
      
      // Check if code is empty
      if (!code.trim()) {
        new Notify ({
          status: 'warning',
          title: 'No Code to Deep Minify',
          text: 'Please enter some code first',
          effect: 'slide',
          speed: 300,
          customClass: '',
          customIcon: '',
          showIcon: true,
          showCloseButton: true,
          autoclose: true,
          autotimeout: 3000,
          gap: 20,
          distance: 20,
          type: 1,
          position: 'left bottom'
        })
        return;
      }

      // Track deep minify action
      if (typeof trackEvent === 'function') {
        trackEvent('deep_minify_conversion', 'Code Conversion', 'ES6 to ES5 + Deep Minify', code.length);
      }

      // First convert ES6 to ES5 using Babel
      var es5Code = Babel.transform(code, { presets: ["env"] }).code

      // First minify normally with Terser
      const minified = await Terser.minify(es5Code, {
        compress: {
          drop_console: false, // Keep console.log statements
          drop_debugger: false, // Keep debugger statements
          sequences: true, // Join consecutive statements
          dead_code: true, // Remove unreachable code
          conditionals: true, // Optimize if-s and conditional expressions
          comparisons: true, // Optimize comparisons
          evaluate: true, // Evaluate constant expressions
          booleans: true, // Optimize boolean expressions
          loops: true, // Optimize loops
          unused: true, // Drop unused variables/functions
          hoist_funs: true, // Hoist function declarations
          hoist_vars: false, // Don't hoist variable declarations
          if_return: true, // Optimize if/return and if/continue
          join_vars: true, // Join variable declarations
          collapse_vars: true, // Collapse single-use variables
          reduce_vars: true, // Improve optimization on variables
          warnings: false, // Don't show warnings
          negate_iife: true, // Negate "Immediately-Called Function Expressions"
          pure_getters: true, // Assume that object property access does not have side effects
          pure_funcs: null, // List of functions that do not have side effects
          drop_console: false, // Keep console statements for debugging
          expression: false, // Don't preserve completion values from terminal statements
          keep_infinity: false, // Don't keep Infinity
          side_effects: true // Drop side-effect-free statements
        },
        mangle: {
          toplevel: true, // Mangle names declared in the top level scope
          eval: false, // Don't mangle names in scopes where eval or with are used
          keep_fnames: false, // Don't keep function names
          reserved: [] // Reserved names to exclude from mangling
        },
        format: {
          comments: false, // Remove all comments
          beautify: false, // Don't beautify output
          ascii_only: false, // Don't escape Unicode characters
          inline_script: false, // Don't escape </script>
          max_line_len: false, // No maximum line length
          semicolons: true, // Use semicolons to separate statements
          wrap_iife: false, // Don't wrap immediately invoked function expressions
          preamble: null // No preamble
        }
      });

      if (minified.error) {
        throw minified.error;
      }

      // After minification, clean up strings safely
      function cleanStringsOnly(code) {
        // More aggressive approach - remove all extra whitespace from the entire code
        // This will clean up any remaining whitespace that Terser didn't catch
        return code
          .replace(/\s+/g, ' ') // Replace all multiple whitespace (including \n) with single space
          .replace(/\\n\s*/g, '') // Remove literal \n and following spaces in strings
          .replace(/\\n/g, '') // Remove any remaining literal \n
          .replace(/;\s*}/g, ';}') // Remove space before closing braces after semicolon
          .replace(/{\s*/g, '{') // Remove space after opening braces
          .replace(/}\s*/g, '}') // Remove space after closing braces  
          .replace(/,\s*/g, ',') // Remove space after commas
          .replace(/:\s*/g, ':') // Remove space after colons
          .replace(/;\s*/g, ';') // Remove space after semicolons
          .replace(/\(\s*/g, '(') // Remove space after opening parentheses
          .replace(/\s*\)/g, ')') // Remove space before closing parentheses
          .replace(/\[\s*/g, '[') // Remove space after opening brackets
          .replace(/\s*\]/g, ']') // Remove space before closing brackets
          .trim();
      }

      const finalCode = cleanStringsOnly(minified.code);
      es5Editor.doc.setValue(finalCode)
      
      new Notify ({
        status: 'success',
        title: 'Code Deep Minified',
        text: 'Code aggressively minified with string cleanup',
        effect: 'slide',
        speed: 300,
        customClass: '',
        customIcon: '',
        showIcon: true,
        showCloseButton: true,
        autoclose: true,
        autotimeout: 2000,
        gap: 20,
        distance: 20,
        type: 1,
        position: 'left bottom'
      })

    } catch (error) {
      console.log(error);
      new Notify ({
        status: 'error',
        title: 'Deep Minify Error',
        text: error.message || 'Failed to deep minify code',
        effect: 'slide',
        speed: 300,
        customClass: '',
        customIcon: '',
        showIcon: true,
        showCloseButton: true,
        autoclose: true,
        autotimeout: 5000,
        gap: 20,
        distance: 20,
        type: 1,
        position: 'left bottom'
      })
    }
  }



function copyCodefunc()  {
  
  
  const copyText = es5Editor.doc.getValue()

  // Track copy action
  if (typeof trackEvent === 'function') {
    trackEvent('copy_code', 'User Action', 'Copy Converted Code', copyText.length);
  }

  navigator.clipboard.writeText(copyText).then(() => {
    // Success notification
    new Notify ({
      status: 'success',
      title: 'Code Copied',
      text: 'success',
      effect: 'slide',
      speed: 300,
      customClass: '',
      customIcon: '',
      showIcon: true,
      showCloseButton: true,
      autoclose: true,
      autotimeout: 2000,
      gap: 20,
      distance: 20,
      type: 1,
      position: 'left bottom'
    })
  }).catch(err => {
    // Error handling
 
    new Notify ({
      status: 'error',
      title: 'Failed to copy',
      text: 'error',
      effect: 'slide',
      speed: 300,
      customClass: '',
      customIcon: '',
      showIcon: true,
      showCloseButton: true,
      autoclose: true,
      autotimeout: 2000,
      gap: 20,
      distance: 20,
      type: 1,
      position: 'left bottom'
    })
    // notifier.error('Failed to copy');
  });

 
  
  
}

function clearCodefunc(){
  // Track clear action
  if (typeof trackEvent === 'function') {
    trackEvent('clear_code', 'User Action', 'Clear All Code');
  }
  
  es6Editor.doc.setValue('')
  es5Editor.doc.setValue('')
  new Notify ({
    status: 'info',
    title: 'Code Cleared',
    text: 'info',
    effect: 'slide',
    speed: 300,
    customClass: '',
    customIcon: '',
    showIcon: true,
    showCloseButton: true,
    autoclose: true,
    autotimeout: 2000,
    gap: 20,
    distance: 20,
    type: 1,
    position: 'left bottom'
  })
  // notifier.info('Code Cleared');
  
}

// Cookie Consent Management
(function() {
  const COOKIE_CONSENT_KEY = 'es6_converter_cookie_consent';
  const cookieConsent = document.getElementById('cookieConsent');
  const acceptBtn = document.getElementById('acceptCookies');
  const declineBtn = document.getElementById('declineCookies');

  // Check if user has already given consent
  function hasGivenConsent() {
    return localStorage.getItem(COOKIE_CONSENT_KEY) !== null;
  }

  // Show cookie banner
  function showCookieBanner() {
    if (!hasGivenConsent() && cookieConsent) {
      setTimeout(() => {
        cookieConsent.classList.remove('translate-y-full');
      }, 2000); // Show after 2 seconds
    }
  }

  // Hide cookie banner
  function hideCookieBanner() {
    if (cookieConsent) {
      cookieConsent.classList.add('translate-y-full');
    }
  }

  // Enable Google Analytics
  function enableAnalytics() {
    if (typeof gtag === 'function') {
      gtag('consent', 'update', {
        'analytics_storage': 'granted'
      });
      
      // Track consent acceptance
      gtag('event', 'cookie_consent', {
        event_category: 'Privacy',
        event_label: 'Accepted',
        custom_parameter_1: 'cookie_consent_accepted'
      });
    }
  }

  // Disable Google Analytics
  function disableAnalytics() {
    if (typeof gtag === 'function') {
      gtag('consent', 'update', {
        'analytics_storage': 'denied'
      });
      
      // Track consent decline
      gtag('event', 'cookie_consent', {
        event_category: 'Privacy',
        event_label: 'Declined',
        custom_parameter_1: 'cookie_consent_declined'
      });
    }
  }

  // Accept cookies
  function acceptCookies() {
    localStorage.setItem(COOKIE_CONSENT_KEY, 'accepted');
    enableAnalytics();
    hideCookieBanner();
  }

  // Decline cookies
  function declineCookies() {
    localStorage.setItem(COOKIE_CONSENT_KEY, 'declined');
    disableAnalytics();
    hideCookieBanner();
  }

  // Event listeners
  if (acceptBtn) {
    acceptBtn.addEventListener('click', acceptCookies);
  }
  
  if (declineBtn) {
    declineBtn.addEventListener('click', declineCookies);
  }

  // Initialize
  if (hasGivenConsent()) {
    const consent = localStorage.getItem(COOKIE_CONSENT_KEY);
    if (consent === 'accepted') {
      enableAnalytics();
    } else {
      disableAnalytics();
    }
  } else {
    // Set default consent to denied until user decides
    if (typeof gtag === 'function') {
      gtag('consent', 'default', {
        'analytics_storage': 'denied'
      });
    }
    showCookieBanner();
  }
})();

