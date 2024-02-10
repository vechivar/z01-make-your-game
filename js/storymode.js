// class to display story
// activate : returns true if story is ready to be played
// txt : all texts displayed above animation
// anim : functions executed at each step
// bricks : function executed to spawn level at the end of story display

// context contains elements of the story.
// context.elems : array containing {div, animate} objects. animate functions are executed at each frame 

const storyTilePalet = 2

class storyLvl {
    constructor(activate, txt, anim, bricks) {
        this.txt = txt
        this.anim = anim
        this.context = {}
        this.bricks = bricks
        this.activate = activate

        if (txt.length != anim.length) {
            console.log('Something wrong : storyLvl with different anim and txt length')
        }

        this.pages = txt.length
    }

    start() {
        drawTileMap(storyTileMap, storyTilePalet)
        gameState = 'storyTelling'
        ball.style.display = 'none'
        bar.style.display = 'none'

        this.context = {}
        this.context.elems = []

        const txtDisplay = document.createElement('div')
        txtDisplay.classList = 'storyTxt'
        this.context.txtDisplay = txtDisplay
        screen.append(txtDisplay)

        const animDisplay = document.createElement('div')
        animDisplay.classList = 'storyScreen'
        this.context.animDisplay = animDisplay
        screen.append(animDisplay)

        this.page = -1
        this.display()
    }

    display() {
        if (this.context.locked) {
            return
        }

        this.page++
        if (this.page >= this.pages) {
            this.context.animDisplay.remove()
            this.context.txtDisplay.remove()
            storyStep++
            this.bricks()
            if (storyStep == 1) {
                initGame()
            } else if (storyStep == story.length) {
                endGameMenu()
            } else {
                initRound()
            }
        } else {
            this.context.txtDisplay.innerHTML = '<div>' + this.txt[this.page] + '</div>'
            // this.context.txtDisplay.innerText = this.txt[this.page]
            this.anim[this.page](this.context)
        }
    }
}

const story = []

const nulFunc = () => {}

story[0] = new storyLvl(
    () => {
        return true
    },
    [
        'In the geometry universe...',
        'Rectangles became crazy.',
        'Fortunately...',
        'Two heroes decided to step up.',
        'Two heroes decided to step up.',
        'Two heroes decided to step up.'
    ],
    [
        // rectangles spawn
        (context) => {
            for (let i = 0; i < 6; i++) {
                const div = document.createElement('div')
                const elem = {div:div}
                div.classList = 'brick'
                div.style.width = (screenWidth / 6) + 'px'
                div.style.height = '40px'

                switch (i) {
                    case 0:
                    elem.top = 10
                    div.style.top = '10%'
                    div.style.left = '20%'
                    div.style.backgroundColor = 'red'
                    break
                    case 1:
                    elem.top = 15
                    div.style.top = '15%'
                    div.style.left = '70%'
                    div.style.backgroundColor = 'black'
                    break
                    case 2:
                    elem.top = 48
                    div.style.top = '48%'
                    div.style.left = '63%'
                    div.style.backgroundColor = 'black'
                    break
                    case 3:
                    elem.top = 60
                    div.style.top = '60%'
                    div.style.left = '76%'    
                    div.style.backgroundColor = 'yellow'
                    break
                    case 4:
                    elem.top = 80
                    div.style.top = '80%'
                    div.style.left = '8%'    
                    div.style.backgroundColor = 'green'
                    break               
                    case 5:
                    elem.top = 50
                    div.style.top = '50%'
                    div.style.left = '40%'    
                    div.style.backgroundColor = 'blue'
                    break
                    case 6:
                    elem.top = 88
                    div.style.top = '88%'
                    div.style.left = '32%'    
                    div.style.backgroundColor = 'blue'     
                    break               
                }
                elem.animate = nulFunc
                context.animDisplay.append(div)
                context.elems.push(elem)
            }
        },
        // rectangles shake
        (context) => {
            let i = 0
            context.elems.forEach(e => {
                console.log(e.top)
                e.i = 0
                e.dir = 1
                e.animate = () => {
                    e.i = e.i + e.dir * Math.random()
                    if (e.i > 10) {
                        e.dir = -1
                    }
                    if (e.i < 0) {
                        e.dir = 1
                    }
                    e.div.style.top = (e.top + e.i) + '%'
                }
            });
        },
        // remove rectangles
        (context) => {
            context.elems.forEach(e => {
                e.div.remove()
            })
            context.elems= []
        },
        // show heroes
        (context) => {
            const ball = document.createElement('div')
            ball.classList = 'ball'
            ball.style.opacity = 0;
            ball.style.width = ballRadius * 2 + 'px'
            ball.style.height = ballRadius * 2 + 'px'
            ball.style.top = '40%'
            ball.style.left = '40%'
            const elemBall = {div:ball, op:0, animate:() => {
                if (elemBall.op < 1) {
                    elemBall.op += 0.025
                    ball.style.opacity = elemBall.op
                }
            }}
            context.elems.push(elemBall)
            context.animDisplay.append(ball)

            const bar = document.createElement('div')
            bar.classList = 'bar'
            bar.style.opacity = 0;
            bar.style.top = '40%'
            bar.style.left = '60%'
            const elemBar = {div:bar, op:0, animate:() => {
                if (elemBar.op < 1) {
                    elemBar.op += 0.025
                    bar.style.opacity = elemBar.op
                }
            }}
            context.elems.push(elemBar)
            context.animDisplay.append(bar)
        },
        // we have to investigate
        (context) => {
            const speech = speechElem('We have to investigate, Mike.', 30, 28)
            context.animDisplay.append(speech.div)
            context.elems.push(speech)
        },
        // let's go
        (context) => {
            context.elems[context.elems.length -1].div.remove()
            const speech = speechElem("Let's go, Butch.", 30, 60)
            context.animDisplay.append(speech.div)
            context.elems.push(speech)
        }
    ],
        () => {
            addBricks()
        }
)

story[1] = new storyLvl(
    () => {
        return true
    },
    [
        'Mike and Butch kept looking for informations.',
        '',
        '',
        'Get 10 000 points to find more informations.'
    ],
    [
        // show heroes
        (context) => {
            context.elems = showHeroes()
            context.elems.forEach(e => {
                context.animDisplay.append(e.div)
            })
        },
        // we have to keep going
        (context) => {
            const speech = speechElem('We have to keep going, Mike.', 30, 28)
            context.animDisplay.append(speech.div)
            context.elems.push(speech)
        },
        // you're right
        (context) => {
            context.elems[context.elems.length -1].div.remove()
            const speech = speechElem("You're right, Butch.", 30, 60)
            context.animDisplay.append(speech.div)
            context.elems.push(speech)
        },
        nulFunc
    ],
        () => {
            addBricks()
        }
)

story[2] = new storyLvl(
    () => {
        return score >= 10000
    },
    [
        'And finally...',
        '',
        '',
        '',
        ''
    ],
    [
        // show heroes
        (context) => {
            context.elems = showHeroes()
            context.elems.forEach(e => {
                context.animDisplay.append(e.div)
                e.top = 40
            })
            const bj = bigJoe()
            bj.top = 50
            context.elems.push(bj)
            context.animDisplay.append(bj.div)
        },
        // this guy looks suspicious
        (context) => {
            const speech = speechElem('This guy looks suspicious, Mike.', 30, 28)
            context.animDisplay.append(speech.div)
            context.elems.push(speech)
        },
        // let's get him
        (context) => {
            context.elems[context.elems.length -1].div.remove()
            const speech = speechElem("Let's get him, Butch.", 30, 60)
            context.animDisplay.append(speech.div)
            context.elems.push(speech)
        },
        // !!!!!!
        (context) => {
            context.elems[context.elems.length -1].div.remove()
            const speech = speechElem("!!!!!!!", 45, 48)
            speech.top = 45
            context.animDisplay.append(speech.div)
            context.elems.push(speech)
        },
        // come back here
        // everybody runs
        (context) => {
            const speech = speechElem('Come back here !', 40, 28)
            speech.top = 30
            context.animDisplay.append(speech.div)
            context.elems.push(speech)
            context.elems.forEach(e => {
                e.animate = () => {
                    e.top += 0.5
                    if (e.top < 110) {
                        e.div.style.top = e.top + '%'
                    }
                }
            })
        }

    ],
    () => {
        bigJoeLevel()
    }
)

story[3] = new storyLvl(
    () => {
        return true
    },
    [
        '',
        '',
        '',
        '',
        '',
        '',
        ''
    ],
    [
        // show characters
        (context) => {
            context.elems = showHeroes()
            context.elems.forEach(e => {
                context.animDisplay.append(e.div)
            })
            const bj = bigJoe()
            context.elems.push(bj)
            bj.div.style.backgroundColor = 'blue'
            context.animDisplay.append(bj.div)
        },
        // stop it i'll talk
        (context) => {
            const speech = speechElem("Stop it ! I'll talk !", 45, 43)
            context.animDisplay.append(speech.div)
            context.elems.push(speech)
        },
        // who is behind all this mess
        (context) => {
            context.elems[context.elems.length -1].div.remove()
            const speech = speechElem("Who is behind all this mess, Big Joe ?", 30, 25)
            context.animDisplay.append(speech.div)
            context.elems.push(speech)
        },
        // i had no choice
        (context) => {
            context.elems[context.elems.length -1].div.remove()
            const speech = speechElem("I had no choice, Butch.", 45, 40)
            context.animDisplay.append(speech.div)
            context.elems.push(speech)
        },
        // it's a conspiracy from the balls
        (context) => {
            context.elems[context.elems.length -1].div.remove()
            const speech = speechElem("It's a conspiracy from the balls...", 45, 35)
            context.animDisplay.append(speech.div)
            context.elems.push(speech)
        },
        // You need to find their boss
        (context) => {
            context.elems[context.elems.length -1].div.remove()
            const speech = speechElem("You need to find their boss.", 45, 38)
            context.animDisplay.append(speech.div)
            context.elems.push(speech)
        },
        // let's go mike
        (context) => {
            context.elems[context.elems.length -1].div.remove()
            const speech = speechElem("Let's go, Mike.", 30, 35)
            context.animDisplay.append(speech.div)
            context.elems.push(speech)
        }

    ],
    () => {
        addBricks()
    }
)

story[4] = new storyLvl(
    () => {
        return currentLvl >=7
    },
    [
        'They kept going.',
        '',
        ''
    ],
    [
        // show characters
        (context) => {
            context.elems = showHeroes()
            context.elems.forEach(e => {
                context.animDisplay.append(e.div)
            })
        },
        // i think we're getting close
        (context) => {
            const speech = speechElem("I think we're getting close, Mike.", 30, 25)
            context.animDisplay.append(speech.div)
            context.elems.push(speech)
        },
        // let's keep going
        (context) => {
            context.elems[context.elems.length -1].div.remove()
            const speech = speechElem("Let's keep going, Butch.", 30, 58)
            context.animDisplay.append(speech.div)
            context.elems.push(speech)
        }

    ],
    () => {
        removeBricks()
        bricks = Array()
        randomCircleBricks(15, 30, 60)
    }
)

story[5] = new storyLvl(
    () => {
        return true
    },
    [
        "Until they found the balls' lair.",
        '',
        ''
    ],
    [
        // show characters
        (context) => {
            context.elems = showHeroes()
            context.elems.forEach(e => {
                context.animDisplay.append(e.div)
            })
        },
        // i think we're getting close
        (context) => {
            const speech = speechElem("More are coming, Mike.", 30, 30)
            context.animDisplay.append(speech.div)
            context.elems.push(speech)
        },
        // let's keep going
        (context) => {
            context.elems[context.elems.length -1].div.remove()
            const speech = speechElem("We can't stop now, Butch.", 30, 55)
            context.animDisplay.append(speech.div)
            context.elems.push(speech)
        }

    ],
    () => {
        removeBricks()
        bricks = Array()
        randomCircleBricks(15, 30, 60)
        bricks.forEach(b => {
            b.hp = 2
            setBrickColor(b)
        })
    }
)

story[6] = new storyLvl(
    () => {
        return true
    },
    [
        'And deep inside was their boss.',
        '',
        '',
        ''
    ],
    [
        // show characters
        (context) => {
            context.elems = showHeroes()
            context.elems.forEach(e => {
                context.animDisplay.append(e.div)
            })
        },
        // here comes their boss
        (context) => {
            const speech = speechElem("Here comes their boss, Mike.", 30, 30)
            context.animDisplay.append(speech.div)
            context.elems.push(speech)
        },
        // boss appears
        (context) => {
            context.elems[context.elems.length -1].div.remove()
            const boss = ballBoss()
            boss.animate = () => {
                if (boss.op < 1) {
                    boss.op += 0.025
                    boss.div.style.opacity = boss.op
                }
            }
            boss.op = 0
            context.animDisplay.append(boss.div)
            context.elems.push(boss)
        },
        // surrender, you fools
        (context) => {
            const speech = speechElem("Surrender, you fools ! You have no chance !", 45, 30)
            context.animDisplay.append(speech.div)
            context.elems.push(speech)
        }

    ],
    () => {
        ballBossLevel()
    }
)

story[7] = new storyLvl(
    () => {
        return true
    },
    [
        '',
        '',
        '',
        '',
        '',
        'And thus the geometry universe was safe again...',
        'Thanks to Mike and Butch !'
    ],
    [
        // nooooooo
        (context) => {
            context.elems = showHeroes()
            const ballBossElem = ballBoss()
            ballBossElem.div.style.backgroundColor = 'blue'
            context.elems.push(ballBossElem)
            context.elems.push(speechElem("NOOOOOOOOOOOOOOOOOOOOOOOOOO !!!", 45, 30))
            context.elems.forEach(e => {
                context.animDisplay.append(e.div)
            })
        },
        // How is it posible ? my perfect plan is ruined
        (context) => {
            context.elems[context.elems.length -1].div.remove()
            const speech = speechElem("How is it possible ?  My perfect plan is ruined !", 45, 28)
            context.animDisplay.append(speech.div)
            context.elems.push(speech)
        },
        // damn you mike and butch
        (context) => {
            context.elems[context.elems.length -1].div.remove()
            const speech = speechElem("Damn you, Mike and Butch !", 45, 38)
            context.animDisplay.append(speech.div)
            context.elems.push(speech)
        },
        // aaargl + fade away
        (context) => {
            context.elems[context.elems.length -1].div.remove()
            const speech = speechElem("Aaaaaaaaaaaaaaaaaaaaaaaargl...", 45, 38)
            context.animDisplay.append(speech.div)
            context.elems.push(speech)

            const bb = context.elems[2]
            bb.op = 1
            bb.animate = () => {
                if (bb.op > 0) {
                    bb.op -= 0.01
                    bb.div.style.opacity = bb.op
                    speech.div.style.opacity = bb.op
                } 
            }
        },
        // good job
        (context) => {
            const speech1 = speechElem("Good job, Mike.", 30, 35)
            context.animDisplay.append(speech1.div)
            context.elems.push(speech1)
            const speech2 = speechElem("Good job, Butch.", 30, 60)
            context.animDisplay.append(speech2.div)
            context.elems.push(speech2)
        },
        nulFunc,
        nulFunc
    ],
    nulFunc
)

function showHeroes() {
    const ball = document.createElement('div')
    ball.classList = 'ball'
    ball.style.width = ballRadius * 2 + 'px'
    ball.style.height = ballRadius * 2 + 'px'
    ball.style.top = '40%'
    ball.style.left = '40%'
    const elemBall = {div:ball, animate: nulFunc}

    const bar = document.createElement('div')
    bar.classList = 'bar'
    bar.style.top = '40%'
    bar.style.left = '60%'
    const elemBar = {div:bar, animate: nulFunc}

    return [elemBall, elemBar]
}

function speechElem(txt, top, left) {
    const speech = document.createElement('div')
    speech.style.top = top + '%'
    speech.style.left = left + '%'
    speech.classList = 'storySpeech'
    speech.innerText = txt
    return {div:speech, animate:nulFunc}
}

function bigJoe() {
    const bj = document.createElement('div')
    bj.classList = 'brick'
    bj.style.width = 0.2 * screenWidth + 'px'
    bj.style.height = 0.2 * screenWidth + 'px'
    bj.style.top = '50%'
    bj.style.left = '40%'
    bj.style.backgroundColor = 'black'

    return {div:bj, animate:nulFunc}
}

function ballBoss() {
    const bj = document.createElement('div')
    bj.classList = 'circleBrick'
    bj.style.width = 0.2 * screenWidth + 'px'
    bj.style.height = 0.2 * screenWidth + 'px'
    bj.style.top = '50%'
    bj.style.left = '40%'
    bj.style.backgroundColor = 'black'

    return {div:bj, animate:nulFunc}
}