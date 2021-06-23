export default class Profile {
    id?: number
    name?: string
    avatarUrl?: string
    coverUrl?: string
    state?: number
    createdDate?: number

    constructor(
        name?: string,
        state?: number,
        avatarUrl?: string,
        coverUrl?: string,
        createdDate?: number
    ) {
        this.name = name
        this.state = state
        this.avatarUrl = avatarUrl
        this.coverUrl = coverUrl
        this.createdDate = createdDate
    }
}
