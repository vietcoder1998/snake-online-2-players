import { GameType } from './response'

export default class User {
    id: string
    username: string
    avatar: string
    gameType: GameType
    token?: string

    constructor(
        id: string,
        username: string,
        avatar: string,
        gameType?: GameType,
        token?: string
    ) {
        this.id = id
        this.username = username
        this.avatar = avatar
        this.gameType = gameType
        this.token = token
    }
}
