import { DatePicker, Form } from "antd";
import { Controller } from "react-hook-form";

type TDatePickerProps = {
  label?: string;
  name: string;
};
const CustomDatePicker = ({ label, name }: TDatePickerProps) => {
  return (
    <div>
      <Controller
        name={name}
        render={({ field, fieldState: { error } }) => (
          <Form.Item label={label}>
            <DatePicker
              style={{ width: "100%" }}
              {...field}
              className="border border-1 border-black rounded"
              size="middle"
            />
            {error && <small className="text-red-600">{error.message}</small>}
          </Form.Item>
        )}
      />
    </div>
  );
};

export default CustomDatePicker;
