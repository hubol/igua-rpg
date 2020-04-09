import * as PIXI from "pixi.js";
    
// This file is generated. Do not touch.

export let CharacterFootBackLeft: PIXI.Texture = undefined as unknown as PIXI.Texture;
export let CharacterFootBackRight: PIXI.Texture = undefined as unknown as PIXI.Texture;
export let CharacterFootFrontLeft: PIXI.Texture = undefined as unknown as PIXI.Texture;
export let CharacterFootFrontRight: PIXI.Texture = undefined as unknown as PIXI.Texture;
export let CharacterHead: PIXI.Texture = undefined as unknown as PIXI.Texture;
export let CharacterIguaBody: PIXI.Texture = undefined as unknown as PIXI.Texture;


export function loadTexturesAsync()
{
    const loader = new PIXI.Loader();

    const CharacterFootBackLeftPath = require("./images/character/foot back left.png");
    loader.add(CharacterFootBackLeftPath); 

    const CharacterFootBackRightPath = require("./images/character/foot back right.png");
    loader.add(CharacterFootBackRightPath); 

    const CharacterFootFrontLeftPath = require("./images/character/foot front left.png");
    loader.add(CharacterFootFrontLeftPath); 

    const CharacterFootFrontRightPath = require("./images/character/foot front right.png");
    loader.add(CharacterFootFrontRightPath); 

    const CharacterHeadPath = require("./images/character/head.png");
    loader.add(CharacterHeadPath); 

    const CharacterIguaBodyPath = require("./images/character/igua body.png");
    loader.add(CharacterIguaBodyPath); 

    
    return new Promise(resolve =>
    {
        loader.load((_, resources) => {
            CharacterFootBackLeft = resources[CharacterFootBackLeftPath]?.texture as PIXI.Texture;
            CharacterFootBackRight = resources[CharacterFootBackRightPath]?.texture as PIXI.Texture;
            CharacterFootFrontLeft = resources[CharacterFootFrontLeftPath]?.texture as PIXI.Texture;
            CharacterFootFrontRight = resources[CharacterFootFrontRightPath]?.texture as PIXI.Texture;
            CharacterHead = resources[CharacterHeadPath]?.texture as PIXI.Texture;
            CharacterIguaBody = resources[CharacterIguaBodyPath]?.texture as PIXI.Texture;

            resolve();
        });
    });
}