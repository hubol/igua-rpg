import {vnew} from "./vector";

export const ToDeg = 180 / Math.PI;
export const ToRad = Math.PI / 180;

export function vdeg(degrees: number) {
    return vnew().at(Math.cos(degrees * ToRad), Math.sin(degrees * ToRad));
}

export function vrad(radians: number) {
    return vnew().at(Math.cos(radians), -Math.sin(radians));
}