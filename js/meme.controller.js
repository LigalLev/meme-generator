
let gElCanvas
let gCtx
let gCurrShape = 'text'

function onInit() {
  renderGallery()
  memeInit()
  // resizeCanvas()
  // renderMeme()
}


function memeInit() {
  gElCanvas = document.querySelector('#my-canvas')
  gCtx = gElCanvas.getContext('2d')
  console.log('gCtx', gCtx)

  // drawLine(0, 0, 130, 230)
  // drawText('HOLA!', gElCanvas.width / 2, gElCanvas.height / 2)

  // clearCanvas()

  // click on canvas
}

function renderMeme() {
  let currImg = getImgById(gMeme.selectedImgId)
  const img = new Image()
  img.src = currImg.url
  img.onload = () => {
    gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height) //img,x,y,xEnd,yEnd
    // drawText(onTextChange(txt))
    drawText(gMeme)
    const currLine = getSelectedLine()
    // (currLine.txt) 
      const y = currLine.pos.y
      const fontSize = currLine.size
      drawRect(50, y, 400, fontSize + 10)
    
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
  // Protect the image soo attacker could not download imgs from diff domain
  const data = gElCanvas.toDataURL() // For security reason you cannot do toDataUrl on tainted canvas
  // This protects users from having private data exposed by using images
  // to pull information from remote web sites without permission.
  elLink.href = data
  elLink.download = 'my-img.jpg'
}

function drawText() {
  const lines = gMeme.lines
  lines.forEach((line) => {
    gCtx.lineWidth = 2
    gCtx.strokeStyle = line.strokeColor
    gCtx.fillStyle = line.color
    gCtx.font = line.size + 'px ' + line.font
    // console.log('line:', line)
    gCtx.textAlign = line.align
    gCtx.textBaseline = 'middle'
    gCtx.fillText(line.txt, 50 + 5, line.pos.y +30)
  })

  // gCtx.fillText(text, 250, 50)
  // gCtx.fillText(text, 250, 50)
  // gCtx.fillText(text, x, y) // Draws (fills) a given text at the given (x, y) position.
  // gCtx.strokeText(text, x, y) // Draws (strokes) a given text at the given (x, y) position.
}

function drawRect(x, y, width, height) {
  // using the built in .fillRect() and .strokeRect() methods to directly
  // paint on the canvas, without using a path
  gCtx.strokeStyle = 'black'
  gCtx.lineWidth = 0.5
  gCtx.strokeRect(x, y, width, height)
  // gCtx.fillStyle = 'orange'
  // gCtx.fillRect(x, y, width, height)
}

function clearCanvas() {
  // Sets all pixels in the rectangle defined by starting point (x, y) and size (width, height)
  // to transparent black, erasing any previously drawn content.
  gCtx.clearText(0, 0, gElCanvas.width, gElCanvas.height)
  // You may clear part of the canvas
  // gCtx.clearRect(0, 0, gElCanvas.width / 2, gElCanvas.height / 2)
}

function onTextChange(elInput) {
  const text = elInput.value
  setLineTxt(text)
  renderMeme()
}
// function setShape(shape) {
//   gCurrShape = shape
// }

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
// onDraw(event)"
// function setStrokeColor(strokeColorValue) {
//   gMeme.strokeColor = strokeColorValue
// userperfs.controller}



function onSetLineColor(color) {
  setLineColor(color.value)
}
function onSetLineStrokeColor(strokeColor) {
  setLineStrokeColor(strokeColor.value)
}

// function onSetStrokeColor(strokeClr) {
//   setStrokeColor(strokeClr.value)
// }

function resizeCanvas() {
  const elContainer = document.querySelector('.canvas-container')
  // Note: changing the canvas dimension this way clears the canvas
  gElCanvas.width = elContainer.offsetWidth
  // Unless needed, better keep height fixed.
  // gElCanvas.height = elContainer.offsetHeight
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
  renderMeme()
  }

  function onSwitchLine (){
    switchLine()
    renderMeme()
  }

  function onDeleteLine(){
    deleteLine()
    renderMeme()
  }