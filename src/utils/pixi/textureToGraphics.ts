import {Graphics, Texture} from "pixi.js";
import {range} from "../range";
import {textureToRgbaArray} from "./textureToRgbaArray";

export function textureToGraphics(t: Texture) {
    const rects = listRectangles(t);
    const g = new Graphics().beginFill(0xFFFFFF, 1);
    for (const [x, y, width, height] of rects) {
        g.drawRect(x, y, width, height);
    }
    return g;
}

/** Generate rectangles needed to describe the given texture */
function listRectangles(t: Texture){
    const rgba = textureToRgbaArray(t);
    const { width, height } = t;
    const bool: boolean[][] = range(width).map(() => []);
    for (let x = 0; x < width; x++) {
        for (let y = 0; y < height; y++) {
            const i = x + y * width;
            const a = rgba[i * 4 + 3];
            bool[x][y] = a > 0;
        }
    }

    return listRectanglesImpl(width, height, bool);
}

/*
 * 	Object descriptors based on a list of rectangles: method and algorithm (download the PDF file)
    M. Van Droogenbroeck and Sbastien Pirard
    10th international symposium on mathematical morphology (ISMM)
    July 2011 - Intra, Italy
 */

type R = [x: number, y: number, width: number, height: number];

function listRectanglesImpl(w: number, h: number, src: boolean[][]): R[]{
    const distNorth: number[][] = range(w).map(() => []);
    for (let col=0; col < w; col++){
        distNorth[col][0] = src[col][0]?0:-1;
    }
    for (let row=1; row<h; row++){
        for (let col=0; col<w; col++){
            if (!src[col][row])
                distNorth[col][row] = -1;
            else
                distNorth[col][row] = distNorth[col][row-1] + 1;
        }
    }

    const distSouth: number[][] = range(w).map(() => []);
    for (let col=0; col<w; col++){
        distSouth[col][h-1] = src[col][h-1]?0:-1;
    }
    for (let row=h-2; row >= 0; row--){
        for (let col=0; col<w; col++){
            if (!src[col][row])
                distSouth[col][row] = -1;
            else
                distSouth[col][row] = distSouth[col][row+1] + 1;
        }
    }

    const res: R[] = [];
    for (let col=w-1; col>=0; col--){
        let maxS = h;
        for (let row = h-1; row >= 0; row--){
            maxS++;
            if (src[col][row] && (col == 0 || !src[col-1][row])) {
                let N = distNorth[col][row];
                let S = distSouth[col][row];
                let width = 1;
                while (col + width < w && src[col + width][row]){
                    const nextN = distNorth[col+width][row];
                    const nextS = distSouth[col+width][row];
                    if ((nextN < N) || (nextS < S)){
                        if (S < maxS)
                            res.push([col, row - N, width, N + S + 1]);
                        if (nextN < N)
                            N = nextN;
                        if (nextS < S)
                            S = nextS;
                    }
                    width++;
                }
                if (S < maxS)
                    res.push([col, row - N, width, N + S + 1]);
                maxS = 0;
            }
        }
    }

    return res;
}