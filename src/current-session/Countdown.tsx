import { useCallback, useEffect, useState } from "react";
import { Time } from "../types";

interface TimerProps {
  timerLength: number;
  isPlaying: boolean;
  timerEnd: () => void;
}

/**
 * ! Timer has not reached 00:00.
 * ! Timer paused but countdown continued - expected '00' to equal '59'.
 */

const Countdown = ({ timerLength, isPlaying, timerEnd }: TimerProps) => {
  const [time, setTime] = useState<Time>({
    minutes: Math.floor(timerLength / 60),
    seconds: timerLength % 60,
  });
  const { minutes, seconds } = time;

  const [timerStarted, setTimerStarted] = useState(false);



  const setNewTimer = useCallback((): void => {
    setTime({
      minutes: Math.floor(timerLength / 60),
      seconds: timerLength % 60,
    });
  }, [timerLength]);

  const shouldEnd = useCallback((): void => {
    if (minutes === 0 && seconds < 1) {
      timerEnd();
      setNewTimer();
    }
  }, [minutes, seconds, timerEnd, setNewTimer]);



  useEffect(() => {
    if (isPlaying) {
      setTimerStarted(true)
      shouldEnd();
      const countdown = setTimeout(() => {
        setTime({
          seconds: seconds - 1 < 0 ? 59 : seconds - 1,
          minutes: seconds - 1 < 0 ? minutes - 1 : minutes,
        });
      }, 1000);

      return () => {
        clearTimeout(countdown);
      };
    } else if (
      !timerStarted ||
      (!isPlaying && timerStarted && timerLength === 25 * 60)
    ) {
      setNewTimer();
    }
  }, [isPlaying, shouldEnd, setNewTimer, seconds, minutes, timerStarted, timerLength]);



  return (
    <p id="time-left" className="text-center text-white text-8xl">
      {`${minutes.toString().padStart(2, "00")}:${seconds
        .toString()
        .padStart(2, "00")}`}
    </p>
  );
};

export default Countdown;
