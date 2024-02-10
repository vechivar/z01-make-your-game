// all html elements
const screen = document.getElementById('screen'),
    bar = document.getElementById('bar'),
    msgLog = document.getElementById('msgLog'),
    ball = document.getElementById('ball')

let gameState,                                      // menu, starting, playing, storyTelling
    gameMode,                                       // story, endless    
    storyStep                                       // current phase of the story

// values used to run the game
let lastTimeStamp,                                  // used in loop, timestamp of previous frame
    pressingLeft,                                   // user is pressing left
    pressingRight,                                  // user is pressing right
    barLeft,                                        // left position of the bar                               
    ballX, ballY,                                   // coordinates of the center of the ball
    ballVelX, ballVelY,                             // X and Y velocity of the ball. normalized (x² + y² = 1)
    // bounce = false,                                 // used to trigger bounce randomize
    pause = true,                                   // game is paused
    roundStarted = false,                           // round didn't start yet
    bricks = Array(),                               // bricks created
    bonuses = Array()                               // currentBonuses 

// game elements parameters
let screenWidth = 1600,
    screenHeight = 1200,
    ballRadius = 16,
    barHeight = screenHeight * 0.008,
    barTop = screenHeight - barHeight - 2,
    minLeftPos = screenWidth * 0.01,
    maxLeftPosBase = screenWidth * 0.99, maxLeftPos,
    barMovingAngle = 20 * 2 * Math.PI / 360,        // angle added when ball hits moving bar
    barPosAngle = 30 * 2 * Math.Pi / 360,           // max angle added to the ball depending on where it hits the bar
    bonusSpeed = 350,
    bonusChance = 0.5,                              // bonus spawn chance
    // bonusChance = 1,
    bonusSize = 30

// game parameters evolving. all speeds in px/sec
let initBarSpeed = 800, barSpeed = initBarSpeed,
    initBallSpeed = 800, ballSpeed = initBallSpeed,
    initBarWidth = screenWidth * 0.12, barWidth = initBarWidth,
    initLives = 3, lives = initLives,
    currentLvl = 1,
    score = 0,
    inGameTime = 0,
    ballDefaultColor = 'black'

// bonus effects
let noBrickBounce = false

initProgram()

const frameTimes = Array(5)
let currentFramInd = 0

// loop.
// move things, then adjust everything before palcing on the screen
function play(timeStamp) {
    if (gameState == 'playing') {
        moveThings(timeStamp - lastTimeStamp)
        handleBonuses(timeStamp - lastTimeStamp)
        detectWallBounce()
        detectBarBounce()
        detectBrickBounce()

        // place ball and bar according to previous results
        // ball.style.top = (ballY - ballRadius) + 'px'
        // ball.style.left = (ballX - ballRadius) + 'px'
        // bar.style.left = barLeft + 'px'
        bar.style.transform = 'translateX(' + barLeft + 'px)'
        ball.style.transform = 'translate(' + (ballX - ballRadius) + 'px, ' + (ballY - ballRadius) + 'px)'  
    }

    if (gameState == 'storyTelling') {
        story[storyStep].context.elems.forEach((e) => {e.animate()})
    }

    updateInterface()
    let calcFps = 0
    currentFramInd = (currentFramInd + 1)%frameTimes.length
    frameTimes[currentFramInd] = timeStamp - lastTimeStamp
    frameTimes.forEach((x) => {calcFps += x})

    msgLog.innerHTML += '<div>FPS : ' + Math.round(1000 * frameTimes.length / (calcFps)) + '</div>'

    lastTimeStamp = timeStamp

    window.requestAnimationFrame(play)
}

// updates bar and ball position
function moveThings(timeOffset) {
    inGameTime += timeOffset

    // move bar
    if (pressingLeft && !pressingRight) {
        barLeft = Math.max(minLeftPos, barLeft - (timeOffset) * barSpeed / 1000)
    }
    if (!pressingLeft && pressingRight) {
        barLeft = Math.min(maxLeftPos, barLeft + (timeOffset) * barSpeed / 1000)
    }

    // move bonuses
    bonuses.forEach((x) => {
        if (!x.alive) {
            return
        }
        x.top += (timeOffset) * bonusSpeed / 1000
        // x.div.style.top = x.top + 'px'
        x.div.style.transform = 'translateY(' + x.top + 'px)'
    })

    // move ball
    ballX += ballVelX * ballSpeed * (timeOffset) / 1000
    ballY += ballVelY * ballSpeed * (timeOffset) / 1000
}

// lost a life
function lose() {
    lives --
    if (lives == 0) {
        loseMenu()
    } else {
        initRound()
    }
}

// adjust ball angle to avoid horizontal, boring directions
function avoidHorizontal(angle) {
    const pi8 = Math.PI / 8
    if (ballVelY > 0) {
        return ballVelX > 0 ? Math.max(angle, pi8) : Math.min(angle, 7*pi8)
    } else {
        return ballVelX > 0 ? Math.min(angle, 15 * pi8) : Math.max(angle, 9*pi8)
    }
}

// squared distance between two points
function squareDistance(a, b) {
    const xDif = a[0] - b[0], yDif = a[1] - b[1]
    return xDif * xDif + yDif * yDif
}

// distance between two points
function dist(a, b) {
    return Math.sqrt(squareDistance(a,b))
}

// get angle of vector (x,y)
function getAngle(x, y) {
    return y > 0 ? Math.acos(x) : 2 * Math.PI - Math.acos(x)
}
