const Code = require("../const/code")
const GamePlay = require("../models/game")
const Room = require("../models/room")
const Interval = require("../utils/interval")

class GameController{
    rooms = {}
    users = {}
    queue = []
    userIntervals = {}
    runtime = null

    constructor(id) {
        this.id = new Date().getTime() + id
    }

    createRoom(userId) {
        if (!userId) {
            throw new Exception('no userId to create room')
        }
        Object.assign(this.rooms, { [userId]: new Room(userId) })
        console.log('rooms ->', this.rooms)
    }

    addUser(user) {
        const id = user.id + ''
        user.id = id

        Object.assign(this.users, { [id]: user })
        Object.assign(this.userIntervals, {[id]: new Interval(1000)})
        console.log('user ->', this.users)
    }

    addRoom(r) {
        Object.assign(this.rooms, {[r.id]: r})
    }

    removeUser(id) {
        if (!id) {
            throw new Exception('No userId to remove')
        }
        delete this.users[id]
        delete this.userIntervals[id]
        console.log('remove user ->', this.users)
    }

    joinQueue(id) {
        const user = this.users[id]
        this.queue.push(user)
    }

    leaveQueue(ids) {
        if (!ids) {
            throw new Exception('No Ids in queue')
        }
        ids && ids.length > 0 && ids.forEach(id => {
            this.queue.forEach((user, i) => {
                if (user.id === id) {
                    this.queue.splice(i, 1)
                }
            })
        })
    }

    directGameInRoom(d, roomId, playerId, next) {
        const game = this.getGameInRoom(roomId, { ownerId: playerId })
        game.directionSnake(d)
    }

    startGamesInRoom(roomId, next) {
        const games = this.getGameInRoom(roomId, { isArr: true })
        games.forEach(game => game.restart())

        this.runGameLoop(roomId, next)
    };

    pauseGamesInRoom(roomId, next) {
        const games = this.getGameInRoom(roomId, {isArr: true})
        games.forEach(game => {
            const pause = game.pause
            game.pause = !pause
        })
    };

    runGameLoop(roomId, next, pause) {
        const room = this.getRoom(roomId)
        room.interval.execRuntime(() => room.runSnakeGame(() => next(room)), 0)
    };

    cancelGame(roomId, next) {
        const room = this.getRoom(roomId)
        room.interval.clearRuntime()
        room.runSnakeGame(() => next(room))
    }

    resetGamesInRoom(roomId, next) {
        const room = this.getRoom(roomId)

        room.clearGame()
        room.playerIds.forEach((playerId) => {
            const game = new GamePlay(playerId)
            room.addGame(playerId, game)
        })
        this.cancelGame(roomId, next)
    }

    findRandomUser(id) {
        const length = this.queue.length
        let code = Code.NOT_FOUND
        let user = {
            id: null
        }
        let r = 0
        const finder = this.users[id]

        if (length <= 1) {
            return {
                code: Code.ERROR,
                user,
                finder,
            }
        } else {
            if (!id) {
                code = Code.ERROR
            } else {
                do {
                    r++
                    user = this.queue[r]
                } while (user && id === user.id && !!user.id && r < length)
                
                if (user && !!user.id) {
                    code = Code.SUCCESS
                };
            }
        }

        return {
            code,
            user,
            finder,
        }    
    }

    deleteRoom(roomId) {
        delete this.rooms[roomId]
    }

    getRoom(roomId) {
        if (!roomId ) {
            throw new Exception('no roomId')
        }

        if (!this.rooms[roomId]) {
            throw new Exception('no room`s find')
        }
        return this.rooms[roomId]
    }

    getGameInRoom(roomId, { gameId, ownerId, isArr }) {
        if (!roomId) {
            throw new Exception('No roomId')
        }

        const room = this.rooms[roomId]

        if (!room) {
            console.log('rooms ->' ,this.rooms)
            throw new Exception('No room in room`s list')
        }

        const games = room.games

        if (gameId) {
            return this.game[gameId]
        } 
        
        if (ownerId) {
            const game = Object.values(games).filter(game => game.ownerId === ownerId)[0]

            return game
        }

        if (!gameId && !ownerId && isArr) {
            return Object.values(games).map(game => game)
        }
        
        if (!gameId && !ownerId ) {
            return room.games
        }
    }

    findUser(userId) {
        if (!userId || !this.users[userId]) {
            throw new Exception('no userId to find in user`s list')
        } else {
            return this.users[userId]
        }
    }
}

module.exports = GameController