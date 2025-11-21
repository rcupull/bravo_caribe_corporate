import { Image, ImageFile } from 'types/general';

export type ImageElement = Image | ImageFile | undefined | null;

export type State = Array<ImageElement>;
