// import icons
import bookingIcon from '../Assets/Images/booking-icon.svg'
import joinUsIcon from '../Assets/Images/partner-handshake-icon.svg'
import CoachIcon from '../Assets/Images/coach-instructor-icon.svg'

export const Features = [
    {
        title:'Join Us',
        description:'Quick and Easy Registration: Get started on our software platform with a simple account creation process.',
        img:joinUsIcon,
        button:'Register Now',
        to:'/organizer-register'
        
    },
    {
        title:'Select Venues',
        description:'Book Badminton coaches and venues for expert guidance and premium facilities.',
        img:CoachIcon,
        button:'Go to Venues',
        to:'/venue-list'        
    },
    {
        title:'Booking Process',
        description:'Easily book, pay, and enjoy a seamless experience on our user-friendly platform.',
        img:bookingIcon,
        button:'Book Now',
        to:'/venue-list'        
    },
];
