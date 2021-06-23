import {
    Column,
    Entity,
    JoinTable,
    ManyToMany,
    PrimaryGeneratedColumn,
} from 'typeorm'
import { EntityTypes } from '../enums/entity.enum'
import Role from '../models/role.model'
import ApiEntity from './api.entity'

@Entity(EntityTypes.ROLES)
export default class RoleEntity extends Role {
    @PrimaryGeneratedColumn()
    id?: number

    @Column({
        type: 'varchar',
    })
    name?: string

    @Column({
        type: 'text',
    })
    description?: string

    @ManyToMany((api) => ApiEntity, (api) => api.roles)
    @JoinTable({ name: 'role_api' })
    apis: ApiEntity[]
}
