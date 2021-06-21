export enum SkEvent {
    START_GAME = 'start_game',
    DIRECTION = 'direction',
    PAUSING = 'pausing',
    NEW_GAME = 'new_game',
    ALL_GAME = 'all_game',
    JOIN_QUEUE = 'join_queue',
    MATCH_USER = 'match_user',
    LEAVE_QUEUE = 'leave_queue',
    UPDATE_ROOM = 'update_room',
    QUERY_ROOM = 'query_room',
    END_GAME = 'end_game',
    CREATE_NEW_GAME = 'create_new_game',
    RESET_GAME = 'reset_game',
    SHOT_GALAX = 'SHOT',
}

export enum SkType {
    SOCKET = 'socket',
    BROAD_CAST = 'broad_bast',
    IO = 'io',
}
