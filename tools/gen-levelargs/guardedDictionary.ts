type RetryableKeyGenerator = (retryCount: number) => string;

export class GuardedDictionary
{
    public readonly object: object = {};

    public add(retryableKeyGenerator: RetryableKeyGenerator, value: any): void
    {
        let retryCount = 0;
        let key = retryableKeyGenerator(0);
        while (key in this.object)
            key = retryableKeyGenerator(++retryCount);
        this.object[key] = value;
    }
}