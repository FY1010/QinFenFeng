/* 数据格式演示
var aqiSourceData = {
  "北京": {
    "2016-01-01": 10,
    "2016-01-02": 10,
    "2016-01-03": 10,
    "2016-01-04": 10
  }
};
*/
const $wrap = document.querySelector('.aqi-chart-wrap')

// 以下两个函数用于随机模拟生成测试数据

function getDateStr(dat) {
  var y = dat.getFullYear();
  var m = dat.getMonth() + 1;
  m = m < 10 ? '0' + m : m;
  var d = dat.getDate();
  d = d < 10 ? '0' + d : d;
  return y + '-' + m + '-' + d;
}

function randomBuildData(seed) {
  var returnData = {};
  var dat = new Date("2016-01-01");
  var datStr = ''
  for (var i = 1; i < 92; i++) {
    datStr = getDateStr(dat);
    returnData[datStr] = Math.ceil(Math.random() * seed);
    dat.setDate(dat.getDate() + 1);
  }
  return returnData;
}

var aqiSourceData = {
  "北京": randomBuildData(500),
  "上海": randomBuildData(300),
  "广州": randomBuildData(200),
  "深圳": randomBuildData(100),
  "成都": randomBuildData(300),
  "西安": randomBuildData(500),
  "福州": randomBuildData(100),
  "厦门": randomBuildData(100),
  "沈阳": randomBuildData(500)
};

const cache = []

// 用于渲染图表的数据
var chartData = {};

// 记录当前页面的表单选项
var pageState = {
  nowSelectCity: -1,
  nowGraTime: "day"
}

/**
 * 渲染图表
 */

function renderChart() {
  $wrap.innerHTML = ''
  const $frag = document.createDocumentFragment()
  chartData.data.forEach(info => {
    const $div = document.createElement('div')
    $div.setAttribute('title', `${info.time}\n${info.airCondition.toFixed(1)}`)
    $div.classList.add('item')
    $div.style.height = info.airCondition / 500 * 100 + '%'
    $frag.appendChild($div)
  })
  $wrap.appendChild($frag)
}

/**
 * 日、周、月的radio事件点击时的处理函数
 */
function graTimeChange(graTime) {
  // 确定是否选项发生了变化
  if (graTime === pageState.nowGraTime) return
  // 设置对应数据
  pageState.nowGraTime = graTime
  initAqiChartData()

  // 调用图表渲染函数
  renderChart(pageState)
}

/**
 * select发生变化时的处理函数
 */
function citySelectChange(idx) {
  // 确定是否选项发生了变化
  if (idx === pageState.nowSelectCity) return
  // 设置对应数据
  pageState.nowSelectCity = idx
  initAqiChartData()

  // 调用图表渲染函数
  renderChart(pageState)
}

/**
 * 初始化日、周、月的radio事件，当点击时，调用函数graTimeChange
 */
function initGraTimeForm() {
  const $radioes = document.getElementsByName('gra-time')
  $radioes.forEach(radio => {
    radio.onchange = e => {
      graTimeChange(e.target.value)
    }
    if (radio.checked) {
      graTimeChange(radio.value)
    }
  })
}

/**
 * 初始化城市Select下拉选择框中的选项
 */
function initCitySelector() {
  // 读取aqiSourceData中的城市，然后设置id为city-select的下拉列表中的选项
  const selection = document.querySelector('#city-select')
  Reflect.ownKeys(aqiSourceData).forEach((city, i) => {
    cache[i] = city

    const $option = document.createElement('option')
    $option.textContent = city
    selection.appendChild($option)
  })
  // 给select设置事件，当选项发生变化时调用函数citySelectChange
  selection.onchange = e => {
    citySelectChange(e.target.selectedIndex)
  }
  if (selection.children.length) {
    pageState.nowSelectCity = 0
  }
}

/**
 * 初始化图表需要的数据格式
 */
function initAqiChartData() {
  // 将原始的源数据处理成图表需要的数据格式
  // 处理好的数据存到 chartData 中
  const city = cache[pageState.nowSelectCity]
  chartData.city = city
  const sourceData = aqiSourceData[city]

  switch (pageState.nowGraTime) {
    case "day":
      chartData.data = transformToDay()
      break
    case "week":
      chartData.data = transformToWeek()
      break
    case "month":
      chartData.data = transformToMonth()
      break
    default:
      break
  }

  function transformToDay() {
    const returnData = []
    Reflect.ownKeys(sourceData).forEach((date, i) => {
      returnData[i] = {
        time: date,
        airCondition: sourceData[date]
      }
    })
    return returnData
  }

  function transformToWeek() {
    let returnData = []

    const days = Reflect.ownKeys(sourceData)
    let start, end, sum = 0
    days.forEach((date, i) => {
      sum += sourceData[date]
      if (i % 7 === 0) { //一周开始
        sum = 0
        start = date
      }
      if (i % 7 === 6) { //一周结束
        end = date
        sum = sum / 7
      }
      returnData[parseInt(i / 7)] = {
        time: start + ' 到 ' + end,
        airCondition: sum
      }
    })
    return returnData
  }

  function transformToMonth() {
    let returnData = []

    const days = Reflect.ownKeys(sourceData)
    let start, end, sum = 0, j = 0, month = 0
    days.forEach((date, i) => {
      if (month !== Number(date.slice(5, 7))) {
        sum = j = 0
      }
      month = Number(date.slice(5, 7))
      sum += sourceData[date]
      j++

      returnData[month] = {
        time: month + '月',
        airCondition: sum / j
      }
    })
    return returnData
  }
}

/**
 * 初始化函数
 */
function init() {
  initGraTimeForm()
  initCitySelector();
  initAqiChartData();
}

init();
renderChart()
