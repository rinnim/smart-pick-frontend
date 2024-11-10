const Label = ({ title, htmlFor }) => {
  return (
    <label
      htmlFor={htmlFor}
      className="left-6 block text-sm font-medium text-white"
    >
      {title}
    </label>
  );
};

export default Label;
