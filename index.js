const car = document.querySelector('.game__car');
const gameWrapper = document.querySelector('.game-wrapper');

let carShift = 0
let carAcceleration = 6
let carMoveStatus = {
    moveRight: null,
    moveLeft: null
}
const gameWrapperWidth = gameWrapper.clientWidth / 2
const carWidth = car.clientWidth / 2

document.addEventListener('keydown', (event) => {
    if (event.code === 'KeyD' && carMoveStatus.moveRight === null) {
        carMoveStatus.moveRight = requestAnimationFrame(moveCarToRight)
    }
    if (event.code === 'KeyA' && carMoveStatus.moveLeft === null) {
        carMoveStatus.moveLeft = requestAnimationFrame(moveCarToLeft)
    }
})

document.addEventListener('keyup', (event) => {
    if (event.code === 'KeyD') {
        cancelAnimationFrame(carMoveStatus.moveRight)
        carMoveStatus.moveRight = null;
        setDefaultRotate()
    }
    if (event.code === 'KeyA') {
        cancelAnimationFrame(carMoveStatus.moveLeft)
        carMoveStatus.moveLeft = null;
        setDefaultRotate()
    }
})

const moveCarToRight = () => {
    const carCords = getCords(car)

    if (carCords > gameWrapperWidth - carWidth) {
        setDefaultRotate()
        return
    }

    car.style.transform = `translateX(${carShift}px) rotate(15deg)`
    carShift += carAcceleration
    console.log('car cords: ', getCords(car))
    console.log('wrapper cords: ', gameWrapperWidth - carWidth)
    carMoveStatus.moveRight = requestAnimationFrame(moveCarToRight)
}

const moveCarToLeft = () => {
    const carCords = getCords(car)

    if (carCords < -gameWrapperWidth + carWidth) {
        setDefaultRotate()
        return
    }

    car.style.transform = `translateX(${carShift}px) rotate(-15deg)`
    carShift -= carAcceleration
    console.log(getCords(car))
    carMoveStatus.moveLeft = requestAnimationFrame(moveCarToLeft)
}

const setDefaultRotate = () => {
    const currentCords = getCords(car)
    car.style.transform = `translateX(${currentCords}px) rotate(0deg)`
}

const getCords = (item) => {
    const matrix = window.getComputedStyle(item).transform
    const array = matrix.split(',')
    const value = array[array.length - 2]
    return parseFloat(value)
}
