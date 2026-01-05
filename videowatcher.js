(function () {
  'use strict';

  function tryAttachVideoListener() {
    const iframe = document.getElementById('stageFrame');
    if (!iframe || !iframe.contentDocument) return;

    const video = iframe.contentDocument.querySelector('video');
    if (!video || video.__autoAdvanceAttached) return;
    if (video.paused) video.play();
    
    video.__autoAdvanceAttached = true;

    video.addEventListener('ended', () => {
      setTimeout(clickNext, 800);
    });
  }

  function clickNext() {
    const nextBtn = document.querySelector('.footnav.goRight');
    if (nextBtn && !nextBtn.disabled) {
      nextBtn.click();
    }
  }

  // poll lightly until video exists
  setInterval(tryAttachVideoListener, 1000);
})();
