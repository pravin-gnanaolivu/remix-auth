import { useFormContext, useIsSubmitting } from "remix-validated-form";

const SubmitButton = ({
  btnName,
  btnTranstionName,
}: {
  btnName: string;
  btnTranstionName: string;
}) => {
  const isSubmitting = useIsSubmitting();
  const { isValid, fieldErrors } = useFormContext();
  const disabled = isSubmitting || !isValid;

  return (
    <>
      <button
        type="submit"
        disabled={disabled}
        className="w-full rounded bg-blue-500  py-2 px-4 text-white hover:bg-blue-600 focus:bg-blue-400 disabled:bg-blue-50"
      >
        {isSubmitting ? btnTranstionName : btnName}
      </button>
    </>
  );
};

export default SubmitButton;
