'use client';
import React, { useState } from 'react';
import { cn, isLocationMatch } from '@/lib/utils';
import { useModuleStore, useSidebar, useThemeStore } from '@/store';
import SidebarLogo from '../common/logo';
import { menusConfig } from '@/config/menus';
import { useGetMenu } from '@/hooks/use-get-menu'; // 🔥 Import hook yang sudah kamu buat

import MenuLabel from '../common/menu-label';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { usePathname } from 'next/navigation';
import SingleMenuItem from './single-menu-item';
import SubMenuHandler from './sub-menu-handler';
import NestedSubMenu from '../common/nested-menus';

import { useAuth } from '@/provider/auth.provider';
import Image from 'next/image';

const MobileSidebar = ({
  className,
  trans,
}: {
  className?: string;
  trans: any;
}) => {
  const { sidebarBg, mobileMenu, setMobileMenu } = useSidebar();
  const [activeSubmenu, setActiveSubmenu] = useState<number | null>(null);
  const [activeMultiMenu, setMultiMenu] = useState<number | null>(null);
  // const menus = menusConfig?.sidebarNav?.classic || [];
  const { menuItems, loading } = useGetMenu(); // 🔥 Gunakan hook untuk fetch data menu

  const { collapsed } = useSidebar();

  const { session } = useAuth();
  // console.log('Session from sidebarLogo:', session); // Debugging log
  const companyId = session?.user?.company_id;

  // Pemetaan companyId ke nama perusahaan
  let companyName = '';
  let logoSrc = '/images/logo/logo.png'; // Default logo

  if (companyId === 'BIS') {
    companyName = 'Bumi Indah Saranamedis';
  } else if (companyId === 'BIP') {
    companyName = 'Bumi Indah Putra';
    logoSrc = '/images/logo/bipmed-logo.png'; // Logo untuk BIP
  } else if (companyId === 'KBIP') {
    companyName = 'Karoseri Bumi Indah Putra';
    logoSrc = '/images/logo/bipmed-logo.png'; // Logo untuk KBIP
  }

  const setModuleId = useModuleStore((state) => state.setModuleId);

  const toggleSubmenu = (i: number, module_id: string) => {
    setModuleId(module_id);

    if (activeSubmenu === i) {
      setActiveSubmenu(null);
    } else {
      setActiveSubmenu(i);
    }
  };

  const toggleMultiMenu = (subIndex: number) => {
    if (activeMultiMenu === subIndex) {
      setMultiMenu(null);
    } else {
      setMultiMenu(subIndex);
    }
  };
  const locationName = usePathname();

  React.useEffect(() => {
    let subMenuIndex = null;
    let multiMenuIndex = null;
    menuItems?.map((item: any, i: number) => {
      if (item?.child) {
        item.child.map((childItem: any, j: number) => {
          if (isLocationMatch(childItem.href, locationName)) {
            subMenuIndex = i;
          }
          if (childItem?.multi_menu) {
            childItem.multi_menu.map((multiItem: any, k: number) => {
              if (isLocationMatch(multiItem.href, locationName)) {
                subMenuIndex = i;
                multiMenuIndex = j;
              }
            });
          }
        });
      }
    });
    setActiveSubmenu(subMenuIndex);
    setMultiMenu(multiMenuIndex);
    if (mobileMenu) {
      setMobileMenu(false);
    }
  }, [locationName]);
  return (
    <>
      <div
        className={cn(
          'fixed top-0  bg-card h-full w-[248px] z-[9999] ',
          className,
          {
            ' -left-[300px] invisible opacity-0  ': !mobileMenu,
            ' left-0 visible opacity-100  ': mobileMenu,
          }
        )}
      >
        {sidebarBg !== 'none' && (
          <div
            className=' absolute left-0 top-0   z-[-1] w-full h-full bg-cover bg-center opacity-[0.07]'
            style={{ backgroundImage: `url(${sidebarBg})` }}
          ></div>
        )}
        {/* <SidebarLogo hovered={collapsed} /> */}
        <Image
          src={logoSrc}
          alt='sidebar-logo'
          width={100}
          height={100}
          priority
        />
        <ScrollArea
          className={cn('sidebar-menu  h-[calc(100%-80px)] ', {
            'px-4': !collapsed,
          })}
        >
          <ul
            className={cn('', {
              ' space-y-2 text-center': collapsed,
            })}
          >
            {menuItems.map((item, i) => (
              <li key={`menu_key_${i}`}>
                {/* single menu  */}

                {item && !item.child && !item.isHeader && (
                  <SingleMenuItem item={item} collapsed={collapsed} />
                )}

                {/* menu label */}
                {item && item.isHeader && !item.child && !collapsed && (
                  <MenuLabel item={item} trans={trans} />
                )}

                {/* sub menu */}
                {item && item.child && (
                  <>
                    <SubMenuHandler
                      item={item}
                      toggleSubmenu={toggleSubmenu}
                      index={i}
                      activeSubmenu={activeSubmenu}
                      collapsed={collapsed}
                    />

                    {!collapsed && (
                      <NestedSubMenu
                        toggleMultiMenu={toggleMultiMenu}
                        activeMultiMenu={activeMultiMenu}
                        activeSubmenu={activeSubmenu}
                        item={item}
                        index={i}
                        title={''}
                        trans={undefined}
                      />
                    )}
                  </>
                )}
              </li>
            ))}
          </ul>
        </ScrollArea>
      </div>
      {mobileMenu && (
        <div
          onClick={() => setMobileMenu(false)}
          className='overlay bg-black/60 backdrop-filter backdrop-blur-sm opacity-100 fixed inset-0 z-[999]'
        ></div>
      )}
    </>
  );
};

export default MobileSidebar;
