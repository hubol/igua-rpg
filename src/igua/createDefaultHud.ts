import {Graphics} from "pixi.js";
import {progress} from "./progress";
import {game} from "./game";

export function createDefaultHud()
{
    const healthbar = new Graphics();
    healthbar.withStep(() => {
        healthbar.clear();
        healthbar.beginFill(0xff0000);
        healthbar.drawRect(0, 0, progress.maxHealth, 16);
        healthbar.beginFill(0x0000ff);
        healthbar.drawRect(0, 0, progress.health, 16);
    });

    game.hudStage.addChild(healthbar);
}