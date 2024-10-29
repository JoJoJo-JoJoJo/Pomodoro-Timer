import { useEffect, useState } from "react";
import { Time } from "../types";

interface TimerProps {
  timerLength: number;
  isPlaying: boolean;
  timerEnd: () => void;
}

const Countdown = ({ timerLength, isPlaying, timerEnd }: TimerProps) => {
  const [time, setTime] = useState<Time>({
    minutes: Math.floor(timerLength / 60),
    seconds: timerLength % 60,
  });

  const { minutes, seconds } = time;

  useEffect(() => {
    const seconds = time.seconds - 1;

    if (time.minutes === 0 && seconds < 0) {
      timerEnd();
    }

    const countdown = setTimeout(() => {
      if (isPlaying) {
        setTime({
          seconds: seconds < 0 ? 59 : seconds,
          minutes: time.seconds - 1 < 0 ? time.minutes - 1 : time.minutes,
        });
      }
    }, 1000);

    return () => {
      clearTimeout(countdown);
    };
  }, [time, isPlaying, timerEnd]);

  /**
   * * After every re-render of the component, the useEffect hook:
   * * -> First, runs the cleanup code with the old props and state.
   * * -> Then, runs the setup code with the new props and state.
   * ? The cleanup code is also run one last time after the component unmounts.
   */

  return (
    <p id="time-left" className="text-center text-white text-8xl">
      {`${minutes.toString().padStart(2, "0")}:${seconds
        .toString()
        .padStart(2, "0")}`}
    </p>
  );
};

export default Countdown;
