let gKeywordSearchCountMap = { 'funny': 12, 'cat': 16, 'baby': 2 }

let gMeme
_createMeme()

function getMeme() {
    return gMeme
}

function addLine() {
    gMeme.lines.push(_createEmptyLine('', 40, 'left', 'balck', 'Arial', 0, 220))
    const linesLength = gMeme.lines.length
    console.log(linesLength)
    setSelectedLineIdx(linesLength - 1)
    console.log('lines:', gMeme)
}

function switchLine (){
    const linesLength = gMeme.lines.length
    const currLineIdx = getSelectedLineIdx()
    let nextLineIdx = currLineIdx+1
    if (linesLength === nextLineIdx) {
        nextLineIdx = 0
    }
    setSelectedLineIdx(nextLineIdx) 
}

function setLineTxt(text) {
    gMeme.lines[getSelectedLineIdx()].txt = text
}

function deleteLine(){
    const currLineIdx = getSelectedLineIdx()
    gMeme.lines.splice(currLineIdx, 1)
}

function setImg(id) {
    gMeme.selectedImgId = id
}

function setLineColor(colorValue) {
    let lineIdx = getSelectedLineIdx()
    gMeme.lines[lineIdx].color = colorValue
}
function setLineStrokeColor(strokeColorValue) {
    let lineIdx = getSelectedLineIdx()
    gMeme.lines[lineIdx].strokeColor = strokeColorValue
}

function getSelectedLine() {
    return gMeme.lines[getSelectedLineIdx()]
}

function getSelectedLineIdx() {
    return gMeme.selectedLineIdx
}

function setSelectedLineIdx(idx) {
    gMeme.selectedLineIdx = idx
}


function clearLines() {
    gMeme.lines = [
        _createEmptyLine('', 40, 'left', 'balck', 'Arial', 0, 20),// TODO- refactor code duplication
        _createEmptyLine('', 40, 'left', 'balck', 'Arial', 0, 440),
        // _createEmptyLine()
    ]
}

function _createEmptyLine(txt = '', size = 40, align = 'left', color = 'balck', font = 'Arial', x = 0, y = 20) {
    return {
        txt,
        size,
        align,
        color,
        font,
        pos: { x, y }
    }
}

// function moveLine(dx, dy) {
//     gCircle.pos.x += dx
//     gCircle.pos.y += dy
// }

function _createMeme(selectedImgId = 4, selectedLineIdx = 0) {
    gMeme = {
        selectedImgId,
        selectedLineIdx,
        lines: [
            _createEmptyLine('', 40, 'left', 'balck', 'Arial', 0, 20),
            _createEmptyLine('', 40, 'left', 'balck', 'Arial', 0, 440),
            // _createEmptyLine()
        ]
    }
    console.log('lines:', gMeme.lines[0].txt)
}

