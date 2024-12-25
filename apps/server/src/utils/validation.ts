import { z } from 'zod';

export const idParamSchema = z.object({
  id: z.string().refine((val) => !isNaN(Number(val)), {
    message: 'ID must be a valid number',
  }),
});

export const searchClientsSchema = z.object({
  searchTerm: z.string().optional(),
  fields: z.array(z.string()),
  orderBy: z
    .object({
      field: z.string(),
      direction: z.enum(['asc', 'desc']).optional(),
    })
    .optional(),
  page: z.number().min(1).default(1),
  itemsPerPage: z.number().min(1).default(10),
});
