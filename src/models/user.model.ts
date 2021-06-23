export default class User {
    id?: number
    username?: string
    password?: string
    email?: string
    token?: string
    roleId?: number
    ban?: number

    constructor(
        id?: number,
        username?: string,
        password?: string,
        email?: string,
        token?: string,
        ban?: number
    ) {
        this.id = id
        this.username = username
        this.password = password
        this.email = email
        this.token = token
        this.roleId = this.roleId
        this.ban = ban || 0
    }
}
