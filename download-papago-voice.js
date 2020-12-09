//    downloading papago voice
//    author: beanple
//    modified: 20201209
//    license: MIT

//    usage
//    copy and paste in the chrom console
//    and click button
(function() {
  let count = 0
  const open = XMLHttpRequest.prototype.open;
  XMLHttpRequest.prototype.open = function() {
    this.addEventListener('load', function() {
      try {
        const id = JSON.parse(this.responseText).id

        fetch('https://papago.naver.com/apis/tts/' + id, {
          method: 'GET',
        })
       .then(response => response.blob())
       .then(blob => {
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = "voice" + count++ + ".mp3";
          document.body.appendChild(a);
          a.hidden = true;
          a.click();
          a.remove();
        });

      } catch (err) {

      }
    });
    open.apply(this, arguments);
  };
})();
