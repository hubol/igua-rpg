import {Export} from "./export";

export class Module
{
    constructor(readonly directoryPath: string, readonly exports: Export[]) { }
}