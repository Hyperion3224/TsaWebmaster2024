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


const geo ={ 
    id: "geothermal",
    Title: "Geothermal Power",
    Disclaimer: "geothermal plants vary so this might look different than the geothermal plants in your area",
    i1: "../Styles/Sources/GreenEnergySolutions/Geo/bernd-dittrich-PPsvcHEVm1o-unsplash.jpg",
    q1: "What is geothermal power?",
    a1: "Geothermal power is obtained by warming fluids using the earth's heat in order to turn them into steam which is then pushed through a turbine to generate electricity. The steam is then cooled back into a liquid and recycled.",
    i2: "../Styles/Sources/GreenEnergySolutions/Geo/dan-meyers-BkScvzMN9Nw-unsplash.jpg",
    q2: "How does geothermal power work?",
    a2: "Heat from the earth can be used directly for heat, or steam from geothermal energy processes can be used to generate electricity.",
    i3: "../Styles/Sources/GreenEnergySolutions/Geo/jason-mavrommatis-zAITDJYV09w-unsplash.jpg",
    q3: "How much does geothermal power cost to implement?",
    a3: "On average, homeowners can expect geothermal heating and cooling to be around $18k-$30k, although those numbers may be higher when considering higher-end heat pump systems for larger homes.",
    i4: "../Styles/Sources/GreenEnergySolutions/Geo/matt-palmer-UXjYy04EvOc-unsplash.jpg",
    q4: "How much money does geothermal power save in the long run?",
    a4: "In comparison to an existing A/C and Furnace setup, geothermal power may save the user $46,412 after some decades overall as compared to the $5,310 saved by upgraded conventional power.",
    i5: "../Styles/Sources/GreenEnergySolutions/Geo/sam-bark-R1GWSOJ9cng-unsplash.jpg",
    q5: "How do tax benefits regarding geothermal power work?",
    a5: "A 30% tax credit is applied to the cost of purchasing and installing a heat pump system at a home used as a residence by the taxpayer.",
};
const hydro ={ 
    id: "hydro",
    Title: "Hydroelectric Power",
    Disclaimer: "most hydroelectric power comes from dams",
    i1: "../Styles/Sources/GreenEnergySolutions/Hydro/pexels-james-frid-81279-13231219.jpg",
    q1: "What is hydropower?",
    a1: "Hydropower, otherwise known as hydroelectric power, is electricity generated by the movement of water in nature, such as rivers.    ",
    i2: "../Styles/Sources/GreenEnergySolutions/Hydro/pexels-chih-mlng-huang-81432666-8787089.jpg",
    q2: "How does hydropower work?",
    a2: "Hydropower plants utilize flow from a water source by allowing the water to enter the plant and then using the force of the moving water to turn turbine blades, powering a generator and producing electricity.    ",
    i3: "../Styles/Sources/GreenEnergySolutions/Hydro/pexels-m2anuman-14137049.jpg",
    q3: "How much does hydropower cost to implement?",
    a3: "It depends on the size of the structure you want to power. Hydroelectricity systems in 2021 averaged 2,135 USD in installation costs per kilowatt installed. Homes from 1,000-1,500 sq. ft. are recommended to have a 6 kW - 8.5 kW residential generator, homes from 1,500-2,000 sq. ft. are recommended to have an 8.5 kW - 10 kW residential generator, homes from 2,000-2,500 sq. ft. are recommended to have a 10 kW - 14 kW residential generator, and homes from 2,500-3,000+ sq. ft are recommended to have a 18.5 kW residential generator or a larger commercial generator.    ",
    i4: "../Styles/Sources/GreenEnergySolutions/Hydro/pexels-mateo-macht-46791872-14242632.jpg",
    q4: "How much money does hydropower save in the long run?",
    a4: "Hydropower in the U.S. costs about 0.85 cents per kilowatt-hour, making it about 50% the cost of nuclear power, 40% the cost of fossil fuels, and 25% the cost of natural gas.    ",
    i5: "../Styles/Sources/GreenEnergySolutions/Hydro/pexels-tomfisk-9893726.jpg",
    q5: "How do tax benefits regarding hydropower work?",
    a5: "Unfortunately, hydropower for homeowners does not qualify for the Residential Clean Energy Credit, which means regular tax prices will apply to the cost of energy obtained through hydropower systems.",
};
const nuclear ={ 
    id: "nuclear",
    Title: "Nuclear Power",
    Disclaimer: "although there have been 2 major nuclear reactor meltdowns they are quite safe",
    i1: "../Styles/Sources/GreenEnergySolutions/Nuclear/pexels-distelapparath-3044470.jpg",
    q1: "What is nuclear power?",
    a1: "Nuclear energy is the energy in the nucleus of an atom. In order to generate electricity using it, the energy must first be released from the atom by nuclear fission, or splitting atoms.",
    i2: "../Styles/Sources/GreenEnergySolutions/Nuclear/pexels-jplenio-2566845.jpg",
    q2: "How does nuclear power work? ",
    a2: "Uranium pellets undergo nuclear fusion, releasing energy and generating heat. This warms a cooling agent, producing steam. The steam then drives turbines of powers to create electricity.",
    i3: "../Styles/Sources/GreenEnergySolutions/Nuclear/pexels-jplenio-2309992.jpg",
    q3: "How much does nuclear power cost to implement?",
    a3: "Studies indicate that transitioning to a 100% renewable electric system would cost thousands of dollars per household per year through 2040.",
    i4: "../Styles/Sources/GreenEnergySolutions/Nuclear/pexels-vladimir-sladek-127740023-10165869.jpg",
    q4: "How much money does nuclear power save in the long run?",
    a4: "By allowing natural gas to still generate a small portion of the electricity, allowing existing nuclear plants to operate would save about $500 billion.",
    i5: "../Styles/Sources/GreenEnergySolutions/Nuclear/pexels-alexandre-loureiro-35127108-7097967.jpg",
    q5: "How do tax benefits regarding nuclear power work?",
    a5: "Unfortunately, there are no tax benefits related to nuclear power that homeowners can directly access.",
};
const solar ={ 
    id: "solar",
    Title: "Solar Energy",
    Disclaimer: "these fields of solar pannels would be found in much larger arrays in real life",
    i1: "../Styles/Sources/GreenEnergySolutions/Solar/nuno-marques-0GbrjL3vZF4-unsplash.jpg",
    q1: "What is solar energy?",
    a1: "Solar power is energy derived from the light of the sun, which allows it to be both the cleanest and most plentiful energy source available.",
    i2: "../Styles/Sources/GreenEnergySolutions/Solar/pexels-red-zeppelin-4148472.jpg",
    q2: "How does solar energy work?",
    a2: "The three main ways to use energy include photovoltaics, which directly convert the sun’s energy into electricity in an electronic process; solar heating and cooling (SHC), which use the sun’s heat to warm spaces and water; and concentrating solar power (CSP), which runs traditional electricity- generating turbines.    ",
    i3: "../Styles/Sources/GreenEnergySolutions/Solar/pexels-kindelmedia-9875405.jpg",
    q3: "How much does solar energy cost to implement?",
    a3: "In the United States, for a 5kw installed system, prices are generally under $3 regarding cash purchase $/watt and around $13k-$14k regarding cash purchase with the notable exception of Oregon, where costs are somewhat more expensive.    ",
    i4: "../Styles/Sources/GreenEnergySolutions/Solar/pexels-pixabay-371917.jpg",
    q4: "How much money does solar energy save in the long run?",
    a4: "U.S. Customers save around $1,500 a year using solar power on average, accumulating to $37,500 after 25 years, but numbers may vary from $10k to $90k overall with regards to certain variables.    ",
    i5: "../Styles/Sources/GreenEnergySolutions/Solar/gabriel-riFb-zdJ5QA-unsplash.jpg",
    q5: "How do tax benefits regarding solar energy work?",
    a5: "A 30% tax credit is applied to solar energy, meaning that for a 5kw installed system, the price paid by the end user is more likely to be around $2 regarding cash purchase $/watt and around $10k regarding cash purchase.    ",
};
const wind ={ 
    id: "wind",
    Title: "Wind Energy",
    Disclaimer: "Obviously the windmills would be nothing but for show here as the city would block the majority of the wind",
    i1: "../Styles/Sources/GreenEnergySolutions/Wind/pexels-pixabay-414807.jpg",
    q1: "What is wind energy?",
    a1: "Wind power is the term for the mechanical energy from wind spinning wind turbines.",
    i2: "../Styles/Sources/GreenEnergySolutions/Wind/pexels-pixabay-33062.jpg",
    q2: "How does wind energy work?",
    a2: "An inflow of wind to a wind turbine turns the blades and rotor, which then spin the main shaft and gearbox, which then spin the generator, generating electricity.",
    i3: "../Styles/Sources/GreenEnergySolutions/Wind/pexels-benjiecce-1659688.jpg",
    q3: "How much does wind energy cost to implement?",
    a3: "Small wind turbines cost around $3k-$5k per kilowatt of power capacity, meaning that for projects desiring 5-15kW of wind power capacity, the estimated price would be around $15k-$75k for a small wind turbine project.",
    i4: "../Styles/Sources/GreenEnergySolutions/Wind/insung-yoon-Ya31EKiTfJM-unsplash.jpg",
    q4: "How much money does wind energy save in the long run?",
    a4: "One study by Synapse Energy Economics revealed that the incorporation of wind energy in the U.S. Midwest could result in savings for consumers ranging from $65 to $200 annually, meaning that it could save people thousands of dollars within their lifetime.",
    i5: "../Styles/Sources/GreenEnergySolutions/Wind/american-public-power-association-eIBTh5DXW9w-unsplash.jpg",
    q5: "How do tax benefits regarding wind energy work?",
    a5: "A 30% tax credit is applied to the cost of purchasing and installing wind turbines at your main home plus one other.",
};

console.log('solutionNav script loaded');

function change(num) {
    var identification = document.getElementsByClassName("solutions-info");
    var title = document.getElementById("title");
    var disclaimer = document.getElementById("title-disclaimer");
    var i1 = document.getElementById('i1');
    var q1 = document.getElementById('q1');
    var a1 = document.getElementById('a1');
    var i2 = document.getElementById('i2');
    var q2 = document.getElementById('q2');
    var a2 = document.getElementById('a2');
    var i3 = document.getElementById('i3');
    var q3 = document.getElementById('q3');
    var a3 = document.getElementById('a3');
    var i4 = document.getElementById('i4');
    var q4 = document.getElementById('q4');
    var a4 = document.getElementById('a4');
    var i5 = document.getElementById('i5');
    var q5 = document.getElementById('q5');
    var a5 = document.getElementById('a5');

    let update;
    switch (num) {
        case 1:
            update = geo;
            moveCamToCoords(geoCoords);
            break;
        case 2:
            update = hydro;
            moveCamToCoords(hydroCoords);
            break;
        case 3:
            update = nuclear;
            moveCamToCoords(nuclearCoords);
            break;
        case 4:
            update = solar;
            moveCamToCoords(solarCoords);
            break;
        case 5:
            moveCamToCoords(windCoords);
            update = wind;
            break;
        default:
            console.log("Invalid number");
            return;
    }
    if (identification.length === 1) {
        identification[0].id = update.id;
      }
    title.innerText = update.Title;
    disclaimer.innerText = update.Disclaimer;
    q1.innerText = update.q1;
    a1.innerText = update.a1;
    q2.innerText = update.q2;
    a2.innerText = update.a2;
    q3.innerText = update.q3;
    a3.innerText = update.a3;
    q4.innerText = update.q4;
    a4.innerText = update.a4;
    q5.innerText = update.q5;
    a5.innerText = update.a5;
      try   {
    i1.src = update.i1;
    i2.src = update.i2;
    i3.src = update.i3;
    i4.src = update.i4;
    i5.src = update.i5;
    } catch (e){
        console.log('images faild to change \n' + e);
    }


    var scroll = document.getElementById(update.id);
    scroll.scrollTo(0,0);

    console.log("change to: " + update.Title)
}

window.change = change;

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
