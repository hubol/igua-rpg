import {Pixin} from "../utils/pixi/pixin";
import {attackRunner} from "../gameObjects/attacks";
import {Container, DisplayObject} from "pixi.js";
import {merge} from "../utils/object/merge";

export const AttackRunner = Pixin()
    .restricted<Container>()
    .applies(src => {
        const runner = attackRunner().show(src);
        const run = (d: DisplayObject) => runner.run(d);

        return merge(src, { run });
    })();