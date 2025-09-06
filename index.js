import {startMoveToLeft, startMoveToRight, moveStatus} from "./movePlayer";
import {getCoords} from "./getCoords";
import {treesAnimation, elementAnimation} from "./animation";

const trees = document.querySelectorAll('.tree')
const player = document.querySelector('.player')
const road = document.querySelector('.road')
const coin = document.querySelector('.coin')

const roadWidth = road.clientWidth / 2
const playerWidth = player.clientWidth / 2
const coinCoords = getCoords(coin)
const coinWidth = coin.clientWidth / 2
const coinHeight = coin.clientHeight
let speed = 10;

let animationId = null

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

const treesCoords = []

trees.forEach(tree => {
    const coordsTree = getCoords(tree)

    treesCoords.push(coordsTree)
})

animationId = requestAnimationFrame(startGame)

function startGame() {
    treesAnimation()
    elementAnimation(coin, coinCoords, coinWidth, 1000)
    animationId = requestAnimationFrame(startGame)
}

