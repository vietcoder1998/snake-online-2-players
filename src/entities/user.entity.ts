import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToOne,
    PrimaryGeneratedColumn,
} from 'typeorm'
import { EntityTypes } from '../enums/entity.enum'
import User from '../dto/user.model'
import ProfileEntity from './profile.entity'
import RoleEntity from './role.entity'
import AccountType from '../dto/account-type'
import AccountTypeEntity from './account-type'

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
        nullable: true,
    })
    password?: string

    @Column({
        type: 'bigint',
        nullable: true,
    })
    createdDate?: number

    @Column({
        type: 'varchar',
        nullable: true,
    })
    token?: string

    @Column({
        type: 'varchar',
        nullable: true,
    })
    ban?: number
    @Column({
        type: 'varchar',
        nullable: true,
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

    @ManyToOne((type) => AccountTypeEntity, (accountType) => accountType.id, {
        cascade: false,
        onDelete: 'NO ACTION',
        onUpdate: 'RESTRICT',
    })
    @JoinColumn({ name: 'accountTypeId' })
    accountType?: AccountTypeEntity

    constructor(
        id?: number,
        username?: string,
        password?: string,
        email?: string,
        roleId?: number,
        accountType?: number,
        token?: string,
        ban?: number
    ) {
        super(id, username, password, email, roleId, accountType, ban, token)
    }
}
