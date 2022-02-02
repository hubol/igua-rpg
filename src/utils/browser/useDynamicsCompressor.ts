import {Howler} from "howler";

export function useDynamicsCompressor() {
    if (!Howler.masterGain)
        return;
    let compressor: DynamicsCompressorNode;

    try {
        compressor = new DynamicsCompressorNode(Howler.ctx);
    }
    catch (e) {
        console.warn('Failed to create DynamicsCompressorNode', e);
        return;
    }

    const destination = Howler.ctx.destination;
    compressor.ratio.value = 6;
    compressor.connect(destination);
    Howler.masterGain.disconnect(destination);
    Howler.masterGain.connect(compressor);
}