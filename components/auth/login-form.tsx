"use client";
import React from "react";
import { useForm } from 'react-hook-form'

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { FormError } from '@/components/form-error'
import { FormSuccess } from '@/components/form-success'
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import { signIn } from "next-auth/react";
import toast from "react-hot-toast";
import Link from "next/link";
import Image from "next/image";
import { Icon } from "@iconify/react";
import { CardWrapper } from "@/components/auth/card-wrapper";

import { LoginSchema } from '@/utils/schema/login.schema'
// import { Checkbox } from "@/components/ui/checkbox";
// import { SiteLogo } from "@/components/svg";
// import { cn } from "@/lib/utils";



const schema = z.object({
  username: z.string().email({ message: "Your email is invalid." }),
  password: z.string().min(4),
});
import { useMediaQuery } from "@/hooks/use-media-query";

const LogInForm = () => {
  const [isPending, startTransition] = React.useTransition();
  const [passwordType, setPasswordType] = React.useState("password");
  const isDesktop2xl = useMediaQuery("(max-width: 1530px)");

  const togglePasswordType = () => {
    if (passwordType === "text") {
      setPasswordType("password");
    } else if (passwordType === "password") {
      setPasswordType("text");
    }
  };
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    mode: "all",
    defaultValues: {
      username: "afriza@gmail.com",
      password: "1234567",
    },
  });
  const [isVisible, setIsVisible] = React.useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      name: 'afriza',
      password: '1234567'
    }
  })



  const onSubmit = (data: { name: string; password: string; code?: string }) => {
    startTransition(async () => {
      let response = await signIn("credentials", {
        name: data.name,
        password: data.password,
        redirect: false,
      });
      if (response?.ok) {
        toast.success("Login Successful");
        window.location.assign("/dashboard");
        reset();
      } else if (response?.error) {
        toast.error(response?.error);
      }
    });
  };
  return (
    <CardWrapper backButtonLabel="Don't have an account ?" backButtonHref='/auth/register' showSocial>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
          <div className='space-y-4'>
            
          
                <FormField
                  control={form.control}
                  name='name'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className='text-sm'>Username</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          disabled={isPending}
                          placeholder='Please enter your username'
                          className='border-gray-300 dark:border-gray-600 
                                     bg-white dark:bg-gray-800 
                                     text-gray-900 dark:text-gray-100'
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
                                       text-gray-900 dark:text-gray-100'
                          />
                          <div
                            className='absolute top-1/2 -translate-y-1/2 ltr:right-4 rtl:left-4 cursor-pointer'
                            onClick={togglePasswordType}
                          >
                            {passwordType === 'password' ? (
                              <Icon icon='heroicons:eye-slash' className='w-4 h-4 text-gray-500 dark:text-gray-400' />
                            ) : (
                              <Icon icon='heroicons:eye' className='w-4 h-4 text-gray-500 dark:text-gray-400' />
                            )}
                          </div>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
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
          </div>
          {/* <FormError message={error || urlError} /> */}
          {/* <FormSuccess message={success} /> */}
          <Button
            disabled={isPending}
            type='submit'
            className='w-full bg-blue-500 hover:bg-blue-600 
                       text-white dark:bg-blue-600 dark:hover:bg-blue-700'
          >
            Login
          </Button>
        </form>
      </Form>
    </CardWrapper>
  )
};

export default LogInForm;
