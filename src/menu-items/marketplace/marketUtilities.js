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
        type: 'collapse',
        url: null,
        icon: icons.IconShadow,
        children: [
          {
            id: 'membershiprequest',
            title: 'Membership request', 
            type: 'item',
            url: '/marketplace/requests',
            breadcrumbs: false
          },
        ]
      },
      {
        id: 'payments',
        title: 'Payments',
        type: 'collapse',
        url: null,
        icon: icons.IconCurrencyRupee,
        children: [
          {
            id: 'subcription',
            title: 'Subscriptions', 
            type: 'item',
            url: '/marketplace/payments/subscription',
            breadcrumbs: false
          },
          {
            id: 'payment',
            title: 'Payments',
            type: 'item',
            url: '/marketplace/payments/all_payment',
            breadcrumbs: false
          },
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
          // {
          //   id: 'eventtype',
          //   title: 'Event Type',
          //   type: 'item',
          //   url: '/marketplace/masters/eventtype',
          //   breadcrumbs: false
          // },
          // {
          //   id: 'newtype',
          //   title: 'New Type',
          //   type: 'item',
          //   url: '/marketplace/masters/newtype',
          //   breadcrumbs: false
          // },
          // {
          //   id: 'promotype',
          //   title: 'Promo Type',
          //   type: 'item',
          //   url: '/marketplace/masters/promotype',
          //   breadcrumbs: false
          // },
          {
            id: 'requesttype',
            title: 'Request Type',
            type: 'item',
            url: '/marketplace/masters/requesttype',
            breadcrumbs: false
          },
          {
            id: 'city',
            title: 'City',
            type: 'item',
            url: '/marketplace/masters/city',
            breadcrumbs: false
          },
          {
            id: 'state',
            title: 'State',
            type: 'item',
            url: '/marketplace/masters/state',
            breadcrumbs: false
          },
          {
            id: 'country',
            title: 'Country',
            type: 'item',
            url: '/marketplace/masters/country',
            breadcrumbs: false
          },
        ]
      },
      {
        id: 'reports',
        title: 'Reports',
        type: 'collapse',
        url: null,
        icon: icons.IconPaperBag,
        children: [
          {
            id: 'report',
            title: 'Report',
            type: 'item',
            url: '/marketplace/membersreports',
            breadcrumbs: false
          },
        ]
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
        url: '/marketplace/',
        icon: icons.IconSettings,
        breadcrumbs: false
      }
    ]
  };
  
  export default marketUtilities;
  