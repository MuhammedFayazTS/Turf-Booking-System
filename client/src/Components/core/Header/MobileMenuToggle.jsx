import React from 'react';
import { Bars3BottomRightIcon, XMarkIcon } from '@heroicons/react/24/solid';

const MobileMenuToggle = ({ open, setOpen }) => {
  return (
    <div onClick={() => setOpen(!open)} className="absolute right-8 top-5 cursor-pointer md:hidden w-7 h-7">
      {open ? <XMarkIcon key="xicon" /> : <Bars3BottomRightIcon key="barIcon" />}
    </div>
  );
};

export default MobileMenuToggle;
