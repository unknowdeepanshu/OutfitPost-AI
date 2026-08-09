import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

function AIPhotoBackgroundChange() {
  return (
    <>
      <div className="flex flex-col gap-2 p-4">
        <Textarea placeholder="Give description about background" />
        <Button>Just Apply</Button>
      </div>
    </>
  );
}

export default AIPhotoBackgroundChange;
