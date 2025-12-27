import { z } from 'zod';
import { IReport, reportSchema } from './report';
import { IScore, scoreSchema } from './score';
import { ISummary, summarySchema } from './summary';
import { IUmap, umapSchema } from './umap';

export interface MasterJobFormValues {
  jobType: "" | "Report" | "Score" | "Summary" | "Umap";

  // all possible subforms (always present)
  report: IReport;
  score: IScore;
  summary: ISummary;
  umap: IUmap;
}

export const masterJobSchema = z.discriminatedUnion("jobType", [
  z.object({ jobType: z.literal("Report"), report: reportSchema }),
  z.object({ jobType: z.literal("Score"), score: scoreSchema }),
  z.object({ jobType: z.literal("Summary"), summary: summarySchema }),
  z.object({ jobType: z.literal("Umap"), umap: umapSchema }),
]);