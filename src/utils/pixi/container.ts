import {Container} from "pixi.js";

export function container(...children: PIXI.DisplayObject[]) {
    const container = new Container();
    container.addChild(...children);
    return container;
}
