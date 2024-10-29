import React from "react";
import { LengthProps } from "../types";

const SessionLength = ({ children, count }: LengthProps) => {
  return (
    <div className="bg-green-700 opacity-60 rounded-lg px-8 py-4">
      <label
        id="session-label"
        htmlFor="session-set"
        className="text-2xl text-white overline"
      >
        Session Length
      </label>
      <div
        id="session-set"
        className="flex flex-row items-center justify-between py-4"
      >
        {React.Children.toArray(children)[0]}
        <p className="text-3xl text-white">
          <span id="session-length">{count.session}</span>
          <span>:00</span>
        </p>
        {React.Children.toArray(children)[1]}
      </div>
    </div>
  );
};

export default SessionLength;
