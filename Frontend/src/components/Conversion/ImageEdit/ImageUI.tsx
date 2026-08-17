import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useEffect, useState, type ComponentType } from "react";
import { IconChevronUp, IconChevronDown } from "@tabler/icons-react";
import { SourceImageUrl } from "@/Store/EditImage/EditiImageSlice";
import type { RootState, AppDispatch } from "../../../Store/store";
import { useSelector, useDispatch } from "react-redux";
type ImageEDitBoxProps = {
  children: ComponentType | ComponentType[];
  HeaderTitle: String;
};

function ImageEditBox({ children, HeaderTitle }: ImageEDitBoxProps) {
  const ChildComponents = Array.isArray(children) ? children : [children];
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const chatjson = useSelector((state: RootState) => state.chatdata);
  const imageurl = chatjson.currentPosterImage?.url;
  if (imageurl === undefined) {
    dispatch(SourceImageUrl(imageurl));
  } else {
    dispatch(SourceImageUrl(imageurl));
  }
  return (
    <>
      <Card>
        <CardContent>
          <CardHeader>
            <div className="flex items-center justify-between">
              {HeaderTitle}{" "}
              <Button onClick={() => setOpen((prev) => !prev)} variant="ghost">
                {open ? (
                  <IconChevronDown stroke={2} />
                ) : (
                  <IconChevronUp stroke={2} />
                )}
              </Button>
            </div>
          </CardHeader>
          {open
            ? ChildComponents.map((Child, index) => <Child key={index} />)
            : null}
        </CardContent>
      </Card>
    </>
  );
}

export default ImageEditBox;
