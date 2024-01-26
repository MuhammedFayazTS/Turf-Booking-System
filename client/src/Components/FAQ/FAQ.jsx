import React, { useEffect, useState } from 'react'
import { FaqData } from '../../Data/FaqData'
import AnimatedNumbers from "react-animated-numbers";
import { motion } from 'framer-motion';

function FAQ() {
    const [numbers, setNumber] = useState(35)

    return (
        <>
            <section className="px-2">
                <div className="mx-auto max-w-7xl py-10">
                    <div className="lg:grid lg:grid-cols-12 lg:gap-10">
                        <div className="lg:col-span-5">
                            <motion.h2
                                initial={{ scale: 0.9, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} transition={{ duration: .5, type: 'tween' }} viewport={{ once: true }}
                                className="text-2xl font-bold text-black">Frequently Asked Questions
                            </motion.h2>
                            <motion.p
                                initial={{ scale: 0.9, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} transition={{ duration: .5, type: 'tween' }} viewport={{ once: true }}
                                className="mt-6 text-sm text-gray-500">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                                incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.
                            </motion.p>
                            <div className="flex h-[200px] space-x-2 mt-3">
                                <div className="w-1/2 border-2 
                                bg-[radial-gradient(ellipse_at_right,_var(--tw-gradient-stops))] from-sky-400 to-indigo-900
                                 flex flex-col justify-center px-5 rounded-md text-gray-300">
                                    <p className="text-2xl font-semibold">
                                        Users
                                    </p>
                                    <p className="text-3xl font-extrabold inline-flex">
                                        <AnimatedNumbers
                                            includeComma
                                            animateToNumber={numbers}
                                        />+
                                    </p>
                                    <p className='text-md font-medium'>
                                        Play Your Way: Unleash Your Game with Us.
                                    </p>
                                </div>
                                <div className="w-1/2 border-2 
                                bg-[radial-gradient(ellipse_at_right,_var(--tw-gradient-stops))] from-lime-600 to-emerald-700 
                                flex flex-col justify-center px-5 rounded-md text-gray-300">
                                    <p className="text-2xl font-semibold">
                                        Courts
                                    </p>
                                    <p className="text-3xl font-extrabold inline-flex">
                                        <AnimatedNumbers
                                            includeComma
                                            animateToNumber={45}
                                        />+
                                    </p>
                                    <p className='text-md font-medium'>
                                        Well-maintained courts for optimal Game experiences.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} transition={{ duration: .5, type: 'tween' }} viewport={{ once: true }}
                            className=" mt-10 lg:col-span-7 lg:mt-0">
                            <dl>
                                {FaqData.map((faq, i) => (
                                    <div key={i} className="mt-10 first:mt-0">
                                        <dt className="text-lg font-semibold leading-6 text-gray-900">
                                            {faq.question}
                                        </dt>
                                        <dd className="mt-2 text-sm text-gray-500">
                                            {faq.answer}
                                        </dd>
                                    </div>
                                ))}
                            </dl>
                        </motion.div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default FAQ