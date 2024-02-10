// launched once when starting the program
function initProgram() {
    document.addEventListener('keydown',(e) => {
        switch(e.key) {
        case 'w':
            pressingLeft = true
            break;
        case 'c':
            pressingRight = true;
            break;
        }
    })
    
    document.addEventListener('keyup',(e) => {
        switch(e.key) {
        case 'w':
            pressingLeft = false;
            break;
        case 'c':
            pressingRight = false;
            break;
        case ' ':
            pressSpace()   
            break;
        case 'u':
            winMenu()     
            break
        case 'i':
            score += 10000
            break   
        }
    })

    screen.style.height = screenHeight + 'px'
    screen.style.width = screenWidth + 'px'

    ball.style.width = ballRadius * 2 + 'px'
    ball.style.height = ballRadius * 2 + 'px'

    startMenu()
    window.requestAnimationFrame(initFrame)
}

// launched when starting a new round (win a level or loose  a life)
function initRound() {
    gameState = 'starting'

    clearBonuses()
    updateInterface()

    // init values
    barWidth = initBarWidth
    maxLeftPos = maxLeftPosBase - barWidth
    noBrickBounce = false
    pressingLeft = false
    pressingRight = false

    // bar values
    barLeft = (screenWidth - barWidth) / 2
    bar.style.top = barTop + 'px'
    // bar.style.left = barLeft + 'px'
    bar.style.left = 0 + 'px'
    bar.style.transform = 'translateX(' + barLeft + 'px)'
    bar.style.width = barWidth + 'px'
    bar.style.height = barHeight + 'px'
    
    // ball values
    ballY = barTop - 2 * ballRadius
    ballX = screenWidth / 2

    // ball.style.top = (ballY - ballRadius) + 'px'
    // ball.style.left = (ballX - ballRadius) + 'px'
    ball.style.top = '0px'
    ball.style.left = '0px'
    ball.style.transform = 'translate(' + (ballX - ballRadius) + 'px, ' + (ballY - ballRadius) + 'px)'  
    ball.style.backgroundColor = ballDefaultColor
    ball.style.display = 'block'
    bar.style.display = 'block'

    // random angle toward bricks
    let randomAngle = (7 + 4*Math.random()) * Math.PI / 6
    ballVelX = Math.cos(randomAngle)
    ballVelY = Math.sin(randomAngle)
    // ballVelY = -1
    // ballVelX = 0
}

// launched when starting a game (first game or all lives lost)
function initGame() {
    lives = initLives
    currentLvl = 1
    ballSpeed = initBallSpeed
    barSpeed = initBarSpeed
    score = 0
    barWidth = initBarWidth
    maxLeftPos = maxLeftPosBase - barWidth
    inGameTime = 0

    initRound()
}

// launched to start animation
function initFrame(timeStamp) {
    lastTimeStamp = timeStamp
    window.requestAnimationFrame(play)
}