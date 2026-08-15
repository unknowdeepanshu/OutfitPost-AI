import { Button } from "@/components/ui/button";
import { useSelector } from "react-redux";
import type { RootState } from "@/Store/store";
function AlPhotoBackgroundRemoval() {
  const { src_file_url } = useSelector((state: RootState) => state.editImag);
  const submite = () => {
    console.log("src_file_url", src_file_url);
  };
  return (
    <>
      <div className="flex flex-col gap-2 p-4">
        <Button onClick={submite}>Just Apply</Button>
      </div>
    </>
  );
}

export default AlPhotoBackgroundRemoval;
