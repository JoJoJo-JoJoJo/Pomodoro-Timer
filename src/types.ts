import { ReactNode } from "react";

interface Time {
  minutes: number;
  seconds: number;
}

type btnType = "break" | "session";

type Count = {
  break: number;
  session: number;
};

interface LengthProps {
  children: ReactNode[];
  count: Count;
}

interface BtnGProps {
  text: ReactNode;
  id: string;
  onClick: () => void;
}

type BtnProps = {
  btnType: btnType;
  handleClick: (method: ArrowBtn) => void;
};

type ArrowBtn = {
  action: "increment" | "decrement";
  name: btnType;
};

export type { Count, LengthProps, BtnProps, ArrowBtn, BtnGProps, Time, btnType };
