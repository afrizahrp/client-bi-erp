// import { Poppins } from 'next/font/google'

// import { useEffect } from 'react'

// import { cn } from '@/lib/utils'

// const font = Poppins({
//   subsets: ['latin'],
//   weight: ['600']
// })

// interface HeaderProps {
//   label: string;
// }

// useEffect(() => {
//   const selectedTheme = localStorage.getItem('theme')
//   console.log(selectedTheme)
// }, [])

import Image from 'next/image'

export const Header = () => {
  return (
    <div className='w-full flex flex-col gap-y-1 items-center justify-center mb-0 mt-0'>
      <Image
        src='/images/logo/login-logo.svg'
        alt='logoAtlogin'
        width={120}
        height={120}
        style={{ top: 0, textAlign: 'left' }}
        priority
      />
 {/* <h1 className={cn('text-md font-semibold text-blue-800 drop-shadow-md', font.className)}>
        {label}
      </h1>     */}
      </div>
  )
}
