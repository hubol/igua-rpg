import {stringify} from "../../utils/string/stringify";
import {environment} from "../environment";

const container = document.createElement('aside');
container.className = "devMessageContainer";
document.body.appendChild(container);

export function showDevMessage(message) {
    const string = stringify(message);
    if (environment.isProduction)
        return console.debug('dev message', string);
    const p = document.createElement('p');
    p.textContent = string;
    container.appendChild(p);
    setTimeout(() => p.remove(), 2000);
}
