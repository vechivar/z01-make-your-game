let continueWithSpace           // use space to continue instead of using mouse

// base div for menu
function buildMenu() {
    gameState = "menu"
    continueWithSpace = null
    let res = document.createElement('div')
    res.classList = 'menu'
    screen.append(res)

    return res
}

// called when loosing a game
function loseMenu() {
    let menu = buildMenu()
    ball.style.display = 'none'
    if (gameMode == 'story') {
        menu.innerHTML = '<div>Mike and butch died.</div><div>The universe is doomed.</div>'
    } else {
        menu.innerHTML = '<div> You loose ! </div> <div> Score : ' + score + '</div>' 
    }

    const restartButton = document.createElement('button')
    restartButton.innerText = "Restart"
    restartButton.addEventListener('click', () => {
        startMenu()
        menu.remove()
    })

    menu.append(restartButton)
}

// called when winning a round
function winMenu() {
    let menu = buildMenu()
    ball.style.display = 'none'
    menu.innerHTML = '<div> Level ' + currentLvl + ' complete. </div> <div> Score : ' + score + '</div>' 

    const continueButton = document.createElement('button')
    continueButton.innerText = "Continue"
    const continueFunc = () => {
        gameState = 'starting'
        ballSpeed += 50
        barSpeed += 40
        lives ++
        currentLvl++
        menu.remove()

        console.log(gameMode)

        if (gameMode == 'story' && storyStep < story.length && story[storyStep].activate()) {
            storyDisplay()
        } else {
            addBricks()
            initRound()
        }
    }

    continueButton.addEventListener('click', continueFunc)
    continueWithSpace = continueFunc

    menu.append(continueButton)
}

// called to start a game
function startMenu() {
    clearBonuses()
    updateInterface()

    let menu = buildMenu()

    const infiniteButton = document.createElement('button')
    infiniteButton.innerText = "Endless"
    infiniteButton.addEventListener('click', () => {
        initGame()
        addBricks()
        gameMode = 'endless'
        menu.remove()
    })

    menu.append(infiniteButton)

    const storyButton = document.createElement('button')
    storyButton.innerText = "Story"

    storyButton.addEventListener('click', () => {
        gameMode = 'story'
        storyStep = 0
        storyDisplay()
        menu.remove()
    })

    menu.append(storyButton)
}

// called when pausing the game
function pauseMenu() {
    let menu = buildMenu()

    const continueButton = document.createElement('button')
    continueButton.innerText = "Continue"
    const continueFunc = () => {
        gameState = 'starting'
        menu.remove()
    }
    continueButton.addEventListener('click', continueFunc)
    continueWithSpace = continueFunc

    menu.append(continueButton)

    const restartButton = document.createElement('button')
    restartButton.innerText = "Restart"
    restartButton.addEventListener('click', () => {
        startMenu()
        menu.remove()
    })

    menu.append(restartButton)
}

// called if the entire game is won
function endGameMenu() {
    let menu = buildMenu()
    menu.innerHTML = '<div>Congratulations !</div><div>You won !</div><div>Time: ' + properTime(inGameTime) + '</div>' 
}

// used to display ingametime
function properTime(time) {
    const min = Math.floor(time / 60000)
    const sec = Math.floor((time - min*60000)/1000)
    const csec = Math.floor(Math.floor(time%1000) / 10)

    return (min<10?'0':'') + min + ':'+ (sec<10?'0':'') + sec + ':' + (csec<10?'0':'') + csec
}

// triggered by pressing space
function pressSpace() {
    console.log(gameState)

    switch (gameState) {
        case 'playing':
        pauseMenu()
        break
        case 'menu':
        if (continueWithSpace) {
            continueWithSpace()
        }
        break
        case 'starting':
        gameState = 'playing'
        break
        case 'storyTelling':
        story[storyStep].display()
        break
        default:
        console.log('something wrong : invalid gameState "' + gameState + '"')
        break
    }
}

// needs proper interface
function updateInterface() {
    msgLog.innerHTML = '<div>Time : ' + properTime(inGameTime) + '</div>'
    msgLog.innerHTML += '<div>Level : ' + currentLvl + '</div><div>Lives : ' + lives + '</div><div>Score : ' + score + '</div>'
    msgLog.innerHTML += '<div>Ball speed : ' + Math.round(ballSpeed * 100 / initBallSpeed) + '%</div>'
    bonuses.forEach((b) => {
        if (b.active) {
            msgLog.innerHTML += '<div>' + b.type + '<div>'
            msgLog.innerHTML += '<div class="bonusTimeBar" style="width: ' + Math.floor(100 * b.remainingTime / b.time) + 'px;"></div>'
        }
    })
}


function storyDisplay() {
    gameState = 'storyTelling'
    removeBricks()
    clearBonuses()

    story[storyStep].start()
}