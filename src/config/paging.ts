import { QueryQuantityOption, ReqQr } from '../interfaces'

export class Paging {
    private pageIndex?: ReqQr
    private pageSize?: ReqQr
    private count = 0

    constructor(pageIndex?: ReqQr, pageSize?: ReqQr) {
        this.pageIndex = pageIndex
        this.pageSize = pageSize
    }

    public setPageIndex = (pageIndex: ReqQr): void => {
        this.pageIndex = pageIndex
    }

    public setPageSize = (pageSize: ReqQr): void => {
        this.pageSize = pageSize
    }

    public getPiPS(): unknown {
        const pageIndex = this.pageIndex
        const pageSize = this.pageSize
        return {
            pageIndex,
            pageSize,
        }
    }

    public getTakeSkip(): QueryQuantityOption {
        const take =
            this.pageSize && typeof this.pageSize === 'string'
                ? parseInt(this.pageSize)
                : 0
        const skip =
            this.pageIndex && typeof this.pageIndex === 'string'
                ? parseInt(this.pageIndex) * take
                : 0
        const pi =
            this.pageIndex && typeof this.pageIndex === 'string'
                ? parseInt(this.pageIndex)
                : 0
        const ps =
            this.pageIndex && typeof this.pageIndex === 'string'
                ? parseInt(this.pageIndex)
                : 0
        const count = this.count
        return {
            skip,
            take,
            pi,
            ps,
            count,
        }
    }

    public getPageIndex(): ReqQr | undefined {
        return this.pageIndex
    }

    public getPageSize(): ReqQr | undefined {
        return this.pageSize
    }
}
