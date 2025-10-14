// ========================================
// CODE MIRROR INITIALIZATION
// ========================================

  var es6Editor = CodeMirror.fromTextArea(document.getElementById("text1"), { 
    lineNumbers: true, 
    mode: "javascript",
    theme: "default",
    lineWrapping: true,
    matchBrackets: true,
    autoCloseBrackets: true,
    indentUnit: 2,
    tabSize: 2,
    extraKeys: {
      "Ctrl-Enter": function() { document.getElementById('convertBtn').click(); },
      "Ctrl-Shift-M": function() { document.getElementById('minifyBtn').click(); },
      "Ctrl-Shift-D": function() { document.getElementById('deepMinifyBtn').click(); }
    }
  });
  
  var es5Editor = CodeMirror.fromTextArea(document.getElementById("text2"), { 
    lineNumbers: true, 
    mode: "javascript",
    theme: "default",
    lineWrapping: true,
    readOnly: true,
    matchBrackets: true
  });
  
  var height = window.innerHeight * 0.60
  height = height > 200 ? height : 200
  es6Editor.setSize(undefined, height);
  es5Editor.setSize(undefined, height);

// ========================================
// STATISTICS & METRICS
// ========================================

// Update input statistics
function updateInputStats() {
  const code = es6Editor.getValue();
  const charCount = code.length;
  const lineCount = code.split('\n').length;
  
  document.getElementById('inputCharCount').textContent = `${charCount.toLocaleString()} chars`;
  document.getElementById('inputLineCount').textContent = `${lineCount} lines`;
}

// Update output statistics
function updateOutputStats() {
  const code = es5Editor.getValue();
  const charCount = code.length;
  const lineCount = code.split('\n').length;
  
  document.getElementById('outputCharCount').textContent = `${charCount.toLocaleString()} chars`;
  document.getElementById('outputLineCount').textContent = `${lineCount} lines`;
}

// Show compression ratio
function showCompressionRatio(originalSize, compressedSize) {
  const ratio = ((originalSize - compressedSize) / originalSize * 100).toFixed(1);
  const badge = document.getElementById('compressionBadge');
  const ratioSpan = document.getElementById('compressionRatio');
  
  if (badge && ratioSpan && ratio > 0) {
    ratioSpan.textContent = `${ratio}%`;
    badge.style.display = 'flex';
    
    // Animate the badge
    badge.style.animation = 'none';
    setTimeout(() => {
      badge.style.animation = 'slideInRight 0.5s ease';
    }, 10);
  }
}

// Listen to editor changes
es6Editor.on('change', updateInputStats);
es5Editor.on('change', updateOutputStats);

// Initialize stats
updateInputStats();
updateOutputStats();

// ========================================
// SAMPLE TEMPLATES
// ========================================

const codeTemplates = {
  arrow: `// Arrow Function Example
const greet = (name) => {
  return \`Hello, \${name}!\`;
};

const add = (a, b) => a + b;

const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map(n => n * 2);

console.log(greet('World'));
console.log(doubled);`,
  
  class: `// Class Example
class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
  
  greet() {
    return \`Hello, I'm \${this.name} and I'm \${this.age} years old.\`;
  }
  
  static createAnonymous() {
    return new Person('Anonymous', 0);
  }
}

class Developer extends Person {
  constructor(name, age, language) {
    super(name, age);
    this.language = language;
  }
  
  code() {
    return \`I code in \${this.language}\`;
  }
}

const dev = new Developer('John', 25, 'JavaScript');
console.log(dev.greet());
console.log(dev.code());`,
  
  destructuring: `// Destructuring Example
const user = {
  name: 'Alice',
  age: 30,
  email: 'alice@example.com',
  address: {
    city: 'New York',
    country: 'USA'
  }
};

// Object destructuring
const { name, age, address: { city } } = user;

// Array destructuring
const colors = ['red', 'green', 'blue'];
const [primary, secondary] = colors;

// Function parameter destructuring
function displayUser({ name, email }) {
  console.log(\`\${name}: \${email}\`);
}

displayUser(user);`,
  
  async: `// Async/Await Example
async function fetchUserData(userId) {
  try {
    const response = await fetch(\`https://api.example.com/users/\${userId}\`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching user:', error);
    throw error;
  }
}

async function processUsers() {
  const user1 = await fetchUserData(1);
  const user2 = await fetchUserData(2);
  
  return [user1, user2];
}

// Using Promise.all for parallel requests
async function fetchMultipleUsers(ids) {
  const promises = ids.map(id => fetchUserData(id));
  return await Promise.all(promises);
}`,
  
  spread: `// Spread Operator Example
const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];

// Array spread
const combined = [...arr1, ...arr2];
const copy = [...arr1];

// Object spread
const person = { name: 'John', age: 30 };
const employee = { ...person, role: 'Developer', salary: 50000 };

// Function arguments
function sum(...numbers) {
  return numbers.reduce((total, num) => total + num, 0);
}

console.log(sum(1, 2, 3, 4, 5));

// Rest parameters
function logInfo(first, second, ...rest) {
  console.log('First:', first);
  console.log('Second:', second);
  console.log('Rest:', rest);
}

logInfo('a', 'b', 'c', 'd', 'e');`
};

function loadTemplate(templateName) {
  const template = codeTemplates[templateName];
  if (template) {
    es6Editor.setValue(template);
    es5Editor.setValue('');
    
    // Clear compression badge
    const badge = document.getElementById('compressionBadge');
    if (badge) {
      badge.style.display = 'none';
    }
    
    // Track template usage
    if (typeof trackEvent === 'function') {
      trackEvent('load_template', 'User Action', `Template: ${templateName}`);
    }
    
    new Notify({
      status: 'info',
      title: 'Template Loaded',
      text: `${templateName.charAt(0).toUpperCase() + templateName.slice(1)} example loaded`,
      effect: 'slide',
      speed: 300,
      showIcon: true,
      showCloseButton: true,
      autoclose: true,
      autotimeout: 2000,
      gap: 20,
      distance: 20,
      type: 1,
      position: 'left bottom'
    });
  }
}

// ========================================
// DOWNLOAD FUNCTIONALITY
// ========================================

function downloadCode() {
  const code = es5Editor.getValue();
  
  if (!code.trim()) {
    new Notify({
      status: 'warning',
      title: 'No Code to Download',
      text: 'Please convert some code first',
      effect: 'slide',
      speed: 300,
      showIcon: true,
      showCloseButton: true,
      autoclose: true,
      autotimeout: 3000,
      gap: 20,
      distance: 20,
      type: 1,
      position: 'left bottom'
    });
    return;
  }
  
  const blob = new Blob([code], { type: 'text/javascript' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, -5);
  a.href = url;
  a.download = `converted-es5-${timestamp}.js`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
  
  // Track download
  if (typeof trackEvent === 'function') {
    trackEvent('download_code', 'User Action', 'Downloaded Converted Code', code.length);
  }
  
  new Notify({
    status: 'success',
    title: 'Download Started',
    text: 'Your converted code is downloading',
    effect: 'slide',
    speed: 300,
    showIcon: true,
    showCloseButton: true,
    autoclose: true,
    autotimeout: 2000,
    gap: 20,
    distance: 20,
    type: 1,
    position: 'left bottom'
  });
}

// ========================================
// BUTTON LOADING STATES
// ========================================

function setButtonLoading(button, isLoading) {
  if (isLoading) {
    button.classList.add('loading');
    button.disabled = true;
  } else {
    button.classList.remove('loading');
    button.disabled = false;
  }
}

// ========================================
// CONVERSION FUNCTIONS
// ========================================

 
  // ES6 to ES5 conversion function
  convertBtn.onclick = function () {
    const originalCode = es6Editor.getValue();
    
    if (!originalCode.trim()) {
      new Notify({
        status: 'warning',
        title: 'No Code to Convert',
        text: 'Please enter some ES6 code first',
        effect: 'slide',
        speed: 300,
        showIcon: true,
        showCloseButton: true,
        autoclose: true,
        autotimeout: 3000,
        gap: 20,
        distance: 20,
        type: 1,
        position: 'left bottom'
      });
      return;
    }
    
    setButtonLoading(convertBtn, true);
    
    // Add small delay for UI feedback
    setTimeout(() => {
      try {
        // Track ES6 to ES5 conversion with enhanced metrics
        if (typeof trackEvent === 'function') {
          trackEvent('es6_to_es5_conversion', 'Code Conversion', 'ES6 to ES5', originalCode.length, {
            input_length: originalCode.length,
            input_lines: originalCode.split('\n').length,
            conversion_type: 'es6_to_es5',
            timestamp: Date.now()
          });
        }
        
        const convertedCode = Babel.transform(originalCode, { presets: ["env"] }).code;
        es5Editor.setValue(convertedCode);
        
        // Hide compression badge for simple conversion
        const badge = document.getElementById('compressionBadge');
        if (badge) {
          badge.style.display = 'none';
        }
        
        new Notify({
          status: 'success',
          title: '✅ Conversion Complete',
          text: `Converted ${originalCode.length} characters to ES5`,
          effect: 'slide',
          speed: 300,
          showIcon: true,
          showCloseButton: true,
          autoclose: true,
          autotimeout: 2000,
          gap: 20,
          distance: 20,
          type: 1,
          position: 'left bottom'
        });

      } catch (error) {
        console.log(error);
        
        // Track conversion errors
        if (typeof trackEvent === 'function') {
          trackEvent('conversion_error', 'Error', 'ES6 to ES5 Failed', 0, {
            error_message: error.message,
            error_type: 'babel_conversion',
            input_length: originalCode.length,
            error_timestamp: Date.now()
          });
        }
        
        new Notify({
          status: 'error',
          title: '❌ Conversion Error',
          text: error.message || 'Failed to convert code',
          effect: 'slide',
          speed: 300,
          showIcon: true,
          showCloseButton: true,
          autoclose: true,
          autotimeout: 5000,
          gap: 20,
          distance: 20,
          type: 1,
          position: 'left bottom'
        });
      } finally {
        setButtonLoading(convertBtn, false);
      }
    }, 300);
  }

  // Minify function
  minifyBtn.onclick = async function () {
    const originalCode = es6Editor.getValue();
    
    // Check if code is empty
    if (!originalCode.trim()) {
      new Notify({
        status: 'warning',
        title: 'No Code to Minify',
        text: 'Please enter some code first',
        effect: 'slide',
        speed: 300,
        showIcon: true,
        showCloseButton: true,
        autoclose: true,
        autotimeout: 3000,
        gap: 20,
        distance: 20,
        type: 1,
        position: 'left bottom'
      });
      return;
    }

    setButtonLoading(minifyBtn, true);

    try {
      // Track minify action with performance metrics
      const minifyStartTime = performance.now();
      if (typeof trackEvent === 'function') {
        trackEvent('minify_conversion', 'Code Conversion', 'ES6 to ES5 + Minify', originalCode.length, {
          input_length: originalCode.length,
          input_lines: originalCode.split('\n').length,
          conversion_type: 'minify',
          start_time: minifyStartTime,
          timestamp: Date.now()
        });
      }

      // First convert ES6 to ES5 using Babel
      var es5Code = Babel.transform(originalCode, { presets: ["env"] }).code;

      // Then minify the ES5 code using Terser
      const minified = await Terser.minify(es5Code, {
        compress: {
          drop_console: false,
          drop_debugger: false
        },
        mangle: true,
        format: {
          comments: false
        }
      });

      if (minified.error) {
        throw minified.error;
      }

      const minifyEndTime = performance.now();
      const compressionRatio = ((originalCode.length - minified.code.length) / originalCode.length * 100).toFixed(1);
      
      // Track successful minification with metrics
      if (typeof trackEvent === 'function') {
        trackEvent('minify_success', 'Conversion Success', 'Minify Completed', minified.code.length, {
          processing_time: minifyEndTime - minifyStartTime,
          original_size: originalCode.length,
          minified_size: minified.code.length,
          compression_ratio: compressionRatio,
          output_lines: minified.code.split('\n').length
        });
      }
      
      es5Editor.setValue(minified.code);
      
      // Show compression ratio
      showCompressionRatio(originalCode.length, minified.code.length);
      
      new Notify({
        status: 'success',
        title: '🗜️ Minification Complete',
        text: `Reduced by ${compressionRatio}% (${originalCode.length} → ${minified.code.length} chars)`,
        effect: 'slide',
        speed: 300,
        showIcon: true,
        showCloseButton: true,
        autoclose: true,
        autotimeout: 3000,
        gap: 20,
        distance: 20,
        type: 1,
        position: 'left bottom'
      });

    } catch (error) {
      console.log(error);
      new Notify({
        status: 'error',
        title: '❌ Minify Error',
        text: error.message || 'Failed to minify code',
        effect: 'slide',
        speed: 300,
        showIcon: true,
        showCloseButton: true,
        autoclose: true,
        autotimeout: 5000,
        gap: 20,
        distance: 20,
        type: 1,
        position: 'left bottom'
      });
    } finally {
      setButtonLoading(minifyBtn, false);
    }
  }

  // Deep Minify function - removes whitespace from strings too
  deepMinifyBtn.onclick = async function () {
    const originalCode = es6Editor.getValue();
    
    // Check if code is empty
    if (!originalCode.trim()) {
      new Notify({
        status: 'warning',
        title: 'No Code to Deep Minify',
        text: 'Please enter some code first',
        effect: 'slide',
        speed: 300,
        showIcon: true,
        showCloseButton: true,
        autoclose: true,
        autotimeout: 3000,
        gap: 20,
        distance: 20,
        type: 1,
        position: 'left bottom'
      });
      return;
    }

    setButtonLoading(deepMinifyBtn, true);

    try {
      // Track deep minify action with performance metrics
      const deepMinifyStartTime = performance.now();
      if (typeof trackEvent === 'function') {
        trackEvent('deep_minify_conversion', 'Code Conversion', 'ES6 to ES5 + Deep Minify', originalCode.length, {
          input_length: originalCode.length,
          input_lines: originalCode.split('\n').length,
          conversion_type: 'deep_minify',
          start_time: deepMinifyStartTime,
          timestamp: Date.now()
        });
      }

      // First convert ES6 to ES5 using Babel
      var es5Code = Babel.transform(originalCode, { presets: ["env"] }).code;

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
      const deepMinifyEndTime = performance.now();
      const compressionRatio = ((originalCode.length - finalCode.length) / originalCode.length * 100).toFixed(1);
      
      // Track successful deep minification with metrics
      if (typeof trackEvent === 'function') {
        trackEvent('deep_minify_success', 'Conversion Success', 'Deep Minify Completed', finalCode.length, {
          processing_time: deepMinifyEndTime - deepMinifyStartTime,
          original_size: originalCode.length,
          minified_size: finalCode.length,
          compression_ratio: compressionRatio,
          output_lines: finalCode.split('\n').length,
          minification_level: 'aggressive'
        });
      }
      
      es5Editor.setValue(finalCode);
      
      // Show compression ratio
      showCompressionRatio(originalCode.length, finalCode.length);
      
      new Notify({
        status: 'success',
        title: '⚡ Deep Minification Complete',
        text: `Maximum compression! Reduced by ${compressionRatio}% (${originalCode.length} → ${finalCode.length} chars)`,
        effect: 'slide',
        speed: 300,
        showIcon: true,
        showCloseButton: true,
        autoclose: true,
        autotimeout: 3000,
        gap: 20,
        distance: 20,
        type: 1,
        position: 'left bottom'
      });

    } catch (error) {
      console.log(error);
      new Notify({
        status: 'error',
        title: '❌ Deep Minify Error',
        text: error.message || 'Failed to deep minify code',
        effect: 'slide',
        speed: 300,
        showIcon: true,
        showCloseButton: true,
        autoclose: true,
        autotimeout: 5000,
        gap: 20,
        distance: 20,
        type: 1,
        position: 'left bottom'
      });
    } finally {
      setButtonLoading(deepMinifyBtn, false);
    }
  }



// ========================================
// COPY & CLEAR FUNCTIONS
// ========================================

function copyCodefunc() {
  const copyText = es5Editor.getValue();

  if (!copyText.trim()) {
    new Notify({
      status: 'warning',
      title: 'Nothing to Copy',
      text: 'Output is empty. Convert some code first!',
      effect: 'slide',
      speed: 300,
      showIcon: true,
      showCloseButton: true,
      autoclose: true,
      autotimeout: 2000,
      gap: 20,
      distance: 20,
      type: 1,
      position: 'left bottom'
    });
    return;
  }

  // Track copy action with detailed metrics
  if (typeof trackEvent === 'function') {
    trackEvent('copy_code', 'User Action', 'Copy Converted Code', copyText.length, {
      copied_text_length: copyText.length,
      copied_lines: copyText.split('\n').length,
      copy_timestamp: Date.now(),
      has_content: copyText.trim().length > 0
    });
  }

  navigator.clipboard.writeText(copyText).then(() => {
    // Add success class to button
    const copyBtn = document.querySelector('.copy-code-btn');
    if (copyBtn) {
      copyBtn.classList.add('success');
      setTimeout(() => {
        copyBtn.classList.remove('success');
      }, 500);
    }
    
    new Notify({
      status: 'success',
      title: '✅ Copied to Clipboard',
      text: `${copyText.length} characters copied successfully`,
      effect: 'slide',
      speed: 300,
      showIcon: true,
      showCloseButton: true,
      autoclose: true,
      autotimeout: 2000,
      gap: 20,
      distance: 20,
      type: 1,
      position: 'left bottom'
    });
  }).catch(err => {
    new Notify({
      status: 'error',
      title: '❌ Copy Failed',
      text: 'Could not copy to clipboard. Please try again.',
      effect: 'slide',
      speed: 300,
      showIcon: true,
      showCloseButton: true,
      autoclose: true,
      autotimeout: 2000,
      gap: 20,
      distance: 20,
      type: 1,
      position: 'left bottom'
    });
  });
}

function clearCodefunc() {
  // Track clear action with context
  const inputContent = es6Editor.getValue();
  const outputContent = es5Editor.getValue();
  
  if (!inputContent.trim() && !outputContent.trim()) {
    new Notify({
      status: 'info',
      title: 'Already Empty',
      text: 'Both editors are already empty',
      effect: 'slide',
      speed: 300,
      showIcon: true,
      showCloseButton: true,
      autoclose: true,
      autotimeout: 2000,
      gap: 20,
      distance: 20,
      type: 1,
      position: 'left bottom'
    });
    return;
  }
  
  if (typeof trackEvent === 'function') {
    trackEvent('clear_code', 'User Action', 'Clear All Code', 0, {
      input_length_cleared: inputContent.length,
      output_length_cleared: outputContent.length,
      had_content: inputContent.trim().length > 0 || outputContent.trim().length > 0,
      clear_timestamp: Date.now()
    });
  }
  
  es6Editor.setValue('');
  es5Editor.setValue('');
  
  // Hide compression badge
  const badge = document.getElementById('compressionBadge');
  if (badge) {
    badge.style.display = 'none';
  }
  
  new Notify({
    status: 'info',
    title: '🗑️ Editors Cleared',
    text: 'All code has been cleared',
    effect: 'slide',
    speed: 300,
    showIcon: true,
    showCloseButton: true,
    autoclose: true,
    autotimeout: 2000,
    gap: 20,
    distance: 20,
    type: 1,
    position: 'left bottom'
  });
}

// ========================================
// KEYBOARD SHORTCUTS
// ========================================

// Add global keyboard shortcuts
document.addEventListener('keydown', function(e) {
  // Ctrl/Cmd + Shift + C: Copy output
  if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'C') {
    e.preventDefault();
    copyCodefunc();
  }
  
  // Ctrl/Cmd + Shift + X: Clear all
  if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'X') {
    e.preventDefault();
    clearCodefunc();
  }
});

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

// Additional User Engagement Tracking
(function() {
  let sessionStartTime = Date.now();
  let lastActivityTime = Date.now();
  let codeInputStartTime = null;
  let hasTypedCode = false;
  
  // Track typing activity
  let typingTimer;
  function trackTyping() {
    if (!hasTypedCode) {
      hasTypedCode = true;
      codeInputStartTime = Date.now();
      if (typeof trackEvent === 'function') {
        trackEvent('first_code_input', 'User Engagement', 'Started Typing Code');
      }
    }
    
    lastActivityTime = Date.now();
    
    // Track continuous typing sessions
    clearTimeout(typingTimer);
    typingTimer = setTimeout(() => {
      const typingDuration = Date.now() - (codeInputStartTime || sessionStartTime);
      if (typeof trackEvent === 'function') {
        trackEvent('typing_session_end', 'User Engagement', 'Stopped Typing', typingDuration, {
          typing_duration: typingDuration,
          session_duration: Date.now() - sessionStartTime
        });
      }
    }, 5000); // 5 seconds of inactivity
  }
  
  // Track editor interactions
  es6Editor.on('change', function(cm, change) {
    trackTyping();
    const currentContent = cm.getValue();
    
    // Track significant content milestones
    if (currentContent.length > 0 && currentContent.length % 100 === 0) {
      if (typeof trackEvent === 'function') {
        trackEvent('content_milestone', 'User Engagement', 'Code Length Milestone', currentContent.length, {
          character_count: currentContent.length,
          line_count: currentContent.split('\n').length
        });
      }
    }
  });
  
  // Track editor focus events
  es6Editor.on('focus', function() {
    if (typeof trackEvent === 'function') {
      trackEvent('editor_focus', 'User Interaction', 'Input Editor Focused');
    }
  });
  
  es5Editor.on('focus', function() {
    if (typeof trackEvent === 'function') {
      trackEvent('output_focus', 'User Interaction', 'Output Editor Focused');
    }
  });
  
  // Track scroll behavior in editors
  es6Editor.on('scroll', function() {
    if (typeof trackEvent === 'function') {
      trackEvent('input_scroll', 'User Interaction', 'Scrolled Input Editor');
    }
  });
  
  es5Editor.on('scroll', function() {
    if (typeof trackEvent === 'function') {
      trackEvent('output_scroll', 'User Interaction', 'Scrolled Output Editor');
    }
  });
  
  // Track page visibility and session duration
  document.addEventListener('visibilitychange', function() {
    const sessionDuration = Date.now() - sessionStartTime;
    if (document.visibilityState === 'hidden') {
      if (typeof trackEvent === 'function') {
        trackEvent('page_hidden', 'User Engagement', 'Left Page', sessionDuration, {
          session_duration: sessionDuration,
          had_activity: hasTypedCode
        });
      }
    } else {
      if (typeof trackEvent === 'function') {
        trackEvent('page_visible', 'User Engagement', 'Returned to Page');
      }
    }
  });
  
  // Track session milestones (1min, 5min, 10min)
  const milestones = [60000, 300000, 600000]; // 1min, 5min, 10min in ms
  milestones.forEach(milestone => {
    setTimeout(() => {
      if (typeof trackEvent === 'function') {
        trackEvent('session_milestone', 'User Engagement', `Session ${milestone/60000}min`, milestone, {
          session_duration: milestone,
          has_typed: hasTypedCode,
          last_activity: Date.now() - lastActivityTime
        });
      }
    }, milestone);
  });
  
  // Track page unload with session summary
  window.addEventListener('beforeunload', function() {
    const sessionDuration = Date.now() - sessionStartTime;
    const finalInputLength = es6Editor.getValue().length;
    const finalOutputLength = es5Editor.getValue().length;
    
    if (typeof trackEvent === 'function') {
      trackEvent('session_end', 'User Engagement', 'Session Complete', sessionDuration, {
        total_session_time: sessionDuration,
        final_input_length: finalInputLength,
        final_output_length: finalOutputLength,
        typed_code: hasTypedCode,
        conversions_made: finalOutputLength > 0
      });
    }
    
    // Send GTM data immediately
    if (window.dataLayer) {
      window.dataLayer.push({
        event: 'session_summary',
        session_duration: sessionDuration,
        user_engaged: hasTypedCode,
        successful_conversion: finalOutputLength > 0
      });
    }
  });
})();

