import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToOne,
    PrimaryGeneratedColumn,
} from 'typeorm'
import { EntityTypes } from '../enums/entity.enum'
import User from '../models/user.model'
import ProfileEntity from './profile.entity'
import RoleEntity from './role.entity'

@Entity(EntityTypes.USER)
export default class UserEntity extends User {
    @PrimaryGeneratedColumn()
    id?: number

    @Column({
        type: 'varchar',
        nullable: false,
    })
    username?: string

    @Column({
        type: 'varchar',
        nullable: false,
    })
    password?: string

    @Column({
        type: 'varchar',
        nullable: false,
    })
    createdDate?: number

    @Column({
        type: 'varchar',
        nullable: false,
    })
    token?: string

    @Column({
        type: 'varchar',
        nullable: false,
    })
    ban?: number
    @Column({
        type: 'varchar',
        nullable: false,
    })
    active?: number

    @ManyToOne((type) => RoleEntity, (role) => role.id, {
        cascade: false,
        onDelete: 'NO ACTION',
    })
    @JoinColumn({ name: 'roleId' })
    role?: RoleEntity

    @OneToOne((type) => ProfileEntity, { cascade: true, onDelete: 'CASCADE' })
    @JoinColumn({ name: 'profileId' })
    profile: ProfileEntity

    constructor(
        id?: number,
        username?: string,
        password?: string,
        email?: string,
        token?: string,
        ban?: number,
        active?: number
    ) {
        super(id, username, password, email, token, ban)
    }
}
