'use strict'
let gElCanvas
let gCtx
const gStickers = ['😅', '😎', '😍', '😘', '🥰', '📔', '🎩', '🎁', '🥸', ' ❤️', '😊', '😀']
const gStickersToShow = 3
let gStickerIdx = 0

function onInit() {
  renderGallery()
  canvasInit()
  renderStickersCarousel()
  // renderMeme()
}

function canvasInit() {
  gElCanvas = document.querySelector('#my-canvas')
  gCtx = gElCanvas.getContext('2d')
  // console.log('gCtx', gCtx)
  // drawImg()
  // renderMeme(elLink)
  // clearCanvas()


  window.addEventListener('resize', resizeCanvas)
  resizeCanvas()

  // click on canvas
}

function renderMeme(elLink = null, isInitial = false) {
  let currImg = getImgById(gMeme.selectedImgId)
  const img = new Image()
  img.src = currImg.url
  img.onload = () => {
    if (isInitial) {
      resizeCanvas()
      clearLines()
    }
    gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height) //img,x,y,xEnd,yEnd
    // drawText(onTextChange(txt))
    drawText(gMeme)
    const currLine = getSelectedLine()
    // (currLine.txt) 
    if (elLink) {
      downloadImg(elLink)
    }
    const y = currLine.pos.y
    const fontSize = currLine.size
    drawRect(50, y, gElCanvas.width - 100, fontSize + 10)

    // drawRect(50 ,440, 400 ,40)
    // drawRect(50 ,220, 400 ,40)
  }
}

function drawImgFromRemote() {
  const img = new Image()
  img.src = 'https://cdn.pixabay.com/photo/2023/01/23/13/37/flowers-7738726_1280.jpg'
  img.onload = () => {
    gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
  }
}

function downloadCanvas(elLink) {
  const data = gElCanvas.toDataURL() // For security reason you cannot do toDataUrl on tainted canvas
  elLink.href = data
  elLink.download = 'my-img.jpg'
}

function drawText() {
  const lines = gMeme.lines
  lines.forEach((line) => {
    gCtx.lineWidth = 1
    gCtx.strokeStyle = line.strokeColor
    gCtx.fillStyle = line.color
    gCtx.font = `${line.size}px ${line.font}`
    // console.log('line:', line)
    const lineAlign = line.align
    gCtx.textAlign = lineAlign
    gCtx.textBaseline = 'middle'
    gCtx.fillText(line.txt, getPosXByAlign(lineAlign), line.pos.y + 30)
    gCtx.strokeText(line.txt, getPosXByAlign(lineAlign), line.pos.y + 30)
  })
}

function resizeCanvas() {
  const elContainer = document.querySelector('.canvas-container')
  // Note: changing the canvas dimension this way clears the canvas
  gElCanvas.width = elContainer.offsetWidth
  // Unless needed, better keep height fixed.
  gElCanvas.height = elContainer.offsetWidth
}

function drawRect(x, y, width, height) {
  gCtx.strokeStyle = 'black'
  gCtx.lineWidth = 0.5
  gCtx.strokeRect(x, y, width, height)
  // gCtx.fillRect(x, y, width, height)
}

function clearCanvas() {
  // Sets all pixels in the rectangle defined by starting point (x, y) and size (width, height)
  // to transparent black, erasing any previously drawn content.
  gCtx.clearText(0, 0, gElCanvas.width, gElCanvas.height)
  // You may clear part of the canvas
  // gCtx.clearRect(0, 0, gElCanvas.width / 2, gElCanvas.height / 2)
}


function renderStickersCarousel() {
  let strHTML = ` <button class="prevSticker" onclick="onPrevSticker()"><</button>`
  for (let i = 0; i < gStickersToShow; i++) {
    strHTML += ` <button class="btn-sticker" onclick="onStickerClicked(${i})">${gStickers[(gStickerIdx + i) % gStickers.length]}</button>\n `
  }
  strHTML += `<button class="nextSticker" onclick="onNextSticker()">></button>`

  const elStickerContainer = document.querySelector('.sticker-container')
  elStickerContainer.innerHTML = strHTML
}

function onNextSticker() {
  gStickerIdx++
  renderStickersCarousel()
}

function onPrevSticker() {
  gStickerIdx--
  renderStickersCarousel()
}


// function renderStickers() {
//   let strHTMLs = [`<button class="btn-sticker-prev" onclick="onScrollStickers(-1)"><</button>`];

//   const stickers = getStickersForDisplay();

// gStickers.forEach((sticker)=>{

// })

//   for (let i = 0; i < 4; i++) {
//       const className = (stickers[i] === '❤') ? 'sticker heart' : 'sticker';
//       strHTMLs.push(`<span class="${className}" onclick="onAddSticker(this.innerText)">${stickers[i]}</span>`);
//   }

//   strHTMLs.push(`<button class="btn-sticker-next" onclick="onScrollStickers(1)">></button>`);

//   document.querySelector('.control-stickers').innerHTML = strHTMLs.join('');
// }

// function getStickersForDisplay() {
//   if (gStickerIdx + 2 < gStickers.length) {
//       return gStickers.slice(gStickerIdx, gStickerIdx + 3);
//   } else {
//       const gap = gStickers.length - gStickerIdx;
//       return gStickers.slice(gStickerIdx, gStickerIdx + gap).concat(gStickers.slice(0, 3 - gap));
//   }
// }

// function onScrollStickers(diff) {
//   gStickerIdx += diff;
//   if (gStickerIdx === -1) {
//       gStickerIdx = gStickers.length - 1;
//   }
//   if (gStickerIdx === gStickers.length) gStickerIdx = 0;
//   renderStickers();
// }

function drawImg() {
  const elImg = document.querySelector('img')
  // Naive approach:
  // there is a risk that image is not loaded yet and nothing will be drawn on canvas
  gCtx.drawImage(elImg, 0, 0, gElCanvas.width, gElCanvas.height) // Draws the specified image
}


function downloadImg(elLink) {
  console.log('elLink:', elLink)
  const imgContent = gElCanvas.toDataURL('image/jpeg') // image/jpeg the default format
  elLink.href = imgContent
}

function onDownloadImg(elLink) {
  renderMeme(elLink)
}

function onTextChange(elInput) {
  const text = elInput.value
  setLineTxt(text)
  renderMeme()
}
// function setShape(shape) {
//   gCurrShape = shape
// }

function getPosXByAlign(align) {
  switch (align) {
    case 'left':
      return 55
    case 'right':
      return 445
    case 'center':
      return 250
  }

}


// function onDraw(ev) {
//   const { offsetX, offsetY } = ev
//   console.log(' offsetX, offsetY', offsetX, offsetY)
//   switch (gCurrShape) {
//     case 'text':
//       drawText('meme', offsetX, offsetY)
//       break
//     case 'line':
//       drawLine(offsetX, offsetY)
//       break
//   }
// }



function onSetLineColor(color) {
  setLineColor(color.value)
  renderMeme()
}
function onSetLineStrokeColor(strokeColor) {
  setLineStrokeColor(strokeColor.value)
  renderMeme()
}

function onIncreaseFont() {
  const line = getSelectedLine()
  line.size++
  renderMeme()
}

function onDecreaseFont() {
  const line = getSelectedLine()
  line.size--
  renderMeme()
}

function onAddLine() {
  addLine()
  clearTxtInput()
  renderMeme()
}

function onSwitchLine() {
  switchLine()
  const text = getLineTxt()
  setTxtInput(text)

  renderMeme()
}

function onDeleteLine() {
  deleteLine()
  clearTxtInput()
  renderMeme()
}

function onSetAlign(align) {
  setAlign(align)
  renderMeme()
}

function onFontChange(elFont) {
  console.log('elfont:', elFont.value)
  gMeme.lines[getSelectedLineIdx()].font = elFont.value
  renderMeme()
}

function clearTxtInput() {
  setTxtInput("")
}

function setTxtInput(text) {
  const elText = document.querySelector('[name="text"]')
  elText.value = text
}

