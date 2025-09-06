const moveStatus = {
    moveRight: null,
    moveLeft: null,
}

function startMoveToLeft () {
    const currentCoords = getCoords(player)

    if (currentCoords.x < -roadWidth - playerWidth) {
        return
    }
    player.style.transform = `translateX(${currentCoords.x - 5}px) scaleX(-1)`
    moveStatus.moveLeft = requestAnimationFrame(startMoveToLeft)
}

function startMoveToRight () {
    const currentCoords = getCoords(player)

    if (currentCoords.x > roadWidth - playerWidth) {
        return
    }

    player.style.transform = `translateX(${currentCoords.x + 5}px)`
    moveStatus.moveRight = requestAnimationFrame(startMoveToRight)
}

export {startMoveToLeft, startMoveToRight, moveStatus}