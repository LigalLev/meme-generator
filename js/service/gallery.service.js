let gImgs

_createImgs ()

  function _createImgs (){
     gImgs = [
        { id: 1, url: './img (square)/1.jpg', keywords: ['angry', 'man'] }, 
        { id: 2, url: './img (square)/2.jpg', keywords: ['cute', 'dog'] },
        { id: 3, url: './img (square)/3.jpg', keywords: ['cute', 'baby', 'dog', 'sleep'] },
        { id: 4, url: './img (square)/4.jpg', keywords: ['cute', 'cat', 'animal', 'sleep'] },
        { id: 5, url: './img (square)/5.jpg', keywords: ['cute', 'baby', 'tough'] },
        { id: 6, url: './img (square)/6.jpg', keywords: ['man', 'smile'] },
        { id: 7, url: './img (square)/7.jpg', keywords: ['cute', 'baby', 'suprise'] },
        { id: 8, url: './img (square)/8.jpg', keywords: ['man', 'smile', 'obama'] },
        { id: 9, url: './img (square)/9.jpg', keywords: ['cute', 'baby', 'laugh'] },
        { id: 10, url: './img (square)/10.jpg', keywords: ['man', 'laugh'] },
        { id: 11, url: './img (square)/11.jpg', keywords: ['man', 'hug', 'fight'] },
        { id: 12, url: './img (square)/12.jpg', keywords: ['drink', 'man', 'leo'] },
        { id: 13, url: './img (square)/13.jpg', keywords: ['point', 'man',] },
        { id: 14, url: './img (square)/14.jpg', keywords: ['sunglasses', 'man',] },
        { id: 15, url: './img (square)/15.jpg', keywords: ['zero', 'man',] },
      ];
      
  }

function getImgs () {
    return gImgs

  }

function getImgById(id) {
    return gImgs.find((img) => img.id === id)
  }

function onImgSelect(id) {
  setImg(id);
  renderMeme();
}


function _createImg(id = 1, url = 'img/1.jpg') {
    img = {
        id,
        url,
        keywords
    }

}

  // function renderGallery() {
  //   const imgGallery = document.querySelector('.img-gallery-container')
  //   let strHTML = ""
  //   gImgs.forEach((img) => {
  //     strHTML += `<img onclick="renderMeme('${img.id}') src="${img.url}" alt="">`
  // console.log('img:', img.url)
     
  //     })
  //     imgGallery.innerHTML = strHTML
  //   }

// function getImgIdx(idx){
//     return gImgs.find((img) => img[i] === meme.selectedImgId)
// }
