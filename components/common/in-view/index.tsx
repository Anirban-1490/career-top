"use client";

import React, { PropsWithChildren } from "react";
import { useInView, animated, useSpring } from "react-spring";

export function InView({ children }: PropsWithChildren) {
  const [ref, springs] = useInView(
    () => {
      return {
        from: {
          y: 100,
          opacity: 0,
        },
        to: {
          y: 0,
          opacity: 1,
        },
      };
    },
    {
      rootMargin: "10% 0%",
      once: true,
    }
  );
  return (
    <animated.div ref={ref} style={springs}>
      {children}
    </animated.div>
  );
}
