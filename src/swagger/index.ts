import * as swaggerJSDoc from 'swagger-jsdoc'
import { TAGS } from '../config/const'

// object for swagger

const specsOptions: swaggerJSDoc.Options = {
    swaggerDefinition: {
        info: {
            title: 'Tetris api service',
            description: 'Game api for ego',
            contact: {
                name: 'Tran Duy Viet',
                email: 'duyviet2841998@gmail.com',
            },
            version: '2.0.0',
        },
        title: 'User',
        tags: [
            { name: TAGS.USER, description: 'Everything about user' },
            { name: TAGS.AUTH, description: 'Setup Token and auth' },
            { name: TAGS.ONLINE_PLAYER, description: 'All of online user' },
        ],
        schemes: ['http', 'https'],
        basePath: '/v1',
        securityDefinitions: {
            token: {
                type: 'apiKey',
                name: 'token',
                in: 'header',
            },
        },
        produces: ['applications/json'],
        paths: {
            // photo api
            '/profile/{userId}': {
                get: {
                    tags: ['profile'],
                    description: 'Get profile of user',
                    parameters: [
                        {
                            name: 'userId',
                            description: 'id`s user that will take profile',
                            require: true,
                            in: 'path',
                            type: 'string',
                        },
                    ],
                    responses: {
                        200: {
                            description: 'success',
                        },
                        404: {
                            description: 'not found',
                        },
                    },
                },
            },
            '/profile/{userId}/avatar': {
                put: {
                    tags: ['profile'],
                    description: 'Update profile of user',
                    consumes: ['multipart/form-data'],
                    parameters: [
                        {
                            name: 'avatarFile',
                            description: '.png, .jpg, .jpeg',
                            require: true,
                            in: 'formData',
                            type: 'file',
                        },
                        {
                            name: 'userId',
                            description: 'id`s user ',
                            require: true,
                            in: 'path',
                            type: 'string',
                        },
                    ],
                    responses: {
                        200: {
                            description: 'success',
                        },
                        404: {
                            description: 'not found',
                        },
                    },
                },
            },
            '/profile/{userId}/update': {
                put: {
                    tags: ['profile'],
                    description: 'Update profile of user',
                    parameters: [
                        {
                            name: 'body',
                            description: '.png, .jpg, .jpeg',
                            require: true,
                            default: {
                                name: '',
                                birthday: '',
                            },
                            in: 'body',
                        },
                        {
                            name: 'userId',
                            description: 'id`s user ',
                            require: true,
                            in: 'path',
                            type: 'string',
                        },
                    ],
                    responses: {
                        200: {
                            description: 'success',
                        },
                        404: {
                            description: 'not found',
                        },
                    },
                },
            },
            '/profile/{userId}/cover': {
                put: {
                    tags: ['profile'],
                    description: 'Update profile of user',
                    consumes: ['multipart/form-data'],
                    parameters: [
                        {
                            name: 'coverFile',
                            description: '.png, .jpg, .jpeg',
                            require: true,
                            in: 'formData',
                            type: 'file',
                        },
                        {
                            name: 'userId',
                            description: 'id`s user ',
                            require: true,
                            in: 'path',
                            type: 'string',
                        },
                    ],
                    responses: {
                        200: {
                            description: 'success',
                        },
                        404: {
                            description: 'not found',
                        },
                    },
                },
            },
            // User API
            '/upload': {
                post: {
                    tags: ['photo'],
                    description: 'Get list user',
                    consumes: ['multipart/form-data'],
                    parameters: [
                        {
                            name: 'file',
                            description: 'upload image and save in server',
                            require: false,
                            in: 'formData',
                            type: 'file',
                        },
                    ],
                    responses: {
                        200: {
                            description: 'success',
                        },
                        404: {
                            description: 'not found',
                        },
                    },
                },
            },
            '/user/list': {
                get: {
                    tags: [TAGS.USER],
                    description: 'Get list user',
                    security: [
                        {
                            token: 'token',
                        },
                    ],
                    parameters: [
                        {
                            name: 'page',
                            description: 'index of user',
                            in: 'query',
                            require: false,
                            schema: {
                                type: 'integer',
                                minimum: 0,
                            },
                        },
                        {
                            name: 'size',
                            description: 'size of user',
                            require: false,
                            in: 'query',
                            schema: {
                                type: 'integer',
                                minimum: 0,
                            },
                        },
                    ],
                    responses: {
                        200: {
                            description: 'success',
                        },
                        404: {
                            description: 'not found',
                        },
                    },
                },
            },
            '/user/{id}': {
                get: {
                    tags: [TAGS.USER],
                    description: 'simpler init',
                    security: [
                        {
                            token: 'token',
                        },
                    ],
                    parameters: [
                        {
                            name: 'id',
                            required: true,
                            description: 'id of user',
                            in: 'path',
                        },
                    ],
                    responses: {
                        200: {
                            description: 'success',
                        },
                    },
                },
                delete: {
                    tags: [TAGS.USER],
                    description: 'remove user',
                    security: [
                        {
                            token: 'token',
                        },
                    ],
                    parameters: [
                        {
                            name: 'id',
                            required: true,
                            description: 'id of user',
                            in: 'path',
                        },
                    ],
                    responses: {
                        200: {
                            description: 'success',
                        },
                        404: {
                            description: 'user is existed',
                        },
                    },
                },
            },
            '/user/create': {
                post: {
                    tags: [TAGS.USER],
                    description: 'create user',
                    security: [
                        {
                            token: 'token',
                        },
                    ],
                    parameters: [
                        {
                            name: 'body',
                            required: true,
                            description: 'id of user',
                            example: {
                                username: `user${Math.floor(
                                    Math.random() * 100
                                )}`,
                                password: `qw123#.`,
                            },
                            in: 'body',
                        },
                    ],
                    responses: {
                        200: {
                            description: 'success',
                        },
                        404: {
                            description: 'user is existed',
                        },
                    },
                },
            },
            // AUTH API
            '/auth/login': {
                post: {
                    tags: [TAGS.AUTH],
                    description: 'Login',
                    security: [
                        {
                            token: 'token',
                        },
                    ],
                    parameters: [
                        {
                            example: {
                                username: 'user1',
                                password: 'qw123#.',
                            },
                            in: 'body',
                            name: 'body',
                        },
                    ],
                    responses: {
                        200: {
                            description: 'success',
                        },
                        404: {
                            description: 'not found',
                        },
                    },
                },
            },
            '/auth/register': {
                post: {
                    tags: [TAGS.AUTH],
                    description: 'Register',
                    parameters: [
                        {
                            description: '1 User only 1 account',
                            name: 'body',
                            in: 'body',
                            example: {
                                username: 'user1',
                                password: 'qw123#.',
                            },
                        },
                    ],
                    responses: {
                        200: {
                            description: 'success',
                        },
                        404: {
                            description: 'not found',
                        },
                    },
                },
            },
            //Online User Api
            '/online-player/{user_id}': {
                get: {
                    tags: [TAGS.ONLINE_PLAYER],
                    description: 'get user info from ego',
                    security: [
                        {
                            token: 'token',
                        },
                    ],
                    parameters: [
                        {
                            name: 'user_id',
                            description: 'id of user',
                            required: true,
                            in: 'path',
                            default: '1619458881785',
                            schema: {
                                type: 'string',
                            },
                        },
                    ],
                },
            },
            '/friend/list': {
                get: {
                    tags: [TAGS.FRIEND_REQUEST],
                    description: 'Get user friend request',
                    parameters: [
                        {
                            name: 'paged',
                            in: 'query',
                            default: 0,
                        },
                        {
                            name: 'limit',
                            in: 'query',
                            default: 10,
                        },
                    ],
                    security: [
                        {
                            token: 'token',
                        },
                    ],
                    responses: {
                        200: {
                            description: 'success',
                        },
                        404: {
                            description: 'not found',
                        },
                    },
                },
            },
            '/friend/send': {
                post: {
                    tags: [TAGS.FRIEND_REQUEST],
                    description: 'Send friend request',
                    parameters: [
                        {
                            name: 'friendId',
                            in: 'query',
                            default: null,
                        },
                    ],
                    security: [
                        {
                            token: 'token',
                        },
                    ],
                    responses: {
                        200: {
                            description: 'success',
                        },
                        404: {
                            description: 'not found',
                        },
                    },
                },
            },
            '/rank/list': {
                get: {
                    tags: [TAGS.RANK],
                    description: 'Get user friend request',
                    parameters: [
                        {
                            name: 'userId',
                            in: 'query',
                            default: 0,
                        },
                        {
                            name: 'paged',
                            in: 'query',
                            default: 0,
                        },
                        {
                            name: 'limit',
                            in: 'query',
                            default: 10,
                        },
                    ],
                    security: [
                        {
                            token: 'token',
                        },
                    ],
                    responses: {
                        200: {
                            description: 'success',
                        },
                        404: {
                            description: 'not found',
                        },
                    },
                },
            },
            '/rank/update': {
                post: {
                    tags: [TAGS.RANK],
                    description: 'Update ranking',
                    parameters: [
                        {
                            name: 'point',
                            in: 'query',
                            default: 0,
                        },
                    ],
                    security: [
                        {
                            token: 'token',
                        },
                    ],
                    responses: {
                        200: {
                            description: 'success',
                        },
                        404: {
                            description: 'not found',
                        },
                    },
                },
            },
            '/payment/update': {
                post: {
                    tags: [TAGS.PAYMENT],
                    description: 'Update ranking',
                    parameters: [
                        {
                            name: 'room_id',
                            in: 'query',
                            default: 1,
                        },
                        {
                            name: 'type',
                            in: 'query',
                            default: 'add',
                        },
                        {
                            name: 'money',
                            in: 'query',
                            default: 20,
                        },
                    ],
                    security: [
                        {
                            token: 'token',
                        },
                    ],
                    responses: {
                        200: {
                            description: 'success',
                        },
                        404: {
                            description: 'not found',
                        },
                    },
                },
            },
            '/game/save': {
                put: {
                    tags: [TAGS.GAME],
                    description: 'Save game history',
                    parameters: [
                        {
                            name: 'roomId',
                            in: 'query',
                            default: 1,
                        },
                        {
                            name: 'type',
                            in: 'query',
                            default: 1,
                        },
                        {
                            name: 'money',
                            in: 'query',
                            default: 20,
                        },
                        {
                            name: 'score',
                            in: 'query',
                            default: 20,
                        },
                        {
                            name: 'level',
                            in: 'query',
                            default: 1,
                        },
                        {
                            name: 'mode',
                            in: 'query',
                            default: 20,
                        },
                        {
                            name: 'type',
                            in: 'query',
                            default: 20,
                        },
                        {
                            name: 'isWin',
                            in: 'query',
                            default: 1,
                        },
                    ],
                    security: [
                        {
                            token: 'token',
                        },
                    ],
                    responses: {
                        200: {
                            description: 'success',
                        },
                        404: {
                            description: 'not found',
                        },
                    },
                },
            },
        },
    },
    apis: ['/v1', '/v2'],
}

const specs = swaggerJSDoc(specsOptions)

export default specs
