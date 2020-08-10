export class Const
{
    public readonly preferredName: string;
    public readonly value: any;

    public constructor(preferredName: string, value: any)
    {
        this.preferredName = preferredName;
        this.value = value;
    }
}