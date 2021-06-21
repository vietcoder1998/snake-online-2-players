import { Vector } from '../../interfaces/typing'
import { Character } from '../../base/character'

export default class Bullet extends Character {
    constructor(
        w: number,
        h: number,
        range: number,
        position: Vector,
        avatar: string
    ) {
        super(w, h, range, position, avatar)
        this.speed = 5
        this.vector = { x: 1, y: 0 }
    }
}
