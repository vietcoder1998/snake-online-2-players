function LoadingCmd(mes?: string): void {
    const msg = new Date() + (mes ? mes : ' Connecting ...')
    // eslint-disable-next-line no-console
    console.log(`\x1b[36m${msg}`)
}

export default LoadingCmd
