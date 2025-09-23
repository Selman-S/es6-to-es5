

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

  // Minify function - Convert ES6 to ES5 first, then minify
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

      // Step 1: Convert ES6 to ES5 using Babel
      code = Babel.transform(code, { presets: ["env"] }).code

      // Step 2: Minify the ES5 code using Terser
      const minified = await Terser.minify(code, {
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
        title: 'Code Converted & Minified',
        text: 'ES6→ES5 conversion + minification completed',
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

  // Deep Minify function - Convert ES6 to ES5 first, then ultra-aggressive minify
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

      // Step 1: Convert ES6 to ES5 using Babel
      code = Babel.transform(code, { presets: ["env"] }).code

      // Pre-process: Clean up excessive whitespace in strings ULTRA aggressively
      function cleanStringWhitespace(code) {
        // Handle template literals (backticks) with multiline support
        code = code.replace(/`([^`]*)`/gs, function(match, content) {
          const cleaned = content
            .replace(/\n\s+/g, '\n') // Remove indentation after newlines
            .replace(/\s*\n\s*/g, '\n') // Clean around newlines
            .replace(/\t+/g, ' ') // Tabs to single space
            .replace(/\s{2,}/g, ' ') // Multiple spaces to single
            .replace(/^\s+|\s+$/gm, '') // Trim each line
            .replace(/\n+/g, '\n') // Multiple newlines to single
            .replace(/\n/g, '') // REMOVE ALL NEWLINES - make single line
            .trim();
          return '`' + cleaned + '`';
        });
        
        // Handle regular string literals (single and double quotes)
        code = code.replace(/(["'])([^"']*?)\1/g, function(match, quote, content) {
          const cleaned = content
            .replace(/\n\s*/g, '\n') // Remove spaces after newlines
            .replace(/\s*\n\s*/g, '\n') // Clean around newlines
            .replace(/\t+/g, ' ') // Tabs to single space
            .replace(/\s{2,}/g, ' ') // Multiple spaces to single
            .replace(/^\s+|\s+$/gm, '') // Trim each line
            .replace(/\n/g, '') // REMOVE ALL NEWLINES - make single line
            .trim();
          return quote + cleaned + quote;
        });
        
        return code;
      }

      // Clean the code first
      const preProcessedCode = cleanStringWhitespace(code);

      // Then minify with Terser using aggressive settings
      const minified = await Terser.minify(preProcessedCode, {
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

      es5Editor.doc.setValue(minified.code)
      
      new Notify ({
        status: 'success',
        title: 'Code Converted & Deep Minified',
        text: 'ES6→ES5 conversion + ultra-aggressive minification completed',
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

