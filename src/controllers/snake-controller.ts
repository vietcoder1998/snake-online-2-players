import { Direction, GameType } from "../enums"
import { Next } from "../interfaces/typing"
import Room from "../models/common/room"
import User from "../models/common/user"
import GamePlay from "../models/snake/game"
import Interval from "../utils/interval"

const Code = require("../const/code")

class GameController{
    rooms: Record<string, Room>
    users: Record<string, User>
    queue: User[]
    userIntervals: Record<string, Interval> = {}
    runtime: any

    createRoom(userId: string) {
        if (!userId) {
            throw new Error('no userId to create room')
        }
        Object.assign(this.rooms, { [userId]: new Room(userId) })
        console.log('rooms ->', this.rooms)
    }

    addUser(user: User) {
        const id = user.id + ''
        user.id = id

        Object.assign(this.users, { [id]: user })
        Object.assign(this.userIntervals, {[id]: new Interval(1000)})
        console.log('user ->', this.users)
    }

    addRoom(r: Room) {
        Object.assign(this.rooms, {[r.id]: r})
    }

    removeUser(id: string) {
        if (!id) {
            throw new Error('No userId to remove')
        }
        delete this.users[id]
        delete this.userIntervals[id]
        console.log('remove user ->', this.users)
    }

    removeRuntime(userId: string) {
        delete this.userIntervals[userId]
    }

    joinQueue(id: string) {
        const user = this.users[id]
        this.queue.push(user)
    }

    leaveQueue(ids: string[]) {
        if (!ids || ids.length === 0) {
            throw new Error('No Ids in queue')
        } else {
            ids.forEach(id => {
                this.queue.forEach((user, i) => {
                    if (user.id === id) {
                        this.queue.splice(i, 1)
                    }
                })
            })
        }
    }

    directGameInRoom(d: Direction, roomId: string, playerId: string) {
        const game = this.getGameInRoom(roomId, { ownerId: playerId })
        if (game && game instanceof GamePlay){
            game.directionSnake(d)
        }
    }

    startGamesInRoom(roomId: string, next: (...args: any[]) => void) {
        const games = this.getGameInRoom(roomId, { isArr: true })
        if (games && Array.isArray(games)) {
            games.forEach((game: GamePlay) => game.restart())
        }

        this.runGameLoop(roomId, next)
    };

    pauseGamesInRoom(roomId: string, next: (room: Room, playerIds: string[]) => void) {
        const games = this.getGameInRoom(roomId, {isArr: true})
        if (games && games && Array.isArray(games)) {
            games?.forEach((game: GamePlay) => {
                const pause = game.pause
                game.pause = !pause
            })
        }
    };

    runGameLoop(roomId: string, next: (...args: any[]) => void) {
        const room = this.getRoom(roomId)
        room.interval.execRuntime(() => room.runSnakeGame(() => next(room, room.playerIds)))
    };

    cancelGame(roomId: string, next : (room: Room) => void) {
        const room = this.getRoom(roomId)
        room.interval.clearRuntime()
        room.runSnakeGame(() => next(room))
    }

    resetGamesInRoom(roomId: string, next: Next<void>) {
        const room = this.getRoom(roomId)

        room.clearGame()
        room.playerIds.forEach((playerId) => {
            const game = new GamePlay(playerId)
            room.addGame(playerId, game)
        })
        this.cancelGame(roomId, next)
    }

    findRandomUser(id: string) {
        const length = this.queue.length
        let code = Code.NOT_FOUND
        let user: User = {
            id: null,
            username: null,
            avatar: null,
            gameType: GameType.SNAKE
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

    deleteRoom(roomId: string) {
        delete this.rooms[roomId]
    }

    getRoom(roomId: string) {
        if (!roomId ) {
            throw new Error('no roomId')
        }

        if (!this.rooms[roomId]) {
            throw new Error('no room`s find')
        }
        return this.rooms[roomId]
    }

    getGameInRoom(roomId: string, { gameId, ownerId, isArr }: {gameId?: string, ownerId?: string, isArr?: boolean }) {
        if (!roomId) {
            throw new Error('No roomId')
        }

        const room = this.rooms[roomId]

        if (!room) {
            throw new Error('No room in room`s list')
        }

        const games = room.games

        if (gameId) {
            return this.rooms[roomId].getGame(gameId)
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

    findUser(userId: string) {
        if (!userId || !this.users[userId]) {
            throw new Error('no userId to find in user`s list')
        } else {
            return this.users[userId]
        }
    }
}

export default GameController