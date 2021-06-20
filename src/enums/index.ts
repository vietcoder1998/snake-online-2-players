export enum GameType {
    SNAKE = 'snake'
}


export enum Direction{
    RIGHT = 'right',
    LEFT ='left',
    UP = 'up',
    DOWN = 'down'
}

export enum SkCode {
    UNKNOWN = 500,
    NOT_FOUND = 404,
    SUCCESS = 200,
}

export enum SkMsg {
    UNKNOWN = 'no data',
    NOT_FOUND = 'not found ',
    SUCCESS = 'success',
}
export class SocketRes<T> {
    private code: SkCode
    private data: T
    private msg: string

    constructor(code: SkCode, data: T, msg: string) {
        this.code = code
        this.data = data
        this.msg = msg
    }

    getCode(): SkCode {
        return this.code
    }

    getData(): T {
        return this.data
    }

    getMsg(): string {
        return this.msg
    }
}
