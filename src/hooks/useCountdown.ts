import { useState, useEffect } from "react";
import { Time } from "../types";

const useCountdown = (length: number, isPlaying: boolean) => {
  const [time, setTime] = useState<Time>({
    minutes: Math.floor(length / 60),
    seconds: length % 60,
  });

  useEffect(() => {
    const seconds = --time.seconds;

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
    }
  }, [time, isPlaying]);

  return { time }
}

export default useCountdown
