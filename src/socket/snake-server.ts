import { SkCode } from './../enums/index'
import { Server, Socket } from 'socket.io'
import GameController from '../controllers/snake-controller'
import { Next } from '../interfaces/typing'
import Room from '../models/common/room'
import { SkEvent } from './../enums/socket'

class SnakeServer {
    socket: Socket
    gameController: GameController = new GameController()
    io: Server

    constructor(io: Server) {
        this.io = io
    }

    setSocket(s: Socket) {
        this.socket = s
    }

    listen() {
        try {
            this.startGame()
            this.directionGame()
            this.stopGame()
            this.joinQueue()
            this.getRoomInfo()
            this.resetGame()
        } catch (err) {
            throw this.socket.emit('error', err)
        }
    }

    joinQueue() {
        this.event$({
            ev: SkEvent.JOIN_QUEUE,
            em: SkEvent.MATCH_USER,
            next: this.gameController.handleQueue.bind(this.gameController),
        })
    }

    leaveInterval(ids: string[]) {
        this.gameController.leaveInterval(ids)
    }

    getRoomInfo() {
        this.socket.on(SkEvent.QUERY_ROOM, (roomId) => {
            const room = this.gameController.getRoom(roomId)
            this.socket.emit(SkEvent.QUERY_ROOM, room)
        })
    }

    startGame() {
        this.socket.on(SkEvent.START_GAME, (roomId) => {
            this.gameController.startGamesInRoom(roomId, (room: Room) =>
                this.emit$({
                    e: SkEvent.UPDATE_ROOM,
                    to: room.playerIds,
                    data: { code: SkCode.SUCCESS, room },
                })
            )
        })
    }

    resetGame() {
        this.socket.on(SkEvent.RESET, (roomId) => {
            this.gameController.resetGamesInRoom(roomId, (room: Room) => {
                this.emit$({
                    e: SkEvent.UPDATE_ROOM,
                    data: room,
                    to: room.playerIds,
                })
            })
        })
    }

    stopGame() {
        this.socket.on(SkEvent.PAUSING, (roomId) => {
            this.gameController.pauseGamesInRoom(roomId)
        })
    }

    directionGame() {
        this.event$({
            ev: SkEvent.DIRECTION,
            em: SkEvent.UPDATE_ROOM,
            next: this.gameController.directGameInRoom.bind(
                this.gameController
            ),
        })
    }

    event$({ ev, em, next }: { ev: SkEvent; em: SkEvent; next: Next }) {
        this.socket.on(ev, (...args) =>
            next(...args, (data: any, to: string | string[]) =>
                this.io.to(to).emit(em, data)
            )
        )
    }

    emit$({ e, data, to }: { e: string; data: any; to: string | string[] }) {
        this.io.to(to).emit(e, data)
    }
}

export default SnakeServer
