/* eslint-disable jsx-a11y/iframe-has-title */
import { Link } from '@chakra-ui/react';
import React from 'react';
import { Route, Link as RouteLink } from 'react-router-dom';
import Header from '../Components/Header/Header';
import Footer from '../Components/Footer/Footer';
import SportImage from '../Assets/Images/SportsImage.jpeg'
import SportImage2 from '../Assets/Images/SportsImage2.jpeg'
import NewsLetterBox from '../Components/NewsLetterBox/NewsLetterBox';
import { TeamDetails } from '../Data/AboutData';
import { MapPinIcon } from '@heroicons/react/24/outline';

function AboutUs() {
    return (
        <>
            <div>
                <Header pos={'sticky'} />


                <div class="mx-auto max-w-7xl px-4">
                    <div class="flex flex-col space-y-8 pb-10 pt-12 md:pt-24">
                        <div class="max-w-max rounded-full border bg-gray-50 p-1 px-3">
                            <p class="text-xs font-semibold leading-normal md:text-sm">
                                About the company
                            </p>
                        </div>
                        <p class="text-3xl font-bold text-gray-900 md:text-5xl md:leading-10">
                            Discover and Book Turfs with Ease <br />on Sport Spotter
                        </p>
                        <p class="max-w-4xl text-base text-gray-600 md:text-xl">
                            Sport Spotter is your go-to turf booking platform,
                            revolutionizing the way sports enthusiasts find and reserve turfs.
                            Whether you're a player searching for the perfect field or a turf owner looking to expand your reach,
                            Sport Spotter is here to make your sports experience seamless.
                        </p>
                    </div>
                    <div class="w-full space-y-4">
                        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d251482.45724933132!2d76.1361189059796!3d9.982669696156243!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b080d514abec6bf%3A0xbd582caa5844192!2sKochi%2C%20Kerala!5e0!3m2!1sen!2sin!4v1706072940670!5m2!1sen!2sin"
                            class="h-[200px] w-full rounded-xl object-cover md:h-[400px]" allowfullscreen=""
                            loading="lazy" referrerpolicy="no-referrer-when-downgrade" />
                    </div>
                    <div class="my-8 flex flex-col gap-y-6 md:flex-row lg:justify-around">
                        <div class="flex flex-col space-y-3 md:w-2/4 lg:w-1/5">
                            <MapPinIcon className='w-5 h-5' />
                            <p class="w-full text-xl font-semibold  text-gray-900">
                                Bengaluru office
                            </p>
                            <p class="w-full text-base text-gray-700">Mon-Sat 9am to 5pm.</p>
                            <p class="text-sm font-medium">
                                100, Electronic City Phase-1, Bengaluru, Karnataka 560100 IN
                            </p>
                        </div>
                        <div class="flex flex-col space-y-3 md:w-2/4 lg:w-1/5">
                            <MapPinIcon className='w-5 h-5' />
                            <p class="w-full text-xl font-semibold  text-gray-900">Head office</p>
                            <p class="w-full text-base text-gray-700">Mon-Sat 9am to 5pm.</p>
                            <p class="text-sm font-medium">
                                Info Park road, Bose nagar, Kakkanad, Ernakulam 682021 IN
                            </p>
                        </div>
                        <div class="flex flex-col space-y-3 md:w-2/4 lg:w-1/5">
                            <MapPinIcon className='w-5 h-5' />
                            <p class="w-full text-xl font-semibold  text-gray-900">
                                Kerala office
                            </p>
                            <p class="w-full text-base text-gray-700">Mon-Sat 9am to 5pm.</p>
                            <p class="text-sm font-medium">
                                Info Park road, Bose nagar, Kakkanad, Ernakulam 682021 IN
                            </p>
                        </div>
                    </div>
                    {/* what do we offer */}
                    <hr class="mt-20" />
                    <div class="flex flex-col-reverse items-center gap-x-4 gap-y-4 py-16 md:flex-row">
                        <div class="space-y-6">
                            <p class="text-sm font-semibold md:text-base">Key Features →</p>
                            <p class="text-3xl font-bold md:text-4xl">
                                What do we offer?
                            </p>
                            <ul>
                                <li>
                                    <strong>Effortless Booking:</strong> Explore and book your preferred turfs effortlessly through our intuitive platform.
                                </li>
                                <li>
                                    <strong>Flexible Time Slots:</strong> Choose from a range of time slots that suit your schedule.
                                </li>
                                <li>
                                    <strong>Real-Time Availability:</strong> Instantly check turf availability for your desired time.
                                </li>
                                <li>
                                    <strong>Easy Listing:</strong> Owners can effortlessly add their turfs, reaching a broader audience.
                                </li>
                                <li>
                                    <strong>Manage Bookings:</strong> Keep track of bookings in real-time, manage schedules, and optimize turf usage efficiently.
                                </li>
                            </ul>
                            <RouteLink
                                to={'/'}
                                type="button"
                                class="rounded-md  bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                            >
                                Explore Our Services
                            </RouteLink>
                        </div>
                        <div class="md:mt-o mt-10 w-full">
                            <img
                                src={SportImage}
                                alt="Getting Started"
                                class="rounded-lg"
                            />
                        </div>
                    </div>
                    {/* team */}
                    <hr class="mt-20" />
                    <div class="mt-16 flex items-center">
                        <div class="space-y-6 md:w-3/4">
                            <div class="max-w-max rounded-full border bg-gray-50 p-1 px-3">
                                <p class="text-xs font-semibold leading-normal md:text-sm">
                                    Join Us →
                                </p>
                            </div>
                            <p class="text-3xl font-bold text-gray-900 md:text-4xl">
                                Meet our team
                            </p>
                            <p class="max-w-4xl text-base text-gray-700 md:text-xl">
                                Our philosophy is simple — hire a team of diverse, passionate people
                                and foster a culture that empowers you to do your best work.
                            </p>
                            <div></div>
                        </div>
                    </div>
                    <div class="grid grid-cols-1 gap-4 gap-y-6 border-b border-gray-300 py-12 pb-20 md:grid-cols-2 lg:grid-cols-4">
                        {
                            TeamDetails.map((member, index) => (
                                <div class="rounded-md border">
                                    <img
                                        src={member.image}
                                        alt={member.name}
                                        class="h-[300px] w-full rounded-lg object-cover "
                                    />
                                    <p class="mt-6 w-full px-2 text-xl  font-semibold text-gray-900">
                                        {member.name}
                                    </p>
                                    <p class="w-full px-2 pb-6 text-sm font-semibold text-gray-500">
                                        {member.designation}
                                    </p>
                                </div>
                            ))
                        }
                    </div>

                    {/* news letterbox------------------------------- */}
                    <NewsLetterBox />
                    {/* why chose us -------------------------------- */}

                    <hr class="mt-6" />
                    <div class="flex flex-col-reverse items-center gap-x-6 gap-y-4 py-16 md:flex-row-reverse">
                        <div class="space-y-6">
                            <p class="text-sm font-semibold md:text-base">Why us →</p>
                            <p class="text-3xl font-bold md:text-4xl">
                                Why Choose Sport Spotter?
                            </p>
                            <ul>
                                <li>
                                    <strong>User-Friendly Design:</strong> We prioritize a seamless experience for both users and turf owners.
                                </li>
                                <li>
                                    <strong>Wide Turf Network:</strong> Access a diverse array of turfs catering to various sports activities.
                                </li>
                                <li>
                                    <strong>Empowering Turf Owners:</strong> Sport Spotter provides tools to turf owners to efficiently manage bookings and maximize revenue.
                                </li>
                            </ul>
                            <RouteLink to={'/login'}
                                type="button"
                                class="rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                            >
                                Join Now
                            </RouteLink>
                        </div>
                        <div class="md:mt-o mt-10 w-full">
                            <img
                                src={SportImage2}
                                alt="Getting Started"
                                class="rounded-lg"
                            />
                        </div>
                    </div>
                </div>
                <div className='bg-gray-100'>
                    <hr class="mt-6" />
                    <div class="mx-auto max-w-7xl ">
                        <Footer />
                    </div>
                </div>
            </div>
        </>
    );
}

export default AboutUs;
