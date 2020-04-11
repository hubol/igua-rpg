namespace Ogmo
{
    export interface Level
    {
        width: number;
        height: number;
        layers: Layer[];
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
        x: number;
        y: number;
        width: number;
        height: number;
        values: object;
    }
}