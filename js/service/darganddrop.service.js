

function getStickersOnly(){
  const stickers = gMeme.lines.filter(line=>line.isSticker)
  return stickers
}

function isStickerClicked(clickedPos) {
  const stickers = getStickersOnly()
  for (let i = 0; i < stickers.length; i++) {
    const { pos } = stickers[i]
    // Calc the distance between two dots
    const distance = Math.sqrt((pos.x - clickedPos.x) ** 2 + (pos.y - clickedPos.y) ** 2)
    // console.log('distance', distance)
    //If its smaller then the radius of the circle we are inside
    if (distance <= stickers[i].size) {
      gMeme.selectedStickerIdx = i
      return true
    }
  }
  gMeme.selectedStickerIdx = -1
  return false

}



// function setCircleDrag(isDrag) {
//   gCircle.isDrag = isDrag
// }
// function setStickerDrag(isDrag) {
//   sticker.isDrag = true
// }

function moveSticker(dx, dy) {
  const stickers = getStickersOnly()
  // console.log('dx:', dx)
  // console.log('dy:', dy)
  stickers[ gMeme.selectedStickerIdx].pos.x += dx
  stickers[ gMeme.selectedStickerIdx].pos.y += dy
}

