export enum TokenErrorCode {
    INVALID = 40400,
    EXPIRED = 40401,
}

export enum OnlineUserErrorCode {
    INVALID = 40400,
    EXPIRED = 40401,
}
export enum UserErrorCode {
    NOT_FOUND = 40431,
    CONFLICT = 40932,
    NO_ID = 40433,
    RQ_BODY_FAIL = 40434,
}
export enum RoomErrorCode {
    NOT_FOUND = 40421,
    CONFLICT = 40922,
    NO_ID = 40423,
    RQ_BODY_FAIL = 40424,
    FULL = 40425,
    IN_ROOM = 40426,
    OUT_ROOM = 40427,
}
export enum CommonCode {
    SUCCESS = 200,
    NOT_FOUND = 404,
    CONFLICT = 409,
    ERR = 500,
}