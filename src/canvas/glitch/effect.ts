import {
  Texture,
  Uniform,
  WebGLRenderer,
} from "three";
import { BlendFunction, Effect } from "postprocessing";
import glitchShader from "./glitchShader.frag?raw";

export class CustomGlitchEffect extends Effect {
  //@ts-ignore
  constructor(noiseTexture: Texture) {
    super("CustomGlitchEffect", glitchShader, {
      blendFunction: BlendFunction.NORMAL,
      //@ts-ignore
      uniforms: new Map([
        ["noiseTexture", new Uniform(noiseTexture!)],
        ["inputBuffer", new Uniform(null)],
      ]),
    });
  }

  update(
    renderer: WebGLRenderer,
  ): void {
    this.uniforms.get("inputBuffer")!.value =
      renderer.getRenderTarget()?.texture;
  }
}