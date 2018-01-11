setInterval(() => {
  const color = '#'+Math.floor(Math.random()*16777215).toString(16)
  const payload = {x: Math.floor(Math.random()*100), y: Math.floor(Math.random()*100), color: color}
  send('setTile', payload)
}, 10)
