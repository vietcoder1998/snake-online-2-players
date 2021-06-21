import { Character } from '../../base/models/character'
import { MoveRange, Vector } from '../../base/models/typing'
import Bullet from './bullet'
export default class AlienShip extends Character {
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
        this.vector = { x: 0, y: 1 }
        this.speed = 3
        this.moving({ xl: limit.w, yl: limit.h })
        this.range = 20

        Array([1, 2, 3, 5]).forEach((bullet) =>
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
                    { x: 0, y: 1 }
                )
            )
        )
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
}
