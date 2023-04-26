

function onInit() {
  renderGallery()
  memeInit()
  // renderMeme()
  renderMeme(1)


}


let gElCanvas
let gCtx
let gCurrShape = 'text'

function memeInit() {
  gElCanvas = document.querySelector('#my-canvas')
  gCtx = gElCanvas.getContext('2d')
  console.log('gCtx', gCtx)

  // drawLine(0, 0, 130, 230)
  // drawText('HOLA!', gElCanvas.width / 2, gElCanvas.height / 2)

  // clearCanvas()

  // click on canvas
}

function renderMeme(id) {
  let currImg = getImgById(id)
  gMeme.selectedImgId = id
  let meme = getMeme()
  const img = new Image()
  img.src = currImg.url
  // const text = meme.lines[0].txt
  img.onload = () => {
    gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height) //img,x,y,xEnd,yEnd
    // drawText(onTextChange(txt))
    drawText(gMeme.lines[0].txt)
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


function drawText(text, x, y) {
  gCtx.lineWidth = 2
  gCtx.strokeStyle = 'white'
  gCtx.fillStyle = 'white'
  gCtx.font = '40px Arial'
  gCtx.textAlign = 'center'
  gCtx.textBaseline = 'middle'

  gCtx.fillText(text, 250, 50)
  // gCtx.fillText(text, x, y) // Draws (fills) a given text at the given (x, y) position.
  gCtx.strokeText(text, x, y) // Draws (strokes) a given text at the given (x, y) position.
}

function clearCanvas() {
  // Sets all pixels in the rectangle defined by starting point (x, y) and size (width, height)
  // to transparent black, erasing any previously drawn content.
  gCtx.clearRect(0, 0, gElCanvas.width, gElCanvas.height)
  // You may clear part of the canvas
  // gCtx.clearRect(0, 0, gElCanvas.width / 2, gElCanvas.height / 2)
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

function onTextChange(elInput) {
  console.log('event:', elInput)
  const text = elInput.value

  setLineTxt(text)
  renderMeme(1)  //TODO: REFACTOR RENDER MEME! should not receive any parameters at all
}