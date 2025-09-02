import { IMediaType } from "./IMediaItem";

export type IGenre = {
  id: number;
  name: string;
  mediaType?: IMediaType;
};
