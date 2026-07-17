import { Checkbox } from "@/components/ui/checkbox";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";

interface CheckboxBasic {
  Description: string;
  getValues: (name: string, values: boolean) => void;
}
export default function CheckboxBasic({
  Description,
  getValues,
}: CheckboxBasic) {
  return (
    <FieldGroup className="w-56">
      <Field orientation="horizontal">
        <Checkbox
          id="terms-checkbox-basic"
          name="terms-checkbox-basic"
          onCheckedChange={(checked) => {
            getValues(Description, checked);
            // console.log(`${Description} is checked:-${checked}`);
          }}
        />
        <FieldLabel htmlFor="terms-checkbox-basic">{Description}</FieldLabel>
      </Field>
    </FieldGroup>
  );
}
