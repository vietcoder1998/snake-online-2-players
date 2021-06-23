import { Router } from 'express'
import BaseService from '../services'

export default abstract class BaseRouter {
    public router: Router
    public service: BaseService
    constructor() {
        this.router = Router()
        this.listen()
    }

    public abstract listen(): void
}
