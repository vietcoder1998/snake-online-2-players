import { SkRes } from './../enums/index'
export type Next = (...args: any[]) => any | void
export type NextEmit<T> = (data: SkRes<T>, to: string | string[]) => any
