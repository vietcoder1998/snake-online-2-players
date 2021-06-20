const id = new Date().getTime().toString()
const gameIds = []
let roomId

const client = io.connect(`http://192.168.1.55:3007`, {
    auth: {
        id,
        username: `user${Math.floor(Math.random() * 10)}`,
        avatar: '_',
        token: '_'
    }
});

const SkEventSnake = {
    START_GAME_SNAKE: 'start_game_snake',
    DIRECTION_SNAKE: 'direction_snake',
    PAUSING_SNAKE: 'pausing_snake',
    NEW_GAME_SNAKE: 'new_game_snake',
    ALL_GAME_SNAKE: 'all_game_snake',
    JOIN_SNAKE_QUEUE: 'join_snake_queue_snake',
    MATCH_USER_SNAKE: 'match_user_snake',
    LEAVE_QUEUE_SNAKE: 'leave_queue_snake',
    UPDATE_ROOM_SNAKE: 'update_room_snake',
    QUERY_ROOM_SNAKE: 'query_room_snake',
    END_GAME_SNAKE: 'end_game_snake',
    CREATE_NEW_GAME_SNAKE: 'create_new_game_snake',
    RESET_GAME_SNAKE: 'reset_snake_game_snake',
}

const query = function () {
    console.log('get')
    client.emit(SkEventSnake.QUERY_ROOM_SNAKE)
}
const getAll = function () {
    client.emit(SkEventSnake.ALL_GAME_SNAKE)
}
const onJoinQueue = function () {
    client.emit(SkEventSnake.JOIN_SNAKE_QUEUE, id)
}
const onResetGame = function () {
    client.emit(SkEventSnake.RESET_GAME_SNAKE, roomId)
}


const onLogin = function (e) {
    e.preventDefault()
    fetch('http://localhost:3007', {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.parse(e)
    }).then(res => {
        console.log(res)
    })
}

client.on("connect", (socket) => {
    console.log('connect success ')
});

client.on(SkEventSnake.UPDATE_ROOM_SNAKE, (res) => {
    console.log(res)
    console.log('games is update ->', res.data)
    const { games } = res.data

    Object.keys(games).forEach((key, i) => {
        drawerMap(key, games[key])
    })
})

client.on(SkEventSnake.RESET_GAME_SNAKE, (res) => {
    const { games } = res.data
    console.log('reset_room')

    Object.keys(games).forEach((key, i) => {
        drawerMap(key, games[key])
    })
})

client.on(SkEventSnake.ALL_GAME_SNAKE, (games) => {
    console.log('all game ->', games)
})

client.on(SkEventSnake.MATCH_USER_SNAKE, (res) => {
    console.log('match user ->', res)
    const { games } = res.data
    roomId = res.data.id
    var canvasList = document.getElementsByTagName('canvas')

    Object.keys(games).forEach((key, i) => {
        const canvas = canvasList[i]
        canvas.id = key
        gameIds.push(key)
        drawerMap(key, games[key])
    })
})

client.on('error', e => {
    console.log(e)
})

const onStartGame = function () {
    client.emit(SkEventSnake.START_GAME_SNAKE, roomId)
}

const onStopGame = function() {
    client.emit(SkEventSnake.PAUSING_SNAKE, roomId)
}

document.addEventListener('keyup', e => {
    e.preventDefault()
    let d = null
    switch (e.key) {
        case 'ArrowLeft':
            d = direction.LEFT
            break;
        case 'ArrowRight':
            d = direction.RIGHT
            break;
        case 'ArrowUp':
            d = direction.UP
            break;
        case 'ArrowDown':
            d= direction.DOWN
        break;
        
    
        default:
            break;
    }

    if (d) {
        client.emit(SkEventSnake.DIRECTION_SNAKE, d, roomId, id)
    }
})