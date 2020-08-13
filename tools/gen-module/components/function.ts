export class AnonymousFunction
{
    public readonly returns: Returns;

    public constructor(returns: Returns)
    {
        this.returns = returns;
    }
}

export class Returns
{
    public readonly value: any;

    public constructor(value: any)
    {
        this.value = value;
    }
}