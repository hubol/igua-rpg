import {Container, DisplayObject, Graphics} from "pixi.js";
import {game} from "./game";
import {AsshatTicker} from "../utils/asshatTicker";
import {level} from "./level/level";
import {camera as createCamera} from "./camera";

function createScene(isLevel: boolean)
{
    const ticker = new AsshatTicker();
    const backgroundGraphics = new Graphics();
    const terrainStage = new Container();

    const parallax1Stage = new Container();
    const backgroundGameObjectStage = new Container();
    const terrainContainer = new Container();
    const pipeStage = new Container();
    const gameObjectStage = new Container();
    const cameraStage = new Container();
    const playerStage = new Container();
    cameraStage.addChild(backgroundGameObjectStage, pipeStage, terrainStage, terrainContainer, gameObjectStage, playerStage);
    const stage = new Container().withTicker(ticker);
    stage.addChild(backgroundGraphics, parallax1Stage, cameraStage);
    game.sceneStage.addChild(stage);

    return {
        set backgroundColor(value: number) {
            backgroundGraphics.clear();
            backgroundGraphics.beginFill(value);
            backgroundGraphics.drawRect(0, 0, 256, 256);
        },
        set terrainFill(value: DisplayObject) {
            terrainContainer.removeAllChildren();
            value.mask = terrainStage;
            terrainContainer.addChild(value);
        },
        set terrainColor(color: number) {
            const graphics = new Graphics();
            graphics.beginFill(color);
            graphics.drawRect(0, 0, level.width, level.height);
            this.terrainFill = graphics;
        },
        camera: createCamera(isLevel),
        parallax1Stage,
        backgroundGameObjectStage,
        cameraStage,
        pipeStage,
        terrainStage,
        terrainContainer,
        gameObjectStage,
        playerStage,
        ticker,
        destroy()
        {
            stage.destroy({ children: true });
        },
        get visible()
        {
            return stage.visible;
        },
        set visible(value: boolean)
        {
            stage.visible = value;
        }
    };
}

export type Scene = ReturnType<typeof createScene>;

const scenes: Scene[] = [];

function onScenesModified()
{
    if (scenes.length < 1)
        return;

    for (let i = 0; i < scenes.length - 1; i++)
        scenes[i].visible = false;
    scene = scenes[scenes.length - 1];
    scene.visible = true;
}

export let scene: Scene;

export const sceneStack = {
    push()
    {
        const newScene = createScene(scenes.length === 0);
        scenes.push(newScene);
        onScenesModified();
    },
    pop()
    {
        const poppedScene = scenes.pop();
        poppedScene?.destroy();
        onScenesModified();
        return poppedScene;
    },
    toArray()
    {
        return [...scenes];
    },
    get isLevel()
    {
        return scenes.length === 1;
    }
};