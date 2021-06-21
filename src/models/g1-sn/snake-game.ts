'use strict'

import { Direction } from '../../base/response'
import GamePlay from '../../base/game-play'
import GameMap from '../../base/game-map'
import Food from './food'
import Snake from './snake'

class SnakeGame extends GamePlay {
    id: string
    ownerId: string
    snake: Snake = new Snake()
    map: GameMap
    foods: Food[]

    constructor(ownerId: string) {
        super(ownerId)
        this.id = ownerId + new Date().getTime().toString()
        this.map = new GameMap(20, 20, 0)
        this.ownerId = ownerId
        this.foods = [
            { x: 2, y: 3 },
            { x: 6, y: 8 },
            { x: 5, y: 10 },
        ]
    }

    direction(d: Direction) {
        this.snake.direction(d)
    }

    update() {
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
        this.end = true
    }
}

export default SnakeGame
