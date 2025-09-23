

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

      // Minify the code using Terser
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

