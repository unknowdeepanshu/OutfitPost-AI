import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
type ItemLabes = {
  label: string;
  value: string | null;
};
interface SelectDemo {
  setCategory: (name: string | null) => void;
  items: ItemLabes[];
}

export default function SelectDemo({ setCategory, items }: SelectDemo) {
  return (
    <Select items={items}>
      <SelectTrigger className="w-full">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Fashion</SelectLabel>
          {items.map((item) => (
            <SelectItem
              key={item.label}
              value={item.value}
              onClick={() => {
                setCategory(item.value);
              }}
            >
              {item.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
