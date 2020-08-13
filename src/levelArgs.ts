// This file is generated. Do not touch.
import { resolveNpc } from "./gameObjects/npc";
import { resolveValuableOrange } from "./gameObjects/valuable";
import { resolvePipeLeftEnd } from "./gameObjects/walls";
import { resolvePipeRightEnd } from "./gameObjects/walls";
import { resolveBlock } from "./gameObjects/walls";
import { resolveSlopeLeft } from "./gameObjects/walls";
import { resolveValuableBlue } from "./gameObjects/valuable";
import { resolveDoor } from "./gameObjects/door";
import { resolveGate } from "./gameObjects/gate";
import { resolveSlopeRight } from "./gameObjects/walls";
import { resolvePipeHorizontal } from "./gameObjects/walls";
import { resolvePipeRight } from "./gameObjects/walls";
import { resolvePipeLeft } from "./gameObjects/walls";

export const RightTestArgs = {
    width: 720,
height: 448,
style: 1,
gameObjectsSupplier: () => {
  return {
    // @ts-ignore
Block: resolveBlock({"type":"Block","x":184,"y":192,"width":120,"height":256,"flippedX":false,"flippedY":false,"uid":"55823268"}),
// @ts-ignore
SlopeRight: resolveSlopeRight({"type":"SlopeRight","x":120,"y":192,"width":64,"height":32,"flippedX":false,"flippedY":false,"uid":"55824435"}),
// @ts-ignore
Block_1: resolveBlock({"type":"Block","x":0,"y":224,"width":184,"height":224,"flippedX":false,"flippedY":false,"uid":"55823268"}),
Player: {"type":"Player","x":80,"y":224,"flippedX":false,"flippedY":false,"uid":"55988047"},
// @ts-ignore
Gate: resolveGate({"type":"Gate","x":0,"y":192,"width":32,"height":32,"flippedX":false,"flippedY":false,"uid":"55920197","levelName":"Test","checkpointName":"FromRight"}),
// @ts-ignore
Block_2: resolveBlock({"type":"Block","x":432,"y":184,"width":112,"height":48,"flippedX":false,"flippedY":false,"uid":"55823268"}),
// @ts-ignore
Block_3: resolveBlock({"type":"Block","x":360,"y":312,"width":232,"height":136,"flippedX":false,"flippedY":false,"uid":"55823268"}),
// @ts-ignore
Block_4: resolveBlock({"type":"Block","x":592,"y":184,"width":128,"height":264,"flippedX":false,"flippedY":false,"uid":"55823268"}),
// @ts-ignore
SlopeLeft: resolveSlopeLeft({"type":"SlopeLeft","x":464,"y":152,"width":80,"height":32,"flippedX":false,"flippedY":false,"uid":"55845599"}),
// @ts-ignore
Block_5: resolveBlock({"type":"Block","x":432,"y":104,"width":32,"height":80,"flippedX":false,"flippedY":false,"uid":"55823268"}),
// @ts-ignore
SlopeLeft_1: resolveSlopeLeft({"type":"SlopeLeft","x":304,"y":192,"width":56,"height":32,"flippedX":false,"flippedY":false,"uid":"55845599"}),
// @ts-ignore
Block_6: resolveBlock({"type":"Block","x":304,"y":224,"width":56,"height":224,"flippedX":false,"flippedY":false,"uid":"55823268"}),
// @ts-ignore
PipeHorizontal: resolvePipeHorizontal({"type":"PipeHorizontal","x":544,"y":184,"width":48,"flippedX":false,"flippedY":false,"uid":"55841307"}),
// @ts-ignore
PipeHorizontal_1: resolvePipeHorizontal({"type":"PipeHorizontal","x":544,"y":248,"width":48,"flippedX":false,"flippedY":false,"uid":"55841307"}),
// @ts-ignore
PipeLeftEnd: resolvePipeLeftEnd({"type":"PipeLeftEnd","x":544,"y":248,"flippedX":false,"flippedY":false,"uid":"63428932"}),
// @ts-ignore
Block_7: resolveBlock({"type":"Block","x":208,"y":72,"width":120,"height":48,"flippedX":false,"flippedY":false,"uid":"55823268"}),
// @ts-ignore
Gamer: resolveNpc({"type":"NpcIguana","x":232,"y":72,"flippedX":false,"flippedY":false,"uid":"26367058","name":"Gamer","style":1})
};
}
};

export const TestArgs = {
    width: 632,
height: 320,
style: 0,
gameObjectsSupplier: () => {
  return {
    // @ts-ignore
SlopeRight: resolveSlopeRight({"type":"SlopeRight","x":272,"y":160,"width":96,"height":32,"flippedX":false,"flippedY":false,"uid":"55824435"}),
// @ts-ignore
Block: resolveBlock({"type":"Block","x":184,"y":192,"width":184,"height":128,"flippedX":false,"flippedY":false,"uid":"55823268"}),
// @ts-ignore
PipeLeft: resolvePipeLeft({"type":"PipeLeft","x":128,"y":160,"width":88,"height":32,"flippedX":false,"flippedY":false,"uid":"55866573"}),
// @ts-ignore
PipeHorizontal: resolvePipeHorizontal({"type":"PipeHorizontal","x":72,"y":160,"width":56,"flippedX":false,"flippedY":false,"uid":"55841307"}),
// @ts-ignore
PipeRight: resolvePipeRight({"type":"PipeRight","x":112,"y":104,"width":64,"height":56,"flippedX":false,"flippedY":false,"uid":"55859676"}),
// @ts-ignore
PipeHorizontal_1: resolvePipeHorizontal({"type":"PipeHorizontal","x":176,"y":104,"width":32,"flippedX":false,"flippedY":false,"uid":"55841307"}),
// @ts-ignore
SlopeRight_1: resolveSlopeRight({"type":"SlopeRight","x":120,"y":192,"width":64,"height":32,"flippedX":false,"flippedY":false,"uid":"55824435"}),
// @ts-ignore
Block_1: resolveBlock({"type":"Block","x":48,"y":224,"width":136,"height":120,"flippedX":false,"flippedY":false,"uid":"55823268"}),
// @ts-ignore
Block_2: resolveBlock({"type":"Block","x":0,"y":0,"width":48,"height":328,"flippedX":false,"flippedY":false,"uid":"55823268"}),
// @ts-ignore
Block_3: resolveBlock({"type":"Block","x":368,"y":160,"width":264,"height":160,"flippedX":false,"flippedY":false,"uid":"55823268"}),
// @ts-ignore
Gate: resolveGate({"type":"Gate","x":600,"y":128,"width":32,"height":32,"flippedX":false,"flippedY":false,"uid":"55920197","levelName":"RightTest","checkpointName":""}),
FromRight: {"type":"Checkpoint","x":560,"y":160,"flippedX":false,"flippedY":false,"uid":"55940370","name":"FromRight"},
// @ts-ignore
SecretDoor: resolveDoor({"type":"Door","x":72,"y":192,"flippedX":false,"flippedY":false,"uid":"55913988","levelName":"","checkpointName":"","name":"SecretDoor"}),
Checkpoint: {"type":"Checkpoint","x":112,"y":224,"flippedX":false,"flippedY":false,"uid":"55940370","name":""},
Player: {"type":"Player","x":280,"y":88,"flippedX":false,"flippedY":false,"uid":"55988047"},
// @ts-ignore
ValuableBlue: resolveValuableBlue({"type":"ValuableBlue","x":192,"y":104,"flippedX":false,"flippedY":false,"uid":"55991906"}),
// @ts-ignore
SlopeLeft: resolveSlopeLeft({"type":"SlopeLeft","x":344,"y":80,"width":80,"height":32,"flippedX":false,"flippedY":false,"uid":"55845599"}),
// @ts-ignore
Block_4: resolveBlock({"type":"Block","x":312,"y":80,"width":32,"height":32,"flippedX":false,"flippedY":false,"uid":"55823268"}),
// @ts-ignore
PipeRightEnd: resolvePipeRightEnd({"type":"PipeRightEnd","x":208,"y":104,"flippedX":false,"flippedY":false,"uid":"63418353"}),
// @ts-ignore
PipeLeftEnd: resolvePipeLeftEnd({"type":"PipeLeftEnd","x":72,"y":160,"flippedX":false,"flippedY":false,"uid":"63428932"}),
// @ts-ignore
ValuableOrange: resolveValuableOrange({"type":"ValuableOrange","x":88,"y":160,"flippedX":false,"flippedY":false,"uid":"56004563"}),
// @ts-ignore
Ronald: resolveNpc({"type":"NpcIguana","x":416,"y":160,"flippedX":true,"flippedY":false,"uid":"26367058","name":"Ronald","style":0})
};
}
};