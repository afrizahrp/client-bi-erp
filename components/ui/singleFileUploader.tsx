' use client';

import { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload } from 'lucide-react';
import { Icon } from '@iconify/react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
interface FileWithPreview extends File {
  preview: string;
}
const SingleFileUploader = () => {
  const [files, setFiles] = useState<FileWithPreview[]>([]);

  const { getRootProps, getInputProps } = useDropzone({
    multiple: false,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.gif'],
    },
    onDrop: (acceptedFiles) => {
      setFiles(acceptedFiles.map((file) => Object.assign(file)));
    },
  });

  const img = files.map((file) => (
    <Image
      key={file.name}
      alt={file.name}
      className='w-full h-full object-contain rounded-md'
      src={URL.createObjectURL(file)}
      width={400}
      height={300}
    />
  ));

  const closeTheFile = () => {
    setFiles([]);
  };

  const handleUpload = () => {
    console.log('files', files);
  };

  return (
    <div className={files.length ? 'h-[300px] w-full' : ''}>
      {files.length ? (
        <div className='w-full h-full relative'>
          <Button
            type='button'
            className='absolute top-4 right-4 h-8 w-8 rounded-full bg-red-600 hover:bg-background hover:text-default-900 z-20'
            onClick={closeTheFile}
          >
            <span className='text-xl'>
              <Icon icon='fa6-solid:xmark' />
            </span>
          </Button>
          {img}
          <Button
            type='button'
            className='absolute bottom-4 right-4 h-8 w-8 rounded-full bg-blue-600 hover:bg-background hover:text-default-900 z-20'
            onClick={handleUpload}
          >
            <span className='text-xl'>
              <Upload className='text-default-300' />
            </span>
          </Button>
        </div>
      ) : (
        <div {...getRootProps({ className: 'dropzone' })}>
          <input {...getInputProps()} />

          <div className='w-full text-center bg-slate-200  border-dashed border rounded-md py-[52px] flex items-center flex-col mb-20'>
            <div className='h-12 w-12 inline-flex rounded-md bg-muted items-center justify-center mb-3'>
              <Upload className='text-default-500' />
            </div>
            <h4 className='text-2xl font-medium mb-1 text-card-foreground/80'>
              Drop files here or click to upload.
            </h4>
            <div className='text-xs text-muted-foreground'>
              You can upload an image with PNG or JPG files format
            </div>
          </div>
          {/* <>
            <div className=' flex justify-center gap-2'>
              <Button>Upload Files</Button>
            </div>
          </> */}
        </div>
      )}
      {/* <>
        <div className=' flex justify-center gap-2'>
          <Button>Upload Files</Button>
        </div>
      </> */}
    </div>
  );
};

export default SingleFileUploader;
