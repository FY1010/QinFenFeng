import './main.scss'

var html = require('html-withimg-loader!./index.html');

;(
  function (doc) {
    const img1 = require('./assets/item1.png')
    const img2 = require('./assets/item2.png')
    const img3 = require('./assets/item3.png')
    const img4 = require('./assets/item4.png')

    const logo_1 = require('./assets/logo_1.png')
    const logo_2 = require('./assets/logo_2.png')
    const logo_3 = require('./assets/logo_3.png')
    const logo_4 = require('./assets/logo_4.png')

    const imgs = [
      img1,
      img2,
      img3,
      img4
    ];
    const values = [
      '姓名',
      '年龄',
      '联系方式',
      '联系地址',
      '请简单描述您梦想的生活：'
    ]
    const logos = [
      logo_1,
      logo_2,
      logo_3,
      logo_4
    ]
    const $items = doc.getElementsByClassName('introls')[0].children
    for (let i = 0; i < $items.length; i++) {
      const $item = $items[i].getElementsByClassName('img')[0]
      $item.style.backgroundImage = `url(${imgs[i]})`
    }

    const $inputs = document.getElementsByClassName('input')
    for (let i = 0; i < $inputs.length; i++) {
      const input = document.createElement('input')
      input.placeholder = values[i]
      $inputs[i].appendChild(input)
    }

    const $logos = document.getElementsByClassName('logos')[0].children
    for (let i = 0; i < $logos.length; i++) {
      $logos[i].style.backgroundImage = `url(${logos[i]})`
    }
  }
)(document)
