import {mergeFunctionLeaves} from "../../utils/mergeFunctionLeaves";
import {SceneSource} from "./sceneSource";

type SceneSourceLibrary = Record<string, SceneSource>;
let sceneSourceLibrary: SceneSourceLibrary;

export function getSceneSource(name: string)
{
    if (!sceneSourceLibrary)
        sceneSourceLibrary = getSceneSourceLibrary() as any;
    return sceneSourceLibrary[name];
}

function getSceneSourceLibrary()
{
    const levelModules = require("../../levels/**/*.*");
    console.debug("Got modules from levels/**/*.*", levelModules);
    const sceneSources = mergeFunctionLeaves(levelModules);
    console.debug("Applied default SceneSourceMeta. Got SceneSources", sceneSources)
    return sceneSources;
}
