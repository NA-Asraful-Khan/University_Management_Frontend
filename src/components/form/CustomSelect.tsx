import { Form, Select } from "antd";
import { Controller } from "react-hook-form";

type TSelectOptions = {
  value: string | number;
  label: string | number;
  disabled?: boolean;
};

type TSelectProps = {
  label: string | number;
  options: TSelectOptions[];
  name: string;
};
const CustomSelect = ({ options, label, name }: TSelectProps) => {
  return (
    <Controller
      name={name}
      render={({ field, fieldState: { error } }) => (
        <Form.Item label={label}>
          <Select
            defaultValue=""
            style={{ width: "100%" }}
            {...field}
            allowClear
            options={options}
            placeholder={`Select ${label}`}
            size="middle"
          />
          {error && <small className="text-red-600">{error.message}</small>}
        </Form.Item>
      )}
    />
  );
};

export default CustomSelect;
