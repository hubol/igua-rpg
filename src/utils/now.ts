export const now = {
    get date()
    {
        return new Date();
    },
    get ms()
    {
        return new Date().getTime();
    },
    get s()
    {
        return new Date().getTime() / 1000;
    }
}
