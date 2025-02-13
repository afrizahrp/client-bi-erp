"use client";
import React from "react";
// import { SiteLogo } from "@/components/svg";
import { Loader2 } from "lucide-react";
import Image from "next/image";
const LayoutLoader = () => {
  return (
    <div className=" h-screen flex items-center justify-center flex-col space-y-2">
      {/* <SiteLogo className=" h-10 w-10 text-primary" /> */}
      <Image src='/images/logo/logo.svg' alt='layoutLoaderLogo' width={100} height={100} priority />

      <span className=" inline-flex gap-1">
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        Loading...
      </span>
    </div>
  );
};

export default LayoutLoader;
