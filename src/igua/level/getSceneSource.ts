import {flattenFunctionLeaves} from "../../utils/object/flattenFunctionLeaves";
import {SceneSource} from "./sceneSource";
import {setSceneMeta} from "./setSceneMeta";

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
    const sceneSources = flattenFunctionLeaves(levelModules);
    Object.entries(sceneSources).forEach(([name, source]) => setSceneMeta(source, { name }));
    console.debug("Applied default SceneMeta. Got SceneSources", sceneSources)
    return sceneSources;
}
