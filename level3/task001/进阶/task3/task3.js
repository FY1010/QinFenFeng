class QueryItems {
  constructor(domContainer) {
    this.list = domContainer
  }

  transformer(content) {
    if (/\s|\n|\r|,|，|、/.test(content)) {
      let tags = content.split(/\s|\n|\r|,|，|、/)
      if (tags.length === content.length) {
        return content.trim()
      }

      tags.filter(tag => {
        return tag.trim()
      })

      return tags
    }

    return content.trim()
  }

  insertEle(content) {
    const $item = document.createElement('div')
    $item.classList.add('item')
    $item.textContent = content

    this.list.appendChild($item)
    this.key && this.query(this.key)

    return $item
  }

  insert(content) {
    content = this.transformer(content)

    if (content && typeof content === 'string') { //如果是字符串直接插入
      this.insertEle(content)
    } else {
      for (let i = 0; i < content.length; i++) { //分别插入
        if (content[i]) {
          this.insertEle(content[i])
        }
      }
    }
  }

  query(key) {
    this.key = key
    let reg = new RegExp(`${key}`)
    for (let i = 0; i < this.list.children.length; i++) {
      this.list.children[i].classList.remove('active')
    }
    for (let i = 0; i < this.list.children.length; i++) {
      if (reg.test(this.list.children[i].textContent)) {
        this.list.children[i].classList.add('active')
      }
    }
  }
}
