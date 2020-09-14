declare global {
    interface Array<T> {
        removeFirst(...T);
        removeAll(T);
        firstOrDefault(): T | undefined;
    }
}

Array.prototype.removeFirst = function(...args)
{
    args.forEach(value => {
        const index = this.indexOf(value);
        if (index > -1)
            this.splice(index, 1);
    });
};

Array.prototype.removeAll = function(value)
{
    while (true)
    {
        const index = this.indexOf(value);
        if (index <= -1)
            return;
        this.splice(index, 1);
    }
};

Array.prototype.firstOrDefault = function () {
    if (this.length === 0)
        return undefined;
    return this[0];
}

export const noOneCares = 0;