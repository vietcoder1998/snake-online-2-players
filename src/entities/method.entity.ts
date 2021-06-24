import {
    Column,
    Entity,
    OneToMany,
    OneToOne,
    PrimaryGeneratedColumn,
} from 'typeorm'
import { EntityTypes } from '../enums/entity.enum'
import ApiEntity from './api.entity'

@Entity(EntityTypes.METHOD)
export default class MethodEntity {
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

    @OneToMany((type) => ApiEntity, (api) => api.method, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    })
    apis: ApiEntity[]
}
