import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import * as dat from "dat.gui";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import gsap from "gsap";
const tl = gsap.timeline();

const loadingManager = new THREE.LoadingManager();
const gltfLoader = new GLTFLoader(loadingManager);

loadingManager.onStart = function (url, item, total) {
  console.log(`started loading ${url}`);
  tl.pause();
};
// GSAP timeline

const progressBar = document.getElementById("progress-bar");
loadingManager.onProgress = function (url, itemsLoaded, itemsTotal) {
  progressBar.value = (itemsLoaded / itemsTotal) * 100;
};

loadingManager.onLoad = function () {
  gsap.to(".progress-bar-container", {
    opacity: 0,
    display: "none",
    duration: 1,
  });
  tl.resume();
};

loadingManager.onError = function (url) {
  console.error(`Error loading ${url}`);
};

// Debug
const gui = new dat.GUI();

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Phone
gltfLoader.load("blenderPhone.gltf", (gltf) => {
  gltf.scene.scale.set(0.3, 0.3, 0.3);
  gltf.scene.rotation.set(0, 3.3, 0);

  scene.add(gltf.scene);

  // dat.gui
  const phoneGUI = gui.addFolder("Phone");
  phoneGUI.add(gltf.scene.rotation, "x").min(-20).max(9);
  phoneGUI.add(gltf.scene.rotation, "y").min(0).max(9);
  phoneGUI.add(gltf.scene.rotation, "z").min(0).max(9);

  // gsap
  tl.to(".webgl", { opacity: 1, duration: 1, delay: 0.3 });
  tl.to(gltf.scene.rotation, { y: 4.7, duration: 1 }, "<");
  tl.to(gltf.scene.scale, { x: 0.2, y: 0.2, z: 0.2, duration: 1 }, "<");
  tl.to(gltf.scene.position, { x: -0.5 });
  tl.to(gltf.scene.rotation, { y: 5.4, duration: 0.7 }, "<");
  tl.to(gltf.scene.scale, { x: 0.25, y: 0.25, z: 0.25, duration: 1 }, "<");
  tl.to(".container", { opacity: 1, top: "40%", duration: 1 }, "<");
});

// Scene
const scene = new THREE.Scene();

// Lights

const pointLight = new THREE.AmbientLight(0xffffff, 1);
pointLight.position.x = 2;
pointLight.position.y = 3;
pointLight.position.z = 4;
scene.add(pointLight);

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

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
camera.position.z = 1;
scene.add(camera);

// dat.gui
const cameraGUI = gui.addFolder("Camera");
cameraGUI.add(camera.position, "x").min(0).max(10);
cameraGUI.add(camera.position, "y").min(0).max(10);
cameraGUI.add(camera.position, "z").min(0).max(10);

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

const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  // Update objects

  // Update Orbital Controls
  // controls.update()

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
