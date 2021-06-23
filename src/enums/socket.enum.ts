export enum SocketEvent {
    CREATE_ROOM = 'create_room',
    DELETE_ROOM = 'delete_room',
    CREATE_MESSAGE = 'create_message',
    JOIN_ROOM = 'join_room',
    QUERY_ROOM = 'query_room',
    FIND_ROOM = 'find_room',
    UPDATE_ROOM = 'update_room',
    REMOVE_ROOM = 'remove_room',
    OUT_ROOM = 'out_room',
    CHANGE_MSG_STATE = 'change_msg_state',
    LOGIN = 'login',
    CREATE_GAME = 'create_game',
}

export enum SocketGameMsg {
    PAUSE = 'pause',
    MOVE_LEFT = 'move_left',
    MOVE_RIGHT = 'move_right',
    SPEED_UP = 'speed_up',
    STOP = 'stop',
    UPDATE_GAME = 'update_game',
    DIRECTION = 'direction',
    CREATE_GAME = 'create_game'
}

export enum SocketEmit {
    DELETE_ROOM = 'delete_room',
    JOIN_ROOM = 'join_room',
    CREATE_ROOM = 'create_room',
    CREATE_MESSAGE = 'create_message',
    RECEIVE_ROOM = 'receive_room',
    QUERY_ROOM = 'query_room',
    FIND_ROOM = 'find_room',
    REMOVE_ROOM = 'remove_room',
    UPDATE_ROOM = 'update_room',
    OUT_ROOM = 'out_room',
    CHANGE_MSG_STATE = 'change_msg_state',
    CREATE_GAME = 'create_game'
}