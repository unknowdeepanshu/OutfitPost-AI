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
import { Catgory, addGender, setUploading } from "@/Store/chatdata/chatSlice";
import type { AppDispatch, RootState } from "@/Store/store";
import { useParams } from "react-router";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { CreateMessage } from "@/Store/chatdata/chatDataThunk";
import { generatedImage } from "@/services/imageUsage";
type Image = {
  url: string;
  file?: File | null;
};
interface ChatData {
  SelectedCatgory: string | null;
  FashionImage: Image;
  ModelImage: Image;
  gender: string | null;
  Description: string;
  Textinclude: boolean;
  SelectedPlatform: string | null;
  isUploading: boolean;
}
interface Chats extends React.ComponentProps<"div"> {
  ShowImage: (name: boolean) => void;
  chatjson: ChatData;
}
export function Chats({ ShowImage, chatjson, className, ...props }: Chats) {
  const dispatch = useDispatch<AppDispatch>();
  const { threadId } = useParams();
  const getCatgory = (param: string | null) => {
    dispatch(Catgory(param));
  };
  const getGender = (param: string | null) => {
    dispatch(addGender(param));
  };
  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();

    dispatch(setUploading(true));
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
    if ((chatjson.gender ?? "").toString().trim().length === 0) {
      toast.error("choose the Gender");
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
    try {
      await dispatch(
        CreateMessage({
          ProjectId: threadId,
          category: chatjson.SelectedCatgory,
          platform: chatjson.SelectedPlatform,
          includeText: chatjson.Textinclude,
          Description: chatjson.Description,
          gender: chatjson.gender,
        }),
      ).unwrap();

      toast.success("Image generated successfully");
      generatedImage();
    } catch (error) {
      console.error(error);
      toast.error("Failed to generate image");
    }
    console.log("this is chatdata", chatjson);
    toast.success("uploading");
  };

  const project = useSelector((state: RootState) => state.project);
  const currentProject = project.find((e) => e.ProjectId === threadId);
  const title = currentProject?.ProjectName ?? "New Project";
  const Fashion = [
    { label: "Select a Fashion", value: null },
    { label: "Clothes", value: "Clothes" },
    { label: "Bag", value: "Bag" },
    { label: "Hat", value: "Hat" },
    { label: "Scarf", value: "Scarf" },
    { label: "Shoes", value: "Shoes" },
  ];
  const Gender = [
    { label: "Select a Gender model", value: null },
    { label: "Female", value: "Female" },
    { label: "Male", value: "Male" },
  ];
  // console.log("this is thread id", threadId);
  return (
    <div className={cn("flex flex-1 flex-col gap-6", className)} {...props}>
      <Card className="flex-1">
        <CardHeader className="text-center">
          <CardTitle className="text-left text-xl">
            <div className="flex justify-between">
              {title}
              <div className="flex gap-1">
                <Button variant="ghost" onClick={() => ShowImage(true)}>
                  <ChevronLeft />
                </Button>
                <Button variant="ghost" onClick={() => ShowImage(false)}>
                  <ChevronRight />
                </Button>
              </div>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <FieldGroup>
              <Field>
                <FieldLabel>Select a Category</FieldLabel>
                <SelectDemo
                  setCategory={getCatgory}
                  items={Fashion}
                  defaults={chatjson.SelectedCatgory}
                />
              </Field>
              <FieldSeparator className="*:data-[slot=field-separator-content]:bg-card"></FieldSeparator>
              <Field>
                <FieldLabel>Upload Images</FieldLabel>
                <div className="my-2 flex flex-col justify-around gap-2 2xl:flex-row">
                  <ImageUpload
                    Title="Fashion Image"
                    id={threadId}
                    Description="Upload your fashion product."
                  />
                  <ImageUpload
                    Title="Model Image"
                    id={threadId}
                    Description="Upload your model photo."
                  />
                </div>

                <SelectDemo
                  setCategory={getGender}
                  items={Gender}
                  defaults={chatjson.gender}
                />
              </Field>
              <Field>
                <FieldLabel>Describe your product</FieldLabel>
                <TextareaButton
                  textAdd={chatjson.Textinclude}
                  description={chatjson.Description}
                  seletedValue={chatjson.SelectedPlatform}
                />
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
