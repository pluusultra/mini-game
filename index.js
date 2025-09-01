const mainVehicle = document.querySelector('.game__car');
let carShift = 0
let carAcceleration = 4
let carMoveStatus = {
    moveRight: null,
    moveLeft: null
}

document.addEventListener('keydown', (event) => {
    console.log(event)
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
    }
    if (event.code === 'KeyA') {
        cancelAnimationFrame(carMoveStatus.moveLeft)
        carMoveStatus.moveLeft = null;
    }
})

const moveCarToRight = () => {
    mainVehicle.style.transform = `translateX(${carShift}px)`
    carShift += carAcceleration
    carMoveStatus.moveRight = requestAnimationFrame(moveCarToRight)
}

const moveCarToLeft = () => {
    mainVehicle.style.transform = `translateX(${carShift}px)`
    carShift -= carAcceleration
    carMoveStatus.moveLeft = requestAnimationFrame(moveCarToLeft)
}