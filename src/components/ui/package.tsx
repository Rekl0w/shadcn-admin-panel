"use client";

import type { Variants } from "motion/react";
import { motion, useAnimation } from "motion/react";
import type { HTMLAttributes } from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";

import { cn } from "@/lib/utils";

export interface PackageIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface PackageIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

const BOUNCE_VARIANTS: Variants = {
  normal: { translateY: 0 },
  animate: {
    translateY: [0, -2, 0],
    transition: { duration: 0.3, ease: "easeInOut" },
  },
};

const LINE_VARIANTS: Variants = {
  normal: { pathLength: 1, opacity: 1 },
  animate: {
    pathLength: [0.5, 1],
    opacity: [0.6, 1],
    transition: { duration: 0.4, delay: 0.1 },
  },
};

const PackageIcon = forwardRef<PackageIconHandle, PackageIconProps>(
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
            d="m16.5 9.4-9-5.19"
            variants={LINE_VARIANTS}
            animate={controls}
          />
          <motion.path
            d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"
            variants={BOUNCE_VARIANTS}
            animate={controls}
          />
          <motion.polyline
            points="3.29 7 12 12 20.71 7"
            variants={LINE_VARIANTS}
            animate={controls}
          />
          <motion.line
            x1="12"
            x2="12"
            y1="22"
            y2="12"
            variants={LINE_VARIANTS}
            animate={controls}
          />
        </svg>
      </div>
    );
  },
);

PackageIcon.displayName = "PackageIcon";

export { PackageIcon };
