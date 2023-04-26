var gKeywordSearchCountMap = { 'funny': 12, 'cat': 16, 'baby': 2 }

var gMeme
_createMeme()

function getMeme() {
    return gMeme
}

function setLineTxt(text) {
    gMeme.lines[0].txt = text
    
}

// function getLines() {
//     return gMeme.lines
//   }
  

function moveLine(dx, dy) {
    gCircle.pos.x += dx
    gCircle.pos.y += dy
  }

function _createMeme(selectedLineIdx = 0, txt = '', size = 20, align = 'left', color = 'red') {
    gMeme = {
        selectedImgId: 1,//gImgs.id,
        selectedLineIdx,
        lines: [
            {
                txt,
                size,
                align,
                color, 
            }
        
        ]
        
    }
console.log('lines:', gMeme.lines[0].txt)
}
