import "./App.css";
import { gsap } from "gsap-trial";
import { ScrambleTextPlugin } from "gsap-trial/ScrambleTextPlugin";
import { useState, useEffect } from "react";

function App() {
  const [num, setNum] = useState(0);
  const [focused, setFocused] = useState(true);
  gsap.registerPlugin(ScrambleTextPlugin);

  const chars =
    "6g9P=zT(9;NTu:C93ef$TVuPW+nz:>xwEckRGh2rCNcvTps]=CNTKde9)z656P?B";

  useEffect(() => {
    const changePageEvent = (e) => {
      const phase = localStorage.getItem("phase");
      if (e.key === "ArrowRight") {
        if (num === 8) {
          localStorage.setItem("phase", 4);
        }
        if (phase === "1") {
          setNum(1);
          setFocused(false);
          localStorage.setItem("phase", 2);
        } else if (phase === "3") {
          setNum((old) => old + 1);
        }
      }
      e.key === "ArrowLeft" && setNum((old) => old - 1);
    };

    switch (num) {
      case 0:
        gsap.to(".title", {
          duration: 3,
          scrambleText: {
            chars,
            text: "Noa & Mathieu",
            tweenLength: true,
          },
        });
        break;
      case 1:
        gsap.to(".title", {
          duration: 0,
          scrambleText: {
            chars,
            text: "# 1",
            tweenLength: true,
          },
        });
        break;
      case 2:
        gsap.to(".title", {
          duration: 3,
          scrambleText: {
            chars,
            text: "Communication",
            tweenLength: true,
          },
        });
        break;
      case 3:
        gsap.to(".title", {
          duration: 1,
          scrambleText: {
            chars,
            text: "# 2",
            tweenLength: true,
          },
        });
        break;
      case 4:
        gsap.to(".title", {
          duration: 3,
          scrambleText: {
            chars,
            text: "Lacunes",
            tweenLength: true,
          },
        });
        break;
      case 5:
        gsap.to(".title", {
          duration: 1,
          scrambleText: {
            chars,
            text: "# 3",
            tweenLength: true,
          },
        });
        break;
      case 6:
        gsap.to(".title", {
          duration: 3,
          scrambleText: {
            chars,
            text: "Abscences",
            tweenLength: true,
          },
        });
        break;
      case 7:
        gsap.to(".title", {
          duration: 1,
          scrambleText: {
            chars,
            text: "# 4",
            tweenLength: true,
          },
        });
        break;
      case 8:
        gsap.to(".title", {
          duration: 3,
          scrambleText: {
            chars,
            text: "Problèmes",
            tweenLength: true,
          },
        });
        break;
      default:
        console.log(num);
    }

    window.addEventListener("keydown", changePageEvent);

    return () => {
      window.removeEventListener("keydown", changePageEvent);
    };
  }, [num, focused]);

  return (
    <div>
      <h1 className="title"></h1>
    </div>
  );
}

export default App;
