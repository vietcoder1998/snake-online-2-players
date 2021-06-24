import { NextFunction } from 'express'
import BaseController from '../base/controller'
import { CommonCode } from '../enums/code.enum'
import { Req, Res } from '../interfaces'
import Oauth2 from '../oauth2'
import UserService from '../services/user.service'

export default class UserController extends BaseController {
    listen() {
        this.router.get('/:id', (req: Req, res: Res, next: NextFunction) => {
            try {
                const { id } = req.params
                const userService = new UserService()

                if (id === 'list') {
                    this.oauth2.guard(req, res, '/user/list', () => {
                        userService.getList().then((data) => {
                            res.status(data.getSubCode()).send(data)
                        })
                    })
                } else {
                    this.oauth2.guard(req, res, '/user/:id', () => {
                        userService.get(id).then((data) => {
                            res.status(data.getSubCode()).send(data)
                        })
                    })
                }
            } catch (error) {
                res.status(CommonCode.UNKNOWN).send(error)
            }
        })
        this.router.delete('/:id', (req: Req, res: Res, next: NextFunction) => {
            try {
                const { id } = req.params
                this.oauth2.guard(req, res, '/user/delete', () => {
                    const userService = new UserService()
                    userService.delete(id).then((data) => {
                        res.status(data.getSubCode()).send(data)
                    })
                })
            } catch (error) {
                res.status(CommonCode.UNKNOWN).send(error)
            }
        })
        this.router.post(
            '/create',
            (req: Req, res: Res, next: NextFunction) => {
                try {
                    const user = req.body
                    this.oauth2.guard(req, res, '/user/delete', () => {
                        const userService = new UserService()
                        userService.create(user).then((data) => {
                            res.status(data.getSubCode()).send(data)
                        })
                    })
                } catch (error) {
                    res.status(CommonCode.UNKNOWN).send(error)
                }
            }
        )
    }
}
