import React, { useState } from 'react';
import { Bars3BottomRightIcon, XMarkIcon, ArrowLeftStartOnRectangleIcon, MapIcon, ArrowLongRightIcon } from '@heroicons/react/24/solid'
import { UserIcon } from '@heroicons/react/24/outline'
import { Avatar, Button, IconButton, Menu, MenuButton, MenuDivider, MenuGroup, MenuItem, MenuList, Portal } from '@chakra-ui/react';
import { Link, useNavigate } from 'react-router-dom';
import {  BellIcon, ChevronDownIcon } from '@chakra-ui/icons';
import { useSelector } from 'react-redux';
import { services } from './serviceList';
import Logo from '../../Assets/Logo/LogoNoBg.png'


const Header = ({ pos }) => {
    const { user } = useSelector(state => state.user)
    // change color of header
    const [color,setColor] = useState(false)
    const changeColor = ()=>{
        if(window.scrollY >= 90){
            setColor(true)
        }else{
            setColor(false)
        }
    }

    window.addEventListener("scroll",changeColor)

    const token = sessionStorage.getItem('token')
    let Links = [
        { name: "HOME", link: "/" },
        // { name: "SERVICE", link: "/" },
        { name: "ABOUT", link: "/about" },
        { name: "CONTACT", link: "/contact" },
    ];
    const navigate = useNavigate()
    let [open, setOpen] = useState(false);

    return (
        <>
            <header className={` w-full transition-all ease-in-out ${color?'bg-gray-50 shadow':'transparent'} top-0 left-0 z-30 ${pos === 'sticky' ? 'sticky top-0' : pos === 'fixed' ? 'fixed' : 'relative'}`}>
                <div className='md:flex items-center justify-between  py-4 md:px-10 px-7'>
                    {/* logo section */}
                    <div onClick={() => navigate('/')} className='font-bold text-2xl cursor-pointer flex items-center gap-1'>
                        {/* <MapIcon className='w-7 h-7 text-green-600' /> */}
                        <img src={Logo} alt="logo.png" className='w-8 h-8 object-contain' />
                        <span>SportSpotter</span>
                    </div>
                    {/* Menu icon */}
                    <div onClick={() => setOpen(!open)} className='absolute right-8 top-5 cursor-pointer md:hidden w-7 h-7'>
                        {
                            open ? <XMarkIcon key={'xicon'} /> : <Bars3BottomRightIcon key={'barIcon'} />
                        }
                    </div>
                    {/* linke items */}
                    <ul className={`md:flex md:items-center md:pb-0 pb-12 absolute md:static md:z-auto z-[-1] left-0 w-full md:w-auto md:pl-0 pl-9 transition-all duration-500 ease-in ${open ? 'top-12' : 'top-[-490px]'}`}>
                        {
                            Links.map((link, index) => (
                                <li key={'navs' + index} className='md:ml-8 md:my-0 my-7 font-semibold'>
                                    <Link to={link.link} className='text-gray-800 hover:text-green-500 duration-500'>{link.name}</Link>
                                </li>
                            ))
                        }
                        <li className='md:ml-8 md:my-0 my-7 font-semibold'>
                            <Menu>
                                <MenuButton as={Button}
                                    variant="unstyled" // Change the button to be transparent
                                    fontSize='lg'
                                    display={'flex'}
                                    alignItems={'center'}
                                    rightIcon={<ChevronDownIcon />}>
                                    SERVICES
                                </MenuButton>
                                <MenuList mt={{ base: 1, md: 5 }} >
                                    {
                                        services.map((service, index) => (
                                            <MenuItem 
                                            as={Link} to={service.to}
                                            key={index} className='hover:text-green-800 flex justify-between' >
                                                {service.service}
                                                <ArrowLongRightIcon className='w-5 h-5' />
                                            </MenuItem>
                                        ))
                                    }
                                </MenuList>
                            </Menu>
                        </li>
    
                        {
                            token ?
                                <Button
                                    display={{ md: "none", base: "flex" }}
                                    onClick={() => {
                                        sessionStorage.removeItem('token')
                                        navigate('/login')
                                    }}
                                    leftIcon={<ArrowLeftStartOnRectangleIcon className="h-6 w-6 " />
                                    } colorScheme='whatsapp'>
                                    Logout
                                </Button>
                                :
                                <Button
                                    display={{ md: "none", base: "flex" }}
                                    onClick={() => navigate('/login')} leftIcon={<UserIcon class="h-6 w-6" />} colorScheme='whatsapp'>
                                    Login/Register
                                </Button>
                        }
    
                    </ul>
    
                    {/* button */}
                    {
                        token ?
                            <div className='flex absolute md:relative right-16 md:right-0 top-4 md:top-0 md:space-x-1 items-center'>
    
                                <IconButton onClick={() => navigate('/my-profile/notifications')} isRound variant={'ghost'} >
                                    <div className='relative'>
                                        <BellIcon w={6} h={6} />
                                        {
                                            user?.unseenNotifications.length > 0 &&
                                            <div className="w-5 h-5 bg-green-500 absolute -top-3 -right-3 rounded-full flex items-center justify-center">
                                                <span className="text-sm text-white">{user?.unseenNotifications.length}</span>
                                            </div>
                                        }
                                    </div>
                                </IconButton>
    
                                <Menu>
                                    <MenuButton as={IconButton} isRound colorScheme='gray' variant={'ghost'}>
                                        <Avatar size={'sm'} src={user?.image} name={user?.username} />
                                    </MenuButton>
                                    <Portal>
                                        <MenuList zIndex={30}>
                                            <MenuGroup title='Profile'>
                                                <MenuItem as={Link} to={'/my-profile'} >My Profile</MenuItem>
                                                {user?.isOwner &&
                                                    <MenuItem as={Link} to={'/booking-summary'} >Booking Summary</MenuItem>}
                                                <MenuItem>Payments </MenuItem>
                                            </MenuGroup>
                                            <MenuDivider />
                                            <MenuGroup>
                                                <MenuItem
                                                    onClick={() => {
                                                        navigate('/login')
                                                        sessionStorage.removeItem('token')
                                                    }}
                                                    as={Button} size={'sm'} color={'red'}>Logout</MenuItem>
                                            </MenuGroup>
                                        </MenuList>
                                    </Portal>
                                </Menu>
                            </div>
                            :
                            <Button
                                display={{ base: "none", md: "flex" }}
                                onClick={() => navigate('/login')} leftIcon={<UserIcon class="h-6 w-6" />} colorScheme='whatsapp'>
                                Login/Register
                            </Button>
                    }
    
                </div>
            </header>
        </>
    );
};

export default Header;