import * as THREE from "three";

export const ambientLight = new THREE.AmbientLight(0x333333);

// directional
export const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
directionalLight.position.set(-30, 50, 0);
directionalLight.castShadow = true;
directionalLight.shadow.camera.bottom = -12;

export const dLightHelper = new THREE.DirectionalLightHelper(
  directionalLight,
  5
);

export const dLightShadowHelper = new THREE.CameraHelper(
  directionalLight.shadow.camera
);

// spotlight
export const spotLight = new THREE.SpotLight(0xffffff);
spotLight.position.set(-100, 100, 0);
spotLight.castShadow = true;
spotLight.angle = 0.2;

export const sLightHelper = new THREE.SpotLightHelper(spotLight);
