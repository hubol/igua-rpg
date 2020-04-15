import {Ticker, settings} from "pixi.js";

export class EscapeTickerAndExecute
{
    public readonly execute: () => void;

    constructor(execute: () => void) {
        this.execute = execute;
    }
}

export class IguaTicker extends Ticker
{
    update(currentTime?: number): void {
        try
        {
            this.updateImpl(currentTime);
        }
        catch (e)
        {
            if (e instanceof EscapeTickerAndExecute) {
                e.execute();
                return;
            }
            console.error(`Unhandled error in IguaTicker.update: ${e}`);
        }
    }

    // Copy-paste from pixi.js
    private updateImpl(currentTime = performance.now()): void
    {
        let elapsedMS;

        // If the difference in time is zero or negative, we ignore most of the work done here.
        // If there is no valid difference, then should be no reason to let anyone know about it.
        // A zero delta, is exactly that, nothing should update.
        //
        // The difference in time can be negative, and no this does not mean time traveling.
        // This can be the result of a race condition between when an animation frame is requested
        // on the current JavaScript engine event loop, and when the ticker's start method is invoked
        // (which invokes the internal _requestIfNeeded method). If a frame is requested before
        // _requestIfNeeded is invoked, then the callback for the animation frame the ticker requests,
        // can receive a time argument that can be less than the lastTime value that was set within
        // _requestIfNeeded. This difference is in microseconds, but this is enough to cause problems.
        //
        // This check covers this browser engine timing issue, as well as if consumers pass an invalid
        // currentTime value. This may happen if consumers opt-out of the autoStart, and update themselves.

        const anyThis = this as any;

        if (currentTime > this.lastTime)
        {
            // Save uncapped elapsedMS for measurement
            elapsedMS = this.elapsedMS = currentTime - this.lastTime;

            // cap the milliseconds elapsed used for deltaTime
            if (elapsedMS > anyThis._maxElapsedMS)
            {
                elapsedMS = anyThis._maxElapsedMS;
            }

            elapsedMS *= this.speed;

            // If not enough time has passed, exit the function.
            // Get ready for next frame by setting _lastFrame, but based on _minElapsedMS
            // adjustment to ensure a relatively stable interval.
            if (anyThis._minElapsedMS)
            {
                const delta = currentTime - anyThis._lastFrame | 0;

                if (delta < anyThis._minElapsedMS)
                {
                    return;
                }

                anyThis._lastFrame = currentTime - (delta % anyThis._minElapsedMS);
            }

            this.deltaMS = elapsedMS;
            this.deltaTime = this.deltaMS * settings.TARGET_FPMS;

            // Cache a local reference, in-case ticker is destroyed
            // during the emit, we can still check for head.next
            const head = anyThis._head;

            // Invoke listeners added to internal emitter
            let listener = head.next;

            while (listener)
            {
                try
                {
                    listener = listener.emit(this.deltaTime);
                }
                catch (e)
                {
                    if (e instanceof EscapeTickerAndExecute)
                        throw e;
                    console.error(`Unhandled error while emitting listener`, listener, e);
                    listener = listener.next;
                }
            }

            if (!head.next)
            {
                anyThis._cancelIfNeeded();
            }
        }
        else
        {
            this.deltaTime = this.deltaMS = this.elapsedMS = 0;
        }

        this.lastTime = currentTime;
    }
}