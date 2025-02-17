'use client';
import React from 'react';
import { useForm } from 'react-hook-form';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { signIn } from 'next-auth/react';
import toast from 'react-hot-toast';
import Link from 'next/link';
import { Icon } from '@iconify/react';
import { CardWrapper } from '@/components/auth/card-wrapper';
import CompanyCombobox from '../ui/company-combobox';
import { LoginSchema } from '@/utils/schema/login.schema';
import { useMediaQuery } from '@/hooks/use-media-query';

// const schema = z.object({
//   // name: z.string().email({ message: "Your email is invalid." }),
//    name: z.string().min(4),
//   password: z.string().min(4),
//   company_id: z.string().min(1, { message: "Please select a company." }),
// });

const LogInForm = () => {
  const [isPending, startTransition] = React.useTransition();
  const [passwordType, setPasswordType] = React.useState('password');
  const isDesktop2xl = useMediaQuery('(max-width: 1530px)');

  const togglePasswordType = () => {
    setPasswordType((prevType) =>
      prevType === 'password' ? 'text' : 'password'
    );
  };

  const form = useForm({
    resolver: zodResolver(LoginSchema),
    mode: 'all',
    defaultValues: {
      name: 'afriza-bis',
      password: '1234567',
      company_id: '',
    },
  });

  const onSubmit = (data: {
    name: string;
    password: string;
    company_id: string;
  }) => {
    console.log(data);
    startTransition(async () => {
      let response = await signIn('credentials', {
        name: data.name,
        password: data.password,
        company_id: data.company_id.toLocaleUpperCase(),
        redirect: false,
      });
      if (response?.ok) {
        toast.success('Login Successful');
        window.location.assign('/dashboard');
        form.reset();
      } else if (response?.error) {
        toast.error(response?.error);
      }
    });
  };

  return (
    <CardWrapper
      backButtonLabel="Don't have an account ?"
      backButtonHref='/auth/register'
      showSocial
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
          <div className='space-y-4'>
            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='text-sm'>Name</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder='Please enter your user name'
                      className='border-gray-300 dark:border-gray-600 
                                 bg-white dark:bg-gray-800 
                                 text-gray-900 dark:text-gray-100 w-full'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='password'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='text-sm'>Password</FormLabel>
                  <FormControl>
                    <div className='relative'>
                      <Input
                        {...field}
                        disabled={isPending}
                        placeholder='Please enter your password'
                        type={passwordType === 'password' ? 'password' : 'text'}
                        className='border-gray-300 dark:border-gray-600 
                                   bg-white dark:bg-gray-800 
                                   text-gray-900 dark:text-gray-100 w-full'
                      />
                      <div
                        className='absolute top-1/2 -translate-y-1/2 ltr:right-4 rtl:left-4 cursor-pointer'
                        onClick={togglePasswordType}
                      >
                        {passwordType === 'password' ? (
                          <Icon
                            icon='heroicons:eye-slash'
                            className='w-4 h-4 text-gray-500 dark:text-gray-400'
                          />
                        ) : (
                          <Icon
                            icon='heroicons:eye'
                            className='w-4 h-4 text-gray-500 dark:text-gray-400'
                          />
                        )}
                      </div>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='company_id'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='text-sm'>Company</FormLabel>
                  <FormControl>
                    <CompanyCombobox
                      disabled={isPending}
                      value={field.value}
                      onChange={field.onChange}
                      className='w-full'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button
            disabled={isPending}
            type='submit'
            className='w-full bg-blue-500 hover:bg-blue-600 
                       text-white dark:bg-blue-600 dark:hover:bg-blue-700'
          >
            Login
          </Button>
          <Button
            size='sm'
            variant='link'
            asChild
            className='px-0 font-normal text-sm 
                       bg-transparent
                       text-blue-800
                       dark:text-blue-400 dark:hover:text-white'
          >
            <Link href='/auth/reset'>Forgot password ?</Link>
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};

export default LogInForm;
