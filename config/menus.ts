import { DashBoard, Note2, Settings } from '@/components/svg'

export interface MenuItemProps {
  title: string
  icon: any
  href?: string
  child?: MenuItemProps[]
  multi_menu?: MenuItemProps[]
  nested?: MenuItemProps[]
  onClick: () => void
  // megaMenu?: MenuItemProps[];
}

export const menusConfig = {
  sidebarNav: {
    classic: [
      {
        isHeader: true,
        title: 'Application'
      },
      {
        title: 'Inventory Management',
        href: '#',
        icon: DashBoard,
        child: [
          {
            title: 'List',
            href: '/inventory/master',
            multi_menu: [
              {
                title: 'Categories',
                href: '/inventory/categories/category-list'
              },
              {
                title: 'SubCategories',
                href: '/inventory/subcategories/subcategory-list'
              },
              {
                title: 'Brands',
                href: '/inventory/brands/brand-list'
              },
              {
                title: 'Products',
                href: '/inventory/products/product-list'
              }
            ]
          }
        ]
      },

      {
        title: 'Sales Administration',
        href: '#',
        icon: DashBoard,
        child: [
          {
            title: 'Dashboard',
            href: '/salesAdmin/dashboard',
            icon: DashBoard
          },

          {
            title: 'List',
            href: '/salesAdmin/master',
            multi_menu: [
              {
                title: 'Customers',
                href: '#'
              },
              {
                title: 'Products',
                href: '/salesAdmin/products/product-list'
              }
            ]
          }
        ]
      },

      {
        title: 'Digital Marketing',
        icon: Settings,
        child: [
          {
            title: 'Website',
            href: '/cms/master',
            multi_menu: [
              {
                title: 'Products',
                href: '/cms/products/product-list'
              },
              {
                title: 'Categories',
                href: '/cms/categories/category-list'
              },
              {
                title: 'Banner',
                href: '/cms/billboards/billboard-list'
              }
            ]
          }
          // {
          //   title: 'Social Media',
          //   href: '/cms/master',
          //   multi_menu: [
          //     {
          //       title: 'Copywriting',
          //       href: '#',
          //     },
          //     {
          //       title: 'Content',
          //       href: '#',
          //     },
          //   ],
          // },
          // {
          //   title: 'Market Place',
          //   href: '/cms/master',
          //   multi_menu: [
          //     {
          //       title: 'Copywriting',
          //       href: '#',
          //     },
          //     {
          //       title: 'Content',
          //       href: '#',
          //     },
          //   ],
          // },
        ]
      },

     
    ]
  }
}

export type ClassicNavType = (typeof menusConfig.sidebarNav.classic)[number]
