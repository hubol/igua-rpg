import {Sprite, Mesh, Transform} from "pixi.js";

// Temporary solution until https://github.com/pixijs/pixijs/pull/7495 is merged

Sprite.prototype.calculateVertices = function calculateVertices() {
    const texture = this._texture;

    if (this._transformID === this.transform._worldID && this._textureID === texture._updateID) {
        return;
    }

    // update texture UV here, because base texture can be changed without calling `_onTextureUpdate`
    if (this._textureID !== texture._updateID) {
        this.uvs = this._texture._uvs.uvsFloat32;
    }

    this._transformID = this.transform._worldID;
    this._textureID = texture._updateID;

    // set the vertex data

    const wt = this.transform.worldTransform;
    const a = wt.a;
    const b = wt.b;
    const c = wt.c;
    const d = wt.d;
    let tx = wt.tx;
    let ty = wt.ty;
    const vertexData = this.vertexData;
    const trim = texture.trim;
    const orig = texture.orig;
    const anchor = this._anchor;

    let w0 = 0;
    let w1 = 0;
    let h0 = 0;
    let h1 = 0;

    if (trim) {
        // if the sprite is trimmed and is not a tilingsprite then we need to add the extra
        // space before transforming the sprite coords.
        w1 = trim.x - (anchor._x * orig.width);
        w0 = trim.width;

        h1 = trim.y - (anchor._y * orig.height);
        h0 = trim.height;
    } else {
        w1 = -anchor._x * orig.width;
        w0 = orig.width;

        h1 = -anchor._y * orig.height;
        h0 = orig.height;
    }

    if (this._roundPixels) {
        tx = Math.round(tx);
        ty = Math.round(ty);

        const sx = Math.sqrt((a * a) + (b * b));
        const sy = Math.sqrt((c * c) + (d * d));

        w0 = Math.round(w0 * sx) / sx;
        w1 = Math.round(w1 * sx) / sx;
        h0 = Math.round(h0 * sy) / sy;
        h1 = Math.round(h1 * sy) / sy;
    }

    w0 += w1;
    h0 += h1;

    // xy
    vertexData[0] = (a * w1) + (c * h1) + tx;
    vertexData[1] = (d * h1) + (b * w1) + ty;

    // xy
    vertexData[2] = (a * w0) + (c * h1) + tx;
    vertexData[3] = (d * h1) + (b * w0) + ty;

    // xy
    vertexData[4] = (a * w0) + (c * h0) + tx;
    vertexData[5] = (d * h0) + (b * w0) + ty;

    // xy
    vertexData[6] = (a * w1) + (c * h0) + tx;
    vertexData[7] = (d * h0) + (b * w1) + ty;
}

Sprite.prototype.calculateTrimmedVertices = function calculateTrimmedVertices() {
    if (!this.vertexTrimmedData) {
        this.vertexTrimmedData = new Float32Array(8);
    } else if (this._transformTrimmedID === this.transform._worldID && this._textureTrimmedID === this._texture._updateID) {
        return;
    }

    this._transformTrimmedID = this.transform._worldID;
    this._textureTrimmedID = this._texture._updateID;

    // lets do some special trim code!
    const texture = this._texture;
    const vertexData = this.vertexTrimmedData;
    const orig = texture.orig;
    const anchor = this._anchor;

    // lets calculate the new untrimmed bounds..
    const wt = this.transform.worldTransform;
    const a = wt.a;
    const b = wt.b;
    const c = wt.c;
    const d = wt.d;
    let tx = wt.tx;
    let ty = wt.ty;

    let w1 = -anchor._x * orig.width;
    let w0 = orig.width;

    let h1 = -anchor._y * orig.height;
    let h0 = orig.height;

    if (this._roundPixels) {
        tx = Math.round(tx);
        ty = Math.round(ty);

        const sx = Math.sqrt((a * a) + (b * b));
        const sy = Math.sqrt((c * c) + (d * d));

        w0 = Math.round(w0 * sx) / sx;
        w1 = Math.round(w1 * sx) / sx;
        h0 = Math.round(h0 * sy) / sy;
        h1 = Math.round(h1 * sy) / sy;
    }

    w0 += w1;
    h0 += h1;

    // xy
    vertexData[0] = (a * w1) + (c * h1) + tx;
    vertexData[1] = (d * h1) + (b * w1) + ty;

    // xy
    vertexData[2] = (a * w0) + (c * h1) + tx;
    vertexData[3] = (d * h1) + (b * w0) + ty;

    // xy
    vertexData[4] = (a * w0) + (c * h0) + tx;
    vertexData[5] = (d * h0) + (b * w0) + ty;

    // xy
    vertexData[6] = (a * w1) + (c * h0) + tx;
    vertexData[7] = (d * h0) + (b * w1) + ty;
}

Mesh.prototype._renderDefault = function _renderDefault(renderer)
{
    const shader = this.shader;

    shader.alpha = this.worldAlpha;
    if (shader.update) {
        shader.update();
    }

    renderer.batch.flush();

    let verticesBuffer;
    let vertices;

    if (this._roundPixels) {
        verticesBuffer = this.geometry.buffers[0];
        vertices = verticesBuffer.data;

        this.calculateVertices();

        if (this._roundPixelsID === undefined) {
            verticesBuffer.data = this.vertexData;
            verticesBuffer._updateID++;
            this._roundPixelsID = verticesBuffer._updateID;
            this.vertexDirty = this._roundPixelsID + 1;
        } else {
            verticesBuffer.data = this.vertexData;
            verticesBuffer._updateID = this._roundPixelsID;
        }

        shader.uniforms.translationMatrix = Transform.IDENTITY.worldTransform.toArray(true);
    } else {
        shader.uniforms.translationMatrix = this.transform.worldTransform.toArray(true);
    }

// bind and sync uniforms..
    renderer.shader.bind(shader);

// set state..
    renderer.state.set(this.state);

// bind the geometry...
    renderer.geometry.bind(this.geometry, shader);

// then render it
    renderer.geometry.draw(this.drawMode, this.size, this.start, this.geometry.instanceCount);

    if (this._roundPixels) {
        verticesBuffer.data = vertices;
        verticesBuffer._updateID = this.vertexDirty;
    }
}

Mesh.prototype.calculateVertices = function calculateVertices()
{
    const geometry = this.geometry;
    const verticesBuffer = geometry.buffers[0];
    const vertices = verticesBuffer.data;
    const vertexDirtyId = verticesBuffer._updateID;

    if (vertexDirtyId === this.vertexDirty && this._transformID === this.transform._worldID) {
        return;
    }

    this._transformID = this.transform._worldID;

    if (this.vertexData.length !== vertices.length) {
        this.vertexData = new Float32Array(vertices.length);
    }

    const wt = this.transform.worldTransform;
    const a = wt.a;
    const b = wt.b;
    const c = wt.c;
    const d = wt.d;
    let tx = wt.tx;
    let ty = wt.ty;
    let sx;
    let sy;

    if (this._roundPixels) {
        sx = Math.sqrt((a * a) + (b * b));
        sy = Math.sqrt((c * c) + (d * d));

        tx = Math.round(tx);
        ty = Math.round(ty);
    }

    const vertexData = this.vertexData;

    for (let i = 0; i < vertexData.length / 2; i++) {
        let x = vertices[(i * 2)];
        let y = vertices[(i * 2) + 1];

        if (this._roundPixels) {
            x = Math.round(x * sx) / sx;
            y = Math.round(y * sy) / sy;
        }

        vertexData[(i * 2)] = (a * x) + (c * y) + tx;
        vertexData[(i * 2) + 1] = (b * x) + (d * y) + ty;
    }

    this.vertexDirty = vertexDirtyId;
    this._roundPixelsID = undefined;
}


export default 0;
