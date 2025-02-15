import { Poppins } from 'next/font/google'
import { cn } from '@/lib/utils'

const font = Poppins({
  subsets: ['latin'],
  weight: ['600']
})

interface HeaderProps {
  label: string;
}

import Image from 'next/image'

export const Header: React.FC<HeaderProps> = ({ label }) => {
  return (
    <div className='w-full flex flex-col items-center justify-center mb-0 mt-0'>
      <Image
        src='/images/logo/logo.png'
        alt='logoAtlogin'
        width={140}
        height={140}
        style={{ top: 0, textAlign: 'left' }}
        priority
      />
      <h1 className={cn('text-md font-semibold text-blue-700 drop-shadow-md -mt-4', font.className)}>
        {label}
      </h1>    
    </div>
  )
}