(function () {
  const boardScreen = document.querySelector('#board-screen');
  const bookScreen = document.querySelector('#book-screen');
  const blackout = document.querySelector('#blackout');
  const corkBoard = document.querySelector('.cork-board');
  const cards = document.querySelectorAll('.photo-card[data-action]');
  const backToBoard = document.querySelector('#back-to-board');
  const bookTitle = document.querySelector('#book-title');
  const pageFrame = document.querySelector('#page-frame');

  let isTransitioning = false;

  const sections = {
    review: { title: '文字魔法變簡報', folder: '文字魔法變簡報', entry: 'DEMO1-文字做投影片-精簡排版.html' },
    outlook: { title: '圖文玩出簡報力', folder: '圖文玩出簡報力', entry: '圖文描述製作投影片_互動網頁.html' },
    other: { title: '創意應用分享', folder: '實用工具百寶箱', entry: '創意應用分享.html' },
  };

  function animate(element, keyframes, options) {
    element.animate(keyframes, {
      fill: 'forwards',
      easing: 'ease',
      ...options,
    });
    return delay(options.duration || 0);
  }

  function startAnimation(element, keyframes, options) {
    return element.animate(keyframes, {
      fill: 'forwards',
      easing: 'ease',
      ...options,
    });
  }

  function delay(duration) {
    return new Promise((resolve) => window.setTimeout(resolve, duration));
  }

  async function enterBook(card) {
    if (isTransitioning) return;
    isTransitioning = true;
    const currentSection = sections[card.dataset.action];
    bookScreen.dataset.section = card.dataset.action;
    const isSpiral = card.dataset.action === 'outlook';
    const zoomDuration = isSpiral ? 1700 : 1350;
    const fadeDuration = isSpiral ? 400 : 250;
    bookTitle.textContent = '回首頁';
    bookScreen.setAttribute('aria-label', `${currentSection.title}相簿`);
    pageFrame.title = `${currentSection.title}頁面內容`;
    const rect = card.getBoundingClientRect();
    const boardRect = corkBoard.getBoundingClientRect();
    const photoCenterX = rect.left + rect.width / 2;
    const photoCenterY = rect.top + rect.height / 2;
    const viewportCenterX = window.innerWidth / 2;
    const viewportCenterY = window.innerHeight / 2;
    const scale = Math.max(3.4, Math.min(5.2, window.innerWidth / rect.width));
    const x = viewportCenterX - photoCenterX;
    const y = viewportCenterY - photoCenterY;

    corkBoard.style.transformOrigin = `${photoCenterX - boardRect.left}px ${photoCenterY - boardRect.top}px`;

    const zoomFrames = isSpiral
      ? [
        { filter: 'brightness(1)', transform: 'translate(0, 0) rotate(0deg) scale(1)' },
        { filter: 'brightness(.9)', transform: `translate(${x * .35}px, ${y * .35}px) rotate(-12deg) scale(1.5)`, offset: .38 },
        { filter: 'brightness(.72)', transform: `translate(${x}px, ${y}px) rotate(18deg) scale(${scale})` },
      ]
      : [
        {
          filter: 'brightness(1)',
          transform: 'translate(0, 0) scale(1)',
        },
        {
          filter: 'brightness(0.72)',
          transform: `translate(${x}px, ${y}px) scale(${scale})`,
        },
      ];
    const zoomAnimation = startAnimation(
      corkBoard,
      zoomFrames,
      { duration: zoomDuration, easing: 'cubic-bezier(.7,0,.18,1)' },
    );
    await delay(zoomDuration);

    await animate(blackout, [{ opacity: 0 }, { opacity: 1 }], { duration: fadeDuration });

    boardScreen.style.display = 'none';
    bookScreen.style.display = 'grid';
    boardScreen.classList.remove('is-active');
    bookScreen.classList.add('is-active');
    pageFrame.src = `./content/${currentSection.folder}/pages/${currentSection.entry || 'index.html'}`;
    zoomAnimation.cancel();
    corkBoard.removeAttribute('style');

    await animate(blackout, [{ opacity: 1 }, { opacity: 0 }], { duration: 480 });
    isTransitioning = false;
  }

  async function leaveBook() {
    if (isTransitioning) return;
    isTransitioning = true;
    await animate(blackout, [{ opacity: 0 }, { opacity: 1 }], { duration: 250 });

    bookScreen.style.display = 'none';
    boardScreen.style.display = 'grid';
    bookScreen.classList.remove('is-active');
    boardScreen.classList.add('is-active');

    await animate(blackout, [{ opacity: 1 }, { opacity: 0 }], { duration: 350 });
    isTransitioning = false;
  }

  cards.forEach((card) => card.addEventListener('click', () => enterBook(card)));
  backToBoard.addEventListener('click', leaveBook);
  document.addEventListener('keydown', (event) => {
    if (!bookScreen.classList.contains('is-active')) return;
    if (event.key === 'Escape') leaveBook();
  });
})();
