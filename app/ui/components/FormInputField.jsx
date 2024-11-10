"use client";

import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { twMerge } from "tailwind-merge";

const FormInputField = ({
  type = "text",
  label,
  placeholder = "",
  value = "",
  onChange,
  className,
  required = false,
}) => {
  const newClassName = twMerge("relative", className);
  const [visible, setVisible] = useState(false);

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  return (
    <div className={newClassName}>
      <label
        htmlFor={label}
        className="left-6 block text-sm font-medium text-white"
      >
        {label}
      </label>
      <input
        type={visible ? "text" : type}
        name={label}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        className="mt-2 block w-full rounded-md border-0 bg-white/5 px-4 py-1.5 text-white shadow-sm outline-none ring-1 ring-inset ring-white/10 focus:ring-white sm:text-sm sm:leading-6"
        required={required}
      />
      {type === "password" && (
        <button
          type="button"
          onClick={toggleVisibility}
          className="absolute right-3 top-9 text-gray-400 hover:text-white"
        >
          {visible ? <FaEyeSlash /> : <FaEye />}
        </button>
      )}
    </div>
  );
};

export default FormInputField;
