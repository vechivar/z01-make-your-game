const canvas = document.getElementById('tilemap')
const canvasCtx = canvas.getContext('2d')

const squareSize = 100, columns = screenWidth / squareSize, lines = screenHeight / squareSize

const tileset = new Image()
tileset.onload = () => {
    canvas.width = screenWidth
    canvas.height = screenHeight
    drawTileMap(menuTileMap,0)
}

tileset.src = 'img/tileset.png'

function drawTileMap(tileMap, tilePalet) {
    canvasCtx.clearRect(0,0,screenWidth, screenHeight)
    for (let i = 0; i < lines; i ++) {
        for (let j = 0; j < columns; j++) {
            const tileId = 10 * tileMap[i * columns + j] + tilePalet, tileX = Math.floor(tileId % 10), tileY = Math.floor(tileId/10)
            canvasCtx.drawImage(tileset, tileX * 32,tileY * 32,32,32, j*squareSize, i*squareSize, squareSize, squareSize)
        }
    }
    tilePalet = (tilePalet+1)%10
}

const levelTileMap = 
[
    6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,
    6,7,7,7,7,7,7,7,7,7,7,7,7,7,7,6,
    6,7,6,6,6,6,6,6,6,6,6,6,6,6,7,6,
    6,7,6,7,7,7,7,7,7,7,7,7,7,6,7,6,
    6,7,6,7,6,6,6,6,6,6,6,6,7,6,7,6,
    6,7,6,7,6,6,6,6,6,6,6,6,7,6,7,6,
    6,7,6,7,7,7,7,7,7,7,7,7,7,6,7,6,
    6,7,6,6,6,6,6,6,6,6,6,6,6,6,7,6,
    6,7,7,7,7,7,7,7,7,7,7,7,7,7,7,6,
    6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,
    7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,
    7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,
]

const menuTileMap = 
[
    6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,
    6,7,7,7,7,7,7,7,7,7,7,7,7,7,7,6,
    6,7,6,6,6,6,6,6,6,6,6,6,6,6,7,6,
    6,7,6,7,7,7,7,7,7,7,7,7,7,6,7,6,
    6,7,6,7,6,6,6,6,6,6,6,6,7,6,7,6,
    6,7,6,7,6,7,7,7,7,7,7,6,7,6,7,6,
    6,7,6,7,6,7,7,7,7,7,7,6,7,6,7,6,
    6,7,6,7,6,6,6,6,6,6,6,6,7,6,7,6,
    6,7,6,7,7,7,7,7,7,7,7,7,7,6,7,6,
    6,7,6,6,6,6,6,6,6,6,6,6,6,6,7,6,
    6,7,7,7,7,7,7,7,7,7,7,7,7,7,7,6,
    6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,
]

const storyTileMap = 
[
    8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,
    8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,
    6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,
    6,7,7,7,7,7,7,7,7,7,7,7,7,7,7,6,
    6,7,7,7,7,7,7,7,7,7,7,7,7,7,7,6,
    6,7,7,7,7,7,7,7,7,7,7,7,7,7,7,6,
    6,7,7,7,7,7,7,7,7,7,7,7,7,7,7,6,
    6,7,7,7,7,7,7,7,7,7,7,7,7,7,7,6,
    6,7,7,7,7,7,7,7,7,7,7,7,7,7,7,6,
    6,7,7,7,7,7,7,7,7,7,7,7,7,7,7,6,
    6,7,7,7,7,7,7,7,7,7,7,7,7,7,7,6,
    6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,
]