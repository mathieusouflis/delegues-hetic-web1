wimport gsap from "gsap-trial";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/Addons.js";

const calculateDistance = (initial, final) => Math.abs(final - initial);

const dirigeate = (initial, final) => (initial < final ? 1 : -1);
const getSpeed = (distance, maxDistance, duration) =>
  (distance / maxDistance) * (maxDistance / duration);

const isOk = (initial, final) => Math.abs(initial - final) > 0.01;
const rotate = (start, end, speed) => start * (1 - speed) + end * speed;

export const createScene2 = async (sizes) => {
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0xffffff);

  const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
  camera.position.set(0, 0, 7);
  camera.lookAt(0, 0, 0);

  scene.add(camera);

  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
  scene.add(ambientLight);

  const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
  directionalLight.position.set(5, 5, 5);
  scene.add(directionalLight);

  const loader = new GLTFLoader();

  const loadText = async () => {
    return new Promise((resolve, reject) => {
      loader.load(
        "./src/threeJS/objects/merci.glb",
        (gltf) => {
          gltf.scene.children[1].visible = false;

          let text = gltf.scene.children[0];
          let initialPositions = [];
          let distances = [];
          text.scale.set(3, 3, 3);
          text.children.forEach((child, index) => {
            initialPositions.push({
              x: child.position.x,
              y: child.position.y,
              z: child.position.z,
            });
            child.position.set(
              -15 + Math.random() * (15 + 15),
              -5 + Math.random() * (5 + 5),
              -10 + Math.random() * (10 + 10),
            );
            distances.push({
              x: calculateDistance(child.position.x, initialPositions[index].x),
              y: calculateDistance(child.position.y, initialPositions[index].y),
              z: calculateDistance(child.position.z, initialPositions[index].z),
            });
          });

          resolve({ text, initialPositions, distances });
        },
        undefined,
        function (error) {
          console.error("Error loading GLB file", error);
        },
      );
    });
  };

  let { text, distances, initialPositions } = await loadText();

  scene.add(text);
  console.log(distances);

  return { scene, camera, text, distances, initialPositions };
};

export const animateScene2 = (assets, transition) => {
  const { text, distances, initialPositions } = assets;

  if (text) {
    if (transition) {
      text.rotation.x = rotate(text.rotation.x, Math.PI / 2, 0.01);
      text.rotation.y = rotate(text.rotation.y, 0, 0.01);
      text.rotation.z = rotate(text.rotation.z, 0, 0.01);

      const maxDistance = Math.max(
        ...distances.flatMap((d) => [d.x, d.y, d.z]),
      );
      const duration = 70;
      text.children.forEach((child, index) => {
        const distanceX = calculateDistance(
          child.position.x,
          initialPositions[index].x,
        );
        const distanceY = calculateDistance(
          child.position.y,
          initialPositions[index].y,
        );
        const distanceZ = calculateDistance(
          child.position.z,
          initialPositions[index].z,
        );

        const speedX = getSpeed(distanceX, maxDistance, duration);
        const speedY = getSpeed(distanceY, maxDistance, duration);
        const speedZ = getSpeed(distanceZ, maxDistance, duration);

        if (isOk(child.position.x, initialPositions[index].x)) {
          child.position.x +=
            dirigeate(child.position.x, initialPositions[index].x) * speedX;
        }
        if (isOk(child.position.y, initialPositions[index].y)) {
          child.position.y +=
            dirigeate(child.position.y, initialPositions[index].y) * speedY;
        }
        if (isOk(child.position.z, initialPositions[index].z)) {
          child.position.z +=
            dirigeate(child.position.z, initialPositions[index].z) * speedZ;
        }
      });
    } else {
      text.rotation.x += 0.001;
      text.rotation.z += 0.001;
      text.rotation.y += 0.001;
    }
  }
};
