import * as THREE from "three";

// sun should emit light so we put a point light in the center of a sun that
// emits light in all direction

// (color, intensity, distance (max range of light)
const sunLight = new THREE.PointLight(0xffffff, 2, 300);
export const sunLightHelper = new THREE.PointLightHelper(sunLight, 3);

export default sunLight;
