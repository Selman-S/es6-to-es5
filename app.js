new function () {
  var es6Editor = CodeMirror.fromTextArea(document.getElementById("text1"), { lineNumbers: true, mode: "javascript" })
  var es5Editor = CodeMirror.fromTextArea(document.getElementById("text2"), { lineNumbers: true, mode: "javascript" })
  var height = window.innerHeight * 0.60
  height = height > 200 ? height : 200
  es6Editor.setSize(undefined, height);
  es5Editor.setSize(undefined, height);

  convertBtn.onclick = function () {
    var code = es6Editor.doc.getValue()
    code = Babel.transform(code, { presets: ["env"] }).code

    es5Editor.doc.setValue(code)

    const copyBtn = `
    <button class="copy-code-btn" onclick="copyCodefunc()">Copy Code</button>
    `
    document.querySelector('.code-output .copy-code-btn') && document.querySelector('.code-output  .copy-code-btn').remove()
    document.querySelector('.code-output .CodeMirror.cm-s-default').insertAdjacentHTML('beforebegin', copyBtn)
  }
}

const copyCodefunc = () => {
  let copyText = ''
 const code = document.querySelectorAll('.code-output .CodeMirror.cm-s-default .CodeMirror-lines .CodeMirror-code .CodeMirror-line ').forEach((item) => {
    copyText += item.innerText  + '\n'
  })


  navigator.clipboard.writeText(copyText).then(() => {
    // Success notification
    showNotification('Code Copied','success');
  }).catch(err => {
    // Error handling
 
    
    showNotification('Failed to copy','error');
  });

 
  
  
}


function showNotification(text,color) {
  var notification = document.getElementById('notification');
  notification.classList.remove('hidden');
  notification.classList.remove('success');
  notification.classList.remove('info');
  notification.classList.remove('error');
  notification.classList.add(color);

  notification.querySelector('p').innerHTML = text;
  setTimeout(function () {
    notification.style.right = '20px'; // Sağa doğru gelecek
  }, 100);

  // Süre barı animasyonunu başlat
  var progressBar = document.querySelector('.progress-bar');
  progressBar.style.animation = 'none';
  setTimeout(function () {
    progressBar.style.animation = 'progress 1s ease-in-out forwards';
  }, 100);

  // 2 saniye sonra notification gizle
  setTimeout(function () {
    notification.style.right = '-300px'; // Sağa doğru kaybolacak
    setTimeout(function () {
      notification.classList.add('hidden');
    

    }, 500); // Kaybolma animasyonu süresi
  }, 1200); // Notification gösterme süresi
}