import { getRepository } from 'typeorm'
import BaseService from '../base/services'
import { ErrorException, ResponseData } from '../config/response'
import UserEntity from '../entities/user.entity'
import { CommonCode } from '../enums/code.enum'
import { UserErrorMessage } from '../enums/message.enum'
import { PromiseRepository } from '../interfaces'
import User from '../models/user.model'

export default class UserService extends BaseService {
    public async get(userId?: string): PromiseRepository {
        try {
            const userRespository = getRepository(UserEntity)
            const res = await userRespository.findOne(userId)

            if (!res) {
                return new ErrorException(
                    UserErrorMessage.NOT_FOUND,
                    CommonCode.NOT_FOUND
                )
            }

            if (!userId) {
                return new ErrorException(
                    UserErrorMessage.NO_ID,
                    CommonCode.NOT_FOUND
                )
            }

            return new ResponseData(res)
        } catch (err) {
            return new ErrorException(err)
        }
    }

    public async create(user: User): PromiseRepository {
        try {
            const userRepository = getRepository(UserEntity)
            const userEntity = new UserEntity(
                null,
                user.username,
                user.password,
                user.email,
                user.token
            )
            const res = await userRepository.save(userEntity)
            return new ResponseData(res)
        } catch (error) {
            return new ErrorException(error)
        }
    }

    public async update(userId?: string, user?: User): PromiseRepository {
        try {
            const userRepository = getRepository(UserEntity)
            let userEntity = await userRepository.findOne(userId)

            if (userEntity) {
                userEntity = { ...userEntity, ...user }
            }

            const res = await userRepository.update(userId, userEntity)
            return new ResponseData(res)
        } catch (error) {
            return new ErrorException(error)
        }
    }

    public async delete(userId?: string) {
        try {
            const res = await getRepository(UserEntity).delete(userId)
            return new ErrorException(res)
        } catch (error) {
            return new ErrorException(error)
        }
    }

    public async getList(page?: number, count?: number) {
        try {
            const res = await getRepository(UserEntity).findAndCount({
                skip: page,
                take: count,
            })
            return new ErrorException(resizeBy)
        } catch (error) {
            return new ErrorException(error)
        }
    }

    public async deleteMany(userIds?: string[]) {
        try {
            const res = await getRepository(UserEntity).delete(userIds)
            return new ErrorException(res)
        } catch (error) {
            return new ErrorException(error)
        }
    }
}
