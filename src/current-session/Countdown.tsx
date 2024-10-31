import { useCallback, useEffect, useState } from "react";
import { Time } from "../types";

interface TimerProps {
  timerLength: number;
  isPlaying: boolean;
  resetCalled: boolean;
  timerEnd: () => void;
}

const Countdown = ({
  timerLength,
  isPlaying,
  resetCalled,
  timerEnd,
}: TimerProps) => {
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
    if (minutes === 0 && seconds === 0) {
      timerEnd();
      setTimeout(() => {
        setNewTimer();
      }, 100);
    }
  }, [minutes, seconds, timerEnd, setNewTimer]);

  useEffect(() => {
    if (isPlaying) {
      // If timer is running:
      if (!timerStarted) setTimerStarted(true);
      shouldEnd();
      const countdown = setTimeout(() => {
        setTime({
          seconds: seconds === 0 ? 59 : seconds - 1,
          minutes: seconds === 0 ? minutes - 1 : minutes,
        });
      }, 1000);

      return () => {
        clearTimeout(countdown);
      };
    } else if (!timerStarted) {
      // On first load || Just been reset:
      setNewTimer();
    } else if (
      !isPlaying &&
      timerStarted &&
      timerLength === 25 * 60 &&
      resetCalled
    ) {
      // If timer needs to reset:
      setNewTimer();
      setTimerStarted(false);
    }
  }, [
    isPlaying,
    shouldEnd,
    setNewTimer,
    seconds,
    minutes,
    timerStarted,
    timerLength,
    resetCalled,
  ]);

  return (
    <p id="time-left" className="text-center text-white text-8xl">
      {`${minutes.toString().padStart(2, "00")}:${seconds
        .toString()
        .padStart(2, "00")}`}
    </p>
  );
};

export default Countdown;
