import React from 'react';
import { Link } from 'react-router-dom';
import ServicesMenu from './ServicesMenu';

const Links = [
  { name: 'HOME', link: '/' },
  { name: 'ABOUT', link: '/about' },
  { name: 'CONTACT', link: '/contact' },
];

const services = [
  {
    service: 'Book Turf',
    to: '/turf-list',
  },
  {
    service: 'List Your Turf',
    to: '/turf-register',
  },
];

const NavbarLinks = ({ open, setOpen }) => {
  return (
    <ul
      className={`md:flex md:items-center md:pb-0 pb-12 absolute md:static md:z-auto z-[-1] bg-gray-50 md:bg-transparent
                  left-0 w-full md:w-auto md:pl-0 pl-9 transition-all duration-500 ease-in ${open ? 'top-12' : 'top-[-490px]'}`}
    >
      {Links.map((link, index) => (
        <li key={'navs' + index} className="md:ml-8 md:my-0 my-7 font-semibold">
          <Link
            to={link.link}
            className="text-gray-800 hover:text-green-500 duration-500"
            onClick={() => setOpen(false)}
          >
            {link.name}
          </Link>
        </li>
      ))}
      <li className="md:ml-8 md:my-0 my-7 font-semibold">
        <ServicesMenu services={services} />
      </li>
    </ul>
  );
};

export default NavbarLinks;
