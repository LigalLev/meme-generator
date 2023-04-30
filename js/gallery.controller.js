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
  console.log("on image select canvas height is: "  +gElCanvas.height);
  setImg(id)
  clearTxtInput()
  const elImgGallery = document.querySelector('.img-gallery')
  elImgGallery.classList.add('hide')
  const elAbout = document.querySelector('.about')
  console.log( '.about')
  const el = document.querySelector('.about')
  el.style.display = 'none'
  elAbout.classList.add('hide')

  const elMemeEditor = document.querySelector('.meme-editor')
  elMemeEditor.classList.remove('hide')
  renderMeme(null, true)
}

function onGalleryBtn(){
  showPage('.img-gallery')
  const el = document.querySelector('.about')
  el.style.display = 'flex'
  renderGallery()
}

function onAboutBtn() {
  const el = document.querySelector('.about')
  el.style.display = 'none'
  showPage('.about-container')
}

function showPage(pageClassName) {
  const pageClassNames = ['.img-gallery', '.meme-editor', '.about-container', '.about']
  pageClassNames.forEach(name => {
    let elPageClassName = document.querySelector(name)
    if (pageClassName === name) {
      elPageClassName.classList.remove('hide')
    } else {
      elPageClassName.classList.add('hide')
    }
  })
}