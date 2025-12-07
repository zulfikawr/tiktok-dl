export interface TiktokResponse {
  type: "video" | "image";
  description: string;
  creator: string;
  images: string[];
  cover?: string;
  video?: string;
  videoHd?: string;
  music?: string;
}

export interface ApiError {
  error: string;
}

export enum DownloadStatus {
  IDLE = "IDLE",
  LOADING = "LOADING",
  SUCCESS = "SUCCESS",
  ERROR = "ERROR",
}
