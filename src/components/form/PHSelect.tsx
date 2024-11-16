import { Form, Select } from "antd";
import { Controller } from "react-hook-form";

type TSelectOptions = {
  value: string;
  label: string;
  disabled?: boolean;
};

type TSelectProps = {
  label: string;
  options: TSelectOptions[];
  name: string;
};
const PHSelect = ({ options, label, name }: TSelectProps) => {
  return (
    <Controller
      name={name}
      render={({ field }) => (
        <Form.Item label={label}>
          <Select
            defaultValue=""
            style={{ width: "100%" }}
            {...field}
            allowClear
            options={options}
            placeholder={`Select ${label}`}
          />
        </Form.Item>
      )}
    />
  );
};

export default PHSelect;
