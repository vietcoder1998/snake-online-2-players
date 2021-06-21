import { Direction } from '../../base/models/response'
import { Character } from '../../base/models/character'
import { MoveRange, Vector } from '../../base/models/typing'
import Bullet from './bullet'

export default class Ship extends Character {
    private _bullets: Bullet[] = []
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
        this.speed = 2
    }

    get bullets(): Bullet[] {
        return this._bullets
    }
    set bullets(_bullets: Bullet[]) {
        this._bullets = _bullets
    }

    onShooting(bullet: Bullet): void {
        this.bullets.push(bullet)
    }

    onDestroyBullet(i: number) {
        this.bullets.splice(i, 1)
    }

    direction(d: Direction) {
        let rateX = 1
        let rateY = 1

        if (this.vector.x !== 0 && this.vector.x % 5 === 0) {
            rateX = Math.abs(this.vector.x / 5)
        }
        if (this.vector.y !== 0 && this.vector.y % 5 === 0) {
            rateY = Math.abs(this.vector.y / 5)
        }

        switch (d) {
            case Direction.LEFT:
                this.vector.x += -1 / rateX
                break
            case Direction.RIGHT:
                this.vector.x += 1 / rateX
                break
            case Direction.DOWN:
                this.vector.y += 1 / rateY
                break
            case Direction.UP:
                this.vector.y -= 1 / rateY
                break

            case Direction.SHOT:
                this.onShooting(
                    new Bullet(
                        5,
                        5,
                        3,
                        {
                            x: this.position.x,
                            y: this.position.y - this.h / 2,
                        },
                        '_',
                        { x: 0, y: -1 }
                    )
                )
                break
            default:
                break
        }
    }
}
