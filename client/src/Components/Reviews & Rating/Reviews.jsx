import { Avatar } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { viewRatingAPI } from '../../Services/allAPIs'
import { useParams } from 'react-router-dom'
import DisplayStarRating from './DisplayStarRating'
import { useSelector } from 'react-redux'
import { NoSymbolIcon } from '@heroicons/react/24/outline'

function Reviews() {

    const { id } = useParams()
    const { refresh } = useSelector(state => state.alerts)
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
    }, [id, refresh])


    return (
        <>
            {/*        <!-- Component: List Rating Detailed --> */}
            <div className="flex w-full flex-col divide-y divide-slate-200 overflow-y-auto ">
                {/*          <!-- Category rating --> */}
                {
                    reviews.length > 0 ? reviews.map((review, index) => (
                        <div key={index} className="flex items-center gap-2 py-4 ">
                            <Avatar src={review?.userInfo?.image} name={review?.userInfo?.username} />
                            {/*            <!-- Title --> */}
                            <div className='flex flex-col gap-1'>
                                <h4 className="flex flex-1 gap-4 text-base font-medium text-slate-700">
                                    <span className="w-0 flex-1 truncate">
                                        {review?.userInfo?.username}
                                    </span>
                                    {/*              <!-- Rating --> */}
                                    <span >
                                        <DisplayStarRating rating={review?.rate} />
                                    </span>

                                </h4>
                                <p className="text-sm leading-6 text-slate-500">
                                    {review?.message}
                                </p>
                            </div>
                        </div>
                    ))
                        :
                        <div className='h-full px-10 py-16 flex  flex-col items-center justify-center gap-1 pointer-events-none text-gray-300'>
                            <span className="text-lg font-semibold inline-flex items-center">
                                <NoSymbolIcon class="h-4 w-4" />
                                No Review available
                            </span>
                            <span className='text-2xl font-semibold'>
                                Be the first to write a review.
                            </span>
                        </div>
                }
            </div>
            {/*        <!-- End List Rating Detailed --> */}
        </>
    )
}

export default Reviews