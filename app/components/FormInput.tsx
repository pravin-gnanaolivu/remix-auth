import { useField } from "remix-validated-form";

type MyInputProps = {
  name: string;
  label: string;
  type: string;
};

const FormInput = ({ name, label, type }: MyInputProps) => {
  const { error, getInputProps } = useField(name);
  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <input
        {...getInputProps({ id: name })}
        type={type}
        className="w-full rounded border border-gray-500 px-2 py-1 text-lg"
        autoFocus={true}
        autoComplete="email"
      />
      {error && <span className="text-red-500">{error}</span>}
    </div>
  );
};

export default FormInput;
