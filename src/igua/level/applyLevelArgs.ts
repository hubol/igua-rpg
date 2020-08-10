export interface ApplyLevelArgs<T>
{
    readonly width: number;
    readonly height: number;
    readonly style: number;
    readonly gameObjectsSupplier: () => GameObjects<T>;
}

type GameObjects<T> = {
    [key in keyof T]: T[key]
}

// function consume<T>(args: LevelConstructorArgs<T>): GameObjects<T>
// {
//     return args.gameObjectsSupplier();
// }
//
// const MyLevel = {
//     width: 69,
//     height: 420,
//     style: 300,
//     gameObjectsSupplier() {
//         return {
//             Hubol: { sex: "low" },
//             Idiot: "fuck"
//         }
//     }
// }
//
// function aa()
// {
//     consume(MyLevel).Hubol.sex = "";
// }