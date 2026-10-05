(function () {
  var fileInput = document.getElementById('fileinput');
  var photo = document.getElementById('photo');
  var drop = document.getElementById('drop');
  var hint = document.getElementById('drop-hint');
  var camera = document.getElementById('camera');
  var sendBtn = document.getElementById('send');
  var loading = document.getElementById('loading');
  var resultBody = document.getElementById('result-body');
  var baseData = '';

  document.getElementById('uload').addEventListener('click', function () { fileInput.click(); });
  fileInput.addEventListener('change', function () { loadFile(fileInput.files[0]); });

  ['dragenter', 'dragover'].forEach(function (ev) {
    drop.addEventListener(ev, function (e) { e.preventDefault(); drop.classList.add('over'); });
  });
  ['dragleave', 'drop'].forEach(function (ev) {
    drop.addEventListener(ev, function (e) { e.preventDefault(); drop.classList.remove('over'); });
  });
  drop.addEventListener('drop', function (e) { loadFile(e.dataTransfer.files[0]); });

  function loadFile(file) {
    if (!file || !file.type.startsWith('image/')) {
      showMessage('Please choose an image file (JPG or PNG).');
      return;
    }
    var reader = new FileReader();
    reader.onload = function (e) {
      var img = new Image();
      img.onload = function () {
        var canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        canvas.getContext('2d').drawImage(img, 0, 0);
        baseData = canvas.toDataURL('image/jpeg', 1.0).replace(/^data:image.+;base64,/, '');
        sendBtn.disabled = false;
      };
      img.src = e.target.result;
      photo.src = e.target.result;
      photo.hidden = false;
      camera.hidden = true;
      hint.textContent = file.name;
      showMessage('Press Predict to analyse this scan.');
    };
    reader.readAsDataURL(file);
  }

  function showMessage(text) {
    resultBody.className = 'empty';
    resultBody.textContent = text;
  }

  sendBtn.addEventListener('click', function () {
    if (!baseData) return;
    loading.hidden = false;
    fetch(document.getElementById('url').value, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ image: baseData })
    })
      .then(function (r) { if (!r.ok) throw new Error('Server error ' + r.status); return r.json(); })
      .then(function (res) {
        var label = (res[0] && res[0].image) || 'Unknown';
        var isTumor = label.toLowerCase() === 'tumor';
        resultBody.className = '';
        resultBody.innerHTML = '';
        var badge = document.createElement('div');
        badge.className = 'badge ' + (isTumor ? 'tumor' : 'normal');
        badge.textContent = label;
        var note = document.createElement('p');
        note.className = 'note';
        note.textContent = isTumor
          ? 'The model found signs of a tumor. Please consult a doctor.'
          : 'The model found no signs of a tumor. This is not a medical diagnosis.';
        resultBody.append(badge, note);
        if (res[1] && res[1].image && res[1].image.length > 100) {
          var out = document.createElement('img');
          out.src = 'data:image/jpeg;base64,' + res[1].image;
          out.alt = 'Model output';
          resultBody.appendChild(out);
        }
      })
      .catch(function (err) {
        showMessage('Prediction failed: ' + err.message + '. Check that the server is running and try again.');
      })
      .finally(function () { loading.hidden = true; });
  });
})();