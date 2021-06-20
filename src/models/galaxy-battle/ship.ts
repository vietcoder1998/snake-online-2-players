import { Direction } from './../../enums/index'
import { Character } from '../base/character'
import { Vector } from './../../interfaces/typing'
import Bullet from './bullet'

export default class Ship extends Character {
    private _bullets: Bullet[] = []
    constructor(
        w: number,
        h: number,
        range: number,
        position: Vector,
        avatar: string
    ) {
        super(w, h, range, position, avatar)
    }

    get bullets(): Bullet[] {
        return this._bullets
    }

    set bullets(_bullets: Bullet[]) {
        this._bullets = _bullets
    }

    onShooting(bullet: Bullet): void {
        this._bullets.push(bullet)
    }

    onDestroyBullet(i: number) {
        this._bullets.splice(i, 1)
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
            case Direction.SHOT:
                this.onShooting(new Bullet(2, 2, 3, this.position, "_"))
                break
            default:
                break
        }
    }

    moving() {
        this.position.x += this.vector.x
        this.position.y += this.vector.y
    }
}
