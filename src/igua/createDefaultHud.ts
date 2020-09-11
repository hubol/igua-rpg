import {BitmapText, Container, Graphics} from "pixi.js";
import {progress} from "./progress";
import {game} from "./game";
import {AcrobatixFont} from "../fonts";

export function createDefaultHud()
{
    const healthbar = new Graphics()
        .withStep(() => {
            healthbar.clear();
            healthbar.beginFill(0xff0000);
            healthbar.drawRect(0, 0, progress.maxHealth, 16);
            healthbar.beginFill(0x0000ff);
            healthbar.drawRect(0, 0, progress.health, 16);
        });

    const valuables = new BitmapText("", { fontName: AcrobatixFont.font, tint: 0x00ff00 })
        .withStep(() => valuables.text = `${progress.valuables} valuables`)
        .at(2, 15);

    const defaultHud = new Container()
        .withStep(() => defaultHud.visible = !game.player.isDead);

    defaultHud.addChild(healthbar, valuables);

    game.hudStage.addChild(defaultHud);
}