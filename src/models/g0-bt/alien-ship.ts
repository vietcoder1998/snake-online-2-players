import { Character } from '../../base/character'
import { Vector } from '../../interfaces/typing'
import Bullet from './bullet'
export default class AlienShip extends Character {
    private _bullets: Bullet[] = []

    constructor(
        w: number,
        h: number,
        range: number,
        position: Vector,
        avatar: string
    ) {
        super(w, h, range, position, avatar)
        this.vector = { x: 0, y: 1 }
        this.speed = 3
        this.moving({ xl: 800, yl: 400 })
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
