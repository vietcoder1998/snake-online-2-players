export default function rand(max: number, min?: number) {
    let mi = min
    if (!mi) {
        mi = 0
    }
    return Math.floor(Math.random() * (max - mi) + mi)
}
