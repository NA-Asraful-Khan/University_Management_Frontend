//Full Stack 7-8 for Raw Design

import { Form, Input } from "antd";
import { Controller } from "react-hook-form";

type TInputProps = {
  type: string;
  name: string;
  label?: string;
};
const CustomInput = ({ type, name, label }: TInputProps) => {
  return (
    <div className="mb-5">
      <Controller
        name={name}
        render={({ field, fieldState: { error } }) => (
          <Form.Item label={label}>
            <Input
              className="border border-1 border-black"
              {...field}
              type={type}
              id={name}
            />
            {error && <small className="text-red-600">{error.message}</small>}
          </Form.Item>
        )}
      />
    </div>
  );
};

export default CustomInput;
