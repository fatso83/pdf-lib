const promisify = require('util').promisify;
const fs = require('fs');
const writeFile = promisify(fs.writeFile);
const readFile = promisify(fs.readFile);
const buildPdf = require('./build-pdf');

async function getAsset(path) {
  return await readFile(path);
}

async function saveAsFile(fileName, pdfBytes) {
  const filePath = `${__dirname}/new.pdf`;
  await writeFile(filePath, pdfBytes);
  console.log(`PDF file written to: ${filePath}`);
}

buildPdf(getAsset, saveAsFile);
