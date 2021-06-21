import { Direction } from '../../base/response'
import GamePlay from '../../base/game-play'
import GameMap from '../../base/game-map'
import Ship from './ship'
import AlienShip from './alien-ship'
import Bullet from './bullet'
import rand from '../../utils/random'
import Interval from '../../utils/interval'
export default class GalaxyGame extends GamePlay {
    public id
    public ownerId
    public map: GameMap
    public ship: Ship
    public aliens: AlienShip[]
    public life: number = 3

    constructor(ownerId: string) {
        super(ownerId)
        this.id = ownerId + new Date().getTime().toString()
        this.map = new GameMap(800, 1600, 0)
        this.ownerId = ownerId
        this.ship = new Ship(
            40,
            40,
            40,
            { x: this.map.w / 2, y: this.map.h / 3 },
            '_',
            { x: 0, y: 1 },
            { w: this.map.w, h: this.map.h }
        )
        this.aliens = []
    }

    update(): void {
        const xl = this.map.w
        const yl = this.map.h
        this.destroyAlien()
        this.ship.bullets.forEach((bullet: Bullet, i: number) => {
            this.aliens.forEach((alien: AlienShip, ai) => {
                if (alien.onCollision(bullet.position, 2)) {
                    this.aliens.splice(ai, 1)
                    this.score += 1
                }
            })
            if (bullet.position.x > xl) {
                this.ship.onDestroyBullet(i)
            } else bullet.moving({ xl, yl: yl - 40 })
        })
        this.aliens.forEach((alien) => {
            if (alien.onCollision(this.ship.position, 2)) {
                this.life -= 1
            }
        })
        this.ship.moving({ xl, yl: this.map.h })
        this.aliens.forEach((alien: AlienShip, i: number) => {
            alien.moving({ xl, yl: yl - 20 })
        })
    }

    direction(d: Direction) {
        this.ship.direction(d)
    }

    makeRandomAlien() {
        const xl = this.map.w
        const yl = this.map.h
        this.aliens.push(
            new AlienShip(
                40,
                40,
                40,
                { x: rand(xl), y: rand(yl * 0.2, yl) },
                '_'
            )
        )
    }

    destroyAlien() {
        this.aliens.forEach((alien: AlienShip, i) => {
            if (alien.position.y > this.map.h - alien.getSize().w / 2) {
                this.aliens.splice(i, 1)
            }
        })
    }
}
