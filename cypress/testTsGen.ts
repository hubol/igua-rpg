import {Export} from "./ts-gen/export";
import {Const} from "./ts-gen/const";
import {AnonymousFunction, Returns} from "./ts-gen/function";
import {Invocation} from "./ts-gen/invocation";
import {ImportedFunction} from "./ts-gen/imported";
import {Module} from "./ts-gen/module";

export function testTsGen()
{
    const exports = [
        new Export(new Const("RightTest", {
            width: 69,
            height: 420,
            style: 300,
            wtf: [0, "1", 2],
            entities: new AnonymousFunction(new Returns({
                Block: new Invocation(new ImportedFunction("resolveBlock", "/src/gameObjects/walls"), { x: 0, y: 0, type: "Block" }).tsIgnore()
            }))
        })),
        new Export(new Const("LeftTest", {
            width: 69,
            height: 420,
            style: 300,
            entities: new AnonymousFunction(new Returns({
                Block: new Invocation(new ImportedFunction("resolveGate", "/src/gameObjects/gate"), { x: 0, y: 0, type: "Block" })
            }))
        })),
        new Export(new Const("Stupid", new AnonymousFunction(new Returns(new Invocation(new ImportedFunction("fuckYou", "/src/fuckYou")).tsIgnore())))),
        new Export(new Const("Stupid2", [ new Invocation(new ImportedFunction("resolveMe", "/src/stupid")).tsIgnore() ])),
        new Export(new Const("Stupid3", new Invocation(new ImportedFunction("resolveMe", "/src/stupid")).tsIgnore()))
    ];
    return new Module("/src/hello", exports);
}