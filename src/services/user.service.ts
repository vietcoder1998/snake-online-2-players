import { getRepository } from 'typeorm'
import BaseService from '../base/services'
import { ErrorException, ResponseData } from '../config/response'
import ProfileEntity from '../entities/profile.entity'
import UserEntity from '../entities/user.entity'
import { CommonCode, UserErrorCode } from '../enums/code.enum'
import { CommonErrorMessage, UserErrorMessage } from '../enums/message.enum'
import { PromiseRepository } from '../interfaces'
import Profile from '../models/profile.model'
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
            const profileRepo = getRepository(ProfileEntity)
            const exUser = await userRepository.findOne({
                username: user.username,
            })
            if (exUser) {
                return new ErrorException(
                    UserErrorMessage.CONFLICT,
                    CommonCode.CONFLICT,
                    CommonErrorMessage.CONFLICT
                )
            } else {
                const userEntity = new UserEntity(
                    null,
                    user.username,
                    user.password,
                    user.email,
                    1
                )

                const profile = new Profile(user.username, 0, "_", "_", new Date().getTime())
                const res0 = await profileRepo.save(profile)

                userEntity.profile = res0
                const res = await userRepository.save(userEntity)
                return new ResponseData(res)
            }
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

    public async getList(page?: number, size?: number): PromiseRepository {
        try {
            const res = await getRepository(UserEntity).findAndCount({
                skip: page || 0,
                take: size || 0,
            })

            return new ResponseData(res[0], page, size, res[1])
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
