var count = 0
var startTime = Date.now()

function setTile(x, y, color) {
  matrix[x][y] = color
  document.getElementById(`${x}-${y}`).style.backgroundColor = color
  if (count === 100)
    console.log(Date.now() - startTime)
}

function setTiles(updates) {
  updates.forEach(update => { setTile(update) })
}

function setBoard(data) {
  data.board.forEach((row, rIdx) => {
    row.forEach((color, cIdx) => {
      setTile(rIdx, cIdx, color)
    })
  })
}

const dispatcher = {
  'setTile': (payload) => {count++; setTile(payload.x, payload.y, payload.color)},
  'setTiles': setTiles,
  'setBoard': setBoard,
}
