import * as THREE from './ThreeJS/three.module.js';
import { GLTFLoader } from './ThreeJS/GLTFLoader.js';
import TWEEN from './ThreeJS/tween.js';

console.log('Three.js script loaded');

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x5888a8);

const startCoords = { pX: -15.831766047952998, pY: 16.036876548907166, pZ: 5.149760127750651, rX: -1.1826126429569825, rY: -0.8608846888904975, rZ: -1.076289290862668 };
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000000);
camera.position.set(startCoords.pX, startCoords.pY, startCoords.pZ);
camera.rotation.set(startCoords.rX, startCoords.rY, startCoords.rZ);

const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#bg'),
});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.outputEncoding = THREE.sRGBEncoding;

const hemiLight = new THREE.HemisphereLight(0xfffabc, 0x000, 1.3);
scene.add(hemiLight);

const loader = new GLTFLoader();
loader.load(
    '../Styles/Sources/Blends/webDev2024.glb',
    function (gltf) {
        const model = gltf.scene;
        model.traverse((child) => {
            if (child.isMesh) {
                const materials = Array.isArray(child.material) ? child.material : [child.material];
                materials.forEach(handleTexture);
            }
        });
        scene.add(model);
        model.scale.set(0.6, 0.6, 0.6);
        animate();
    },
    undefined,
    function (error) {
        console.error('An error occurred while loading the model', error);
    }
);

function handleTexture(material) {
    if (material.map) {
        material.map.encoding = THREE.sRGBEncoding;
        material.map.flipY = false;
        material.map.needsUpdate = true;
    }
}

const geoCoords = { pX: -10.942036426838175, pY: 11.714282453567384, pZ: -13.119901762894825, rX: -2.7394379215191007, rY: -0.667336547506538, rZ: -2.884193602020444 };
const hydroCoords = { pX: 8.99226480570012, pY: 11.494083490743943, pZ: 12.182033692427938, rX: -0.49810196303877063, rY: 0.5522568464297858, rZ: 0.27792042536571265 };
const nuclearCoords = { pX: 0.4653978557318055, pY: 12.184554623486246, pZ: -16.337140588061164, rX: -2.78214411230504, rY: -0.04668441206738993, rZ: -3.1240580624661063 };
const solarCoords = { pX: -0.14726687066188743, pY: 10.582568043890307, pZ: 15.152616309214746, rX: -0.4258272389544824, rY: -0.0363339553912547, rZ: -0.016475246420835078 };
const windCoords = { pX: 15.448746827187536, pY: 10.407642427511796, pZ: 2.2110223055698577, rX: -1.5205178915725983, rY: 1.1646716881125454, rZ: 1.5160745815656322 };

function moveCamToCoords(coords) {
    const cameraCoords = {
        pX: camera.position.x, 
        pY: camera.position.y, 
        pZ: camera.position.z, 
        rX: camera.rotation.x, 
        rY: camera.rotation.y, 
        rZ: camera.rotation.z 
    };

    new TWEEN.Tween(cameraCoords)
        .to({ pX: coords.pX, pY: coords.pY, pZ: coords.pZ, rX: coords.rX, rY: coords.rY, rZ: coords.rZ }, 2000)
        .onUpdate(() => {
            camera.position.set(cameraCoords.pX, cameraCoords.pY, cameraCoords.pZ);
            camera.rotation.set(cameraCoords.rX, cameraCoords.rY, cameraCoords.rZ);
        })
        .start();
}

const options = {
    root: null,
    rootMargin: '0px',
    threshold: 0.5
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            switch (entry.target.id) {
                case 'geothermal':
                    moveCamToCoords(geoCoords);
                    break;
                case 'hydro':
                    moveCamToCoords(hydroCoords);
                    break;
                case 'nuclear':
                    moveCamToCoords(nuclearCoords);
                    break;
                case 'solar':
                    moveCamToCoords(solarCoords);
                    break;
                case 'wind':
                    moveCamToCoords(windCoords);
                    break;
                default:
                    break;
            }
        }
    });
}, options);

document.querySelectorAll('.observe').forEach(el => {
    observer.observe(el);
});

function animate() {
    requestAnimationFrame(animate);
    TWEEN.update();
    renderer.render(scene, camera);
}

animate();

window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});

document.onkeydown = (e) => {
    if (e.key == 's') {
        let posData = "{  X: " + camera.position.x + ", Y: " + camera.position.y + ", Z: " + camera.position.z + "  }";
        let rotData = "{  X: " + camera.rotation.x + ", Y: " + camera.rotation.y + ", Z: " + camera.rotation.z + "  }";
        let data = "{ pX: " + camera.position.x + ", pY: " + camera.position.y + ", pZ: " + camera.position.z + ", rX: " + camera.rotation.x + ", rY: " + camera.rotation.y + ", rZ: " + camera.rotation.z + " }";
        
        console.log("Position", posData);
        console.log("Rotation", rotData);
        console.log("Data", data);
    }
};
