import * as bodyParser from 'body-parser'
import * as cors from 'cors'
import * as dotenv from 'dotenv'
import * as express from 'express'
import { Express } from 'express-serve-static-core'
import * as http from 'http'
import * as swaggerUi from 'swagger-ui-express'
import migrateDataBase from './database'
import specs from './swagger'
import { ip } from './utils/ip'

export default class ExpressApplicationService {
    private application: Express
    private corsOptions: cors.CorsOptions
    private server: http.Server

    constructor() {
        dotenv.config()
        migrateDataBase()

        this.application = express()
        this.server = http.createServer(this.application)
        this.corsOptions = {
            origin: `http://${ip}:${process.env.PORT}`,
            credentials: true, //access-control-allow-credentials:true
            optionsSuccessStatus: 200,
        }
    }

    public start() {
        //@ts-ignore
        this.application.use(bodyParser.json())

        // router in here

        //@ts-ignore
        this.application.use(
            '/api-docs',
            swaggerUi.serve,
            swaggerUi.setup(specs)
        )
        this.server.listen(process.env.PORT, () => {
            console.log(`start -> \x1b[32m http://${ip + process.env.PORT}`)
        })
    }
}

const application = new ExpressApplicationService()
application.start()
