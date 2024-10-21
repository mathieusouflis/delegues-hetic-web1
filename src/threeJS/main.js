import * as THREE from "three";
import { animateScene1, createScene1 } from "./scenes/scene1.js";
import { animateScene2, createScene2 } from "./scenes/scene2.js";

const init = async () => {
  const canvas = document.querySelector("canvas.webgl");
  const page = document.querySelector("#root");

  const sizes = {
    height: canvas.clientHeight,
    width: canvas.clientWidth,
  };

  const renderer = new THREE.WebGLRenderer({ canvas });
  renderer.setSize(sizes.width, sizes.height);

  const scene1 = await createScene1(sizes);
  const scene2 = await createScene2(sizes);

  let transition = false;
  let phase3Complete = false;
  localStorage.setItem("phase", 1);

  const tick = () => {
    const phase = localStorage.getItem("phase");
    if (phase !== "4") {
      if (phase === "2") page.style.display = "none";
      if (phase === "3") page.style.display = "flex";
      animateScene1(scene1);
      renderer.shadowMap.enabled = true;
      renderer.render(scene1.scene, scene1.camera);
    } else {
      animateScene2(scene2, transition);
      renderer.render(scene2.scene, scene2.camera);
      if (!phase3Complete) {
        page.style.display = "none";
        canvas.addEventListener("click", () => {
          transition = true;
        });
        phase3Complete = true;
      }
    }

    window.requestAnimationFrame(tick);
  };

  tick();
};

init();
