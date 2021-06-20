'use strict'

import { Direction } from '../../enums'
import Food from './food'
import GameMap from './map'
import Snake from './snake'

class GamePlay {
    id
    ownerId
    snake = new Snake()
    map = new GameMap()
    foods: Food[]
    score = 0
    end = false
    pause = false

    constructor(ownerId: string) {
        this.id = ownerId + new Date().getTime().toString()
        this.ownerId = ownerId + ''
        this.foods = [
            { x: 2, y: 3 },
            { x: 6, y: 8 },
            { x: 5, y: 10 },
        ]
    }

    restart() {
        this.pause = false
        this.end = false
    }

    setPause(pause: boolean) {
        this.pause = pause
    }

    pauseGame() {
        this.pause = true
    }

    continue() {
        this.pause = false
    }

    updateGame() {
        const head = this.snake.head()
        if (
            head.x < this.map.w - 1 &&
            head.y < this.map.h - 1 &&
            head.x > 0 &&
            head.y > -1
        ) {
            this.foods.forEach((f, i) => {
                const cc = this.snake.checkCollision(f)
                if (cc.isCollision) {
                    this.snake.eat(cc.food)
                    this.foods.splice(i, 1)
                    this.score += 1
                }
            })
            this.snake.moving()
        }

        this.endGame()
    }

    directionSnake(d: Direction) {
        this.snake.direction(d)
    }

    endGame() {
        this.end = true
        this.setPause(true)
    }
}

export default GamePlay
