// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
import { Request, Response } from 'express-serve-static-core'
import * as QueryString from 'qs'
import { MongoConnectionOptions } from 'typeorm/driver/mongodb/MongoConnectionOptions'
import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions'
import { ErrorException, ResponseData } from '../config/response'

type ReqQr =
    | string
    | QueryString.ParsedQs
    | string[]
    | QueryString.ParsedQs[]
    | undefined
type Req = Request
type Res = Response
type MySqlConnection = MysqlConnectionOptions
type MongoConnection = MongoConnectionOptions
type ErrRq = ErrorException

type PromiseRepository = Promise<ResponseData | ErrorException>

interface QueryQuantityOption {
    skip?: number
    take?: number
    pi?: number
    ps?: number
    count: number
}

interface DataList<T> extends QueryQuantityOption {
    items: T[] | T | undefined
}

interface UnknownObject {
    [key: string]: unknown
}
export type {
    ReqQr,
    Req,
    Res,
    MongoConnection,
    MySqlConnection,
    QueryQuantityOption,
    ErrRq,
    PromiseRepository,
    DataList,
    UnknownObject,
}
