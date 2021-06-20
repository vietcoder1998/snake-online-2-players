import { NextEmit } from './../interfaces/typing'
import { Direction, SkCode } from './../enums/index'
import { SkRes } from '../enums'
import GameController from '../models/base/game-controller'
import GamePlay from '../models/base/game-play'
import Room from '../models/base/room'
import GalaxyGame from '../models/galaxy-battle/galaxy-game'
import SnakeGame from '../models/snake/snake-game'
import SnakeRoom from '../models/snake/snake-room'
import GalaxyRoom from '../models/galaxy-battle/galaxy-room'

export default class GalaxyController extends GameController {
    games: Record<string, GalaxyGame> = {}
    rooms: Record<string, GalaxyRoom> = {}

    getRoom(roomId: string): GalaxyRoom {
        return this.rooms[roomId]
    }

    createRoom(userId: string) {
        const room = new SnakeRoom(userId)
    }

    addRoom(r: GalaxyRoom): void {
        Object.assign(this.rooms, { [r.id]: r })
    }

    deleteRoom(roomId: string): void {
        delete this.rooms[roomId]
    }

    handleQueue(id: string, next: NextEmit<Room>) {
        const user = this.users[id]
        this.queue.push(user)
        const userIntervals = this.userIntervals[id]

        userIntervals.execRuntime(() => {
            const result = this.findRandomUser(id)
            if (result.code === SkCode.SUCCESS && id) {
                // tslint:disable-next-line:no-console
                console.log('id ->', id, 'finderId ->', result.user.id)

                const room = new GalaxyRoom(id)
                room.addUser(result.user.id, result.user)
                room.addUser(result.finder.id, result.finder)

                const playerIds = room.getPlayerIds()

                this.addRoom(room)
                this.leaveInterval(playerIds)
                this.leaveQueue(playerIds)
                next(new SkRes(SkCode.SUCCESS, room), playerIds)
            }
        })
    }

    directGameInRoom(d: Direction, roomId: string, playerId: string) {
        const game = this.getGameInRoom(roomId, { ownerId: playerId }).getData()
        if (game && game instanceof GalaxyGame) {
            game.direction(d)
        }
    }

    startGamesInRoom(roomId: string, next: NextEmit<Room>) {
        const games = this.getGameInRoom(roomId, { isArr: true }).getData()
        if (games && Array.isArray(games)) {
            games.forEach((game: GamePlay) => game.restart())
        }

        this.runGameLoop(roomId, next)
    }

    pauseGamesInRoom(roomId: string, next: NextEmit<Room>) {
        const games = this.getGameInRoom(roomId, { isArr: true }).getData()
        if (games && games && Array.isArray(games)) {
            games?.forEach((game: GamePlay) => {
                const pause = game.pause
                game.pause = !pause
            })
        }
        this.cancelGame(roomId, next)
    }

    runGameLoop(roomId: string, next: NextEmit<Room>) {
        const room = this.getRoom(roomId)
        room.interval.execRuntime(() => {
            room.updateGameInRoom(() =>
                next(
                    new SkRes(SkCode.SUCCESS, room, 'room loop'),
                    room.playerIds
                )
            )
        })
    }

    cancelGame(roomId: string, next: NextEmit<GalaxyRoom>) {
        const room = this.getRoom(roomId)
        room.interval.clearRuntime()
        const games = this.getGameInRoom(roomId, { isArr: true }).getData()
        games.forEach((game: GalaxyGame) =>
            next(new SkRes(SkCode.SUCCESS, room, 'Cancel game'), room.playerIds)
        )
    }

    resetGamesInRoom(roomId: string, next: NextEmit<GalaxyRoom>) {
        const room = this.getRoom(roomId)

        room.clearGame()
        room.playerIds.forEach((playerId: string) => {
            const game = new GalaxyGame(playerId)
            room.addGame(playerId, game)
        })
        this.cancelGame(roomId, next)
    }

    getGameInRoom(
        roomId: string,
        {
            gameId,
            ownerId,
            isArr,
        }: { gameId?: string; ownerId?: string; isArr?: boolean }
    ) {
        const res = new SkRes()
        if (!roomId) {
            res.setCode(SkCode.NOT_FOUND)
        }
        const room = this.rooms[roomId]
        if (!room) {
            res.setCode(SkCode.NOT_FOUND)
        }
        const games = room.games
        if (gameId) {
            res.setCode(200)
            res.setData(this.rooms[roomId].getGame(gameId))
        }
        if (ownerId) {
            const game = Object.values(games).filter(
                (game) => game.ownerId === ownerId
            )[0]
            res.setCode(200)
            res.setData(game)
        }

        if (!gameId && !ownerId && isArr) {
            res.setCode(200)
            res.setData(Object.values(games))
        }

        if (!gameId && !ownerId) {
            res.setCode(200)
            res.setData(room.games)
        }

        return res
    }
}
