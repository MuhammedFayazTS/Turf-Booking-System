import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from '../Pages/Login';
import Register from '../Pages/Register';
import LandingPage from '../Pages/LandingPage';
import VenuesListing from '../Pages/VenuesListing';
import BookingPage from '../Pages/BookingPage';
import VenueDisplay from '../Pages/VenueDisplay';
import MyBookings from '../Pages/MyBookings';
import PublicRoutes from './PublicRoutes';
import ProtectedRoutes from './ProtectedRoutes';
import OrganizerRegister from '../Pages/OrganizerRegister';
import AdminDashboard from '../Pages/AdminDashboard';
import Notification from '../Components/Notifications/Notification';
import Dashboard from '../Components/DashBoard/Dashboard';
import AdminRoutes from './AdminRoutes';
import BookingSummary from '../Pages/BookingSummary';
import MyProfile from '../Pages/MyProfile';
import OrganizerRoutes from './OrganizerRoutes';
import BookingSection from '../Components/DashBoard/BookingSection';
import RevenueSection from '../Components/DashBoard/RevenueSection';
import UserMangementSection from '../Components/DashBoard/UserManagementSection';
import VenueMangementSection from '../Components/DashBoard/VenueMangementSection';
import AboutUs from '../Pages/AboutUs';
import { ContactUs } from '../Pages/ContactUs';
import PageNotFound from '../Pages/PageNotFound';
import EditProfile from '../Components/Edit Profile/EditProfile';

function AllRoutes() {
    return (
        <>
            {/* routes */}
            <Routes>

                {/* admin dashboard */}
                <Route path='admin' element={
                    <AdminRoutes>
                        <AdminDashboard />
                    </AdminRoutes>
                } >

                    <Route path='' element={<Dashboard />} />
                    <Route path='notifications' element={<Notification />} />
                    <Route path='bookings' element={<BookingSection />} />
                    <Route path='revenue' element={<RevenueSection />} />
                    <Route path='user-management' element={<UserMangementSection />} />
                    <Route path='venue-management' element={<VenueMangementSection />} />
                </Route>

                <Route path='/login' element={
                    <PublicRoutes>
                        <Login />
                    </PublicRoutes>
                } />
                <Route path='/register' element={
                    <PublicRoutes>
                        <Register />
                    </PublicRoutes>
                } />
                <Route path='/' element={
                    <LandingPage />
                } />
                <Route path='/about' element={
                    <AboutUs />
                } />
                <Route path='/contact' element={
                    <ContactUs />
                } />
                <Route path='/venue-list'
                    element={
                        <ProtectedRoutes>
                            <VenuesListing />
                        </ProtectedRoutes>
                    }
                />
                <Route path='/venue/:id'
                    element={
                        <ProtectedRoutes>
                            <VenueDisplay />
                        </ProtectedRoutes>
                    }
                />
                <Route path='/cart/:id' element={
                    <ProtectedRoutes>
                        <BookingPage />
                    </ProtectedRoutes>
                } />
                <Route path='/organizer-register' element={
                    <ProtectedRoutes>
                        <OrganizerRoutes>
                            <OrganizerRegister />
                        </OrganizerRoutes>
                    </ProtectedRoutes>
                } />

                <Route path='/booking-summary' element={
                    <OrganizerRoutes>
                        <BookingSummary />
                    </OrganizerRoutes>
                } />
                <Route path='/my-profile' element={
                    <ProtectedRoutes>
                        <MyProfile />
                    </ProtectedRoutes>
                } >
                    <Route path='' element={<EditProfile />} />
                    <Route path='notifications' element={<Notification />} />
                    <Route path='my-bookings' element={<MyBookings />} />
                </Route>
                {/* page not found */}
                <Route path='*' element={
                    <PageNotFound />
                } />
            </Routes>
        </>
    )
}

export default AllRoutes