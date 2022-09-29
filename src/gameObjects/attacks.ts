import {defaults} from "../utils/object/defaults";
import { merge } from "../utils/object/merge";
import {container} from "../utils/pixi/container";
import {Container, DisplayObject} from "pixi.js";
import {IguaZone} from "../cutscene/runInIguaZone";

export function attackRunner() {
    const api = {
        run(d: DisplayObject) {
            this.hurtPlayerThisAttack = false;
            return new Promise<void>((rs, rj) => d.show(c).on('removed', () => {
                if (c.destroyed)
                    IguaZone.cancellationToken?.rejectIfCancelled(rj);
                else
                    rs();
            }))
        },
        clear() {
            c.removeAllChildren();
        },
        get current() {
            return c.children[0]?.ext.__src;
        },
        get isEmpty() {
            return c.children.length === 0;
        },
        hurtPlayerThisAttack: false
    };
    let lastVsPlayerHitCount = 0;

    const c = container()
        .withStep(() => {
            if (c.parent.vsPlayerHitCount !== lastVsPlayerHitCount) {
                lastVsPlayerHitCount = c.parent.vsPlayerHitCount;
                api.hurtPlayerThisAttack = true;
            }
        });
    return merge(c, api);
}

export function attack<T extends {}>(defaultArgs = {} as T) {
    type Self = Container & T;
    type SyncFn = (self: Self, self2: Self) => unknown;
    type AsyncFn = (self: Self, self2: Self) => Promise<unknown>;

    const steps: SyncFn[] = [];
    const cleanups: SyncFn[] = [];
    const asyncs: AsyncFn[] = [];
    const asyncOnces: AsyncFn[] = [];

    function constructor(partialArgs = {} as Partial<T>) {
        defaults(defaultArgs, partialArgs);
        const args = partialArgs as T;
        const self = merge(container(), args);
        self.ext.__src = constructor;
        for (const step of steps)
            self.withStep(() => step(self, self));
        for (const cleanup of cleanups)
            self.on('removed', () => cleanup(self, self));
        for (const async of asyncs)
            self.withAsync(() => async(self, self));
        if (asyncOnces.length > 0) {
            let remaining = asyncOnces.length;
            const maybeDestroySelf = () => {
                if (--remaining <= 0)
                    self.destroy();
            };

            for (const async of asyncOnces)
                self.withAsync(async () => {
                    await async(self, self);
                    maybeDestroySelf();
                });
        }

        return self;
    }

    merge(constructor, {
        withStep(fn: SyncFn) {
            steps.push(fn);
            return this;
        },
        withCleanup(fn: SyncFn) {
            cleanups.push(fn);
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
        withStep(fn: SyncFn): Ctor,
        withCleanup(fn: SyncFn): Ctor,
        withAsync(fn: AsyncFn): Ctor,
        withAsyncOnce(fn: AsyncFn): Ctor,
    };

    return constructor as any as Ctor;
}

type Attack<T> = ReturnType<typeof attack>;
