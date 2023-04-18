export interface IUploadFile {
  name: string;
  mimetype: string;
  size: number;
  mv: (path: string) => Promise<void>;
}
