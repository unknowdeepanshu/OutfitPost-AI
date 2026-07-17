import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field";
import { SelectDemo, ImageUpload, TextareaButton } from "./Features";
import { useDispatch, useSelector } from "react-redux";
import { Catgory } from "@/Store/chatdata/chatSlice";
import type { RootState } from "@/Store/store";

import { toast } from "sonner";

export function Chats({ className, ...props }: React.ComponentProps<"div">) {
  const chatjson = useSelector((state: RootState) => state.chatdata);
  console.log(chatjson);

  const dispatch = useDispatch();
  const getCatgory = (param: string) => {
    dispatch(Catgory(param));
  };

  const handleSubmit = (e: React.SubmitEvent) => {
    e.preventDefault();

    if ((chatjson.Description ?? "").toString().trim().length === 0) {
      console.log(
        "this is description",
        (chatjson.Description ?? "").toString().trim().length,
      );
      toast.error("Describe your product");
      return;
    }

    if ((chatjson.SelectedCatgory ?? "").toString().trim().length === 0) {
      toast.error("choose the catgory");
      return;
    }

    if ((chatjson.SelectedPlatform ?? "").toString().trim().length === 0) {
      toast.error("choose the Platform");
      return;
    }

    if (
      ((chatjson.FashionImage?.url ?? "") as string).toString().trim()
        .length === 0
    ) {
      toast.error("choose the Fashion Image");
      return;
    }

    if (
      ((chatjson.ModelImage?.url ?? "") as string).toString().trim().length ===
      0
    ) {
      toast.error("choose the model Image");
      return;
    }
  };
  return (
    <div className={cn("flex flex-1 flex-col gap-6", className)} {...props}>
      <Card className="flex-1">
        <CardHeader className="text-center">
          <CardTitle className="text-left text-xl">Welcome back</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <FieldGroup>
              <Field>
                <FieldLabel>Select a Category</FieldLabel>
                <SelectDemo setCategory={getCatgory} />
              </Field>
              <FieldSeparator className="*:data-[slot=field-separator-content]:bg-card"></FieldSeparator>
              <Field>
                <FieldLabel>Upload Images</FieldLabel>
                <div className="my-2 flex flex-col justify-around gap-2 2xl:flex-row">
                  <ImageUpload
                    Title="Fashion Image"
                    Description="Upload your fashion product."
                  />
                  <ImageUpload
                    Title="Model Image"
                    Description="Upload your model photo."
                  />
                </div>
              </Field>
              <Field>
                <FieldLabel>Describe your product</FieldLabel>
                <TextareaButton />
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
