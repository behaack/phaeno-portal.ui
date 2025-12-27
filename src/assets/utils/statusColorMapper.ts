import { TStatusType } from '@/assets/types/types';

export type TStatusTypeWithStopping = TStatusType | 'Stopping'

export function statusColorMapper(status: TStatusTypeWithStopping): string {
  switch (status) {
    case "Queued":
      return "blue";
    case "Started":
      return "green";
    case "Stopping":
      return "orange";
    case "Completed":
      return "grey";
    case "Failed":
    case "Canceled":
      return "red";
    default:
      return "orange";
  }
}
export function statusBkgdColorMapper(
  status: TStatusTypeWithStopping
): { color: string; backgroundColor: string } {
  switch (status) {
    case "Queued":
      return {
        color: "#1F4FA3",          // deep blue
        backgroundColor: "#E8F0FD" // soft blue
      };

    case "Started":
      return {
        color: "#1F7A4D",          // strong green
        backgroundColor: "#E6F4ED" // soft green
      };

    case "Stopping":
      return {
        color: "#B86A00",          // amber
        backgroundColor: "#FFF3E0" // soft amber
      };

    case "Completed":
      return {
        color: "black",          
        backgroundColor: "transparent"
      };

    case "Failed":
      return {
        color: "#B00020",          // error red
        backgroundColor: "#FDECEA" // soft red
      };

    case "Canceled":
      return {
        color: "#B00020",          // error red
        backgroundColor: "#FDECEA" // soft red
      };

    default:
      return {
        color: "#1A1A1A",
        backgroundColor: "#FFFFFF"
      };
  }
}