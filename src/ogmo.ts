namespace Ogmo
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
        entities: Entity[];
    }

    interface Entity
    {
        name: string;
        id: number;
        _eid: string;
        x: number;
        y: number;
        width: number;
        height: number;
        values: any;
    }
}