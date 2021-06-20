import { Direction } from '../../enums'
import GamePlay from '../base/game-play'
import GameMap from '../base/game-map'
import Ship from './ship'
import AlienShip from './alien-ship'
import Bullet from './bullet'
export default class GalaxyGame extends GamePlay {
    id
    ownerId
    map: GameMap
    ship: Ship
    aliens: AlienShip[]

    constructor(ownerId: string) {
        super(ownerId)
        this.id = ownerId + new Date().getTime().toString()
        this.map = new GameMap(800, 400, 0)
        this.ownerId = ownerId
        this.ship = new Ship(40, 40, 40, { x: 0, y: this.map.h / 2 }, '_')
        this.aliens = Array([1, 2, 3, 4, 5, 6]).map(
            (i) =>
                new AlienShip(
                    20,
                    20,
                    20,
                    {
                        x: Math.floor(Math.random() * this.map.w),
                        y: Math.floor(Math.random() * this.map.h),
                    },
                    '_'
                )
        )
        this.ship.bullets = Array([1, 2, 3]).map(
            (item) => new Bullet(2, 2, 4, this.ship.position, '_')
        )
    }

    update(): void {
        this.ship.moving()
        this.ship.bullets.forEach((bullet: Bullet, i: number) => {
            if (bullet.position.x > this.map.w) {
                this.ship.onDestroyBullet(i)
            } else bullet.moving()
        })
    }
    direction(d: Direction) {
        this.ship.direction(d)
    }
}
