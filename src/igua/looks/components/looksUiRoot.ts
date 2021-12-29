import {Container} from "pixi.js";
import {merge} from "../../../utils/merge";
import {IguaText} from "../../text";
import {capitalizeFirstLetter} from "../../../utils/capitalizeFirstLetter";

export function looksUiRoot() {
    const c = merge(new Container(), {
        path: [],
        back() {

        },
        into(page: string) {

        }
    });
    const breadcrumbs = IguaText.Large()
        .at(3, 0)
        .withStep(() => {
            breadcrumbs.text = c.path.map(capitalizeFirstLetter).join(" > ");
        });
    breadcrumbs.tint = 0xbbbbbb;
    c.addChild(breadcrumbs);
    return c;
}
