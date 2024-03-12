import { useForm } from "react-hook-form";
import { Input } from "../Inputs/inputs";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";

export const Form = ({
  data,
  inputs,
  schema,
  children,
  onSubmit,
  disabled,
}) => {
  const [values, setValues] = useState(data ?? {});

  const { register, handleSubmit, watch, formState } = useForm({
    resolver: yupResolver(schema),
  });

  const renderInputs = (input, errors) => {
    switch (input.cat) {
      default:
        return (
          <Input
            placeholder={input.placeholder}
            label={input.label}
            type={input.type}
            name={input.name}
            value={values[input?.name]}
            register={register(input.name)}
            error={errors[input.name]?.message}
          />
        );
    }
  };

  const submit = (data) => {
    onSubmit(data);
  };

  const onChange = ({ target }) => {
    setValues({ ...values, [target.name]: target.value });
  };

  return (
    <form onSubmit={handleSubmit(submit)} onChange={onChange}>
      {inputs.map((input) => renderInputs(input, formState.errors))}
      {children}
      <div className="form-control mt-6">
        <input
          disabled={disabled}
          className="btn "
          value="submit"
          type="submit"
        />
      </div>
    </form>
  );
};
