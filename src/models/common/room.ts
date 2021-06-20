import { Next } from '../../interfaces/typing'
import Interval from '../../utils/interval'
import GamePlay from '../snake/game'
import User from './user'

class Room {
    id: string = null
    ownerId: string = null
    players: Record<string, User> = {}
    playerIds: string[] = []
    games: Record<string, GamePlay> = {}
    interval = new Interval(500)

    constructor(o: string) {
        this.ownerId = o
        this.id = o
    }

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

    addGame(ownerId: string, g: GamePlay) {
        Object.assign(this.games, { [ownerId]: g })
    }

    getPlayerIds() {
        return this.playerIds
    }

    runSnakeGame(next: Next) {
        const games = this.getGames(true)
        if (games && Array.isArray(games)) {
            games.forEach((game: GamePlay) => game.updateGame())
        }

        next()
    }

    removeGame(gId: string) {
        delete this.games[gId]
    }

    getGame(gId: string) {
        return this.games[gId]
    }

    createGame(ownerId: string) {
        const game = new GamePlay(ownerId)
        this.addGame(ownerId, game)
    }

    addUser(id: string, u: User) {
        Object.assign(this.players, { [id]: u })
        this.playerIds.push(u.id)
        this.createGame(id)
    }

    getGames(isArr: boolean) {
        if (isArr) {
            return Object.values(this.games)
        }
        return this.games
    }

    getPlayers(iA: boolean) {
        if (iA) {
            return Object.values(this.players)
        } else {
            return this.players
        }
    }

    clearGame() {
        this.games = {}
    }
}

export default Room
