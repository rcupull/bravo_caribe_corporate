import { ckEditorEndpointReplacement } from "@/utils/ckeditor";
import { AxiosRequestConfig } from "axios";

export class CheckEditorUploadAdapter {
  constructor(
    private readonly loader: any,
    private readonly uploadUrl: string,
    private readonly fetch: (args: AxiosRequestConfig) => Promise<any>
  ) {}

  async upload() {
    const file = await this.loader.file;

    const data = new FormData();
    data.append("upload", file);

    return new Promise((resolve, reject) => {
      this.fetch({
        url: this.uploadUrl,
        method: "post",
        data,
      })
        .then((res) => {
          const resData = res.data;
          resData.default = `${ckEditorEndpointReplacement}${resData.imageSrc}`;
          resolve(resData);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  abort() {
    // Reject promise returned from upload() method.
  }
}
