import React from 'react'
import Header from '../Components/Header/Header'
import VenueRegisterForm from '../Components/Forms/VenueRegisterForm'
import { motion } from 'framer-motion'

function OrganizerRegister() {


    return (
        <>
            <div className='bg-slate-200 min-h-screen'>
                <Header pos={'sticky'} />


                <div className="flex flex-col text-center mt-5">
                    <motion.h2
                        initial={{ x: 50 }} whileInView={{ x: 0 }} transition={{ duration: .6, type: 'tween' }} viewport={{ once: true }}

                        className="text-3xl font-semibold">
                        Register Now
                    </motion.h2>
                    <motion.p
                        initial={{ x: -50 }} whileInView={{ x: 0 }} transition={{ duration: .6, type: 'tween' }} viewport={{ once: true }}
                        className="text-md hidden md:block">
                        Submit your venue details below to streamline your event registration process                </motion.p>
                </div>

                <motion.div
                    initial={{ y: 50 ,opacity:0}} whileInView={{ y: 0,opacity:1 }} transition={{ duration: .6, type: 'tween' }} viewport={{ once: true }}
                    className="w-full p-2 md:p-8">
                    <VenueRegisterForm />
                </motion.div>

            </div>
        </>
    )
}

export default OrganizerRegister