'use strict'

module.exports = class User {
    id
    username
    avatar
    constructor(id, username, avatar) {
        this.id = id
        this.username = username
        this.avatar = avatar
    }
}