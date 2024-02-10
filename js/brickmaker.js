const brickHeight = 40
let levelTilePalet = 0
const levelTilePalets = [0,2,4,5,6]

// procedural brick spawning
function addBricks() {
    levelTilePalet = (levelTilePalet + 1)%(levelTilePalets.length)
    drawTileMap(levelTileMap, levelTilePalets[levelTilePalet])
    removeBricks()
    bricks = Array()

    if(currentLvl % 4 == 0 && gameMode != 'story') {
        randomCircleBricks(10 + currentLvl, 34 - currentLvl, 66 - currentLvl)
        bricks.forEach((b) => {
            b.hp = Math.floor(currentLvl / 4)
            setBrickColor(b)
        })
    } else {
        lineColumn(currentLvl%2 == 0, Math.min(10, 3 + Math.floor((currentLvl - 1) / 2)),brickColumns = Math.min(8, 4 + Math.floor(currentLvl /2)))
        if (currentLvl > 4) {
            let i = 0
            bricks.forEach((b) => {
                if (i%2 == 0) {
                    b.hp += Math.floor(currentLvl / 4)
                } else {
                    b.hp += Math.floor(currentLvl / 4) - 1
                }
                i++
                setBrickColor(b)
            })
        }
    }
}

// place bricks on the screen.
// staggered = false : all aligned
// staggered = true : quincunx
// add more bricks according to current level
function lineColumn(staggered, brickLines, brickColumns) {
    const brickWidth = screenWidth / (brickColumns + 3)                          // width of the bricks
        // brickHeight = 40,                                                       // height of bricks     
        // space on left before first brick. allows ball to pass                        
        brickLeftOffset = ballRadius * 3,    
        // space on top before first brick. allows ball to pass                                    
        brickTopOffset = ballRadius * 3,   
        // vertical space between lines of bricks                                     
        brickSpaceY = brickHeight * 1.2,
        // horizontal space between columns of bricks
        brickSpaceX = (screenWidth - 2 * brickLeftOffset - brickWidth * brickColumns)  / (brickColumns - 1)

    for (let i = 0; i < brickLines; i++) {
        for (let j = 0; j < brickColumns; j ++) {
            const brick = document.createElement('span')
            let leftPos
            brick.classList = 'brick'
            brick.style.width = brickWidth + 'px'
            brick.style.height = brickHeight + 'px'
            if (staggered && i%2 == 1) {
                if (j == brickColumns - 1) {
                    continue
                }
                leftPos = brickLeftOffset + (brickWidth + brickSpaceX) * (j + 0.5)
            } else {
                leftPos = brickLeftOffset + (brickWidth + brickSpaceX) * j
            }
            brick.style.left = leftPos + 'px'
            brick.style.top = (brickTopOffset + (brickHeight + brickSpaceY) * i) + 'px'
            screen.append(brick)

            const res = {div:brick, alive: true, 
                x:leftPos, 
                y:brickTopOffset + (brickHeight + brickSpaceY) * i,
                w:brickWidth,
                h:brickHeight,
                type:'rect',
                hp:1
            }

            setBrickColor(res)
            bricks.push(res)
        }  
    }
}

// spawn total random circle bricks of random size between minradius and maxradius
function randomCircleBricks(total, minRadius, maxRadius) {
    for (let i = 0; i < total; i++) {
        let x, y, flag = true, tries = 0, brickRadius = minRadius + (maxRadius - minRadius) * Math.random()
        while (flag) {
            tries++
            if (tries > 6 * total) {
                // should not happen. can't spawn more bricks, so try again
                removeBricks()
                bricks = Array()
                randomCircleBricks(total)
                return
            }
            x = 2 * brickRadius + (screenWidth - 4*brickRadius) * Math.random()
            y = 2 * brickRadius + (screenHeight * 0.5 - 3 * brickRadius) * Math.random()
            flag = false
            bricks.forEach((b) => {
                if (squareDistance([x,y],[b.x,b.y]) < 9 * brickRadius * brickRadius) {
                    flag = true
                }
            })
        }
        const brick = document.createElement('span')
        brick.classList = 'circleBrick'
        brick.style.width = 2 * brickRadius + 'px'
        brick.style.height = 2 * brickRadius + 'px'
        brick.style.left = (x - brickRadius) + 'px'
        brick.style.top = (y - brickRadius) + 'px'
        screen.append(brick)

        const res = {div:brick,
            x:x,
            y:y,
            radius:brickRadius,
            alive:true,
            type:'circle',
            hp:1
        }
        setBrickColor(res)

        bricks.push(res)
    }
}

// level from story.
// big square protected by a line of 3hp bricks
function bigJoeLevel() {
    levelTilePalet = (levelTilePalet + 1)%(levelTilePalets.length)
    drawTileMap(levelTileMap, levelTilePalets[levelTilePalet])
    removeBricks()
    bricks = Array()

    // big square
    const bjDiv = document.createElement('span')
    const size = 0.3 * screenWidth
    bjDiv.classList = 'brick'
    bjDiv.style.width = size + 'px'
    bjDiv.style.height = size + 'px'
    bjDiv.style.left = 0.35 * screenWidth + 'px'
    bjDiv.style.top = 0.02 * screenHeight + 'px'
    bjDiv.style.backgroundColor = 'black'
    screen.append(bjDiv)

    const bj = {div:bjDiv, alive: true, 
        x:0.35 * screenWidth, 
        y:0.02 * screenHeight,
        w:size,
        h:size,
        type:'rect',
        hp:10,
        name:'bigJoe'
    }

    // line of bricks
    lineColumn(false, 1, 7)
    bricks.forEach((b) => {
        b.y = 0.45 * screenHeight
        b.div.style.top = 0.45 * screenHeight + 'px'
        b.hp = 3
        setBrickColor(b)
    })

    bricks.push(bj)
}

// level from story
// big ball protected by circle of smaller 3hp balls
function ballBossLevel() {
    levelTilePalet = (levelTilePalet + 1)%(levelTilePalets.length)
    drawTileMap(levelTileMap, levelTilePalets[levelTilePalet])
    removeBricks()
    bricks = Array()

    // big ball
    const bjDiv = document.createElement('span')
    const size = 0.3 * screenWidth
    bjDiv.classList = 'circleBrick'
    bjDiv.style.width = size + 'px'
    bjDiv.style.height = size + 'px'
    bjDiv.style.left = 0.35 * screenWidth + 'px'
    bjDiv.style.top = 0.02 * screenHeight + 'px'
    bjDiv.style.backgroundColor = 'black'
    screen.append(bjDiv)

    const bj = {div:bjDiv,
        alive: true, 
        x:0.35 * screenWidth + size/2, 
        y:0.02 * screenHeight + size/2,
        radius:size / 2,
        type:'circle',
        hp:10,
        name:'ballBoss'
    }

    // circle of smaller balls
    for (let i = -5; i < 6; i++) {
        const div = document.createElement('span')
        const brick = {div:div,
            alive: true, 
            x:0.35 * screenWidth + size/2 + size * Math.cos((i + 4)*Math.PI / 8), 
            y:0.02 * screenHeight + size/2 + size * Math.sin((i + 4)*Math.PI / 8),
            radius:size / 6,
            type:'circle',
            hp:3,
        }

        div.classList = 'circleBrick'
        div.style.width = size / 3 + 'px'
        div.style.height = size / 3 + 'px'
        div.style.left = (brick.x - size / 6) + 'px'
        div.style.top = (brick.y - size / 6) + 'px'

        setBrickColor(brick)
        bricks.push(brick)
        screen.append(brick.div)
    }

    bricks.push(bj)
}

// removes all bricks from screen
function removeBricks() {
    bricks.forEach((x) => {
        x.div.remove()
    })
}

// set brick color depending on its hp
function setBrickColor(brick) {
    switch (brick.hp) {
        case 1:
        brick.div.style.backgroundColor = 'blue'
        break
        case 2:
        brick.div.style.backgroundColor = 'green'
        break
        case 3:
        brick.div.style.backgroundColor = 'yellow'
        break
        case 4:
        brick.div.style.backgroundColor = 'orange'
        break
        case 5:
        brick.div.style.backgroundColor = 'red'
        break
        default:
        brick.div.style.backgroundColor = 'black'
        break
    }
}
