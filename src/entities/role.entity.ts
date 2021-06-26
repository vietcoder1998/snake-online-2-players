import {
    Column,
    Entity,
    JoinTable,
    ManyToMany,
    ManyToOne,
    PrimaryGeneratedColumn,
} from 'typeorm'
import { EntityTypes } from '../enums/entity.enum'
import Role from '../dto/role.model'
import ApiEntity from './api.entity'
import UserEntity from './user.entity'

@Entity(EntityTypes.ROLE)
export default class RoleEntity extends Role {
    @PrimaryGeneratedColumn()
    id: number

    @Column({
        type: 'varchar',
    })
    name?: string

    @Column({
        type: 'text',
    })
    description?: string

    @ManyToMany((api) => ApiEntity, (api) => api.roles, {
        cascade: true,
        createForeignKeyConstraints: true,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
    })
    apis: ApiEntity[]

    @ManyToOne((user) => UserEntity, (user) => user.role, {
        cascade: true,
        createForeignKeyConstraints: true,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
    })
    users: UserEntity[]
}
