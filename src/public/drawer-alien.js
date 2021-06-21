const direction = {
    RIGHT: 'right',
    LEFT: 'left',
    UP: 'up',
    DOWN: 'down',
}

const size = 10

function recallLocation(x, y, w, h) {
    return {
        x: x - w / 2,
        y: y - w / 2,
        w,
        h,
    }
}

function shipRender(ship) {
    ctx.drawImage(
        shipImg,
        ship._position.x - ship.w / 2,
        ship._position.y - ship.h / 2,
        ship.w,
        ship.h
    )
    ctx.restore()
}

function bulletsRender(ship) {
    ctx.fillStyle = 'yellow'
    ship &&
        ship._bullets &&
        ship._bullets.forEach((bullet) => {
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

;(function defaultRender() {
    ctx.fillStyle = 'black'
    ctx.fillRect(0, 0, 800, 800)
})()

function mapRender(map, life, score) {
    ctx.fillStyle = 'black'
    ctx.fillRect(0, 0, map.w, map.h)

    ctx.fillStyle = 'white'
    ctx.font = '20px Comic Sans MS'
    ctx.fillText(`score : ${score}`, 20, 20)

    for (let i = 0; i < life; i++) {
        ctx.drawImage(heart, 200 + 10 * i, 10, 10, 10)
    }
}

function gameRender(game) {
    try {
        const { map, ship, aliens, _score, life } = game
        mapRender(map, life, _score)
        bulletsRender(ship)
        shipRender(ship)
        alienRender(aliens)
    } catch (err) {
        client.disconnect()
    }
}
