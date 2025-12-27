import { z } from 'zod';
import { useAuthStore } from '@/stores/authStore';
import { EOrganizationType } from '../enums/_index';

const isPhaeno = () => {
  return (
    useAuthStore.getState().authToken?.organization.organizationType === EOrganizationType.Phaeno
  );
};

const phaenoSchema = z.object({
  type: z.enum(['user', 'customer']).default('user'),
  pageno: z.coerce.number().int().min(1).default(1),
  searchstr: z.string().optional(),
});

const otherSchema = z.object({
  type: z.enum(['user']).optional(),
  pageno: z.coerce.number().int().min(1).default(1),
  searchstr: z.string().optional(),
});

export const searchSchema = (isPhaeno()) ? phaenoSchema : otherSchema
