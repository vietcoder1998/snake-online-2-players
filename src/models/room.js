'user strict'

const Interval = require("../utils/interval")
const GamePlay = require("./game")

class Room {
    id
    ownerId
    players = {}
    playerIds = []
    games = {}
    interval = new Interval(500)

    constructor(o) {
        this.ownerId = o + ""
        this.id = o + ""
    }

    removeUser(userId, next) {
        if (this.userId === this.ownerId) {
            next(false)
        } else {
            delete this.user[userId]
            this.playerIds.forEach((playerId, i) => {
                if (userId === playerId) {
                    this.playerIds.splice(i, 1)
                }
            })
        }
    }

    createGame(ownerId) {
        const game = new GamePlay(ownerId)
        this.append(ownerId, game)
    }
    
    addGame(ownerId, g) {
        Object.assign(this.games, {[ownerId]: g})
    }

    getPlayerIds() {
        return this.playerIds
    }

    runSnakeGame(next) {
        const games = this.getGames(true)
        games.forEach((game) => game.runSnake())
        next()
    }

    removeGame(gId) {
        delete this.games[gId]
    }

    getGame(gId) {
        return this.games[gId]
    }

    createGame(ownerId) {
        const game = new GamePlay(ownerId)
        this.addGame(ownerId, game)
    }
    
    addUser(id, u) {
        Object.assign(this.players, { [id]: u })
        this.playerIds.push(u.id)
        this.createGame(id)
    }

    removeUser(userId) {
        delete this.user[userId]
        delete this.games[userId]
    }

    getGames(iArr) {
        if (iArr) {
            return Object.values(this.games)
        } else {
            return this.games
        }
    }

    getPlayers(iA) {
        if (iA) {
            return Object.values(this.players)
        } else {
            return this.players
        }
    }

    clearGame() {
        this.games = {}
    }
}

module.exports = Room