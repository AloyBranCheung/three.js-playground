import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
// lights
import sunLight from "./lights/sunLight";
// shapes
import sun from "./sun";
import mercury, { mercInvisParent } from "./mercury";
import saturn, { satInvisParent } from "./saturn";
// utils
import createPlanet from "./utils/createPlanet";
// textures
import starsTexture from "../img/stars.jpg";
import venusTexture from "../img/venus.jpg";
import earthTexture from "../img/earth.jpg";
import marsTexture from "../img/mars.jpg";
import jupiterTexture from "../img/jupiter.jpg";
import uranusTexture from "../img/uranus.jpg";
import uranusRingTexture from "../img/uranus ring.png";
import neptuneTexture from "../img/neptune.jpg";
import plutoTexture from "../img/pluto.jpg";

// renderer
const renderer = new THREE.WebGLRenderer();

// renderer dimensions
renderer.setSize(window.innerWidth, window.innerHeight);

// add webgl canvas
document.body.appendChild(renderer.domElement);

// scene
const scene = new THREE.Scene();

// camera
const camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

// orbit controls
const orbit = new OrbitControls(camera, renderer.domElement);

camera.position.set(-90, 140, 140);
orbit.update();

// light
const ambientLight = new THREE.AmbientLight(0x333333);
scene.add(ambientLight);

// sunlight
scene.add(sunLight);

// stars background
const cubeTextureLoader = new THREE.CubeTextureLoader();
scene.background = cubeTextureLoader.load([
  starsTexture,
  starsTexture,
  starsTexture,
  starsTexture,
  starsTexture,
  starsTexture,
]);

/* --------------------------------- shapes --------------------------------- */
scene.add(sun);

// to make something rotate around another object, make the object a child of
// the parent and therefore, the child is relative to the parent and when the
// parent moves the child moves relative to the parent as well
// sun.add(mercury);

// Currently, all planets would orbit the sun at the same speed. However,
// planets don't rotate the same speed as the sun and orbit around the sun at
// different speeds. We can't control this in Three.js other than the speed of
// rotation of the sun, therefore all children of the sun would orbit the sun at
// the same speed even if we adjust that. A simple solution is to create an
// 'empty' parent object for each planet and put it in the same position as the
// sun and rotate each 'empty' parent object at different speeds to create
// different speeds orbiting around the sun. To do this, we don't need to create a geometry
// for each parent, just a 3d object instance (also more performant).

// mercury
mercInvisParent.add(mercury);
scene.add(mercInvisParent);
mercury.position.x = 28;

// saturn
satInvisParent.add(saturn);
scene.add(satInvisParent);
saturn.position.x = 138;

// venus
const venus = createPlanet(5.8, venusTexture, 44);
scene.add(venus.invisParent);

// earth
const earth = createPlanet(6, earthTexture, 62);
scene.add(earth.invisParent);

// mars
const mars = createPlanet(4, marsTexture, 78);
scene.add(mars.invisParent);

// jupiter
const jupiter = createPlanet(12, jupiterTexture, 100);
scene.add(jupiter.invisParent);

// uranus
const yourAnus = createPlanet(7, uranusTexture, 175, {
  innerRadius: 7,
  outerRadius: 12,
  texture: uranusRingTexture,
});
scene.add(yourAnus.invisParent);

// neptune
const neptune = createPlanet(7, neptuneTexture, 200);
scene.add(neptune.invisParent);

// pluto
const pluto = createPlanet(7, plutoTexture, 216);
scene.add(pluto.invisParent);

/* -------------------------------- animation ------------------------------- */

function animate() {
  // sun
  sun.rotateY(0.004);

  // planet
  mercInvisParent.rotateY(0.04);
  mercury.rotateY(0.004);

  // ring planet
  satInvisParent.rotateY(0.0009);
  saturn.rotateY(0.038);

  // planet itself rotation
  venus.planet.rotateY(0.002);
  earth.planet.rotateY(0.02);
  mars.planet.rotateY(0.018);
  jupiter.planet.rotateY(0.04);
  yourAnus.planet.rotateY(0.03);
  neptune.planet.rotateY(0.032);
  pluto.planet.rotateY(0.008);

  // around sun rotation
  venus.invisParent.rotateY(0.015);
  earth.invisParent.rotateY(0.01);
  mars.invisParent.rotateY(0.008);
  jupiter.invisParent.rotateY(0.002);
  yourAnus.invisParent.rotateY(0.0006);
  neptune.invisParent.rotateY(0.0005);
  pluto.invisParent.rotateY(0.0004);

  //
  renderer.render(scene, camera);
}

renderer.setAnimationLoop(animate);

// responsive renderer/canvas
window.addEventListener("resize", function () {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
