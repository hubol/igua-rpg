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
        push(d: DisplayObject) {
            queue.push(d);
        },
        reset(d: DisplayObject) {
            api.clear();
            c.removeAllChildren();
            d.show(c);
        },
        get current() {
            return c.children[0]?.ext.__src;
        },
        get isEmpty() {
            return c.children.length === 0;
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

    function constructor(partialArgs = {} as Partial<T>) {
        defaults(defaultArgs, partialArgs);
        const args = partialArgs as T;
        const self = merge(container(), args);
        self.ext.__src = constructor;
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

    merge(constructor, {
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
        }
    });

    // Unfortunately, I cannot get it to infer a merged callable interface + pojo
    type Ctor = {
        (args?: Partial<T>): Container & T,
        withStep(fn: StepFn): Ctor,
        withAsync(fn: AsyncFn): Ctor,
        withAsyncOnce(fn: AsyncFn): Ctor,
    };

    return constructor as any as Ctor;
}

type Attack<T> = ReturnType<typeof attack>;
