'use client';

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import { Header } from '@/components/auth/header';
// import { Social } from '@/components/auth/social'
import { BackButton } from '@/components/auth/back-button';

interface CardWrapperProps {
  children: React.ReactNode;
  backButtonLabel: string;
  backButtonHref: string;
  headerLabel: string;
  showSocial?: boolean;
}

export const CardWrapper = ({
  children,
  backButtonLabel,
  backButtonHref,
  // showSocial
}: CardWrapperProps) => {
  return (
    <Card className='w-[400px]  shadow-md'>
      <CardHeader>
        <Header label='Bumi Indah Saranamedis' />
      </CardHeader>
      <CardContent>{children}</CardContent>
      {/* {showSocial && (
        <CardFooter>
          <Social />
        </CardFooter>
      )} */}
      <CardFooter>
        <BackButton label={backButtonLabel} href={backButtonHref} />
      </CardFooter>
    </Card>
  );
};
