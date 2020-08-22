export namespace Ogmo
{
    export interface Level
    {
        width: number;
        height: number;
        layers: Layer[];
        values: LevelValues;
    }

    export interface LevelValues
    {
        style: number;
    }

    interface Layer
    {
        name: string;
        entities?: Entity[];
        decals?: Decal[];
    }

    export interface Entity
    {
        name: string;
        id: number;
        _eid: string;
        x: number;
        y: number;
        width: number;
        height: number;
        flippedX?: boolean;
        flippedY?: boolean;
        values: any;
    }

    export interface Decal
    {
        x: number;
        y: number;
        scaleX: number;
        scaleY: number;
        rotation: number;
        texture: string;
        values: any;
    }
}