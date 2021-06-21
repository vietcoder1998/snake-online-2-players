import { SkEvent } from './../enums/index'
import { Server, Socket } from 'socket.io'
import { SkRes } from '../models/response'
import { Next } from '../models/typing'

export default abstract class SocketServer {
    public socket: Socket
    public io: Server

    constructor(io: Server) {
        this.io = io
    }

    abstract listen(): void
    abstract joinQueue(): void
    abstract leaveQueue(): void
    abstract getRoom(): any
    abstract startGame(): any
    abstract resetGame(): any
    abstract stopGame(): any
    abstract directionGame(): any
    abstract leaveInterval(ids: string[]): any

    setSocket(s: Socket) {
        this.socket = s
    }

    event$({ ev, em, next }: { ev: SkEvent; em?: SkEvent; next: Next }) {
        this.socket.on(ev, (...args) =>
            next(...args, (data: SkRes, to: string | string[]) => {
                if (em) {
                    this.io.to(to).emit(em, data)
                }
            })
        )
    }
}
