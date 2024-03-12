export const Input = ({
  name,
  label,
  placeholder = "fill input",
  type = "text",
  register,
  error,
  value,
}) => {
  return (
    <div className="form-control">
      <label className="label">
        <span className="label-text">{label}</span>
      </label>
      <input
        value={value}
        name={name}
        type={type}
        placeholder={placeholder}
        className="input input-bordered text-black"
        {...register}
      />
      <span className="py-2 text-red-500">{error}</span>
    </div>
  );
};
