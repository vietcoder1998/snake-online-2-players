import Interval from '../utils/interval'
import { MoveRange, Vector } from './typing'
export class Character {
    private _position: Vector = {
        x: 0,
        y: 0,
    }
    private _avatar: string = ''
    private _speed: number = 1
    private _state: number = 0
    public w: number
    public h: number
    public range: number
    private limit: MoveRange = {
        w: 0,
        h: 0,
    }
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
        vector?: Vector,
        limit?: MoveRange
    ) {
        this.position = position || { x: 0, y: 0 }
        this.w = w
        this.h = h
        this.range = range
        this._avatar = avatar
        if (vector) {
            this.vector = vector
        }

        if (limit) {
            this.limit = limit
        }
    }

    /**
     *
     * @param {xl} String - x limit
     * @param {yl} String - y limit
     */

    moving({ xl, yl }: { xl: number; yl: number }) {
        if (this.position.x < -1) {
            this.position.x = 0
        }

        if (this.position.x > xl) {
            this.position.x = xl
        }

        if (this.position.y < -1) {
            this.position.y = 0
        }

        if (this.position.y > yl) {
            this.position.y = yl
        }

        if (
            this.position.x >= -1 &&
            this.position.x <= xl &&
            this.position.y >= -1 &&
            this.position.y <= yl
        ) {
            this.position.x += this.vector.x * this.speed
            this.position.y += this.vector.y * this.speed
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
    set vector(_vector: Vector) {
        this._vector = _vector
    }
    get vector(): Vector {
        return this._vector
    }
    set avatar(_avatar: string) {
        this._avatar = _avatar
    }
    get avatar(): string {
        return this._avatar
    }

    isCollision(targetPosition: Vector, range: number) {
        if (
            Math.abs(this.range + range) >
            Math.sqrt(
                Math.pow(this.position.x - targetPosition.x, 2) +
                    Math.pow(this.position.y - targetPosition.y, 2)
            )
        ) {
            return true
        }
        return false
    }

    getSize() {
        return {
            w: this.w,
            h: this.h,
        }
    }
}
