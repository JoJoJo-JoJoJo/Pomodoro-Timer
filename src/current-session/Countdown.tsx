import { useCallback, useEffect, useState } from "react";
import { Count, Time } from "../types";

interface TimerProps {
  count: Count;
  activeTimer: string;
  timerLength: number;
  isPlaying: boolean;
  resetCalled: boolean;
  timerEnd: () => void;
}

const Countdown = ({
  count,
  activeTimer,
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

  const setNewTimer = useCallback((time: number): void => {
    setTime({
      minutes: Math.floor(time / 60),
      seconds: time % 60,
    });
  }, []);

  // * ------------------------------------------------------------------------------------->
  const shouldEnd = useCallback((): void => {
    if (minutes === 0 && seconds === 0 && isPlaying) {
      timerEnd();
      const newLength =
        activeTimer === "session" ? count.break * 60 : count.session * 60;
      setTimeout(() => {
        setNewTimer(newLength);
      }, 1010);
    }
  }, [
    minutes,
    seconds,
    isPlaying,
    timerEnd,
    activeTimer,
    count.session,
    count.break,
    setNewTimer,
  ]);
  // * ------------------------------------------------------------------------------------->

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
    } else if (!isPlaying && !timerStarted) {
      // (On first load || Just been reset) && Timer not started again yet:
      setNewTimer(timerLength);
    } else if (!isPlaying && timerStarted && resetCalled) {
      // If timer needs to reset:
      setNewTimer(timerLength);
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
