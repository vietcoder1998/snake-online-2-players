import GameMap from '../../base/models/game-map'
import GamePlay from '../../base/models/game-play'
import { Direction } from '../../base/models/response'
import rand from '../../base/utils/random'
import AlienShip from './alien'
import Bullet from './bullet'
import Ship from './ship'

export default class GalaxyGame extends GamePlay {
    public id
    public ownerId
    public map: GameMap
    public ship: Ship
    public aliens: AlienShip[]
    public life: number = 3
    public count: number = 0

    constructor(ownerId: string) {
        super(ownerId)
        this.id = ownerId + new Date().getTime().toString()
        this.map = new GameMap(800, 800, 0)
        this.ownerId = ownerId
        this.ship = new Ship(
            40,
            40,
            40,
            { x: this.map.w / 2, y: this.map.h / 3 },
            '_',
            { x: 0, y: 1 },
            { w: this.map.w - 40, h: this.map.h - 40 }
        )
        this.aliens = []
    }

    update(): void {
        const xl = this.map.w
        const yl = this.map.h
        this.ship.bullets.forEach((bullet: Bullet, i: number) => {
            if (bullet.position.x > xl) {
                this.ship.onDestroyBullet(i)
            } else bullet.moving({ xl, yl: yl - 40 })
        })
        this.aliens.forEach((alien) => {
            alien.bullets.forEach((bullet: Bullet, i: number) => {
                if (bullet.position.x > xl) {
                    this.ship.onDestroyBullet(i)
                } else bullet.moving({ xl, yl: yl - 40 })
            })
        })
        this.ship.moving({
            xl: this.map.w - this.ship.w / 2,
            yl: this.map.h - this.ship.h,
        })
        this.aliens.forEach((alien: AlienShip, ai: number) => {
            alien.moving({ xl, yl: yl - 20 })
            if (
                alien.position.y > this.map.h - 22 ||
                alien.position.x + alien.w > this.map.w - 10
            ) {
                this.aliens.splice(ai, 1)
            }
        })
        this.onCheckCollision()
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
                { x: rand(xl), y: rand(yl * 0.2, 0) },
                '_',
                { x: 0, y: -1 },
                { w: this.map.w, h: this.map.h }
            )
        )
    }

    onCheckCollision() {
        this.aliens.forEach((alien: AlienShip, ai) => {
            if (alien.isCollision(this.ship.position, this.ship.range)) {
                this.life -= 1
                this.aliens.splice(ai, 1)
            }
            this.ship.bullets.forEach((bullet: Bullet, bi: number) => {
                const cl = bullet.isCollision(alien.position, alien.range)
                if (cl) {
                    this.ship.onDestroyBullet(bi)
                    this.aliens.splice(ai, 1)
                    this.score += 1
                }
            })
        })
    }
}
