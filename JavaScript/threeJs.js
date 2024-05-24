import * as THREE from './ThreeJS/three.module.js';
import { GLTFLoader } from './ThreeJS/GLTFLoader.js';
//import { OrbitControls } from '../node_modules/three/examples/jsm/controls/OrbitControls.js';

console.log('Three.js script loaded');

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x5888a8);

const startCoords = {pX: -15.831766047952998, pY: 16.036876548907166, pZ: 5.149760127750651, rX: -1.1826126429569825, rY: -0.8608846888904975, rZ: -1.076289290862668}
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000000);
camera.position.set(startCoords.pX,startCoords.pY,startCoords.pZ);
camera.rotation.set(startCoords.rX,startCoords.rY,startCoords.rZ);

const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#bg'),
});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.outputEncoding = THREE.sRGBEncoding; // Ensure correct color space

//const ambLight = new THREE.AmbientLight(0xffffff, 1.6);
//ambLight.position.set(0, 1, 0);
//scene.add(ambLight);

const hemiLight = new THREE.HemisphereLight( 0xfffabc, 0x000, 1.3 );
scene.add(hemiLight);

//const controls = new OrbitControls(camera, renderer.domElement);

let materialArray = [];
let texture_ft = new THREE.TextureLoader().load('../Styles/Sources/Blends/miramar_ft.jpg');
let texture_bk = new THREE.TextureLoader().load('../Styles/Sources/Blends/miramar_bk.jpg');
let texture_up = new THREE.TextureLoader().load('../Styles/Sources/Blends/miramar_up.jpg');
let texture_dn = new THREE.TextureLoader().load('../Styles/Sources/Blends/miramar_dn.jpg');
let texture_rt = new THREE.TextureLoader().load('../Styles/Sources/Blends/miramar_rt.jpg');
let texture_lf = new THREE.TextureLoader().load('../Styles/Sources/Blends/miramar_lf.jpg');

materialArray.push(new THREE.MeshBasicMaterial({ map: texture_ft }));
materialArray.push(new THREE.MeshBasicMaterial({ map: texture_bk }));
materialArray.push(new THREE.MeshBasicMaterial({ map: texture_up }));
materialArray.push(new THREE.MeshBasicMaterial({ map: texture_dn }));
materialArray.push(new THREE.MeshBasicMaterial({ map: texture_rt }));
materialArray.push(new THREE.MeshBasicMaterial({ map: texture_lf }));

for (let i = 0; i < 6; i++)
    materialArray[i].side = THREE.BackSide;

let skyboxGeo = new THREE.BoxGeometry(10000, 10000, 10000);
let skybox = new THREE.Mesh(skyboxGeo, materialArray);
//scene.add(skybox);

console.log('Canvas element:', document.querySelector('#bg'));

// Function to ensure correct color space and flip handling
function handleTexture(material) {
    if (material.map) {
        material.map.encoding = THREE.sRGBEncoding;
        material.map.flipY = false; // GLTFLoader flips Y by default
        material.map.needsUpdate = true;
    }
}

// Load the GLTF model with embedded textures
const loader = new GLTFLoader();
loader.load(
    '../Styles/Sources/Blends/webDev2024.glb', // replace with the correct path to your GLTF file
    function (gltf) {
        const model = gltf.scene;

        // Traverse through the model and handle textures
        model.traverse((child) => {
            if (child.isMesh) {
                const materials = Array.isArray(child.material) ? child.material : [child.material];
                materials.forEach(handleTexture);
            }
        });

        scene.add(model);
        console.log('Model loaded successfully:', model);

        // Scale down the model if it's too large
        model.scale.set(0.6, 0.6, 0.6);

        gltf.animations; // Array<THREE.AnimationClip>
        // gltf.scene; // THREE.Group
        gltf.scenes; // Array<THREE.Group>
        gltf.cameras; // Array<THREE.Camera>
        gltf.asset; // Object
        // Ensure the model is correctly positioned in the scene
        animate(); // Start the animation loop after the model is loaded
    },
    undefined,
    function (error) {
        console.error('An error occurred while loading the model', error);
    }
);

function moveCamera(){
    //const t = document.body.getBoundingClientRect().top;
    const geo = document.getElementById('geothermal');
    const hydro = document.getElementById('hydro');
    const nuclear = document.getElementById('nuclear');
    const solar = document.getElementById('solar');
    const wind = document.getElementById('wind');

    const geoCoords = {pX: -10.942036426838175, pY: 11.714282453567384, pZ: -13.119901762894825, rX: -2.7394379215191007, rY: -0.667336547506538, rZ: -2.884193602020444}
    const hydroCoords = {pX: 8.99226480570012, pY: 11.494083490743943, pZ: 12.182033692427938, rX: -0.49810196303877063, rY: 0.5522568464297858, rZ: 0.27792042536571265}
    const nuclearCoords = {pX: 0.4653978557318055, pY: 12.184554623486246, pZ: -16.337140588061164, rX: -2.78214411230504, rY: -0.04668441206738993, rZ: -3.1240580624661063}
    const solarCoords = {pX: -0.14726687066188743, pY: 10.582568043890307, pZ: 15.152616309214746, rX: -0.4258272389544824, rY: -0.0363339553912547, rZ: -0.016475246420835078}
    const windCoords = {pX: 15.448746827187536, pY: 10.407642427511796, pZ: 2.2110223055698577, rX: -1.5205178915725983, rY: 1.1646716881125454, rZ: 1.5160745815656322}
    

    if(geo){
        camera.position.set(geoCoords.pX,geoCoords.pY,geoCoords.pZ);
        camera.rotation.set(geoCoords.rX,geoCoords.rY,geoCoords.rZ);
    }else if(hydro){
        camera.position.set(hydroCoords.pX,hydroCoords.pY,hydroCoords.pZ);
        camera.rotation.set(hydroCoords.rX,hydroCoords.rY,hydroCoords.rZ);
    }else if(nuclear){
        camera.position.set(nuclearCoords.pX,nuclearCoords.pY,nuclearCoords.pZ);
        camera.rotation.set(nuclearCoords.rX,nuclearCoords.rY,nuclearCoords.rZ);
    }else if(solar){
        camera.position.set(solarCoords.pX,solarCoords.pY,solarCoords.pZ);
        camera.rotation.set(solarCoords.rX,solarCoords.rY,solarCoords.rZ);
    }else if(wind){
        camera.position.set(windCoords.pX,windCoords.pY,windCoords.pZ);
        camera.rotation.set(windCoords.rX,windCoords.rY,windCoords.rZ);
    }
}

document.body.onscroll = moveCamera;

function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}

animate();

// Handle window resize
window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});

document.onkeydown = (e) => {
        if(e.key == 's') {
		// Data which will write in a file.
		let posData = "{  X: " + camera.position.x + ", Y: " + camera.position.y +  ", Z: " + camera.position.z + "  }"
		let rotData = "{  X: " + camera.rotation.x + ", Y: " + camera.rotation.y +  ", Z: " + camera.rotation.z + "  }"
		let data = "{ pX: " + camera.position.x + ", pY: " + camera.position.y + ", pZ: " + camera.position.z + ", rX: " + camera.rotation.x + ", rY: " + camera.rotation.y + ", rZ: " + camera.rotation.z + " }"
		
		console.log("Position", posData)
		console.log("Rotation", rotData)
		console.log("Data", data)
	}
}
