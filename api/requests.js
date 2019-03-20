let injectedCookie

module.exports = {
    injectCookie(cookie) {
        injectedCookie = cookie
        return function ejectCookie() {
            injectedCookie = undefined
        }
    },
    getFoo() {
        return new Promise((res) => {
            // simulate latency
            setTimeout(() => {
                res({ injectedCookie });
            }, 2000)
        })
    }
}