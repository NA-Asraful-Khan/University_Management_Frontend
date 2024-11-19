import { Form, Select } from "antd";
import { Controller } from "react-hook-form";
import { TSelectOptions } from "../../types";

type TSelectProps = {
  label: string | number;
  options: TSelectOptions[];
  name: string;
  disabled?: boolean;
};
const CustomSelect = ({ disabled, options, label, name }: TSelectProps) => {
  return (
    <Controller
      name={name}
      render={({ field, fieldState: { error } }) => (
        <Form.Item label={label}>
          <Select
            className="border border-1 border-black rounded"
            defaultValue=""
            style={{ width: "100%" }}
            {...field}
            allowClear
            options={options}
            placeholder={`Select ${label}`}
            size="middle"
            disabled={disabled}
          />
          {error && <small className="text-red-600">{error.message}</small>}
        </Form.Item>
      )}
    />
  );
};

export default CustomSelect;
