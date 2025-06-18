import React, { useEffect } from 'react';
import './Main.css';
import CookieConsentBanner from './components/cookie-consent/Banner';
import { useNavigate, useLocation } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';
import { useAuth } from 'wasp/client/auth';
import { updateCurrentUserLastActiveTimestamp } from 'wasp/client/operations';
import { cn } from './cn';
import LandingPage from '../landing-page/LandingPage';
import NavBar from './components/NavBar/NavBar';
import SideNavbar from './components/SideNavbar/SideNavbar';
import Customers from './components/Customers/Customers';
import Products from './components/Products/Products';

/**
 * use this component to wrap all child components
 * this is useful for templates, themes, and context
 */
export default function App() {
  const navigate = useNavigate();
  const { data: user } = useAuth();

  useEffect(() => {
    if (user) {
      const lastSeenAt = new Date(user.lastActiveTimestamp);
      const today = new Date();
      if (today.getTime() - lastSeenAt.getTime() > 5 * 60 * 1000) {
        updateCurrentUserLastActiveTimestamp({ lastActiveTimestamp: today });
      }
    }
  }, [user]);

  const navigationItems = [
    {
      name: 'Home',
      to: '/',
    },
    {
      name: 'Get Started',
      to: '/get-started',
    }
  ];

  const location = useLocation();
  const currentTab = (() => {
    if (location.pathname === '/get-started') return 'Get Started';
    if (location.pathname === '/get-started/customers') return 'Customers';
    if (location.pathname === '/get-started/products') return 'Products';
    return 'Get Started';
  })();

  return (
    <div className='min-h-screen bg-white dark:bg-boxdark-2'>
      {!location.pathname.startsWith('/get-started') && <NavBar navigationItems={navigationItems} />}
      <div
        className={cn(
          'min-h-screen'
        )}
      >
         <Routes>
           <Route path="/" element={<LandingPage />} />
           <Route path="/get-started/*" element={
             <div className="empty-background">
               <div className="flex h-full">
                 <SideNavbar activeTab={currentTab} onTabClick={(tab) => navigate(`/get-started/${tab.toLowerCase().replace(/\s+/g, '-')}`)} />
                 <div className="flex-1 mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
                   <Routes>
                     <Route index element={<div className="flex-1 h-full">Empty Content</div>} />
                     <Route path="customers" element={<Customers />} />
                     <Route path="products" element={<Products />} />
                   </Routes>
                 </div>
               </div>
             </div>
           } />
         </Routes>
      </div>
      <CookieConsentBanner />
    </div>
  );
}
