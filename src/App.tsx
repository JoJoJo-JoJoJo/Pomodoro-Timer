import { useEffect, useState } from "react";
import Session from "./Session.tsx";
import BreakLength from "./time-setters/BreakLength.tsx";
import { Btn, DecrementBtn, IncrementBtn } from "./components/Buttons.tsx";
import SessionLength from "./time-setters/SessionLength.tsx";
import { ArrowBtn, btnType, Count } from "./types.ts";
import { Pause, Play, Reset } from "./components/faIcons.tsx";
import useCountdown from "./hooks/useCountdown.ts";

const initCount: Count = {
  break: 5,
  session: 25,
};

function App() {
  const [count, setCount] = useState<Count>(initCount);
  const [activeTimer, setActiveTimer] = useState<btnType>("session");
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [hasAudio, setHasAudio] = useState<boolean>(true);

  const time = useCountdown(count[activeTimer] * 60, isPlaying);

  useEffect(() => {
    if (time.minutes === 0 && time.seconds - 1 < 0) {
      setIsPlaying(false);
      setActiveTimer((prev) => (prev === "session" ? "break" : "session"));
      setHasAudio((prev) => !prev);
    }
  }, [time, isPlaying]);

  const handleClick = ({ action, name }: ArrowBtn) => {
    if (action !== "increment" && action !== "decrement") {
      throw new ReferenceError("Invalid action input");
    } else if (name !== "break" && name !== "session") {
      throw new ReferenceError("Invalid name input");
    }

    if (count[name] - 1 < 0 || count[name] + 1 > 60) return;

    switch (action) {
      case "increment":
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

  const playPause = () => {
    setIsPlaying((prev) => !prev);
  };

  const reset = () => {
    setIsPlaying(false);
    setCount({
      break: initCount.break,
      session: initCount.session,
    });
    setActiveTimer("session");
  };

  return (
    <div className="w-screen h-screen relative">
      <main className="w-full h-full overflow-hidden bg-calm-lake p-0 m-0 flex flex-col justify-evenly items-center">
        <div className="w-[70%] mt-10 bg-green-600 opacity-60 rounded-md">
          <h1 className="text-5xl text-green-100 text-center py-10 md:overline">
            Pomodoro Timer
          </h1>
          {hasAudio && (
            <audio
              autoPlay
              id="beep"
              src="/src/assets/ding-101492.mp3"
              typeof="audio/mpeg"
              className="text-white"
            >
              Your browser does not support this audio element.
            </audio>
          )}
        </div>
        <Session time={time} activeTimer={activeTimer}>
          <Btn
            text={isPlaying ? <Pause /> : <Play />}
            id="start_stop"
            onClick={playPause}
          />
          <Btn text={<Reset />} id="reset" onClick={reset} />
        </Session>
        <div className="flex flex-row items-center justify-evenly w-full mb-[5%]">
          <BreakLength count={count}>
            <DecrementBtn btnType="break" handleClick={handleClick} />
            <IncrementBtn btnType="break" handleClick={handleClick} />
          </BreakLength>
          <SessionLength count={count}>
            <DecrementBtn btnType="session" handleClick={handleClick} />
            <IncrementBtn btnType="session" handleClick={handleClick} />
          </SessionLength>
        </div>
      </main>
      <footer className="absolute bottom-0 w-full h-6 bg-green-950 text-center text-green-200 text-sm">
        Icon made by '@andinur' from 'www.flaticon.com'.
      </footer>
    </div>
  );
}

export default App;
