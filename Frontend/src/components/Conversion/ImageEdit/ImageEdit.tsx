import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useSelector } from "react-redux";
import type { RootState } from "@/Store/store";
import { useParams } from "react-router";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

interface ImageEdit extends React.ComponentProps<"div"> {
  ShowImage: (name: boolean) => void;
}

export function ImageEdit({ ShowImage, className, ...props }: ImageEdit) {
  const chatjson = useSelector((state: RootState) => state.chatdata);
  console.log(chatjson);

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
  const { threadId } = useParams();
  const project = useSelector((state: RootState) => state.project);
  const title = project.filter((e) => e.ProjectId === threadId)[0].ProjectName;

  console.log("this is thread id", threadId);
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
                <FieldLabel>Image Edit</FieldLabel>
              </Field>
              <FieldSeparator className="*:data-[slot=field-separator-content]:bg-card"></FieldSeparator>
              <Field>
                <FieldLabel>Update Images</FieldLabel>
                <div className="my-2 flex flex-col justify-around gap-2 2xl:flex-row"></div>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
