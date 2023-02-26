import "./style.css";
import * as THREE from "three";
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from "dat.gui";

// Texture Loader
const loader = new THREE.TextureLoader();
const height = loader.load("height.jpg");
const texture = loader.load("./texture.jpg");
const alpha = loader.load("/alpha.webp");

// Debug
const gui = new dat.GUI();

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

// Objects
const geometry = new THREE.PlaneBufferGeometry(3, 3, 64, 64);

// Materials
const material = new THREE.MeshStandardMaterial({
  color: "gray",
  map: texture,
  displacementMap: height,
  displacementScale: 0.4,
  alphaMap: alpha,
  transparent: true,
  depthTest: false,
});

// Mesh (Composed of object + material)
const plane = new THREE.Mesh(geometry, material);
plane.rotation.x = 181;
scene.add(plane);

// Plane GUI
const planeGUIFolder = gui.addFolder("Plane");
planeGUIFolder.add(plane.rotation, "x").min(-100).max(100);
planeGUIFolder.add(plane.rotation, "y").min(-100).max(100);
planeGUIFolder.add(plane.rotation, "z").min(-100).max(100);

// Lights
const pointLight = new THREE.PointLight("#00f0ff", 1);
pointLight.position.x = 2;
pointLight.position.y = 3;
pointLight.position.z = 4;
pointLight.intensity = 2.4;
scene.add(pointLight);

// PointLight GUI
const pointLightFolder = gui.addFolder("Point Light");
pointLightFolder.add(pointLight.position, "x");
pointLightFolder.add(pointLight.position, "y");
pointLightFolder.add(pointLight.position, "z");
pointLightFolder.add(pointLight, "intensity");

// gui color
const color = { color: "#00ff00" };
pointLightFolder.addColor(color, "color").onChange(() => {
  pointLight.color.set(color.color);
});

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth * 0.7,
  height: window.innerHeight,
};

window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth * 0.7;
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
camera.position.z = 3;
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

let mouseY = 0;

const animateTerrain = (event) => {
  mouseY = event.clientY;
};

document.addEventListener("mousemove", animateTerrain);

const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  // Update objects
  plane.rotation.z = 0.5 * elapsedTime;
  plane.material.displacementScale = 0.3 + mouseY * 0.0004;

  // Update Orbital Controls
  // controls.update()

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
