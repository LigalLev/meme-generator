'use strict'
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
  // console.log('gCtx', gCtx)

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
    gCtx.font = line.size + 'px ' + line.font
    // console.log('line:', line)
    const lineAlign = line.align
    gCtx.textAlign = lineAlign
    gCtx.textBaseline = 'middle'
    gCtx.fillText(line.txt, getPosXByAlign(lineAlign), line.pos.y +30)
    gCtx.strokeText(line.txt,getPosXByAlign(lineAlign), line.pos.y +30)
  })

  // gCtx.fillText(text, 250, 50)
  // gCtx.fillText(text, 250, 50)
  // gCtx.fillText(text, x, y) // Draws (fills) a given text at the given (x, y) position.
  // gCtx.strokeText(text, x, y) // Draws (strokes) a given text at the given (x, y) position.
}



function drawRect(x, y, width, height) {
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


function downloadImg(elLink) {
  console.log('elLink:', elLink)
  const imgContent = gElCanvas.toDataURL('image/jpeg') // image/jpeg the default format
  elLink.href = imgContent
}


// function resizeCanvas() {
//   const elContainer = document.querySelector('.canvas-container')
//   gElCanvas.width = elContainer.offsetWidth
//   gElCanvas.height = elContainer.offsetHeight
// }



function onTextChange(elInput) {
  const text = elInput.value
  setLineTxt(text)
  renderMeme()
}
// function setShape(shape) {
//   gCurrShape = shape
// }

function getPosXByAlign(align){
  switch(align){
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

function onSwitchLine() {
  switchLine()
  renderMeme()
}

function onDeleteLine() {
  deleteLine()
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

// UPLOAD IMG-------
  // function onUploadImg() {
  //   const imgDataUrl = gElCanvas.toDataURL('image/jpeg') // Gets the canvas content as an image format
  
  //   // A function to be called if request succeeds
  //   function onSuccess(uploadedImgUrl) {
  //       // Encode the instance of certain characters in the url
  //       const encodedUploadedImgUrl = encodeURIComponent(uploadedImgUrl)
  //       console.log(encodedUploadedImgUrl)
  //       window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodedUploadedImgUrl}&t=${encodedUploadedImgUrl}`)
  //   }
  //   // Send the image to the server
  //   doUploadImg(imgDataUrl, onSuccess)
  // }
  // function doUploadImg(imgDataUrl, onSuccess) {
  //   // Pack the image for delivery
  //   const formData = new FormData()
  //   formData.append('img', imgDataUrl)
  
  //   // Send a post req with the image to the server
  //   const XHR = new XMLHttpRequest()
  //   XHR.onreadystatechange = () => {
  //       // If the request is not done, we have no business here yet, so return
  //       if (XHR.readyState !== XMLHttpRequest.DONE) return
  //       // if the response is not ok, show an error
  //       if (XHR.status !== 200) return console.error('Error uploading image')
  //       const { responseText: url } = XHR
  //       // Same as
  //       // const url = XHR.responseText
  
  //       // If the response is ok, call the onSuccess callback function, 
  //       // that will create the link to facebook using the url we got
  //       console.log('Got back live url:', url)
  //       onSuccess(url)
  //   }
  //   XHR.onerror = (req, ev) => {
  //       console.error('Error connecting to server with request:', req, '\nGot response data:', ev)
  //   }
  //   XHR.open('POST', '//ca-upload.com/here/upload.php')
  //   XHR.send(formData)
  // }