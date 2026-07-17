import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
interface SelectDemo {
  setCategory: (name: string) => void;
}

export default function SelectDemo({ setCategory }: SelectDemo) {
  const items = [
    { label: "Select a Fashion", value: null },
    { label: "Apple", value: "apple" },
    { label: "Banana", value: "banana" },
    { label: "Blueberry", value: "blueberry" },
    { label: "Grapes", value: "grapes" },
    { label: "Pineapple", value: "pineapple" },
  ];
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
                setCategory(item.label);
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
