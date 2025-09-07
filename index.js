const trees = document.querySelectorAll('.tree')
const road = document.querySelector('.road')
const coin = document.querySelector('.coin')
const player = document.querySelector('.player')
const gameScoreElement = document.querySelector('.game-score')
let gameScore = 0

const playerInfo = {
    ...createElementInfo(player),
    move: {
        moveRight: null,
        moveLeft: null,
    },
}
const coinInfo = createElementInfo(coin)

const roadWidth = road.clientWidth / 2
let speed = 12;
let playerSpeed = 8;
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

function createElementInfo (element) {
    return {
        coords: getCoords(element),
        width: element.clientWidth / 2,
        height: element.clientHeight,
        visible: true,
    }
}

function checkCollision(element1Info, element2Info) {
    const playerYTop = element1Info.coords.y
    const playerYBottom = element1Info.coords.y + playerInfo.height;

    const playerXLeft = element1Info.coords.x - playerInfo.width;
    const playerXRight = element1Info.coords.x + playerInfo.width;

    const coinYTop = element2Info.coords.y;
    const coinYBottom = element2Info.coords.y + coinInfo.height;

    const coinXLeft = element2Info.coords.x - coinInfo.width;
    const coinXRight = element2Info.coords.x + coinInfo.width

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

    playerInfo.coords.x += playerSpeed;
    movePlayer(playerInfo.coords.x, playerInfo.coords.y)
    playerInfo.move.moveRight = requestAnimationFrame(startMoveToRight)
}

function startMoveToLeft () {


    if (playerInfo.coords.x < -roadWidth + playerInfo.width) {
        return
    }
    playerInfo.coords.x -= playerSpeed;
    movePlayer(playerInfo.coords.x, playerInfo.coords.y, 'left')
    playerInfo.move.moveLeft = requestAnimationFrame(startMoveToLeft)
}

function movePlayer (x, y, side) {
    if (side === 'left') {
        console.log('left')
        player.style.transform = `translate(${x}px, ${y}px) scaleX(-1)`
    } else {
        player.style.transform = `translate(${x}px, ${y}px)`
    }
}

function startGame() {
    if (coinInfo.visible && checkCollision(playerInfo, coinInfo)) {
        gameScore++
        coin.style.display = 'none';
        coinInfo.visible = false;
        updateGameScore(gameScore)
    }
    treesAnimation()
    elementAnimation(coin, coinInfo, 1000)
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

function elementAnimation(element, elementInfo, innitialCoordY) {
    let newCoordY = elementInfo.coords.y + speed;
    let newCoordX = elementInfo.coords.x;

    if (newCoordY > window.innerHeight) {
        const direction = Math.floor(Math.random() * 2)
        const maxXCord = (roadWidth + 1 - elementInfo.width)
        const randomXCoord = Math.floor(Math.random() * (roadWidth + 1));
        newCoordX = direction === 0 ? -randomXCoord : randomXCoord;
        newCoordY = -innitialCoordY
        element.style.display = 'initial'
        elementInfo.visible = true
    }

    elementInfo.coords.y = newCoordY;
    elementInfo.coords.x = newCoordX
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

function updateGameScore (number) {
    gameScoreElement.textContent = number
}

animationId = requestAnimationFrame(startGame)

