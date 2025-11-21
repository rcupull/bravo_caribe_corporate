import { SelectContainer } from "../SelectContainer";

import { StyleProps } from "@/types/general";
import { blobToFile } from "@/utils/file";
import { ClipboardPaste } from "lucide-react";

export interface FromClipboardProps extends StyleProps {
  onChange?: (file: File) => void;
}

export const FromClipboard = ({ onChange }: FromClipboardProps) => {
  const handleGetClipboardImage = async () => {
    try {
      // Check if Clipboard API is available
      if (!navigator.clipboard || !navigator.clipboard.read) {
        alert("Clipboard access not supported in this browser.");
        return;
      }

      // Read clipboard items
      const clipboardItems = await navigator.clipboard.read();
      for (const item of clipboardItems) {
        for (const type of item.types) {
          if (type.startsWith("image/")) {
            const blob = await item.getType(type);
            const file = blobToFile(blob, "clipboard-image.png");

            onChange?.(file);
            return;
          }
        }
      }

      alert("No image found in clipboard.");
    } catch (error) {
      console.error("Failed to read clipboard:", error);
      alert("Error accessing clipboard.");
    }
  };

  return (
    <SelectContainer onClick={handleGetClipboardImage} svg={ClipboardPaste}>
      Pegar desde portapapeles
    </SelectContainer>
  );
};
