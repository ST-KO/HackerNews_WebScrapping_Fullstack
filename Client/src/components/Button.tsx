import React from "react";
import { Link } from "react-router-dom";

interface ButtonProp {
  url: string;
  text: string;
}

const Button: React.FC<ButtonProp> = ({ url, text }) => {
  return (
    <div className="px-6">
      <Link
        to={url}
        className="bg-gray-900 w-max text-white font-medium px-4 py-2 rounded-md flex gap-1 items-center"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"
          />
        </svg>
        {text}
      </Link>
    </div>
  );
};

export default Button;
