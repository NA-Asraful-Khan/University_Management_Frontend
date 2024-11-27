import { Form, TimePicker } from "antd";
import dayjs from "dayjs";
import { Controller } from "react-hook-form";
import customParseFormat from "dayjs/plugin/customParseFormat";

type TTimePickerProps = {
  name: string;
  label?: string;
};

dayjs.extend(customParseFormat);
const CustomTimePicker = ({ name, label }: TTimePickerProps) => {
  const startTime = dayjs("12:08", "HH:mm");
  const endTime = dayjs("12:08", "HH:mm");

  return (
    <div className="mb-5">
      <Controller
        name={name}
        render={({ field, fieldState: { error } }) => (
          <Form.Item label={label}>
            <TimePicker.RangePicker
              style={{ width: "100%" }}
              {...field}
              className="border border-1 border-black"
              defaultValue={[startTime, endTime]}
              use12Hours
              format="h:mm a"
            />

            {error && <small className="text-red-600">{error.message}</small>}
          </Form.Item>
        )}
      />
    </div>
  );
};

export default CustomTimePicker;
