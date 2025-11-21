import { forwardRef, useEffect, useMemo, useState } from "react";

import { DragAndDropFiles } from "./components/drag-and-drop-files";
import { FileSystemSelect } from "./components/file-system-select";
import { FromClipboard } from "./components/from-clipboard";
import { MultiPreview } from "./components/multi-preview";
import { ImageElement, State } from "./types";
import {
  addOneEmptyPreview,
  getFlattenState,
  removeEmptyPreview,
} from "./utils";
import { FormFieldWrapper, FormFieldWrapperProps } from "../form-field-wrapper";
import { useFormField } from "../formux/useFormField";
import { compact, removeRow } from "@/utils/general";
import { Image } from "@/types/general";
import { getImageRowData } from "@/utils/image";
import { ImageUp, Trash } from "lucide-react";
import { Button } from "../button";
import { ImageComponent } from "@/components/image-component";

export interface FieldInputImagesProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    FormFieldWrapperProps {
  multi?: boolean;
  max?: number;
}

export const FieldInputImages = forwardRef<
  HTMLInputElement,
  FieldInputImagesProps
>((props, ref) => {
  const { className, label, multi, max, ...omittedProps } = props;

  const { field, error } = useFormField(props);

  const { value } = field;

  const [state, setState] = useState<State>([]);

  const [stateToPreview, setStateToPreview] = useState<State>([undefined]);
  const [previewIndex, setPreviewIndex] = useState<number>(0);

  const previewImage = useMemo<ImageElement>(() => {
    const currentImage = stateToPreview[previewIndex];

    if (!currentImage) {
      return undefined;
    }

    return currentImage;
  }, [previewIndex, stateToPreview]);

  useEffect(() => {
    if (value !== state) {
      const newState: State = multi ? value : [value];
      setState(newState);
      const newPreviewState = addOneEmptyPreview(newState);
      setStateToPreview(newPreviewState);
    }
  }, [value, max]);

  const handleChange = (newState: Array<ImageElement>) => {
    field.onClick();

    if (multi) {
      field.onChange({
        target: {
          name: field.name,
          value: newState,
        },
      });
    } else {
      field.onChange({
        target: {
          name: field.name,
          value: newState[0],
        },
      });
    }
  };

  const handleRemove = async () => {
    const newStateToPreview = removeRow(stateToPreview, previewIndex);

    setPreviewIndex(previewIndex ? previewIndex - 1 : 0);

    setStateToPreview(newStateToPreview);
    const newState = getFlattenState(newStateToPreview);

    setState(newState);

    handleChange(newState);
  };

  const handleAdd = async (
    imagesArgs: Array<File | Image | null | undefined>
  ) => {
    const images = compact(imagesArgs);
    if (!images.length) return;

    const imagesData = await Promise.all(images.map(getImageRowData));

    let newStateToPreview = [...stateToPreview];

    newStateToPreview = removeEmptyPreview(newStateToPreview);
    newStateToPreview = [...newStateToPreview, ...imagesData];
    newStateToPreview = addOneEmptyPreview(newStateToPreview);

    setPreviewIndex(multi ? newStateToPreview.length - 1 : 0);
    setStateToPreview(newStateToPreview);

    const newState = getFlattenState(newStateToPreview);
    setState(newState);
    handleChange(newState);
  };

  const handleUpdate = async (imageFile: File) => {
    const imageData = await getImageRowData(imageFile);

    const newStateToPreview = [...stateToPreview];
    newStateToPreview[previewIndex] = imageData;
    setStateToPreview(newStateToPreview);

    const newState = getFlattenState(newStateToPreview);
    setState(newState);
    handleChange(newState);
  };

  const renderContent = () => {
    if (previewImage) {
      return (
        <div className="flex flex-col items-center justify-center">
          <div className="flex items-center gap-2 justify-end w-full p-2">
            <Button
              variant="outline"
              onClick={() => {
                handleRemove();
              }}
            >
              <Trash className="w-4 h-4" />
            </Button>
          </div>

          <ImageComponent
            image={previewImage}
            className="object-contain px-2 pb-2"
          />
        </div>
      );
    }

    return (
      <div className="flex justify-center items-center text-center relative h-full">
        <div className="py-10">
          <div>
            <ImageUp className="mx-auto h-12 w-12 text-gray-300" />
            <p className="text-xs leading-5 text-gray-600">
              PNG, JPG, GIF hasta 5MB
            </p>
          </div>

          <ol className="mt-2 text-sm leading-6 text-gray-600">
            <li>
              <FileSystemSelect
                field={field}
                ref={ref}
                {...omittedProps}
                onChange={(file) => handleAdd([file])}
              />
            </li>

            <li>
              <FromClipboard onChange={(file) => handleAdd([file])} />
            </li>
          </ol>
        </div>
      </div>
    );
  };

  return (
    <FormFieldWrapper label={label} error={error} className={className}>
      {multi && (
        <MultiPreview
          images={stateToPreview}
          selectedIndex={previewIndex}
          onClickOnImage={setPreviewIndex}
        />
      )}

      <DragAndDropFiles
        onChange={async (images) => {
          const promises = images.map((file) => handleAdd([file]));
          await Promise.all(promises);
        }}
        error={!!error}
        className="relative"
      >
        {renderContent()}
      </DragAndDropFiles>
    </FormFieldWrapper>
  );
});
