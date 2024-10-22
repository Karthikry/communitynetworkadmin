import { lazy } from 'react';
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';
import Login from 'views/pages/authentication3/Login3';
import Register from 'views/pages/authentication3/Register3';
import ProtectedRoute from './ProtectedRoute';



// dashboard routing
const DashboardDefault = Loadable(lazy(() => import('views/marketplace')));
// utilities routing

const UtilsSettings = Loadable(lazy(() => import('views/utilitiess/marketutilities/Settings')));
const UtilsAdvertise = Loadable(lazy(() => import('views/utilitiess/marketutilities/Advertise')));
const UtilsFamily = Loadable(lazy(() => import('views/utilitiess/marketutilities/membership/Family')));
const UtilsBulk = Loadable(lazy(() => import('views/utilitiess/marketutilities/membership/Bulk_Upload')));
const UtilsFamily_Tree = Loadable(lazy(() => import('views/utilitiess/marketutilities/membership/Family_Tree')));
const UtilsRequest = Loadable(lazy(() => import('views/utilitiess/marketutilities/Request')));

const UtilsQualification = Loadable(lazy(() => import('views/utilitiess/marketutilities/masters/Qualification')));
const UtilsOccupation = Loadable(lazy(() => import('views/utilitiess/marketutilities/masters/Occupation')));
const UtilsRelationship = Loadable(lazy(() => import('views/utilitiess/marketutilities/masters/Relationship')));
const UtilsGotra = Loadable(lazy(() => import('views/utilitiess/marketutilities/masters/Gotra')));
const UtilsEventType = Loadable(lazy(() => import('views/utilitiess/marketutilities/masters/EventType')));
const UtilsNewsType = Loadable(lazy(() => import('views/utilitiess/marketutilities/masters/NewsType')));
const UtilsPromoType = Loadable(lazy(() => import('views/utilitiess/marketutilities/masters/PromoType')));
const UtilsRequestType = Loadable(lazy(() => import('views/utilitiess/marketutilities/masters/RequestType')));

const UtilsReport = Loadable(lazy(() => import('views/utilitiess/marketutilities/Report')));

const UtilsStaff = Loadable(lazy(() => import('views/utilitiess/marketutilities/users/Staff')));
const UtilsMembers = Loadable(lazy(() => import('views/utilitiess/marketutilities/users/Members')));





const Marketplace = Loadable(lazy(() => import('views/marketplace')));

const MarketplaceRoutes = {
  path: '/',
  children: [
    { path: '/', element: <Login /> },
    { path: '/register', element: <Register /> },
    {
      path: '/',
      element: <ProtectedRoute element={<MainLayout />} />,
      children: [
        {
          path: 'marketplace',
          children: [
            { path: '', element: <DashboardDefault /> },
            { path: 'membership/family', element: <UtilsFamily /> },
            { path: 'membership/bulkupload', element: <UtilsBulk /> },
            { path: 'membership/familytree', element: <UtilsFamily_Tree /> },

            { path: 'requests', element: <UtilsRequest /> },

            { path: 'masters/qualification', element: <UtilsQualification /> },
            { path: 'masters/occupation', element: <UtilsOccupation /> },
            { path: 'masters/relationship', element: <UtilsRelationship /> },
            { path: 'masters/gotra', element: <UtilsGotra /> },
            { path: 'masters/eventtype', element: <UtilsEventType /> },
            { path: 'masters/newtype', element: <UtilsNewsType /> },
            { path: 'masters/promotype', element: <UtilsPromoType /> },
            { path: 'masters/requesttype', element: <UtilsRequestType /> },


            { path: 'reports', element: <UtilsReport /> },

            { path: 'users/staff', element: <UtilsStaff /> },
            { path: 'users/members', element: <UtilsMembers /> },

            
          ]
        }
      ]
    }
  ]
};

export default MarketplaceRoutes;
