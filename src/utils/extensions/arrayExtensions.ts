declare global {
    interface Array<T> {
        removeFirst(...T);
        removeAll(T);
        firstOrDefault(): T | undefined;
        filterInPlace(predicate: (value: T, index: number, array: T[]) => boolean): this;
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
    },
    filterInPlace: {
        value: function (condition) {
            let i = 0, j = 0;

            while (i < this.length) {
                const val = this[i];
                if (condition(val, i, this)) this[j++] = val;
                i++;
            }

            this.length = j;
            return this;
        },
        enumerable: false
    }
});

export default 0;
