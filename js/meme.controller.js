'use strict'
let gElCanvas
let gCtx


function onInit() {
  renderGallery()
  canvasInit()
  addListeners()
  renderStickersCarousel()
  
}

function canvasInit() {
  gElCanvas = document.querySelector('#my-canvas')
  gCtx = gElCanvas.getContext('2d')
  window.addEventListener('resize', resizeCanvas)
  resizeCanvas()
}

function renderMeme(elLink = null, isInitial = false) {
  let selectedImg = getImgById(gMeme.selectedImgId)
  const img = new Image()
  img.src = selectedImg.url
  img.onload = () => {
    if (isInitial) {
      resizeCanvas()
      createClearLines()
    }
    gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height) //img,x,y,xEnd,yEnd
    drawText(gMeme)
    const selectedLine = getSelectedLine()
    if (elLink) {
      downloadImg(elLink)
    }
    const y = selectedLine.pos.y
    const fontSize = selectedLine.size
    if (selectedLine.isSticker) {
      drawRect(selectedLine.pos.x-selectedLine.size*0.5, y - selectedLine.size / 2, selectedLine.size, selectedLine.size)
    } else {
      drawRect(gElCanvas.width * 0.1, y-fontSize*0.5*1.5, gElCanvas.width * 0.80, fontSize*(1.5))
    }
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
  const data = gElCanvas.toDataURL() 
  elLink.download = 'my-img.jpg'
}

function drawText() {
  const lines = gMeme.lines
  console.log('on dext draw the lines are:', lines)
  lines.forEach((line) => {
    if (!line.isSticker) {
      gCtx.lineWidth = 1
      gCtx.strokeStyle = line.strokeColor
      gCtx.fillStyle = line.color
      gCtx.font = `${line.size}px ${line.font}`
      const lineAlign = line.align
      gCtx.textAlign = lineAlign
      gCtx.textBaseline = 'middle'
      gCtx.fillText(line.txt, getPosXByAlign(lineAlign), line.pos.y)
      gCtx.strokeText(line.txt, getPosXByAlign(lineAlign), line.pos.y)
    } else {
      gCtx.fillText(line.txt, line.pos.x, line.pos.y)
    }
  })
}

function drawStickers() {
  const stickers = gMeme.stickers
  stickers.forEach((sticker) => {
    gCtx.fillText(sticker.emoji, sticker.pos.x, sticker.pos.y)
  })
}
function resizeCanvas() {
  const elContainer = document.querySelector('.canvas-container')
  gElCanvas.width = elContainer.offsetWidth
  gElCanvas.height = elContainer.offsetWidth
}

function drawRect(x, y, width, height) {
  gCtx.strokeStyle = 'black'
  gCtx.lineWidth = 0.5
  gCtx.strokeRect(x, y, width, height)
  // gCtx.fillRect(x, y, width, height)
}

function clearCanvas() {
  gCtx.clearText(0, 0, gElCanvas.width, gElCanvas.height)
}


function renderStickersCarousel() {
  let strHTML = ` <button class="btn-prevSticker" onclick="onPrevSticker()"><</button>`

  for (let i = 0; i < gStickersToShow; i++) {
    const stickerIndex = (gStickerIdx + i) % gStickers.length
    strHTML += ` <a class="btn btn-sticker" onclick="onStickerClicked(${stickerIndex})">${gStickers[stickerIndex]}</a>\n `
  }
  strHTML += `<button class="btn-nextSticker" onclick="onNextSticker()">></button>`

  const elStickerContainer = document.querySelector('.sticker-container')
  elStickerContainer.innerHTML = strHTML
}

function onNextSticker() {
  gStickerIdx++
  renderStickersCarousel()
}

function onPrevSticker() {
  if (gStickerIdx === 0) gStickerIdx = gStickers.length - 1
  gStickerIdx--
  renderStickersCarousel()
}


function drawImg() {
  const elImg = document.querySelector('img')
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
      return gElCanvas.width * 0.12
    case 'right':
      return gElCanvas.width * 0.88
    case 'center':
      return gElCanvas.width/2 //290
  }

}

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

function onStickerClicked(gStickerIdx) {
  addSticker(gStickerIdx)
  renderMeme()
}