import {
	Texture,
	Uniform,
	Vector2,
	WebGLRenderTarget,
	WebGLRenderer,
  } from "three";
  import { BlendFunction, Effect } from "postprocessing";
  import glitchShader from "./glitchShader.frag?raw";
  
  export class CustomGlitchEffect extends Effect {
	//@ts-ignore
	constructor({ noiseTexture = null, dtSize = 64 } = {}) {
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
	  inputBuffer: WebGLRenderTarget<Texture>,
	  deltaTime?: number | undefined,
	): void {
	  this.uniforms.get("inputBuffer")!.value =
		renderer.getRenderTarget()?.texture;
	}
  }