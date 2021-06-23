import { PromiseRepository } from '../../interfaces'

export default abstract class BaseService {
    public abstract create<T>(...args: any[]): PromiseRepository<T, any>
    public abstract delete<T>(...args: any[]): PromiseRepository<T, any>
    public abstract update<T>(...args: any[]): PromiseRepository<T, any>
    public abstract get<T>(): PromiseRepository<T>
    public abstract getList<T>(...args: any[]): PromiseRepository<T, any>
    public abstract deleteMany<T>(...args: any[]): PromiseRepository<T, any>
}
