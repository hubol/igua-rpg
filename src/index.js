import {startApplication} from "./utils/pixiUtils";
import {player} from "./player";
import {block, slope} from "./walls";

export const app = startApplication({ width: 256, height: 256, mode: "retro game", targetFps: 60 });

app.stage.addChild(
    slope(16, 192 + 16, 128, 256),
    slope(160, 160, 256, 96),
    slope(64, 256, 200 - 25, 200),
    block(16, 256, 0, 192 + 16),
    block(256, 256, 64, 250),
    block(256 - 25, 250, 200 - 25, 200),
    player());