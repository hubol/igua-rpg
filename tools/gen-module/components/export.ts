import {Const} from "./const";

export type Exportable = Const;

export class Export
{
    constructor(readonly member: Exportable) { }
}