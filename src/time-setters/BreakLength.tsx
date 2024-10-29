import React from "react";
import { LengthProps } from "../types";

const BreakLength = ({ children, count }: LengthProps) => {
  return (
    <div className="bg-green-700 opacity-60 rounded-lg px-8 py-4">
      <label
        id="break-label"
        htmlFor="break-set"
        className="text-2xl text-white overline"
      >
        Break Length
      </label>
      <div
        id="break-set"
        className="flex flex-row items-center justify-between py-4"
      >
        {React.Children.toArray(children)[0]}
        <p className="text-3xl text-white">
          <span id="break-length">{count.break}</span>
          <span>:00</span>
        </p>
        {React.Children.toArray(children)[1]}
      </div>
    </div>
  );
};

export default BreakLength;
