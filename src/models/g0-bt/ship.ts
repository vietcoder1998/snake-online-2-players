import { Direction } from '../../base/response'
import { Character } from '../../base/character'
import { MoveRange, Vector } from '../../interfaces/typing'
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
                this.onShooting(
                    new Bullet(
                        5,
                        5,
                        3,
                        {
                            x: this.position.x + this.w / 2,
                            y: this.position.y,
                        },
                        '_'
                    )
                )
                break
            default:
                break
        }
    }
}
