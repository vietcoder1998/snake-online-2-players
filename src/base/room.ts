import { Next } from '../interfaces/typing'
import Interval from '../utils/interval'
import GalaxyGame from '../models/g0-bt/galaxy-game'
import SnakeGame from '../models/g1-sn/snake-game'
import User from './user'

export default abstract class Room {
    id: string = null
    ownerId: string = null
    players: Record<string, User> = {}
    playerIds: string[] = []
    interval = new Interval(500)

    constructor(o: string) {
        this.ownerId = o
        this.id = o
    }

    abstract updateGameInRoom(next: Next): void
    abstract addGame<T>(ownerId: string, g: T): void
    abstract removeGame(gId: string): void
    abstract getGame(gId: string): void
    abstract addUser(id: string, u: User): void
    abstract getGames(isArr: boolean): any
    abstract clearGame(): void

    removeUser(userId: string, next: (...args: any[]) => void) {
        if (userId === this.ownerId) {
            next(false)
        } else {
            delete this.players[userId]
            this.playerIds.forEach((playerId, i) => {
                if (userId === playerId) {
                    this.playerIds.splice(i, 1)
                }
            })
        }
    }

    getPlayerIds() {
        return this.playerIds
    }

    getPlayers(iA: boolean) {
        if (iA) {
            return Object.values(this.players)
        } else {
            return this.players
        }
    }
}
