import {getRelativePath} from "pissant-node";

export class ImportWriter
{
    public readonly currentFilePath: string;
    private readonly _imports: Import[] = [];

    public constructor(currentFilePath: string)
    {
        this.currentFilePath = currentFilePath;
    }

    public addImport(_import: Import): boolean
    {
        const incomingImportName = getImportedName(_import);
        if (this._imports.filter(x => getImportedName(x) === incomingImportName).length > 0)
            return false;

        this._imports.push(_import);
        return true;
    }

    public write(): string
    {
        let text = "";
        this._imports.forEach(x => {
            const relativePath = getRelativePath(this.currentFilePath, x.filePath);
            text += `import { ${x.exportedName}${x.asName ? ` as ${x.asName}` : ""} } from '${relativePath}'`;
        });
        return text;
    }
}

export interface Import
{
    readonly filePath: string;
    readonly exportedName: string;
    readonly asName?: string;
}

function getImportedName(_import: Import)
{
    return _import.asName ? _import.asName : _import.exportedName;
}