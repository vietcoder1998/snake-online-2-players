"use strict"

import { Direction } from "../../enums"
import Food from "./food"

class Snake {
    body = [
        { x: 0, y: 0 },
        { x: 1, y: 0 },
        { x: 2, y: 0 },
    ]
    vector = { x: 1, y: 0 }

    RESET_GAME() {
        this.body = [
            { x: 0, y: 0 },
            { x: 1, y: 0 },
            { x: 2, y: 0 },
        ]
        this.vector = { x: 1, y: 0 }
    }

    moving() {
        const head = this.body[this.body.length - 1]
        const nHead = {
            x: head.x + this.vector.x,
            y: head.y + this.vector.y,
        }

        this.body.push(nHead)
        this.body.shift()
    }

    direction(d: Direction) {
        switch (d) {
            case Direction.LEFT:
                this.vector = { x: -1, y: 0 }
                break
            case Direction.RIGHT:
                this.vector = { x: 1, y: 0 }
                break
            case Direction.DOWN:
                this.vector = { x: 0, y: 1 }
                break
            case Direction.UP:
                this.vector = { x: 0, y: -1 }
                break

            default:
                break
        }
    }

    eat(f: Food) {
        this.body.push(f)
    }

    checkCollision(f: Food) {
        let isCollision = false
        const head = this.body[this.body.length - 1]
        if (head.x === f.x && head.y === f.y) {
            isCollision = true
        }

        return {
            isCollision,
            food: f,
        }
    }

    head() {
        return this.body[this.body.length - 1]
    }
}

export default Snake