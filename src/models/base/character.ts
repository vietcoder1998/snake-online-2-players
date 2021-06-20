import Interval from '../../utils/interval'
import { Vector } from './../../interfaces/typing'
export class Character {
    private _position: Vector = {
        x: 0,
        y: 0,
    }
    private _avatar: string = ''
    private _interval = new Interval(1000)
    private _speed: number = 1
    private _state: number = 0
    private w: number
    private h: number
    private range: number
    private _vector: Vector = {
        x: 0,
        y: 0,
    }

    constructor(
        w: number,
        h: number,
        range: number,
        position: Vector,
        avatar: string,
        vector?: Vector
    ) {
        this._position = position || { x: 0, y: 0 }
        this.w = w
        this.h = h
        this.range = range
        this._avatar = avatar
        if (vector) {
            this._vector = vector
        }
    }

    moving({ xl, yl }: { xl: number; yl: number }) {
        if (
            this.position.x + this.vector.x > -1 &&
            this.position.x + this.vector.x < xl &&
            this.position.y + this.vector.y > -1 &&
            this.position.y + this.vector.y < yl
        ) {
            this.position.x += this.vector.x * this.speed
            this.position.y += this.vector.y * this.speed
        } else {
            this.vector.x = 0
            this.vector.y = 0
        }
    }

    set speed(_speed: number) {
        this._speed = _speed
    }
    get speed() {
        return this._speed
    }
    get position(): Vector {
        return this._position
    }
    set position(_position: Vector) {
        this._position = _position
    }
    get interval(): Interval {
        return this._interval
    }
    set interval(_interval: Interval) {
        this._interval = _interval
    }
    set vector(_vector: Vector) {
        this._vector = _vector
    }
    get vector(): Vector {
        return this._vector
    }

    onCollision(target: Vector, range: number) {
        const { x, y } = target
        if (
            Math.abs(this.range + range) >
            Math.sqrt((this.position.x - x) * (this.position.y - y))
        ) {
            return true
        } else return false
    }
}
