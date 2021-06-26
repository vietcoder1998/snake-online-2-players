import * as bodyParser from 'body-parser'
import * as cors from 'cors'
import * as dotenv from 'dotenv'
import * as express from 'express'
import { Express } from 'express-serve-static-core'
import * as http from 'http'
import * as swaggerUi from 'swagger-ui-express'
import Oauth2Controller from './controllers/oauth2.controller'
import UserController from './controllers/user.controller'
import migrateDataBase from './database'
import PathName from './enums/path.enum'
import specs from './swagger'
import { ip } from './utils/ip'
import 'reflect-metadata'
import { Req, Res } from './interfaces'

export default class ExpressApplicationService {
    private application: Express
    private corsOptions: cors.CorsOptions
    private server: http.Server
    private userController: UserController
    private oauthController: Oauth2Controller

    constructor() {
        dotenv.config()
        migrateDataBase()

        this.application = express()
        this.userController = new UserController()
        this.oauthController = new Oauth2Controller()
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
        this.application.use(PathName.USER, this.userController.router)
        this.application.use(PathName.OAUTH2, this.oauthController.router)

        // view
        this.application.get('/', (req: Req, res: Res) => {
            res.sendFile(__dirname + '/public/index.html')
        })

        //@ts-ignore
        this.application.use(
            '/api-docs',
            swaggerUi.serve,
            swaggerUi.setup(specs)
        )
        this.application.use(
            (err: Error, req: Req, res: Res, next: express.NextFunction) => {
                if (err) {
                    res.status(403).send('Api not found')
                }
            }
        )
        this.server.listen(process.env.PORT, () => {
            console.log(`start -> \x1b[32m http://${ip + process.env.PORT}`)
        })
    }
}

const application = new ExpressApplicationService()
application.start()
