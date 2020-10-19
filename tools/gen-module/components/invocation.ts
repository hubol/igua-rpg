import {ImportedConst} from "./imported";

export type Invokable = ImportedConst;

export class Invocation
{
    public readonly args: any[];
    public ignoreProblemsWithInvocation: boolean = false;

    public constructor(readonly invokable: Invokable, ...args: any[])
    {
        this.args = args;
    }

    public tsIgnore()
    {
        this.ignoreProblemsWithInvocation = true;
        return this;
    }
}