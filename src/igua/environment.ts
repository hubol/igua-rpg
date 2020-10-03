export const environment = {
    get isProduction()
    {
        return process.env.NODE_ENV === "production";
    },
    get isElectron()
    {
        // https://github.com/electron/electron/issues/2288#issuecomment-337858978
        return navigator.userAgent.toLowerCase().indexOf(' electron/') > -1;
    },
    get isSafari()
    {
        return /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
    }
};