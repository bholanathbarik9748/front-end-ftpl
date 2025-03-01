import React from "react";

const BtnLoadingAnimation = ({
  text = "Processing...",
  size = 20,
  color = "white",
}) => {
  return (
    <div
      className="flex items-center gap-2 text-white"
      role="status"
      aria-live="polite"
    >
      <svg
        className={`animate-spin`}
        width={size}
        height={size}
        viewBox="0 0 50 50"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        aria-hidden="true"
      >
        <circle
          className="opacity-25"
          cx="25"
          cy="25"
          r="20"
          stroke={color}
          strokeWidth="5"
        />
        <path
          className="opacity-75"
          fill={color}
          d="M25 5a20 20 0 0120 20h-5a15 15 0 00-15-15V5z"
        />
      </svg>
      <span className="text-sm">{text}</span>
    </div>
  );
};

export default BtnLoadingAnimation;
