
export default class Interval {
    time = 1000
    runtime: any
    lastFunction: () => void

    constructor(time: number) {
        if (time) {
            this.time = time
        } else {
            this.time = 2000
        }
    }

    setTime(time: number) {
        this.time = time
    }

    execRuntime(next: (...args: any[])=> void, time?: number) {
        this.lastFunction = next
        this.runtime = setInterval(() => {
            if (!next && !this.lastFunction) {
                throw new Error('none action in interval')
            }
            if (!next) {
                this.lastFunction()
            } else
            next()
        }, time || this.time);
    }

    clearRuntime(next?: () => void) {
        clearInterval(this.runtime)
        if (next) {
            next()
        }
    }

    resetInterval(next: () => void) {
        this.clearRuntime(() => next())
    }
}