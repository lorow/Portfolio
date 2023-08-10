import * as THREE from 'three'
import {EffectComposer} from "three/examples/jsm/postprocessing/EffectComposer"; // @ts-ignore
import {RenderPass} from "three/addons/postprocessing/RenderPass.js"; // @ts-ignore
import {GlitchPass} from "three/addons/postprocessing/GlitchPass.js"; // @ts-ignore
import {SMAAPass} from "three/addons/postprocessing/SMAAPass.js"; // @ts-ignore
import { UnrealBloomPass } from "three/addons/postprocessing/UnrealBloomPass.js";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js';

import {GUI} from "dat.gui";


const loader = new GLTFLoader();
let focus_object: any;
let ringObject: any;
let scene: THREE.Scene
let camera: THREE.PerspectiveCamera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 0.1, 200);
let renderer: THREE.WebGLRenderer
let composer: EffectComposer;

const directionalLight = new THREE.DirectionalLight( 0xffffff, 10);

let finishedLoadingModel = false;

let controls: any;

init()
animate();

function init(){
    initPipeline();
    camera.position.z = 15;
    setupTheRigng();
    loadInterestObject("../models/novel_attention_shapes.gltf");
    applyShaderPasses();
}


function initPipeline(){
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0f0f0f);

    renderer = new THREE.WebGLRenderer({ antialias: true });
    
    composer = new EffectComposer(renderer);

    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );
    composer.setSize( window.innerWidth, window.innerHeight );
    renderer.useLegacyLights = false;

    controls = new OrbitControls( camera, renderer.domElement );
    
    // controls.maxPolarAngle = Math.PI / 2;

    controls.minDistance = 3;
    controls.maxDistance = 3;

    controls.enableDamping = true; 
    controls.dampingFactor = 0.05;

    controls.enableZoom = false;
    controls.enablePan = false;
    controls.autoRotate = true;
    controls.autoRotateSpeed = -0.4;

    scene.add(directionalLight);

    const dirLight1 = new THREE.DirectionalLight( 0xffffff, 3 );
    dirLight1.position.set( 1, 1, 1 );
    scene.add( dirLight1 );

    const dirLight2 = new THREE.DirectionalLight( 0x002288, 3 );
    dirLight2.position.set( - 1, - 1, - 1 );
    scene.add( dirLight2 );

    const ambientLight = new THREE.AmbientLight( 0xffffff );
    scene.add( ambientLight );

    document.body.appendChild(renderer.domElement);
}

function loadInterestObject(path: string){
    loader.load(
        path,
        function (model: any){
            focus_object = model.scene;
            scene.add(focus_object);
            directionalLight.target = focus_object;
            finishedLoadingModel = true;
            console.log("Finished loading model")
        },
        function ( xhr: any ) {
            console.log( ( xhr.loaded / xhr.total * 10 ) + '% loaded' );
        },
        function ( error: any ) {
            console.log( error );
        }
    );
}


function setupTheRigng(){
    const geometry = new THREE.RingGeometry( 1.19, 1.2, 128 ); 
    const material = new THREE.MeshBasicMaterial( { color: 0xffffff} );
    const mesh = new THREE.Mesh( geometry, material );
    ringObject = mesh;
    scene.add( mesh );
}


function applyShaderPasses(){
    const renderPass = new RenderPass(scene, camera);
    const glitchPass = new GlitchPass();
    const smaaPass = new SMAAPass( window.innerWidth * renderer.getPixelRatio(), window.innerHeight * renderer.getPixelRatio() );

    const bloomPass = new UnrealBloomPass( new THREE.Vector2( window.innerWidth, window.innerHeight ), 1.5, 0.4, 0.85 );
    bloomPass.threshold = 1;
    bloomPass.strength = 0.1;
    bloomPass.radius = 1;
    
    const outputPass = new OutputPass();

    composer.addPass(renderPass);
    // composer.addPass(glitchPass);
    // composer.addPass(bloomPass);
    composer.addPass(outputPass);
    composer.addPass(smaaPass);
}

window.addEventListener( 'resize', onWindowResize, false );
function onWindowResize(){
    const width = window.innerWidth;
    const height = window.innerHeight;

    camera.aspect = width / height;
    camera.updateProjectionMatrix();

    renderer.setSize( width, height );
    composer.setSize( width, height );
}

function animate(){
    // new idea: 
    // my regular design, but with a halo effect around a segmented pyramid where the center glows
    // rotates slowly, moves up and down depending on users movement, floats down when scroleld to next section
    // etc
    // the halo slowly rotates as well



    // https://minhpham.design/
    // https://cineshader.com/
    // https://basement.studio/ - gltich
    //https://twitter.com/rogierdeboeve/status/1256982286190497793?s=46&t=dIHvd1h6m9ItpMhOr7Wgug
    // https://twitter.com/su8erlemon/status/892779190495444993?s=46&t=dIHvd1h6m9ItpMhOr7Wgug
    // https://twitter.com/guilanier/status/1673629438297112576?s=46&t=dIHvd1h6m9ItpMhOr7Wgug

    requestAnimationFrame(animate);

    if (ringObject){
        ringObject.lookAt(camera.position);
    }

    if (controls){
        controls.update()
    }


    console.log(camera.position.y)

    composer.render();
}

function setupDebugMenu(){
    const gui = new GUI();
}