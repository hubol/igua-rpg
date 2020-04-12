import * as PIXI from "pixi.js";
    
// This file is generated. Do not touch.

export let BlueGradient: PIXI.Texture = undefined as unknown as PIXI.Texture;
export let BlueValuable: PIXI.Texture = undefined as unknown as PIXI.Texture;
export let CharacterBody: PIXI.Texture = undefined as unknown as PIXI.Texture;
export let CharacterCrest: PIXI.Texture = undefined as unknown as PIXI.Texture;
export let CharacterFootBackLeft: PIXI.Texture = undefined as unknown as PIXI.Texture;
export let CharacterFootBackRight: PIXI.Texture = undefined as unknown as PIXI.Texture;
export let CharacterFootFrontLeft: PIXI.Texture = undefined as unknown as PIXI.Texture;
export let CharacterFootFrontRight: PIXI.Texture = undefined as unknown as PIXI.Texture;
export let CharacterHead: PIXI.Texture = undefined as unknown as PIXI.Texture;
export let HotTerrain: PIXI.Texture = undefined as unknown as PIXI.Texture;
export let LeftPipeEnd: PIXI.Texture = undefined as unknown as PIXI.Texture;
export let LockedDoor: PIXI.Texture = undefined as unknown as PIXI.Texture;
export let OpenDoor: PIXI.Texture = undefined as unknown as PIXI.Texture;
export let OrangeValuable: PIXI.Texture = undefined as unknown as PIXI.Texture;
export let Pipe: PIXI.Texture = undefined as unknown as PIXI.Texture;
export let RightPipeEnd: PIXI.Texture = undefined as unknown as PIXI.Texture;
export let RockCracks: PIXI.Texture = undefined as unknown as PIXI.Texture;


export function loadTexturesAsync()
{
    const loader = new PIXI.Loader();

    const BlueGradientPath = require("./images/blue gradient.png");
    loader.add(BlueGradientPath); 

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

    const HotTerrainPath = require("./images/hot terrain.png");
    loader.add(HotTerrainPath); 

    const LeftPipeEndPath = require("./images/left pipe end.png");
    loader.add(LeftPipeEndPath); 

    const LockedDoorPath = require("./images/locked door.png");
    loader.add(LockedDoorPath); 

    const OpenDoorPath = require("./images/open door.png");
    loader.add(OpenDoorPath); 

    const OrangeValuablePath = require("./images/orange valuable.png");
    loader.add(OrangeValuablePath); 

    const PipePath = require("./images/pipe.png");
    loader.add(PipePath); 

    const RightPipeEndPath = require("./images/right pipe end.png");
    loader.add(RightPipeEndPath); 

    const RockCracksPath = require("./images/rock cracks.png");
    loader.add(RockCracksPath); 

    
    return new Promise(resolve =>
    {
        loader.load((_, resources) => {
            BlueGradient = resources[BlueGradientPath]?.texture as PIXI.Texture;
            BlueValuable = resources[BlueValuablePath]?.texture as PIXI.Texture;
            CharacterBody = resources[CharacterBodyPath]?.texture as PIXI.Texture;
            CharacterCrest = resources[CharacterCrestPath]?.texture as PIXI.Texture;
            CharacterFootBackLeft = resources[CharacterFootBackLeftPath]?.texture as PIXI.Texture;
            CharacterFootBackRight = resources[CharacterFootBackRightPath]?.texture as PIXI.Texture;
            CharacterFootFrontLeft = resources[CharacterFootFrontLeftPath]?.texture as PIXI.Texture;
            CharacterFootFrontRight = resources[CharacterFootFrontRightPath]?.texture as PIXI.Texture;
            CharacterHead = resources[CharacterHeadPath]?.texture as PIXI.Texture;
            HotTerrain = resources[HotTerrainPath]?.texture as PIXI.Texture;
            LeftPipeEnd = resources[LeftPipeEndPath]?.texture as PIXI.Texture;
            LockedDoor = resources[LockedDoorPath]?.texture as PIXI.Texture;
            OpenDoor = resources[OpenDoorPath]?.texture as PIXI.Texture;
            OrangeValuable = resources[OrangeValuablePath]?.texture as PIXI.Texture;
            Pipe = resources[PipePath]?.texture as PIXI.Texture;
            RightPipeEnd = resources[RightPipeEndPath]?.texture as PIXI.Texture;
            RockCracks = resources[RockCracksPath]?.texture as PIXI.Texture;

            resolve();
        });
    });
}