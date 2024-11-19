import { lazy } from 'react';
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';
import Login from 'views/pages/authentication3/Login3';
import Register from 'views/pages/authentication3/Register3';
import ForgotPassword from 'views/pages/authentication3/ForgotPassword';
import VerifyOtp from 'views/pages/authentication3/VerifyOtp';
import ResetPassword from 'views/pages/authentication3/ResetPassword';
import ProtectedRoute from './ProtectedRoute';

// dashboard routing
const DashboardDefault = Loadable(lazy(() => import('views/dashboard')));

// utilities routing
const UtilsBanner = Loadable(lazy(() => import('views/utilitiess/dashboard/Banner')));
const UtilsPromo = Loadable(lazy(() => import('views/utilitiess/dashboard/Promo')));
const UtilsNews = Loadable(lazy(() => import('views/utilitiess/dashboard/News')));
const UtilsSuccessStory = Loadable(lazy(() => import('views/utilitiess/dashboard/SuccessStory')));

const UtilsEventType = Loadable(lazy(() => import('views/utilitiess/marketutilities/masters/EventType')));
const UtilsNewsType = Loadable(lazy(() => import('views/utilitiess/marketutilities/masters/NewsType')));
const UtilsPrmoType = Loadable(lazy(() => import('views/utilitiess/marketutilities/masters/PromoType')));


const UtilsNotication = Loadable(lazy(() => import('views/utilitiess/dashboard/Notification')));
const UtilsUsers = Loadable(lazy(() => import('views/utilitiess/mcqUtilities/Users')));
const UtilsSettings = Loadable(lazy(() => import('views/utilitiess/mcqUtilities/Settings')));
const UtilsPayments = Loadable(lazy(() => import('views/utilitiess/mcqUtilities/Payments')));
const UtilsCertificate = Loadable(lazy(() => import('views/utilitiess/mcqUtilities/certificate/CertificateGenerator')));

const MainRoutes = {
  path: '/',

  children: [
    { path: '/', element: <Login /> },
    { path: '/register', element: <Register /> },
    { path: '/forgot-password', element: <ForgotPassword /> },
    { path: '/verify-otp', element: <VerifyOtp /> },
    { path: '/reset-password', element: <ResetPassword /> },
    {
      path: '/',
      element: <ProtectedRoute element={<MainLayout />} />,
      children: [
        {
          path: 'dashboard',
          children: [
            { path: '', element: <DashboardDefault /> },
            { path: 'banner', element: <UtilsBanner /> },
            { path: 'news', element: <UtilsNews /> },
            { path: 'promo', element: <UtilsPromo /> },
            { path: 'success-story', element: <UtilsSuccessStory /> },

            { path: 'masters/eventtype', element: <UtilsEventType /> },
            { path: 'masters/newstype', element: <UtilsNewsType /> },
            { path: 'masters/promotype', element: <UtilsPrmoType /> },



            { path: 'notification', element: <UtilsNotication /> },
            { path: 'certificate', element: <UtilsCertificate /> },
            { path: 'payments', element: <UtilsPayments /> },
            { path: 'users', element: <UtilsUsers /> },
            { path: 'settings', element: <UtilsSettings /> }

          ]
        }
      ]
    }
  ]
};

export default MainRoutes;
