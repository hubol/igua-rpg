import {Container, DisplayObject, Graphics} from "pixi.js";
import {game} from "./game";
import {AsshatTicker} from "../utils/asshatTicker";
import {merge} from "../utils/merge";

function createScene()
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
    cameraStage.addChild(backgroundGameObjectStage, pipeStage, terrainStage, terrainContainer, gameObjectStage);
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
            graphics.drawRect(0, 0, game.level.width, game.level.height);
            this.terrainFill = graphics;
        },
        parallax1Stage,
        backgroundGameObjectStage,
        cameraStage,
        pipeStage,
        terrainStage,
        terrainContainer,
        gameObjectStage,
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

    merge(scene, scenes[scenes.length - 1]);
}

export const scene = {} as Scene;

export const sceneStack = {
    push()
    {
        if (scene.visible)
            scene.visible = false;

        const newScene = createScene();
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
        return scenes.splice(0);
    }
};