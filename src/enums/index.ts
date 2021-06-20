export enum GameType {
    SNAKE = 'snake',
    GALAXY = 'galaxy',
}

export enum Direction {
    RIGHT = 'right',
    LEFT = 'left',
    UP = 'up',
    DOWN = 'down',
    SHOT = 'shot',
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
export class SkRes<T = any> {
    private code: SkCode
    private data: T
    private msg: string

    constructor(code?: SkCode, data?: T, msg?: string) {
        this.code = code || SkCode.UNKNOWN
        this.data = data || null
        this.msg = msg || SkMsg.UNKNOWN
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

    setCode(code: SkCode) {
        this.code = code
    }

    setMsg(msg: string) {
        this.msg = msg
    }

    setData(data: any) {
        this.data = data
    }
}
