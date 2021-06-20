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

const SkEvent = {
    START_GAME: 'start_game',
    DIRECTION: 'direction',
    PAUSING: 'pausing',
    NEW_GAME: 'new_game',
    QUERY_GAME: 'query_game',
    ALL_GAME: 'all_game',
    JOIN_QUEUE: 'join_queue',
    MATCH_USER: 'match_user',
    LEAVE_QUEUE: 'leave_queue',
    UPDATE_ROOM: 'update_room',
    GAME_UPDATE: 'game_update',
    CREATE_NEW_GAME: 'create_new_game',
    RESET: 'reset',
}

const query = function () {
    console.log('get')
    client.emit(SkEvent.QUERY_GAME)
}
const getAll = function () {
    client.emit(SkEvent.ALL_GAME)
}
const onJoinQueue = function () {
    client.emit(SkEvent.JOIN_QUEUE, id)
}
const onResetGame = function () {
    client.emit(SkEvent.RESET, roomId)
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
    console.log("connect success ->", id);
});

client.on(SkEvent.UPDATE_ROOM, (res) => {
    console.log(res)
    console.log('games is update ->', res.room.games)
    const { games } = res.room

    Object.keys(games).forEach((key, i) => {
        drawerMap(key, games[key])
    })
})

client.on(SkEvent.RESET, (room) => {
    const { games } = room
    console.log('reset_room')

    Object.keys(games).forEach((key, i) => {
        drawerMap(key, games[key])
    })
})

client.on(SkEvent.ALL_GAME, (games) => {
    console.log('all game ->', games)
})

client.on(SkEvent.MATCH_USER, (res) => {
    console.log('match user ->', res)
    const { games } = res.room
    roomId = res.room.id
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
    client.emit(SkEvent.START_GAME, roomId)
}

const onStopGame = function() {
    client.emit(SkEvent.PAUSING, roomId)
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
        client.emit(SkEvent.DIRECTION, d, roomId, id)
    }
})