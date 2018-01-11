const GREETING = "Client websocket opened"
const FAREWELL = "Client websocket closed"
const ERROR = "Client websocket errored"

const wsConn = new WebSocket(config.WSSERVERENDPOINT)

function unpack(data) {
  const msg = JSON.parse(data)
  return [msg.action, msg.payload]
}

function dispatch(data) {
  const [action, payload] = unpack(data)
  dispatcher[action](payload)
}

function pack(action, payload) {
  return JSON.stringify({'action': action, 'payload': payload})
}

function send(action, payload) {
  const msg = pack(action, payload)
  wsConn.send(msg)
}

function initEventListeners() {
  wsConn.addEventListener('open', (e) => {console.log(GREETING, e.data)})

  wsConn.addEventListener('message', (e) => {dispatch(e.data)})

  wsConn.addEventListener('close', (e) => {console.log(FAREWELL, e.data)})

  wsConn.addEventListener('error', (e) => {console.error(ERROR, e.data)})
}

(function init() {
  initEventListeners()
})()
