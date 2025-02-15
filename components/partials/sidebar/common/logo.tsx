import { SiteLogo } from "@/components/svg";
import { useSidebar } from "@/store";
import Image from "next/image";
import React from "react";
import { Pin } from 'lucide-react';


const SidebarLogo = ({ hovered }: { hovered?: boolean }) => {
  const { sidebarType, setCollapsed, collapsed } = useSidebar();
  return (
    <div className="px-4 py-4 ">
      <div className="flex items-center justify-center flex-col relative">
      <div className="flex justify-center items-center">
          {/* <SiteLogo className="text-primary h-8 w-8" /> */}
          <Image src='/images/logo/logo.png' alt='sidebar-logo' width={100} height={100} priority />
        </div>
        {sidebarType === "classic" && (!collapsed || hovered) && (
          <div className="flex-none">
            <div
              onClick={() => setCollapsed(!collapsed)}
              className={`absolute top-0 right-0 h-8 w-8 flex items-center justify-center border-[1.5px] border-default-900 dark:border-default-200 rounded-full transition-all duration-150
          ${collapsed
                  ? ""
                  : "bg-blue-700 text-white dark:bg-default-300 dark:text-white"
                }
          `}
            >
                            <Pin className="h-4 w-4 border-none" />

            </div>
          </div>
        )}
      </div>
      {(!collapsed || hovered) && (
          <div className="text-md text-primary font-semibold mt-1 text-center">
          Bumi Indah Saranamedis
        </div>
      )}
    </div>
  );
};

export default SidebarLogo;

