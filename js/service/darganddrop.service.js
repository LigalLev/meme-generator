let gCircle
let gEmoji
let isDrag = false

function creategEmoji(pos) {
  gCircle = {
    pos,
    size: 10,
    color: 'blue',
    isDrag: false
  }
}

function _createEmoji() {
  const emojiList = ['🎩', '🎁', '🥸', ' ❤️', '😊', '😀']

}

function getImoji (){
  return gEmoji
}

// function getCircle() {
//   return gCircle
// }

// //Check if the click is inside the circle 
// function isCircleClicked(clickedPos) {
//   const { pos } = emojiList[0]
//   // Calc the distance between two dots
//   const distance = Math.sqrt((pos.x - clickedPos.x) ** 2 + (pos.y - clickedPos.y) ** 2)
//   // console.log('distance', distance)
//   //If its smaller then the radius of the circle we are inside
//   return distance <= gCircle.size
// }
function isEmojiClicked(clickedPos) {
  const { pos } = emojiList[0]
  // Calc the distance between two dots
  const distance = Math.sqrt((pos.x - clickedPos.x) ** 2 + (pos.y - clickedPos.y) ** 2)
  // console.log('distance', distance)
  //If its smaller then the radius of the circle we are inside
  return distance <= gEmoji.size
}


// function setCircleDrag(isDrag) {
//   gCircle.isDrag = isDrag
// }
function setEmojiDrag(isDrag) {
  gEmoji.isDrag = isDrag
}


// Move the circle in a delta, diff from the pervious pos
// function moveCircle(dx, dy) {
//   // console.log('dx:', dx)
//   // console.log('dy:', dy)
//   gCircle.pos.x += dx
//   gCircle.pos.y += dy
// }
function moveEmoji(dx, dy) {
  // console.log('dx:', dx)
  // console.log('dy:', dy)
  gCircle.pos.x += dx
  gCircle.pos.y += dy
}

