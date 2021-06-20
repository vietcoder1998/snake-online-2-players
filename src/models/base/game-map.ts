export default class GameMap {
    w: number
    h: number
    s: number
    constructor(w: number, h: number, s: number) {
        this.w = w || 20
        this.h = h || 20
        this.s = s || 5
    }
}
