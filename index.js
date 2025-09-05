const trees = document.querySelectorAll('.tree')

const tree1 = trees[0];
const speed = 2;
let animationId = null
let coordsTree1 = getCoords(tree1)

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
    const newCoordY = coordsTree1.y + speed
    console.log(newCoordY)
    coordsTree1.y = newCoordY

    tree1.style.transform = `translate(${coordsTree1.x}px, ${newCoordY}px)`
}

treesAnimation()