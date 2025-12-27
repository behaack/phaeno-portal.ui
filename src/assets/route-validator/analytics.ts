import z from 'zod';
import { JOB_TYPES, STATUS_TYPES } from '../lookupLists/_index';

export const statuses = ['<All Statuses>', ...STATUS_TYPES] as const
const firstStatusType = statuses[0];
const firstJobType = JOB_TYPES[0];

export const searchSchema = z.object({
  jobtype: z.enum(JOB_TYPES).default(firstJobType),
  jobstatus: z.enum(statuses).default(firstStatusType),
});
