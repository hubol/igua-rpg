import {mergeFunctionLeaves} from "./utils/mergeFunctionLeaves";
import {Test} from "./levels/testLevel";

let levelEntrypoints;

export function getLevelEntrypoint(name: string)
{
    if (!levelEntrypoints)
        levelEntrypoints = getLevelEntrypoints();
    return (levelEntrypoints[name] ?? Test) as () => void;
}

function getLevelEntrypoints()
{
    const levelModules = require("./levels/**/*.*");
    console.debug("Got LevelEntrypoint modules", levelModules);
    const levelEntrypoints = mergeFunctionLeaves(levelModules);
    console.debug("Got LevelEntrypoints", levelEntrypoints)
    return levelEntrypoints;
}