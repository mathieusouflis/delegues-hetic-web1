import { GLTFLoader } from "three/examples/jsm/Addons.js";
import { calculateDistance } from "./utils";

export function loadText(scene) {
  const loader = new GLTFLoader();
  let initialPositions = [];
  let distances = [];
  let text;
  loader.load(
    "./src/threeJS/objects/merci.glb",
    (gltf) => {
      gltf.scene.children[1].visible = false;

      text = gltf.scene.children[0];
      text.scale.set(3, 3, 3);
      text.children.forEach((child) => {
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
      });
      distances = text.children.map((child, index) => ({
        x: calculateDistance(child.position.x, initialPositions[index].x),
        y: calculateDistance(child.position.y, initialPositions[index].y),
        z: calculateDistance(child.position.z, initialPositions[index].z),
      }));
      scene.add(text);
    },
    undefined,
    function (error) {
      console.error("Error loading GLB file", error);
    },
  );
  // return { text, distances, initialPositions };
}
