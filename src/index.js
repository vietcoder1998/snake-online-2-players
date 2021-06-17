const express = require('express')
const http = require('http')
const SnakeServer = require('./socket/snake-server')
const mysql = require('mysql')
const fs = require('fs')
const { getIp } = require('./utils/ip')

const app = express()

const con = mysql.createConnection({
    host: 'localhost',
    password: 'Anh123456./',
    port: 3306,
    user: 'root',
})

con.connect(function (err) {
    if (err) {
        console.log(err)
        throw err
    }
})

con.query('USE snake', function (err, result) {
    console.log(err, result)
    if (!result) {
    con.query('CREATE DATABASE snake', function (err, result) {
        if (err) {
            console.log(err)
            throw err
        }
        else console.log(result)
    })
    }
})

app.get('/', (req, res, next) => {
    res.sendFile(__dirname + '/public/index.html')
})

app.get('/:name', (req, res, next) => {
    res.sendFile(__dirname + `/public/${req.params.name}`)
})

app.get('/v1/user', (req, res, next) => {
    fs.readFile(__dirname + '/json/user.json', (err, data) => {
        res.send(JSON.parse(data.toString()))
    })
})

app.get('/v1/user/:id', (req, res, next) => {
    fs.readFile(__dirname + '/json/user.json', (err, data) => {
        const users =  JSON.parse(data.toString())
        res.send(users[req.params.id])
    })
})

app.use((err, req, res, next) => {
    if (err) {
        res.status(404).end('404 not found')
        throw err
    }
})

const server = http.createServer(app)
const io = require('socket.io')(server, {
    origin: ['*']
})

const sc = new SnakeServer(io)

io.on("connection", (socket) => {
    const id = socket.handshake.auth.id
    try {
        socket.join(id)
        sc.setSocket(socket)
        sc.gameController.addUser(socket.handshake.auth)
        sc.listen()
    } catch (err) {
        socket._error(err)
    }

    socket.on("error", (err) => {
        console.log(err)
    })
    
    socket.on("disconnect", (reason) => {
        sc.gameController.removeUser(id)
        socket.leave(id)
    })
});

server.listen(3007, e => {
    const ips = getIp()
    console.log(`http://${ips[1]}:${3007}`, )
    if (e) {
        console.log(e)
    }
})