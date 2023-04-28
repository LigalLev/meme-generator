'use strict'

function renderGallery() {
  let imgs = getImgs()
  let strHtmls = imgs.map(img => {
    return `
      <a  onclick="onImgSelect('${img.id}')">
      <img src="${img.url}" class="meme-img"/>
          </a>`
  })
  document.querySelector('.img-gallery-container').innerHTML = strHtmls.join('')
}

function onImgSelect(id) {
  setImg(id)
  clearLines()
  clearTxtInput()
  const elImgGallery = document.querySelector('.img-gallery')
  elImgGallery.classList.add('hide')

  const elMemeEditor = document.querySelector('.meme-editor')
  elMemeEditor.classList.remove('hide')
  renderMeme()
}

// function renderKeywords(){
//   let imgs = getImgs()
//   let strHtmls = imgs.map(img => {
//       return `<span class="img-description">${img.keywords}</span>`

//   })
//    document.querySelector('[name=keywords]').innerHTML = strHtmls.join('')
//  }


function onGalleryBtn(){
  showPage('.img-gallery')
  renderGallery()
}

function onAboutBtn() {
  showPage('.about-container')
}

function showPage(pageClassName) {
  const pageClassNames = ['.img-gallery', '.meme-editor', '.about-container']
  pageClassNames.forEach(name => {
    let elPageClassName = document.querySelector(name)
    if (pageClassName === name) {
      elPageClassName.classList.remove('hide')
    } else {
      elPageClassName.classList.add('hide')
    }
  });
}