import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import * as dat from "dat.gui";

// Debug
const gui = new dat.GUI();

// Loading
const textureLoader = new THREE.TextureLoader().load("textures/NormalMap.png");

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

// Objects
const geometry = new THREE.SphereGeometry(0.5, 64, 64);

// Materials

const material = new THREE.MeshStandardMaterial({
  normalMap: textureLoader,
  metalness: 0.7,
  roughness: 0.23,
  color: new THREE.Color("#6bb34d"),
});

// Mesh
const sphere = new THREE.Mesh(geometry, material);
scene.add(sphere);

// Lights

const pointLight = new THREE.PointLight(0xffffff, 0.1);
pointLight.position.x = 2;
pointLight.position.y = 3;
pointLight.position.z = 4;
scene.add(pointLight);

// red light
const pointLight2 = new THREE.PointLight("#FF0000", 2);
pointLight2.position.set(-1.86, 1, -1.65);
pointLight2.intensity = 10;

scene.add(pointLight2);

// gui red light helper
// const redLight = gui.addFolder("Red Light");
// redLight.add(pointLight2.position, "x").min(-3).max(3).step(0.01);
// redLight.add(pointLight2.position, "y").min(-6).max(6).step(0.01);
// redLight.add(pointLight2.position, "z").min(-3).max(3).step(0.01);
// redLight.add(pointLight2, "intensity").min(0).max(10).step(0.01);

// const pointLightHelper = new THREE.PointLightHelper(pointLight2, 1);
// scene.add(pointLightHelper);

// blue
const pointLight3 = new THREE.PointLight(0x87ff, 2);
pointLight3.position.set(1.86, -1, -1.65);
pointLight3.intensity = 10;

scene.add(pointLight3);

// gui bluelight helper
// const blueLight = gui.addFolder("Blue Light");
// blueLight.add(pointLight3.position, "x").min(-3).max(3).step(0.01);
// blueLight.add(pointLight3.position, "y").min(-6).max(6).step(0.01);
// blueLight.add(pointLight3.position, "z").min(-3).max(3).step(0.01);
// blueLight.add(pointLight3, "intensity").min(0).max(10).step(0.01);
// const guiColorHelper = {
//   color: 0xff0000,
// };
// blueLight
//   .addColor(guiColorHelper, "color")
//   .onChange(() => pointLight3.color.set(guiColorHelper.color));
// const pointLightHelperBlue = new THREE.PointLightHelper(pointLight3, 1);
// scene.add(pointLightHelperBlue);

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

// responsive size
window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.x = 0;
camera.position.y = 0;
camera.position.z = 2;
scene.add(camera);

// Controls
// const controls = new OrbitControls(camera, canvas)
// controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  alpha: true,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/**
 * Animate
 */

let mouseX = 0;
let mouseY = 0;

let targetX = 0;
let targetY = 0;

const windowHalfX = window.innerWidth / 2;
const windowHalfY = window.innerHeight / 2;

const onDocumentMouseMove = (event) => {
  mouseX = event.clientX - windowHalfX;
  mouseY = event.clientY - windowHalfY;
};

document.addEventListener("mousemove", onDocumentMouseMove);

const updateSphere = (event) => {
  sphere.position.y = window.scrollY * 0.01;
};

window.addEventListener("scroll", updateSphere);

const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  targetX = mouseX * 0.001;
  targetY = mouseY * 0.001;

  // Update objects
  sphere.rotation.y = 0.5 * elapsedTime;
  sphere.rotation.y += 0.05 * (targetX - sphere.rotation.y);
  sphere.rotation.x += 0.5 * (targetY - sphere.rotation.x);
  sphere.rotation.z += 0.5 * (targetY - sphere.rotation.z);

  // Update Orbital Controls
  // controls.update()

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
