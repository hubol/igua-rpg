import {mergeFunctionLeaves} from "../../utils/mergeFunctionLeaves";
import {LevelApplicator} from "./levelApplicator";

let levelApplicatorLibrary;

export function getLevelApplicator(name: string)
{
    if (!levelApplicatorLibrary)
        levelApplicatorLibrary = getLevelApplicatorLibrary();
    return (levelApplicatorLibrary[name]) as LevelApplicator;
}

function getLevelApplicatorLibrary()
{
    const levelModules = require("../../levels/**/*.*");
    console.debug("Got LevelEntrypoint modules", levelModules);
    const levelEntrypoints = mergeFunctionLeaves(levelModules);
    console.debug("Got LevelEntrypoints", levelEntrypoints)
    return levelEntrypoints;
}
