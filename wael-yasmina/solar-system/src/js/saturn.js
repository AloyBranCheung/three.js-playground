import * as THREE from "three";
import saturnTexture from "../img/saturn.jpg";
import saturnRingTexture from "../img/saturn ring.png";

const textureLoader = new THREE.TextureLoader();

// planet
const satGeo = new THREE.SphereGeometry(10, 30, 30);
// mesh standard material so that the sun can emit light onto planet
const satMat = new THREE.MeshStandardMaterial({
  map: textureLoader.load(saturnTexture),
});
const saturn = new THREE.Mesh(satGeo, satMat);

// ring
const satRingGeo = new THREE.RingGeometry(10, 20, 32);
// mesh standard material so that the sun can emit light onto planet
const satRingMat = new THREE.MeshStandardMaterial({
  map: textureLoader.load(saturnRingTexture),
  side: THREE.DoubleSide,
});
export const saturnRing = new THREE.Mesh(satRingGeo, satRingMat);
saturn.add(saturnRing);
saturnRing.rotation.x = -0.5 * Math.PI;

//
export const satInvisParent = new THREE.Object3D();

export default saturn;
