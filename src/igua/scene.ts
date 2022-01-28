import {Container, Graphics} from "pixi.js";
import {game} from "./game";
import {AsshatTicker} from "../utils/asshatTicker";
import {camera as createCamera} from "./camera";
import {SceneSource} from "./level/sceneSource";
import {recreatePlayer} from "../gameObjects/player";
import {progress} from "./data/progress";
import {defaults} from "../utils/defaults";
import {merge} from "../utils/merge";
import {defaultSceneMeta, SceneMeta} from "./level/setSceneMeta";
import {advanceKeyListener} from "../utils/browser/key";

function createScene(source: SceneSource, args: Readonly<SceneMeta>)
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

    return merge(args, {
        source,
        set backgroundColor(value: number) {
            backgroundGraphics.clear();
            backgroundGraphics.beginFill(value);
            backgroundGraphics.drawRect(0, 0, 256, 256);
        },
        terrainColor: 0,
        camera: createCamera(args.isLevel),
        trackedDisplayObjects: {},
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
            ticker.doNextUpdate = true;
            ticker.update();
        },
        get visible()
        {
            return stage.visible;
        },
        set visible(value: boolean)
        {
            stage.visible = value;
        },
        width: 0,
        height: 0
    });
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

function onScenePushed() {
    if (scene.isLevel) {
        recreatePlayer();
        progress.levelName = scene.name!;
    }
    const result = scene.source();
    advanceKeyListener();
    scene.ticker.update();
    return result;
}

export let scene: Scene;

export const sceneStack = {
    push<T>(source: () => T, args: Partial<SceneMeta> = {}): T
    {
        const fullArgs: SceneMeta = defaults(defaults(defaultSceneMeta(), {...(source as any).meta}), args);
        if (fullArgs.isLevel && !fullArgs.name)
            throw new Error("It is not permitted to push a level without a name.");
        if (fullArgs.isLevel && scenes.length > 0)
            throw new Error("It is not permitted to push a level beyond the first index of the sceneStack.");
        const newScene = createScene(source, fullArgs);
        scenes.push(newScene);
        onScenesModified();
        return onScenePushed() as any;
    },
    pop()
    {
        const poppedScene = scenes.pop();
        poppedScene?.destroy();
        onScenesModified();
        return poppedScene;
    },
    replace<T>(source: () => T, args: Partial<SceneMeta> = {}): T {
        while (scenes.length > 0)
            this.pop();
        return this.push(source, args);
    },
    toArray()
    {
        return [...scenes];
    },
    get length()
    {
        return scenes.length;
    }
};
