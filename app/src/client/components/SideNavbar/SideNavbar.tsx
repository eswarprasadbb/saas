// SideNavbar.tsx
import { Link, useLocation } from 'react-router-dom';
import { cn } from '../../cn';
import { useState } from 'react';
import { IoIosArrowBack } from 'react-icons/io';

export default function SideNavbar() {
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const tabs = [
    { name: 'Get Started', path: '/get-started', icon: '🚀' },
    { name: 'Dashboard', path: '/dashboard', icon: '📊' },
    { name: 'Products', path: '/products', icon: '📦' },
    { name: 'Rate Plan', path: '/rate-plan', icon: '💳' },
    { name: 'Metering', path: '/metering', icon: '🧮' },
    { name: 'Customers', path: '/customers', icon: '👥' },
    { name: 'Subscriptions', path: '/subscriptions', icon: '📋' },
    { name: 'Invoices', path: '/invoices', icon: '🧾' },
    { name: 'Payments', path: '/payments', icon: '💰' },
    { name: 'Settings', path: '/settings', icon: '⚙️' },
  ];

  const isActive = (path: string) => location.pathname.startsWith(path);

  return (
    <div className={cn(
      'fixed top-0 left-0 h-full bg-white dark:bg-boxdark shadow-md transition-all z-50',
      isCollapsed ? 'w-20' : 'w-64'
    )}>
      {/* Toggle Button */}
      <div className="absolute top-4 -right-3 z-50">
        <button
          className="bg-white dark:bg-gray-800 border rounded-full p-1 shadow"
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          <IoIosArrowBack
            className={cn('transition-transform', isCollapsed ? 'rotate-180' : '')}
          />
        </button>
      </div>

      {/* Logo */}
      <div className="flex items-center justify-center h-16 px-4">
        {!isCollapsed && (
          <h1 className="text-xl font-bold text-primary">aforo</h1>
        )}
      </div>

      {/* Navigation */}
      <nav className="px-2 pt-4">
        <ul className="space-y-1">
          {tabs.map(({ name, path, icon }) => (
            <li key={name}>
              <Link
                to={path}
                className={cn(
                  'flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-colors group',
                  isActive(path)
                    ? 'bg-gray-200 text-green-700 dark:bg-gray-700 dark:text-white'
                    : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
                )}
              >
                <span className="w-6 text-center mr-3">{icon}</span>
                {!isCollapsed && <span>{name}</span>}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
