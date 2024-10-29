import { ReactNode } from "react";
import { btnType, Time } from "./types";

interface SessionProps {
  children: ReactNode[];
  time: Time;
  activeTimer: btnType;
}

const Session = ({ children, time, activeTimer }: SessionProps) => {
  const { minutes, seconds } = time;

  const title = `${activeTimer.slice(0, 1).toUpperCase()}${activeTimer.slice(1)}`;

  return (
    <div className="w-[70%] max-lg:h-[40%] bg-green-700 opacity-70 rounded-md flex flex-col items-center justify-evenly my-[10%] xl:py-16">
      <p id="timer-label" className="text-4xl overline text-white">
        {title}
      </p>
      <p id="time-left" className="text-center text-white text-8xl">{`${minutes
        .toString()
        .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`}</p>
      <div className="w-[50%] flex flex-row items-center justify-evenly">
        {children}
      </div>
    </div>
  );
};

export default Session;
