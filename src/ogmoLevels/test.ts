import * as Village from "./RightTest.json";

type Fuck<T> = {
    [key in keyof T]: string
}

type Fuck2<T> = {
    [key in keyof T]: T[key]
}


// type Help = Fuck<typeof Village.entities>
// const b: Help = {} as Help;
//
// function help<T>(t: T): Fuck<T>
// {
//     return {} as any;
// }
//
// interface Levelbase<T>
// {
//     entities: Fuck2<T>
// }
//
// function createGameObjects<T>(levelBase: Levelbase<T>): Fuck2<T>
// {
//     return levelBase.entities;
// }
//
// function a()
// {
//     const village = createGameObjects(Village);
// }