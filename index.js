const trees = document.querySelectorAll('.tree')
const player = document.querySelector('.player')
const road = document.querySelector('.road')
const coin = document.querySelector('.coin')

const roadWidth = road.clientWidth / 2
const playerWidth = player.clientWidth / 2
const coinCoords = getCoords(coin)
const playerCoords = getCoords(player)
const playerHeight = player.clientHeight
const coinWidth = coin.clientWidth / 2
const coinHeight = coin.clientHeight
let speed = 10;
const treesCoords = []

let animationId = null
const moveStatus = {
    moveRight: null,
    moveLeft: null,
}

trees.forEach(tree => {
    const coordsTree = getCoords(tree)

    treesCoords.push(coordsTree)
})

document.addEventListener('keydown', (event) => {
    if (event.code === 'KeyD' || event.code === 'ArrowRight') {
        if (!moveStatus.moveRight) {
            moveStatus.moveRight = requestAnimationFrame(startMoveToRight)
        }
    }

    if (event.code === 'KeyA' || event.code === 'ArrowLeft') {
        if (!moveStatus.moveLeft) {
            moveStatus.moveLeft = requestAnimationFrame(startMoveToLeft)
        }
    }
})

document.addEventListener('keyup', (event) => {
    if (event.code === 'KeyD' || event.code === 'ArrowRight') {
        cancelAnimationFrame(moveStatus.moveRight)
        moveStatus.moveRight = null
    }

    if (event.code === 'KeyA' || event.code === 'ArrowLeft') {
        cancelAnimationFrame(moveStatus.moveLeft)
        moveStatus.moveLeft = null
    }
})

function checkCollision() {
    const playerYTop = playerCoords.y
    const playerYBottom = playerCoords.y + playerHeight;

    const playerXLeft = playerCoords.x - playerWidth;
    const playerXRight = playerCoords.x + playerWidth;

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
    if (playerCoords.x > roadWidth - playerWidth) {
        return
    }

    player.style.transform = `translate(${playerCoords.x + 5}px, ${playerCoords.y}px)`
    playerCoords.x += 5
    moveStatus.moveRight = requestAnimationFrame(startMoveToRight)
}

function startMoveToLeft () {


    if (playerCoords.x < -roadWidth + playerWidth) {
        return
    }
    player.style.transform = `translate(${playerCoords.x - 5}px, ${playerCoords.y}px) scaleX(-1)`
    playerCoords.x -= 5;
    moveStatus.moveLeft = requestAnimationFrame(startMoveToLeft)
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

