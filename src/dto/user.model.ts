export default class User {
    id?: number
    username?: string
    password?: string
    email?: string
    token?: string
    roleId?: number
    accountTypeId?: number
    ban?: number

    constructor(
        id?: number,
        username?: string,
        password?: string,
        email?: string,
        roleId?: number,
        accountTypeId?: number,
        ban?: number,
        token?: string
    ) {
        this.id = id
        this.username = username
        this.password = password
        this.email = email
        this.token = token
        this.roleId = roleId
        this.accountTypeId = accountTypeId
        this.ban = ban || 0
    }
}
