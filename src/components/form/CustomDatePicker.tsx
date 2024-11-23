import { DatePicker, Form } from "antd";
import dayjs from "dayjs";
import { Controller } from "react-hook-form";
import customParseFormat from "dayjs/plugin/customParseFormat";

type TDatePickerProps = {
  label?: string;
  name: string;
  defaultValue?: string | undefined;
};

dayjs.extend(customParseFormat);

const dateFormat = "YYYY/MM/DD";
const CustomDatePicker = ({ label, name, defaultValue }: TDatePickerProps) => {
  const date = defaultValue ? new Date(defaultValue) : new Date();

  const formattedDate =
    date.getFullYear() +
    "/" +
    String(date.getMonth() + 1).padStart(2, "0") +
    "/" +
    String(date.getDate()).padStart(2, "0");

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
              defaultValue={dayjs(formattedDate, dateFormat)}
              format={dateFormat}
            />
            {error && <small className="text-red-600">{error.message}</small>}
          </Form.Item>
        )}
      />
    </div>
  );
};

export default CustomDatePicker;
