class Ship {
    position = {
        x: 0*s,
        y: h*s/2
    }
    size = 40
    bullets = []

    shooting() {
        this.bullets.push(new Bullet({
            x: this.position.x + this.size,
            y: this.position.y + this.size/2,
        }))
    }

    moving(vector){
        this.position.x += vector.x
        this.position.y += vector.y   
    }
}

class Star {
    position = {
        x: Math.floor(Math.random*w*s),
        y: Math.floor(Math.random*h*s)
    }
}

class Bullet {
    position 
    runtime
    size = 2

    constructor(position) {
        this.position = position 
        this.execRuntime(() => this.moving({x: 1, y: 0}))
    }

    execRuntime(next) {
        try {
            this.runtime = setInterval(() => {
                next()
            }, 100);
        } catch (err) {
            clearInterval(this.runtime)
        }
    }

    removeRuntime() {
        clearInterval(this.runtime)
    }

    moving(vector) {
        this.position.x += vector.x
        this.position.y += vector.y
    }
}

class Alien {
    position = {
        x: Math.floor(Math.random() * w + w*4),
        y: Math.floor(Math.random() * h*4 + 0),
    }
    size = 10

    failure = false
    constructor() {
        this.execRuntime(() => this.moving({x: -1, y: 0}))
    }

    execRuntime(next) {
        try {
            this.runtime = setInterval(() => {
                next()
            }, 1000);
        } catch (err) {
            clearInterval(this.runtime)
        }
    }

    moving(vector) {
        this.position.x += vector.x
        this.position.y += vector.y
    }

    removeRuntime() {
        clearInterval(this.runtime)
    }

    isCollision(o) {
        const { x, y} = o.position
        const px = this.position.x
        const py = this.position.y

        if (
            px - this.size <= x && x <= px + this.size && py - this.size <= y && y  <= py + this.size
        ) {
            console.log('collision success->',this.position , o)
            return true
        }  
        return false
    }
}