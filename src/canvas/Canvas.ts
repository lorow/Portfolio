import * as THREE from "three";

import {
    BlendFunction,
    EffectComposer,
    EffectPass,
    RenderPass,
    EdgeDetectionMode,
    GridEffect,
    NoiseEffect,
    BloomEffect,
    SMAAEffect,
    SMAAPreset,
} from "postprocessing";

import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { CustomGlitchEffect } from './glitch/effect';
import { CRTScreenEffect } from './CRTScreen/effect';
// import { Pane } from 'tweakpane';


type onLoadProgressCallback = (progress: number) => void;

export default class Canvas {
    // private pane = new Pane();

    private progressCallbacks = new Array<onLoadProgressCallback>();

    private ringObject!: THREE.Object3D;
    private orbitControls?: OrbitControls;
    private readonly animate = this.render.bind(this);
    private canvasElement: HTMLCanvasElement;
    private renderer!: THREE.WebGLRenderer;
    private scene = new THREE.Scene();
    private camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 0.1, 200);
    private composer!: EffectComposer;

    public constructor(canvas: HTMLCanvasElement) {
        this.canvasElement = canvas;
        const current_scope = this;

        function onWindowResize() {
            const width = window.innerWidth;
            const height = window.innerHeight

            current_scope.camera.aspect = width / height;
            current_scope.camera.updateProjectionMatrix();

            current_scope.renderer.setSize(width, height);
            current_scope.composer.setSize(width, height);
        }

        window.addEventListener("resize", onWindowResize, false);
    }

    public addOnProgressCallback(callback: onLoadProgressCallback) {
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
        this.renderer = new THREE.WebGLRenderer({
            powerPreference: "high-performance",
            canvas: this.canvasElement
        });
        this.renderer.setAnimationLoop(this.animate);
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }

    private initScene(): void {
        this.scene.background = new THREE.Color(0x171717); //0x0f0f0f);
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
        const smaaEffect = new SMAAEffect(
            {
                preset: SMAAPreset.HIGH,
                edgeDetectionMode: EdgeDetectionMode.COLOR
            }
        );

        smaaEffect.edgeDetectionMaterial.edgeDetectionThreshold = 0.01;

        const noiseEffect = new NoiseEffect({ premultiply: false });
        const gridEffect = new GridEffect({ scale: 1.5 });
        const bloomEffect = new BloomEffect(
            {
                intensity: .25,
                mipmapBlur: true
            }
        );
        const textureLoader = new THREE.TextureLoader(); 
        // const noiseTexture = textureLoader.load('../textures/noise.png');
        const noiseTexture = textureLoader.load('../textures/perlinNoise.png');
        // const noiseTexture = textureLoader.load('../textures/fractalNoise.png');
        console.log("noise", noiseTexture); 
        const glitchEffect = new CustomGlitchEffect({
            noiseTexture: noiseTexture,
        });

        const crtScreenEffect = new CRTScreenEffect();

        noiseEffect.blendMode.opacity.value = 0.7;
        noiseEffect.blendMode.blendFunction = BlendFunction.REFLECT;

        const renderPass = new RenderPass(this.scene, this.camera);
        const effectPass = new EffectPass(this.camera, smaaEffect, noiseEffect, gridEffect, bloomEffect);
        const glitchPass = new EffectPass(this.camera, glitchEffect);
        const crtPass = new EffectPass(this.camera, crtScreenEffect);

        this.composer.addPass(renderPass);
        this.composer.addPass(effectPass);
        this.composer.addPass(glitchPass);
        this.composer.addPass(crtPass);
    }

    private loadInterestObject() {
        // we can later refactor this into proper loader
        const current_context = this;
        const loader = new GLTFLoader();
        loader.load(
            "../models/novel_attention_shapes_compressed.gltf",
            function (model: any) {
                const model_light = new THREE.DirectionalLight(0xffffff, 10);
                current_context.orbitControls!.target = model.scene.position;
                current_context.scene.add(model.scene);
                model_light.target = model.scene;
                console.log(model.scene);
            },
            function (xhr: any) {
                let progress = xhr.loaded / xhr.total * 100;
                current_context.progressCallbacks.forEach((callback) => { callback(progress) });
            },
            function (error: any) {
                console.log(error);
            }
        );
    }

    private setupAccentLights() {
        const dirLight1 = new THREE.DirectionalLight(new THREE.Color(72, 72, 72), 0.08);
        // const firstLightHelper = new THREE.DirectionalLightHelper(dirLight1, 5);
        dirLight1.position.set(0, 2, 2);
        dirLight1.rotation.set(90, 45, 45);
        this.scene.add(dirLight1);
        // this.scene.add(firstLightHelper);

        const dirLight2 = new THREE.DirectionalLight(new THREE.Color(0, 0, 7), 0.2);
        // const secondLightHelper = new THREE.DirectionalLightHelper(dirLight2, 5);
        dirLight2.position.set(-2, - 1, 0);
        dirLight2.rotation.set(0, 0, 2.70);
        this.scene.add(dirLight2);
        // this.scene.add(secondLightHelper);

        const ambientLight = new THREE.AmbientLight(0xffffff);
        this.scene.add(ambientLight);

        // const lightFolder = this.pane.addFolder({ title: "lightFolder" });
        // const firstLight = lightFolder.addFolder({ title: "white" });
        // firstLight.addBinding(dirLight1, "position");
        // firstLight.addBinding(dirLight1, "rotation");
        // firstLight.addBinding(dirLight1, "intensity");
        // firstLight.addBinding(dirLight1, "color");

        // const secondLight = lightFolder.addFolder({ title: "blue" });
        // secondLight.addBinding(dirLight2, "position");
        // secondLight.addBinding(dirLight2, "rotation");
        // secondLight.addBinding(dirLight2, "intensity");
        // secondLight.addBinding(dirLight2, "color");
    }

    private setupRing() {
        const geometry = new THREE.RingGeometry(1.19, 1.2, 128);
        const material = new THREE.MeshBasicMaterial({ color: 0xffffff });
        const mesh = new THREE.Mesh(geometry, material);
        this.ringObject = mesh;
        this.scene.add(mesh);
    }

    public render() {
        this.orbitControls!.update();
        this.ringObject.lookAt(this.camera.position);
        // this.backgroundObject.lookAt(this.camera.position);
        this.composer.render();
    }
}
