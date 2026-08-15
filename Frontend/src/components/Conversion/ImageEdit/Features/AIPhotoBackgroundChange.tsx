import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

import { AddPrompt } from "@/Store/EditImage/EditiImageSlice";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
function AIPhotoBackgroundChange() {
  const [para, setPara] = useState<string>("");
  const submite = () => {
    dispatch(AddPrompt(para));
    console.log(para);
  };
  const dispatch = useDispatch();

  return (
    <>
      <div className="flex flex-col gap-2 p-4">
        <Textarea
          placeholder="Give description about background"
          onChange={(e) => setPara(e.target.value)}
        />
        <Button onClick={submite}>Just Apply</Button>
      </div>
    </>
  );
}

export default AIPhotoBackgroundChange;
