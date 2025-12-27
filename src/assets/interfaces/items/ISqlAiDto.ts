import { ERenderType, ESqlAiEntityType } from "@/assets/enums/_index";

export default interface ISqlAiDto {
  entityType: ESqlAiEntityType;
  sql: string;
  rowsReturned: number;
  hasAdditional: boolean;
  cursor: string;
  nextId: number;  
  results: object;

  // New
  title: string;
  columns: string[];
  renderType: ERenderType;
}