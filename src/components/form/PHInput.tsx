//Full Stack 7-8 for Raw Design

import { Input } from "antd";
import { Controller } from "react-hook-form";

type TInputProps = {
  type: string;
  name: string;
  label?: string;
};
const PHInput = ({ type, name, label }: TInputProps) => {
  return (
    <div className="mb-5">
      {label && <label htmlFor={name}>{label}: </label>}

      <Controller
        name={name}
        render={({ field }) => (
          <Input
            className="border border-1 border-black"
            {...field}
            type={type}
            id={name}
          />
        )}
      />
    </div>
  );
};

export default PHInput;
