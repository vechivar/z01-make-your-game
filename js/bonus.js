// size changing
const sizeChange = 50,
    sizeChangeTime = 5000

// noBrickBounce
const noBrickBounceTime = 5000

// spawns a bonus at ball position
function createBonus() {
    const bonus = {}
    const div = document.createElement('div')
    screen.append(div)

    div.classList = 'bonus'
    div.style.width = bonusSize + 'px'
    div.style.height = bonusSize + 'px'
    // div.style.top = (ballY - bonusSize / 2) + 'px'
    // div.style.left = (ballX - bonusSize / 2) + 'px'
    div.style.left = (ballX - bonusSize / 2) + 'px'
    div.style.fontSize = (bonusSize - 2) + 'px'

    bonus.top = (ballY - bonusSize / 2)
    bonus.left = (ballX - bonusSize / 2)
    div.style.top = '0px'
    div.style.transform = 'translateY(' + bonus.top + 'px)'
    bonus.alive = true
    bonus.active = false
    bonus.div = div

    // randomize bonus effect
    bonusRandomizer(bonus)

    bonuses.push(bonus)
}

// modifies bar size and other necessary values
function changeBarWidth(diff) {
    barWidth += diff
    maxLeftPos = maxLeftPosBase - barWidth
    if (barLeft > maxLeftPos) {
        barLeft = maxLeftPos
    }
    bar.style.width = barWidth + 'px'
}

// called in loop handle bonuses
function handleBonuses(timeOffset) {
    bonuses.forEach((b) => {
        if (b.top + bonusSize < barTop || !b.alive) {
            //bonus out of bar reach or dead
            return
        }

        if (b.active) {
            // bonus effect is active
            b.remainingTime -= timeOffset
            if (b.remainingTime < 0) {
                b.disactivate()
                b.active = false
                b.alive = false
            } else {
                if (b.dynamicEffect != null) {
                    b.dynamicEffect()
                }
            }
            return
        }

        if (b.left >= barLeft && b.left + bonusSize <= barLeft + barWidth) {
            // catch bonus
            b.activate()
            b.div.remove()
        }

        if (b.top + bonusSize >= screenHeight) {
            // bonus missed
            b.div.remove()
            b.alive = false
        }
    })
}

// remove all bonuses
function clearBonuses() {
    bonuses.forEach((b) => {
        if (b.div) {
            b.div.remove()
        }
    })
    bonuses = Array()
}

function bonusRandomizer(bonus) {
    const r = Math.random()

    // noBrickBounceBonus(bonus)
    // return

    if (r < 0.2) {
        barSizeIncrease(bonus)
        return
    }

    if (r < 0.4) {
        barSizeDecrease(bonus)
        return
    }

    if (r < 0.6) {
        ballSpeedIncrease(bonus)
        return
    }

    if (r < 0.65) {
        ballSpeedDecrease(bonus)
        return
    }

    if (r < 0.85) {
        bonusPoints(bonus)
        return
    }

    if (r < 0.95) {
        noBrickBounceBonus(bonus)   
        return
    }

    lifeUp(bonus)
}

// All bonus effects. explicit names

function barSizeIncrease(bonus) {
    bonus.div.style.backgroundColor = 'green'    
    bonus.div.innerText = 'W'
    bonus.type = 'Bar size +'   
    bonus.activate = () => {
        changeBarWidth(sizeChange)
        bonus.active = true
        bonus.time = sizeChangeTime
        bonus.remainingTime = sizeChangeTime
    }
    bonus.disactivate = () => {
        changeBarWidth(-sizeChange)
    }
}

function barSizeDecrease(bonus) {
    bonus.div.style.backgroundColor = 'red'
    bonus.div.innerText = 'W'   
    bonus.type = 'Bar size -'   
    bonus.activate = () => {
        changeBarWidth(-sizeChange)
        bonus.active = true
        bonus.time = sizeChangeTime
        bonus.remainingTime = sizeChangeTime
    }
    bonus.disactivate = () => {
        changeBarWidth(sizeChange)
    }
}

function ballSpeedIncrease(bonus) {
    bonus.div.style.backgroundColor = 'red'
    bonus.div.innerText = 'S'   
    bonus.type = 'ballSpeedIncrease'   
    bonus.activate = () => {
        bonus.alive = false
        ballSpeed = ballSpeed * 1.1
    }
}

function ballSpeedDecrease(bonus) {
    bonus.div.style.backgroundColor = 'green'
    bonus.type = 'ballSpeedDecrease'   
    bonus.div.innerText = 'S'   
    bonus.activate = () => {
        bonus.alive = false
        ballSpeed = ballSpeed * 0.95
    }
}

function bonusPoints(bonus) {
    bonus.div.style.backgroundColor = 'purple'
    bonus.type = 'bonusPoints'   
    bonus.div.innerText = 'P'   
    bonus.activate = () => {
        bonus.alive = false
        score += currentLvl * 1000
    }
}

function noBrickBounceBonus(bonus) {
    bonus.div.style.backgroundColor = 'orange'
    bonus.type = 'Demolition ball'   
    bonus.div.innerText = 'D'   
    bonus.activate = () => {
        noBrickBounce = true
        bonus.active = true
        bonus.time = noBrickBounceTime
        bonus.remainingTime = noBrickBounceTime
        ball.style.backgroundColor = 'black'
    }
    bonus.disactivate = () => {
        noBrickBounce = false
        bonus.active = false
        bonuses.forEach((b) => {
            if (b.active && b.type == 'Demolition ball') {
                noBrickBounce = true
            }
        })
        if (!noBrickBounce) {
            ball.style.backgroundColor = ballDefaultColor
        }
    }
}

function lifeUp(bonus) {
    bonus.div.style.backgroundColor = 'purple'
    bonus.type = 'bonusLife'   
    bonus.div.innerText = 'L'   
    bonus.activate = () => {
        lives++
        bonus.active = false
        bonus.alive = false
    }
}