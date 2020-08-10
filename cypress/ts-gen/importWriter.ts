import {getRelativePath} from "pissant-node";

export class ImportWriter
{
    public readonly currentDirectory: string;
    private readonly _imports: Import[] = [];

    public constructor(currentDirectory: string)
    {
        this.currentDirectory = currentDirectory;
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
            const relativePath = getRelativePath(this.currentDirectory, x.filePath);
            console.log(this.currentDirectory, x.filePath, getRelativePath(this.currentDirectory, x.filePath), relativePath);
            text += `import { ${x.exportedName}${x.asName ? ` as ${x.asName}` : ""} } from '${relativePath}';
`;
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