import * as THREE from "three";

import { GLTFLoader, Sky } from "three/examples/jsm/Addons.js";
import gsap from "gsap-trial";

let cameraCubeP = new THREE.Vector3(1.7, 4.5, 1.5);
let currentLookAt;
const createScene1 = async (sizes) => {
  // Scene
  const scene = new THREE.Scene();

  //Fog
  const fog = new THREE.FogExp2("#af9678", 0.025);
  scene.fog = fog;

  /**
   * Lights
   */

  const ambientLight = new THREE.AmbientLight("#fffed6", 100);

  scene.add(ambientLight);

  const pointLight = new THREE.PointLight("#fffed6", 100);
  pointLight.position.x = -12;
  pointLight.position.y = 10;
  pointLight.position.z = 10;

  pointLight.shadow.mapSize.width = 2048;
  pointLight.shadow.mapSize.height = 2048;

  pointLight.castShadow = true;

  scene.add(pointLight);

  const carLight_1 = new THREE.SpotLight(
    "#fbffc4",
    50,
    10,
    Math.PI * 0.2,
    0.25,
    1,
  );
  const carLight_2 = new THREE.SpotLight(
    "#fbffc4",
    50,
    10,
    Math.PI * 0.2,
    0.25,
    1,
  );

  carLight_1.castShadow = true;
  carLight_2.castShadow = true;

  carLight_1.position.x = -4;
  carLight_1.position.y = 2.49;
  carLight_1.position.z = 3.5;

  carLight_1.target.position.x = -4;
  carLight_1.target.position.y = 2.2;
  carLight_1.target.position.z = 5;

  carLight_2.position.x = -2.75;
  carLight_2.position.y = 2.49;
  carLight_2.position.z = 3.5;

  carLight_2.target.position.x = -2.75;
  carLight_2.target.position.y = 2.2;
  carLight_2.target.position.z = 5;

  scene.add(carLight_1, carLight_2, carLight_1.target, carLight_2.target);

  /**
   * Objects
   */

  //group

  const group = new THREE.Group();

  scene.add(group);

  const cameraCube = new THREE.Mesh(
    new THREE.BoxGeometry(0.25, 0.25, 0.25),
    new THREE.MeshStandardMaterial(),
  );

  cameraCube.position.x = -3.22;
  cameraCube.position.y = 2.34;
  cameraCube.position.z = 3.19;
  cameraCubeP = cameraCube.position;

  scene.add(cameraCube);

  // Models
  const gltfLoader = new GLTFLoader();

  const loadCar = () => {
    return new Promise((resolve) => {
      gltfLoader.load("src/threeJS/models/toy_car/scene.gltf", (gltf) => {
        let car = gltf.scene;

        car.position.x = -3.5;
        car.position.y = 2.1;
        car.position.z = 2.2;
        car.scale.set(0.6, 0.6, 0.6);

        car.traverse(function (node) {
          if (node.isMesh) node.castShadow = true;
        });

        resolve(car);
      });
    });
  };

  let car = await loadCar();
  scene.add(car);

  const loadForest = () => {
    return new Promise((resolve) => {
      gltfLoader.load("src/threeJS/models/forest/scene.gltf", (gltf) => {
        let forest = gltf.scene;

        forest.rotation.y = Math.PI;

        forest.traverse(function (node) {
          if (node.isMesh) {
            node.castShadow = true;
            node.receiveShadow = true;
          }
        });

        resolve(forest);
      });
    });
  };
  let forest = await loadForest();
  scene.add(forest);

  const loadBillboard = () => {
    return new Promise((resolve) => {
      gltfLoader.load("src/threeJS/models/billboard/scene.gltf", (gltf) => {
        let billboard = gltf.scene;

        billboard.scale.set(0.4, 0.4, 0.4);

        billboard.position.x = 1.7;
        billboard.position.y = 1;
        billboard.position.z = 1.5;

        billboard.rotation.y = Math.PI * 0.5;

        billboard.traverse(function (node) {
          if (node.isMesh) node.castShadow = true;
        });

        billboard.traverse(function (node) {
          if (node.isMesh) node.receiveShadow = true;
        });

        resolve(billboard);
      });
    });
  };

  let billboard = await loadBillboard();

  scene.add(billboard);

  const loadBillboard2 = () => {
    return new Promise((resolve) => {
      gltfLoader.load("src/threeJS/models/billboard/scene.gltf", (gltf) => {
        let billboard_2 = gltf.scene;

        billboard_2.scale.set(0.4, 0.4, 0.4);

        billboard_2.position.x = 1.7;
        billboard_2.position.y = 1;
        billboard_2.position.z = 33;

        billboard_2.rotation.y = Math.PI * 0.5;

        billboard_2.traverse(function (node) {
          if (node.isMesh) node.castShadow = true;
        });

        billboard_2.traverse(function (node) {
          if (node.isMesh) node.receiveShadow = true;
        });
        resolve(billboard_2);
      });
    });
  };

  let billboard_2 = await loadBillboard2();
  scene.add(billboard_2);
  /**
   * Sizes
   */

  window.addEventListener("resize", () => {
    // Update sizes
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;

    // Update camera
    camera.aspect = sizes.width / sizes.height;
    camera.updateProjectionMatrix();
  });

  /**
   * Camera
   */

  // Base camera
  const camera = new THREE.PerspectiveCamera(
    25,
    sizes.width / sizes.height,
    0.1,
    500,
  );
  camera.position.x = -1;
  camera.position.z = 1.5;
  camera.position.y = 4.5;

  camera.rotation.order = "YXZ";
  scene.add(camera);

  currentLookAt = { x: billboard.position.x, y: 4.5, z: billboard.position.z };
  camera.lookAt(currentLookAt.x, currentLookAt.y, currentLookAt.z);

  /**
   * Sky
   */

  const sky = new Sky();
  sky.rotation.y = Math.PI * 2;
  sky.scale.set(100, 100, 100);
  scene.add(sky);

  sky.material.uniforms["turbidity"].value = 10;
  sky.material.uniforms["rayleigh"].value = 8;
  sky.material.uniforms["mieCoefficient"].value = 0.1;
  sky.material.uniforms["mieDirectionalG"].value = 0.95;
  sky.material.uniforms["sunPosition"].value.set(3, -0.038, 0.2);
  const assets = {
    scene,
    camera,
    forest,
    billboard,
    billboard_2,
    pointLight,
    ambientLight,
    group,
  };
  return assets;
};

/**
 * Animate
 */

const animateScene1 = (assets) => {
  let {
    ambientLight,
    camera,
    forest,
    billboard,
    billboard_2,
    pointLight,
    group,
  } = assets;
  if (forest) {
    group.add(forest);
  }
  if (billboard) {
    group.add(billboard);
  }
  if (billboard_2) {
    group.add(billboard_2);
  }
  if (pointLight) {
    group.add(pointLight);
  }

  const phase = localStorage.getItem("phase");
  if (group && group.children.length <= 4) {
    // ---------------- ANIM 1

    if (phase === "2") {
      gsap.to(ambientLight, {
        duration: 1,
        intensity:
          group.position.z < -31.5 && camera.position.y >= 4.58 ? 10 : 0.01,
        onComplete: () => {
          if (group.position.z < -31.5 && camera.position.y >= 4.58) {
            gsap.delayedCall(0.2, () => {
              localStorage.setItem("phase", 3);
            });
          }
        },
      });

      const targetPosition =
        group.position.z > -31.5
          ? { x: -14.87, y: 3.81, z: 0.29 }
          : {
              x: -1,
              y: 4.6,
              z: 1.8,
            };

      const targetLookAtPosition =
        group.position.z > -31.5
          ? cameraCubeP
          : { x: billboard.position.x - 0.2, y: 4.6, z: billboard.position.z };

      gsap.to(camera.position, {
        duration: 2,
        delay: 1.5,
        ...targetPosition,
        onUpdate: () => {
          const targetLookAt = new THREE.Vector3();
          targetLookAt.lerpVectors(currentLookAt, targetLookAtPosition, 0.1);
          camera.lookAt(targetLookAt);
        },
        onComplete: () => {
          if (group.position.z > -31.5) {
            group.position.z -= 0.032;
          }
        },
      });
      gsap.to(currentLookAt, {
        duration: 2,
        delay: 1.5,
        ...targetLookAtPosition,
      });
    }
  }
};

export { animateScene1, createScene1 };
