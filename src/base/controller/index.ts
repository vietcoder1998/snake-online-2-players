import { Router } from 'express'
import Oauth2 from '../../oauth2'
import BaseService from '../services'

export default abstract class BaseController {
    public router: Router
    public oauth2: Oauth2 = new Oauth2()
    public service: BaseService

    constructor() {
        this.router = Router()
        this.listen()
    }

    public abstract listen(): void
}
