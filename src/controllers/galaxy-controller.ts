import { SkRes } from '../enums'
import GameController from './base'
import GamePlay from '../models/base/game-play'
import Room from '../models/base/room'
import User from '../models/base/user'
import GalaxyGame from '../models/galaxy-battle/galaxy-game'
import GalaxyRoom from '../models/galaxy-battle/galaxy-room'
import { Direction, SkCode } from './../enums/index'
import { NextEmit } from './../interfaces/typing'

export default class GalaxyController extends GameController {
    games: Record<string, GalaxyGame> = {}
    rooms: Record<string, GalaxyRoom> = {}

    getRoom(roomId: string): GalaxyRoom {
        return this.rooms[roomId]
    }

    getUser(id: string): User {
        return this.users[id]
    }

    createRoom(userId: string) {
        const r = new GalaxyRoom(userId)
        Object.assign(this.rooms, { [r.id]: r })
        this.addRoom(r)
    }

    addRoom(r: GalaxyRoom): void {
        Object.assign(this.rooms, { [r.id]: r })
    }

    deleteRoom(roomId: string): void {
        delete this.rooms[roomId]
    }

    directGameInRoom(d: Direction, roomId: string, playerId: string) {
        const game = this.getGameInRoom(roomId, { ownerId: playerId }).getData()
        if (game && game instanceof GalaxyGame) {
            game.direction(d)
        }
    }

    startGamesInRoom(ownerId: string, next: NextEmit<GalaxyRoom>) {
        const r = new GalaxyRoom(ownerId)

        r.addUser(ownerId, this.getUser(ownerId))
        this.addRoom(r)

        const games = this.getGameInRoom(ownerId, { isArr: true }).getData()
        if (games && Array.isArray(games)) {
            games.forEach((game: GamePlay) => game.update())
        }

        this.runGameLoop(ownerId, next)
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
        }, 1000 / 60)
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
        } else {
            const games = room.games
            if (gameId) {
                res.setCode(200)
                res.setData(this.rooms[roomId].getGame(gameId))
            }
            if (ownerId) {
                const game = Object.values(games).filter(
                    (game: GalaxyGame) => game.ownerId === ownerId
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
        }

        return res
    }
}
