import { Avatar } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { viewRatingAPI } from '../../Services/allAPIs'
import { useParams } from 'react-router-dom'
import DisplayStarRating from './DisplayStarRating'

function Reviews() {

    const { id } = useParams()
    const [reviews, setReviews] = useState([])

    const fetchAllReviews = async () => {
        try {
            const response = await viewRatingAPI({ venueId: id })
            if (response.data.success) {
                setReviews(response.data.reviews)
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchAllReviews()
    }, [id])


    return (
        <>
            {/*        <!-- Component: List Rating Detailed --> */}
            <div className="flex w-full flex-col divide-y divide-slate-200 overflow-y-auto">
                {/*          <!-- Category rating --> */}
                {
                    reviews.map((review, index) => (
                        <div key={index} className="flex items-center gap-2 py-4">
                            <Avatar src={review?.userInfo?.image}  name={review?.userInfo?.username} />
                            {/*            <!-- Title --> */}
                            <div className='flex flex-col gap-1'>
                                <h4 className="flex w-full flex-1 gap-4 text-base font-medium text-slate-700">
                                    <span className="w-0 flex-1 truncate">
                                    {review?.userInfo?.username}
                                    </span>
                                    <DisplayStarRating rating={review?.rate}   />
                                    {/*              <!-- Rating --> */}
                                    {/* <span className="flex shrink-0 items-center gap-4 rounded text-sm text-slate-500">
                                        <span
                                            className="flex text-amber-400"
                                            role="img"
                                            aria-label="Rating: 4 out of 5 stars"
                                        >
                                            <span aria-hidden="true">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 24 24"
                                                    fill="currentColor"
                                                    className="h-4 w-4"
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
                                                    className="h-4 w-4"
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
                                                    className="h-4 w-4"
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
                                                    className="h-4 w-4"
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
                                                    className="h-4 w-4"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
                                                    />
                                                </svg>
                                            </span>
                                        </span>
                                    </span> */}
                                </h4>
                                <p className="text-sm leading-6 text-slate-500">
                                    {review?.message}
                                </p>
                            </div>
                        </div>
                    ))
                }
            </div>
            {/*        <!-- End List Rating Detailed --> */}
        </>
    )
}

export default Reviews