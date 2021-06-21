import { Character } from '../../base/models/character'
import { MoveRange, Vector } from '../../base/models/typing'

export default class Bullet extends Character {
    constructor(
        w: number,
        h: number,
        range: number,
        position: Vector,
        avatar: string,
        vector?: Vector,
        limit?: MoveRange
    ) {
        super(w, h, range, position, avatar, vector, limit)
        this.speed = 10
    }
}
