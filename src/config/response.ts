import { CommonMessage } from './../enums/message.enum'
import { CODE, MSG } from './const'

export class ErrorException {
    private code = 500
    private data: any
    private msg = MSG.ERROR

    constructor(data?: any, code?: number, msg?: string) {
        this.code = code || CODE.ERR
        this.data = data || MSG.UNKNOWN
        this.msg = msg || MSG.UNKNOWN
    }

    public getCode(): number {
        return this.code
    }

    public getData(): any {
        return this.data
    }

    public getMsg(): string {
        return this.msg
    }

    public getSubCode(): number {
        const code = this.code.toString()
        const errorCode = code.substr(0, 3)
        return parseInt(errorCode)
    }
}

export class ResponseData {
    private code = 200
    private msg = MSG.SUCCESS
    private data?: any
    private pi = 0
    private ps = 0
    private total = 0

    constructor(
        data?: any,
        code?: number,
        msg?: string,
        pi?: number,
        ps?: number,
        total?: number
    ) {
        this.data = data
        this.code = code || 200
        this.msg = msg || CommonMessage.SUCCESS
        this.pi = pi || 0
        this.ps = ps || 0
        this.total = total || 0
    }

    public getCode(): number {
        return this.code
    }

    public getData(): any {
        return this.data
    }

    public getMsg(): string {
        return this.msg
    }

    public getSubCode(): number {
        if (this.code) {
            const code = this.code.toString()
            const errorCode = code.substr(0, 3)
            return parseInt(errorCode)
        }

        return this.code
    }

    public setData(data: any): void {
        this.data = data
    }
}

export class EgoResponse<T> {
    status: number
    error_code: number
    message: string
    data: T;
    [key: string]: any

    constructor(status: number, error_code: number, message: string, data: T) {
        this.status = status
        this.error_code = error_code
        this.message = message
        this.data = data
    }
}
