'use strict'
let gImgs
let gId
_createImgs ()

  function _createImgs (){
    gImgs = [
    _createImg ('./img (square)/1.jpg', ['angry', 'man']),
    _createImg ('./img (square)/2.jpg', ['cute', 'dog']),
    _createImg ('./img (square)/3.jpg', ['cute', 'baby', 'dog', 'sleep']),
    _createImg ('./img (square)/4.jpg', ['cute', 'cat', 'animal', 'sleep']),
    _createImg ('./img (square)/5.jpg', ['cute', 'baby', 'tough']),
    _createImg ('./img (square)/6.jpg', ['man', 'smile']),
    _createImg ('./img (square)/7.jpg', ['cute', 'baby', 'suprise']),
    _createImg ('./img (square)/8.jpg', ['man', 'smile', 'obama']),
    _createImg ('./img (square)/9.jpg', ['cute', 'baby', 'laugh']),
    _createImg ( './img (square)/10.jpg', ['man', 'laugh']),
    _createImg ( './img (square)/11.jpg', ['man', 'hug', 'fight']),
    _createImg ( './img (square)/12.jpg', ['drink', 'man', 'leo']),
    _createImg ( './img (square)/13.jpg', ['point', 'man',]),
    _createImg ( './img (square)/14.jpg', ['sunglasses', 'man',]),
    _createImg ( './img (square)/15.jpg', ['zero', 'man',]),
    _createImg ( './img (square)/16.jpg', ['x-man', 'man', 'lught']),
    _createImg ( './img (square)/17.jpg', ['scary', 'man', 'dictator', 'putin']),
    _createImg ( './img (square)/18.jpg', ['toy story', 'man', 'woody', 'buzz', 'point']),
      ]
      
  }

function getImgs () {
    return gImgs
  }

function getImgById(id) {
    return gImgs.find((img) => img.id === id)
  }


function _createImg(url, keywords) {
    let img = {
        id: makeId(),
        url,
        keywords
    }
return img
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


