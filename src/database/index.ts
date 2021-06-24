import 'metadata'
import { Connection, createConnections } from 'typeorm'
import { MANAGER } from '../config/const'
import ApiEntity from '../entities/api.entity'
import MethodEntity from '../entities/method.entity'
import ModuleEntity from '../entities/module.entity'
import ProfileEntity from '../entities/profile.entity'
import RoleEntity from '../entities/role.entity'
import UserEntity from '../entities/user.entity'
import { MongoConnection, MySqlConnection } from '../interfaces'

const migrateDataBase = async function () {
    console.log('migrate database -> :')
    try {
        const mongo: MongoConnection = {
            name: MANAGER.MONGO,
            type: 'mongodb',
            url: process.env.MONGO_NATIVE_DRIVE,
            port: 27017,
            useNewUrlParser: true,
            synchronize: true,
            logging: true,
            database: 'tetris_db',
            entities: [
                // Entity in here
            ],
            useUnifiedTopology: true,
            ssl: false,
            logger: 'simple-console',
        }
        const mysql: MySqlConnection = {
            type: 'mysql',
            host: 'localhost',
            name: MANAGER.SQL,
            port: 3306,
            username: 'root',
            password: 'Anh123456./',
            database: 'game_base_service',
            entities: [
                // Entity in here
                UserEntity,
                ProfileEntity,
                RoleEntity,
                MethodEntity,
                ModuleEntity,
                ApiEntity,
            ],
            synchronize: true,
            logging: true,
        }
        const connection = await createConnections([mysql])
        connection.map((element: Connection) => {
            const date = new Date()
            console.log(date, ' connected to db: ', element.namingStrategy)
        })
    } catch (err) {
        console.log(err)
        throw err
    } finally {
        console.log(
            '\x1b[33m------------------ Database Connecting Finished -------------------'
        )
        console.log(
            '\x1b[0m link swagger: ',
            `\x1b[32m http://localhost:${process.env.PORT}/api-docs`
        )
        console.log(
            '\x1b[0m link views: ',
            `\x1b[32m http://localhost:${process.env.PORT}/`
        )
    }
}

export default migrateDataBase
