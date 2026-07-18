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
  const items = [
    { label: "Select a platform", value: null },
    { label: "Instgram Feed", value: "Instgram Feed size (4:5)" },
    { label: "Instagram Story", value: "Instagram Story size (9:16)" },
    { label: "Facebook Post", value: "Facebook Post size (1:1)" },
    { label: "LinkedIn Post", value: "LinkedIn Post size (1:1)" },
    { label: "X (Twitter) Post", value: "X (Twitter) Post size (16:9)" },
  ];
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
        <SelectDemo setCategory={getPlatform} items={items} />
        <Button onClick={dscription} type="submit">
          Send message
        </Button>
      </div>
    </>
  );
}
