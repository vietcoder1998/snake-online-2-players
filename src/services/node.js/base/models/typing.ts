import { SkRes } from './response'
export type Next = (...args: any[]) => any | void
export type NextEmit<T = any> = (data: SkRes<T>, to: string | string[]) => any
export interface Vector {
    x: number
    y: number
}

export interface MoveRange {
    w: number
    h: number
}