import * as THREE from "three";

import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer";
import { RenderPass } from "three/addons/postprocessing/RenderPass.js"; // @ts-ignore
import { GlitchPass } from "three/addons/postprocessing/GlitchPass.js"; // @ts-ignore
import { SMAAPass } from "three/addons/postprocessing/SMAAPass.js"; // @ts-ignore
import { UnrealBloomPass } from "three/addons/postprocessing/UnrealBloomPass.js";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js';


type onLoadProgressCallback = (progress: number) => void;

export default class Canvas {
    private progressCallbacks =  new Array<onLoadProgressCallback>();
    
    private ringObject!: THREE.Object3D;
    private orbitControls: OrbitControls;
    private readonly update = this.render.bind(this);
    private canvasElement: HTMLCanvasElement;
    private renderer!: THREE.WebGLRenderer;
    private scene = new THREE.Scene();
    private camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 0.1, 200);
    private composer!: EffectComposer;

    public constructor (canvas: HTMLCanvasElement) {
        this.canvasElement = canvas;
        const current_scope = this;

        function onWindowResize(){
            const width = window.innerWidth;
            const height = window.innerHeight

            current_scope.camera.aspect =  width / height; 
            current_scope.camera.updateProjectionMatrix();

            current_scope.renderer.setSize(width, height);
            current_scope.composer.setSize(width, height);
        }

        window.addEventListener("resize", onWindowResize, false);
    }

    public addOnProgressCallback( callback: onLoadProgressCallback){
        this.progressCallbacks.push(callback);
    }

    public start() {
        this.initScene();
        this.createCamera();
        this.setupOrbitControls();
        this.setupAccentLights();
        this.createRenderer();
        this.loadInterestObject();
        this.setupRing();
        this.initPostProcessingPipeline();
    }

    private createCamera(): void {
        this.camera.position.z = 3; 
    }

    private createRenderer() {
        this.renderer = new THREE.WebGLRenderer({canvas: this.canvasElement});
        this.renderer.setPixelRatio(window.devicePixelRatio); 
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.useLegacyLights = false; 
    }

    private initScene(): void {
        this.scene.background = new THREE.Color(0x0f0f0f);
    }

    private setupOrbitControls() {
        this.orbitControls = new OrbitControls(this.camera, this.canvasElement);
        
        this.orbitControls.minDistance = 3;
        this.orbitControls.maxDistance = 3; 
        this.orbitControls.enableDamping = true; 
        this.orbitControls.dampingFactor = 0.05;
        this.orbitControls.enableZoom = false;
        this.orbitControls.enablePan = false;
        this.orbitControls.autoRotate = true;
        this.orbitControls.autoRotateSpeed = -0.4; 
    }

    private initPostProcessingPipeline() {
        this.composer = new EffectComposer(this.renderer);
        this.composer.setSize( window.innerWidth, window.innerHeight );

        const renderPass = new RenderPass(this.scene, this.camera);
        const glitchPass = new GlitchPass();
        const smaaPass = new SMAAPass( window.innerWidth * this.renderer.getPixelRatio(), window.innerHeight * this.renderer.getPixelRatio() );
        const bloomPass = new UnrealBloomPass( new THREE.Vector2( window.innerWidth, window.innerHeight ), 1.5, 0.4, 0.85 );
        bloomPass.threshold = 1;
        bloomPass.strength = 0.1;
        bloomPass.radius = 1;
        
        const outputPass = new OutputPass();

        this.composer.addPass(renderPass);
        // this.composer.addPass(glitchPass);
        this.composer.addPass(bloomPass);
        this.composer.addPass(outputPass);
        this.composer.addPass(smaaPass);
    }

    private loadInterestObject() {
        // we can later refactor this into proper loader
        const current_context = this;
        const loader = new GLTFLoader(); 
        loader.load(
            "../models/novel_attention_shapes.gltf",
            function (model: any) {
                const model_light = new THREE.DirectionalLight(0xffffff, 10);
                current_context.orbitControls.target = model.scene.position;
                current_context.scene.add(model.scene);
                model_light.target = model.scene;
            },
            function (xhr: any) {
                let progress = xhr.loaded / xhr.total * 100;
                current_context.progressCallbacks.forEach((callback) => {callback(progress)});
            },
            function (error: any){
                console.log(error);
            }
        );
    }

    private setupAccentLights(){
        const dirLight1 = new THREE.DirectionalLight( 0xffffff, 3 );
        dirLight1.position.set( 1, 1, 1 );
        this.scene.add( dirLight1 );

        const dirLight2 = new THREE.DirectionalLight( 0x002288, 3 );
        dirLight2.position.set( - 1, - 1, - 1 );
        this.scene.add( dirLight2 );

        const ambientLight = new THREE.AmbientLight( 0xffffff );
        this.scene.add( ambientLight );
    }
    
    private setupRing() {
        const geometry = new THREE.RingGeometry( 1.19, 1.2, 128 ); 
        const material = new THREE.MeshBasicMaterial( { color: 0xffffff} );
        const mesh = new THREE.Mesh( geometry, material );
        this.ringObject = mesh;
        this.scene.add( mesh );
    }

    public render(){
        setTimeout(() => {
            requestAnimationFrame(this.update);
            this.orbitControls.update();
            this.ringObject.lookAt(this.camera.position);
            this.composer.render();    
        }, 1000/60);
    }
}
