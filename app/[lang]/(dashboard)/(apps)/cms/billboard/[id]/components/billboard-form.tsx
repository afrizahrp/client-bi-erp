'use client';

import axios from 'axios';
import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import FormFooter from '@/components/form-footer';
import SimpleMDE from 'react-simplemde-editor';
import 'easymde/dist/easymde.min.css';
import { toast } from 'react-hot-toast';

import { useParams, useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

import BillboardVideoUpload from '@/components/ui/billboard-video-upload';
import BillboardImageUpload from '@/components/ui/billboard-image-upload';

import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';
import { Billboard } from '@/types';
import {
  BillboardFormValues,
  billboardFormSchema,
} from '@/utils/schema/billboard.form.schema';
import { billboarddefaultValues } from '@/utils/defaultvalues/billboard.defaultValue';
import { InputGroup, InputGroupText } from '@/components/ui/input-group';
import { Switch } from '@/components/ui/switch';

interface BillboardFormProps {
  initialBillboardData: Billboard | null; // Gunakan tipe Billboard
}

export const BillboardForm: React.FC<BillboardFormProps> = ({
  initialBillboardData,
}) => {
  const params = useParams();
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [contents, setContents] = useState(
    initialBillboardData?.contentURL ?? []
  );

  const id = initialBillboardData?.id;

  const actionMessage = initialBillboardData
    ? 'Billboard has changed successfully.'
    : 'New Billboard has been added successfully.';

  const form = useForm<BillboardFormValues>({
    resolver: zodResolver(billboardFormSchema),
    defaultValues: initialBillboardData
      ? {
          ...initialBillboardData,
          title: initialBillboardData.title ?? '',
          name: initialBillboardData.name ?? '',
          isImage: initialBillboardData.isImage ?? true,
          contentURL: initialBillboardData.contentURL ?? '',
          content_id: initialBillboardData.content_id ?? '',
          iStatus: initialBillboardData.iStatus ?? '',
          iShowedStatus: initialBillboardData.iShowedStatus ?? '',
          remarks: initialBillboardData.remarks ?? '',
          contentType: initialBillboardData.contentType ?? '',
        }
      : {
          section: 1,
          title: '',
          name: '',
          isImage: true,
          contentURL: '',
          content_id: '',
          iStatus: 'Active',
          iShowedStatus: 'SHOW',
          remarks: '',
          contentType: '',
        },
  });
  const handleBack = (e: any) => {
    e.preventDefault();
    setLoading(false);
    router.push('/cms/billboards/billboard-list');
  };

  const onSubmit = async (data: BillboardFormValues) => {
    try {
      setLoading(true);
      if (initialBillboardData) {
        await axios.patch(`/api/cms/billboards/${params?.id}`, data);
      } else {
        await axios.post(`/api/cms/billboards`, data);
      }
      router.push('/cms/billboards/billboard-list');
      router.refresh();
      toast.success(actionMessage);
    } catch (error: any) {
      console.error(error);

      toast.error(error.response?.data?.message || 'Save failed');
    } finally {
      setLoading(false);
    }
  };

  const handleImageRemove = async (id: string) => {
    try {
      setLoading(true);

      await axios.delete(`/api/cms/billboards/${id}`);

      router.refresh();

      setLoading(false);
      toast.success('Content has been removed successfully.');
    } catch (error) {
      console.error(error);
      toast.error('Something went wrong');
      setLoading(false);
    }
  };

  const isImageValue = form.watch('isImage');
  const UploadComponent = isImageValue
    ? BillboardImageUpload
    : BillboardVideoUpload;

  const billboard_id = initialBillboardData?.id.toString();
  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='space-y-8 w-full'
        >
          <div className='w-full flex items-center justify-center'>
            <FormField
              control={form.control}
              name='contentURL'
              render={({ field }) => (
                <FormItem>
                  <FormControl className='flex flex-col gap-3'>
                    <UploadComponent
                      value={field.value ? [field.value] : []}
                      disabled={loading}
                      onChange={(url) => field.onChange(url)}
                      onRemove={(contentURL) => {
                        if (billboard_id) {
                          handleImageRemove(billboard_id);
                        }
                        const newValue = Array.isArray(field.value)
                          ? field.value.filter(
                              (value: { contentURL: string }) =>
                                value.contentURL !== contentURL
                            )
                          : [];
                        field.onChange(newValue);
                      }}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          <Separator />

          <div>
            <FormField
              control={form.control}
              name='isImage'
              render={({ field }) => (
                <FormItem className='flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4'>
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      // @ts-ignore
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className='space-y-1 leading-none'>
                    <FormLabel>
                      {field.value ? (
                        <span className='text-red text-semibold'>
                          Show billboard as Image
                        </span>
                      ) : (
                        <span className='text-green'>
                          Show billboard as Video
                        </span>
                      )}{' '}
                    </FormLabel>{' '}
                    <FormDescription>
                      {field.value ? (
                        <span className='text-white'>
                          Billboard will be shown as image
                        </span>
                      ) : (
                        <span className='text-black'>
                          Billboard will be shown as video
                        </span>
                      )}
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />
          </div>

          <div className='grid grid-cols-12 gap-4 py-2'>
            <div className='col-span-1'>
              <FormField
                control={form.control}
                name='section'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Section</FormLabel>
                    <FormControl>
                      <Input
                        type='number'
                        min={1}
                        max={7}
                        placeholder='Input billboard section here'
                        value={field.value ?? 1}
                        onChange={field.onChange}
                        className='text-right justify-end'
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            <div className='col-span-8'>
              <FormField
                control={form.control}
                name='title'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input
                        placeholder='Input billboard title here'
                        value={field.value ?? ''}
                        onChange={field.onChange}
                        disabled={loading}
                      />
                    </FormControl>
                    {form.formState.errors.title && (
                      <FormMessage>
                        {form.formState.errors.title.message}
                      </FormMessage>
                    )}{' '}
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div>
            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <SimpleMDE
                      disabled={loading}
                      placeholder='Type here to add description'
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name='iStatus'
            render={({ field }) => (
              <FormItem
                className={`flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 justify-self-end ${
                  field.value
                    ? 'bg-green-600 text-white'
                    : 'bg-slate-400 text-black'
                }`}
              >
                <FormControl>
                  <Switch
                    checked={!!field.value}
                    // @ts-ignore
                    onCheckedChange={field.onChange}
                    // disabled={loading}
                    style={{
                      backgroundColor: field.value ? 'green' : 'gray',
                    }}
                  />
                </FormControl>
                <div className='space-y-1 leading-none'>
                  <FormLabel>
                    {field.value ? (
                      <span className='text-red text-semibold'>Active</span>
                    ) : (
                      <span className='text-green'>Non Active</span>
                    )}{' '}
                  </FormLabel>
                  <FormDescription>
                    {field.value ? (
                      <span className='text-white'>
                        This billboard will be shown in the website
                      </span>
                    ) : (
                      <span className='text-black'>
                        This billboard will not be shown in the website
                      </span>
                    )}
                  </FormDescription>
                </div>
              </FormItem>
            )}
          />
          <div>
            <FormField
              control={form.control}
              name='iShowedStatus'
              render={({ field }) => (
                <FormItem
                  className={`flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 justify-self-end ${
                    field.value
                      ? 'bg-green-600 text-white'
                      : 'bg-slate-400 text-black'
                  }`}
                >
                  <FormControl>
                    <Switch
                      checked={!!field.value}
                      // @ts-ignore
                      onCheckedChange={field.onChange}
                      // disabled={loading}
                      style={{
                        backgroundColor: field.value ? 'green' : 'gray',
                      }}
                    />
                  </FormControl>
                  <div className='space-y-1 leading-none'>
                    <FormLabel>
                      {field.value ? (
                        <span className='text-red text-semibold'>
                          Displayed in the website
                        </span>
                      ) : (
                        <span className='text-green'>
                          Not displayed in the website
                        </span>
                      )}{' '}
                    </FormLabel>
                    <FormDescription>
                      {field.value ? (
                        <span className='text-white'>
                          This billboard will be shown in the website
                        </span>
                      ) : (
                        <span className='text-black'>
                          This billboard will not be shown in the website
                        </span>
                      )}
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />
          </div>
          {/* <FormFooter
            handleBack={handleBack}
            loading={loading}
            form={form}
            id={id}
          /> */}
        </form>
      </Form>
    </>
  );
};
