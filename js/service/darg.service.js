function getStickersOnly(){
  const stickers = gMeme.lines.filter(line=>line.isSticker)
  return stickers
}

function isStickerClicked(clickedPos) {
  const stickers = getStickersOnly()
  for (let i = 0; i < stickers.length; i++) {
    const { pos } = stickers[i]
    const distance = Math.sqrt((pos.x - clickedPos.x) ** 2 + (pos.y - clickedPos.y) ** 2)
    if (distance <= stickers[i].size) {
      gMeme.selectedStickerIdx = i
      return true
    }
  }
  gMeme.selectedStickerIdx = -1
  return false

}

function moveSticker(dx, dy) {
  const stickers = getStickersOnly()
  stickers[ gMeme.selectedStickerIdx].pos.x += dx
  stickers[ gMeme.selectedStickerIdx].pos.y += dy
}

