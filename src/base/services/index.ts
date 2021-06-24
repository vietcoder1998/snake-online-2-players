import { PromiseRepository } from '../../interfaces'

export default abstract class BaseService {
    public abstract create<T>(...args: any[]): PromiseRepository
    public abstract delete<T>(...args: any[]): PromiseRepository
    public abstract get<T>(): PromiseRepository
    public abstract getList<T>(...args: any[]): PromiseRepository
    public abstract deleteMany<T>(...args: any[]): PromiseRepository
}
