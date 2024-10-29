import { BtnGProps, BtnProps } from "../types";

const Btn = ({ text, id, onClick }: BtnGProps) => (
  <button className="btn py-2 px-8" onClick={onClick} id={id}>
    {text}
  </button>
);

const IncrementBtn = ({ btnType, handleClick }: BtnProps) => (
  <button
    onClick={() => handleClick({ action: "increment", name: btnType })}
    id={`${btnType}-increment`}
    className="text-3xl text-green-300"
  >
    ↟
  </button>
);

const DecrementBtn = ({ btnType, handleClick }: BtnProps) => (
  <button
    onClick={() => handleClick({ action: "decrement", name: btnType })}
    id={`${btnType}-decrement`}
    className="text-3xl text-green-300"
  >
    ↡
  </button>
);

export { IncrementBtn, DecrementBtn, Btn };
