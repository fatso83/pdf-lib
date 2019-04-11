const buildPdf = require('./build-pdf');

/** @returns {Uint8Array} the asset as an array of unsigned bytes */
async function getAsset(path) {
  const response = await fetch(path);
  const arrayBuffer = await response.arrayBuffer();
  return new Uint8Array(arrayBuffer);
}

async function saveAsFile(fileName, pdfBytes) {
  const blob = new Blob([pdfBytes]);
  const blobUrl = URL.createObjectURL(blob);

  // trigger download - alternatively you could create a link
  // using the fileName passed in as an attribute on the link
  // See https://stackoverflow.com/a/25911218/200987
  window.location.replace(blobUrl);
}

function initEventHandlers() {
  const el = document.getElementById('generate-button');
  el.addEventListener('click', (_e) => {
    buildPdf(getAsset, saveAsFile);
  });
}

initEventHandlers();
