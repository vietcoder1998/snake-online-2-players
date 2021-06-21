'use strict'

import { Direction } from './response'
import Interval from '../utils/interval'
import GameMap from './game-map'

export default abstract class GamePlay {
    public id: string
    public ownerId: string
    public map: GameMap
    private _score: number = 0
    private _end: boolean = false
    private _pause: boolean = false

    constructor(ownerId: string) {
        this.id = ownerId + new Date().getTime().toString()
        this.ownerId = ownerId + ''
    }
    abstract update(): void
    abstract direction(d: Direction): void

    restart() {
        this._pause = false
        this.end = false
    }

    set pause(pause: boolean) {
        this._pause = pause
    }

    get pause(): boolean {
        return this.pause
    }

    set end(_end: boolean) {
        this._end = _end
    }

    get end(): boolean {
        return this._end
    }

    set score(score: number) {
        this._score = score
    }

    get score() {
        return this._score
    }
}
