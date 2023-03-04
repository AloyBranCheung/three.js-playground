import "../styles.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import * as dat from "dat.gui";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

// images
import mountain from "../img/mountain.jpg";
import mountain2 from "../img/mountain2.jpg";

// test import object
import sphere from "./objects/sphere";
import {
  ambientLight,
  directionalLight,
  dLightHelper,
  dLightShadowHelper,
  spotLight,
  sLightHelper,
} from "./lights/lights";

const monkeyUrl = new URL("../assets/monkey.glb", import.meta.url);

//
const assetLoader = new GLTFLoader();
assetLoader.load(
  monkeyUrl.href,
  (gltf) => {
    const model = gltf.scene;
    scene.add(model);
    model.position.set(-12, 4, 10);
  },
  undefined,
  (error) => {
    console.error(error);
  }
);

/* -------------------------------------------------------------------------- */
const gui = new dat.GUI();

/* -------------------------------- Renderer -------------------------------- */

const renderer = new THREE.WebGLRenderer();

renderer.shadowMap.enabled = true;

renderer.setSize(window.innerWidth, window.innerHeight);

renderer.setClearColor(0xffea00);

document.body.appendChild(renderer.domElement);

/* ---------------------------------- Scene --------------------------------- */
const scene = new THREE.Scene();

// asset loading
const textureLoader = new THREE.TextureLoader();
scene.background = textureLoader.load(mountain);

// const cubeTextureLoader = new THREE.CubeTextureLoader();
// scene.background = cubeTextureLoader.load([
//   mountain,
//   mountain,
//   mountain,
//   mountain,
//   mountain,
//   mountain,
// ]);

/* --------------------------------- Camera --------------------------------- */
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

/* ------------------------------ OrbitControl ------------------------------ */
const orbit = new OrbitControls(camera, renderer.domElement);
// orbit.enableDamping = true;
// orbit.autoRotate = true;
// orbit.enablePan = false;

/* --------------------------------- Helper --------------------------------- */
const axesHelper = new THREE.AxesHelper(window.innerWidth);
scene.add(axesHelper);

const gridHelper = new THREE.GridHelper(30);
scene.add(gridHelper);

/* -------------------------------------------------------------------------- */
// adjust camera to see axes helper
camera.position.set(-10, 30, 30);
orbit.update(); // must be called every time after you change position of camera

// adding objects MESH = Object
const boxGeometry = new THREE.BoxGeometry();
const boxMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const boxObj = new THREE.Mesh(boxGeometry, boxMaterial);
scene.add(boxObj);

//
const planeGeometry = new THREE.PlaneGeometry(30, 30);
const planeMaterial = new THREE.MeshStandardMaterial({
  color: 0xffffff,
  side: THREE.DoubleSide,
});
const plane = new THREE.Mesh(planeGeometry, planeMaterial);
plane.rotation.x = -0.5 * Math.PI;
plane.receiveShadow = true;
scene.add(plane);

//
// const sphereGeometry = new THREE.SphereGeometry(4);
// const sphereMaterial = new THREE.MeshBasicMaterial({ color: 0x0000ff });
// const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
// gui
const options = {
  sphereColor: "#ffea00",
  wireframe: false,
  speed: 0.01,
  angle: 0.2,
  penumbra: 0,
  intensity: 1,
};

gui.addColor(options, "sphereColor").onChange((e) => {
  sphere.material.color.set(e);
});
gui.add(options, "wireframe").onChange((e) => {
  sphere.material.wireframe = e;
});
gui.add(options, "speed", 0, 0.1);
gui.add(options, "angle", 0, 1);
gui.add(options, "penumbra", 0, 1);
gui.add(options, "intensity", 0, 1);

scene.add(sphere);

const box2Geometry = new THREE.BoxGeometry(4, 4, 4);
const box2Material = new THREE.MeshBasicMaterial({
  // color: 0x00ff00,
  map: textureLoader.load(mountain),
});
const box2MultiMaterial = [
  new THREE.MeshBasicMaterial({
    map: textureLoader.load(mountain2),
  }),
  new THREE.MeshBasicMaterial({
    map: textureLoader.load(mountain),
  }),
  new THREE.MeshBasicMaterial({
    map: textureLoader.load(mountain2),
  }),
  new THREE.MeshBasicMaterial({
    map: textureLoader.load(mountain2),
  }),
  new THREE.MeshBasicMaterial({
    map: textureLoader.load(mountain),
  }),
  new THREE.MeshBasicMaterial({
    map: textureLoader.load(mountain),
  }),
];
const box2 = new THREE.Mesh(box2Geometry, box2MultiMaterial);
scene.add(box2);
box2.position.set(0, 15, 10);

const plane2Geometry = new THREE.PlaneGeometry(10, 10, 10, 10);
const plane2Material = new THREE.MeshBasicMaterial({
  color: 0xffffff,
  wireframe: true,
});
const plane2 = new THREE.Mesh(plane2Geometry, plane2Material);
scene.add(plane2);
plane2.position.set(10, 10, 15);

// const vShader = `
//   void main() {
//     gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
//   }
// `;

// const fShader = `
// void main() {
//   gl_FragColor = vec4(0.5, 0.5, 1.0, 1.0);
// }
// `;

// shaders
const sphere2Geometry = new THREE.SphereGeometry(4);
const sphere2Material = new THREE.ShaderMaterial({
  vertexShader: document.getElementById("vertexShader").textContent,
  fragmentShader: document.getElementById("fragmentShader").textContent,
});
const sphere2 = new THREE.Mesh(sphere2Geometry, sphere2Material);
scene.add(sphere2);
sphere2.position.set(-5, 10, 10);

// responsive
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

/* ----------------------------------- fog ---------------------------------- */
// scene.fog = new THREE.Fog(0xffffff, 0, 200);
scene.fog = new THREE.FogExp2(0xffffff, 0.01);

/* --------------------------------- lights --------------------------------- */
scene.add(ambientLight);
// scene.add(directionalLight);
// scene.add(dLightHelper);
// scene.add(dLightShadowHelper);
scene.add(spotLight);
scene.add(sLightHelper);

/* ------------------------------- raycasting ------------------------------- */
const mousePosition = new THREE.Vector2();
window.addEventListener("mousemove", (e) => {
  mousePosition.x = (e.clientX / window.innerWidth) * 2 - 1;
  mousePosition.y = -(e.clientY / window.innerHeight) * 2 + 1;
});

const rayCaster = new THREE.Raycaster();

const sphereId = sphere.id;
box2.name = "box2";

/* -------------------------------- Animation ------------------------------- */
let step = 0;

const animate = (time) => {
  //
  // orbit.update(); // required for dampen camera effect

  //
  boxObj.rotation.x = time / 1000;
  boxObj.rotation.y = time / 1000;

  //
  step += options.speed;
  sphere.position.y = 10 * Math.abs(Math.sin(step));

  //
  spotLight.angle = options.angle;
  spotLight.penumbra = options.penumbra;
  spotLight.intensity = options.intensity;
  sLightHelper.update();

  // camera and noramlized mouse position for ray
  rayCaster.setFromCamera(mousePosition, camera);
  const intersects = rayCaster.intersectObjects(scene.children);

  intersects.forEach((intersect) => {
    if (intersect.object.id === sphereId) {
      intersect.object.material.color.set(0xff0000);
    }
    if (intersect.object.name === box2.name) {
      intersect.object.rotation.x = time / 1000;
      intersect.object.rotation.y = time / 1000;
    }
  });

  //
  plane2.geometry.attributes.position.array[0] -= 10 * Math.random();
  plane2.geometry.attributes.position.array[1] -= 10 * Math.random();
  plane2.geometry.attributes.position.array[2] -= 10 * Math.random();
  plane2.geometry.attributes.position.array[
    plane2.geometry.attributes.position.array.length - 1
  ] -= 10 * Math.random();
  plane2.geometry.attributes.position.needsUpdate = true;

  //
  renderer.render(scene, camera);
};

renderer.setAnimationLoop(animate);
