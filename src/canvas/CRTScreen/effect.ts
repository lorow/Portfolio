import {
	Texture,
	Uniform,
	WebGLRenderTarget,
	WebGLRenderer,
  } from "three";
import { BlendFunction, Effect } from "postprocessing";
import fishEyeShaderSimple from "./CRTScreen.frag?raw";


export class CRTScreenEffect extends Effect {
    constructor() {
        super("FishEyeEffect", fishEyeShaderSimple, {
            blendFunction: BlendFunction.NORMAL,
            uniforms: new Map([
                ["inputBuffer", new Uniform(null)],
                ["resolution", new Uniform(null)],
              ]),
        });
    }

    update(
      renderer: WebGLRenderer,
      inputBuffer: WebGLRenderTarget<Texture>,
      deltaTime?: number | undefined,
    ): void {
      let texture = renderer.getRenderTarget()?.texture;
      this.uniforms.get("inputBuffer")!.value = texture;
      this.uniforms.get("resolution")!.value = [texture!.width, texture!.height ];
    }

  }