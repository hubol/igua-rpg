import {mergeFunctionLeaves} from "../utils/mergeFunctionLeaves";
import {Test} from "./testLevel";

export type LevelEntrypoint = ReturnType<typeof getLevelEntrypoint>;

const levelEntrypoints = getLevelEntrypoints();

export function getLevelEntrypoint(name: string)
{
    return (levelEntrypoints[name] ?? Test) as () => void;
}

function getLevelEntrypoints()
{
    const levelModules = require("./**/*.*");
    return mergeFunctionLeaves(levelModules);
}