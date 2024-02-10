// handles ball bouncing on the bar or touching bottom of screen
function detectBarBounce() {
    if (ballVelY < 0) {
        return
    }
    // ball clearly hitting the bar or edge case of hitting corners
    if ((ballX >= barLeft && ballX <= barLeft + barWidth && ballY + ballRadius >= barTop)
    || (squareDistance([ballX, ballY],[barLeft, barTop]) <= ballRadius * ballRadius)
    || (squareDistance([ballX, ballY],[barLeft + barWidth, barTop]) <= ballRadius * ballRadius)) {
        ballY = barTop - ballRadius
        ballVelY = -ballVelY
        let currentAngle = 2 * Math.PI - Math.acos(ballVelX)

        if (pressingLeft && !pressingRight) {
            currentAngle -= barMovingAngle * (barSpeed / initBarSpeed)
        }
        if (pressingRight && !pressingLeft) {
            currentAngle += barMovingAngle * (barSpeed / initBarSpeed)
        }

        currentAngle -= 2 * ((barLeft + barWidth / 2 - ballX) / barWidth) * barMovingAngle
        currentAngle = Math.min(15* Math.PI / 8, Math.max(9* Math.PI / 8, currentAngle))
        // currentAngle = Math.max(9* Math.PI / 8, currentAngle)

        ballVelX = Math.cos(currentAngle)
        ballVelY = Math.sin(currentAngle)
        score += 5
        // audio_barBounce.play()
    }
    if (ballY + ballRadius >= screenHeight) {
        lose()
    }
}


// handles bouncing on walls
function detectWallBounce() {
    let flag = false
    if (ballX <= ballRadius) {
        ballX = ballRadius + 1
        ballVelX = -ballVelX
        flag = true
    }
    if (ballX >= screenWidth - ballRadius) {
        ballX = screenWidth - ballRadius - 1
        ballVelX = -ballVelX
        flag = true
    }
    if (ballY <= ballRadius) {
        ballY = ballRadius + 1
        ballVelY = -ballVelY
        flag = true
    }

    if (flag) {
        // audio_wallBounce.play()
        let angle = avoidHorizontal(getAngle(ballVelX, ballVelY))
        ballVelX = Math.cos(angle)
        ballVelY = Math.sin(angle)
    }
}

// checks every brick for collision
// triggers random bouncing
// if brick touched is the last one triggers win
function detectBrickBounce() {
    let win = true, bounced = false
    
    bricks.forEach((brick) => {
        if (!brick.alive) {
            return
        }        
        switch (brick.type) {
            case 'rect':
            bounced = rectBrickBounce(brick)
            break;
            case 'circle':
            bounced = circleBrickBounce(brick)
            break;
            default:
            console.log('wrong brick type : "' + brick.type + '"')
            break;
        }

        if (bounced) {
            score += 100 + (currentLvl - 1)*10

            if (noBrickBounce && brick.name == undefined) {
                brick.alive = false
                // brick.div.style.display = 'none'
                brick.div.remove()
            } else {
                brick.hp = brick.hp - 1
                if (brick.hp == 0) {
                    if (brick.name) {
                        winMenu()
                        return
                    }
                    brick.alive = false
                    // brick.div.style.display = 'none'
                    brick.div.remove()
                    if (Math.random() < bonusChance) {
                        createBonus()
                    }
                } else {
                    setBrickColor(brick)
                    win = false
                }
            }
        } else {
            win = false
        }
    })

    if (win) {
        winMenu()   
    }        
}

// handles bouncing on a rectangular brick
function rectBrickBounce(brick) {
    const leftX = ballX + ballRadius - brick.x,
    rightX = brick.x + brick.w - (ballX - ballRadius),
    topY = ballY + ballRadius - brick.y,
    lowY = brick.y + brick.h - (ballY - ballRadius)

    if (leftX >= 0 && rightX >= 0 && topY >= 0 && lowY >= 0) {
        if (noBrickBounce && brick.name == undefined) {
            return true
        }

        let min = Math.min(leftX, rightX, topY, lowY)
        if (min == leftX || min == rightX) {
            ballVelX = - ballVelX
            if (min == leftX) {
                ballX = brick.x - ballRadius - 1
            } else {
                ballX = brick.x + brick.w + ballRadius + 1
            }
        } else {
            ballVelY = - ballVelY
            if (min == topY) {
                ballY = brick.y - ballRadius - 1
            } else {
                ballY = brick.y + brick.h + ballRadius + 1
            }
        }
        return true
    } else {
        return false
    }
}

// handles bouncing on circle brick
function circleBrickBounce(brick) {
    const minDist = brick.radius + ballRadius
    let dist = squareDistance([brick.x, brick.y],[ballX, ballY])
    if (dist > minDist * minDist) {
        return false
    }

    if (noBrickBounce && brick.name == undefined) {
        return true
    }

    dist = Math.sqrt(dist)
    let dirX = (ballX - brick.x) / dist, dirY = (ballY - brick.y) / dist
    let dirAngle = getAngle(dirX, dirY), velAngle = getAngle(-ballVelX, -ballVelY), newAngle = 2 * dirAngle - velAngle

    ballVelX = Math.cos(newAngle)
    ballVelY = Math.sin(newAngle)

    ballX += (minDist - dist) * dirX
    ballY += (minDist - dist) * dirY

    return true
}