const os = require('os')

function getHostName() {
    const hostname = os.hostname()

    return hostname
}

function getIp() {
    const nw = os.networkInterfaces()

    if (nw) {
        const address1 = nw.lo0[0].address
        const address2 = nw.en0[1].address
        return [address1, address2] 

    } else return [null, null]
 
}

module.exports = {
    getHostName,
    getIp,
};