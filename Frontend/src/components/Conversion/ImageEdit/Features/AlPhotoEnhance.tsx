import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ScaleNumbers } from "@/Store/EditImage/EditiImageSlice";
import { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
function AlPhotoEnhance() {
  return (
    <>
      <div className="flex flex-col gap-2 p-4">
        <h4>Scale number</h4>
        <ScaleNumber items={number} />
      </div>
    </>
  );
}
type ItemLabes = {
  label: String;
  value: Number;
};
interface SelectDemo {
  items: ItemLabes[];
}
const number = [
  { label: "1", value: 1 },
  { label: "2", value: 2 },
  { label: "4", value: 4 },
];

function ScaleNumber({ items }: SelectDemo) {
  const [number, setNumber] = useState<Number>(0);
  const dispatch = useDispatch();
  const submite = () => {
    dispatch(ScaleNumbers(number));
    console.log("number", number);
  };
  useEffect(() => {}, [number]);
  return (
    <>
      <Select items={items}>
        <SelectTrigger className="w-full">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Scale Number</SelectLabel>
            {items.map((item, index) => (
              <SelectItem
                key={index}
                value={item.value}
                onClick={() => {
                  setNumber(item.value);
                }}
              >
                {item.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>

      <Button onClick={submite}>Apply</Button>
    </>
  );
}

export default AlPhotoEnhance;
