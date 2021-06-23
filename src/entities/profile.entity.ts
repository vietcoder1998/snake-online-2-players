import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm'
import { ENTITIES } from '../config/const'
import ProfileModel from '../models/profile.model'
import UserEntity from './user.entity'

@Entity(ENTITIES.PROFILE)
export default class ProfileEntity extends ProfileModel {
    @PrimaryGeneratedColumn()
    id: number

    @Column({
        type: 'varchar',
        nullable: true,
    })
    name: string

    @Column({
        nullable: true,
        type: 'varchar',
    })
    coverUrl: string

    @Column({
        nullable: true,
        type: 'varchar',
    })
    state: number

    @Column({
        nullable: true,
        type: 'varchar',
    })
    avatarUrl: string

    @Column({
        nullable: true,
        type: 'bigint',
    })
    createdDate: number

    @OneToOne((type) => ProfileEntity, { cascade: false })
    user: UserEntity
}
