const config = {
  WSSERVERENDPOINT: 'ws://localhost:8080',
  DEFAULTCOLOR: '#eee',
  ROWCOUNT: 500,
  COLCOUNT: 500,
}

function addMatrix() {
  const mat = document.getElementById("matrix")
  let strBldr = ""
  for (let x = 0; x < config.ROWCOUNT; x++) {
    strBldr += "<div class='gr'>"

    for (let y = 0; y < config.COLCOUNT; y++) {
      strBldr += `<div id='${x}-${y}' class='gc'></div>`
    }

    strBldr += '</div>'

  }
  mat.insertAdjacentHTML('beforeend', strBldr)
}

function wsInit() {
  const GREETING = "Client websocket opened"
  const FAREWELL = "Client websocket closed"
  const ERROR = "Client websocket errored"

  function setCellValue(payload) {
    const {x, y, c} = payload
    document.getElementById(`${x}-${y}`).style.backgroundColor = c
  }

  function setCellValues(values) {
    values.forEach((row, x) => {
      row.forEach((c, y) => {
        setCellValue({x, y, c})
      })
    })
  }

  function unpack(data) {
    const msg = JSON.parse(data)
    return [msg.action, msg.payload]
  }

  function dispatch(data) {
    const [action, payload] = unpack(data)
    dispatcher[action](payload)
  }

  const dispatcher = {
    'setTile': setCellValue,
    'setTiles': setCellValues,
    'setBoard': setCellValues // deprecated set board
  }

  const wsConn = new WebSocket(config.WSSERVERENDPOINT)

  function initEventListeners() {
    wsConn.addEventListener('open', (e) => {console.log(GREETING, e.data)})
    wsConn.addEventListener('message', (e) => { dispatch(e.data) })
    wsConn.addEventListener('close', (e) => {console.log(FAREWELL, e.data)})
    wsConn.addEventListener('error', (e) => {console.error(ERROR, e.data)})
  }

  initEventListeners()

}


function setTile(x, y, c, id=1) {
  fetch(`http://localhost:3000/setTile?x=${x}&y=${y}&c=${c}&id=${id}`, {
    method: 'Post',
    mode: 'no-cors',
  })
  .then(response => response)
  .then(x => { console.log(x.headers) })
}


function main() {
  addMatrix()
  wsInit()
}

main()
