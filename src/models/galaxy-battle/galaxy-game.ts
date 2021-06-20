'use strict'

import { Direction } from '../../enums'
import GamePlay from '../base/game-play'
import GameMap from '../base/game-map'
import Ship from './ship'

export default class GalaxyGame extends GamePlay {
    id
    ownerId
    map: GameMap
    ship: Ship

    constructor(ownerId: string) {
        super(ownerId)
        this.id = ownerId + new Date().getTime().toString()
        this.map = new GameMap(20, 20, 0)
        this.ownerId = ownerId
    }

    update() {}
    direction(d: Direction) {
        
    }
}
