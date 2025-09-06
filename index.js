const trees = document.querySelectorAll('.tree')
const player = document.querySelector('.player')
const road = document.querySelector('.road')

const roadWidth = road.clientWidth / 2
const playerWidth = player.clientWidth / 2
let speed = 2;

let animationId = null
const moveStatus = {
    moveRight: null,
    moveLeft: null,
}

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

function startMoveToRight () {
    const currentCoords = getCoords(player)
    console.log('currentCoords X: ', currentCoords.x)
    console.log(roadWidth)
    
    if (currentCoords.x > roadWidth - playerWidth) {
        return
    }
    
    player.style.transform = `translateX(${currentCoords.x + 2}px)`
    moveStatus.moveRight = requestAnimationFrame(startMoveToRight)
}

function startMoveToLeft () {
    const currentCoords = getCoords(player)

    console.log('currentCoords X: ', currentCoords.x)
    console.log(roadWidth)

    if (currentCoords.x < -roadWidth - playerWidth) {
        return
    }
    player.style.transform = `translateX(${currentCoords.x - 2}px) scaleX(-1)`
    moveStatus.moveLeft = requestAnimationFrame(startMoveToLeft)
}


const treesCoords = []


trees.forEach(tree => {
    const coordsTree = getCoords(tree)

    treesCoords.push(coordsTree)
})

animationId = requestAnimationFrame(startGame)

function startGame() {
    treesAnimation()
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



