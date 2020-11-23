declare global {
    interface Array<T> {
        removeFirst(...T);
        removeAll(T);
        firstOrDefault(): T | undefined;
    }
}

Object.defineProperties(Array.prototype, {
    removeFirst: {
        value: function (...args) {
            args.forEach(value => {
                const index = this.indexOf(value);
                if (index > -1)
                    this.splice(index, 1);
            });
        },
        enumerable: false
    },
    removeAll: {
        value: function(value)
        {
            while (true)
            {
                const index = this.indexOf(value);
                if (index <= -1)
                    return;
                this.splice(index, 1);
            }
        },
        enumerable: false
    },
    firstOrDefault: {
        value: function () {
            if (this.length === 0)
                return undefined;
            return this[0];
        },
        enumerable: false
    }
});

export default 0;