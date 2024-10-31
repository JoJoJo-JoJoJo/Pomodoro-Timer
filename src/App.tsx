import { ElementRef, useCallback, useEffect, useRef, useState } from "react";
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

/**
 * ! Test 24:
 * ? -> When session timer finishes, should start counting down from the break timer.
 * ! Test 27:
 * ? -> Audio beep not playing when timer hits 0.
 */


const App = () => {
  const [count, setCount] = useState<Count>(initCount);
  const [activeTimer, setActiveTimer] = useState<btnType>("session");
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [resetCalled, setResetCalled] = useState<boolean>(false);
  const [timerLength, setTimerLength] = useState<number>(25 * 60);

  const audioBeepRef = useRef<null | ElementRef<"audio">>(null);
  const audioLofiRef = useRef<null | ElementRef<"audio">>(null);

  useEffect(() => {
    if (isPlaying) {
      audioLofiRef.current?.play();
    } else {
      audioLofiRef.current?.pause();
    }
  }, [isPlaying]);

  useEffect(() => {
    setTimerLength(count[activeTimer] * 60);
  }, [count, activeTimer]);

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
            ...count,
            break: ++count.break,
          });
        } else {
          setCount({
            ...count,
            session: ++count.session,
          });
        }
        break;
      case "decrement":
        if (count[name] - 1 <= 0) return;
        if (name === "break") {
          setCount({
            ...count,
            break: --count.break,
          });
        } else {
          setCount({
            ...count,
            session: --count.session,
          });
        }
        break;
    }
  };

  const timerEnd = useCallback(() => {
    setIsPlaying(false);
    audioBeepRef.current?.play();
    setActiveTimer((prev) => (prev === "session" ? "break" : "session"));
    setTimeout(() => {
      audioBeepRef.current?.pause();
      setIsPlaying(true);
    }, 1100);
  }, []);

  const playPause = () => {
    setIsPlaying((prev) => !prev);
  };

  const reset = () => {
    setResetCalled((prev) => !prev);
    setTimeout(() => {
      setResetCalled((prev) => !prev);
    }, 100);
    setIsPlaying(false);
    setCount({
      break: 5,
      session: 25,
    });
    setActiveTimer("session");
    setTimerLength(25 * 60);
    audioBeepRef.current?.load();
    audioBeepRef.current?.pause();
    audioLofiRef.current?.load();
    audioLofiRef.current?.pause();
  };

  return (
    <div className="w-screen h-screen relative">
      <main className="w-full h-full overflow-hidden bg-calm-lake p-0 m-0 flex flex-col justify-evenly items-center">
        <div className="w-[70%] mt-10 bg-green-600 opacity-60 rounded-md">
          <h1 className="text-5xl text-green-100 text-center py-10 md:overline">
            Pomodoro Timer
          </h1>
          <audio
            ref={audioBeepRef}
            id="beep"
            src="/src/assets/ding-101492.mp3"
            typeof="audio/mpeg"
            className="text-white hidden"
          >
            Your browser does not support this audio element.
          </audio>
        </div>
        <Session activeTimer={activeTimer}>
          <Countdown
            timerLength={timerLength}
            isPlaying={isPlaying}
            resetCalled={resetCalled}
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

      <audio
        ref={audioLofiRef}
        loop
        id="lofi"
        src="src\assets\lofi-study-calm-peaceful-chill-hop-112191.mp3"
        typeof="audio/mpeg"
        className="text-white hidden"
      >
        Your browser does not support this audio element.
      </audio>

      <footer className="absolute bottom-0 w-full h-6 bg-green-950 text-center text-green-200 text-sm">
        Icon made by '@andinur' from 'www.flaticon.com'.
      </footer>
    </div>
  );
};

export default App;
