import { twMerge } from "tailwind-merge";

const FormInputField2 = ({
  type = "text",
  label,
  placeholder = "",
  value = "",
  onChange,
  className,
}) => {
  const newClassName = twMerge("flex flex-col gap-1", className);
  return (
    <div className={newClassName}>
      <label
        htmlFor={label}
        className="block text-sm font-medium text-gray-700"
      >
        {label}
      </label>
      <input
        type={type}
        name={label}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-black focus:outline-none"
      />
    </div>
  );
};

export default FormInputField2;
