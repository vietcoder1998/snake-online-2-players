import { SkEventSnake, SkEventGalaxy } from './../enums/socket'
import { Server, Socket } from 'socket.io'
import GalaxyController from '../controllers/galaxy-controller'
import SnakeController from '../controllers/snake-controller'
import { SkRes } from '../enums/index'
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
            this.startGalaxyGame()
            this.directionGalaxyGame()
            this.stopGalaxyGame()
            this.resetGalaxyGame()
        } catch (err) {
            throw this.socket.emit('error', err)
        }
    }

    joinSnakeQueue() {
        this.event$({
            ev: SkEventSnake.JOIN_SNAKE_QUEUE,
            em: SkEventSnake.MATCH_USER_SNAKE,
            next: this.snakeController.handleQueue.bind(this.snakeController),
        })
    }

    leaveSnakeInterval(ids: string[]) {
        this.snakeController.leaveInterval(ids)
    }

    getSnakeRoomInfo() {
        this.socket.on(SkEventSnake.QUERY_ROOM_SNAKE, (roomId) => {
            const room = this.snakeController.getRoom(roomId)
            this.socket.emit(SkEventSnake.QUERY_ROOM_SNAKE, room)
        })
    }

    startSnakeGame() {
        this.event$({
            ev: SkEventSnake.START_GAME_SNAKE,
            em: SkEventSnake.UPDATE_ROOM_SNAKE,
            next: this.snakeController.startGamesInRoom.bind(
                this.snakeController
            ),
        })
    }

    resetSnakeGame() {
        this.event$({
            ev: SkEventSnake.RESET_GAME_SNAKE,
            em: SkEventSnake.UPDATE_ROOM_SNAKE,
            next: this.snakeController.resetGamesInRoom.bind(
                this.snakeController
            ),
        })
    }

    stopSnakeGame() {
        this.event$({
            ev: SkEventSnake.PAUSING_SNAKE,
            next: this.snakeController.pauseGamesInRoom.bind(
                this.snakeController
            ),
        })
    }

    directionSnakeGame() {
        this.event$({
            ev: SkEventSnake.DIRECTION_SNAKE,
            next: this.snakeController.directGameInRoom.bind(
                this.snakeController
            ),
        })
    }

    leaveGalaxyInterval(ids: string[]) {
        this.galaxyController.leaveInterval(ids)
    }

    startGalaxyGame() {
        this.event$({
            ev: SkEventGalaxy.START_GAME_GALAXY,
            em: SkEventGalaxy.UPDATE_ROOM_GALAXY,
            next: this.galaxyController.startGamesInRoom.bind(
                this.galaxyController
            ),
        })
    }

    resetGalaxyGame() {
        this.event$({
            ev: SkEventGalaxy.RESET_GAME_GALAXY,
            em: SkEventGalaxy.UPDATE_ROOM_GALAXY,
            next: this.galaxyController.resetGamesInRoom.bind(
                this.galaxyController
            ),
        })
    }

    stopGalaxyGame() {
        this.event$({
            ev: SkEventGalaxy.UPDATE_ROOM_GALAXY,
            next: this.galaxyController.pauseGamesInRoom.bind(
                this.galaxyController
            ),
        })
    }

    directionGalaxyGame() {
        this.event$({
            ev: SkEventGalaxy.DIRECTION_GALAXY,
            em: SkEventGalaxy.UPDATE_ROOM_GALAXY,
            next: this.galaxyController.directGameInRoom.bind(
                this.galaxyController
            ),
        })
    }

    event$({
        ev,
        em,
        next,
    }: {
        ev: SkEventSnake | SkEventGalaxy
        em?: SkEventSnake | SkEventGalaxy
        next: Next
    }) {
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
