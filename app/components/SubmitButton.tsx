import { useFormContext, useIsSubmitting } from "remix-validated-form";
import { Button } from "./Button";

const SubmitButton = ({
  btnName,
  btnTranstionName,
}: {
  btnName: string;
  btnTranstionName: string;
}) => {
  const isSubmitting = useIsSubmitting();
  const { isValid } = useFormContext();
  const disabled = isSubmitting || !isValid;

  return (
    <>
      <Button
        label={isSubmitting ? btnTranstionName : btnName}
        {...{
          type: "submit",
          disabled,
        }}
      />
    </>
  );
};

export default SubmitButton;
