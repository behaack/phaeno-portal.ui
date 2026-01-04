import { prettifyName } from "./helpers/ai-assist.helpers";

export interface IProps {
  title: string  
  rows: any[];
  columns: string[];
}

export function AggregationMetric({ title, columns, rows }: IProps) {

  if (!rows || !rows.length) { return <div>No data</div> };

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
      <div className="natural-lang-agg-metric-card">
        {(columns.length === 1)
          ? (
              <>
                <h3>{ title }</h3>
                <div className="text-[2rem] font-bold text-center">{formatNumber(rows[0][columns[0]])}</div>
              </>
            )
          : (
              <div>
                {columns.map((c, i) => (
                  <div key={i} className="flex justify-between">
                    <div className="text-[1.25rem]">{prettifyName(c)}: </div>
                    <div className="text-[1.25rem] font-bold">{formatNumber(rows[0][columns[0]])}</div>
                  </div>
                ))}
              </div>
            )
        }
      </div>
    </div>
  );
}