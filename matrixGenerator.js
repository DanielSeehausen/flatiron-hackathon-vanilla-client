function genCell(rIdx, cIdx) {
  return (
    `<div
       id='${rIdx}-${cIdx}'
       class='cell'
       rowidx=${rIdx}
       colidx=${cIdx}>
    </div>`
  )
}

function genMatrixHTML() {
  const matrixHTML = []
  for (let rIdx = 0; rIdx < config.ROWCOUNT; rIdx++) {
    const rowHTML = [`<div id='row-${rIdx}' class='row'>`]
    for (let cIdx = 0; cIdx < config.COLCOUNT; cIdx++) {
      rowHTML.push(genCell(rIdx, cIdx))
    }
    rowHTML.push('</div>')
    matrixHTML.push(rowHTML.join(''))
  }
  return matrixHTML.join('')
}

function insertMatrixHTML(matrixHTML) {
  document.getElementById("matrix").innerHTML = matrixHTML
}

var matrix = []
function genMatrix() {
  for (let rIdx = 0; rIdx < config.ROWCOUNT; rIdx++)
    matrix.push(Array(config.COLCOUNT).fill(null))
}

function assignDomRefs(matrix) {
  matrix.forEach((row, rIdx) => {
    row.forEach((col, cIdx) => {
      matrix[rIdx][cIdx] = document.getElementById(`${rIdx}-${cIdx}`)
    })
  })
}

(function main() {
  genMatrix()
  const matrixHTML = genMatrixHTML()
  insertMatrixHTML(matrixHTML)
  assignDomRefs(matrix)
})()
