import { Next } from '../../interfaces/typing'
import Room from '../base/room'
import User from '../base/user'
import GalaxyGame from './galaxy-game'

export default class GalaxyRoom extends Room {
    public games: Record<string, GalaxyGame> = {}

    updateGameInRoom(next: Next): void {
        const games = this.getGames(true)
        if (games && Array.isArray(games)) {
            games.forEach((game: GalaxyGame) => game.update())
        }
        next()
    }

    addGame<T = GalaxyGame>(ownerId: string, g: T) {
        Object.assign(this.games, { [ownerId]: g })
    }

    removeGame(gId: string) {
        delete this.games[gId]
    }

    getGame(gId: string) {
        return this.games[gId]
    }

    addUser(id: string, u: User) {
        Object.assign(this.players, { [id]: u })
        this.playerIds.push(u.id)
        this.createGame(id)
    }

    createGame(id: string) {
        Object.assign(this.games, { [id]: new GalaxyGame(id) })
    }

    getGames(isArr: boolean): Record<string, GalaxyGame> | GalaxyGame[] {
        if (isArr) {
            return Object.values(this.games)
        } else return this.games
    }

    clearGame() {
        this.games = {}
    }
}