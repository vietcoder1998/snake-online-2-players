const direction = {
    RIGHT: 'right',
    LEFT: 'left',
    UP: 'up',
    DOWN: 'down',
}

const size = 10

function shipRender(ship) {
    ctx.drawImage(shipImg, ship._position.x, ship._position.y, ship.w, ship.h)
}

function bulletsRender(ship) {
    console.log(ship)
    ship &&
        ship._bullets &&
        ship._bullets.forEach((bullet) => {
            ctx.fillStyle = 'yellow'
            ctx.fillRect(
                bullet._position.x,
                bullet._position.y,
                bullet.w,
                bullet.h
            )
        })
}

function alienRender(aliens) {
    aliens.forEach((item, i) => {
        ctx.fillStyle = 'orange'
        ctx.fillRect(item._position.x, item._position.y, item.w, item.h)
    })
}

function mapRender(game) {
    const { map, ship, aliens, _score } = game

    ctx.fillStyle = 'black'
    ctx.fillRect(0, 0, map.w, map.h)

    ctx.fillStyle = 'white'
    ctx.font = '20px Comic Sans MS'
    ctx.fillText(`score : ${_score}`, 20, 20)

    for (let i = 0; i < l; i++) {
        ctx.drawImage(heart, 200 + 10 * i, 10, 10, 10)
    }

    bulletsRender(ship)
    shipRender(ship)
    alienRender(aliens)
}
