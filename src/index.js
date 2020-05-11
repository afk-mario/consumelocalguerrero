import 'modern-css-reset';
import pdfjsLib from 'pdfjs-dist';

import './style.css';

let currentPageIndex = 0;
let pdfInstance = null;
let totalPagesCount = 0;

const pageMode = 1;

let elPageCurrent = null;
let elPageCount = null;
let elNext = null;
let elPrev = null;
let elFirst = null;
let elLast = null;

const container = document.querySelector('#viewport');

async function render() {
  const pagesHTML = `<canvas></canvas>`;
  container.innerHTML = pagesHTML;

  const page = await pdfInstance.getPage(currentPageIndex + 1);

  elPageCurrent.textContent = `${String(currentPageIndex + 1).padStart(
    2,
    '0'
  )}`;
  elPageCount.textContent = `/ ${totalPagesCount}`;

  let pdfViewport = page.getViewport({ scale: 1 });
  pdfViewport = page.getViewport({
    scale: container.offsetWidth / pdfViewport.width,
  });
  const canvas = container.children[0];
  const context = canvas.getContext('2d');
  canvas.height = pdfViewport.height;
  canvas.width = pdfViewport.width;

  page.render({
    canvasContext: context,
    viewport: pdfViewport,
  });
}

function handleNext() {
  if (currentPageIndex === totalPagesCount - 1) {
    return;
  }
  currentPageIndex += pageMode;
  if (currentPageIndex > totalPagesCount - 1) {
    currentPageIndex = totalPagesCount - 1;
  }
  render();
}

function handlePrev() {
  if (currentPageIndex === 0) {
    return;
  }
  currentPageIndex -= pageMode;
  if (currentPageIndex < 0) {
    currentPageIndex = 0;
  }
  render();
}

function handleFirst() {
  currentPageIndex = 0;
  render();
}

function handleLast() {
  currentPageIndex = totalPagesCount - 1;
  render();
}

function initPager() {
  elPrev = document.querySelector('#nav-prev');
  elNext = document.querySelector('#nav-next');

  elFirst = document.querySelector('#nav-first');
  elLast = document.querySelector('#nav-last');

  elPageCurrent = document.querySelector('#page-current');
  elPageCount = document.querySelector('#page-count');

  elPrev.addEventListener('click', handlePrev);
  elNext.addEventListener('click', handleNext);

  elFirst.addEventListener('click', handleFirst);
  elLast.addEventListener('click', handleLast);
}

pdfjsLib.getDocument('directorio.pdf').promise.then((pdf) => {
  pdfInstance = pdf;
  totalPagesCount = pdf.numPages;
  initPager();
  render();
  window.onresize = render;
});
