

function renderGallery() {
  let imgs = getImgs()
  let strHtmls = imgs.map(img => {
      return `
      <a class="card-layout"  onclick=renderMeme(this${img.id})">
      <img src="${img.url}" class="meme-img"/>
          </a>`  
  })
  document.querySelector('.img-gallery-container').innerHTML = strHtmls.join('')
}

// function renderKeywords(){
//   let imgs = getImgs()
//   let strHtmls = imgs.map(img => {
//       return `<span class="img-description">${img.keywords}</span>`
      
//   })
//    document.querySelector('[name=keywords]').innerHTML = strHtmls.join('')
//  }



// function renderMeme(){
//    let meme = getMeme()

//    let strHTML = `<canvas id="my-canvas" width="500" height="500" style="outline: 1px solid green" 
//    onclick="onDraw(event)"></canvas> `

//    let gElCanvas = document.querySelector ('.canvas-container')
//     gElCanvas.innerHTML = strHTML
// }
