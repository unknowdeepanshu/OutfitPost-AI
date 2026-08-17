import { Textarea } from "@/components/ui/textarea";

import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import CheckboxBasic from "./checkbox";
import SelectDemo from "./selecteddemo";

import { Button } from "@/components/ui/button";

import { useDispatch, useSelector } from "react-redux";
import { Platform, addText, addDescribe } from "@/Store/chatdata/chatSlice";
import type { RootState } from "@/Store/store";
import { useEffect, useState } from "react";

export default function TextareaButton({
  description,
  seletedValue,
  textAdd,
}: {
  description: string;
  seletedValue: string | null;
  textAdd: boolean;
}) {
  const dispatch = useDispatch();

  const { isUploading } = useSelector((state: RootState) => state.chatdata);

  const [text, setText] = useState(textAdd ?? false);
  const [describe, setDescribe] = useState(description ?? "");

  // Watch API/uploading state
  useEffect(() => {
    if (isUploading) {
      console.log("API request started");
    } else {
      console.log("API request finished");
    }
  }, [isUploading]);

  const getText = (name: string, checked: boolean) => {
    setText(checked);

    if (name.includes("text")) {
      dispatch(addText(checked));
    }
  };

  const getPlatform = (param: string | null) => {
    dispatch(Platform(param));
  };

  const dscription = () => {
    dispatch(addDescribe(describe));
  };

  const platform = [
    {
      label: "Select a platform",
      value: null,
    },
    {
      label: "Instgram Feed",
      value: "Instgram Feed",
    },
    {
      label: "Instagram Story",
      value: "Instagram Story",
    },
    {
      label: "Facebook Post",
      value: "Facebook Post",
    },
    {
      label: "LinkedIn Post",
      value: "LinkedIn Post",
    },
    {
      label: "X (Twitter) Post",
      value: "X (Twitter) Post",
    },
  ];

  return (
    <div className="flex w-full flex-col gap-4">
      <Textarea
        placeholder="Type your message here."
        value={describe}
        onChange={(e) => setDescribe(e.target.value)}
        disabled={isUploading}
      />

      <CheckboxBasic
        TextAdd={text}
        getValues={getText}
        Description="add text"
      />

      <FieldGroup className="w-56">
        <Field orientation="horizontal">
          <FieldLabel htmlFor="terms-checkbox-basic">
            Select a Platform
          </FieldLabel>
        </Field>
      </FieldGroup>

      <SelectDemo
        setCategory={getPlatform}
        items={platform}
        defaults={seletedValue}
      />

      <Button onClick={dscription} type="submit" disabled={isUploading}>
        {isUploading ? "Uploading..." : "Send message"}
      </Button>
    </div>
  );
}
