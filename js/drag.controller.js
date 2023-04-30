'use strict'
/////controller
let gStartPos = {x:0, y:0}
const TOUCH_EVS = ['touchstart', 'touchmove', 'touchend']


function addListeners() {
  addMouseListeners()
  addTouchListeners()
  }

function addMouseListeners() {
  gElCanvas.addEventListener('mousedown', onDown)
  gElCanvas.addEventListener('mousemove', onMove)
  gElCanvas.addEventListener('mouseup', onUp)
}

function addTouchListeners() {
  gElCanvas.addEventListener('touchstart', onDown)
  gElCanvas.addEventListener('touchmove', onMove)
  gElCanvas.addEventListener('touchend', onUp)
}

function onDown(ev) {
  const pos = getEvPos(ev)
  if (!isStickerClicked(pos)) return
  gStartPos = pos
  document.body.style.cursor = 'grabbing'
}

function onMove(ev) {
  const  isDrag  = gMeme.selectedStickerIdx > -1
  if (!isDrag) return

  const pos = getEvPos(ev)
  const dx = pos.x - gStartPos.x
  const dy = pos.y - gStartPos.y
  moveSticker(dx, dy)
  gStartPos = pos
  renderMeme()
}

function onUp() {
  gMeme.selectedStickerIdx = -1
  document.body.style.cursor = 'grab'
}

function getEvPos(ev) {
  let pos = {
    x: ev.offsetX,
    y: ev.offsetY,
  }
  if (TOUCH_EVS.includes(ev.type)) {
    ev.preventDefault()
    ev = ev.changedTouches[0]
    pos = {
      x: ev.pageX - ev.target.offsetLeft - ev.target.clientLeft,
      y: ev.pageY - ev.target.offsetTop - ev.target.clientTop,
    }
  }
  return pos
}

