'use client';

import { CldUploadWidget } from 'next-cloudinary';
import { useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { ImagePlus, Trash } from 'lucide-react';

interface BillboardImageUploadProps {
  disabled?: boolean;
  onChange: (value: string) => void;
  onRemove: (value: string) => void;
  value: string[];
}

const BillboardImageUpload: React.FC<BillboardImageUploadProps> = ({
  disabled,
  onChange,
  onRemove,
  value,
}) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const onUpload = (result: any) => {
    onChange(result.info.secure_url);
  };

  if (!isMounted) {
    return null;
  }

  return (
    <div>
      {/* <div className='mb-4 flex w-[1920px] h-[1080px] items-center gap-4'> */}
      <div className='mb-2 flex items-center gap-4'>
        {value.map((url) => (
          <div key={url} className='relative w-[1200px] h-auto rounded-md'>
            {/* <div key={url} className='relative w-1920 h-auto rounded-md'> */}

            <div className='z-10 absolute top-2 right-2'>
              <Button
                type='button'
                onClick={() => onRemove(url)}
                variant='soft'
                color='destructive'
                size='sm'
              >
                <Trash className='h-4 w-4' />
              </Button>
            </div>
            <Image
              priority
              height={100}
              width={100}
              layout='responsive'
              src={url}
              alt='Image'
              sizes='(max-width: 140px) 100vw, (max-width: 168px) 50vw, 33vw'
              style={{ width: '1200px', height: '675px' }}
              className='w-full h-auto rounded-md'
            />
          </div>
        ))}
      </div>
      <CldUploadWidget
        onUpload={onUpload}
        options={{
          sources: ['local', 'google_drive'],
          resourceType: 'image',
          multiple: false,
          clientAllowedFormats: ['jpg', 'jpeg', 'png', 'webp', 'gif'], // Specify allowed formats here
        }}
        uploadPreset='uploadBiwebapp'
      >
        {({ open }) => {
          const onClick = () => {
            open();
          };

          return (
            <Button
              type='button'
              disabled={disabled}
              variant='outline'
              onClick={onClick}
            >
              <ImagePlus className='h-4 w-4 mr-2' />
              Upload Image
            </Button>
          );
        }}
      </CldUploadWidget>
    </div>
  );
};

export default BillboardImageUpload;
