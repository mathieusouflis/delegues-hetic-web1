import * as THREE from "three";
import { gsap } from "gsap-trial";

const setPhase = (phase) => {
  localStorage.setItem("phase", phase);
};

const createScene1 = (sizes) => {
  const scene = new THREE.Scene();
  const box1 = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial({ color: 0xff0000 }),
  );
  const box2 = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial({ color: 0xffffff }),
  );
  const box3 = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial({ color: 0xffffff }),
  );
  box2.position.set(0, 2, -2);
  box3.position.set(0, 2, 0);
  box1.position.set(0, 0, 0);
  scene.add(box1);
  scene.add(box2);

  const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
  camera.position.set(box1.position.x, box1.position.y, box1.position.z + 5);

  scene.add(camera);

  const axesHelper = new THREE.AxesHelper(2);
  scene.add(axesHelper);

  localStorage.setItem("phase", 1);

  return { scene, camera, box3, box2 };
};

const animateScene1 = (page, assets) => {
  const { camera, box3, box2 } = assets;
  const phase = localStorage.getItem("phase");
  if (phase === "2" && camera.position.y < box3.position.y) {
    page.style.display = "none";
    gsap.to(camera.position, {
      duration: 2,
      delay: 1,
      y: box2.position.y,
      z: box2.position.z + 1,
      onComplete: () => setPhase(3),
    });
  } else if (phase === "3") {
    page.style.display = "flex";
  }

  camera.lookAt(box2.position);
};

export { createScene1, animateScene1 };
