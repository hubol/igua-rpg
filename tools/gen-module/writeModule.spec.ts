import {Export} from "./components/export";
import {Const} from "./components/const";
import {AnonymousFunction, Returns} from "./components/function";
import {Invocation} from "./components/invocation";
import {ImportedConst} from "./components/imported";
import {Module} from "./components/module";

export function testTsGen()
{
    const exports = [
        new Export(new Const("RightTest", {
            width: 69,
            height: 420,
            style: 300,
            wtf: [0, "1", 2],
            entities: new AnonymousFunction(new Returns({
                Block: new Invocation(new ImportedConst("resolveBlock", "/src/gameObjects/walls"), { x: 0, y: 0, type: "Block" }).tsIgnore()
            }))
        })),
        new Export(new Const("LeftTest", {
            width: 69,
            height: 420,
            style: 300,
            entities: new AnonymousFunction(new Returns({
                Block: new Invocation(new ImportedConst("resolveGate", "/src/gameObjects/gate"), { x: 0, y: 0, type: "Block" })
            }))
        })),
        new Export(new Const("Stupid", new AnonymousFunction(new Returns(new Invocation(new ImportedConst("fuckYou", "/src/fuckYou")).tsIgnore())))),
        new Export(new Const("Stupid2", [ new Invocation(new ImportedConst("resolveMe", "/src/stupid")).tsIgnore() ])),
        new Export(new Const("Stupid3", new Invocation(new ImportedConst("resolveMe", "/src/stupid")).tsIgnore())),
        new Export(new Const("Ass", {
            sexy: 100,
            myObj: new ImportedConst("Steven", "/src/steven")
        }))
    ];
    return new Module("/src/hello", exports);
}