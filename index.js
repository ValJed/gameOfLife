document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById('canvas')
  const canvas2d = canvas.getContext('2d')

  const createGrid = (width, height) => {
    const grid = new Array(height)

    for(var y = 0; y < height; y++) {
      grid[y] = []
      for(var x = 0; x < width; x++) {
        grid[y][x] = Math.floor(Math.random() * 2)
      }
    }
    return grid
  }

  const createNudeGrid = (width, height) => {
    const res = new Array(height)

    for(var y = 0; y < height; y++) {
      grid[y] = [];
      for(var x = 0; x < width; x++) {
        grid[y][x] = 0
      }
    }
    return grid
  }

  // const drawGrid = (ctx, cellSize, grid) => {

  //   for(let y = 0; y < 0; y++)

  // }

  const drawCells = (ctx, cellSize, grid) => {
    const height = grid.length
    const width = grid[0].length

    for(let y = 0; y < height; y++) {
      ctx.strokeStyle = 'black'
      ctx.beginPath()
      ctx.moveTo(0, y * cellSize)
      ctx.lineTo(width * cellSize, y * cellSize)
      ctx.stroke()
      ctx.beginPath()
      ctx.moveTo(y * cellSize, 0)
      ctx.lineTo(y * cellSize, width * cellSize)
      ctx.stroke()
      for(let x = 0; x < width; x++) {
        if (grid[y][x] === 1) {
          ctx.fillRect(x * cellSize, y * cellSize, cellSize, cellSize)
        }
      }
    }
  }

  const lineExtractor = (line, x) => {
    return line ? [
      ...line[x - 1] !== undefined ? [line[x - 1]] : [],
      line[x],
      ...line[x + 1] !== undefined ? [line[x + 1]] : []
    ] : []
  }

  const modifyGrid = (grid) => {
    const height = grid.length
    const width = grid[0].length
    const newGrid = createNudeGrid(width, height)
    for(let y = 0; y < height; y++) {
      for(let x = 0; x < width; x++) {
        const currentLine = []
        if (grid[y][x - 1] !== undefined) {
          currentLine.push(grid[y][x - 1])
        }
        // currentLine.push(grid[y][x])
        if (grid[y][x + 1] !== undefined) {
          currentLine.push(grid[y][x + 1])
        }

        const prevLine = lineExtractor(grid[y - 1], x)
        const nextLine = lineExtractor(grid[y + 1], x)

        const neighbors = prevLine.concat(currentLine, nextLine)
        const aliveCells = neighbors.filter((n) => n === 1)

        if (grid[y][x] === 0){
          if ( aliveCells.length === 3) {
            newGrid[y][x] = 1
          }
        } else {
          if (aliveCells.length === 2 || aliveCells.length === 3) {
            newGrid[y][x] = 1
          }
        }
      }
    }
    return newGrid
  }

  const alterGrid = (ctx, grid, gridSize) => {
    grid = modifyGrid(grid.slice(0))
    ctx.clearRect(0, 0, gridSize, gridSize)
    drawCells(canvas2d, cellSize, grid)
  }

  const cellSize = 15
  const gridLength = 100
  const gridSize = gridLength * cellSize
  let grid = createGrid(gridLength, gridLength, cellSize)
  // drawGrid(canvas2d, cellSize, grid)
  drawCells(canvas2d, cellSize, grid)

  canvas.addEventListener('click', (event) => {
    const posX = event.offsetX
    const posY = event.offsetY

    for (let cell = 0; cell <= gridLength; cell++) {
      const cellPosX = cell * cellSize

      // if () {

      // }
      console.log('posX ===> ', posX)
      console.log('cellPosX ===> ', cellPosX)
    }

    const heightX = posX * cellSize

    console.log('X ===> ', posX)
    console.log('Y ===> ', posY)
  })

  document.querySelector('.button').addEventListener('click', () => {
    alterGrid(canvas2d, grid, gridSize)
  })

  setInterval(() => {
    alterGrid(canvas2d, grid, gridSize)
  }, 200)

})