'use strict'

import { Server, Socket } from "socket.io"
import Code from "../const/code"
import skEvent from "../const/socket"
import GameController from "../controllers/snake-controller"
import Room from "../models/common/room"

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
        this.socket.on(skEvent.JOIN_QUEUE, id => {
            this.gameController.joinQueue(id)

            const userIntervals = this.gameController.userIntervals[id]

            userIntervals.execRuntime(() => {
                const result = this.gameController.findRandomUser(id)
                if (result.code === Code.SUCCESS && id) {
                    console.log('id ->', id, 'finderId ->', result.user.id)
                    console.log('complete find ->', result.finder)

                    const room = new Room(id)

                    room.addUser(result.user.id, result.user)
                    room.addUser(result.finder.id, result.finder)

                    const playerIds = room.getPlayerIds()

                    this.gameController.addRoom(room)
                    this.leaveInterval(playerIds)
                    this.gameController.leaveQueue(playerIds)

                    this.io.to(playerIds).emit(skEvent.MATCH_USER, { code: Code.SUCCESS, room })
                }
            })
        })
    }

    leaveInterval(ids: string[]) {
        if (!ids || ids.length === 0) {
            throw new Error('no id in ids to leaving')
        } else {
            ids.forEach((id) => {
                const userInterval = this.gameController.userIntervals[id]
                userInterval.clearRuntime()
            })
        }
    }

    getRoomInfo() {
        this.socket.on(skEvent.QUERY_ROOM, (roomId) => {
            const room = this.gameController.getRoom(roomId)
            this.socket.emit(skEvent.QUERY_ROOM, room)
        })
    }

    startGame() {
        this.socket.on(skEvent.START_GAME, (roomId) => {
            this.gameController.startGamesInRoom(roomId, (room) => this.emit$(room))
        })
    }

    resetGame() {
        this.socket.on(skEvent.RESET, roomId => {
            this.gameController.resetGamesInRoom(roomId, (room) => this.emit$(room))
        })
    }

    stopGame() {
        this.socket.on(skEvent.PAUSING, (roomId) => {
            this.gameController.pauseGamesInRoom(roomId, (room) => this.emit$(room))
        })
    }

    directionGame() {
        this.socket.on(skEvent.DIRECTION, (d, roomId, playerId) => {
            this.gameController.directGameInRoom(
                d, roomId, playerId,
            )
        })
    }

    emit$(room: Room, event?: string) {
        this.io.to(room.getPlayerIds()).emit(skEvent.UPDATE_ROOM, room)
    }
}

export default SnakeServer