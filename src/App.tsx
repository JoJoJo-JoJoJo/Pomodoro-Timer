import { ElementRef, useCallback, useRef, useState } from "react";
import Session from "./current-session/Session.tsx";
import BreakLength from "./time-setters/BreakLength.tsx";
import { Btn, DecrementBtn, IncrementBtn } from "./components/Buttons.tsx";
import SessionLength from "./time-setters/SessionLength.tsx";
import { ArrowBtn, btnType, Count } from "./types.ts";
import { Pause, Play, Reset } from "./components/faIcons.tsx";
import Countdown from "./current-session/Countdown.tsx";

const initCount: Count = {
  break: 5,
  session: 25,
};

const App = () => {
  const [count, setCount] = useState<Count>(initCount);
  const [activeTimer, setActiveTimer] = useState<btnType>("session");
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  const audioRef = useRef<null | ElementRef<"audio">>(null);

  const handleCountClick = ({ action, name }: ArrowBtn) => {
    if (action !== "increment" && action !== "decrement") {
      throw new ReferenceError("Invalid action input");
    } else if (name !== "break" && name !== "session") {
      throw new ReferenceError("Invalid name input");
    }

    switch (action) {
      case "increment":
        if (count[name] + 1 > 60) return;
        if (name === "break") {
          setCount({
            break: ++count.break,
            session: count.session,
          });
        } else {
          setCount({
            break: count.break,
            session: ++count.session,
          });
        }
        break;
      case "decrement":
        if (count[name] - 1 <= 0) return;
        if (name === "break") {
          setCount({
            break: --count.break,
            session: count.session,
          });
        } else {
          setCount({
            break: count.break,
            session: --count.session,
          });
        }
        break;
    }
  };

  const timerEnd = useCallback(() => {
    setIsPlaying(false);
    //! Audio only plays after session timer finishes
    audioRef.current?.play();
    setActiveTimer((prev) => (prev === "session" ? "break" : "session"));
    setIsPlaying(true);
  }, []);

  const playPause = () => {
    setIsPlaying((prev) => !prev);
  };

  const reset = () => {
    setIsPlaying(false);
    setCount(initCount);
    setActiveTimer("session");
  };

  return (
    <div className="w-screen h-screen relative">
      <main className="w-full h-full overflow-hidden bg-calm-lake p-0 m-0 flex flex-col justify-evenly items-center">
        <div className="w-[70%] mt-10 bg-green-600 opacity-60 rounded-md">
          <h1 className="text-5xl text-green-100 text-center py-10 md:overline">
            Pomodoro Timer
          </h1>
          <audio
            ref={audioRef}
            autoPlay
            id="beep"
            src="/src/assets/ding-101492.mp3"
            typeof="audio/mpeg"
            className="text-white"
          >
            Your browser does not support this audio element.
          </audio>
        </div>
        <Session activeTimer={activeTimer}>
          <Countdown
            timerLength={count[activeTimer] * 60}
            isPlaying={isPlaying}
            timerEnd={timerEnd}
          />
          <Btn
            text={isPlaying ? <Pause /> : <Play />}
            id="start_stop"
            onClick={playPause}
          />
          <Btn text={<Reset />} id="reset" onClick={reset} />
        </Session>
        <div className="flex flex-row items-center justify-evenly w-full mb-[5%]">
          <BreakLength count={count}>
            <DecrementBtn btnType="break" handleClick={handleCountClick} />
            <IncrementBtn btnType="break" handleClick={handleCountClick} />
          </BreakLength>
          <SessionLength count={count}>
            <DecrementBtn btnType="session" handleClick={handleCountClick} />
            <IncrementBtn btnType="session" handleClick={handleCountClick} />
          </SessionLength>
        </div>
      </main>
      <footer className="absolute bottom-0 w-full h-6 bg-green-950 text-center text-green-200 text-sm">
        Icon made by '@andinur' from 'www.flaticon.com'.
      </footer>
    </div>
  );
};

export default App;
