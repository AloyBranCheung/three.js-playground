import * as THREE from "three";

// no rings
const createPlanet = (size, texture, position, ringProps) => {
  const textureLoader = new THREE.TextureLoader();

  const planetGeo = new THREE.SphereGeometry(size, 30, 30);
  // mesh standard material so that the sun can emit light onto planet
  const planetMat = new THREE.MeshStandardMaterial({
    map: textureLoader.load(texture),
  });
  const planet = new THREE.Mesh(planetGeo, planetMat);

  const invisParent = new THREE.Object3D();

  invisParent.add(planet);
  planet.position.x = position;

  if (ringProps) {
    // ring
    const planetRingGeo = new THREE.RingGeometry(
      ringProps.innerRadius,
      ringProps.outerRadius,
      32
    );
    // mesh standard material so that the sun can emit light onto planet
    const planetRingMat = new THREE.MeshStandardMaterial({
      map: textureLoader.load(ringProps.texture),
      side: THREE.DoubleSide,
    });
    const planetRing = new THREE.Mesh(planetRingGeo, planetRingMat);
    planet.add(planetRing);

    planetRing.rotation.x = ringProps.rotationX || -0.5 * Math.PI;
  }

  return { invisParent, planet };
};

export default createPlanet;
