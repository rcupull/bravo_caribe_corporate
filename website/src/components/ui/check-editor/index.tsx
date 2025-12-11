import { CKEditor } from "@ckeditor/ckeditor5-react";
import type { Editor } from "@ckeditor/ckeditor5-core";

import { CheckEditorUploadAdapter } from "./CheckEditorUploadAdapter";
import { CheckEditorToolbarItem } from "./types";

import ClassicEditorB from "ckeditor5-build/build/ckeditor";
import {
  addImageEndpointToValue,
  removeImageEndpointFromValue,
} from "@/utils/ckeditor";
import { compact } from "@/utils/general";
import { Nullable, StyleProps } from "@/types/general";
import { axiosFetch } from "@/utils/api";
import { HtmlTextContainer } from "../html-text-container";
import { usePageContext } from "@/hooks/usePageContext";

const ClassicEditor = ClassicEditorB as unknown as {
  create(...args: any[]): Promise<Editor>;
};

export interface CheckEditorProps extends StyleProps {
  onBlur?: (args: { event: any; editor: Editor; data: string }) => void;
  onFocus?: (args: { event: any; editor: Editor; data: string }) => void;
  onChange?: (args: { event: any; editor: Editor; data: string }) => void;
  onReady?: (editor: Editor) => void;
  value?: string;
  uploadUrl?: string;
}

export const CheckEditor = ({
  onBlur,
  onChange,
  onFocus,
  onReady,
  value,
  className,
  uploadUrl,
}: CheckEditorProps) => {
  const getItems = (): Array<CheckEditorToolbarItem> => {
    const out: Array<Nullable<CheckEditorToolbarItem>> = [
      "heading",
      "|",
      "bold",
      "italic",
      "link",
      "|",
      "|",
      "blockQuote",
      "insertTable",
      "mediaEmbed",
      "undo",
      "redo",
      "numberedList",
      "bulletedList",
      "outdent",
      "indent",
      !!uploadUrl && "imageUpload",
      "highlight",
      "fontBackgroundColor",
      "fontFamily",
      "fontColor",
      "alignment",
    ];
    return compact(out);
  };

  const pageContext = usePageContext();

  return (
    <HtmlTextContainer className={className}>
      <CKEditor
        editor={ClassicEditor}
        config={{
          toolbar: {
            items: getItems(),
            shouldNotGroupWhenFull: true,
          },
        }}
        data={addImageEndpointToValue(value)}
        onReady={(editor) => {
          /**
           * Add custom clases to container
           */
          // addStylesToContainer();

          if (uploadUrl) {
            // getted from https://stackoverflow.com/questions/52873321/add-custom-headers-to-upload-image
            //@ts-expect-error ignore
            editor.plugins.get("FileRepository").createUploadAdapter =
              function (loader) {
                const out = new CheckEditorUploadAdapter(
                  loader,
                  uploadUrl,
                  (args) => axiosFetch(args, pageContext)
                );

                return out as any;
              };
          }

          onReady?.(editor);
        }}
        onChange={(event, editor) => {
          let data = editor.getData();
          data = removeImageEndpointFromValue(data) || "";

          onChange?.({ event, editor, data });
        }}
        onBlur={(event, editor) => {
          let data = editor.getData();
          data = removeImageEndpointFromValue(data) || "";

          onBlur?.({ event, editor, data });
        }}
        onFocus={(event, editor) => {
          let data = editor.getData();
          data = removeImageEndpointFromValue(data) || "";

          onFocus?.({ event, editor, data });
        }}
      />
    </HtmlTextContainer>
  );
};

export default CheckEditor;
