import * as express from 'express'
import * as http from 'http'
import * as sk from 'socket.io'
import User from '../base/models/user'
import { getIp } from '../base/utils/ip'
import GoBtSkServer from './socket/index'

class GoBtServer {
    private app: any
    private io: any
    private server: any
    private ips: string
    private goBtServer: GoBtSkServer

    constructor() {
        this.ips = getIp()[1]
        this.app = express()
        this.server = http.createServer(this.app)
        this.goBtServer = new GoBtSkServer(this.io)
        this.io = require('socket.io')(this.server, {
            origin: ['*'],
        })
        this.server.listen(3007, (e: Error) => {
            console.log(`http://${this.ips}:${3007}`)

            if (e) {
                console.log(e)
                throw e
            }
        })
    }

    listen() {
        this.io.on('connection', (socket: sk.Socket) => {
            const { id, avatar, username, token, gameType } =
                socket.handshake.auth

            try {
                socket.join(id)
                const user = new User(id, avatar, username)

                this.goBtServer.setSocket(socket)
                this.goBtServer.controller.addUser(user)
                this.goBtServer.listen()
            } catch (err) {
                socket._error(err)
            }

            socket.on('error', (err) => {
                console.log(err)
            })

            socket.on('disconnect', (reason) => {
                this.goBtServer.controller.removeUser(id)
                this.goBtServer.controller.removeRuntime(id)
                socket.leave(id)
            })
        })
    }
}

const snSv = new GoBtServer()
snSv.listen()
