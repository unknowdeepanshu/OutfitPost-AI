export interface EditImageData {
  ImageData: ImageData;
  EditType: string;
}
type ImageData = {
  src_file_url: String;
  scale: Number;
  msk_file_url: String;
  prompt: String;
};
