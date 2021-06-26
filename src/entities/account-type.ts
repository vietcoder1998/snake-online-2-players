import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import AccountType from '../dto/account-type'
import { EntityTypes } from '../enums/entity.enum'
import UserEntity from './user.entity'

@Entity(EntityTypes.ACCOUNT_TYPE)
export default class AccountTypeEntity extends AccountType {
    @PrimaryGeneratedColumn()
    id?: number

    @Column({ name: 'name', type: 'varchar', nullable: false })
    name?: string

    @Column({ name: 'description', type: 'varchar', nullable: false })
    description?: string

    @OneToMany((type) => UserEntity, (userEntity) => userEntity.accountType)
    users: UserEntity[]

    constructor(id?: number, name?: string, description?: string) {
        super(id, name, description)
    }
}
