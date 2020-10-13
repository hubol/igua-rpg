import {mergeFunctionLeaves} from "../../utils/mergeFunctionLeaves";

let levelApplicatorLibrary;

export type LevelApplicator = ReturnType<typeof getLevelApplicator>;

export function getLevelApplicator(name: string)
{
    if (!levelApplicatorLibrary)
        levelApplicatorLibrary = getLevelApplicatorLibrary();
    return (levelApplicatorLibrary[name]) as () => void;
}

function getLevelApplicatorLibrary()
{
    const levelModules = require("../../levels/**/*.*");
    console.debug("Got LevelEntrypoint modules", levelModules);
    const levelEntrypoints = mergeFunctionLeaves(levelModules);
    console.debug("Got LevelEntrypoints", levelEntrypoints)
    return levelEntrypoints;
}