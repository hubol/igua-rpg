export const viewport = {
    get height()
    {
        return Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
    },
    get width()
    {
        return Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    },
    get min()
    {
        return Math.min(this.width, this.height);
    },
    get max()
    {
        return Math.max(this.width, this.height);
    }
};