

  var es6Editor = CodeMirror.fromTextArea(document.getElementById("text1"), { lineNumbers: true, mode: "javascript" })
  var es5Editor = CodeMirror.fromTextArea(document.getElementById("text2"), { lineNumbers: true, mode: "javascript" })
  var height = window.innerHeight * 0.60
  height = height > 200 ? height : 200
  es6Editor.setSize(undefined, height);
  es5Editor.setSize(undefined, height);

 
  convertBtn.onclick = function () {

    try {
      var code = es6Editor.doc.getValue()
      code = Babel.transform(code, { presets: ["env"] }).code

  
      es5Editor.doc.setValue(code)
  
      const copyBtn = `
      <button class="copy-code-btn" onclick="copyCodefunc()">Copy Code</button>
      `
      document.querySelector('.code-output .copy-code-btn') && document.querySelector('.code-output  .copy-code-btn').remove()
      document.querySelector('.code-output .CodeMirror.cm-s-default').insertAdjacentHTML('beforebegin', copyBtn)

      const clearBtn = `
      <button class="clear-code-btn" onclick="clearCodefunc()">Clear Code</button>
      `

      document.querySelector('.code-input .clear-code-btn') && document.querySelector('.code-input  .clear-code-btn').remove()
      document.querySelector('.code-input .CodeMirror.cm-s-default').insertAdjacentHTML('beforebegin', clearBtn)
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
       // showNotification('Wrong Code Format','error');
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
  document.querySelector('.code-output .copy-code-btn') && document.querySelector('.code-output  .copy-code-btn').remove()

  document.querySelector('.code-input .clear-code-btn') && document.querySelector('.code-input  .clear-code-btn').remove()
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

