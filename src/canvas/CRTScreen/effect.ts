import {
  Uniform,
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
    renderer: WebGLRenderer
  ): void {
    let texture = renderer.getRenderTarget()?.texture;
    this.uniforms.get("inputBuffer")!.value = texture;
    // @ts-ignore Texture has those fields, it's just that for some reason TS can't find them
    this.uniforms.get("resolution")!.value = [texture!.width, texture!.height];
  }

}