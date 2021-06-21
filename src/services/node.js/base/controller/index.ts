import { Next, NextEmit } from '../models/typing'
import { Direction, SkCode, SkRes } from '../models/response'
import Interval from '../utils/interval'
import Room from '../models/room'
import User from '../models/user'

export default abstract class GameController {
    users: Record<string, User> = {}
    queue: User[] = []
    userIntervals: Record<string, Interval> = {}
    runtime: any

    abstract createRoom(userId: string, next: Next): void
    abstract getGameInRoom(
        roomId: string,
        {
            gameId,
            ownerId,
            isArr,
        }: { gameId?: string; ownerId?: string; isArr?: boolean }
    ): SkRes
    abstract startGamesInRoom(roomId: string, next: NextEmit): any
    abstract pauseGamesInRoom(roomId: string, next: NextEmit): any
    abstract runGameLoop(roomId: string, next: NextEmit, game: any): any
    abstract cancelGame(roomId: string, next: NextEmit): any
    abstract resetGamesInRoom(roomId: string, next: NextEmit): any
    abstract directGameInRoom(
        d: Direction,
        roomId: string,
        playerId: string
    ): any
    abstract addRoom(r: any): void
    abstract deleteRoom(roomId: string): void
    abstract getRoom(roomId: string): any

    addUser(user: User) {
        const id = user.id
        user.id = id

        Object.assign(this.users, { [id]: user })
        Object.assign(this.userIntervals, { [id]: new Interval(1000) })
    }

    removeUser(id: string) {
        if (!id) {
            throw new Error('No userId to remove')
        }
        if (id && this.users[id]) {
            delete this.users[id]
            delete this.userIntervals[id]
        }
    }

    removeRuntime(userId: string) {
        delete this.userIntervals[userId]
    }

    leaveQueue(ids: string[]) {
        if (!ids || ids.length === 0) {
            throw new Error('No Ids in queue')
        } else {
            ids.forEach((id) => {
                this.queue.forEach((user, i) => {
                    if (user.id === id) {
                        this.queue.splice(i, 1)
                    }
                })
            })
        }
    }

    findRandomUser(id: string) {
        const length = this.queue.length
        let code = SkCode.NOT_FOUND
        let user: User = {
            id: null,
            username: null,
            avatar: null,
            gameType: null,
        }
        let r = 0
        const finder = this.users[id]

        if (length <= 1) {
            return {
                code: SkCode.NOT_FOUND,
                user,
                finder,
            }
        } else {
            if (!id) {
                code = SkCode.NOT_FOUND
            } else {
                do {
                    r++
                    user = this.queue[r]
                } while (user && id === user.id && user.id && r < length)

                if (user && user.id) {
                    code = SkCode.SUCCESS
                }
            }
        }

        return {
            code,
            user,
            finder,
        }
    }

    findUser(userId: string) {
        if (!userId || !this.users[userId]) {
            throw new Error('no userId to find in user`s list')
        } else {
            return this.users[userId]
        }
    }

    leaveInterval(ids: string[]) {
        if (!ids || ids.length === 0) {
            throw new Error('no id in ids to leaving')
        } else {
            ids.forEach((id: string) => {
                const userInterval = this.userIntervals[id]
                userInterval.clearRuntime()
            })
        }
    }
}
