//Full Stack 7-8 for Raw Design

import { Form, Input } from "antd";
import { Controller } from "react-hook-form";

type TInputProps = {
  type: string;
  name: string;
  label?: string;
};
const PHInput = ({ type, name, label }: TInputProps) => {
  return (
    <div className="mb-5">
      <Controller
        name={name}
        render={({ field }) => (
          <Form.Item label={label}>
            <Input
              className="border border-1 border-black"
              {...field}
              type={type}
              id={name}
            />
          </Form.Item>
        )}
      />
    </div>
  );
};

export default PHInput;
