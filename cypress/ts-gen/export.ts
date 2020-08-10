import {Const} from "./const";

export type Exportable = Const;

export class Export
{
    public readonly member: Exportable;

    public constructor(member: Exportable)
    {
        this.member = member;
    }
}