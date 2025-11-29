"use client";
import React from "react";
import { useSpring, animated } from "react-spring";

interface ICounterProps extends React.HTMLAttributes<HTMLDivElement> {
  endValue: number;
  startValue?: number;
}

export function Counter({ endValue, startValue = 0, ...props }: ICounterProps) {
  const { number } = useSpring({
    from: { number: startValue },
    to: { number: endValue },
    delay: 100,
  });

  return (
    <animated.div {...props}>
      {number.to(
        (num) => num.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "+"
      )}
    </animated.div>
  );
}
