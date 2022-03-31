import {Vector, vnew} from "../../utils/math/vector";
import {range} from "../../utils/range";

interface Node extends Vector {
    hspeed: number;
    vspeed: number;
    radius: number;
}

function node(v: Vector, radius: number): Node {
    return {
        x: v.x,
        y: v.y,
        hspeed: 0,
        vspeed: 0,
        radius
    }
}

export function springChain(v: Vector, count: number, restLength: number, unit: Vector, radius = restLength / 2) {
    const nodes = range(count).map(i => node(v.vcpy().add(unit, restLength * i), radius));

    function place(v: Vector) {
        const diff = v.vcpy().add(nodes[0], -1);
        if (diff.x === 0 && diff.y === 0)
            return;
        nodes.forEach(x => x.add(diff));
    }

    function compute() {
        for (let i = 1; i < nodes.length; i++) {
            const prev = nodes[i - 1];
            const self = nodes[i];
            const next = nodes[i + 1];

            if (next)
                rigid(self, next, restLength);
            if (prev)
                rigid(self, prev, restLength);
        }
    }

    function apply() {
        nodes.forEach(x => x.add(x.hspeed, x.vspeed));
    }

    return {
        nodes,
        place,
        compute,
        apply,
    }
}

const d = vnew();

function rigid(a: Node, b: Node, restLength: number) {
    d.at(b).add(a, -1);
    if (d.vlength < restLength)
        return;
    d.normalize();
    const F = d.x * (b.hspeed - a.hspeed) + d.y * (b.vspeed - a.vspeed);
    a.at(b).add(d, -restLength);
    a.hspeed += F * d.x;
    a.vspeed += F * d.y;
}