import { Errback, NextFunction, Request, Response } from 'express'
import { Socket } from 'socket.io'
import { GameType } from './enums/index'
import User from './models/base/user'
import SnakeServer from './socket/socket-server'
import { getIp } from './utils/ip'

const express = require('express')
const http = require('http')
const mysql = require('mysql')
const fs = require('fs')

const app = express()

const con = mysql.createConnection({
    host: 'localhost',
    password: 'Anh123456./',
    port: 3306,
    user: 'root',
})

con.connect(function (err: Error) {
    if (err) {
        console.log(err)
        throw err
    }
})

con.query('USE snake', function (err: Error, result: any) {
    console.log(err, result)
    if (!result) {
        con.query('CREATE DATABASE snake', function (err: Error, result: any) {
            if (err) {
                console.log(err)
                throw err
            } else console.log(result)
        })
    }
})

app.get('/', (req: Request, res: Response, next: NextFunction) => {
    res.sendFile(__dirname + '/public/index.html')
})

app.get('/:name', (req: Request, res: Response, next: NextFunction) => {
    res.sendFile(__dirname + `/public/${req.params.name}`)
})

app.get('/v1/user', (req: Request, res: Response, next: NextFunction) => {
    fs.readFile(__dirname + '/json/user.json', (err: Error, data: any) => {
        res.send(JSON.parse(data.toString()))
    })
})

app.get('/v1/user/:id', (req: Request, res: Response, next: NextFunction) => {
    fs.readFile(__dirname + '/json/user.json', (err: Error, data: any) => {
        const users = JSON.parse(data.toString())
        res.send(users[req.params.id])
    })
})

app.use((err: Errback, req: Request, res: Response, next: NextFunction) => {
    if (err) {
        res.status(404).end('404 not found')
        throw err
    }
})

const server = http.createServer(app)
const io = require('socket.io')(server, {
    origin: ['*'],
})

const sc = new SnakeServer(io)

io.on('connection', (socket: Socket) => {
    const { id, avatar, username, token, gameType } = socket.handshake.auth

    try {
        socket.join(id)
        sc.setSocket(socket)
        if (gameType === GameType.GALAXY) {
            sc.snakeController.addUser(
                new User(id, avatar, username, GameType.SNAKE)
            )
        } else {
            sc.galaxyController.addUser(
                new User(id, avatar, username, GameType.GALAXY)
            )
        }

        sc.listen()
    } catch (err) {
        socket._error(err)
    }

    socket.on('error', (err) => {
        console.log(err)
    })

    socket.on('disconnect', (reason) => {
        sc.snakeController.removeUser(id)
        sc.snakeController.removeRuntime(id)
        socket.leave(id)
    })
})

server.listen(3007, (e: Error) => {
    const ips = getIp()
    console.log(`http://${ips[1]}:${3007}`)
    if (e) {
        console.log(e)
    }
})
