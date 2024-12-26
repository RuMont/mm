import { z } from 'zod';

export const idParamSchema = z.object({
  id: z.string().refine((val) => !isNaN(Number(val)), {
    message: 'ID must be a valid number',
  }),
});

export const searchClientsSchema = z.object({
  searchTerm: z.string().optional(),
  fields: z.array(z.any()).optional(),
  orderByField: z.string().optional(),
  orderByDirection: z.enum(['asc', 'desc']).optional(),
  page: z.string().default("1").transform(Number),
  itemsPerPage: z.string().default("10").transform(Number),
});
