import {Howler} from "howler";

export function useDynamicsCompressor() {
    if (!Howler.masterGain || !DynamicsCompressorNode)
        return;
    const destination = Howler.ctx.destination;
    const compressor = new DynamicsCompressorNode(Howler.ctx);
    compressor.ratio.value = 6;
    compressor.connect(destination);
    Howler.masterGain.disconnect(destination);
    Howler.masterGain.connect(compressor);
}