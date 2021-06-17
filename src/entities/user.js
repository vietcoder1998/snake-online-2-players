'use strict'
const Entity = require('typeorm').Entity

@Entity('users')
class UserEntity {
    @PrimaryGeneratedColumn()
    id

    @Column({
        name: 'varchar',
    })
    username

    @Column({
        name: 'varchar',
    })
    password
}

module.exports = UserEntity