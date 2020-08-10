import {Module} from "./module";
import {ImportedFunction} from "./imported";

export function writeModule(module: Module)
{
    const imports = findImports(module);
    console.log(module, imports);
}

interface Import
{
    readonly exportedName: string;
    readonly modulePath: string;
}

function findImports(module: Module)
{
    const imports: Import[] = [];
    const next: any[] = [module];
    while (next.length > 0)
        findImportsImpl(next.pop(), next, imports);
    return imports;
}

function findImportsImpl(current: any, next: any[], imports: Import[])
{
    if (Array.isArray(current))
    {
        current.forEach(x => next.push(x));
        return;
    }

    if (typeof current !== "object")
        return;

    for (const key in current)
    {
        const value = current[key];
        if (value instanceof ImportedFunction)
            imports.push(value);
        else
            next.push(value);
    }
}