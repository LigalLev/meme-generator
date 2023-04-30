'use strict'
const gStickers = ['😅', '😎', '😍', '😘', '🥰', '📔', '🎩', '🎁', '🥸', ' ❤️', '😊', '😀']
const gStickersToShow = 4
let gStickerIdx = 0
let gKeywordSearchCountMap = { 'funny': 12, 'cat': 16, 'baby': 2 }

let gMeme
_createMeme()

function addSticker(stickerIdx,) {
    const sticker = _createSticker(gStickers[stickerIdx])
    gMeme.lines.push(sticker)

}

function _createSticker(emoji) {
    return {
        pos: { x: gElCanvas.width / 2, y: gElCanvas.height / 2 },
        size: 40,
        txt: emoji,
        isSticker: true
    }
}

function getStickers() {
    return gStickers
}

function getMeme() {
    return gMeme
}
function setAlign(align) {
    const currLineIdx = getSelectedLineIdx()
    gMeme.lines[currLineIdx].align = align
}


function addLine() {
    const txtLines = gMeme.lines.filter((line) => !line.isSticker)
    if (txtLines.length > 2) return
    const yPos = findAviableYPos()
    gMeme.lines.push(_createEmptyLine('Enter Text', 30, 'center', 'white', 'black', 'impact', 0, yPos))
    const linesLength = gMeme.lines.length
    console.log(linesLength)
    setSelectedLineIdx(linesLength - 1)
    console.log('lines:', gMeme)
}

function findAviableYPos() {
    const txtLines = gMeme.lines.filter((line) => !line.isSticker)
    let isLineFound = true
    isLineFound = txtLines.find((line) => {
        return line.pos.y === gElCanvas.height * 0.1
    })
    if (!isLineFound) {
        return gElCanvas.height * 0.1
    }

    isLineFound = txtLines.find((line) => {
        return line.pos.y === gElCanvas.height * (1-0.1)
    })
    if (!isLineFound) {
        return gElCanvas.height * (1-0.1)
    }

    isLineFound = txtLines.find((line) => {
        return line.pos.y === gElCanvas.height / 2
    })
    if (!isLineFound) {
        return gElCanvas.height / 2
    }
}

function switchLine() {
    const linesLength = gMeme.lines.length
    const currLineIdx = getSelectedLineIdx()
    let nextLineIdx = currLineIdx + 1
    if (linesLength === nextLineIdx) {
        nextLineIdx = 0
    }
    setSelectedLineIdx(nextLineIdx)
}

function setLineTxt(text) {
    gMeme.lines[getSelectedLineIdx()].txt = text
}

function getLineTxt() {
    return getSelectedLine().txt
}

function deleteLine() {
    const currLineIdx = getSelectedLineIdx()
    gMeme.lines.splice(currLineIdx, 1)
    let nextLineIdx = currLineIdx + 1
    if (nextLineIdx >= gMeme.lines.length) {
        nextLineIdx = 0
    }
    setSelectedLineIdx(nextLineIdx)
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


function createClearLines() {
    gMeme.lines = [
        _createEmptyLine('Enter text here', 30, 'center', 'white', 'black', 'impact', 0, gElCanvas.height*0.1),// TODO- refactor code duplication
        _createEmptyLine('Enter more text here', 30, 'center', 'white', 'black', 'impact', 0, gElCanvas.height*(1-0.1)),
    ]
    console.log('g:', gElCanvas.height)
}

function _createEmptyLine(txt = 'Enter Text here', size = 30, align = 'center', color = 'white', strokeColor = 'black', font = 'impact', x = 0, y = 20) {
    return {
        txt,
        size,
        align,
        color,
        strokeColor,
        font,
        pos: { x, y }
    }
}

// function moveLine(dx, dy) {
//     gCircle.pos.x += dx
//     gCircle.pos.y += dy
// }

function _createMeme(selectedImgId = 4, selectedLineIdx = 0, selectedStickerIdx = -1) {
    gMeme = {
        selectedImgId,
        selectedLineIdx,
        selectedStickerIdx,
        lines: [],
        stickers: []
    }
}

