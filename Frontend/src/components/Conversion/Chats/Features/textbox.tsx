import { Textarea } from "@/components/ui/textarea";

import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import CheckboxBasic from "./checkbox";
import SelectDemo from "./selecteddemo";

import { Button } from "@/components/ui/button";

import { useDispatch } from "react-redux";
import { Platform, addText, addDescribe } from "@/Store/chatdata/chatSlice";
import { useState } from "react";

export default function TextareaButton() {
  const dispatch = useDispatch();
  const [text, setText] = useState(false);
  const [describe, setDescribe] = useState(" ");
  const getText = (name: string, checked: boolean) => {
    setText(checked);
    if (name.includes("text")) dispatch(addText(text));
  };
  const getPlatform = (param: string) => {
    dispatch(Platform(param));
  };
  const dscription = () => {
    dispatch(addDescribe(describe));
    // console.log("this describe", describe);
  };
  return (
    <>
      <div className="flex w-full flex-col gap-4">
        <Textarea
          placeholder="Type your message here."
          onChange={(e) => setDescribe(e.target.value)}
        />
        <CheckboxBasic getValues={getText} Description="add text on the post" />
        <FieldGroup className="w-56">
          <Field orientation="horizontal">
            <FieldLabel htmlFor="terms-checkbox-basic">
              Select a Platform
            </FieldLabel>
          </Field>
        </FieldGroup>
        <SelectDemo setCategory={getPlatform} />
        <Button onClick={dscription} type="submit">
          Send message
        </Button>
      </div>
    </>
  );
}
