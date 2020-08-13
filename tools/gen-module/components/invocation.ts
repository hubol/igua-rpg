import {ImportedFunction} from "./imported";

export type Invokable = ImportedFunction;

export class Invocation
{
    public readonly invokable: Invokable;
    public readonly args: any[];
    public ignoreProblemsWithInvocation: boolean = false;

    public constructor(invokable: Invokable, ...args: any[])
    {
        this.invokable = invokable;
        this.args = args;
    }

    public tsIgnore()
    {
        this.ignoreProblemsWithInvocation = true;
        return this;
    }
}