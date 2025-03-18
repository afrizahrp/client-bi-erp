import { z } from 'zod';

export const billboardFormSchema = z.object({
  id: z.coerce.number().min(0),
  section: z.coerce.number().optional(),
  name: z.string().or(z.literal('')),
  isImage: z.boolean().optional(),
  contentURL: z.string().or(z.literal('')),
  content_id: z.string().or(z.literal('')),
  iShowedStatus: z.string().or(z.literal('SHOW')),
  iStatus: z.string().or(z.literal('ACTIVE')),
  remarks: z.string().or(z.literal('')),
  company_id: z.string().or(z.literal('')),
});

export type BillboardFormValues = z.infer<typeof billboardFormSchema>;
