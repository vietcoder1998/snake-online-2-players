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
        avatar: string
    ) {
        this._position = position || { x: 0, y: 0 }
        this.w = w
        this.h = h
        this.range = range
        this._avatar = avatar
    }

    moving() {
        const { vector } = this
        this._position.x += vector.x * this.speed
        this._position.y += vector.y * this.speed
    }

    set speed(_speed: number) {
        this._speed = _speed
    }
    get speed() {
        return this._speed
    }
    get position(): Vector {
        return this.position
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
        return this.vector
    }

    onCollision(target: Vector, range: number) {
        const { x, y } = target
        if (
            Math.abs(this.range + range) >
            Math.sqrt((this._position.x - x) * (this._position.y - y))
        ) {
            return true
        } else return false
    }
}
