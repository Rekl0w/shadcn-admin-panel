"use client";

import type { Variants } from "motion/react";
import { motion, useAnimation } from "motion/react";
import type { HTMLAttributes } from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";

import { cn } from "@/lib/utils";

export interface MapIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface MapIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

const MAP_VARIANTS: Variants = {
  normal: { scale: 1, rotate: 0 },
  animate: {
    scale: [1, 0.95, 1.05, 1],
    rotate: [0, -2, 2, 0],
    transition: { duration: 0.5, ease: "easeInOut" },
  },
};

const FOLD_VARIANTS: Variants = {
  normal: { pathLength: 1, opacity: 1 },
  animate: {
    pathLength: [0.3, 1],
    opacity: [0.5, 1],
    transition: { duration: 0.4, delay: 0.1 },
  },
};

const MapIcon = forwardRef<MapIconHandle, MapIconProps>(
  ({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
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
          <motion.path
            d="M14.106 5.553a2 2 0 0 0 1.788 0l3.659-1.83A1 1 0 0 1 21 4.619v12.764a1 1 0 0 1-.553.894l-4.553 2.277a2 2 0 0 1-1.788 0l-4.212-2.106a2 2 0 0 0-1.788 0l-3.659 1.83A1 1 0 0 1 3 19.381V6.618a1 1 0 0 1 .553-.894l4.553-2.277a2 2 0 0 1 1.788 0z"
            variants={MAP_VARIANTS}
            animate={controls}
            style={{ originX: "12px", originY: "12px" }}
          />
          <motion.path
            d="M15 5.764v15"
            variants={FOLD_VARIANTS}
            animate={controls}
          />
          <motion.path
            d="M9 3.236v15"
            variants={FOLD_VARIANTS}
            animate={controls}
          />
        </svg>
      </div>
    );
  },
);

MapIcon.displayName = "MapIcon";

export { MapIcon };
