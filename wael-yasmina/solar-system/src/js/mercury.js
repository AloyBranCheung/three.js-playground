import * as THREE from "three";
import mercuryTexture from "../img/mercury.jpg";

const textureLoader = new THREE.TextureLoader();

const mercGeo = new THREE.SphereGeometry(3.2, 30, 30);
// mesh standard material so that the sun can emit light onto planet
const mercMat = new THREE.MeshStandardMaterial({
  map: textureLoader.load(mercuryTexture),
});
const mercury = new THREE.Mesh(mercGeo, mercMat);

export const mercInvisParent = new THREE.Object3D();

export default mercury;
