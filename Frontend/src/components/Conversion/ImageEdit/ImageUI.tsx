import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useState, type ComponentType } from "react";
import { IconChevronUp, IconChevronDown } from "@tabler/icons-react";
type ImageEDitUIBOXProps = {
  children: ComponentType | ComponentType[];
  HeaderTitle: String;
};

function ImageEDitUIBOX({ children, HeaderTitle }: ImageEDitUIBOXProps) {
  const ChildComponents = Array.isArray(children) ? children : [children];
  const [open, setOpen] = useState(false);
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

export default ImageEDitUIBOX;
