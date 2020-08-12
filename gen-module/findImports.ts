import {Module} from "./components/module";
import {ImportedFunction} from "./components/imported";

export interface Import
{
    readonly exportedName: string;
    readonly modulePath: string;
}

export function findImports(module: Module)
{
    const importJsons = new Set<string>();
    const next: any[] = [module];
    while (next.length > 0)
        findImportsImpl(next.pop(), next, importJsons);
    const imports = Array.from(importJsons as any).map(x => JSON.parse(x as string) as Import);
    console.info(module, "Found unique imports", imports);
    return imports;
}

function findImportsImpl(current: any, next: any[], importJsons: Set<string>)
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
            importJsons.add(JSON.stringify(value));
        else
            next.push(value);
    }
}