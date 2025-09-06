function elementAnimation(element, elementCoords, elementWidth, initialCoordsY) {
    let newCoordY = elementCoords.y + speed;
    let newCoordX = elementCoords.x;

    if (newCoordY > window.innerHeight) {
        const direction = Math.floor(Math.random() * 2)
        const maxXCord = (roadWidth + 1 - elementWidth)
        const randomXCoord = Math.floor(Math.random() * (roadWidth + 1));
        newCoordX = direction === 0 ? -randomXCoord : randomXCoord;
        newCoordY = -initialCoordsY
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


export {treesAnimation, elementAnimation}