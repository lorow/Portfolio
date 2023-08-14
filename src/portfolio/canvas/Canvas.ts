import { WebGLRenderer } from "three/src/renderers/WebGLRenderer";
import { PerspectiveCamera } from 'three/src/cameras/PerspectiveCamera';
import { Scene } from 'three/src/scenes/Scene';
import { Color } from 'three/src/math/Color';
import { Vector2 } from 'three/src/math/Vector2';
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer";
import {RenderPass} from "three/addons/postprocessing/RenderPass.js"; // @ts-ignore
import {GlitchPass} from "three/addons/postprocessing/GlitchPass.js"; // @ts-ignore
import {SMAAPass} from "three/addons/postprocessing/SMAAPass.js"; // @ts-ignore
import { UnrealBloomPass } from "three/addons/postprocessing/UnrealBloomPass.js";
// import { OrbitControls } from "three/addons/controls/OrbitControls.js";
// import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js';



export default class Canvas {
    private readonly update = this.render.bind(this);

    private renderer: WebGLRenderer;
    private scene = new Scene();
    private camera = new PerspectiveCamera(55, window.innerWidth / window.innerHeight, 0.1, 200);
    private composer!: EffectComposer;

    public constructor (canvas: HTMLCanvasElement) {
        this.initScene();
        this.createCamera();
        this.createRenderer(canvas);
        this.initPostProcessingPipeline();
    }

    private createCamera(): void {
        this.camera.position.z = 15; 
    }

    private createRenderer(canvasElement: HTMLCanvasElement) {
        this.renderer = new WebGLRenderer({canvas: canvasElement});
        this.renderer.setPixelRatio(window.devicePixelRatio); 
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.useLegacyLights = false; 
    }

    private initScene(): void {
        this.scene.background = new Color(0x0f0f0f);
    }

    private initPostProcessingPipeline() {
        this.composer = new EffectComposer(this.renderer);
        this.composer.setSize( window.innerWidth, window.innerHeight );

        const renderPass = new RenderPass(this.scene, this.camera);
        const glitchPass = new GlitchPass();
        const smaaPass = new SMAAPass( window.innerWidth * this.renderer.getPixelRatio(), window.innerHeight * this.renderer.getPixelRatio() );
        const bloomPass = new UnrealBloomPass( new Vector2( window.innerWidth, window.innerHeight ), 1.5, 0.4, 0.85 );
        bloomPass.threshold = 1;
        bloomPass.strength = 0.1;
        bloomPass.radius = 1;
        
        const outputPass = new OutputPass();

        this.composer.addPass(renderPass);
        // composer.addPass(glitchPass);
        // composer.addPass(bloomPass);
        this.composer.addPass(outputPass);
        this.composer.addPass(smaaPass);
    }

    public render(){
        requestAnimationFrame(this.update);
        this.composer.render();

        console.log("update")
    }

}