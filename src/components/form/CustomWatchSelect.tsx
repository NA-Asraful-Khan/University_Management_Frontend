import { Form, Select } from "antd";
import { Controller, useFormContext, useWatch } from "react-hook-form";
import { TSelectOptions } from "../../types";
import { useEffect } from "react";

type TSelectProps = {
  label: string | number;
  options: TSelectOptions[];
  name: string;
  disabled?: boolean;
  mode?: "multiple" | undefined;
  onValueChange: React.Dispatch<React.SetStateAction<string>>;
};
const CustomWatchSelect = ({
  disabled,
  options,
  label,
  name,
  mode,
  onValueChange,
}: TSelectProps) => {
  const { control } = useFormContext();

  const inputValue = useWatch({
    control,
    name,
  });

  useEffect(() => {
    onValueChange(inputValue);
  }, [onValueChange, inputValue]);

  return (
    <Controller
      name={name}
      render={({ field, fieldState: { error } }) => (
        <Form.Item label={label}>
          <Select
            mode={mode}
            className="border border-1 border-black rounded"
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

export default CustomWatchSelect;
