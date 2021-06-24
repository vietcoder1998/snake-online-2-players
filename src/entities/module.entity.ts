import {
    Column,
    Entity,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
} from 'typeorm'
import { EntityTypes } from '../enums/entity.enum'
import ApiEntity from './api.entity'

@Entity(EntityTypes.MODULES)
export default class ModuleEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column({
        type: 'varchar',
        nullable: true,
    })
    name: string

    @Column({
        type: 'varchar',
        nullable: true,
    })
    description: string

    @OneToMany((api) => ApiEntity, (api) => api.module, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    })
    apis: ApiEntity[]
}
