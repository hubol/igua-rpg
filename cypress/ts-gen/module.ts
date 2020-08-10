import {Export} from "./export";

export class Module
{
    public readonly directoryPath: string;
    public readonly exports: Export[];

    public constructor(directoryPath: string, exports: Export[])
    {
        this.directoryPath = directoryPath;
        this.exports = exports;
    }
}