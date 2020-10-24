class List {
  constructor(elem) {
    this.list = elem
    this.value = ''
  }

  input(type) {
    if (this.value && (/\d{1,}/.test(this.value))) {
      this[type]()
    } else {
      this.toast('请输入数字')
    }
  }

  transformToast(node) {
    return node.textContent
  }

  toast(msgOrNode = '当前无元素') {  //弹窗，msg为弹窗内容
    let msg = ''
    if (typeof msgOrNode === 'string') {
      msg = msgOrNode
    } else {
      msg = this.transformToast(msgOrNode)  //为了复用，做一个转换器转换信息
    }
    const $toast = document.createElement('div')
    $toast.classList.add('toast')
    $toast.textContent = msg
    document.body.appendChild($toast)
    setTimeout(() => {
      document.body.removeChild($toast)
    }, 3000)
  }

  createItem() {
    const $div = document.createElement('div')
    $div.classList.add('item')
    $div.textContent = this.value
    return $div
  }

  unshift() {
    this.list.insertBefore(this.createItem(this.value), this.list.firstChild)
  }

  shift() {
    if (!this.list.children.length) {
      this.toast()
    } else {
      this.toast(this.list.firstChild)
      this.list.removeChild(this.list.firstChild)
    }
  }

  pop() {
    if (!this.list.children.length) {
      this.toast()
    } else {
      this.toast(this.list.lastChild)
      this.list.removeChild(this.list.lastChild)
    }
  }

  push() {
    this.list.appendChild(this.createItem(this.value))
  }
}
