"use client";

import type { Variants } from "motion/react";
import { motion, useAnimation } from "motion/react";
import type { HTMLAttributes } from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";

import { cn } from "@/lib/utils";

export interface LayoutDashboardIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface LayoutDashboardIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

const rectVariants = (delay: number): Variants => ({
  normal: { scale: 1, opacity: 1 },
  animate: {
    scale: [1, 0.8, 1.1, 1],
    opacity: [1, 0.7, 1, 1],
    transition: { duration: 0.45, delay },
  },
});

const LayoutDashboardIcon = forwardRef<
  LayoutDashboardIconHandle,
  LayoutDashboardIconProps
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
        <motion.rect
          width="7"
          height="9"
          x="3"
          y="3"
          rx="1"
          variants={rectVariants(0)}
          animate={controls}
        />
        <motion.rect
          width="7"
          height="5"
          x="14"
          y="3"
          rx="1"
          variants={rectVariants(0.06)}
          animate={controls}
        />
        <motion.rect
          width="7"
          height="9"
          x="14"
          y="12"
          rx="1"
          variants={rectVariants(0.12)}
          animate={controls}
        />
        <motion.rect
          width="7"
          height="5"
          x="3"
          y="16"
          rx="1"
          variants={rectVariants(0.18)}
          animate={controls}
        />
      </svg>
    </div>
  );
});

LayoutDashboardIcon.displayName = "LayoutDashboardIcon";

export { LayoutDashboardIcon };
