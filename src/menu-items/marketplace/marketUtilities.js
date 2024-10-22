// assets
import {
    IconTypography,
    IconPalette,
    IconShadow,
    IconWindmill,
    IconSettings,
    IconUser,
    IconPaperBag,
    IconCurrency,
    IconCurrencyRupee
  } from '@tabler/icons-react';
  
  // constant
  const icons = {
    IconTypography,
    IconPalette,
    IconShadow,
    IconWindmill,
    IconSettings,
    IconUser,
    IconPaperBag,
    IconCurrencyRupee
  };
  
  // ==============================|| UTILITIES MENU ITEMS ||============================== //
  
  const marketUtilities = {
    id: 'pages',
    title: 'Pages',
    type: 'group',
    children: [
      
      {
        id: 'membership',
        title: 'Membership',
        type: 'collapse',
        icon: icons.IconUser,
        url: null,
        children: [
          {
            id: 'family',
            title: 'Family',
            type: 'item',
            url: '/marketplace/membership/family',
            breadcrumbs: false
          },
          {
            id: 'bulkupload',
            title: 'Bulk Upload',
            type: 'item',
            url: '/marketplace/membership/bulkupload',
            breadcrumbs: false
          },
          {
            id: 'familytree',
            title: 'Family Tree',
            type: 'item',
            url: '/marketplace/membership/familytree',
            breadcrumbs: false
          },
        ]
      },
      {
        id: 'requests',
        title: 'Requests',
        type: 'item',
        url: '/marketplace/requests',
        icon: icons.IconShadow,
        breadcrumbs: false
      },
      {
        id: 'payments',
        title: 'Payments',
        type: 'item',
        url: '/marketplace/payments',
        icon: icons.IconCurrencyRupee,
        breadcrumbs: false
      },
      {
        id: 'masters',
        title: 'Masters',
        type: 'collapse',
        icon: icons.IconPalette,
        url: null,
        children: [
          {
            id: 'qualification',
            title: 'Qualification',
            type: 'item',
            url: '/marketplace/masters/qualification',
            breadcrumbs: false
          },
          {
            id: 'occupation',
            title: 'Occupation',
            type: 'item',
            url: '/marketplace/masters/occupation',
            breadcrumbs: false
          },
          // {
          //   id: 'relationship',
          //   title: 'Relationship Constant',
          //   type: 'item',
          //   url: 'marketplace/masters/relationship',
          //   breadcrumbs: false
          // },
          {
            id: 'gotra',
            title: 'Gotra',
            type: 'item',
            url: '/marketplace/masters/gotra',
            breadcrumbs: false
          },
          {
            id: 'eventtype',
            title: 'Event Type',
            type: 'item',
            url: '/marketplace/masters/eventtype',
            breadcrumbs: false
          },
          {
            id: 'newtype',
            title: 'New Type',
            type: 'item',
            url: '/marketplace/masters/newtype',
            breadcrumbs: false
          },
          {
            id: 'promotype',
            title: 'Promo Type',
            type: 'item',
            url: '/marketplace/masters/promotype',
            breadcrumbs: false
          },
          {
            id: 'requesttype',
            title: 'Request Type',
            type: 'item',
            url: '/marketplace/masters/requesttype',
            breadcrumbs: false
          },
        ]
      },
      {
        id: 'reports',
        title: 'Reports',
        type: 'item',
        url: '/marketplace/reports',
        icon: icons.IconPaperBag,
        breadcrumbs: false
      },
      {
        id: 'users',
        title: 'Users',
        type: 'collapse',
        icon: icons.IconUser,
        url: null,
        children: [
          {
            id: 'staff',
            title: 'Staff',
            type: 'item',
            url: '/marketplace/users/staff',
            breadcrumbs: false
          },
          {
            id: 'members',
            title: 'Members',
            type: 'item',
            url: '/marketplace/users/members',
            breadcrumbs: false
          },
        
        ]
      },
      {
        id: 'settings',
        title: 'Settings',
        type: 'item',
        url: '/marketplace/settings',
        icon: icons.IconSettings,
        breadcrumbs: false
      }
    ]
  };
  
  export default marketUtilities;
  