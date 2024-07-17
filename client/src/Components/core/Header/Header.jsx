import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Button } from '@chakra-ui/react';
import { UserIcon } from '@heroicons/react/24/outline';
import NavbarLinks from './NavbarLinks';
import UserMenu from './UserMenu';
import MobileMenuToggle from './MobileMenuToggle';
// logo
const Logo = '/assets/logo/logo-no-bg.png';

const Header = ({ pos }) => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [isTransparent, setIsTransparent] = useState(false);

  const changeColor = () => {
    if (window.scrollY >= 60) {
      setIsTransparent(true);
    } else {
      setIsTransparent(false);
    }
  };
  window.addEventListener('scroll', changeColor);

  const handleSignOut = () => {
    //TODO: signout action call
  };

  return (
    <header
      className={`w-full transition-all ease-in-out ${
        isTransparent ? 'bg-gray-50 shadow' : 'transparent'
      } top-0 left-0 z-30 ${pos === 'sticky' ? 'sticky top-0' : pos === 'fixed' ? 'fixed' : 'relative'}`}
    >
      <div className="md:flex items-center justify-between py-4 md:px-10 px-7">
        <div onClick={() => navigate('/')} className="font-bold text-2xl cursor-pointer flex items-center gap-1">
          <img src={Logo} alt="logo.png" className="w-8 h-8 object-contain" />
          <span>Sports Hub</span>
        </div>

        <MobileMenuToggle open={open} setOpen={setOpen} />

        <NavbarLinks open={open} setOpen={setOpen} />

        {isAuthenticated === true ? (
          <UserMenu user={user} handleSignOut={handleSignOut} />
        ) : (
          <Button
            display={{ base: 'none', md: 'flex' }}
            onClick={() => navigate('/sign-in')}
            leftIcon={<UserIcon className="h-6 w-6" />}
            colorScheme="whatsapp"
          >
            Sign In/Sign Up
          </Button>
        )}
      </div>
    </header>
  );
};

export default Header;
