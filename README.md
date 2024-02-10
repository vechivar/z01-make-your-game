# Make-your-game

This project implements a homemade version of a brick-breaker game, written with CSS and Javascript and without any libs or framework, using Javascript built-in requestAnimationFrame function. It is the first "big" project coming after Javascript piscine during zone01 cursus.

## How to use

`go run .` to launch local server, then visit (http://localhost:8001/)

Use W and C to move the bar (awkward controls due to very personal keyboard issues...). Use Space for everything else, including launching the ball, advancing animated sequences, pausing and unpausing the game.

## Game features

- A (silly) story mode as required from the subject, with basic animated sequences and boss levels.
- An endless mode that eventually becomes imposible to beat.
- Calculating a score while playing through the game.
- Evolving levels, with more bricks and increasing ball speed.
- Different bricks (rectangles and circles) with increasing health points and different brick layout.
- Changing background colors with levels.
- Adaptive ball bouncing on bar : bounce angle changes with position on the bar and with bar movement.
- Minimum angle guaranteed when bouncing on vertical walls, so that horizontal ball directions won't happen.
- Different bonuses to catch : changing ball speed, changing bar width, bonus points, bonus life and "demolition ball" (ball destroys every brick without bouncing)

## Project state

The project has been validated by zone01 Rouen community, lots of critics and thoughts on how to imprive it can be made though.

- The project's architecture is not good. As a first big Javascript project, it was not planned enough, and it got worse as more and more features got added to the game. If the game needed to be extended, it's the first thing that should be fixed. A better architecture could include :
    - A main.js file including all other needed javascript files.
    - A file architecture and imports/exports corresponding to code logic, rather than organized by game topics.
    - Using object oriented programming to help strucure code and files.

- Little work was made on graphics, thus the game is not very beautiful. These points could be considered to improve the game's graphics. 
    - Tilemap structure, with premade layout and single tileset image, was imposed by the subject. Background would probably look better with single images chosen appropriately.
    - Bricks, balls, bars and menus would also look better with images background rather than CSS single background color.
    - Menu on the right should have its own design, and would probably look better on top.

- From a technical point of view, the game works quite good. The main issue is that the way the game detects collisions between the ball and the bricks sometimes causes weird bounces when the ball reaches a brick corner. The collision/bouncing system could be redesigned to better handle those rare edge cases.

- Lots of work could be done to improve game design, for example :
    - As in original Arkanoid, the game could feel better if bar bouncing only depended on the collision position in the bar.
    - Adding more customized brick layouts.
    - Adding different size and properties to the bricks.