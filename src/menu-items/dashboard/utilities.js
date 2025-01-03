// assets
import {
  IconTypography,
  IconPalette,
  IconShadow,
  IconWindmill,
  IconSettings,
  IconUser,
  IconPaperBag,
  IconCurrencyRupee,
  IconCertificate,
  IconAd2
} from '@tabler/icons-react';

// constant
const icons = {
  IconTypography,
  IconPalette,
  IconShadow,
  IconWindmill,
  IconSettings,
  IconUser,
  IconCurrencyRupee,
  IconCertificate,
  IconAd2
};

// ==============================|| UTILITIES MENU ITEMS ||============================== //

const utilities = {
  id: 'pages',
  title: 'Pages',
  type: 'group',
  children: [
    {
      id: 'ads',
      title: 'Ads',
      type: 'collapse',
      icon: icons.IconAd2,
      url: null,
      children: [
        {
          id: 'banner',
          title: 'Banner',
          type: 'item',
          url: '/dashboard/banner',
          breadcrumbs: false
        },
        {
          id: 'news',
          title: 'News',
          type: 'item',
          url: '/dashboard/news',
          breadcrumbs: false
        },
        {
          id: 'promo',
          title: 'Promo',
          type: 'item',
          url: '/dashboard/promo',
          breadcrumbs: false
        },
        {
          id: 'success-story',
          title: 'Success Story',
          type: 'item',
          url: '/dashboard/success-story',
          breadcrumbs: false
        },
        {
          id: 'event',
          title: 'Event',
          type: 'item',
          url: '/dashboard/event',
          breadcrumbs: false
        }
      ]
    },
    {
      id: 'masters',
      title: 'Masters',
      type: 'collapse',
      icon: icons.IconPalette,
      url: null,
      children: [
        {
          id: 'eventtype',
          title: 'Event Type',
          type: 'item',
          url: '/dashboard/masters/eventtype',
          breadcrumbs: false
        },
        {
          id: 'newstype',
          title: 'News Type',
          type: 'item',
          url: '/dashboard/masters/newstype',
          breadcrumbs: false
        },
        {
          id: 'promotype',
          title: 'Promo Type',
          type: 'item',
          url: '/dashboard/masters/promotype',
          breadcrumbs: false
        },
      ]
    },


    // {
    //   id: 'notification',
    //   title: 'Notifications',
    //   type: 'collapse',
    //   icon: icons.IconAd2,
    //   url: null,
    //   children: [
    //     {
    //       id: 'notification',
    //       title: 'Notifications', 
    //       type: 'item',
    //       url: '/dashboard/notification',
    //       breadcrumbs: false
    //     }
    //   ]
    // },



    

    // {
    //   id: 'certificate',
    //   title: 'Certificate',
    //   type: 'item',
    //   url: '/dashboard/certificate',
    //   icon: icons.IconCertificate,
    //   breadcrumbs: false
    // },


    // {
    //   id: 'payments',
    //   title: 'Payments',
    //   type: 'item',
    //   url: '/dashboard/payments',
    //   icon: icons.IconCurrencyRupee,
    //   breadcrumbs: false
    // },
    // {
    //   id: 'users',
    //   title: 'Users',
    //   type: 'item',
    //   url: '/dashboard/users',
    //   icon: icons.IconUser,
    //   breadcrumbs: false
    // },
    
    {
      id: 'settings',
      title: 'Settings',
      type: 'item',
      url: '/dashboard/settings',
      icon: icons.IconSettings,
      breadcrumbs: false
    }
  ]
};

export default utilities;
