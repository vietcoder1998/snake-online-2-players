
module.exports = class Interval {
    time = 1000
    runtime
    lastFunction

    constructor(time) {
        if (time) {
            this.time = time
        } else {
            this.time = 2000
        }    

    }

    setTime(time) {
        this.time = time
    }

    execRuntime(next) {
        this.lastFunction = next
        this.runtime = setInterval(() => {
            if (!next && !this.lastFunction) {
                throw new Error('none action in interval')
            }
            if (!next) {
                this.lastFunction()
            } else
            next()
        }, this.time);
    }
    
    clearRuntime(next) {
        clearInterval(this.runtime)
        if (next) {
            next()
        }
    }

    resetInterval(next) {
        this.clearRuntime(() => next())
    }
}