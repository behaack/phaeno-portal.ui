import { api } from "../core/api-call";
import type { FileRoomListItem } from "../types/file-room";

export const fileRoomService = {
  getFileRoomForSelf: () =>
    api.get<FileRoomListItem[]>("/file-room"),
}