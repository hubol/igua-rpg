import {scene} from "../../igua/scene";
import {Container, Graphics} from "pixi.js";
import {container} from "../../utils/pixi/container";
import {merge} from "../../utils/object/merge";
import {player} from "../player";
import {Undefined} from "../../utils/types/undefined";

export class AoeHitboxes {
    private readonly _container: Container;
    visible = false;
    onDamage = Undefined<() => void>();

    constructor(stage = scene.gameObjectStage) {
        this._container = container().show(stage).hide().withStep(() => this._container.visible = this.visible);
    }

    new(w: number, h: number, life?: number, damage?: number) {
        const g = merge(new Graphics(), { w, h, damage });
        return g
            .withStep(() => {
                g.clear()
                    .beginFill(0xffffff)
                    .drawRect(0, 0, g.w, g.h);
                if (life !== undefined && life-- <= 0)
                    g.destroy();
                else if (g.damage && player.collides(g)) {
                    this.onDamage?.();
                    g.damagePlayer(g.damage);
                }
            })
            .show(this._container);
    }

    get hitboxes() {
        return this._container.children as ReturnType<typeof AoeHitboxes.prototype.new>[];
    }

    get container() {
        return this._container;
    }
}