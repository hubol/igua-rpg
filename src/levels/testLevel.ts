import {createGameObjects} from "../igua/createGameObjects";
import {Test} from "../ogmoLevels";

export function testLevel()
{
    const gameObjects = createGameObjects(Test);
    gameObjects.Block.destroy();
}