document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById('canvas')
  const canvas2d = canvas.getContext('2d')

  const createGrid = (width, height) => {
    const grid = new Array(height)

    for(var y = 0; y < height; y++) {
      grid[y] = [];
      for(var x = 0; x < width; x++) {
        grid[y][x] = Math.floor(Math.random() * 2)
      }
    }
    return grid
  }

  const drawCells = (ctx, grid) => {
    const height = grid.length
    const width = grid[0].length

    for(let y = 0; y < height; y++) {
      for(let x = 0; x < width; x++) {
        if (grid[y][x] === 1) {
          ctx.fillRect(x * 4, y * 4, 4, 4)
        }
      }
    }
  }

  const lineExtractor = (line, x) => {
    return line ? [line[x - 1], line[x], line[x + 1]] : []
  }

  const alterGrid = (grid) => {
    const height = grid.length
    const width = grid[0].length
    for(let y = 0; y < height; y++) {
      for(let x = 0; x < width; x++) {
        const currentLine = []
        const cell = grid[y][x]
        // const cellLeft = grid[y][x - 1]
        // const cellRight = grid[y][x + 1]
        if (grid[y][x - 1] !== undefined) {
          currentLine.push(grid[y][x - 1])
        }
        currentLine.push(grid[y][x])
        if (grid[y][x + 1] !== undefined) {
          currentLine.push(grid[y][x + 1])
        }
        console.log('currentLine ===> ', currentLine)

        const lineBefore = lineExtractor(grid[y - 1], x)
        const lineAfter = lineExtractor(grid[y + 1], x)

      }
    }
  }

  const grid = createGrid(10, 10)
  drawCells(canvas2d, grid)

  document.querySelector('.button').addEventListener('click', () => {
    alterGrid(grid)
  })

})