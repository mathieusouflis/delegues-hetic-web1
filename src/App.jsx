import "./App.css";
import { gsap } from "gsap-trial";
import { ScrambleTextPlugin } from "gsap-trial/ScrambleTextPlugin";
import { useState, useEffect } from "react";

function App() {
  const [num, setNum] = useState(0);
  const [focused, setFocused] = useState(true);
  gsap.registerPlugin(ScrambleTextPlugin);
  console.log("feur")
  const chars =
    "6g9P=zT(9;NTu:C93ef$TVuPW+nz:>xwEckRGh2rCNcvTps]=CNTKde9)z656P?B";

  useEffect(() => {
    const scrambleGSAP = (text, duration) => {
      gsap.to(".title", {
        duration: duration,
        scrambleText: {
          chars,
          text: text,
          tweenLength: true,
        },
      });
    };

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
        scrambleGSAP("Noa & Mathieu", 3);
        break;
      case 1:
        scrambleGSAP("# 1", 1);
        break;
      case 2:
        scrambleGSAP("Communication", 3);
        break;
      case 3:
        scrambleGSAP("# 2", 1);
        break;
      case 4:
        scrambleGSAP("Médiation", 3);
        break;
      case 5:
        scrambleGSAP("# 3", 1);
        break;
      case 6:
        scrambleGSAP("Abscences", 3);
        break;
      case 7:
        scrambleGSAP("# 4", 1);
        break;
      case 8:
        scrambleGSAP("SOS", 3);
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
