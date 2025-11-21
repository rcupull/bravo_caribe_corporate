export const getFileImageSize = (file: File): Promise<{ width: number; height: number }> => {
  const imageUrl = URL.createObjectURL(file);

  return new Promise((resolve) => {
    const img = new globalThis.Image();
    img.src = imageUrl;
    img.onload = () => {
      resolve({
        height: img.height,
        width: img.width
      });
    };
  });
};

export const renameFile = (file: File, newName: string) => {
  return new File([file], newName, {
    type: file.type,
    lastModified: file.lastModified
  });
};

export function base64ToFile(base64String: string, mimeType: string, filename: string) {
  // Remove data URL scheme if present
  const base64Data = base64String.replace(/^data:.+;base64,/, '');
  const byteCharacters = atob(base64Data); // Decode Base64 string
  const byteNumbers = new Array(byteCharacters.length);

  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i);
  }

  const byteArray = new Uint8Array(byteNumbers);
  const blob = new Blob([byteArray], { type: mimeType });

  const file = new File([blob], filename, { type: mimeType });

  return file;
}

export const blobToFile = (blob: Blob, fileName: string) => {
  return new File([blob], fileName, { type: blob.type, lastModified: Date.now() });
};
