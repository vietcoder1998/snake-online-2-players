import { NextFunction } from 'express'
import { Req, Res } from '../../interfaces'

export default class Oauth2 {

    generateToken(): void {
        
    }

    guard(req: Req, res: Res, next: NextFunction): void {
        const token = req.headers['token']
        
    }
}
