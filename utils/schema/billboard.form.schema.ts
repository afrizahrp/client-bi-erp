import { z } from 'zod';

export const billboardFormSchema = z.object({
  section: z.coerce.number().min(0),
  title: z.string().min(5).or(z.literal('')),
  name: z.string().min(5).or(z.literal('')),
  isImage: z.boolean().optional().default(true),
  contentURL: z.string().optional(),
  content_id: z.string().or(z.literal('')),
  iShowedStatus: z.string().or(z.literal('')), // SHOW, HIDE
  iStatus: z.string().or(z.literal('')),
  remarks: z.string().or(z.literal('')),
  contentType: z.string().or(z.literal('')),
});

export type BillboardFormValues = z.infer<typeof billboardFormSchema>;
