import {Module} from "./module";
import {ImportedFunction} from "./imported";
import {getRelativePath} from "pissant-node";
import {Export} from "./export";
import {Const} from "./const";
import {AnonymousFunction} from "./function";
import {Invocation} from "./invocation";
import {resolveGate} from "../../src/gameObjects/gate";
import {resolveBlock} from "../../src/gameObjects/walls";

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

/*
entities: new AnonymousFunction(new Returns({
Block: new Invocation(new ImportedFunction("resolveBlock", "/src/gameObjects/walls"), { x: 0, y: 0, type: "Block" })
}))
 */

function writeExport(e: Export)
{
    if (e.member instanceof Const)
        return `export const ${e.member.preferredName} = ${writeLiteral(e.member.value)};`;
    throw { message: "Unsupported export member type", export: e };
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
    ${Object.keys(x).map(k => `${k}: ${writeLiteral(x[k])}`).join(",\n")}
}`;
    return JSON.stringify(x);
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