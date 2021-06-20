import { Server, Socket } from 'socket.io'
import GalaxyController from '../controllers/galaxy-controller'
import SnakeController from '../controllers/snake-controller'
import { SkRes } from '../enums/index'
import { SkEvent } from '../enums/socket'
import { Next } from '../interfaces/typing'

class SocketServer {
    socket: Socket
    snakeController: SnakeController = new SnakeController()
    galaxyController: GalaxyController = new GalaxyController()
    io: Server

    constructor(io: Server) {
        this.io = io
    }

    setSocket(s: Socket) {
        this.socket = s
    }

    listen() {
        try {
            this.startSnakeGame()
            this.directionSnakeGame()
            this.stopSnakeGame()
            this.joinSnakeQueue()
            this.getSnakeRoomInfo()
            this.resetSnakeGame()
        } catch (err) {
            throw this.socket.emit('error', err)
        }
    }

    joinSnakeQueue() {
        this.event$({
            ev: SkEvent.JOIN_SNAKE_QUEUE,
            em: SkEvent.MATCH_USER,
            next: this.snakeController.handleQueue.bind(this.snakeController),
        })
    }

    leaveSnakeInterval(ids: string[]) {
        this.snakeController.leaveInterval(ids)
    }

    getSnakeRoomInfo() {
        this.socket.on(SkEvent.QUERY_ROOM, (roomId) => {
            const room = this.snakeController.getRoom(roomId)
            this.socket.emit(SkEvent.QUERY_ROOM, room)
        })
    }

    startSnakeGame() {
        this.event$({
            ev: SkEvent.START_GAME,
            em: SkEvent.UPDATE_ROOM,
            next: this.snakeController.startGamesInRoom.bind(
                this.snakeController
            ),
        })
    }

    resetSnakeGame() {
        this.event$({
            ev: SkEvent.RESET_GAME,
            em: SkEvent.UPDATE_ROOM,
            next: this.snakeController.resetGamesInRoom.bind(
                this.snakeController
            ),
        })
    }

    stopSnakeGame() {
        this.event$({
            ev: SkEvent.PAUSING,
            next: this.snakeController.pauseGamesInRoom.bind(
                this.snakeController
            ),
        })
    }

    directionSnakeGame() {
        this.event$({
            ev: SkEvent.DIRECTION,
            em: SkEvent.UPDATE_ROOM,
            next: this.snakeController.directGameInRoom.bind(
                this.snakeController
            ),
        })
    }

    event$({ ev, em, next }: { ev: SkEvent; em?: SkEvent; next: Next }) {
        this.socket.on(ev, (...args) =>
            next(...args, <T>(data: SkRes<T>, to: string | string[]) => {
                if (em) {
                    this.io.to(to).emit(em, data)
                }
            })
        )
    }
}

export default SocketServer
