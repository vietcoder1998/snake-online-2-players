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

function bulletsRender(bullets) {
    ctx.fillStyle = 'yellow'
    bullets.forEach((bullet) => {
        ctx.fillRect(
            bullet._position.x - bullet.w / 2,
            bullet._position.y - bullet.h / 2,
            bullet.w,
            bullet.h
        )
    })
}

function alienRender(aliens) {
    aliens.forEach((alien, i) => {
        ctx.fillStyle = 'orange'
        ctx.drawImage(
            alienImg,
            alien._position.x - alien.w / 2,
            alien._position.y - alien.h / 2,
            alien.w,
            alien.h
        )
    })
}

;(function defaultRender() {
    ctx.fillStyle = 'black'
    ctx.fillRect(0, 0, 800, 800)
})()

function mapRender(map, life, score) {
    ctx.restore()
    ctx.fillStyle = 'black'
    ctx.drawImage(bg, 0, 0, map.w, map.h)

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

        ship && bulletsRender(ship._bullets)
        aliens.forEach((alien) => {
            alien && bulletsRender(alien._bullets)
        })

        shipRender(ship)
        alienRender(aliens)
        ctx.restore()
    } catch (err) {
        console.log(err)
        client.disconnect()
    }
}
