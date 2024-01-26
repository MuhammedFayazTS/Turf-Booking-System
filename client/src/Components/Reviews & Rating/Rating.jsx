import { Button } from '@chakra-ui/react'
import React, { useState } from 'react'
import ReviewForm from './ReviewForm'

function Rating() {
    const [showRatingForm,setShowRatingForm] = useState(false)

    const handleShowRatingForm =(e) =>{
        setShowRatingForm(true)
    }
    const handleHideRatingForm =(e) =>{
        setShowRatingForm(false)
    }

    return (
        <>
            {/*        <!-- Component: Detailed Basic --> */}
            <div className="flex flex-col items-center gap-2">
                {/*          <!-- Title --> */}
                <h4 className="font-bold text-slate-700">Customer reviews</h4>
                {/*          <!-- Rating --> */}
                <span className="flex items-center gap-4 rounded text-sm text-slate-500">
                    <span
                        className="flex gap-1 text-amber-400"
                        role="img"
                        aria-label="Rating: 4 out of 5 stars"
                    >
                        <span aria-hidden="true">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                className="h-6 w-6"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </span>
                        <span aria-hidden="true">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                className="h-6 w-6"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </span>
                        <span aria-hidden="true">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                className="h-6 w-6"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </span>
                        <span aria-hidden="true">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                className="h-6 w-6"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </span>
                        <span aria-hidden="true">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                className="h-6 w-6"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
                                />
                            </svg>
                        </span>
                    </span>
                    <span>4.1 out 5</span>
                </span>
                {/*          <!-- Helper text --> */}
                <span className="text-xs leading-6 text-slate-400">
                    based on 147 user ratings
                </span>
                {/*          <!-- Detailed rating --> */}
                <span className="flex w-full flex-col gap-4 pt-6">
                    <span className="flex w-full items-center gap-2">
                        <label
                            id="p03e-label"
                            htmlFor="p03e"
                            className="mb-0 w-9 shrink-0 text-center text-xs text-slate-500"
                        >
                            5 star
                        </label>
                        <progress
                            aria-labelledby="p03e-label"
                            id="p03e"
                            max="100"
                            value="75"
                            className="block h-3 w-full overflow-hidden rounded bg-slate-100 [&::-webkit-progress-bar]:bg-slate-100 [&::-webkit-progress-value]:bg-amber-400 [&::-moz-progress-bar]:bg-amber-400"
                        >
                            75%
                        </progress>
                        <span className="w-9 text-xs font-bold text-slate-700">112 </span>
                    </span>
                    <span className="flex w-full items-center gap-2">
                        <label
                            id="p03e-label"
                            htmlFor="p03e"
                            className="mb-0 w-9 shrink-0 text-center text-xs text-slate-500"
                        >
                            4 star
                        </label>
                        <progress
                            aria-labelledby="p03e-label"
                            id="p03e"
                            max="100"
                            value="28"
                            className="block h-3 w-full overflow-hidden rounded bg-slate-100 [&::-webkit-progress-bar]:bg-slate-100 [&::-webkit-progress-value]:bg-amber-400 [&::-moz-progress-bar]:bg-amber-400"
                        >
                            75%
                        </progress>
                        <span className="w-9 text-xs font-bold text-slate-700">17 </span>
                    </span>
                    <span className="flex w-full items-center gap-2">
                        <label
                            id="p03e-label"
                            htmlFor="p03e"
                            className="mb-0 w-9 shrink-0 text-center text-xs text-slate-500"
                        >
                            3 star
                        </label>
                        <progress
                            aria-labelledby="p03e-label"
                            id="p03e"
                            max="100"
                            value="18"
                            className="block h-3 w-full overflow-hidden rounded bg-slate-100 [&::-webkit-progress-bar]:bg-slate-100 [&::-webkit-progress-value]:bg-amber-400 [&::-moz-progress-bar]:bg-amber-400"
                        >
                            75%
                        </progress>
                        <span className="w-9 text-xs font-bold text-slate-700">12 </span>
                    </span>
                    <span className="flex w-full items-center gap-2">
                        <label
                            id="p03e-label"
                            htmlFor="p03e"
                            className="mb-0 w-9 shrink-0 text-center text-xs text-slate-500"
                        >
                            2 star
                        </label>
                        <progress
                            aria-labelledby="p03e-label"
                            id="p03e"
                            max="100"
                            value="8"
                            className="block h-3 w-full overflow-hidden rounded bg-slate-100 [&::-webkit-progress-bar]:bg-slate-100 [&::-webkit-progress-value]:bg-amber-400 [&::-moz-progress-bar]:bg-amber-400"
                        >
                            75%
                        </progress>
                        <span className="w-9 text-xs font-bold text-slate-700">2 </span>
                    </span>
                    <span className="flex w-full items-center gap-2">
                        <label
                            id="p03e-label"
                            htmlFor="p03e"
                            className="mb-0 w-9 shrink-0 text-center text-xs text-slate-500"
                        >
                            1 star
                        </label>
                        <progress
                            aria-labelledby="p03e-label"
                            id="p03e"
                            max="100"
                            value="10"
                            className="block h-3 w-full overflow-hidden rounded bg-slate-100 [&::-webkit-progress-bar]:bg-slate-100 [&::-webkit-progress-value]:bg-amber-400 [&::-moz-progress-bar]:bg-amber-400"
                        >
                            75%
                        </progress>
                        <span className="w-9 text-xs font-bold text-slate-700">4 </span>
                    </span>
                </span>

                <div className=' mt-5 flex flex-col space-y-2 w-full'>
                    <h4 className="font-semibold text-slate-700 text-md">Share your thoughts</h4>
                    <span className="text-sm">
                        If you've used this product, share your thoughts with other customers
                    </span>
                    {
                        showRatingForm?
                        <ReviewForm close={handleHideRatingForm} />
                        :
                        <Button  onClick={handleShowRatingForm}
                         size={'sm'} variant={'outline'} colorScheme='blackAlpha' >Write a review</Button>
                    }
                </div>

            </div>
            {/*        <!-- End Detailed Basic --> */}

        </>
    )
}

export default Rating