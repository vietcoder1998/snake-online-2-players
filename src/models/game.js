'use strict'

const Interval = require("../utils/interval");
const GameMap = require("./map");
const Snake = require("./snake");

class GamePlay {
    id
    ownerId
    snake = new Snake()
    map = new GameMap()
    foods = []
    score = 0
    end = false
    pause = true

    constructor(ownerId) {
        this.id = ownerId + new Date().getTime().toString()
        this.ownerId = ownerId + ''
        this.foods = [{ x: 2, y: 3 }, { x: 6, y: 8 }, { x: 5, y: 10 }]
    }
    
    restart() {
        this.pause = false
        this.end = false
    }

    setPause(pause) {
        this.pause = pause
    }

    pause() {
       this.pause = true
    }

    continue() {
        this.pause = false
    }

    runSnake() {
        const head = this.snake.head()
        if (!this.pause) {
            if (head.x < this.map.w - 1 && head.y < this.map.h - 1 && head.x > 0 && head.y > -1) {
                this.foods.forEach((f, i) => {
                    const cc = this.snake.checkCollision(f)
                    if (cc.isCollision) {
                        console.log('eat ->', i)
                        this.snake.eat(cc.food)
                        this.foods.splice(i, 1)
                        this.score += 1
                    }
                });
                this.snake.moving()
            } else this.endGame()
        }

    }

    directionSnake(d) {
        this.snake.direction(d)
    }

    endGame() {
        this.end = true
        this.setPause(true)
    }

    getGames(isArr) {
        if (isArr) {
            return this.games
        } else {
            return Object.values(this.games)
        }
    }
}

module.exports = GamePlay