import * as PIXI from "pixi.js";
    
// This file is generated. Do not touch.

export let BlueValuable: PIXI.Texture = undefined as unknown as PIXI.Texture;
export let CharacterBody: PIXI.Texture = undefined as unknown as PIXI.Texture;
export let CharacterCrest: PIXI.Texture = undefined as unknown as PIXI.Texture;
export let CharacterFootBackLeft: PIXI.Texture = undefined as unknown as PIXI.Texture;
export let CharacterFootBackRight: PIXI.Texture = undefined as unknown as PIXI.Texture;
export let CharacterFootFrontLeft: PIXI.Texture = undefined as unknown as PIXI.Texture;
export let CharacterFootFrontRight: PIXI.Texture = undefined as unknown as PIXI.Texture;
export let CharacterHead: PIXI.Texture = undefined as unknown as PIXI.Texture;
export let OrangeValuable: PIXI.Texture = undefined as unknown as PIXI.Texture;
export let Pipe: PIXI.Texture = undefined as unknown as PIXI.Texture;


export function loadTexturesAsync()
{
    const loader = new PIXI.Loader();

    const BlueValuablePath = require("./images/blue valuable.png");
    loader.add(BlueValuablePath); 

    const CharacterBodyPath = require("./images/character/body.png");
    loader.add(CharacterBodyPath); 

    const CharacterCrestPath = require("./images/character/crest.png");
    loader.add(CharacterCrestPath); 

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

    const OrangeValuablePath = require("./images/orange valuable.png");
    loader.add(OrangeValuablePath); 

    const PipePath = require("./images/pipe.png");
    loader.add(PipePath); 

    
    return new Promise(resolve =>
    {
        loader.load((_, resources) => {
            BlueValuable = resources[BlueValuablePath]?.texture as PIXI.Texture;
            CharacterBody = resources[CharacterBodyPath]?.texture as PIXI.Texture;
            CharacterCrest = resources[CharacterCrestPath]?.texture as PIXI.Texture;
            CharacterFootBackLeft = resources[CharacterFootBackLeftPath]?.texture as PIXI.Texture;
            CharacterFootBackRight = resources[CharacterFootBackRightPath]?.texture as PIXI.Texture;
            CharacterFootFrontLeft = resources[CharacterFootFrontLeftPath]?.texture as PIXI.Texture;
            CharacterFootFrontRight = resources[CharacterFootFrontRightPath]?.texture as PIXI.Texture;
            CharacterHead = resources[CharacterHeadPath]?.texture as PIXI.Texture;
            OrangeValuable = resources[OrangeValuablePath]?.texture as PIXI.Texture;
            Pipe = resources[PipePath]?.texture as PIXI.Texture;

            resolve();
        });
    });
}