

const direction = {
    RIGHT: 'right',
    LEFT: 'left',
    UP: 'up',
    DOWN: 'down',
}

const size = 10

function drawerMap(canvasId, game) {
    const cv = document.getElementById(canvasId)
    const ctx = cv.getContext('2d')
    updateMap(ctx, game)
}

const drawerSnake = function (ctx, snake) {
    snake.forEach((item, i) => {
        if (i === snake.length - 1) {
            ctx.fillStyle = 'green'
        } else {
            ctx.fillStyle = 'red'
        }

        ctx.fillRect(size * item.x, size * item.y, size, size)
    })
}

const drawerFood = function (ctx, foods) {
    console.log(foods)
    foods.forEach((item, i) => {
        ctx.fillStyle = 'orange'
        ctx.fillRect(size*item.x, size*item.y, size, size)
    })
}

const updateMap = function (ctx, game) {
    const { map, snake, foods } = game
    console.log("snake ->", game.snake.body)
    console.log("vector ->", game.snake.vector)

    ctx.fillStyle = 'black'
    ctx.fillRect(0, 0, size * map.w, size * map.h)
    drawerSnake(ctx, snake.body)
    drawerFood(ctx, foods)
}