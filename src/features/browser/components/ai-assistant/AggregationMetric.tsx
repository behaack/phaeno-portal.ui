import { Surface } from "@/shared/ui/primiatives";
import { prettifyName } from "./helpers/ai-assist.helpers";

export interface IProps {
  label: string  
  value: any
}

export function AggregationMetric({ label, value }: IProps) {

  const formatNumber = (value: any): string => {
    if (typeof value === "number" && isFinite(value)) {
      return value.toLocaleString("en-US", {
        minimumFractionDigits: 0,
        maximumFractionDigits: 2,
      });
    }
    return value?.toString?.() ?? "";
  };

  return (
    <div className="flex justify-center">
      <Surface className="p-10" elevation="md">
        <div className="flex justify-center gap-3">
          <div className="text-[1.25rem]">{prettifyName(label)}: </div>
          <div className="text-[1.25rem] font-bold">{formatNumber(value)}</div>
        </div>
      </Surface>
    </div>
  );
}