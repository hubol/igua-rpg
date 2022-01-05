import {Container} from "pixi.js";

export function container(...children: PIXI.DisplayObject[]) {
    const container = new Container();
    if (children.length > 0)
        container.addChild(...children);
    return container;
}
