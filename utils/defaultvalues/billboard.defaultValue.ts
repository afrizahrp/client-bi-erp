import { BillboardFormValues } from '@/utils/schema/billboard.form.schema';

export function billboarddefaultValues(
  initialBillboardData?: BillboardFormValues
) {
  return {
    section: initialBillboardData?.section ?? 0,
    title: initialBillboardData?.title ?? '',
    name: initialBillboardData?.name ?? '',
    isImage: initialBillboardData?.isImage ?? true,
    contentURL: initialBillboardData?.contentURL ?? '',
    content_id: initialBillboardData?.content_id ?? '',
    iStatus: initialBillboardData!.iStatus ?? 'Active',
    iShowedStatus: initialBillboardData!.iShowedStatus ?? 'SHOW',
    remarks: initialBillboardData?.remarks ?? '',
    contentType: initialBillboardData?.contentType ?? '',
  };
}
