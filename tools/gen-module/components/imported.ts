export class ImportedFunction
{
    public readonly exportedName: string;
    public readonly modulePath: string;

    public constructor(exportedName: string, modulePath: string)
    {
        this.exportedName = exportedName;
        this.modulePath = modulePath;
    }
}

export class ImportedConst
{
    public readonly exportedName: string;
    public readonly modulePath: string;

    public constructor(exportedName: string, modulePath: string)
    {
        this.exportedName = exportedName;
        this.modulePath = modulePath;
    }
}