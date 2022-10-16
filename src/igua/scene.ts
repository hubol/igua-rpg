import {Container, Graphics} from "pixi.js";
import {game} from "./game";
import {AsshatTicker} from "../utils/asshatTicker";
import {camera as createCamera} from "./camera";
import {SceneSource} from "./level/sceneSource";
import {player, createStagedPlayer, setPlayer, createStagedFakePlayer} from "../gameObjects/player";
import {progress} from "./data/progress";
import {defaults} from "../utils/object/defaults";
import {merge} from "../utils/object/merge";
import {defaultSceneMeta, SceneMeta} from "./level/setSceneMeta";
import {advanceInput} from "./io/input";

function createScene(source: SceneSource, args: Readonly<SceneMeta>)
{
    const ticker = new AsshatTicker();
    const endTicker = merge(new AsshatTicker(), { get doNextUpdate() { return ticker.doNextUpdate; } });
    const backgroundGraphics = new Graphics();
    const terrainStage = new Container();

    const parallax1Stage = new Container();
    const backgroundGameObjectStage = new Container();
    const terrainDecalsStage = new Container();
    const pipeStage = merge(new Container(), { style: 0 });
    const gameObjectStage = new Container();
    const cameraStage = new Container();
    const playerStage = new Container();
    cameraStage.addChild(backgroundGameObjectStage, pipeStage, terrainStage, terrainDecalsStage, gameObjectStage, playerStage);
    const stage = new Container().withTicker(ticker);
    stage.addChild(backgroundGraphics, parallax1Stage, cameraStage);
    game.sceneStage.addChild(stage);

    let ticks = 0;
    gameObjectStage.withStep(() => ticks += 1);

    let backgroundColor = 0;

    return merge(args, {
        source,
        get backgroundColor() {
            return backgroundColor;
        },
        set backgroundColor(value: number) {
            backgroundGraphics.clear();
            backgroundGraphics.beginFill(backgroundColor = value);
            backgroundGraphics.drawRect(0, 0, 256, 256);
        },
        backgroundGraphics,
        terrainColor: 0,
        camera: createCamera(args.isLevel),
        trackedDisplayObjects: {},
        parallax1Stage,
        backgroundGameObjectStage,
        cameraStage,
        pipeStage,
        terrainStage,
        terrainDecalsStage,
        gameObjectStage,
        playerStage,
        stage,
        ticker,
        endTicker,
        ext: {} as Record<string, any>,
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
        height: 0,
        get ticks() {
            return ticks;
        },
        get s() {
            return ticks / 60;
        }
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
    setPlayer(scene.ext.__player);
}

function onScenePushed() {
    if (scene.isLevel) {
        createStagedPlayer();
        progress.levelName = scene.name!;
    }
    else {
        createStagedFakePlayer();
    }

    scene.ext.__player = player;
    const result = scene.source();
    advanceInput();
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
