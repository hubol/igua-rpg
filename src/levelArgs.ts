// This file is generated. Do not touch.
import { resolveRegion } from "./gameObjects/region";
import { resolveNpc } from "./gameObjects/npc";
import { resolveBlock } from "./gameObjects/walls";
import { resolveSlopeRight } from "./gameObjects/walls";
import { resolveSign } from "./gameObjects/sign";
import { resolveDoor } from "./gameObjects/door";
import { resolveSlopeLeft } from "./gameObjects/walls";
import { resolveDecalGameObject } from "./gameObjects/decal";
import { CloudLong } from "./textures";
import { SpikyBrushB } from "./textures";
import { SpikyBrushA } from "./textures";
import { CrateWooden } from "./textures";
import { CrudeHouse } from "./textures";
import { CrudeHouseB } from "./textures";
import { resolvePipeLeftEnd } from "./gameObjects/walls";
import { resolvePipeHorizontal } from "./gameObjects/walls";
import { resolvePipeLeft } from "./gameObjects/walls";
import { resolvePipeRight } from "./gameObjects/walls";
import { resolveValuableBlue } from "./gameObjects/valuable";
import { PotteryOrangeDamaged } from "./textures";
import { PotteryOrange } from "./textures";

export const DesertOracleArgs = {
    width: 256,
height: 568,
gameObjectsSupplier: () => {
  return {
    PotteryOrange: resolveDecalGameObject({
    x: 96,
y: 320,
originX: 0.5,
originY: 1,
scaleX: 1,
scaleY: 1,
rotation: 0,
layerName: "BackgroundDecals",
texture: PotteryOrange
}),
PotteryOrange_1: resolveDecalGameObject({
    x: 126,
y: 530,
originX: 0.5,
originY: 1,
scaleX: 1,
scaleY: 1,
rotation: 0,
layerName: "BackgroundDecals",
texture: PotteryOrange
}),
PotteryOrangeDamaged: resolveDecalGameObject({
    x: 104,
y: 536,
originX: 0.5,
originY: 1,
scaleX: 1,
scaleY: 1,
rotation: 0,
layerName: "BackgroundDecals",
texture: PotteryOrangeDamaged
}),
PotteryOrange_2: resolveDecalGameObject({
    x: 32,
y: 536,
originX: 0.5,
originY: 1,
scaleX: 1,
scaleY: 1,
rotation: 0,
layerName: "BackgroundDecals",
texture: PotteryOrange
}),
PotteryOrangeDamaged_1: resolveDecalGameObject({
    x: 40,
y: 64,
originX: 0.5,
originY: 1,
scaleX: 1,
scaleY: 1,
rotation: 0,
layerName: "BackgroundDecals",
texture: PotteryOrangeDamaged
}),
PotteryOrangeDamaged_2: resolveDecalGameObject({
    x: 64,
y: 400,
originX: 0.5,
originY: 1,
scaleX: 1,
scaleY: 1,
rotation: 0,
layerName: "BackgroundDecals",
texture: PotteryOrangeDamaged
}),
// @ts-ignore
Block: resolveBlock({"type":"Block","x":0,"y":-16,"width":256,"height":48,"flippedX":false,"flippedY":false,"uid":"55823268"}),
// @ts-ignore
Block_1: resolveBlock({"type":"Block","x":0,"y":536,"width":256,"height":32,"flippedX":false,"flippedY":false,"uid":"55823268"}),
// @ts-ignore
Block_2: resolveBlock({"type":"Block","x":0,"y":32,"width":24,"height":504,"flippedX":false,"flippedY":false,"uid":"55823268"}),
// @ts-ignore
Block_3: resolveBlock({"type":"Block","x":232,"y":32,"width":32,"height":504,"flippedX":false,"flippedY":false,"uid":"55823268"}),
// @ts-ignore
Door: resolveDoor({"type":"Door","x":32,"y":120,"flippedX":false,"flippedY":false,"uid":"55913988","levelName":"DesertTown","checkpointName":"FromLeftHouse","name":""}),
Player: {"type":"Player","x":80,"y":152,"flippedX":false,"flippedY":false,"uid":"55988047","faceRight":true},
// @ts-ignore
PipeLeft: resolvePipeLeft({"type":"PipeLeft","x":176,"y":64,"width":56,"height":40,"flippedX":false,"flippedY":false,"uid":"55866573"}),
// @ts-ignore
PipeHorizontal: resolvePipeHorizontal({"type":"PipeHorizontal","x":144,"y":64,"width":32,"flippedX":false,"flippedY":false,"uid":"55841307"}),
// @ts-ignore
PipeLeftEnd: resolvePipeLeftEnd({"type":"PipeLeftEnd","x":144,"y":64,"flippedX":false,"flippedY":false,"uid":"63428932"}),
// @ts-ignore
ValuableBlue: resolveValuableBlue({"type":"ValuableBlue","x":168,"y":64,"flippedX":false,"flippedY":false,"uid":"55991906"}),
// @ts-ignore
SlopeRight: resolveSlopeRight({"type":"SlopeRight","x":104,"y":504,"width":128,"height":32,"flippedX":false,"flippedY":false,"uid":"55824435"}),
// @ts-ignore
PipeLeft_1: resolvePipeLeft({"type":"PipeLeft","x":112,"y":464,"width":104,"height":56,"flippedX":false,"flippedY":false,"uid":"55866573"}),
// @ts-ignore
PipeRight: resolvePipeRight({"type":"PipeRight","x":112,"y":392,"width":120,"height":72,"flippedX":false,"flippedY":false,"uid":"55859676"}),
// @ts-ignore
PipeLeft_2: resolvePipeLeft({"type":"PipeLeft","x":112,"y":320,"width":120,"height":72,"flippedX":false,"flippedY":false,"uid":"55866573"}),
// @ts-ignore
PipeRight_1: resolvePipeRight({"type":"PipeRight","x":112,"y":256,"width":120,"height":64,"flippedX":false,"flippedY":false,"uid":"55859676"}),
// @ts-ignore
PipeLeft_3: resolvePipeLeft({"type":"PipeLeft","x":168,"y":208,"width":64,"height":48,"flippedX":false,"flippedY":false,"uid":"55866573"}),
// @ts-ignore
PipeHorizontal_1: resolvePipeHorizontal({"type":"PipeHorizontal","x":136,"y":208,"width":32,"flippedX":false,"flippedY":false,"uid":"55841307"}),
// @ts-ignore
PipeLeftEnd_1: resolvePipeLeftEnd({"type":"PipeLeftEnd","x":136,"y":208,"flippedX":false,"flippedY":false,"uid":"63428932"}),
// @ts-ignore
Oracle: resolveNpc({"type":"NpcIguana","x":48,"y":536,"flippedX":false,"flippedY":false,"uid":"26367058","name":"Oracle","style":0}),
// @ts-ignore
SlopeLeft: resolveSlopeLeft({"type":"SlopeLeft","x":24,"y":152,"width":96,"height":32,"flippedX":false,"flippedY":true,"uid":"55845599"}),
// @ts-ignore
PipeHorizontal_2: resolvePipeHorizontal({"type":"PipeHorizontal","x":80,"y":320,"width":32,"flippedX":false,"flippedY":false,"uid":"55841307"}),
// @ts-ignore
PipeLeftEnd_2: resolvePipeLeftEnd({"type":"PipeLeftEnd","x":80,"y":320,"flippedX":false,"flippedY":false,"uid":"63428932"}),
// @ts-ignore
SlopeLeft_1: resolveSlopeLeft({"type":"SlopeLeft","x":24,"y":64,"width":32,"height":32,"flippedX":false,"flippedY":true,"uid":"55845599"}),
// @ts-ignore
SlopeLeft_2: resolveSlopeLeft({"type":"SlopeLeft","x":80,"y":400,"width":32,"height":32,"flippedX":false,"flippedY":true,"uid":"55845599"}),
// @ts-ignore
SlopeRight_1: resolveSlopeRight({"type":"SlopeRight","x":48,"y":400,"width":32,"height":32,"flippedX":false,"flippedY":true,"uid":"55824435"})
};
}
};

export const DesertTownArgs = {
    width: 1344,
height: 432,
gameObjectsSupplier: () => {
  return {
    LeftHouse: resolveDecalGameObject({
    x: 232,
y: 208,
originX: 0.5,
originY: 1,
scaleX: 1,
scaleY: 1,
rotation: 0,
layerName: "BackgroundDecals",
texture: CrudeHouseB
}),
RightHouse: resolveDecalGameObject({
    x: 704,
y: 304,
originX: 0.5,
originY: 1,
scaleX: 1,
scaleY: 1,
rotation: 0,
layerName: "BackgroundDecals",
texture: CrudeHouse
}),
SpikyBrushA: resolveDecalGameObject({
    x: 184,
y: 208,
originX: 0.5,
originY: 1,
scaleX: 1,
scaleY: 1,
rotation: 0,
layerName: "BackgroundDecals",
texture: SpikyBrushA
}),
SpikyBrushA_1: resolveDecalGameObject({
    x: 212,
y: 123,
originX: 0.5,
originY: 1,
scaleX: -1,
scaleY: 1,
rotation: 0,
layerName: "BackgroundDecals",
texture: SpikyBrushA
}),
SpikyBrushB: resolveDecalGameObject({
    x: 488,
y: 260,
originX: 0.5,
originY: 1,
scaleX: 1,
scaleY: 1,
rotation: 0,
layerName: "BackgroundDecals",
texture: SpikyBrushB
}),
SpikyBrushB_1: resolveDecalGameObject({
    x: 460,
y: 258,
originX: 0.5,
originY: 1,
scaleX: -1,
scaleY: 1,
rotation: 0,
layerName: "BackgroundDecals",
texture: SpikyBrushB
}),
SpikyBrushA_2: resolveDecalGameObject({
    x: 736,
y: 304,
originX: 0.5,
originY: 1,
scaleX: -1,
scaleY: 1,
rotation: 0,
layerName: "BackgroundDecals",
texture: SpikyBrushA
}),
SpikyBrushB_2: resolveDecalGameObject({
    x: 752,
y: 304,
originX: 0.5,
originY: 1,
scaleX: 1,
scaleY: 1,
rotation: 0,
layerName: "BackgroundDecals",
texture: SpikyBrushB
}),
SpikyBrushA_3: resolveDecalGameObject({
    x: 116,
y: 235,
originX: 0.5,
originY: 1,
scaleX: -1,
scaleY: 1,
rotation: -0.3490658503988659,
layerName: "BackgroundDecals",
texture: SpikyBrushA
}),
Crate9: resolveDecalGameObject({
    x: 1124,
y: 248,
originX: 0,
originY: 0,
scaleX: 1,
scaleY: 1,
rotation: 0,
layerName: "BackgroundDecals",
texture: CrateWooden
}),
Crate8: resolveDecalGameObject({
    x: 1152,
y: 248,
originX: 0,
originY: 0,
scaleX: 1,
scaleY: 1,
rotation: 0,
layerName: "BackgroundDecals",
texture: CrateWooden
}),
Crate6: resolveDecalGameObject({
    x: 1182,
y: 248,
originX: 0,
originY: 0,
scaleX: 1,
scaleY: 1,
rotation: 0,
layerName: "BackgroundDecals",
texture: CrateWooden
}),
Crate4: resolveDecalGameObject({
    x: 1210,
y: 248,
originX: 0,
originY: 0,
scaleX: 1,
scaleY: 1,
rotation: 0,
layerName: "BackgroundDecals",
texture: CrateWooden
}),
Crate7: resolveDecalGameObject({
    x: 1138,
y: 224,
originX: 0,
originY: 0,
scaleX: 1,
scaleY: 1,
rotation: 0,
layerName: "BackgroundDecals",
texture: CrateWooden
}),
Crate3: resolveDecalGameObject({
    x: 1196,
y: 224,
originX: 0,
originY: 0,
scaleX: 1,
scaleY: 1,
rotation: 0,
layerName: "BackgroundDecals",
texture: CrateWooden
}),
Crate5: resolveDecalGameObject({
    x: 1167,
y: 224,
originX: 0,
originY: 0,
scaleX: 1,
scaleY: 1,
rotation: 0,
layerName: "BackgroundDecals",
texture: CrateWooden
}),
Crate2: resolveDecalGameObject({
    x: 1152,
y: 200,
originX: 0,
originY: 0,
scaleX: 1,
scaleY: 1,
rotation: 0,
layerName: "BackgroundDecals",
texture: CrateWooden
}),
Crate1: resolveDecalGameObject({
    x: 1182,
y: 200,
originX: 0,
originY: 0,
scaleX: 1,
scaleY: 1,
rotation: 0,
layerName: "BackgroundDecals",
texture: CrateWooden
}),
Crate0: resolveDecalGameObject({
    x: 1167,
y: 176,
originX: 0,
originY: 0,
scaleX: 1,
scaleY: 1,
rotation: 0,
layerName: "BackgroundDecals",
texture: CrateWooden
}),
SpikyBrushA_4: resolveDecalGameObject({
    x: 1112,
y: 264,
originX: 0.5,
originY: 0.5,
scaleX: 1,
scaleY: 1,
rotation: 0,
layerName: "BackgroundDecals",
texture: SpikyBrushA
}),
SpikyBrushB_3: resolveDecalGameObject({
    x: 1240,
y: 264,
originX: 0.5,
originY: 0.5,
scaleX: 1,
scaleY: 1,
rotation: 0,
layerName: "BackgroundDecals",
texture: SpikyBrushB
}),
SpikyBrushB_4: resolveDecalGameObject({
    x: 952,
y: 288,
originX: 0.5,
originY: 0.5,
scaleX: 1,
scaleY: 1,
rotation: -0.17453292519943295,
layerName: "BackgroundDecals",
texture: SpikyBrushB
}),
CloudLong: resolveDecalGameObject({
    x: 64,
y: 136,
originX: 0.5,
originY: 0.5,
scaleX: 1,
scaleY: 1,
rotation: 0,
layerName: "Parallax1Decals",
texture: CloudLong
}),
CloudLong_1: resolveDecalGameObject({
    x: 168,
y: 88,
originX: 0.5,
originY: 0.5,
scaleX: -1,
scaleY: 1,
rotation: 0,
layerName: "Parallax1Decals",
texture: CloudLong
}),
CloudLong_2: resolveDecalGameObject({
    x: 356,
y: 126,
originX: 0.5,
originY: 0.5,
scaleX: 1,
scaleY: 1,
rotation: 0,
layerName: "Parallax1Decals",
texture: CloudLong
}),
CloudLong_3: resolveDecalGameObject({
    x: 320,
y: 120,
originX: 0.5,
originY: 0.5,
scaleX: 1,
scaleY: 1,
rotation: 0,
layerName: "Parallax1Decals",
texture: CloudLong
}),
CloudLong_4: resolveDecalGameObject({
    x: 568,
y: 168,
originX: 0.5,
originY: 0.5,
scaleX: -1,
scaleY: 1,
rotation: 0,
layerName: "Parallax1Decals",
texture: CloudLong
}),
CloudLong_5: resolveDecalGameObject({
    x: 828,
y: 175,
originX: 0.5,
originY: 0.5,
scaleX: 1,
scaleY: 1,
rotation: 0,
layerName: "Parallax1Decals",
texture: CloudLong
}),
CloudLong_6: resolveDecalGameObject({
    x: 800,
y: 168,
originX: 0.5,
originY: 0.5,
scaleX: 1,
scaleY: 1,
rotation: 0,
layerName: "Parallax1Decals",
texture: CloudLong
}),
CloudLong_7: resolveDecalGameObject({
    x: 1012,
y: 183,
originX: 0.5,
originY: 0.5,
scaleX: 1,
scaleY: 1,
rotation: 0,
layerName: "Parallax1Decals",
texture: CloudLong
}),
CloudLong_8: resolveDecalGameObject({
    x: 1052,
y: 191,
originX: 0.5,
originY: 0.5,
scaleX: -1,
scaleY: 1,
rotation: 0,
layerName: "Parallax1Decals",
texture: CloudLong
}),
CloudLong_9: resolveDecalGameObject({
    x: 924,
y: 111,
originX: 0.5,
originY: 0.5,
scaleX: 1,
scaleY: -1,
rotation: 0,
layerName: "Parallax1Decals",
texture: CloudLong
}),
CloudLong_10: resolveDecalGameObject({
    x: 1244,
y: 159,
originX: 0.5,
originY: 0.5,
scaleX: 1,
scaleY: -1,
rotation: 0,
layerName: "Parallax1Decals",
texture: CloudLong
}),
CloudLong_11: resolveDecalGameObject({
    x: 1276,
y: 167,
originX: 0.5,
originY: 0.5,
scaleX: 1,
scaleY: -1,
rotation: 0,
layerName: "Parallax1Decals",
texture: CloudLong
}),
// @ts-ignore
Block: resolveBlock({"type":"Block","x":0,"y":240,"width":168,"height":192,"flippedX":false,"flippedY":false,"uid":"55823268"}),
// @ts-ignore
SlopeRight: resolveSlopeRight({"type":"SlopeRight","x":96,"y":208,"width":72,"height":32,"flippedX":false,"flippedY":false,"uid":"55824435"}),
// @ts-ignore
Block_1: resolveBlock({"type":"Block","x":168,"y":208,"width":128,"height":48,"flippedX":false,"flippedY":false,"uid":"55823268"}),
// @ts-ignore
SlopeLeft: resolveSlopeLeft({"type":"SlopeLeft","x":296,"y":208,"width":72,"height":48,"flippedX":false,"flippedY":false,"uid":"55845599"}),
// @ts-ignore
Block_2: resolveBlock({"type":"Block","x":368,"y":256,"width":136,"height":176,"flippedX":false,"flippedY":false,"uid":"55823268"}),
// @ts-ignore
SlopeLeft_1: resolveSlopeLeft({"type":"SlopeLeft","x":504,"y":256,"width":96,"height":48,"flippedX":false,"flippedY":false,"uid":"55845599"}),
// @ts-ignore
Block_3: resolveBlock({"type":"Block","x":600,"y":304,"width":424,"height":136,"flippedX":false,"flippedY":false,"uid":"55823268"}),
// @ts-ignore
Block_4: resolveBlock({"type":"Block","x":504,"y":304,"width":96,"height":128,"flippedX":false,"flippedY":false,"uid":"55823268"}),
// @ts-ignore
Block_5: resolveBlock({"type":"Block","x":168,"y":256,"width":200,"height":176,"flippedX":false,"flippedY":false,"uid":"55823268"}),
// @ts-ignore
LeftHouseDoor: resolveDoor({"type":"Door","x":248,"y":176,"flippedX":false,"flippedY":false,"uid":"55913988","levelName":"DesertOracle","checkpointName":"","name":"LeftHouseDoor"}),
// @ts-ignore
RightHouseDoor: resolveDoor({"type":"Door","x":672,"y":272,"flippedX":false,"flippedY":false,"uid":"55913988","levelName":"","checkpointName":"","name":"RightHouseDoor"}),
Player: {"type":"Player","x":400,"y":256,"flippedX":false,"flippedY":false,"uid":"55988047","faceRight":false},
// @ts-ignore
Sign: resolveSign({"type":"Sign","x":472,"y":256,"flippedX":false,"flippedY":false,"uid":"86706091","title":"Town","message":"Welcome to the desert town."}),
FromLeftHouse: {"type":"Checkpoint","x":292,"y":208,"flippedX":false,"flippedY":false,"uid":"55940370","name":"FromLeftHouse","faceRight":true},
// @ts-ignore
SlopeRight_1: resolveSlopeRight({"type":"SlopeRight","x":928,"y":272,"width":96,"height":32,"flippedX":false,"flippedY":false,"uid":"55824435"}),
// @ts-ignore
Block_6: resolveBlock({"type":"Block","x":1024,"y":272,"width":320,"height":160,"flippedX":false,"flippedY":false,"uid":"55823268"}),
// @ts-ignore
Stacker: resolveNpc({"type":"NpcIguana","x":1040,"y":272,"flippedX":false,"flippedY":false,"uid":"26367058","name":"Stacker","style":1}),
// @ts-ignore
PickupCratesRegion: resolveRegion({"type":"Region","x":1128,"y":256,"width":104,"height":16,"flippedX":false,"flippedY":false,"uid":"25971607","name":"PickupCratesRegion"}),
DropCrateAnchor: {"type":"Anchor","x":800,"y":280,"flippedX":false,"flippedY":false,"uid":"25979726","name":"DropCrateAnchor"},
// @ts-ignore
DropCrateRegion: resolveRegion({"type":"Region","x":792,"y":288,"width":40,"height":16,"flippedX":false,"flippedY":false,"uid":"25971607","name":"DropCrateRegion"})
};
}
};