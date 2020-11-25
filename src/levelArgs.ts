// This file is generated. Do not touch.
import { resolveRegion } from "./gameObjects/region";
import { resolvePortalFluid } from "./gameObjects/portalFluid";
import { resolveBlock } from "./gameObjects/walls";
import { resolvePipeHorizontal } from "./gameObjects/walls";
import { resolveGate } from "./gameObjects/gate";
import { resolveDoor } from "./gameObjects/door";
import { resolveNpc } from "./gameObjects/npc";
import { resolveSlopeRight } from "./gameObjects/walls";
import { resolveSign } from "./gameObjects/sign";
import { resolveSlopeLeft } from "./gameObjects/walls";
import { resolveDecalGameObject } from "./gameObjects/decal";
import { CloudLong } from "./textures";
import { KeyRed } from "./textures";
import { SignTavern } from "./textures";
import { SignInn } from "./textures";
import { SpikyBrushB } from "./textures";
import { SpikyBrushA } from "./textures";
import { CrudeHouse } from "./textures";
import { CrudeHouseC } from "./textures";
import { CrateWooden } from "./textures";
import { CrudeHouseB } from "./textures";
import { GlowingCircle } from "./textures";
import { Column } from "./textures";
import { CracksA } from "./textures";
import { Cobweb } from "./textures";
import { resolvePipeLeftEnd } from "./gameObjects/walls";
import { resolvePipeRightEnd } from "./gameObjects/walls";
import { Anchor } from "./textures";
import { resolvePipeLeft } from "./gameObjects/walls";
import { resolvePipeRight } from "./gameObjects/walls";
import { resolveValuableBlue } from "./gameObjects/valuable";
import { PotteryOrangeDamaged } from "./textures";
import { PotteryOrange } from "./textures";
import { Rope } from "./textures";
import { DesertTemple } from "./textures";

export const DesertFieldArgs = {
    width: 1552,
height: 352,
gameObjectsSupplier: () => {
  return {
    DesertTemple: resolveDecalGameObject({
    x: 440,
y: 208,
originX: 0.5,
originY: 1,
scaleX: 1,
scaleY: 1,
rotation: 0,
layerName: "BackgroundDecals",
texture: DesertTemple
}),
SpikyBrushA: resolveDecalGameObject({
    x: 376,
y: 208,
originX: 0.5,
originY: 0.9,
scaleX: 1,
scaleY: 1,
rotation: 0,
layerName: "BackgroundDecals",
texture: SpikyBrushA
}),
SpikyBrushA_1: resolveDecalGameObject({
    x: 352,
y: 208,
originX: 0.5,
originY: 0.9,
scaleX: -1,
scaleY: 1,
rotation: 0,
layerName: "BackgroundDecals",
texture: SpikyBrushA
}),
SpikyBrushB: resolveDecalGameObject({
    x: 360,
y: 200,
originX: 0.5,
originY: 0.5,
scaleX: 1,
scaleY: 1,
rotation: 0,
layerName: "BackgroundDecals",
texture: SpikyBrushB
}),
SpikyBrushB_1: resolveDecalGameObject({
    x: 512,
y: 124,
originX: 0.5,
originY: 0.5,
scaleX: 1,
scaleY: 1,
rotation: 0,
layerName: "BackgroundDecals",
texture: SpikyBrushB
}),
SpikyBrushB_2: resolveDecalGameObject({
    x: 145,
y: 240,
originX: 0.5,
originY: 0.5,
scaleX: 1,
scaleY: 1,
rotation: 0,
layerName: "BackgroundDecals",
texture: SpikyBrushB
}),
SpikyBrushB_3: resolveDecalGameObject({
    x: 1448,
y: 140,
originX: 0.5,
originY: 1,
scaleX: 1,
scaleY: 1,
rotation: 0,
layerName: "BackgroundDecals",
texture: SpikyBrushB
}),
SpikyBrushB_4: resolveDecalGameObject({
    x: 744,
y: 253,
originX: 0.5,
originY: 0.5,
scaleX: -1,
scaleY: 1,
rotation: 0,
layerName: "BackgroundDecals",
texture: SpikyBrushB
}),
SpikyBrushA_2: resolveDecalGameObject({
    x: 1096,
y: 288,
originX: 0.5,
originY: 0.5,
scaleX: 1,
scaleY: 1,
rotation: 0,
layerName: "BackgroundDecals",
texture: SpikyBrushA
}),
SpikyBrushA_3: resolveDecalGameObject({
    x: 1320,
y: 256,
originX: 0.5,
originY: 0.5,
scaleX: -1,
scaleY: 1,
rotation: 0,
layerName: "BackgroundDecals",
texture: SpikyBrushA
}),
Column: resolveDecalGameObject({
    x: 1528,
y: 264,
originX: 0.5,
originY: 1,
scaleX: 1,
scaleY: 1.1,
rotation: 0,
layerName: "BackgroundDecals",
texture: Column
}),
Column_1: resolveDecalGameObject({
    x: 1480,
y: 264,
originX: 0.5,
originY: 1,
scaleX: 1,
scaleY: 1.275,
rotation: 0,
layerName: "BackgroundDecals",
texture: Column
}),
CloudLong: resolveDecalGameObject({
    x: 144,
y: 64,
originX: 0.5,
originY: 0.5,
scaleX: 1,
scaleY: 1,
rotation: 0,
layerName: "Parallax1Decals",
texture: CloudLong
}),
CloudLong_1: resolveDecalGameObject({
    x: 176,
y: 72,
originX: 0.5,
originY: 0.5,
scaleX: 1,
scaleY: 1,
rotation: 0,
layerName: "Parallax1Decals",
texture: CloudLong
}),
CloudLong_2: resolveDecalGameObject({
    x: 336,
y: 104,
originX: 0.5,
originY: 0.5,
scaleX: 1,
scaleY: 1,
rotation: 0,
layerName: "Parallax1Decals",
texture: CloudLong
}),
CloudLong_3: resolveDecalGameObject({
    x: 440,
y: 40,
originX: 0.5,
originY: 0.5,
scaleX: 1,
scaleY: 1,
rotation: 0,
layerName: "Parallax1Decals",
texture: CloudLong
}),
CloudLong_4: resolveDecalGameObject({
    x: 608,
y: 72,
originX: 0.5,
originY: 0.5,
scaleX: 1,
scaleY: 1,
rotation: 0,
layerName: "Parallax1Decals",
texture: CloudLong
}),
CloudLong_5: resolveDecalGameObject({
    x: 640,
y: 80,
originX: 0.5,
originY: 0.5,
scaleX: 1,
scaleY: 1,
rotation: 0,
layerName: "Parallax1Decals",
texture: CloudLong
}),
CloudLong_6: resolveDecalGameObject({
    x: 752,
y: 112,
originX: 0.5,
originY: 0.5,
scaleX: 1,
scaleY: 1,
rotation: 0,
layerName: "Parallax1Decals",
texture: CloudLong
}),
CloudLong_7: resolveDecalGameObject({
    x: 8,
y: 120,
originX: 0.5,
originY: 0.5,
scaleX: 1,
scaleY: 1,
rotation: 0,
layerName: "Parallax1Decals",
texture: CloudLong
}),
CloudLong_8: resolveDecalGameObject({
    x: 848,
y: 184,
originX: 0.5,
originY: 0.5,
scaleX: 1,
scaleY: 1,
rotation: 0,
layerName: "Parallax1Decals",
texture: CloudLong
}),
CloudLong_9: resolveDecalGameObject({
    x: 880,
y: 176,
originX: 0.5,
originY: 0.5,
scaleX: 1,
scaleY: 1,
rotation: 0,
layerName: "Parallax1Decals",
texture: CloudLong
}),
CloudLong_10: resolveDecalGameObject({
    x: 976,
y: 112,
originX: 0.5,
originY: 0.5,
scaleX: 1,
scaleY: 1,
rotation: 0,
layerName: "Parallax1Decals",
texture: CloudLong
}),
CloudLong_11: resolveDecalGameObject({
    x: 1152,
y: 192,
originX: 0.5,
originY: 0.5,
scaleX: 1,
scaleY: 1,
rotation: 0,
layerName: "Parallax1Decals",
texture: CloudLong
}),
CloudLong_12: resolveDecalGameObject({
    x: 1248,
y: 96,
originX: 0.5,
originY: 0.5,
scaleX: 1,
scaleY: 1,
rotation: 0,
layerName: "Parallax1Decals",
texture: CloudLong
}),
CloudLong_13: resolveDecalGameObject({
    x: 1272,
y: 104,
originX: 0.5,
originY: 0.5,
scaleX: 1,
scaleY: 1,
rotation: 0,
layerName: "Parallax1Decals",
texture: CloudLong
}),
CloudLong_14: resolveDecalGameObject({
    x: 1432,
y: 168,
originX: 0.5,
originY: 0.5,
scaleX: 1,
scaleY: 1,
rotation: 0,
layerName: "Parallax1Decals",
texture: CloudLong
}),
CloudLong_15: resolveDecalGameObject({
    x: 1544,
y: 48,
originX: 0.5,
originY: 0.5,
scaleX: 1,
scaleY: 1,
rotation: 0,
layerName: "Parallax1Decals",
texture: CloudLong
}),
// @ts-ignore
Block: resolveBlock({"type":"Block","x":0,"y":248,"width":312,"height":104,"flippedX":false,"flippedY":false,"uid":"55823268","name":""}),
// @ts-ignore
TempleDoor: resolveDoor({"type":"Door","x":400,"y":176,"flippedX":false,"flippedY":false,"uid":"55913988","levelName":"DesertTemple","checkpointName":"","name":"TempleDoor"}),
// @ts-ignore
Sign: resolveSign({"type":"Sign","x":472,"y":208,"flippedX":false,"flippedY":false,"uid":"86706091","title":"Temple","message":"This is the ancient desert temple."}),
Player: {"type":"Player","x":1352,"y":264,"flippedX":false,"flippedY":false,"uid":"55988047","faceRight":true},
// @ts-ignore
Gate: resolveGate({"type":"Gate","x":0,"y":216,"width":32,"height":32,"flippedX":false,"flippedY":false,"uid":"55920197","levelName":"DesertTown","checkpointName":"FromField"}),
FromTown: {"type":"Checkpoint","x":72,"y":248,"flippedX":false,"flippedY":false,"uid":"55940370","name":"FromTown","faceRight":true},
// @ts-ignore
SlopeRight: resolveSlopeRight({"type":"SlopeRight","x":232,"y":208,"width":80,"height":40,"flippedX":false,"flippedY":false,"uid":"55824435"}),
// @ts-ignore
Block_1: resolveBlock({"type":"Block","x":312,"y":208,"width":288,"height":144,"flippedX":false,"flippedY":false,"uid":"55823268","name":""}),
// @ts-ignore
SlopeLeft: resolveSlopeLeft({"type":"SlopeLeft","x":600,"y":208,"width":112,"height":56,"flippedX":false,"flippedY":false,"uid":"55845599"}),
// @ts-ignore
Sign_1: resolveSign({"type":"Sign","x":168,"y":248,"flippedX":false,"flippedY":false,"uid":"86706091","title":"Sand","message":"This is the desert."}),
// @ts-ignore
Block_2: resolveBlock({"type":"Block","x":600,"y":264,"width":168,"height":88,"flippedX":false,"flippedY":false,"uid":"55823268","name":""}),
// @ts-ignore
SlopeLeft_1: resolveSlopeLeft({"type":"SlopeLeft","x":768,"y":264,"width":96,"height":32,"flippedX":false,"flippedY":false,"uid":"55845599"}),
// @ts-ignore
Block_3: resolveBlock({"type":"Block","x":768,"y":296,"width":432,"height":56,"flippedX":false,"flippedY":false,"uid":"55823268","name":""}),
// @ts-ignore
SlopeRight_1: resolveSlopeRight({"type":"SlopeRight","x":1112,"y":264,"width":88,"height":32,"flippedX":false,"flippedY":false,"uid":"55824435"}),
// @ts-ignore
Block_4: resolveBlock({"type":"Block","x":1200,"y":264,"width":352,"height":88,"flippedX":false,"flippedY":false,"uid":"55823268","name":""}),
// @ts-ignore
SlopeRight_2: resolveSlopeRight({"type":"SlopeRight","x":1368,"y":136,"width":32,"height":32,"flippedX":false,"flippedY":true,"uid":"55824435"}),
// @ts-ignore
Block_5: resolveBlock({"type":"Block","x":1400,"y":136,"width":152,"height":32,"flippedX":false,"flippedY":false,"uid":"55823268","name":""}),
// @ts-ignore
SlopeRight_3: resolveSlopeRight({"type":"SlopeRight","x":1400,"y":168,"width":152,"height":32,"flippedX":false,"flippedY":true,"uid":"55824435"}),
// @ts-ignore
Digua: resolveNpc({"type":"NpcIguana","x":1400,"y":136,"flippedX":true,"flippedY":false,"uid":"26367058","name":"Digua","style":4}),
// @ts-ignore
PipeHorizontal: resolvePipeHorizontal({"type":"PipeHorizontal","x":344,"y":136,"width":200,"flippedX":false,"flippedY":false,"uid":"55841307","visible":false}),
// @ts-ignore
Gate_1: resolveGate({"type":"Gate","x":1520,"y":104,"width":32,"height":32,"flippedX":false,"flippedY":false,"uid":"55920197","levelName":"DesertOutskirts","checkpointName":"FromDigua"}),
// @ts-ignore
Gate_2: resolveGate({"type":"Gate","x":1520,"y":232,"width":32,"height":32,"flippedX":false,"flippedY":false,"uid":"55920197","levelName":"DesertOutskirts","checkpointName":""}),
FromOutskirtsTop: {"type":"Checkpoint","x":1488,"y":136,"flippedX":false,"flippedY":false,"uid":"55940370","name":"FromOutskirtsTop","faceRight":false},
FromOutskirtsBottom: {"type":"Checkpoint","x":1488,"y":264,"flippedX":false,"flippedY":false,"uid":"55940370","name":"FromOutskirtsBottom","faceRight":false},
FromTemple: {"type":"Checkpoint","x":384,"y":208,"flippedX":false,"flippedY":false,"uid":"55940370","name":"FromTemple","faceRight":false}
};
}
};

export const DesertInnArgs = {
    width: 512,
height: 256,
gameObjectsSupplier: () => {
  return {
    CracksA: resolveDecalGameObject({
    x: 56,
y: 64,
originX: 0.5,
originY: 0.5,
scaleX: 1,
scaleY: 1,
rotation: 0,
layerName: "BackgroundDecals",
texture: CracksA
}),
CracksA_1: resolveDecalGameObject({
    x: 232,
y: 168,
originX: 0.5,
originY: 0.5,
scaleX: 1,
scaleY: 1,
rotation: -1.5707963267948966,
layerName: "BackgroundDecals",
texture: CracksA
}),
CracksA_2: resolveDecalGameObject({
    x: 480,
y: 128,
originX: 0.5,
originY: 0.5,
scaleX: 1,
scaleY: 1,
rotation: 0,
layerName: "BackgroundDecals",
texture: CracksA
}),
CrateWooden: resolveDecalGameObject({
    x: 456,
y: 136,
originX: 0,
originY: 0,
scaleX: 1,
scaleY: 1,
rotation: 0,
layerName: "BackgroundDecals",
texture: CrateWooden
}),
CrateWooden_1: resolveDecalGameObject({
    x: 424,
y: 136,
originX: 0,
originY: 0,
scaleX: 1,
scaleY: 1,
rotation: 0,
layerName: "BackgroundDecals",
texture: CrateWooden
}),
CrateWooden_2: resolveDecalGameObject({
    x: 440,
y: 112,
originX: 0,
originY: 0,
scaleX: 1,
scaleY: 1,
rotation: 0,
layerName: "BackgroundDecals",
texture: CrateWooden
}),
GlowingCircle: resolveDecalGameObject({
    x: 376,
y: 0,
originX: 0.5,
originY: 0.5,
scaleX: 2.125,
scaleY: 1,
rotation: 0,
layerName: "BackgroundDecals",
texture: GlowingCircle
}),
Rope: resolveDecalGameObject({
    x: 304,
y: 48,
originX: 0.5,
originY: 0,
scaleX: 1,
scaleY: 7,
rotation: 0,
layerName: "BackgroundDecals",
texture: Rope
}),
KeyRed: resolveDecalGameObject({
    x: 306,
y: 103,
originX: 0.286,
originY: 0,
scaleX: 1,
scaleY: 1,
rotation: 0,
layerName: "BackgroundDecals",
texture: KeyRed
}),
Cobweb: resolveDecalGameObject({
    x: 384,
y: 0,
originX: 1,
originY: 0,
scaleX: -1,
scaleY: 1,
rotation: 0,
layerName: "BackgroundDecals",
texture: Cobweb
}),
// @ts-ignore
Door: resolveDoor({"type":"Door","x":32,"y":128,"flippedX":false,"flippedY":false,"uid":"55913988","levelName":"DesertTown","checkpointName":"FromInn","name":""}),
// @ts-ignore
Block: resolveBlock({"type":"Block","x":0,"y":160,"width":512,"height":96,"flippedX":false,"flippedY":false,"uid":"55823268","name":""}),
// @ts-ignore
Block_1: resolveBlock({"type":"Block","x":0,"y":0,"width":16,"height":160,"flippedX":false,"flippedY":false,"uid":"55823268","name":""}),
// @ts-ignore
Block_2: resolveBlock({"type":"Block","x":16,"y":0,"width":336,"height":32,"flippedX":false,"flippedY":false,"uid":"55823268","name":""}),
Player: {"type":"Player","x":80,"y":160,"flippedX":false,"flippedY":false,"uid":"55988047","faceRight":true},
// @ts-ignore
Innkeeper: resolveNpc({"type":"NpcIguana","x":160,"y":160,"flippedX":true,"flippedY":false,"uid":"26367058","name":"Innkeeper","style":3}),
// @ts-ignore
SlopeLeft: resolveSlopeLeft({"type":"SlopeLeft","x":16,"y":32,"width":32,"height":32,"flippedX":false,"flippedY":true,"uid":"55845599"}),
// @ts-ignore
Block_3: resolveBlock({"type":"Block","x":224,"y":32,"width":48,"height":64,"flippedX":false,"flippedY":false,"uid":"55823268","name":""}),
// @ts-ignore
SlopeRight: resolveSlopeRight({"type":"SlopeRight","x":120,"y":32,"width":104,"height":64,"flippedX":false,"flippedY":true,"uid":"55824435"}),
// @ts-ignore
RoomWall: resolveBlock({"type":"Block","x":232,"y":96,"width":32,"height":64,"flippedX":false,"flippedY":false,"uid":"55823268","name":"RoomWall"}),
// @ts-ignore
Block_4: resolveBlock({"type":"Block","x":480,"y":32,"width":32,"height":128,"flippedX":false,"flippedY":false,"uid":"55823268","name":""}),
// @ts-ignore
SlopeRight_1: resolveSlopeRight({"type":"SlopeRight","x":400,"y":32,"width":80,"height":32,"flippedX":false,"flippedY":true,"uid":"55824435"}),
// @ts-ignore
SlopeLeft_1: resolveSlopeLeft({"type":"SlopeLeft","x":272,"y":32,"width":80,"height":32,"flippedX":false,"flippedY":true,"uid":"55845599"}),
// @ts-ignore
Block_5: resolveBlock({"type":"Block","x":400,"y":0,"width":112,"height":32,"flippedX":false,"flippedY":false,"uid":"55823268","name":""}),
SleepHere: {"type":"Anchor","x":384,"y":152,"flippedX":false,"flippedY":false,"uid":"25979726","name":"SleepHere"}
};
}
};

export const DesertOracleArgs = {
    width: 256,
height: 648,
gameObjectsSupplier: () => {
  return {
    PotteryOrange: resolveDecalGameObject({
    x: 96,
y: 400,
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
y: 610,
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
y: 616,
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
y: 616,
originX: 0.5,
originY: 1,
scaleX: 1,
scaleY: 1,
rotation: 0,
layerName: "BackgroundDecals",
texture: PotteryOrange
}),
PotteryOrangeDamaged_1: resolveDecalGameObject({
    x: 64,
y: 480,
originX: 0.5,
originY: 1,
scaleX: 1,
scaleY: 1,
rotation: 0,
layerName: "BackgroundDecals",
texture: PotteryOrangeDamaged
}),
CracksA: resolveDecalGameObject({
    x: 88,
y: 128,
originX: 0.5,
originY: 0.5,
scaleX: 1,
scaleY: 1,
rotation: 0,
layerName: "BackgroundDecals",
texture: CracksA
}),
CracksA_1: resolveDecalGameObject({
    x: 32,
y: 384,
originX: 0.5,
originY: 0.5,
scaleX: 1,
scaleY: -1,
rotation: 0,
layerName: "BackgroundDecals",
texture: CracksA
}),
CracksA_2: resolveDecalGameObject({
    x: 240,
y: 560,
originX: 0.5,
originY: 0.5,
scaleX: -1,
scaleY: 1,
rotation: 0,
layerName: "BackgroundDecals",
texture: CracksA
}),
GlowingCircle: resolveDecalGameObject({
    x: 188,
y: 0,
originX: 0.5,
originY: 0.5,
scaleX: 1.5,
scaleY: 1,
rotation: 0,
layerName: "BackgroundDecals",
texture: GlowingCircle
}),
// @ts-ignore
Block: resolveBlock({"type":"Block","x":0,"y":0,"width":144,"height":112,"flippedX":false,"flippedY":false,"uid":"55823268","name":""}),
// @ts-ignore
Block_1: resolveBlock({"type":"Block","x":0,"y":616,"width":256,"height":32,"flippedX":false,"flippedY":false,"uid":"55823268","name":""}),
// @ts-ignore
Block_2: resolveBlock({"type":"Block","x":0,"y":112,"width":24,"height":504,"flippedX":false,"flippedY":false,"uid":"55823268","name":""}),
// @ts-ignore
Block_3: resolveBlock({"type":"Block","x":232,"y":80,"width":32,"height":584,"flippedX":false,"flippedY":false,"uid":"55823268","name":""}),
// @ts-ignore
Door: resolveDoor({"type":"Door","x":32,"y":200,"flippedX":false,"flippedY":false,"uid":"55913988","levelName":"DesertTown","checkpointName":"FromLeftHouse","name":""}),
Player: {"type":"Player","x":80,"y":232,"flippedX":false,"flippedY":false,"uid":"55988047","faceRight":true},
// @ts-ignore
PipeLeft: resolvePipeLeft({"type":"PipeLeft","x":176,"y":144,"width":56,"height":40,"flippedX":false,"flippedY":false,"uid":"55866573"}),
// @ts-ignore
PipeHorizontal: resolvePipeHorizontal({"type":"PipeHorizontal","x":144,"y":144,"width":32,"flippedX":false,"flippedY":false,"uid":"55841307","visible":true}),
// @ts-ignore
PipeLeftEnd: resolvePipeLeftEnd({"type":"PipeLeftEnd","x":144,"y":144,"flippedX":false,"flippedY":false,"uid":"63428932"}),
// @ts-ignore
ValuableBlue: resolveValuableBlue({"type":"ValuableBlue","x":168,"y":144,"flippedX":false,"flippedY":false,"uid":"55991906"}),
// @ts-ignore
SlopeRight: resolveSlopeRight({"type":"SlopeRight","x":104,"y":584,"width":128,"height":32,"flippedX":false,"flippedY":false,"uid":"55824435"}),
// @ts-ignore
PipeLeft_1: resolvePipeLeft({"type":"PipeLeft","x":112,"y":544,"width":104,"height":56,"flippedX":false,"flippedY":false,"uid":"55866573"}),
// @ts-ignore
PipeRight: resolvePipeRight({"type":"PipeRight","x":112,"y":472,"width":120,"height":72,"flippedX":false,"flippedY":false,"uid":"55859676"}),
// @ts-ignore
PipeLeft_2: resolvePipeLeft({"type":"PipeLeft","x":112,"y":400,"width":120,"height":72,"flippedX":false,"flippedY":false,"uid":"55866573"}),
// @ts-ignore
PipeRight_1: resolvePipeRight({"type":"PipeRight","x":112,"y":336,"width":120,"height":64,"flippedX":false,"flippedY":false,"uid":"55859676"}),
// @ts-ignore
PipeLeft_3: resolvePipeLeft({"type":"PipeLeft","x":168,"y":288,"width":64,"height":48,"flippedX":false,"flippedY":false,"uid":"55866573"}),
// @ts-ignore
PipeHorizontal_1: resolvePipeHorizontal({"type":"PipeHorizontal","x":136,"y":288,"width":32,"flippedX":false,"flippedY":false,"uid":"55841307","visible":true}),
// @ts-ignore
PipeLeftEnd_1: resolvePipeLeftEnd({"type":"PipeLeftEnd","x":136,"y":288,"flippedX":false,"flippedY":false,"uid":"63428932"}),
// @ts-ignore
Oracle: resolveNpc({"type":"NpcIguana","x":48,"y":616,"flippedX":false,"flippedY":false,"uid":"26367058","name":"Oracle","style":0}),
// @ts-ignore
SlopeLeft: resolveSlopeLeft({"type":"SlopeLeft","x":24,"y":232,"width":96,"height":32,"flippedX":false,"flippedY":true,"uid":"55845599"}),
// @ts-ignore
PipeHorizontal_2: resolvePipeHorizontal({"type":"PipeHorizontal","x":80,"y":400,"width":32,"flippedX":false,"flippedY":false,"uid":"55841307","visible":true}),
// @ts-ignore
PipeLeftEnd_2: resolvePipeLeftEnd({"type":"PipeLeftEnd","x":80,"y":400,"flippedX":false,"flippedY":false,"uid":"63428932"}),
// @ts-ignore
SlopeLeft_1: resolveSlopeLeft({"type":"SlopeLeft","x":24,"y":112,"width":64,"height":48,"flippedX":false,"flippedY":true,"uid":"55845599"}),
// @ts-ignore
SlopeLeft_2: resolveSlopeLeft({"type":"SlopeLeft","x":80,"y":480,"width":32,"height":32,"flippedX":false,"flippedY":true,"uid":"55845599"}),
// @ts-ignore
SlopeRight_1: resolveSlopeRight({"type":"SlopeRight","x":48,"y":480,"width":32,"height":32,"flippedX":false,"flippedY":true,"uid":"55824435"}),
// @ts-ignore
SlopeRight_2: resolveSlopeRight({"type":"SlopeRight","x":200,"y":80,"width":32,"height":32,"flippedX":false,"flippedY":true,"uid":"55824435"}),
// @ts-ignore
SlopeLeft_3: resolveSlopeLeft({"type":"SlopeLeft","x":144,"y":80,"width":32,"height":32,"flippedX":false,"flippedY":true,"uid":"55845599"}),
// @ts-ignore
Block_4: resolveBlock({"type":"Block","x":144,"y":0,"width":32,"height":80,"flippedX":false,"flippedY":false,"uid":"55823268","name":""}),
// @ts-ignore
Block_5: resolveBlock({"type":"Block","x":200,"y":0,"width":56,"height":80,"flippedX":false,"flippedY":false,"uid":"55823268","name":""})
};
}
};

export const DesertOutskirtsArgs = {
    width: 368,
height: 416,
gameObjectsSupplier: () => {
  return {
    Column: resolveDecalGameObject({
    x: 24,
y: 296,
originX: 0.5,
originY: 0.5,
scaleX: 1,
scaleY: 1,
rotation: 0,
layerName: "BackgroundDecals",
texture: Column
}),
Column_1: resolveDecalGameObject({
    x: 72,
y: 296,
originX: 0.5,
originY: 0.5,
scaleX: 1,
scaleY: 1,
rotation: 0,
layerName: "BackgroundDecals",
texture: Column
}),
SpikyBrushA: resolveDecalGameObject({
    x: 56,
y: 328,
originX: 0.5,
originY: 0.9,
scaleX: 1,
scaleY: 1,
rotation: 0,
layerName: "BackgroundDecals",
texture: SpikyBrushA
}),
SpikyBrushB: resolveDecalGameObject({
    x: 304,
y: 288,
originX: 0.5,
originY: 0.7,
scaleX: 1,
scaleY: 1,
rotation: 0,
layerName: "BackgroundDecals",
texture: SpikyBrushB
}),
SpikyBrushA_1: resolveDecalGameObject({
    x: 112,
y: 192,
originX: 0.5,
originY: 0.5,
scaleX: -1,
scaleY: 1,
rotation: 0,
layerName: "BackgroundDecals",
texture: SpikyBrushA
}),
TempleUnlockBlob: resolveDecalGameObject({
    x: 328,
y: 120,
originX: 0.5,
originY: 0.5,
scaleX: 1,
scaleY: 1,
rotation: 0,
layerName: "BackgroundDecals",
texture: Anchor
}),
CloudLong: resolveDecalGameObject({
    x: 72,
y: 96,
originX: 0.5,
originY: 0.5,
scaleX: 1,
scaleY: 1,
rotation: 0,
layerName: "Parallax1Decals",
texture: CloudLong
}),
CloudLong_1: resolveDecalGameObject({
    x: 112,
y: 104,
originX: 0.5,
originY: 0.5,
scaleX: 1,
scaleY: 1,
rotation: 0,
layerName: "Parallax1Decals",
texture: CloudLong
}),
CloudLong_2: resolveDecalGameObject({
    x: 216,
y: 224,
originX: 0.5,
originY: 0.5,
scaleX: 1,
scaleY: 1,
rotation: 0,
layerName: "Parallax1Decals",
texture: CloudLong
}),
CloudLong_3: resolveDecalGameObject({
    x: 312,
y: 152,
originX: 0.5,
originY: 0.5,
scaleX: 1,
scaleY: 1,
rotation: 0,
layerName: "Parallax1Decals",
texture: CloudLong
}),
CloudLong_4: resolveDecalGameObject({
    x: 248,
y: 72,
originX: 0.5,
originY: 0.5,
scaleX: 1,
scaleY: 1,
rotation: 0,
layerName: "Parallax1Decals",
texture: CloudLong
}),
// @ts-ignore
Block: resolveBlock({"type":"Block","x":0,"y":328,"width":368,"height":88,"flippedX":false,"flippedY":false,"uid":"55823268","name":""}),
// @ts-ignore
Block_1: resolveBlock({"type":"Block","x":0,"y":200,"width":96,"height":64,"flippedX":false,"flippedY":false,"uid":"55823268","name":""}),
Player: {"type":"Player","x":72,"y":328,"flippedX":false,"flippedY":false,"uid":"55988047","faceRight":true},
// @ts-ignore
SlopeLeft: resolveSlopeLeft({"type":"SlopeLeft","x":96,"y":200,"width":64,"height":64,"flippedX":false,"flippedY":true,"uid":"55845599"}),
// @ts-ignore
PipeHorizontal: resolvePipeHorizontal({"type":"PipeHorizontal","x":144,"y":200,"width":40,"flippedX":false,"flippedY":false,"uid":"55841307","visible":true}),
// @ts-ignore
PipeRightEnd: resolvePipeRightEnd({"type":"PipeRightEnd","x":184,"y":200,"flippedX":false,"flippedY":false,"uid":"63418353"}),
FromDigua: {"type":"Checkpoint","x":72,"y":200,"flippedX":false,"flippedY":false,"uid":"55940370","name":"FromDigua","faceRight":true},
// @ts-ignore
Gate: resolveGate({"type":"Gate","x":0,"y":168,"width":32,"height":32,"flippedX":false,"flippedY":false,"uid":"55920197","levelName":"DesertField","checkpointName":"FromOutskirtsTop"}),
// @ts-ignore
Gate_1: resolveGate({"type":"Gate","x":0,"y":296,"width":32,"height":32,"flippedX":false,"flippedY":false,"uid":"55920197","levelName":"DesertField","checkpointName":"FromOutskirtsBottom"}),
// @ts-ignore
SlopeRight: resolveSlopeRight({"type":"SlopeRight","x":232,"y":296,"width":64,"height":32,"flippedX":false,"flippedY":false,"uid":"55824435"}),
// @ts-ignore
Block_2: resolveBlock({"type":"Block","x":296,"y":296,"width":72,"height":32,"flippedX":false,"flippedY":false,"uid":"55823268","name":""}),
// @ts-ignore
PipeHorizontal_1: resolvePipeHorizontal({"type":"PipeHorizontal","x":288,"y":232,"width":32,"flippedX":false,"flippedY":false,"uid":"55841307","visible":true}),
// @ts-ignore
PipeRightEnd_1: resolvePipeRightEnd({"type":"PipeRightEnd","x":320,"y":232,"flippedX":false,"flippedY":false,"uid":"63418353"}),
// @ts-ignore
PipeLeftEnd: resolvePipeLeftEnd({"type":"PipeLeftEnd","x":288,"y":232,"flippedX":false,"flippedY":false,"uid":"63428932"}),
// @ts-ignore
PipeHorizontal_2: resolvePipeHorizontal({"type":"PipeHorizontal","x":256,"y":128,"width":112,"flippedX":false,"flippedY":false,"uid":"55841307","visible":true}),
// @ts-ignore
PipeLeftEnd_1: resolvePipeLeftEnd({"type":"PipeLeftEnd","x":256,"y":128,"flippedX":false,"flippedY":false,"uid":"63428932"})
};
}
};

export const DesertTempleArgs = {
    width: 512,
height: 256,
gameObjectsSupplier: () => {
  return {
    Key1: resolveDecalGameObject({
    x: 208,
y: 176,
originX: 0.5,
originY: 0.5,
scaleX: 1,
scaleY: 1,
rotation: 0,
layerName: "BackgroundDecals",
texture: KeyRed
}),
Key2: resolveDecalGameObject({
    x: 288,
y: 176,
originX: 0.5,
originY: 0.5,
scaleX: 1,
scaleY: 1,
rotation: 0,
layerName: "BackgroundDecals",
texture: KeyRed
}),
Key3: resolveDecalGameObject({
    x: 368,
y: 176,
originX: 0.5,
originY: 0.5,
scaleX: 1,
scaleY: 1,
rotation: 0,
layerName: "BackgroundDecals",
texture: KeyRed
}),
Cobweb: resolveDecalGameObject({
    x: 32,
y: 160,
originX: 0.5,
originY: 0.5,
scaleX: 1,
scaleY: 1,
rotation: 0,
layerName: "BackgroundDecals",
texture: Cobweb
}),
Cobweb_1: resolveDecalGameObject({
    x: 480,
y: 160,
originX: 0.5,
originY: 0.5,
scaleX: -1,
scaleY: 1,
rotation: 0,
layerName: "BackgroundDecals",
texture: Cobweb
}),
CracksA: resolveDecalGameObject({
    x: 248,
y: 168,
originX: 0.5,
originY: 0.5,
scaleX: 1,
scaleY: 1,
rotation: 0,
layerName: "BackgroundDecals",
texture: CracksA
}),
CracksA_1: resolveDecalGameObject({
    x: 304,
y: 64,
originX: 0.5,
originY: 0.5,
scaleX: -1,
scaleY: 1,
rotation: 0,
layerName: "BackgroundDecals",
texture: CracksA
}),
Column: resolveDecalGameObject({
    x: 152,
y: 224,
originX: 0.5,
originY: 1,
scaleX: 1,
scaleY: 1.125,
rotation: 0,
layerName: "BackgroundDecals",
texture: Column
}),
Column_1: resolveDecalGameObject({
    x: 424,
y: 224,
originX: 0.5,
originY: 1,
scaleX: 1,
scaleY: 1.125,
rotation: 0,
layerName: "BackgroundDecals",
texture: Column
}),
GlowingCircle: resolveDecalGameObject({
    x: 288,
y: -12,
originX: 0.5,
originY: 0.5,
scaleX: 1,
scaleY: 1.75,
rotation: 0,
layerName: "BackgroundDecals",
texture: GlowingCircle
}),
// @ts-ignore
Block: resolveBlock({"type":"Block","x":0,"y":224,"width":512,"height":32,"flippedX":false,"flippedY":false,"uid":"55823268","name":""}),
// @ts-ignore
Door: resolveDoor({"type":"Door","x":32,"y":192,"flippedX":false,"flippedY":false,"uid":"55913988","levelName":"DesertField","checkpointName":"FromTemple","name":""}),
// @ts-ignore
Door1: resolveDoor({"type":"Door","x":192,"y":192,"flippedX":false,"flippedY":false,"uid":"55913988","levelName":"UnrealFlight","checkpointName":"","name":"Door1"}),
// @ts-ignore
Door2: resolveDoor({"type":"Door","x":272,"y":192,"flippedX":false,"flippedY":false,"uid":"55913988","levelName":"DesertField","checkpointName":"","name":"Door2"}),
// @ts-ignore
Door3: resolveDoor({"type":"Door","x":352,"y":192,"flippedX":false,"flippedY":false,"uid":"55913988","levelName":"DesertField","checkpointName":"","name":"Door3"}),
// @ts-ignore
SlopeRight: resolveSlopeRight({"type":"SlopeRight","x":296,"y":0,"width":40,"height":152,"flippedX":false,"flippedY":true,"uid":"55824435"}),
// @ts-ignore
SlopeLeft: resolveSlopeLeft({"type":"SlopeLeft","x":240,"y":0,"width":40,"height":152,"flippedX":false,"flippedY":true,"uid":"55845599"}),
// @ts-ignore
Block_1: resolveBlock({"type":"Block","x":336,"y":0,"width":176,"height":152,"flippedX":false,"flippedY":false,"uid":"55823268","name":""}),
// @ts-ignore
Block_2: resolveBlock({"type":"Block","x":0,"y":0,"width":240,"height":152,"flippedX":false,"flippedY":false,"uid":"55823268","name":""}),
// @ts-ignore
Block_3: resolveBlock({"type":"Block","x":0,"y":152,"width":24,"height":72,"flippedX":false,"flippedY":false,"uid":"55823268","name":""}),
// @ts-ignore
Block_4: resolveBlock({"type":"Block","x":488,"y":152,"width":24,"height":72,"flippedX":false,"flippedY":false,"uid":"55823268","name":""}),
Player: {"type":"Player","x":80,"y":224,"flippedX":false,"flippedY":false,"uid":"55988047","faceRight":true},
// @ts-ignore
Sign: resolveSign({"type":"Sign","x":128,"y":224,"flippedX":false,"flippedY":false,"uid":"86706091","title":"Big Key","message":""}),
// @ts-ignore
BigKey: resolveRegion({"type":"Region","x":263,"y":104,"width":50,"height":28,"flippedX":false,"flippedY":false,"uid":"25971607","name":"BigKey"})
};
}
};

export const DesertTownArgs = {
    width: 2040,
height: 432,
gameObjectsSupplier: () => {
  return {
    LeftHouse: resolveDecalGameObject({
    x: 816,
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
    x: 1288,
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
    x: 768,
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
    x: 796,
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
    x: 1072,
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
    x: 1044,
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
    x: 1320,
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
    x: 1336,
y: 304,
originX: 0.5,
originY: 1,
scaleX: 1,
scaleY: 1,
rotation: 0,
layerName: "BackgroundDecals",
texture: SpikyBrushB
}),
Crate9: resolveDecalGameObject({
    x: 1708,
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
    x: 1736,
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
    x: 1766,
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
    x: 1794,
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
    x: 1722,
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
    x: 1780,
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
    x: 1751,
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
    x: 1736,
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
    x: 1766,
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
    x: 1751,
y: 176,
originX: 0,
originY: 0,
scaleX: 1,
scaleY: 1,
rotation: 0,
layerName: "BackgroundDecals",
texture: CrateWooden
}),
SpikyBrushA_3: resolveDecalGameObject({
    x: 1696,
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
    x: 1824,
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
    x: 1536,
y: 288,
originX: 0.5,
originY: 0.5,
scaleX: 1,
scaleY: 1,
rotation: -0.17453292519943295,
layerName: "BackgroundDecals",
texture: SpikyBrushB
}),
InnBuilding: resolveDecalGameObject({
    x: 616,
y: 240,
originX: 0.5,
originY: 1,
scaleX: 1,
scaleY: 1,
rotation: 0,
layerName: "BackgroundDecals",
texture: CrudeHouseC
}),
BarBuilding: resolveDecalGameObject({
    x: 400,
y: 240,
originX: 0.5,
originY: 1,
scaleX: 1,
scaleY: 1,
rotation: 0,
layerName: "BackgroundDecals",
texture: CrudeHouse
}),
SpikyBrushA_4: resolveDecalGameObject({
    x: 476,
y: 243,
originX: 0.5,
originY: 1,
scaleX: -1,
scaleY: 1,
rotation: 0,
layerName: "BackgroundDecals",
texture: SpikyBrushA
}),
SpikyBrushB_5: resolveDecalGameObject({
    x: 672,
y: 244,
originX: 0.5,
originY: 1,
scaleX: 1,
scaleY: 1,
rotation: 0,
layerName: "BackgroundDecals",
texture: SpikyBrushB
}),
SpikyBrushB_6: resolveDecalGameObject({
    x: 368,
y: 196,
originX: 0.5,
originY: 1,
scaleX: 1,
scaleY: 1,
rotation: 0,
layerName: "BackgroundDecals",
texture: SpikyBrushB
}),
SignInn: resolveDecalGameObject({
    x: 584,
y: 198,
originX: 0.5,
originY: 0.5,
scaleX: 1,
scaleY: 1,
rotation: 0,
layerName: "BackgroundDecals",
texture: SignInn
}),
SignTavern: resolveDecalGameObject({
    x: 440,
y: 200,
originX: 0.5,
originY: 0.5,
scaleX: 1,
scaleY: 1,
rotation: 0,
layerName: "BackgroundDecals",
texture: SignTavern
}),
DigKey: resolveDecalGameObject({
    x: 208,
y: 280,
originX: 0.5,
originY: 0.5,
scaleX: 1,
scaleY: 1,
rotation: 0,
layerName: "BackgroundDecals",
texture: KeyRed
}),
CloudLong: resolveDecalGameObject({
    x: 648,
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
    x: 752,
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
    x: 940,
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
    x: 904,
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
    x: 1152,
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
    x: 1412,
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
    x: 1384,
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
    x: 1596,
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
    x: 1636,
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
    x: 1508,
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
    x: 1828,
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
    x: 1860,
y: 167,
originX: 0.5,
originY: 0.5,
scaleX: 1,
scaleY: -1,
rotation: 0,
layerName: "Parallax1Decals",
texture: CloudLong
}),
CloudLong_12: resolveDecalGameObject({
    x: 352,
y: 144,
originX: 0.5,
originY: 0.5,
scaleX: 1,
scaleY: 1,
rotation: 0,
layerName: "Parallax1Decals",
texture: CloudLong
}),
CloudLong_13: resolveDecalGameObject({
    x: 380,
y: 150,
originX: 0.5,
originY: 0.5,
scaleX: 1,
scaleY: 1,
rotation: 0,
layerName: "Parallax1Decals",
texture: CloudLong
}),
CloudLong_14: resolveDecalGameObject({
    x: 512,
y: 112,
originX: 0.5,
originY: 0.5,
scaleX: 1,
scaleY: -1,
rotation: 0,
layerName: "Parallax1Decals",
texture: CloudLong
}),
CloudLong_15: resolveDecalGameObject({
    x: 216,
y: 88,
originX: 0.5,
originY: 0.5,
scaleX: 1,
scaleY: 1,
rotation: 0,
layerName: "Parallax1Decals",
texture: CloudLong
}),
CloudLong_16: resolveDecalGameObject({
    x: 144,
y: 136,
originX: 0.5,
originY: 0.5,
scaleX: 1,
scaleY: 1,
rotation: 0,
layerName: "Parallax1Decals",
texture: CloudLong
}),
CloudLong_17: resolveDecalGameObject({
    x: 112,
y: 144,
originX: 0.5,
originY: 0.5,
scaleX: -1,
scaleY: 1,
rotation: 0,
layerName: "Parallax1Decals",
texture: CloudLong
}),
CloudLong_18: resolveDecalGameObject({
    x: 2032,
y: 136,
originX: 0.5,
originY: 0.5,
scaleX: 1,
scaleY: 1,
rotation: 0,
layerName: "Parallax1Decals",
texture: CloudLong
}),
// @ts-ignore
Block: resolveBlock({"type":"Block","x":0,"y":240,"width":184,"height":192,"flippedX":false,"flippedY":false,"uid":"55823268","name":""}),
// @ts-ignore
SlopeRight: resolveSlopeRight({"type":"SlopeRight","x":680,"y":208,"width":72,"height":32,"flippedX":false,"flippedY":false,"uid":"55824435"}),
// @ts-ignore
Block_1: resolveBlock({"type":"Block","x":752,"y":208,"width":128,"height":48,"flippedX":false,"flippedY":false,"uid":"55823268","name":""}),
// @ts-ignore
SlopeLeft: resolveSlopeLeft({"type":"SlopeLeft","x":880,"y":208,"width":72,"height":48,"flippedX":false,"flippedY":false,"uid":"55845599"}),
// @ts-ignore
Block_2: resolveBlock({"type":"Block","x":952,"y":256,"width":136,"height":176,"flippedX":false,"flippedY":false,"uid":"55823268","name":""}),
// @ts-ignore
SlopeLeft_1: resolveSlopeLeft({"type":"SlopeLeft","x":1088,"y":256,"width":96,"height":48,"flippedX":false,"flippedY":false,"uid":"55845599"}),
// @ts-ignore
Block_3: resolveBlock({"type":"Block","x":1184,"y":304,"width":424,"height":136,"flippedX":false,"flippedY":false,"uid":"55823268","name":""}),
// @ts-ignore
Block_4: resolveBlock({"type":"Block","x":1088,"y":304,"width":96,"height":128,"flippedX":false,"flippedY":false,"uid":"55823268","name":""}),
// @ts-ignore
Block_5: resolveBlock({"type":"Block","x":752,"y":256,"width":200,"height":176,"flippedX":false,"flippedY":false,"uid":"55823268","name":""}),
// @ts-ignore
LeftHouseDoor: resolveDoor({"type":"Door","x":832,"y":176,"flippedX":false,"flippedY":false,"uid":"55913988","levelName":"DesertOracle","checkpointName":"","name":"LeftHouseDoor"}),
// @ts-ignore
RightHouseDoor: resolveDoor({"type":"Door","x":1256,"y":272,"flippedX":false,"flippedY":false,"uid":"55913988","levelName":"","checkpointName":"","name":"RightHouseDoor"}),
Player: {"type":"Player","x":984,"y":256,"flippedX":false,"flippedY":false,"uid":"55988047","faceRight":false},
// @ts-ignore
Sign: resolveSign({"type":"Sign","x":1056,"y":256,"flippedX":false,"flippedY":false,"uid":"86706091","title":"Town","message":"Welcome to the desert town."}),
FromLeftHouse: {"type":"Checkpoint","x":876,"y":208,"flippedX":false,"flippedY":false,"uid":"55940370","name":"FromLeftHouse","faceRight":true},
// @ts-ignore
SlopeRight_1: resolveSlopeRight({"type":"SlopeRight","x":1512,"y":272,"width":96,"height":32,"flippedX":false,"flippedY":false,"uid":"55824435"}),
// @ts-ignore
Block_6: resolveBlock({"type":"Block","x":1608,"y":272,"width":432,"height":160,"flippedX":false,"flippedY":false,"uid":"55823268","name":""}),
// @ts-ignore
Stacker: resolveNpc({"type":"NpcIguana","x":1624,"y":272,"flippedX":false,"flippedY":false,"uid":"26367058","name":"Stacker","style":1}),
// @ts-ignore
PickupCratesRegion: resolveRegion({"type":"Region","x":1712,"y":256,"width":104,"height":16,"flippedX":false,"flippedY":false,"uid":"25971607","name":"PickupCratesRegion"}),
DropCrateAnchor: {"type":"Anchor","x":1384,"y":280,"flippedX":false,"flippedY":false,"uid":"25979726","name":"DropCrateAnchor"},
// @ts-ignore
DropCrateRegion: resolveRegion({"type":"Region","x":1376,"y":288,"width":40,"height":16,"flippedX":false,"flippedY":false,"uid":"25971607","name":"DropCrateRegion"}),
// @ts-ignore
InnDoor: resolveDoor({"type":"Door","x":568,"y":208,"flippedX":false,"flippedY":false,"uid":"55913988","levelName":"DesertInn","checkpointName":"","name":"InnDoor"}),
// @ts-ignore
BarDoor: resolveDoor({"type":"Door","x":424,"y":208,"flippedX":false,"flippedY":false,"uid":"55913988","levelName":"","checkpointName":"","name":"BarDoor"}),
FromInn: {"type":"Checkpoint","x":552,"y":240,"flippedX":false,"flippedY":false,"uid":"55940370","name":"FromInn","faceRight":false},
// @ts-ignore
Gate: resolveGate({"type":"Gate","x":2008,"y":240,"width":32,"height":32,"flippedX":false,"flippedY":false,"uid":"55920197","levelName":"DesertField","checkpointName":"FromTown"}),
FromField: {"type":"Checkpoint","x":1960,"y":272,"flippedX":false,"flippedY":false,"uid":"55940370","name":"FromField","faceRight":false},
// @ts-ignore
PipeHorizontal: resolvePipeHorizontal({"type":"PipeHorizontal","x":415,"y":160,"width":40,"flippedX":false,"flippedY":false,"uid":"55841307","visible":false}),
// @ts-ignore
PipeHorizontal_1: resolvePipeHorizontal({"type":"PipeHorizontal","x":359,"y":190,"width":56,"flippedX":false,"flippedY":false,"uid":"55841307","visible":false}),
// @ts-ignore
PipeHorizontal_2: resolvePipeHorizontal({"type":"PipeHorizontal","x":571,"y":187,"width":42,"flippedX":false,"flippedY":false,"uid":"55841307","visible":false}),
// @ts-ignore
PipeHorizontal_3: resolvePipeHorizontal({"type":"PipeHorizontal","x":611,"y":153,"width":32,"flippedX":false,"flippedY":false,"uid":"55841307","visible":false}),
// @ts-ignore
PipeHorizontal_4: resolvePipeHorizontal({"type":"PipeHorizontal","x":758,"y":185,"width":32,"flippedX":false,"flippedY":false,"uid":"55841307","visible":false}),
// @ts-ignore
PipeHorizontal_5: resolvePipeHorizontal({"type":"PipeHorizontal","x":813,"y":156,"width":48,"flippedX":false,"flippedY":false,"uid":"55841307","visible":false}),
// @ts-ignore
PipeHorizontal_6: resolvePipeHorizontal({"type":"PipeHorizontal","x":782,"y":122,"width":32,"flippedX":false,"flippedY":false,"uid":"55841307","visible":false}),
// @ts-ignore
PipeHorizontal_7: resolvePipeHorizontal({"type":"PipeHorizontal","x":1246,"y":254,"width":56,"flippedX":false,"flippedY":false,"uid":"55841307","visible":false}),
// @ts-ignore
PipeHorizontal_8: resolvePipeHorizontal({"type":"PipeHorizontal","x":1302,"y":224,"width":40,"flippedX":false,"flippedY":false,"uid":"55841307","visible":false}),
// @ts-ignore
PipeHorizontal_9: resolvePipeHorizontal({"type":"PipeHorizontal","x":639,"y":213,"width":32,"flippedX":false,"flippedY":false,"uid":"55841307","visible":false}),
// @ts-ignore
Block_7: resolveBlock({"type":"Block","x":304,"y":240,"width":448,"height":192,"flippedX":false,"flippedY":false,"uid":"55823268","name":""}),
// @ts-ignore
Dig1: resolveBlock({"type":"Block","x":232,"y":240,"width":16,"height":16,"flippedX":false,"flippedY":false,"uid":"55823268","name":"Dig1"}),
// @ts-ignore
Dig2: resolveBlock({"type":"Block","x":216,"y":240,"width":16,"height":16,"flippedX":false,"flippedY":false,"uid":"55823268","name":"Dig2"}),
// @ts-ignore
Dig5: resolveBlock({"type":"Block","x":216,"y":256,"width":16,"height":16,"flippedX":false,"flippedY":false,"uid":"55823268","name":"Dig5"}),
// @ts-ignore
Dig6: resolveBlock({"type":"Block","x":200,"y":256,"width":16,"height":16,"flippedX":false,"flippedY":false,"uid":"55823268","name":"Dig6"}),
// @ts-ignore
Dig3: resolveBlock({"type":"Block","x":200,"y":240,"width":16,"height":16,"flippedX":false,"flippedY":false,"uid":"55823268","name":"Dig3"}),
// @ts-ignore
Dig4: resolveBlock({"type":"Block","x":184,"y":240,"width":16,"height":16,"flippedX":false,"flippedY":false,"uid":"55823268","name":"Dig4"}),
// @ts-ignore
Dig6_1: resolveBlock({"type":"Block","x":184,"y":256,"width":16,"height":16,"flippedX":false,"flippedY":false,"uid":"55823268","name":"Dig6"}),
// @ts-ignore
Block_8: resolveBlock({"type":"Block","x":184,"y":288,"width":120,"height":144,"flippedX":false,"flippedY":false,"uid":"55823268","name":""}),
// @ts-ignore
Block_9: resolveBlock({"type":"Block","x":248,"y":240,"width":56,"height":48,"flippedX":false,"flippedY":false,"uid":"55823268","name":""}),
// @ts-ignore
Block_10: resolveBlock({"type":"Block","x":232,"y":256,"width":16,"height":32,"flippedX":false,"flippedY":false,"uid":"55823268","name":""}),
// @ts-ignore
StartDigging: resolveRegion({"type":"Region","x":168,"y":168,"width":64,"height":72,"flippedX":false,"flippedY":false,"uid":"25971607","name":"StartDigging"})
};
}
};

export const UnrealFlightArgs = {
    width: 728,
height: 312,
gameObjectsSupplier: () => {
  return {
    // @ts-ignore
Block: resolveBlock({"type":"Block","x":0,"y":256,"width":152,"height":56,"flippedX":false,"flippedY":false,"uid":"55823268","name":""}),
// @ts-ignore
Block_1: resolveBlock({"type":"Block","x":152,"y":128,"width":32,"height":184,"flippedX":false,"flippedY":false,"uid":"55823268","name":""}),
// @ts-ignore
Block_2: resolveBlock({"type":"Block","x":152,"y":0,"width":32,"height":48,"flippedX":false,"flippedY":false,"uid":"55823268","name":""}),
Player: {"type":"Player","x":72,"y":256,"flippedX":false,"flippedY":false,"uid":"55988047","faceRight":true},
// @ts-ignore
PortalFluid: resolvePortalFluid({"type":"PortalFluid","x":184,"y":0,"width":224,"height":32,"flippedX":false,"flippedY":false,"uid":"24775263"}),
// @ts-ignore
PortalFluid_1: resolvePortalFluid({"type":"PortalFluid","x":184,"y":144,"width":160,"height":168,"flippedX":false,"flippedY":false,"uid":"24775263"}),
// @ts-ignore
PortalFluid_2: resolvePortalFluid({"type":"PortalFluid","x":408,"y":0,"width":232,"height":208,"flippedX":false,"flippedY":false,"uid":"24775263"}),
// @ts-ignore
PortalFluid_3: resolvePortalFluid({"type":"PortalFluid","x":344,"y":280,"width":384,"height":32,"flippedX":false,"flippedY":false,"uid":"24775263"}),
// @ts-ignore
PortalFluid_4: resolvePortalFluid({"type":"PortalFluid","x":696,"y":0,"width":32,"height":280,"flippedX":false,"flippedY":false,"uid":"24775263"}),
// @ts-ignore
PortalFluid_5: resolvePortalFluid({"type":"PortalFluid","x":440,"y":208,"width":200,"height":8,"flippedX":false,"flippedY":false,"uid":"24775263"}),
// @ts-ignore
PortalFluid_6: resolvePortalFluid({"type":"PortalFluid","x":472,"y":216,"width":168,"height":8,"flippedX":false,"flippedY":false,"uid":"24775263"}),
// @ts-ignore
BigKeyPiece: resolveRegion({"type":"Region","x":643,"y":8,"width":50,"height":8,"flippedX":false,"flippedY":false,"uid":"25971607","name":"BigKeyPiece"})
};
}
};