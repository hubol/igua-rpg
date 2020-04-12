declare global {
    interface Array<T> {
        remove(...T);
    }
}

Array.prototype.remove = function(...args)
{
    args.forEach(value => {
        const index = this.indexOf(value);
        if (index > -1)
            this.splice(index, 1);
    });
};

export const noOneCares = 0;