import { EFileRoomItemType } from '@/assets/enums/_index';

export default interface IFileRoomItem {
  id: string;
  type: EFileRoomItemType;
  name: string;
  path: string;
  contents: string;
  createdOn: string;
  size: number;
  parentId: string;
}
