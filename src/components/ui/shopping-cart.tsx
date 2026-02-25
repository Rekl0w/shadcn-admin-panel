"use client";

import type { Variants } from "motion/react";
import { motion, useAnimation } from "motion/react";
import type { HTMLAttributes } from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";

import { cn } from "@/lib/utils";

export interface ShoppingCartIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface ShoppingCartIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

const CART_VARIANTS: Variants = {
  normal: { translateX: 0 },
  animate: {
    translateX: [0, -2, 2, 0],
    transition: { duration: 0.4, ease: "easeInOut" },
  },
};

const WHEEL_VARIANTS: Variants = {
  normal: { scale: 1 },
  animate: {
    scale: [1, 1.3, 1],
    transition: { duration: 0.3, delay: 0.15 },
  },
};

const ShoppingCartIcon = forwardRef<
  ShoppingCartIconHandle,
  ShoppingCartIconProps
>(({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
  const controls = useAnimation();
  const isControlledRef = useRef(false);

  useImperativeHandle(ref, () => {
    isControlledRef.current = true;
    return {
      startAnimation: () => controls.start("animate"),
      stopAnimation: () => controls.start("normal"),
    };
  });

  const handleMouseEnter = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!isControlledRef.current) controls.start("animate");
      onMouseEnter?.(e);
    },
    [controls, onMouseEnter],
  );

  const handleMouseLeave = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!isControlledRef.current) controls.start("normal");
      onMouseLeave?.(e);
    },
    [controls, onMouseLeave],
  );

  return (
    <div
      className={cn(className)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <motion.circle
          cx="8"
          cy="21"
          r="1"
          variants={WHEEL_VARIANTS}
          animate={controls}
        />
        <motion.circle
          cx="19"
          cy="21"
          r="1"
          variants={WHEEL_VARIANTS}
          animate={controls}
        />
        <motion.path
          d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"
          variants={CART_VARIANTS}
          animate={controls}
        />
      </svg>
    </div>
  );
});

ShoppingCartIcon.displayName = "ShoppingCartIcon";

export { ShoppingCartIcon };
