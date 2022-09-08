import {defaults} from "../utils/object/defaults";
import { merge } from "../utils/object/merge";
import {container} from "../utils/pixi/container";
import {Container, DisplayObject} from "pixi.js";
import {wait} from "../cutscene/wait";

export function attackRunner() {
    const queue: DisplayObject[] = [];
    const api = {
        clear() {
            queue.length = 0;
        },
        push<T extends {}>(attack: Attack<T>, args: Partial<T> = {}) {
            queue.push(attack.__ctor(args));
        },
        reset<T extends {}>(attack: Attack<T>, args: Partial<T> = {}) {
            api.clear();
            c.removeAllChildren();
            attack.__ctor(args).show(c);
        },
        get current() {
            return c.children[0]?.ext.__src;
        }
    };
    const c = container()
        .withAsync(async () => {
            while (true) {
                await wait(() => c.children.length === 0 && queue.length > 0);
                const d = queue.shift()!;
                d.show(c);
            }
        });
    return merge(c, api);
}

export function attack<T extends {}>(defaultArgs = {} as T) {
    type Self = Container & T;
    type StepFn = (self: Self) => unknown;
    type AsyncFn = (self: Self) => Promise<unknown>;

    const steps: StepFn[] = [];
    const asyncs: AsyncFn[] = [];
    const asyncOnces: AsyncFn[] = [];

    function __ctor(partialArgs = {} as Partial<T>) {
        defaults(defaultArgs, partialArgs);
        const args = partialArgs as T;
        const self = merge(container(), args);
        self.ext.__src = m;
        for (const step of steps)
            self.withStep(() => step(self));
        for (const async of asyncs)
            self.withAsync(() => async(self));
        if (asyncOnces.length > 0) {
            let remaining = asyncOnces.length;
            const maybeDestroySelf = () => {
                if (--remaining <= 0)
                    self.destroy();
            };

            for (const async of asyncOnces)
                self.withAsync(async () => {
                    await async(self);
                    maybeDestroySelf();
                });
        }

        return self;
    }

    const m = {
        withStep(fn: StepFn) {
            steps.push(fn);
            return this;
        },
        withAsync(fn: AsyncFn) {
            asyncs.push(fn);
            return this;
        },
        withAsyncOnce(fn: AsyncFn) {
            asyncOnces.push(fn);
            return this;
        },
        __ctor
    }

    return m;
}

type Attack<T> = ReturnType<typeof attack>;
