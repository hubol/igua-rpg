export const now = {
    get date()
    {
        return new Date();
    },
    get ms()
    {
        return new Date().getTime();
    }
}