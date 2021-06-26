import { NextFunction } from 'express'
import * as jwtk from 'jsonwebtoken'
import { ErrorException } from '../config/response'
import { CommonCode, TokenErrorCode } from '../enums/code.enum'
import { CommonErrorMessage, CommonMessage } from '../enums/message.enum'
import { Req, Res } from '../interfaces'
import Oauth2Service from '../services/oauth2.services'

export default class Oauth2 {
    generateToken(
        username: string,
        password: string,
        id: number,
        roleId: number,
        type?: number
    ): string {
        const time = new Date().getTime().toString()
        const token = jwtk.sign(
            { username, password, id, time, roleId, type },
            process.env.SECRET
        )
        return token
    }

    async guard(
        req: Req,
        res: Res,
        path: string,
        next: NextFunction
    ): Promise<any> {
        try {
            const token = req.headers['token']
            const data = new ErrorException(
                CommonErrorMessage.TOKEN_INVALID,
                TokenErrorCode.INVALID,
                CommonMessage.TOKEN_INVALID
            )

            if (!token) {
                res.status(data.getSubCode()).send(data)
            } else {
                const decoded = await jwtk.verify(
                    String(token),
                    process.env.SECRET
                )

                console.log(decoded)

                const oauth2Service = new Oauth2Service()
                oauth2Service
                    //@ts-ignore
                    .validateToken(decoded.id, token)
                    .then((data) => {
                        if (!(data.getSubCode() === CommonCode.SUCCESS)) {
                            res.status(data.getSubCode()).send(data)
                        } else {
                            oauth2Service
                                //@ts-ignore
                                .validateRole(path, decoded.roleId)
                                .then((data) => {
                                    if (
                                        !(
                                            data.getSubCode() ===
                                            CommonCode.SUCCESS
                                        )
                                    ) {
                                        res.status(data.getSubCode()).send(data)
                                    } else next()
                                })
                        }
                    })
            }
        } catch (err) {
            res.status(CommonCode.UNKNOWN).send(new ErrorException(err))
        }
    }
}
