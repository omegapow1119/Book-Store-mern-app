import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';

function AuthLayout() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <>
      <Navbar setIsDropdownOpen={setIsDropdownOpen} isDropdownOpen={isDropdownOpen} />
      <main
        className="min-h-screen max-w-screen-2xl mx-auto px-4 py-6 font-primary"
        aria-label="Main content">
        <Outlet />
      </main>
    </>
  );
}

export default AuthLayout;