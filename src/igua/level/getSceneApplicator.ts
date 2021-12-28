import {mergeFunctionLeaves} from "../../utils/mergeFunctionLeaves";
import {SceneApplicator} from "./sceneApplicator";

let sceneApplicatorLibrary;

export function getSceneApplicator(name: string)
{
    if (!sceneApplicatorLibrary)
        sceneApplicatorLibrary = getSceneApplicatorLibrary();
    return (sceneApplicatorLibrary[name]) as SceneApplicator;
}

function getSceneApplicatorLibrary()
{
    const levelModules = require("../../levels/**/*.*");
    console.debug("Got modules from levels/**/*.*", levelModules);
    const sceneApplicators = mergeFunctionLeaves(levelModules);
    console.debug("Got SceneApplicators", sceneApplicators)
    return sceneApplicators;
}
