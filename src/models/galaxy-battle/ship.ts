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
}
