import {Module} from "./components/module";
import {Export} from "./components/export";
import {AnonymousFunction} from "./components/function";
import {Invocation} from "./components/invocation";
import {findImports, Import} from "./findImports";
import {isPojo} from "./isPojo";
import {ImportedConst} from "./components/imported";

type GetRelativePath = (from: string, to: string) => string;

export function writeModule(module: Module, getRelativePath: GetRelativePath)
{
    const imports = findImports(module);
    return `${imports.map(writeImport(module, getRelativePath)).join("\n")}

${module.exports.map(writeExport).join("\n\n")}`;
}

function writeImport(module: Module, getRelativePath: GetRelativePath) {
    return function(x: Import)
    {
        return `import { ${x.exportedName} } from "${getRelativePath(module.directoryPath, x.modulePath)}";`;
    }
}

function writeExport(e: Export)
{
    const value = e.member.value;
    return writeSuppressingTypeScriptErrorsIfNecessary(value)
        (`export const ${e.member.preferredName} = ${writeLiteral(value)};`);
}

function writeLiteral(x: any): string
{
    if (Array.isArray(x))
        return `[ ${x.map(writeLiteral).join(",")} ]`;
    if (x instanceof AnonymousFunction)
    {
        const value = x.returns.value;
        return `() => {
${writeSuppressingTypeScriptErrorsIfNecessary(value)(`  return ${writeLiteral(value)};`)}
}`;
    }
    if (x instanceof ImportedConst)
        return x.exportedName;
    if (x instanceof Invocation)
    {
        return `${x.invokable.exportedName}(${x.args.length === 0 ? "" : writeLiteral(x.args.length === 1 ? x.args[0] : x.args)})`;
    }
    if (typeof x === "object" && !isPojo(x))
        return `{ ${Object.keys(x).map(writeKvPair(x)).join(", ")} }`;
    return JSON.stringify(x);
}

function writeKvPair(object: any)
{
    return function(key: string)
    {
        const value = object[key];
        return writeSuppressingTypeScriptErrorsIfNecessary(value)
            (`${key}: ${writeLiteral(value)}`);
    }
}

function writeSuppressingTypeScriptErrorsIfNecessary(mightHaveTypeScriptErrors: any)
{
    return function(text: string)
    {
        if (suppressTypeScriptErrors(mightHaveTypeScriptErrors))
            return `// @ts-ignore
${text}`;
        return text;
    }
}

function suppressTypeScriptErrors(object: any)
{
    if (Array.isArray(object) && object.filter(suppressTypeScriptErrors).length > 0)
        return true;
    return object instanceof Invocation && object.ignoreProblemsWithInvocation;
}