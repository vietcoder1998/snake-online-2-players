import { getConnection, getRepository } from 'typeorm'
import Oauth2 from '../oauth2'
import { ErrorException, ResponseData } from '../config/response'
import UserEntity from '../entities/user.entity'
import { CommonCode, TokenErrorCode, UserErrorCode } from '../enums/code.enum'
import * as jwt from 'jsonwebtoken'
import {
    CommonErrorMessage,
    CommonMessage,
    UserErrorMessage,
} from '../enums/message.enum'
import { PromiseRepository } from '../interfaces'
import RoleEntity from '../entities/role.entity'
import ApiEntity from '../entities/api.entity'

export default class Oauth2Service {
    oauth2: Oauth2 = new Oauth2()
    async logout(userId: number, token: string): PromiseRepository {
        try {
            if (!userId) {
                return new ErrorException(
                    CommonErrorMessage.NOT_FOUND,
                    UserErrorCode.NOT_FOUND,
                    UserErrorMessage.NO_ID
                )
            }

            if (!token) {
                return new ErrorException(
                    CommonErrorMessage.TOKEN_INVALID,
                    TokenErrorCode.INVALID,
                    CommonErrorMessage.TOKEN_INVALID
                )
            }

            const userRepo = getRepository(UserEntity)
            const userEntity = await userRepo.findOne(userId)

            const validateToken = await jwt.verify(token, process.env.SECRET)
            if (validateToken) {
                userEntity.token = this.oauth2.generateToken(
                    userEntity.username,
                    userEntity.password,
                    userId,
                    userEntity.roleId
                )

                const data = userRepo.save(userEntity)

                return new ResponseData(CommonMessage.SUCCESS)
            } else return new ErrorException(CommonErrorMessage.TOKEN_INVALID)
        } catch (error) {
            return new ErrorException(error)
        }
    }

    async login(username: string, password: string) {
        try {
            if (!username || !password) {
                return new ErrorException(
                    CommonCode.NOT_FOUND,
                    UserErrorCode.NOT_FOUND,
                    UserErrorMessage.LOGIN_ERROR
                )
            }

            const userRepo = getRepository(UserEntity)
            const userEntity = await userRepo.findOne({
                where: { username },
                relations: ['role', 'profile'],
            })

            console.log(userEntity)

            if (!userEntity) {
                return new ErrorException(
                    UserErrorMessage.NOT_FOUND,
                    CommonCode.NOT_FOUND,
                    CommonMessage.NOT_FOUND
                )
            } else {
                if (userEntity.password === password) {
                    const token = this.oauth2
                        .generateToken(
                            userEntity.username,
                            userEntity.password,
                            userEntity.id,
                            userEntity.role.id
                        )
                        .toString()

                    userEntity.token = token
                    const res = await userRepo.save(userEntity)
                    const { ban, active, id } = res

                    return new ResponseData({
                        token,
                        ban,
                        active,
                        id,
                        ...res.profile,
                    })
                } else {
                    return new ErrorException(
                        UserErrorMessage.LOGIN_ERROR,
                        UserErrorCode.NOT_FOUND,
                        CommonErrorMessage.NOT_FOUND
                    )
                }
            }
        } catch (error) {
            return new ErrorException(error)
        }
    }

    async register(username?: string, password?: string) {
        try {
            if (!username || !password) {
                return new ErrorException(
                    CommonErrorMessage.NOT_FOUND,
                    UserErrorCode.NOT_FOUND,
                    UserErrorMessage.DATA_REQUIREMENT
                )
            }

            const userRepo = getRepository(UserEntity)
            const userEntity = await userRepo.findOne({
                username,
            })

            if (userEntity) {
                return new ErrorException(
                    UserErrorMessage.CONFLICT,
                    CommonCode.CONFLICT,
                    CommonMessage.CONFLICT
                )
            } else {
                const newUser = new UserEntity()
                newUser.username = username
                newUser.password = password
                newUser.createdDate = new Date().getTime()
                const res = userRepo.insert(newUser)
                return new ResponseData(res)
            }
        } catch (error) {
            return new ErrorException(error)
        }
    }

    async validateToken(id: number, token: string) {
        try {
            if (!id || !token) {
                return new ErrorException(
                    CommonCode.NOT_FOUND,
                    UserErrorCode.NOT_FOUND,
                    CommonErrorMessage.TOKEN_INVALID
                )
            }
            const userRepo = getRepository(UserEntity)
            const userEntity = await userRepo.findOne(id)
            if (token === userEntity.token) {
                return new ResponseData(userEntity)
            }
            return new ErrorException(
                TokenErrorCode.INVALID,
                CommonCode.NOT_FOUND,
                CommonErrorMessage.TOKEN_INVALID
            )
        } catch (error) {
            return new ErrorException(error)
        }
    }

    async validateRole(path: string, roleId?: number) {
        console.log(
            '🚀 ~ file: oauth2.services.ts ~ line 192 ~ Oauth2Service ~ validateRole ~ roleId',
            roleId
        )
        console.log(
            '🚀 ~ file: oauth2.services.ts ~ line 192 ~ Oauth2Service ~ validateRole ~ path',
            path
        )
        try {
            const apiRepo = getRepository(ApiEntity)
            const apiEntity = await apiRepo.findOne({
                where: { path },
                relations: ['roles'],
            })

            if (apiEntity) {
                const listId = apiEntity.roles.map((role) => role.id)
                if (listId.includes(roleId)) {
                    return new ResponseData(CommonMessage.SUCCESS)
                }
            }

            return new ErrorException('Role is failure', CommonCode.UNKNOWN)
        } catch (error) {
            return new ErrorException(error)
        }
    }
}
