const id = new Date().getTime().toString()
const gameIds = []
let roomId

const client = io.connect(`http://192.168.1.55:3007`, {
    auth: {
        id,
        username: `user${Math.floor(Math.random() * 10)}`,
        avatar: '_',
        token: '_',
        gameType: 'galaxy',
    },
})

const SkEventGalaxy = {
    START_GAME_GALAXY: 'start_game_galaxy',
    DIRECTION_GALAXY: 'direction_galaxy',
    PAUSING_GALAXY: 'pausing_galaxy',
    NEW_GAME_GALAXY: 'new_game_galaxy',
    ALL_GAME_GALAXY: 'all_game_galaxy',
    JOIN_GALAXY_QUEUE: 'join_galaxy_queue_galaxy',
    MATCH_USER_GALAXY: 'match_user_galaxy',
    LEAVE_QUEUE_GALAXY: 'leave_queue_galaxy',
    UPDATE_ROOM_GALAXY: 'update_room_galaxy',
    QUERY_ROOM_GALAXY: 'query_room_galaxy',
    END_GAME_GALAXY: 'end_game_galaxy',
    CREATE_NEW_GAME_GALAXY: 'create_new_game_galaxy',
    RESET_GAME_GALAXY: 'reset_galaxy_game_galaxy',
    SHOT_GALAXY: 'SHOT_GALAXY',
}

const c = document.getElementById('alien')
const heart = document.createElement('img')
heart.src =
    'https://upload.wikimedia.org/wikipedia/commons/f/f1/Heart_coraz%C3%B3n.svg'

const shipImg = document.createElement('img')
shipImg.src = './galaxy.png'

let l = 3
const ctx = c.getContext('2d')

function onLogin(e) {
    e.preventDefault()
    fetch('http://localhost:3007', {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.parse(e),
    }).then((res) => {
        console.log(res)
    })
}

function onStartGame() {
    client.emit(SkEventGalaxy.START_GAME_GALAXY, id)
}

function onStopGame() {
    client.emit(SkEventGalaxy.PAUSING_GALAXY, roomId)
}

function moveShip(d) {
    client.emit(SkEventGalaxy.DIRECTION_GALAXY, d, roomId, id)
}

client.on('connect', (socket) => {
    console.log('connect success ->', socket)
})

client.on(SkEventGalaxy.UPDATE_ROOM_GALAXY, (res) => {
    const { games } = res.data
    roomId = res.data.id

    gameRender(Object.values(games)[0])
})

client.on(SkEventGalaxy.RESET_GAME_GALAXY, (res) => {
    const { games } = res.data

    gameRender(ctx, Object.values(games)[0])
})

client.on(SkEventGalaxy.SHOT)
document.addEventListener('keypress', (e) => {
    const direction = {
        RIGHT: 'right',
        LEFT: 'left',
        UP: 'up',
        DOWN: 'down',
    }

    e.preventDefault()
    switch (e.code) {
        case 'KeyW':
            moveShip(direction.UP)

            break
        case 'KeyS':
            moveShip(direction.DOWN)

            break
        case 'KeyA':
            moveShip(direction.LEFT)
            break

        case 'KeyD':
            moveShip(direction.RIGHT)

            break
        case 'Space':
            moveShip('shot')
            break

        default:
            break
    }

    lk = e.code
})

client.on('error', (e) => {
    console.log(e)
})
