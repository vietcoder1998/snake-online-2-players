module.exports = function evenHandle(event, next, handle) {
    try {
        event()
    } catch (err) {
        next()
        throw err
    }
}