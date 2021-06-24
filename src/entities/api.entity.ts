import {
    Column,
    Entity,
    JoinColumn,
    JoinTable,
    ManyToMany,
    ManyToOne,
    PrimaryGeneratedColumn,
} from 'typeorm'
import { EntityTypes } from '../enums/entity.enum'
import MethodEntity from './method.entity'
import ModuleEntity from './module.entity'
import RoleEntity from './role.entity'

@Entity(EntityTypes.API)
export default class ApiEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column({
        type: 'varchar',
        nullable: true,
    })
    path: string

    @Column({
        type: 'text',
        nullable: true,
    })
    description: string

    // many to one with module
    @ManyToOne((module) => ModuleEntity, (module) => module.apis, {
        cascade: false,
        onDelete: 'NO ACTION',
    })
    @JoinColumn({ name: 'moduleId' })
    module: ModuleEntity

    // many to many with method
    @ManyToOne((method) => MethodEntity, (method) => method.apis)
    @JoinColumn({ name: 'methodId' })
    method: MethodEntity

    // Many to many with role
    @ManyToMany((role) => RoleEntity, (role) => role.apis, {
        onDelete: 'NO ACTION',
        onUpdate: 'CASCADE',
    })
    @JoinTable({ name: 'api_role' })
    roles: RoleEntity[]
}
