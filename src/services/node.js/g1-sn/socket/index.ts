import { SkEvent } from './../../base/enums/index'
import { Server, Socket } from 'socket.io'
import SocketServer from '../../base/socket'
import SnakeController from '../../g1-sn/controller'

export default class G1GlSkServer extends SocketServer {
    public socket: Socket
    public controller: SnakeController
    io: Server

    constructor(io: Server) {
        super(io)
        this.controller = new SnakeController()
    }

    setSocket(s: Socket) {
        this.socket = s
    }

    listen() {
        try {
            this.startGame()
            this.directionGame()
            this.stopGame()
            this.resetGame()
        } catch (err) {
            throw this.socket.emit('error', err)
        }
    }

    joinQueue(): void {}
    leaveQueue(): void {}

    getRoom() {
        this.socket.on(SkEvent.QUERY_ROOM, (roomId) => {
            const room = this.controller.getRoom(roomId)
            this.socket.emit(SkEvent.QUERY_ROOM, room)
        })
    }

    leaveInterval(ids: string[]) {
        this.controller.leaveInterval(ids)
    }

    startGame() {
        this.event$({
            ev: SkEvent.START_GAME,
            em: SkEvent.UPDATE_ROOM,
            next: this.controller.startGamesInRoom.bind(this.controller),
        })
    }

    resetGame() {
        this.event$({
            ev: SkEvent.RESET_GAME,
            em: SkEvent.UPDATE_ROOM,
            next: this.controller.resetGamesInRoom.bind(this.controller),
        })
    }

    stopGame() {
        this.event$({
            ev: SkEvent.UPDATE_ROOM,
            next: this.controller.pauseGamesInRoom.bind(this.controller),
        })
    }

    directionGame() {
        this.event$({
            ev: SkEvent.DIRECTION,
            em: SkEvent.UPDATE_ROOM,
            next: this.controller.directGameInRoom.bind(this.controller),
        })
    }
}
