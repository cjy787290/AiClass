(function () {
  const boardScreen = document.querySelector('#board-screen');
  const bookScreen = document.querySelector('#book-screen');
  const blackout = document.querySelector('#blackout');
  const corkBoard = document.querySelector('.cork-board');
  const reviewCard = document.querySelector('[data-action="review"]');
  const backToBoard = document.querySelector('#back-to-board');
  const prevButton = document.querySelector('#prev-page');
  const nextButton = document.querySelector('#next-page');
  const pageCounter = document.querySelector('#page-counter');
  const pageFrame = document.querySelector('#page-frame');

  const totalPages = 10;
  let currentPage = 1;
  let isTurning = false;

  const pageSources = [
    '20260519_Engineering_Information.html',
    '20260519_Engineering_InformationD1-D3.html',
    '20260605_informationSecurity.html',
    '20260612_informationSecurityPart2.html',
    '20260618_ImgCreate.html',
    '20260706_AWS_Quick.html',
    '20260717＆0720&0727_copilot.html',
    'index.html',
    'index.html',
    'index.html',
  ];

  function pageUrl(pageNumber) {
    const folderName = `page-${String(pageNumber).padStart(2, '0')}`;
    const fileName = pageSources[pageNumber - 1];
    return `./content/course-review/pages/${folderName}/${fileName}`;
  }

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

  function setFrame(pageNumber) {
    if (pageNumber < 1 || pageNumber > totalPages) {
      pageFrame.removeAttribute('src');
      pageFrame.classList.add('is-empty');
      return;
    }

    const nextUrl = pageUrl(pageNumber);
    if (pageFrame.getAttribute('src') !== nextUrl) {
      pageFrame.src = nextUrl;
    }
    pageFrame.classList.remove('is-empty');
  }

  function renderPage() {
    setFrame(currentPage);
    pageCounter.textContent = `${currentPage} / ${totalPages}`;
    prevButton.disabled = currentPage === 1 || isTurning;
    nextButton.disabled = currentPage === totalPages || isTurning;
  }

  async function turnPage(direction) {
    if (isTurning) return;

    const nextPage = currentPage + direction;
    if (nextPage < 1 || nextPage > totalPages) return;

    isTurning = true;
    renderPage();

    await animate(
      pageFrame,
      [
        { opacity: 1, transform: 'translateX(0) scale(1)' },
        { opacity: 0, transform: `translateX(${direction > 0 ? -42 : 42}px) scale(.985)` },
      ],
      { duration: 220, easing: 'cubic-bezier(.4,0,.2,1)' },
    );

    currentPage = nextPage;
    renderPage();

    await animate(
      pageFrame,
      [
        { opacity: 0, transform: `translateX(${direction > 0 ? 42 : -42}px) scale(.985)` },
        { opacity: 1, transform: 'translateX(0) scale(1)' },
      ],
      { duration: 360, easing: 'cubic-bezier(.2,.8,.2,1)' },
    );

    pageFrame.removeAttribute('style');
    isTurning = false;
    renderPage();
  }

  async function enterBook() {
    const rect = reviewCard.getBoundingClientRect();
    const boardRect = corkBoard.getBoundingClientRect();
    const photoCenterX = rect.left + rect.width / 2;
    const photoCenterY = rect.top + rect.height / 2;
    const viewportCenterX = window.innerWidth / 2;
    const viewportCenterY = window.innerHeight / 2;
    const scale = Math.max(3.4, Math.min(5.2, window.innerWidth / rect.width));
    const x = viewportCenterX - photoCenterX;
    const y = viewportCenterY - photoCenterY;

    corkBoard.style.transformOrigin = `${photoCenterX - boardRect.left}px ${photoCenterY - boardRect.top}px`;

    const zoomAnimation = startAnimation(
      corkBoard,
      [
        {
          filter: 'brightness(1)',
          transform: 'translate(0, 0) scale(1)',
        },
        {
          filter: 'brightness(0.72)',
          transform: `translate(${x}px, ${y}px) scale(${scale})`,
        },
      ],
      { duration: 1350, easing: 'cubic-bezier(.7,0,.18,1)' },
    );
    await delay(1350);

    await animate(blackout, [{ opacity: 0 }, { opacity: 1 }], { duration: 250 });

    boardScreen.style.display = 'none';
    bookScreen.style.display = 'grid';
    boardScreen.classList.remove('is-active');
    bookScreen.classList.add('is-active');
    currentPage = 1;
    renderPage();
    zoomAnimation.cancel();
    corkBoard.removeAttribute('style');

    await animate(blackout, [{ opacity: 1 }, { opacity: 0 }], { duration: 480 });
  }

  async function leaveBook() {
    await animate(blackout, [{ opacity: 0 }, { opacity: 1 }], { duration: 250 });

    bookScreen.style.display = 'none';
    boardScreen.style.display = 'grid';
    bookScreen.classList.remove('is-active');
    boardScreen.classList.add('is-active');

    await animate(blackout, [{ opacity: 1 }, { opacity: 0 }], { duration: 350 });
  }

  reviewCard.addEventListener('click', enterBook);
  backToBoard.addEventListener('click', leaveBook);
  prevButton.addEventListener('click', () => turnPage(-1));
  nextButton.addEventListener('click', () => turnPage(1));

  document.addEventListener('keydown', (event) => {
    if (!bookScreen.classList.contains('is-active')) return;
    if (event.key === 'ArrowLeft') turnPage(-1);
    if (event.key === 'ArrowRight') turnPage(1);
    if (event.key === 'Escape') leaveBook();
  });

  renderPage();
})();
