import { Form, Input } from "antd";
import { Controller } from "react-hook-form";
import { ReactNode } from "react";
import { Eye, EyeOff } from "lucide-react";

type TInputProps = {
  type: string;
  name: string;
  label?: string;
  disabled?: boolean;
  className?: string;
  prefix?: ReactNode;
  placeholder?: string;
};

const CustomInput = ({
  type,
  name,
  label,
  disabled = false,
  className = "",
  prefix,
  placeholder,
}: TInputProps) => {
  const inputProps = {
    disabled,
    id: name,
    prefix,
    placeholder,
    className: `
      h-11 
      bg-white 
      transition-all 
      duration-200
      ${className}
      ${disabled ? "bg-gray-50 cursor-not-allowed" : ""}
    `,
  };

  return (
    <div className="mb-5">
      <Controller
        name={name}
        render={({ field, fieldState: { error } }) => (
          <Form.Item
            label={
              label && (
                <span className="text-sm font-medium text-gray-700">
                  {label}
                </span>
              )
            }
            className="mb-2"
          >
            {type === "password" ? (
              <Input.Password
                {...field}
                {...inputProps}
                iconRender={(visible) =>
                  visible ? (
                    <Eye className="w-5 h-5 text-gray-400 hover:text-blue-500 transition-colors" />
                  ) : (
                    <EyeOff className="w-5 h-5 text-gray-400 hover:text-blue-500 transition-colors" />
                  )
                }
                className={`
                  ${inputProps.className}
                  ${
                    error
                      ? "border-red-500 hover:border-red-600"
                      : "hover:border-blue-400"
                  }
                `}
              />
            ) : (
              <Input
                {...field}
                {...inputProps}
                type={type}
                className={`
                  ${inputProps.className}
                  ${
                    error
                      ? "border-red-500 hover:border-red-600"
                      : "hover:border-blue-400"
                  }
                `}
              />
            )}
            {error && (
              <small className="text-red-500 text-xs mt-1 ml-1 block">
                {error.message}
              </small>
            )}
          </Form.Item>
        )}
      />
    </div>
  );
};

export default CustomInput;
