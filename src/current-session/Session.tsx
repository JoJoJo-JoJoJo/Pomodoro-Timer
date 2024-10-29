import { ReactNode } from "react";
import { btnType } from "../types";
import React from "react";

interface SessionProps {
  children: ReactNode[];
  activeTimer: btnType;
}

const Session = ({ children, activeTimer }: SessionProps) => {
  const title = `${activeTimer.slice(0, 1).toUpperCase()}${activeTimer.slice(
    1
  )}`;

  return (
    <div className="w-[70%] max-lg:h-[40%] bg-green-700 opacity-70 rounded-md flex flex-col items-center justify-evenly my-[10%] xl:py-16">
      <p id="timer-label" className="text-4xl overline text-white">
        {title}
      </p>
      {React.Children.toArray(children)[0]}
      <div className="w-[50%] flex flex-row items-center justify-evenly">
        {React.Children.toArray(children).slice(1)}
      </div>
    </div>
  );
};

export default Session;
