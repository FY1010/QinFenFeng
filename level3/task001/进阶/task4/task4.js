class LoveTags extends QueryItems {
  constructor(props) {
    super(props);
    this.cache = []
  }

  remove(node) {
    const idx = this.cache.indexOf(node.mapValue)
    this.cache.splice(idx, 1)
    this.list.removeChild(node)
  }

  insertEle(content) {
    if (this.cache.includes(content)) return

    const $item = super.insertEle(content)
    this.cache.push($item.textContent)
    $item.mapValue = $item.textContent
    const $delete = document.createElement('div')
    $item.appendChild($delete)
    $delete.textContent = '删除'
    $delete.classList.add('hide')

    $item.onmouseover = () => {
      $delete.classList.add('delete-option')
    }
    $item.onmouseout = () => {
      $delete.classList.add('hide')
      $delete.classList.remove('delete-option')
    }
    $delete.onclick = () => {
      this.remove($item)
    }

    if (this.cache.length > 10) {
      this.remove(this.list.children[0])
    }
  }

}
