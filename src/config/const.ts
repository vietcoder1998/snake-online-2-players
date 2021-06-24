const CODE = {
    TOKEN: {
        INVALID: 40400,
        EXPIRED: 40401,
    },
    USER: {
        NOT_FOUND: 40410,
        cONFLICT: 40911,
        NO_ID: 40412,
        RQ_BODY_FAIL: 40413,
    },
    ROOM: {
        NOT_FOUND: 40421,
        cONFLICT: 40922,
        NO_ID: 40423,
        RQ_BODY_FAIL: 40424,
        FULL: 40425,
        IN_ROOM: 40426,
        OUT_ROOM: 40427,
    },
    ONLINE_PLAYER: {
        NOT_FOUND: 40431,
        cONFLICT: 40932,
        NO_ID: 40433,
        RQ_BODY_FAIL: 40434,
    },
    LIST_PRODUCT: {
        NOT_FOUND: 4042,
    },
    PRODUCT: {
        NOT_FOUND: 4043,
    },
    PRODUCT_TYPE: {
        NOT_FOUND: 4044,
        DATA_REQUIREMENT: 4045,
    },

    SUCCESS: 200,
    NOT_FOUND: 404,
    CONFLICT: 409,
    ERR: 500,
}

const MSG = {
    USER: {
        NOT_FOUND: 'User was not founded',
        CONFLICT: 'User was existed',
        NO_NAME: 'Username was not founded',
        NO_ID: 'UserId is requirement',
        RQ_BODY_FAIL: 'User`s body is invalid',
        DATA_REQUIREMENT: 'Data is requirement',
        PASS_TOO_SHORT: 'Password is too short',
        FULL_NAME_REQUIREMENT: 'Full Name is requirement',
        DESCRIPTION_REQUIREMENT: 'Description is requirement',
    },
    SERVER: {
        NOT_FOUND: 'Server is not existed',
        CONFLICT: 'User is existed',
        NO_ID: 'ServerId is requirement',
        RQ_BODY_FAIL: 'Server`s body is requirement',
    },
    FRIEND_REQUEST: {
        SENDER_REQUIREMENT: 'Sender Id is invalid',
        RECEIVER_REQUIREMENT: 'Receiver Id is invalid',
        CONFLICT: 'Friend request was sended',
        RQ_BODY_FAIL: 'Friend Request body is invalid',
    },
    PRODUCT: {
        NOT_FOUND: 'Product is not founded',
        SUCCESS: 'Success ',
        DATA_REQUIREMENT: 'Data is requirement',
    },
    ROOM: {
        NO_NAME: 'Room`s name is requirement',
        NO_ID: 'Id is requirement',
        CONFLICT: 'Room was existed',
        NOT_FOUND: 'Room was not founded',
        SUCCESS: 'Room creating is successfully',
        DATA_REQUIREMENT: 'Room data is requirement',
        RQ_BODY_FAIL: 'Room body is invalid',
        FULL: 'Room is full',
        IN_ROOM: 'Already in room',
        OUT_ROOM: 'Not join any room',
    },
    PRODUCT_TYPE: {
        NOT_FOUND: 'Product Type was not founded',
        DATA_REQUIREMENT: 'Room data is requirement',
    },
    SUCCESS: 'success',
    ERROR: 'Failure',
    NOT_FOUND: 'Not found',
    REQUEST_BODY_ERR: 'Body is invalid',
    UNKNOWN: 'Unknown',
    TOKEN_INVALID: 'Token is invalid',
    BODY_IS_NEEDED: 'Body is needed',
    ID_IS_NEEDED: 'Id is need',
    DATA_IS_NOT_EXISTED: 'Data is not existed',
    CONFLICT: 'Data is conflict',
}

const MANAGER = {
    SQL: 'default',
    MONGO: 'mongo',
}

const API_VERSION = {
    V1: 'v1',
    V2: 'v2',
}

const ROUTER = {
    AUTH: 'oauth2',
    USER: 'user',
    PROFILE: 'profile',
}

const PATHS = {
    LIST: '/list',
    CREATE: '/create',
    DELETE: '/delete',
    AUTH: {
        LOGIN: '/login',
        REGISTER: '/register',
        LOGOUT: '/logout',
    }
}

const TAGS = {
    USER: 'user',
    AUTH: 'oauth2',
    ONLINE_PLAYER: 'online-player',
    FRIEND_REQUEST: 'friend',
    RANK: 'rank',
    PAYMENT: 'payment',
    GAME: 'game',
}

const ENTITIES = {
    USER: 'users',
    PROFILE: 'profiles',
    ONLINE_PLAYER: 'online_players',
    MESSAGES: 'messages',
    ROOMS: 'rooms',
    CHAT_USERS: 'chat_users'
}

const EGO_API = 'http://id.8am.us'

export { CODE, MSG, MANAGER, API_VERSION, TAGS, EGO_API, ROUTER, PATHS, ENTITIES }
