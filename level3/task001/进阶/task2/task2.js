class ListExtended extends List { //继承上一题，重写createItem方法，input方法，转换器来弹窗
  constructor(config) {
    const {
      elem,
      input, //内部添加的容量
      size = 50,
      msCounter
    } = config
    if (!elem) throw '请输入容器的dom节点，key为elem'
    if (!input) throw '请输入设置value的dom节点，key为input'
    super(elem);

    if (msCounter && msCounter.nodeType === 1) {
      msCounter.oninput = e => {
        this.ms = Number(e.target.value) || 30
      }
    }
    this.ms = 30


    this.data = []
    this.size = size
    this.isAvailable = true
    input.oninput = e => {
      _list.value = e.target.value
    }
  }

  input(type) {
    if (!this.isAvailable) {
      this.toast('正在排序中...')
    } else if (this.data.length >= 50) {
      this.toast('数据不能超过50个')
    } else if (this.value && /^\d{1,2}(\.\d{1,})?$|^100$/.test(this.value)) {
      this[type] && this[type]()
    } else {
      this.toast('请输入100以内整数')
    }
  }

  use(type) {
    if (!this.isAvailable) {
      this.toast('正在排序中...')
    } else {
      this[type] && this[type]()
    }
  }

  push() {
    super.push();
    this.data.push(this.value)
  }

  pop() {
    super.pop();
    this.data.pop()
  }

  shift() {
    super.shift();
    this.data.shift()
  }

  unshift() {
    super.unshift();
    this.data.unshift(this.value)
  }

  createItem(val) {
    const $div = document.createElement('div')
    $div.classList.add('item')
    $div.setAttribute('data-val', val)
    $div.style.height = val + '%'
    return $div
  }

  transformToast(node) {
    return node.getAttribute('data-val')
  }

  putRandomData() {
    for (let i = 0; i < 50; i++) {
      this.data[i] = Math.random() * 100 + 1
    }
    this.render()
  }

  delay() {
    return new Promise(resolve => {
      setTimeout(resolve, this.ms)
    })
  }

  async sort(type) {
    if (!this.isAvailable) {
      this.toast('正在排序中...')
    } else {
      this.isAvailable = false
      this[type] && await this[type]()
      this.isAvailable = true
    }
  }

  async bubbleSort() {
    const data = this.data
    let curr = [], active = 0
    for (let i = 0; i < data.length - 1; i++) {
      for (let j = 0; j < data.length - i - 1; j++) {
        curr = [j, j + 1]
        if (data[j] > data[j + 1]) {
          //交换
          // [data[j], data[j + 1]] = [data[j + 1], data[j]]
          // this.render(curr) 直接render可以，但随后发现数据过多性能低下
          await this.swap(j, j + 1)
        }
      }
    }
    this.render()
  }

  clearStyle() {
    const items = this.list.children;
    for (let k = 0; k < items.length; k++) {
      items[k].classList.remove('curr')
      items[k].classList.remove('active')
    }
  }

  async swap(i, j, activePos) {
    await this.delay()
    this.clearStyle() //清除上一次的颜色
    const data = this.data;
    [data[i], data[j]] = [data[j], data[i]]
    const items = this.list.children;
    items[i] && items[i].classList.add('curr')
    items[j] && items[j].classList.add('curr')
    //交换数据
    items[activePos] && items[activePos].classList.add('active')

    // 交换dom
    // this.list.insertBefore(items[j], items[i])
    // if (items[j + 1]) {
    //   this.list.insertBefore(items[i + 1], items[j + 1])
    // } else {
    //   this.list.appendChild(items[i + 1])
    // }
    //改变dom高度
    this.list.children[i].style.height = data[i] + '%'
    this.list.children[j].style.height = data[j] + '%'
  }

  async quickSort(arr = this.data, L = 0, R = this.data.length - 1) {
    await this.qSort(arr, L, R)
    this.render()
  }

  async qSort(arr = this.data, L = 0, R = this.data.length - 1) {
    if (L >= R) return
    let i = L;
    let j = R;
    let pivot_index = L
    let tmp = arr[pivot_index]
    await this.swap(L, pivot_index, L)

    while (true) {
      while (i <= R && arr[i] <= tmp) {
        i++
      }
      while (j >= L + 1 && arr[j] >= tmp) {
        j--
      }
      if (i >= j) break;
      await this.swap(i, j, L)
      i++
      j--
    }
    await this.swap(L, j, L)
    await this.qSort(arr, L, j - 1)
    await this.qSort(arr, j + 1, R)
  }

  render(curr = [], active = -1) {
    this.list.innerHTML = '' //重新渲染
    // for (let i = 0; i < this.data.length; i++) {
    //   this.push()
    // } 性能太差
    const $frag = document.createDocumentFragment()
    for (let i = 0; i < this.data.length; i++) {
      const $item = document.createElement('div')
      $item.classList.add('item')
      $item.setAttribute('data-val', this.data[i].toFixed(2))
      $item.setAttribute('title', this.data[i].toFixed(2))
      $item.style.height = this.data[i].toFixed(2) + '%'
      $frag.appendChild($item)
    }
    this.list.appendChild($frag)
  }
}

// const _list = new ListExtended($wrap, $input)




