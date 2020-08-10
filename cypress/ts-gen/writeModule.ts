import {Module} from "./module";
import {ImportedFunction} from "./imported";
import {getRelativePath} from "pissant-node";
import {Export} from "./export";
import {AnonymousFunction} from "./function";
import {Invocation} from "./invocation";

export function writeModule(module: Module)
{
    const imports = findImports(module);
    return `${imports.map(writeImport(module)).join("\n")}

${module.exports.map(writeExport).join("\n")}`;
}

function writeImport(module: Module) {
    return function(x: Import)
    {
        return `import { ${x.exportedName} } from "${getRelativePath(module.directoryPath, x.modulePath)}";`;
    }
}

function writeExport(e: Export)
{
    return `export const ${e.member.preferredName} = ${writeLiteral(e.member.value)};`;
}

function writeLiteral(x: any): string
{
    if (Array.isArray(x))
        return `[ ${x.map(writeLiteral).join(",")} ]`;
    if (x instanceof AnonymousFunction)
    {
        return `() => {
    return ${writeLiteral(x.returns.value)};
}`;
    }
    if (x instanceof Invocation)
    {
        return `${x.invokable.exportedName}(${x.args.length === 0 ? "" : writeLiteral(x.args.length === 1 ? x.args[0] : x.args)})`;
    }
    if (typeof x === "object")
        return `{
    ${Object.keys(x).map(writeKvPair(x)).join(",\n")}
}`;
    return JSON.stringify(x);
}

function writeKvPair(object: any)
{
    return function(key: string)
    {
        const value = object[key];
        const kvPair = `${key}: ${writeLiteral(value)}`;
        if (suppressTypeScriptErrors(value))
            return `// @ts-ignore
${kvPair}`
        return kvPair;
    }
}

function suppressTypeScriptErrors(object: any)
{
    return object instanceof Invocation && object.ignoreProblemsWithInvocation;
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
    console.info(module, "Found imports", imports);
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