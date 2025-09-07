const trees = document.querySelectorAll('.tree')
const road = document.querySelector('.road')
const coin = document.querySelector('.coin')

const player = document.querySelector('.player')
const playerInfo = {
    width: coin.clientWidth / 2,
    height: player.clientHeight,
    coords: getCoords(player),
    move: {
        moveRight: null,
        moveLeft: null,
    },
}

const roadWidth = road.clientWidth / 2
const coinCoords = getCoords(coin)
const coinWidth = coin.clientWidth / 2
const coinHeight = coin.clientHeight
let speed = 10;
const treesCoords = []

let animationId = null

trees.forEach(tree => {
    const coordsTree = getCoords(tree)

    treesCoords.push(coordsTree)
})

document.addEventListener('keydown', (event) => {
    if (event.code === 'KeyD' || event.code === 'ArrowRight') {
        if (!playerInfo.move.moveRight) {
            playerInfo.move.moveRight = requestAnimationFrame(startMoveToRight)
        }
    }

    if (event.code === 'KeyA' || event.code === 'ArrowLeft') {
        if (!playerInfo.move.moveLeft) {
            playerInfo.move.moveLeft = requestAnimationFrame(startMoveToLeft)
        }
    }
})

document.addEventListener('keyup', (event) => {
    if (event.code === 'KeyD' || event.code === 'ArrowRight') {
        cancelAnimationFrame(playerInfo.move.moveRight)
        playerInfo.move.moveRight = null
    }

    if (event.code === 'KeyA' || event.code === 'ArrowLeft') {
        cancelAnimationFrame(playerInfo.move.moveLeft)
        playerInfo.move.moveLeft = null
    }
})

function checkCollision() {
    const playerYTop = playerInfo.coords.y
    const playerYBottom = playerInfo.coords.y + playerInfo.height;

    const playerXLeft = playerInfo.coords.x - playerInfo.width;
    const playerXRight = playerInfo.coords.x + playerInfo.width;

    const coinYTop = coinCoords.y;
    const coinYBottom = coinCoords.y + coinHeight;

    const coinXLeft = coinCoords.x - coinWidth;
    const coinXRight = coinCoords.x + coinWidth

    if (playerYTop > coinYBottom || playerYBottom < coinYTop) {
        return false
    }

    if (playerXLeft > coinXRight || playerXRight < coinXLeft) {
        return false
    }

    return true
}

function startMoveToRight () {
    if (playerInfo.coords.x > roadWidth - playerInfo.width) {
        return
    }

    player.style.transform = `translate(${playerInfo.coords.x + 5}px, ${playerInfo.coords.y}px)`
    playerInfo.coords.x += 5
    playerInfo.move.moveRight = requestAnimationFrame(startMoveToRight)
}

function startMoveToLeft () {


    if (playerInfo.coords.x < -roadWidth + playerInfo.width) {
        return
    }
    player.style.transform = `translate(${playerInfo.coords.x - 5}px, ${playerInfo.coords.y}px) scaleX(-1)`
    playerInfo.coords.x -= 5;
    playerInfo.move.moveLeft = requestAnimationFrame(startMoveToLeft)
}

function startGame() {
    console.log(checkCollision())
    treesAnimation()
    elementAnimation(coin, coinCoords, coinWidth, 1000)
    animationId = requestAnimationFrame(startGame)
}


function getCoords(item) {
    const matrix = window.getComputedStyle(item).transform;
    const coords = matrix.split(',')
    const y = coords[coords.length - 1]
    const x = coords[coords.length - 2]
    const numericY = parseFloat(y)
    const numericX= parseFloat(x)
    return {
        y: numericY,
        x: numericX
    }
}

function elementAnimation(element, elementCoords, elementWidth, innitialCoordY) {
    let newCoordY = elementCoords.y + speed;
    let newCoordX = elementCoords.x;

    if (newCoordY > window.innerHeight) {
        const direction = Math.floor(Math.random() * 2)
        const maxXCord = (roadWidth + 1 - elementWidth)
        const randomXCoord = Math.floor(Math.random() * (roadWidth + 1));
        newCoordX = direction === 0 ? -randomXCoord : randomXCoord;
        newCoordY = -innitialCoordY
    }

    elementCoords.y = newCoordY;
    elementCoords.x = newCoordX
    element.style.transform = `translate(${newCoordX}px, ${newCoordY}px)`
}

function treesAnimation () {
    for (let i = 0; i < trees.length; i++) {
        const tree = trees[i];
        const coords = treesCoords[i]
        let newCoordY = coords.y + speed

        if (newCoordY > window.innerHeight) {
            newCoordY = -tree.height
        }

        treesCoords[i].y = newCoordY;

        tree.style.transform = `translate(${coords.x}px,${newCoordY}px)`
    }
}

animationId = requestAnimationFrame(startGame)

